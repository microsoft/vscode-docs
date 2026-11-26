'use strict';

const assert = require('node:assert/strict');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { checkClaims, createClaimChecker, collectMarkdownFiles, parseArguments } = require('./check-claims');
const { assertReportCurrent, formatReport } = require('./findings');

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

test('batched checks retain independent fingerprints and reread content-addressed dependencies', function (t) {
  withTemporaryRepository(root => {
    const articles = ['docs/a.md', 'docs/b.md', 'docs/clean.md'];
    fs.writeFileSync(path.join(root, 'docs', 'a.md'), '[Target](target.md#vs-code)\n`setting(example)`');
    fs.writeFileSync(path.join(root, 'docs', 'b.md'), '[Target](target.md#vs-code)');
    fs.writeFileSync(path.join(root, 'docs', 'clean.md'), '# Clean');
    const target = path.join(root, 'docs', 'target.md');
    fs.writeFileSync(target, '## {% data variables.product.name %}');
    const options = { links: true, sourceRevision: 'batch-fixture' };
    const normalize = ({ generatedAt, findings, ...report }) => ({
      ...report, findings: findings.map(({ firstSeen, lastSeen, ...finding }) => finding)
    });
    const expected = articles.map(article => checkClaims(root, [article], options));
    const checker = createClaimChecker();
    const read = fs.readFileSync;
    let targetReads = 0;
    const instrumented = t.mock.method(fs, 'readFileSync', function (file, ...args) {
      if (file === target) targetReads++;
      return read.call(this, file, ...args);
    });
    let initial;
    try { initial = checker.batch(root, articles, options); }
    finally { instrumented.mock.restore(); }
    assert.deepEqual(initial.map(normalize), expected.map(normalize));
    assert.equal(targetReads, 2, 'Read shared target once, then reread its bytes before returning reports.');
    const oldTime = fs.statSync(target);
    fs.writeFileSync(target, '## Different');
    fs.utimesSync(target, oldTime.atime, oldTime.mtime);
    const changed = checker.batch(root, articles, options);
    assert.throws(() => assertReportCurrent(initial[0], changed[0]), /Stale/);
    assert.throws(() => assertReportCurrent(initial[1], changed[1]), /Stale/);
    assert.doesNotThrow(() => assertReportCurrent(initial[2], changed[2]));
    assert.deepEqual(changed.map(normalize), articles.map(article => normalize(checkClaims(root, [article], options))));
    fs.rmSync(path.join(root, 'docs', 'b.md'));
    const partial = checker.batch(root, articles, options, { settled: true });
    assert.ok(partial[1] instanceof Error);
    assert.doesNotThrow(() => assertReportCurrent(initial[2], partial[2]));
    assert.throws(() => checker.batch(root, articles, options), /ENOENT/);
  });
});

test('batched checks reject source, link, and shared-input changes during a scan', function (t) {
  for (const [file, replacement] of [
    ['docs/a.md', '# Changed article'],
    ['docs/target.md', '## Changed target'],
    ['docs/redirection.json', '[{"from":"/docs/old","to":"/docs/new"}]'],
    ['data/variables/product.yml', 'name: Changed\n'],
    ['build/feature-lifecycle.json', '{"features":{}}']
  ]) withTemporaryRepository(root => {
    fs.writeFileSync(path.join(root, 'docs', 'a.md'), '[Target](target.md#original)');
    fs.writeFileSync(path.join(root, 'docs', 'b.md'), '# Second');
    fs.writeFileSync(path.join(root, 'docs', 'target.md'), '## Original');
    fs.writeFileSync(path.join(root, 'docs', 'redirection.json'), '[]');
    const read = fs.readFileSync;
    let changed = false;
    const instrumented = t.mock.method(fs, 'readFileSync', function (input, ...args) {
      const bytes = read.call(this, input, ...args);
      if (!changed && input === path.join(root, 'docs', 'b.md')) {
        changed = true;
        fs.writeFileSync(path.join(root, file), replacement);
      }
      return bytes;
    });
    try {
      assert.throws(() => createClaimChecker().batch(root, ['docs/a.md', 'docs/b.md'], {
        links: true, sourceRevision: 'batch-fixture'
      }), /Stale findings report: .*changed during the check/);
      assert.equal(changed, true);
    } finally { instrumented.mock.restore(); }
  });
});

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
    assert.ok(report.findings.every(finding =>
      finding.firstSeen === report.generatedAt && finding.lastSeen === report.generatedAt));
    assert.deepEqual(report.scanPaths, ['docs']);
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
      ['observed', 'observed', 'not-observed', 'observed', 'not-observed', 'observed', 'not-covered']);
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

test('detects uncommitted input changes including added files and files without findings', function () {
  withTemporaryRepository(function (root) {
    const article = path.join(root, 'docs', 'article.md');
    const cleanArticle = path.join(root, 'docs', 'clean.md');
    fs.writeFileSync(article, '`setting(editor.fontSize)`');
    fs.writeFileSync(cleanArticle, '# No product claims\n');
    const run = () => checkClaims(root, ['docs'], { sourceRevision: 'same-head' });
    const initial = run();
    assert.doesNotThrow(() => assertReportCurrent(initial, run()));
    assert.equal(initial.findings[0].articleHash, crypto.createHash('sha256').update(fs.readFileSync(article)).digest('hex'));

    fs.appendFileSync(article, '\nNew prose.\n');
    const edited = run();
    assert.equal(initial.findings[0].id, edited.findings[0].id);
    assert.throws(() => assertReportCurrent(initial, edited), /inputHash changed/);

    fs.appendFileSync(cleanArticle, 'More prose.\n');
    const cleanEdited = run();
    assert.throws(() => assertReportCurrent(edited, cleanEdited), /inputHash changed/);

    const newArticle = path.join(root, 'docs', 'new.md');
    fs.writeFileSync(newArticle, '# Added article\n');
    const added = run();
    assert.throws(() => assertReportCurrent(cleanEdited, added), /inputHash changed/);
    fs.rmSync(newArticle);
    assert.throws(() => assertReportCurrent(added, run()), /inputHash changed/);

    fs.writeFileSync(path.join(root, 'data', 'variables', 'product.yml'), 'name: Changed product\n');
    const variablesEdited = run();
    assert.throws(() => assertReportCurrent(cleanEdited, variablesEdited), /inputHash changed/);
    fs.writeFileSync(path.join(root, 'build', 'feature-lifecycle.json'), '{"features":{}}');
    assert.throws(() => assertReportCurrent(variablesEdited, run()), /inputHash changed/);
  });
});

test('accepts explicit formats and renders empty successful scans without annotations', function () {
  assert.equal(parseArguments(['--format', 'console']).format, 'console');
  assert.equal(parseArguments(['--format', 'github']).format, 'github');
  assert.throws(() => parseArguments(['--format', 'html']), /Specify --format/);
  assert.throws(() => parseArguments(['--format', 'json', '--format', 'console']), /Specify --format/);
  withTemporaryRepository(function (root) {
    fs.writeFileSync(path.join(root, 'docs', 'article.md'), '# No claims\n');
    const report = checkClaims(root, ['docs'], { sourceRevision: 'test-revision' });
    assert.equal(formatReport(report, 'github'), '');
    assert.equal(formatReport(report, 'console'), 'Docs claims: 0 error(s), 0 warning(s), 0 unverified.');
  });

});

test('deduplicates equivalent tryout links but retains malformed links as errors', function () {
  withTemporaryRepository(function (root) {
    const command = 'command:workbench.action.onboarding.tryFeature';
    fs.writeFileSync(path.join(root, 'docs', 'article.md'), [
      '`workbench.action.onboarding.tryFeature` is the command ID.',
      `[Try](${command}?%5B%22editor.sample%22%5D)`,
      '[Try](vscode://tryout/editor.sample)',
      '[Try Insiders](vscode-insiders://tryout/editor.sample)',
      `[Invalid](${command}?%5B%22editor.sample%22%2C%22unexpected%22%5D)`,
      '[Invalid URI](vscode-insiders://tryout/editor.sample/extra)'
    ].join('\n'));
    const report = checkClaims(root, ['docs'], { sourceRevision: 'test-revision' });
    assert.equal(report.findings.length, 3);
    assert.equal(report.findings[0].evidence, 'tryout(editor.sample)');
    assert.equal(report.findings[0].line, 2);
    assert.equal(report.findings[0].severity, 'unverified');
    assert.deepEqual(report.findings.slice(1).map(item => [item.line, item.severity]), [[5, 'error'], [6, 'error']]);
    assert.ok(formatReport(report, 'github').includes('::error file=docs/article.md,line=5'));
  });
});
