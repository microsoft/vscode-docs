'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

/* eslint-disable security/detect-non-literal-fs-filename -- The runner owns this generated private workspace and runtime. */

const IDENTITY = 'Git Demo <git-demo@example.invalid>';

function prepareGitDemo(runtime, environment) {
  const config = path.join(runtime, 'gitconfig');
  const hooks = path.join(runtime, 'empty-hooks');
  fs.mkdirSync(hooks);
  fs.writeFileSync(config, [
    '[user]', 'name = Git Demo', 'email = git-demo@example.invalid',
    '[init]', 'defaultBranch = main',
    '[commit]', 'gpgSign = false',
    '[tag]', 'gpgSign = false',
    '[core]', 'autocrlf = false', `hooksPath = ${JSON.stringify(hooks.replaceAll('\\', '/'))}`,
    '[protocol]', 'allow = never', ''
  ].join('\n'), {flag: 'wx'});
  Object.assign(environment, {
    GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: config, GIT_TERMINAL_PROMPT: '0'
  });
}

function gitDemoEvidence(demo, commit) {
  if (!/^[a-f0-9]{40}$/.test(commit || '')) throw new Error('Git demo requires a verified commit hash.');
  return {
    commit, commitCount: 1, file: 'README.md',
    contentSha256: crypto.createHash('sha256').update(demo.content).digest('hex'),
    message: demo.commitMessage, author: IDENTITY, committer: IDENTITY, clean: true, remotes: []
  };
}

function verifyGitDemo(workspace, demo, environment, execute = execFileSync) {
  const names = fs.readdirSync(workspace).sort();
  if (JSON.stringify(names) !== JSON.stringify(['.git', 'README.md']) ||
      !fs.lstatSync(path.join(workspace, '.git')).isDirectory() ||
      !fs.lstatSync(path.join(workspace, 'README.md')).isFile() ||
      fs.readFileSync(path.join(workspace, 'README.md'), 'utf8') !== demo.content) {
    throw new Error('Git demo must contain only its local repository and the exact approved README.md.');
  }
  const git = args => execute('git', args, {
    cwd: workspace, env: environment, encoding: 'utf8', windowsHide: true, timeout: 10000, maxBuffer: 1024 * 1024
  });
  const root = git(['rev-parse', '--show-toplevel']).trim();
  const history = git(['log', '-1', '--format=%H%x00%B%x00%an <%ae>%x00%cn <%ce>']).trimEnd().split('\0');
  if (path.resolve(root) !== path.resolve(workspace) ||
      git(['status', '--porcelain=v1', '--untracked-files=all']) !== '' ||
      git(['remote']) !== '' || git(['rev-list', '--all', '--count']).trim() !== '1' ||
      git(['ls-tree', '--name-only', '-rz', 'HEAD']) !== 'README.md\0' ||
      git(['show', 'HEAD:README.md']) !== demo.content || history.length !== 4 ||
      history[1].trimEnd() !== demo.commitMessage || history[2] !== IDENTITY || history[3] !== IDENTITY) {
    throw new Error('Git demo did not produce exactly the approved first local commit, clean worktree, and no remotes.');
  }
  return gitDemoEvidence(demo, history[0]);
}

module.exports = {gitDemoEvidence, prepareGitDemo, verifyGitDemo};
