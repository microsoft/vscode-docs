---
ContentId: 9c8b7a6d-5e4f-4c3b-9a2d-1f0e2d3c4b05
DateApproved: 05/21/2026
MetaDescription: Learn how agent plugins bundle commands, skills, agents, hooks, and MCP servers in VS Code.
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

Agent plugins bundle multiple customizations into one installable package. Instead of setting up each capability separately, you can install a plugin that brings commands, skills, custom agents, hooks, and MCP servers into VS Code together.

This course shows how to install plugins, browse available collections, use plugin-provided tools, and share recommended plugins with your team.

## Prerequisites

Before you start, install VS Code and sign in to GitHub Copilot. Then enable support for agent plugins in your settings.

## What plugins provide

A plugin can include any combination of:

* Slash commands.
* Agent skills.
* Custom agents.
* Hooks.
* MCP servers.

That makes plugins useful for sharing a team workflow or adopting a prebuilt package of agent behavior.

## Install and manage plugins

Enable plugin support in the settings, then open the Agent Customizations view from the Chat view to browse available plugins.

From there, you can:

* Browse the marketplace.
* Install a plugin from source.
* Create your own plugin.
* Review which customizations are already installed.

After installation, the plugin's customizations appear alongside your local ones.

![Screenshot of browsing agent plugins in the Extensions sidebar.](../../docs/copilot/images/agent-plugins/extensions-view.png)

![Screenshot of the Agent Plugins - Installed view in the Extensions view.](../../docs/copilot/images/agent-plugins/installed-plugins.png)

## Use plugin-provided customizations

Plugins can expose custom agents, skills, and MCP servers all in one place. In chat, you can invoke plugin content with slash commands or by selecting the relevant customization from the picker.

That makes plugins useful when you want a single install to add a complete workflow, such as a testing package that includes a testing skill, a review agent, and an MCP server for reporting.

![Screenshot of the Agent Customizations editor showing installed plugin content.](../../docs/copilot/images/customization/chat-customizations-editor.png)

> [!CAUTION]
> Plugins can run hooks and MCP servers on your machine. Review the contents and publisher before you install one.

## Plugin structure

Plugins are defined by a `plugin.json` manifest and can point to folders for skills, agents, hooks, and MCP server definitions. That keeps related automation in one package and makes it easier to share across a team.

## Share recommended plugins

If you want to recommend plugins for your team, add a shared plugin marketplace configuration to your repository and commit it. That lets teammates browse the same recommended sources and install the same collections in their own workspaces.

Use this approach when you want consistent tooling across a team without forcing a plugin into every workspace.

## Why this matters

Plugins turn a set of related customizations into one package. That makes it easier to share a workflow, install a collection once, and keep teammates aligned on the same agent behavior.

## What's next

The last course in this series shows how to use third-party agents like Claude and Codex without leaving VS Code.

## Learn more

* [Agent plugins in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
* [Customize AI in Visual Studio Code](https://code.visualstudio.com/docs/copilot/concepts/customization)
* [Use agent skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
* [Use custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
* [Use hooks in VS Code](https://code.visualstudio.com/docs/copilot/customization/hooks)
* [Add and manage MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
