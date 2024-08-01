---
Order: 6
Area: copilot
TOCTitle: Copilot Chat
ContentId: 130ecf6c-6f06-4ddd-8b1d-f85f023af77b
PageTitle: AI-powered chat conversations with GitHub Copilot
DateApproved: 08/01/2024
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Using Copilot Chat in VS Code

The [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension gives you a chat interface that lets you interact with [GitHub Copilot](https://github.com/features/copilot) and receive answers to coding-related questions directly within VS Code, without requiring you to navigate documentation or search online forums.

Copilot Chat might use syntax highlighting, indentation, and other formatting features to add clarity to the generated response. Depending upon the type of question from the user, the result can contain links to context that Copilot used for generating a response, such as source code files or documentation, or buttons for accessing VS Code functionality.

Copilot Chat integrates in your developer flow and gives you assistance where you need it:

* Start an **inline chat** conversation directly from the editor or the terminal for help while you're coding
* Use the **Chat view** to have an AI assistant on the side to help you at any time
* Launch **Quick Chat** to ask a quick question and get back into what you're doing

You can use GitHub Copilot Chat in various scenarios, such as:

* Answering coding questions on how to best solve a problem
* Explaining someone else's code and suggest improvements
* Proposing code fixes
* Generating unit test cases
* Generating code documentation

## Getting started

> **Note**: After reviewing this topic, you can get started with the introductory [Copilot Chat tutorial](/docs/copilot/getting-started-chat.md).

* To use GitHub Copilot, you must have an active subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

* To use GitHub Copilot in VS Code, you must have the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension. When you install this extension, the [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension is also installed.

Follow these steps to [set up GitHub Copilot in VS Code](/docs/copilot/setup.md) by signing up for a subscription and installing the Copilot extension in VS Code.

## Inline chat

A key functionality of Copilot is answering questions inline, while you're coding in the editor or entering commands in the terminal. With Copilot inline chat, you can ask questions about code, get explanations, and even generate code snippets without leaving the context of your work. In any file, press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat.

You can ask Copilot questions that emerge as you write and iterate on code, such as "Explain this piece of code", or "How do I add functionality to do X?".

![Copilot inline chat asking information about the used sorting algorithm](images/copilot-chat/inline-chat-question-example.png)

If you have a block of code selected in the editor, Copilot scopes your question to the selection.

Depending on your question, Copilot can also suggest code modifications or refactorings. Copilot gives a preview of the updates, which you can then accept (`kb(inlineChat.acceptChanges)`) or discard (`kb(inlineChat.discard)`). Optionally, you can generate a new code suggestion.

![Copilot inline chat asking to convert a sort alogrithm to use bubble sort](images/copilot-chat/inline-chat-convert-sort.png)

With the `inlineChat.mode` setting, you can configure how inline chat shows updates in the editor. The default setting value is `live`, which means that the updates are applied directly in the editor, and you can compare the changes by using the inline diff viewer. If you prefer to preview the changes side-by-side, you configure the setting to `preview`.

The following example shows the `preview` mode for inline chat.

![Copilot inline chat preview mode, showing the code changes side-by-side](images/copilot-chat/inline-chat-preview-mode.png)

## Terminal inline chat

Similar to inline chat in the editor, you can bring up Copilot inline chat in the terminal to help you answer questions related to the terminal and shell commands. The terminal inline chat uses the `@terminal` chat participant, which has context about the integrated terminal's shell and its contents. For example, you can ask questions such as "how to instal npm packages", or "list the top 5 largest files in the src directory".

To start inline chat in the terminal, press the `kb(inlinechat.start)` keyboard shortcut.

![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

Once a command is suggested, use **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal, or **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal.

Optionally, you can edit the command directly in the Copilot response before running it by placing the cursor in the response or by pressing `kbstyle(Ctrl+down)`, `kbstyle(Tab)`, `kbstyle(Tab)` on Windows & Linux, or `kbstyle(Cmd+down)`, `kbstyle(Tab)`, `kbstyle(Tab)` on macOS.

## Chat view

The Chat view enables you to have a chat conversation with Copilot in a separate view. You can access the Chat view via the Activity Bar or by pressing `kb(workbench.action.chat.open)`:

![Copilot view in VS Code Activity Bar](images/copilot-chat/copilot-chat-view.png)

To get started, type your question in the chat input field. For example, ask a question about a general programming topic, or ask about the specific code in your workspace.

![Copilot explaining a devcontainer.json file](images/copilot-chat/devcontainer-explain.png)

> **Tip**: you can drag the Chat view to another location, or even open it as an editor. Learn more about [custom layouts in VS Code](/docs/editor/custom-layout.md).

Copilot Chat can provide rich and interactive results that contain: simple text, images, buttons for invoking VS Code commands, references URIs or editor locations, or file trees (for example, to show a workspace preview when a chat participant proposes to create a new workspace).

The following example shows a chat prompt to create an Express app, which returns a tree view with a suggested workspace structure and a button to create a new workspace.

![Copilot response containing rich results, such as a file tree with a proposed workspace structure, and a button to create a new workspace](images/copilot-chat/copilot-chat-view-workspace-file-tree.png)

As you keep the conversation going, Copilot maintains the history of your chat messages and responses, and provides related follow-up questions or commands in its response too.

> **Tip**: To get help about GitHub Copilot and how to interact with Copilot Chat, you can type `/help` in the chat input box.

### Code blocks

Depending on your question, Copilot Chat might return source code in a code block. Depending on the language extension, the code block in the chat response might support IntelliSense, which enables you get information about methods and symbols by hovering over them, or to go to their definition.

![A Copilot Chat code block with JSON to change the color of comments in VS Code](images/copilot-chat/copy-code-block.png)

Hovering over the code block presents options to **Copy** and **Insert at Cursor** (`kb(workbench.action.chat.insertCodeBlock)`).

The **More Actions** (`...`) button gives options to **Insert Into New File** and **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`).

![Copilot Chat code block with More Actions button expanded](images/copilot-chat/more-actions-code-block.png)

If Copilot Chat detects that a code block contains a command, you can run it directly in the integrated terminal with **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`). This option creates or opens the active terminal and inserts the command text, ready for you to run.

![Copilot Chat code block to list files with Insert into Terminal option visible](images/copilot-chat/run-in-terminal.png)

You can control the font for code blocks in chat with the following settings:

* `chat.editor.fontFamily`
* `chat.editor.fontSize`
* `chat.editor.fontWeight`
* `chat.editor.lineHeight`

> **Tip**: Navigate between code blocks with **Chat: Next Code Block** (`kb(workbench.action.chat.nextCodeBlock)`) and **Chat Previous Code Block** (`kb(workbench.action.chat.previousCodeBlock)`).

## Quick chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or open inline chat in your editor, you can use the Quick Chat dropdown. To open Quick Chat, run **Chat: Open Quick Chat** in the Command Palette, or use the `kb(workbench.action.quickchat.toggle)` keyboard shortcut.

![Quick Chat dropdown](images/copilot-chat/quick-chat-dropdown.png)

You can type questions, scope your questions with [chat participants](#chat-participants) and [slash commands](#slash-commands), and promote the discussion to a full Chat view session with the **Open in Chat View** button in the upper right of the dropdown.

![Quick Chat Open in Chat View button](images/copilot-chat/open-in-chat-view.png)

## Multi-turn conversations

When you ask a question in Copilot Chat, you aren't stuck with the first response. Keep the chat conversation open and continue to iterate and prompt Copilot to improve the suggested solution. Copilot has both the context of the generated code and your current conversation history. As you keep asking additional questions, Copilot further refines the response according to your requirements.

Here's an example using inline chat to create a function to calculate Fibonacci numbers:

![First response from Copilot for a function to calculate Fibonacci numbers](images/prompt-crafting/fibonacci-first.png)

If you prefer a solution that doesn't use recursion, update the chat prompt and submit it to Copilot to get a different response.

![Ask Copilot to not use recursion and new result](images/prompt-crafting/fibonacci-second.png)

Learn more about how to [iterate over a Copilot chat conversation](/docs/copilot/prompt-crafting.md#iterate-on-your-solution).

## Chat smart actions

To make it easier to use Copilot Chat features, smart actions are integrated in your VS Code flow and they do not require you to write any prompt at all. For example, you can access Copilot smart actions from the editor context menu or through Quick Fix actions.

Access the smart actions by selecting a block of code, right-clicking, and choosing **Copilot**. The smart actions are context-aware and can help you with common tasks, such as generating documentation, fixing code, or explaining code.

![Editor context menu with the Copilot menu group expanded](images/copilot-chat/editor-copilot-menu.png)

The most powerful smart action is `/fix`. Here is a relatively simple TypeScript calculator with an error noting that "Argument of type 'string' is not assignable to parameter of type 'number'". Select the *sparkle* icon, and then choose **Fix using Copilot**.

![Quick fix a type mismatch error by using the Copilot smart action](images/copilot-chat/smart-action-fix-with-copilot.png)

Similar to `/fix`, the `/doc` smart action is popular with users. To use `/doc`, select a block of code, right-click, and choose **Copilot** > **Generate Docs**. Copilot will generate a documentation comment for your code.

![Inline chat /doc results adding JSDoc comment for a TypeScript function](images/copilot-chat/generate-docs-example.png)

## Chat participants

To further help Copilot give you more relevant answers, you can indicate the scope and intent of your question through chat *participants*.

Chat participants are like experts who have a specialty that they can help you with, and you can talk to them in the chat by mentioning them with the `@` symbol. Currently, there are the following built-in chat participants:

* `@workspace` has context about the code in your workspace and can help you navigate it, finding relevant files or classes.
* `@vscode` knows about commands and features in the VS Code editor itself, and can help you use them.
* `@terminal` has context about the integrated terminal shell and its contents.

Extensions can also contribute chat participants to provide specialized help for their domain.

### @workspace

The `@workspace` chat participant knows how to gather context about the code in your workspace, can help you navigate it, find relevant classes, files, and more. Imagine you are in the VS Code repository and you want to find out more about the service in charge of the current `ICodeEditor`; you can use the chat participant like this:

![Asking the @workspace chat partipipant about ICodeEditor](images/copilot-chat/workspace-agent-example.png)

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

With the `/runCommand` [slash command](#slash-commands), you can ask `@vscode` to run a command in the editor. For example, you can ask `@vscode /runCommand enable developer mode` to open the VS Code Developer Tools.

![Toggle Developer Tools with the /runCommand slash command in Copilot Chat.](images/copilot-chat/copilot-runcommand-developer-mode.png)

### @terminal

With `@terminal` you can ask questions about the integrated terminal shell, its buffer, and the current selection. In the following example, you use the Quick fix **Explain using Copilot** in the terminal to get information about a failed shell command.

Notice how the prompt in the Chat view is populated with `@terminal #terminalLastCommand` to help correct the error. `#terminalLastCommand` is a chat variable, which allows you to add more context to the chat prompt. Learn more about [adding context to chat](#chat-context).

![Quick Chat with @terminal #terminalLastCommand and Copilot's answer](images/copilot-chat/terminal-command-explanation.png)

> **Note**: the terminal doesn't pull in the workspace context, which could take some time.

## Slash commands

One of the tasks when answering questions is to determine the intent, understanding what you want to do. You can use natural language to describe your intent, but it can be ambiguous. To help with this, you can use *slash commands*. Chat participants can contribute slash commands, which are shortcuts to specific, commonly-used functionality provided by that chat participant.

For example, we can infer that "Create a new workspace with Node.js Express Pug TypeScript" means that you want a new project. Instead, you can also use "@workspace /new Node.js Express Pug TypeScript" is explicit, concise, and saves you time typing. In this case, the `/new` slash command is a shortcut to create a new workspace.

Once the intent is clear, `@workspace` has a better chance of addressing your needs, despite the inherent ambiguity of natural language. The @workspace chat participant can propose a directory structure and users can select the proposed files to preview them. There is a **Create Workspace** button that generates these files in a new folder.

Examples of built-in commands:

* `/help`: get help about using GitHub Copilot
* `/doc`: generate code documentation
* `/clear`: start a new chat session
* `@workspace /explain` (or `/explain`): explain how the selected code works
* `@workspace /fix` (or `/fix`): propose a fix for the problems in the selected code
* `@workspace /tests` (or `/tests`): generate unit tests for the selected code
* `@workspace /new` (or `/new`): scaffold code for a new workspace or new file
* `@workspace /newNotebook` (or `/newNotebook`): create a new Jupyter Notebook
* `@vscode /api` (or `/api`): ask about VS Code extension development
* `@vscode /search` (or `/search`): generate query parameters for the Search view
* `@vscode /runCommand`: search or run a VS Code command
* `@terminal /explain`: explain terminal functionality or shell commands

## Chat context

Chat participants, such as `@workspace` or `@vscode`, can contribute chat variables that contain domain-specific context. You can reference a chat variable in your chat prompt by using the `#` symbol. For example, the `#selection` variable contains the text selection in the active editor.

Examples of built-in chat variables are:

* `#codebase`: the contents of the current workspace. It includes information about the files and folders in your workspace, as well as any settings or configurations specific to that workspace.
* `#editor`: the code in the active editor. The editor content is implicitly included in the Chat view context.
* `#file`: include a specified file in your workspace as context with your chat prompt.
* `#git`: information about the current git repository, such as the workspace folder, branch name, remotes, and more.
* `#selection`: the visible source code in the active editor.
* `#terminalLastCommand`: the active terminal's last run command.
* `#terminalSelection`: the active terminal's selection.

> **Note**: if possible, the full contents of the file will be included when you use `#file`. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

Instead of using the `#` symbol, you can also add context to your chat message by using the **Attach Context** button in the Chat view. You can then select the specific type of context from a Quick Pick, such as the current selection, one or more files from the workspace, or one or more symbols from your source code.

![Screenshot of VS Code Copilot Chat view, showing the Attach context button and context Quick Pick.](./images/copilot-chat/copilot-chat-view-attach-context.png)

## Improve the performance of Copilot Chat

Copilot works best when it has sufficient context to know what you're doing and what you want help with. Just as you would provide a colleague with the context when asking for help with a specific programming task, you can do the same with Copilot.

You can help Copilot provide better answers by upvoting or downvoting responses with the thumbs up and down icons in the upper right of its response. This provides Copilot feedback on how much it helped with your scenario so that it can help you even better in the future.

### Use chat variables

By using a chat variable in your chat prompt, you can be more specific about the context that you provide to Copilot. For example, the prompt "which sorting algo is used #selection" focuses the chat request on the selected code snippet.

### Use chat participants and commands

Chat participants, such as `@workspace`, might have context associated within them. For example, `@vscode` is aware of VS Code settings and its APIs. When you include a chat participant in the chat prompt, you inherently add context to the prompt. Similarly, by using slash commands, you can further focus the intent of the chat request.

### Chat history

Copilot keeps track of the history of your conversation in the Chat view. Copilot can use this information as context in subsequent prompts, for example when you have a [multi-turn conversation](#multi-turn-conversations).

For example, when you first ask "what is the number data type in TypeScript?" and then ask "Can you use this type for decimal numbers?", Copilot knows that you're still referring to the `number` data type. Notice that the suggested prompt is also relevant within our conversation.

![Chat view with multiple prompts, where Copilot understands that 'this' refers to the first prompt.](images/copilot-chat/chat-view-history.png)

You can delete a prompt and the corresponding response from the chat history by hovering over the prompt and selecting the **x** control. It might be useful to delete one or more prompts to get more relevant responses.

![Chat view with multiple prompts, highlighting the 'x' control to delete a chat prompt and response.](images/copilot-chat/copilot-chat-delete-prompt.png)

You can export all prompts and responses for a chat session in a JSON file with the **Chat: Export Session...** command (`workbench.action.chat.export`) in the Command Palette.

### Context in inline chat

If you're using inline chat, and you have code selected in the editor, Copilot scopes your question to the selection.

### Ignore files

When you're using `@workspace` to ask questions related to your VS Code workspace, you can explicitly ignore specific files from the workspace by using a `.gitignore` file. `@workspace` respects `.gitignore` when deciding which files from the workspace to index.

## Use voice interactions

With the voice control capabilities in VS Code, provided by the [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension, you can initiate a chat conversation by using your voice:

* Use your voice to dictate your chat prompt
* Use the "Hey Code" voice command to start a voice session with Copilot Chat
* Accelerate voice input for chat by using the "hold to speak" mode

Learn more about how to [use voice interactions in VS Code](/docs/editor/voice.md).

## Privacy and transparency

We emphasize responsible usage of AI, especially when it comes to source code. The `inlineChat.acceptedOrDiscardBeforeSave` setting, which is enabled by default, asks you for confirmation before saving code that was generated by Copilot.

When the setting is enabled, a file save operation waits for you to accept or discard any pending inline chat session. This also applies when Auto Save is enabled, which will be temporarily disabled until inline chat has ended.

![Inline chat save consent message.](images/copilot-chat/inline-chat-save-consent.png)

To enable more workspace search features for private repositories, we require additional permissions. If we detect that we don't have these permissions already, we will ask for them at startup. Once granted, we'll securely store the session for the future.

![Modal window asking for additional authentication for a private repository.](images/copilot-chat/authentication.png)

Learn more about security, privacy, and transparency in the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/).

## Additional resources

You can read more about [GitHub Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), and more.

## Next step

Get started with the introductory [Copilot Chat tutorial](/docs/copilot/getting-started-chat.md).
