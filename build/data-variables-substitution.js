'use strict';

(function initializeDataVariableSubstitution(root, factory) {
  const api = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    return;
  }

  root.vscodeDocsDataVariables = api;
})(globalThis, function createDataVariableSubstitution() {
  const DATA_DIRECTIVE_PATTERN = /\{%\s*data\s+([^%\r\n]+?)\s*%\}/g;
  const DATA_DIRECTIVE_START_PATTERN = /\{%\s*data\b/;

  function describeSource(source) {
    return source || '<unknown source>';
  }

  function resolveDataVariable(variablePath, variables, source) {
    if (Object.prototype.hasOwnProperty.call(variables, variablePath)) {
      const value = Reflect.get(variables, variablePath);
      if (typeof value !== 'string') {
        throw new Error(`${describeSource(source)}: Data variable "${variablePath}" does not resolve to a string.`);
      }
      if (value.length === 0) {
        throw new Error(`${describeSource(source)}: Data variable "${variablePath}" resolves to an empty value.`);
      }
      return value;
    }

    const childPrefix = `${variablePath}.`;
    if (Object.keys(variables).some(key => key.startsWith(childPrefix))) {
      throw new Error(`${describeSource(source)}: Data variable "${variablePath}" resolves to an object.`);
    }

    throw new Error(`${describeSource(source)}: Missing data variable "${variablePath}".`);
  }

  function substituteDataVariables(content, variables, source) {
    if (typeof content !== 'string') {
      throw new TypeError(`${describeSource(source)}: Data variable substitution requires string content.`);
    }
    if (!variables || typeof variables !== 'object') {
      throw new TypeError(`${describeSource(source)}: Data variable substitution requires a variable map.`);
    }

    const substituted = content.replace(DATA_DIRECTIVE_PATTERN, function replaceDirective(_directive, rawPath) {
      const variablePath = rawPath.trim();
      if (!variablePath) {
        throw new Error(`${describeSource(source)}: Data variable directive has an empty path.`);
      }
      return resolveDataVariable(variablePath, variables, source);
    });

    const malformedIndex = substituted.search(DATA_DIRECTIVE_START_PATTERN);
    if (malformedIndex !== -1) {
      const lineEnd = substituted.indexOf('\n', malformedIndex);
      const snippet = substituted
        .slice(malformedIndex, lineEnd === -1 ? substituted.length : lineEnd)
        .slice(0, 120);
      throw new Error(`${describeSource(source)}: Malformed data variable directive near "${snippet}".`);
    }

    return substituted;
  }

  return {
    substituteDataVariables
  };
});
