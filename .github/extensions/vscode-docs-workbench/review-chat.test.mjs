import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import editorTools from '../../../build/docs-editor.js';
import { createArticleFixture } from './article-fixture.mjs';
import { createWorkbenchServer } from './server.mjs';
import { articleAssets } from './article-canvas.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Only exclusively owned temporary fixtures are created. */

test('chat handoff preserves the review request and uses no background task or approval state', async t => {
  const calls = [];
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true,
    async chat(input) { calls.push(input); return { requested: true }; } } } });
  t.after(() => f.dispose());
  const input = { article: 'docs/article.md', presets: ['editorial', 'media'], channel: 'stable',
    request: 'Keep examples; include related articles when necessary.', confirmed: true };
  f.session.rpc.tasks.list = async () => { throw new Error('Old host task is unavailable'); };
  await f.workflow.dispatch('review-chat', input);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].files[0], path.join(f.workspace, 'docs', 'article.md'));
  assert.ok(calls[0].files[1].endsWith(path.join('skills', 'doc-writer', 'SKILL.md')));
  assert.match(calls[0].prompt, /Keep examples; include related articles/);
  assert.match(calls[0].prompt, /Assess existing images and video playback/);
  assert.match(calls[0].prompt, /Stop for approval/);
  assert.equal(f.tracked.length, 0);
  assert.equal((await f.rawWorkflow.store.read()).runs.length, 0);
  await assert.rejects(f.workflow.dispatch('review-chat', { ...input, confirmed: false }), /explicitly/);
  await assert.rejects(f.workflow.dispatch('review-chat', { ...input, article: '../outside.md' }), /repository-relative/);
  await assert.rejects(f.workflow.dispatch('review-chat', { ...input, presets: ['invented'] }), /presets/);
  const unsupported = await f.reopen({ editor: { available: false, message: 'No native chat' } });
  await assert.rejects(unsupported.dispatch('review-chat', input), /No native chat/);
  assert.equal(calls.length, 1);
});

test('native chat uses checked CLI support and argument-safe file attachments', { skip: process.platform !== 'win32' }, async t => {
  const f = await createArticleFixture();
  t.after(() => f.dispose());
  const installation = path.join(f.directory, 'editor');
  await mkdir(path.join(installation, 'bin'), { recursive: true });
  await mkdir(path.join(installation, 'resources', 'app', 'out'), { recursive: true });
  await writeFile(path.join(installation, 'bin', 'code.cmd'), '"%~dp0..\\Code.exe" "%~dp0..\\resources\\app\\out\\cli.js" %*');
  await writeFile(path.join(installation, 'resources', 'app', 'out', 'cli.js'), '');
  const calls = [];
  const executable = path.join(installation, 'Code.exe');
  const editor = await editorTools.createEditor({ executable, async run(...args) {
    calls.push(args); return { stdout: '--add-file --mode' };
  } });
  const files = [path.join(f.directory, 'a & b.md')];
  const prompt = 'Review this article: "quoted text"; not shell code.';
  assert.equal((await editor.chat({ files, prompt })).requested, true);
  assert.deepEqual(calls[1][1].slice(1), ['chat', '--reuse-window', '--mode', 'agent', '--add-file', files[0], prompt]);
  const old = await editorTools.createEditor({ executable, async run() { return { stdout: 'No chat options' }; } });
  await assert.rejects(old.chat({ files, prompt }), /native chat launcher/);
  const failed = await editorTools.createEditor({ executable, async run() { throw new Error('CLI unavailable'); } });
  await assert.rejects(failed.chat({ files, prompt }), /CLI unavailable/);
});

test('browser opens a preset-and-freeform review chat once and surfaces launch failures without retry', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const calls = [];
  let fail = false;
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true, async chat(input) {
    calls.push(input);
    if (fail) throw new Error('Native chat timed out');
    return { requested: true, message: 'Review request sent to chat.' };
  } } } });
  let browser;
  const server = await createWorkbenchServer(f.rawWorkflow, async () => {}, () => {}, { assetEntries: articleAssets });
  t.after(async () => { try { await browser?.close(); await server.close(); } finally { await f.dispose(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/findings`);
  await page.getByRole('link', { name: 'Review in chat', exact: true }).click();
  await page.locator('#chat-article:enabled').waitFor();
  await page.getByLabel('Article', { exact: true }).fill('docs/article.md');
  await page.getByLabel('Screenshots and videos', { exact: true }).check();
  await page.getByLabel('Additional request (optional)', { exact: true }).fill('Review the illustrations too.');
  await page.getByRole('button', { name: 'Start review in chat', exact: true }).click();
  await page.getByText('Review request sent to chat.', { exact: true }).waitFor();
  assert.equal(calls.length, 1);
  assert.match(calls[0].prompt, /Review the illustrations too/);
  assert.equal(f.tracked.length, 0);
  await page.setViewportSize({ width: 420, height: 780 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  fail = true;
  await page.getByRole('button', { name: 'Start review in chat', exact: true }).click();
  await page.getByText(/Native chat timed out.*Check VS Code Chat before trying again/).waitFor();
  assert.equal(calls.length, 2);
  assert.equal(await page.getByLabel('Additional request (optional)', { exact: true }).inputValue(), 'Review the illustrations too.');
  assert.deepEqual(errors, []);
});
