import { parentPort, workerData } from 'node:worker_threads';
import { performance } from 'node:perf_hooks';
import path from 'node:path';
import claims from '../../../build/checks/check-claims.js';
import { createArticleStore, now } from './article-storage.mjs';
import { coverageBinding, inspectExecution, verifyCoverage, verifyInbox } from './article-inbox.mjs';

if (!parentPort) throw new Error('Article verification requires its owning worker thread.');

try {
  const { workspace, home, action, state, entry, run, checkerOptions = {} } = workerData;
  if (typeof workspace !== 'string' || !path.isAbsolute(workspace) || typeof home !== 'string' || !path.isAbsolute(home)) {
    throw new Error('Verification requires explicit absolute workspace and private-home paths.');
  }
  if (Object.keys(checkerOptions).some(key => key !== 'sourceRevision') ||
      (checkerOptions.sourceRevision !== undefined && typeof checkerOptions.sourceRevision !== 'string')) {
    throw new Error('Unsupported verifier checker options.');
  }
  const store = await createArticleStore(workspace, home, { readOnly: true });
  const implementation = claims.createClaimChecker();
  const metrics = { checkCalls: 0, batchCalls: 0, checkMs: 0 };
  function measure(callback, count, batch = false) {
    const start = performance.now();
    try { return callback(); }
    finally {
      metrics.checkCalls += count;
      metrics.batchCalls += Number(batch);
      metrics.checkMs += performance.now() - start;
    }
  }
  const check = (root, files, options) => measure(() => implementation(root, files, { ...options, ...checkerOptions }), 1);
  check.batch = (root, files, options, batchOptions) =>
    measure(() => implementation.batch(root, files, { ...options, ...checkerOptions }, batchOptions), files.length, true);
  let result;
  if (action === 'inbox') result = await verifyInbox(store, state, check);
  else if (action === 'decision') {
    const inspection = await inspectExecution(store, run);
    result = { ...await verifyCoverage(store, entry, new Map([[run.id, inspection]]), check),
      article: entry.article, binding: coverageBinding(entry, run, inspection), checkedAt: now() };
  } else throw new Error('Unknown verification worker action.');
  parentPort.postMessage({ result, metrics, finishedAt: now() });
} catch (error) {
  parentPort.postMessage({ error: error.message, code: error.code });
}
