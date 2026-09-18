// @ts-check

const fs = require('fs');
const path = require('path');

const keybindingsDir = path.join(__dirname, 'keybindings');
const files = ['doc.keybindings.win.json', 'doc.keybindings.osx.json', 'doc.keybindings.linux.json'];

/**
 * @typedef {{ key: string, command: string, when?: unknown, args?: unknown, [property: string]: unknown }} Keybinding
 */

/**
 * @param {string} content
 * @returns {string}
 */
function cleanupKeybindings(content) {
	let json = content
		.split(/\r?\n/)
		.filter(line => !line.trimStart().startsWith('//'))
		.join('\n')
		.trim();

	// The generated keybindings can omit the closing array bracket while leaving
	// a complete final entry with a trailing comma.
	if (json.startsWith('[') && !json.endsWith(']') && /\},\s*$/.test(json)) {
		json = `${json.replace(/,\s*$/, '')}\n]`;
	}

	/** @type {unknown} */
	const parsed = JSON.parse(json);

	if (!Array.isArray(parsed)) {
		throw new TypeError('Expected the keybindings file to contain an array');
	}

	/** @type {Keybinding[]} */
	const keybindings = parsed.map((entry, index) => {
		if (typeof entry !== 'object' || entry === null ||
			typeof entry.key !== 'string' || typeof entry.command !== 'string') {
			throw new TypeError(`Expected keybinding ${index + 1} to have string key and command properties`);
		}
		return entry;
	});

	const seenKeyCommandPairs = new Set();
	const cleaned = [];

	for (const keybinding of keybindings) {
		const serialized = JSON.stringify(keybinding);
		if (serialized.includes('isWeb') ||
			keybinding.command.includes('action.terminal.sendSequence') ||
			(keybinding.command.includes('action.terminal.openDetectedLink') && /shift\+o/i.test(keybinding.key)) ||
			keybinding.key.includes('[IntlBackslash]')) {
			continue;
		}

		const signature = JSON.stringify([keybinding.key, keybinding.command]);
		if (seenKeyCommandPairs.has(signature)) {
			continue;
		}
		seenKeyCommandPairs.add(signature);

		const { when, args, ...remaining } = keybinding;
		cleaned.push(remaining);
	}

	const lines = cleaned.map(keybinding => {
		if (Object.keys(keybinding).length === 2) {
			const keyProperty = `"key": ${JSON.stringify(keybinding.key)},`;
			return `{ ${keyProperty.padEnd(31)} "command": ${JSON.stringify(keybinding.command)} }`;
		}

		const properties = Object.entries(keybinding)
			.map(([property, value]) => `${JSON.stringify(property)}: ${JSON.stringify(value)}`)
			.join(', ');
		return `{ ${properties} }`;
	});

	return `[\n${lines.join(',\n')}\n]\n`;
}

if (require.main === module) {
	for (const file of files) {
		const filePath = path.join(keybindingsDir, file);
		if (!fs.existsSync(filePath)) {
			console.log(`Skipping ${file} (not found)`);
			continue;
		}

		console.log(`Processing ${file}...`);
		const content = fs.readFileSync(filePath, 'utf8');
		const output = cleanupKeybindings(content);
		fs.writeFileSync(filePath, output, 'utf8');
		console.log(`  Done: ${filePath}`);
	}
}

module.exports = { cleanupKeybindings };
