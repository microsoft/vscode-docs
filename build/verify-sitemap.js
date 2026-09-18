// Verifies build/sitemap.xml against the actual folder structure and article names.
//
// It performs a two-way check for content URLs (those under docs/, api/, remote/, learn/):
//   1. Every content URL in the sitemap resolves to an existing markdown file
//      (or to a known redirect source in a redirection.json).
//   2. Every standalone markdown page (a *.md file with frontmatter) appears in the
//      sitemap (or is a redirect source, so intentionally not listed).
//
// Non-content / landing-page URLs (e.g. /, /docs, /updates, /blogs) are listed in
// KNOWN_SPECIAL_URLS and skipped.
//
// Usage:
//   node build/verify-sitemap.js            Report problems, exit 1 if any are found.
//   node build/verify-sitemap.js --json     Emit a machine-readable JSON report.
//   node build/verify-sitemap.js --fix      Rewrite sitemap.xml: drop broken/duplicate
//                                            URLs, follow redirects to canonical targets,
//                                            and append missing standalone pages.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITEMAP = path.join(__dirname, 'sitemap.xml');
const DOMAIN = 'https://code.visualstudio.com/';

// Top-level folders whose URLs map 1:1 to "<path>.md" files on disk.
const CONTENT_ROOTS = ['docs', 'api', 'remote', 'learn'];

// Landing pages and aggregate routes that are served by the website, not by a
// single markdown file in this repo. These are valid sitemap entries.
const KNOWN_SPECIAL_URLS = new Set([
  '/',
  '/docs',
  '/api',
  '/updates',
  '/blogs',
  '/search',
  '/download',
  '/insiders',
  '/license',
  '/brand',
  '/features/agents',
  '/migrate-from-brackets',
  '/learn',
  // Generated reference page served by the website, not a markdown file in this repo.
  '/api/references/vscode-api',
]);

// File names that are never standalone sitemap pages.
const IGNORED_FILE_NAMES = new Set(['readme.md']);

function loadJSON(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  // Strip JS-style line comments and trailing commas (these JSON files are hand-edited).
  const cleaned = raw.replace(/^\s*\/\/.*$/gm, '').replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(cleaned);
}

// Map of every redirect "from" path -> "to" path across every redirection.json,
// normalized with a leading slash and without a trailing slash.
function loadRedirects() {
  const map = new Map();
  for (const dir of CONTENT_ROOTS.concat(['blogs'])) {
    const file = path.join(ROOT, dir, 'redirection.json');
    if (!fs.existsSync(file)) continue;
    for (const entry of loadJSON(file)) {
      if (entry && entry.from) map.set(normalize(entry.from), entry.to ? normalize(entry.to) : null);
    }
  }
  return map;
}

function normalize(urlPath) {
  let p = urlPath.trim();
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

// Extract URL entries from the sitemap, preserving each entry's loc, changefreq and priority.
function readSitemapPaths() {
  const xml = fs.readFileSync(SITEMAP, 'utf-8');
  const paths = [];
  const re = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const loc = (block.match(/<loc>\s*([^<]+?)\s*<\/loc>/) || [])[1];
    if (!loc) continue;
    const changefreq = (block.match(/<changefreq>\s*([^<]+?)\s*<\/changefreq>/) || [])[1] || 'weekly';
    const priority = (block.match(/<priority>\s*([^<]+?)\s*<\/priority>/) || [])[1] || '0.8';
    const entry = { raw: loc, path: null, changefreq, priority };
    if (loc.startsWith(DOMAIN)) entry.path = normalize(loc.slice(DOMAIN.length - 1));
    paths.push(entry);
  }
  return paths;
}

// True if a markdown file has YAML frontmatter (i.e. is a standalone page).
function hasFrontmatter(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buf = Buffer.alloc(8);
  const bytes = fs.readSync(fd, buf, 0, 8, 0);
  fs.closeSync(fd);
  return buf.slice(0, bytes).toString('utf-8').startsWith('---');
}

// Walk a content root and collect standalone page URL paths.
function collectPages(rootName) {
  const pages = [];
  const baseDir = path.join(ROOT, rootName);
  if (!fs.existsSync(baseDir)) return pages;

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'images' || entry.name === 'node_modules') continue;
        walk(full);
      } else if (entry.name.toLowerCase().endsWith('.md')) {
        if (IGNORED_FILE_NAMES.has(entry.name.toLowerCase())) continue;
        // Skip non-page templates such as policies.template.md.
        if (/\.template\.md$/i.test(entry.name)) continue;
        if (!hasFrontmatter(full)) continue;
        const rel = path.relative(ROOT, full).split(path.sep).join('/');
        let urlPath = '/' + rel.replace(/\.md$/, '');
        // index.md is served at the folder root (e.g. api/index.md -> /api).
        urlPath = urlPath.replace(/\/index$/, '');
        pages.push(urlPath);
      }
    }
  };
  walk(baseDir);
  return pages;
}

// Follow a redirect chain to the final canonical path. Returns null if the chain
// leads to an external URL, an empty target, or a cycle (i.e. should be dropped).
function resolveCanonical(p, redirects) {
  const seen = new Set();
  let current = p;
  while (redirects.has(current)) {
    if (seen.has(current)) return null;
    seen.add(current);
    const target = redirects.get(current);
    // Drop empty targets or external links (stored as "/http...").
    if (!target || /^\/?https?:/i.test(target)) return null;
    current = target;
  }
  return current;
}

// True if a content URL has a backing markdown file (index.md maps to the folder root).
function contentFileExists(p) {
  const root = p.split('/')[1];
  if (!CONTENT_ROOTS.includes(root)) return true; // not a content URL; leave untouched
  if (fs.existsSync(path.join(ROOT, p.slice(1) + '.md'))) return true;
  if (fs.existsSync(path.join(ROOT, p.slice(1), 'index.md'))) return true;
  return false;
}

function renderUrlBlock(loc, changefreq, priority) {
  return (
    `    <url>\n` +
    `        <loc>${loc}</loc>\n` +
    `        <changefreq>${changefreq}</changefreq>\n` +
    `        <priority>${priority}</priority>\n` +
    `    </url>`
  );
}

// Rewrite the sitemap canonically: drop broken/duplicate URLs, follow redirects to
// their targets, and append standalone pages that are missing.
function writeFixedSitemap(sitemapEntries, redirects, missingPages) {
  const added = new Set();
  const blocks = [];

  for (const entry of sitemapEntries) {
    // Preserve non-content URLs (homepage, /search, external locs, etc.) as-is.
    if (!entry.path) {
      blocks.push(renderUrlBlock(entry.raw, entry.changefreq, entry.priority));
      continue;
    }

    const canonical = resolveCanonical(entry.path, redirects);
    if (canonical === null) continue; // redirects to external/empty -> drop
    if (!KNOWN_SPECIAL_URLS.has(canonical) && !contentFileExists(canonical)) continue; // broken -> drop
    if (added.has(canonical)) continue; // duplicate -> drop

    added.add(canonical);
    blocks.push(renderUrlBlock(DOMAIN.slice(0, -1) + canonical, entry.changefreq, entry.priority));
  }

  for (const pagePath of missingPages) {
    if (added.has(pagePath)) continue;
    added.add(pagePath);
    blocks.push(renderUrlBlock(DOMAIN.slice(0, -1) + pagePath, 'weekly', '0.8'));
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    blocks.join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(SITEMAP, xml, 'utf-8');
  return added.size;
}

function main() {
  const asJson = process.argv.includes('--json');
  const fix = process.argv.includes('--fix');
  const redirects = loadRedirects();
  const sitemapEntries = readSitemapPaths();

  const sitemapPaths = new Set(sitemapEntries.filter((e) => e.path).map((e) => e.path));

  // Problem 1: sitemap content URLs that resolve to nothing on disk.
  const brokenUrls = [];
  for (const entry of sitemapEntries) {
    if (!entry.path) continue;
    if (KNOWN_SPECIAL_URLS.has(entry.path)) continue;
    const root = entry.path.split('/')[1];
    if (!CONTENT_ROOTS.includes(root)) continue;

    const file = path.join(ROOT, entry.path.slice(1) + '.md');
    if (fs.existsSync(file)) continue;
    if (redirects.has(entry.path)) continue;
    brokenUrls.push(entry.path);
  }

  // Problem 2: standalone pages on disk that are absent from the sitemap.
  const missingPages = [];
  for (const root of CONTENT_ROOTS) {
    for (const pagePath of collectPages(root)) {
      if (sitemapPaths.has(pagePath)) continue;
      if (redirects.has(pagePath)) continue;
      missingPages.push(pagePath);
    }
  }

  // Problem 3: sitemap entries that 301-redirect elsewhere (should list the canonical target).
  const redirectingUrls = [];
  for (const entry of sitemapEntries) {
    if (!entry.path) continue;
    if (redirects.has(entry.path)) redirectingUrls.push(`${entry.path} -> ${redirects.get(entry.path)}`);
  }

  // Problem 4: duplicate sitemap entries.
  const seen = new Set();
  const duplicates = [];
  for (const entry of sitemapEntries) {
    if (!entry.path) continue;
    if (seen.has(entry.path)) duplicates.push(entry.path);
    seen.add(entry.path);
  }

  brokenUrls.sort();
  missingPages.sort();
  redirectingUrls.sort();
  duplicates.sort();

  if (fix) {
    const count = writeFixedSitemap(sitemapEntries, redirects, missingPages);
    console.log(`Rewrote ${SITEMAP} with ${count} canonical URLs.`);
    console.log('Re-run "node build/verify-sitemap.js" to confirm a clean result.');
    return;
  }

  if (asJson) {
    console.log(JSON.stringify({ brokenUrls, missingPages, redirectingUrls, duplicates }, null, 2));
  } else {
    console.log(`Sitemap entries:            ${sitemapEntries.length}`);
    console.log(`Redirects loaded:           ${redirects.size}`);
    console.log('');

    console.log(`Broken URLs (in sitemap, no file/redirect): ${brokenUrls.length}`);
    brokenUrls.forEach((u) => console.log(`  - ${u}`));
    console.log('');

    console.log(`Pages missing from sitemap: ${missingPages.length}`);
    missingPages.forEach((u) => console.log(`  + ${u}`));
    console.log('');

    console.log(`Redirecting URLs (in sitemap, 301 elsewhere): ${redirectingUrls.length}`);
    redirectingUrls.forEach((u) => console.log(`  ~ ${u}`));
    console.log('');

    console.log(`Duplicate sitemap entries:  ${duplicates.length}`);
    duplicates.forEach((u) => console.log(`  = ${u}`));
  }

  const hasIssues = brokenUrls.length || missingPages.length || duplicates.length;
  process.exit(hasIssues ? 1 : 0);
}

main();
