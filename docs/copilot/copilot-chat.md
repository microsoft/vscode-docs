---
Order: 6
Area: copilot
TOCTitle: Copilot Chat
ContentId: 130ecf6c-6f06-4ddd-8b1d-f85f023af77b
PageTitle: AI-powered chat conversations with GitHub Copilot
DateApproved: 12/11/2024
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Use Copilot Chat in VS Code

With Copilot Chat in Visual Studio Code, ask questions via chat to get code suggestions, increase your code understanding, and even configure your editor. Instead of searching for answers in documentation or online forums, ask Copilot directly in VS Code and immediately apply the suggestions to your codebase.

Instead of using chat to get suggestions, Copilot can also directly make edits across multiple files in your project. In this case, you might consider using [Copilot Edits](/docs/copilot/copilot-edits.md). You can easily [move an existing chat conversation to Copilot Edits](/docs/copilot/copilot-edits.md#send-a-chat-request-to-copilot-edits).

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Prerequisites

* Access to GitHub Copilot in VS Code. See [Setup Copilot in VS Code](/docs/copilot/setup.md).

* Latest version of Visual Studio Code. See the [VS Code download page](https://code.visualstudio.com/Download).

## Access Copilot Chat in VS Code

You can submit prompts to Copilot in VS Code in several ways, depending on your workflow.

* [**Chat view**](#chat-view): have an AI assistant on the side to help with your questions and to provide code suggestions (`kb(workbench.action.chat.open)`)
* [**Inline Chat**](#inline-chat): start an inline chat conversation directly from the editor or integrated terminal to get suggestions in-place (`kb(workbench.action.terminal.chat.start)`)
* [**Quick Chat**](#quick-chat): ask a quick question and get back into what you're doing (`kb(workbench.action.quickchat.toggle)`)

You can also use the Copilot menu in the VS Code title bar to get started with the different chat experiences.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-chat-menu-command-center.png)

## Submit a prompt

You can ask Copilot Chat to give code suggestions, increase your code understanding, set up debugging for your project, or help with configuring VS Code.

1. Open the Chat view (`kb(workbench.action.chat.open)`)

    ![Screenshot of the Chat view in VS Code](./images/copilot-chat/copilot-chat-view.png)

    > [!TIP]
    > To get inline code suggestions directly in the editor, consider using [editor Inline Chat](#inline-chat) instead.

1. Enter a prompt in the chat input field or choose one of the prompt suggestions. Some example prompts:

    * Ask questions about coding and technology concepts (_"What is a linked list?"_, _"top 10 popular web frameworks"_)
    * Brainstorm ideas on how to best solve a coding problem (_"How to add auth to my project?"_)
    * Explain someone else's code (_"@workspace /explain"_, _"What does this code do?"_)
    * Propose code fixes (_"@workspace /fix"_, _"This method gives a FileNotFoundException"_)
    * Generate unit test cases or code documentation (_"@workspace /tests"_, _"@workspace /doc"_)
    * Ask about VS Code settings (_@vscode how do I disable the minimap?_)

    For more prompt examples, see the [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat) in the GitHub documentation.

1. Review the response from Copilot, and ask follow up questions if needed.

    The response may contain text, code blocks, buttons, links to code symbols, file trees, or other rich content.

    To see which resources Copilot used for the response, select the **Used n resources** dropdown in the chat response. You can help Copilot give more relevant answers by [attaching the context to your chat prompt](#add-context-to-your-chat-prompt).

    As you keep the conversation going, Copilot maintains the [history of your chat messages and responses](#chat-history), and provides related follow-up questions or commands in its response too.

> [!TIP]
> Type `/help` in the chat input field to get help about GitHub Copilot and how to interact with Copilot Chat.

## Add context to your chat prompt

Copilot tries to determine the intent and scope of your question based on your natural language chat prompt. In the chat response, select the **Used n resources** dropdown to see which resources Copilot used to generate the response.

To help Copilot give you the best and most relevant answers, add context to your chat prompt. For example, attach specific files, specific code symbols, the current editor selection, and more.

There are several ways to add context to your chat prompt:

* VS Code automatically adds the currently active editor as context. If you selected a code block in the editor, only that selection is added as context. You can disable adding the active editor by selecting the disable (_eye_) icon next to the context item.

    ![Screenshot of VS Code Copilot Chat view, showing the current editor selection as context.](./images/copilot-chat/copilot-chat-view-selection-context.png)

* Use the <i class="codicon codicon-attach"></i> button (`kb(workbench.action.chat.attachContext)`) and then select a type of context from the Quick Pick.

    ![Screenshot of VS Code Copilot Chat view, showing the Attach context button and context Quick Pick.](./images/copilot-chat/copilot-chat-view-attach-context.png)

    > [!TIP]
    > To quickly add multiple items from the attachment Quick Pick, use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the list, use the `kbstyle(Right)` key to add the item as context, and then repeat this for other items.

* Drag and drop editor tabs, or files or folders from the Explorer view, Search view, or editor breadcrumb onto the Chat view.

    <video src="images/copilot-chat/copilot-attach-dnd.mp4" title="Dragging files and editors into chat" autoplay loop controls muted></video>

* Use chat variables by typing the `#` character and you'll see a list of available chat variables.

    For example, you can use `#selection` to add the current editor selection to your chat prompt, `#file` to add a specific file from the workspace, or `#sym` to add a symbol from the workspace.

    ![Screenshot of VS Code Copilot Chat view, showing the chat variable picker.](./images/copilot-chat/copilot-chat-view-chat-variables.png)

    > [!TIP]
    > Type `#` and use it as an IntelliSense trigger for selecting files or symbols.

* Use the context menu **Copilot** > **Add File to Chat** on a file in the Explorer or Search view, or **Add Selection to Chat** for a text selection in the editor.

    These commands are also available in the Copilot menu in the VS Code title bar.

> [!NOTE]
> If possible, the full contents of the file will be included when you attach a file. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

## Chat participants

_Chat participants_ are like domain experts who have a specialty that they can help you with. You can invoke a chat participant by typing '@' in the chat input field, followed by the participant name. There are several built-in chat participants, and extensions can also contribute chat participants.

To list all installed chat participants, type `@` in the chat input field.

| Built-in participant | Description |
|------------------|-------------|
| `@workspace`     | Knows about the code in your workspace. Use it to navigate your code base, find relevant classes, files, and more.<br/><br/>**Example prompts:**<br/><ul><li>`@workspace how are notifications scheduled?`</li><li>`@workspace add form validation, similar to the newsletter page`</li></ul> |
| `@vscode`        | Knows about features, settings, and APIs of VS Code.<br/><br/>**Example prompts:**<br/><ul><li>`@vscode the name of that thing when vscode fake opens a file? And how to disable it?`</li><li>`@vscode /runCommand Enable the minimap`</li></ul> |
| `@terminal`      | Knows about the integrated terminal shell and its contents.<br/><br/>**Example prompts:**<br/><ul><li>`@terminal how to undo the last commit`</li><li>`@terminal help with #terminalLastCommand`</li></ul> |
| `@github`        | Knows about and has skills for GitHub repositories issues, PRs, and more. Can also perform web searches using the Bing API. Get more information about [using GitHub skills](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#using-github-skills-for-copilot).<br/><br/>**Example prompts:**<br/><ul><li>`@github What are all of the open PRs assigned to me?`</li><li>`@github #web what is the latest VS Code version`</li></ul> |

### Extension-contributed chat participants

You can install additional chat participants from either the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance) or from the [GitHub Marketplace](https://github.com/marketplace).

Chat participants contributed via a VS Code extension are _client-side_ extensions that have full access to the VS Code extension API surface.

Chat participants contributed via a GitHub App do not run on your local machine and must explicitly request access to your local editor context. After you install a GitHub App that contributes a chat participant, the first time you `@-mention` the participant in VS Code, you are asked to authorize its access to your local editor context.

> [!NOTE]
> To protect your privacy, your preference for sharing editor context with chat participants from GitHub App is saved on a per-workspace basis, unless you select 'Allow for All Workspaces'.

These are some examples of VS Code extensions that contribute a chat participant. Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance) or use the integrated Extensions view (`kb(workbench.view.extensions)`) and search by tag `chat-participant` (`tag:chat-participant`).

<div class="marketplace-extensions-chat"></div>

## Slash commands

_Slash commands_ provide a shortcut to specific instructions to avoid that you have to write complex prompts. To use a slash command in your prompt, type the `/` character, followed by a command. Chat participants can contribute their own slash commands.

For example, `@workspace /new Express app with pug and typescript` is a shortcut for generating a new workspace and scaffold a new Express app in TypeScript that uses the Pug view engine.

Some common built-in slash commands are:

* `/clear`: start a new chat session
* `/help`: get help about using GitHub Copilot
* `@workspace /explain` (or `/explain`): explain how the selected code works
* `@workspace /fix` (or `/fix`): propose a fix for the problems in the selected code
* `@workspace /new` (or `/new`): scaffold code for a new workspace or new file
* `@vscode /runCommand`: search or run a VS Code command

To list all available slash commands, type `/` in the chat input field.

## Change the AI model

Different Large Language Models (LLMs) are trained on different types of data and might have different capabilities and strengths. With Copilot Chat, you can change the language model that is used to generate responses.

Use the model picker in the chat input field to change the current model.

![Screenshot of the model picker in the Chat view](images/copilot-chat/copilot-chat-view-model-picker.png)

The list of available models might vary and change over time. See the GitHub Copilot documentation for more information about the [available language models](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#ai-models-for-copilot-chat).

## Inline Chat

Use Inline Chat to submit prompts and get code suggestions directly from within the editor, without leaving the context of your work.

To bring up Editor Inline Chat, in any file, use the `kb(inlinechat.start)` keyboard shortcut. Alternatively, open a file and then select **Editor Inline Chat** from the Copilot menu in the title bar.

![Screenshot that shows Editor Inline Chat in VS Code, asking to enter a prompt.](images/copilot-chat/inline-chat-new.png)

Copilot shows the code suggestions in-place with your code in the editor. You can accept (`kb(inlineChat.acceptChanges)`) or discard (`kb(inlineChat.close)`). If you're not happy with the suggestion, you can generate a new code suggestion for your prompt.

![Copilot Inline Chat asking to convert a sort algorithm to use bubble sort](images/copilot-chat/inline-chat-css-variables.png)

If you have a block of code selected in the editor, Copilot scopes your question to that selection.

You're not limited to asking for code changes. Use Inline Chat to ask more exploratory questions that emerge as you work with your codebase. For example, use prompts such as `Explain this piece of code`, or `How do I add functionality to do X?`.

![Copilot Inline Chat asking information about the used sorting algorithm](images/copilot-chat/inline-chat-question-example.png)

> [!TIP]
> Attach context to your Inline Chat prompt to include relevant files, code symbols, or other context. Learn more about [adding context to your chat prompt](#add-context-to-your-chat-prompt).

If you prefer to see code suggestions in a side-by-side diff view, configure the `setting(inlineChat.mode)` setting and set it to `preview`. The following example shows the `preview` mode for Inline Chat.

![Copilot Inline Chat preview mode, showing the code changes side-by-side](images/copilot-chat/inline-chat-preview-mode.png)

## Chat view

The Chat view is a dedicated view that is useful to keep open while you work on your code, and where you can have multi-turn conversations with Copilot.

To open the Chat view, use the `kb(workbench.action.chat.open)` keyboard shortcut or select **Open Chat** in the Copilot menu in the title bar.

By default, the Chat view is located in the Secondary Side Bar. The [Secondary Side Bar](/docs/editor/custom-layout.md#secondary-side-bar) is always positioned opposite the Primary Side Bar, so you can have the Chat view open at the same time as the Explorer, Source Control, or other views in the Primary Side Bar.

![Copilot Chat view in the Secondary Side Bar and Explorer view in the Primary Side Bar.](images/copilot-chat/copilot-chat-view.png)

> [!TIP]
> At any time, you can drag the Chat view to another location, or even open it as an editor. Learn more about [custom layouts in VS Code](/docs/editor/custom-layout.md).

### Apply a code block from chat

Chat responses could contain one or more code blocks. Depending on the language extension, the code block in the chat response might support IntelliSense, which enables you get information about methods and symbols by hovering over them, or to go to their definition.

To apply a code block to your codebase, hover over the code block and select the **Apply in Editor** button. Copilot tries to apply the proposed changes to your existing code.

![A Copilot Chat code block response.](images/copilot-chat/copilot-chat-view-code-block-actions.png)

Other actions that are available for code blocks are:

* Insert the code block at the current cursor position
* Copy the code block to the clipboard
* Insert the code block into the integrated terminal
* Insert the code block into a new file

If Copilot Chat detects that a code block contains a shell command, you can run it directly in the integrated terminal with **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`). This option creates or opens the active terminal and inserts the command text, ready for you to run.

![Copilot Chat code block to list files with Insert into Terminal option visible](images/copilot-chat/run-in-terminal.png)

> [!TIP]
> Navigate between code blocks with **Chat: Next Code Block** (`kb(workbench.action.chat.nextCodeBlock)`) and **Chat Previous Code Block** (`kb(workbench.action.chat.previousCodeBlock)`).

You can control the font for code blocks in chat with the following settings:

* `setting(chat.editor.fontFamily)`
* `setting(chat.editor.fontSize)`
* `setting(chat.editor.fontWeight)`
* `setting(chat.editor.lineHeight)`

### Chat history

You can create a chat session at any time by using the **New Chat** button (`kb(workbench.action.chat.newEditSession)`) in the Chat view.

Copilot Chat maintains the history of your previous chat sessions, which you can access by using the **Show Chats...** button in the Chat view or by using the **Chat: Show Chats...** command in the Command Palette.

A Quick Pick shows the list of previous chats, order by most recent. You can select a chat to open it in the Chat view.

![Screenshot of the Chat view with the Show Chats... button highlighted](images/copilot-chat/copilot-chat-view-show-chats.png)

Within a chat session, you can remove a specific prompt and the corresponding response from the conversation history of that session. Hover over the prompt and select the **x** control. It might be useful to delete one or more prompts to get more relevant responses.

![Chat view with multiple prompts, highlighting the 'x' control to delete a chat prompt and response.](images/copilot-chat/copilot-chat-delete-prompt.png)

You can export all prompts and responses for a chat session in a JSON file with the **Chat: Export Chat...** command in the Command Palette.

## Quick Chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or open Inline Chat in your editor, you can use the Quick Chat dropdown.

![Quick Chat dropdown](images/copilot-chat/quick-chat-dropdown.png)

Press `kb(workbench.action.quickchat.toggle)` on your keyboard to bring up Quick Chat. Alternatively, select **Quick Chat** in the Copilot menu in the title bar.

If you want to keep the conversation going, promote a Quick Chat conversation to a full Chat view session with the **Open in Chat View** button in the upper right of the dropdown.

![Quick Chat Open in Chat View button](images/copilot-chat/open-in-chat-view.png)

## Terminal Inline Chat

Similar to [Inline Chat in the editor](#inline-chat), you can bring up Copilot Inline Chat in the terminal to help you answer questions related to the terminal and shell commands.

The terminal Inline Chat uses the `@terminal` chat participant, which has context about the integrated terminal's shell and its contents. For example, you can ask questions such as "how to install npm packages", or "list the top 5 largest files in the src directory".

To start Inline Chat in the terminal, press the `kb(inlinechat.start)` keyboard shortcut while you're in the terminal.

![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

Once a command is suggested, use **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal, or **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal.

## Smart actions

For several common scenarios, you can use _smart actions_ to get help from Copilot without having to write a prompt. Examples of these smart actions are for tasks, such as generating commit messages, generating documentation, fixing code, explaining code, or reviewing code changes.

These smart actions are available throughout the VS Code UI. For example, you can access Copilot smart actions from the editor context menu or through Quick Fix actions.

In the editor, you can access smart actions by selecting a block of code, right-clicking, and then choosing **Copilot**.

![Editor context menu with the Copilot menu group expanded](images/copilot-chat/copilot-smart-action-menu.png)

The most powerful smart action is the **Fix** action that helps you correct coding issues. Select the _sparkle_ icon in the editor, and then choose **Fix using Copilot**. There is a corresponding `/fix` slash command.

![Quick fix a type mismatch error by using the Copilot smart action](images/copilot-chat/smart-action-fix-with-copilot.png)

Similarly, there's a **Copilot** > **Generate Docs** smart action (`/doc` slash command) to generate documentation for your code.

## Use voice interactions

With the voice control capabilities in VS Code, provided by the [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension, you can initiate a chat conversation by using your voice:

* Use your voice to dictate your chat prompt
* Use the "Hey Code" voice command to start a voice session with Copilot Chat
* Accelerate voice input for chat by using the "hold to speak" mode

Learn more about how to [use voice interactions in VS Code](/docs/editor/voice.md).

## Privacy and transparency

We emphasize responsible usage of AI, especially when it comes to source code. The `setting(inlineChat.acceptedOrDiscardBeforeSave)` setting, which is enabled by default, asks you for confirmation before saving code that was generated by Copilot.

When the setting is enabled, a file save operation waits for you to accept or discard any pending Inline Chat session. This also applies when Auto Save is enabled, which will be temporarily disabled until Inline Chat has ended.

![Inline Chat save consent message.](images/copilot-chat/inline-chat-save-consent.png)

To enable more workspace search features for private repositories, we require additional permissions. If we detect that we don't have these permissions already, we will ask for them at startup. Once granted, we'll securely store the session for the future.

![Modal window asking for additional authentication for a private repository.](images/copilot-chat/authentication.png)

Learn more about security, privacy, and transparency in the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/).

## Frequently asked questions

### How do I choose between Copilot Edits, Inline Chat, Chat view, and Quick Chat?

The following table provides a comparison of the capabilities of each interface.

| Capability                   | Copilot Edits | Chat view | Inline Chat | Quick Chat |
|------------------------------|:-------------:|:---------:|:-----------:|:----------:|
| Receive code suggestions     | ✅ | ✅ | ✅ | ✅  |
| Multi-file edits             | ✅ | ✅* |    | ✅* |
| Preview code edits in editor | ✅ |     | ✅ |     |
| Code review flow             | ✅ |     |    |      |
| Roll back changes            | ✅ |     |    |      |
| Attach context               | ✅ | ✅ | ✅ | ✅  |
| Use participants & commands  |    | ✅  |    | ✅  |
| Generate shell commands      |    | ✅  |    | ✅  |
| General-purpose chat         |    | ✅  | ✅ | ✅  |

\* _code blocks are included in the chat conversation and need to be applied to the right file manually_

## Additional resources

You can read more about [GitHub Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.

## Next steps

* Get started with the introductory [Copilot Chat tutorial](/docs/copilot/getting-started-chat.md).

* Make edits across multiple files with [Copilot Edits](/docs/copilot/copilot-edits.md).
