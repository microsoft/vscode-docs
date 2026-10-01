---
ContentId: 5e55509e-3fe2-4475-b85c-2b20fdd6c24d
DateApproved: 9/30/2026
MetaDescription: Move existing agent customizations to folders and formats supported by Agent Host in {% data variables.product.prodname_vscode_shortname %}.
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
# Migrate agent customizations for Agent Host

When {% data variables.product.prodname_vscode_shortname %} shows a customization migration notice, it found a file, setting, or MCP server that the selected Agent Host harness does not read in its current location or format. Use the migration list to move or convert each affected customization.

This article explains why migration is needed, how to complete each migration that {% data variables.product.prodname_vscode_shortname %} supports, and what to review manually.

`feature(user-customization-migration)`

## Why migration is needed

Earlier versions of {% data variables.product.prodname_vscode_shortname %} stored some user customizations in profile user data and supported additional locations through `chat.*FilesLocations` settings. The Local agent reads those {% data variables.product.prodname_vscode_shortname %}-specific sources. [Agent Host](/docs/agents/concepts/agent-host.md) sessions use the customization folders and formats supported by the selected harness instead.

Moving customizations to supported locations has these benefits:

* The Agent Host can load them directly, including when the host runs independently of the editor.
* Workspace customizations stay with the repository and can be shared through source control.
* Compatible Copilot clients can use the same portable customization files.
* You can remove old location settings and avoid maintaining duplicate copies.

You only need to migrate each item once. Migration does not synchronize the original and migrated copies. Verify the migrated customization, and then remove the original when you no longer need it.

## Open the migration list

1. In the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}, select the Agent Host harness that should use the customizations.
1. Run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).
1. Select **Migrations**.

If chat shows a customization migration notice, select **Review Migrations** to open the same list. The list contains only migrations detected for the selected harness and workspace.

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
1. Open the destination file and test the server with the selected harness.

{% data variables.product.prodname_vscode_shortname %} writes and verifies each destination entry before removing the migrated entry from its source file. Unselected servers and servers that cannot be migrated stay in their current files.

A migration with changes can remove {% data variables.product.prodname_vscode_shortname %}-specific metadata, including registry update information, version metadata, development-mode behavior, or per-server sandbox settings. The migration page lists the changes for each server.

> [!IMPORTANT]
> A disabled user MCP server might become enabled after migration. Review its enabled state before you start a chat that can use its tools.

If a server is not eligible, select it to review the reason. Resolve configuration errors, missing values, or duplicate server names in the source file, and then retry. For MCP formats and supported locations, see [Add and manage MCP servers](/docs/agent-customization/mcp-servers.md).

## Convert prompt files to skills

Agent Host does not load `*.prompt.md` files. Convert workspace and user prompt files to [agent skills](/docs/agent-customization/agent-skills.md) to keep the workflows available in both Local and Agent Host sessions.

To convert prompt files:

1. On the **Migrations** page, select **Prompt files**.
1. Select the prompt files to convert.
1. Open a file if you want to review it before conversion.
1. Select **Convert to Skills**.
1. Choose whether to delete the original prompt files.
1. Confirm the conversion.

Review migrated skills that used prompt file frontmatter properties that skills do not support. {% data variables.product.prodname_vscode_shortname %} lists those properties after migration.

If you keep the original prompt files, the prompts and skills do not stay synchronized. Test each skill and remove the old prompt file when you no longer need it.

## Move user agents and instructions

Agent Host does not read custom agents and instructions stored in {% data variables.product.prodname_vscode_shortname %} profile user data. User customization migration copies them to the user folders for the selected harness without changing their names, types, or contents.

To move user customizations:

1. On the **Migrations** page, select **User data**.
1. Select the custom agents and instructions to move.
1. Review the destination shown on the page.
1. Select **Migrate**.
1. Choose whether to delete the original files from profile user data.
1. Confirm the migration.

The migrated files are not included in [Settings Sync](/docs/configure/settings-sync.md). If you keep the originals, the copies do not stay synchronized.

After migration, start a session with the selected harness and verify that the agents and instructions are available. See [custom agent locations](/docs/agent-customization/custom-agents.md#custom-agent-file-locations) and [instruction file locations](/docs/agent-customization/custom-instructions.md#instructions-file-locations) for the supported destinations.

## Move customizations from configured locations

The following settings add file locations for the Local agent, but Agent Host harnesses do not read them:

* `setting(chat.agentFilesLocations)`
* `setting(chat.modeFilesLocations)`
* `setting(chat.instructionsFilesLocations)`
* `setting(chat.agentSkillsLocations)`

Location migration moves detected custom agents, legacy chat modes, instructions, and skills to folders supported by the selected harness. Legacy `*.chatmode.md` files become `*.agent.md` files in the destination agent folder.

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

A custom agent can move to a supported folder and still reference tools or tool sets that the selected harness does not provide. Open the agent file and review:

* Tool names and namespaces in the `tools` property.
* Agent-scoped hooks and other harness-specific frontmatter.

Unavailable tools are ignored. Replace unsupported tool references with tools that the destination harness provides, and test the agent with a representative task. See [Create custom agents](/docs/agent-customization/custom-agents.md) and [Use tools with agents](/docs/agents/run/tools.md).

### Tool sets

{% data variables.product.prodname_vscode_shortname %} user tool-set files are not migrated to Agent Host. If a custom agent references a tool set, replace the reference with concrete tools that the destination harness provides.

See [Create and use tool sets](/docs/agent-customization/tool-sets.md) to review your existing tool sets.

### Hooks

Hook file discovery, event names, command properties, payloads, and output decisions can differ between harnesses. {% data variables.product.prodname_vscode_shortname %} does not automatically rewrite hook definitions or scripts for another harness.

Select the destination harness and follow the [hook migration checklist](/docs/agent-customization/hooks.md#migrate-hooks-between-harnesses). Test script paths, working directories, shell commands, permissions, and environment variables in the environment where the harness runs.

### Local plugins and marketplaces

Plugins registered with `setting(chat.pluginLocations)` remain a {% data variables.product.prodname_vscode_shortname %}-specific configuration. To create a managed installation, install the plugin from a marketplace or use **Chat: Install Plugin From Source**. Verify its skills, MCP servers, hooks, and agents before you remove the old location setting.

Marketplace registration and enablement can differ across clients. Install and enable the plugins you need in the target environment. See [Discover and install plugins](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins).

### Extension-provided customizations

Extensions can contribute tools, MCP servers, and custom agents. In Agent Host sessions, extension-provided tools are available only in chats in an editor window where the contributing extension runs.

Keep the extension installed and enabled when you need those contributions. For sessions that must run without an editor client, use a portable alternative such as an agent plugin, MCP server, skill, or file-based custom agent when one is available. Learn more about [Agent Host behavior on the extension host](/docs/agents/concepts/agent-host.md#behavior-on-the-extension-host).

## Verify the migration

After you complete a migration:

1. Start a new session with the target harness.
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
