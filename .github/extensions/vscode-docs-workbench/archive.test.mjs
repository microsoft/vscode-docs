import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createStore, recordFor, replaceStateFile } from './state.mjs';
import { createArchive, captureItem } from './archive.mjs';
import { createWorkbench } from './workbench.mjs';
import { combinedItems, visibleItems } from './presentation.mjs';

const timestamp = '2026-11-03T10:00:00.000Z';
const mediaKey = 'media:00000000-0000-4000-8000-000000000004';
const key = number => `microsoft/vscode-docs:pr:${number}`;
function item(repo, kind, number, title) {
  return {
    key: `${repo}:${kind}:${number}`, repo, kind, number, title, author: 'contributor',
    state: 'open', url: `https://github.com/${repo}/${kind === 'pr' ? 'pull' : 'issues'}/${number}`,
    labels: [], assignees: [], sourceVersion: 'revision', updatedAt: timestamp, createdAt: timestamp
  };
}
async function fixture(t) {
  const home = await mkdtemp(path.join(os.tmpdir(), 'docs-archive-test-'));
  t.after(() => rm(home, { recursive: true, force: true }));
  const store = await createStore('workspace', 'maintainer', home);
  const queues = {
    pulls: [item('microsoft/vscode-docs', 'pr', 1, 'Completed PR'), item('microsoft/vscode-docs', 'pr', 6, 'Completed but running')],
    issues: [item('microsoft/vscode-docs', 'issue', 2, 'No docs needed'), item('microsoft/vscode-docs', 'issue', 5, 'Unfinished issue')],
    tpis: [item('microsoft/vscode', 'issue', 3, 'Completed TPI')],
    media: [{ key: mediaKey, title: 'Completed screenshot', kind: 'screenshot', target: 'desktop',
      scenario: 'Open settings.', sourceVersion: mediaKey, createdAt: timestamp }]
  };
  await store.update(state => {
    for (const name of ['pulls', 'issues', 'tpis']) state.cache[name] = { items: queues[name], fetchedAt: timestamp, milestone: '1.145.0' };
    state.media = queues.media;
    for (const source of Object.values(queues).flat()) {
      const record = recordFor(state, source.key);
      record.disposition = source.number === 5 ? 'ready' : source.number === 2 ? 'not-needed' : 'done';
      record.note = 'Retained rationale and notes.';
      record.links = ['microsoft/vscode:issue:99'];
    }
    state.records[key(6)].runs.push({ id: 'active', agentId: 'agent-active', workflow: 'review',
      sessionId: 'session', status: 'running', sourceVersion: 'revision', startedAt: timestamp });
  });
  const calls = { github: 0, launch: 0, message: 0 };
  let hostTasks = [];
  const github = {
    queue: async name => queues[name],
    milestones: async () => [],
    detail: async () => { calls.github++; throw new Error('Remote source is unavailable'); },
    api: async () => { calls.github++; throw new Error('No GitHub writes permitted'); }
  };
  const session = { sessionId: 'session', rpc: { tasks: {
    list: async () => ({ tasks: hostTasks }),
    startAgent: async () => { calls.launch++; throw new Error('No agent launch permitted'); },
    sendMessage: async () => { calls.message++; throw new Error('No agent message permitted'); }
  } } };
  const workbench = await createWorkbench({ session, store, github, workspace: 'workspace', account: 'maintainer' });
  return { home, store, queues, calls, workbench, hostTasks(value) { hostTasks = value; } };
}
async function archive(workbench) {
  const preview = await workbench.dispatch('archive-preview');
  return workbench.dispatch('archive-completed', { id: preview.id, confirmed: true });
}

test('archive preview covers all queues, requires confirmation, and skips unfinished or active work', async t => {
  const { store, workbench, calls } = await fixture(t);
  const preview = await workbench.dispatch('archive-preview');
  assert.equal(preview.items.length, 4);
  assert.equal(preview.skippedActive, 1);
  assert.deepEqual(new Set(preview.items.map(item => item.queue)), new Set(['pulls', 'issues', 'tpis', 'media']));
  assert.equal((await workbench.snapshot()).history.length, 0);
  await assert.rejects(workbench.dispatch('archive-completed', { id: preview.id, confirmed: false }), /confirmation/);
  assert.equal((await workbench.snapshot()).history.length, 0);
  const state = await workbench.dispatch('archive-completed', { id: preview.id, confirmed: true });
  assert.equal(state.history.length, 4);
  assert.equal(state.archiveCandidateCount, 0);
  assert.equal(state.archiveSkippedActive, 1);
  assert.equal(state.records['microsoft/vscode-docs:issue:5'].disposition, 'ready');
  assert.equal(state.records[key(6)].archivedAt, undefined);
  assert.equal(state.records[key(1)].disposition, 'done');
  assert.equal(state.records[key(1)].note, 'Retained rationale and notes.');
  assert.deepEqual(state.records[key(1)].links, ['microsoft/vscode:issue:99']);
  assert.equal((await store.read()).records[mediaKey].item.kind, 'screenshot');
  assert.deepEqual(calls, { github: 0, launch: 0, message: 0 });
});

test('History survives source disappearance and milestone changes, and restores retain status and metadata', async t => {
  const { home, store, queues, workbench, calls } = await fixture(t);
  await archive(workbench);
  queues.pulls = [];
  queues.issues = [];
  queues.tpis = [];
  await workbench.dispatch('milestone', { milestone: '1.146.0' });
  const state = await workbench.snapshot();
  assert.equal(state.history.length, 4);
  assert.equal(state.history.find(item => item.key === key(1)).title, 'Completed PR');
  const detail = await workbench.dispatch('detail', { key: key(1) });
  assert.equal(detail.sourceSnapshot, true);
  assert.equal(detail.title, 'Completed PR');
  const restored = await workbench.dispatch('restore-archived', { key: key(1) });
  assert.equal(restored.history.length, 3);
  assert.equal(restored.records[key(1)].disposition, 'done');
  assert.equal(restored.records[key(1)].archivedAt, undefined);
  assert.equal(restored.trackedItems[0].title, 'Completed PR');
  const retained = combinedItems(restored.queues, restored.trackedItems);
  assert.ok(retained.some(item => item.key === key(1)));
  assert.ok(retained.some(item => item.key === 'microsoft/vscode-docs:issue:5'));
  assert.ok(retained.some(item => item.key === key(6)));
  assert.equal((await workbench.dispatch('detail', { key: key(1) })).sourceSnapshot, true);
  const restoredNotNeeded = await workbench.dispatch('restore-archived', { key: 'microsoft/vscode-docs:issue:2' });
  assert.equal(restoredNotNeeded.records['microsoft/vscode-docs:issue:2'].disposition, 'not-needed');
  assert.equal(restoredNotNeeded.records['microsoft/vscode-docs:issue:2'].note, 'Retained rationale and notes.');
  const reopened = await createStore('workspace', 'maintainer', home);
  assert.equal((await reopened.read()).records[key(1)].disposition, 'done');
  await assert.rejects(workbench.dispatch('restore-archived', { key: key(1) }), /not archived/);
  assert.equal(calls.github, 0);
  assert.equal((await store.read()).milestone, '1.146.0');
});

test('stale previews are atomic and do not archive changed or newly running tasks', async t => {
  const { store, workbench } = await fixture(t);
  const preview = await workbench.dispatch('archive-preview');
  await store.update(state => { state.records[key(1)].note = 'Changed after preview.'; });
  await assert.rejects(workbench.dispatch('archive-completed', { id: preview.id, confirmed: true }), /changed/);
  assert.equal((await workbench.snapshot()).history.length, 0);
  const newer = await workbench.dispatch('archive-preview');
  await store.update(state => { state.records[key(1)].runs.push({ id: 'new', workflow: 'review', sessionId: 'session',
    status: 'starting', sourceVersion: 'revision', startedAt: timestamp }); });
  await assert.rejects(workbench.dispatch('archive-completed', { id: newer.id, confirmed: true }), /changed/);
  assert.equal((await workbench.snapshot()).history.length, 0);
});

test('cross-repository TPIs retain their source queue through archive, milestone changes, and restore', async t => {
  const { queues, store, workbench } = await fixture(t);
  const tpi = item('other/product', 'issue', 3, 'Other repository TPI');
  queues.tpis.push(tpi);
  await workbench.dispatch('refresh');
  await workbench.dispatch('update-item', { key: tpi.key, disposition: 'done' });
  assert.equal((await store.read()).records[tpi.key].item.queue, 'tpis');
  await archive(workbench);
  queues.tpis = [];
  await workbench.dispatch('milestone', { milestone: '1.146.0' });
  const history = (await workbench.snapshot()).history.find(item => item.key === tpi.key);
  assert.equal(history.queue, 'tpis');
  assert.equal(history.repo, 'other/product');
  const restored = await workbench.dispatch('restore-archived', { key: tpi.key });
  assert.equal(restored.trackedItems.find(item => item.key === tpi.key).queue, 'tpis');
  assert.equal((await workbench.dispatch('detail', { key: tpi.key })).sourceSnapshot, true);
  assert.equal(captureItem({ ...item('microsoft/vscode-docs', 'issue', 99, 'Docs TPI'), labels: ['testplan-item'] }).queue, 'tpis');
});

test('previews expire safely or are invalid after a provider restart', async t => {
  const { store } = await fixture(t);
  let clock = Date.parse(timestamp);
  const archive = createArchive(store, () => clock);
  const preview = await archive.preview();
  clock += 11 * 60000;
  await assert.rejects(archive.archiveCompleted({ id: preview.id, confirmed: true }), /expired/);
  await assert.rejects(createArchive(store).archiveCompleted({ id: preview.id, confirmed: true }), /expired/);
  assert.equal(Object.values((await store.read()).records).some(record => record.archivedAt), false);
});

test('legacy completed records without source metadata are explicitly identified rather than lost', async t => {
  const { store, workbench } = await fixture(t);
  const legacy = 'microsoft/vscode-docs:issue:900099';
  await store.update(state => { recordFor(state, legacy).disposition = 'done'; });
  const preview = await workbench.dispatch('archive-preview');
  const item = preview.items.find(item => item.key === legacy);
  assert.equal(item.metadataUnavailable, true);
  assert.match(item.title, /Source title unavailable/);
  await workbench.dispatch('archive-completed', { id: preview.id, confirmed: true });
  assert.equal((await workbench.dispatch('detail', { key: legacy })).metadataUnavailable, true);
  assert.equal((await store.read()).records[legacy].item.key, legacy);
});

test('refresh retains tracked item metadata before an item leaves the source queue', async t => {
  const { queues, store, workbench } = await fixture(t);
  assert.equal((await store.read()).records[key(1)].item, undefined);
  queues.pulls = [];
  await workbench.dispatch('refresh');
  assert.equal((await store.read()).records[key(1)].item.title, 'Completed PR');
  const preview = await workbench.dispatch('archive-preview');
  assert.equal(preview.items.find(item => item.key === key(1)).metadataUnavailable, undefined);
});

test('archived tasks cannot launch or follow up work; resumed host work returns to the active board', async t => {
  const fixtureState = await fixture(t);
  const { store, workbench, calls } = fixtureState;
  await store.update(state => { state.records[key(1)].runs.push({ id: 'past', agentId: 'agent-past', workflow: 'review',
    sessionId: 'session', status: 'idle', sourceVersion: 'revision', startedAt: timestamp }); });
  await archive(workbench);
  await assert.rejects(workbench.dispatch('launch', { key: key(1), workflow: 'review' }), /Restore/);
  await assert.rejects(workbench.dispatch('message', { key: key(1), runId: 'past', message: 'Continue' }), /Restore/);
  fixtureState.hostTasks([{ id: 'agent-past', status: 'running' }]);
  await workbench.dispatch('sync');
  assert.equal((await store.read()).records[key(1)].archivedAt, undefined);
  assert.ok((await workbench.snapshot()).trackedItems.some(item => item.key === key(1)));
  assert.deepEqual(calls, { github: 0, launch: 0, message: 0 });
});

test('unfinished status changes restore archived work and completion timestamps are preserved by plain Restore', async t => {
  const { store, workbench } = await fixture(t);
  await workbench.dispatch('update-item', { key: key(1), disposition: 'ready' });
  await workbench.dispatch('update-item', { key: key(1), disposition: 'done' });
  const completedAt = (await store.read()).records[key(1)].completedAt;
  assert.ok(completedAt);
  await archive(workbench);
  await workbench.dispatch('restore-archived', { key: key(1) });
  assert.equal((await store.read()).records[key(1)].completedAt, completedAt);
  await archive(workbench);
  await workbench.dispatch('update-item', { key: key(1), disposition: 'ready' });
  const record = (await store.read()).records[key(1)];
  assert.equal(record.disposition, 'ready');
  assert.equal(record.archivedAt, undefined);
  assert.equal(record.completedAt, undefined);
  assert.ok(record.restoredAt);
});

test('archive metadata and dates are validated without overwriting existing state', async t => {
  const { store } = await fixture(t);
  for (const invalid of [
    { archivedAt: 'invalid' },
    { archivedAt: timestamp },
    { archivedAt: timestamp, item: { ...captureItem(item('microsoft/vscode-docs', 'pr', 1, 'PR')), key: 'other' } },
    { completedAt: true },
    { item: { ...captureItem(item('microsoft/vscode-docs', 'pr', 1, 'PR')), number: {} } }
  ]) {
    await assert.rejects(store.update(state => Object.assign(state.records[key(1)], invalid)), /Corrupt/);
    assert.equal((await store.read()).records[key(1)].archivedAt, undefined);
  }
});

test('History filters archived work independently of hidden columns and active views exclude it', async t => {
  const { workbench } = await fixture(t);
  const state = await archive(workbench);
  const filters = { search: '', label: '', disposition: '', showDone: false, mine: false, githubState: '', draft: '', review: '', source: '' };
  assert.equal(visibleItems(state.history, state.records, 'history', 'maintainer', filters, ['done', 'not-needed']).length, 4);
  assert.equal(visibleItems(state.history, state.records, 'history', 'maintainer', { ...filters, search: 'rationale' }).length, 4);
  assert.equal(visibleItems(state.history, state.records, 'history', 'maintainer', { ...filters, source: 'tpis' }).length, 1);
  assert.equal(visibleItems(state.history, state.records, 'history', 'maintainer', { ...filters, search: '#1' }).length, 1);
  const active = visibleItems(combinedItems(state.queues), state.records, 'board', 'maintainer', filters);
  assert.deepEqual(new Set(active.map(item => item.key)), new Set([key(6), 'microsoft/vscode-docs:issue:5']));
});

test('restored items do not duplicate current queue items and empty previews cannot archive work', async t => {
  const { workbench } = await fixture(t);
  await archive(workbench);
  let state = await workbench.dispatch('restore-archived', { key: key(1) });
  assert.equal(combinedItems(state.queues, state.trackedItems).filter(item => item.key === key(1)).length, 1);
  state = await archive(workbench);
  assert.equal(state.archiveCandidateCount, 0);
  const empty = await workbench.dispatch('archive-preview');
  assert.deepEqual(empty.items, []);
  await assert.rejects(workbench.dispatch('archive-completed', { id: empty.id, confirmed: true }), /no completed items/);
  assert.equal((await workbench.snapshot()).history.length, 4);
});

test('atomic replacement retries transient sharing violations but reports permanent or unrelated failures', async () => {
  let attempts = 0;
  await replaceStateFile('temporary', 'target', async () => {
    if (++attempts < 3) throw Object.assign(new Error('File is temporarily shared'), { code: 'EPERM' });
  });
  assert.equal(attempts, 3);
  attempts = 0;
  const missing = Object.assign(new Error('Missing temporary file'), { code: 'ENOENT' });
  await assert.rejects(replaceStateFile('temporary', 'target', async () => { attempts++; throw missing; }), error => error === missing);
  assert.equal(attempts, 1);
  attempts = 0;
  const denied = Object.assign(new Error('Permission remains denied'), { code: 'EACCES' });
  await assert.rejects(replaceStateFile('temporary', 'target', async () => { attempts++; throw denied; }), error => error === denied);
  assert.equal(attempts, 6);
});

test('concurrent archive-state readers and writers preserve valid atomic snapshots', async t => {
  const { store } = await fixture(t);
  await Promise.all([
    ...Array.from({ length: 5 }, () => (async () => {
      for (let index = 0; index < 20; index++) assert.equal((await store.read()).format, 'vscode-docs-workbench');
    })()),
    (async () => {
      for (let index = 0; index < 10; index++) {
        await store.update(state => { state.records[key(1)].note = `Saved note ${index}`; });
      }
    })()
  ]);
  assert.equal((await store.read()).records[key(1)].note, 'Saved note 9');
});
