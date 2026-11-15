'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const remainingSteps = [
  'update-vscode-version.js',
  'code-insiders',
  'code-insiders',
  'append-keybindings.js',
  'cleanup-keybindings.js',
  'generate-social-image.sh',
  'update-dates.js'
];

function runRelease(t, content, failingStep = '') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-release-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'build', 'keybindings', 'agents'), { recursive: true });
  fs.mkdirSync(path.join(root, 'release-notes'));
  fs.copyFileSync(path.join(__dirname, 'docs-release-part1.sh'), path.join(root, 'build', 'docs-release-part1.sh'));
  const notesFile = path.join(root, 'release-notes', 'v1_114.md');
  if (content !== undefined) {
    fs.writeFileSync(notesFile, content);
  }
  fs.writeFileSync(path.join(root, 'calls.log'), '');
  fs.writeFileSync(path.join(root, 'mocks.sh'), `
record_step() {
    printf '%s\\n' "$1" >> "$ROOT_DIR/calls.log"
    if [ "$1" = "$FAILING_STEP" ]; then
        return 17
    fi
}
node() { record_step "\${1##*/}"; }
code-insiders() { record_step code-insiders; }
magick() { :; }
bash() { record_step "\${1##*/}"; }
`);
  const result = spawnSync(process.env.BASH || 'bash', [
    '-c', 'source ./mocks.sh; source "$0" "$@"',
    './build/docs-release-part1.sh', '1.114.0', '2026-04-02', 'a'.repeat(40)
  ], {
    cwd: root,
    env: { ...process.env, FAILING_STEP: failingStep },
    encoding: 'utf8'
  });
  assert.ifError(result.error);
  return {
    ...result,
    steps: fs.readFileSync(path.join(root, 'calls.log'), 'utf8').trim().split('\n'),
    notes: fs.existsSync(notesFile) ? fs.readFileSync(notesFile, 'utf8') : undefined
  };
}

for (const newline of ['\n', '\r\n']) {
  test(`preserves existing Stable notes and completes every remaining step (${JSON.stringify(newline)})`, t => {
    const content = ['---', 'ProductEdition: Stable', '---', '# Edited release notes', ''].join(newline);
    const result = runRelease(t, content);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.notes, content);
    assert.deepEqual(result.steps, remainingSteps);
    assert.match(result.stdout, /Skipping: Stable release notes already exist/);
    assert.match(result.stdout, /Release preparation \(Part 1\) complete/);
  });
}

for (const edition of ['missing', 'Insiders']) {
  test(`still creates Stable notes when existing notes are ${edition}`, t => {
    const content = edition === 'missing' ? undefined : '---\nProductEdition: Insiders\n---\n';
    const result = runRelease(t, content);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(result.steps, ['create-release-notes.js', ...remainingSteps]);
  });
}

test('does not suppress release note creation errors for an unrecognized edition', t => {
  const result = runRelease(t, '---\nProductEdition: Unknown\n---\n', 'create-release-notes.js');
  assert.equal(result.status, 17, result.stderr);
  assert.deepEqual(result.steps, ['create-release-notes.js']);
  assert.doesNotMatch(result.stdout, /Release preparation \(Part 1\) complete/);
});

test('does not suppress later errors after skipping existing Stable notes', t => {
  const result = runRelease(t, '---\nProductEdition: Stable\n---\n', 'update-vscode-version.js');
  assert.equal(result.status, 17, result.stderr);
  assert.deepEqual(result.steps, ['update-vscode-version.js']);
  assert.doesNotMatch(result.stdout, /Release preparation \(Part 1\) complete/);
});
