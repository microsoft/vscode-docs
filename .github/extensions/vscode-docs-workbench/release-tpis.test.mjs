import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import path from 'node:path';
import { createGitHub } from './github.mjs';
import { createArticleFixture } from './article-fixture.mjs';
import { createArticleStore, hash } from './article-storage.mjs';
import { createReleaseTpis } from './release-tpis.mjs';
import { createWorkbenchServer } from './server.mjs';
import { articleAssets } from './article-canvas.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Test state stays within exclusively owned temporary fixtures. */

async function fixture(t) {
  let account = 'fixture-author';
  let failure;
  let releaseFailure = false;
  let chatFailure = false;
  const chats = [];
  const release = { number: 10, title: '1.148.0', state: 'open' };
  const older = { number: 9, title: '1.147.0', state: 'closed' };
  let items = [
    { number: 123, title: 'Explain fixture navigation', state: 'closed', assignees: ['reader'] },
    { number: 124, title: 'Describe fixture editing <img src=x onerror=alert(1)>', state: 'open', assignees: [] }
  ];
  let olderItems = [];
  const github = {
    async account() { return account; },
    async milestones() { if (releaseFailure) throw new Error('Release lookup failed'); return [release, older]; },
    async releaseTpis(number) {
      if (failure) throw new Error(failure);
      return structuredClone(number === 10 ? items : olderItems);
    }
  };
  const editor = { available: true, async chat(input) {
    chats.push(input);
    if (chatFailure) throw new Error('Chat timed out');
    return { requested: true, message: 'Documentation request sent to chat.' };
  } };
  const f = await createArticleFixture({ workflowOptions: { tpiOptions: { github }, editor } });
  let dispose = async () => {};
  t.after(async () => { try { await dispose(); } finally { await f.dispose(); } });
  return { ...f, github, editor, chats, release, older,
    setAccount(value) { account = value; }, failList(value = 'GitHub list failed') { failure = value; },
    failReleases() { releaseFailure = true; }, failChat() { chatFailure = true; },
    setItems(value) { items = value; }, setOlderItems(value) { olderItems = value; },
    beforeDispose(callback) { dispose = callback; },
    load: input => f.workflow.dispatch('tpi-load', input || {}),
    item: (number = 123, extra = {}) => ({ account, release: 10, number, ...extra }),
    mark: (number = 123, documented = true) => f.workflow.dispatch('tpi-documented', { account, release: 10, number, documented })
  };
}

test('release TPIs use the repository milestone endpoint with complete pagination and both issue states', async () => {
  const endpoints = [];
  const github = createGitHub(async args => {
    const endpoint = args[3]; endpoints.push(endpoint);
    assert.ok(endpoint.startsWith('repos/microsoft/vscode/issues?milestone=10&state=all&labels=testplan-item'));
    const item = number => ({ number, title: `Fixture ${number}`, state: number % 2 ? 'closed' : 'open', assignees: [], labels: [] });
    if (endpoint.includes('&page=2')) return [
      { ...item(101), title: 'Verification TPI: excluded' }, { ...item(102), pull_request: {} }, item(103)
    ];
    return Array.from({ length: 100 }, (_, index) => item(index + 1));
  });
  const items = await github.releaseTpis(10);
  assert.equal(items.length, 101);
  assert.ok(items.some(item => item.state === 'closed'));
  assert.ok(items.some(item => item.state === 'open'));
  assert.ok(items.every(item => item.repo === 'microsoft/vscode'));
  assert.equal(items.at(-1).number, 103);
  assert.equal(endpoints.length, 2);
  await assert.rejects(github.releaseTpis('10'), /milestone/);
  assert.equal(endpoints.length, 2);
  const interrupted = createGitHub(async args => {
    if (args[3].includes('&page=2')) throw new Error('Second page unavailable');
    return Array.from({ length: 100 }, (_, index) => ({ number: index + 1, title: 'TPI', state: 'closed' }));
  });
  await assert.rejects(interrupted.releaseTpis(10), /Second page unavailable/);
});

test('Documented is manual, reversible, account/workspace scoped, and survives reloads and milestone moves', async t => {
  const f = await fixture(t);
  assert.equal((await f.load()).selected, null);
  const loaded = await f.load({ release: 10 });
  assert.equal(loaded.cache.items.length, 2);
  assert.deepEqual(loaded.documented, []);
  await f.mark();
  const reopened = await f.reopen();
  const restored = await reopened.dispatch('tpi-load', {});
  assert.equal(restored.selected, 10);
  assert.deepEqual(restored.documented, [123]);
  f.setOlderItems([{ number: 123, title: 'Moved to another release', state: 'closed', assignees: [] }]);
  const moved = await f.load({ release: 9 });
  assert.equal(moved.cache.items[0].number, 123);
  assert.deepEqual(moved.documented, [123]);
  f.setItems([{ number: 123, title: 'Renamed and reopened', state: 'open', assignees: [] }]);
  await f.load({ release: 10 });
  assert.deepEqual((await f.load()).documented, [123]);
  f.setAccount('another-author');
  const otherAccount = await f.load();
  assert.equal(otherAccount.selected, null);
  assert.deepEqual(otherAccount.documented, []);
  await assert.rejects(f.workflow.dispatch('tpi-documented', { ...f.item(), account: 'fixture-author', documented: false }), /account changed/);
  f.setAccount('fixture-author');
  await f.load({ release: 10 });
  const other = await createArticleFixture();
  t.after(() => other.dispose());
  const differentWorkspace = createReleaseTpis(await createArticleStore(other.workspace, f.home), f.editor, { github: f.github });
  assert.deepEqual((await differentWorkspace.load({})).documented, []);
  assert.deepEqual((await f.mark(123, false)).documented, []);
  await assert.rejects(f.mark(999), /list changed/);
  await assert.rejects(f.workflow.dispatch('tpi-documented', { ...f.item(), documented: 'yes' }), /whether/);
});

test('list errors retain the last successful release without presenting partial or corrupt results as success', async t => {
  const f = await fixture(t);
  const initial = await f.load({ release: 10 });
  f.failList();
  const failed = await f.load({ release: 9 });
  assert.equal(failed.selected, 9);
  assert.deepEqual(failed.cache, initial.cache);
  assert.match(failed.error, /Could not load TPIs for 1.147.0/);
  f.failReleases();
  const failedReleases = await f.load();
  assert.deepEqual(failedReleases.cache, initial.cache);
  assert.match(failedReleases.error, /Could not load releases/);
  const file = await f.rawWorkflow.store.file(`release-tpis-${hash('fixture-author')}.json`);
  await writeFile(file, '{"version":99}');
  await assert.rejects(f.load(), /Corrupt release-TPI/);
  assert.equal(await readFile(file, 'utf8'), '{"version":99}');
});

test('Document hands the exact TPI and release to doc-writer without changing flags, findings, or starting background work', async t => {
  const f = await fixture(t);
  await f.launch();
  await f.workflow.dispatch('refresh', {});
  const findings = await f.rawWorkflow.store.read();
  const tasks = f.tracked.length;
  await f.load({ release: 10 });
  await f.mark();
  const input = { ...f.item(), request: 'Preserve the examples.', channel: 'stable', confirmed: true };
  await f.workflow.dispatch('tpi-document', input);
  assert.equal(f.chats.length, 1);
  assert.ok(f.chats[0].files[0].endsWith(path.join('skills', 'doc-writer', 'SKILL.md')));
  assert.match(f.chats[0].prompt, /https:\/\/github.com\/microsoft\/vscode\/issues\/123/);
  assert.match(f.chats[0].prompt, /release milestone 1.148.0/);
  assert.match(f.chats[0].prompt, /Preserve the examples/);
  assert.match(f.chats[0].prompt, /planning only/);
  assert.deepEqual((await f.load()).documented, [123]);
  f.failChat();
  await assert.rejects(f.workflow.dispatch('tpi-document', input), /Chat timed out/);
  assert.deepEqual((await f.load()).documented, [123]);
  for (const change of [{ release: 9 }, { number: 999 }, { account: 'another-author' }, { confirmed: false }, { channel: 'internal' }]) {
    await assert.rejects(f.workflow.dispatch('tpi-document', { ...input, ...change }));
  }
  assert.equal(f.chats.length, 2);
  assert.equal(f.tracked.length, tasks);
  assert.deepEqual(await f.rawWorkflow.store.read(), findings);
});

test('browser loads release TPIs, launches one chat, and persists the reversible Documented checkbox', {
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
  await page.getByRole('link', { name: 'Release TPIs', exact: true }).click();
  await page.locator('#tpi-release:enabled').waitFor();
  await page.getByLabel('Release', { exact: true }).selectOption('10');
  await page.getByText('2 of 2 TPIs', { exact: true }).waitFor();
  await page.setViewportSize({ width: 1400, height: 900 });
  const releaseBounds = await page.locator('#tpi-release').boundingBox();
  const refreshBounds = await page.locator('#tpi-refresh').boundingBox();
  const searchBounds = await page.locator('#tpi-search').boundingBox();
  assert.ok(Math.abs(releaseBounds.y + releaseBounds.height - refreshBounds.y - refreshBounds.height) < 2,
    'Release selection and refresh should align as one control group.');
  assert.ok(searchBounds.y > releaseBounds.y + releaseBounds.height, 'List filters should sit beneath the release controls.');
  assert.ok((await page.locator('.tpi-content').boundingBox()).width <= 1200, 'Wide views should keep a readable content width.');
  assert.ok((await page.locator('#tpi-rows tr').first().boundingBox()).height < 100, 'Collapsed rows should stay compact.');
  assert.equal(await page.getByRole('cell', { name: 'Closed', exact: true }).count(), 1);
  assert.equal(await page.locator('img').count(), 0, 'GitHub titles must remain text, not markup.');
  const first = page.getByRole('row').filter({ hasText: 'Explain fixture navigation' });
  await first.getByText('Optional instructions', { exact: true }).click();
  await first.getByLabel('Instructions for doc-writer').fill('Keep the examples.');
  await first.getByRole('button', { name: 'Document', exact: true }).evaluate(button => { button.click(); button.click(); });
  await page.getByText('Documentation request sent to chat.', { exact: true }).waitFor();
  assert.equal(f.chats.length, 1);
  assert.match(f.chats[0].prompt, /Keep the examples/);
  const checkbox = page.getByRole('checkbox', { name: 'Mark microsoft/vscode#123 as documented', exact: true });
  assert.equal(await checkbox.isChecked(), false);
  await checkbox.check();
  await page.getByText(/marked documented.*Saved locally/).waitFor();
  await page.getByLabel('Documentation', { exact: true }).selectOption('documented');
  await page.getByText('1 of 2 TPIs', { exact: true }).waitFor();
  await page.reload();
  await page.getByText('2 of 2 TPIs', { exact: true }).waitFor();
  assert.equal(await page.getByLabel('Release', { exact: true }).inputValue(), '10');
  assert.equal(await checkbox.isChecked(), true);
  await checkbox.uncheck();
  await page.getByText(/documented mark removed.*Saved locally/).waitFor();
  assert.deepEqual((await f.load()).documented, []);
  f.failList();
  await page.getByLabel('Release', { exact: true }).selectOption('9');
  await page.getByText(/Could not load TPIs for 1.147.0/).waitFor();
  await page.getByText(/Showing microsoft\/vscode release 1.148.0.*not the selected release/).waitFor();
  assert.equal(await page.getByRole('link', { name: 'Explain fixture navigation', exact: true }).count(), 1);
  f.failChat();
  await first.getByRole('button', { name: 'Document', exact: true }).click();
  await page.getByText(/Chat timed out.*Check VS Code Chat before trying again/).waitFor();
  assert.equal(f.chats.length, 2);
  assert.equal(await checkbox.isChecked(), false);
  const appearances = [];
  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme });
    const appearance = await page.locator('.tpi-page').evaluate(element => ({
      foreground: getComputedStyle(element).color,
      background: getComputedStyle(element).backgroundColor,
      header: getComputedStyle(element.querySelector('.tpi-table th')).backgroundColor
    }));
    assert.notEqual(appearance.foreground, appearance.background);
    appearances.push(appearance);
    await page.setViewportSize({ width: 420, height: 800 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    for (const id of ['tpi-release', 'tpi-refresh', 'tpi-channel', 'tpi-search', 'tpi-filter']) {
      const bounds = await page.locator(`#${id}`).boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 420, 'Controls must remain within the narrow viewport.');
    }
    assert.ok(await page.locator('.tpi-table-container').evaluate(element => element.scrollWidth > element.clientWidth),
      'Only the table, not the page, should scroll horizontally.');
  }
  assert.notEqual(appearances[0].background, appearances[1].background);
  assert.notEqual(appearances[0].header, appearances[1].header);
  assert.equal(f.tracked.length, 0);
  assert.deepEqual(errors, []);
});
