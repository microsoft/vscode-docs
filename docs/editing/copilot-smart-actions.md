---
ContentId: f0f31de2-a344-4ee6-8d5b-d3ac4e11e149
DateApproved: 11/25/2026
MetaDescription: Use AI smart actions in {% data variables.product.prodname_vscode_shortname %} to generate commit messages, rename symbols, and fix errors.
---
# AI smart actions in {% data variables.product.prodname_vscode %}

Use smart actions for focused AI assistance while you work in the editor, terminal, or Source Control view. Start from an action in the interface instead of writing an initial chat prompt, then review the explanation, suggested command, or code changes it produces.

## Choose an action

| Your task | Action | Where to start |
|-----------|--------|----------------|
| Understand a code selection | [Explain](#explain-code) | Editor context menu |
| Fix a reported coding error | [Fix](#fix-coding-errors) | Editor context menu or Code Action |
| Choose a better symbol name | [Generate New Name Suggestions](#rename-symbols) | Rename Symbol input |
| Describe an image for screen readers | [Generate or refine alt text](#generate-alt-text-for-images-in-markdown) | Code Action on a Markdown image |
| Investigate a failing test | [Fix Test Failure](#fix-testing-errors) | Test Explorer |
| Diagnose a failed command | [Explain or fix using Copilot](#fix-terminal-errors) | Terminal Quick Fix |
| Review code before committing | [Review](#review-code) | Editor or Source Control view |
| Draft a commit message or PR details | [Generate text from changes](#generate-a-commit-message-and-pr-information) | Source Control or GitHub Pull Requests extension |
| Resolve a Git conflict | [Resolve Conflicts with AI](#resolve-merge-conflicts-with-ai-experimental) | Conflicted file in the editor |
| Find code by meaning | [Search with AI](#semantic-search-results-preview) | Search view |
| Find a setting from a description | [Show AI-recommended results](#search-settings-with-ai) | Settings editor |

## Before you start

[Set up {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md) and open your project. The available actions depend on your account, enabled features, and the current context, such as a selection, diagnostic, failing test, or Git change.

Language-aware actions such as renaming also depend on your project's language support. PR actions require the GitHub Pull Requests extension, and reviewing uncommitted changes requires access to {% data variables.product.prodname_copilot_short %} code review.

Some actions open chat or edit files. Inspect their results before you keep or commit changes, and review any proposed command before running it. If an action doesn't match your task, [write your own prompt](#when-to-write-your-own-prompt).

## Explain code

Use **Explain** when you want to understand a function or unfamiliar block before changing it.

1. Open the source file and select the code you want to understand.
1. Right-click the selection and select **Explain**.
1. Read the explanation and ask follow-up questions if needed.

Check the explanation against the source. An explanation isn't evidence that the code behaves correctly at runtime.

## Fix coding errors

Use **Fix** for a reported problem, such as a compiler error or lint warning.

1. Select the code containing the diagnostic.
1. Right-click and select **Fix**, or open the Code Action (lightbulb) menu and choose the AI **Fix** action when available.
1. Inspect the resulting diff, then rerun the relevant build, lint check, or test to verify the fix.

![Screenshot showing the Fix and Explain Code Actions for a diagnostic in the editor.](images/copilot-smart-actions/copilot-code-action-fix.png)

If the code produces incorrect results without a diagnostic, provide a reproduction and expected behavior in chat. Follow the workflow to [investigate and fix a bug in your project](/docs/agents/guides/fix-a-bug-with-agents.md#apply-the-workflow-to-your-own-project).

## Rename symbols

Use AI name suggestions when a symbol's current name doesn't communicate its purpose.

1. Place the cursor on the symbol and run **Rename Symbol** (`kb(editor.action.rename)`).
1. Select **Generate New Name Suggestions** (sparkle icon) in the rename input if suggestions aren't already shown.
1. Choose a suggestion or edit it, then confirm the rename.
1. Review the changed references to ensure the name fits the symbol's role.

Automatic suggestions depend on your account and the `setting(github.copilot.renameSuggestions.triggerAutomatically)` setting. You can request suggestions with the sparkle action when it is available.

![Screenshot showing AI-generated names in the Rename Symbol input.](images/copilot-smart-actions/copilot-inline-chat-rename-suggestion.png)

## Generate alt text for images in Markdown

Use AI to draft an image description, then check it against the image and the surrounding document.

1. Open a Markdown file and put the cursor on an image link.
1. Open the Code Action (lightbulb) menu and select **Generate alt text**. If the image already has alt text, select **Refine alt text**.
1. Review the generated description for accuracy, useful context, and unnecessary detail before keeping it.

![Screenshot showing the Generate alt text Code Action for a Markdown image link.](images/copilot-smart-actions/generate-alt-text.png)

The action provides the image as context to inline chat. Verify that the description communicates the image's purpose in your document rather than accepting every detail the model suggests.

## Fix testing errors

Use a failing test as the starting point for an investigation, while preserving the behavior its assertions are meant to check.

1. In the Test Explorer, hover over a failing test.
1. Select **Fix Test Failure** (sparkle icon).
1. Review the proposed test and implementation changes, then rerun the failed test and related tests.

Before accepting a fix, [identify whether the failure comes from test setup, an incorrect expectation, or an implementation bug](/docs/agents/guides/test-code-with-ai.md#run-tests-and-investigate-failures). Don't weaken assertions solely to obtain a passing result.

If the action isn't available, attach the failure output and expected behavior to a request in the {% data variables.copilot.chat_view %}.

## Fix terminal errors

When [shell integration](/docs/terminal/shell-integration.md) detects a failed command that matches a Quick Fix provider, the terminal can offer AI assistance.

1. Select the Quick Fix (sparkle) icon beside the command.
1. Choose **Explain using Copilot** to investigate the failure, or **Fix using Copilot** to get suggested commands.
1. Review the explanation or proposed command, including its arguments and working directory, before running anything.
1. Run the appropriate command and check the result.

![Screenshot showing Fix using Copilot and Explain using Copilot in the terminal Quick Fix menu.](images/copilot-smart-actions/terminal-command-explanation.png)

Not every failure has a Quick Fix. If none appears, provide the command, relevant output, and expected result in chat.

## Review code

Review a selection for focused feedback, or review local Git changes before committing them. AI review can miss issues and doesn't replace running tests.

### Review a code selection

1. Open the source file and select the code you want to review.
1. Right-click and select **Review**.
1. Inspect the comments in the **Comments** panel and inline in the editor.
1. Use the comment actions to apply or discard suggestions. Review any edits and run the relevant checks.

### Review uncommitted changes

This workflow requires access to {% data variables.product.prodname_copilot_short %} code review. Check the [code review requirements](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/code-review). You don't need to create a pull request or install the GitHub Pull Requests extension to use the Source Control review actions.

1. Open the **Source Control** view (`kb(workbench.view.scm)`) in your Git repository.
1. Choose the scope to review:
    * Hover over **Staged Changes** and select **Code Review - Staged Changes**.
    * Hover over **Changes** and select **Code Review - Unstaged Changes**.
    * Use **Code Review - Uncommitted Changes** in the Source Control title bar, when available, to review both.
1. Follow the findings to the affected code and inspect each suggestion before applying it.
1. Rerun the relevant tests after making changes. Applying a suggestion doesn't commit it.

<!-- TODO: Add a screenshot showing the Source Control review actions for staged and unstaged changes. -->

A useful pre-commit workflow is to review local changes, inspect suggestions, and rerun tests. Then stage only the changes you intend to include and [generate a commit message](#generate-a-commit-message-and-pr-information) for that scope.

For reviews on GitHub pull requests, follow the [GitHub Copilot code review guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review).

## Generate a commit message and PR information

Use generated text as a draft that summarizes your verified changes, not as a substitute for reviewing them.

### Generate a commit message

1. Review your changes and stage the files or ranges you intend to commit.
1. In the **Source Control** view, select **Generate Commit Message** (sparkle icon) beside the message input.
1. Review and edit the generated message, then commit when you are ready.

If staged changes exist, generation uses those changes. Otherwise, it uses working-tree and untracked changes. The action fills the message input. It doesn't stage files or create a commit.

![Screenshot showing the Generate Commit Message action beside the Source Control message input.](images/copilot-smart-actions/generate-commit-message.png)

### Generate pull request details

Install and sign in to the [GitHub Pull Requests extension](/docs/sourcecontrol/github.md#pull-requests), then start [creating a pull request](/docs/sourcecontrol/github.md#creating-pull-requests).

Select the sparkle icon next to the PR title field to generate a title and description. Review the draft against the changes and add context that a diff doesn't explain, such as the reason for the change or how you verified it, before creating the PR.

## Resolve merge conflicts with AI (Experimental)

Use this action when combining conflicting changes requires more than accepting one side.

1. Open a conflicted Git file in a regular editor. The action isn't shown in a diff editor or the 3-way merge editor.
1. Select **Resolve Conflicts with AI**.
1. Review the agent's analysis and edits in the {% data variables.copilot.chat_view %} and editor. The request includes the conflicted files and available Git context.
1. Check that the result preserves the intended behavior, then run the relevant tests.
1. Stage the resolved files and [complete the Git operation](/docs/sourcecontrol/merge-conflicts.md#complete-the-merge-operation).

![Screenshot showing a conflicted file and a chat request to resolve it with Git history attached.](images/copilot-smart-actions/ai-merge-conflict-resolution.png)

For manual alternatives and the meaning of each side during a merge or rebase, see [Resolve merge conflicts](/docs/sourcecontrol/merge-conflicts.md).

## Semantic search results (Preview)

Use semantic search when you know what code does but don't know its exact names or text. For example, search for where the application checks whether a user can access a resource.

1. Open the **Search** view (`kb(workbench.view.search)`) and enter your query.
1. Run **Search with AI** from the Command Palette (`kb(workbench.action.showCommands)`).
1. Open the relevant results and check the code before using it as context for a change.

The action requires an available AI search provider. The {% data variables.product.prodname_copilot_short %} provider requires GitHub sign-in. Configuring only your own model API key doesn't provide it.

![Screenshot showing semantic results alongside text matches in the Search view.](images/copilot-smart-actions/semantic-search-results.png)

The `setting(search.searchView.semanticSearchBehavior)` setting controls when to request results:

| Value | Behavior |
|-------|----------|
| `manual` (default) | Request semantic results with **Search with AI**. |
| `runOnEmpty` | Request semantic results when text search finds no matches. |
| `auto` | Request semantic results with every search. |

For related keyword suggestions, turn on `setting(search.searchView.keywordSuggestions)`, which is off by default.

![Screenshot showing suggested alternative search terms in the Search view.](images/copilot-smart-actions/search-keyword-suggestions.png)

To bring results into a conversation, select **Search Results** from **Add Context** when your session offers it. You can also use `#searchResults` where supported.

## Search settings with AI

Describe the outcome you want when you don't know a setting's name.

1. Open the Settings editor (`kb(workbench.action.openSettings)`).
1. Search for an outcome, such as `increase text size`.
1. When AI results are available, select **Show AI-recommended results** (sparkle icon) in the search field.
1. Read each setting's description and check whether you are changing user or workspace settings before updating its value.

The `setting(workbench.settings.showAISearchToggle)` setting defaults to `true`. It controls whether this toggle is shown, not whether a particular query has AI results. The toggle also requires natural-language settings search and AI features to be available.

![Screenshot showing the Show AI-recommended results toggle in the Settings editor.](images/copilot-smart-actions/settings-suggestions.png)

## When to write your own prompt

Use a smart action when its predefined task matches what you need. Write your own prompt when you need to describe a different outcome or add specific requirements.

Choose where to work based on the scope of your task:

* **A focused edit to selected code**: use [inline chat](/docs/chat/inline-chat.md#use-editor-inline-chat). For example, select a function and ask to refactor it.

* **A task involving several files or steps**: use the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) or {% data variables.copilot.agents_window %}. For example, ask an agent to [add and run tests](/docs/agents/guides/test-code-with-ai.md) using your project's framework while leaving implementation code unchanged.

If a smart action already opened chat, add follow-up instructions in that conversation. You don't need to start over to refine its result.

## Related resources

* [Choose AI features for your task](/docs/agents/reference/ai-features-cheat-sheet.md).
* [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md).
