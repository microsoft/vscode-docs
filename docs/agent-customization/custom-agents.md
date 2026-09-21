---
ContentId: 276ecd8f-2a76-467e-bf82-846d49c13ab5
DateApproved: 9/16/2026
MetaDescription: Create and manage custom agents in {% data variables.product.prodname_vscode_shortname %} for specialized development roles, tools, and workflows.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- custom agents
- chat modes
- agent personas
- handoffs
- subagents
- copilot
- ai
- customize
- code review
---
# Custom agents in {% data variables.product.prodname_vscode_shortname %}

Custom agents combine instructions, tools, and an optional language model into a reusable configuration for a specific role, such as planning or code review. Switch to a custom agent instead of repeating the same instructions and selecting tools for every conversation.

This article shows you how to create, use, and manage custom agents in {% data variables.product.prodname_vscode_shortname %}, configure their files, and connect them with handoffs.

> [!TIP]
> **Not sure which customization to use?** See the [decision matrix](/docs/agents/concepts/customization.md#customization-options-at-a-glance) to compare custom agents with prompt files, agent skills, and the other options.

## What are custom agents?

The [built-in agent roles](/docs/agents/run/agent-harnesses.md#choose-a-built-in-agent-role) provide general-purpose configurations for chat. Custom agents provide your own role-specific configurations, defined in `.agent.md` Markdown files.

Store an agent in your workspace to share it with project contributors, or at the user level to reuse it across workspaces. The [supported file locations](#custom-agent-file-locations) depend on the harness and file format.

You can reuse agent definitions with [different agent harnesses](/docs/agents/run/agent-harnesses.md). The available tools and management controls depend on the selected harness.

## Why use custom agents?

Use a custom agent when a recurring task needs its own instructions and tool selection. For example:

* Give a planning agent read-only tools to research a change before implementation.
* Give a code review agent your team's review criteria.
* Give an implementation agent editing tools and instructions to follow existing project patterns.

> [!NOTE]
> Subagents can run with a custom agent. Learn more about running [subagents with custom agents](/docs/agents/run/subagents.md#run-a-custom-agent-as-a-subagent).

## Create a custom agent

Use the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) (Preview) to create an agent in your workspace or at the user level.

Use the **Session Target** control to select the [agent harness](/docs/agents/run/agent-harnesses.md#choose-a-session-target) you intend to use, then open the editor from either surface:

* **{% data variables.copilot.agents_window %}**: Select **Agents** in the **Customizations** panel in the left sidebar.
* **{% data variables.copilot.chat_view %}**: Select **Configure Chat** (gear icon), and then select **Agents**.

The editor shows customizations for the selected harness. You can [generate a custom agent with AI](#generate-a-custom-agent-with-ai), or follow these steps to create the file manually:

1. Select **New Agent (Workspace)** or **New Agent (User)** from the dropdown, depending on where you want to store the agent file.

    ![Screenshot showing the Agent Customizations editor and the dropdown to create a new custom agent.](images/customization/create-custom-agent.png)

    Alternatively, run the **Chat: New Custom Agent** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Select the location and enter a file name for the custom agent. This is the default name that appears in the agents dropdown.

1. Provide the details in the newly created `.agent.md` file, and then save it.

    * Fill in the YAML frontmatter to configure the agent's name, description, tools, and other options.
    * Add instructions for the agent in the body of the file. Use the [examples](#examples) as a starting point.

You can modify existing custom agents by opening them in the Agent Customizations editor.

> [!TIP]
> In the {% data variables.copilot.chat_view %}, with **Copilot** selected, type `/agents` in the chat input to open the **Agents** section of the Agent Customizations editor. With **Local** selected, `/agents` opens the agent picker, where you can select **Configure Custom Agents** to open the editor.

### Generate a custom agent with AI

Start from the **Overview** page of the Agent Customizations editor to generate a custom agent from a description:

1. Open the Agent Customizations editor and select **Overview**.
1. Enter a prompt that describes the agent's role and whether it should be available in the workspace or across your workspaces.
1. Answer any clarifying questions about the role or workflow.
1. Review the generated `.agent.md` file, including its tools, instructions, and frontmatter. Correct any inaccurate information and save the file.

For example, enter the following prompt:

```prompt
Create a workspace custom agent for code reviews. Review changes for correctness, maintainability, and consistency with this repository's conventions. Report findings without editing files.
```

You can also extract a custom agent from an ongoing conversation. For example, after a multi-turn debugging session, ask "make an agent for this kind of task" to capture the workflow as a reusable custom agent.

With **Local** selected, you can also use these shortcuts:

* Type `/create-agent` in Agent mode chat and describe the role you want.
* Select **Generate Agent** from the dropdown in the **Agents** section of the Agent Customizations editor.

These shortcuts aren't available in [Agent Host](/docs/agents/concepts/agent-host.md) sessions, such as **Copilot**. Use the **Overview** workflow instead.

## Use a custom agent

1. In the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}, select the intended harness from the **Session Target** control.
1. Open the **Agent** dropdown and select your custom agent.
1. Enter a prompt for its role. For example, ask a planning agent to outline the changes needed for a new feature.
1. Review the response and any tool calls to check that the agent follows the intended instructions and uses appropriate tools.

If the agent doesn't appear, check that its file is in a [supported location](#custom-agent-file-locations) for the selected harness and that its [visibility configuration](#customize-the-agents-dropdown-list) permits user invocation.

## Customize the agents dropdown list

To keep a custom agent available as a [subagent](/docs/agents/run/subagents.md) without listing it in the **Agent** dropdown, set `user-invocable: false` in its YAML frontmatter:

```yaml
user-invocable: false
```

This property controls picker visibility in both **Local** and **Copilot**. To show the agent again, set it to `true` or remove the property. Subagent invocation is controlled separately by `disable-model-invocation`.

Editing this property changes the agent definition, not a personal visibility preference. If you share the file in a repository, the change applies to everyone who uses that definition. It doesn't delete the agent file.

> [!NOTE]
> The Agent Customizations editor doesn't provide an eye-icon show or hide control for custom agents in either **Local** or **Copilot**. For agents contributed by an extension, manage the contributing extension instead. See [How do I remove a custom agent?](#how-do-i-remove-a-custom-agent).

## Custom agent file locations

You can define custom agents for a specific workspace or at the user level, where they are available across all your workspaces. The following table lists the supported file locations for custom agents based on their scope.

| Scope | Default file location |
|-------|-----------------------|
| Workspace | `.github/agents` folder |
| Workspace (Claude format) | `.claude/agents` folder |
| User | `~/.copilot/agents` or `~/.claude/agents` |

To create a user-level custom agent, use the Agent Customizations editor or the **Chat: New Custom Agent** command.

> [!IMPORTANT]
> For sessions that run on [Agent Host](/docs/agents/concepts/agent-host.md), the agent reads user-level custom agents from the selected host's folder, such as `~/.copilot/agents` or `~/.claude/agents`, and not from {% data variables.product.prodname_vscode_shortname %} profile user data. To move existing user-level custom agents, use the [user customization migration](/docs/agent-customization/overview.md#migrate-user-customizations).

> [!NOTE]
> The `setting(chat.agentFilesLocations)` and `setting(chat.modeFilesLocations)` settings are deprecated and only used by the Local agent. If you configured other agent locations with these settings, [migrate the customizations to supported locations](/docs/agent-customization/overview.md#migrate-customizations-from-configured-locations).

> [!TIP]
> In a monorepo, enable `setting(chat.useCustomizationsInParentRepositories)` to discover custom agents from the parent repository root. Learn more about [parent repository discovery](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo).

## Custom agent file structure

Custom agent files use the `.agent.md` extension. An optional YAML header configures the agent, and the Markdown body provides its instructions.

> [!NOTE]
> {% data variables.product.prodname_vscode_shortname %} detects any `.md` files in the `.github/agents` folder of your workspace as custom agents.

### Header (optional)

The header is formatted as YAML frontmatter with the following fields:

| Field | Description |
| --- | --- |
| `description`     | A brief description of the custom agent, shown as placeholder text in the chat input field. |
| `name`            | The name of the custom agent. If not specified, the file name is used. |
| `argument-hint`   | Optional hint text shown in the chat input field to guide users on how to interact with the custom agent. |
| `tools`           | A list of tool or [tool set](/docs/agent-customization/tool-sets.md) names that are available for this custom agent. Can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. To include all tools of an MCP server, use the `<server name>/*` format.<br/>Learn more about [tools with agents](/docs/agents/run/tools.md). |
| `agents`          | A list of agent names that are available as [subagents](/docs/agents/run/subagents.md) in this agent. Use `*` to allow all agents, or an empty array `[]` to prevent any subagent use. If you specify `agents`, ensure the `agent` tool is included in the `tools` property. To create a self-referential agent that lists itself in `agents`, enable `setting(chat.subagents.allowInvocationsFromSubagents)`. Learn more about [nested subagents](/docs/agents/run/subagents.md#nested-subagents). |
| `model`           | The AI model to use when running the prompt. Specify a single model name (string) or a prioritized list of models (array). When you specify an array, the system tries each model in order until an available one is found. If not specified, the currently selected model in model picker is used. |
| `user-invocable`  | Optional boolean flag to control whether the agent appears in the agents dropdown in chat (default is `true`). Set to `false` to create agents that are only accessible as [subagents](/docs/agents/run/subagents.md) or programmatically. See [Customize the agents dropdown list](#customize-the-agents-dropdown-list). |
| `disable-model-invocation` | Optional boolean flag to prevent the agent from being invoked as a subagent by other agents (default is `false`). |
| `infer`           | **Deprecated.** Use `user-invocable` and `disable-model-invocation` instead to control picker visibility and subagent invocation independently. |
| `target`          | The target environment or context for the custom agent (`vscode` or `github-copilot`). |
| `mcp-servers`     | Optional list of Model Context Protocol (MCP) server config json to use with [custom agents in GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents) (target: `github-copilot`). |
| `handoffs`        | Optional list of suggested next actions or prompts to transition between custom agents. Handoff buttons appear as interactive suggestions after a chat response completes. |
| `handoffs.label`  | The display text shown on the handoff button. |
| `handoffs.agent`  | The target agent identifier to switch to. |
| `handoffs.prompt` | The prompt text to send to the target agent. |
| `handoffs.send`   | Optional boolean flag to auto-submit the prompt (default is `false`) |
| `handoffs.model`  | Optional language model to use when the handoff executes. Use the qualified model name in the format `Model Name (vendor)`, for example `GPT-5 (copilot)` or `Claude Sonnet 4.5 (copilot)`. |
| `hooks` (Preview)  | Optional hook commands scoped to this agent. Hooks defined here only run when this agent is active, either invoked by the user or as a subagent. Uses the same format as [hook configuration files](/docs/agent-customization/hooks.md#hook-configuration-format). Requires `setting(chat.useCustomAgentHooks)` to be enabled. |

> [!NOTE]
> If a given tool is not available when using the custom agent, it is ignored.

### Body

The Markdown body contains the instructions the agent follows, such as its task, guidelines, and expected output.

You can reference other files by using Markdown links or the `#file:` syntax, for example to reuse instructions files. Relative file paths resolve from the custom agent file. To reference your environment user home folder, use `~`, or start a path with `~/`, such as `#file:~/copilot/security-guidelines.md`. Use Unix-style `/` path separators to keep custom agent files portable across operating systems.

To reference agent tools in the body text, use the `#tool:<tool-name>` syntax. For example, to reference the `fetch` tool, use `#tool:web/fetch`.

When you select the custom agent in the {% data variables.copilot.chat_view %}, the guidelines in the custom agent file body are prepended to the user chat prompt.

### Examples

<details>
<summary>Planning agent example</summary>

The following code snippet shows an example of a "Plan" custom agent file that generates an implementation plan and doesn't make any code edits. For more community-contributed examples, see the [Awesome Copilot repository](https://github.com/github/awesome-copilot/tree/main).

```markdown
---
description: Generate an implementation plan for new features or refactoring existing code.
name: Planner
tools: ['web/fetch', 'search/codebase', 'search/usages']
model: ['Claude Opus 4.5', 'GPT-5.2']  # Tries models in order
handoffs:
  - label: Implement Plan
    agent: agent
    prompt: Implement the plan outlined above.
    send: false
---
# Planning instructions
You are in planning mode. Your task is to generate an implementation plan for a new feature or for refactoring existing code.
Don't make any code edits, just generate a plan.

The plan consists of a Markdown document that describes the implementation plan, including the following sections:

* Overview: A brief description of the feature or refactoring task.
* Requirements: A list of requirements for the feature or refactoring task.
* Implementation Steps: A detailed list of steps to implement the feature or refactoring task.
* Testing: A list of tests that need to be implemented to verify the feature or refactoring task.
```

</details>

<details>
<summary>Agent orchestration example</summary>

The following example shows a "Feature Builder" agent that coordinates specialized subagents for a research-then-implement workflow. The main agent uses the `agents` property to restrict which agents can be invoked as subagents.

**feature-builder.agent.md** - The coordinating agent:

```markdown
---
name: Feature Builder
description: Build features by researching first, then implementing
tools: ['agent']
agents: ['Researcher', 'Implementer']
---
You are a feature builder. For each task:
1. Use the Researcher agent to gather context and find relevant patterns in the codebase
2. Use the Implementer agent to make the actual code changes based on research findings
```

**researcher.agent.md** - Read-only research agent:

```markdown
---
name: Researcher
description: Research codebase patterns and gather context
tools: ['search/codebase', 'web/fetch', 'search/usages']
---
Research thoroughly using read-only tools. Return a summary of findings.
```

**implementer.agent.md** - Code editing agent:

```markdown
---
name: Implementer
description: Implement code changes based on provided context
tools: ['edit', 'read/terminalLastCommand']
---
Implement changes following existing code patterns. Make minimal, focused edits.
```

</details>

<details>
<summary>Agent with scoped hooks example (Preview)</summary>

The following example shows a custom agent that defines hooks in its frontmatter. The `PostToolUse` hook runs a formatter after file edits and only runs when this agent is active. Enable `setting(chat.useCustomAgentHooks)` to use this feature.

```markdown
---
name: "Strict Formatter"
description: "Agent that auto-formats code after every edit"
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/format-changed-files.sh"
---

You are a code editing agent. After making changes, files are automatically formatted.
```

Learn more about hooks in [Agent hooks](/docs/agent-customization/hooks.md).

</details>

### Claude agent format

Agent files in the `.claude/agents` folder use plain `.md` files, following the [Claude sub-agents format](https://code.claude.com/docs/en/sub-agents). They support Claude-specific frontmatter properties:

| Field | Description |
|-------|-------------|
| `name` | Agent name (required) |
| `description` | What the agent does |
| `tools` | Comma-separated string of allowed tools (for example, `"Read, Grep, Glob, Bash"`) |
| `disallowedTools` | Comma-separated string of tools to block |

{% data variables.product.prodname_vscode_shortname %} maps Claude-specific tool names to the corresponding {% data variables.product.prodname_vscode_shortname %} tools. Both the {% data variables.product.prodname_vscode_shortname %} `.agent.md` format (with YAML arrays for tools) and the Claude format (with comma-separated strings) are supported.

## Handoffs

Handoffs connect agents into a workflow with suggested next steps. After a chat response completes, handoff buttons let you switch to another agent with the conversation context and a pre-filled prompt.

Use handoffs to review one stage of a task before starting the next. For example:

* **Planning to implementation**: Review a plan, then hand off to an implementation agent to start coding.
* **Implementation to review**: Complete implementation, then switch to a code review agent.
* **Failing tests to passing tests**: Review generated tests, then hand off to an agent that implements the changes needed to pass them.

To define handoffs, add them to the agent's frontmatter. Each handoff specifies the target agent, the button label, and an optional prompt:

```markdown
---
description: Generate an implementation plan
tools: ['search', 'web']
handoffs:
  - label: Start Implementation
    agent: implementation
    prompt: Now implement the plan outlined above.
    send: false
    model: GPT-5.2 (copilot)
---
```

When you select a handoff button, you switch to the target agent with the prompt pre-filled. If `send: true`, the prompt submits automatically.

## Tool list priority

With **Local**, when you use `tools` in both a custom agent and a prompt file, the prompt file's tools take precedence. Agent Host sessions don't load prompt files. For the full priority order, see [Tool list priority](/docs/agent-customization/prompt-files.md#tool-list-priority) in the prompt files documentation.

## Share custom agents across teams

To share custom agents across your team, you can create a workspace-level custom agent (`.github/agents` folder). If you want to share custom agents across multiple workspaces within your organization, you can define them at the GitHub organization level.

{% data variables.product.prodname_vscode_shortname %} automatically detects custom agents defined at the organization level to which your account has access. These agents appear in the Agents dropdown in chat alongside the built-in agents, and your personal and workspace custom agents.

To enable discovery of organization-level custom agents, set `setting(github.copilot.chat.organizationCustomAgents.enabled)` to `true`.

Learn how you can [create custom agents for your organization](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents) in the GitHub documentation.

## Frequently asked questions

### Are custom agents different from chat modes?

Custom agents were previously known as custom chat modes. The functionality remains the same, but the terminology has been updated to better reflect their purpose in customizing AI behavior for specific tasks.

If you have existing `.chatmode.md` files, rename them to `.agent.md` and place them in one of the [supported custom agent locations](#custom-agent-file-locations).

### How do I remove a custom agent?

To remove a custom agent you maintain, use either of these methods:

* Delete its file from the workspace or [user-level location](#custom-agent-file-locations).
* Select **Configure Custom Agents** from the agents dropdown to open the Agent Customizations editor, hover over the custom agent, and select the trash icon.

Deleting a shared workspace agent also removes it for others when they receive the repository change. To keep the definition but remove it from the picker, see [Customize the agents dropdown list](#customize-the-agents-dropdown-list).

You can't delete extension-provided agents from the Agent Customizations editor. Disable or uninstall the contributing extension to remove its agents. This also affects the extension's other features.

### How do I know where a custom agent comes from?

The agents dropdown includes built-in roles and custom agents from user-level files, your workspace, organizations, extensions, and plugins.

To identify the source of a custom agent:

1. Select **Configure Custom Agents** from the agents dropdown.
1. Hover over the custom agent in the list. The source location is displayed in a tooltip.

> [!TIP]
> Use the chat customization diagnostics view to see all loaded custom agents, prompt files, instruction files, and skills along with any errors. Right-click in the {% data variables.copilot.chat_view %} and select **Diagnostics**. Learn more about [troubleshooting AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/agent-troubleshooting/troubleshooting.md).

## Security considerations

Custom agents can restrict which tools are available, which gives you control over what the AI can do. For security-sensitive workflows, create agents with read-only tools to prevent unintended modifications. When sharing agents in a repository, review the tool list and instructions to ensure they follow the principle of least privilege.

## Related resources

* [Planning with agents](/docs/agents/run/planning.md)
* [Customize AI with custom instructions](/docs/agent-customization/custom-instructions.md)
* [Use tools with agents](/docs/agents/run/tools.md)
