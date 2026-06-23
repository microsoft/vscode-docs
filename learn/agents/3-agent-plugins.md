---
ContentId: 9c8b7a6d-5e4f-4c3b-9a2d-1f0e2d3c4b05
DateApproved: 05/21/2026
MetaDescription: Practice installing, reviewing, using, and recommending agent plugins for repeatable AI workflows in VS Code.
MetaSocialImage: ../images/shared/agent-first-development-social.png
Keywords:
  - plugins
  - agents
  - skills
  - hooks
  - mcp
  - customization
---

# Agent plugins

Agent plugins bundle multiple customizations into one installable package. In this guide, you will inspect a plugin before installing it, use a plugin-provided command, and decide when a plugin is a better fit than separate local customizations.

## Prerequisites

Before you start, install VS Code, enable AI features, and sign in to GitHub Copilot. Then enable support for agent plugins with `setting(chat.plugins.enabled)`.

* [Download VS Code](https://code.visualstudio.com/)
* [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview#_step-1-set-up-copilot)

## Start with the problem plugins solve

Imagine your team has a review workflow that uses three pieces:

* A skill that explains how to review changes in your repository.
* A custom agent that only has read-only tools.
* An MCP server that looks up issue metadata.

You could ask every teammate to configure those pieces one by one. A plugin packages them together so the workflow can be discovered, installed, updated, and disabled as one unit.

Plugins can include any combination of:

* Slash commands
* Agent skills
* Custom agents
* Hooks
* MCP servers

Use plugins when the value comes from the pieces working together. Use individual customizations when you only need one small behavior in one workspace.

| Use | Good fit | Not a good fit |
| --- | --- | --- |
| Plugin | Share a complete workflow across a team. | One personal prompt you rarely reuse. |
| Skill | Load task-specific instructions, scripts, and resources on demand. | A full workflow that also needs agents, hooks, or MCP servers. |
| Custom agent | Create a reusable role with its own instructions and tool limits. | A package that should install multiple customization types together. |

## Browse and inspect a plugin

After you enable `setting(chat.plugins.enabled)`, VS Code discovers plugins from the [copilot-plugins](https://github.com/github/copilot-plugins) and [awesome-copilot](https://github.com/github/awesome-copilot/) marketplaces by default. You can add more with `setting(chat.plugins.marketplaces)`.

1. Open the Chat view.

1. Select the cog, then open **Agent Customizations**.

1. Select **Plugins** in the left menu.

1. Pick a plugin that matches a workflow you recognize, such as testing, code review, or documentation.

1. Before installing, inspect what it includes. Look for skills, agents, hooks, and MCP servers.

1. Install it only if you trust the source and understand what it adds.

From there, you can:

* Browse the marketplace.
* Install a plugin from source.
* Create your own plugin.
* Review which customizations are already installed.

After installation, the plugin's customizations appear alongside your local ones in the **Agent Plugins - Installed** section of the Extensions view.

![Screenshot of browsing agent plugins in the Extensions sidebar.](../images/agents/extensions-view.png)

![Screenshot of the Agent Plugins - Installed view in the Extensions view.](../images/agents/installed-plugins.png)

## Try a plugin command

Plugins can expose custom agents, skills, slash commands, and MCP servers all in one place. In chat, you can invoke plugin content with slash commands or by selecting the relevant customization from the picker.

For example, after installing the awesome-copilot plugin, you can run `/awesome-copilot:suggest` to have the plugin look across your project and recommend related collections you can install next.

Try this sequence:

1. Open a repository you use for development.

1. Start a new agent chat.

1. Type `/` and find the plugin command.

1. Run the command and review what it recommends.

1. If it recommends more plugins, inspect those plugins before installing them.

The goal is not to install everything. The goal is to see how a plugin can bring a complete workflow into chat with one command.

![Screenshot of the Agent Customizations editor showing installed plugin content.](../images/agents/chat-customizations-editor-plugins.png)

> [!CAUTION]
> Plugins can run hooks and MCP servers on your machine. Review the contents and publisher before you install one.

## Read the manifest

When you inspect a plugin repository, start with `plugin.json`. The manifest defines the plugin identity and points to the folders that contain skills, agents, hooks, and MCP server definitions.

Look for fields like these:

```json
{
    "name": "team-review-tools",
    "description": "Review workflow for the team repository",
    "skills": "skills/",
    "agents": "agents/",
    "hooks": "hooks.json",
    "mcpServers": ".mcp.json"
}
```

This step matters because plugins can run hooks and MCP servers on your machine. The manifest tells you where to inspect the behavior before you trust it.

## Share recommended plugins

To share a curated set of plugins with your team, add an `extraKnownMarketplaces` and `enabledPlugins` block to your project's `.github/copilot/settings.json` (or `.claude/settings.json`) file and commit it.

```json
{
    "extraKnownMarketplaces": {
        "company-tools": {
            "source": {
                "source": "github",
                "repo": "your-org/plugin-marketplace"
            }
        }
    },
    "enabledPlugins": {
        "code-formatter@company-tools": true
    }
}
```

Use this approach when you want consistent tooling across a team without forcing a plugin into every workspace. VS Code shows a notification the first time a chat message is sent, and team members can also view the recommended plugins from the Extensions view with the `@agentPlugins @recommended` filter.

## Your turn

Choose one workflow you repeat in your team or personal projects. Then decide how you would package it.

1. If it needs one instruction set, write down the skill you would create.

1. If it needs a role with a fixed tool boundary, write down the custom agent you would create.

1. If it needs several customizations working together, sketch a plugin manifest.

You do not need to publish a plugin for this exercise. The goal is to practice identifying when a bundle is useful.

## Why this matters

Plugins turn a set of related customizations into one package. That makes a workflow easier to discover, install, review, disable, and recommend to teammates.

## What's next

The last course in this series shows how to use third-party agents like Claude and Codex without leaving VS Code.

## Learn more

* [Agent plugins in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
* [Customize AI in Visual Studio Code](https://code.visualstudio.com/docs/copilot/concepts/customization)
* [Use agent skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
* [Use custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
* [Use hooks in VS Code](https://code.visualstudio.com/docs/copilot/customization/hooks)
* [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)