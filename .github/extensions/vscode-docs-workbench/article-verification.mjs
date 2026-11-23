import { Worker } from 'node:worker_threads';
import { WorkbenchError } from './state.mjs';
import { hash, now } from './article-storage.mjs';
import {
  commitVerifiedInbox, coverageToken, executionBinding, inboxBindings, inspectCoverage, inspectExecution,
  inspectInbox, verifyCoverage, verifyInbox
} from './article-inbox.mjs';

export function startVerificationWorker(data, timeout) {
  const worker = new Worker(new URL('./article-verifier.mjs', import.meta.url), {
    workerData: data, resourceLimits: { maxOldGenerationSizeMb: 768 }, trackUnmanagedFds: true
  });
  let message;
  let failure;
  let cancel;
  const done = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      failure = new Error('Freshness verification timed out. Saved findings are retained; refresh to retry. No host task was cancelled.');
      void worker.terminate().catch(error => { failure = error; });
    }, timeout);
    worker.on('message', value => { message = value; });
    worker.on('error', error => { failure = error; });
    worker.on('exit', code => {
      clearTimeout(timer);
      if (failure) reject(failure);
      else if (code !== 0 || !message) reject(new Error(`Verification worker exited without a result (${code}).`));
      else if (message.error) reject(Object.assign(new Error(message.error), { code: message.code }));
      else resolve(message);
    });
    cancel = async () => {
      failure ||= new Error('Freshness verification stopped. Saved findings are retained; refresh to retry. No host task was cancelled.');
      await worker.terminate();
    };
  });
  return { done, cancel, get failure() { return failure; } };
}

export function createProgressiveVerification({
  store, check, checkerOptions = {}, timeout = 120_000, onMetrics = () => {}, launchWorker = startVerificationWorker,
  mayIngest = () => true
}) {
  if (!Number.isFinite(timeout) || timeout < 1 || timeout > 120_000) throw new Error('Verification timeout must be between 1 and 120000 milliseconds.');
  const proofs = new Map();
  const attempts = new Map();
  let active;
  let decision;
  let latest;
  let attempted;
  let requestedAt = '';
  let latestDecisionAt = '';
  let generation = 0;
  let status = { state: 'idle' };
  let disposed = false;
  let paused = false;
  function currentStatus() {
    return active?.task.failure && status.state === 'checking'
      ? { state: 'failed', terminating: true, message: `${active.task.failure.message} Waiting for worker termination.` }
      : { ...status };
  }

  function signature(state, inspected) {
    const bindings = inboxBindings(state, inspected);
    return hash(JSON.stringify([
      [...bindings.coverage.values()],
      state.runs.filter(run => !run.ingestedHash && inspected.get(run.id)?.state === 'valid')
        .map(run => [bindings.executions.get(run.id), run.observation?.observedAt])
    ]));
  }
  function work(action, input) {
    if (check) {
      // Function injection is for deterministic tests; production always uses a worker thread.
      const done = Promise.resolve().then(async () => ({
        result: action === 'inbox' ? await verifyInbox(store, input.state, check) :
          await verifyCoverage(store, input.entry, new Map([[input.run.id, await inspectExecution(store, input.run)]]), check),
        metrics: {}, finishedAt: now()
      }));
      return { done, cancel: async () => { await done.catch(() => {}); } };
    }
    return launchWorker({ workspace: store.workspace, home: store.home, action, checkerOptions, ...input }, timeout);
  }
  function start(state, inspected, key) {
    if (disposed || active) return;
    attempted = key;
    proofs.clear();
    attempts.clear();
    const epoch = ++generation;
    status = { state: 'checking', startedAt: now() };
    let task;
    try { task = work('inbox', { state: { runs: state.runs, coverage: state.coverage } }); }
    catch (error) { status = { state: 'failed', message: error.message, finishedAt: now() }; return; }
    const pending = { task, epoch, key };
    active = pending;
    pending.done = (async () => {
      try {
        const completion = await task.done;
        if (generation !== epoch || disposed) return;
        onMetrics(completion.metrics);
        if (requestedAt > completion.finishedAt || latestDecisionAt > completion.finishedAt) {
          const current = await store.read();
          const currentInspected = await inspectInbox(store, current);
          latest = { state: current, inspected: currentInspected, key: signature(current, currentInspected) };
          return;
        }
        let commitError;
        try {
          await commitVerifiedInbox(store, completion.result,
            () => generation === epoch && !disposed && requestedAt <= completion.finishedAt && latestDecisionAt <= completion.finishedAt,
            mayIngest);
        }
        catch (error) { commitError = error; }
        if (generation !== epoch || disposed) return;
        if (requestedAt > completion.finishedAt || latestDecisionAt > completion.finishedAt) {
          const current = await store.read();
          const currentInspected = await inspectInbox(store, current);
          latest = { state: current, inspected: currentInspected, key: signature(current, currentInspected) };
          return;
        }
        for (const proof of completion.result.proofs) {
          if (!proofs.has(proof.binding) || proofs.get(proof.binding).checkedAt <= completion.result.checkedAt) {
            proofs.set(proof.binding, { ...proof, checkedAt: completion.result.checkedAt });
          }
        }
        for (const attempt of completion.result.attempts) attempts.set(attempt.id, attempt);
        status = commitError
          ? { state: 'failed', message: `Could not incorporate new results: ${commitError.message}`, checkedAt: completion.result.checkedAt }
          : { state: 'complete', startedAt: status.startedAt, checkedAt: completion.result.checkedAt,
            ...(completion.result.proofs.some(proof => proof.freshness === 'unavailable') ||
                completion.result.attempts.some(attempt => attempt.state === 'freshness-failed')
              ? { message: 'Some current verification is unavailable. Saved evidence is retained; inspect the details or refresh to retry.' } : {}) };
        // Read the latest state, never replace coverage or human decisions from the worker's copy.
        const current = await store.read();
        const currentInspected = await inspectInbox(store, current);
        const currentKey = signature(current, currentInspected);
        const bindings = inboxBindings(current, currentInspected);
        const covered = current.coverage.every(entry => proofs.has(bindings.coverage.get(entry.article)));
        const newReady = current.runs.some(run => !run.ingestedHash && currentInspected.get(run.id)?.state === 'valid' &&
          attempts.get(run.id)?.binding !== executionBinding(run, currentInspected.get(run.id)));
        attempted = currentKey;
        if (commitError) { latest = undefined; return; }
        if (!covered || newReady || requestedAt > completion.finishedAt) {
          latest = { state: current, inspected: currentInspected, key: currentKey };
        } else latest = undefined;
      } catch (error) {
        if (generation === epoch && !disposed) status = { state: 'failed', message: error.message, finishedAt: now() };
        latest = undefined;
      } finally {
        if (active === pending) active = undefined;
        if (latest && !disposed && generation === epoch) {
          const next = latest;
          latest = undefined;
          start(next.state, next.inspected, next.key);
        }
      }
    })();
  }
  function request(state, inspected, force = false) {
    if (disposed) throw new WorkbenchError('This verification instance has been disposed.', 409);
    const key = signature(state, inspected);
    if (force) { requestedAt = now(); proofs.clear(); paused = false; }
    if (paused) return;
    if (!state.coverage.length && !state.runs.some(run => !run.ingestedHash && inspected.get(run.id)?.state === 'valid')) {
      attempted = key;
      if (force && !active) status = { state: 'idle' };
      return;
    }
    if (active) {
      if (key !== active.key) latest = { state, inspected, key };
      return;
    }
    const confirmedDeferred = state.runs.some(run => !run.ingestedHash &&
      inspected.get(run.id)?.state === 'valid' && attempts.get(run.id)?.state === 'unconfirmed' && mayIngest(run));
    if (force || key !== attempted || confirmedDeferred) start(state, inspected, key);
  }
  function view(state, inspected) {
    const verified = new Map();
    const bindings = inboxBindings(state, inspected);
    const current = currentStatus();
    for (const entry of state.coverage) {
      const evidence = inspectCoverage(entry, inspected);
      const binding = bindings.coverage.get(entry.article);
      const proof = proofs.get(binding);
      const result = !evidence.report ? evidence : proof || (['failed', 'cancelled', 'cancelling'].includes(current.state)
        ? { freshness: 'unavailable', message: current.message }
        : { freshness: 'checking' });
      verified.set(entry.article, { ...entry, ...result, canValidateOnSave: !!evidence.report, token: coverageToken(entry) });
    }
    return verified;
  }
  function observed(run, result) {
    const attempt = attempts.get(run.id);
    return attempt?.binding === executionBinding(run, result) ? { ...result, state: attempt.state, message: attempt.message } : result;
  }
  async function whenSettled() {
    while (active) await active.done;
  }
  async function cancel() {
    paused = true;
    generation++;
    latest = undefined;
    const pending = active;
    status = { state: 'cancelling', message: 'Stopping local verification. Saved findings are retained; no host task is being cancelled.' };
    if (pending) {
      try { await pending.task.cancel(); await pending.done; }
      catch (error) {
        status = { state: 'failed', message: `Worker termination could not be confirmed: ${error.message}` };
        throw error;
      }
    }
    status = { state: 'cancelled', message: 'Freshness verification stopped. Saved findings are retained; refresh to retry. No host task was cancelled.' };
  }
  return {
    request, view, observed, whenSettled, cancel,
    get status() { return currentStatus(); },
    async verifyDecision(entry, run) {
      if (decision) throw new WorkbenchError('Another decision is being verified. Wait for it to finish.', 409);
      decision = work('decision', { entry, run });
      try {
        const completion = await decision.done;
        onMetrics(completion.metrics);
        latestDecisionAt = completion.finishedAt;
        if (completion.result.binding) proofs.set(completion.result.binding, completion.result);
        return completion.result;
      } finally { decision = undefined; }
    },
    async dispose() {
      disposed = true;
      await cancel();
      const pendingDecision = decision;
      if (pendingDecision) {
        await pendingDecision.cancel();
        await pendingDecision.done.catch(() => {});
      }
    }
  };
}
