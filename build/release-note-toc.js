//@ts-check
'use strict';

/**
 * @typedef {'anchor' | 'label' | 'missing-heading' | 'missing-toc' | 'order' | 'toc-format' | 'unexpected-entry'} ReleaseNoteTocIssueCode
 */

/**
 * @typedef {Object} ReleaseNoteTocIssue
 * @property {ReleaseNoteTocIssueCode} code
 * @property {number} line
 * @property {number} startCharacter
 * @property {number} endCharacter
 * @property {string} message
 */

/**
 * @typedef {Object} ReleaseNoteSection
 * @property {string} label
 * @property {number} line
 * @property {number} startCharacter
 * @property {number} endCharacter
 */

/**
 * @typedef {ReleaseNoteSection & { href: string }} ReleaseNoteTocEntry
 */

const TOC_ENTRY_PATTERN = /<li>\s*<a\s+href="([^"]+)">([^<]+)<\/a>\s*<\/li>/;
const H2_PATTERN = /^##\s+(.+?)\s*$/;

/**
 * Convert a heading to the anchor format used by the release notes renderer.
 * @param {string} heading
 */
function headingToAnchor(heading) {
	return heading
		.toLowerCase()
		.replace(/&(?:amp|#38);|&/g, ' and ')
		.replace(/[`*_~]/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

/**
 * Validate that a release note's inline ToC is an exact, ordered representation
 * of its H2 headings.
 * @param {string} content
 * @returns {ReleaseNoteTocIssue[]}
 */
function validateReleaseNoteToc(content) {
	const lines = content.split(/\r?\n/);
	const tocStart = lines.findIndex(line => line.trim() === '<!-- TOC');
	const tocEnd = tocStart === -1
		? -1
		: lines.findIndex((line, index) => index > tocStart && line.includes('Navigation End -->'));

	if (tocStart === -1 || tocEnd === -1) {
		return [{
			code: 'missing-toc',
			line: tocStart === -1 ? 0 : tocStart,
			startCharacter: 0,
			endCharacter: tocStart === -1 ? 1 : lines[tocStart].length,
			message: 'Release notes must contain an inline ToC block ending with "Navigation End -->".'
		}];
	}

	/** @type {ReleaseNoteTocIssue[]} */
	const issues = [];
	/** @type {ReleaseNoteTocEntry[]} */
	const tocEntries = [];

	for (let lineNumber = tocStart + 1; lineNumber < tocEnd; lineNumber++) {
		const line = lines[lineNumber];
		if (!line.includes('<li')) {
			continue;
		}

		const match = TOC_ENTRY_PATTERN.exec(line);
		if (!match) {
			issues.push({
				code: 'toc-format',
				line: lineNumber,
				startCharacter: Math.max(0, line.indexOf('<li')),
				endCharacter: line.length,
				message: 'ToC entries must use <li><a href="#anchor">Heading</a></li>.'
			});
			continue;
		}

		const labelStart = line.indexOf(match[2], match.index);
		tocEntries.push({
			href: match[1],
			label: match[2],
			line: lineNumber,
			startCharacter: labelStart,
			endCharacter: labelStart + match[2].length
		});
	}

	/** @type {ReleaseNoteSection[]} */
	const headings = [];
	for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
		if (lineNumber >= tocStart && lineNumber <= tocEnd) {
			continue;
		}

		const match = H2_PATTERN.exec(lines[lineNumber]);
		if (match) {
			const labelStart = lines[lineNumber].indexOf(match[1]);
			headings.push({
				label: match[1],
				line: lineNumber,
				startCharacter: labelStart,
				endCharacter: labelStart + match[1].length
			});
		}
	}

	const matchedHeadingIndexes = new Set();
	/** @type {{ entry: ReleaseNoteTocEntry, headingIndex: number }[]} */
	const exactMatches = [];
	for (let tocIndex = 0; tocIndex < tocEntries.length; tocIndex++) {
		const entry = tocEntries[tocIndex];
		let headingIndex = headings.findIndex((heading, index) =>
			!matchedHeadingIndexes.has(index) && heading.label === entry.label);
		const isExactMatch = headingIndex !== -1;

		if (headingIndex === -1) {
			const positionalHeading = headings[tocIndex];
			const positionalHeadingHasEntry = positionalHeading
				&& tocEntries.some(candidate => candidate.label === positionalHeading.label);

			if (positionalHeading && !matchedHeadingIndexes.has(tocIndex) && !positionalHeadingHasEntry) {
				headingIndex = tocIndex;
				issues.push({
					code: 'label',
					line: entry.line,
					startCharacter: entry.startCharacter,
					endCharacter: entry.endCharacter,
					message: `ToC label "${entry.label}" must match H2 heading "${positionalHeading.label}".`
				});
			} else {
				issues.push({
					code: 'unexpected-entry',
					line: entry.line,
					startCharacter: entry.startCharacter,
					endCharacter: entry.endCharacter,
					message: `ToC entry "${entry.label}" does not have a matching H2 heading.`
				});
			}
		}

		if (headingIndex !== -1) {
			matchedHeadingIndexes.add(headingIndex);
			if (isExactMatch) {
				exactMatches.push({ entry, headingIndex });
			}
			const expectedHref = `#${headingToAnchor(headings[headingIndex].label)}`;
			if (entry.href !== expectedHref) {
				const hrefStart = lines[entry.line].indexOf(entry.href);
				issues.push({
					code: 'anchor',
					line: entry.line,
					startCharacter: hrefStart,
					endCharacter: hrefStart + entry.href.length,
					message: `ToC anchor "${entry.href}" must be "${expectedHref}" for H2 heading "${headings[headingIndex].label}".`
				});
			}
		}
	}

	const orderedMatches = exactMatches.slice().sort((left, right) => left.headingIndex - right.headingIndex);
	for (let index = 0; index < exactMatches.length; index++) {
		if (exactMatches[index].entry !== orderedMatches[index].entry) {
			const entry = exactMatches[index].entry;
			issues.push({
				code: 'order',
				line: entry.line,
				startCharacter: entry.startCharacter,
				endCharacter: entry.endCharacter,
				message: `ToC entry "${entry.label}" is out of order; it must match the H2 heading order.`
			});
		}
	}

	for (let headingIndex = 0; headingIndex < headings.length; headingIndex++) {
		if (!matchedHeadingIndexes.has(headingIndex)) {
			const heading = headings[headingIndex];
			issues.push({
				code: 'missing-heading',
				line: heading.line,
				startCharacter: heading.startCharacter,
				endCharacter: heading.endCharacter,
				message: `H2 heading "${heading.label}" is missing from the ToC.`
			});
		}
	}

	return issues;
}

module.exports = {
	headingToAnchor,
	validateReleaseNoteToc
};
