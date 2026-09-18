//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const RELEASE_NOTES_DIR = path.join(ROOT, 'release-notes');
const RELEASE_NOTES_IMAGES_DIR = path.join(ROOT, 'release-notes', 'images');
const TEMPLATE_STABLE = path.join(ROOT, 'templates', 'template-release-note-endgame.md');
const TEMPLATE_INSIDERS = path.join(ROOT, 'templates', 'template-release-note-insiders.md');
const TEMPLATE_IMAGES_DIR = path.join(ROOT, 'templates', 'images');

function prompt(question) {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

function printHelp() {
	console.log(`Usage: node build/create-release-notes.js [--insiders] [<releaseNumber> <releaseDate> <milestone> [<lastUpdated>]]

Creates a new release notes file from a template.

Arguments:
  releaseNumber   The VS Code minor version number (e.g. 111)
  releaseDate     The release date in YYYY-MM-DD format (e.g. 2026-04-02)
  milestone       The milestone name (e.g. "v1.111")
  lastUpdated     (Insiders only) The last updated date in YYYY-MM-DD format

Options:
  --insiders      Create an Insiders release note instead of Stable
  -h, --help      Show this help message

If no arguments are provided, you will be prompted to enter the values.
The Order sequence number is auto-incremented from the previous release.

Examples:
  node build/create-release-notes.js 111 2026-04-02 "v1.111"
  node build/create-release-notes.js --insiders 111 2026-04-02 "v1.111" 2026-04-10`);
}

/**
 * Find the highest Order value among existing release notes files.
 */
function getLatestOrder() {
	const files = fs.readdirSync(RELEASE_NOTES_DIR).filter(f => /^v1_\d+\.md$/.test(f));
	let maxOrder = 0;

	for (const file of files) {
		const content = fs.readFileSync(path.join(RELEASE_NOTES_DIR, file), 'utf-8');
		const match = content.match(/^Order:\s*(\d+)/m);
		if (match) {
			maxOrder = Math.max(maxOrder, parseInt(match[1], 10));
		}
	}

	return maxOrder;
}

/**
 * Format "March 4, 2026" from a YYYY-MM-DD date string.
 */
function formatReleaseDate(dateStr) {
	const parts = dateStr.split('-');
	const month = MONTHS[parseInt(parts[1], 10) - 1];
	const day = parseInt(parts[2], 10);
	const year = parts[0];
	return `${month} ${day}, ${year}`;
}

/**
 * Extract month name and year from a YYYY-MM-DD date string.
 */
function parseMonthYear(dateStr) {
	const parts = dateStr.split('-');
	const month = MONTHS[parseInt(parts[1], 10) - 1];
	const year = parts[0];
	return { month, year };
}

/**
 * Copy images from templates/images to release-notes/images/1_<releaseNumber>/.
 * Creates the target directory if it doesn't exist.
 */
function copyInsidersImages(releaseNumber) {
	const targetDir = path.join(RELEASE_NOTES_IMAGES_DIR, `1_${releaseNumber}`);

	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
	}

	if (!fs.existsSync(TEMPLATE_IMAGES_DIR)) {
		console.warn(`Warning: Template images directory not found: ${TEMPLATE_IMAGES_DIR}`);
		return;
	}

	const files = fs.readdirSync(TEMPLATE_IMAGES_DIR);
	let copiedCount = 0;

	for (const file of files) {
		const srcPath = path.join(TEMPLATE_IMAGES_DIR, file);
		const destPath = path.join(targetDir, file);

		// Skip if not a file
		if (!fs.statSync(srcPath).isFile()) {
			continue;
		}

		fs.copyFileSync(srcPath, destPath);
		copiedCount++;
		console.log(`  Copied: ${path.relative(ROOT, destPath)}`);
	}

	if (copiedCount === 0) {
		console.warn(`Warning: No images found in ${TEMPLATE_IMAGES_DIR}`);
	}
}

function validateReleaseNumber(num) {
	if (!/^\d+$/.test(num)) {
		console.error('Error: releaseNumber must be a positive integer (e.g. 111).');
		process.exit(1);
	}
}

function validateDate(dateStr) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
		console.error('Error: releaseDate must be in YYYY-MM-DD format (e.g. 2026-04-02).');
		process.exit(1);
	}
}

async function getInputs() {
	const rawArgs = process.argv.slice(2);

	if (rawArgs.includes('-h') || rawArgs.includes('--help')) {
		printHelp();
		process.exit(0);
	}

	const isInsiders = rawArgs.includes('--insiders');
	const args = rawArgs.filter(a => a !== '--insiders');

	if (args.length >= 3) {
		const releaseNumber = args[0];
		const releaseDate = args[1];
		validateReleaseNumber(releaseNumber);
		validateDate(releaseDate);

		// Last arg might be lastUpdated date if it matches YYYY-MM-DD
		let lastUpdated;
		let milestoneArgs;
		if (isInsiders && args.length >= 4 && /^\d{4}-\d{2}-\d{2}$/.test(args[args.length - 1])) {
			lastUpdated = args[args.length - 1];
			milestoneArgs = args.slice(2, -1);
		} else {
			milestoneArgs = args.slice(2);
		}
		const milestone = milestoneArgs.join(' ');

		if (isInsiders && !lastUpdated) {
			lastUpdated = await prompt('Enter the last updated date (YYYY-MM-DD, e.g. 2026-04-10): ');
			validateDate(lastUpdated);
		}

		return { releaseNumber, releaseDate, milestone, isInsiders, lastUpdated };
	}

	const releaseNumber = await prompt('Enter the release number (e.g. 111): ');
	validateReleaseNumber(releaseNumber);

	const releaseDate = await prompt('Enter the release date (YYYY-MM-DD, e.g. 2026-04-02): ');
	validateDate(releaseDate);

	const milestone = await prompt('Enter the milestone name (e.g. v1.111): ');

	let lastUpdated;
	if (isInsiders) {
		lastUpdated = await prompt('Enter the last updated date (YYYY-MM-DD, e.g. 2026-04-10): ');
		validateDate(lastUpdated);
	}

	return { releaseNumber, releaseDate, milestone, isInsiders, lastUpdated };
}

async function main() {
	const { releaseNumber, releaseDate, milestone, isInsiders, lastUpdated } = await getInputs();
	const edition = isInsiders ? 'Insiders' : 'Stable';

	const outputFile = path.join(RELEASE_NOTES_DIR, `v1_${releaseNumber}.md`);

	let existingOrder;
	if (fs.existsSync(outputFile)) {
		if (isInsiders) {
			console.error(`Error: ${outputFile} already exists.`);
			process.exit(1);
		}
		// For stable, allow replacing an existing insiders file
		const existing = fs.readFileSync(outputFile, 'utf-8');
		if (!/^ProductEdition:\s*Insiders$/m.test(existing)) {
			console.error(`Error: ${outputFile} already exists and is not an Insiders edition.`);
			process.exit(1);
		}
		// Preserve the Order from the existing insiders file
		const orderMatch = existing.match(/^Order:\s*(\d+)/m);
		if (orderMatch) {
			existingOrder = parseInt(orderMatch[1], 10);
		}
		console.log(`Replacing existing Insiders release note with Stable edition.`);
	}

	const newOrder = existingOrder || (getLatestOrder() + 1);

	const templatePath = isInsiders ? TEMPLATE_INSIDERS : TEMPLATE_STABLE;
	let template = fs.readFileSync(templatePath, 'utf-8');

	const { month, year } = parseMonthYear(releaseDate);
	const formattedDate = formatReleaseDate(releaseDate);
	const parts = releaseDate.split('-');
	const day = parseInt(parts[2], 10);

	// For insiders, use the lastUpdated date for date-related placeholders
	const contentDate = lastUpdated || releaseDate;
	const { month: contentMonth, year: contentYear } = parseMonthYear(contentDate);
	const contentParts = contentDate.split('-');
	const contentDay = parseInt(contentParts[2], 10);
	const formattedContentDate = formatReleaseDate(contentDate);

	// Replace placeholders in the template
	// Order matters: replace compound placeholders before individual ones
	template = template
		.replace(/<sequence number>/g, String(newOrder))
		.replace(/<release Month day, year>/g, formattedDate)
		.replace(/<Month> <day>, <year>/g, `${contentMonth} ${contentDay}, ${contentYear}`)
		.replace(/<month>-<day>-<year>/g, `${contentMonth.toLowerCase()}-${contentDay}-${contentYear}`)
		.replace(/<Month day, year>/g, `${contentMonth} ${contentDay}, ${contentYear}`)
		.replace(/<Month> <Year>/g, `${contentMonth} ${contentYear}`)
		.replace(/<YYYY-MM-DD>/g, releaseDate)
		.replace(/<release number>/g, releaseNumber)
		.replace(/<milestone name[^>]*>/g, milestone)
		.replace(/<Month>/g, contentMonth)
		.replace(/<Year>/g, contentYear)
		.replace(/<day>/g, String(contentDay))
		.replace(/<year>/g, contentYear)
		.replace(/<month>/g, contentMonth.toLowerCase());

	fs.writeFileSync(outputFile, template, 'utf-8');

	console.log(`Created ${path.relative(ROOT, outputFile)} (${edition})`);
	console.log(`  Order:          ${newOrder}`);
	console.log(`  Version:        1.${releaseNumber}`);
	console.log(`  Milestone:      ${milestone}`);
	console.log(`  Date:           ${formattedDate}`);

	// Copy images from templates folder for Insiders releases
	if (isInsiders) {
		console.log(`\nCopying images to release-notes/images/1_${releaseNumber}/:`);
		copyInsidersImages(releaseNumber);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
