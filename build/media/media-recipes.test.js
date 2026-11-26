'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const {encodePng} = require('./media-png');
const {sha256} = require('./media-tools');
const {recordReview} = require('./media');
const {applyRefreshPlan, createRefreshPlan, findRecipe, loadRecipes, main, nextAsset, prepareFromRecipe} = require('./media-recipes');
const {mediaReferences, rewriteReferences} = require('./media-references');
const {createLinkChecker} = require('../checks/check-links');

/* eslint-disable security/detect-non-literal-fs-filename -- All mutations use exclusively owned OS-temp fixtures. */

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'vscode-docs-recipes-'));
  t.after(() => fs.rmSync(directory, {recursive: true, force: true}));
  const root = path.join(directory, 'repo'), output = path.join(directory, 'private');
  fs.mkdirSync(root); fs.mkdirSync(output);
  const write = (relative, bytes) => {
    const file = path.join(root, ...relative.split('/'));
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, bytes);
    return file;
  };
  const story = JSON.parse(fs.readFileSync(path.join(__dirname, 'storyboards', 'editor-find.json'), 'utf8'));
  story.article = 'docs/example.md';
  const storyboard = write('build/media/storyboards/example.json', JSON.stringify(story));
  const asset = 'docs/images/example.png';
  write(asset, 'Existing published asset, not a capture candidate.');
  write('docs/example.md', '# Example\n\n![Existing alt](images/example.png "Existing title")\n');
  const recipe = {schemaVersion: 1, id: 'example', storyboard: 'build/media/storyboards/example.json',
    outputs: [{id: 'screenshot', base: 'docs/images/example', source: 'screenshot', prepare: {format: 'png'}, assets: [asset]},
      {id: 'video', base: 'docs/images/example-demo', source: 'video', prepare: {format: 'mp4'}, assets: []}]};
  const recipeFile = write('build/media/recipes/example.json', JSON.stringify(recipe));
  const pixels = Buffer.alloc(8 * 6 * 4, 255);
  const bytes = encodePng({width: 8, height: 6, pixels});
  const captureDirectory = path.join(output, 'capture');
  fs.mkdirSync(captureDirectory);
  fs.copyFileSync(storyboard, path.join(captureDirectory, 'storyboard.json'));
  fs.writeFileSync(path.join(captureDirectory, story.capture.file), bytes);
  const captured = {schemaVersion: 1, status: 'candidate', execution: 'attended', privacy: {textScan: 'passed'},
    articleHash: sha256(fs.readFileSync(path.join(root, 'docs', 'example.md'))),
    storyboard: {id: story.id, article: story.article, file: 'storyboard.json', sha256: sha256(fs.readFileSync(storyboard))},
    asset: {file: story.capture.file, bytes: bytes.length, sha256: sha256(bytes)}};
  const capture = path.join(captureDirectory, 'capture.json');
  fs.writeFileSync(capture, JSON.stringify(captured));
  const dependencies = {repository: root, day: '20261122'};
  const prepare = () => {
    captured.articleHash = sha256(fs.readFileSync(path.join(root, 'docs', 'example.md')));
    fs.writeFileSync(capture, JSON.stringify(captured));
    return prepareFromRecipe({root, recipeId: 'example', outputId: 'screenshot', capture,
      captureSha256: sha256(fs.readFileSync(capture)), output}, dependencies);
  };
  const approve = result => recordReview({manifest: result.manifest, manifestSha256: result.manifestSha256,
    sha256: result.output.sha256, decision: 'approved', reviewer: 'Synthetic unit-test reviewer',
    evidence: 'Synthetic fixture only: exact prepared pixels inspected.', confirmReviewed: true}, dependencies);
  const assetSha256 = sha256(fs.readFileSync(path.join(root, ...asset.split('/'))));
  const plan = result => createRefreshPlan({root, asset, assetSha256, manifest: result.manifest, articles: ['docs/example.md'], output}, dependencies);
  const apply = planned => applyRefreshPlan({root, plan: planned.plan, planSha256: planned.sha256, confirmApply: true}, dependencies);
  return {root, output, asset, assetSha256, storyboard, recipe, recipeFile, capture, captureDirectory, dependencies, write, prepare, approve, plan, apply};
}

test('recipe lookup has stable output identity, explicit unmapped media, and unpublished examples', t => {
  const f = fixture(t);
  const registry = loadRecipes(f.root);
  assert.equal(registry.owners.size, 1);
  assert.deepEqual(findRecipe(f.root, f.asset), {status: 'mapped', asset: f.asset, assetSha256: f.assetSha256, recipe: 'build/media/recipes/example.json',
    recipeId: 'example', outputId: 'screenshot', storyboard: 'build/media/storyboards/example.json', source: 'screenshot', prepare: {format: 'png'}});
  f.write('docs/images/unmapped.png', 'Untouched old image');
  assert.equal(findRecipe(f.root, 'docs/images/unmapped.png').status, 'unmapped');
  assert.deepEqual(registry.recipes[0].recipe.outputs[1].assets, []);
  const duplicate = structuredClone(f.recipe);
  duplicate.id = 'duplicate';
  duplicate.outputs = [{...duplicate.outputs[0], base: 'docs/images/another'}];
  f.write('build/media/recipes/duplicate.json', JSON.stringify(duplicate));
  assert.throws(() => loadRecipes(f.root), /Duplicate asset ownership/);
});

test('recipes reject unsafe paths, missing sources, incompatible variants, and linked inputs', t => {
  const f = fixture(t);
  for (const change of [
    recipe => { recipe.storyboard = '../outside.json'; },
    recipe => { recipe.outputs[0].assets = ['docs/../outside.png']; },
    recipe => { recipe.outputs[0].source = 'highlighted'; },
    recipe => { recipe.outputs[0].prepare = {format: 'mp4'}; },
    recipe => { recipe.outputs[0].prepare = {format: 'png', scale: 2}; },
    recipe => { recipe.outputs[0].base = 'docs/images/../escape'; },
    recipe => { recipe.outputs[0].assets.push(f.asset); }
  ]) {
    const changed = structuredClone(f.recipe);
    change(changed);
    fs.writeFileSync(f.recipeFile, JSON.stringify(changed));
    assert.throws(() => loadRecipes(f.root));
  }
  fs.writeFileSync(f.recipeFile, JSON.stringify(f.recipe));
  const alias = path.join(f.root, 'docs', 'linked');
  fs.symlinkSync(path.join(f.root, 'docs', 'images'), alias, process.platform === 'win32' ? 'junction' : 'dir');
  const linked = structuredClone(f.recipe);
  linked.outputs[0].base = 'docs/linked/example';
  fs.writeFileSync(f.recipeFile, JSON.stringify(linked));
  assert.throws(() => loadRecipes(f.root), /Linked/);
});

test('registered preparation preserves source selection and requires exact capture inputs', t => {
  const f = fixture(t);
  const prepared = f.prepare();
  assert.equal(fs.existsSync(path.join(prepared.directory, prepared.output.file)), true);
  assert.throws(() => prepareFromRecipe({root: f.root, recipeId: 'example', outputId: 'video', capture: f.capture,
    captureSha256: sha256(fs.readFileSync(f.capture)), output: f.output}, f.dependencies), /source was not produced/);
  fs.appendFileSync(path.join(f.captureDirectory, 'storyboard.json'), '\n');
  assert.throws(f.prepare, /snapshot changed/);
});

test('approved refresh changes filename, actual references, and recipe ownership together without overwriting old media', t => {
  const f = fixture(t);
  f.write('docs/other.md', '![Other consumer](images/example.png)\n');
  const before = fs.readFileSync(path.join(f.root, ...f.asset.split('/')));
  const prepared = f.prepare();
  assert.throws(() => f.plan(prepared), /human approval/);
  f.approve(prepared);
  const planned = f.plan(prepared);
  assert.equal(planned.destination, 'docs/images/example-202611221.png');
  assert.deepEqual(planned.otherConsumers, [{article: 'docs/other.md', references: 1}]);
  assert.equal(fs.existsSync(path.join(f.root, ...planned.destination.split('/'))), false, 'Planning must not write repository content.');
  assert.throws(() => applyRefreshPlan({root: f.root, plan: planned.plan, planSha256: planned.sha256}, f.dependencies), /explicit write approval/);
  const applied = f.apply(planned);
  assert.equal(applied.status, 'applied');
  assert.equal(fs.readFileSync(path.join(f.root, 'docs', 'example.md'), 'utf8'),
    '# Example\n\n![Existing alt](images/example-202611221.png "Existing title")\n');
  assert.equal(fs.readFileSync(path.join(f.root, 'docs', 'other.md'), 'utf8'), '![Other consumer](images/example.png)\n');
  assert.deepEqual(fs.readFileSync(path.join(f.root, ...f.asset.split('/'))), before);
  assert.equal(sha256(fs.readFileSync(path.join(f.root, ...applied.asset.split('/')))), prepared.output.sha256);
  assert.equal(findRecipe(f.root, applied.asset).outputId, 'screenshot');
  assert.equal(findRecipe(f.root, f.asset).outputId, 'screenshot', 'The old filename must retain its association.');
  const again = f.prepare();
  f.approve(again);
  const next = createRefreshPlan({root: f.root, asset: applied.asset, assetSha256: prepared.output.sha256, manifest: again.manifest,
    articles: ['docs/example.md'], output: f.output}, f.dependencies);
  assert.equal(next.destination, 'docs/images/example-202611222.png', 'Versions must not accumulate on an already-versioned name.');
  assert.throws(() => f.apply(planned), /[Ss]tale|changed|No references/);
});

test('stale article, asset, recipe, approval, destination, or tampered plan cannot be applied', t => {
  for (const target of ['article', 'asset', 'recipe', 'storyboard', 'snapshot', 'candidate', 'approval', 'destination', 'plan']) {
    const f = fixture(t), prepared = f.prepare();
    f.approve(prepared);
    const planned = f.plan(prepared);
    if (target === 'article') f.write('docs/example.md', 'Concurrent user edit\n');
    if (target === 'asset') f.write(f.asset, 'Changed original');
    if (target === 'recipe') fs.appendFileSync(f.recipeFile, '\n');
    if (target === 'storyboard') fs.appendFileSync(f.storyboard, '\n');
    if (target === 'snapshot') fs.appendFileSync(path.join(f.captureDirectory, 'storyboard.json'), '\n');
    if (target === 'candidate') fs.appendFileSync(path.join(prepared.directory, prepared.output.file), '\n');
    if (target === 'approval') fs.appendFileSync(path.join(prepared.directory, 'review.json'), '\n');
    if (target === 'destination') f.write(planned.destination, 'Concurrent output');
    if (target === 'plan') {
      const value = JSON.parse(fs.readFileSync(planned.plan));
      value.articles[0].updated = 'Injected unrelated change';
      fs.writeFileSync(planned.plan, JSON.stringify(value));
      planned.sha256 = sha256(fs.readFileSync(planned.plan));
    }
    assert.throws(() => f.apply(planned), /stale|[Ss]tale|changed|No references|does not match/);
    assert.equal(JSON.parse(fs.readFileSync(f.recipeFile)).outputs[0].assets.length, 1);
    assert.equal(fs.existsSync(path.join(f.root, 'build', 'media', 'recipes', '.apply.lock')), false);
  }
});

test('partial write failures are explicit, retain old assets, and do not leave a lock or report success', t => {
  const f = fixture(t), prepared = f.prepare();
  f.approve(prepared);
  const planned = f.plan(prepared);
  const rename = fs.renameSync;
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (to === f.recipeFile) throw new Error('Synthetic recipe write failure');
    return rename(from, to);
  });
  assert.throws(() => f.apply(planned), /Written or attempted paths:.*example-202611221.png.*Synthetic recipe write failure/);
  assert.equal(fs.existsSync(path.join(f.root, ...f.asset.split('/'))), true);
  assert.equal(fs.existsSync(path.join(f.root, ...planned.destination.split('/'))), true);
  assert.equal(fs.existsSync(path.join(f.root, 'build', 'media', 'recipes', '.apply.lock')), false);
  assert.equal(findRecipe(f.root, planned.destination).status, 'unmapped');
});

test('revoked approval during application cannot produce a success result', t => {
  const f = fixture(t), prepared = f.prepare();
  f.approve(prepared);
  const planned = f.plan(prepared);
  const copy = fs.copyFileSync;
  t.mock.method(fs, 'copyFileSync', (from, to, flags) => {
    copy(from, to, flags);
    const file = path.join(prepared.directory, 'review.json');
    const review = JSON.parse(fs.readFileSync(file, 'utf8'));
    review.decision = 'rejected';
    fs.writeFileSync(file, JSON.stringify(review));
  });
  assert.throws(() => f.apply(planned), /Media refresh failed.*Media inputs changed during application/);
  assert.equal(fs.existsSync(path.join(f.root, 'build', 'media', 'recipes', '.apply.lock')), false);
});

test('media reference spans preserve Markdown, HTML, CRLF, and code while resolving published video paths', t => {
  const f = fixture(t);
  const source = '\uFEFF' + [
    '---', 'title: "![Not content](images/example.png)"', '---',
    '> ![Inline alt](<images/example.png?size=2#sample> "Preserve title")',
    '![Reference][shared] and [download][shared]', '',
    '[shared]: images/example.png "Shared title"', '',
    '<video src="images/example.mp4" poster="images/example.png"><source src=images/example.webm></video>',
    '`![Inline code](images/example.png)`', '```md', '![Fenced](images/example.png)', '```',
    '<!-- <img src="images/example.png"> -->',
    '<script>const sample = \'<img src="images/example.png">\';</script>',
    'Inline <textarea><img src="images/example.png"></textarea> text.',
    'Inline <textarea>', '', '![Raw text](images/example.png)', '', '</textarea>', ''
  ].join('\r\n');
  const refs = mediaReferences(source).filter(reference => reference.target.includes('example.png'));
  const updated = rewriteReferences(source, refs, 'example-202611221.png');
  assert.equal(updated.charCodeAt(0), 0xFEFF);
  assert.ok(updated.includes('title: "![Not content](images/example.png)"'));
  assert.ok(updated.includes('<images/example-202611221.png?size=2#sample> "Preserve title"'));
  assert.ok(updated.includes('[shared]: images/example-202611221.png "Shared title"'));
  assert.ok(updated.includes('poster="images/example-202611221.png"'));
  assert.ok(updated.includes('`![Inline code](images/example.png)`'));
  assert.ok(updated.includes('![Fenced](images/example.png)'));
  assert.ok(updated.includes('<!-- <img src="images/example.png"> -->'));
  assert.ok(updated.includes('<script>const sample = \'<img src="images/example.png">\';</script>'));
  assert.ok(updated.includes('Inline <textarea><img src="images/example.png"></textarea> text.'));
  assert.ok(updated.includes('![Raw text](images/example.png)'));
  assert.equal(updated.replaceAll('\r\n', '').includes('\n'), false);
  f.write('docs/images/example.webm', 'Video path fixture');
  const checker = createLinkChecker(f.root, {});
  assert.equal(checker.mediaFile(path.join(f.root, 'docs', 'example.md'), '/assets/docs/images/example.webm').file,
    path.join(f.root, 'docs', 'images', 'example.webm'));
  assert.throws(() => rewriteReferences('text', [{target: 'x', line: 1}], 'new.png'), /Cannot safely locate/);
});

test('ambiguous routes and unsupported srcset references block scoped application instead of partially rewriting it', t => {
  const f = fixture(t);
  f.write('docs/example.md', '<img src="images/example.png" srcset="images/example.png 1x">\n');
  let prepared = f.prepare();
  f.approve(prepared);
  assert.throws(() => f.plan(prepared), /Unresolved media references/);
  f.write('docs/example.md', '![Shared](/assets/docs/images/example.png)\n');
  f.write('docs/images/images/example.png', 'Ambiguous route fixture');
  prepared = f.prepare();
  f.approve(prepared);
  assert.throws(() => f.plan(prepared), /Ambiguous media target/);
});

test('format migration preserves stable ownership but refuses an incompatible explicit HTML type', t => {
  const f = fixture(t);
  const asset = 'docs/images/example.svg';
  f.write(asset, '<svg xmlns="http://www.w3.org/2000/svg"/>\n');
  f.recipe.outputs[0].assets = [asset];
  fs.writeFileSync(f.recipeFile, JSON.stringify(f.recipe));
  f.write('docs/example.md', '<img src="images/example.svg" type="image/svg+xml" alt="Keep this">\n');
  const prepared = f.prepare();
  f.approve(prepared);
  const options = {root: f.root, asset, assetSha256: sha256(fs.readFileSync(path.join(f.root, ...asset.split('/')))),
    manifest: prepared.manifest, articles: ['docs/example.md'], output: f.output};
  assert.throws(() => createRefreshPlan(options, f.dependencies), /explicit HTML media-type update/);
  f.write('docs/example.md', '<img src="images/example.svg" alt="Keep this">\n');
  const again = f.prepare();
  f.approve(again);
  const planned = createRefreshPlan({...options, manifest: again.manifest}, f.dependencies);
  f.apply(planned);
  assert.equal(fs.readFileSync(path.join(f.root, 'docs', 'example.md'), 'utf8'),
    '<img src="images/example-202611221.png" alt="Keep this">\n');
  assert.equal(findRecipe(f.root, asset).outputId, findRecipe(f.root, planned.destination).outputId);
});

test('version naming uses the stable stem and refuses invalid dates', t => {
  const f = fixture(t), output = f.recipe.outputs[0];
  f.write('docs/images/example-202611221.png', 'Old version');
  f.write('docs/images/example-202611223.webp', 'Another format');
  assert.equal(nextAsset(f.root, output, '20261122'), 'docs/images/example-202611224.png');
  assert.throws(() => nextAsset(f.root, output, '20260231'), /Invalid version date/);
});

test('recipe CLI rejects missing, duplicate, and cross-command options before making changes', () => {
  for (const args of [['other'], ['find'], ['find', '--asset'], ['check', '--confirm-apply'],
    ['prepare', '--recipe-id', 'example'], ['apply', '--plan', 'file.json'],
    ['find', '--asset', 'a.png', '--asset', 'b.png']]) assert.throws(() => main(args), /Unknown|Required|Missing/);
});
