'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { captureEditor, checkVisibleText, validatePng, validateStoryboard } = require('./capture');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary directories and fake launchers. */

const STORYBOARD = path.join(__dirname, 'storyboards', 'editor-find.json');
const REVISION = 'a'.repeat(40);

function pngHeader(width = 1920, height = 1080) {
  const bytes = Buffer.alloc(33);
  Buffer.from('89504e470d0a1a0a', 'hex').copy(bytes);
  bytes.writeUInt32BE(13, 8);
  bytes.write('IHDR', 12, 'ascii');
  bytes.writeUInt32BE(width, 16);
  bytes.writeUInt32BE(height, 20);
  return bytes;
}

async function withOutput(callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-capture-test-'));
  try {
    const executable = path.join(directory, 'fixture.exe');
    fs.writeFileSync(executable, 'Unit-test placeholder; never executed.');
    await callback({
      executable, revision: REVISION, output: directory, storyboard: STORYBOARD
    });
  } finally {
    fs.rmSync(directory, {recursive: true, force: true});
  }
}

function fakeApplication(overrides = {}) {
  let closed = false;
  let photographed = false;
  let launchOptions;
  const zoomLevel = overrides.zoomLevel ?? 2;
  const zoomFactor = overrides.zoomFactor ?? Math.pow(1.2, zoomLevel);
  const locator = {
    waitFor: async () => {},
    click: async () => {},
    fill: async () => {},
    check: async () => {},
    innerText: async () => overrides.text || 'example.js Find total 1 of 3'
  };
  locator.first = () => locator;
  locator.locator = () => locator;
  locator.getByRole = () => locator;
  locator.filter = ({hasText}) => ({
    waitFor: async () => {
      const text = '1 of 3';
      assert.ok(typeof hasText === 'string' ? text.includes(hasText) : hasText.test(text));
    }
  });
  const page = {
    setDefaultTimeout: () => {},
    locator: () => locator,
    getByRole: () => locator,
    keyboard: {press: async () => {}},
    evaluate: async callback => callback.toString().includes('devicePixelRatio') ? ({
      width: Math.floor(1920 / zoomFactor), height: Math.floor(1080 / zoomFactor),
      devicePixelRatio: zoomFactor, visibility: 'visible', darkModern: true,
      ...overrides.viewport
    }) : (overrides.visibilityDuringSteps || 'visible'),
    waitForFunction: async (_fn, expected) => {
      if (typeof expected === 'number') {
        assert.equal(expected, 3);
      }
    },
    title: async () => 'example.js - Visual Studio Code - Insiders',
    screenshot: async () => { throw new Error('Use native content capture to preserve pixel dimensions at non-default zoom.'); }
  };
  return {
    launch: async options => {
      launchOptions = options;
      const appPath = path.dirname(options.executablePath);
      fs.writeFileSync(path.join(appPath, 'product.json'), JSON.stringify({
        commit: overrides.revision || REVISION, quality: overrides.quality || 'insider'
      }));
      return {
        process: () => ({pid: 12345}),
        evaluate: async callback => callback({
          app: {getAppPath: () => appPath, getVersion: () => 'fixture'}
        }),
        firstWindow: async () => page,
        browserWindow: async () => ({evaluate: async (callback, argument) => callback({
          setContentSize: () => {},
          getContentSize: () => [1920, 1080],
          capturePage: async () => {
            photographed = true;
            return {toPNG: () => overrides.png || pngHeader()};
          },
          webContents: {
            getZoomLevel: () => zoomLevel,
            getZoomFactor: () => zoomFactor
          }
        }, argument)}),
        close: async () => {
          if (overrides.closeError) {
            throw new Error('Fixture close failure');
          }
          closed = true;
        }
      };
    },
    state: () => ({closed, photographed, launchOptions})
  };
}

test('capture runner isolates state, verifies dimensions, and leaves candidates unapproved', async function () {
  await withOutput(async options => {
    const fake = fakeApplication();
    const result = await captureEditor(options, fake);
    const state = fake.state();
    assert.equal(result.manifest.status, 'candidate');
    assert.equal(result.manifest.approval, 'human-visual-review-required');
    assert.equal(result.manifest.execution, 'attended');
    assert.equal(result.manifest.steps.length, 7);
    assert.match(result.manifest.storyboardRunnerSha256, /^[a-f0-9]{64}$/);
    assert.equal(result.manifest.privacy.textScan, 'passed');
    assert.equal(result.manifest.privacy.pixelReview, 'required');
    assert.equal(result.manifest.window.zoomLevel, 2);
    assert.equal(result.manifest.window.zoomFactor, 1.44);
    assert.deepEqual(result.manifest.window.contentSize, [1920, 1080]);
    assert.equal(result.manifest.viewport.width, 1333);
    assert.equal(result.manifest.viewport.height, 750);
    assert.ok(state.closed);
    assert.ok(state.photographed);
    assert.equal(state.launchOptions.offline, true);
    assert.ok(state.launchOptions.args.includes('--disable-extensions'));
    assert.ok(state.launchOptions.args.includes('--force-device-scale-factor=1'));
    assert.ok(state.launchOptions.env.COPILOT_HOME.startsWith(result.directory));
    assert.ok(state.launchOptions.env.USERPROFILE.startsWith(result.directory));
    assert.equal(state.launchOptions.env.NODE_OPTIONS, undefined);
    assert.equal(fs.existsSync(path.join(result.directory, 'runtime')), false);
    assert.equal(fs.existsSync(path.join(result.directory, 'editor-find.png')), true);
    assert.equal(JSON.parse(fs.readFileSync(path.join(result.directory, 'capture.json'), 'utf8')).status, 'candidate');
  });
});

test('fails explicitly without saving a PNG when identity, viewport, or privacy checks fail', async function () {
  for (const overrides of [
    {revision: 'b'.repeat(40)},
    {viewport: {devicePixelRatio: 1.5}},
    {viewport: {width: 1920, height: 1080, devicePixelRatio: 1}},
    {zoomLevel: 0, zoomFactor: 1},
    {viewport: {width: 1500}},
    {viewport: {visibility: 'hidden'}},
    {visibilityDuringSteps: 'hidden'},
    {viewport: {darkModern: false}},
    {text: 'Example user@example.test'},
    {text: `C: > Users > ${path.basename(os.homedir())} > workspace`},
    {png: pngHeader(1280, 720)}
  ]) {
    await withOutput(async options => {
      const fake = fakeApplication(overrides);
      await assert.rejects(() => captureEditor(options, fake), /Capture failed/);
      const run = fs.readdirSync(options.output).find(name => name.startsWith('editor-find-'));
      assert.ok(run);
      const directory = path.join(options.output, run);
      const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'capture.json'), 'utf8'));
      assert.equal(manifest.status, 'failed');
      assert.ok(manifest.error);
      if (overrides.text) {
        assert.equal(manifest.privacy.textScan, 'failed');
      }
      assert.equal(fs.existsSync(path.join(directory, 'editor-find.png')), false);
      assert.equal(fs.existsSync(path.join(directory, 'runtime')), false);
      assert.ok(fake.state().closed);
    });
  }
});

test('reports cleanup failures and preserves isolated runtime state when the process did not close', async function () {
  await withOutput(async options => {
    const fake = fakeApplication({closeError: true});
    await assert.rejects(() => captureEditor(options, fake), /Capture failed/);
    const run = fs.readdirSync(options.output).find(name => name.startsWith('editor-find-'));
    const directory = path.join(options.output, run);
    const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'capture.json'), 'utf8'));
    assert.equal(manifest.status, 'failed');
    assert.equal(manifest.runtimeRetained, true);
    assert.equal(manifest.processId, 12345);
    assert.match(manifest.cleanupError, /Fixture close failure/);
  });
});

test('refuses repository outputs, AI storyboards, and invalid image headers', async function () {
  await withOutput(async options => {
    const fake = fakeApplication();
    await assert.rejects(() => captureEditor({...options, output: path.resolve(__dirname, '..')}, fake), /private directory outside/);
    assert.equal(fake.state().launchOptions, undefined);
  });
  const storyboard = JSON.parse(fs.readFileSync(STORYBOARD, 'utf8'));
  assert.throws(() => validateStoryboard({...storyboard, ai: 'live-approved'}), /ai must be "none"/);
  assert.throws(() => validateStoryboard({...storyboard, privacy: {denyText: [], humanVisualReviewRequired: false}}), /privacy/);
  assert.throws(() => validatePng(Buffer.from('not a PNG'), 1920, 1080), /PNG/);
  assert.throws(() => checkVisibleText('authorization: Bearer secret', ['Bearer ']), /Privacy check failed/);
  assert.throws(() => checkVisibleText('C: > Users > fixture-user > workspace', ['fixture-user']), /Privacy check failed/);
});

test('allows zoom 1.5 only for explicitly wide content and preserves pixel dimensions', async function () {
  const storyboard = JSON.parse(fs.readFileSync(STORYBOARD, 'utf8'));
  for (const profile of [
    {...storyboard.profile, zoomLevel: 1.5},
    {...storyboard.profile, wideContent: true},
    {...storyboard.profile, zoomLevel: 1.5, wideContent: 'true'}
  ]) {
    assert.throws(() => validateStoryboard({...storyboard, profile}), /zoom level 2 by default|wideContent must be boolean/);
  }
  await withOutput(async options => {
    const wide = {...storyboard, profile: {...storyboard.profile, zoomLevel: 1.5, wideContent: true}};
    const file = path.join(options.output, 'wide-storyboard.json');
    fs.writeFileSync(file, JSON.stringify(wide));
    const result = await captureEditor({...options, storyboard: file}, fakeApplication({zoomLevel: 1.5}));
    assert.equal(result.manifest.status, 'candidate');
    assert.equal(result.manifest.settings['window.zoomLevel'], 1.5);
    assert.equal(result.manifest.profile.wideContent, true);
    assert.equal(result.manifest.window.zoomLevel, 1.5);
    const image = fs.readFileSync(path.join(result.directory, result.manifest.asset.file));
    validatePng(image, 1920, 1080);
  });
});

test('captures a second declarative workflow and pins its declared product channel', async function () {
  const replacement = path.join(__dirname, 'storyboards', 'editor-find-replace.json');
  await withOutput(async options => {
    const fake = fakeApplication();
    const result = await captureEditor({...options, storyboard: replacement}, fake);
    assert.equal(result.manifest.storyboard.id, 'editor-find-replace');
    assert.equal(result.manifest.steps.length, 10);
    assert.equal(result.manifest.asset.file, 'editor-find-replace.png');
    assert.ok(fake.state().launchOptions.args.at(-1).endsWith('totals.txt'));
    await assert.rejects(() => captureEditor({...options, storyboard: replacement, video: true, ffmpeg: options.executable}, fake),
      /does not define video/);
    const stable = JSON.parse(fs.readFileSync(replacement, 'utf8'));
    stable.channel = 'stable';
    const file = path.join(options.output, 'stable.json');
    fs.writeFileSync(file, JSON.stringify(stable));
    await assert.rejects(() => captureEditor({...options, storyboard: file}, fakeApplication()), /requested stable build/);
    const captured = await captureEditor({...options, storyboard: file}, fakeApplication({quality: 'stable'}));
    assert.equal(captured.manifest.product.quality, 'stable');
  });
});

test('opt-in video preserves screenshot behavior and records partial-video failures with cleanup', async function () {
  for (const fail of [false, true]) {
    await withOutput(async options => {
      const fake = fakeApplication();
      fake.recordVideo = async (_page, _app, _storyboard, directory, encoder, checkPrivacy) => {
        assert.equal(encoder, options.executable);
        await checkPrivacy();
        fs.writeFileSync(path.join(directory, 'editor-find.webm'), 'Unit-test media placeholder.');
        if (fail) {
          throw new Error('Video fixture failure');
        }
        return {file: 'editor-find.webm', status: 'candidate'};
      };
      const capture = () => captureEditor({...options, video: true, ffmpeg: options.executable}, fake);
      if (fail) {
        await assert.rejects(capture, /Video fixture failure/);
      } else {
        await capture();
      }
      const run = fs.readdirSync(options.output).find(name => name.startsWith('editor-find-'));
      const directory = path.join(options.output, run);
      const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'capture.json'), 'utf8'));
      assert.equal(manifest.status, fail ? 'failed' : 'candidate');
      assert.equal(manifest.video.status, manifest.status);
      assert.match(manifest.video.runnerSha256, /^[a-f0-9]{64}$/);
      assert.match(manifest.video.encoderSha256, /^[a-f0-9]{64}$/);
      assert.ok(fs.existsSync(path.join(directory, 'editor-find.png')));
      assert.ok(fs.existsSync(path.join(directory, 'editor-find.webm')));
      assert.equal(fs.existsSync(path.join(directory, 'runtime')), false);
      assert.ok(fake.state().closed);
    });
  }
});
