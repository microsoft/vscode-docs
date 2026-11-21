const $ = id => document.getElementById(id);
let token;
let busy = false;
let available = false;

function eligibility() {
  $('chat-start').disabled = busy || !available || !$('chat-article').value.trim() ||
    (!$('chat-request').value.trim() && !$('chat-presets').querySelector('input:checked'));
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
      body: JSON.stringify({ action: 'review-chat', input: { article: $('chat-article').value.trim(),
        presets: [...$('chat-presets').querySelectorAll('input:checked')].map(input => input.value),
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
  if (!response.ok) throw new Error(`Cannot load review inputs: HTTP ${response.status}`);
  const result = await response.json();
  token = result.token;
  available = result.state.reviewChat?.available === true;
  for (const article of result.state.articles) {
    const option = document.createElement('option'); option.value = article; $('chat-articles').append(option);
  }
  for (const preset of result.state.reviewChat?.presets || []) {
    const label = document.createElement('label');
    const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = preset.id;
    checkbox.checked = ['technical', 'editorial'].includes(preset.id);
    label.append(checkbox, document.createTextNode(` ${preset.label}`));
    $('chat-presets').append(label);
  }
  for (const id of ['chat-article', 'chat-request', 'chat-channel', 'chat-presets']) $(id).disabled = !available;
  $('chat-notice').textContent = available ? '' : result.state.editor?.message || 'Native chat opening is unavailable in this host.';
  $('chat-notice').className = available ? 'muted' : 'error';
  eligibility();
} catch (error) {
  $('chat-notice').textContent = error.message;
  $('chat-notice').className = 'error';
}
