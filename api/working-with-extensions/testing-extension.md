---
# DO NOT TOUCH — Managed by doc writer
ContentId: 2447F8EB-15F1-4279-B621-126C7B8EBF4B
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Write tests for your Visual Studio Code extension (plug-in).
---

# Testing Extensions

Visual Studio Code supports running and debugging tests for your extension. These tests will run inside a special instance of VS Code named the **Extension Development Host**, and have full access to the VS Code API. We refer to these tests as integration tests, because they go beyond unit tests that can run without a VS Code instance. This documentation focuses on VS Code integration tests.

## Overview

_If you are migrating from `vscode`, see [migrating from `vscode`](#migrating-from-vscode)_.

If you are using the [Yeoman Generator](https://code.visualstudio.com/api/get-started/your-first-extension) to scaffold an extension, integration tests are already created for you.

In the generated extension, you can use `npm run test` or `yarn test` to run the integration tests that:

- Downloads and unzips latest version of VS Code.
- Runs the [Mocha](https://mochajs.org) tests specified by the extension test runner script.

Alternatively, you can find the configuration for this guide in the [helloworld-test-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-test-sample). The rest of this document explains these files in the context of the sample:

- The **test script** ([`src/test/runTest.ts`](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/runTest.ts))
- The **test runner script** ([`src/test/suite/index.ts`](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/suite/index.ts))

## The test script

VS Code provides two CLI parameters for running extension tests, `--extensionDevelopmentPath` and `--extensionTestsPath`.

For example:

```bash
# - Launches VS Code Extension Host
# - Loads the extension at <EXTENSION-ROOT-PATH>
# - Executes the test runner script at <TEST-RUNNER-SCRIPT-PATH>
code \
--extensionDevelopmentPath=<EXTENSION-ROOT-PATH> \
--extensionTestsPath=<TEST-RUNNER-SCRIPT-PATH>
```

The **test script** ([`src/test/runTest.ts`](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/runTest.ts)) uses the `@vscode/test-electron` API to simplify the process of downloading, unzipping, and launching VS Code with extension test parameters:

```ts
import * as path from 'path';

import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // The path to the extension test runner script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error(err);
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
```

The `@vscode/test-electron` API also allows:

- Launching VS Code with a specific workspace.
- Downloading a different version of VS Code rather than the latest stable release.
- Launching VS Code with additional CLI parameters.

You can find more API usage examples at [microsoft/vscode-test](https://github.com/microsoft/vscode-test).

## The test runner script

When running the extension integration test, `--extensionTestsPath` points to the **test runner script** ([`src/test/suite/index.ts`](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/suite/index.ts)) that programmatically runs the test suite. Below is the [test runner script](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/suite/index.ts) of `helloworld-test-sample` that uses Mocha to run the test suite. You can use this as a starting point and customize your setup with [Mocha's API](https://mochajs.org/api/mocha). You can also replace Mocha with any other test framework that can be run programmatically.

```ts
import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err);
      }

      // Add files to the test suite
      files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run(failures => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed.`));
          } else {
            c();
          }
        });
      } catch (err) {
        e(err);
      }
    });
  });
}
```

Both the test runner script and the `*.test.js` files have access to the VS Code API.

Here is a sample test ([src/test/suite/extension.test.ts](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/suite/extension.test.ts)):

```ts
import * as assert from 'assert';
import { after } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
  after(() => {
    vscode.window.showInformationMessage('All tests done!');
  });

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});
```

## Debugging the tests

Debugging the tests is similar to debugging the extension.

Here is a sample `launch.json` debugger configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Extension Tests",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
    }
  ]
}
```

<video autoplay loop muted playsinline controls>
  <source src="/api/working-with-extensions/testing-extension/debug.mp4" type="video/mp4">
</video>

## Tips

### Using Insiders version for extension development

Because of VS Code's limitation, if you are using VS Code stable release and try to run the integration test **on CLI**, it will throw an error:

```
Running extension tests from the command line is currently only supported if no other instance of Code is running.
```

In general if you run extension tests from CLI, the version the tests run with cannot be running already. As a workaround, you can run the tests
in VS Code Stable and use [VS Code Insiders](https://code.visualstudio.com/insiders/) for development. As long as you are not running the tests
from CLI in VS Code Insiders but in VS Code Stable, this setup will work fine.

An alternative is to run the extension tests from the debug launch configuration from within VS Code itself. This has the additional advantage
that you can even debug the tests.

### Disabling other extensions while debugging

When you debug an extension test in VS Code, VS Code uses the globally installed instance of VS Code and will load all installed extensions. You can add `--disable-extensions` configuration to the `launch.json` or the `launchArgs` option of `@vscode/test-electron`'s `runTests` API.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Extension Tests",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--disable-extensions",
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test/suite/index"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"]
    }
  ]
}
```

```ts
await runTests({
  extensionDevelopmentPath,
  extensionTestsPath,
  /**
   * A list of launch arguments passed to VS Code executable, in addition to `--extensionDevelopmentPath`
   * and `--extensionTestsPath` which are provided by `extensionDevelopmentPath` and `extensionTestsPath`
   * options.
   *
   * If the first argument is a path to a file/folder/workspace, the launched VS Code instance
   * will open it.
   *
   * See `code --help` for possible arguments.
   */
  launchArgs: ['--disable-extensions']
});
```

### Custom setup with `@vscode/test-electron`

Sometimes you might want to run custom setups, such as running `code --install-extension` to install another extension before starting your test. `@vscode/test-electron` has a more granular API to accommodate that case:

```ts
import * as cp from 'child_process';
import * as path from 'path';
import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests
} from '@vscode/test-electron';

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../../');
    const extensionTestsPath = path.resolve(__dirname, './suite/index');
    const vscodeExecutablePath = await downloadAndUnzipVSCode('1.40.1');
    const [cliPath, ...args] = resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath);

    // Use cp.spawn / cp.exec for custom setup
    cp.spawnSync(cliPath, [...args, '--install-extension', '<EXTENSION-ID-OR-PATH-TO-VSIX>'], {
      encoding: 'utf-8',
      stdio: 'inherit'
    });

    // Run the extension test
    await runTests({
      // Use the specified `code` executable
      vscodeExecutablePath,
      extensionDevelopmentPath,
      extensionTestsPath
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
```

### Migrating from `vscode`

The [`vscode`](https://github.com/microsoft/vscode-extension-vscode) module had been the default way of running extension integration tests and is being superseded by [`@vscode/test-electron`](https://github.com/microsoft/vscode-test). Here's how you can migrate from it:

- Remove `vscode` dependency.
- Add `@vscode/test-electron` dependency.
- As the old `vscode` module was also used for downloading VS Code type definition, you need to
  - Manually install `@types/vscode` that follows your `engines.vscode` in `package.json`. For example, if your `engines.vscode` is `1.30`, install `"@types/vscode": "^1.30.0"`.
  - Remove `"postinstall": "node ./node_modules/vscode/bin/install"` from `package.json`.
- Add a [test script](#the-test-script). You can use [`runTest.ts`](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/runTest.ts) in the sample as a starting point.
- Point the `test` script in `package.json` to run the compiled output of `runTest.ts`.
- Add a [test runner script](#the-test-runner-script). You can use the [sample test runner script](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-test-sample/src/test/suite/index.ts) as a starting point. Notice that `vscode` used to depend on `mocha@4` and `glob`, and now you need to install them as part of your `devDependencies`.

## Next steps

- [Continuous Integration](/api/working-with-extensions/continuous-integration) - Run your extension tests in a Continuous Integration service such as Azure DevOps.
