export const queueInfo = {
  board: { title: 'Task board', icon: 'board', description: 'Move documentation work forward across all your queues.', empty: 'No work matches this board', action: 'Refresh work' },
  history: { title: 'History', icon: 'archive', description: 'Find completed work you have archived, independently of release membership.', empty: 'No archived work yet', action: 'View task board' },
  pulls: { title: 'Pull requests', icon: 'pull', description: 'Check technical accuracy and writing quality before contributions land.', empty: 'No pull requests to review', action: 'Review PR' },
  tpis: { title: 'Release test plans', icon: 'release', description: 'Turn release features into documentation, independently of testing status.', empty: 'No test plans in this release', action: 'Plan documentation' },
  issues: { title: 'Documentation issues', icon: 'issue', description: 'Triage gaps, clarify existing content, and plan documentation updates.', empty: 'No open documentation issues', action: 'Plan documentation' },
  media: { title: 'Screenshots & videos', icon: 'media', description: 'Plan real product captures, review the results, and keep reusable scenarios.', empty: 'Give your docs a visual story', action: 'Create a media task' }
};

export const sourceLabels = { pulls: 'PR', tpis: 'TPI', issues: 'Docs issue', media: 'Media' };

export const statusInfo = {
  untriaged: { label: 'To triage', tone: 'neutral' },
  ready: { label: 'Ready to start', tone: 'blue' },
  'in-progress': { label: 'In progress', tone: 'blue' },
  'needs-review': { label: 'Needs review', tone: 'purple' },
  blocked: { label: 'Blocked', tone: 'amber' },
  done: { label: 'Done', tone: 'green' },
  'not-needed': { label: 'Not needed', tone: 'neutral' }
};

export function readable(value) {
  return String(value || '').toLowerCase().replaceAll(/[-_]/g, ' ').replace(/^./, letter => letter.toUpperCase());
}

export function authorLabel(author) {
  if (author === undefined) return 'Creator unavailable';
  return author === null ? 'Deleted account' : `@${author}`;
}

export function itemReference(item) {
  if (!item.number) return readable(item.kind);
  return `${item.repo && item.repo !== 'microsoft/vscode-docs' ? item.repo : ''}#${item.number}`;
}

export function relativeTime(value, now = Date.now()) {
  if (!value) return '';
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return 'Date unavailable';
  const minutes = Math.max(0, Math.floor((now - timestamp) / 60000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function workflowCounts(items, records) {
  const counts = { total: items.length, 'in-progress': 0, 'needs-review': 0, blocked: 0 };
  for (const item of items) {
    const status = records[item.key]?.disposition;
    if (Object.hasOwn(counts, status)) counts[status]++;
  }
  return counts;
}

export function combinedItems(queues, trackedItems = []) {
  const seen = new Set();
  const items = ['pulls', 'tpis', 'issues', 'media'].flatMap(queue =>
    queues[queue].filter(item => {
      if (seen.has(item.key)) return false;
      seen.add(item.key);
      return true;
    }).map(item => ({ ...item, queue }))
  );
  return items.concat(trackedItems.filter(item => {
    if (seen.has(item.key)) return false;
    seen.add(item.key);
    return true;
  }).map(item => ({ ...item })));
}

export function boardColumns(items, records, hiddenColumns = []) {
  return Object.keys(statusInfo).filter(status => !hiddenColumns.includes(status)).map(status => ({
    status, items: items.filter(item => (records[item.key]?.disposition || 'untriaged') === status)
  }));
}

export function visibleItems(items, records, queue, account, filters, hiddenColumns = []) {
  const search = filters.search.trim().toLowerCase();
  const label = filters.label.trim().toLowerCase();
  return items.filter(item => {
    const status = records[item.key]?.disposition || 'untriaged';
    const archived = !!records[item.key]?.archivedAt;
    const history = queue === 'history';
    const searchable = `${item.title} #${item.number || ''} ${item.key} ${item.author || ''}${history ? ` ${records[item.key]?.note || ''}` : ''}`;
    return (history ? archived : !archived) &&
      (queue !== 'board' || !hiddenColumns.includes(status)) &&
      (!search || searchable.toLowerCase().includes(search)) &&
      (queue === 'media' || !label || (item.labels || []).some(value => value.toLowerCase() === label)) &&
      (!['board', 'history'].includes(queue) || !filters.source || item.queue === filters.source) &&
      (!filters.disposition || status === filters.disposition) &&
      (queue === 'board' || history || filters.showDone || ['done', 'not-needed'].includes(filters.disposition) || !['done', 'not-needed'].includes(status)) &&
      (queue === 'board' || history || queue === 'tpis' || queue === 'media' || !filters.mine || item.assignees.includes(account)) &&
      (queue === 'media' || !filters.githubState || item.state === filters.githubState) &&
      (queue !== 'pulls' || !filters.draft || item.draft === (filters.draft === 'yes')) &&
      (queue !== 'pulls' || !filters.review || item.reviewDecision === filters.review);
  });
}

export const iconPaths = {
  archive: ['M3 3h18v5H3z', 'M5 8v13h14V8', 'M10 12h4'],
  board: ['M3 4h18v16H3z', 'M9 4v16', 'M15 4v16', 'M5 8h2', 'M11 8h2', 'M17 8h2'],
  book: ['M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4z', 'M13 7a3 3 0 0 1 3-3h4v14h-3a4 4 0 0 0-4 3'],
  pull: ['M6 6v12', 'M18 18v-8a4 4 0 0 0-4-4h-1', 'm15 3-3 3 3 3', 'M8 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0', 'M8 20a2 2 0 1 0-4 0 2 2 0 0 0 4 0', 'M20 20a2 2 0 1 0-4 0 2 2 0 0 0 4 0'],
  release: ['M20 13 13 20a2 2 0 0 1-3 0l-7-7V4h9l8 6a2 2 0 0 1 0 3Z', 'M7 8h.01'],
  issue: ['M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0', 'M12 7v6', 'M12 17h.01'],
  media: ['M4 4h16v16H4z', 'm4 16 5-5 4 4 3-3 4 4', 'M8 8h.01'],
  search: ['M18 10a8 8 0 1 0-16 0 8 8 0 0 0 16 0', 'm16 16 5 5'],
  refresh: ['M20 7a9 9 0 1 0 1 9', 'M20 2v6h-6'],
  plus: ['M12 5v14', 'M5 12h14'],
  filter: ['M4 6h16', 'M7 12h10', 'M10 18h4'],
  arrow: ['M5 12h14', 'm14 7 5 5-5 5'],
  back: ['M19 12H5', 'm10 7-5 5 5 5'],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  external: ['M14 3h7v7', 'm10 14 11-11', 'M10 3H3v18h18v-7'],
  check: ['m5 12 4 4L19 6'],
  clock: ['M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0', 'M12 6v6l4 2'],
  more: ['M5 12h.01', 'M12 12h.01', 'M19 12h.01'],
  layers: ['m12 3 10 5-10 5L2 8Z', 'm2 12 10 5 10-5', 'm2 16 10 5 10-5']
};
