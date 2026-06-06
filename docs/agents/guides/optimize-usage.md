---
ContentId: d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a
DateApproved: 6/3/2026
MetaDescription: Tips to optimize your AI credit usage in VS Code by choosing efficient models, managing context, and monitoring consumption.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Optimize AI credit usage in VS Code

Each GitHub Copilot plan includes a monthly allowance of [AI credits](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals). Different actions consume credits at different rates, based on the model and the number of tokens processed. This guide covers practical ways to get the most out of your AI credits in Visual Studio Code.

## Choose efficient models

More capable models cost more per token, while lighter models extend your usage further. Match the model to the complexity of the task:

* Use **lighter models** for quick edits, boilerplate generation, and straightforward questions.
* Use **reasoning models** for complex refactoring, architectural decisions, and multi-step debugging.
* Use **auto model selection** to let VS Code route each request to an efficient model that balances quality and cost.
* Use [custom agents](/docs/copilot/customization/custom-agents.md) with a preferred model to route specific subtasks to specialized, cost-effective models. When you invoke a custom agent as a subagent, it uses its own configured model instead of the chat session's model.

The model picker in chat shows cost details in the hover menu, including cost per token type and a generic cost tier label (Low, Medium, High). Use this information to make informed choices.

For more information, see [choosing and configuring language models](/docs/copilot/customization/language-models.md) and [best practices for model selection](/docs/copilot/best-practices.md#choose-the-right-model).

## Plan before you implement

Jumping straight into code generation can lead to wasted effort if the approach is wrong. It also requires a model with enough reasoning capability throughout the process, which can consume more credits. Instead, separate the planning and implementation phases. This allows you to use a reasoning model for planning, and then switch to a faster, more efficient model for implementation once the plan is solidified.

1. Use the [Plan agent](/docs/copilot/agents/planning.md) to research the task and create a structured implementation plan.
1. Review and refine the plan before the agent writes any code.
1. Hand off the approved plan to an implementation agent using a faster model to execute the plan.

This workflow ensures the agent understands the requirements before it starts generating code, reducing back-and-forth and rework.

For more information, see [plan first, then implement](/docs/copilot/best-practices.md#plan-first-then-implement).

## Use thinking effort defaults

Thinking effort controls how much reasoning a model applies to each request. Higher effort levels produce more thinking tokens, which increases both latency and credit consumption. VS Code sets default effort levels based on evaluations and has adaptive reasoning enabled, where the model dynamically decides how much to think based on the complexity of each request.

For most tasks, the defaults are sufficient. Only increase thinking effort for genuinely complex problems like architectural planning or multi-step debugging.

For more information, see [configure thinking effort](/docs/copilot/customization/language-models.md#configure-thinking-effort).

## Start new chats for new tasks

As a conversation grows, it accumulates context from previous messages, tool outputs, and file contents. When you switch to an unrelated task in the same session, the model still processes all that irrelevant history, which consumes tokens without improving results.

Start a [new chat session](/docs/copilot/chat/chat-sessions.md) (`kb(workbench.action.chat.newChat)`) when you change topics. This gives the model a clean context window focused on the current task.

## Leverage forking

When you want to explore an alternative approach or ask a side question, [fork the conversation](/docs/copilot/chat/chat-sessions.md#fork-a-chat-session) instead of re-prompting from scratch. Forking creates a new session that inherits the existing conversation history, so you don't need to re-establish context.

* Type `/fork` in the chat input to fork the entire session up to the current message.
* Hover over a previous message and select **Fork Conversation** to fork from a specific checkpoint.

## Disable unneeded tools and MCP servers

Every tool call produces output that consumes space in the [context window](/docs/copilot/concepts/language-models.md#context-window) and contributes to credit consumption. Disable tools you don't need for the current task to prevent unnecessary calls.

* Use the **Configure Tools** button in the chat input field to enable or disable individual tools or entire MCP servers for the current request.
* In [custom agents](/docs/copilot/customization/custom-agents.md), specify only the tools the agent needs via the `tools` property. This prevents the agent from calling tools that aren't relevant to its workflow.

For more information, see [Use tools in chat](/docs/chat/chat-tools.md).

## Exclude files from Copilot context

Large generated files, build outputs, or irrelevant directories can be included in the AI context, increasing token usage without adding value. Exclude these files to reduce unnecessary context:

* Use a `.gitignore` file to exclude files from the [workspace index](/docs/copilot/reference/workspace-context.md#what-content-is-included-in-the-semantic-index). The workspace index respects `.gitignore` rules.
* Use the `setting(files.exclude)` setting to hide files from VS Code entirely, which also excludes them from the index.

For more information, see [workspace context](/docs/copilot/reference/workspace-context.md).

## Manage context with compaction

When a conversation grows long, use `/compact` to summarize older parts of the conversation and reclaim context window space. You can optionally add instructions to guide the summary, for example `/compact focus on the API design decisions`.

For more information, see [context compaction](/docs/copilot/chat/copilot-chat-context.md#context-compaction).

## Monitor your usage

You can view your current Copilot usage in the Copilot status dashboard, available through the VS Code Status Bar. The dashboard shows the percentage of your monthly allowance you have used for AI credits (and inline suggestions for the Copilot Free plan).

<!-- TODO: add screenshot of Copilot status dashboard -->

Visit the GitHub Copilot documentation for more information about [monitoring usage and entitlements](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/monitoring-your-copilot-usage-and-entitlements).

You can also run the `/chronicle:cost-tips` command in any chat session to get personalized recommendations for optimizing your AI credit usage based on your recent activity. Learn more about [session insights and the chronicle command](/docs/copilot/chat/session-insights.md).

## Inspect token usage and caching

Use the [Agent Debug Logs](/docs/copilot/chat/chat-debug-view.md) to understand what is consuming credits in a session:

* The **Summary view** shows aggregate token usage for the session, including total tool calls and overall duration.
* The **Cache Explorer view** shows prompt cache hit rates and how many input tokens were reused. Prompt caching lets model providers reuse the prefix of a request that matches a previous one, which reduces latency and token costs.

Reviewing these logs helps you identify sessions or workflows that consume more tokens than expected, so you can adjust your approach.

## Related content

* [AI credits and model costs](/docs/copilot/concepts/language-models.md#ai-credits-and-model-costs)
* [Choose and configure language models](/docs/copilot/customization/language-models.md)
* [Best practices for GitHub Copilot](/docs/copilot/best-practices.md)
* [GitHub Copilot plans](https://docs.github.com/en/copilot/get-started/plans)
* [Usage-based billing](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals)
