import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdir, mkdtemp, readFile, realpath, rm, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import claims from '../../../build/check-claims.js';
import audit from '../../../build/audit-state.js';
import auditFindings from '../../../build/audit-findings.js';
import { createArticleWorkflow } from './article-workflow.mjs';
import { runArticleCheck } from './article-runner.mjs';
import { coverageToken, inspectExecution } from './article-inbox.mjs';
import { loadRunArtifacts } from './article-artifacts.mjs';
import { atomicJson, createArticleStore, format, hash, now, ownedPath, resolveScope, version, within } from './article-storage.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- The coordinator explicitly selects an OS-temp parent; all writes use a newly owned, guarded child, never repository articles or existing private stores. */
/* eslint-disable security/detect-child-process -- Workers execute this trusted module with argv arrays; timeout cleanup targets only the PID of a worker created here and its descendants. */

const script = fileURLToPath(import.meta.url);
const cleanupScript = fileURLToPath(new URL('./article-scale-processes.ps1', import.meta.url));
const workspace = await realpath(fileURLToPath(new URL('../../../', import.meta.url)));
const owner = 'docs-article-scale-synthetic-owner';
const marker = 'vscode-docs-article-scale-v1';
const scopes = [['docs/agents'], ['docs', 'api', 'remote', 'release-notes']];
const budgets = {
  combinedCheckMs: 60_000, executionMs: 60_000, ingestionMs: 60_000,
  launchPreparationMs: 5000, pendingSnapshotMs: 1000, coldSnapshotMs: 1000,
  repeatSnapshotMs: 1000, refreshMs: 1000, triageMs: 2000,
  coldDisplayMs: 1000, repeatDisplayMs: 1000, refreshAcknowledgementMs: 1000, verificationEventLoopLagMs: 1000,
  firstRenderMs: 2000, filterMs: 100, clearFilterMs: 100, pendingFilterMs: 100,
  workerRssBytes: 1024 * 1024 * 1024
};
const limits = { overallMs: 600_000, phaseMs: 120_000, combinedMs: 60_000, browserMs: 60_000,
  terminationMs: 15_000, exitWaitMs: 5000, heapMb: 768, outputBytes: 1_000_000 };
const emit = value => process.stdout.write(`${JSON.stringify(value)}\n`);
const elapsed = start => performance.now() - start;
const withoutTime = ({ generatedAt, firstSeen, lastSeen, ...value }) => value;
const observations = reports => reports.flatMap(report => report.findings.map(withoutTime))
  .sort((left, right) => left.id.localeCompare(right.id));
const digest = value => hash(JSON.stringify(value));

function summarizeReports(reports) {
  const findings = observations(reports);
  return {
    findings: findings.length, observationsHash: digest(findings),
    reportsHash: digest(reports.map(report => ({
      ...withoutTime(report), findings: report.findings.map(withoutTime)
    }))),
    severities: Object.fromEntries(['error', 'warning', 'unverified'].map(severity =>
      [severity, findings.filter(finding => finding.severity === severity).length])),
    revisions: [...new Set(reports.map(report => report.sourceRevision))]
  };
}

function summarizeSnapshot(snapshot) {
  return {
    findings: snapshot.findings.length,
    observationsHash: digest(snapshot.findings.map(record => withoutTime(record.finding))
      .sort((left, right) => left.id.localeCompare(right.id))),
    coverageHash: digest(snapshot.coverage.map(entry => ({
      article: entry.article, state: entry.state, retained: entry.retained,
      verification: entry.verification && {
        articleHash: entry.verification.articleHash, freshness: entry.verification.freshness,
        report: withoutTime(entry.verification.report), findingIds: entry.verification.findingIds
      }
    }))),
    provenanceHash: digest(snapshot.findings.map(record => ({
      id: record.finding.id, evidenceHash: record.evidenceHash, freshness: record.freshness,
      reviewable: record.reviewable, report: withoutTime(record.provenance.report),
      scope: record.provenance.scope, product: record.provenance.product
    }))),
    historyHash: digest(snapshot.findings.map(record => ({
      id: record.finding.id, history: record.history.map(({ at, reportId, absenceReportId, ...entry }) => entry)
    }))),
    coverageCounts: Object.fromEntries(['clean', 'findings', 'checking', 'never-checked', 'stale', 'unavailable', 'incomplete'].map(value =>
      [value, snapshot.coverage.filter(entry => entry.state === value).length]))
  };
}

async function worker(phase, directory) {
  directory = await realpath(directory);
  const root = path.dirname(path.dirname(directory));
  const ownership = JSON.parse(await readFile(await ownedPath(root, 'ownership.json'), 'utf8'));
  assert.equal(ownership.format, marker);
  assert.equal(ownership.workspace, workspace);
  assert.equal(ownership.directory, root);
  assert.equal(within(workspace, root) || within(root, workspace), false);
  assert.equal(await ownedPath(root, path.relative(root, directory)), directory);
  assert.equal(path.dirname(directory), path.join(root, 'runtime'));
  const config = JSON.parse(await readFile(path.join(directory, 'config.json'), 'utf8'));
  const home = path.join(directory, 'home');
  await ownedPath(root, path.relative(root, home), true);
  assert.equal(process.env.COPILOT_HOME, home, 'Worker must never fall back to a personal Copilot home.');
  assert.equal(process.env.VSCODE_DOCS_AUDIT_STATE_PATH, path.join(directory, 'unused-audit-state.json'));
  let checkMs = 0;
  let checkCalls = 0;
  let batchCalls = 0;
  const productionCheck = claims.createClaimChecker();
  const check = (...args) => {
    const start = performance.now();
    try { return productionCheck(...args); }
    finally {
      checkMs += elapsed(start);
      checkCalls++;
      if (phase === 'execute' && checkCalls % 25 === 0) emit({ event: 'progress', checkCalls, checkMs });
    }
  };
  check.batch = (...args) => {
    const start = performance.now();
    batchCalls++;
    try { return productionCheck.batch(...args); }
    finally { checkMs += elapsed(start); checkCalls += args[1].length; }
  };
  let acknowledgementMs;
  const initializationStart = performance.now();
  const store = await createArticleStore(workspace, home);
  const session = {
    sessionId: owner,
    rpc: { tasks: {
      async startAgent(request) {
        const start = performance.now();
        const id = request.description.slice('Docs article check '.length);
        // The parent schedules the trusted runner in a separate process after this acknowledgement.
        acknowledgementMs = elapsed(start);
        return { agentId: `benchmark-${id}` };
      },
      async list() {
        return { tasks: (await store.read()).runs.map(run => ({
          type: 'agent', id: `benchmark-${run.id}`, description: `Docs article check ${run.id}`,
          status: ['prepare', 'pending'].includes(phase) ? 'running' : 'completed', startedAt: run.createdAt
        })) };
      },
      async getProgress() { return { progress: { type: 'agent', recentActivity: [] } }; }
    } }
  };
  const workflow = await createArticleWorkflow({ session, workspace, home, onVerificationMetrics: metrics => {
    checkCalls += metrics.checkCalls;
    batchCalls += metrics.batchCalls;
    checkMs += metrics.checkMs;
  } });
  const workflowInitializationMs = elapsed(initializationStart);
  try {
  let result;
  if (phase === 'combined') {
    let start = performance.now();
    const resolved = await resolveScope(workspace, config.scope);
    const scopePreparationMs = elapsed(start);
    const articleBytes = (await Promise.all(resolved.articles.map(article => stat(path.join(workspace, article)))))
      .reduce((sum, info) => sum + info.size, 0);
    start = performance.now();
    const report = check(workspace, resolved.articles, { links: true });
    const combinedCheckMs = elapsed(start);
    start = performance.now();
    await atomicJson(path.join(directory, 'combined.json'), report);
    result = {
      scopePreparationMs, articles: resolved.articles.length, articleBytes, combinedCheckMs,
      combinedSerializationAndWriteMs: elapsed(start), ...summarizeReports([report]),
      combinedReportBytes: (await stat(path.join(directory, 'combined.json'))).size
    };
  } else if (phase === 'prepare') {
    const start = performance.now();
    const run = await workflow.dispatch('launch', { scope: config.scope, confirmed: true });
    assert.equal(run.launch, 'acknowledged');
    result = { launchPreparationMs: elapsed(start), acknowledgementMs,
      articles: run.articles.length, requestBytes: (await stat(await store.artifact(run.id, 'request.json'))).size };
  } else if (phase === 'execute') {
    const run = (await store.read()).runs.at(-1);
    emit({ event: 'runner-started' });
    const start = performance.now();
    const exitCode = await runArticleCheck(await store.artifact(run.id, 'request.json'), { workspace, home, check });
    const executionMs = elapsed(start);
    const artifacts = await loadRunArtifacts(store, run);
    const combined = JSON.parse(await readFile(path.join(directory, 'combined.json'), 'utf8'));
    assert.deepEqual(observations(artifacts.reports), observations([combined]), 'Combined and per-article observations differ.');
    assert.ok(artifacts.reports.every(report => report.sourceRevision === combined.sourceRevision));
    const serializationStart = performance.now();
    const serialized = JSON.stringify({ format, version, reports: artifacts.reports }, null, 2);
    result = {
      executionMs, checkerExitCode: exitCode, runnerInputValidationAndArtifactOverheadMs: executionMs - checkMs,
      serializationReplayMs: elapsed(serializationStart), serializationReplayBytes: Buffer.byteLength(serialized),
      reportBytes: (await stat(await store.artifact(run.id, 'report.json'))).size,
      receiptBytes: (await stat(await store.artifact(run.id, 'receipt.json'))).size,
      combinedEquivalent: true, ...summarizeReports(artifacts.reports)
    };
  } else if (phase === 'pending') {
    const start = performance.now();
    const snapshot = await workflow.dispatch('refresh', {});
    assert.equal(snapshot.findings.length, 0);
    assert.ok(snapshot.runs.every(run => !run.ingestedHash));
    result = { pendingSnapshotMs: elapsed(start), historicalOnly: true, historical: summarizeSnapshot(snapshot),
      verification: snapshot.verification.state, catalog: snapshot.catalog.state };
  } else if (phase === 'ingest') {
    const run = (await store.read()).runs.at(-1);
    await workflow.dispatch('sync', { id: run.id });
    const start = performance.now();
    await workflow.snapshot();
    const ingestionAcknowledgementMs = elapsed(start);
    await workflow.whenVerified();
    const ingestionMs = elapsed(start);
    const state = await store.read();
    assert.equal((await inspectExecution(store, state.runs.at(-1))).state, 'valid');
    assert.ok(state.runs.at(-1).ingestedHash);
    assert.equal(state.coverage.length, run.articles.length);
    assert.ok(state.review.findings.every(record => record.history.length === 0));
    result = { ingestionMs, ingestionAcknowledgementMs, findings: state.review.findings.length, coverageArticles: state.coverage.length,
      inboxBytes: (await stat(store.stateFile)).size };
  } else if (phase === 'snapshots') {
    const snapshots = [];
    result = {};
    for (const [name, acknowledgement, action] of [
      ['coldSnapshotMs', 'coldDisplayMs', () => workflow.snapshot()],
      ['repeatSnapshotMs', 'repeatDisplayMs', () => workflow.snapshot()],
      ['refreshMs', 'refreshAcknowledgementMs', () => workflow.dispatch('refresh', {})]
    ]) {
      const start = performance.now();
      const historical = await action();
      Reflect.set(result, acknowledgement, elapsed(start));
      assert.equal(historical.verification.state, 'checking');
      assert.ok(historical.findings.every(record => record.freshness === 'checking' || record.freshness === 'unavailable'));
      assert.equal(historical.checkedAt, null, 'Historical display must not claim completed current verification.');
      emit({ event: 'progress', historicalDisplay: acknowledgement, metrics: { ...result },
        historicalFindings: historical.findings.length, verification: 'checking' });
      await atomicJson(path.join(directory, 'historical-snapshot.json'), historical);
      let previousTick = performance.now();
      let maximumLag = 0;
      const heartbeat = setInterval(() => {
        const tick = performance.now();
        maximumLag = Math.max(maximumLag, tick - previousTick - 25);
        previousTick = tick;
      }, 25);
      try { await workflow.whenVerified(); }
      finally { clearInterval(heartbeat); }
      const snapshot = await workflow.snapshot({ verify: false });
      assert.equal(snapshot.verification.state, 'complete');
      assert.ok(snapshot.coverage.every(entry => !entry.verification || entry.verification.freshness === 'fresh'),
        'Completed acceptance requires current source verification, not only retained observations.');
      Reflect.set(result, name, elapsed(start));
      result.verificationEventLoopLagMs = Math.max(result.verificationEventLoopLagMs || 0, maximumLag);
      snapshots.push(summarizeSnapshot(snapshot));
      emit({ event: 'progress', completedSnapshot: name, metrics: { ...result },
        semantic: snapshots.at(-1), verification: 'complete',
        lastCompletedVerification: { stage: name, semantic: snapshots.at(-1) }, checkCalls, batchCalls, checkMs });
      await atomicJson(path.join(directory, 'snapshot.json'), snapshot);
    }
    assert.deepEqual(snapshots[0], snapshots[1]);
    assert.deepEqual(snapshots[1], snapshots[2]);
    const run = (await store.read()).runs.at(-1);
    const artifacts = await loadRunArtifacts(store, run);
    assert.equal(snapshots[0].observationsHash, summarizeReports(artifacts.reports).observationsHash);
    result = { ...result, repeatEquivalent: true, ...snapshots[0] };
  } else if (phase === 'triage') {
    const before = await store.read();
    const record = before.review.findings[0];
    assert.ok(record, 'Triage workload requires a finding.');
    const coverage = before.coverage.find(entry => entry.article === record.finding.article);
    const start = performance.now();
    await workflow.dispatch('triage', {
      findingId: record.finding.id, evidenceHash: record.evidenceHash, coverageToken: coverageToken(coverage),
      status: 'dismissed', reason: 'Synthetic acceptance decision in disposable benchmark state only.'
    });
    const triageMs = elapsed(start);
    const after = await store.read();
    const decision = after.review.findings.find(entry => entry.finding.id === record.finding.id);
    assert.equal(decision.finding.status, 'dismissed');
    assert.equal(decision.history.length, record.history.length + 1);
    assert.equal(decision.history.at(-1).action, 'triage');
    assert.deepEqual(after.coverage, before.coverage);
    assert.deepEqual(after.review.findings.filter(entry => entry.finding.id !== record.finding.id),
      before.review.findings.filter(entry => entry.finding.id !== record.finding.id));
    result = {
      triageMs, article: record.finding.article, historyAdded: 1, unrelatedUnchanged: true,
      triageHash: digest({
        finding: withoutTime(decision.finding), evidenceHash: decision.evidenceHash,
        history: decision.history.map(({ at, reportId, ...entry }) => entry)
      })
    };
  } else if (phase === 'browser') {
    result = await browserBenchmark(directory, config, workflow);
  } else {
    throw new Error(`Unknown acceptance phase: ${phase}`);
  }
  return { ...result, workflowInitializationMs, checkCalls, batchCalls, checkMs, rssBytes: process.memoryUsage().rss,
    peakWorkerRssBytes: process.resourceUsage().maxRSS * 1024 };
  } finally { await workflow.dispose(); }
}

async function browserBenchmark(directory, config, workflow) {
  if (!process.env.DOCS_ARTICLE_BROWSER) return { skipped: 'DOCS_ARTICLE_BROWSER is unset. No browser was installed or downloaded.' };
  const { chromium } = await import('playwright-core');
  const { createWorkbenchServer } = await import('./server.mjs');
  const { articleAssets } = await import('./article-canvas.mjs');
  let snapshot;
  let dataset;
  try {
    snapshot = JSON.parse(await readFile(path.join(directory, 'historical-snapshot.json'), 'utf8'));
    assert.equal(snapshot.verification.state, 'checking');
    dataset = 'accepted-workflow-historical-display';
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const report = JSON.parse(await readFile(path.join(directory, 'combined.json'), 'utf8'));
    const review = audit.createEmptyState();
    auditFindings.importFindings(review, report, now());
    const articles = (await resolveScope(workspace, config.scope)).articles;
    snapshot = {
      workspace, ownerSessionId: owner, storageDirectory: workflow.store.directory,
      hostAvailable: true, hostContract: 'Synthetic benchmark host; no real tasks.', articles, checkedAt: now(), runs: [],
      coverage: articles.map(article => ({ article, state: 'never-checked', retained: 0 })),
      findings: review.findings.map(record => ({
        ...record, freshness: 'unavailable', reviewable: false,
        provenance: { report: { sourceRevision: report.sourceRevision, checks: report.checks },
          scope: config.scope, product: 'Projection only, not accepted per-article verification.' }
      }))
    };
    dataset = 'combined-report-projection-only-no-accepted-coverage';
  }
  const pendingArticles = (await resolveScope(workspace, config.scope)).articles;
  snapshot.runs.push({
    id: randomUUID(), ownerSessionId: owner, ownerMatches: true, scope: config.scope,
    articles: pendingArticles, createdAt: now(), launch: 'acknowledged', agentId: 'synthetic-pending',
    observation: { status: 'running', observedAt: now() }, result: { state: 'missing' },
    rerun: { allowed: false, reason: 'Synthetic pending batch for responsiveness measurement.' }
  });
  const actions = [];
  const failures = [];
  let server;
  let context;
  try {
    server = await createWorkbenchServer({
      snapshot: async () => snapshot,
      dispatch: async action => {
        actions.push(action);
        assert.ok(['refresh', 'poll'].includes(action), 'Browser benchmark must never launch checks or save decisions.');
        return snapshot;
      }
    }, async () => {}, error => failures.push(error.message), { assetEntries: articleAssets });
    const browserFiles = path.join(directory, 'browser');
    await mkdir(browserFiles);
    context = await chromium.launchPersistentContext(path.join(browserFiles, 'profile'), {
      executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true,
      viewport: { width: 1400, height: 1100 }, downloadsPath: browserFiles,
      env: { ...process.env, TMP: browserFiles, TEMP: browserFiles, TMPDIR: browserFiles },
      timeout: 20_000
    });
    const page = await context.newPage();
    page.setDefaultTimeout(20_000);
    page.on('pageerror', error => failures.push(error.message));
    page.on('dialog', async dialog => { failures.push('Unexpected browser dialog.'); await dialog.dismiss(); });
    await page.route('**/*', route => {
      if (new URL(route.request().url()).origin === server.url) return route.continue();
      failures.push(`Blocked external request: ${route.request().url()}`);
      return route.abort();
    });
    const start = performance.now();
    await page.goto(server.url);
    await page.locator('#finding-count').getByText(`${snapshot.findings.length} of ${snapshot.findings.length}`, { exact: true }).waitFor();
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const firstRenderMs = elapsed(start);
    const query = snapshot.findings[0].finding.article;
    const expected = snapshot.findings.filter(({ finding }) =>
      `${finding.article} ${finding.message} ${finding.evidence} ${finding.line}`.toLowerCase().includes(query.toLowerCase())).length;
    async function filter(value, expectedCount) {
      const duration = await page.evaluate(async value => {
        const start = performance.now();
        const input = document.getElementById('finding-search');
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return performance.now() - start;
      }, value);
      assert.equal(await page.locator('.finding').count(), expectedCount);
      return duration;
    }
    const filterMs = await filter(query, expected);
    const clearFilterMs = await filter('', snapshot.findings.length);
    await page.locator('#execution-indicator').getByText(`Host running · ${pendingArticles.length} article(s)`, { exact: true }).waitFor();
    const pendingFilterMs = await filter(query, expected);
    await page.setViewportSize({ width: 420, height: 800 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
    for (const theme of ['dark', 'light']) {
      await page.emulateMedia({ colorScheme: theme });
      assert.equal(await page.locator('.finding').count(), expected);
    }
    assert.deepEqual(failures, []);
    assert.ok(actions.every(action => ['refresh', 'poll'].includes(action)));
    return { dataset, findings: snapshot.findings.length, firstRenderMs, filterMs, clearFilterMs, pendingFilterMs,
      filteredFindings: expected, noLaunchOrDecision: true, snapshotBytes: Buffer.byteLength(JSON.stringify(snapshot)),
      note: 'UI-only replay of the actual historical display response, with a synthetic pending host batch. No completed freshness claim or checker work in this server. Backend display/verification are measured separately. Worker RSS excludes Edge processes.' };
  } finally {
    try { await context?.close(); }
    finally { await server?.close(); }
  }
}

async function main(outputRoot, comparisonFile) {
  assert.equal(process.platform, 'win32', 'This acceptance driver uses Windows PID-tree cleanup.');
  assert.ok(path.isAbsolute(outputRoot || ''), 'Supply --output-root with an existing absolute OS-temporary directory.');
  const temporary = await realpath(os.tmpdir());
  outputRoot = await realpath(outputRoot);
  assert.ok(within(temporary, outputRoot), '--output-root must be under the OS temporary directory.');
  assert.equal(within(workspace, outputRoot) || within(outputRoot, workspace), false);
  const comparison = comparisonFile ? JSON.parse(await readFile(await privateComparisonPath(comparisonFile), 'utf8')) : undefined;
  const directory = await mkdtemp(path.join(outputRoot, 'vscode-docs-article-scale-'));
  const runtime = path.join(directory, 'runtime');
  const report = {
    format: marker, directory, startedAt: now(), workspace,
    environment: { platform: process.platform, architecture: process.arch, node: process.version,
      cpus: os.availableParallelism(), browser: process.env.DOCS_ARTICLE_BROWSER || null },
    budgets, limits, workloads: [], cleanup: { runtimeRemoved: false },
    notes: [
      'One sample per phase. Targets are acceptance budgets, not new product limits.',
      'Cold/repeat/refresh retain completed-verification timings and prior targets. Cold/repeat display and refresh acknowledgement measure historical delivery separately; pending snapshots are not semantic verification results.',
      'Verification uses production worker threads, not the injected checker used to instrument the trusted runner. Checker metrics are returned by those threads. Workflow initialization is measured separately.',
      'Runner overhead includes input guards, serialization, receipt writes and hashing; serializationReplayMs isolates JSON encoding, not disk I/O.',
      'No article, dependency, Git revision, live host, personal store, or extension configuration is modified.',
      'Mutation/stale/reappearance/tamper cases remain in existing fixture suites; this harness does not edit the real corpus to simulate them.',
      'Heap cap applies per Node worker. RSS is observed, not an OS-enforced aggregate memory cap; browser memory is not included.',
      'Phase/overall deadlines permit a bounded termination grace per active worker: 15 seconds for PID-tree cleanup plus five seconds awaiting close.'
    ]
  };
  let unsafeCleanup = false;
  let interrupted;
  const deadline = performance.now() + limits.overallMs;
  const active = new Set();
  const cleanupFailures = [];
  function cleanupFailure(message) {
    unsafeCleanup = true;
    cleanupFailures.push(message);
    report.cleanup.errors = cleanupFailures;
  }
  function startWorker(job, phase, maximum = limits.phaseMs) {
    if (interrupted) throw interrupted;
    if (unsafeCleanup) throw new Error('Prior worker cleanup was unverified; no further helpers will be started.');
    const timeLeft = deadline - performance.now();
    if (timeLeft <= 0) throw new Error('Overall acceptance deadline reached.');
    const createdAfter = Date.now();
    const child = spawn(process.execPath, [`--max-old-space-size=${limits.heapMb}`, script, '--worker', phase, job], {
      cwd: workspace, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
      env: { ...process.env, COPILOT_HOME: path.join(job, 'home'),
        VSCODE_DOCS_AUDIT_STATE_PATH: path.join(job, 'unused-audit-state.json'),
        TMP: path.join(job, 'tmp'), TEMP: path.join(job, 'tmp'), TMPDIR: path.join(job, 'tmp') }
    });
    let releaseStarted;
    const started = new Promise(resolve => { releaseStarted = resolve; });
    let stdout = '';
    let stderr = '';
    let pending = '';
    let result;
    let progress;
    let spawnError;
    let readyAt;
    let closed = false;
    let finalize;
    let releaseClosed;
    const closeObserved = new Promise(resolve => { releaseClosed = resolve; });
    let releaseDone;
    const done = new Promise(resolve => { releaseDone = resolve; });
    const start = performance.now();
    let timer;
    function terminate() {
      if (!child.pid) return;
      try {
        const output = execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-File', cleanupScript,
          '-WorkerId', String(child.pid), '-OwnerId', String(process.pid),
          '-CreatedAfter', String(createdAfter), '-CreatedBefore', String(readyAt || Date.now())], {
          windowsHide: true, encoding: 'utf8', stdio: 'pipe', timeout: limits.terminationMs, maxBuffer: limits.outputBytes
        });
        const cleanup = JSON.parse(output.trim());
        assert.equal(cleanup.verified, true);
        assert.equal(cleanup.workerId, child.pid);
      } catch (error) {
        cleanupFailure(`Owned worker ${phase}, PID ${child.pid}: ${error.stdout?.toString().trim() || error.message}`);
      }
    }
    function stop(reason) {
      if (finalize) return finalize;
      clearTimeout(timer);
      finalize = (async () => {
        terminate();
        let closeTimer;
        try {
          await Promise.race([closeObserved, new Promise(resolve => {
            closeTimer = setTimeout(resolve, limits.exitWaitMs);
          })]);
        } finally { clearTimeout(closeTimer); }
        if (!closed) {
          cleanupFailure(`Owned worker ${phase}, PID ${child.pid}, did not close. Runtime files retained; explicit PID inspection is required.`);
          // Do not wait indefinitely after a reported termination failure. The worker and any
          // descendants are not declared stopped, and their runtime directory is retained.
          child.stdout.destroy();
          child.stderr.destroy();
          if (child.connected) child.disconnect();
          child.unref();
        } else {
          active.delete(handle);
        }
        releaseStarted(false);
        const outcome = {
          phase, status: reason === 'completed' ? 'ok' : reason, wallMs: elapsed(start), value: result, progress,
          ...(spawnError ? { error: spawnError } : {}), ...(stderr ? { stderr } : {})
        };
        process.stderr.write(`${phase}: ${outcome.status} (${Math.round(outcome.wallMs)} ms)\n`);
        releaseDone(outcome);
        return outcome;
      })();
      return finalize;
    }
    const handle = { done, started, stop, get running() { return !closed && child.exitCode === null; } };
    active.add(handle);
    timer = setTimeout(() => void stop('timeout'), Math.min(maximum, timeLeft));
    child.stdout.on('data', bytes => {
      const text = bytes.toString();
      stdout += text;
      pending += text;
      if (Buffer.byteLength(stdout) > limits.outputBytes) { void stop('output-limit'); return; }
      let end;
      while ((end = pending.indexOf('\n')) !== -1) {
        const line = pending.slice(0, end);
        pending = pending.slice(end + 1);
        try {
          const event = JSON.parse(line);
          if (event.event === 'worker-ready') {
            assert.equal(event.pid, child.pid);
            assert.equal(readyAt, undefined);
            readyAt = Date.now();
            child.send({ action: 'run' }, error => {
              if (error) { spawnError = error.message; void stop('failed'); }
            });
          }
          if (event.event === 'runner-started') releaseStarted(true);
          if (event.event === 'result') { result = event.value; void stop('completed'); }
          if (event.event === 'progress') progress = { ...progress, ...event };
          if (event.event === 'error') { spawnError = event.message; void stop('failed'); }
        } catch { void stop('invalid-worker-output'); }
      }
    });
    child.stderr.on('data', bytes => {
      stderr += bytes.toString();
      if (Buffer.byteLength(stderr) > limits.outputBytes) void stop('output-limit');
    });
    child.on('error', error => { spawnError = error.message; void stop('failed'); });
    child.on('close', code => {
      closed = true;
      releaseClosed();
      if (!finalize) {
        spawnError ||= `Worker exited unexpectedly with code ${code}, before cleanup acknowledgement.`;
        void stop('failed');
      }
    });
    return handle;
  }
  async function run(job, phase, maximum) { return startWorker(job, phase, maximum).done; }
  const onSignal = signal => {
    interrupted ||= new Error(`Acceptance interrupted by ${signal}.`);
    for (const handle of active) void handle.stop('interrupted');
  };
  const onInterrupt = () => onSignal('SIGINT');
  const onTerminate = () => onSignal('SIGTERM');
  process.on('SIGINT', onInterrupt);
  process.on('SIGTERM', onTerminate);
  try {
    await atomicJson(path.join(directory, 'ownership.json'), { format: marker, workspace, directory, id: randomUUID() });
    await mkdir(runtime);
    for (const [index, scope] of scopes.entries()) {
      const job = path.join(runtime, String(index));
      await mkdir(job);
      await mkdir(path.join(job, 'tmp'));
      await atomicJson(path.join(job, 'config.json'), { scope });
      const workload = { scope, phases: [] };
      report.workloads.push(workload);
      const combined = await run(job, 'combined', limits.combinedMs);
      workload.phases.push(combined);
      if (combined.status !== 'ok') continue;
      const prepare = await run(job, 'prepare');
      workload.phases.push(prepare);
      if (prepare.status !== 'ok') continue;
      const execution = startWorker(job, 'execute');
      try {
        if (await execution.started) {
          const running = execution.running;
          const pending = await run(job, 'pending');
          if (pending.value) pending.value.runnerActiveAtSnapshotStart = running;
          workload.phases.push(pending);
        }
      } catch (error) {
        await execution.stop('aborted');
        throw error;
      } finally {
        workload.phases.push(await execution.done);
      }
      if (workload.phases.at(-1).status === 'ok') {
        const ingest = await run(job, 'ingest');
        workload.phases.push(ingest);
        if (ingest.status === 'ok') {
          workload.phases.push(await run(job, 'snapshots'));
          workload.phases.push(await run(job, 'triage', 30_000));
        }
      } else {
        workload.unmeasured = 'Execution did not complete within its bounds. Ingestion, accepted snapshots and triage were not measured.';
      }
      workload.phases.push(await run(job, 'browser', limits.browserMs));
    }
    report.unmetBudgets = report.workloads.flatMap(workload => workload.phases.flatMap(phase => {
      const failures = phase.status !== 'ok' ? [{ scope: workload.scope, phase: phase.phase, status: phase.status }] : [];
      if (phase.value?.skipped) failures.push({ scope: workload.scope, phase: phase.phase, skipped: phase.value.skipped });
      for (const [metric, target] of Object.entries(budgets)) {
        const value = Reflect.get(phase.value || phase.progress?.metrics || {}, metric === 'workerRssBytes' ? 'peakWorkerRssBytes' : metric);
        if (value > target) failures.push({ scope: workload.scope, phase: phase.phase, metric, value, target });
      }
      return failures;
    }));
    if (comparison) {
      assert.equal(comparison.format, marker);
      report.comparison = [];
      for (const workload of report.workloads) {
        const baseline = comparison.workloads.find(item => JSON.stringify(item.scope) === JSON.stringify(workload.scope));
        assert.ok(baseline, 'Missing baseline workload.');
        for (const phase of workload.phases) {
          const previous = baseline.phases.find(item => item.phase === phase.phase);
          if (phase.value?.historicalOnly || previous?.value?.historicalOnly) {
            report.comparison.push({ scope: workload.scope, phase: phase.phase, compared: false,
              reason: 'Historical response; catalog and current verification can still be pending.' });
            continue;
          }
          if (phase.status !== 'ok' || previous?.status !== 'ok') {
            if (phase.phase === 'snapshots' && phase.progress?.semantic && previous?.progress?.semantic) {
              for (const key of ['observationsHash', 'coverageHash', 'provenanceHash', 'historyHash']) {
                assert.equal(Reflect.get(phase.progress.semantic, key), Reflect.get(previous.progress.semantic, key),
                  `Completed partial snapshot ${key} differs from baseline.`);
                report.comparison.push({ scope: workload.scope, phase: phase.phase, key, equivalent: true, partialCompletedVerification: true });
              }
            }
            continue;
          }
          for (const key of ['observationsHash', 'reportsHash', 'coverageHash', 'provenanceHash', 'historyHash', 'triageHash']) {
            if (Reflect.get(phase.value, key) === undefined || Reflect.get(previous.value, key) === undefined) continue;
            assert.equal(Reflect.get(phase.value, key), Reflect.get(previous.value, key), `${phase.phase} ${key} differs from baseline.`);
            report.comparison.push({ scope: workload.scope, phase: phase.phase, key, equivalent: true });
          }
        }
      }
    }
  } catch (error) {
    report.error = error.stack;
  } finally {
    await Promise.all([...active].map(handle => handle.stop('aborted')));
    process.off('SIGINT', onInterrupt);
    process.off('SIGTERM', onTerminate);
    if (interrupted) report.error ||= interrupted.stack;
    if (active.size) {
      cleanupFailure('A worker is still active after bounded stop/wait attempts. Runtime files were retained, not deleted under a writer.');
    }
    if (!unsafeCleanup) {
      try { await rm(runtime, { recursive: true, force: true }); report.cleanup.runtimeRemoved = true; }
      catch (error) { report.cleanup.error = error.message; }
    }
    report.finishedAt = now();
    const file = path.join(directory, 'report.json');
    await atomicJson(file, report);
    emit({ report: file, error: report.error, cleanup: report.cleanup,
      unmetBudgets: report.unmetBudgets || [], workloads: report.workloads });
  }
  const failed = report.workloads.some(workload => workload.phases.some(phase => phase.status === 'failed'));
  process.exitCode = report.error || failed || !report.cleanup.runtimeRemoved ? 2 : report.unmetBudgets.length ? 1 : 0;
}

async function privateComparisonPath(file) {
  assert.ok(path.isAbsolute(file), '--compare requires an absolute report path.');
  const resolved = await realpath(file);
  assert.equal(within(workspace, resolved) || within(resolved, workspace), false);
  assert.equal((await stat(resolved)).isFile(), true);
  return resolved;
}

const args = process.argv.slice(2);
try {
  if (args.length === 1 && args[0] === '--help') {
    process.stdout.write('Windows acceptance: node article-scale.mjs --output-root <existing-OS-temp-directory> [--compare <prior-report.json>]\n' +
      'Set DOCS_ARTICLE_BROWSER to an installed Edge/Chromium executable. No downloads or live host access.\n' +
      'Creates one owned vscode-docs-article-scale-* directory. Retains report.json and ownership.json; removes runtime state and browser profiles.\n' +
      `Targets: ${JSON.stringify(budgets)}\nHard limits: ${JSON.stringify(limits)}\n` +
      'Exit 0: measured budgets met; 1: unmet/skipped/timed-out measurement; 2: harness/equivalence/cleanup failure.\n');
  } else if (args.length === 3 && args[0] === '--worker') {
    assert.equal(typeof process.send, 'function', 'Acceptance workers require their owning driver IPC channel.');
    const permission = new Promise(resolve => {
      // Keep the worker alive after its result so the parent can verify and stop its entire tree.
      process.on('message', message => { if (message?.action === 'run') resolve(); });
    });
    emit({ event: 'worker-ready', pid: process.pid });
    await permission;
    emit({ event: 'result', value: await worker(args[1], args[2]) });
  } else {
    assert.ok((args.length === 2 || args.length === 4) && args[0] === '--output-root' &&
      (args.length !== 4 || args[2] === '--compare'), 'Use --help for the bounded acceptance command.');
    await main(args[1], args[3]);
  }
} catch (error) {
  emit({ event: 'error', message: error.stack });
  process.exitCode = 2;
}
