'use strict';

(function initializeTabs(root, factory) {
  const api = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    return;
  }

  root.vscodeDocsTabs = api;
})(globalThis, function createTabsApi() {
  const REPLACEMENT_PATTERN = /<!--\s*VSCODE_TABS_REPLACE:([^\s]+)\s*-->/g;
  const TAB_DIRECTIVE_PATTERN = /^\{%\s*\/?tabs?\b/;
  const TABS_OPEN_PATTERN = /^\{%\s*tabs\s+id\s*=\s*(["'])(.*?)\1\s*%\}$/;
  const TAB_OPEN_PATTERN = /^\{%\s*tab\s+label\s*=\s*(["'])(.*?)\1\s*%\}$/;
  const TAB_CLOSE_PATTERN = /^\{%\s*\/tab\s*%\}$/;
  const TABS_CLOSE_PATTERN = /^\{%\s*\/tabs\s*%\}$/;

  function createError(source, lineNumber, message) {
    return new Error(`${source || '<unknown source>'}:${lineNumber}: ${message}`);
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createReplacement(markup) {
    // Keep wrappers inert until Docsify has compiled the Markdown inside each panel.
    return `<!-- VSCODE_TABS_REPLACE:${encodeURIComponent(markup)} -->`;
  }

  function trimBlankLines(lines) {
    let start = 0;
    let end = lines.length;
    while (start < end && !lines.at(start).trim()) {
      start++;
    }
    while (end > start && !lines.at(end - 1).trim()) {
      end--;
    }
    return lines.slice(start, end).join('\n');
  }

  function createElementId(groupId, groupIndex, tabIndex, kind) {
    const safeGroupId = groupId.replace(/[^A-Za-z0-9_-]/g, '-');
    return `vscode-tabs-${safeGroupId}-${groupIndex + 1}-${tabIndex + 1}-${kind}`;
  }

  function renderTabGroup(group, groupIndex) {
    const groupId = escapeHtml(group.id);
    const output = [
      createReplacement(`<div class="vscode-tabs" data-tabs-id="${groupId}">`),
      createReplacement('<div class="vscode-tabs__list" role="tablist" aria-label="Tabbed content">')
    ];

    for (const [tabIndex, tab] of group.tabs.entries()) {
      const tabId = createElementId(group.id, groupIndex, tabIndex, 'tab');
      const panelId = createElementId(group.id, groupIndex, tabIndex, 'panel');
      const selected = tabIndex === 0;
      output.push(createReplacement(
        `<button type="button" class="vscode-tabs__tab" role="tab" id="${tabId}" ` +
        `aria-controls="${panelId}" aria-selected="${selected}" tabindex="${selected ? '0' : '-1'}" ` +
        `data-tab-label="${escapeHtml(tab.label)}">${escapeHtml(tab.label)}</button>`
      ));
    }

    output.push(createReplacement('</div>'));

    for (const [tabIndex, tab] of group.tabs.entries()) {
      const tabId = createElementId(group.id, groupIndex, tabIndex, 'tab');
      const panelId = createElementId(group.id, groupIndex, tabIndex, 'panel');
      output.push(createReplacement(
        `<div class="vscode-tabs__panel" role="tabpanel" id="${panelId}" ` +
        `aria-labelledby="${tabId}"${tabIndex === 0 ? '' : ' hidden'}>`
      ));
      const content = trimBlankLines(tab.lines);
      if (content) {
        output.push(content);
      }
      output.push(createReplacement('</div>'));
    }

    output.push(createReplacement('</div>'));
    return output.join('\n\n');
  }

  function updateFence(fence, line) {
    const match = line.match(/^\s*(`{3,}|~{3,})/);
    if (!match) {
      return fence;
    }

    const marker = match[1];
    if (!fence) {
      return { character: marker.charAt(0), length: marker.length };
    }
    if (marker.charAt(0) === fence.character && marker.length >= fence.length) {
      return undefined;
    }
    return fence;
  }

  function transformTabbedContent(content, source) {
    if (typeof content !== 'string') {
      throw new TypeError(`${source || '<unknown source>'}: Tab transformation requires string content.`);
    }

    const lines = content.split(/\r?\n/);
    const output = [];
    const groupDefinitions = new Map();
    let currentGroup;
    let currentTab;
    let fence;
    let groupCount = 0;
    let tabCount = 0;

    function appendContentLine(line, lineNumber) {
      if (currentTab) {
        currentTab.lines.push(line);
      } else if (currentGroup && line.trim()) {
        throw createError(source, lineNumber, `Tab group "${currentGroup.id}" contains content outside a tab.`);
      } else if (!currentGroup) {
        output.push(line);
      }
    }

    for (const [lineIndex, line] of lines.entries()) {
      const lineNumber = lineIndex + 1;
      if (fence) {
        appendContentLine(line, lineNumber);
        fence = updateFence(fence, line);
        continue;
      }

      const nextFence = updateFence(undefined, line);
      if (nextFence) {
        appendContentLine(line, lineNumber);
        fence = nextFence;
        continue;
      }

      const directive = line.trim();
      const tabsOpen = directive.match(TABS_OPEN_PATTERN);
      const tabOpen = directive.match(TAB_OPEN_PATTERN);

      if (tabsOpen) {
        if (currentGroup) {
          throw createError(source, lineNumber, 'Nested tab groups are not supported.');
        }

        const id = tabsOpen[2].trim();
        if (!/^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(id)) {
          throw createError(source, lineNumber, `Tab group ID "${id}" is invalid.`);
        }
        currentGroup = { id, lineNumber, tabs: [] };
        continue;
      }

      if (tabOpen) {
        if (!currentGroup) {
          throw createError(source, lineNumber, 'Tab directive appears outside a tab group.');
        }
        if (currentTab) {
          throw createError(source, lineNumber, `Tab "${currentTab.label}" must be closed before another tab starts.`);
        }

        const label = tabOpen[2].trim();
        if (!label) {
          throw createError(source, lineNumber, 'Tab labels cannot be empty.');
        }
        if (currentGroup.tabs.some(tab => tab.label === label)) {
          throw createError(source, lineNumber, `Tab group "${currentGroup.id}" contains duplicate label "${label}".`);
        }

        currentTab = { label, lineNumber, lines: [] };
        currentGroup.tabs.push(currentTab);
        continue;
      }

      if (TAB_CLOSE_PATTERN.test(directive)) {
        if (!currentGroup || !currentTab) {
          throw createError(source, lineNumber, 'Closing tab directive does not have a matching open tab.');
        }
        currentTab = undefined;
        continue;
      }

      if (TABS_CLOSE_PATTERN.test(directive)) {
        if (!currentGroup) {
          throw createError(source, lineNumber, 'Closing tab group directive does not have a matching open group.');
        }
        if (currentTab) {
          throw createError(source, lineNumber, `Tab "${currentTab.label}" must be closed before its group closes.`);
        }
        if (!currentGroup.tabs.length) {
          throw createError(source, lineNumber, `Tab group "${currentGroup.id}" does not contain any tabs.`);
        }

        const labels = currentGroup.tabs.map(tab => tab.label);
        const existingLabels = groupDefinitions.get(currentGroup.id);
        if (existingLabels && existingLabels.join('\0') !== labels.join('\0')) {
          throw createError(
            source,
            lineNumber,
            `Repeated tab group "${currentGroup.id}" must use the same labels in the same order.`
          );
        }
        groupDefinitions.set(currentGroup.id, labels);

        output.push(renderTabGroup(currentGroup, groupCount));
        groupCount++;
        tabCount += currentGroup.tabs.length;
        currentGroup = undefined;
        continue;
      }

      if (TAB_DIRECTIVE_PATTERN.test(directive)) {
        throw createError(source, lineNumber, `Malformed tab directive "${directive}".`);
      }

      appendContentLine(line, lineNumber);
    }

    if (currentTab) {
      throw createError(source, currentTab.lineNumber, `Tab "${currentTab.label}" is not closed.`);
    }
    if (currentGroup) {
      throw createError(source, currentGroup.lineNumber, `Tab group "${currentGroup.id}" is not closed.`);
    }

    return {
      content: output.join('\n'),
      groupCount,
      tabCount
    };
  }

  function materializeTabbedContent(html) {
    return html.replace(REPLACEMENT_PATTERN, function replaceMarker(_marker, encodedMarkup) {
      return decodeURIComponent(encodedMarkup);
    });
  }

  function setGroupSelection(group, label) {
    const buttons = Array.from(group.querySelectorAll('.vscode-tabs__tab'));
    for (const button of buttons) {
      const selected = button.dataset.tabLabel === label;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;

      const panel = document.getElementById(button.getAttribute('aria-controls'));
      if (panel) {
        panel.hidden = !selected;
      }
    }
  }

  function createDocsifyTabsPlugin() {
    const selectedLabels = new Map();
    let hasTabs = false;

    function selectTab(button) {
      const group = button.closest('.vscode-tabs');
      if (!group) {
        return;
      }

      const groupId = group.dataset.tabsId;
      const label = button.dataset.tabLabel;
      selectedLabels.set(groupId, label);

      const groups = document.querySelectorAll('.vscode-tabs');
      for (const candidate of groups) {
        if (candidate.dataset.tabsId !== groupId) {
          continue;
        }
        const matchingButton = Array.from(candidate.querySelectorAll('.vscode-tabs__tab'))
          .find(tab => tab.dataset.tabLabel === label);
        if (matchingButton) {
          setGroupSelection(candidate, label);
        }
      }
    }

    function handleKeydown(event) {
      const button = event.currentTarget;
      const group = button.closest('.vscode-tabs');
      const buttons = group ? Array.from(group.querySelectorAll('.vscode-tabs__tab')) : [];
      const currentIndex = buttons.indexOf(button);
      let nextIndex;

      switch (event.key) {
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
          break;
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % buttons.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = buttons.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextButton = buttons.at(nextIndex);
      selectTab(nextButton);
      nextButton.focus();
    }

    function initializeTabs() {
      const groups = document.querySelectorAll('.vscode-tabs');
      for (const group of groups) {
        const buttons = Array.from(group.querySelectorAll('.vscode-tabs__tab'));
        const preferredLabel = selectedLabels.get(group.dataset.tabsId);
        const selectedButton = buttons.find(button => button.dataset.tabLabel === preferredLabel) ||
          buttons.find(button => button.getAttribute('aria-selected') === 'true') ||
          buttons.at(0);

        if (selectedButton) {
          selectTab(selectedButton);
        }

        for (const button of buttons) {
          if (button.dataset.tabsInitialized === 'true') {
            continue;
          }
          button.dataset.tabsInitialized = 'true';
          button.addEventListener('click', function handleClick() {
            selectTab(button);
          });
          button.addEventListener('keydown', handleKeydown);
        }
      }

      const query = window.location.hash.split('?')[1];
      const anchorId = query ? new URLSearchParams(query).get('id') : undefined;
      const anchor = anchorId ? document.getElementById(anchorId) : undefined;
      const panel = anchor ? anchor.closest('.vscode-tabs__panel') : undefined;
      const anchorButton = panel ? document.getElementById(panel.getAttribute('aria-labelledby')) : undefined;
      if (anchorButton) {
        selectTab(anchorButton);
      }
    }

    return function docsifyTabs(hook, vm) {
      hook.beforeEach(function transformTabs(content) {
        const result = transformTabbedContent(content, vm.route.file || vm.route.path);
        hasTabs = result.groupCount > 0;
        return result.content;
      });
      hook.afterEach(function materializeTabs(html, next) {
        next(hasTabs ? materializeTabbedContent(html) : html);
      });
      hook.doneEach(function initializeRenderedTabs() {
        if (hasTabs) {
          initializeTabs();
        }
      });
    };
  }

  return {
    createDocsifyTabsPlugin,
    materializeTabbedContent,
    transformTabbedContent
  };
});
