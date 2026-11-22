'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');
const test = require('node:test');
const {prepareMedia, recordReview, verifyMedia, privateDirectory, main} = require('./media');
const {crc32, decodePng, encodePng, framing} = require('./media-png');
const {MAX_DECODE_BYTES, conversionTools, convertMedia, pngFrames, probeMetadata, runTool, sha256, validateMedia, videoHighlights} = require('./media-tools');

/* eslint-disable security/detect-non-literal-fs-filename -- Every fixture uses a newly created, test-owned temporary directory. */

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-media-test-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  const repository = path.join(root, 'repository'), output = path.join(root, 'private');
  fs.mkdirSync(repository); fs.mkdirSync(output);
  const pixels = Buffer.alloc(8 * 6 * 4);
  for (let i = 0; i < pixels.length; i += 4) pixels.set([i % 251, (i + 1) % 251, (i + 2) % 251, 255], i);
  const bytes = encodePng({width: 8, height: 6, pixels});
  const input = path.join(output, 'source.png');
  fs.writeFileSync(input, bytes);
  return {root, repository, output, pixels, bytes, options: {input, sha256: sha256(bytes), output, recipe: {format: 'png'}}, deps: {repository}};
}

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function overwriteJson(file, value) { fs.writeFileSync(file, JSON.stringify(value)); }
function reviewOptions(result) {
  return {manifest: result.manifest, manifestSha256: result.manifestSha256, sha256: result.output.sha256,
    decision: 'approved', reviewer: 'Synthetic unit-test reviewer', evidence: 'Synthetic fixture only: reviewed full pixels and framing.',
    confirmReviewed: true};
}

test('preparation crops and pads exact pixels, preserves source bytes, and never inherits approval', t => {
  const f = fixture(t);
  const recipe = {format: 'png', crop: {x: 2, y: 1, width: 3, height: 4},
    padding: {top: 1, right: 2, bottom: 1, left: 1}, background: '#123456'};
  const result = prepareMedia({...f.options, recipe}, f.deps);
  const image = decodePng(fs.readFileSync(path.join(result.directory, result.output.file)));
  assert.equal(image.width, 6); assert.equal(image.height, 6);
  for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) {
    const expected = x >= 1 && x < 4 && y >= 1 && y < 5 ?
      f.pixels.subarray(((y + 0) * 8 + x + 1) * 4, ((y + 0) * 8 + x + 1) * 4 + 4) : Buffer.from('123456ff', 'hex');
    assert.deepEqual(image.pixels.subarray((y * 6 + x) * 4, (y * 6 + x) * 4 + 4), expected);
  }
  assert.deepEqual(fs.readFileSync(f.options.input), f.bytes);
  assert.equal(fs.existsSync(path.join(result.directory, 'work')), false);
  assert.equal(verifyMedia({manifest: result.manifest}, f.deps).approval, 'human-visual-review-required');
  recordReview(reviewOptions(result), f.deps);
  assert.equal(verifyMedia({manifest: result.manifest}, f.deps).approval, 'approved');
  assert.throws(() => recordReview(reviewOptions(result), f.deps), /EEXIST/);
  const next = prepareMedia({...f.options, recipe}, f.deps);
  assert.notEqual(next.directory, result.directory);
  assert.equal(next.output.sha256, result.output.sha256);
  assert.equal(verifyMedia({manifest: next.manifest}, f.deps).approval, 'human-visual-review-required');
});

test('review requires explicit exact hashes and human evidence; rejections remain rejected', t => {
  const f = fixture(t), result = prepareMedia(f.options, f.deps), options = reviewOptions(result);
  for (const change of [{confirmReviewed: false}, {sha256: 'a'.repeat(64)}, {manifestSha256: 'b'.repeat(64)},
    {decision: 'ready'}, {reviewer: ''}, {evidence: ''}]) {
    assert.throws(() => recordReview({...options, ...change}, f.deps), /explicit|malformed|stale/);
    assert.equal(fs.existsSync(path.join(result.directory, 'review.json')), false);
  }
  assert.throws(() => recordReview(options, {...f.deps, remove: () => { throw new Error('Review cleanup failed'); }}), /cleanup failed/);
  assert.equal(fs.existsSync(path.join(result.directory, 'review.json')), false);
  recordReview({...options, decision: 'rejected'}, f.deps);
  assert.equal(verifyMedia({manifest: result.manifest}, f.deps).approval, 'rejected');
});

test('modified outputs, sources, manifests, and approval records fail closed', t => {
  for (const target of ['output', 'source', 'manifest', 'review']) {
    const f = fixture(t), result = prepareMedia(f.options, f.deps);
    recordReview(reviewOptions(result), f.deps);
    if (target === 'output') fs.appendFileSync(path.join(result.directory, result.output.file), 'changed');
    if (target === 'source') fs.appendFileSync(f.options.input, 'changed');
    if (target === 'manifest') fs.appendFileSync(result.manifest, '\n');
    if (target === 'review') {
      const file = path.join(result.directory, 'review.json'), review = readJson(file);
      review.assetSha256 = 'f'.repeat(64); overwriteJson(file, review);
    }
    assert.throws(() => verifyMedia({manifest: result.manifest}, f.deps), /[Ss]tale|malformed/);
  }
});

test('guards confinement, unsupported recipes, stale sources, and failed cleanup', t => {
  const f = fixture(t);
  assert.throws(() => prepareMedia({...f.options, output: f.repository}, f.deps), /outside/);
  assert.throws(() => prepareMedia({...f.options, sha256: 'a'.repeat(64)}, f.deps), /Stale/);
  assert.throws(() => prepareMedia({...f.options, recipe: {format: 'png', scale: 2}}, f.deps), /recipe/);
  assert.throws(() => framing(8, 6, {format: 'png', crop: {x: -1, y: 0, width: 2, height: 2}}), /Crop/);
  assert.throws(() => framing(8, 6, {format: 'png', crop: {x: 7, y: 0, width: 2, height: 2}}), /Crop/);
  assert.throws(() => framing(8, 6, {format: 'png', padding: {top: 257, right: 0, bottom: 0, left: 0}}), /padding/);
  assert.throws(() => framing(8, 6, {format: 'png', background: 'red; injected'}), /Background/);
  for (const field of ['crop', 'padding', 'background']) {
    assert.throws(() => framing(8, 6, {format: 'png', [field]: null}), /Invalid|Background/);
  }
  assert.throws(() => framing(8, 6, {format: 'mp4', crop: {x: 1, y: 0, width: 4, height: 4}}), /even/);
  const result = prepareMedia(f.options, f.deps), m = readJson(result.manifest);
  m.output.file = '..\\source.png'; overwriteJson(result.manifest, m);
  assert.throws(() => verifyMedia({manifest: result.manifest}, f.deps), /malformed/);
  const junction = path.join(f.output, 'alias');
  fs.symlinkSync(f.repository, junction, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => privateDirectory(junction, f.repository), /outside/);
  assert.throws(() => prepareMedia(f.options, {...f.deps, remove: () => { throw new Error('test cleanup failure'); }}), /cleanup failure/);
  const failed = fs.readdirSync(f.output).filter(n => n.startsWith('media-'))
    .map(n => path.join(f.output, n, 'media.json')).find(file => readJson(file).status === 'failed');
  assert.ok(failed);
  assert.match(readJson(failed).cleanupError, /cleanup failure/);
  assert.throws(() => verifyMedia({manifest: failed}, f.deps), /failed/);
});

test('capture integration verifies cleanup, storyboard provenance, raw hashes, and highlight clipping', t => {
  const f = fixture(t);
  const raw = path.join(f.output, 'raw.png'); fs.writeFileSync(raw, f.bytes);
  const capture = path.join(f.output, 'capture.json');
  const manifest = {schemaVersion: 1, status: 'candidate', execution: 'attended', privacy: {textScan: 'passed'},
    storyboard: {id: 'synthetic', article: 'docs/example.md', sha256: 'a'.repeat(64)},
    asset: {file: 'raw.png', sha256: f.options.sha256, bytes: f.bytes.length},
    highlighted: {file: 'source.png', sha256: f.options.sha256, bytes: f.bytes.length,
      sourceFile: 'raw.png', sourceSha256: f.options.sha256, rectangles: [{x: 2, y: 2, width: 4, height: 2}]}};
  overwriteJson(capture, manifest);
  const options = {...f.options, capture, captureSha256: sha256(fs.readFileSync(capture))};
  const result = prepareMedia(options, f.deps);
  assert.equal(readJson(result.manifest).capture.storyboard.id, 'synthetic');
  assert.throws(() => prepareMedia({...options, recipe: {format: 'png', crop: {x: 3, y: 2, width: 3, height: 2}}}, f.deps), /highlight/);
  manifest.cleanupError = 'shutdown failed'; overwriteJson(capture, manifest);
  assert.throws(() => prepareMedia({...options, captureSha256: sha256(fs.readFileSync(capture))}, f.deps), /cleanup/);
  assert.throws(() => verifyMedia({manifest: result.manifest}, f.deps), /Stale capture/);
  delete manifest.cleanupError; overwriteJson(capture, manifest);
  fs.appendFileSync(raw, 'changed');
  assert.throws(() => prepareMedia({...options, captureSha256: sha256(fs.readFileSync(capture))}, f.deps), /Stale media/);
});

test('preserved storyboard snapshots remain bound to prepared media and exact approval', t => {
  const f = fixture(t);
  const bytes = fs.readFileSync(path.join(__dirname, 'storyboards', 'editor-find.json'));
  const storyboard = JSON.parse(bytes);
  const snapshot = path.join(f.output, 'storyboard.json');
  fs.writeFileSync(snapshot, bytes);
  const capture = path.join(f.output, 'capture.json');
  overwriteJson(capture, {schemaVersion: 1, status: 'candidate', execution: 'attended', privacy: {textScan: 'passed'},
    storyboard: {id: storyboard.id, article: storyboard.article, file: 'storyboard.json', sha256: sha256(bytes)},
    asset: {file: 'source.png', sha256: f.options.sha256, bytes: f.bytes.length}});
  const prepared = prepareMedia({...f.options, capture, captureSha256: sha256(fs.readFileSync(capture))}, f.deps);
  recordReview(reviewOptions(prepared), f.deps);
  assert.equal(verifyMedia({manifest: prepared.manifest}, f.deps).approval, 'approved');
  fs.appendFileSync(snapshot, '\n');
  assert.throws(() => verifyMedia({manifest: prepared.manifest}, f.deps), /snapshot changed/);
});
test('PNG full validation rejects bad checksums, truncation, oversized geometry, trailing data and broken deflate', t => {
  const f = fixture(t);
  const badCrc = Buffer.from(f.bytes); badCrc.writeUInt8(badCrc.at(30) ^ 1, 30);
  for (const bytes of [badCrc, f.bytes.subarray(0, -1), Buffer.concat([f.bytes, Buffer.from('extra')])]) {
    assert.throws(() => decodePng(bytes), /PNG/);
  }
  const huge = Buffer.from(f.bytes);
  huge.writeUInt32BE(5000, 16); huge.writeUInt32BE(crc32(huge.subarray(12, 29)), 29);
  assert.throws(() => decodePng(huge), /dimensions/);
  const corrupt = Buffer.from(f.bytes), length = corrupt.readUInt32BE(33);
  corrupt.fill(0, 41, 41 + length);
  corrupt.writeUInt32BE(crc32(corrupt.subarray(37, 41 + length)), 41 + length);
  assert.throws(() => decodePng(corrupt), /header|compression/);
});

test('RGB rows using every PNG filter decode to the same original pixels', () => {
  const rows = Buffer.from([1, 2, 3, 10, 20, 30, 2, 4, 6, 20, 40, 60]);
  function chunk(name, data) {
    const b = Buffer.alloc(data.length + 12); b.writeUInt32BE(data.length); b.write(name, 4); data.copy(b, 8);
    b.writeUInt32BE(crc32(b.subarray(4, -4)), b.length - 4); return b;
  }
  for (let filter = 0; filter <= 4; filter++) {
    const raw = Buffer.alloc(14);
    for (let y = 0; y < 2; y++) {
      raw.writeUInt8(filter, y * 7);
      for (let x = 0; x < 6; x++) {
        const left = x >= 3 ? rows.at(y * 6 + x - 3) : 0, above = y ? rows.at(x) : 0;
        const upper = y && x >= 3 ? rows.at(x - 3) : 0;
        const p = left + above - upper;
        const distances = [Math.abs(p - left), Math.abs(p - above), Math.abs(p - upper)];
        const paeth = [left, above, upper].at(distances.indexOf(Math.min(...distances)));
        const prediction = [0, left, above, Math.floor((left + above) / 2), paeth].at(filter);
        raw.writeUInt8((rows.at(y * 6 + x) - prediction) & 255, y * 7 + x + 1);
      }
    }
    const h = Buffer.alloc(13); h.writeUInt32BE(2); h.writeUInt32BE(2, 4); h.set([8, 2], 8);
    const bytes = Buffer.concat([Buffer.from('89504e470d0a1a0a', 'hex'), chunk('IHDR', h),
      chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
    assert.deepEqual(decodePng(bytes).pixels, Buffer.from([1, 2, 3, 255, 10, 20, 30, 255, 2, 4, 6, 255, 20, 40, 60, 255]));
  }
});

test('conversion explicitly checks prerequisites and uses non-destructive bounded encoding options', t => {
  const f = fixture(t);
  const tools = {ffmpeg: f.options.input, ffprobe: f.options.input};
  assert.throws(() => conversionTools('mp4', {}), /Prerequisite/);
  assert.throws(() => conversionTools('mp4', tools, () => ({stdout: ' V..... libvpx-vp9', stderr: ''})), /libx264/);
  const calls = [];
  const run = (exe, args) => {
    if (args.includes('-vsync')) throw new Error('Unrecognized option vsync');
    calls.push(args);
    return {stdout: ' V..... libx264\n V..... libwebp', stderr: ''};
  };
  for (const format of ['mp4', 'webp']) {
    convertMedia('input', 'new-output', framing(8, 6, {format}), tools, run);
    const args = calls.at(-1);
    assert.ok(args.includes('-n')); assert.ok(!args.includes('-y'));
    assert.ok(args.includes(format === 'mp4' ? 'libx264' : 'libwebp'));
    assert.ok(args.includes(format === 'mp4' ? '+faststart' : '-lossless'));
    assert.equal(args.at(args.indexOf('-fps_mode') + 1), 'passthrough');
    assert.ok(!args.includes('-t'));
  }
});

test('timed video highlights reject clipped geometry, invalid frame ranges, and unsupported output before encoding', t => {
  const frame = framing(160, 120, {format: 'mp4', crop: {x: 4, y: 6, width: 128, height: 96}});
  const rectangle = {x: 12, y: 16, width: 40, height: 24, startFrame: 25, endFrame: 50};
  assert.deepEqual(videoHighlights([rectangle], frame, 100), [rectangle]);
  for (const change of [{x: 3}, {y: 5}, {width: 4}, {height: 200},
    {startFrame: -1}, {startFrame: 25.5}, {endFrame: 25}, {endFrame: 101}, {color: 'red'}, {x: '12;injected'}]) {
    assert.throws(() => videoHighlights([{...rectangle, ...change}], frame, 100), /highlight/i);
  }
  assert.throws(() => videoHighlights([], frame, 100), /1-20/);
  assert.throws(() => videoHighlights(Array(21).fill(rectangle), frame, 100), /1-20/);
  assert.throws(() => videoHighlights([rectangle], {...frame, format: 'webm'}, 100), /MP4/);
  let calls = 0;
  assert.throws(() => convertMedia('input', 'output', {...frame, highlights: [{...rectangle, x: 'injected'}]},
    {}, () => { calls++; }), /integer/);
  assert.equal(calls, 0);
  const f = fixture(t);
  assert.throws(() => prepareMedia({...f.options, recipe: {format: 'png', highlights: [rectangle]}}, f.deps), /MP4 output/);
});

test('real FFmpeg renders highlights on exact frames after crop and padding and never inherits asset approval', {
  skip: !process.env.DOCS_MEDIA_FFMPEG || !process.env.DOCS_MEDIA_FFPROBE
    ? 'Set DOCS_MEDIA_FFMPEG and DOCS_MEDIA_FFPROBE to approved installed tools.' : false,
  timeout: 120000
}, t => {
  const f = fixture(t);
  const tools = {ffmpeg: process.env.DOCS_MEDIA_FFMPEG, ffprobe: process.env.DOCS_MEDIA_FFPROBE};
  conversionTools('mp4', tools);
  const source = path.join(f.output, 'source.webm');
  runTool(tools.ffmpeg, ['-nostdin', '-hide_banner', '-n', '-f', 'lavfi', '-i', 'color=c=black:s=160x120:r=25:d=4',
    '-an', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', source]);
  const sourceHash = sha256(fs.readFileSync(source));
  const recipe = {format: 'mp4', crop: {x: 4, y: 6, width: 128, height: 96},
    padding: {top: 2, right: 2, bottom: 2, left: 2},
    highlights: [
      {x: 12, y: 16, width: 40, height: 24, startFrame: 20, endFrame: 40},
      {x: 78, y: 42, width: 24, height: 18, startFrame: 70, endFrame: 100}
    ]};
  const options = {input: source, sha256: sourceHash, output: f.output, recipe, ...tools};
  const result = prepareMedia(options, f.deps);
  assert.equal(result.output.validation.decodedFrames, 100);
  assert.equal(result.output.validation.durationSeconds, 4);
  assert.equal(result.output.validation.width, 132);
  assert.equal(result.output.validation.height, 100);
  assert.deepEqual(readJson(result.manifest).recipe.highlights, recipe.highlights);
  const output = path.join(result.directory, result.output.file);
  const decoded = runTool(tools.ffmpeg, ['-nostdin', '-hide_banner', '-i', output, '-map', '0:v:0', '-an',
    '-fps_mode', 'passthrough', '-frames:v', '101', '-c:v', 'png', '-threads', '1', '-f', 'image2', '-update', '1', 'pipe:1'], {binary: true});
  const frames = [...pngFrames(decoded.stdout)];
  assert.equal(frames.length, 100);
  for (const [index, bytes] of frames.entries()) {
    const image = decodePng(bytes);
    for (const rectangle of recipe.highlights) {
      const x = rectangle.x - recipe.crop.x + recipe.padding.left;
      const y = rectangle.y - recipe.crop.y + recipe.padding.top;
      const border = image.pixels.subarray(((y + 8) * image.width + x) * 4, ((y + 8) * image.width + x) * 4 + 4);
      const red = border[0] > 140 && border[1] < 90 && border[2] < 90;
      assert.equal(red, index >= rectangle.startFrame && index < rectangle.endFrame, `Highlight timing/position differs on frame ${index}.`);
      const interior = image.pixels.subarray(((y + 8) * image.width + x + 10) * 4, ((y + 8) * image.width + x + 10) * 4 + 3);
      assert.ok(interior.every(channel => channel < 25), 'A rectangle must not fill or obscure its interior.');
    }
  }
  assert.equal(sha256(fs.readFileSync(source)), sourceHash);
  assert.equal(verifyMedia({manifest: result.manifest, ...tools}, f.deps).approval, 'human-visual-review-required');
  recordReview({...reviewOptions(result), ...tools}, f.deps);
  assert.equal(verifyMedia({manifest: result.manifest, ...tools}, f.deps).approval, 'approved');
  const next = prepareMedia({...options, recipe: {...recipe, highlights: [{...recipe.highlights[0], startFrame: 21}]}}, f.deps);
  assert.equal(verifyMedia({manifest: next.manifest, ...tools}, f.deps).approval, 'human-visual-review-required');
  const changed = readJson(result.manifest);
  changed.recipe.highlights[0].startFrame = 21;
  overwriteJson(result.manifest, changed);
  assert.throws(() => verifyMedia({manifest: result.manifest, ...tools}, f.deps), /malformed or stale/);
});

test('lossless WebP preparation validates decoded pixels and preserves raw PNG on encoder failures', t => {
  for (const badPixels of [false, true]) {
    const f = fixture(t);
    const tools = {ffmpeg: f.options.input, ffprobe: f.options.input};
    const run = (_exe, args) => {
      if (args.includes('-encoders')) return {stdout: ' V..... libwebp', stderr: ''};
      if (args.includes('-show_streams')) return {stdout: JSON.stringify({streams: [
        {codec_type: 'video', codec_name: 'webp', width: 8, height: 6}
      ]}), stderr: ''};
      if (args.includes('libwebp')) {
        fs.writeFileSync(args.at(-1), Buffer.from('524946460400000057454250', 'hex'));
      } else {
        const pixels = Buffer.from(f.pixels);
        if (badPixels) pixels.writeUInt8(pixels.at(0) ^ 1, 0);
        return {stdout: encodePng({width: 8, height: 6, pixels}), stderr: ''};
      }
      return {stdout: '', stderr: ''};
    };
    const options = {...f.options, ...tools, recipe: {format: 'webp'}};
    if (badPixels) assert.throws(() => prepareMedia(options, {...f.deps, run}), /expected pixels/);
    else {
      const result = prepareMedia(options, {...f.deps, run});
      assert.equal(verifyMedia({manifest: result.manifest, ...tools}, {...f.deps, run}).approval, 'human-visual-review-required');
    }
    assert.deepEqual(fs.readFileSync(f.options.input), f.bytes);
  }
});

test('a source changed during conversion cannot become a successful candidate', t => {
  const f = fixture(t);
  const run = (_exe, args) => {
    if (args.includes('-encoders')) return {stdout: ' V..... libwebp', stderr: ''};
    if (args.includes('-show_streams')) return {stdout: JSON.stringify({streams: [
      {codec_type: 'video', codec_name: 'webp', width: 8, height: 6}
    ]}), stderr: ''};
    if (args.includes('libwebp')) {
      fs.appendFileSync(f.options.input, 'changed during conversion');
      fs.writeFileSync(args.at(-1), Buffer.from('524946460400000057454250', 'hex'));
    } else {
      return {stdout: f.bytes, stderr: ''};
    }
    return {stdout: '', stderr: ''};
  };
  assert.throws(() => prepareMedia({...f.options, ffmpeg: f.options.input, ffprobe: f.options.input,
    recipe: {format: 'webp'}}, {...f.deps, run}), /Stale media/);
  const name = fs.readdirSync(f.output).find(n => n.startsWith('media-'));
  const manifest = readJson(path.join(f.output, name, 'media.json'));
  assert.equal(manifest.status, 'failed');
  assert.equal(fs.existsSync(path.join(f.output, name, 'work')), false);
});

test('MP4 conversion validates fast start and unchanged frame count without replacing the input', t => {
  const f = fixture(t), input = path.join(f.output, 'source.webm');
  const bytes = Buffer.from('1a45dfa34282847765626d', 'hex'); fs.writeFileSync(input, bytes);
  const tools = {ffmpeg: f.options.input, ffprobe: f.options.input};
  function run(_exe, args) {
    if (args.includes('-encoders')) return {stdout: ' V..... libx264', stderr: ''};
    if (args.includes('-show_streams')) return {stdout: JSON.stringify({streams: [
      {codec_type: 'video', codec_name: 'h264', pix_fmt: 'yuv420p', width: 8, height: 6, avg_frame_rate: '25/1', duration: '4'}
    ]}), stderr: ''};
    if (args.includes('libx264')) {
      fs.writeFileSync(args.at(-1), Buffer.from('0000000866747970000000086d6f6f76000000086d646174', 'hex'));
    } else if (args.at(args.indexOf('-frames:v') + 1) !== '0') {
      return {stdout: Buffer.concat(Array(100).fill(f.bytes)), stderr: ''};
    }
    return {stdout: '', stderr: 'Duration: 00:00:04.00\n  Stream #0:0: Video: vp9, yuv420p, 8x6, 25 fps\n'};
  }
  const result = prepareMedia({...f.options, ...tools, input, sha256: sha256(bytes), recipe: {format: 'mp4'}}, {...f.deps, run});
  assert.equal(verifyMedia({manifest: result.manifest, ...tools}, {...f.deps, run}).manifest.output.validation.decodedFrames, 100);
  assert.deepEqual(fs.readFileSync(input), bytes);
  const output = path.join(result.directory, result.output.file);
  fs.writeFileSync(output, Buffer.from('0000000866747970000000086d646174000000086d6f6f76', 'hex'));
  assert.throws(() => validateMedia(output, 'mp4', f.output, tools, run, true), /fast-start/);
});

test('concatenated PNG parsing respects chunk boundaries and rejects over-budget or partial output', t => {
  const f = fixture(t);
  const text = Buffer.from('note\0IEND\x89PNG\r\n\x1a\n', 'binary');
  const ancillary = Buffer.alloc(text.length + 12);
  ancillary.writeUInt32BE(text.length); ancillary.write('tEXt', 4); text.copy(ancillary, 8);
  ancillary.writeUInt32BE(crc32(ancillary.subarray(4, -4)), ancillary.length - 4);
  const first = Buffer.concat([f.bytes.subarray(0, 33), ancillary, f.bytes.subarray(33)]);
  const second = encodePng({width: 1, height: 1, pixels: Buffer.from('123456ff', 'hex')});
  const stream = Buffer.concat([first, second]);
  const frames = [...pngFrames(stream, stream.length)];
  assert.deepEqual(frames, [first, second]);
  assert.deepEqual(frames.map(frame => decodePng(frame, false)), [{width: 8, height: 6}, {width: 1, height: 1}]);
  assert.throws(() => [...pngFrames(stream, stream.length - 1)], /buffer budget/);
  assert.throws(() => [...pngFrames(stream, MAX_DECODE_BYTES + 1)], /budget/);
  for (const tail of [second.subarray(0, 1), second.subarray(0, 10), second.subarray(0, -1), second.subarray(0, -12), Buffer.from('garbage')]) {
    assert.throws(() => [...pngFrames(Buffer.concat([first, tail]))], /Truncated|invalid/);
  }
});

test('binary subprocess capture enforces its budget before accepting any complete PNG prefix', t => {
  const f = fixture(t), bytes = Buffer.concat([f.bytes, f.bytes]);
  const emit = `process.stdout.write(Buffer.from('${bytes.toString('hex')}', 'hex'));`;
  const result = runTool(process.execPath, ['-e', emit], {binary: true, maxBuffer: bytes.length});
  assert.ok(Buffer.isBuffer(result.stdout));
  assert.deepEqual([...pngFrames(result.stdout)], [f.bytes, f.bytes]);
  assert.throws(() => runTool(process.execPath, ['-e', `${emit} process.stdout.write(Buffer.alloc(4096));`],
    {binary: true, maxBuffer: bytes.length}), /buffer budget; partial output is not accepted/);
  assert.throws(() => runTool(process.execPath, ['-e', emit], {binary: true, maxBuffer: MAX_DECODE_BYTES + 1}), /budget/);
});

test('full video stdout validation checks every frame and rejects count, dimensions, corruption and truncation without frame files', t => {
  const f = fixture(t), file = path.join(f.output, 'source.webm');
  fs.writeFileSync(file, Buffer.from('1a45dfa34282847765626d', 'hex'));
  const metadata = 'Input #0, matroska,webm\nDuration: 00:00:04.00\n  Stream #0:0: Video: vp9, yuv420p, 8x6, 25 fps\n';
  const tools = {ffmpeg: f.options.input};
  const originalFiles = fs.readdirSync(f.output).sort();
  function decoder({count = 100, wrongFrame = false, fail = false, audio = false, truncated = false, trailing = false, corrupt = false} = {}) {
    return (_exe, args, options) => {
      if (args.includes('-vsync')) throw new Error('Unrecognized option vsync');
      assert.equal(args.at(-1), 'pipe:1');
      assert.equal(args.at(args.indexOf('-update') + 1), '1');
      if (args.at(args.indexOf('-frames:v') + 1) === '0') return {stdout: '', stderr: metadata +
        (audio ? '  Stream #0:1: Audio: opus\n' : '') + 'Stream mapping:\n  Stream #0:0 -> #0:0 (vp9 -> png)\nOutput #0, image2'};
      assert.deepEqual(options, {binary: true});
      if (fail) throw new Error('Decoder failed');
      let output = Buffer.concat(Array.from({length: count}, (_, i) =>
        wrongFrame && i === count - 1 ? encodePng({width: 1, height: 1, pixels: Buffer.alloc(4)}) : f.bytes));
      if (truncated) output = output.subarray(0, -1);
      if (trailing) output = Buffer.concat([output, f.bytes.subarray(0, 8)]);
      if (corrupt) output.writeUInt8(output.at(-1) ^ 1, output.length - 1);
      return {stdout: output, stderr: ''};
    };
  }
  assert.equal(validateMedia(file, 'webm', f.output, tools, decoder()).decodedFrames, 100);
  for (const options of [{count: 99}, {count: 751}, {wrongFrame: true}, {fail: true}, {audio: true},
    {truncated: true}, {trailing: true}, {corrupt: true}]) {
    assert.throws(() => validateMedia(file, 'webm', f.output, tools, decoder(options)), /count|dimensions|failed|stream|Truncated|checksum/);
  }
  assert.deepEqual(fs.readdirSync(f.output).sort(), originalFiles);
});

test('MP4 and WebP validation rejects incompatible streams, codecs, rotation and renamed bytes', t => {
  const stream = {codec_type: 'video', codec_name: 'h264', pix_fmt: 'yuv420p', width: 8, height: 6,
    avg_frame_rate: '25/1', duration: '4'};
  assert.equal(probeMetadata({streams: [stream]}, 'mp4').durationSeconds, 4);
  for (const change of [{codec_name: 'vp9'}, {pix_fmt: 'yuv444p'}, {width: 7}, {avg_frame_rate: '30/1'},
    {duration: '40'}, {side_data_list: [{rotation: 90}]}]) {
    assert.throws(() => probeMetadata({streams: [{...stream, ...change}]}, 'mp4'), /MP4|Rotated/);
  }
  assert.throws(() => probeMetadata({streams: [stream, {codec_type: 'audio'}]}, 'mp4'), /one/);
  const f = fixture(t);
  for (const format of ['mp4', 'webp', 'webm']) assert.throws(() => validateMedia(f.options.input, format, f.output), /container/);
});

test('CLI rejects unknown, duplicate, missing and cross-command flags', () => {
  for (const argv of [['bogus'], ['verify', '--manifest'], ['verify', '--input', 'x'],
    ['verify', '--manifest', 'x', '--manifest', 'x'], ['prepare', '--input', 'x']]) {
    assert.throws(() => main(argv), /Unknown|Missing|Required/);
  }
});
