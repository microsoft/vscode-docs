//@ts-check
'use strict';

const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const { headingToAnchor, validateReleaseNoteToc } = require('./release-note-toc');

function releaseNote(tocEntries, headings) {
	return [
		'---',
		'ProductEdition: Stable',
		'---',
		'<!-- TOC',
		'<div class="toc-nav-layout">',
		'  <nav id="toc-nav">',
		'    <ul>',
		...tocEntries.map(entry => `      <li><a href="${entry.href}">${entry.label}</a></li>`),
		'    </ul>',
		'  </nav>',
		'  <div class="notes-main">',
		'Navigation End -->',
		'',
		...headings.flatMap(heading => [`## ${heading}`, '', 'Content.', ''])
	].join('\n');
}

describe('release note ToC validation', () => {
	it('accepts an exact, ordered ToC', () => {
		const content = releaseNote([
			{ href: '#agents', label: 'Agents' },
			{ href: '#rubber-duck-experimental', label: 'Rubber Duck (Experimental)' }
		], ['Agents', 'Rubber Duck (Experimental)']);

		assert.deepEqual(validateReleaseNoteToc(content), []);
	});

	it('reports a ToC entry without an H2 heading', () => {
		const content = releaseNote([
			{ href: '#agents', label: 'Agents' },
			{ href: '#chat', label: 'Chat' }
		], ['Agents']);

		assert.deepEqual(validateReleaseNoteToc(content).map(issue => issue.code), ['unexpected-entry']);
	});

	it('reports an H2 heading missing from the ToC', () => {
		const content = releaseNote([
			{ href: '#agents', label: 'Agents' }
		], ['Agents', 'Chat']);

		assert.deepEqual(validateReleaseNoteToc(content).map(issue => issue.code), ['missing-heading']);
	});

	it('reports entries that do not follow H2 order', () => {
		const content = releaseNote([
			{ href: '#chat', label: 'Chat' },
			{ href: '#agents', label: 'Agents' }
		], ['Agents', 'Chat']);

		assert.deepEqual(validateReleaseNoteToc(content).map(issue => issue.code), ['order', 'order']);
	});

	it('reports a label that differs from its H2 heading', () => {
		const content = releaseNote([
			{ href: '#editor-experience', label: 'Editor Experience' }
		], ['Editor experience']);

		assert.deepEqual(validateReleaseNoteToc(content).map(issue => issue.code), ['label']);
	});

	it('reports an anchor that differs from the generated H2 anchor', () => {
		const content = releaseNote([
			{ href: '#rubber-duck', label: 'Rubber Duck (Experimental)' }
		], ['Rubber Duck (Experimental)']);

		assert.deepEqual(validateReleaseNoteToc(content).map(issue => issue.code), ['anchor']);
	});

	it('reports a missing or incomplete ToC block', () => {
		assert.deepEqual(validateReleaseNoteToc('## Agents').map(issue => issue.code), ['missing-toc']);
		assert.deepEqual(validateReleaseNoteToc('<!-- TOC\n## Agents').map(issue => issue.code), ['missing-toc']);
	});

	it('generates release note anchors from punctuation and whitespace', () => {
		assert.equal(headingToAnchor('Rubber Duck (Experimental)'), 'rubber-duck-experimental');
		assert.equal(headingToAnchor('Agent security & trust'), 'agent-security-and-trust');
	});
});
