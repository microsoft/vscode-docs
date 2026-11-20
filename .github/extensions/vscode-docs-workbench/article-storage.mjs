import { createHash, randomUUID } from 'node:crypto';
import { lstat, mkdir, open, readFile, realpath, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import audit from '../../../build/audit-state.js';
import findings from '../../../build/findings.js';
import repository from '../../../build/repository-paths.js';
import { replaceStateFile, WorkbenchError } from './state.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- All paths are derived from canonical workspace/private roots and checked for containment and symlinks. */

export const format = 'vscode-docs-article-checks';
export const version = 2;
export const checks = ['claims', 'links'];
export const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
export const hash = value => createHash('sha256').update(value).digest('hex');
export const now = () => new Date().toISOString();
export const homeDirectory = () => process.env.COPILOT_HOME || path.join(os.homedir(), '.copilot');
export const isTime = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) &&
  new Date(value).toISOString() === value;
export const hostStatuses = ['running', 'idle', 'completed', 'failed', 'cancelled'];
export const isHash = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);

export function scopePath(value) {
  const parts = typeof value === 'string' ? value.split('/') : [];
  if (typeof value !== 'string' || value.length > 500 ||
      !['docs', 'api', 'remote', 'release-notes'].includes(parts[0]) ||
      parts.some(part => !/^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/.test(part) || part.endsWith('.') ||
        /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part))) {
    throw new WorkbenchError('Choose a repository-relative article or folder from the list.');
  }
  return value;
}

export function articlePath(value) {
  scopePath(value);
  if (!value.endsWith('.md') || !value.includes('/')) throw new WorkbenchError('Choose a repository-relative Markdown article.');
  return value;
}

export function validateScope(scope) {
  if (!Array.isArray(scope) || !scope.length || scope.length > 5000 ||
      new Set(scope).size !== scope.length || scope.some((item, index) => index && scope.at(index - 1) >= item)) {
    throw new WorkbenchError('Scope must be a nonempty, sorted, unique list of article or folder paths.');
  }
  scope.forEach(scopePath);
  return scope;
}

export async function resolveScope(workspace, input) {
  if (!Array.isArray(input)) throw new WorkbenchError('Select one or more articles or folders.');
  const scope = validateScope([...new Set(input)].sort());
  for (const item of scope) await ownedPath(workspace, item.split('/').join(path.sep));
  const articles = repository.collectMarkdownFiles(workspace, scope)
    .map(file => path.relative(workspace, file).split(path.sep).join('/')).sort();
  if (!articles.length || articles.length > 5000) throw new WorkbenchError('Select a scope containing 1–5000 Markdown articles.');
  for (const article of articles) await resolveArticle(workspace, article);
  return { scope, articles };
}

export function within(root, target) {
  const relative = path.relative(root, target);
  return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

// Reject every symlink/junction component, not just an escaping final filename.
export async function ownedPath(root, relative, allowMissing = false) {
  const target = path.resolve(root, relative);
  if (!within(root, target)) throw new WorkbenchError('Path leaves its owned directory.');
  let current = root;
  for (const part of ['', ...path.relative(root, target).split(path.sep).filter(Boolean)]) {
    current = path.join(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink()) throw new WorkbenchError('Symlink or junction paths are not supported.');
    } catch (error) {
      if (allowMissing && error.code === 'ENOENT') return target;
      throw error;
    }
  }
  return target;
}

export async function resolveArticle(workspace, article) {
  articlePath(article);
  const target = await ownedPath(workspace, article.split('/').join(path.sep));
  if (!(await lstat(target)).isFile()) throw new WorkbenchError('Select one existing Markdown file.');
  return target;
}

export async function listArticles(workspace) {
  const articles = [];
  async function visit(relative) {
    const directory = await ownedPath(workspace, relative);
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) continue;
      const child = path.join(relative, entry.name);
      if (entry.isDirectory()) await visit(child);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        const article = child.split(path.sep).join('/');
        try { articlePath(article); articles.push(article); } catch { /* Not selectable. */ }
      }
    }
  }
  for (const folder of ['docs', 'api', 'remote', 'release-notes']) {
    try { await visit(folder); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return articles.sort();
}

export function validateRun(run) {
  if (!run || !uuid.test(run.id) || typeof run.ownerSessionId !== 'string' || !run.ownerSessionId ||
      !isTime(run.createdAt) || !['starting', 'acknowledged', 'uncertain', 'not-started'].includes(run.launch) ||
      (run.agentId !== undefined && (typeof run.agentId !== 'string' || !run.agentId)) ||
      (run.launch === 'acknowledged' && !run.agentId) ||
      ['error', 'syncError'].some(key => Reflect.get(run, key) !== undefined && typeof Reflect.get(run, key) !== 'string') ||
      ['acknowledgedAt', 'resolvedAt'].some(key => Reflect.get(run, key) !== undefined && !isTime(Reflect.get(run, key)))) {
    throw new WorkbenchError('Unrecognized or corrupt article run reference.', 500);
  }
  validateScope(run.scope);
  validateScope(run.articles);
  run.articles.forEach(articlePath);
  if (run.articles.some(article => !run.scope.some(item => item === article || article.startsWith(`${item}/`))) ||
      (run.ingestedHash !== undefined && !isHash(run.ingestedHash))) throw new WorkbenchError('Invalid execution scope or ingestion reference.');
  if (run.observation && (!hostStatuses.includes(run.observation.status) || !isTime(run.observation.observedAt) ||
      !isTime(run.observation.startedAt) ||
      ['completedAt', 'idleSince'].some(key => Reflect.get(run.observation, key) !== undefined && !isTime(Reflect.get(run.observation, key))) ||
      (run.observation.error !== undefined && typeof run.observation.error !== 'string'))) {
    throw new WorkbenchError('Corrupt host observation.', 500);
  }
  return run;
}

export async function atomicJson(file, value) {
  const temporary = `${file}.${randomUUID()}.pending`;
  try {
    const handle = await open(temporary, 'wx', 0o600);
    try {
      await handle.writeFile(JSON.stringify(value, null, 2));
      await handle.sync();
    } finally { await handle.close(); }
    await replaceStateFile(temporary, file);
  } finally { await rm(temporary, { force: true }); }
}

export async function readBytes(file, maximum = 64_000_000) {
  const info = await lstat(file);
  if (!info.isFile() || info.isSymbolicLink() || info.size > maximum) throw new WorkbenchError('Invalid or oversized private artifact.');
  return readFile(file);
}

export async function readJson(file, maximum) { return JSON.parse((await readBytes(file, maximum)).toString('utf8')); }

export async function createArticleStore(workspace, home = homeDirectory(), { readOnly = false } = {}) {
  workspace = await realpath(workspace);
  home = path.resolve(home);
  if (!readOnly) await mkdir(home, { recursive: true });
  home = await realpath(home);
  if (within(workspace, home) || within(home, workspace)) throw new WorkbenchError('Private article state must be outside the documentation checkout and its ancestors.');
  const relative = path.join('extension-data', format, hash(process.platform === 'win32' ? workspace.toLowerCase() : workspace), 'inbox-v2');
  const directory = await ownedPath(home, relative, !readOnly);
  if (!readOnly) await mkdir(directory, { recursive: true, mode: 0o700 });
  await ownedPath(home, relative);
  const stateFile = path.join(directory, 'inbox.json');
  async function file(relative, missing = true) { return ownedPath(directory, relative, missing); }
  async function read() {
    let state;
    try { state = await readJson(await file('inbox.json', false)); }
    catch (error) {
      if (error.code === 'ENOENT') return { format, version, workspace, runs: [], review: audit.createEmptyState(), coverage: [] };
      throw error;
    }
    return validate(state);
  }
  function validate(state) {
    if (!state || typeof state !== 'object' || Array.isArray(state) ||
        state.format !== format || state.version !== version || state.workspace !== workspace ||
        Object.keys(state).some(key => !['format', 'version', 'workspace', 'runs', 'review', 'coverage'].includes(key)) ||
        !Array.isArray(state.runs) || new Set(state.runs.map(run => run.id)).size !== state.runs.length) {
      throw new WorkbenchError('Unrecognized or corrupt article state. It has not been overwritten.', 500);
    }
    state.runs.forEach(validateRun);
    audit.validateState(state.review);
    if (state.review.proposals.length || !Array.isArray(state.coverage) ||
        new Set(state.coverage.map(entry => entry.article)).size !== state.coverage.length) {
      throw new WorkbenchError('Corrupt inbox coverage or unexpected proposals.');
    }
    for (const entry of state.coverage) {
      articlePath(entry.article);
      const run = state.runs.find(run => run.id === entry.runId);
      if (!run?.articles.includes(entry.article) || run.ingestedHash !== entry.reportHash || !isHash(entry.articleHash) ||
          !Array.isArray(entry.findingIds) || entry.findingIds.some(id => !isHash(id)) ||
          new Set(entry.findingIds).size !== entry.findingIds.length ||
          !entry.report || Object.hasOwn(entry.report, 'findings')) throw new WorkbenchError('Corrupt inbox coverage reference.');
      findings.validateReport({ ...entry.report, findings: [] });
      if (JSON.stringify(entry.report.checks) !== JSON.stringify(checks) ||
          JSON.stringify(entry.report.scanPaths) !== JSON.stringify([entry.article]) || entry.report.productManifest) {
        throw new WorkbenchError('Unsupported coverage check scope.');
      }
    }
    return state;
  }
  async function update(change) {
    if (readOnly) throw new WorkbenchError('Verification workers cannot write private state.');
    const lockFile = await file('inbox.lock');
    let lock;
    try { lock = await open(lockFile, 'wx', 0o600); }
    catch (error) {
      if (error.code === 'EEXIST') throw new WorkbenchError('Article state is busy. Do not remove a lock until its writer is known to have stopped.', 409);
      throw error;
    }
    try {
      const state = await read();
      const result = await change(state);
      validate(state);
      await file('inbox.json');
      await atomicJson(stateFile, state);
      return result;
    } finally { await lock.close(); await rm(lockFile); }
  }
  async function artifact(id, name, missing = true) {
    if (!uuid.test(id) || !['request.json', 'report.json', 'receipt.json', 'execution.lock'].includes(name)) {
      throw new WorkbenchError('Invalid artifact identity.');
    }
    return file(path.join('runs', id, name), missing);
  }
  return { workspace, home, directory, stateFile, read, update, file, artifact };
}
