---
ContentId: 2f4a8e9d-3c5b-4f6e-a7d8-1c2b3e4f5a6b
DateApproved: 3/9/2026
MetaDescription: Use Agent Logs and the Chat Debug view to inspect AI requests, tool invocations, and agent interactions in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Debug chat interactions

Visual Studio Code provides tools to help you understand what happens when you send a prompt to the AI. Use these tools to inspect how agents discover prompt files, invoke tools, make language model requests, and generate responses.

VS Code offers two complementary debugging tools:

* **Agent Debug panel** (Preview) shows a chronological event log of everything that happens during a chat session, including tool calls, LLM requests, prompt file discovery, and errors.
* **Chat Debug view** shows the raw details of each LLM request and response, including the full system prompt, user prompt, context, and tool invocation payloads.

## Agent Debug panel

> [!NOTE]
> The Agent Debug panel is currently in preview.

The Agent Debug panel is the primary tool for understanding what happens when you send a prompt. It shows a chronological event log of agent interactions during a chat session, making it especially useful when debugging [custom agents](/docs/copilot/agents/local-agents.md) and orchestrated sub-agent workflows.

To open the Agent Debug panel:

* Select the gear icon in the Chat view and select **Show Agent Logs**.

* Run **Developer: Open Agent Debug Panel** from the Command Palette.

You can switch between three views in the Agent Debug panel:

* **Logs**: a chronological list of events during the session, with filtering options to focus on specific event types.

* **Agent Flow Chart**: a flow chart that visualizes the interactions between agents and sub-agents during the session.

* **Summary**: aggregate statistics about the session, such as total tool calls, token usage, error count, and overall duration.

> [!NOTE]
> The Agent Debug panel is currently only available for local chat sessions. Log data is not persisted, so you can only view logs for chat sessions from your current VS Code session.

### Logs view

The Logs view shows a chronological list of events that occurred during the chat session. Each event includes a timestamp, event type, and summary information. You can expand each event to see more details, such as the full system prompt for an LLM request or the input and output for a tool call.

![Screenshot of the list of events in Agent Logs.](../images/chat-debug-view/agent-logs.png)

You can switch between a flat list and a tree view that groups events by subagent. Use the filter options to focus on specific events or event types.

The Logs view is the default view when you open the Agent Debug panel. You can also switch to the Logs view from the [Summary view](#summary-view) by selecting **View Logs**.

### Summary view

The Summary view provides aggregate statistics about the chat session, such as total tool calls, token usage, error count, and overall duration.

![Screenshot of the summary view in Agent Logs, showing aggregate statistics for the chat session.](../images/chat-debug-view/agent-logs-summary-v2.png)

To open the Summary view:

1. Open the Agent Debug panel by selecting the gear icon in the Chat view and selecting **Show Agent Logs**.

1. Select the session description in the breadcrumb at the top of the panel.

### Agent Flow Chart view

The Agent Flow Chart view visualizes the sequence of events and interactions between agents, making it easier to understand complex orchestrations.

![Screenshot of the flow chart in Agent Logs, showing the interactions between agents and sub-agents.](../images/chat-debug-view/agent-flow-chart-v2.png)

You can pan and zoom the flow chart and select any node in the flow chart to see details about that event.

To open the flowchart view, select **Agent Flow Chart** from the [Summary view](#summary-view).

1. Open the Agent Debug panel by selecting the gear icon in the Chat view and selecting **Show Agent Logs**.

1. Select the session description in the breadcrumb at the top of the panel.

1. Select **Agent Flow Chart** from the Summary view.

### Attach debug events to chat

You can attach a snapshot of the agent debug events to a chat conversation and ask the AI questions about the current session. This is useful for understanding token usage, which customizations loaded, what tool calls happened, and how long requests took.

To attach debug events to chat:

1. Open the [Agent Logs view](#logs-view) for your chat session

1. Select the sparkle icon in the top right of the Agent Debug panel. This opens the Chat view with the debug events snapshot attached as context.

## Chat Debug view

The Chat Debug view shows the raw details of each AI request and response. Use it when you need to inspect the exact system prompt, user prompt, context, or tool response payloads sent to and received from the language model.

### Open the Chat Debug view

To open the Chat Debug view:

* Select the overflow menu in the Chat view and select **Show Chat Debug View**.
* Run the **Developer: Show Chat Debug View** command from the Command Palette.

![Screenshot of the Chat Debug view, showing the details of a chat request and response.](../images/chat-debug-view/chat-debug-view.png)

### Read the debug output

Each interaction in the Chat Debug view contains expandable sections:

| Section | What it shows | What to look for |
|---|---|---|
| **System prompt** | The instructions that define the AI's behavior, capabilities, and constraints. | Verify that custom instructions or agent descriptions appear correctly. |
| **User prompt** | The exact text of your prompt as sent to the model. | Confirm your prompt was sent as expected, including any `#`-mentions resolved to actual content. |
| **Context** | Files, symbols, and other context items attached to the request. | Check that the expected files and context appear. If a file is missing, it might not have been indexed or the context window might be full. |
| **Response** | The full text of the model's response, including reasoning. | Review the raw response to understand how the model interpreted your request. |
| **Tool responses** | Inputs and outputs of tools invoked during the request. | Verify that tools received correct inputs and returned expected outputs. Useful for debugging MCP servers. |

You can expand each section to see the full details. This is particularly useful when [using agents](/docs/copilot/agents/local-agents.md) where multiple tools might be invoked as part of a single request.

## Common troubleshooting scenarios

### The AI ignores your workspace files

If the AI responds with generic information instead of referencing your codebase:

1. Open Agent Logs and check for **Discovery** events to verify that workspace files were indexed.
1. Open the Chat Debug view and check the **Context** section to verify that workspace files appear in the context. If they don't, check that [workspace indexing](/docs/copilot/reference/workspace-context.md) is active.
1. Try adding explicit `#`-mentions (such as `#file` or `#codebase`) to ensure the right files are included. Learn more about [managing context](/docs/copilot/chat/copilot-chat-context.md).

### An MCP tool is not being invoked

If the AI doesn't call an expected tool:

1. Open Agent Logs and check the **Tool calls** filter to see if the tool was invoked or skipped.
1. Open the Chat Debug view and check the **System prompt** section to verify the tool is listed in the available tools.
1. If the tool is missing, verify that the MCP server is running and configured correctly.
1. Try explicitly mentioning the tool with `#tool-name` in your prompt.

### The AI response is incomplete or cut off

If the response appears truncated:

1. Check Agent Logs for **LLM requests** events to review token usage.
1. A full context window might cause the model to truncate its response. Start a [new chat session](/docs/copilot/chat/chat-sessions.md) to reset the context.

### A prompt file is not being applied

If a custom instruction or prompt file doesn't seem to take effect:

1. Open Agent Logs and check the **Discovery** events to see if the file was loaded, skipped, or failed validation.
1. Verify the file location and `applyTo` pattern match the current context.
1. Check the [chat customization diagnostics](/docs/copilot/troubleshooting.md#chat-customization-diagnostics) for error details.

## Related resources

* [Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Manage context for AI](/docs/copilot/chat/copilot-chat-context.md)
* [Troubleshoot AI in VS Code](/docs/copilot/troubleshooting.md)
* [Security considerations for using AI in VS Code](/docs/copilot/security.md)
