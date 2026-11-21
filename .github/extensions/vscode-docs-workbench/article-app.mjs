const $ = id => document.getElementById(id);
let state;
let token;
let busy = false;
let polling = false;
let refreshRequested = false;
let lastPollAt = 0;
let viewGeneration = 0;
let actionPage;
let severity = 'all';
let catalogKey;
const expanded = new Set();
const drafts = new Map();
const findingRows = new Map();
const severityButtons = new Map();
const executionKeys = new Map();
let coverageKey;
let findingTable;
let findingBody;
let findingOrder;
let emptyFindings;
let orderedSource;
let orderedFindings;
let featurePlansKey;
const planFeedback = new Map();
const draftLocations = new Map();
const revisionFeedback = new Map();
const severities = ['error', 'warning', 'unverified'];
const freshnessLabels = { fresh: 'Fresh', checking: 'Checking', stale: 'Stale', 'not-observed': 'Not observed', unavailable: 'Unavailable' };
const coverageLabels = { clean: 'Checked clean', findings: 'With findings', checking: 'Checking freshness',
  'never-checked': 'Never checked', stale: 'Stale', unavailable: 'Verification unavailable', incomplete: 'Failed / incomplete',
  reviewed: 'Agent review completed' };
const time = value => value ? new Date(value).toLocaleString(undefined, {
  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
}) : 'Never';

function currentPage() { return location.pathname === '/writing' ? 'writing' : 'findings'; }
function renderPage() {
  const writing = currentPage() === 'writing';
  $('writing-page').hidden = !writing;
  $('findings-page').hidden = writing;
  document.querySelector('.article-app').dataset.page = currentPage();
  $('page-title').textContent = writing ? 'Saved plans and drafts' : 'Findings inbox';
  $('page-description').textContent = writing
    ? 'Resume previously prepared work. Start new documentation requests in chat.'
    : 'Check a scope. Review findings across articles, independently of when checks ran.';
  document.title = writing ? 'Saved plans and drafts' : 'Docs findings';
  for (const link of document.querySelectorAll('a[data-page]')) {
    if (link.dataset.page === currentPage()) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

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
function notice(message, error = false, page = actionPage || currentPage()) {
  const target = $(page === 'writing' ? 'writing-notice' : 'notice');
  if (target.textContent !== message) target.textContent = message;
  target.className = error ? 'error' : 'muted';
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
  actionPage = currentPage();
  busy = true;
  render();
  try { await action(); }
  catch (error) {
    notice(error.message, true);
    // A disconnected POST can have succeeded. Read references, never retry it.
    try { await bootstrap(); } catch { /* Preserve the original action error. */ }
  } finally { busy = false; actionPage = undefined; render(); }
}
function scopeInput() { return [...new Set($('scope').value.split(',').map(value => value.trim()).filter(Boolean))].sort(); }
function inScope(article, scope) { return scope.some(item => item === article || article.startsWith(`${item}/`)); }
function articleMatches(article) { return article.toLowerCase().includes($('article-filter').value.trim().toLowerCase()); }
function checkType(finding) { return ['replay', 'review'].includes(finding.kind) ? finding.kind : finding.kind === 'link' ? 'links' : 'claims'; }
function executionLabel(run) {
  if (['starting', 'uncertain'].includes(run.launch)) return 'Launch unconfirmed';
  if (run.launch === 'not-started') return 'Not started';
  if (run.result?.state === 'execution-failed') return 'Check failed';
  if (run.result?.state === 'invalid') return 'Invalid report';
  if (run.result?.state === 'stale') return 'Out-of-date report';
  if (run.result?.state === 'freshness-failed') return 'Verification failed';
  if (run.readiness) return 'Waiting for your readiness';
  if (run.kind === 'authoring' && run.result?.phase === 'screenshot' && run.result.state === 'candidate') return 'Screenshot ready for review';
  if (run.kind === 'authoring' && run.ingestedHash && run.result?.state === 'valid') {
    if (run.result.phase === 'draft') return run.result.draftStatus === 'needs-attention' ? 'Draft checks need attention' : 'Draft ready for review';
    return run.decision ? `Plan ${run.decision.status}` :
      run.result.planStatus === 'incomplete' ? 'Planning incomplete' : 'Plan ready for review';
  }
  if (run.kind === 'review' && run.ingestedHash && run.result?.state === 'valid') return `Article review ${run.result.reviewStatus}`;
  if (run.ingestedHash && run.result?.state === 'valid') return run.kind === 'replay' ? `Replay ${run.result.replayStatus}` : 'Findings updated';
  if (['completed', 'failed', 'cancelled'].includes(run.observation?.status) && run.result?.state === 'missing') return 'No report';
  if (['failed', 'cancelled'].includes(run.observation?.status)) return `Host ${run.observation.status}`;
  if (run.observation?.status === 'running') return 'Host running';
  return 'Waiting for verified results';
}
function renderExecution(writing = false) {
  const runs = state.runs.filter(run => (run.kind === 'authoring') === writing);
  const indicator = $(writing ? 'writing-execution-indicator' : 'execution-indicator');
  const details = $(writing ? 'writing-execution-details' : 'execution-details');
  const container = $(writing ? 'writing-execution' : 'execution');
  const latest = runs.at(-1);
  const label = latest ? `${executionLabel(latest)} · ${latest.kind === 'authoring' ? 'feature documentation' : `${latest.articles.length} article(s)`}` : '';
  if (indicator.textContent !== label) indicator.textContent = label;
  details.hidden = !latest;
  if (!latest || !details.open) {
    container.replaceChildren();
    executionKeys.delete(writing);
    return;
  }
  const relevant = runs.filter(run => run === latest || !run.rerun?.allowed);
  const key = JSON.stringify([busy, relevant.map(run => [
    run.id, run.ownerSessionId, run.ownerMatches, run.agentId, run.scope, run.createdAt, run.launch, run.ingestedHash,
    run.result, run.observation, run.error, run.syncError, run.rerun, run.activity
  ])]);
  if (executionKeys.get(writing) === key) return;
  executionKeys.set(writing, key);
  container.replaceChildren();
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
        await request(run.kind === 'authoring' ? 'feature-resolve' : ['replay', 'review'].includes(run.kind) ? `${run.kind}-resolve` : 'resolve-uncertain', { id: run.id, confirmed: true });
        await refresh();
        notice('Launch resolved. No task was cancelled.');
      }));
      resolve.disabled = busy;
    }
    container.append(section);
  }
}
function render() {
  renderPage();
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
  const blocker = state.runs.find(run => !run.kind && run.articles.some(article => articles.includes(article)) && !run.rerun?.allowed);
  const catalogReady = !state.catalog || state.catalog.state === 'complete';
  $('launch').disabled = busy || !catalogReady || state.hostSync?.state === 'checking' || !state.hostAvailable || !valid || !!blocker;
  $('scope-count').textContent = catalogReady ? `${articles.length} article(s) selected` :
    state.catalog.state === 'failed' ? 'Article list unavailable' : 'Loading current article list';
  $('launch-eligibility').textContent = blocker ? `Cannot overlap this scope: ${blocker.rerun?.reason}` : '';
  $('reload').disabled = busy || state.verification?.terminating || state.verification?.state === 'cancelling';
  $('writing-reload').disabled = busy;
  $('stop-verification').hidden = state.verification?.state !== 'checking';
  $('stop-verification').disabled = busy;
  const verificationStatus = state.verification?.state === 'checking'
    ? 'Checking current freshness in the background. Last accepted findings remain available.'
    : state.verification?.message || state.catalog?.message || (state.hostSync?.state === 'failed' ? state.hostSync.message : '');
  if ($('verification-status').textContent !== verificationStatus) $('verification-status').textContent = verificationStatus;
  renderExecution();
  renderExecution(true);
  if (currentPage() === 'writing') renderFeaturePlans();
  else {
    renderReplayRecovery();
    renderFindings();
    renderCoverage();
  }
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
    const decision = { findingId: finding.id, check: checkType(finding), evidenceHash: record.evidenceHash, coverageToken: record.coverageToken,
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
  return `${finding.article}:${finding.line} · ${checkType(finding)} · ${Reflect.get(freshnessLabels, record.freshness)}`;
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
    control(content, 'Open article at finding', () => void perform(async () => {
      await request('open-article', { article: finding.article, line: finding.line });
      notice('Opened the current article in the editor. Saved finding lines can be stale after edits.');
    })).disabled = busy || !state.editor?.available;
    if (!state.editor?.available) paragraph(content, state.editor?.message || 'Open the article at this line in your editor.', 'muted');
    if (finding.reviewEvidence) {
      const evidence = finding.reviewEvidence;
      paragraph(content, `Agent ${evidence.assessment === 'question' ? 'question' : 'judgment'} · ${evidence.category} · lines ${finding.line}-${evidence.endLine}`, 'muted');
      paragraph(content, evidence.quote, 'reference');
      paragraph(content, `Suggested correction: ${evidence.suggestion}`);
      for (const source of evidence.sources) {
        const link = element('a', 'Cited product source');
        link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
        content.append(link);
        paragraph(content, source.quote, 'reference');
      }
    } else paragraph(content, finding.evidence, 'reference');
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
    (filters.check === 'all' || checkType(finding) === filters.check) &&
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
  const filter = $('check-filter').value;
  const items = state.coverage.filter(entry => articleMatches(entry.article) &&
    (filter === 'all' || (['claims', 'links'].includes(filter) ? entry.check === 'checks' : entry.check === filter)));
  const summary = `Coverage · ${Object.entries(coverageLabels).map(([key, label]) =>
    `${items.filter(entry => entry.state === key).length} ${label.toLowerCase()}`).join(' · ')}`;
  if ($('coverage-summary').textContent !== summary) $('coverage-summary').textContent = summary;
  if (!$('coverage-details').open) {
    $('coverage-list').replaceChildren();
    coverageKey = undefined;
    return;
  }
  const key = JSON.stringify(items.map(entry => [
    entry.article, entry.check, entry.procedure, entry.state, entry.lastAcceptedState, entry.retained, entry.verification?.report.generatedAt,
    entry.verification?.freshness, entry.verification?.message, entry.attempt?.state, entry.attempt?.message, entry.review, entry.precheck
  ]));
  if (coverageKey === key) return;
  coverageKey = key;
  $('coverage-list').replaceChildren();
  paragraph($('coverage-list'), 'Structural checks, agent reviews, and replay have independent coverage. Review completion describes the requested focus, not a correctness verdict.', 'muted');
  for (const entry of items) {
    const row = element('div', undefined, 'coverage-row');
    const title = element('strong', `${entry.article}${entry.procedure ? ` · ${entry.check}: ${entry.procedure}` : ''}`);
    const description = element('span', entry.check === 'replay' && entry.state === 'clean' ? 'Replay passed' : Reflect.get(coverageLabels, entry.state));
    const details = element('span', entry.verification
      ? `Last accepted ${time(entry.verification.report.generatedAt)} (${entry.lastAcceptedState === 'reviewed' ? 'agent review completed' : entry.lastAcceptedState === 'clean' ? 'no findings' : 'with findings'}) · current freshness: ${entry.verification.freshness}${entry.retained ? ` · ${entry.retained} retained, not observed` : ''}`
      : 'No successful verification', 'muted');
    row.append(title, description, details);
    if (entry.state === 'incomplete') paragraph(row, `Latest attempt: ${entry.attempt?.state}. ${entry.attempt?.message || ''}`, 'muted');
    if (entry.state === 'unavailable' && entry.verification?.message) paragraph(row, entry.verification.message, 'muted');
    if (entry.review) {
      paragraph(row, entry.review.summary);
      for (const limitation of entry.review.limitations) paragraph(row, limitation, 'muted');
      const precheck = element('details');
      precheck.append(element('summary', `Deterministic precheck · ${entry.precheck?.length || 0} findings`));
      paragraph(precheck, 'Whole-article precheck, even when the agent reviews one section. Saved separately from agent judgments and independently launched checks.', 'muted');
      for (const finding of entry.precheck || []) paragraph(precheck, `${finding.article}:${finding.line} [${finding.severity}] ${finding.message}`);
      row.append(precheck);
    }
    $('coverage-list').append(row);
  }
}
const mediaSetups = new Map();
const mediaDescriptions = new Map();

function renderMediaActions(record, container, disclosure) {
  if (record.decision?.status !== 'approved' || record.draft || !record.plan.media.length) return;
  const panel = disclosure(`${record.id}:media-actions`, 'Optional media before drafting');
  paragraph(panel, 'Generate and review useful screenshots before preparing the draft. Generation, asset approval, and draft writes are separate decisions.', 'muted');
  for (const proposal of record.plan.media) {
    const section = element('section', undefined, 'media-proposal');
    section.append(element('h3', proposal.purpose));
    paragraph(section, `${proposal.article} · ${proposal.placement}`, 'muted');
    const identity = { id: record.id, planHash: record.planHash, mediaId: proposal.id };
    const key = `${record.id}:${proposal.id}`;
    const run = record.media?.find(item => item.proposalId === proposal.id);
    if (run) {
      if (run.message) paragraph(section, run.message, ['invalid', 'execution-failed'].includes(run.state) ? 'error' : 'muted');
      if (run.readiness) {
        paragraph(section, 'Handle native prompts in the capture window and keep it visible. Confirm only when you are ready.');
        const respond = ready => void perform(async () => {
          await request('feature-media-ready', { id: run.id, ready, confirmed: true });
          await refresh();
          notice(ready ? 'Readiness sent. Screenshot capture can continue.' : 'Cancellation sent. Waiting for cleanup.');
        });
        control(section, "I'm ready for the screenshot", () => respond(true)).disabled = busy;
        control(section, 'Cancel waiting capture', () => respond(false)).disabled = busy;
      }
      if (run.state === 'candidate') {
        const image = element('img', undefined, 'media-preview');
        image.alt = 'Screenshot candidate awaiting human review';
        image.src = `/assets/${run.id}?sha256=${run.assetHash}`;
        const full = element('a', 'Open full-size screenshot');
        full.href = image.src; full.target = '_blank'; full.rel = 'noopener noreferrer';
        section.append(image, full);
        paragraph(section, `${run.width} × ${run.height} pixels. Inspect text, framing, and private information before approval.`, 'muted');
        if (run.review) {
          paragraph(section, run.review.decision === 'approved' ? 'Screenshot approved. Prepare draft will separately confirm copying these exact bytes.' : 'Screenshot rejected. It will not be included in the draft.');
          if (run.review.altText) paragraph(section, run.review.altText);
        } else {
          const alt = element('textarea');
          alt.id = `media-alt-${run.id}`; alt.rows = 2; alt.maxLength = 1000;
          alt.value = mediaDescriptions.get(run.id) || '';
          alt.placeholder = 'Screenshot showing ...';
          const label = element('label', 'Screenshot alt text');
          label.htmlFor = alt.id;
          section.append(label, alt);
          let loaded = false;
          const decide = decision => void perform(async () => {
            if (!window.confirm(`${decision === 'approved' ? 'Approve' : 'Reject'} this exact screenshot after visual review? This does not edit or publish documentation.`)) return;
            await request('feature-media-review', { id: run.id, manifestHash: run.manifestHash, assetHash: run.assetHash,
              decision, altText: alt.value, confirmed: true });
            await refresh();
            notice('Exact screenshot review saved. No draft files were changed.');
          });
          const approve = control(section, 'Approve screenshot', () => decide('approved'));
          const reject = control(section, 'Reject screenshot', () => decide('rejected'));
          reject.classList.add('secondary');
          const enabled = () => { approve.disabled = busy || !loaded || !alt.value.trim(); reject.disabled = busy || !loaded; };
          image.addEventListener('load', () => { loaded = true; enabled(); });
          image.addEventListener('error', () => { loaded = false; enabled(); paragraph(section, 'Screenshot preview could not be loaded. Refresh and inspect the saved evidence.', 'error'); });
          alt.addEventListener('input', () => { mediaDescriptions.set(run.id, alt.value); enabled(); });
          enabled();
        }
      }
    } else if (proposal.kind !== 'screenshot') {
      paragraph(section, 'Video remains pending. This first authoring slice supports screenshots.', 'media-pending');
    } else {
      const setup = mediaSetups.get(key);
      if (!setup) {
        control(section, 'Set up screenshot', () => void perform(async () => {
          mediaSetups.set(key, { options: await request('feature-media-options', identity), selection: {} });
        })).disabled = busy;
      } else {
        for (const error of setup.options.errors) paragraph(section, error, 'error');
        if (!setup.options.storyboards.length) paragraph(section, 'No matching capture procedure. Leave this proposal pending and agree on a storyboard in conversation.', 'media-pending');
        else {
          const form = element('div', undefined, 'media-setup');
          function field(name, labelText, values) {
            const input = element(values ? 'select' : 'input');
            input.id = `${key}-${name}`;
            if (values) for (const [value, label] of values) {
              const option = element('option', label); option.value = value; input.append(option);
            }
            input.value = Reflect.get(setup.selection, name) ?? values?.[0]?.[0] ?? '';
            Reflect.set(setup.selection, name, input.value);
            input.disabled = busy;
            input.addEventListener('input', () => {
              Reflect.set(setup.selection, name, input.value); setup.prepared = undefined;
              if (values) { featurePlansKey = undefined; renderFeaturePlans(); }
              else form.querySelector('.prepared-media')?.remove();
            });
            const label = element('label', labelText); label.htmlFor = input.id;
            form.append(label, input);
          }
          field('storyboard', 'Capture procedure', setup.options.storyboards.map(story => [story.file, story.id]));
          const story = setup.options.storyboards.find(story => story.file === setup.selection.storyboard);
          const builds = setup.options.builds.filter(build => build.channel === story?.channel);
          field('executable', 'Installed VS Code build', builds.map(build => [build.executable, `${build.channel} · ${build.version} · ${build.revision.slice(0, 10)}`]));
          if (story?.workspaceRequired) field('workspace', 'Reviewed capture workspace (absolute path)');
          if (!builds.length) paragraph(form, 'No matching installed build. Screenshot capture remains pending.', 'media-pending');
          const inspect = control(form, 'Review capture procedure', () => void perform(async () => {
            const build = builds.find(build => build.executable === setup.selection.executable);
            setup.prepared = await request('feature-media-prepare', { ...identity, ...setup.selection, revision: build?.revision });
          }));
          inspect.disabled = busy || !builds.length;
          if (setup.prepared) {
            const procedure = setup.prepared.procedure;
            const reviewed = element('section', undefined, 'prepared-media');
            const steps = element('ol');
            for (const step of procedure.procedure.steps) {
              const target = step.target ? procedure.procedure.targets[step.target] : undefined;
              steps.append(element('li', `${JSON.stringify(step)}${target ? ` · ${JSON.stringify(target)}` : ''}`));
            }
            paragraph(reviewed, 'Review these actions and assertions. The capture uses a dedicated profile, not your personal profile.', 'muted');
            reviewed.append(steps);
            control(reviewed, 'Generate screenshot', () => void perform(async () => {
              if (!window.confirm(`Generate one attended screenshot for ${proposal.article}?\n\n${proposal.scenario}\n${procedure.productVersion} · ${procedure.binding.product.channel}\n${procedure.config.workspace || 'Synthetic fixture'}\n\nI reviewed the displayed procedure and will keep the capture window visible. No article changes or media approval.`)) return;
              const launched = await request('feature-media-launch', { ...identity, ...procedure.config,
                bindingHash: setup.prepared.bindingHash, confirmed: true });
              mediaSetups.delete(key);
              await refresh();
              notice(launched.launch === 'uncertain' ? launched.error : 'Screenshot generation started. Handle any native prompts and confirm readiness here.', launched.launch === 'uncertain');
            })).disabled = busy;
            form.append(reviewed);
          }
          section.append(form);
        }
      }
    }
    panel.append(section);
  }
  container.append(panel);
}

function renderFeaturePlans() {
  $('writing-host-status').textContent = state.hostAvailable ? '' : 'This host does not expose the task API needed to plan and draft documentation.';
  const records = state.featurePlans || [];
  $('feature-plans-section').hidden = !records.length;
  const key = JSON.stringify([busy, records]);
  if (key === featurePlansKey) return;
  featurePlansKey = key;
  const disclosureStates = new Map([...$('feature-plans').querySelectorAll('details[data-section]')]
    .map(details => [details.dataset.section, details.open]));
  function disclosure(key, label, open = false, className = 'plan-disclosure') {
    const details = element('details', undefined, className);
    details.dataset.section = key;
    details.open = disclosureStates.has(key) ? disclosureStates.get(key) : open;
    details.append(element('summary', label));
    return details;
  }
  $('feature-plans').replaceChildren();
  for (const record of records) {
    const plan = record.plan;
    const title = plan?.title || record.label;
    const status = record.draft?.report ? record.draft.recheck
      ? record.draft.recheck.checks.findings.some(item => item.severity === 'error') ? 'Checks need attention' : 'Draft ready'
      : record.draft.freshness?.state === 'changed' ? 'Recheck needed'
      : record.draft.report.status === 'needs-attention' ? 'Checks need attention' : 'Draft ready'
      : record.draft ? ['invalid', 'execution-failed'].includes(record.draft.state) ? 'Draft needs attention' : 'Preparing draft'
      : record.decision ? record.decision.status === 'approved' ? 'Approved' : 'Rejected'
      : plan ? Reflect.get({ 'changes-needed': 'Plan ready', 'no-change': 'No change proposed', incomplete: 'Research incomplete' }, plan.outcome)
      : record.waiting ? 'Researching' : 'Needs attention';
    const panel = disclosure(`${record.id}:card`, '', true, 'feature-plan');
    const summary = panel.querySelector('summary');
    summary.setAttribute('aria-label', `${title}, ${status}`);
    const badge = element('span', status, 'plan-status');
    badge.dataset.tone = /attention|incomplete|Rejected/.test(status) ? 'attention' : 'ready';
    summary.append(element('span', title, 'plan-title'), badge);
    const body = element('div', undefined, 'plan-body');
    panel.append(body);
    if (record.message) paragraph(body, record.message, record.waiting ? 'muted' : 'error');
    if (!plan) { $('feature-plans').append(panel); continue; }
    paragraph(body, plan.summary, 'plan-lead');
    const meta = element('div', undefined, 'plan-meta');
    meta.append(element('span', `${plan.changes.length} ${plan.changes.length === 1 ? 'file' : 'files'}`),
      element('span', plan.media.length ? `${plan.media.length} media ${plan.media.length === 1 ? 'proposal' : 'proposals'}` : 'No new media'));
    body.append(meta);
    const next = element('div', undefined, 'plan-next');
    const proposal = record.decision
      ? disclosure(`${record.id}:proposal`, 'Original plan and evidence')
      : element('div');
    if (record.decision) body.append(next, proposal);
    else body.append(proposal, next);
    const context = disclosure(`${record.id}:context`, 'Audience and product context', plan.outcome === 'incomplete');
    for (const [label, value] of [['Reader', plan.persona], ['Intent', plan.intent], ['Purpose', plan.purpose]]) {
      paragraph(context, `${label}: ${value}`);
    }
    paragraph(context, `Agent availability assessment: ${plan.availability.status}. ${plan.availability.explanation}`);
    const scope = element('section', undefined, 'plan-section');
    scope.append(element('h3', 'Proposed changes'));
    const changes = element('ul', undefined, 'plan-changes');
    for (const change of plan.changes) {
      const item = element('li');
      const heading = element('div', undefined, 'plan-change-heading');
      heading.append(element('code', change.path), element('span', change.action === 'create' ? 'New file' : 'Update'));
      item.append(heading);
      paragraph(item, change.description);
      changes.append(item);
    }
    if (!plan.changes.length) paragraph(scope, 'No content changes proposed.');
    scope.append(changes);
    const mediaSection = element('section', undefined, 'plan-section');
    mediaSection.append(element('h3', 'Media proposals'));
    if (!plan.media.length) paragraph(mediaSection, 'No media proposed.', 'muted');
    for (const media of plan.media) {
      const item = element('div', undefined, 'media-proposal');
      paragraph(item, `${media.kind} · ${media.article} · ${media.status}: ${media.purpose}`);
      paragraph(item, `Placement: ${media.placement}. Scenario: ${media.scenario}`, 'muted');
      if (media.limitation) paragraph(item, media.limitation, 'media-pending');
      mediaSection.append(item);
    }
    proposal.append(scope, mediaSection, context);
    const sources = disclosure(`${record.id}:sources`, 'Research evidence and source');
    paragraph(sources, `Documentation revision: ${record.sourceRevision}. Approval rechecks the source snapshot and any captured issue. Evidence is an agent assessment for human review.`);
    for (const source of plan.sources) {
      if (source.url.startsWith('file:')) {
        paragraph(sources, source.note);
        paragraph(sources, `Captured local source: ${source.url}`, 'reference');
        continue;
      }
      const url = new URL(source.url);
      const link = element('a', `${url.hostname} · ${url.pathname.split('/').filter(Boolean).at(-1) || 'Source'}`);
      link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      const item = element('p'); item.append(link); sources.append(item);
      paragraph(sources, source.note);
    }
    proposal.append(sources);
    if (plan.limitations.length) {
      const notes = disclosure(`${record.id}:notes`, `Original proposal notes (${plan.limitations.length})`, plan.outcome === 'incomplete');
      for (const limitation of plan.limitations) paragraph(notes, limitation, 'muted');
      proposal.append(notes);
    }
    if (record.decision) paragraph(next, `Plan ${record.decision.status} · ${time(record.decision.at)} · ${record.decision.reason}`, 'muted');
    else if (record.canDecide && !record.revision) {
      const decision = element('div', undefined, 'plan-decision');
      const feedback = element('textarea');
      feedback.id = `plan-feedback-${record.id}`; feedback.rows = 2; feedback.maxLength = 4000;
      feedback.value = planFeedback.get(record.id) || '';
      const label = element('label', 'Plan feedback (required to reject)');
      label.htmlFor = feedback.id;
      feedback.addEventListener('input', () => planFeedback.set(record.id, feedback.value));
      decision.append(label, feedback);
      const decide = status => void perform(async () => {
        await request('feature-decide', { id: record.id, planHash: record.planHash, status, confirmed: true,
          reason: feedback.value.trim() || (status === 'approved' ? 'Approved this exact plan scope in the canvas.' : '') });
        planFeedback.delete(record.id);
        await refresh();
        notice('Plan decision saved. Drafting and media generation have not started.');
      });
      const actions = element('div', undefined, 'plan-actions');
      control(actions, 'Approve plan scope', () => decide('approved')).disabled = busy;
      const reject = control(actions, 'Reject plan', () => decide('rejected'));
      reject.disabled = busy; reject.classList.add('secondary');
      decision.append(actions); next.append(decision);
    }
    if (record.revision && record.canDecide && plan.outcome === 'changes-needed') {
      const approval = element('section', undefined, 'plan-decision');
      paragraph(approval, 'Approve this article-level plan once. Routine corrections within it do not require separate approval.', 'muted');
      const target = element('input');
      target.id = `revision-target-${record.id}`;
      target.value = draftLocations.get(record.id) || record.revision.target || state.workspace;
      target.disabled = busy;
      target.addEventListener('input', () => draftLocations.set(record.id, target.value));
      const label = element('label', 'Update in an existing checkout');
      label.htmlFor = target.id;
      approval.append(label, target);
      control(approval, 'Approve and update article', () => void perform(async () => {
        const input = { id: record.id, planHash: record.planHash, target: target.value.trim() };
        const context = await request('feature-revision-context', input);
        const preserve = context.preserveExistingEdits ? '\nExisting edits were captured and must be preserved outside this update.' : '';
        if (!window.confirm(`Approve this article update and its file writes?\n\n${plan.summary}\n\n${plan.changes.map(item => item.description).join('\n')}\n\n${context.target}\nBranch: ${context.branch}\nFiles: ${context.files.join(', ')}${preserve}\n\nNo per-edit approvals, new media, commits, or publication.`)) return;
        const run = await request('feature-revision-start', { ...input, contextHash: context.contextHash, branch: context.branch, confirmed: true });
        await refresh();
        notice(run.launch === 'uncertain' ? run.error : 'Article update approved and started. Relevant checks run automatically after editing.', run.launch === 'uncertain');
      })).disabled = busy;
      control(approval, 'Reject update plan', () => void perform(async () => {
        await request('feature-decide', { id: record.id, planHash: record.planHash, status: 'rejected', confirmed: true,
          reason: 'Rejected the article-level update plan.' });
        await refresh();
        notice('Update plan rejected. No article edits were authorized.');
      })).disabled = busy;
      next.append(approval);
    }
    renderMediaActions(record, next, disclosure);
    if (record.draft) {
      const draft = element('section', undefined, 'draft-result plan-section');
      draft.append(element('h3', 'Draft'));
      paragraph(draft, `${record.draft.target} · ${record.draft.branch}`, 'draft-location');
      if (record.draft.message) paragraph(draft, record.draft.message, record.draft.waiting ? 'muted' : 'error');
      const report = record.draft.report;
      if (!report && !record.draft.message) paragraph(draft, 'Waiting for confirmed draft results.', 'muted');
      if (report) {
        const currentChecks = record.draft.recheck || report;
        paragraph(draft, currentChecks.checks.findings.some(item => item.severity === 'error') ? 'Draft saved; checks need attention.' : 'Draft saved for human review.');
        for (const item of report.files) {
          paragraph(draft, item.path, 'reference');
          if (item.path.endsWith('.md')) control(draft, 'Open diff in editor', () => void perform(async () => {
            const opened = await request('feature-open-diff', { id: record.id, article: item.path });
            notice(`${opened.comparison} Save editor changes before rechecking.`);
          })).disabled = busy || !state.editor?.available;
        }
        if (!state.editor?.available) paragraph(draft, state.editor?.message || 'Native editor opening is unavailable. Use the saved diff below.', 'muted');
        const count = level => currentChecks.checks.findings.filter(finding => finding.severity === level).length;
        const checks = disclosure(`${record.id}:checks`, `Checks · ${count('error')} errors · ${count('warning')} warnings · ${count('unverified')} unverified`);
        for (const finding of currentChecks.checks.findings) paragraph(checks, `${finding.article}:${finding.line} [${finding.severity}] ${finding.message}`);
        const diff = disclosure(`${record.id}:diff`, 'Review draft diff', false, 'draft-diff');
        diff.append(element('pre', report.diff));
        draft.append(diff, checks);
        paragraph(draft, `Saved checks from ${time(currentChecks.generatedAt)}. Further edits require another check.`, 'muted');
        if (record.draft.freshness?.state !== 'unchanged' && !record.draft.recheck) {
          paragraph(draft, record.draft.freshness?.message || 'Article files changed after drafting. Saved results are historical; recheck the current files.', 'media-pending');
        }
        if (record.draft.checkError) paragraph(draft, record.draft.checkError, 'error');
        control(draft, 'Recheck current files', () => void perform(async () => {
          await request('feature-recheck', { id: record.id });
          await refresh();
          notice('Current local checks saved. Product and editorial review findings remain separate.');
        })).disabled = busy;
        for (const media of report.pendingMedia) paragraph(draft, `Media pending: ${media.id} (${media.kind}). ${media.reason}`, 'media-pending');
      }
      next.append(draft);
    } else if (record.decision?.status === 'approved' && plan.outcome === 'changes-needed') {
      const setup = element('section', undefined, 'draft-setup plan-section');
      setup.append(element('h3', 'Prepare a draft'));
      const target = element('input');
      target.id = `draft-target-${record.id}`;
      target.value = draftLocations.get(record.id) || state.workspace;
      target.disabled = busy;
      target.addEventListener('input', () => draftLocations.set(record.id, target.value));
      const label = element('label', 'Draft in an existing checkout');
      label.htmlFor = target.id;
      setup.append(label, target);
      paragraph(setup, 'Confirm the existing branch, planned files, and any approved screenshots before drafting. No branch creation, media generation, or publication.', 'muted');
      const actions = element('div', undefined, 'plan-actions');
      control(actions, 'Prepare draft', () => void perform(async () => {
        const input = { id: record.id, planHash: record.planHash, target: target.value.trim() };
        const context = await request('feature-draft-context', input);
        const changed = context.reconfirm ? 'The commit or planning guidance changed, but documentation inputs still match. Reconfirm this plan for drafting.\n\n' : '';
        const assets = context.assets?.length ? `\nCopy exact approved screenshots:\n${context.assets.map(asset => `${asset.path}\nSHA-256: ${asset.sha256}\n${asset.markdown}`).join('\n')}\n` : '';
        if (!window.confirm(`${changed}Prepare the approved draft in:\n${context.target}\nBranch: ${context.branch}\n\nWrite only:\n${context.files.join('\n')}\n${assets}\nNo commits, unapproved media, or GitHub writes. Continue?`)) return;
        const run = await request('feature-draft-start', { ...input, branch: context.branch, contextHash: context.contextHash, confirmed: true });
        await refresh();
        notice(run.launch === 'uncertain' ? run.error : 'Drafting started in the confirmed location. Media remains a separate attended step.', run.launch === 'uncertain');
      })).disabled = busy;
      setup.append(actions); next.append(setup);
    }
    if (record.revision && (!record.draft || record.draft.report)) {
      const adjustments = disclosure(`${record.id}:adjustments`, record.draft ? 'Request further adjustments' : 'Adjust the update plan');
      const input = element('textarea');
      input.id = `revision-feedback-${record.workId}`; input.rows = 2; input.maxLength = 4000;
      input.value = revisionFeedback.get(record.workId) || '';
      input.disabled = busy;
      const label = element('label', 'Requested adjustments');
      label.htmlFor = input.id;
      adjustments.append(label, input);
      const send = control(adjustments, 'Plan adjustments', () => void perform(async () => {
        await request('feature-follow-up', { id: record.id, instructions: input.value.trim(), confirmed: true });
        revisionFeedback.delete(record.workId);
        await refresh();
        notice('Planning adjustments on the same article update. No new edits were authorized.');
      }));
      const update = () => { revisionFeedback.set(record.workId, input.value); send.disabled = busy || !input.value.trim(); };
      input.addEventListener('input', update); update();
      next.append(adjustments);
    }
    $('feature-plans').append(panel);
  }
}
function renderReplayRecovery() {
  $('replay-readiness').replaceChildren();
  for (const run of state.runs.filter(item => item.kind === 'replay' && item.readiness && item.ownerMatches)) {
    const panel = element('section');
    paragraph(panel, `VS Code is waiting: ${run.binding.storyboardId}. Handle any native prompts and keep its window visible.`);
    const respond = ready => void perform(async () => {
      await request('replay-ready', { id: run.id, ready, confirmed: true });
      await refresh();
      notice(ready ? 'Readiness sent. The reviewed procedure can continue.' : 'Cancellation sent. Waiting for cleanup.');
    });
    control(panel, "I'm ready", () => respond(true)).disabled = busy;
    control(panel, 'Cancel waiting replay', () => respond(false)).disabled = busy;
    $('replay-readiness').append(panel);
  }
  $('replay-readiness').hidden = !$('replay-readiness').children.length;
}
$('scope').addEventListener('input', render);
$('finding-search').addEventListener('input', renderFindings);
$('article-filter').addEventListener('input', () => { renderFindings(); renderCoverage(); });
for (const id of ['check-filter', 'status-filter', 'freshness-filter']) $(id).addEventListener('change', () => { renderFindings(); renderCoverage(); });
$('coverage-details').addEventListener('toggle', () => { if (state) renderCoverage(); });
$('execution-details').addEventListener('toggle', () => { if (state) renderExecution(); });
$('writing-execution-details').addEventListener('toggle', () => { if (state) renderExecution(true); });
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
$('writing-reload').addEventListener('click', () => void perform(async () => {
  state = await request('poll');
  notice('');
}));
$('stop-verification').addEventListener('click', () => void perform(async () => {
  state = await request('cancel-verification');
}));

async function pollResults(force = false) {
  if (force) refreshRequested = true;
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
  // Another canvas or host action can add work after this view becomes idle.
  if (!pending && !refreshRequested && Date.now() - lastPollAt < 10_000) return;
  polling = true;
  refreshRequested = false;
  lastPollAt = Date.now();
  const generation = viewGeneration;
  try {
    const updated = await request('poll');
    if (!busy && generation === viewGeneration) state = updated;
    else refreshRequested = true;
  }
  catch (error) { notice(`Could not refresh results: ${error.message}`, true); }
  finally { polling = false; render(); }
}
setInterval(() => void pollResults(), 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) void pollResults(true); });
window.addEventListener('focus', () => void pollResults(true));
for (const link of document.querySelectorAll('a[data-page]')) {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.pathname !== link.pathname) history.pushState(null, '', link.pathname);
    render();
    $('page-title').focus();
    void pollResults(true);
  });
}
window.addEventListener('popstate', () => { render(); $('page-title').focus(); void pollResults(true); });
await perform(async () => {
  await bootstrap();
  render();
  if (state.runs.some(run => run.ownerMatches && run.launch !== 'not-started')) state = await request('poll');
  notice(state.runs.some(run => run.kind !== 'authoring') ? '' : 'Ready. Choose articles or folders to check.', false, 'findings');
  notice(state.featurePlans?.length ? '' : 'No saved plans or drafts. Start a new documentation request in chat.', false, 'writing');
});
