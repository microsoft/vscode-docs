'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { collectProductReferences } = require('./product-references');

const command = 'command:workbench.action.onboarding.tryFeature';
const query = value => encodeURIComponent(JSON.stringify(value));

test('extracts tryout IDs from both product protocols and encoded command arguments', function () {
  const content = [
    `[Try](vscode://tryout/editor.smart-diff)`,
    `[Try Insiders](vscode-insiders://tryout/editor.smart-diff)`,
    `[Command](${command}?${query(['editor.smart-diff'])})`,
    `[Encoded](vscode-insiders://tryout/editor%2Esmart-diff)`,
    `[Maximum](vscode://tryout/${'a'.repeat(128)})`
  ].join('\n');
  const references = collectProductReferences(content);
  assert.equal(references.length, 5);
  assert.ok(references.every(item => item.kind === 'tryout' && !item.error));
  assert.ok(references.slice(0, 4).every(item => item.claim === 'tryout(editor.smart-diff)'));
  assert.equal(references[2].offset, content.indexOf(command));
  assert.equal(references[4].target.length, 128);
});

test('rejects malformed or unsupported tryout payloads without accepting a partial ID', function () {
  const uris = [
    command,
    `${command}?%ZZ`,
    `${command}?%5B`,
    `${command}?${query('editor.smart-diff')}`,
    `${command}?${query([])}`,
    `${command}?${query(['editor.smart-diff', { command: 'unexpected' }])}`,
    `${command}?${query([{}])}`,
    `${command}?${query(['.bad'])}`,
    'vscode://tryout/',
    'vscode://tryout/.bad',
    'vscode://tryout/editor/bad',
    'vscode://tryout/bad%20id',
    'vscode://tryout/bad%ZZ',
    'vscode://tryout/editor.smart-diff?extra=1',
    'vscode-insiders://tryout/editor.smart-diff#extra',
    `vscode://tryout/${'a'.repeat(129)}`
  ];
  for (const uri of uris) {
    const [reference, ...remaining] = collectProductReferences(`[Try](${uri})`);
    assert.equal(remaining.length, 0, uri);
    assert.equal(reference.kind, 'tryout', uri);
    assert.ok(reference.error, uri);
    assert.equal(reference.target, undefined, uri);
    assert.equal(reference.claim, `tryout-uri(${uri})`);
  }
});

test('does not infer tryouts from ordinary command-ID mentions or similar command names', function () {
  const content = [
    '`workbench.action.onboarding.tryFeature`',
    '[Different](command:workbench.action.onboarding.tryFeatureExtra)',
    '[Settings](command:workbench.action.openSettings?%5B%22editor.fontSize%22%5D)',
    '[Private example](command:_example.command)',
    'const command: string = "example";',
    '`setting(chat.agent.enabled:true)`',
    '`kb(workbench.action.showCommands)`'
  ].join('\n');
  const references = collectProductReferences(content);
  assert.equal(references.filter(item => item.kind === 'tryout').length, 0);
  assert.deepEqual(references.filter(item => item.kind === 'command').map(item => item.target), [
    'workbench.action.onboarding.tryFeatureExtra',
    'workbench.action.openSettings',
    '_example.command'
  ]);
  assert.equal(references.find(item => item.kind === 'setting').target, 'chat.agent.enabled');
});

test('preserves URI handling in inline code and quoted HTML attributes', function () {
  const references = collectProductReferences([
    '`vscode://tryout/editor.sample`',
    '<a href="vscode-insiders://tryout/editor.sample">Try</a>',
    `<a href="${command}?${query(['editor.sample'])}">Try</a>`,
    `\`command:git.stage?\${encodeURIComponent(JSON.stringify(args))}\``
  ].join('\n'));
  assert.deepEqual(references.map(item => item.claim), [
    'tryout(editor.sample)', 'tryout(editor.sample)', 'tryout(editor.sample)', 'command(git.stage)'
  ]);
  assert.ok(references.every(item => !item.error));
});

test('matches product URI handling for empty query and fragment delimiters', function () {
  for (const suffix of ['?', '#', '?#']) {
    const [reference] = collectProductReferences(`[Try](vscode://tryout/editor.sample${suffix})`);
    assert.equal(reference.target, 'editor.sample');
    assert.equal(reference.error, undefined);
  }
  for (const suffix of ['??', '##', '#?']) {
    const [reference] = collectProductReferences(`[Try](vscode://tryout/editor.sample${suffix})`);
    assert.ok(reference.error);
  }
});

test('decodes command IDs with spaces without confusing embedded URIs or command variables', function () {
  const references = collectProductReferences([
    '[Category](command:extensions.actions.searchByCategory.Data%20Science)',
    '`https://example.test/command:notACommandLink`',
    '`notcommand:anotherFalsePositive`',
    '`command:...`',
    '`command:${commandId}`',
    '`${command:pickProcess}`',
    '[Invalid](command:broken%ZZ)'
  ].join('\n'));
  assert.equal(references.length, 3);
  assert.equal(references[0].target, 'extensions.actions.searchByCategory.Data Science');
  assert.equal(references[1].target, 'pickProcess');
  assert.match(references[2].error, /invalid percent encoding/);
  const [unusualCommand] = collectProductReferences('[Run](command:123.custom/action+suffix)');
  assert.equal(unusualCommand.target, '123.custom/action+suffix');
  const [similarCommand] = collectProductReferences(`[Other](${command}/different)`);
  assert.equal(similarCommand.kind, 'command');
  assert.equal(similarCommand.target, 'workbench.action.onboarding.tryFeature/different');
});

test('keeps parameterized documentation examples unverified rather than treating them as broken links', function () {
  const content = [
    '`vscode://tryout/<id>`',
    '`vscode-insiders://tryout/<id>`',
    `\`${command}?<encoded-arguments>\``,
    `\`${command}?\${encodeURIComponent(args)}\``,
    `[Example](${command}?${query(['<tryout-id>'])})`
  ].join('\n');
  const references = collectProductReferences(content);
  assert.equal(references.length, 5);
  assert.ok(references.every(item => !item.error && !item.target && item.message.includes('parameterized')));
  assert.equal(references[0].claim, 'tryout-uri(vscode://tryout/<id>)');
  const [fragment] = collectProductReferences(`[Try](${command}?${query(['editor.sample'])}#ignored)`);
  assert.equal(fragment.target, 'editor.sample');
});
