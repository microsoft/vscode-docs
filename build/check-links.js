'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { parse } = require('jsonc-parser');
const { substituteDataVariables } = require('./data-variables-substitution');
const { headingToAnchor } = require('./release-note-toc');
const { CONTENT_ROOTS, KNOWN_SPECIAL_URLS } = require('./verify-sitemap');
const { isWithinRoot } = require('./repository-paths');

/* eslint-disable security/detect-non-literal-fs-filename -- Target paths are checked against the repository root before reading. */

const CONTENT_DIRECTORIES = new Set([...CONTENT_ROOTS, 'blogs', 'release-notes', 'remote-release-notes']);
const markdown = new MarkdownIt({ html: true, linkify: false });

function headingAnchor(heading, article) {
  const isApi = article.startsWith('api/');
  if (!isApi) {
    return '_' + heading.replace(/[^a-zA-Z0-9#@\s-]/g, '')
      .replace(/#/g, 'hash').replace(/@/g, 'at').replace(/\s+/g, '-').toLowerCase();
  }
  if (heading === '*') {
    return 'all';
  }
  const caseSensitive = ['api/references/contribution-points.md', 'api/references/activation-events.md'].includes(article);
  if (!caseSensitive && heading.includes('.') && !heading.includes(' ')) {
    return heading.replace(/`/g, '').replace(/#/g, 'hash').replace(/@/g, 'at');
  }
  const anchor = heading.replace(/[^a-zA-Z0-9.#@\s-]/g, '')
    .replace(/#/g, 'hash').replace(/@/g, 'at').replace(/\s+/g, '-');
  return caseSensitive ? anchor : anchor.toLowerCase();
}

function htmlReferences(content, firstLine, references, anchors) {
  let position = 0;
  while (position < content.length) {
    const start = content.indexOf('<', position);
    if (start === -1) {
      break;
    }
    if (content.startsWith('<!--', start)) {
      const end = content.indexOf('-->', start + 4);
      position = end === -1 ? content.length : end + 3;
      continue;
    }
    let end = start + 1;
    let quote;
    for (; end < content.length; end++) {
      const character = content.charAt(end);
      if (quote) {
        if (character === quote) {
          quote = undefined;
        }
      } else if (character === '"' || character === "'") {
        quote = character;
      } else if (character === '>') {
        break;
      }
    }
    position = end + 1;
    const tag = content.slice(start, position);
    const name = /^<([a-z][a-z0-9-]*)\b/i.exec(tag)?.[1].toLowerCase();
    if (!name) {
      continue;
    }
    const line = firstLine + content.slice(0, start).split('\n').length - 1;
    const attributes = /(?:^|\s)(href|src|poster|id|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi;
    for (const match of tag.matchAll(attributes)) {
      const attribute = match[1].toLowerCase();
      const value = markdown.utils.unescapeAll(match[2] ?? match[3] ?? match[4]);
      if (attribute === 'id' || (attribute === 'name' && name === 'a')) {
        anchors.add(value);
      } else if (attribute === 'href' && name === 'a') {
        references.push({ target: value, line, media: false });
      } else if (['img', 'video', 'source', 'audio'].includes(name) && ['src', 'poster'].includes(attribute)) {
        references.push({ target: value, line, media: true });
      }
    }
  }
}

function analyzeDocument(content, article, variables) {
  const resolved = substituteDataVariables(content, variables, article);
  const body = resolved.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, match => match.replace(/[^\r\n]/g, ' '));
  const tokens = markdown.parse(body, {});
  const references = [];
  const anchors = new Set();
  let uncertainAnchors = /<!--\s*%IF\b|^<<<\s/m.test(body);
  let enclosingLine = 1;
  for (const [index, token] of tokens.entries()) {
    if (token.map) {
      enclosingLine = token.map[0] + 1;
    }
    const line = enclosingLine;
    if (token.type === 'heading_open') {
      const heading = tokens.at(index + 1).content;
      if (/<[^>]*>/.test(heading)) {
        uncertainAnchors = true;
      } else {
        const supported = article.startsWith('api/') ? ['h2', 'h3'] : ['h2', 'h3', 'h4'];
        if (supported.includes(token.tag)) {
          const anchor = headingAnchor(heading, article);
          anchors.add(anchor);
          // Source Markdown uses unprefixed fragments; the website adds "_".
          if (anchor.startsWith('_')) {
            anchors.add(anchor.slice(1));
          }
        }
        if (article.startsWith('release-notes/')) {
          anchors.add(headingToAnchor(heading));
        }
      }
    }
    if (token.type === 'html_block') {
      htmlReferences(token.content, line, references, anchors);
    }
    let childLine = line;
    for (const child of token.children || []) {
      if (child.type === 'link_open') {
        references.push({ target: child.attrGet('href'), line: childLine, media: false });
      } else if (child.type === 'image') {
        references.push({ target: child.attrGet('src'), line: childLine, media: true });
      } else if (child.type === 'html_inline') {
        htmlReferences(child.content, childLine, references, anchors);
      }
      childLine += child.type === 'softbreak' || child.type === 'hardbreak' ? 1 : child.content.split('\n').length - 1;
    }
  }
  return { references, anchors, uncertainAnchors };
}

function createLinkChecker(rootDirectory, variables) {
  const root = fs.realpathSync(rootDirectory);
  const dependencies = new Map();
  const files = new Map();
  const documents = new Map();
  const redirects = new Map();
  const relative = file => path.relative(root, file).split(path.sep).join('/');

  function readFile(file) {
    if (!isWithinRoot(root, file)) {
      return { problem: 'Target is outside the repository.' };
    }
    if (files.has(file)) {
      return files.get(file);
    }
    let result;
    try {
      const actual = fs.realpathSync(file);
      if (!isWithinRoot(root, actual)) {
        result = { problem: 'Target resolves outside the repository.' };
      } else if (!fs.statSync(actual).isFile()) {
        result = { directory: true };
      } else {
        result = { file: true };
        if (file.endsWith('.md') || path.basename(file) === 'redirection.json') {
          const bytes = fs.readFileSync(actual);
          result = { file: true, bytes, sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') {
        throw error;
      }
      result = { missing: true };
    }
    files.set(file, result);
    dependencies.set(relative(file), result.sha256 || result.problem ||
      (result.directory ? 'directory' : result.file ? 'file' : 'missing'));
    return result;
  }

  for (const directory of [...CONTENT_ROOTS, 'blogs']) {
    const file = path.join(root, directory, 'redirection.json');
    const capture = readFile(file);
    if (capture.missing) {
      continue;
    }
    if (!capture.bytes) {
      throw new Error(`${relative(file)}: Expected a redirect file inside the repository.`);
    }
    const errors = [];
    const entries = parse(capture.bytes.toString('utf8'), errors, { allowTrailingComma: true });
    if (errors.length || !Array.isArray(entries)) {
      throw new Error(`${relative(file)}: Invalid redirect JSONC.`);
    }
    for (const entry of entries) {
      if (!entry || typeof entry.from !== 'string' || !entry.from.startsWith('/') ||
          (entry.to !== undefined && entry.to !== null && typeof entry.to !== 'string')) {
        throw new Error(`${relative(file)}: Expected redirects with from and optional to paths.`);
      }
      const from = entry.from.replace(/\.md$/, '').replace(/\/$/, '') || '/';
      if (redirects.has(from) && redirects.get(from) !== entry.to) {
        throw new Error(`${relative(file)}: Conflicting redirect targets for "${from}".`);
      }
      redirects.set(from, entry.to);
    }
  }

  function document(file, content) {
    if (!documents.has(file)) {
      documents.set(file, analyzeDocument(content ?? readFile(file).bytes.toString('utf8'), relative(file), variables));
    }
    return documents.get(file);
  }

  function resolveTarget(article, reference) {
    const target = reference.target;
    if (!target || target === '#') {
      return undefined;
    }
    if (/[{}]|<[^>]+>/.test(target)) {
      return { severity: 'unverified', message: `Cannot resolve parameterized target "${target}".` };
    }
    let route = target;
    if (route.startsWith('//') || /^https?:\/\//i.test(route)) {
      let url;
      try {
        url = new URL(route, 'https://code.visualstudio.com');
      } catch (error) {
        if (!(error instanceof TypeError)) {
          throw error;
        }
        return { severity: 'error', message: `Invalid URL "${target}".` };
      }
      if (url.hostname !== 'code.visualstudio.com') {
        return undefined;
      }
      route = url.pathname + url.search + url.hash;
    } else if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(route)) {
      return undefined;
    }
    const hashIndex = route.indexOf('#');
    let fragment = hashIndex === -1 ? '' : route.slice(hashIndex + 1);
    route = (hashIndex === -1 ? route : route.slice(0, hashIndex)).split('?')[0];
    try {
      route = decodeURIComponent(route);
      fragment = decodeURIComponent(fragment);
    } catch (error) {
      if (!(error instanceof URIError)) {
        throw error;
      }
      return { severity: 'error', message: `Invalid URL encoding in "${target}".` };
    }
    if (/[{}]|<[^>]+>/.test(route) || /[{}]|<[^>]+>/.test(fragment)) {
      return { severity: 'unverified', message: `Cannot resolve parameterized target "${target}".` };
    }
    if (route.includes('\\') || route.includes('\0')) {
      return { severity: 'error', message: `Invalid path in "${target}". Use URL path separators.` };
    }
    const rootRelative = route.startsWith('/');
    let file = route ? path.resolve(rootRelative ? root : path.dirname(article), rootRelative ? route.slice(1) : route) : article;
    if (!isWithinRoot(root, file)) {
      return { severity: 'error', message: `Link "${target}" escapes the repository.` };
    }
    let canonical = '/' + relative(file).replace(/\.md$/, '').replace(/\/$/, '');
    const seen = new Set();
    while (!reference.media && redirects.has(canonical)) {
      if (seen.has(canonical)) {
        return { severity: 'error', message: `Redirect cycle while resolving "${target}".` };
      }
      seen.add(canonical);
      const destination = redirects.get(canonical);
      if (!destination || !destination.startsWith('/') || destination.startsWith('//')) {
        return { severity: 'unverified', message: `Redirect for "${target}" has no locally verifiable destination.` };
      }
      const [pathname, redirectedFragment] = destination.split('#');
      let redirectedPath;
      try {
        redirectedPath = decodeURIComponent(pathname.split('?')[0]);
        if (redirectedFragment !== undefined) {
          fragment = decodeURIComponent(redirectedFragment);
        }
      } catch (error) {
        if (!(error instanceof URIError)) {
          throw error;
        }
        return { severity: 'error', message: `Invalid redirect URL encoding while resolving "${target}".` };
      }
      if (redirectedPath.includes('\\') || redirectedPath.includes('\0')) {
        return { severity: 'error', message: `Invalid redirect path while resolving "${target}".` };
      }
      file = path.resolve(root, redirectedPath.slice(1));
      if (!isWithinRoot(root, file)) {
        return { severity: 'error', message: `Redirect for "${target}" escapes the repository.` };
      }
      canonical = '/' + relative(file).replace(/\.md$/, '').replace(/\/$/, '');
    }
    if (canonical.startsWith('/updates/')) {
      file = path.join(root, 'release-notes', canonical.slice('/updates/'.length));
    }
    if (!reference.media && !fragment && KNOWN_SPECIAL_URLS.has(canonical)) {
      return undefined;
    }
    if (file === root) {
      return { severity: 'unverified', message: `Website-owned target "${target}" cannot be checked from this repository.` };
    }
    const candidates = [file];
    if (!reference.media && !path.extname(file)) {
      candidates.push(`${file}.md`, path.join(file, 'index.md'));
    }
    let resolvedFile;
    let directoryTarget = false;
    for (const candidate of candidates) {
      const capture = readFile(candidate);
      if (capture.problem) {
        return { severity: 'error', message: `${target}: ${capture.problem}` };
      }
      if (capture.file) {
        resolvedFile = candidate;
        break;
      }
      directoryTarget ||= Boolean(capture.directory);
    }
    if (!resolvedFile) {
      const section = canonical.split('/')[1];
      if ((!reference.media && directoryTarget) || KNOWN_SPECIAL_URLS.has(canonical) ||
          (rootRelative && !CONTENT_DIRECTORIES.has(section))) {
        return { severity: 'unverified', message: `Website-owned or generated target "${target}" cannot be checked from this repository.` };
      }
      return { severity: 'error', message: `Missing ${reference.media ? 'media file' : 'link target'} "${target}".` };
    }
    if (fragment && !reference.media) {
      if (!resolvedFile.endsWith('.md') || !CONTENT_DIRECTORIES.has(relative(resolvedFile).split('/')[0])) {
        return { severity: 'unverified', message: `Cannot verify fragment "${fragment}" in "${target}" with the documentation renderer.` };
      }
      const parsed = document(resolvedFile);
      if (!parsed.anchors.has(fragment)) {
        return {
          severity: parsed.uncertainAnchors ? 'unverified' : 'error',
          message: parsed.uncertainAnchors
            ? `Fragment "${fragment}" in "${target}" may depend on generated or conditional content.`
            : `Missing fragment "${fragment}" in "${target}".`
        };
      }
    }
    return undefined;
  }

  return {
    resolve: resolveTarget,
    redirects() {
      return new Map(redirects);
    },
    check(file, content) {
      const parsed = document(file, content);
      const findings = [];
      for (const reference of parsed.references) {
        const result = resolveTarget(file, reference);
        if (result) {
          findings.push({
            ...result,
            line: reference.line,
            evidence: `${reference.media ? 'media' : 'link'}(${reference.target})`
          });
        }
      }
      return findings;
    },
    fingerprint() {
      return [...dependencies].sort(([left], [right]) => left.localeCompare(right));
    }
  };
}

module.exports = { analyzeDocument, createLinkChecker, headingAnchor };
