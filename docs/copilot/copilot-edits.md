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
# Copilot Edits (preview)

Use Copilot Edits to start an AI-powered code editing session where you can quickly iterate on code changes by using natural language. Based on your prompts, Copilot Edits proposes code changes across multiple files in your workspace. These edits are applied directly in the editor, so you can quickly review them in-place, with the full context of the surrounding code.

Copilot Edits is great for iterating on large changes across multiple files. It brings the conversational flow of Copilot Chat and fast feedback from Inline Chat together in one experience. Have an ongoing, multi-turn chat conversation on the side, while benefiting from inline code suggestions.

You can enable the Copilot Edits feature by setting the `setting(github.copilot.chat.edits.enabled)` setting to `true`.

The following video shows how you can use Copilot Edits to modify a basic Express app and add a new page, implement a navigation bar, and modify the design to include a theme switcher.

<video src="images/copilot-edits/copilot-edits-hero.mp4" title="Use Copilot Edits to modify an Express app" loop controls muted></video>

> [!NOTE]
> The Copilot Edits feature is currently in preview. You can provide feedback and report problems in [our issues](https://github.com/microsoft/vscode-copilot-release/issues).

## Get started with Copilot Edits

You use the Copilot Edits view to start an edit session. Making code changes is often an iterative process and consists of multiple steps before you're satisfied with the result. An edit session consists of a sequence of requests (or turns) to Copilot Edits for making code edits. An edit session can go on for as long as you like, and you can send as many requests as you need to get the code to where you want it.

There are different ways to get started open the Copilot Edits view:

* Use the `kb(workbench.action.chat.openEditSession)` keyboard shortcut

* Open the Copilot menu in the Command Center, and then select **Open Copilot Edits**

    ![Screenshot showing the Copilot menu in the Command Center, highlighting the Open Edit Session item](images/copilot-edits/copilot-command-center-open-edit-session.png)

* Use the **View: Toggle Copilot Edits** or **Copilot Edits: Focus on Copilot Edits View** command in the Command Palette (`kb(workbench.action.showCommands)`)

* Move a previous [chat conversation to Copilot](#send-a-chat-request-to-copilot-edits) Edits by selecting **Edit with Copilot** in the Chat view

    ![Screenshot highlighting the Edit with Copilot button in the Chat view to move a chat conversation to Copilot Edits.](images/copilot-edits/copilot-chat-edit-with-copilot.png)

When you first open the Copilot Edits view or start a new edit session, a welcome message is presented.

![Screenshot showing the Copilot Edits view and welcome message.](images/copilot-edits/copilot-edits-view-welcome.png)

## Add files to the working set

The first step when you start an edit session is to add the relevant files you want to work with. These files are also known as the _working set_ for your edit session. Copilot Edits does not make changes outside the working set, except when suggesting to create a new file.

> [!IMPORTANT]
> The working set is currently limited to 10 files.

![Screenshot of Copilot Edits, showing the working set contains 3 files, including the currently opened file.](images/copilot-edits/copilot-edits-working-set.png)

Copilot Edits automatically adds the active editor to the working set. If you have multiple [editor groups](/docs/getstarted/userinterface.md#editor-groups), the active editor for each group is added to the working set. To add all open editors, select **Add Files...**, and then choose **Open Editors** from the Files Quick Pick.

You have many options to add files to the working set:

* Select **Add Files...** or use the <i class="codicon codicon-attach"></i> icon (`kb(workbench.action.chat.attachContext)`), and then select files in the Quick Pick.

    > [!TIP]
    > To quickly select multiple items from a Quick Pick, use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the list, use the `kbstyle(Right)` key to add the item as context, and then repeat this for other items.

    ![Screenshot showing the Copilot Edits view and the file search Quick Pick, highlighting the buttons to add context.](images/copilot-edits/copilot-edits-add-files.png)

* Drag and drop editor tabs, or files or folders from the Explorer view, Search view, or editor breadcrumb onto the Copilot Edits view.

    When you drop a folder onto the Copilot Edits view, all files in that folder are added to the working set.

* Right-click on a file in the Explorer view or Search view and select **Add File to Copilot Edits**.

* Select a suggested file. When you add one or more files to the working set, Copilot Edits proposes other relevant files based on the Git history.

    <video src="images/copilot-edits/working-set-suggested-files.mp4" title="Add suggested files to Copilot Edits working set." autoplay loop controls muted></video>

    If you don't want to see these suggestions, you can disable them with the `setting(github.copilot.chat.edits.suggestRelatedFilesFromGitHistory)` setting.

To further help Copilot Edits provide better code suggestions, you can also add relevant context to your prompt, such as `#selection` or `#terminalSelection`. Reference context by typing the `#` symbol, or by using the <i class="codicon codicon-attach"></i> icon (`kb(workbench.action.chat.attachContext)`).

You can also add file or symbol references in your prompt by using `#` as an IntelliSense trigger for file or symbol suggestions. If Copilot decides to make changes to the files you mentioned in your prompt, they are added automatically to your working set.

## Request code edits

After you've added the relevant files, enter a chat prompt using natural language about the specific edit you want to make. For example, "Add a contact page that shows email, telephone and postal address", or "convert all unit tests to vitest".

> [!TIP]
> Be specific and precise about the changes you want Copilot Edits to make. If you have a larger task, decompose it in smaller tasks and iterate often to steer Copilot in the right direction.

In response to your prompt, Copilot Edits lists the files that are edited and provides a short description of the change. In addition, the suggested edits are applied to your code. As the edits stream in, Copilot Edits opens editor tabs for the affected files.

<video src="images/copilot-edits/copilot-edits-streaming-edits.mp4" title="Screen capture showing the edits from Copilot Edits stream into the open editor." loop controls muted></video>

When Copilot Edits generates edits for your project, it visually indicates which files in the working set are edited. Select a file in the working set to open it and view the proposed edits in the editor.

![Screenshot showing the Copilot Edits response for "Add a feedback field in the contact page" and showing the diff in the editor.](images/copilot-edits/copilot-edits-view-edits-in-file.png)

You can further iterate and send more requests in your edit session. If you're not entirely happy with the edits, you can ask follow-up question, such as "don't include the phone number", or "use jest instead of vitest". Or you can incrementally edit your code further. For example, when building a web app, use a series of prompts such as "add a navigation bar", "add a theme switcher", "store order items in JSON format in MongoDB".

## Save generated edits

Copilot Edits shows the generated edits in-place in your code but doesn't automatically save the changes to disk (notice the dirty indicator in the editor tab). As part of reviewing the edits, you might depend on automated tasks that are triggered by a file change, such as a build or test task. You can save the individual files or select **Save All** (`kb(chatEditing.saveAllFiles)`) in the working set to save the edits to disk.

![Screenshot showing the Copilot Edits view, highlighting the Save All button.](images/copilot-edits/copilot-edits-save-all.png)

When you save a file that contains AI-generated changes, a confirmation dialog is shown. In the dialog, you can check the option to always save files without asking for confirmation. When checked, the Save All control is no longer shown. You can reset the confirmation by using the `setting(chat.editing.alwaysSaveWithGeneratedChanges)` setting.

> [!NOTE]
> Saving the files doesn't mean that you automatically accept the changes. After saving the files, you can still accept or discard the generated edits.

## Accept or discard edits

Copilot Edits gives you a code review flow, where you can accept or discard each of the AI-generated edits. When you accept the AI-generated edits, the file changes are confirmed in the working set. If you discard the edits, the files are restored to their previously accepted state.

You can navigate between the different edits across your project by using the editor overlay controls. Use the **Accept** and **Discard** controls to accept or reject all changes for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor table bar.](images/copilot-edits/copilot-edits-file-review-controls.png)

For more fine-grained control over which edit you want to accept or reject within a file, hover over the code edit and select the **Undo** control to reject a change.

Alternatively, you can also accept or discard the changes from the working set:

* Select **Accept** (`kb(chatEditing.acceptAllFiles)`) or **Discard** (`kb(chatEditing.discardAllFiles)`) in the working set title bar to accept or discard all edits in the working set

* Select the **Accept** or **Discard** icon on an individual file in the working set to limit the action to that specific file

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

## Undo edits

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example because you want to use another implementation strategy.

You can use the **Undo Last Edit** control in the Copilot Edits view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edits, you can redo those edits again by using the **Redo Last Edit** control in the Copilot Edits view title bar.

![Screenshot showing the Copilot Edits view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control when hovering over a request in the Copilot Edits view to revert all edits that were made from that request onwards.

![Screenshot showing the Copilot Edits view, highlighting the Undo Edits control for a specific request.](images/copilot-edits/copilot-edits-undo-request.png)

> [!TIP]
> Sometimes Copilot starts walking down the wrong path when generating edits. Once that happens, it can be hard to convince it about another approach by adding to the conversation. In that case, use **Undo Last Edit** to the point where you agree with Copilot's responses. Then restart from there with a refined prompt.

## Send a chat request to Copilot Edits

Copilot Chat is great for asking questions and exploring ideas and code suggestions about your project or technology topics in general. Once you're ready to apply the suggested code changes, you can transfer your chat session over to Copilot Edits. The advantage of doing this is that you can let Copilot Edits apply all the changes across your project, instead of having to apply each code block individually from the Chat view.

In the Chat view, select the **Edit with Copilot** button at the bottom of the chat conversation to apply the suggested code changes with Copilot Edits. If you have multiple chat requests in the chat session, you can select which requests you want to transfer to Copilot Edits.

![Edit with Copilot showing for a chat exchange.](images/copilot-edits/chat-move.png)

After moving a chat request to Copilot Edits, the chat request is removed from the chat conversation in the Chat view.

## Settings

The following list contains the settings related to Copilot Edits. You can configure settings through the Setting editor (`kb(workbench.action.openSettings)`).

* `setting(github.copilot.chat.edits.enabled)` - enable or disable Copilot Edits
* `setting(chat.editing.confirmEditRequestRemoval)` - ask for confirmation before undoing an edit (default: `true`)
* `setting(chat.editing.confirmEditRequestRetry)` - ask for confirmation before performing a redo of the last edit (default: `true`)
* `setting(chat.editing.alwaysSaveWithGeneratedChanges)` - automatically save generated changes from Copilot Edits to disk (default: `false`)

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
* Although `#codebase` is great at finding relevant context for your query, subsequent generated edits are of widely varying quality. Explicitly adding files to your working set creates better results.
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

## Related content

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/copilot-vscode-features.md)
* [Use Copilot Chat for AI chat conversations](/docs/copilot/copilot-chat.md)
