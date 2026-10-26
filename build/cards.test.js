'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const previewHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const previewScript = previewHtml.match(/<script>([\s\S]*?)<\/script>/)[1];

function createCardLinksFixture(hrefs) {
  const cards = hrefs.map(href => ({
    href,
    getAttribute(name) {
      assert.equal(name, 'href');
      return this.href;
    },
    setAttribute(name, value) {
      assert.equal(name, 'href');
      this.href = value;
    }
  }));
  const context = {
    URL,
    window: { location: { href: 'http://localhost:3000/#/docs/agents/overview' } },
    document: {
      querySelectorAll(selector) {
        assert.equal(selector, '.markdown-section .card-grid a.card[href]');
        return cards;
      }
    },
    vscodeDocsDataVariables: {},
    vscodeDocsTabs: { createDocsifyTabsPlugin() {} },
    __VSCODE_DOCS_DATA_VARIABLES__: {}
  };
  vm.runInNewContext(previewScript, context);
  const plugin = context.window.$docsify.plugins.find(plugin => plugin && plugin.name === 'cardLinks');
  assert.ok(plugin, 'The local preview must register the card link plugin.');
  let render;
  plugin({ doneEach(callback) { render = callback; } });
  return { cards, render };
}

test('routes internal cards through the local preview', function () {
  const { cards, render } = createCardLinksFixture([
    '/docs/agents/quickstart',
    '/api/get-started/your-first-extension.md',
    '/blogs/2026/10/01/example',
    '/learn/agents/overview',
    '/release-notes/v1_100.md',
    '/remote/advancedcontainers/overview',
    '/updates/v1_100'
  ]);

  render();

  assert.deepEqual(cards.map(card => card.href), [
    '#/docs/agents/quickstart',
    '#/api/get-started/your-first-extension',
    '#/blogs/2026/10/01/example',
    '#/learn/agents/overview',
    '#/release-notes/v1_100',
    '#/remote/advancedcontainers/overview',
    '#/release-notes/v1_100'
  ]);
});

test('preserves queries and converts card anchors to Docsify heading IDs', function () {
  const { cards, render } = createCardLinksFixture([
    '/docs/agents/quickstart.md#first-task',
    '/docs/agents/overview.md?mode=preview#choose-how-you-work',
    '/docs/agents/overview.md?mode=preview'
  ]);

  render();
  render();

  assert.deepEqual(cards.map(card => card.href), [
    '#/docs/agents/quickstart?id=first-task',
    '#/docs/agents/overview?mode=preview&id=choose-how-you-work',
    '#/docs/agents/overview?mode=preview'
  ]);
});

test('leaves external links, assets, fragments, and existing preview routes unchanged', function () {
  const hrefs = [
    'https://code.visualstudio.com/docs/agents/overview',
    '//example.com/docs/agents/overview',
    '/images/logo-stable.png',
    '#choose-how-you-work',
    '#/docs/agents/overview',
    './quickstart.md',
    'mailto:example@example.com'
  ];
  const { cards, render } = createCardLinksFixture(hrefs);

  render();

  assert.deepEqual(cards.map(card => card.href), hrefs);
});
