const $ = id => document.getElementById(id);
let token;
let state;
let busy = true;
let available = false;
let chatMessage = '';
const instructions = new Map();

function node(tag, value) {
  const element = document.createElement(tag);
  if (value !== undefined) element.textContent = value;
  return element;
}
async function request(action, input) {
  const response = await fetch('/action', { method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Workbench-Token': token },
    body: JSON.stringify({ action, input }) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
  return result;
}
async function perform(action) {
  if (busy) return;
  busy = true;
  $('pr-error').textContent = '';
  render();
  try { await action(); }
  catch (error) { $('pr-error').textContent = error.message; }
  finally { busy = false; render(); }
}
async function review(url, focus) {
  $('pr-notice').textContent = 'Opening PR review chat...';
  try {
    const result = await request('pr-chat', { url, request: focus, channel: $('pr-channel').value, confirmed: true });
    $('pr-notice').textContent = result.message;
  } catch (error) {
    $('pr-notice').textContent = '';
    throw new Error(`${error.message} Check VS Code Chat before trying again; the chat may already have opened.`);
  }
}
function render() {
  $('pr-repository').disabled = busy || !token;
  $('pr-refresh').disabled = busy || !token;
  $('pr-channel').disabled = busy;
  $('pr-direct-start').disabled = busy || !available || !$('pr-url').value.trim();
  $('pr-chat-status').textContent = available ? '' : chatMessage || 'Native chat opening is unavailable in this host. You can still browse PRs.';
  const cache = state?.cache;
  const query = $('pr-search').value.trim().toLowerCase();
  const items = (cache?.items || []).filter(item =>
    `${item.title} ${item.number} ${item.author || ''}`.toLowerCase().includes(query));
  $('pr-source').textContent = cache
    ? `Showing ${cache.repository}. Last fetched ${new Date(cache.fetchedAt).toLocaleString()}. Account: ${cache.account}.${cache.repository !== $('pr-repository').value ? ' This is the last successful list, not the selected repository.' : ''}`
    : '';
  $('pr-count').textContent = cache ? `${items.length} of ${cache.items.length} PRs` : '';
  $('pr-empty').textContent = items.length ? '' : cache
    ? cache.items.length ? 'No PRs match this search.' : `No open PRs found in ${cache.repository}.`
    : busy ? '' : 'No PR list is available. Refresh to try again, or review a PR by URL.';
  document.querySelector('.tpi-table').hidden = !items.length;
  $('pr-rows').replaceChildren();
  for (const item of items) {
    const url = `https://github.com/${cache.repository}/pull/${item.number}`;
    const row = node('tr');
    const title = node('td');
    const link = node('a', item.title);
    link.className = 'tpi-title'; link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    const metadata = node('div'); metadata.className = 'tpi-row-meta';
    const details = node('details'); details.className = 'tpi-instructions';
    details.append(node('summary', 'Optional instructions'));
    const input = node('textarea');
    input.id = `pr-instructions-${item.number}`; input.rows = 2; input.maxLength = 4000;
    input.value = instructions.get(url) || '';
    const label = node('label', 'Review focus'); label.htmlFor = input.id;
    input.addEventListener('input', () => instructions.set(url, input.value));
    details.append(label, input);
    metadata.append(node('span', `${cache.repository}#${item.number}`), details);
    title.append(link, metadata);
    const author = node('td', item.author || 'Deleted account'); author.className = 'tpi-assignee';
    const updated = node('td', new Date(item.updatedAt).toLocaleDateString()); updated.className = 'tpi-assignee';
    const status = node('td');
    const badge = node('span', item.draft ? 'Draft' : 'Open'); badge.className = `tpi-state${item.draft ? '' : ' open'}`;
    status.append(badge);
    const action = node('td'); action.className = 'tpi-action';
    const start = node('button', 'Review'); start.type = 'button'; start.disabled = busy || !available;
    start.setAttribute('aria-label', `Review ${cache.repository}#${item.number}`);
    start.addEventListener('click', () => void perform(() => review(url, instructions.get(url) || '')));
    action.append(start); row.append(title, author, updated, status, action); $('pr-rows').append(row);
  }
}
async function load() {
  const result = await request('pr-load', { repository: $('pr-repository').value });
  state = result;
  available = result.chatAvailable;
  chatMessage = result.chatMessage;
  $('pr-error').textContent = result.error;
  $('pr-notice').textContent = '';
}
$('pr-repository').addEventListener('change', () => void perform(load));
$('pr-refresh').addEventListener('click', () => void perform(load));
$('pr-search').addEventListener('input', render);
$('pr-url').addEventListener('input', render);
$('pr-direct-form').addEventListener('submit', event => {
  event.preventDefault();
  if (available) void perform(() => review($('pr-url').value.trim(), $('pr-request').value));
});
try {
  const response = await fetch('/bootstrap');
  if (!response.ok) throw new Error(`Cannot initialize PR review: HTTP ${response.status}`);
  const bootstrap = await response.json();
  token = bootstrap.token;
  available = bootstrap.state.prChat?.available === true;
  chatMessage = bootstrap.state.editor?.message;
  await load();
} catch (error) {
  $('pr-notice').textContent = '';
  $('pr-error').textContent = error.message;
} finally { busy = false; render(); }
