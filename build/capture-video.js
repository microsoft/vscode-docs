'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

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

function analyzeVideoMetadata(text, width, height) {
  const duration = /Duration:\s*(\d+):(\d{2}):([\d.]+)/.exec(text);
  const stream = text.split(/\r?\n/).find(line => /^\s*Stream #0:0.*Video:/.test(line));
  const size = stream && /,\s*(\d+)x(\d+)(?:\s|,|\[)/.exec(stream);
  const fps = stream && /,\s*([\d.]+) fps\b/.exec(stream);
  if (!duration || !size || !fps || !/Video: vp9\b/.test(stream)) {
    throw new Error('Cannot verify the recorded VP9 WebM metadata.');
  }
  const durationSeconds = Number(duration[1]) * 3600 + Number(duration[2]) * 60 + Number(duration[3]);
  if (!Number.isFinite(durationSeconds) || durationSeconds < 4 || durationSeconds > 30 || Number(size[1]) !== width ||
      Number(size[2]) !== height || Number(fps[1]) !== 25) {
    throw new Error(`Video must be ${width}x${height}, 25 fps, and 4-30 seconds; received ${size[1]}x${size[2]}, ${fps[1]} fps, ${durationSeconds}s.`);
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

function assertMotion(motion) {
  if (motion.samples < 8 || motion.intervalCount < 7 || motion.movingFraction < 0.1) {
    throw new Error('Video contains too little observed motion for the pilot. Review the scenario instead of adding a longer static hold.');
  }
}

async function validateVideo(file, encoder, profile, application, dependencies = {}) {
  const bytes = fs.readFileSync(file);
  if (bytes.length < 4 || !bytes.subarray(0, 4).equals(Buffer.from('1a45dfa3', 'hex')) || bytes.length > 50 * 1024 * 1024) {
    throw new Error('Expected a nonempty WebM recording smaller than 50 MiB.');
  }
  const framesDirectory = path.join(path.dirname(file), 'decoded-video');
  fs.mkdirSync(framesDirectory);
  try {
    const decoded = (dependencies.spawnSync || spawnSync)(encoder, [
      '-nostdin', '-hide_banner', '-xerror', '-err_detect', 'explode', '-i', file,
      '-an', '-vsync', '0', '-frames:v', '751', '-c:v', 'png', '-threads', '1',
      path.join(framesDirectory, 'frame-%06d.png')
    ], {encoding: 'utf8', windowsHide: true, timeout: 120000, maxBuffer: 8 * 1024 * 1024});
    if (decoded.error || decoded.status !== 0) {
      throw new Error(`Video decoding failed: ${decoded.error?.message || decoded.stderr || `exit ${decoded.status}`}`);
    }
    const metadata = analyzeVideoMetadata(decoded.stderr, profile.width, profile.height);
    const files = fs.readdirSync(framesDirectory).filter(name => /^frame-\d+\.png$/.test(name)).sort();
    if (files.length < 100 || files.length > 750 || Math.abs(files.length / 25 - metadata.durationSeconds) > 0.2) {
      throw new Error('Decoded frame count does not match the bounded recording duration.');
    }
    const samples = [];
    for (const [index, name] of files.entries()) {
      const frame = fs.readFileSync(path.join(framesDirectory, name));
      if (frame.length < 24 || !frame.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) ||
          frame.readUInt32BE(16) !== profile.width || frame.readUInt32BE(20) !== profile.height) {
        throw new Error(`Decoded video frame has incorrect dimensions: ${name}`);
      }
      if (index % 6 === 0) {
        samples.push(frame.toString('base64'));
      }
    }
    const motion = await application.evaluate(measureMotion, samples);
    assertMotion(motion);
    const reviewDirectory = path.join(path.dirname(file), 'video-review');
    fs.mkdirSync(reviewDirectory);
    const reviewFrames = [];
    for (const [index, fraction] of [0.15, 0.35, 0.6, 0.85].entries()) {
      const frameIndex = Math.min(files.length - 1, Math.floor(files.length * fraction));
      const name = `frame-${index + 1}.png`;
      fs.copyFileSync(path.join(framesDirectory, files.at(frameIndex)), path.join(reviewDirectory, name));
      reviewFrames.push({file: `video-review/${name}`, timeSeconds: frameIndex / 25});
    }
    return {
      ...metadata, decodedFrames: files.length, motion, reviewFrames,
      bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex')
    };
  } finally {
    fs.rmSync(framesDirectory, {recursive: true, force: true});
  }
}

async function recordFindVideo(page, application, storyboard, directory, encoder, checkPrivacy, dependencies = {}) {
  if (!page.screencast || typeof page.screencast.start !== 'function') {
    throw new Error('This Playwright build does not provide page.screencast.');
  }
  const find = page.locator('.find-widget');
  const query = find.getByRole('textbox', {name: 'Find', exact: true});
  const next = find.getByRole('button', {name: /Next Match/});
  if (storyboard.scenario.expectedMatches !== 3 || storyboard.scenario.query.length > 30) {
    throw new Error('The video pilot requires three matches and a query of at most 30 characters.');
  }
  const waitForMatch = async current => {
    const expected = `${current} of ${storyboard.scenario.expectedMatches}`;
    try {
      await page.waitForFunction(value =>
        document.querySelector('.find-widget .matchesCount')?.textContent?.trim() === value, expected);
    } catch (error) {
      throw new Error(`Find navigation did not select ${expected}: ${error.message}`, {cause: error});
    }
  };
  const readMatch = async () => {
    await page.waitForFunction(total => {
      const parts = document.querySelector('.find-widget .matchesCount')?.textContent?.trim().split(' of ');
      return parts?.length === 2 && Number(parts[1]) === total && Number(parts[0]) >= 1 && Number(parts[0]) <= total;
    }, storyboard.scenario.expectedMatches);
    const text = await page.locator('.find-widget .matchesCount').innerText();
    const current = Number(text.trim().split(' of ')[0]);
    if (!Number.isInteger(current) || current < 1 || current > storyboard.scenario.expectedMatches) {
      throw new Error('Find did not expose a valid selected-match index.');
    }
    return current;
  };
  let current = await readMatch();
  for (let index = 0; index < storyboard.scenario.expectedMatches; index++) {
    current = current % storyboard.scenario.expectedMatches + 1;
    await next.click();
    await waitForMatch(current);
  }
  await query.fill('');
  await find.getByRole('checkbox', {name: /Match Case/}).uncheck();
  await page.keyboard.press('Escape');
  await page.keyboard.press('Control+Home');
  await checkPrivacy();

  const file = path.join(directory, 'editor-find.webm');
  let frameCount = 0;
  let frameError;
  let actionError;
  const actions = [];
  let started;
  async function step(name, action) {
    if (frameError) {
      throw frameError;
    }
    await checkPrivacy();
    await action();
    await checkPrivacy();
    actions.push({name, elapsedMs: Date.now() - started});
  }
  try {
    await page.screencast.start({
      path: file, size: {width: storyboard.profile.width, height: storyboard.profile.height}, fps: 25,
      onFrame: frame => {
        frameCount++;
        try {
          const dimensions = jpegDimensions(frame.data);
          if (dimensions.width !== storyboard.profile.width || dimensions.height !== storyboard.profile.height) {
            throw new Error('Screencast frames do not fill the approved viewport; refusing padded or scaled video.');
          }
        } catch (error) {
          // Playwright swallows callback rejections; surface frame failures in the scenario.
          frameError = error;
        }
      }
    });
    started = Date.now();
    await page.screencast.showActions({
      duration: 300, style: {title: 'display: none', highlight: 'outline: 2px solid #007acc'}
    });
    await page.screencast.showChapter('Find in this file', {duration: 800});
    await page.waitForTimeout(800);
    await step('Open Find', () => page.keyboard.press('Control+f'));
    await step('Type the search term', () => query.pressSequentially(storyboard.scenario.query, {delay: 180}));
    await page.waitForTimeout(500);
    await step('Match case', () => find.getByRole('checkbox', {name: /Match Case/}).check());
    current = await readMatch();
    for (let index = 0; index < storyboard.scenario.expectedMatches; index++) {
      await page.waitForTimeout(700);
      current = current % storyboard.scenario.expectedMatches + 1;
      await step('Next match', () => next.click());
      await waitForMatch(current);
    }
    await page.waitForTimeout(700);
    await checkPrivacy();
  } catch (error) {
    actionError = error;
  } finally {
    try {
      await page.screencast.stop();
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
  if (frameCount < 2) {
    throw new Error('Recording received too few real frames.');
  }
  const validation = await (dependencies.validateVideo || validateVideo)(file, encoder, storyboard.profile, application);
  return {
    file: path.basename(file), status: 'candidate', method: 'playwright-page-screencast',
    capturedFrames: frameCount, actions, ...validation, humanVisualReviewRequired: true
  };
}

module.exports = { analyzeVideoMetadata, assertMotion, jpegDimensions, measureMotion, recordFindVideo, validateVideo };
