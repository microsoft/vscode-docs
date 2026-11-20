'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const schema = require('./findings.schema.json');
const { validateManifestReference } = require('./product-manifest');
const { resolveSourceRoot } = require('./review-source');

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
  requireValue(schema.properties.schemaVersion.enum.includes(report?.schemaVersion),
    'unsupported schemaVersion; rerun the appropriate checker or review.');
  requireShape(report, schema, 'report');
  const replay = report.checks?.length === 1 && report.checks[0] === 'replay';
  const review = report.checks?.length === 1 && report.checks[0] === 'review';
  requireValue(Array.isArray(report.checks) && (replay || review ||
    (report.checks.includes('claims') && !report.checks.includes('replay') && !report.checks.includes('review'))) &&
    report.checks.every(check => schema.properties.checks.items.enum.includes(check)) &&
    new Set(report.checks).size === report.checks.length, 'checks must list claims and optional links or navigation, or replay or review alone, without duplicates.');
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
  requireValue(Object.hasOwn(report, 'replay') === replay, 'replay metadata must accompany replay checks only.');
  if (replay) validateReplay(report);
  requireValue(Object.hasOwn(report, 'review') === review, 'review metadata must accompany review checks only.');
  if (review) validateReview(report);
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
    requireValue(Object.hasOwn(finding, 'replayEvidence') === replay, 'replayEvidence must accompany replay findings only.');
    requireValue(Object.hasOwn(finding, 'reviewEvidence') === review && (kind !== 'review' || review),
      'reviewEvidence must accompany review findings only.');
    if (review) validateReviewFinding(finding, report);
    if (replay) {
      requireValue(kind === 'replay' && article === report.replay.binding.article &&
        articleHash === report.replay.binding.articleHash, 'replay finding must match the reviewed article.');
      validateReplayEvidence(finding.replayEvidence);
      requireValue(severity === (finding.replayEvidence.category === 'mismatch' ? 'warning' : 'unverified'),
        'replay severity does not match failure category.');
      requireValue(report.replay.status !== 'passed' &&
        (finding.replayEvidence.category === 'mismatch' || report.replay.status === 'incomplete'),
        'replay status contradicts a failure.');
    }
  }
  return report;
}

function validateReview(report) {
  requireValue(report.schemaVersion === 6 && !report.productManifest, 'review requires version 6 without a product manifest.');
  requireShape(report.review, schema.$defs.review, 'review');
  const { binding, status, summary, limitations } = report.review;
  requireShape(binding, schema.$defs.reviewBinding, 'review.binding');
  for (const key of ['articleHash', 'guidelinesHash', 'checkerInputHash']) requireHash(Reflect.get(binding, key), `review.binding.${key}`);
  requireValue(isArticle(binding.article) && binding.sourceRevision === report.sourceRevision &&
    JSON.stringify(report.scanPaths) === JSON.stringify([binding.article]), 'review source or scope mismatch.');
  requireValue(['stable', 'insiders'].includes(binding.channel) && ['editorial', 'technical', 'both'].includes(binding.focus),
    'review channel or focus is invalid.');
  if (Object.hasOwn(binding, 'section')) {
    requireShape(binding.section, schema.$defs.reviewSection, 'review.binding.section');
    requireText(binding.section.title, 'review section title');
    requireValue(Number.isSafeInteger(binding.section.startLine) && binding.section.startLine >= 1 &&
      Number.isSafeInteger(binding.section.endLine) && binding.section.endLine >= binding.section.startLine, 'invalid review section range.');
  }
  requireValue(report.inputHash === crypto.createHash('sha256').update(JSON.stringify(binding)).digest('hex'),
    'review inputHash does not match its binding.');
  requireValue(['complete', 'incomplete'].includes(status), 'review status is invalid.');
  requireText(summary, 'review.summary');
  requireValue(summary.length <= 8000 && Array.isArray(limitations) && limitations.length <= 20 &&
    limitations.every(item => typeof item === 'string' && /\S/.test(item) && item.length <= 4000) &&
    (status !== 'incomplete' || limitations.length > 0), 'incomplete reviews require explicit limitations.');
  requireValue(Array.isArray(report.findings) && report.findings.length <= 50, 'review supports at most 50 findings.');
}

function validateReviewFinding(finding, report) {
  const { binding } = report.review;
  const evidence = finding.reviewEvidence;
  requireValue(finding.kind === 'review' && !finding.productEvidence && finding.article === binding.article &&
    finding.articleHash === binding.articleHash, 'review finding does not match its article.');
  requireShape(evidence, schema.$defs.reviewEvidence, 'reviewEvidence');
  requireValue(schema.$defs.reviewEvidence.properties.category.enum.includes(evidence.category) &&
    ['supported', 'question'].includes(evidence.assessment), 'invalid review category or assessment.');
  requireValue((binding.focus !== 'editorial' || evidence.category !== 'accuracy') &&
    (binding.focus !== 'technical' || evidence.category === 'accuracy'), 'finding is outside the requested review focus.');
  requireValue(Number.isInteger(evidence.endLine) && evidence.endLine >= finding.line &&
    evidence.endLine - finding.line < 80, 'review source span is invalid.');
  requireValue(!binding.section || (finding.line >= binding.section.startLine && evidence.endLine <= binding.section.endLine),
    'finding is outside the selected article section.');
  for (const key of ['quote', 'suggestion']) {
    requireText(Reflect.get(evidence, key), `reviewEvidence.${key}`);
    requireValue(Reflect.get(evidence, key).length <= 16000, 'review evidence is oversized.');
  }
  requireValue(finding.message.length <= 8000, 'review message is oversized.');
  requireValue(finding.severity === (evidence.assessment === 'supported' ? 'warning' : 'unverified'),
    'agent judgments must not be classified as deterministic errors.');
  requireValue(Array.isArray(evidence.sources) && evidence.sources.length <= 10, 'invalid review citations.');
  for (const source of evidence.sources) {
    requireShape(source, schema.$defs.reviewEvidence.properties.sources.items, 'review citation');
    requireText(source.quote, 'review citation quote');
    requireValue(source.quote.length <= 8000 && typeof source.url === 'string' && source.url.length <= 2000 &&
      /^https:\/\/github\.com\/microsoft\/vscode\/blob\/[a-f0-9]{40}\//.test(source.url),
      'product citations require a pinned microsoft/vscode source URL and line reference.');
    const url = new URL(source.url);
    const range = url.hash.slice(1).split('-');
    requireValue(url.href === source.url && !url.search && url.pathname.split('/').slice(5).every(part =>
      /^[a-zA-Z0-9_.-]+$/.test(part) && !['.', '..'].includes(part)) &&
      range.length <= 2 && range.every(line => /^L[1-9]\d*$/.test(line)) &&
      (range.length === 1 || Number(range[1].slice(1)) >= Number(range[0].slice(1))), 'invalid pinned source path or line range.');
  }
  requireValue(evidence.category !== 'accuracy' || evidence.assessment !== 'supported' || evidence.sources.length > 0,
    'supported technical findings require cited product evidence; otherwise report an unresolved question.');
  requireValue(finding.evidence === JSON.stringify({ channel: binding.channel, focus: binding.focus,
    ...(binding.section ? { section: binding.section } : {}),
    category: evidence.category, quote: evidence.quote }), 'review identity does not match its quoted claim and scope.');
}

function validateReplay(report) {
  const replay = report.replay;
  requireValue(report.schemaVersion === 5 && !report.productManifest, 'replay requires version 5 without a product manifest.');
  requireShape(replay, schema.$defs.replay, 'replay');
  requireShape(replay.binding, schema.$defs.replayBinding, 'replay.binding');
  const binding = replay.binding;
  for (const key of ['articleHash', 'storyboardHash', 'runnerHash']) requireHash(Reflect.get(binding, key), `replay.binding.${key}`);
  requireText(binding.storyboardId, 'replay.binding.storyboardId');
  requireValue(binding.sourceRevision === report.sourceRevision && isArticle(binding.article) &&
    report.scanPaths.length === 1 && report.scanPaths[0] === binding.article, 'replay source or scan scope mismatch.');
  requireValue(report.inputHash === crypto.createHash('sha256').update(JSON.stringify(binding)).digest('hex'),
    'replay inputHash does not match the reviewed inputs.');
  requireShape(binding.product, schema.$defs.replayBinding.properties.product, 'replay.binding.product');
  requireValue(['stable', 'insiders'].includes(binding.product.channel) && /^[a-f0-9]{40}$/i.test(binding.product.revision),
    'replay product pin is invalid.');
  requireValue(Object.hasOwn(binding, 'workspace') === Object.hasOwn(binding, 'captureProfile'), 'replay workspace and profile must be paired.');
  for (const key of ['workspace', 'captureProfile']) {
    if (Object.hasOwn(binding, key)) requireValue(typeof Reflect.get(binding, key) === 'string' &&
      path.isAbsolute(Reflect.get(binding, key)), `replay.binding.${key} must be absolute.`);
  }
  for (const key of ['review', 'evidence']) {
    const reference = Reflect.get(replay, key);
    requireShape(reference, schema.$defs.privateReference, `replay.${key}`);
    requireText(reference.file, `replay.${key}.file`);
    requireValue(path.isAbsolute(reference.file), `replay.${key}.file must be absolute.`);
    requireHash(reference.sha256, `replay.${key}.sha256`);
  }
  requireValue(schema.$defs.replay.properties.status.enum.includes(replay.status), 'replay status is invalid.');
}

function validateReplayEvidence(evidence) {
  requireShape(evidence, schema.$defs.replayEvidence, 'replayEvidence');
  requireValue(schema.$defs.replayEvidence.properties.category.enum.includes(evidence.category), 'replay category is invalid.');
  requireValue(typeof evidence.code === 'string' && /^[a-z][a-z-]+$/.test(evidence.code), 'replay failure code is invalid.');
  if (['step', 'phase', 'kind'].some(key => Object.hasOwn(evidence, key))) {
    requireValue(Number.isInteger(evidence.step) && evidence.step >= 0 && evidence.step <= 39 &&
      schema.$defs.replayEvidence.properties.phase.enum.includes(evidence.phase) &&
      schema.$defs.replayEvidence.properties.kind.enum.includes(evidence.kind), 'replay failed step is invalid.');
  }
  if (Object.hasOwn(evidence, 'target')) requireText(evidence.target, 'replayEvidence.target');
  if (evidence.category === 'mismatch') {
    requireValue(Number.isInteger(evidence.step), 'mismatch requires a failed step.');
    requireValue(evidence.expected && typeof evidence.expected === 'object', 'mismatch requires an expected outcome.');
    const definitions = schema.$defs.replayEvidence.properties.expected.oneOf;
    const cycle = Object.hasOwn(evidence.expected, 'values');
    requireShape(evidence.expected, definitions.at(cycle ? 1 : 0), 'replayEvidence.expected');
    if (cycle) requireValue(Array.isArray(evidence.expected.values) && evidence.expected.values.length > 0 &&
      evidence.expected.values.every(value => typeof value === 'string' && /\S/.test(value)), 'invalid expected cycle.');
    else {
      requireText(evidence.expected.text, 'replayEvidence.expected.text');
      requireValue(['equals', 'contains'].includes(evidence.expected.match), 'invalid expected text match.');
    }
    requireValue(JSON.stringify(evidence.observed) === JSON.stringify({state: 'visible', matches: false}),
      'mismatch requires privacy-safe contradictory observation.');
  } else requireValue(!Object.hasOwn(evidence, 'expected') && !Object.hasOwn(evidence, 'observed'),
    'incomplete replay cannot claim a contradictory observation.');
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
    `Docs ${report.checks.length > 1 ? 'checks' : report.checks[0]}${report.replay ? ` (${report.replay.status})` : report.review ? ` (${report.review.status}, agent judgment)` : ''}: ${counts.error} error(s), ${counts.warning} warning(s), ${counts.unverified} unverified.`,
    ...report.findings.map(finding =>
      escapeConsole(`${finding.article}:${finding.line} [${finding.severity}, ${finding.status}] ${finding.message}`))
  ].join('\n');
}

function main(args = process.argv.slice(2)) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node build/findings.js --input <report.json> [--format json|console|github] [--check-current [--root <source-worktree>] [--expected-revision <commit>] [--manifest <file>]]');
    console.log('Replay freshness (never launches UI): --check-current --storyboard <file> --replay-review <review.json>');
    return 0;
  }
  const options = new Map();
  const argumentsLeft = [...args];
  while (argumentsLeft.length) {
    const option = argumentsLeft.shift();
    if (!['--input', '--format', '--check-current', '--manifest', '--root', '--expected-revision', '--storyboard', '--replay-review'].includes(option) || options.has(option)) {
      throw new Error(`Unknown or repeated option: ${option}`);
    }
    const value = option === '--check-current' ? true : argumentsLeft.shift();
    if (!value || (typeof value === 'string' && value.startsWith('--'))) {
      throw new Error(`Expected a value after ${option}.`);
    }
    options.set(option, value);
  }
  if (!options.has('--input') ||
      (['--manifest', '--root', '--expected-revision', '--storyboard', '--replay-review'].some(option => options.has(option)) && !options.has('--check-current'))) {
    throw new Error('Specify --input <report.json>; --manifest, --root, and --expected-revision are only used with --check-current.');
  }
  const report = validateReport(JSON.parse(fs.readFileSync(options.get('--input'), 'utf8')));
  if (options.has('--check-current')) {
    if (report.review) {
      if (['--storyboard', '--replay-review', '--manifest', '--expected-revision'].some(option => options.has(option))) {
        throw new Error('Review freshness accepts only --root and never reruns the agent.');
      }
      require('./review').assertReviewCurrent(report, resolveSourceRoot(options.get('--root')));
    } else if (report.replay) {
      if (!options.has('--storyboard') || !options.has('--replay-review') ||
          ['--root', '--expected-revision', '--manifest'].some(option => options.has(option))) {
        throw new Error('Replay freshness requires --storyboard and --replay-review, not claim-checker options.');
      }
      require('./replay').assertReplayCurrent(report, {storyboard: options.get('--storyboard'), review: options.get('--replay-review')});
    } else {
      if (options.has('--storyboard') || options.has('--replay-review')) throw new Error('Replay options require a replay report.');
      if (Boolean(report.productManifest) !== options.has('--manifest')) {
        throw new Error('Freshness checking requires --manifest exactly when the saved report used one.');
      }
      const { checkClaims } = require('./check-claims');
      const current = checkClaims(resolveSourceRoot(options.get('--root')), report.scanPaths, {
        expectedRevision: options.get('--expected-revision'),
        manifest: options.get('--manifest'),
        channel: report.productManifest?.product.channel,
        links: report.checks.includes('links'),
        navigation: report.checks.includes('navigation')
      });
      assertReportCurrent(report, current);
    }
  }
  const output = formatReport(report, options.get('--format') || 'console');
  if (output) {
    console.log(output);
  }
  return report.review ? report.review.status === 'incomplete' ? 2 : report.findings.length ? 1 : 0 :
    report.replay ? report.replay.status === 'passed' ? 0 : report.replay.status === 'mismatch' ? 1 : 2 :
    report.findings.some(finding => finding.severity === 'error') ? 1 : 0;
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
