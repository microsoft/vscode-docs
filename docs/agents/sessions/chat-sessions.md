---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 6/3/2026
MetaDescription: Learn how to create and manage chat sessions in Visual Studio Code, including the sessions list, opening chat in editor tabs, separate windows, and using chat session history.
MetaSocialImage: ../../images/shared/github-copilot-social.png
---
# Manage chat sessions

Use chat in Visual Studio Code to have conversation-based AI interactions. A [chat session](/docs/agents/concepts/agents.md#chat-sessions) consists of the sequence of prompts and responses between you and the AI, along with any relevant context from your code or files. This article describes how to create and manage chat sessions, use the sessions list, and organize your sessions. These features work in both the [Chat view](/docs/agents/chat-view.md) and the [Agents window](/docs/agents/agents-window.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/agents/agents-tutorial.md)

</div>

## Start a new chat session

When you start a new chat session, you begin a new conversation with the AI. Each session has its own context window and can run with a different agent type and permission level. You can run multiple sessions in parallel, each focused on a different task or topic. Use the [sessions list](#sessions-list) to monitor and switch between your active sessions.

> [!TIP]
> Start a new chat session when you want to change topics to help the AI provide more relevant responses.

To start a new chat session:

1. Create an empty session by selecting the **New Chat** button. The UI might differ slightly in the Chat view or the Agents window.

1. For the Agents window, choose the workspace or repository for the session, as it can target any of your projects.

1. Choose an agent type to determine where the agent session runs and what capabilities it has access to.

    You can choose from local, Copilot CLI, Cloud, or third-party. Learn more about [agent types](/docs/agents/overview.md#configure-your-agent-session).

1. Optionally, select additional configuration options for the session:

    * **Agent**: determines the role or persona of the AI, such as Agent, Plan, or Ask. Learn more about [choosing an agent](/docs/agents/overview.md#configure-your-agent-session).
    * **Permission level**: controls how much autonomy the agent has over tool approvals. Learn more about [permission levels](/docs/agents/agent-tools.md#permission-levels).
    * **Language model**: determines which AI model powers the conversation. Learn more about [language models in VS Code](/docs/agent-customization/language-models.md).

1. Type your prompt and press `kb(workbench.action.chat.submit)` to submit it. Learn more about [configuring your agent session](/docs/agents/overview.md), including agent types, agents, and permission levels.

## Where to open a chat session

You can open chat sessions in different views, depending on how you prefer to work:

* **[Agents window](/docs/agents/agents-window.md)** (agent-first): a dedicated window where chat and the sessions list are the primary interface. Best when you're orchestrating agents across multiple projects.
* **[Chat view](/docs/agents/chat-view.md)** (code-first): chat lives alongside your editor in the main VS Code window, with full access to debugging, notebooks, and extensions. Best when you're writing and editing code in a single workspace.

Both surfaces share the same sessions and settings, so you can move freely between them.

### In the Agents window

The Agents window lets you orchestrate sessions across multiple projects from one place. Learn more about the [Agents window](/docs/agents/agents-window.md).

![Screenshot of the Agents window showing the sessions list, workspace picker, and chat input.](../images/chat-sessions/agents-window-new-session.png)

* Select the **Open in Agents** button in the title bar, run the **Chat: Open Agents Window** command, or use `code --agents` from the command line.

* Open <https://insiders.vscode.dev/agents> in a browser to manage sessions from any device. Learn more about [remote agent sessions](/docs/agents/remote-agent-sessions.md).

* In the Agents window, you can [open multiple sessions side by side](/docs/agents/agents-window.md#open-multiple-sessions-side-by-side) to compare or review work in parallel.

### In the Chat view

The Chat view offers several layout options within the main VS Code window. Learn more about the [Chat view](/docs/agents/chat-view.md).

* **Side bar** (default): select **New Chat (+)** > **New Chat**, or run the **Chat: New Chat** command. Best for keeping chat visible alongside your code.

    ![Screenshot of opening a new chat session in the Chat view in VS Code.](../images/chat-sessions/new-chat-session-chat-view.png)

* **Editor tab**: select **New Chat (+)** > **New Chat Editor**, or run the **Chat: New Chat Editor** command. Best for giving chat more space or comparing sessions side by side.

    ![Screenshot of opening a new chat session in an editor tab in VS Code.](../images/chat-sessions/new-chat-session-editor-tab.png)

* **Separate window**: select **New Chat (+)** > **New Chat Window**, or run the **Chat: New Chat Window** command. Best for multi-monitor setups.

    ![Screenshot of opening a new chat session in a separate window in VS Code.](../images/chat-sessions/new-chat-session-separate-window.png)

## Sessions list

Both the Chat view and the Agents window provide a sessions list to manage your sessions. The sessions list shows your sessions with information about their status, type, and file changes.

* In the **Chat view**, the sessions list is scoped to your current workspace and groups sessions by time period, such as **Today** or **Last Week**. If you don't have a workspace open, the list shows all sessions across your workspaces.

* In the **Agents window**, the sessions list shows sessions across all your workspaces and groups them by workspace by default, so you can monitor work across projects from one place.

The session list supports the following capabilities:

* Sorting on different fields
* Grouping (Agents window)
* Searching on session title
* Pinning to the top of the list
* Archiving
* Deleting

Right-click a session in the list to see additional actions. Some actions are specific for the session's agent type and status. For example, checking out a pull request for a cloud agent session.

### Sessions list in the Chat view

To hide the session list from the Chat view, right-click in an empty chat and unselect **Show Sessions** (`setting(chat.viewSessions.enabled)`).

The Chat view operates in two modes: compact and side-by-side. You can manually switch between compact and side-by-side mode by using the toggle control in the top-right corner of the Chat view.

* **Compact**: The list of sessions is embedded in the Chat view. When you select a session from the list, the Chat view switches to that session. Use the back button to return to the sessions list.

* **Side-by-side**: The list of sessions is shown side-by-side with the Chat view. Select a session from the list to view its details in the Chat view. You can further configure the orientations with the `setting(chat.viewSessions.orientation)` setting.

> [!NOTE]
> Extension developers can learn how to integrate with the sessions view by using the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

### Sessions list in the Agents window

In the Agents window, the sessions list is in the sidebar and shows all your active sessions across workspaces.

Sessions are grouped by workspace by default, and you can switch the grouping to organize by timeframe instead. Each session item surfaces key information such as session name, workspace, agent type, and file change stats.

You can also open multiple sessions side by side in the Agents window to compare results or review work in parallel. Learn more about [managing sessions in the Agents window](/docs/agents/agents-window.md#manage-your-sessions).

### Session status indicator (Experimental)

The session status indicator provides quick access to your sessions directly from the command center in the title bar. The indicator displays visual badges for unread messages and in-progress sessions, so you can stay informed about AI activity without switching views.

![Screenshot showing the session status indicator in the command center with unread and in-progress badges.](../images/agents-overview/agent-status-indicator-v2.png)

The indicator shows:

* **Unread sessions badge**: shows the count of chat sessions with new messages. Select the badge to filter the sessions list to show only unread sessions.
* **In-progress sessions badge**: shows the count of sessions with running agents. Select the badge to filter the sessions list to show only in-progress sessions.
* **Sparkle icon**: provides quick access to chat and session management options.

You can configure the status indicator's visibility by using the `setting(chat.agentsControl.enabled)` setting.

### View sessions on the welcome page

The VS Code welcome page can act as your startup experience for working with chat sessions. It provides quick access to your recent chat sessions, an embedded chat widget for starting new tasks, and quick actions for common tasks.

To configure the VS Code welcome page as your startup experience, set `setting(workbench.startupEditor)` to `agentSessionsWelcomePage`.

## Archive sessions

To keep the sessions list organized, archive completed or inactive sessions. Archiving a session does not delete it but moves it out of the active sessions list. At any time, you can unarchive a session to restore it to the active sessions list.

To archive a session, hover over the session in the sessions list and select **Archive**. After you archive a session, it disappears from the list. Inversely, you can also unarchive a session in the same way.

![Screenshot of archiving an agent session in the sessions view.](../images/agents-overview/agent-sessions-archive.png)

To view your archived sessions, use the filter options in the sessions list and select the **Archived** filter.

## Delete sessions

To permanently delete a session, right-click the session in the sessions list and select **Delete**. Deleting a session removes it permanently and can't be undone. For [Copilot CLI sessions](/docs/agents/agent-types/copilot-cli.md), deleting the session also removes any associated worktrees created for that session.

If multiple Copilot CLI sessions share the same worktree, such as after you fork a session, deleting one session does not remove the shared worktree while another session still uses it. The worktree is removed only after the last linked session is deleted or archived.

> [!CAUTION]
> Deleting a session is irreversible. If you just want to hide a session, consider [archiving](#archive-sessions) it instead.

## Fork a chat session

Forking a chat session creates a new, independent session that inherits the conversation history from the original session. The forked session is fully separate from the original, so changes in one session do not affect the other. The new session title is prefixed with "Forked:" to help you identify it.

For [Copilot CLI](/docs/agents/agent-types/copilot-cli.md) sessions that use worktree isolation, the forked session continues to use the same worktree as the original session.

Forking is useful when you want to explore an alternative approach, ask a side question, or branch a long conversation in a different direction without losing the original context.

There are two ways to fork a chat session:

* **Fork the entire session**: type `/fork` in the chat input box and press `kbstyle(Enter)`. A new session opens with the full conversation history copied from the current session.

* **Fork from a checkpoint**: hover over a chat request in the conversation and select the **Fork Conversation** button. A new session opens that includes only the requests up to and including that checkpoint.

    ![Screenshot of the Fork Conversation button in the checkpoint toolbar in the Chat view.](../../chat/images/chat-checkpoints/chat-fork-conversation.png)

## Save and export chat sessions

You can save chat sessions to preserve important conversations or reuse them later for similar tasks.

### Export a chat session as a JSON file

You can export a chat session to save it for later reference or share it with others. Exporting a chat session creates a JSON file that contains all prompts and responses from the session.

To export a chat session:

1. Open the chat session you want to export in the Chat view.

1. Run the **Chat: Export Chat...** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose a location to save the JSON file.

### Save a chat session as a reusable prompt

You can save a chat session as a [reusable prompt](/docs/agent-customization/prompt-files.md) to reuse for similar tasks.

To save a chat session as a reusable prompt:

1. Open the chat session you want to save in the Chat view.

1. Type `/savePrompt` in the chat input box and press `Enter`.

    The command creates a `.prompt.md` file, which is a reusable [prompt file](/docs/agent-customization/prompt-files.md) that generalizes your current chat conversation into a template with placeholders. You can use prompt files to run the same type of task across different projects or codebases.

1. Review and edit the generated prompt file as needed, then save it to your workspace.

### Copy chat messages as Markdown

The Chat view supports different options for copying chat messages as Markdown to the clipboard, available through the context menu when you right-click a message or the chat background.

* **Copy**: Copy an individual prompt or response to the clipboard - the Markdown contains the response text, thinking steps, and tool calls.

* **Copy All**: Copy the entire chat session in Markdown format, including all prompts, responses, thinking steps, and tool calls.

* **Copy Final Response**: Copy just the final Markdown section of the agent's response, after the last tool call. This is useful for sharing or reusing the final output without the intermediate steps.

## Related resources

* [Use chat in VS Code](/docs/chat/chat-overview.md)
* [Agents overview](/docs/agents/overview.md)
* [Manage context for AI](/docs/chat/copilot-chat-context.md)
* [Best practices for using AI](/docs/agents/best-practices.md)
