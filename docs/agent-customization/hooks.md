---
ContentId: 9c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f
DateApproved: 9/16/2026
MetaDescription: Configure agent hooks in {% data variables.product.prodname_vscode_shortname %} for Local, Copilot, Claude, and Codex agent sessions.
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

# Configure agent hooks in {% data variables.product.prodname_vscode %} (Preview)

Hooks run custom actions at specific points in an agent's lifecycle. Use hooks to automate workflows, validate operations, create audit trails, or enforce policies independently of the language model.

The selected [agent harness](/docs/agents/concepts/agent-harnesses.md) determines which hook implementation runs. Before you create or reuse a hook, identify the session target and use the configuration and event schema for that harness.

This article helps you choose the correct hook implementation, manage hooks from {% data variables.product.prodname_vscode_shortname %}, and configure hooks for the Local harness.

> [!NOTE]
> The {% data variables.product.prodname_vscode_shortname %} hooks experience is in Preview. Individual provider implementations might have a different lifecycle status. For example, hooks in the {% data variables.copilot.copilot_sdk_short %} are generally available.

> [!IMPORTANT]
> Your organization might restrict which hooks can run. Contact your administrator for more information. Administrators can learn how to [manage hooks in enterprise environments](/docs/enterprise/ai-settings.md#enable-or-disable-hooks).

## Choose the hook implementation for your session

The **Session Target** control selects the agent harness. The harness owns the hook lifecycle and payloads.

The Agent Host is the process that hosts the Copilot, Claude, and Codex harnesses. The Local harness runs in the extension host. The {% data variables.copilot.chat_view %} and {% data variables.copilot.agents_window %} are clients that display and control sessions on either host.

| Session target | Where the harness runs | Hook implementation | Configuration and event reference |
|----------------|------------------------|---------------------|-----------------------------------|
| **Local** | Extension host | {% data variables.product.prodname_vscode_shortname %} Local hooks | Use the [Local configuration](#configure-hooks-for-the-local-harness) in this article and the [Local hooks reference](/docs/agents/reference/hooks-reference.md). |
| **Copilot** | Agent Host | Shared {% data variables.copilot.copilot_sdk_short %} implementation | Use the [GitHub Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference). |
| **Claude** | Agent Host | Claude Agent SDK | Use the [Claude hooks reference](https://code.claude.com/docs/en/hooks). |
| **Codex** | Agent Host or the Codex extension | Codex runtime | Use the [Codex hooks documentation](https://developers.openai.com/codex/hooks/). |
| **Cloud** | Provider infrastructure | Selected cloud agent | Use the provider documentation. For {% data variables.copilot.copilot_cloud_agent %}, see the [GitHub Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference). |

Some harnesses discover the same hook files, such as `.github/hooks/*.json` or `.claude/settings.json`. This file compatibility does not make their behavior identical. Supported events, event names, matchers, command properties, tool names, payloads, and output decisions can differ.

Copilot sessions on Agent Host use the same SDK hook implementation as {% data variables.copilot.copilot_cli_short %}. Use the {% data variables.copilot.copilot_cli_short %} sections of the GitHub reference for runtime configuration and payloads, but verify that the event is available in the selected {% data variables.product.prodname_vscode_shortname %} version.

### Migrate hooks between harnesses

Before you switch the session target for an existing workflow:

* Confirm that the destination harness discovers the hook file.
* Compare the supported events and command properties.
* Check tool names and input shapes before you reuse filters or validation logic.
* Validate scripts that read chat transcripts. Transcript formats are not a stable cross-harness API.
* Test output decisions, such as blocking a tool call or adding context.
* Confirm where the hook command runs and which files and environment variables it can access.

Do not validate a migration by changing only the language model. Select the destination harness from the **Session Target** control and start a test session.

## Create and manage hooks

Select the session target before you open the hooks interface. This ensures that {% data variables.product.prodname_vscode_shortname %} shows the customizations for the intended harness.

To view and manage hooks:

1. Open the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}.

1. Select the target from the **Session Target** control.

1. Open the Agent Customizations editor:

    * In the {% data variables.copilot.chat_view %}, select **Configure Chat** (gear icon) and then select **Hooks**.
    * In the {% data variables.copilot.agents_window %}, select **Hooks** in the **Customizations** panel.
    * Enter `/hooks` in the chat input.

1. Review the hook sources for the selected target. Select a hook to open its configuration.

You can also run **Chat: Configure Hooks** from the Command Palette (`kb(workbench.action.showCommands)`) to manage Local hook files.

To generate a hook with AI, enter `/create-hook <description>` in chat or run **Chat: Generate Hook** from the Command Palette. The generated hook uses `.github/hooks/`. Review the result against the destination harness reference before you use it.

For Claude and Codex, use the provider documentation for additional configuration and management options.

## Configure hooks for the Local harness

The rest of this article describes the Local hook implementation that runs in the extension host. These events, settings, payloads, and output decisions do not automatically apply to Copilot, Claude, or Codex sessions on Agent Host.

### Create your first Local hook

The following hook records the name of every tool before the Local agent invokes it. Create `.github/hooks/audit.json` in your workspace:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "node .github/hooks/log-tool-use.cjs"
      }
    ]
  }
}
```

Create `.github/hooks/log-tool-use.cjs`:

```javascript
const fs = require('node:fs');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const event = JSON.parse(input);
  fs.appendFileSync(
    '.github/hooks/tool-use.log',
    `${event.timestamp} ${event.tool_name}\n`
  );
});
```

Start a Local agent session and ask the agent to perform a task that uses tools. The hook adds each tool name to `.github/hooks/tool-use.log`. Add this log file to `.gitignore` if you don't want to commit it.

This example also helps you discover the exact Local tool names to use in validation hooks. Tool names and arguments differ between harnesses.

### Local hook file locations

The Local harness discovers hooks from these built-in locations:

| Scope | File location | Notes |
|-------|---------------|-------|
| Workspace | `.github/hooks/*.json` | Native {% data variables.product.prodname_vscode_shortname %} or Copilot-compatible hook files. |
| Workspace, Claude format | `.claude/settings.json`, `.claude/settings.local.json` | Requires `setting(chat.useClaudeHooks)`, which is off by default. |
| User | `~/.copilot/hooks/*.json` | Available across Local sessions. |
| User, Claude format | `~/.claude/settings.json` | Requires `setting(chat.useClaudeHooks)`. |
| Custom agent | `hooks` in `.agent.md` frontmatter | Runs only for that custom agent in the Local harness. |
| Plugin | `hooks.json` or `hooks/hooks.json`, depending on the plugin format | See [hooks in plugins](/docs/agent-customization/agent-plugins.md#hooks-in-plugins). |

The `setting(chat.useHooks)` setting controls Local hook execution and is on by default. Workspace hook files are subject to [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

Use `setting(chat.hookFilesLocations)` to add or disable Local hook locations. The setting's default value is empty because the built-in locations are registered separately. Specify a folder to load all its `*.json` files, or specify an individual `.json` file. Paths can be relative to the workspace or start with `~`.

```jsonc
"chat.hookFilesLocations": {
  "custom/hooks": true,              // Load all JSON hook files in this folder.
  "~/my-hooks/security.json": true,  // Load one hook file.
  ".claude/settings.json": false     // Disable a built-in location.
}
```

> [!TIP]
> In a monorepo, enable `setting(chat.useCustomizationsInParentRepositories)` to discover hooks from the parent repository root. Learn more about [parent repository discovery](/docs/agent-customization/overview.md#use-customizations-in-a-monorepo).

### Local hook configuration formats

For new Local hooks, use a JSON file with PascalCase event names and command properties:

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

The Local parser also accepts other hook file formats:

| Source format | How Local recognizes it | Local behavior to review |
|---------------|-------------------------|--------------------------|
| Native {% data variables.product.prodname_vscode_shortname %} | PascalCase events without a numeric `version` property | Uses `command`, `windows`, `linux`, `osx`, and `timeout`. |
| Copilot | Numeric `version` property and lower camel case events | Maps Copilot event and command property names to the Local format. Runtime payloads still use the Local schema. |
| Claude | A `settings.json` or `settings.local.json` file in a `.claude` folder | Requires `setting(chat.useClaudeHooks)`. Local parses nested commands but ignores matcher values, so every command for the event runs. |

For the complete Local command properties, input fields, output fields, and exit-code behavior, see the [Local hooks reference](/docs/agents/reference/hooks-reference.md).

> [!NOTE]
> An operating system override is selected from the extension host platform. In Remote Development windows, this platform might differ from the operating system that displays the {% data variables.product.prodname_vscode_shortname %} UI.

### Local hook lifecycle events

The Local harness supports these events:

| Event | When it fires | Common uses |
|-------|---------------|-------------|
| [`SessionStart`](/docs/agents/reference/hooks-reference.md#sessionstart) | The first prompt starts a session. | Initialize resources or add project context. |
| [`UserPromptSubmit`](/docs/agents/reference/hooks-reference.md#userpromptsubmit) | The user submits a prompt. | Audit requests or add context. |
| [`PreToolUse`](/docs/agents/reference/hooks-reference.md#pretooluse) | Before the agent invokes a tool. | Block an operation, request approval, or change tool input. |
| [`PostToolUse`](/docs/agents/reference/hooks-reference.md#posttooluse) | After a tool completes successfully. | Validate results, run a formatter, or add context. |
| [`PreCompact`](/docs/agents/reference/hooks-reference.md#precompact) | Before conversation context is compacted. | Save state that should survive compaction. |
| [`SubagentStart`](/docs/agents/reference/hooks-reference.md#subagentstart) | A subagent starts. | Track nested agent use or add subagent context. |
| [`SubagentStop`](/docs/agents/reference/hooks-reference.md#subagentstop) | A subagent is about to stop. | Validate subagent results or require more work. |
| [`Stop`](/docs/agents/reference/hooks-reference.md#stop) | The current agent execution is about to stop. | Validate completion or require another action. |

When an event fires, the Local harness passes a JSON object to the command through standard input (stdin). The command can write JSON to standard output (stdout) to add context or control the next action. The event does not necessarily correspond to the end of the entire session.

### Agent-scoped hooks for Local

> [!NOTE]
> Agent-scoped hooks are in Preview and are supported only by the Local harness.

Add a `hooks` map to a [custom agent](/docs/agent-customization/custom-agents.md) to run commands only while that agent is active. Agent-scoped hooks run in addition to applicable user, workspace, and plugin hooks.

```markdown
---
name: Strict Formatter
description: Format code after the agent uses a tool
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/format-changed-files.sh"
---

Follow the project's formatting requirements.
```

When the custom agent runs as a subagent, its `Stop` hook is treated as `SubagentStop`. Agent-scoped hooks require `setting(chat.useHooks)` and a trusted workspace.

### Local hook examples

<details>
<summary>Request approval for a specific tool</summary>

First, use the audit hook in the [quick start](#create-your-first-local-hook) or the agent debug logs to identify the exact Local tool name and input schema.

Create `.github/hooks/approval.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "node .github/hooks/require-approval.cjs",
        "env": {
          "SENSITIVE_TOOL_NAME": "<tool-name>"
        }
      }
    ]
  }
}
```

Create `.github/hooks/require-approval.cjs`:

```javascript
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const event = JSON.parse(input);
  const decision = event.tool_name === process.env.SENSITIVE_TOOL_NAME
    ? {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason: 'This tool requires manual approval.'
        }
      }
    : { continue: true };

  process.stdout.write(JSON.stringify(decision));
});
```

Replace `<tool-name>` with the exact Local tool name. Do not copy a tool name from another harness.

</details>

<details>
<summary>Add project context when a session starts</summary>

Create `.github/hooks/context.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "node .github/hooks/project-context.cjs"
      }
    ]
  }
}
```

Create `.github/hooks/project-context.cjs`:

```javascript
const packageJson = require('../../package.json');

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: `Project: ${packageJson.name} ${packageJson.version}`
  }
}));
```

</details>

## Troubleshoot hooks

First, confirm that the session target matches the hook reference you followed. A hook that appears in the Agent Customizations editor might still use different events or payloads when you switch harnesses.

For Local hooks:

* Run **Chat: Configure Hooks** to check which files the Local harness discovers.
* Open the [agent debug logs](/docs/agents/agent-troubleshooting/chat-debug-view.md#agent-debug-logs-panel) to inspect event names, tool schemas, hook input, and hook output.
* Open the **Output** panel and select the **GitHub Copilot Chat Hooks** channel to review command output and errors.
* Verify that `setting(chat.useHooks)` is enabled and the workspace is trusted.
* If you use a Claude-format file, enable `setting(chat.useClaudeHooks)` and remember that Local ignores matcher values.
* Increase `timeout` only after you confirm that the command is making progress.

For Agent Host harnesses, use the provider's hook reference and diagnostics. The Local settings `setting(chat.useHooks)`, `setting(chat.hookFilesLocations)`, and `setting(chat.useClaudeHooks)` do not configure Copilot, Claude, or Codex hook execution.

## Security considerations

> [!CAUTION]
> Hooks execute code with the permissions of their harness process. Review every hook and referenced script before you run it, especially in a shared repository or plugin.

* Treat hook configuration and scripts as executable code.
* Require approval before an agent edits a script that a later hook can execute.
* Validate all JSON input before you use values in a shell command.
* Give hook commands only the file, process, and network access they need.
* Store credentials in approved secret storage. Do not place secrets in hook configuration, scripts, output, or agent context.
* Review the trust and policy model for the selected harness. These controls are not portable across runtimes.

## Related resources

* [Local hooks reference](/docs/agents/reference/hooks-reference.md)
* [Choose and use an agent harness](/docs/agents/run/agent-harnesses.md)
* [Security considerations for AI agents](/docs/agents/run/security.md)
