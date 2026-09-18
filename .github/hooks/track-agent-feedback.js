//@ts-check
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FORMAT_VERSION = 1;
const MAX_EVENTS = 100;
const CONTENT_ROOTS = ['api/', 'blogs/', 'docs/', 'release-notes/', 'remote/'];
const EDIT_TOOLS = new Set([
	'apply_patch',
	'copilot_createFile',
	'copilot_editFile',
	'copilot_multiReplaceString',
	'copilot_replaceString',
	'createFile',
	'create_file',
	'editFiles',
	'edit_file',
	'multi_replace_string_in_file',
	'replace_string_in_file'
]);

function hash(value) {
	return crypto.createHash('sha256').update(value).digest('hex');
}

function now() {
	return new Date().toISOString();
}

function readJson(file, fallback) {
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		return JSON.parse(fs.readFileSync(file, 'utf8'));
	} catch (error) {
		if (error && error.code === 'ENOENT') {
			return fallback;
		}
		throw error;
	}
}

function writeJson(file, value) {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	const temporaryFile = `${file}.${process.pid}.tmp`;
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	fs.writeFileSync(temporaryFile, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	fs.renameSync(temporaryFile, file);
}

function runGit(root, args, allowDifference) {
	try {
		return execFileSync('git', args, {
			cwd: root,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe']
		});
	} catch (error) {
		if (allowDifference && error && error.status === 1) {
			return error.stdout ? String(error.stdout) : '';
		}
		throw error;
	}
}

function getStorage() {
	const workspaceRoot = runGit(process.cwd(), ['rev-parse', '--show-toplevel'], false).trim();
	const gitPath = runGit(workspaceRoot, ['rev-parse', '--git-path', 'agent-feedback'], false).trim();
	const storageRoot = path.isAbsolute(gitPath) ? gitPath : path.resolve(workspaceRoot, gitPath);
	fs.mkdirSync(storageRoot, { recursive: true });
	fs.mkdirSync(path.join(storageRoot, 'events'), { recursive: true });
	fs.mkdirSync(path.join(storageRoot, 'sessions'), { recursive: true });
	return { workspaceRoot, storageRoot };
}

function getSessionId(input) {
	const explicitId = input.session_id || input.sessionId;
	const transcriptPath = input.transcript_path || input.transcriptPath;
	const identity = explicitId || transcriptPath || 'workspace-session';
	return hash(String(identity)).slice(0, 24);
}

function getSessionPaths(storageRoot, sessionId) {
	const directory = path.join(storageRoot, 'sessions', sessionId);
	return {
		directory,
		state: path.join(directory, 'state.json')
	};
}

function loadSession(storageRoot, input) {
	const id = getSessionId(input);
	const paths = getSessionPaths(storageRoot, id);
	const state = readJson(paths.state, {
		version: FORMAT_VERSION,
		id,
		promptCount: 0,
		seenPromptHashes: [],
		turn: null
	});
	return { paths, state };
}

function saveSession(session) {
	writeJson(session.paths.state, session.state);
}

function normalizeToolName(toolName) {
	const parts = String(toolName || '').split('.');
	return parts[parts.length - 1];
}

function collectPath(value, paths) {
	if (typeof value === 'string' && value.trim()) {
		paths.push(value.trim());
	} else if (value && typeof value === 'object') {
		collectPath(value.path, paths);
		collectPath(value.file_path, paths);
		collectPath(value.filePath, paths);
	}
}

function extractPaths(input) {
	const toolInput = input.tool_input || input.toolInput || {};
	const paths = [];

	if (typeof toolInput === 'object' && toolInput) {
		collectPath(toolInput.path, paths);
		collectPath(toolInput.file_path, paths);
		collectPath(toolInput.filePath, paths);
		if (Array.isArray(toolInput.files)) {
			toolInput.files.forEach(function (file) {
				collectPath(file, paths);
			});
		}
	}

	const patch = typeof toolInput === 'string' ? toolInput : toolInput.input || toolInput.patch || '';
	if (typeof patch === 'string') {
		const expression = /^\*\*\* (?:Update|Add|Delete) File: (.+)$/gm;
		let match;
		while ((match = expression.exec(patch)) !== null) {
			paths.push(match[1].trim());
		}
	}

	return Array.from(new Set(paths));
}

function toContentPath(workspaceRoot, candidate) {
	const absolutePath = path.resolve(workspaceRoot, candidate);
	const relativePath = path.relative(workspaceRoot, absolutePath).replace(/\\/g, '/');
	if (!relativePath || relativePath.startsWith('../') || path.isAbsolute(relativePath)) {
		return null;
	}
	const lowerPath = relativePath.toLowerCase();
	if (!lowerPath.endsWith('.md') || !CONTENT_ROOTS.some(function (root) { return lowerPath.startsWith(root); })) {
		return null;
	}
	return { absolutePath, relativePath };
}

function readSnapshot(file) {
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		return { exists: true, content: fs.readFileSync(file, 'utf8') };
	} catch (error) {
		if (error && error.code === 'ENOENT') {
			return { exists: false, content: '' };
		}
		throw error;
	}
}

function writeSnapshot(file, snapshot) {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	fs.writeFileSync(file, snapshot.content, 'utf8');
}

function ensureTurn(session) {
	if (!session.state.turn) {
		session.state.turn = {
			id: `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
			startedAt: now(),
			finalizedAt: null,
			feedbackCheckedAt: null,
			files: []
		};
	}
	return session.state.turn;
}

function getTurnDirectory(session) {
	return path.join(session.paths.directory, session.state.turn.id);
}

function captureBefore(storage, session, input) {
	const toolName = normalizeToolName(input.tool_name || input.toolName);
	if (!EDIT_TOOLS.has(toolName)) {
		return;
	}

	const turn = ensureTurn(session);
	const turnDirectory = getTurnDirectory(session);
	extractPaths(input).forEach(function (candidate) {
		const contentPath = toContentPath(storage.workspaceRoot, candidate);
		if (!contentPath || turn.files.some(function (file) { return file.path === contentPath.relativePath; })) {
			return;
		}

		const snapshot = readSnapshot(contentPath.absolutePath);
		const key = hash(contentPath.relativePath).slice(0, 20);
		const beforeFile = path.join(turnDirectory, `${key}.before`);
		writeSnapshot(beforeFile, snapshot);
		turn.files.push({
			path: contentPath.relativePath,
			key,
			beforeFile,
			beforeExists: snapshot.exists,
			afterFile: null,
			afterExists: null,
			agentRanges: []
		});
	});
	saveSession(session);
}

function createDiff(workspaceRoot, oldFile, newFile, displayPath) {
	const output = runGit(workspaceRoot, [
		'diff',
		'--no-index',
		'--no-color',
		'--unified=0',
		'--',
		oldFile,
		newFile
	], true);
	return output
		.split(/\r?\n/)
		.map(function (line) {
			if (line.startsWith('--- ')) {
				return `--- a/${displayPath}`;
			}
			if (line.startsWith('+++ ')) {
				return `+++ b/${displayPath}`;
			}
			return line;
		})
		.join('\n')
		.trimEnd();
}

function parseHunks(diff) {
	const hunks = [];
	const expression = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/gm;
	let match;
	while ((match = expression.exec(diff)) !== null) {
		hunks.push({
			oldStart: Number(match[1]),
			oldCount: match[2] === undefined ? 1 : Number(match[2]),
			newStart: Number(match[3]),
			newCount: match[4] === undefined ? 1 : Number(match[4])
		});
	}
	return hunks;
}

function finalizeTurn(storage, session) {
	const turn = session.state.turn;
	if (!turn || turn.finalizedAt) {
		return;
	}

	const turnDirectory = getTurnDirectory(session);
	const emptyFile = path.join(storage.storageRoot, 'empty');
	if (!fs.existsSync(emptyFile)) {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		fs.writeFileSync(emptyFile, '', 'utf8');
	}

	turn.files.forEach(function (file) {
		const contentPath = toContentPath(storage.workspaceRoot, file.path);
		if (!contentPath) {
			return;
		}
		const after = readSnapshot(contentPath.absolutePath);
		file.afterFile = path.join(turnDirectory, `${file.key}.after`);
		file.afterExists = after.exists;
		writeSnapshot(file.afterFile, after);

		const beforePath = file.beforeFile || emptyFile;
		const afterPath = file.afterFile || emptyFile;
		const diff = createDiff(storage.workspaceRoot, beforePath, afterPath, file.path);
		file.agentRanges = parseHunks(diff).map(function (hunk) {
			return { start: hunk.newStart, count: hunk.newCount };
		});
	});

	turn.finalizedAt = now();
	saveSession(session);
}

function rangesTouch(first, second) {
	const firstStart = Math.max(1, first.start);
	const secondStart = Math.max(1, second.start);
	const firstEnd = first.count === 0 ? firstStart : firstStart + first.count - 1;
	const secondEnd = second.count === 0 ? secondStart : secondStart + second.count - 1;
	return firstStart <= secondEnd + 1 && secondStart <= firstEnd + 1;
}

function filterDiff(diff, relevantHunks) {
	if (!relevantHunks.length) {
		return '';
	}

	const lines = diff.split(/\r?\n/);
	const header = [];
	const blocks = [];
	let current = null;

	lines.forEach(function (line) {
		if (line.startsWith('@@ ')) {
			current = [line];
			blocks.push(current);
		} else if (current) {
			current.push(line);
		} else {
			header.push(line);
		}
	});

	const selected = blocks.filter(function (_block, index) {
		return relevantHunks.indexOf(index) !== -1;
	});
	return header.concat.apply(header, selected).join('\n').trimEnd();
}

function newEventId(type) {
	return `${Date.now()}-${type}-${crypto.randomBytes(4).toString('hex')}`;
}

function writeEvent(storageRoot, event) {
	const eventFile = path.join(storageRoot, 'events', `${event.id}.json`);
	writeJson(eventFile, event);
	pruneEvents(storageRoot);
	return event.id;
}

function listEventFiles(storageRoot) {
	const directory = path.join(storageRoot, 'events');
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	return fs.readdirSync(directory)
		.filter(function (file) { return file.endsWith('.json'); })
		.map(function (file) { return path.join(directory, file); })
		.sort();
}

function pruneEvents(storageRoot) {
	const files = listEventFiles(storageRoot);
	files.slice(0, Math.max(0, files.length - MAX_EVENTS)).forEach(function (file) {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		fs.unlinkSync(file);
	});
}

function updateEvent(storageRoot, eventId, update) {
	if (!/^\d+-(?:chat|edit)-[a-f0-9]{8}$/.test(eventId)) {
		return false;
	}
	const eventFile = path.join(storageRoot, 'events', `${eventId}.json`);
	const event = readJson(eventFile, null);
	if (!event) {
		return false;
	}
	update(event);
	writeJson(eventFile, event);
	return true;
}

function processLocalCorrections(storage, session) {
	const turn = session.state.turn;
	if (!turn || !turn.finalizedAt || turn.feedbackCheckedAt) {
		return [];
	}

	const eventIds = [];
	const emptyFile = path.join(storage.storageRoot, 'empty');
	turn.files.forEach(function (file) {
		if (!file.afterFile || !file.agentRanges.length) {
			return;
		}

		const contentPath = toContentPath(storage.workspaceRoot, file.path);
		if (!contentPath) {
			return;
		}
		const current = readSnapshot(contentPath.absolutePath);
		const currentFile = path.join(getTurnDirectory(session), `${file.key}.current`);
		writeSnapshot(currentFile, current);

		const correctionDiff = createDiff(storage.workspaceRoot, file.afterFile, currentFile, file.path);
		const correctionHunks = parseHunks(correctionDiff);
		const relevantHunks = [];
		correctionHunks.forEach(function (hunk, index) {
			const correctionRange = { start: hunk.oldStart, count: hunk.oldCount };
			if (file.agentRanges.some(function (agentRange) { return rangesTouch(agentRange, correctionRange); })) {
				relevantHunks.push(index);
			}
		});

		if (!relevantHunks.length) {
			return;
		}

		const agentDiff = createDiff(storage.workspaceRoot, file.beforeFile, file.afterFile, file.path);
		const id = newEventId('edit');
		writeEvent(storage.storageRoot, {
			version: FORMAT_VERSION,
			id,
			type: 'local-edit',
			status: 'pending',
			createdAt: now(),
			sessionId: session.state.id,
			turnId: turn.id,
			path: file.path,
			agentDiff,
			correctionDiff: filterDiff(correctionDiff, relevantHunks),
			relatedEventIds: []
		});
		eventIds.push(id);
	});

	turn.feedbackCheckedAt = now();
	saveSession(session);
	return eventIds;
}

function extractPrompt(input) {
	const values = [
		input.prompt,
		input.user_prompt,
		input.userPrompt,
		input.message
	];
	for (let index = 0; index < values.length; index++) {
		if (typeof values[index] === 'string' && values[index].trim()) {
			return values[index].trim();
		}
	}
	return '';
}

function normalizePrompt(prompt) {
	return prompt.replace(/\s+/g, ' ').trim();
}

function hasSeenPrompt(session, prompt) {
	const promptHash = hash(normalizePrompt(prompt));
	return session.state.seenPromptHashes.indexOf(promptHash) !== -1;
}

function markPromptSeen(session, prompt) {
	const promptHash = hash(normalizePrompt(prompt));
	if (session.state.seenPromptHashes.indexOf(promptHash) === -1) {
		session.state.seenPromptHashes.push(promptHash);
		session.state.seenPromptHashes = session.state.seenPromptHashes.slice(-200);
	}
}

function isReviewRequest(prompt) {
	return normalizePrompt(prompt).toLowerCase().indexOf('review-agent-corrections') !== -1;
}

function recordChatEvent(storage, session, prompt, source, turn, relatedEventIds) {
	if (!prompt || isReviewRequest(prompt) || hasSeenPrompt(session, prompt)) {
		return null;
	}
	markPromptSeen(session, prompt);
	const id = newEventId('chat');
	writeEvent(storage.storageRoot, {
		version: FORMAT_VERSION,
		id,
		type: 'chat',
		status: 'pending',
		createdAt: now(),
		sessionId: session.state.id,
		turnId: turn ? turn.id : null,
		source,
		prompt,
		touchedFiles: turn ? turn.files.map(function (file) { return file.path; }) : [],
		relatedEventIds: relatedEventIds || []
	});
	(relatedEventIds || []).forEach(function (relatedId) {
		updateEvent(storage.storageRoot, relatedId, function (event) {
			event.relatedEventIds = event.relatedEventIds || [];
			if (event.relatedEventIds.indexOf(id) === -1) {
				event.relatedEventIds.push(id);
			}
		});
	});
	return id;
}

function textFromContent(content) {
	if (typeof content === 'string') {
		return content;
	}
	if (Array.isArray(content)) {
		return content.map(function (item) {
			if (typeof item === 'string') {
				return item;
			}
			return item && typeof item.text === 'string' ? item.text : '';
		}).filter(Boolean).join('\n');
	}
	return '';
}

function findUserMessages(value, messages, seenObjects) {
	if (!value || typeof value !== 'object' || seenObjects.has(value)) {
		return;
	}
	seenObjects.add(value);

	const role = String(value.role || value.author || '').toLowerCase();
	if (role === 'user' || role === 'human') {
		const message = textFromContent(value.content) ||
			textFromContent(value.message) ||
			textFromContent(value.prompt) ||
			textFromContent(value.text);
		if (message.trim()) {
			messages.push(message.trim());
		}
	}

	const toolName = String(value.tool_name || value.toolName || value.name || '').toLowerCase();
	if (toolName.endsWith('exit_plan_mode')) {
		const toolResult = textFromContent(value.content) ||
			textFromContent(value.result) ||
			textFromContent(value.output) ||
			textFromContent(value.tool_response);
		const feedback = /User feedback:\s*([\s\S]+)/i.exec(toolResult);
		if (feedback && feedback[1].trim()) {
			messages.push(feedback[1].trim());
		}
	}

	Object.keys(value).forEach(function (key) {
		findUserMessages(value[key], messages, seenObjects);
	});
}

function captureTranscriptFallback(storage, session, input) {
	const transcriptPath = input.transcript_path || input.transcriptPath;
	if (!transcriptPath || !fs.existsSync(transcriptPath) || session.state.promptCount === 0) {
		return [];
	}

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const stat = fs.statSync(transcriptPath);
	if (stat.size > 10 * 1024 * 1024) {
		throw new Error('Transcript exceeds the 10 MB feedback capture limit.');
	}

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const content = fs.readFileSync(transcriptPath, 'utf8');
	const messages = [];
	try {
		findUserMessages(JSON.parse(content), messages, new Set());
	} catch (_error) {
		content.split(/\r?\n/).forEach(function (line) {
			if (!line.trim()) {
				return;
			}
			try {
				findUserMessages(JSON.parse(line), messages, new Set());
			} catch (_lineError) {
				// Unknown transcript records are ignored so format changes remain non-blocking.
			}
		});
	}

	const eventIds = [];
	Array.from(new Set(messages)).forEach(function (message) {
		const id = recordChatEvent(storage, session, message, 'transcript', session.state.turn, []);
		if (id) {
			eventIds.push(id);
		}
	});
	saveSession(session);
	return eventIds;
}

function removeTurnSnapshots(session, turn) {
	if (!turn) {
		return;
	}
	const turnDirectory = path.join(session.paths.directory, turn.id);
	if (fs.existsSync(turnDirectory)) {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		fs.rmSync(turnDirectory, { recursive: true, force: true });
	}
}

function handlePrompt(storage, session, input) {
	finalizeTurn(storage, session);
	const precedingTurn = session.state.turn;
	const localEventIds = processLocalCorrections(storage, session);
	const prompt = extractPrompt(input);
	const chatEventIds = [];

	if (session.state.promptCount > 0 || precedingTurn) {
		const chatId = recordChatEvent(storage, session, prompt, 'prompt', precedingTurn, localEventIds);
		if (chatId) {
			chatEventIds.push(chatId);
		}
	} else if (prompt) {
		markPromptSeen(session, prompt);
	}

	captureTranscriptFallback(storage, session, input).forEach(function (id) {
		chatEventIds.push(id);
	});

	removeTurnSnapshots(session, precedingTurn);
	session.state.promptCount += 1;
	session.state.turn = {
		id: `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
		startedAt: now(),
		finalizedAt: null,
		feedbackCheckedAt: null,
		files: []
	};
	saveSession(session);
	return localEventIds.concat(chatEventIds);
}

function listEvents(storageRoot, includeResolved) {
	return listEventFiles(storageRoot)
		.map(function (file) { return readJson(file, null); })
		.filter(Boolean)
		.filter(function (event) {
			return includeResolved || event.status === 'pending';
		});
}

function pendingCount(storageRoot) {
	return listEvents(storageRoot, false).length;
}

function handleReviewCommand(storage, command, eventIds) {
	if (command === 'pending') {
		process.stdout.write(`${JSON.stringify({ events: listEvents(storage.storageRoot, false) }, null, 2)}\n`);
		return;
	}
	if (command === 'all') {
		process.stdout.write(`${JSON.stringify({ events: listEvents(storage.storageRoot, true) }, null, 2)}\n`);
		return;
	}

	const statusByCommand = {
		acknowledge: 'applied',
		dismiss: 'dismissed'
	};
	if (command === 'defer') {
		if (!eventIds.length) {
			throw new Error('defer requires at least one event ID.');
		}
		eventIds.forEach(function (eventId) {
			const updated = updateEvent(storage.storageRoot, eventId, function (event) {
				event.deferredAt = now();
			});
			if (!updated) {
				throw new Error(`Unknown feedback event: ${eventId}`);
			}
		});
		return;
	}
	if (!statusByCommand[command]) {
		throw new Error('Usage: track-agent-feedback.js pending|all|acknowledge|dismiss|defer [event-id ...]');
	}
	if (!eventIds.length) {
		throw new Error(`${command} requires at least one event ID.`);
	}

	eventIds.forEach(function (eventId) {
		const updated = updateEvent(storage.storageRoot, eventId, function (event) {
			event.status = statusByCommand[command];
			event.reviewedAt = now();
		});
		if (!updated) {
			throw new Error(`Unknown feedback event: ${eventId}`);
		}
	});
}

function readHookInput() {
	const content = fs.readFileSync(0, 'utf8');
	return content.trim() ? JSON.parse(content) : {};
}

function writeHookResult(message) {
	const result = { continue: true };
	if (message) {
		result.systemMessage = message;
	}
	process.stdout.write(`${JSON.stringify(result)}\n`);
}

function main() {
	const command = process.argv[2];
	const storage = getStorage();

	if (['pending', 'all', 'acknowledge', 'dismiss', 'defer'].indexOf(command) !== -1) {
		handleReviewCommand(storage, command, process.argv.slice(3));
		return;
	}

	const input = readHookInput();
	const session = loadSession(storage.storageRoot, input);
	if (command === 'session-start') {
		const count = pendingCount(storage.storageRoot);
		const message = count
			? `${count} correction candidate(s) are pending from earlier sessions. Before handling the new task, invoke the review-agent-corrections skill and present its proposed guidance changes for approval. Do not apply guidance without explicit approval.`
			: '';
		writeHookResult(message);
		return;
	}
	if (command === 'pre-tool-use') {
		captureBefore(storage, session, input);
		writeHookResult('');
		return;
	}
	if (command === 'stop') {
		finalizeTurn(storage, session);
		const transcriptEvents = captureTranscriptFallback(storage, session, input);
		const count = pendingCount(storage.storageRoot);
		const message = transcriptEvents.length
			? `Captured ${transcriptEvents.length} chat feedback candidate(s). ${count} total pending. Ask to review agent corrections to use the review-agent-corrections skill.`
			: '';
		writeHookResult(message);
		return;
	}
	if (command === 'user-prompt-submit') {
		const events = handlePrompt(storage, session, input);
		const count = pendingCount(storage.storageRoot);
		const message = events.length
			? `Captured ${events.length} correction candidate(s). ${count} total pending. Ask to review agent corrections to use the review-agent-corrections skill.`
			: '';
		writeHookResult(message);
		return;
	}
	throw new Error('Unknown hook event.');
}

try {
	main();
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`Agent feedback tracker: ${message}`);
	if (['session-start', 'pre-tool-use', 'stop', 'user-prompt-submit'].indexOf(process.argv[2]) !== -1) {
		writeHookResult(`Agent feedback tracking warning: ${message}`);
	} else {
		process.exitCode = 1;
	}
}
