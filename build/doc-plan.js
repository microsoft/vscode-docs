'use strict';

const path = require('node:path');
const { fileURLToPath } = require('node:url');

function fail(message) { throw new Error(`Invalid documentation plan: ${message}`); }
function shape(value, keys, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      keys.some(key => !Object.hasOwn(value, key)) || Object.keys(value).some(key => !keys.includes(key))) fail(`${label} fields.`);
}
function text(value, label, maximum = 8000) {
  if (typeof value !== 'string' || !value.trim() || value.length > maximum) fail(`${label} must be nonempty text.`);
}
function list(value, label, maximum) {
  if (!Array.isArray(value) || value.length > maximum) fail(`${label} must be a bounded list.`);
}

function docsPath(file) {
  return typeof file === 'string' && file.length <= 500 && file.startsWith('docs/') &&
    file.split('/').every(part => /^[a-zA-Z0-9_-][a-zA-Z0-9_.-]*$/.test(part) &&
      !part.endsWith('.') && !/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part));
}
function isArticle(file) { return docsPath(file) && file.endsWith('.md'); }

function validatePlan(plan, context) {
  shape(plan, ['title', 'outcome', 'summary', 'persona', 'intent', 'purpose', 'availability', 'changes', 'media', 'sources', 'limitations'], 'plan');
  for (const key of ['title', 'summary', 'persona', 'intent', 'purpose']) text(Reflect.get(plan, key), key, key === 'title' ? 200 : 8000);
  if (!['changes-needed', 'no-change', 'incomplete'].includes(plan.outcome)) fail('outcome.');
  shape(plan.availability, ['status', 'explanation'], 'availability');
  if (!['public', 'not-public', 'unverified'].includes(plan.availability.status)) fail('availability status.');
  text(plan.availability.explanation, 'availability explanation');
  list(plan.changes, 'changes', 20);
  const files = new Set();
  for (const change of plan.changes) {
    shape(change, ['path', 'action', 'description'], 'change');
    if (!(isArticle(change.path) || (docsPath(change.path) && change.path.endsWith('/toc.json')) || change.path === 'build/sitemap.xml') ||
        change.path === 'docs/enterprise/policies.md' || files.has(change.path)) fail('unsupported or duplicate change path.');
    if (!['create', 'update'].includes(change.action)) fail('change action.');
    text(change.description, 'change description');
    files.add(change.path);
  }
  if (plan.changes.some(change => isArticle(change.path) && change.action === 'create') && !files.has('build/sitemap.xml')) {
    fail('new articles require a sitemap change in the plan.');
  }
  list(plan.media, 'media', 10);
  const mediaIds = new Set();
  for (const media of plan.media) {
    shape(media, ['id', 'kind', 'article', 'purpose', 'placement', 'scenario', 'status', 'limitation'], 'media proposal');
    if (typeof media.id !== 'string' || !/^[a-z][a-z0-9-]{0,63}$/.test(media.id) || mediaIds.has(media.id) ||
        !['screenshot', 'video'].includes(media.kind) || !isArticle(media.article) || !files.has(media.article) ||
        !['proposed', 'pending'].includes(media.status)) fail('media identity, kind, article, or status.');
    mediaIds.add(media.id);
    for (const key of ['purpose', 'placement', 'scenario']) text(Reflect.get(media, key), `media ${key}`);
    if (typeof media.limitation !== 'string' || media.limitation.length > 8000 ||
        (media.status === 'pending' && !media.limitation.trim())) fail('pending media requires a limitation.');
  }
  list(plan.sources, 'sources', 30);
  for (const source of plan.sources) {
    shape(source, ['url', 'note'], 'source');
    text(source.url, 'source URL', 2000);
    text(source.note, 'source note');
    let url;
    try { url = new URL(source.url); } catch { fail('source URL.'); }
    if (url.protocol === 'file:') {
      if (url.hostname || url.search || !context?.workspace || !Array.isArray(context.files)) fail('local citations require a captured source snapshot.');
      const relative = path.relative(context.workspace, fileURLToPath(url)).split(path.sep).join('/');
      if (!context.files.some(file => file.path === relative && typeof file.sha256 === 'string' &&
          /^[a-f0-9]{64}$/.test(file.sha256))) fail('local citation is outside the captured source snapshot.');
    } else if (url.protocol !== 'https:' || url.username || url.password ||
        !['github.com', 'code.visualstudio.com', 'learn.microsoft.com', 'update.code.visualstudio.com'].includes(url.hostname) ||
        (url.hostname === 'update.code.visualstudio.com' && !url.pathname.startsWith('/api/update/'))) {
      fail('unsupported source URL.');
    }
  }
  list(plan.limitations, 'limitations', 20);
  plan.limitations.forEach(item => text(item, 'limitation'));
  if (plan.outcome === 'changes-needed' && (!plan.changes.length || plan.availability.status !== 'public' || !plan.sources.length)) {
    fail('changes need an evidenced public feature and explicit files.');
  }
  if (plan.outcome === 'no-change' && (plan.changes.length || plan.media.length)) fail('no-change plans cannot propose edits or media.');
  if (plan.outcome === 'incomplete' && !plan.limitations.length) fail('incomplete plans need limitations.');
  if (plan.availability.status === 'unverified' && plan.outcome !== 'incomplete') fail('unverified availability requires an incomplete plan.');
  return plan;
}

module.exports = { validatePlan, isArticle };
