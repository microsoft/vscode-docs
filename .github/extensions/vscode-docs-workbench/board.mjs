import { icon, node } from './dom.mjs';
import { authorLabel, boardColumns, itemReference, queueInfo, sourceLabels, statusInfo } from './presentation.mjs';

const dragType = 'application/x-vscode-docs-workbench-item';

export function createTaskBoard(root, { onSelect, onMove, onShowAll }) {
  let draggedKey;
  let moving = false;

  function clearDrag() {
    draggedKey = undefined;
    root.querySelectorAll('.drop-target, .dragging').forEach(element => {
      element.classList.remove('drop-target', 'dragging');
    });
  }

  async function move(key, status, focusSelect) {
    if (moving) return;
    moving = true;
    root.inert = true;
    root.setAttribute('aria-busy', 'true');
    try {
      await onMove(key, status);
    } finally {
      moving = false;
      root.inert = false;
      root.setAttribute('aria-busy', 'false');
      if (focusSelect) {
        const card = [...root.querySelectorAll('.board-card')].find(element => element.dataset.key === key);
        (card?.querySelector('select') || root).focus();
      }
    }
  }

  function render(items, records, selected, hiddenColumns = []) {
    const columns = boardColumns(items, records, hiddenColumns);
    if (!columns.length) {
      const empty = node('div', undefined, 'empty-state board-no-columns');
      const restore = node('button', 'Show all columns', 'primary');
      restore.type = 'button';
      restore.addEventListener('click', () => { void onShowAll(); });
      empty.append(node('h2', 'All columns are hidden'),
        node('p', 'Your tasks are unchanged. Restore the columns here or choose individual columns from the Columns menu.'), restore);
      root.replaceChildren(empty);
      return;
    }
    root.replaceChildren(...columns.map(({ status, items: cards }) => {
      const info = statusInfo[status];
      const column = node('section', undefined, 'board-column');
      column.dataset.status = status;
      column.setAttribute('aria-labelledby', `board-column-${status}`);
      const header = node('div', undefined, 'board-column-header');
      const heading = node('h2', info.label);
      heading.id = `board-column-${status}`;
      const dot = node('span', undefined, `overview-dot tone-${info.tone}`);
      dot.setAttribute('aria-hidden', 'true');
      header.append(dot, heading, node('span', String(cards.length), 'board-column-count'));
      const list = node('ul', undefined, 'board-items');
      list.setAttribute('aria-label', `${info.label} tasks`);
      column.append(header, list);

      column.addEventListener('dragover', event => {
        if (!draggedKey || moving) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        column.classList.add('drop-target');
      });
      column.addEventListener('dragleave', event => {
        if (!(event.relatedTarget instanceof Node) || !column.contains(event.relatedTarget)) column.classList.remove('drop-target');
      });
      column.addEventListener('drop', event => {
        if (!draggedKey || moving || event.dataTransfer.getData(dragType) !== draggedKey) return;
        event.preventDefault();
        const key = draggedKey;
        clearDrag();
        void move(key, status, false);
      });

      for (const item of cards) {
        const card = node('li', undefined, 'board-card');
        card.dataset.key = item.key;
        card.draggable = true;
        card.classList.toggle('selected', selected === item.key);
        const source = node('div', undefined, 'board-card-source');
        source.append(icon(queueInfo[item.queue].icon), node('span', `${sourceLabels[item.queue]}${item.number ? ' ' : ' / '}${itemReference(item)}`));
        const title = node('button', item.title, 'board-card-title');
        title.type = 'button';
        title.setAttribute('aria-pressed', String(selected === item.key));
        title.addEventListener('click', () => { void onSelect(item.key); });
        card.append(source, title);
        if (item.repo) card.append(node('p', authorLabel(item.author), 'board-card-author'));
        if (item.labels?.length) {
          const labels = node('p', item.labels.slice(0, 2).join(', '), 'board-card-labels');
          labels.title = item.labels.join(', ');
          card.append(labels);
        }
        const label = node('label', 'Move to', 'board-move');
        const select = node('select');
        select.setAttribute('aria-label', `Move ${item.title} to`);
        for (const [value, target] of Object.entries(statusInfo)) {
          const option = node('option', `${target.label}${hiddenColumns.includes(value) ? ' (hidden column)' : ''}`);
          option.value = value;
          option.selected = value === status;
          select.append(option);
        }
        select.addEventListener('change', () => { void move(item.key, select.value, true); });
        label.append(select);
        card.append(label);
        card.addEventListener('dragstart', event => {
          if (moving || event.target.closest('select, input, textarea, label')) {
            event.preventDefault();
            return;
          }
          draggedKey = item.key;
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData(dragType, item.key);
          card.classList.add('dragging');
        });
        card.addEventListener('dragend', clearDrag);
        list.append(card);
      }
      if (!cards.length) list.append(node('li', 'Drop a task here', 'board-empty'));
      return column;
    }));
  }

  return { render, get busy() { return moving || !!draggedKey; } };
}
