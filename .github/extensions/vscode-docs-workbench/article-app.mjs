const $ = id => document.getElementById(id);
let state;
let token;
let busy = false;
let polling = false;
let severity = 'all';
let catalogKey;
const expanded = new Set();
const drafts = new Map();
const severities = ['error', 'warning', 'unverified'];
const freshnessLabels = { fresh: 'Fresh', stale: 'Stale', 'not-observed': 'Not observed', unavailable: 'Unavailable' };
const coverageLabels = { clean: 'Checked clean', findings: 'With findings', 'never-checked': 'Never checked', stale: 'Stale', incomplete: 'Failed / incomplete' };
const time = value => value ? new Date(value).toLocaleString(undefined, {
  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
}) : 'Never';

function element(tag, value, className) {
  const node = document.createElement(tag);
  if (value !== undefined) node.textContent = value;
  if (className) node.className = className;
  return node;
}
function paragraph(parent, value, className) { parent.append(element('p', value, className)); }
function control(parent, label, action) {
  const node = element('button', label);
  node.type = 'button';
  node.addEventListener('click', action);
  parent.append(node);
  return node;
}
function notice(message, error = false) {
  $('notice').textContent = message;
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
  if (busy || polling) return;
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
  $('execution-indicator').textContent = latest ? `${executionLabel(latest)} · ${latest.articles.length} article(s)` : '';
  $('execution-details').hidden = !latest;
  const relevant = state.runs.filter(run => run === latest || !run.rerun?.allowed);
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
      resolve.disabled = busy || polling;
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
  $('launch').disabled = busy || polling || !state.hostAvailable || !valid || !!blocker;
  $('scope-count').textContent = `${articles.length} article(s) selected`;
  $('launch-eligibility').textContent = blocker ? `Cannot overlap this scope: ${blocker.rerun?.reason}` : '';
  $('reload').disabled = busy || polling;
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
    paragraph(parent, 'Read-only evidence. Run checks for this article before deciding.', 'muted');
    return;
  }
  const draft = drafts.get(finding.id);
  const reviewToken = JSON.stringify(latest);
  const current = draft?.evidenceHash === record.evidenceHash && draft.reviewToken === reviewToken
    ? draft : { status: finding.status, reason: '' };
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
  const submit = element('button', 'Save decision'); submit.type = 'submit'; submit.disabled = busy || polling;
  form.append(label, status, reasonLabel, reason, submit);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const decision = { findingId: finding.id, evidenceHash: record.evidenceHash, coverageToken: record.coverageToken,
      status: status.value, reason: reason.value };
    void perform(async () => {
      await request('triage', decision);
      drafts.delete(finding.id);
      await bootstrap();
      notice('Decision saved locally. Documentation and GitHub are unchanged.');
    });
  });
  parent.append(form);
}
function renderFinding(body, record) {
  const { finding, provenance } = record;
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
  if (!detail.hidden) {
    paragraph(content, finding.message);
    paragraph(content, finding.evidence, 'reference');
    paragraph(content, `${finding.article}:${finding.line} · ${finding.kind === 'link' ? 'Links' : 'Claims'} · ${Reflect.get(freshnessLabels, record.freshness)}`, 'muted');
    if (record.message) paragraph(content, record.message, 'muted');
    renderDecision(content, record);
    const details = element('details');
    details.append(element('summary', 'Evidence and provenance'));
    paragraph(details, `First observed ${time(finding.firstSeen)}. Last observed ${time(finding.lastSeen)}. Last successful verification ${time(provenance.lastVerification)}.`);
    paragraph(details, `Source revision: ${provenance.report.sourceRevision}. Checks: ${provenance.report.checks.join(', ')}. Latest selected scope: ${provenance.scope?.join(', ')}.`);
    paragraph(details, provenance.product);
    paragraph(details, `Evidence: ${record.evidenceHash}. Latest verification execution: ${provenance.runId}.`);
    content.append(details);
  }
  detail.append(content);
  body.append(row, detail);
}
function matches(record, includeSeverity = true) {
  const { finding } = record;
  const query = $('finding-search').value.toLowerCase();
  const check = $('check-filter').value;
  return (!includeSeverity || severity === 'all' || finding.severity === severity) &&
    articleMatches(finding.article) &&
    (check === 'all' || (finding.kind === 'link' ? 'links' : 'claims') === check) &&
    ($('status-filter').value === 'all' || finding.status === $('status-filter').value) &&
    ($('freshness-filter').value === 'all' || record.freshness === $('freshness-filter').value) &&
    `${finding.article} ${finding.message} ${finding.evidence} ${finding.line}`.toLowerCase().includes(query);
}
function clearFilters() {
  severity = 'all';
  $('finding-search').value = ''; $('article-filter').value = '';
  for (const id of ['check-filter', 'status-filter', 'freshness-filter']) $(id).value = 'all';
  renderFindings(); renderCoverage();
}
function renderFindings() {
  if (!state) return;
  $('report').replaceChildren();
  $('filters').replaceChildren();
  const base = state.findings.filter(record => matches(record, false));
  for (const [value, label] of [['all', 'All'], ['error', 'Errors'], ['warning', 'Warnings'], ['unverified', 'Unverified']]) {
    const count = value === 'all' ? base.length : base.filter(record => record.finding.severity === value).length;
    const node = control($('filters'), `${label} ${count}`, () => { severity = value; renderFindings(); $(`filter-${value}`).focus(); });
    node.id = `filter-${value}`; node.className = `filter ${value}`;
    node.setAttribute('aria-pressed', String(severity === value));
  }
  const filtered = state.findings.filter(record => matches(record))
    .sort((left, right) => severities.indexOf(left.finding.severity) - severities.indexOf(right.finding.severity) ||
      left.finding.article.localeCompare(right.finding.article) || left.finding.line - right.finding.line);
  $('finding-count').textContent = `${filtered.length} of ${state.findings.length}`;
  $('evidence-note').textContent = `Freshness checked ${time(state.checkedAt)}; refresh after edits. Unverified is not an error or proof of public availability.`;
  if (!filtered.length) {
    paragraph($('report'), state.findings.length ? 'No findings match these filters.' :
      'No findings yet. Run checks for a scope; unchecked articles are not clean.', 'empty');
    if (state.findings.length) control($('report'), 'Clear filters', clearFilters);
    return;
  }
  const table = element('table', undefined, 'findings-table');
  table.setAttribute('aria-label', 'Findings');
  const head = element('thead'); const titles = element('tr');
  for (const title of ['Severity', 'Finding', 'Review', 'Freshness']) {
    const cell = element('th', title); cell.scope = 'col'; titles.append(cell);
  }
  head.append(titles);
  const body = element('tbody');
  for (const record of filtered) renderFinding(body, record);
  table.append(head, body); $('report').append(table);
}
function renderCoverage() {
  const items = state.coverage.filter(entry => articleMatches(entry.article));
  $('coverage-summary').textContent = `Coverage · ${Object.entries(coverageLabels).map(([key, label]) =>
    `${items.filter(entry => entry.state === key).length} ${label.toLowerCase()}`).join(' · ')}`;
  $('coverage-list').replaceChildren();
  if (!$('coverage-details').open) return;
  paragraph($('coverage-list'), 'Claims and links only. Checked clean means no findings for these checks, not a complete article review. Later failures do not erase the last successful verification.', 'muted');
  for (const entry of items) {
    const row = element('div', undefined, 'coverage-row');
    const title = element('strong', entry.article);
    const description = element('span', Reflect.get(coverageLabels, entry.state));
    const details = element('span', entry.verification
      ? `Last verified ${time(entry.verification.report.generatedAt)} · ${entry.verification.freshness}${entry.retained ? ` · ${entry.retained} retained, not observed` : ''}`
      : 'No successful verification', 'muted');
    row.append(title, description, details);
    if (entry.state === 'incomplete') paragraph(row, `Latest attempt: ${entry.attempt?.state}. ${entry.attempt?.message || ''}`, 'muted');
    $('coverage-list').append(row);
  }
}
$('scope').addEventListener('input', render);
$('finding-search').addEventListener('input', renderFindings);
$('article-filter').addEventListener('input', () => { renderFindings(); renderCoverage(); });
for (const id of ['check-filter', 'status-filter', 'freshness-filter']) $(id).addEventListener('change', renderFindings);
$('coverage-details').addEventListener('toggle', () => { if (state) renderCoverage(); });
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

setInterval(async () => {
  if (busy || polling || document.hidden || !state) return;
  const pending = state.runs.some(run => run.ownerMatches && run.launch !== 'not-started' &&
    (!run.observation || run.observation.status === 'running' ||
      run.result?.state === 'missing' ||
      (run.observation.status === 'idle' && !run.ingestedHash && run.completion?.outcome !== 'execution-failed')));
  if (!pending) return;
  polling = true;
  try { await refresh(); }
  catch (error) { notice(`Could not refresh results: ${error.message}`, true); }
  finally { polling = false; render(); }
}, 5000);
await perform(async () => {
  await bootstrap();
  if (state.runs.some(run => run.ownerMatches && run.launch !== 'not-started')) await refresh();
  notice(state.runs.length ? '' : 'Ready. Choose articles or folders to check.');
});
