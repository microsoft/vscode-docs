const $ = id => document.getElementById(id);
let token;
let busy = false;
let available = false;
let sectionGeneration = 0;
let sectionArticle = '';
let sectionHash;
let sectionPending = '';
let sectionsLoading = false;
const articles = new Set();
const mediaKind = location.pathname === '/screenshots' ? 'screenshot' : location.pathname === '/videos' ? 'video' : undefined;
const procedure = location.pathname === '/instructions';
const writing = ['/write', '/issue'].includes(location.pathname);

if (mediaKind) {
  const title = mediaKind === 'screenshot' ? 'Screenshots' : 'Demo videos';
  document.title = title;
  $('chat-title').textContent = title;
  $('chat-description').textContent = `Create or refresh ${mediaKind === 'screenshot' ? 'screenshots' : 'short demo videos'} for an article. Plan and review one or several assets with docs-media in chat.`;
  $('chat-presets').hidden = true;
  $('chat-media-task').hidden = false;
  $('chat-request').placeholder = mediaKind === 'screenshot'
    ? 'For example, refresh the setup screenshots and preserve their annotations.'
    : 'For example, make two short demos showing setup and the completed workflow.';
  $('chat-start').textContent = 'Start in chat';
  $('chat-permissions').textContent = 'Opens an interactive chat with the article and docs-media guidance. Uses chat credits. Approve capture work in chat, remain present during capture, then review exact candidates before authorizing article changes.';
  $('chat-scope').textContent = 'No feature plan or existing draft is required. This page launches chat; it does not capture media or track chat completion. Batch findings remain separate.';
}
if (procedure) {
  document.title = 'Check instructions';
  $('chat-title').textContent = 'Check instructions';
  $('chat-description').textContent = 'Choose an article and a section or task to check. Review a procedure derived from its instructions in chat before an attended VS Code run.';
  $('chat-presets').hidden = true;
  $('chat-section-field').hidden = false;
  $('chat-request-label').textContent = 'Task or additional focus (optional)';
  $('chat-request').placeholder = 'For example, check opening Find, entering a query, and navigating matches. You can agree on the scope in chat.';
  $('chat-start').textContent = 'Start check in chat';
  $('chat-permissions').textContent = 'Uses docs-replay and chat credits. Review the exact procedure and environment in chat, approve an attended run, and confirm readiness before execution.';
  $('chat-scope').textContent = 'Results cover only the agreed instructions and observable outcomes, with unsupported claims marked not checked. No UI execution, media capture, or article edits start from this page. Chat results are not automatically saved to Findings.';
}
if (writing) {
  document.title = 'Write documentation';
  $('chat-title').textContent = 'Write documentation';
  $('chat-description').textContent = 'Start from a documentation brief, a GitHub issue or test plan item, or both. Research, plan, and implement with doc-writer in chat.';
  $('chat-presets').hidden = true;
  $('chat-article-label').textContent = 'Existing article for context (optional)';
  $('chat-article').required = false;
  $('chat-issue-field').hidden = false;
  $('chat-issue').required = false;
  $('chat-request-label').textContent = 'Documentation request';
  $('chat-request').placeholder = 'Describe the content and intended reader, provide an issue or TPI URL below, or supply both. Add any known context or constraints.';
  $('chat-start').textContent = 'Start in chat';
  $('chat-permissions').textContent = 'Uses chat credits and doc-writer guidance. Planning comes first. Approve the overall scope and authoring location in chat before edits begin.';
  $('chat-scope').textContent = 'No separate plan file or canvas implementation task. Related articles and useful media can be included in the plan. No edits, captures, commits, or publication start from this page. Batch findings remain separate.';
  $('saved-writing-link').hidden = false;
  const form = $('review-chat-form');
  form.insertBefore($('chat-request-label'), $('chat-article-label'));
  form.insertBefore($('chat-request'), $('chat-article-label'));
  form.insertBefore($('chat-issue-field'), $('chat-article-label'));
}
const navigationPath = writing ? '/write' : location.pathname;
for (const link of document.querySelectorAll('.page-navigation a')) {
  if (link.pathname === navigationPath) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
}

function eligibility() {
  const missing = writing
    ? !$('chat-request').value.trim() && !$('chat-issue').value.trim()
    : !$('chat-article').value.trim() || (!mediaKind && !procedure && !$('chat-request').value.trim() && !$('chat-presets').querySelector('input:checked'));
  $('chat-start').disabled = busy || !available || missing || sectionsLoading;
  $('chat-section').disabled = busy || !available || sectionsLoading ||
    sectionArticle !== $('chat-article').value.trim() || $('chat-section').options.length < 2;
  $('chat-section-reload').disabled = busy || !available || sectionsLoading || !$('chat-article').value.trim();
}

function resetSections() {
  sectionGeneration++;
  sectionArticle = '';
  sectionHash = undefined;
  sectionPending = '';
  sectionsLoading = false;
  const option = document.createElement('option');
  option.value = '';
  option.textContent = 'Choose scope in chat';
  $('chat-section').replaceChildren(option);
  $('chat-section-notice').className = 'muted';
  $('chat-section-notice').textContent = 'Choose an article to list its sections.';
  eligibility();
}

async function loadSections() {
  const article = $('chat-article').value.trim();
  if (!available || !article || sectionArticle === article || sectionPending === article) return;
  resetSections();
  const generation = sectionGeneration;
  sectionPending = article;
  sectionsLoading = true;
  $('chat-section-notice').textContent = 'Loading article sections...';
  eligibility();
  try {
    const response = await fetch('/action', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Workbench-Token': token },
      body: JSON.stringify({ action: 'review-sections', input: { article } })
    });
    const result = await response.json();
    if (generation !== sectionGeneration || article !== $('chat-article').value.trim()) return;
    if (!response.ok) throw new Error(result.error || `Cannot load sections: HTTP ${response.status}`);
    for (const section of result.sections) {
      const option = document.createElement('option');
      option.value = String(section.startLine);
      option.textContent = `${section.title} (lines ${section.startLine}-${section.endLine})`;
      $('chat-section').append(option);
    }
    sectionArticle = article;
    sectionHash = result.articleHash;
    $('chat-section-notice').textContent = result.sections.length
      ? 'A section includes its nested subsections.'
      : 'No section headings found. Describe a task below or choose the scope in chat.';
  } catch (error) {
    if (generation !== sectionGeneration) return;
    $('chat-section-notice').className = 'error';
    $('chat-section-notice').textContent = `${error.message} You can still describe a task below.`;
  } finally {
    if (generation === sectionGeneration) {
      sectionPending = '';
      sectionsLoading = false;
      eligibility();
    }
  }
}

if (procedure) {
  $('chat-article').addEventListener('input', () => {
    resetSections();
    if (articles.has($('chat-article').value.trim())) void loadSections();
  });
  $('chat-article').addEventListener('change', () => { void loadSections(); });
  $('chat-section-reload').addEventListener('click', () => {
    resetSections();
    void loadSections();
  });
}
for (const id of ['chat-article', 'chat-request', 'chat-presets', 'chat-issue']) $(id).addEventListener('input', eligibility);
$('review-chat-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (busy || !available || sectionsLoading) return;
  busy = true;
  eligibility();
  $('chat-notice').className = 'muted';
  $('chat-notice').textContent = 'Opening VS Code Chat...';
  try {
    const response = await fetch('/action', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Workbench-Token': token },
      body: JSON.stringify({ action: writing ? 'writing-chat' : procedure ? 'procedure-chat' : mediaKind ? 'media-chat' : 'review-chat', input: { article: $('chat-article').value.trim(),
        ...(writing ? { kind: 'feature', issue: $('chat-issue').value.trim() }
          : mediaKind ? { kind: mediaKind, operation: $('chat-operation').value }
          : procedure ? ($('chat-section').value
            ? { section: { startLine: Number($('chat-section').value), articleHash: sectionHash } } : {})
          : { presets: [...$('chat-presets').querySelectorAll('input:checked')].map(input => input.value) }),
        request: $('chat-request').value, channel: $('chat-channel').value, confirmed: true } })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || `Chat handoff failed: HTTP ${response.status}`);
    $('chat-notice').textContent = result.message;
  } catch (error) {
    $('chat-notice').className = 'error';
    $('chat-notice').textContent = `${error.message} Check VS Code Chat before trying again; a timed-out request might already have opened it.`;
  } finally { busy = false; eligibility(); }
});

try {
  const response = await fetch('/bootstrap');
  if (!response.ok) throw new Error(`Cannot load chat inputs: HTTP ${response.status}`);
  const result = await response.json();
  token = result.token;
  available = (writing ? result.state.writingChat : procedure ? result.state.procedureChat : mediaKind ? result.state.mediaChat : result.state.reviewChat)?.available === true;
  for (const article of result.state.articles) {
    articles.add(article);
    const option = document.createElement('option'); option.value = article; $('chat-articles').append(option);
  }
  for (const preset of mediaKind || procedure || writing ? [] : result.state.reviewChat?.presets || []) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = preset.id;
    checkbox.checked = ['technical', 'editorial'].includes(preset.id);
    label.append(checkbox, document.createTextNode(` ${preset.label}`));
    $('chat-presets').append(label);
  }
  for (const id of ['chat-article', 'chat-request', 'chat-channel', 'chat-presets', 'chat-operation', 'chat-issue']) $(id).disabled = !available;
  $('chat-notice').textContent = available ? '' : result.state.editor?.message || 'Native chat opening is unavailable in this host.';
  $('chat-notice').className = available ? 'muted' : 'error';
  eligibility();
  if (procedure) await loadSections();
} catch (error) {
  $('chat-notice').textContent = error.message;
  $('chat-notice').className = 'error';
}
