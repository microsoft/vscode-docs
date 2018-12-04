---
Order: 12
Area: extensions
TOCTitle: Testing Extensions
ContentId: 2447F8EB-15F1-4279-B621-126C7B8EBF4B
PageTitle: Testing Visual Studio Code Extensions
DateApproved: 11/8/2018
MetaDescription: It is easy to write tests for your Visual Studio Code extension (plug-in).  The Yo Code extension generator scaffolds the necessary settings to run and debug your extension tests directly in Visual Studio Code.
---
# Testing your extension

VS Code supports running and debugging tests for your extension that require the VS Code API. These tests will run inside a special instance of VS Code, the `Extension Development Host`, and have access to the full APIs. We refer to these tests as integration tests, because they go beyond unit tests that can run in isolation from a VS Code window. This documentation focuses on VS Code integration tests. For unit testing, you can use any popular testing framework, like [Mocha](https://mochajs.org/) or [Jasmine](https://jasmine.github.io/).

## Yo Code test scaffolding

The basic [yo code generator](/docs/extensions/yocode.md) extension project includes a sample test as well as the necessary infrastructure to run it.

**Note**: The documentation below assumes that you created a TypeScript extension but the same also applies for a JavaScript extension. However, some file names may be different.

After you've created a new extension and opened the project in VS Code, you can select the `Extension Tests` configuration from the drop-down at the top of the Debug View.

![launch tests](images/testing-extensions/launch-tests.png)

With this configuration chosen, when you run `Debug: Start` (`kb(workbench.action.debug.start)`), VS Code launches your extension in the `Extension Development Host` instance and runs your tests. Test output goes to the Debug Console where you can see the test results.

![test output](images/testing-extensions/test-output.png)

The generated test uses the [Mocha test framework](https://mochajs.org/) for its test runner and library.

The extension project comes with a `src/test` folder that includes an `index.ts` file which defines the Mocha test runner configuration and an `extension.test.ts` which has the example `Something 1` test. You can typically leave `index.ts` untouched, but you can modify it to adjust the configuration of Mocha.

```
├── src
│   └── test
│       ├── extension.test.ts
│       └── index.ts
```

You can create more `test.ts` files under the `test` folder and they will automatically be built (to `out/test`) and run. The test runner will only consider files matching the name pattern `*.test.ts`.

## Launch tests configuration

The `Extension Tests` configuration is defined in the project's `.vscode\launch.json` file.  It is similar the `Extension` configuration with the addition of the `--extensionTestsPath` argument which points to the compiled test files (assuming this is a TypeScript project).

```json
{
    "name": "Extension Tests",
    "type": "extensionHost",
    "request": "launch",
    "runtimeExecutable": "${execPath}",
    "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test"
    ],
    "outFiles": [
        "${workspaceFolder}/out/test/**/*.js"
    ]
}
```

## Passing arguments to the Extension Development Host

You can set the file or folder that the test instance should open by inserting the path at the front of the argument list for the launch configuration.

```json
"args": [
    "file or folder name",
    "--extensionDevelopmentPath=${workspaceFolder}",
    "--extensionTestsPath=${workspaceFolder}/out/test"
]
```

This way you can run your tests with predictable content and folder structure.

## Disabling other extensions

By default, the debug instance of VS Code will load any extension you've previously installed alongside the one you are developing. If you want to disable those extensions, add `"--disable-extensions"` to the argument list in the launch configuration.

```json
"args": [
    "--disable-extensions",
    "--extensionDevelopmentPath=${workspaceFolder}",
    "--extensionTestsPath=${workspaceFolder}/out/test"
]
```

This will give large benefits to performance when running tests

## Excluding test files from your extension package

If you decide to share your extension, you may not want to include the tests in your extension package.  The [`.vscodeignore`](/docs/extensions/publish-extension.md#advance-usage) file lets you exclude test files when you package and publish your extension with the [`vsce` publishing tool](/docs/extensions/publish-extension.md).  By default, the `yo code` generated extension project excludes the `test` and `out/test` folders.

```
out/test/**
```

## Continuous Integration

Extension tests can be run on CI services. The `vscode` npm module provides a built-in command (`bin/test`) which:

1. Downloads and unzips VS Code;
2. Launches your extension tests inside VS Code;
3. Prints the results to the console and exits with an appropriate status code.

The command will expose some optional environment variables, which you can use to customize the build:

| Name        | Description       |
| ------------|-------------------|
| `CODE_VERSION` | Version of VS Code to run the tests against (e.g. `0.10.10`) |
| `CODE_DOWNLOAD_URL` | Full URL of a VS Code drop to use for running tests against |
| `CODE_TESTS_PATH` | Location of the tests to execute (default is `process.cwd()/out/test` or `process.cwd()/test`) |
| `CODE_EXTENSIONS_PATH` | Location of the extensions to load (default is `process.cwd()`) |
| `CODE_TESTS_WORKSPACE` | Location of a workspace to open for the test instance (default is CODE_TESTS_PATH) |

### Azure Pipelines

<a href="https://azure.microsoft.com/services/devops/"><img alt="Azure Pipelines" src="/assets/docs/extensions/testing-extensions/pipelines-logo.png" width="318" /></a>

You can create free projects on [Azure DevOps](https://azure.microsoft.com/services/devops/). This gives you source code hosting, planning boards, building and testing infrastructure, and more. On top of that, you get [10 free parallel jobs](https://azure.microsoft.com/services/devops/pipelines/) for building your projects across all 3 major platforms: Windows, macOS and Linux.

After registering and creating your new project, simply add the following `.azure-pipelines.yml` to the root of your extension's repository:

```yaml
jobs:
- job: Windows
  pool:
    vmImage: 'vs2017-win2016'

  steps:
  - task: NodeTool@0
    displayName: 'Use Node 8.x'
    inputs:
      versionSpec: 8.x

  - task: Npm@1
    displayName: 'Install dependencies'
    inputs:
      verbose: false

  - task: Npm@1
    displayName: 'Compile sources'
    inputs:
      command: custom
      verbose: false
      customCommand: 'run compile'

  - script: 'node node_modules/vscode/bin/test'
    displayName: 'Run tests'

- job: macOS
  pool:
    vmImage: 'macOS-10.13'

  steps:
  - task: NodeTool@0
    displayName: 'Use Node 8.x'
    inputs:
      versionSpec: 8.x

  - task: Npm@1
    displayName: 'Install dependencies'
    inputs:
      verbose: false

  - task: Npm@1
    displayName: 'Compile sources'
    inputs:
      command: custom
      verbose: false
      customCommand: 'run compile'

  - script: 'node node_modules/vscode/bin/test'
    displayName: 'Run tests'

- job: Linux
  pool:
    vmImage: 'ubuntu-16.04'

  steps:
  - task: NodeTool@0
    displayName: 'Use Node 8.x'
    inputs:
      versionSpec: 8.x

  - task: Npm@1
    displayName: 'Install dependencies'
    inputs:
      verbose: false

  - task: Npm@1
    displayName: 'Compile sources'
    inputs:
      command: custom
      verbose: false
      customCommand: 'run compile'

  - script: |
      set -e
      /usr/bin/Xvfb :10 -ac >> /tmp/Xvfb.out 2>&1 &
      disown -ar
    displayName: 'Start xvfb'

  - script: 'node node_modules/vscode/bin/test'
    displayName: 'Run tests'
    env:
      DISPLAY: :10
```

Next [create a new Pipeline](https://docs.microsoft.com/azure/devops/pipelines/get-started-yaml?view=vsts#get-your-first-build) in your DevOps project and point it to the `.azure-pipelines.yml` file. Trigger a build and voilá:

![pipelines](images/testing-extensions/pipelines.png)

You can enable the build to run continuously when pushing to a branch and even on pull requests. [Click here](https://docs.microsoft.com/azure/devops/pipelines/build/triggers) to learn more.

## Next steps

* [Developing Extensions](/docs/extensions/developing-extensions.md) - Learn more about how to run and debug your extension.
* [vsce](/docs/extensions/publish-extension.md) - Publish your extension with the VSCE command line tool.
* [Extension Manifest file](/docs/extensionAPI/extension-manifest.md) - VS Code extension manifest file reference
* [Extension API](/docs/extensionAPI/overview.md) - Learn about the VS Code extensibility APIs
