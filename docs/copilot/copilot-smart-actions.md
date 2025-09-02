---
ContentId: f0f31de2-a344-4ee6-8d5b-d3ac4e11e149
DateApproved: 08/07/2025
MetaDescription: Use smart actions in VS Code to get help from AI for common development tasks, such as generating commit messages, renaming symbols, or fixing coding errors.
MetaSocialImage: images/shared/github-copilot-social.png
---
# AI smart actions in Visual Studio Code

For several common scenarios, you can use _smart actions_ to get help from AI without having to write a prompt. Examples of these smart actions are generating commit messages, generating documentation, explaining or fixing code, or performing a code review. These smart actions are available throughout the VS Code UI.

## Generate a commit message and PR information

Get help generating commit messages and pull request (PR) titles and descriptions based on your code changes. Use the _sparkle_ icon in the Source Control view or GitHub PR extension to generate a title and description that summarizes your changes.

![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/copilot-smart-actions/generate-commit-message.png)

## Rename symbols

When you rename a symbol in your code, get AI-generated suggestions for a new name based on the context of the symbol and the codebase.

![Inline chat suggesting a new name for a symbol in a Python file](images/copilot-smart-actions/copilot-inline-chat-rename-suggestion.png)

## Generate alt text for images in Markdown

Use AI to generate or update alt text for images in Markdown files. To generate alt text:

1. Open a Markdown file.
1. Put the cursor on an image link.
1. Select the Code Action (lightbulb) icon and select **Generate alt text**.

    ![Screenshot that shows a Code Action menu with Generate alt text option for a Markdown image link.](images/copilot-smart-actions/generate-alt-text.png)

1. If you already have an alt text, select the Code Action, and select **Refine alt text**.

## Generate documentation

Use AI to generate code documentation for multiple languages.

1. Open your application code file.
1. Optionally, select the code you want to document.
1. Right-click and select **Generate Code** > **Generate Docs**.

    ![Inline chat /doc example to generate documentation code comments for a calculator class](images/copilot-smart-actions/inline-chat-doc-example.png)

## Generate tests

To generate tests for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Optionally, select the code you want to test.
1. Right-click and select **Generate Code** > **Generate Tests**.

    VS Code generates test code in an existing test file, or creates a new test file if one doesn't exist.

1. Optionally, refine the generated tests by providing additional context in the Inline Chat prompt.

## Explain code

Get help with explaining a block of code in the editor.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Explain**.

    VS Code provides an explanation of the selected block of code.

## Fix coding errors

To fix coding issues for your application code without writing a prompt, you can use the editor smart actions.

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Generate Code** > **Fix**.

    VS Code provides a code suggestion to fix the code.

1. Optionally, refine the generated code by providing additional context in the chat prompt.

Alternatively, if there's a compile or linting problem in a code file, VS Code shows a code action in the editor to help resolve the issue.

![Screenshot of the editor showing the sparkle icon and Copilot context menu to explain or fix the issue.](images/copilot-smart-actions/copilot-code-action-fix.png)

## Fix testing errors

Get help with fixing failing tests in your codebase, directly from the Test Explorer.

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

When a command fails to run in the terminal, VS Code displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

![Fix with Copilot option in the terminal after a failed terminal command.](images/copilot-smart-actions/terminal-command-explanation.png)

## Review code

VS Code can help with reviewing your code, either for a code block in the editor or all changes included in a pull request (requires the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items/?itemName=GitHub.vscode-pull-request-github)).

To review a code block in the editor:

1. Open your application code file.
1. Select the code you want to fix.
1. Right-click and select **Generate Code** > **Review**.

    VS Code creates review comments in the **Comments** panel and also shows them inline in the editor.

To review all changes in a pull request:

1. Create a pull request with the GitHub Pull Requests extension
1. Select the **Code Review** button in the **Files Changed** view.

    VS Code creates review comments in the **Comments** panel and also shows them inline in the editor.

## Semantic search results (Preview)

The Search view in VS Code enables you to search for text across your files. Semantic search enables you to find results that are semantically relevant to your search query, even if they don't match the text exactly. This is particularly useful when you're looking for code snippets or documentation that relate to a concept rather than a specific term, or when you don't know the exact terms to search for.

![Search view showing semantic search results that are not an exact match for the search criteria.](images/copilot-smart-actions/semantic-search-results.png)

Configure semantic search in the Search view with the `setting(search.searchView.semanticSearchBehavior)` setting. You can choose to run semantic search automatically, or only when you explicitly request it.

You can also get AI-generated keyword suggestions in the Search view to provide relevant alternative search terms. Enable search keyword suggestions with the `setting(search.searchView.keywordSuggestions)` setting.

![Search view showing keyword suggestions based on the search query.](images/copilot-smart-actions/search-keyword-suggestions.png)

You can reference search results in your chat prompt by selecting **Get results from the search view** from the **Add Context** Quick Pick. Alternatively, type `#searchResults` in the chat prompt.

## Search settings with AI (Experimental)

If you don't know the exact name of a setting you want to change, you can use AI to help find the relevant settings based on your search query. For example, you can search for "increase text size" to find the setting that controls the editor font size.

Enable this functionality with the `setting(workbench.settings.showAISearchToggle)` setting. In the Settings editor, you can then toggle the AI search results on or off with the **Search Settings with AI** button.

![Screenshot that shows the Settings editor showing AI-generated suggestions for settings.](images/copilot-smart-actions/settings-suggestions.png)

## Related content

* [Get started with the Copilot Quickstart](/docs/copilot/getting-started.md).
