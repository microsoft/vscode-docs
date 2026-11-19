'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const schema = require('./findings.schema.json');
const { validateManifestReference } = require('./product-manifest');

/* eslint-disable security/detect-non-literal-fs-filename -- The report path is explicitly supplied by the caller. */

const FORMATS = ['json', 'console', 'github'];
/* eslint-disable security/detect-non-literal-regexp -- Patterns come from the checked-in schema, not report input. */
const HASH_PATTERN = new RegExp(schema.$defs.hash.pattern);
const ARTICLE_PATTERN = new RegExp(schema.$defs.article.pattern);
const TIMESTAMP_PATTERN = new RegExp(schema.$defs.timestamp.pattern);
/* eslint-enable security/detect-non-literal-regexp */

function requireValue(condition, message) {
  if (!condition) {
    throw new Error(`Invalid findings report: ${message}`);
  }
}

function requireShape(value, definition, label) {
  requireValue(value !== null && typeof value === 'object' && !Array.isArray(value), `${label} must be an object.`);
  for (const key of definition.required) {
    requireValue(Object.hasOwn(value, key), `${label}.${key} is required.`);
  }
  for (const key of Object.keys(value)) {
    requireValue(Object.hasOwn(definition.properties, key), `${label}.${key} is not supported.`);
  }
}

function requireText(value, label) {
  requireValue(typeof value === 'string' && /\S/.test(value), `${label} must be a nonempty string.`);
}

function requireHash(value, label) {
  requireValue(typeof value === 'string' && HASH_PATTERN.test(value), `${label} must be a SHA-256 hash.`);
}

function requireTimestamp(value, label) {
  const date = new Date(value);
  requireValue(typeof value === 'string' && TIMESTAMP_PATTERN.test(value) &&
    Number.isFinite(date.getTime()) && date.toISOString() === value, `${label} must be an ISO UTC timestamp.`);
}

function isArticle(value) {
  return typeof value === 'string' && ARTICLE_PATTERN.test(value);
}

function validateEvidence(evidence, manifest, label) {
  requireShape(evidence, schema.$defs.productEvidence, label);
  requireValue(Boolean(manifest), `${label} requires productManifest.`);
  requireValue(schema.$defs.productEvidence.properties.status.enum.includes(evidence.status), `${label}.status is invalid.`);
  requireValue(Array.isArray(evidence.matches), `${label}.matches must be an array.`);
  requireValue((evidence.status === 'observed') === (evidence.matches.length > 0), `${label}.matches contradict status.`);
  for (const match of evidence.matches) {
    requireShape(match, schema.$defs.productEvidence.properties.matches.items, `${label}.matches[]`);
    requireValue(Number.isInteger(match.source) && match.source >= 0 &&
      match.source < manifest.sources.length, `${label} has an invalid source index.`);
    const source = manifest.sources.at(match.source);
    if (source.kind === 'settings') {
      requireValue(Object.hasOwn(match, 'defaultValue') && !Object.hasOwn(match, 'binding') &&
        !Object.hasOwn(match, 'command') && !Object.hasOwn(match, 'line'),
        `${label} must include only a defaultValue for a settings source.`);
    } else if (Object.hasOwn(match, 'command')) {
      requireValue(!Object.hasOwn(match, 'binding') && !Object.hasOwn(match, 'defaultValue'),
        `${label} must include only command and line for an unbound command.`);
      requireText(match.command, `${label}.command`);
      requireValue(Number.isInteger(match.line) && match.line > 0, `${label}.line must be a positive capture line.`);
    } else {
      requireValue(!Object.hasOwn(match, 'defaultValue') && !Object.hasOwn(match, 'line') && match.binding !== null &&
        typeof match.binding === 'object' && !Array.isArray(match.binding), `${label} requires a binding for a keybindings source.`);
      requireText(match.binding.key, `${label}.binding.key`);
      requireText(match.binding.command, `${label}.binding.command`);
      requireValue(!Object.hasOwn(match.binding, 'when') || typeof match.binding.when === 'string',
        `${label}.binding.when must be a string.`);
    }
  }
}

function validateReport(report) {
  requireValue(report?.schemaVersion === schema.properties.schemaVersion.const,
    `unsupported schemaVersion; rerun the checker to generate a version ${schema.properties.schemaVersion.const} report.`);
  requireShape(report, schema, 'report');
  requireText(report.sourceRevision, 'sourceRevision');
  requireTimestamp(report.generatedAt, 'generatedAt');
  requireHash(report.inputHash, 'inputHash');
  requireValue(Array.isArray(report.scanPaths) && report.scanPaths.length > 0 &&
    report.scanPaths.every(item => item === '.' || isArticle(item)) &&
    new Set(report.scanPaths).size === report.scanPaths.length, 'scanPaths must contain unique repository-relative paths.');
  if (Object.hasOwn(report, 'productManifest')) {
    requireShape(report.productManifest, schema.$defs.productManifest, 'productManifest');
    validateManifestReference(report.productManifest);
    requireShape(report.productManifest.product, schema.$defs.productManifest.properties.product, 'productManifest.product');
    for (const source of report.productManifest.sources) {
      requireShape(source, schema.$defs.productSource, 'productManifest.sources[]');
    }
  }
  requireValue(Array.isArray(report.findings), 'findings must be an array.');
  const ids = new Set();
  const articleHashes = new Map();
  for (const finding of report.findings) {
    requireShape(finding, schema.$defs.finding, 'finding');
    const { id, kind, severity, article, articleHash, line, evidence, status, firstSeen, lastSeen } = finding;
    requireHash(id, 'finding.id');
    requireHash(articleHash, 'finding.articleHash');
    requireValue(schema.$defs.finding.properties.kind.enum.includes(kind), 'finding.kind is invalid.');
    requireValue(schema.$defs.finding.properties.severity.enum.includes(severity), 'finding.severity is invalid.');
    requireValue(schema.$defs.finding.properties.status.enum.includes(status), 'finding.status is invalid.');
    requireValue(isArticle(article), 'finding.article must be a normalized repository-relative path.');
    requireValue(Number.isInteger(line) && line >= 1, 'finding.line must be a positive integer.');
    requireText(evidence, 'finding.evidence');
    requireText(finding.message, 'finding.message');
    requireValue(finding.sourceRevision === report.sourceRevision, 'finding.sourceRevision does not match the report.');
    requireTimestamp(firstSeen, 'finding.firstSeen');
    requireTimestamp(lastSeen, 'finding.lastSeen');
    requireValue(firstSeen <= lastSeen && lastSeen <= report.generatedAt, 'finding observation timestamps are out of order.');
    requireValue(id === crypto.createHash('sha256').update(`${kind}\0${article}\0${evidence}`).digest('hex'),
      'finding.id does not match its kind, article, and evidence.');
    requireValue(!ids.has(id), 'duplicate finding.id.');
    ids.add(id);
    requireValue(!articleHashes.has(article) || articleHashes.get(article) === articleHash,
      'findings for the same article have different articleHash values.');
    articleHashes.set(article, articleHash);
    if (Object.hasOwn(finding, 'productEvidence')) {
      validateEvidence(finding.productEvidence, report.productManifest, `finding ${id}.productEvidence`);
    }
  }
  return report;
}

function assertReportCurrent(saved, current) {
  validateReport(saved);
  validateReport(current);
  for (const key of ['sourceRevision', 'inputHash']) {
    if (Reflect.get(saved, key) !== Reflect.get(current, key)) {
      throw new Error(`Stale findings report: ${key} changed. Rerun the checker.`);
    }
  }
  if (saved.productManifest?.sha256 !== current.productManifest?.sha256) {
    throw new Error('Stale findings report: product manifest changed. Rerun the checker.');
  }
}

function escapeConsole(value) {
  return value.replace(/[\u0000-\u001f\u007f-\u009f]/g,
    character => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);
}

function escapeAnnotation(value, property = false) {
  const escaped = value.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  return property ? escaped.replace(/:/g, '%3A').replace(/,/g, '%2C') : escaped;
}

function formatReport(report, format = 'json') {
  validateReport(report);
  if (!FORMATS.includes(format)) {
    throw new Error(`Unknown report format "${format}". Expected ${FORMATS.join(', ')}.`);
  }
  if (format === 'json') {
    return JSON.stringify(report, null, 2);
  }
  if (format === 'github') {
    return report.findings.map(finding => {
      const level = finding.severity === 'unverified' ? 'notice' : finding.severity;
      return `::${level} file=${escapeAnnotation(finding.article, true)},line=${finding.line},title=Docs ${finding.kind} (${finding.status})::${escapeAnnotation(`[${finding.severity}] ${finding.message}`)}`;
    }).join('\n');
  }
  const counts = { error: 0, warning: 0, unverified: 0 };
  for (const finding of report.findings) {
    Reflect.set(counts, finding.severity, Reflect.get(counts, finding.severity) + 1);
  }
  return [
    `Docs claims: ${counts.error} error(s), ${counts.warning} warning(s), ${counts.unverified} unverified.`,
    ...report.findings.map(finding =>
      escapeConsole(`${finding.article}:${finding.line} [${finding.severity}, ${finding.status}] ${finding.message}`))
  ].join('\n');
}

function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/findings.js --input <report.json> [--format json|console|github] [--check-current [--manifest <file>]]');
    return 0;
  }
  const options = new Map();
  const argumentsLeft = [...args];
  while (argumentsLeft.length) {
    const option = argumentsLeft.shift();
    if (!['--input', '--format', '--check-current', '--manifest'].includes(option) || options.has(option)) {
      throw new Error(`Unknown or repeated option: ${option}`);
    }
    const value = option === '--check-current' ? true : argumentsLeft.shift();
    if (!value || (typeof value === 'string' && value.startsWith('--'))) {
      throw new Error(`Expected a value after ${option}.`);
    }
    options.set(option, value);
  }
  if (!options.has('--input') || (options.has('--manifest') && !options.has('--check-current'))) {
    throw new Error('Specify --input <report.json>; --manifest is only used with --check-current.');
  }
  const report = validateReport(JSON.parse(fs.readFileSync(options.get('--input'), 'utf8')));
  if (options.has('--check-current')) {
    if (Boolean(report.productManifest) !== options.has('--manifest')) {
      throw new Error('Freshness checking requires --manifest exactly when the saved report used one.');
    }
    const { checkClaims } = require('./check-claims');
    const current = checkClaims(path.resolve(__dirname, '..'), report.scanPaths, {
      manifest: options.get('--manifest'),
      channel: report.productManifest?.product.channel
    });
    assertReportCurrent(report, current);
  }
  const output = formatReport(report, options.get('--format') || 'console');
  if (output) {
    console.log(output);
  }
  return report.findings.some(finding => finding.severity === 'error') ? 1 : 0;
}

// Publish the helpers before the CLI freshness check loads the claim checker.
module.exports = { assertReportCurrent, formatReport, main, validateReport };

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
