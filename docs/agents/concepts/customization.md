---
ContentId: f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c
DateApproved: 10/28/2026
MetaDescription: Compare agent customization types, marketplaces, activation, and scope in {% data variables.product.prodname_vscode_shortname %}.
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
- copilot connectors
---

# Understand agent customization

AI models have broad knowledge, but that knowledge isn't a substitute for your project's current requirements or your organization's internal practices. Agent customization adapts an agent to your environment by adding persistent context, repeatable workflows, specialized roles, external tools, and deterministic controls.

This article explains how customization types differ, when they apply, and what they can and can't control. Use it to choose the right building blocks for your workflow. To install, create, and verify a customization, see [Customize agents for your workflow](/docs/agent-customization/overview.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with customizations">
Follow a hands-on tutorial to discover the customization options and configure them for your project.

* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)

</div>

## How customization changes an agent

The model brings general knowledge learned during training. The agent combines that knowledge with your prompt, the current conversation, and available context, such as workspace files. Your organization's internal practices and information in other projects aren't automatically available. Customizations provide reusable guidance and access to additional capabilities, so you don't have to supply the same context in every prompt.

Different mechanisms change different parts of the agent's work. Instructions and workflows guide the model's decisions. Tools expand the actions it can take. Hooks run commands at specific points in the agent's workflow, such as before or after a tool runs, without relying on the model to request them. Plugins package related customizations for installation and sharing.

Adding a rule to an instructions file is not equivalent to executing a validation script. Neither mechanism alone establishes a security boundary.

Relevant customizations can reduce back-and-forth and rework by giving the agent project context from the start. Avoiding corrective turns and discarded implementations can help reduce [AI credit usage](/docs/agents/guides/optimize-usage.md). Keep customizations focused because their content also consumes space in the model's context window.

## Customization options at a glance

Customization types differ in both purpose and activation. Activation determines when guidance enters a request or an action runs. Support depends on the [agent harness](/docs/agents/concepts/agent-harnesses.md), the runtime that coordinates the model and tools, rather than the language model you select.

| Need | Use | Example | Activation |
|------|-----|---------|------------|
| Apply standards across a project | [Always-on instructions](/docs/agent-customization/custom-instructions.md) | Require a specific logging library and error-handling pattern | Automatically included in each request |
| Apply guidance to specific code or tasks | [File-based instructions](/docs/agent-customization/custom-instructions.md) | Apply React conventions when the agent works with `.tsx` files | Included when file patterns match. In Local sessions, the agent can also load instructions by task relevance. |
| Teach the agent a workflow with supporting resources | [Agent skills](/docs/agent-customization/agent-skills.md) | Create a service from instructions, template files, and a setup script | The agent can load a relevant skill, or you invoke it directly |
| Run a saved task on demand | [Prompt files](/docs/agent-customization/prompt-files.md) | Scaffold a React component | You invoke the prompt as a slash command (Local harness sessions only) |
| Use a specialized role and tool configuration | [Custom agents](/docs/agent-customization/custom-agents.md) | Review code with read-only tools | You select the agent, use it as a subagent, or another agent delegates to it |
| Connect to an external system | Manually configured [MCP servers](/docs/agent-customization/mcp-servers.md) or managed [{% data variables.product.prodname_copilot_short %} connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)` | Query a database or update an issue | The agent calls an MCP tool when the task requires it |
| Run code at a specific point in the agent's workflow | [Hooks](/docs/agent-customization/hooks.md) | Run a formatter after a file edit or block a risky command | The harness runs the hook when the configured event occurs and its execution conditions are met |
| Install a packaged customization setup | [Agent plugins](/docs/agent-customization/agent-plugins.md) | Add a testing workflow with a skill, agent, hooks, and MCP server | Each bundled customization follows its own activation rules |

The closest alternatives differ in these ways:

* **Instructions or skills**: instructions provide standing guidance, such as project conventions. A skill describes how to perform a particular task and can include scripts, templates, and other resources.
* **Skills or prompt files**: a skill can be discovered for a relevant task or invoked directly. A prompt file is a saved prompt that you invoke explicitly in a Local harness session.
* **Skills or custom agents**: a skill supplies a workflow. A custom agent defines the role and tool configuration that performs work, and can use skills as part of that work.
* **Instructions or custom agents**: an `AGENTS.md` file gives guidance to an existing agent. Despite its name, it doesn't define a custom agent.

For supported services, {% data variables.product.prodname_copilot_short %} connectors provide managed MCP connections without local server setup or configuration files. Use a manually configured MCP server when you need another integration or its configuration options.

You don't need a customization for a one-time requirement. Add it to the current request instead. When a problem repeats, [choose the smallest useful customization](/docs/agent-customization/overview.md#choose-how-to-customize).

## Marketplaces and reusable customizations

You don't need to author every customization yourself. Marketplaces help you discover existing workflows and integrations from community publishers or your organization.

* **Customizations** are the instructions, workflows, tools, and other building blocks an agent uses.
* **Plugins** package related customizations for installation together. A plugin can include skills, custom agents, hooks, and MCP servers.
* **Plugin marketplaces** are catalogs of plugins. Adding a marketplace makes its plugins available to browse. Installing a plugin makes its supported components available to your harness.

The **Customization Marketplace** is the unified **Browse** experience in the Agent Customizations editor (Preview). It brings together supported sources, including plugin marketplaces, GitHub Feed, and {% data variables.product.prodname_copilot_short %} connectors `feature(copilot-connectors)`. Some sources offer individual skills or MCP servers; others offer plugins that bundle customizations. Available sources depend on the harness and organization policy.

A marketplace is a discovery and distribution mechanism, not another customization type. Installed components keep their own activation rules. Review the publisher, included files, and setup requirements before installation, then test the result in your workflow. See [Discover and install existing customizations](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview).

## Model-driven vs. deterministic behavior

Most customizations guide the model or give it more options. The model interprets instructions, decides whether a skill is relevant, and chooses when to call an available tool. The result depends on the request, available context, and model reasoning.

The runtime triggers a hook when its configured event occurs, such as a tool call starting or finishing. Use a hook for actions such as validating a tool call or starting a formatter after an edit. Discovery, trust, filters, timeouts, and error handling still affect execution. Use instructions when you want to guide how the agent reasons or writes code.

For example, an instruction that says "run the formatter after editing a file" asks the model to remember and perform that action. A hook configured to run after the editing tool completes performs that action regardless of whether the model remembers the instruction.

## How customizations combine

Customization types are building blocks rather than mutually exclusive alternatives. The following pull request workflow illustrates how they can work together, not a minimum setup to create. Add only the parts your workflow needs:

1. **Instructions** provide the repository's coding standards and pull request conventions.
1. A **custom agent** gives the agent a focused role and limits it to the tools needed for the task.
1. An **agent skill** supplies the steps, scripts, and templates for preparing the pull request.
1. An **MCP server** provides tools to retrieve the related issue from an external issue tracker.
1. **Hooks** run configured validation after the agent edits files or reject disallowed tool calls before they run.

Each layer has a separate responsibility. You can update the coding standards without changing the workflow, or replace the external system without rewriting the agent's role.

A plugin can distribute the complete configuration, for example within your organization, so that other developers can install the same skills and MCP servers.

## Customization scope

Scope determines where a customization is available and who can share it. It is separate from activation: a workspace customization isn't necessarily included in every request. Depending on the customization type, you can define it at one or more of these levels:

* **User**: available to you across workspaces.
* **Workspace or repository**: stored with the project and shared with contributors through source control.
* **Organization**: managed centrally and shared across repositories, where supported.

Choose the narrowest scope that matches the information. Personal preferences belong at the user level. Project architecture and repository-specific workflows belong in the repository. Organization-wide requirements belong at the organization level when the customization type supports it.

Agent [memory](/docs/agents/run/memory.md) is separate from project customization. Use local memory for personal preferences or emerging observations that aren't ready to share. Put reviewed project rules and workflows that contributors depend on in repository documentation or customizations so your team can review and maintain them.

Not every customization type supports every scope or agent harness. Before creating files, [check compatibility and choose a scope](/docs/agent-customization/overview.md#check-harness-compatibility). Enterprise policies can further restrict the customizations available to you.

## Related resources

* [Customize agents for your workflow](/docs/agent-customization/overview.md)
* [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md)
