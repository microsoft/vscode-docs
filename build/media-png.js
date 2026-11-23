'use strict';

const zlib = require('zlib');

const SIGNATURE = Buffer.from('89504e470d0a1a0a', 'hex');
const MAX_BYTES = 50 * 1024 * 1024;
const MAX_PIXELS = 8 * 1024 * 1024;

function dimensions(width, height) {
  if (![width, height].every(Number.isInteger) || width < 1 || height < 1 ||
      width > 4096 || height > 4096 || width * height > MAX_PIXELS) {
    throw new Error('Media dimensions must be 1-4096 pixels per side and at most eight megapixels.');
  }
}

function keys(object, allowed, label) {
  if (!object || typeof object !== 'object' || Array.isArray(object) ||
      Object.keys(object).some(key => !allowed.includes(key))) {
    throw new Error(`Invalid ${label} fields.`);
  }
}

function framing(width, height, recipe) {
  dimensions(width, height);
  keys(recipe, ['format', 'crop', 'padding', 'background'], 'recipe');
  if (!['png', 'webp', 'mp4', 'webm'].includes(recipe.format)) throw new Error('Unsupported output format.');
  const crop = recipe.crop === undefined ? {x: 0, y: 0, width, height} : recipe.crop;
  keys(crop, ['x', 'y', 'width', 'height'], 'crop');
  if (![crop.x, crop.y, crop.width, crop.height].every(Number.isInteger) ||
      crop.x < 0 || crop.y < 0 || crop.width < 1 || crop.height < 1 ||
      crop.x + crop.width > width || crop.y + crop.height > height) {
    throw new Error('Crop must be an integer rectangle entirely inside the source.');
  }
  const padding = recipe.padding === undefined ? {top: 0, right: 0, bottom: 0, left: 0} : recipe.padding;
  keys(padding, ['top', 'right', 'bottom', 'left'], 'padding');
  if (![padding.top, padding.right, padding.bottom, padding.left].every(n => Number.isInteger(n) && n >= 0 && n <= 256)) {
    throw new Error('Supply all four padding edges as integers from 0 to 256.');
  }
  const background = recipe.background === undefined ? '#1F1F1F' : recipe.background;
  if (typeof background !== 'string' || !/^#[a-f0-9]{6}$/i.test(background)) throw new Error('Background must be #RRGGBB.');
  const result = {
    format: recipe.format, crop: {...crop}, padding: {...padding}, background: background.toUpperCase(),
    width: crop.width + padding.left + padding.right, height: crop.height + padding.top + padding.bottom
  };
  dimensions(result.width, result.height);
  if (recipe.format === 'mp4' && (result.width % 2 || result.height % 2 ||
      crop.x % 2 || crop.y % 2 || crop.width % 2 || crop.height % 2 || padding.left % 2 || padding.top % 2)) {
    throw new Error('H.264 requires even crop coordinates, crop dimensions, top/left padding, and final dimensions. No rounding is applied.');
  }
  return result;
}

const crcTable = Array.from({length: 256}, (_, value) => {
  for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = (crc >>> 8) ^ crcTable.at((crc ^ byte) & 255);
  return (crc ^ 0xffffffff) >>> 0;
}

function predictor(filter, left, above, upperLeft) {
  if (filter === 0) return 0;
  if (filter === 1) return left;
  if (filter === 2) return above;
  if (filter === 3) return Math.floor((left + above) / 2);
  const p = left + above - upperLeft;
  const a = Math.abs(p - left), b = Math.abs(p - above), c = Math.abs(p - upperLeft);
  return a <= b && a <= c ? left : b <= c ? above : upperLeft;
}

// Deliberately bounded to the noninterlaced, 8-bit RGB/RGBA PNGs produced by the capture runner.
function decodePng(bytes, includePixels = true) {
  if (!Buffer.isBuffer(bytes) || bytes.length > MAX_BYTES || !bytes.subarray(0, 8).equals(SIGNATURE)) {
    throw new Error('Expected a PNG no larger than 50 MiB.');
  }
  let offset = 8, header, ended = false, dataEnded = false;
  const compressed = [];
  while (offset + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(offset);
    if (length > bytes.length - offset - 12) throw new Error('Truncated PNG chunk.');
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    if (crc32(bytes.subarray(offset + 4, offset + 8 + length)) !== bytes.readUInt32BE(offset + 8 + length)) {
      throw new Error('PNG chunk checksum failed.');
    }
    if (!header && type !== 'IHDR') throw new Error('PNG must start with IHDR.');
    if (type === 'IHDR') {
      if (header || length !== 13) throw new Error('Invalid PNG header.');
      header = {width: data.readUInt32BE(0), height: data.readUInt32BE(4), channels: data.at(9) === 2 ? 3 : 4};
      dimensions(header.width, header.height);
      if (data.at(8) !== 8 || ![2, 6].includes(data.at(9)) || data.at(10) || data.at(11) || data.at(12)) {
        throw new Error('Only noninterlaced 8-bit RGB/RGBA PNGs are supported; palette, grayscale, and animated PNGs require separate preparation.');
      }
    } else if (type === 'IDAT') {
      if (dataEnded) throw new Error('PNG IDAT chunks must be consecutive.');
      compressed.push(data);
    } else if (type === 'IEND') {
      if (length || !compressed.length) throw new Error('Invalid PNG end.');
      ended = true;
    } else {
      if (['acTL', 'fcTL', 'fdAT', 'tRNS'].includes(type) || !/^[a-z][A-Za-z]{3}$/.test(type)) {
        throw new Error(`Unsupported PNG chunk: ${type}`);
      }
      if (compressed.length) dataEnded = true;
    }
    offset += length + 12;
    if (ended) break;
  }
  if (!ended || offset !== bytes.length) throw new Error('PNG is incomplete or has trailing data.');
  const {width, height, channels} = header;
  const stride = width * channels;
  const compressedBytes = Buffer.concat(compressed);
  const inflated = zlib.inflateSync(compressedBytes, {maxOutputLength: (stride + 1) * height, info: true});
  if (inflated.engine.bytesWritten !== compressedBytes.length) throw new Error('PNG has trailing compressed data.');
  const raw = inflated.buffer;
  if (raw.length !== (stride + 1) * height) throw new Error('PNG decompressed size is incorrect.');
  // FFmpeg already reconstructs video pixels. Still check every emitted PNG's complete deflate stream and row filters.
  if (!includePixels) {
    for (let y = 0; y < height; y++) {
      if (raw.at(y * (stride + 1)) > 4) throw new Error('Unsupported PNG row filter.');
    }
    return {width, height};
  }
  const pixels = Buffer.alloc(width * height * 4);
  let previous = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw.at(y * (stride + 1));
    if (filter > 4) throw new Error('Unsupported PNG row filter.');
    const row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      row.writeUInt8((row.at(x) + predictor(filter, x >= channels ? row.at(x - channels) : 0,
        previous.at(x), x >= channels ? previous.at(x - channels) : 0)) & 255, x);
    }
    for (let x = 0; x < width; x++) {
      row.copy(pixels, (y * width + x) * 4, x * channels, x * channels + channels);
      if (channels === 3) pixels.writeUInt8(255, (y * width + x) * 4 + 3);
    }
    previous = row;
  }
  return {width, height, pixels};
}

function chunk(type, data) {
  const bytes = Buffer.alloc(data.length + 12);
  bytes.writeUInt32BE(data.length);
  bytes.write(type, 4, 'ascii');
  data.copy(bytes, 8);
  bytes.writeUInt32BE(crc32(bytes.subarray(4, -4)), bytes.length - 4);
  return bytes;
}

function encodePng({width, height, pixels}) {
  dimensions(width, height);
  if (!Buffer.isBuffer(pixels) || pixels.length !== width * height * 4) throw new Error('Invalid RGBA bitmap.');
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header.writeUInt8(8, 8); header.writeUInt8(6, 9);
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    let best, bestScore = Infinity, bestFilter;
    for (const filter of [0, 1, 2, 4]) {
      const row = Buffer.alloc(stride);
      let score = 0;
      for (let x = 0; x < stride; x++) {
        const i = y * stride + x;
        const value = (pixels.at(i) - predictor(filter, x >= 4 ? pixels.at(i - 4) : 0,
          y ? pixels.at(i - stride) : 0, y && x >= 4 ? pixels.at(i - stride - 4) : 0)) & 255;
        row.writeUInt8(value, x);
        score += Math.min(value, 256 - value);
      }
      if (score < bestScore) { best = row; bestScore = score; bestFilter = filter; }
    }
    raw.writeUInt8(bestFilter, y * (stride + 1));
    best.copy(raw, y * (stride + 1) + 1);
  }
  return Buffer.concat([SIGNATURE, chunk('IHDR', header), chunk('IDAT', zlib.deflateSync(raw, {level: 9})), chunk('IEND', Buffer.alloc(0))]);
}

function framePng(image, frame) {
  const {width, height, crop, padding, background} = frame;
  const pixels = Buffer.alloc(width * height * 4);
  const color = Buffer.from(`${background.slice(1)}ff`, 'hex');
  pixels.fill(color);
  for (let y = 0; y < crop.height; y++) {
    const start = ((crop.y + y) * image.width + crop.x) * 4;
    image.pixels.copy(pixels, ((y + padding.top) * width + padding.left) * 4, start, start + crop.width * 4);
  }
  const encoded = encodePng({width, height, pixels});
  if (!decodePng(encoded).pixels.equals(pixels)) throw new Error('PNG encoding changed the framed pixels.');
  return encoded;
}

module.exports = {MAX_BYTES, crc32, decodePng, dimensions, encodePng, framePng, framing, keys};
