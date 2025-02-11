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

Writing and maintaining tests is a crucial but often time-consuming part of software development. GitHub Copilot streamlines this process by helping you write, debug, and fix tests more efficiently in Visual Studio Code. This article shows you how to leverage Copilot's testing capabilities to improve your testing workflow and increase test coverage in your projects.

Copilot can help with the following testing tasks:

* **Generate test code**: create unit tests, integration tests, and end-to-end tests that cover your application code.
* **Set up testing frameworks**: get help configuring the right testing framework and VS Code extensions for your project and language.
* **Fix failing tests**: receive suggestions for fixing test failures.
* **Handle edge cases**: generate comprehensive test suites to cover edge cases and error conditions.
* **Maintain consistency**: generate tests that follow your project's coding standards and patterns.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Set up your testing framework

You can use Copilot to help set up the testing framework and VS Code extensions for your project:

1. Open the Chat view (`kb(workbench.action.chat.open)`).
2. Enter the `/setupTests` command in the chat input field.
3. Follow Copilot's guidance to configure your project.

Copilot will suggest appropriate testing frameworks based on your project type and help you with the installation and configuration steps.

## Write tests with Copilot

There are two main ways to generate tests using Copilot:

### Use editor smart actions

1. Open your application code file.
1. Optionally select the code you want to test.
1. Right-click and select **Copilot** > **Generate Tests**.

### Use chat prompts

1. Open your application code file.

1. Open one of these views:
   * Copilot Edits (`kb(workbench.action.chat.openEditSession)`)
   * Chat view (`kb(workbench.action.chat.open)`)
   * Inline Chat (`kb(inlineChat.start)`)

1. Enter a prompt like:
   * "Generate tests for this code"
   * "Write unit tests including edge cases"
   * "Create integration tests for this module"

Get more guidance about [using GitHub Copilot for writing tests](https://docs.github.com/en/copilot/using-github-copilot/guides-on-using-github-copilot/writing-tests-with-github-copilot) in the GitHub documentation.

## Fix failing tests

When you have failing tests, Copilot can help you fix them:

1. In the Test Explorer, hover over a failing test
1. Select the **Fix Test Failure** button (sparkle icon)
1. Review and apply Copilot's suggested fix

Alternatively, you can:

1. Open the Chat view
1. Enter the `/fixTestFailure` command
1. Follow Copilot's suggestions to fix the test

When you use [Copilot Edits in agent mode](/docs/copilot/copilot-edits.md#use-agent-mode-preview), it can automatically run tests for your application code. In agent mode, Copilot monitors the test output and attempts to fix failing tests automatically and rerun the tests.

## Tips for better test generation

To get the best results when generating tests with Copilot, follow these tips:

* Provide context in your prompts about the testing framework you prefer
* Specify if you want particular types of tests (unit, integration, end-to-end)
* Ask for specific test cases or edge cases
* Request tests that follow your project's coding standards

## Personalize test generation

If your organization has specific testing requirements, you can customize how Copilot generates tests to ensure they meet your standards. You can personalize how Copilot generates tests by providing custom instructions. For example:

* Specify preferred testing frameworks
* Define naming conventions for tests
* Set code structure preferences
* Request specific test patterns or methodologies

Get more information about [personalizing Copilot for generating tests](/docs/copilot/copilot-customization.md).

## Next steps

* Learn more about [Copilot in VS Code](/docs/copilot/overview.md).
* Explore [general testing features in VS Code](/docs/editor/testing.md).
* Check out example prompts for [generating unit tests](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat/testing-code/generate-unit-tests)
