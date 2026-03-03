// @ts-check
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

function validateDate(date) {
	// Validate yyyy-mm-dd format
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		console.error('Error: date must be in the format yyyy-mm-dd (e.g., 2026-03-05).');
		process.exit(1);
	}

	const [year, month, day] = date.split('-').map(Number);
	const dateObj = new Date(year, month - 1, day);

	if (dateObj.getFullYear() !== year ||
	    dateObj.getMonth() !== month - 1 ||
	    dateObj.getDate() !== day) {
		console.error('Error: invalid date provided.');
		process.exit(1);
	}
}

function validateVersion(version) {
	if (!/^1[._]\d+$/.test(version)) {
		console.error('Error: version must be in the format 1.110 or 1_110.');
		process.exit(1);
	}
}

function convertToDocDate(isoDate) {
	// Convert yyyy-mm-dd to mm/dd/yyyy
	const [year, month, day] = isoDate.split('-');
	return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

function formatReleaseDateSentence(isoDate) {
	const [year, month, day] = isoDate.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function updateDateApproved(content, newDate) {
	if (!content.startsWith('---\n')) {
		return { content, changed: false };
	}

	const endIndex = content.indexOf('\n---\n', 4);
	if (endIndex === -1) {
		return { content, changed: false };
	}

	const frontmatter = content.substring(0, endIndex + 5);
	const body = content.substring(endIndex + 5);

	if (!/^DateApproved:\s*/m.test(frontmatter)) {
		return { content, changed: false };
	}

	const newFrontmatter = frontmatter.replace(
		/^(DateApproved:\s*).*$/m,
		`$1${newDate}`
	);

	if (newFrontmatter === frontmatter) {
		return { content, changed: false };
	}

	return {
		content: newFrontmatter + body,
		changed: true
	};
}

function updateReleaseNoteDate(content, newDate) {
	let changed = false;

	if (!content.startsWith('---\n')) {
		return { content, changed: false };
	}

	const endIndex = content.indexOf('\n---\n', 4);
	if (endIndex === -1) {
		return { content, changed: false };
	}

	const frontmatter = content.substring(0, endIndex + 5);
	const body = content.substring(endIndex + 5);

	const newFrontmatter = frontmatter.replace(
		/^(Date:\s*).*$/m,
		(match, prefix) => {
			changed = true;
			return `${prefix}${newDate}`;
		}
	);

	const formattedDate = formatReleaseDateSentence(newDate);
	const newBody = body.replace(
		/^_Release date:.*_$/m,
		(match) => {
			changed = true;
			return `_Release date: ${formattedDate}_`;
		}
	);

	if (!changed) {
		return { content, changed: false };
	}

	return {
		content: newFrontmatter + newBody,
		changed: true
	};
}

function printHelp() {
	console.log(`Usage: node update-dates.js [<version> <date>]

Updates DateApproved in documentation and Date in release notes with the same date.

Arguments:
  version       Release version in format 1.110 or 1_110
  date          Date in yyyy-mm-dd format (e.g., 2026-03-05)

Options:
  -h, --help    Show this help message

If no arguments are provided, you will be prompted to enter them.

Example:
  node update-dates.js 1.110 2026-03-05

Documentation paths updated (DateApproved):
  - api/**/*.md
  - docs/setup/**/*.md
  - docs/getstarted/**/*.md
  - docs/editing/**/*.md
  - docs/debugtest/**/*.md
  - docs/copilot/**/*.md
  - docs/sourcecontrol/**/*.md
  - docs/terminal/**/*.md
  - docs/enterprise/**/*.md
  - docs/languages/**/*.md
  - docs/nodejs/**/*.md
  - docs/typescript/**/*.md
  - docs/remote/**/*.md
  - docs/devcontainers/**/*.md
  - docs/reference/**/*.md
  - remote/**/*.md`);
}

async function updateDocumentation(docDate) {
	console.log(`\n--- Updating Documentation ---`);
	console.log(`DateApproved: ${docDate}\n`);

	const rootDir = path.join(__dirname, '..');

	const patterns = [
		'api/**/*.md',
		'docs/setup/**/*.md',
		'docs/getstarted/**/*.md',
		'docs/editing/**/*.md',
		'docs/debugtest/**/*.md',
		'docs/copilot/**/*.md',
		'docs/sourcecontrol/**/*.md',
		'docs/terminal/**/*.md',
		'docs/enterprise/**/*.md',
		'docs/languages/**/*.md',
		'docs/nodejs/**/*.md',
		'docs/typescript/**/*.md',
		'docs/remote/**/*.md',
		'docs/devcontainers/**/*.md',
		'docs/reference/**/*.md',
		'remote/**/*.md'
	];

	let totalFiles = 0;
	let updatedCount = 0;
	let skippedCount = 0;

	for (const pattern of patterns) {
		const files = glob.sync(pattern, { cwd: rootDir, absolute: true });

		for (const file of files) {
			totalFiles++;
			const content = fs.readFileSync(file, 'utf8');
			const { content: newContent, changed } = updateDateApproved(content, docDate);

			if (changed) {
				fs.writeFileSync(file, newContent, 'utf8');
				console.log(`  Updated: ${path.relative(rootDir, file)}`);
				updatedCount++;
			} else {
				skippedCount++;
			}
		}
	}

	console.log(`\nDocumentation: Processed ${totalFiles} file(s).`);
	console.log(`  Updated: ${updatedCount}`);
	console.log(`  Skipped: ${skippedCount} (no DateApproved field or already up to date)`);
}

async function updateReleaseNote(version, releaseDate) {
	console.log(`\n--- Updating Release Note ---`);
	console.log(`Version: ${version}`);
	console.log(`Date: ${releaseDate} (${formatReleaseDateSentence(releaseDate)})\n`);

	const rootDir = path.join(__dirname, '..');
	const fileVersion = version.replace('.', '_');
	const releaseNoteFile = path.join(rootDir, 'release-notes', `v${fileVersion}.md`);

	if (!fs.existsSync(releaseNoteFile)) {
		console.error(`Error: Release note file not found: ${releaseNoteFile}`);
		console.error(`Make sure the file exists before running this script.`);
		process.exit(1);
	}

	const content = fs.readFileSync(releaseNoteFile, 'utf8');
	const { content: newContent, changed } = updateReleaseNoteDate(content, releaseDate);

	if (changed) {
		fs.writeFileSync(releaseNoteFile, newContent, 'utf8');
		console.log(`  ✓ Updated Date field in frontmatter`);
		console.log(`  ✓ Updated release date sentence`);
		console.log(`\nRelease note: Successfully updated v${fileVersion}.md`);
	} else {
		console.log(`Release note: No changes needed.`);
	}
}

async function main() {
	const args = process.argv.slice(2);

	if (args.includes('-h') || args.includes('--help')) {
		printHelp();
		process.exit(0);
	}

	let version, date;

	if (args.length === 0) {
		// Interactive mode
		version = await prompt('Enter version (e.g., 1.110): ');
		validateVersion(version);
		date = await prompt('Enter date (yyyy-mm-dd): ');
		validateDate(date);
	} else if (args.length >= 2) {
		// Command-line mode
		version = args[0];
		date = args[1];
		validateVersion(version);
		validateDate(date);
	} else {
		console.error('Error: Missing arguments.');
		console.error('Usage: node update-dates.js <version> <date>');
		console.error('Run with --help for more information.');
		process.exit(1);
	}

	console.log(`\nUpdating dates for version ${version} with date ${date}`);
	console.log(`  Documentation DateApproved: ${convertToDocDate(date)}`);
	console.log(`  Release note Date: ${date}`);
	console.log(`  Release date sentence: ${formatReleaseDateSentence(date)}`);

	// Update documentation with converted date
	await updateDocumentation(convertToDocDate(date));

	// Update release note with ISO date
	await updateReleaseNote(version, date);

	console.log('\n✓ Done!');
}

main();
