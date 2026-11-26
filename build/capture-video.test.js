'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const {EventEmitter} = require('node:events');
const { analyzeVideoMetadata, assertLongVideoDecoder, assertMotion, jpegDimensions, measureMotion, recordStoryboardVideo, validateVideo } = require('./capture-video');

/* eslint-disable security/detect-non-literal-fs-filename -- All media fixtures use isolated temporary directories. */

const profile = {width: 1920, height: 1080};
const metadata = 'Duration: 00:00:05.00, start: 0.000000\n  Stream #0:0: Video: vp9 (Profile 0), yuv420p, 1920x1080, 25 fps, 25 tbr\n';
const motion = {samples: 21, movingIntervals: 10, intervalCount: 20, movingFraction: 0.5};
const storyboard = require('./storyboards/editor-find.json');

function jpegHeader(width = 1920, height = 1080) {
  const bytes = Buffer.alloc(15);
  bytes.writeUInt16BE(0xffd8, 0);
  bytes.writeUInt16BE(0xffc0, 2);
  bytes.writeUInt16BE(11, 4);
  bytes.writeUInt16BE(height, 7);
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

function liveRecording(t, overrides = {}) {
  const directory = temporaryDirectory(t);
  const story = structuredClone(storyboard);
  story.ai = 'live-approved';
  delete story.video.reset;
  story.targets = {send: {selector: '#send'}, result: {selector: '#result'}, approval: {selector: '#approval'}};
  story.video.maxDurationSeconds = 4;
  story.video.blockedTargets = ['approval'];
  story.video.steps = [
    {kind: 'click', target: 'send'},
    {kind: 'wait-for', target: 'result', state: 'visible'},
    {kind: 'assert', target: 'result', text: 'Done', match: 'equals'}
  ];
  const events = new EventEmitter();
  const state = {sent: 0, stopped: false, asserted: false};
  const page = {
    setDefaultTimeout: timeout => { assert.equal(timeout, story.video.maxDurationSeconds * 1000); },
    on: (...args) => events.on(...args),
    off: (...args) => events.off(...args),
    locator: selector => selector === '#approval' ? {isVisible: async () => overrides.approval && state.sent > 0} :
      selector === '#send' ? {click: async () => {
        state.sent++;
        if (overrides.dialog) events.emit('dialog', {});
      }} : {
        waitFor: async () => { if (overrides.wait) await overrides.wait; },
        filter: () => ({waitFor: async () => {state.asserted = true;}})
      },
    waitForTimeout: async () => {},
    screencast: {
      start: async options => {
        fs.writeFileSync(options.path, 'Private synthetic recording.');
        options.onFrame({data: jpegHeader()});
        options.onFrame({data: jpegHeader()});
      },
      showActions: async () => {},
      showChapter: async () => {},
      stop: async () => {state.stopped = true;}
    }
  };
  const run = () => recordStoryboardVideo(page, {}, story, directory, 'unused', async () => {
    if (overrides.privacy && state.sent) throw new Error('Privacy check failed');
  }, {validateVideo: async () => ({durationSeconds: overrides.duration ?? 4})});
  return {state, events, run, page, story, directory};
}

test('browser recording uses the native camera while routing workbench and browser actions separately', async t => {
  const fixture = liveRecording(t);
  fixture.story.video.browserUrl = 'http://127.0.0.1:5187/blog';
  fixture.story.targets.result.surface = 'browser';
  fixture.page.screencast.start = async () => {assert.fail('Do not record the main renderer as browser footage.');};
  const events = new EventEmitter();
  let stopped = false, observed = false;
  const camera = {
    on: (...args) => events.on(...args), off: (...args) => events.off(...args),
    setDefaultTimeout: () => {}, waitForTimeout: async () => {},
    locator: () => ({waitFor: async () => {}, filter: () => ({waitFor: async () => {observed = true;}})}),
    screencast: {
      start: async options => {
        assert.deepEqual(options.size, {width: 1280, height: 720});
        fs.writeFileSync(options.path, 'Private browser fixture.');
        options.onFrame({data: jpegHeader(1280, 720)});
        options.onFrame({data: jpegHeader(1280, 720)});
      },
      showActions: async () => {}, showChapter: async () => {}, stop: async () => {stopped = true;}
    }
  };
  const run = dependencies => recordStoryboardVideo(fixture.page, {}, fixture.story, fixture.directory, 'unused', async () => {}, dependencies);
  await assert.rejects(() => run({}), /no main-window fallback/);
  for (const videoProfile of [{width: 1281, height: 720}, {width: 1280, height: 721}]) {
    await assert.rejects(() => run({surfaces: {browser: camera}, videoProfile}), /requires even native dimensions/);
  }
  assert.equal(fixture.state.sent, 0);
  assert.equal(stopped, false);
  const result = await run({surfaces: {browser: camera}, videoProfile: {width: 1280, height: 720},
    validateVideo: async (_file, _encoder, profile) => ({...profile, durationSeconds: 4})});
  assert.equal(result.source, 'integrated-browser');
  assert.equal(fixture.state.sent, 1);
  assert.equal(observed, true);
  assert.equal(stopped, true);
  assert.equal(events.listenerCount('dialog'), 0);
});

test('live-AI video submits once without rehearsal and records its bounded execution', async t => {
  const fixture = liveRecording(t);
  const result = await fixture.run();
  assert.equal(fixture.state.sent, 1);
  assert.equal(fixture.state.asserted, true);
  assert.equal(fixture.state.stopped, true);
  assert.equal(result.execution, 'single-live-run');
  assert.equal(result.maxDurationSeconds, 4);
  assert.equal(fixture.events.listenerCount('dialog'), 0);
});

test('Git demo actions execute only while recording, and interruptions never retry them', async t => {
  for (const outcome of ['candidate', 'approval', 'dialog', 'privacy', 'duration']) {
    const fixture = liveRecording(t, {[outcome]: true, ...(outcome === 'duration' ? {duration: 5} : {})});
    fixture.story.ai = 'none';
    fixture.story.capture.mode = 'git-demo';
    if (outcome === 'candidate') {
      const result = await fixture.run();
      assert.equal(result.execution, 'single-git-run');
      assert.equal(result.maxDurationSeconds, 4);
      assert.equal(result.humanVisualReviewRequired, true);
    } else {
      await assert.rejects(fixture.run, /Unexpected|Privacy|exceeds its approved duration/);
    }
    assert.equal(fixture.state.sent, 1);
    assert.equal(fixture.state.stopped, true);
  }
});

test('Git demo rehearsal executes the same actions without saving or validating any pixels', async t => {
  const fixture = liveRecording(t);
  fixture.story.ai = 'none';
  fixture.story.capture.mode = 'git-demo';
  fixture.story.video.maxDurationSeconds = 60;
  fixture.page.setDefaultTimeout = timeout => assert.equal(timeout, 15000);
  fixture.page.screencast = undefined;
  const result = await recordStoryboardVideo(fixture.page, {}, fixture.story, fixture.directory, undefined, async () => {}, {
    rehearsal: true,
    validateVideo: async () => assert.fail('Rehearsal is not video evidence')
  });
  assert.equal(result.execution, 'single-git-rehearsal');
  assert.equal(fixture.state.sent, 1);
  assert.equal(fixture.state.stopped, false);
  assert.deepEqual(fs.readdirSync(fixture.directory), []);
});

test('whole-window browser recording retains browser actions and dialog guards', async t => {
  const fixture = liveRecording(t);
  fixture.story.video.browserUrl = 'http://127.0.0.1:5187/blog';
  fixture.story.video.browserCamera = 'window';
  fixture.story.targets.result.surface = 'browser';
  const events = new EventEmitter();
  let observed = false;
  const browser = {
    on: (...args) => events.on(...args), off: (...args) => events.off(...args),
    setDefaultTimeout: () => {},
    locator: () => ({
      waitFor: async () => {},
      filter: () => ({waitFor: async () => {
        assert.equal(events.listenerCount('dialog'), 1);
        observed = true;
      }})
    }),
    screencast: {start: async () => {assert.fail('Record the explicit window camera, not only the browser.');}}
  };
  const result = await recordStoryboardVideo(fixture.page, {}, fixture.story, fixture.directory, 'unused', async () => {}, {
    surfaces: {browser}, videoProfile: {width: 1280, height: 720},
    validateVideo: async (_file, _encoder, recordedProfile, _application, options) => {
      assert.deepEqual(recordedProfile, fixture.story.profile);
      assert.equal(options.windowBrowser, true);
      return {durationSeconds: 4};
    }
  });

  assert.equal(result.source, 'integrated-browser-window');
  assert.equal(fixture.state.sent, 1);
  assert.equal(observed, true);
  assert.equal(events.listenerCount('dialog'), 0);
});

test('whole-window browser motion requires visible transitions without rejecting readable holds', () => {
  const sparse = {samples: 80, intervalCount: 79, movingIntervals: 2, movingFraction: 2 / 79};
  assert.throws(() => assertMotion(sparse), /too little observed motion/);
  assert.doesNotThrow(() => assertMotion(sparse, true));
  for (const movingIntervals of [0, 1]) {
    assert.throws(() => assertMotion({...sparse, movingIntervals}, true), /too little observed motion/);
  }
});

test('live-AI prompt, privacy, and duration failures finalize privately without retrying', async t => {
  for (const [overrides, message] of [
    [{approval: true}, /Unexpected prompt/],
    [{dialog: true}, /Unexpected page dialog/],
    [{privacy: true}, /Privacy check failed/],
    [{duration: 4.1}, /exceeds its approved duration/]
  ]) {
    const fixture = liveRecording(t, overrides);
    await assert.rejects(fixture.run, message);
    assert.equal(fixture.state.sent, 1);
    assert.equal(fixture.state.stopped, true);
    assert.equal(fixture.events.listenerCount('dialog'), 0);
  }
});

test('live-AI deadline stops waiting and prevents later scripted actions from continuing', async t => {
  let release;
  const wait = new Promise(resolve => { release = resolve; });
  const fixture = liveRecording(t, {wait});
  await assert.rejects(fixture.run, /exceeded its approved duration/);
  assert.equal(fixture.state.stopped, true);
  release();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(fixture.state.sent, 1);
  assert.equal(fixture.state.asserted, false);
});

test('live-AI recording monitors unexpected prompts while an outcome wait is pending', async t => {
  let release;
  const overrides = {wait: new Promise(resolve => { release = resolve; })};
  const fixture = liveRecording(t, overrides);
  const run = fixture.run();
  const timer = setTimeout(() => { overrides.approval = true; }, 150);
  t.after(() => clearTimeout(timer));
  await assert.rejects(run, /Unexpected prompt/);
  assert.equal(fixture.state.stopped, true);
  release();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(fixture.state.sent, 1);
  assert.equal(fixture.state.asserted, false);
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

test('long-take validation requires explicit full-decoder capabilities', () => {
  assert.throws(() => assertLongVideoDecoder('unused', {spawnSync: () => ({status: 0, stdout: ' ..C scale V->V Scale'})}), /minimal Playwright/);
  assertLongVideoDecoder('unused', {spawnSync: () => ({status: 0, stdout: ' ... fps V->V FPS\n ... showinfo V->V Details'})});
  const longer = metadata.replace('00:00:05.00', '00:01:00.00');
  assert.throws(() => analyzeVideoMetadata(longer, 1920, 1080), /4-30 seconds/);
  assert.equal(analyzeVideoMetadata(longer, 1920, 1080, 120).durationSeconds, 60);
});

test('long-take validation decodes the whole stream but saves only bounded diagnostic frames', async t => {
  const directory = temporaryDirectory(t);
  const file = path.join(directory, 'long.webm');
  fs.writeFileSync(file, Buffer.from('1a45dfa3', 'hex'));
  const longer = metadata.replace('00:00:05.00', '00:01:00.00');
  const result = await validateVideo(file, 'unused', profile, {evaluate: async () => ({...motion, samples: 12})}, {
    maxDurationSeconds: 120,
    spawnSync: (_encoder, args) => {
      if (args.includes('-vsync')) return {status: 1, stderr: "Unrecognized option 'vsync'."};
      if (args.includes('showinfo')) {
        return {status: 0, stderr: Array.from({length: 1500}, (_, index) =>
          `[Parsed_showinfo_0 @ fixture] n: ${index} pts: ${index} pts_time:${index / 25} fmt:yuv420p s:1920x1080`).join('\n')};
      }
      if (args.at(-1) !== '-') {
        assert.ok(args.includes('fps=0.2'));
        const frames = path.dirname(args.at(-1));
        for (let index = 0; index < 12; index++) {
          const bytes = Buffer.alloc(33);
          Buffer.from('89504e470d0a1a0a', 'hex').copy(bytes);
          bytes.writeUInt32BE(1920, 16); bytes.writeUInt32BE(1080, 20);
          fs.writeFileSync(path.join(frames, `frame-${String(index).padStart(6, '0')}.png`), bytes);
        }
      }
      return {status: 0, stderr: longer};
    }
  });
  assert.equal(result.decodedFrames, 1500);
  assert.equal(result.validationMethod, 'ffmpeg-showinfo');
  assert.equal(result.reviewFrames.length, 4);
  assert.ok(result.reviewFrames.every(frame => frame.timeSeconds < 60));
  assert.equal(fs.existsSync(path.join(directory, 'decoded-video')), false);
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
