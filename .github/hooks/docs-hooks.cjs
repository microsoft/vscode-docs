'use strict';

const fs = require('node:fs');

const editTools = new Set(['create', 'edit', 'str_replace_editor', 'apply_patch']);

function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function patchEdits(patch) {
  if (typeof patch !== 'string' || !/^\*\*\* Begin Patch\r?\n/.test(patch) || !patch.trimEnd().endsWith('*** End Patch')) {
    throw new Error('Expected an apply_patch input with Begin Patch and End Patch markers.');
  }
  const edits = [];
  let current;
  for (const line of patch.split(/\r?\n/)) {
    const file = /^\*\*\* (?:Update|Add|Delete) File: (.+)$/.exec(line);
    const move = /^\*\*\* Move to: (.+)$/.exec(line);
    if (file) {
      current = { path: file[1], text: '' };
      edits.push(current);
    } else if (move && current) {
      current.path = move[1];
    } else if (line.startsWith('+') && current) {
      current.text += `${line.slice(1)}\n`;
    }
  }
  if (edits.length === 0) {
    throw new Error('No file operations found in apply_patch input.');
  }
  return edits;
}

function structuredEdits(name, input) {
  const path = input.path;
  const creating = name === 'create' || (name === 'str_replace_editor' && input.command === 'create');
  const text = creating ? input.file_text : input.new_str;
  if (typeof path !== 'string' || !path || typeof text !== 'string') {
    throw new Error('Unsupported edit arguments. Expected a file path and replacement or file content.');
  }
  return [{ path, text }];
}

function runHook(phase, event) {
  if (phase !== 'preToolUse' && phase !== 'postToolUse') {
    throw new Error('Expected preToolUse or postToolUse as the command argument.');
  }
  if (!object(event)) {
    throw new Error('Expected a JSON hook event object.');
  }

  const name = event.toolName;
  if (typeof name !== 'string' || !name) {
    throw new Error('Expected a Copilot toolName.');
  }
  if (!editTools.has(name)) {
    return {};
  }

  let input = event.toolArgs;
  if (typeof input === 'string') {
    input = name === 'apply_patch' ? { input } : JSON.parse(input);
  }
  if (!object(input)) {
    throw new Error(`Expected tool arguments for ${name}.`);
  }
  if (name === 'str_replace_editor' && input.command === 'view') {
    return {};
  }
  const edits = name === 'apply_patch'
    ? patchEdits(input.input ?? input.patch)
    : structuredEdits(name, input);

  if (phase === 'preToolUse') {
    const invalid = edits.some(edit => /\.md$/i.test(edit.path) && /[\u2013\u2014]/u.test(edit.text));
    if (!invalid) {
      return {};
    }
    return {
      permissionDecision: 'deny',
      permissionDecisionReason: 'Markdown edits must not add en dash or em dash characters. Use commas or separate sentences.'
    };
  }

  if (!edits.some(edit => /(^|[\\/])docs[\\/]/i.test(edit.path))) {
    return {};
  }
  return {
    additionalContext: 'Review the edited documentation against .github/instructions/docs-writing.instructions.md and correct any style issues.'
  };
}

if (require.main === module) {
  try {
    const event = JSON.parse(fs.readFileSync(0, 'utf8'));
    process.stdout.write(JSON.stringify(runHook(process.argv[2], event)));
  } catch (error) {
    console.error(`Docs hook failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}

module.exports = { runHook };
