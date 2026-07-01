---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 7/1/2026
MetaDescription: Learn how to create and manage chat sessions in Visual Studio Code, including the sessions list, opening chat in editor tabs, separate windows, and using chat session history.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Work with chat sessions in VS Code

Use chat in Visual Studio Code to have conversation-based AI interactions. A [chat session](/docs/agents/concepts/agents.md#chat-sessions) consists of the sequence of prompts and responses between you and the AI, along with any relevant context from your code or files. This article describes how to create and manage chat sessions, use the sessions list, and organize your sessions. These features work in both the [Chat view](/docs/agents/chat-view.md) and the [Agents window](/docs/agents/agents-window.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/agents/agents-tutorial.md)

</div>

## Start a new chat session

When you start a new chat session, you begin a new conversation with the AI. Each session has its own context window and can run with a different agent type. You can run multiple sessions in parallel, each focused on a different task or topic. Use the [sessions list](#sessions-list) to monitor and switch between different sessions.

> [!TIP]
> Start a new chat session when you want to change topics to help the AI provide more relevant responses.

Depending on how you prefer to work or the task you want to accomplish, you can choose between different chat experiences in VS Code. Each experience is optimized for different workflows, but they share the same underlying sessions to enable you to switch between them at any time.

{% tabs id="chat-surface" %}
{% tab label="Agents window" %}

The [Agents window](/docs/agents/agents-window.md) is a dedicated window for orchestrating agents across multiple projects from a single place. Chat is your primary interface where you assign high-level tasks to agents. The Agents window is optimized for **agents-first workflows**.

![Screenshot of the Agents window showing the sessions list, workspace picker, and chat input.](images/chat-sessions/agents-window-new-session.png)

To start a new chat session in the Agents window:

1. Open the Agents window by selecting the **Open in Agents** button in the VS Code title bar.

1. Select **New** in the sidebar to create a new session.

1. Choose the workspace or repository for the session, as the Agents window can target any of your projects.

1. Choose an agent type from the dropdown to indicate where the agent session runs and how it operates.

    You can choose from local, Copilot CLI, Cloud, or third-party. Learn more about [agent types](/docs/agents/overview.md#configure-your-agent-session).

1. Optionally, select additional configuration options for the session:

    * **Agent**: determines the role or persona of the AI, such as Agent, Plan, or Ask. Learn more about [choosing an agent](/docs/agents/overview.md#configure-your-agent-session).

    * **Permission level**: controls how much autonomy the agent has over tool approvals. Learn more about [permission levels](/docs/agents/approvals.md#permission-levels).

    * **Language model**: determines which AI model powers the conversation. Learn more about [language models in VS Code](/docs/agent-customization/language-models.md).

1. Type your prompt and press `kb(workbench.action.chat.submit)` to submit it. The agent's response appears in the chat area, and the agent may take actions such as editing files, running commands, or asking follow-up questions.

{% /tab %}
{% tab label="Chat view" %}

The [Chat view](/docs/agents/chat-view.md) is a chat panel that sits in the sidebar alongside your workspace editor tabs. Agents assist you with coding tasks, while you have full access to VS Code's rich coding experience. The Chat view is optimized for **code-first workflows**.

![Screenshot of opening a new chat session in the Chat view in VS Code.](images/chat-sessions/new-chat-session-chat-view.png)

To start a new chat session in the Chat view:

1. Open the Chat view by selecting the **Chat** icon in the VS Code title bar.

1. Create an empty session by selecting the **New Chat** (`+`) button.

    The session is scoped to the current workspace, so if you have a workspace open, the session is automatically linked to that workspace.

1. Choose an agent type to determine where the agent session runs and what capabilities it has access to.

    You can choose from local, Copilot CLI, Cloud, or third-party. Learn more about [agent types](/docs/agents/overview.md#configure-your-agent-session).

1. Optionally, select additional configuration options for the session:

    * **Agent**: determines the role or persona of the AI, such as Agent, Plan, or Ask. Learn more about [choosing an agent](/docs/agents/overview.md#configure-your-agent-session).

    * **Permission level**: controls how much autonomy the agent has over tool approvals. Learn more about [permission levels](/docs/agents/approvals.md#permission-levels).

    * **Language model**: determines which AI model powers the conversation. Learn more about [language models in VS Code](/docs/agent-customization/language-models.md).

1. Type your prompt and press `kb(workbench.action.chat.submit)` to submit it. The agent's response appears in the chat area, and the agent may take actions such as editing files, running commands, or asking follow-up questions.

{% /tab %}
{% /tabs %}

## Sessions list

The sessions list is your central hub for managing all your chat sessions, regardless of where you started them or where they are running. The sessions list shows your sessions with information about their status, type, and file changes.

![Screenshot of the sessions list showing multiple sessions with different statuses, types, and file change stats.](images/chat-sessions/chat-view-sessions-list.png)

Hover over a session to see actions for pinning or [archiving](#archive-sessions) it.  Right-click a session in the list to see additional actions like deleting or changing the session's state. Some actions are specific for the session's agent type and state. For example, checking out a pull request for a cloud agent session.

Use the pinning action to keep important sessions easily accessible at the top of your list. Pinned sessions stay at the top of the list regardless of their activity or state, so you can quickly find and return to them.

{% tabs id="chat-surface" %}
{% tab label="Agents window" %}

In the **Agents window**, the sessions list is located in the left sidebar. It shows sessions from all your workspaces, so you can monitor work across projects from a single place. Each session item surfaces key information such as session name, workspace, agent type, and file change stats.

![Screenshot of the sessions list in the Agents window, showing multiple sessions with different agent types and file change stats.](images/chat-sessions/agents-window-sessions-list.png)

By default, the list is filtered to only show active sessions. You can change the filter to show sessions of different states, such as completed or archived.

Sessions are grouped by workspace by default, and you can switch the grouping to organize by timeframe instead. In the Agents window, you can also create custom groups to keep related sessions together. Collapse a group header when you want to reduce the sessions list.

To organize the sessions list in the Agents window:

1. Create a custom group from the sessions list controls.

1. Drag one or more sessions onto the group. An insertion line shows where the sessions land.

1. Hover over a group header to start a new session in that group, or mark all sessions in the group as done.

You can also drag sessions up or down to reorder them, drag group and workspace headers to rearrange sections, or drop a session on the **Pinned** section to pin it. Select multiple sessions to move them together.

<!-- TODO: add screenshot of custom session groups and drag-and-drop reordering in the Agents window sessions list. -->

You can hide the left sidebar by selecting the **Toggle Sidebar** button in the top-left corner of the Agents window or by using the `kb(workbench.action.toggleSidebarVisibility)` keyboard shortcut.

{% /tab %}
{% tab label="Chat view" %}

In the **Chat view**, the sessions list is scoped to your current workspace and groups sessions by time period, such as **Today** or **Last Week**. If you don't have a workspace open, the list shows all sessions across your workspaces.

By default, the list is filtered to only show active sessions. You can change the filter to show sessions of different states, such as completed or archived.

To hide the session list from the Chat view, right-click in an empty chat and unselect **Show Sessions** or use the `setting(chat.viewSessions.enabled)` setting.

The Chat view operates in two modes: compact and side-by-side. You can manually switch between compact and side-by-side mode by using the toggle control in the top-right corner of the Chat view.

* **Compact**: The list of sessions is embedded in the Chat view. When you select a session from the list, the Chat view switches to that session. Use the back button to return to the sessions list.

* **Side-by-side**: The list of sessions is shown side-by-side with the Chat view. Select a session from the list to view its details in the Chat view. You can further configure the orientations with the `setting(chat.viewSessions.orientation)` setting.

> [!NOTE]
> Extension developers can learn how to integrate with the sessions view by using the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

{% /tab %}
{% /tabs %}

## Archive sessions

To keep the sessions list organized, archive or mark sessions as done when they're completed or you no longer need them. Archiving a session does not delete it. At any time, you can unarchive a session to restore it to the active sessions list.

When you archive (or mark as done) a session, its status changes so it moves out of the active sessions list. If the session uses a worktree, such as a Copilot CLI session, the worktree is removed from the file system, provided its working tree is clean. The branch and any commits are preserved, so restoring the session re-creates the worktree from that branch and no work is lost.

To archive a session, hover over the session in the sessions list and select the **Archive** (Chat view) or **Mark as Done** (Agents Window) option.

![Screenshot of archiving an agent session in the sessions view.](../agents/images/agents-overview/agent-sessions-archive-v2.png)

To view your archived sessions, use the filter options in the sessions list and select the **Archived** (Chat view) or **Done** (Agents Window) filter.

## Delete sessions

To permanently delete a session, right-click the session in the sessions list and select **Delete**. Deleting a session removes it permanently and can't be undone. For [Copilot CLI sessions](/docs/agents/agent-types/copilot-cli.md), deleting the session also removes any associated worktrees created for that session.

If multiple Copilot CLI sessions share the same worktree, such as after you fork a session, deleting one session does not remove the shared worktree while another session still uses it. The worktree is removed only after the last linked session is deleted or archived.

> [!CAUTION]
> Deleting a session is irreversible. If you just want to hide a session, consider [archiving](#archive-sessions) it instead.

## Fork a chat session

Forking a chat session creates a branch of a conversation that inherits conversation history from the original session. In single-chat sessions and sessions that don't use an agent host, the fork opens as a new independent session. The forked session is fully separate from the original, so changes in one session do not affect the other. The new session title is prefixed with "Forked:" to help you identify it.

For multi-chat [Copilot CLI](/docs/agents/agent-types/copilot-cli.md) sessions in the Agents window, the fork opens as a peer chat in the same session. The peer chat gets an automatically generated title and runs independently from sibling chats.

For Copilot CLI sessions that use worktree isolation, the fork continues to use the same worktree as the original session.

Forking is useful when you want to explore an alternative approach, ask a side question, or branch a long conversation in a different direction without losing the original context.

There are two ways to fork a chat session:

* **Fork the entire session**: type `/fork` in the chat input box and press `kbstyle(Enter)`. The fork opens with the full conversation history copied from the current session.

* **Fork from a checkpoint**: hover over a chat request in the conversation and select the **Fork Conversation** button. The fork includes only the requests up to and including that checkpoint.

    ![Screenshot of the Fork Conversation button in the checkpoint toolbar in the Chat view.](images/chat-checkpoints/chat-fork-conversation.png)

> [!TIP]
> A forked session inherits the conversation history of the original, which preserves the prompt cache and reduces cost on the next request. Use the [Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) to compare cache hit rates across sessions.

## Save and export chat sessions

You can save chat sessions to preserve important conversations or reuse them later for similar tasks.

### Export a chat session as a JSON file

You can export a chat session to save it for later reference or share it with others. Exporting a chat session creates a JSON file that contains all prompts and responses from the session.

To export a chat session:

1. Open the chat session you want to export in the Chat view.

1. Run the **Chat: Export Chat...** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose a location to save the JSON file.

### Copy chat messages as Markdown

The Chat view supports different options for copying chat messages as Markdown to the clipboard, available through the context menu when you right-click a message or the chat background.

* **Copy**: Copy an individual prompt or response to the clipboard - the Markdown contains the response text, thinking steps, and tool calls.

* **Copy All**: Copy the entire chat session in Markdown format, including all prompts, responses, thinking steps, and tool calls.

* **Copy Final Response**: Copy just the final Markdown section of the agent's response, after the last tool call. This is useful for sharing or reusing the final output without the intermediate steps.

## Session status indicator (Experimental)

The session status indicator provides quick access to your sessions directly from the command center in the title bar. The indicator displays visual badges for unread messages and in-progress sessions, so you can stay informed about AI activity without switching views.

![Screenshot showing the session status indicator in the command center with unread and in-progress badges.](../agents/images/agents-overview/agent-status-indicator-v2.png)

The indicator shows:

* **Unread sessions badge**: shows the count of chat sessions with new messages. Select the badge to filter the sessions list to show only unread sessions.
* **In-progress sessions badge**: shows the count of sessions with running agents. Select the badge to filter the sessions list to show only in-progress sessions.
* **Sparkle icon**: provides quick access to chat and session management options.

You can configure the status indicator's visibility by using the `setting(chat.agentsControl.enabled)` setting.

## View sessions on the VS Code welcome page

The VS Code welcome page can act as your startup experience for working with chat sessions. It provides quick access to your recent chat sessions, an embedded chat widget for starting new tasks, and quick actions for common tasks.

To configure the VS Code welcome page as your startup experience, set `setting(workbench.startupEditor)` to `agentSessionsWelcomePage`.

## Related resources

* [Use chat in VS Code](/docs/chat/chat-overview.md)
* [Agents overview](/docs/agents/overview.md)
* [Manage context for AI](/docs/chat/copilot-chat-context.md)
* [Best practices for using AI](/docs/agents/best-practices.md)
