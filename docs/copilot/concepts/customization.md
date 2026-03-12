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

| Goal | Use | Example | When it activates |
|------|-----|---------|-------------------|
| Apply coding standards everywhere | [Always-on instructions](#custom-instructions) | Enforce ESLint rules, require JSDoc comments | Automatically included in every request |
| Different rules for different file types | [File-based instructions](#custom-instructions) | React patterns for `.tsx` files | When files match a pattern or description |
| Reusable task I run repeatedly | [Prompt files](#prompt-files) | Scaffold a React component | When you invoke a slash command |
| Package multi-step workflow with scripts | [Agent skills](#agent-skills) | Test, lint, and deploy pipeline | When the task matches the skill description |
| Specialized AI persona with tool restrictions | [Custom agents](#custom-agents) | Security reviewer, database admin | When you select it or another agent delegates to it |
| Connect to external APIs or databases | [MCP](#mcp) | Query a PostgreSQL database | When the task matches a tool description |
| Automate tasks at agent lifecycle points | [Hooks](#hooks) | Run formatter after every file edit | When the agent reaches a matching lifecycle event |
| Install pre-packaged customizations | [Agent plugins](#agent-plugins) | Install a community testing plugin | When you install a plugin |

Start with custom instructions for project-wide standards. Add prompt files when you have repeatable tasks. Use MCP when you need external data. Create custom agents for specialized personas. You can combine multiple customization types as your needs grow.

## Custom instructions

Custom instructions are Markdown files that define coding standards and project context. The AI includes them automatically in chat requests, so you don't need to repeat rules in every prompt. Instructions are the simplest customization to set up and the best place to start.

There are two types:

* **Always-on instructions**: project-wide rules defined in `.github/copilot-instructions.md` that apply to every request. Use these for conventions the whole team follows, like code style, naming patterns, or preferred libraries.
* **File-based instructions**: guidelines in `.instructions.md` files that apply based on file path patterns or task descriptions. Use these when different parts of your codebase need different rules, such as React patterns for `.tsx` files or API conventions for your backend.

Learn more about [creating custom instructions](/docs/copilot/customization/custom-instructions.md).

## Prompt files

Prompt files are reusable Markdown files that encode a specific task and appear as slash commands in chat. When you find yourself typing the same kind of prompt repeatedly, a prompt file turns it into a one-step command. Each prompt file can reference specific files, tools, and context to give the AI everything it needs for that task.

Prompt files are useful for tasks like scaffolding a new component, generating test cases for a module, or preparing a pull request description.

Learn more about [creating prompt files](/docs/copilot/customization/prompt-files.md).

## Agent skills

Agent skills package multi-step capabilities as folders containing instructions, scripts, and resources. Unlike prompt files, which provide a single prompt, skills give the AI a complete toolkit for a domain-specific task such as generating API documentation, running security audits, or performing database migrations.

Skills load on demand when the task matches their description. They are built on an [open standard](https://agentskills.io), so the same skill works across different agent types.

Learn more about [creating agent skills](/docs/copilot/customization/agent-skills.md).

## Custom agents

Custom agents give the AI a specific persona and constrained set of tools for a particular role. For example, a security reviewer agent only has access to code analysis tools and follows security-focused instructions, while a database admin agent connects to your database through MCP and follows your schema conventions.

Each agent is defined in a `.agent.md` file that specifies its behavior, available tools, and language model preferences. Agents can also delegate to other agents, which enables multi-step workflows where different specialists handle different parts of a task.

Learn more about [creating custom agents](/docs/copilot/customization/custom-agents.md).

## MCP

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard for connecting the AI to external tools and data sources. Without MCP, the AI can only work with code and the terminal. MCP servers extend its reach by providing [tools](/docs/copilot/concepts/tools.md) that query databases, call APIs, interact with cloud services, or access any other external system.

MCP servers run locally or remotely and can also provide resources, prompts, and interactive apps.

Learn more about [adding and managing MCP servers](/docs/copilot/customization/mcp-servers.md).

## Hooks

Hooks run custom shell commands at specific points during an agent session. While instructions and prompts guide what the AI does, hooks guarantee that your code runs at defined lifecycle points. This makes hooks the right choice when you need deterministic outcomes, such as running a formatter after every file edit, blocking commits that fail a lint check, or logging every tool invocation for an audit trail.

Learn more about [configuring hooks](/docs/copilot/customization/hooks.md).

## Agent plugins

Agent plugins are pre-packaged bundles of customizations you discover and install from plugin marketplaces. Instead of building everything yourself, you can install a plugin that provides a ready-made combination of slash commands, skills, custom agents, hooks, and MCP servers. Plugins are useful for adopting community best practices or sharing internal tooling across teams.

> [!NOTE]
> Agent plugins are currently in preview.

Learn more about [agent plugins](/docs/copilot/customization/agent-plugins.md).

## Related resources

* [Get started with customization](/docs/copilot/customization/overview.md)
* [Agents](/docs/copilot/concepts/agents.md)
* [Tools](/docs/copilot/concepts/tools.md)
