//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { importFindings, triageFinding, validateAuditFindings } = require('./audit-findings');

const FORMAT_VERSION = 2;
const STATE_PATH_ENVIRONMENT_VARIABLE = 'VSCODE_DOCS_AUDIT_STATE_PATH';

function createEmptyState() {
	return {
		version: FORMAT_VERSION,
		proposals: [],
		reports: [],
		findings: []
	};
}

function isPlainObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertNonEmptyString(value, name) {
	if (typeof value !== 'string' || value.trim() === '') {
		throw new Error(`${name} must be a non-empty string.`);
	}
}

function assertIsoDate(value, name) {
	assertNonEmptyString(value, name);
	if (Number.isNaN(Date.parse(value))) {
		throw new Error(`${name} must be an ISO 8601 date.`);
	}
}

function normalizeProposal(input, existingProposal, timestamp) {
	if (!isPlainObject(input)) {
		throw new Error('Proposal must be a JSON object.');
	}

	assertNonEmptyString(input.id, 'Proposal id');
	if (!input.id.split('-').every(part => /^[a-z0-9]+$/.test(part))) {
		throw new Error('Proposal id must contain lowercase letters, numbers, and single hyphens.');
	}

	assertNonEmptyString(input.title, 'Proposal title');
	if (!input.title.startsWith('Document ')) {
		throw new Error('Proposal title must start with "Document ".');
	}
	assertNonEmptyString(input.body, 'Proposal body');

	if (!Array.isArray(input.labels) || input.labels.length === 0) {
		throw new Error('Proposal labels must be a non-empty array.');
	}
	const labels = input.labels.map((label, index) => {
		assertNonEmptyString(label, `Proposal label at index ${index}`);
		return label.trim();
	});
	if (new Set(labels).size !== labels.length) {
		throw new Error('Proposal labels must not contain duplicates.');
	}

	if (!Array.isArray(input.sourcePrs) || input.sourcePrs.length === 0) {
		throw new Error('Proposal sourcePrs must be a non-empty array.');
	}
	const sourcePrs = input.sourcePrs.map((number, index) => {
		if (!Number.isInteger(number) || number <= 0) {
			throw new Error(`Proposal source PR at index ${index} must be a positive integer.`);
		}
		return number;
	}).sort((first, second) => first - second);
	if (new Set(sourcePrs).size !== sourcePrs.length) {
		throw new Error('Proposal sourcePrs must not contain duplicates.');
	}
	for (const sourcePr of sourcePrs) {
		const marker = `<!-- vscode-docs-update:vscode-pr-${sourcePr} -->`;
		if (!input.body.includes(marker)) {
			throw new Error(`Proposal body must contain source marker ${marker}.`);
		}
	}

	assertIsoDate(timestamp, 'Proposal timestamp');
	const findingIds = input.findingIds === undefined ? existingProposal?.findingIds : input.findingIds;
	if (findingIds !== undefined && (!Array.isArray(findingIds) ||
		findingIds.some(id => typeof id !== 'string' || !/^[a-f0-9]{64}$/.test(id)) ||
		new Set(findingIds).size !== findingIds.length)) {
		throw new Error('Proposal findingIds must be unique finding hashes.');
	}
	return {
		id: input.id,
		title: input.title.trim(),
		labels,
		sourcePrs,
		body: input.body.trim(),
		...(findingIds === undefined ? {} : { findingIds: [...findingIds] }),
		createdAt: existingProposal ? existingProposal.createdAt : timestamp,
		updatedAt: timestamp
	};
}

function validatePersistedProposal(proposal, index) {
	const normalized = normalizeProposal(proposal, undefined, proposal.createdAt);
	assertIsoDate(proposal.updatedAt, `Persisted proposal at index ${index} updatedAt`);
	normalized.updatedAt = proposal.updatedAt;
	return normalized;
}

function validateState(state) {
	if (!isPlainObject(state)) {
		throw new Error('Daily docs audit state must be a JSON object.');
	}
	if (state.version !== 1 && state.version !== FORMAT_VERSION) {
		throw new Error(`Unsupported daily docs audit state version: ${state.version}.`);
	}
	const keys = state.version === 1 ? ['version', 'proposals'] : ['version', 'proposals', 'reports', 'findings'];
	if (Object.keys(state).some(key => !keys.includes(key))) {
		throw new Error('Daily docs audit state contains unsupported fields.');
	}
	if (!Array.isArray(state.proposals)) {
		throw new Error('Daily docs audit state proposals must be an array.');
	}

	const proposals = state.proposals.map(validatePersistedProposal);
	const ids = proposals.map(proposal => proposal.id);
	if (new Set(ids).size !== ids.length) {
		throw new Error('Daily docs audit state contains duplicate proposal ids.');
	}
	const reports = state.version === 1 ? [] : state.reports;
	const findings = state.version === 1 ? [] : state.findings;
	if (state.version === 1 && (Object.hasOwn(state, 'reports') || Object.hasOwn(state, 'findings'))) {
		throw new Error('Version 1 audit state must not contain findings or reports.');
	}
	validateAuditFindings(reports, findings);
	const findingIds = new Set(findings.map(record => record.finding.id));
	for (const proposal of proposals) {
		if (proposal.findingIds?.some(id => !findingIds.has(id))) {
			throw new Error(`Proposal "${proposal.id}" references an unknown finding.`);
		}
	}

	return {
		version: FORMAT_VERSION,
		proposals,
		reports,
		findings
	};
}

function runGit(root, args) {
	return execFileSync('git', args, {
		cwd: root,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'pipe']
	}).trim();
}

function getStatePath(environment, cwd) {
	const configuredPath = Reflect.get(environment, STATE_PATH_ENVIRONMENT_VARIABLE);
	if (configuredPath) {
		return path.resolve(cwd, configuredPath);
	}

	const workspaceRoot = runGit(cwd, ['rev-parse', '--show-toplevel']);
	const gitPath = runGit(workspaceRoot, ['rev-parse', '--git-path', 'daily-docs-audit/pending.json']);
	return path.isAbsolute(gitPath) ? gitPath : path.resolve(workspaceRoot, gitPath);
}

function loadState(statePath) {
	let content;
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		content = fs.readFileSync(statePath, 'utf8');
	} catch (error) {
		if (error && error.code === 'ENOENT') {
			return createEmptyState();
		}
		throw error;
	}

	let state;
	try {
		state = JSON.parse(content);
	} catch (error) {
		throw new Error(`Unable to parse daily docs audit state at ${statePath}: ${error.message}`);
	}
	return validateState(state);
}

function writeState(statePath, state) {
	const validatedState = validateState(state);
	const directory = path.dirname(statePath);
	// eslint-disable-next-line security/detect-non-literal-fs-filename -- The state directory comes from Git metadata or an explicit caller path.
	fs.mkdirSync(directory, { recursive: true });
	let previous;
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename -- Preserve the exact old state during migration.
		previous = fs.readFileSync(statePath, 'utf8');
	} catch (error) {
		if (error.code !== 'ENOENT') {
			throw error;
		}
	}
	if (previous !== undefined) {
		const persisted = JSON.parse(previous);
		validateState(persisted);
		if (persisted.version === 1) {
			const backupPath = `${statePath}.v1.bak`;
			try {
				// eslint-disable-next-line security/detect-non-literal-fs-filename -- Never overwrite the original migration backup.
				fs.writeFileSync(backupPath, previous, { encoding: 'utf8', flag: 'wx' });
			} catch (error) {
				if (error.code !== 'EEXIST') {
					throw error;
				}
				// eslint-disable-next-line security/detect-non-literal-fs-filename -- An existing backup must match before migration can continue.
				if (fs.readFileSync(backupPath, 'utf8') !== previous) {
					throw new Error(`Migration backup differs from current version 1 state: ${backupPath}`);
				}
			}
		}
	}
	const temporaryPath = `${statePath}.${process.pid}.tmp`;
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		fs.writeFileSync(temporaryPath, `${JSON.stringify(validatedState, null, 2)}\n`, 'utf8');
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		fs.renameSync(temporaryPath, statePath);
	} catch (error) {
		try {
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			fs.unlinkSync(temporaryPath);
		} catch (cleanupError) {
			if (!cleanupError || cleanupError.code !== 'ENOENT') {
				throw cleanupError;
			}
		}
		throw error;
	}
}

function withStateLock(statePath, action) {
	// eslint-disable-next-line security/detect-non-literal-fs-filename -- The state directory comes from Git metadata or an explicit caller path.
	fs.mkdirSync(path.dirname(statePath), { recursive: true });
	const lockPath = `${statePath}.lock`;
	let descriptor;
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename -- Exclusive lock serializes all helper writes.
		descriptor = fs.openSync(lockPath, 'wx');
	} catch (error) {
		if (error.code === 'EEXIST') {
			throw new Error(`Audit state is locked: ${lockPath}. Check for an active writer before recovering an abandoned lock.`);
		}
		throw error;
	}
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename -- Write through the numeric file descriptor for the acquired lock.
		fs.writeFileSync(descriptor, `${process.pid}\n`, 'utf8');
		return action();
	} finally {
		fs.closeSync(descriptor);
		// eslint-disable-next-line security/detect-non-literal-fs-filename -- Remove only the lock acquired by this invocation.
		fs.unlinkSync(lockPath);
	}
}

function saveState(statePath, state) {
	return withStateLock(statePath, () => writeState(statePath, state));
}

function upsertProposal(statePath, input, timestamp) {
	return withStateLock(statePath, () => updateProposal(statePath, input, timestamp));
}

function updateProposal(statePath, input, timestamp) {
	const state = loadState(statePath);
	if (!isPlainObject(input)) {
		throw new Error('Proposal must be a JSON object.');
	}
	const index = state.proposals.findIndex(proposal => proposal.id === input.id);
	const existingProposal = index === -1 ? undefined : state.proposals.at(index);
	const proposal = normalizeProposal(input, existingProposal, timestamp || new Date().toISOString());

	if (index === -1) {
		state.proposals.push(proposal);
	} else {
		state.proposals.splice(index, 1, proposal);
	}
	state.proposals.sort((first, second) => first.createdAt.localeCompare(second.createdAt) || first.id.localeCompare(second.id));
	writeState(statePath, state);
	return proposal;
}

function removeProposal(statePath, id) {
	return withStateLock(statePath, () => deleteProposal(statePath, id));
}

function deleteProposal(statePath, id) {
	assertNonEmptyString(id, 'Proposal id');
	const state = loadState(statePath);
	const index = state.proposals.findIndex(proposal => proposal.id === id);
	if (index === -1) {
		throw new Error(`Pending proposal not found: ${id}.`);
	}

	const removedProposal = state.proposals.splice(index, 1)[0];
	writeState(statePath, state);
	return removedProposal;
}

function updateFindings(statePath, input, operation, timestamp) {
	return withStateLock(statePath, () => {
		const state = loadState(statePath);
		const result = operation(state, input, timestamp || new Date().toISOString());
		writeState(statePath, state);
		return result;
	});
}

function importReport(statePath, report, timestamp) {
	return updateFindings(statePath, report, importFindings, timestamp);
}

function triage(statePath, input, timestamp) {
	return updateFindings(statePath, input, triageFinding, timestamp);
}

function readStandardInput(kind = 'proposal') {
	const input = fs.readFileSync(0, 'utf8');
	if (input.trim() === '') {
		throw new Error(`Expected a ${kind} JSON object on standard input.`);
	}
	try {
		return JSON.parse(input);
	} catch (error) {
		throw new Error(`Unable to parse ${kind} JSON from standard input: ${error.message}`);
	}
}

function printJson(value) {
	process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function main(args, environment, cwd) {
	const command = args[0];
	if ((command === 'remove' && args.length !== 2) ||
		(command !== 'remove' && args.length !== 1)) {
		throw new Error('Usage: audit-state.js <path|list|upsert|remove <proposal-id>|import-findings|triage>');
	}
	const statePath = getStatePath(environment, cwd);

	switch (command) {
		case 'path':
			process.stdout.write(`${statePath}\n`);
			break;
		case 'list':
			printJson(loadState(statePath));
			break;
		case 'upsert':
			printJson(upsertProposal(statePath, readStandardInput()));
			break;
		case 'remove':
			if (args.length !== 2) {
				throw new Error('Usage: manage-state.js remove <proposal-id>');
			}
			printJson(removeProposal(statePath, args[1]));
			break;
		case 'import-findings':
			printJson(importReport(statePath, readStandardInput('findings report')));
			break;
		case 'triage':
			printJson(triage(statePath, readStandardInput('triage decision')));
			break;
		default:
			throw new Error('Usage: audit-state.js <path|list|upsert|remove <proposal-id>|import-findings|triage>');
	}
}

if (require.main === module) {
	try {
		main(process.argv.slice(2), process.env, process.cwd());
	} catch (error) {
		process.stderr.write(`${error.message}\n`);
		process.exitCode = 1;
	}
}

module.exports = {
	FORMAT_VERSION,
	createEmptyState,
	getStatePath,
	importReport,
	loadState,
	main,
	normalizeProposal,
	removeProposal,
	saveState,
	triage,
	upsertProposal,
	validateState
};
