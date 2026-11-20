const $ = id => document.getElementById(id);
let state;
let token;
let busy = false;
let polling = false;
let viewGeneration = 0;
let severity = 'all';
let catalogKey;
const expanded = new Set();
const drafts = new Map();
const findingRows = new Map();
const severityButtons = new Map();
let executionKey;
let coverageKey;
let findingTable;
let findingBody;
let findingOrder;
let emptyFindings;
let orderedSource;
let orderedFindings;
const severities = ['error', 'warning', 'unverified'];
const freshnessLabels = { fresh: 'Fresh', checking: 'Checking', stale: 'Stale', 'not-observed': 'Not observed', unavailable: 'Unavailable' };
const coverageLabels = { clean: 'Checked clean', findings: 'With findings', checking: 'Checking freshness',
  'never-checked': 'Never checked', stale: 'Stale', unavailable: 'Verification unavailable', incomplete: 'Failed / incomplete' };
const time = value => value ? new Date(value).toLocaleString(undefined, {
  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
}) : 'Never';

function element(tag, value, className) {
  const node = document.createElement(tag);
  if (value !== undefined) node.textContent = value;
  if (className) node.className = className;
  return node;
}
function paragraph(parent, value, className) {
  const node = element('p', value, className);
  parent.append(node);
  return node;
}
function control(parent, label, action) {
  const node = element('button', label);
  node.type = 'button';
  node.addEventListener('click', action);
  parent.append(node);
  return node;
}
function notice(message, error = false) {
  if ($('notice').textContent !== message) $('notice').textContent = message;
  $('notice').className = error ? 'error' : 'muted';
}
async function request(action, input = {}) {
  const response = await fetch('/action', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Workbench-Token': token },
    body: JSON.stringify({ action, input })
  });
  const value = await response.json();
  if (!response.ok) throw new Error(value.error || `HTTP ${response.status}`);
  return value;
}
async function bootstrap() {
  const response = await fetch('/bootstrap');
  const value = await response.json();
  if (!response.ok) throw new Error(value.error || 'Cannot load the findings inbox.');
  token = value.token;
  state = value.state;
}
async function refresh() { state = await request('refresh'); }
async function perform(action) {
  if (busy) return;
  viewGeneration++;
  busy = true;
  render();
  try { await action(); }
  catch (error) {
    notice(error.message, true);
    // A disconnected POST can have succeeded. Read references, never retry it.
    try { await bootstrap(); } catch { /* Preserve the original action error. */ }
  } finally { busy = false; render(); }
}
function scopeInput() { return [...new Set($('scope').value.split(',').map(value => value.trim()).filter(Boolean))].sort(); }
function inScope(article, scope) { return scope.some(item => item === article || article.startsWith(`${item}/`)); }
function articleMatches(article) { return article.toLowerCase().includes($('article-filter').value.trim().toLowerCase()); }
function executionLabel(run) {
  if (['starting', 'uncertain'].includes(run.launch)) return 'Launch unconfirmed';
  if (run.launch === 'not-started') return 'Not started';
  if (run.result?.state === 'execution-failed') return 'Check failed';
  if (run.result?.state === 'invalid') return 'Invalid report';
  if (run.result?.state === 'stale') return 'Out-of-date report';
  if (run.result?.state === 'freshness-failed') return 'Verification failed';
  if (run.ingestedHash && run.result?.state === 'valid') return 'Findings updated';
  if (['completed', 'failed', 'cancelled'].includes(run.observation?.status) && run.result?.state === 'missing') return 'No report';
  if (['failed', 'cancelled'].includes(run.observation?.status)) return `Host ${run.observation.status}`;
  if (run.observation?.status === 'running') return 'Host running';
  return 'Waiting for verified results';
}
function renderExecution() {
  const latest = state.runs.at(-1);
  const label = latest ? `${executionLabel(latest)} · ${latest.articles.length} article(s)` : '';
  if ($('execution-indicator').textContent !== label) $('execution-indicator').textContent = label;
  $('execution-details').hidden = !latest;
  if (!latest || !$('execution-details').open) {
    $('execution').replaceChildren();
    executionKey = undefined;
    return;
  }
  const relevant = state.runs.filter(run => run === latest || !run.rerun?.allowed);
  const key = JSON.stringify([busy, relevant.map(run => [
    run.id, run.ownerSessionId, run.ownerMatches, run.agentId, run.scope, run.createdAt, run.launch, run.ingestedHash,
    run.result, run.observation, run.error, run.syncError, run.rerun, run.activity
  ])]);
  if (executionKey === key) return;
  executionKey = key;
  $('execution').replaceChildren();
  for (const run of relevant) {
    const section = element('section');
    paragraph(section, `${executionLabel(run)} · ${run.scope.join(', ')} · ${time(run.createdAt)}`);
    paragraph(section, `Host: ${run.observation?.status || run.launch}. Owner: ${run.ownerSessionId}. Task: ${run.agentId || 'unacknowledged'}. Execution: ${run.id}.`, 'muted');
    if (run.observation) paragraph(section, `Host last observed ${time(run.observation.observedAt)}. Idle alone does not establish completion or a request for input.`, 'muted');
    if (run.result?.message) paragraph(section, run.result.message, 'muted');
    for (const message of [run.error, run.syncError, run.observation?.error, run.rerun?.reason]) if (message) paragraph(section, message, 'muted');
    if (run.activity?.error) paragraph(section, run.activity.error, 'error');
    for (const line of run.activity?.recentActivity || []) paragraph(section, `${time(line.timestamp)} · ${line.message}`);
    if (!run.ownerMatches) paragraph(section, 'Host recovery requires the original owning session; cross-session resume is unavailable.', 'muted');
    if (run.ownerMatches && ['starting', 'uncertain'].includes(run.launch)) {
      const resolve = control(section, 'I checked host history: no task started', () => void perform(async () => {
        if (!window.confirm('Confirm you inspected the owning host session and no task started. This does not cancel any task.')) return;
        await request('resolve-uncertain', { id: run.id, confirmed: true });
        await refresh();
        notice('Launch resolved. No task was cancelled.');
      }));
      resolve.disabled = busy;
    }
    $('execution').append(section);
  }
}
function render() {
  if (!state) return;
  $('workspace').textContent = state.workspace;
  $('ownership').textContent = `Private inbox: ${state.storageDirectory}. Previous prototype state, daily audit state, and account workbench state are not read, merged, or overwritten.`;
  $('host-contract').textContent = state.hostAvailable ? state.hostContract : 'Required host task APIs are unavailable. Launch is disabled.';
  const catalog = [...new Set(state.articles.flatMap(article => [
    article, ...article.split('/').slice(0, -1).map((_, index, parts) => parts.slice(0, index + 1).join('/'))
  ]))].sort();
  if (catalogKey !== JSON.stringify(catalog)) {
    catalogKey = JSON.stringify(catalog);
    $('scopes').replaceChildren(...catalog.map(value => {
      const option = element('option'); option.value = value; return option;
    }));
  }
  const scope = scopeInput();
  const articles = state.articles.filter(article => inScope(article, scope));
  const valid = scope.length && scope.every(item => catalog.includes(item)) && articles.length;
  const blocker = state.runs.find(run => run.articles.some(article => articles.includes(article)) && !run.rerun?.allowed);
  const catalogReady = !state.catalog || state.catalog.state === 'complete';
  $('launch').disabled = busy || !catalogReady || state.hostSync?.state === 'checking' || !state.hostAvailable || !valid || !!blocker;
  $('scope-count').textContent = catalogReady ? `${articles.length} article(s) selected` :
    state.catalog.state === 'failed' ? 'Article list unavailable' : 'Loading current article list';
  $('launch-eligibility').textContent = blocker ? `Cannot overlap this scope: ${blocker.rerun?.reason}` : '';
  $('reload').disabled = busy || state.verification?.terminating || state.verification?.state === 'cancelling';
  $('stop-verification').hidden = state.verification?.state !== 'checking';
  $('stop-verification').disabled = busy;
  const verificationStatus = state.verification?.state === 'checking'
    ? 'Checking current freshness in the background. Last accepted findings remain available.'
    : state.verification?.message || state.catalog?.message || (state.hostSync?.state === 'failed' ? state.hostSync.message : '');
  if ($('verification-status').textContent !== verificationStatus) $('verification-status').textContent = verificationStatus;
  renderExecution();
  renderFindings();
  renderCoverage();
}
function renderDecision(parent, record) {
  const { finding } = record;
  const latest = record.history.at(-1);
  if (latest) {
    const label = latest.action === 'triage' ? 'Last decision' :
      latest.action === 'finding-reappeared' ? 'Reopened after reappearance' : 'Reopened after evidence changed';
    paragraph(parent, `${label}: ${time(latest.at)} · ${latest.reason}`, 'muted');
  }
  if (!record.reviewable) {
    paragraph(parent, record.freshness === 'unavailable'
      ? 'Current verification is unavailable. Refresh to retry; saved evidence remains available.'
      : 'Read-only evidence. Run checks for this article before deciding.', 'muted');
    return;
  }
  const draft = drafts.get(finding.id);
  const reviewToken = JSON.stringify([record.coverageToken, latest]);
  const current = draft?.evidenceHash === record.evidenceHash && draft.reviewToken === reviewToken
    ? draft : { status: finding.status, reason: '' };
  paragraph(parent, 'Saving validates the current article, dependencies, and artifacts again.', 'muted');
  const form = element('form', undefined, 'decision-form');
  const status = element('select');
  status.id = `status-${finding.id}`;
  const label = element('label', 'Decision'); label.htmlFor = status.id;
  for (const value of ['open', 'accepted', 'dismissed', 'fixed']) {
    const option = element('option', value); option.value = value; status.append(option);
  }
  status.value = current.status;
  const reason = element('textarea');
  reason.id = `reason-${finding.id}`; reason.required = true; reason.maxLength = 4000; reason.rows = 2; reason.value = current.reason;
  const reasonLabel = element('label', 'Reason'); reasonLabel.htmlFor = reason.id;
  const saveDraft = () => drafts.set(finding.id, { evidenceHash: record.evidenceHash, reviewToken, status: status.value, reason: reason.value });
  status.addEventListener('change', saveDraft);
  reason.addEventListener('input', saveDraft);
  const submit = element('button', 'Save decision'); submit.type = 'submit'; submit.disabled = busy;
  form.append(label, status, reasonLabel, reason, submit);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const decision = { findingId: finding.id, evidenceHash: record.evidenceHash, coverageToken: record.coverageToken,
      status: status.value, reason: reason.value };
    void perform(async () => {
      await request('triage', decision);
      drafts.delete(finding.id);
      state = await request('poll');
      notice('Decision saved locally. Documentation and GitHub are unchanged.');
    });
  });
  parent.append(form);
}
function findingContext(record) {
  const { finding } = record;
  return `${finding.article}:${finding.line} · ${finding.kind === 'link' ? 'Links' : 'Claims'} · ${Reflect.get(freshnessLabels, record.freshness)}`;
}
function currentCheckText(provenance) {
  return provenance.currentCheckedAt ? `Current freshness last checked ${time(provenance.currentCheckedAt)}.` :
    'Current freshness verification has not finished.';
}
function renderFinding(record) {
  const { finding, provenance } = record;
  const cached = findingRows.get(finding.id);
  if (cached?.record === record && cached.expanded === expanded.has(finding.id) && (!cached.expanded || cached.busy === busy)) {
    return cached.rows;
  }
  const key = JSON.stringify([record, expanded.has(finding.id), expanded.has(finding.id) && busy]);
  const reviewKey = JSON.stringify([record.evidenceHash, record.coverageToken, record.history, finding.status, record.reviewable, busy]);
  const baseKey = JSON.stringify([finding.id, finding.article, finding.line, finding.kind,
    finding.severity, finding.evidence, finding.message]);
  if (cached?.key === key) { cached.record = record; return cached.rows; }
  if (cached && cached.expanded === expanded.has(finding.id) && cached.baseKey === baseKey &&
      (!cached.expanded || cached.reviewKey === reviewKey)) {
    const review = cached.rows[0].querySelector('.review-state');
    const freshness = cached.rows[0].querySelector('.freshness');
    if (review.textContent !== finding.status) review.textContent = finding.status;
    if (freshness.textContent !== Reflect.get(freshnessLabels, record.freshness)) {
      freshness.textContent = Reflect.get(freshnessLabels, record.freshness);
      freshness.className = `freshness ${record.freshness}`;
    }
    if (cached.expanded) {
      cached.evidenceLine.textContent = findingContext(record);
      cached.message.textContent = record.message || '';
      cached.message.hidden = !record.message;
      cached.currentCheck.textContent = currentCheckText(provenance);
    }
    cached.key = key;
    cached.record = record;
    return cached.rows;
  }
  const row = element('tr', undefined, 'finding');
  const level = element('td');
  level.append(element('span', finding.severity, `badge ${finding.severity}`));
  const description = element('td');
  const primary = finding.kind === 'claim' ? finding.evidence : finding.message;
  const toggle = control(description, '', () => {
    if (expanded.has(finding.id)) expanded.delete(finding.id); else expanded.add(finding.id);
    renderFindings();
    $(`finding-${finding.id}`).focus();
  });
  toggle.append(element('span', `${finding.article.split('/').at(-1)}:${finding.line} · `, 'finding-location'), element('span', primary));
  toggle.id = `finding-${finding.id}`;
  toggle.className = 'finding-toggle';
  toggle.title = `${finding.article}:${finding.line}\n${finding.message}`;
  toggle.setAttribute('aria-label', `${finding.article}:${finding.line} · ${primary}`);
  toggle.setAttribute('aria-expanded', String(expanded.has(finding.id)));
  toggle.setAttribute('aria-controls', `detail-${finding.id}`);
  row.append(level, description, element('td', finding.status, 'review-state'),
    element('td', Reflect.get(freshnessLabels, record.freshness), `freshness ${record.freshness}`));
  const detail = element('tr', undefined, 'finding-detail');
  detail.id = `detail-${finding.id}`;
  detail.hidden = !expanded.has(finding.id);
  const content = element('td'); content.colSpan = 4;
  const detailFields = {};
  if (!detail.hidden) {
    paragraph(content, finding.message);
    paragraph(content, finding.evidence, 'reference');
    detailFields.evidenceLine = paragraph(content, findingContext(record), 'muted');
    detailFields.message = paragraph(content, record.message || '', 'muted');
    detailFields.message.hidden = !record.message;
    renderDecision(content, record);
    const details = element('details');
    details.append(element('summary', 'Evidence and provenance'));
    paragraph(details, `First observed ${time(finding.firstSeen)}. Last observed ${time(finding.lastSeen)}. Last accepted scan ${time(provenance.lastVerification)}.`);
    detailFields.currentCheck = paragraph(details, currentCheckText(provenance));
    paragraph(details, `Source revision: ${provenance.report.sourceRevision}. Checks: ${provenance.report.checks.join(', ')}. Latest selected scope: ${provenance.scope?.join(', ')}.`);
    paragraph(details, provenance.product);
    paragraph(details, `Evidence: ${record.evidenceHash}. Latest verification execution: ${provenance.runId}.`);
    content.append(details);
  }
  detail.append(content);
  const rows = [row, detail];
  findingRows.set(finding.id, { key, baseKey, reviewKey, record, busy, expanded: expanded.has(finding.id), rows, ...detailFields });
  return rows;
}
function matches(record, filters) {
  const { finding } = record;
  return finding.article.toLowerCase().includes(filters.article) &&
    (filters.check === 'all' || (finding.kind === 'link' ? 'links' : 'claims') === filters.check) &&
    (filters.status === 'all' || finding.status === filters.status) &&
    (filters.freshness === 'all' || record.freshness === filters.freshness) &&
    `${finding.article} ${finding.message} ${finding.evidence} ${finding.line}`.toLowerCase().includes(filters.query);
}
function clearFilters() {
  severity = 'all';
  $('finding-search').value = ''; $('article-filter').value = '';
  for (const id of ['check-filter', 'status-filter', 'freshness-filter']) $(id).value = 'all';
  renderFindings(); renderCoverage();
}
function renderFindings() {
  if (!state) return;
  const active = document.hasFocus() ? document.activeElement : undefined;
  const selection = active instanceof HTMLTextAreaElement
    ? [active.selectionStart, active.selectionEnd, active.selectionDirection] : undefined;
  const filters = {
    query: $('finding-search').value.toLowerCase(), article: $('article-filter').value.trim().toLowerCase(),
    check: $('check-filter').value, status: $('status-filter').value, freshness: $('freshness-filter').value
  };
  const base = state.findings.filter(record => matches(record, filters));
  for (const [value, label] of [['all', 'All'], ['error', 'Errors'], ['warning', 'Warnings'], ['unverified', 'Unverified']]) {
    const count = value === 'all' ? base.length : base.filter(record => record.finding.severity === value).length;
    let node = severityButtons.get(value);
    if (!node) {
      node = control($('filters'), '', () => { severity = value; renderFindings(); node.focus(); });
      node.id = `filter-${value}`; node.className = `filter ${value}`;
      severityButtons.set(value, node);
    }
    if (node.textContent !== `${label} ${count}`) node.textContent = `${label} ${count}`;
    node.setAttribute('aria-pressed', String(severity === value));
  }
  if (orderedSource !== state.findings) {
    orderedSource = state.findings;
    orderedFindings = [...state.findings].sort((left, right) =>
      severities.indexOf(left.finding.severity) - severities.indexOf(right.finding.severity) ||
      left.finding.article.localeCompare(right.finding.article) || left.finding.line - right.finding.line);
  }
  const ordered = orderedFindings;
  const filtered = new Set(base.filter(record => severity === 'all' || record.finding.severity === severity).map(record => record.finding.id));
  $('finding-count').textContent = `${filtered.size} of ${state.findings.length}`;
  $('evidence-note').textContent = state.verification?.state === 'checking'
    ? 'Saved evidence is not current verification. Every decision save freshly validates its article, dependencies, and artifacts.'
    : `Freshness checked ${time(state.checkedAt)}; refresh after edits. Unverified is not an error or proof of public availability.`;
  if (!findingTable) {
    findingTable = element('table', undefined, 'findings-table');
    findingTable.setAttribute('aria-label', 'Findings');
    const head = element('thead'); const titles = element('tr');
    for (const title of ['Severity', 'Finding', 'Review', 'Freshness']) {
      const cell = element('th', title); cell.scope = 'col'; titles.append(cell);
    }
    head.append(titles);
    findingBody = element('tbody');
    findingTable.append(head, findingBody);
    emptyFindings = element('div');
    $('report').append(findingTable, emptyFindings);
  }
  const order = ordered.map(record => record.finding.id).join(',');
  const fragment = order !== findingOrder ? document.createDocumentFragment() : undefined;
  for (const record of ordered) {
    const id = record.finding.id;
    const previous = findingRows.get(id)?.rows;
    const rows = renderFinding(record);
    if (fragment) fragment.append(...rows);
    else if (previous !== rows) {
      previous[0].replaceWith(rows[0]);
      previous[1].replaceWith(rows[1]);
    }
    const visible = filtered.has(id);
    if (rows[0].hidden === visible) rows[0].hidden = !visible;
    rows[0].classList.toggle('finding', visible);
    const hideDetail = !visible || !expanded.has(id);
    if (rows[1].hidden !== hideDetail) rows[1].hidden = hideDetail;
  }
  if (fragment) {
    findingBody.replaceChildren(fragment);
    findingOrder = order;
    const ids = new Set(ordered.map(record => record.finding.id));
    for (const id of findingRows.keys()) if (!ids.has(id)) findingRows.delete(id);
  }
  findingTable.hidden = !filtered.size;
  emptyFindings.hidden = !!filtered.size;
  if (!filtered.size) {
    emptyFindings.replaceChildren();
    paragraph(emptyFindings, state.findings.length ? 'No findings match these filters.' :
      'No findings yet. Run checks for a scope; unchecked articles are not clean.', 'empty');
    if (state.findings.length) control(emptyFindings, 'Clear filters', clearFilters);
  }
  if (active?.isConnected && active.closest('.decision-form') && !active.closest('.finding-detail')?.hidden &&
      document.hasFocus() && document.activeElement !== active) {
    active.focus({ preventScroll: true });
    if (selection) active.setSelectionRange(...selection);
  }
}
function renderCoverage() {
  const items = state.coverage.filter(entry => articleMatches(entry.article));
  const summary = `Coverage · ${Object.entries(coverageLabels).map(([key, label]) =>
    `${items.filter(entry => entry.state === key).length} ${label.toLowerCase()}`).join(' · ')}`;
  if ($('coverage-summary').textContent !== summary) $('coverage-summary').textContent = summary;
  if (!$('coverage-details').open) {
    $('coverage-list').replaceChildren();
    coverageKey = undefined;
    return;
  }
  const key = JSON.stringify(items.map(entry => [
    entry.article, entry.state, entry.lastAcceptedState, entry.retained, entry.verification?.report.generatedAt,
    entry.verification?.freshness, entry.verification?.message, entry.attempt?.state, entry.attempt?.message
  ]));
  if (coverageKey === key) return;
  coverageKey = key;
  $('coverage-list').replaceChildren();
  paragraph($('coverage-list'), 'Claims and links only. Checked clean means no findings for these checks, not a complete article review. Later failures do not erase the last successful verification.', 'muted');
  for (const entry of items) {
    const row = element('div', undefined, 'coverage-row');
    const title = element('strong', entry.article);
    const description = element('span', Reflect.get(coverageLabels, entry.state));
    const details = element('span', entry.verification
      ? `Last accepted ${time(entry.verification.report.generatedAt)} (${entry.lastAcceptedState === 'clean' ? 'no findings' : 'with findings'}) · current freshness: ${entry.verification.freshness}${entry.retained ? ` · ${entry.retained} retained, not observed` : ''}`
      : 'No successful verification', 'muted');
    row.append(title, description, details);
    if (entry.state === 'incomplete') paragraph(row, `Latest attempt: ${entry.attempt?.state}. ${entry.attempt?.message || ''}`, 'muted');
    if (entry.state === 'unavailable' && entry.verification?.message) paragraph(row, entry.verification.message, 'muted');
    $('coverage-list').append(row);
  }
}
$('scope').addEventListener('input', render);
$('finding-search').addEventListener('input', renderFindings);
$('article-filter').addEventListener('input', () => { renderFindings(); renderCoverage(); });
for (const id of ['check-filter', 'status-filter', 'freshness-filter']) $(id).addEventListener('change', renderFindings);
$('coverage-details').addEventListener('toggle', () => { if (state) renderCoverage(); });
$('execution-details').addEventListener('toggle', () => { if (state) renderExecution(); });
$('launch-form').addEventListener('submit', event => {
  event.preventDefault();
  const scope = scopeInput();
  void perform(async () => {
    notice('Starting one bounded batch. Findings remain available while checks run.');
    const run = await request('launch', { scope, confirmed: true });
    await refresh();
    notice(run.launch === 'uncertain' ? 'Launch unconfirmed. Inspect execution details; do not retry.' : '', run.launch === 'uncertain');
  });
});
$('reload').addEventListener('click', () => void perform(async () => { await refresh(); notice(''); }));
$('stop-verification').addEventListener('click', () => void perform(async () => {
  state = await request('cancel-verification');
}));

setInterval(async () => {
  if (busy || polling || document.hidden || !state) return;
  const verificationStopped = ['cancelled', 'failed'].includes(state.verification?.state);
  const pending = ['checking', 'cancelling'].includes(state.verification?.state) || state.verification?.terminating ||
    state.catalog?.state === 'checking' ||
    state.hostSync?.state === 'checking' || state.coverage.some(entry => entry.verification?.freshness === 'checking') ||
    state.runs.some(run => run.ownerMatches && run.launch !== 'not-started' &&
    (!run.observation || run.observation.status === 'running' ||
      (!verificationStopped && !['invalid', 'stale', 'freshness-failed', 'execution-failed'].includes(run.result?.state) &&
        (run.result?.state === 'missing' ||
          (['idle', 'completed'].includes(run.observation.status) && !run.ingestedHash && run.completion?.outcome !== 'execution-failed')))));
  if (!pending) return;
  polling = true;
  const generation = viewGeneration;
  try {
    const updated = await request('poll');
    if (!busy && generation === viewGeneration) state = updated;
  }
  catch (error) { notice(`Could not refresh results: ${error.message}`, true); }
  finally { polling = false; render(); }
}, 1000);
await perform(async () => {
  await bootstrap();
  render();
  if (state.runs.some(run => run.ownerMatches && run.launch !== 'not-started')) state = await request('poll');
  notice(state.runs.length ? '' : 'Ready. Choose articles or folders to check.');
});
