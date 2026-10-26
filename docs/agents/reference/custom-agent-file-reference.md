---
ContentId: 30510047-1b9d-4df0-ba48-308f514f3592
DateApproved: 10/28/2026
MetaDescription: Look up custom agent file syntax, frontmatter fields, defaults, and harness-specific configuration in {% data variables.product.prodname_vscode_shortname %}.
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

This article describes custom agent file syntax, frontmatter fields, and harness-specific configuration in {% data variables.product.prodname_vscode_shortname %}. For creation steps, file locations, and a complete starter example, see [Create and manage custom agents](/docs/agent-customization/custom-agents.md).

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

## Harness compatibility

The selected [agent harness](/docs/agents/run/agent-harnesses.md) determines which fields and tool names take effect. A shared file location does not imply identical behavior across harnesses.

* **Local** supports the {% data variables.product.prodname_vscode_shortname %} tool names, subagent configuration, handoffs, and agent-scoped hooks described below.
* **Copilot** supports custom agent configuration through its runtime. Use the field-specific guidance below and the [Copilot custom agent documentation](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents). Local handoffs do not apply. Agent-scoped hooks have a current [plugin-agent conversion limitation](/docs/agent-customization/hooks.md#agent-scoped-hooks).
* **Claude** uses its own [agent format](#claude-agent-format) and runtime behavior.
* **{% data variables.copilot.copilot_cloud_agent %}** has a separate [configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration). The `target: github-copilot` value refers to that target, not the **Copilot** harness selected in {% data variables.product.prodname_vscode_shortname %}.

## Header fields

All fields in this table are optional. Defaults and harness-specific behavior are listed where applicable.

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | The agent's name in the UI. Defaults to the file name. |
| `description` | String | What the agent does and when to use it. |
| `argument-hint` | String | Hint text that describes the input the agent expects. Shown in the Local chat input. |
| `tools` | String or array of strings | Tools available to the agent. Tool names and supported aliases depend on the harness. User-defined tool sets are deprecated and are not supported in the Copilot harness. See [Tools](#tools). |
| `agents` | Array of strings | Custom agents available as subagents. In Local, use `['*']` or omit the field to allow all available agents, or use `[]` to prevent subagent use. Include the `agent` tool set in `tools`. See [Subagent configuration](#subagent-configuration). |
| `model` | String or array of strings | The model to use in the {% data variables.product.prodname_copilot_short %} harness. An array specifies models in preference order, using the first available model. If omitted, the currently selected model is used. Local subagents also use this field as part of their [model selection order](/docs/agents/run/subagents.md#select-the-model-for-a-subagent). |
| `reasoning-effort` | String | Reasoning effort for the agent in the Copilot harness: `low`, `medium`, `high`, `xhigh`, or `max`. Availability depends on the selected model. See [Thinking effort](/docs/agent-customization/language-models.md#configure-thinking-effort). |
| `user-invocable` | Boolean | Whether the agent appears in the agents dropdown in Local and Copilot. Defaults to `true`. Set to `false` to hide a subagent-only helper from the picker. |
| `disable-model-invocation` | Boolean | Whether to prevent other agents from invoking this agent as a subagent. Defaults to `false`. See [Subagent configuration](#subagent-configuration) for the Local explicit-list exception. |
| `infer` | Boolean | **Deprecated.** Use `user-invocable` and `disable-model-invocation` to control picker visibility and subagent invocation separately. |
| `target` | String | The target environment for the file: `vscode` or `github-copilot`. This is not the harness selector. |
| `mcp-servers` | Object | MCP server configurations for [custom agents in {% data variables.copilot.copilot_cloud_agent %}](https://docs.github.com/en/copilot/reference/custom-agents-configuration). Not used by custom agents in {% data variables.product.prodname_vscode_shortname %}. |
| `handoffs` | Array of objects | Suggested transitions to another agent after a response in Local. See [Handoff fields](#handoff-fields). |
| `hooks` | Object | Hook event map scoped to this agent. The Copilot harness supports agent-scoped hooks, but {% data variables.product.prodname_vscode_shortname %} currently omits this field when converting plugin-provided agents. Retain the definition and leave the affected migration incomplete. See the [conversion limitation](/docs/agent-customization/hooks.md#agent-scoped-hooks). Local execution requires `setting(chat.useHooks)` and a trusted workspace. |

### Tools

In Local, `tools` can include built-in tools, MCP tools, and tools contributed by extensions. Existing user-defined tool-set references are deprecated and are not supported in the Copilot harness. See [Replace tool sets](/docs/agent-customization/migrate-customizations.md#replace-tool-sets). Built-in aliases such as `read` and `search` are separate from user-defined tool-set files. To include all tools from an MCP server, use `<server name>/*`.

```yaml
tools: ['read', 'search', '<server name>/*']
```

Replace `<server name>` with the name of a configured MCP server. If `tools` is omitted in Local, the tools enabled in the tools picker are available. Unavailable tools are ignored.

For Copilot and other harnesses, check [tool availability](/docs/agents/run/tools.md) before reusing a Local agent's tool list.

Local references such as `agent/runSubagent` and `vscode/toolSearch` are not portable tool names. Copilot uses its native `task` tool for delegation, and its tool-discovery capability depends on the session's available tools. Review the tool list and any instructions that require a particular tool, rather than only moving the agent file. For compatibility checks and related open issues, see the [tool-discovery migration FAQ](/docs/agent-customization/migrate-customizations.md#why-does-an-agent-fail-with-a-tool-discovery-capability-error).

### Model preferences

To specify a prioritized list, replace the placeholders with model names available in your harness:

```yaml
model: ['<preferred model>', '<fallback model>']
```

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

Reference files with Markdown links or `#file:` syntax. Relative paths resolve from the custom agent file. Use `~` or `~/` to reference your home folder, and use Unix-style `/` separators to keep paths portable across operating systems.

```markdown
Follow the [review checklist](./review-checklist.md).
Use #file:~/copilot/security-guidelines.md for security reviews.
```

In Local, reference a tool with `#tool:<tool-name>`, such as `#tool:web/fetch`.

When you select the custom agent in the {% data variables.copilot.chat_view %}, its body instructions are added after your custom instructions and take precedence if they conflict.

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
