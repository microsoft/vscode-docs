---
ContentId: 1f6b2d94-7c3a-4e85-9a1d-5b8c0e2f7a63
DateApproved: 9/16/2026
MetaDescription: Look up Local harness hook configuration and event schemas in {% data variables.product.prodname_vscode %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- hooks
- reference
- preToolUse
- postToolUse
- lifecycle
---

# Local hooks reference

This article is the configuration and event-schema reference for hooks in the **Local** harness in {% data variables.product.prodname_vscode_shortname %}. The Local harness runs in the extension host and uses the PascalCase event names and payloads documented here.

For hooks executed by a provider harness, use the corresponding provider documentation:

* For **Copilot** sessions on Agent Host, use the [GitHub Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference).
* For **Claude** sessions, use the [Claude hooks reference](https://code.claude.com/docs/en/hooks).
* For **Codex** sessions, use the [Codex hooks documentation](https://developers.openai.com/codex/hooks/).

If Local is the selected session target, use this reference even when the hook file uses a Copilot or Claude-compatible format. The Local parser maps the configuration and then sends the Local payloads documented here.

For help choosing a runtime, creating a hook, or migrating an existing hook, see [Configure agent hooks](/docs/agent-customization/hooks.md).

## Configuration format

A Local hook file contains a `hooks` object. Each property is a supported event name and its value is an array of command entries:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "windows": "powershell -File scripts\\validate-tool.ps1",
        "timeout": 15
      }
    ]
  }
}
```

### Command properties

In the native Local format, each command entry must have `type: "command"` and at least one command property:

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Must be `"command"`. |
| `command` | string | Default cross-platform command. |
| `windows` | string | Windows-specific command override. |
| `linux` | string | Linux-specific command override. |
| `osx` | string | macOS-specific command override. |
| `cwd` | string | Working directory, relative to the repository root. |
| `env` | object | Additional environment variables. |
| `timeout` | number | Timeout in seconds. The default is 30 seconds. |

The Local harness selects an operating system override from the extension host platform. If an override is not defined for that platform, it uses `command`. Copilot and Claude source formats use different property names and defaults before the Local parser maps them to this format.

## Common input

Every Local hook receives a JSON object on standard input (stdin). The object contains these common fields in addition to the fields for the event:

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | string | ISO 8601 timestamp for when the hook fired. |
| `cwd` | string | Optional working directory for the agent execution. |
| `session_id` | string | Optional identifier for the current agent session. |
| `hook_event_name` | string | Hook event name, such as `PreToolUse`. |
| `transcript_path` | string | Optional absolute path to a file that contains the conversation transcript. |

> [!NOTE]
> The transcript file format is not a stable hook API and might change between {% data variables.product.prodname_vscode_shortname %} releases. Use documented event fields such as `tool_name`, `tool_input`, or `prompt` when possible.

## Common output

A Local hook can write a JSON object to standard output (stdout). All events support these top-level fields:

```json
{
  "continue": false,
  "stopReason": "Security policy violation",
  "systemMessage": "Review the hook result."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `continue` | boolean | Whether processing continues. The default is `true`. Set to `false` to stop the agent execution. |
| `stopReason` | string | Reason shown to the user when `continue` is `false`. |
| `systemMessage` | string | Warning message shown to the user. |

Events can also support fields such as `decision` or `hookSpecificOutput`. The event sections describe those fields.

### Exit codes

The hook command's exit code controls how the Local harness processes its result:

| Exit code | Behavior |
|-----------|----------|
| `0` | Treat the command as successful and process stdout. |
| `2` | Treat stderr as a blocking error and provide it to the model. |
| Any other value | Show a non-blocking warning to the user and continue processing. |

### Choose a control mechanism

Use the least disruptive output that meets the requirement:

* Use exit code `2` to block the current operation and provide stderr to the model.
* Use `continue: false` with `stopReason` to stop the entire agent execution.
* Use `hookSpecificOutput` for event-specific control, such as denying one tool call or adding context.
* Use `systemMessage` to show a warning without changing the event decision.

When outputs conflict, the most restrictive outcome takes precedence. For example, `continue: false` stops the agent execution even if a `PreToolUse` output also permits the tool call.

## `PreToolUse`

The `PreToolUse` hook fires before the Local agent invokes a tool.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "tool_name": "<local-tool-name>",
  "tool_input": {},
  "tool_use_id": "tool-123"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `tool_name` | string | Name of the Local tool. |
| `tool_input` | object | Arguments for the tool call. |
| `tool_use_id` | string | Identifier for the tool call. |

Tool names and input schemas differ between harnesses. Open the [agent debug logs](/docs/agents/agent-troubleshooting/chat-debug-view.md#agent-debug-logs-panel) to inspect the Local tool schema before you filter or modify a tool call.

### Output

Use `hookSpecificOutput` to control the tool call:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive command blocked by policy.",
    "additionalContext": "Production files are read-only."
  }
}
```

| Field | Values or type | Description |
|-------|----------------|-------------|
| `hookEventName` | `"PreToolUse"` | Identifies the event-specific output. |
| `permissionDecision` | `"allow"`, `"deny"`, or `"ask"` | Allows the tool call, denies it, or requires user confirmation. |
| `permissionDecisionReason` | string | Reason shown to the user. |
| `updatedInput` | object | Optional replacement tool input. The value must match the Local tool schema. |
| `additionalContext` | string | Additional context for the model. |

When multiple hooks return a permission decision for the same tool call, the most restrictive decision wins:

1. `deny` blocks the tool call.
1. `ask` requires user confirmation.
1. `allow` approves the tool call.

If `updatedInput` does not match the Local tool schema, the Local harness ignores it.

## `PostToolUse`

The `PostToolUse` hook fires after a Local tool completes successfully.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "tool_name": "<local-tool-name>",
  "tool_input": {},
  "tool_use_id": "tool-123",
  "tool_response": "<tool-result>"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `tool_name` | string | Name of the Local tool. |
| `tool_input` | object | Arguments for the tool call. |
| `tool_use_id` | string | Identifier for the tool call. |
| `tool_response` | string or object | Result returned by the tool. |

### Output

The hook can add context or block further processing:

```json
{
  "decision": "block",
  "reason": "Post-processing validation failed.",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "The edited file has lint errors."
  }
}
```

| Field | Values or type | Description |
|-------|----------------|-------------|
| `decision` | `"block"` | Optional decision that blocks further processing. |
| `reason` | string | Reason provided to the model when processing is blocked. |
| `hookSpecificOutput.hookEventName` | `"PostToolUse"` | Identifies the event-specific output. |
| `hookSpecificOutput.additionalContext` | string | Additional context for the model. |

## `UserPromptSubmit`

The `UserPromptSubmit` hook fires when the user submits a prompt.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "prompt": "Add input validation to the sign-up form."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `prompt` | string | Text submitted by the user. |

The hook supports the [common output](#common-output).

## `SessionStart`

The `SessionStart` hook fires when the first prompt starts a Local agent session.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "source": "new"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `source` | string | How the session started. Currently always `"new"`. |

### Output

The hook can add context to the conversation:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project: my-app 2.1.0 | Branch: main"
  }
}
```

| Field | Values or type | Description |
|-------|----------------|-------------|
| `hookEventName` | `"SessionStart"` | Identifies the event-specific output. |
| `additionalContext` | string | Context added to the conversation. |

## `Stop`

The `Stop` hook fires when the current Local agent execution is about to stop. The event does not indicate that the session ended or became inactive.

When a custom agent runs as a subagent, its `Stop` hook is treated as `SubagentStop`.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "stop_hook_active": false
}
```

| Field | Type | Description |
|-------|------|-------------|
| `stop_hook_active` | boolean | `true` when the agent is already continuing because a previous `Stop` hook blocked it. |

### Output

The hook can require the agent to continue:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "decision": "block",
    "reason": "Run the test suite before finishing."
  }
}
```

| Field | Values or type | Description |
|-------|----------------|-------------|
| `hookEventName` | `"Stop"` | Identifies the event-specific output. |
| `decision` | `"block"` | Prevents the agent execution from stopping. |
| `reason` | string | Required when `decision` is `"block"`. Explains why the agent should continue. |

> [!IMPORTANT]
> When a `Stop` hook blocks the agent, the additional turns consume [AI credits](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals). Check `stop_hook_active` to prevent the agent from continuing indefinitely.

## `SubagentStart`

The `SubagentStart` hook fires when the Local agent starts a subagent.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "agent_id": "subagent-456",
  "agent_type": "Plan"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `agent_id` | string | Identifier for the subagent. |
| `agent_type` | string | Agent name, such as `"Plan"` or a custom agent name. |

### Output

The hook can add context to the subagent:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SubagentStart",
    "additionalContext": "Follow the project coding guidelines."
  }
}
```

| Field | Values or type | Description |
|-------|----------------|-------------|
| `hookEventName` | `"SubagentStart"` | Identifies the event-specific output. |
| `additionalContext` | string | Context added to the subagent conversation. |

## `SubagentStop`

The `SubagentStop` hook fires when a Local subagent is about to stop.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "agent_id": "subagent-456",
  "agent_type": "Plan",
  "stop_hook_active": false
}
```

| Field | Type | Description |
|-------|------|-------------|
| `agent_id` | string | Identifier for the subagent. |
| `agent_type` | string | Agent name, such as `"Plan"` or a custom agent name. |
| `stop_hook_active` | boolean | `true` when the subagent is already continuing because a previous `SubagentStop` hook blocked it. |

### Output

The hook can require the subagent to continue:

```json
{
  "decision": "block",
  "reason": "Verify the results before completing."
}
```

| Field | Values or type | Description |
|-------|----------------|-------------|
| `decision` | `"block"` | Prevents the subagent from stopping. |
| `reason` | string | Required when `decision` is `"block"`. Explains why the subagent should continue. |

## `PreCompact`

The `PreCompact` hook fires before the Local harness compacts conversation context.

### Input

In addition to the [common input](#common-input), the hook receives:

```json
{
  "trigger": "auto"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `trigger` | string | How compaction started. The value is `"auto"` when the conversation exceeds the prompt budget. |

The hook supports the [common output](#common-output).

## Related resources

* [Configure agent hooks](/docs/agent-customization/hooks.md)
* [Create custom agents](/docs/agent-customization/custom-agents.md)
* [Use subagents](/docs/agents/run/subagents.md)
