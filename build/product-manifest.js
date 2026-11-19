'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/* eslint-disable security/detect-non-literal-fs-filename -- Input paths are explicitly supplied by the caller. */

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function validateMetadata(manifest) {
  if (!isObject(manifest) || manifest.schemaVersion !== 1) {
    throw new Error('Expected product manifest schemaVersion 1.');
  }
  const { product, sources } = manifest;
  if (!isObject(product) || !['stable', 'insiders'].includes(product.channel) ||
      !isText(product.version) || !/^[a-f0-9]{40}$/i.test(product.revision)) {
    throw new Error('Product metadata requires channel (stable or insiders), version, and a full build revision.');
  }
  if (!Array.isArray(sources) || sources.length === 0) {
    throw new Error('Expected at least one pair of editor and Agents sources.');
  }
  const identities = new Set();
  for (const source of sources) {
    if (!isObject(source) || !['settings', 'keybindings'].includes(source.kind) ||
        !['editor', 'agents'].includes(source.mode) || !['win', 'osx', 'linux'].includes(source.platform) ||
        !isText(source.file)) {
      throw new Error('Each source requires kind, mode, platform, and file.');
    }
    const identity = `${source.kind}:${source.mode}:${source.platform}`;
    if (identities.has(identity)) {
      throw new Error(`Duplicate product source: ${identity}.`);
    }
    identities.add(identity);
  }
  for (const source of sources) {
    const otherMode = source.mode === 'editor' ? 'agents' : 'editor';
    if (!identities.has(`${source.kind}:${otherMode}:${source.platform}`)) {
      throw new Error(`Missing ${otherMode} source for ${source.kind} on ${source.platform}. Capture both window modes.`);
    }
  }
}

function validateEntries(source) {
  if (source.kind === 'settings') {
    if (!isObject(source.entries) || Object.keys(source.entries).length === 0) {
      throw new Error(`${source.file}: Expected a nonempty Default Settings object.`);
    }
    return;
  }
  if (!Array.isArray(source.entries) || source.entries.length === 0) {
    throw new Error(`${source.file}: Expected a nonempty default keybindings array.`);
  }
  for (const [index, entry] of source.entries.entries()) {
    if (!isObject(entry) || !isText(entry.key) || !isText(entry.command) ||
        (Object.hasOwn(entry, 'when') && typeof entry.when !== 'string')) {
      throw new Error(`${source.file}: Invalid keybinding at entry ${index + 1}.`);
    }
  }
  if (Object.hasOwn(source, 'unboundCommands')) {
    if (!Array.isArray(source.unboundCommands)) {
      throw new Error(`${source.file}: Expected an unboundCommands array.`);
    }
    const seen = new Set();
    for (const entry of source.unboundCommands) {
      if (!isObject(entry) || !isText(entry.command) || /[\r\n]/.test(entry.command) ||
          !Number.isInteger(entry.line) || entry.line < 1 || seen.has(entry.command)) {
        throw new Error(`${source.file}: Invalid or duplicate unbound command.`);
      }
      seen.add(entry.command);
    }
  }
}

function validateManifest(manifest) {
  validateMetadata(manifest);
  validateSourceHashes(manifest.sources);
  for (const source of manifest.sources) {
    validateEntries(source);
  }
  return manifest;
}

function validateSourceHashes(sources) {
  for (const source of sources) {
    if (typeof source.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(source.sha256)) {
      throw new Error(`${source.file}: Expected a SHA-256 hash of the raw capture.`);
    }
  }
}

function validateManifestReference(reference) {
  if (!isObject(reference) || typeof reference.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(reference.sha256)) {
    throw new Error('Expected a product manifest reference with a SHA-256 hash.');
  }
  validateMetadata({ schemaVersion: 1, product: reference.product, sources: reference.sources });
  validateSourceHashes(reference.sources);
  return reference;
}

function extractUnboundCommands(text, rootEnd, file) {
  const suffix = text.slice(rootEnd).split(/\r?\n/);
  const header = suffix.findIndex(line => line.trim() === '// Here are other available commands:');
  if (header === -1) {
    return undefined;
  }
  const firstLine = text.slice(0, rootEnd).split('\n').length;
  const commands = [];
  for (const [index, line] of suffix.entries()) {
    if (index <= header || !line.trim()) {
      continue;
    }
    const match = /^\s*\/\/ - (.+)$/.exec(line);
    if (!match) {
      throw new Error(`${file}:${firstLine + index}: Malformed exported command list.`);
    }
    commands.push({ command: match[1], line: firstLine + index });
  }
  return commands;
}

function generateManifest(input, baseDirectory) {
  const { parse, parseTree, printParseErrorCode } = require('jsonc-parser');
  validateMetadata(input);
  const sources = input.sources.map(({ kind, mode, platform, file }) => {
    const content = fs.readFileSync(path.resolve(baseDirectory, file));
    const text = content.toString('utf8').replace(/^\uFEFF/, '');
    const errors = [];
    const entries = parse(text, errors, {
      allowTrailingComma: true
    });
    if (errors.length) {
      const error = errors[0];
      throw new Error(`${file}: Invalid JSONC (${printParseErrorCode(error.error)} at offset ${error.offset}).`);
    }
    const source = { kind, mode, platform, file, sha256: sha256(content), entries };
    if (kind === 'keybindings') {
      const tree = parseTree(text, [], { allowTrailingComma: true });
      if (!tree) {
        throw new Error(`${file}: Expected a JSONC document.`);
      }
      const unboundCommands = extractUnboundCommands(text, tree.offset + tree.length, file);
      if (unboundCommands !== undefined) {
        source.unboundCommands = unboundCommands;
      }
    }
    validateEntries(source);
    return source;
  });
  const { channel, version, revision } = input.product;
  return { schemaVersion: 1, product: { channel, version, revision }, sources };
}

function loadManifest(file, channel) {
  if (!['stable', 'insiders'].includes(channel)) {
    throw new Error('Select --channel stable or insiders when using a product manifest.');
  }
  const content = fs.readFileSync(file);
  const manifest = validateManifest(JSON.parse(content.toString('utf8')));
  if (manifest.product.channel !== channel) {
    throw new Error(`Product manifest channel "${manifest.product.channel}" does not match requested channel "${channel}".`);
  }
  return {
    manifest,
    reference: {
      sha256: sha256(content),
      product: manifest.product,
      sources: manifest.sources.map(({ entries, unboundCommands, ...source }) => source)
    }
  };
}

function createEvidenceLookup(manifest) {
  const indexes = new Map();
  function add(kind, id, evidence) {
    if (!indexes.has(kind)) {
      indexes.set(kind, new Map());
    }
    const index = indexes.get(kind);
    if (!index.has(id)) {
      index.set(id, []);
    }
    index.get(id).push(evidence);
  }
  for (const [sourceIndex, source] of manifest.sources.entries()) {
    const kind = source.kind === 'settings' ? 'setting' : 'keybinding';
    if (!indexes.has(kind)) {
      indexes.set(kind, new Map());
    }
    const entries = source.kind === 'settings'
      ? Object.entries(source.entries).map(([id, defaultValue]) => [id, { defaultValue }])
      : source.entries.filter(entry => !entry.command.startsWith('-')).map(entry => [entry.command, { binding: entry }]);
    for (const [id, evidence] of entries) {
      add(kind, id, { source: sourceIndex, ...evidence });
      if (source.kind === 'keybindings') {
        add('command', id, { source: sourceIndex, ...evidence });
      }
    }
    if (source.kind === 'keybindings') {
      if (!indexes.has('command')) {
        indexes.set('command', new Map());
      }
      for (const entry of source.unboundCommands || []) {
        add('command', entry.command, { source: sourceIndex, ...entry });
      }
    }
  }
  return (kind, id) => {
    const index = indexes.get(kind);
    const matches = index?.get(id) || [];
    return {
      status: matches.length ? 'observed' : index ? 'not-observed' : 'not-covered',
      matches
    };
  };
}

function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/product-manifest.js --input <capture-description.json>');
    return 0;
  }
  if (args.length !== 2 || args[0] !== '--input' || args[1].startsWith('--')) {
    throw new Error('Expected --input <capture-description.json>.');
  }
  const inputPath = path.resolve(args[1]);
  const input = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log(JSON.stringify(generateManifest(input, path.dirname(inputPath)), null, 2));
  return 0;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { createEvidenceLookup, generateManifest, loadManifest, main, validateManifest, validateManifestReference };
