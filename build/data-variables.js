'use strict';

const fs = require('fs');
const path = require('path');
const { substituteDataVariables } = require('./data-variables-substitution');

/* eslint-disable security/detect-non-literal-fs-filename -- Callers limit paths to repository or test directories. */

function createParseError(filePath, lineNumber, message) {
  return new Error(`${filePath}:${lineNumber}: ${message}`);
}

function parseDoubleQuotedScalar(rawValue, filePath, lineNumber) {
  let value = '';

  for (let index = 1; index < rawValue.length; index++) {
    const character = rawValue.charAt(index);
    if (character === '"') {
      const remainder = rawValue.slice(index + 1).trim();
      if (remainder && !remainder.startsWith('#')) {
        throw createParseError(filePath, lineNumber, 'Unexpected content after a double-quoted value.');
      }
      return value;
    }

    if (character !== '\\') {
      value += character;
      continue;
    }

    index++;
    const escaped = rawValue.charAt(index);
    switch (escaped) {
      case '"':
        value += '"';
        break;
      case '\\':
        value += '\\';
        break;
      case 'n':
        value += '\n';
        break;
      case 't':
        value += '\t';
        break;
      default:
        throw createParseError(filePath, lineNumber, `Unsupported escape sequence "\\${escaped || ''}".`);
    }
  }

  throw createParseError(filePath, lineNumber, 'Unterminated double-quoted value.');
}

function parseSingleQuotedScalar(rawValue, filePath, lineNumber) {
  let value = '';

  for (let index = 1; index < rawValue.length; index++) {
    const character = rawValue.charAt(index);
    if (character !== "'") {
      value += character;
      continue;
    }

    if (rawValue.charAt(index + 1) === "'") {
      value += "'";
      index++;
      continue;
    }

    const remainder = rawValue.slice(index + 1).trim();
    if (remainder && !remainder.startsWith('#')) {
      throw createParseError(filePath, lineNumber, 'Unexpected content after a single-quoted value.');
    }
    return value;
  }

  throw createParseError(filePath, lineNumber, 'Unterminated single-quoted value.');
}

function parseUnquotedScalar(rawValue, filePath, lineNumber) {
  const valueWithComment = rawValue.trimStart();
  const commentIndex = valueWithComment.indexOf('#');
  const value = (commentIndex === -1 ? valueWithComment : valueWithComment.slice(0, commentIndex)).trimEnd();

  if (value.includes(':')) {
    throw createParseError(filePath, lineNumber, 'Values that contain ":" must be quoted.');
  }
  if (/^[&*]/.test(value)) {
    throw createParseError(filePath, lineNumber, 'YAML anchors and aliases are not supported.');
  }
  if (/^[{[]/.test(value)) {
    throw createParseError(filePath, lineNumber, 'Flow-style collections are not supported.');
  }
  if (/^[>|](?:\s|$)/.test(value)) {
    throw createParseError(filePath, lineNumber, 'Block scalar values are not supported.');
  }

  return value;
}

function parseScalar(rawValue, filePath, lineNumber) {
  const value = rawValue.trimStart();
  if (value.startsWith('"')) {
    return parseDoubleQuotedScalar(value, filePath, lineNumber);
  }
  if (value.startsWith("'")) {
    return parseSingleQuotedScalar(value, filePath, lineNumber);
  }
  return parseUnquotedScalar(rawValue, filePath, lineNumber);
}

function parseVariableFile(content, filePath) {
  const entries = [];
  const keys = new Set();

  for (const [lineIndex, line] of content.split(/\r?\n/).entries()) {
    const lineNumber = lineIndex + 1;
    if (!line.trim() || line.startsWith('#')) {
      continue;
    }
    if (/^\s/.test(line)) {
      throw createParseError(filePath, lineNumber, 'Indented mappings and sequences are not supported.');
    }
    if (line.startsWith('-')) {
      throw createParseError(filePath, lineNumber, 'Block sequences are not supported.');
    }

    const separatorIndex = line.indexOf(':');
    if (separatorIndex <= 0) {
      throw createParseError(filePath, lineNumber, 'Expected a flat "key: value" entry.');
    }

    const key = line.slice(0, separatorIndex).trim();
    if (!key || key.startsWith('"') || key.startsWith("'")) {
      throw createParseError(filePath, lineNumber, 'Variable keys must be unquoted, non-empty strings.');
    }
    if (key.split('.').some(segment => !segment.trim())) {
      throw createParseError(filePath, lineNumber, `Variable key "${key}" contains an empty path segment.`);
    }
    if (keys.has(key)) {
      throw createParseError(filePath, lineNumber, `Duplicate variable key "${key}".`);
    }

    keys.add(key);
    entries.push({
      key,
      lineNumber,
      value: parseScalar(line.slice(separatorIndex + 1), filePath, lineNumber)
    });
  }

  return entries;
}

function findFiles(directoryPath, predicate) {
  const files = [];
  const directoryEntries = fs.readdirSync(directoryPath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name));

  for (const entry of directoryEntries) {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFiles(entryPath, predicate));
    } else if (entry.isFile() && predicate(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

function findNamespaceCollision(variablePath, existingPaths) {
  for (const existingPath of existingPaths) {
    if (
      variablePath === existingPath ||
      variablePath.startsWith(`${existingPath}.`) ||
      existingPath.startsWith(`${variablePath}.`)
    ) {
      return existingPath;
    }
  }
  return undefined;
}

function loadDataVariables(variablesDirectory) {
  if (!fs.existsSync(variablesDirectory)) {
    throw new Error(`Data variable directory does not exist: ${variablesDirectory}`);
  }

  const values = Object.create(null);
  const sources = new Map();
  const variableFiles = findFiles(variablesDirectory, fileName => /\.ya?ml$/i.test(fileName));

  for (const variableFile of variableFiles) {
    const relativePath = path.relative(variablesDirectory, variableFile);
    const namespaceSegments = relativePath.replace(/\.ya?ml$/i, '').split(path.sep);
    const namespace = ['variables', ...namespaceSegments].join('.');
    const entries = parseVariableFile(fs.readFileSync(variableFile, 'utf8'), variableFile);

    for (const entry of entries) {
      const variablePath = `${namespace}.${entry.key}`;
      if (entry.value.length === 0) {
        throw createParseError(variableFile, entry.lineNumber, `Data variable "${variablePath}" has an empty value.`);
      }

      const collisionPath = findNamespaceCollision(variablePath, sources.keys());
      if (collisionPath) {
        throw createParseError(
          variableFile,
          entry.lineNumber,
          `Data variable namespace "${variablePath}" collides with "${collisionPath}" from ${sources.get(collisionPath)}.`
        );
      }

      Object.defineProperty(values, variablePath, {
        configurable: false,
        enumerable: true,
        value: entry.value,
        writable: false
      });
      sources.set(variablePath, `${variableFile}:${entry.lineNumber}`);
    }
  }

  return Object.freeze(values);
}

function validateDataVariableReferences(rootDirectory, relativeDirectories, variables, contentValidator) {
  let directiveCount = 0;
  let fileCount = 0;

  for (const relativeDirectory of relativeDirectories) {
    const directoryPath = path.join(rootDirectory, relativeDirectory);
    if (!fs.existsSync(directoryPath)) {
      throw new Error(`Content directory does not exist: ${directoryPath}`);
    }

    const markdownFiles = findFiles(directoryPath, fileName => fileName.endsWith('.md'));
    for (const markdownFile of markdownFiles) {
      const content = fs.readFileSync(markdownFile, 'utf8');
      const matches = content.match(/\{%\s*data\b/g);
      const substitutedContent = matches
        ? substituteDataVariables(content, variables, markdownFile)
        : content;

      if (contentValidator) {
        contentValidator(substitutedContent, markdownFile);
      }

      if (matches) {
        directiveCount += matches.length;
        fileCount++;
      }
    }
  }

  return { directiveCount, fileCount };
}

function createBrowserDataVariablesScript(variables) {
  const serializedVariables = JSON.stringify(variables, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return [
    "'use strict';",
    '',
    `globalThis.__VSCODE_DOCS_DATA_VARIABLES__ = Object.freeze(${serializedVariables});`,
    ''
  ].join('\n');
}

module.exports = {
  createBrowserDataVariablesScript,
  loadDataVariables,
  parseVariableFile,
  substituteDataVariables,
  validateDataVariableReferences
};
