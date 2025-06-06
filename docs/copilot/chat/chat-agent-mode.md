---
ContentId: 57754e12-a134-41cc-9693-fb187729c49f
DateApproved: 05/08/2025
MetaDescription: Use chat agent mode in VS Code to start an agentic code editing session to autonomously make edits and invoke tools. Use built-in tools, MCP tools, or tools from extensions.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use agent mode in VS Code

With chat _agent mode_ in Visual Studio Code, you can use natural language to specify a high-level task, and let AI autonomously reason about the request, plan the work needed, and apply the changes to your codebase. Agent mode uses a combination of code editing and tool invocation to accomplish the task you specified. As it processes your request, it monitors the outcome of edits and tools, and iterates to resolve any issues that arise.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Why use agent mode?

Agent mode is optimized for making autonomous edits across multiple files in your project. It is particularly useful for complex tasks that require not only code edits but also the invocation of tools and terminal commands. You can use agent mode to:

* Refactor parts of your codebase, such as "refactor the app to use a Redis cache".
* Plan and implement new features, such as "add a login form to the app using OAuth for authentication".
* Migrate your codebase to a new framework, such as "migrate the app from React to Vue.js".
* Generate an implementation plan for a complex task, such as "create a meal-planning web app using a Swift front-end and a Node.js back-end".
* Define a high-level requirement, such as "add social media sharing functionality".

Agent mode is particularly useful for coding tasks when you have a less well-defined task that might also require running terminal commands and tools. Agent mode autonomously determines the relevant context and tasks to accomplish the request. It can also iterate multiple times to resolve intermediate issues, such as syntax errors or test failures.

## Enable agent mode in VS Code

> [!NOTE]
> Agent mode is available starting from VS Code 1.99.

To enable agent mode in VS Code, enable the `setting(chat.agent.enabled)` setting.

To centrally enable or disable agent mode within your organization, check [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

## Use agent mode

In agent mode, the AI operates autonomously and determines the relevant context for your prompt.

Follow these steps to get started:

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Agent** from the chat mode selector.

    ![Screenshot showing the Chat view, highlighting agent mode selected.](images/copilot-edits/copilot-edits-agent-mode.png)

    Directly open agent mode in VS Code [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) or [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent).

1. Enter your prompt for making edits in the chat input field and select **Send** (`kb(workbench.action.edits.submit)`) to submit it.

    You can specify a high-level requirement, and you don't have to specify which files to work on. In agent mode, the AI determines the relevant context and files to edit autonomously.

    Experiment with some of these example prompts to get started:

    * `Create a meal-planning web app using React and Node.js`
    * `Add social media sharing functionality`
    * `Replace current auth with OAuth`

1. Agent mode might invoke multiple [tools](#agent-mode-tools) to accomplish different tasks. Optionally, select the **Tools** icon to configure which tools can be used for responding to your request.

    ![Screenshot showing the Copilot Edits view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-select-tools.png)

    > [!TIP]
    > You can also directly reference a tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode).

1. Confirm tool invocations and terminal commands.

    Before running a terminal command or non-builtin tool, Copilot requests confirmation to continue. This is because tools might run locally on your machine and perform actions that modify files or data.

    Use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations. Learn how to [manage tool approvals and approve all tool invocations](#manage-tool-approvals).

    ![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

    If your project has configured [tasks](/docs/debugtest/tasks.md) in `tasks.json`, agent mode tries to run the appropriate tasks. For example, if you've defined a build task, agent mode will run the build task before running the application. Enable or disable running workspace tasks with the `setting(github.copilot.chat.agent.runTasks)` setting.

1. Optionally, verify and edit the tool input parameters before running the tool.

    Select the chevron next to the tool name to view its details and input parameters. You can edit the input parameters before running the tool.

    ![MCP Tool Input Parameters](images/mcp-servers/mcp-tool-edit-parameters.png)

1. Copilot detects issues and problems in code edits and terminal commands and will iterate and perform additional actions to resolve them.

    Enable the `setting(github.copilot.chat.agent.autoFix)` setting to automatically diagnose and fix issues in the generated code changes. This setting is enabled by default.

    For example, agent mode might run unit tests as a result of a code edit. If the tests fail, it uses the test outcome to resolve the issue.

    Copilot Edits agent mode iterates multiple times to resolve issues and problems. The `setting(chat.agent.maxRequests)` setting controls the maximum number of requests that Copilot Edits can make in agent mode.

1. As Copilot processes your request, notice that Copilot streams the suggested code edits directly in the editor.

    The Chat view shows the list of files that were edited in bold text. The editor overlay controls enable you to navigate between the suggested edits.

1. Review the suggested edits and [accept or discard the suggested edits](#accept-or-discard-edits).

1. Continue to iterate on the code changes to refine the edits or implement additional features.

## Agent mode tools

Agent mode uses tools to accomplish specialized tasks while processing a user request. Examples of such tasks are listing the files in a directory, editing a file in your workspace, running a terminal command, getting the output from the terminal, and more.

Agent mode can use the following tools:

* Built-in tools
* [MCP tools](/docs/copilot/chat/mcp-servers.md)
* [Tools contributed by extensions](/api/extension-guides/tools.md)

You can view and manage the tools that can be used for responding to a request. Select the **Tools** icon in the Chat view to view and manage the tools that are available in agent mode.

![Screenshot showing the Copilot Edits view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-select-tools.png)

Based on the outcome of a tool, Copilot might invoke other tools to accomplish the overall request. For example, if a code edit results in syntax errors in the file, Copilot might explore another approach and suggest different code changes.

You can enable or disable the use of agent tools by configuring the `setting(chat.extensionTools.enabled)` setting. Learn how to centrally manage this setting in your organization by checking [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

### Define tool sets

A tool set is a collection of tools that you can use in chat. You can use tool sets in the same way as you would use individual tools. For example, select a tool set with the tools picker in agent mode or reference the tool set directly in your prompt by typing `#` followed by the tool set name.

![Screenshot showing the tools picker, highlighting user-defined tool sets.](images/agent-mode/tools-picker-tool-sets.png)

Tool sets enable you to group related tools together, making it easier to use them in your chat prompts, [prompt files](/docs/copilot/copilot-customization.md), or [custom chat modes](/docs/copilot/chat/chat-modes.md). This can be particularly useful when you have many installed tools from MCP servers or extensions.

To create a tool set, use the **Chat: Configure Tool Sets** > **Create new tool sets file** command in the Command Palette. A tool sets file is a `.jsonc` file that is stored in your user profile.

A tool set has the following structure:

* `<tool set name>`: name of the tool set, which is displayed in the tools picker and when referencing the tool set in your prompt.
* `tools`: list of tool names that are included in the tool set. The tools can be built-in tools, MCP tools, or tools contributed by extensions.
* `description`: brief description of the tool set. This description is displayed alongside the tool set name in the tools picker.
* `icon`: icon for the tool set, values can be found in the [Product Icon Reference](/api/references/icons-in-labels.md).

The following code snippet shows an example of a tool sets file:

```json
{
    "reader": {
        "tools": [
            "changes", "codebase", "fetch", "findTestFiles", "githubRepo", "problems", "usages"
        ],
        "description": "description",
        "icon": "tag"
    }
}
```

## Manage tool approvals

When a tool is invoked, Copilot requests confirmation to run the tool. This is because tools might run locally on your machine and perform actions that modify files or data.

In the Chat view, after a tool invocation, use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations.

![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

You can reset the tool confirmations by using the **Chat: Reset Tool Confirmations** command in the Command Palette.

In case you want to auto-approve _all_ tools, you can now use the experimental `setting(chat.tools.autoApprove)` setting. This will automatically approve all tool invocations, and VS Code will not ask for confirmation when a language model wishes to run tools. Bear in mind that with this setting enabled, you will not have the opportunity to cancel potentially destructive actions a model wants to take.

As an enhanced boundary, you might choose to set `setting(chat.tools.autoApprove)` only when connected to a [remote environment](/docs/remote/remote-overview.md). You'll want to set this as a remote, rather than user-level, setting. Note that remote environments that are part of your local machine (like dev containers) or that have access to your credentials will still pose different levels of risk.

Learn how to centrally manage the auto-approve tools setting in your organization by checking [Centrally Manage VS Code Settings](/docs/setup/enterprise.md#centrally-manage-vs-code-settings) in the enterprise documentation.

## Accept or discard edits

Copilot lists the files that were edited in the list of the changed files in the Chat view. Files with pending edits also have an indicator in the Explorer view and editor tabs.

![Screenshot that shows the Copilot Edits view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files-full.png)

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` (<i class="codicon codicon-arrow-up"></i>) and `kbstyle(Down)` (<i class="codicon codicon-arrow-down"></i>) controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/copilot-edits/copilot-edits-file-review-controls.png)

Use the **Keep** or **Undo** controls in the editor or Chat view to accept or reject individual or all suggested edits.

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

With the `setting(chat.editing.autoAcceptDelay)` setting, you can configure a delay after which the suggested edits are automatically accepted. Hover over the editor overlay controls to cancel the auto-accept countdown.

When you close VS Code, the status of the pending edits is remembered. When you reopen VS Code, the pending edits are restored, and you can still accept or discard the edits.

## Revert edits

As you're sending requests to make edits to your code, you might want to roll back some of these changes, for example, because you want to use another implementation strategy or because Copilot starts walking down the wrong path when generating edits.

You can use the **Undo Last Edit** control in the Chat view title bar to revert the last edits and return to the state before sending the last request. After you perform an undo of the last edit, you can redo those edits again by using the **Redo Last Edit** control in the Chat view title bar.

![Screenshot showing the Copilot Edits view, highlighting the Undo and Redo actions in the view title bar.](images/copilot-edits/copilot-edits-undo-redo.png)

You can also use the **Undo Edits (Delete)** control (`kbstyle(x)` icon) when hovering over a request in the Copilot Edits view to revert all edits that were made from that request onwards.

![Screenshot showing the Copilot Edits view, highlighting the Undo Edits control for a specific request.](images/copilot-edits/copilot-edits-undo-request.png)

## Interrupt an agent mode request

To interrupt an ongoing request, you can either **Pause** it or **Cancel** it. When you pause a request, Copilot stops processing the request and waits for your input.

When you pause a request, you can either choose to enter a new prompt, which cancels the current request, or you can choose to resume the current request.

When you cancel a request, Copilot interrupts and ends the active request. You can still [review and accept or reject](#accept-or-discard-edits) the changes that were made up to that point.

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

Learn more about [using instruction files](/docs/copilot/copilot-customization.md).

## Settings

The following list contains the settings related to agent mode. You can configure settings through the Settings editor (`kb(workbench.action.openSettings)`).

* `setting(chat.agent.enabled:true)`: enable or disable agent mode (default: `false`, requires VS Code 1.99 or later)
* `setting(chat.agent.maxRequests)`: maximum number of requests that Copilot Edits can make in agent mode (default: 5 for Copilot Free users, 15 for other users)
* `setting(github.copilot.chat.agent.runTasks)`: run workspace tasks when using agent mode in Copilot Edits (default: `true`)
* `setting(chat.mcp.discovery.enabled)`: enable or disable discovery of MCP servers configured in other tools (default: `true`)
* `setting(github.copilot.chat.agent.autoFix)`: automatically diagnose and fix issues in the generated code changes (default: `true`)
* `setting(chat.tools.autoApprove)` _(Experimental)_: automatically approve all tools (default: `false`)

## Frequently asked questions

### Why would I use agent mode instead of edit mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: agent mode autonomously determines the relevant context and files to edit. In edit mode, you need to specify the context yourself.
* **Task complexity**: agent mode is better suited for complex tasks that require not only code edits but also the invocation of tools and terminal commands.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Self-healing**: agent mode evaluates the outcome of the generated edits and might iterate multiple times to resolve intermediate issues.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

## Related resources

* [Configure MCP servers to add tools to agent mode](/docs/copilot/chat/mcp-servers.md)
* [Customize AI with instructions and prompts](/docs/copilot/copilot-customization.md)
