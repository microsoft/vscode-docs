'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const MarkdownIt = require('markdown-it');
const media = require('./media');

/* eslint-disable security/detect-non-literal-fs-filename -- The caller supplies owned, explicitly approved media artifacts. */

const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function verifyAsset(asset) {
  const prepared = media.verifyMedia({ manifest: asset.manifest });
  if (prepared.approval !== 'approved' || prepared.output !== asset.source || prepared.manifestSha256 !== asset.manifestHash ||
      prepared.manifest.output.sha256 !== asset.sha256 ||
      hash(fs.readFileSync(path.join(prepared.directory, 'review.json'))) !== asset.reviewHash) {
    throw new Error('Approved media changed. Review the exact asset again before drafting.');
  }
  const bytes = fs.readFileSync(prepared.output);
  if (hash(bytes) !== asset.sha256) throw new Error('Approved media bytes changed.');
  return bytes;
}

function markdown(asset) {
  const alt = asset.altText.replace(/[\\[\]]/g, '\\$&');
  return `![${alt}](${asset.reference})`;
}

function assertDescription(content, asset) {
  const parser = new MarkdownIt();
  const images = parser.parse(content, {}).flatMap(token => token.children || [])
    .filter(token => token.type === 'image' && token.attrGet('src') === asset.reference);
  if (!images.length || images.some(image => parser.renderer.renderInlineAsText(image.children, parser.options, {}) !== asset.altText)) {
    throw new Error('Use the approved screenshot reference and alt text in the draft.');
  }
}

module.exports = { verifyAsset, markdown, assertDescription };
