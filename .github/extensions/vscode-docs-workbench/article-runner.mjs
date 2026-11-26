import { open, mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import claims from '../../../build/checks/check-claims.js';
import findings from '../../../build/checks/findings.js';
import { articlePath, atomicJson, createArticleStore, format, hash, isHash, now, readJson, resolveArticle, uuid, validateScope, version } from './article-storage.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Inputs and outputs are validated workflow-owned paths, never paths extracted from article content. */

export const trustedWorkspace = fileURLToPath(new URL('../../../', import.meta.url));

export function validateRequest(request, workspace) {
  if (!request || request.format !== format || request.version !== version || request.workspace !== workspace ||
      !uuid.test(request.id) || typeof request.ownerSessionId !== 'string' || !request.ownerSessionId ||
      Object.keys(request).some(key => !['format', 'version', 'workspace', 'id', 'ownerSessionId', 'scope', 'articles'].includes(key)) ||
      !Array.isArray(request.articles) || request.articles.some(article => !article || !isHash(article.sha256) ||
        Object.keys(article).some(key => !['path', 'sha256'].includes(key)))) throw new Error('Invalid article check request.');
  validateScope(request.scope);
  validateScope(request.articles.map(article => article.path));
  for (const article of request.articles) {
    articlePath(article.path);
    if (!request.scope.some(item => item === article.path || article.path.startsWith(`${item}/`))) throw new Error('Request scope mismatch.');
  }
  return request;
}

export async function runArticleCheck(requestFile, { workspace = trustedWorkspace, home, check = claims.createClaimChecker() } = {}) {
  const store = await createArticleStore(workspace, home);
  const id = path.basename(path.dirname(requestFile));
  const expected = await store.artifact(id, 'request.json', false);
  if (path.resolve(requestFile) !== expected) throw new Error('Request is not in this workflow-owned artifact directory.');
  const request = validateRequest(await readJson(expected), store.workspace);
  if (request.id !== id) throw new Error('Request identity mismatch.');
  const run = (await store.read()).runs.find(candidate => candidate.id === id);
  if (!run || run.ownerSessionId !== request.ownerSessionId || JSON.stringify(run.scope) !== JSON.stringify(request.scope) ||
      JSON.stringify(run.articles) !== JSON.stringify(request.articles.map(article => article.path)) || run.launch === 'not-started') {
    throw new Error('Request does not match its saved run reference.');
  }
  const receiptFile = await store.artifact(id, 'receipt.json');
  const lockFile = await store.artifact(id, 'execution.lock');
  const lock = await open(lockFile, 'wx', 0o600);
  const startedAt = now();
  const requestHash = hash(JSON.stringify(request));
  try {
    try { await readJson(receiptFile); throw new Error('This run already has a receipt. Do not execute it again.'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    return await execute();
  } finally { await lock.close(); await rm(lockFile); }
  async function execute() {
    try {
      await assertInputs('after launch');
      // One bounded task, with individual checker fingerprints so unrelated articles stay fresh.
      const reports = (check.batch
        ? check.batch(store.workspace, request.articles.map(article => article.path), { links: true })
        : request.articles.map(article => check(store.workspace, [article.path], { links: true })))
        .map(report => findings.validateReport(report));
      await assertInputs('during the check');
      const reportFile = await store.artifact(id, 'report.json');
      await atomicJson(reportFile, { format, version, reports });
      const checkerExitCode = reports.some(report => report.findings.some(finding => finding.severity === 'error')) ? 1 : 0;
      await atomicJson(receiptFile, {
        format, version, id, ownerSessionId: request.ownerSessionId, requestHash, startedAt, finishedAt: now(),
        outcome: 'report', checkerExitCode, reportHash: hash(await readFile(reportFile))
      });
      return checkerExitCode;
    } catch (error) {
      await atomicJson(receiptFile, {
        format, version, id, ownerSessionId: request.ownerSessionId, requestHash, startedAt, finishedAt: now(),
        outcome: 'execution-failed', error: error.message
      });
      throw error;
    }
  }
  async function assertInputs(when) {
    for (const input of request.articles) {
      const article = await resolveArticle(store.workspace, input.path);
      if (hash(await readFile(article)) !== input.sha256) throw new Error(`Article changed ${when}: ${input.path}. Start a new check.`);
    }
  }
}

export async function prepareRequest(store, run) {
  const articles = [];
  for (const article of run.articles) {
    articles.push({ path: article, sha256: hash(await readFile(await resolveArticle(store.workspace, article))) });
  }
  const file = await store.artifact(run.id, 'request.json');
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  await store.artifact(run.id, 'request.json');
  await atomicJson(file, {
    format, version, id: run.id, workspace: store.workspace, ownerSessionId: run.ownerSessionId,
    scope: run.scope, articles
  });
  return file;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length !== 4 || process.argv[2] !== '--request') throw new Error('Usage: node article-runner.mjs --request <owned-request.json>');
    process.exitCode = await runArticleCheck(process.argv[3]);
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 2; }
}
