---
ContentId: 9c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f
DateApproved: 02/09/2026
MetaDescription: Learn how to use hooks in VS Code to execute custom shell commands at key lifecycle points during agent sessions for automation, validation, and policy enforcement.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- hooks
- automation
- lifecycle
- preToolUse
- postToolUse
---

# Agent hooks in Visual Studio Code (Preview)

Hooks enable you to execute custom shell commands at key lifecycle points during agent sessions. Use hooks to automate workflows, enforce security policies, validate operations, and integrate with external tools. Hooks run deterministically and can control agent behavior, including blocking tool execution or injecting context into the conversation.

> [!NOTE]
> Agent hooks are currently in Preview for VS Code 1.109.3. The configuration format and behavior might change in future releases.

> [!IMPORTANT]
> Your organization might have disabled the use of hooks in VS Code. Contact your admin for more information. See [enterprise policies](/docs/enterprise/policies.md) for details.

Hooks are designed to work across agent types, including local agents, background agents, and cloud agents. Each hook receives structured JSON input and can return JSON output to influence agent behavior.

## Why use hooks?

Hooks provide deterministic, code-driven automation. Unlike instructions or custom prompts that guide agent behavior, hooks execute your code at specific lifecycle points with guaranteed outcomes:

* **Enforce security policies**: Block dangerous commands like `rm -rf` or `DROP TABLE` before they execute, regardless of how the agent was prompted.

* **Automate code quality**: Run formatters, linters, or tests automatically after file modifications.

* **Create audit trails**: Log every tool invocation, command execution, or file change for compliance and debugging.

* **Inject context**: Add project-specific information, API keys, or environment details to help the agent make better decisions.

* **Control approvals**: Automatically approve safe operations while requiring confirmation for sensitive ones.

## Hook lifecycle events

VS Code supports eight hook events that fire at specific points during an agent session:

| Hook Event | When It Fires | Common Use Cases |
|------------|---------------|------------------|
| `SessionStart` | User submits the first prompt of a new session | Initialize resources, log session start, validate project state |
| `UserPromptSubmit` | User submits a prompt | Audit user requests, inject system context |
| `PreToolUse` | Before agent invokes any tool | Block dangerous operations, require approval, modify tool input |
| `PostToolUse` | After tool completes successfully | Run formatters, log results, trigger follow-up actions |
| `PreCompact` | Before conversation context is compacted | Export important context, save state before truncation |
| `SubagentStart` | Subagent is spawned | Track nested agent usage, initialize subagent resources |
| `SubagentStop` | Subagent completes | Aggregate results, cleanup subagent resources |
| `Stop` | Agent session ends | Generate reports, cleanup resources, send notifications |

## Configure hooks

Hooks are configured in JSON files stored in your workspace or user directory.

### Hook file locations

VS Code searches for hook configuration files in these locations:

* **Workspace**: `.github/hooks/*.json` - Project-specific hooks shared with your team
* **Workspace**: `.claude/settings.local.json` - Local workspace hooks (not committed)
* **Workspace**: `.claude/settings.json` - Workspace-level hooks
* **User**: `~/.claude/settings.json` - Personal hooks applied across all workspaces

Workspace hooks take precedence over user hooks for the same event type.

### Hook configuration format

Create a JSON file with a `hooks` object containing arrays of hook commands for each event type. VS Code uses the same hook format as Claude Code and Copilot CLI for compatibility:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

### Hook command properties

Each hook entry must have `type: "command"` and at least one command property:

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Must be `"command"` |
| `command` | string | Default command to run (cross-platform) |
| `windows` | string | Windows-specific command override |
| `linux` | string | Linux-specific command override |
| `osx` | string | macOS-specific command override |
| `cwd` | string | Working directory (relative to repository root) |
| `env` | object | Additional environment variables |
| `timeout` | number | Timeout in seconds (default: 30) |

> [!NOTE]
> OS-specific commands are selected based on the extension host platform. In remote development scenarios (SSH, Containers, WSL), this might differ from your local operating system.

### OS-specific commands

Specify different commands for each operating system:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/format.sh",
        "windows": "powershell -File scripts\\format.ps1",
        "linux": "./scripts/format-linux.sh",
        "osx": "./scripts/format-mac.sh"
      }
    ]
  }
}
```

The execution service selects the appropriate command based on your OS. If no OS-specific command is defined, it falls back to the `command` property.

## Hook input and output

Hooks communicate with VS Code through stdin (input) and stdout (output) using JSON.

### Common input fields

Every hook receives a JSON object via stdin with these common fields:

```json
{
  "timestamp": "2026-02-09T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "session-identifier",
  "hookEventName": "PreToolUse",
  "transcript_path": "/path/to/transcript.json"
}
```

### Common output format

Hooks can return JSON via stdout to influence agent behavior. All hooks support these output fields:

```json
{
  "continue": true,
  "stopReason": "Security policy violation",
  "systemMessage": "Operation blocked by security hook"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `continue` | boolean | Set to `false` to stop processing (default: `true`) |
| `stopReason` | string | Reason for stopping (shown to the model) |
| `systemMessage` | string | Message displayed to the user |

### Exit codes

The hook's exit code determines how VS Code handles the result:

| Exit Code | Behavior |
|-----------|----------|
| `0` | Success: parse stdout as JSON |
| `2` | Blocking error: stop processing and show error to model |
| Other | Non-blocking warning: show warning to user, continue processing |

## PreToolUse

The `PreToolUse` hook fires before the agent invokes a tool.

### PreToolUse input

In addition to the common fields, `PreToolUse` hooks receive:

```json
{
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123"
}
```

### PreToolUse output

The `PreToolUse` hook can control tool execution through a `hookSpecificOutput` object:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive command blocked by policy",
    "updatedInput": { "files": ["src/safe.ts"] },
    "additionalContext": "User has read-only access to production files"
  }
}
```

| Field | Values | Description |
|-------|--------|-------------|
| `permissionDecision` | `"allow"`, `"deny"`, `"ask"` | Controls tool approval |
| `permissionDecisionReason` | string | Reason shown to user |
| `updatedInput` | object | Modified tool input (optional) |
| `additionalContext` | string | Extra context for the model |

**Permission decision priority**: When multiple hooks run for the same tool invocation, the most restrictive decision wins:
1. `deny` (most restrictive): blocks tool execution
2. `ask`: requires user confirmation
3. `allow` (least restrictive): auto-approves execution

**`updatedInput` format**: To determine the format of `updatedInput`, run the command "Show Chat Debug View" and find the logged tool schema. If `updatedInput` doesn't match the expected schema, it will be ignored.

## PostToolUse

The `PostToolUse` hook fires after a tool completes successfully.

### PostToolUse input

In addition to the common fields, `PostToolUse` hooks receive:

```json
{
  "tool_name": "editFiles",
  "tool_input": { "files": ["src/main.ts"] },
  "tool_use_id": "tool-123",
  "tool_response": "File edited successfully"
}
```

### PostToolUse output

The `PostToolUse` hook can provide additional context to the model, or block further processing:

```json
{
  "decision": "block",
  "reason": "Post-processing validation failed",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "The edited file has lint errors that need to be fixed"
  }
}
```

| Field | Values | Description |
|-------|--------|-------------|
| `decision` | `"block"` | Block further processing (optional) |
| `reason` | string | Reason for blocking (shown to the model) |
| `hookSpecificOutput.additionalContext` | string | Extra context injected into the conversation |

## UserPromptSubmit

The `UserPromptSubmit` hook fires when the user submits a prompt.

### UserPromptSubmit input

In addition to the common fields, `UserPromptSubmit` hooks receive a `prompt` field with the text the user submitted.

The `UserPromptSubmit` hook uses the common output format only.

## SessionStart

The `SessionStart` hook fires when a new agent session begins.

### SessionStart input

In addition to the common fields, `SessionStart` hooks receive:

```json
{
  "source": "new"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `source` | string | How the session was started. Currently always `"new"`. |

### SessionStart output

The `SessionStart` hook can inject additional context into the agent's conversation:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project: my-app v2.1.0 | Branch: main | Node: v20.11.0"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `additionalContext` | string | Context added to the agent's conversation |

## Stop

The `Stop` hook fires when the agent session ends.

### Stop input

In addition to the common fields, `Stop` hooks receive:

```json
{
  "stop_hook_active": false
}
```

| Field | Type | Description |
|-------|------|-------------|
| `stop_hook_active` | boolean | `true` when the agent is already continuing as a result of a previous stop hook. Check this value to prevent the agent from running indefinitely. |

### Stop output

The `Stop` hook can prevent the agent from stopping:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "Stop",
    "decision": "block",
    "reason": "Run the test suite before finishing"
  }
}
```

| Field | Values | Description |
|-------|--------|-------------|
| `decision` | `"block"` | Prevent the agent from stopping |
| `reason` | string | Required when decision is `"block"`. Tells the agent why it should continue. |

> [!IMPORTANT]
> When a `Stop` hook blocks the agent from stopping, the agent continues running and the additional turns consume [premium requests](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests). Always check the `stop_hook_active` field to prevent the agent from running indefinitely.

## SubagentStart

The `SubagentStart` hook fires when a subagent is spawned.

### SubagentStart input

In addition to the common fields, `SubagentStart` hooks receive:

```json
{
  "agent_id": "subagent-456",
  "agent_type": "Plan"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `agent_id` | string | Unique identifier for the subagent |
| `agent_type` | string | The agent name (for example, `"Plan"` for built-in agents or custom agent names) |

### SubagentStart output

The `SubagentStart` hook can inject additional context into the subagent's conversation:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SubagentStart",
    "additionalContext": "This subagent should follow the project coding guidelines"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `additionalContext` | string | Context added to the subagent's conversation |

## SubagentStop

The `SubagentStop` hook fires when a subagent completes.

### SubagentStop input

In addition to the common fields, `SubagentStop` hooks receive:

```json
{
  "agent_id": "subagent-456",
  "agent_type": "Plan",
  "stop_hook_active": false
}
```

| Field | Type | Description |
|-------|------|-------------|
| `agent_id` | string | Unique identifier for the subagent |
| `agent_type` | string | The agent name (for example, `"Plan"` for built-in agents or custom agent names) |
| `stop_hook_active` | boolean | `true` when the subagent is already continuing as a result of a previous stop hook. Check this value to prevent the subagent from running indefinitely. |

### SubagentStop output

The `SubagentStop` hook can prevent the subagent from stopping:

```json
{
  "decision": "block",
  "reason": "Verify subagent results before completing"
}
```

| Field | Values | Description |
|-------|--------|-------------|
| `decision` | `"block"` | Prevent the subagent from stopping |
| `reason` | string | Required when decision is `"block"`. Tells the subagent why it should continue. |

## PreCompact

The `PreCompact` hook fires before conversation context is compacted.

### PreCompact input

In addition to the common fields, `PreCompact` hooks receive:

```json
{
  "trigger": "auto"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `trigger` | string | How the compaction was triggered. `"auto"` when the conversation is too long for the prompt budget. |

The `PreCompact` hook uses the common output format only.

## Configure hooks with the /hooks command

Use the `/hooks` slash command in chat to configure hooks through an interactive UI:

1. Type `/hooks` in the chat input and press `kbstyle(Enter)`.

1. Select a hook event type from the list.

1. Choose an existing hook to edit or select **Add new hook** to create one.

1. Select or create a hook configuration file.

The command opens the hook file in the editor with your cursor positioned at the command field, ready for editing.

## Usage scenarios

The following examples demonstrate common hook patterns.

<details>
<summary>Block dangerous terminal commands</summary>

Create a `PreToolUse` hook that prevents destructive commands:

**.github/hooks/security.json**:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/block-dangerous.sh",
        "timeoutSec": 5
      }
    ]
  }
}
```

**scripts/block-dangerous.sh**:
```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input')

if [ "$TOOL_NAME" = "runTerminalCommand" ]; then
  COMMAND=$(echo "$TOOL_INPUT" | jq -r '.command // empty')

  if echo "$COMMAND" | grep -qE '(rm\s+-rf|DROP\s+TABLE|DELETE\s+FROM)'; then
    echo '{"hookSpecificOutput":{"permissionDecision":"deny","permissionDecisionReason":"Destructive command blocked by security policy"}}'
    exit 0
  fi
fi

echo '{"continue":true}'
```

</details>

<details>
<summary>Auto-format code after edits</summary>

Run Prettier automatically after any file modification:

**.github/hooks/formatting.json**:
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "./scripts/format-changed-files.sh",
        "windows": "powershell -File scripts\\format-changed-files.ps1",
        "timeout": 30
      }
    ]
  }
}
```

**scripts/format-changed-files.sh**:
```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

if [ "$TOOL_NAME" = "editFiles" ] || [ "$TOOL_NAME" = "createFile" ]; then
  FILES=$(echo "$INPUT" | jq -r '.tool_input.files[]? // .tool_input.path // empty')

  for FILE in $FILES; do
    if [ -f "$FILE" ]; then
      npx prettier --write "$FILE" 2>/dev/null
    fi
  done
fi

echo '{"continue":true}'
```

</details>

<details>
<summary>Log tool usage for auditing</summary>

Create an audit trail of all tool invocations:

**.github/hooks/audit.json**:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/log-tool-use.sh",
        "env": {
          "AUDIT_LOG": ".github/hooks/audit.log"
        }
      }
    ]
  }
}
```

**scripts/log-tool-use.sh**:
```bash
#!/bin/bash
INPUT=$(cat)
TIMESTAMP=$(echo "$INPUT" | jq -r '.timestamp')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
SESSION_ID=$(echo "$INPUT" | jq -r '.sessionId')

echo "[$TIMESTAMP] Session: $SESSION_ID, Tool: $TOOL_NAME" >> "${AUDIT_LOG:-audit.log}"
echo '{"continue":true}'
```

</details>

<details>
<summary>Require approval for specific tools</summary>

Force manual confirmation for tools that modify infrastructure:

**.github/hooks/approval.json**:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/require-approval.sh"
      }
    ]
  }
}
```

**scripts/require-approval.sh**:
```bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')

# Tools that should always require approval
SENSITIVE_TOOLS="runTerminalCommand|deleteFile|pushToGitHub"

if echo "$TOOL_NAME" | grep -qE "^($SENSITIVE_TOOLS)$"; then
  echo '{"hookSpecificOutput":{"permissionDecision":"ask","permissionDecisionReason":"This operation requires manual approval"}}'
else
  echo '{"hookSpecificOutput":{"permissionDecision":"allow"}}'
fi
```

</details>

<details>
<summary>Inject project context at session start</summary>

Provide project-specific information when a session begins:

**.github/hooks/context.json**:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "./scripts/inject-context.sh"
      }
    ]
  }
}
```

**scripts/inject-context.sh**:
```bash
#!/bin/bash
PROJECT_INFO=$(cat package.json 2>/dev/null | jq -r '.name + " v" + .version' || echo "Unknown project")
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")

cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project: $PROJECT_INFO | Branch: $BRANCH | Node: $(node -v 2>/dev/null || echo 'not installed')"
  }
}
EOF
```

</details>

## Safety

If the agent has access to edit scripts run by hooks, then it has the ability to modify those scripts during its own run, and execute the code it writes. We recommend using the `chat.tools.edits.autoApprove` to disallow the agent from editing hook scripts without manual approval.

## Troubleshooting

### View hook diagnostics

To see which hooks are loaded and check for configuration errors:

1. Right-click in the Chat view and select **Diagnostics**.

1. Look for the hooks section to see loaded hooks and any validation errors.

### View hook output

To review hook output and errors:

1. Open the **Output** panel.

1. Select **GitHub Copilot Chat Hooks** from the channel list.

### Common issues

**Hook not executing**: Verify the hook file is in `.github/hooks/` and has a `.json` extension. Check that the `type` property is set to `"command"`.

**Permission denied errors**: Ensure your hook scripts have execute permissions (`chmod +x script.sh`).

**Timeout errors**: Increase the `timeout` value or optimize your hook script. The default is 30 seconds.

**JSON parse errors**: Verify your hook script outputs valid JSON to stdout. Use `jq` or a JSON library to construct output.

## Frequently asked questions

### How does VS Code handle Claude Code hook configurations?

VS Code parses Claude Code's hook configuration format, including matcher syntax. Currently, VS Code ignores matcher values, so hooks apply to all tools. Claude Code uses an empty string matcher (`""`) to represent all tools.

### How does VS Code handle Copilot CLI hook configurations?

VS Code parses Copilot CLI hook configurations and converts the lowerCamelCase hook event names (like `preToolUse`) to the PascalCase format used by VS Code (`PreToolUse`). Both `bash` and `powershell` command formats are supported.

## Security considerations

> [!CAUTION]
> Hooks execute shell commands with the same permissions as VS Code. Review hook configurations carefully, especially when using hooks from untrusted sources.

* **Review hook scripts**: Inspect all hook scripts before enabling them, especially in shared repositories.

* **Limit hook permissions**: Use the principle of least privilege. Hooks should only have access to what they need.

* **Validate input**: Hook scripts receive input from the agent. Validate and sanitize all input to prevent injection attacks.

* **Secure credentials**: Never hardcode secrets in hook scripts. Use environment variables or secure credential storage.

## Related resources

* [Use tools with agents](/docs/copilot/agents/agent-tools.md) - Learn about tool approval and execution
* [Custom agents](/docs/copilot/customization/custom-agents.md) - Create specialized agent configurations
* [Subagents](/docs/copilot/agents/subagents.md) - Delegate tasks to context-isolated subagents
* [Security considerations](/docs/copilot/security.md) - Best practices for AI security in VS Code
