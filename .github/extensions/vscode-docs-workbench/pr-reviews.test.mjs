import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { createGitHub } from './github.mjs';
import { createArticleFixture } from './article-fixture.mjs';
import { createWorkbenchServer } from './server.mjs';
import { articleAssets } from './article-canvas.mjs';

const publicRepo = 'microsoft/vscode-docs';
const privateRepo = 'microsoft/vscode-docs-pr';
const item = (number, extra = {}) => ({ number, title: `Document feature ${number}`, author: 'writer',
  draft: false, updatedAt: '2026-11-22T12:00:00Z', ...extra });

async function fixture(t) {
  let account = 'fixture-author';
  let failure;
  let chatFailure = false;
  let items = [item(123), item(124, { title: 'Preview <img src=x onerror=alert(1)>', draft: true, author: null })];
  const chats = [];
  const reads = [];
  const github = {
    async account() { return account; },
    async openPullRequests(repository) {
      reads.push(repository);
      if (failure) throw new Error(failure);
      return structuredClone(items);
    }
  };
  const f = await createArticleFixture({ workflowOptions: { prOptions: { github }, editor: {
    available: true, async chat(input) {
      chats.push(input);
      if (chatFailure) throw new Error('Chat timed out');
      return { requested: true, message: 'PR review requested in chat.' };
    }
  } } });
  let cleanup = async () => {};
  t.after(async () => { try { await cleanup(); } finally { await f.dispose(); } });
  return { ...f, chats, reads,
    load: (repository = publicRepo) => f.workflow.dispatch('pr-load', { repository }),
    failList(value = 'GitHub unavailable') { failure = value; }, failChat() { chatFailure = true; },
    setItems(value) { items = value; }, setAccount(value) { account = value; },
    beforeDispose(callback) { cleanup = callback; }
  };
}

test('PR discovery paginates both repository endpoints, includes drafts, and fails rather than returning a partial list', async () => {
  const calls = [];
  const github = createGitHub(async args => {
    const endpoint = args[3]; calls.push(endpoint);
    assert.match(endpoint, /^repos\/microsoft\/vscode-docs(?:-pr)?\/pulls\?state=open&sort=updated&direction=desc&per_page=100&page=/);
    const raw = number => ({ number, title: `PR ${number}`, state: 'open', draft: number === 101,
      updated_at: '2026-11-22T12:00:00Z', user: { login: 'writer' } });
    return endpoint.endsWith('page=2') ? [raw(101)] : Array.from({ length: 100 }, (_, index) => raw(index + 1));
  });
  for (const repository of [publicRepo, privateRepo]) {
    const items = await github.openPullRequests(repository);
    assert.equal(items.length, 101);
    assert.equal(items.at(-1).draft, true);
    assert.equal(items[0].repo, repository);
    assert.equal(items[0].author, 'writer');
  }
  assert.equal(calls.length, 4);
  await assert.rejects(github.openPullRequests('elsewhere/repo'), /supported/);
  assert.equal(calls.length, 4);
  const interrupted = createGitHub(async args => {
    if (args[3].endsWith('page=2')) throw new Error('Second page failed');
    return Array.from({ length: 100 }, (_, index) => ({ number: index + 1, title: 'PR', state: 'open' }));
  });
  await assert.rejects(interrupted.openPullRequests(publicRepo), /Second page failed/);
});

test('PR refresh retains the identified last successful list on failure but never carries it across accounts', async t => {
  const f = await fixture(t);
  assert.equal(f.reads.length, 0, 'Constructing the workflow must not contact GitHub.');
  const initial = await f.load();
  assert.equal(initial.cache.repository, publicRepo);
  f.failList();
  const failed = await f.load(privateRepo);
  assert.equal(failed.repository, privateRepo);
  assert.deepEqual(failed.cache, initial.cache);
  assert.match(failed.error, /Could not load PRs for microsoft\/vscode-docs-pr/);
  f.setAccount('another-author');
  assert.equal((await f.load()).cache, null);
  f.failList(null);
  f.setItems([item(123), item(123)]);
  assert.match((await f.load()).error, /invalid pull request metadata/);
  f.setItems([]);
  assert.deepEqual((await f.load()).cache.items, []);
  await assert.rejects(f.load('elsewhere/repo'), /supported/);
});

test('PR review hands off only the slash command, canonical link, and optional instructions without changing findings', async t => {
  const f = await fixture(t);
  await f.launch();
  await f.workflow.dispatch('refresh', {});
  const before = await f.rawWorkflow.store.read();
  const tasks = f.tracked.length;
  f.session.rpc.tasks.list = async () => { throw new Error('No historical host lookup is allowed'); };
  const input = { url: `https://github.com/${privateRepo}/pull/345#discussion_r123`,
    request: '  Check the command and default value;\nleave wording alone.  ', confirmed: true };
  await f.workflow.dispatch('pr-chat', input);
  assert.equal(f.chats.length, 1);
  assert.deepEqual(f.chats[0], { files: [],
    prompt: `/pr-review https://github.com/${privateRepo}/pull/345 Check the command and default value;\nleave wording alone.` });
  for (const request of [undefined, '', ' \n ']) {
    await f.workflow.dispatch('pr-chat', { ...input, url: `https://github.com/${publicRepo}/pull/123/`, request });
    assert.deepEqual(f.chats.at(-1), { files: [], prompt: `/pr-review https://github.com/${publicRepo}/pull/123` });
  }
  for (const change of [{ confirmed: false }, { request: false }, { request: 'x'.repeat(4001) },
    { request: '\0' }, { url: false }, { url: `https://github.com/${publicRepo}/issues/123` },
    { url: `https://github.com@elsewhere.test/${publicRepo}/pull/123` },
    { url: `https://user@github.com/${publicRepo}/pull/123` },
    { url: 'https://github.com/elsewhere/repo/pull/123' },
    { url: `https://github.com/${publicRepo}/pull/9007199254740992` },
    { url: `https://github.com/${publicRepo}/pull/123?execute=1` }]) {
    await assert.rejects(f.workflow.dispatch('pr-chat', { ...input, ...change }));
  }
  const unsupported = await f.reopen({ editor: { available: false, message: 'No native chat' } });
  await assert.rejects(unsupported.dispatch('pr-chat', input), /No native chat/);
  assert.equal(f.chats.length, 4);
  assert.equal(f.reads.length, 0);
  assert.equal(f.tracked.length, tasks);
  assert.deepEqual(await f.rawWorkflow.store.read(), before);
});

test('browser lists both PR repositories, handles search and failed refresh, and launches row or direct reviews once', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
  let browser;
  const server = await createWorkbenchServer(f.rawWorkflow, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/findings`);
  await page.getByRole('link', { name: 'Review PRs', exact: true }).click();
  await page.getByText('2 of 2 PRs', { exact: true }).waitFor();
  assert.equal(await page.getByLabel('Intended product channel', { exact: true }).count(), 0);
  assert.equal(await page.getByRole('link', { name: 'Review PRs', exact: true }).getAttribute('aria-current'), 'page');
  assert.equal(await page.locator('img').count(), 0);
  assert.equal(await page.getByRole('cell', { name: 'Draft', exact: true }).count(), 1);
  await page.getByLabel('Search PRs').fill('124');
  await page.getByText('1 of 2 PRs', { exact: true }).waitFor();
  const draft = page.getByRole('row').filter({ hasText: 'Preview <img' });
  await draft.getByText('Optional instructions', { exact: true }).click();
  await draft.getByLabel('Review focus', { exact: true }).fill('Verify the experimental gate.');
  await draft.getByRole('button', { name: `Review ${publicRepo}#124`, exact: true }).evaluate(button => { button.click(); button.click(); });
  await page.getByText('PR review requested in chat.', { exact: true }).waitFor();
  assert.equal(f.chats.length, 1);
  assert.deepEqual(f.chats[0], { files: [],
    prompt: `/pr-review https://github.com/${publicRepo}/pull/124 Verify the experimental gate.` });
  await page.getByLabel('Search PRs').fill('');
  await page.getByLabel('Repository', { exact: true }).selectOption(privateRepo);
  await page.getByText(/Showing microsoft\/vscode-docs-pr\./).waitFor();
  assert.equal(await page.getByRole('link', { name: 'Document feature 123', exact: true }).getAttribute('href'),
    `https://github.com/${privateRepo}/pull/123`);
  f.failList();
  await page.getByLabel('Repository', { exact: true }).selectOption(publicRepo);
  await page.getByText(/Could not load PRs for microsoft\/vscode-docs:/).waitFor();
  await page.getByText(/Showing microsoft\/vscode-docs-pr.*not the selected repository/).waitFor();
  await page.getByText('Review a PR by URL', { exact: true }).click();
  await page.getByLabel('Pull request URL', { exact: true }).fill(`https://github.com/${publicRepo}/pull/999`);
  await page.getByLabel('Review focus (optional)', { exact: true }).fill('Review this closed PR.');
  await page.getByRole('button', { name: 'Start PR review in chat', exact: true }).click();
  await page.getByText('PR review requested in chat.', { exact: true }).waitFor();
  assert.equal(f.chats.length, 2);
  assert.deepEqual(f.chats[1], { files: [],
    prompt: `/pr-review https://github.com/${publicRepo}/pull/999 Review this closed PR.` });
  f.failChat();
  await page.getByRole('button', { name: 'Start PR review in chat', exact: true }).click();
  await page.getByText(/Chat timed out.*Check VS Code Chat before trying again/).waitFor();
  assert.equal(f.chats.length, 3);
  await page.setViewportSize({ width: 1400, height: 900 });
  assert.ok((await page.locator('.tpi-content').boundingBox()).width <= 1200);
  const sidebarBounds = await page.locator('.workflow-sidebar').boundingBox();
  assert.ok(sidebarBounds.x + sidebarBounds.width <= (await page.locator('.tpi-content').boundingBox()).x);
  assert.ok((await page.locator('#pr-rows tr').first().boundingBox()).height < 100);
  const backgrounds = [];
  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme });
    backgrounds.push(await page.locator('main').evaluate(element => getComputedStyle(element).backgroundColor));
    await page.setViewportSize({ width: 420, height: 800 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    for (const id of ['pr-repository', 'pr-refresh', 'pr-search', 'pr-url']) {
      const bounds = await page.locator(`#${id}`).boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 420);
    }
    assert.ok(await page.locator('.tpi-table-container').evaluate(element => element.scrollWidth > element.clientWidth));
  }
  assert.notEqual(backgrounds[0], backgrounds[1]);
  assert.equal(f.tracked.length, 0);
  assert.deepEqual(errors, []);
});
