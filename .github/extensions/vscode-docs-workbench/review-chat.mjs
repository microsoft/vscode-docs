const $ = id => document.getElementById(id);
let token;
let busy = false;
let available = false;
const mediaKind = location.pathname === '/screenshots' ? 'screenshot' : location.pathname === '/videos' ? 'video' : undefined;
const procedure = location.pathname === '/instructions';
const writingKind = location.pathname === '/write' ? 'feature' : location.pathname === '/issue' ? 'issue' : undefined;

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
  $('chat-description').textContent = 'Automatic article-driven UI validation is not yet available. Advanced option: replay a human-reviewed scripted procedure in chat.';
  $('chat-description').className = 'media-pending';
  $('chat-presets').hidden = true;
  $('chat-request').placeholder = 'Describe the reviewed procedure or specific assertions you want to check.';
  $('chat-start').textContent = 'Start scripted replay in chat';
  $('chat-permissions').textContent = 'Uses docs-replay and chat credits. Review the exact procedure and environment in chat, approve an attended run, and confirm readiness before execution.';
  $('chat-scope').textContent = 'Scripted assertions are not proof that the article instructions are correct. No UI execution, media capture, or article edits start from this page. Chat results are not automatically saved to Findings.';
}
if (writingKind) {
  const title = writingKind === 'issue' ? 'Document an issue' : 'Write documentation';
  document.title = title;
  $('chat-title').textContent = title;
  $('chat-description').textContent = writingKind === 'issue'
    ? 'Start from a GitHub issue. For release test plan items, browse Release TPIs. Agree on the documentation plan with doc-writer in chat.'
    : 'Describe the content you need. Research, plan, and implement with doc-writer in the same chat.';
  $('chat-presets').hidden = true;
  $('chat-article-label').textContent = 'Existing article for context (optional)';
  $('chat-article').required = false;
  $('chat-issue-field').hidden = false;
  $('chat-issue').required = writingKind === 'issue';
  if (writingKind === 'issue') $('chat-issue-label').textContent = 'GitHub issue or test plan item URL';
  $('chat-request-label').textContent = writingKind === 'issue' ? 'Desired documentation outcome (optional)' : 'Documentation request';
  $('chat-request').placeholder = 'What should be documented, for whom, and what should readers be able to do? Add any known context or constraints.';
  $('chat-start').textContent = 'Start in chat';
  $('chat-permissions').textContent = 'Uses chat credits and doc-writer guidance. Planning comes first. Approve the overall scope and authoring location in chat before edits begin.';
  $('chat-scope').textContent = 'No separate plan file or canvas implementation task. Related articles and useful media can be included in the plan. No edits, captures, commits, or publication start from this page. Batch findings remain separate.';
  $('saved-writing-link').hidden = false;
  const form = $('review-chat-form');
  form.insertBefore($('chat-request-label'), $('chat-article-label'));
  form.insertBefore($('chat-request'), $('chat-article-label'));
  if (writingKind === 'issue') form.insertBefore($('chat-issue-field'), $('chat-request-label'));
}
for (const link of document.querySelectorAll('.page-navigation a')) {
  if (link.pathname === location.pathname) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
}

function eligibility() {
  const missing = writingKind
    ? writingKind === 'issue' ? !$('chat-issue').value.trim() : !$('chat-request').value.trim() && !$('chat-issue').value.trim()
    : !$('chat-article').value.trim() || (!mediaKind && !procedure && !$('chat-request').value.trim() && !$('chat-presets').querySelector('input:checked'));
  $('chat-start').disabled = busy || !available || missing;
}

for (const id of ['chat-article', 'chat-request', 'chat-presets', 'chat-issue']) $(id).addEventListener('input', eligibility);
$('review-chat-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (busy || !available) return;
  busy = true;
  eligibility();
  $('chat-notice').className = 'muted';
  $('chat-notice').textContent = 'Opening VS Code Chat...';
  try {
    const response = await fetch('/action', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Workbench-Token': token },
      body: JSON.stringify({ action: writingKind ? 'writing-chat' : procedure ? 'procedure-chat' : mediaKind ? 'media-chat' : 'review-chat', input: { article: $('chat-article').value.trim(),
        ...(writingKind ? { kind: writingKind, issue: $('chat-issue').value.trim() }
          : mediaKind ? { kind: mediaKind, operation: $('chat-operation').value }
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
  available = (writingKind ? result.state.writingChat : procedure ? result.state.procedureChat : mediaKind ? result.state.mediaChat : result.state.reviewChat)?.available === true;
  for (const article of result.state.articles) {
    const option = document.createElement('option'); option.value = article; $('chat-articles').append(option);
  }
  for (const preset of mediaKind || procedure || writingKind ? [] : result.state.reviewChat?.presets || []) {
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
} catch (error) {
  $('chat-notice').textContent = error.message;
  $('chat-notice').className = 'error';
}
