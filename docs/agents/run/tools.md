---
ContentId: 8f2c4a1d-9e3b-4c5f-a7d8-6b9c2e4f1a3d
DateApproved: 10/28/2026
MetaDescription: Use agent tools in {% data variables.product.prodname_vscode_shortname %} to inspect code, run commands, control desktop apps, and manage approvals.
keywords:
- copilot
- ai
- agents
- chat
- tools
- terminal
- customization
---
# Use tools with agents

Tools let an agent inspect your project and check results instead of only suggesting code or commands for you to apply. For example, it can read the implementation behind a failing test, make a change, and run the test to check whether the change works.

Start with the tools already available in your session. {% data variables.product.prodname_vscode %} supports built-in tools, Model Context Protocol (MCP) tools, and extension tools. When the task needs a capability these tools don't provide, connect a supported service to the {% data variables.product.prodname_copilot_short %} harness with [{% data variables.product.prodname_copilot_short %} connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)`, [add an MCP server](/docs/agent-customization/mcp-servers.md), [install an agent plugin](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins) that bundles MCP servers, or install an extension that contributes tools.

For background on tool types and how tools work in the agent loop, see [Tools concepts](/docs/agents/concepts/tools.md).

This article shows how to complete a request with tools, direct the agent to specific tools, control which tools are available, and review tool calls.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Try tools in action">
Launch a chat prompt that uses the web tool to summarize the latest {% data variables.product.prodname_vscode_shortname %} updates.

* [Open in {% data variables.product.prodname_vscode_shortname %}](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=Summarize%20the%20latest%20VS%20Code%20updates%20%23web)

</div>

## Use tools in a request

By default, the agent chooses from the enabled tools based on your request and the current context. You don't need to name or select each tool before you start.

To complete a request with tools:

1. In the chat input, select **Agent** from the agent picker.

1. Enter a prompt that describes your goal and how the agent should verify its work. For example:

    ```prompt
    Find the cause of the failing tests in this project, fix it, and run the relevant tests to verify the change.
    ```

1. Review each tool call as the agent works. If an approval prompt appears, expand the tool details to review its inputs, and then select **Allow** to run it.

1. Expand a tool summary in the conversation to inspect the call and its output. When the task is complete, review the agent's response, code changes, and validation results.

To control which calls require approval and how much autonomy the agent has, see [Manage approvals and permissions](/docs/agents/run/approvals.md).

<details>
<summary>Change how tool calls are grouped in chat</summary>

By default, tool call details are collapsed in the chat conversation. Use `setting(chat.agent.thinking.collapsedTools)` (experimental) to change the grouping behavior. Use `off` to keep tool calls separate, `withThinking` to group tools with thinking when available, or `always` to always group tools. When `setting(chat.agent.thinkingStyle)` is set to `collapsed`, reasoning and grouped tool calls can appear in separate collapsible sections.

</details>

## Reference a tool explicitly

Type `#` in the chat input to reference an available tool. Use an explicit reference when you want to direct the agent to a particular capability instead of letting it choose. Tool names depend on the harness.

For example, use the `#web/fetch` tool to retrieve a specific web page:

```prompt
Summarize the latest release notes at code.visualstudio.com/updates with #web/fetch.
```

The `#` menu also contains context items, such as files, folders, and editor selections. Context items provide information for the request, while tools give the agent capabilities to gather information or take actions. Learn more about [adding context to chat prompts](/docs/chat/chat-overview.md#add-context-to-your-prompts).

> [!NOTE]
> User-defined tool sets are deprecated and are not supported in the Copilot harness. For a reusable tool selection, configure a custom agent. See [Replace tool sets](/docs/agent-customization/migrate-customizations.md#replace-tool-sets).

<a name="select-tools-for-a-request"></a>

## Manage available tools

For Copilot harness sessions, manage tools from the Agent Customizations editor. Your selection persists in the active [user profile](/docs/configure/profiles.md), rather than applying to only one request:

1. In the chat input, select the **Copilot** harness.

1. Open the Agent Customizations editor:

    * In the {% data variables.copilot.chat_view %}, select **Open Customizations** in the title bar, or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).
    * In the {% data variables.copilot.agents_window %}, select **Customizations** in the sidebar.

1. Select the **Tools** tab.

1. Select or deselect tools to control which ones are available to the agent.

Limit the selection to tools that are relevant to your request. Add MCP tools by connecting supported services with [{% data variables.product.prodname_copilot_short %} connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)`, [adding MCP servers](/docs/agent-customization/mcp-servers.md), or [installing agent plugins](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins) that bundle MCP servers. [Extensions](/docs/configure/extensions/extensions.md) can also contribute tools.

To define a reusable tool selection for a workflow, specify tools in a [custom agent](/docs/agent-customization/custom-agents.md). For other harnesses, check their [setup requirements and configuration options](/docs/agents/run/agent-harnesses.md#requirements-and-setup).

<a name="manage-tool-availability-for-copilot"></a>

### Manage tool availability for the Copilot harness

All client-side tools are available to the Copilot harness by default. In the **Tools** tab, tools are organized into collapsible groups. You can:

* Enter text in the search box to filter tool groups and individual tools.
* Select a tool group checkbox to enable or disable every tool in the group.
* Expand a group and select individual tools. The group checkbox shows a mixed state when only some tools are enabled.
* Review the enabled and total tool counts shown for each group.

The count beside **Tools** in the customization navigation includes enabled client-side tools and excludes the read-only tools built into the Copilot harness.

The **Copilot** group lists the harness's built-in tools. These tools run in the Copilot runtime and are read-only in the **Tools** tab. Other tools run in the {% data variables.product.prodname_vscode_shortname %} client and are available to the agent only while the client is connected.

Tool availability is separate from tool approval. Enabling a tool makes it available to the agent, but doesn't bypass the configured [approval and permission controls](/docs/agents/run/approvals.md).

<a name="add-extension-tools-for-copilot"></a>

### Add extension tools for the Copilot harness

In the main {% data variables.product.prodname_vscode_shortname %} window, you can find extensions that contribute language model tools:

1. Open the **Tools** tab and select **Browse Marketplace**.

1. Search for an extension and select it to view its details and contributed tools.

1. Install the extension. Its tools then appear in the tool list, where you can manage their availability.

The {% data variables.copilot.agents_window %} shows the tool availability list but doesn't include Marketplace browsing.

To remove an extension from the tool list, right-click its tool group and select **Uninstall Extension**.

> [!CAUTION]
> Uninstalling a tool extension removes the entire extension, including contributions that aren't tools.

<details>
<summary>Select tools for a Local harness request</summary>

For Local harness sessions, select tools for an individual request from the {% data variables.copilot.chat_view %}:

1. In the chat input, select the **Local** harness and then select **Agent** from the agent picker.

1. Select **Configure Tools**.

    ![Screenshot showing the {% data variables.copilot.chat_view %}, highlighting the Configure Tools button in the chat input.](../images/chat-tools/agent-mode-select-tools.png)

1. Select or deselect tools to control which ones are available for the current request. Use the search box to filter the list.

You can also specify tools in a [prompt file](/docs/agent-customization/prompt-files.md) or [custom agent](/docs/agent-customization/custom-agents.md). Learn more about the [tool list priority order](/docs/agents/reference/custom-agent-file-reference.md#tool-list-priority).

</details>

## Edit tool parameters

For a tool call that requires approval, expand the confirmation dialog to review its input parameters. Generic and terminal tool confirmations are read-only. If a call needs different parameters, reject it and tell the agent what to change.

<details>
<summary>Edit parameters in Local harness and extension tool confirmations</summary>

Confirmations from the Local harness and extension-contributed tools can support parameter editing. When the confirmation provides editable fields:

1. When the tool confirmation dialog appears, select the chevron next to the tool name to expand its details.

1. Edit any tool input parameters as needed.

1. Select **Allow** to run the tool with the modified parameters.

</details>

## Common built-in tool workflows

### Coordinate work across sessions

In sessions using the {% data variables.product.prodname_copilot_short %} or {% data variables.product.prodname_anthropic_claude_short %} harness, agents can use built-in session-management tools to coordinate related work. These tools are also available with the [experimental {% data variables.product.prodname_openai_codex_short %} integration](/docs/agents/run/agent-harnesses.md#codex).

An agent can:

* List sessions and inspect their status, workspace, and file changes.
* Create sessions or nested sessions.
* Read another conversation's recent context.
* Send messages to start or steer follow-up work.

State both the relationship between tasks and where the new work should run:

* **Related work**: Request a nested session that reuses the current workspace and checkout for research or planning that can share files.
* **Independent work**: Request a separate session. Omit the workspace for work that doesn't need repository files, or choose a trusted folder. Request a new worktree when code changes must be isolated.

For related, read-only work:

```prompt
Create a nested session under this session that reuses the current workspace and checkout to review the authentication flow. Do not modify files.
```

For unrelated work without repository files:

```prompt
Create an independent session with no workspace to research licensing options for a separate project.
```

For isolated implementation in a known project:

```prompt
Create an independent session in the vscode workspace with a new worktree to implement and test the authentication change.
```

The tools use `currentSession` for nested work and `independent` for separate sessions. A project name can identify the workspace instead of an absolute path or URI. If names are ambiguous, the agent reports matching projects rather than choosing one. Remote workspace URIs and multi-root project working directories are also supported.

When a tool creates or targets a session, an **Open Session** pill lets you jump to it. To monitor and finish the work yourself, see [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md).

Keep these constraints in mind:

* Sending a message to another session always requires confirmation.
* Agents can't send messages to the chat they are currently running in.
* Creation and messaging limits guard against unbounded fan-out.
* Archived sessions are excluded from listings unless explicitly requested.

The experimental `setting(chat.agentHost.agentOrchestrationLimits)` setting defaults to `on`. It limits how many sessions and chats each source session creates and how many messages it sends within a sliding one-hour window, as well as recursive session creation depth. A busy session doesn't consume another session's allowance, and capacity returns as earlier actions leave the window.

Setting it to `off` removes these limits without changing confirmation requirements or input validation. Changes apply without restarting the Agent Host. Reaching a limit doesn't interrupt work already running.

### Use browser tools

Browser tools give agents an interactive way to validate web applications. Instead of inspecting only the source code, an agent can run your app, open it in the integrated browser, exercise a user flow, inspect page content and console errors, and fix problems it discovers.

Browser tools are built into {% data variables.product.prodname_vscode_shortname %} and don't require an external MCP server. Use them when a task has an observable result in a web interface, such as verifying a form, reproducing a visual bug, checking responsive behavior, or testing a complete user journey.

```prompt
Start the app, open it in the browser, and test the password reset flow.
Fix any issues you find and repeat the flow to verify the fix.
```

Learn how to [use browser tools with agents](/docs/agents/run/browser-tools.md), including browser sessions, page sharing, privacy controls, and effective prompting patterns.

### Run terminal commands

Of all the built-in tools, the terminal tool is one of the most frequently used. The agent uses it to run commands as part of its workflow, for example to install dependencies, run a build, or execute tests. Because terminal commands can change your environment, {% data variables.product.prodname_vscode_shortname %} provides additional controls for reviewing, running, and monitoring them, building on the [approval](/docs/agents/run/approvals.md) behavior described earlier.

Copilot harness sessions use the built-in shell tool by default. Workspace commands run in the session's environment, and you review the results in chat. To load your shell profile before each command, see [Configure shell initialization](#configure-shell-initialization). The integrated-terminal controls below apply to Local harness sessions and configurations that use the integrated terminal tool.

<details>
<summary>Integrated-terminal controls</summary>

When the agent decides to run a command, it uses the built-in terminal tool to execute it in an integrated terminal within {% data variables.product.prodname_vscode_shortname %}.

In the chat conversation, the agent displays the commands it ran. You can view the output of the command inline in chat by selecting **Show Output** (`>`) next to the command. You can also view the full output in the integrated terminal by selecting **Show Terminal**.

![Screenshot showing terminal command output in chat.](../images/chat-tools/terminal-command-output.png)

<details>
<summary>Change where terminal output appears</summary>

Use `setting(chat.tools.terminal.outputLocation)` (experimental) to show terminal command output inline in chat or directly in the integrated terminal.

</details>

Terminal output previews reflow to fit the available chat width by default. Turn off `setting(chat.tools.terminal.outputReflow)` to preserve the terminal's column width and use horizontal scrolling for long lines. This setting changes only the preview in chat, not the terminal that runs the command.

#### Continue terminal commands in background

When the agent runs a long-running terminal command, such as starting a development server or running a build in watch mode, you can push the command to the background. This allows the agent to continue with other tasks without waiting for the command to finish.

While a command is running, a **Continue in Background** button appears next to the terminal command in the chat conversation. Select this button to move the command to the background. The command continues running, and the agent can check its output later or use the terminal for other tasks.

The agent can also specify a timeout when running terminal commands. When the timeout is reached, the agent stops waiting for the command and returns the output collected so far. Use the `setting(chat.tools.terminal.enforceTimeoutFromModel)` setting to control whether to enforce the timeout value that the agent specifies.

The agent can also choose to run commands directly in the background, without user interaction. Background terminals that you have not revealed are automatically cleaned up when their command finishes, which prevents stale terminals from accumulating over a long session. To reveal a background terminal and keep it open after the command completes, select the **Show** link in the chat tool invocation header. The terminal output remains visible in the chat conversation even after a terminal is cleaned up.

</details>

> [!TIP]
> To automatically approve terminal commands or restrict file system and network access for agent commands, see [Manage approvals and permissions](/docs/agents/run/approvals.md).

#### Configure shell initialization

`feature(agent-host-shell-initialization)`

Keep agent shell commands aligned with your development environment by loading your shell profile. In [Copilot harness sessions](/docs/agents/run/agent-harnesses.md#copilot) running on your machine that use the SDK built-in shell tool, enable `setting(chat.agentHost.shellTool.initScript.enabled)` to load `~/.bashrc` on macOS and Linux or your PowerShell profiles on Windows before each command.

With [Python Environments](/docs/python/environments.md#terminal-settings) installed and `setting(python-envs.terminal.autoActivationType)` set to `shellStartup`, the selected workspace environment is also activated.

This setting does not apply to remote sessions or the custom terminal tool override.

## Control desktop applications (Experimental)

Use Computer Use when a task needs a desktop application that the agent's other tools can't reach. {% data variables.product.prodname_github %}'s Computer Use plugin lets the agent see application windows, click, type, and scroll. For web applications, use [browser tools](#use-browser-tools) instead.

Computer Use is available for local [{% data variables.product.prodname_copilot_short %} harness sessions](/docs/agents/run/agent-harnesses.md#copilot) on macOS and Windows. It isn't available for the Local, Claude, or Codex harnesses, Linux, or remote or cloud hosts.

> [!CAUTION]
> Computer Use can read and change content in applications outside your workspace. Approve access only to apps needed for your task, and avoid exposing sensitive content in application windows. See [desktop application access risks](/docs/agents/run/security.md#security-risks-to-be-aware-of).

### Turn on Computer Use

Computer Use is Experimental and off by default. To use it:

1. Turn on `setting(chat.agentHost.computerUse.enabled)` in Settings, and restart {% data variables.product.prodname_vscode_shortname %}.

1. Start a new local {% data variables.product.prodname_copilot_short %} chat in the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. The plugin downloads automatically on first use.

1. Ask the agent to perform a task in a desktop application. For example:

    ```prompt
    Open Calculator and use it to compute 12 times 7.
    ```

1. When the agent asks **Turn on Computer Use?**, review its reason and select **Turn On**.

1. On macOS, [grant the required system permissions](#grant-macos-permissions). On both platforms, approve access to each application when requested.

You can also run `/computer on` in a {% data variables.product.prodname_copilot_short %} chat. If you select **Not Now**, the agent continues without Computer Use and doesn't ask again in that chat. Run `/computer on` if you change your mind.

> [!IMPORTANT]
> Turning on Computer Use is not limited to the current chat. It stays on for {% data variables.product.prodname_copilot_short %} on this computer, including {% data variables.copilot.copilot_cli_short %}, until you run `/computer off`.

### Grant macOS permissions

On macOS, Computer Use requires two permissions for the **Copilot Computer Use** helper app:

* **Accessibility**: Click and type in applications.
* **Screen Recording**: See application windows.

To grant these permissions:

1. Select **Set Up Computer Use** on the chat card.

1. For the current permission, select **Allow in Settings** and follow the macOS prompt or turn on **Copilot Computer Use** in System Settings. If the app isn't listed, drag **Copilot Computer Use** from the setup dialog into the permission list in System Settings.

1. Return to {% data variables.product.prodname_vscode_shortname %}. The dialog checks the permission and shows a check mark when it's granted. Repeat for the next permission. You can also select the refresh icon to check the current permission again.

When both permissions are confirmed, the dialog closes and the agent continues your task.

<!-- TODO: Add a screenshot of the macOS Computer Use setup dialog showing the permission steps and the Copilot Computer Use helper app. -->

### Turn off Computer Use

Run `/computer off` in a {% data variables.product.prodname_copilot_short %} chat to turn off Computer Use, including for {% data variables.copilot.copilot_cli_short %} on the same computer.

To stop offering the integration in {% data variables.product.prodname_vscode_shortname %}, turn off `setting(chat.agentHost.computerUse.enabled)` and restart.

### Troubleshoot Computer Use

* **Computer Use isn't offered**: Check the supported platform and harness, confirm that the setting is on, and restart before starting a new chat. On first use, allow time for the plugin to download.
* **The agent doesn't ask to turn it on**: The activation prompt isn't shown in Autopilot or chats with automatic replies. Run `/computer on` yourself. If you previously selected **Not Now**, the agent doesn't ask again in that chat.
* **The macOS setup dialog closes before you finish**: The dialog closes if the waiting tool call ends. Finish granting permissions in System Settings, then ask the agent to retry the task. A new setup card appears if permissions are still missing.
* **Allow in Settings doesn't open a prompt**: After a restart, macOS might not show a permission prompt it has already shown. Select **Allow in Settings** again to open System Settings.
* **Your organization blocks Computer Use**: Contact your administrator. Turning on the setting doesn't override an organization restriction.

## Built-in tools and context reference

For individual names, descriptions, and availability, see the [Tools and context reference](/docs/agents/reference/tools-reference.md). The reference groups tools by purpose and lists context items separately.

## Frequently asked questions

<details>
<summary>How do I know which tools are available?</summary>

Type `#` in the chat input field to browse available tools and context items. For Copilot harness sessions, open the Agent Customizations editor and select the **Tools** tab to view and manage enabled tools. For Local harness sessions, use **Configure Tools** in the chat input.

</details>

<details>
<summary>I'm getting an error that says "Cannot have more than 128 tools per request."</summary>

A chat request can have a maximum of 128 tools enabled at a time. If you see an error about exceeding 128 tools per request:

* Open the tools picker in the {% data variables.copilot.chat_view %} and deselect some tools or entire MCP servers to reduce the count.

* Alternatively, enable virtual tools with the `setting(github.copilot.chat.virtualTools.threshold)` setting to automatically manage large tool sets.

</details>

<details>
<summary>Why isn't the agent using my configured terminal shell?</summary>

The agent uses the shell you have configured as the default for the terminal, except for `cmd` (Command Prompt) on Windows and `sh` on macOS/Linux. This is because [shell integration](/docs/terminal/shell-integration.md) is not supported with these shells, which means the agent has very limited visibility into what's going on inside the terminal. Instead of getting direct signals for when commands are being run or have finished running, the agent needs to rely on timeouts and watching for the terminal to idle to continue. This leads to a slow and flaky experience.

You can still configure the agent to use these shells with the terminal profile settings, however this will result in an inferior experience compared to using PowerShell on Windows or `bash`/`zsh` on macOS/Linux.

* `setting(chat.tools.terminal.terminalProfile.windows)` - Override the shell on Windows
* `setting(chat.tools.terminal.terminalProfile.osx)` - Override the shell on macOS
* `setting(chat.tools.terminal.terminalProfile.linux)` - Override the shell on Linux

</details>

<details>
<summary>Can I create my own tools?</summary>

Yes. You can create tools in two ways:

* **Develop a {% data variables.product.prodname_vscode_shortname %} extension** that contributes tools using the [Language Model Tools API](/api/extension-guides/ai/tools.md)
* **Create an MCP server** that provides tools. See the [MCP tool extensibility overview](/api/extension-guides/ai/ai-extensibility-overview.md#mcp-tool).

</details>

## Related resources

* [AI features cheat sheet](/docs/agents/reference/ai-features-cheat-sheet.md)
* [Migrate existing customizations](/docs/agent-customization/migrate-customizations.md)
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
