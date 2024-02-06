---
Order: 1
Area: copilot
TOCTitle: Overview
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
PageTitle: GitHub Copilot overview
DateApproved: 02/1/2024
MetaDescription: Enhance your coding with AI-powered suggestions and chat conversations with GitHub Copilot in Visual Studio Code.
---
# GitHub Copilot in VS Code

The [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension is an AI pair programmer tool that helps you write code faster and smarter. You can use the Copilot extension in Visual Studio Code to generate code, learn from the code it generates, and even configure your editor.

With GitHub Copilot in VS Code you can:

* Get inline code suggestions while you're writing and iterating on code.
* Start a chat conversation to generate or refactor source code, produce documentation comments, or generate unit tests.
* Ask questions to help ramp-up on a new code base, or accelerate learning a new programming language or framework.
* Use chat features to discover and configure your VS Code setup.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Fi3AJZZregI" title="Get Started with the Future of Coding: GitHub Copilot" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Getting started

To get started with Github Copilot in VS Code:

1. Make sure you have a [GitHub account](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account).

1. Get a GitHub Copilot subscription in either your personal account, or have a seat assigned by your organization.

1. Install the GitHub Copilot extension.

    > <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extension</a>

Follow the steps in the [Getting started tutorial](/docs/copilot/getting-started.md) to get you set up and generate your first AI-powered code suggestions.

Next, learn how to use chat features to help with refactoring code and improving code understanding in the [Copilot Chat tutorial](/docs/copilot/getting-started-chat.md).

## Using Copilot

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

## Inline suggestions

As you start writing code or code-related items (comments, test, and more), Copilot presents suggestions automatically in the editor to help you code more efficiently. For any given input, Copilot might offer multiple suggestions.

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

Notice in the following example how Copilot suggests an implementation of the `calculateDaysBetweenDates` JavaScript function by using dimmed *ghost text*:

![JavaScript ghost text suggestion.](images/overview/js-suggest.png)

When you're presented with an inline suggestion, you can accept it with the `kbstyle(Tab)` key. Optionally, you can hover over the suggestion to any of the other suggestsions.

Rather than letting Copilot provide suggestions as you're typing, you can also use code comments to provide instructions to Copilot. By using code comments, you can be more specific the suggestions you're looking for. For example, you could specify a type of algorithm to use, or which methods and properties to add to a class.

The following example shows how to instruct Copilot to create a class in TypeScript to represent a student, providing information about methods and properties:

![Use code comments to let Copilot generate a Student class in TypeScript with properties and methods.](images/overview/ts-suggest-code-comment.png)

## Chat features

In addition to inline suggestions, you can also get assistance from Copilot via a chat interface. You can use Copilot Chat in VS Code in different ways, depending on the context:

* **Chat view:** Ask Copilot for help with any task or question in the GitHub Copilot Chat view.
* **Inline Chat:** Talk with Copilot while writing code, inline in your files.
* **Quick Chat:** Bring up a Chat dropdown for quick questions and suggestions.

To use the chat features in VS Code, install the additional [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot-chat">Install the GitHub Copilot Chat extension</a>

### Chat view

When developing a project or learning something new, it can be a significant help to get AI assistance on your questions, large or small. Copilot enables an interactive Chat experience that understands the context of your code, workspace, extensions, settings, and more.

You can access the Chat view via the Activity Bar, or use the `kb(workbench.action.chat.open)` keybinding:

![Copilot view in VS Code Activity Bar](images/overview/copilot-view.png)

Copilot will suggest potential questions to get started. You can select any of these questions, or use the chat input box to type your own. Notice in the following example that Copilot Chat understands the context of your workspace when asking about "my devcontainer.json" file:

![Copilot explaining a devcontainer.json file](images/overview/devcontainer-explain.png)

As you continue asking questions, Copilot maintains the history of your conversation, and provides related follow-up questions or commands in its response too.

> **Tip:** To make your interactions more efficient, you can use *slash commands* as a shorthand for common questions. For example, use the `/help` to get help about GitHub Copilot and how to interact with it Copilot Chat.

<!-- TODO: add cross-reference to agents and slash commands -->

Depending on your question, Copilot Chat might return source code in a code block. Hovering over the code block presents options to **Copy** and **Insert at Cursor** (`kb(workbench.action.chat.insertCodeBlock)`).

![A Copilot Chat code block with JSON to change the color of comments in VS Code](images/overview/copy-code-block.png)

If Copilot Chat detects that a code block contains a command, you can run it directly in the integrated terminal with **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`). This option creates or opens the active terminal and inserts the command text, ready for you to run.

![Copilot Chat code block to list files with Insert into Terminal option visible](images/overview/run-in-terminal.png)

### Inline chat

An additional key functionality of Copilot is answering questions inline as you're coding. This allows you to harness the power of AI while staying in your existing editor workflow.

In any file, you can press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat. You can ask Copilot questions that emerge as you write and iterate on code, such as "Explain this piece of code", or "How do I add functionality to do X?".

![Copilot inline chat asking information about the used sorting algorithm](images/overview/inline-chat-question-example.png)

If you have code selected in the editor, Copilot scopes your question to the selection.

Depending on your question, Copilot can also suggest code modifications. Copilot gives a preview of the updates, which you can then accept (`kb(inlineChat.acceptChanges)`) or discard (`kb(inlineChat.discard)`).

![Copilot inline chat asking to convert a sort alogrithm to use bubble sort](images/overview/inline-chat-convert-sort.png)

### Quick Chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or open inline chat in your editor, you can use the Quick Chat dropdown. To open Quick Chat, you can run **Chat: Open Quick Chat** in the Command Palette, or use the `kb(workbench.action.quickchat.toggle)` keyboard shortcut.

![Quick Chat Open in Chat View button](images/overview/open-in-chat-view.png)

### Chat smart actions

To make it easier to use Copilot Chat features, there is a **Copilot** menu group in the editor context menu. Right-click in the editor and navigate to **Copilot** to see the available options:

![Editor context menu with the Copilot menu group expanded](images/overview/editor-copilot-menu.png)

You can apply these smart actions on the current file or a selection in the file. Choosing an action brings up the Chat view or inline chat, depending on the action. For example, selecting **Generate Docs** for a function opens the inline chat with a proposed documentation comment:

![Inline chat /doc results adding JSDoc comment for a TypeScript function](images/overview/generate-docs-example.png)

## Improving your developer experience

In addition to inline completions and chat, GitHub Copilot can help with other development tasks and workflows. For example, Copilot can help with writing commit messages, fixing errors, and finding commands.

When Copilot can help with a task or workflow, VS Code displays a **sparkle** icon. Hovering over the sparkle icon describes the Copilot action.

![Sparkle icon in an input box](images/overview/sparkle-icon.png)

### Generate Git commit messages

Copilot can help you write GitHub commit messages. In the Source Control message input box, select the sparkle button at the right and Copilot creates a commit message based on your pending changes.

![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/overview/generate-commit-message.png)

If you're using the [GitHub Pull Request and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, there is a sparkle button to fill in both the title and description in the Pull Request **Create** view.

### Terminal Quick Fixes

When a command fails to run in the terminal, Copilot displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

![Terminal command failure shows sparkle with Explain using Copilot Quick Fix](images/overview/terminal-quick-fix.png)

Selecting **Explain using Copilot** populates Quick Chat with the `@terminal #terminalLastCommand` agent and variable to help correct the last terminal command error.

![Quick Chat with @terminal #terminalLastCommand and Copilot's answer](images/overview/terminal-command-explanation.png)

### Command Palette help

When you're looking for a command in the Command Palette (`kb(workbench.action.showCommands)`), you can run **Ask GitHub Copilot** with your search term to help you find the relevant command.

![Command Palette with Ask GitHub Copilot selected to search for "hide editor overview"](images/overview/command-palette-ask-copilot.png)

The **Ask GitHub Copilot** command opens the Chat view and input your search term.

![Chat view with answer to "hide editor overview"](images/overview/copilot-answer-hide-editor-overview.png)

## Additional resources

Congratulations, you've now used artificial intelligence to enhance your coding!

You can read more about Copilot and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), and more.
