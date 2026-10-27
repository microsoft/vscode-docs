---
ContentId: c4a81e63-9d27-4b5f-8e10-2a7f6c9d3b04
DateApproved: 10/28/2026
MetaDescription: Understand sessions and chats in {% data variables.product.prodname_vscode_shortname %}, and choose when to start a chat, fork, or create a session.
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

The session's [execution environment](/docs/agents/concepts/agent-harnesses.md#relate-execution-environments-and-code-isolation) determines where it works on code. Depending on the harness, a session can use a workspace on your machine or a connected host. It can also work inside a Dev Container in either location. A container changes the development environment, not how the session organizes the conversation and task.

## Chats within a session

The session has a main chat. A **nested session** is a separate conversation grouped under an existing session. You can prompt each nested session independently. This differs from a [subagent](/docs/agents/run/subagents.md), which an agent starts to perform delegated work.

Each conversation has its own history, title, status, and agent or model selection. Nested sessions use the parent session's folder or worktree by default. In the {% data variables.copilot.agents_window %}, supported harnesses let a nested session use another folder, its own worktree, or no workspace. A new nested session starts blank and doesn't inherit the conversation history of the other chats in the parent session.

Running several chats in one session lets you work on related tasks against the same codebase at the same time without switching sessions. Learn how to [run multiple chats in a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session).

For example, you're adding a sign-in form. Use one chat to build the form and another chat in the same session to write tests. The test-writing chat can read the implementation files once they're saved, but it doesn't inherit the first chat's conversation. Include requirements such as rejecting an empty email address in the second chat's prompt, rather than relying on your earlier discussion.

Both chats can edit the same files if they use the same folder or worktree. When you need separate working directories, choose **New Worktree** for a nested session, where supported, or use separate top-level sessions with [worktree isolation](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes).

You can also [move nested sessions](/docs/agents/run/sessions/manage-sessions.md#move-chats-between-sessions-experimental) to organize related work. A move changes which session groups the conversation, not the folder or worktree where it runs.

## Choose a new chat, a fork, or a new session

Continue in the same chat when you're working on the same task and its conversation history is still relevant. When you need a separate conversation, choose based on whether you want to retain that history and share the same workspace.

If the task needs another folder or a new Git worktree, you don't have to start a new conversation. In supported single-chat sessions in the {% data variables.copilot.agents_window %}, you can [move the existing chat](/docs/agents/run/sessions/manage-sessions.md#move-a-chat-to-another-folder-or-worktree) and continue with its conversation history intact.

| Choose | When to use it | Conversation history | Workspace and code changes |
|--------|----------------|----------------------|----------------------------|
| [Nested session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session) | Work on a related task with a fresh conversation, such as writing tests for the feature another chat is implementing. | Starts without the other chats' history. | Uses the parent session's folder or worktree by default. Supported nested sessions can use another folder or a separate worktree. |
| [Fork a conversation](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session) | Explore an alternative approach while retaining the requirements and discussion so far. | Inherits the source conversation up to the fork point. The original conversation remains available. | Can share the original session and worktree. Forking doesn't guarantee separate code changes. |
| [New session](/docs/agents/run/sessions/manage-sessions.md#start-an-agent-session) | Start an unrelated task, work in another project, or choose a separate execution environment or worktree. | Starts without the previous chat's history. | Uses the folder or worktree selected for the new session. |

A fork can open as another chat in the same session or as a new session, depending on the harness. Forking a conversation isn't the same as creating a Git branch or a separate worktree. For example, a fork of a Copilot worktree session continues to use the original worktree.

> [!IMPORTANT]
> Separate conversations don't guarantee separate files. If two chats or sessions use the same folder or worktree, their edits affect the same files. Choose separate worktrees for nested or top-level sessions, where supported, when changes must stay separate. Learn how to [choose where an agent makes changes](/docs/agents/run/agents-window.md#choose-where-an-agent-makes-changes).

Sessions can run in parallel and keep running when you switch between them. To return an existing conversation and affected workspace files to an earlier point instead of branching the conversation, see [Restore a checkpoint](/docs/agents/run/review-code-edits.md#restore-a-checkpoint).

## Sessions across surfaces

> [!NOTE]
> Claude and Codex harnesses are disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability). Existing sessions are not deleted by this restriction. Contact the IT team that deployed the settings to discuss access.

You can access and continue the same live **Copilot** or **Claude** session in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). To use **Codex** in both interfaces, configure the [experimental Codex integration](/docs/agents/run/agent-harnesses.md#codex). Switching between these interfaces doesn't create a session, fork the conversation, or change its harness, workspace, or worktree.

Both interfaces provide access to the session's main chat and, for harnesses that support them, nested sessions. Their navigation and management controls differ. For the steps in each interface, see [Run multiple chats in a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session).

> [!NOTE]
> **For Local harness sessions:** Use the {% data variables.copilot.chat_view %} in an editor window. These sessions aren't available in the {% data variables.copilot.agents_window %}. Sessions from the OpenAI Codex extension are also editor-only.

{% data variables.product.prodname_vscode_shortname %} can also discover supported local sessions created in {% data variables.copilot.copilot_cli_short %}, the {% data variables.copilot.github_copilot_app %}, Claude Code, and Codex. A discovered session is external until you send a message from {% data variables.product.prodname_vscode_shortname %}. After you send a message, the **External** filter no longer controls whether it appears. Learn how to [view sessions from other applications](/docs/agents/run/sessions/manage-sessions.md#view-sessions-from-other-applications).

With Copilot or Claude, or with Codex through the [experimental integration](/docs/agents/run/agent-harnesses.md#codex), an agent can also coordinate work across sessions. It can list sessions, create new sessions or chats, read another session's recent context, and send follow-up messages between sessions.

## Hand off a session

Handoff continues ongoing work with a different agent configuration and carries the full conversation history and context with it. A handoff can change the [harness](/docs/agents/concepts/agent-harnesses.md), execution environment, or agent role. Use handoff when another configuration is a better fit for the next part of the task.

For example, use the [Plan agent](/docs/agents/run/planning.md) to produce a reviewed plan, then hand off to an implementation agent. To work in a [cloud session](/docs/agents/run/cloud-sandbox-sessions.md), start a separate session. Cloud sessions don't receive local-session handoffs.

> [!NOTE]
> **For Local harness sessions:** You can also use the **Session Target** dropdown to hand off an ongoing task to Copilot, Claude, or Codex. This dropdown is available only when starting the handoff from a Local harness session. The destination session uses the selected harness's tools, permissions, and models.

Learn how to [hand off an ongoing session](/docs/agents/run/agent-harnesses.md#continue-with-a-different-harness).

## Remote and synced sessions

A session doesn't have to run on your local machine, and it doesn't have to stay on one device:

* **Remote sessions** run on a machine other than the one you work from. [GitHub Environments (Preview)](/docs/agents/run/remote-agent-sessions.md#github-environments-preview) registers that machine for access across supported {% data variables.product.prodname_copilot_short %} clients. For {% data variables.product.prodname_vscode_shortname %}-specific access, connect over [SSH or a dev tunnel](/docs/agents/run/remote-agent-sessions.md#choose-how-to-connect). The host, workspace, and running session stay on the remote machine.
* **Cloud sessions** `feature(cloud-sessions)` run in managed cloud environments rather than on a machine you register. [Reopen the existing cloud session](/docs/agents/run/cloud-sandbox-sessions.md#continue-an-existing-cloud-session) to reconnect and continue work. This doesn't migrate an existing local conversation, and environment lifetime is managed by the service.
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
