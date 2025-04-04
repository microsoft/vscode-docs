---
ContentId: 57754e12-a134-41cc-9693-fb187729c49f
DateApproved: 04/03/2025
MetaDescription: Use chat agent mode in VS Code to start an agentic code editing session to autonomously make edits and invoke tools. Use built-in tools, MCP tools, or tools from extensions.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use agent mode in VS Code

With chat _agent mode_ in Visual Studio Code, you can use natural language to define a high-level task and to start an agentic code editing session to accomplish that task. In agent mode, Copilot autonomously plans the work needed and determines the relevant files and context. It then makes edits to your codebase and invokes tools to accomplish the request you made. Agent mode monitors the outcome of edits and tools and iterates to resolve any issues that arise.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Use agent mode

In agent mode, Copilot operates in an autonomous manner and determines the relevant context for your prompt.

You can access agent mode from the chat mode dropdown in the Chat view (open in VS Code [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) or [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent)). Follow these steps to get started:

1. Make sure that agent mode is enabled by configuring the `setting(chat.agent.enabled)` setting in the [Settings editor](/docs/getstarted/personalize-vscode.md#configure-settings).

1. Open the Chat view by selecting **Open Chat** from the Copilot menu in the VS Code title bar, or use the `kb(workbench.action.chat.open)` keyboard shortcut.

1. Select **Agent** from the chat mode dropdown in the Chat view.

    ![Screenshot showing the Copilot Edits view, highlighting agent mode selected.](images/copilot-edits/copilot-edits-agent-mode.png)

1. Enter your prompt for making edits in the chat input field and select **Send** (`kb(workbench.action.edits.submit)`) to submit it.

    You can specify a high-level requirement and you don't have to specify which files to work on. In agent mode, Copilot determines the relevant context and files to edit autonomously.

    Experiment with some of these example prompts to get started:

    * `Create a meal-planning web app using React and Node.js`
    * `Add social media sharing functionality`
    * `Replace current auth with OAuth`

1. Agent mode might invoke multiple [tools](#agent-mode-tools) to accomplish the different tasks. Optionally, select the **Tools** icon to configure which tools can be used for responding to your request.

    ![Screenshot showing the Copilot Edits view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-select-tools.png)

    > [!TIP]
    > You can also directly reference a tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode).

1. Confirm tool invocations and terminal commands.

    Before running a terminal command or non-builtin tool, Copilot requests for confirmation to continue. This is because tools might run locally on your machine and might perform actions that modify files or data.

    Use the **Continue** button dropdown options to automatically confirm the specific tool for the current session, workspace, or all future invocations.

    ![MCP Tool Confirmation](images/mcp-servers/mcp-tool-confirmation.png)

    If your project has configured [tasks](/docs/debugtest/tasks.md) in `tasks.json`, agent mode tries to run the appropriate tasks. For example, if you've defined a build task, agent mode will run the build task before running the application. Enable or disable running workspace tasks with the `setting(github.copilot.chat.agent.runTasks)` setting.

1. Optionally, verify and edit the tool input parameters before running the tool.

    Select the chevron next to the tool name to view its details and input parameters. You can edit the input parameters before running the tool.

    ![MCP Tool Input Parameters](images/mcp-servers/mcp-tool-edit-parameters.png)

1. Copilot Edits detects issues and problems in code edits and terminal commands and will iterate and perform additional actions to resolve them.

    For example, agent mode might run unit tests as a result of a code edit. If the tests fail, it uses the test outcome to resolve the issue.

    Copilot Edits agent mode iterates multiple times to resolve issues and problems. The `setting(chat.agent.maxRequests)` setting controls the maximum number of requests that Copilot Edits can make in agent mode.

1. As Copilot processes your request, notice that Copilot streams the suggested code edits directly in the editor.

    The Chat view shows the list of files that were edited in bold text. The editor overlay controls enable you to navigate between the suggested edits.

1. Review the suggested edits and [accept or discard the suggested edits](#accept-or-discard-edits).

1. Continue to iterate on the code changes to refine the edits or to implement additional features.

## Agent mode tools

Agent mode uses tools to accomplish specialized tasks while processing a user request. Examples of such tasks are listing the files in a directory, editing a file in your workspace, running a terminal command, getting the output from the terminal, and more.

Agent mode can use the following tools:

* Builtin tools
* [MCP tools](/docs/copilot/chat/mcp-servers.md)
* [Tools contributed by extensions](/api/extension-guides/tools.md)

You can view and manage the tools that can be used for responding to a request. Select the **Tools** icon in the Chat view to view and manage the tools that are available in agent mode.

![Screenshot showing the Copilot Edits view, highlighting the Tools icon in the chat input.](images/copilot-edits/agent-mode-select-tools.png)

Based on the outcome of a tool, Copilot might invoke other tools to accomplish the overall request. For example, if a code edit results in syntax errors in the file, Copilot might explore another approach and suggest different code changes.

## Accept or discard edits

Copilot lists the files that were edited in the list of the changed files in the Chat view. Files with pending edits also have an indicator in the Explorer view and editor tabs.

![Screenshot that shows the Copilot Edits view, highlighting the changed files list and the indicator in the Explorer view and editor tabs.](images/copilot-edits/copilot-edits-changed-files-full.png)

With the editor overlay controls, you can navigate between the suggested edits by using the `kbstyle(Up)` (<i class="codicon codicon-arrow-up"></i>) and `kbstyle(Down)` (<i class="codicon codicon-arrow-down"></i>) controls. Use the **Keep** or **Undo** button to accept or reject the edits for a given file.

![Screenshot showing the Editor with proposed changes, highlighting the review controls in the editor overlay controls.](images/copilot-edits/copilot-edits-file-review-controls.png)

Use the **Keep** or **Undo** controls in the editor or Chat view to accept or reject individual or all suggested edits.

![Screenshot showing the Copilot Edits view, highlighting the Accept All and Discard All buttons.](images/copilot-edits/copilot-edits-accept-discard.png)

With the `setting(chat.editing.autoAcceptDelay)` setting, you can configure a delay after which the suggested edits are automatically accepted. Hover over the editor overlay controls to cancel the auto-accept countdown.

When you close VS Code, the status of the pending edits is remembered. When you reopen VS Code, the pending edits are restored and you can still accept or discard the edits.

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

## Settings

The following list contains the settings related to agent mode. You can configure settings through the Setting editor (`kb(workbench.action.openSettings)`).

* `setting(chat.agent.enabled: true)`: enable or disable agent mode (default: `false`)
* `setting(chat.agent.maxRequests)`: maximum number of requests that Copilot Edits can make in agent mode (default: 5 for Copilot Free users, 15 for other users)
* `setting(github.copilot.chat.agent.runTasks)`: run workspace tasks when using agent mode in Copilot Edits (default: `true`)
* `setting(chat.mcp.discovery.enabled)`: enable or disable discovery of MCP servers configured in other tools (default: `true`)

## Frequently asked questions

### Why would I use agent mode instead of edit mode?

Consider the following criteria to choose between edit mode and agent mode:

* **Edit scope**: agent mode autonomously determines the relevant context and files to edit. In edit mode, you need to specify the context yourself.
* **Task complexity**: agent mode is better suited for complex tasks that require not only code edits but also the invocation of tools and terminal commands.
* **Duration**: agent mode involves multiple steps to process a request, so it might take longer to get a response. For example, to determine the relevant context and files to edit, determine the plan of action, and more.
* **Self-healing**: agent mode evaluates the outcome of the generated edits and might iterate multiple times to resolve intermediate issues.
* **Request quota**: in agent mode, depending on the complexity of the task, one prompt might result in many requests to the backend.

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
* [Use Copilot Chat for AI chat conversations](/docs/copilot/chat/copilot-chat.md)
* [Configure MCP servers to add tools to agent mode](/docs/copilot/chat/mcp-servers.md)
* [Start a multi-file coding session](/docs/copilot/chat/copilot-edits.md)
