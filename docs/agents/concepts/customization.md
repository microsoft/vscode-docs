---
ContentId: f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c
DateApproved: 6/24/2026
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

This article is the decision matrix for customization: it explains the different options and helps you choose which one fits your goal. For setup steps and examples, see [Customize AI in Visual Studio Code](/docs/agent-customization/overview.md) and the individual guides linked from each option.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with customizations">
Follow a hands-on tutorial to discover the customization options and configure them for your project.

* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)

</div>

## Customization options at a glance

| Goal | Use | Example | When it activates |
|------|-----|---------|-------------------|
| Apply coding standards everywhere | [Always-on instructions](/docs/agent-customization/custom-instructions.md) | Enforce ESLint rules, require JSDoc comments | Automatically included in every request |
| Different rules for different file types | [File-based instructions](/docs/agent-customization/custom-instructions.md) | React patterns for `.tsx` files | When files match a pattern or description |
| Reusable task I run repeatedly | [Prompt files](/docs/agent-customization/prompt-files.md) | Scaffold a React component | When you invoke a slash command |
| Package multi-step workflow with scripts | [Agent skills](/docs/agent-customization/agent-skills.md) | Test, lint, and deploy pipeline | When the task matches the skill description |
| Specialized AI persona with tool restrictions | [Custom agents](/docs/agent-customization/custom-agents.md) | Security reviewer, database admin | When you select it or another agent delegates to it |
| Connect to external APIs or databases | [MCP](/docs/agent-customization/mcp-servers.md) | Query a PostgreSQL database | When the task matches a tool description |
| Automate tasks at agent lifecycle points | [Hooks](/docs/agent-customization/hooks.md) | Run formatter after every file edit | When the agent reaches a matching lifecycle event |
| Install pre-packaged customizations | [Agent plugins](/docs/agent-customization/agent-plugins.md) | Install a community testing plugin | When you install a plugin |

Start with custom instructions for project-wide standards. Add prompt files when you have repeatable tasks. Use MCP when you need external data. Create custom agents for specialized personas. You can combine multiple customization types as your needs grow.

## How customizations combine

The customization options are designed to layer:

* **Instructions** shape *how* the AI writes code (conventions, style, libraries).
* **Prompt files** and **agent skills** encapsulate *what* the AI does for recurring tasks, from a single prompt up to a multi-step workflow with scripts.
* **Custom agents** define *who* the AI acts as (persona, tools, model), and can delegate to other agents for multi-step workflows.
* **MCP servers** extend *what the AI can reach* by adding [tools](/docs/agents/concepts/tools.md) that connect to external systems.
* **Hooks** enforce *deterministic actions* at specific lifecycle points in the agent loop, regardless of what the model decides to do.
* **Agent plugins** are pre-packaged bundles of the above, distributed through plugin marketplaces.

For configuration steps and examples, see [Customize AI in Visual Studio Code](/docs/agent-customization/overview.md) and the individual articles linked from the table above.

## Related resources

* [Customize AI in Visual Studio Code](/docs/agent-customization/overview.md)
* [Agents](/docs/agents/concepts/agents.md)
* [Tools](/docs/agents/concepts/tools.md)
