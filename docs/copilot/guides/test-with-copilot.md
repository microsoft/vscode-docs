---
ContentId: 9f84b21e-5b76-4c3a-a5dd-2021ab343f1f
DateApproved: 10/09/2025
MetaDescription: Learn how to use GitHub Copilot in Visual Studio Code to write, debug, and fix tests.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Test with GitHub Copilot

Writing and maintaining tests is a crucial but often time-consuming part of software development. GitHub Copilot streamlines this process by helping you write, debug, and fix tests more efficiently in Visual Studio Code. This article shows you how to leverage Copilot's testing capabilities to improve your testing workflow and increase test coverage in your projects.

Copilot can help with the following testing tasks:

* **Set up testing frameworks**: get help configuring the right testing framework and VS Code extensions for your project and language.
* **Generate test code**: create unit tests, integration tests, and end-to-end tests that cover your application code.
* **Handle edge cases**: generate comprehensive test suites to cover edge cases and error conditions.
* **Fix failing tests**: receive suggestions for fixing test failures.
* **Maintain consistency**: personalize Copilot to generate tests that follow your project's coding practices.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Set up your testing framework

To accelerate your testing workflow, Copilot can help set up the testing framework and VS Code extensions for your project. Copilot suggests appropriate testing frameworks based on your project type.

1. Open the Chat view (`kb(workbench.action.chat.open)`).
1. Enter the `/setupTests` command in the chat input field.
1. Follow Copilot's guidance to configure your project.

## Write tests with Copilot

Copilot can help you write tests for your application code by generating test code that covers your codebase. This includes unit tests, end-to-end tests, and tests for edge cases.

### Use chat prompts

1. Open your application code file.

1. Open one of these views:
    * Chat view (`kb(workbench.action.chat.open)`)
    * Inline Chat (`kb(inlineChat.start)`)

1. Enter a prompt like:
    * "Generate tests for this code"
    * "Write unit tests including edge cases"
    * "Create integration tests for this module"

Get more guidance about [using GitHub Copilot for writing tests](https://docs.github.com/en/copilot/using-github-copilot/guides-on-using-github-copilot/writing-tests-with-github-copilot) in the GitHub documentation.

### Use editor smart actions

To generate tests for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Optionally, select the code you want to test.
1. Right-click and select **Generate Code** > **Generate Tests**.

    Copilot generates test code in an existing test file, or creates a new test file if one doesn't exist.

1. Optionally, refine the generated tests by providing additional context in the Inline Chat prompt.

## Fix failing tests

Copilot integrates with the Test Explorer in VS Code and can help with fixing failing tests.

1. In the Test Explorer, hover over a failing test
1. Select the **Fix Test Failure** button (sparkle icon)
1. Review and apply Copilot's suggested fix

Alternatively, you can:

1. Open the Chat view
1. Enter the `/fixTestFailure` command
1. Follow Copilot's suggestions to fix the test

> [!TIP]
> [Agent mode](/docs/copilot/chat/chat-agent-mode.md) monitors the test output when running tests, and automatically attempts to fix and rerun failing tests.

## Personalize test generation

If your organization has specific testing requirements, you can customize how Copilot generates tests to ensure they meet your standards. You can personalize how Copilot generates tests by providing custom instructions. For example:

* Specify preferred testing frameworks
* Define naming conventions for tests
* Set code structure preferences
* Request specific test patterns or methodologies

Get more information about [personalizing Copilot for generating tests](/docs/copilot/customization/overview.md).

## Tips for better test generation

To get the best results when generating tests with Copilot, follow these tips:

* Provide context in your prompts about the testing framework you prefer
* Specify if you want particular types of tests (unit, integration, end-to-end)
* Ask for specific test cases or edge cases
* Request tests that follow your project's coding standards

## Next steps

* Learn more about [Copilot in VS Code](/docs/copilot/overview.md).
* Explore [general testing features in VS Code](/docs/debugtest/testing.md).
* Check out example prompts for [generating unit tests](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat/testing-code/generate-unit-tests)
