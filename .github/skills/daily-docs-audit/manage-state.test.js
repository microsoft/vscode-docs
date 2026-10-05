//@ts-check
'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { afterEach, describe, it } = require('node:test');
const {
	FORMAT_VERSION,
	loadState,
	removeProposal,
	saveState,
	upsertProposal
} = require('./manage-state');

const temporaryDirectories = [];

function createStatePath() {
	const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'daily-docs-audit-'));
	temporaryDirectories.push(directory);
	return path.join(directory, 'pending.json');
}

function createProposal(overrides) {
	return Object.assign({
		id: 'document-example-feature',
		title: 'Document example feature',
		labels: ['doc-enhancement', 'triage-needed'],
		sourcePrs: [123],
		body: [
			'<!-- vscode-docs-update:vscode-pr-123 -->',
			'',
			'## Product change',
			'',
			'Example body.'
		].join('\n')
	}, overrides);
}

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		fs.rmSync(directory, { recursive: true, force: true });
	}
});

describe('daily docs audit state', () => {
	it('returns empty state when the state file does not exist', () => {
		const statePath = createStatePath();

		assert.deepEqual(loadState(statePath), {
			version: FORMAT_VERSION,
			proposals: []
		});
		assert.equal(fs.existsSync(statePath), false);
	});

	it('persists proposals across command invocations', () => {
		const statePath = createStatePath();
		const scriptPath = path.join(__dirname, 'manage-state.js');
		const environment = Object.assign({}, process.env, {
			VSCODE_DOCS_AUDIT_STATE_PATH: statePath
		});

		execFileSync(process.execPath, [scriptPath, 'upsert'], {
			encoding: 'utf8',
			env: environment,
			input: JSON.stringify(createProposal())
		});
		const output = execFileSync(process.execPath, [scriptPath, 'list'], {
			encoding: 'utf8',
			env: environment
		});

		const state = JSON.parse(output);
		assert.equal(state.proposals.length, 1);
		assert.equal(state.proposals[0].id, 'document-example-feature');
	});

	it('refreshes an existing proposal without duplicating it', () => {
		const statePath = createStatePath();
		const initialTimestamp = '2026-09-01T10:00:00.000Z';
		const refreshedTimestamp = '2026-09-02T10:00:00.000Z';

		upsertProposal(statePath, createProposal(), initialTimestamp);
		upsertProposal(statePath, createProposal({
			title: 'Document updated example feature'
		}), refreshedTimestamp);

		const state = loadState(statePath);
		assert.equal(state.proposals.length, 1);
		assert.equal(state.proposals[0].title, 'Document updated example feature');
		assert.equal(state.proposals[0].createdAt, initialTimestamp);
		assert.equal(state.proposals[0].updatedAt, refreshedTimestamp);
	});

	it('removes a decided proposal', () => {
		const statePath = createStatePath();
		upsertProposal(statePath, createProposal(), '2026-09-01T10:00:00.000Z');

		const removed = removeProposal(statePath, 'document-example-feature');

		assert.equal(removed.id, 'document-example-feature');
		assert.deepEqual(loadState(statePath).proposals, []);
	});

	it('rejects invalid proposal input without changing persisted state', () => {
		const statePath = createStatePath();
		upsertProposal(statePath, createProposal(), '2026-09-01T10:00:00.000Z');

		assert.throws(() => upsertProposal(statePath, null), /must be a JSON object/);
		assert.throws(() => upsertProposal(statePath, createProposal({
			id: 'invalid proposal'
		}), '2026-09-02T10:00:00.000Z'), /Proposal id/);
		assert.throws(() => upsertProposal(statePath, createProposal({
			title: 'Invalid example feature title'
		}), '2026-09-02T10:00:00.000Z'), /must start with "Document "/);
		assert.equal(loadState(statePath).proposals.length, 1);
	});

	it('reports malformed persisted JSON without overwriting it', () => {
		const statePath = createStatePath();
		fs.writeFileSync(statePath, '{invalid', 'utf8');

		assert.throws(() => loadState(statePath), /Unable to parse daily docs audit state/);
		assert.equal(fs.readFileSync(statePath, 'utf8'), '{invalid');
	});

	it('reports unsupported persisted state versions', () => {
		const statePath = createStatePath();
		fs.writeFileSync(statePath, JSON.stringify({
			version: FORMAT_VERSION + 1,
			proposals: []
		}), 'utf8');

		assert.throws(() => loadState(statePath), /Unsupported daily docs audit state version/);
	});

	it('requires every source marker in a proposal body', () => {
		const statePath = createStatePath();
		const proposal = createProposal({
			sourcePrs: [123, 456]
		});

		assert.throws(() => upsertProposal(statePath, proposal), /vscode-pr-456/);
		assert.equal(fs.existsSync(statePath), false);
	});

	it('rejects removal of an unknown proposal', () => {
		const statePath = createStatePath();
		saveState(statePath, {
			version: FORMAT_VERSION,
			proposals: []
		});

		assert.throws(() => removeProposal(statePath, 'unknown-proposal'), /not found/);
	});
});
