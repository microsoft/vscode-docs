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
# Using Copilot Chat in VS Code

With the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension in Visual Studio Code, you can have AI-powered chat conversations to generate code, increase your code understanding, and even configure your editor. Instead of searching for answers in documentation or online forums, you can ask Copilot Chat directly in VS Code, and get code suggestions while you're in the flow of coding.

Copilot Chat integrates in your developer flow and gives you assistance where you need it:

* [**Inline Chat**](#inline-chat): start a chat conversation directly from the editor and get inline suggestions while you're coding
* [**Chat view**](#chat-view): have an AI assistant on the side to help with your questions and to provide code suggestions
* [**Quick Chat**](#quick-chat): ask a quick question and get back into what you're doing

> [!TIP]
> If you intend to make edits across multiple files in your project, you might consider using [Copilot Edits](/docs/copilot/copilot-edits.md). You can easily [move an existing chat conversation to Copilot Edits](/docs/copilot/copilot-edits.md#send-a-chat-request-to-copilot-edits).

## Copilot Chat use cases

You can use Copilot Chat in various developer scenarios, such as:

* Answering questions about coding and technology topics (_"What is a linked list?"_, _"top 10 popular web frameworks"_)
* Answering coding questions on how to best solve a problem (_"How to add auth to my project?"_)
* Explaining someone else's code and suggesting improvements (_"@workspace /explain"_, _"What does this code do?"_)
* Proposing code fixes (_"@workspace /fix"_, _"This method gives a FileNotFoundException"_)
* Generating unit test cases (_"@workspace /tests"_)
* Generating code documentation (_"/doc"_)

## Prerequisites

* To use GitHub Copilot, you must have an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

* To use GitHub Copilot in VS Code, you must have the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. When you install this extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

Follow these steps to [set up GitHub Copilot in VS Code](/docs/copilot/setup.md) by signing up for a subscription and installing the Copilot extension in VS Code.

## Getting started with Copilot Chat

### Open chat

Use the Copilot Chat menu in the VS Code Command Center to get started with the different chat experiences.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-chat-menu-command-center.png)

Or use one of the keyboard shortcuts to start a chat conversation with Copilot.

| Shortcut | Description |
|----------|-------------|
| `kb(workbench.action.chat.open)` | Open the **Chat view** and start a chat conversation with Copilot by using natural language. |
| `kb(workbench.action.quickchat.toggle)` | Open **Quick Chat** and ask a quick question to Copilot. |
| `kb(inlinechat.start)` | Start **Inline Chat** to send a chat request to Copilot directly from the editor. Use natural language or use `/` commands to give instructions to Copilot. |

### Chat context

Copilot tries to determine the intent and scope of your question based on your natural language chat prompt. To help Copilot give you the best and most relevant answers, add context to your chat prompt. For example, attach specific files or even the full contents of your workspace, the current editor selection, and more.

VS Code automatically adds the currently active editor as context to your chat prompt in the Chat view. If you have a block of code selected in the editor, only that selection is added as context. You can disable adding the active editor by selecting the disable icon on the context item.

![Screenshot of VS Code Copilot Chat view, showing the current editor selection as context.](./images/copilot-chat/copilot-chat-view-selection-context.png)

There are several ways to add context to your chat prompt:

* Use the <i class="codicon codicon-attach"></i> button (`kb(workbench.action.chat.attachContext)`) in any of the chat experiences.

    You can then select the specific type of context from a Quick Pick, such as the current selection, one or more files from the workspace, or one or more symbols from your source code.

    ![Screenshot of VS Code Copilot Chat view, showing the Attach context button and context Quick Pick.](./images/copilot-chat/copilot-chat-view-attach-context.png)

    > [!TIP]
    > To quickly add multiple items from the attachment Quick Pick, use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the list, use the `kbstyle(Right)` key to add the item as context, and then repeat this for other items.

* Drag and drop editor tabs, or files or folders from the Explorer view, Search view, or editor breadcrumb onto the Chat view.

    <video src="images/copilot-chat/copilot-attach-dnd.mp4" title="Dragging files and editors into chat" autoplay loop controls muted></video>

* Use chat variables by typing the `#` character and you'll see a list of available chat variables.

    For example, you can use `#selection` to add the current editor selection to your chat prompt, `#file` to add a specific file from the workspace, or `#sym` to add a symbol from the workspace.

    ![Screenshot of VS Code Copilot Chat view, showing the chat variable picker.](./images/copilot-chat/copilot-chat-view-chat-variables.png)

    > [!TIP]
    > Type `#` and use it as an IntelliSense trigger for file or symbol suggestions.

* Use the context menu **Copilot** > **Add File to Chat** (or **Add Selection to Chat** for a text selection) on a file in the Explorer or Search view.

> [!NOTE]
> If possible, the full contents of the file will be included when you attach a file. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

## Changing your AI model

The model picker in the chat input field enables you to change the language model that is used to generate responses. Select the model picker and choose one of the available language models.

You can use the model picker in the different chat experiences.

![Screenshot of the model picker in the Chat view](images/copilot-chat/copilot-chat-view-model-picker.png)

## Inline Chat

Inline Chat enables you to have a chat conversation with Copilot directly from the editor without leaving the context of your work. With Inline Chat, you can preview code suggestions in-place within your code, which can be useful for quickly iterating on code changes.

In any file, press `kb(inlinechat.start)` on your keyboard to bring up Copilot Inline Chat and get started. Alternatively, open a file and select **Editor Inline Chat** in the Copilot Chat Command Center menu.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-command-center-editor-inline-chat.png)

Depending on your question, Copilot suggests code modifications or refactorings for the file you're currently in. Copilot gives a preview of the updates, which you can then accept (`kb(inlineChat.acceptChanges)`) or discard (`kb(inlineChat.close)`). Optionally, you can generate a new code suggestion.

![Copilot Inline Chat asking to convert a sort algorithm to use bubble sort](images/copilot-chat/inline-chat-css-variables.png)

If you have a block of code selected in the editor, Copilot scopes your question to the selection.

You can also ask Copilot more exploratory questions that emerge as you write and iterate on code, such as "Explain this piece of code", or "How do I add functionality to do X?".

![Copilot Inline Chat asking information about the used sorting algorithm](images/copilot-chat/inline-chat-question-example.png)

With the `setting(inlineChat.mode)` setting, you can configure how Inline Chat shows updates in the editor. The default setting value is `live`, which means that the updates are applied directly in the editor. If you prefer to preview the changes side-by-side instead, you configure the setting to `preview`.

The following example shows the `preview` mode for Inline Chat.

![Copilot Inline Chat preview mode, showing the code changes side-by-side](images/copilot-chat/inline-chat-preview-mode.png)

## Chat view

### Open the Chat view

The Chat view enables you to have a chat conversation with Copilot in a separate view. By default, the Chat view is located in the **Secondary Side Bar**. The Secondary Side Bar is always positioned opposite the Primary Side Bar, so you can have the Chat view open at the same time as the Explorer, Source Control, or other views in the Primary Side Bar.

![Copilot Chat view in the Secondary Side Bar and Explorer view in the Primary Side Bar.](images/copilot-chat/copilot-chat-view.png)

You can access the Chat view by pressing `kb(workbench.action.chat.open)` or by selecting **Open Chat** in the Copilot Chat Command Center menu.

![Screenshot of the Copilot Chat menu in the VS Code Command Center, highlighting Open Chat](images/copilot-chat/copilot-command-center-open-chat.png)

You can also use the layout controls in the VS Code title bar to toggle the Secondary Side Bar, which contains the Chat view.

![Layout controls in the VS Code title bar, highlighting the Secondary Side Bar toggle.](images/copilot-chat/layout-controls-toggle-secondary-side-bar.png)

> [!TIP]
> At any time, you can drag the Chat view to another location, or even open it as an editor. Learn more about [custom layouts in VS Code](/docs/editor/custom-layout.md).

### Enter a chat prompt

To get started, type your question in the chat input field. For example, ask a question about a general programming topic, or ask about the specific code in your workspace. Make sure to [attach the relevant context](#chat-context) for your chat prompt to help Copilot give you more relevant answers.

![Copilot explaining a devcontainer.json file](images/copilot-chat/devcontainer-explain.png)

> [!TIP]
> Type `/help` in the chat input box to get help about GitHub Copilot and how to interact with Copilot Chat.

Copilot Chat can provide rich and interactive results that contain: simple text, images, buttons for invoking VS Code commands, references URIs or editor locations, or file trees (for example, to show a workspace preview when a chat participant proposes to create a new workspace).

The following example (_"@workspace /new Express with TypeScript and pug"_) shows a chat prompt to create an Express app, which returns a tree view with a suggested workspace structure and a button to create a new workspace.

![Copilot response containing rich results, such as a file tree with a proposed workspace structure, and a button to create a new workspace](images/copilot-chat/copilot-chat-view-workspace-file-tree.png)

As you keep the conversation going, Copilot maintains the [history of your chat messages and responses](#conversation-history), and provides related follow-up questions or commands in its response too.

### Code blocks

Depending on your question, Copilot Chat might return source code in a code block. Depending on the language extension, the code block in the chat response might support IntelliSense, which enables you get information about methods and symbols by hovering over them, or to go to their definition.

![A Copilot Chat code block response.](images/copilot-chat/copilot-chat-view-code-block-actions.png)

Hovering over the code block presents options to **Apply in Editor**, **Insert at Cursor**, and **Copy**.

The **More Actions** (`...`) button gives options to **Insert Into New File** and **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`).

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

Copilot Chat maintains a history of your previous chat conversations, which you can access by using the **Show Chats...** button in the Chat view or by using the **Chat: Show Chats...** command in the Command Palette.

A Quick Pick shows the list of previous chats, order by most recent. You can select a chat to open it in the Chat view.

![Screenshot of the Chat view with the Show Chats... button highlighted](images/copilot-chat/copilot-chat-view-show-chats.png)

## Quick Chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or open Inline Chat in your editor, you can use the Quick Chat dropdown.

![Quick Chat dropdown](images/copilot-chat/quick-chat-dropdown.png)

Press `kb(workbench.action.quickchat.toggle)` on your keyboard to bring up Quick Chat. Alternatively, select **Quick Chat** in the Copilot Chat Command Center menu.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-command-center-quick-chat.png)

You can type questions, scope your questions with [chat participants](#chat-participants) and [slash commands](#slash-commands), and promote the discussion to a full Chat view session with the **Open in Chat View** button in the upper right of the dropdown.

![Quick Chat Open in Chat View button](images/copilot-chat/open-in-chat-view.png)

## Multi-turn conversations

When you ask a question in Copilot Chat, you aren't stuck with the first response. Keep the chat conversation open and continue to iterate and prompt Copilot to improve the suggested solution. Copilot has both the context of the generated code and your current conversation history. As you keep asking additional questions, Copilot further refines the response according to your requirements.

Here's an example using Inline Chat to create a function to calculate Fibonacci numbers:

![First response from Copilot for a function to calculate Fibonacci numbers](images/prompt-crafting/fibonacci-first.png)

If you prefer a solution that doesn't use recursion, update the chat prompt and submit it to Copilot to get a different response.

![Ask Copilot to not use recursion and new result](images/prompt-crafting/fibonacci-second.png)

Learn more about how to [iterate over a Copilot chat conversation](/docs/copilot/prompt-crafting.md#iterate-on-your-solution).

## Terminal Inline Chat

Similar to Inline Chat in the editor, you can bring up Copilot Inline Chat in the terminal to help you answer questions related to the terminal and shell commands. The terminal Inline Chat uses the `@terminal` chat participant, which has context about the integrated terminal's shell and its contents. For example, you can ask questions such as "how to install npm packages", or "list the top 5 largest files in the src directory".

To start Inline Chat in the terminal, press the `kb(inlinechat.start)` keyboard shortcut.

![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

Once a command is suggested, use **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal, or **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal.

Optionally, you can edit the command directly in the Copilot response before running it by placing the cursor in the response or by pressing `kbstyle(Ctrl+down)`, `kbstyle(Tab)`, `kbstyle(Tab)` on Windows & Linux, or `kbstyle(Cmd+down)`, `kbstyle(Tab)`, `kbstyle(Tab)` on macOS.

## Smart actions

Copilot Chat lets you use natural language to get help from Copilot. For several common scenarios, you can use *smart actions* to get help from Copilot without having to write a prompt. Examples of these smart actions are for tasks, such as generating commit messages, generating documentation, fixing code, explaining code, or reviewing code changes.

These smart actions are available throughout the VS Code UI. For example, you can access Copilot smart actions from the editor context menu or through Quick Fix actions.

In the editor, you can access smart actions by selecting a block of code, right-clicking, and then choosing **Copilot**.

![Editor context menu with the Copilot menu group expanded](images/copilot-chat/copilot-smart-action-menu.png)

The most powerful smart action is the **Fix** action. Here is a relatively simple TypeScript calculator with an error noting that "Argument of type 'string' is not assignable to parameter of type 'number'". Select the *sparkle* icon, and then choose **Fix**.

![Quick fix a type mismatch error by using the Copilot smart action](images/copilot-chat/smart-action-fix-with-copilot.png)

Similar to `/fix`, the `/doc` smart action is a popular action. To use `/doc`, select a block of code, right-click, and choose **Copilot** > **Generate Docs**. Copilot will generate a documentation comment for your code.

![Inline Chat /doc results adding JSDoc comment for a TypeScript function](images/copilot-chat/generate-docs-example.png)

You can also invoke some of these smart actions by using their equivalent [slash command](#slash-commands) in chat. For example, you can use `/fix` to fix the problems in the selected code, or `/doc` to generate documentation for the selected code.

## Chat participants

*Chat participants* are like experts who have a specialty that they can help you with. You can invoke a chat participant by typing '@' in the chat input field, followed by the participant name. There are several built-in chat participants:

* `@workspace` has context about the code in your workspace and can help you navigate it, finding relevant files or classes.
* `@vscode` knows about commands and features in the VS Code editor itself, and can help you use them.
* `@terminal` has context about the integrated terminal shell and its contents.
* `@github` has knowledge about your GitHub repositories, issues, pull requests, and topics, and can also perform web searches using the Bing API.

Extensions can also contribute chat participants to provide specialized help for their domain. To find the list of available chat participants, type `@` in the chat input field.

These are some examples of extensions in the Visual Studio Marketplace that contribute a chat participant to the Chat view in VS Code. Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance) or use the integrated [Extensions view](/docs/editor/extension-marketplace.md) and search for more extensions by using the `chat-participant` tag.

<div class="marketplace-extensions-chat"></div>

### @workspace

The `@workspace` chat participant knows how to gather context about the code in your workspace, can help you navigate it, find relevant classes, files, and more.

![Asking the @workspace chat participant about where a URL is specified in an Express app](images/copilot-chat/workspace-agent-example.png)

Because it has all of the necessary context, `@workspace` can answer the kinds of questions that developers are much more likely to ask. For example, questions that pertain to how different parts of the code interact:

* "`@workspace` how are notifications scheduled?"

Or questions that require knowledge of related code, dependencies, and design patterns:

* "`@workspace` add form validation, similar to the newsletter page"

### @vscode

VS Code can be customized in so many ways that people get pleasantly surprised when they discover some hidden functionality. To help you to unlock the full power of VS Code, we created `@vscode`.

This chat participant knows all about VS Code and can help you bridge the gap between natural language and VS Code commands and customizations. `@vscode` internally uses tools that give it access to the index of all the settings and commands and we are in the process of adding a tool so that this chat participant can also use the VS Code documentation. Now you can ask vague questions like:

* "`@vscode` the name of that thing when vscode fake opens a file? And how to disable it?"
* "`@vscode` how do I change my VS Code colors?"

![Asking @vscode how to change the VS Code colors](images/copilot-chat/agent-example.png)


### @terminal

With `@terminal` you can ask questions about the integrated terminal shell, its buffer, and the current selection. In the following example, you use the Quick fix **Explain using Copilot** in the terminal to get information about a failed shell command.

Notice how the prompt in the Chat view is populated with `@terminal #terminalLastCommand` to help correct the error. `#terminalLastCommand` is a chat variable, which allows you to add more context to the chat prompt. Learn more about [adding context to chat](#chat-context).

![Quick Chat with @terminal #terminalLastCommand and Copilot's answer](images/copilot-chat/terminal-command-explanation.png)

> [!NOTE]
> The terminal doesn't pull in the workspace context automatically, so questions about your workspace could take some time.

### @github

With `@github` you can ask questions about your GitHub repositories and your commits, issues, pull requests, and more. The following are examples of how you can use the `@github` participant:

* `@github What are all of the open PRs assigned to me?`
* `@github What are the latest issues assigned to me?`
* `@github When was the latest release?`

Get more information about the available [GitHub skills](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#currently-available-skills) in the GitHub documentation.

### Extension-contributed chat participants

You can install additional chat participants from either the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/VSCode) or from the [GitHub Marketplace](https://github.com/marketplace).

Chat participants contributed via a VS Code extension are *client-side* extensions that have full access to the VS Code extension API surface.

Chat participants contributed via a GitHub App do not run on your local machine and must explicitly request access to your local editor context. After you install a GitHub App that contributes a chat participant, the first time you `@-mention` the participant in VS Code, you are asked to authorize its access to your local editor context.

> [!NOTE]
> To protect your privacy, your preference for sharing editor context with chat participants from GitHub App is saved on a per-workspace basis, unless you select 'Allow for All Workspaces'.

## Slash commands

Chat participants can provide shortcuts to specific functionality by using *slash commands*. These commands provide a concise and structured way to interact with chat participants and to give them instructions. You can reference slash commands in your chat prompt by typing the participant, followed by `/` and the command name.

For example, the `@workspace` participant has a slash command `/new` to scaffold a new workspace or a new file. Typing `@workspace /new Node.js Express Pug TypeScript` in the chat input field creates a new workspace with a Node.js Express Pug TypeScript project.

Some examples of built-in slash commands are:

* `/clear`: start a new chat session
* `/help`: get help about using GitHub Copilot
* `@workspace /explain` (or `/explain`): explain how the selected code works
* `@workspace /fix` (or `/fix`): propose a fix for the problems in the selected code
* `@workspace /new` (or `/new`): scaffold code for a new workspace or new file

To view the list of build-in participants and their commands, type `@` in the chat input field or select the <i class="codicon codicon-mention"></i> icon.

## Conversation history

Copilot keeps track of the history of your conversation in the Chat view. Copilot can use this information as context in subsequent prompts, for example when you have a [multi-turn conversation](#multi-turn-conversations).

For example, when you first ask "what is the number data type in TypeScript?" and then ask "Can you use it for decimal numbers too?", Copilot knows that you're still referring to the `number` data type.

![Chat view with multiple prompts, where Copilot understands that 'it' refers to the first prompt.](images/copilot-chat/chat-view-history.png)

You can delete a prompt and the corresponding response from the conversation history by hovering over the prompt and selecting the **x** control. It might be useful to delete one or more prompts to get more relevant responses.

![Chat view with multiple prompts, highlighting the 'x' control to delete a chat prompt and response.](images/copilot-chat/copilot-chat-delete-prompt.png)

You can export all prompts and responses for a chat session in a JSON file with the **Chat: Export Chat...** command in the Command Palette.

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
