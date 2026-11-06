import { createHash, randomUUID } from 'node:crypto';
import { itemKey, WorkbenchError } from './state.mjs';

const completed = new Set(['done', 'not-needed']);
const activeRuns = new Set(['starting', 'running', 'launch-uncertain']);
const itemFields = ['repo', 'number', 'url', 'author', 'state', 'updatedAt', 'createdAt',
  'draft', 'reviewDecision', 'scenario', 'target', 'mediaStatus', 'metadataUnavailable'];

export function sourceQueue(key) {
  if (key.startsWith('media:')) return 'media';
  if (key.includes(':pr:')) return 'pulls';
  return key.startsWith('microsoft/vscode-docs:issue:') ? 'issues' : 'tpis';
}

export function captureItem(item) {
  const saved = {
    key: item.key, title: item.title, kind: item.kind,
    queue: item.queue || (item.labels?.includes('testplan-item') ? 'tpis' : sourceQueue(item.key)),
    sourceVersion: item.sourceVersion || item.key, labels: [...(item.labels || [])],
    assignees: [...(item.assignees || [])]
  };
  for (const field of itemFields) if (item[field] !== undefined) saved[field] = item[field];
  return saved;
}

export function knownItem(state, key) {
  return state.media.find(item => item.key === key) ||
    Object.values(state.cache).flatMap(cache => cache.items).find(item => item.key === key);
}

export function rememberItem(record, item) {
  if (item && !record.archivedAt) record.item = captureItem(item);
}

export function hasActiveWork(record) {
  return record.runs.some(run => activeRuns.has(run.status));
}

export function canArchive(record) {
  return completed.has(record.disposition) && !record.archivedAt && !hasActiveWork(record);
}

export function restoreRecord(record, timestamp = new Date().toISOString()) {
  delete record.archivedAt;
  record.restoredAt = timestamp;
}

export function setDisposition(record, disposition) {
  if (completed.has(disposition)) {
    if (!completed.has(record.disposition)) record.completedAt = new Date().toISOString();
  } else {
    delete record.completedAt;
    if (record.archivedAt) restoreRecord(record);
  }
  record.disposition = disposition;
}

function describeItem(state, key, record) {
  const item = knownItem(state, key) || record.item;
  if (item) return captureItem(item);
  const [repo, kind, number] = key.split(':');
  return captureItem({
    key, title: `Source title unavailable (${key})`, metadataUnavailable: true,
    kind: key.startsWith('media:') ? 'media' : kind,
    ...(!key.startsWith('media:') ? {
      repo, number: Number(number),
      url: `https://github.com/${repo}/${kind === 'pr' ? 'pull' : 'issues'}/${number}`
    } : {})
  });
}

function revision(record) {
  return createHash('sha256').update(JSON.stringify(record)).digest('hex');
}

export function archiveSummary(state) {
  const entries = Object.entries(state.records);
  return {
    history: entries.filter(([, record]) => record.archivedAt).map(([key, record]) => ({
      ...record.item, key, archivedAt: record.archivedAt, completedAt: record.completedAt
    })).sort((left, right) => right.archivedAt.localeCompare(left.archivedAt) || left.key.localeCompare(right.key)),
    trackedItems: entries.filter(([, record]) => !record.archivedAt && record.item)
      .map(([, record]) => record.item),
    archiveCandidateCount: entries.filter(([, record]) => canArchive(record)).length,
    archiveSkippedActive: entries.filter(([, record]) =>
      completed.has(record.disposition) && !record.archivedAt && hasActiveWork(record)).length
  };
}

export function createArchive(store, now = Date.now) {
  const previews = new Map();
  async function preview() {
    for (const [id, value] of previews) if (value.expiresAt <= now()) previews.delete(id);
    const state = await store.read();
    const entries = Object.entries(state.records).filter(([, record]) => canArchive(record));
    const id = randomUUID();
    const expiresAt = now() + 10 * 60000;
    previews.set(id, { expiresAt, entries: entries.map(([key, record]) => ({ key, revision: revision(record) })) });
    return {
      id, expiresAt: new Date(expiresAt).toISOString(),
      items: entries.map(([key, record]) => ({ ...describeItem(state, key, record), disposition: record.disposition })),
      skippedActive: Object.values(state.records).filter(record =>
        completed.has(record.disposition) && !record.archivedAt && hasActiveWork(record)).length
    };
  }
  async function archiveCompleted({ id, confirmed }) {
    if (confirmed !== true) throw new WorkbenchError('Explicit confirmation is required to archive completed work.');
    const preview = previews.get(id);
    if (!preview || preview.expiresAt <= now()) throw new WorkbenchError('The archive preview expired. Preview the completed items again.', 409);
    if (!preview.entries.length) throw new WorkbenchError('There are no completed items in this preview.');
    await store.update(state => {
      for (const entry of preview.entries) {
        const record = state.records[entry.key];
        if (!record || !canArchive(record) || revision(record) !== entry.revision) {
          throw new WorkbenchError('The completed work changed. Preview the archive again; no items were archived.', 409);
        }
      }
      const timestamp = new Date(now()).toISOString();
      for (const { key } of preview.entries) {
        const record = state.records[key];
        record.item = describeItem(state, key, record);
        record.archivedAt = timestamp;
      }
    });
    previews.delete(id);
    return { archived: preview.entries.length };
  }
  async function restore({ key }) {
    itemKey(key);
    await store.update(state => {
      const record = state.records[key];
      if (!record?.archivedAt) throw new WorkbenchError('This task is not archived. Refresh History.', 409);
      restoreRecord(record, new Date(now()).toISOString());
    });
    return { restored: key };
  }
  return { preview, archiveCompleted, restore };
}
