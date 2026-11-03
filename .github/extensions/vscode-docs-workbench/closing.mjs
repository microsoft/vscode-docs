import { randomUUID } from 'node:crypto';
import { contextVersion, sourceIdentity } from './github.mjs';
import { text, WorkbenchError } from './state.mjs';

export function createClosingActions(github, store, account) {
  function docsItem(key) {
    const identity = sourceIdentity(key);
    if (identity.repo !== 'microsoft/vscode-docs') throw new WorkbenchError('Close actions are restricted to microsoft/vscode-docs.');
    return identity;
  }
  async function preview({ key, mode, comment, applyInvalid = false }) {
    docsItem(key);
    if (!['comment', 'invalid'].includes(mode) || typeof applyInvalid !== 'boolean') throw new WorkbenchError('Invalid close action.');
    comment = text(comment, 'Closing comment', 60000);
    if (!await github.canTriage()) throw new WorkbenchError('The authenticated account does not have triage permission to close docs items.', 403);
    const pending = Object.values((await store.read()).operations).find(operation =>
      operation.key === key && ['executing', 'failed'].includes(operation.status));
    if (pending) throw new WorkbenchError('An earlier close action is incomplete. Reconcile and retry that action instead of posting another comment.', 409);
    const item = await github.detail(key);
    if (item.merged || item.state !== 'open') throw new WorkbenchError('This item is already closed or merged. Refresh the queue.', 409);
    if (applyInvalid) {
      if (mode !== 'invalid') throw new WorkbenchError('The invalid label is only available for invalid closures.');
      const labels = await github.pages('repos/microsoft/vscode-docs/labels');
      if (!labels.some(label => label.name === 'invalid')) throw new WorkbenchError('This repository has no invalid label. Uncheck the label option.');
    }
    const id = randomUUID();
    const operation = {
      id, key, mode, comment, applyInvalid, title: item.title,
      expected: contextVersion(item, id), expiresAt: new Date(Date.now() + 10 * 60000).toISOString(),
      status: 'preview', steps: { comment: false, label: !applyInvalid, close: false }
    };
    await store.update(state => { state.operations[id] = operation; });
    return operation;
  }
  async function execute({ id, confirmed }) {
    if (confirmed !== true) throw new WorkbenchError('Explicit confirmation is required.');
    let state = await store.read();
    let operation = state.operations[id];
    if (!operation) throw new WorkbenchError('Unknown close preview.');
    const { repo, kind, number } = docsItem(operation.key);
    if (operation.status === 'complete') return operation;
    if (operation.status === 'executing') throw new WorkbenchError('This close action is executing. Refresh before retrying.', 409);
    if (Date.parse(operation.expiresAt) < Date.now()) throw new WorkbenchError('This preview expired. Prepare and confirm a new preview.', 409);
    if (await github.account() !== account) throw new WorkbenchError('The authenticated GitHub account changed. Reopen the canvas.', 409);
    if (!await github.canTriage()) throw new WorkbenchError('The authenticated account no longer has triage permission.', 403);
    let item = await github.detail(operation.key);
    if (item.merged) throw new WorkbenchError('A merged PR cannot be closed.', 409);
    if (item.state === 'closed') {
      await store.update(current => {
        Object.assign(current.operations[id], { status: 'complete', outcome: 'Already closed; no additional comment posted.' });
      });
      return (await store.read()).operations[id];
    }
    if (contextVersion(item, id) !== operation.expected) throw new WorkbenchError('The item or review context changed. Prepare and confirm a new preview.', 409);
    await store.update(current => {
      if (current.operations[id].status === 'complete' || Object.values(current.operations).some(candidate =>
        candidate.key === operation.key && candidate.status === 'executing')) {
        throw new WorkbenchError('This item has a completed or executing close action. Refresh before retrying.', 409);
      }
      current.operations[id].status = 'executing';
    });
    state = await store.read();
    operation = state.operations[id];
    const marker = `<!-- vscode-docs-workbench:close:${id} -->`;
    const save = async changes => store.update(current => Object.assign(current.operations[id], changes));
    try {
      const existing = item.comments.find(comment => comment.body.includes(marker));
      if (existing) {
        operation.steps.comment = true;
        operation.commentUrl = existing.url;
      }
      if (!operation.steps.comment) {
        const comment = await github.api(`repos/${repo}/issues/${number}/comments`, 'POST', { body: `${operation.comment}\n\n${marker}` });
        operation.steps.comment = true;
        operation.commentUrl = comment.html_url;
      }
      await save({ steps: { ...operation.steps }, commentUrl: operation.commentUrl });
      if (item.labels.includes('invalid') && operation.applyInvalid) operation.steps.label = true;
      if (!operation.steps.label) {
        await github.api(`repos/${repo}/issues/${number}/labels`, 'POST', { labels: ['invalid'] });
        operation.steps.label = true;
        await save({ steps: { ...operation.steps } });
      }
      item = await github.detail(operation.key);
      if (contextVersion(item, id) !== operation.expected) {
        throw new WorkbenchError('Context changed while posting the comment. The comment may be posted, but closure was stopped. Refresh before preparing a new preview.', 409);
      }
      await github.api(`repos/${repo}/${kind === 'pr' ? 'pulls' : 'issues'}/${number}`, 'PATCH',
        kind === 'pr' ? { state: 'closed' } : { state: 'closed', state_reason: 'not_planned' });
      const actual = await github.detail(operation.key);
      if (actual.state !== 'closed' || actual.merged) throw new WorkbenchError('GitHub did not confirm an unmerged closure.', 502);
      operation.steps.close = true;
      await save({ status: 'complete', steps: operation.steps, commentUrl: operation.commentUrl, outcome: 'Closed with comment.' });
      return (await store.read()).operations[id];
    } catch (error) {
      await save({ status: 'failed', steps: operation.steps, error: error.message,
        outcome: 'One or more steps may have succeeded. Refresh to reconcile; retry only after reviewing the recorded steps.' });
      throw new WorkbenchError(`${error.message} Close action ${id} is incomplete; previously posted comments are reconciled on an explicit retry.`, error.status || 502);
    }
  }
  async function renew({ id }) {
    const state = await store.read();
    const operation = state.operations[id];
    if (!operation) throw new WorkbenchError('Unknown close action.');
    docsItem(operation.key);
    if (operation.status === 'executing') throw new WorkbenchError('This close action is still marked as executing. Verify its process and GitHub state before manual recovery.', 409);
    if (await github.account() !== account || !await github.canTriage()) throw new WorkbenchError('The authenticated account or its triage permission changed.', 403);
    const item = await github.detail(operation.key);
    if (item.merged) throw new WorkbenchError('A merged PR cannot be closed.', 409);
    const marker = `<!-- vscode-docs-workbench:close:${id} -->`;
    const comment = item.comments.find(candidate => candidate.body.includes(marker));
    if (comment && comment.body !== `${operation.comment}\n\n${marker}`) {
      throw new WorkbenchError('The previously posted closing comment was edited. Inspect it on GitHub before recovering this action.', 409);
    }
    await store.update(current => {
      if (current.operations[id].status === 'executing') throw new WorkbenchError('This action is executing. Refresh before retrying.', 409);
      Object.assign(current.operations[id], {
        status: item.state === 'closed' ? 'complete' : 'preview',
        expected: contextVersion(item, id), expiresAt: new Date(Date.now() + 10 * 60000).toISOString(),
        steps: { comment: !!comment, label: !operation.applyInvalid || item.labels.includes('invalid'), close: item.state === 'closed' },
        commentUrl: comment?.url,
        outcome: item.state === 'closed' ? 'Already closed; no additional comment posted.' : 'Remote state reconciled. Confirm the remaining steps.',
        error: ''
      });
    });
    return (await store.read()).operations[id];
  }
  return { preview, execute, renew };
}
