'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const {SAMPLE_WORKSPACE_SETTINGS, acquireCaptureProfile, prepareSampleSettings,
  replyToReadiness, snapshotWorkspace, waitForReadiness, snapshotSampleFiles, approvedWorkspaceChanges,
  replyToCaptureCancellation, captureCancellationCheck} = require('./capture-preparation');

/* eslint-disable security/detect-non-literal-fs-filename -- These fixtures live in test-owned temporary directories. */

function temporaryDirectory(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-capture-preparation-'));
  t.after(() => fs.rmSync(directory, {recursive: true, force: true}));
  return directory;
}

test('capture profiles retain their data, bind one workspace and channel, and refuse adoption or concurrent use', t => {
  const directory = temporaryDirectory(t);
  const workspace = path.join(directory, 'workspace');
  fs.mkdirSync(workspace);
  const profile = path.join(directory, 'profile');
  const first = acquireCaptureProfile(profile, workspace, 'stable');
  fs.mkdirSync(first.userData);
  fs.writeFileSync(path.join(first.userData, 'retained.txt'), 'Capture-owned data');
  assert.throws(() => acquireCaptureProfile(profile, workspace, 'stable'), /locked/);
  first.release();
  const second = acquireCaptureProfile(profile, workspace, 'stable');
  assert.equal(fs.readFileSync(path.join(second.userData, 'retained.txt'), 'utf8'), 'Capture-owned data');
  second.release();
  assert.throws(() => acquireCaptureProfile(profile, workspace, 'insiders'), /different workspace or product channel/);
  assert.throws(() => acquireCaptureProfile(profile, directory, 'stable'), /separate/);
  assert.throws(() => acquireCaptureProfile(workspace, workspace, 'stable'), /separate/);
  const personal = path.join(directory, 'personal');
  fs.mkdirSync(personal);
  fs.writeFileSync(path.join(personal, 'settings.json'), '{}');
  assert.throws(() => acquireCaptureProfile(personal, workspace, 'stable'), /nonempty/);
  assert.equal(fs.existsSync(path.join(personal, 'capture-profile.json')), false);
  assert.equal(fs.readFileSync(path.join(personal, 'settings.json'), 'utf8'), '{}');
});

test('readiness requires the matching live request and an explicit ready or cancel response', async t => {
  for (const ready of [true, false]) {
    const directory = temporaryDirectory(t);
    const waiting = waitForReadiness(directory, 'Test workspace', 2000);
    const request = JSON.parse(fs.readFileSync(path.join(directory, 'readiness-request.json'), 'utf8'));
    assert.throws(() => replyToReadiness(directory, 'wrong-token', ready), /stale|does not match/);
    assert.equal(fs.existsSync(path.join(directory, 'readiness-response.json')), false);
    replyToReadiness(directory, request.token, ready);
    assert.equal(await waiting, ready);
    assert.throws(() => replyToReadiness(directory, request.token, !ready), /stale|does not match/);
    assert.ok(!fs.readdirSync(directory).some(file => file.endsWith('.tmp')));
  }
  const directory = temporaryDirectory(t);
  await assert.rejects(() => waitForReadiness(directory, 'Test workspace', 0), /timed out/);
  const request = JSON.parse(fs.readFileSync(path.join(directory, 'readiness-request.json'), 'utf8'));
  assert.throws(() => replyToReadiness(directory, request.token, true), /stale/);
});

test('sample profiles retain user settings and cannot be substituted for an isolated profile', t => {
  const directory = temporaryDirectory(t);
  const workspace = path.join(directory, 'workspace');
  fs.mkdirSync(workspace);
  const profile = path.join(directory, 'sample-profile');
  const first = acquireCaptureProfile(profile, workspace, 'stable', undefined, 'sample');
  first.release();
  assert.throws(() => acquireCaptureProfile(profile, workspace, 'stable'), /environment/);
  const second = acquireCaptureProfile(profile, workspace, 'stable', undefined, 'sample');
  second.release();
  const settings = path.join(directory, 'settings.json');
  prepareSampleSettings(settings, SAMPLE_WORKSPACE_SETTINGS);
  const retained = JSON.stringify({...SAMPLE_WORKSPACE_SETTINGS, 'editor.fontSize': 17, 'sample.privateValue': 'do not record'});
  fs.writeFileSync(settings, retained);
  const recorded = prepareSampleSettings(settings, SAMPLE_WORKSPACE_SETTINGS);
  assert.equal(fs.readFileSync(settings, 'utf8'), retained);
  assert.equal(recorded['sample.privateValue'], undefined);
  fs.writeFileSync(settings, JSON.stringify({...SAMPLE_WORKSPACE_SETTINGS, 'task.allowAutomaticTasks': 'on'}));
  assert.throws(() => prepareSampleSettings(settings, SAMPLE_WORKSPACE_SETTINGS), /Sample profile setting/);
});

test('workspace checks detect configuration changes and reject startup-control overrides without editing files', t => {
  const workspace = temporaryDirectory(t);
  fs.writeFileSync(path.join(workspace, 'example.js'), 'console.log("sample");');
  const before = snapshotWorkspace(workspace, 'example.js');
  fs.mkdirSync(path.join(workspace, '.vscode'));
  const launch = path.join(workspace, '.vscode', 'launch.json');
  fs.writeFileSync(launch, '{}');
  assert.notDeepEqual(snapshotWorkspace(workspace, 'example.js'), before);
  assert.equal(fs.readFileSync(launch, 'utf8'), '{}');
  const settings = path.join(workspace, '.vscode', 'settings.json');
  fs.writeFileSync(settings, '{"chat.mcp.access":"all"}');
  assert.throws(() => snapshotWorkspace(workspace, 'example.js'), /overrides a capture startup control/);
  assert.equal(fs.readFileSync(settings, 'utf8'), '{"chat.mcp.access":"all"}');
  fs.writeFileSync(settings, '{broken');
  assert.throws(() => snapshotWorkspace(workspace, 'example.js'), /Cannot verify workspace settings/);
});

test('live-AI file evidence permits only named sample edits and rejects links or unexpected configuration changes', t => {
  const workspace = temporaryDirectory(t);
  fs.writeFileSync(path.join(workspace, 'example.js'), 'Before');
  fs.mkdirSync(path.join(workspace, '.vscode'));
  fs.writeFileSync(path.join(workspace, '.vscode', 'settings.json'), '{}');
  const before = snapshotSampleFiles(workspace);
  fs.writeFileSync(path.join(workspace, 'example.js'), 'After');
  const after = snapshotSampleFiles(workspace);
  assert.deepEqual(approvedWorkspaceChanges(before, after, ['example.js']),
    [{file: 'example.js', before: before['example.js'], after: after['example.js']}]);
  assert.throws(() => approvedWorkspaceChanges(before, after, []), /Unapproved sample file/);
  fs.writeFileSync(path.join(workspace, '.vscode', 'settings.json'), '{"changed":true}');
  assert.throws(() => approvedWorkspaceChanges(before, snapshotSampleFiles(workspace), ['example.js']), /Unapproved sample file/);
  fs.rmSync(path.join(workspace, 'example.js'));
  assert.throws(() => approvedWorkspaceChanges(after, snapshotSampleFiles(workspace), []), /Unapproved sample file/);
  const target = temporaryDirectory(t);
  fs.symlinkSync(target, path.join(workspace, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => snapshotSampleFiles(workspace), /must not contain links/);
});

test('capture cancellation is token-bound and cannot approve an asset or cancel a completed run', async t => {
  const directory = temporaryDirectory(t);
  fs.writeFileSync(path.join(directory, 'storyboard.json'), JSON.stringify({ai: 'live-approved', capture: {mode: 'live-ai'}}));
  const waiting = waitForReadiness(directory, 'Synthetic sample', 2000);
  const request = JSON.parse(fs.readFileSync(path.join(directory, 'readiness-request.json')));
  replyToReadiness(directory, request.token, true);
  await waiting;
  const check = captureCancellationCheck(directory);
  check();
  assert.throws(() => replyToCaptureCancellation(directory, 'wrong'), /current, confirmed/);
  replyToCaptureCancellation(directory, request.token);
  assert.throws(check, /human cancelled/);
  assert.throws(() => replyToCaptureCancellation(directory, request.token), /EEXIST/);
  fs.writeFileSync(path.join(directory, 'capture.json'), '{"status":"failed"}');
  assert.throws(() => replyToCaptureCancellation(directory, request.token), /current, confirmed/);
});

test('approved dependency exclusions do not hide source changes or linked directories', t => {
  const workspace = temporaryDirectory(t);
  fs.mkdirSync(path.join(workspace, 'src'));
  fs.mkdirSync(path.join(workspace, 'node_modules'));
  fs.writeFileSync(path.join(workspace, 'src', 'filter.js'), 'Before');
  fs.writeFileSync(path.join(workspace, 'node_modules', 'dependency.js'), 'Dependency');
  const before = snapshotSampleFiles(workspace, ['node_modules']);
  assert.deepEqual(Object.keys(before), ['src/filter.js']);
  fs.writeFileSync(path.join(workspace, 'node_modules', 'dependency.js'), 'Not audited');
  fs.writeFileSync(path.join(workspace, 'src', 'filter.js'), 'After');
  const after = snapshotSampleFiles(workspace, ['node_modules']);
  assert.throws(() => approvedWorkspaceChanges(before, after, []), /Unapproved sample/);
  assert.equal(approvedWorkspaceChanges(before, after, ['src/filter.js']).length, 1);
  const target = temporaryDirectory(t);
  fs.symlinkSync(target, path.join(workspace, 'dist'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => snapshotSampleFiles(workspace, ['node_modules', 'dist']), /must not contain links/);
});
