'use strict';

const fs = require('fs');
const path = require('path');

/* eslint-disable security/detect-non-literal-fs-filename -- Paths are constrained to the repository root. */

function isWithinRoot(rootDirectory, filePath) {
  const relativePath = path.relative(rootDirectory, filePath);
  return relativePath !== '..' && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath);
}

function collectMarkdownFiles(rootDirectory, paths) {
  const resolvedRoot = fs.realpathSync(rootDirectory);
  const files = new Set();

  function visit(targetPath) {
    const resolvedPath = fs.realpathSync(targetPath);
    if (!isWithinRoot(resolvedRoot, resolvedPath)) {
      throw new Error(`Path is outside the repository: ${targetPath}`);
    }

    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(resolvedPath, { withFileTypes: true })
        .sort((left, right) => left.name.localeCompare(right.name))) {
        if (entry.isDirectory()) {
          visit(path.join(resolvedPath, entry.name));
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          files.add(path.join(resolvedPath, entry.name));
        }
      }
    } else if (stat.isFile() && resolvedPath.endsWith('.md')) {
      files.add(resolvedPath);
    } else {
      throw new Error(`Expected a Markdown file or directory: ${targetPath}`);
    }
  }

  for (const item of paths) {
    visit(path.resolve(resolvedRoot, item));
  }

  return [...files].sort((left, right) => left.localeCompare(right));
}

module.exports = { collectMarkdownFiles, isWithinRoot };
