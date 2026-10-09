'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const test = require('node:test');
const vm = require('node:vm');
const {
  materializeTabbedContent,
  transformTabbedContent
} = require('./tabs');
const {
  loadDataVariables,
  validateDataVariableReferences
} = require('./data-variables');

test('transforms tab directives while preserving Markdown content', function () {
  const source = [
    '# Install',
    '',
    '{% tabs id="os" %}',
    '{% tab label="Windows" %}',
    '',
    '1. Download the installer.',
    '1. Run the installer.',
    '',
    '{% /tab %}',
    '{% tab label="macOS" %}',
    '',
    '```bash',
    'open app.dmg',
    '```',
    '',
    '{% /tab %}',
    '{% /tabs %}'
  ].join('\n');

  const result = transformTabbedContent(source, 'article.md');
  const html = materializeTabbedContent(result.content);

  assert.equal(result.groupCount, 1);
  assert.equal(result.tabCount, 2);
  assert.match(html, /role="tablist"/);
  assert.match(html, /role="tab"/);
  assert.match(html, /role="tabpanel"/);
  assert.match(html, /data-tabs-id="os"/);
  assert.match(html, /aria-selected="true"/);
  assert.match(html, /<div class="vscode-tabs__panel"[^>]+ hidden>/);
  assert.match(html, /1\. Download the installer\./);
  assert.match(html, /```bash/);
  assert.doesNotMatch(html, /\{% \/?tabs?/);
});

test('allows repeated group IDs with matching labels', function () {
  const group = [
    '{% tabs id="surface" %}',
    '{% tab label="Chat view" %}',
    'Chat content.',
    '{% /tab %}',
    '{% tab label="Agents window" %}',
    'Agents content.',
    '{% /tab %}',
    '{% /tabs %}'
  ].join('\n');

  const result = transformTabbedContent(`${group}\n\n${group}`, 'article.md');

  assert.equal(result.groupCount, 2);
  assert.equal(result.tabCount, 4);
  assert.match(result.content, /vscode-tabs-surface-1-1-tab/);
  assert.match(result.content, /vscode-tabs-surface-2-1-tab/);
});

test('rejects repeated group IDs with different labels', function () {
  const content = [
    '{% tabs id="surface" %}',
    '{% tab label="Chat view" %}',
    'Content.',
    '{% /tab %}',
    '{% /tabs %}',
    '{% tabs id="surface" %}',
    '{% tab label="Agents window" %}',
    'Content.',
    '{% /tab %}',
    '{% /tabs %}'
  ].join('\n');

  assert.throws(
    () => transformTabbedContent(content, 'article.md'),
    /article\.md:10: Repeated tab group "surface" must use the same labels/
  );
});

test('ignores tab directives inside fenced code blocks', function () {
  const content = [
    '```liquid',
    '{% tabs id="example" %}',
    '{% tab label="Example" %}',
    '{% /tab %}',
    '{% /tabs %}',
    '```'
  ].join('\n');

  const result = transformTabbedContent(content, 'article.md');

  assert.equal(result.groupCount, 0);
  assert.equal(result.content, content);
});

test('reports malformed tab structures with source locations', function () {
  const invalidContent = [
    ['{% tab label="Outside" %}', /article\.md:1: Tab directive appears outside/],
    ['{% tabs id="" %}', /article\.md:1: Tab group ID "" is invalid/],
    ['{% tabs id="one" %}\nContent\n{% /tabs %}', /article\.md:2: Tab group "one" contains content outside/],
    ['{% tabs id="one" %}\n{% tabs id="two" %}', /article\.md:2: Nested tab groups/],
    ['{% tabs id="one" %}\n{% tab label="" %}', /article\.md:2: Tab labels cannot be empty/],
    [
      '{% tabs id="one" %}\n{% tab label="Same" %}\n{% /tab %}\n{% tab label="Same" %}',
      /article\.md:4: Tab group "one" contains duplicate label/
    ],
    ['{% tabs id="one" %}\n{% tab label="Open" %}\n{% /tabs %}', /article\.md:3: Tab "Open" must be closed/],
    ['{% tabs id="one" %}', /article\.md:1: Tab group "one" is not closed/],
    ['{% tabs identifier="one" %}', /article\.md:1: Malformed tab directive/]
  ];

  for (const [content, expectedError] of invalidContent) {
    assert.throws(() => transformTabbedContent(content, 'article.md'), expectedError);
  }
});

function createDocsifyTabsFixture(hash = '#/article') {
  const elements = new Map();
  const windowListeners = new Map();
  const documentListeners = new Map();
  const hooks = {};
  const scrolls = [];
  const location = {
    hash,
    get href() {
      return `https://preview.example/${this.hash}`;
    }
  };
  const group = {
    dataset: { tabsId: 'harness' },
    querySelectorAll: () => buttons
  };
  const buttons = ['Local', 'Copilot'].map((label, index) => {
    const attributes = new Map([
      ['aria-controls', `panel-${index}`],
      ['aria-selected', String(index === 0)]
    ]);
    const listeners = new Map();
    const button = {
      dataset: { tabLabel: label },
      listeners,
      getAttribute: name => attributes.get(name),
      setAttribute: (name, value) => { attributes.set(name, value); },
      addEventListener: (type, listener) => { listeners.set(type, listener); },
      closest: () => group
    };
    const panel = {
      hidden: index !== 0,
      getAttribute: () => `tab-${index}`
    };
    const anchorId = `${label.toLowerCase()}-section`;
    const anchor = {
      closest: () => panel,
      scrollIntoView: () => { scrolls.push(anchorId); }
    };
    elements.set(`tab-${index}`, button);
    elements.set(`panel-${index}`, panel);
    elements.set(anchorId, anchor);
    return button;
  });
  elements.set('shared-section', { closest: () => null });
  class Element { }
  const context = {
    module: { exports: {} },
    URLSearchParams,
    Element,
    window: {
      location,
      addEventListener: (type, listener) => { windowListeners.set(type, listener); }
    },
    document: {
      getElementById: id => elements.get(id),
      querySelectorAll: () => [group],
      addEventListener: (type, listener) => { documentListeners.set(type, listener); }
    }
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'tabs.js'), 'utf8'), context);
  context.module.exports.createDocsifyTabsPlugin()({
    beforeEach: callback => { hooks.beforeEach = callback; },
    afterEach: callback => { hooks.afterEach = callback; },
    doneEach: callback => { hooks.doneEach = callback; }
  }, { route: { file: 'article.md' } });
  const source = [
    '{% tabs id="harness" %}',
    '{% tab label="Local" %}',
    'Local content.',
    '{% /tab %}',
    '{% tab label="Copilot" %}',
    'Copilot content.',
    '{% /tab %}',
    '{% /tabs %}'
  ].join('\n');
  hooks.beforeEach(source);
  hooks.doneEach();

  return {
    scrolls,
    selected: () => buttons.find(button => button.getAttribute('aria-selected') === 'true').dataset.tabLabel,
    select: label => buttons.find(button => button.dataset.tabLabel === label).listeners.get('click')(),
    navigate: hash => {
      location.hash = hash;
      windowListeners.get('hashchange')?.();
    },
    clickCurrentAnchor: (options = {}, linkOptions = {}) => {
      const link = Object.assign(new Element(), {
        href: location.href,
        target: '',
        hasAttribute: () => false,
        closest() { return this; }
      }, linkOptions);
      documentListeners.get('click')?.({ button: 0, target: link, ...options });
    }
  };
}

test('Docsify tabs reveal and scroll to initial and changed fragment targets', function () {
  const fixture = createDocsifyTabsFixture('#/article?id=copilot-section');
  assert.equal(fixture.selected(), 'Copilot');
  assert.deepEqual(fixture.scrolls, ['copilot-section']);

  fixture.navigate('#/article?id=local-section');
  assert.equal(fixture.selected(), 'Local');
  assert.deepEqual(fixture.scrolls, ['copilot-section', 'local-section']);

  fixture.navigate('#/article?id=copilot-section');
  assert.equal(fixture.selected(), 'Copilot');

  fixture.navigate('#/article?id=%6cocal-section');
  assert.equal(fixture.selected(), 'Local');
});

test('Docsify tabs preserve selection for shared, missing, and other-page anchors', function () {
  const fixture = createDocsifyTabsFixture();
  fixture.select('Copilot');

  for (const hash of ['#/article?id=shared-section', '#/article?id=missing', '#/article', '#/other?id=local-section']) {
    fixture.navigate(hash);
    assert.equal(fixture.selected(), 'Copilot');
  }
  assert.deepEqual(fixture.scrolls, []);
});

test('Docsify tabs reveal an unchanged fragment on an ordinary link click', function () {
  const fixture = createDocsifyTabsFixture('#/article?id=local-section');
  fixture.select('Copilot');

  for (const options of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    fixture.clickCurrentAnchor(options);
    assert.equal(fixture.selected(), 'Copilot');
  }

  for (const linkOptions of [{ href: 'https://other.example/' }, { target: '_blank' }, { hasAttribute: name => name === 'download' }]) {
    fixture.clickCurrentAnchor({}, linkOptions);
    assert.equal(fixture.selected(), 'Copilot');
  }

  fixture.clickCurrentAnchor();
  assert.equal(fixture.selected(), 'Local');
  assert.deepEqual(fixture.scrolls, ['local-section']);
});

test('validates every current tab group after resolving data variables', function () {
  const root = path.resolve(__dirname, '..');
  const variables = loadDataVariables(path.join(root, 'data', 'variables'));
  let groupCount = 0;

  validateDataVariableReferences(
    root,
    ['docs', 'api', 'remote', 'blogs', 'release-notes', 'remote-release-notes', 'learn'],
    variables,
    function validateTabs(content, source) {
      const result = transformTabbedContent(content, source);
      groupCount += result.groupCount;
    }
  );

  assert.ok(groupCount > 0, 'Expected to validate at least one tab group');
});
