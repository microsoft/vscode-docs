'use strict';

const TRYOUT_COMMAND = 'workbench.action.onboarding.tryFeature';
const TRYOUT_ID = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/;
const PARAMETERIZED_TRYOUT = 'Could not validate a parameterized tryout reference. A literal ID and arguments are needed.';
const MACROS = [
  { pattern: /setting\(([^)\r\n]+)\)/g, kind: 'setting' },
  { pattern: /kb\(([^)\r\n]+)\)/g, kind: 'keybinding' }
];
const URI_PATTERN = /(?<![A-Za-z0-9_.:/-])(?:command:[A-Za-z0-9_%][^?\s<>`"'(){}#]*|vscode(?:-insiders)?:\/\/tryout\/[^\s<>`)]*)/gi;

function isParameterized(value) {
  return typeof value === 'string' && (/^<[^>\r\n]+>$/.test(value) || value.includes('${'));
}

function parseTryoutCommand(uri) {
  const query = uri.slice(uri.indexOf('?') + 1).split('#')[0];
  if (isParameterized(query)) {
    return { message: PARAMETERIZED_TRYOUT };
  }
  let args;
  try {
    args = JSON.parse(decodeURIComponent(query));
  } catch (error) {
    if (!(error instanceof URIError) && !(error instanceof SyntaxError)) {
      throw error;
    }
    return { error: 'Tryout command links require a URI-encoded JSON array containing exactly one valid tryout ID.' };
  }
  if (Array.isArray(args) && args.length === 1 && isParameterized(args[0])) {
    return { message: PARAMETERIZED_TRYOUT };
  }
  if (!Array.isArray(args) || args.length !== 1 || typeof args[0] !== 'string' || !TRYOUT_ID.test(args[0])) {
    return { error: 'Tryout command links require exactly one ID: 1-128 letters, digits, dots, underscores, or hyphens, starting with a letter or digit.' };
  }
  return { target: args[0] };
}

function parseExternalTryout(uri) {
  const path = uri.slice(uri.indexOf('://') + 3 + 'tryout/'.length);
  const parts = /^([^?#]*)(\?)?(#)?$/.exec(path);
  if (!parts) {
    return { error: 'External tryout links must contain only a tryout ID, without a nonempty query or fragment.' };
  }
  let id;
  try {
    id = decodeURIComponent(parts[1]);
  } catch (error) {
    if (!(error instanceof URIError)) {
      throw error;
    }
    return { error: 'External tryout links contain invalid percent encoding.' };
  }
  if (!TRYOUT_ID.test(id)) {
    if (isParameterized(id)) {
      return { message: PARAMETERIZED_TRYOUT };
    }
    return { error: 'External tryout links require an ID of 1-128 letters, digits, dots, underscores, or hyphens, starting with a letter or digit.' };
  }
  return { target: id };
}

function collectProductReferences(content) {
  const references = [];
  for (const { pattern, kind } of MACROS) {
    for (const match of content.matchAll(pattern)) {
      const value = match[1].trim();
      references.push({
        offset: match.index,
        kind,
        claim: `${kind}(${value})`,
        target: kind === 'setting' ? value.split(':')[0].trim() : value
      });
    }
  }
  let consumedUntil = 0;
  for (const match of content.matchAll(URI_PATTERN)) {
    if (match.index < consumedUntil) {
      continue;
    }
    let uri = match[0];
    if (/^command:/i.test(uri)) {
      const query = /^\?[^\s<>`)]*/.exec(content.slice(match.index + uri.length));
      uri += query ? query[0] : '';
    }
    consumedUntil = match.index + uri.length;
    const placeholder = /^<[^>\r\n]+>/.exec(content.slice(consumedUntil));
    if (placeholder) {
      uri += placeholder[0];
      consumedUntil += placeholder[0].length;
    }
    uri = uri.replace(/["']+$/, '');
    const command = /^command:([^?]+)/i.exec(uri);
    if (command) {
      try {
        command[1] = decodeURIComponent(command[1]);
      } catch (error) {
        if (!(error instanceof URIError)) {
          throw error;
        }
        references.push({ offset: match.index, kind: 'command', claim: `command-uri(${uri})`, error: 'Command links contain invalid percent encoding in the command ID.' });
        continue;
      }
    }
    if (command && command[1] !== TRYOUT_COMMAND) {
      references.push({ offset: match.index, kind: 'command', claim: `command(${command[1]})`, target: command[1] });
      continue;
    }
    const result = command ? parseTryoutCommand(uri) : parseExternalTryout(uri);
    references.push({
      offset: match.index,
      kind: 'tryout',
      claim: result.target === undefined ? `tryout-uri(${uri})` : `tryout(${result.target})`,
      ...result
    });
  }
  return references;
}

module.exports = { collectProductReferences };
