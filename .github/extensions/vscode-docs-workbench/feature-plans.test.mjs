import assert from 'node:assert/strict';
import test from 'node:test';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright-core';
import plans from '../../../build/doc-plan.js';
import { createArticleFixture } from './article-fixture.mjs';
import { beginFeatureDraft, completeFeatureDraft, completeFeaturePlan, createFeaturePlans } from './feature-plans.mjs';
import draftTools from '../../../build/doc-draft.js';
import png from '../../../build/media-png.js';
import claims from '../../../build/check-claims.js';
import editorTools from '../../../build/docs-editor.js';
import { completeReviewRequest } from './article-review.mjs';
import { atomicJson, format, hash, now, readJson } from './article-storage.mjs';
import { createWorkbenchServer } from './server.mjs';
import { articleAssets } from './article-canvas.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use only their exclusively owned OS-temp fixtures. */

function proposal() {
  return {
    title: 'Explain the fixture feature', outcome: 'changes-needed', summary: 'Clarify the existing workflow.',
    persona: 'Fixture reader', intent: 'Complete the documented task', purpose: 'Provide a usable explanation',
    availability: { status: 'public', explanation: 'Synthetic public evidence for this fixture.' },
    changes: [{ path: 'docs/article.md', action: 'update', description: 'Clarify the steps.' }],
    media: [{ id: 'workflow-image', kind: 'screenshot', article: 'docs/article.md', purpose: 'Identify the relevant control',
      placement: 'After the steps', scenario: 'The control is visible in the fixture', status: 'proposed', limitation: '' }],
    sources: [{ url: `https://github.com/microsoft/vscode/blob/${'a'.repeat(40)}/src/fixture.ts#L1`, note: 'Synthetic evidence.' }],
    limitations: []
  };
}

async function fixture(t, { authoring = false, revision = false } = {}) {
  const f = await createArticleFixture(revision ? { content: '# Article\n\nChoose the thing.\n\nKeep this example.\n' } : {});
  let dispose = async () => {};
  t.after(async () => { try { await dispose(); } finally { await f.dispose(); } });
  let plan = proposal();
  let held = false;
  let draftHeld = false;
  let captureHeld = false;
  let captureFailure = false;
  const captureBytes = png.encodePng({ width: 8, height: 6, pixels: Buffer.alloc(8 * 6 * 4, 255) });
  const story = { id: 'fixture-screenshot', article: 'docs/article.md', channel: 'stable', fixture: { openFolder: true },
    steps: [{ action: 'assert', target: 'control', text: 'Fixture' }], targets: { control: { role: 'button', name: 'Fixture' } } };
  await mkdir(path.join(f.workspace, 'build', 'storyboards'));
  await atomicJson(path.join(f.workspace, 'build', 'storyboards', 'fixture.json'), story);
  let draftEdit = async () => {
    const file = path.join(f.workspace, 'docs', 'article.md');
    await writeFile(file, (await readFile(file, 'utf8')) + '\nClarified fixture step.\n<!-- TODO: workflow-image requires attended capture and asset approval. -->\n');
  };
  const environment = { ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: path.join(f.directory, 'empty-gitconfig'),
    GIT_AUTHOR_NAME: 'Fixture', GIT_AUTHOR_EMAIL: 'fixture@example.test', GIT_COMMITTER_NAME: 'Fixture', GIT_COMMITTER_EMAIL: 'fixture@example.test' };
  const git = (args, input) => execFileSync('git', args, { cwd: f.workspace, env: environment, input,
    encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  if (authoring) {
    git(['init', '--template=', '--initial-branch=main']);
    await writeFile(path.join(f.workspace, 'build', 'check-claims.js'), 'throw new Error("Source checkout scripts must not execute");');
    git(['add', '.']);
    const tree = git(['write-tree']);
    git(['update-ref', 'HEAD', git(['commit-tree', tree], 'Fixture source\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>\n')]);
  }
  const issue = { key: 'microsoft/vscode:issue:123', kind: 'issue', title: 'Fixture issue', body: 'Fixture feature',
    url: 'https://github.com/microsoft/vscode/issues/123', state: 'open', labels: [], assignees: [], comments: [] };
  const options = { getRevision: () => authoring ? git(['rev-parse', 'HEAD']) : 'fixture-revision', github: { async detail(key) {
    assert.equal(key, issue.key); return structuredClone(issue);
  } }, procedures: {
    async options() { return { storyboards: [{ ...story, file: 'fixture.json', workspaceRequired: false }],
      builds: [{ executable: path.join(f.directory, 'Code.exe'), revision: 'a'.repeat(40), channel: 'stable', version: 'Fixture' }], errors: [] }; },
    async prepare(input) {
      return { config: { storyboard: input.storyboard, executable: input.executable, revision: input.revision },
        procedure: story, productVersion: 'Fixture',
        binding: { article: story.article, storyboardHash: hash(await readFile(path.join(f.workspace, 'build', 'storyboards', input.storyboard))),
          product: { revision: input.revision, channel: 'stable' } } };
    }
  }, async captureEditor(input) {
    if (captureFailure) throw new Error('Synthetic capture prerequisite unavailable.');
    const directory = path.join(input.output, 'fixture-capture');
    await mkdir(directory);
    await writeFile(path.join(directory, 'candidate.png'), captureBytes);
    const manifest = { schemaVersion: 1, status: 'candidate', execution: 'attended', privacy: { textScan: 'passed' },
      product: { revision: input.revision }, storyboard: { id: story.id, article: story.article, sha256: hash(await readFile(input.storyboard)) },
      asset: { file: 'candidate.png', sha256: hash(captureBytes), bytes: captureBytes.length } };
    await atomicJson(path.join(directory, 'capture.json'), manifest);
    return { directory, manifest };
  } };
  const originalStart = f.session.rpc.tasks.startAgent;
  f.session.rpc.tasks.startAgent = async input => {
    if (input.description.startsWith('Docs article review ')) {
      const id = input.description.slice('Docs article review '.length);
      const task = { id: `review-${id}`, type: 'agent', description: input.description, status: 'running', startedAt: now() };
      f.tracked.push(task);
      const requestFile = await f.rawWorkflow.store.file(path.join('review-runs', id, 'request.json'));
      await atomicJson(path.join(path.dirname(requestFile), 'draft.json'), {
        status: 'complete', summary: 'Clarify the action while preserving examples.', limitations: [],
        findings: [{ line: 3, endLine: 3, quote: 'Choose the thing.', category: 'structure', assessment: 'supported',
          message: 'The action is unclear.', suggestion: 'Name the control.', sources: [] }]
      });
      await completeReviewRequest(requestFile, { workspace: f.workspace, home: f.home, check: claims.checkClaims });
      task.status = 'completed';
      return { agentId: task.id };
    }
    if (input.description.startsWith('Docs feature screenshot ')) {
      const id = input.description.slice('Docs feature screenshot '.length);
      const task = { id: `capture-${id}`, type: 'agent', description: input.description, status: 'running', startedAt: now() };
      f.tracked.push(task);
      if (!captureHeld) {
        try {
          const helper = await createFeaturePlans(f.rawWorkflow.store, {}, options);
          await helper.media.execute(path.join(f.home, 'extension-data', format, 'media-output', id, 'request.json'));
          task.status = 'completed';
        } catch (error) { task.status = 'failed'; task.error = error.message; }
      }
      return { agentId: task.id };
    }
    if (input.description.startsWith('Docs feature draft ')) {
      const id = input.description.slice('Docs feature draft '.length);
      const task = { id: `draft-${id}`, type: 'agent', description: input.description, status: 'running', startedAt: now() };
      f.tracked.push(task);
      if (!draftHeld) {
        const state = await readJson(await f.rawWorkflow.store.file('feature-plans.json'));
        const job = state.jobs.find(item => item.draft?.id === id);
        const requestFile = await f.rawWorkflow.store.file(path.join('feature-plans', job.id, 'draft-request.json'));
        try {
          await beginFeatureDraft(requestFile, { store: f.rawWorkflow.store, ...options });
          await draftEdit();
          await completeFeatureDraft(requestFile, { store: f.rawWorkflow.store, ...options });
          task.status = 'completed';
        } catch (error) { task.status = 'failed'; task.error = error.message; }
      }
      return { agentId: task.id };
    }
    if (!input.description.startsWith('Docs feature plan ')) return originalStart(input);
    const id = input.description.slice('Docs feature plan '.length);
    const task = { id: `plan-${id}`, type: 'agent', description: input.description, status: 'running', startedAt: now() };
    f.tracked.push(task);
    if (!held) {
      const directory = await f.rawWorkflow.store.file(path.join('feature-plans', id), false);
      await atomicJson(path.join(directory, 'plan.json'), plan);
      await completeFeaturePlan(path.join(directory, 'request.json'), { store: f.rawWorkflow.store, ...options });
      task.status = 'completed';
    }
    return { agentId: task.id };
  };
  const opened = [];
  const editor = { available: true, async open(input) { opened.push(input); return { opened: true, ...input, comparison: 'Captured baseline against current file.' }; } };
  const workflow = await f.reopen({ featureOptions: options, editor });
  return { ...f, workflow, issue, git, options, captureBytes, opened, editor,
    setPlan(value) { plan = value; },
    hold() { held = true; },
    holdDraft() { draftHeld = true; },
    holdCapture() { captureHeld = true; },
    failCapture() { captureFailure = true; },
    editDraft(callback) { draftEdit = callback; },
    draftContext: record => workflow.dispatch('feature-draft-context', { id: record.id, planHash: record.planHash, target: f.workspace }),
    async draft(record, extra = {}) {
      const context = await workflow.dispatch('feature-draft-context', { id: record.id, planHash: record.planHash, target: f.workspace });
      return workflow.dispatch('feature-draft-start', { id: record.id, planHash: record.planHash, target: context.target,
        branch: context.branch, contextHash: context.contextHash, confirmed: true, ...extra });
    },
    async beginDraft(record) {
      return beginFeatureDraft(await f.rawWorkflow.store.file(path.join('feature-plans', record.id, 'draft-request.json')),
        { store: f.rawWorkflow.store, ...options });
    },
    async complete(job) {
      const directory = await f.rawWorkflow.store.file(path.join('feature-plans', job.id), false);
      await atomicJson(path.join(directory, 'plan.json'), plan);
      return completeFeaturePlan(path.join(directory, 'request.json'), { store: f.rawWorkflow.store, ...options });
    },
    beforeDispose(callback) { dispose = callback; },
    launch: (input = {}) => workflow.dispatch('feature-launch', { feature: 'Explain the fixture feature',
      channel: 'stable', confirmed: true, ...input }),
    snapshot: () => workflow.dispatch('refresh', {}),
    approve: record => workflow.dispatch('feature-decide', { id: record.id, planHash: record.planHash,
      status: 'approved', confirmed: true, reason: 'Approve the scoped fixture proposal.' }),
    async capture(record, extra = {}) {
      const input = { id: record.id, planHash: record.planHash, mediaId: 'workflow-image', storyboard: 'fixture.json',
        executable: path.join(f.directory, 'Code.exe'), revision: 'a'.repeat(40) };
      const prepared = await workflow.dispatch('feature-media-prepare', input);
      return workflow.dispatch('feature-media-launch', { ...input, bindingHash: prepared.bindingHash, confirmed: true, ...extra });
    },
    review: (run, extra = {}) => workflow.dispatch('feature-media-review', { id: run.id, assetHash: run.assetHash,
      manifestHash: run.manifestHash, decision: 'approved', altText: 'Screenshot showing the synthetic fixture control.', confirmed: true, ...extra })
  };
}

async function revisionPlan(f) {
  const plan = proposal();
  plan.title = 'Clarify article actions';
  plan.media = [];
  plan.changes[0].description = 'Clarity: identify the control. Consistency: retain the existing example and terminology.';
  f.setPlan(plan);
  const review = await f.workflow.dispatch('review-launch', { article: 'docs/article.md', focus: 'both', channel: 'stable',
    concerns: 'Keep the example unchanged.', confirmed: true });
  await f.snapshot();
  await f.workflow.dispatch('feature-revision-launch', { reviewId: review.id, confirmed: true });
  return (await f.snapshot()).featurePlans[0];
}

async function revisionContext(f, record) {
  return f.workflow.dispatch('feature-revision-context', { id: record.id, planHash: record.planHash, target: f.workspace });
}

async function revise(f, record, context, extra = {}) {
  return f.workflow.dispatch('feature-revision-start', { id: record.id, planHash: record.planHash,
    target: context.target, branch: context.branch, contextHash: context.contextHash, confirmed: true, ...extra });
}

test('article-level revision combines scope and write approval, preserves existing edits, and opens the correct native diff inputs', async t => {
  const f = await fixture(t, { authoring: true, revision: true });
  const article = path.join(f.workspace, 'docs', 'article.md');
  await writeFile(article, (await readFile(article, 'utf8')) + '\nExisting author note.\n');
  const baseline = await readFile(article, 'utf8');
  const plan = await revisionPlan(f);
  assert.equal(plan.revision.article, 'docs/article.md');
  assert.ok(plan.workId);
  const context = await revisionContext(f, plan);
  assert.equal(context.preserveExistingEdits, true);
  assert.equal((await f.snapshot()).featurePlans[0].decision, undefined);
  await assert.rejects(revise(f, plan, context, { confirmed: false }), /confirmation/);
  assert.equal(f.tracked.length, 2, 'Planning and review only, no editing before the overall approval.');
  f.editDraft(() => writeFile(article, baseline.replace('Choose the thing.', 'Choose the named control.')));
  await revise(f, plan, context);
  const updated = (await f.snapshot()).featurePlans[0];
  assert.equal(updated.decision.status, 'approved');
  assert.equal(updated.draft.state, 'valid', updated.draft.message);
  assert.equal(updated.draft.report.checks.findings.length, 0);
  assert.doesNotMatch(updated.draft.report.diff, /\+Existing author note/);
  assert.match(updated.draft.report.diff, /\+Choose the named control/);
  assert.equal(f.git(['diff', '--cached', '--name-only']), '');
  await f.workflow.dispatch('feature-open-diff', { id: plan.id, article: 'docs/article.md' });
  assert.equal(f.opened[0].file, article);
  assert.equal(await readFile(f.opened[0].before, 'utf8'), baseline);
  await assert.rejects(f.workflow.dispatch('feature-open-diff', { id: plan.id, article: '../outside.md' }), /changed article/);
  await f.workflow.dispatch('open-article', { article: 'docs/article.md', line: 3 });
  assert.deepEqual(f.opened[1], { file: article, line: 3 });
  await assert.rejects(f.workflow.dispatch('open-article', { article: '../outside.md', line: 3 }), /repository-relative/);
});

test('article revision retains one work identity across adjustments and rechecks changed files without revising old evidence', async t => {
  const f = await fixture(t, { authoring: true, revision: true });
  const article = path.join(f.workspace, 'docs', 'article.md');
  const initial = await revisionPlan(f);
  f.editDraft(async () => writeFile(article, (await readFile(article, 'utf8')).replace('Choose the thing.', 'Choose the control.')));
  await revise(f, initial, await revisionContext(f, initial));
  const completed = (await f.snapshot()).featurePlans[0];
  assert.equal(completed.draft.state, 'valid', completed.draft.message);
  const oldHash = completed.draft.report.files[0].sha256;
  await writeFile(article, (await readFile(article, 'utf8')) + '\nManual note.\n[New broken link](missing.md)\n');
  const stale = (await f.snapshot()).featurePlans[0];
  assert.equal(stale.draft.freshness.state, 'changed');
  const checks = await f.workflow.dispatch('feature-recheck', { id: initial.id });
  assert.ok(checks.checks.findings.some(item => item.severity === 'error'));
  const checked = (await f.snapshot()).featurePlans[0];
  assert.equal(checked.draft.report.files[0].sha256, oldHash);
  assert.ok(checked.draft.recheck);
  await f.workflow.dispatch('feature-follow-up', { id: initial.id, instructions: 'Remove the broken link. Preserve the manual note.', confirmed: true });
  const followUp = (await f.snapshot()).featurePlans[0];
  assert.equal(followUp.workId, initial.workId);
  assert.notEqual(followUp.id, initial.id);
  assert.equal(followUp.revision.previousPlanId, initial.id);
  assert.equal(followUp.decision, undefined);
  f.editDraft(async () => writeFile(article, (await readFile(article, 'utf8')).replace('[New broken link](missing.md)\n', '')));
  await revise(f, followUp, await revisionContext(f, followUp));
  const latest = (await f.snapshot()).featurePlans[0];
  assert.equal(latest.workId, initial.workId);
  assert.match(await readFile(article, 'utf8'), /Manual note/);
  assert.equal(latest.draft.report.checks.findings.length, 0);
  const reopened = await f.reopen({ featureOptions: f.options, editor: f.editor });
  assert.equal((await reopened.snapshot()).featurePlans[0].workId, initial.workId);
});

test('article revision rejects stale approval, expanded scope, and section changes outside the plan', async t => {
  const f = await fixture(t, { authoring: true, revision: true });
  const plan = await revisionPlan(f);
  const context = await revisionContext(f, plan);
  const article = path.join(f.workspace, 'docs', 'article.md');
  await writeFile(article, (await readFile(article, 'utf8')) + '\nChanged after confirmation preview.\n');
  await assert.rejects(revise(f, plan, context), /Documentation inputs differ/);
  assert.equal((await f.snapshot()).featurePlans[0].decision, undefined);
  assert.equal(f.tracked.length, 2);

  const wide = await fixture(t, { authoring: true, revision: true });
  const review = await wide.workflow.dispatch('review-launch', { article: 'docs/article.md', focus: 'both', channel: 'stable', confirmed: true });
  await wide.snapshot();
  const expanded = proposal();
  expanded.media = [];
  expanded.changes.push({ path: 'docs/other.md', action: 'update', description: 'Unapproved extra article.' });
  wide.setPlan(expanded);
  await wide.workflow.dispatch('feature-revision-launch', { reviewId: review.id, confirmed: true });
  assert.match((await wide.snapshot()).featurePlans[0].message, /reviewed article/);

  const before = '# Article\n\n## Selected\nOld content.\n\n## Other\nPreserve this.\n';
  const section = { startLine: 3, endLine: 5 };
  draftTools.assertSectionChanges(before, before.replace('Old content.', 'Improved content.'), section);
  assert.throws(() => draftTools.assertSectionChanges(before, before.replace('Preserve this.', 'Changed outside.'), section), /outside/);
});

test('revision follow-up keeps the confirmed alternate checkout instead of returning to the tooling checkout', async t => {
  const f = await fixture(t, { authoring: true, revision: true });
  const plan = await revisionPlan(f);
  const target = path.join(f.directory, 'authoring');
  await cp(f.workspace, target, { recursive: true });
  const article = path.join(target, 'docs', 'article.md');
  const context = await f.workflow.dispatch('feature-revision-context', { id: plan.id, planHash: plan.planHash, target });
  f.editDraft(async () => writeFile(article, (await readFile(article, 'utf8')).replace('Choose the thing.', 'Choose the control.')));
  await revise(f, plan, context);
  assert.equal((await f.snapshot()).featurePlans[0].draft.state, 'valid');
  await f.workflow.dispatch('feature-follow-up', { id: plan.id, instructions: 'Make the updated sentence concise.', confirmed: true });
  const followUp = (await f.snapshot()).featurePlans[0];
  assert.equal(followUp.revision.target, target);
  assert.equal(followUp.workId, plan.workId);
  const next = await f.workflow.dispatch('feature-revision-context', { id: followUp.id, planHash: followUp.planHash, target });
  assert.equal(next.preserveExistingEdits, true);
  assert.match(await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8'), /Choose the thing/);
});

test('native editor launcher uses argument arrays and reports unsupported hosts and failures', { skip: process.platform !== 'win32' }, async t => {
  const f = await fixture(t);
  const installation = path.join(f.directory, 'Code install');
  await mkdir(path.join(installation, 'bin'), { recursive: true });
  await mkdir(path.join(installation, 'resources', 'app', 'out'), { recursive: true });
  await writeFile(path.join(installation, 'bin', 'code.cmd'), '"%~dp0..\\Code.exe" "%~dp0..\\resources\\app\\out\\cli.js" %*');
  await writeFile(path.join(installation, 'resources', 'app', 'out', 'cli.js'), '');
  const executable = path.join(installation, 'Code.exe');
  const calls = [];
  const editor = await editorTools.createEditor({ executable, async run(...args) { calls.push(args); } });
  const file = path.join(f.directory, 'a & b.md');
  await editor.open({ file, line: 3 });
  assert.deepEqual(calls[0][1], [path.join(installation, 'resources', 'app', 'out', 'cli.js'), '--reuse-window', '--goto', `${file}:3`]);
  await editor.open({ file, before: path.join(f.directory, 'baseline.md') });
  assert.equal(calls[1][1][2], '--diff');
  assert.equal(calls[1][2].env.ELECTRON_RUN_AS_NODE, '1');
  await assert.rejects(editor.open({ file, line: -1 }), /Invalid editor/);
  const unsupported = await editorTools.createEditor({ executable: path.join(f.directory, 'node.exe') });
  assert.equal(unsupported.available, false);
  await assert.rejects(unsupported.open({ file }), /requires/);
  const failing = await editorTools.createEditor({ executable, async run() { throw new Error('CLI failed'); } });
  await assert.rejects(failing.open({ file }), /CLI failed/);
});

test('screenshot approval is separate from generation and exact approved bytes enter only a confirmed draft', async t => {
  const f = await fixture(t, { authoring: true });
  await f.launch();
  const plan = (await f.snapshot()).featurePlans[0];
  await assert.rejects(f.capture(plan), /approved plan/);
  await f.approve(plan);
  await assert.rejects(f.capture(plan, { confirmed: false }), /attended/);
  await f.capture(plan);
  const run = (await f.snapshot()).featurePlans[0].media[0];
  assert.equal(run.state, 'candidate');
  assert.equal(run.review, undefined);
  const asset = await f.workflow.asset(run.id);
  assert.deepEqual(await readFile(asset.file), f.captureBytes);
  assert.deepEqual((await f.draftContext(plan)).assets, []);
  await assert.rejects(f.review(run, { confirmed: false }), /human review/);
  await assert.rejects(f.review(run, { assetHash: 'b'.repeat(64) }), /preview changed/);
  await f.review(run);
  assert.equal(f.git(['status', '--porcelain']), '', 'Asset approval cannot copy files or edit articles.');
  const context = await f.draftContext(plan);
  assert.deepEqual(context.files, ['docs/article.md', 'docs/images/article/workflow-image.png']);
  await assert.rejects(f.draft(plan, { confirmed: false }), /confirmation/);
  f.editDraft(async () => {
    const file = path.join(f.workspace, 'docs', 'article.md');
    await writeFile(file, (await readFile(file, 'utf8')) + `\n${context.assets[0].markdown}\n`);
  });
  await f.draft(plan);
  const completed = (await f.snapshot()).featurePlans[0];
  assert.equal(completed.draft.report.pendingMedia.length, 0);
  assert.deepEqual(await readFile(path.join(f.workspace, 'docs', 'images', 'article', 'workflow-image.png')), f.captureBytes);
  assert.equal(completed.draft.report.files.length, 2);
  assert.equal(f.git(['diff', '--cached', '--name-only']), '');
  const reopened = await f.reopen({ featureOptions: f.options });
  assert.equal((await reopened.snapshot()).featurePlans[0].media[0].review.decision, 'approved');
});

test('rejected, changed, and failed screenshots never become approved draft assets', async t => {
  const rejected = await fixture(t, { authoring: true });
  await rejected.launch();
  const plan = (await rejected.snapshot()).featurePlans[0];
  await rejected.approve(plan);
  await rejected.capture(plan);
  const run = (await rejected.snapshot()).featurePlans[0].media[0];
  await rejected.review(run, { decision: 'rejected', altText: '' });
  await assert.rejects(rejected.review(run), /already saved/);
  assert.deepEqual((await rejected.draftContext(plan)).assets, []);
  await rejected.draft(plan);
  assert.equal((await rejected.snapshot()).featurePlans[0].draft.report.pendingMedia.length, 1);

  const stale = await fixture(t, { authoring: true });
  await stale.launch();
  const stalePlan = (await stale.snapshot()).featurePlans[0];
  await stale.approve(stalePlan);
  await stale.capture(stalePlan);
  const staleRun = (await stale.snapshot()).featurePlans[0].media[0];
  await stale.review(staleRun);
  const asset = await stale.workflow.asset(staleRun.id);
  await writeFile(asset.file, Buffer.from('Changed candidate'));
  await assert.rejects(stale.draftContext(stalePlan), /hash|validation/i);
  await assert.rejects(stale.workflow.asset(staleRun.id), /hash|validation/i);
  assert.equal((await stale.snapshot()).featurePlans[0].media[0].state, 'invalid');

  const failed = await fixture(t, { authoring: true });
  await failed.launch();
  const failedPlan = (await failed.snapshot()).featurePlans[0];
  await failed.approve(failedPlan);
  failed.failCapture();
  await failed.capture(failedPlan);
  const failure = (await failed.snapshot()).featurePlans[0].media[0];
  assert.equal(failure.state, 'execution-failed');
  assert.match(failure.message, /prerequisite unavailable/);
  await assert.rejects(failed.review(failure), /prerequisite unavailable/);
  assert.deepEqual((await failed.draftContext(failedPlan)).assets, []);
});

test('screenshot readiness, changed procedures, and output replacement are guarded', async t => {
  const f = await fixture(t, { authoring: true });
  await f.launch();
  const plan = (await f.snapshot()).featurePlans[0];
  await f.approve(plan);
  f.holdCapture();
  const launched = await f.capture(plan);
  const captureDirectory = path.join(f.home, 'extension-data', format, 'media-output', launched.id, 'waiting-capture');
  await mkdir(captureDirectory);
  await atomicJson(path.join(captureDirectory, 'readiness-request.json'), { schemaVersion: 1, token: 'b'.repeat(64), expiresAt: Date.now() + 10_000 });
  assert.ok((await f.snapshot()).featurePlans[0].media[0].readiness);
  await assert.rejects(f.workflow.dispatch('feature-media-ready', { id: launched.id, ready: true, confirmed: false }), /explicit/);
  await assert.rejects(f.draftContext(plan), /Finish or resolve/);
  await f.workflow.dispatch('feature-media-ready', { id: launched.id, ready: false, confirmed: true });
  assert.equal((await readJson(path.join(captureDirectory, 'readiness-response.json'))).ready, false);
  await assert.rejects(f.workflow.dispatch('feature-media-ready', { id: launched.id, ready: true, confirmed: true }), /No current/);
  await writeFile(path.join(f.workspace, 'build', 'storyboards', 'fixture.json'), '{"changed":true}');
  const helper = await createFeaturePlans(f.rawWorkflow.store, {}, f.options);
  await assert.rejects(helper.media.execute(path.join(captureDirectory, '..', 'request.json')), /procedure changed/);

  const replaced = await fixture(t, { authoring: true });
  await replaced.launch();
  const replacementPlan = (await replaced.snapshot()).featurePlans[0];
  await replaced.approve(replacementPlan);
  await replaced.capture(replacementPlan);
  await replaced.review((await replaced.snapshot()).featurePlans[0].media[0]);
  const context = await replaced.draftContext(replacementPlan);
  replaced.editDraft(async () => {
    const article = path.join(replaced.workspace, 'docs', 'article.md');
    await writeFile(article, (await readFile(article, 'utf8')) + `\n${context.assets[0].markdown}\n`);
    await writeFile(path.join(replaced.workspace, context.assets[0].path), 'not the approved bytes');
  });
  await replaced.draft(replacementPlan);
  assert.match((await replaced.snapshot()).featurePlans[0].draft.message, /exact approved bytes/);
});

test('unsupported media stays pending without starting a capture', async t => {
  const f = await fixture(t);
  await f.launch();
  const plan = (await f.snapshot()).featurePlans[0];
  await f.approve(plan);
  f.options.procedures.options = async () => ({ storyboards: [], builds: [], errors: [] });
  await assert.rejects(f.capture(plan), /No matching reviewed screenshot procedure/);
  assert.equal((await f.snapshot()).featurePlans[0].media.length, 0);
  assert.equal(f.tracked.length, 1);

  const video = await fixture(t);
  const withVideo = proposal();
  withVideo.media[0].kind = 'video';
  video.setPlan(withVideo);
  await video.launch();
  const videoPlan = (await video.snapshot()).featurePlans[0];
  await video.approve(videoPlan);
  const options = await video.workflow.dispatch('feature-media-options',
    { id: videoPlan.id, planHash: videoPlan.planHash, mediaId: 'workflow-image' });
  assert.deepEqual(options.storyboards, []);
  assert.match(options.errors[0], /Video remains pending/);
  assert.equal(video.tracked.length, 1);
});

test('feature plans require scoped changes and media proposals, never fabricated asset approvals', () => {
  assert.equal(plans.validatePlan(proposal()).media[0].status, 'proposed');
  const approved = proposal();
  approved.media[0].status = 'approved';
  assert.throws(() => plans.validatePlan(approved), /media identity/);
  const pending = proposal();
  pending.media[0].status = 'pending';
  assert.throws(() => plans.validatePlan(pending), /limitation/);
  const newArticle = proposal();
  newArticle.changes[0].action = 'create';
  assert.throws(() => plans.validatePlan(newArticle), /sitemap/);
  newArticle.changes.push({ path: 'build/sitemap.xml', action: 'update', description: 'Register the new article.' },
    { path: 'docs/agents/toc.json', action: 'update', description: 'Add the article to its content area.' });
  assert.equal(plans.validatePlan(newArticle).changes.length, 3);
  const outside = proposal();
  outside.changes[0].path = '../outside.md';
  assert.throws(() => plans.validatePlan(outside), /path/);
  const unverified = proposal();
  unverified.availability.status = 'unverified';
  assert.throws(() => plans.validatePlan(unverified), /public feature/);
});

test('plan citations accept captured local files and official update metadata but reject unrelated sources', async t => {
  const f = await fixture(t);
  const job = await f.launch();
  const request = await readJson(await f.rawWorkflow.store.file(path.join('feature-plans', job.id, 'request.json')));
  const plan = proposal();
  plan.sources.push(
    { url: pathToFileURL(path.join(f.workspace, 'docs', 'article.md')).href, note: 'Captured documentation context.' },
    { url: 'https://update.code.visualstudio.com/api/update/win32-x64-user/stable/latest', note: 'Public update metadata captured during research.' }
  );
  const context = { workspace: f.workspace, files: request.baseline.files };
  assert.equal(plans.validatePlan(plan, context), plan);
  assert.throws(() => plans.validatePlan(plan), /captured source snapshot/);
  plan.sources[1].url = pathToFileURL(path.join(f.directory, 'outside.md')).href;
  assert.throws(() => plans.validatePlan(plan, context), /outside the captured/);
  plan.sources[1].url = pathToFileURL(path.join(f.workspace, 'docs', 'missing.md')).href;
  assert.throws(() => plans.validatePlan(plan, context), /outside the captured/);
  plan.sources[1].url = 'file://untrusted-server/share/article.md';
  assert.throws(() => plans.validatePlan(plan, context), /local citations/);
  plan.sources.splice(1, 1);
  plan.sources[1].url = 'https://update.code.visualstudio.com/latest/win32-x64-user/stable';
  assert.throws(() => plans.validatePlan(plan, context), /unsupported source URL/);
  plan.sources[1].url = 'javascript:alert(1)';
  assert.throws(() => plans.validatePlan(plan, context), /unsupported source URL/);
});

test('feature planning and exact-plan approval do not edit articles, launch drafting, or disturb findings', async t => {
  const f = await fixture(t);
  await f.workflow.dispatch('launch', { scope: ['docs/article.md'], confirmed: true });
  await f.snapshot();
  const before = await f.rawWorkflow.store.read();
  const article = await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8');
  await assert.rejects(f.launch({ confirmed: false }), /Confirm/);
  await f.launch();
  const pending = await f.workflow.raw.snapshot({ verify: false });
  assert.equal(pending.featurePlans[0].canDecide, false);
  const record = (await f.snapshot()).featurePlans[0];
  assert.equal(record.plan.media.length, 1);
  const tasks = f.tracked.length;
  await assert.rejects(f.approve({ ...record, planHash: 'a'.repeat(64) }), /changed/);
  await f.approve(record);
  assert.equal((await f.snapshot()).featurePlans[0].decision.status, 'approved');
  await assert.rejects(f.approve(record), /already has a decision/);
  assert.equal(f.tracked.length, tasks);
  assert.equal(await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8'), article);
  assert.deepEqual((await f.rawWorkflow.store.read()).review, before.review);
  assert.deepEqual((await f.rawWorkflow.store.read()).coverage, before.coverage);
});

test('changed local sources, issue discussion, and plan bytes block approval without overwriting it', async t => {
  const local = await fixture(t);
  await local.launch();
  const record = (await local.snapshot()).featurePlans[0];
  await writeFile(path.join(local.workspace, 'docs', 'article.md'), '# Changed after planning\n');
  await assert.rejects(local.approve(record), /Stale plan/);
  assert.equal((await local.snapshot()).featurePlans[0].decision, undefined);
  await local.workflow.dispatch('feature-decide', { id: record.id, planHash: record.planHash, status: 'rejected',
    confirmed: true, reason: 'Reject the obsolete fixture proposal.' });
  assert.equal((await local.snapshot()).featurePlans[0].decision.status, 'rejected');

  const remote = await fixture(t);
  await remote.launch({ issue: remote.issue.url });
  const remoteRecord = (await remote.snapshot()).featurePlans[0];
  remote.issue.comments.push({ body: 'Changed requirements', id: 1 });
  await assert.rejects(remote.approve(remoteRecord), /source issue/);
  assert.equal((await remote.snapshot()).featurePlans[0].decision, undefined);

  const altered = await fixture(t);
  const job = await altered.launch();
  const original = (await altered.snapshot()).featurePlans[0];
  const changed = proposal(); changed.summary = 'Changed after the completion receipt.';
  await atomicJson(await altered.rawWorkflow.store.file(path.join('feature-plans', job.id, 'plan.json')), changed);
  await assert.rejects(altered.approve(original), /changed after completion/);
  assert.equal((await altered.snapshot()).featurePlans[0].canDecide, false);
});

test('source changes during planning and superseded proposals cannot gain approval', async t => {
  const changed = await fixture(t);
  changed.hold();
  const job = await changed.launch();
  const waiting = (await changed.snapshot()).featurePlans[0];
  assert.equal(waiting.waiting, true);
  assert.match(waiting.message, /Waiting for a validated planning result/);
  assert.doesNotMatch(waiting.message, /ENOENT/);
  await writeFile(path.join(changed.workspace, 'docs', 'article.md'), '# Changed during research\n');
  await assert.rejects(changed.complete(job), /Stale plan/);
  assert.equal((await changed.snapshot()).featurePlans[0].canDecide, false);

  const revised = await fixture(t);
  await revised.launch();
  const first = (await revised.snapshot()).featurePlans[0];
  const alternative = proposal(); alternative.summary = 'A revised proposal for the same feature.';
  revised.setPlan(alternative);
  await revised.launch();
  const latest = (await revised.snapshot()).featurePlans[0];
  await assert.rejects(revised.approve(first), /superseded/);
  await revised.approve(latest);
});

test('incomplete plans stay unapproved and no-change proposals remain explicit', async t => {
  const f = await fixture(t);
  const incomplete = proposal();
  Object.assign(incomplete, { outcome: 'incomplete', changes: [], media: [], limitations: ['Fixture source unavailable.'] });
  incomplete.availability.status = 'unverified';
  f.setPlan(incomplete);
  await f.launch();
  const record = (await f.snapshot()).featurePlans[0];
  assert.equal(record.canDecide, false);
  await assert.rejects(f.approve(record), /incomplete/);
  const noChange = proposal();
  Object.assign(noChange, { outcome: 'no-change', changes: [], media: [] });
  f.setPlan(noChange);
  await f.launch();
  const latest = (await f.snapshot()).featurePlans;
  assert.equal(latest.length, 1);
  assert.equal(latest[0].plan.outcome, 'no-change');
  await f.approve(latest[0]);
});

test('approved drafts require write consent and preserve unrelated edits while returning scoped diffs and checks', async t => {
  const f = await fixture(t, { authoring: true });
  await f.launch();
  const record = (await f.snapshot()).featurePlans[0];
  await assert.rejects(f.draftContext(record), /approved plan/);
  await f.approve(record);
  await writeFile(path.join(f.workspace, 'notes.txt'), 'Unrelated user work.');
  const before = await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8');
  await assert.rejects(f.draft(record, { confirmed: false }), /confirmation/);
  assert.equal(await readFile(path.join(f.workspace, 'docs', 'article.md'), 'utf8'), before);
  await f.draft(record);
  const result = (await f.snapshot()).featurePlans[0].draft;
  assert.equal(result.report.files.length, 1);
  assert.equal(result.report.files[0].path, 'docs/article.md');
  assert.match(result.report.diff, /\+Clarified fixture step/);
  assert.equal(result.report.pendingMedia[0].id, 'workflow-image');
  assert.equal(result.report.status, 'needs-attention', 'The existing broken link must remain visible in checks.');
  assert.equal(await readFile(path.join(f.workspace, 'notes.txt'), 'utf8'), 'Unrelated user work.');
  await assert.rejects(f.draft(record), /already exists/);
});

test('drafting refuses dirty planned files and branch changes before edits', async t => {
  const f = await fixture(t, { authoring: true });
  await f.launch();
  const record = (await f.snapshot()).featurePlans[0];
  await f.approve(record);
  const article = path.join(f.workspace, 'docs', 'article.md');
  const original = await readFile(article, 'utf8');
  await writeFile(article, original + '\nUser edit.\n');
  await assert.rejects(f.draftContext(record), /Documentation inputs differ|uncommitted changes/);
  await writeFile(article, original);
  const previousContext = await f.draftContext(record);
  const parent = f.git(['rev-parse', 'HEAD']);
  const tree = f.git(['rev-parse', 'HEAD^{tree}']);
  f.git(['update-ref', 'HEAD', f.git(['commit-tree', tree, '-p', parent], 'Fixture metadata change\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>\n')]);
  assert.equal((await f.draftContext(record)).reconfirm, true);
  await assert.rejects(f.workflow.dispatch('feature-draft-start', { id: record.id, planHash: record.planHash,
    target: f.workspace, branch: previousContext.branch, contextHash: previousContext.contextHash, confirmed: true }), /context changed/);
  f.holdDraft();
  await f.draft(record);
  f.git(['branch', '-m', 'other']);
  await assert.rejects(f.beginDraft(record), /branch changed/);
  assert.equal(await readFile(article, 'utf8'), original);
});

test('out-of-scope edits and new media references fail draft completion without reverting files', async t => {
  const outside = await fixture(t, { authoring: true });
  await outside.launch();
  const record = (await outside.snapshot()).featurePlans[0];
  await outside.approve(record);
  outside.editDraft(() => writeFile(path.join(outside.workspace, 'outside.txt'), 'Unexpected edit.'));
  await outside.draft(record);
  const failed = (await outside.snapshot()).featurePlans[0].draft;
  assert.equal(failed.state, 'execution-failed');
  assert.match(failed.message, /Unrelated working-copy content changed/);
  assert.equal(await readFile(path.join(outside.workspace, 'outside.txt'), 'utf8'), 'Unexpected edit.');

  const media = await fixture(t, { authoring: true });
  await media.launch();
  const mediaPlan = (await media.snapshot()).featurePlans[0];
  await media.approve(mediaPlan);
  media.editDraft(async () => {
    const file = path.join(media.workspace, 'docs', 'article.md');
    await writeFile(file, (await readFile(file, 'utf8')) + '\n![Unapproved image](new.png)\n');
  });
  await media.draft(mediaPlan);
  assert.match((await media.snapshot()).featurePlans[0].draft.message, /media references/);
});

test('new article diffs use the platform null device without staging files', async t => {
  const f = await fixture(t, { authoring: true });
  await writeFile(path.join(f.workspace, 'docs', 'new.md'), '# New fixture\n');
  const diff = draftTools.diff(f.workspace, ['docs/new.md'], ['docs/new.md']);
  assert.match(diff, /\+# New fixture/);
  assert.equal(f.git(['diff', '--cached', '--name-only']), '');
});

test('browser completes article review, grouped approval, editor diff, and same-item adjustments', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t, { authoring: true, revision: true });
  const plan = proposal();
  plan.title = 'Clarify article actions';
  plan.media = [];
  plan.changes[0].description = 'Clarity: name the control. Consistency: preserve the examples.';
  f.setPlan(plan);
  const article = path.join(f.workspace, 'docs', 'article.md');
  f.editDraft(async () => writeFile(article, (await readFile(article, 'utf8')).replace('Choose the thing.', 'Choose the control.')));
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
  await page.locator('#task-type:enabled').waitFor();
  await page.getByLabel('Task', { exact: true }).selectOption('review');
  await page.getByLabel('Article to review').fill('docs/article.md');
  await page.getByLabel('Particular concerns (optional)').fill('Keep the examples.');
  await page.getByRole('button', { name: 'Start article review', exact: true }).click();
  await page.getByRole('button', { name: 'Plan article update', exact: true }).waitFor({ timeout: 20_000 });
  await page.getByRole('button', { name: 'Plan article update', exact: true }).click();
  const approve = page.getByRole('button', { name: 'Approve and update article', exact: true });
  await approve.waitFor({ timeout: 20_000 });
  assert.ok(page.url().endsWith('/writing'));
  assert.equal(await page.getByRole('button', { name: 'Approve plan scope', exact: true }).count(), 0);
  assert.equal(f.tracked.length, 2);
  page.once('dialog', dialog => dialog.dismiss());
  await approve.click();
  await page.locator('#writing-reload:enabled').waitFor();
  assert.equal((await f.snapshot()).featurePlans[0].decision, undefined);
  page.once('dialog', async dialog => {
    assert.match(dialog.message(), /Clarity: name the control/);
    assert.match(dialog.message(), /Branch: main/);
    await dialog.accept();
  });
  await approve.click();
  await page.getByText('Draft saved for human review.', { exact: true }).waitFor({ timeout: 20_000 });
  assert.equal(f.tracked.length, 3, 'One overall confirmation launches exactly one article update.');
  await page.getByRole('button', { name: 'Open diff in editor', exact: true }).click();
  await page.locator('#writing-reload:enabled').waitFor();
  assert.equal(f.opened.length, 1);
  assert.equal(f.opened[0].file, article);
  assert.match(await readFile(f.opened[0].before, 'utf8'), /Choose the thing/);
  const workId = (await f.snapshot()).featurePlans[0].workId;
  await page.reload();
  await page.getByText('Draft saved for human review.', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Recheck current files', exact: true }).click();
  await page.getByText('Current local checks saved. Product and editorial review findings remain separate.', { exact: true }).waitFor();
  await page.getByText('Request further adjustments', { exact: true }).click();
  await page.getByLabel('Requested adjustments', { exact: true }).fill('Use a more concise action sentence.');
  await page.getByRole('button', { name: 'Plan adjustments', exact: true }).click();
  await approve.waitFor({ timeout: 20_000 });
  assert.equal((await f.snapshot()).featurePlans[0].workId, workId);
  assert.equal(await page.getByLabel('Update in an existing checkout').inputValue(), f.workspace);
  assert.deepEqual(errors, []);
});

test('browser reviews a screenshot candidate and confirms its separate draft handoff', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t, { authoring: true });
  await f.launch();
  const plan = (await f.snapshot()).featurePlans[0];
  await f.approve(plan);
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
  await page.goto(`${server.url}/writing`);
  await page.getByText('Optional media before drafting', { exact: true }).click();
  await page.getByRole('button', { name: 'Set up screenshot', exact: true }).click();
  await page.getByLabel('Capture procedure', { exact: true }).waitFor();
  assert.equal(f.tracked.length, 1, 'Inspecting prerequisites must not launch capture.');
  await page.getByRole('button', { name: 'Review capture procedure', exact: true }).click();
  const generate = page.getByRole('button', { name: 'Generate screenshot', exact: true });
  await generate.waitFor();
  page.once('dialog', dialog => dialog.dismiss());
  await generate.click();
  assert.equal(f.tracked.length, 1);
  page.once('dialog', dialog => dialog.accept());
  await generate.click();
  const approve = page.getByRole('button', { name: 'Approve screenshot', exact: true });
  await approve.waitFor({ timeout: 20_000 });
  assert.equal(await approve.isDisabled(), true);
  await page.getByLabel('Screenshot alt text', { exact: true }).fill('Screenshot showing the synthetic fixture control.');
  await page.waitForFunction(() => document.querySelector('.media-preview')?.naturalWidth === 8);
  page.once('dialog', dialog => dialog.accept());
  await approve.click();
  await page.getByText('Screenshot approved. Prepare draft will separately confirm copying these exact bytes.', { exact: true }).waitFor();
  assert.equal(f.git(['status', '--porcelain']), '');
  await page.reload();
  await page.getByText('Optional media before drafting', { exact: true }).click();
  await page.getByText('Screenshot approved. Prepare draft will separately confirm copying these exact bytes.', { exact: true }).waitFor();
  const context = await f.draftContext(plan);
  f.editDraft(async () => {
    const file = path.join(f.workspace, 'docs', 'article.md');
    await writeFile(file, (await readFile(file, 'utf8')) + `\n${context.assets[0].markdown}\n`);
  });
  page.once('dialog', async dialog => {
    assert.match(dialog.message(), /Copy exact approved screenshots/);
    assert.ok(dialog.message().includes('docs/images/article/workflow-image.png'));
    assert.ok(dialog.message().includes(context.assets[0].sha256));
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Prepare draft', exact: true }).click();
  await page.getByText('Draft saved; checks need attention.', { exact: true }).waitFor({ timeout: 20_000 });
  assert.equal(await page.getByText(/Media pending: workflow-image/).count(), 0);
  assert.deepEqual(errors, []);
});

test('browser proposes a feature plan with media, saves scope approval, and retains it after reload', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
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
  await page.goto(`${server.url}/writing`);
  await page.locator('#feature-description:enabled').waitFor();
  const requestBounds = await page.locator('#feature-description').boundingBox();
  const formBounds = await page.locator('#feature-form').boundingBox();
  assert.ok(requestBounds.width >= formBounds.width - 2, 'The documentation request must use the full form width.');
  assert.ok((await page.locator('#feature-issue').boundingBox()).y > requestBounds.y + requestBounds.height);
  await page.getByLabel('Documentation request', { exact: true }).fill('Explain the fixture feature');
  await page.getByRole('button', { name: 'Propose documentation plan', exact: true }).click();
  await page.getByRole('button', { name: 'Approve plan scope', exact: true }).waitFor();
  await page.getByRole('heading', { name: 'Media proposals', exact: true }).waitFor();
  await page.getByText('Placement: After the steps. Scenario: The control is visible in the fixture', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Approve plan scope', exact: true }).click();
  await page.getByText('Plan decision saved. Drafting and media generation have not started.', { exact: true }).waitFor();
  await page.reload();
  await page.locator('.plan-status').getByText('Approved', { exact: true }).waitFor();
  assert.equal(f.tracked.length, 1);
  assert.deepEqual(errors, []);
});

test('browser confirms drafting separately and retains the saved diff after reload', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t, { authoring: true });
  await f.launch();
  await f.approve((await f.snapshot()).featurePlans[0]);
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/writing`);
  await page.setViewportSize({ width: 1000, height: 800 });
  const prepare = page.getByRole('button', { name: 'Prepare draft', exact: true });
  await prepare.waitFor();
  page.once('dialog', dialog => dialog.dismiss());
  await prepare.click();
  await page.locator('#writing-reload:enabled').waitFor();
  assert.equal(f.tracked.length, 1, 'Cancelling write confirmation must not launch drafting.');
  page.once('dialog', async dialog => {
    assert.match(dialog.message(), /Branch: main/);
    assert.ok(dialog.message().includes(f.workspace));
    await dialog.accept();
  });
  await prepare.click();
  await page.getByText('Draft saved; checks need attention.', { exact: true }).waitFor({ timeout: 20_000 });
  assert.equal(await page.locator('#writing-request').evaluate(node => node.open), false);
  assert.equal(await page.locator('details[data-section$=":proposal"]').evaluate(node => node.open), false);
  assert.ok((await page.getByRole('button', { name: 'Open diff in editor', exact: true }).boundingBox()).y < 650, 'The primary draft action must be visible without the original plan obscuring it.');
  await page.getByText('Review draft diff', { exact: true }).click();
  assert.match(await page.locator('.feature-plan pre').innerText(), /\+Clarified fixture step/);
  await page.getByRole('button', { name: 'Refresh', exact: true }).click();
  await page.locator('#writing-reload:enabled').waitFor();
  assert.equal(await page.locator('.draft-diff').evaluate(node => node.open), true, 'Refreshing must preserve expanded draft details.');
  await page.getByText(/Media pending: workflow-image/).waitFor();
  await page.reload();
  await page.getByText('Draft saved; checks need attention.', { exact: true }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Prepare draft', exact: true }).count(), 0);
  assert.equal(f.tracked.length, 2);
});

test('an idle canvas discovers plans from another client and refreshes decisions when revealed', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/writing`);
  await page.getByText('Describe your documentation request to get started.', { exact: true }).waitFor();
  assert.equal(await page.locator('#feature-plans-section').isVisible(), false);
  await f.launch();
  await page.getByRole('button', { name: 'Approve plan scope', exact: true }).waitFor({ timeout: 20_000 });

  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await f.approve((await f.snapshot()).featurePlans[0]);
  assert.equal(await page.locator('.plan-status').getByText('Approved', { exact: true }).count(), 0);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.locator('.plan-status').getByText('Approved', { exact: true }).waitFor({ timeout: 5000 });
  assert.equal(f.tracked.length, 1, 'Discovery and visibility refresh must not start another task.');
});

test('writing and findings are separate pages with scoped status and preserved navigation state', {
  skip: !process.env.DOCS_ARTICLE_BROWSER && 'Set DOCS_ARTICLE_BROWSER to an installed browser.'
}, async t => {
  const f = await fixture(t);
  await f.launch();
  await f.snapshot();
  await f.workflow.dispatch('launch', { scope: ['docs/article.md'], confirmed: true });
  await f.snapshot();
  let browser;
  const server = await createWorkbenchServer(f.workflow.raw, async () => {}, () => {}, { assetEntries: articleAssets });
  f.beforeDispose(async () => { try { await browser?.close(); } finally { await server.close(); } });
  browser = await chromium.launchPersistentContext(path.join(f.directory, 'browser'), {
    executablePath: process.env.DOCS_ARTICLE_BROWSER, headless: true
  });
  const page = await browser.newPage();
  await page.route('**/*', route => new URL(route.request().url()).origin === server.url ? route.continue() : route.abort());
  await page.goto(`${server.url}/writing`);
  await page.getByRole('button', { name: 'Approve plan scope', exact: true }).waitFor();
  assert.equal(await page.locator('#findings-page').isVisible(), false);
  assert.equal(await page.locator('#writing-execution-indicator').innerText(), 'Plan ready for review · feature documentation');
  await page.getByText('New documentation request', { exact: true }).click();
  await page.getByLabel('Documentation request', { exact: true }).fill('Keep this unfinished request.');
  await page.getByLabel('Plan feedback (required to reject)', { exact: true }).fill('Keep this feedback while I inspect findings.');
  await page.getByRole('link', { name: 'Findings', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/findings');
  assert.equal(await page.locator('#writing-page').isVisible(), false);
  assert.equal(await page.locator('#feature-plans-section').isVisible(), false);
  assert.equal(await page.locator('#execution-indicator').innerText(), 'Findings updated · 1 article(s)');
  assert.equal(await page.locator('#task-type option[value=feature]').count(), 0);
  await page.getByLabel('Check type', { exact: true }).selectOption('links');
  await page.getByRole('link', { name: 'Docs writing', exact: true }).click();
  assert.equal(new URL(page.url()).pathname, '/writing');
  assert.equal(await page.getByLabel('Documentation request', { exact: true }).inputValue(), 'Keep this unfinished request.');
  assert.equal(await page.getByLabel('Plan feedback (required to reject)', { exact: true }).inputValue(), 'Keep this feedback while I inspect findings.');
  await page.goBack();
  assert.equal(await page.getByLabel('Check type', { exact: true }).inputValue(), 'links');
  await page.goForward();
  await page.reload();
  await page.getByRole('button', { name: 'Approve plan scope', exact: true }).waitFor();
  assert.equal(new URL(page.url()).pathname, '/writing');
  assert.equal(await page.getByRole('heading', { name: 'Docs writing', exact: true }).isVisible(), true);
  await page.setViewportSize({ width: 420, height: 800 });
  await page.getByText('New documentation request', { exact: true }).click();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);
  const appearances = [];
  for (const colorScheme of ['dark', 'light']) {
    await page.emulateMedia({ colorScheme });
    const appearance = await page.locator('.feature-plan').evaluate(node => ({
      background: getComputedStyle(node).backgroundColor,
      foreground: getComputedStyle(node).color
    }));
    assert.notEqual(appearance.background, appearance.foreground);
    appearances.push(appearance.background);
  }
  assert.notEqual(appearances[0], appearances[1], 'Writing cards must adapt to both color schemes.');
  assert.equal(f.tracked.length, 2, 'Navigation must not launch or duplicate work.');
  assert.equal((await f.snapshot()).featurePlans[0].decision, undefined, 'Navigation must not approve a plan.');
});
