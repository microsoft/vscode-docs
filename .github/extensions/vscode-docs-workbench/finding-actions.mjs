import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import auditFindings from '../../../build/audit-findings.js';
import chat from '../../../build/review-chat.js';
import { atomicJson, hash, now, readBytes, resolveArticle } from './article-storage.mjs';

export function findingSource(record, report) {
  if (!record || !report) throw new Error('Original finding evidence is unavailable or changed. Refresh before continuing.');
  const { findings, ...metadata } = report;
  const observed = findings.find(finding => finding.id === record.finding.id);
  if (!observed || auditFindings.reportId(metadata) !== record.reportId ||
      auditFindings.evidenceHash(observed, report) !== record.evidenceHash ||
      ['kind', 'article', 'line', 'evidence', 'sourceRevision', 'lastSeen'].some(key =>
        Reflect.get(observed, key) !== Reflect.get(record.finding, key))) {
    throw new Error('Original finding evidence is unavailable or changed. Refresh before continuing.');
  }
  return { record, report, token: hash(JSON.stringify([record.reportId, record.evidenceHash, record.history])) };
}

export function findingActionView(record, report, message) {
  try { return { token: findingSource(record, report).token }; }
  catch (error) { return { error: message || error.message }; }
}

async function currentFinding(store, source, input) {
  if (input.actionToken !== source.token || input.evidenceHash !== source.record.evidenceHash) {
    throw new Error('Finding evidence or state changed. Refresh before continuing.');
  }
  const article = await resolveArticle(store.workspace, source.record.finding.article);
  return { article, articleHash: hash(await readBytes(article)) };
}

export async function decideFinding(store, state, source, input) {
  const labels = new Map([['dismissed', 'dismissed'], ['fixed', 'marked fixed'], ['open', 'reopened']]);
  const label = labels.get(input.status);
  if (!label || source.record.finding.status === input.status) throw new Error('Choose Dismiss, Mark fixed, or Undo for this finding.');
  const current = await currentFinding(store, source, input);
  // This is a manual decision about current text, not renewed verification of the historical report.
  return auditFindings.triageFinding(state, { id: source.record.finding.id, evidenceHash: source.record.evidenceHash,
    status: input.status, reason: `User ${label} this finding. Current article SHA-256: ${current.articleHash}. Check/review coverage was not changed.` }, now());
}

export async function fixFindingInChat(store, editor, source, input) {
  if (input.confirmed !== true) throw new Error('Select Fix in chat explicitly before opening a conversation.');
  if (!editor.available || typeof editor.chat !== 'function') throw new Error(editor.message || 'Native chat opening is unavailable in this host.');
  const current = await currentFinding(store, source, input);
  const directory = await store.file('finding-chats');
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- Context directories are guarded, workspace-private store paths.
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const context = await store.file(path.join('finding-chats', `${randomUUID()}.json`));
  const report = source.report;
  await atomicJson(context, { format: 'vscode-docs-finding-context', version: 1,
    finding: source.record.finding, history: source.record.history,
    evidenceHash: source.record.evidenceHash,
    original: { revision: report.sourceRevision, generatedAt: report.generatedAt, checks: report.checks,
      ...(report.review ? { review: report.review } : {}), ...(report.replay ? { replay: report.replay } : {}) },
    current: { article: current.article, sha256: current.articleHash },
    note: 'Historical finding for discussion. Current article bytes do not establish that the finding is still valid or fixed.' });
  const skill = fileURLToPath(new URL('../../skills/doc-writer/SKILL.md', import.meta.url));
  return editor.chat({ files: [current.article, skill, context],
    prompt: chat.findingPrompt({ workspace: store.workspace, article: current.article, skill, context }) });
}
