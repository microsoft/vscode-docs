---
ContentId: c4a81e63-9d27-4b5f-8e10-2a7f6c9d3b04
DateApproved: 7/29/2026
MetaDescription: Understand agent sessions in VS Code, the unit of work with an agent, how sessions are shared across surfaces, and how to hand off a session between agents.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- sessions
- handoff
- fork
- context window
- agents window
---

# Sessions and handoff

A session is the unit of work with an agent in Visual Studio Code: a single conversation with an agent, along with all the context that builds up as it works. This article explains what a session is, how sessions behave, how they are shared across surfaces, and how you hand off a session from one agent to another.

To create and organize sessions, see [Manage agent sessions](/docs/agents/sessions/manage-sessions.md).

## What a session is

A session holds one conversation with an agent, including your prompts, the agent's responses, the tool calls it makes, and the [context](/docs/agents/concepts/context.md) it accumulates along the way. Each session is independent and has its own [context window](/docs/agents/concepts/language-models.md#context-window), so work in one session doesn't leak into another.

The session is the main way you organize agent work. You give a session a task, follow its progress, and review its results as a self-contained thread.

## Chats within a session

A session can contain more than one chat. Each chat is an independent conversation with its own history, title, status, and agent or model selection, but all chats in a session share the same workspace and code isolation. A new chat starts blank and doesn't inherit the conversation history of the other chats in the session.

Running several chats in one session lets you work on related tasks against the same codebase at the same time without switching sessions. This capability runs on the [Agent Host](/docs/agents/concepts/agent-host.md) and is available for harnesses that support it, such as Copilot and Claude. Learn how to [run multiple chats in a session](/docs/agents/sessions/manage-sessions.md#run-multiple-chats-in-a-session).

## Work with multiple sessions

Because each session is independent, you can run several at once and move between them:

* **Run in parallel**: start multiple sessions to work on independent tasks at the same time. A session keeps running when you switch away from it.
* **Fork**: branch a session to explore an alternative direction without losing the original.
* **Checkpoint and roll back**: return a session to an earlier point to undo a set of changes. Learn more about [checkpoints](/docs/agents/review-code-edits.md#edit-requests-and-restore-checkpoints).

## Sessions across surfaces

The [Chat view](/docs/agents/chat-view.md) and the [Agents window](/docs/agents/agents-window.md) share the same sessions. You can start a task in one surface and continue it in the other, and the sessions list gives you a unified view of all your sessions regardless of where they run.

On the [Agent Host](/docs/agents/concepts/agent-host.md), an agent can also coordinate work across sessions. It can list sessions, create new sessions or chats, read another session's recent context, and send follow-up messages between sessions.

## Hand off a session

Handoff changes the session target from one [harness](/docs/agents/concepts/agent-harnesses.md) to another and carries the full conversation history and context with it. Use handoff when a different harness or execution environment is a better fit for the next part of the task.

Common handoffs include:

* **Harness to harness**: continue a Copilot session with Claude or Codex to use provider-specific capabilities.
* **Plan to implementation**: use the [Plan agent](/docs/agents/planning.md) to produce a reviewed plan, then hand off to an implementation agent.
* **Continue in the cloud**: hand off a well-scoped task to a [cloud harness](/docs/agents/agent-harnesses.md#start-a-cloud-session) for remote execution and a pull request workflow.

Learn how to [hand off an ongoing session](/docs/agents/agent-harnesses.md#hand-off-a-session).

## Remote and synced sessions

A session doesn't have to run on your local machine, and it doesn't have to stay on one device:

* **Remote sessions** run on a machine other than the one you work from. You can connect the Agents window to a remote host over SSH or a dev tunnel, or use Copilot remote control (`/remote on`) to monitor and steer a running Copilot session from GitHub. Learn more about [connecting to a remote machine](/docs/agents/remote-agent-sessions.md) and [remote control for Copilot sessions](/docs/agents/agent-harnesses.md#remote-control-copilot-sessions).
* **Synced sessions** are backed up to your GitHub account so you can access them across devices. Learn more about [syncing sessions](/docs/agents/sessions/session-history.md).
* **Session insights** let you query your session history to review what you worked on. Learn more about [session insights](/docs/agents/sessions/session-history.md#query-session-history-with-chronicle).

## Related resources

* [Manage agent sessions](/docs/agents/sessions/manage-sessions.md)
* [Agent harnesses](/docs/agents/concepts/agent-harnesses.md)
* [Agents](/docs/agents/concepts/agents.md)
* [VS Code Agent Host architecture](/docs/agents/concepts/agent-host.md)
