import { mkdir, mkdtemp, realpath, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import claims from '../../../build/check-claims.js';
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

async function initializeFixture(directory, { execute = true, content, articles = {}, acknowledgement = 'normal' }) {
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
  const check = (root, files, options) => claims.checkClaims(root, files, { ...options, sourceRevision: 'fixture-revision' });
  const tracked = [];
  const requests = [];
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
          await runArticleCheck(await workflow.store.artifact(id, 'request.json'), { workspace, home, check });
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
  workflow = await createArticleWorkflow({ session, workspace, home, check, acknowledgementTimeout: acknowledgement === 'timeout' ? 20 : 10_000 });
  return {
    directory, workspace, home, check, session, workflow, tracked, requests,
    get listCalls() { return listCalls; },
    launch: (scope = ['docs/article.md']) => workflow.dispatch('launch', { scope, confirmed: true }),
    dispose: () => rm(directory, { recursive: true, force: true })
  };
}
