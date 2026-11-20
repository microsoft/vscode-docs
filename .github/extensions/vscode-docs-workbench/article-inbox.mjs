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

async function assertCurrent(store, report, check) {
  await resolveArticle(store.workspace, report.scanPaths[0]);
  const current = check(store.workspace, report.scanPaths, { links: true });
  findings.assertReportCurrent(report, current);
  const observations = value => value.findings.map(({ firstSeen, lastSeen, ...finding }) => finding)
    .sort((left, right) => left.id.localeCompare(right.id));
  if (JSON.stringify(observations(report)) !== JSON.stringify(observations(current))) {
    throw new Error('Stale findings report: checker observations changed. Rerun the checker.');
  }
}

export async function collectInbox(store, check) {
  const inspected = new Map();
  const initial = await store.read();
  for (const run of initial.runs) {
    if (run.launch !== 'not-started') inspected.set(run.id, await inspectExecution(store, run));
  }
  const ready = initial.runs.filter(run => inspected.get(run.id)?.state === 'valid' && !run.ingestedHash);
  if (ready.length) await store.update(async state => {
    for (const candidate of ready) {
      const run = state.runs.find(run => run.id === candidate.id);
      if (run.ingestedHash) continue;
      const result = await inspectExecution(store, run);
      inspected.set(run.id, result);
      if (result.state !== 'valid') continue;
      try {
        // Validate the entire batch before importing anything, including articles with no findings.
        for (const report of result.reports) await assertCurrent(store, report, check);
      } catch (error) {
        inspected.set(run.id, { ...result, state: error.code === 'ENOENT' || error.message.startsWith('Stale findings report:') ?
          'stale' : 'freshness-failed', message: error.message });
        continue;
      }
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
          const { findings: observations, ...metadata } = report;
          const entry = {
            article, articleHash: result.request.articles.at(index).sha256,
            runId: run.id, reportHash: result.reportHash, report: metadata,
            findingIds: observations.map(finding => finding.id)
          };
          coverage = coverage.filter(entry => entry.article !== article);
          coverage.push(entry);
        }
      } catch (error) {
        inspected.set(run.id, { ...result, state: 'invalid', message: error.message });
        continue;
      }
      state.review = review;
      state.coverage = coverage;
      run.ingestedHash = result.reportHash;
    }
  });
  return inspected;
}

export function coverageToken(entry) {
  return hash(JSON.stringify([entry.runId, entry.reportHash, entry.report.inputHash]));
}

async function verifyCoverage(store, entry, inspected, check) {
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
  try {
    await assertCurrent(store, report, check);
    return { freshness: 'fresh' };
  } catch (error) {
    return { freshness: error.code === 'ENOENT' || error.message.startsWith('Stale findings report:') ? 'stale' : 'unavailable',
      message: error.message };
  }
}

export async function inboxSnapshot(store, state, articles, inspected, check) {
  const verified = new Map();
  for (const entry of state.coverage) verified.set(entry.article, {
    ...entry, ...await verifyCoverage(store, entry, inspected, check), token: coverageToken(entry)
  });
  const records = state.review.findings.map(record => {
    const verification = verified.get(record.finding.article);
    const freshness = verification?.freshness === 'fresh'
      ? verification.findingIds.includes(record.finding.id) ? 'fresh' : 'not-observed'
      : verification?.freshness || 'unavailable';
    const report = state.review.reports.find(entry => entry.id === record.reportId).report;
    return {
      ...record, freshness, reviewable: ['fresh', 'not-observed'].includes(freshness),
      coverageToken: verification?.token,
      message: freshness === 'not-observed'
        ? 'Not observed in the latest applicable scan. Retained for an explicit decision; not automatically fixed.'
        : verification?.message,
      provenance: {
        report, lastVerification: verification?.report.generatedAt,
        runId: verification?.runId,
        scope: state.runs.find(run => run.id === verification?.runId)?.scope,
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
    const incomplete = latest && (!verification || latest.id !== verification.runId || verification.freshness === 'unavailable');
    return {
      article, state: incomplete ? 'incomplete' : !verification ? 'never-checked' :
        verification.freshness !== 'fresh' ? 'stale' : verification.findingIds.length ? 'findings' : 'clean',
      attempt, verification,
      retained: records.filter(record => record.finding.article === article && record.freshness === 'not-observed').length
    };
  });
  return { findings: records, coverage, checkedAt: now() };
}

export async function triageInbox(store, input, check) {
  const reason = text(input.reason, 'Decision reason', 4000);
  return store.update(async state => {
    const record = state.review.findings.find(record => record.finding.id === input.findingId);
    if (!record || record.evidenceHash !== input.evidenceHash) throw new WorkbenchError('Finding evidence changed since review; reload before deciding.', 409);
    const entry = state.coverage.find(entry => entry.article === record.finding.article);
    if (!entry || input.coverageToken !== coverageToken(entry)) throw new WorkbenchError('Verification changed since review; reload before deciding.', 409);
    const run = state.runs.find(run => run.id === entry.runId);
    const result = await verifyCoverage(store, entry, new Map([[run.id, await inspectExecution(store, run)]]), check);
    if (result.freshness !== 'fresh') throw new WorkbenchError(`Cannot decide on ${result.freshness} evidence: ${result.message}`, 409);
    return auditFindings.triageFinding(state.review, {
      id: input.findingId, evidenceHash: input.evidenceHash, status: input.status, reason
    }, now());
  });
}
