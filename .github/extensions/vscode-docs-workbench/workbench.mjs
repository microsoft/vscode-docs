import { randomUUID } from 'node:crypto';
import { open, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { dispositions, itemKey, milestoneName, recordFor, text, WorkbenchError } from './state.mjs';
import { createClosingActions } from './closing.mjs';
import { createWorkflows } from './workflows.mjs';

export async function createWorkbench({ session, store, github, workspace, account }) {
  const workflows = createWorkflows({ session, store, github, workspace });
  const closing = createClosingActions(github, store, account);
  let refreshing = false;
  async function snapshot() {
    const state = await store.read();
    return {
      ...state, sessionId: session.sessionId, refreshing,
      storageDirectory: store.directory,
      queues: {
        pulls: state.cache.pulls?.items || [],
        issues: state.cache.issues?.items || [],
        tpis: state.cache.tpis?.milestone === state.milestone ? state.cache.tpis.items : [],
        media: state.media
      }
    };
  }
  async function refresh() {
    if (refreshing) throw new WorkbenchError('A refresh is already running.', 409);
    refreshing = true;
    try {
      const state = await store.read();
      const results = await Promise.all(['pulls', 'issues', 'tpis'].map(async name => {
        try {
          return { name, items: await github.queue(name, state.milestone) };
        } catch (error) {
          return { name, error: error.message };
        }
      }));
      await store.update(current => {
        for (const result of results) {
          const previous = current.cache[result.name];
          if (result.error) {
            if (previous) previous.error = result.error;
            else current.cache[result.name] = { items: [], fetchedAt: '', milestone: state.milestone, error: result.error };
          } else if (result.name !== 'tpis' || current.milestone === state.milestone) {
            current.cache[result.name] = { items: result.items, fetchedAt: new Date().toISOString(), milestone: state.milestone };
          }
        }
      });
      return snapshot();
    } finally {
      refreshing = false;
    }
  }
  async function detail(key) {
    itemKey(key);
    const state = await store.read();
    const item = key.startsWith('media:') ? state.media.find(candidate => candidate.key === key) : await github.detail(key);
    if (!item) throw new WorkbenchError('Work item not found.', 404);
    return {
      ...item, record: state.records[key] || { disposition: 'untriaged', note: '', links: [], runs: [] },
      mediaDirectory: await workflows.mediaRoot(key)
    };
  }
  async function updateItem({ key, disposition, note, link }) {
    itemKey(key);
    if (disposition !== undefined && !dispositions.includes(disposition)) throw new WorkbenchError('Invalid workflow status.');
    if (note !== undefined && (typeof note !== 'string' || note.length > 6000)) throw new WorkbenchError('Notes must be text of at most 6000 characters.');
    if (link !== undefined) {
      itemKey(link);
      if (link === key) throw new WorkbenchError('An item cannot link to itself.');
    }
    await store.update(state => {
      const record = recordFor(state, key);
      if (disposition === 'not-needed' && !(note ?? record.note).trim()) throw new WorkbenchError('Record a reason before marking documentation not needed.');
      if (disposition !== undefined) record.disposition = disposition;
      if (note !== undefined) record.note = note;
      if (link && !record.links.includes(link)) {
        record.links.push(link);
        const related = recordFor(state, link);
        if (!related.links.includes(key)) related.links.push(key);
      }
    });
    return snapshot();
  }
  async function createMedia({ title, scenario, kind, target, link }) {
    title = text(title, 'Media title', 200);
    scenario = text(scenario, 'Scenario', 6000);
    if (!['screenshot', 'video'].includes(kind) || !['desktop', 'agents', 'browser'].includes(target)) throw new WorkbenchError('Choose a supported media type and target.');
    if (link) itemKey(link);
    const key = `media:${randomUUID()}`;
    await store.update(state => {
      state.media.push({ key, title, scenario, kind, target, sourceVersion: key, createdAt: new Date().toISOString(), mediaStatus: 'ready-to-capture' });
      const record = recordFor(state, key);
      if (link) {
        record.links.push(link);
        recordFor(state, link).links.push(key);
      }
    });
    return { key };
  }
  async function attachMedia({ key, file, description }) {
    itemKey(key);
    description = text(description, 'Media description', 1000);
    if (typeof file !== 'string' || !path.isAbsolute(file)) throw new WorkbenchError('Supply an absolute capture path.');
    const root = await workflows.mediaRoot(key);
    const resolved = await realpath(file);
    const relative = path.relative(root, resolved);
    if (relative.startsWith('..') || path.isAbsolute(relative)) throw new WorkbenchError('Captures must be inside this task\'s private media output directory.');
    const extension = path.extname(resolved).toLowerCase();
    if (!['.png', '.webm', '.mp4'].includes(extension) || !(await stat(resolved)).isFile()) throw new WorkbenchError('Attach a PNG, WebM, or MP4 capture.');
    const handle = await open(resolved, 'r');
    let header;
    try {
      const buffer = Buffer.alloc(12);
      const read = await handle.read(buffer, 0, 12, 0);
      header = buffer.subarray(0, read.bytesRead);
    } finally {
      await handle.close();
    }
    if ((extension === '.png' && !header.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) ||
        (extension === '.webm' && !header.subarray(0, 4).equals(Buffer.from('1a45dfa3', 'hex'))) ||
        (extension === '.mp4' && header.subarray(4, 8).toString() !== 'ftyp')) throw new WorkbenchError('The capture does not match its file type.');
    const id = randomUUID();
    await store.update(state => {
      const record = recordFor(state, key);
      (record.assets ??= []).push({ id, file: resolved, description, extension, approved: false });
      record.disposition = 'needs-review';
      const media = state.media.find(item => item.key === key);
      if (media) media.mediaStatus = 'awaiting-visual-review';
    });
    return { id, status: 'awaiting-visual-review' };
  }
  async function approveMedia({ key, id, confirmed }) {
    if (confirmed !== true) throw new WorkbenchError('Confirm actual visual inspection before approving media.');
    await store.update(state => {
      const record = recordFor(state, itemKey(key));
      const asset = record.assets?.find(candidate => candidate.id === id);
      if (!asset) throw new WorkbenchError('Capture not found.', 404);
      asset.approved = true;
      if (record.assets.every(candidate => candidate.approved)) {
        const media = state.media.find(item => item.key === key);
        if (media) media.mediaStatus = 'approved';
      }
    });
    return snapshot();
  }
  async function asset(id) {
    const state = await store.read();
    for (const [key, record] of Object.entries(state.records)) {
      const found = record.assets?.find(candidate => candidate.id === id);
      if (!found) continue;
      const root = await workflows.mediaRoot(key);
      const file = await realpath(found.file);
      const relative = path.relative(root, file);
      if (relative.startsWith('..') || path.isAbsolute(relative)) throw new WorkbenchError('Capture path no longer resolves inside its task directory.', 403);
      return { ...found, file };
    }
    throw new WorkbenchError('Capture not found.', 404);
  }
  async function dispatch(action, input = {}) {
    switch (action) {
      case 'refresh': return refresh();
      case 'sync': await workflows.sync(); return snapshot();
      case 'detail': return detail(input.key);
      case 'update-item': return updateItem(input);
      case 'create-media': return createMedia(input);
      case 'attach-media': return attachMedia(input);
      case 'approve-media': return approveMedia(input);
      case 'launch': itemKey(input.key); return workflows.launch(input);
      case 'message': itemKey(input.key); return workflows.message(input);
      case 'abandon-launch': itemKey(input.key); return workflows.abandon(input);
      case 'milestone':
        await store.update(state => { state.milestone = milestoneName(input.milestone); });
        return refresh();
      case 'close-preview': return closing.preview(input);
      case 'close-renew': return closing.renew(input);
      case 'close-confirm': return closing.execute(input);
      default: throw new WorkbenchError('Unknown workbench action.', 404);
    }
  }
  return { snapshot, dispatch, asset, milestones: github.milestones };
}
