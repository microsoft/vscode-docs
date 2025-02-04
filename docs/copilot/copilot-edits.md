---
Order: 8
Area: copilot
TOCTitle: Copilot Edits
ContentId: 393f3945-0821-42ca-bdd7-fb82affacb6a
PageTitle: Copilot Edits
DateApproved: 12/11/2024
MetaDescription: Get started with Copilot Edits to start an AI-powered code editing session across multiple files in your project.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Copilot Edits

Use Copilot Edits to start an AI-powered code editing session and iterate quickly on code changes across multiple files by using natural language. Copilot Edits applies the edits directly in the editor, where you can review them in-place, with the full context of the surrounding code.

Copilot Edits can function in two modes:

* [*Edit mode*](#use-edit-mode): select which files to edit, provide the relevant context and prompt, and Copilot will suggest code edits.
* [*Agent mode*](#use-agent-mode-preview) (preview): let Copilot autonomously plan the tasks and relevant files that are needed to implement the request. Copilot will apply code edits and suggest terminal commands, and will continuously iterate to resolve any issues that arise.

> [!NOTE]
> Agent mode is currently in preview and is only available in [VS Code Insiders](https://code.visualstudio.com/insiders). Provide feedback and report issues in the [Copilot repository](https://github.com/microsoft/vscode-copilot-release/issues).

> [!IMPORTANT]
> If you're using notebooks, Copilot Edits support is currently limited. We recommend that you use [Copilot Chat](/docs/copilot/copilot-chat.md) or [Inline Chat](/docs/copilot/copilot-chat.md#inline-chat) with notebooks in VS Code.

The following video demonstrates how to use Copilot Edits to extend a basic Express app, such as adding a new page, navigation bar, and theme switcher.

<video src="images/copilot-edits/copilot-edits-hero.mp4" title="Use Copilot Edits to modify an Express app" loop controls muted></video>

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Start a Copilot Edits session

You access Copilot Edits through the Copilot Edits view, where you can enter natural language prompts for getting edit suggestions. By default, the Copilot Edits view is available in the Secondary Side Bar.

![Screenshot showing the Copilot Edits view and welcome message.](images/copilot-edits/copilot-edits-view-welcome.png)

To access the Copilot Edits view:

* Use the `kb(workbench.action.chat.openEditSession)` keyboard shortcut

* Open the Copilot menu in the VS Code title bar, and then select **Open Copilot Edits**

    ![Screenshot showing the Copilot menu in VS Code title bar, highlighting the Open Edit Session item.](images/copilot-edits/copilot-command-center-open-edit-session.png)

* Use the **View: Toggle Copilot Edits** or **Copilot Edits: Focus on Copilot Edits View** command in the Command Palette (`kb(workbench.action.showCommands)`)

Because making code changes can be an iterative process, an *edit session* in Copilot Edits can consist of a sequence of requests (or turns). You can send as many requests as you need to get the code to where you want it.

## Use edit mode

In edit mode, you select which files to edit and provide the relevant context and prompt. Copilot will suggest code edits based on your prompt.

1. Open the Copilot Edits view (`kb(workbench.action.chat.openEditSession)`)

1. Select **Edit** from the mode dropdown

    ![Screenshot showing the Copilot Edits view, highlighting edit mode selected.](images/copilot-edits/copilot-edits-edit-mode.png)

1. Use **Add Files** to add files to the _working set_

    The working set indicates which files in the workspace can be edited by Copilot Edits.

1. Enter a prompt to request code edits. Be specific and precise about the changes you want, and decompose larger tasks into smaller tasks.

    Copilot Edits streams the edits in the editor. In the working set, files that were edited by Copilot are marked in bold.

    > [!TIP]
    > Let Copilot find the right files automatically by adding `#codebase` in your prompt. Make sure to enable the `setting(github.copilot.chat.edits.codesearch.enabled)` _(preview)_ setting to get the best results.

1. Review the suggested edits and accept or discard the suggested edits

1. Iterate on the code changes

    If you're not entirely happy with the edits, you can ask follow-up questions, such as "don't include the phone number", or "use jest instead of vitest". Or you can incrementally edit your code further. For example, when building a web app, use a series of prompts such as "add a navigation bar", "add a theme switcher", "store order items in JSON format in MongoDB".

## Use agent mode (preview)

In agent mode, Copilot Edits operates in a more autonomous and dynamic manner to achieve the desired outcome. To process a request, Copilot loops over the following steps and iterates multiple times as needed:

* Determines the relevant context and files to edit autonomously.
* Offers both code changes and terminal commands to complete the task. For example, Copilot might compile code, install packages, run tests, and more.
* Monitors the correctness of code edits and terminal command output and iterates to remediate issues.

Copilot Edits agent mode uses a set of [_tools_](#agent-mode-tools) to accomplish these tasks. These tools can run in parallel to accomplish the requested task.

To use agent mode in Copilot Edits:

1. Enable agent mode in by setting the `setting(chat.agent.enabled)` setting to `true`.

1. Open the Copilot Edits view (`kb(workbench.action.chat.openEditSession)`)

1. Select **Agent** from the mode dropdown

    ![Screenshot showing the Copilot Edits view, highlighting agent mode selected.](images/copilot-edits/copilot-edits-agent-mode.png)

1. Enter a prompt to request code edits.

    You don't have to specify the working set. In agent mode, Copilot Edits determines the relevant context and files to edit autonomously.

    ![Screenshot showing the Copilot Edits view, highlighting that Copilot searched the codebase for relevant files.](images/copilot-edits/copilot-edits-agent-search-codebase.png)

    Copilot Edits streams the edits in the editor and updates the working set. In addition, Copilot can suggest terminal commands to run.

1. Review the suggested code edits, and confirm if Copilot can run the proposed terminal commands

    As a user, you stay in control of the changes that are made to your project and can [review the generated edits](#accept-or-discard-edits) and need to confirm the terminal commands to run.

    ![Screenshot showing the Copilot Edits view, highlighting the terminal command that Copilot wants to run.](images/copilot-edits/copilot-edits-agent-confirm-command.png)

1. Copilot Edits detects issues and problems in code edits and terminal commands, and will iterate and perform additional actions to resolve them.

    ![Screenshot showing the Copilot Edits view, highlighting that Copilot verified the code edits for errors.](images/copilot-edits/copilot-edits-agent-check-errors.png)

    > [!NOTE]
    > The `setting(chat.agent.maxRequests)` setting controls the maximum number of requests that Copilot Edits can make in agent mode.

1. Continue to ask follow-up questions and iterate on the code changes that Copilot Edits provides.

> [!NOTE]
> Agent mode for Copilot Edits is currently only available in [VS Code Insiders](https://code.visualstudio.com/insiders).

## Manage the working set

The _working set_ is the set of files that you want Copilot Edits to work on for your edit session. Copilot Edits does not make changes outside the working set, except when suggesting to create a new file. When you use agent mode, Copilot autonomously determines which files to edit and adds them to the working set.

![Screenshot of Copilot Edits, showing the working set contains 3 files, including the currently opened file.](images/copilot-edits/copilot-edits-working-set.png)

> [!IMPORTANT]
> The working set is currently limited to 10 files.

Copilot Edits automatically adds the active editor to the working set. If you have multiple [editor groups](/docs/getstarted/userinterface.md#editor-groups), the active editor for each group is added to the working set. To add all open editors, select **Add Files...**, and then choose **Open Editors** from the Files Quick Pick.

You have many options to add files to the working set:

* Select **Add Files...** or use the <i class="codicon codicon-attach"></i> icon (`kb(workbench.action.chat.attachContext)`), and then select files in the Quick Pick.

    > [!TIP]
    > To quickly select multiple items from a Quick Pick, use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the list, use the `kbstyle(Right)` key to add the item as context, and then repeat this for other items.

    ![Screenshot showing the Copilot Edits view and the file search Quick Pick, highlighting the buttons to add context.](images/copilot-edits/copilot-edits-add-files.png)

* Let Copilot find the right files automatically by adding `#codebase` in your prompt.

    Make sure to enable the `setting(github.copilot.chat.edits.codesearch.enabled)` _(preview)_ setting to get the best results.

* Drag and drop editor tabs, or files or folders from the Explorer view, Search view, or editor breadcrumb onto the Copilot Edits view.

    When you drop a folder onto the Copilot Edits view, all files in that folder are added to the working set.

* Right-click on a file in the Explorer view or Search view and select **Add File to Copilot Edits**.

* Select a suggested file. When you add one or more files to the working set, Copilot Edits proposes other relevant files based on the Git history.

    <video src="images/copilot-edits/working-set-suggested-files.mp4" title="Add suggested files to Copilot Edits working set." autoplay loop controls muted></video>

    If you don't want to see these suggestions, you can disable them with the `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` setting.

When Copilot Edits generates edits for your project, it visually indicates which files in the working set are edited. Select a file in the working set to open it and view the proposed edits in the editor.

![Screenshot showing the Copilot Edits response for "Add a feedback field in the contact page" and showing the diff in the editor.](images/copilot-edits/copilot-edits-view-edits-in-file.png)

## Accept or discard edits

Copilot Edits gives you a code review flow where you can accept or discard each of the AI-generated edits. If you discard the edits, the modified files are restored to their previously accepted state.

With the editor overlay controls, you can navigate between the suggested edits by using the <i class="codicon codicon-arrow-up"></i> and <i class="codicon codicon-arrow-down"></i> controls. Use the **Accept** or **Discard** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor table bar.](images/copilot-edits/copilot-edits-file-review-controls.png)

To accept or discard a specific edit within a file, hover over the code edit and use the **Accept** or **Discard** controls for that edit.

Alternatively, you can also accept or discard the changes from the working set in the Copilot Edits view:

* Select **Accept** (`kb(chatEditing.acceptAllFiles)`) or **Discard** (`kb(chatEditing.discardAllFiles)`) in the working set title bar to accept or discard all edits in the working set

* Select the **Accept** or **Discard** icon on an individual working set file to apply the action to that specific file

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

With the `setting(chat.editing.autoAcceptDelay)` setting, you can configure a delay after which the suggested edits are automatically accepted. Hover over the editor overlay controls to cancel the auto-accept countdown.

When you close VS Code, the status of the pending edits is remembered. When you reopen VS Code, the pending edits are restored and you can still accept or discard the edits.

> [!NOTE]
> In agent mode, edits are automatically saved to disk, regardless if Auto Save (`setting(files.autoSave)`) is enabled. You can still review the edits and choose to discard them if needed.

## Undo edits

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example because you want to use another implementation strategy.

You can use the **Undo Last Edit** control in the Copilot Edits view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edits, you can redo those edits again by using the **Redo Last Edit** control in the Copilot Edits view title bar.

![Screenshot showing the Copilot Edits view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control when hovering over a request in the Copilot Edits view to revert all edits that were made from that request onwards.

![Screenshot showing the Copilot Edits view, highlighting the Undo Edits control for a specific request.](images/copilot-edits/copilot-edits-undo-request.png)

> [!TIP]
> Sometimes Copilot starts walking down the wrong path when generating edits. Once that happens, it can be hard to convince it about another approach by adding to the conversation. In that case, use **Undo Last Edit** to the point where you agree with Copilot's responses. Then restart from there with a refined prompt.

## Send a chat request to Copilot Edits

Copilot Chat is great for asking questions and exploring ideas about your project or technology topics in general. Rather than applying each code block from Copilot Chat to your code, you can transfer the chat session to Copilot Edits. Copilot Edits is optimized for code editing and can apply code suggestions directly in your code, across multiple files simultaneously.

In the Chat view, select the **Edit with Copilot** button at the bottom of the chat conversation to apply the suggested code changes with Copilot Edits. If you have multiple chat requests in the chat session, you can select which requests you want to transfer to Copilot Edits.

![Screenshot highlighting the Edit with Copilot button in the Chat view to move a chat conversation to Copilot Edits.](images/copilot-edits/copilot-chat-edit-with-copilot.png)

After moving a chat request to Copilot Edits, the chat request is removed from the chat conversation in the Chat view.

## Agent mode tools

To complete a request, Copilot Edits uses a set of _tools_ to accomplish the individual tasks. Consider these tools as specialized utilities that Copilot can use to perform a specific task. Examples of such tasks are listing the files in a directory, editing a file in your workspace, running a terminal command, getting the output from the terminal, and more.

Based on the outcome of a tool, Copilot might invoke other tools to accomplish the overall request. For example, if a code edit results in syntax errors in the file, Copilot might explore another approach and suggest different code changes.

Although agent mode can operate in an autonomous manner, you maintain control over the generated edits and the terminal commands that are run.

## Settings

The following list contains the settings related to Copilot Edits. You can configure settings through the Setting editor (`kb(workbench.action.openSettings)`).

* `setting(chat.editing.confirmEditRequestRemoval)` - ask for confirmation before undoing an edit (default: `true`)
* `setting(chat.editing.confirmEditRequestRetry)` - ask for confirmation before performing a redo of the last edit (default: `true`)
* `setting(chat.editing.alwaysSaveWithGeneratedChanges)` - automatically save generated changes from Copilot Edits to disk (default: `false`)
* `setting(chat.agent.enabled)` <i class="codicon codicon-beaker"></i> - enable or disable agent mode in Copilot Edits (default: `false`)
* `setting(chat.editing.autoAcceptDelay)` - configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept (default: 0)
* `setting(github.copilot.chat.edits.codesearch.enabled)` _(preview)_ - let Copilot find the right files by adding `#codebase` to your prompt, similar to how agent mode works (default: `false`)
* `setting(chat.agent.maxRequests)` - maximum number of requests that Copilot Edits can make in agent mode (default: 5 for Copilot Free users, 15 for other users)

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
* Although `#codebase` is great at finding relevant context for your query, subsequent generated edits are of widely varying quality. Experiment with the `setting(github.copilot.chat.edits.codesearch.enabled)` _(preview)_ setting for an improved, agentic experience to find files, or explicitly add files to your working set to create better results.
* Support for Jupyter notebooks, other custom text formats, and binary file formats is absent or untested.
* The working set is currently limited to 10 files.
* Copilot Edits is limited to 7 editing requests per 10 minutes.

## Frequently asked questions

### How is Copilot Edits different from Copilot Chat?

Both [Copilot Chat](/docs/copilot/copilot-chat.md) and Copilot Edits use a conversational interface, where you can use natural language prompts to get AI-powered suggestions. There are several distinct differences between Copilot Edits and Copilot Chat.

Copilot Edits puts you in the context of **code editing**, where you start an edit session and use prompts for making changes to your codebase. Copilot Edits can generate and apply code changes directly across **multiple files** in your codebase. You can immediately **preview the generated edits** within the context of your code.

The [Chat view](/docs/copilot/copilot-chat.md#chat-view) gives you a more **general-purpose** chat interface for asking questions about your code or technology topics in general. Copilot can also provide code suggestions and generate code blocks as part of the chat conversation. You need to **manually apply** each code block to the different files in your project to evaluate their validity.

[Inline Chat](/docs/copilot/copilot-chat.md#inline-chat) keeps you in the coding flow by providing a chat interface in the editor, where you can **preview the generated code** suggestions directly in the context of your code. The scope of Inline Chat is limited to the editor in which it's started, so it can only provide code suggestions for a **single file**. You can also use Inline Chat to ask general-purpose questions.

Copilot Edits also provides you a **code review flow** where you can easily review generated edits and decide to accept or discard them. Copilot Chat does not have this code review mechanism. In addition, you can undo past edits and **roll back changes** to a previous accepted state.

The following table shows a comparison of the capabilities of each experience.

| Capability                  | Copilot Edits | Chat view | Inline Chat | Quick Chat |
|-----------------------------|:-------------:|:---------:|:-----------:|:----------:|
| Multi-file edits            | ✅ | ✅* |    | ✅* |
| Preview code edits          | ✅ |     | ✅ |     |
| Code review flow            | ✅ |     |    |      |
| Roll back changes           | ✅ |     |    |      |
| Attach context              | ✅ | ✅ | ✅ | ✅  |
| Use participants & commands |    | ✅  |    | ✅  |
| Generate shell commands     |    | ✅  |    | ✅  |
| General-purpose chat        |    | ✅  | ✅ | ✅  |

\* _code blocks are included in the chat conversation and need to be applied to the right file manually_

### Can I change the location of the Copilot Edits view?

You can drag and drop the Copilot Edits view into the Activity Bar to show it in the Primary Side Bar. You can also move it to the Secondary Side Bar. Learn more about [custom layouts](/docs/editor/custom-layout.md#workbench) in VS Code.

### Why would I use edit mode instead of agent mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: you might use edit mode if your request involves only code edits and you know the precise scope and working set for the changes.
* **Preview feature**: agent mode is still in preview and might not work for all scenarios.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Non-deterministic**: agent mode evaluates the outcome of the generated edits and might iterate multiple times. As a result, agent mode can be more non-deterministic than edit mode.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

## Can I use Copilot Edits with notebooks?

Copilot Edits support is limited when you're using notebooks. For example, agent mode is not available for working with notebooks in VS Code.

We recommend that you use [Copilot Chat](/docs/copilot/copilot-chat.md) or [Inline Chat](/docs/copilot/copilot-chat.md#inline-chat) with notebooks in VS Code instead.

## Related content

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/copilot-vscode-features.md)
* [Use Copilot Chat for AI chat conversations](/docs/copilot/copilot-chat.md)
