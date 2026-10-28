'use strict';

const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { setTimeout: delay } = require('node:timers/promises');
const test = require('node:test');
const { WATCH_DIRECTORIES, parsePort, startPreview, watchPreview } = require('./serve');

function createFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-preview-'));
  for (const directory of [...WATCH_DIRECTORIES, 'node_modules', '.git', '_build']) {
    fs.mkdirSync(path.join(root, directory), { recursive: true });
  }
  fs.mkdirSync(path.join(root, 'docs', 'topic', 'images'), { recursive: true });
  fs.writeFileSync(path.join(root, 'index.html'), '<!DOCTYPE html><html><body>Preview</body></html>');
  fs.writeFileSync(path.join(root, 'docs', 'topic', 'article.md'), '# Article');
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

async function waitFor(predicate) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (predicate()) {
      return;
    }
    await delay(25);
  }
  assert.fail('Timed out waiting for a preview file-change notification');
}

test('watches only root files and preview directories without walking the checkout', function (t) {
  const root = createFixture(t);
  const calls = [];
  t.mock.method(fs, 'watch', function (directory, options) {
    calls.push({ directory, recursive: options.recursive });
    const watcher = new EventEmitter();
    watcher.close = function () {};
    return watcher;
  });
  watchPreview(root, () => assert.fail('Unexpected change'), error => { throw error; });
  assert.deepEqual(calls, [
    { directory: root, recursive: false },
    ...WATCH_DIRECTORIES.map(directory => ({
      directory: path.join(root, directory),
      recursive: true
    }))
  ]);
});

test('closes existing watchers when setup fails and reports runtime watcher errors', function (t) {
  const root = createFixture(t);
  const error = new Error('Watch limit exceeded');
  let closed = false;
  let reportedError;
  const watcher = new EventEmitter();
  watcher.close = function () { closed = true; };
  let calls = 0;
  t.mock.method(fs, 'watch', function () {
    if (calls++ > 0) {
      throw error;
    }
    return watcher;
  });
  assert.throws(() => watchPreview(root, () => {}, value => { reportedError = value; }), error);
  assert.equal(closed, true);
  watcher.emit('error', error);
  assert.equal(reportedError, error);
});

test('detects edits, additions, deletions, and media changes but ignores unrelated directories', async function (t) {
  const root = createFixture(t);
  const changes = [];
  const watchers = watchPreview(root, filename => changes.push(filename), error => { throw error; });
  t.after(() => watchers.forEach(watcher => watcher.close()));

  async function expectChange(relativePath, update) {
    const filename = path.join(root, relativePath);
    changes.length = 0;
    update(filename);
    await waitFor(() => changes.includes(filename));
  }

  await expectChange(path.join('docs', 'topic', 'article.md'), filename => fs.appendFileSync(filename, '\nUpdated'));
  await expectChange('index.html', filename => fs.appendFileSync(filename, '\n'));
  await expectChange(path.join('docs', 'topic', 'new.md'), filename => fs.writeFileSync(filename, '# New'));
  await expectChange(path.join('docs', 'topic', 'images', 'screenshot.png'), filename => fs.writeFileSync(filename, 'image'));
  await expectChange(path.join('docs', 'topic', 'new.md'), filename => fs.unlinkSync(filename));

  fs.mkdirSync(path.join(root, 'docs', 'new-topic'));
  await delay(100);
  await expectChange(path.join('docs', 'new-topic', 'article.md'), filename => fs.writeFileSync(filename, '# New topic'));

  changes.length = 0;
  for (const directory of ['node_modules', '.git', '_build']) {
    fs.writeFileSync(path.join(root, directory, 'ignored.md'), '# Ignored');
  }
  await delay(200);
  assert.deepEqual(changes, []);
});

test('serves content with LiveReload and refreshes after an edit', async function (t) {
  const root = createFixture(t);
  const preview = await startPreview({ root, port: 0, liveReloadPort: 0 });
  t.after(() => preview.close());
  const url = `http://localhost:${preview.port}`;
  const response = await fetch(url, { headers: { Accept: 'text/html' } });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<body>Preview/);
  assert.ok(html.includes(`:${preview.liveReloadPort}/livereload.js`));

  const article = await fetch(`${url}/docs/topic/article.md`);
  assert.equal(await article.text(), '# Article');
  const fallback = await fetch(`${url}/docs/topic/article`, { headers: { Accept: 'text/html' } });
  assert.match(await fallback.text(), /<body>Preview/);
  const missing = await fetch(`${url}/docs/topic/missing.md`);
  assert.equal(missing.status, 404);
  const client = await fetch(`http://localhost:${preview.liveReloadPort}/livereload.js`);
  assert.equal(client.status, 200);
  assert.match(await client.text(), /LiveReload/);

  const refreshed = [];
  t.mock.method(preview.liveReload, 'refresh', filename => refreshed.push(filename));
  const filename = path.join(root, 'docs', 'topic', 'article.md');
  fs.appendFileSync(filename, '\nUpdated');
  await waitFor(() => refreshed.some(changedFile => changedFile === filename || changedFile === path.join(root, 'index.html')));
  const updated = await fetch(`${url}/docs/topic/article.md`);
  assert.equal(await updated.text(), '# Article\nUpdated');

  refreshed.length = 0;
  fs.appendFileSync(filename, '\nAnother update');
  fs.writeFileSync(path.join(root, 'build', 'preview.css'), 'body { color: black; }');
  await waitFor(() => refreshed.includes(path.join(root, 'index.html')));
});

test('validates port arguments explicitly', function () {
  assert.equal(parsePort('3000'), 3000);
  assert.equal(parsePort('0'), 0);
  for (const value of ['', 'abc', '-1', '1.5', '65536']) {
    assert.throws(() => parsePort(value), /Invalid port/);
  }
});
