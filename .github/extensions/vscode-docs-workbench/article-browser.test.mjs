import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { createArticleFixture, resolveScreenshotRoot } from './article-fixture.mjs';
import { runArticleCheck } from './article-runner.mjs';
import { articleAssets } from './article-canvas.mjs';
import { createWorkbenchServer } from './server.mjs';
import { startVerificationWorker } from './article-verification.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Tests own OS-temp fixtures and browser profiles; optional screenshots use an explicit private directory outside the checkout. */

const browserOptions = {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an already installed Chromium browser executable.'
};

async function browserFixture(t, options) {
  const f = await createArticleFixture(options);
  let server;
  let context;
  t.after(async () => {
    try { await context?.close(); }
    finally {
      try { await server?.close(); }
      finally { await f.dispose(); }
    }
  });
  server = await createWorkbenchServer(f.rawWorkflow, async () => {}, () => {}, { assetEntries: articleAssets });
  const browserFiles = path.join(f.directory, 'browser');
  await mkdir(browserFiles);
  context = await chromium.launchPersistentContext(path.join(browserFiles, 'profile'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER,
    headless: true, viewport: { width: 1400, height: 1100 },
    downloadsPath: browserFiles,
    env: { ...process.env, TMP: browserFiles, TEMP: browserFiles, TMPDIR: browserFiles }
  });
  const page = await context.newPage();
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('dialog', async dialog => { failures.push(`Unexpected dialog: ${dialog.message()}`); await dialog.dismiss(); });
  await page.route('**/*', route => {
    if (new URL(route.request().url()).origin === server.url) return route.continue();
    failures.push(`Unexpected external request: ${route.request().url()}`);
    return route.abort();
  });
  await page.goto(server.url);
  await page.getByText('Ready. Choose articles or folders to check.', { exact: true }).waitFor();
  return { f, page, failures };
}

test('compact inbox loads automatically, filters, and preserves one-click decisions and safe reruns', browserOptions, async t => {
  const screenshotRoot = process.env.DOCS_ARTICLE_SCREENSHOTS
    ? await resolveScreenshotRoot(process.env.DOCS_ARTICLE_SCREENSHOTS) : undefined;
  let screenshotDirectory;
  const { f, page, failures } = await browserFixture(t, {
    content: '# Synthetic article\n\n' + Array.from({ length: 7 }, (_, index) => `\`setting(fixture.setting${index})\``).join('\n\n') +
      '\n\n[<img src=x onerror=alert(1)>](missing.md)\n'
  });
  const launch = page.getByRole('button', { name: 'Run checks', exact: true });
  const refresh = page.getByRole('button', { name: 'Refresh', exact: true });
  const indicator = page.locator('#execution-indicator');
  const rows = page.locator('.findings-table .finding');
  const scope = page.locator('#scope');
  assert.equal(f.requests.length, 0);
  assert.equal(await launch.isDisabled(), true);
  await scope.fill('docs/article.md');
  assert.equal(await launch.isEnabled(), true);
  await launch.click();
  await indicator.getByText('Findings updated · 1 article(s)', { exact: true }).waitFor();
  assert.equal(f.requests.length, 1);
  assert.equal(await rows.count(), 9);
  assert.equal(await page.getByRole('img', { name: 'Error', exact: true }).count(), 2);
  assert.equal(await page.getByRole('img', { name: 'Unverified', exact: true }).count(), 7);
  assert.equal(await page.locator('#execution-details').evaluate(node => node.open), false);
  assert.equal(await page.locator('#report img').count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Enable local review', exact: true }).count(), 0);
  assert.equal(await page.getByText('Recent runs', { exact: true }).count(), 0);
  assert.ok((await f.workflow.snapshot()).findings.every(record => record.history.length === 0));

  await page.getByRole('button', { name: 'Errors 2', exact: true }).click();
  assert.equal(await rows.count(), 2);
  await page.getByRole('button', { name: 'Unverified 7', exact: true }).click();
  assert.equal(await rows.count(), 7);
  await page.getByRole('searchbox', { name: 'Filter findings' }).fill('fixture.setting3');
  assert.equal(await rows.count(), 1);
  await page.getByRole('searchbox', { name: 'Filter findings' }).fill('');
  await page.getByRole('button', { name: 'All 9', exact: true }).click();
  assert.equal(await rows.count(), 9);

  const toggle = page.getByRole('button', { name: /^docs\/article\.md:\d+ · setting\(fixture\.setting0\)$/ });
  await toggle.click();
  const actions = rows.filter({ hasText: 'fixture.setting0' }).locator('.finding-actions');
  assert.equal(await actions.count(), 1, 'Review requires no enable/import step.');
  assert.equal(await page.locator('.finding-detail form').count(), 0, 'State changes need no reason or Save form.');
  await page.getByRole('button', { name: 'Errors 2', exact: true }).click();
  await page.getByRole('button', { name: 'All 9', exact: true }).click();
  await actions.getByRole('button', { name: 'Dismiss', exact: true }).click();
  await page.getByText('Decision saved locally. Documentation and GitHub are unchanged.', { exact: true }).waitFor();
  await page.getByLabel('Review status', { exact: true }).selectOption('dismissed');
  assert.equal(await rows.count(), 1);
  await page.getByLabel('Review status', { exact: true }).selectOption('all');
  await page.reload();
  await indicator.getByText('Findings updated · 1 article(s)', { exact: true }).waitFor();
  assert.equal(await rows.filter({ hasText: 'fixture.setting0' }).locator('.review-state').innerText(), 'dismissed');
  assert.equal(await page.locator('.finding-detail:not([hidden])').count(), 0);
  assert.equal(f.requests.length, 1, 'Reopening must not launch another check.');
  await scope.fill('docs/article.md');
  f.tracked[0].status = 'idle';
  f.tracked[0].idleSince = new Date().toISOString();
  delete f.tracked[0].completedAt;
  await refresh.click();
  await page.locator('#execution-details > summary').click();
  await page.getByText(/Host: idle/).waitFor();
  await page.getByText(/fixture runner \(synthetic host\)/).waitFor();
  assert.equal(await page.locator('#execution img').count(), 0);
  await page.locator('#execution-details > summary').click();

  await page.setViewportSize({ width: 1600, height: 1000 });
  const contentBounds = await page.locator('#findings-page').boundingBox();
  const navigationBounds = await page.locator('.page-navigation').boundingBox();
  const headerBounds = await page.locator('.article-app > header').boundingBox();
  assert.ok(contentBounds.width <= 1200, 'Findings should use the same readable frame as the TPI list.');
  assert.equal(contentBounds.x, navigationBounds.x);
  assert.equal(contentBounds.width, headerBounds.width);
  assert.ok(await page.locator('.batch-panel').evaluate(node => parseFloat(getComputedStyle(node).borderTopWidth) > 0));
  assert.ok(await page.locator('.results').evaluate(node => parseFloat(getComputedStyle(node).borderTopWidth) > 0));
  await page.setViewportSize({ width: 850, height: 800 });
  const tableBounds = await page.locator('.findings-table').boundingBox();
  assert.ok(tableBounds.height <= 400, `Nine collapsed findings should fit within 400px, got ${tableBounds.height}.`);
  assert.ok((await rows.first().boundingBox()).y < 600, 'Findings should be visible without expanding technical details.');
  const appearances = new Map();
  for (const theme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme: theme });
    const appearance = await page.locator('.article-app').evaluate(node => {
      const style = getComputedStyle(node);
      return { font: style.fontFamily, foreground: style.color, background: style.backgroundColor,
        inputBackground: getComputedStyle(node.querySelector('input')).backgroundColor,
        panelBackground: getComputedStyle(node.querySelector('.batch-panel')).backgroundColor,
        unverifiedColor: getComputedStyle(node.querySelector('.severity-icon.unverified')).color,
        errorColor: getComputedStyle(node.querySelector('.severity-icon.error')).color };
    });
    appearances.set(theme, appearance);
    assert.ok(appearance.font);
    assert.notEqual(appearance.foreground, appearance.background);
    assert.notEqual(appearance.inputBackground, 'rgba(0, 0, 0, 0)');
    assert.notEqual(appearance.panelBackground, 'rgba(0, 0, 0, 0)');
    assert.notEqual(appearance.unverifiedColor, appearance.errorColor);
    if (screenshotRoot) {
      if (!screenshotDirectory) {
        screenshotDirectory = await mkdtemp(path.join(screenshotRoot, 'vscode-docs-article-screenshots-'));
        t.diagnostic(`Synthetic screenshots retained in ${screenshotDirectory}`);
      }
      await page.screenshot({ path: path.join(screenshotDirectory, `article-${theme}.png`), fullPage: true });
    }
  }
  assert.notEqual(appearances.get('dark').background, appearances.get('light').background);
  await page.setViewportSize({ width: 420, height: 800 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
  await page.getByLabel('Checks', { exact: true }).selectOption('editorial');
  for (const id of ['scope', 'batch-focus', 'launch', 'editorial-channel', 'editorial-concerns']) {
    const bounds = await page.locator(`#${id}`).boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 420, 'Editorial controls must fit the narrow viewport.');
  }
  await page.getByLabel('Checks', { exact: true }).selectOption('local');
  await page.setViewportSize({ width: 850, height: 800 });
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Changed after inspection\n');
  await refresh.click();
  await rows.first().locator('.freshness').getByText('Stale', { exact: true }).waitFor();
  await page.getByLabel('Freshness', { exact: true }).selectOption('fresh');
  assert.equal(await rows.count(), 0);
  await page.getByLabel('Freshness', { exact: true }).selectOption('stale');
  assert.equal(await rows.count(), 9);
  await page.getByLabel('Freshness', { exact: true }).selectOption('all');
  assert.equal(await launch.isEnabled(), true);
  const run = (await f.workflow.snapshot()).runs[0];
  const reportFile = await f.workflow.store.artifact(run.id, 'report.json');
  const reportBytes = await readFile(reportFile);
  await writeFile(reportFile, '{}');
  await refresh.click();
  await indicator.getByText('Invalid report · 1 article(s)', { exact: true }).waitFor();
  assert.equal(await rows.count(), 9, 'Invalid attempts cannot erase the inbox.');
  assert.equal(await launch.isDisabled(), true);
  await writeFile(reportFile, reportBytes);
  await refresh.click();
  await page.locator('#launch:enabled').waitFor();
  f.tracked[0].status = 'running';
  await launch.click();
  await page.locator('#notice').getByText(/owning task is running/).waitFor();
  assert.equal(f.requests.length, 1);
  assert.equal(await launch.isDisabled(), true);
  f.tracked[0].status = 'idle';
  await refresh.click();
  await page.locator('#launch:enabled').waitFor();
  await launch.click();
  await rows.first().locator('.freshness').getByText('Not observed', { exact: true }).waitFor();
  assert.equal(f.requests.length, 2);
  assert.equal(await rows.count(), 9, 'A clean rescan retains unseen findings, not a second run view.');
  await page.getByLabel('Freshness', { exact: true }).selectOption('not-observed');
  assert.equal(await rows.count(), 9);
  await toggle.click();
  await actions.getByRole('button', { name: 'Undo', exact: true }).click();
  await actions.getByRole('button', { name: 'Mark fixed', exact: true }).click();
  await page.getByText('Decision saved locally. Documentation and GitHub are unchanged.', { exact: true }).waitFor();
  await rows.filter({ hasText: 'fixture.setting0' }).locator('.review-state').getByText('fixed', { exact: true }).waitFor();
  assert.equal(await rows.filter({ hasText: 'fixture.setting0' }).locator('.review-state').innerText(), 'fixed');
  await page.getByLabel('Freshness', { exact: true }).selectOption('all');
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# New context\n\n`setting(fixture.setting0)`');
  await launch.click();
  await rows.filter({ hasText: 'fixture.setting0' }).locator('.freshness').getByText('Fresh', { exact: true }).waitFor();
  assert.equal(await rows.filter({ hasText: 'fixture.setting0' }).locator('.review-state').innerText(), 'open');
  assert.equal(await actions.getByRole('button', { name: 'Mark fixed', exact: true }).isEnabled(), true);
  assert.deepEqual(failures, []);
});

test('completed host work keeps polling until its accepted findings reach the view', browserOptions, async t => {
  const { f, page, failures } = await browserFixture(t, { content: '`setting(completed)`' });
  const empty = await f.rawWorkflow.snapshot({ verify: false });
  const dispatch = f.rawWorkflow.dispatch;
  let delayedView = false;
  f.rawWorkflow.dispatch = async (action, input) => {
    const result = await dispatch(action, input);
    if (action !== 'refresh' || delayedView) return result;
    delayedView = true;
    await f.rawWorkflow.whenVerified();
    const completed = await f.rawWorkflow.snapshot({ verify: false });
    return {
      ...completed, findings: empty.findings, coverage: empty.coverage,
      runs: completed.runs.map(({ ingestedHash: _ingestedHash, ...run }) => run)
    };
  };
  await page.locator('#scope').fill('docs/article.md');
  await page.getByRole('button', { name: 'Run checks', exact: true }).click();
  await page.locator('.finding .freshness').getByText('Fresh', { exact: true }).waitFor({ timeout: 6000 });
  assert.equal(delayedView, true);
  assert.equal(f.requests.length, 1, 'Polling must not launch another check.');
  assert.deepEqual(failures, []);
});

test('batch scope is independent of article, check, status and freshness inbox filters and coverage', browserOptions, async t => {
  const { f, page, failures } = await browserFixture(t, {
    articles: { 'docs/group/one.md': '`setting(one)`', 'docs/group/clean.md': '# Clean', 'api/other.md': '`setting(other)`' }
  });
  const rows = page.locator('.finding');
  await page.locator('#scope').fill('docs/group, api/other.md');
  assert.equal(await page.locator('#scope-count').innerText(), '3 article(s) selected');
  await page.getByRole('button', { name: 'Run checks', exact: true }).click();
  await page.locator('#finding-count').getByText('2 of 2', { exact: true }).waitFor();
  assert.equal(f.requests.length, 1);
  await page.locator('#scope').fill('docs/article.md');
  assert.equal(await rows.count(), 2, 'Changing execution scope must not change the inbox.');
  await page.getByRole('button', { name: 'Run checks', exact: true }).click();
  await page.locator('#finding-count').getByText('4 of 4', { exact: true }).waitFor();
  await page.getByLabel('Article or folder', { exact: true }).fill('docs/group');
  assert.equal(await rows.count(), 1);
  await page.getByLabel('Article or folder', { exact: true }).fill('docs/article.md');
  assert.equal(await rows.count(), 2);
  await page.getByLabel('Check type', { exact: true }).selectOption('links');
  assert.equal(await rows.count(), 1);
  await page.getByLabel('Check type', { exact: true }).selectOption('claims');
  assert.equal(await rows.count(), 1);
  await page.getByLabel('Review status', { exact: true }).selectOption('dismissed');
  assert.equal(await rows.count(), 0);
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  assert.equal(await rows.count(), 4);
  await page.locator('#coverage-summary').click();
  await page.locator('.coverage-row').filter({ hasText: 'docs/group/clean.md' }).getByText('Checked clean', { exact: true }).waitFor();
  assert.equal(f.requests.length, 2, 'Review filters never run checks.');
  assert.ok((await f.workflow.snapshot()).findings.every(record => !record.history.length));
  assert.deepEqual(failures, []);
});

test('delayed reports ingest without an import step and failed later attempts retain verified findings', browserOptions, async t => {
  const { f, page, failures } = await browserFixture(t, { execute: false });
  await page.locator('#scope').fill('docs/article.md');
  await page.getByRole('button', { name: 'Run checks', exact: true }).click();
  await page.locator('#execution-indicator').getByText('Host running · 1 article(s)', { exact: true }).waitFor();
  const run = (await f.workflow.snapshot()).runs[0];
  f.tracked[0].status = 'completed';
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await page.locator('#execution-indicator').getByText('No report · 1 article(s)', { exact: true }).waitFor();
  await runArticleCheck(await f.workflow.store.artifact(run.id, 'request.json'), f);
  f.tracked[0].status = 'idle';
  f.tracked[0].idleSince = new Date().toISOString();
  await page.locator('#finding-count').getByText('2 of 2', { exact: true }).waitFor({ timeout: 15_000 });
  assert.equal(f.requests.length, 1);
  assert.equal((await f.workflow.store.read()).review.findings.length, 2);
  assert.ok((await f.workflow.store.read()).review.findings.every(record => !record.history.length));
  await page.getByRole('button', { name: 'Run checks', exact: true }).click();
  await page.locator('#execution-indicator').getByText('Host running · 1 article(s)', { exact: true }).waitFor();
  assert.equal(await page.locator('.finding').count(), 2);
  f.tracked[1].status = 'failed';
  f.tracked[1].completedAt = new Date().toISOString();
  f.tracked[1].error = 'Synthetic execution failure.';
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await page.locator('#execution-indicator').getByText('No report · 1 article(s)', { exact: true }).waitFor();
  assert.equal(await page.locator('.finding').count(), 2);
  assert.equal(await page.getByRole('button', { name: 'Run checks', exact: true }).isDisabled(), true);
  await page.locator('#coverage-summary').click();
  await page.getByText('Failed / incomplete', { exact: true }).waitFor();
  assert.equal(f.requests.length, 2);
  assert.deepEqual(failures, []);
});

test('host outages leave accepted evidence reviewable and exact-byte regressions visibly reopen fixed findings', browserOptions, async t => {
  const content = '`setting(regression)`';
  const { f, page, failures } = await browserFixture(t, { content });
  const launch = page.getByRole('button', { name: 'Run checks', exact: true });
  const refresh = page.getByRole('button', { name: 'Refresh', exact: true });
  const row = page.locator('.finding');
  const actions = row.locator('.finding-actions');
  await page.locator('#scope').fill('docs/article.md');
  await launch.click();
  await row.locator('.freshness').getByText('Fresh', { exact: true }).waitFor();
  await page.getByRole('button', { name: /^docs\/article\.md:\d+ · setting\(regression\)$/ }).click();
  const list = f.session.rpc.tasks.list;
  f.session.rpc.tasks.list = async () => { throw new Error('Synthetic host lookup unavailable'); };
  await refresh.click();
  await page.locator('#reload:enabled').waitFor();
  await row.locator('.freshness').getByText('Fresh', { exact: true }).waitFor();
  assert.equal(await actions.getByRole('button', { name: 'Mark fixed', exact: true }).isEnabled(), true);
  assert.equal(await launch.isDisabled(), true);
  await page.locator('#execution-details > summary').click();
  await page.locator('#execution').getByText('Synthetic host lookup unavailable', { exact: true }).waitFor();
  await page.locator('#execution-details > summary').click();
  f.session.rpc.tasks.list = list;
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Clean');
  await refresh.click();
  await launch.click();
  await row.locator('.freshness').getByText('Not observed', { exact: true }).waitFor();
  await actions.getByRole('button', { name: 'Mark fixed', exact: true }).click();
  await row.locator('.review-state').getByText('fixed', { exact: true }).waitFor();
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), content);
  await launch.click();
  await row.locator('.freshness').getByText('Fresh', { exact: true }).waitFor();
  assert.equal(await row.locator('.review-state').innerText(), 'open');
  await page.locator('.finding-detail').getByText(/^Reopened after reappearance:/).waitFor();
  assert.equal(await actions.getByRole('button', { name: 'Mark fixed', exact: true }).isEnabled(), true);
  assert.deepEqual(failures, []);
});

test('checking history stays filterable without requiring a state form or launching extra checks', browserOptions, async t => {
  let holding = false;
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  t.after(() => release());
  const { f, page, failures } = await browserFixture(t, {
    content: '`setting(progressive.example)`',
    workflowOptions: {
      verificationWorker(data, timeout) {
        const worker = startVerificationWorker(data, timeout);
        if (!holding || data.action !== 'inbox') return worker;
        return {
          done: worker.done.then(async result => { await gate; return result; }),
          async cancel() { release(); await worker.cancel(); }
        };
      }
    }
  });
  const launch = page.getByRole('button', { name: 'Run checks', exact: true });
  await page.locator('#scope').fill('docs/article.md');
  await launch.click();
  await page.locator('.finding .freshness').getByText('Fresh', { exact: true }).waitFor();
  holding = true;
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await page.locator('.finding .freshness').getByText('Checking', { exact: true }).waitFor();
  await page.getByRole('button', { name: /^docs\/article\.md:\d+ · setting\(progressive\.example\)$/ }).click();
  const actions = page.locator('.finding .finding-actions');
  assert.equal(await actions.getByRole('button', { name: 'Mark fixed', exact: true }).isEnabled(), true);
  await page.getByLabel('Freshness', { exact: true }).selectOption('fresh');
  assert.equal(await page.locator('.finding').count(), 0, 'Checking evidence must not appear in the Fresh filter.');
  await page.getByLabel('Freshness', { exact: true }).selectOption('checking');
  assert.equal(await page.locator('.finding').count(), 1);
  assert.equal(await actions.getByRole('button', { name: 'Dismiss', exact: true }).isEnabled(), true);
  assert.equal(f.requests.length, 1, 'Filtering pending verification never launches checks.');
  await page.getByLabel('Freshness', { exact: true }).selectOption('all');
  await launch.click();
  await page.locator('#execution-indicator').getByText('Waiting for verified results · 1 article(s)', { exact: true }).waitFor();
  release();
  await page.locator('#execution-indicator').getByText('Findings updated · 1 article(s)', { exact: true }).waitFor();
  await page.locator('.finding .freshness').getByText('Fresh', { exact: true }).waitFor();
  assert.equal(await page.locator('.finding-detail form').count(), 0);
  assert.equal((await f.workflow.store.read()).review.findings[0].history.length, 0);
  assert.deepEqual(failures, []);
});
