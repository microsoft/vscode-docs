// @ts-check

const fs = require('fs');
const path = require('path');

const files = ['doc.keybindings.win.json', 'doc.keybindings.osx.json', 'doc.keybindings.linux.json'];

const [baseDir, additionsDir] = process.argv.slice(2);

if (!baseDir || !additionsDir) {
	console.error('Usage: node append-keybindings.js <baseDir> <additionsDir>');
	console.error('  Appends the keybinding entries from <additionsDir> to the corresponding files in <baseDir>.');
	process.exit(1);
}

for (const dir of [baseDir, additionsDir]) {
	if (!fs.existsSync(dir)) {
		console.error(`Directory not found: ${dir}`);
		process.exit(1);
	}
}

/**
 * Extract the lines between the first `[` and the last `]` of a JSONC keybindings array.
 * @param {string} content
 * @param {string} file
 * @returns {string[]}
 */
function extractBody(content, file) {
	const lines = content.split('\n');
	const openIndex = lines.findIndex(line => line.trim().startsWith('['));
	let closeIndex = -1;
	for (let i = lines.length - 1; i >= 0; i--) {
		if (lines[i].trim().startsWith(']')) {
			closeIndex = i;
			break;
		}
	}
	if (openIndex === -1 || closeIndex === -1 || closeIndex <= openIndex) {
		throw new Error(`Could not find a valid JSON array ("[ ... ]") in ${file}`);
	}
	return lines.slice(openIndex + 1, closeIndex);
}

for (const file of files) {
	const basePath = path.join(baseDir, file);
	const additionsPath = path.join(additionsDir, file);

	if (!fs.existsSync(basePath)) {
		console.log(`Skipping ${file} (not found in base directory)`);
		continue;
	}
	if (!fs.existsSync(additionsPath)) {
		console.log(`Skipping ${file} (not found in additions directory)`);
		continue;
	}

	console.log(`Processing ${file}...`);

	const baseContent = fs.readFileSync(basePath, 'utf8');
	const additionsContent = fs.readFileSync(additionsPath, 'utf8');

	const additionsBody = extractBody(additionsContent, additionsPath);

	// Nothing meaningful to append if there are no keybinding entries.
	if (!additionsBody.some(line => line.trim().startsWith('{'))) {
		console.log(`  No entries to append from ${additionsPath}`);
		continue;
	}

	const lines = baseContent.split('\n');

	// Locate the closing `]` of the base array.
	let closeIndex = -1;
	for (let i = lines.length - 1; i >= 0; i--) {
		if (lines[i].trim().startsWith(']')) {
			closeIndex = i;
			break;
		}
	}
	if (closeIndex === -1) {
		throw new Error(`Could not find a closing "]" in ${basePath}`);
	}

	// Ensure the last existing entry ends with a comma so the appended entries stay valid.
	for (let i = closeIndex - 1; i >= 0; i--) {
		const trimmed = lines[i].trim();
		if (trimmed === '') {
			continue;
		}
		if (trimmed === '[') {
			// Empty array, no preceding entry to add a comma to.
			break;
		}
		if (!/,\s*$/.test(lines[i])) {
			lines[i] = lines[i].replace(/\s*$/, '') + ',';
		}
		break;
	}

	const merged = [...lines.slice(0, closeIndex), ...additionsBody, ...lines.slice(closeIndex)];
	fs.writeFileSync(basePath, merged.join('\n'), 'utf8');

	const entryCount = additionsBody.filter(line => line.trim().startsWith('{')).length;
	console.log(`  Done: appended ${entryCount} entr${entryCount === 1 ? 'y' : 'ies'} to ${basePath}`);
}
