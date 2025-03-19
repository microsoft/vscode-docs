---
Order: 8
Area: copilot
TOCTitle: Copilot Edits
ContentId: 393f3945-0821-42ca-bdd7-fb82affacb6a
PageTitle: Copilot Edits
DateApproved: 03/05/2025
MetaDescription: Get started with Copilot Edits to start an AI-powered code editing session across multiple files in your project.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Copilot Edits

Use Copilot Edits to start an AI-powered code editing session and iterate quickly on code changes across multiple files by using natural language. Copilot Edits applies the edits directly in the editor, where you can review them in-place, with the full context of the surrounding code.

Copilot Edits can function in two modes:

* [_Edit mode_](#use-edit-mode): select which files to edit, provide the relevant context and prompt, and Copilot will suggest code edits.
* [_Agent mode_](#use-agent-mode-preview) (preview): let Copilot autonomously plan the tasks and relevant files that are needed to implement the request. Copilot will apply code edits and suggest terminal commands, and will continuously iterate to resolve any issues that arise.

> [!IMPORTANT]
> If you're using notebooks, Copilot Edits support is currently limited. We recommend that you use [Copilot Chat](/docs/copilot/copilot-chat.md) or [Inline Chat](/docs/copilot/copilot-chat.md#inline-chat) with notebooks in VS Code.

The following video demonstrates how to use Copilot Edits to extend a basic Express app, such as adding a new page, navigation bar, and theme switcher.

<video src="images/copilot-edits/copilot-edits-hero.mp4" title="Use Copilot Edits to modify an Express app" loop controls muted></video>

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Edit mode versus agent mode (preview)

Copilot can operate in two modes: _edit mode_ and _agent mode_. These modes cater to different user preferences and workflows, allowing flexibility in how code is edited and iterated.

In edit mode, you provide the relevant context and files you want Copilot to work on. Copilot will suggest code edits based on your prompt and you can manually iterate on the code changes by providing follow-up prompts.

In agent mode, Copilot autonomously determines the relevant context and files, determines which tasks need to be performed, and offers both code changes and terminal commands to complete the request. It then iterates independently to achieve the desired outcome, fixing issues as they come up.

Copilot Edits agent mode uses a set of [_tools_](#agent-mode-tools) that allow it to perform specific tasks, such as editing files, running and monitoring terminal commands, or validating code. These tools can run in parallel to accomplish the requested task.

In both modes, you can [review the generated edits](#accept-or-discard-edits) and decide to keep or reject them.

## Use edit mode

In edit mode, you select which files to edit and provide the relevant context and prompt. Copilot will suggest code edits based on your prompt.

1. Open the Copilot Edits view (`kb(workbench.action.chat.openEditSession)`).

    * Select **Open Copilot Edits** from the Copilot menu in the VS Code title bar (`kb(workbench.action.chat.openEditSession)`).

    * Alternatively, select the **View** > **Appearance** > **Secondary Side Bar** (`kb(workbench.action.toggleAuxiliaryBar)`) to open the Secondary Side Bar, and then select the **Copilot Edits** view.

1. Select **Edit** from the mode dropdown.

    ![Screenshot showing the Copilot Edits view, highlighting edit mode selected.](images/copilot-edits/copilot-edits-edit-mode.png)

1. Use **Add Files** to indicate relevant context for your prompt to Copilot.

    You can also drag and drop files, folders, or editor tabs into the Copilot Edits view to add them as context.

    Copilot automatically adds the active editor as context. Use the `setting(chat.implicitContext.enabled)` setting to configure if the active editor should be added automatically.

    When you add one or more files to the prompt, Copilot Edits proposes other relevant files based on the Git history. Configure this with the `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` setting.

    > [!TIP]
    > Let Copilot find the right files automatically by adding `#codebase` in your prompt. Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results. Learn more about [adding context to your Copilot prompt](/docs/copilot/copilot-chat-context.md).

1. Enter a prompt to request code edits. Be specific and precise about the changes you want, and decompose larger tasks into smaller tasks.

    Copilot Edits streams the edits in the editor and shows the list of changed files in the Copilot Edits view.

1. Review the suggested edits and accept or discard the suggested edits.

    As a user, you stay in control of the changes that are made to your project and can [review the generated edits](#accept-or-discard-edits).

1. Iterate on the code changes.

    If you're not entirely happy with the edits, you can ask follow-up questions, such as "don't include the phone number", or "use jest instead of vitest". Or you can incrementally edit your code further. For example, when building a web app, use a series of prompts such as "add a navigation bar", "add a theme switcher", "store order items in JSON format in MongoDB".

## Use agent mode (preview)

In agent mode, Copilot Edits operates in a more autonomous and dynamic manner to achieve the desired outcome. Copilot agent mode determines the relevant context, offers both code changes and terminal commands, and iterates to remediate issues. To perform these tasks, agent mode uses a set of [_tools_](#agent-mode-tools).

> [!IMPORTANT]
> If you are a Copilot Business or Enterprise user, an administrator of your organization must opt in to the use of Copilot Editor Preview Features. Learn more about [managing policies for Copilot in your organization](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization).

To use agent mode in Copilot Edits:

1. Open your project in [VS Code Insiders](https://code.visualstudio.com/insiders).

    > [!NOTE]
    > Agent mode is in preview and currently available in [VS Code Insiders](https://code.visualstudio.com/insiders/). The gradual roll-out to VS Code Stable is ongoing and once agent mode is enabled for you, you will see a mode dropdown in the Copilot Edits view.

1. Open the Copilot Edits view (`kb(workbench.action.chat.openEditSession)`)

    * Select **Open Copilot Edits** from the Copilot menu in the VS Code title bar (`kb(workbench.action.chat.openEditSession)`).

    * Alternatively, select the **View** > **Appearance** > **Secondary Side Bar** (`kb(workbench.action.toggleAuxiliaryBar)`) to open the Secondary Side Bar, and then select the **Copilot Edits** view.

1. Select **Agent** from the mode dropdown

    ![Screenshot showing the Copilot Edits view, highlighting agent mode selected.](images/copilot-edits/copilot-edits-agent-mode.png)

1. Enter a prompt to request code edits.

    You don't have to specify which files to work on. In agent mode, Copilot Edits determines the relevant context and files to edit autonomously.

    ![Screenshot showing the Copilot Edits view, highlighting that Copilot searched the codebase for relevant files.](images/copilot-edits/copilot-edits-agent-search-codebase.png)

    Copilot Edits streams the edits in the editor and updates the list of changed files. In addition, Copilot might also suggest terminal commands to run. For example, to run tests or build the application.

1. Review the suggested code edits and confirm if Copilot can run the proposed terminal commands.

    As a user, you stay in control of the changes that are made to your project and can [review the generated edits](#accept-or-discard-edits).

    Copilot requests for confirmation before running terminal commands. Optionally, you can modify the proposed terminal command in the response, and then select **Continue** to run it.

    If your project has configured [tasks](/docs/editor/debugtest/tasks.md) in `tasks.json`, agent mode tries to run the appropriate tasks. For example, if you've defined a build task, agent mode will run the build task before running the application. Enable or disable running workspace tasks with the `setting(github.copilot.chat.agent.runTasks)` setting.

1. Copilot Edits detects issues and problems in code edits and terminal commands, and will iterate and perform additional actions to resolve them.

    For example, agent mode might run unit tests as a result of a code edit. If the tests fail, Copilot uses the test outcome to resolve the issue.

1. Continue to ask follow-up questions and iterate on the code changes that Copilot Edits provides.

Copilot Edits agent mode iterates multiple times to resolve issues and problems. The `setting(chat.agent.maxRequests)` setting controls the maximum number of requests that Copilot Edits can make in agent mode.

## Accept or discard edits

Copilot Edits gives you a code review flow where you can accept or reject each of the AI-generated edits. If you reject the edits, the modified files are restored to their previously accepted state.

Copilot lists the files that were edited in the changed files list. Files with pending Copilot edits also have an indicator in the Explorer view and editor tabs.

![Screenshot that shows the Copilot Edits view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files.png)

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` (<i class="codicon codicon-arrow-up"></i>) and `kbstyle(Down)` (<i class="codicon codicon-arrow-down"></i>) controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/copilot-edits/copilot-edits-file-review-controls.png)

To accept or reject a specific edit within a file, hover over the code edit and use the **Keep** or **Undo** controls for that edit.

Alternatively, you can also accept or reject the changes from the changed files list in the Copilot Edits view:

* Select **Keep** (`kb(chatEditing.acceptAllFiles)`) or **Undo** (`kb(chatEditing.discardAllFiles)`) in the changed files list to accept or discard all edits.

* Select the **Keep** or **Undo** icon on an individual file to apply the action to that specific file

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

With the `setting(chat.editing.autoAcceptDelay)` setting, you can configure a delay after which the suggested edits are automatically accepted. Hover over the editor overlay controls to cancel the auto-accept countdown.

When you close VS Code, the status of the pending edits is remembered. When you reopen VS Code, the pending edits are restored and you can still accept or discard the edits.

> [!NOTE]
> In agent mode, edits are automatically saved to disk, regardless if Auto Save (`setting(files.autoSave)`) is enabled. You can still review the edits and choose to reject them if needed.

## Interrupt an agent mode request

To interrupt an ongoing request, you can either **Pause** it or **Cancel** it. When you pause a request, Copilot stops processing the request and waits for your input.

When you pause a request, you can either choose to enter a new prompt, which cancels the current request, or you can choose to resume the current request.

When you cancel a request, Copilot interrupts and ends the active request. You can still [review and accept or reject](#accept-or-discard-edits) the changes that were made up to that point.

## Undo edits

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example because you want to use another implementation strategy.

You can use the **Undo Last Edit** control in the Copilot Edits view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edits, you can redo those edits again by using the **Redo Last Edit** control in the Copilot Edits view title bar.

![Screenshot showing the Copilot Edits view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control (`kbstyle(x)` icon) when hovering over a request in the Copilot Edits view to revert all edits that were made from that request onwards.

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
* `setting(chat.implicitContext.enabled)` _(preview)_ - configure if the active editor should be automatically added as context to the chat prompt.
* `setting(chat.editing.autoAcceptDelay)` - configure a delay after which suggested edits are automatically accepted, use zero to disable auto-accept (default: 0)
* `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ - let Copilot find the right files when you add `#codebase` to your prompt, similar to how agent mode works (default: `false`)
* `setting(chat.agent.maxRequests)` - maximum number of requests that Copilot Edits can make in agent mode (default: 5 for Copilot Free users, 15 for other users)
* `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)`_(Experimental)_ - suggest related files from git history in Copilot Edits (default: `false`)
* `setting(github.copilot.chat.agent.runTasks)` - run workspace tasks when using agent mode in Copilot Edits (default: `true`)

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
* Support for Jupyter notebooks, other custom text formats, and binary file formats is absent or untested.
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

You can drag and drop the Copilot Edits view into the Activity Bar to show it in the Primary Side Bar. You can also move it to the Secondary Side Bar. Learn more about [custom layouts](/docs/configure/custom-layout.md#workbench) in VS Code.

### Why would I use edit mode instead of agent mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: you might use edit mode if your request involves only code edits and you know the precise scope for the changes.
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
