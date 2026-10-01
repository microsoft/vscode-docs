---
ContentId: 5e55509e-3fe2-4475-b85c-2b20fdd6c24d
DateApproved: 9/30/2026
MetaDescription: Move existing agent customizations to folders and formats supported by the Copilot harness in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
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
---
# Migrate agent customizations to the Copilot harness

When {% data variables.product.prodname_vscode_shortname %} shows a customization migration notice, it found a file, setting, or MCP server that the Copilot harness does not read in its current location or format. Use the migration list to move or convert each affected customization.

This article explains why migration is needed, how to complete each migration that {% data variables.product.prodname_vscode_shortname %} supports, and what to review manually.

`feature(user-customization-migration)`

> [!NOTE]
> This article covers migration to the Copilot harness. For Claude or Codex sessions, use the locations and formats in the provider documentation.

## Why migration is needed

Earlier versions of {% data variables.product.prodname_vscode_shortname %} stored some user customizations in profile user data and supported additional locations through `chat.*FilesLocations` settings. The Local agent reads those {% data variables.product.prodname_vscode_shortname %}-specific sources.

The Copilot harness runs on [Agent Host](/docs/agents/concepts/agent-host.md) and uses the shared Copilot runtime that also powers {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %}. It reads customizations from shared Copilot folders and portable formats.

Moving customizations to those locations has these benefits:

* The Agent Host can load them directly, including when the host runs independently of the editor.
* Workspace customizations stay with the repository and can be shared through source control.
* The Copilot harness and {% data variables.copilot.copilot_cli %} read the same Copilot customization files. The {% data variables.copilot.github_copilot_app %} also uses repository and Copilot CLI skills and MCP server configuration.
* You can remove old location settings and avoid maintaining duplicate copies.

You only need to migrate each item once. Migration does not synchronize the original and migrated copies. Verify the migrated customization, and then remove the original when you no longer need it.

The shared locations include:

| Customization | Workspace | User |
|---------------|-----------|------|
| Custom agents | `.github/agents` | `~/.copilot/agents` |
| Instructions | `.github/copilot-instructions.md` or `.github/instructions` | `~/.copilot/instructions` |
| Skills | `.github/skills` or `.agents/skills` | `~/.copilot/skills` or `~/.agents/skills` |
| MCP servers | `.mcp.json` | `$COPILOT_HOME/mcp-config.json` |

For an overview of customization types and their shared locations, see the [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet). Learn how these customizations appear in the [{% data variables.copilot.github_copilot_app %}](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app).

The shared Copilot runtime uses these folders for custom agents, instructions, skills, and MCP servers. {% data variables.product.prodname_vscode_shortname %}-specific prompt files, tool sets, extension tools, and Local hook behavior do not transfer directly. The sections in this article describe the required changes.

## Open the migration list

1. In the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}, select **Copilot** as the session target.
1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).
1. Select **Migrations**.

If chat shows a customization migration notice, select **Review Migrations** to open the same list. The list contains only migrations detected for the Copilot harness and current workspace.

Before you migrate:

* Commit or back up workspace files that you might change.
* Review the source and destination shown for each item.
* If you do not maintain the repository, skip its workspace migrations and ask a repository maintainer to make the change.

## Migrate MCP servers

MCP server migration moves compatible configurations to files that the Copilot harness reads directly:

| Existing configuration | Destination |
|------------------------|-------------|
| Workspace `.vscode/mcp.json` | `.mcp.json` at the corresponding workspace root |
| {% data variables.product.prodname_vscode_shortname %} profile `mcp.json` | `$COPILOT_HOME/mcp-config.json`, or `~/.copilot/mcp-config.json` when `COPILOT_HOME` is not set |

To migrate MCP servers:

1. On the **Migrations** page, select **MCP servers**.
1. Review the **Ready to migrate** and **Migrates with changes** groups.
1. Select each server you want to migrate.
1. Review any properties that the destination format cannot preserve.
1. Select **Migrate**.
1. Open the destination file and test the server with the Copilot harness.

{% data variables.product.prodname_vscode_shortname %} writes and verifies each destination entry before removing the migrated entry from its source file. Unselected servers and servers that cannot be migrated stay in their current files.

A migration with changes can remove {% data variables.product.prodname_vscode_shortname %}-specific metadata, including registry update information, version metadata, development-mode behavior, or per-server sandbox settings. The migration page lists the changes for each server.

> [!IMPORTANT]
> A disabled user MCP server might become enabled after migration. Review its enabled state before you start a chat that can use its tools.

If a server is not eligible, select it to review the reason. Resolve configuration errors, missing values, or duplicate server names in the source file, and then retry. For MCP formats and supported locations, see [Add and manage MCP servers](/docs/agent-customization/mcp-servers.md).

### Check MCP values before migration

Use the following table to decide whether a server can migrate automatically and what to review.

| Source configuration | Migration result | What to do |
|----------------------|------------------|------------|
| Standard `command`, `args`, `env`, `url`, and `headers` values | Migrates automatically | Test the destination server and its tools. |
| `${workspaceFolder}`, `${workspaceRoot}`, `${workspaceFolderBasename}`, `${workspaceRootFolderName}`, `${cwd}`, or `${pathSeparator}` | Migrates after {% data variables.product.prodname_vscode_shortname %} resolves the variable and writes its current value | Review the resulting value before you share the destination file or use it on another machine. |
| `gallery`, `version`, `dev`, or `sandboxEnabled` | Migrates with changes and removes these properties | Review the migration warning. Decide how to handle updates, development behavior, or sandboxing after migration. |
| `${input:...}`, `${env:...}`, `${config:...}`, `${command:...}`, or other {% data variables.product.prodname_vscode_shortname %}-specific variables | Does not migrate automatically | Replace the variable with configuration supported by the Copilot runtime. Do not put secrets in a committed file. |
| `cwd` or `envFile` | Does not migrate automatically | Review the server command and paths, and configure the server manually. |
| SSE transport or a VS Code-specific `oauth` object | Does not migrate automatically | Configure the transport or authentication with options supported by the Copilot runtime. |
| Environment variables with `null` values | Does not migrate automatically | Remove the entry or provide a supported value. |
| Additional VS Code-specific properties | Does not migrate automatically | Remove or replace the unsupported property before you retry. |
| A different server with the same name in the destination or another workspace root | Migration stops without changing the source | Rename or remove the conflicting server, and then retry. |

Input variables need special attention. The {% data variables.product.prodname_vscode_shortname %} MCP format can prompt for values such as API keys through `${input:api-key}`. The Copilot MCP format does not use this {% data variables.product.prodname_vscode_shortname %} input flow, so these servers require manual configuration.

When a server requires manual work:

1. Keep the original configuration until the Copilot server starts and provides the expected tools.
1. Open the source configuration and identify each unsupported field or variable.
1. Follow the [Copilot CLI MCP server guidance](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers) for the destination configuration.
1. Decide how to provide secrets, authentication, or environment-specific paths. Do not copy sensitive values into a committed file.
1. Test the server with the Copilot harness before you remove the original entry.

## Convert prompt files to skills

The Copilot harness does not load `*.prompt.md` files. Convert workspace and user prompt files to [agent skills](/docs/agent-customization/agent-skills.md) to keep the workflows available in both Local and Copilot sessions.

To convert prompt files:

1. On the **Migrations** page, select **Prompt files**.
1. Select the prompt files to convert.
1. Open a file if you want to review it before conversion.
1. Select **Convert to Skills**.
1. Choose whether to delete the original prompt files.
1. Confirm the conversion.

Conversion keeps the prompt file's `name`, `description`, and `argument-hint` frontmatter. Other prompt properties, including `agent`, `model`, and `tools`, are not copied to the skill. {% data variables.product.prodname_vscode_shortname %} lists the omitted properties after migration so you can update the skill instructions or supporting files.

If you keep the original prompt files, the prompts and skills do not stay synchronized. Test each skill and remove the old prompt file when you no longer need it.

## Move user agents and instructions

The Copilot harness does not read custom agents and instructions stored in {% data variables.product.prodname_vscode_shortname %} profile user data. User customization migration copies agents to `~/.copilot/agents` and instructions to `~/.copilot/instructions` without changing their names, types, or contents.

To move user customizations:

1. On the **Migrations** page, select **User data**.
1. Select the custom agents and instructions to move.
1. Review the destination shown on the page.
1. Select **Migrate**.
1. Choose whether to delete the original files from profile user data.
1. Confirm the migration.

The migrated files are not included in [Settings Sync](/docs/configure/settings-sync.md). If you keep the originals, the copies do not stay synchronized.

After migration, start a Copilot session and verify that the agents and instructions are available. See [custom agent locations](/docs/agent-customization/custom-agents.md#custom-agent-file-locations) and [instruction file locations](/docs/agent-customization/custom-instructions.md#instructions-file-locations) for the supported destinations.

## Move customizations from configured locations

The following settings add file locations for the Local agent, but the Copilot harness does not read them:

* `setting(chat.agentFilesLocations)`
* `setting(chat.modeFilesLocations)`
* `setting(chat.instructionsFilesLocations)`
* `setting(chat.agentSkillsLocations)`

Location migration moves detected custom agents, legacy chat modes, instructions, and skills to the Copilot folders for their scope:

| Customization | Workspace destination | User destination |
|---------------|-----------------------|------------------|
| Custom agents | `.github/agents` | `~/.copilot/agents` |
| Instructions | `.github/instructions` | `~/.copilot/instructions` |
| Skills | `.github/skills` or `.agents/skills` | `~/.copilot/skills` or `~/.agents/skills` |

Legacy `*.chatmode.md` files become `*.agent.md` files in the destination agent folder.

To migrate custom locations:

1. On the **Migrations** page, select **Custom location settings**.
1. Select the agents, instructions, and skills to move.
1. Choose whether to clear the unused location settings. This option is selected by default.
1. Select **Migrate**.
1. Choose whether to delete the original files.
1. Confirm the migration.

Clearing a location setting and deleting its files are separate choices. If you keep the original files, the old and migrated copies do not stay synchronized.

Prompt files from `setting(chat.promptFilesLocations)` are handled by [prompt file migration](#convert-prompt-files-to-skills), not location migration.

## Review customizations that are not migrated automatically

Not every compatibility problem has an automatic conversion. When {% data variables.product.prodname_vscode_shortname %} cannot migrate an item safely, keep the original and review the following areas.

### Custom agent tools and properties

A custom agent can move to `.github/agents` or `~/.copilot/agents` and still reference Local tools or tool sets that the Copilot harness does not provide. Open the agent file and review:

* Tool names and namespaces in the `tools` property.
* Agent-scoped Local hooks.

Unavailable tools are ignored. Replace unsupported tool references with tools that the Copilot harness provides, and test the agent with a representative task. See [Create custom agents](/docs/agent-customization/custom-agents.md) and [Use tools with agents](/docs/agents/run/tools.md).

### Tool sets

{% data variables.product.prodname_vscode_shortname %} user tool-set files are not migrated to the Copilot harness. If a custom agent references a tool set, replace the reference with concrete tools that the Copilot harness provides.

See [Create and use tool sets](/docs/agent-customization/tool-sets.md) to review your existing tool sets.

### Hooks

The Copilot harness uses the GitHub Copilot hook implementation and reads workspace hooks from `.github/hooks` and user hooks from `~/.copilot/hooks`. Local hook event names, command properties, payloads, output decisions, and agent-scoped hooks are not converted automatically.

Compare each hook with the [GitHub Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) and follow the [hook migration checklist](/docs/agent-customization/hooks.md#migrate-hooks-between-harnesses). Test script paths, working directories, shell commands, permissions, and environment variables in the environment where Agent Host runs.

### Local plugins and marketplaces

Plugins registered with `setting(chat.pluginLocations)` remain local path registrations in {% data variables.product.prodname_vscode_shortname %}. They do not have the installation record used for update, repair, and uninstall. Install each plugin from a marketplace or use **Chat: Install Plugin From Source** to create a managed installation for the Copilot harness.

Verify the plugin's skills, MCP servers, hooks, and agents before you remove the old location setting. See [Discover and install plugins](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins).

### Extension-provided customizations

Extensions can contribute tools, MCP servers, and custom agents. In Copilot sessions, extension-provided tools are available only in chats in an editor window where the contributing extension runs. They are not available to an independent Agent Host session in the {% data variables.copilot.agents_window %}.

Keep the extension installed and enabled for editor chat. For sessions in the {% data variables.copilot.agents_window %} or on a remote Agent Host, replace required extension tools with an MCP server or agent plugin, and replace extension-provided agents with file-based custom agents when possible. Learn more about [Agent Host behavior on the extension host](/docs/agents/concepts/agent-host.md#behavior-on-the-extension-host).

## Verify the migration

After you complete a migration:

1. Start a new Copilot session.
1. Confirm that the migrated agents, instructions, skills, MCP servers, or plugins appear in the Agent Customizations editor.
1. Run a representative task that uses the customization.
1. Check that old and migrated copies are not both active.
1. Commit workspace migrations to source control when your team should share them.
1. Remove old files and settings after the migrated customization works.

For remote or Dev Container sessions, perform this check in the destination environment. User customization folders belong to the machine or container where the Agent Host runs.

## Related resources

* [Create and manage agent customizations](/docs/agent-customization/overview.md)
* [Understand the Agent Host](/docs/agents/concepts/agent-host.md)
* [Agent customization concepts](/docs/agents/concepts/customization.md)
