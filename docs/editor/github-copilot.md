---
Order: 7
Area: editor
TOCTitle: GitHub Copilot
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
PageTitle: Use GitHub Copilot to enhance your coding with AI
DateApproved: 11/1/2023
MetaDescription: Enhance your coding with AI-powered suggestions from GitHub Copilot in Visual Studio Code.
---
# GitHub Copilot in VS Code

The [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension is an AI pair programmer tool that helps you write code faster and smarter. You can use the Copilot extension in VS Code to generate code, learn from the code it generates, and even configure your editor.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Fi3AJZZregI" title="Get Started with the Future of Coding: GitHub Copilot" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Prerequisites

You'll use the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension to power your artificial intelligence (AI) suggestions in VS Code.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot">Install the GitHub Copilot extension</a>

![Copilot extension in the VS Code Marketplace](images/artificial-intelligence/copilot-extension.png)

To use GitHub Copilot, you need an active GitHub Copilot subscription. In the [content below](#activate-your-free-trial), you'll learn how VS Code will help you activate your free trial directly from VS Code. You can also activate your trial starting from the [GitHub Copilot signup page](https://github.com/github-copilot/signup).

## Sign in and sign up

If you have not previously authorized VS Code in your GitHub account, you will be prompted to sign in to GitHub in VS Code:

![VS Code notification to sign into the Copilot extension](images/artificial-intelligence/copilot-auth-toast.png)

In your browser, GitHub will request the necessary permissions for GitHub Copilot. To approve these permissions, select **Authorize Visual Studio Code**.

### Activate your free trial

If you haven't yet activated your free trial for Copilot, the extension will notify you in VS Code. Select **Signup for GitHub Copilot** to activate your trial.

![Copilot sign up notification in VS Code](images/artificial-intelligence/copilot-access-toast.png)

You can learn more about billing for Copilot in the [GitHub Copilot documentation](https://docs.github.com/billing/managing-billing-for-github-copilot/about-billing-for-github-copilot).

## Using Copilot

Now that you've signed up for Copilot and activated the extension, let's see its assistance in action!

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

## Inline suggestions

Copilot presents suggestions automatically to help you code more efficiently. There are just 3 steps to harnessing these suggestions:

1. Start writing code (or code-related items, like comments or tests).

Copilot provides suggestions for a variety of languages and frameworks. For any given input, Copilot may offer multiple suggestions. You can select which suggestion to use or reject all suggestions.

2. Receive a Copilot suggestion in gray ghost (faded) text.

Ghost text is placeholder text that will be replaced by input you type or select from Copilot.

As an example, a JavaScript file, you can type the following function header:

```js
function calculateDaysBetweenDates(begin, end) {
```

Copilot will provide a suggestion like the following:

![JavaScript ghost text suggestion](images/artificial-intelligence/js-suggest.png)

3. Choose to accept Copilot's suggestion.

For any given input, Copilot may offer multiple suggestions. When Copilot offers a suggestion, you can use accept it with the `kbstyle(Tab)` key, or hover over the suggestion to see the inline suggestion toolbar:

![JavaScript ghost text suggestion](images/artificial-intelligence/copilot-hover-highlight.png)

In the image above, Copilot presents three suggestions. You can accept the entire suggestion with `kbstyle(Tab)`, or only part of the suggestion with `kbstyle(Ctrl+RightArrow)`. You can switch between suggestions in the suggestion toolbar, or use the keyboard shortcut `kb(editor.action.inlineSuggest.showNext)` instead.

If you don't want to accept any of the suggestions, you can continue typing, and Copilot will continue providing suggestions as you work.

## Getting the most out of Copilot

There are things you can do to help ("prompt") Copilot give you the best possible suggestions. And the good news is that you are probably already doing these right now since they help you and your colleagues understand your code.

Copilot suggestions work best when Copilot has sufficient context to know what you're doing and what you want help with. Just as you would provide a colleague with the context when asking for help with a specific programming task, you can do the same with Copilot.

>**Note**: "Prompt engineering" is a common phrase you'll hear when discussing AI and refers to how and what information is packaged and sent to an AI API endpoint. The Copilot extension does this "prompt engineering" for you but you can help by providing hints to guide the extension.

### Provide context

#### Open files

Copilot looks at the current and open files in your editor to analyze the context and create appropriate suggestions. Having related files open in VS Code while using Copilot helps set this context and lets the Copilot see a bigger picture of your project.

#### Top level comment

Just as you would give a brief, high-level introduction to a coworker, a top level comment in the file you're working in can help Copilot understand the overall context of the pieces you will be creating.

<!-- Example of a good and bad top level comment -->

#### Appropriate includes and references

It's best to manually set the includes or module references you need for your work. Copilot can make suggestions, but you likely know best what dependencies you'll need to include. This can also help let Copilot know what frameworks, libraries, and their versions you'd like it to use when crafting suggestions.

<!-- Example of a Python include TBD -->

#### Meaningful function names

Just as a method called `fetchData()` won't mean much to a coworker (or you after several months), `fetchData()` won't help Copilot either. Using meaningful function names will help Copilot provide a body that does what you want.

<!-- Example of a meaningful function/method name. -->

#### Specific and well-scoped function comments

A function name can only be so descriptive without being overly long so function comments can help fill in details that Copilot might need to know.

<!-- Example of a meaningful function/method comment -->

#### Prime Copilot with sample code

One trick to get Copilot on the right page is to copy and paste sample code into your open editor that is close to what you are looking for. Providing a small example can help Copilot generate suggestions that match the language and tasks you want to achieve. Once Copilot begins providing you with the code you want and will actually use, you can delete the sample code from the file. This can be especially helpful to jump start Copilot to a newer library version when it defaults to providing older code suggestions.

### Be consistent and keep the quality bar high

Copilot is going to latch on to your code to generate suggestions that follow the existing pattern so the adage "garbage in, garbage out" applies.

Keeping a high quality bar can take discipline when you're coding fast and loose to get something working and you might want to disable Copilot completions while in "hacking" mode. You can temporarily disable completions from the Copilot status menu. Bring up the Copilot status menu dropdown by selecting the Copilot status bar item.

![Hover over the Copilot status bar item displays "Show Copilot status menu"](images/artificial-intelligence/show-copilot-status-menu.png)

From the dropdown, you can disable completions entirely or just for the active file type, for example Markdown files.

![Copilot status menu dropdown with Disable Completions selected](images/artificial-intelligence/disable-completions.png)

<!-- ### Be specific

break things down into separate specific tasks

Be specific about inputs, outputs, ranges, APIs, frameworks.

### Verify suggestions

Copilot is not a compiler or language service

Tools, which you may already be using, can help.

#### Language Service warnings

#### Linters -->

### More resources

If you'd like to learn more about productively using GitHub Copilot, you can follow up with these videos and blog posts:

* [Effective Prompting for GitHub Copilot](https://www.youtube.com/watch?v=ImWfIDTxn7E)
* [Pragmatic techniques to get the most out of GitHub Copilot](https://www.youtube.com/watch?v=CwAzIpc4AnA)
* [Best practices for prompting GitHub Copilot in VS Code](https://www.linkedin.com/pulse/best-practices-prompting-github-copilot-vs-code-pamela-fox)
* [How to use GitHub Copilot: Prompts, tips, and use cases](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)

## Chat features

In addition to inline suggestions, you can also get assistance from Copilot via a chat interface. This is supported in several ways:

* **Chat view:** Ask Copilot for help with any task or question in the GitHub Copilot Chat view.
* **Inline Chat:** Talk with Copilot while writing code, inline in your files.
* **Quick Chat:** Bring up a Chat dropdown for quick questions and suggestions.

The Chat features are available by installing the additional [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extension.

> <a class="install-extension-btn" href="vscode:extension/GitHub.copilot-chat">Install the GitHub Copilot Chat extension</a>

![GitHub Copilot Chat extension](images/artificial-intelligence/copilot-chat-extension.png)

## Chat view

When developing a project or learning something new, it can be a big help to get AI assistance on your questions, big or small. Copilot enables an interactive Chat experience that understands the context of your code, workspace, extensions, settings, and more.

You can access the Chat view via the Activity Bar:

![Copilot view in VS Code Activity Bar](images/artificial-intelligence/copilot-view.png)

Like other views in VS Code, you can move it anywhere. For example, you can move it to the [Secondary side bar](/docs/editor/custom-layout.md#secondary-side-bar) so that you can use other views like the Explorer at the same time:

![Copilot view moved to Secondary side bar](images/artificial-intelligence/secondary-sidebar.png)

Copilot will suggest potential questions to get started. You can select any of these questions or use the chat box to type your own:

![Copilot explaining a devcontainer.json file](images/artificial-intelligence/devcontainer-explain.png)

As you continue asking questions, Copilot maintains the history of your conversation, and it'll provide related follow-up questions or commands in its response too.

You can help Copilot provide better answers by upvoting or downvoting responses with the thumbs up and down icons in the upper right of its response. This provides Copilot feedback on how much it helped with your scenario so that it can help you even better in the future.

### Keyboard shortcuts

To make it easy to work with the Chat view, there are several keyboard shortcuts:

* `kb(workbench.action.chat.open)` - Opens the Chat view
* `kb(workbench.action.chat.clear)` - Clears the Chat view
* `kb(workbench.action.chat.focusInput)` - Moves keyboard focus to the Chat view input box

### Agents and slash commands

To further help Copilot give you more relevant answers, you can indicate the scope and intent of your question through **agents** and **slash commands**.

Agents are like experts who have a specialty that they can help you with, and you can talk to them in the chat by mentioning them with the `@` symbol. Currently, there are two agents:

* `@workspace` has context about the code in your workspace and can help you navigate it, finding relevant files or classes.
* `@vscode` knows about commands and features in the VS Code editor itself, and can help you use them.

You can prepend your chat inputs with a specific agent to help Copilot give you a more relevant response.

![Asking the @vscode agent how to change the VS Code colors](images/artificial-intelligence/agent-example.png)

Agent can also support slash commands for specific types of questions or tasks. For example, `@workspace /explain` can be used to ask Copilot to explain a file or code selection in the context of your open workspace. To see the available agents and slash commands, type `/` for a list.

![Copilot slash command list in chat](images/artificial-intelligence/slash-commands.png)

* @workspace /explain: Explain step-by-step how the selected code works.
* @workspace /fix: Propose a fix for the bugs in the selected code.
* @workspace /new: Create a new project based on a natural language description.
* @workspace /newNotebook: Create a new Jupyter Notebook based on your description.
* @workspace /terminal: Explain how to do something in the integrated terminal.
* @workspace /tests: Generate unit tests for the selected code.
* @vscode /api: Questions about VS Code extension development.

In addition to agent and slash command combinations, there are general purpose slash commands for actions such as clearing the chat session or getting help.

* /help: Prints general help about GitHub Copilot.
* /clear: Clear the session.

### Code blocks

Depending on your question, Copilot Chat may return source code in a code block.

![A Copilot Chat code block with JSON to change the color of comments in VS Code](images/artificial-intelligence/copy-code-block.png)

Hovering over the code block presents options to **Copy** and **Insert at Cursor** (`kb(workbench.action.chat.insertCodeBlock)`).

The **More Actions** (`...`) button also displays options to **Insert Into New File** and **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`).

![Copilot Chat code block with More Actions button expanded](images/artificial-intelligence/more-actions-code-block.png)

If Copilot Chat detects that a code block contains a command, you can run it directly in the integrated terminal with **Run in Terminal** `kb(workbench.action.chat.runInTerminal)`. This option will create or open the active terminal and insert the command text, ready for you to run.

![Copilot Chat code block to list files with Run in Terminal option visible](images/artificial-intelligence/run-in-terminal.png)

### Chat view locations

By default, the Chat view is displayed in the [Primary side bar](/docs/getstarted/userinterface.md#basic-layout) but like other views in VS Code, you can [drag and drop](/docs/editor/custom-layout.md#drag-and-drop-views-and-panels) it anywhere. For example, you could drag and drop the Chat view into the Panel region:

![Chat view in the Panel region](images/artificial-intelligence/chat-in-panel.png)

You can also open the Chat view in the editor region for a larger display area. From the Chat view title bar **More Actions** (`...`) menu, select **Open Session in Editor**.

![Copilot Chat view title bar More Actions with Open Session in Editor selected](images/artificial-intelligence/open-session-in-editor.png)

Just like any open editor, you can move editor-hosted Chat views into separate [Editor Groups](/docs/getstarted/userinterface.md#editor-groups) and use display customizations such as [Grid layout](/docs/editor/custom-layout.md#grid-layout) to have multiple chat sessions open in the editor region.

To move the Chat view back to the side bar, use the **Open Session in Side Bar** command in the editor title bar when the Chat view is the active editor.

![Chat view in editor with Open Session in Side bar displayed](images/artificial-intelligence/open-session-in-sidebar.png)

## Inline chat

An additional key functionality of Copilot is answering questions inline as you're coding. This allows you to harness the power of AI while staying in your existing editor workflow.

In any file, you can press `kb(inlinechat.start)` on your keyboard to bring up Copilot inline chat:

![Copilot inline chat in devcontainer.json file](images/artificial-intelligence/inline-chat.png)

You can ask Copilot questions that emerge as you write and iterate on code, such as "Explain this piece of code" or "How do I add functionality to do X?" If you have code selected in the editor, Copilot will scope your question to the selection.

Several [slash commands](#agents-and-slash-commands) also work in inline chat such as `/explain` to ask Copilot to explain a block of code or `/test` to generate unit tests.

![Inline chat slash command list](images/artificial-intelligence/inline-chat-slash-commands.png)

A useful command is `/fix`, which analyzes the error line or selected code and proposes a fix in a diff view for your review. After reviewing and possibly modifying the generated code, you can choose to **Accept** or **Discard** the fix.

![Inline chat /fix identifying an unassigned variable and proposing a fix in a diff view](images/artificial-intelligence/inline-chat-fix-example.png)

## Quick Chat

If you want to ask Copilot a quick question and don't want to start a full Chat view session or have inline Chat open in your editor, you can use the Quick Chat dropdown. To open Quick Chat, you can run **Chat: Open Quick Chat** or use the `kb(workbench.action.quickchat.toggle)` keyboard shortcut.

![Quick Chat dropdown](images/artificial-intelligence/quick-chat-dropdown.png)

You can type questions, scope your questions with agents and slash commands such as `@workspace /explain` and `@vscode`, and promote the discussion to a full Chat view session with the **Open in Chat View** button in the upper right of the dropdown.

![Quick Chat Open in Chat View button](images/artificial-intelligence/open-in-chat-view.png)

## Chat smart actions

To make it easier to use Copilot Chat features, there is a **Copilot** menu group in the editor context menu. Right-click in the editor and navigate to **Copilot** to see the available options:

![Editor context menu with the Copilot menu group expanded](images/artificial-intelligence/editor-copilot-menu.png)

You can apply these smart actions on the current file or a selection in the file. Choosing an action, brings up the appropriate agent and/or slash command in the Chat view or inline chat. For example, selecting **Generate Docs** for a function will open the inline chat with a proposed documentation comment:

![Inline chat /doc results adding JSDoc comment for a TypeScript function](images/artificial-intelligence/generate-docs-example.png)

## Other Copilot uses

In addition to inline completions and chat, GitHub Copilot can help with other development tasks and workflows. For example, Copilot can help with writing commit messages, fixing errors, and finding commands.

### Sparkles

When Copilot can help with a task or workflow, VS Code displays a **sparkle** icon. Hovering over the sparkle icon will describe the Copilot action.

![Sparkle icon in an input box](images/artificial-intelligence/sparkle-icon.png)

### Generate Git commit messages

Copilot can help you write GitHub commit messages. In the Source Control message input box, select the sparkle button at the right and Copilot will create a commit message based on your pending changes.

![Hover over Source Control input box sparkle buttons shows Generate Commit Message](images/artificial-intelligence/generate-commit-message.png)

If you using the [GitHub Pull Request and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, there is a sparkle button to fill in both the title and description in the Pull Request **Create** view.

### Terminal Quick Fixes

When a command fails to run in the terminal, Copilot displays a sparkle in the gutter that offers a Quick Fix to explain what happened.

![Terminal command failure shows sparkle with Explain using Copilot Quick Fix](images/artificial-intelligence/terminal-quick-fix.png)

Selecting **Explain using Copilot** will populate the Chat view with the `@workspace /explain` agent and slash command to help correct the last terminal command error.

![Chat view with @workspace /explain #terminalLastCommand and Copilot's answer](images/artificial-intelligence//terminal-command-explanation.png)

### Command Palette help

When trying to find a command in the Command Palette (`kb(workbench.action.showCommands)`), if you don't think you see the command you want, you can run **Ask GitHub Copilot** with your search term.

![Command Palette with Ask GitHub Copilot selected to search for "hide editor overview"](images/artificial-intelligence/command-palette-ask-copilot.png)

The **Ask GitHub Copilot** command will open the Chat view and input your search term.

![Chat view with answer to "hide editor overview"](images/artificial-intelligence/copilot-answer-hide-editor-overview.png)

## Getting the most of of Copilot Chat

This section is similar to the earlier [Getting the most out of Copilot](#getting-the-most-out-of-copilot), which had recommendations for getting the best editor inline completions from Copilot. Here we'll cover tips to effectively use Copilot Chat (Chat view, inline chat, Quick Chat).

### Use agents and slash commands

[Agents](#agents-and-slash-commands) are designed to collect extra context either about a code base or a specific domain or technology. By using the appropriate agent, Copilot Chat can find and provide better information to send to the Copilot backend.

* Use `@workspace` if you want to ask questions about your open project.
* Use `@vscode` if you want to know about VS Code features and APIs.

Slash commands help Copilot Chat understand your **intent** when you ask a question. Are you learning about a code base (`/explain`) or do you want help fixing an issue (`/fix`) or creating test cases (`/test`)? By letting Copilot Chat know what you're trying to do, it can tune its reply to your task and provide helpful commands, settings, and code snippets.

You could write out your project scope or current task with a natural language query but using agents and slash commands is more concise and explicit.

### Iterate on your solution

When asking Copilot Chat for help, you aren't stuck with the first response. You can iterate and prompt Copilot to improve the solution. Copilot has both the context of the generated code and also your current conversation.

Here's an example using inline chat to create a function to calculate Fibonacci numbers:

![First response from Copilot for a function to calculate Fibonacci numbers](images/artificial-intelligence/fibonacci-first.png)

Maybe you prefer a solution that doesn't use recursion:

![Ask Copilot to not use recursion and new result](images/artificial-intelligence/fibonacci-second.png)

You can even ask Copilot to follow coding conventions or improve variable names:

![Ask Copilot to use better variable names and new result](images/artificial-intelligence/fibonacci-third.png)

Even if you've already accepted a result, you can always ask Copilot to iterate on the code later:

![Ask inline chat to use better variable names on existing code](images/artificial-intelligence/fibonacci-better-var-names.png)

## Additional resources

Congratulations, you've now used artificial intelligence to enhance your coding!

You can read more about Copilot and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content as well as programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), and more.

## Common questions

### The Copilot Chat features aren't working for me?

Check each requirement if Copilot Chat doesn't work:

* Make sure you are on the latest version of Visual Studio Code (run **Code: Check for Updates**).
* Make sure you have the latest version of both the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions.
* Your GitHub account that is signed into VS Code must be both:
  * An activated Copilot subscription (check your [subscription](https://github.com/settings/copilot)).

### I can't find Copilot Chat in the Activity bar

If you've moved the Chat view out of the Primary side bar, for example, you dragged the view to the [Secondary side bar](/docs/editor/custom-layout.md#secondary-side-bar), the Chat view icon will no longer be displayed on the Activity bar. If you close the Secondary side bar, the Chat view won't be visible and it may appear that you've lost access to the Chat view.

There are several ways to display the Chat view or restore it back to the Activity bar:

* **View: Show Chat** - Opens the Chat view no matter where it is hosted.
* **Copilot status menu** - The status menu dropdown has an option to **Open GitHub Copilot Chat**.
* **View: Reset View Locations** - General command to restore all views and panels to their default locations.

As with any view, you can drag and drop the Chat view back to the Activity bar or use **Reset Location** from the view title bar context menu.

### How do I disable Copilot?

You can temporarily deactivate Copilot from the Status bar. You will be prompted whether you want to disable Copilot for all code (globally) or just the programming language detected in the active editor (for example, Python).

### How can I provide feedback on Copilot?

You can give feedback on Copilot inline suggestions and responses in the [GitHub Copilot Discussions](https://github.com/orgs/community/discussions/categories/copilot).

If you would like to provide feedback on the Copilot Chat features, you can create issues in the [vscode-copilot-release](https://github.com/microsoft/vscode-copilot-release/issues) repository.

### Are there pre-release builds of the Copilot extensions?

Yes, you can switch to the pre-release (nightly) version of a Copilot extension to try the latest features and fixes. From the Extensions view, right-click or select the gear icon to bring up the context menu and select **Switch to Pre-Release Version**:

![Extensions view context menu with Switch to Pre-Release Version option](images/artificial-intelligence/switch-to-pre-release.png)

You can tell if you're running a pre-release version by the "Pre-release" badge in the extension details:

![Pre-release version of the GitHub Copilot extension](images/artificial-intelligence/copilot-ext-pre-release.png)
