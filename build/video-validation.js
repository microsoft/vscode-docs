'use strict';

function durationLimit(value = 30) {
  if (!Number.isInteger(value) || value < 4 || value > 120) throw new Error('Video duration limit must be 4-120 seconds.');
  return value;
}

function decodeVideoFrames(file, metadata, maximum, run, encoder) {
  const limit = durationLimit(maximum) * 25;
  const result = run(encoder, [
    '-nostdin', '-hide_banner', '-n', '-xerror', '-err_detect', 'explode', '-protocol_whitelist', 'file,pipe',
    '-i', file, '-map', '0:v:0', '-an', '-sn', '-dn', '-vf', 'showinfo', '-fps_mode', 'passthrough',
    '-frames:v', String(limit + 1), '-f', 'null', '-'
  ]);
  if (/\b(corrupt|invalid data|error while|decoding error)\b/i.test(result.stderr)) throw new Error('Media decode reported corruption.');
  let count = 0, firstTime;
  for (const line of result.stderr.split(/\r?\n/)) {
    if (!/\[Parsed_showinfo_\d+ @/.test(line) || !/\bn:\s*\d+/.test(line)) continue;
    const frame = /\bn:\s*(\d+)\s+pts:\s*-?\d+\s+pts_time:([-\d.e+]+).*?\bs:(\d+)x(\d+)\b/.exec(line);
    if (!frame) throw new Error('Cannot verify a decoded video frame.');
    const [, index, timestamp, width, height] = frame;
    const time = Number(timestamp);
    firstTime ??= time;
    if (Number(index) !== count || !Number.isFinite(time) || Number(width) !== metadata.width || Number(height) !== metadata.height ||
        Math.abs(time - firstTime - count / 25) > 0.002) {
      throw new Error('Decoded video frames changed dimensions, timing, or sequence.');
    }
    if (++count > limit) throw new Error('Decoded frame count exceeds the approved duration.');
  }
  if (count < 100 || Math.abs(count / 25 - metadata.durationSeconds) > 0.2) {
    throw new Error('Full decoded frame count does not match the bounded duration.');
  }
  return {decodedFrames: count, method: 'ffmpeg-showinfo'};
}

module.exports = {decodeVideoFrames, durationLimit};
