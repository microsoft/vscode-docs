---
ContentId: de6f9f68-7dd5-4de3-a210-3db57882384b
DateApproved: 10/09/2025
MetaDescription: Get a quick overview of the AI features in Visual Studio Code. GitHub Copilot provides AI-powered features to help you write code faster and with less effort.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# GitHub Copilot in VS Code cheat sheet

GitHub Copilot in Visual Studio Code provides AI-powered features to help you write code faster and with less effort. This cheat sheet provides a quick overview of the features for GitHub Copilot in Visual Studio Code.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Essential keyboard shortcuts

* `kb(workbench.panel.chat)` - Open the Chat view
* `kb(workbench.action.chat.startVoiceChat)` - Enter voice chat prompt in Chat view
* `kb(workbench.action.chat.newChat)` - Start a new chat session in Chat view
* `kb(workbench.action.chat.openAgent)` - Switch to using agents in Chat view
* `kb(inlineChat.start)` - Start inline chat in the editor or terminal
* `kb(workbench.action.chat.startVoiceChat)` (hold) - Start inline voice chat
* `kb(editor.action.inlineSuggest.commit)` - Accept inline suggestion or navigate to the next edit suggestion
* `kb(editor.action.inlineSuggest.hide)` - Dismiss inline suggestion

## Access AI in VS Code

* Start a chat conversation using natural language
    * Chat view (`kb(workbench.action.chat.open)`): keep an ongoing chat conversation in the Secondary Side Bar
    * Inline chat in the editor or terminal (`kb(inlineChat.start)`): ask questions while you're in the flow
    * Quick Chat (`kb(workbench.action.quickchat.toggle)`): ask quick questions without leaving your current task

* AI in the [editor](/docs/copilot/ai-powered-suggestions.md)
    * Code completions: get suggestions as you type, press `kb(editor.action.inlineSuggest.commit)` to accept a suggestion
    * Edit context menu actions: access common AI actions like explaining or fixing code, generating tests, or reviewing a text selection
    * Code actions: get editor code actions (lightbulb) to fix linting and compiler errors

* Task-specific [smart actions](/docs/copilot/copilot-smart-actions.md) across VS Code
    * Generate commit messages and pull request titles and descriptions
    * Fix testing errors
    * Semantic file search suggestions

## Chat experience in VS Code

Start a natural language chat conversation to get help with coding tasks. For example, ask to explain a block of code or a programming concept, refactor a piece of code, or implement a new feature. Get more information about using [Copilot Chat](/docs/copilot/chat/copilot-chat.md).

| Action | Description |
|--------|-------------|
| `kb(workbench.action.chat.open)` | Open the [Chat view](/docs/copilot/chat/copilot-chat.md) in the Secondary Side Bar. |
| `kb(inlinechat.start)` | Start [inline chat](/docs/copilot/chat/inline-chat.md) to open chat in the editor or terminal. |
| `kb(workbench.action.quickchat.toggle)` | Open [Quick Chat](/docs/copilot/chat/copilot-chat.md) without interrupting your workflow. |
| `kb(workbench.action.chat.newChat)` | Start a new chat session in the Chat view. |
| `kb(workbench.action.chat.toggleAgentMode)` | Toggle between different [agents](/docs/copilot/customization/custom-agents.md) in the Chat view. |
| `kb(workbench.action.chat.openModelPicker)` | Show the model picker to [select a different AI model](/docs/copilot/customization/language-models.md) for chat. |
| `Add Context...` | Attach different types of [context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md). |
| `/`-command | Use [slash commands](#slash-commands) for common tasks or invoke a [reusable chat prompt](/docs/copilot/customization/overview.md). |
| `#`-mention | Reference common tools or chat variables to [provide context](/docs/copilot/chat/copilot-chat-context.md) within in your prompt. |
| `@`-mention | Reference [chat participants](#chat-participants) to handle domain-specific requests. |
| Edit (<i class="codicon codicon-pencil"></i>) | [Edit a previous chat prompt](/docs/copilot/chat/chat-checkpoints.md#edit-a-previous-chat-request) and revert changes. |
| History (<i class="codicon codicon-history"></i>) | Access your history of chat sessions. |
| Voice (<i class="codicon codicon-mic"></i>) | Enter a chat prompt by using speech (voice chat). The chat response is read out aloud. |
| [KaTeX](https://katex.org) | Render mathematical equations in chat responses. Enable with `setting(chat.math.enabled)`. |

> **Tips**
>
> * Use `#`-mentions to add more context to your chat prompt.
> * Use `/` commands and `@` participants to get more precise and relevant answers.
> * Be specific, keep it simple, and ask follow-up questions to get the best results.
> * Choose an agent that fits your needs: Ask, Edit, Agent, or create a custom agent.

## Add context to your prompt

Get more relevant responses by providing [context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md). Choose from different context types, such as files, symbols, editor selections, source control commits, test failures, and more.

| Action | Description |
|--------|-------------|
| **Add Context** | Open a Quick Pick to select relevant context for your chat prompt. Choose from different context types, such as workspace files, symbols, current editor selection, terminal selection, and more. |
| Drag & drop files | Drag & drop a file from the Explorer or Search view, or drag an editor tab onto the Chat view. |
| Drag & drop folders | Drag & drop a folder onto the Chat view to attach the files within it. |
| Drag & drop problem | Drag & drop an item from the Problems panel. |
| `#<file\|folder\|symbol>` | Type `#`, followed by a file, folder, or symbol name, to add it as chat context. |
| `#`-mention | Type `#`, followed by a [chat tool](#chat-tools) to add a specific context type or tool. |

## Chat tools

Use [tools](/docs/copilot/chat/chat-tools.md) in chat to accomplish specialized tasks while processing a user request. Examples of such tasks are listing the files in a directory, editing a file in your workspace, running a terminal command, getting the output from the terminal, and more.

VS Code provides built-in tools, and you can extend chat with tools from [MCP servers](/docs/copilot/customization/mcp-servers.md) and [extensions](/api/extension-guides/ai/tools.md). Learn more about [types of tools](/docs/copilot/chat/chat-tools.md#types-of-tools).

The following table lists the VS Code built-in tools:

| Chat variable/Tool | Description |
|--------|-------------|
| `#changes` | List of source control changes. |
| `#codebase` | Perform a code search in the current workspace to automatically find relevant context for the chat prompt. |
| `#createAndRunTask` | Create and run a new [task](/docs/debugtest/tasks.md) in the workspace. |
| `#createDirectory` | Create a new directory in the workspace. |
| `#createFile` | Create a new file in the workspace. |
| `#edit` (tool set) | Enable modifications in the workspace. |
| `#editFiles` | Apply edits to files in the workspace. |
| `#editNotebook` | Make edits to a notebook. |
| `#extensions` | Search for and ask about VS Code extensions. For example, "how to get started with Python #extensions?" |
| `#fetch` | Fetch the content from a given web page. For example, "Summarize #fetch code.visualstudio.com/updates." |
| `#fileSearch` | Search for files in the workspace by using glob patterns and returns their path. |
| `#getNotebookSummary` | Get the list of notebook cells and their details. |
| `#getProjectSetupInfo` | Provide instructions and configuration for scaffolding different types of projects. |
| `#getTaskOutput` | Get the output from running a [task](/docs/debugtest/tasks.md) in the workspace. |
| `#getTerminalOutput` | Get the output from running a terminal command in the workspace. |
| `#githubRepo` | Perform a code search in a GitHub repo. For example, "what is a global snippet #githubRepo microsoft/vscode." |
| `#installExtension` | Install a VS Code extension. |
| `#listDirectory` | List files in a directory in the workspace. |
| `#new` | Scaffold a new VS Code workspace, preconfigured with debug and run configurations. |
| `#newJupyterNotebook` | Scaffold a new Jupyter notebook given a description. |
| `#newWorkspace` | Create a new workspace. |
| `#openSimpleBrowser` | Open the built-in Simple Browser and preview a locally-deployed web app. |
| `#problems` | Add workspace issues and problems from the **Problems** panel as context. Useful while fixing code or debugging. |
| `#readFile` | Read the content of a file in the workspace. |
| `#readNotebookCellOutput` | Read the output from a notebook cell execution. |
| `#runCell` | Run a notebook cell. |
| `#runCommands` (tool set) | Enable running commands in the terminal and reading the output. |
| `#runInTerminal` | Run a shell command in the integrated terminal. |
| `#runNotebooks` (tool set) | Enable running notebook cells. |
| `#runTask` | Run an existing [task](/docs/debugtest/tasks.md) in the workspace. |
| `#runTasks` (tool set) | Enable running [tasks](/docs/debugtest/tasks.md) in the workspace and reading the output. |
| `#runSubagent` _(Insiders)_ | Run a task in an isolated [subagent context](/docs/copilot/chat/chat-sessions.md#subagents). Helps to improve the context management of the main agent thread. |
| `#runTests` | Run [unit tests](/docs/debugtest/testing.md) in the workspace. |
| `#runVscodeCommand` | Run a VS Code command. For example, "Enable zen mode #runVscodeCommand." |
| `#search` (tool set) | Enable searching for files in the current workspace. |
| `#searchResults` | Get the search results from the Search view. |
| `#selection` | Get the current editor selection (only available when text is selected). |
| `#terminalLastCommand` | Get the last run terminal command and its output. |
| `#terminalSelection` | Get the current terminal selection. |
| `#testFailure` | Get unit test failure information. Useful when running and diagnosing [tests](/docs/debugtest/testing.md). |
| `#textSearch` | Find text in files. |
| `#todos` | Track implementation and progress of a chat request with a todo list. |
| `#usages` | Combination of "Find All References", "Find Implementation", and "Go to Definition". |
| `#VSCodeAPI` | Ask about VS Code functionality and extension development. |

## Slash commands

Slash commands are shortcuts to specific functionality within the chat. You can use them to quickly perform actions, like fixing issues, generating tests, or explaining code.

| Slash command | Description |
|---------------|-------------|
| `/doc` | Generate code documentation comments from editor inline chat. |
| `/explain` | Explain a code block, file, or programming concept. |
| `/fix` | Ask to fix a code block or resolve compiler or linting errors. |
| `/tests` | Generate tests for all or only the selected methods and functions in the editor. |
| `/setupTests` | Get help setting up a testing framework for your code. Get recommendation for a relevant testing framework, steps to set up and configure it, and suggestions for VS Code testing extensions. |
| `/clear` | Start a new chat session in the Chat view. |
| `/new` | Scaffold a new VS Code workspace or file. Use natural language to describe the type of project/file you need, and preview the scaffolded content before creating it. |
| `/newNotebook` | Scaffold a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain. |
| `/search` | Generate a search query for the Search view. Use natural language to describe what you want to search for. |
| `/startDebugging` | Generate a `launch.json` debug configuration file and start a debugging session from the Chat view. |
| `/<prompt name>` | Run a [reusable prompt](/docs/copilot/customization/prompt-files.md) in chat. |

## Chat participants

Use chat participants to handle domain-specific requests in chat. Chat participants are prefixed with `@` and can be used to ask questions about specific topics. VS Code provides built-in chat participants, such as `@github`, `@terminal`, and `@vscode`, and extensions can provide additional participants.

| Chat participant | Description |
|------------------|-------------|
| `@github` | Use the `@github` participant to ask questions about GitHub repositories, issues, pull requests, and more. Get more information about the [available GitHub skills](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#currently-available-skills).<br/>Example: `@github What are all of the open PRs assigned to me?`, `@github Show me the recent merged PRs from @dancing-mona` |
| `@terminal` | Use the `@terminal` participant to ask questions about the integrated terminal or shell commands.<br/>Example: `@terminal list the 5 largest files in this workspace` |
| `@vscode` | Use the `@vscode` participant to ask questions about VS Code features, settings, and the VS Code extension APIs.<br/>Example: `@vscode how to enable  word wrapping?` |
| `@workspace` | Use the `@workspace` participant to ask questions about the current workspace.<br/>Example: `@workspace how is authentication implemented?` |

## Use agents

When using [agents](/docs/copilot/chat/copilot-chat.md#built-in-agents), you can use natural language to specify a high-level task, and let AI autonomously reason about the request, plan the work needed, and apply the changes to your codebase. Agents use a combination of code editing and tool invocation to accomplish the task you specified. As it processes your request, it monitors the outcome of edits and tools, and iterates to resolve any issues that arise.

| Action | Description |
|--------|-------------|
| `kb(workbench.action.chat.openAgent)` | Switch to using agents in the Chat view |
| Tools (<i class="codicon codicon-tools"></i>) | Configure which tools are available when using agents. Select from built-in tools, MCP servers, and extension-provided tools. |
| Auto-approve tools _(Experimental)_ | Enable [auto-approval of all tools](/docs/copilot/chat/chat-tools.md#auto-approve-all-tools) when using agents (`setting(chat.tools.autoApprove)`). |
| Auto-approve terminal commands _(Experimental)_ | Enable [auto-approval of terminal commands](/docs/copilot/chat/chat-tools.md#automatically-approve-terminal-commands) when using agents (`setting(chat.tools.terminal.autoApprove)`). |
| MCP | Configure [MCP servers](/docs/copilot/customization/mcp-servers.md) to extend agent capabilities and tools. |

> **Tips**
>
> * Add extra tools when using agents to extend its capabilities.
> * Configure custom agents to define how the agent should operate, for example to implement a read-only planning mode.
> * Define custom instructions to guide agents on how to generate and structure code.

## Planning

Use the [plan agent](/docs/copilot/chat/chat-planning.md) in VS Code chat to create detailed implementation plans before starting complex coding tasks. Hand off the approved plan to an implementation agent to start coding.

| Action | Description |
|--------|-------------|
| Plan agent | Select the **Plan** agent from the agents dropdown in the Chat view to create a detailed implementation plan for complex coding tasks. |
| Todo list (Experimental) | Enable the `todos` tool in the tools picker to track progress on complex tasks with a todo list. |

## Customize your chat experience

Customize your chat experience to generate responses that match your coding style, tools, and developer workflow. There are several ways to customize your chat experience in VS Code:

* [Custom instructions](/docs/copilot/customization/custom-instructions.md): Define common guidelines or rules for tasks like generating code, performing code reviews, or generating commit messages. Custom instructions describe the conditions in which the AI should operate (_how_ a task should be done).

* [Reusable prompt files](/docs/copilot/customization/prompt-files.md): Define reusable prompts for common tasks like generating code or performing a code review. Prompt files are standalone prompts that you can run directly in chat. They describe the task to be performed (_what_ should be done).

* [Custom agents](/docs/copilot/customization/custom-agents.md): Define how chat operates, which tools it can use, and how it interacts with the codebase. Each chat prompt is run within the boundaries of the agent, without having to configure tools and instructions for every request.

> **Tips**
>
> * Define language-specific instructions to get more accurate generated code for each language.
> * Store your instructions in your workspace to easily share them with your team.
> * Define reusable prompt files for common tasks to save time and help team members get started quickly.

## Editor AI features

As you're coding in the editor, you can use Copilot to generate code completions as you're typing. Invoke Inline Chat to ask questions and get help from Copilot, while staying in the flow of coding. For example, ask Copilot to generate unit tests for a function or method. Get more information about [code completions](/docs/copilot/ai-powered-suggestions.md) and [Inline Chat](/docs/copilot/chat/inline-chat.md).

| Action | Description |
|--------|-------------|
| Code completions | Start typing in the editor and get [code suggestions](/docs/copilot/ai-powered-suggestions.md) that match your coding style and take your existing code into account. |
| Code comments | Provide a code completion prompt by writing instructions in a code comment.<br/>Example: `# write a calculator class with methods for add, subtract, and multiply. Use static methods.` |
| `kb(inlinechat.start)` | Start editor inline chat to send a chat request directly from the editor. Use natural language and reference chat variables and slash commands to provide context. |
| `kb(editor.action.rename)` | Get AI-powered suggestions when renaming symbols in your code. |
| Context menu actions | Use the editor context menu to access common AI actions, such as explaining code, generating tests, reviewing code, and more. Right-click in the editor to open the context menu and select **Generate Code**. |
| Code Actions (lightbulb) | Select the Code Action (lightbulb) in the editor for fixing linting or compiler errors in your code. |

> **Tips**
>
> * Use meaningful method or function names to get better code completions quicker.
> * Select a code block to scope your Inline Chat prompt or attach relevant context by attaching files or symbols.
> * Use the editor context menu options to access common AI-powered actions directly from the editor.

## Source control and issues

Use AI to analyze the changes in your commits and pull requests and provide suggestions for commit messages and pull request descriptions.

| Action | Description |
|--------|-------------|
| `#changes` | Add the current source control changes as context in your chat prompt. |
| Commit as context | Add a commit from the source control history as context in your chat prompt. |
| Commit message | Generate a commit message for the current changes in a source control commit. |
| Merge conflicts (Experimental) | Get help [resolving Git merge conflicts with AI](/docs/sourcecontrol/overview#resolve-merge-conflicts-with-ai-experimental). |
| Pull request description | Generate a pull request title and description that correspond with the changes in your pull request. |
| `@github` | Use the `@github` participant in chat to ask about issues, pull requests, and more across your repositories. Get more information about the [available GitHub skills](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#currently-available-skills).<br/>Example: `@github What are all of the open PRs assigned to me?`, `@github Show me the recent merged pr's from @dancing-mona`  |

## Review code (experimental)

Use AI to do a quick review pass of a code block or perform a review of uncommitted changes in your workspace. Review feedback shows up as comments in the editor, where you can apply the suggestions.

| Action | Description |
|--------|-------------|
| **Review Selection** _(Preview)_ | Select a block of code, and select **Generate Code** > **Review** from the editor context menu for a quick review pass. |
| **Code Review** | Select the **Code Review** button in the Source Control view for a deeper review of all uncommitted changes. |

## Search and settings

Get semantically relevant search results in the Search view or help with searching for settings in the Settings editor.

| Action | Description |
|--------|-------------|
| Settings search | Include semantic search results in the Settings editor (`setting(workbench.settings.showAISearchToggle)`). |
| Semantic search _(Preview)_ | Include semantic search results in the Search view (`setting(search.searchView.semanticSearchBehavior)`). |

## Generate tests

VS Code can generate tests for functions and methods in your codebase by using slash commands in chat. Slash commands are a shorthand notation for common tasks that you can use in chat prompts. Type `/` followed by the command name to use a slash command.

| Action | Description |
|--------|-------------|
| `/tests` | Generate tests for all or only the selected methods and functions in the editor. The generated tests are appended in an existing tests file or a new tests file is created.  |
| `/setupTests` | Get help setting up a testing framework for your code. Get recommendation for a relevant testing framework, steps to set up and configure it, and suggestions for VS Code testing extensions.   |
| `/fixTestFailure` | Ask Copilot for suggestions on how to fix failing tests. |
| Test coverage _(Experimental)_ | Generate tests for functions and methods that are not yet covered by tests. [Get more information](https://code.visualstudio.com/updates/v1_93#_generate-tests-based-on-test-coverage-experimental). |

> **Tips**
>
> * Provide details about the testing frameworks or libraries to use.

## Debug and fix problems

Use Copilot to help fix coding problems and to get help with configuring and starting debugging sessions in VS Code.

| Action | Description |
|--------|-------------|
| `/fix` | Ask Copilot for suggestions on how to fix a block of code or how to resolve any compiler or linting errors in your code. For example, to help fix unresolved Node.js package names. |
| `/fixTestFailure` | Ask Copilot for suggestions on how to fix failing tests. |
| `/startDebugging` _(Experimental)_ | Generate a `launch.json` debug configuration file and [start a debugging session](/docs/copilot/guides/debug-with-copilot.md) from the Chat view. |
| `copilot-debug` command | Terminal command to help you [debug your programs](/docs/copilot/guides/debug-with-copilot.md). Prefix a run command to start a debugging session for it (for example, `copilot-debug python foo.py`). |

> **Tips**
>
> * Provide additional information about the type of fix you need, such as optimizing the memory consumption or performance.
> * Watch for Copilot Code Actions in the editor that indicate suggestions for fixing problems in your code.

## Scaffold a new project

Copilot can help you create a new project by generating a scaffold of the project structure, or generate a notebook based on your requirements.

| Action | Description |
|--------|-------------|
| Agent | Use [agents](/docs/copilot/chat/copilot-chat.md#built-in-agents) and use a natural language prompt to create a new project or file. For example, `Create a svelte web application to track my tasks`. |
| `/new` | Use the `/new` command in the Chat view to scaffold a new project or a new file. Use natural language to describe the type of project/file you need, and preview the scaffolded content before creating it.<br/>Example: `/new Express app using typescript and svelte` |
| `/newNotebook` | Use the `/newNotebook` command in the Chat view to generate a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain.<br/>Example: `/newNotebook get census data and preview key insights with Seaborn`. |

## Terminal

Get help about shell commands and how to resolve errors when running commands in the terminal.

| Action | Description |
|--------|-------------|
| `kb(inlinechat.start)` | Start terminal inline chat to use natural language for asking about shell commands and the terminal.<br/>Example: `how many cores on this machine?` |
| `@terminal` | Use the `@terminal` participant in the Chat view to ask questions about the integrated terminal or shell commands.<br/>Example: `@terminal list the 5 largest files in this workspace` |
| `@terminal /explain` | Use the `/explain` command in the Chat view to explain something from the terminal.<br/>Example: `@terminal /explain top shell command` |

## Python and notebook support

You can use chat to help you with Python programming tasks in the Native Python REPL and in Jupyter notebooks.

| Action | Description |
|--------|-------------|
| <i class="codicon codicon-sparkle"></i> Generate<br/>`kb(inlinechat.start)` | Start Inline Chat in a notebook to generate a codeblock or Markdown block. |
| `#` | Attach variables from the Jupyter kernel in your chat prompt to get more relevant responses. |
| Native REPL + `kb(inlinechat.start)` | Start Inline Chat in the Native Python REPL and run the generated commands. |
| `kb(workbench.action.chat.open)` | Open the **Chat view** and use agents to make notebook edits. |
| `/newNotebook` | Use the `/newNotebook` command in the Chat view to generate a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain.<br/>Example: `/newNotebook get census data and preview key insights with Seaborn`. |

## Next steps

* [Tutorial: Get started with AI features in VS Code](/docs/copilot/getting-started.md)
