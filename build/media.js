'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {isDeepStrictEqual} = require('util');
const {isWithinRoot} = require('./repository-paths');
const {decodePng, framePng, framing, keys} = require('./media-png');
const {conversionTools, convertMedia, readMedia, sha256, toolPath, validateMedia, videoHighlights} = require('./media-tools');
const {validateStoryboard} = require('./storyboard');

/* eslint-disable security/detect-non-literal-fs-filename -- Outputs are exclusive files in new, private directories; manifest paths are confined before use. */

const HASH = /^[a-f0-9]{64}$/;
const REPOSITORY = path.resolve(__dirname, '..');

function assertHash(value) {
  if (typeof value !== 'string' || !HASH.test(value)) throw new Error('Supply an exact lowercase SHA-256 hash.');
}

function privateDirectory(value, repository = REPOSITORY) {
  const directory = fs.realpathSync(value);
  repository = fs.realpathSync(repository);
  if (!fs.statSync(directory).isDirectory() || isWithinRoot(repository, directory) || isWithinRoot(directory, repository)) {
    throw new Error('Media output must be a private directory outside the repository and its ancestors.');
  }
  return directory;
}

function confinedFile(directory, name) {
  if (typeof name !== 'string' || !/^[a-z0-9][a-z0-9_-]*\.(png|webp|webm|mp4|json)$/i.test(name) ||
      /^(con|prn|aux|nul|com\d|lpt\d)\./i.test(name)) throw new Error('Invalid confined media filename.');
  const file = path.join(directory, name);
  if (!fs.lstatSync(file).isFile() || fs.realpathSync(file) !== file) throw new Error('Media files must not be links or escape their directory.');
  return file;
}

function jsonFile(file) {
  if (!fs.lstatSync(file).isFile() || fs.statSync(file).size > 1024 * 1024) throw new Error('Expected a regular JSON file smaller than 1 MiB.');
  const bytes = fs.readFileSync(file);
  return {value: JSON.parse(bytes.toString('utf8')), sha256: sha256(bytes)};
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, {flag: 'wx'});
}

function fingerprint(file, expected) {
  const bytes = readMedia(file);
  const result = {sha256: sha256(bytes), bytes: bytes.length};
  if (expected && (result.sha256 !== expected.sha256 || (expected.bytes !== undefined && result.bytes !== expected.bytes))) {
    throw new Error(`Stale media hash or length: ${file}`);
  }
  return result;
}

function captureEvidence(file, expectedHash, source) {
  assertHash(expectedHash);
  const capture = jsonFile(file);
  if (capture.sha256 !== expectedHash) throw new Error('Stale capture manifest hash.');
  const m = capture.value;
  if (m.schemaVersion !== 1 || m.status !== 'candidate' || m.execution !== 'attended' ||
      m.privacy?.textScan !== 'passed' || m.error || m.cleanupError || m.runtimeRetained ||
      m.captureProfile?.lockRetained || (m.workspace && m.workspace.check !== 'unchanged')) {
    throw new Error('Capture failed or did not finish its privacy and cleanup checks.');
  }
  if (!m.storyboard || typeof m.storyboard.id !== 'string' || typeof m.storyboard.article !== 'string') throw new Error('Capture lacks storyboard provenance.');
  assertHash(m.storyboard.sha256);
  const directory = path.dirname(file);
  if (m.storyboard.file !== undefined) {
    if (m.storyboard.file !== 'storyboard.json') throw new Error('Invalid capture storyboard snapshot filename.');
    const snapshot = jsonFile(confinedFile(directory, m.storyboard.file));
    const storyboard = validateStoryboard(snapshot.value);
    if (snapshot.sha256 !== m.storyboard.sha256 || storyboard.id !== m.storyboard.id || storyboard.article !== m.storyboard.article) {
      throw new Error('Capture storyboard snapshot changed.');
    }
  }
  const entry = [m.asset, m.highlighted, m.video].find(asset => asset && path.join(directory, asset.file || '') === source);
  if (!entry || entry.status === 'failed' || (entry === m.video && entry.status !== 'candidate')) throw new Error('Source is not a successful asset in the capture manifest.');
  fingerprint(confinedFile(directory, entry.file), entry);
  if (entry === m.highlighted) {
    if (!Array.isArray(entry.rectangles) || !entry.rectangles.length || entry.sourceSha256 !== m.asset?.sha256 ||
        entry.sourceFile !== m.asset.file) throw new Error('Invalid highlighted capture provenance.');
    fingerprint(confinedFile(directory, entry.sourceFile), m.asset);
  }
  return {path: file, sha256: capture.sha256, storyboard: m.storyboard, asset: entry.file,
    ...(entry === m.highlighted ? {rectangles: entry.rectangles} : {})};
}

function protectHighlights(capture, frame) {
  for (const r of capture?.rectangles || []) {
    const c = frame.crop;
    if (![r.x, r.y, r.width, r.height].every(Number.isInteger) || r.width < 1 || r.height < 1 ||
        r.x < c.x || r.y < c.y || r.x + r.width > c.x + c.width || r.y + r.height > c.y + c.height) {
      throw new Error('Crop would clip a recorded highlight. Preserve the full rectangle and review its margins.');
    }
  }
}

function removeWork(work, remove = fs.rmSync) {
  if (!fs.lstatSync(work).isDirectory() || fs.realpathSync(work) !== work) throw new Error('Work directory changed; refusing cleanup.');
  remove(work, {recursive: true});
  if (fs.existsSync(work)) throw new Error('Work directory cleanup did not complete.');
}

function toolsEvidence(options) {
  return Object.fromEntries(['ffmpeg', 'ffprobe'].filter(name => Reflect.get(options, name)).map(name => {
    const file = toolPath(Reflect.get(options, name), name);
    return [name, {path: file, sha256: sha256(fs.readFileSync(file))}];
  }));
}

function verifySources(manifest) {
  if (!manifest.source || typeof manifest.source.path !== 'string' || !path.isAbsolute(manifest.source.path)) throw new Error('Invalid source path.');
  assertHash(manifest.source.sha256);
  fingerprint(manifest.source.path, manifest.source);
  if (manifest.capture && !isDeepStrictEqual(
    captureEvidence(manifest.capture.path, manifest.capture.sha256, manifest.source.path), manifest.capture)) {
    throw new Error('Capture provenance changed.');
  }
}

function preparationFrame(source, recipe) {
  keys(recipe, ['format', 'crop', 'padding', 'background', 'highlights'], 'recipe');
  const {highlights, ...geometry} = recipe;
  const frame = framing(source.width, source.height, geometry);
  if (highlights !== undefined) {
    if (!['webm', 'mp4'].includes(source.format)) throw new Error('Timed highlights require a video source.');
    frame.highlights = videoHighlights(highlights, frame, source.decodedFrames);
  }
  return frame;
}

function prepareMedia(options, dependencies = {}) {
  assertHash(options.sha256);
  keys(options.recipe, ['format', 'crop', 'padding', 'background', 'highlights'], 'recipe');
  const source = fs.realpathSync(options.input);
  const extension = path.extname(source).slice(1).toLowerCase();
  const format = options.recipe.format;
  if (!(extension === 'png' && ['png', 'webp'].includes(format)) &&
      !(['webm', 'mp4'].includes(extension) && format === 'mp4') && !(extension === 'webm' && format === 'webm')) {
    throw new Error('Supported operations: PNG to PNG/lossless WebP, WebM or MP4 to MP4, and unchanged WebM validation.');
  }
  if (options.recipe.highlights !== undefined && (!['webm', 'mp4'].includes(extension) || format !== 'mp4')) {
    throw new Error('Timed highlights require WebM or MP4 input and MP4 output.');
  }
  if (format === 'webm' && Object.keys(options.recipe).length !== 1) throw new Error('WebM handoff preserves bytes; crop/padding requires MP4 conversion.');
  const sourcePrint = fingerprint(source, {sha256: options.sha256});
  if (Boolean(options.capture) !== Boolean(options.captureSha256)) throw new Error('Supply both --capture and --capture-sha256.');
  const capture = options.capture ? captureEvidence(fs.realpathSync(options.capture), options.captureSha256, source) : undefined;
  const parent = privateDirectory(options.output, dependencies.repository);
  const directory = path.join(parent, `media-${crypto.randomUUID()}`);
  fs.mkdirSync(directory);
  const work = path.join(directory, 'work');
  const manifest = {
    schemaVersion: 1, status: 'failed', createdAt: new Date().toISOString(), humanVisualReviewRequired: true,
    source: {path: source, ...sourcePrint}, ...(capture ? {capture} : {}),
    recipe: options.recipe,
    implementation: Object.fromEntries(['media.js', 'media-png.js', 'media-tools.js'].map(name =>
      [name, sha256(fs.readFileSync(path.join(__dirname, name)))]))
  };
  let failure;
  let workCreated = false;
  try {
    fs.mkdirSync(work); workCreated = true;
    manifest.tools = toolsEvidence(options);
    if (format === 'webp' || format === 'mp4') conversionTools(format, options, dependencies.run);
    const input = path.join(work, `source.${extension}`);
    fs.writeFileSync(input, readMedia(source), {flag: 'wx'});
    fingerprint(input, sourcePrint);
    const before = validateMedia(input, extension, work, options, dependencies.run);
    const frame = preparationFrame(before, options.recipe);
    protectHighlights(capture, frame);
    manifest.recipe = {format, crop: frame.crop, padding: frame.padding, background: frame.background};
    if (frame.highlights) manifest.recipe.highlights = frame.highlights;
    if (format === 'webm') manifest.recipe = {format};
    manifest.source.validation = before;
    const file = `prepared.${format}`;
    const output = path.join(directory, file);
    if (extension === 'png') {
      const framed = framePng(decodePng(readMedia(input)), frame);
      if (format === 'png') fs.writeFileSync(output, framed, {flag: 'wx'});
      else {
        const framedPath = path.join(work, 'framed.png');
        fs.writeFileSync(framedPath, framed, {flag: 'wx'});
        convertMedia(framedPath, output, framing(frame.width, frame.height, {format}), options, dependencies.run);
      }
      manifest.expectedPixelSha256 = sha256(decodePng(framed).pixels);
    } else if (format === 'webm') {
      fs.copyFileSync(input, output, fs.constants.COPYFILE_EXCL);
    } else {
      convertMedia(input, output, frame, options, dependencies.run);
    }
    const validation = validateMedia(output, format, work, options, dependencies.run, true);
    if (validation.width !== frame.width || validation.height !== frame.height ||
        (manifest.expectedPixelSha256 && validation.pixelSha256 !== manifest.expectedPixelSha256) ||
        (before.durationSeconds && (validation.decodedFrames !== before.decodedFrames ||
          Math.abs(validation.durationSeconds - before.durationSeconds) > 0.1))) {
      throw new Error('Final output changed expected pixels, framing, or video duration/frame count.');
    }
    manifest.output = {file, ...fingerprint(output), validation};
    manifest.byteChange = manifest.output.bytes - sourcePrint.bytes;
    verifySources(manifest);
    if (!isDeepStrictEqual(manifest.tools, toolsEvidence(options))) throw new Error('A media tool changed during preparation.');
  } catch (error) {
    failure = error;
  }
  if (workCreated) {
    try { removeWork(work, dependencies.remove); }
    catch (error) {
      manifest.cleanupError = error.message;
      failure = failure ? new AggregateError([failure, error], `${failure.message}; cleanup: ${error.message}`) : error;
    }
  }
  manifest.status = failure ? 'failed' : 'candidate';
  if (failure) manifest.error = failure.message;
  const manifestPath = path.join(directory, 'media.json');
  try { writeJson(manifestPath, manifest); }
  catch (error) {
    throw new AggregateError(failure ? [failure, error] : [error], `Media manifest finalization failed in ${directory}: ${error.message}`);
  }
  if (failure) throw new Error(`Preparation failed; inspect ${manifestPath}: ${failure.message}`, {cause: failure});
  return {directory, manifest: manifestPath, manifestSha256: jsonFile(manifestPath).sha256, output: manifest.output, approval: 'human-visual-review-required'};
}

function readPrepared(file, dependencies) {
  const directory = privateDirectory(path.dirname(path.resolve(file)), dependencies.repository);
  if (path.basename(file) !== 'media.json') throw new Error('Use the media.json preparation manifest.');
  const manifestPath = confinedFile(directory, 'media.json');
  const loaded = jsonFile(manifestPath);
  const m = loaded.value;
  keys(m, ['schemaVersion', 'status', 'createdAt', 'humanVisualReviewRequired', 'source', 'capture', 'recipe',
    'implementation', 'tools', 'expectedPixelSha256', 'output', 'byteChange', 'error', 'cleanupError'], 'preparation');
  if (m.schemaVersion !== 1 || m.status !== 'candidate' || m.cleanupError || m.error ||
      m.humanVisualReviewRequired !== true || !m.output || m.output.file !== `prepared.${m.recipe?.format}`) {
    throw new Error('Preparation is malformed, failed, or incomplete.');
  }
  assertHash(m.output.sha256);
  if (!Number.isInteger(m.output.bytes) || m.output.bytes < 1 || !m.output.validation || !m.source?.validation ||
      !Number.isInteger(m.source.bytes) || m.source.bytes < 1 || typeof m.createdAt !== 'string' || !Number.isFinite(Date.parse(m.createdAt))) {
    throw new Error('Preparation lacks validation evidence.');
  }
  const frame = preparationFrame(m.source.validation, m.recipe);
  if (m.output.validation.width !== frame.width || m.output.validation.height !== frame.height) throw new Error('Invalid prepared dimensions.');
  protectHighlights(m.capture, frame);
  const output = confinedFile(directory, m.output.file);
  fingerprint(output, m.output);
  verifySources(m);
  return {directory, manifestPath, output, manifest: m, manifestSha256: loaded.sha256};
}

function checkReview(record, prepared) {
  keys(record, ['schemaVersion', 'preparationSha256', 'assetSha256', 'decision', 'reviewer', 'evidence', 'reviewedAt', 'confirmedExactAsset'], 'review');
  if (record.schemaVersion !== 1 || record.preparationSha256 !== prepared.manifestSha256 ||
      record.assetSha256 !== prepared.manifest.output.sha256 || !['approved', 'rejected'].includes(record.decision) ||
      record.confirmedExactAsset !== true || typeof record.reviewedAt !== 'string' || !Number.isFinite(Date.parse(record.reviewedAt)) ||
      ![record.reviewer, record.evidence].every(value => typeof value === 'string' && value.trim().length > 0 && value.length <= 2000)) {
    throw new Error('Review is malformed or stale; exact final bytes and preparation must match.');
  }
}

function verifyMedia(options, dependencies = {}) {
  const prepared = readPrepared(options.manifest, dependencies);
  const {directory, output, manifest, manifestPath, manifestSha256} = prepared;
  const work = path.join(directory, `validation-${crypto.randomUUID()}`);
  fs.mkdirSync(work);
  let failure;
  try {
    const validation = validateMedia(output, manifest.recipe.format, work, options, dependencies.run, true);
    if (!isDeepStrictEqual(validation, manifest.output.validation)) throw new Error('Final validation no longer matches the preparation record.');
    if (manifest.expectedPixelSha256 && validation.pixelSha256 !== manifest.expectedPixelSha256) throw new Error('Final pixels no longer match.');
  } catch (error) { failure = error; }
  try { removeWork(work, dependencies.remove); }
  catch (error) { failure = failure ? new AggregateError([failure, error], `${failure.message}; cleanup: ${error.message}`) : error; }
  if (failure) throw failure;
  fingerprint(output, manifest.output);
  verifySources(manifest);
  if (jsonFile(manifestPath).sha256 !== manifestSha256) throw new Error('Preparation changed during validation.');
  let approval = 'human-visual-review-required';
  if (fs.readdirSync(directory).includes('review.json')) {
    const review = jsonFile(confinedFile(directory, 'review.json')).value;
    checkReview(review, prepared);
    approval = review.decision;
  }
  return {...prepared, approval};
}

function recordReview(options, dependencies = {}) {
  assertHash(options.sha256); assertHash(options.manifestSha256);
  if (options.confirmReviewed !== true) throw new Error('An explicit human exact-asset review confirmation is required, not capture readiness.');
  const prepared = verifyMedia(options, dependencies);
  const record = {
    schemaVersion: 1, preparationSha256: options.manifestSha256, assetSha256: options.sha256,
    decision: options.decision, reviewer: options.reviewer, evidence: options.evidence,
    reviewedAt: new Date().toISOString(), confirmedExactAsset: true
  };
  checkReview(record, prepared);
  const file = path.join(prepared.directory, 'review.json');
  writeJson(file, record);
  return {review: file, asset: prepared.output, sha256: record.assetSha256, decision: record.decision};
}

function main(argv) {
  const command = argv[0];
  if (!command || command === '--help') {
    console.log('Usage: node build/media.js prepare --input <file> --sha256 <hash> --recipe <json> --output <private-parent> [--capture <capture.json> --capture-sha256 <hash>] [--ffmpeg <exe> --ffprobe <exe>]\n' +
      '       node build/media.js verify --manifest <media.json> [--ffmpeg <exe> --ffprobe <exe>]\n' +
      '       node build/media.js review --manifest <media.json> --manifest-sha256 <hash> --sha256 <asset-hash> --decision approved|rejected --reviewer <human> --evidence <explicit-decision> --confirm-reviewed [--ffmpeg <exe> --ffprobe <exe>]');
    return;
  }
  const shared = ['--ffmpeg', '--ffprobe'];
  const allowed = command === 'prepare' ? [...shared, '--input', '--sha256', '--recipe', '--output', '--capture', '--capture-sha256'] :
    command === 'verify' ? [...shared, '--manifest'] : command === 'review' ?
      [...shared, '--manifest', '--manifest-sha256', '--sha256', '--decision', '--reviewer', '--evidence', '--confirm-reviewed'] : [];
  if (!allowed.length) throw new Error('Unknown media command.');
  const values = new Map();
  for (let i = 1; i < argv.length; i++) {
    const name = argv.at(i);
    if (!allowed.includes(name) || values.has(name)) throw new Error(`Unknown or duplicate option: ${name}`);
    if (name === '--confirm-reviewed') values.set(name, true);
    else {
      if (!argv.at(i + 1) || argv.at(i + 1).startsWith('--')) throw new Error(`Missing value for ${name}`);
      values.set(name, argv.at(++i));
    }
  }
  const required = command === 'prepare' ? ['--input', '--sha256', '--recipe', '--output'] :
    command === 'verify' ? ['--manifest'] : ['--manifest', '--manifest-sha256', '--sha256', '--decision', '--reviewer', '--evidence', '--confirm-reviewed'];
  if (required.some(name => !values.has(name))) throw new Error(`Required options: ${required.join(', ')}`);
  const options = Object.fromEntries([...values].map(([key, value]) => [key.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase()), value]));
  if (command === 'prepare') options.recipe = jsonFile(options.recipe).value;
  const result = command === 'prepare' ? prepareMedia(options) : command === 'review' ? recordReview(options) : verifyMedia(options);
  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = {captureEvidence, confinedFile, main, preparationFrame, prepareMedia, privateDirectory, recordReview, verifyMedia, verifySources};
