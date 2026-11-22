'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');
const {validateStoryboard} = require('./storyboard');
const {isWithinRoot} = require('./repository-paths');
const {failureDetails} = require('./replay-errors');

/* eslint-disable security/detect-non-literal-fs-filename -- Explicit reviewed inputs and owned private output directories. */

const ROOT = fs.realpathSync(path.resolve(__dirname, '..'));
const RUNNERS = ['replay.js', 'replay-errors.js', 'capture.js', 'capture-preparation.js', 'storyboard.js',
  'storyboard.schema.json', 'findings.js', 'findings.schema.json', 'repository-paths.js'];
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const fileHash = file => hash(fs.readFileSync(file));

function privateDirectory(directory) {
  const resolved = fs.realpathSync(directory);
  if (!fs.statSync(resolved).isDirectory() || isWithinRoot(ROOT, resolved) || isWithinRoot(resolved, ROOT)) {
    throw new Error('Replay output must be an existing private directory outside the repository and its ancestors.');
  }
  return resolved;
}

function inspectProcedure(options) {
  const bytes = fs.readFileSync(options.storyboard);
  const storyboard = validateStoryboard(JSON.parse(bytes));
  if (!/^[a-f0-9]{40}$/i.test(options.revision)) throw new Error('Supply the full product build revision.');
  const article = fs.realpathSync(path.resolve(ROOT, ...storyboard.article.split('/')));
  if (!isWithinRoot(ROOT, article) || !fs.statSync(article).isFile()) throw new Error('Article must be inside the trusted checkout.');
  if (storyboard.workspace && (!path.isAbsolute(options.workspace || '') || !path.isAbsolute(options.captureProfile || ''))) {
    throw new Error('Review requires absolute workspace and dedicated capture-profile paths.');
  }
  if (!storyboard.workspace && (options.workspace || options.captureProfile)) throw new Error('This storyboard uses a synthetic fixture.');
  const binding = {
    article: storyboard.article, articleHash: fileHash(article),
    sourceRevision: execFileSync('git', ['rev-parse', 'HEAD'], {cwd: ROOT, encoding: 'utf8'}).trim(),
    storyboardId: storyboard.id, storyboardHash: hash(bytes),
    runnerHash: hash(JSON.stringify(RUNNERS.map(file => [file, fileHash(path.join(__dirname, file))]))),
    product: {revision: options.revision, channel: storyboard.channel},
    ...(storyboard.workspace ? {workspace: path.resolve(options.workspace), captureProfile: path.resolve(options.captureProfile)} : {})
  };
  return {binding, bindingHash: hash(JSON.stringify(binding))};
}

function reviewProcedure(options) {
  const inspected = inspectProcedure(options);
  if (options.attestReviewed !== true || options.bindingHash !== inspected.bindingHash) {
    throw new Error('Review requires an explicit human attestation and the exact inspected --binding-hash.');
  }
  const output = privateDirectory(options.output);
  if (inspected.binding.workspace && (isWithinRoot(output, inspected.binding.workspace) ||
      isWithinRoot(inspected.binding.workspace, output))) throw new Error('Private output must be separate from the workspace.');
  const directory = fs.mkdtempSync(path.join(output, 'procedure-review-'));
  const review = {schemaVersion: 1, ...inspected, decision: 'reviewed', reviewedAt: new Date().toISOString()};
  const file = path.join(directory, 'review.json');
  fs.writeFileSync(file, JSON.stringify(review, null, 2), {flag: 'wx'});
  return {file, sha256: fileHash(file), ...inspected};
}

function readReview(file) {
  const review = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (review.schemaVersion !== 1 || review.decision !== 'reviewed' ||
      review.bindingHash !== hash(JSON.stringify(review.binding)) ||
      typeof review.reviewedAt !== 'string' || !Number.isFinite(Date.parse(review.reviewedAt))) {
    throw new Error('Invalid reviewed procedure. Inspect and obtain an exact human review again.');
  }
  return review;
}

function assertBinding(current, review) {
  if (current.bindingHash !== review.bindingHash) {
    throw new Error('Stale procedure review: article, source, storyboard, runner, workspace, or build changed. Review again.');
  }
}

function reference(file) {
  return {file, sha256: fileHash(file)};
}

function makeReport(review, reviewReference, evidenceReference, result) {
  const {binding, bindingHash} = review;
  const generatedAt = new Date().toISOString();
  const failures = result.failures || [];
  const status = failures.some(item => item.category !== 'mismatch') ? 'incomplete' : failures.length ? 'mismatch' : 'passed';
  const report = {
    schemaVersion: 5, checks: ['replay'], sourceRevision: binding.sourceRevision, generatedAt,
    scanPaths: [binding.article], inputHash: bindingHash,
    replay: {binding, review: reviewReference, evidence: evidenceReference, status},
    findings: failures.map(failure => {
      // Paths, timestamps and observed values are evidence, not finding identity.
      const evidence = JSON.stringify({storyboard: binding.storyboardId, phase: failure.phase || 'run',
        step: failure.step ?? null, target: failure.target || null, code: failure.code});
      return {
        id: hash(`replay\0${binding.article}\0${evidence}`), kind: 'replay',
        severity: failure.category === 'mismatch' ? 'warning' : 'unverified',
        article: binding.article, articleHash: binding.articleHash, line: 1, evidence,
        sourceRevision: binding.sourceRevision, status: 'open', firstSeen: generatedAt, lastSeen: generatedAt,
        message: `Procedure ${binding.storyboardId}${Number.isInteger(failure.step) ? ` step ${failure.step + 1} (${failure.kind})` : ''}: ${failure.category} (${failure.code}).` +
          (failure.category === 'mismatch' ? ' Review the assertion and article; this is not proof of an article bug.' : ' Replay is incomplete; no documentation mismatch is inferred.'),
        replayEvidence: failure
      };
    })
  };
  return require('./findings').validateReport(report);
}

async function replayProcedure(options, dependencies = {}) {
  const review = readReview(options.review);
  const bindingOptions = {
    storyboard: options.storyboard, revision: review.binding.product.revision,
    workspace: review.binding.workspace, captureProfile: review.binding.captureProfile
  };
  assertBinding(inspectProcedure(bindingOptions), review);
  const output = privateDirectory(options.output);
  if (review.binding.workspace && (isWithinRoot(output, review.binding.workspace) || isWithinRoot(review.binding.workspace, output))) {
    throw new Error('Private output must be separate from the workspace.');
  }
  const directory = fs.mkdtempSync(path.join(output, 'procedure-replay-'));
  const reviewReference = reference(path.resolve(options.review));
  let capture;
  let failures = [];
  let preflight = 'executable-unavailable';
  try {
    if (!path.isAbsolute(options.executable || '') || !fs.statSync(options.executable).isFile()) {
      throw new Error('Installed executable unavailable.');
    }
    if (!dependencies.launch) {
      preflight = 'playwright-unavailable';
      (dependencies.resolvePlaywright || require.resolve)('playwright-core');
    }
    preflight = 'capture-prerequisite-failed';
    capture = await require('./capture').captureEditor({
      ...bindingOptions, executable: options.executable, output: directory, replay: true,
      waitForReady: options.waitForReady
    }, dependencies);
  } catch (error) {
    capture = error.capture;
    failures = capture?.manifest.failures || [failureDetails(error, 'prerequisite', preflight)];
  }
  try {
    assertBinding(inspectProcedure(bindingOptions), review);
    if (fileHash(options.review) !== reviewReference.sha256) throw new Error('Review changed.');
    if (capture && (capture.manifest.storyboard.sha256 !== review.binding.storyboardHash ||
        capture.manifest.sourceRevision !== review.binding.sourceRevision ||
        capture.manifest.articleHash !== review.binding.articleHash)) throw new Error('Captured inputs differ from review.');
  } catch {
    failures.push({category: 'prerequisite', code: 'reviewed-inputs-changed'});
  }
  const result = {
    schemaVersion: 1, bindingHash: review.bindingHash, status: failures.length ? 'failed' : 'passed',
    privacy: 'structural-evidence-only-no-pixels-or-ui-text',
    steps: capture?.manifest.steps || [], failures,
    ...(capture ? capture.manifestPersisted === false ? {captureState: capture.manifest} :
      {capture: reference(path.join(capture.directory, 'capture.json'))} : {})
  };
  const evidenceFile = path.join(directory, 'replay.json');
  try {
    fs.writeFileSync(evidenceFile, JSON.stringify(result, null, 2), {flag: 'wx'});
    const report = makeReport(review, reviewReference, reference(evidenceFile), result);
    const reportFile = path.join(directory, 'findings.json');
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2), {flag: 'wx'});
    return {directory, reportFile, report};
  } catch (error) {
    throw new Error('Replay failed: could not save complete private replay evidence. Partial files may remain.', {cause: error});
  }
}

function assertReplayEvidence(report, options) {
  const review = readReview(options.review);
  if (fileHash(options.review) !== report.replay.review.sha256) throw new Error('Replay review evidence changed.');
  const evidence = report.replay.evidence;
  if (fileHash(evidence.file) !== evidence.sha256) throw new Error('Replay evidence changed.');
  const result = JSON.parse(fs.readFileSync(evidence.file, 'utf8'));
  if (result.capture && fileHash(result.capture.file) !== result.capture.sha256) throw new Error('Capture evidence changed.');
  if (result.bindingHash !== report.inputHash) throw new Error('Replay evidence belongs to another review.');
  if (!Array.isArray(result.failures) || result.status !== (result.failures.length ? 'failed' : 'passed')) {
    throw new Error('Replay evidence has an inconsistent completion status.');
  }
  const expected = makeReport(review, report.replay.review, evidence, result);
  const observations = findings => findings.map(({id, replayEvidence}) => ({id, replayEvidence}))
    .sort((left, right) => left.id.localeCompare(right.id));
  if (expected.replay.status !== report.replay.status ||
      JSON.stringify(observations(expected.findings)) !== JSON.stringify(observations(report.findings))) {
    throw new Error('Replay report contradicts the saved step evidence.');
  }
  return review;
}

function assertReplayCurrent(report, options) {
  const review = readReview(options.review);
  const current = inspectProcedure({storyboard: options.storyboard, revision: review.binding.product.revision,
    workspace: review.binding.workspace, captureProfile: review.binding.captureProfile});
  assertBinding(current, review);
  if (current.bindingHash !== report.inputHash || fileHash(options.review) !== report.replay.review.sha256) {
    throw new Error('Stale replay report: reviewed inputs changed.');
  }
  assertReplayEvidence(report, options);
}

async function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/replay.js inspect|review|run --storyboard <file> [options]');
    console.log('inspect/review: --revision <build-commit> [--workspace <folder> --capture-profile <dedicated-directory>]');
    console.log('review: --output <private-directory> --binding-hash <inspected-hash> --attest-reviewed');
    console.log('run: --review <review.json> --executable <Code.exe> --output <private-directory> [--wait-for-ready]');
    return 0;
  }
  const [command, ...remaining] = args;
  const allowed = {
    inspect: ['storyboard', 'revision', 'workspace', 'capture-profile'],
    review: ['storyboard', 'revision', 'workspace', 'capture-profile', 'output', 'binding-hash', 'attest-reviewed'],
    run: ['storyboard', 'review', 'executable', 'output', 'wait-for-ready']
  };
  if (!Object.hasOwn(allowed, command)) throw new Error('Choose inspect, review, or run; use --help.');
  const options = {};
  while (remaining.length) {
    const argument = remaining.shift();
    if (!argument.startsWith('--')) throw new Error('Replay options must begin with --.');
    const option = argument.slice(2);
    const key = option.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
    if (!Reflect.get(allowed, command).includes(option) || Object.hasOwn(options, key)) throw new Error('Unknown or repeated replay option.');
    const value = ['attest-reviewed', 'wait-for-ready'].includes(option) ? true : remaining.shift();
    if (!value || (typeof value === 'string' && value.startsWith('--'))) throw new Error('Missing replay option value.');
    Reflect.set(options, key, value);
  }
  if (!options.storyboard) throw new Error('Supply --storyboard.');
  if (command === 'run' && (!options.review || !options.executable || !options.output)) {
    throw new Error('Run requires --review, --executable, and --output.');
  }
  const result = command === 'inspect' ? inspectProcedure(options) :
    command === 'review' ? reviewProcedure(options) : await replayProcedure(options);
  console.log(JSON.stringify(result, null, 2));
  return command === 'run' ? result.report.replay.status === 'passed' ? 0 : result.report.replay.status === 'mismatch' ? 1 : 2 : 0;
}

module.exports = {assertReplayCurrent, assertReplayEvidence, inspectProcedure, main, makeReport, replayProcedure, reviewProcedure};

if (require.main === module) {
  main().then(code => {process.exitCode = code;}, error => {console.error(error.message); process.exitCode = 2;});
}
