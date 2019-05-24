---
# DO NOT TOUCH — Managed by doc writer
ContentId: 2447F8EB-15F1-4279-B621-126C7B8EBF4B
DateApproved: 5/15/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Write tests for your Visual Studio Code extension (plug-in).
---

# Testing Extension

Visual Studio Code supports running and debugging tests for your extension. These tests will run inside a special instance of VS Code named the `Extension Development Host`, and have full access to the VS Code API. We refer to these tests as integration tests, because they go beyond unit tests that can run without a VS Code instance. This documentation focuses on VS Code integration tests.

## Overview

If you are using the [Yeoman Generator](https://code.visualstudio.com/api/get-started/your-first-extension) to scaffold an extension, integration tests are already setup for you. This page assumes you have read through the [Getting Started](https://code.visualstudio.com/api/get-started/your-first-extension) section and explains how the integration tests work.

You can find the setup for this guide in [helloworld-test-sample](https://github.com/microsoft/vscode-extension-samples/tree/master/helloworld-test-sample).

## Setup the test command

VS Code provides two arguments to run extension tests. For example:

```bash
code --extensionDevelopmentPath=. --extensionTestsPath=./out/test
```

Although `code` is available on the CLI, it is not available in other environments such as a Continuous Integration machine. Besides, we might want to test against a different version of VS Code. Let us first setup a script to download VS Code and run the extension test using `vscode-test`:

- `npm install --save-dev vscode-test`
- Write a test script:

```ts
import * as path from 'path';

import { runTests } from 'vscode-test';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const testRunnerPath = path.resolve(__dirname, './suite');

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionPath, testRunnerPath });
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
```

The `runTests` API provides a lot of flexibility. For example, you can specify which version of VS Code you want to download, include additional launch arguments and do custom pre-test setup with path to the VS Code executable. You can read more about the API at [https://github.com/Microsoft/vscode-test](https://github.com/Microsoft/vscode-test).

## Setup the test runner

When running the extension integration test, `--extensionTestsPath` points to a **test runner**. In this sample, we explain how to setup a test runner using [Mocha](https://mochajs.org/).

- `npm install --save-dev mocha @types/mocha glob @types/glob`
- Include this test runner file:

```ts
import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(testsRoot: string, cb: (error: any, failures?: number) => void): void {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    useColors: true
  });

  glob('**/*.test.js', { cwd: testsRoot }, (err, files) => {
    if (err) {
      return cb(err);
    }

    // Add files to the test suite
    files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

    try {
      // Run the mocha test
      mocha.run(failures => cb(null, failures));
      mocha.run(failures => {
        cb(null, failures);
      });
    } catch (err) {
      cb(err);
    }
  });
}
```

Both the test runner and the `*.test.js` files have access to VS Code API. Here is a sample test:

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
		assert.equal(-1, [1, 2, 3].indexOf(5));
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});
```

## Debugging the tests

Debugging the tests is similar to debugging the extension. Here is a sample `launch.json`:

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
        "--extensionTestsPath=${workspaceFolder}/out/test/suite"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"],
    }
  ]
}
```

<video autoplay loop muted playsinline controls>
  <source src="/api/working-with-extensions/testing-extension/debug.mp4" type="video/mp4">
</video>

## Tips

### Disabling other extensions while debugging

When you debug an extension test in VS Code, VS Code uses the globally installed instance of VS Code and will load all installed extensions. You can add `--disable-extensions` configuration to the `launch.json` or the `additionalLaunchArgs` option of `vscode-test`'s `runTests` API.

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
        "--extensionTestsPath=${workspaceFolder}/out/test/suite"
      ],
      "outFiles": ["${workspaceFolder}/out/test/**/*.js"],
    }
  ]
}
```

```ts
await runTests({
  // The folder containing the Extension Manifest package.json
  // Passed to `--extensionDevelopmentPath`
  extensionPath,
  // The path to test runner
  // Passed to --extensionTestsPath
  testRunnerPath,
  // The workspace to open on starting up VS Code
  testWorkspace,
  additionalLaunchArgs: ['--disable-extensions']
});
```

### Custom setup with `vscode-test`

Sometimes you might want to run custom setups, such as running `code --install-extension` to install another extension before starting your test. `vscode-test` has a more granular API to accommodate that case:

```ts
const vscodeExecutablePath = await downloadAndUnzipVSCode('1.34.0');
child_process.spawnSync(vscodeExecutablePath, ['--install-extension', '<PATH-TO-VSIX>']);
```

## Next steps

- [Continuous Integration](/api/working-with-extensions/continuous-integration) - Run your extension tests in a Continuous Integration service such as Azure DevOps.
