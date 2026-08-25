---
ContentId: 8f2c4a1d-9e3b-4c5f-a7d8-6b9c2e4f1a3d
DateApproved: 8/26/2026
MetaDescription: Use built-in, MCP, and extension tools with AI agents in {% data variables.product.prodname_vscode_shortname %}, including tool selection, parameters, terminal commands, and approvals.
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

This article describes how to use tools in your prompts and manage tool invocations. To control how the agent requests approval for tool calls and how much autonomy it has, see [Manage approvals and permissions](/docs/agents/run/approvals.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Try tools in action">
Launch a chat prompt that uses the web tool to summarize the latest {% data variables.product.prodname_vscode_shortname %} updates.

* [Open in {% data variables.product.prodname_vscode_shortname %}](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=Summarize%20the%20latest%20VS%20Code%20updates%20%23web)

</div>

## Select tools for a request

Use the tools picker in the {% data variables.copilot.chat_view %} to select which tools are available for a request. Add more tools by [installing MCP servers](/docs/agent-customization/mcp-servers.md) or [extensions](/docs/configure/extensions/extensions.md) that contribute tools.

> [!NOTE]
> The tools picker applies to the local agent. For the [Copilot harness](/docs/agents/run/agent-harnesses.md), manage tool availability with the profile-wide [Tools customization page](/docs/agent-customization/tools.md) instead.

> [!TIP]
> Select only the tools that are relevant for your prompt to improve your results.

To access the tools picker:

1. Open the {% data variables.copilot.chat_view %} and select **Agent** from the agent picker.

1. Select the **Configure Tools** button in the chat input field.

    ![Screenshot showing the {% data variables.copilot.chat_view %}, highlighting the Configure Tools button in the chat input.](../images/chat-tools/agent-mode-select-tools.png)

1. Select or deselect tools to control which ones are available for the current request.

    Use the search box to filter the list of tools.

When you customize chat with [prompt files](/docs/agent-customization/prompt-files.md) or [custom agents](/docs/agent-customization/custom-agents.md), you can specify which tools are available for a given prompt or mode. Learn more about the [tool list priority order](/docs/agent-customization/custom-agents.md#tool-list-priority).

## Use tools in your prompts

When using [agents](/docs/agents/concepts/agents.md), the agent automatically determines which tools to use from the enabled tools based on your prompt and the context of your request. The agent autonomously chooses and invokes relevant tools as needed to accomplish the task.

You can also explicitly reference tools in your prompts by typing `#` followed by the tool name. This is useful when you want to ensure a specific tool is used. Type `#` in the chat input field to see a list of available tools, including built-in tools, MCP tools from installed servers, extension tools, and tool sets.

**Examples of explicit tool references:**

* `"What is the latest version of Node.js #web"`
* `"How does routing work in Next.js? #web"`
* `"Fix the issues in #problems"`
* `"Explain the authentication flow #codebase"`

> [!TIP]
> By default, tool call details are collapsed in the chat conversation. You can expand them by selecting the tool summary line in chat, or change grouping behavior with `setting(chat.agent.thinking.collapsedTools)` (experimental): use `off` to keep tool calls separate, `withThinking` to group with thinking when available, or `always` to always group. When `setting(chat.agent.thinkingStyle)` is `collapsed`, reasoning and grouped tool calls can appear in separate collapsible sections.

To group related tools and reuse them across prompts, prompt files, and custom agents, [create a tool set](/docs/agent-customization/tool-sets.md).

## Use built-in browser tools

Browser tools give agents an interactive way to validate web applications. Instead of inspecting only the source code, an agent can run your app, open it in the integrated browser, exercise a user flow, inspect page content and console errors, and fix problems it discovers.

Browser tools are built into {% data variables.product.prodname_vscode_shortname %} and don't require an external MCP server. Use them when a task has an observable result in a web interface, such as verifying a form, reproducing a visual bug, checking responsive behavior, or testing a complete user journey.

```prompt
Start the app, open it in the browser, and test the password reset flow.
Fix any issues you find and repeat the flow to verify the fix.
```

Learn how to [use browser tools with agents](/docs/agents/run/browser-tools.md), including browser sessions, page sharing, privacy controls, and effective prompting patterns.

## Edit tool parameters

You can review and edit the input parameters before a tool runs:

1. When the tool confirmation dialog appears, select the chevron next to the tool name to expand its details.

1. Edit any tool input parameters as needed.

1. Select **Allow** to run the tool with the modified parameters.

## Run terminal commands

Of all the built-in tools, the terminal tool is one of the most frequently used. The agent uses it to run commands as part of its workflow, for example to install dependencies, run a build, or execute tests. Because terminal commands can change your environment, {% data variables.product.prodname_vscode_shortname %} provides additional controls for reviewing, running, and monitoring them, building on the [approval](/docs/agents/run/approvals.md) behavior described earlier.

When the agent decides to run a command, it uses the built-in terminal tool to execute it in an integrated terminal within {% data variables.product.prodname_vscode_shortname %}.

In the chat conversation, the agent displays the commands it ran. You can view the output of the command inline in chat by selecting **Show Output** (`>`) next to the command. You can also view the full output in the integrated terminal by selecting **Show Terminal**.

![Screenshot showing terminal command output in chat.](../images/chat-tools/terminal-command-output.png)

Use the experimental `setting(chat.tools.terminal.outputLocation)` setting to configure where terminal command output appears: inline in chat, or directly in the integrated terminal.

### Continue terminal commands in background

When the agent runs a long-running terminal command, such as starting a development server or running a build in watch mode, you can push the command to the background. This allows the agent to continue with other tasks without waiting for the command to finish.

While a command is running, a **Continue in Background** button appears next to the terminal command in the chat conversation. Select this button to move the command to the background. The command continues running, and the agent can check its output later or use the terminal for other tasks.

The agent can also specify a timeout when running terminal commands. When the timeout is reached, the agent stops waiting for the command and returns the output collected so far. Use the `setting(chat.tools.terminal.enforceTimeoutFromModel)` setting to control whether to enforce the timeout value that the agent specifies.

The agent can also choose to run commands directly in the background, without user interaction. Background terminals that you have not revealed are automatically cleaned up when their command finishes, which prevents stale terminals from accumulating over a long session. To reveal a background terminal and keep it open after the command completes, select the **Show** link in the chat tool invocation header. The terminal output remains visible in the chat conversation even after a terminal is cleaned up.

> [!TIP]
> To automatically approve terminal commands or restrict file system and network access for agent commands, see [Manage approvals and permissions](/docs/agents/run/approvals.md).

## Frequently asked questions

<details>
<summary>How do I know which tools are available?</summary>

Type `#` in the chat input field to see a list of all available tools. You can also use the tools picker in chat to view and manage the list of active tools.

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
* [Manage tools for the Copilot harness](/docs/agent-customization/tools.md)
* [Agent hooks](/docs/agent-customization/hooks.md) - Execute custom commands at tool lifecycle events
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
