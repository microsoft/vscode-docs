---
ContentId: 393f3945-0821-42ca-bdd7-fb82affacb6a
DateApproved: 08/07/2025
MetaDescription: Get started with chat edit mode in VS Code to start an AI-powered code editing session across multiple files in your project.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use edit mode in VS Code

With chat _edit mode_ in Visual Studio Code, you can use natural language to make edits across multiple files in your project. The edits are applied directly in the editor, where you can review them in-place, with the full context of the surrounding code.

By selecting specific files and providing clear context, you can guide edit mode to make targeted code changes and improvements.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Why use edit mode?

Edit mode is optimized for making code edits across multiple files in your project. VS Code directly applies the code changes in the editor, where you can review them in-place. You can use edit mode to:

* Refactor parts of your codebase, such as "refactor this using async/await" or "use a singleton pattern for the database connection".
* Add new features to your codebase, such as "add a login form to the app".
* Fix bugs in your codebase, such as "the sort function fails when the input is empty, fix it".
* Write unit tests for your code, such as "add unit tests for the calculator class using vitest".
* Improve the performance of your code, such as "optimize the calculate function to make it more efficient".

Edit mode is particularly useful for coding tasks when you have a good understanding of the changes that you want to make, and which files you want to edit. If you have a less well-defined task, a high-level requirement, or changes that also require running terminal commands and tools, you might want to use [agent mode](/docs/copilot/chat/chat-agent-mode.md) instead.

## Use edit mode

In edit mode, you select which files to edit and provide the relevant context and prompt. VS Code will suggest code edits based on your prompt.

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Edit** from the chat mode selector.

    ![Screenshot showing the Chat view, highlighting edit mode selected.](images/copilot-chat/chat-mode-dropdown-edit.png)

    Directly open edit mode in VS Code [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) or [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit).

1. Select **Add Context** or #-mention specific workspace files or context items to provide extra context for your prompt.

    By adding context, you can get more relevant responses. For example, to ask questions that are specific to your current project, you can use the `#codebase` context item. Type `#` in the chat input field to view the list of available context items.

    The active editor is automatically added as context. When you add files, other relevant files might be suggested.

1. Enter your prompt in the chat input field to indicate the type of edits you want to make.

    Experiment with some of these example questions to get started:

    * `Refactor the calculate function to make it more efficient.`
    * `Add a login form to the app. Use OAuth for authentication.`
    * `Add unit tests for the calculator class. Use vitest as the test framework.`

1. Notice that VS Code streams the suggested edits directly in the editor.

    The Chat view shows the list of files that were edited in bold text. The editor overlay controls enable you to navigate between the suggested edits.

    ![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files.png)

    > [!NOTE]
    > AI-generated code edits are restricted to the files in your current workspace.

1. Review the suggested edits and [accept or discard the suggested edits](#accept-or-discard-edits).

1. Continue to iterate on the code changes to refine the edits or to implement additional features.

## Accept or discard edits

VS Code lists the files that were edited in the changed files list in the Chat view. Files with pending edits also have an indicator in the Explorer view and editor tabs.

![Screenshot that shows the Chat view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files-full.png)

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` and `kbstyle(Down)` controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/copilot-edits/copilot-edits-file-review-controls.png)

If you stage your changes in the Source Control view, any pending edits are automatically accepted. On the other hand, if you discard your changes, any pending edits are also discarded.

When you close VS Code, the status of the pending edits is remembered and restored when you reopen VS Code.

To automatically accept all the suggested edits after a specific delay, configure the `setting(chat.editing.autoAccept)` setting. By hovering over the editor overlay controls, you can cancel the auto-accept countdown. If you automatically accept all edits, it's recommended to still review the changes before committing them in source control.

## Manage file edit approvals

You can manage which files the AI is allowed to edit without asking for explicit user approval with the `setting(chat.tools.edits.autoApprove)` setting. This setting can help inadvertent edits to files that contain sensitive information like workspace configuration settings or environment settings.

The `setting(chat.tools.edits.autoApprove)` setting accepts glob pattern-boolean pairs that indicate which files are automatically approved for edits. For example:

```json
"chat.tools.edits.autoApprove": {
  "**/*": true,
  "**/.vscode/*.json": false,
  "**/.env": false
}
```

## Edit a previous chat request

You can edit a previous chat request in the active chat session. This is useful if you want to refine your prompt or correct a mistake. Editing a chat request is equivalent to reverting the request and then submitting a new request with the edited prompt. Learn more about [editing a previous chat request](/docs/copilot/chat/copilot-chat.md#edit-a-previous-chat-request).

<video src="images/copilot-chat/chat-edit-request.mp4" title="Video showing the editing of a previous chat request in the Chat view." autoplay loop controls muted></video>

## Revert chat requests with checkpoints

Chat checkpoints provide a way to restore the state of your workspace to a previous point in time, and are particularly useful when chat interactions resulted in changes across multiple files.

When checkpoints are enabled, VS Code automatically creates snapshots of your files at key points during chat interactions, allowing you to return to a known good state if the changes made by chat requests are not what you expected or if you want to try a different approach.

To enable checkpoints, configure the `setting(chat.checkpoints.enabled)` setting.

![Screenshot of the Chat view, showing the Restore Checkpoint action in the Chat view.](images/copilot-chat/chat-restore-checkpoint.png)

Learn more about working with [checkpoints in chat](/docs/copilot/chat/copilot-chat.md#revert-chat-requests-with-checkpoints).

## Use instructions to get AI edits that follow your coding style

To get AI-generated code edits that follow your coding style, preferred frameworks, and other preferences, you can use instruction files. Instruction files enable you to describe your coding style and preferences in Markdown files, which the AI uses to generate code edits that match your requirements.

You can manually attach instruction files as context to your chat prompt, or you can configure the instruction files to be automatically applied.

The following code snippet shows an example of an instruction file that describes your coding style and preferences:

```markdown
---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
```

Learn more about [using instruction files](/docs/copilot/customization/overview.md).

## Settings

The following list contains the settings related to edit mode. You can configure settings through the Setting editor (`kb(workbench.action.openSettings)`).

* `setting(chat.editing.confirmEditRequestRemoval)` - ask for confirmation before undoing an edit (default: `true`).
* `setting(chat.editing.confirmEditRequestRetry)` - ask for confirmation before performing a redo of the last edit (default: `true`).
* `setting(chat.editing.autoAcceptDelay)` - configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept (default: 0).
* `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ - let VS Code find the right files when you add `#codebase` to your prompt, similar to how agent mode works (default: `false`).

## Frequently asked questions

### Why would I use edit mode instead of agent mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: you might use edit mode if your request involves only code edits and you know the precise scope for the changes.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Non-deterministic**: agent mode evaluates the outcome of the generated edits and might iterate multiple times. As a result, agent mode can be more non-deterministic than edit mode.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

## Related resources

* [Learn more about using chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Use ask mode to ask questions about your code](/docs/copilot/chat/chat-ask-mode.md)
* [Use agent mode to start an autonomous coding session](/docs/copilot/chat/chat-agent-mode.md)
