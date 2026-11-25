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

const SAMPLE_WORKSPACE_SETTINGS = Object.freeze({
  ...WORKSPACE_SETTINGS,
  'chat.disableAIFeatures': false,
  'git.enabled': true,
  'git.autofetch': false
});

function prepareSampleSettings(file, defaults) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaults, null, 2), {flag: 'wx'});
    return defaults;
  }
  const errors = [];
  const settings = parse(fs.readFileSync(file, 'utf8'), errors, {allowTrailingComma: true});
  if (errors.length || !settings || typeof settings !== 'object' || Array.isArray(settings)) {
    throw new Error('Cannot verify the retained sample profile settings.');
  }
  for (const [key, expected] of Object.entries(SAMPLE_WORKSPACE_SETTINGS)) {
    if (Reflect.get(settings, key) !== expected) {
      throw new Error(`Sample profile setting must remain ${JSON.stringify(expected)}: ${key}`);
    }
  }
  return Object.fromEntries(Object.keys(defaults).filter(key => Object.hasOwn(settings, key))
    .map(key => [key, Reflect.get(settings, key)]));
}

function snapshotWorkspace(workspace, entry, environment = 'isolated') {
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
      for (const [key, expected] of Object.entries(environment === 'sample' ? SAMPLE_WORKSPACE_SETTINGS : WORKSPACE_SETTINGS)) {
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

function snapshotSampleFiles(workspace, excludedDirectories = []) {
  const files = Object.create(null);
  let entries = 0;
  let bytes = 0;
  const visit = (directory, prefix = '', depth = 0) => {
    if (depth > 16) throw new Error('The capture sample exceeds the directory-depth limit.');
    for (const name of fs.readdirSync(directory).sort()) {
      if (++entries > 1000) throw new Error('The capture sample exceeds 1000 filesystem entries.');
      const file = path.join(directory, name);
      const relative = `${prefix}${name}`;
      if (relative.length > 240) throw new Error('Sample paths must be at most 240 characters relative to the workspace.');
      const info = fs.lstatSync(file);
      if (info.isSymbolicLink() || !isWithinRoot(workspace, fs.realpathSync(file))) {
        throw new Error('Live-AI samples must not contain links or paths outside the sample.');
      }
      if (depth === 0 && excludedDirectories.includes(name)) {
        if (!info.isDirectory()) throw new Error('An excluded sample path must be a directory, not a file.');
        continue;
      }
      if (info.isDirectory()) {
        visit(file, `${relative}/`, depth + 1);
      } else if (info.isFile()) {
        bytes += info.size;
        if (bytes > 50 * 1024 * 1024) throw new Error('The capture sample exceeds 50 MiB.');
        Reflect.set(files, relative, crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'));
      } else {
        throw new Error('Live-AI samples must contain only regular files and directories.');
      }
    }
  };
  visit(workspace);
  return files;
}

function approvedWorkspaceChanges(before, after, allowed) {
  for (const snapshot of [before, after]) {
    if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot) ||
        Object.keys(snapshot).length > 1000 || Object.entries(snapshot).some(([file, hash]) =>
          !file || file.includes('\\') || file.includes(':') || file.split('/').some(part => !part || part === '.' || part === '..') ||
          typeof hash !== 'string' || !/^[a-f0-9]{64}$/.test(hash))) {
      throw new Error('Invalid live-AI workspace snapshot.');
    }
  }
  const changes = [];
  for (const file of [...new Set([...Object.keys(before), ...Object.keys(after)])].sort()) {
    const previous = Object.hasOwn(before, file) ? Reflect.get(before, file) : null;
    const current = Object.hasOwn(after, file) ? Reflect.get(after, file) : null;
    if (previous !== current) {
      if (!allowed.includes(file)) throw new Error(`Unapproved sample file change: ${file}. No changes were rolled back.`);
      changes.push({file, before: previous, after: current});
    }
  }
  return changes;
}

function acquireCaptureProfile(directory, workspace, channel, captureDirectory, environment = 'isolated') {
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
      schemaVersion: 1, purpose: 'vscode-docs-capture', workspace, channel,
      ...(environment === 'sample' ? {environment} : {})
    }, null, 2), {flag: 'wx'});
  }
  const identity = JSON.parse(fs.readFileSync(marker, 'utf8'));
  if (identity.schemaVersion !== 1 || identity.purpose !== 'vscode-docs-capture' ||
      identity.workspace !== workspace || identity.channel !== channel || (identity.environment || 'isolated') !== environment) {
    throw new Error('Capture profile belongs to a different workspace or product channel, or environment.');
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
  writeResponse(directory, 'readiness-response.json', {token, ready});
}

function writeResponse(directory, name, response) {
  const temporary = path.join(directory, `response-${crypto.randomUUID()}.tmp`);
  fs.writeFileSync(temporary, JSON.stringify(response), {flag: 'wx'});
  try {
    fs.linkSync(temporary, path.join(directory, name));
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

function replyToCaptureCancellation(directory, token) {
  const request = readReadinessRequest(directory);
  const storyboard = JSON.parse(fs.readFileSync(path.join(directory, 'storyboard.json'), 'utf8'));
  const response = JSON.parse(fs.readFileSync(path.join(directory, 'readiness-response.json'), 'utf8'));
  if (storyboard.ai !== 'live-approved' || storyboard.capture?.mode !== 'live-ai' ||
      request.token !== token || Date.now() >= request.expiresAt || response.token !== token || response.ready !== true ||
      fs.existsSync(path.join(directory, 'capture.json'))) {
    throw new Error('Live-AI capture cancellation requires a current, confirmed readiness request.');
  }
  writeResponse(directory, 'capture-cancel.json', {token});
}

function captureCancellationCheck(directory) {
  const request = readReadinessRequest(directory);
  return () => {
    const file = path.join(directory, 'capture-cancel.json');
    if (!fs.existsSync(file)) return;
    const response = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (response.token !== request.token) throw new Error('Invalid capture cancellation token.');
    throw new Error('The human cancelled this capture. Any submitted AI work might still require manual cancellation.');
  };
}

module.exports = {WORKSPACE_SETTINGS, SAMPLE_WORKSPACE_SETTINGS, acquireCaptureProfile, prepareSampleSettings,
  replyToReadiness, snapshotWorkspace, waitForReadiness, snapshotSampleFiles, approvedWorkspaceChanges,
  replyToCaptureCancellation, captureCancellationCheck};
