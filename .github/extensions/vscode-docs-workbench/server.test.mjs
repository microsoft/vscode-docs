import assert from 'node:assert/strict';
import test from 'node:test';
import { get } from 'node:http';
import { createHttpDiagnostics, createWorkbenchServer } from './server.mjs';

test('HTTP diagnostics preserve failure details without failing the agent session', async () => {
  const notifications = [];
  const log = createHttpDiagnostics({
    async log(message, options) { notifications.push({ message, level: options.level }); }
  });
  await log(new Error('Not found.'), { status: 404, level: 'warning', method: 'GET', path: '/missing' });
  await log(new Error('Storage unavailable'), { status: 500, level: 'error', method: 'GET', path: '/bootstrap' });
  assert.deepEqual(notifications, [
    { message: 'Docs workbench: GET /missing (HTTP 404, warning): Not found.', level: 'warning' },
    { message: 'Docs workbench: GET /bootstrap (HTTP 500, error): Storage unavailable', level: 'warning' }
  ]);
});

test('serves UI, validates host/origin/token, and invokes explicit action authorization', async t => {
  const actions = [];
  const authorizations = [];
  const server = await createWorkbenchServer({
    snapshot: async () => ({ milestone: '1.145.0' }),
    dispatch: async (action, input) => { actions.push({ action, input }); return { ok: true }; },
    milestones: async () => []
  }, async action => { authorizations.push(action); }, () => {});
  t.after(() => server.close());
  const page = await fetch(server.url);
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /Docs workbench/);
  assert.match(html, /type="module" src="\/app\.mjs"/);
  assert.match(page.headers.get('content-security-policy'), /script-src 'self'/);
  for (const route of ['/app.mjs', '/presentation.mjs', '/dom.mjs', '/board.mjs']) {
    const script = await fetch(`${server.url}${route}`);
    assert.equal(script.status, 200);
    assert.match(script.headers.get('content-type'), /text\/javascript/);
  }
  const { token } = await (await fetch(`${server.url}/bootstrap`)).json();
  const send = headers => fetch(`${server.url}/action`, {
    method: 'POST', headers, body: JSON.stringify({ action: 'refresh', input: {} })
  });
  assert.equal((await send({ 'Content-Type': 'application/json' })).status, 403);
  assert.equal((await send({ 'Content-Type': 'application/json', 'X-Workbench-Token': token, Origin: 'https://untrusted.example' })).status, 403);
  const headers = { 'Content-Type': 'application/json', 'X-Workbench-Token': token, Origin: server.url };
  assert.deepEqual(await (await send(headers)).json(), { ok: true });
  assert.equal(actions.length, 1);
  assert.deepEqual(authorizations, ['refresh']);
  const foreignHost = await new Promise((resolve, reject) => {
    get(server.url, { headers: { Host: 'untrusted.example' } }, response => { response.resume(); resolve(response.statusCode); }).on('error', reject);
  });
  assert.equal(foreignHost, 403);
  assert.equal((await fetch(`${server.url}/missing`)).status, 404);
  const invalid = await fetch(`${server.url}/action`, { method: 'POST', headers, body: '{' });
  assert.equal(invalid.status, 400);
});

test('authorization failure never dispatches a mutation', async t => {
  let dispatched = false;
  const server = await createWorkbenchServer({
    snapshot: async () => ({}), dispatch: async () => { dispatched = true; }
  }, async () => { throw new Error('Cancelled'); }, () => {});
  t.after(() => server.close());
  const { token } = await (await fetch(`${server.url}/bootstrap`)).json();
  const result = await fetch(`${server.url}/action`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Workbench-Token': token, Origin: server.url },
    body: JSON.stringify({ action: 'close-confirm', input: { confirmed: true } })
  });
  assert.equal(result.status, 500);
  assert.equal(dispatched, false);
});

test('browser startup requests do not create fatal session notifications', async t => {
  const diagnostics = [];
  const server = await createWorkbenchServer({
    snapshot: async () => ({ milestone: '1.145.0' })
  }, async () => {}, (error, context) => { diagnostics.push({ message: error.message, ...context }); });
  t.after(() => server.close());
  for (const method of ['GET', 'HEAD']) {
    assert.equal((await fetch(`${server.url}/favicon.ico`, { method })).status, 204);
    assert.equal((await fetch(`${server.url}/?view=canvas`, { method })).status, 200);
  }
  assert.deepEqual(diagnostics, []);
  const missing = await fetch(`${server.url}/.well-known/appspecific/com.chrome.devtools.json`);
  assert.equal(missing.status, 404);
  assert.deepEqual(await missing.json(), { error: 'Not found.' });
  assert.deepEqual(diagnostics, [{
    message: 'Not found.', level: 'warning', status: 404,
    method: 'GET', path: '/.well-known/appspecific/com.chrome.devtools.json'
  }]);
  assert.equal((await fetch(server.url)).status, 200);
});

test('unexpected server failures remain visible as HTTP and error-level diagnostics', async t => {
  const diagnostics = [];
  const server = await createWorkbenchServer({
    snapshot: async () => { throw new Error('Storage unavailable'); }
  }, async () => {}, (error, context) => { diagnostics.push({ message: error.message, ...context }); });
  t.after(() => server.close());
  const response = await fetch(`${server.url}/bootstrap`);
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: 'Storage unavailable' });
  assert.deepEqual(diagnostics, [{
    message: 'Storage unavailable', level: 'error', status: 500, method: 'GET', path: '/bootstrap'
  }]);
});
