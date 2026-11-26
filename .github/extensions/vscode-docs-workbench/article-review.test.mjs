import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import review from '../../../build/workflow/review.js';
import reports from '../../../build/checks/findings.js';
import { createArticleFixture } from './article-fixture.mjs';
import { completeReviewRequest } from './article-review.mjs';
import { atomicJson, now, readJson } from './article-storage.mjs';
import { createWorkbenchServer } from './server.mjs';
import { articleAssets } from './article-canvas.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Tests read and write exclusively owned synthetic OS-temp fixtures. */

const content = '# Fixture article\n\nChoose the thing.\n\n[Missing page](missing.md)\n';
const draft = () => ({
  status: 'complete', summary: 'Reviewed the bounded fixture.', limitations: [],
  findings: [{ line: 3, endLine: 3, quote: 'Choose the thing.', category: 'structure', assessment: 'supported',
    message: 'The instruction does not identify its target.', suggestion: 'Name the control to select.', sources: [] }]
});

async function fixture(t, articleContent = content, articles = {}, editor, reviewOptions = {}) {
  const f = await createArticleFixture({ content: articleContent, articles, workflowOptions: { editor } });
  let dispose = async () => {};
  t.after(async () => { try { await dispose(); } finally { await f.dispose(); } });
  let currentDraft = draft();
  let held = false;
  let receiptError;
  let failedLaunch;
  const reviewRequests = [];
  const originalStart = f.session.rpc.tasks.startAgent;
  f.session.rpc.tasks.startAgent = async input => {
    if (!input.description.startsWith('Docs article review ')) return originalStart(input);
    reviewRequests.push(input);
    const id = input.description.slice('Docs article review '.length);
    const task = { id: `agent-${id}`, type: 'agent', description: input.description, status: 'running', startedAt: now() };
    f.tracked.push(task);
    if (reviewRequests.length === failedLaunch) throw new Error('Host acknowledgement lost');
    if (!held) {
      const requestFile = await f.rawWorkflow.store.file(path.join('review-runs', id, 'request.json'), false);
      await atomicJson(path.join(path.dirname(requestFile), 'draft.json'),
        typeof currentDraft === 'function' ? currentDraft(await readJson(requestFile)) : currentDraft);
      try {
        await completeReviewRequest(requestFile, { workspace: f.workspace, home: f.home, check: f.check });
        task.status = 'completed';
      } catch (error) { receiptError = error; task.status = 'failed'; }
    }
    return { agentId: task.id };
  };
  const workflow = await f.reopen({ reviewOptions: { check: f.check, ...reviewOptions }, replayOptions: {
    builds: async () => ({ builds: [], errors: [] })
  } });
  return { ...f, workflow, reviewRequests,
    beforeDispose(callback) { dispose = callback; },
    setDraft(value) { currentDraft = value; },
    hold() { held = true; },
    failLaunchAt(number) { failedLaunch = number; },
    get receiptError() { return receiptError; },
    async launch(options = {}) {
      return workflow.dispatch('review-launch', { article: 'docs/article.md', channel: 'stable', focus: 'both', confirmed: true, ...options });
    },
    async snapshot() { return workflow.dispatch('refresh', {}); },
    async files(run) {
      const directory = await f.rawWorkflow.store.file(path.join('review-runs', run.id), false);
      return { request: path.join(directory, 'request.json'), draft: path.join(directory, 'draft.json'),
        report: path.join(directory, 'report.json'), receipt: path.join(directory, 'receipt.json') };
    }
  };
}

const stableProduct = {channel: 'stable', version: '1.147.0', revision: 'a'.repeat(40),
  source: 'https://github.com/microsoft/vscode/releases/tag/1.147.0'};
const technicalDraft = request => {
  const value = draft();
  Object.assign(value.findings[0], {category: 'accuracy', sources: [{
    url: `https://github.com/microsoft/vscode/blob/${request.binding.product.revision}/src/fixture.ts#L1`,
    quote: 'Synthetic product evidence.'
  }]});
  return value;
};

test('technical batches share one public product pin and preserve editorial findings, decisions, and local checks', async t => {
  const targets = [];
  let product = stableProduct;
  const f = await fixture(t, content, {'docs/other.md': content}, undefined, {
    resolveProduct: async target => { targets.push(target); return product; }
  });
  await f.workflow.dispatch('launch', {scope: ['docs'], confirmed: true});
  await f.workflow.dispatch('editorial-launch', {scope: ['docs'], channel: 'stable', confirmed: true});
  const before = await f.snapshot();
  const editorial = before.findings.find(record => record.finding.kind === 'review');
  await f.workflow.dispatch('finding-state', {check: 'review', findingId: editorial.finding.id,
    evidenceHash: editorial.evidenceHash, actionToken: editorial.actions.token, status: 'dismissed'});
  const local = await f.rawWorkflow.store.read();
  f.setDraft(technicalDraft);
  const input = {scope: ['docs', 'docs/article.md'], channel: 'stable', version: '1.147.0',
    concerns: 'Check the stated default.', confirmed: true, product: {...stableProduct, revision: 'c'.repeat(40)}};
  const result = await f.workflow.dispatch('technical-launch', input);
  assert.deepEqual(targets, [{channel: 'stable', version: '1.147.0'}]);
  assert.equal(result.runs.length, 2);
  assert.equal(new Set(result.runs.map(run => run.batchId)).size, 1);
  for (const run of result.runs) {
    assert.equal(run.binding.focus, 'technical');
    assert.deepEqual(run.binding.product, stableProduct, 'The client must not own the product pin.');
    const request = await readJson((await f.files(run)).request);
    assert.equal(request.concerns, 'Check the stated default.');
    assert.deepEqual(request.binding.product, stableProduct);
  }
  assert.match(f.reviewRequests.at(-1).prompt, /exact revision, never main/);
  assert.match(f.reviewRequests.at(-1).prompt, /needed instruction check/);
  let state = await f.snapshot();
  assert.equal(state.findings.find(record => record.finding.id === editorial.finding.id).finding.status, 'dismissed');
  assert.equal(state.findings.filter(record => record.provenance?.report.review?.binding.focus === 'technical').length, 2);
  assert.ok(state.coverage.some(entry => entry.procedure?.includes('1.147.0')));
  const unchanged = await f.rawWorkflow.store.read();
  assert.deepEqual(unchanged.coverage, local.coverage);
  assert.deepEqual(unchanged.review, local.review);
  assert.deepEqual(unchanged.runs.map(run => run.id), local.runs.map(run => run.id));
  const reopened = await f.reopen({reviewOptions: {check: f.check, resolveProduct: async () => { throw new Error('Refresh must not repin'); }}});
  assert.equal((await reopened.dispatch('refresh', {})).runs.filter(run => run.binding?.product).length, 2);

  product = {...stableProduct, version: '1.148.0', revision: 'b'.repeat(40),
    source: 'https://github.com/microsoft/vscode/releases/tag/1.148.0'};
  await f.workflow.dispatch('technical-launch', {...input, version: ''});
  state = await f.snapshot();
  const technical = state.findings.filter(record => record.provenance?.report.review?.binding.focus === 'technical');
  assert.equal(technical.length, 4, 'A different public revision must not silently reuse the earlier finding identity.');
  assert.equal(state.coverage.filter(entry => entry.procedure?.startsWith('technical')).length, 4);
});

test('technical batch preflight enforces five articles and rejects unavailable or invalid targets before any agent starts', async t => {
  const extra = Object.fromEntries(Array.from({length: 5}, (_, i) => [`docs/extra${i}.md`, content]));
  let pinCalls = 0;
  let unavailable = true;
  const f = await fixture(t, content, extra, undefined, {resolveProduct: async () => {
    pinCalls++;
    if (unavailable) throw new Error('Public release lookup unavailable');
    return stableProduct;
  }});
  const input = {scope: ['docs'], channel: 'stable', confirmed: true};
  await assert.rejects(f.workflow.dispatch('technical-launch', input), /at most 5/);
  await assert.rejects(f.workflow.dispatch('technical-launch', {...input, confirmed: false}), /Explicit/);
  const small = {...input, scope: ['docs/article.md', 'docs/extra0.md']};
  for (const change of [{channel: 'internal'}, {version: '../main'}, {concerns: false}]) {
    await assert.rejects(f.workflow.dispatch('technical-launch', {...small, ...change}));
  }
  assert.equal(pinCalls, 0);
  await assert.rejects(f.workflow.dispatch('technical-launch', small), /lookup unavailable/);
  unavailable = false;
  await writeFile(path.join(f.workspace, 'docs', 'extra0.md'), 'x'.repeat(500_001));
  await assert.rejects(f.workflow.dispatch('technical-launch', small), /oversized/);
  assert.equal(f.reviewRequests.length, 0);
  assert.equal((await f.snapshot()).runs.length, 0);
  await writeFile(path.join(f.workspace, 'docs', 'extra0.md'), content);
  f.setDraft(technicalDraft);
  assert.equal((await f.workflow.dispatch('technical-launch', {...input, scope: Object.keys(extra)})).runs.length, 5);
  assert.equal(f.reviewRequests.length, 5);
});

test('technical batches preserve explicit unconfirmed and not-started outcomes without automatic retries', async t => {
  const f = await fixture(t, content, {'docs/b.md': content, 'docs/c.md': content}, undefined,
    {resolveProduct: async () => stableProduct});
  f.setDraft(technicalDraft);
  f.failLaunchAt(2);
  const input = {scope: ['docs'], channel: 'stable', confirmed: true};
  const result = await f.workflow.dispatch('technical-launch', input);
  assert.deepEqual(result.runs.map(run => run.launch), ['acknowledged', 'uncertain', 'not-started']);
  assert.equal(f.reviewRequests.length, 2);
  assert.equal((await f.snapshot()).findings.length, 1);
  await assert.rejects(f.workflow.dispatch('technical-launch', input), /running|unconfirmed/);
  assert.equal(f.reviewRequests.length, 2);
});

test('technical reports bind supported citations and finding identity to the selected public release', async t => {
  const f = await fixture(t);
  const precheck = f.check(f.workspace, ['docs/article.md'], {links: true});
  const binding = review.createBinding('docs/article.md', Buffer.from(content), precheck, 'stable', 'technical', undefined, stableProduct);
  const value = technicalDraft({binding});
  const first = review.makeReviewReport(binding, content, value);
  value.findings[0].sources[0].url = `https://github.com/microsoft/vscode/blob/${'b'.repeat(40)}/src/fixture.ts#L1`;
  assert.throws(() => review.makeReviewReport(binding, content, value), /pinned public product revision/);
  value.findings[0].sources = [];
  value.findings[0].assessment = 'question';
  value.findings[0].message = 'Needs an attended instruction check.';
  assert.equal(review.makeReviewReport(binding, content, value).findings[0].severity, 'unverified');
  assert.throws(() => review.createBinding('docs/article.md', Buffer.from(content), precheck,
    'insiders', 'technical', undefined, stableProduct), /match the technical review channel/);
  const nextBinding = {...binding, product: {...stableProduct, revision: 'b'.repeat(40)}};
  const second = review.makeReviewReport(nextBinding, content, technicalDraft({binding: nextBinding}));
  assert.notEqual(first.findings[0].id, second.findings[0].id);
});

test('browser adds technical accuracy to the existing batch form with explicit public release context', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const targets = [];
  const f = await fixture(t, content, {'docs/other.md': content}, undefined,
    {resolveProduct: async target => { targets.push(target); return stableProduct; }});
  f.setDraft(technicalDraft);
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, {assetEntries: articleAssets});
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/findings`);
  await page.locator('#reload:enabled').waitFor();
  await page.getByLabel('Checks', {exact: true}).selectOption('technical');
  assert.equal(f.reviewRequests.length, 0);
  assert.equal(targets.length, 0, 'Selecting an option does not start source research.');
  await page.getByLabel('Public product channel', {exact: true}).selectOption('insiders');
  assert.equal(await page.locator('#technical-release').isVisible(), false);
  await page.getByLabel('Public product channel', {exact: true}).selectOption('stable');
  await page.getByLabel('Stable version (optional)', {exact: true}).fill('1.147.0');
  await page.getByLabel('Technical focus (optional)', {exact: true}).fill('Check defaults.');
  await page.locator('#scope').fill('docs');
  await page.getByRole('button', {name: 'Run technical review', exact: true}).evaluate(button => { button.click(); button.click(); });
  await page.locator('#execution-indicator').getByText('Technical batch: 2/2 reviewed', {exact: true}).waitFor();
  assert.deepEqual(targets, [{channel: 'stable', version: '1.147.0'}]);
  assert.equal(f.reviewRequests.length, 2);
  assert.equal(await page.locator('.finding-type').getByText('Technical', {exact: true}).count(), 2);
  await page.getByRole('searchbox', {name: 'Filter findings'}).fill('technical');
  assert.equal(await page.locator('.finding').count(), 2);
  await page.getByRole('searchbox', {name: 'Filter findings'}).fill('editorial');
  assert.equal(await page.locator('.finding').count(), 0);
  await page.getByRole('searchbox', {name: 'Filter findings'}).fill('');
  const run = (await f.snapshot()).runs.find(run => run.binding?.product);
  const request = await readJson((await f.files(run)).request);
  assert.equal(request.concerns, 'Check defaults.');
  await page.locator('#execution-details > summary').click();
  await page.locator('#execution').getByText(`Public target: 1.147.0 (${'a'.repeat(40)}).`, {exact: true}).first().waitFor();
  await page.reload();
  await page.locator('#execution-indicator').getByText('Technical batch: 2/2 reviewed', {exact: true}).waitFor();
  assert.equal(f.reviewRequests.length, 2);
  await page.getByLabel('Checks', {exact: true}).selectOption('technical');
  await page.setViewportSize({width: 420, height: 800});
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.deepEqual(errors, []);
});

test('browser filters individual technical and editorial findings and clears combined filters without starting work', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
  const mixed = draft();
  mixed.findings.push({...mixed.findings[0], category: 'accuracy', assessment: 'question',
    message: 'This behavior needs product verification.'});
  f.setDraft(mixed);
  await f.launch({focus: 'both'});
  await f.snapshot();
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, {assetEntries: articleAssets});
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/findings`);
  const rows = page.locator('.finding');
  await rows.first().waitFor();
  assert.equal(await rows.count(), 2);
  const types = page.getByLabel('Finding type', {exact: true});
  await types.selectOption({label: 'Technical'});
  assert.equal(await rows.count(), 1);
  assert.equal(await rows.locator('.finding-type').innerText(), 'Technical');
  await page.getByLabel('Check type', {exact: true}).selectOption('review');
  assert.equal(await rows.count(), 1);
  await page.getByRole('button', {name: 'Unverified 1', exact: true}).click();
  await types.selectOption({label: 'Editorial'});
  assert.equal(await rows.count(), 0, 'Type and severity filters must combine.');
  await page.getByRole('button', {name: 'Clear filters', exact: true}).click();
  assert.equal(await types.inputValue(), 'all');
  assert.equal(await page.getByLabel('Check type', {exact: true}).inputValue(), 'all');
  assert.equal(await rows.count(), 2);
  await types.selectOption({label: 'Editorial'});
  assert.equal(await rows.locator('.finding-type').innerText(), 'Editorial');
  await page.getByRole('button', {name: 'Refresh', exact: true}).click();
  await page.waitForFunction(() => !document.querySelector('#reload').disabled);
  assert.equal(await types.inputValue(), 'editorial');
  assert.equal(await rows.count(), 1);
  assert.equal(f.reviewRequests.length, 1, 'Filtering or refreshing must not start another review.');
});

test('one-click review decisions resolve corrected historical findings without rewriting review freshness', async t => {
  const f = await fixture(t);
  const run = await f.launch({ focus: 'editorial' });
  const first = (await f.snapshot()).findings[0];
  const input = record => ({ check: 'review', findingId: record.finding.id, evidenceHash: record.evidenceHash,
    actionToken: record.actions.token });
  await f.workflow.dispatch('finding-state', { ...input(first), status: 'dismissed' });
  let record = (await f.snapshot()).findings[0];
  assert.equal(record.finding.status, 'dismissed');
  assert.match(record.history.at(-1).reason, /User dismissed.*Current article SHA-256/);
  await assert.rejects(f.workflow.dispatch('finding-state', { ...input(first), status: 'open' }), /state changed/);
  await f.workflow.dispatch('finding-state', { ...input(record), status: 'open' });
  const originalReport = await readFile((await f.files(run)).report, 'utf8');
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), content.replace('Choose the thing.', 'Choose the named control.'));
  f.setDraft({ status: 'complete', summary: 'No further observations.', limitations: [], findings: [] });
  await f.launch({ focus: 'editorial' });
  record = (await f.snapshot()).findings[0];
  assert.equal(record.freshness, 'stale');
  assert.equal(record.reviewable, false, 'Legacy verified-triage rules must remain strict.');
  await f.workflow.dispatch('finding-state', { ...input(record), status: 'fixed' });
  record = (await f.snapshot()).findings[0];
  assert.equal(record.finding.status, 'fixed');
  assert.equal(record.freshness, 'stale', 'Manual closure must not make the historical report current.');
  assert.match(record.history.at(-1).reason, /User marked fixed/);
  assert.equal(await readFile((await f.files(run)).report, 'utf8'), originalReport);
  await assert.rejects(f.workflow.dispatch('finding-state', { ...input(record), status: 'accepted' }), /Choose Dismiss/);
  const reopened = await f.reopen({ reviewOptions: { check: f.check } });
  const saved = (await reopened.dispatch('refresh', {})).findings[0];
  assert.equal(saved.finding.status, 'fixed');
  await reopened.dispatch('finding-state', { ...input(saved), status: 'open' });
  assert.equal((await reopened.dispatch('refresh', {})).findings[0].finding.status, 'open');
  const files = await f.files(run);
  const report = await readJson(files.report);
  report.review.summary = 'Tampered original report';
  await atomicJson(files.report, report);
  await assert.rejects(f.workflow.dispatch('finding-state', { ...input(saved), status: 'dismissed' }), /report does not match/);
});

test('fix chat attaches only the selected owned finding and leaves decisions unchanged even when handoff fails', async t => {
  const chats = [];
  let fail = false;
  const f = await fixture(t, content, {}, { available: true, async chat(input) {
    chats.push(input);
    if (fail) throw new Error('Chat timed out');
    return { requested: true, message: 'Fix conversation requested.' };
  } });
  await f.launch({ focus: 'editorial' });
  const record = (await f.snapshot()).findings[0];
  const input = { check: 'review', findingId: record.finding.id, evidenceHash: record.evidenceHash,
    actionToken: record.actions.token, confirmed: true, article: '../outside.md', message: 'Forged client message' };
  f.session.rpc.tasks.list = async () => { throw new Error('No host lookup for a chat launch'); };
  await f.workflow.dispatch('finding-fix-chat', input);
  assert.equal(chats.length, 1);
  assert.equal(chats[0].files[0], path.join(f.workspace, 'docs', 'article.md'));
  assert.ok(chats[0].files[1].endsWith(path.join('skills', 'doc-writer', 'SKILL.md')));
  const context = await readJson(chats[0].files[2]);
  assert.equal(context.finding.id, record.finding.id);
  assert.equal(context.finding.message, record.finding.message);
  assert.equal(context.current.article, chats[0].files[0]);
  assert.match(chats[0].prompt, /wait for approval/);
  assert.match(chats[0].prompt, /Never change the finding's state/);
  assert.doesNotMatch(chats[0].prompt, /Forged client message/);
  for (const change of [{ confirmed: false }, { actionToken: 'changed' }, { findingId: 'missing' }, { check: 'other' }]) {
    await assert.rejects(f.workflow.dispatch('finding-fix-chat', { ...input, ...change }));
  }
  fail = true;
  await assert.rejects(f.workflow.dispatch('finding-fix-chat', input), /Chat timed out/);
  assert.equal(chats.length, 2, 'A failed handoff must not retry automatically.');
  const after = (await f.workflow.raw.snapshot({ verify: false })).findings[0];
  assert.equal(after.finding.status, 'open');
  assert.equal(after.history.length, 0);
  assert.equal(f.tracked.length, 1, 'Chat launch must not create another background review.');
});

test('browser exposes accessible icon actions on collapsed findings and preserves post-edit closure', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const chats = [];
  let fail = false;
  const f = await fixture(t, content, {}, { available: true, async chat(input) {
    chats.push(input);
    if (fail) throw new Error('Chat timed out');
    return { requested: true, message: 'Fix conversation requested.' };
  } });
  await f.launch({ focus: 'editorial' });
  await f.snapshot();
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/findings`);
  const row = page.locator('.finding');
  await row.waitFor();
  const actions = row.locator('.finding-actions');
  assert.equal(await row.locator('.finding-toggle').getAttribute('aria-expanded'), 'false');
  assert.equal(await row.locator('.finding-type').innerText(), 'Editorial');
  assert.equal(await row.locator('.finding-type').isVisible(), true);
  assert.equal(await row.locator('.finding-toggle').getAttribute('aria-description'), 'Finding type: Editorial review: structure');
  assert.equal(await actions.isVisible(), true);
  assert.equal(await page.getByRole('img', { name: 'Warning', exact: true }).count(), 1);
  for (const button of await actions.getByRole('button').all()) {
    assert.equal(await button.getAttribute('title'), await button.getAttribute('aria-label'));
    assert.equal(await button.locator('svg').count(), 1);
  }
  assert.equal(await page.locator('.finding-detail form, .finding-detail textarea').count(), 0);
  await actions.getByRole('button', { name: 'Fix in chat', exact: true }).evaluate(button => { button.click(); button.click(); });
  await page.getByText('Fix conversation requested.', { exact: true }).waitFor();
  assert.equal(chats.length, 1);
  assert.equal(await row.locator('.review-state').innerText(), 'open');
  await actions.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await row.locator('.review-state').getByText('dismissed', { exact: true }).waitFor();
  assert.equal(await row.locator('.finding-toggle').getAttribute('aria-expanded'), 'false');
  await actions.getByRole('button', { name: 'Undo', exact: true }).click();
  await row.locator('.review-state').getByText('open', { exact: true }).waitFor();
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), content.replace('Choose the thing.', 'Choose the named control.'));
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await row.locator('.freshness').getByText('Stale', { exact: true }).waitFor();
  await actions.getByRole('button', { name: 'Mark fixed', exact: true }).click();
  await row.locator('.review-state').getByText('fixed', { exact: true }).waitFor();
  assert.equal(await row.locator('.freshness').innerText(), 'Stale');
  await page.reload();
  await row.locator('.review-state').getByText('fixed', { exact: true }).waitFor();
  await actions.getByRole('button', { name: 'Undo', exact: true }).click();
  await row.locator('.review-state').getByText('open', { exact: true }).waitFor();
  fail = true;
  await actions.getByRole('button', { name: 'Fix in chat', exact: true }).click();
  await page.getByText(/Chat timed out.*Check VS Code Chat before trying again/).waitFor();
  assert.equal(chats.length, 2);
  assert.equal(await row.locator('.review-state').innerText(), 'open');
  await page.setViewportSize({ width: 420, height: 800 });
  assert.ok(await row.locator('.finding-mobile-status').isVisible());
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  for (const button of await actions.getByRole('button').all()) {
    const bounds = await button.boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 420);
  }
  assert.deepEqual(errors, []);
});

test('editorial batches deduplicate scope and preserve per-article decisions, freshness, and structural findings', async t => {
  const f = await fixture(t, content, { 'docs/other.md': content });
  await f.workflow.dispatch('launch', { scope: ['docs'], confirmed: true });
  await f.snapshot();
  const structural = await f.rawWorkflow.store.read();
  await f.launch({ focus: 'editorial' });
  const first = (await f.snapshot()).findings.find(record => record.finding.kind === 'review');
  await f.workflow.dispatch('triage', { check: 'review', findingId: first.finding.id, evidenceHash: first.evidenceHash,
    coverageToken: first.coverageToken, status: 'dismissed', reason: 'Existing editorial decision.' });
  const result = await f.workflow.dispatch('editorial-launch', {
    scope: ['docs', 'docs/article.md'], channel: 'stable', concerns: 'Preserve the examples.', confirmed: true
  });
  assert.equal(result.runs.length, 2);
  assert.equal(new Set(result.runs.map(run => run.batchId)).size, 1);
  for (const run of result.runs) {
    assert.equal(run.binding.focus, 'editorial');
    const request = await readJson((await f.files(run)).request);
    assert.equal(request.concerns, 'Preserve the examples.');
    assert.equal(request.batchId, run.batchId);
  }
  const complete = await f.snapshot();
  const findings = complete.findings.filter(record => record.finding.kind === 'review');
  assert.equal(findings.length, 2);
  assert.equal(findings.find(record => record.finding.article === 'docs/article.md').finding.status, 'dismissed');
  const after = await f.rawWorkflow.store.read();
  assert.deepEqual(after.coverage, structural.coverage);
  assert.deepEqual(after.review, structural.review);
  assert.deepEqual(after.runs.map(run => run.id), structural.runs.map(run => run.id));
  const reopened = await f.reopen({ reviewOptions: { check: f.check } });
  assert.equal((await reopened.dispatch('refresh', {})).runs.filter(run => run.batchId).length, 2);
  await writeFile(path.join(f.workspace, 'docs', 'other.md'), content + '\nChanged context.\n');
  const changed = (await f.snapshot()).findings.filter(record => record.finding.kind === 'review');
  assert.equal(changed.find(record => record.finding.article === 'docs/article.md').freshness, 'fresh');
  const stale = changed.find(record => record.finding.article === 'docs/other.md');
  assert.equal(stale.freshness, 'stale');
  await assert.rejects(f.workflow.dispatch('triage', { check: 'review', findingId: stale.finding.id,
    evidenceHash: stale.evidenceHash, coverageToken: stale.coverageToken, status: 'fixed', reason: 'Not current.' }), /changed/);
  assert.equal(await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8'), content);
});

test('editorial batch preflight rejects oversized scopes or invalid members before starting any agent and accepts exactly five', async t => {
  const extra = Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`docs/extra${i}.md`, content]));
  const f = await fixture(t, content, extra);
  const input = { scope: ['docs'], channel: 'stable', confirmed: true };
  await assert.rejects(f.workflow.dispatch('editorial-launch', input), /at most 5/);
  await assert.rejects(f.workflow.dispatch('editorial-launch', { ...input, confirmed: false }), /Explicit/);
  await assert.rejects(f.workflow.dispatch('editorial-launch', { ...input, scope: ['../outside.md'] }));
  const scope = ['docs/article.md', 'docs/extra0.md'];
  await writeFile(path.join(f.workspace, 'docs', 'extra0.md'), 'x'.repeat(500_001));
  await assert.rejects(f.workflow.dispatch('editorial-launch', { ...input, scope }), /oversized/);
  await writeFile(path.join(f.workspace, 'docs', 'extra0.md'), content);
  await assert.rejects(f.workflow.dispatch('editorial-launch', { ...input, scope, channel: 'internal' }), /explicit channel/);
  await assert.rejects(f.workflow.dispatch('editorial-launch', { ...input, scope, concerns: false }), /must be text/);
  assert.equal(f.reviewRequests.length, 0);
  assert.equal((await f.snapshot()).runs.length, 0);
  const exact = await f.workflow.dispatch('editorial-launch', { ...input, scope: Object.keys(extra) });
  assert.equal(exact.runs.length, 5);
  assert.equal(f.reviewRequests.length, 5);
});

test('editorial batches retain earlier findings and successful coverage when individual reviews are incomplete or empty', async t => {
  const f = await fixture(t, content, { 'docs/other.md': content });
  const input = { scope: ['docs'], channel: 'stable', confirmed: true };
  await f.workflow.dispatch('editorial-launch', input);
  await f.snapshot();
  f.setDraft(request => request.binding.article === 'docs/other.md'
    ? { status: 'incomplete', summary: 'Review interrupted.', limitations: ['Fixture interruption.'], findings: [] }
    : { status: 'complete', summary: 'No further observations.', limitations: [], findings: [] });
  await f.workflow.dispatch('editorial-launch', input);
  const result = await f.snapshot();
  assert.equal(result.findings.filter(record => record.finding.kind === 'review').length, 2);
  const incomplete = result.coverage.find(entry => entry.check === 'review' && entry.article === 'docs/other.md');
  assert.equal(incomplete.state, 'incomplete');
  assert.equal(incomplete.verification.report.review.status, 'complete');
  assert.deepEqual(incomplete.review.limitations, ['Fixture interruption.']);
  assert.equal(result.coverage.find(entry => entry.check === 'review' && entry.article === 'docs/article.md').state, 'reviewed');
  assert.ok(result.findings.every(record => record.finding.status === 'open'));
});

test('editorial batches preflight every overlap and stop further starts after an unconfirmed launch', async t => {
  const held = await fixture(t, content, { 'docs/other.md': content });
  held.hold();
  await held.launch({ article: 'docs/other.md' });
  const input = { scope: ['docs'], channel: 'stable', confirmed: true };
  await assert.rejects(held.workflow.dispatch('editorial-launch', input), /running/);
  assert.equal(held.reviewRequests.length, 1, 'An eligible earlier article must not launch before later overlap checks.');
  const failed = await fixture(t, content, { 'docs/b.md': content, 'docs/c.md': content });
  failed.failLaunchAt(2);
  const result = await failed.workflow.dispatch('editorial-launch', input);
  assert.deepEqual(result.runs.map(run => run.launch), ['acknowledged', 'uncertain', 'not-started']);
  assert.equal(failed.reviewRequests.length, 2);
  const after = await failed.snapshot();
  assert.equal(after.findings.length, 1);
  await assert.rejects(failed.workflow.dispatch('editorial-launch', input), /running|unconfirmed/);
  assert.equal(failed.reviewRequests.length, 2, 'An uncertain batch must not automatically restart.');
});

test('browser runs one bounded editorial batch and displays per-article results without replacing local checks', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const extra = Object.fromEntries(Array.from({ length: 5 }, (_, i) => [`docs/extra${i}.md`, content]));
  const f = await fixture(t, content, extra);
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/findings`);
  await page.locator('#reload:enabled').waitFor();
  await page.getByLabel('Checks', { exact: true }).selectOption('editorial');
  assert.equal(f.reviewRequests.length, 0, 'Selecting a focus must not start work.');
  await page.locator('#scope').fill('docs');
  await page.getByText('Select at most 5 articles for editorial review.', { exact: true }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Run editorial review', exact: true }).isDisabled(), true);
  await page.getByLabel('Checks', { exact: true }).selectOption('local');
  assert.equal(await page.getByRole('button', { name: 'Run checks', exact: true }).isEnabled(), true);
  await page.getByLabel('Checks', { exact: true }).selectOption('editorial');
  await page.locator('#scope').fill('docs/article.md, docs/extra0.md');
  await page.getByLabel('Editorial focus (optional)', { exact: true }).fill('Preserve the examples.');
  await page.getByRole('button', { name: 'Run editorial review', exact: true }).evaluate(button => { button.click(); button.click(); });
  await page.locator('#execution-indicator').getByText('Editorial batch: 2/2 reviewed', { exact: true }).waitFor();
  assert.equal(f.reviewRequests.length, 2);
  await page.getByLabel('Check type', { exact: true }).selectOption('review');
  assert.equal(await page.locator('.finding').count(), 2);
  await page.locator('#execution-details > summary').click();
  assert.equal(await page.locator('#execution > section').count(), 2);
  await page.reload();
  await page.locator('#execution-indicator').getByText('Editorial batch: 2/2 reviewed', { exact: true }).waitFor();
  assert.equal(f.reviewRequests.length, 2);
  await page.getByLabel('Checks', { exact: true }).selectOption('editorial');
  await page.setViewportSize({ width: 420, height: 800 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.equal(await page.locator('#task-type, #review-form, #replay-form').count(), 0);
  assert.deepEqual(errors, []);
});

test('review reports bind exact article lines and distinguish supported judgments from unanswered product questions', async t => {
  const f = await fixture(t);
  const precheck = f.check(f.workspace, ['docs/article.md'], { links: true });
  const binding = review.createBinding('docs/article.md', Buffer.from(content), precheck, 'stable', 'both');
  const report = review.makeReviewReport(binding, content, draft());
  assert.equal(report.schemaVersion, 6);
  assert.equal(report.findings[0].severity, 'warning');
  assert.match(reports.formatReport(report, 'console'), /agent judgment/);
  review.assertReviewCurrent(report, f.workspace, f.check);
  const wrongQuote = draft();
  wrongQuote.findings[0].quote = 'Invented article text';
  assert.throws(() => review.makeReviewReport(binding, content, wrongQuote), /exact article lines/);
  const technical = draft();
  technical.findings[0].category = 'accuracy';
  assert.throws(() => review.makeReviewReport(binding, content, technical), /require cited product evidence/);
  technical.findings[0].assessment = 'question';
  assert.equal(review.makeReviewReport(binding, content, technical).findings[0].severity, 'unverified');
  technical.findings[0].sources = [{ url: 'https://github.com/microsoft/vscode/blob/main/file.ts#L1', quote: 'Unpinned source' }];
  assert.throws(() => review.makeReviewReport(binding, content, technical), /pinned/);
  technical.findings[0].sources[0].url = `https://github.com/microsoft/vscode/blob/${'a'.repeat(40)}/src/file.ts#L1-L2`;
  technical.findings[0].assessment = 'supported';
  assert.equal(review.makeReviewReport(binding, content, technical).findings[0].severity, 'warning');
  technical.findings[0].sources[0].url = `https://github.com/microsoft/vscode/blob/${'a'.repeat(40)}/../file.ts#L1`;
  assert.throws(() => review.makeReviewReport(binding, content, technical), /pinned/);
  const incomplete = { status: 'incomplete', summary: 'Could not finish.', limitations: [], findings: [] };
  assert.throws(() => review.makeReviewReport(binding, content, incomplete), /limitations/);
});

test('section ranges preserve source lines, include nested headings, and ignore frontmatter and fenced examples', () => {
  const body = '\uFEFF' + ['---', 'title: Ignored', '---', '# Article', '', '## Setup', 'Intro',
    '```md', '## Not a section', '```', '### Nested', 'Nested text', '', '## Usage', 'Usage text', '',
    'Final section', '---', 'Final text'].join('\r\n');
  assert.deepEqual(review.articleSections(body), [
    { title: 'Article', startLine: 4, endLine: 19 },
    { title: 'Setup', startLine: 6, endLine: 13 },
    { title: 'Nested', startLine: 11, endLine: 13 },
    { title: 'Usage', startLine: 14, endLine: 16 },
    { title: 'Final section', startLine: 17, endLine: 19 }
  ]);
  assert.deepEqual(review.articleSections('A paragraph without headings.'), []);
});

test('section review enforces selected lines, preserves whole-article coverage, and rejects outdated selections', async t => {
  const body = '# Fixture\n\n## Selected\nChoose the thing.\n\n## Other\nOther text.\n';
  const f = await fixture(t, body);
  const selectedDraft = draft();
  selectedDraft.findings[0].line = 4;
  selectedDraft.findings[0].endLine = 4;
  f.setDraft(selectedDraft);
  await f.launch();
  await f.snapshot();
  const catalog = await f.workflow.dispatch('review-sections', { article: 'docs/article.md' });
  const run = await f.launch({ section: { startLine: 3, articleHash: catalog.articleHash } });
  assert.deepEqual(run.binding.section, { title: 'Selected', startLine: 3, endLine: 5 });
  const result = await f.snapshot();
  assert.equal(result.coverage.filter(entry => entry.check === 'review').length, 2);
  assert.equal(result.findings.length, 2);
  const outside = draft();
  Object.assign(outside.findings[0], { line: 7, endLine: 7, quote: 'Other text.' });
  assert.throws(() => review.makeReviewReport(run.binding, body, outside), /outside the selected/);
  const before = f.tracked.length;
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), body + '\nChanged outside the section.\n');
  await assert.rejects(f.launch({ section: { startLine: 3, articleHash: catalog.articleHash } }), /Load sections again/);
  assert.equal(f.tracked.length, before);
});

test('reviews require explicit launch, preserve claims and unchanged dismissals, and reopen changed evidence', async t => {
  const f = await fixture(t);
  await f.launch();
  const first = await f.snapshot();
  const finding = first.findings.find(record => record.finding.kind === 'review');
  assert.equal(first.coverage.find(entry => entry.check === 'review').state, 'reviewed');
  assert.equal(first.coverage.find(entry => entry.check === 'review').precheck.length, 1);
  await f.workflow.dispatch('triage', { check: 'review', findingId: finding.finding.id,
    evidenceHash: finding.evidenceHash, coverageToken: finding.coverageToken, status: 'dismissed', reason: 'Synthetic decision.' });
  await f.launch();
  assert.equal((await f.snapshot()).findings[0].finding.status, 'dismissed');
  assert.deepEqual((await f.rawWorkflow.store.read()).review.findings, []);
  await assert.rejects(f.workflow.dispatch('review-launch', { article: 'docs/article.md', channel: 'stable', focus: 'both' }), /Explicit/);
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), content.replace('Fixture article', 'Changed article'));
  assert.equal((await f.snapshot()).findings[0].freshness, 'stale');
  await assert.rejects(f.workflow.dispatch('triage', { check: 'review', findingId: finding.finding.id,
    evidenceHash: finding.evidenceHash, coverageToken: finding.coverageToken, status: 'fixed', reason: 'Must not save.' }), /changed/);
  await f.launch();
  const changed = (await f.snapshot()).findings[0];
  assert.equal(changed.finding.status, 'open');
  assert.equal(changed.history.at(-1).action, 'evidence-changed');
});

test('incomplete and empty reviews retain earlier findings and successful scoped coverage', async t => {
  const f = await fixture(t);
  await f.launch();
  await f.snapshot();
  f.setDraft({ status: 'incomplete', summary: 'Product evidence unavailable.', limitations: ['Fixture blocked source lookup.'], findings: [] });
  await f.launch();
  const incomplete = await f.snapshot();
  const coverage = incomplete.coverage.find(entry => entry.check === 'review');
  assert.equal(coverage.state, 'incomplete');
  assert.equal(coverage.verification.report.review.status, 'complete');
  assert.equal(incomplete.findings[0].finding.status, 'open');
  f.setDraft({ status: 'complete', summary: 'No further observations in this scope.', limitations: [], findings: [] });
  await f.launch();
  const empty = await f.snapshot();
  assert.equal(empty.coverage.find(entry => entry.check === 'review').state, 'reviewed');
  assert.equal(empty.findings[0].finding.status, 'open');
  assert.notEqual(empty.findings[0].freshness, 'not-observed');
});

test('unconfirmed, tampered and stale review completions are not accepted', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  const beforeSync = await f.workflow.raw.snapshot({ verify: false });
  assert.equal(beforeSync.findings.length, 0);
  assert.equal(beforeSync.coverage.find(entry => entry.check === 'review').state, 'incomplete');
  await f.snapshot();
  const files = await f.files(run);
  const report = await readJson(files.report);
  report.review.summary = 'Changed after completion';
  await atomicJson(files.report, report);
  assert.equal((await f.snapshot()).findings[0].reviewable, false);
  await assert.rejects(completeReviewRequest(files.request, { workspace: f.workspace, home: f.home, check: f.check }), /already has a receipt/);

  const stale = await fixture(t);
  stale.hold();
  const pending = await stale.launch();
  const pendingFiles = await stale.files(pending);
  await atomicJson(pendingFiles.draft, draft());
  await writeFile(path.join(stale.workspace, 'docs', 'article.md'), content + '\nChanged before completion.\n');
  await assert.rejects(completeReviewRequest(pendingFiles.request, { workspace: stale.workspace, home: stale.home, check: stale.check }), /Stale review/);
  assert.equal((await readJson(pendingFiles.receipt)).outcome, 'execution-failed');
});

test('structured reviews can run again with missing historical tasks and in a new session', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  await f.launch();
  const first = await f.snapshot();
  const finding = first.findings[0];
  await f.workflow.dispatch('triage', { check: 'review', findingId: finding.finding.id,
    evidenceHash: finding.evidenceHash, coverageToken: finding.coverageToken, status: 'dismissed', reason: 'Keep this decision.' });
  f.tracked.length = 0;
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), content + '\nAdditional context.\n');
  const historical = (await f.snapshot()).runs.find(item => item.id === run.id);
  assert.equal(historical.result.state, 'stale');
  assert.equal(historical.hostMissing, true);
  assert.equal(historical.rerun.allowed, true);
  await f.launch();
  assert.equal((await f.snapshot()).coverage.find(item => item.check === 'review').state, 'reviewed');
  f.tracked.length = 0;
  const other = await f.reopen({ session: { ...f.session, sessionId: 'new-owner' }, reviewOptions: { check: f.check } });
  const next = await other.dispatch('review-launch', { article: 'docs/article.md', channel: 'stable', focus: 'both', confirmed: true });
  assert.equal(next.ownerSessionId, 'new-owner');
  const after = await other.dispatch('refresh', {});
  assert.equal(after.coverage.find(item => item.check === 'review').state, 'reviewed');
  assert.equal(after.findings.length, first.findings.length);
  assert.equal((await readJson((await f.files(run)).receipt)).outcome, 'report');
});

test('structured review reruns still reject running tasks, lost unconfirmed work, and tampered completions', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  await f.snapshot();
  f.tracked[0].status = 'running';
  await assert.rejects(f.launch(), /running/);
  f.tracked.length = 0;
  await atomicJson((await f.files(run)).receipt, {});
  await assert.rejects(f.launch(), /no verified completion and stopped-host record/);

  const unconfirmed = await fixture(t);
  await unconfirmed.launch();
  unconfirmed.tracked.length = 0;
  await assert.rejects(unconfirmed.launch(), /no verified completion and stopped-host record/);
  assert.equal((await unconfirmed.snapshot()).findings.length, 0);
});

test('Findings offers batch checks only and retains historical article-review results', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
  await f.launch();
  await f.snapshot();
  f.tracked.length = 0;
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), content + '\nNew context.\n');
  await f.snapshot();
  const statePath = await f.rawWorkflow.store.file('reviews.json');
  const saved = await readJson(statePath);
  saved.runs[0].syncError = 'Task not found in the owning session. This does not prove that it never ran.';
  delete saved.runs[0].hostMissing;
  await atomicJson(statePath, saved);
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/findings`);
  await page.locator('#reload:enabled').waitFor();
  await page.locator('.finding').first().waitFor();
  assert.equal(await page.locator('#task-type, #review-form, #replay-form, #review-launch, #replay-start').count(), 0);
  assert.equal(await page.locator('#launch-form').isVisible(), true);
  await page.getByLabel('Check type', { exact: true }).selectOption('review');
  assert.equal(await page.locator('.finding:visible').count(), 1);
  assert.equal(f.tracked.length, 0, 'Opening or filtering saved findings must not start a review.');
  assert.equal(await page.getByRole('link', { name: 'Review article', exact: true }).count(), 1);
  assert.equal(await page.getByRole('link', { name: 'Check instructions', exact: true }).count(), 1);
  await page.locator('#scope').fill('docs');
  await page.getByRole('button', { name: 'Run checks', exact: true }).click();
  await page.locator('#execution-indicator').getByText('Findings updated · 1 article(s)', { exact: true }).waitFor();
  assert.equal(f.tracked.length, 1);
  assert.equal(await page.locator('.finding:visible').count(), 1, 'The new batch must not remove saved review findings.');
  assert.deepEqual(errors, []);
});

test('browser preserves saved article-review decisions and coverage without exposing review launch controls', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
  await f.launch();
  await f.snapshot();
  await f.workflow.dispatch('launch', { scope: ['docs/article.md'], confirmed: true });
  await f.snapshot();
  const before = await f.rawWorkflow.store.read();
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(server.url);
  await page.locator('.finding').first().waitFor();
  await page.getByLabel('Check type', { exact: true }).selectOption('review');
  assert.equal(await page.locator('.finding').count(), 1);
  await page.locator('.finding .finding-toggle').click();
  await page.getByText('Suggested correction: Name the control to select.', { exact: true }).waitFor();
  await page.locator('.finding:has(.finding-toggle[aria-expanded=true])').getByRole('button', { name: 'Dismiss', exact: true }).click();
  await page.getByText('Decision saved locally. Documentation and GitHub are unchanged.', { exact: true }).waitFor();
  await page.reload();
  await page.locator('.finding').first().waitFor();
  await page.getByLabel('Check type', { exact: true }).selectOption('review');
  assert.equal(await page.locator('.finding .review-state').innerText(), 'dismissed');
  await page.locator('#coverage-summary').click();
  await page.getByText('Deterministic precheck · 1 findings', { exact: true }).waitFor();
  assert.equal(await page.locator('#review-form, #task-type').count(), 0);
  const tasksBeforeSelection = f.tracked.length;
  const catalog = await f.workflow.dispatch('review-sections', { article: 'docs/article.md' });
  assert.equal(f.tracked.length, tasksBeforeSelection);
  await f.launch({ section: { startLine: catalog.sections[0].startLine, articleHash: catalog.articleHash } });
  await f.snapshot();
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await page.locator('#finding-count').getByText('2 of 3', { exact: true }).waitFor();
  assert.equal(await page.locator('#coverage-list .coverage-row').count(), 2);
  assert.equal((await f.snapshot()).runs.at(-1).binding.section.title, 'Fixture article');
  assert.deepEqual((await f.rawWorkflow.store.read()).coverage, before.coverage);
  assert.deepEqual((await f.rawWorkflow.store.read()).review, before.review);
  assert.deepEqual(errors, []);
  assert.equal(await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8'), content);
});
