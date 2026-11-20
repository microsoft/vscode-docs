'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { spawnSync } = require('node:child_process');
const { captureEditor, checkVisibleText, validatePng, validateStoryboard } = require('./capture');
const {renderHighlights} = require('./capture-highlights');

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
  let boundsCalls = 0;
  const zoomLevel = overrides.zoomLevel ?? 2;
  const zoomFactor = overrides.zoomFactor ?? Math.pow(1.2, zoomLevel);
  const locator = {
    waitFor: async () => {},
    click: async () => {},
    fill: async () => {},
    check: async () => {},
    boundingBox: async () => overrides.bounds ? overrides.bounds(++boundsCalls) : {x: 100, y: 100, width: 200, height: 40},
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
        evaluate: async (callback, argument) => {
          if (callback === renderHighlights) {
            if (!overrides.renderHighlights) throw new Error('Missing highlight-renderer fixture.');
            return overrides.renderHighlights(argument);
          }
          return callback({app: {getAppPath: () => appPath, getVersion: () => 'fixture'}}, argument);
        },
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
    assert.equal(result.manifest.highlighted, undefined);
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

test('folder capture requires explicit readiness and preserves cleanup on cancellation or failure', async function () {
  for (const decision of [true, false, 'ready', new Error('Readiness timed out')]) {
    await withOutput(async options => {
      const storyboard = JSON.parse(fs.readFileSync(STORYBOARD, 'utf8'));
      storyboard.fixture.openFolder = true;
      const file = path.join(options.output, 'folder-storyboard.json');
      fs.writeFileSync(file, JSON.stringify(storyboard));
      const fake = fakeApplication();
      fake.confirmReady = async workspace => {
        const state = fake.state();
        assert.equal(state.photographed, false);
        assert.deepEqual(state.launchOptions.args.slice(-3), [workspace, '--goto', path.join(workspace, 'example.js')]);
        assert.deepEqual(fs.readdirSync(workspace), ['example.js']);
        assert.equal(fs.readFileSync(path.join(workspace, 'example.js'), 'utf8'), storyboard.fixture.content);
        if (decision instanceof Error) throw decision;
        return decision;
      };
      const capture = () => captureEditor({...options, storyboard: file}, fake);
      if (decision === true) {
        const result = await capture();
        assert.equal(result.manifest.workspacePreparation.status, 'confirmed');
        assert.equal(result.manifest.approval, 'human-visual-review-required');
        assert.ok(!Object.keys(result.manifest.settings).some(key => key.startsWith('security.workspace.trust')));
      } else {
        await assert.rejects(capture, /preparation was cancelled|Readiness timed out/);
      }
      const run = fs.readdirSync(options.output).find(name => name.startsWith('editor-find-'));
      const directory = path.join(options.output, run);
      const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'capture.json'), 'utf8'));
      assert.equal(manifest.status, decision === true ? 'candidate' : 'failed');
      assert.equal(fake.state().photographed, decision === true);
      assert.ok(fake.state().closed);
      assert.equal(fs.existsSync(path.join(directory, 'runtime')), false);
    });
  }
});

test('folder capture refuses noninteractive CLI input before launching the product', async function () {
  await withOutput(async options => {
    const storyboard = JSON.parse(fs.readFileSync(STORYBOARD, 'utf8'));
    storyboard.fixture.openFolder = true;
    const file = path.join(options.output, 'folder-storyboard.json');
    fs.writeFileSync(file, JSON.stringify(storyboard));
    const result = spawnSync(process.execPath, [
      path.join(__dirname, 'capture.js'), '--storyboard', file,
      '--executable', options.executable, '--revision', REVISION, '--output', options.output
    ], {encoding: 'utf8', timeout: 10000});
    assert.equal(result.status, 1, result.error?.message);
    assert.match(result.stderr, /interactive terminal/);
    assert.ok(!fs.readdirSync(options.output).some(name => name.startsWith('editor-find-')));
  });
});

test('existing workspace capture preserves source files and retains only its dedicated profile', async function () {
  for (const failure of [undefined, 'modified', 'close']) {
    await withOutput(async options => {
      const workspace = path.join(options.output, 'workspace');
      const output = path.join(options.output, 'captures');
      const profile = path.join(options.output, 'profile');
      fs.mkdirSync(workspace);
      fs.mkdirSync(output);
      const storyboard = JSON.parse(fs.readFileSync(STORYBOARD, 'utf8'));
      fs.writeFileSync(path.join(workspace, 'example.js'), storyboard.fixture.content);
      delete storyboard.fixture;
      storyboard.workspace = {entry: 'example.js'};
      const file = path.join(options.output, 'existing-storyboard.json');
      fs.writeFileSync(file, JSON.stringify(storyboard));
      const fake = fakeApplication({closeError: failure === 'close'});
      fake.confirmReady = async selected => {
        assert.equal(selected, workspace);
        assert.equal(fake.state().photographed, false);
        if (failure === 'modified') {
          fs.mkdirSync(path.join(workspace, '.vscode'));
          fs.writeFileSync(path.join(workspace, '.vscode', 'launch.json'), '{}');
        }
        return true;
      };
      const capture = () => captureEditor({...options, output, workspace, captureProfile: profile, storyboard: file}, fake);
      if (failure) {
        await assert.rejects(capture, /configuration files changed|Fixture close failure/);
      } else {
        await capture();
      }
      const run = fs.readdirSync(output).find(name => name.startsWith('editor-find-'));
      const directory = path.join(output, run);
      const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'capture.json'), 'utf8'));
      assert.equal(manifest.status, failure ? 'failed' : 'candidate');
      assert.equal(manifest.workspace.check, failure === 'modified' ? 'failed' : 'unchanged');
      assert.equal(manifest.captureProfile.lockRetained, failure === 'close');
      assert.equal(manifest.settings['chat.mcp.access'], 'none');
      assert.equal(manifest.settings['task.allowAutomaticTasks'], 'off');
      assert.equal(fake.state().launchOptions.env.HOME, path.join(manifest.captureProfile.path, 'home'));
      assert.equal(fake.state().launchOptions.env.USERPROFILE, fake.state().launchOptions.env.HOME);
      assert.ok(fake.state().launchOptions.env.TEMP.startsWith(directory));
      assert.ok(fs.existsSync(path.join(profile, 'home')));
      assert.ok(fs.existsSync(path.join(profile, 'user-data', 'User', 'settings.json')));
      assert.equal(fs.existsSync(path.join(directory, 'runtime')), failure === 'close');
      assert.equal(fs.existsSync(path.join(profile, 'capture.lock')), failure === 'close');
      if (failure === 'modified') {
        assert.equal(fs.readFileSync(path.join(workspace, '.vscode', 'launch.json'), 'utf8'), '{}');
      }
    });
  }
});

test('highlights preserve the raw image, record provenance, and reject failures without a derived asset', async function () {
  for (const failure of [undefined, 'render', 'moved']) {
    await withOutput(async options => {
      const storyboard = JSON.parse(fs.readFileSync(STORYBOARD, 'utf8'));
      storyboard.capture.highlights = {targets: [{target: 'query'}]};
      const file = path.join(options.output, 'highlight-storyboard.json');
      fs.writeFileSync(file, JSON.stringify(storyboard));
      const annotated = pngHeader();
      annotated[32] = 1;
      let rendered = false;
      const fake = fakeApplication({
        bounds: call => ({x: failure === 'moved' ? 100 + call : 100, y: 100, width: 200, height: 40}),
        renderHighlights: async argument => {
          rendered = true;
          assert.equal(argument.strokeWidth, 2);
          assert.ok(Buffer.from(argument.png, 'base64').equals(pngHeader()));
          if (failure === 'render') throw new Error('Highlight encoder fixture failed');
          return {png: annotated.toString('base64'), verification: {allOtherPixelsUnchanged: true, encodedPixelsVerified: true}};
        }
      });
      const capture = () => captureEditor({...options, storyboard: file}, fake);
      if (failure) {
        await assert.rejects(capture, /Highlight encoder fixture failed|targets moved/);
      } else {
        await capture();
      }
      const run = fs.readdirSync(options.output).find(name => name.startsWith('editor-find-'));
      const directory = path.join(options.output, run);
      const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'capture.json'), 'utf8'));
      assert.ok(fs.readFileSync(path.join(directory, 'editor-find.png')).equals(pngHeader()));
      assert.equal(fs.existsSync(path.join(directory, 'editor-find-highlighted.png')), !failure);
      assert.equal(manifest.status, failure ? 'failed' : 'candidate');
      if (!failure) {
        assert.ok(fs.readFileSync(path.join(directory, manifest.highlighted.file)).equals(annotated));
        assert.equal(manifest.highlighted.sourceSha256, manifest.asset.sha256);
        assert.notEqual(manifest.highlighted.sha256, manifest.asset.sha256);
        assert.equal(manifest.highlighted.rectangles[0].target, 'query');
        assert.equal(manifest.highlighted.humanVisualReviewRequired, true);
      }
      assert.equal(rendered, failure !== 'moved');
      assert.equal(fs.existsSync(path.join(directory, 'runtime')), false);
      assert.ok(fake.state().closed);
    });
  }
});
