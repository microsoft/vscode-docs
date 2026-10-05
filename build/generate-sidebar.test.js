'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { loadDataVariables } = require('./data-variables');
const { loadJSON, renderTopics } = require('./generate-sidebar');

test('renders secondary metadata as a normal article link while preserving nested groups', function () {
  const topics = [
    ['Shortcut', '/docs/agents/quickstart', { secondary: true }],
    ['', '', {
      name: 'Agents',
      topics: [
        ['Primary', '/docs/agents/quickstart'],
        ['', '', {
          name: 'More',
          topics: [['Overview', '/docs/agents/overview', { secondary: false }]]
        }]
      ]
    }]
  ];
  assert.equal(renderTopics(topics, ''), [
    '- [Shortcut](/docs/agents/quickstart)',
    '- **Agents**',
    '  - [Primary](/docs/agents/quickstart)',
    '  - **More**',
    '    - [Overview](/docs/agents/overview)',
    ''
  ].join('\n'));
});

test('preserves existing two-item API and Learn topics', function () {
  assert.equal(renderTopics([
    ['First extension', '/api/get-started/your-first-extension'],
    ['Learn', '/learn/overview'],
    ['', '']
  ], '  '), [
    '  - [First extension](/api/get-started/your-first-extension)',
    '  - [Learn](/learn/overview)',
    ''
  ].join('\n'));
});

test('renders all links in the current docs TOC, including secondary shortcuts', function () {
  const root = path.resolve(__dirname, '..');
  const toc = loadJSON(path.join(root, 'docs', 'toc.json'), loadDataVariables(path.join(root, 'data', 'variables')));
  const sidebar = toc.map(section => renderTopics(section.topics, '')).join('');
  assert.equal((sidebar.match(/\[Agents Quickstart\]\(\/docs\/agents\/quickstart\)/g) || []).length, 2);
  assert.equal((sidebar.match(/\[Editor Tutorial\]\(\/docs\/editing\/getting-started\/editor-tutorial\)/g) || []).length, 2);
  assert.match(sidebar, /\*\*Get started\*\*/);
  assert.doesNotMatch(sidebar, /undefined|secondary/);
});
