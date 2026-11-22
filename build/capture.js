'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { createInterface } = require('node:readline/promises');
const { isWithinRoot } = require('./repository-paths');
const { runSteps, validateStoryboard } = require('./storyboard');
const {WORKSPACE_SETTINGS, acquireCaptureProfile, replyToReadiness, snapshotWorkspace, waitForReadiness} = require('./capture-preparation');
const {assertStableHighlights, collectHighlightRectangles, renderHighlights} = require('./capture-highlights');
const {ProcedureFailure, failureDetails} = require('./replay-errors');

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
      throw new ProcedureFailure('privacy', 'denied-text', 'Privacy check failed: visible text matches a denied value. Retained private artifacts must not be approved.');
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

async function confirmWorkspaceReady(workspace) {
  const terminal = createInterface({input: process.stdin, output: process.stdout});
  const controller = new AbortController();
  let expired = false;
  const timer = setTimeout(() => {
    expired = true;
    controller.abort();
  }, 120000);
  terminal.on('SIGINT', () => controller.abort());
  terminal.on('close', () => controller.abort());
  try {
    const answer = await terminal.question(
      `\nCapture folder: ${workspace}\n` +
      'Review the selected workspace and handle any Workspace Trust prompt yourself.\n' +
      'Do not run the sample program. Keep the capture window visible.\n' +
      'Within two minutes, type READY after preparation, or anything else to cancel: ',
      {signal: controller.signal}
    );
    return answer.trim().toLowerCase() === 'ready';
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(expired ? 'Workspace preparation timed out.' : 'Workspace preparation was cancelled.', {cause: error});
    }
    throw error;
  } finally {
    clearTimeout(timer);
    terminal.close();
  }
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
  const needsPreparation = Boolean(storyboard.workspace || storyboard.fixture?.openFolder || options.replay);
  if (needsPreparation && !options.waitForReady && !dependencies.confirmReady && (!process.stdin.isTTY || !process.stdout.isTTY)) {
    throw new Error('Folder capture requires an interactive terminal, or --wait-for-ready for an explicit chat readiness response.');
  }
  if (storyboard.workspace && (typeof options.workspace !== 'string' || !path.isAbsolute(options.workspace) ||
      typeof options.captureProfile !== 'string' || !path.isAbsolute(options.captureProfile))) {
    throw new Error('Existing-workspace capture requires absolute --workspace and --capture-profile paths.');
  }
  if (!storyboard.workspace && (options.workspace || options.captureProfile)) {
    throw new Error('Workspace and profile options require an existing-workspace storyboard.');
  }
  if (options.waitForReady && !needsPreparation) {
    throw new Error('Readiness confirmation requires a folder or existing-workspace storyboard.');
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
  const existingWorkspace = storyboard.workspace ? fs.realpathSync(options.workspace) : undefined;
  if (existingWorkspace && (!fs.statSync(existingWorkspace).isDirectory() ||
      isWithinRoot(existingWorkspace, output) || isWithinRoot(output, existingWorkspace))) {
    throw new Error('Capture output must be separate from the existing workspace.');
  }
  const runDirectory = fs.mkdtempSync(path.join(output, `${storyboard.id}-`));
  const runtime = path.join(runDirectory, 'runtime');
  const environment = launchEnvironment(runtime);
  const workspace = existingWorkspace || path.join(runtime, 'workspace');
  const fixture = path.join(workspace, storyboard.workspace?.entry || storyboard.fixture.file);
  const manifest = {
    schemaVersion: 1,
    storyboard: { id: storyboard.id, article: storyboard.article, file: 'storyboard.json',
      sha256: crypto.createHash('sha256').update(storyboardBytes).digest('hex') },
    articleHash: crypto.createHash('sha256').update(fs.readFileSync(article)).digest('hex'),
    sourceRevision: execFileSync('git', ['rev-parse', 'HEAD'], {cwd: repository, encoding: 'utf8'}).trim(),
    runnerSha256: crypto.createHash('sha256').update(fs.readFileSync(__filename)).digest('hex'),
    storyboardRunnerSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'storyboard.js'))).digest('hex'),
    storyboardSchemaSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'storyboard.schema.json'))).digest('hex'),
    preparationRunnerSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'capture-preparation.js'))).digest('hex'),
    execution: storyboard.execution,
    createdAt: new Date().toISOString(),
    status: 'failed',
    profile: storyboard.profile,
    ai: storyboard.ai,
    approval: 'human-visual-review-required',
    privacy: { textScan: 'not-run', pixelReview: options.replay ? 'not-captured' : 'required' },
    ...(options.replay ? {purpose: 'procedure-replay', approval: 'not-a-media-candidate'} : {})
  };
  let application;
  let captureProfile;
  let workspaceSnapshot;
  let failure;
  let closed = true;
  let manifestPersisted = false;
  let stage = 'preparation';
  try {
    fs.writeFileSync(path.join(runDirectory, manifest.storyboard.file), storyboardBytes, {flag: 'wx', mode: 0o600});
    if (storyboard.workspace) {
      workspaceSnapshot = snapshotWorkspace(workspace, storyboard.workspace.entry);
      manifest.workspace = {path: workspace, entry: storyboard.workspace.entry, files: workspaceSnapshot, check: 'pending'};
      captureProfile = acquireCaptureProfile(options.captureProfile, workspace, storyboard.channel, runDirectory);
      manifest.captureProfile = {path: captureProfile.root, retained: true, lockRetained: true};
      // Workspace Trust uses application-shared storage under the home directory, not only user-data.
      environment.HOME = path.join(captureProfile.root, 'home');
      environment.USERPROFILE = environment.HOME;
    }
    const userData = captureProfile?.userData || path.join(runtime, 'profile');
    for (const directory of new Set([
      userData, ...['extensions', 'workspace'].map(name => path.join(runtime, name)),
      environment.HOME, environment.APPDATA, environment.LOCALAPPDATA, environment.TEMP, environment.COPILOT_HOME
    ])) {
      fs.mkdirSync(directory, { recursive: true });
    }
    const userDirectory = path.join(userData, 'User');
    fs.mkdirSync(userDirectory, {recursive: true});
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
      'extensions.autoCheckUpdates': false,
      ...(storyboard.workspace ? WORKSPACE_SETTINGS : {})
    };
    manifest.settings = settings;
    fs.writeFileSync(path.join(userDirectory, 'settings.json'), JSON.stringify(settings, null, 2));
    if (storyboard.fixture) fs.writeFileSync(fixture, storyboard.fixture.content);
    stage = 'launch';
    application = await launch({
      executablePath: executable,
      args: [
        '--new-window', '--disable-extensions', '--skip-welcome', '--skip-release-notes',
        '--disable-updates', '--disable-telemetry', '--use-inmemory-secretstorage',
        '--force-device-scale-factor=1', '--locale=en',
        '--user-data-dir', userData,
        '--extensions-dir', path.join(runtime, 'extensions'),
        ...(storyboard.workspace || storyboard.fixture?.openFolder ? [workspace, '--goto'] : []), fixture
      ],
      env: environment,
      cwd: workspace,
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
    manifest.product = product;
    if (product.revision !== options.revision || product.quality !== quality) {
      throw new ProcedureFailure('prerequisite', 'build-mismatch', `Running product does not match the requested ${storyboard.channel} build.`);
    }
    stage = 'window';
    const page = await application.firstWindow();
    page.setDefaultTimeout(15000);
    await page.locator('.monaco-workbench').waitFor({state: 'visible'});
    const window = await application.browserWindow(page);
    await window.evaluate((browserWindow, size) => browserWindow.setContentSize(size.width, size.height), storyboard.profile);
    if (needsPreparation) {
      stage = 'readiness';
      manifest.workspacePreparation = {status: 'awaiting-human'};
      const ready = options.waitForReady ? await waitForReadiness(runDirectory, workspace) :
        await (dependencies.confirmReady || confirmWorkspaceReady)(workspace);
      if (ready !== true) {
        manifest.workspacePreparation.status = 'cancelled';
        throw new ProcedureFailure('prerequisite', 'readiness-denied', 'Workspace preparation was cancelled. No candidate was saved.');
      }
      stage = 'baseline';
      manifest.workspacePreparation = {status: 'confirmed', confirmedAt: new Date().toISOString()};
    }
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
        throw new ProcedureFailure('environment', 'window-not-visible', 'Attended capture requires a visible page throughout the run.');
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
    stage = 'steps';
    manifest.steps = await runSteps(page, storyboard, storyboard.steps, checkPrivacy);
    await checkPrivacy();
    manifest.privacy.textScan = 'passed';
    if (!options.replay) {
      const highlightRectangles = storyboard.capture.highlights ? await collectHighlightRectangles(page, storyboard) : undefined;
      await checkPrivacy();
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
      if (highlightRectangles) {
        assertStableHighlights(highlightRectangles, await collectHighlightRectangles(page, storyboard));
        const strokeWidth = storyboard.capture.highlights.strokeWidth ?? 2;
        const result = await application.evaluate(renderHighlights, {
          png: encoded, width: storyboard.profile.width, height: storyboard.profile.height,
          rectangles: highlightRectangles, strokeWidth
        });
        const highlighted = Buffer.from(result.png, 'base64');
        validatePng(highlighted, storyboard.profile.width, storyboard.profile.height);
        const name = `${path.basename(storyboard.capture.file, '.png')}-highlighted.png`;
        fs.writeFileSync(path.join(runDirectory, name), highlighted, {flag: 'wx'});
        manifest.highlighted = {
          file: name, alt: storyboard.capture.alt, method: 'pixel-rectangles',
          sourceFile: manifest.asset.file, sourceSha256: manifest.asset.sha256,
          runnerSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'capture-highlights.js'))).digest('hex'),
          sha256: crypto.createHash('sha256').update(highlighted).digest('hex'), bytes: highlighted.length,
          color: '#FF0000', strokeWidth, rectangles: highlightRectangles,
          verification: result.verification, humanVisualReviewRequired: true
        };
      }
      if (options.video) {
        manifest.video = {
          file: storyboard.video.file, status: 'recording',
          runnerSha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'capture-video.js'))).digest('hex'),
          encoderSha256: crypto.createHash('sha256').update(fs.readFileSync(encoder)).digest('hex')
        };
        const record = dependencies.recordVideo || require('./capture-video').recordStoryboardVideo;
        Object.assign(manifest.video, await record(page, application, storyboard, runDirectory, encoder, checkPrivacy));
      }
    }
    manifest.status = options.replay ? 'passed' : 'candidate';
  } catch (error) {
    failure = error;
    if (error.steps) {
      if (error.failure.phase === 'steps') manifest.steps = error.steps;
      else manifest.failedSteps = {phase: error.failure.phase, steps: error.steps};
    }
    const category = ['preparation', 'readiness'].includes(stage) ? 'prerequisite' : 'environment';
    manifest.failures = [failureDetails(error, category, `${stage}-failed`)];
    manifest.error = options.replay ? `${manifest.failures[0].category}: ${manifest.failures[0].code}` : error.message;
    if (manifest.workspacePreparation?.status === 'awaiting-human') {
      manifest.workspacePreparation.status = 'failed';
    }
  } finally {
    try {
      if (application) {
        await application.close();
        closed = true;
      }
    } catch (error) {
      failure = failure ? new AggregateError([failure, error], 'Capture and process cleanup failed.') : error;
      (manifest.failures ||= []).push({category: 'cleanup', code: 'process-close-failed'});
      manifest.cleanupError = options.replay ? 'process-close-failed' : error.message;
    }
    try {
      if (closed) {
        fs.rmSync(runtime, {recursive: true, force: true});
      } else {
        manifest.runtimeRetained = true;
      }
    } catch (error) {
      failure = failure ? new AggregateError([failure, error], 'Capture and directory cleanup failed.') : error;
      (manifest.failures ||= []).push({category: 'cleanup', code: 'directory-cleanup-failed'});
      manifest.cleanupError = options.replay ? 'directory-cleanup-failed' : error.message;
    }
    if (captureProfile && closed) {
      try {
        captureProfile.release();
        manifest.captureProfile.lockRetained = false;
      } catch (error) {
        failure = failure ? new AggregateError([failure, error], 'Capture and profile unlock failed.') : error;
        (manifest.failures ||= []).push({category: 'cleanup', code: 'profile-unlock-failed'});
        manifest.cleanupError = options.replay ? 'profile-unlock-failed' : error.message;
      }
    }
    if (workspaceSnapshot) {
      try {
        if (JSON.stringify(snapshotWorkspace(workspace, storyboard.workspace.entry)) !== JSON.stringify(workspaceSnapshot)) {
          throw new Error('The workspace entry or configuration files changed during capture. No changes were rolled back.');
        }
        manifest.workspace.check = 'unchanged';
      } catch (error) {
        failure = failure ? new AggregateError([failure, error], `${failure.message}; ${error.message}`) : error;
        if (manifest.workspace) manifest.workspace.check = 'failed';
        (manifest.failures ||= []).push({category: 'environment', code: 'workspace-changed'});
        manifest.workspaceError = options.replay ? 'workspace-changed' : error.message;
      }
    }
    if (failure) {
      manifest.status = 'failed';
      manifest.error ||= options.replay ? 'Replay did not complete successfully.' : failure.message;
      if (manifest.video) {
        manifest.video.status = 'failed';
      }
    }
    try {
      fs.writeFileSync(path.join(runDirectory, 'capture.json'), JSON.stringify(manifest, null, 2));
      manifestPersisted = true;
    } catch (error) {
      failure = failure ? new AggregateError([failure, error], 'Capture and manifest persistence failed.') : error;
      (manifest.failures ||= []).push({category: 'environment', code: 'capture-manifest-write-failed'});
      manifest.status = 'failed';
      manifest.error ||= 'Capture manifest could not be saved.';
      if (manifest.video) manifest.video.status = 'failed';
    }
  }
  if (failure) {
    const message = manifestPersisted ?
      `Capture failed; inspect ${path.join(runDirectory, 'capture.json')}: ${options.replay ? manifest.error : failure.message}` :
      'Capture failed; the private capture manifest could not be saved. Private runtime state may remain.';
    const error = new Error(message, {cause: failure});
    error.capture = {directory: runDirectory, manifest, manifestPersisted};
    throw error;
  }
  return { directory: runDirectory, manifest };
}

async function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/capture.js --executable <Code.exe> --revision <build-commit> --output <private-directory> [--storyboard <file>] [--video --ffmpeg <encoder.exe>]');
    console.log('Existing workspace: --workspace <folder> --capture-profile <dedicated-directory> [--wait-for-ready]');
    console.log('Relay an explicit human decision: --confirm-ready <run-directory> --token <token>, or --cancel-ready <run-directory> --token <token>');
    return;
  }
  if (['--confirm-ready', '--cancel-ready'].includes(args[0])) {
    if (args.length !== 4 || args[2] !== '--token') {
      throw new Error('Readiness responses require a run directory and --token.');
    }
    replyToReadiness(args[1], args[3], args[0] === '--confirm-ready');
    console.log('Human readiness response recorded. This does not approve any media asset.');
    return;
  }
  const options = new Map();
  for (let index = 0; index < args.length; index++) {
    const option = args.at(index);
    const value = ['--video', '--wait-for-ready'].includes(option) ? true : args.at(++index);
    if (!['--executable', '--revision', '--output', '--storyboard', '--video', '--ffmpeg', '--workspace', '--capture-profile', '--wait-for-ready'].includes(option) ||
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
    workspace: options.get('--workspace'),
    captureProfile: options.get('--capture-profile'),
    waitForReady: options.has('--wait-for-ready'),
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
