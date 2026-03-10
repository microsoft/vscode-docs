---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 3/9/2026
MetaDescription: Learn how to customize chat in VS Code with custom instructions, reusable prompt files, and custom agents to align AI responses with your coding practices and project requirements.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- copilot
- customization
- chat
- instructions
- rules
- slash commands
- prompt files
- custom agents
- agent skills
- mcp
---
# Customize AI in Visual Studio Code

AI models have broad general knowledge but don't know your codebase or team practices. Think of the AI as a skilled new team member: it writes great code, but doesn't know your conventions, architecture decisions, or preferred libraries. Customization is how you share that context, so responses match your coding standards, project structure, and workflows.

This article covers the customization options in VS Code: custom instructions, prompt files, custom agents, agent skills, MCP servers, agent plugins, and language models. To access customizations, select the **Configure Chat (gear icon)** in the Chat view.

## Quick reference

| Goal | Use | Example | When it activates |
|------|-----|---------|-------------------|
| Apply coding standards everywhere | [Always-on instructions](#custom-instructions) | Enforce ESLint rules, require JSDoc comments | Automatically included in every request |
| Different rules for different file types | [File-based instructions](#custom-instructions) | React patterns for `.tsx` files | When files match a pattern or description |
| Reusable task I run repeatedly | [Prompt files](#prompt-files) | Scaffold a React component | When you invoke a slash command |
| Package multi-step workflow with scripts | [Agent skills](#agent-skills) | Test, lint, and deploy pipeline | When the task matches the skill description |
| Specialized AI persona with tool restrictions | [Custom agents](#custom-agents) | Security reviewer, database admin | When you select it or another agent delegates to it |
| Connect to external APIs or databases | [MCP](#mcp-and-tools) | Query a PostgreSQL database | When the task matches a tool description |
| Automate tasks at agent lifecycle points | [Hooks](#hooks) | Run formatter after every file edit | When the agent reaches a matching lifecycle event |
| Install pre-packaged customizations from marketplaces | [Agent plugins](#agent-plugins) (Preview) | Install a community testing plugin | When you install a plugin |

## Customization options

### Custom instructions

[Custom instructions](/docs/copilot/customization/custom-instructions.md) define coding standards and project context in Markdown files that are automatically included in chat requests. Use always-on instructions for project-wide rules, or file-based instructions to apply different guidelines based on file path patterns.

### Agent skills

[Agent skills](/docs/copilot/customization/agent-skills.md) package specialized capabilities as folders of instructions, scripts, and resources that load on demand. Built on an [open standard](https://agentskills.io), skills work across VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent.

### Prompt files

[Prompt files](/docs/copilot/customization/prompt-files.md) encode common tasks as Markdown files you invoke as slash commands in chat. Use them for repeatable workflows like scaffolding components, running tests, or preparing pull requests.

### Custom agents

[Custom agents](/docs/copilot/customization/custom-agents.md) let the AI adopt different personas for specific roles, such as security reviewer, database admin, or planner. Each agent defines its own behavior, available tools, and language model preferences in a Markdown file.

### MCP and tools

[MCP and tools](/docs/copilot/customization/mcp-servers.md) extend the agent beyond code and the terminal by connecting to external services through the [Model Context Protocol](https://modelcontextprotocol.io/). Use MCP servers to interact with databases, APIs, and other development tools.

### Hooks

[Hooks](/docs/copilot/customization/hooks.md) run custom shell commands at key lifecycle points during agent sessions. Use them to enforce security policies, run formatters after edits, or create audit trails.

### Agent plugins

> [!NOTE]
> Agent Plugins are currently in preview.

[Agent plugins](/docs/copilot/customization/agent-plugins.md) are pre-packaged bundles of customizations you discover and install from plugin marketplaces. A single plugin can provide slash commands, skills, custom agents, hooks, and MCP servers.

### Language models

[Language models](/docs/copilot/customization/language-models.md) let you switch between AI models optimized for different tasks. Use a fast model for quick suggestions, or a more capable model for complex architectural decisions. Bring your own API key to access additional or locally hosted models.

## Set up your project for AI

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Generate instructions">
Set up your project for AI with `/init` to generate custom instructions tailored to your project.

* [Open in VS Code](vscode://GitHub.Copilot-Chat/chat?prompt=%2Finit)

</div>

Implement AI customizations incrementally. Start with the basics and add more as needed.

1. **Initialize your project**: type `/init` in chat to generate a `.github/copilot-instructions.md` file with coding standards tailored to your codebase.

1. **Add targeted rules**: create file-based `*.instructions.md` files for specific parts of your codebase, such as language conventions or framework patterns.

1. **Automate repetitive tasks**: create prompt files for common workflows and add MCP servers to connect external services.

1. **Create specialized workflows**: build custom agents for specific roles. Package reusable capabilities as agent skills to share across tools.

1. **Generate customizations with AI**: type `/create-prompt`, `/create-instruction`, `/create-skill`, `/create-agent`, or `/create-hook` in chat to generate customization files with AI assistance.

## Chat Customizations editor

> [!NOTE]
> The Chat Customizations editor is currently in preview.

The Chat Customizations editor provides a centralized UI for discovering, creating, and managing all your customizations in one place. From the editor, you can browse customization categories (agents, skills, instructions, prompts, hooks, MCP servers), create new items with optional AI-guided generation, and edit existing customizations in an embedded code editor.

To open the Chat Customizations editor, run **Chat: Open Chat Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot of the Chat Customizations editor, showing the sidebar with customization categories and the main view listing custom agents.](../images/customization/chat-customizations-editor.png)

## Troubleshoot customization issues

If your customizations aren't being applied or cause unexpected behavior, select **Configure Chat (gear icon)** > **Show Agent Logs** in the Chat view to [troubleshoot agent issues](/docs/copilot/troubleshooting.md).

## Related resources

* [Create custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Use Agent Skills](/docs/copilot/customization/agent-skills.md)
* [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
* [Create custom agents](/docs/copilot/customization/custom-agents.md)
* [Choose language models](/docs/copilot/customization/language-models.md)
* [Add and manage MCP servers](/docs/copilot/customization/mcp-servers.md)
* [Use hooks for lifecycle automation](/docs/copilot/customization/hooks.md)
* [Discover and manage agent plugins](/docs/copilot/customization/agent-plugins.md)
