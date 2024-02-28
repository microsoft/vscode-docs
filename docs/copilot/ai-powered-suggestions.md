---
Order: 
Area: copilot
TOCTitle: AI-powered suggestions
ContentId: 7ab2cd6c-45fd-4278-a6e8-1c9e060593ea
PageTitle: AI-powered suggestions with GitHub Copilot
DateApproved: 02/28/2024
MetaDescription: Enhance your coding with AI-powered suggestions from GitHub Copilot in Visual Studio Code.
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

If you want to use GitHub Copilot, you either need a subscription for GitHub Copilot in your personal account, or you need to be assigned a seat by your organization.

The following tutorials walk you through using GitHub Copilot in VS Code.

1. [Getting started](/docs/copilot/getting-started.md): set up VS Code for Copilot and get your first AI-powered suggestions

1. [Getting started with Copilot Chat](/docs/copilot/getting-started-chat.md): install the Copilot Chat extension and have your first AI chat conversations

## Using Copilot

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

## Inline suggestions

Copilot presents suggestions automatically in the editor to help you code more efficiently. There are just three steps to harnessing these suggestions:

1. Start writing code (or code-related items, like comments or tests).

    Copilot can provide suggestions for various languages and frameworks. For any given input, Copilot might offer multiple suggestions. You can select which suggestion to use, or reject all suggestions.

1. Receive a Copilot suggestion in gray ghost (faded) text.

    Ghost text is placeholder text that will be replaced by input you type or select from Copilot.

    As an example, in a JavaScript file, you can type the following function header:

    ```js
    function calculateDaysBetweenDates(begin, end) {
    ```

    Copilot will provide a suggestion like in the following example:

    ![JavaScript ghost text suggestion](images/overview/js-suggest.png)

1. Choose to accept Copilot's suggestion.

    For any given input, Copilot might offer multiple suggestions. When Copilot offers a suggestion, you can accept it with the `kbstyle(Tab)` key, or hover over the suggestion to see the inline suggestion toolbar:

    ![JavaScript ghost text suggestion](images/overview/copilot-hover-highlight.png)

    In the previous image, Copilot presents three suggestions. You can accept the entire suggestion with `kbstyle(Tab)`, or only part of the suggestion with `kbstyle(Ctrl+RightArrow)`. You can switch between suggestions in the suggestion toolbar, or use the keyboard shortcut `kb(editor.action.inlineSuggest.showNext)` instead.

    If you don't want to accept any of the suggestions, you can continue typing, and Copilot will continue providing suggestions as you work.

## Chat features

In addition to inline suggestions, you can also get assistance from Copilot via a chat interface. Copilot Chat is supported in several ways:

* **Chat view:** Ask Copilot for help with any task or question in the GitHub Copilot Chat view.
* **Inline Chat:** Talk with Copilot while writing code, inline in your files.
* **Quick Chat:** Bring up a Chat dropdown for quick questions and suggestions.

### Install the GitHub Copilot Chat extension

The Chat features are available by installing the additional [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot-chat">Install the GitHub Copilot Chat extension</a>

## Chat view

When developing a project or learning something new, it can be a significant help to get AI assistance on your questions, large or small. Copilot enables an interactive Chat experience that understands the context of your code, workspace, extensions, settings, and more.

You can access the Chat view via the Activity Bar:

![Copilot view in VS Code Activity Bar](images/overview/copilot-view.png)

Copilot will suggest potential questions to get started. You can select any of these questions, or use the chat input box to type your own:

![Copilot explaining a devcontainer.json file](images/overview/devcontainer-explain.png)

As you continue asking questions, Copilot maintains the history of your conversation, and provides related follow-up questions or commands in its response too.

You can help Copilot provide better answers by upvoting or downvoting responses with the thumbs up and down icons in the upper right of its response. This provides Copilot feedback on how much it helped with your scenario so that it can help you even better in the future.

> **Tip:** To get help about GitHub Copilot and how to interact with Copilot Chat, you can type `/help` in the chat input box.

<!-- ### Agents and slash commands

TODO: introduction to agents & slash commands
TODO: add details about getting help -->

### Code blocks

Depending on your question, Copilot Chat might return source code in a code block.

![A Copilot Chat code block with JSON to change the color of comments in VS Code](images/overview/copy-code-block.png)

Hovering over the code block presents options to **Copy** and **Insert at Cursor** (`kb(workbench.action.chat.insertCodeBlock)`).

The **More Actions** (`...`) button gives options to **Insert Into New File** and **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`).

![Copilot Chat code block with More Actions button expanded](images/overview/more-actions-code-block.png)

If Copilot Chat detects that a code block contains a command, you can run it directly in the integrated terminal with **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`). This option creates or opens the active terminal and inserts the command text, ready for you to run.

![Copilot Chat code block to list files with Insert into Terminal option visible](images/overview/run-in-terminal.png)

### Keyboard shortcuts

To make it easy to work with the Chat view, there are several keyboard shortcuts:

* `kb(workbench.action.chat.open)` - Opens the Chat view
* `kb(workbench.action.chat.clear)` - Clears the Chat view
* `kb(workbench.action.chat.focusInput)` - Moves keyboard focus to the Chat view input box

## Inline chat

An additional key functionality of Copilot is answering questions inline as you're coding. This allows you to harness the power of AI while staying in your existing editor workflow.

In any file, you can press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat. You can ask Copilot questions that emerge as you write and iterate on code, such as "Explain this piece of code", or "How do I add functionality to do X?".

![Copilot inline chat asking information about the used sorting algorithm](images/overview/inline-chat-question-example.png)

If you have code selected in the editor, Copilot scopes your question to the selection.

Depending on your question, Copilot can also suggest code modifications. Copilot gives a preview of the updates, which you can then accept (`kb(inlineChat.acceptChanges)`) or discard (`kb(inlineChat.discard)`).

![Copilot inline chat asking to convert a sort alogrithm to use bubble sort](images/overview/inline-chat-convert-sort.png)

## Quick Chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or open inline chat in your editor, you can use the Quick Chat dropdown. To open Quick Chat, you can run **Chat: Open Quick Chat** in the Command Palette, or use the `kb(workbench.action.quickchat.toggle)` keyboard shortcut.

![Quick Chat dropdown](images/overview/quick-chat-dropdown.png)

You can type questions, scope your questions with agents and slash commands, and promote the discussion to a full Chat view session with the **Open in Chat View** button in the upper right of the dropdown.

![Quick Chat Open in Chat View button](images/overview/open-in-chat-view.png)

## Chat smart actions

To make it easier to use Copilot Chat features, there is a **Copilot** menu group in the editor context menu. Right-click in the editor and navigate to **Copilot** to see the available options:

![Editor context menu with the Copilot menu group expanded](images/overview/editor-copilot-menu.png)

You can apply these smart actions on the current file or a selection in the file. Choosing an action brings up the Chat view or inline chat, depending on the action. For example, selecting **Generate Docs** for a function opens the inline chat with a proposed documentation comment:

![Inline chat /doc results adding JSDoc comment for a TypeScript function](images/overview/generate-docs-example.png)

## Other Copilot uses

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
