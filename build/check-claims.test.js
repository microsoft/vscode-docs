'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { checkClaims, collectMarkdownFiles, parseArguments } = require('./check-claims');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary directories. */

function withTemporaryRepository(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-claims-'));
  fs.mkdirSync(path.join(root, 'docs'));
  fs.mkdirSync(path.join(root, 'data', 'variables'), { recursive: true });
  fs.mkdirSync(path.join(root, 'build'));
  fs.writeFileSync(path.join(root, 'data', 'variables', 'product.yml'), 'name: VS Code\n');
  fs.writeFileSync(path.join(root, 'build', 'feature-lifecycle.json'), JSON.stringify({
    features: {
      'preview-feature': { label: 'Preview feature', state: 'preview' }
    }
  }));
  try {
    callback(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('reports broken data variables and unknown lifecycle IDs with source locations', function () {
  withTemporaryRepository(function (root) {
    fs.writeFileSync(path.join(root, 'docs', 'article.md'), [
      '{% data variables.product.missing %}',
      'This is `feature(unknown-feature)`.',
      'This is `feature(preview-feature)`.'
    ].join('\n'));

    const report = checkClaims(root, ['docs'], { sourceRevision: 'test-revision' });

    assert.deepEqual(report.findings.map(({ kind, severity, article, line, message }) => ({
      kind,
      severity,
      article,
      line,
      message
    })), [
      {
        kind: 'claim',
        severity: 'error',
        article: 'docs/article.md',
        line: 1,
        message: 'docs/article.md: Missing data variable "variables.product.missing".'
      },
      {
        kind: 'lifecycle',
        severity: 'error',
        article: 'docs/article.md',
        line: 2,
        message: 'Unknown feature lifecycle ID "unknown-feature".'
      }
    ]);
    assert.ok(report.findings.every(finding =>
      finding.sourceRevision === 'test-revision' && finding.status === 'open'));
  });
});

test('marks product claims as unverified until a product manifest is available', function () {
  withTemporaryRepository(function (root) {
    fs.writeFileSync(path.join(root, 'docs', 'article.md'), [
      '`setting(editor.fontSize)`',
      '`kb(workbench.action.showCommands)`',
      '[Run](command:workbench.action.showCommands)',
      '[Try](vscode://tryout/editor.smart-diff)'
    ].join('\n'));

    const report = checkClaims(root, ['docs'], { sourceRevision: 'build-id' });

    assert.deepEqual(report.findings.map(({ severity, line }) => ({ severity, line })), [
      { severity: 'unverified', line: 1 },
      { severity: 'unverified', line: 2 },
      { severity: 'unverified', line: 3 },
      { severity: 'unverified', line: 4 }
    ]);
  });
});

test('reports malformed data directives and deduplicates repeated claims', function () {
  withTemporaryRepository(function (root) {
    fs.writeFileSync(path.join(root, 'docs', 'article.md'), [
      '{% data variables.product.name',
      '`setting(editor.fontSize)`',
      '`setting(editor.fontSize)`'
    ].join('\n'));

    const report = checkClaims(root, ['docs'], { sourceRevision: 'test-revision' });

    assert.equal(report.findings.length, 2);
    assert.match(report.findings[0].message, /Malformed data variable directive/);
    assert.equal(report.findings[1].line, 2);
  });
});

test('restricts requested paths to the repository and accepts repeated file arguments', function () {
  withTemporaryRepository(function (root) {
    const outsideFile = path.join(path.dirname(root), 'outside.md');
    fs.writeFileSync(outsideFile, '# Outside\n');
    try {
      assert.throws(() => collectMarkdownFiles(root, ['../outside.md']), /outside the repository/);
    } finally {
      fs.rmSync(outsideFile);
    }
  });

  assert.deepEqual(parseArguments(['--files', 'docs/a.md', 'docs/b.md']), {
    paths: ['docs/a.md', 'docs/b.md']
  });
});
