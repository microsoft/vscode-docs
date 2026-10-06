---
ContentId: c4a81e63-9d27-4b5f-8e10-2a7f6c9d3b04
DateApproved: 10/7/2026
MetaDescription: Understand sessions and chats in {% data variables.product.prodname_vscode_shortname %}, and choose when to start a chat, fork, or create a session.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- sessions
- chats
- handoff
- fork
- context window
- {% data variables.copilot.agents_window %}
---

# Understand sessions and chats

A session is the unit of work with an agent in {% data variables.product.prodname_vscode %}. It brings together the workspace and code changes for a task. A chat is a conversation within that session, and a session can contain multiple chats when the harness supports them.

This article helps you choose between starting a new chat, forking a conversation, and creating a new session. It explains what chats share, how to finish individual conversations, and how to continue work across surfaces or hand it off to another agent.

To create and organize sessions, see [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md).

## What is a session?

A session contains one or more chats. Each chat records your prompts, the agent's responses, the tool calls it makes, and the [context](/docs/agents/concepts/context.md) it accumulates along the way. Its conversation history contributes to the language model's [context window](/docs/agents/concepts/language-models.md#context-window) and isn't automatically shared with other chats or sessions.

Use a session to organize related conversations, follow their progress, and review their combined results.

The session's [execution environment](/docs/agents/concepts/agent-harnesses.md#relate-execution-environments-and-code-isolation) determines where it works on code. An Agent Host session can use a workspace on your machine, a connected host, or inside a Dev Container on either host, depending on the available harness. A container changes the development environment, not how the session organizes the conversation and task.

## Chats within a session

A session can contain more than one chat. Each chat is an independent conversation with its own history, title, status, and agent or model selection, but all chats in a session share the same workspace and code isolation. A new chat starts blank and doesn't inherit the conversation history of the other chats in the session.

The session has a main chat. Additional interactive conversations are called **peer chats**. You can prompt each peer chat independently. This differs from a [subagent](/docs/agents/run/subagents.md), which an agent starts to perform delegated work.

Running several chats in one session lets you work on related tasks against the same codebase at the same time without switching sessions. This capability runs on the [Agent Host](/docs/agents/concepts/agent-host.md) and is available for harnesses that support it, such as Copilot and Claude. Learn how to [run multiple chats in a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session).

For example, you're adding a sign-in form. Use one chat to build the form and another chat in the same session to write tests. The test-writing chat can read the implementation files once they're saved, but it doesn't inherit the first chat's conversation. Include requirements such as rejecting an empty email address in the second chat's prompt, rather than relying on your earlier discussion.

Both chats can edit the same files. When you need separate working directories, use separate sessions with [worktree isolation](/docs/agents/run/agent-harnesses.md#choose-code-isolation), where available.

## Choose a new chat, a fork, or a new session

Continue in the same chat when you're working on the same task and its conversation history is still relevant. When you need a separate conversation, choose based on whether you want to retain that history and share the same workspace.

| Choose | When to use it | Conversation history | Workspace and code changes |
|--------|----------------|----------------------|----------------------------|
| [New chat in the same session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session) | Work on a related task with a fresh conversation, such as writing tests for the feature another chat is implementing. | Starts without the other chats' history. | Shares the session's workspace and worktree. |
| [Fork a conversation](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session) | Explore an alternative approach while retaining the requirements and discussion so far. | Inherits the source conversation up to the fork point. The original conversation remains available. | Can share the original session and worktree. Forking doesn't guarantee separate code changes. |
| [New session](/docs/agents/run/sessions/manage-sessions.md#start-an-agent-session) | Start an unrelated task, work in another project, or choose a separate execution environment or worktree. | Starts without the previous chat's history. | Uses the folder or worktree selected for the new session. |

A fork can open as another chat in the same session or as a new session, depending on the harness. Forking a conversation isn't the same as creating a Git branch or a separate worktree. For example, a fork of a Copilot worktree session continues to use the original worktree.

> [!IMPORTANT]
> Separate conversations don't guarantee separate files. If two chats or sessions use the same folder or worktree, their edits affect the same files. Use separate sessions with [worktree isolation](/docs/agents/run/agent-harnesses.md#choose-code-isolation), where available, when changes must stay separate.

Sessions can run in parallel and keep running when you switch between them. To return an existing conversation and affected workspace files to an earlier point instead of branching the conversation, see [Restore a checkpoint](/docs/agents/run/review-code-edits.md#restore-a-checkpoint).

## Sessions across surfaces

You can continue a supported Agent Host session in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) or the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). Switching windows doesn't create a session, fork the conversation, or change its harness, workspace, or worktree.

Both interfaces provide access to the session's main chat and interactive peer chats, but their navigation and management controls differ. For the steps in each interface, see [Run multiple chats in a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session).

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

## Close a chat or finish work

Closing, marking done, and deleting serve different purposes:

* **Close a chat tab**: hide the chat from the chat area without deleting its conversation. You can reopen it later.
* **Mark a chat as done**: remove a completed conversation from the active sessions list while retaining its title and history. Restore it when you want to continue.
* **Delete a chat**: permanently remove the conversation. Unlike closing or marking done, deletion can't be undone.

In the {% data variables.copilot.agents_window %}, supported additional chats can be marked as done independently. This doesn't mark the main chat, other chats, or the owning session as done. Main chats, side chats, and subagent chats don't support being marked as done independently.

For the steps and available actions, see [Manage chats within a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session) and [Mark an individual chat as done](/docs/agents/run/sessions/manage-sessions.md#mark-an-individual-chat-as-done).

## Related resources

* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Agent harnesses](/docs/agents/concepts/agent-harnesses.md)
* [Agents](/docs/agents/concepts/agents.md)
* [{% data variables.product.prodname_vscode_shortname %} Agent Host architecture](/docs/agents/concepts/agent-host.md)
