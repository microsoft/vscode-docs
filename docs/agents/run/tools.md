---
ContentId: 8f2c4a1d-9e3b-4c5f-a7d8-6b9c2e4f1a3d
DateApproved: 9/9/2026
MetaDescription: Use and manage agent tools in {% data variables.product.prodname_vscode_shortname %}, including automatic selection, approvals, and terminal commands.
MetaSocialImage: ../../images/shared/github-copilot-social.png
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

Tools extend agents in {% data variables.product.prodname_vscode %} with specialized functionality for accomplishing specific tasks like searching code, running commands, fetching web content, or invoking APIs. {% data variables.product.prodname_vscode_shortname %} supports three types of tools: built-in tools, Model Context Protocol (MCP) tools, and extension tools.

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

Type `#` in the chat input to reference a specific tool or tool set. Use an explicit reference when you want to direct the agent to a particular capability instead of letting it choose.

For example, use the `#web/fetch` tool to retrieve a specific web page:

```prompt
Summarize the latest release notes at code.visualstudio.com/updates with #web/fetch.
```

Use a tool set, such as `#web`, to make a group of related tools available:

```prompt
Research how Next.js handles routing. Use #web tools and summarize the relevant guidance.
```

The `#` menu also contains context items, such as files, folders, and editor selections. Context items provide information for the request, while tools give the agent capabilities to gather information or take actions. Learn more about [adding context to chat prompts](/docs/chat/chat-overview.md#add-context-to-your-prompts).

To group related tools and reuse them across prompts, prompt files, and custom agents, [create a tool set](/docs/agent-customization/tool-sets.md).

## Select tools for a request

The Local and Copilot harnesses use different controls to select client-side tools.

{% tabs id="select-tools-by-harness" %}
{% tab label="Local harness" %}

Select tools for an individual request from the {% data variables.copilot.chat_view %}:

1. In the chat input, select the **Local** harness and then select **Agent** from the agent picker.

1. Select **Configure Tools**.

    ![Screenshot showing the {% data variables.copilot.chat_view %}, highlighting the Configure Tools button in the chat input.](../images/chat-tools/agent-mode-select-tools.png)

1. Select or deselect tools to control which ones are available for the current request. Use the search box to filter the list.

{% /tab %}
{% tab label="Copilot harness" %}

Manage tools for the Copilot harness from the Agent Customizations editor:

1. In the chat input, select the **Copilot** harness.

1. Open the Agent Customizations editor:

    * In the {% data variables.copilot.chat_view %}, select **Configure Chat** (gear icon), or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).
    * In the {% data variables.copilot.agents_window %}, go to the **Customizations** panel.

1. Select the **Tools** tab.

1. Select or deselect tools to control which ones are available to the Copilot harness. These choices persist in the active [user profile](/docs/configure/profiles.md).

{% /tab %}
{% /tabs %}

For either session type, limit the selection to tools that are relevant to your request. Add capabilities by [installing MCP servers](/docs/agent-customization/mcp-servers.md) or [extensions](/docs/configure/extensions/extensions.md) that contribute tools.

When you customize chat with [prompt files](/docs/agent-customization/prompt-files.md) or [custom agents](/docs/agent-customization/custom-agents.md), you can specify which tools are available for a workflow. Learn more about the [tool list priority order](/docs/agent-customization/custom-agents.md#tool-list-priority).

### Manage tool availability for Copilot

All client-side tools are available to the Copilot harness by default. In the **Tools** tab, tools are organized into collapsible groups. You can:

* Enter text in the search box to filter tool groups and individual tools.
* Select a tool group checkbox to enable or disable every tool in the group.
* Expand a group and select individual tools. The group checkbox shows a mixed state when only some tools are enabled.
* Review the enabled and total tool counts shown for each group.

The count beside **Tools** in the customization navigation includes enabled client-side tools and excludes the read-only tools built into the Copilot harness.

The **Copilot** group lists the harness's built-in tools. These tools run in the Copilot runtime and are read-only in the **Tools** tab. Other tools run in the {% data variables.product.prodname_vscode_shortname %} client and are available to the agent only while the client is connected.

Tool availability is separate from tool approval. Enabling a tool makes it available to the agent, but doesn't bypass the configured [approval and permission controls](/docs/agents/run/approvals.md).

### Add extension tools for Copilot

In the main {% data variables.product.prodname_vscode_shortname %} window, you can find extensions that contribute language model tools:

1. Open the **Tools** tab and select **Browse Marketplace**.

1. Search for an extension and select it to view its details and contributed tools.

1. Install the extension. Its tools then appear in the tool list, where you can manage their availability.

The {% data variables.copilot.agents_window %} shows the tool availability list but doesn't include Marketplace browsing.

To remove an extension from the tool list, right-click its tool group and select **Uninstall Extension**.

> [!CAUTION]
> Uninstalling a tool extension removes the entire extension, including contributions that aren't tools.

## Edit tool parameters

For a tool call that requires approval, you can review and edit its input parameters before it runs:

1. When the tool confirmation dialog appears, select the chevron next to the tool name to expand its details.

1. Edit any tool input parameters as needed.

1. Select **Allow** to run the tool with the modified parameters.

## Common built-in tool workflows

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

When the agent decides to run a command, it uses the built-in terminal tool to execute it in an integrated terminal within {% data variables.product.prodname_vscode_shortname %}.

In the chat conversation, the agent displays the commands it ran. You can view the output of the command inline in chat by selecting **Show Output** (`>`) next to the command. You can also view the full output in the integrated terminal by selecting **Show Terminal**.

![Screenshot showing terminal command output in chat.](../images/chat-tools/terminal-command-output.png)

<details>
<summary>Change where terminal output appears</summary>

Use `setting(chat.tools.terminal.outputLocation)` (experimental) to show terminal command output inline in chat or directly in the integrated terminal.

</details>

#### Continue terminal commands in background

When the agent runs a long-running terminal command, such as starting a development server or running a build in watch mode, you can push the command to the background. This allows the agent to continue with other tasks without waiting for the command to finish.

While a command is running, a **Continue in Background** button appears next to the terminal command in the chat conversation. Select this button to move the command to the background. The command continues running, and the agent can check its output later or use the terminal for other tasks.

The agent can also specify a timeout when running terminal commands. When the timeout is reached, the agent stops waiting for the command and returns the output collected so far. Use the `setting(chat.tools.terminal.enforceTimeoutFromModel)` setting to control whether to enforce the timeout value that the agent specifies.

The agent can also choose to run commands directly in the background, without user interaction. Background terminals that you have not revealed are automatically cleaned up when their command finishes, which prevents stale terminals from accumulating over a long session. To reveal a background terminal and keep it open after the command completes, select the **Show** link in the chat tool invocation header. The terminal output remains visible in the chat conversation even after a terminal is cleaned up.

> [!TIP]
> To automatically approve terminal commands or restrict file system and network access for agent commands, see [Manage approvals and permissions](/docs/agents/run/approvals.md).

## Frequently asked questions

<details>
<summary>How do I know which tools are available?</summary>

Type `#` in the chat input field to browse available tools, tool sets, and context items. You can also use the tools picker in chat to view and manage the enabled tools.

For Copilot sessions, open the Agent Customizations editor and select the **Tools** tab to view and manage enabled tools.

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
* **Create an MCP server** that provides tools. See the [MCP developer guide](/docs/agents/guides/mcp-developer-guide.md)

</details>

## Related resources

* [Chat tools reference](/docs/agents/reference/ai-features-cheat-sheet.md#chat-tools)
* [Create and use tool sets](/docs/agent-customization/tool-sets.md)
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
