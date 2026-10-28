'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { once } = require('node:events');
const { parseArgs } = require('node:util');
const connect = require('connect');
const history = require('connect-history-api-fallback');
const injectLiveReload = require('connect-livereload');
const getPort = require('get-port');
const livereload = require('livereload');
const serveStatic = require('serve-static');
const { CONTENT_DIRECTORIES } = require('./generate-sidebar');

const ROOT = path.resolve(__dirname, '..');
const WATCH_DIRECTORIES = [
  ...CONTENT_DIRECTORIES,
  'build',
  'data',
  'images',
  'templates',
  'wiki'
];

function watchPreview(root, onChange, onError) {
  const watchers = [];

  function watch(directory, recursive) {
    const watcher = fs.watch(directory, { recursive }, function (_event, filename) {
      if (filename) {
        const parts = filename.split(/[\\/]/);
        if (parts.some(part => part.startsWith('.') || part === 'node_modules')) {
          return;
        }
        // The root watcher observes files only, not changes to directory entries.
        if (!recursive && (parts.length !== 1 || !path.extname(filename))) {
          return;
        }
      }
      onChange(filename ? path.join(directory, filename) : path.join(root, 'index.html'));
    });
    watcher.on('error', onError);
    watchers.push(watcher);
  }

  try {
    watch(root, false);
    for (const directory of WATCH_DIRECTORIES) {
      const directoryPath = path.join(root, directory);
      if (fs.existsSync(directoryPath)) {
        watch(directoryPath, true);
      }
    }
  } catch (error) {
    for (const watcher of watchers) {
      watcher.close();
    }
    throw error;
  }

  return watchers;
}

async function startPreview({ root = ROOT, port = 3000, liveReloadPort = 35729 } = {}) {
  port = await getPort({ port });
  liveReloadPort = await getPort({ port: liveReloadPort, exclude: [port] });

  const app = connect();
  app.use(injectLiveReload({ port: liveReloadPort }));
  app.use(history({ index: '/index.html' }));
  app.use(serveStatic(root));

  const server = http.createServer(app);
  const liveReload = livereload.createServer({ port: liveReloadPort, noListen: true });
  let watchers = [];
  let reloadTimer;
  let closed = false;
  const changedFiles = new Set();

  async function close() {
    if (closed) {
      return;
    }
    closed = true;
    clearTimeout(reloadTimer);
    for (const watcher of watchers) {
      watcher.close();
    }
    if (liveReload.server) {
      for (const client of liveReload.server.clients) {
        client.terminate();
      }
      liveReload.close();
    }
    if (server.listening) {
      await new Promise((resolve, reject) => {
        server.close(error => error ? reject(error) : resolve());
      });
    }
  }

  function onError(error) {
    console.error('Local preview failed:', error);
    process.exitCode = 1;
    close().catch(closeError => console.error('Could not close the local preview:', closeError));
  }

  try {
    await new Promise((resolve, reject) => {
      liveReload.once('error', reject);
      liveReload.listen(function () {
        liveReload.removeListener('error', reject);
        resolve();
      });
    });
    liveReload.on('error', onError);
    server.listen(port);
    await once(server, 'listening');
    server.on('error', onError);
    watchers = watchPreview(root, function (filename) {
      changedFiles.add(filename);
      clearTimeout(reloadTimer);
      reloadTimer = setTimeout(function () {
        // A CSS-only refresh must not hide a content change in the same batch.
        const changedFile = changedFiles.size === 1 ? changedFiles.values().next().value : path.join(root, 'index.html');
        changedFiles.clear();
        liveReload.refresh(changedFile);
      }, 100);
    }, onError);
  } catch (error) {
    await close();
    throw error;
  }

  return { server, liveReload, port, liveReloadPort, close };
}

function parsePort(value) {
  const port = Number(value);
  if (!/^\d+$/.test(value) || !Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid port "${value}". Use an integer from 0 to 65535.`);
  }
  return port;
}

if (require.main === module) {
  (async function main() {
    const { values } = parseArgs({
      options: {
        port: { type: 'string', short: 'p', default: '3000' },
        'livereload-port': { type: 'string', short: 'P', default: '35729' }
      }
    });
    const preview = await startPreview({
      port: parsePort(values.port),
      liveReloadPort: parsePort(values['livereload-port'])
    });
    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.once(signal, () => {
        preview.close().catch(error => {
          console.error('Could not close the local preview:', error);
          process.exitCode = 1;
        });
      });
    }
    console.log(`Serving ${ROOT}\nListening at http://localhost:${preview.port}`);
  })().catch(error => {
    console.error('Local preview failed:', error);
    process.exitCode = 1;
  });
}

module.exports = { WATCH_DIRECTORIES, parsePort, startPreview, watchPreview };
