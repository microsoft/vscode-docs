---
ContentId: 5e55509e-3fe2-4475-b85c-2b20fdd6c24d
DateApproved: 10/21/2026
FeatureStatus: user-customization-migration
MetaDescription: Migrate hooks and other customizations and replace deprecated integrations in {% data variables.product.prodname_vscode_shortname %}.
Keywords:
- copilot
- ai
- agents
- customization
- migration
- agent host
- mcp
- prompt files
- custom agents
- instructions
- skills
- hooks
---
# Migrate customizations to the Copilot harness in {% data variables.product.prodname_vscode_shortname %}

Move existing customizations to the Copilot harness, including customizations that require manual changes. When {% data variables.product.prodname_vscode_shortname %} shows a customization migration notice, use the migration list to move or convert the detected files, settings, or MCP servers.

This article covers supported migrations, [manual hook migration](#migrate-hooks), and replacements for [deprecated tool sets](#replace-tool-sets) and [chat participants](#replace-chat-participants). Hooks can come from user folders, settings, repositories, custom agents, or plugins. These manual migrations do not appear as automatic conversions in the migration list.

> [!NOTE]
> This article covers migration to the Copilot harness. For the Claude or Codex harness, use the locations and formats in the provider documentation.
>
> Claude and Codex harnesses are disabled when [{% data variables.product.prodname_copilot_short %} enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability). Contact the IT team that deployed the settings to discuss access.

## Open the migration list

A notice appears in chat when a workspace requires customization migrations. Select **Review Migrations** to open the list of migrations. To directy open the list of migrations:

1. In the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}, select **Copilot** as the **Session Target**.
1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).
1. Select **Migrations**.

The migration tree groups the detected work by workspace and user scope.

Choose how to handle the migration:

* **Migrate**: select items in a group, review or change the destination when available, and select **Migrate**. {% data variables.product.prodname_vscode_shortname %} performs the supported file move or conversion.
* **Migrate with Agent**: start a guided migration in chat for customizations that need semantic changes or repository work. This action uses Copilot credits. The agent creates a recovery bundle, preserves source files by default, and asks separately before it cleans up the source. For workspace migrations, it can prepare a pull request.
* **Review**: open an item under **Needs manual review** to understand why it cannot migrate automatically and edit its source configuration.

Use **Ignore** from a migration group's actions when you do not want to handle that group now. Select **Show Ignored Migrations** to restore ignored groups.

Before you migrate:

* Commit or back up workspace files that you might change.
* Review the source and destination shown for each item.
* Remember that the original and migrated copies do not synchronize.
* If you do not maintain the repository, use **Migrate with Agent** to prepare a pull request, or ask a repository maintainer to make the change.

You only need to migrate each item once. Keep the original until you verify the migrated customization, and then remove it when you no longer need it.

## Why migration is needed

The Copilot harness reads customizations from Copilot folders and portable formats. If a customization is stored in your {% data variables.product.prodname_vscode_shortname %} profile or a location configured through `chat.*FilesLocations` settings, move it to a supported location to use it in a Copilot harness session.

> [!NOTE]
> **For Local harness sessions:** The agent reads {% data variables.product.prodname_vscode_shortname %} profile customizations and the additional locations configured through those settings. Moving a customization for the Copilot harness doesn't change which sources the Local harness reads.

Moving customizations to those locations has these benefits:

* The Copilot harness can load them directly without relying on an editor to provide them.
* Workspace customizations stay with the repository and can be shared through source control.
* {% data variables.product.prodname_vscode_shortname %} and {% data variables.copilot.copilot_cli %} read the same Copilot customization files. The {% data variables.copilot.github_copilot_app %} also uses repository and Copilot CLI skills and MCP server configuration.
* You can remove old location settings and avoid maintaining duplicate copies.

The destination depends on the migration type and scope. User-data migrations stay at user scope. Workspace migrations stay with the workspace. The migration tree shows the destination selected for each group.

For a complete list of customization types and supported locations, see the [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet). Learn how these customizations appear in the [{% data variables.copilot.github_copilot_app %}](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app).

## Migrate MCP servers

MCP server migration moves compatible configurations to files that the Copilot harness reads directly:

| Existing configuration | Destination |
|------------------------|-------------|
| Workspace `.vscode/mcp.json` | `.mcp.json` at the corresponding workspace root |
| {% data variables.product.prodname_vscode_shortname %} profile `mcp.json` | `$COPILOT_HOME/mcp-config.json`, or `~/.copilot/mcp-config.json` when `COPILOT_HOME` is not set |

The automatic migration writes workspace servers to `.mcp.json` at the workspace root. Commit the file to source control when your team should share the configuration. For a remote or Dev Container session, paths and user configuration belong to the machine or container where the agent runs.

To migrate MCP servers:

1. Expand the **MCP Servers** group for the workspace or your profile.
1. Select the servers you want to migrate.
1. Review the source, destination, and any properties that the destination format cannot preserve.
1. Select **Migrate** for the group. You can also open one server and select **Migrate** from its detail page.
1. Open the destination file and test the server with the Copilot harness.

{% data variables.product.prodname_vscode_shortname %} writes and verifies each destination entry before removing the migrated entry from its source file. Unselected servers and servers that cannot be migrated stay in their current files.

A migration with changes can remove {% data variables.product.prodname_vscode_shortname %}-specific metadata, including registry update information, version metadata, development-mode behavior, or per-server sandbox settings. The migration page lists the changes for each server.

> [!IMPORTANT]
> Disabled state is not stored in `.mcp.json` or `mcp-config.json`. {% data variables.product.prodname_vscode_shortname %} preserves workspace disablement in the current profile when possible, but user-level disablement can be lost. Other Copilot clients and other machines can treat the migrated server as enabled. Review the server's enabled state in each client before use.

Servers that cannot migrate automatically appear under **Needs manual review**. Select **Review** to open the server details and the source configuration. Resolve configuration errors, missing values, or duplicate server names, and then retry. You can also use **Migrate with Agent** for guided help. For MCP formats and supported locations, see the [MCP configuration reference](/docs/agents/reference/mcp-configuration.md#configuration-file).

### Check MCP values before migration

Use the following table to decide whether a server can migrate automatically and what to review.

| Source configuration | Migration result | What to do |
|----------------------|------------------|------------|
| Standard `command`, `args`, `env`, `url`, and `headers` values | Migrates automatically and adds `tools: ["*"]` | Inspect the server's tools. Replace `*` with the specific tools Copilot should invoke when you do not want every server tool available. |
| `${workspaceFolder}`, `${workspaceRoot}`, `${workspaceFolderBasename}`, `${workspaceRootFolderName}`, `${cwd}`, or `${pathSeparator}` | Migrates after {% data variables.product.prodname_vscode_shortname %} resolves the variable and writes its current value | Review the resulting value before you share the destination file or use it on another machine. |
| `gallery`, `version`, `dev`, or `sandboxEnabled` | Migrates with changes and removes these properties | Review the migration warning. Decide how to handle updates, development behavior, or sandboxing after migration. |
| `${input:...}`, `${config:...}`, `${command:...}`, or other interactive {% data variables.product.prodname_vscode_shortname %} variables | Does not migrate automatically | Reconfigure the value for the Copilot harness. Do not copy a resolved secret into the MCP file. |
| `${env:NAME}` | Does not migrate automatically | Use `$NAME`, `${NAME}`, or `${NAME:-default}`, and define the variable in the environment used to start the agent. |
| `cwd` | Does not migrate automatically | Add `cwd` manually only when the server requires it, and verify the path on the machine where the agent runs. |
| `envFile` | Does not migrate automatically | Export the required variables in the environment used to start the agent and reference them from `env`. Do not copy secret values into the MCP file. |
| SSE transport | Does not migrate automatically | Use `type: "sse"` only when the server does not support Streamable HTTP. SSE is deprecated. |
| A VS Code `oauth` object | Does not migrate automatically | Remove the nested object to use OAuth discovery, or translate supported client settings to the flat Copilot OAuth fields. Authenticate when Copilot prompts you. |
| Environment variables with `null` values | Does not migrate automatically | Remove the entry or provide a supported value. |
| Additional VS Code-specific properties | Does not migrate automatically | Remove or replace the unsupported property before you retry. |
| A different server with the same name in the destination or another workspace root | Migration stops without changing the source | Rename or remove the conflicting server, and then retry. |

Input variables need special attention. The {% data variables.product.prodname_vscode_shortname %} MCP format can prompt for values such as API keys through `${input:api-key}`. The Copilot MCP format does not use this {% data variables.product.prodname_vscode_shortname %} input flow, so these servers require manual configuration.

> [!IMPORTANT]
> VS Code per-server sandbox settings and top-level `sandbox` rules do not transfer to the Copilot harness configuration. The Copilot harness uses session-level sandbox settings. Local stdio MCP servers run in the Copilot harness sandbox only when local sandboxing and MCP server sandboxing are enabled. Remote HTTP and SSE servers are not locally sandboxed. Review these settings before enabling a migrated server.

When a server requires manual work:

1. Keep the original configuration until the Copilot server starts and provides the expected tools.
1. Open the source configuration and identify each unsupported field or variable.
1. Follow the [Copilot CLI MCP server guidance](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers) for the destination configuration.
1. Decide how to provide secrets, authentication, or environment-specific paths. Do not copy sensitive values into a committed file.
1. Test the server with the Copilot harness before you remove the original entry.

## Convert prompt files to skills

Copilot harness sessions use [agent skills](/docs/agent-customization/agent-skills.md) for reusable workflows and do not load `*.prompt.md` files. Convert workspace and user prompt files to skills to use those workflows with the Copilot harness. Prompt files remain supported in Local harness sessions.

> [!IMPORTANT]
> Converting a workspace prompt to a project skill changes how the Copilot harness can use it. A prompt file runs only when someone invokes it. The Copilot harness can select a committed skill automatically in {% data variables.product.prodname_vscode_shortname %}, {% data variables.copilot.copilot_cli %}, the {% data variables.copilot.github_copilot_app %}, Copilot cloud agent, and Copilot code review. Review the skill's description and instructions with the repository maintainer before you commit it. Convert a personal workflow to a user skill instead.

To convert prompt files:

1. Expand **Convert Prompt to Skills** for the workspace or your profile.
1. Select the prompt files to convert.
1. Review the source and destination. Open a prompt if you want to inspect it.
1. Select **Migrate**.

The generated skill includes `disable-model-invocation: true`, so it remains an explicitly invoked workflow. Conversion maps the prompt file's `name`, `description`, and argument guidance to the skill. It does not preserve prompt-specific `agent`, `model`, or `tools` selection. {% data variables.product.prodname_vscode_shortname %} lists omitted properties after migration. If the prompt depends on a specific agent, model, or tool set, use **Migrate with Agent** to create a corresponding custom agent or adapt the workflow.

Test each skill before you remove the old prompt file.

## Move user agents and instructions

The Copilot harness does not read custom agents and instructions stored in {% data variables.product.prodname_vscode_shortname %} profile user data. User customization migration copies agents to `~/.copilot/agents` and instructions to `~/.copilot/instructions` without changing their names, types, or contents.

To move user customizations:

1. Expand **User Data** under **Your profile**.
1. Select the custom agents and instructions to move.
1. Review the user destination shown for the group.
1. Select **Migrate**.

The migrated files are not included in [Settings Sync](/docs/configure/settings-sync.md).

After migration, start a Copilot harness session and verify that the agents and instructions are available. See [custom agent locations](/docs/agent-customization/custom-agents.md#custom-agent-file-locations) and [instruction file locations](/docs/agent-customization/custom-instructions.md#instructions-file-locations) for the supported destinations.

## Move customizations from configured locations

The following settings add file locations for the Local harness, but the Copilot harness does not read them:

* `setting(chat.agentFilesLocations)`
* `setting(chat.modeFilesLocations)`
* `setting(chat.instructionsFilesLocations)`
* `setting(chat.agentSkillsLocations)`

Location migration moves detected custom agents, instructions, and skills to the Copilot folders for their scope:

| Customization | Workspace destination | User destination |
|---------------|-----------------------|------------------|
| Custom agents | `.github/agents` | `~/.copilot/agents` |
| Instructions | `.github/instructions` | `~/.copilot/instructions` |
| Skills | `.github/skills` or `.agents/skills` | `~/.copilot/skills` or `~/.agents/skills` |

To migrate custom locations:

1. Expand **Custom location settings** for the workspace or your profile.
1. Select the agents, instructions, and skills to move.
1. Review or change the destination for the group.
1. Select **Migrate**.

Prompt files from `setting(chat.promptFilesLocations)` are handled by [prompt file migration](#convert-prompt-files-to-skills), not location migration.

This migration applies only to the deprecated {% data variables.product.prodname_vscode_shortname %} `chat.*FilesLocations` settings. {% data variables.copilot.copilot_cli %} separately supports additional instruction directories through `COPILOT_CUSTOM_INSTRUCTIONS_DIRS`. {% data variables.product.prodname_vscode_shortname %} does not migrate or clear that environment variable.

## Customizations without automatic migration

The migration list does not automatically convert every customization type:

* **Custom agents with Local harness-specific behavior**: use **Migrate with Agent** when an agent depends on Local harness tool names, tool sets, hooks, or other behavior that needs semantic changes.
* **Tool sets**: deprecated and not supported in the Copilot harness. [Replace tool-set references](#replace-tool-sets) with tools configured for the workflow.
* **Chat participants**: deprecated and not supported in the Copilot harness. [Replace participant capabilities](#replace-chat-participants) with plugins that combine skills, MCP tools, and, when needed, MCP Apps.
* **Hooks**: there is no automatic hook migration. Follow [Migrate hooks](#migrate-hooks) to review discovery, command configuration, script inputs, and output decisions.
* **Plugins and marketplaces**: manage these separately from the migration list. See [Discover and install plugins](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins).
* **Extension-provided customizations**: extensions can provide tools, MCP servers, custom agents, skills, and instructions. Keep the contributing extension installed. Extension tools are available only in editor chat while the extension runs. Learn how to [manage extension tools for the Copilot harness](/docs/agents/run/tools.md#add-extension-tools-for-the-copilot-harness).

## Migrate hooks

Migrate a hook's configuration **and** its script. A file can load in the Copilot harness while its script no longer matches a tool, reads the wrong arguments, or returns an output the destination does not use. Copying a file or changing an event name alone does not verify a migration.

This procedure applies to personal hooks as well as shared hooks. {% data variables.product.prodname_vscode_shortname %}, the {% data variables.copilot.github_copilot_app %}, and {% data variables.copilot.copilot_cli %} use the same Copilot harness and hook format. The migration is from the older Local hook contract to that shared contract, not to a command-line tool.

The [Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) documents the shared configuration and command-hook payloads. The [Local hooks reference](/docs/agents/reference/hooks-reference.md) describes the source format for an existing Local hook.

### Prepare hooks for migration

Before editing a configuration or starting a Copilot session:

1. Back up the original configuration **and** its scripts, including user settings that are not in source control.
1. Record which hooks are enabled, disabled, or excluded by Local discovery settings. `chat.useHooks`, `chat.useClaudeHooks`, and `chat.hookFilesLocations` do not preserve those choices in the Copilot harness. A previously ignored file can become active without being moved.
1. Keep unvalidated configurations outside discovered sources. For example, stage a standalone file with a `.json.disabled` suffix, and use a new script filename rather than overwriting the original. For inline settings, prepare the new `hooks` entries separately before merging them.
1. Preserve intentionally disabled hooks using the destination's controls. Do not activate the original and converted configurations together.

For standalone Copilot hook files, top-level `disableAllHooks: true` skips only the hooks in that file. In repository Copilot settings, the same property skips hooks from all non-policy sources for that repository. Policy hooks are not disabled by this control. See [disabling hooks](https://docs.github.com/en/copilot/reference/hooks-reference#disable-all-hooks), and coordinate managed-hook changes with your administrator.

### Find every hook source

Inventory each configuration and the scripts it invokes before changing anything. Preserve personal hooks at user scope and shared hooks with their repository or plugin.

| Source | What to review for the Copilot harness |
|--------|---------------------------------------|
| Repository hook files | Use `.github/hooks/*.json` at the repository root. Review the script paths as well as the JSON. |
| User hook files | Use `*.json` files under `~/.copilot/hooks/`, or `%USERPROFILE%\.copilot\hooks\` on Windows. Copilot uses `$COPILOT_HOME/hooks/` when `COPILOT_HOME` is set. Check the destination process's home directory. |
| Additional Local locations | `chat.hookFilesLocations` does not configure Copilot discovery. Move the configuration and its dependencies to a supported source, or package shared hooks in a plugin. |
| Repository settings | The Copilot harness reads an inline `hooks` map from `.github/copilot/settings.json` and `.github/copilot/settings.local.json`. It also reads repository `.claude/settings.json` and `.claude/settings.local.json`. Preserve other settings; do not replace a settings file with a standalone hook-file envelope. |
| User settings | Copilot reads inline hooks from `~/.copilot/settings.json`, not `~/.copilot/config.json`. Do not assume a Local hook in `~/.claude/settings.json` is discovered by Copilot. Move it to a documented Copilot user source. |
| Custom agent frontmatter | Review the agent's `hooks` map and the [agent-scoped hook contract](https://docs.github.com/en/copilot/reference/hooks-reference#agent-scoped-hooks). {% data variables.product.prodname_vscode_shortname %} currently drops this field when converting plugin-provided agents. For those agents, keep the hook definition but leave its migration incomplete; see the [conversion limitation](/docs/agent-customization/hooks.md#agent-scoped-hooks). Copilot also excludes scoped hooks from remote or organization-hosted agent definitions. |
| Installed plugins | Update the plugin's source package or obtain an updated version from its publisher. Do not patch an installation cache. Keep scripts with the plugin and review its path variables, events, and payloads. See [hooks in plugins](/docs/agents/reference/agent-plugin-reference.md#hooks-in-plugins). |
| Administrator-managed hooks | Coordinate changes with the administrator. Policy hooks and managed plugin hooks have different discovery and trust rules from personal files. See [enterprise hook controls](/docs/enterprise/manage-ai-settings.md#enable-or-disable-hooks). |

The Copilot harness combines applicable hooks from multiple sources; adding a repository copy does not replace a user or plugin copy. Avoid running both the original and migrated hook. For a shared setup used across repositories, consider distributing the converted hooks and scripts in a plugin rather than copying them into each repository.

Plugin-wide hooks and hooks in a plugin-provided agent's frontmatter are separate configurations. Packaging an agent does not work around the conversion limitation for its scoped hooks. Do not broaden a scoped hook to plugin-wide or repository-wide execution merely to make it run.

### Compare configuration and script contracts

The following table compares the [Local implementation](https://github.com/microsoft/vscode/blob/1.142.0/src/vs/workbench/contrib/chat/common/promptSyntax/hookSchema.ts) with the documented [Copilot command-hook contract](https://docs.github.com/en/copilot/reference/hooks-reference#command-hooks). Compatibility aliases do not make the two execution environments identical.

| Area | Existing Local hook | Copilot migration action |
|------|---------------------|--------------------------|
| File format | A `hooks` event map, commonly with PascalCase names. Local also accepts Copilot event and command aliases. | Use the documented standalone JSON format with `version: 1`, or an inline `hooks` map in a supported settings file. |
| Command selection | `command`, with `windows`, `linux`, and `osx` overrides. Local also accepts `bash` and `powershell`. | Standalone command hooks document `command` as a fallback and `bash` or `powershell` as platform commands. Preserve separate Linux and macOS behavior in a script if needed. Agent-scoped hooks also document `windows`, `linux`, and `osx`; do not assume identical field support for every source. |
| Arguments | Event data arrives on stdin, not as positional command arguments. | Continue reading JSON from stdin. `exec` with `args` is a separate, shell-free invocation option, not an event-payload mapping. Do not combine it with shell command fields. |
| Working directory | Relative `cwd` resolves from the workspace root; Local also resolves absolute paths and `~`. | Copilot supports repository-relative or absolute `cwd`. Recheck paths when moving a user hook, plugin, or workspace to a remote host or worktree. |
| Environment | `env` adds values to the extension host's inherited environment. | Review the destination's inherited variables and documented expansion rules. Neither `env` nor `cwd` grants additional sandbox access. |
| Timeout | Default 30 seconds. Local prefers `timeout` over `timeoutSec` if both are present. | Default 30 seconds. Copilot prefers `timeoutSec` over its `timeout` alias. Specify only one field. |
| Common input | ISO timestamp, `session_id`, `hook_event_name`, and optional transcript information. | camelCase events use `sessionId` and a numeric epoch-millisecond `timestamp`. PascalCase aliases select compatible snake_case fields and ISO timestamps. |
| Tool input | `tool_name`, `tool_input`, and `tool_use_id`. | camelCase events use `toolName` and `toolArgs`. PascalCase `PreToolUse` can report names such as `Read`, `Write`, or `Edit` instead of runtime names. Inspect the actual tool arguments; names and schemas are not a one-to-one Local mapping. |
| Tool result | `PostToolUse` receives `tool_response`. | `postToolUse` receives `toolResult`; the compatible format uses `tool_result`. Rewrite result readers, not just input readers. |
| Tool decisions | Nested `hookSpecificOutput.permissionDecision` and optional `updatedInput`. | Use the documented top-level `permissionDecision`, `permissionDecisionReason`, and `modifiedArgs`. Return `{}` when there is no hook decision, rather than granting approval with `allow`. |
| Post-tool context | `hookSpecificOutput.additionalContext`. | Return top-level `additionalContext`. A post-tool hook runs after the action; it cannot undo the completed action. |
| Exit codes | Exit `2` is blocking. Other nonzero exits produce a nonblocking warning. | GitHub documents command `preToolUse` errors and nonzero exits as denying the tool, but timeouts as continuing through normal permissions. Other events have different failure behavior. Test each event's error path. |

For complete output and failure rules, see [Copilot decision control](https://docs.github.com/en/copilot/reference/hooks-reference#pretooluse-decision-control) and [command-hook exit codes](https://docs.github.com/en/copilot/reference/hooks-reference#exit-codes-for-command-hooks).

### Review event timing

Use this table to find the corresponding lifecycle point, not as a mechanical rename list. Changing a configured event from PascalCase to camelCase also changes its stdin payload.

| Local event | Copilot event | Behavior to verify |
|-------------|---------------|--------------------|
| `SessionStart` | `sessionStart` | Copilot includes new and resumed sessions. Do not assume `source` is always `new`. |
| `UserPromptSubmit` | `userPromptSubmitted` | Runs for a submitted prompt. Command-hook output is ignored for this event; programmatic SDK prompt rewriting is not a shell-hook feature. |
| `PreToolUse` | `preToolUse` | Runs before a tool executes. Verify the tool name, argument schema, and permission result. |
| `PostToolUse` | `postToolUse` | Runs after a successful tool. Copilot has a separate `postToolUseFailure` event. |
| `PreCompact` | `preCompact` | Copilot documents manual and automatic triggers. It is a notification, not a way to prevent compaction. |
| `SubagentStart` | `subagentStart` | Review the agent identity fields and which subagent types emit events. The hook reference excludes the built-in `general-purpose` agent. |
| `SubagentStop` | `subagentStop` | Review response and identity fields, block decisions, and continuation limits. |
| `Stop` | `agentStop` | The agent is finishing a turn. This is **not** `sessionEnd`, which indicates session termination. |

### Handle fields without a documented equivalent

Do not carry these assumptions into a migrated script:

* **Common Local outputs:** `continue`, `stopReason`, and `systemMessage` are not a documented cross-event Copilot command-hook contract. Choose the destination's event-specific output. Do not treat denying one tool as stopping the whole session.
* **Nested output envelopes:** accepting a PascalCase input alias does not establish support for every Local `hookSpecificOutput` field. Emit the documented Copilot output.
* **Transcripts and tool IDs:** do not require `transcript_path` or `tool_use_id` on every event. Copilot documents transcript paths on particular lifecycle events, not all tool events. A transcript filename or substring is not proof that the agent read or followed an instruction.
* **Matcher behavior:** Local ignores matcher values. Copilot applies documented matcher rules, including different semantics for compatible `PreToolUse` names. Recheck every filter, including invalid patterns and tools it should not match.
* **SDK callback types:** programmatic callbacks are not JSON-file command hooks. A field in SDK source, such as a callback-only prompt override, is not evidence that a shell hook can use it.
* **Enforcement:** `ask` depends on an interactive approval flow; do not assume it pauses an unattended session. GitHub also documents fail-open timeouts, including for policy hooks. Neither instructions nor a migrated hook alone establishes a security boundary.

### Example conversion

This example requests manual review for one tool. It does not run the tool or interpolate its arguments into a shell command. Use a disposable session and a harmless tool when verifying it.

Keep the original `review-tool.cjs`. Save the converted script as `review-tool-copilot.cjs`, and stage its configuration as `.github/hooks/review-copilot.json.disabled` until the direct checks pass. The suffix keeps the new file out of hook discovery.

**Before, Local configuration:**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "node .github/hooks/review-tool.cjs",
        "env": { "REVIEW_TOOL_NAME": "<local-tool-name>" },
        "timeout": 10
      }
    ]
  }
}
```

**Before, Local script:**

```javascript
const fs = require('node:fs');
const event = JSON.parse(fs.readFileSync(0, 'utf8'));
const toolName = process.env.REVIEW_TOOL_NAME;
if (!toolName || typeof event.tool_name !== 'string') {
  throw new Error('Configure REVIEW_TOOL_NAME and provide a Local tool event.');
}
process.stdout.write(JSON.stringify(event.tool_name === toolName ? {
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'ask',
    permissionDecisionReason: 'Review this tool call before it runs.'
  }
} : {}));
```

**After, Copilot configuration:**

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "command": "node .github/hooks/review-tool-copilot.cjs",
        "env": { "REVIEW_TOOL_NAME": "<copilot-tool-name>" },
        "timeoutSec": 10
      }
    ]
  }
}
```

**After, Copilot script:**

```javascript
const fs = require('node:fs');
const event = JSON.parse(fs.readFileSync(0, 'utf8'));
const toolName = process.env.REVIEW_TOOL_NAME;
if (!toolName || typeof event.toolName !== 'string') {
  throw new Error('Configure REVIEW_TOOL_NAME and provide a Copilot tool event.');
}
process.stdout.write(JSON.stringify(event.toolName === toolName ? {
  permissionDecision: 'ask',
  permissionDecisionReason: 'Review this tool call before it runs.'
} : {}));
```

Replace the placeholders with names observed in each session, not with a guessed rename. Use the [tool-name diagnostic](/docs/agent-customization/hooks.md#create-your-first-copilot-hook) to identify a harmless tool in the Copilot session. A hook that validates arguments must also validate the structure of `toolArgs` before using it. This example requires Node.js on the execution host, not a CLI installation.

A post-tool reminder needs an output conversion too:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Review the edited documentation against the writing guidelines."
  }
}
```

The Copilot command-hook output is:

```json
{
  "additionalContext": "Review the edited documentation against the writing guidelines."
}
```

### Personal hooks and inline settings

Use the same converted script for a personal hook. Store `review-tool-copilot.cjs` in your user hook directory, not in a repository. Stage this configuration as `~/.copilot/hooks/review-copilot.json.disabled`:

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "command": "node \"<absolute-user-hooks-path>/review-tool-copilot.cjs\"",
        "env": { "REVIEW_TOOL_NAME": "<copilot-tool-name>" },
        "timeoutSec": 10
      }
    ]
  }
}
```

Replace `<absolute-user-hooks-path>` with the user hook directory on the execution host. Keep the quotes around the script path, including when it contains spaces:

| Platform | Example JSON `command` value |
|----------|------------------------------|
| macOS | `"node \"/Users/<user>/.copilot/hooks/review-tool-copilot.cjs\""` |
| Linux | `"node \"/home/<user>/.copilot/hooks/review-tool-copilot.cjs\""` |
| Windows | `"node \"C:\\Users\\<user>\\.copilot\\hooks\\review-tool-copilot.cjs\""` |

If `COPILOT_HOME` is set, use its `hooks` directory instead. The review script does not create a log. If you use the [diagnostic script](/docs/agent-customization/hooks.md#create-your-first-copilot-hook), its log is written beside the script in your user directory.

Alternatively, keep the configuration inline in `~/.copilot/settings.json` while leaving the script in the user hook directory. Merge the following `hooks` member into the existing settings object **after validating the script**:

```json
{
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "command": "node \"<absolute-user-hooks-path>/review-tool-copilot.cjs\"",
        "env": { "REVIEW_TOOL_NAME": "<copilot-tool-name>" },
        "timeoutSec": 10
      }
    ]
  }
}
```

Preserve unrelated settings and existing hook entries. If `hooks` or `preToolUse` already exists, merge into it rather than adding a duplicate JSON property. The standalone hook-file `version` property is not needed for this inline map. Choose either the standalone file or inline settings for this hook, not both.

For a shared plugin, use the [bundled-script configuration](/docs/agents/reference/agent-plugin-reference.md#reference-plugin-paths-in-hook-commands) instead of a personal absolute path.

### Check the converted script directly

These checks invoke only the converted script, not an agent or the named tool. Keep its hook configuration inactive while running them. In a terminal at the repository root, pass a matching event on stdin:

**macOS or Linux:**

```bash
printf '%s\n' '{"toolName":"view","toolArgs":{"path":"README.md"}}' |
  REVIEW_TOOL_NAME=view node .github/hooks/review-tool-copilot.cjs
printf '\nExit code: %s\n' "$?"
```

**Windows PowerShell:**

```powershell
$env:REVIEW_TOOL_NAME = 'view'
'{"toolName":"view","toolArgs":{"path":"README.md"}}' |
  node .github/hooks/review-tool-copilot.cjs
Write-Host "`nExit code: $LASTEXITCODE"
```

For a personal hook, replace the script argument with its quoted absolute path. The matching fixture must return the following JSON and exit with code `0`:

```json
{
  "permissionDecision": "ask",
  "permissionDecisionReason": "Review this tool call before it runs."
}
```

Repeat with the following stdin values, keeping `REVIEW_TOOL_NAME=view`:

| Input | Expected stdout | Expected exit code |
|-------|-----------------|--------------------|
| `{"toolName":"grep","toolArgs":{}}` | `{}` | `0` |
| `{}` | No decision JSON; an error on stderr | Nonzero |
| `not-json` | No decision JSON; a parse error on stderr | Nonzero |

These fixtures check the script's input and output handling. They do not establish live tool coverage or approval behavior. For the session check, set `REVIEW_TOOL_NAME` to the actual name found with the [tool-name diagnostic](/docs/agent-customization/hooks.md#create-your-first-copilot-hook), then verify the hook in an interactive Copilot session.

### Verify before retiring the original

1. Run the [direct script checks](#check-the-converted-script-directly) while the destination configuration is inactive. For your own scripts, also exercise argument validation and malformed input.
1. Disable the original hook without deleting its backup. Activate only the converted configuration you intend to use. For the standalone example, rename `review-copilot.json.disabled` to `review-copilot.json`; for settings, merge the validated hook entries into the existing `hooks` map.
1. Select **Copilot** as the **Session Target** and start a new disposable session. Confirm the intended source is discovered and the hook actually fires. A visible file alone is not proof of execution.
1. Test allow, deny, and approval paths as applicable. Separately test a command error and a timeout; they do not necessarily have the same result.
1. Test the relevant lifecycle transitions, including resume or subagent completion when used. Check that each hook runs once, not once per duplicate source.
1. Repeat in the target operating system, remote host, container, or worktree. Verify `cwd`, script dependencies, user folders, and sandbox access without logging credentials or full prompts.
1. Only then retire the old configuration. Publish shared changes through the repository or plugin's normal review process.

## Replace tool sets

User-defined tool sets are deprecated and are not supported in the Copilot harness. A tool-set file groups existing tools under a reusable name; it does not implement the tools. Move the tool selection, not the file.

> [!NOTE]
> Tool-set files remain a Local harness compatibility feature. Tool groups displayed in the Copilot **Tools** tab and supported built-in tool aliases are separate from user-defined tool-set files.

Choose a replacement based on why you used the tool set:

| Previous use | Replacement |
|--------------|-------------|
| Select the same capabilities for a recurring role | Specify the supported tools directly in a [custom agent's `tools` property](/docs/agents/reference/custom-agent-file-reference.md#tools). |
| Control which editor-provided tools are available | Manage tool availability in the [Agent Customizations editor's **Tools** tab](/docs/agents/run/tools.md#manage-available-tools). This selection persists in your profile; it is not a per-request tool-set alias. |
| Attach a named group to a prompt, such as `#reader` | Describe the task and select the relevant custom agent. A user-defined `#reader` alias has no direct replacement. |
| Share a workflow and its external integrations | Package the workflow as a skill and its tools as an MCP server in an [agent plugin](/docs/agent-customization/agent-plugins.md). A plugin packages capabilities; it does not recreate a tool-set alias or enforce a tool allow-list. |

To replace an existing tool set:

1. Open its `.toolsets.jsonc` file and list the tools it contains. Expand references to other tool sets.
1. Find uses of the set in custom-agent `tools` lists, prompt files, and prompt text. Convert prompt files to skills by following [prompt file migration](#convert-prompt-files-to-skills).
1. In a Copilot harness session, review the available tools in the **Tools** tab. Match each old tool to the capability you need. Do not assume Local tool IDs have identical Copilot equivalents.
1. Configure the replacement custom agent with supported tool names. Keep workflow instructions in the agent or skill, rather than copying the tool-set JSON into it.
1. Test the workflow and inspect the tools it actually uses before removing the original set.

For example, a `reader` set might combine code search, symbol usages, diagnostics, and source control changes. Create a review agent with the corresponding available tools, rather than copying `reader` into its `tools` list. If a capability depends on an extension, keep the extension installed and the editor connected. If no equivalent tool is available, adapt the workflow to consume explicitly attached context, add an appropriate integration, or document the missing capability.

> [!IMPORTANT]
> A skill's instructions do not replace a tool allow-list. Converting a prompt to a skill does not preserve its `tools` selection. Tool availability is also separate from [permissions and approvals](/docs/agents/run/approvals.md).

## Replace chat participants

Chat participants, including extension-provided `@participant` integrations, are deprecated and are not supported in the Copilot harness. The Chat Participant API remains available for Local harness compatibility, but new integrations should not depend on it.

### If you use a participant

For built-in participant workflows, ask the Copilot agent directly. For example, replace `@vscode how do I enable word wrapping` with `How do I turn on word wrapping in the editor?`. For codebase or terminal questions, attach the relevant files, terminal output, or other [context](/docs/chat/copilot-chat-context.md).

For an extension-provided participant, check whether its publisher provides an [agent plugin](/docs/agent-customization/agent-plugins.md), MCP server, or extension tools. Install the replacement and follow its setup instructions. Removing the `@name` prefix does not give Copilot access to the participant's private data, services, or implementation.

There is no automatic conversion of an installed participant. If its publisher has not provided a replacement, ask for one. Keep Local compatibility only while you still need the original integration.

### If you maintain a participant

Start with an **agent plugin containing skills and an MCP server**. Skills describe the domain workflow, and MCP tools provide the data and actions needed to complete it. Add a custom agent when users need an ongoing specialist role. This separates reusable expertise from the code that accesses a service and makes the integration usable beyond one editor.

For interactive controls, use [MCP Apps](/api/extension-guides/ai/mcp.md#mcp-apps). They can provide buttons, forms, visualizations, and multi-step interactions in chat. Prefer [extension tools](/api/extension-guides/ai/tools.md) when the integration needs editor APIs or live editor context that an independent MCP server cannot access.

Inventory the responsibilities of your participant before choosing its components:

| Participant responsibility | Migration approach | What to review |
|----------------------------|--------------------|----------------|
| Domain instructions and examples | Put task-specific knowledge in a skill. Use a custom agent for a persistent role, or instruction files for standing project guidance. | Move the useful instructions, not the entire request-handler implementation. |
| Slash commands such as `@tutor /exercise` | Create explicitly invoked skills for the workflows. Set `disable-model-invocation: true` when they should run only on request. | Choose the skill name and argument guidance. Plugin skills use the plugin's command prefix, not the old `@participant` syntax. |
| Service access, retrieval, or actions | Expose bounded operations as MCP tools and include the server configuration in the plugin. | Preserve authentication, input validation, cancellation, error reporting, and approval requirements. Do not put secrets in the plugin. |
| Buttons, forms, or a confirmation step within a workflow | Return an MCP App from a tool and implement the interaction in its UI. | This requires a new UI implementation, not a conversion of `ChatResponseStream` calls. An app's confirmation step does not replace host tool approvals or authorization in the service. |
| Selection, diagnostics, or other editor state | Let users attach context, or expose editor-specific operations through extension tools. | An MCP server does not automatically have access to {% data variables.product.prodname_vscode_shortname %} APIs. Extension tools require the contributing extension and a connected editor. |
| A procedure that must run in a fixed order | Keep the procedure in a script or tool implementation and use the skill to describe when to call it. | Model instructions are not a substitute for deterministic execution or validation. |
| Custom model calls, conversation history, or response rendering | Refactor a bounded operation into a tool, or retain the bespoke experience in extension commands and views. | A custom agent or skill does not take over the harness's conversation loop. Participant history, feedback events, routing rules, and arbitrary response parts have no automatic mapping. |

MCP Apps require a client that supports their UI. Provide a useful text or structured tool result for clients without that support. Test app behavior in each target client instead of assuming that every Copilot interface renders the same controls. In {% data variables.product.prodname_vscode_shortname %}, review the [MCP Apps behavior and limitations](/api/extension-guides/ai/mcp.md#vs-code-behavior-and-limitations), including how apps add messages and context.

### Example: migrate a code tutor to a plugin

Instead of replacing a code-tutor participant with one large custom-agent prompt, separate its capabilities:

* **Teaching workflow:** a `teach-concept` skill asks about the learner's experience, explains a concept, and proposes an exercise.
* **Exercise operations:** MCP tools retrieve exercises and check answers.
* **Interactive exercise:** an MCP App displays the question, accepts an answer, and shows feedback. Keep a text-based exercise path for clients without app support.
* **Optional Tutor agent:** a custom agent holds the teaching style for a longer conversation.
* **Optional editor integration:** an extension tool supplies diagnostics or selected code when the workflow needs live editor APIs. Otherwise, ask the learner to attach the code.

A plugin can package the portable parts together:

```text
code-tutor/
  plugin.json
  skills/
    teach-concept/
      SKILL.md
  mcp.json
  com.github.copilot/
    agents/
      tutor.agent.md
```

Use the [plugin manifest and format guidance](/docs/agents/reference/agent-plugin-reference.md#plugin-manifest-pluginjson) to configure the package. The MCP server supplies the exercise tools and app resources; the plugin does not automatically convert or embed the old participant extension.

For the teaching skill, preserve explicit invocation:

```markdown
---
name: teach-concept
description: Explain a programming concept and guide the learner through an exercise.
argument-hint: "[concept or code to explain]"
disable-model-invocation: true
---

Ask about the learner's experience and the concept or code they want to understand.
Explain the concept with a short example before offering an exercise.
Use the exercise server's tools when available. If they are unavailable, explain
that limitation and offer a text-only exercise instead.
```

With a plugin named `code-tutor`, users invoke this skill as `/code-tutor:teach-concept`, rather than `@tutor /teach`. Test the installed plugin, authentication, app interactions, and text-only path before retiring the participant.

## Verify the migration

After you complete a migration:

1. Start a new Copilot harness session.
1. Confirm that the migrated agents, instructions, skills, MCP servers, or plugins appear in the Agent Customizations editor.
1. Run a representative task that uses the customization.
1. For a replaced tool set, inspect the selected tools and check for missing capabilities. For a replaced participant, test its workflows, unavailable-service errors, approvals, and any MCP App interactions.
1. Check that old and migrated copies are not both active.
1. Commit workspace migrations to source control when your team should share them.
1. Remove old files and settings after the migrated customization works.

For remote or Dev Container sessions, perform this check in the destination environment. User customization folders belong to the machine or container where the agent runs.

## Related resources

* [Create and manage agent customizations](/docs/agent-customization/overview.md)
* [Choose and configure an agent harness](/docs/agents/run/agent-harnesses.md)
* [Agent customization concepts](/docs/agents/concepts/customization.md)
