---
Order: 8
Area: copilot
TOCTitle: Copilot Edits
ContentId: 393f3945-0821-42ca-bdd7-fb82affacb6a
PageTitle: Copilot Edits
DateApproved: 10/29/2024
MetaDescription: Get started with Copilot Edits to start an AI-powered code editing session across multiple files in your project.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Copilot Edits

Use Copilot Edits to start an AI-powered code editing session where you can quickly iterate on code changes by using natural language. Based on your prompts, Copilot Edits proposes code changes across multiple files in your workspace. These edits are applied directly in the editor, so you can quickly review them in-place, with the full context of the surrounding code.

Copilot Edits is great for iterating on large changes across multiple files. It brings the conversational flow of Copilot Chat and fast feedback from Inline Chat together in one experience. Have an ongoing, multi-turn chat conversation on the side, while benefiting from inline code suggestions.

You can enable the Copilot Edits feature by setting the `setting(github.copilot.chat.edits.enabled)` setting to `true`.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

The following video shows how you can use Copilot Edits to modify a basic Express app and add a new page, implement a navigation bar, and modify the design to include a theme switcher.

<video src="images/copilot-edits/copilot-edits-hero.mp4" title="Use Copilot Edits to modify an Express app" loop controls muted></video>

> [!NOTE]
> The Copilot Edits feature is currently in preview. You can provide feedback and report problems in [our issues](https://github.com/microsoft/vscode-copilot-release/issues).

## Edit with Copilot

Adding new features, fixing bugs, or refactoring existing code is often an incremental process. With Copilot Edits, you start an edit session where you can pull in multiple relevant files, and iterate over your code changes by sending chat prompts.

There are different ways to start an edit session:

* Use the `kb(workbench.action.chat.openEditSession)` keyboard shortcut

* Open the Copilot menu in the Command Center, and then select **Open Copilot Edits**

    ![Screenshot showing the Copilot menu in the Command Center, highlighting the Open Edit Session item](images/copilot-edits/copilot-command-center-open-edit-session.png)

* Use the **View: Toggle Copilot Edits** or **Copilot Edits: Focus on Copilot Edits View** command in the Command Palette (`kb(workbench.action.showCommands)`)

When you first open the Copilot Edits view or start a new edit session, a welcome message is presented. The Copilot Edits view has an input field to enter your prompt, and a list of files you want to work on (_working set_).

![Screenshot showing the Copilot Edits view and welcome message.](images/copilot-edits/copilot-edits-view-welcome.png)

## Add files to the working set

The first step when you start an edit session is to add the relevant files you want to work with. These files are also known as the _working set_ for your edit session. Copilot Edits does not make changes outside the working set, except when suggesting to create a new file.

> [!IMPORTANT]
> The working set is currently limited to 10 files.

![Screenshot of Copilot Edits, showing the working set contains 3 files, including the currently opened file.](images/copilot-edits/copilot-edits-working-set.png)

Copilot Edits automatically adds the open editor to the working set. If you have multiple [editor groups](/docs/getstarted/userinterface.md#editor-groups), the open editor for each group is added to the working set. To add all open editors, select **Add Files...**, and then choose **Open Editors** from the Files Quick Pick.

You can add files to the working set by selecting the **Add Files...** button or the <i class="codicon codicon-attach"></i> icon (`kb(workbench.action.chat.attachContext)`), and then choosing the files in the Quick Pick.

> [!TIP]
> To quickly select multiple items from a Quick Pick, use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the list, use the `kbstyle(Right)` key to add the item as context, and then repeat this for other items.

![Screenshot showing the Copilot Edits view and the file search Quick Pick, highlighting the buttons to add context.](images/copilot-edits/copilot-edits-add-files.png)

You can also add files to the working set by dragging and dropping files or editor tabs onto the Copilot Edits view.

To help Copilot Edits provide better code suggestions, you can add relevant context to your prompt, such as `#selection` or `#terminalSelection`. Reference context by typing the `#` symbol, or by using the Attach Context control (`kb(workbench.action.chat.attachContext)`).

You can also add file references in your prompt by using `#` as an IntelliSense trigger for file suggestions. If Copilot decides to make changes to the files you mentioned in your prompt, they are added automatically to your working set.

## Request code edits

After you've added the relevant files, enter a chat prompt using natural language about the specific edit you want to make. For example, "Add a contact page that shows email, telephone and postal address", or "convert all unit tests to vitest".

> [!TIP]
> Be specific and precise about the changes you want Copilot Edits to make. If you have a larger task, decompose it in smaller tasks and iterate often to steer Copilot in the right direction.

In response to your prompt, Copilot Edits determines which files in your working set to change and adds a short description of the change. Notice that Copilot Edits opens editor tabs for the affected files, where the edits start to stream into. Changes are presented inline in the code, showing the before and after situation. Use the **View Changes** control to view all edits in a multi-file diff view.

![Screen capture showing the edits from Copilot Edits stream into the open editor.](images/copilot-edits/copilot-edits-streaming-edits.gif)

When Copilot Edits generates edits for your project, it visually indicates which files in the working set are edited. Select a file in the working set to open it and view the proposed edits in the editor.

![Screenshot showing the Copilot Edits response for "Add a feedback field in the contact page" and showing the diff in the editor.](images/copilot-edits/copilot-edits-view-edits-in-file.png)

Copilot Edits shows the generated edits in-place in your code but doesn't automatically save the changes to disk (notice the dirty indicator in the editor tab). As part of reviewing the edits, you might depend on automated tasks that are triggered by a file change, such as a build or test task. You can save the individual files or select **Save All** (`kb(chatEditing.saveAllFiles)`) in the working set to save the edits to disk.

![Screenshot showing the Copilot Edits view, highlighting the Save All button.](images/copilot-edits/copilot-edits-save-all.png)

When you save a file that contains AI-generated changes, a confirmation dialog is shown. In the dialog, you can check the option to always save files without asking for confirmation. When checked, the Save All control is no longer shown. You can reset the confirmation by using the `setting(chat.editing.alwaysSaveWithGeneratedChanges)` setting.

> [!NOTE]
> Saving the files doesn't mean that you automatically accept the changes. After saving the files, you can still accept or discard the generated edits.

You can further iterate and send more requests in your edit session. If you're not entirely happy with the edits, you can ask follow-up question, such as "don't include the phone number", or "use jest instead of vitest". Or you can incrementally edit your code further. For example, when building a web app, use a series of prompts such as "add a navigation bar", "add a theme switcher", "store order items in JSON format in MongoDB".

## Accept or discard edits

Copilot Edits shows the generated edits in-place in your code and provides you with a code review flow, where you can accept or discard each of the AI-generated edits. When you accept the AI-generated edits, the file changes are confirmed in the working set and saved to disk. If you discard the edits, the files are restored to their previously accepted state.

To accept or discard edits generated by Copilot Edits:

* Select **Accept** (`kb(chatEditing.acceptAllFiles)`) or **Discard** (`kb(chatEditing.discardAllFiles)`) in the working set title bar to accept or discard all edits in the working set

* Select the **Accept** or **Discard** icon on an individual file in the working set to limit the action to that specific file

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

As you're reviewing edits for a file, you can use the up (`kb(chatEditor.action.navigatePrevious)`) and down (`kb(chatEditor.action.navigateNext)`) controls to quickly navigate to the previous or next edit in the file. You can then use the **Accept Chat Edit** and **Reject Chat Edit** controls for individual edits in a file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor table bar.](images/copilot-edits/copilot-edits-file-review-controls.png)

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example because you want to use another implementation strategy.

You can use the **Undo Last Edit** control in the Copilot Edits view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edits, you can redo those edits again by using the **Redo Last Edit** control in the Copilot Edits view title bar.

![Screenshot showing the Copilot Edits view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control when hovering over a request in the Copilot Edits view to revert all edits that were made from that request onwards.

![Screenshot showing the Copilot Edits view, highlighting the Undo Edits control for a specific request.](images/copilot-edits/copilot-edits-undo-request.png)

> [!TIP]
> Sometimes Copilot starts walking down the wrong path when generating edits. Once that happens, it can be hard to convince it about another approach by adding to the conversation. In that case, use **Undo Last Edit** to the point where you agree with Copilot's responses. Then restart from there with a refined prompt.

## Send a chat request to Copilot Edits

Copilot Chat is great for asking questions and exploring ideas and code suggestions about your project or technology topics in general. When you're ready to transition to Copilot Edits and apply code changes, it might be useful to also transfer the attached context from your chat conversation.

In the Chat view, you can enter a chat prompt and directly send it to Copilot Edits, while keeping the attached context. Select the **Send** button options menu, and then select the **Send to Copilot Edits** option (or press `kb(workbench.action.chat.sendToChatEditing)`).

![Screenshot of the Chat view, showing the send button options menu and the option to send the prompt to Copilot Edits.](images/copilot-edits/send-to-copilot-edits.png)

Notice that the Copilot Edits view opens, and that your prompt and the attached context are transferred over from the Chat view and immediately submitted.

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
