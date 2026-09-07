---
ContentId: d5f8a2c1-3e7b-4a9d-b6c4-8f2e1a3d5c7b
DateApproved: 9/9/2026
MetaDescription: Work with agents beside your code in the {% data variables.copilot.chat_view %}, with layouts for the side bar, editor, and separate windows.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use the {% data variables.copilot.chat_view %}

The {% data variables.copilot.chat_view %} is a code-first interface for working with agents in the main {% data variables.product.prodname_vscode %} window. Use it when your task centers on the current project and you want the editor, debugger, tests, extensions, and notebooks available alongside the conversation.

In this article, you learn how to open the {% data variables.copilot.chat_view %}, choose a layout, understand its interface, and start a workspace-scoped session. To compare it with other interfaces, see [Ways to work with agents](/docs/agents/overview.md#ways-to-work-with-agents). For conversation mechanics shared with the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md), see [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

## Prerequisites

* {% data variables.product.prodname_vscode %} installed. [Download {% data variables.product.prodname_vscode_shortname %}](/download).
* Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md) to sign in and activate your subscription.

## Open the {% data variables.copilot.chat_view %}

The {% data variables.copilot.chat_view %} opens in the Secondary Side Bar, next to your editor. To open the {% data variables.copilot.chat_view %}, use one of the following methods:

* Select the **Chat** menu in the {% data variables.product.prodname_vscode_shortname %} title bar, and then select **Open Chat**.

* Use the keyboard shortcut `kb(workbench.action.chat.open)`.

* Run `code chat` from the command line to start chat from outside {% data variables.product.prodname_vscode_shortname %}. Learn more about [starting chat from the command line](/docs/configure/command-line.md#start-chat-from-the-command-line).

### Layout options

The {% data variables.copilot.chat_view %} offers several layout options within the main {% data variables.product.prodname_vscode_shortname %} window. Choose the layout that best fits your workflow:

* **Side bar** (default): select **New Chat (+)** > **New Chat**, or run the **Chat: New Chat** command. Best for keeping chat visible alongside your code.

* **Editor tab**: select **New Chat (+)** > **New Chat Editor**, or run the **Chat: New Chat Editor** command. Best for giving chat more space or comparing sessions side by side.

* **Separate window**: select **New Chat (+)** > **New Chat Window**, or run the **Chat: New Chat Window** command. Best for multi-monitor setups.

## Interface overview

The {% data variables.copilot.chat_view %} keeps the agent next to your code, so you can prompt, review, and edit in the same window. The {% data variables.copilot.chat_view %} has the following main areas:

1. **Sessions list**: at the top of the view, where you can view and manage your sessions for the current workspace. Learn more about the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list).

1. **Chat conversation**: in the center, where you see the conversation history and the agent's responses, including the changes it makes to your code.

1. **Chat input**: at the bottom, where you type prompts and configure the session with the agent target, agent, language model, and permission pickers.

![Screenshot showing the {% data variables.copilot.chat_view %} with the sessions list, conversation, and chat input.](../images/agents-overview/chat-view-expanded.png)

The {% data variables.copilot.chat_view %} operates in two modes: compact and side-by-side. Use the toggle control in the top-right corner of the {% data variables.copilot.chat_view %} to switch between them. In compact mode, the sessions list and conversation share the same panel. In side-by-side mode, the sessions list stays visible next to the conversation. Learn more about [sessions list layout options](/docs/agents/run/sessions/manage-sessions.md#sessions-list).

## Start a session

To start a workspace-scoped session, select **New Chat** (`+`) or press `kb(workbench.action.chat.newChat)`. Before you send the first prompt, use the chat input controls to choose an agent target, agent, language model, and permission level. Learn more about [configuring an agent session](/docs/agents/overview.md).

Type a prompt and press `kb(workbench.action.chat.submit)`. For shared request, context, and conversation controls, see [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md). For session context, history, and organization, see [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md).

## Work with the agent

Because the {% data variables.copilot.chat_view %} runs in the main {% data variables.product.prodname_vscode_shortname %} window, you can inspect agent edits in the editor, follow terminal activity, debug the application, and run tasks or tests without switching surfaces. The agent also has access to supported extensions and can [edit notebooks](/docs/agents/guides/notebooks-with-ai.md). When you connect to a [remote workspace](/docs/remote/remote-overview.md), the session uses the same remote project context and tools.

Select a changed file in the response to inspect its diff, or set `setting(chat.checkpoints.showFileChanges)` to show a changed-files summary after each request. For revisions, checkpoints, and integrating changes, see [Review AI-generated code edits](/docs/agents/run/review-code-edits.md).

## Next steps

* [Chat overview](/docs/chat/chat-overview.md) - add context, write effective prompts, and review changes.
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md) - organize, archive, and fork sessions.
* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) - work with agents across multiple projects.
