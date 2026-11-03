import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { once } from 'node:events';
import { randomBytes } from 'node:crypto';
import { WorkbenchError } from './state.mjs';

const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/presentation.mjs', ['presentation.mjs', 'text/javascript; charset=utf-8']],
  ['/style.css', ['style.css', 'text/css; charset=utf-8']]
]);

export function createHttpDiagnostics(session) {
  return (error, context) => {
    // Error-level SDK logs fail the agent turn; HTTP errors belong to the requesting page.
    return session.log(`Docs workbench: ${context.method} ${context.path} (HTTP ${context.status}, ${context.level}): ${error.message}`, {
      level: 'warning'
    }).catch(reportingError => {
      process.stderr.write(`Docs workbench could not report an HTTP diagnostic: ${reportingError.message}\n`);
    });
  };
}

export async function createWorkbenchServer(workbench, authorize, log) {
  const token = randomBytes(32).toString('hex');
  const files = new Map(await Promise.all([...assets].map(async ([route, [file, type]]) =>
    [route, { body: await readFile(new URL(`./${file}`, import.meta.url)), type }])));
  let url;
  const server = createServer(async (request, response) => {
    let pathname;
    response.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; media-src 'self'; base-uri 'none'; form-action 'none'");
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'no-referrer');
    response.setHeader('Cache-Control', 'no-store');
    function json(status, value) {
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }).end(JSON.stringify(value));
    }
    function report(error, status) {
      log(error, {
        level: status >= 500 ? 'error' : 'warning', status,
        method: request.method, path: pathname || '(invalid request target)'
      });
    }
    try {
      const target = new URL(request.url, url);
      pathname = target.pathname;
      if (request.headers.host !== new URL(url).host || target.origin !== url) throw new WorkbenchError('Foreign host rejected.', 403);
      if (request.method === 'GET' || request.method === 'HEAD') {
        const file = files.get(pathname);
        if (file) {
          response.writeHead(200, { 'Content-Type': file.type }).end(file.body);
        } else if (pathname === '/favicon.ico') {
          response.writeHead(204).end();
        } else if (pathname === '/bootstrap') {
          json(200, { token, state: await workbench.snapshot() });
        } else if (pathname === '/milestones') {
          json(200, await workbench.milestones());
        } else if (/^\/assets\/[a-f0-9-]{36}$/.test(pathname)) {
          const asset = await workbench.asset(pathname.slice('/assets/'.length));
          const size = (await stat(asset.file)).size;
          let start = 0;
          let end = size - 1;
          let status = 200;
          if (request.headers.range) {
            const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range);
            if (!range) throw new WorkbenchError('Unsupported byte range.', 416);
            start = Number(range[1]);
            end = range[2] ? Math.min(Number(range[2]), end) : end;
            if (start > end || start >= size) throw new WorkbenchError('Invalid byte range.', 416);
            response.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
            status = 206;
          }
          response.writeHead(status, {
            'Content-Type': { '.png': 'image/png', '.webm': 'video/webm', '.mp4': 'video/mp4' }[asset.extension],
            'Content-Length': end - start + 1, 'Accept-Ranges': 'bytes'
          });
          if (request.method === 'HEAD') {
            response.end();
            return;
          }
          const stream = createReadStream(asset.file, { start, end });
          stream.on('error', error => { response.destroy(error); report(error, 500); });
          response.on('close', () => stream.destroy());
          stream.pipe(response);
        } else throw new WorkbenchError('Not found.', 404);
      } else if (request.method === 'POST' && pathname === '/action') {
        if (request.headers.origin !== url || request.headers['x-workbench-token'] !== token ||
            request.headers['content-type'] !== 'application/json') throw new WorkbenchError('Invalid action origin or token.', 403);
        const chunks = [];
        let length = 0;
        for await (const chunk of request) {
          length += chunk.length;
          if (length > 256000) throw new WorkbenchError('Request is too large.', 413);
          chunks.push(chunk);
        }
        let body;
        try { body = JSON.parse(Buffer.concat(chunks).toString()); }
        catch { throw new WorkbenchError('Invalid JSON request.'); }
        if (!body || typeof body.action !== 'string' || !body.input || typeof body.input !== 'object' || Array.isArray(body.input)) {
          throw new WorkbenchError('Invalid action request.');
        }
        await authorize(body.action, body.input);
        json(200, await workbench.dispatch(body.action, body.input));
      } else throw new WorkbenchError('Method not allowed.', 405);
    } catch (error) {
      report(error, error.status || 500);
      if (!response.headersSent && !response.destroyed) json(error.status || 500, { error: error.message });
      else response.destroy(error);
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  url = `http://127.0.0.1:${server.address().port}`;
  return {
    url,
    close: () => new Promise((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve());
      server.closeAllConnections();
    })
  };
}
