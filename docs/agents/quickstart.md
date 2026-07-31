---
ContentId: a2f47b91-6c58-4d0e-8b3a-1f9d7c5e2a60
DateApproved: 7/30/2026
MetaDescription: Run your first AI agent in VS Code. Enable AI features, start a session in the Agents window or Chat view, send a prompt, and review the changes.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agents window
- chat view
- quickstart
- get started
---

# Run your first agent

This quickstart gets you from zero to a working agent session in Visual Studio Code. You enable AI features, start a session, send a prompt, and review the changes the agent makes. It takes only a few minutes.

You can work with agents in two surfaces: the [Agents window](/docs/agents/agents-window.md), a dedicated agent-first surface, or the [Chat view](/docs/agents/chat-view.md) in the editor sidebar. Choose one below to follow the matching steps. For a broader tour of what agents can do, see [Build with agents in VS Code](/docs/agents/overview.md), or follow the hands-on [agents tutorial](/docs/agents/agents-tutorial.md).

## Prerequisites

* [Download and install Visual Studio Code](/download)
* A GitHub account. If you don't have a Copilot subscription, you are signed up for the free plan with monthly limits when you sign in.

## Step 1: Enable AI features

Select **Sign In** from the VS Code title bar, or hover over the Copilot icon in the Status Bar and select **Enable AI features**. Sign in with your GitHub account.

## Step 2: Start a session and send a prompt

Both surfaces work the same way for this quickstart, so either is a good starting point. If you're not sure, choose the **Chat view** to stay next to your code in the editor. Select your surface and follow its steps.

{% tabs id="quickstart-surface" %}
{% tab label="Agents window" %}

1. Select **Open in Agents** from the VS Code title bar to open the [Agents window](/docs/agents/agents-window.md). You can also run the **Chat: Open Agents Window** command from the Command Palette, or start VS Code with `code --agents`.

1. Select a workspace folder and the Copilot agent to start a session.

1. Enter a prompt that describes what you want to do, then select **Send**. For example:

    ```prompt
    Add a dark mode toggle to the header and make sure it works on mobile.
    ```

{% /tab %}
{% tab label="Chat view" %}

1. Open the [Chat view](/docs/agents/chat-view.md) with `kb(workbench.action.chat.open)`, or select the chat icon in the VS Code title bar.

1. Select **Agent** from the agent picker in the chat input.

1. Enter a prompt that describes what you want to do, then select **Send**. For example:

    ```prompt
    Add a dark mode toggle to the header and make sure it works on mobile.
    ```

{% /tab %}
{% /tabs %}

The agent analyzes your workspace, plans the work, edits files, and runs commands to complete the task. You can send follow-up messages at any time to steer it.

## Step 3: Review the changes

As the agent works, review its proposed edits in the diff view. Keep or undo individual changes before you apply them. Approve any tool or terminal commands the agent needs to run. Learn more about [reviewing code changes](/docs/chat/review-code-edits.md).

## Next steps

* [Manage chat sessions](/docs/chat/chat-sessions.md): create, organize, and configure your sessions.
* [Build with agents in VS Code](/docs/agents/overview.md): see what else agents can do.
* [Best practices for using AI in VS Code](/docs/agents/best-practices.md): get better results.
