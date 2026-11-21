import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright-core';
import plans from '../../../build/doc-plan.js';
import { createArticleFixture } from './article-fixture.mjs';
import { beginFeatureDraft, completeFeatureDraft, completeFeaturePlan } from './feature-plans.mjs';
import draftTools from '../../../build/doc-draft.js';
import { atomicJson, now, readJson } from './article-storage.mjs';
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

async function fixture(t, { authoring = false } = {}) {
  const f = await createArticleFixture();
  let dispose = async () => {};
  t.after(async () => { try { await dispose(); } finally { await f.dispose(); } });
  let plan = proposal();
  let held = false;
  let draftHeld = false;
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
  } } };
  const originalStart = f.session.rpc.tasks.startAgent;
  f.session.rpc.tasks.startAgent = async input => {
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
  const workflow = await f.reopen({ featureOptions: options });
  return { ...f, workflow, issue, git,
    setPlan(value) { plan = value; },
    hold() { held = true; },
    holdDraft() { draftHeld = true; },
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
      status: 'approved', confirmed: true, reason: 'Approve the scoped fixture proposal.' })
  };
}

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
  assert.ok((await page.getByText('Review draft diff', { exact: true }).boundingBox()).y < 650, 'The draft action must be visible without the original plan obscuring it.');
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
