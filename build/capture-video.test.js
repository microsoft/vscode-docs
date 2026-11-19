'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { analyzeVideoMetadata, assertMotion, jpegDimensions, measureMotion, recordStoryboardVideo, validateVideo } = require('./capture-video');

/* eslint-disable security/detect-non-literal-fs-filename -- All media fixtures use isolated temporary directories. */

const profile = {width: 1920, height: 1080};
const metadata = 'Duration: 00:00:05.00, start: 0.000000\n  Stream #0:0: Video: vp9 (Profile 0), yuv420p, 1920x1080, 25 fps, 25 tbr\n';
const motion = {samples: 21, movingIntervals: 10, intervalCount: 20, movingFraction: 0.5};
const storyboard = require('./storyboards/editor-find.json');

function jpegHeader(width = 1920) {
  const bytes = Buffer.alloc(15);
  bytes.writeUInt16BE(0xffd8, 0);
  bytes.writeUInt16BE(0xffc0, 2);
  bytes.writeUInt16BE(11, 4);
  bytes.writeUInt16BE(1080, 7);
  bytes.writeUInt16BE(width, 9);
  return bytes;
}

function temporaryDirectory(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-video-test-'));
  t.after(() => fs.rmSync(directory, {recursive: true, force: true}));
  return directory;
}

function fakePage(directory, overrides = {}) {
  const state = {recording: false, stopped: false, dryRunClicks: 0, recordedClicks: 0, current: 1, typed: false, findVisible: true, editorFocused: false};
  let onFrame;
  const frame = () => {
    if (state.recording && !overrides.noFrames) {
      onFrame({data: jpegHeader(overrides.frameWidth)});
    }
  };
  const query = {
    fill: async () => { state.current = 1; state.editorFocused = false; },
    pressSequentially: async (text, options) => {
      assert.equal(text, 'total');
      assert.ok(options.delay > 0);
      state.typed = true;
      if (overrides.dryRunError || (overrides.actionError && state.recording)) {
        throw new Error('Typing failed');
      }
      frame();
    }
  };
  const checkbox = {uncheck: async () => {}, check: async () => {
    state.current = overrides.typedMatch ?? 1;
    frame();
  }};
  const next = {click: async () => {
    state.current = state.current % 3 + 1;
    if (state.recording) {
      state.recordedClicks++;
    } else {
      state.dryRunClicks++;
    }
    frame();
  }};
  const close = {click: async () => { state.findVisible = false; state.editorFocused = false; }};
  const editor = {click: async () => { state.editorFocused = true; }};
  editor.first = () => editor;
  const find = {
    getByRole: (role, options) => role === 'textbox' ? query : role === 'checkbox' ? checkbox :
      options.name === 'Close' ? close : next,
    waitFor: async options => assert.equal(state.findVisible, options.state === 'visible')
  };
  const count = {
    innerText: async () => `${state.current} of 3`,
    filter: ({hasText}) => ({waitFor: async () => {
      const text = `${state.current} of 3`;
      assert.ok(typeof hasText === 'string' ? text.includes(hasText) : hasText.test(text));
    }})
  };
  return {
    state,
    page: {
      locator: selector => selector.endsWith('.matchesCount') ? count :
        selector === '.monaco-editor .view-lines' ? editor : find,
      keyboard: {press: async key => {
        if (key === 'Control+Home') assert.ok(state.editorFocused);
        if (key === 'Control+f') state.findVisible = true;
        frame();
      }},
      waitForTimeout: async delay => { assert.ok(delay <= 800); frame(); },
      screencast: {
        start: async options => {
          state.recording = true;
          onFrame = options.onFrame;
          assert.equal(options.path, path.join(directory, 'editor-find.webm'));
          assert.equal(state.dryRunClicks, 3);
          assert.equal(state.findVisible, false);
          assert.equal(state.editorFocused, true);
          fs.writeFileSync(options.path, 'Private partial recording fixture.');
          if (overrides.startError) {
            throw new Error('Recorder start failed');
          }
          frame();
        },
        showActions: async () => {},
        showChapter: async () => frame(),
        stop: async () => {
          state.stopped = true;
          state.recording = false;
          if (overrides.stopError) {
            throw new Error('Finalization failed');
          }
        }
      }
    }
  };
}

test('recording dry-runs navigation, shows real actions, and finalizes before validation', async t => {
  const directory = temporaryDirectory(t);
  const fake = fakePage(directory, {typedMatch: 2});
  let scans = 0;
  const result = await recordStoryboardVideo(fake.page, {}, storyboard, directory, 'unused-unit-test-encoder', async () => { scans++; }, {
    validateVideo: async () => {
      assert.ok(fake.state.stopped);
      return {durationSeconds: 5, motion};
    }
  });
  assert.equal(result.status, 'candidate');
  assert.equal(result.humanVisualReviewRequired, true);
  assert.equal(fake.state.recordedClicks, 3);
  assert.equal(fake.state.current, 2);
  assert.ok(fake.state.typed);
  assert.ok(scans > result.actions.length);
  assert.ok(result.capturedFrames > 2);
});

test('recording failures stop the recorder and retain the private partial file', async t => {
  for (const [overrides, pattern] of [
    [{startError: true}, /Recorder start failed/],
    [{actionError: true}, /Typing failed/],
    [{actionError: true, stopError: true}, /Typing failed; Finalization failed/],
    [{stopError: true}, /Finalization failed/],
    [{frameWidth: 1333}, /refusing padded or scaled/],
    [{noFrames: true}, /too few real frames/]
  ]) {
    const directory = temporaryDirectory(t);
    const fake = fakePage(directory, overrides);
    await assert.rejects(() => recordStoryboardVideo(fake.page, {}, storyboard, directory, 'unused', async () => {}, {
      validateVideo: async () => { assert.fail('Failed recordings must not reach validation.'); }
    }), pattern);
    assert.ok(fake.state.stopped);
    assert.ok(fs.existsSync(path.join(directory, 'editor-find.webm')));
  }
});

test('a failed storyboard dry run prevents recording entirely', async t => {
  const directory = temporaryDirectory(t);
  const fake = fakePage(directory, {dryRunError: true});
  await assert.rejects(() => recordStoryboardVideo(fake.page, {}, storyboard, directory, 'unused', async () => {}),
    /video.dryRun\[2\].*Typing failed/);
  assert.equal(fake.state.recording, false);
  assert.equal(fake.state.stopped, false);
  assert.equal(fs.existsSync(path.join(directory, 'editor-find.webm')), false);
});

test('validates actual frame dimensions and bounded VP9 stream metadata', () => {
  assert.deepEqual(jpegDimensions(jpegHeader()), profile);
  assert.throws(() => jpegDimensions(Buffer.from('not a JPEG')), /not a JPEG/);
  assert.throws(() => jpegDimensions(jpegHeader().subarray(0, 9)), /no valid dimensions/);
  assert.equal(analyzeVideoMetadata(metadata, 1920, 1080).durationSeconds, 5);
  for (const text of [
    metadata.replace('05.00', '31.00'),
    metadata.replace('1920x1080', '1280x720'),
    metadata.replace('25 fps', '24 fps'),
    metadata.replace('vp9', 'vp8'),
    metadata.replace('00:00:05.00', 'N/A')
  ]) {
    assert.throws(() => analyzeVideoMetadata(text, 1920, 1080), /Video must|Cannot verify/);
  }
});

test('motion checks reject static and insignificant pixel changes rather than relying on encoded hashes', () => {
  const nativeImage = {createFromBuffer: buffer => ({
    isEmpty: () => false,
    resize: () => ({toBitmap: () => Buffer.alloc(160 * 90 * 4, buffer.at(0))})
  })};
  const frames = values => values.map(value => Buffer.from([value]).toString('base64'));
  for (const values of [Array(10).fill(0), [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]]) {
    assert.throws(() => assertMotion(measureMotion({nativeImage}, frames(values))), /too little observed motion/);
  }
  const measured = measureMotion({nativeImage}, frames([0, 255, 0, 255, 0, 255, 0, 255, 0, 255]));
  assert.equal(measured.movingFraction, 1);
  assertMotion(measured);
  assert.throws(() => assertMotion(measureMotion({nativeImage}, frames([0, 255]))), /too little/);
});

test('full decoding verifies every frame and retains only review samples', async t => {
  for (const problem of [undefined, 'decode', 'dimensions', 'count']) {
    const directory = temporaryDirectory(t);
    const file = path.join(directory, 'editor-find.webm');
    fs.writeFileSync(file, Buffer.from('1a45dfa3', 'hex'));
    const dependencies = {spawnSync: (_encoder, args) => {
      assert.ok(args.includes('-xerror'));
      const framesDirectory = path.dirname(args.at(-1));
      const count = problem === 'count' ? 100 : 125;
      for (let index = 0; index < count; index++) {
        const bytes = Buffer.alloc(33);
        Buffer.from('89504e470d0a1a0a', 'hex').copy(bytes);
        bytes.writeUInt32BE(problem === 'dimensions' && index === 1 ? 1280 : 1920, 16);
        bytes.writeUInt32BE(1080, 20);
        fs.writeFileSync(path.join(framesDirectory, `frame-${String(index).padStart(6, '0')}.png`), bytes);
      }
      return {status: problem === 'decode' ? 1 : 0, stderr: problem === 'decode' ? 'corrupt stream' : metadata};
    }};
    const validate = () => validateVideo(file, 'unused', profile, {evaluate: async () => motion}, dependencies);
    if (problem) {
      await assert.rejects(validate, /decoding failed|incorrect dimensions|frame count/);
      assert.equal(fs.existsSync(path.join(directory, 'video-review')), false);
    } else {
      const result = await validate();
      assert.equal(result.decodedFrames, 125);
      assert.equal(result.reviewFrames.length, 4);
      assert.ok(result.reviewFrames.every(frame => fs.existsSync(path.join(directory, frame.file))));
    }
    assert.equal(fs.existsSync(path.join(directory, 'decoded-video')), false);
    assert.ok(fs.existsSync(file));
  }
});
