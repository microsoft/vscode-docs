'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const MarkdownIt = require('markdown-it');
const { checkClaims } = require('../checks/check-claims');
const { maskFrontmatter } = require('../checks/check-links');
const { validateReport } = require('../checks/findings');
const { validateReviewProduct } = require('./review-product');

/* eslint-disable security/detect-non-literal-fs-filename -- Article paths come from the guarded workflow or a validated report; guidance paths are fixed trusted files. */
const root = path.resolve(__dirname, '..', '..');
const guidance = ['.github/skills/docs-review/SKILL.md', '.github/skills/pr-review/SKILL.md',
  '.github/instructions/docs-writing.instructions.md', 'build/workflow/review.js', 'build/workflow/review-product.js', 'build/checks/findings.js', 'build/schemas/findings.schema.json', 'build/checks/check-links.js'];
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const markdown = new MarkdownIt({ html: true, linkify: false });

function articleSections(content) {
  const body = maskFrontmatter(content.replace(/^\uFEFF/, ''));
  const tokens = markdown.parse(body, {});
  const lastLine = content.split(/\r?\n/).length;
  const sections = [];
  const ancestors = [];
  for (const [index, token] of tokens.entries()) {
    if (token.type !== 'heading_open' || token.level !== 0 || !token.map) continue;
    const depth = Number(token.tag.slice(1));
    const section = { title: tokens.at(index + 1).content.trim() || 'Untitled heading', startLine: token.map[0] + 1, endLine: lastLine };
    while (ancestors.length && ancestors.at(-1).depth >= depth) ancestors.pop().section.endLine = section.startLine - 1;
    ancestors.push({ depth, section });
    sections.push(section);
  }
  return sections;
}

function guidanceHash() {
  return hash(JSON.stringify(guidance.map(file => [file, hash(fs.readFileSync(path.join(root, file)))])));
}

function createBinding(article, bytes, precheck, channel, focus, selection, product) {
  validateReport(precheck);
  if (!['stable', 'insiders'].includes(channel) || !['editorial', 'technical', 'both'].includes(focus) ||
      JSON.stringify(precheck.scanPaths) !== JSON.stringify([article]) ||
      JSON.stringify(precheck.checks) !== JSON.stringify(['claims', 'links']) || precheck.productManifest) {
    throw new Error('Review requires one article, an explicit channel and focus, and its claim/link precheck.');
  }
  const articleHash = hash(bytes);
  if (product !== undefined && (validateReviewProduct(product).channel !== channel || focus === 'editorial')) {
    throw new Error('The pinned product must match the technical review channel.');
  }
  let section;
  if (selection !== undefined) {
    section = articleSections(bytes.toString('utf8')).find(item => item.startLine === selection?.startLine);
    if (!section || selection.articleHash !== articleHash) throw new Error('The section selection changed or is invalid. Load sections again.');
  }
  return { article, articleHash, sourceRevision: precheck.sourceRevision, channel, focus,
    guidelinesHash: guidanceHash(), checkerInputHash: precheck.inputHash, ...(section ? { section } : {}),
    ...(product ? {product} : {}) };
}

function assertSourceSpans(report, content) {
  const lines = content.split(/\r?\n/);
  const { section } = report.review.binding;
  if (section && !articleSections(content).some(item => JSON.stringify(item) === JSON.stringify(section))) {
    throw new Error('Review section does not match the captured article.');
  }
  for (const finding of report.findings) {
    if (finding.reviewEvidence.endLine > lines.length ||
        lines.slice(finding.line - 1, finding.reviewEvidence.endLine).join('\n') !== finding.reviewEvidence.quote) {
      throw new Error('Review quote does not match the exact article lines.');
    }
  }
}

function makeReviewReport(binding, content, draft, generatedAt = new Date().toISOString()) {
  if (!draft || Object.keys(draft).some(key => !['status', 'summary', 'limitations', 'findings'].includes(key)) ||
      !Array.isArray(draft.findings)) throw new Error('Invalid review draft.');
  const report = {
    schemaVersion: 6, checks: ['review'], sourceRevision: binding.sourceRevision, generatedAt,
    scanPaths: [binding.article], inputHash: hash(JSON.stringify(binding)),
    review: { binding, status: draft.status, summary: draft.summary, limitations: draft.limitations },
    findings: draft.findings.map(item => {
      if (!item || Object.keys(item).some(key => !['line', 'endLine', 'quote', 'category', 'assessment', 'message', 'suggestion', 'sources'].includes(key))) {
        throw new Error('Invalid review finding fields.');
      }
      const { line, message, ...reviewEvidence } = item;
      const evidence = JSON.stringify({ channel: binding.channel, focus: binding.focus,
        ...(binding.section ? { section: binding.section } : {}),
        ...(binding.product ? {product: binding.product} : {}),
        category: item.category, quote: item.quote });
      return { id: hash(`review\0${binding.article}\0${evidence}`), kind: 'review',
        severity: item.assessment === 'supported' ? 'warning' : 'unverified',
        article: binding.article, articleHash: binding.articleHash, line, evidence,
        sourceRevision: binding.sourceRevision, status: 'open', message,
        firstSeen: generatedAt, lastSeen: generatedAt, reviewEvidence };
    })
  };
  validateReport(report);
  if (hash(Buffer.from(content)) !== binding.articleHash) throw new Error('Review article snapshot changed.');
  assertSourceSpans(report, content);
  return report;
}

function assertReviewCurrent(report, workspace, check = checkClaims) {
  validateReport(report);
  if (!report.review) throw new Error('Expected an article review report.');
  const { binding } = report.review;
  const current = check(workspace, [binding.article], { links: true });
  const content = fs.readFileSync(path.join(workspace, binding.article), 'utf8');
  if (current.sourceRevision !== binding.sourceRevision || current.inputHash !== binding.checkerInputHash ||
      hash(Buffer.from(content)) !== binding.articleHash || guidanceHash() !== binding.guidelinesHash) {
    throw new Error('Stale review: article, dependencies, guidance, or source revision changed. Run a new review.');
  }
  assertSourceSpans(report, content);
}

module.exports = { createBinding, makeReviewReport, assertReviewCurrent, articleSections };
