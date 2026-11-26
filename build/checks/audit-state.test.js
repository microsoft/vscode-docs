'use strict';

const assert = require('node:assert/strict');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const test = require('node:test');
const { createEmptyState, importReport, loadState, removeProposal, saveState, triage, upsertProposal, validateState } = require('./audit-state');
const { importFindings, triageFinding } = require('./audit-findings');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary state files. */

const FIRST = '2026-01-01T10:00:00.000Z';
const DECISION = '2026-01-01T11:00:00.000Z';
const SECOND = '2026-01-02T10:00:00.000Z';
const THIRD = '2026-01-03T10:00:00.000Z';

function withState(callback) {
	const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-audit-state-'));
	try {
		callback(path.join(directory, 'pending.json'));
	} finally {
		fs.rmSync(directory, { recursive: true, force: true });
	}
}

function report(generatedAt = FIRST, names = ['one', 'two']) {
	return {
		schemaVersion: 4, checks: ['claims'], sourceRevision: 'fixture-revision',
		generatedAt, scanPaths: ['docs'], inputHash: 'a'.repeat(64),
		findings: names.map(name => ({
			id: crypto.createHash('sha256').update(`claim\0docs/article.md\0setting(${name})`).digest('hex'),
			kind: 'claim', severity: 'unverified', article: 'docs/article.md', articleHash: 'b'.repeat(64),
			line: 1, evidence: `setting(${name})`, message: 'Requires product verification.',
			sourceRevision: 'fixture-revision', status: 'open', firstSeen: generatedAt, lastSeen: generatedAt
		}))
	};
}

function proposal(findingIds) {
	return {
		id: 'document-example', title: 'Document example', labels: ['doc-enhancement', 'triage-needed'],
		sourcePrs: [123], body: '<!-- vscode-docs-update:vscode-pr-123 -->\nExample gap.',
		...(findingIds ? {findingIds} : {})
	};
}

function decide(statePath, status, timestamp = DECISION) {
	const record = loadState(statePath).findings[0];
	return triage(statePath, { id: record.finding.id, evidenceHash: record.evidenceHash, status, reason: 'Reviewed fixture evidence.' }, timestamp);
}

test('reads version 1 without writing and creates an exact backup on the first successful mutation', function () {
	withState(statePath => {
		const oldProposal = {...proposal(), createdAt: FIRST, updatedAt: FIRST};
		const bytes = JSON.stringify({version: 1, proposals: [oldProposal]}, null, '\t') + '\n';
		fs.writeFileSync(statePath, bytes);
		const migrated = loadState(statePath);
		assert.equal(migrated.version, 2);
		assert.deepEqual(migrated.proposals, [oldProposal]);
		assert.deepEqual(migrated.findings, []);
		assert.deepEqual(migrated.reports, []);
		assert.equal(fs.readFileSync(statePath, 'utf8'), bytes);
		assert.equal(fs.existsSync(`${statePath}.v1.bak`), false);
		assert.throws(() => upsertProposal(statePath, {...proposal(), body: 'Missing marker'}, SECOND), /source marker/);
		assert.equal(fs.readFileSync(statePath, 'utf8'), bytes);
		assert.equal(fs.existsSync(`${statePath}.v1.bak`), false);
		importReport(statePath, report(), SECOND);
		assert.equal(fs.readFileSync(`${statePath}.v1.bak`, 'utf8'), bytes);
		assert.deepEqual(loadState(statePath).proposals, [oldProposal]);
		assert.equal(loadState(statePath).findings.length, 2);
		upsertProposal(statePath, {...proposal(), title: 'Document updated example'}, THIRD);
		assert.equal(loadState(statePath).proposals[0].createdAt, FIRST);
		assert.equal(fs.readFileSync(`${statePath}.v1.bak`, 'utf8'), bytes);
		assert.equal(fs.existsSync(`${statePath}.lock`), false);
	});
});

test('deduplicates reports, preserves unchanged decisions and timestamps, and retains absent findings', function () {
	withState(statePath => {
		assert.deepEqual(importReport(statePath, report(), FIRST), {added: 2, refreshed: 0, reopened: 0});
		const decided = decide(statePath, 'dismissed');
		const refreshed = report(SECOND, [decided.finding.evidence.slice(8, -1)]);
		refreshed.sourceRevision = 'new-revision';
		refreshed.inputHash = 'c'.repeat(64);
		refreshed.findings[0].sourceRevision = refreshed.sourceRevision;
		assert.deepEqual(importReport(statePath, refreshed, SECOND), {added: 0, refreshed: 1, reopened: 0});
		const state = loadState(statePath);
		const current = state.findings.find(record => record.finding.id === decided.finding.id);
		assert.equal(current.finding.status, 'dismissed');
		assert.equal(current.finding.firstSeen, FIRST);
		assert.equal(current.finding.lastSeen, SECOND);
		assert.deepEqual(current.history, decided.history);
		assert.equal(state.findings.find(record => record !== current).finding.lastSeen, FIRST);
		assert.equal(state.findings.find(record => record !== current).finding.status, 'open');
		importReport(statePath, refreshed, SECOND);
		assert.equal(loadState(statePath).reports.length, 2);
		importReport(statePath, report(THIRD, []), THIRD);
		assert.deepEqual(loadState(statePath), state);
	});
});

test('reopens changed evidence without erasing prior decisions or changing unseen findings', function () {
	withState(statePath => {
		importReport(statePath, report(), FIRST);
		const decided = decide(statePath, 'fixed');
		const changed = report(SECOND, [decided.finding.evidence.slice(8, -1)]);
		changed.findings[0].articleHash = 'c'.repeat(64);
		assert.deepEqual(importReport(statePath, changed, SECOND), {added: 0, refreshed: 1, reopened: 1});
		const record = loadState(statePath).findings.find(item => item.finding.id === decided.finding.id);
		assert.equal(record.finding.status, 'open');
		assert.equal(record.finding.firstSeen, FIRST);
		assert.equal(record.history.length, 2);
		assert.equal(record.history[0].to, 'fixed');
		assert.equal(record.history[1].action, 'evidence-changed');
		assert.equal(record.history[1].from, 'fixed');
		assert.equal(record.history[1].to, 'open');
		assert.notEqual(record.evidenceHash, decided.evidenceHash);
		const persisted = fs.readFileSync(statePath, 'utf8');
		assert.throws(() => triage(statePath, {
			id: record.finding.id, evidenceHash: decided.evidenceHash, status: 'dismissed', reason: 'Old review'
		}, THIRD), /evidence changed/);
		assert.equal(fs.readFileSync(statePath, 'utf8'), persisted);
	});
});

test('verified article absence reopens identical fixed findings with automatic history, not human triage', function () {
	withState(statePath => {
		const state = createEmptyState();
		const original = {...report(), scanPaths: ['docs/article.md']};
		importFindings(state, original, FIRST);
		const absent = {...report(SECOND, []), scanPaths: ['docs/article.md']};
		importFindings(state, absent, SECOND);
		const {findings, ...metadata} = absent;
		assert.equal(findings.length, 0);
		const context = {previousVerification: {report: metadata, findingIds: []}};
		for (const record of state.findings) {
			triageFinding(state, {
				id: record.finding.id, evidenceHash: record.evidenceHash,
				status: record.finding.evidence === 'setting(one)' ? 'fixed' : 'dismissed', reason: 'Reviewed verified absence.'
			}, SECOND);
		}
		const returning = {...report(THIRD), scanPaths: ['docs/article.md']};
		const unchanged = structuredClone(state);
		assert.equal(importFindings(unchanged, returning, THIRD).reopened, 0, 'Ordinary imports do not infer verified absence.');
		for (const scope of [['docs/another.md'], ['docs']]) {
			const unrelated = structuredClone(state);
			assert.equal(importFindings(unrelated, returning, THIRD, {
				previousVerification: {...context.previousVerification, report: {...metadata, scanPaths: scope}}
			}).reopened, 0, 'Absence must explicitly cover the article.');
		}
		const otherChecks = structuredClone(state);
		assert.equal(importFindings(otherChecks, returning, THIRD, {
			previousVerification: {...context.previousVerification, report: {...metadata, checks: ['claims', 'links']}}
		}).reopened, 0);
		assert.equal(importFindings(state, returning, THIRD, context).reopened, 1);
		const fixed = state.findings.find(record => record.finding.evidence === 'setting(one)');
		const dismissed = state.findings.find(record => record.finding.evidence === 'setting(two)');
		assert.equal(fixed.finding.status, 'open');
		assert.equal(fixed.history[0].action, 'triage');
		assert.equal(fixed.history[1].action, 'finding-reappeared');
		assert.equal(fixed.history[1].evidenceHash, fixed.history[0].evidenceHash);
		assert.equal(dismissed.finding.status, 'dismissed');
		assert.equal(dismissed.history.length, 1);
		assert.deepEqual(state.reports.find(entry => entry.id === fixed.history[1].absenceReportId).report, metadata);
		saveState(statePath, state);
		assert.deepEqual(loadState(statePath), state);
		assert.equal(importFindings(state, returning, THIRD, context).reopened, 0, 'A repeated import does not repeat the reopen.');
		for (const mutate of [
			decision => { delete decision.absenceReportId; },
			decision => { decision.absenceReportId = decision.reportId; },
			decision => { decision.action = 'triage'; },
			decision => { decision.to = 'fixed'; }
		]) {
			const invalid = structuredClone(state);
			mutate(invalid.findings.find(record => record.finding.id === fixed.finding.id).history[1]);
			assert.throws(() => validateState(invalid), /reappearance history/);
		}
	});
});

test('reopens decisions when captured product evidence changes, not merely when reports are imported again', function () {
	withState(statePath => {
		const captured = report(FIRST, ['one']);
		captured.productManifest = {
			sha256: 'a'.repeat(64),
			product: {channel: 'insiders', version: '1.148.0-insider', revision: 'd'.repeat(40)},
			sources: ['editor','agents'].map(mode => ({
				kind: 'settings', mode, platform: 'win', file: `${mode}.jsonc`, sha256: 'e'.repeat(64)
			}))
		};
		captured.findings[0].productEvidence = {status: 'observed', matches: [{source: 0, defaultValue: false}]};
		importReport(statePath, captured, FIRST);
		decide(statePath, 'accepted');
		const refreshed = structuredClone(captured);
		refreshed.generatedAt = SECOND;
		refreshed.findings[0].firstSeen = SECOND;
		refreshed.findings[0].lastSeen = SECOND;
		refreshed.productManifest.sha256 = 'f'.repeat(64);
		refreshed.productManifest.sources[0].sha256 = 'f'.repeat(64);
		assert.equal(importReport(statePath, refreshed, SECOND).reopened, 1);
		assert.equal(loadState(statePath).findings[0].finding.status, 'open');
	});
});

test('rejects older reports, conflicting same-time evidence, and imported triage statuses without writes', function () {
	withState(statePath => {
		importReport(statePath, report(SECOND), SECOND);
		const persisted = fs.readFileSync(statePath, 'utf8');
		assert.throws(() => importReport(statePath, report(FIRST), THIRD), /Older observation/);
		const conflicting = report(SECOND);
		conflicting.findings.forEach(finding => { finding.articleHash = 'f'.repeat(64); });
		assert.throws(() => importReport(statePath, conflicting, THIRD), /Conflicting or outdated/);
		const decided = report(THIRD);
		decided.findings[0].status = 'accepted';
		assert.throws(() => importReport(statePath, decided, THIRD), /fresh checker observations/);
		assert.throws(() => importReport(statePath, report(THIRD), SECOND), /future/);
		assert.equal(fs.readFileSync(statePath, 'utf8'), persisted);
		assert.equal(fs.existsSync(`${statePath}.lock`), false);
	});
});

test('links known findings to proposals and keeps triage history when proposals are removed', function () {
	withState(statePath => {
		importReport(statePath, report(), FIRST);
		const record = decide(statePath, 'accepted');
		upsertProposal(statePath, proposal([record.finding.id]), SECOND);
		upsertProposal(statePath, {...proposal(), title: 'Document refreshed example'}, THIRD);
		assert.deepEqual(loadState(statePath).proposals[0].findingIds, [record.finding.id]);
		const before = fs.readFileSync(statePath, 'utf8');
		assert.throws(() => upsertProposal(statePath, proposal(['0'.repeat(64)]), THIRD), /unknown finding/);
		assert.equal(fs.readFileSync(statePath, 'utf8'), before);
		removeProposal(statePath, 'document-example');
		assert.deepEqual(loadState(statePath).proposals, []);
		assert.equal(loadState(statePath).findings[0].history.length, 1);
	});
});

test('does not overwrite malformed state, missing report references, locks, or conflicting migration backups', function () {
	withState(statePath => {
		importReport(statePath, report(), FIRST);
		const valid = fs.readFileSync(statePath, 'utf8');
		fs.writeFileSync(`${statePath}.lock`, 'another-writer\n');
		assert.throws(() => importReport(statePath, report(SECOND), SECOND), /state is locked/);
		assert.equal(fs.readFileSync(statePath, 'utf8'), valid);
		assert.equal(fs.readFileSync(`${statePath}.lock`, 'utf8'), 'another-writer\n');
		fs.rmSync(`${statePath}.lock`);
		for (const content of ['{broken', JSON.stringify({...JSON.parse(valid), reports: []})]) {
			fs.writeFileSync(statePath, content);
			assert.throws(() => importReport(statePath, report(SECOND), SECOND), /Unable to parse|missing report metadata/);
			assert.equal(fs.readFileSync(statePath, 'utf8'), content);
		}
		const old = '{"version":1,"proposals":[]}';
		fs.writeFileSync(statePath, old);
		fs.writeFileSync(`${statePath}.v1.bak`, 'different backup');
		assert.throws(() => importReport(statePath, report(), FIRST), /backup differs/);
		assert.equal(fs.readFileSync(statePath, 'utf8'), old);
		assert.equal(fs.readFileSync(`${statePath}.v1.bak`, 'utf8'), 'different backup');
	});
});

test('trusted build CLI and compatibility shim share state and reject stale decisions', function () {
	withState(statePath => {
		const script = path.join(__dirname, 'audit-state.js');
		const shim = path.join(__dirname, '..', '..', '.github', 'skills', 'daily-docs-audit', 'manage-state.js');
		const options = {encoding: 'utf8', env: {...process.env, VSCODE_DOCS_AUDIT_STATE_PATH: statePath}};
		const imported = spawnSync(process.execPath, [script, 'import-findings'], {...options, input: JSON.stringify(report())});
		assert.equal(imported.status, 0, imported.stderr);
		assert.deepEqual(JSON.parse(imported.stdout), {added: 2, refreshed: 0, reopened: 0});
		const listed = spawnSync(process.execPath, [shim, 'list'], options);
		assert.equal(listed.status, 0, listed.stderr);
		const record = JSON.parse(listed.stdout).findings[0];
		const decision = {id: record.finding.id, evidenceHash: record.evidenceHash, status: 'dismissed', reason: 'Explicit test review'};
		const triaged = spawnSync(process.execPath, [script, 'triage'], {...options, input: JSON.stringify(decision)});
		assert.equal(triaged.status, 0, triaged.stderr);
		assert.equal(JSON.parse(triaged.stdout).finding.status, 'dismissed');
		const stale = spawnSync(process.execPath, [shim, 'triage'], {...options, input: JSON.stringify({...decision, evidenceHash: '0'.repeat(64)})});
		assert.equal(stale.status, 1);
		assert.equal(stale.stdout, '');
		assert.match(stale.stderr, /evidence changed/);
		assert.equal(loadState(statePath).findings[0].history.length, 1);
	});
});

test('rejects corrupted evidence and decision histories without overwriting persisted state', function () {
	withState(statePath => {
		importReport(statePath, report(), FIRST);
		decide(statePath, 'accepted');
		const valid = loadState(statePath);
		const mutations = [
			state => { state.findings.push(structuredClone(state.findings[0])); },
			state => { state.findings[0].evidenceHash = '0'.repeat(64); },
			state => { state.findings[0].finding.status = 'fixed'; },
			state => { state.findings[0].history[0].reportId = '0'.repeat(64); },
			state => { state.findings[0].history[0].at = 'not-a-date'; }
		];
		for (const mutate of mutations) {
			const invalid = structuredClone(valid);
			mutate(invalid);
			const content = JSON.stringify(invalid);
			fs.writeFileSync(statePath, content);
			assert.throws(() => importReport(statePath, report(SECOND), SECOND),
				/Duplicate audit finding|mismatched evidence|triage history|timestamps/);
			assert.equal(fs.readFileSync(statePath, 'utf8'), content);
			assert.equal(fs.existsSync(`${statePath}.lock`), false);
		}
	});
});
