---
ContentId: f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c
DateApproved: 3/9/2026
MetaDescription: Learn about the AI customization options in VS Code, including instructions, prompt files, custom agents, skills, hooks, and plugins.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- customization
- instructions
- prompt files
- custom agents
- agent skills
- hooks
- plugins
- MCP
---

# Customization

AI models have broad general knowledge but don't know your codebase or team practices. Think of the AI as a skilled new team member: it writes great code, but doesn't know your conventions, architecture decisions, or preferred libraries. Customization is how you share that context, so responses match your coding standards, project structure, and workflows.

This article explains the different customization options and when to use each one. For step-by-step configuration, see the individual guides linked from each section.

## Customization options at a glance

| Goal | Use | When it activates |
|------|-----|-------------------|
| Apply coding standards everywhere | [Always-on instructions](#custom-instructions) | Automatically included in every request |
| Different rules for different file types | [File-based instructions](#custom-instructions) | When files match a pattern or description |
| Reusable task I run repeatedly | [Prompt files](#prompt-files) | When you invoke a slash command |
| Package multi-step workflow with scripts | [Agent skills](#agent-skills) | When the task matches the skill description |
| Specialized AI persona with tool restrictions | [Custom agents](#custom-agents) | When you select it or another agent delegates to it |
| Connect to external APIs or databases | [MCP](#mcp) | When the task matches a tool description |
| Automate tasks at agent lifecycle points | [Hooks](#hooks) | When the agent reaches a matching lifecycle event |
| Install pre-packaged customizations | [Agent plugins](#agent-plugins) | When you install a plugin |

## Custom instructions

Custom instructions define coding standards and project context in Markdown files that are automatically included in chat requests. There are two types:

* **Always-on instructions**: project-wide rules defined in `.github/copilot-instructions.md` that apply to every request.
* **File-based instructions**: guidelines in `.instructions.md` files that apply based on file path patterns or task descriptions.

Learn more about [creating custom instructions](/docs/copilot/customization/custom-instructions.md).

## Prompt files

Prompt files encode common tasks as Markdown files you invoke as slash commands in chat. Use them for repeatable workflows like scaffolding components, running tests, or preparing pull requests. Each prompt file defines a task with optional tool references and context attachments.

Learn more about [creating prompt files](/docs/copilot/customization/prompt-files.md).

## Agent skills

Agent skills package specialized capabilities as folders of instructions, scripts, and resources that load on demand. Built on an [open standard](https://agentskills.io), skills work across VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent. Skills let you teach the agent domain-specific tasks, like generating API documentation or running security audits.

Learn more about [creating agent skills](/docs/copilot/customization/agent-skills.md).

## Custom agents

Custom agents let the AI adopt different personas for specific roles, such as security reviewer, database admin, or planner. Each agent defines its own behavior, available tools, and language model preferences in a `.agent.md` file. Custom agents can also hand off to other agents for multi-step workflows.

Learn more about [creating custom agents](/docs/copilot/customization/custom-agents.md).

## MCP

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard for connecting AI models to external tools and data sources. MCP servers provide [tools](/docs/copilot/concepts/tools.md) for tasks like querying databases, calling APIs, or interacting with external services. MCP servers can run locally or remotely, and can also provide resources, prompts, and interactive apps.

Learn more about [adding and managing MCP servers](/docs/copilot/customization/mcp-servers.md).

## Hooks

Hooks run custom shell commands at key lifecycle points during agent sessions. Unlike instructions or custom prompts that guide agent behavior, hooks execute your code at specific lifecycle points with guaranteed outcomes. Use hooks to enforce security policies, run formatters after edits, create audit trails, or inject context.

VS Code supports eight hook events: `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, and `Stop`.

Learn more about [configuring hooks](/docs/copilot/customization/hooks.md).

## Agent plugins

Agent plugins are pre-packaged bundles of customizations you discover and install from plugin marketplaces. A single plugin can provide slash commands, skills, custom agents, hooks, and MCP servers.

> [!NOTE]
> Agent plugins are currently in preview.

Learn more about [agent plugins](/docs/copilot/customization/agent-plugins.md).

## Related resources

* [Customize AI in VS Code](/docs/copilot/customization/overview.md)
* [Agents](/docs/copilot/concepts/agents.md)
* [Tools](/docs/copilot/concepts/tools.md)
