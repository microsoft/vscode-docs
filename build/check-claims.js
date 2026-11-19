'use strict';

const crypto = require('crypto');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { loadDataVariables } = require('./data-variables');
const { substituteDataVariables } = require('./data-variables-substitution');
const { createEvidenceLookup, loadManifest } = require('./product-manifest');
const { formatReport, validateReport } = require('./findings');
const { collectProductReferences } = require('./product-references');

/* eslint-disable security/detect-non-literal-fs-filename -- Paths are constrained to the repository root. */

const DEFAULT_DIRECTORIES = ['docs', 'api', 'remote', 'release-notes'];
const FEATURE_PATTERN = /feature\(([^)\r\n]*)\)/g;
const DATA_DIRECTIVE_PATTERN = /\{%\s*data\s+([^%\r\n]+?)\s*%\}/g;
const DATA_DIRECTIVE_START_PATTERN = /\{%\s*data\b/g;

function isWithinRoot(rootDirectory, filePath) {
  const relativePath = path.relative(rootDirectory, filePath);
  return relativePath !== '..' && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath);
}

function collectMarkdownFiles(rootDirectory, paths) {
  const resolvedRoot = fs.realpathSync(rootDirectory);
  const files = new Set();

  function visit(targetPath) {
    const resolvedPath = fs.realpathSync(targetPath);
    if (!isWithinRoot(resolvedRoot, resolvedPath)) {
      throw new Error(`Path is outside the repository: ${targetPath}`);
    }

    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(resolvedPath, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name))) {
        if (entry.isDirectory()) {
          visit(path.join(resolvedPath, entry.name));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          files.add(path.join(resolvedPath, entry.name));
        }
      }
    } else if (stat.isFile() && resolvedPath.endsWith('.md')) {
      files.add(resolvedPath);
    } else {
      throw new Error(`Expected a Markdown file or directory: ${targetPath}`);
    }
  }

  for (const item of paths) {
    visit(path.resolve(resolvedRoot, item));
  }

  return [...files].sort((left, right) => left.localeCompare(right));
}

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

function checkClaims(rootDirectory, paths, options = {}) {
  const resolvedRoot = fs.realpathSync(rootDirectory);
  const generatedAt = new Date().toISOString();
  const product = options.manifest ? loadManifest(options.manifest, options.channel) : undefined;
  const lookup = product ? createEvidenceLookup(product.manifest) : undefined;
  const sourceRevision = options.sourceRevision || execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: resolvedRoot,
    encoding: 'utf8'
  }).trim();
  const variables = loadDataVariables(path.join(resolvedRoot, 'data', 'variables'));
  const lifecycle = JSON.parse(fs.readFileSync(path.join(resolvedRoot, 'build', 'feature-lifecycle.json'), 'utf8'));
  const files = collectMarkdownFiles(resolvedRoot, paths);
  const scanPaths = [...new Set(paths.map(item =>
    path.relative(resolvedRoot, fs.realpathSync(path.resolve(resolvedRoot, item))).split(path.sep).join('/') || '.'))].sort();
  const articles = [];
  const findings = new Map();

  for (const filePath of files) {
    const bytes = fs.readFileSync(filePath);
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
  }

  return validateReport({
    schemaVersion: 3,
    sourceRevision,
    generatedAt,
    scanPaths,
    inputHash: crypto.createHash('sha256').update(JSON.stringify({ scanPaths, articles, variables, lifecycle })).digest('hex'),
    ...(product ? { productManifest: product.reference } : {}),
    findings: [...findings.values()].sort((left, right) =>
      left.article.localeCompare(right.article) || left.line - right.line || left.id.localeCompare(right.id))
  });
}

function parseArguments(args) {
  const paths = [];
  const options = {};
  let readingPaths = false;

  for (let index = 0; index < args.length; index++) {
    const argument = args.at(index);
    if (argument === '--files') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) {
        throw new Error('Expected at least one path after --files.');
      }
      readingPaths = true;
    } else if (argument === '--manifest' || argument === '--channel' || argument === '--format') {
      const value = args.at(++index);
      if (!value || value.startsWith('--')) {
        throw new Error(`Expected a value after ${argument}.`);
      }
      if (argument === '--manifest') {
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
    console.log('Usage: npm run check-claims -- [--channel stable|insiders] [--manifest <file>] [--format json|console|github] [--files <Markdown file or directory> ...]');
    return 0;
  }

  const { paths, format, ...options } = parseArguments(args);
  const report = checkClaims(path.resolve(__dirname, '..'), paths, options);
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
  collectMarkdownFiles,
  main,
  parseArguments
};
