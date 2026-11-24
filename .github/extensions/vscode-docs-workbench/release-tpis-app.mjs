const $ = id => document.getElementById(id);
let token;
let state;
let busy = true;
const instructions = new Map();

function node(tag, value) {
  const element = document.createElement(tag);
  if (value !== undefined) element.textContent = value;
  return element;
}
async function request(action, input = {}) {
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
  $('tpi-error').textContent = '';
  render();
  try { await action(); }
  catch (error) { $('tpi-error').textContent = error.message; }
  finally { busy = false; render(); }
}
function render() {
  $('tpi-release').disabled = busy || !state?.releases.length;
  $('tpi-refresh').disabled = busy || !token;
  $('tpi-channel').disabled = busy;
  if (!state) return;
  $('tpi-chat-status').textContent = state.chatAvailable ? '' : state.chatMessage || 'Native chat opening is unavailable in this host. You can still browse TPIs and mark them documented.';
  const query = $('tpi-search').value.trim().toLowerCase();
  const filter = $('tpi-filter').value;
  const documented = new Set(state.documented);
  const cache = state.cache;
  $('tpi-source').textContent = cache
    ? `Showing microsoft/vscode release ${cache.release.title}. Last fetched ${new Date(cache.fetchedAt).toLocaleString()}. Account: ${state.account}.${cache.release.number !== state.selected ? ' This is the last successful list, not the selected release.' : ''}`
    : '';
  const items = (cache?.items || []).filter(item =>
    `${item.title} ${item.number} ${item.assignees.join(' ')}`.toLowerCase().includes(query) &&
    (filter === 'all' || (filter === 'documented') === documented.has(item.number)));
  document.querySelector('.tpi-table').hidden = !items.length;
  $('tpi-count').textContent = cache ? `${items.length} of ${cache.items.length} TPIs` : '';
  $('tpi-empty').textContent = items.length ? '' : cache
    ? cache.items.length ? 'No TPIs match these filters.' : `No documentation TPIs found for ${cache.release.title}.`
    : state.selected ? 'No saved TPI list is available. Refresh to try again.' : 'Choose a release to load its TPIs.';
  $('tpi-rows').replaceChildren();
  for (const item of items) {
    const row = node('tr');
    const title = node('td');
    const link = node('a', item.title);
    link.className = 'tpi-title';
    link.href = `https://github.com/microsoft/vscode/issues/${item.number}`;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    const identity = node('span', `microsoft/vscode#${item.number}`);
    const metadata = node('div');
    metadata.className = 'tpi-row-meta';
    const details = node('details');
    details.className = 'tpi-instructions';
    details.append(node('summary', 'Optional instructions'));
    const label = node('label', 'Instructions for doc-writer');
    const input = node('textarea');
    input.id = `tpi-instructions-${item.number}`;
    input.rows = 2; input.maxLength = 4000; input.value = instructions.get(item.number) || '';
    label.htmlFor = input.id;
    input.addEventListener('input', () => instructions.set(item.number, input.value));
    details.append(label, input);
    metadata.append(identity, details);
    title.append(link, metadata);
    const assignee = node('td', item.assignees.join(', ') || 'Unassigned');
    assignee.className = 'tpi-assignee';
    const github = node('td');
    const badge = node('span', item.state === 'closed' ? 'Closed' : 'Open');
    badge.className = `tpi-state ${item.state}`;
    github.append(badge);
    row.append(title, assignee, github);
    const flag = node('td');
    flag.className = 'tpi-documented';
    const checkbox = node('input');
    checkbox.type = 'checkbox'; checkbox.checked = documented.has(item.number); checkbox.disabled = busy;
    checkbox.setAttribute('aria-label', `Mark microsoft/vscode#${item.number} as documented`);
    const itemInput = { account: state.account, release: cache.release.number, number: item.number };
    checkbox.addEventListener('change', () => {
      const checked = checkbox.checked;
      void perform(async () => {
        const result = await request('tpi-documented', { ...itemInput, documented: checked });
        state.documented = result.documented;
        $('tpi-notice').textContent = `${item.title}: ${checked ? 'marked documented' : 'documented mark removed'}. Saved locally.`;
      });
    });
    flag.append(checkbox);
    const action = node('td');
    action.className = 'tpi-action';
    const start = node('button', 'Document');
    start.type = 'button'; start.disabled = busy || !state.chatAvailable;
    start.title = state.chatAvailable ? 'Start doc-writer in chat' : state.chatMessage || 'Native chat is unavailable.';
    start.addEventListener('click', () => void perform(async () => {
      $('tpi-notice').textContent = 'Opening documentation chat...';
      try {
        const result = await request('tpi-document', { ...itemInput, request: instructions.get(item.number) || '',
          channel: $('tpi-channel').value, confirmed: true });
        $('tpi-notice').textContent = result.message;
      } catch (error) {
        $('tpi-notice').textContent = '';
        throw new Error(`${error.message} Check VS Code Chat before trying again; the chat may already have opened.`);
      }
    }));
    action.append(start); row.append(flag, action); $('tpi-rows').append(row);
  }
}
async function load(release) {
  const result = await request('tpi-load', { ...(state ? { account: state.account } : {}),
    ...(release !== undefined ? { release } : {}) });
  state = result;
  $('tpi-release').replaceChildren();
  const placeholder = node('option', 'Select a release'); placeholder.value = '';
  $('tpi-release').append(placeholder);
  for (const release of state.releases) {
    const option = node('option', `${release.title}${release.state === 'closed' ? ' (closed)' : ''}`);
    option.value = String(release.number); $('tpi-release').append(option);
  }
  $('tpi-release').value = state.selected === null ? '' : String(state.selected);
  $('tpi-error').textContent = state.error;
  $('tpi-notice').textContent = '';
}
$('tpi-release').addEventListener('change', () => {
  const value = $('tpi-release').value;
  if (value) void perform(() => load(Number(value)));
});
$('tpi-refresh').addEventListener('click', () => void perform(() => load()));
for (const id of ['tpi-search', 'tpi-filter']) $(id).addEventListener('input', render);
try {
  const response = await fetch('/bootstrap');
  if (!response.ok) throw new Error(`Cannot initialize Release TPIs: HTTP ${response.status}`);
  token = (await response.json()).token;
  await load();
} catch (error) {
  $('tpi-notice').textContent = '';
  $('tpi-error').textContent = error.message;
} finally { busy = false; render(); }
