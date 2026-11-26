import { mkdir, mkdtemp, realpath, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import claims from '../../../build/checks/check-claims.js';
import { createArticleWorkflow } from './article-workflow.mjs';
import { runArticleCheck } from './article-runner.mjs';
import { now, within } from './article-storage.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Fixtures use exclusively owned OS-temp directories; optional screenshots use explicitly selected private directories outside the checkout. */

const checkout = await realpath(fileURLToPath(new URL('../../../', import.meta.url)));

export async function resolveFixtureTemporaryRoot(directory = tmpdir()) {
  const resolved = await realpath(directory);
  if (within(checkout, resolved) || !(await stat(resolved)).isDirectory()) {
    throw new Error('The OS temporary directory must be outside the checkout.');
  }
  return resolved;
}

export async function resolveScreenshotRoot(directory) {
  if (typeof directory !== 'string' || !path.isAbsolute(directory)) {
    throw new Error('Screenshot output requires an explicit absolute private directory.');
  }
  const resolved = await realpath(directory);
  if (within(checkout, resolved) || within(resolved, checkout) || !(await stat(resolved)).isDirectory()) {
    throw new Error('Screenshot output must be outside the checkout and its ancestors.');
  }
  return resolved;
}

export async function createArticleFixture(options = {}) {
  const directory = await mkdtemp(path.join(await resolveFixtureTemporaryRoot(), 'vscode-docs-article-'));
  try { return await initializeFixture(directory, options); }
  catch (error) {
    await rm(directory, { recursive: true, force: true });
    throw error;
  }
}

async function initializeFixture(directory, { execute = true, content, articles = {}, acknowledgement = 'normal', workflowOptions = {} }) {
  const workspace = path.join(directory, 'repo');
  const home = path.join(directory, 'private');
  await mkdir(path.join(workspace, 'docs'), { recursive: true });
  await mkdir(path.join(workspace, 'data', 'variables'), { recursive: true });
  await mkdir(path.join(workspace, 'build'), { recursive: true });
  await writeFile(path.join(workspace, 'data', 'variables', 'product.yml'), 'name: Fixture\n');
  await writeFile(path.join(workspace, 'build', 'feature-lifecycle.json'), '{"features":{}}');
  await writeFile(path.join(workspace, 'docs', 'article.md'), content ??
    '# Fixture article\n\n`setting(fixture.setting)`\n\n[Missing local page](missing.md)\n');
  for (const [article, bytes] of Object.entries(articles)) {
    const file = path.join(workspace, article);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, bytes);
  }
  const productionCheck = claims.createClaimChecker();
  const check = (root, files, options) => productionCheck(root, files, { ...options, sourceRevision: 'fixture-revision' });
  check.batch = (root, files, options, batchOptions) =>
    productionCheck.batch(root, files, { ...options, sourceRevision: 'fixture-revision' }, batchOptions);
  const tracked = [];
  const requests = [];
  const executions = new Set();
  let listCalls = 0;
  let workflow;
  const session = {
    sessionId: 'fixture-owner',
    rpc: { tasks: {
      async list() { listCalls++; return { tasks: structuredClone(tracked) }; },
      async startAgent(request) {
        requests.push(request);
        const id = request.description.slice('Docs article check '.length);
        const task = { type: 'agent', id: `agent-${id}`, description: request.description, status: 'running', startedAt: now() };
        tracked.push(task);
        if (execute) {
          const execution = runArticleCheck(await workflow.store.artifact(id, 'request.json'), { workspace, home, check });
          executions.add(execution);
          try { await execution; } finally { executions.delete(execution); }
          task.status = 'completed';
          task.completedAt = now();
        }
        if (acknowledgement === 'lost') throw new Error('Synthetic lost acknowledgement');
        if (acknowledgement === 'timeout') return new Promise(() => {});
        return { agentId: task.id };
      },
      async getProgress() {
        return { progress: { type: 'agent', recentActivity: [{
          message: '✓ fixture runner (synthetic host) <img src=x onerror=alert(1)>', timestamp: now()
        }] } };
      }
    } }
  };
  const options = { session, workspace, home, checkerOptions: { sourceRevision: 'fixture-revision' },
    acknowledgementTimeout: acknowledgement === 'timeout' ? 20 : 10_000, ...workflowOptions };
  workflow = await createArticleWorkflow(options);
  const workflows = new Set([workflow]);
  function settled(value) {
    return {
      ...value, raw: value,
      snapshot: () => value.verifiedSnapshot(),
      async dispatch(action, input) {
        const result = await value.dispatch(action, input);
        if (action !== 'refresh' && action !== 'poll') return result;
        await value.whenVerified();
        return value.snapshot({ verify: false });
      }
    };
  }
  return {
    directory, workspace, home, check, session, workflow: settled(workflow), rawWorkflow: workflow, tracked, requests,
    async reopen(changes = {}) {
      const instance = await createArticleWorkflow({ ...options, ...changes });
      workflows.add(instance);
      return settled(instance);
    },
    get listCalls() { return listCalls; },
    launch: (scope = ['docs/article.md']) => workflow.dispatch('launch', { scope, confirmed: true }),
    async dispose() {
      await Promise.all([...workflows].map(value => value.dispose()));
      await Promise.allSettled([...executions]);
      await rm(directory, { recursive: true, force: true });
    }
  };
}
