---
ContentId: c4a81e63-9d27-4b5f-8e10-2a7f6c9d3b04
DateApproved: 9/16/2026
MetaDescription: Understand agent sessions in {% data variables.product.prodname_vscode_shortname %}, how they run across environments, and how handoff works.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- sessions
- handoff
- fork
- context window
- {% data variables.copilot.agents_window %}
---

# Understand agent sessions and handoff

A session is the unit of work with an agent in {% data variables.product.prodname_vscode %}. It brings together the conversation, workspace, and code changes for a task and can contain multiple chats when the harness supports them. This article explains what a session is, how sessions behave, how they are shared across surfaces, and how you hand off a session from one agent to another.

To create and organize sessions, see [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md).

## What is a session?

A session contains one or more chats. Each chat records your prompts, the agent's responses, the tool calls it makes, and the [context](/docs/agents/concepts/context.md) it accumulates along the way. Its conversation history contributes to the language model's [context window](/docs/agents/concepts/language-models.md#context-window) and isn't automatically shared with other chats or sessions.

The session is the main way you organize agent work. You give a session a task, follow its progress, and review its results as a self-contained thread.

The session's [execution environment](/docs/agents/concepts/agent-harnesses.md#relate-execution-environments-and-code-isolation) determines where it works on code. An Agent Host session can use a workspace on your machine, a connected host, or inside a Dev Container on either host, depending on the available harness. A container changes the development environment, not how the session organizes the conversation and task.

## Chats within a session

A session can contain more than one chat. Each chat is an independent conversation with its own history, title, status, and agent or model selection, but all chats in a session share the same workspace and code isolation. A new chat starts blank and doesn't inherit the conversation history of the other chats in the session.

Running several chats in one session lets you work on related tasks against the same codebase at the same time without switching sessions. This capability runs on the [Agent Host](/docs/agents/concepts/agent-host.md) and is available for harnesses that support it, such as Copilot and Claude. Learn how to [run multiple chats in a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session).

For example, you're adding a sign-in form. Use one chat to build the form and another chat in the same session to write tests. The test-writing chat can read the implementation files once they're saved, but it doesn't inherit the first chat's conversation. Include requirements such as rejecting an empty email address in the second chat's prompt, rather than relying on your earlier discussion.

Both chats can edit the same files. When you need separate working directories, use separate sessions with [worktree isolation](/docs/agents/run/agent-harnesses.md#choose-code-isolation), where available.

## Work with multiple sessions

Because each session is independent, you can run several at once and move between them:

* **Run in parallel**: start multiple sessions to work on independent tasks at the same time. A session keeps running when you switch away from it.
* **Fork**: branch a session to explore an alternative direction without losing the original.
* **Checkpoint and roll back**: return a session to an earlier point to undo a set of changes. Learn more about [checkpoints](/docs/agents/run/review-code-edits.md#edit-requests-and-restore-checkpoints).

## Sessions across surfaces

The [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) share the same sessions. You can start a task in one surface and continue it in the other, and the sessions list gives you a unified view of all your sessions regardless of where they run.

{% data variables.product.prodname_vscode_shortname %} can also discover supported local sessions created in {% data variables.copilot.copilot_cli_short %}, the {% data variables.copilot.github_copilot_app %}, Claude Code, and Codex. A discovered session is external until you send a message from {% data variables.product.prodname_vscode_shortname %}. The Agent Host then adopts the session, and the external-session filter no longer controls whether it appears. Learn how to [view sessions from other applications](/docs/agents/run/sessions/manage-sessions.md#view-sessions-from-other-applications).

On the [Agent Host](/docs/agents/concepts/agent-host.md), an agent can also coordinate work across sessions. It can list sessions, create new sessions or chats, read another session's recent context, and send follow-up messages between sessions.

## Hand off a session

Handoff continues ongoing work with a different agent configuration and carries the full conversation history and context with it. A handoff can change the [harness](/docs/agents/concepts/agent-harnesses.md), execution environment, or agent role. Use handoff when another configuration is a better fit for the next part of the task.

Common handoffs include:

* **Harness to harness**: continue a Copilot session with Claude or Codex to use provider-specific capabilities.
* **Plan to implementation**: use the [Plan agent](/docs/agents/run/planning.md) to produce a reviewed plan, then hand off to an implementation agent.
* **Continue in the cloud**: hand off a well-scoped task to the [Cloud target](/docs/agents/run/agent-harnesses.md#start-a-cloud-session) for remote execution and a pull request workflow.

Learn how to [hand off an ongoing session](/docs/agents/run/agent-harnesses.md#hand-off-a-session).

## Remote and synced sessions

A session doesn't have to run on your local machine, and it doesn't have to stay on one device:

* **Remote sessions** run on a machine other than the one you work from. You can connect the {% data variables.copilot.agents_window %} to a remote host over SSH or a dev tunnel, or use Copilot remote control (`/remote on`) to monitor and steer a running Copilot session from GitHub. Learn more about [connecting to a remote machine](/docs/agents/run/remote-agent-sessions.md) and [remote control for Copilot sessions](/docs/agents/run/agent-harnesses.md#remote-control-copilot-sessions).
* **Synced sessions** are backed up to your GitHub account so you can access them across devices. Learn more about [syncing sessions](/docs/agents/run/sessions/session-history.md).
* **Session insights** let you query your session history to review what you worked on. Learn more about [session insights](/docs/agents/run/sessions/session-history.md#query-session-history-with-chronicle).

## Related resources

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Agent harnesses](/docs/agents/concepts/agent-harnesses.md)
* [Agents](/docs/agents/concepts/agents.md)
* [{% data variables.product.prodname_vscode_shortname %} Agent Host architecture](/docs/agents/concepts/agent-host.md)
