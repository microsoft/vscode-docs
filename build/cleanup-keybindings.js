// @ts-check

const fs = require('fs');
const path = require('path');

const keybindingsDir = path.join(__dirname, 'keybindings');
const files = ['doc.keybindings.win.json', 'doc.keybindings.osx.json', 'doc.keybindings.linux.json'];

for (const file of files) {
	const filePath = path.join(keybindingsDir, file);
	if (!fs.existsSync(filePath)) {
		console.log(`Skipping ${file} (not found)`);
		continue;
	}

	console.log(`Processing ${file}...`);
	const content = fs.readFileSync(filePath, 'utf8');
	const lines = content.split('\n');

	// Step 1: Remove comment lines
	const noComments = lines.filter(line => !line.trimStart().startsWith('//'));

	// Step 2-4: Group lines into entries and filter
	const entries = [];
	let current = [];

	for (const line of noComments) {
		if (line.trimStart().startsWith('{ "key":')) {
			if (current.length > 0) {
				entries.push(current);
			}
			current = [line];
		} else if (current.length > 0) {
			current.push(line);
		} else {
			// Standalone lines like `[` or `]`
			entries.push([line]);
		}
	}
	if (current.length > 0) {
		entries.push(current);
	}

	const filtered = entries.filter(entry => {
		const joined = entry.join('\n');

		// Step 2: Remove entries containing isWeb
		if (joined.includes('isWeb')) {
			return false;
		}

		// Step 3a: Remove entries containing action.terminal.sendSequence
		if (joined.includes('action.terminal.sendSequence')) {
			return false;
		}

		// Step 3b: Remove entries containing both action.terminal.openDetectedLink and shift+o
		if (joined.includes('action.terminal.openDetectedLink') && /shift\+o/i.test(joined)) {
			return false;
		}

		// Step 4: Remove entries containing [IntlBackslash]
		if (joined.includes('[IntlBackslash]')) {
			return false;
		}

		return true;
	});

	// Step 5: Remove all when clauses and args fields from remaining entries
	const cleaned = filtered.map(entry => {
		return entry.filter(line => !line.match(/^\s+"when":/) && !line.match(/^\s+"args":/));
	});

	// Fix trailing commas on command lines where when was removed
	const result = cleaned.map(entry => {
		return entry.map(line => {
			// A command line ending with `,` followed by no `"when":` line needs the comma replaced with ` }`
			return line;
		});
	});

	// Reassemble and fix up the JSON-like structure
	let output = result.map(entry => entry.join('\n')).join('\n');

	// When a "when" line is removed, the preceding line (command line) ends with `,`
	// but now needs to end with ` }` or ` },` depending on context.
	// Pattern: a line ending with `"command": "...",` that was followed by a removed when line
	// now needs the trailing comma replaced to close the object.
	// Also handle lines with `"command": "...",\n "args":` which should keep the comma.

	// Rebuild by re-parsing entries from the cleaned output
	const outputLines = output.split('\n');
	const finalLines = [];

	for (let i = 0; i < outputLines.length; i++) {
		const line = outputLines[i];
		const nextLine = outputLines[i + 1];

		// Check if this is a command line that originally had a "when" after it
		// A command line ends with `"command": "...",` and the next line should be a when or args line
		// If the next line is another entry or `]`, we need to close this object
		if (line.match(/"command":\s*"[^"]*",\s*$/) &&
			(!nextLine || nextLine.trimStart().startsWith('{ "key":') || nextLine.trim() === ']')) {
			// Remove trailing comma and close the object
			finalLines.push(line.replace(/,\s*$/, ' },'));
		} else if (line.match(/"command":\s*"[^"]*"\s*\},?\s*$/) ||
			line.match(/"args":\s*\{.*\}\s*\},?\s*$/)) {
			finalLines.push(line);
		} else {
			finalLines.push(line);
		}
	}

	// Fix the last entry: should not have a trailing comma before `]`
	for (let i = finalLines.length - 1; i >= 0; i--) {
		if (finalLines[i].trim() === ']') {
			// Find the previous non-empty line and remove its trailing comma
			for (let j = i - 1; j >= 0; j--) {
				if (finalLines[j].trim()) {
					finalLines[j] = finalLines[j].replace(/\},\s*$/, '}');
					break;
				}
			}
			break;
		}
	}

	fs.writeFileSync(filePath, finalLines.join('\n'), 'utf8');
	console.log(`  Done: ${filePath}`);
}
