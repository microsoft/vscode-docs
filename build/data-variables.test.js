'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const vm = require('node:vm');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use paths under isolated temporary directories. */

const {
  createBrowserDataVariablesScript,
  loadDataVariables,
  parseVariableFile,
  substituteDataVariables,
  validateDataVariableReferences
} = require('./data-variables');
const { loadJSON } = require('./generate-sidebar');

function withTemporaryDirectory(callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-data-variables-'));
  try {
    return callback(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('parses the supported YAML scalar subset', function () {
  const entries = parseVariableFile([
    '# Product names',
    'plain: Yes!',
    "single: 'It''s quoted: #1'",
    'double: "Line 1\\nLine 2\\t\\"quoted\\""',
    'padded: "  keep spaces  "',
    'with_comment: value # ignored',
    'nested.value: text'
  ].join('\n'), 'variables.yml');

  assert.deepEqual(entries.map(({ key, value }) => ({ key, value })), [
    { key: 'plain', value: 'Yes!' },
    { key: 'single', value: "It's quoted: #1" },
    { key: 'double', value: 'Line 1\nLine 2\t"quoted"' },
    { key: 'padded', value: '  keep spaces  ' },
    { key: 'with_comment', value: 'value' },
    { key: 'nested.value', value: 'text' }
  ]);
});

test('rejects unsupported YAML constructs with source locations', function () {
  const invalidEntries = [
    ['  nested: value', /variables\.yml:1: Indented mappings/],
    ['- item', /variables\.yml:1: Block sequences/],
    ['anchor: &shared', /variables\.yml:1: YAML anchors/],
    ['alias: *shared', /variables\.yml:1: YAML anchors/],
    ['flow: [one, two]', /variables\.yml:1: Flow-style collections/],
    ['block: |', /variables\.yml:1: Block scalar/],
    ['url: https://example.com', /variables\.yml:1: Values that contain ":" must be quoted/],
    ['quote: "unterminated', /variables\.yml:1: Unterminated double-quoted value/],
    ['escape: "\\r"', /variables\.yml:1: Unsupported escape sequence/]
  ];

  for (const [content, expectedError] of invalidEntries) {
    assert.throws(() => parseVariableFile(content, 'variables.yml'), expectedError);
  }
});

test('loads nested variable namespaces and keys with spaces', function () {
  withTemporaryDirectory(function (directory) {
    const variablesDirectory = path.join(directory, 'data', 'variables');
    const nestedDirectory = path.join(variablesDirectory, 'group');
    fs.mkdirSync(nestedDirectory, { recursive: true });
    fs.writeFileSync(path.join(variablesDirectory, 'product.yml'), "name: 'Visual Studio Code'\n");
    fs.writeFileSync(path.join(nestedDirectory, 'terms.yaml'), "next edit suggestions: 'next edit suggestions'\n");

    const variables = loadDataVariables(variablesDirectory);

    assert.equal(variables['variables.product.name'], 'Visual Studio Code');
    assert.equal(variables['variables.group.terms.next edit suggestions'], 'next edit suggestions');
  });
});

test('reports empty values and namespace collisions with variable paths', function () {
  withTemporaryDirectory(function (directory) {
    const variablesDirectory = path.join(directory, 'variables');
    fs.mkdirSync(variablesDirectory);
    fs.writeFileSync(path.join(variablesDirectory, 'empty.yml'), 'name:\n');
    assert.throws(
      () => loadDataVariables(variablesDirectory),
      /empty\.yml:1: Data variable "variables\.empty\.name" has an empty value/
    );
  });

  withTemporaryDirectory(function (directory) {
    const variablesDirectory = path.join(directory, 'variables');
    fs.mkdirSync(variablesDirectory);
    fs.writeFileSync(path.join(variablesDirectory, 'terms.yml'), 'name: value\nname.long: value\n');
    assert.throws(
      () => loadDataVariables(variablesDirectory),
      /Data variable namespace "variables\.terms\.name\.long" collides with "variables\.terms\.name"/
    );
  });
});

test('substitutes variables before Markdown is rendered', function () {
  const variables = Object.freeze({
    'variables.product.name': 'Visual Studio Code',
    'variables.product.short': 'VS Code'
  });
  const content = [
    '---',
    'MetaDescription: Learn about {% data variables.product.name %}.',
    '---',
    '# Get started with {% data variables.product.short %}',
    '',
    '![Screenshot of {% data variables.product.short %}.](image.png)'
  ].join('\n');

  const result = substituteDataVariables(content, variables, 'article.md');

  assert.match(result, /MetaDescription: Learn about Visual Studio Code\./);
  assert.match(result, /# Get started with VS Code/);
  assert.match(result, /!\[Screenshot of VS Code\.\]/);
  assert.doesNotMatch(result, /\{% data/);
});

test('reports missing, object, empty, and malformed directives', function () {
  const variables = {
    'variables.product.empty': '',
    'variables.product.name': 'Visual Studio Code'
  };

  assert.throws(
    () => substituteDataVariables('{% data variables.product.missing %}', variables, 'article.md'),
    /article\.md: Missing data variable "variables\.product\.missing"/
  );
  assert.throws(
    () => substituteDataVariables('{% data variables.product %}', variables, 'article.md'),
    /article\.md: Data variable "variables\.product" resolves to an object/
  );
  assert.throws(
    () => substituteDataVariables('{% data variables.product.empty %}', variables, 'article.md'),
    /article\.md: Data variable "variables\.product\.empty" resolves to an empty value/
  );
  assert.throws(
    () => substituteDataVariables('{% data variables.product.name', variables, 'article.md'),
    /article\.md: Malformed data variable directive/
  );
});

test('creates a browser-readable frozen variable map', function () {
  const script = createBrowserDataVariablesScript({
    'variables.product.name': 'Visual Studio Code'
  });
  const context = {};

  vm.runInNewContext(script, context);

  assert.equal(context.__VSCODE_DOCS_DATA_VARIABLES__['variables.product.name'], 'Visual Studio Code');
  assert.equal(Object.isFrozen(context.__VSCODE_DOCS_DATA_VARIABLES__), true);
});

test('validates Markdown files and reports reference counts', function () {
  withTemporaryDirectory(function (directory) {
    const docsDirectory = path.join(directory, 'docs');
    fs.mkdirSync(docsDirectory);
    fs.writeFileSync(
      path.join(docsDirectory, 'article.md'),
      '# {% data variables.product.name %}\n\n{% data variables.product.name %}\n'
    );

    const result = validateDataVariableReferences(directory, ['docs'], {
      'variables.product.name': 'Visual Studio Code'
    });

    assert.deepEqual(result, { directiveCount: 2, fileCount: 1 });
  });
});

test('resolves the current repository variables and TOC label', function () {
  const root = path.resolve(__dirname, '..');
  const variables = loadDataVariables(path.join(root, 'data', 'variables'));
  const toc = loadJSON(path.join(root, 'docs', 'extension-docs', 'toc.json'), variables);
  const overview = fs.readFileSync(path.join(root, 'docs', 'getstarted', 'overview.md'), 'utf8');
  const azureSection = toc.find(section => section.name === 'Azure');
  const vscodeForWebTopic = azureSection.topics.find(([, route]) => route === '/docs/azure/vscodeforweb');

  assert.equal(vscodeForWebTopic.at(0), 'VS Code for the Web - Azure');
  assert.doesNotMatch(
    substituteDataVariables(overview, variables, 'docs/getstarted/overview.md'),
    /\{% data/
  );
});
