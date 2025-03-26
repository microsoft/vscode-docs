
# Ask mode


## Chat participants

_Chat participants_ are like domain experts who have a specialty that they can help you with. You can invoke a chat participant by typing '@' in the chat input field, followed by the participant name. There are several built-in chat participants, and extensions can also contribute chat participants.

To list all installed chat participants, type `@` in the chat input field.

| Built-in participant | Description |
|------------------|-------------|
| `@workspace`     | Knows about the code in your workspace. Use it to navigate your code base, find relevant classes, files, and more.<br/><br/>**Example prompts:**<br/><ul><li>`@workspace how are notifications scheduled?`</li><li>`@workspace add form validation, similar to the newsletter page`</li></ul> |
| `@vscode`        | Knows about features, settings, and APIs of VS Code.<br/><br/>**Example prompt:**<br/><ul><li>`@vscode the name of that thing when vscode fake opens a file? And how to disable it?`</li></ul> |
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

To list all available slash commands, type `/` in the chat input field.

## Chat variables

Use chat variables to include specific context in your prompt. To use a chat variable, type `#` in the chat prompt box, followed by a chat variable. For example, `#codebase` to let Copilot find the relevant files to add as context, or `#selection` to add the current editor selection to your chat prompt.

Get more information about [adding context to your chat prompt](/docs/copilot/copilot-chat-context.md).

## Apply a code block from chat

Chat responses could contain one or more code blocks. Depending on the language extension, the code block in the chat response might support IntelliSense, which enables you get information about methods and symbols by hovering over them, or to go to their definition.

To apply a code block to your codebase, hover over the code block and select the **Apply in Editor** button. Copilot tries to apply the proposed changes to your existing code.

![Screenshot of a Copilot Chat code block response, highlighting the actions to apply changes.](images/copilot-chat/copilot-chat-view-code-block-actions.png)

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

## Quick Chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or open Inline Chat in your editor, you can use the Quick Chat dropdown.

![Quick Chat dropdown](images/copilot-chat/quick-chat-dropdown.png)

Press `kb(workbench.action.quickchat.toggle)` on your keyboard to bring up Quick Chat. Alternatively, select **Quick Chat** in the Copilot menu in the title bar.

If you want to keep the conversation going, promote a Quick Chat conversation to a full Chat view session with the **Open in Chat View** button in the upper right of the dropdown.

![Quick Chat Open in Chat View button](images/copilot-chat/open-in-chat-view.png)


============

1. Review the response from Copilot.

    The response may contain text, code blocks, buttons, links to code symbols, file trees, or other rich content. Get more information about how to [apply code suggestions](#apply-a-code-block-from-chat) to your codebase.

    To see which resources Copilot used for the response, select the **Used n resources** dropdown in the chat response. You can help Copilot give more relevant answers by [attaching the context to your chat prompt](#add-context-to-your-chat-prompt).



1. Optionally, ask follow-up questions to refine the response.

    As you keep the conversation going, Copilot maintains the [history of your chat messages and responses](#chat-history).

    To start over with a new chat session, use the **New Chat** (`kbstyle(+)`) button (`kb(workbench.action.chat.newChat)`) in the Chat view.
