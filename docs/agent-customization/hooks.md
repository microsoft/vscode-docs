---
ContentId: 9c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f
DateApproved: 7/15/2026
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

Hooks enable you to execute custom shell commands at key lifecycle points during agent sessions. Use hooks to automate workflows, enforce security policies, validate operations, and integrate with external tools.

Hooks are designed to work across agent types, including local agents, background agents, and cloud agents. Each hook receives structured JSON input and can return JSON output to influence agent behavior.

For background on how hooks fit into the AI customization framework, see [Customization concepts](/docs/agents/concepts/customization.md).

This article explains how to configure and use hooks in VS Code.

> [!NOTE]
> Agent hooks are currently in Preview. The configuration format and behavior might change in future releases.

> [!IMPORTANT]
> Your organization might have disabled the use of hooks in VS Code. Contact your admin for more information. See [enterprise policies](/docs/enterprise/policies.md) for details.

## Why use hooks?

Hooks provide deterministic, code-driven automation. Unlike instructions or custom prompts that guide agent behavior, hooks execute your code at specific lifecycle points with guaranteed outcomes. Some common use cases for hooks include:

* **Enforce security policies**: Block dangerous commands like `rm -rf` or `DROP TABLE` before they execute, regardless of how the agent was prompted.

* **Automate code quality**: Run formatters, linters, or tests automatically after file modifications.

* **Create audit trails**: Log every tool invocation, command execution, or file change for compliance and debugging.

* **Inject context**: Add project-specific information, API keys, or environment details to help the agent make better decisions.

* **Control approvals**: Automatically approve safe operations while requiring confirmation for sensitive ones.

## Quick start: your first hook

The following example creates a hook that runs Prettier after the agent uses a tool, such as editing a file. Create a `.github/hooks/format.json` file in your workspace:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write ."
      }
    ]
  }
}
```

After you save this file, VS Code automatically loads the hook. The next time the agent edits a file, Prettier formats your workspace. You can check that the hook executed by looking at the agent debug logs (run the **Developer: Show Agent Debug Logs** command).

This hook runs a single command and ignores its input. To build hooks that react to _what_ the agent did, such as formatting only the file that changed, see [How hooks work](#how-hooks-work) and [Usage scenarios](#usage-scenarios).

## How hooks work

When a hook event fires, VS Code runs your command and passes information about the event as a JSON object on standard input (stdin). Your command can write a JSON object to standard output (stdout) to pass context back to the agent or to control what happens next, such as blocking a tool call.

A hook has three parts:

* **An event** that determines when the hook runs (see [Hook lifecycle events](#hook-lifecycle-events)).
* **A command** that VS Code runs when the event fires.
* **Optional JSON input and output** that lets the command read event details and influence the agent.

Basic hooks, like the quick start example, ignore the input and just run a command. More advanced hooks read the JSON from stdin to make decisions. For the full set of input and output fields, see [Hook input and output](#hook-input-and-output).

## Hook lifecycle events

VS Code supports eight hook events that fire at specific points during an agent session:

| Hook Event | When It Fires | Common Use Cases |
|------------|---------------|------------------|
| [`SessionStart`](/docs/agents/reference/hooks-reference.md#sessionstart) | User submits the first prompt of a new session | Initialize resources, log session start, validate project state |
| [`UserPromptSubmit`](/docs/agents/reference/hooks-reference.md#userpromptsubmit) | User submits a prompt | Audit user requests, inject system context |
| [`PreToolUse`](/docs/agents/reference/hooks-reference.md#pretooluse) | Before agent invokes any tool | Block dangerous operations, require approval, modify tool input |
| [`PostToolUse`](/docs/agents/reference/hooks-reference.md#posttooluse) | After tool completes successfully | Run formatters, log results, trigger follow-up actions |
| [`PreCompact`](/docs/agents/reference/hooks-reference.md#precompact) | Before conversation context is compacted | Export important context, save state before truncation |
| [`SubagentStart`](/docs/agents/reference/hooks-reference.md#subagentstart) | Subagent is spawned | Track nested agent usage, initialize subagent resources |
| [`SubagentStop`](/docs/agents/reference/hooks-reference.md#subagentstop) | Subagent completes | Aggregate results, cleanup subagent resources |
| [`Stop`](/docs/agents/reference/hooks-reference.md#stop) | Agent session ends | Generate reports, cleanup resources, send notifications |

For the full input and output schema of each event, see the [Hooks reference](/docs/agents/reference/hooks-reference.md).

## Configure hooks

Hooks are configured in JSON files stored in your workspace or user directory.

### Hook file locations

VS Code searches for hook configuration files in these locations:

> [!TIP]
> In a monorepo, enable `setting(chat.useCustomizationsInParentRepositories)` to discover hooks from the parent repository root. Learn more about [parent repository discovery](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo).

| Scope | Default file location |
|-------|-----------------------|
| Workspace | `.github/hooks/*.json` |
| Workspace (Claude format) | `.claude/settings.json`, `.claude/settings.local.json` |
| User | `~/.copilot/hooks`, `~/.claude/settings.json` |
| Custom agent | `hooks` field in `.agent.md` frontmatter (see [Agent-scoped hooks](#agent-scoped-hooks)) |
| Plugin | `hooks.json` or `hooks/hooks.json`, depending on the plugin format (see [Hooks in plugins](/docs/agent-customization/agent-plugins.md#hooks-in-plugins)) |

Workspace hooks take precedence over user hooks for the same event type.

Use the `setting(chat.hookFilesLocations)` setting to customize which files are loaded. Specify folders (all `*.json` files in the folder are loaded) or individual `.json` files, using relative or tilde (`~`) paths. The default value includes these locations:

```json
"chat.hookFilesLocations": {
  ".github/hooks": true,
  ".claude/settings.local.json": true,
  ".claude/settings.json": true,
  "~/.claude/settings.json": true
}
```

To customize, add an entry for a new location, or set a path to `false` to disable a location (including the defaults):

```jsonc
"chat.hookFilesLocations": {
  "custom/hooks": true,              // load all *.json files in a folder
  "~/my-hooks/security.json": true,  // load a specific file
  ".claude/settings.json": false     // stop loading Claude Code hooks
}
```

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
        "command": "npx prettier --write ."
      }
    ]
  }
}
```

### Hook command properties

Each hook entry must specify `type: "command"` and a command to run. You can also configure a working directory (`cwd`), environment variables (`env`), a `timeout`, and OS-specific overrides (`windows`, `linux`, `osx`). For the full list of properties, see the [Hook command properties reference](/docs/agents/reference/hooks-reference.md#hook-command-properties).

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

### Agent-scoped hooks

> [!NOTE]
> Agent-scoped hooks are currently in preview.

You can define hooks directly in a [custom agent's](/docs/agent-customization/custom-agents.md) YAML frontmatter. Agent-scoped hooks only run when that custom agent is active, either selected by the user or invoked as a subagent. Agent-scoped hooks run in addition to any workspace or user-level hooks configured for the same event.

To enable agent-scoped hooks, set `setting(chat.useCustomAgentHooks)` to `true`.

Add a `hooks` field to the agent frontmatter with the same structure as hook configuration files: event names mapped to arrays of hook command objects.

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

### Create and edit hooks

You have multiple options for creating and editing hooks. You can create hook configuration files manually in one of the [supported locations](#hook-file-locations), use commands to create a new hook, or generate a hook with AI.

* **Manually manage hook files**:

    1. Create or edit a `.json` file in a supported location (for example, `.github/hooks/security.json`) and add your hook configuration.
    1. Save the file and it is automatically loaded by VS Code.

* **Use commands to manage hooks**

    1. Run the **Chat: Configure Hooks** command from the Command Palette (`kb(workbench.action.showCommands)`).

        You can also type `/hooks` in the chat input and press `kbstyle(Enter)` to open the configure hooks menu.

    1. Follow the prompts to select an event type, choose a file location, and configure the command.

    1. The command creates a new hook file and opens it in the editor for you to customize. Save the file to load the hook.

* **Use the Agent Customizations editor**:

    1. Open the Agent Customizations editor by running the **Chat: Open Customizations** command.

        Alternatively, select **Open Customizations** (gear icon) at the top of the Chat view.

    1. Select the **Hooks** tab to view and manage your hooks.

    1. Select **Configure Hooks** from the dropdown button.

    1. Follow the prompts to select an event type, choose a file location, and configure the command.

    1. The command creates a new hook file and opens it in the editor for you to customize. Save the file to load the hook.

* **Generate a hook with AI**:

    1. Type `/create-hook` in chat and describe the automation you want (for example, `/create-hook run ESLint after every file edit`).

        Alternatively, run the **Chat: Generate Hook** command from the Command Palette (`kb(workbench.action.showCommands)`) or select **Generate Hook** in the Agent Customizations editor.

    1. The agent asks clarifying questions and generates a hook configuration file with the appropriate event type, command, and settings.

## Hook input and output

Hooks communicate with VS Code through stdin (input) and stdout (output) using JSON.

### Common input fields

Every hook receives a JSON object via stdin with these common fields:

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | string | ISO 8601 timestamp when the hook fired |
| `cwd` | string | (Optional) Working directory for the agent session |
| `session_id` | string | (Optional) Unique identifier for the current agent session |
| `hook_event_name` | string | Name of the hook event (for example, `PreToolUse`) |
| `transcript_path` | string | (Optional) Absolute path to a file containing the session conversation transcript |

> [!NOTE]
> `transcript_path` is provided for convenience — for example, logging, auditing, or lightweight checks such as whether a file was read during the session. The transcript file format is not a stable hook API and may change in future VS Code releases. Prefer the documented hook input fields (`tool_name`, `tool_input`, `prompt`, and so on) whenever possible.

### Common output format

Hooks can return JSON via stdout to influence agent behavior. All hooks support these output fields:

```json
{
  "continue": true,
  "stopReason": "Security policy violation",
  "systemMessage": "Unit tests failed"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `continue` | boolean | Set to `false` to stop processing (default: `true`) |
| `stopReason` | string | Reason for stopping, when `continue` is `false` (shown to the user) |
| `systemMessage` | string | Warning message displayed to the user |

### Exit codes

The hook's exit code determines how VS Code handles the result:

| Exit Code | Behavior |
|-----------|----------|
| `0` | Success: parse stdout as JSON |
| `2` | Blocking error: stop processing and show error to model |
| Other | Non-blocking warning: show warning to user, continue processing |

### Choosing how to return data

Hooks have several ways to control agent behavior: exit codes, top-level output fields (`continue`, `stopReason`), and hook-specific output fields (`hookSpecificOutput`). Use them in combination as follows:

* **Exit code 2** is the simplest way to block an operation. The hook's stderr is shown to the model as context. No JSON output is needed.
* **`continue: false`** in the JSON output stops the entire agent session. Use `stopReason` to tell the user why. This is more drastic than blocking a single tool call.
* **`hookSpecificOutput`** provides fine-grained control specific to each hook event. For example, `PreToolUse` hooks use `permissionDecision` to allow, deny, or prompt for a single tool call without stopping the session.
* **`systemMessage`** displays a warning to the user in the chat, regardless of other decisions.

When multiple control mechanisms are used together, the most restrictive wins. For example, if a hook returns `continue: false` and `permissionDecision: "allow"`, the session still stops.

### Per-event input and output

Each hook event provides its own input fields and supports event-specific output. For the full input and output schema of every event, including `PreToolUse`, `PostToolUse`, `SessionStart`, `Stop`, and more, see the [Hooks reference](/docs/agents/reference/hooks-reference.md).

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

1. Select **View Logs** to view all logs.

1. Look for "Load Hooks" to see loaded hooks and which locations they were loaded from.

### View hook output

To review hook output and errors:

1. Open the **Output** panel.

1. Select **GitHub Copilot Chat Hooks** from the channel list.

> [!TIP]
> You can also run the **Developer: Show Agent Debug Logs** command to view hook input and output in the agent debug logs.

### Common issues

**Hook not executing**: Verify the hook file is in `.github/hooks/` and has a `.json` extension. Check that the `type` property is set to `"command"`.

**Permission denied errors**: Ensure your hook scripts have execute permissions (`chmod +x script.sh`).

**Timeout errors**: Increase the `timeout` value or optimize your hook script. The default is 30 seconds.

**JSON parse errors**: Verify your hook script outputs valid JSON to stdout. Use `jq` or a JSON library to construct output.

## Frequently asked questions

### How does VS Code handle Claude Code hook configurations?

VS Code reads hook configurations from `.claude/settings.json`, `.claude/settings.local.json`, and `~/.claude/settings.json` by default. VS Code parses Claude Code's hook configuration format, including matcher syntax. Currently, VS Code ignores matcher values, so hooks run on all tool invocations regardless of the matcher.

If you are adapting a Claude Code hook for VS Code, be aware of the following differences:

* **Tool input property names**: Claude Code uses snake_case for tool input properties (for example, `tool_input.file_path`), while VS Code tools use camelCase (for example, `tool_input.filePath`). Update your hook scripts to read the correct property names.
* **Tool names**: Claude Code and VS Code use different tool names. For example, Claude Code uses `Write` and `Edit` for file operations, while VS Code uses tool names like `create_file` and `replace_string_in_file`. Check the tool name in the `tool_name` input field and update your hook logic accordingly.
* **Matchers are ignored**: Hook matchers like `"Edit|Write"` are parsed but not applied. All hooks run on every matching event, regardless of the tool name in the matcher.

### How does VS Code handle Copilot CLI hook configurations?

VS Code parses Copilot CLI hook configurations and converts the lowerCamelCase hook event names (like `preToolUse`) to the PascalCase format used by VS Code (`PreToolUse`). The `bash` and `powershell` command properties are mapped to OS-specific commands: `powershell` maps to `windows`, and `bash` maps to `osx` and `linux`.

## Security considerations

> [!CAUTION]
> Hooks execute shell commands with the same permissions as VS Code. Review hook configurations carefully, especially when using hooks from untrusted sources.

* **Review hook scripts**: Inspect all hook scripts before enabling them, especially in shared repositories.

* **Limit hook permissions**: Use the principle of least privilege. Hooks should only have access to what they need.

* **Validate input**: Hook scripts receive input from the agent. Validate and sanitize all input to prevent injection attacks.

* **Secure credentials**: Never hardcode secrets in hook scripts. Use environment variables or secure credential storage.

## Related resources

* [Use tools in chat](/docs/chat/chat-tools.md) - Learn about tool approval and execution
* [Custom agents](/docs/agent-customization/custom-agents.md) - Create specialized agent configurations
* [Subagents](/docs/agents/subagents.md) - Delegate tasks to context-isolated subagents
* [Security considerations](/docs/agents/security.md) - Best practices for AI security in VS Code
