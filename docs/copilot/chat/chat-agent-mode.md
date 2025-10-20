---
ContentId: 57754e12-a134-41cc-9693-fb187729c49f
DateApproved: 10/09/2025
MetaDescription: Use chat agent mode in VS Code to start an agentic code editing session to autonomously make edits and invoke tools. Use built-in tools, MCP tools, or tools from extensions.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use agent mode in VS Code

With chat _agent mode_ in Visual Studio Code, you can use natural language to specify a high-level task, and let AI autonomously reason about the request, plan the work needed, and apply the changes to your codebase. Agent mode uses a combination of code editing and tool invocation to accomplish the task you specified. As it processes your request, it monitors the outcome of edits and tools, and iterates to resolve any issues that arise.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Why use agent mode?

Agent mode is optimized for the following scenarios:

* Coding tasks based on high-level requirements or less well-defined implementation details
* Making autonomous edits across multiple files in your project
* Handling complex tasks that require not only code edits but also the invocation of tools and terminal commands

Agent mode autonomously determines the relevant context and tasks to accomplish a given request. It can also iterate multiple times to resolve intermediate issues, such as syntax errors or test failures.

Some examples of tasks you can use agent mode for:

* Refactor parts of your codebase, such as "refactor the app to use a Redis cache".
* Plan and implement new features, such as "add a login form to the app using OAuth for authentication".
* Migrate your codebase to a new framework, such as "migrate the app from React to Vue.js".
* Generate an implementation plan for a complex task, such as "create a meal-planning web app using a Swift front-end and a Node.js back-end".
* Define a high-level requirement, such as "add social media sharing functionality".

> [!IMPORTANT]
> It's important to be aware of the security considerations of using AI-powered development. Review the [Security documentation](/docs/copilot/security.md) for using AI in VS Code.

## Agent mode vs Copilot coding agent

VS Code offers two autonomous coding experiences. While agent mode provides interactive development directly within the editor, the [Copilot coding agent](/docs/copilot/copilot-coding-agent.md) works independently on GitHub to implement features in the background.

| Feature | Agent mode | Copilot coding agent |
|---------|------------------|---------------------|
| **Where it runs** | Your VS Code editor | GitHub cloud |
| **Independence** | Involves user interaction and iteration | Fully autonomous |
| **Output** | Edits files directly | Creates pull requests |
| **Best for** | Interactive development, immediate feedback | Well-defined tasks, background work |

This document describes agent mode. You can learn more about the Copilot coding agent in its [documentation](/docs/copilot/copilot-coding-agent.md).

## Enable agent mode in VS Code

> [!NOTE]
> Agent mode is available starting from VS Code 1.99.

To enable agent mode in VS Code, enable the `setting(chat.agent.enabled)` setting.

### Centrally manage agent mode

To centrally enable or disable agent mode within your organization with device management, check [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

You can centrally manage the following settings related to agent mode:

* `setting(chat.agent.enabled)`: enable or disable agent mode

* `setting(chat.extensionTools.enabled)`: enable or disable using tools contributed by third-party extensions

* `setting(chat.tools.autoApprove)`: enable or disable auto-approval for agent mode tools

## Use agent mode

In agent mode, the AI operates autonomously and determines the relevant context for your prompt.

Follow these steps to get started:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Agent** from the chat mode selector.

    ![Screenshot showing the Chat view, highlighting agent mode selected.](images/copilot-edits/copilot-edits-agent-mode.png)

    Directly open agent mode in VS Code [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) or [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent).

1. Enter your prompt for making edits in the chat input field and select **Send** (`kb(workbench.action.edits.submit)`) to submit it.

    You can specify a high-level requirement, and you don't have to specify which files to work on. In agent mode, the AI determines the relevant context and files to edit autonomously.

1. Agent mode might invoke multiple [tools](#tools-in-agent-mode) to accomplish different tasks. Optionally, select the **Tools** icon to configure which tools can be used for responding to your request.

    ![Screenshot showing the Chat view in agent mode, highlighting the Tools icon, and showing the tools Quick Pick control.](images/copilot-edits/agent-mode-select-tools.png)

    > [!TIP]
    > You can also directly reference a tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode).

1. Review and approve tool invocations when prompted.

    Before running certain tools, VS Code requests confirmation to continue. This is a security measure because tools might perform actions that modify files or data.

    ![MCP Tool Confirmation](../images/mcp-servers/mcp-tool-confirmation.png)

    You can approve tools for the current session, workspace, or all future invocations. Learn more about [managing tool approvals](/docs/copilot/chat/chat-tools.md#tool-approval).

    If your project has configured [tasks](/docs/debugtest/tasks.md) in `tasks.json`, agent mode tries to run the appropriate tasks. For example, if you've defined a build task, agent mode will run the build task before running the application. Enable or disable running workspace tasks with the `setting(github.copilot.chat.agent.runTasks)` setting.

1. VS Code detects issues and problems in code edits and terminal commands and will iterate to resolve them.

    Enable the `setting(github.copilot.chat.agent.autoFix)` setting to automatically diagnose and fix issues in the generated code changes. This setting is enabled by default.

    For example, agent mode might run unit tests as a result of a code edit. If the tests fail, it uses the test outcome to resolve the issue.

    Agent mode iterates multiple times to resolve issues and problems. The `setting(chat.agent.maxRequests)` setting controls the maximum number of requests that agent mode can make before asking you if it can continue.

1. As your chat request is processed, notice that suggested code edits appear directly in the editor.

    You can view the list of changed files in the Chat view. The editor overlay controls enable you to navigate between the suggested edits.

    > [!NOTE]
    > AI-generated code edits are restricted to the files in your current workspace.

1. Review the suggested edits and [accept or discard the suggested edits](/docs/copilot/chat/review-code-edits.md).

1. Continue to iterate on the code changes to refine the edits or implement additional features.

## Tools in agent mode

Agent mode uses [tools](/docs/copilot/chat/chat-tools.md) to accomplish specialized tasks while processing your request. Examples include listing files, editing code, running commands, and fetching external content. Agent mode automatically determines which tools to use and can invoke multiple tools, iterating based on results to fix issues as they arise.

You can view and manage which tools are available by selecting the **Tools** icon in the Chat view.

![Screenshot showing the Chat view, highlighting the Tools icon in the chat input and showing the tools Quick Pick where you can select which tools are active.](images/copilot-edits/agent-mode-select-tools.png)

> [!IMPORTANT]
> A chat request can have a maximum of 128 tools enabled at a time. If you have more than 128 tools selected, reduce the number of tools by deselecting some tools in the tools picker, or ensure that virtual tools are enabled (`setting(github.copilot.chat.virtualTools.threshold)`).

Learn more about the [types of tools](/docs/copilot/chat/chat-tools.md#types-of-tools) and how to [use tools in chat](/docs/copilot/chat/chat-tools.md).

### Configure terminal profile

Agent mode can run terminal commands as part of processing your request. For example, it might run build or test commands to verify the outcome of code edits.

You can configure which [terminal profile](/docs/terminal/profiles.md) is used for running terminal commands with the following settings:

* Windows: `setting(chat.tools.terminal.terminalProfile.windows)`
* Linux: `setting(chat.tools.terminal.terminalProfile.linux)`
* macOS: `setting(chat.tools.terminal.terminalProfile.macos)`

## Edit a previous chat request

You can edit a previous chat request in the active chat session. This is useful if you want to refine your prompt or correct a mistake. Editing a chat request is equivalent to reverting the request and then submitting a new request with the edited prompt. Learn more about [editing a previous chat request](/docs/copilot/chat/chat-checkpoints.md#edit-a-previous-chat-request).

<video src="images/copilot-chat/chat-edit-request.mp4" title="Video showing the editing of a previous chat request in the Chat view." autoplay loop controls muted></video>

## Revert edits with checkpoints

Chat checkpoints provide a way to restore the state of your workspace to a previous point in time, and are particularly useful when chat interactions resulted in changes across multiple files.

When checkpoints are enabled, VS Code automatically creates snapshots of your files at key points during chat interactions, allowing you to return to a known good state if the changes made by chat requests are not what you expected or if you want to try a different approach.

To enable checkpoints, configure the `setting(chat.checkpoints.enabled)` setting.

![Screenshot of the Chat view, showing the Restore Checkpoint action in the Chat view.](images/copilot-chat/chat-restore-checkpoint.png)

Learn more about working with [checkpoints in chat](/docs/copilot/chat/chat-checkpoints.md).

## Track progress with todo lists (Experimental)

To have a better overview of the individual tasks that the agent is working on, you can enable the experimental todo list feature in agent mode. This feature helps you track the progress of the tasks being completed by the agent. This also help the agent to stay focused on the overall goal. As the agent completes tasks, it updates the todo list to reflect the current state of the work.

<video src="images/agent-mode/chat-todo-list.mp4" title="Video that shows the todo list in chat." autoplay loop controls muted></video>

You can configure the visibility and position of the todo list control with the `setting(chat.todoListWidget.position)` setting.

## Use instructions to get AI edits that follow your coding style

To get AI-generated code edits that follow your coding style, preferred frameworks, and other preferences, you can use instruction files. Instruction files enable you to describe your coding style and preferences in Markdown files, which the AI uses to generate code edits that match your requirements.

You can manually attach instruction files as context to your chat prompt, or you can configure the instruction files to be automatically applied.

The following code snippet shows an example of an instruction file that describes your coding style and preferences:

```markdown
---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
```

Learn more about [using instruction files](/docs/copilot/customization/overview.md).

## Settings

The following list contains the settings related to agent mode. You can configure settings through the Settings editor (`kb(workbench.action.openSettings)`).

* `setting(chat.agent.enabled)`: enable or disable agent mode (default: `false`, requires VS Code 1.99 or later)
* `setting(chat.agent.maxRequests)`: maximum number of requests that chat can make in agent mode (default: 5 for Copilot Free users, 15 for other users)
* `setting(github.copilot.chat.agent.runTasks)`: run workspace tasks when using agent mode (default: `true`)
* `setting(github.copilot.chat.agent.autoFix)`: automatically diagnose and fix issues in the generated code changes (default: `true`)

## Frequently asked questions

### Why would I use agent mode instead of edit mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: agent mode autonomously determines the relevant context and files to edit. In edit mode, you need to specify the context yourself.
* **Task complexity**: agent mode is better suited for complex tasks that require not only code edits but also the invocation of tools and terminal commands.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Self-healing**: agent mode evaluates the outcome of the generated edits and might iterate multiple times to resolve intermediate issues.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

### When should I use Copilot coding agent instead of agent mode?

Use [Copilot coding agent](/docs/copilot/copilot-coding-agent.md) for well-defined tasks that can be handled independently in the background without immediate user interaction. Use agent mode when you want to stay involved in the development process and iterate quickly on changes.

> [!TIP]
> Use both experiences together by starting with agent mode to analyze the feature and determine the implementation approach, and then hand off the well-defined task to the Copilot coding agent to work on it in the background.

### I'm getting an error that says "Cannot have more than 128 tools per request."

A chat request can have a maximum of 128 tools enabled at a time. If you have more than 128 tools selected, reduce the number of tools by deselecting some tools in the tools picker in the Chat view, or ensure that virtual tools are enabled (`setting(github.copilot.chat.virtualTools.threshold)`).

![Screenshot showing the Chat view, highlighting the Tools icon in the chat input and showing the tools Quick Pick where you can select which tools are active.](images/copilot-edits/agent-mode-select-tools.png)

## Related resources

* [Use tools in chat](/docs/copilot/chat/chat-tools.md)
* [Customize AI with instructions and prompts](/docs/copilot/customization/overview.md)
* [Implement tasks in the background with Copilot coding agent](/docs/copilot/copilot-coding-agent.md)
