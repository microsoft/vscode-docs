import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createStore, dispositions, initialState, itemKey, recordFor, validateState } from './state.mjs';
import { createGitHub, contextVersion, isDocumentationTpi, normalize, sourceIdentity } from './github.mjs';
import { createClosingActions } from './closing.mjs';
import { createWorkflows, workflowPrompt } from './workflows.mjs';
import { createWorkbench } from './workbench.mjs';

const key = 'microsoft/vscode-docs:pr:42';
const issue = () => ({
  key, repo: 'microsoft/vscode-docs', kind: 'pr', number: 42, title: 'Update docs', body: 'Document public behavior.',
  url: 'https://github.com/microsoft/vscode-docs/pull/42',
  sourceVersion: 'sha1', updatedAt: '2026-01-01', labels: [], assignees: [], state: 'open', merged: false, comments: [], reviews: []
});
async function fixture(t) {
  const home = await mkdtemp(path.join(os.tmpdir(), 'docs-workbench-test-'));
  t.after(() => rm(home, { recursive: true, force: true }));
  const store = await createStore('workspace', 'maintainer', home);
  return { home, store };
}
function fakeGitHub(item = issue()) {
  const calls = [];
  let failClose = false;
  const github = {
    calls, item,
    account: async () => 'maintainer',
    canTriage: async () => true,
    detail: async () => structuredClone(item),
    pages: async () => [{ name: 'invalid' }],
    queue: async () => [structuredClone(item)],
    milestones: async () => [{ title: '1.145.0', number: 1 }],
    setFailClose(value) { failClose = value; },
    async api(endpoint, method, body) {
      calls.push({ endpoint, method, body });
      if (endpoint.endsWith('/comments')) {
        const comment = { id: 1, body: body.body, url: 'https://github.com/microsoft/vscode-docs/pull/42#issuecomment-1' };
        item.comments.push(comment);
        item.sourceVersion = item.kind === 'issue' ? 'updated-by-comment' : item.sourceVersion;
        return { html_url: comment.url };
      }
      if (endpoint.endsWith('/labels')) { item.labels.push('invalid'); return []; }
      if (failClose) throw new Error('Permission denied');
      item.state = 'closed';
      return item;
    }
  };
  return github;
}

test('stores atomic, account-scoped state and serializes concurrent writers', async t => {
  const { home, store } = await fixture(t);
  await Promise.all(Array.from({ length: 10 }, (_, index) => store.update(state => {
    recordFor(state, `microsoft/vscode-docs:issue:${index + 1}`).note = String(index);
  })));
  assert.equal(Object.keys((await store.read()).records).length, 10);
  assert.deepEqual((await readdir(store.directory)).sort(), ['state.json']);
  const other = await createStore('workspace', 'other', home);
  assert.notEqual(other.directory, store.directory);
  assert.equal(Object.keys((await other.read()).records).length, 0);
});

test('does not overwrite unsupported or corrupt state', async t => {
  const { store } = await fixture(t);
  const file = path.join(store.directory, 'state.json');
  await writeFile(file, '{"version":99}');
  await assert.rejects(store.update(state => { state.milestone = '1.146.0'; }), /corrupt|Unrecognized/);
  assert.equal(await readFile(file, 'utf8'), '{"version":99}');
  assert.throws(() => validateState({ ...initialState('workspace', 'maintainer'), media: [{}] }, 'workspace', 'maintainer'), /Corrupt/);
});

test('TPI exclusions only match Verification TPI anywhere in the title, regardless of labels', () => {
  for (const title of ['Verification TPI', 'Test: Verification TPI: fix', 'Feature follow-up (verification tpi)']) {
    assert.equal(isDocumentationTpi({ title, labels: ['testplan-item'] }), false);
  }
  for (const label of ['verified', 'verification', 'verification-needed', 'verification-found',
    'verification-steps-needed', '~verification-steps-needed', 'author-verification-requested', 'invalid-testplan-item']) {
    assert.equal(isDocumentationTpi({ title: 'Test: Public feature', labels: ['testplan-item', label] }), true);
  }
  assert.equal(isDocumentationTpi({ title: 'Verification: fix', labels: ['testplan-item'] }), true);
  assert.equal(isDocumentationTpi({ title: 'Test: Pinned-session expansion and persistence', labels: ['testplan-item', 'verification-found'] }), true);
});

test('paginates issues without search limits and excludes PRs from issue queue', async () => {
  const calls = [];
  const github = createGitHub(async args => {
    const endpoint = args[3];
    calls.push(endpoint);
    const page = endpoint.includes('page=2') ? 2 : 1;
    return page === 2 ? [{ number: 101, title: 'PR', state: 'open', updated_at: 'date', pull_request: {} }] :
      Array.from({ length: 100 }, (_, index) => ({ number: index + 1, title: 'Issue', state: 'open', updated_at: 'date', user: { login: 'issue-creator' } }));
  });
  const result = await github.queue('issues');
  assert.equal(result.length, 100);
  assert.equal(result[0].author, 'issue-creator');
  assert.equal(calls.length, 2);
});

test('paginates PR GraphQL results with review status and exposes GraphQL errors', async () => {
  let count = 0;
  const github = createGitHub(async (args, body) => {
    assert.equal(args[3], 'graphql');
    assert.match(body.query, /author\s*\{\s*login\s*\}/);
    assert.equal(body.variables.cursor, count ? 'cursor' : null);
    count++;
    return { data: { repository: { pullRequests: {
      nodes: [{ number: count, title: 'PR', url: 'https://github.com/microsoft/vscode-docs/pull/1', state: 'OPEN',
        updatedAt: 'date', headRefOid: 'sha', reviewDecision: 'REVIEW_REQUIRED', author: { login: 'pr-creator' } }],
      pageInfo: { hasNextPage: count === 1, endCursor: 'cursor' }
    } } } };
  });
  const result = await github.queue('pulls');
  assert.equal(result.length, 2);
  assert.equal(result[0].reviewDecision, 'REVIEW_REQUIRED');
  assert.equal(result[0].author, 'pr-creator');
  await assert.rejects(createGitHub(async () => ({ errors: [{ message: 'Denied' }] })).queue('pulls'), /Denied/);
});

test('normalizes creator handles from REST and GraphQL, including bots and deleted accounts', () => {
  const raw = { number: 42, title: 'Docs', state: 'open' };
  assert.equal(normalize({ ...raw, user: { login: 'rest-creator' } }, 'microsoft/vscode-docs', 'issue').author, 'rest-creator');
  assert.equal(normalize({ ...raw, author: { login: 'automation[bot]' } }, 'microsoft/vscode-docs', 'pr').author, 'automation[bot]');
  assert.equal(normalize({ ...raw, author: null }, 'microsoft/vscode-docs', 'pr').author, null);
  assert.equal(normalize({ ...raw, user: null }, 'microsoft/vscode-docs', 'issue').author, null);
});

test('detail retrieval preserves issue and PR creators from REST', async () => {
  const github = createGitHub(async args => {
    const endpoint = args[3];
    if (endpoint.includes('/comments') || endpoint.includes('/reviews')) return [];
    return {
      number: 42, title: 'Docs', state: 'open', updated_at: 'date',
      user: { login: endpoint.includes('/pulls/') || endpoint.endsWith('/issues/42') ? 'pr-creator' : 'issue-creator' },
      ...(endpoint.endsWith('/issues/42') ? { pull_request: {} } : {})
    };
  });
  assert.equal((await github.detail('microsoft/vscode-docs:pr:42')).author, 'pr-creator');
  assert.equal((await github.detail('microsoft/vscode-docs:issue:43')).author, 'issue-creator');
});

test('creator cache accepts existing data and persists new creator metadata', async t => {
  const { store } = await fixture(t);
  await store.update(state => {
    state.cache.pulls = { fetchedAt: 'date', items: [{ ...issue(), author: 'creator' }, { ...issue(), author: null }, issue()] };
  });
  assert.deepEqual((await store.read()).cache.pulls.items.map(item => item.author), ['creator', null, undefined]);
  await assert.rejects(store.update(state => { state.cache.pulls.items[0].author = {}; }), /Corrupt cached work item/);
  assert.equal((await store.read()).cache.pulls.items[0].author, 'creator');
});

test('TPI retrieval searches the named milestone across repositories and both issue states', async () => {
  const calls = [];
  const github = createGitHub(async args => {
    const endpoint = args[3];
    calls.push(endpoint);
    const url = new URL(`https://api.github.com/${endpoint}`);
    assert.equal(url.pathname, '/search/issues');
    assert.equal(url.searchParams.get('q'), 'is:issue milestone:1.145.0 label:testplan-item');
    return { total_count: 5, incomplete_results: false, items: [
      { number: 1, title: 'Feature', state: 'open', updated_at: 'date', repository_url: 'https://api.github.com/repos/microsoft/vscode' },
      { number: 1, title: 'Other feature', state: 'closed', updated_at: 'date', labels: [{ name: 'verification-found' }], repository_url: 'https://api.github.com/repos/other/product', user: { login: 'creator' } },
      { number: 2, title: 'Verification: fix', state: 'open', updated_at: 'date', repository_url: 'https://api.github.com/repos/other/product' },
      { number: 3, title: 'Invalid feature', state: 'closed', updated_at: 'date', labels: [{ name: 'invalid-testplan-item' }], repository_url: 'https://api.github.com/repos/other/product' },
      { number: 4, title: 'Test: Verification TPI: regression', state: 'open', updated_at: 'date', repository_url: 'https://api.github.com/repos/other/product' }
    ] };
  });
  const items = await github.queue('tpis', '1.145.0');
  assert.deepEqual(items.map(item => item.key), ['microsoft/vscode:issue:1', 'other/product:issue:1', 'other/product:issue:2', 'other/product:issue:3']);
  assert.deepEqual(items.map(item => item.state), ['open', 'closed', 'open', 'closed']);
  assert.equal(items[1].author, 'creator');
  assert.equal(calls.length, 1);
  await assert.rejects(github.queue('tpis', '1.145.0 repo:other/product'), /milestone/);
  assert.equal(calls.length, 1);
});

test('TPI search paginates the search response and preserves distinct repository identities', async () => {
  const calls = [];
  const github = createGitHub(async args => {
    const url = new URL(`https://api.github.com/${args[3]}`);
    const page = Number(url.searchParams.get('page'));
    calls.push(page);
    return { total_count: 101, incomplete_results: false, items:
      Array.from({ length: page === 1 ? 100 : 1 }, (_, index) => ({
        number: page === 1 ? index + 1 : 1, title: 'Feature', state: 'closed', updated_at: 'date',
        repository_url: `https://api.github.com/repos/other/${page === 1 ? 'first' : 'second'}`
      }))
    };
  });
  const items = await github.queue('tpis', '1.145.0');
  assert.deepEqual(calls, [1, 2]);
  assert.equal(items.length, 101);
  assert.equal(items[0].key, 'other/first:issue:1');
  assert.equal(items[100].key, 'other/second:issue:1');
  assert.equal((await createGitHub(async () => ({ total_count: 0, incomplete_results: false, items: [] })).queue('tpis', '1.999.0')).length, 0);
});

test('TPI search rejects incomplete, oversized, and malformed results rather than showing a partial queue', async () => {
  for (const result of [
    [], { total_count: 1, items: {} }, { total_count: -1, items: [] },
    { total_count: 1, incomplete_results: true, items: [] },
    { total_count: 1001, incomplete_results: false, items: [] },
    { total_count: 1, incomplete_results: false, items: [{ number: 1 }] }
  ]) {
    await assert.rejects(createGitHub(async () => result).queue('tpis', '1.145.0'), /search|repository identity/);
  }
});

test('TPI search stops at the reported total, including the last allowed search page', async () => {
  for (const total of [100, 1000]) {
    const calls = [];
    const github = createGitHub(async args => {
      const page = Number(new URL(`https://api.github.com/${args[3]}`).searchParams.get('page'));
      calls.push(page);
      assert.ok(page <= total / 100);
      return { total_count: total, incomplete_results: false, items: Array.from({ length: 100 }, (_, index) => ({
        number: (page - 1) * 100 + index + 1, title: 'Feature', state: 'open', updated_at: 'date',
        repository_url: 'https://api.github.com/repos/other/product'
      })) };
    });
    assert.equal((await github.queue('tpis', '1.145.0')).length, total);
    assert.equal(calls.length, total / 100);
  }
});

test('GitHub identities support other repositories without accepting malformed paths', () => {
  assert.equal(itemKey('other/.product:issue:1'), 'other/.product:issue:1');
  assert.deepEqual(sourceIdentity('other/product:issue:1'), { repo: 'other/product', kind: 'issue', number: 1 });
  for (const key of ['other/..:issue:1', 'other/.:issue:1', 'other/product/extra:issue:1',
    'other/product?query:issue:1', 'other/product:issue:0', 'other/product:task:1']) {
    assert.throws(() => itemKey(key), /Invalid work item identity/);
  }
});

test('other-repository TPI details use their originating repository', async () => {
  const calls = [];
  const github = createGitHub(async args => {
    const endpoint = args[3];
    calls.push(endpoint);
    if (endpoint.includes('/comments')) return [];
    return { number: 1, title: 'Feature', state: 'closed', updated_at: 'date' };
  });
  const item = await github.detail('other/product:issue:1');
  assert.deepEqual(calls, ['repos/other/product/issues/1', 'repos/other/product/issues/1/comments?per_page=100&page=1']);
  assert.equal(item.key, 'other/product:issue:1');
});

test('other-repository TPIs persist through refresh, linking, and documentation planning', async t => {
  const { home, store } = await fixture(t);
  const item = { ...issue(), key: 'other/product:issue:1', repo: 'other/product', kind: 'issue', number: 1 };
  const github = fakeGitHub(item);
  github.queue = async name => name === 'tpis' ? [structuredClone(item)] : [];
  let prompt;
  const session = { sessionId: 'session', rpc: { tasks: { startAgent: async input => {
    prompt = input.prompt;
    return { agentId: 'planning-agent' };
  } } } };
  const workbench = await createWorkbench({ session, store, github, workspace: 'workspace', account: 'maintainer' });
  assert.equal((await workbench.dispatch('refresh')).queues.tpis[0].key, item.key);
  await workbench.dispatch('update-item', { key: item.key, disposition: 'ready', link: key });
  const reopened = await createStore('workspace', 'maintainer', home);
  assert.deepEqual((await reopened.read()).records[key].links, [item.key]);
  await workbench.dispatch('launch', { key: item.key, workflow: 'document' });
  assert.match(prompt, /other\/product:issue:1/);
  assert.equal((await reopened.read()).records[item.key].runs[0].agentId, 'planning-agent');
  await assert.rejects(workbench.dispatch('launch', { key: item.key, workflow: 'close-comment' }), /only for docs items/);
});

test('refresh preserves cached work on API failure and hides a previous milestone cache', async t => {
  const { store } = await fixture(t);
  const github = fakeGitHub();
  const workbench = await createWorkbench({ session: { sessionId: 'session' }, store, github, workspace: 'workspace', account: 'maintainer' });
  await workbench.dispatch('refresh');
  github.queue = async () => { throw new Error('Rate limited'); };
  const failed = await workbench.dispatch('refresh');
  assert.equal(failed.queues.pulls.length, 1);
  assert.equal(failed.cache.pulls.error, 'Rate limited');
  const changed = await workbench.dispatch('milestone', { milestone: '1.146.0' });
  assert.equal(changed.queues.tpis.length, 0);
  assert.equal(changed.milestone, '1.146.0');
});

test('links work bidirectionally and not-needed requires a rationale', async t => {
  const { store } = await fixture(t);
  const workbench = await createWorkbench({ session: {}, store, github: fakeGitHub(), workspace: 'workspace', account: 'maintainer' });
  await assert.rejects(workbench.dispatch('update-item', { key, disposition: 'not-needed' }), /reason/);
  await workbench.dispatch('update-item', { key, disposition: 'not-needed', note: 'Already documented.', link: 'microsoft/vscode:issue:9' });
  assert.deepEqual((await store.read()).records['microsoft/vscode:issue:9'].links, [key]);
});

test('column visibility persists per workspace/account without changing tasks or making GitHub writes', async t => {
  const { home, store } = await fixture(t);
  const github = fakeGitHub();
  const workbench = await createWorkbench({ session: { sessionId: 'session' }, store, github, workspace: 'workspace', account: 'maintainer' });
  await store.update(state => { recordFor(state, key).disposition = 'blocked'; });
  await Promise.all([
    workbench.dispatch('board-columns', { status: 'needs-review', visible: false }),
    workbench.dispatch('board-columns', { status: 'blocked', visible: false })
  ]);
  await workbench.dispatch('board-columns', { status: 'blocked', visible: false });
  const reopened = await createStore('workspace', 'maintainer', home);
  assert.deepEqual((await reopened.read()).hiddenBoardColumns, ['needs-review', 'blocked']);
  assert.equal((await reopened.read()).records[key].disposition, 'blocked');
  const otherWorkspace = await createStore('other-workspace', 'maintainer', home);
  const otherAccount = await createStore('workspace', 'other-maintainer', home);
  assert.deepEqual((await otherWorkspace.read()).hiddenBoardColumns, []);
  assert.deepEqual((await otherAccount.read()).hiddenBoardColumns, []);
  await workbench.dispatch('board-columns', { status: 'blocked', visible: true });
  assert.deepEqual((await workbench.snapshot()).hiddenBoardColumns, ['needs-review']);
  await workbench.dispatch('board-columns', { showAll: true });
  assert.deepEqual((await reopened.read()).hiddenBoardColumns, []);
  assert.deepEqual(github.calls, []);
});

test('all columns can be hidden and restored, and invalid preferences leave storage unchanged', async t => {
  const { store } = await fixture(t);
  const workbench = await createWorkbench({ session: { sessionId: 'session' }, store, github: fakeGitHub(), workspace: 'workspace', account: 'maintainer' });
  for (const status of dispositions) await workbench.dispatch('board-columns', { status, visible: false });
  assert.deepEqual((await store.read()).hiddenBoardColumns, dispositions);
  for (const input of [{}, { status: 'other', visible: false }, { status: 'blocked', visible: 'false' }, { showAll: 'true' }, { showAll: true, status: 'blocked' }]) {
    await assert.rejects(workbench.dispatch('board-columns', input), /column|boolean|Show all/);
    assert.deepEqual((await store.read()).hiddenBoardColumns, dispositions);
  }
  await workbench.dispatch('board-columns', { showAll: true });
  assert.deepEqual((await store.read()).hiddenBoardColumns, []);
});

test('legacy state defaults to all columns visible, while corrupt column preferences are never overwritten', async t => {
  const { store } = await fixture(t);
  const file = path.join(store.directory, 'state.json');
  const legacy = initialState('workspace', 'maintainer');
  delete legacy.hiddenBoardColumns;
  await writeFile(file, JSON.stringify(legacy));
  const workbench = await createWorkbench({ session: { sessionId: 'session' }, store, github: fakeGitHub(), workspace: 'workspace', account: 'maintainer' });
  assert.deepEqual((await workbench.snapshot()).hiddenBoardColumns, []);
  for (const hiddenBoardColumns of [null, 'blocked', ['unknown'], ['blocked', 'blocked']]) {
    const corrupt = JSON.stringify({ ...legacy, hiddenBoardColumns });
    await writeFile(file, corrupt);
    await assert.rejects(workbench.dispatch('board-columns', { showAll: true }), /Corrupt board column preferences/);
    assert.equal(await readFile(file, 'utf8'), corrupt);
  }
});

test('board moves persist local status without changing GitHub state, agent state, links, or notes', async t => {
  const { home, store } = await fixture(t);
  const github = fakeGitHub();
  const session = { sessionId: 'session' };
  const workbench = await createWorkbench({ session, store, github, workspace: 'workspace', account: 'maintainer' });
  await store.update(state => {
    const record = recordFor(state, key);
    record.note = 'Already covered by existing documentation.';
    record.links = ['microsoft/vscode:issue:9'];
    record.runs = [{ id: 'existing', workflow: 'review', sessionId: 'session', status: 'running', sourceVersion: 'sha1', startedAt: new Date().toISOString() }];
  });
  for (const disposition of dispositions) {
    const state = await workbench.dispatch('update-item', { key, disposition });
    assert.equal(state.records[key].disposition, disposition);
    assert.equal(state.records[key].note, 'Already covered by existing documentation.');
    assert.equal(state.records[key].runs[0].status, 'running');
    assert.deepEqual(state.records[key].links, ['microsoft/vscode:issue:9']);
  }
  const reopened = await createStore('workspace', 'maintainer', home);
  assert.equal((await reopened.read()).records[key].disposition, 'not-needed');
  assert.equal(github.item.state, 'open');
  assert.deepEqual(github.calls, []);
  await assert.rejects(workbench.dispatch('update-item', { key, disposition: 'invalid-column' }), /Invalid workflow status/);
  assert.equal((await reopened.read()).records[key].disposition, 'not-needed');
});

test('close preview never mutates GitHub, and cancellation and source drift block closure', async t => {
  const { store } = await fixture(t);
  const github = fakeGitHub();
  const closing = createClosingActions(github, store, 'maintainer');
  const operation = await closing.preview({ key, mode: 'comment', comment: 'Thanks. This behavior is already documented.' });
  assert.equal(github.calls.length, 0);
  await assert.rejects(closing.execute({ id: operation.id, confirmed: false }), /confirmation/);
  github.item.sourceVersion = 'sha2';
  await assert.rejects(closing.execute({ id: operation.id, confirmed: true }), /context changed/);
  assert.equal(github.calls.length, 0);
  await assert.rejects(closing.preview({ key: 'microsoft/vscode:issue:9', mode: 'invalid', comment: 'Invalid' }), /restricted/);
  await assert.rejects(closing.preview({ key: 'other/product:issue:9', mode: 'invalid', comment: 'Invalid' }), /restricted/);
});

test('closes PR unmerged, labels only when requested, and reconciles partial failure without duplicate comments', async t => {
  const { store } = await fixture(t);
  const github = fakeGitHub();
  const closing = createClosingActions(github, store, 'maintainer');
  const operation = await closing.preview({ key, mode: 'invalid', comment: 'Not an actionable docs contribution.', applyInvalid: true });
  github.setFailClose(true);
  await assert.rejects(closing.execute({ id: operation.id, confirmed: true }), /incomplete/);
  assert.equal((await store.read()).operations[operation.id].status, 'failed');
  github.setFailClose(false);
  const result = await closing.execute({ id: operation.id, confirmed: true });
  assert.equal(result.status, 'complete');
  assert.equal(github.calls.filter(call => call.endpoint.endsWith('/comments')).length, 1);
  assert.equal(github.calls.filter(call => call.endpoint.endsWith('/labels')).length, 1);
  assert.deepEqual(github.calls.at(-1).body, { state: 'closed' });
  assert.ok(github.calls.every(call => !call.endpoint.includes('/merge')));
});

test('issue closure uses not_planned; missing labels, merged items, and expired previews are rejected', async t => {
  const { store } = await fixture(t);
  const item = { ...issue(), key: 'microsoft/vscode-docs:issue:42', kind: 'issue' };
  const github = fakeGitHub(item);
  const closing = createClosingActions(github, store, 'maintainer');
  github.pages = async () => [];
  await assert.rejects(closing.preview({ key: item.key, mode: 'invalid', comment: 'Not actionable.', applyInvalid: true }), /no invalid label/);
  const operation = await closing.preview({ key: item.key, mode: 'comment', comment: 'Not planned.' });
  await closing.execute({ id: operation.id, confirmed: true });
  assert.deepEqual(github.calls.at(-1).body, { state: 'closed', state_reason: 'not_planned' });
  item.state = 'open';
  const expired = await closing.preview({ key: item.key, mode: 'comment', comment: 'Reason.' });
  await store.update(state => { state.operations[expired.id].expiresAt = '2000-01-01'; });
  await assert.rejects(closing.execute({ id: expired.id, confirmed: true }), /expired/);
  item.merged = true;
  await assert.rejects(closing.preview({ key: item.key, mode: 'comment', comment: 'Reason.' }), /merged/);
});

test('own closing marker is excluded from stale-context checks but other comments are not', () => {
  const item = issue();
  const original = contextVersion(item, 'id');
  item.comments.push({ body: 'Own <!-- vscode-docs-workbench:close:id -->' });
  assert.equal(contextVersion(item, 'id'), original);
  item.comments.push({ body: 'New external context' });
  assert.notEqual(contextVersion(item, 'id'), original);
});

test('launch records an actual agent ID; duplicate active work is rejected and actual results become needs-review', async t => {
  const { store } = await fixture(t);
  let request;
  const session = {
    sessionId: 'session',
    rpc: { tasks: {
      async startAgent(input) { request = input; return { agentId: 'agent' }; },
      async list() { return { tasks: [{ id: 'agent', status: 'idle', latestResponse: 'Technical findings: none. Writing findings: a correction.' }] }; }
    } }
  };
  const workflows = createWorkflows({ session, store, github: fakeGitHub(), workspace: 'workspace' });
  await workflows.launch({ key, workflow: 'review' });
  assert.equal(request.agentType, 'explore');
  assert.equal(request.model, undefined);
  assert.match(request.prompt, /READ ONLY/);
  assert.match(request.prompt, /Writing findings/);
  await assert.rejects(workflows.launch({ key, workflow: 'review' }), /equivalent task/);
  await workflows.sync();
  const record = (await store.read()).records[key];
  assert.equal(record.runs[0].status, 'idle');
  assert.equal(record.runs[0].agentId, 'agent');
  assert.equal(record.disposition, 'needs-review');
  await assert.rejects(workflows.launch({ key, workflow: 'implement', plan: 'Approved', base: 'main' }), /complete a documentation plan/);
});

test('launch uncertainty is explicit and media prompts require actual captures or guided fallback', async t => {
  const { store } = await fixture(t);
  const workflows = createWorkflows({ session: { sessionId: 'session', rpc: { tasks: { startAgent: async () => { throw new Error('Transport lost'); } } } },
    store, github: fakeGitHub(), workspace: 'workspace' });
  await assert.rejects(workflows.launch({ key, workflow: 'review' }), /could not be confirmed/);
  assert.equal((await store.read()).records[key].runs[0].status, 'launch-uncertain');
  const prompt = workflowPrompt({ workflow: 'video', item: issue(), workspace: 'workspace', milestone: '1.145.0', output: 'private' });
  assert.match(prompt, /guided human capture/);
  assert.match(prompt, /full decoding\/playback/);
  assert.match(prompt, /Do not automatically retry/);
});

test('permission loss, account changes, and already closed items cannot produce a new closing comment', async t => {
  const { store } = await fixture(t);
  const github = fakeGitHub();
  const closing = createClosingActions(github, store, 'maintainer');
  github.canTriage = async () => false;
  await assert.rejects(closing.preview({ key, mode: 'comment', comment: 'Reason.' }), /triage permission/);
  github.canTriage = async () => true;
  const operation = await closing.preview({ key, mode: 'comment', comment: 'Reason.' });
  github.account = async () => 'different-account';
  await assert.rejects(closing.execute({ id: operation.id, confirmed: true }), /account changed/);
  github.account = async () => 'maintainer';
  github.item.state = 'closed';
  assert.equal((await closing.execute({ id: operation.id, confirmed: true })).status, 'complete');
  assert.equal(github.calls.length, 0);
});

test('lost comment responses reconcile the remote marker before an explicit retry', async t => {
  const { store } = await fixture(t);
  const github = fakeGitHub();
  const original = github.api;
  let loseResponse = true;
  github.api = async (...args) => {
    const result = await original(...args);
    if (args[0].endsWith('/comments') && loseResponse) {
      loseResponse = false;
      throw new Error('Response lost after posting');
    }
    return result;
  };
  const closing = createClosingActions(github, store, 'maintainer');
  const operation = await closing.preview({ key, mode: 'comment', comment: 'Reason.' });
  await assert.rejects(closing.execute({ id: operation.id, confirmed: true }), /incomplete/);
  await assert.rejects(closing.preview({ key, mode: 'comment', comment: 'Reason.' }), /earlier close action/);
  await store.update(state => { state.operations[operation.id].expiresAt = '2000-01-01'; });
  const renewed = await closing.renew({ id: operation.id });
  assert.equal(renewed.steps.comment, true);
  assert.equal(renewed.id, operation.id);
  await closing.execute({ id: operation.id, confirmed: true });
  assert.equal(github.calls.filter(call => call.endpoint.endsWith('/comments')).length, 1);
});

test('a concurrent external comment stops closure after the workbench comment is posted', async t => {
  const { store } = await fixture(t);
  const github = fakeGitHub();
  const original = github.api;
  github.api = async (...args) => {
    const result = await original(...args);
    if (args[0].endsWith('/comments')) github.item.comments.push({ body: 'Please reconsider', id: 2 });
    return result;
  };
  const closing = createClosingActions(github, store, 'maintainer');
  const operation = await closing.preview({ key, mode: 'comment', comment: 'Reason.' });
  await assert.rejects(closing.execute({ id: operation.id, confirmed: true }), /Context changed/);
  assert.equal(github.item.state, 'open');
  assert.equal(github.calls.some(call => call.method === 'PATCH'), false);
});

test('approved implementation creates a separate worktree from the selected base and scopes the agent to it', async t => {
  const { store } = await fixture(t);
  const item = { ...issue(), key: 'microsoft/vscode-docs:issue:42', kind: 'issue' };
  await store.update(state => {
    recordFor(state, item.key).runs.push({
      id: 'plan', workflow: 'document', sessionId: 'session', status: 'idle',
      sourceVersion: item.sourceVersion, result: 'Approved scope', startedAt: new Date().toISOString()
    });
  });
  let command;
  let prompt;
  const workflows = createWorkflows({
    session: { sessionId: 'session', rpc: { tasks: { startAgent: async input => { prompt = input.prompt; return { agentId: 'implementation-agent' }; } } } },
    store, github: fakeGitHub(item), workspace: 'original-workspace',
    runGit: async (...args) => { command = args; }
  });
  const result = await workflows.launch({ key: item.key, workflow: 'implement', plan: 'Approved scope', base: 'vnext' });
  assert.equal(command[0], 'git');
  assert.deepEqual(command[1].slice(0, 5), ['-C', 'original-workspace', 'worktree', 'add', '-b']);
  assert.equal(command[1].at(-1), 'vnext');
  assert.equal(command[1].at(-2), result.worktree);
  assert.notEqual(result.worktree, 'original-workspace');
  assert.match(prompt, /solely inside implementationWorktree/);
  assert.match(prompt, /Do not edit the original workspace/);
});

test('uncertain launches reconcile by stable agent name rather than starting duplicate work', async t => {
  const { store } = await fixture(t);
  let name;
  const workflows = createWorkflows({
    session: { sessionId: 'session', rpc: { tasks: {
      startAgent: async input => { name = input.name; throw new Error('Lost launch response'); },
      list: async () => ({ tasks: [{ id: 'recovered-agent', displayName: name, status: 'running' }] })
    } } }, store, github: fakeGitHub(), workspace: 'workspace'
  });
  await assert.rejects(workflows.launch({ key, workflow: 'review' }), /could not be confirmed/);
  await workflows.sync();
  const run = (await store.read()).records[key].runs[0];
  assert.equal(run.agentId, 'recovered-agent');
  assert.equal(run.status, 'running');
  await assert.rejects(workflows.abandon({ key, runId: run.id, confirmed: true }), /cannot be abandoned/);
});

test('media attachment validates type and containment, and approval is separate from attaching', async t => {
  const { home, store } = await fixture(t);
  const workbench = await createWorkbench({ session: {}, store, github: fakeGitHub(), workspace: 'workspace', account: 'maintainer' });
  const { key: mediaKey } = await workbench.dispatch('create-media', {
    title: 'Settings screenshot', scenario: 'Open the editor setting', kind: 'screenshot', target: 'desktop', link: key
  });
  const detail = await workbench.dispatch('detail', { key: mediaKey });
  assert.equal(detail.mediaStatus, 'ready-to-capture');
  assert.ok(detail.record.links.includes(key));
  const capture = path.join(detail.mediaDirectory, 'capture.png');
  await writeFile(capture, Buffer.from('89504e470d0a1a0a00000000', 'hex'));
  const { id } = await workbench.dispatch('attach-media', { key: mediaKey, file: capture, description: 'Unit-test header fixture, not a genuine capture' });
  let state = await store.read();
  assert.equal(state.records[mediaKey].assets[0].approved, false);
  assert.equal(state.media[0].mediaStatus, 'awaiting-visual-review');
  await assert.rejects(workbench.dispatch('approve-media', { key: mediaKey, id, confirmed: false }), /visual inspection/);
  await workbench.dispatch('approve-media', { key: mediaKey, id, confirmed: true });
  state = await store.read();
  assert.equal(state.media[0].mediaStatus, 'approved');
  assert.equal(state.records[mediaKey].assets[0].approved, true);
  const outside = path.join(home, 'outside.png');
  await writeFile(outside, Buffer.from('89504e470d0a1a0a', 'hex'));
  await assert.rejects(workbench.dispatch('attach-media', { key: mediaKey, file: outside, description: 'Outside' }), /inside/);
  const invalid = path.join(detail.mediaDirectory, 'invalid.png');
  await writeFile(invalid, 'not a PNG');
  await assert.rejects(workbench.dispatch('attach-media', { key: mediaKey, file: invalid, description: 'Invalid' }), /does not match/);
});
