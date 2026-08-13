---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 8/5/2026
MetaDescription: Create and manage agent sessions in {% data variables.product.prodname_vscode %}, including multiple chats, context compaction, organization, archiving, and forking.
MetaSocialImage: ../../../images/shared/github-copilot-social.png
---
# Manage agent sessions in {% data variables.product.prodname_vscode_shortname %}

A [session](/docs/agents/concepts/sessions.md) is the unit of work with an agent in {% data variables.product.prodname_vscode %}. It includes the sequence of prompts and responses, relevant context, and any files or resources associated with the task. This article describes how to create, organize, and manage sessions in both the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and {% data variables.copilot.copilot_cloud_agent_short %}s in {% data variables.product.prodname_vscode_shortname %}.

* [Start agent handoff tutorial](/docs/agents/agents-handoff-tutorial.md)

</div>

## Start an agent session

When you start an agent session, you begin a new conversation with the AI. Each session has its own context window and can run with a different agent harness. You can run multiple sessions in parallel, each focused on a different task or topic. Use the [sessions list](#sessions-list) to monitor and switch between sessions.

> [!TIP]
> Start a new session when you change topics to help the AI provide more relevant responses.

Depending on how you prefer to work or the task you want to accomplish, you can choose between different chat experiences in {% data variables.product.prodname_vscode_shortname %}. Each experience is optimized for different workflows, but they share the same underlying sessions to enable you to switch between them at any time.

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

The [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) is a dedicated window for orchestrating agents across multiple projects from a single place. Chat is your primary interface where you assign high-level tasks to agents. The {% data variables.copilot.agents_window %} is optimized for **agents-first workflows**.

![Screenshot of the {% data variables.copilot.agents_window %} showing the sessions list, workspace picker, and chat input.](../../images/chat-sessions/agents-window-new-session.png)

To start a new chat session in the {% data variables.copilot.agents_window %}:

1. Open the {% data variables.copilot.agents_window %} by selecting the **Open in Agents** button in the {% data variables.product.prodname_vscode_shortname %} title bar.

1. Select **New** in the sidebar to create a new session.

1. Choose the workspace or repository for the session, as the {% data variables.copilot.agents_window %} can target any of your projects.

1. Choose an agent harness from the **Session Target** control to indicate where the agent session runs and how it operates.

    The available harnesses depend on the workspace location. Learn how to [choose an agent harness](/docs/agents/run/agent-harnesses.md).

1. Optionally, select additional configuration options for the session:

    * **Agent**: determines the role or persona of the AI, such as Agent, Plan, or Ask. Learn more about [choosing an agent role](/docs/agents/run/agent-harnesses.md#choose-a-built-in-agent-role).

    * **Permission level**: controls how much autonomy the agent has over tool approvals. Learn more about [permission levels](/docs/agents/run/approvals.md#permission-levels).

    * **Language model**: determines which AI model powers the conversation. Learn more about [language models in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/language-models.md).

    In the {% data variables.copilot.agents_window %}, when you create another new session, the picker remembers the last **Agent** and **Permission level** values you selected and uses them as defaults.

1. Type your prompt and press `kb(workbench.action.chat.submit)` to submit it. The agent's response appears in the chat area, and the agent may take actions such as editing files, running commands, or asking follow-up questions.

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

The [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) is a chat panel that sits in the sidebar alongside your workspace editor tabs. Agents assist you with coding tasks, while you have full access to {% data variables.product.prodname_vscode_shortname %}'s rich coding experience. The {% data variables.copilot.chat_view %} is optimized for **code-first workflows**.

![Screenshot of opening a new chat session in the {% data variables.copilot.chat_view %} in {% data variables.product.prodname_vscode_shortname %}.](../../images/chat-sessions/new-chat-session-chat-view.png)

To start a new chat session in the {% data variables.copilot.chat_view %}:

1. Open the {% data variables.copilot.chat_view %} by selecting the **Chat** icon in the {% data variables.product.prodname_vscode_shortname %} title bar.

1. Create an empty session by selecting the **New Chat** (`+`) button.

    The session is scoped to the current workspace, so if you have a workspace open, the session is automatically linked to that workspace.

1. Choose an agent harness from the **Session Target** control to determine where the agent session runs and what capabilities it can access.

    Choose Local, Copilot, Claude, Codex, or Cloud. Learn how to [choose an agent harness](/docs/agents/run/agent-harnesses.md).

1. Optionally, select additional configuration options for the session:

    * **Agent**: determines the role or persona of the AI, such as Agent, Plan, or Ask. Learn more about [choosing an agent role](/docs/agents/run/agent-harnesses.md#choose-a-built-in-agent-role).

    * **Permission level**: controls how much autonomy the agent has over tool approvals. Learn more about [permission levels](/docs/agents/run/approvals.md#permission-levels).

    * **Language model**: determines which AI model powers the conversation. Learn more about [language models in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/language-models.md).

1. Type your prompt and press `kb(workbench.action.chat.submit)` to submit it. The agent's response appears in the chat area, and the agent may take actions such as editing files, running commands, or asking follow-up questions.

{% /tab %}
{% /tabs %}

## Manage session context

The context window control in the chat input shows how much of the model's context window the session is using. Hover over the control to see the token count, a usage breakdown by category, and the total AI credits consumed by the session.

![Screenshot of {% data variables.product.prodname_vscode_shortname %} {% data variables.copilot.chat_view %}, showing the context window usage control in the chat input box.](../../../chat/images/copilot-chat/chat-context-window-control.png)

As the conversation grows, the control updates to reflect increasing context usage. The available context depends on the selected model.

How context changes across turns also affects prompt caching. Stable context lets the model provider reuse tokens from earlier requests, which lowers cost and latency. Use the [Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) to check your cache hit rate.

### Compact conversation context

Context compaction summarizes earlier conversation history to free space in the context window. Compaction lets you continue the same session with less irrelevant history and reduces the tokens sent with subsequent requests.

{% data variables.product.prodname_vscode_shortname %} automatically compacts the conversation when the context window fills. To turn off automatic compaction, set `setting(github.copilot.chat.summarizeAgentConversationHistory.enabled)` to `false`.

To compact the conversation manually:

* Type `/compact` in the chat input. Optionally, add instructions for what the summary should retain, for example `/compact focus on the database schema decisions`.
* Select the context window control, and then select **Compact Conversation**.

Manual compaction is available for local, background, and Claude agent sessions. To reset the context entirely, [start a new session](#start-an-agent-session).

Learn more about [AI credit consumption](/docs/agents/guides/optimize-usage.md).

## Run multiple chats in a session

In an agent host session, you can run multiple chats as tabs in the chat area. Each chat has its own conversation, title, status, and agent or language model selection, but all chats share the session's workspace and worktree.

A new chat starts blank and doesn't inherit the history of the other chats. This is useful when you want to work on independent tasks in the same project without interrupting an ongoing chat or creating another session.

If you want to move context from the main chat to a new chat, you might opt to [fork the session](#fork-a-chat-session) instead. Forking preserves the conversation history.

To create and manage chats in a session:

1. In an active session, select **+ New Chat** in the session header, or press `kb(sessions.chatCompositeBar.addChat)`.

    ![Screenshot showing a new chat tab alongside an existing chat in the {% data variables.copilot.agents_window %}.](../../images/agents-window/agents-window-new-subsession.png)

    A blank chat opens. When the session has more than one chat, a tab strip appears in the chat area. Chats don't appear as separate items in the sessions list.

1. To add more chats, select the trailing **+** in the tab strip.

1. Type a prompt and press `kbstyle(Enter)` to start the chat.

Use the chat tabs and their context menus to:

* **Switch chats**: select a tab to show its conversation. Progress and unread indicators apply to that chat.
* **Choose an agent or model**: use the controls in each chat. Sibling chats can use different agents or models.
* **Track changes**: the session remains in progress while any chat is working. The session header **Changes** pill combines edits from all chats.
* **Rename a chat**: select **Rename** from the tab's context menu. Chat titles are independent of the session title.
* **Close or reopen a chat**: close a tab to hide it without deleting it. Use the **Conversations** dropdown to show or hide chats, or press `kb(sessions.chatCompositeBar.reopenLastClosedChat)` to reopen the most recently closed chat.
* **Delete a chat**: select **Delete Chat** from the tab's context menu, or press `kb(sessions.chatCompositeBar.deleteChat)` while the chat has focus. Deletion is permanent.

Visible and hidden chats, including their conversation history, are restored when you reload the window and reopen the session.

> [!NOTE]
> Changes from all chats in a session go to the same folder or worktree and appear together in the session changes. Start separate [worktree-isolated sessions](/docs/agents/run/agent-harnesses.md#choose-code-isolation) when tasks must not modify the same files.

## Ask side questions

Use a side chat to ask a question about the current conversation without adding the question or response to the main chat. A side chat opens as a peer chat tab and privately inherits the source conversation as context. Side chats favor explanation over action unless you ask the agent to make changes or perform a task.

Start a side chat in one of these ways:

* Type `/btw <question>` in the chat input. The side chat branches from the latest turn, including a response that is still in progress.
* Select text in a chat response, enter a question in the **Ask Question** input, and press `kbstyle(Enter)`. The selected text and its response become context for the side chat.

Each question creates a new side chat. The side chat inherits the agent and language model from the source chat, but inherited messages remain hidden from its transcript.

![Screenshot showing how to start a side chat in the {% data variables.copilot.agents_window %} from selected response text.](../../images/agents-window/agents-window-side-chat.png)

> [!NOTE]
> Side chats are available only in the {% data variables.copilot.agents_window %} for Copilot and Claude sessions. They aren't available for Codex sessions or in the {% data variables.copilot.chat_view %}.

## Sessions list

The sessions list is your central hub for managing all your chat sessions, regardless of where you started them or where they are running. The sessions list shows your sessions with information about their status, type, and file changes.

![Screenshot of the sessions list showing multiple sessions with different statuses, types, and file change stats.](../../images/chat-sessions/chat-view-sessions-list.png)

Hover over a session to see actions for pinning or [archiving](#archive-sessions) it. Right-click a session in the list to see additional actions like deleting or changing the session's state. Some actions are specific to the session's harness and state. For example, you can check out a pull request for a cloud session.

Use the pinning action to keep important sessions easily accessible at the top of your list. Pinned sessions stay at the top of the list regardless of their activity or state, so you can quickly find and return to them.

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

In the **{% data variables.copilot.agents_window %}**, the sessions list is located in the left sidebar. It shows sessions from all your workspaces, so you can monitor work across projects from a single place. Each session item surfaces key information such as session name, workspace, harness, and file change stats.

![Screenshot of the sessions list in the {% data variables.copilot.agents_window %}, showing multiple sessions with different harnesses and file change stats.](../../images/chat-sessions/agents-window-sessions-list.png)

By default, the list is filtered to only show active sessions. You can change the filter to show sessions of different states, such as completed or archived.

Sessions are grouped by workspace by default, and you can switch the grouping to organize by timeframe instead. In the {% data variables.copilot.agents_window %}, you can also create custom groups to keep related sessions together. Collapse a group header when you want to reduce the sessions list.

To organize the sessions list in the {% data variables.copilot.agents_window %}:

1. Create a custom group from the sessions list controls.

1. Drag one or more sessions onto the group. An insertion line shows where the sessions land.

1. Hover over a group header to start a new session in that group, or mark all sessions in the group as done.

You can also drag sessions up or down to reorder them, drag group and workspace headers to rearrange sections, or drop a session on the **Pinned** section to pin it. Select multiple sessions to move them together.

You can hide the left sidebar by selecting the **Toggle Sidebar** button in the top-left corner of the {% data variables.copilot.agents_window %} or by using the `kb(workbench.action.toggleSidebarVisibility)` keyboard shortcut.

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

In the **{% data variables.copilot.chat_view %}**, the sessions list is scoped to your current workspace and groups sessions by time period, such as **Today** or **Last Week**. If you don't have a workspace open, the list shows all sessions across your workspaces.

By default, the list is filtered to only show active sessions. You can change the filter to show sessions of different states, such as completed or archived.

To hide the session list from the {% data variables.copilot.chat_view %}, right-click in an empty chat and unselect **Show Sessions** or use the `setting(chat.viewSessions.enabled)` setting.

The {% data variables.copilot.chat_view %} operates in two modes: compact and side-by-side. You can manually switch between compact and side-by-side mode by using the toggle control in the top-right corner of the {% data variables.copilot.chat_view %}.

* **Compact**: The list of sessions is embedded in the {% data variables.copilot.chat_view %}. When you select a session from the list, the {% data variables.copilot.chat_view %} switches to that session. Use the back button to return to the sessions list.

* **Side-by-side**: The list of sessions is shown side-by-side with the {% data variables.copilot.chat_view %}. Select a session from the list to view its details in the {% data variables.copilot.chat_view %}. You can further configure the orientations with the `setting(chat.viewSessions.orientation)` setting.

> [!NOTE]
> Extension developers can learn how to integrate with the sessions view by using the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

{% /tab %}
{% /tabs %}

## Archive sessions

To keep the sessions list organized, archive or mark sessions as done when they're completed or you no longer need them. Archiving a session does not delete it. At any time, you can unarchive a session to restore it to the active sessions list.

When you archive (or mark as done) a session, its status changes so it moves out of the active sessions list. For a worktree session, {% data variables.product.prodname_vscode_shortname %} commits uncommitted changes to the session branch before it removes the worktree folder. If {% data variables.product.prodname_vscode_shortname %} can't preserve the changes or remove the worktree, the worktree remains. The branch and its commits are preserved, so restoring the session re-creates the worktree from that branch.

To archive a session, hover over the session in the sessions list and select the **Archive** ({% data variables.copilot.chat_view %}) or **Mark as Done** (Agents Window) option.

![Screenshot of archiving an agent session in the sessions view.](../../images/agents-overview/agent-sessions-archive-v2.png)

To view your archived sessions, use the filter options in the sessions list and select the **Archived** ({% data variables.copilot.chat_view %}) or **Done** (Agents Window) filter.

## Delete sessions

To permanently delete a session, right-click the session in the sessions list and select **Delete**. Deleting a session removes it permanently and can't be undone. For [Copilot sessions](/docs/agents/run/agent-harnesses.md#copilot), deleting the session also removes any associated worktrees created for that session.

If multiple Copilot sessions share the same worktree, such as after you fork a session, deleting one session does not remove the shared worktree while another session still uses it. The worktree is removed only after the last linked session is deleted or archived.

> [!CAUTION]
> Deleting a session is irreversible. Integrate or commit worktree changes before you delete the session because uncommitted files that exist only in a removed worktree can be lost. If you only want to hide a session, [archive](#archive-sessions) it instead.

## Fork a chat session

Forking a chat session branches off the conversation and inherits the conversation history from the original session. In single-chat sessions and sessions that don't use an agent host, the fork opens as a new independent session. The conversation is separate, but its code changes are isolated only if the fork uses a different folder or worktree. The new session title is prefixed with "Forked:" to help you identify it.

For multi-chat [Copilot](/docs/agents/run/agent-harnesses.md#use-the-copilot-harness) sessions in the {% data variables.copilot.agents_window %}, the fork opens as a peer chat in the same session. The peer chat gets an automatically generated title and runs independently from sibling chats.

For Copilot sessions that use worktree isolation, the fork continues to use the same worktree as the original session.

Forking is useful when you want to explore an alternative approach, ask a side question, or branch a long conversation in a different direction without losing the original context.

There are two ways to fork a chat session:

* **Fork the entire session**: type `/fork` in the chat input box and press `kbstyle(Enter)`. The fork opens with the full conversation history copied from the current session.

* **Fork from a checkpoint**: hover over a chat request in the conversation and select the **Fork Conversation** button. The fork includes only the requests up to and including that checkpoint.

    ![Screenshot of the Fork Conversation button in the checkpoint toolbar in the {% data variables.copilot.chat_view %}.](../../images/chat-checkpoints/chat-fork-conversation.png)

> [!TIP]
> A forked session inherits the conversation history of the original, which preserves the prompt cache and reduces cost on the next request. Use the [Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) to compare cache hit rates across sessions.

## Orchestrate sessions from agent host sessions

In agent host sessions, such as [Copilot](/docs/agents/run/agent-harnesses.md#use-the-copilot-harness) and Claude, agents can use built-in session-management tools to coordinate work across multiple sessions and chats. These tools are also available for Codex sessions when Codex [runs on the Agent Host](/docs/agents/concepts/agent-host.md#agents-on-the-agent-host).

With these tools, an agent can:

* List your sessions and inspect metadata like status, workspace, and file changes.
* Create a new session for a sub-task, or create a new chat in an existing session.
* Read recent conversation context from another session before continuing work.
* Send a message to another session or chat to start or steer a follow-up task.

When a tool creates or targets a session, {% data variables.product.prodname_vscode_shortname %} shows an **Open Session** pill in chat so you can jump directly to it.

To keep this workflow safe and predictable:

* Sending a message to another session always requires your confirmation.
* Agents cannot send messages to the same chat they are currently running in.
* Burst sends are capped to avoid unbounded fan-out.
* Archived sessions are excluded from listings unless explicitly requested.

## Save and export chat sessions

You can save chat sessions to preserve important conversations or reuse them later for similar tasks.

### Export a chat session as a JSON file

You can export a chat session to save it for later reference or share it with others. Exporting a chat session creates a JSON file that contains all prompts and responses from the session.

To export a chat session:

1. Open the chat session you want to export in the {% data variables.copilot.chat_view %}.

1. Run the **Chat: Export Chat...** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose a location to save the JSON file.

### Copy chat messages as Markdown

The {% data variables.copilot.chat_view %} supports different options for copying chat messages as Markdown to the clipboard, available through the context menu when you right-click a message or the chat background.

* **Copy**: Copy an individual prompt or response to the clipboard - the Markdown contains the response text, thinking steps, and tool calls.

* **Copy All**: Copy the entire chat session in Markdown format, including all prompts, responses, thinking steps, and tool calls.

* **Copy Final Response**: Copy just the final Markdown section of the agent's response, after the last tool call. This is useful for sharing or reusing the final output without the intermediate steps.

## Session status indicator (Experimental)

The session status indicator provides quick access to your sessions directly from the command center in the title bar. The indicator displays visual badges for unread messages and in-progress sessions, so you can stay informed about AI activity without switching views.

![Screenshot showing the session status indicator in the command center with unread and in-progress badges.](../../images/agents-overview/agent-status-indicator-v2.png)

The indicator shows:

* **Unread sessions badge**: shows the count of chat sessions with new messages. Select the badge to filter the sessions list to show only unread sessions.
* **In-progress sessions badge**: shows the count of sessions with running agents. Select the badge to filter the sessions list to show only in-progress sessions.
* **Sparkle icon**: provides quick access to chat and session management options.

You can configure the status indicator's visibility by using the `setting(chat.agentsControl.enabled)` setting.

## View sessions on the {% data variables.product.prodname_vscode_shortname %} welcome page

The {% data variables.product.prodname_vscode_shortname %} welcome page can act as your startup experience for working with chat sessions. It provides quick access to your recent chat sessions, an embedded chat widget for starting new tasks, and quick actions for common tasks.

To configure the {% data variables.product.prodname_vscode_shortname %} welcome page as your startup experience, set `setting(workbench.startupEditor)` to `agentSessionsWelcomePage`.

## Related resources

* [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md)
* [Agents overview](/docs/agents/overview.md)
* [Add context to chat](/docs/chat/copilot-chat-context.md)
* [Best practices for using AI](/docs/agents/best-practices.md)
