'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');
const {analyzeVideoMetadata} = require('./capture-video');
const {MAX_BYTES, decodePng, dimensions} = require('./media-png');

/* eslint-disable security/detect-non-literal-fs-filename -- Callers supply verified input and tool paths. */

const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const MAX_DECODE_BYTES = 256 * 1024 * 1024;
const MAX_TEXT_BYTES = 8 * 1024 * 1024;
const PNG_SIGNATURE = Buffer.from('89504e470d0a1a0a', 'hex');

function runTool(executable, args, {binary = false, maxBuffer = binary ? MAX_DECODE_BYTES : MAX_TEXT_BYTES} = {}) {
  if (!Number.isInteger(maxBuffer) || maxBuffer < 1 || maxBuffer > (binary ? MAX_DECODE_BYTES : MAX_TEXT_BYTES)) {
    throw new Error('Invalid media tool buffer budget.');
  }
  const result = spawnSync(executable, args, {encoding: binary ? null : 'utf8', windowsHide: true, timeout: 120000, maxBuffer});
  if (result.error?.code === 'ENOBUFS' || result.stdout?.length > maxBuffer || result.stderr?.length > maxBuffer) {
    throw new Error(`Media tool output exceeded the ${maxBuffer}-byte buffer budget; partial output is not accepted.`);
  }
  const stderr = Buffer.isBuffer(result.stderr) ? result.stderr.toString('utf8', 0, MAX_TEXT_BYTES) : result.stderr || '';
  if (result.error || result.status !== 0) {
    throw new Error(`Media tool failed (${path.basename(executable)}): ${result.error?.message || stderr || `exit ${result.status}`}`);
  }
  if (result.stderr?.length > MAX_TEXT_BYTES) throw new Error('Media tool diagnostics exceeded the 8 MiB budget.');
  return {stdout: result.stdout || (binary ? Buffer.alloc(0) : ''), stderr};
}

function* pngFrames(bytes, budget = MAX_DECODE_BYTES) {
  if (!Number.isInteger(budget) || budget < 1 || budget > MAX_DECODE_BYTES) throw new Error('Invalid decoded PNG buffer budget.');
  if (!Buffer.isBuffer(bytes)) throw new Error('Decoded PNG output must be binary.');
  if (bytes.length > budget) throw new Error(`Decoded PNG output exceeded the ${budget}-byte buffer budget.`);
  let offset = 0;
  while (offset < bytes.length) {
    const start = offset;
    if (!bytes.subarray(offset, offset + 8).equals(PNG_SIGNATURE)) throw new Error('Truncated or invalid decoded PNG signature.');
    offset += 8;
    while (true) {
      if (bytes.length - offset < 12) throw new Error('Truncated decoded PNG chunk or missing IEND.');
      const length = bytes.readUInt32BE(offset);
      if (length > bytes.length - offset - 12) throw new Error('Truncated decoded PNG chunk.');
      if (offset + length + 12 - start > MAX_BYTES) throw new Error('A decoded PNG frame exceeds 50 MiB.');
      const type = bytes.toString('ascii', offset + 4, offset + 8);
      offset += length + 12;
      if (type === 'IEND') {
        if (length !== 0) throw new Error('Invalid decoded PNG IEND.');
        yield bytes.subarray(start, offset);
        break;
      }
    }
  }
}

function toolPath(value, name) {
  if (typeof value !== 'string' || !path.isAbsolute(value)) {
    throw new Error(`Prerequisite: supply an absolute --${name} path to an approved installed binary. No tools are downloaded.`);
  }
  const resolved = fs.realpathSync(value);
  if (!fs.statSync(resolved).isFile()) throw new Error(`Prerequisite: --${name} must be a regular file.`);
  return resolved;
}

function conversionTools(format, tools, run = runTool) {
  const ffmpeg = toolPath(tools.ffmpeg, 'ffmpeg');
  toolPath(tools.ffprobe, 'ffprobe');
  const required = format === 'webp' ? 'libwebp' : 'libx264';
  const listing = run(ffmpeg, ['-nostdin', '-hide_banner', '-encoders']);
  if (!`${listing.stdout}\n${listing.stderr}`.split(/\r?\n/).some(line =>
    line.trim().split(/\s+/).at(1) === required)) {
    throw new Error(`Prerequisite: FFmpeg with ${required} encoding and a matching full ffprobe is required. The minimal Playwright build cannot convert to ${format}.`);
  }
}

function readMedia(file) {
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.size < 1 || stat.size > MAX_BYTES) throw new Error('Media must be a regular file of 1 byte to 50 MiB.');
  const bytes = fs.readFileSync(file);
  if (bytes.length > MAX_BYTES) throw new Error('Media grew beyond 50 MiB.');
  return bytes;
}

function imageMetadata(image) {
  return {width: image.width, height: image.height, pixelSha256: sha256(image.pixels), decodedFrames: 1};
}

function probeMetadata(value, format) {
  const streams = value?.streams;
  if (!Array.isArray(streams) || streams.length !== 1 || streams[0].codec_type !== 'video') {
    throw new Error('Media must have exactly one video/image stream and no audio or other streams.');
  }
  const stream = streams[0];
  dimensions(stream.width, stream.height);
  if (format === 'webp') {
    if (stream.codec_name !== 'webp') throw new Error('Output is not WebP.');
    return {width: stream.width, height: stream.height};
  }
  const rate = /^(\d+)\/(\d+)$/.exec(stream.avg_frame_rate || '');
  const fps = rate ? Number(rate[1]) / Number(rate[2]) : NaN;
  const durationSeconds = Number(stream.duration || value.format?.duration);
  if (stream.codec_name !== 'h264' || stream.pix_fmt !== 'yuv420p' ||
      stream.width % 2 || stream.height % 2 || fps !== 25 ||
      !Number.isFinite(durationSeconds) || durationSeconds < 4 || durationSeconds > 30) {
    throw new Error('MP4 must contain H.264 yuv420p video, even dimensions, 25 fps, and 4-30 seconds.');
  }
  if (stream.side_data_list?.some(item => item.rotation && item.rotation !== 0) || stream.tags?.rotate) {
    throw new Error('Rotated video requires separate preparation.');
  }
  return {width: stream.width, height: stream.height, fps, durationSeconds};
}

function assertFastStart(bytes) {
  let offset = 0, moov = -1, mdat = -1;
  while (offset + 8 <= bytes.length) {
    let length = bytes.readUInt32BE(offset);
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    let minimum = 8;
    if (length === 1) {
      if (offset + 16 > bytes.length) throw new Error('Truncated MP4 box.');
      const extended = bytes.readBigUInt64BE(offset + 8);
      if (extended > BigInt(bytes.length)) throw new Error('Invalid MP4 box size.');
      length = Number(extended); minimum = 16;
    } else if (length === 0) {
      length = bytes.length - offset;
    }
    if (length < minimum || offset + length > bytes.length) throw new Error('Invalid MP4 box.');
    if (type === 'moov') moov = offset;
    if (type === 'mdat' && mdat === -1) mdat = offset;
    offset += length;
  }
  if (offset !== bytes.length || moov < 0 || mdat < 0 || moov > mdat) {
    throw new Error('Prepared MP4 must have fast-start metadata before video data.');
  }
}

function validateMedia(file, format, _work, tools = {}, run = runTool, final = false) {
  const bytes = readMedia(file);
  if (format === 'png') return {format, ...imageMetadata(decodePng(bytes))};
  if (!['webp', 'webm', 'mp4'].includes(format)) throw new Error('Unsupported media format.');
  if (format === 'webp' && (bytes.toString('ascii', 0, 4) !== 'RIFF' ||
      bytes.toString('ascii', 8, 12) !== 'WEBP' || bytes.readUInt32LE(4) + 8 !== bytes.length)) {
    throw new Error('Expected a complete WebP container, not renamed bytes.');
  }
  if (format === 'webm' && (!bytes.subarray(0, 4).equals(Buffer.from('1a45dfa3', 'hex')) ||
      !bytes.subarray(0, 4096).includes(Buffer.from('4282847765626d', 'hex')))) {
    throw new Error('Expected a WebM container, not renamed bytes.');
  }
  if (format === 'mp4') {
    if (bytes.toString('ascii', 4, 8) !== 'ftyp') throw new Error('Expected an MP4 container, not renamed bytes.');
    if (final) assertFastStart(bytes);
  }
  const ffmpeg = toolPath(tools.ffmpeg, 'ffmpeg');
  const baseArgs = ['-nostdin', '-hide_banner', '-n', '-xerror', '-err_detect', 'explode', '-protocol_whitelist', 'file,pipe', '-i', file];
  let metadata;
  if (format === 'webm') {
    const probe = run(ffmpeg, [...baseArgs, '-an', '-frames:v', '0', '-c:v', 'png', '-threads', '1', '-f', 'image2', '-update', '1', 'pipe:1']);
    if (probe.stdout.length) throw new Error('Metadata probe unexpectedly emitted image data.');
    const input = probe.stderr.split('Output #')[0];
    const streams = input.split(/\r?\n/).filter(line => /^\s*Stream #0:\d+[:[(]/.test(line));
    const size = streams.length === 1 && /,\s*(\d+)x(\d+)(?:\s|,|\[)/.exec(streams[0]);
    if (!size) throw new Error('WebM must have one VP9 video stream and no audio.');
    dimensions(Number(size[1]), Number(size[2]));
    metadata = analyzeVideoMetadata(input, Number(size[1]), Number(size[2]));
  } else {
    const ffprobe = toolPath(tools.ffprobe, 'ffprobe');
    const probe = run(ffprobe, ['-v', 'error', '-protocol_whitelist', 'file,pipe', '-show_streams', '-show_format', '-of', 'json', file]);
    metadata = probeMetadata(JSON.parse(probe.stdout), format);
  }
  const decoded = run(ffmpeg, [...baseArgs, '-map', '0:v:0', '-an', '-sn', '-dn', '-fps_mode', 'passthrough',
    '-frames:v', format === 'webp' ? '2' : '751', '-c:v', 'png', '-threads', '1',
    '-f', 'image2', '-update', '1', 'pipe:1'], {binary: true});
  // FFmpeg can log decoding errors and still exit successfully in some builds.
  if (/\b(corrupt|invalid data|error while|decoding error)\b/i.test(decoded.stderr)) throw new Error('Media decode reported corruption.');
  let pixelSha256, decodedFrames = 0;
  for (const frame of pngFrames(decoded.stdout)) {
    decodedFrames++;
    if (decodedFrames > (format === 'webp' ? 1 : 750)) throw new Error('Decoded frame count exceeds the supported limit.');
    const image = decodePng(frame, format === 'webp');
    if (image.width !== metadata.width || image.height !== metadata.height) throw new Error('A decoded frame changed dimensions.');
    if (format === 'webp') pixelSha256 = sha256(image.pixels);
  }
  if (format === 'webp' ? decodedFrames !== 1 :
    decodedFrames < 100 || Math.abs(decodedFrames / 25 - metadata.durationSeconds) > 0.2) {
    throw new Error('Full decoded frame count does not match the bounded duration.');
  }
  return {format, ...metadata, decodedFrames, ...(pixelSha256 ? {pixelSha256} : {})};
}

function convertMedia(input, output, frame, tools, run = runTool) {
  conversionTools(frame.format, tools, run);
  const {crop: c, padding: p} = frame;
  const filters = `crop=${c.width}:${c.height}:${c.x}:${c.y},pad=${frame.width}:${frame.height}:${p.left}:${p.top}:color=0x${frame.background.slice(1)}`;
  const encoding = frame.format === 'webp' ?
    ['-c:v', 'libwebp', '-lossless', '1', '-compression_level', '6', '-frames:v', '1'] :
    ['-c:v', 'libx264', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart'];
  run(toolPath(tools.ffmpeg, 'ffmpeg'), [
    '-nostdin', '-hide_banner', '-n', '-xerror', '-err_detect', 'explode', '-protocol_whitelist', 'file,pipe',
    '-i', input, '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-map_chapters', '-1',
    '-vf', filters, '-fps_mode', 'passthrough', ...encoding, output
  ]);
}

module.exports = {MAX_DECODE_BYTES, assertFastStart, conversionTools, convertMedia, imageMetadata, pngFrames, probeMetadata, readMedia, runTool, sha256, toolPath, validateMedia};
