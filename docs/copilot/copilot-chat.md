---
Order: 3
Area: copilot
TOCTitle: Copilot Chat
ContentId: 130ecf6c-6f06-4ddd-8b1d-f85f023af77b
PageTitle: AI-powered chat conversations with GitHub Copilot
DateApproved: 02/28/2024
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
---
# Using Copilot Chat in VS Code

When developing a project or learning something new, it can be a significant help to get AI assistance on your questions, large or small. [GitHub Copilot](https://github.com/features/copilot) enables an interactive chat experience that understands the context of your code, workspace, extensions, settings, and more.

The [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension gives you a chat interface that lets you ask and receive answers to coding-related questions directly within Visual Studio Code, without requiring you to navigate documentation or search online forums. Copilot Chat can help you with a variety of coding-related tasks, like offering you code suggestions, providing natural language descriptions of a piece of code's functionality and purpose, generating unit tests for your code, and proposing fixes for bugs in your code.

Copilot Chat integrates in your developer flow and gives you assistance where you need it:

* Start an **inline chat** conversation directly from the editor for help while you're coding
* Use the **Chat view** to have an AI assistant on the side to help you at any time
* Launch **Quick Chat** to ask a quick question and get back into what you're doing

Copilot Chat might generate formatted and interactive results that contain rich text, code blocks, links to context that the model used, such as source code files, or buttons to access VS Code functionality.

## Getting started

> **Note**: After reviewing this topic, you can get started with the introductory [Copilot Chat tutorial](./getting-started-chat.md).

To get started with GitHub Copilot Chat, you need:

* The [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension. When you install the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension, the Copilot Chat extension is also installed.

* A subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/getting-started.md#set-up-vs-code-for-github-copilot).

## Inline chat

A key functionality of Copilot is answering questions inline, as you're coding. This allows you to harness the power of AI while staying in your existing editor workflow.

In any file, you can press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat. You can ask Copilot questions that emerge as you write and iterate on code, such as "Explain this piece of code", or "How do I add functionality to do X?".

![Copilot inline chat asking information about the used sorting algorithm](images/copilot-chat/inline-chat-question-example.png)

If you have code selected in the editor, Copilot scopes your question to the selection.

Depending on your question, Copilot can also suggest code modifications. Copilot gives a preview of the updates, which you can then accept (`kb(inlineChat.acceptChanges)`) or discard (`kb(inlineChat.discard)`). Optionally, you can generate a new code suggestion.

![Copilot inline chat asking to convert a sort alogrithm to use bubble sort](images/copilot-chat/inline-chat-convert-sort.png)

With the `inlineChat.mode` setting, you can configure how inline chat shows updates in the editor. The default setting value is `live`, which means that the updates are applied directly in the editor, and you can compare the changes by using the inline diff viewer. If you prefer to preview the changes side-by-side, you configure the setting to `preview`.

The following example shows the `preview` mode for inline chat.

![Copilot inline chat preview mode, showing the code changes side-by-side](images/copilot-chat/inline-chat-preview-mode.png)

## Chat view

The Chat view enables you to have a chat conversation with Copilot in a separate view. You can access the Chat view via the Activity Bar or by pressing `kb(workbench.action.chat.open)`:

![Copilot view in VS Code Activity Bar](images/copilot-chat/copilot-view.png)

Copilot suggests potential questions to get you started, such as "/fix the problems in my code". You can select any of these suggestions, or use the chat input field to type your own chat prompt:

![Copilot explaining a devcontainer.json file](images/copilot-chat/devcontainer-explain.png)

> **Tip**: you can drag the Chat view to another location, or even open it as an editor. Learn more about [custom layouts in VS Code](/docs/editor/custom-layout.md).

Copilot Chat can provide rich and interactive results that contain: simple text, images, buttons for invoking VS Code commands, references URIs or editor locations, or file trees (for example, to show a workspace preview when a chat participant proposes to create a new workspace).

The following example shows a chat prompt to create an Express app, which returns a tree view with a suggested workspace structure and a button to create a new workspace.

![Copilot response containing rich results, such as a file tree with a proposed workspace structure, and a button to create a new workspace](images/copilot-chat/chat-view-rich-response.png)

As you continue asking questions, Copilot maintains the history of your conversation, and provides related follow-up questions or commands in its response too.

> **Tip**: To get help about GitHub Copilot and how to interact with Copilot Chat, you can type `/help` in the chat input box.

### Code blocks

Depending on your question, Copilot Chat might return source code in a code block.

![A Copilot Chat code block with JSON to change the color of comments in VS Code](images/copilot-chat/copy-code-block.png)

Hovering over the code block presents options to **Copy** and **Insert at Cursor** (`kb(workbench.action.chat.insertCodeBlock)`).

The **More Actions** (`...`) button gives options to **Insert Into New File** and **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`).

![Copilot Chat code block with More Actions button expanded](images/copilot-chat/more-actions-code-block.png)

If Copilot Chat detects that a code block contains a command, you can run it directly in the integrated terminal with **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`). This option creates or opens the active terminal and inserts the command text, ready for you to run.

![Copilot Chat code block to list files with Insert into Terminal option visible](images/copilot-chat/run-in-terminal.png)

<!-- TODO: include info about code vulnerabilities in generated code -->

You can control the font for code blocks in chat with the following settings:

* `chat.editor.fontFamily`
* `chat.editor.fontSize`
* `chat.editor.fontWeight`
* `chat.editor.lineHeight`

## Quick chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or open inline chat in your editor, you can use the Quick Chat dropdown. To open Quick Chat, you can run **Chat: Open Quick Chat** in the Command Palette, or use the `kb(workbench.action.quickchat.toggle)` keyboard shortcut.

![Quick Chat dropdown](images/copilot-chat/quick-chat-dropdown.png)

You can type questions, scope your questions with [chat participants](#chat-participants) and [slash commands](#slash-commands), and promote the discussion to a full Chat view session with the **Open in Chat View** button in the upper right of the dropdown.

![Quick Chat Open in Chat View button](images/copilot-chat/open-in-chat-view.png)

## Chat smart actions

Smart actions are integrated in your VS Code flow (for example, in Quick Fix and context menus) and they do not require you to write any prompt at all.

![Editor context menu with the Copilot menu group expanded](images/copilot-chat/editor-copilot-menu.png)

The most powerful smart action is `/fix`. Here is a relatively simple TypeScript calculator with an error noting that "Argument of type 'string' is not assignable to parameter of type 'number'". Select the *sparkle* icon, and then choose **Fix using Copilot**.

![Quick fix a type mismatch error by using the Copilot smart action](images/copilot-chat/editor-copilot-menu.png)

Similar to `/fix`, the `/doc` smart action is popular with users. To use `/doc`, select a block of code, right-click, and choose **Copilot** > **Generate Docs**. Copilot will generate a documentation comment for your code.

![Inline chat /doc results adding JSDoc comment for a TypeScript function](images/copilot-chat/generate-docs-example.png)

To make it easier to use Copilot Chat features, there is a **Copilot** menu group in the editor context menu. Right-click in the editor and navigate to **Copilot** to see the available options:

## Chat participants

To further help Copilot give you more relevant answers, you can indicate the scope and intent of your question through chat *participants*.

Chat partipipants are like experts who have a specialty that they can help you with, and you can talk to them in the chat by mentioning them with the `@` symbol. Currently, there are the following built-in chat partipipants:

* `@workspace` has context about the code in your workspace and can help you navigate it, finding relevant files or classes.
* `@vscode` knows about commands and features in the VS Code editor itself, and can help you use them.
* `@terminal` has context about the integrated terminal shell and its contents.

You can prepend your chat inputs with a specific participant to help Copilot give you a more relevant response.

### @workspace

The `@workspace` chat partipipant knows how to gather context about the code in your workspace, can help you navigate it, find relevant classes, files, and more. Imagine you are in the VS Code repository and you want to find out more about the service in charge of the current `ICodeEditor`; you can use the chat partipipant like this:

![Asking the @workspace chat partipipant about ICodeEditor](images/copilot-chat/workspace-agent-example.png)

Because it has all of the necessary context, `@workspace` can answer the kinds of questions that developers are much more likely to ask. For example, questions that pertain to how different parts of the code interact:

* "`@workspace` how are notifications scheduled?"

Or questions that require knowledge of related code, dependencies, and design patterns:

* "`@workspace` add form validation, similar to the newsletter page"

### @vscode

VS Code can be customized in so many ways that people get pleasantly surprised when they discover some hidden functionality. To help you to unlock the full power of VS Code, we created `@vscode`.

This chat partipipant knows all about VS Code and can help you bridge the gap between natural language and VS Code commands and customizations. `@vscode` internally uses tools that give it access to the index of all the settings and commands and we are in the process of adding a tool so that this chat partipipant can also use the VS Code documentation. Now you can ask vague questions like:

* "`@vscode` the name of that thing when vscode fake opens a file? And how to disable it?"
* "`@vscode` how do I change my VS Code colors?"

![Asking @vscode how to change the VS Code colors](images/copilot-chat/agent-example.png)

### @terminal

With `@terminal` you can questions about the integrated terminal shell, its buffer, and the current selection. In the following example, you use the Quick fix **Explain using Copilot** in the terminal to get information about a failed shell command.

Notice how the prompt in the Chat view is populated with `@terminal #terminalLastCommand` to help correct the error. `#terminalLastCommand` is a chat variable, which allows you to add more context to the chat prompt. Learn more about [chat variables](#use-chat-variables).

![Quick Chat with @terminal #terminalLastCommand and Copilot's answer](images/copilot-chat/terminal-command-explanation.png)

> **Note**: the terminal doesn't pull in the workspace context, which could take some time.

## Slash commands

Chat participants can also contribute what we call slash commands, which are shortcuts to specific functionality provided by the chat participant. One of the tasks when answering questions is to determine the intent, understanding what you want to do.

For example, we can infer that "Create a new workspace with Node.js Express Pug TypeScript" means that you want a new project, but "@workspace /new Node.js Express Pug TypeScript" is explicit, concise, and saves you time typing.

Once the intent is clear, `@workspace` has a much better chance of addressing your needs, despite the inherent ambiguity of natural language. The @workspace chat participant can propose a directory structure and users can select the proposed files to preview them. There is a **Create Workspace** button that will generate these files in a new folder.

Examples of built-in commands:

* `/help`: get help about using GitHub Copilot
* `/doc`: generate code documentation
* `/clear`: start a new chat session
* `@workspace /explain` (or `/explain`): explain how the selected code works
* `@workspace /fix` (or `/fix`): propose a fix for the problems in the selected code
* `@workspace /tests` (or `/tests`): generate unit tests for the selected code
* `@vscode /api` (or `/api`): ask about VS Code extension development
* `@workspace /new` (or `/new`): scaffold code for a new workspace
* `@workspace /newNotebook` (or `/newNotebook`): create a new Jupyter Notebook

## Provide context to Copilot Chat

Copilot works best when it has sufficient context to know what you're doing and what you want help with. Just as you would provide a colleague with the context when asking for help with a specific programming task, you can do the same with Copilot.

You can help Copilot provide better answers by upvoting or downvoting responses with the thumbs up and down icons in the upper right of its response. This provides Copilot feedback on how much it helped with your scenario so that it can help you even better in the future.

### Use chat variables

Chat participants, such as `@workspace` or `@vscode`, can contribute chat variables that provide domain-specific context. You can reference a chat variable in your chat prompt by using the `#` symbol. For example, the `#selection` variable contains the text selection in the active editor.

By using a chat variable, you can be more specific about the context that you include in your chat prompt. For example, the prompt "which sorting algo is used #selection" focuses the chat request on the selected code snippet.

Examples of built-in chat variables are:

* `#selection`: the visible source code in the active editor
* `#editor`: the current selection in the active editor. The editor content is implicitly included in the Chat view context.
* `#file`: include a specified file in your workspace as context with your chat prompt.
* `#terminalSelection`: the active terminal's selection
* `#terminalLastCommand`: the active terminal's last run command

> **Note**: if possible, the full contents of the file will be included when you use `#file`. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

### Use chat participants and commands

Chat participants, such as `@workspace`, might have context associated within them. For example, `@vscode` is aware of VS Code settings and its APIs. When you include a chat participant in the chat prompt, you inherently add context to the prompt. Similarly, by using slash commands, you can further focus the intent of the chat request.

### Chat history

Copilot keeps track of the history of your conversation in the Chat view. Copilot can use this information as context in subsequent prompts or to suggest follow-up questions.

For example, when you first ask "what is the number data type in TypeScript?" and then ask "Can you use this type for decimal numbers?", Copilot knows that you're still referring to the `number` data type. Notice that the suggested prompt is also relevant within our conversation.

![Chat view with multiple prompts, where Copilot understands that 'this' refers to the first prompt.](images/copilot-chat/chat-view-history.png)

### Context in inline chat

If you're using inline chat, and you have code selected in the editor, Copilot scopes your question to the selection.

### Ignore files

When you're using `@workspace` to ask questions related to your VS Code workspace, you can explicitly ignore specific files from the workspace by using a `.copilotignore` or `.gitignore` file. `@workspace` respects the `.gitignore` and `.copilotignore` when deciding which files from the workspace to index.

<!--
## Using voice interaction

requires VS Code Speech extension

- microphone icon
- press-and-hold to speak
- hey code

- using voice -> refer to separate doc (PR: https://github.com/microsoft/vscode-docs/pull/7072)
-->

## Privacy and transparency

We emphasize responsible usage of AI, especially when it comes to source code. The `inlineChat.acceptedOrDiscardBeforeSave` setting, which is enabled by default, asks you for confirmation before saving code that was generated by Copilot.

When the setting is enabled, a file save operation will wait for you to accept or discard any pending inline chat session. This also applies when Auto Save is enabled, which will be temporarily disabled until inline chat has ended.

![Inline chat save consent message.](images/copilot-chat/inline-chat-save-consent.png)

To enable additional workspace search features for private repositories, we require additional permissions. If we detect that we don't have these permissions already, we will ask for them at startup. Once granted, we'll securely store the session for the future.

![Modal window asking for additional authentication for a private repository.](images/copilot-chat/authentication.png)

## Additional resources

You can read more about [Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), and more.

## Next step

Get started with the introductory [Copilot Chat tutorial](./getting-started-chat.md).
