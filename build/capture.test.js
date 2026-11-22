'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { spawnSync } = require('node:child_process');
const { captureEditor, checkVisibleText, validatePng, validateStoryboard } = require('./capture');
const {renderHighlights} = require('./capture-highlights');
const {assertReplayCurrent, inspectProcedure, main: replayMain, replayProcedure, reviewProcedure} = require('./replay');
const {formatReport, main: findingsMain, validateReport} = require('./findings');
const {importFindings, triageFinding, validateAuditFindings} = require('./audit-findings');

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
    click: async () => {
      if (overrides.clickTimeout) throw Object.assign(new Error('Private locator diagnostic'), {name: 'TimeoutError'});
    },
    fill: async () => {},
    check: async () => {},
    boundingBox: async () => overrides.bounds ? overrides.bounds(++boundsCalls) : {x: 100, y: 100, width: 200, height: 40},
    count: async () => overrides.targetCount ?? 1,
    isVisible: async () => overrides.targetVisible ?? true,
    innerText: async () => overrides.text || overrides.assertionText || 'example.js Find total 1 of 3'
  };
  locator.first = () => locator;
  locator.locator = () => locator;
  locator.getByRole = () => locator;
  locator.filter = ({hasText}) => ({
    count: async () => {
      const text = overrides.assertionText || '1 of 3';
      return (typeof hasText === 'string' ? text.includes(hasText) : hasText.test(text)) ? 1 : 0;
    },
    waitFor: async () => {
      const text = overrides.assertionText || '1 of 3';
      if (!(typeof hasText === 'string' ? text.includes(hasText) : hasText.test(text))) {
        throw Object.assign(new Error('Private assertion diagnostic'), {name: 'TimeoutError'});
      }
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
      if (overrides.launchError) throw new Error('Private launch diagnostic');
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
    assert.equal(result.manifest.storyboard.file, 'storyboard.json');
    assert.deepEqual(fs.readFileSync(path.join(result.directory, 'storyboard.json')), fs.readFileSync(STORYBOARD));
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

function reviewedReplay(options) {
  const inspected = inspectProcedure(options);
  const review = reviewProcedure({...options, bindingHash: inspected.bindingHash, attestReviewed: true});
  return {...options, review: review.file};
}

function replayFake(overrides) {
  return {...fakeApplication(overrides), confirmReady: async () => true};
}

test('sample replay retains extension and sign-in storage paths without enabling the same mode for media', async () => {
  await withOutput(async options => {
    const workspace = path.join(options.output, 'sample');
    const output = path.join(options.output, 'reports');
    const captureProfile = path.join(options.output, 'sample-profile');
    fs.mkdirSync(workspace);
    fs.mkdirSync(output);
    fs.writeFileSync(path.join(workspace, 'example.js'), 'Synthetic sample.');
    const storyboard = JSON.parse(fs.readFileSync(STORYBOARD));
    delete storyboard.fixture;
    storyboard.workspace = {entry: 'example.js', environment: 'sample'};
    const file = path.join(options.output, 'sample-storyboard.json');
    fs.writeFileSync(file, JSON.stringify(storyboard));
    const sampleOptions = {...options, storyboard: file, workspace, captureProfile, output};
    await assert.rejects(() => captureEditor(sampleOptions, replayFake()), /instruction replay only/);
    const first = replayFake();
    await captureEditor({...sampleOptions, replay: true}, first);
    const launch = first.state().launchOptions;
    assert.equal(launch.args.includes('--disable-extensions'), false);
    assert.equal(launch.args.includes('--use-inmemory-secretstorage'), false);
    assert.equal(launch.args[launch.args.indexOf('--extensions-dir') + 1], path.join(captureProfile, 'extensions'));
    assert.equal(launch.offline, false);
    for (const key of ['HOME', 'USERPROFILE', 'APPDATA', 'LOCALAPPDATA', 'COPILOT_HOME']) {
      assert.ok(Reflect.get(launch.env, key).startsWith(captureProfile));
    }
    const extensionMarker = path.join(captureProfile, 'extensions', 'retained.txt');
    fs.writeFileSync(extensionMarker, 'Synthetic retained extension state.');
    const settings = path.join(captureProfile, 'user-data', 'User', 'settings.json');
    const preferences = {...JSON.parse(fs.readFileSync(settings)), 'editor.fontSize': 17};
    fs.writeFileSync(settings, JSON.stringify(preferences));
    const second = replayFake();
    const result = await captureEditor({...sampleOptions, replay: true}, second);
    assert.equal(second.state().launchOptions.env.APPDATA, launch.env.APPDATA);
    assert.equal(fs.readFileSync(extensionMarker, 'utf8'), 'Synthetic retained extension state.');
    assert.equal(JSON.parse(fs.readFileSync(settings))['editor.fontSize'], 17);
    assert.equal(result.manifest.settings['editor.fontSize'], undefined);
    assert.equal(result.manifest.environment, 'persistent-sample');
    assert.equal(result.manifest.settings['git.enabled'], true);
    assert.equal(result.manifest.settings['chat.disableAIFeatures'], false);
    assert.equal(result.manifest.settings['chat.mcp.access'], 'none');
    assert.equal(result.manifest.captureProfile.lockRetained, false);
    assert.equal(second.state().photographed, false);
  });
});

test('replay saves source-linked instruction outcomes and distinguishes unobserved claims from passed assertions', async () => {
  await withOutput(async options => {
    const storyboard = JSON.parse(fs.readFileSync(STORYBOARD));
    delete storyboard.video;
    const lines = fs.readFileSync(path.join(__dirname, '..', ...storyboard.article.split('/')), 'utf8').split(/\r?\n/);
    const index = lines.findIndex(line => line.includes('Press `kb(actions.find)`'));
    assert.ok(index > 0);
    const source = {line: index + 1, endLine: index + 1, quote: lines.at(index)};
    storyboard.instructions = {
      setup: 'Open the reviewed text sample without changing Find settings.',
      checks: [
        {source, action: 'Find total in the sample.', expected: 'Three matches.', steps: [6]},
        {source, action: 'Inspect minimap highlighting.', expected: 'Matches appear in the minimap.',
          notChecked: 'This runner does not inspect rendered highlights.'}
      ]
    };
    const file = path.join(options.output, 'article-procedure.json');
    fs.writeFileSync(file, JSON.stringify(storyboard));
    const reviewed = reviewedReplay({...options, storyboard: file});
    const passed = await replayProcedure(reviewed, replayFake());
    const saved = JSON.parse(fs.readFileSync(passed.report.replay.evidence.file));
    assert.deepEqual(saved.instructions, passed.instructions);
    assert.deepEqual(passed.instructions.checks.map(check => check.status), ['passed', 'not-checked']);
    assert.equal(passed.instructions.checks[0].source.line, index + 1);
    assert.deepEqual(passed.instructions.checks[0].observed,
      [{step: 6, target: 'count', assertion: {text: 'of 3', match: 'contains'}, matched: true}]);
    assert.equal(passed.instructions.checks[1].reason, 'This runner does not inspect rendered highlights.');
    assertReplayCurrent(passed.report, {storyboard: file, review: reviewed.review});

    const mismatch = await replayProcedure(reviewed, replayFake({assertionText: 'Changed label'}));
    assert.equal(mismatch.instructions.checks[0].status, 'mismatch');
    assert.equal(mismatch.report.findings[0].line, index + 1);
    const wrongLocation = structuredClone(mismatch.report);
    wrongLocation.findings[0].line = 1;
    assert.throws(() => assertReplayCurrent(wrongLocation, {storyboard: file, review: reviewed.review}),
      /contradicts the saved step evidence/);

    const blocked = replayFake();
    blocked.confirmReady = async () => false;
    const incomplete = await replayProcedure(reviewed, blocked);
    assert.equal(incomplete.instructions.checks[0].status, 'blocked');
    assert.deepEqual(incomplete.instructions.checks[0].observed, []);
    assert.equal(incomplete.instructions.runIssues[0].code, 'readiness-denied');
    assert.equal(blocked.state().photographed, false);

    storyboard.instructions.checks[0].source.quote = 'A quotation that no longer matches the article.';
    fs.writeFileSync(file, JSON.stringify(storyboard));
    assert.throws(() => inspectProcedure({...options, storyboard: file}), /quote does not match the exact article lines/);
  });
});

test('replay passes unchanged assertions without saving pixels and reports label drift with stable identity', async () => {
  await withOutput(async options => {
    const reviewed = reviewedReplay(options);
    const unchanged = replayFake();
    const passed = await replayProcedure(reviewed, unchanged);
    assert.equal(passed.report.replay.status, 'passed');
    assert.deepEqual(passed.report.findings, []);
    assert.equal(unchanged.state().photographed, false);
    assert.ok(unchanged.state().closed);
    const evidence = JSON.parse(fs.readFileSync(passed.report.replay.evidence.file));
    const capture = JSON.parse(fs.readFileSync(evidence.capture.file));
    assert.equal(capture.status, 'passed');
    assert.equal(capture.approval, 'not-a-media-candidate');
    assert.equal(capture.asset, undefined);
    assert.ok(evidence.steps.every(step => step.status === 'passed'));
    assertReplayCurrent(passed.report, {storyboard: options.storyboard, review: reviewed.review});
    const first = await replayProcedure(reviewed, replayFake({assertionText: 'Renamed result label'}));
    const second = await replayProcedure(reviewed, replayFake({assertionText: 'Different result label'}));
    assert.notEqual(first.directory, second.directory);
    assert.equal(first.report.replay.status, 'mismatch');
    assert.equal(first.report.findings[0].id, second.report.findings[0].id);
    const finding = first.report.findings[0];
    assert.equal(finding.replayEvidence.category, 'mismatch');
    assert.equal(finding.replayEvidence.step, 6);
    assert.equal(finding.replayEvidence.target, 'count');
    assert.deepEqual(finding.replayEvidence.expected, {text: 'of 3', match: 'contains'});
    assert.deepEqual(finding.replayEvidence.observed, {state: 'visible', matches: false});
    assert.equal(finding.article, 'docs/editing/codebasics.md');
    assert.equal(first.report.replay.binding.product.revision, REVISION);
    assert.doesNotMatch(JSON.stringify(first.report), /Renamed result label|Private assertion diagnostic/);
    const failed = JSON.parse(fs.readFileSync(first.report.replay.evidence.file));
    assert.equal(failed.status, 'failed');
    assert.equal(failed.steps.at(-1).status, 'failed');
    assert.equal(JSON.parse(fs.readFileSync(failed.capture.file)).status, 'failed');
    assert.match(formatReport(first.report, 'console'), /Docs replay \(mismatch\).*[\s\S]*step 7/);
    assert.match(formatReport(first.report, 'github'), /^::warning /);
    const reporter = spawnSync(process.execPath, [path.join(__dirname, 'findings.js'), '--input', first.reportFile,
      '--check-current', '--storyboard', reviewed.storyboard, '--replay-review', reviewed.review, '--format', 'console'], {encoding: 'utf8'});
    assert.equal(reporter.status, 1, reporter.stderr);
    assert.match(reporter.stdout, /mismatch/);
    const concealed = structuredClone(first.report);
    concealed.findings = [];
    concealed.replay.status = 'passed';
    assert.throws(() => assertReplayCurrent(concealed, {storyboard: reviewed.storyboard, review: reviewed.review}),
      /contradicts the saved step evidence/);
  });
});

test('replay classifies blocked and unsafe runs without claiming documentation drift or leaking diagnostics', async t => {
  t.mock.method(console, 'log', () => {});
  const cases = [
    {overrides: {revision: 'b'.repeat(40)}, category: 'prerequisite', code: 'build-mismatch'},
    {overrides: {quality: 'stable'}, category: 'prerequisite', code: 'build-mismatch'},
    {overrides: {launchError: true}, category: 'environment', code: 'launch-failed'},
    {overrides: {clickTimeout: true}, category: 'environment', code: 'operation-failed'},
    {overrides: {assertionText: 'Wrong', targetCount: 0}, category: 'environment', code: 'operation-failed'},
    {overrides: {assertionText: 'Wrong', targetVisible: false}, category: 'environment', code: 'operation-failed'},
    {overrides: {text: 'user@example.test'}, category: 'privacy', code: 'denied-text'},
    {overrides: {closeError: true}, category: 'cleanup', code: 'process-close-failed'},
    {overrides: {visibilityDuringSteps: 'hidden'}, category: 'environment', code: 'window-not-visible'},
    {overrides: {}, readiness: false, category: 'prerequisite', code: 'readiness-denied'},
    {overrides: {}, executable: 'missing.exe', category: 'prerequisite', code: 'executable-unavailable'}
  ];
  for (const scenario of cases) {
    await withOutput(async options => {
      const reviewed = reviewedReplay(options);
      if (scenario.executable) reviewed.executable = path.join(options.output, scenario.executable);
      const fake = replayFake(scenario.overrides);
      if (scenario.readiness === false) fake.confirmReady = async () => false;
      const result = await replayProcedure(reviewed, fake);
      assert.equal(result.report.replay.status, 'incomplete', scenario.code);
      assert.equal(result.report.findings[0].replayEvidence.category, scenario.category);
      assert.equal(result.report.findings[0].replayEvidence.code, scenario.code);
      assert.ok(result.report.findings.every(finding => finding.severity === 'unverified'));
      assert.equal(fake.state().photographed, false);
      const evidence = fs.readFileSync(result.report.replay.evidence.file, 'utf8');
      assert.doesNotMatch(evidence, /user@example.test|Private .* diagnostic/);
      const captureFile = JSON.parse(evidence).capture?.file;
      if (captureFile) {
        const capture = fs.readFileSync(captureFile, 'utf8');
        assert.doesNotMatch(capture, /user@example.test|Private .* diagnostic/);
        assert.equal(JSON.parse(capture).status, 'failed');
      }
      assert.equal(findingsMain(['--input', result.reportFile, '--format', 'console']), 2);
    });
  }
});

test('replay retains separate cleanup failures and refuses unavailable approved workspaces', async () => {
  await withOutput(async options => {
    const reviewed = reviewedReplay(options);
    const result = await replayProcedure(reviewed, replayFake({assertionText: 'Changed', closeError: true}));
    assert.equal(result.report.replay.status, 'incomplete');
    assert.deepEqual(result.report.findings.map(item => item.replayEvidence.category), ['mismatch', 'cleanup']);
    const storyboard = JSON.parse(fs.readFileSync(STORYBOARD));
    delete storyboard.fixture;
    storyboard.workspace = {entry: 'example.js'};
    const file = path.join(options.output, 'workspace-storyboard.json');
    fs.writeFileSync(file, JSON.stringify(storyboard));
    const workspaceOptions = {...options, storyboard: file, workspace: path.join(options.output, 'absent-workspace'),
      captureProfile: path.join(options.output, 'owned-profile')};
    const output = path.join(options.output, 'reports');
    fs.mkdirSync(output);
    const workspaceReview = reviewedReplay({...workspaceOptions, output});
    const fake = replayFake();
    const blocked = await replayProcedure(workspaceReview, fake);
    assert.equal(blocked.report.replay.status, 'incomplete');
    assert.equal(blocked.report.findings[0].replayEvidence.category, 'prerequisite');
    assert.equal(fake.state().launchOptions, undefined);
  });
});

test('replay preserves failed outcomes when the capture manifest cannot be saved', async t => {
  const writeFile = fs.writeFileSync;
  let parentWritable = true;
  t.mock.method(fs, 'writeFileSync', (file, ...args) => {
    const name = path.basename(file);
    if (name === 'capture.json' || (!parentWritable && ['replay.json', 'findings.json'].includes(name))) {
      throw Object.assign(new Error('Private persistence diagnostic user@example.test'), {code: 'EACCES'});
    }
    return writeFile(file, ...args);
  });
  await withOutput(async options => {
    const reviewed = reviewedReplay(options);
    const fake = replayFake({assertionText: 'Private changed label', closeError: true});
    const result = await replayProcedure(reviewed, fake);
    assert.equal(result.report.replay.status, 'incomplete');
    assert.deepEqual(result.report.findings.map(item => [item.replayEvidence.category, item.replayEvidence.code]), [
      ['mismatch', 'text-mismatch'], ['cleanup', 'process-close-failed'], ['environment', 'capture-manifest-write-failed']
    ]);
    const evidenceText = fs.readFileSync(result.report.replay.evidence.file, 'utf8');
    const evidence = JSON.parse(evidenceText);
    assert.equal(evidence.status, 'failed');
    assert.equal(evidence.steps.length, 7);
    assert.ok(evidence.steps.slice(0, -1).every(step => step.status === 'passed'));
    assert.equal(evidence.steps.at(-1).status, 'failed');
    assert.equal(evidence.steps.at(-1).failure.category, 'mismatch');
    assert.equal(evidence.capture, undefined);
    assert.equal(evidence.captureState.status, 'failed');
    assert.equal(evidence.captureState.runtimeRetained, true);
    assert.deepEqual(evidence.captureState.steps, evidence.steps);
    assert.deepEqual(evidence.captureState.failures, evidence.failures);
    const captureRun = fs.readdirSync(result.directory).find(name => name.startsWith('editor-find-'));
    assert.ok(captureRun);
    assert.equal(fs.existsSync(path.join(result.directory, captureRun, 'capture.json')), false);
    for (const file of [result.reportFile, result.report.replay.review.file, result.report.replay.evidence.file]) {
      assert.ok(fs.statSync(file).isFile());
    }
    assert.doesNotMatch(evidenceText + fs.readFileSync(result.reportFile, 'utf8'),
      /user@example\.test|Private .*diagnostic|Private changed label|Fixture close failure/);
    assert.equal(fake.state().photographed, false);
    validateReport(result.report);
    assertReplayCurrent(result.report, {storyboard: reviewed.storyboard, review: reviewed.review});

    parentWritable = false;
    await assert.rejects(() => replayProcedure(reviewed, replayFake()), error => {
      assert.match(error.message, /Replay failed: could not save complete private replay evidence/);
      assert.doesNotMatch(error.message, /Private persistence diagnostic|user@example\.test/);
      return true;
    });
  });
});

test('replay reviews bind exact inputs and freshness rejects changed storyboard or private evidence', async () => {
  await withOutput(async options => {
    const file = path.join(options.output, 'reviewed-storyboard.json');
    fs.copyFileSync(STORYBOARD, file);
    options = {...options, storyboard: file};
    assert.throws(() => reviewProcedure({...options, attestReviewed: true, bindingHash: '0'.repeat(64)}), /exact inspected/);
    assert.throws(() => reviewProcedure({...options, bindingHash: inspectProcedure(options).bindingHash}), /explicit human/);
    const reviewed = reviewedReplay(options);
    const result = await replayProcedure(reviewed, replayFake());
    const check = () => assertReplayCurrent(result.report, {storyboard: file, review: reviewed.review});
    check();
    const evidence = fs.readFileSync(result.report.replay.evidence.file);
    fs.appendFileSync(result.report.replay.evidence.file, ' ');
    assert.throws(check, /evidence changed/);
    fs.writeFileSync(result.report.replay.evidence.file, evidence);
    const capture = JSON.parse(evidence).capture;
    fs.appendFileSync(capture.file, ' ');
    assert.throws(check, /Capture evidence changed/);
    fs.appendFileSync(file, ' ');
    assert.throws(check, /Stale procedure review/);
    const fake = replayFake();
    await assert.rejects(() => replayProcedure(reviewed, fake), /Stale procedure review/);
    assert.equal(fake.state().launchOptions, undefined);
  });

});

test('replay reports inputs changed during execution as incomplete rather than a successful procedure', async () => {
  await withOutput(async options => {
    const file = path.join(options.output, 'changing-storyboard.json');
    fs.copyFileSync(STORYBOARD, file);
    const reviewed = reviewedReplay({...options, storyboard: file});
    const fake = replayFake();
    fake.confirmReady = async () => {
      fs.appendFileSync(file, ' ');
      return true;
    };
    const result = await replayProcedure(reviewed, fake);
    assert.equal(result.report.replay.status, 'incomplete');
    assert.equal(result.report.findings[0].replayEvidence.code, 'reviewed-inputs-changed');
    assert.equal(JSON.parse(fs.readFileSync(result.report.replay.evidence.file)).status, 'failed');
    assert.equal(fake.state().photographed, false);
  });
});

test('replay findings integrate with hash-bound triage and schema validation', async () => {
  await withOutput(async options => {
    const reviewed = reviewedReplay(options);
    const result = await replayProcedure(reviewed, replayFake({assertionText: 'Changed'}));
    const state = {reports: [], findings: []};
    const stamp = new Date(Date.parse(result.report.generatedAt) + 10).toISOString();
    importFindings(state, result.report, stamp);
    const record = state.findings[0];
    triageFinding(state, {id: record.finding.id, evidenceHash: record.evidenceHash, status: 'dismissed',
      reason: 'Synthetic fixture decision.'}, stamp);
    const refreshed = structuredClone(result.report);
    refreshed.generatedAt = new Date(Date.parse(stamp) + 10).toISOString();
    for (const finding of refreshed.findings) finding.firstSeen = finding.lastSeen = refreshed.generatedAt;
    refreshed.replay.evidence.file = path.join(options.output, 'another-random-run', 'replay.json');
    importFindings(state, refreshed, refreshed.generatedAt);
    assert.equal(state.findings[0].finding.status, 'dismissed', 'Artifact location must not reopen an unchanged observation.');
    const changed = structuredClone(refreshed);
    changed.generatedAt = new Date(Date.parse(refreshed.generatedAt) + 10).toISOString();
    for (const finding of changed.findings) finding.firstSeen = finding.lastSeen = changed.generatedAt;
    changed.findings[0].replayEvidence.expected.text = 'Different reviewed expectation';
    const imported = importFindings(state, changed, changed.generatedAt);
    assert.equal(imported.reopened, 1);
    validateAuditFindings(state.reports, state.findings);
    for (const mutate of [
      report => {report.replay.status = 'passed';},
      report => {report.findings[0].replayEvidence.observed = {text: 'Private UI text'};},
      report => {report.findings[0].replayEvidence.category = 'environment';},
      report => {report.replay.binding.product.revision = 'wrong';},
      report => {report.checks = ['claims', 'replay'];},
      report => {report.schemaVersion = 4;}
    ]) {
      const invalid = structuredClone(result.report);
      mutate(invalid);
      assert.throws(() => validateReport(invalid), /Invalid findings report/, String(mutate));
    }
  });
});

test('replay CLI and missing Playwright produce incomplete reports without launching the product', async t => {
  t.mock.method(console, 'log', () => {});
  await withOutput(async options => {
    const reviewed = reviewedReplay(options);
    const code = await replayMain(['run', '--storyboard', reviewed.storyboard, '--review', reviewed.review,
      '--executable', path.join(options.output, 'not-installed.exe'), '--output', options.output, '--wait-for-ready']);
    assert.equal(code, 2);
    const missing = await replayProcedure(reviewed, {resolvePlaywright: () => {throw new Error('Missing fixture dependency');}});
    assert.equal(missing.report.replay.status, 'incomplete');
    assert.equal(missing.report.findings[0].replayEvidence.code, 'playwright-unavailable');
  });
});
