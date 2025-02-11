---
Order: 7
Area: copilot
TOCTitle: Testing with Copilot
ContentId: 9f84b21e-5b76-4c3a-a5dd-2021ab343f1f
PageTitle: Testing with GitHub Copilot in Visual Studio Code
DateApproved: 02/06/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to write, debug, and fix tests.
---

# Testing with GitHub Copilot

Writing and maintaining tests is a crucial but often time-consuming part of software development. GitHub Copilot streamlines this process by helping you write, debug, and fix tests more efficiently in Visual Studio Code. With Copilot's AI-powered assistance, you can:

* **Generate test code**: Quickly create unit tests, integration tests, and end-to-end tests that cover your application code
* **Set up testing frameworks**: Get help configuring the right testing framework for your project and language
* **Fix failing tests**: Receive intelligent suggestions for fixing test failures
* **Handle edge cases**: Generate comprehensive test suites that cover edge cases and error conditions
* **Maintain consistency**: Generate tests that follow your project's coding standards and patterns

This article shows you how to leverage Copilot's testing capabilities to improve your testing workflow and increase test coverage in your projects.

> [!NOTE]
> To use Copilot's testing features, you need an active GitHub Copilot subscription. If you don't have one, you can start with the [Copilot Free plan](https://github.com/github-copilot/signup).

## Setting up your testing framework

You can use Copilot to help set up the testing framework for your project:

1. Open the Chat view (`kb(workbench.action.chat.open)`)
2. Enter the `/setupTests` command
3. Follow Copilot's guidance to configure your project

Copilot will suggest appropriate testing frameworks based on your project type and help you with the installation and configuration steps.

## Writing tests with Copilot

There are two main ways to generate tests using Copilot:

### Using editor smart actions

1. Open your application code file
2. Optionally select the code you want to test
3. Right-click and select **Copilot** > **Generate Tests**

### Using Chat prompts

1. Open your application code file
2. Open one of these views:
   - Copilot Edits (`kb(workbench.action.chat.openEditSession)`)
   - Chat view (`kb(workbench.action.chat.open)`)
   - Inline Chat (`kb(inlineChat.start)`)
3. Enter a prompt like:
   - "Generate tests for this code"
   - "Write unit tests including edge cases"
   - "Create integration tests for this module"

> [!TIP]
> Add `#file` to your prompt to reference specific files. For example: "Generate tests for this code #file:calculator.js"

## Fixing failing tests

When you have failing tests, Copilot can help you fix them:

1. In the Test Explorer, hover over a failing test
2. Select the **Fix Test Failure** button (sparkle icon)
3. Review and apply Copilot's suggested fix

Alternatively, you can:
1. Open the Chat view
2. Enter the `/fixTestFailure` command
3. Follow Copilot's suggestions to fix the test

## Tips for better test generation

- Provide context in your prompts about the testing framework you prefer
- Specify if you want particular types of tests (unit, integration, end-to-end)
- Ask for specific test cases or edge cases
- Request tests that follow your project's coding standards

## Customizing test generation

You can customize how Copilot generates tests by providing [special instructions](/docs/copilot/copilot-customization.md). For example:

- Specify preferred testing frameworks
- Define naming conventions for tests
- Set code structure preferences
- Request specific test patterns or methodologies

## Next steps

- Learn more about [Copilot in VS Code](/docs/copilot/overview.md)
- Explore [general testing features in VS Code](/docs/editor/testing.md)
- Check out example prompts for [generating unit tests](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat/testing-code/generate-unit-tests)
