'use strict';

const crypto = require('crypto');
const { validateReport } = require('./findings');

function hash(value) {
	function ordered(item) {
		if (Array.isArray(item)) {
			return item.map(ordered);
		}
		if (item && typeof item === 'object') {
			return Object.fromEntries(Object.keys(item).sort().map(key => [key, ordered(Reflect.get(item, key))]));
		}
		return item;
	}
	return crypto.createHash('sha256').update(JSON.stringify(ordered(value))).digest('hex');
}

function assertTimestamp(value) {
	if (typeof value !== 'string' || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) {
		throw new Error('Finding history timestamps must be ISO UTC timestamps.');
	}
}

function evidenceHash(finding, report) {
	return hash({
		articleHash: finding.articleHash,
		severity: finding.severity,
		message: finding.message,
		productEvidence: finding.productEvidence,
		productManifest: finding.productEvidence ? report.productManifest : undefined,
		replayEvidence: finding.replayEvidence,
		replayBinding: finding.replayEvidence ? report.replay.binding : undefined,
		reviewEvidence: finding.reviewEvidence,
		reviewGuidelines: finding.reviewEvidence ? report.review.binding.guidelinesHash : undefined
	});
}

function sameArticleChecks(previous, current, article) {
	return previous.scanPaths.includes(article) && current.scanPaths.includes(article) &&
		((!previous.replay && !current.replay && !previous.review && !current.review) ||
			(previous.replay?.status === 'passed' && current.replay &&
				previous.replay.binding.storyboardId === current.replay.binding.storyboardId &&
				previous.replay.binding.product.channel === current.replay.binding.product.channel)) &&
		JSON.stringify([...previous.checks].sort()) === JSON.stringify([...current.checks].sort());
}

function validateAuditFindings(reports, records) {
	if (!Array.isArray(reports) || !Array.isArray(records)) {
		throw new Error('Audit state reports and findings must be arrays.');
	}
	const metadata = new Map();
	const groups = new Map();
	for (const entry of reports) {
		if (!entry || !entry.report || Object.hasOwn(entry.report, 'findings') || entry.id !== hash(entry.report) || metadata.has(entry.id)) {
			throw new Error('Invalid or duplicate audit report metadata.');
		}
		validateReport({ ...entry.report, findings: [] });
		metadata.set(entry.id, entry.report);
		groups.set(entry.id, []);
	}
	const seen = new Set();
	for (const record of records) {
		if (!record || !record.finding || !metadata.has(record.reportId) || !Array.isArray(record.history)) {
			throw new Error('Invalid audit finding or missing report metadata.');
		}
		const report = metadata.get(record.reportId);
		if (seen.has(record.finding.id) || record.evidenceHash !== evidenceHash(record.finding, report)) {
			throw new Error('Duplicate audit finding or mismatched evidence hash.');
		}
		seen.add(record.finding.id);
		groups.get(record.reportId).push(record.finding);
		let status = 'open';
		let lastTimestamp = record.finding.firstSeen;
		let lastReport;
		for (const decision of record.history) {
			assertTimestamp(decision.at);
			if (decision.from !== status || !['open', 'accepted', 'dismissed', 'fixed'].includes(decision.to) ||
				!['triage', 'evidence-changed', 'finding-reappeared'].includes(decision.action) ||
				typeof decision.reason !== 'string' || !decision.reason.trim() ||
				!metadata.has(decision.reportId) || typeof decision.evidenceHash !== 'string' ||
				!/^[a-f0-9]{64}$/.test(decision.evidenceHash) || decision.at < lastTimestamp ||
				decision.at < metadata.get(decision.reportId).generatedAt ||
				(decision.action === 'evidence-changed' && decision.to !== 'open')) {
				throw new Error('Invalid finding triage history.');
			}
			const reappeared = decision.action === 'finding-reappeared';
			const absence = metadata.get(decision.absenceReportId);
			const observation = metadata.get(decision.reportId);
			if (Object.hasOwn(decision, 'absenceReportId') !== reappeared ||
				(reappeared && (decision.from !== 'fixed' || decision.to !== 'open' || !absence || !lastReport ||
					absence.generatedAt <= lastReport.generatedAt || absence.generatedAt >= observation.generatedAt ||
					!sameArticleChecks(absence, observation, record.finding.article)))) {
				throw new Error('Invalid finding reappearance history.');
			}
			status = decision.to;
			lastTimestamp = decision.at;
			lastReport = observation;
		}
		if (record.finding.status !== status) {
			throw new Error('Finding status does not match its triage history.');
		}
		if (record.history.length && record.history.at(-1).evidenceHash !== record.evidenceHash) {
			// Open findings can acquire newer evidence without a further status transition.
			if (record.finding.status !== 'open') {
				throw new Error('Decided finding has changed evidence without reopening.');
			}
		}
	}
	for (const [id, findings] of groups) {
		validateReport({ ...metadata.get(id), findings });
	}
}

function importFindings(state, input, timestamp, { previousVerification } = {}) {
	validateReport(input);
	assertTimestamp(timestamp);
	if (input.generatedAt > timestamp) {
		throw new Error('Cannot import a report generated in the future.');
	}
	if (input.findings.some(finding => finding.status !== 'open' || finding.lastSeen !== input.generatedAt || finding.firstSeen !== input.generatedAt)) {
		throw new Error('Import fresh checker observations with open status; use triage for review decisions.');
	}
	const { findings, ...report } = structuredClone(input);
	const reportId = hash(report);
	const existing = new Map(state.findings.map(record => [record.finding.id, record]));
	let verified;
	let verifiedIds;
	if (previousVerification !== undefined) {
		// Only callers that verified complete, explicit article coverage can supply this context.
		verified = previousVerification?.report;
		if (!verified || Object.hasOwn(verified, 'findings')) throw new Error('Previous verification requires report metadata.');
		validateReport({ ...verified, findings: [] });
		const ids = previousVerification.findingIds;
		if (verified.generatedAt >= report.generatedAt || !Array.isArray(ids) ||
			new Set(ids).size !== ids.length || ids.some(id => !existing.has(id) ||
				existing.get(id).finding.lastSeen !== verified.generatedAt)) {
			throw new Error('Invalid previous verification observations or timestamp.');
		}
		verifiedIds = new Set(ids);
	}
	let absenceReportId;
	const result = { added: 0, refreshed: 0, reopened: 0 };
	for (const finding of findings) {
		const previous = existing.get(finding.id);
		const digest = evidenceHash(finding, report);
		if (previous && finding.lastSeen < previous.finding.lastSeen) {
			throw new Error(`Older observation for finding ${finding.id}; state was not updated.`);
		}
		const changed = previous && previous.evidenceHash !== digest;
		const reappeared = previous?.finding.status === 'fixed' && verified &&
			previous.finding.lastSeen < verified.generatedAt && !verifiedIds.has(finding.id) &&
			sameArticleChecks(verified, report, finding.article);
		const lastDecision = previous?.history.at(-1);
		if ((changed || reappeared) && (finding.lastSeen === previous.finding.lastSeen ||
			(lastDecision && finding.lastSeen < lastDecision.at))) {
			throw new Error(`Conflicting or outdated evidence for finding ${finding.id}; rerun the checker.`);
		}
		if (previous) {
			finding.firstSeen = previous.finding.firstSeen;
			finding.status = previous.finding.status;
			result.refreshed++;
		} else {
			result.added++;
		}
		const history = previous ? [...previous.history] : [];
		if ((changed || reappeared) && finding.status !== 'open') {
			if (!changed) absenceReportId = hash(verified);
			history.push({
				at: timestamp, action: changed ? 'evidence-changed' : 'finding-reappeared', from: finding.status, to: 'open',
				reason: changed ? 'Observed article or product evidence changed.' : 'Finding reappeared after a verified scan did not observe it.',
				...(!changed ? { absenceReportId } : {}),
				evidenceHash: digest, reportId
			});
			finding.status = 'open';
			result.reopened++;
		}
		existing.set(finding.id, { finding, reportId, evidenceHash: digest, history });
	}
	if (findings.length && !state.reports.some(entry => entry.id === reportId)) {
		state.reports.push({ id: reportId, report });
	}
	if (absenceReportId && !state.reports.some(entry => entry.id === absenceReportId)) {
		state.reports.push({ id: absenceReportId, report: structuredClone(verified) });
	}
	state.findings = [...existing.values()].sort((left, right) => left.finding.id.localeCompare(right.finding.id));
	return result;
}

function triageFinding(state, input, timestamp) {
	assertTimestamp(timestamp);
	if (!input || !['open', 'accepted', 'dismissed', 'fixed'].includes(input.status) ||
		typeof input.reason !== 'string' || !input.reason.trim()) {
		throw new Error('Triage requires id, evidenceHash, status (open, accepted, dismissed, or fixed), and a reason.');
	}
	const record = state.findings.find(item => item.finding.id === input.id);
	if (!record) {
		throw new Error(`Finding not found: ${input.id}.`);
	}
	if (input.evidenceHash !== record.evidenceHash) {
		throw new Error('Finding evidence changed since review; reload the finding before deciding.');
	}
	if (timestamp < record.finding.lastSeen || timestamp < (record.history.at(-1)?.at || '')) {
		throw new Error('Triage timestamp is older than the finding or its review history.');
	}
	record.history.push({
		at: timestamp, action: 'triage', from: record.finding.status, to: input.status,
		reason: input.reason.trim(), evidenceHash: record.evidenceHash, reportId: record.reportId
	});
	record.finding.status = input.status;
	return record;
}

module.exports = { importFindings, triageFinding, validateAuditFindings, evidenceHash, reportId: hash };
