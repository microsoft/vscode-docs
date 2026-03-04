---
ContentId: 2f4a8e9d-3c5b-4f6e-a7d8-1c2b3e4f5a6b
DateApproved: 3/4/2026
MetaDescription: Use Agent Logs and the Chat Debug view to inspect AI requests, tool invocations, and agent interactions in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Debug chat interactions

Visual Studio Code provides tools to help you understand what happens when you send a prompt to the AI. Use these tools to inspect how agents discover prompt files, invoke tools, make language model requests, and generate responses.

VS Code offers two complementary debugging tools:

* **Agent Logs** (Preview) shows a chronological event log of everything that happens during a chat session, including tool calls, LLM requests, prompt file discovery, and errors.
* **Chat Debug view** shows the raw details of each LLM request and response, including the full system prompt, user prompt, context, and tool invocation payloads.

## Agent Debug panel

> [!NOTE]
> The Agent Debug panel is currently in preview.

The Agent Debug panel is the primary tool for understanding what happens when you send a prompt. It shows a chronological event log of agent interactions during a chat session, making it especially useful when debugging [custom agents](/docs/copilot/agents/local-agents.md) and orchestrated sub-agent workflows.

### Open the Agent Debug panel

To open the Agent Debug panel, select the gear icon in the Chat view and select **Show Agent Logs**.

The Agent Debug panel starts with a summary of the session, showing aggregate statistics such as total tool calls, token usage, error count, and overall duration.

Below the summary, you can switch between two views:

* **View Logs**: a chronological list of events during the session. You can switch between a flat list and a tree view that groups events by sub-agent. Use the category filters to focus on specific event types:

    ![Screenshot of the list of events in Agent Logs.](../images/chat-debug-view/agent-logs.png)

    | Category | What it shows |
    |---|---|
    | **Chat customizations** | Prompt file and instruction file discovery, including which files were loaded, skipped, or failed validation. |
    | **Tool calls** | Each tool invocation with the tool name, arguments, duration, result summary, and error details if the call failed. |
    | **LLM model turns** | Language model requests with token usage (total and cached) and request duration. |
    | **Subagent invocations** | Agent loop lifecycle events, such as when agents start, finish, or hand off to sub-agents. |

* **Agent Flow Chart**: a flowchart that visualizes the interactions between agents and sub-agents during the session.

    ![Screenshot of the flow chart in Agent Logs, showing the interactions between agents and sub-agents.](../images/chat-debug-view/agent-flow-chart.png)

    You can pan and zoom the flow chart and select any node in the flow chart to see details about that event.

> [!NOTE]
> The Agent Debug panel is currently only available for local chat sessions. Log data is not persisted, so you can only view logs for chat sessions from your current VS Code session.

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
