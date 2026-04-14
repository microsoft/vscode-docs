---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 4/15/2026
MetaDescription: Learn how to create and manage chat sessions in Visual Studio Code, including the sessions list, opening chat in editor tabs, separate windows, and using chat session history.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Manage chat sessions

Use chat in Visual Studio Code to have conversation-based AI interactions. A chat session consists of the sequence of prompts and responses between you and the AI, along with any relevant context from your code or files. This article describes how to create and manage chat sessions, use the sessions list, and organize your sessions.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## What is a chat session?

A chat session is a single conversation with the AI, including all prompts, responses, and context. Each session is independent, so context from one session does not carry over to another.

Key things to know about chat sessions:

* **Context window**: as you chat, the session accumulates context. Creating a new session clears the history and starts a fresh context window. You can [monitor context window usage](/docs/copilot/chat/copilot-chat-context.md#monitor-context-window-usage) in the chat input box.
* **Checkpoints**: at any time, you can roll back to a previous state or edit a previous prompt to change direction. Learn more about [checkpoints](/docs/copilot/chat/chat-checkpoints.md).
* **Agent types**: sessions can run locally, in the background, or in the cloud. Learn more about [agent types](/docs/copilot/agents/overview.md#types-of-agents).
* **Multiple sessions**: you can run multiple sessions in parallel, each focused on a different task. Use the [sessions list](#sessions-list) to monitor ongoing sessions and switch between them.

> [!TIP]
> Start a new chat session when you want to change topics to help the AI provide more relevant responses.

## Start a new chat session

When you start a new chat session, you begin a new conversation with the AI. Each session has its own context window and can run with a different agent type and permission level. You can run multiple sessions in parallel, each focused on a different task or topic. Use the [sessions list](#sessions-list) to monitor and switch between your active sessions.

To start a new chat session:

1. Use the **New Chat (+)** button in the Chat view, or use the keyboard shortcut `kb(workbench.action.chat.newChat)`.

    ![Screenshot of the New Chat button in the Chat view.](../images/chat-sessions/new-chat-button.png)

1. Select where you want to run the agent by using the **Agent Target** dropdown. For example, select **Local** to run the agent interactively in the editor with full access to your workspace, tools, and models.

1. Select an agent from the **Agent** dropdown to choose the role or persona for the session. For example, select **Plan** to have the agent create a structured implementation plan before writing any code. You can switch between agents at any time during a session.

1. Optionally, select a permission level from the **Permissions** dropdown to control how much autonomy the agent has over tool approvals.

1. Type your prompt in the chat input box and press `kb(workbench.action.chat.submit)` to submit it.

Learn more about agent targets, agents, and permission levels in the [agents overview](/docs/copilot/agents/overview.md).

## Where to open a chat session

You can open chat sessions in different views, depending on how you prefer to work.

* **Side bar** (default): select **New Chat (+)** > **New Chat**, or run the **Chat: New Chat** command. Best for keeping chat visible alongside your code.

    ![Screenshot of opening a new chat session in the Chat view in VS Code.](../images/chat-sessions/new-chat-session-chat-view.png)

* **Editor tab**: select **New Chat (+)** > **New Chat Editor**, or run the **Chat: New Chat Editor** command. Best for giving chat more space or comparing sessions side by side.

    ![Screenshot of opening a new chat session in an editor tab in VS Code.](../images/chat-sessions/new-chat-session-editor-tab.png)

* **Separate window**: select **New Chat (+)** > **New Chat Window**, or run the **Chat: New Chat Window** command. Best for multi-monitor setups.

    ![Screenshot of opening a new chat session in a separate window in VS Code.](../images/chat-sessions/new-chat-session-separate-window.png)

* **Maximized**: select the **Maximize** button in the Chat view title bar, or run the **View: Toggle Maximized Panel** command. The chat takes over the full editor area, giving it maximum space. Select the button again to restore the previous layout.

You can move a chat session between views at any time. Select the `...` menu in the Chat view, editor tab, or chat window and choose one of the **Move Chat into...** options. Alternatively, use the corresponding **Chat: Move Chat** commands from the Command Palette.

## Sessions list

The Chat view gives you a unified view to manage all your sessions, regardless of where they run. It shows your sessions with information about their status, type, and file changes.

Use the find and filter options to find specific sessions. You can also pin important sessions to keep them at the top of the list for easy access. Hover over a session and select the pin icon to pin or unpin it.

The list of sessions is scoped to your workspace. If you don't have a workspace open, the list shows all sessions across your workspaces. The sessions are grouped by time periods, such as **Today** or **Last Week**.

![Screenshot of an agent session in VS Code showing code changes and chat interaction.](../images/agents-overview/chat-sessions-view.png)

Right-click a session in the list to see additional actions, such as different options to open the session details, archive the session, or agent-type specific actions like checking out a pull request (for cloud agent sessions).

To hide the session list from the Chat view, right-click in an empty chat and unselect **Show Sessions** (`setting(chat.viewSessions.enabled)`).

The Chat view operates in two modes: compact and side-by-side. You can manually switch between compact and side-by-side mode by using the toggle control in the top-right corner of the Chat view.

* **Compact**:

    In compact view, the list of sessions is embedded in the Chat view. When you select a session from the list, the Chat view switches to that session. Use the back button to return to the sessions list.

    ![Screenshot of the Chat view in compact mode showing recent agent sessions.](../images/agents-overview/chat-view-compact2.png)

* **Side-by-side**

    In side-by-side view, the list of sessions is shown side-by-side with the Chat view. Select a session from the list to view its details in the Chat view.

    ![Screenshot of the Chat view in expanded mode showing full agent session history.](../images/agents-overview/chat-view-expanded.png)

    When you make the Chat view wider, it automatically switches to side-by-side mode. Right-click on the sessions list and select **Sessions Orientation** to change this behavior (`setting(chat.viewSessions.orientation)`). You can also use the toggle button.

> [!NOTE]
> Extension developers can learn how to integrate with the sessions view by using the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

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

To permanently delete a session, right-click the session in the sessions list and select **Delete**. Deleting a session removes it permanently and can't be undone. For [Copilot CLI sessions](/docs/copilot/agents/copilot-cli.md), deleting the session also removes any associated worktrees created for that session.

> [!CAUTION]
> Deleting a session is irreversible. If you just want to hide a session, consider [archiving](#archive-sessions) it instead.

## Send messages while a request is running

You don't have to wait for a response to finish before sending your next message. While a request is in progress, the **Send** button changes to a dropdown that gives you three options for how to handle the new message.

![Screenshot of the Send button dropdown menu showing options to queue, steer, or stop and send a new message.](../images/chat-sessions/send-dropdown.png)

* **Add to Queue**: your message waits and sends automatically after the current response completes. The current response finishes uninterrupted.
* **Steer with Message**: signals the current request to yield after finishing the current tool execution. The current response stops and your new message processes immediately. Use this to redirect the agent when it's heading in the wrong direction.
* **Stop and Send**: cancels the current request entirely and sends your new message right away.

The default action for the **Send** button is configurable. Use `setting(chat.requestQueuing.defaultAction)` to set it to `steer` (default) or `queue`.

### Reorder pending messages

When you have multiple pending messages (queued or steering), you can drag and drop them to change the order in which they are processed. A drag handle appears on hover when more than one message of the same type is pending.

![Screenshot of pending messages in the chat input box with drag handles to reorder them.](../images/chat-sessions/pending-messages.png)

## Fork a chat session

Forking a chat session creates a new, independent session that inherits the conversation history from the original session. The forked session is fully separate from the original, so changes in one session do not affect the other. The new session title is prefixed with "Forked:" to help you identify it.

Forking is useful when you want to explore an alternative approach, ask a side question, or branch a long conversation in a different direction without losing the original context.

There are two ways to fork a chat session:

* **Fork the entire session**: type `/fork` in the chat input box and press `kbstyle(Enter)`. A new session opens with the full conversation history copied from the current session.

* **Fork from a checkpoint**: hover over a chat request in the conversation and select the **Fork Conversation** button. A new session opens that includes only the requests up to and including that checkpoint.

    ![Screenshot of the Fork Conversation button in the checkpoint toolbar in the Chat view.](../images/chat-checkpoints/chat-fork-conversation.png)

## Get notified about chat responses

When you're working in another window or application, VS Code can send you OS notifications to let you know about important chat events, so you don't have to keep checking back.

Use `setting(chat.notifyWindowOnResponseReceived)` to configure when you receive an OS notification when a chat response is received. The notification includes a preview of the response, and selecting it brings focus to the chat session.

Use `setting(chat.notifyWindowOnConfirmation)` to configure when you receive an OS notification when the agent needs your input or confirmation to continue.

Both settings have three possible values:

* `off`: never show notifications
* `windowNotFocused` (default): show notifications only when the VS Code window is not focused
* `always`: show notifications even when the VS Code window is in focus

> [!TIP]
> Set the value to `always` if you want to stay aware of chat activity while working in other parts of VS Code, such as when running long agent tasks in the background.

## Navigate between prompts in a chat session

Use the following keyboard shortcuts to navigate between prompts in a chat session:

* `kb(workbench.action.chat.previousUserPrompt)`: Go to the previous prompt in the chat session.
* `kb(workbench.action.chat.nextUserPrompt)`: Go to the next prompt in the chat session.
* `kb(workbench.action.chat.previousCodeBlock)`: Go to the previous code block in the chat session.
* `kb(workbench.action.chat.nextCodeBlock)`: Go to the next code block in the chat session.

## Save and export chat sessions

You can save chat sessions to preserve important conversations or reuse them later for similar tasks.

### Export a chat session as a JSON file

You can export a chat session to save it for later reference or share it with others. Exporting a chat session creates a JSON file that contains all prompts and responses from the session.

To export a chat session:

1. Open the chat session you want to export in the Chat view.

1. Run the **Chat: Export Chat...** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose a location to save the JSON file.

### Save a chat session as a reusable prompt

You can save a chat session as a [reusable prompt](/docs/copilot/customization/prompt-files.md) to reuse for similar tasks.

To save a chat session as a reusable prompt:

1. Open the chat session you want to save in the Chat view.

1. Type `/savePrompt` in the chat input box and press `Enter`.

    The command creates a `.prompt.md` file, which is a reusable [prompt file](/docs/copilot/customization/prompt-files.md) that generalizes your current chat conversation into a template with placeholders. You can use prompt files to run the same type of task across different projects or codebases.

1. Review and edit the generated prompt file as needed, then save it to your workspace.

### Copy chat messages as Markdown

The Chat view supports different options for copying chat messages as Markdown to the clipboard, available through the context menu when you right-click a message or the chat background.

* **Copy**: Copy an individual prompt or response to the clipboard - the Markdown contains the response text, thinking steps, and tool calls.

* **Copy All**: Copy the entire chat session in Markdown format, including all prompts, responses, thinking steps, and tool calls.

* **Copy Final Response**: Copy just the final Markdown section of the agent's response, after the last tool call. This is useful for sharing or reusing the final output without the intermediate steps.

## Related resources

* [Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Agents overview](/docs/copilot/agents/overview.md)
* [Manage context for AI](/docs/copilot/chat/copilot-chat-context.md)
* [Best practices for using AI](/docs/copilot/best-practices.md)
