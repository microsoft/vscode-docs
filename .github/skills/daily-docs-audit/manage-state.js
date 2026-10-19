//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FORMAT_VERSION = 1;
const STATE_PATH_ENVIRONMENT_VARIABLE = 'VSCODE_DOCS_AUDIT_STATE_PATH';

function createEmptyState() {
	return {
		version: FORMAT_VERSION,
		proposals: []
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
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.id)) {
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
	return {
		id: input.id,
		title: input.title.trim(),
		labels,
		sourcePrs,
		body: input.body.trim(),
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
	if (state.version !== FORMAT_VERSION) {
		throw new Error(`Unsupported daily docs audit state version: ${state.version}.`);
	}
	if (!Array.isArray(state.proposals)) {
		throw new Error('Daily docs audit state proposals must be an array.');
	}

	const proposals = state.proposals.map(validatePersistedProposal);
	const ids = proposals.map(proposal => proposal.id);
	if (new Set(ids).size !== ids.length) {
		throw new Error('Daily docs audit state contains duplicate proposal ids.');
	}

	return {
		version: FORMAT_VERSION,
		proposals
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
	const configuredPath = environment[STATE_PATH_ENVIRONMENT_VARIABLE];
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

function saveState(statePath, state) {
	const validatedState = validateState(state);
	const directory = path.dirname(statePath);
	fs.mkdirSync(directory, { recursive: true });
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

function upsertProposal(statePath, input, timestamp) {
	const state = loadState(statePath);
	if (!isPlainObject(input)) {
		throw new Error('Proposal must be a JSON object.');
	}
	const index = state.proposals.findIndex(proposal => proposal.id === input.id);
	const existingProposal = index === -1 ? undefined : state.proposals[index];
	const proposal = normalizeProposal(input, existingProposal, timestamp || new Date().toISOString());

	if (index === -1) {
		state.proposals.push(proposal);
	} else {
		state.proposals[index] = proposal;
	}
	state.proposals.sort((first, second) => first.createdAt.localeCompare(second.createdAt) || first.id.localeCompare(second.id));
	saveState(statePath, state);
	return proposal;
}

function removeProposal(statePath, id) {
	assertNonEmptyString(id, 'Proposal id');
	const state = loadState(statePath);
	const index = state.proposals.findIndex(proposal => proposal.id === id);
	if (index === -1) {
		throw new Error(`Pending proposal not found: ${id}.`);
	}

	const removedProposal = state.proposals.splice(index, 1)[0];
	saveState(statePath, state);
	return removedProposal;
}

function readStandardInput() {
	const input = fs.readFileSync(0, 'utf8');
	if (input.trim() === '') {
		throw new Error('Expected a proposal JSON object on standard input.');
	}
	try {
		return JSON.parse(input);
	} catch (error) {
		throw new Error(`Unable to parse proposal JSON from standard input: ${error.message}`);
	}
}

function printJson(value) {
	process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function main(args, environment, cwd) {
	const command = args[0];
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
		default:
			throw new Error('Usage: manage-state.js <path|list|upsert|remove>');
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
	loadState,
	main,
	normalizeProposal,
	removeProposal,
	saveState,
	upsertProposal,
	validateState
};
