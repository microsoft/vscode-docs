import assert from 'node:assert/strict';
import test from 'node:test';
import { authorLabel, boardColumns, combinedItems, itemReference, relativeTime, statusInfo, visibleItems, workflowCounts } from './presentation.mjs';

const filters = {
  search: '', label: '', disposition: '', showDone: false, mine: false, githubState: '', draft: '', review: ''
};
const items = [
  { key: 'first', title: 'Update docs', number: 42, labels: ['doc-bug'], assignees: ['maintainer'], state: 'open', draft: false, reviewDecision: 'REVIEW_REQUIRED' },
  { key: 'second', title: 'Explain settings', number: 43, labels: [], assignees: [], state: 'closed', draft: true, reviewDecision: '' }
];

test('formats creators without inventing identities for deleted accounts or older cache entries', () => {
  assert.equal(authorLabel('contributor'), '@contributor');
  assert.equal(authorLabel('automation[bot]'), '@automation[bot]');
  assert.equal(authorLabel(null), 'Deleted account');
  assert.equal(authorLabel(undefined), 'Creator unavailable');
});

test('item references distinguish repositories without changing docs or media labels', () => {
  assert.equal(itemReference({ repo: 'microsoft/vscode', number: 42 }), 'microsoft/vscode#42');
  assert.equal(itemReference({ repo: 'other/product', number: 42 }), 'other/product#42');
  assert.equal(itemReference({ repo: 'microsoft/vscode-docs', number: 42 }), '#42');
  assert.equal(itemReference({ number: 42 }), '#42');
  assert.equal(itemReference({ kind: 'video' }), 'Video');
});

test('formats relative age with explicit handling of missing and invalid timestamps', () => {
  const now = Date.parse('2026-11-02T12:00:00Z');
  assert.equal(relativeTime('2026-11-02T11:59:50Z', now), 'just now');
  assert.equal(relativeTime('2026-11-02T11:30:00Z', now), '30m ago');
  assert.equal(relativeTime('2026-11-02T10:00:00Z', now), '2h ago');
  assert.equal(relativeTime('2026-11-01T12:00:00Z', now), '1d ago');
  assert.equal(relativeTime(undefined, now), '');
  assert.equal(relativeTime('not-a-date', now), 'Date unavailable');
});

test('counts local workflow statuses separately from GitHub state', () => {
  assert.deepEqual(workflowCounts(items, { first: { disposition: 'needs-review' }, second: { disposition: 'in-progress' } }),
    { total: 2, 'needs-review': 1, 'in-progress': 1, blocked: 0 });
});

test('explicit completed status filters override the default hiding of completed work', () => {
  const records = { first: { disposition: 'done' }, second: { disposition: 'blocked' } };
  assert.deepEqual(visibleItems(items, records, 'pulls', 'maintainer', filters).map(item => item.key), ['second']);
  assert.deepEqual(visibleItems(items, records, 'pulls', 'maintainer', { ...filters, disposition: 'done' }).map(item => item.key), ['first']);
});

test('queue-aware filtering preserves PR filters while not applying them to media or TPIs', () => {
  assert.deepEqual(visibleItems(items, {}, 'pulls', 'maintainer', { ...filters, mine: true, review: 'REVIEW_REQUIRED', draft: 'no' }).map(item => item.key), ['first']);
  assert.deepEqual(visibleItems(items, {}, 'issues', 'maintainer', { ...filters, search: '43', githubState: 'closed' }).map(item => item.key), ['second']);
  assert.equal(visibleItems(items, {}, 'tpis', 'maintainer', { ...filters, mine: true }).length, 2);
  assert.equal(visibleItems([{ key: 'media', title: 'Settings screenshot' }], {}, 'media', 'maintainer',
    { ...filters, label: 'doc-bug', mine: true, githubState: 'closed', draft: 'yes' }).length, 1);
});

test('combines all queues using canonical identities without changing source items', () => {
  const sources = {
    pulls: [items[0]], tpis: [{ ...items[1], key: 'tpi' }],
    issues: [items[0], { ...items[1], key: 'issue' }],
    media: [{ key: 'media', title: 'Record settings', kind: 'video' }]
  };
  const combined = combinedItems(sources);
  assert.deepEqual(combined.map(item => [item.key, item.queue]), [
    ['first', 'pulls'], ['tpi', 'tpis'], ['issue', 'issues'], ['media', 'media']
  ]);
  assert.equal(sources.pulls[0].queue, undefined);
});

test('board columns include every target state, completed work, and default untriaged items', () => {
  const records = { first: { disposition: 'done' }, second: { disposition: 'not-needed' } };
  const columns = boardColumns([...items, { key: 'new' }], records);
  assert.deepEqual(columns.map(column => column.status), Object.keys(statusInfo));
  assert.deepEqual(columns.find(column => column.status === 'untriaged').items, [{ key: 'new' }]);
  assert.equal(columns.find(column => column.status === 'done').items[0].key, 'first');
  assert.equal(columns.find(column => column.status === 'not-needed').items[0].key, 'second');
  assert.deepEqual(columns.find(column => column.status === 'ready').items, []);
});

test('hidden columns affect only the board and leave task dispositions intact', () => {
  const records = { first: { disposition: 'needs-review' }, second: { disposition: 'blocked' } };
  const hidden = ['needs-review', 'blocked'];
  assert.equal(boardColumns(items, records, hidden).length, 5);
  assert.deepEqual(boardColumns(items, records, hidden).flatMap(column => column.items), []);
  assert.deepEqual(visibleItems(items, records, 'board', 'maintainer', filters, hidden), []);
  assert.equal(visibleItems(items, records, 'pulls', 'maintainer', filters, hidden).length, 2);
  assert.equal(records.first.disposition, 'needs-review');
  assert.equal(records.second.disposition, 'blocked');
  assert.deepEqual(boardColumns(items, records, Object.keys(statusInfo)), []);
  assert.equal(boardColumns(items, records, []).flatMap(column => column.items).length, 2);
});

test('board filtering supports source, search, labels, status, and GitHub state without hiding completed columns', () => {
  const combined = combinedItems({
    pulls: [items[0]], tpis: [], issues: [items[1]], media: [{ key: 'media', title: 'Screenshot' }]
  });
  const records = { first: { disposition: 'done' }, second: { disposition: 'blocked' } };
  assert.equal(visibleItems(combined, records, 'board', 'maintainer', filters).length, 3);
  assert.deepEqual(visibleItems(combined, records, 'board', 'maintainer', { ...filters, source: 'media' }).map(item => item.key), ['media']);
  assert.deepEqual(visibleItems(combined, records, 'board', 'maintainer', { ...filters, label: 'doc-bug' }).map(item => item.key), ['first']);
  assert.deepEqual(visibleItems(combined, records, 'board', 'maintainer', { ...filters, search: '43', githubState: 'closed' }).map(item => item.key), ['second']);
  const blocked = visibleItems(combined, records, 'board', 'maintainer', { ...filters, disposition: 'blocked' });
  assert.equal(boardColumns(blocked, records).length, Object.keys(statusInfo).length);
  assert.deepEqual(blocked.map(item => item.key), ['second']);
  assert.equal(visibleItems(combined, records, 'board', 'maintainer', { ...filters, mine: true, draft: 'yes', review: 'APPROVED' }).length, 3);
});
