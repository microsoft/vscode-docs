---
Order: 8
Area: editor
TOCTitle: Testing
ContentId: d44f1a5c-5454-4037-92d5-c2bf5d4cffed
PageTitle: Testing in Visual Studio Code
DateApproved: 05/02/2024
MetaDescription: One of the great things in Visual Studio Code is testing support. Automatically discover tests in your project, run and debug your tests, and get test coverage results.
---
# Testing

Software testing is a crucial aspect of the software development process. It helps ensure that your code works as expected and catches bugs early in the development cycle. Visual Studio Code provides a rich set of features for testing your code. You can automatically discover tests in your project, run and debug your tests, and get test coverage results.

In this article, you'll learn how to get started with testing in VS Code, discover popular testing extensions, and explore the testing capabilities.

![Testing in Visual Studio Code](images/testing/testing-hero.png)

## Getting started with testing in VS Code

Testing support in VS Code is language-specific and depends on the [extensions](#testing-extensions) you have installed. The testing features are provided by the language extensions, which can be language servers, test runners, or other tools that support testing in that language. To get started with testing in VS Code, first install the appropriate language extension for your project.

Once you have the language extension installed, you can start discovering and running tests in your project. The [Test Explorer](#automatic-test-discovery-in-test-explorer) view in VS Code helps you discover and run tests in your workspace.

After you run your tests, you can view the test results in the Test Explorer view, editor gutter, and Test Results panel. To diagnose issues with your tests, you can also [run and debug tests](#run-and-debug-tests) and set breakpoints in your test and application code.

You can also [run tests with coverage](#test-coverage) to see how much of your code is covered by your tests. Test coverage helps you identify areas of your code that are not being tested and ensures that your tests are comprehensive. You can view the test coverage results in different views in the editor and Test Coverage panel.

To optimize your testing workflow, you can [create tasks to run your tests](#task-integration), and optionally run your tests in the background with every code change.

## Testing extensions

You can find extensions that support testing by looking in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Testing&sortBy=Installs). You can also go to the Extensions view (`kb(workbench.view.extensions)`), and filter by the **Testing** category. You can then sort by **Install count** or ratings to see which extensions are popular.

<!-- <div class="marketplace-extensions-testing"></div> -->

> **Tip**: The extensions shown above are dynamically queried. Select an extension tile above to read the description and reviews to decide which extension is best for you.

## Automatic test discovery in Test Explorer

- Test Explorer view discovers and lists tests in workspace
- Tree view
- Filtering
- View test result status
- Click-through to test code

## Run and debug tests

- Running & debugging
    - Use Test Explorer
    - Use Commands
    - Use controls in the editor gutter

- View test results
    - Test results are visually presented in the Test Explorer view and editor (gutter)
    - Test Results panel

## Test coverage

- Run tests with coverage
- Test Coverage panel
- View coverage in editor
- View coverage in Explorer view
- Also shown in diff editor

## Task integration

- Create task to run tests (Test: Run test), optionally create keyboard shortcut
- Configure to run in background

Learn more about [using and configuring Tasks](/docs/editor/tasks.md).

## Test configuration settings

- Configure `testing.xxx` for general testing settings
- Add table of settings

## Next steps

- Get started with testing in Python, Java, C#
