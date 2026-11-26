'use strict';

const crypto = require('crypto');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { loadDataVariables } = require('../preview/data-variables');
const { substituteDataVariables } = require('../preview/data-variables-substitution');
const { createEvidenceLookup, loadManifest } = require('./product-manifest');
const { formatReport, validateReport } = require('./findings');
const { collectProductReferences } = require('./product-references');
const { collectMarkdownFiles } = require('../lib/repository-paths');
const { assertReviewSource, createRevisionGuard, resolveSourceRoot } = require('../workflow/review-source');

/* eslint-disable security/detect-non-literal-fs-filename -- Paths are constrained to the repository root. */

const DEFAULT_DIRECTORIES = ['docs', 'api', 'remote', 'release-notes'];
const FEATURE_PATTERN = /feature\(([^)\r\n]*)\)/g;
const DATA_DIRECTIVE_PATTERN = /\{%\s*data\s+([^%\r\n]+?)\s*%\}/g;
const DATA_DIRECTIVE_START_PATTERN = /\{%\s*data\b/g;

function getLineNumber(content, offset) {
  return content.slice(0, offset).split('\n').length;
}

function createFinding(rootDirectory, filePath, line, kind, claim, severity, sourceRevision, message) {
  const article = path.relative(rootDirectory, filePath).split(path.sep).join('/');
  const id = crypto.createHash('sha256')
    .update(`${kind}\0${article}\0${claim}`)
    .digest('hex');
  return {
    id,
    kind,
    severity,
    article,
    line,
    evidence: claim,
    sourceRevision,
    status: 'open',
    message
  };
}

function addFinding(findings, finding) {
  if (!findings.has(finding.id)) {
    findings.set(finding.id, finding);
  }
}

function checkDataVariables(content, source, variables, add) {
  const validDirectives = new Set();
  for (const match of content.matchAll(DATA_DIRECTIVE_PATTERN)) {
    validDirectives.add(match.index);
    const directive = match[0];
    try {
      substituteDataVariables(directive, variables, source);
    } catch (error) {
      add(match.index, 'data-variable', directive, error.message);
    }
  }

  for (const match of content.matchAll(DATA_DIRECTIVE_START_PATTERN)) {
    if (!validDirectives.has(match.index)) {
      const lineEnd = content.indexOf('\n', match.index);
      const directive = content.slice(match.index, lineEnd === -1 ? content.length : lineEnd);
      let message;
      try {
        substituteDataVariables(directive, variables, source);
      } catch (error) {
        message = error.message;
      }
      if (message) {
        add(match.index, 'data-variable', directive, message);
      }
    }
  }
}

function checkClaims(rootDirectory, paths, options = {}, { documentCache, context } = {}) {
  const resolvedRoot = fs.realpathSync(rootDirectory);
  const generatedAt = new Date().toISOString();
  context?.guard?.assertCurrent();
  if (options.expectedRevision !== undefined && options.sourceRevision !== undefined) {
    throw new Error('Cannot override sourceRevision when an expected revision is supplied.');
  }
  const pinnedRevision = context || options.expectedRevision === undefined
    ? undefined : assertReviewSource(resolvedRoot, options.expectedRevision);
  const product = context ? context.product : options.manifest ? loadManifest(options.manifest, options.channel) : undefined;
  const lookup = product ? createEvidenceLookup(product.manifest) : undefined;
  const sourceRevision = context?.sourceRevision || pinnedRevision || options.sourceRevision || execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: resolvedRoot,
    encoding: 'utf8'
  }).trim();
  const variables = context?.variables || loadDataVariables(path.join(resolvedRoot, 'data', 'variables'));
  const checks = ['claims', ...(options.links ? ['links'] : []), ...(options.navigation ? ['navigation'] : [])];
  const linkChecker = options.links || options.navigation
    ? require('./check-links').createLinkChecker(resolvedRoot, variables, {
      documentCache, fileSnapshot: context?.files, redirectCache: context?.redirectCache
    }) : undefined;
  const lifecycle = context?.lifecycle || JSON.parse(fs.readFileSync(path.join(resolvedRoot, 'build', 'feature-lifecycle.json'), 'utf8'));
  const files = collectMarkdownFiles(resolvedRoot, paths);
  const scanPaths = [...new Set(paths.map(item =>
    path.relative(resolvedRoot, fs.realpathSync(path.resolve(resolvedRoot, item))).split(path.sep).join('/') || '.'))].sort();
  const articles = [];
  const findings = new Map();

  for (const filePath of files) {
    const bytes = context ? context.files.read(filePath).bytes : fs.readFileSync(filePath);
    if (!bytes) throw new Error(`Stale findings report: Article disappeared during the check: ${filePath}.`);
    const content = bytes.toString('utf8');
    const articleHash = crypto.createHash('sha256').update(bytes).digest('hex');
    articles.push([path.relative(resolvedRoot, filePath).split(path.sep).join('/'), articleHash]);
    const add = (offset, marker, claim, message, productEvidence, severity) => {
      const finding = createFinding(
        resolvedRoot,
        filePath,
        getLineNumber(content, offset),
        marker === 'feature' ? 'lifecycle' : 'claim',
        claim,
        severity || (marker === 'feature' || marker === 'data-variable' ? 'error' : 'unverified'),
        sourceRevision,
        message
      );
      finding.articleHash = articleHash;
      finding.firstSeen = generatedAt;
      finding.lastSeen = generatedAt;
      if (productEvidence) {
        finding.productEvidence = productEvidence;
      }
      addFinding(findings, finding);
    };

    checkDataVariables(content, path.relative(resolvedRoot, filePath).split(path.sep).join('/'), variables, add);

    for (const match of content.matchAll(FEATURE_PATTERN)) {
      const featureId = match[1].trim();
      if (!Object.prototype.hasOwnProperty.call(lifecycle.features, featureId)) {
        add(match.index, 'feature', match[0], `Unknown feature lifecycle ID "${featureId}".`);
      }
    }

    for (const { offset, kind, claim, target, error, message: referenceMessage } of collectProductReferences(content)) {
      if (error) {
        add(offset, kind, claim, error, undefined, 'error');
        continue;
      }
      const evidence = target === undefined ? undefined : lookup?.(kind, target);
      let message = referenceMessage || `Could not verify ${kind} against a product manifest.`;
      if (evidence?.status === 'observed') {
        message = `Found ${kind} in captured product evidence. Public availability, context, and documented values still require review.`;
      } else if (evidence?.status === 'not-observed') {
        message = `Could not find ${kind} "${target}" in captured product evidence. Missing evidence does not establish that it is invalid.`;
      }
      add(offset, kind, claim, message, evidence);
    }
    if (options.links) {
      for (const result of linkChecker.check(filePath, content)) {
        const finding = createFinding(resolvedRoot, filePath, result.line, 'link', result.evidence,
          result.severity, sourceRevision, result.message);
        finding.articleHash = articleHash;
        finding.firstSeen = generatedAt;
        finding.lastSeen = generatedAt;
        addFinding(findings, finding);
      }
    }
  }

  const navigation = options.navigation ? require('./check-navigation').checkNavigation(resolvedRoot, variables, linkChecker) : undefined;
  for (const result of navigation?.findings || []) {
    const finding = createFinding(resolvedRoot, result.file, result.line, 'link', result.evidence,
      result.severity, sourceRevision, result.message);
    finding.articleHash = result.articleHash;
    finding.firstSeen = generatedAt;
    finding.lastSeen = generatedAt;
    addFinding(findings, finding);
  }
  if (pinnedRevision) {
    assertReviewSource(resolvedRoot, pinnedRevision);
  }
  context?.guard?.assertCurrent();
  return validateReport({
    schemaVersion: 5,
    checks,
    sourceRevision,
    generatedAt,
    scanPaths,
    inputHash: crypto.createHash('sha256')
      .update(JSON.stringify({
        checks, scanPaths, articles, variables, lifecycle,
        linkDependencies: linkChecker?.fingerprint(),
        navigationDependencies: navigation?.fingerprint
      }))
      .digest('hex'),
    ...(product ? { productManifest: product.reference } : {}),
    findings: [...findings.values()].sort((left, right) =>
      left.article.localeCompare(right.article) || left.line - right.line || left.id.localeCompare(right.id))
  });
}

function createClaimChecker() {
  // Parsed documents are content-addressed. A batch additionally shares one input snapshot,
  // which is reread and verified before any per-article reports are returned.
  const documentCache = require('./check-links').createDocumentCache();
  const check = (rootDirectory, paths, options) => checkClaims(rootDirectory, paths, options, { documentCache });
  check.batch = (rootDirectory, articles, options = {}, { settled = false } = {}) => {
    const root = fs.realpathSync(rootDirectory);
    if (options.expectedRevision !== undefined && options.sourceRevision !== undefined) {
      throw new Error('Cannot override sourceRevision when an expected revision is supplied.');
    }
    if (options.expectedRevision !== undefined) assertReviewSource(root, options.expectedRevision);
    const guard = options.sourceRevision === undefined ? createRevisionGuard(root) : undefined;
    const variablesDirectory = path.join(root, 'data', 'variables');
    const lifecycleFile = path.join(root, 'build', 'feature-lifecycle.json');
    const context = {
      guard, sourceRevision: guard?.revision || options.sourceRevision,
      variables: loadDataVariables(variablesDirectory),
      lifecycle: JSON.parse(fs.readFileSync(lifecycleFile, 'utf8')),
      product: options.manifest ? loadManifest(options.manifest, options.channel) : undefined,
      files: require('./check-links').createFileSnapshot(root), redirectCache: new Map()
    };
    const reports = articles.map(article => {
      try { return checkClaims(root, [article], options, { documentCache, context }); }
      catch (error) { if (!settled) throw error; return error; }
    });
    context.files.assertUnchanged();
    if (JSON.stringify(loadDataVariables(variablesDirectory)) !== JSON.stringify(context.variables) ||
        JSON.stringify(JSON.parse(fs.readFileSync(lifecycleFile, 'utf8'))) !== JSON.stringify(context.lifecycle) ||
        (options.manifest && JSON.stringify(loadManifest(options.manifest, options.channel)) !== JSON.stringify(context.product))) {
      throw new Error('Stale findings report: Checker inputs changed during the check.');
    }
    guard?.assertCurrent(true);
    if (options.expectedRevision !== undefined) assertReviewSource(root, options.expectedRevision);
    return reports;
  };
  return check;
}

function parseArguments(args) {
  const paths = [];
  const options = {};
  let readingPaths = false;

  for (let index = 0; index < args.length; index++) {
    const argument = args.at(index);
    if (argument === '--navigation') {
      if (options.navigation) {
        throw new Error('Specify --navigation only once.');
      }
      options.navigation = true;
      readingPaths = false;
    } else if (argument === '--links') {
      if (options.links) {
        throw new Error('Specify --links only once.');
      }
      options.links = true;
      readingPaths = false;
    } else if (argument === '--files') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) {
        throw new Error('Expected at least one path after --files.');
      }
      readingPaths = true;
    } else if (['--manifest', '--channel', '--format', '--root', '--expected-revision'].includes(argument)) {
      const value = args.at(++index);
      if (!value || value.startsWith('--')) {
        throw new Error(`Expected a value after ${argument}.`);
      }
      if (argument === '--root') {
        if (options.root) {
          throw new Error('Specify --root only once.');
        }
        options.root = value;
      } else if (argument === '--expected-revision') {
        if (options.expectedRevision || !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(value)) {
          throw new Error('Specify --expected-revision once, with a full Git commit hash.');
        }
        options.expectedRevision = value;
      } else if (argument === '--manifest') {
        if (options.manifest) {
          throw new Error('Specify --manifest only once.');
        }
        options.manifest = value;
      } else if (argument === '--channel') {
        if (options.channel || !['stable', 'insiders'].includes(value)) {
          throw new Error('Specify --channel once, with stable or insiders.');
        }
        options.channel = value;
      } else {
        if (options.format || !['json', 'console', 'github'].includes(value)) {
          throw new Error('Specify --format once, with json, console, or github.');
        }
        options.format = value;
      }
      readingPaths = false;
    } else if (argument.startsWith('--')) {
      throw new Error(`Unknown option: ${argument}`);
    } else if (readingPaths) {
      paths.push(argument);
    } else {
      throw new Error(`Unexpected argument: ${argument}`);
    }
  }

  if (options.manifest && !options.channel) {
    throw new Error('Select --channel stable or insiders when using a product manifest.');
  }
  return { paths: paths.length ? paths : DEFAULT_DIRECTORIES, ...options };
}

function main(args = process.argv.slice(2)) {
  if (args.includes('--help')) {
    console.log('Usage: npm run check-claims -- [--root <source-worktree>] [--expected-revision <commit>] [--links] [--navigation] [--channel stable|insiders] [--manifest <file>] [--format json|console|github] [--files <Markdown file or directory> ...]');
    return 0;
  }

  const { paths, format, root, ...options } = parseArguments(args);
  const report = checkClaims(resolveSourceRoot(root), paths, options);
  const output = formatReport(report, format);
  if (output) {
    console.log(output);
  }
  return report.findings.some(finding => finding.severity === 'error') ? 1 : 0;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  checkClaims,
  createClaimChecker,
  collectMarkdownFiles,
  main,
  parseArguments
};
