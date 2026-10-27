---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 10/28/2026
MetaDescription: Find, continue, organize, and finish agent sessions in {% data variables.product.prodname_vscode_shortname %} without losing track of ongoing work.
---
# Manage agent sessions in {% data variables.product.prodname_vscode_shortname %}

Use the sessions list to return to an agent task, monitor ongoing work, and put completed work away. This article shows how to manage sessions in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

A [session](/docs/agents/concepts/sessions.md) groups the workspace, code changes, and conversations for a task. Each conversation has its own history and context. If you're starting your first task, follow the [agents quickstart](/docs/agents/quickstart.md).

## Find and resume a session

Open an existing session to continue its conversation rather than start the task again.

1. Open the sessions list in the interface you use:

    | Interface | Location and scope |
    |---|---|
    | {% data variables.copilot.chat_view %} | The list is at the top of the view and shows sessions for the current workspace, grouped by time. With no workspace open, it shows sessions across workspaces. |
    | {% data variables.copilot.agents_window %} | The list is in the left sidebar and shows sessions across workspaces. Sessions are grouped by workspace by default. |

1. Select the session to open its conversation.

1. If your session is completed, it may not appear in the active sessions list. Change the list filter from active sessions to **Archived** ({% data variables.copilot.chat_view %}) or **Done** ({% data variables.copilot.agents_window %}).

1. Review the previous messages and changes before sending a follow-up. For an archived session, [restore it first](#archive-sessions).

If the list isn't visible in the {% data variables.copilot.chat_view %}, right-click in an empty chat and select **Show Sessions**. For display options, see [sessions list layout](/docs/agents/run/chat-view.md#sessions-list-layout).

### Find a missing session

Check these items before creating a replacement session:

* **Workspace and host**: Open the original workspace or connect to the host where the session runs. The {% data variables.copilot.agents_window %} lets you browse across workspaces.
* **State filters**: Include **Archived** or **Done** sessions, not only active sessions.
* **Other applications**: Check the [External filter and discovery limits](#view-sessions-from-other-applications).
* **Supported interface**: Local harness sessions and sessions from the {% data variables.product.prodname_openai_codex %} extension are editor-only. Check [which sessions support both interfaces](/docs/agents/concepts/sessions.md#sessions-across-surfaces).

To find earlier work by topic, file, or pull request instead of browsing the list, [query session history](/docs/agents/run/sessions/session-history.md#query-session-history-with-chronicle). Synced history doesn't by itself provide access to a running agent.

### Continue between the Chat view and Agents window

Supported {% data variables.product.prodname_copilot_short %} and {% data variables.product.prodname_anthropic_claude_short %} sessions are available in both interfaces. {% data variables.product.prodname_openai_codex_short %} requires the [experimental Agent Host integration](/docs/agents/run/agent-harnesses.md#codex). Switching interfaces doesn't change the session's harness, workspace, or worktree.

For a {% data variables.product.prodname_copilot_short %} session with a project:

* **From the {% data variables.copilot.agents_window %}**: Select **Open in Editor** in the title bar. The editor opens the project with the session available in the {% data variables.copilot.chat_view %}.
* **From the {% data variables.copilot.chat_view %}**: Select **Open in Agents** in the application title bar, then select the existing session from the sessions list.

To change the harness instead, see [Continue with a different harness](/docs/agents/run/agent-harnesses.md#continue-with-a-different-harness).

> [!NOTE]
> {% data variables.product.prodname_anthropic_claude_short %} and {% data variables.product.prodname_openai_codex_short %} harnesses are disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability). Existing sessions aren't deleted. Contact the IT team that deployed the settings to discuss access.

### View sessions from other applications

You can open supported local sessions from {% data variables.copilot.copilot_cli_short %}, the {% data variables.copilot.github_copilot_app %}, Claude Code, and {% data variables.product.prodname_openai_codex_short %} in either interface.

Open the sessions list filter and select **External** to choose which discovered sessions appear:

| Filter | Sessions shown |
|---|---|
| **None** | No external sessions. |
| **Recent** | Up to two most recently updated external sessions from the last seven days. At startup, sessions older than the second-most-recently updated local session are hidden. |
| **Last 24 Hours** | Sessions updated within the last 24 hours. |
| **Last 7 Days** (default) | Sessions updated within the last seven days. |
| **Last 30 Days** | Sessions updated within the last 30 days. |

The filter applies to both interfaces and is also configurable with `setting(chat.agentSessions.showExternal)` (Experimental). Discovery has separate limits: {% data variables.product.prodname_copilot_short %} only considers supported local sessions updated within the last seven days, even if you select **Last 30 Days**.

When you open an external session in the {% data variables.copilot.agents_window %}, a one-time banner identifies its origin and lets you choose which external sessions to show. If that choice hides the open session, you're asked to confirm it. After you send a message from {% data variables.product.prodname_vscode_shortname %}, the session is no longer external and the **External** filter no longer controls its visibility.

For an external {% data variables.product.prodname_openai_codex_short %} session, only one application can write to the chat at a time. If **This chat is open in another app** appears, fully quit the other application and select **Retry**. The transcript, draft, and attachments remain available while sending, queueing, and resending are blocked. Retry doesn't send the draft. Send it yourself after the banner disappears.

### Use {% data variables.copilot.copilot_cli_short %} from the terminal

If the session's context menu includes **Resume in Terminal**, select it to continue in {% data variables.copilot.copilot_cli %}. Not every harness or session type provides this action. Otherwise, continue in a supported {% data variables.product.prodname_vscode_shortname %} interface.

To begin a separate terminal conversation, [start a new CLI session](/docs/agents/run/chat-view.md#start-a-copilot-cli-session). Starting a new CLI session doesn't resume an existing conversation.

### Continue on another device or in the cloud

| Where the session runs | How to continue |
|---|---|
| A remote host | Use [GitHub Environments (Preview), SSH, or dev tunnels](/docs/agents/run/remote-agent-sessions.md#choose-how-to-connect), then open the existing session. The host must remain running and reachable. |
| A cloud sandbox (Experimental) | [Reconnect to the existing cloud session](/docs/agents/run/cloud-sandbox-sessions.md#continue-an-existing-cloud-session). Execution stays in the managed environment. |

To move from local work to cloud execution, [start a separate cloud sandbox session](/docs/agents/run/cloud-sandbox-sessions.md#start-a-cloud-sandbox-session).

## Start a new or related conversation

Choose a conversation based on whether you need the discussion so far:

| Your goal | Action |
|---|---|
| Continue the same task | [Resume the existing conversation](#find-and-resume-a-session). |
| Start related work with fresh context | [Create a nested session](#run-multiple-chats-in-a-session), where supported. |
| Explore another approach using the discussion so far | [Fork the conversation](#fork-a-chat-session). |
| Ask a question without adding it to the main conversation | [Start a side chat](#ask-side-questions), where supported. |
| Begin unrelated work | [Start a new session](#start-an-agent-session). |

> [!IMPORTANT]
> Separate conversations don't isolate file changes. Conversations using the same folder or worktree can edit the same files. Choose **New Worktree** for a nested or top-level session, where supported, when changes must stay separate.

### Start an agent session

For an independent task, follow the steps to start a session in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md#start-a-session) beside your editor, or in the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session) across workspaces. Choose the workspace, harness, and code isolation before sending the first prompt.

On Windows, you can also open the {% data variables.copilot.agents_window %} by right-clicking the {% data variables.product.prodname_vscode_shortname %} taskbar icon and selecting **Agents Window**.

### Run multiple chats in a session

A nested session is a separate, interactive conversation grouped under an existing session. It starts blank, without the other chats' history, and uses the parent's harness and host. The harness must support multiple chats, and the parent session must not be archived.

With a harness that provides [session-management tools](/docs/agents/run/tools.md#coordinate-work-across-sessions), ask the agent to start a separate chat within the ongoing session. This works in both the {% data variables.copilot.chat_view %} and the {% data variables.copilot.agents_window %}. For example:

```prompt
Start a separate chat within this session to review the authentication flow. Reuse the current workspace and do not modify files.
```

Alternatively, use the controls in the {% data variables.copilot.agents_window %}:

1. Hover over the parent session and select **+** (**New Nested Session**), use its context menu, or press `kb(sessions.chatCompositeBar.addChat)` while the session has focus.

    <!-- TODO: Replace the outdated agents-window-new-subsession.png screenshot with one showing New Nested Session and the composer's folder and isolation controls. -->

1. Choose the working folder above the input:

    * Keep the preselected folder to share the parent's folder or worktree.
    * Select a recent folder or **Open Folder...** to use another folder.
    * Select **No Workspace** for a separate temporary folder. This is preselected for quick chats. Temporary files aren't shared between workspace-less chats.

    Harnesses supporting only one folder limit the choice to the parent's folder, or **No Workspace** for a quick chat.

1. For a Git folder, select **Branch** to work directly in the folder, or **New Worktree** and a base branch to isolate changes. Plain folders and **No Workspace** don't offer these controls.

1. Enter a prompt and press `kbstyle(Enter)`. The nested session appears beneath its parent in the list.

Each chat has its own title, history, and agent or model selection. For a hands-on workflow with isolated changes, follow [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md).

### Fork a chat session

A fork retains the source conversation's history so you can explore an alternative without losing the original discussion. Type `/fork` to copy the full conversation, or hover over an earlier request and select **Fork Conversation** to include only the requests through that checkpoint.

![Screenshot showing the Fork Conversation button in the checkpoint toolbar in the {% data variables.copilot.chat_view %}.](../../images/chat-checkpoints/chat-fork-conversation.png)

In multi-chat {% data variables.product.prodname_copilot_short %} sessions in the {% data variables.copilot.agents_window %}, the fork opens as a nested session. In single-chat sessions and harnesses without multiple-chat support, it opens as a separate session. A {% data variables.product.prodname_copilot_short %} worktree session's fork uses the original worktree, so forking doesn't isolate code changes.

Supported Agent Host sessions, such as {% data variables.product.prodname_copilot_short %}, also accept these forms in either interface:

| Command | Result |
|---|---|
| `/fork <title>` | Name the fork without sending a prompt. |
| `/fork prompt <prompt>` | Fork and immediately send the prompt and attached context. |

For example:

```prompt
/fork prompt Compare this design with an event-driven approach. Do not change any files.
```

A prompted fork uses the source conversation's agent and model, not new input-picker selections. An explicit title is retained. Otherwise, the fork can receive an automatically generated title based on the original title and new prompt.

### Ask side questions

When asking about a specific part of a response, choose whether to keep the follow-up in the current conversation or start a side chat. Side chats are available in supported {% data variables.product.prodname_copilot_short %} and {% data variables.product.prodname_anthropic_claude_short %} sessions in both interfaces.

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

Select text in an agent response to open the selection menu (Experimental), then choose:

* **Quote**: Append the selected text as a Markdown block quote to the current chat input, preserving any existing draft. Add your question and send it to continue in the same conversation. Selecting **Quote** doesn't automatically send a message.
* **Ask in a Side Chat**: Enter your question in **Ask Question** and press `kbstyle(Enter)`. A new side chat opens beside the source conversation with the selected fragment as context.

If the selection shows **Ask Question** directly, enter the question there to start a side chat. The `setting(chat.agentSessions.responseSelectionMenu.enabled)` setting controls whether the selection menu appears and is on by default.

<!-- TODO: Replace agents-window-side-chat.png with a screenshot showing selected response text and the Ask in a Side Chat and Quote menu actions. -->

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

Select text in an agent response, right-click it, and select **Ask in Side Chat...**. Enter your question in **Ask Question** and press `kbstyle(Enter)`. The side chat opens in an adjacent editor. Unlike the {% data variables.copilot.agents_window %}, selecting text doesn't automatically open a menu.

{% /tab %}
{% /tabs %}

In either interface, you can also type `/btw <question>` to start a side chat from the latest turn, including a response in progress, without selecting a fragment.

A side chat inherits the source conversation's agent, model, and context through the source turn. Inherited messages aren't shown in its transcript. The question and answer stay in the side chat rather than the source conversation. Side chats favor explanation unless you ask for changes or actions.

Side chats aren't available for Local harness sessions or sessions from the {% data variables.product.prodname_openai_codex %} extension.

## Monitor progress and switch conversations

Use the sessions list to check session status, harness, and file changes. Select a session to inspect its response or provide input. Before integrating its work, [review the code edits and validate the result](/docs/agents/run/review-code-edits.md).

For sessions with multiple chats, progress and unread indicators belong to each chat. The session remains in progress while any chat is working, and the session header **Changes** pill combines their edits.

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

Select a nested session in the list or, in the **Multiple** presentation, select its chat tab. Use the **Chats** dropdown to show or hide chats. To reopen the last closed chat, press `kb(sessions.chatCompositeBar.reopenLastClosedChat)`.

To rename a chat, select **Rename** from its tab's context menu. Chat titles are independent of the session title.

To keep conversations visible together, [arrange chat tabs in split groups](/docs/agents/run/agents-window-configuration.md#arrange-chat-tabs-and-groups). For separate top-level sessions, [arrange sessions in a grid](/docs/agents/run/agents-window.md#arrange-sessions-in-a-grid).

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

Show the sessions list in the [side-by-side layout](/docs/agents/run/chat-view.md#sessions-list-layout), expand the main chat row, and select a nested session. Select the main row to return to the main conversation. Each chat retains its messages and unsent draft when you switch.

Right-click a nested session and select **Open as Editor** for an editor tab, or **Open to the Side** for another editor group.

<!-- TODO: Add a screenshot showing the editor's Sessions view with an expanded main chat, two nested sessions, and the selected nested session's conversation in the Chat view. -->

Side chats also appear beneath their parent in the sessions list. Use the {% data variables.copilot.agents_window %} to view [read-only subagent chats](/docs/agents/run/subagents.md#agents-window).

{% /tab %}
{% /tabs %}

For optional ways to keep track of work, configure [application icon badges (Preview)](/docs/agents/run/agents-window-configuration.md#monitor-sessions-from-the-application-icon-preview), the [title-bar status indicator (Experimental)](/docs/agents/run/chat-view.md#session-status-indicator-experimental), or the [sessions welcome page](/docs/agents/run/chat-view.md#view-sessions-on-the-welcome-page).

To have an agent create sessions, read another conversation's context, or send follow-up messages, see [Coordinate work across sessions with tools](/docs/agents/run/tools.md#coordinate-work-across-sessions).

## Keep long conversations focused

The context window control in the chat input shows how much context the active chat uses. Hover over it for token counts, a category breakdown, and the session's total AI credits. Available context depends on the model.

![Screenshot showing the context window usage control in the {% data variables.copilot.chat_view %} input.](../../../chat/images/copilot-chat/chat-context-window-control.png)

### Compact conversation context

Compaction summarizes earlier history to free context space and reduce tokens sent with subsequent requests. Conversations compact automatically when the context window fills. To turn this off, set `setting(github.copilot.chat.summarizeAgentConversationHistory.enabled)` to `false`.

For manual compaction in Local, {% data variables.product.prodname_copilot_short %}, or {% data variables.product.prodname_anthropic_claude_short %} sessions:

* Type `/compact`, optionally adding what to retain, such as `/compact focus on the database schema decisions`.
* Select the context window control, then **Compact Conversation**.

For a fresh conversation instead of a summary, [start a nested session or a new session](#start-a-new-or-related-conversation). Neither clears saved files, custom instructions, or persistent memory. To undo code changes, [review and revert them](/docs/agents/run/review-code-edits.md).

Stable context and forks can preserve prompt caching to reduce cost and latency. Learn about [AI credit usage](/docs/agents/guides/optimize-usage.md) and use the [Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) to investigate cache hits.

## Organize sessions

Hover over a session to pin it at the top of the list. Right-click it for additional actions, which depend on its harness and state. In the {% data variables.copilot.agents_window %}, you can also group sessions by workspace or timeframe and collapse group headers.

### Create a custom group

In the {% data variables.copilot.agents_window %}, group related top-level sessions and [quick chats](/docs/agents/run/agents-window.md#start-a-quick-chat), including work across projects:

1. Right-click a session, quick chat, or empty area of the list and select **Create Group**.
1. Enter a name and press `kbstyle(Enter)`.
1. Right-click another session and select **Add to Group** > your group, or **Move to Group** if it already belongs to one.

You can also drag multiple selected sessions into a group. Create subgroups with **Create Subgroup**, or drag a group into another group. Drag sessions and group or workspace headers to reorder them, or drop a session on **Pinned** to pin it.

Hover over a group header to start a session in that group or mark its sessions as done. Custom groups organize top-level sessions, not individual nested sessions.

To distinguish groups visually, [set a custom group icon and color](/docs/agents/run/agents-window-configuration.md#set-a-group-icon-and-color).

### Move chats between sessions (Experimental)

Enable `setting(chat.agentHost.moveChats.enabled)` in the {% data variables.copilot.agents_window %} to reorganize conversations. It is on by default in Insiders.

> [!NOTE]
> These moves change how conversations are grouped, not where they work. History and working folders are preserved, including worktrees and temporary folders. Conversations sharing a worktree still share file changes after a move or promotion.

**Reorder nested sessions:** Select **Filter Sessions** > **Ordering** > **Created** to retain a manual order. Drag a nested session above or below a sibling, or use **Move Up** and **Move Down** in its context menu. With the row focused, use `kb(sessionsViewPane.moveChatUp)` or `kb(sessionsViewPane.moveChatDown)`. Available commands depend on the row's position, and the order persists after reopening the window.

**Move or promote a conversation:**

* Drop a nested session on another session to append it, or on the top or bottom half of a nested row to insert it there. Hover over a collapsed destination to expand it.
* Select **Promote to Session** from a nested session's context menu, or drag it to empty space below the list or a section header. Send at least one prompt before promoting it.
* Drag a top-level session containing only one chat onto the center of another session, or above or below one of its nested rows, to nest it.

Source and destination must use the same harness and host, the destination must support multiple chats, and neither session can be archived. In **Pinned** and custom groups, dropping near a top-level row's top edge can reorder it instead of nesting it. An insertion line indicates reordering, and a highlighted destination indicates nesting.

Promotion inherits the parent's custom group, but not its pinned state. A workspace-less conversation promoted to a top-level session appears in **Chats**.

Moves don't ask for confirmation. A notice shows progress and the result. Select **Undo** within 10 seconds to restore the previous parent and position. A streaming response continues after a move. Linked subagent conversations, pull requests, and [{% data variables.copilot.agent_merge %} monitoring](/docs/agents/run/agents-window.md#finish-a-pull-request-with-agent-merge) stay with the conversation, including after undo.

To change working files rather than grouping, [move the chat to another folder or worktree](#move-a-chat-to-another-folder-or-worktree).

## Finish and restore sessions

Choose the action that matches what you want to keep:

| Action | Effect |
|---|---|
| Close a chat tab | Hide the conversation without deleting it. Reopen it when needed. |
| Archive or mark as done | Remove completed work from the active list while retaining its conversation. Worktree or container resources can be removed as described below. |
| Delete | Permanently remove the conversation. Associated worktrees or containers can also be removed. |

### Archive sessions

1. Hover over the session and select **Archive** ({% data variables.copilot.chat_view %}) or **Mark as Done** ({% data variables.copilot.agents_window %}).

1. To find it later, select the **Archived** or **Done** list filter.

1. To continue, right-click the session and select **Unarchive** ({% data variables.copilot.chat_view %}) or **Restore** ({% data variables.copilot.agents_window %}).

![Screenshot showing the archive action for an agent session in the sessions list.](../../images/agents-overview/agent-sessions-archive.png)

For a worktree session, archiving commits uncommitted changes to the session branch before removing the worktree folder. If changes can't be preserved or the folder can't be removed, the worktree remains. The branch and commits are retained, so restoring re-creates the worktree.

For a [Dev Container session](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container), marking done removes the container without waiting for idle shutdown, but only if no other session or unsent draft uses it. Restoring starts a replacement container and retains the conversation.

> [!NOTE]
> A Local session automatically archived by [enterprise runtime policy enforcement](/docs/enterprise/manage-ai-settings.md#runtime-policies-and-harness-selection) remains read-only while the policy applies. Continue in its replacement {% data variables.product.prodname_copilot_short %} session instead.

### Mark an individual chat as done

In the {% data variables.copilot.agents_window %}, expand the parent session, right-click an additional chat, and select **Mark as Done**. This hides it from the active list and closes its tab without affecting the parent or other chats. Its title and transcript are preserved after reload.

To restore it, select the global **Done** filter or right-click the parent and select **Show Done Chats**. Right-click the done chat and select **Restore**.

Main chats, side chats, and subagent chats can't be marked done independently.

### Delete sessions

> [!CAUTION]
> Deletion is permanent. Integrate or commit worktree changes first: uncommitted files that exist only in a removed worktree can be lost. To hide a session without deleting it, archive it instead.

Right-click a session and select **Delete**. For {% data variables.product.prodname_copilot_short %} harness sessions, this also removes associated worktrees created for the session. A shared worktree remains while another session still uses it and is removed only after the last linked session is deleted or archived.

For Dev Container sessions, deletion removes the container only when no other session or unsent draft uses it, even if automatic idle shutdown is off.

To delete an individual chat in the {% data variables.copilot.agents_window %} **Multiple** presentation, select **Delete Chat** in its tab's context menu, or press `kb(sessions.chatCompositeBar.deleteChat)` while it has focus.

### Clean up session worktrees

Run **Chat: Open Worktree Cleanup** to reclaim disk space from inactive session worktrees.

![Screenshot showing the worktree cleanup editor with cleanup settings, an inactivity filter, and selected session worktrees with their storage sizes.](../../images/chat-sessions/worktree-cleanup-editor.png)

1. Choose an inactivity period of 7, 15, 30, 60, or 90 days.
1. Review estimated worktree sizes and clear any selected worktrees you want to keep. Eligible worktrees are selected by default.
1. Save open file edits in the selected worktrees, then confirm cleanup.

Cleanup marks the sessions done and schedules their worktrees for removal. As with manual archiving, it commits uncommitted changes first and retains the session and branch history for restoration. If preservation or removal fails, the worktree remains.

The editor excludes sessions that are active, running, waiting for input, pinned, done, archived, untitled, in error, or newer than the inactivity threshold. Worktrees whose size can't be measured are also excluded.

Open **Cleanup Settings** to configure automatic completion, deletion retention, or storage suggestions.

**Storage suggestions (Experimental):** Enable `setting(chat.agentSessions.sessionStorageCleanupSuggestion.enabled)` for a suggestion in the {% data variables.copilot.agents_window %} when inactive worktrees use at least 5 GiB or 20 worktrees qualify. Selecting it opens the cleanup editor. Dismiss it for the current window, or select **Don't Show Again** or run **Chat: Disable Session Storage Cleanup Suggestions** to turn it off.

### Automatically clean up merged sessions

`feature(automatic-session-cleanup)`

For {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_anthropic_claude_short %}, and the [experimental {% data variables.product.prodname_openai_codex_short %} integration](/docs/agents/run/agent-harnesses.md#codex), configure two separate inactivity periods. Both default to `0` (off). Use positive whole numbers of days, with `15` recommended:

* `setting(chat.agentSessions.autoMarkAsDoneMergedSessionsAfterDays)`: Days before an eligible session is automatically marked done.
* `setting(chat.agentSessions.autoDeleteMarkedAsDoneMergedSessionsAfterDays)`: Grace period after automatic completion before permanent deletion.

Eligible sessions aren't in progress, exceed the inactivity threshold, have at least one merged pull request, and have no related open pull requests. External sessions aren't eligible. Checks run at startup and hourly while either setting is on.

Only automatically completed sessions qualify for automatic deletion. Manually completed sessions don't qualify. Restoring an automatically completed session clears its deletion eligibility.

Unlike manual archiving, automatic cleanup removes a worktree only if its branch tracks an upstream and has no outgoing commits or uncommitted changes. Unknown Git state or unmet conditions retain the worktree. It is never force-removed.

When a merged pull request makes a session eligible, **Configure Automatic Cleanup** in the **Mark as Done** suggestion opens both settings without turning them on.

To retain or share conversation content separately, [export a chat as JSON or copy messages as Markdown](/docs/agents/run/sessions/session-history.md#export-or-copy-a-conversation). Review the contents before sharing.

## Move a chat to another folder or worktree

In the {% data variables.copilot.agents_window %}, continue a task in another folder or a new worktree without losing its conversation history. This requires a single-chat Agent Host session with one local folder. Use the {% data variables.product.prodname_copilot_short %} harness, or [{% data variables.product.prodname_openai_codex_short %} (Experimental)](/docs/agents/run/agent-harnesses.md#codex) in Interactive mode.

Ask the agent to move the chat. There isn't a separate move button:

```prompt
Move this chat to <absolute folder path> and continue the current task there.
```

The destination must be on the same host. To isolate implementation before making changes, request a new worktree instead:

```prompt
Continue this task in a new Git worktree of the current repository before implementing it.
```

Confirm the destination and whether to use it directly or create a worktree. Review tool approvals and Workspace Trust requests. The agent finishes its turn and moves the chat. Wait for the workspace-change notice and automatic continuation before sending more prompts.

A folder move uses the destination's existing files, without moving or copying the original files. A new worktree starts from committed Git state and requires at least one commit. Uncommitted changes stay in the original folder, except files copied by configured worktree include rules. See [code isolation prerequisites and file-copy behavior](/docs/agents/run/agent-harnesses.md#choose-code-isolation).

## Related resources

* [Understand sessions and chats](/docs/agents/concepts/sessions.md)
* [Use chat to send and steer requests](/docs/chat/chat-overview.md)
* [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md)
