---
ContentId: f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c
DateApproved: 8/12/2026
MetaDescription: Learn about the AI agent customization options in {% data variables.product.prodname_vscode_shortname %}, including instructions, prompt files, custom agents, skills, hooks, and plugins.
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

# Agent customization

AI models have broad knowledge, but they don't know your codebase, team practices, or development systems. Agent customization adapts an agent to your environment by adding persistent context, repeatable workflows, specialized roles, external tools, and deterministic controls.

This article explains how customizations change an agent, how the customization types differ, and how you can combine them. To create and manage customizations, see [Customize agent behavior in {% data variables.product.prodname_vscode %}](/docs/agent-customization/overview.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with customizations">
Follow a hands-on tutorial to discover the customization options and configure them for your project.

* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)

</div>

## How customization changes an agent

Without customization, the agent works from your prompt, the current conversation, and the context it gathers from your workspace. Customizations add information or capabilities that persist beyond a single prompt. They can change different parts of the agent's work:

* **Provide context**: [instructions](/docs/agent-customization/custom-instructions.md) describe coding standards, architecture decisions, and other rules the agent should follow.
* **Define repeatable work**: [agent skills](/docs/agent-customization/agent-skills.md) and [prompt files](/docs/agent-customization/prompt-files.md) package task-specific guidance so you don't have to describe the same process in every conversation.
* **Configure a role**: [custom agents](/docs/agent-customization/custom-agents.md) combine instructions, tools, and a language model into a specialized agent persona.
* **Add capabilities**: [MCP servers](/docs/agent-customization/mcp-servers.md) give the agent tools for interacting with external systems such as databases, browsers, and APIs.
* **Enforce actions**: [hooks](/docs/agent-customization/hooks.md) run commands at specific points in the agent loop, independent of whether the model chooses to run them.
* **Adopt a ready-made setup**: [agent plugins](/docs/agent-customization/agent-plugins.md) let you install multiple related customization types as one package.

These mechanisms affect different layers of the agent. Instructions guide the model's decisions, tools expand the actions it can take, and hooks run outside the model's decision-making. As a result, adding a rule to an instructions file is not equivalent to enforcing that rule with a hook.

Relevant customizations can reduce back-and-forth and rework by giving the agent project context from the start. Avoiding corrective turns and discarded implementations can help reduce [AI credit usage](/docs/agents/guides/optimize-usage.md). Keep customizations focused because their content also consumes space in the model's context window.

## Customization options at a glance

Ask the following questions when choosing a customization:

* Should it apply automatically, or only when you request it?
* Are you providing guidance, defining a workflow, adding a capability, or enforcing an action?
* Should the model decide when to use it?

The following table compares the customization types by purpose and activation.

| Need | Use | Example | Activation |
|------|-----|---------|------------|
| Apply standards across a project | [Always-on instructions](/docs/agent-customization/custom-instructions.md) | Require a specific logging library and error-handling pattern | Automatically included in each request |
| Apply guidance to specific code or tasks | [File-based instructions](/docs/agent-customization/custom-instructions.md) | Apply React conventions when the agent works with `.tsx` files | Included when files match a pattern or the task matches the description |
| Teach the agent a workflow with supporting resources | [Agent skills](/docs/agent-customization/agent-skills.md) | Create a service from instructions, template files, and a setup script | The agent loads the skill when the task matches, or you invoke it directly |
| Run a saved task on demand | [Prompt files](/docs/agent-customization/prompt-files.md) | Scaffold a React component | You invoke the prompt as a slash command |
| Use a specialized role and tool configuration | [Custom agents](/docs/agent-customization/custom-agents.md) | Review code with read-only tools | You select the agent, use it as a subagent, or another agent delegates to it |
| Connect to an external system | [MCP](/docs/agent-customization/mcp-servers.md) | Query a database or update an issue | The agent calls an MCP tool when the task requires it |
| Run code at a lifecycle event | [Hooks](/docs/agent-customization/hooks.md) | Run a formatter after a file edit or block a risky command | {% data variables.product.prodname_vscode_shortname %} runs the hook when the configured event occurs |
| Install a packaged customization setup | [Agent plugins](/docs/agent-customization/agent-plugins.md) | Add a testing workflow with a skill, agent, hooks, and MCP server | Each bundled customization follows its own activation rules |

Start with instructions when your main goal is to stop repeating project context. Add other customization types when you identify a recurring task, specialized role, missing capability, or action that must always run.

## Model-driven vs. deterministic behavior

Most customizations guide the model or give it more options. The model interprets instructions, decides whether a skill is relevant, and chooses when to call an available tool. The result depends on the request, available context, and model reasoning.

Hooks are deterministic. A hook runs when its configured lifecycle event occurs. Use a hook when an action must happen consistently, such as validating a command before it runs or starting a formatter after an edit. Use instructions when you want to guide how the agent reasons or writes code.

For example, an instruction that says "run the formatter after editing a file" asks the model to remember and perform that action. A hook configured for the corresponding lifecycle event runs regardless of whether the model remembers the instruction.

## How customizations combine

Customization types are building blocks rather than mutually exclusive alternatives. Consider an agent that prepares a pull request for your project:

1. **Instructions** provide the repository's coding standards and pull request conventions.
1. A **custom agent** gives the agent a focused role and limits it to the tools needed for the task.
1. An **agent skill** supplies the steps, scripts, and templates for preparing the pull request.
1. An **MCP server** provides tools to retrieve the related issue from an external issue tracker.
1. **Hooks** run required validation after the agent edits files and block disallowed commands.

Each layer has a separate responsibility. You can update the coding standards without changing the workflow, or replace the external system without rewriting the agent's role.

A plugin can distribute the complete configuration, for example within your organization, so that other developers can install the same skills and MCP servers.

## Customization scope

Where you define a customization determines who can use it and where it applies. Depending on the customization type, you can define it at one or more of these levels:

* **User**: available to you across workspaces.
* **Workspace or repository**: stored with the project and shared with contributors through source control.
* **Organization**: managed centrally and shared across repositories, where supported.

Choose the narrowest scope that matches the information. Personal preferences belong at the user level. Project architecture and team workflows belong in the repository. Organization-wide requirements belong at the organization level when the customization type supports it.

Not every customization type supports every scope or agent harness. See the individual customization guide for supported locations and environments.

## Related resources

* [Customize agent behavior in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/overview.md)
* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)
