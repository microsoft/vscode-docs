import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import review from '../../../build/review.js';
import reports from '../../../build/findings.js';
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

async function fixture(t, articleContent = content) {
  const f = await createArticleFixture({ content: articleContent });
  let dispose = async () => {};
  t.after(async () => { try { await dispose(); } finally { await f.dispose(); } });
  let currentDraft = draft();
  let held = false;
  let receiptError;
  const originalStart = f.session.rpc.tasks.startAgent;
  f.session.rpc.tasks.startAgent = async input => {
    if (!input.description.startsWith('Docs article review ')) return originalStart(input);
    const id = input.description.slice('Docs article review '.length);
    const task = { id: `agent-${id}`, type: 'agent', description: input.description, status: 'running', startedAt: now() };
    f.tracked.push(task);
    if (!held) {
      const requestFile = await f.rawWorkflow.store.file(path.join('review-runs', id, 'request.json'), false);
      await atomicJson(path.join(path.dirname(requestFile), 'draft.json'), currentDraft);
      try {
        await completeReviewRequest(requestFile, { workspace: f.workspace, home: f.home, check: f.check });
        task.status = 'completed';
      } catch (error) { receiptError = error; task.status = 'failed'; }
    }
    return { agentId: task.id };
  };
  const workflow = await f.reopen({ reviewOptions: { check: f.check } });
  return { ...f, workflow,
    beforeDispose(callback) { dispose = callback; },
    setDraft(value) { currentDraft = value; },
    hold() { held = true; },
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

test('browser launches a source-bound article review and preserves decisions and existing checks after reload', {
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
  await page.locator('#task-type:enabled').waitFor();
  await page.getByLabel('Task', { exact: true }).selectOption('review');
  await page.getByLabel('Article to review', { exact: true }).fill('docs/article.md');
  await page.getByRole('button', { name: 'Start article review', exact: true }).click();
  await page.locator('#execution-indicator').getByText('Article review complete · 1 article(s)', { exact: true }).waitFor();
  await page.getByLabel('Check type', { exact: true }).selectOption('review');
  assert.equal(await page.locator('.finding').count(), 1);
  await page.locator('.finding .finding-toggle').click();
  await page.getByText('Suggested correction: Name the control to select.', { exact: true }).waitFor();
  await page.getByLabel('Decision', { exact: true }).selectOption('dismissed');
  await page.getByLabel('Reason', { exact: true }).fill('Reviewed the synthetic observation.');
  await page.getByRole('button', { name: 'Save decision', exact: true }).click();
  await page.getByText('Decision saved locally. Documentation and GitHub are unchanged.', { exact: true }).waitFor();
  await page.reload();
  await page.locator('#task-type:enabled').waitFor();
  await page.getByLabel('Check type', { exact: true }).selectOption('review');
  assert.equal(await page.locator('.finding .review-state').innerText(), 'dismissed');
  await page.locator('#coverage-summary').click();
  await page.getByText('Deterministic precheck · 1 findings', { exact: true }).waitFor();
  await page.getByLabel('Task', { exact: true }).selectOption('review');
  await page.getByLabel('Article to review', { exact: true }).fill('docs/article.md');
  await page.getByLabel('Review scope', { exact: true }).selectOption('section');
  assert.equal(await page.getByRole('button', { name: 'Start article review', exact: true }).isDisabled(), true);
  const tasksBeforeSelection = f.tracked.length;
  await page.getByRole('button', { name: 'Load sections', exact: true }).click();
  await page.locator('#review-section:enabled').waitFor();
  assert.equal(f.tracked.length, tasksBeforeSelection);
  await page.getByRole('button', { name: 'Start article review', exact: true }).click();
  await page.locator('#finding-count').getByText('2 of 3', { exact: true }).waitFor();
  assert.equal(await page.locator('#coverage-list .coverage-row').count(), 2);
  assert.equal((await f.snapshot()).runs.at(-1).binding.section.title, 'Fixture article');
  assert.deepEqual((await f.rawWorkflow.store.read()).coverage, before.coverage);
  assert.deepEqual((await f.rawWorkflow.store.read()).review, before.review);
  assert.deepEqual(errors, []);
  assert.equal(await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8'), content);
});
