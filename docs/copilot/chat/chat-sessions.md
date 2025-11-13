---
ContentId: 7a2e5f8d-4c9b-41e6-b3a8-9d7f2e4c1b8a
DateApproved: 11/12/2025
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

You can return to a previous chat session at any time by using the [chat session history](#chat-session-history).

<details>
<summary>Open a chat session in the Chat view</summary>

By default, the Chat view is located in the Secondary Side Bar in VS Code. This is useful when you want to have the chat experience open on the side and still have the Primary Side Bar available for other views, such as Explorer or Source Control.

To start a new chat session and clear the conversation history:

* Open the Chat view and select **New Chat** (`+`) or press `kb(workbench.action.chat.newChat)`

* Use the **Chat: New Chat** command from the Command Palette

</details>

<details>
<summary>Open chat in an editor tab</summary>

You can open a chat session as an editor tab to have the chat experience alongside your code files. This is useful when you want to have multiple chat sessions open at the same time, or when you want to arrange chat sessions side-by-side with code files.

To open a new chat session directly in an editor tab:

* Open the Chat view and select **New Chat** (`+`) > **New Chat Editor**

* Use the **Chat: New Chat Editor** command from the Command Palette

To open an existing chat session in an editor tab:

* Select the `...` icon in the top-right corner of the Chat view, and then select **Open Chat in Editor**

* Use the **Chat: Open Chat in Editor** command from the Command Palette

</details>

<details>
<summary>Open chat in a separate window</summary>

You can open a chat session in a separate, [floating window](/docs/configure/custom-layout.md#floating-windows). This is useful for multi-monitor setups or when you want to keep a chat session visible while working on code in the main window. To keep the Chat view on top of other windows, enable Always on Top mode.

You can open an existing chat session from the Chat view in a separate window, or you can create a new chat session directly in a new window.

To open a new chat session directly in a new window:

* Open the Chat view and select **New Chat** (`+`) > **New Chat Window**

* Use the **Chat: New Chat Window** command from the Command Palette

To open an existing chat session in a separate window:

* Select the `...` icon in the top-right corner of the Chat view, and then select **Open Chat in New Window**

* Use the **Chat: Open Chat in New Window** command from the Command Palette

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

## Context-isolated subagents

A subagent enables you to delegate tasks to an isolated, autonomous agent within your chat session. Subagents operate independently from the main chat session and have their own context window. This is useful to optimize  context management for complex multi-step tasks like research or analysis.

Subagents don't run asynchronously or in the background, however, they operate autonomously without pausing for user feedback. When a subagent completes its task, it returns only the final result to the main chat session, keeping the main context window focused on the primary conversation.

Subagents use the same agent and have access to the same tools available to the main chat session, except for creating other subagents. They also use the same AI model as the main chat session.

### Invoke a subagent

To invoke a subagent in a prompt:

1. Enable the `runSubagent` tool in the tool picker

    If you use a [custom prompt file](/docs/copilot/customization/prompt-files.md) or [custom agent](/docs/copilot/customization/custom-agents.md), ensure you specify `runSubagent` in the `tools` frontmatter property.

1. In the chat prompt, ask to use a subagent to perform a task.

    The following examples illustrate how to invoke a subagent:

    * `Use a subagent to research the best authentication methods for web applications. Summarize the findings.`
    * `Run #runSubagent to research the user's task comprehensively using read-only tools. Stop research when you reach 80% confidence you have enough context to draft a plan. Return this context.`

#### Use a custom agent with subagents (Experimental)

By default, a subagent inherits the agent from the main chat session. If you invoke a subagent from a custom agent, that subagent also runs with that agent.

With the experimental `setting(chat.customAgentInSubagent.enabled)` setting, subagents can run with a different (custom) agent.

To run a subagent with a specific agent:

1. Enable the `setting(chat.customAgentInSubagent.enabled)` setting

1. Prompt the AI to use a custom or built-in agent for the subagent. For example:

    * `Run the research agent as a subagent to research the best auth methods for this project.`
    * `Use the plan agent in a subagent to create an implementation plan for myfeature. Then save the plan in plans/myfeature.plan.md`

## Agent Sessions

> [!NOTE]
> The Agent Sessions view is currently in preview.

Agents enable you to perform AI coding tasks asynchronously in the background. This allows you to continue working in VS Code while the agent processes your requests. These agents are different from chat sessions in VS Code, since agents work in the background, while chat sessions are interactive and require your real-time input. Agents can also run in different environments, such as locally on your machine or remotely in the cloud.

> [!TIP]
> The OpenAI Codex agent enables you to use your Copilot Pro+ subscription to authenticate and access Codex without additional setup. Get more information about [GitHub Copilot billing and premium requests](https://docs.github.com/en/copilot/concepts/billing/copilot-requests) in the GitHub documentation.

### Agent Sessions view

The Agent Sessions view provides a centralized location for managing your active chat sessions, both local in VS Code and sessions created by background agents in other environments, such as Copilot coding agent, GitHub Copilot CLI, or OpenAI Codex. Enable the Agent Sessions view with the `setting(chat.agentSessionsViewLocation)` setting.

The Agent Sessions view currently supports the following coding agent integrations: [GitHub Copilot coding agent](/docs/copilot/copilot-coding-agent.md), GitHub Copilot CLI, and OpenAI Codex. We're working to further expand support for more coding agents in the future.

The Agent Sessions view lists all your active chat sessions organized by their source. The view is divided into sections for local chat sessions in VS Code and for coding agent sessions.

![Screenshot of the Agent Sessions view in the Primary Side Bar, showing a view for local chat sessions, and coding agents like Copilot coding agent, Copilot CLI and Codex.](../images/chat-sessions/agent-sessions-view.png)

You can start a new chat session for a specific agent directly from the Agent Sessions view by selecting the `+` control in the corresponding section.

Select a chat session to open it as a chat editor tab and monitor its progress. Right-click a session for options to open it in a new window or in the Chat view.

Agents might provide additional functionality beyond standard chat sessions, such as canceling ongoing tasks, checking out or closing the associated pull request, or applying their file changes directly to your workspace. Right-click an agent session in the Agent Sessions view to see the available options.

> [!NOTE]
> Extension developers can learn how to integrate with the Agent Sessions view with the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

### Delegate tasks to agents

To delegate a task to an agent, you can start a session directly from the Agent Sessions view. If you have already started a local chat session, you can also delegate tasks to a Copilot coding agent from that session. Delegating to an agent allows you to offload complex or time-consuming tasks to the agent while you continue working.

To delegate a task to a Copilot coding agent from a local chat session:

1. Open the Chat view or a chat editor tab.

1. Type a prompt in the chat input box or open an existing chat session.

1. Select **Delegate to Agent** to send the prompt to a coding agent. If you have multiple agents enabled, choose the agent from the list.

    ![Screenshot of the Chat view with the Delegate to Agent button highlighted.](../images/chat-sessions/delegate-to-agent.png)

    The coding agent session is created and provided with the context from your local chat session.

1. Monitor the coding agent session's progress in the Agent Sessions view.

In the editor, you can also delegate tasks by selecting the relevant code lense above a TODO comment. You can then track the progress of the delegated task in the Agent Sessions view.

![Screenshot of a code editor with a Delegate to Agent code lense above a TODO comment.](../images/chat-sessions/delegate-to-agent-code-lens.png)

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
