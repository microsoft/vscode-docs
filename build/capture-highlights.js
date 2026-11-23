'use strict';

const {locate} = require('./storyboard');

function pixelRectangle(bounds, scale, padding, strokeWidth, width, height) {
  if (!bounds || ![bounds.x, bounds.y, bounds.width, bounds.height, scale].every(Number.isFinite) ||
      bounds.width <= 0 || bounds.height <= 0 || scale <= 0 ||
      !Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0 ||
      !Number.isInteger(padding) || padding < -32 || padding > 32 ||
      !Number.isInteger(strokeWidth) || strokeWidth < 1 || strokeWidth > 3) {
    throw new Error('Invalid highlight bounds, scale, padding, or stroke width.');
  }
  const x = Math.floor(bounds.x * scale) - padding;
  const y = Math.floor(bounds.y * scale) - padding;
  const right = Math.ceil((bounds.x + bounds.width) * scale) + padding;
  const bottom = Math.ceil((bounds.y + bounds.height) * scale) + padding;
  if (x < 0 || y < 0 || right > width || bottom > height ||
      right - x <= 2 * strokeWidth || bottom - y <= 2 * strokeWidth) {
    throw new Error('Highlight would be clipped or have no interior. Adjust the target or padding.');
  }
  return {x, y, width: right - x, height: bottom - y};
}

async function collectHighlightRectangles(page, storyboard) {
  const {profile, capture} = storyboard;
  const viewport = await page.evaluate(() => ({
    width: innerWidth, height: innerHeight, devicePixelRatio
  }));
  const expectedScale = profile.deviceScaleFactor * Math.pow(1.2, profile.zoomLevel);
  if (![viewport.width, viewport.height, viewport.devicePixelRatio].every(Number.isFinite) ||
      Math.abs(viewport.devicePixelRatio - expectedScale) >= 0.001 ||
      Math.abs(viewport.width * viewport.devicePixelRatio - profile.width) > 1 ||
      Math.abs(viewport.height * viewport.devicePixelRatio - profile.height) > 1) {
    throw new Error('Viewport or zoom changed before highlight measurement.');
  }
  const strokeWidth = capture.highlights.strokeWidth ?? 2;
  const rectangles = [];
  for (const item of capture.highlights.targets) {
    const locator = locate(page, storyboard.targets, item.target);
    await locator.waitFor({state: 'visible'});
    const bounds = await locator.boundingBox();
    try {
      rectangles.push({
        target: item.target,
        padding: item.padding ?? 6,
        ...pixelRectangle(bounds, viewport.devicePixelRatio, item.padding ?? 6, strokeWidth, profile.width, profile.height)
      });
    } catch (error) {
      throw new Error(`Cannot highlight "${item.target}": ${error.message}`, {cause: error});
    }
  }
  return rectangles;
}

function assertStableHighlights(before, after) {
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    throw new Error('Highlight targets moved during capture. Wait for the UI to settle before retrying.');
  }
}

// Runs in Electron's main process without module closures. Windows nativeImage bitmaps are BGRA.
function renderHighlights({nativeImage}, {png, width, height, rectangles, strokeWidth}) {
  if (!Number.isInteger(strokeWidth) || strokeWidth < 1 || strokeWidth > 3 ||
      !Array.isArray(rectangles) || rectangles.length < 1 || rectangles.length > 10) {
    throw new Error('Highlights require 1-10 rectangles and a 1-3 pixel stroke.');
  }
  const image = nativeImage.createFromBuffer(Buffer.from(png, 'base64'));
  if (image.isEmpty() || image.getSize().width !== width || image.getSize().height !== height) {
    throw new Error('Cannot decode the source screenshot at its original dimensions.');
  }
  const original = image.toBitmap();
  if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0 ||
      original.length !== width * height * 4) {
    throw new Error('Unexpected screenshot bitmap layout.');
  }
  const pixels = Buffer.from(original);
  for (const rectangle of rectangles) {
    const {x, y, width: w, height: h} = rectangle;
    if (![x, y, w, h].every(Number.isInteger) || x < 0 || y < 0 || x + w > width || y + h > height ||
        w <= 2 * strokeWidth || h <= 2 * strokeWidth) {
      throw new Error('Highlight rectangle is outside the screenshot or has no interior.');
    }
    for (let row = y; row < y + h; row++) {
      for (let column = x; column < x + w; column++) {
        if (row < y + strokeWidth || row >= y + h - strokeWidth ||
            column < x + strokeWidth || column >= x + w - strokeWidth) {
          pixels.writeUInt32LE(0xffff0000, (row * width + column) * 4);
        }
      }
    }
  }
  const encoded = nativeImage.createFromBitmap(pixels, {width, height, scaleFactor: 1}).toPNG();
  const decoded = nativeImage.createFromBuffer(encoded);
  if (decoded.isEmpty() || decoded.getSize().width !== width || decoded.getSize().height !== height ||
      !decoded.toBitmap().equals(pixels)) {
    throw new Error('PNG encoding changed the annotated pixels or dimensions.');
  }
  let borderPixels = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const border = rectangles.some(r => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height &&
        (x < r.x + strokeWidth || x >= r.x + r.width - strokeWidth ||
         y < r.y + strokeWidth || y >= r.y + r.height - strokeWidth));
      if (border) {
        borderPixels++;
        if (pixels.readUInt32LE(offset) !== 0xffff0000) {
          throw new Error('A highlight border pixel is not opaque red.');
        }
      } else if (pixels.readUInt32LE(offset) !== original.readUInt32LE(offset)) {
        throw new Error('A pixel outside the highlight borders changed.');
      }
    }
  }
  return {
    png: encoded.toString('base64'),
    verification: {borderPixels, allOtherPixelsUnchanged: true, encodedPixelsVerified: true}
  };
}

module.exports = {assertStableHighlights, collectHighlightRectangles, pixelRectangle, renderHighlights};
