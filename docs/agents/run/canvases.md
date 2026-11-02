---
ContentId: 4d8ccf7f-acff-40e2-9452-4686eda64a1f
DateApproved: 10/27/2026
FeatureStatus: canvases
MetaDescription: Collaborate with agents through interactive canvases in {% data variables.product.prodname_vscode_shortname %}. Find, open, and manage canvas extensions.
MetaSocialImage: ../images/agent-harnesses/kanban-canvas.png
Keywords:
- canvases
- canvas extensions
- copilot
- agents
- interactive
---
# Use canvases with agents

Canvases are interactive visual surfaces that you and an agent use together in {% data variables.product.prodname_vscode %}. For example, plan work on a Kanban board, inspect a diagram that the agent updates, or adjust controls whose values flow back to the agent. You interact directly with the canvas instead of describing every change in chat.

Every canvas is provided by a canvas extension. This guide shows you how to find a canvas, open it in a {% data variables.product.prodname_copilot_short %} session, and manage its extension.

![Screenshot showing a Kanban canvas with tasks and columns beside an agent conversation.](../images/agent-harnesses/kanban-canvas.png)

## Prerequisites

Canvases work in the {% data variables.product.prodname_vscode_shortname %} desktop app in local sessions that use the {% data variables.product.prodname_copilot_short %} harness. You can use them in both the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

1. Turn on `setting(chat.canvases.enabled)`.

1. Start a new session and [select the {% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#select-a-harness). Changes to the canvas setting apply to newly created sessions.

1. Send your first message to initialize the session before opening the canvas menus or managing canvas extensions.

> [!NOTE]
> Canvases aren't supported in Claude, Codex, extension-host Local sessions, remote Agent Host sessions, browser clients, or auxiliary windows.

## Get a canvas

Install an existing canvas extension or create one for your project.

### Install a canvas extension

Agent plugins can include canvas extensions. To find one in {% data variables.product.prodname_vscode_shortname %}:

1. With your {% data variables.product.prodname_copilot_short %} session active, open the Agent Customizations editor. Run **Chat: Open Customizations** from the Command Palette, or select **Customizations** in the {% data variables.copilot.agents_window %} sidebar.

1. Select **Browse**, then select **Canvases** to filter the results.

    The filter lists plugins whose metadata identifies them as canvas providers. These plugins also appear under **Plugins**.

1. Select a plugin, review its publisher and contents, and select **Install**.

For marketplace configuration and plugin trust prompts, see [Install an agent plugin](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace).

You can also use compatible canvas extensions from plugins installed through the {% data variables.copilot.github_copilot_app %}.

### Create a canvas for your project

When the `/create-canvas` skill is available in your session, enter `/create-canvas` in chat and describe the interface you need. The skill creates a workspace canvas extension and opens its canvas.

For example:

```prompt
/create-canvas Create a Kanban board for this project with Backlog, In progress, and Done columns.
```

## Open a canvas

Ask the agent to list the available canvases and open one. Include any information the canvas needs, such as the project or data it should display.

You can also open a canvas that doesn't require input without asking the agent:

| Location | Action |
|----------|--------|
| Chat input in either window | Select **Add Context (+)** > **Canvas...** to open or refocus an available canvas. |
| {% data variables.copilot.chat_view %} title bar | Select **New Chat (+)** > **Canvas**. |
| {% data variables.copilot.agents_window %} editor area | Select **Add Tab (+)** > **Canvas**. |
| Agent Customizations editor | Select **Canvases**, then double-click a canvas marked **Ready to Open**. You can also select it and press `Enter`, or select **More Actions** > **Open Canvas**. |

For a canvas marked **Requires Input**, ask the agent to open it and describe the information or configuration it should use.

## Interact with a canvas

A canvas opens in an editor tab and stays associated with the chat that opened it. The controls and supported actions depend on the canvas extension.

* **Interact directly**: Use the canvas controls to inspect or change its content. For example, create a card or move it between columns on a Kanban board.
* **Ask the agent to make changes**: Describe what you want to update in chat. The agent can use actions exposed by the canvas to inspect or update its state.
* **Return to a canvas**: Close and reopen a live canvas when the extension supports it. Use the canvas menus to return to an available canvas.

Depending on the extension, your interactions can also update the agent session.

## Manage canvas extensions

Use the **Canvases** section of the Agent Customizations editor to inspect canvas sources and manage supported extensions:

1. Select your active local {% data variables.product.prodname_copilot_short %} session and open the Agent Customizations editor.

1. Select **Canvases**.

1. Expand the user, workspace, plugin, or other source group, then expand an extension to see its canvases.

1. To inspect an extension's origin, use **More Actions** to open its source folder. For an extension owned by a plugin, select **Show Plugin** to view the plugin details.

1. Use the switch on a user or plugin extension to turn the extension on or off.

<!-- TODO: Add a screenshot showing the Canvases source groups and extension switches. -->

The switch applies to the extension, not an individual canvas. Workspace extensions can't be turned on or off from this editor.

When you turn off an extension, its last-known canvas entries might remain visible so that you can identify the extension and turn it on again. You can't open canvases from an extension that's turned off.

## Troubleshooting

| Problem | What to check |
|---------|---------------|
| A canvas menu doesn't appear | Check that `setting(chat.canvases.enabled)` is on, start a new local {% data variables.product.prodname_copilot_short %} session, and send a message. Install a canvas extension if none are available. |
| **Canvases are only available inside a session** appears | Select an active local {% data variables.product.prodname_copilot_short %} session, then reopen the Agent Customizations editor. |
| A canvas is marked **Requires Input** | Ask the agent to open it and provide the required information. It can't be opened directly from the list. |
| An extension is listed but its canvases won't open | Check whether the extension is turned off. Last-known entries can remain visible after an extension is turned off. |

## Related resources

* [Sample canvas extensions](https://awesome-copilot.github.com/extensions/)
* [Work with canvas extensions in the {% data variables.copilot.github_copilot_app %}](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
