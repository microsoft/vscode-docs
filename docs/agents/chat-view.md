---
ContentId: d5f8a2c1-3e7b-4a9d-b6c4-8f2e1a3d5c7b
DateApproved: 5/28/2026
MetaDescription: Use the Chat view in VS Code for a code-first experience where agents assist you while you write and edit code in a single workspace.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Use the Chat view

The Chat view is where you work with agents in Visual Studio Code while staying focused on the code in your current project. It lives alongside your editor tabs in the main VS Code window, so you can prompt an agent, review its changes, and keep writing, debugging, and testing code without leaving your workspace. The Chat view is built for a code-first workflow within a single workspace, where the editor remains your primary interface and the agent assists your coding.

Use the Chat view when your work centers on a single project and you want full access to the editor, debugger, notebooks, extensions, and remote development while an agent helps you implement features, fix bugs, and refactor code.

In this article, you learn how to open and work with agents in the Chat view.

![Screenshot showing an agent session in the Chat view alongside the editor in VS Code.](images/agents-overview/chat-sessions-view.png)

> [!TIP]
> The Chat view (code-first) and the [Agents window](/docs/agents/agents-window.md) (agent-first) are the main surfaces for working with agents. They share the same sessions and settings, so you can move freely between them. For help choosing, see [where to work with agents](/docs/agents/overview.md#where-to-work-with-agents).

## Prerequisites

* Visual Studio Code installed. [Download VS Code](/download).
* Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in VS Code](/docs/setup/copilot.md) to sign in and activate your subscription.

## Open the Chat view

The Chat view opens in the Secondary Side Bar, next to your editor. You can also open chat in an editor tab, a separate window, or maximized to give it more space. Learn more about [where to open a chat session](/docs/agents/sessions/chat-sessions.md#where-to-open-a-chat-session).

To open the Chat view, use one of the following methods:

* Select the **Chat** menu in the VS Code title bar, and then select **Open Chat**.

    ![Screenshot showing the Chat menu in the VS Code title bar.](images/agents-overview/chat-sessions-view.png)

* Use the keyboard shortcut `kb(workbench.action.chat.open)`.

* Run `code chat` from the command line to start chat from outside VS Code. Learn more about [starting chat from the command line](/docs/configure/command-line.md#start-chat-from-the-command-line).

## Interface overview

The Chat view keeps the agent next to your code, so you can prompt, review, and edit in the same window. The Chat view has the following main areas:

1. **Sessions list**: at the top of the view, where you can view and manage your sessions for the current workspace. Learn more about the [sessions list](/docs/agents/sessions/chat-sessions.md#sessions-list).

1. **Chat conversation**: in the center, where you see the conversation history and the agent's responses, including the changes it makes to your code.

1. **Chat input**: at the bottom, where you type prompts and configure the session with the agent target, agent, language model, and permission pickers.

![Screenshot showing the Chat view with the sessions list, conversation, and chat input.](images/agents-overview/chat-view-expanded.png)

The Chat view operates in two modes: compact and side-by-side. Use the toggle control in the top-right corner of the Chat view to switch between them.

## Start a chat session

To start working with an agent in the Chat view:

1. Select **New Chat** (`+`) in the Chat view, or press `kb(workbench.action.chat.newChat)`.

1. Select where you want to run the agent by using the **Agent Target** dropdown. For example, select **Local** to run the agent interactively in the editor with full access to your workspace, tools, and models.

    ![Screenshot showing the agent target dropdown in the Chat view.](images/agents-overview/agent-type-dropdown.png)

1. Select an agent from the **Agent** dropdown. For example, select **Agent** to let chat autonomously determine what needs to be done and make changes to your workspace.

    ![Screenshot showing the agent picker in the Chat view.](images/getting-started/agent-mode-selection-2.png)

1. Optionally, select a language model and a permission level for the session. You can change these at any time during the session.

1. Type a prompt that describes what you want to accomplish, and press `kb(workbench.action.chat.submit)`.

    The agent breaks down your task into steps, edits files in your workspace, runs commands, and self-corrects when something goes wrong. Continue the conversation to refine the results or change direction.

Learn more about [how to interact with chat](/docs/chat/copilot-chat.md), including how to configure a session, add context, write effective prompts, and review changes.

## Work alongside your code

Because the Chat view runs in the main VS Code window, the agent works in the context of your open workspace, and you keep the full editing experience available while the agent works:

* **Edit and review in the editor**: open changed files to see inline diffs, and use the editor overlay controls to keep or undo individual edits. Learn more about [reviewing AI-generated code edits](/docs/chat/review-code-edits.md).

* **Debug and test**: use the debugger, run tasks, and execute tests to validate the agent's changes before you commit them.

* **Use extensions and notebooks**: the agent has access to your installed extensions and can [edit notebooks](/docs/agents/guides/notebooks-with-ai.md) directly in the editor.

* **Remote development**: if you're connected to a [remote workspace](/docs/remote/remote-overview.md), agents in the Chat view work there too, with access to the same context and tools as you have.

## Shared sessions with the Agents window

The Chat view and the [Agents window](/docs/agents/agents-window.md) share the same underlying agent sessions for supported agent types. A session you start in the Chat view is immediately available in the Agents window, and the other way around, so you can switch surfaces without losing session history or context.

To switch to the agent-first experience, select the **Open in Agents** button in the title bar, run the **Chat: Open Agents Window** command, or run `code --agents` from the command line. Learn more about the [Agents window](/docs/agents/agents-window.md).

## Next steps

* [Interact with chat](/docs/chat/copilot-chat.md) - add context, write effective prompts, and review changes.
* [Manage chat sessions](/docs/agents/sessions/chat-sessions.md) - open chat in editor tabs and windows, and organize your sessions.
* [Use the Agents window](/docs/agents/agents-window.md) - work with agents across multiple projects.
