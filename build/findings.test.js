'use strict';

const assert = require('node:assert/strict');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { assertReportCurrent, formatReport, validateReport } = require('./findings');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary directories. */

function createReport() {
  const generatedAt = '2026-11-19T15:00:00.000Z';
  return {
    schemaVersion: 3,
    sourceRevision: 'test-revision',
    generatedAt,
    scanPaths: ['docs'],
    inputHash: 'a'.repeat(64),
    findings: ['error', 'warning', 'unverified'].map((severity, index) => {
      const article = 'docs/example.md';
      const evidence = `claim(${index})`;
      return {
        id: crypto.createHash('sha256').update(`claim\0${article}\0${evidence}`).digest('hex'),
        kind: 'claim',
        severity,
        article,
        articleHash: 'b'.repeat(64),
        line: index + 1,
        evidence,
        sourceRevision: 'test-revision',
        status: 'open',
        message: `Review claim ${index}.`,
        firstSeen: generatedAt,
        lastSeen: generatedAt
      };
    })
  };
}

test('formats validated findings as JSON, console diagnostics, and distinct annotation levels', function () {
  const report = createReport();
  assert.deepEqual(JSON.parse(formatReport(report)), report);
  assert.equal(formatReport(report, 'console'), [
    'Docs claims: 1 error(s), 1 warning(s), 1 unverified.',
    'docs/example.md:1 [error, open] Review claim 0.',
    'docs/example.md:2 [warning, open] Review claim 1.',
    'docs/example.md:3 [unverified, open] Review claim 2.'
  ].join('\n'));
  assert.equal(formatReport(report, 'github'), [
    '::error file=docs/example.md,line=1,title=Docs claim (open)::[error] Review claim 0.',
    '::warning file=docs/example.md,line=2,title=Docs claim (open)::[warning] Review claim 1.',
    '::notice file=docs/example.md,line=3,title=Docs claim (open)::[unverified] Review claim 2.'
  ].join('\n'));
  assert.throws(() => formatReport(report, 'unknown'), /Unknown report format/);
});

test('escapes annotation parameters and messages, and prevents terminal control sequences', function () {
  const report = createReport();
  const finding = report.findings[0];
  report.findings = [finding];
  finding.article = 'docs/a,b:c%.md';
  finding.id = crypto.createHash('sha256').update(`claim\0${finding.article}\0${finding.evidence}`).digest('hex');
  finding.message = '100%\r\n::error file=injected.md::injected';
  assert.equal(formatReport(report, 'github'),
    '::error file=docs/a%2Cb%3Ac%25.md,line=1,title=Docs claim (open)::[error] 100%25%0D%0A::error file=injected.md::injected');
  finding.message = '\u001b[31mWarning\nmore';
  const consoleOutput = formatReport(report, 'console');
  assert.ok(consoleOutput.endsWith('\\u001b[31mWarning\\u000amore'));
  assert.equal(consoleOutput.split('\n').length, 2);
});

test('rejects malformed, inconsistent, and legacy reports before rendering', function () {
  const mutations = [
    [report => { report.schemaVersion = 1; }, /schemaVersion/],
    [report => { report.findings[0].line = 0; }, /positive integer/],
    [report => { report.findings[0].article = '../outside.md'; }, /repository-relative/],
    [report => { report.scanPaths = ['C:\\outside']; }, /repository-relative/],
    [report => { report.scanPaths = ['docs', 'docs']; }, /unique/],
    [report => { report.findings[0].articleHash = 'bad'; }, /SHA-256/],
    [report => { report.findings[0].sourceRevision = 'other'; }, /sourceRevision/],
    [report => { report.findings[0].evidence = 'different claim'; }, /finding.id/],
    [report => { report.findings.push(report.findings[0]); }, /duplicate/],
    [report => { report.findings[1].articleHash = 'c'.repeat(64); }, /different articleHash/],
    [report => { report.findings[0].lastSeen = '2026-11-20T15:00:00.000Z'; }, /timestamps are out of order/],
    [report => { report.generatedAt = '2026-02-30T15:00:00.000Z'; }, /ISO UTC/],
    [report => { report.findings[0].unexpected = true; }, /not supported/]
  ];
  for (const [mutate, pattern] of mutations) {
    const report = createReport();
    mutate(report);
    assert.throws(() => formatReport(report), pattern);
  }
});

test('validates product evidence links, mode pairs, and binding/default value shapes', function () {
  const report = createReport();
  report.productManifest = {
    sha256: 'c'.repeat(64),
    product: { channel: 'insiders', version: '1.148.0-insider', revision: 'd'.repeat(40) },
    sources: ['editor', 'agents'].flatMap(mode => [
      { kind: 'settings', mode, platform: 'win', file: `${mode}.jsonc`, sha256: 'e'.repeat(64) },
      { kind: 'keybindings', mode, platform: 'win', file: `${mode}.json`, sha256: 'f'.repeat(64) }
    ])
  };
  report.findings[2].productEvidence = { status: 'observed', matches: [{ source: 0, defaultValue: false }] };
  assert.equal(validateReport(report), report);
  const mutations = [
    [copy => { delete copy.productManifest; }, /requires productManifest/],
    [copy => { copy.productManifest.sources.pop(); }, /Missing agents source/],
    [copy => { copy.productManifest.sources[0].sha256 = 'invalid'; }, /SHA-256/],
    [copy => { copy.findings[2].productEvidence.matches[0].source = 4; }, /source index/],
    [copy => { copy.findings[2].productEvidence.matches = []; }, /contradict status/],
    [copy => { copy.findings[2].productEvidence.status = 'not-observed'; }, /contradict status/],
    [copy => { copy.findings[2].productEvidence.matches[0].source = 1; }, /requires a binding/],
    [copy => { copy.findings[2].productEvidence.matches[0].binding = { key: 'ctrl+k', command: 'test' }; }, /only a defaultValue/]
  ];
  for (const [mutate, pattern] of mutations) {
    const copy = structuredClone(report);
    mutate(copy);
    assert.throws(() => validateReport(copy), pattern);
  }
  report.findings[2].productEvidence.matches = [{ source: 1, binding: { key: 'ctrl+k', command: 'test', when: '!isWeb' } }];
  assert.equal(validateReport(report), report);
  report.findings[2].productEvidence.matches = [{ source: 1, command: 'test.unbound', line: 25 }];
  assert.equal(validateReport(report), report);
  report.findings[2].productEvidence.matches[0].line = 0;
  assert.throws(() => validateReport(report), /positive capture line/);
  report.findings[2].productEvidence.matches[0].line = 25;
  report.findings[2].productEvidence.matches[0].binding = { key: 'ctrl+k', command: 'test' };
  assert.throws(() => validateReport(report), /only command and line/);
  delete report.findings[2].productEvidence.matches[0].binding;
  const changedManifest = structuredClone(report);
  changedManifest.productManifest.sha256 = '9'.repeat(64);
  assert.throws(() => assertReportCurrent(report, changedManifest), /product manifest changed/);
});

test('freshness ignores observation time but rejects source revisions and input changes', function () {
  const saved = createReport();
  const current = structuredClone(saved);
  current.generatedAt = '2026-11-20T15:00:00.000Z';
  for (const finding of current.findings) {
    finding.firstSeen = current.generatedAt;
    finding.lastSeen = current.generatedAt;
  }
  assert.doesNotThrow(() => assertReportCurrent(saved, current));
  current.inputHash = 'f'.repeat(64);
  assert.throws(() => assertReportCurrent(saved, current), /inputHash changed/);
  current.inputHash = saved.inputHash;
  current.sourceRevision = 'different-revision';
  current.findings.forEach(finding => { finding.sourceRevision = current.sourceRevision; });
  assert.throws(() => assertReportCurrent(saved, current), /sourceRevision changed/);
});

test('saved-report CLI validates before output and retains error versus unverified exit codes', function () {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-findings-'));
  try {
    const file = path.join(directory, 'report.json');
    const script = path.join(__dirname, 'findings.js');
    const report = createReport();
    fs.writeFileSync(file, JSON.stringify(report));
    const errors = spawnSync(process.execPath, [script, '--input', file, '--format', 'github'], { encoding: 'utf8' });
    assert.equal(errors.status, 1, errors.stderr);
    assert.equal(errors.stdout.trim(), formatReport(report, 'github'));
    assert.equal(errors.stderr, '');

    report.findings = [report.findings[2]];
    fs.writeFileSync(file, JSON.stringify(report));
    const notices = spawnSync(process.execPath, [script, '--input', file], { encoding: 'utf8' });
    assert.equal(notices.status, 0, notices.stderr);
    assert.match(notices.stdout, /0 error\(s\), 0 warning\(s\), 1 unverified/);

    report.findings[0].line = -1;
    fs.writeFileSync(file, JSON.stringify(report));
    const invalid = spawnSync(process.execPath, [script, '--input', file], { encoding: 'utf8' });
    assert.equal(invalid.status, 1);
    assert.equal(invalid.stdout, '');
    assert.match(invalid.stderr, /positive integer/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('saved-report CLI checks current repository inputs before displaying a report', function () {
  const { checkClaims } = require('./check-claims');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-findings-'));
  try {
    const file = path.join(directory, 'report.json');
    const script = path.join(__dirname, 'findings.js');
    const report = checkClaims(path.resolve(__dirname, '..'), ['CONTRIBUTING.md']);
    fs.writeFileSync(file, JSON.stringify(report));
    const args = [script, '--input', file, '--check-current', '--format', 'json'];
    const current = spawnSync(process.execPath, args, { encoding: 'utf8' });
    assert.equal(current.status, report.findings.some(finding => finding.severity === 'error') ? 1 : 0, current.stderr);
    assert.deepEqual(JSON.parse(current.stdout), report);
    assert.equal(current.stderr, '');

    report.inputHash = '0'.repeat(64);
    fs.writeFileSync(file, JSON.stringify(report));
    const stale = spawnSync(process.execPath, args, { encoding: 'utf8' });
    assert.equal(stale.status, 1);
    assert.equal(stale.stdout, '');
    assert.match(stale.stderr, /Stale findings report: inputHash changed/);

    const unexpectedManifest = spawnSync(process.execPath, [...args, '--manifest', 'not-read.json'], { encoding: 'utf8' });
    assert.equal(unexpectedManifest.status, 1);
    assert.equal(unexpectedManifest.stdout, '');
    assert.match(unexpectedManifest.stderr, /requires --manifest exactly/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
