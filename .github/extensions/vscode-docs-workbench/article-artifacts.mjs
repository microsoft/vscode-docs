import findings from '../../../build/findings.js';
import { checks, format, hash, isTime, now, readBytes, readJson, version } from './article-storage.mjs';
import { validateRequest } from './article-runner.mjs';

// Completion checks bind saved artifacts to their run, without reading current article contents.
export function validateRunArtifacts({ workspace, run, request, receipt, reportBytes }) {
  validateRequest(request, workspace);
  if (request.id !== run.id || request.ownerSessionId !== run.ownerSessionId ||
      JSON.stringify(request.scope) !== JSON.stringify(run.scope) ||
      JSON.stringify(request.articles.map(article => article.path)) !== JSON.stringify(run.articles)) {
    throw new Error('Artifact request owner or scope mismatch.');
  }
  if (!receipt || receipt.format !== format || receipt.version !== version || receipt.id !== run.id ||
      receipt.ownerSessionId !== run.ownerSessionId || !isTime(receipt.startedAt) || !isTime(receipt.finishedAt) ||
      receipt.requestHash !== hash(JSON.stringify(request)) ||
      receipt.startedAt < run.createdAt || receipt.startedAt > receipt.finishedAt || receipt.finishedAt > now()) {
    throw new Error('Invalid runner receipt or owner mismatch.');
  }
  const keys = ['format', 'version', 'id', 'ownerSessionId', 'requestHash', 'startedAt', 'finishedAt', 'outcome',
    ...(receipt.outcome === 'report' ? ['checkerExitCode', 'reportHash'] : ['error'])];
  if (Object.keys(receipt).some(key => !keys.includes(key))) throw new Error('Unsupported or contradictory runner receipt fields.');
  if (receipt.outcome === 'execution-failed') {
    if (typeof receipt.error !== 'string' || !receipt.error.trim()) throw new Error('Execution-failed receipt requires an error.');
    return { receipt };
  }
  if (receipt.outcome !== 'report' || ![0, 1].includes(receipt.checkerExitCode) ||
      !/^[a-f0-9]{64}$/.test(receipt.reportHash)) throw new Error('Invalid report receipt.');
  if (!Buffer.isBuffer(reportBytes) || reportBytes.length > 64_000_000) throw new Error('Missing or oversized report artifact.');
  const reportHash = hash(reportBytes);
  if (reportHash !== receipt.reportHash) throw new Error('Report bytes do not match the runner receipt.');
  const bundle = JSON.parse(reportBytes.toString('utf8'));
  if (!bundle || bundle.format !== format || bundle.version !== version ||
      Object.keys(bundle).some(key => !['format', 'version', 'reports'].includes(key)) ||
      !Array.isArray(bundle.reports) || bundle.reports.length !== request.articles.length) {
    throw new Error('Incomplete or invalid batch report.');
  }
  const reports = bundle.reports.map((input, index) => {
    const report = findings.validateReport(input);
    const article = request.articles.at(index);
    if (JSON.stringify(report.checks) !== JSON.stringify(checks) ||
        JSON.stringify(report.scanPaths) !== JSON.stringify([article.path]) || report.productManifest ||
        report.generatedAt < receipt.startedAt || report.generatedAt > receipt.finishedAt ||
        report.findings.some(finding => finding.article !== article.path || finding.articleHash !== article.sha256 ||
          finding.status !== 'open' || finding.firstSeen !== report.generatedAt || finding.lastSeen !== report.generatedAt)) {
      throw new Error('Report does not match this bounded claim and link check.');
    }
    return report;
  });
  if (receipt.checkerExitCode !== (reports.some(report => report.findings.some(finding => finding.severity === 'error')) ? 1 : 0)) {
    throw new Error('Report does not match this bounded claim and link check.');
  }
  return { request, receipt, reports, reportHash, checkerExitCode: receipt.checkerExitCode };
}

export async function loadRunArtifacts(store, run) {
  const request = await readJson(await store.artifact(run.id, 'request.json', false));
  const receipt = await readJson(await store.artifact(run.id, 'receipt.json', false));
  const reportBytes = receipt?.outcome === 'report'
    ? await readBytes(await store.artifact(run.id, 'report.json', false)) : undefined;
  return validateRunArtifacts({ workspace: store.workspace, run, request, receipt, reportBytes });
}

export function rerunDecision(run, ownerSessionId, hostStatus, completion) {
  if (run.launch === 'not-started') return { allowed: true, reason: 'Prior launch was explicitly resolved as not started.' };
  if (run.launch !== 'acknowledged' || !run.agentId) {
    return { allowed: false, reason: 'This article has active or unconfirmed host work. Reconcile the launch first.' };
  }
  if (run.ownerSessionId !== ownerSessionId) {
    return { allowed: false, reason: 'Return to the owning session to verify its host task. Cross-session host access is unavailable.' };
  }
  if (['idle', 'completed', 'failed', 'cancelled'].includes(hostStatus) && completion?.state === 'finished') {
    return { allowed: true, reason: 'Runner completion verified and host observed stopped. Launch rechecks both; evidence may be stale.' };
  }
  if (['idle', 'completed', 'failed', 'cancelled'].includes(hostStatus)) {
    return { allowed: false, reason: `Host is ${hostStatus}, but runner completion is unverified: ${completion?.message || 'Inspect its owned receipt.'}` };
  }
  return { allowed: false, reason: hostStatus === 'running'
    ? 'This article has active or unconfirmed host work. The owning task is running.'
    : 'Host state is unavailable. Refresh the owning task before another check.' };
}
