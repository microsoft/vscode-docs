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

test('media launchers pass create/refresh and multiple-asset requests to docs-media without changing batch state', async t => {
  const calls = [];
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true,
    async chat(input) { calls.push(input); return { requested: true }; } } } });
  t.after(() => f.dispose());
  await f.launch();
  await f.workflow.dispatch('refresh', {});
  const before = await f.rawWorkflow.store.read();
  const taskCount = f.tracked.length;
  f.session.rpc.tasks.list = async () => { throw new Error('Prior host task missing'); };
  for (const kind of ['screenshot', 'video']) for (const operation of ['create', 'refresh']) {
    const input = { article: 'docs/article.md', kind, operation, channel: 'stable',
      request: 'Prepare two assets; preserve the current examples and annotations.', confirmed: true };
    await f.workflow.dispatch('media-chat', input);
    const sent = calls.at(-1);
    assert.equal(sent.files[0], path.join(f.workspace, 'docs', 'article.md'));
    assert.ok(sent.files[1].endsWith(path.join('skills', 'docs-media', 'SKILL.md')));
    assert.match(sent.prompt, /Prepare two assets; preserve the current examples/);
    assert.match(sent.prompt, operation === 'create' ? /Create new/ : /propose useful refreshes/);
    assert.match(sent.prompt, kind === 'video' ? /short demo videos/ : /screenshots/);
    assert.match(sent.prompt, /preparation, not capture or article edits/);
    assert.match(sent.prompt, /approval of the exact candidates/);
  }
  const input = { article: 'docs/article.md', kind: 'screenshot', operation: 'refresh', channel: 'stable', confirmed: true };
  await f.workflow.dispatch('media-chat', input);
  assert.equal(calls.length, 5, 'The article and selected task suffice without a mandatory free-form request.');
  for (const change of [{ confirmed: false }, { kind: 'image' }, { operation: 'replace-all' },
    { channel: 'internal' }, { request: 'x'.repeat(4001) }, { article: '../outside.md' }]) {
    await assert.rejects(f.workflow.dispatch('media-chat', { ...input, ...change }));
  }
  const unsupported = await f.reopen({ editor: { available: false, message: 'No native chat' } });
  await assert.rejects(unsupported.dispatch('media-chat', input), /No native chat/);
  assert.equal(calls.length, 5);
  assert.equal(f.tracked.length, taskCount);
  assert.deepEqual(await f.rawWorkflow.store.read(), before);
});

test('procedure chat hands off reviewed scripted checks without claiming article-driven validation or starting UI', async t => {
  const calls = [];
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true,
    async chat(input) { calls.push(input); return { requested: true }; } } } });
  t.after(() => f.dispose());
  const input = { article: 'docs/article.md', request: 'Check the reviewed Find procedure.', channel: 'stable', confirmed: true };
  await f.workflow.dispatch('procedure-chat', input);
  assert.equal(calls[0].files[0], path.join(f.workspace, 'docs', 'article.md'));
  assert.ok(calls[0].files[1].endsWith(path.join('skills', 'docs-replay', 'SKILL.md')));
  assert.match(calls[0].prompt, /not automatic validation of article prose/);
  assert.match(calls[0].prompt, /Do not launch the product until/);
  assert.match(calls[0].prompt, /Check the reviewed Find procedure/);
  await assert.rejects(f.workflow.dispatch('procedure-chat', { ...input, confirmed: false }), /explicitly/);
  await assert.rejects(f.workflow.dispatch('procedure-chat', { ...input, channel: 'internal' }), /channel/);
  await assert.rejects(f.workflow.dispatch('procedure-chat', { ...input, article: '../outside.md' }), /repository-relative/);
  assert.equal(calls.length, 1);
  assert.equal(f.tracked.length, 0);
  assert.equal((await f.rawWorkflow.store.read()).runs.length, 0);
});

test('writing chat accepts a brief without an article and issue/TPI context without fetching or starting workflow tasks', async t => {
  const calls = [];
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true,
    async chat(input) { calls.push(input); return { requested: true }; } } } });
  t.after(() => f.dispose());
  f.session.rpc.tasks.list = async () => { throw new Error('No background tasks should be queried'); };
  const input = { kind: 'feature', request: 'Explain the new workflow to extension authors.', channel: 'stable', confirmed: true };
  await f.workflow.dispatch('writing-chat', input);
  assert.equal(calls[0].files.length, 1);
  assert.ok(calls[0].files[0].endsWith(path.join('skills', 'doc-writer', 'SKILL.md')));
  assert.match(calls[0].prompt, /No existing article was selected/);
  assert.match(calls[0].prompt, /No GitHub issue is required/);
  assert.match(calls[0].prompt, /Explain the new workflow to extension authors/);
  assert.match(calls[0].prompt, /Starting this chat authorizes planning only/);
  assert.ok(calls[0].prompt.includes(f.workspace));
  const issue = 'https://github.com/microsoft/vscode/issues/123#issuecomment-456';
  await f.workflow.dispatch('writing-chat', { kind: 'issue', issue, article: 'docs/article.md', channel: 'stable', confirmed: true });
  assert.equal(calls[1].files[0], path.join(f.workspace, 'docs', 'article.md'));
  assert.ok(calls[1].prompt.includes(issue));
  assert.match(calls[1].prompt, /not a complete specification/);
  assert.match(calls[1].prompt, /do not copy test setup into the article/);
  for (const change of [{ confirmed: false }, { request: '', issue: '' }, { kind: 'issue' }, { kind: 'other' },
    { issue: 'https://github.com/microsoft/vscode/pull/123' }, { issue: 'https://example.test/issues/123' },
    { issue: 'https://github.com/microsoft/vscode/issues/123#issuecomment-456#other' },
    { request: 'x'.repeat(4001) }, { article: false }, { article: '../outside.md' }, { article: 'docs/missing.md' }]) {
    await assert.rejects(f.workflow.dispatch('writing-chat', { ...input, ...change }));
  }
  assert.equal(calls.length, 2);
  assert.equal(f.tracked.length, 0);
  assert.equal((await f.rawWorkflow.store.read()).runs.length, 0);
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

test('browser exposes separate screenshot and video launchers with the right context and no capture actions', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const calls = [];
  let fail = false;
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true, async chat(input) {
    calls.push(input);
    if (fail) throw new Error('Native media chat timed out');
    return { requested: true, message: 'Media request sent to chat.' };
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
  for (const [route, title, operation, request] of [
    ['/screenshots', 'Screenshots', 'refresh', 'Refresh both setup screenshots; preserve their callouts.'],
    ['/videos', 'Demo videos', 'create', 'Create two short demos with visible actions.']
  ]) {
    await page.getByRole('link', { name: title, exact: true }).click();
    await page.locator('#chat-article:enabled').waitFor();
    assert.equal(new URL(page.url()).pathname, route);
    assert.equal(await page.getByRole('heading', { name: title, exact: true }).count(), 1);
    assert.equal(await page.getByRole('link', { name: title, exact: true }).getAttribute('aria-current'), 'page');
    assert.equal(await page.locator('#chat-presets').isVisible(), false);
    await page.getByLabel('Article', { exact: true }).fill('docs/article.md');
    await page.getByLabel('Task', { exact: true }).selectOption(operation);
    await page.getByLabel('Additional request (optional)', { exact: true }).fill(request);
    await page.getByRole('button', { name: 'Start in chat', exact: true }).click();
    await page.getByText('Media request sent to chat.', { exact: true }).waitFor();
    assert.ok(calls.at(-1).prompt.includes(request));
    assert.ok(calls.at(-1).files[1].endsWith(path.join('skills', 'docs-media', 'SKILL.md')));
    await page.setViewportSize({ width: 420, height: 780 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  }
  assert.equal(calls.length, 2);
  assert.equal(f.tracked.length, 0);
  fail = true;
  await page.getByRole('button', { name: 'Start in chat', exact: true }).click();
  await page.getByText(/Native media chat timed out.*Check VS Code Chat before trying again/).waitFor();
  assert.equal(calls.length, 3);
  assert.equal(await page.getByLabel('Task', { exact: true }).inputValue(), 'create');
  assert.equal(await page.getByLabel('Additional request (optional)', { exact: true }).inputValue(), 'Create two short demos with visible actions.');
  assert.deepEqual(errors, []);
});

test('browser separates instruction-check chat from batch Findings and labels the unimplemented capability', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const calls = [];
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true, async chat(input) {
    calls.push(input); return { requested: true, message: 'Procedure request sent to chat.' };
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
  assert.equal(await page.locator('#task-type, #review-form, #replay-form').count(), 0);
  await page.getByRole('link', { name: 'Check instructions', exact: true }).click();
  await page.locator('#chat-article:enabled').waitFor();
  assert.equal(new URL(page.url()).pathname, '/instructions');
  await page.getByText('Automatic article-driven UI validation is not yet available. Advanced option: replay a human-reviewed scripted procedure in chat.', { exact: true }).waitFor();
  assert.equal(await page.locator('#chat-presets').isVisible(), false);
  assert.equal(await page.locator('#chat-media-task').isVisible(), false);
  assert.equal(calls.length, 0);
  await page.getByLabel('Article', { exact: true }).fill('docs/article.md');
  await page.getByLabel('Additional request (optional)', { exact: true }).fill('Check the reviewed Find procedure.');
  await page.getByRole('button', { name: 'Start scripted replay in chat', exact: true }).click();
  await page.getByText('Procedure request sent to chat.', { exact: true }).waitFor();
  assert.equal(calls.length, 1);
  assert.equal(f.tracked.length, 0);
  await page.getByRole('link', { name: 'Findings', exact: true }).click();
  await page.getByRole('heading', { name: 'Run batch checks', exact: true }).waitFor();
  assert.equal(await page.locator('#task-type, #review-form, #replay-form').count(), 0);
  assert.deepEqual(errors, []);
});

test('browser launches writing and issue/TPI chats without mandatory article input and keeps saved work secondary', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const calls = [];
  let fail = false;
  const f = await createArticleFixture({ workflowOptions: { editor: { available: true, async chat(input) {
    calls.push(input);
    if (fail) throw new Error('Native writing chat timed out');
    return { requested: true, message: 'Documentation request sent to chat.' };
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
  await page.getByRole('link', { name: 'Write documentation', exact: true }).click();
  await page.locator('#chat-request:enabled').waitFor();
  assert.equal(new URL(page.url()).pathname, '/write');
  assert.equal(await page.getByRole('button', { name: 'Start in chat', exact: true }).isDisabled(), true);
  await page.getByLabel('Documentation request', { exact: true }).fill('Document the new workflow for extension authors.');
  const requestBounds = await page.locator('#chat-request').boundingBox();
  assert.ok(requestBounds.width >= (await page.locator('#review-chat-form').boundingBox()).width - 2);
  assert.ok(requestBounds.y < (await page.locator('#chat-article').boundingBox()).y, 'The author brief must come before optional article context.');
  await page.getByRole('button', { name: 'Start in chat', exact: true }).click();
  await page.getByText('Documentation request sent to chat.', { exact: true }).waitFor();
  assert.equal(calls[0].files.length, 1);
  assert.match(calls[0].prompt, /Document the new workflow for extension authors/);
  await page.getByRole('link', { name: 'Document an issue/TPI', exact: true }).click();
  await page.locator('#chat-issue:enabled').waitFor();
  assert.equal(new URL(page.url()).pathname, '/issue');
  const url = 'https://github.com/microsoft/vscode/issues/123';
  await page.getByLabel('GitHub issue or test plan item URL', { exact: true }).fill(url);
  await page.getByRole('button', { name: 'Start in chat', exact: true }).click();
  await page.getByText('Documentation request sent to chat.', { exact: true }).waitFor();
  assert.equal(calls.length, 2);
  assert.ok(calls[1].prompt.includes(url));
  assert.equal(f.tracked.length, 0);
  fail = true;
  await page.getByLabel('Desired documentation outcome (optional)', { exact: true }).fill('Preserve these requirements on a failed handoff.');
  await page.getByRole('button', { name: 'Start in chat', exact: true }).click();
  await page.getByText(/Native writing chat timed out.*Check VS Code Chat before trying again/).waitFor();
  assert.equal(calls.length, 3);
  assert.equal(await page.getByLabel('GitHub issue or test plan item URL', { exact: true }).inputValue(), url);
  await page.setViewportSize({ width: 420, height: 800 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.equal(await page.locator('.page-navigation a[href="/writing"]').count(), 0);
  await page.getByRole('link', { name: 'Saved plans and drafts', exact: true }).click();
  await page.getByRole('heading', { name: 'Saved plans and drafts', exact: true }).waitFor();
  assert.equal(await page.locator('#feature-form, #feature-launch').count(), 0);
  assert.deepEqual(errors, []);
});
