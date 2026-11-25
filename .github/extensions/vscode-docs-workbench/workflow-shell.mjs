import { icon } from './dom.mjs';

for (const placeholder of document.querySelectorAll('.workflow-sidebar [data-icon]')) {
  placeholder.append(icon(placeholder.dataset.icon));
}
