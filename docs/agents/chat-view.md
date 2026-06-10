---
ContentId: d5f8a2c1-3e7b-4a9d-b6c4-8f2e1a3d5c7b
DateApproved: 6/10/2026
MetaDescription: Use the Chat view in VS Code for a code-first experience where agents assist you while you write and edit code in a single workspace.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Use the Chat view

The Chat view is where you work with agents in Visual Studio Code while staying focused on the code in your current project. It lives alongside your editor tabs in the main VS Code window, so you can prompt an agent, review its changes, and keep writing code without leaving your workspace.

Use the Chat view when your work centers on a single project and you want to:

* **Edit and review in the editor**: open changed files to see inline diffs, and use the editor overlay controls to keep or undo individual edits. Learn more about [reviewing AI-generated code edits](/docs/chat/review-code-edits.md).
* **Debug and test**: use the debugger, run tasks, and execute tests to validate the agent's changes before you commit them.
* **Use extensions and notebooks**: the agent has access to your installed extensions and can [edit notebooks](/docs/agents/guides/notebooks-with-ai.md) directly in the editor.
* **Work remotely**: if you're connected to a [remote workspace](/docs/remote/remote-overview.md), agents in the Chat view work there too, with access to the same context and tools as you have.

In this article, you learn how to open and work with agents in the Chat view. For chat mechanics that apply to both the Chat view and the [Agents window](/docs/agents/agents-window.md) — such as sending requests, adding context, and reviewing changes — see [Use chat in VS Code](/docs/chat/chat-overview.md).

![Screenshot showing an agent session in the Chat view alongside the editor in VS Code.](images/agents-overview/chat-sessions-view.png)

> [!TIP]
> The Chat view (code-first) and the [Agents window](/docs/agents/agents-window.md) (agent-first) are the main surfaces for working with agents. They share the same sessions and settings, so you can move freely between them. To switch, select the **Open in Agents** button in the title bar, or run `code --agents`. For help choosing, see [Choose how you work with agents](/docs/agents/overview.md#choose-how-you-work-with-agents).

## Prerequisites

* Visual Studio Code installed. [Download VS Code](/download).
* Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in VS Code](/docs/setup/copilot.md) to sign in and activate your subscription.

## Open the Chat view

The Chat view opens in the Secondary Side Bar, next to your editor. To open the Chat view, use one of the following methods:

* Select the **Chat** menu in the VS Code title bar, and then select **Open Chat**.

    ![Screenshot showing the Chat menu in the VS Code title bar.](images/agents-overview/chat-sessions-view.png)

* Use the keyboard shortcut `kb(workbench.action.chat.open)`.

* Run `code chat` from the command line to start chat from outside VS Code. Learn more about [starting chat from the command line](/docs/configure/command-line.md#start-chat-from-the-command-line).

### Layout options

The Chat view offers several layout options within the main VS Code window. Choose the layout that best fits your workflow:

* **Side bar** (default): select **New Chat (+)** > **New Chat**, or run the **Chat: New Chat** command. Best for keeping chat visible alongside your code.

    ![Screenshot of opening a new chat session in the Chat view in VS Code.](../chat/images/chat-sessions/new-chat-session-chat-view.png)

* **Editor tab**: select **New Chat (+)** > **New Chat Editor**, or run the **Chat: New Chat Editor** command. Best for giving chat more space or comparing sessions side by side.

    ![Screenshot of opening a new chat session in an editor tab in VS Code.](../chat/images/chat-sessions/new-chat-session-editor-tab.png)

* **Separate window**: select **New Chat (+)** > **New Chat Window**, or run the **Chat: New Chat Window** command. Best for multi-monitor setups.

    ![Screenshot of opening a new chat session in a separate window in VS Code.](../chat/images/chat-sessions/new-chat-session-separate-window.png)

## Interface overview

The Chat view keeps the agent next to your code, so you can prompt, review, and edit in the same window. The Chat view has the following main areas:

1. **Sessions list**: at the top of the view, where you can view and manage your sessions for the current workspace. Learn more about the [sessions list](/docs/chat/chat-sessions.md#sessions-list).

1. **Chat conversation**: in the center, where you see the conversation history and the agent's responses, including the changes it makes to your code.

1. **Chat input**: at the bottom, where you type prompts and configure the session with the agent target, agent, language model, and permission pickers.

![Screenshot showing the Chat view with the sessions list, conversation, and chat input.](images/agents-overview/chat-view-expanded.png)

The Chat view operates in two modes: compact and side-by-side. Use the toggle control in the top-right corner of the Chat view to switch between them. In compact mode, the sessions list and conversation share the same panel. In side-by-side mode, the sessions list stays visible next to the conversation. Learn more about [sessions list layout options](/docs/chat/chat-sessions.md#sessions-list).

## Start a session

To start a new session, select **New Chat** (`+`) or press `kb(workbench.action.chat.newChat)`. Before you send your first prompt, use the controls in the chat input area to choose an agent target, agent, language model, and permission level. You can adjust these at any time during a session. Learn more about [configuring your agent session](/docs/agents/overview.md).

![Screenshot showing the agent target dropdown in the Chat view.](images/agents-overview/agent-type-dropdown.png)

Type a prompt and press `kb(workbench.action.chat.submit)` to start. The agent breaks down your task into steps, edits files in your workspace, runs commands, and self-corrects when something goes wrong. Learn more about [managing chat sessions](/docs/chat/chat-sessions.md).

## Work with the agent

After you send a prompt, the agent works through the task step by step. Because the Chat view lives inside the main VS Code window, you can interact with the agent's changes using the full editor experience.

* **Review edits in the editor**: the agent edits files directly in your workspace. Open a changed file to see an inline diff of the applied changes, and use the editor overlay controls to keep or undo individual edits. Learn more about [reviewing AI-generated code edits](/docs/chat/review-code-edits.md).

* **Follow terminal activity**: when the agent runs shell commands, such as installing dependencies or running a build, the commands execute in the integrated terminal. You can see the output in real time and intervene if needed.

* **Debug and test**: use the VS Code debugger, run tasks, and execute tests to validate the agent's changes before you commit them. This is a key advantage of working in the Chat view, where the full editor tooling is always available.

* **Use extensions and notebooks**: the agent has access to your installed extensions and can work with [notebooks](/docs/agents/guides/notebooks-with-ai.md) directly in the editor.

> [!TIP]
> You can open chat in an editor tab, a separate window, or maximized for more space. Learn more about the [Chat view layout options](#layout-options).

## Next steps

* [Chat overview](/docs/chat/chat-overview.md) - add context, write effective prompts, and review changes.
* [Manage chat sessions](/docs/chat/chat-sessions.md) - organize, archive, and fork sessions.
* [Use the Agents window](/docs/agents/agents-window.md) - work with agents across multiple projects.
