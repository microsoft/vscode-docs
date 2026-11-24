'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

/* eslint-disable security/detect-non-literal-fs-filename -- Only the selected VS Code installation and caller-guarded file paths are read. */

const execute = promisify(execFile);

async function createEditor({ executable = process.execPath, run = execute } = {}) {
  let cli;
  let error;
  try {
    if (process.platform !== 'win32' || !['Code.exe', 'Code - Insiders.exe'].includes(path.basename(executable))) {
      throw new Error('Native editor opening requires this extension to run in Windows VS Code. Open the displayed file paths manually in other hosts.');
    }
    const installation = path.dirname(executable);
    const command = path.join(installation, 'bin', path.basename(executable) === 'Code.exe' ? 'code.cmd' : 'code-insiders.cmd');
    const script = await fs.readFile(command, 'utf8');
    // Use the installed launcher's exact CLI path, including versioned Windows layouts.
    const match = /"%~dp0\.\.\\(resources\\app\\out\\cli\.js|[a-f0-9]{10}\\resources\\app\\out\\cli\.js)"/i.exec(script);
    if (!match) throw new Error('The installed VS Code CLI layout is unsupported. Open the displayed file paths manually.');
    cli = path.join(installation, match[1]);
    if (!(await fs.stat(cli)).isFile()) throw new Error('The installed VS Code CLI is unavailable.');
  } catch (failure) { error = failure.message; }
  async function launch(args) {
    if (error) throw new Error(error);
    return run(executable, [cli, ...args], {
      env: { ...process.env, ELECTRON_RUN_AS_NODE: '1', VSCODE_DEV: '' },
      windowsHide: true, timeout: 15_000, maxBuffer: 128_000
    });
  }
  return {
    available: !error, message: error,
    async open({ file, line = 1, before }) {
      if (error) throw new Error(error);
      if (![file, ...(before ? [before] : [])].every(value => typeof value === 'string' && path.isAbsolute(value) && !/[\r\n\0]/.test(value)) ||
          !Number.isSafeInteger(line) || line < 1) throw new Error('Invalid editor file or source line.');
      const args = before ? ['--diff', before, file] : ['--goto', `${file}:${line}`];
      await launch(['--reuse-window', ...args]);
      return { opened: true, file, ...(before ? { before, comparison: 'Captured draft baseline against the current editor file.' } : { line }) };
    },
    async chat({ files, prompt }) {
      if (!Array.isArray(files) || !files.length || files.length > 4 ||
          files.some(file => typeof file !== 'string' || !path.isAbsolute(file) || /[\r\n\0]/.test(file)) ||
          typeof prompt !== 'string' || !prompt.trim() || prompt.length > 12000 || prompt.includes('\0')) {
        throw new Error('Invalid chat request.');
      }
      const help = await launch(['chat', '--help']);
      if (!help.stdout?.includes('--add-file') || !help.stdout.includes('--mode')) {
        throw new Error('This VS Code installation does not expose the required native chat launcher.');
      }
      await launch(['chat', '--reuse-window', '--mode', 'agent', ...files.flatMap(file => ['--add-file', file]), prompt]);
      return { requested: true, message: "Sent the request to VS Code Chat. Continue there; this canvas does not track that chat's completion." };
    }
  };
}

module.exports = { createEditor };
