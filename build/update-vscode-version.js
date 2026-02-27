//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const readline = require('readline');

function prompt(question) {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

function validateCommitHash(hash) {
	if (!/^[0-9a-f]{40}$/i.test(hash)) {
		console.error('Error: commitHash must be a 40-character hex string.');
		process.exit(1);
	}
}

function validateVersion(ver) {
	if (!/^\d+\.\d+\.\d+$/.test(ver)) {
		console.error('Error: version must be in the format x.y.z (e.g. 1.110.0).');
		process.exit(1);
	}
}

function printHelp() {
	console.log(`Usage: node update-vscode-version.js [<commitHash> <version>]

Updates VSCodeCommitHash and VSCodeVersion in all template files.

Arguments:
  commitHash    A 40-character git commit hash
  version       A version string in x.y.z format (e.g. 1.110.0)

Options:
  -h, --help    Show this help message

If no arguments are provided, you will be prompted to enter the values.
The commit hash and version can be found at:
  https://builds.code.visualstudio.com/builds/insider`);
}

async function getInputs() {
	const args = process.argv.slice(2);

	if (args.includes('-h') || args.includes('--help')) {
		printHelp();
		process.exit(0);
	}

	if (args.length >= 2) {
		const commitHash = args[0];
		const version = args[1];
		validateCommitHash(commitHash);
		validateVersion(version);
		return { commitHash, version };
	}

	console.log('Get the commit hash and version from: https://builds.code.visualstudio.com/builds/insider\n');

	const commitHash = await prompt('Enter the commit hash: ');
	validateCommitHash(commitHash);

	const version = await prompt('Enter the version (x.y.z): ');
	validateVersion(version);

	return { commitHash, version };
}

async function main() {
	const { commitHash, version } = await getInputs();

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
}

main();
