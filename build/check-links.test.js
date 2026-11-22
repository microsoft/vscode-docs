'use strict';

const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const test = require('node:test');
const { checkClaims, parseArguments } = require('./check-claims');
const { assertReportCurrent, formatReport } = require('./findings');
const { analyzeDocument, createDocumentCache, createLinkChecker } = require('./check-links');

/* eslint-disable security/detect-non-literal-fs-filename -- Tests use isolated temporary directories. */

test('cached document analysis binds article anchor rules, content, and resolved variables', () => {
  const cached = createDocumentCache();
  const content = '## contributes.commands\n\n## {% data variables.product.name %}\n\n[Target](one.md)';
  const variables = { 'variables.product.name': 'First' };
  const original = cached(content, 'docs/article.md', variables);
  assert.equal(cached(content, 'docs/article.md', variables), original);
  assert.deepEqual(original, analyzeDocument(content, 'docs/article.md', variables));
  assert.deepEqual(cached(content, 'api/references/activation-events.md', variables),
    analyzeDocument(content, 'api/references/activation-events.md', variables));
  variables['variables.product.name'] = 'Second';
  const changedVariables = cached(content, 'docs/article.md', variables);
  assert.ok(changedVariables.anchors.has('second'));
  assert.equal(changedVariables.anchors.has('first'), false);
  const changedContent = cached(content.replace('one.md', 'two.md'), 'docs/article.md', variables);
  assert.equal(changedContent.references[0].target, 'two.md');
  assert.deepEqual(changedContent, analyzeDocument(content.replace('one.md', 'two.md'), 'docs/article.md', variables));
});

function withRepository(callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-links-'));
  const root = path.join(directory, 'repo');
  try {
    function write(file, content) {
      const destination = path.join(root, file);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, content);
    }
    write(path.join('data', 'variables', 'product.yml'), 'name: VS Code\n');
    write(path.join('build', 'feature-lifecycle.json'), '{"features":{}}');
    write(path.join('docs', 'article.md'), '# Article\n');
    callback(root, write, directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('checks Markdown links, reference links, media, and explicit HTML anchors without scanning code', function () {
  withRepository(function (root, write) {
    write(path.join('docs', 'target page.md'), '## Working with {% data variables.product.name %}\n<a id="explicit"></a>\n');
    write(path.join('docs', 'images', 'sample.png'), 'binary fixture');
    write(path.join('docs', 'article.md'), [
      '---',
      'MetaDescription: "[Not a link](absent-frontmatter.md)"',
      '---',
      '# Article',
      '',
      '[Valid](target%20page.md#working-with-vs-code)',
      '',
      '[Reference][good]',
      '',
      '![Image](images/sample.png)',
      '',
      '<a href="/docs/target%20page.md#explicit">Explicit</a>',
      '',
      '`[Code](absent-code.md)`',
      '',
      '```md',
      '[Code fence](absent-fence.md)',
      '```',
      '',
      '<!-- [Comment](absent-comment.md) -->',
      '',
      '[Missing](missing.md)',
      '',
      '[Fragment](target%20page.md#absent)',
      '',
      '![Missing image](images/missing.png)',
      '',
      '[good]: /docs/target%20page#_working-with-vs-code'
    ].join('\n'));
    const report = checkClaims(root, [path.join('docs', 'article.md')], { links: true, sourceRevision: 'test-revision' });
    assert.deepEqual(report.checks, ['claims', 'links']);
    assert.deepEqual(report.findings.map(({kind, severity, line, evidence}) => ({kind, severity, line, evidence})), [
      { kind: 'link', severity: 'error', line: 22, evidence: 'link(missing.md)' },
      { kind: 'link', severity: 'error', line: 24, evidence: 'link(target%20page.md#absent)' },
      { kind: 'link', severity: 'error', line: 26, evidence: 'media(images/missing.png)' }
    ]);
    assert.match(formatReport(report, 'github'), /::error file=docs\/article.md,line=22/);
    const claimsOnly = checkClaims(root, [path.join('docs', 'article.md')], { sourceRevision: 'test-revision' });
    assert.deepEqual(claimsOnly.findings, []);
    assert.deepEqual(claimsOnly.checks, ['claims']);
    assert.equal(parseArguments(['--links', '--files', 'docs']).links, true);
    assert.throws(() => parseArguments(['--links', '--links']), /only once/);
  });
});

test('resolves redirects and release routes while distinguishing generated and external targets', function () {
  withRepository(function (root, write) {
    write(path.join('docs', 'target.md'), '## Destination\n');
    write(path.join('docs', 'section', 'child.md'), '## Section child\n');
    write(path.join('release-notes', 'v1_100.md'), '## Security & trust\n');
    write(path.join('docs', 'redirection.json'), JSON.stringify([
      { from: '/docs/old', to: '/docs/target#destination' },
      { from: '/docs/loop-a', to: '/docs/loop-b' },
      { from: '/docs/loop-b', to: '/docs/loop-a' },
      { from: '/docs/external', to: 'https://example.test/moved' }
    ]));
    write(path.join('docs', 'article.md'), [
      '[Moved](/docs/old.md)',
      '',
      '[Notes](https://code.visualstudio.com/updates/v1_100#security-and-trust)',
      '',
      '[External](https://example.test/not-checked)',
      '',
      '[Cycle](/docs/loop-a)',
      '',
      '[External redirect](/docs/external)',
      '',
      '[Generated](/api/references/vscode-api#commands)',
      '',
      '[Landing](/download)',
      '',
      '[Homepage](/)',
      '',
      '[Directory route](/docs/section)'
    ].join('\n'));
    const report = checkClaims(root, ['docs'], { links: true, sourceRevision: 'test-revision' });
    assert.deepEqual(report.findings.map(finding => [finding.line, finding.severity]), [
      [7, 'error'], [9, 'unverified'], [11, 'unverified'], [17, 'unverified']
    ]);
    assert.match(report.findings[0].message, /Redirect cycle/);
  });
});

test('supports website API anchor rules and treats generated heading content as uncertain', function () {
  const api = analyzeDocument([
    '# API',
    '## contributes.commands',
    '## The API',
    '### vscode.SomeSymbol',
    '## *'
  ].join('\n'), 'api/references/activation-events.md', {});
  assert.ok(api.anchors.has('contributes.commands'));
  assert.ok(api.anchors.has('The-API'));
  assert.ok(api.anchors.has('vscode.SomeSymbol'));
  assert.ok(api.anchors.has('all'));
  withRepository(function (root, write) {
    write(path.join('docs', 'conditional.md'), '<!-- %IF INSIDERS %\n## Conditional\n%ENDIF % -->');
    write(path.join('docs', 'article.md'), '[Conditional](conditional.md#conditional)');
    const report = checkClaims(root, ['docs'], { links: true, sourceRevision: 'test-revision' });
    assert.equal(report.findings[0].severity, 'unverified');
    assert.match(report.findings[0].message, /conditional content/);
  });
});

test('checks HTML media attributes, ignores commented attributes, and does not read media contents', function () {
  withRepository(function (root, write) {
    write(path.join('docs', 'images', 'clip.mp4'), 'media fixture');
    const content = [
      '<!-- <img src="missing-comment.png"> -->',
      '<video src="images/clip.mp4" poster="images/missing-poster.png"></video>',
      '<img alt="an image > example" src="images/missing.png">',
      '<a id="local"></a><a href="#local">Anchor</a>'
    ].join('\n');
    const checker = createLinkChecker(root, {});
    const findings = checker.check(path.join(root, 'docs', 'article.md'), content);
    assert.deepEqual(findings.map(({line, evidence}) => ({line, evidence})), [
      {line: 2, evidence: 'media(images/missing-poster.png)'},
      {line: 3, evidence: 'media(images/missing.png)'}
    ]);
    assert.ok(checker.fingerprint().some(([file, value]) => file === 'docs/images/clip.mp4' && value === 'file'));
  });
});

test('rejects escaping paths and symlinks before reading their contents', function () {
  withRepository(function (root, write, directory) {
    const outside = path.join(directory, 'outside');
    fs.mkdirSync(outside);
    fs.writeFileSync(path.join(outside, 'secret.md'), '# Outside\n');
    fs.symlinkSync(outside, path.join(root, 'docs', 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
    write(path.join('docs', 'article.md'), [
      '[Outside](../../outside/secret.md)',
      '',
      '[Symlink](linked/secret.md)',
      '',
      '[Encoded traversal](%2e%2e/%2e%2e/outside/secret.md)'
    ].join('\n'));
    const report = checkClaims(root, [path.join('docs', 'article.md')], { links: true, sourceRevision: 'test-revision' });
    assert.equal(report.findings.length, 3);
    assert.ok(report.findings.every(finding => finding.severity === 'error'));
    assert.ok(report.findings.every(finding => /outside|escapes/.test(finding.message)));
  });
});

test('fingerprints linked documents, missing targets, and redirects outside the scanned scope', function () {
  withRepository(function (root, write) {
    write(path.join('docs', 'article.md'), '[Target](target.md#section)\n\n![Image](images/new.png)');
    write(path.join('docs', 'target.md'), '## Section\n');
    const run = () => checkClaims(root, [path.join('docs', 'article.md')], { links: true, sourceRevision: 'same-head' });
    const first = run();
    assert.doesNotThrow(() => assertReportCurrent(first, run()));
    write(path.join('docs', 'target.md'), '## Renamed\n');
    const renamed = run();
    assert.throws(() => assertReportCurrent(first, renamed), /inputHash changed/);
    assert.ok(renamed.findings.some(finding => /Missing fragment/.test(finding.message)));
    write(path.join('docs', 'images', 'new.png'), 'media fixture');
    const created = run();
    assert.throws(() => assertReportCurrent(renamed, created), /inputHash changed/);
    write(path.join('docs', 'redirection.json'), '[{"from":"/docs/target","to":"/docs/elsewhere"}]');
    assert.throws(() => assertReportCurrent(created, run()), /inputHash changed/);
  });
});

test('reports the source table row for links whose inline tokens have no location', function () {
  const parsed = analyzeDocument([
    '# Article',
    '',
    '| Name | Reference |',
    '| --- | --- |',
    '| First | [Missing](missing-one.md) |',
    '| Second | [Missing](missing-two.md) |'
  ].join('\n'), 'docs/article.md', {});
  assert.deepEqual(parsed.references.map(({target, line}) => ({target, line})), [
    {target: 'missing-one.md', line: 5},
    {target: 'missing-two.md', line: 6}
  ]);
});

test('handles encoded redirect targets, parameterized examples, and invalid URLs explicitly', function () {
  withRepository(function (root, write) {
    write(path.join('docs', 'target page.md'), '## Working\n');
    write(path.join('docs', 'redirection.json'), JSON.stringify([
      {from: '/docs/moved', to: '/docs/target%20page#wor%6bing'},
      {from: '/docs/external', to: '//example.test/other'},
      {from: '/docs/invalid', to: '/docs/bad%ZZ'}
    ]));
    const checker = createLinkChecker(root, {});
    const findings = checker.check(path.join(root, 'docs', 'article.md'), [
      '[Moved](/docs/moved)',
      '',
      '[Template](/docs/%3Ctopic%3E)',
      '',
      '[External](/docs/external)',
      '',
      '[Invalid redirect](/docs/invalid)',
      '',
      '<a href="https://%">Invalid URL</a>'
    ].join('\n'));
    assert.deepEqual(findings.map(({line, severity}) => ({line, severity})), [
      {line: 3, severity: 'unverified'},
      {line: 5, severity: 'unverified'},
      {line: 7, severity: 'error'},
      {line: 9, severity: 'error'}
    ]);
  });
});

test('requires website evidence for missing published routes but keeps missing local files and media as errors', function () {
  withRepository(function (root, write) {
    write(path.join('docs', 'article.md'), [
      '[Published route](/docs/old-page)',
      '[Source-style published route](/docs/old-page.md)',
      '[Website URL](https://code.visualstudio.com/docs/old-page)',
      '[Local file](old-page.md)',
      '![Local media](images/missing.png)',
      '![Root media](/images/missing.png)',
      '[Broken fragment](#missing)'
    ].join('\n'));
    const report = checkClaims(root, ['docs'], { links: true, sourceRevision: 'test-revision' });
    assert.deepEqual(report.findings.map(({line, severity}) => ({line, severity})), [
      {line: 1, severity: 'unverified'},
      {line: 2, severity: 'unverified'},
      {line: 3, severity: 'unverified'},
      {line: 4, severity: 'error'},
      {line: 5, severity: 'error'},
      {line: 6, severity: 'error'},
      {line: 7, severity: 'error'}
    ]);
    assert.ok(report.findings.slice(0, 3).every(finding => /Website routing evidence is required/.test(finding.message)));
  });
});

test('maps published documentation assets to source image directories', function () {
  withRepository(function (root, write) {
    write(path.join('api', 'get-started', 'images', 'sample', 'launch.mp4'), 'fixture');
    write(path.join('docs', 'nested', 'section', 'images', 'sample', 'screen.png'), 'fixture');
    write(path.join('api', 'images', 'sample', 'screen.png'), 'fixture');
    write(path.join('release-notes', 'images', 'v1', 'screen.webp'), 'fixture');
    const checker = createLinkChecker(root, {});
    const results = checker.check(path.join(root, 'docs', 'article.md'), [
      '<video src="/assets/api/get-started/sample/launch.mp4"></video>',
      '<img src="/assets/docs/nested/section/sample/screen.png">',
      '<img src="https://code.visualstudio.com/assets/updates/v1/screen.webp">',
      '<img src="/assets/api/get-started/sample/missing.png">',
      '<img src="/assets/website-only/image.png">',
      '<img src="/assets/api/images/sample/screen.png">'
    ].join('\n'));
    assert.deepEqual(results.map(({line, severity}) => ({line, severity})), [
      {line: 4, severity: 'error'},
      {line: 5, severity: 'unverified'},
      {line: 6, severity: 'error'}
    ]);
    assert.ok(checker.fingerprint().some(([file, value]) => file === 'api/get-started/images/sample/launch.mp4' && value === 'file'));
    fs.rmSync(path.join(root, 'api', 'get-started', 'images', 'sample', 'launch.mp4'));
    const fresh = createLinkChecker(root, {});
    assert.equal(fresh.check(path.join(root, 'docs', 'article.md'),
      '<video src="/assets/api/get-started/sample/launch.mp4"></video>')[0].severity, 'error');
  });
});

test('preserves variable errors and explicitly reports incomplete link analysis', function () {
  withRepository(function (root, write) {
    write(path.join('docs', 'article.md'), '{% data variables.product.missing %}\n\n[Link](missing.md)');
    write(path.join('docs', 'other.md'), '[Target](target.md#section)\n\n[Missing](missing.md)');
    write(path.join('docs', 'target.md'), '## {% data variables.product.missing %}\n');
    const report = checkClaims(root, ['docs/article.md', 'docs/other.md'], {links: true, sourceRevision: 'fixture'});
    assert.ok(report.findings.some(finding => finding.severity === 'error' && /Missing data variable/.test(finding.message)));
    assert.ok(report.findings.some(finding => finding.evidence === 'link-analysis-incomplete' && finding.severity === 'unverified'));
    assert.ok(report.findings.some(finding => finding.article === 'docs/other.md' && /Cannot verify fragment/.test(finding.message)));
    assert.ok(report.findings.some(finding => finding.article === 'docs/other.md' && finding.severity === 'error'));
  });
});
