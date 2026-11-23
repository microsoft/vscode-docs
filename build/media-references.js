'use strict';

const MarkdownIt = require('markdown-it');
const {htmlReferences, maskFrontmatter} = require('./check-links');

function normalizedSource(content) {
  const offsets = [];
  let text = '';
  for (let i = 0; i < content.length; i++) {
    offsets.push(i);
    if (content.at(i) === '\r') {
      text += '\n';
      if (content.at(i + 1) === '\n') i++;
    } else text += content.at(i);
  }
  offsets.push(content.length);
  return {text: text.startsWith('\uFEFF') ? ' ' + maskFrontmatter(text.slice(1)) : maskFrontmatter(text), offsets};
}

function destination(md, text, start) {
  const value = md.helpers.parseLinkDestination(text, start, text.length);
  if (!value.ok) return undefined;
  return {start: start + (text.at(start) === '<' ? 1 : 0),
    end: value.pos - (text.at(start) === '<' ? 1 : 0), target: md.normalizeLink(value.str)};
}

function inlineDestination(md, text, target) {
  const matches = [];
  for (const match of text.matchAll(/\]\(\s*/g)) {
    const value = destination(md, text, match.index + match[0].length);
    if (value?.target === target) matches.push(value);
  }
  return matches.length === 1 ? matches[0] : undefined;
}

function mediaReferences(content) {
  const {text, offsets} = normalizedSource(content);
  const md = new MarkdownIt({html: true});
  const definitions = new Map();
  const referenceRule = md.block.ruler.getRules('').find(rule => rule.name === 'reference');
  if (!referenceRule) throw new Error('Unsupported Markdown reference parser.');
  md.block.ruler.at('reference', (state, startLine, endLine, silent) => {
    const previous = new Set(Object.keys(state.env.references || {}));
    const accepted = referenceRule(state, startLine, endLine, silent);
    if (accepted && !silent) {
      const start = state.bMarks.at(startLine);
      const raw = state.src.slice(start, state.bMarks.at(state.line) ?? state.src.length);
      const prefix = /^[ \t]{0,3}\[(?:\\.|[^\]\\])+\]:\s*/.exec(raw);
      const value = prefix && destination(md, raw, prefix[0].length);
      for (const [label, entry] of Object.entries(state.env.references || {})) {
        if (!previous.has(label)) definitions.set(label, value?.target === entry.href
          ? {start: start + value.start, end: start + value.end} : undefined);
      }
    }
    return accepted;
  });
  for (const name of ['image', 'link', 'html_inline']) {
    const original = md.inline.ruler.getRules('').find(rule => rule.name === name);
    if (!original) throw new Error(`Unsupported Markdown ${name} parser.`);
    md.inline.ruler.at(name, (state, silent) => {
      const start = state.pos, count = state.tokens.length;
      const accepted = original(state, silent);
      if (accepted && !silent) {
        const token = name === 'link' ? state.tokens.slice(count).find(item => item.type === 'link_open') : state.tokens.at(-1);
        if (token) token.meta = {...token.meta, mediaStart: start, mediaEnd: state.pos};
      }
      return accepted;
    });
  }
  const environment = {};
  const tokens = md.parse(text, environment);
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text.at(i) === '\n') starts.push(i + 1);
  const references = [];
  const rawState = {};
  function add(target, range, line, mime) {
    references.push({target, line, ...(range ? {start: offsets.at(range.start), end: offsets.at(range.end)} : {}),
      ...(mime ? {mime} : {})});
  }
  function tokenOffsets(token) {
    if (!token.map) return undefined;
    const result = [];
    let position = 0;
    for (const [index, line] of token.content.split('\n').entries()) {
      const first = starts[token.map[0] + index];
      if (first === undefined) return undefined;
      const raw = text.slice(first, starts[token.map[0] + index + 1] ?? text.length).replace(/\n$/, '');
      const column = line ? raw.indexOf(line) : 0;
      if (column < 0 || (line && raw.lastIndexOf(line) !== column)) return undefined;
      for (let i = 0; i <= line.length; i++) result[position + i] = first + column + i;
      position += line.length + 1;
    }
    return result;
  }
  function html(value, base, locations, line) {
    const found = [];
    htmlReferences(value, line, found, new Set(), true, rawState);
    for (const entry of found) {
      const start = locations?.[base + entry.start], end = locations?.[base + entry.end];
      add(entry.target, start !== undefined && end !== undefined ? {start, end} : undefined, entry.line, entry.mime);
    }
  }
  for (const token of tokens) {
    const locations = tokenOffsets(token);
    if (token.type === 'html_block') html(token.content, 0, locations, token.map[0] + 1);
    if (token.type !== 'inline') continue;
    for (const child of token.children || []) {
      const start = child.meta?.mediaStart, end = child.meta?.mediaEnd;
      const line = (token.map?.[0] || 0) + 1;
      if (child.type === 'html_inline') {
        html(child.content, start, locations, line);
      } else if (!rawState.tag && ['image', 'link_open'].includes(child.type)) {
        const target = child.attrGet(child.type === 'image' ? 'src' : 'href');
        if (child.meta?.label) add(target, definitions.get(child.meta.label), line);
        else {
          const value = start !== undefined && end !== undefined && inlineDestination(md, token.content.slice(start, end), target);
          const first = value && locations?.[start + value.start], last = value && locations?.[start + value.end];
          add(target, first !== undefined && last !== undefined ? {start: first, end: last} : undefined, line);
        }
      }
    }
  }
  return references;
}

function versionedReference(value, filename) {
  const suffix = value.search(/[?#]/);
  const route = suffix === -1 ? value : value.slice(0, suffix);
  const tail = suffix === -1 ? '' : value.slice(suffix);
  const separators = [...route.matchAll(/\/|%2f/gi)];
  const last = separators.at(-1);
  return route.slice(0, last ? last.index + last[0].length : 0) + filename + tail;
}

function rewriteReferences(content, references, filename) {
  const edits = new Map();
  for (const reference of references) {
    if (!Number.isInteger(reference.start) || !Number.isInteger(reference.end)) {
      throw new Error(`Cannot safely locate a media reference at line ${reference.line}. Update that unsupported form explicitly.`);
    }
    const key = `${reference.start}:${reference.end}`;
    edits.set(key, {...reference, value: versionedReference(content.slice(reference.start, reference.end), filename)});
  }
  let updated = content, previous = content.length;
  for (const edit of [...edits.values()].sort((a, b) => b.start - a.start)) {
    if (edit.start < 0 || edit.end > previous || edit.end <= edit.start) throw new Error('Overlapping or invalid media reference edits.');
    updated = updated.slice(0, edit.start) + edit.value + updated.slice(edit.end);
    previous = edit.start;
  }
  return updated;
}

module.exports = {mediaReferences, rewriteReferences};
