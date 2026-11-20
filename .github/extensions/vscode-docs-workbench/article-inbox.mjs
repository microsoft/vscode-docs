import findings from '../../../build/findings.js';
import auditFindings from '../../../build/audit-findings.js';
import { WorkbenchError, text } from './state.mjs';
import { hash, now, resolveArticle } from './article-storage.mjs';
import { loadRunArtifacts } from './article-artifacts.mjs';

export async function inspectExecution(store, run) {
  const checkedAt = now();
  try {
    const artifacts = await loadRunArtifacts(store, run);
    const completion = { state: 'finished', outcome: artifacts.receipt.outcome, finishedAt: artifacts.receipt.finishedAt, checkedAt };
    if (artifacts.receipt.outcome === 'execution-failed') {
      return { state: 'execution-failed', message: artifacts.receipt.error, completion, checkedAt };
    }
    const alreadyIngested = run.ingestedHash === artifacts.reportHash;
    if (!alreadyIngested && (run.launch !== 'acknowledged' || run.syncError || !['idle', 'completed'].includes(run.observation?.status))) {
      return { state: 'unconfirmed', message: 'A report exists, but the owning task must be observed idle or completed before ingestion.',
        completion, checkedAt };
    }
    return { state: 'valid', ...artifacts, completion, checkedAt };
  } catch (error) {
    return { state: error.code === 'ENOENT' ? 'missing' : 'invalid', message: error.message, checkedAt,
      completion: { state: 'unverified', message: error.message, checkedAt } };
  }
}

async function currentReports(store, reports, check) {
  const current = new Map();
  const articles = [];
  for (const article of new Set(reports.map(report => report.scanPaths[0]))) {
    try { await resolveArticle(store.workspace, article); articles.push(article); }
    catch (error) { current.set(article, error); }
  }
  if (check.batch && articles.length) {
    try {
      const checked = check.batch(store.workspace, articles, { links: true }, { settled: true });
      articles.forEach((article, index) => current.set(article, checked.at(index)));
    } catch (error) {
      const incomplete = new Error(`Batch verification did not complete consistently: ${error.message}`);
      for (const article of articles) current.set(article, incomplete);
    }
  } else {
    for (const article of articles) {
      try { current.set(article, check(store.workspace, [article], { links: true })); }
      catch (error) { current.set(article, error); }
    }
  }
  return current;
}

function assertCurrent(report, current) {
  if (current instanceof Error) throw current;
  findings.assertReportCurrent(report, current);
  const observations = value => value.findings.map(({ firstSeen, lastSeen, ...finding }) => finding)
    .sort((left, right) => left.id.localeCompare(right.id));
  if (JSON.stringify(observations(report)) !== JSON.stringify(observations(current))) {
    throw new Error('Stale findings report: checker observations changed. Rerun the checker.');
  }
}

export async function inspectInbox(store, state) {
  const inspected = new Map();
  for (const run of state.runs) {
    if (run.launch !== 'not-started') inspected.set(run.id, await inspectExecution(store, run));
  }
  return inspected;
}

export function executionBinding(run, result) {
  return hash(JSON.stringify([
    run.id, run.ownerSessionId, run.agentId, run.createdAt, run.scope, run.articles,
    result?.state, result?.message, result?.request, result?.receipt, result?.reportHash
  ]));
}

export function coverageBinding(entry, run, result, execution = executionBinding(run, result)) {
  return hash(JSON.stringify([entry, execution]));
}

export function inboxBindings(state, inspected) {
  const executions = new Map(state.runs.map(run => [run.id, executionBinding(run, inspected.get(run.id))]));
  const coverage = new Map(state.coverage.map(entry =>
    [entry.article, coverageBinding(entry, undefined, undefined, executions.get(entry.runId))]));
  return { executions, coverage };
}

function coverageEntry(run, result, index) {
  const { findings: observations, ...metadata } = result.reports.at(index);
  return {
    article: metadata.scanPaths[0], articleHash: result.request.articles.at(index).sha256,
    runId: run.id, reportHash: result.reportHash, report: metadata,
    findingIds: observations.map(finding => finding.id)
  };
}

// This stage is read-only and can be terminated without leaving a writer or a private lock.
export async function verifyInbox(store, state, check) {
  const inspected = await inspectInbox(store, state);
  const bindings = inboxBindings(state, inspected);
  const ready = state.runs.filter(run => inspected.get(run.id)?.state === 'valid' && !run.ingestedHash);
  const reports = ready.flatMap(run => inspected.get(run.id).reports);
  for (const entry of state.coverage) {
    const report = inspectCoverage(entry, inspected).report;
    if (report) reports.push(report);
  }
  const current = await currentReports(store, reports, check);
  const attempts = [];
  const proofs = [];
  for (const run of ready) {
    const result = inspected.get(run.id);
    const binding = bindings.executions.get(run.id);
    try {
      for (const report of result.reports) assertCurrent(report, current.get(report.scanPaths[0]));
      attempts.push({ id: run.id, binding, state: 'valid', candidate: true });
      result.reports.forEach((_, index) => {
        const entry = coverageEntry(run, result, index);
        proofs.push({ article: entry.article, binding: coverageBinding(entry, run, result, binding), freshness: 'fresh' });
      });
    } catch (error) {
      attempts.push({ id: run.id, binding, state: error.code === 'ENOENT' || error.message.startsWith('Stale findings report:') ?
        'stale' : 'freshness-failed', message: error.message });
    }
  }
  for (const entry of state.coverage) {
    const run = state.runs.find(run => run.id === entry.runId);
    proofs.push({
      article: entry.article, binding: bindings.coverage.get(entry.article),
      ...await verifyCoverage(store, entry, inspected, check, current)
    });
  }
  return { attempts, proofs, checkedAt: now() };
}

export async function commitVerifiedInbox(store, verification, isCurrent = () => true, mayIngest = () => true) {
  const candidates = verification.attempts.filter(attempt => attempt.candidate);
  if (!candidates.length || !isCurrent()) return;
  await store.update(async state => {
    for (const candidate of candidates) {
      if (!isCurrent()) return;
      const run = state.runs.find(run => run.id === candidate.id);
      if (!run || run.ingestedHash) continue;
      if (!mayIngest(run)) {
        Object.assign(candidate, { candidate: false, state: 'unconfirmed',
          message: 'Owning-host confirmation is pending or unavailable. Refresh to reconcile it before ingestion.' });
        continue;
      }
      const result = await inspectExecution(store, run);
      if (!isCurrent()) return;
      if (result.state !== 'valid' || executionBinding(run, result) !== candidate.binding) continue;
      const review = structuredClone(state.review);
      let coverage = [...state.coverage];
      try {
        for (const [index, report] of result.reports.entries()) {
          const article = report.scanPaths[0];
          const previous = coverage.find(entry => entry.article === article);
          if (previous && previous.report.generatedAt > report.generatedAt) continue;
          auditFindings.importFindings(review, report, now(), {
            previousVerification: previous && { report: previous.report, findingIds: previous.findingIds }
          });
          coverage = coverage.filter(entry => entry.article !== article);
          coverage.push(coverageEntry(run, result, index));
        }
      } catch (error) {
        Object.assign(candidate, { candidate: false, state: 'invalid', message: error.message });
        continue;
      }
      state.review = review;
      state.coverage = coverage;
      run.ingestedHash = result.reportHash;
    }
  });
}

export async function collectInbox(store, check) {
  const verification = await verifyInbox(store, await store.read(), check);
  await commitVerifiedInbox(store, verification);
  const state = await store.read();
  const inspected = await inspectInbox(store, state);
  for (const attempt of verification.attempts) {
    const run = state.runs.find(run => run.id === attempt.id);
    const result = inspected.get(attempt.id);
    if (run && executionBinding(run, result) === attempt.binding) {
      inspected.set(run.id, { ...result, state: attempt.state, message: attempt.message });
    }
  }
  return inspected;
}

export function coverageToken(entry) {
  return hash(JSON.stringify([entry.runId, entry.reportHash, entry.report.inputHash]));
}

export function inspectCoverage(entry, inspected) {
  const execution = inspected.get(entry.runId);
  if (execution?.state !== 'valid' || execution.reportHash !== entry.reportHash) {
    return { freshness: 'unavailable', message: execution?.message || 'Saved execution provenance is unavailable.' };
  }
  const report = execution.reports.find(report => report.scanPaths[0] === entry.article);
  const { findings: observations, ...metadata } = report || {};
  if (!report || JSON.stringify(metadata) !== JSON.stringify(entry.report) ||
      JSON.stringify(observations.map(finding => finding.id)) !== JSON.stringify(entry.findingIds) ||
      execution.request.articles.find(article => article.path === entry.article)?.sha256 !== entry.articleHash) {
    return { freshness: 'unavailable', message: 'Coverage does not match its saved execution evidence.' };
  }
  return { report };
}

export async function verifyCoverage(store, entry, inspected, check, current) {
  const evidence = inspectCoverage(entry, inspected);
  if (!evidence.report) return evidence;
  try {
    const report = evidence.report;
    current ||= await currentReports(store, [report], check);
    assertCurrent(report, current.get(entry.article));
    return { freshness: 'fresh' };
  } catch (error) {
    return { freshness: error.code === 'ENOENT' || error.message.startsWith('Stale findings report:') ? 'stale' : 'unavailable',
      message: error.message };
  }
}

export async function inboxSnapshot(store, state, articles, inspected, check) {
  const reports = state.coverage.flatMap(entry => {
    const execution = inspected.get(entry.runId);
    return execution?.state === 'valid' && execution.reportHash === entry.reportHash
      ? execution.reports.filter(report => report.scanPaths[0] === entry.article) : [];
  });
  const current = await currentReports(store, reports, check);
  const verified = new Map();
  for (const entry of state.coverage) verified.set(entry.article, {
    ...entry, ...await verifyCoverage(store, entry, inspected, check, current), token: coverageToken(entry)
  });
  return inboxView(state, articles, inspected, verified);
}

export function inboxView(state, articles, inspected, verified, checkedAt = now()) {
  const metadata = new Map(state.review.reports.map(entry => [entry.id, entry.report]));
  const runs = new Map(state.runs.map(run => [run.id, run]));
  const records = state.review.findings.map(record => {
    const verification = verified.get(record.finding.article);
    const notObserved = verification && !verification.findingIds.includes(record.finding.id);
    const freshness = verification?.freshness === 'fresh'
      ? notObserved ? 'not-observed' : 'fresh'
      : verification?.freshness || 'unavailable';
    const report = metadata.get(record.reportId);
    return {
      ...record, freshness, observation: notObserved ? 'not-observed' : 'observed',
      reviewable: ['fresh', 'not-observed', 'checking'].includes(freshness) ||
        (freshness === 'unavailable' && verification?.canValidateOnSave === true),
      coverageToken: verification?.token,
      message: freshness === 'not-observed'
        ? 'Not observed in the latest applicable scan. Retained for an explicit decision; not automatically fixed.'
        : freshness === 'checking' && notObserved
          ? 'Not observed in the last accepted scan. Retained for an explicit decision; current freshness is being checked.'
          : verification?.message,
      provenance: {
        report, lastVerification: verification?.report.generatedAt,
        currentCheckedAt: verification?.checkedAt,
        runId: verification?.runId,
        scope: runs.get(verification?.runId)?.scope,
        product: 'No product build or manifest supplied. Public availability is unverified.'
      }
    };
  });
  const coverage = [...new Set([...articles, ...verified.keys(), ...records.map(record => record.finding.article)])].sort().map(article => {
    const verification = verified.get(article);
    const latest = state.runs.filter(run => run.launch !== 'not-started' && run.articles.includes(article)).at(-1);
    const attempt = latest ? {
      id: latest.id, at: latest.createdAt, state: inspected.get(latest.id)?.state || 'unconfirmed',
      message: inspected.get(latest.id)?.message
    } : undefined;
    const incomplete = latest && (!verification || latest.id !== verification.runId);
    return {
      article, state: incomplete ? 'incomplete' : !verification ? 'never-checked' :
        verification.freshness === 'checking' ? 'checking' :
          verification.freshness === 'unavailable' ? 'unavailable' :
            verification.freshness !== 'fresh' ? 'stale' : verification.findingIds.length ? 'findings' : 'clean',
      lastAcceptedState: verification ? verification.findingIds.length ? 'findings' : 'clean' : undefined,
      attempt, verification,
      retained: records.filter(record => record.finding.article === article && record.freshness === 'not-observed').length
    };
  });
  return { findings: records, coverage, checkedAt };
}

export async function triageInbox(store, input, check, verify) {
  const reason = text(input.reason, 'Decision reason', 4000);
  return store.update(async state => {
    const record = state.review.findings.find(record => record.finding.id === input.findingId);
    if (!record || record.evidenceHash !== input.evidenceHash) throw new WorkbenchError('Finding evidence changed since review; reload before deciding.', 409);
    const entry = state.coverage.find(entry => entry.article === record.finding.article);
    if (!entry || input.coverageToken !== coverageToken(entry)) throw new WorkbenchError('Verification changed since review; reload before deciding.', 409);
    const run = state.runs.find(run => run.id === entry.runId);
    const result = verify ? await verify(entry, run) :
      await verifyCoverage(store, entry, new Map([[run.id, await inspectExecution(store, run)]]), check);
    if (result.freshness !== 'fresh') throw new WorkbenchError(`Cannot decide on ${result.freshness} evidence: ${result.message}`, 409);
    return auditFindings.triageFinding(state.review, {
      id: input.findingId, evidenceHash: input.evidenceHash, status: input.status, reason
    }, now());
  });
}
