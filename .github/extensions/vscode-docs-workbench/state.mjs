import { createHash, randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

export const dispositions = ['untriaged', 'ready', 'in-progress', 'needs-review', 'blocked', 'done', 'not-needed'];
export const workflows = ['review', 'document', 'close-comment', 'screenshot', 'video', 'implement'];
export const queues = ['pulls', 'tpis', 'issues', 'media'];
const identifier = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

export class WorkbenchError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

export function text(value, name, maximum = 2000) {
  if (typeof value !== 'string' || !value.trim() || value.length > maximum) {
    throw new WorkbenchError(`${name} must be nonempty text (up to ${maximum} characters).`);
  }
  return value.trim();
}

export function itemKey(value) {
  if (typeof value !== 'string' || (!/^[a-z\d][a-z\d-]*\/(?!\.{1,2}:)[a-z\d_.-]+:(?:issue|pr):[1-9]\d*$/i.test(value) &&
      !(value.startsWith('media:') && identifier.test(value.slice(6))))) {
    throw new WorkbenchError('Invalid work item identity.');
  }
  return value;
}

export function milestoneName(value) {
  if (typeof value !== 'string' || !/^\d+\.\d+\.\d+$/.test(value)) {
    throw new WorkbenchError('Choose a release milestone such as 1.145.0.');
  }
  return value;
}

export function initialState(workspace, account) {
  return {
    format: 'vscode-docs-workbench', version: 1, workspace, account,
    milestone: '1.145.0', hiddenBoardColumns: [], records: {}, media: [], cache: {}, operations: {}
  };
}

export function validateState(state, workspace, account) {
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  if (!object(state) || state.format !== 'vscode-docs-workbench' || state.version !== 1 ||
      state.workspace !== workspace || state.account !== account || !object(state.records) ||
      !object(state.cache) || !object(state.operations) || !Array.isArray(state.media)) {
    throw new WorkbenchError('Unrecognized or corrupt workbench state. Existing data has not been overwritten.', 500);
  }
  milestoneName(state.milestone);
  if (state.hiddenBoardColumns !== undefined && (!Array.isArray(state.hiddenBoardColumns) ||
      state.hiddenBoardColumns.some(status => !dispositions.includes(status)) ||
      new Set(state.hiddenBoardColumns).size !== state.hiddenBoardColumns.length)) {
    throw new WorkbenchError('Corrupt board column preferences. Existing data has not been overwritten.', 500);
  }
  for (const [key, record] of Object.entries(state.records)) {
    itemKey(key);
    if (!object(record) || !dispositions.includes(record.disposition) || typeof record.note !== 'string' ||
        !Array.isArray(record.links) || !record.links.every(link => typeof link === 'string') ||
        !Array.isArray(record.runs)) throw new WorkbenchError(`Corrupt state for ${key}.`, 500);
    record.links.forEach(itemKey);
    for (const field of ['archivedAt', 'restoredAt', 'completedAt']) {
      if (record[field] !== undefined && (typeof record[field] !== 'string' || !Number.isFinite(Date.parse(record[field])))) {
        throw new WorkbenchError(`Corrupt ${field} for ${key}.`, 500);
      }
    }
    if (record.item !== undefined) {
      const item = record.item;
      if (!object(item) || item.key !== key || typeof item.title !== 'string' || !item.title.trim() ||
          !['pr', 'issue', 'screenshot', 'video', 'media'].includes(item.kind) ||
          !queues.includes(item.queue) || typeof item.sourceVersion !== 'string' ||
          !Array.isArray(item.labels) || !item.labels.every(value => typeof value === 'string') ||
          !Array.isArray(item.assignees) || !item.assignees.every(value => typeof value === 'string') ||
          (item.url !== undefined && typeof item.url !== 'string') ||
          (item.repo !== undefined && typeof item.repo !== 'string') ||
          (item.number !== undefined && (!Number.isInteger(item.number) || item.number < 1)) ||
          (item.author !== undefined && item.author !== null && typeof item.author !== 'string') ||
          ['state', 'updatedAt', 'createdAt', 'reviewDecision', 'scenario', 'mediaStatus']
            .some(field => item[field] !== undefined && typeof item[field] !== 'string') ||
          (item.draft !== undefined && typeof item.draft !== 'boolean') ||
          (item.target !== undefined && !['desktop', 'agents', 'browser'].includes(item.target)) ||
          (item.metadataUnavailable !== undefined && typeof item.metadataUnavailable !== 'boolean')) {
        throw new WorkbenchError(`Corrupt saved item metadata for ${key}.`, 500);
      }
    }
    if (record.archivedAt && (!record.item || !['done', 'not-needed'].includes(record.disposition))) {
      throw new WorkbenchError(`Corrupt archive entry for ${key}.`, 500);
    }
    if (record.assets !== undefined && (!Array.isArray(record.assets) || record.assets.some(asset =>
      !object(asset) || !identifier.test(asset.id) || typeof asset.file !== 'string' ||
      !path.isAbsolute(asset.file) || typeof asset.description !== 'string' ||
      !['.png', '.webm', '.mp4'].includes(asset.extension) || typeof asset.approved !== 'boolean'))) {
      throw new WorkbenchError(`Corrupt media attachments for ${key}.`, 500);
    }
    for (const run of record.runs) {
      if (!object(run) || typeof run.id !== 'string' || !workflows.includes(run.workflow) ||
          typeof run.sessionId !== 'string' || typeof run.status !== 'string' ||
          typeof run.startedAt !== 'string' || typeof run.sourceVersion !== 'string' ||
          (run.agentId !== undefined && typeof run.agentId !== 'string')) {
        throw new WorkbenchError(`Corrupt workflow history for ${key}.`, 500);
      }
    }
  }
  for (const item of state.media) {
    if (!object(item) || !/^media:/.test(item.key) || !['screenshot', 'video'].includes(item.kind) ||
        !['desktop', 'agents', 'browser'].includes(item.target) || typeof item.title !== 'string' ||
        typeof item.scenario !== 'string') throw new WorkbenchError('Corrupt media task.', 500);
    itemKey(item.key);
  }
  for (const [queue, cache] of Object.entries(state.cache)) {
    if (!['pulls', 'issues', 'tpis'].includes(queue) || !object(cache) || !Array.isArray(cache.items) ||
        typeof cache.fetchedAt !== 'string' || (cache.error !== undefined && typeof cache.error !== 'string') ||
        (queue === 'tpis' && typeof cache.milestone !== 'string')) {
      throw new WorkbenchError('Corrupt queue cache.', 500);
    }
    for (const item of cache.items) {
      if (!object(item) || typeof item.title !== 'string' || typeof item.url !== 'string' ||
          (item.author !== undefined && item.author !== null && (typeof item.author !== 'string' || !item.author.trim())) ||
          !Array.isArray(item.labels) || !item.labels.every(label => typeof label === 'string') ||
          !Array.isArray(item.assignees) || !item.assignees.every(login => typeof login === 'string') ||
          typeof item.sourceVersion !== 'string') {
        throw new WorkbenchError('Corrupt cached work item.', 500);
      }
      itemKey(item.key);
    }
  }
  for (const [id, operation] of Object.entries(state.operations)) {
    if (!object(operation) || !identifier.test(id) || operation.id !== id || typeof operation.comment !== 'string' ||
        typeof operation.title !== 'string' || typeof operation.applyInvalid !== 'boolean' ||
        typeof operation.expected !== 'string' || !Number.isFinite(Date.parse(operation.expiresAt)) ||
        !['preview', 'executing', 'failed', 'complete'].includes(operation.status) ||
        !['comment', 'invalid'].includes(operation.mode) || !object(operation.steps) ||
        !['comment', 'label', 'close'].every(step => typeof operation.steps[step] === 'boolean')) {
      throw new WorkbenchError('Corrupt close-action history.', 500);
    }
    itemKey(operation.key);
  }
  return state;
}

export function recordFor(state, key) {
  itemKey(key);
  return state.records[key] ??= { disposition: 'untriaged', note: '', links: [], runs: [] };
}

export async function replaceStateFile(source, target, renameFile = rename) {
  for (let attempt = 0; ; attempt++) {
    try {
      await renameFile(source, target);
      return;
    } catch (error) {
      if (!['EPERM', 'EACCES', 'EBUSY'].includes(error.code) || attempt >= 5) throw error;
      await new Promise(resolve => setTimeout(resolve, 20 * 2 ** attempt));
    }
  }
}

export async function createStore(workspace, account, home = process.env.COPILOT_HOME || path.join(os.homedir(), '.copilot')) {
  const identity = createHash('sha256').update(JSON.stringify(['github.com', workspace, account])).digest('hex');
  const directory = path.join(home, 'extension-data', 'vscode-docs-workbench', identity);
  await mkdir(directory, { recursive: true });
  const file = path.join(directory, 'state.json');
  const lock = path.join(directory, 'state.lock');
  async function read() {
    let content;
    try {
      content = await readFile(file, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') return initialState(workspace, account);
      throw new WorkbenchError(`Cannot read workbench state: ${error.message}`, 500);
    }
    try {
      return validateState(JSON.parse(content), workspace, account);
    } catch (error) {
      throw new WorkbenchError(`Cannot load workbench state: ${error.message}`, 500);
    }
  }
  async function update(change) {
    let handle;
    const deadline = Date.now() + 5000;
    while (!handle) {
      try {
        handle = await open(lock, 'wx');
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
        if (Date.now() >= deadline) {
          throw new WorkbenchError(`Workbench storage is busy. Retry later; if a crashed process left ${lock}, verify it has stopped before removing that lock.`, 409);
        }
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    const temporary = path.join(directory, `${randomUUID()}.tmp`);
    try {
      const state = await read();
      const result = await change(state);
      validateState(state, workspace, account);
      const output = await open(temporary, 'wx');
      try {
        await output.writeFile(JSON.stringify(state, null, 2));
        await output.sync();
      } finally {
        await output.close();
      }
      await replaceStateFile(temporary, file);
      return result;
    } finally {
      await rm(temporary, { force: true });
      await handle.close();
      await rm(lock);
    }
  }
  return { read, update, directory };
}
