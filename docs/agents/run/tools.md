---
ContentId: 8f2c4a1d-9e3b-4c5f-a7d8-6b9c2e4f1a3d
DateApproved: 11/18/2026
MetaDescription: Use agent tools in {% data variables.product.prodname_vscode_shortname %} to inspect code, run commands, verify results, and manage available capabilities.
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

This guide explains how to work with tools in a {% data variables.product.prodname_copilot_short %} harness session, review their results, and change which capabilities are available. For other harnesses, check their [supported tools and setup requirements](/docs/agents/run/agent-harnesses.md#requirements-and-setup). Existing Local harness workflows have [separate compatibility guidance](#local-harness-compatibility).

Three controls serve different purposes:

* **Tool availability** determines which tools the agent can choose from.
* **A tool reference** in your prompt directs the agent to a particular available tool.
* **Tool approval** determines whether a specific call can run without your confirmation. Making a tool available or referencing it doesn't bypass [approvals and permissions](/docs/agents/run/approvals.md).

For background on built-in tools, extension tools, and Model Context Protocol (MCP) tools, see [Tools concepts](/docs/agents/concepts/tools.md).

## Use tools in a request

By default, the agent chooses from the available tools based on your request and the current context. You don't need to select a tool for every step.

1. In the chat input, select the **{% data variables.product.prodname_copilot_short %}** harness and an agent that can implement changes, such as **Agent**.

1. Describe your goal and how the agent should verify its work. For example:

    ```prompt
    Find the cause of the failing tests in this project, fix it, and run the relevant tests to verify the change.
    ```

    To request a particular tool, type `#` in the chat input and select an available tool. Names depend on the harness, and not every built-in tool supports a reference. If it isn't listed, describe the action you want instead.

    The `#` picker also lets you [attach context such as files and editor selections](/docs/chat/chat-overview.md#add-context-to-your-prompts), which supplies information rather than requesting a tool action.

1. Follow the tool calls in the conversation. Expand a call to inspect its inputs and output. When the task is complete, review the agent's response, code changes, and validation results.

### Review tool calls and results

If an approval prompt appears, review the tool's inputs and the command, file, or destination it will act on. Choose **Allow Once** to approve that call, or **Skip** to decline it. In {% data variables.product.prodname_copilot_short %} sessions, generic and terminal confirmations don't let you edit the parameters. If an action is wrong, skip it and tell the agent what to change.

Not every tool call prompts. Your permission level, runtime decisions, and saved approvals affect whether a call needs review. Use [Manage approvals and permissions](/docs/agents/run/approvals.md) to configure those decisions. Review the results even when a call runs automatically.

<details>
<summary>Change how tool calls are grouped in chat</summary>

Use the experimental `setting(chat.agent.thinking.collapsedTools)` setting to change the grouping: `off` keeps tools separate, `withThinking` groups them with reasoning when available, and `always` groups them. When `setting(chat.agent.thinkingStyle)` is `collapsed`, reasoning and grouped calls can appear in separate collapsible sections.

</details>

<a name="select-tools-for-a-request"></a>
<a name="manage-tool-availability-for-copilot"></a>

## Manage available tools

Use the **Tools** tab in the Agent Customizations editor to see which capabilities are available to your {% data variables.product.prodname_copilot_short %} session and turn optional tools on or off. For example, you can stop offering an extension's tools without uninstalling the extension. To keep a tool available but review its actions before they run, configure [approvals](/docs/agents/run/approvals.md) instead.

Tool selections aren't limited to the current request. They persist for the harness across windows and [user profiles](/docs/configure/profiles.md), and can affect other sessions using that harness and host. Remote sessions have a separate selection for each remote host and harness. Check the session before changing the selection.

1. Select the intended {% data variables.product.prodname_copilot_short %} session and check its workspace and whether it runs on your machine or a remote host.

1. Open the Agent Customizations editor:

    * In the {% data variables.copilot.chat_view %}, select **Open Customizations** in the title bar, or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).
    * In the {% data variables.copilot.agents_window %}, select **Customizations** in the sidebar.

1. Select **Tools**, then select or deselect an editable tool group. Expand a group to change individual tools.

    The **Copilot** group lists built-in tools for Copilot itself, for example: file editing, command execution, and other core capabilities.

    Tools provided by an extension require that extension to run and the editor or {% data variables.copilot.agents_window %} that contributes them to remain connected.

## Add tools

If the agent is missing a capability, you can add tools from different sources.

| Your task | Where to start |
|---|---|
| Connect a service supported by a {% data variables.product.prodname_copilot_short %} connector. | [{% data variables.product.prodname_copilot_short %} connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)`. |
| Use another service or program through an MCP server. | [Add an MCP server](/docs/agent-customization/mcp-servers.md). |
| Install a packaged integration that bundles MCP tools with other customizations. | [Install an agent plugin](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins). |
| Use tools contributed by a {% data variables.product.prodname_vscode_shortname %} extension. | [Add extension tools](#add-extension-tools-for-the-copilot-harness) in the editor or {% data variables.copilot.agents_window %}. |

After setup, return to the intended session and ask the agent to perform a small task with the new capability. If the tools aren't available, check that their source is enabled, connected, and authenticated where required. Installing or connecting a tool doesn't approve its actions automatically.

### Add extension tools for the Copilot harness

An extension must be installed and enabled in the window that provides its tools. You can then control which tools the agent can use from the **Tools** tab. Enabling an extension, making its tools available, and approving a tool call are separate decisions.

{% tabs id="extension-tool-setup" %}
{% tab label="Editor window" %}

1. Open the Agent Customizations editor's **Tools** tab and select **Browse Extensions**.

1. Search for an extension and review its description and contributed tools.

1. Select **Install**. If the extension is already installed, make sure it's enabled.

{% /tab %}
{% tab label="{% data variables.copilot.agents_window %} (Experimental)" %}

1. Select **Customizations** in the sidebar, then **Extensions**. If **Extensions** isn't visible, turn on `setting(extensions.experimental.agentsWindowManagement)` in User settings.

1. Find an extension that contributes the tools you need. Select **Install** for a Marketplace result, or turn on an installed extension.

1. Review any compatibility warnings. If prompted, select **Restart Extensions** or **Reload Window** to apply the change.

Extension enablement in the {% data variables.copilot.agents_window %} is separate from the editor window. Extensions must be installed in your default {% data variables.product.prodname_vscode_shortname %} profile. See [Agents window extension support](/docs/agents/run/agents-window-configuration.md#use-vs-code-extensions-in-the-agents-window) for compatibility and profile details.

{% /tab %}
{% /tabs %}

After installing and enabling the extension, return to your {% data variables.product.prodname_copilot_short %} session, open **Customizations** > **Tools**, and check that the extension's tool group is enabled. Ask the agent to use one of the capabilities described by the extension.

If the group is missing, confirm that the extension contributes agent tools, is enabled in the window you're using, and has finished any required reload. Keep that window connected while the agent uses its tools.

> [!CAUTION]
> Uninstalling an extension removes all its contributions, not only its tools. Uninstalling from the {% data variables.copilot.agents_window %} also removes it from the {% data variables.product.prodname_vscode_shortname %} installation. To stop the agent from using a tool without removing the extension, deselect the tool instead.

To build your own tools, use the [Language Model Tools API](/api/extension-guides/ai/tools.md) or [create an MCP server](/api/extension-guides/ai/ai-extensibility-overview.md#mcp-tool).

## Common built-in tool workflows

### Run terminal commands

{% data variables.product.prodname_copilot_short %} sessions use the built-in shell tool to install dependencies, run builds, and execute tests. Commands run in the session's environment: on your machine for a local session, or on the remote machine for a [remote agent session](/docs/agents/run/remote-agent-sessions.md). Inspect the command and its output in the chat conversation to check the result.

To change when a command prompts or reuse a saved approval, see [terminal command approvals](/docs/agents/run/approvals.md#automatically-approve-terminal-commands). To limit what a command can access, configure [agent sandboxing](/docs/agents/run/agent-sandboxing.md). Approving a command doesn't expand its sandbox access.

The [integrated-terminal controls](#integrated-terminal-controls) described later apply to the Local harness and compatible integrated-terminal tools, not the default {% data variables.product.prodname_copilot_short %} shell.

<details>
<summary id="configure-shell-initialization">Load your shell profile for agent commands</summary>

`feature(agent-host-shell-initialization)`

If a command depends on your shell profile, turn on `setting(chat.agentHost.shellTool.initScript.enabled)` in User settings. For {% data variables.product.prodname_copilot_short %} sessions on your machine using the default shell, this loads `~/.bashrc` on macOS and Linux or your PowerShell profiles on Windows before each command.

With [Python Environments](/docs/python/environments.md#terminal-settings) installed and `setting(python-envs.terminal.autoActivationType)` set to `shellStartup`, the selected workspace environment is also activated.

This setting doesn't apply to remote sessions or the Agent Host custom terminal tool.

</details>

### Interact with the browser

Browser tools let an agent validate a web application by interacting with pages, inspecting page content and console errors, and checking the result of a change. The integrated browser tools are built into {% data variables.product.prodname_vscode_shortname %} and don't require an external MCP server.

```prompt
Start the app, open it in the browser, and test the password reset flow.
Fix any issues you find and repeat the flow to verify the fix.
```

The agent can use the integrated browser in {% data variables.product.prodname_vscode_shortname %} or drive an external browser through the browser use extension. See [Use browser tools with agents](/docs/agents/run/browser-tools.md) for setup, page sharing, remote sessions, and privacy controls.

### Coordinate work across sessions

In {% data variables.product.prodname_copilot_short %} and {% data variables.product.prodname_anthropic_claude_short %} sessions, agents can create new sessions, inspect their status and recent context, and send follow-up messages. These tools are also available with the [experimental {% data variables.product.prodname_openai_codex_short %} integration](/docs/agents/run/agent-harnesses.md#codex).

Tell the agent how the work relates to your current task and where it should run:

* **Related work:** request a nested session that shares your current workspace and checkout. For example, delegate research while keeping the main conversation focused on implementation.

* **Independent work:** request a separate session. Specify a workspace and ask for a new worktree if its edits must be isolated. For research that doesn't need project files, request a session without a workspace.

For related, read-only work:

```prompt
Create a nested session under this session that reuses the current workspace and checkout to review the authentication flow. Do not modify files.
```

For isolated implementation:

```prompt
Create an independent session in the vscode workspace with a new worktree to implement and test the authentication change.
```

Sending a message can start work in another session. Review the target and requested action when an approval prompt appears; whether it prompts depends on the applicable permissions. Select **Open Session** in a tool result to follow the work. For reviewing and finishing sessions yourself, see [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md).

<details>
<summary>Session creation and messaging limits</summary>

The experimental `setting(chat.agentHost.agentOrchestrationLimits)` setting defaults to `on`. It limits session and chat creation, messaging within a sliding one-hour window, and recursive creation depth. Reaching a limit doesn't interrupt work already running.

Setting it to `off` removes these limits without changing approval requirements or input validation. Changes apply without restarting the Agent Host.

</details>

## Control desktop applications

`feature(computer-use)`

Use {% data variables.copilot.computer_use %} when a task needs a desktop application that the agent's other tools can't reach. For web applications, use [browser tools](#use-browser-tools) instead.

{% data variables.copilot.computer_use_caps %} is available for local [{% data variables.product.prodname_copilot_short %} harness sessions](/docs/agents/run/agent-harnesses.md#copilot) on macOS and Windows. It isn't available for the Local, Claude, or Codex harnesses, Linux, or remote or cloud hosts.

For shared capabilities, permission controls, and limitations, see [{% data variables.product.prodname_github %}'s {% data variables.copilot.computer_use %} guide](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/computer-use).

> [!CAUTION]
> {% data variables.copilot.computer_use_caps %} can read and change content in applications outside your workspace. Review requested access and avoid exposing sensitive information. See [{% data variables.product.prodname_github %}'s {% data variables.copilot.computer_use %} security guidance](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/computer-use#limitations-and-risks) for limitations and responsible use.

### Turn on {% data variables.copilot.computer_use %}

{% data variables.copilot.computer_use_caps %} is off by default. To use it:

1. Turn on `setting(chat.agentHost.computerUse.enabled)` in Settings, and restart {% data variables.product.prodname_vscode_shortname %}.

1. Start a new local {% data variables.product.prodname_copilot_short %} chat in the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. The plugin downloads automatically on first use.

1. Run `/computer on` in the chat, or ask the agent to perform a task in a desktop application and follow the activation prompt.

1. On macOS, select **Set Up Computer Use** in the chat card and follow the prompts to grant the required system permissions. Review application-access requests when prompted.

> [!IMPORTANT]
> Activation persists across chats and also applies to {% data variables.copilot.copilot_cli_short %} on the same computer.

### Turn off {% data variables.copilot.computer_use %}

Run `/computer off` in a {% data variables.product.prodname_copilot_short %} chat to turn off {% data variables.copilot.computer_use %}, including for {% data variables.copilot.copilot_cli_short %} on the same computer.

To stop offering the integration in {% data variables.product.prodname_vscode_shortname %}, turn off `setting(chat.agentHost.computerUse.enabled)` and restart.

### Troubleshoot {% data variables.copilot.computer_use %}

* **{% data variables.copilot.computer_use_caps %} isn't offered**: Check the supported platform and harness, confirm that the setting is on, and restart before starting a new chat. On first use, allow time for the plugin to download.
* **The agent doesn't ask to turn it on**: The activation prompt isn't shown in Autopilot or chats with automatic replies. Run `/computer on` yourself. Use the command if you previously selected **Not Now**, which suppresses further activation prompts in that chat.
* **The macOS setup dialog closes before you finish**: Finish granting permissions in System Settings, then ask the agent to retry the task.

## Local harness compatibility

The Local harness is deprecated `feature(local-harness)`. The following controls support existing Local workflows and differ from the {% data variables.product.prodname_copilot_short %} instructions above. See [Move to {% data variables.product.prodname_copilot_short %}](/docs/agents/run/move-to-copilot.md) when migrating.

### Select tools for a Local request

1. In the {% data variables.copilot.chat_view %}, select the **Local** harness and then **Agent** from the agent picker.
1. Select **Configure Tools**.

    ![Screenshot showing the {% data variables.copilot.chat_view %}, highlighting the Configure Tools button in the chat input.](../images/chat-tools/agent-mode-select-tools.png)

1. Select or deselect the tools available for the request.

Local tools can also be selected through a [prompt file](/docs/agent-customization/prompt-files.md) or [custom agent](/docs/agent-customization/custom-agents.md). See the [tool list priority order](/docs/agents/reference/custom-agent-file-reference.md#tool-list-priority).

### Edit tool parameters

Local harness and extension tool confirmations can support editing parameters before execution. If the confirmation provides editable fields, expand the tool details, change the parameters, and select **Allow**. If the fields are read-only, skip the call and ask the agent to correct it.

### Integrated-terminal controls

The integrated terminal tool runs commands in a {% data variables.product.prodname_vscode_shortname %} terminal. Select **Show Output** (`>`) beside a command to inspect its output in chat, or **Show Terminal** to open the full terminal.

![Screenshot showing terminal command output in chat.](../images/chat-tools/terminal-command-output.png)

Use the experimental `setting(chat.tools.terminal.outputLocation)` setting to choose whether output appears in chat or the terminal. Turn off `setting(chat.tools.terminal.outputReflow)` if you need to preserve the terminal's column layout in chat previews rather than wrap long lines.

#### Continue terminal commands in background

For a long-running command, select **Continue in Background** when the button appears. The agent can continue with other work and check the command's output later.

The agent can also start a command in the background or set a timeout for waiting. `setting(chat.tools.terminal.enforceTimeoutFromModel)` controls whether to honor that timeout. Reaching it returns the output collected so far rather than waiting for completion.

Background terminals that you haven't revealed are cleaned up when their command finishes. To keep one open for inspection, select **Show** in the tool invocation header. Its output remains in chat even if the terminal is cleaned up.

### Troubleshoot Local tools

<details>
<summary>The request reports more than 128 tools</summary>

If a Local request reports **Cannot have more than 128 tools per request**, select **Configure Tools** and deselect unneeded tools or MCP servers. The experimental `setting(github.copilot.chat.virtualTools.threshold)` setting controls when to group tools for on-demand discovery. Setting it to `0` turns that grouping off.

</details>

<details>
<summary>The integrated terminal uses a different shell</summary>

The Local terminal tool relies on [shell integration](/docs/terminal/shell-integration.md) to track commands and their output. It avoids `cmd` on Windows and `sh` on macOS and Linux because those shells don't support shell integration. Prefer PowerShell on Windows or `bash` or `zsh` on macOS and Linux.

To override the integrated tool's shell, use `setting(chat.tools.terminal.terminalProfile.windows)`, `setting(chat.tools.terminal.terminalProfile.osx)`, or `setting(chat.tools.terminal.terminalProfile.linux)`. These settings don't configure the default {% data variables.product.prodname_copilot_short %} shell.

</details>

## Related resources

* [Manage approvals and permissions](/docs/agents/run/approvals.md)
* [Look up Local tool names and context references](/docs/agents/reference/tools-reference.md)
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
