'use strict';

const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { checkClaims, parseArguments } = require('./check-claims');
const { assertReviewSource } = require('./review-source');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary repositories. */

function withReviewSource(callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-review-source-'));
  const root = path.join(directory, 'source worktree');
  const environment = {
    ...process.env,
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: path.join(directory, 'empty-gitconfig'),
    GIT_AUTHOR_NAME: 'Fixture',
    GIT_AUTHOR_EMAIL: 'fixture@example.test',
    GIT_COMMITTER_NAME: 'Fixture',
    GIT_COMMITTER_EMAIL: 'fixture@example.test'
  };
  try {
    fs.mkdirSync(root);
    const git = (args, input) => execFileSync('git', args, {
      cwd: root, env: environment, encoding: 'utf8', input, stdio: ['pipe', 'pipe', 'pipe']
    }).trim();
    const write = (file, content) => {
      const target = path.join(root, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content);
    };
    git(['init', '--template=', '--initial-branch=main']);
    write(path.join('docs', 'article.md'), '# Example\n\n`setting(editor.fontSize)`\n\n[Missing](missing.md)\n');
    write(path.join('data', 'variables', 'product.yml'), 'name: Fixture\n');
    write(path.join('build', 'feature-lifecycle.json'), '{"features":{}}');
    write(path.join('build', 'check-claims.js'), 'throw new Error("Source-worktree code must not execute");');
    write('package.json', '{"scripts":{"check-claims":"exit 99"}}');
    write('.gitignore', 'ignored.txt\n');
    const snapshot = () => {
      git(['add', '.']);
      const tree = git(['write-tree']);
      const revision = git(['commit-tree', tree], 'Fixture snapshot\n');
      git(['update-ref', 'HEAD', revision]);
      return revision;
    };
    const revision = snapshot();
    const run = (script, args) => spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
      cwd: directory, env: environment, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024
    });
    callback({ directory, root, revision, git, write, snapshot, run });
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('runs trusted checker and freshness CLI against a different pinned source worktree', function () {
  withReviewSource(({directory, root, revision, git, run}) => {
    const result = run('check-claims.js', [
      '--root', root, '--expected-revision', revision, '--links', '--files', 'docs/article.md'
    ]);
    assert.equal(result.stderr, '');
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.sourceRevision, revision);
    assert.deepEqual(report.scanPaths, ['docs/article.md']);
    assert.deepEqual(report.findings.map(finding => [finding.article, finding.severity]), [
      ['docs/article.md', 'unverified'], ['docs/article.md', 'error']
    ]);
    const file = path.join(directory, 'report.json');
    fs.writeFileSync(file, result.stdout);
    const current = run('findings.js', [
      '--input', file, '--root', root, '--expected-revision', revision, '--check-current', '--format', 'json'
    ]);
    assert.equal(current.stderr, '');
    assert.equal(current.status, 1);
    assert.deepEqual(JSON.parse(current.stdout), report);
    const wrongRoot = run('findings.js', ['--input', file, '--check-current']);
    assert.equal(wrongRoot.status, 1);
    assert.equal(wrongRoot.stdout, '');
    assert.ok(wrongRoot.stderr.trim());

    const linkedRoot = path.join(directory, 'linked worktree');
    git(['worktree', 'add', '--detach', linkedRoot, revision]);
    assert.ok(fs.statSync(path.join(linkedRoot, '.git')).isFile());
    const linked = run('check-claims.js', [
      '--root', linkedRoot, '--expected-revision', revision, '--links', '--files', 'docs/article.md'
    ]);
    assert.equal(linked.status, result.status, linked.stderr);
    assert.equal(linked.stderr, '');
    const linkedReport = JSON.parse(linked.stdout);
    assert.equal(linkedReport.sourceRevision, report.sourceRevision);
    assert.equal(linkedReport.inputHash, report.inputHash);
    assert.deepEqual(linkedReport.findings.map(finding => finding.id), report.findings.map(finding => finding.id));
  });
});

test('refuses mismatched heads, dirty tracked files, and untracked files without emitting a report', function () {
  withReviewSource(({root, revision, write, run}) => {
    const args = ['--root', root, '--expected-revision', revision, '--files', 'docs/article.md'];
    const wrongHead = run('check-claims.js', [
      '--root', root, '--expected-revision', '0'.repeat(revision.length), '--files', 'docs/article.md'
    ]);
    assert.equal(wrongHead.status, 1);
    assert.equal(wrongHead.stdout, '');
    assert.match(wrongHead.stderr, /does not match expected revision/);

    write('untracked.txt', 'Keep this file.\n');
    const untracked = run('check-claims.js', args);
    assert.equal(untracked.status, 1);
    assert.equal(untracked.stdout, '');
    assert.match(untracked.stderr, /clean source worktree/);
    assert.equal(fs.readFileSync(path.join(root, 'untracked.txt'), 'utf8'), 'Keep this file.\n');
    fs.rmSync(path.join(root, 'untracked.txt'));

    write(path.join('docs', 'article.md'), '# Edited\n');
    const dirty = run('check-claims.js', args);
    assert.equal(dirty.status, 1);
    assert.equal(dirty.stdout, '');
    assert.match(dirty.stderr, /clean source worktree/);
    const unpinned = run('check-claims.js', ['--root', root, '--files', 'docs/article.md']);
    assert.equal(unpinned.status, 0, unpinned.stderr);
    assert.deepEqual(JSON.parse(unpinned.stdout).findings, []);
  });
});

test('rejects invalid pins and subdirectory roots and does not permit source revision overrides', function () {
  withReviewSource(({root, revision}) => {
    assert.throws(() => assertReviewSource(root, 'HEAD'), /full Git commit hash/);
    assert.throws(() => assertReviewSource(path.join(root, 'docs'), revision), /top level/);
    assert.throws(() => checkClaims(root, ['docs'], {
      expectedRevision: revision, sourceRevision: 'pretend-revision'
    }), /Cannot override sourceRevision/);
  });
  assert.deepEqual(parseArguments(['--root', 'source', '--expected-revision', 'a'.repeat(40), '--files', 'docs/a.md']), {
    root: 'source', expectedRevision: 'a'.repeat(40), paths: ['docs/a.md']
  });
  for (const args of [
    ['--root'], ['--root', 'a', '--root', 'b'], ['--expected-revision', 'HEAD'],
    ['--expected-revision', 'a'.repeat(40), '--expected-revision', 'b'.repeat(40)]
  ]) {
    assert.throws(() => parseArguments(args), /Expected|Specify/);
  }
});

test('uses a supplied root for manifests and rejects root flags on rendering-only calls', function () {
  withReviewSource(({directory, root, revision, run}) => {
    const manifestFile = path.join(directory, 'manifest.json');
    fs.writeFileSync(manifestFile, JSON.stringify({
      schemaVersion: 1,
      product: { channel: 'insiders', version: '1.148.0-insider', revision: 'a'.repeat(40) },
      sources: ['editor','agents'].map(mode => ({
        kind: 'settings', mode, platform: 'win', file: `${mode}.jsonc`, sha256: 'b'.repeat(64),
        entries: { 'editor.fontSize': 14 }
      }))
    }));
    const result = run('check-claims.js', [
      '--root', root, '--expected-revision', revision, '--manifest', manifestFile,
      '--channel', 'insiders', '--files', 'docs/article.md'
    ]);
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.findings[0].productEvidence.status, 'observed');
    const reportFile = path.join(directory, 'report.json');
    fs.writeFileSync(reportFile, result.stdout);
    const current = run('findings.js', [
      '--input', reportFile, '--check-current', '--root', root,
      '--expected-revision', revision, '--manifest', manifestFile
    ]);
    assert.equal(current.status, 0, current.stderr);
    assert.match(current.stdout, /1 unverified/);
    const unusedRoot = run('findings.js', ['--input', reportFile, '--root', root]);
    assert.equal(unusedRoot.status, 1);
    assert.equal(unusedRoot.stdout, '');
    assert.match(unusedRoot.stderr, /only used with --check-current/);
  });
});

test('detects a changed head before publishing a revision-pinned report', function () {
  withReviewSource(({root, revision, write, snapshot}) => {
    let updated = false;
    const options = {
      expectedRevision: revision,
      get manifest() {
        if (!updated) {
          updated = true;
          write(path.join('docs', 'article.md'), '# A different snapshot\n');
          snapshot();
        }
        return undefined;
      }
    };
    assert.throws(() => checkClaims(root, ['docs'], options), /does not match expected revision/);
  });
});
