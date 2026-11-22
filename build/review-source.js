'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { isWithinRoot } = require('./repository-paths');

/* eslint-disable security/detect-non-literal-fs-filename -- Git identifies its own metadata directories; symbolic references are constrained to those directories. */

function assertReviewSource(rootDirectory, expectedRevision) {
  if (typeof expectedRevision !== 'string' || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(expectedRevision)) {
    throw new Error('Expected revision must be a full Git commit hash.');
  }
  const git = args => execFileSync('git', ['--no-optional-locks', '-c', 'core.fsmonitor=false', ...args], {
    cwd: rootDirectory,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 16 * 1024 * 1024
  });
  const topLevel = git(['rev-parse', '--show-toplevel']).trim();
  // eslint-disable-next-line security/detect-non-literal-fs-filename -- These are the caller's root and Git's reported repository root.
  if (fs.realpathSync(topLevel) !== fs.realpathSync(rootDirectory)) {
    throw new Error('Review root must be the top level of the source worktree.');
  }
  const revision = git(['rev-parse', 'HEAD']).trim();
  if (revision !== expectedRevision.toLowerCase()) {
    throw new Error(`Source revision "${revision}" does not match expected revision "${expectedRevision}".`);
  }
  if (git(['status', '--porcelain=v1', '-z', '--untracked-files=all', '--ignore-submodules=none'])) {
    throw new Error('Revision-pinned checks require a clean source worktree, including untracked files. Preserve edits and use a separate worktree.');
  }
  return revision;
}

function resolveSourceRoot(rootDirectory) {
  return path.resolve(rootDirectory || path.join(__dirname, '..'));
}

function createRevisionGuard(rootDirectory) {
  const git = (...args) => execFileSync('git', ['--no-optional-locks', ...args], {
    cwd: rootDirectory, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 10_000, windowsHide: true
  }).trim();
  const identity = () => git('rev-parse', '--path-format=absolute', '--git-dir', '--git-common-dir', 'HEAD');
  const initialIdentity = identity();
  const [gitDirectory, commonDirectory, revision] = initialIdentity.split(/\r?\n/);
  if (!gitDirectory || !commonDirectory || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(revision || '')) {
    throw new Error('Cannot identify Git metadata for this batch.');
  }
  const files = new Map();
  function read(file) {
    let bytes;
    try { bytes = fs.readFileSync(file, 'utf8'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    files.set(file, bytes);
    return bytes;
  }
  let value = read(path.join(gitDirectory, 'HEAD'))?.trim();
  const seen = new Set();
  while (value?.startsWith('ref: ') && !seen.has(value)) {
    seen.add(value);
    const reference = value.slice(5);
    if (!reference.startsWith('refs/heads/') || !isWithinRoot(commonDirectory, path.resolve(commonDirectory, reference))) break;
    value = read(path.join(commonDirectory, reference))?.trim();
    if (value === undefined) {
      value = read(path.join(commonDirectory, 'packed-refs'))?.split(/\r?\n/)
        .find(line => line.endsWith(` ${reference}`))?.split(' ')[0];
    }
  }
  // Reftable and unusual symbolic references use Git itself rather than guessing their storage.
  const direct = value === revision;
  return {
    revision,
    assertCurrent(final = false) {
      if (direct) {
        for (const [file, expected] of files) {
          let actual;
          try { actual = fs.readFileSync(file, 'utf8'); }
          catch (error) { if (error.code !== 'ENOENT') throw error; }
          if (actual !== expected) throw new Error('Stale findings report: Git source identity changed during the check.');
        }
      }
      if ((final && identity() !== initialIdentity) || (!direct && git('rev-parse', 'HEAD') !== revision)) {
        throw new Error('Stale findings report: Git source revision changed during the check.');
      }
    }
  };
}

module.exports = { assertReviewSource, createRevisionGuard, resolveSourceRoot };
