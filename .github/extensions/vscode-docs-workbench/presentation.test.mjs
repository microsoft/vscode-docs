import assert from 'node:assert/strict';
import test from 'node:test';
import { authorLabel, relativeTime, visibleItems, workflowCounts } from './presentation.mjs';

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
