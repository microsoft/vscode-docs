import { authorLabel, iconPaths, queueInfo, readable, relativeTime, statusInfo, visibleItems, workflowCounts } from './presentation.mjs';

const $ = selector => document.querySelector(selector);
const statuses = ['untriaged', 'ready', 'in-progress', 'needs-review', 'blocked', 'done', 'not-needed'];
let state;
let token;
let queue = 'pulls';
let selected;
let selectedItem;
let refreshBusy = false;
let syncBusy = false;

function node(tag, content, className) {
  const element = document.createElement(tag);
  if (content !== undefined) element.textContent = content;
  if (className) element.className = className;
  return element;
}
function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.7');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', 'icon');
  for (const data of iconPaths[name]) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', data);
    svg.append(path);
  }
  return svg;
}
function badge(label, tone = 'neutral') {
  const element = node('span', undefined, `badge ${tone}`);
  const dot = node('span', undefined, 'status-dot');
  dot.setAttribute('aria-hidden', 'true');
  element.append(dot, node('span', label));
  return element;
}
function statusBadge(status) {
  const info = statusInfo[status];
  return badge(info.label, info.tone);
}
function filters() {
  return {
    search: $('#search').value, label: $('#label').value, disposition: $('#disposition').value,
    showDone: $('#show-done').checked, mine: $('#mine').checked, githubState: $('#github-state').value,
    draft: $('#draft').value, review: $('#review').value
  };
}
function button(title, handler, className) {
  const element = node('button', title, className);
  element.type = 'button';
  element.addEventListener('click', () => perform(async () => {
    element.disabled = true;
    try { await handler(element); }
    finally { element.disabled = false; }
  }));
  return element;
}
function sourceLink(title, url) {
  const link = node('a', title);
  try {
    const target = new URL(url);
    if (target.protocol !== 'https:' || target.hostname !== 'github.com') return node('span', title);
    link.href = target.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  } catch {
    return node('span', title);
  }
}
async function perform(action) {
  $('#error').hidden = true;
  try { await action(); }
  catch (error) {
    $('#error').textContent = error.message;
    $('#error').hidden = false;
    $('#status').textContent = 'Action did not complete. Review the error before retrying.';
  }
}
async function act(action, input = {}) {
  const response = await fetch('/action', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Workbench-Token': token },
    body: JSON.stringify({ action, input })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status}).`);
  return result;
}
async function load() {
  const response = await fetch('/bootstrap');
  if (!response.ok) throw new Error(`Cannot load workbench (${response.status}).`);
  const data = await response.json();
  token = data.token;
  state = data.state;
  render();
}
function render() {
  const info = queueInfo[queue];
  $('#queue-title').textContent = info.title;
  $('#queue-description').textContent = info.description;
  $('#search').placeholder = `Search ${queue === 'tpis' ? 'test plans' : queue === 'media' ? 'media tasks' : info.title.toLowerCase()}...`;
  $('#account').textContent = state.account;
  $('#account-avatar').textContent = state.account.slice(0, 2).toUpperCase();
  $('#milestone').value = state.milestone;
  $('#milestone-label').hidden = queue !== 'tpis';
  $('#mine-label').hidden = queue === 'tpis' || queue === 'media';
  $('#draft-label').hidden = queue !== 'pulls';
  $('#review-label').hidden = queue !== 'pulls';
  $('#github-state-label').hidden = queue === 'media';
  $('#label-filter').hidden = queue === 'media';
  for (const tab of $('#queues').querySelectorAll('button')) {
    if (tab.dataset.queue === queue) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
    tab.querySelector('.queue-count').textContent = state.queues[tab.dataset.queue].length;
  }
  const cache = state.cache[queue];
  $('#freshness').textContent = queue === 'media' ? 'Saved privately in this workspace' :
    cache?.fetchedAt ? `Updated ${relativeTime(cache.fetchedAt)}` : 'Not fetched yet';
  $('#freshness').title = cache?.fetchedAt ? new Date(cache.fetchedAt).toLocaleString() : '';
  const notice = queue === 'tpis' ? `Milestone ${state.milestone} includes open and closed TPIs. Testing completion is not documentation completion.` :
    queue === 'media' ? 'Capture real product UI. Review screenshots and recordings before approving them.' : '';
  $('#queue-notice').hidden = !notice && !cache?.error;
  $('#queue-notice').textContent = cache?.error ? `Refresh failed. ${cache.fetchedAt ? 'Showing cached work.' : 'This queue has not loaded.'} ${cache.error}` : notice;
  $('#queue-notice').classList.toggle('danger', !!cache?.error);
  const currentFilters = filters();
  const items = visibleItems(state.queues[queue], state.records, queue, state.account, currentFilters);
  const counts = workflowCounts(state.queues[queue], state.records);
  for (const shortcut of $('#queue-overview').querySelectorAll('button')) {
    shortcut.querySelector('.overview-value').textContent = counts[shortcut.dataset.status || 'total'];
    shortcut.setAttribute('aria-pressed', String(currentFilters.disposition === shortcut.dataset.status));
  }
  const activeFilters = [
    currentFilters.disposition, currentFilters.showDone,
    queue !== 'media' && currentFilters.label,
    queue !== 'media' && currentFilters.githubState,
    ['pulls', 'issues'].includes(queue) && currentFilters.mine,
    queue === 'pulls' && currentFilters.draft,
    queue === 'pulls' && currentFilters.review
  ].filter(Boolean).length;
  $('#filter-count').hidden = !activeFilters;
  $('#filter-count').textContent = activeFilters;
  $('#results-count').textContent = `${items.length} ${items.length === 1 ? 'item' : 'items'}${items.length !== counts.total ? ` of ${counts.total}` : ''}`;
  $('#items').replaceChildren(...items.map(item => {
    const row = node('li');
    const action = button('', () => selectItem(item.key), 'item');
    action.dataset.key = item.key;
    action.setAttribute('aria-pressed', String(selected === item.key));
    const symbol = node('span', undefined, `item-symbol ${item.draft ? 'draft' : item.state === 'closed' ? 'closed' : item.key.startsWith('media:') ? 'media' : ''}`);
    symbol.append(icon(info.icon));
    const content = node('span', undefined, 'item-content');
    const meta = node('span', undefined, 'item-meta');
    meta.append(node('span', item.number ? `#${item.number}` : readable(item.kind)));
    if (item.repo) meta.append(node('span', authorLabel(item.author)));
    if (item.draft) meta.append(node('span', 'Draft'));
    else if (item.reviewDecision) meta.append(node('span', readable(item.reviewDecision)));
    else if (queue === 'tpis') meta.append(node('span', item.state === 'closed' ? 'Testing closed' : 'Testing open'));
    else if (item.target) meta.append(node('span', readable(item.target)));
    const date = item.updatedAt || item.createdAt;
    if (date) {
      const age = node('span', relativeTime(date));
      age.title = new Date(date).toLocaleString();
      meta.append(age);
    }
    const bottom = node('span', undefined, 'item-bottom');
    bottom.append(statusBadge(state.records[item.key]?.disposition || 'untriaged'));
    const labels = (item.labels || []).slice(0, 2);
    if (labels.length) {
      const label = node('span', labels.join(', '), 'row-label');
      label.title = item.labels.join(', ');
      bottom.append(label);
    }
    const runs = state.records[item.key]?.runs || [];
    if (runs.length) bottom.append(node('span', `${runs.length} ${runs.length === 1 ? 'task' : 'tasks'}`, 'row-label'));
    content.append(node('span', item.title, 'item-title'), meta, bottom);
    const arrow = node('span', undefined, 'item-chevron');
    arrow.append(icon('arrow'));
    action.append(symbol, content, arrow);
    row.append(action);
    return row;
  }));
  $('#empty').hidden = items.length > 0;
  if (!items.length) {
    const filtered = state.queues[queue].length > 0;
    const failed = !!cache?.error && !cache.fetchedAt;
    $('#empty-icon').replaceChildren(icon(failed ? 'issue' : filtered ? 'search' : info.icon));
    $('#empty-title').textContent = failed ? 'This queue could not be loaded' : filtered ? 'No matching work' : info.empty;
    $('#empty-description').textContent = failed ? 'Resolve the refresh error above, then try again. No work has been discarded.' :
      filtered ? 'Try another search or clear your filters to see more work.' :
        queue === 'media' ? 'Start with a scenario for a screenshot or a short walkthrough. Link it to an issue or keep it standalone.' :
        'You are caught up here. Refresh to check for new work.';
    $('#empty-action').textContent = failed ? 'Retry refresh' : filtered ? 'Clear search and filters' : queue === 'media' ? 'Create a media task' : 'Refresh queue';
    $('#empty-action').onclick = () => perform(failed ? refresh : filtered ? resetFilters : queue === 'media' ? () => mediaDialog() : refresh);
  }
  if (selectedItem) {
    selectedItem.record = state.records[selectedItem.key] || { disposition: 'untriaged', note: '', links: [], runs: [] };
    renderDetail(selectedItem);
  }
}
async function selectItem(key) {
  selected = key;
  $('#status').textContent = 'Loading item...';
  const item = await act('detail', { key });
  if (selected !== key) return;
  selectedItem = item;
  render();
  $('#detail').focus();
  $('#status').textContent = '';
}
function closeDetail() {
  const key = selected;
  selected = undefined;
  selectedItem = undefined;
  $('#detail').hidden = true;
  render();
  const origin = [...$('#items').querySelectorAll('button')].find(element => element.dataset.key === key);
  if (origin) origin.focus();
  else $('#search').focus();
}
function renderDetail(item) {
  const root = $('#detail');
  root.hidden = false;
  const topbar = node('div', undefined, 'detail-topbar');
  const identity = item.url ? sourceLink(`${item.repo}#${item.number}`, item.url) : node('span', 'Media task');
  identity.classList.add('detail-identity');
  if (item.url) identity.append(icon('external'));
  const close = button('', closeDetail, 'icon-button');
  close.setAttribute('aria-label', 'Back to list');
  close.title = 'Back to list';
  close.append(icon('close'));
  topbar.append(identity, close);
  const detail = node('div', undefined, 'detail-content');
  root.replaceChildren(topbar, detail);
  detail.append(node('h2', item.title));
  const record = item.record;
  const badges = node('div', undefined, 'detail-badges');
  badges.append(statusBadge(record.disposition));
  if (item.state) badges.append(badge(item.merged ? 'Merged' : readable(item.state), item.state === 'open' ? 'green' : 'purple'));
  if (item.draft) badges.append(badge('Draft'));
  detail.append(badges);
  const facts = node('dl', undefined, 'detail-facts');
  const fact = (name, value) => { if (value) facts.append(node('dt', name), node('dd', value)); };
  if (item.repo) {
    const creator = node('dd');
    creator.append(item.author ? sourceLink(authorLabel(item.author), `https://github.com/${encodeURIComponent(item.author)}`) :
      node('span', authorLabel(item.author)));
    facts.append(node('dt', 'Creator'), creator);
  }
  fact('Updated', item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '');
  fact('Review', readable(item.reviewDecision));
  fact('Assignees', item.assignees?.join(', '));
  fact('Labels', item.labels?.join(', '));
  fact('Capture', item.target ? readable(item.target) : '');
  fact('Media status', readable(item.mediaStatus));
  if (facts.children.length) detail.append(facts);
  const actions = node('div', undefined, 'actions');
  const primary = item.kind === 'pr' ? 'review' : item.key.startsWith('media:') ? item.kind : 'document';
  actions.append(button({ review: 'Review PR', document: 'Plan documentation', screenshot: 'Create screenshots', video: 'Record demo' }[primary],
    () => launch(item.key, primary), 'primary'));
  const disclosure = node('details', undefined, 'secondary');
  const summary = node('summary', 'Actions');
  summary.prepend(icon('more'));
  const more = node('div', undefined, 'action-menu');
  disclosure.append(summary, more);
  if (!item.key.startsWith('media:')) {
    more.append(button('Create screenshots', () => mediaDialog(item, 'screenshot')), button('Record demo', () => mediaDialog(item, 'video')));
  }
  if (record.runs.some(run => run.workflow === 'document' && run.result)) {
    more.append(button('Implement approved plan', () => implement(item)));
  }
  more.append(button('Attach captured media', async () => {
    const answer = await formDialog('Attach captured media', [
      { type: 'paragraph', value: `Copy a real PNG, WebM, or MP4 into the task capture directory: ${item.mediaDirectory}` },
      { name: 'file', label: 'Absolute capture file path', required: true },
      { name: 'description', label: 'Description of the captured content', required: true },
      { type: 'paragraph', value: 'Attachment does not approve the capture. Inspect the preview before marking it visually approved.' }
    ], 'Attach for review');
    if (answer) { await act('attach-media', { key: item.key, ...answer }); await load(); }
  }));
  if (item.repo === 'microsoft/vscode-docs' && item.state === 'open') {
    more.append(button('Draft closing comment', () => launch(item.key, 'close-comment')));
  }
  more.append(button('Link related work', () => linkItem(item)));
  if (item.repo === 'microsoft/vscode-docs' && item.state === 'open') {
    more.append(button('Close with comment', () => closeItem(item, 'comment'), 'danger destructive-start'),
      button('Close as invalid', () => closeItem(item, 'invalid'), 'danger'));
  }
  actions.append(disclosure);
  detail.append(actions);
  const statusLabel = node('label', 'Workflow status');
  const select = node('select');
  for (const value of statuses) {
    const option = node('option', statusInfo[value].label);
    option.value = value;
    option.selected = record.disposition === value;
    select.append(option);
  }
  select.addEventListener('change', () => perform(async () => {
    try { await act('update-item', { key: item.key, disposition: select.value, note: note.value }); await load(); }
    catch (error) { select.value = record.disposition; throw error; }
  }));
  statusLabel.append(select);
  const notes = node('div', undefined, 'note detail-section');
  const noteLabel = node('label', 'Notes or no-docs-needed rationale');
  const note = node('textarea');
  note.value = record.note;
  note.maxLength = 6000;
  note.placeholder = 'Add context, a blocker, or why no documentation is needed...';
  noteLabel.append(note);
  notes.append(statusLabel, noteLabel, button('Save notes', async () => { await act('update-item', { key: item.key, note: note.value }); await load(); }));
  detail.append(notes);
  if (item.body || item.scenario) {
    const body = node('details', undefined, 'detail-section');
    body.append(node('summary', item.scenario ? 'Scenario' : 'Source description'), node('p', item.body || item.scenario, 'body'));
    detail.append(body);
  }
  if (record.links.length) {
    detail.append(node('h3', 'Related work'));
    for (const key of record.links) detail.append(button(key, () => selectItem(key), 'related-link'));
  }
  if (record.assets?.length) {
    detail.append(node('h3', 'Media review'));
    for (const asset of record.assets) {
      const card = node('article');
      card.append(node('p', asset.description));
      const media = node(asset.extension === '.png' ? 'img' : 'video');
      media.src = `/assets/${asset.id}`;
      if (asset.extension === '.png') media.alt = asset.description;
      else { media.controls = true; media.preload = 'metadata'; media.setAttribute('aria-label', asset.description); }
      card.append(media);
      if (asset.approved) card.append(node('p', 'Visually approved', 'meta'));
      else card.append(button('Approve after visual inspection', async () => {
        const answer = await formDialog('Approve capture', [
          { type: 'paragraph', value: 'Confirm that you inspected the actual capture for correct UI, readable text, intended actions, and private data.' },
          { name: 'confirmed', label: 'I inspected this capture', type: 'checkbox', required: true }
        ], 'Approve');
        if (answer) { await act('approve-media', { key: item.key, id: asset.id, confirmed: answer.confirmed }); await load(); }
      }));
      detail.append(card);
    }
  }
  if (record.runs.length) {
    detail.append(node('h3', 'Task history'), button('Update task results', sync));
    for (const run of [...record.runs].reverse()) {
      const article = node('article');
      const heading = node('div', undefined, 'run-heading');
      heading.append(node('strong', readable(run.workflow)),
        badge(readable(run.status), ['failed', 'launch-uncertain'].includes(run.status) ? 'red' : run.status === 'running' ? 'blue' : 'purple'));
      article.append(heading);
      if (run.startedAt) article.append(node('p', `Started ${relativeTime(run.startedAt)}`, 'meta'));
      if (run.sourceVersion !== (item.sourceVersion || item.key)) article.append(node('p', 'Source changed since this task. Review or plan again before relying on its result.', 'danger'));
      if (run.sessionId !== state.sessionId) article.append(node('p', `Belongs to host session ${run.sessionId}. Resume that session to continue.`, 'meta'));
      if (run.worktree) article.append(node('p', `Implementation worktree: ${run.worktree}`, 'meta'));
      if (run.error) article.append(node('p', run.error, 'danger'));
      if (run.result) article.append(node('pre', run.result));
      if (['starting', 'launch-uncertain'].includes(run.status) && run.sessionId === state.sessionId) {
        article.append(button('Resolve untracked launch', async () => {
          const answer = await formDialog('Resolve untracked launch', [
            { type: 'paragraph', value: 'First check host task history. The workbench rechecks for a matching agent before clearing this local launch record. This does not cancel any agent.' },
            { name: 'confirmed', label: 'I verified that this launch did not start', type: 'checkbox', required: true }
          ], 'Clear launch blocker');
          if (answer) { await act('abandon-launch', { key: item.key, runId: run.id, confirmed: answer.confirmed }); await load(); }
        }));
      }
      if (run.agentId && run.sessionId === state.sessionId) {
        article.append(button('Follow up', async () => {
          const answer = await formDialog('Follow up on task', [{ name: 'message', label: 'Message', type: 'textarea', required: true }], 'Send');
          if (answer) { await act('message', { key: item.key, runId: run.id, message: answer.message }); await load(); }
        }));
      }
      detail.append(article);
    }
  }
  for (const operation of Object.values(state.operations).filter(value => value.key === item.key)) {
    const article = node('article');
    const heading = node('div', undefined, 'run-heading');
    heading.append(node('strong', 'Close action'), badge(readable(operation.status), operation.status === 'failed' ? 'red' : operation.status === 'complete' ? 'green' : 'neutral'));
    article.append(heading, node('p', operation.outcome || 'Awaiting confirmation.'));
    if (operation.commentUrl) article.append(sourceLink('Posted closing comment', operation.commentUrl));
    if (operation.error) article.append(node('p', operation.error, 'danger'));
    if (operation.status === 'failed') article.append(button('Review and retry remaining steps', async () => {
      const current = await act('close-renew', { id: operation.id });
      if (current.status !== 'complete') await confirmClose(current);
      await load();
    }, 'danger'));
    detail.append(article);
  }
}
async function launch(key, workflow, extra = {}) {
  $('#status').textContent = 'Starting background task...';
  await act('launch', { key, workflow, ...extra });
  await load();
  $('#status').textContent = 'Background task started. Results appear in task history.';
}
async function sync() {
  if (syncBusy) return;
  syncBusy = true;
  try { state = await act('sync'); render(); }
  finally { syncBusy = false; }
}
async function refresh() {
  if (refreshBusy) return;
  refreshBusy = true;
  $('#refresh').disabled = true;
  $('#status').textContent = 'Refreshing GitHub queues...';
  try {
    state = await act('refresh');
    render();
    const failed = Object.entries(state.cache).filter(([, value]) => value.error).map(([name]) => name);
    $('#status').textContent = failed.length ? `Refresh incomplete: ${failed.join(', ')}. See queue details.` : 'Queues refreshed.';
  } finally { refreshBusy = false; $('#refresh').disabled = false; }
}
function formDialog(title, fields, submit = 'Continue') {
  return new Promise(resolve => {
    const dialog = $('#dialog');
    $('#dialog-title').textContent = title;
    $('#dialog-submit').textContent = submit;
    $('#dialog-error').textContent = '';
    const controls = new Map();
    $('#dialog-content').replaceChildren(...fields.map(field => {
      if (field.type === 'paragraph') return node('p', field.value);
      const label = node('label', field.label);
      const control = node(field.type === 'textarea' ? 'textarea' : field.type === 'select' ? 'select' : 'input');
      if (control.tagName === 'INPUT') control.type = field.type || 'text';
      if (field.type === 'checkbox') label.classList.add('checkbox-label');
      if (field.options) for (const value of field.options) { const option = node('option', value); option.value = value; control.append(option); }
      if (field.value !== undefined) control.value = field.value;
      control.required = !!field.required;
      control.readOnly = !!field.readOnly;
      controls.set(field.name, control);
      if (field.type === 'checkbox') label.prepend(control);
      else label.append(control);
      return label;
    }));
    const done = result => { dialog.close(); resolve(result); };
    $('#dialog-cancel').onclick = () => done(null);
    dialog.oncancel = event => { event.preventDefault(); done(null); };
    $('#dialog-form').onsubmit = event => {
      event.preventDefault();
      done(Object.fromEntries([...controls].map(([key, control]) => [key, control.type === 'checkbox' ? control.checked : control.value])));
    };
    dialog.showModal();
  });
}
async function mediaDialog(item, kind = 'screenshot') {
  const answer = await formDialog('New media task', [
    { name: 'title', label: 'Title', value: item?.title || '', required: true },
    { name: 'kind', label: 'Format', type: 'select', options: ['screenshot', 'video'], value: kind },
    { name: 'target', label: 'Capture target', type: 'select', options: ['desktop', 'agents', 'browser'] },
    { name: 'scenario', label: 'Scenario, starting state, and observable result', type: 'textarea', required: true },
    { type: 'paragraph', value: 'Use real UI. If approved capture tools are unavailable, the task returns guided capture steps. Live AI requests require separate approval.' }
  ], 'Create task');
  if (!answer) return;
  const result = await act('create-media', { ...answer, ...(item ? { link: item.key } : {}) });
  queue = 'media';
  await load();
  await selectItem(result.key);
}
async function implement(item) {
  const plan = [...item.record.runs].reverse().find(run => run.workflow === 'document' && run.result)?.result;
  const answer = await formDialog('Approve documentation implementation', [
    { name: 'plan', label: 'Exact approved plan', type: 'textarea', value: plan, required: true },
    { name: 'base', label: 'New worktree base (local branch)', type: 'select', options: ['main', 'vnext'] },
    { type: 'paragraph', value: 'Creates a separate worktree and starts an implementation agent. No commits, pushes, or publication.' },
    { name: 'confirmed', label: 'I approve this plan and creation of a separate worktree from this base', type: 'checkbox', required: true }
  ], 'Approve and start');
  if (answer?.confirmed) await launch(item.key, 'implement', { plan: answer.plan, base: answer.base });
}
async function linkItem(item) {
  const answer = await formDialog('Link related work', [
    { name: 'link', label: 'Item identity (for example microsoft/vscode-docs:issue:1234)', required: true }
  ], 'Link');
  if (answer) { await act('update-item', { key: item.key, link: answer.link }); await load(); }
}
async function closeItem(item, mode) {
  const draft = [...item.record.runs].reverse().find(run => run.workflow === 'close-comment' && run.result)?.result || '';
  const answer = await formDialog(mode === 'invalid' ? 'Close as invalid' : 'Close with comment', [
    { type: 'paragraph', value: `${item.repo}#${item.number}: ${item.title}` },
    { name: 'comment', label: 'Public closing comment', type: 'textarea', required: true,
      value: mode === 'invalid' ? 'Closing this submission because it is not an actionable documentation issue or contribution.' : draft },
    ...(mode === 'invalid' ? [{ name: 'applyInvalid', label: 'Also apply the existing invalid label', type: 'checkbox' }] : [])
  ], 'Preview closure');
  if (!answer) return;
  const operation = await act('close-preview', { key: item.key, mode, ...answer });
  await confirmClose(operation);
}
async function confirmClose(operation) {
  const answer = await formDialog('Confirm closure', [
    { type: 'paragraph', value: `${operation.key}: ${operation.title}. ${operation.applyInvalid ? 'Apply invalid label. ' : ''}Close without merging or deleting branches.` },
    { name: 'preview', label: 'Exact public comment', type: 'textarea', value: operation.comment, readOnly: true },
    { type: 'paragraph', value: `Completed steps: ${Object.entries(operation.steps).filter(([, done]) => done).map(([step]) => step).join(', ') || 'none'}. Posting and closing are separate operations.` },
    { name: 'confirmed', label: 'Post this comment and close this item', type: 'checkbox', required: true }
  ], 'Confirm close');
  if (!answer) return;
  try {
    await act('close-confirm', { id: operation.id, confirmed: answer.confirmed });
    await refresh();
    await selectItem(operation.key);
  } finally { await load(); }
}

function resetFilters() {
  for (const id of ['search', 'disposition', 'label', 'draft', 'review', 'github-state']) $(`#${id}`).value = '';
  $('#mine').checked = false;
  $('#show-done').checked = false;
  render();
}

for (const element of document.querySelectorAll('[data-icon]')) element.append(icon(element.dataset.icon));
for (const value of statuses) { const option = node('option', statusInfo[value].label); option.value = value; $('#disposition').append(option); }
$('#reset-filters').addEventListener('click', resetFilters);
$('#queue-overview').addEventListener('click', event => {
  const shortcut = event.target.closest('button[data-status]');
  if (!shortcut || !state) return;
  $('#disposition').value = $('#disposition').value === shortcut.dataset.status ? '' : shortcut.dataset.status;
  render();
});
$('#queues').addEventListener('click', event => {
  const tab = event.target.closest('button[data-queue]');
  if (!tab) return;
  queue = tab.dataset.queue;
  selected = undefined;
  selectedItem = undefined;
  $('#detail').hidden = true;
  render();
});
for (const id of ['search', 'mine', 'disposition', 'label', 'draft', 'review', 'show-done', 'github-state']) {
  $(`#${id}`).addEventListener('input', () => { if (state) render(); });
}
document.addEventListener('click', event => {
  if (!$('#filters').contains(event.target)) $('#filters').open = false;
  const menu = $('#detail .secondary');
  if (menu && !menu.contains(event.target)) menu.open = false;
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || $('#dialog').open) return;
  const menu = $('#detail .secondary');
  if (menu?.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  } else if ($('#filters').open) {
    $('#filters').open = false;
    $('#filters summary').focus();
  } else if (selected) closeDetail();
});
$('#refresh').addEventListener('click', () => perform(refresh));
$('#new-media').addEventListener('click', () => perform(() => mediaDialog()));
$('#milestone').addEventListener('change', () => perform(async () => {
  state = await act('milestone', { milestone: $('#milestone').value });
  render();
}));
perform(async () => {
  await load();
  if (!Object.keys(state.cache).length) await refresh();
  const response = await fetch('/milestones');
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Cannot load release milestones.');
  $('#milestones').replaceChildren(...result.map(release => { const option = node('option'); option.value = release.title; return option; }));
});
setInterval(() => {
  if (document.hidden || !state || $('#dialog').open || $('#detail').contains(document.activeElement)) return;
  if (Object.values(state.records).some(record => record.runs.some(run => run.sessionId === state.sessionId && run.status === 'running'))) perform(sync);
}, 15000);
setInterval(() => {
  if (!document.hidden && state && !$('#dialog').open && !$('#detail').contains(document.activeElement)) perform(refresh);
}, 5 * 60000);
