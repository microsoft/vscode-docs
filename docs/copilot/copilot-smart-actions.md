---
ContentId: f0f31de2-a344-4ee6-8d5b-d3ac4e11e149
DateApproved: 04/03/2025
MetaDescription: Access your GitHub Copilot subscription and set up GitHub Copilot in Visual Studio.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Copilot smart actions in Visual Studio Code

For several common scenarios, you can use _smart actions_ to get help from Copilot without having to write a prompt. Examples of these smart actions are generating commit messages, generating documentation, explaining or fixing code, or performing a code review. These smart actions are available throughout the VS Code UI.

## Generate a commit message and PR information

Copilot can help generate commit messages and the PR title and description based on the code changes in a commit or the changes in a pull request. Use the _sparkle_ icon in the Source Control view or GitHub PR extension to generate a title and description that summarizes your changes.

![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/copilot-smart-actions/generate-commit-message.png)

## Rename symbols

When you rename a symbol in your code, Copilot suggests a new name based on the context of the symbol and the codebase.

![Inline chat suggesting a new name for a symbol in a Python file](images/copilot-smart-actions/copilot-inline-chat-rename-suggestion.png)

## Generate alt text for images in Markdown

Use AI to generate or update alt text for images in Markdown files. To generate alt text:

1. Open a Markdown file.
1. Put the cursor on an image link.
1. Select the Code Action (lightbulb) icon and select **Generate alt text**.

    ![Screenshot that shows a Code Action menu with Generate alt text option for a Markdown image link.](images/copilot-smart-actions/generate-alt-text.png)

1. If you already have an alt text, select the Code Action, and select **Refine alt text**.

## Generate documentation

Use Copilot to generate code documentation for multiple languages.

1. Open your application code file.
1. Optionally, select the code you want to document.
1. Right-click and select **Copilot** > **Generate Docs**.

    ![Inline chat /doc example to generate documentation code comments for a calculator class](images/copilot-smart-actions/inline-chat-doc-example.png)

## Generate tests

To generate tests for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Optionally, select the code you want to test.
1. Right-click and select **Copilot** > **Generate Tests**.

    Copilot generates test code in an existing test file, or creates a new test file if one doesn't exist.

1. Optionally, refine the generated tests by providing additional context in the Inline Chat prompt.

## Explain code

Copilot can help with explaining a piece of code.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Explain**.

    Copilot provides an explanation of the selected block of code.

## Fix coding errors

To fix coding issues for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Fix**.

    Copilot provides a code suggestion to fix the code.

1. Optionally, refine the generated code by providing additional context in the chat prompt.

Alternatively, if there's a compile or linting problem in a code file, Copilot shows a code action in the editor to help resolve the issue.

![Screenshot of the editor showing the sparkle icon and Copilot context menu to explain or fix the issue.](images/copilot-smart-actions/copilot-code-action-fix.png)

## Fix testing errors

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

## Fix terminal errors

When a command fails to run in the terminal, Copilot displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

![Fix with Copilot option in the terminal after a failed terminal command.](images/copilot-smart-actions/terminal-command-explanation.png)

## Review code

Copilot can help with reviewing your code, either for a code block in the editor or all changes included in a pull request (requires the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items/?itemName=GitHub.vscode-pull-request-github)).

To review a code block in the editor:

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Copilot** > **Review and Comment**.

    Copilot creates review comments in the **Comments** panel and also shows them inline in the editor.

To review all changes in a pull request:

1. Create a pull request with the GitHub Pull Requests extension
1. Select the **Copilot Code Review** button in the **Files Changed** view.

    Copilot creates review comments in the **Comments** panel and also shows them inline in the editor.

## Semantic search results

The Search view lists exact text matches across your files, in addition to matches that are semantically relevant based on your search text.

![Search view showing semantic search results that are not an exact match for the search criteria.](images/copilot-smart-actions/semantic-search-results.png)

You can reference search results in your chat prompt by selecting **Get results from the search view** from the **Add Context** Quick Pick. Alternatively, type `#searchResults` in the chat prompt.

## Related content

* [Get started with the Copilot Quickstart](/docs/copilot/getting-started.md).
