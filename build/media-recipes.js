'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {isDeepStrictEqual} = require('node:util');
const {collectMarkdownFiles, isWithinRoot} = require('./repository-paths');
const {createFileSnapshot, createLinkChecker} = require('./check-links');
const {keys} = require('./media-png');
const {confinedFile, preparationFrame, prepareMedia, privateDirectory, verifyMedia, verifySources} = require('./media');
const {validateStoryboard} = require('./storyboard');
const {mediaReferences, rewriteReferences} = require('./media-references');

/* eslint-disable security/detect-non-literal-fs-filename -- Repository paths reject links/traversal; plans and candidates are confined to explicit private directories. */

const ROOT = path.resolve(__dirname, '..');
const CONTENT = ['docs', 'api', 'remote', 'learn', 'blogs', 'release-notes', 'remote-release-notes'];
const ID = /^[a-z][a-z0-9-]{0,63}$/;
const HASH = /^[a-f0-9]{64}$/;
const MEDIA = /\.(png|webp|webm|mp4|jpg|gif|svg)$/;
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
function fingerprint(file) {
  const info = fs.lstatSync(file);
  if (!info.isFile() || info.isSymbolicLink() || info.size > 64 * 1024 * 1024) throw new Error('Expected a regular media-refresh input up to 64 MiB.');
  return hash(fs.readFileSync(file));
}

function shape(value, fields, label) {
  keys(value, fields, label);
  if (fields.some(field => !Object.hasOwn(value, field))) throw new Error(`Missing ${label} fields.`);
}

function repositoryPath(root, relative, missing = false) {
  if (typeof relative !== 'string' || relative.length > 300 || !/^[a-zA-Z0-9_./-]+$/.test(relative) ||
      relative.split('/').some(part => !part || ['.', '..'].includes(part)) || path.isAbsolute(relative)) {
    throw new Error(`Invalid repository-relative path: ${relative}`);
  }
  let file = root;
  for (const [index, part] of relative.split('/').entries()) {
    file = path.join(file, part);
    let info;
    try { info = fs.lstatSync(file); }
    catch (error) {
      if (missing && error.code === 'ENOENT') return path.resolve(root, ...relative.split('/'));
      throw error;
    }
    const actual = fs.realpathSync(file);
    if (info.isSymbolicLink() || !isWithinRoot(root, actual) || actual !== file) throw new Error(`Linked or case-mismatched repository paths are not supported: ${relative}`);
    if (index < relative.split('/').length - 1 && !info.isDirectory()) throw new Error(`Expected a directory: ${relative}`);
  }
  return file;
}

function assetPath(root, relative, missing = false) {
  if (typeof relative !== 'string' || !CONTENT.includes(relative.split('/')[0]) || !MEDIA.test(relative)) {
    throw new Error('Use a supported repository-relative media path.');
  }
  const file = repositoryPath(root, relative, missing);
  if (!missing && !fs.statSync(file).isFile()) throw new Error(`Expected an asset file: ${relative}`);
  return file;
}

function readJson(file, maximum = 1024 * 1024) {
  const info = fs.lstatSync(file);
  if (!info.isFile() || info.isSymbolicLink() || info.size > maximum) throw new Error('Expected a bounded regular JSON file.');
  const bytes = fs.readFileSync(file);
  return {value: JSON.parse(bytes.toString('utf8')), sha256: hash(bytes)};
}

function validateRecipe(root, recipe) {
  shape(recipe, ['schemaVersion', 'id', 'storyboard', 'outputs'], 'media recipe');
  if (recipe.schemaVersion !== 1 || !ID.test(recipe.id) ||
      !/^build\/storyboards\/[a-z][a-z0-9-]*\.json$/.test(recipe.storyboard) ||
      !Array.isArray(recipe.outputs) || !recipe.outputs.length || recipe.outputs.length > 20) throw new Error('Invalid media recipe identity or outputs.');
  const storyboardFile = repositoryPath(root, recipe.storyboard);
  const loadedStoryboard = readJson(storyboardFile);
  const storyboard = validateStoryboard(loadedStoryboard.value);
  if (storyboard.$schema !== undefined && storyboard.$schema !== '../storyboard.schema.json') throw new Error('Use a portable storyboard schema reference.');
  repositoryPath(root, storyboard.article);
  const ids = new Set();
  for (const output of recipe.outputs) {
    shape(output, ['id', 'base', 'source', 'prepare', 'assets'], 'media output');
    if (!ID.test(output.id) || ids.has(output.id) || !['screenshot', 'highlighted', 'video'].includes(output.source) ||
        typeof output.base !== 'string' || !CONTENT.includes(output.base.split('/')[0]) ||
        !/^[a-z][a-z0-9-]*$/.test(path.posix.basename(output.base)) || !Array.isArray(output.assets)) throw new Error('Invalid media output identity, source, or base name.');
    ids.add(output.id);
    repositoryPath(root, output.base, true);
    if ((output.source === 'video' && (!storyboard.video || !['mp4', 'webm'].includes(output.prepare?.format))) ||
        (output.source !== 'video' && !['png', 'webp'].includes(output.prepare?.format)) ||
        (output.source === 'highlighted' && !storyboard.capture.highlights)) throw new Error('Output format or source is not provided by its storyboard.');
    if (output.prepare.format === 'webm' && Object.keys(output.prepare).length !== 1) throw new Error('WebM recipes must preserve the recorded bytes.');
    preparationFrame({width: storyboard.profile.width, height: storyboard.profile.height,
      format: output.source === 'video' ? 'webm' : 'png', decodedFrames: 750}, output.prepare);
    for (const asset of output.assets) {
      assetPath(root, asset);
      if (path.posix.dirname(asset) !== path.posix.dirname(output.base)) throw new Error('Published assets must share their output base directory.');
      if ((output.source === 'video') !== /\.(mp4|webm)$/.test(asset)) throw new Error('Published asset kind must match its capture source.');
    }
  }
  return {storyboard, storyboardFile, storyboardSha256: loadedStoryboard.sha256};
}

function loadRecipes(directory = ROOT) {
  const root = fs.realpathSync(directory);
  const folder = repositoryPath(root, 'build/media-recipes');
  const recipes = [], owners = new Map(), destinations = new Set();
  for (const name of fs.readdirSync(folder).filter(name => name.endsWith('.json')).sort()) {
    const relative = `build/media-recipes/${name}`;
    const file = repositoryPath(root, relative);
    const loaded = readJson(file);
    const recipe = loaded.value;
    const source = validateRecipe(root, recipe);
    if (name !== `${recipe.id}.json`) throw new Error('Recipe filename must match its stable ID.');
    const entry = {file, relative, recipe, sha256: loaded.sha256, ...source};
    recipes.push(entry);
    for (const output of recipe.outputs) {
      const destination = `${output.base}.${output.prepare.format}`;
      if (destinations.has(destination)) throw new Error(`Duplicate media output base: ${destination}`);
      destinations.add(destination);
      for (const asset of output.assets) {
        if (owners.has(asset)) throw new Error(`Duplicate asset ownership: ${asset}`);
        owners.set(asset, {entry, output});
      }
    }
  }
  return {root, recipes, owners};
}

function findRecipe(root, asset) {
  const registry = loadRecipes(root);
  assetPath(registry.root, asset);
  const owner = registry.owners.get(asset);
  const assetSha256 = fingerprint(assetPath(registry.root, asset));
  if (!owner) return {status: 'unmapped', asset, assetSha256};
  return {status: 'mapped', asset, assetSha256, recipe: owner.entry.relative, recipeId: owner.entry.recipe.id,
    outputId: owner.output.id, storyboard: owner.entry.recipe.storyboard, source: owner.output.source, prepare: owner.output.prepare};
}

function prepareFromRecipe(options, dependencies = {}) {
  const registry = loadRecipes(options.root || ROOT);
  const entry = registry.recipes.find(entry => entry.recipe.id === options.recipeId);
  const output = entry?.recipe.outputs.find(output => output.id === options.outputId);
  if (!output) throw new Error('Choose a registered recipe ID and output ID.');
  const capture = readJson(options.capture);
  if (capture.sha256 !== options.captureSha256 || capture.value.storyboard?.sha256 !== entry.storyboardSha256 ||
      capture.value.storyboard.file !== 'storyboard.json') throw new Error('Capture does not match the preserved registered storyboard.');
  const source = Reflect.get(capture.value, output.source === 'screenshot' ? 'asset' : output.source);
  if (!source) throw new Error('The requested source was not produced by this capture.');
  const input = confinedFile(path.dirname(path.resolve(options.capture)), source.file);
  return prepareMedia({input, sha256: source.sha256, recipe: output.prepare, output: options.output,
    capture: options.capture, captureSha256: options.captureSha256, ffmpeg: options.ffmpeg, ffprobe: options.ffprobe},
  {...dependencies, repository: registry.root});
}

function validDay(day) {
  if (typeof day !== 'string' || !/^\d{8}$/.test(day) ||
      new Date(`${day.slice(0, 4)}-${day.slice(4, 6)}-${day.slice(6, 8)}T00:00:00Z`).toISOString().slice(0, 10).replaceAll('-', '') !== day) {
    throw new Error('Invalid version date; use yyyymmdd.');
  }
  return day;
}

function nextAsset(root, output, day) {
  validDay(day);
  const folder = repositoryPath(root, path.posix.dirname(output.base));
  const prefix = `${path.posix.basename(output.base)}-${day}`;
  let sequence = 0;
  for (const name of fs.readdirSync(folder)) {
    if (!name.startsWith(prefix) || !MEDIA.test(name)) continue;
    const value = name.slice(prefix.length, name.lastIndexOf('.'));
    if (/^[1-9]\d*$/.test(value)) {
      const number = Number(value);
      if (!Number.isSafeInteger(number) || number >= Number.MAX_SAFE_INTEGER) throw new Error('Media version sequence is outside the supported range.');
      sequence = Math.max(sequence, number);
    }
  }
  return `${output.base}-${day}${sequence + 1}.${output.prepare.format}`;
}

function normalizedRecipe(source, recipe) {
  const frame = preparationFrame(source, recipe);
  return recipe.format === 'webm' ? {format: 'webm'} :
    {format: recipe.format, crop: frame.crop, padding: frame.padding, background: frame.background,
      ...(frame.highlights ? {highlights: frame.highlights} : {})};
}

function approvedCandidate(registry, owner, options, dependencies) {
  const prepared = verifyMedia(options, {...dependencies, repository: registry.root});
  if (prepared.approval !== 'approved') throw new Error('A fresh exact-asset human approval is required before planning application.');
  const capture = prepared.manifest.capture;
  if (!capture || capture.storyboard?.file !== 'storyboard.json') throw new Error('Recapture with preserved storyboard inputs before registered application.');
  if (capture.storyboard.sha256 !== owner.entry.storyboardSha256) throw new Error('Candidate storyboard does not match the registered instructions.');
  const manifest = readJson(capture.path).value;
  if (!HASH.test(manifest.articleHash || '') ||
      fingerprint(repositoryPath(registry.root, owner.entry.storyboard.article)) !== manifest.articleHash) {
    throw new Error('Capture article changed or lacks provenance. Review the capture proposal again.');
  }
  const source = Reflect.get(manifest, owner.output.source === 'screenshot' ? 'asset' : owner.output.source);
  if (!source || source.file !== capture.asset) throw new Error('Candidate uses the wrong registered capture source.');
  if (!isDeepStrictEqual(normalizedRecipe(prepared.manifest.source.validation, owner.output.prepare), prepared.manifest.recipe)) {
    throw new Error('Candidate preparation does not match the registered recipe.');
  }
  const review = path.join(prepared.directory, 'review.json');
  return {...prepared, reviewSha256: fingerprint(review), captureArticleHash: manifest.articleHash};
}

function assertCandidateUnchanged(prepared) {
  verifySources(prepared.manifest);
  if (fingerprint(prepared.manifestPath) !== prepared.manifestSha256 ||
      fingerprint(path.join(prepared.directory, 'review.json')) !== prepared.reviewSha256 ||
      fingerprint(prepared.output) !== prepared.manifest.output.sha256) throw new Error('Media inputs changed during application or planning.');
}

function consumers(root, original, destination) {
  const snapshot = createFileSnapshot(root);
  const checker = createLinkChecker(root, {}, {fileSnapshot: snapshot});
  const virtual = createLinkChecker(root, {}, {fileSnapshot: {
    read: file => file === destination ? {file: true} : snapshot.read(file)
  }});
  const roots = CONTENT.filter(name => fs.existsSync(path.join(root, name)));
  const documents = [];
  for (const file of collectMarkdownFiles(root, roots)) {
    const article = path.relative(root, file).split(path.sep).join('/');
    repositoryPath(root, article);
    const captured = snapshot.read(file);
    if (!captured.bytes) throw new Error(`Could not read Markdown references in ${article}.`);
    const content = captured.bytes.toString('utf8');
    if (!Buffer.from(content).equals(captured.bytes)) throw new Error(`Markdown reference updates require UTF-8 input: ${article}`);
    const references = [], problems = [];
    for (const reference of mediaReferences(content)) {
      const resolved = checker.mediaFile(file, reference.target);
      if (resolved?.file === original) references.push(reference);
      else if (resolved?.message) {
        let target = reference.target;
        try { target = decodeURIComponent(target); }
        catch (error) { if (!(error instanceof URIError)) throw error; }
        if (target.includes(path.basename(original))) problems.push({line: reference.line, message: resolved.message});
      }
    }
    if (!references.length && !problems.length) continue;
    documents.push({path: article, sha256: captured.sha256, content, references, problems});
  }
  return {documents, virtual, assertCurrent: () => snapshot.assertUnchanged()};
}

function planData(options, dependencies = {}) {
  const registry = loadRecipes(options.root || ROOT);
  const original = assetPath(registry.root, options.asset);
  if (!HASH.test(options.assetSha256 || '') || fingerprint(original) !== options.assetSha256) {
    throw new Error('Original asset changed since the approved capture proposal; supply its expected SHA-256.');
  }
  const owner = registry.owners.get(options.asset);
  if (!owner) throw new Error('This asset is unmapped. Register reviewed regeneration instructions first.');
  if (!Array.isArray(options.articles) || !options.articles.length || new Set(options.articles).size !== options.articles.length) {
    throw new Error('Select the explicit Markdown files to update.');
  }
  for (const article of options.articles) {
    if (typeof article !== 'string' || !CONTENT.includes(article.split('/')[0]) || !article.endsWith('.md')) throw new Error('Choose supported Markdown content files.');
    repositoryPath(registry.root, article);
  }
  const prepared = approvedCandidate(registry, owner, options, dependencies);
  const day = validDay(options.day);
  const destination = nextAsset(registry.root, owner.output, day);
  const file = assetPath(registry.root, destination, true);
  const found = consumers(registry.root, original, file);
  const articles = options.articles.map(article => {
    const document = found.documents.find(item => item.path === article);
    if (!document) throw new Error(`No references to the original asset in approved article: ${article}`);
    if (document.problems.length) throw new Error(`Unresolved media references in ${article}: ${document.problems.map(item => item.message).join('; ')}`);
    const mime = new Map([['png', 'image/png'], ['webp', 'image/webp'], ['mp4', 'video/mp4'], ['webm', 'video/webm']]).get(owner.output.prepare.format);
    if (path.posix.extname(options.asset) !== path.posix.extname(destination) && document.references.some(reference =>
      reference.mime && reference.mime.split(';')[0].trim().toLowerCase() !== mime)) {
      throw new Error(`Format migration requires an explicit HTML media-type update in ${article}.`);
    }
    const updated = rewriteReferences(document.content, document.references, path.posix.basename(destination));
    const references = mediaReferences(updated).filter(reference => found.virtual.mediaFile(repositoryPath(registry.root, article), reference.target)?.file === file);
    if (references.length !== document.references.length) throw new Error(`Could not verify every updated media reference in ${article}.`);
    return {path: article, sha256: document.sha256, updated, references: references.length};
  });
  found.assertCurrent();
  assertCandidateUnchanged(prepared);
  if (fingerprint(original) !== options.assetSha256 || fingerprint(owner.entry.file) !== owner.entry.sha256 ||
      fingerprint(owner.entry.storyboardFile) !== owner.entry.storyboardSha256 ||
      fingerprint(repositoryPath(registry.root, owner.entry.storyboard.article)) !== prepared.captureArticleHash) {
    throw new Error('Media recipe, article, or original asset changed during planning.');
  }
  return {format: 'vscode-docs-media-refresh', version: 1, root: registry.root, day,
    asset: options.asset, assetSha256: fingerprint(original), destination,
    recipe: owner.entry.relative, recipeSha256: owner.entry.sha256, outputId: owner.output.id,
    storyboardSha256: owner.entry.storyboardSha256,
    manifest: prepared.manifestPath, manifestSha256: prepared.manifestSha256,
    candidateSha256: prepared.manifest.output.sha256, reviewSha256: prepared.reviewSha256, articles,
    otherConsumers: found.documents.filter(item => !options.articles.includes(item.path))
      .map(item => ({article: item.path, references: item.references.length, ...(item.problems.length ? {problems: item.problems} : {})}))};
}

function createRefreshPlan(options, dependencies = {}) {
  const today = new Date();
  const day = dependencies.day || `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const plan = planData({...options, day}, dependencies);
  const directory = privateDirectory(options.output, plan.root);
  const file = path.join(directory, `media-refresh-${crypto.randomUUID()}.json`);
  const bytes = `${JSON.stringify(plan, null, 2)}\n`;
  fs.writeFileSync(file, bytes, {flag: 'wx', mode: 0o600});
  return {plan: file, sha256: hash(bytes), destination: plan.destination,
    articles: plan.articles.map(article => article.path), recipe: plan.recipe, otherConsumers: plan.otherConsumers};
}

function replaceFile(root, relative, expected, bytes) {
  const file = repositoryPath(root, relative);
  const temporary = `${file}.${crypto.randomUUID()}.pending`;
  try {
    fs.writeFileSync(temporary, bytes, {flag: 'wx'});
    if (fingerprint(file) !== expected) throw new Error(`Input changed before application: ${relative}`);
    fs.renameSync(temporary, file);
  } finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
}

function applyRefreshPlan(options, dependencies = {}) {
  const root = fs.realpathSync(options.root || ROOT);
  privateDirectory(path.dirname(path.resolve(options.plan)), root);
  const loaded = readJson(options.plan, 64 * 1024 * 1024);
  if (!HASH.test(options.planSha256 || '') || loaded.sha256 !== options.planSha256 || options.confirmApply !== true) {
    throw new Error('Application requires the reviewed plan SHA-256 and explicit write approval.');
  }
  const plan = loaded.value;
  if (plan.root !== root || plan.format !== 'vscode-docs-media-refresh' || plan.version !== 1 || !Array.isArray(plan.articles)) throw new Error('Invalid media application plan.');
  const lock = repositoryPath(root, 'build/media-recipes/.apply.lock', true);
  const handle = fs.openSync(lock, 'wx', 0o600);
  const written = [];
  let failure;
  try {
    const current = planData({root, asset: plan.asset, assetSha256: plan.assetSha256, manifest: plan.manifest, day: plan.day,
      articles: plan.articles.map(article => article.path), ffmpeg: options.ffmpeg, ffprobe: options.ffprobe}, dependencies);
    if (!isDeepStrictEqual(current, plan)) throw new Error('Media plan inputs or proposed changes are stale. Prepare and approve a new plan.');
    const registry = loadRecipes(root);
    const owner = registry.owners.get(plan.asset);
    const prepared = approvedCandidate(registry, owner, {manifest: plan.manifest, ffmpeg: options.ffmpeg, ffprobe: options.ffprobe}, dependencies);
    const destination = assetPath(root, plan.destination, true);
    written.push(plan.destination);
    fs.copyFileSync(prepared.output, destination, fs.constants.COPYFILE_EXCL);
    if (fingerprint(destination) !== plan.candidateSha256) throw new Error('Applied bytes differ from the approved asset.');
    for (const article of plan.articles) {
      written.push(article.path);
      replaceFile(root, article.path, article.sha256, article.updated);
    }
    const recipe = structuredClone(owner.entry.recipe);
    recipe.outputs.find(output => output.id === plan.outputId).assets.push(plan.destination);
    written.push(plan.recipe);
    replaceFile(root, plan.recipe, plan.recipeSha256, `${JSON.stringify(recipe, null, 2)}\n`);
    assertCandidateUnchanged(prepared);
    if (fingerprint(assetPath(root, plan.asset)) !== plan.assetSha256 ||
        fingerprint(owner.entry.storyboardFile) !== plan.storyboardSha256) throw new Error('Media inputs changed during application.');
    for (const article of plan.articles) {
      if (fingerprint(repositoryPath(root, article.path)) !== hash(article.updated)) throw new Error(`Article changed during application: ${article.path}`);
    }
    if (fingerprint(owner.entry.file) !== hash(`${JSON.stringify(recipe, null, 2)}\n`)) throw new Error('Recipe changed during application.');
    const lookup = findRecipe(root, plan.destination);
    if (lookup.recipe !== plan.recipe || lookup.outputId !== plan.outputId) throw new Error('New asset lookup does not match its recipe.');
  } catch (error) { failure = error; }
  try { fs.closeSync(handle); fs.unlinkSync(lock); }
  catch (error) { failure = failure ? new AggregateError([failure, error], 'Application and lock cleanup failed.') : error; }
  if (failure) throw new Error(`Media refresh failed. Written or attempted paths: ${written.join(', ') || 'none'}. ${failure.message}`, {cause: failure});
  return {status: 'applied', asset: plan.destination, written};
}

function main(argv) {
  const command = argv[0];
  if (!command || command === '--help') {
    console.log('Usage: node build/media-recipes.js check [--root <checkout>]\n' +
      '       node build/media-recipes.js find --asset <repo-path> [--root <checkout>]\n' +
      '       node build/media-recipes.js prepare --recipe-id <id> --output-id <id> --capture <capture.json> --capture-sha256 <hash> --output <private-dir> [--root <checkout>] [--ffmpeg <exe> --ffprobe <exe>]\n' +
      '       node build/media-recipes.js plan --asset <repo-path> --asset-sha256 <original-hash> --manifest <media.json> --articles <file.md> ... --output <private-dir> [--root <checkout>] [--ffmpeg <exe> --ffprobe <exe>]\n' +
      '       node build/media-recipes.js apply --plan <private-plan.json> --plan-sha256 <hash> --confirm-apply [--root <checkout>] [--ffmpeg <exe> --ffprobe <exe>]');
    return;
  }
  const fields = command === 'check' ? ['root'] : command === 'find' ? ['root', 'asset'] :
    command === 'prepare' ? ['root', 'recipe-id', 'output-id', 'capture', 'capture-sha256', 'output', 'ffmpeg', 'ffprobe'] :
    command === 'plan' ? ['root', 'asset', 'asset-sha256', 'manifest', 'articles', 'output', 'ffmpeg', 'ffprobe'] :
      command === 'apply' ? ['root', 'plan', 'plan-sha256', 'confirm-apply', 'ffmpeg', 'ffprobe'] : [];
  if (!fields.length) throw new Error('Unknown media recipe command.');
  const options = {};
  for (let i = 1; i < argv.length; i++) {
    const option = argv.at(i);
    const name = option.slice(2);
    const key = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (!option.startsWith('--') || !fields.includes(name) || Object.hasOwn(options, key)) throw new Error('Unknown or duplicate media recipe option.');
    if (name === 'confirm-apply') Reflect.set(options, key, true);
    else if (name === 'articles') {
      options.articles = [];
      while (argv.at(i + 1) && !argv.at(i + 1).startsWith('--')) options.articles.push(argv.at(++i));
    } else {
      if (!argv.at(i + 1) || argv.at(i + 1).startsWith('--')) throw new Error(`Missing value for --${name}.`);
      Reflect.set(options, key, argv.at(++i));
    }
  }
  const required = command === 'check' ? [] : command === 'find' ? ['asset'] : command === 'prepare' ?
    ['recipeId', 'outputId', 'capture', 'captureSha256', 'output'] : command === 'plan' ?
      ['asset', 'assetSha256', 'manifest', 'articles', 'output'] : ['plan', 'planSha256', 'confirmApply'];
  if (required.some(key => !Object.hasOwn(options, key)) || (options.articles && !options.articles.length)) {
    throw new Error(`Required options: ${required.join(', ')}.`);
  }
  const result = command === 'check' ? loadRecipes(options.root).recipes.map(entry =>
    ({id: entry.recipe.id, outputs: entry.recipe.outputs.map(output => ({id: output.id, assets: output.assets, status: output.assets.length ? 'mapped' : 'unpublished'}))})) :
    command === 'find' ? findRecipe(options.root, options.asset) : command === 'prepare' ? prepareFromRecipe(options) :
      command === 'plan' ? createRefreshPlan(options) : applyRefreshPlan(options);
  console.log(JSON.stringify(result, null, 2));
  if (result?.status === 'unmapped') process.exitCode = 1;
}

if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = {applyRefreshPlan, createRefreshPlan, findRecipe, loadRecipes, main, nextAsset, prepareFromRecipe};
