---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 10/09/2025
MetaDescription: Learn how to create and manage chat sessions in Visual Studio Code, including opening chat in editor tabs, separate windows, and using chat session history.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Manage chat sessions

Chat in Visual Studio Code provides chat-based interaction with AI. As you explore different topics or tasks, create multiple chat sessions and scope each to a specific context. VS Code offers multiple ways to create and manage chat sessions: in the Chat view, as editor tabs, or in separate windows.

This article describes how to create and manage chat sessions, and how to use chat session history to continue a previous conversation.

## Create a new chat session

A chat session is the history of your interactions with the AI in a single conversation and includes all prompts, responses, and context used during that conversation. This history provides context for your subsequent prompts, allowing you to ask follow-up questions or refine your requests.

Choose to create a new chat session in the Chat view, in an editor tab, or in a separate window based on your workflow.

When you create a new chat session, the conversation history and context are cleared. Start a new chat session when you want to change topics or avoid carrying over context from previous requests. For example, start a new session when switching from debugging a specific issue to asking general questions about a technology concept.

You can return to a previous chat session at any time by using the [chat session history](#use-chat-session-history).

<details>
<summary>Open a chat session in the Chat view</summary>

By default, the Chat view is located in the Secondary Side Bar in VS Code. This is useful when you want to have the chat experience open on the side and still have the Primary Side Bar available for other views, such as Explorer or Source Control.

To start a new chat session and clear the conversation history:

1. Open the Chat view by using the `kb(workbench.action.chat.open)` keyboard shortcut or selecting **Open Chat** from the Chat menu in the VS Code title bar.

1. Select the **New Chat** (`+`) button in the Chat view title bar or use the `kb(workbench.action.chat.newChat)` keyboard shortcut.

</details>

<details>
<summary>Open chat in an editor tab</summary>

You can open a chat session as an editor tab to have the chat experience alongside your code files. This is useful when you want to have multiple chat sessions open at the same time, or when you want to arrange chat sessions side-by-side with code files.

You can open an existing chat session from the Chat view as an editor tab, or you can create a new chat session directly in an editor tab.

To open a new chat session directly in an editor tab:

* Open the Chat view and select the **New Chat Editor** option in the **New Chat** dropdown menu

* Alternatively, use the **Chat: New Chat Editor** command from the Command Palette

To open an existing chat session in an editor tab:

* Select the `...` icon in the top-right corner of the Chat view, and then select **Open Chat in Editor**.

* Alternatively, use the **Chat: Open Chat in Editor** command from the Command Palette

</details>

<details>
<summary>Open chat in a separate window</summary>

You can open a chat session in a separate, [floating window](/docs/configure/custom-layout.md#floating-windows). This is useful for multi-monitor setups or when you want to keep a chat session visible while working on code in the main window. To keep the Chat view on top of other windows, enable Always on Top mode.

You can open an existing chat session from the Chat view in a separate window, or you can create a new chat session directly in a new window.

To open a new chat session directly in a new window:

* Open the Chat view and select the **New Chat Window** option in the **New Chat** dropdown menu

* Alternatively, use the **Chat: New Chat Window** command from the Command Palette

To open an existing chat session in a separate window:

* Select the `...` icon in the top-right corner of the Chat view, and then select **Open Chat in New Window**.

* Alternatively, use the **Chat: Open Chat in New Window** command from the Command Palette

</details>

## Chat session history

When you create a new chat session, the previous conversation history is cleared. However, all your chat sessions are saved in the chat session history, allowing you to return to previous conversations and continue where you left off. This is useful when you want to review past interactions, reference previous responses, or resume a conversation from an earlier session.

When you switch to a previous chat session, all prompts, responses, and context from that session are restored in the Chat view.

To view your chat session history:

1. Open the Chat view and select **Show Chats...** in the Chat view title bar.

    ![Screenshot of the Chat view with the Show Chats button highlighted.](../images/chat-sessions/copilot-chat-view-show-chats.png)

1. Select a history entry from the list to open that chat session in the Chat view.

> [!TIP]
> Enable the `setting(chat.emptyState.history.enabled)` experimental setting to show your recent chat sessions when starting a new chat session. This enables you to quickly switch to a recent session without navigating to the chat session history.

### Export chat sessions

You can export a chat session to save it for later reference or share it with others. Exporting a chat session creates a JSON file that contains all prompts and responses from the session.

To export a chat session:

1. Open the chat session you want to export in the Chat view.

1. Run the **Chat: Export Chat...** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose a location to save the JSON file.

Alternatively, you can copy individual prompts or responses to the clipboard by right-clicking the message and selecting **Copy**. To copy the entire chat session in Markdown format, right-click the Chat view and select **Copy All**.

## Chat Sessions view

> [!NOTE]
> The Chat Sessions view is an experimental feature that is part of the integration with the Copilot Coding Agent.

The Chat Sessions view provides a dedicated space to manage all your active and recent chat sessions. It shows interactive sessions created in VS Code chat and background sessions created with a coding agent in other environments, such as Copilot coding agent.

Learn more about [Copilot Coding Agent](/docs/copilot/copilot-coding-agent.md).

## Tips for managing chat sessions

Consider the following tips to help you work effectively with chat sessions:

* **Start a new session for different topics**: When you switch to a new topic or task, start a new chat session to avoid carrying over context from unrelated conversations. This helps you get more relevant responses.

* **Use editor tabs for side-by-side comparisons**: Open multiple chat sessions as editor tabs to compare different approaches or solutions side-by-side.

* **Use separate windows for multi-monitor setups**: If you have multiple monitors, open chat in a separate window on a secondary monitor to keep it visible while you work on code in the main window.

## Related resources

* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Revert changes with checkpoints](/docs/copilot/chat/chat-checkpoints.md)
