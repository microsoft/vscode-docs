---
ContentId: d6b02f84-1a97-4c3e-8f52-9e4a7d1c6b08
DateApproved: 7/30/2026
MetaDescription: Hand off an ongoing agent session in VS Code by changing the session target while preserving conversation history and context.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- handoff
- session target
- cloud agent
- claude
- codex
- plan
---

# Hand off a session

Handoff changes the session target for an ongoing agent session and carries the full conversation history and context to the new target. Use handoff when another agent harness or execution environment is a better fit for the next part of the task. For background on how handoff works, see [Sessions and handoff](/docs/agents/concepts/sessions.md#hand-off-a-session).

For example, continue a Copilot session with Claude or Codex to use provider-specific capabilities, send a well-scoped task to a cloud agent for a pull request workflow, or move from the Plan agent to an implementation agent.

## Hand off an ongoing session

1. Open the ongoing chat session.

1. In the chat input, open the **Session Target** dropdown.

1. Select the session target that should continue the work, such as Copilot, Claude, Codex, or Cloud.

VS Code continues the work with the selected target and carries over the conversation history and context. The tools, permission options, and available models might change because each target provides different capabilities.

> [!TIP]
> In Copilot CLI, enter `/delegate` to continue the work with a cloud agent.

## Hand off a plan to implementation

The [Plan agent](/docs/agents/planning.md) focuses on researching a task and creating a plan without changing code. After you review the plan, use its specialized handoff action to continue with an implementation agent.

1. Use the Plan agent to create and refine the implementation plan.

1. Review the plan and confirm that it covers the requirements and verification steps.

1. Select **Start Implementation** and choose an available implementation agent.

The implementation agent receives the plan and conversation context and starts implementing it.

## Handoff compared to related actions

| Action | What it does |
|---|---|
| **Hand off** | Changes the session target and carries the conversation history and context to the new target. |
| **Fork a session** | Creates an independent session from a point in the conversation so you can explore another direction without changing the original. Learn more about [forking sessions](/docs/chat/chat-sessions.md#fork-a-chat-session). |
| **Switch surfaces** | Opens the same session in the [Chat view](/docs/agents/chat-view.md) or [Agents window](/docs/agents/agents-window.md) without changing its target or context. You can switch between views and pick up where you left off. |

## Next steps

* [Sessions and handoff](/docs/agents/concepts/sessions.md): understand sessions as the unit of work.
* [Manage chat sessions](/docs/chat/chat-sessions.md): create, organize, and configure your sessions.
* [Agent harnesses](/docs/agents/concepts/agent-harnesses.md): choose the agent that best fits your task.
