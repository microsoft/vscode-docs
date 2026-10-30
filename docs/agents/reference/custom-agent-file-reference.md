---
ContentId: 30510047-1b9d-4df0-ba48-308f514f3592
DateApproved: 10/30/2026
MetaDescription: Look up custom agent file locations, syntax, fields, and harness compatibility in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../../../learn/images/shared/agent-first-development-social.png
Keywords:
- custom agents
- agent.md
- frontmatter
- reference
- handoffs
- subagents
---

# Custom agent file reference

This article describes custom agent file locations, syntax, frontmatter fields, and harness-specific configuration in {% data variables.product.prodname_vscode_shortname %}. For a step-by-step creation and verification workflow, see [Create and use custom agents](/docs/agent-customization/custom-agents.md).

## File structure

A custom agent file contains an optional YAML header, enclosed by `---` delimiters, followed by a Markdown body with the agent's instructions:

```markdown
---
name: Reviewer
description: Review changes without editing files
tools: ['read', 'search']
---
Review the supplied changes for correctness and missing tests.
Report actionable findings with file references. Do not edit files.
```

The fields below describe the {% data variables.product.prodname_vscode_shortname %} format. Files in `.claude/agents` use the [Claude agent format](#claude-agent-format).

## Custom agent file locations

You can define custom agents for a specific workspace or at the user level, where they are available across your workspaces. Select the intended harness before you create an agent so the Agent Customizations editor stores it in a supported location.

| Scope | Default file location | File format |
|-------|-----------------------|-------------|
| Workspace | `.github/agents` folder | `.agent.md` or `.md` files |
| Workspace (Claude format) | `.claude/agents` folder | `.md` files in the [Claude agent format](#claude-agent-format) |
| User ({% data variables.product.prodname_copilot_short %}) | `~/.copilot/agents` folder | `.agent.md` or `.md` files |
| User ({% data variables.product.prodname_anthropic_claude %}) | `~/.claude/agents` folder | `.md` files in the [Claude agent format](#claude-agent-format) |

To create a user-level custom agent, use the Agent Customizations editor or the **Chat: New Custom Agent** command. Store the file in a supported folder on the machine where the selected harness runs.

In a monorepo, enable `setting(chat.useCustomizationsInParentRepositories)` to discover custom agents from the parent repository root. Learn more about [parent repository discovery](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo).

### Local harness locations and migration

The **Local** harness stores user-level custom agents in {% data variables.product.prodname_vscode_shortname %} profile storage, separate from harness user folders such as `~/.copilot/agents` and `~/.claude/agents`. To reuse profile-based agents with another harness, [move them to that harness's user folder](/docs/agent-customization/migrate-customizations.md#move-user-agents-and-instructions).

Prefer native harness folders, such as `.github/agents` and `~/.copilot/agents`, over custom search locations. The `setting(chat.agentFilesLocations)` setting remains supported and is not deprecated. The editor forwards agents from additional configured locations to Agent Host harnesses, including {% data variables.product.prodname_copilot_short %}, for compatibility with existing editor workflows. The older `chat.modeFilesLocations` setting is deprecated.

Custom locations are not recommended for {% data variables.product.prodname_copilot_short %} workflows because {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %} do not inherit editor location settings. To use agents across {% data variables.product.prodname_copilot_short %} clients, [move them to native harness locations](/docs/agent-customization/migrate-customizations.md#move-customizations-from-configured-locations).

Custom agents were previously known as custom chat modes. If you have `.chatmode.md` files, rename them to `.agent.md` and place them in a supported custom agent location.

If an agent has `hooks` in its frontmatter, review the [agent-scoped hook contract](/docs/agent-customization/hooks.md#agent-scoped-hooks). {% data variables.product.prodname_vscode_shortname %} preserves those hooks when converting agents for {% data variables.product.prodname_copilot_short %}, including plugin-provided agents. Keep agent-specific automation scoped to the agent and verify that its hooks run before completing a migration.

### Organization-level agents

To share custom agents across multiple workspaces within your organization, you can define them at the GitHub organization level.

{% data variables.product.prodname_vscode_shortname %} automatically detects organization-level custom agents to which your account has access. These agents appear in the agents dropdown alongside built-in, personal, and workspace agents.

Discovery of organization-level custom agents is enabled by default. To stop showing them in chat, set `setting(github.copilot.chat.organizationCustomAgents.enabled)` to `false`.

Learn how to [create custom agents for your organization](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents) in the GitHub documentation.

## Harness compatibility

The selected [agent harness](/docs/agents/run/agent-harnesses.md) determines which fields and tool names take effect. A shared file location does not imply identical behavior across harnesses.

* **Local** supports the {% data variables.product.prodname_vscode_shortname %} tool names, subagent configuration, handoffs, and agent-scoped hooks described below.
* **Copilot** supports custom agent configuration through its runtime. Use the field-specific guidance below and the [Copilot custom agent documentation](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents). Local handoffs do not apply. See [Copilot-specific configuration](#copilot-specific-configuration) for fields recognized by the editor but not forwarded during agent conversion.
* **Claude** uses its own [agent format](#claude-agent-format) and runtime behavior.
* **{% data variables.copilot.copilot_cloud_agent %}** has a separate [configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration).

By default, the selected harness determines the editor's completions, hovers, and validation. Set `target: github-copilot` to interpret the file with the Copilot schema, or `target: vscode` to use the Local schema. The `target` field overrides file interpretation, not the harness that runs your session.

The editor identifies attributes that aren't supported by the effective target. For example, Local doesn't accept `skills` or `mcp-servers`, and Copilot doesn't accept `handoffs`, `agents`, `argument-hint`, or `advancedOptions`.

### Edit a custom agent file

Use completions and hover details in an `.agent.md` file to choose values for the intended harness. An explicit `target` overrides how the editor interprets the file, but doesn't switch your session's harness.

For {% data variables.product.prodname_copilot_short %}-assisted editing, set `target` explicitly when you need target-specific guidance. Without an explicit target, the file context supplied to {% data variables.product.prodname_copilot_short %} describes only shared attributes and doesn't suggest target-specific model or tool values. This differs from normal editor completions, which follow the selected harness.

Hover a value to inspect its details or availability. The editor refreshes validation as harness inventories change. Unknown-value hints depend on discovery completing, so the absence of a hint while discovery is pending doesn't confirm that a value is available.

Select the intended harness before editing, then try the agent in that harness to verify its behavior. Editor feedback doesn't replace checking which tools and skills the running agent can use. See [Verify your custom agent](/docs/agent-customization/custom-agents.md#verify-your-custom-agent).

## Header fields

Fields are optional unless noted. Defaults and harness-specific behavior are listed where applicable.

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | The agent's name in the UI. Defaults to the file name. |
| `description` | String | What the agent does and when to use it. Required by the Copilot schema. |
| `argument-hint` | String | Hint text that describes the input the agent expects. Shown in the Local chat input. |
| `advancedOptions` | Object | Local-only map of advanced agent options. Not supported by the Copilot schema. |
| `tools` | String or array of strings | Tools available to the agent. Tool names and supported aliases depend on the harness. User-defined tool sets are deprecated and are not supported in the Copilot harness. See [Tools](#tools). |
| `agents` | Array of strings | Custom agents available as subagents. In Local, use `['*']` or omit the field to allow all available agents, or use `[]` to prevent subagent use. Include the `agent` tool set in `tools`. See [Subagent configuration](#subagent-configuration). |
| `model` | String or array of strings | The model to use in the {% data variables.product.prodname_copilot_short %} harness. An array specifies models in preference order, using the first available model. If omitted, the currently selected model is used. Local subagents also use this field as part of their [model selection order](/docs/agents/run/subagents.md#select-the-model-for-a-subagent). |
| `model-policy` | String | Recognized by the Copilot editor schema with values `preferred` and `required`. Not forwarded when converting plugin-provided agents. See [Model preferences](#model-preferences). |
| `reasoning-effort` | String | Reasoning effort for the agent in the Copilot harness. Supported values depend on the model. Completions use the configured models' advertised capabilities, where available. See [Thinking effort](/docs/agent-customization/language-models.md#configure-thinking-effort). |
| `skills` | Array of strings | Names of skills to load into the agent's context in Copilot. Completions and hovers use the matching harness's skill inventory. See [Skills](#skills). |
| `deferred-tool-loading` | Boolean | Copilot schema field for loading tools on demand. See [conversion limits](#copilot-specific-configuration) before relying on it. |
| `strict-tools-list` | Boolean | Copilot schema field for omitting standard required tools that aren't explicitly listed. See [conversion limits](#copilot-specific-configuration) before relying on it. |
| `include-custom-instructions` | Boolean | Copilot schema field for including repository custom instructions in the agent's context. See [conversion limits](#copilot-specific-configuration) before relying on it. |
| `github` | Object | GitHub MCP configuration recognized by the Copilot schema, with `toolsets` and `permissions` properties. See [Copilot-specific configuration](#copilot-specific-configuration). |
| `user-invocable` | Boolean | Whether the agent appears in the agents dropdown in Local and Copilot. Defaults to `true`. Set to `false` to hide a subagent-only helper from the picker. |
| `disable-model-invocation` | Boolean | Whether to prevent other agents from invoking this agent as a subagent. Defaults to `false`. See [Subagent configuration](#subagent-configuration) for the Local explicit-list exception. |
| `infer` | Boolean | **Deprecated.** Use `user-invocable` and `disable-model-invocation` to control picker visibility and subagent invocation separately. |
| `target` | String | Override the harness used to interpret the file in the editor: `vscode` for Local or `github-copilot` for Copilot. Omit it to follow the selected harness. This doesn't switch the session's harness. |
| `mcp-servers` | Object or null | Agent-scoped MCP server definitions recognized by Copilot file editing. See [Copilot-specific configuration](#copilot-specific-configuration) for schema support and conversion limits. |
| `handoffs` | Array of objects | Suggested transitions to another agent after a response in Local. See [Handoff fields](#handoff-fields). |
| `hooks` | Object | Hook event map scoped to this agent. Supported by Local and Copilot, including plugin-provided agents. See [Agent-scoped hooks](/docs/agent-customization/hooks.md#agent-scoped-hooks). Local execution requires `setting(chat.useHooks)` and a trusted workspace. |

### Tools

In Copilot, `tools` supports the built-in aliases `execute`, `read`, `edit`, `search`, `agent`, `web`, and `todo`. Use `*` to select all tools.

Use completions to select available client-provided tools with their canonical qualified references, such as `browser/<tool>`, `notebook/<tool>`, and `vscode/<tool>`. Extension tools retain `<extensionId>/<tool>` references. Don't strip these prefixes or replace them with internal runtime registration names.

To include all tools published by a configured MCP server, use `<server name>/*`. A namespace's availability depends on the session's MCP inventory. Review [tool availability](/docs/agents/run/tools.md) before reusing a tool list in another harness.

In Local, `tools` can include built-in tools, MCP tools, and tools contributed by extensions. Existing user-defined tool-set references are deprecated and are not supported in Copilot. See [Replace tool sets](/docs/agent-customization/migrate-customizations.md#replace-tool-sets). Built-in aliases such as `read` and `search` are separate from user-defined tool-set files.

For example, a Local agent can combine built-in tools with an MCP server namespace:

```yaml
tools: ['read', 'search', '<server name>/*']
```

Replace `<server name>` with the name of a configured MCP server. If `tools` is omitted in Local, the tools enabled in the tools picker are available. Unavailable tools are ignored.

Local's `agent/runSubagent` reference isn't a portable delegation tool name. Copilot uses its native `task` tool for delegation. A qualified client-tool reference such as `vscode/toolSearch` is valid only when that tool is provided to the Copilot session; the prefix alone doesn't make it Local-only. Review both the tool list and instructions that require a particular tool. For compatibility checks and known editing limitations, see the [tool-discovery migration FAQ](/docs/agent-customization/migrate-customizations.md#why-does-an-agent-fail-with-a-tool-discovery-capability-error).

### Model preferences

Use the model identifiers inserted by completions for the intended harness. Copilot completions insert runtime model IDs, including exact provider-qualified IDs for BYOK models. These differ from Local's qualified model display names.

To specify a prioritized list for Copilot, replace the placeholders with available model IDs. Keep the array in your preferred order:

```yaml
model: ['<preferred model ID>', '<fallback model ID>']
```

The Copilot editor schema also recognizes `model-policy: preferred` and `model-policy: required`. Conversion of plugin-provided agents selects a model from the authored list but doesn't forward `model-policy`. Don't rely on `required` to enforce a required-model policy for those converted agents.

### Skills

In Copilot, use `skills` to name skills to load into the custom agent's context:

```yaml
skills: ['<skill name>']
```

Replace `<skill name>` with an enabled skill available to the intended Copilot harness. Completions and hovers show descriptions, sources, and availability details where provided. Disabled or temporarily unavailable skills can also appear, so review their status before selecting them.

This inventory validation is specific to Copilot files. Setting `target: vscode` uses Local interpretation instead. For skill creation and supported locations, see [Agent skills](/docs/agent-customization/agent-skills.md).

### Copilot-specific configuration

The editor provides nested completions, hovers, and structural validation for these Copilot fields:

* `github`: a `toolsets` array and a `permissions` map. GitHub MCP toolsets aren't Local user-defined tool-set files.
* `mcp-servers`: a map of server definitions, with local command-based or remote URL-based configurations. The editor checks property types, tool arrays, URLs, and positive timeouts.
* `hooks`: event maps with action arrays. Validation checks event-specific action combinations, matcher patterns, URLs, and positive timeouts. Use the [agent-scoped hook reference](/docs/agent-customization/hooks.md#agent-scoped-hooks) for runtime requirements.

Structural validation doesn't start or authenticate MCP servers, or prove that a hook executes.

> [!IMPORTANT]
> Editor schema support doesn't guarantee runtime support. When converting agent files to SDK custom-agent configuration, including plugin-provided agents, {% data variables.product.prodname_vscode_shortname %} doesn't forward `model-policy`, `mcp-servers`, `github`, `deferred-tool-loading`, `strict-tools-list`, or `include-custom-instructions`. Don't rely on those fields to configure the runtime behavior of converted agents. To make MCP tools available to a session, use the [supported MCP server configuration](/docs/agent-customization/mcp-servers.md).

### Subagent configuration

In Local, restrict a coordinator to named workers by combining `agents` with the `agent` tool set:

```yaml
tools: ['agent']
agents: ['Researcher', 'Implementer']
```

Agent names are case-sensitive. Explicitly listing an agent in `agents` permits invocation even if that worker sets `disable-model-invocation: true`. To allow a subagent to delegate further, enable `setting(chat.subagents.allowInvocationsFromSubagents)`. This also applies to an agent that lists itself. See [Nested subagents](/docs/agents/run/subagents.md#nested-subagents).

For complete coordinator and worker files, see [Delegate implementation to a worker](/docs/agents/run/subagents.md#delegate-implementation-to-a-worker).

### Visibility and invocation

To hide an agent from the picker while keeping it available for delegation:

```yaml
user-invocable: false
disable-model-invocation: false
```

These fields change the shared agent definition, not a personal visibility preference. See [Customize the agents dropdown list](/docs/agent-customization/custom-agents.md#customize-the-agents-dropdown-list).

### Handoff fields

Each object in the `handoffs` array defines a transition in the Local harness:

| Field | Type | Description |
|-------|------|-------------|
| `label` | String, required | Text on the handoff button. |
| `agent` | String, required | The target agent identifier. |
| `prompt` | String, required | The prompt to pre-fill when the user selects the handoff. |
| `send` | Boolean | Whether to submit the prompt automatically. Defaults to `false`. |
| `model` | String | Model to select for the handoff. Use the qualified name in the format `<model name> (<vendor>)`, such as `<model name> (copilot)`. |

```yaml
handoffs:
  - label: Implement Plan
    agent: agent
    prompt: Implement the plan outlined above.
    send: false
    model: <model name> (copilot)
```

Replace the model placeholder with an available model, or omit `model`. For a planning-to-implementation walkthrough, see [Handoffs](/docs/agent-customization/custom-agents.md#handoffs).

## Body

The Markdown body contains the instructions the agent follows, such as its task, guidelines, and expected output.

When you select the custom agent in the {% data variables.copilot.chat_view %}, its body instructions are added after your custom instructions and take precedence if they conflict.

### Local file and tool references

In Local, reference files with Markdown links or `#file:` syntax. Relative paths resolve from the custom agent file. Use `~` or `~/` to reference your home folder, and use Unix-style `/` separators to keep paths portable across operating systems.

```markdown
Follow the [review checklist](./review-checklist.md).
Use #file:~/copilot/security-guidelines.md for security reviews.
```

In Local, reference a tool with `#tool:<tool-name>`, such as `#tool:web/fetch`.

### Copilot body placeholders

Copilot file editing recognizes these case-sensitive placeholders:

| Placeholder | Meaning |
|-------------|---------|
| `{{cwd}}` | Current working directory. |
| `{{homedir}}` | Your home directory. |
| `{{configDir}}` | Copilot configuration directory. |
| `{{grepToolName}}` | Effective file-content search tool name. |
| `{{globToolName}}` | Effective file-globbing tool name. |
| `{{shellToolName}}` | Effective shell tool name. |
| `{{shellCommandExamples}}` | Shell-appropriate command examples. |

The editor provides completions, hovers, and highlighting for recognized placeholders and identifies unknown placeholder-like values. Local `#file:` and `#tool:` references are identified as unsupported for Copilot. Use ordinary Markdown links for file references and the `tools` frontmatter field to configure tools instead.

## Tool list priority

In Local, a prompt file's `tools` list takes precedence over the custom agent's `tools` list. Other harnesses don't load prompt files. For the full order, see [Tool list priority](/docs/agent-customization/prompt-files.md#tool-list-priority).

## Claude agent format

Agent files in `.claude/agents` use plain `.md` files and the [Claude subagents format](https://code.claude.com/docs/en/sub-agents).

| Field | Description |
|-------|-------------|
| `name` | Required unique agent identifier using lowercase letters and hyphens. |
| `description` | Required description of when to delegate to the agent. |
| `tools` | Comma-separated allowed tool names, such as `"Read, Grep, Glob, Bash"`. If omitted, the agent inherits all tools. |
| `disallowedTools` | Comma-separated tool names to block. |
| `model` | `sonnet`, `opus`, `haiku`, or `inherit` (default). |
| `permissionMode` | `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, or `plan`. |
| `skills` | Skills to load into the agent's context at startup. |
| `mcpServers` | MCP servers available to the agent. |
| `hooks` | Lifecycle hooks scoped to the agent. |
| `memory` | Persistent memory scope: `user`, `project`, or `local`. |

The Claude harness implements these fields according to its provider documentation. When Local loads a Claude-format agent, it maps supported Claude tool and model names to their {% data variables.product.prodname_vscode_shortname %} equivalents. This compatibility does not make all Claude runtime features available in Local.

## Related resources

* [Create and manage custom agents](/docs/agent-customization/custom-agents.md)
* [Use subagents](/docs/agents/run/subagents.md)
* [Configure agent hooks](/docs/agent-customization/hooks.md)
* [Compare agent harnesses](/docs/agents/run/agent-harnesses.md)
