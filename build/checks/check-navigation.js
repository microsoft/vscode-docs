'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { parseTree, printParseErrorCode } = require('jsonc-parser');
const { substituteDataVariables } = require('../preview/data-variables-substitution');
const { isWithinRoot } = require('../lib/repository-paths');
const { analyzeSitemap, collectPages, CONTENT_ROOTS, parseSitemap } = require('./verify-sitemap');

/* eslint-disable security/detect-non-literal-fs-filename -- Imports and source files are confined to the repository. */

const ROOT_TOCS = ['docs', 'api', 'learn'].map(directory => path.join(directory, 'toc.json'));

function checkNavigation(rootDirectory, variables, resolver) {
  const root = fs.realpathSync(rootDirectory);
  const captures = new Map();
  const active = new Set();
  const visited = new Set();
  const findings = [];
  const relative = file => path.relative(root, file).split(path.sep).join('/');

  function capture(file) {
    if (!isWithinRoot(root, file)) {
      return { problem: 'Path is outside the repository.' };
    }
    if (captures.has(file)) {
      return captures.get(file);
    }
    let result;
    try {
      const actual = fs.realpathSync(file);
      if (!isWithinRoot(root, actual)) {
        result = { problem: 'Path resolves outside the repository.' };
      } else if (!fs.statSync(actual).isFile()) {
        result = { problem: 'Expected a file.' };
      } else {
        const bytes = fs.readFileSync(actual);
        result = { actual, content: bytes.toString('utf8'), hash: crypto.createHash('sha256').update(bytes).digest('hex') };
      }
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') {
        throw error;
      }
      result = { problem: 'File does not exist.' };
    }
    captures.set(file, result);
    return result;
  }

  function add(file, line, evidence, message, severity = 'error') {
    const source = capture(file);
    if (source.problem) {
      throw new Error(`${relative(file)}: ${source.problem}`);
    }
    findings.push({ file, articleHash: source.hash, line, evidence, message, severity });
  }

  function property(node, name) {
    return node.children?.find(child => child.type === 'property' && child.children[0].value === name)?.children[1];
  }

  function visitToc(file, origin) {
    const source = capture(file);
    if (source.problem) {
      if (!origin) {
        throw new Error(`${relative(file)}: ${source.problem}`);
      }
      add(origin.file, origin.line, `toc-import(${origin.value})`, `Cannot load TOC "${origin.value}": ${source.problem}`);
      return;
    }
    if (active.has(source.actual)) {
      add(origin.file, origin.line, `toc-import(${origin.value})`, `TOC import cycle through "${origin.value}".`);
      return;
    }
    if (visited.has(file)) {
      return;
    }
    visited.add(file);
    active.add(source.actual);
    const lineOf = node => source.content.slice(0, node.offset).split('\n').length;
    const errors = [];
    const tree = parseTree(source.content, errors, { allowTrailingComma: true });
    if (errors.length || !tree) {
      const error = errors[0];
      add(file, error ? lineOf(error) : 1, 'toc-format', `Invalid TOC JSONC${error ? `: ${printParseErrorCode(error.error)}` : ''}.`);
      active.delete(source.actual);
      return;
    }

    function fail(node, location, message) {
      add(file, lineOf(node), `toc-structure(${location})`, message);
    }

    function resolveString(node, location) {
      if (node.type !== 'string') {
        fail(node, location, 'Expected a string in the TOC.');
        return undefined;
      }
      try {
        return substituteDataVariables(node.value, variables, relative(file));
      } catch (error) {
        fail(node, location, error.message);
        return undefined;
      }
    }

    function checkLink(node, location) {
      const target = resolveString(node, location);
      if (target === undefined) {
        return;
      }
      if (!target.trim()) {
        fail(node, location, 'TOC links must not be empty.');
        return;
      }
      const result = resolver.resolve(file, { target, media: false });
      if (result) {
        add(file, lineOf(node), `toc-link(${target})`, result.message, result.severity);
      }
    }

    function section(node, location) {
      if (node.type !== 'object') {
        fail(node, location, 'Expected a TOC section object.');
        return;
      }
      const name = property(node, 'name');
      if (!name) {
        fail(node, location, 'TOC sections require a name.');
      } else {
        const label = resolveString(name, `${location}.name`);
        if (label !== undefined && !label.trim()) {
          fail(name, `${location}.name`, 'TOC section names must not be empty.');
        }
      }
      const link = property(node, 'link');
      if (link) {
        checkLink(link, `${location}.link`);
      }
      const imported = property(node, 'toc');
      if (imported) {
        const target = resolveString(imported, `${location}.toc`);
        if (target !== undefined) {
          if (!target.trim() || path.isAbsolute(target) || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(target)) {
            fail(imported, `${location}.toc`, 'TOC imports must be nonempty relative file paths.');
          } else {
            visitToc(path.resolve(path.dirname(file), target), { file, line: lineOf(imported), value: target });
          }
        }
      }
      const topics = property(node, 'topics');
      if (!topics && !imported) {
        fail(node, location, 'TOC sections require topics or a toc import.');
      } else if (topics) {
        if (topics.type !== 'array') {
          fail(topics, `${location}.topics`, 'TOC topics must be an array.');
          return;
        }
        for (const [index, topic] of topics.children.entries()) {
          const itemLocation = `${location}.topics[${index}]`;
          if (topic.type !== 'array' || topic.children.length < 2 || topic.children.length > 3) {
            fail(topic, itemLocation, 'TOC topics require a title, a target, and optional metadata.');
            continue;
          }
          const [title, target, metadata] = topic.children;
          if (title.type !== 'string' || target.type !== 'string') {
            fail(topic, itemLocation, 'TOC topic titles and targets must be strings.');
            continue;
          }
          if (title.value === '' && target.value === '') {
            if (metadata) {
              section(metadata, `${itemLocation}[2]`);
            }
          } else {
            const label = resolveString(title, `${itemLocation}[0]`);
            if (label !== undefined && !label.trim()) {
              fail(title, itemLocation, 'TOC article titles must not be empty.');
            }
            checkLink(target, itemLocation);
          }
        }
      }
    }

    if (tree.type !== 'array') {
      fail(tree, '$', 'The TOC must contain an array of sections.');
    } else {
      tree.children.forEach((node, index) => section(node, `$[${index}]`));
    }
    active.delete(source.actual);
  }

  for (const toc of ROOT_TOCS) {
    visitToc(path.join(root, toc));
  }
  const sitemapFile = path.join(root, 'build', 'sitemap.xml');
  const sitemap = capture(sitemapFile);
  if (sitemap.problem) {
    throw new Error(`build/sitemap.xml: ${sitemap.problem}`);
  }
  let entries;
  try {
    entries = parseSitemap(sitemap.content);
  } catch (error) {
    add(sitemapFile, 1, 'sitemap-format', error.message);
  }
  const pages = CONTENT_ROOTS.flatMap(directory => collectPages(directory, root)).sort();
  if (entries) {
    const redirects = resolver.redirects();
    const entriesByPath = new Map(entries.filter(entry => entry.path).map(entry => [entry.path, entry]));
    const results = new Map();
    const report = analyzeSitemap(entries, redirects, pages, urlPath => {
      const result = resolver.resolve(sitemapFile, { target: urlPath, media: false });
      results.set(urlPath, result);
      return !result || result.severity !== 'error';
    });
    for (const urlPath of report.brokenUrls) {
      add(sitemapFile, entriesByPath.get(urlPath).line, `sitemap-link(${urlPath})`, results.get(urlPath).message);
    }
    for (const urlPath of report.duplicates) {
      add(sitemapFile, entriesByPath.get(urlPath).line, `sitemap-duplicate(${urlPath})`, `Duplicate sitemap URL "${urlPath}".`);
    }
    for (const redirect of report.redirectingUrls) {
      const urlPath = redirect.slice(0, redirect.indexOf(' -> '));
      add(sitemapFile, entriesByPath.get(urlPath).line, `sitemap-redirect(${urlPath})`,
        `Sitemap URL redirects: ${redirect}. Prefer its canonical destination.`, 'warning');
    }
    for (const urlPath of report.missingPages) {
      const directFile = path.join(root, urlPath.slice(1) + '.md');
      const file = capture(directFile).problem ? path.join(root, urlPath.slice(1), 'index.md') : directFile;
      add(file, 1, `sitemap-missing(${urlPath})`, `Standalone page "${urlPath}" is missing from build/sitemap.xml.`);
    }
    for (const [urlPath, result] of results) {
      if (result?.severity === 'unverified') {
        add(sitemapFile, entriesByPath.get(urlPath).line, `sitemap-link(${urlPath})`, result.message, 'unverified');
      }
    }
  }
  return {
    findings,
    fingerprint: {
      files: [...captures].map(([file, source]) => [relative(file), source.hash || source.problem])
        .sort(([left], [right]) => left.localeCompare(right)),
      pages
    }
  };
}

module.exports = { checkNavigation };
