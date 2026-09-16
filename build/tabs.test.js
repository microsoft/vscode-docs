'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const test = require('node:test');
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

test('validates every current tab group after resolving data variables', function () {
  const root = path.resolve(__dirname, '..');
  const variables = loadDataVariables(path.join(root, 'data', 'variables'));
  let groupCount = 0;
  let tabCount = 0;

  validateDataVariableReferences(
    root,
    ['docs', 'api', 'remote', 'blogs', 'release-notes', 'remote-release-notes', 'learn'],
    variables,
    function validateTabs(content, source) {
      const result = transformTabbedContent(content, source);
      groupCount += result.groupCount;
      tabCount += result.tabCount;
    }
  );

  assert.equal(groupCount, 10);
  assert.equal(tabCount, 24);
});
