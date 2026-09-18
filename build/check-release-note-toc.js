//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { validateReleaseNoteToc } = require('./release-note-toc');

const files = process.argv.slice(2);

if (files.length === 0) {
	console.error('Usage: node build/check-release-note-toc.js <release-note.md> [...]');
	process.exit(2);
}

let issueCount = 0;

for (const file of files) {
	const displayPath = path.relative(process.cwd(), file);
	// The file paths are supplied by lint-staged or explicitly by the contributor.
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const content = fs.readFileSync(file, 'utf8');
	const issues = validateReleaseNoteToc(content);

	for (const issue of issues) {
		issueCount++;
		console.error(
			`${displayPath}:${issue.line + 1}:${issue.startCharacter + 1} ` +
			`error ${issue.message} [release-note-toc/${issue.code}]`
		);
	}
}

if (issueCount > 0) {
	console.error(`\nFound ${issueCount} release note ToC ${issueCount === 1 ? 'error' : 'errors'}.`);
	process.exit(1);
}
