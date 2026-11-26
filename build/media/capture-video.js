'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { locate, runSteps } = require('./storyboard');
const {decodeVideoFrames, durationLimit} = require('./video-validation');

/* eslint-disable security/detect-non-literal-fs-filename -- All media paths are inside the runner's private directory. */

function jpegDimensions(bytes) {
  if (bytes.length < 4 || bytes.readUInt16BE(0) !== 0xffd8) {
    throw new Error('Screencast frame is not a JPEG.');
  }
  let offset = 2;
  while (offset + 3 < bytes.length) {
    if (bytes.at(offset++) !== 0xff) {
      break;
    }
    while (bytes.at(offset) === 0xff) {
      offset++;
    }
    const marker = bytes.at(offset++);
    if (marker === 0xda || marker === 0xd9) {
      break;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      continue;
    }
    const length = bytes.readUInt16BE(offset);
    if (length < 2 || offset + length > bytes.length) {
      break;
    }
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker) && length >= 8) {
      return {width: bytes.readUInt16BE(offset + 5), height: bytes.readUInt16BE(offset + 3)};
    }
    offset += length;
  }
  throw new Error('Screencast JPEG has no valid dimensions.');
}

function analyzeVideoMetadata(text, width, height, maximum = 30) {
  durationLimit(maximum);
  const duration = /Duration:\s*(\d+):(\d{2}):([\d.]+)/.exec(text);
  const stream = text.split(/\r?\n/).find(line => /^\s*Stream #0:0.*Video:/.test(line));
  const size = stream && /,\s*(\d+)x(\d+)(?:\s|,|\[)/.exec(stream);
  const fps = stream && /,\s*([\d.]+) fps\b/.exec(stream);
  if (!duration || !size || !fps || !/Video: vp9\b/.test(stream)) {
    throw new Error('Cannot verify the recorded VP9 WebM metadata.');
  }
  const durationSeconds = Number(duration[1]) * 3600 + Number(duration[2]) * 60 + Number(duration[3]);
  if (!Number.isFinite(durationSeconds) || durationSeconds < 4 || durationSeconds > maximum || Number(size[1]) !== width ||
      Number(size[2]) !== height || Number(fps[1]) !== 25) {
    throw new Error(`Video must be ${width}x${height}, 25 fps, and 4-${maximum} seconds; received ${size[1]}x${size[2]}, ${fps[1]} fps, ${durationSeconds}s.`);
  }
  return {width, height, fps: 25, durationSeconds};
}

// This function runs in Electron's main process without access to module closures.
function measureMotion({nativeImage}, frames) {
  let previous;
  const changedFractions = [];
  for (const encoded of frames) {
    const image = nativeImage.createFromBuffer(Buffer.from(encoded, 'base64'));
    if (image.isEmpty()) {
      throw new Error('A decoded review frame could not be opened.');
    }
    const pixels = image.resize({width: 160, height: 90, quality: 'good'}).toBitmap();
    if (pixels.length !== 160 * 90 * 4) {
      throw new Error('Unexpected review-frame bitmap layout.');
    }
    if (previous) {
      let changed = 0;
      for (let offset = 0; offset < pixels.length; offset += 4) {
        if (Math.max(
          Math.abs(pixels.at(offset) - previous.at(offset)),
          Math.abs(pixels.at(offset + 1) - previous.at(offset + 1)),
          Math.abs(pixels.at(offset + 2) - previous.at(offset + 2))
        ) > 20) {
          changed++;
        }
      }
      changedFractions.push(changed / (160 * 90));
    }
    previous = pixels;
  }
  const movingIntervals = changedFractions.filter(fraction => fraction >= 0.0005).length;
  return {
    samples: frames.length,
    movingIntervals,
    intervalCount: changedFractions.length,
    movingFraction: changedFractions.length ? movingIntervals / changedFractions.length : 0,
    changedPixelThreshold: 0.0005,
    channelDeltaThreshold: 20
  };
}

function assertMotion(motion, windowBrowser = false) {
  const insufficientMotion = windowBrowser ? motion.movingIntervals < 2 : motion.movingFraction < 0.1;
  if (motion.samples < 8 || motion.intervalCount < 7 || insufficientMotion) {
    throw new Error('Video contains too little observed motion for the pilot. Review the scenario instead of adding a longer static hold.');
  }
}

function assertLongVideoDecoder(file, dependencies = {}) {
  const result = (dependencies.spawnSync || spawnSync)(file, ['-hide_banner', '-filters'],
    {encoding: 'utf8', windowsHide: true, timeout: 10000, maxBuffer: 1024 * 1024});
  if (result.error || result.status !== 0) throw new Error('Cannot inspect the approved long-video validation binary.');
  const filters = `${result.stdout || ''}\n${result.stderr || ''}`.split(/\r?\n/).map(line => line.trim().split(/\s+/).at(1));
  if (!['fps', 'showinfo'].every(name => filters.includes(name))) {
    throw new Error('Long single-run takes require an explicit full --validation-ffmpeg with fps and showinfo filters; the minimal Playwright binary is insufficient.');
  }
}

async function validateVideo(file, encoder, profile, application, dependencies = {}) {
  const maximum = durationLimit(dependencies.maxDurationSeconds);
  const bytes = fs.readFileSync(file);
  if (bytes.length < 4 || !bytes.subarray(0, 4).equals(Buffer.from('1a45dfa3', 'hex')) || bytes.length > 50 * 1024 * 1024) {
    throw new Error('Expected a nonempty WebM recording smaller than 50 MiB.');
  }
  const framesDirectory = path.join(path.dirname(file), 'decoded-video');
  fs.mkdirSync(framesDirectory);
  try {
    let fullDecode;
    let longMetadata;
    if (maximum > 30) {
      const run = (executable, args) => {
        const result = (dependencies.spawnSync || spawnSync)(executable, args,
          {encoding: 'utf8', windowsHide: true, timeout: 120000, maxBuffer: 8 * 1024 * 1024});
        if (result.error || result.status !== 0) throw new Error(`Video decoding failed: ${result.error?.message || result.stderr}`);
        return result;
      };
      const probe = run(encoder, ['-nostdin', '-hide_banner', '-i', file, '-frames:v', '0', '-f', 'null', '-']);
      longMetadata = analyzeVideoMetadata(probe.stderr, profile.width, profile.height, maximum);
      fullDecode = decodeVideoFrames(file, longMetadata, maximum, run, encoder);
    }
    const decoded = (dependencies.spawnSync || spawnSync)(encoder, [
      '-nostdin', '-hide_banner', '-xerror', '-err_detect', 'explode', '-i', file,
      '-an', '-fps_mode', 'passthrough', ...(fullDecode ? ['-vf', `fps=${12 / longMetadata.durationSeconds}`] : []),
      '-frames:v', fullDecode ? '12' : '751', '-c:v', 'png', '-threads', '1',
      path.join(framesDirectory, 'frame-%06d.png')
    ], {encoding: 'utf8', windowsHide: true, timeout: 120000, maxBuffer: 8 * 1024 * 1024});
    if (decoded.error || decoded.status !== 0) {
      throw new Error(`Video decoding failed: ${decoded.error?.message || decoded.stderr || `exit ${decoded.status}`}`);
    }
    const metadata = longMetadata || analyzeVideoMetadata(decoded.stderr, profile.width, profile.height);
    const files = fs.readdirSync(framesDirectory).filter(name => /^frame-\d+\.png$/.test(name)).sort();
    if (fullDecode ? files.length !== 12 :
      files.length < 100 || files.length > 750 || Math.abs(files.length / 25 - metadata.durationSeconds) > 0.2) {
      throw new Error('Decoded frame count does not match the bounded recording duration.');
    }
    const samples = [];
    for (const [index, name] of files.entries()) {
      const frame = fs.readFileSync(path.join(framesDirectory, name));
      if (frame.length < 24 || !frame.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) ||
          frame.readUInt32BE(16) !== profile.width || frame.readUInt32BE(20) !== profile.height) {
        throw new Error(`Decoded video frame has incorrect dimensions: ${name}`);
      }
      if (fullDecode || index % 6 === 0) {
        samples.push(frame.toString('base64'));
      }
    }
    const motion = await application.evaluate(measureMotion, samples);
    // A whole-window browser check can have two meaningful state changes separated by readable holds.
    assertMotion(motion, dependencies.windowBrowser);
    const reviewDirectory = path.join(path.dirname(file), 'video-review');
    fs.mkdirSync(reviewDirectory);
    const reviewFrames = [];
    for (const [index, fraction] of [0.15, 0.35, 0.6, 0.85].entries()) {
      const frameIndex = Math.min(files.length - 1, Math.floor(files.length * fraction));
      const name = `frame-${index + 1}.png`;
      fs.copyFileSync(path.join(framesDirectory, files.at(frameIndex)), path.join(reviewDirectory, name));
      reviewFrames.push({file: `video-review/${name}`, timeSeconds: fullDecode ?
        (frameIndex + 0.5) * metadata.durationSeconds / 12 : frameIndex / 25});
    }
    return {
      ...metadata, decodedFrames: fullDecode?.decodedFrames || files.length, motion, reviewFrames,
      ...(fullDecode ? {validationMethod: fullDecode.method} : {}),
      bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex')
    };
  } finally {
    fs.rmSync(framesDirectory, {recursive: true, force: true});
  }
}

async function recordStoryboardVideo(page, application, storyboard, directory, encoder, checkPrivacy, dependencies = {}) {
  const surfaces = dependencies.surfaces || {};
  const browserOnly = storyboard.video.browserUrl && storyboard.video.browserCamera !== 'window';
  if (storyboard.video.browserUrl && !surfaces.browser) {
    throw new Error('Browser video requires its verified camera; no main-window fallback is allowed.');
  }
  const camera = browserOnly ? surfaces.browser : page;
  const profile = browserOnly ? dependencies.videoProfile : storyboard.profile;
  if (!camera || !profile) throw new Error('Browser video requires its verified camera and native dimensions; no main-window fallback is allowed.');
  if (storyboard.video.browserUrl && (profile.width % 2 || profile.height % 2)) {
    throw new Error(`Browser video requires even native dimensions; received ${profile.width}x${profile.height}. Adjust the pane layout before recording.`);
  }
  const rehearsal = dependencies.rehearsal === true;
  if (rehearsal && storyboard.capture.mode !== 'git-demo') {
    throw new Error('No-video rehearsal requires a Git demo.');
  }
  if (!rehearsal && (!camera.screencast || typeof camera.screencast.start !== 'function')) {
    throw new Error('This Playwright build does not provide page.screencast.');
  }
  const video = storyboard.video;
  const liveAI = storyboard.ai === 'live-approved';
  const singleRun = liveAI || storyboard.capture.mode === 'git-demo';
  if (!singleRun) {
    await runSteps(page, storyboard, video.reset, checkPrivacy, 'video.reset');
    await runSteps(page, storyboard, video.steps, checkPrivacy, 'video.dryRun');
    await runSteps(page, storyboard, video.reset, checkPrivacy, 'video.reset');
  }

  const file = path.join(directory, video.file);
  let frameCount = 0;
  let frameError;
  let actionError;
  let recordingAttempted = false;
  let actions;
  let interruptionError;
  let rejectInterruption;
  let finished = false;
  let monitoring = false;
  let deadline;
  let monitor;
  const interruption = new Promise((_, reject) => { rejectInterruption = reject; });
  // The rejection is also observed if recording fails before it reaches the race.
  interruption.catch(() => {});
  const interrupt = error => {
    if (finished || interruptionError) return;
    interruptionError = error;
    rejectInterruption(error);
  };
  const unexpectedDialog = () => interrupt(new Error('Unexpected page dialog. Handle prompts outside the recording; no dialog was accepted.'));
  const cancelled = () => interrupt(new Error(liveAI
    ? 'Live-AI capture was cancelled. Submitted AI work might require manual cancellation.'
    : 'Git demo capture was cancelled. No action will be retried.'));
  const checkRecording = async () => {
    if (interruptionError) throw interruptionError;
    if (frameError) {
      throw frameError;
    }
    await checkPrivacy();
    if (singleRun) {
      for (const target of video.blockedTargets) {
        if (await locate(page, storyboard.targets, target, surfaces).isVisible()) {
          throw new Error(`Unexpected prompt "${target}". The recording does not approve or dismiss it.`);
        }
      }
    }
    if (interruptionError) throw interruptionError;
  };
  const observedPages = new Set([page, surfaces.browser].filter(Boolean));
  try {
    if (singleRun) {
      for (const observed of observedPages) observed.on('dialog', unexpectedDialog);
      process.once('SIGINT', cancelled);
      await checkRecording();
    }
    if (!rehearsal) {
      recordingAttempted = true;
      await camera.screencast.start({
        path: file, size: {width: profile.width, height: profile.height}, fps: 25,
        onFrame: frame => {
          frameCount++;
          try {
            const dimensions = jpegDimensions(frame.data);
            if (dimensions.width !== profile.width || dimensions.height !== profile.height) {
              throw new Error(`Screencast frames do not fill the approved viewport: received ${dimensions.width}x${dimensions.height}, expected ${profile.width}x${profile.height}; refusing padded or scaled video.`);
            }
          } catch (error) {
            // Playwright swallows callback rejections; surface frame failures in the scenario.
            frameError = error;
          }
        }
      });
    }
    const started = Date.now();
    if (singleRun) {
      page.setDefaultTimeout(liveAI ? video.maxDurationSeconds * 1000 : Math.min(15000, video.maxDurationSeconds * 1000));
      if (surfaces.browser) surfaces.browser.setDefaultTimeout(video.maxDurationSeconds * 1000);
      deadline = setTimeout(() => interrupt(new Error('Single-run recording exceeded its approved duration. No action will be retried.')),
        video.maxDurationSeconds * 1000);
      monitor = setInterval(() => {
        if (monitoring || finished) return;
        monitoring = true;
        checkRecording().catch(interrupt).finally(() => { monitoring = false; });
      }, 100);
    }
    const execution = (async () => {
      if (!rehearsal) {
        await camera.screencast.showActions({
          duration: 300, style: {title: 'display: none', highlight: 'outline: 2px solid #007acc'}
        });
        await camera.screencast.showChapter(video.title, {duration: 800});
      }
      await camera.waitForTimeout(800);
      return runSteps(page, storyboard, video.steps, checkRecording, 'video.steps', started, surfaces);
    })();
    actions = await (singleRun ? Promise.race([execution, interruption]) : execution);
  } catch (error) {
    actionError = error;
    // Prevent any pending action from advancing to another step after an abort.
    interruptionError ||= error;
  } finally {
    finished = true;
    clearTimeout(deadline);
    clearInterval(monitor);
    if (singleRun) {
      for (const observed of observedPages) observed.off('dialog', unexpectedDialog);
      process.removeListener('SIGINT', cancelled);
    }
    try {
      if (recordingAttempted) await camera.screencast.stop();
    } catch (error) {
      actionError = actionError ? new AggregateError([actionError, error],
        `Video actions and finalization failed: ${actionError.message}; ${error.message}`) : error;
    }
  }
  if (actionError) {
    throw actionError;
  }
  if (frameError) {
    throw frameError;
  }
  if (rehearsal) return {status: 'passed', execution: 'single-git-rehearsal', actions};
  if (frameCount < 2) {
    throw new Error('Recording received too few real frames.');
  }
  const validation = await (dependencies.validateVideo || validateVideo)(file, encoder, profile, application,
    {maxDurationSeconds: singleRun ? video.maxDurationSeconds : 30, windowBrowser: video.browserCamera === 'window'});
  if (singleRun && validation.durationSeconds > video.maxDurationSeconds) {
    throw new Error('The saved recording exceeds its approved duration.');
  }
  return {
    file: path.basename(file), title: video.title, status: 'candidate', method: 'playwright-page-screencast',
    capturedFrames: frameCount, actions, ...validation, humanVisualReviewRequired: true,
    ...(liveAI ? {execution: 'single-live-run', maxDurationSeconds: video.maxDurationSeconds} : {}),
    ...(storyboard.capture.mode === 'git-demo' ? {execution: 'single-git-run', maxDurationSeconds: video.maxDurationSeconds} : {}),
    ...(video.browserUrl ? {source: browserOnly ? 'integrated-browser' : 'integrated-browser-window'} : {})
  };
}

module.exports = { analyzeVideoMetadata, assertLongVideoDecoder, assertMotion, jpegDimensions, measureMotion, recordStoryboardVideo, validateVideo };
