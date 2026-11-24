'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const {assertStableHighlights, collectHighlightRectangles, pixelRectangle, renderHighlights} = require('./capture-highlights');

function bitmapPacket(width, height, pixels) {
  const header = Buffer.alloc(8);
  header.writeUInt32LE(width, 0);
  header.writeUInt32LE(height, 4);
  return Buffer.concat([header, pixels]);
}

function fakeNativeImage(corrupt = false) {
  return {
    createFromBuffer: bytes => ({
      isEmpty: () => false,
      getSize: () => ({width: bytes.readUInt32LE(0), height: bytes.readUInt32LE(4)}),
      toBitmap: () => bytes.subarray(8)
    }),
    createFromBitmap: (bytes, {width, height}) => ({
      toPNG: () => {
        const pixels = Buffer.from(bytes);
        if (corrupt) pixels[0] ^= 1;
        return bitmapPacket(width, height, pixels);
      }
    })
  };
}

test('maps CSS bounds to image pixels at both supported zoom levels without scaling the stroke', () => {
  assert.deepEqual(pixelRectangle({x: 10, y: 15, width: 20, height: 8}, 1.44, 6, 2, 1920, 1080),
    {x: 8, y: 15, width: 42, height: 25});
  const scale = Math.pow(1.2, 1.5);
  assert.deepEqual(pixelRectangle({x: 100, y: 50, width: 200, height: 100}, scale, -4, 3, 1920, 1080),
    {x: 135, y: 69, width: 256, height: 125});
  for (const [bounds, padding, stroke] of [
    [null, 6, 2],
    [{x: 0, y: 0, width: 20, height: 20}, 6, 2],
    [{x: 0, y: 0, width: 1920, height: 1080}, 0, 2],
    [{x: 10, y: 10, width: 8, height: 8}, -4, 2],
    [{x: 10, y: 10, width: 20, height: 20}, 0, 4]
  ]) {
    assert.throws(() => pixelRectangle(bounds, 1.44, padding, stroke, 1920, 1080), /Invalid highlight|clipped|no interior/);
  }
});

test('collects named highlight targets and rejects hidden targets or changed geometry', async () => {
  let bounds = {x: 100, y: 100, width: 200, height: 40};
  const page = {
    evaluate: async () => ({width: 1333, height: 750, devicePixelRatio: 1.44}),
    getByRole: (role, options) => {
      assert.equal(role, 'button');
      assert.equal(options.name, 'Create configuration');
      return {waitFor: async () => {}, boundingBox: async () => bounds};
    }
  };
  const storyboard = {
    profile: {width: 1920, height: 1080, deviceScaleFactor: 1, zoomLevel: 2},
    targets: {create: {role: 'button', name: 'Create configuration'}},
    capture: {highlights: {targets: [{target: 'create'}]}}
  };
  const before = await collectHighlightRectangles(page, storyboard);
  assert.deepEqual(before, [{target: 'create', padding: 6, x: 138, y: 138, width: 300, height: 70}]);
  assertStableHighlights(before, await collectHighlightRectangles(page, storyboard));
  bounds = {...bounds, x: 101};
  assert.throws(() => assertStableHighlights(before, [{...before[0], x: 139}]), /moved during capture/);
  bounds = null;
  await assert.rejects(() => collectHighlightRectangles(page, storyboard), /Cannot highlight "create"/);
  page.evaluate = async () => ({width: 1920, height: 1080, devicePixelRatio: 1});
  await assert.rejects(() => collectHighlightRectangles(page, storyboard), /Viewport or zoom changed/);
});

test('draws exact 1-3 pixel red borders and preserves every other pixel and source byte', () => {
  const width = 32;
  const height = 24;
  const original = Buffer.alloc(width * height * 4);
  for (let index = 0; index < width * height; index++) {
    original.writeUInt32LE((0xff000000 | (index * 7919)) >>> 0, index * 4);
  }
  const packet = bitmapPacket(width, height, original);
  const rectangles = [{x: 3, y: 3, width: 12, height: 10}, {x: 18, y: 4, width: 10, height: 16}];
  for (const strokeWidth of [1, 2, 3]) {
    const result = renderHighlights({nativeImage: fakeNativeImage()}, {
      png: packet.toString('base64'), width, height, rectangles, strokeWidth
    });
    const pixels = Buffer.from(result.png, 'base64').subarray(8);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const rectangle = rectangles.find(r => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height);
        const border = rectangle && Math.min(x - rectangle.x, rectangle.x + rectangle.width - 1 - x,
          y - rectangle.y, rectangle.y + rectangle.height - 1 - y) < strokeWidth;
        const offset = (y * width + x) * 4;
        assert.equal(pixels.readUInt32LE(offset), border ? 0xffff0000 : original.readUInt32LE(offset));
      }
    }
    assert.ok(packet.subarray(8).equals(original));
    assert.equal(result.verification.allOtherPixelsUnchanged, true);
    assert.equal(result.verification.encodedPixelsVerified, true);
  }
  const options = {png: packet.toString('base64'), width, height, rectangles, strokeWidth: 2};
  assert.throws(() => renderHighlights({nativeImage: fakeNativeImage(true)}, options), /PNG encoding changed/);
  assert.throws(() => renderHighlights({nativeImage: fakeNativeImage()}, {...options, strokeWidth: 4}), /1-3 pixel stroke/);
  assert.throws(() => renderHighlights({nativeImage: fakeNativeImage()}, {
    ...options, rectangles: [{x: 30, y: 2, width: 10, height: 10}]
  }), /outside the screenshot/);
});
