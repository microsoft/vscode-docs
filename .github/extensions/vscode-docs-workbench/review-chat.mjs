const $ = id => document.getElementById(id);
let token;
let busy = false;
let available = false;
const mediaKind = location.pathname === '/screenshots' ? 'screenshot' : location.pathname === '/videos' ? 'video' : undefined;

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
for (const link of document.querySelectorAll('.page-navigation a')) {
  if (link.pathname === location.pathname) link.setAttribute('aria-current', 'page');
  else link.removeAttribute('aria-current');
}

function eligibility() {
  $('chat-start').disabled = busy || !available || !$('chat-article').value.trim() ||
    (!mediaKind && !$('chat-request').value.trim() && !$('chat-presets').querySelector('input:checked'));
}

for (const id of ['chat-article', 'chat-request', 'chat-presets']) $(id).addEventListener('input', eligibility);
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
      body: JSON.stringify({ action: mediaKind ? 'media-chat' : 'review-chat', input: { article: $('chat-article').value.trim(),
        ...(mediaKind ? { kind: mediaKind, operation: $('chat-operation').value }
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
  available = (mediaKind ? result.state.mediaChat : result.state.reviewChat)?.available === true;
  for (const article of result.state.articles) {
    const option = document.createElement('option'); option.value = article; $('chat-articles').append(option);
  }
  for (const preset of mediaKind ? [] : result.state.reviewChat?.presets || []) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = preset.id;
    checkbox.checked = ['technical', 'editorial'].includes(preset.id);
    label.append(checkbox, document.createTextNode(` ${preset.label}`));
    $('chat-presets').append(label);
  }
  for (const id of ['chat-article', 'chat-request', 'chat-channel', 'chat-presets', 'chat-operation']) $(id).disabled = !available;
  $('chat-notice').textContent = available ? '' : result.state.editor?.message || 'Native chat opening is unavailable in this host.';
  $('chat-notice').className = available ? 'muted' : 'error';
  eligibility();
} catch (error) {
  $('chat-notice').textContent = error.message;
  $('chat-notice').className = 'error';
}
