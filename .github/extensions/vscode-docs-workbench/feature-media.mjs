import { randomUUID } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import capture from '../../../build/capture.js';
import media from '../../../build/media.js';
import preparation from '../../../build/capture-preparation.js';
import { atomicJson, format, hash, isHash, isTime, now, ownedPath, readBytes, readJson, validateRun } from './article-storage.mjs';

/* eslint-disable security/detect-non-literal-fs-filename -- Capture and preparation artifacts stay in guarded private run directories. */

const root = fileURLToPath(new URL('../../../', import.meta.url));
const quote = value => `'${value.replaceAll("'", "''")}'`;
export const mediaDescription = id => `Docs feature screenshot ${id}`;

export function validateMediaRuns(job) {
  if (job.media === undefined) return;
  if (!Array.isArray(job.media) || job.media.length > 10 ||
      new Set(job.media.map(run => run.proposalId)).size !== job.media.length) throw new Error('Invalid feature media executions.');
  for (const run of job.media) {
    validateRun(run);
    if (job.decision?.status !== 'approved' || !isHash(run.requestHash) || run.planHash !== job.ingestedHash ||
        typeof run.proposalId !== 'string' || !/^[a-z][a-z0-9-]{0,63}$/.test(run.proposalId)) throw new Error('Invalid media authorization.');
    if (run.review && (!['approved', 'rejected'].includes(run.review.decision) || !isHash(run.review.manifestHash) ||
        !isHash(run.review.assetHash) || !isHash(run.review.reviewHash) || typeof run.review.altText !== 'string')) {
      throw new Error('Invalid saved media review.');
    }
  }
}

export function createFeatureMedia(store, host, { stateFile, approved, currentSource, procedures, captureEditor = capture.captureEditor }) {
  async function directory(id, missing = false) {
    return ownedPath(store.home, path.join('extension-data', format, 'media-output', id), missing);
  }
  async function runFor(id) {
    const state = await stateFile.read();
    const job = state.jobs.find(job => job.media?.some(run => run.id === id));
    if (!job) throw new Error('Unknown screenshot run.');
    return { job, run: job.media.find(run => run.id === id) };
  }
  async function requestFor(run) {
    const request = await readJson(await ownedPath(await directory(run.id), 'request.json'));
    if (request.id !== run.id || request.ownerSessionId !== run.ownerSessionId ||
        hash(JSON.stringify(request)) !== run.requestHash) throw new Error('Screenshot request changed.');
    return request;
  }
  async function proposal(input) {
    const result = await approved(input.id, input.planHash);
    const item = result.plan.media.find(item => item.id === input.mediaId);
    if (!item) throw new Error('Choose a media proposal from the approved plan.');
    return { ...result, item };
  }
  async function options(input) {
    const result = await proposal(input);
    if (result.job.draft) throw new Error('This draft already started. Use a separately agreed follow-up for additional media.');
    if (result.item.kind !== 'screenshot') return { storyboards: [], builds: [], errors: ['Video remains pending. This first authoring slice supports screenshots.'] };
    const available = await procedures.options();
    return { ...available, storyboards: available.storyboards.filter(story =>
      story.article === result.item.article && story.channel === result.request.channel) };
  }
  async function prepare(input) {
    const result = await proposal(input);
    if (result.job.draft || result.job.media?.some(run => run.proposalId === input.mediaId)) {
      throw new Error('A draft or screenshot attempt already exists. Inspect it rather than automatically retrying.');
    }
    const available = await options(input);
    if (!available.storyboards.some(story => story.file === input.storyboard)) throw new Error('No matching reviewed screenshot procedure. Leave this proposal pending.');
    await currentSource(result.request);
    const procedure = await procedures.prepare(input);
    const implementationHash = hash(await readFile(fileURLToPath(import.meta.url)));
    const bindingHash = hash(JSON.stringify([result.planHash, result.item, procedure, implementationHash]));
    return { procedure, bindingHash, implementationHash };
  }
  async function inspect(run) {
    try {
      const request = await requestFor(run);
      const base = await directory(run.id);
      const receipt = await readJson(await ownedPath(base, 'receipt.json'));
      if (receipt.id !== run.id || receipt.requestHash !== run.requestHash || !isTime(receipt.finishedAt) ||
          receipt.finishedAt < run.createdAt || receipt.finishedAt > now()) throw new Error('Screenshot receipt identity changed.');
      if (receipt.outcome === 'failed') {
        if (typeof receipt.error !== 'string' || typeof receipt.cleanupRequired !== 'boolean') throw new Error('Invalid screenshot failure receipt.');
        return { state: 'execution-failed', message: receipt.error, cleanupRequired: receipt.cleanupRequired };
      }
      if (receipt.outcome !== 'candidate' || !isHash(receipt.manifestHash) ||
          (run.ingestedHash && run.ingestedHash !== hash(JSON.stringify(receipt)))) throw new Error('Screenshot receipt changed.');
      const manifestFile = await ownedPath(base, receipt.manifest);
      const manifest = await readJson(manifestFile);
      if (hash(await readBytes(manifestFile)) !== receipt.manifestHash) throw new Error('Screenshot preparation changed.');
      for (const file of [manifest.source?.path, manifest.capture?.path]) {
        if (!path.isAbsolute(file || '')) throw new Error('Screenshot provenance is incomplete.');
        await ownedPath(base, path.relative(base, file));
      }
      const prepared = media.verifyMedia({ manifest: manifestFile });
      if (prepared.manifestSha256 !== receipt.manifestHash ||
          prepared.manifest.capture?.storyboard.sha256 !== request.prepared.procedure.binding.storyboardHash ||
          prepared.manifest.capture.storyboard.article !== request.proposal.article) throw new Error('Screenshot preparation or provenance changed.');
      await ownedPath(base, path.relative(base, prepared.output));
      await ownedPath(base, path.relative(base, prepared.manifest.source.path));
      await ownedPath(base, path.relative(base, prepared.manifest.capture.path));
      if (run.review && (run.review.manifestHash !== prepared.manifestSha256 ||
          run.review.assetHash !== prepared.manifest.output.sha256 || run.review.decision !== prepared.approval ||
          run.review.reviewHash !== hash(await readBytes(await ownedPath(prepared.directory, 'review.json'))))) {
        throw new Error('Exact-asset review changed.');
      }
      return { state: 'valid', prepared, receiptHash: hash(JSON.stringify(receipt)), request };
    } catch (error) {
      const waiting = !run.ingestedHash && error.code === 'ENOENT' && path.basename(error.path || '') === 'receipt.json';
      return { state: waiting ? 'waiting' : 'invalid', message: waiting ? 'Waiting for the screenshot and preparation result.' : error.message };
    }
  }
  async function finished(run) {
    if (run.launch === 'not-started' || run.ingestedHash) return true;
    const result = await inspect(run);
    if (result.state !== 'execution-failed' || result.cleanupRequired || run.ownerSessionId !== host.ownerSessionId) return false;
    const task = host.find(await host.list(), run, mediaDescription(run.id));
    return ['idle', 'completed', 'failed', 'cancelled'].includes(task.status);
  }
  async function readiness(run) {
    const base = await directory(run.id);
    for (const entry of await readdir(base, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const child = await ownedPath(base, entry.name);
      try {
        try { await ownedPath(child, 'capture.json'); continue; } catch (error) { if (error.code !== 'ENOENT') throw error; }
        const pending = await readJson(await ownedPath(child, 'readiness-request.json'));
        try { await ownedPath(child, 'readiness-response.json'); continue; } catch (error) { if (error.code !== 'ENOENT') throw error; }
        if (pending.schemaVersion !== 1 || !isHash(pending.token) || !Number.isFinite(pending.expiresAt)) throw new Error('Invalid screenshot readiness request.');
        if (Date.now() < pending.expiresAt) return { directory: child, token: pending.token, expiresAt: pending.expiresAt };
      } catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
  }
  async function launch(input) {
    if (input.confirmed !== true) throw new Error('Confirm the exact procedure and an attended screenshot launch.');
    const prepared = await prepare(input);
    if (prepared.bindingHash !== input.bindingHash) throw new Error('Screenshot inputs changed. Review the procedure again.');
    const { job, item } = await proposal(input);
    const run = { id: randomUUID(), proposalId: item.id, planHash: job.ingestedHash, ownerSessionId: host.ownerSessionId,
      createdAt: now(), launch: 'starting', scope: [item.article], articles: [item.article] };
    const request = { id: run.id, planId: job.id, planHash: run.planHash, ownerSessionId: run.ownerSessionId, proposal: item, prepared };
    run.requestHash = hash(JSON.stringify(request));
    await stateFile.update(async state => {
      const current = state.jobs.find(value => value.id === job.id);
      if (current.draft || current.media?.some(value => value.proposalId === item.id) ||
          state.jobs.filter(value => value.sourceKey === current.sourceKey).at(-1).id !== job.id) throw new Error('The plan or media state changed.');
      for (const previous of state.jobs.flatMap(value => value.media || [])) {
        if (!await finished(previous)) throw new Error('Resolve the earlier screenshot attempt before launching another.');
      }
      (current.media ||= []).push(run);
    });
    try {
      const output = await directory(run.id, true);
      await mkdir(output, { recursive: true, mode: 0o700 });
      await directory(run.id);
      const profile = prepared.procedure.config.captureProfile;
      if (profile) {
        const parent = await ownedPath(store.home, path.relative(store.home, path.dirname(profile)), true);
        await mkdir(parent, { recursive: true });
        await ownedPath(store.home, path.relative(store.home, parent));
      }
      await atomicJson(await ownedPath(output, 'request.json', true), request);
    } catch (error) {
      await stateFile.update(state => Object.assign(state.jobs.find(value => value.id === job.id).media.find(value => value.id === run.id),
        { launch: 'not-started', error: error.message }));
      throw error;
    }
    try {
      const response = await host.start({ agentType: 'task', name: `feature-screenshot-${run.id}`, description: mediaDescription(run.id),
        prompt: `Run this approved attended screenshot command once:\nnode ${quote(path.join(root, '.github', 'extensions', 'vscode-docs-workbench', 'feature-plans.mjs'))} --capture ${quote(path.join(await directory(run.id), 'request.json'))}\nKeep it attached and wait for exit. The human handles native prompts and readiness through the canvas. Never confirm readiness, trust a workspace, sign in, or approve media yourself. Do not retry, edit documentation, install tools, create agents, commit, or publish. Report the exit code and any failure. Exit 0 means a private candidate requiring human review; exit 2 means failure.` });
      await stateFile.update(state => Object.assign(state.jobs.find(value => value.id === job.id).media.find(value => value.id === run.id),
        { launch: 'acknowledged', agentId: response.agentId }));
    } catch (error) {
      await stateFile.update(state => Object.assign(state.jobs.find(value => value.id === job.id).media.find(value => value.id === run.id),
        { launch: 'uncertain', error: `${error.message} Inspect the owning host; do not retry.` }));
    }
    return (await runFor(run.id)).run;
  }
  async function execute(requestFile) {
    const { job, run } = await runFor(path.basename(path.dirname(requestFile)));
    const base = await directory(run.id);
    if (requestFile !== await ownedPath(base, 'request.json') || run.launch === 'not-started') throw new Error('Use an authorized owned screenshot request.');
    return store.withLock(`media-${run.id}.lock`, async () => {
      await writeFile(await ownedPath(base, 'started.json', true), JSON.stringify({ startedAt: now() }), { flag: 'wx' });
      try {
        const request = await requestFor(run);
        const result = await approved(job.id, run.planHash);
        if (result.job.draft) throw new Error('Drafting already started. Screenshot generation is no longer authorized.');
        await currentSource(result.request);
        const procedure = await procedures.prepare(request.prepared.procedure.config);
        if (hash(JSON.stringify(procedure)) !== hash(JSON.stringify(request.prepared.procedure)) ||
            hash(await readFile(fileURLToPath(import.meta.url))) !== request.prepared.implementationHash) throw new Error('Reviewed screenshot procedure changed.');
        const storyFile = await ownedPath(store.workspace, path.join('build', 'storyboards', procedure.config.storyboard));
        const story = await readJson(storyFile);
        const captured = await captureEditor({ ...procedure.config, storyboard: storyFile, output: base,
          waitForReady: !!(story.workspace || story.fixture?.openFolder) });
        const captureFile = await ownedPath(base, path.relative(base, path.join(captured.directory, 'capture.json')));
        if (captured.manifest.product?.revision !== procedure.binding.product.revision) throw new Error('Captured product does not match the reviewed build.');
        const asset = captured.manifest.highlighted || captured.manifest.asset;
        const source = await ownedPath(captured.directory, asset.file);
        const prepared = media.prepareMedia({ input: source, sha256: asset.sha256, capture: captureFile,
          captureSha256: hash(await readBytes(captureFile)), output: base, recipe: { format: 'png' } });
        await atomicJson(await ownedPath(base, 'receipt.json', true), { id: run.id, requestHash: run.requestHash, finishedAt: now(),
          outcome: 'candidate', manifest: path.relative(base, prepared.manifest), manifestHash: prepared.manifestSha256 });
        return { status: 'candidate', approval: 'human-visual-review-required' };
      } catch (error) {
        const failed = error.capture?.manifest;
        await atomicJson(await ownedPath(base, 'receipt.json', true), { id: run.id, requestHash: run.requestHash, finishedAt: now(),
          outcome: 'failed', cleanupRequired: !!(failed?.runtimeRetained || failed?.cleanupError || failed?.captureProfile?.lockRetained),
          error: `${error.message} Preserve the attempt and inspect cleanup before any new capture.` });
        throw error;
      }
    });
  }
  async function collect() {
    const eligible = (await stateFile.read()).jobs.flatMap(job => job.media || []).filter(run =>
      !run.ingestedHash && run.launch === 'acknowledged' && !run.syncError && ['idle', 'completed'].includes(run.observation?.status));
    for (const run of eligible) {
      const result = await inspect(run);
      if (result.state !== 'valid') continue;
      await stateFile.update(state => {
        const current = state.jobs.flatMap(job => job.media || []).find(value => value.id === run.id);
        if (!current.syncError && ['idle', 'completed'].includes(current.observation?.status)) current.ingestedHash = result.receiptHash;
      });
    }
  }
  async function project(job) {
    const records = [];
    for (const run of job.media || []) {
      const result = await inspect(run);
      const accepted = result.state === 'valid' && !!run.ingestedHash;
      records.push({ id: run.id, proposalId: run.proposalId, state: accepted ? 'candidate' : result.state === 'valid' ? 'waiting' : result.state,
        message: result.message || (!accepted ? 'Waiting for owning-host completion.' : undefined), review: run.review,
        ...(accepted ? { assetHash: result.prepared.manifest.output.sha256, manifestHash: result.prepared.manifestSha256,
          width: result.prepared.manifest.output.validation.width, height: result.prepared.manifest.output.validation.height } : {}),
        readiness: run.launch === 'acknowledged' && run.ownerSessionId === host.ownerSessionId && result.state === 'waiting' ? await readiness(run) : undefined });
    }
    return records;
  }
  async function accepted(run) {
    const result = await inspect(run);
    if (!run.ingestedHash || result.state !== 'valid') throw new Error(result.message || 'Screenshot is not confirmed by its owning host.');
    return result;
  }
  async function assets(job) {
    const result = [];
    for (const run of job.media || []) {
      if (!await finished(run)) throw new Error('Finish or resolve screenshot generation before drafting.');
      if (run.review?.decision !== 'approved') continue;
      const candidate = await accepted(run);
      const article = candidate.request.proposal.article;
      const assetPath = path.posix.join(path.posix.dirname(article), 'images', path.posix.basename(article, '.md'), `${run.proposalId}.png`);
      result.push({ proposalId: run.proposalId, article, path: assetPath,
        reference: path.posix.relative(path.posix.dirname(article), assetPath), source: candidate.prepared.output,
        sha256: run.review.assetHash, manifest: candidate.prepared.manifestPath, manifestHash: run.review.manifestHash,
        reviewHash: run.review.reviewHash, altText: run.review.altText });
    }
    return result;
  }
  return {
    options, prepare, launch, execute, collect, project, inspect, assets,
    async asset(id) {
      const { run } = await runFor(id);
      const result = await accepted(run);
      return { file: result.prepared.output, extension: '.png' };
    },
    async ready(input) {
      if (input.confirmed !== true || typeof input.ready !== 'boolean') throw new Error('Relay an explicit human readiness decision.');
      const { run } = await runFor(input.id);
      if (run.ownerSessionId !== host.ownerSessionId || run.launch !== 'acknowledged') throw new Error('Use the owning session to confirm readiness.');
      const pending = await readiness(run);
      if (!pending) throw new Error('No current screenshot readiness request.');
      preparation.replyToReadiness(pending.directory, pending.token, input.ready);
      return { ready: input.ready };
    },
    async review(input) {
      if (input.confirmed !== true || !['approved', 'rejected'].includes(input.decision)) throw new Error('Confirm an exact-asset human review.');
      const altText = typeof input.altText === 'string' ? input.altText.trim() : '';
      if (input.decision === 'approved' && (!/^Screenshot (showing|of) \S/.test(altText) || altText.length > 1000 || /[\r\n]/.test(altText))) {
        throw new Error('Describe the reviewed image with alt text starting with Screenshot showing or Screenshot of.');
      }
      return stateFile.update(async state => {
        const job = state.jobs.find(job => job.media?.some(run => run.id === input.id));
        const run = job?.media.find(run => run.id === input.id);
        if (!run || run.review || job.draft) throw new Error('Review is already saved, unknown, or drafting has started.');
        const result = await accepted(run);
        if (input.assetHash !== result.prepared.manifest.output.sha256 || input.manifestHash !== result.prepared.manifestSha256) throw new Error('The preview changed. Review the exact candidate again.');
        const decision = media.recordReview({ manifest: result.prepared.manifestPath, manifestSha256: input.manifestHash,
          sha256: input.assetHash, decision: input.decision, reviewer: 'Human in the docs writing canvas',
          evidence: `Explicit ${input.decision} decision for the displayed exact screenshot.`, confirmReviewed: true });
        run.review = { decision: input.decision, altText, manifestHash: input.manifestHash, assetHash: input.assetHash,
          reviewHash: hash(await readBytes(decision.review)) };
        return run.review;
      });
    }
  };
}
