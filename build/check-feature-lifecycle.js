//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const {
	findMarkdownFiles,
	loadFeatureLifecycle,
	validateFeatureMarkers
} = require('./feature-lifecycle');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

const validFeatures = loadFeatureLifecycle();
const targetFiles = args.length > 0
	? args
	: [
		...findMarkdownFiles(path.join(ROOT, 'docs')),
		...findMarkdownFiles(path.join(ROOT, 'api')),
		...findMarkdownFiles(path.join(ROOT, 'release-notes'))
	];

let totalIssues = 0;

for (const file of targetFiles) {
	if (!fs.existsSync(file)) {
		continue;
	}
	const content = fs.readFileSync(file, 'utf8');
	const issues = validateFeatureMarkers(content, validFeatures);
	const displayPath = path.relative(ROOT, file);

	for (const issue of issues) {
		totalIssues++;
		console.error(
			`${displayPath}:${issue.line + 1}:${issue.startCharacter + 1} ` +
			`error ${issue.message} [feature-lifecycle/${issue.code}]`
		);
	}
}

if (totalIssues > 0) {
	console.error(`\nFound ${totalIssues} feature lifecycle ${totalIssues === 1 ? 'error' : 'errors'}.`);
	process.exit(1);
} else {
	console.log(`Validated feature markers across ${targetFiles.length} file(s) with 0 errors.`);
}
