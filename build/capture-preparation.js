'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {parse, printParseErrorCode} = require('jsonc-parser');
const {isWithinRoot} = require('./repository-paths');

/* eslint-disable security/detect-non-literal-fs-filename -- These are explicit private capture paths or read-only workspace inputs. */

const WORKSPACE_SETTINGS = Object.freeze({
  'task.allowAutomaticTasks': 'off',
  'chat.mcp.access': 'none',
  'chat.mcp.autostart': 'never',
  'chat.disableAIFeatures': true,
  'git.enabled': false,
  'typescript.disableAutomaticTypeAcquisition': true
});

function snapshotWorkspace(workspace, entry) {
  const files = {};
  for (const name of new Set([
    entry, '.vscode/settings.json', '.vscode/tasks.json', '.vscode/launch.json', '.vscode/mcp.json', '.mcp.json'
  ])) {
    const file = path.join(workspace, ...name.split('/'));
    if (!fs.existsSync(file)) {
      Reflect.set(files, name, null);
      continue;
    }
    if (!isWithinRoot(workspace, fs.realpathSync(file)) || !fs.statSync(file).isFile()) {
      throw new Error(`Workspace input must be a file inside the selected workspace: ${name}`);
    }
    const bytes = fs.readFileSync(file);
    Reflect.set(files, name, crypto.createHash('sha256').update(bytes).digest('hex'));
    if (name === '.vscode/settings.json') {
      const errors = [];
      const settings = parse(bytes.toString('utf8'), errors, {allowTrailingComma: true});
      if (errors.length || !settings || typeof settings !== 'object' || Array.isArray(settings)) {
        throw new Error(`Cannot verify workspace settings: ${errors.map(error => printParseErrorCode(error.error)).join(', ') || 'expected an object'}`);
      }
      for (const [key, expected] of Object.entries(WORKSPACE_SETTINGS)) {
        if (Object.hasOwn(settings, key) && Reflect.get(settings, key) !== expected) {
          throw new Error(`Workspace setting overrides a capture startup control: ${key}`);
        }
      }
    }
  }
  if (!Reflect.get(files, entry)) {
    throw new Error('The storyboard entry file does not exist in the selected workspace.');
  }
  return files;
}

function acquireCaptureProfile(directory, workspace, channel, captureDirectory) {
  if (!path.isAbsolute(directory)) {
    throw new Error('Supply an absolute dedicated capture-profile path.');
  }
  const root = fs.existsSync(directory) ? fs.realpathSync(directory) :
    path.join(fs.realpathSync(path.dirname(directory)), path.basename(directory));
  for (const protectedDirectory of [workspace, path.resolve(__dirname, '..')]) {
    if (isWithinRoot(root, protectedDirectory) || isWithinRoot(protectedDirectory, root)) {
      throw new Error('The capture profile must be separate from the workspace and repository.');
    }
  }
  if (!fs.existsSync(root)) fs.mkdirSync(root);
  const marker = path.join(root, 'capture-profile.json');
  if (!fs.existsSync(marker)) {
    if (fs.readdirSync(root).length) {
      throw new Error('Refusing to adopt a nonempty directory as a capture profile.');
    }
    fs.writeFileSync(marker, JSON.stringify({
      schemaVersion: 1, purpose: 'vscode-docs-capture', workspace, channel
    }, null, 2), {flag: 'wx'});
  }
  const identity = JSON.parse(fs.readFileSync(marker, 'utf8'));
  if (identity.schemaVersion !== 1 || identity.purpose !== 'vscode-docs-capture' ||
      identity.workspace !== workspace || identity.channel !== channel) {
    throw new Error('Capture profile belongs to a different workspace or product channel.');
  }
  const lock = path.join(root, 'capture.lock');
  try {
    fs.writeFileSync(lock, JSON.stringify({processId: process.pid, captureDirectory, createdAt: new Date().toISOString()}), {flag: 'wx'});
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error('Capture profile is locked. Inspect its owner process before recovering an interrupted run.', {cause: error});
    }
    throw error;
  }
  return {root, userData: path.join(root, 'user-data'), release: () => fs.unlinkSync(lock)};
}

function readReadinessRequest(directory) {
  const request = JSON.parse(fs.readFileSync(path.join(directory, 'readiness-request.json'), 'utf8'));
  if (request.schemaVersion !== 1 || typeof request.token !== 'string' ||
      !/^[a-f0-9]{64}$/.test(request.token) || !Number.isFinite(request.expiresAt)) {
    throw new Error('Invalid capture readiness request.');
  }
  return request;
}

function replyToReadiness(directory, token, ready) {
  const request = readReadinessRequest(directory);
  if (request.token !== token || Date.now() >= request.expiresAt ||
      typeof ready !== 'boolean' || fs.existsSync(path.join(directory, 'capture.json')) ||
      fs.existsSync(path.join(directory, 'readiness-response.json'))) {
    throw new Error('Readiness request is stale or its token does not match.');
  }
  const temporary = path.join(directory, `readiness-${crypto.randomUUID()}.tmp`);
  fs.writeFileSync(temporary, JSON.stringify({token, ready}), {flag: 'wx'});
  try {
    fs.linkSync(temporary, path.join(directory, 'readiness-response.json'));
  } finally {
    fs.unlinkSync(temporary);
  }
}

async function waitForReadiness(directory, workspace, timeoutMs = 300000) {
  const request = {
    schemaVersion: 1, token: crypto.randomBytes(32).toString('hex'), workspace,
    expiresAt: Date.now() + timeoutMs
  };
  fs.writeFileSync(path.join(directory, 'readiness-request.json'), JSON.stringify(request, null, 2), {flag: 'wx'});
  console.log(`Awaiting human readiness confirmation: ${path.join(directory, 'readiness-request.json')}`);
  const responseFile = path.join(directory, 'readiness-response.json');
  while (Date.now() < request.expiresAt) {
    if (fs.existsSync(responseFile)) {
      const response = JSON.parse(fs.readFileSync(responseFile, 'utf8'));
      if (response.token !== request.token || typeof response.ready !== 'boolean') {
        throw new Error('Invalid capture readiness response.');
      }
      return response.ready;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error('Human readiness confirmation timed out.');
}

module.exports = {WORKSPACE_SETTINGS, acquireCaptureProfile, replyToReadiness, snapshotWorkspace, waitForReadiness};
