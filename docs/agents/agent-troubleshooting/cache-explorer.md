---
ContentId: 8b3d1c2f-6a94-4e7b-9f21-5c8d0a1e2b34
DateApproved: 7/1/2026
MetaDescription: Use the Cache Explorer view in Visual Studio Code to diagnose prompt cache misses and reduce token cost and latency in AI chat sessions.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- prompt caching
- cache explorer
- cache hit rate
- token usage
- agent debug logs
---
# Diagnose prompt caching with the Cache Explorer

When you send a prompt to the AI in Visual Studio Code, the language model provider can reuse the parts of your request that match a previous request. This is called prompt caching. The Cache Explorer view helps you diagnose prompt cache misses by comparing consecutive model requests in a chat session, which helps you reduce token cost and latency.

The Cache Explorer is one of the views in the [Agent Debug Logs panel](/docs/agents/agent-troubleshooting/chat-debug-view.md#agent-debug-log-panel).

## Why prompt caching matters

Prompt caching lets a model provider reuse the prefix of a request that matches a previous one. When the beginning of a request is identical to the previous request, the provider serves that portion from cache instead of processing it again. A higher cache hit rate reduces both latency and token cost.

The cache only applies to the matching prefix of a request. As soon as the content of two consecutive requests diverges, everything after that point is a cache miss. Small changes early in the prompt, such as a reordered tool definition or a modified instruction, break the cache for the rest of the request. The Cache Explorer pinpoints exactly where the prompt prefix diverges, which helps you understand and address a low cache hit rate.

## Open the Cache Explorer

1. Open the Agent Debug panel by selecting the ellipsis (**...**) menu in the Chat view and selecting **Show Agent Debug Logs**.

1. Select the session description in the breadcrumb at the top to go to the Summary view.

1. Select **Cache Explorer** to open the Cache Explorer view for the selected session.

![Screenshot showing the Cache Explorer view in Agent Logs, with a side-by-side diff of two model requests.](../images/chat-debug-view/cache-explorer.png)

## Read the Cache Explorer

The Cache Explorer has two panels:

* The side panel lists all model turns in the session, grouped by user request. Each turn shows the cache hit percentage, duration, model name, and timestamp. Select a turn to compare it against the previous turn.
* The main content shows a side-by-side prefix diff between the current request and the previous request.

The main content area includes the following information:

* **Cache performance**: the cache hit percentage and the number of input tokens reused out of the total.
* **Prompt signature**: a visual summary of each component in the request, such as system instructions, tool definitions, and messages, with color-coded status indicators. The first divergence point marks where the prompt cache breaks.
* **Components**: expandable sections for system instructions, tool definitions, and individual messages that show the text-level diff between the two requests.

To find the cause of a cache miss, locate the first divergence point in the prompt signature, then expand the corresponding component to see the exact text that changed between the two requests.

## Improve your cache hit rate

Prompt caching works best when the early parts of your requests stay stable across turns. Use the following practices to keep the prompt prefix consistent:

* **Lock in settings before you start**: Switching the model, reasoning effort, context size, or the enabled tools and MCP servers during a session rebuilds the cache. Choose them upfront, or use auto model selection, which switches models only at cache boundaries.
* **Keep instructions stable**: Changing instructions files or custom agent definitions mid-session breaks the cache. For more information, see the [context engineering guide](/docs/agents/guides/context-engineering-guide.md).
* **Add volatile context late**: Place content that changes often, such as file attachments or terminal output, later in the conversation.
* **Isolate exploration in subagents**: Run research in a [subagent](/docs/agents/subagents.md) to keep the parent session prompt stable.
* **Start fresh after a break**: Caches expire after inactivity. Start a new session or run `/compact` to rebuild from a short summary instead of the full history.

## Related content

* [Debug chat interactions](/docs/agents/agent-troubleshooting/chat-debug-view.md)
* [Optimize your AI usage](/docs/agents/guides/optimize-usage.md)
* [Context engineering guide](/docs/agents/guides/context-engineering-guide.md)
* [OpenTelemetry monitoring for agents](/docs/agents/guides/monitoring-agents.md)
* [Optimizing your AI usage to maximize efficiency and reduce cost](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage)
