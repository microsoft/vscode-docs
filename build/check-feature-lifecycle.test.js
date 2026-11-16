//@ts-check
'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { describe, it } = require('node:test');
const {
	findMarkdownFiles,
	loadFeatureLifecycle,
	validateFeatureMarkers
} = require('./feature-lifecycle');

const ROOT = path.resolve(__dirname, '..');

describe('feature lifecycle validation', () => {
	const validFeatures = new Set(['github-environments', 'cloud-sessions']);

	it('accepts valid feature markers', () => {
		const content = [
			'# Overview',
			'Here is `feature(github-environments)` support.',
			'And another `feature(cloud-sessions)`.'
		].join('\n');

		assert.deepEqual(validateFeatureMarkers(content, validFeatures), []);
	});

	it('reports an undefined feature marker', () => {
		const content = [
			'# Overview',
			'This uses `feature(unknown-feature)` here.'
		].join('\n');

		const issues = validateFeatureMarkers(content, validFeatures);
		assert.equal(issues.length, 1);
		assert.equal(issues[0].code, 'undefined-feature');
		assert.equal(issues[0].feature, 'unknown-feature');
		assert.equal(issues[0].line, 1);
	});

	it('ignores feature markers inside fenced code blocks', () => {
		const content = [
			'# Instructions',
			'```markdown',
			'Example of `feature(non-existent-feature)` marker.',
			'```',
			'Now actual text without markers.'
		].join('\n');

		assert.deepEqual(validateFeatureMarkers(content, validFeatures), []);
	});

	it('loads valid features from feature-lifecycle.json', () => {
		const features = loadFeatureLifecycle();
		assert.ok(features.size > 0);
		assert.ok(features.has('agent-artifacts'));
		assert.ok(features.has('github-environments'));
	});

	it('finds markdown files across docs directory', () => {
		const files = findMarkdownFiles(path.join(ROOT, 'docs'));
		assert.ok(files.length > 50);
		assert.ok(files.every(f => f.endsWith('.md')));
	});
});
