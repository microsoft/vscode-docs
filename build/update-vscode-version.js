//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const args = process.argv.slice(2);

if (args.length < 2) {
	console.error('Usage: node update-vscode-version.js <commitHash> <version>');
	process.exit(1);
}

const commitHash = args[0];
const version = args[1];

if (!/^[0-9a-f]{40}$/i.test(commitHash)) {
	console.error('Error: commitHash must be a 40-character hex string.');
	process.exit(1);
}

if (!/^\d+\.\d+\.\d+$/.test(version)) {
	console.error('Error: version must be in the format x.y.z (e.g. 1.110.0).');
	process.exit(1);
}

const rootDir = path.join(__dirname, '..');
const templateFiles = glob.sync('**/*.template{,.md}', { cwd: rootDir, absolute: true });

let updatedCount = 0;

for (const file of templateFiles) {
	let content = fs.readFileSync(file, 'utf8');
	let changed = false;

	const newContent = content
		.replace(/^(VSCodeCommitHash:\s*).*$/m, (_, prefix) => {
			changed = true;
			return `${prefix}${commitHash}`;
		})
		.replace(/^(VSCodeVersion:\s*).*$/m, (_, prefix) => {
			changed = true;
			return `${prefix}${version}`;
		});

	if (changed) {
		fs.writeFileSync(file, newContent, 'utf8');
		console.log(`Updated: ${path.relative(rootDir, file)}`);
		updatedCount++;
	}
}

console.log(`\nDone. Updated ${updatedCount} file(s).`);
