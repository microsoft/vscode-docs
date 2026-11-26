//@ts-check
'use strict';

const { spawnSync } = require('child_process');
const { hasGitLfs } = require('./check-lfs');
const { validateReleaseNoteToc } = require('./release-note-toc');

const RELEASE_NOTE_PATTERN = /^release-notes\/v1_\d+\.md$/i;
const MEDIA_PATTERN = /\.(?:gif|mp4|jpg|png)$/i;
const MAX_BUFFER = 20 * 1024 * 1024;

/**
 * @param {string[]} args
 * @param {'buffer' | 'utf8'} encoding
 */
function runGit(args, encoding) {
	const result = spawnSync('git', args, { encoding, maxBuffer: MAX_BUFFER });
	if (result.status !== 0) {
		const stderr = Buffer.isBuffer(result.stderr)
			? result.stderr.toString('utf8')
			: result.stderr;
		throw new Error(stderr.trim() || `git ${args.join(' ')} failed.`);
	}
	return result.stdout;
}

function getStagedFiles() {
	const output = runGit(
		['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'],
		'buffer'
	);
	if (!Buffer.isBuffer(output)) {
		throw new TypeError('Expected Git to return staged file names as a buffer.');
	}
	return output.toString('utf8').split('\0').filter(Boolean);
}

/**
 * @param {string} file
 */
function getStagedContent(file) {
	const output = runGit(['show', `:${file}`], 'utf8');
	if (typeof output !== 'string') {
		throw new TypeError(`Expected Git to return text content for ${file}.`);
	}
	return output;
}

function main() {
	const stagedFiles = getStagedFiles();
	const releaseNotes = stagedFiles.filter(file => RELEASE_NOTE_PATTERN.test(file));
	const mediaFiles = stagedFiles.filter(file => MEDIA_PATTERN.test(file));
	let issueCount = 0;

	for (const file of releaseNotes) {
		const issues = validateReleaseNoteToc(getStagedContent(file));
		for (const issue of issues) {
			issueCount++;
			console.error(
				`${file}:${issue.line + 1}:${issue.startCharacter + 1} ` +
				`error ${issue.message} [release-note-toc/${issue.code}]`
			);
		}
	}

	if (issueCount > 0) {
		console.error(`\nFound ${issueCount} release note ToC ${issueCount === 1 ? 'error' : 'errors'}.`);
		process.exitCode = 1;
	}

	if (mediaFiles.length > 0 && !hasGitLfs()) {
		console.error('Please install Git LFS for committing {gif,mp4,jpg,png} files. See https://github.com/microsoft/vscode-docs#cloning for instructions.');
		process.exitCode = 1;
	}
}

if (require.main === module) {
	try {
		main();
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	}
}

module.exports = {
	getStagedContent,
	getStagedFiles
};
