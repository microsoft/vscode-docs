'use strict';

const assert = require('node:assert/strict');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { checkClaims, collectMarkdownFiles, parseArguments } = require('./check-claims');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary directories. */

function withTemporaryRepository(callback) {
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-claims-'));
  const root = path.join(temporaryDirectory, 'repo');
  try {
    fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
    fs.mkdirSync(path.join(root, 'data', 'variables'), { recursive: true });
    fs.mkdirSync(path.join(root, 'build'));
    fs.writeFileSync(path.join(root, 'data', 'variables', 'product.yml'), 'name: VS Code\n');
    fs.writeFileSync(path.join(root, 'build', 'feature-lifecycle.json'), JSON.stringify({
      features: {
        'preview-feature': { label: 'Preview feature', state: 'preview' }
      }
    }));
    callback(root);
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
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

test('attaches captured settings and keybinding evidence without asserting public availability', function () {
  withTemporaryRepository(function (root) {
    const sources = ['editor', 'agents'].flatMap(mode => [
      {
        kind: 'settings', mode, platform: 'win', file: `${mode}-settings.jsonc`, sha256: 'b'.repeat(64),
        entries: { 'editor.fontSize': mode === 'editor' ? 14 : 16, 'sample.enabled': false }
      },
      {
        kind: 'keybindings', mode, platform: 'win', file: `${mode}-keybindings.json`, sha256: 'c'.repeat(64),
        entries: [{ command: `${mode}.pick`, key: 'ctrl+k', when: '!isWeb' }]
      }
    ]);
    const manifest = path.join(root, 'manifest.json');
    const content = JSON.stringify({
      schemaVersion: 1,
      product: { channel: 'insiders', version: '1.148.0-insider', revision: 'a'.repeat(40) },
      sources
    });
    fs.writeFileSync(manifest, content);
    fs.writeFileSync(path.join(root, 'docs', 'article.md'), [
      '`setting(editor.fontSize)`',
      '`setting(sample.enabled:true)`',
      '`setting(missing.setting)`',
      '`kb(agents.pick)`',
      '`kb(missing.command)`',
      '[Run](command:agents.pick)',
      '[Try](vscode://tryout/example)'
    ].join('\n'));

    const report = checkClaims(root, ['docs'], { sourceRevision: 'test-revision', manifest, channel: 'insiders' });
    assert.deepEqual(report.findings.map(finding => finding.productEvidence.status),
      ['observed', 'observed', 'not-observed', 'observed', 'not-observed', 'not-covered', 'not-covered']);
    assert.ok(report.findings.every(finding => finding.severity === 'unverified'));
    assert.deepEqual(report.findings[0].productEvidence.matches,
      [{ source: 0, defaultValue: 14 }, { source: 2, defaultValue: 16 }]);
    assert.equal(report.findings[1].productEvidence.matches[0].defaultValue, false);
    assert.equal(report.findings[3].productEvidence.matches[0].source, 3);
    assert.equal(report.productManifest.sources[3].mode, 'agents');
    assert.equal(report.productManifest.sha256, crypto.createHash('sha256').update(content).digest('hex'));
    assert.throws(() => checkClaims(root, ['docs'], { manifest, channel: 'stable' }), /does not match/);
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

test('parses manifest options and rejects missing values or ambiguous channels', function () {
  assert.deepEqual(parseArguments(['--files', 'docs/a.md', '--manifest', 'manifest.json', '--channel', 'insiders', '--files', 'docs/b.md']), {
    paths: ['docs/a.md', 'docs/b.md'], manifest: 'manifest.json', channel: 'insiders'
  });
  for (const args of [
    ['--files'],
    ['--manifest'],
    ['--manifest', 'manifest.json'],
    ['--channel', 'invalid'],
    ['--channel', 'stable', '--channel', 'insiders']
  ]) {
    assert.throws(() => parseArguments(args), /Expected|Select --channel|Specify --channel/);
  }
});

test('checker CLI fails on invalid arguments without emitting a success report', function () {
  const result = spawnSync(process.execPath, [path.join(__dirname, 'check-claims.js'), '--files'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.match(result.stderr, /Expected at least one path/);
});
