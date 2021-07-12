---
# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Testing APIs in VS Code allow users to discover and run unit tests in their workspace
---

# Testing API

The Testing API allows Visual Studio Code extensions to discover tests in the workspace and publish results. Users can execute tests in the Test Explorer view, from decorations, and inside commands. With these new APIs, Visual Studio Code supports richer displays of outputs and diffs than was previously possible.

> **Note**: The Testing API is still proposed and under development, which means it is only available on VS Code [Insiders](/insiders) and requires adding `vscode.proposed.d.ts` to your extension project. You can learn more in [Using Proposed APIs](/api/advanced-topics/using-proposed-api).

## Examples

There are two test providers maintained by the VS Code team:

- The [sample test provider](https://github.com/microsoft/vscode-extension-samples/tree/main/test-provider-sample) that provides tests in Markdown files.
- The [selfhost test provider](https://github.com/microsoft/vscode-selfhost-test-provider) that we use for running tests in VS Code itself.

## Discovering Tests

The foundation of the test API is the `TestItem` interface. This interface describes a test case, suite, or tree item as it exists in code. It must have a unique `id` and can have `children`, descriptive information, and indicate whether it's `runnable` or `debuggable`.

`TestItem`s are provided by `TestProviders`, either for a workspace or document. Providing happens lazily: VS Code will request tests for a document when it becomes visible, and may eventually request workspace tests if the user opens the test explorer, for example.

The provider's methods return a `TestHierarchy` of these test items. There's a `root`, and a change event to tell VS Code when items update. Additionally, a promise can be returned to indicate when all the tests have been discovered, and you can emit events to indicate when results for existing tests might need to be invalidated. The invalidation logic drives the autorun scenario (to rerun tests that change) and also has a small UI effect.

## Test Results

As you implement a `TestProvider`, you will notice the `runTests` method. This method is called to execute tests, and takes the list of tests to run, exclude, and a flag indicating whether the run should be debugged. To update the state of a `TestItem`, you can call the `setState` method on the `TestRun` option passed into the method.

The state of tests is stored separately from the `TestItem`s, and correlated by their `id`. This separation provides several advantages that a closer coupling would lose:

- There can be multiple independent test runs happening at a time.
- Users can open and inspect past test results, even if the tests on disk might have moved or no longer exist.

The state displayed for any `TestItem` in the explorer or decorations is its state in the most recent test run in which it was involved.

### Publishing Test Results

**If you implement a TestProvider**, you should use the `setState` method on the `TestRun` object to update the state of tests in that specific run.

In other scenarios, extensions may be able to detect if the user runs tests outside of VS Code. For example, you might intercept output from the terminal, or notice that a new `TestResults` file appeared on disk. When this happens, you can use the `vscode.test.publishTestResults` method to add new test results into VS Code.
