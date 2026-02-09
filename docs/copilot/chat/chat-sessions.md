---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 02/04/2026
MetaDescription: Learn how to create and manage chat sessions in Visual Studio Code, including opening chat in editor tabs, separate windows, and using chat session history.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Manage chat sessions in VS Code

Use chat in Visual Studio Code to have conversation-based AI interactions. A chat session consists of the sequence of prompts and responses between you and the AI, along with any relevant context from your code or files. This article describes how to create and manage chat sessions, export chat sessions, and how to view the chat session history.

## What is a chat session?

A chat session is the history of your interactions with the AI within a single conversation and includes all prompts, responses, and context used during that conversation. Each chat session maintains its own history, allowing you to ask follow-up questions or refine your requests based on previous interactions.

As you interact with the AI, the chat session accumulates context from your prompts and responses (context window). When you create a new chat session, the previous conversation history is cleared, and a fresh context window is established for the new session. You can [monitor context window usage](/docs/copilot/chat/copilot-chat-context.md#monitor-context-window-usage) with the context control in the chat input box.

Use checkpoints to roll back to a previous state within a chat session or edit a previous prompt to modify the course of the conversation. Learn more about [checkpoints and editing chat requests](/docs/copilot/chat/chat-checkpoints.md).

You can create multiple chat sessions to organize your conversations by topic or task. Each session is independent, so context from one session does not carry over to another. VS Code maintains the [history of your chat sessions](#chat-session-history), allowing you to return to previous conversations at any time.

If you're using agents, the session can run locally on your machine, in the background using a CLI, or in the cloud. Learn more about [agents](/docs/copilot/agents/overview.md).

> [!TIP]
> Start a new chat session when you want to change topics to help the AI provide more relevant responses.

## Start a new chat session

VS Code supports different types of sessions (local, background, cloud, and third-party) and different views (side bar, editor tab, and separate window) for chat sessions. Learn more about [using the different agents](/docs/copilot/agents/overview.md).

At any time, you can run multiple sessions in parallel, each focused on a different task. When you create a new agent session, the previous session remains active, allowing you to switch between tasks via the [agent sessions list](/docs/copilot/agents/overview.md#agent-sessions-list).

| | |
|-|-|
| Open a local chat session in the side bar.<br/><br/><ul><li>In Chat view, **New Chat (+)** > **New Chat**</li><li>`kb(workbench.action.chat.newChat)`</li><li>**Chat: New Chat** command</li></ul> | ![Screenshot of opening a new chat session in the Chat view in VS Code.](../images/chat-sessions/new-chat-session-chat-view.png) |
| Open local chat as an editor tab.<br/><br/><ul><li>In Chat view, **New Chat (+)** > **New Chat Editor**</li><li>**Chat: New Chat Editor** command</li></ul>| ![Screenshot of opening a new chat session in an editor tab in VS Code.](../images/chat-sessions/new-chat-session-editor-tab.png) |
| Open local chat in a separate window.<br/><br/><ul><li>In Chat view, **New Chat (+)** > **New Chat Window**</li><li>`kb(workbench.action.chat.newChat)`</li><li>**Chat: New Chat Window** command</li></ul> | ![Screenshot  of opening a new chat session in a separate window in VS Code.](../images/chat-sessions/new-chat-session-separate-window.png) |

### Move a chat session to a different view

You can move an existing chat session to a different view, such as from the Chat view to an editor tab or a separate window. This is useful when you want to change how you interact with the chat session or organize your workspace differently.

* In the Chat view, select the `...` icon and then select **Move Chat into Editor Area** or **Move Chat into New Window**.

* In an chat editor, select the `...` icon in the top-right corner of the editor tab, and then select **Move Chat into Secondary Side Bar**.

* In a chat window, select the **Move Chat into Secondary Side Bar** button in the window title bar.

* Use the following commands from the Command Palette:

    * **Chat: Move Chat into Editor Area**

    * **Chat: Move Chat into New Window**

    * **Chat: Move Chat into Side Bar**

## Chat session history

When you create a new chat session, the previous conversation history is cleared. However, all your chat sessions are saved in the session history, allowing you to return to previous conversations and continue where you left off. This is useful when you want to review past interactions, reference previous responses, or resume a conversation from an earlier session.

![Screenshot of an agent session in VS Code showing code changes and chat interaction.](../images/agents-overview/chat-sessions-view2.png)

By default, when you start a new chat session, the Chat view shows your most recent sessions, whether they run locally, in the background, or in the cloud. Select **Show All Sessions** to view the full history of sessions, allowing you to search and filter the list. The list is scoped to your current workspace. If you don't have a workspace open, the list shows all sessions across your workspaces.

Learn more about agents and [viewing and managing agent sessions](/docs/copilot/agents/overview.md).

> [!TIP]
> Make the Chat view wider to automatically switch to side-by-side mode or use the toggle button in the top-right corner of the Chat view.

## VS Code welcome page

The VS Code welcome page can act as your startup experience for working with agent sessions. It provides quick access to your recent agent sessions, an embedded chat widget for starting new tasks, and quick actions for common tasks.

![Screenshot of the VS Code welcome page showing recent agent sessions and embedded chat.](../images/chat-sessions/agent-sessions-welcome-page.png)

To configure the VS Code welcome page as your startup experience, set the `setting(workbench.startupEditor)` setting to `agentSessionsWelcomePage`.

Learn more about [configuring the startup experience](/docs/getstarted/personalize-vscode.md) and [agent sessions settings](/docs/copilot/reference/copilot-settings.md#agent-sessions).

## Save and export chat sessions

You can save chat sessions to preserve important conversations or reuse them later for similar tasks.

### Export a chat session as a JSON file

You can export a chat session to save it for later reference or share it with others. Exporting a chat session creates a JSON file that contains all prompts and responses from the session.

To export a chat session:

1. Open the chat session you want to export in the Chat view.

1. Run the **Chat: Export Chat...** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose a location to save the JSON file.

Alternatively, you can copy individual prompts or responses to the clipboard by right-clicking the message and selecting **Copy**. To copy the entire chat session in Markdown format, right-click the Chat view and select **Copy All**.

### Save a chat session as a reusable prompt

You can save a chat session as a [reusable prompt](/docs/copilot/customization/prompt-files.md) to reuse for similar tasks.

To save a chat session as a reusable prompt:

1. Open the chat session you want to save in the Chat view.

1. Type `/savePrompt` in the chat input box and press `Enter`.

    The command creates a `.prompt.md` file that generalizes your current chat conversation into a reusable prompt. The prompt file has placeholders where appropriate.

1. Review and edit the generated prompt file as needed, then save it to your workspace.

## Navigate between prompts in a chat session

Use the following keyboard shortcuts to navigate between prompts in a chat session:

* `kb(workbench.action.chat.previousUserPrompt)`: Go to the previous prompt in the chat session.
* `kb(workbench.action.chat.nextUserPrompt)`: Go to the next prompt in the chat session.
* `kb(workbench.action.chat.previousCodeBlock)`: Go to the previous code block in the chat session.
* `kb(workbench.action.chat.nextCodeBlock)`: Go to the next code block in the chat session.

## Tips for managing chat sessions

Consider the following tips to help you work effectively with chat sessions:

* **Start a new session for different topics**: start a new chat session to avoid carrying over context from unrelated conversations. This helps you get more relevant responses.

* **Use editor tabs for side-by-side comparisons**: open multiple chat sessions as editor tabs to compare different approaches or solutions side-by-side.

* **Use separate windows for multi-monitor setups**: open chat in a separate window on a secondary monitor to keep it visible while you work on code in the main window.

* **Background tasks with remote agents**: use remote coding agents to perform AI tasks in the background while you continue working in VS Code.

* **Interactive agent sessions**: use local agent sessions for interactive tasks that require real-time input and feedback.

## Related resources

* [Get started with chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Revert changes with checkpoints](/docs/copilot/chat/chat-checkpoints.md)
