import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import replay from '../../../build/replay.js';
import { chromium } from 'playwright-core';
import { createArticleFixture } from './article-fixture.mjs';
import { createReplayWorkflow, replayOutputDirectory, runReplayRequest } from './article-replay.mjs';
import { atomicJson, hash, now, readJson } from './article-storage.mjs';
import { articleAssets } from './article-canvas.mjs';
import { createWorkbenchServer } from './server.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Only owned synthetic OS-temp fixtures are written or read. */

async function fixture(t) {
  const f = await createArticleFixture();
  let beforeDispose = async () => {};
  t.after(async () => { try { await beforeDispose(); } finally { await f.dispose(); } });
  const definition = JSON.parse(await readFile(new URL('../../../build/storyboards/editor-find.json', import.meta.url), 'utf8'));
  definition.article = 'docs/article.md';
  const stories = path.join(f.workspace, 'build', 'storyboards');
  await mkdir(stories);
  await atomicJson(path.join(stories, 'editor-find.json'), definition);
  const executable = path.join(f.directory, 'Code.exe');
  await writeFile(executable, '');
  const build = { executable, channel: definition.channel, revision: 'a'.repeat(40), version: 'Fixture build' };
  let outcome = 'mismatch';
  let execute = true;
  const tasks = [];
  const api = {
    inspectProcedure(options) {
      const binding = { article: definition.article,
        articleHash: hash(f.content), sourceRevision: 'fixture',
        storyboardId: definition.id, storyboardHash: hash(JSON.stringify(definition)),
        runnerHash: hash('fixture runner'), product: { revision: options.revision, channel: definition.channel } };
      return { binding, bindingHash: hash(JSON.stringify(binding)) };
    },
    reviewProcedure(options) {
      const inspected = api.inspectProcedure(options);
      assert.equal(options.bindingHash, inspected.bindingHash);
      const file = path.join(options.output, 'review.json');
      const review = { schemaVersion: 1, ...inspected, decision: 'reviewed', reviewedAt: now() };
      writeFileSync(file, JSON.stringify(review));
      return { file };
    },
    async replayProcedure(options) {
      const review = await readJson(options.review);
      const evidence = path.join(options.output, 'evidence.json');
      const failures = outcome === 'passed' ? [] : outcome === 'incomplete'
        ? [{ category: 'prerequisite', code: 'readiness-denied' }]
        : [{ category: 'mismatch', code: 'text-mismatch', phase: 'steps', step: 0, kind: 'assert', target: 'count',
          expected: { text: 'expected', match: 'equals' }, observed: { state: 'visible', matches: false } }];
      const result = { schemaVersion: 1, bindingHash: review.bindingHash,
        status: failures.length ? 'failed' : 'passed', steps: [], failures };
      await atomicJson(evidence, result);
      const report = replay.makeReport(review,
        { file: options.review, sha256: hash(await readFile(options.review)) },
        { file: evidence, sha256: hash(await readFile(evidence)) }, result);
      return { report };
    },
    assertReplayCurrent(report, options) {
      assert.equal(options.review, report.replay.review.file);
      const current = api.inspectProcedure({ revision: build.revision });
      if (current.bindingHash !== report.inputHash) throw new Error('Stale procedure review.');
      assert.equal(hash(readFileSync(options.review)), report.replay.review.sha256);
      assert.equal(hash(readFileSync(report.replay.evidence.file)), report.replay.evidence.sha256);
    }
  };
  f.content = await readFile(path.join(f.workspace, definition.article));
  const host = {
    ownerSessionId: f.session.sessionId,
    list: async () => tasks,
    find(list, run, description) {
      const found = list.find(item => run.agentId ? item.id === run.agentId : item.description === description);
      if (!found) throw new Error('Host task not found.');
      return found;
    },
    observation: task => ({ status: task.status, observedAt: now(), startedAt: task.startedAt }),
    async start(input) {
      const id = input.name.slice('replay-'.length);
      const task = { id: `agent-${id}`, type: 'agent', description: input.description, status: 'running', startedAt: now() };
      tasks.push(task);
      if (execute) {
        await runReplayRequest(await f.rawWorkflow.store.file(path.join('replay-runs', id, 'request.json')),
          { workspace: f.workspace, home: f.home, api });
        task.status = 'completed';
      }
      return { agentId: task.id };
    }
  };
  const controller = await createReplayWorkflow(f.rawWorkflow.store, host, { api, builds: async () => ({ builds: [build], errors: [] }) });
  const config = { storyboard: 'editor-find.json', executable, revision: build.revision };
  return { ...f, controller, config, tasks,
    beforeDispose(callback) { beforeDispose = callback; },
    async integrated() {
      const originalStart = f.session.rpc.tasks.startAgent;
      const originalList = f.session.rpc.tasks.list;
      f.session.rpc.tasks.startAgent = input => input.description.startsWith('Docs procedure replay ')
        ? host.start(input) : originalStart(input);
      f.session.rpc.tasks.list = async () => ({ tasks: [...(await originalList()).tasks, ...tasks] });
      return (await f.reopen({ replayOptions: { api, builds: async () => ({ builds: [build], errors: [] }) } })).raw;
    },
    setOutcome: value => { outcome = value; },
    hold: () => { execute = false; },
    changeSource: () => { f.content = Buffer.from('Changed fixture source'); },
    async launch() {
      const prepared = await controller.prepare(config);
      const run = await controller.launch({ ...config, bindingHash: prepared.bindingHash, confirmed: true });
      await controller.sync(tasks);
      return run;
    }
  };
}

test('replay launch is exact-review-bound and its coverage and decisions stay separate from checks', async t => {
  const f = await fixture(t);
  await f.launch();
  const first = await f.controller.snapshot();
  assert.equal(first.findings.length, 1);
  assert.equal(first.coverage[0].state, 'findings');
  assert.equal(first.coverage[0].check, 'replay');
  assert.equal(first.findings[0].finding.kind, 'replay');
  assert.deepEqual((await f.rawWorkflow.store.read()).coverage, []);
  const record = first.findings[0];
  await f.controller.triage({ findingId: record.finding.id, evidenceHash: record.evidenceHash,
    coverageToken: record.coverageToken, status: 'dismissed', reason: 'Synthetic decision.' });
  await f.launch();
  assert.equal((await f.controller.snapshot()).findings[0].finding.status, 'dismissed');
  const prepared = await f.controller.prepare(f.config);
  await assert.rejects(f.controller.launch({ ...f.config, bindingHash: prepared.bindingHash }), /Explicit procedure/);
  f.changeSource();
  await assert.rejects(f.controller.launch({ ...f.config, bindingHash: prepared.bindingHash, confirmed: true }), /reviewed procedure changed/);
  assert.equal((await f.controller.snapshot()).findings[0].freshness, 'stale');
});

test('passed replays retain unseen findings and reappearing fixed findings reopen automatically', async t => {
  const f = await fixture(t);
  await f.launch();
  await f.controller.snapshot();
  f.setOutcome('passed');
  await f.launch();
  const passed = await f.controller.snapshot();
  assert.equal(passed.coverage[0].state, 'clean');
  assert.equal(passed.findings[0].freshness, 'not-observed');
  const record = passed.findings[0];
  await f.controller.triage({ findingId: record.finding.id, evidenceHash: record.evidenceHash,
    coverageToken: record.coverageToken, status: 'fixed', reason: 'Verified passed procedure.' });
  f.setOutcome('incomplete');
  await f.launch();
  const incomplete = await f.controller.snapshot();
  assert.equal(incomplete.coverage[0].state, 'incomplete');
  assert.equal(incomplete.coverage[0].verification.report.replay.status, 'passed');
  assert.equal(incomplete.findings.find(item => item.finding.id === record.finding.id).freshness, 'not-observed');
  f.setOutcome('mismatch');
  await f.launch();
  const returned = await f.controller.snapshot();
  const reappeared = returned.findings.find(item => item.finding.id === record.finding.id);
  assert.equal(reappeared.finding.status, 'open');
  assert.equal(reappeared.history.at(-1).action, 'finding-reappeared');
});

test('a passed report does not become clean coverage before host completion is confirmed', async t => {
  const f = await fixture(t);
  f.setOutcome('passed');
  const prepared = await f.controller.prepare(f.config);
  await f.controller.launch({ ...f.config, bindingHash: prepared.bindingHash, confirmed: true });
  const pending = await f.controller.snapshot();
  assert.equal(pending.coverage[0].state, 'incomplete');
  assert.equal(pending.runs[0].result.state, 'unconfirmed');
  await f.controller.sync(f.tasks);
  assert.equal((await f.controller.snapshot()).coverage[0].state, 'clean');
});

test('incomplete replay is not clean coverage and tampered evidence cannot be reviewed', async t => {
  const f = await fixture(t);
  f.setOutcome('incomplete');
  const run = await f.launch();
  const result = await f.controller.snapshot();
  assert.equal(result.coverage[0].state, 'incomplete');
  assert.equal(result.findings[0].finding.severity, 'unverified');
  const file = await f.rawWorkflow.store.file(path.join('replay-runs', run.id, 'report.json'));
  const report = await readJson(file);
  report.replay.evidence.file = path.join(f.directory, 'outside-run.json');
  await atomicJson(file, report);
  const changed = await f.controller.snapshot();
  assert.equal(changed.findings[0].reviewable, false);
  await assert.rejects(f.controller.triage({ findingId: result.findings[0].finding.id,
    evidenceHash: result.findings[0].evidenceHash, coverageToken: result.findings[0].coverageToken,
    status: 'dismissed', reason: 'Must not save.' }), /unavailable/);
});

test('readiness requires a current request and an explicit human response', async t => {
  const f = await fixture(t);
  f.hold();
  const run = await f.launch();
  const directory = path.join(await replayOutputDirectory(f.rawWorkflow.store, run), 'procedure-replay-fixture', 'editor-find-fixture');
  await mkdir(directory, { recursive: true });
  const token = 'b'.repeat(64);
  await atomicJson(path.join(directory, 'readiness-request.json'), { schemaVersion: 1, token, workspace: f.workspace, expiresAt: Date.now() + 60_000 });
  assert.ok((await f.controller.snapshot()).runs[0].readiness);
  await assert.rejects(f.controller.ready({ id: run.id, ready: true }), /Explicit human/);
  await f.controller.ready({ id: run.id, ready: true, confirmed: true });
  assert.deepEqual(await readJson(path.join(directory, 'readiness-response.json')), { token, ready: true });
  await assert.rejects(f.controller.ready({ id: run.id, ready: true, confirmed: true }), /No current/);
});

test('new replay output supports nested capture directories without the long inbox prefix', async t => {
  const f = await fixture(t);
  f.hold();
  const run = await f.launch();
  const output = await replayOutputDirectory(f.rawWorkflow.store, run);
  assert.equal(output.startsWith(f.rawWorkflow.store.directory + path.sep), false);
  const replayDirectory = await mkdtemp(path.join(output, 'procedure-replay-'));
  const captureDirectory = await mkdtemp(path.join(replayDirectory, 'debug-create-configuration-'));
  assert.ok(captureDirectory.startsWith(output + path.sep));
});

test('canvas retains saved replay findings and recovery for existing runs without replay launch controls', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
  let server;
  let browser;
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server?.close(); } });
  const workflow = await f.integrated();
  server = await createWorkbenchServer(workflow, async () => {}, () => {}, { assetEntries: articleAssets });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  let releaseBootstrap;
  const bootstrap = new Promise(resolve => { releaseBootstrap = resolve; });
  await page.route('**/bootstrap', async route => { await bootstrap; await route.continue(); });
  const navigation = page.goto(server.url);
  try {
    await page.getByRole('button', { name: 'Run checks', exact: true }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Run checks', exact: true }).isDisabled(), true);
  } finally { releaseBootstrap(); }
  await navigation;
  await page.getByText('Ready. Choose articles or folders to check.', { exact: true }).waitFor();
  await page.locator('#scope').fill('docs/article.md');
  await page.getByRole('button', { name: 'Run checks', exact: true }).click();
  await page.locator('#finding-count').getByText('2 of 2', { exact: true }).waitFor();
  const before = (await f.rawWorkflow.store.read()).coverage;
  assert.equal(await page.locator('#task-type, #replay-form, #replay-start').count(), 0);
  await f.launch();
  await workflow.dispatch('refresh', {});
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await page.locator('#execution-indicator').getByText('Replay mismatch · 1 article(s)', { exact: true }).waitFor();
  assert.equal(f.tasks.length, 1);
  await page.getByLabel('Check type', { exact: true }).selectOption('replay');
  assert.equal(await page.locator('.finding').count(), 1);
  await page.locator('.finding .finding-toggle').click();
  await page.getByLabel('Decision', { exact: true }).selectOption('dismissed');
  await page.getByLabel('Reason', { exact: true }).fill('Synthetic replay review.');
  await page.getByRole('button', { name: 'Save decision', exact: true }).click();
  await page.getByText('Decision saved locally. Documentation and GitHub are unchanged.', { exact: true }).waitFor();
  assert.deepEqual((await f.rawWorkflow.store.read()).coverage, before);
  assert.equal((await f.rawWorkflow.store.read()).review.findings.some(record => record.finding.kind === 'replay'), false);
  f.hold();
  await f.launch();
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await page.locator('#execution-indicator').getByText('Host running · 1 article(s)', { exact: true }).waitFor();
  const run = (await f.controller.snapshot()).runs.at(-1);
  const directory = path.join(await replayOutputDirectory(f.rawWorkflow.store, run), 'procedure-replay-ui', 'editor-find-ui');
  await mkdir(directory, { recursive: true });
  await atomicJson(path.join(directory, 'readiness-request.json'), {
    schemaVersion: 1, token: 'c'.repeat(64), workspace: f.workspace, expiresAt: Date.now() + 60_000
  });
  await page.locator('#execution-details > summary').click();
  await page.getByRole('button', { name: "I'm ready", exact: true }).click();
  await page.getByText('Readiness sent. The reviewed procedure can continue.', { exact: true }).waitFor();
  assert.equal((await readJson(path.join(directory, 'readiness-response.json'))).ready, true);
  assert.deepEqual(errors, []);
});
