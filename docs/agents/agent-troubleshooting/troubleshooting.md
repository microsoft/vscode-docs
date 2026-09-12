---
ContentId: f8e4b2c1-9d3a-4e5f-b6c7-8a9d0e1f2b3c
DateApproved: 9/2/2026
MetaDescription: Diagnose GitHub Copilot and agent issues in {% data variables.product.prodname_vscode %} with targeted checks, logs, and network diagnostics.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- troubleshooting
- diagnostics
- logs
- debugging
---
# Troubleshoot AI in {% data variables.product.prodname_vscode %}

When chat, agents, or inline suggestions do not behave as expected, start with the symptom you see. This article helps you choose the right diagnostic tool, interpret the result, and collect useful evidence if you need to report the issue.

## Choose a troubleshooting path

| Symptom | Start here | Next step |
|---------|------------|-----------|
| Chat or agents are unavailable | Check [chat and agent requirements](/docs/agents/agent-troubleshooting/faq.md#chat-features-arent-working-for-me). | Confirm your account, plan, settings, and organization policies. |
| Inline suggestions do not appear | Check the [inline suggestion requirements](/docs/agents/agent-troubleshooting/faq.md#inline-suggestions-are-not-working-in-the-editor). | Inspect the Copilot logs if the requirements are met. |
| Copilot cannot connect or sign in | [Collect network diagnostics](#collect-network-diagnostics). | Check your firewall, proxy, or VPN configuration. |
| Instructions are ignored | [Check customization diagnostics](#check-customization-diagnostics). | Inspect the session to verify which instructions reached the model. |
| A file, tool, or expected step is missing from a response | [Inspect chat interactions](#inspect-chat-interactions). | Compare the session events with the request sent to the model. |
| A response is slow or uses more tokens than expected | Open the Agent Debug Logs Summary view. | Use the Cache Explorer only if the session reports low cache reuse. |
| An MCP server or tool is unavailable | [Troubleshoot MCP servers](#troubleshoot-mcp-servers). | Inspect the server output and the tools available to the request. |

## Start with basic checks

Before you collect detailed logs:

1. Run **Code: Check for Updates** from the Command Palette to update {% data variables.product.prodname_vscode_shortname %}.
1. Confirm your access method. Sign in with the GitHub account that has your Copilot plan, or select a configured bring-your-own-key model for supported chat features. Some features require the GitHub Copilot service. For details, see [GitHub Copilot subscription questions](/docs/agents/agent-troubleshooting/faq.md#github-copilot-subscription).
1. Open the Copilot status dashboard in the Status Bar and check whether you have reached an allowance. A temporary rate limit is separate from your monthly allowance.
1. Check whether a workspace setting or organization policy turns off the affected feature. For agent availability, see [Agents are not available in chat](/docs/agents/agent-troubleshooting/faq.md#agents-are-not-available-in-chat).
1. Reproduce the issue in a new chat session. When you compare two runs, keep the prompt, model, and available tools consistent.

## Check customization diagnostics

Use the chat customization diagnostics view when an instructions file does not appear to apply.

1. Open the {% data variables.copilot.chat_view %}.
1. In the {% data variables.copilot.chat_view %}, open the context menu and select **Diagnostics**.
1. Review the discovered instruction files and any reported errors.

Use the result to choose the next action:

* **The file is missing**: Verify its file name, location, and the settings that control instruction discovery.
* **The file has an error**: Fix the reported frontmatter or content error, and then reopen the diagnostics view.
* **The file is loaded but not applied**: For a `*.instructions.md` file, verify that its `applyTo` pattern matches the file you are working on. Also check the **References** section of the chat response to see which instructions were used.
* **A prompt file is missing from the request**: Invoke the prompt file manually in chat. Prompt files do not use `applyTo`, and agents that run on the Agent Host do not use prompt files.

For file locations, applicability rules, and settings, see [Use custom instructions](/docs/agent-customization/custom-instructions.md). To verify the exact instructions sent to the model, use the [Chat Debug view](/docs/agents/agent-troubleshooting/chat-debug-view.md#chat-debug-view).

## Inspect chat interactions

Use the following tools when the basic checks pass but an agent behaves unexpectedly:

| Tool | Use it to |
|------|-----------|
| `/troubleshoot` | Ask the AI to analyze captured session events and answer a specific question. |
| **Agent Debug Logs** panel (Preview) | Follow the sequence of model requests, tool calls, customization discovery, errors, and agent activity. |
| **Chat Debug view** | Inspect the exact system prompt, user prompt, context, tool definitions, and tool payloads for a request. |
| **Cache Explorer** | Compare consecutive model requests after session metrics indicate low cache reuse. |

Prepare the session before you reproduce the issue:

* For local chat sessions in the main {% data variables.product.prodname_vscode_shortname %} window, enable the experimental `setting(github.copilot.chat.agentDebugLog.fileLogging.enabled)` setting and reload the window before you use `/troubleshoot`.
* For sessions that run on the [Agent Host](/docs/agents/concepts/agent-host.md), enable the experimental `setting(chat.agentHost.agentDebugLog.enabled)` setting before the activity that you want to inspect. Capture is not retroactive.
* Reproduce the issue, and then select that session when you open the logs or use `/troubleshoot`.

To analyze an Agent Host session with chat:

1. Open the {% data variables.copilot.agents_window %}.
1. Enter `/troubleshoot #session` in the chat input.
1. Select the local or remote session that contains the issue.
1. Add a focused question, such as `which tool failed and what error did it return?`, and send the request.

For detailed procedures and scenario-based guidance, see [Debug chat interactions](/docs/agents/agent-troubleshooting/chat-debug-view.md).

## View logs for GitHub Copilot

The GitHub Copilot output channels record connection failures, extension errors, and other runtime information. Increase the log level only while you reproduce an issue because trace logging produces detailed output.

1. Open the Command Palette (`kb(workbench.action.showCommands)`).
1. Run **Developer: Set Log Level** and set the GitHub Copilot and {% data variables.copilot.copilot_chat %} extensions to **Trace**.
1. Reproduce the issue.
1. Run **Output: Show Output Channels** and select **GitHub Copilot** or **{% data variables.copilot.copilot_chat %}**.
1. Review errors and warnings around the time of the failed action.
1. Run **Developer: Set Log Level** again and restore the previous log levels.

To switch output channels, use the dropdown on the right side of the Output panel.

## Collect network diagnostics

If Copilot cannot connect, collect diagnostics to identify failed connectivity checks and relevant proxy or network configuration.

1. Open the Command Palette (`kb(workbench.action.showCommands)`).
1. Run **GitHub Copilot: Chat Diagnostics**.
1. Review the diagnostic report that opens in an editor.

If a check fails, compare the result with your firewall, proxy, and VPN configuration. A report without failed checks rules out only the connections covered by the report, so continue with the Copilot output channels if the problem persists.

For required domains and network-specific guidance, see [Network and firewall configuration for Copilot](/docs/agents/agent-troubleshooting/faq.md#network-and-firewall-configuration-for-copilot).

## Troubleshoot MCP servers

If an MCP server or one of its tools is unavailable:

1. Open the Command Palette and run **MCP: List Servers**.
1. Select the server and review its status.
1. Select **Show Output** and inspect errors from the failed request.
1. Correct the reported configuration or connection problem.
1. Select **Restart Server**, and then retry the request.

If the server is running but the model does not invoke its tool, follow [An MCP tool is not being invoked](/docs/agents/agent-troubleshooting/chat-debug-view.md#an-mcp-tool-is-not-being-invoked).

For setup and server-specific checks, see [Configure and debug MCP servers](/docs/agent-customization/mcp-servers.md#troubleshoot-and-debug-mcp-servers).

## Report an unresolved issue

If the issue persists, include enough evidence to reproduce and diagnose it:

> [!CAUTION]
> Agent Debug Log exports, Chat Debug output, and Copilot logs can contain prompts, source code, file paths, tool inputs and outputs, and other sensitive data. Review and remove sensitive content before sharing a report. Never include credentials or secrets.

* **Ghost text suggestions**: Hover over a suggestion and select **Send Copilot Completion Feedback**.
* **{% data variables.copilot.next_edit_suggestions_caps %}**: Select **Feedback** from the {% data variables.copilot.next edit suggestions %} menu in the editor gutter.
* **Chat and agent issues**: Open **Help** > **Report Issue**, select **{% data variables.product.prodname_vscode_shortname %} Extension**, and then select **{% data variables.copilot.copilot_chat %}**.

Include the {% data variables.product.prodname_vscode_shortname %} version, clear reproduction steps, the expected and actual result, and the relevant diagnostic output.

## Related resources

* [Debug chat interactions](/docs/agents/agent-troubleshooting/chat-debug-view.md)
* [GitHub Copilot frequently asked questions](/docs/agents/agent-troubleshooting/faq.md)
* [Troubleshooting GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot)
