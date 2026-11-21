import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { mkdir, readFile, realpath, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createArticleFixture, resolveFixtureTemporaryRoot, resolveScreenshotRoot } from './article-fixture.mjs';
import { createProgressiveVerification, startVerificationWorker } from './article-verification.mjs';
import { inspectInbox } from './article-inbox.mjs';
import { runArticleCheck } from './article-runner.mjs';
import { articlePath, atomicJson, hash, readJson, within } from './article-storage.mjs';
import { loadRunArtifacts, rerunDecision, validateRunArtifacts } from './article-artifacts.mjs';
import { articleAssets, articleCanvasOptions } from './article-canvas.mjs';
import { createWorkbenchServer } from './server.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Tests read and mutate only their own disposable fixture directories. */

async function fixture(t, options) {
  const value = await createArticleFixture(options);
  t.after(() => value.dispose());
  const temporary = await realpath(tmpdir());
  assert.ok(within(temporary, value.directory));
  assert.notEqual(value.directory, temporary);
  assert.equal(within(fileURLToPath(new URL('../../../', import.meta.url)), value.directory), false);
  return value;
}
const refresh = f => f.workflow.dispatch('refresh', {});
const decide = (f, record, overrides = {}) => f.workflow.dispatch('triage', {
  findingId: record.finding.id, evidenceHash: record.evidenceHash, coverageToken: record.coverageToken,
  status: 'dismissed', reason: 'Reviewed fixture evidence.', ...overrides
});
const coverage = (state, article) => state.coverage.find(entry => entry.article === article);
const storedReview = async f => (await f.workflow.store.read()).review;

function heldVerification() {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let captured;
  const completed = new Promise(resolve => { captured = resolve; });
  let starts = 0;
  return {
    release, completed, get starts() { return starts; },
    launch(data, timeout) {
      const task = startVerificationWorker(data, timeout);
      if (data.action !== 'inbox') return task;
      starts++;
      return {
        done: task.done.then(async result => { captured(result); await gate; return result; }),
        async cancel() { release(); await task.cancel(); }
      };
    }
  };
}

test('verification workers require an explicit private home without using account defaults', async () => {
  const checkout = fileURLToPath(new URL('../../../', import.meta.url));
  const previous = process.env.COPILOT_HOME;
  process.env.COPILOT_HOME = checkout;
  try {
    const worker = startVerificationWorker({ workspace: checkout, action: 'inbox', state: { runs: [], coverage: [] } }, 5000);
    await assert.rejects(worker.done, /explicit absolute workspace and private-home/);
  } finally {
    if (previous === undefined) delete process.env.COPILOT_HOME;
    else process.env.COPILOT_HOME = previous;
  }
});

test('verification retries deferred ingestion only after host confirmation is available', async t => {
  const f = await fixture(t, { content: '`setting(deferred)`' });
  const run = await f.launch();
  await f.rawWorkflow.dispatch('sync', { id: run.id });
  let confirmed = false;
  let checks = 0;
  const verifier = createProgressiveVerification({
    store: f.rawWorkflow.store, check: f.check,
    mayIngest: () => confirmed, onMetrics: () => { checks++; }
  });
  try {
    const state = await f.rawWorkflow.store.read();
    const inspected = await inspectInbox(f.rawWorkflow.store, state);
    verifier.request(state, inspected);
    await verifier.whenSettled();
    assert.equal((await f.rawWorkflow.store.read()).coverage.length, 0);
    assert.equal(verifier.observed(run, inspected.get(run.id)).state, 'unconfirmed');
    verifier.request(state, inspected);
    await verifier.whenSettled();
    assert.equal(checks, 1, 'Pending confirmation must not cause repeated verification.');

    confirmed = true;
    verifier.request(state, inspected);
    await verifier.whenSettled();
    const accepted = await f.rawWorkflow.store.read();
    assert.equal(accepted.coverage.length, 1, 'Confirmation must release the deferred result even when its input signature is unchanged.');
    assert.equal(accepted.review.findings.length, 1);
    assert.equal(accepted.review.findings[0].history.length, 0);
    verifier.request(accepted, await inspectInbox(f.rawWorkflow.store, accepted));
    await verifier.whenSettled();
    assert.equal(checks, 2, 'Accepted results must not cause a retry loop.');
  } finally { await verifier.dispose(); }
});

test('progressive display coalesces opens and stays usable while verification cannot finish', { timeout: 20_000 }, async t => {
  const f = await fixture(t);
  await f.launch();
  const accepted = await refresh(f);
  const held = heldVerification();
  t.after(held.release);
  const opened = await f.reopen({ verificationWorker: held.launch });
  const raw = opened.raw;
  const initial = await raw.snapshot();
  assert.equal(initial.verification.state, 'checking');
  assert.equal(initial.checkedAt, null);
  assert.equal(initial.findings.length, accepted.findings.length);
  assert.ok(initial.findings.every(record => record.freshness === 'checking' && record.reviewable));
  assert.equal(coverage(initial, 'docs/article.md').state, 'checking');
  await Promise.all([raw.snapshot(), raw.dispatch('refresh', {}), raw.snapshot()]);
  assert.equal(held.starts, 1, 'Duplicate opens and refreshes share one bounded verification.');
  await held.completed;
  const server = await createWorkbenchServer(raw, async () => {}, () => {}, { assetEntries: articleAssets });
  t.after(() => server.close());
  const response = await (await fetch(`${server.url}/bootstrap`)).json();
  assert.equal(response.state.verification.state, 'checking', 'HTTP display must not wait for verification.');
  await raw.dispatch('triage', {
    findingId: accepted.findings[0].finding.id, evidenceHash: accepted.findings[0].evidenceHash,
    coverageToken: accepted.findings[0].coverageToken, status: 'dismissed', reason: 'Reviewed while the full check is pending.'
  });
  held.release();
  await raw.whenVerified();
  const verified = await raw.snapshot({ verify: false });
  const reviewed = verified.findings.find(record => record.finding.id === accepted.findings[0].finding.id);
  assert.equal(reviewed.finding.status, 'dismissed');
  assert.equal(reviewed.history.length, 1, 'Background completion must not replace a newer human decision.');
  assert.equal(verified.verification.state, 'complete');
  assert.ok(verified.findings.every(record => record.freshness === 'fresh'));
});

test('obsolete verification cannot overwrite newer coverage and a missing article stays scoped', { timeout: 20_000 }, async t => {
  const f = await fixture(t, { articles: { 'docs/other.md': '# Unrelated clean article' } });
  await f.launch(['docs']);
  await refresh(f);
  const held = heldVerification();
  t.after(held.release);
  const opened = await f.reopen({ verificationWorker: held.launch });
  await opened.raw.snapshot();
  await held.completed;
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Clean now');
  await f.launch(['docs/article.md']);
  const newer = await refresh(f);
  const expected = structuredClone((await f.workflow.store.read()).coverage);
  held.release();
  await opened.raw.whenVerified();
  const current = await opened.raw.snapshot({ verify: false });
  assert.deepEqual((await f.workflow.store.read()).coverage, expected);
  assert.equal(coverage(current, 'docs/article.md').verification.token, coverage(newer, 'docs/article.md').verification.token);
  assert.ok(current.findings.every(record => record.freshness === 'not-observed'));
  await rm(path.join(f.workspace, 'docs', 'article.md'));
  const missing = await opened.snapshot();
  assert.equal(coverage(missing, 'docs/article.md').state, 'stale');
  assert.equal(coverage(missing, 'docs/other.md').state, 'clean');
});

test('verification timeout and cancellation retain evidence and leave no state writer', { timeout: 20_000 }, async t => {
  const f = await fixture(t);
  await f.launch();
  const accepted = await refresh(f);
  const before = await f.workflow.store.read();
  const timed = await f.reopen({ verificationTimeout: 1 });
  await timed.raw.snapshot();
  await timed.raw.whenVerified();
  const failed = await timed.raw.snapshot({ verify: false });
  assert.equal(failed.verification.state, 'failed');
  assert.match(failed.verification.message, /timed out/);
  assert.equal(failed.findings.length, accepted.findings.length);
  await assert.rejects(decide({ workflow: timed.raw }, accepted.findings[0]), /timed out/);
  assert.deepEqual((await f.workflow.store.read()).review, before.review);
  await assert.rejects(readFile(await f.workflow.store.file('inbox.lock')), { code: 'ENOENT' });
  const held = heldVerification();
  t.after(held.release);
  const stopped = await f.reopen({ verificationWorker: held.launch });
  await stopped.raw.snapshot();
  await stopped.raw.dispatch('cancel-verification', {});
  const cancelled = await stopped.raw.snapshot({ verify: false });
  assert.equal(cancelled.verification.state, 'cancelled');
  assert.ok(cancelled.findings.every(record => record.freshness === 'unavailable'));
  assert.deepEqual((await f.workflow.store.read()).review, before.review);
  assert.equal(f.requests.length, 1, 'Local verification cancellation must not start or cancel host tasks.');
});

test('fixture isolation rejects checkout roots and non-private screenshots', async () => {
  const checkout = fileURLToPath(new URL('../../../', import.meta.url));
  await assert.rejects(resolveFixtureTemporaryRoot(checkout), /outside the checkout/);
  await assert.rejects(resolveFixtureTemporaryRoot(path.join(checkout, '.github')), /outside the checkout/);
  await assert.rejects(resolveScreenshotRoot(checkout), /outside the checkout/);
  await assert.rejects(resolveScreenshotRoot(path.dirname(checkout)), /outside the checkout/);
  await assert.rejects(resolveScreenshotRoot('relative-output'), /absolute private directory/);
  assert.equal(await resolveFixtureTemporaryRoot(), await realpath(tmpdir()));
});

test('extension registration uses the installed SDK definitions contract without an SDK install', () => {
  const moduleUrl = source => `data:text/javascript,${encodeURIComponent(source)}`;
  const sdk = moduleUrl(`
    import assert from 'node:assert/strict';
    const canvases = new WeakMap();
    export class CanvasError extends Error {}
    export function createCanvas(options) {
      assert.equal(typeof options.open, 'function');
      const canvas = Object.freeze({});
      canvases.set(canvas, options);
      return canvas;
    }
    export async function joinSession(config) {
      assert.ok(config.canvases && !Array.isArray(config.canvases));
      assert.ok(Array.isArray(config.canvases.definitions));
      assert.equal(globalThis.registrationOptions, undefined);
      globalThis.registrationOptions = config.canvases.definitions.map(canvas => {
        assert.ok(canvases.has(canvas));
        return canvases.get(canvas);
      });
      return Object.freeze({ sessionId: 'offline-registration-fixture' });
    }
  `);
  const resolver = `
    function resolve(specifier, context, nextResolve) {
      if (specifier === '@microsoft/copilot-sdk/extension') return { url: ${JSON.stringify(sdk)}, shortCircuit: true };
      if (specifier.includes('copilot-sdk')) throw new Error('Unsupported SDK import: ' + specifier);
      return nextResolve(specifier, context);
    }
  `;
  const loader = moduleUrl(`export ${resolver}`);
  const script = `
    import assert from 'node:assert/strict';
    import { readFile } from 'node:fs/promises';
    import * as nodeModule from 'node:module';
    if (typeof nodeModule.registerHooks === 'function') nodeModule.registerHooks({ resolve: ${resolver} });
    else nodeModule.register(${JSON.stringify(loader)});
    await import(${JSON.stringify(new URL('./extension.mjs', import.meta.url).href)});
    const manifest = JSON.parse(await readFile(new URL(${JSON.stringify(new URL('./extension.json', import.meta.url).href)}), 'utf8'));
    const declarations = globalThis.registrationOptions.map(({ open, onClose, actions, ...declaration }) => ({
      ...declaration,
      actions: actions.map(({ handler, ...action }) => { assert.equal(typeof handler, 'function'); return action; })
    }));
    assert.deepEqual(declarations, manifest.canvases);
    process.stdout.write('Offline SDK registration verified.');
  `;
  assert.equal(execFileSync(process.execPath, ['--input-type=module', '--eval', script], {
    encoding: 'utf8', timeout: 15_000, windowsHide: true,
    env: { ...process.env, NODE_OPTIONS: '', NODE_DISABLE_COMPILE_CACHE: '1' }
  }), 'Offline SDK registration verified.');
});

test('fresh results enter the inbox automatically, but unobserved host completion never imports or decides', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  assert.equal(run.launch, 'acknowledged');
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].agentType, 'task');
  assert.match(f.requests[0].prompt, /article-runner\.mjs/);
  assert.doesNotMatch(f.requests[0].prompt, /fixture\.setting|missing\.md/);
  assert.deepEqual((await f.workflow.snapshot()).findings, []);
  const state = await refresh(f);
  assert.equal(state.findings.length, 2);
  assert.equal(state.runs[0].result.state, 'valid');
  assert.equal(state.runs[0].completion.outcome, 'report');
  assert.equal(state.runs[0].observation.status, 'completed');
  assert.equal(state.runs[0].activity.recentActivity.length, 1);
  assert.ok(state.findings.some(record => record.finding.severity === 'error'));
  assert.ok(state.findings.some(record => record.finding.severity === 'unverified'));
  assert.ok(state.findings.every(record => record.freshness === 'fresh' && record.reviewable && !record.history.length));
  assert.equal(coverage(state, 'docs/article.md').state, 'findings');
  const inspected = await f.workflow.dispatch('inspect', { id: run.id });
  assert.equal(inspected.checkerExitCode, 1, 'Valid error findings are not infrastructure errors.');
  await assert.rejects(f.workflow.dispatch('import', { id: run.id }), /Unknown article action/);
  const reopened = await f.reopen();
  assert.equal((await reopened.snapshot()).findings.length, 2);
  assert.equal((await reopened.snapshot()).runs[0].activity, undefined);
  assert.ok((await storedReview(f)).findings.every(record => !record.history.length));
});

test('batches resolve overlapping folders and articles exactly once in one bounded task', async t => {
  const f = await fixture(t, { articles: {
    'docs/group/one.md': '`setting(one)`', 'docs/group/two.md': '# Clean',
    'api/other.md': '`setting(other)`', 'remote/unscanned.md': '# Never checked'
  } });
  const run = await f.launch(['docs/group', 'api/other.md', 'docs/group/one.md']);
  assert.deepEqual(run.articles, ['api/other.md', 'docs/group/one.md', 'docs/group/two.md']);
  assert.equal(f.requests.length, 1);
  const state = await refresh(f);
  assert.equal(state.findings.length, 2);
  assert.equal(coverage(state, 'docs/group/two.md').state, 'clean');
  assert.equal(coverage(state, 'docs/group/one.md').state, 'findings');
  assert.equal(coverage(state, 'docs/article.md').state, 'never-checked');
  assert.equal(coverage(state, 'remote/unscanned.md').state, 'never-checked');
  await f.launch(['docs/article.md']);
  const merged = await refresh(f);
  assert.equal(merged.findings.length, 4);
  assert.equal(coverage(merged, 'docs/group/two.md').verification.runId, run.id);
  assert.ok(merged.findings.every(record => record.freshness === 'fresh'));
});

test('folders are resolved at launch and do not silently include subsequently added articles', async t => {
  const f = await fixture(t, { execute: false });
  const run = await f.launch(['docs']);
  await writeFile(path.join(f.workspace, 'docs', 'later.md'), '`setting(later)`');
  await runArticleCheck(await f.workflow.store.artifact(run.id, 'request.json'), f);
  f.tracked[0].status = 'idle';
  const state = await refresh(f);
  assert.equal(coverage(state, 'docs/later.md').state, 'never-checked');
  assert.deepEqual(state.runs[0].articles, ['docs/article.md']);
});

test('deduplication retains decisions for unchanged evidence and reopens changed evidence', async t => {
  const f = await fixture(t, { content: '`setting(stable)`' });
  await f.launch();
  const record = (await refresh(f)).findings[0];
  await assert.rejects(decide(f, record, { reason: ' ' }), /reason/);
  await assert.rejects(decide(f, record, { evidenceHash: '0'.repeat(64) }), /evidence changed/);
  await assert.rejects(decide(f, record, { coverageToken: '0'.repeat(64) }), /Verification changed/);
  await decide(f, record);
  await f.launch();
  let state = await refresh(f);
  assert.equal(state.findings.length, 1);
  assert.equal(state.findings[0].finding.status, 'dismissed');
  assert.equal(state.findings[0].history.length, 1);
  assert.equal(state.findings[0].evidenceHash, record.evidenceHash);
  await assert.rejects(decide(f, record), /Verification changed/);
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# New wording\n\n`setting(stable)`');
  await assert.rejects(decide(f, state.findings[0]), /stale evidence/);
  await f.launch();
  state = await refresh(f);
  assert.equal(state.findings.length, 1);
  assert.equal(state.findings[0].finding.status, 'open');
  assert.equal(state.findings[0].history.at(-1).action, 'evidence-changed');
  assert.notEqual(state.findings[0].evidenceHash, record.evidenceHash);
});

test('unseen findings survive clean scans without automatic fixes and permit an explicit current decision', async t => {
  const f = await fixture(t, { content: '`setting(removed)`', articles: { 'docs/other.md': '# Unrelated' } });
  await f.launch(['docs']);
  const first = await refresh(f);
  await decide(f, first.findings[0]);
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Now clean');
  const stale = await f.workflow.snapshot();
  assert.equal(coverage(stale, 'docs/article.md').state, 'stale');
  assert.equal(coverage(stale, 'docs/other.md').state, 'clean', 'Editing one batch article must not stale another.');
  await f.launch();
  const clean = await refresh(f);
  assert.equal(coverage(clean, 'docs/article.md').state, 'clean');
  assert.equal(coverage(clean, 'docs/article.md').retained, 1);
  assert.equal(clean.findings[0].freshness, 'not-observed');
  assert.equal(clean.findings[0].finding.status, 'dismissed');
  assert.equal(clean.findings[0].history.length, 1);
  await decide(f, clean.findings[0], { status: 'fixed', reason: 'Confirmed removal in the latest applicable scan.' });
  assert.equal((await storedReview(f)).findings[0].finding.status, 'fixed');
});

test('identical findings that reappear after verified absence reopen fixed decisions but retain dismissals', async t => {
  const content = '`setting(regression)`\n\n`setting(false.positive)`';
  const f = await fixture(t, { content });
  await f.launch();
  const original = (await refresh(f)).findings.find(record => record.finding.evidence === 'setting(regression)');
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Clean');
  await f.launch();
  const clean = await refresh(f);
  for (const record of clean.findings) {
    assert.equal(record.freshness, 'not-observed');
    await decide(f, record, { status: record.finding.id === original.finding.id ? 'fixed' : 'dismissed' });
  }
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), content);
  await f.launch();
  const restored = await refresh(f);
  const regression = restored.findings.find(record => record.finding.id === original.finding.id);
  const dismissal = restored.findings.find(record => record !== regression);
  assert.equal(regression.freshness, 'fresh');
  assert.equal(regression.evidenceHash, original.evidenceHash);
  assert.equal(regression.finding.status, 'open');
  assert.equal(regression.history.at(-1).action, 'finding-reappeared');
  assert.equal(regression.history.at(-1).from, 'fixed');
  const absence = (await storedReview(f)).reports.find(report => report.id === regression.history.at(-1).absenceReportId);
  assert.deepEqual(absence.report, coverage(clean, 'docs/article.md').verification.report);
  assert.equal(dismissal.finding.status, 'dismissed');
  assert.equal(dismissal.history.length, 1);
  const reopened = await f.reopen();
  assert.equal((await reopened.snapshot()).findings.find(record => record.finding.id === original.finding.id).history.length, 2);
  await f.launch();
  const repeated = await refresh(f);
  assert.equal(repeated.findings.find(record => record.finding.id === original.finding.id).history.length, 2);
  assert.equal(repeated.findings.find(record => record.finding.id === dismissal.finding.id).finding.status, 'dismissed');
});

test('coverage preserves last success and unrelated scopes after failed, partial, missing, and stale attempts', async t => {
  const f = await fixture(t, { content: '# Clean', articles: { 'docs/other.md': '# Other' } });
  await f.launch(['docs']);
  const initial = await refresh(f);
  const first = coverage(initial, 'docs/article.md').verification;
  f.session.rpc.tasks.startAgent = async request => {
    f.requests.push(request);
    const id = request.description.slice('Docs article check '.length);
    f.tracked.push({ id: `agent-${id}`, description: request.description, type: 'agent', status: 'idle', startedAt: new Date().toISOString() });
    return { agentId: `agent-${id}` };
  };
  const failed = await f.launch();
  await assert.rejects(runArticleCheck(await f.workflow.store.artifact(failed.id, 'request.json'), {
    ...f, check() { throw new Error('Synthetic checker failure'); }
  }), /Synthetic checker failure/);
  let state = await refresh(f);
  assert.equal(coverage(state, 'docs/article.md').state, 'incomplete');
  assert.equal(coverage(state, 'docs/article.md').attempt.state, 'execution-failed');
  assert.equal(coverage(state, 'docs/article.md').verification.runId, first.runId);
  assert.equal(coverage(state, 'docs/article.md').verification.freshness, 'fresh');
  assert.equal(coverage(state, 'docs/other.md').state, 'clean');
  const partial = await f.launch(['docs']);
  await runArticleCheck(await f.workflow.store.artifact(partial.id, 'request.json'), f);
  const reportFile = await f.workflow.store.artifact(partial.id, 'report.json');
  const receiptFile = await f.workflow.store.artifact(partial.id, 'receipt.json');
  const bundle = await readJson(reportFile);
  bundle.reports.pop();
  await atomicJson(reportFile, bundle);
  const receipt = await readJson(receiptFile);
  await atomicJson(receiptFile, { ...receipt, reportHash: hash(await readFile(reportFile)) });
  state = await refresh(f);
  assert.equal(coverage(state, 'docs/article.md').attempt.state, 'invalid');
  assert.equal(coverage(state, 'docs/other.md').verification.runId, first.runId);
  await assert.rejects(f.launch(), /runner completion is unverified/);
  await rm(receiptFile);
  f.tracked.at(-1).status = 'completed';
  state = await refresh(f);
  assert.equal(coverage(state, 'docs/article.md').attempt.state, 'missing');
  assert.equal(state.findings.length, 0);
  await assert.rejects(f.launch(), /runner completion is unverified/, 'Completed host alone cannot unlock an unverified attempt.');
});

test('batch ingestion is atomic when an article changes before results are collected', async t => {
  const f = await fixture(t, { content: '`setting(one)`', articles: { 'docs/other.md': '`setting(two)`' } });
  await f.launch(['docs']);
  await writeFile(path.join(f.workspace, 'docs', 'other.md'), '# Changed after checking');
  const state = await refresh(f);
  assert.deepEqual(state.findings, []);
  assert.ok(state.coverage.every(entry => entry.state === 'incomplete'));
  assert.equal(state.runs[0].result.state, 'stale');
  assert.equal(state.runs[0].rerun.allowed, true, 'Stale evidence must not prevent a new scan.');
});

test('freshness covers link dependencies and verification failures without making unrelated coverage stale', async t => {
  const f = await fixture(t, { articles: { 'docs/other.md': '# Other' } });
  await f.launch(['docs']);
  await refresh(f);
  await writeFile(path.join(f.workspace, 'docs', 'missing.md'), '# Target now exists');
  const state = await f.workflow.snapshot();
  assert.equal(coverage(state, 'docs/article.md').state, 'stale');
  assert.equal(coverage(state, 'docs/other.md').state, 'clean');
  assert.equal(coverage(state, 'docs/missing.md').state, 'never-checked');
  const unavailable = await f.reopen({ check() { throw new Error('Verification unavailable'); } });
  const failed = await unavailable.snapshot();
  assert.equal(coverage(failed, 'docs/other.md').state, 'unavailable');
  assert.equal(coverage(failed, 'docs/other.md').verification.freshness, 'unavailable');
  assert.equal(failed.findings.length, state.findings.length);
});

test('matching fingerprints cannot hide removed or changed checker observations', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  const reportFile = await f.workflow.store.artifact(run.id, 'report.json');
  const receiptFile = await f.workflow.store.artifact(run.id, 'receipt.json');
  const bundle = await readJson(reportFile);
  bundle.reports[0].findings = [];
  await atomicJson(reportFile, bundle);
  const receipt = await readJson(receiptFile);
  await atomicJson(receiptFile, { ...receipt, checkerExitCode: 0, reportHash: hash(await readFile(reportFile)) });
  const state = await refresh(f);
  assert.equal(state.runs[0].result.state, 'stale');
  assert.match(state.runs[0].result.message, /observations changed/);
  assert.equal(coverage(state, 'docs/article.md').state, 'incomplete');
  assert.deepEqual(state.findings, []);
});

test('reruns recheck actual host state and reject overlapping batches but allow disjoint scopes', async t => {
  const f = await fixture(t, { articles: { 'api/other.md': '# Other' } });
  await f.launch();
  f.tracked[0].status = 'idle';
  await refresh(f);
  f.tracked[0].status = 'running';
  const calls = f.listCalls;
  await assert.rejects(f.launch(['docs']), /owning task is running/);
  assert.ok(f.listCalls > calls);
  await f.launch(['api']);
  assert.equal(f.requests.length, 2);
  f.tracked[0].status = 'idle';
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Stale old report');
  const noFreshness = await f.reopen({ check() { throw new Error('Eligibility must not check freshness'); } });
  assert.equal((await noFreshness.dispatch('launch', { scope: ['docs'], confirmed: true })).launch, 'acknowledged');
  assert.equal(f.requests.length, 3);
  assert.equal(f.tracked[0].status, 'idle');
});

test('validated historical batches can run again after their host task disappears without losing findings', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  const first = await refresh(f);
  await decide(f, first.findings[0], { status: 'dismissed' });
  f.tracked.length = 0;
  const reloaded = await f.reopen();
  const state = await reloaded.dispatch('refresh', {});
  const historical = state.runs.find(item => item.id === run.id);
  assert.equal(historical.hostMissing, true);
  assert.equal(historical.syncError, '');
  assert.equal(historical.rerun.allowed, true);
  assert.equal(state.findings[0].finding.status, 'dismissed');
  const next = await reloaded.dispatch('launch', { scope: ['docs'], confirmed: true });
  assert.equal(next.launch, 'acknowledged');
  const after = await reloaded.dispatch('refresh', {});
  assert.equal(after.findings.length, first.findings.length);
  assert.equal(after.findings.find(item => item.finding.id === first.findings[0].finding.id).finding.status, 'dismissed');
});

test('missing tasks do not release batches with unverified receipts or no stopped-host observation', async t => {
  const unobserved = await fixture(t);
  await unobserved.launch();
  unobserved.tracked.length = 0;
  const pending = await refresh(unobserved);
  assert.equal(pending.runs[0].rerun.allowed, false);
  await assert.rejects(unobserved.launch(), /no verified completion and stopped-host record/);
  assert.equal(unobserved.requests.length, 1);

  const tampered = await fixture(t);
  const run = await tampered.launch();
  await refresh(tampered);
  tampered.tracked.length = 0;
  await writeFile(await tampered.workflow.store.artifact(run.id, 'receipt.json'), '{}');
  await assert.rejects(tampered.launch(), /no verified completion and stopped-host record/);
  assert.equal(tampered.requests.length, 1);
});

test('artifact validation binds complete batches, scope, hashes, ownership, timing and failed receipts', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  const request = await readJson(await f.workflow.store.artifact(run.id, 'request.json'));
  const receipt = await readJson(await f.workflow.store.artifact(run.id, 'receipt.json'));
  const reportBytes = await readFile(await f.workflow.store.artifact(run.id, 'report.json'));
  const artifacts = { workspace: f.workspace, run, request, receipt, reportBytes };
  assert.equal(validateRunArtifacts(artifacts).checkerExitCode, 1);
  for (const change of [
    { receipt: undefined }, { receipt: { ...receipt, ownerSessionId: 'other' } },
    { request: { ...request, scope: ['api'] } },
    { request: { ...request, articles: [{ path: 'docs/article.md', sha256: '0'.repeat(64) }] } },
    { receipt: { ...receipt, reportHash: '0'.repeat(64) } },
    { receipt: { ...receipt, finishedAt: '2020-01-01T00:00:00.000Z' } },
    { reportBytes: Buffer.from('{}') }
  ]) assert.throws(() => validateRunArtifacts({ ...artifacts, ...change }));
  const finished = { state: 'finished', outcome: 'report' };
  for (const status of ['idle', 'completed', 'failed', 'cancelled']) {
    assert.equal(rerunDecision(run, 'fixture-owner', status, finished).allowed, true);
    assert.equal(rerunDecision(run, 'fixture-owner', status, { state: 'unverified' }).allowed, false);
  }
  assert.equal(rerunDecision(run, 'fixture-owner', 'running', finished).allowed, false);
  assert.equal(rerunDecision(run, 'foreign', 'idle', finished).allowed, false);
  const failed = { ...receipt, outcome: 'execution-failed', error: 'Checker failure' };
  delete failed.reportHash; delete failed.checkerExitCode;
  assert.equal(validateRunArtifacts({ ...artifacts, receipt: failed }).receipt.outcome, 'execution-failed');
  assert.throws(() => validateRunArtifacts({ ...artifacts, receipt: { ...failed, error: ' ' } }));
  assert.throws(() => validateRunArtifacts({ ...artifacts, receipt: { ...failed, reportHash: receipt.reportHash } }));
});

test('tampered ingested artifacts disable review and overlapping execution without removing findings', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  const first = await refresh(f);
  const reportFile = await f.workflow.store.artifact(run.id, 'report.json');
  await writeFile(reportFile, '{}');
  const state = await refresh(f);
  assert.equal(state.findings.length, first.findings.length);
  assert.ok(state.findings.every(record => record.freshness === 'unavailable' && !record.reviewable));
  await assert.rejects(decide(f, first.findings[0]), /unavailable evidence/);
  await assert.rejects(f.launch(), /runner completion is unverified/);
});

test('accepted evidence remains reviewable after host lookup loss or later host status changes', async t => {
  const f = await fixture(t, { content: '`setting(observed)`' });
  const run = await f.launch();
  await f.workflow.dispatch('sync', { id: run.id });
  const original = (await f.workflow.snapshot()).findings[0];
  await decide(f, original, { status: 'accepted' });
  const list = f.session.rpc.tasks.list;
  f.session.rpc.tasks.list = async () => { throw new Error('Host lookup unavailable'); };
  await f.workflow.dispatch('sync', { id: run.id });
  let state = await f.workflow.snapshot();
  assert.equal(state.findings[0].finding.status, 'accepted');
  assert.equal(state.findings[0].freshness, 'fresh');
  assert.equal(state.findings[0].reviewable, true);
  assert.equal(coverage(state, 'docs/article.md').state, 'findings');
  assert.match(state.runs[0].syncError, /Host lookup unavailable/);
  assert.equal(state.runs[0].rerun.allowed, false);
  await decide(f, state.findings[0], { status: 'dismissed' });
  await assert.rejects(f.launch(), /Host lookup unavailable/);
  f.session.rpc.tasks.list = list;
  for (const status of ['running', 'failed', 'cancelled']) {
    f.tracked[0].status = status;
    state = await refresh(f);
    assert.equal(state.findings[0].freshness, 'fresh');
    assert.equal(state.findings[0].reviewable, true);
    assert.equal(state.findings[0].finding.status, 'dismissed');
    assert.equal(coverage(state, 'docs/article.md').state, 'findings');
    if (status === 'running') await assert.rejects(f.launch(), /owning task is running/);
  }
  const unconfirmed = await fixture(t);
  const pending = await unconfirmed.launch();
  unconfirmed.session.rpc.tasks.list = async () => { throw new Error('Host lookup unavailable'); };
  await unconfirmed.workflow.dispatch('sync', { id: pending.id });
  assert.deepEqual((await unconfirmed.workflow.snapshot()).findings, [], 'Initial ingestion still needs host confirmation.');
});

test('review during host outages still rejects tampered artifacts, mismatched ingestion hashes and stale source', async t => {
  const f = await fixture(t, { content: '`setting(observed)`' });
  const run = await f.launch();
  const record = (await refresh(f)).findings[0];
  f.session.rpc.tasks.list = async () => { throw new Error('Host lookup unavailable'); };
  await f.workflow.dispatch('sync', { id: run.id });
  const reportFile = await f.workflow.store.artifact(run.id, 'report.json');
  const receiptFile = await f.workflow.store.artifact(run.id, 'receipt.json');
  const savedReport = await readFile(reportFile);
  const savedReceipt = await readFile(receiptFile);
  const receipt = JSON.parse(savedReceipt);
  const changedBundle = JSON.parse(savedReport);
  changedBundle.reports[0].findings[0].message = 'Changed observation.';
  const changedBytes = Buffer.from(JSON.stringify(changedBundle));
  for (const mutate of [
    () => writeFile(reportFile, '{}'),
    () => atomicJson(receiptFile, { ...receipt, ownerSessionId: 'other-owner' }),
    async () => {
      await writeFile(reportFile, changedBytes);
      await atomicJson(receiptFile, { ...receipt, reportHash: hash(changedBytes) });
    }
  ]) {
    await mutate();
    const state = await f.workflow.snapshot();
    assert.equal(state.findings[0].freshness, 'unavailable');
    assert.equal(state.findings[0].reviewable, false);
    await assert.rejects(decide(f, record), /unavailable evidence/);
    await writeFile(reportFile, savedReport);
    await writeFile(receiptFile, savedReceipt);
  }
  assert.equal((await f.workflow.snapshot()).findings[0].freshness, 'fresh');
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Source changed');
  assert.equal((await f.workflow.snapshot()).findings[0].freshness, 'stale');
  await assert.rejects(decide(f, record), /stale evidence/);
  assert.deepEqual((await storedReview(f)).findings[0].history, []);
});

test('lost and timed-out acknowledgements block overlaps and reconcile exact owning host identity', async t => {
  for (const acknowledgement of ['lost', 'timeout']) {
    const f = await fixture(t, { acknowledgement });
    const run = await f.launch();
    assert.equal(run.launch, 'uncertain');
    assert.deepEqual((await f.workflow.snapshot()).findings, []);
    await assert.rejects(f.launch(['docs']), /active or unconfirmed/);
    assert.equal(f.requests.length, 1);
    await assert.rejects(f.workflow.dispatch('resolve-uncertain', { id: run.id, confirmed: true }), /matching host task/);
    const state = await refresh(f);
    assert.equal(state.runs[0].launch, 'acknowledged');
    assert.equal(state.runs[0].agentId, f.tracked[0].id);
    assert.equal(state.findings.length, 2);
  }
});

test('only explicit owning-session confirmation clears an unstarted launch; missing host metadata is not proof', async t => {
  const f = await fixture(t, { execute: false, acknowledgement: 'lost' });
  const run = await f.launch();
  f.tracked.length = 0;
  await refresh(f);
  await assert.rejects(f.workflow.dispatch('resolve-uncertain', { id: run.id }), /Confirm/);
  await f.workflow.dispatch('resolve-uncertain', { id: run.id, confirmed: true });
  const state = await f.workflow.snapshot();
  assert.equal(state.runs[0].launch, 'not-started');
  assert.equal(coverage(state, 'docs/article.md').state, 'never-checked');
  assert.deepEqual(state.findings, []);
});

test('another session can start new report-only work after verified historical completion but cannot recover old tasks', async t => {
  const f = await fixture(t);
  const run = await f.launch();
  await refresh(f);
  const other = await f.reopen({ session: { ...f.session, sessionId: 'other-session' } });
  const calls = f.listCalls;
  const state = await other.snapshot();
  assert.equal(state.findings.length, 2);
  assert.equal(state.runs[0].ownerMatches, false);
  await assert.rejects(other.dispatch('sync', { id: run.id }), /original owning session/);
  assert.equal(f.listCalls, calls);
  f.tracked.length = 0;
  const next = await other.dispatch('launch', { scope: ['docs'], confirmed: true });
  assert.equal(next.ownerSessionId, 'other-session');
  assert.equal(next.launch, 'acknowledged');
  const after = await other.dispatch('refresh', {});
  assert.equal(after.findings.length, state.findings.length);
  assert.equal(after.runs.find(item => item.id === run.id).ownerSessionId, 'fixture-owner');

  const pending = await fixture(t, { execute: false });
  await pending.launch();
  const foreign = await pending.reopen({ session: { ...pending.session, sessionId: 'other-session' } });
  await assert.rejects(foreign.dispatch('launch', { scope: ['docs'], confirmed: true }), /owning session/);
  assert.equal(pending.requests.length, 1);
});

test('safe scope selection and owned artifacts reject traversal, arbitrary files, junctions and malformed requests', async t => {
  const f = await fixture(t, { execute: false });
  for (const value of ['../docs/article.md', 'C:\\private.md', '/docs/article.md', 'docs\\article.md',
    'docs/a/../article.md', 'docs/a.md:stream', 'docs/nul.md', 'docs/a.md;whoami', 'DOCS-AGENT-WORKFLOW.md', '.']) {
    assert.throws(() => articlePath(value));
    await assert.rejects(f.launch([value]));
  }
  await assert.rejects(f.launch([]));
  await assert.rejects(f.workflow.dispatch('launch', { scope: ['docs'] }), /Confirm/);
  assert.equal(f.requests.length, 0);
  const target = path.join(f.directory, 'outside');
  await mkdir(target);
  await symlink(target, path.join(f.workspace, 'docs', 'junction'), process.platform === 'win32' ? 'junction' : 'dir');
  await writeFile(path.join(target, 'private.md'), '# Not owned');
  await assert.rejects(f.launch(['docs/junction']), /Symlink or junction/);
  assert.ok(!(await f.workflow.snapshot()).articles.includes('docs/junction/private.md'));
  const run = await f.launch();
  await assert.rejects(f.workflow.dispatch('inspect', { id: '../another/report.json' }), /Unknown article run/);
  const runDirectory = path.dirname(await f.workflow.store.artifact(run.id, 'request.json'));
  await rm(runDirectory, { recursive: true });
  await symlink(target, runDirectory, process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal((await f.workflow.dispatch('inspect', { id: run.id })).state, 'invalid');
});

test('new versioned state never reads or overwrites old prototype records and rejects corrupt state and locks', async t => {
  const f = await fixture(t);
  const legacy = path.join(path.dirname(f.workflow.store.directory), 'runs.json');
  await writeFile(legacy, '{"private":"previous prototype sentinel"}');
  assert.deepEqual((await f.workflow.snapshot()).findings, []);
  await f.launch();
  await refresh(f);
  assert.equal(await readFile(legacy, 'utf8'), '{"private":"previous prototype sentinel"}');
  const lock = await f.workflow.store.file('inbox.lock');
  await writeFile(lock, 'active');
  await assert.rejects(f.workflow.store.update(() => {}), /busy/);
  await rm(lock);
  for (const corrupt of ['{"format":"another-format"}', 'null']) {
    await writeFile(f.workflow.store.stateFile, corrupt);
    await assert.rejects(f.workflow.snapshot(), /corrupt article state/);
    assert.equal(await readFile(f.workflow.store.stateFile, 'utf8'), corrupt);
  }
});

test('runner refuses repeat execution and changed launch inputs, including clean article hashes', async t => {
  const f = await fixture(t, { execute: false, content: '# Clean' });
  const run = await f.launch();
  await writeFile(path.join(f.workspace, 'docs', 'article.md'), '# Changed');
  const request = await f.workflow.store.artifact(run.id, 'request.json');
  await assert.rejects(runArticleCheck(request, f), /changed after launch/);
  const receiptFile = await f.workflow.store.artifact(run.id, 'receipt.json');
  const original = await readFile(receiptFile, 'utf8');
  await assert.rejects(runArticleCheck(request, f), /already has a receipt/);
  assert.equal(await readFile(receiptFile, 'utf8'), original);
  assert.equal((await loadRunArtifacts(f.workflow.store, run)).receipt.outcome, 'execution-failed');
});

test('missing host API, failed preflight and lost progress never fabricate successful verification', async t => {
  const f = await fixture(t, { execute: false });
  const unavailable = await f.reopen({ session: { sessionId: 'fixture-owner' } });
  assert.equal((await unavailable.snapshot()).hostAvailable, false);
  await assert.rejects(unavailable.dispatch('launch', { scope: ['docs'], confirmed: true }), /does not expose/);
  const list = f.session.rpc.tasks.list;
  f.session.rpc.tasks.list = async () => { throw new Error('Synthetic host lookup failure'); };
  await assert.rejects(f.launch(), /lookup failure/);
  assert.deepEqual((await f.workflow.snapshot()).runs, []);
  f.session.rpc.tasks.list = list;
  await f.launch();
  f.tracked[0].status = 'idle';
  f.session.rpc.tasks.getProgress = async () => { throw new Error('Progress unavailable'); };
  const state = await refresh(f);
  assert.equal(state.runs[0].observation.status, 'idle');
  assert.match(state.runs[0].activity.error, /Progress unavailable/);
  assert.deepEqual(state.findings, []);
  assert.equal(coverage(state, 'docs/article.md').state, 'incomplete');
});

test('real UI endpoints protect actions and canvas reopen retains the inbox without launching', async t => {
  const f = await fixture(t);
  const server = await createWorkbenchServer(f.workflow, async () => {}, () => {}, { assetEntries: articleAssets });
  t.after(() => server.close());
  const response = await fetch(server.url);
  const html = await response.text();
  assert.match(html, /Findings inbox/);
  assert.doesNotMatch(html, /Recent runs|Enable local review/);
  assert.match(response.headers.get('content-security-policy'), /connect-src 'self'/);
  assert.equal((await fetch(`${server.url}/article-app.mjs`)).status, 200);
  assert.equal((await fetch(`${server.url}/app.mjs`)).status, 404);
  const { token } = await (await fetch(`${server.url}/bootstrap`)).json();
  const send = (action, input, origin = server.url) => fetch(`${server.url}/action`, {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'X-Workbench-Token': token },
    body: JSON.stringify({ action, input })
  });
  assert.equal((await send('launch', { scope: ['docs'], confirmed: true }, 'https://foreign.example')).status, 403);
  assert.equal((await send('shell', { command: 'anything' })).status, 400);
  assert.equal((await send('launch', { scope: ['docs'], confirmed: true })).status, 200);
  await refresh(f);
  const options = articleCanvasOptions({
    getSession: () => ({ ...f.session, log: async () => {} }), CanvasError: Error, createWorkflow: async () => f.workflow
  });
  t.after(() => options.onClose({ instanceId: 'fixture-panel' }));
  const [first, second] = await Promise.all([
    options.open({ instanceId: 'fixture-panel' }), options.open({ instanceId: 'fixture-panel' })
  ]);
  assert.equal(first.url, second.url);
  assert.equal((await options.open({ instanceId: 'fixture-panel' })).url, first.url);
  const state = await options.actions[0].handler();
  assert.equal(state.findings.length, 2);
  assert.equal((await options.actions[1].handler({ input: { id: state.runs[0].id } })).state, 'valid');
  assert.equal(f.requests.length, 1);
});
