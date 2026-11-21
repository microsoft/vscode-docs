'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const { loadDataVariables } = require('./data-variables');
const { analyzeDocument } = require('./check-links');

/* eslint-disable security/detect-child-process -- Fixed, read-only Git operations use argument arrays and disable external diff/text conversion. */
/* eslint-disable security/detect-non-literal-fs-filename -- The caller supplies an explicitly approved existing checkout; no source files are written here. */

function git(directory, args) {
  return execFileSync('git', ['--no-optional-locks', '-c', 'core.fsmonitor=false', ...args], {
    cwd: directory, encoding: 'utf8', windowsHide: true, timeout: 10_000,
    maxBuffer: 4_000_000, stdio: ['ignore', 'pipe', 'pipe']
  });
}

function location(directory) {
  const root = fs.realpathSync(directory);
  if (root !== fs.realpathSync(git(root, ['rev-parse', '--show-toplevel']).trim())) throw new Error('Choose the root of an existing authoring checkout.');
  const branch = git(root, ['branch', '--show-current']).trim();
  if (!branch) throw new Error('Choose an existing named branch before drafting. Detached HEAD is not supported.');
  return { root, branch, revision: git(root, ['rev-parse', 'HEAD']).trim() };
}

function changedPaths(directory) {
  return [...new Set([
    ...git(directory, ['diff', '--no-ext-diff', '--no-textconv', '--name-only', '-z', 'HEAD', '--']).split('\0'),
    ...git(directory, ['ls-files', '--others', '--exclude-standard', '-z']).split('\0')
  ].filter(Boolean))].sort();
}

function diff(directory, files, created) {
  const parts = [git(directory, ['diff', '--no-ext-diff', '--no-textconv', 'HEAD', '--', ...files])];
  for (const file of created) {
    try { parts.push(git(directory, ['diff', '--no-index', '--no-ext-diff', '--no-textconv', '--', process.platform === 'win32' ? 'NUL' : os.devNull, file])); }
    catch (error) {
      if (error.status !== 1 || typeof error.stdout !== 'string') throw error;
      parts.push(error.stdout);
    }
  }
  return parts.filter(Boolean).join('\n');
}

function assertExistingMedia(before, after, article, directory) {
  const variables = loadDataVariables(path.join(directory, 'data', 'variables'));
  const previous = analyzeDocument(before, article, variables);
  const current = analyzeDocument(after, article, variables);
  if (previous.problem || current.problem) throw new Error(`Cannot verify draft media references: ${previous.problem || current.problem}`);
  const known = new Set(previous.references.filter(reference => reference.media).map(reference => reference.target));
  if (current.references.some(reference => reference.media && !known.has(reference.target))) {
    throw new Error('The text draft introduced media references that need separate asset approval. Keep new media as TODO comments.');
  }
}

module.exports = { location, changedPaths, diff, assertExistingMedia };
