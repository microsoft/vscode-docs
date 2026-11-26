'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const {resolveReviewProduct, reviewProductTarget, validateReviewProduct} = require('./review-product');

const revision = 'a'.repeat(40);
const source = 'https://github.com/microsoft/vscode/releases/tag/1.147.0';
const stable = {channel: 'stable', version: '1.147.0', revision, source};

test('public Stable targets resolve one requested release and annotated tag without using a branch head', async () => {
  for (const version of ['', '1.147.0']) {
    const calls = [];
    const product = await resolveReviewProduct({channel: 'stable', version}, {api: async endpoint => {
      calls.push(endpoint);
      if (endpoint.includes('/releases/')) return {tag_name: '1.147.0', draft: false, prerelease: false, html_url: source};
      if (endpoint.includes('/git/ref/')) return {object: {type: 'tag', sha: 'b'.repeat(40)}};
      if (endpoint.includes('/git/tags/')) return {object: {type: 'commit', sha: revision}};
      return {sha: revision};
    }});
    assert.deepEqual(product, stable);
    assert.equal(calls[0], `repos/microsoft/vscode/releases/${version ? 'tags/1.147.0' : 'latest'}`);
    assert.equal(calls.at(-1), `repos/microsoft/vscode/commits/${revision}`);
    assert.ok(calls.every(endpoint => !endpoint.includes('/heads/') && !endpoint.includes('/main')));
  }
});

test('Insiders targets use the published build metadata and verify its immutable source commit', async () => {
  const calls = [];
  const product = await resolveReviewProduct({channel: 'insiders'}, {
    fetch: async (url, options) => {
      assert.equal(url, 'https://update.code.visualstudio.com/api/update/win32-x64/insider/latest');
      assert.equal(options.redirect, 'error');
      return {ok: true, text: async () => JSON.stringify({productVersion: '1.148.0-insider', version: revision})};
    },
    api: async endpoint => { calls.push(endpoint); return {sha: revision}; }
  });
  assert.equal(product.version, '1.148.0-insider');
  assert.equal(product.revision, revision);
  assert.deepEqual(calls, [`repos/microsoft/vscode/commits/${revision}`]);
});

test('invalid or unavailable release targets fail explicitly rather than falling back to main or an installed build', async () => {
  for (const input of [{channel: 'internal'}, {channel: 'stable', version: '../main'},
    {channel: 'stable', version: false}, {channel: 'insiders', version: '1.147.0'}]) {
    assert.throws(() => reviewProductTarget(input), /public product channel/);
  }
  await assert.rejects(resolveReviewProduct({channel: 'stable'}, {api: async () => {
    throw new Error('GitHub unavailable');
  }}), /GitHub unavailable/);
  await assert.rejects(resolveReviewProduct({channel: 'stable'}, {
    api: async () => ({tag_name: '1.147.0', draft: true, prerelease: false, html_url: source})
  }), /public Stable release/);
  await assert.rejects(resolveReviewProduct({channel: 'insiders'}, {
    api: async () => ({sha: revision}), fetch: async () => ({ok: false, status: 503})
  }), /HTTP 503/);
  await assert.rejects(resolveReviewProduct({channel: 'insiders'}, {
    api: async () => ({sha: 'b'.repeat(40)}),
    fetch: async () => ({ok: true, text: async () => JSON.stringify({productVersion: '1.148.0-insider', version: revision})})
  }), /unavailable in microsoft\/vscode/);
  for (const change of [{revision: 'main'}, {source: 'https://example.test/release'}, {extra: true}]) {
    assert.throws(() => validateReviewProduct({...stable, ...change}), /Invalid public product target/);
  }
});
