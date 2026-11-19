'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

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

module.exports = { assertReviewSource, resolveSourceRoot };
