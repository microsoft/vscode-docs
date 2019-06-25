---
# DO NOT TOUCH — Managed by doc writer
ContentId: 2447F8EB-15F1-4279-B621-126C7B8EBF4B
DateApproved: 6/5/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Write tests for your Visual Studio Code extension (plug-in).
---

# Testing Extension

Visual Studio Code supports running and debugging tests for your extension. These tests will run inside a special instance of VS Code named the **Extension Development Host**, and have full access to the VS Code API. We refer to these tests as integration tests, because they go beyond unit tests that can run without a VS Code instance. This documentation focuses on VS Code integration tests.

## Overview

*If you are migrating from `vscode`, see [migrating from `vscode`](#migrating-from-vscode)*.

If you are using the [Yeoman Generator](https://code.visualstudio.com/api/get-started/your-first-extension) to scaffold an extension, integration tests are already created for you.

In the generated extension, you can use `npm run test` or `yarn test` to run the integration tests that:

- Downloads and unzips latest version of VS Code.
- Runs the [Mocha](https://mochajs.org) tests specified by the extension test runner script.

Alternatively, you can find the configuration for this guide in the [helloworld-test-sample](https://github.com/microsoft/vscode-extension-samples/tree/master/helloworld-test-sample). The rest of this document explains these files in the context of the sample:

- The **test script** ([`src/test/runTest.ts`](https://github.com/microsoft/vscode-extension-samples/blob/master/helloworld-test-sample/src/test/runTest.ts))
- The **test runner script** ([`src/test/suite/index.ts`](https://github.com/microsoft/vscode-extension-samples/blob/master/helloworld-test-sample/src/test/suite/index.ts))

## The test script

VS Code provides two CLI parameters for running extension tests, `--extensionDevelopmentPath` and `--extensionTestsPath`.

For example:

```bash
# - Launches VS Code Extension Host
# - Loads the extension at <EXTENSION-ROOT-PATH>
# - Executes the test runner script at <TEST-RUNNER-PATH>
code \
--extensionDevelopmentPath=<EXTENSION-ROOT-PATH> \
--extensionTestsPath=<TEST-RUNNER-SCRIPT-PATH>
```

The **test script** ([`src/test/runTest.ts`](https://github.com/microsoft/vscode-extension-samples/blob/master/helloworld-test-sample/src/test/runTest.ts)) uses the `vscode-test` API to simplify the process of downloading, unzipping, and launching VS Code with extension test parameters.

The `vscode-test` API also allows:

- Launching VS Code with a specific workspace.
- Downloading a different version of VS Code than the latest.
- Launching VS Code with additional CLI parameters.

```ts
import * as path from 'path';

import { runTests } from 'vscode-test';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to the extension test script
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite');

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionDevelopmentPath, extensionTestsPath });
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
```

You can find more API usage examples at [microsoft/vscode-test](https://github.com/microsoft/vscode-test).

## The test runner script

When running the extension integration test, `--extensionTestsPath` points to the **test runner** ([`src/test/suite/index.ts`](https://github.com/microsoft/vscode-extension-samples/blob/master/helloworld-test-sample/src/test/suite/index.ts)) that programmatically runs the test suite.

```ts
import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(testsRoot: string, cb: (error: any, failures?: number) => void): void {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd'
  });
  // Use any mocha API
  mocha.useColors(true);

  glob('**/*.test.js', { cwd: testsRoot }, (err, files) => {
    if (err) {
      return cb(err);
    }

    // Add files to the test suite
    files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

    try {
      // Run the mocha test
      mocha.run(failures => cb(null, failures));
    } catch (err) {
      cb(err);
    }
  });
}
```

Both the test runner script and the `*.test.js` files have access to the VS Code API.

Here is a sample test ([src/test/suite/extension.test.ts](https://github.com/microsoft/vscode-extension-samples/blob/master/helloworld-test-sample/src/test/suite/extension.test.ts)):

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
  extensionDevelopmentPath,
  extensionTestsPath,
  // Additional CLI parameters for launching `code`.
  // Use `code --help` to find all CLI parameters
  additionalLaunchArgs: ['--disable-extensions']
});
```

### Custom setup with `vscode-test`

Sometimes you might want to run custom setups, such as running `code --install-extension` to install another extension before starting your test. `vscode-test` has a more granular API to accommodate that case:

```ts
const vscodeExecutablePath = await downloadAndUnzipVSCode('1.34.0');
// Custom setup
child_process.spawnSync(vscodeExecutablePath, ['--install-extension', '<PATH-TO-VSIX>']);
await runTests({
  // Use the specified `code` executable instead of downloading
  vscodeExecutablePath,
  extensionPath,
  testRunnerPath
})
```

### Migrating from `vscode`

The [`vscode`](https://github.com/Microsoft/vscode-extension-vscode) module had been the default way of running extension integration tests and is being superseded by [`vscode-test`](https://github.com/microsoft/vscode-test). Here's how you can migrate from it:

- Remove `vscode` dependency and add `vscode-test` dependency.
- As the old `vscode` module was also used for downloading VS Code type definition, you need to
    - Manually install `@types/vscode` that follows your `engine.vscode` in `package.json`. For example, if your `engine.vscode` is `1.30`, install `@types/vscode@1.30`.
    - Remove `"postinstall": "node ./node_modules/vscode/bin/install"` from `package.json`.
- Add a [test script](#the-test-script). You can use [`runTest.ts`](https://github.com/microsoft/vscode-extension-samples/blob/master/helloworld-test-sample/src/test/runTest.ts) in the sample as a starting point.
- Point the `test` script in `package.json` to run the compiled output of `runTest.ts`.
- Add a [test runner script](#the-test-runner-script). You can use the [sample test runner script](https://github.com/microsoft/vscode-extension-samples/blob/master/helloworld-test-sample/src/test/suite/index.ts) as a starting point. Notice that `vscode` used to depend on `mocha@4` and `glob`, and now you need to install them as part of your `devDependency`.

## Next steps

- [Continuous Integration](/api/working-with-extensions/continuous-integration) - Run your extension tests in a Continuous Integration service such as Azure DevOps.