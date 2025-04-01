---
ContentId: 393f3945-0821-42ca-bdd7-fb82affacb6a
DateApproved: 03/05/2025
MetaDescription: Get started with chat edit mode in VS Code to start an AI-powered code editing session across multiple files in your project.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Make edits across multiple files with edit mode

With chat _edit mode_ in Visual Studio Code, you can use natural language to make edits across multiple files in your project. The edits are applied directly in the editor, where you can review them in-place, with the full context of the surrounding code.

By selecting specific files and providing clear context, you can guide edit mode to make targeted code changes and improvements.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Use edit mode

In edit mode, you select which files to edit and provide the relevant context and prompt. Copilot will suggest code edits based on your prompt.

1. Open the Chat view by selecting **Open Chat** from the Copilot menu in the VS Code title bar, or use the `kb(workbench.action.chat.open)` keyboard shortcut.

1. Select **Ask** from the chat mode dropdown in the Chat view.

    ![Screenshot showing the Copilot Edits view, highlighting edit mode selected.](images/copilot-chat/chat-mode-dropdown-edit.png)

1. Select **Add Context** to provide indicate relevant context for your prompt.

    To make sure that Copilot has the right context for the changes you want to make, add context to your prompt, such as files or folders in your workspace. Learn more about [adding context to your Copilot prompt](/docs/copilot/chat/copilot-chat-context.md).

    The active editor is automatically added as context. When you add files, other relevant files might be suggested.

    > [!TIP]
    > Let Copilot find the right files automatically by adding `#codebase` in your prompt. Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results.

1. Enter your prompt in the chat input field to indicate the type of edits you want to make.

    Experiment with some of these example questions to get started:

    * `Refactor the calculate function to make it more efficient.`
    * `Add a login form to the app. Use OAuth for authentication.`
    * `Add unit tests for the calculator class. Use vitest as the test framework.`

1. Notice that Copilot streams the suggested edits directly in the editor.

    The Chat view shows the list of files that were edited in bold text. The editor overlay controls enable you to navigate between the suggested edits.

    ![Screenshot that shows the Copilot Edits view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files.png)

1. Review the suggested edits and [accept or discard the suggested edits](#accept-or-discard-edits).

1. Continue to iterate on the code changes to refine the edits or to implement additional features.

## Accept or discard edits

Copilot lists the files that were edited in the changed files list in the Chat view. Files with pending edits also have an indicator in the Explorer view and editor tabs.

![Screenshot that shows the Copilot Edits view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files-full.png)

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` (<i class="codicon codicon-arrow-up"></i>) and `kbstyle(Down)` (<i class="codicon codicon-arrow-down"></i>) controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/copilot-edits/copilot-edits-file-review-controls.png)

Use the **Keep** or **Undo** controls in the editor or Chat view to accept or reject individual or all suggested edits.

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

With the `setting(chat.editing.autoAcceptDelay)` setting, you can configure a delay after which the suggested edits are automatically accepted. Hover over the editor overlay controls to cancel the auto-accept countdown.

When you close VS Code, the status of the pending edits is remembered. When you reopen VS Code, the pending edits are restored and you can still accept or discard the edits.

## Revert edits

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example because you want to use another implementation strategy or because Copilot starts walking down the wrong path when generating edits.

You can use the **Undo Last Edit** control in the Chat view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edit, you can redo those edits again by using the **Redo Last Edit** control in the Chat view title bar.

![Screenshot showing the Copilot Edits view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control (`kbstyle(x)` icon) when hovering over a request in the Copilot Edits view to revert all edits that were made from that request onwards.

![Screenshot showing the Copilot Edits view, highlighting the Undo Edits control for a specific request.](images/copilot-edits/copilot-edits-undo-request.png)

## Settings

The following list contains the settings related to edit mode. You can configure settings through the Setting editor (`kb(workbench.action.openSettings)`).

* `setting(chat.editing.confirmEditRequestRemoval)` - ask for confirmation before undoing an edit (default: `true`).
* `setting(chat.editing.confirmEditRequestRetry)` - ask for confirmation before performing a redo of the last edit (default: `true`).
* `setting(chat.editing.autoAcceptDelay)` - configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept (default: 0).
* `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ - let Copilot find the right files when you add `#codebase` to your prompt, similar to how agent mode works (default: `false`).
* `setting(chat.implicitContext.enabled)` _(Experimental)_ - configure if the active editor should be automatically added as context to the chat prompt.
* `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` _(Experimental)_ - suggest related files from git history in Copilot Edits (default: `false`).

## Keyboard shortcuts

The following list contains the default keyboard shortcuts related to Copilot Edits. You can modify any of the default keyboard shortcuts by using the Keyboard Shortcuts editor (`kb(workbench.action.openGlobalKeybindings)`).

* `kb(workbench.action.chat.openEditSession)` - Open the Copilot Edits view
* `kb(workbench.action.chat.sendToChatEditing)` - Send a prompt from the Chat view to Copilot Edits
* `kb(workbench.action.chat.attachContext)` - Attach context to your prompt
* `kb(chatEditing.saveAllFiles)` - Save all edited files to disk
* `kb(chatEditing.acceptAllFiles)` - Accept all edits
* `kb(chatEditing.discardAllFiles)` - Discard all edits
* `kb(chatEditor.action.navigatePrevious)` - Navigate to the previous edit within a file
* `kb(chatEditor.action.navigateNext)` - Navigate to the next edit within a file

> [!TIP]
> If you want to change a keyboard shortcut for an action that's specific to the Copilot Edits view, you need to include the following condition in the `when` clause: `chatLocation == 'editing-session'`.

## Limitations

* Multiple simultaneous edit sessions are not supported yet.
* The use of `@workspace /new` to scaffold a new project is not supported yet in an Edit session. For now, use Copilot Chat for the initial scaffolding.
* Although `#codebase` is great at finding relevant context for your query, subsequent generated edits are of widely varying quality. Experiment with the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting for an improved, agentic experience to find files, or explicitly add files to your prompt to create better results.
* Support for custom text formats, and binary file formats is absent or untested.

## Frequently asked questions

### Can I change the location of the Copilot Edits view?

You can drag and drop the Copilot Edits view into the Activity Bar to show it in the Primary Side Bar. You can also move it to the Secondary Side Bar. Learn more about [custom layouts](/docs/configure/custom-layout.md#workbench) in VS Code.

### Why would I use edit mode instead of agent mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: you might use edit mode if your request involves only code edits and you know the precise scope for the changes.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Non-deterministic**: agent mode evaluates the outcome of the generated edits and might iterate multiple times. As a result, agent mode can be more non-deterministic than edit mode.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

## Related content

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
* [Use Copilot Chat for AI chat conversations](/docs/copilot/chat/copilot-chat.md)
* [Start an agentic code editing session](/docs/copilot/chat/chat-agent-mode.md)
