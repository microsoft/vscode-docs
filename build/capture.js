'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { isWithinRoot } = require('./repository-paths');
const { runSteps, validateStoryboard } = require('./storyboard');

/* eslint-disable security/detect-non-literal-fs-filename -- The runner owns a newly created private run directory. */

function validatePng(bytes, width, height) {
  if (!Buffer.isBuffer(bytes) || bytes.length < 33 ||
      !bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) ||
      bytes.readUInt32BE(8) !== 13 || bytes.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('Capture did not produce a PNG with an IHDR header.');
  }
  if (bytes.readUInt32BE(16) !== width || bytes.readUInt32BE(20) !== height) {
    throw new Error(`Capture must be exactly ${width}x${height} pixels; received ${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}.`);
  }
}

function checkVisibleText(text, denied) {
  const normalized = text.toLowerCase();
  for (const value of denied) {
    if (normalized.includes(value.toLowerCase())) {
      throw new Error('Privacy check failed: visible text matches a denied value. Retained private artifacts must not be approved.');
    }
  }
}

function launchEnvironment(runtime) {
  const environment = {};
  for (const key of ['PATH', 'Path', 'SystemRoot', 'SYSTEMROOT', 'WINDIR', 'windir', 'ComSpec', 'COMSPEC']) {
    if (typeof Reflect.get(process.env, key) === 'string') {
      Reflect.set(environment, key, Reflect.get(process.env, key));
    }
  }
  return {
    ...environment,
    USERPROFILE: path.join(runtime, 'home'),
    HOME: path.join(runtime, 'home'),
    APPDATA: path.join(runtime, 'appdata'),
    LOCALAPPDATA: path.join(runtime, 'localappdata'),
    TEMP: path.join(runtime, 'temp'),
    TMP: path.join(runtime, 'temp'),
    COPILOT_HOME: path.join(runtime, 'copilot')
  };
}

async function captureEditor(options, dependencies = {}) {
  const repository = fs.realpathSync(path.resolve(__dirname, '..'));
  const storyboardBytes = fs.readFileSync(options.storyboard);
  const storyboard = validateStoryboard(JSON.parse(storyboardBytes.toString('utf8')));
  const article = fs.realpathSync(path.resolve(repository, ...storyboard.article.split('/')));
  if (!isWithinRoot(repository, article) || !fs.statSync(article).isFile()) {
    throw new Error('Storyboard article must be an existing file inside the repository.');
  }
  if (options.video && !storyboard.video) {
    throw new Error('This storyboard does not define video reset and recording steps.');
  }
  if (process.platform !== storyboard.profile.platform && !dependencies.launch) {
    throw new Error('This capture pilot requires Windows.');
  }
  if (!path.isAbsolute(options.executable) || !/^[a-f0-9]{40}$/i.test(options.revision)) {
    throw new Error('Supply an absolute installed VS Code executable path and its full build revision.');
  }
  if (options.video && (typeof options.ffmpeg !== 'string' || !path.isAbsolute(options.ffmpeg))) {
    throw new Error('Video capture requires an absolute --ffmpeg encoder path.');
  }
  const executable = fs.realpathSync(options.executable);
  const encoder = options.video ? fs.realpathSync(options.ffmpeg) : undefined;
  const output = fs.realpathSync(options.output);
  if (!fs.statSync(output).isDirectory() || isWithinRoot(repository, output) || isWithinRoot(output, repository)) {
    throw new Error('Capture output must be an existing private directory outside the repository and its ancestors.');
  }
  const launch = dependencies.launch || (launchOptions => require('playwright-core')._electron.launch(launchOptions));
  const runDirectory = fs.mkdtempSync(path.join(output, `${storyboard.id}-`));
  const runtime = path.join(runDirectory, 'runtime');
  const environment = launchEnvironment(runtime);
  const fixture = path.join(runtime, 'workspace', storyboard.fixture.file);
  const manifest = {
    schemaVersion: 1,
    storyboard: { id: storyboard.id, article: storyboard.article, sha256: crypto.createHash('sha256').update(storyboardBytes).digest('hex') },
    sourceRevision: execFileSync('git', ['rev-parse', 'HEAD'], {cwd: repository, encoding: 'utf8'}).trim(),
    runnerSha256: crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex'),
    storyboardRunnerSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'storyboard.js'))).digest('hex'),
    storyboardSchemaSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'storyboard.schema.json'))).digest('hex'),
    execution: storyboard.execution,
    createdAt: new Date().toISOString(),
    status: 'failed',
    profile: storyboard.profile,
    ai: storyboard.ai,
    approval: 'human-visual-review-required',
    privacy: { textScan: 'not-run', pixelReview: 'required' }
  };
  let application;
  let failure;
  let closed = true;
  try {
    for (const directory of new Set([
      ...['profile', 'extensions', 'workspace'].map(name => path.join(runtime, name)),
      environment.HOME, environment.APPDATA, environment.LOCALAPPDATA, environment.TEMP, environment.COPILOT_HOME
    ])) {
      fs.mkdirSync(directory, { recursive: true });
    }
    const userDirectory = path.join(runtime, 'profile', 'User');
    fs.mkdirSync(userDirectory);
    const settings = {
      'workbench.colorTheme': storyboard.profile.theme,
      'window.zoomLevel': storyboard.profile.zoomLevel,
      'workbench.startupEditor': 'none',
      'workbench.tips.enabled': false,
      'workbench.secondarySideBar.defaultVisibility': 'hidden',
      'breadcrumbs.enabled': false,
      'chat.disableAIFeatures': true,
      'telemetry.telemetryLevel': 'off',
      'update.mode': 'none',
      'extensions.autoUpdate': false,
      'extensions.autoCheckUpdates': false
    };
    manifest.settings = settings;
    fs.writeFileSync(path.join(userDirectory, 'settings.json'), JSON.stringify(settings, null, 2));
    fs.writeFileSync(fixture, storyboard.fixture.content);
    application = await launch({
      executablePath: executable,
      args: [
        '--new-window', '--disable-extensions', '--skip-welcome', '--skip-release-notes',
        '--disable-updates', '--disable-telemetry', '--use-inmemory-secretstorage',
        '--force-device-scale-factor=1', '--locale=en',
        '--user-data-dir', path.join(runtime, 'profile'),
        '--extensions-dir', path.join(runtime, 'extensions'),
        fixture
      ],
      env: environment,
      cwd: path.join(runtime, 'workspace'),
      timeout: 60000,
      offline: true,
      acceptDownloads: false
    });
    closed = false;
    manifest.processId = application.process().pid;
    const identity = await application.evaluate(({app}) => ({
      appPath: app.getAppPath(), version: app.getVersion()
    }));
    const configuration = JSON.parse(fs.readFileSync(path.join(identity.appPath, 'product.json'), 'utf8'));
    const product = {revision: configuration.commit, quality: configuration.quality, version: identity.version};
    const quality = storyboard.channel === 'insiders' ? 'insider' : 'stable';
    if (product.revision !== options.revision || product.quality !== quality) {
      throw new Error(`Running product does not match the requested ${storyboard.channel} build.`);
    }
    manifest.product = product;
    const page = await application.firstWindow();
    page.setDefaultTimeout(15000);
    await page.locator('.monaco-workbench').waitFor({state: 'visible'});
    const window = await application.browserWindow(page);
    await window.evaluate((browserWindow, size) => browserWindow.setContentSize(size.width, size.height), storyboard.profile);
    await page.waitForFunction(profile => {
      const expectedRatio = profile.deviceScaleFactor * Math.pow(1.2, profile.zoomLevel);
      return Math.abs(innerWidth * devicePixelRatio - profile.width * profile.deviceScaleFactor) <= 1 &&
        Math.abs(innerHeight * devicePixelRatio - profile.height * profile.deviceScaleFactor) <= 1 &&
        Math.abs(devicePixelRatio - expectedRatio) < 0.001 && document.visibilityState === 'visible' &&
        document.querySelector('.monaco-workbench')?.classList.contains('vscode-theme-defaults-themes-dark_modern-json');
    }, storyboard.profile);
    const windowState = await window.evaluate(browserWindow => ({
      contentSize: browserWindow.getContentSize(),
      zoomLevel: browserWindow.webContents.getZoomLevel(),
      zoomFactor: browserWindow.webContents.getZoomFactor()
    }));
    const viewport = await page.evaluate(() => ({
      width: innerWidth, height: innerHeight, devicePixelRatio,
      visibility: document.visibilityState,
      darkModern: document.querySelector('.monaco-workbench')?.classList.contains('vscode-theme-defaults-themes-dark_modern-json')
    }));
    const expectedZoomFactor = Math.pow(1.2, storyboard.profile.zoomLevel);
    const expectedRatio = storyboard.profile.deviceScaleFactor * expectedZoomFactor;
    if (windowState.contentSize[0] !== storyboard.profile.width || windowState.contentSize[1] !== storyboard.profile.height ||
        Math.abs(windowState.zoomLevel - storyboard.profile.zoomLevel) >= 0.001 ||
        Math.abs(windowState.zoomFactor - expectedZoomFactor) >= 0.001 ||
        Math.abs(viewport.width * viewport.devicePixelRatio - storyboard.profile.width) > 1 ||
        Math.abs(viewport.height * viewport.devicePixelRatio - storyboard.profile.height) > 1 ||
        Math.abs(viewport.devicePixelRatio - expectedRatio) >= 0.001 ||
        viewport.visibility !== 'visible' || !viewport.darkModern) {
      throw new Error('The rendered viewport, scale, zoom, visibility, or theme does not match the approved baseline.');
    }
    manifest.window = windowState;
    manifest.viewport = viewport;
    const checkPrivacy = async () => {
      const visibility = await page.evaluate(() => document.visibilityState);
      if (visibility !== 'visible') {
        throw new Error('Attended capture requires a visible page throughout the run.');
      }
      const visibleText = await page.locator('body').innerText();
      const title = await page.title();
      try {
        checkVisibleText(`${title}\n${visibleText}`, [
          ...storyboard.privacy.denyText, os.homedir(), path.basename(os.homedir()),
          process.env.USERPROFILE || os.homedir(), os.userInfo().username
        ]);
      } catch (error) {
        manifest.privacy.textScan = 'failed';
        throw error;
      }
    };
    manifest.steps = await runSteps(page, storyboard, storyboard.steps, checkPrivacy);
    await checkPrivacy();
    manifest.privacy.textScan = 'passed';
    const encoded = await window.evaluate(async browserWindow =>
      (await browserWindow.capturePage()).toPNG().toString('base64'));
    const bytes = Buffer.from(encoded, 'base64');
    validatePng(bytes, storyboard.profile.width, storyboard.profile.height);
    const file = path.join(runDirectory, storyboard.capture.file);
    fs.writeFileSync(file, bytes, {flag: 'wx'});
    manifest.asset = {
      file: storyboard.capture.file, alt: storyboard.capture.alt, method: 'electron-window-content',
      sha256: crypto.createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length
    };
    if (options.video) {
      manifest.video = {
        file: storyboard.video.file, status: 'recording',
        runnerSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'capture-video.js'))).digest('hex'),
        encoderSha256: crypto.createHash('sha256').update(fs.readFileSync(encoder)).digest('hex')
      };
      const record = dependencies.recordVideo || require('./capture-video').recordStoryboardVideo;
      Object.assign(manifest.video, await record(page, application, storyboard, runDirectory, encoder, checkPrivacy));
    }
    manifest.status = 'candidate';
  } catch (error) {
    failure = error;
    manifest.error = error.message;
  } finally {
    try {
      if (application) {
        await application.close();
        closed = true;
      }
    } catch (error) {
      failure = failure ? new AggregateError([failure, error], 'Capture and process cleanup failed.') : error;
      manifest.cleanupError = error.message;
    }
    try {
      if (closed) {
        fs.rmSync(runtime, {recursive: true, force: true});
      } else {
        manifest.runtimeRetained = true;
      }
    } catch (error) {
      failure = failure ? new AggregateError([failure, error], 'Capture and directory cleanup failed.') : error;
      manifest.cleanupError = error.message;
    }
    if (failure) {
      manifest.status = 'failed';
      if (manifest.video) {
        manifest.video.status = 'failed';
      }
    }
    fs.writeFileSync(path.join(runDirectory, 'capture.json'), JSON.stringify(manifest, null, 2));
  }
  if (failure) {
    throw new Error(`Capture failed; inspect ${path.join(runDirectory, 'capture.json')}: ${failure.message}`, {cause: failure});
  }
  return { directory: runDirectory, manifest };
}

async function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/capture.js --executable <Code.exe> --revision <build-commit> --output <private-directory> [--storyboard <file>] [--video --ffmpeg <encoder.exe>]');
    return;
  }
  const options = new Map();
  for (let index = 0; index < args.length; index++) {
    const option = args.at(index);
    const value = option === '--video' ? true : args.at(++index);
    if (!['--executable', '--revision', '--output', '--storyboard', '--video', '--ffmpeg'].includes(option) ||
        options.has(option) || !value || (typeof value === 'string' && value.startsWith('--'))) {
      throw new Error('Supply each capture option once with a value; use --help for usage.');
    }
    options.set(option, value);
  }
  if (!options.has('--executable') || !options.has('--revision') || !options.has('--output')) {
    throw new Error('Capture requires --executable, --revision, and --output.');
  }
  if (options.has('--video') !== options.has('--ffmpeg')) {
    throw new Error('Video capture requires both --video and --ffmpeg <encoder.exe>.');
  }
  const result = await captureEditor({
    executable: options.get('--executable'),
    revision: options.get('--revision'),
    output: options.get('--output'),
    video: options.has('--video'),
    ffmpeg: options.get('--ffmpeg'),
    storyboard: options.get('--storyboard') || path.join(__dirname, 'storyboards', 'editor-find.json')
  });
  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { captureEditor, checkVisibleText, main, validatePng, validateStoryboard };
