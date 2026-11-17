//@ts-check
'use strict';

const fs = require('fs');
const path = require('path');

const FEATURE_PATTERN = /`feature\(([a-z0-9]+(?:-[a-z0-9]+)*)\)`/g;

/**
 * @typedef {Object} FeatureLifecycleIssue
 * @property {'undefined-feature'} code
 * @property {number} line
 * @property {number} startCharacter
 * @property {number} endCharacter
 * @property {string} feature
 * @property {string} message
 */

/**
 * Load valid feature IDs from a feature-lifecycle JSON file.
 * @param {string} [filePath]
 * @returns {Set<string>}
 */
function loadFeatureLifecycle(filePath) {
	const resolvedPath = filePath || path.join(__dirname, 'feature-lifecycle.json');
	const raw = fs.readFileSync(resolvedPath, 'utf8');
	const parsed = JSON.parse(raw);
	if (!parsed || typeof parsed !== 'object' || !parsed.features) {
		throw new Error(`Invalid feature-lifecycle file: ${resolvedPath}`);
	}
	return new Set(Object.keys(parsed.features));
}

/**
 * Update code block fence tracking.
 * @param {{ character: string, length: number } | undefined} fence
 * @param {string} line
 */
function updateFence(fence, line) {
	if (!fence) {
		const openMatch = line.match(/^\s*(`{3,}|~{3,})/);
		if (!openMatch) {
			return fence;
		}
		const marker = openMatch[1];
		return { character: marker.charAt(0), length: marker.length };
	}

	const closeMatch = line.match(/^\s*(`{3,}|~{3,})\s*$/);
	if (!closeMatch) {
		return fence;
	}
	const marker = closeMatch[1];
	if (marker.charAt(0) === fence.character && marker.length >= fence.length) {
		return undefined;
	}
	return fence;
}

/**
 * Validate that every feature(<id>) marker refers to a known feature ID.
 * @param {string} content
 * @param {Set<string>} validFeatures
 * @returns {FeatureLifecycleIssue[]}
 */
function validateFeatureMarkers(content, validFeatures) {
	const lines = content.split(/\r?\n/);
	/** @type {FeatureLifecycleIssue[]} */
	const issues = [];
	let fence;

	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];

		if (fence) {
			fence = updateFence(fence, line);
			continue;
		}

		const nextFence = updateFence(undefined, line);
		if (nextFence) {
			fence = nextFence;
			continue;
		}

		let match;
		FEATURE_PATTERN.lastIndex = 0;
		while ((match = FEATURE_PATTERN.exec(line)) !== null) {
			const featureId = match[1];
			if (!validFeatures.has(featureId)) {
				issues.push({
					code: 'undefined-feature',
					line: lineIndex,
					startCharacter: match.index,
					endCharacter: match.index + match[0].length,
					feature: featureId,
					message: `Feature "${featureId}" is not defined in build/feature-lifecycle.json.`
				});
			}
		}
	}

	return issues;
}

/**
 * Recursively find markdown files in a directory.
 * @param {string} dir
 * @returns {string[]}
 */
function findMarkdownFiles(dir) {
	if (!fs.existsSync(dir)) {
		return [];
	}
	/** @type {string[]} */
	let results = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name !== 'node_modules' && entry.name !== '.git') {
				results = results.concat(findMarkdownFiles(fullPath));
			}
		} else if (entry.name.endsWith('.md')) {
			results.push(fullPath);
		}
	}
	return results;
}

module.exports = {
	findMarkdownFiles,
	loadFeatureLifecycle,
	validateFeatureMarkers
};
