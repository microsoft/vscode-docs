'use strict';

const assert = require('node:assert/strict');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { createEvidenceLookup, generateManifest, loadManifest, validateManifest } = require('./product-manifest');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary directories. */

function withCaptures(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-manifest-'));
  try {
    const sources = [];
    for (const mode of ['editor', 'agents']) {
      const settingsFile = `${mode}-settings.jsonc`;
      fs.writeFileSync(path.join(root, settingsFile), `{
        // Generated descriptions can contain quotes and URLs.
        "editor.fontSize": ${mode === 'editor' ? 14 : 16},
        "sample.endpoint": "https://example.test/a//b",
        "sample.literal": ",}",
        "sample.null": null,
        "sample.enabled": false,
        "[typescript]": { "editor.tabSize": 2, },
      }`);
      sources.push({ kind: 'settings', mode, platform: 'win', file: settingsFile });
      const keybindingsFile = `${mode}-keybindings.json`;
      fs.writeFileSync(path.join(root, keybindingsFile), `[
        /* Preserve the condition and arguments, not just the command. */
        { "key": "ctrl+k", "command": "${mode}.pick", "when": "!isWeb", "args": { "mode": "${mode}" } },
        { "key": "ctrl+x", "command": "-removed.command" },
      ]
      // Here are other available commands:
      // - ${mode}.unbound
      `);
      sources.push({ kind: 'keybindings', mode, platform: 'win', file: keybindingsFile });
    }
    callback(root, {
      schemaVersion: 1,
      product: { channel: 'insiders', version: '1.148.0-insider', revision: 'a'.repeat(40) },
      sources
    });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('imports JSONC captures without losing defaults, modes, binding conditions, or provenance', function () {
  withCaptures(function (root, input) {
    const manifest = generateManifest(input, root);
    const settings = manifest.sources[0];
    assert.deepEqual(settings.entries, {
      'editor.fontSize': 14,
      'sample.endpoint': 'https://example.test/a//b',
      'sample.literal': ',}',
      'sample.null': null,
      'sample.enabled': false,
      '[typescript]': { 'editor.tabSize': 2 }
    });
    assert.equal(settings.sha256, crypto.createHash('sha256')
      .update(fs.readFileSync(path.join(root, settings.file))).digest('hex'));
    assert.deepEqual(manifest.product, input.product);

    const lookup = createEvidenceLookup(manifest);
    assert.deepEqual(lookup('setting', 'editor.fontSize'), {
      status: 'observed',
      matches: [{ source: 0, defaultValue: 14 }, { source: 2, defaultValue: 16 }]
    });
    assert.deepEqual(lookup('keybinding', 'agents.pick'), {
      status: 'observed',
      matches: [{ source: 3, binding: { key: 'ctrl+k', command: 'agents.pick', when: '!isWeb', args: { mode: 'agents' } } }]
    });
    assert.equal(lookup('keybinding', 'removed.command').status, 'not-observed');
    assert.equal(lookup('keybinding', 'unbound.command').status, 'not-observed');
    assert.equal(lookup('command', 'agents.pick').status, 'observed');
    const raw = fs.readFileSync(path.join(root, 'agents-keybindings.json'), 'utf8');
    const line = raw.split('\n').findIndex(value => value.includes('// - agents.unbound')) + 1;
    assert.deepEqual(lookup('command', 'agents.unbound'), {
      status: 'observed',
      matches: [{ source: 3, command: 'agents.unbound', line }]
    });
    assert.equal(lookup('keybinding', 'agents.unbound').status, 'not-observed');
    assert.equal(lookup('command', 'removed.command').status, 'not-observed');
    assert.equal(lookup('command', 'unknown.command').status, 'not-observed');
    assert.equal(lookup('setting', 'editor.tabSize').status, 'not-observed');
  });
});

test('rejects missing mode pairs, duplicate sources, and unpinned product metadata', function () {
  withCaptures(function (root, input) {
    assert.throws(() => generateManifest({ ...input, sources: input.sources.slice(0, 2) }, root),
      /Missing agents source/);
    assert.throws(() => generateManifest({ ...input, sources: [...input.sources, input.sources[0]] }, root),
      /Duplicate product source/);
    assert.throws(() => generateManifest({ ...input, product: { ...input.product, revision: 'short' } }, root),
      /full build revision/);
    const mixedPlatforms = structuredClone(input);
    mixedPlatforms.sources[2].platform = 'linux';
    assert.throws(() => generateManifest(mixedPlatforms, root), /Missing agents source for settings on win/);
  });
});

test('rejects malformed or wrong-shaped captures instead of accepting partial JSONC', function () {
  withCaptures(function (root, input) {
    const settingsPath = path.join(root, input.sources[0].file);
    for (const content of ['{"editor.fontSize": 14, broken}', '{}', '[]']) {
      fs.writeFileSync(settingsPath, content);
      assert.throws(() => generateManifest(input, root), /Invalid JSONC|nonempty Default Settings object/);
    }
    fs.writeFileSync(settingsPath, '{"editor.fontSize": 14}');
    fs.writeFileSync(path.join(root, input.sources[1].file), '[{"key": "ctrl+k", "command": 123}]');
    assert.throws(() => generateManifest(input, root), /Invalid keybinding at entry 1/);
  });
});

test('validates loaded manifests and requires an explicit matching channel', function () {
  withCaptures(function (root, input) {
    const manifest = generateManifest(input, root);
    const file = path.join(root, 'manifest.json');
    const content = JSON.stringify(manifest);
    fs.writeFileSync(file, content);
    assert.throws(() => loadManifest(file), /Select --channel/);
    assert.throws(() => loadManifest(file, 'stable'), /does not match requested channel/);
    const loaded = loadManifest(file, 'insiders');
    assert.equal(loaded.reference.sha256, crypto.createHash('sha256').update(content).digest('hex'));
    assert.equal(Object.hasOwn(loaded.reference.sources[0], 'entries'), false);
    assert.equal(Object.hasOwn(loaded.reference.sources[1], 'unboundCommands'), false);
    manifest.sources[0].sha256 = 'invalid';
    assert.throws(() => validateManifest(manifest), /SHA-256/);
  });

});

test('extracts command evidence only from the exported trailing command list', function () {
  withCaptures(function (root, input) {
    const file = path.join(root, input.sources[1].file);
    fs.writeFileSync(file, [
      '// Here are other available commands:',
      '// - not.a.command',
      '[',
      '  {"key": "ctrl+k", "command": "editor.pick", "args": "// Here are other available commands:\\n// - not.evidence"}',
      ']',
      '// Here are other available commands:',
      '// - real.unbound',
      '// - extensions.actions.searchByCategory.Data Science'
    ].join('\r\n'));
    const source = generateManifest(input, root).sources[1];
    assert.deepEqual(source.unboundCommands, [
      { command: 'real.unbound', line: 7 },
      { command: 'extensions.actions.searchByCategory.Data Science', line: 8 }
    ]);

    fs.writeFileSync(file, '[{"key":"ctrl+k","command":"editor.pick"}]');
    const oldStyle = generateManifest(input, root);
    assert.equal(Object.hasOwn(oldStyle.sources[1], 'unboundCommands'), false);
    assert.equal(createEvidenceLookup(oldStyle)('command', 'editor.pick').status, 'observed');

    for (const suffix of [
      '// - duplicate\n// - duplicate',
      '// invalid entry',
      '// - '
    ]) {
      fs.writeFileSync(file, `[{"key":"ctrl+k","command":"editor.pick"}]\n// Here are other available commands:\n${suffix}`);
      assert.throws(() => generateManifest(input, root), /Malformed exported command list|duplicate unbound command/);
    }
  });
});

test('generator CLI emits only JSON on success and fails visibly without partial output', function () {
  withCaptures(function (root, input) {
    const inputPath = path.join(root, 'capture.json');
    const script = path.join(__dirname, 'product-manifest.js');
    fs.writeFileSync(inputPath, JSON.stringify(input));
    const success = spawnSync(process.execPath, [script, '--input', inputPath], { encoding: 'utf8' });
    assert.equal(success.status, 0, success.stderr);
    assert.equal(success.stderr, '');
    assert.equal(JSON.parse(success.stdout).sources.length, 4);

    input.sources[0].file = 'missing.jsonc';
    fs.writeFileSync(inputPath, JSON.stringify(input));
    const failure = spawnSync(process.execPath, [script, '--input', inputPath], { encoding: 'utf8' });
    assert.equal(failure.status, 1);
    assert.equal(failure.stdout, '');
    assert.match(failure.stderr, /missing.jsonc/);
  });
});
