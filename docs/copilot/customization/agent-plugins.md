---
ContentId: f9b2c4e3-8a7d-4e1f-b5c3-2d9a6f8e4b71
DateApproved: 4/15/2026
MetaDescription: Learn how to discover, install, and manage agent plugins in VS Code to extend GitHub Copilot with pre-packaged commands, skills, agents, hooks, and MCP servers.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- agents
- plugins
- marketplace
- customization
- ai
- skills
- hooks
- mcp
---
# Agent plugins in VS Code (Preview)

Agent plugins are prepackaged bundles of chat customizations that you can discover and install from plugin marketplaces in Visual Studio Code. A single plugin can provide any combination of slash commands, [agent skills](/docs/copilot/customization/agent-skills.md), [custom agents](/docs/copilot/customization/custom-agents.md), [hooks](/docs/copilot/customization/hooks.md), and [MCP servers](/docs/copilot/customization/mcp-servers.md).

Plugins work alongside your locally defined customizations. When you install a plugin, its commands, skills, agents, hooks, and MCP servers appear in chat.

> [!NOTE]
> Agent plugins are currently in preview. Enable or disable support for agent plugins with the `setting(chat.plugins.enabled)` setting.

## What plugins provide

An agent plugin can bundle one or more of the following customization types:

* **Slash commands**: additional commands you can invoke with `/` in chat
* **Skills**: [agent skills](/docs/copilot/customization/agent-skills.md) with instructions, scripts, and resources that load on-demand
* **Agents**: [custom agents](/docs/copilot/customization/custom-agents.md) with specialized personas and tool configurations
* **Hooks**: [hooks](/docs/copilot/customization/hooks.md) that execute shell commands at agent lifecycle points
* **MCP servers**: [MCP servers](/docs/copilot/customization/mcp-servers.md) for external tool integrations

For example, a testing plugin might include a `test-runner` skill with scripts, a `test-reviewer` agent with read-only tools, and an MCP server for a test reporting dashboard. The plugin directory structure looks like this:

```text
my-testing-plugin/
  plugin.json              # Plugin metadata and configuration
  skills/
    test-runner/
      SKILL.md             # Testing skill instructions
      run-tests.sh         # Supporting script
  agents/
    test-reviewer.agent.md # Code review agent
  hooks/
    hooks.json             # Hook configuration
  scripts/
    validate-tests.sh      # Hook script
  .mcp.json                # MCP server definitions
```

Once installed, plugin-provided customizations appear alongside your locally defined ones. For example, skills from a plugin show up in the **Configure Skills** menu, and MCP servers from a plugin appear in the MCP server list.

> [!CAUTION]
> Plugins can include hooks and MCP servers that run code on your machine. Review the plugin contents and publisher before installing, especially for plugins from community marketplaces.

## Plugin metadata (plugin.json)

Every plugin requires a `plugin.json` manifest file at its root. This file defines the plugin's identity and tells VS Code where to find its components.

### Required field

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Kebab-case plugin name. Only lowercase letters, numbers, and hyphens are allowed. Maximum 64 characters. Do not use slashes, colons, or namespace prefixes (for example, `my-plugin` is valid but `myorg/my-plugin` is not). Invalid names cause the plugin to silently fail to load. |

### Optional fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Brief description of the plugin. Maximum 1024 characters. |
| `version` | string | Semantic version (for example, `1.0.0`). When a plugin is listed in a marketplace, version can appear in both `plugin.json` and the `marketplace.json` plugin entry. Bump the version in `plugin.json` when you publish changes. |
| `author` | object | Author information with `name` (required), `email`, and `url` fields. |
| `skills` | string or string[] | Path(s) to skill directories. Defaults to `skills/`. |
| `agents` | string or string[] | Path(s) to agent directories. Defaults to `agents/`. |
| `hooks` | string or object | Path to a hooks config file or an inline hooks object. |
| `mcpServers` | string or object | Path to an MCP config file (for example, `.mcp.json`) or inline server definitions. |

For the full field reference, see the [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference#pluginjson).

### Example plugin.json

```json
{
  "name": "my-dev-tools",
  "description": "React development utilities",
  "version": "1.2.0",
  "author": {
    "name": "Jane Doe"
  },
  "skills": "skills/",
  "agents": "agents/",
  "hooks": "hooks.json",
  "mcpServers": ".mcp.json"
}
```

## Plugin formats

VS Code auto-detects the plugin format by checking for format-specific manifest paths. Copilot format is used as the default when no other format markers are found.
| Plugin format | Plugin file path(s) |
|---------------|------------------|
| Claude | `.claude-plugin/plugin.json` |
| OpenPlugin | `.plugin/plugin.json` |

### Plugin environment variables

Some plugin formats provide a root token that you can use in hook commands and MCP server configurations to reference files within the plugin directory. VS Code expands the token at runtime and also sets it as an environment variable in the hook or server process.

| Plugin format | Plugin root |
|---------------|------------------|
| Claude | `${CLAUDE_PLUGIN_ROOT}` |
| Copilot | (Not defined) |
| OpenPlugin | `${PLUGIN_ROOT}` |

## Hooks in plugins

Plugins can include [hooks](/docs/copilot/customization/hooks.md) that run shell commands at agent lifecycle points. Plugin hooks work alongside your workspace and user-level hooks. When a plugin is enabled, its hooks fire in addition to any other hooks configured for the same event.

### Hook file location

The hook file location depends on the plugin format:

| Plugin format | Hook file path |
|---------------|----------------|
| Claude | `hooks/hooks.json` |
| Copilot | `hooks.json` (at the plugin root) |

VS Code auto-detects the plugin format and discovers the hook file automatically.

```text
my-plugin/
  hooks/
    hooks.json           # Hook configuration (Claude format)
  scripts/
    format.sh            # Hook script referenced by hooks.json
```

### Hook configuration format

Plugin hooks use the same base format as [workspace hooks](/docs/copilot/customization/hooks.md#hook-configuration-format). VS Code parses Claude Code hook configuration, including matcher syntax. Currently, VS Code ignores matcher values, so hooks run on every matching event.

**Flat format** (same as workspace hooks):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
      }
    ]
  }
}
```

**Matcher format** (Claude compatibility syntax):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
          }
        ]
      }
    ]
  }
}
```

VS Code parses the `matcher` field for compatibility with Claude Code, but currently ignores matcher values. If you need to filter hook behavior in VS Code, check the event input inside the hook script.

### Reference plugin paths in hook commands

For Claude-format plugins, use the `${CLAUDE_PLUGIN_ROOT}` token in hook commands to reference scripts and files within the plugin directory. VS Code expands this token to the plugin's absolute path at runtime and also sets a `CLAUDE_PLUGIN_ROOT` environment variable for the hook process. Inside your script, access this as `$CLAUDE_PLUGIN_ROOT` (or `%CLAUDE_PLUGIN_ROOT%` on Windows).

This is important because plugins are installed to a location outside your workspace, so you cannot use relative paths.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/scripts/validate-tool.sh"
      }
    ]
  }
}
```

### Supported hook events

Plugin hooks support the same lifecycle events as workspace hooks: `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, and `Stop`. See [Hook lifecycle events](/docs/copilot/customization/hooks.md#hook-lifecycle-events) for details on each event.

### How plugin hooks interact with other hooks

Plugin hooks run alongside workspace-level and user-level hooks. When multiple hooks target the same event, all of them execute. For `PreToolUse` hooks, the most restrictive permission decision across all hooks wins: `deny` overrides `ask`, which overrides `allow`.

Disabling a plugin also disables its hooks. You can enable or disable plugins globally or for a specific workspace from the Extensions view.

## MCP servers in plugins

Plugins can bundle [MCP servers](/docs/copilot/customization/mcp-servers.md) to provide agents with additional tools and data sources. Plugin MCP servers start automatically when the plugin is enabled and stop when the plugin is disabled.

### MCP configuration file

Place MCP server definitions in `.mcp.json` at the plugin root. VS Code discovers this file automatically when it loads the plugin.

```text
my-plugin/
  .mcp.json              # MCP server definitions
  servers/
    db-server             # Server executable
  config.json             # Server configuration
```

### MCP configuration format

Plugin MCP servers are defined in a top-level `mcpServers` object. Each server entry specifies a command, arguments, and optional environment variables:

```json
{
  "mcpServers": {
    "plugin-database": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_PATH": "${CLAUDE_PLUGIN_ROOT}/data"
      }
    },
    "plugin-api": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${CLAUDE_PLUGIN_ROOT}"
    }
  }
}
```

> [!NOTE]
> The top-level key is `mcpServers` (not `servers` as in the workspace `mcp.json`).

### Reference plugin paths in server configuration

For Claude-format plugins, use the `${CLAUDE_PLUGIN_ROOT}` token in MCP server fields to reference executables and files within the plugin directory. VS Code expands this token in the following fields:

* `command`: the executable path
* `args`: command-line arguments
* `cwd`: working directory
* `env`: environment variable values
* `envFile`: path to an environment file
* `url`: for HTTP-based MCP servers
* `headers`: HTTP header values

VS Code also injects a `CLAUDE_PLUGIN_ROOT` environment variable into the server process, so server code can access the plugin path at runtime.

### How plugin MCP servers interact with other servers

Plugin MCP servers appear alongside workspace and user-level MCP servers. You can manage them through the same tools:

* Select **Configure Tools** in the Chat view to see tools from all MCP servers, including plugin servers.
* Run **MCP: List Servers** from the Command Palette to view plugin servers alongside other servers.

Plugin MCP servers are implicitly trusted when you install the plugin. Unlike workspace MCP servers, they do not show a separate trust prompt at startup.

Disabling a plugin stops its MCP servers. Tools provided by the stopped servers are no longer available in chat.

## Discover and install plugins

VS Code provides a dedicated view in the Extensions sidebar to browse and manage agent plugins.

### Browse available plugins

1. Open the Extensions view (`kb(workbench.view.extensions)`) and enter `@agentPlugins` in the search field.

    Alternatively, select the **More Actions** (three dots) icon in the Extensions sidebar and choose **Views** > **Agent Plugins**.

1. Browse the list of available plugins from your configured marketplaces.

    ![Screenshot of browsing agent plugins in the Extensions sidebar.](../images/agent-plugins/extensions-view.png)

1. Select **Install** to install a plugin in your user profile.

    The first time you install a plugin from a new marketplace, VS Code shows a trust prompt. Review the marketplace source before confirming.

### Install a plugin from source

You can install a plugin directly from a Git repository URL, without adding a full marketplace first.

* Run **Chat: Install Plugin From Source** from the Command Palette.
* Alternatively, select the **+** button on the **Plugins** page of the Chat Customizations editor.

Enter a Git repository URL (for example, `https://github.com/rwoll/markdown-review`) and VS Code clones and installs the plugin.

### View installed plugins

The **Agent Plugins - Installed** view in the Extensions view shows the plugins you have installed. From this view, you can enable, disable, or uninstall plugins.

![Screenshot of the Agent Plugins - Installed view in the Extensions view.](../images/agent-plugins/installed-plugins.png)

You can also manage installed plugins from the Chat view by selecting the **gear icon** > **Plugins**.

### Enable or disable plugins

You can enable or disable a plugin globally or for a specific workspace:

* Use the context menu on a plugin in the **Agent Plugins - Installed** section of the Extensions view.
* Use the [Chat Customizations editor](/docs/copilot/customization/overview.md#chat-customizations-editor) to toggle a plugin's enabled state.

The enable/disable state is stored separately from the plugin configuration, so it does not affect shared workspace settings.

When a plugin is disabled, its skills, agents, hooks, MCP servers, and slash commands are no longer available. For example, skills from a disabled plugin do not appear in **Chat: Configure Skills**. Disabled plugins appear with a dimmed style in the Chat Customizations editor and Extensions view.

### Uninstall plugins

To remove a plugin, right-click it in the **Agent Plugins - Installed** view and select **Uninstall**. Plugins installed from an external source (such as npm, PyPI, or an external Git repository) are removed from disk. Plugins that are inlined in a marketplace repository remain on disk but are no longer active.

## Configure plugin marketplaces

By default, VS Code discovers plugins from the [copilot-plugins](https://github.com/github/copilot-plugins) and [awesome-copilot](https://github.com/github/awesome-copilot/). You can add additional marketplaces with the `setting(chat.plugins.marketplaces)` setting.

Marketplaces are Git repositories that contain plugin definitions. You can reference them in several formats:

* **Shorthand**: `owner/repo` for public GitHub repositories. For example, `anthropics/claude-code`.
* **HTTPS git remote**: a full URL ending in `.git`. For example, `https://github.com/anthropics/claude-code.git`.
* **SCP-style git remote**: SSH-style references. For example, `git@github.com:anthropics/claude-code.git`.
* **file URI**: a `file:///` path to a marketplace repository already cloned on disk.

Private repositories are also supported. If a public lookup fails, VS Code falls back to cloning the repository directly.

Marketplace plugins can also reference external package sources such as npm or PyPI packages. For the full marketplace plugin schema, see the [Claude Code plugin marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces).

```json
// settings.json
"chat.plugins.marketplaces": [
    "anthropics/claude-code"
]
```

## Use local plugins

If you manually clone or download a plugin, you can register it with the `setting(chat.pluginLocations)` setting. This setting maps local plugin directory paths to an enabled or disabled state.

```json
// settings.json
"chat.pluginLocations": {
    "/path/to/my-plugin": true,
    "/path/to/another-plugin": false
}
```

Set the value to `true` to enable the plugin, or `false` to keep it registered but disabled.

## Update plugins

VS Code checks for plugin updates when you run **Extensions: Check for Extension Updates** from the Command Palette, or automatically every 24 hours when `setting(extensions.autoUpdate)` is enabled.

Updating pulls down changes from cloned marketplace repositories and checks for new versions of externally sourced plugins.

Plugins sourced from npm or PyPI never update automatically. Instead, they show an **Update** button in the Extensions view. Selecting the button prompts you to confirm before running the install command. If an update is found during a background check, no action is taken until you explicitly select **Update**.

## Workspace plugin recommendations

Projects can recommend plugins for team members by configuring plugin settings in the workspace settings.

* **`enabledPlugins`**: lists plugins that should be enabled by default. VS Code shows a notification the first time a chat message is sent and lists these plugins under `@agentPlugins @recommended` in the Extensions view.
* **`extraKnownMarketplaces`**: registers additional marketplaces for the project. These marketplaces appear when you search `@agentPlugins` in the Extensions view.

```json
{
    "extraKnownMarketplaces": {
        "company-tools": {
            "source": {
                "source": "github",
                "repo": "your-org/plugin-marketplace"
            }
        }
    },
    "enabledPlugins": {
        "code-formatter@company-tools": true
    }
}
```

## Cross-tool compatibility

The plugin format is shared between VS Code, GitHub Copilot CLI, and Claude Code. A single plugin repository can work across all three tools.

VS Code auto-detects the plugin format by looking for `plugin.json` in multiple locations, checked in this order:

1. `.plugin/plugin.json`
1. `plugin.json` (at the plugin root)
1. `.github/plugin/plugin.json`
1. `.claude-plugin/plugin.json`

If you author plugins for multiple tools, you can place `plugin.json` at the root and use symlinks or copies in the format-specific directories. Keep the `name` field identical across all copies to avoid conflicts.

Key differences to be aware of across tools:

* **Hook file location**: Claude-format plugins expect hooks in `hooks/hooks.json`, while Copilot-format plugins use `hooks.json` at the root. VS Code detects the format automatically.
* **Plugin root token**: Claude-format plugins use `${CLAUDE_PLUGIN_ROOT}` to reference files within the plugin directory. This token is not available in Copilot-format plugins.
* **Skill naming**: all tools require plain kebab-case names in `SKILL.md`. Namespace prefixes (like `myorg/skillname`) cause silent load failures.

For tool-specific details, see the [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) and the [Claude Code plugin marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces).

## Troubleshooting

### Plugin does not appear after installation

* Confirm that agent plugins are enabled: check that `setting(chat.plugins.enabled)` is set to `true`.
* Verify the plugin's `name` field in `plugin.json` uses only lowercase letters, numbers, and hyphens. Slashes, colons, or other special characters cause the plugin to silently fail to load.
* Check that `plugin.json` is in a recognized location (see [Cross-tool compatibility](#cross-tool-compatibility)).

### Skills from a plugin do not load

* Open the `SKILL.md` file and check the `name` field in the YAML frontmatter. The name must be plain kebab-case without namespace prefixes (for example, `test-runner`, not `myorg/test-runner`). Invalid names cause the skill to be silently skipped.
* Make sure the skill directory name matches the `name` field in the `SKILL.md` frontmatter.

### Plugin version does not update

* Bump the `version` field in `plugin.json` (and in the `marketplace.json` plugin entry, if applicable) before pushing changes.
* Run **Extensions: Check for Extension Updates** from the Command Palette to trigger an update check.

### Installation fails with 'destination path already exists'

This can happen when a previous install left cached data. Delete the cached plugin directory and retry:

* **macOS**: `~/Library/Application Support/Code/agentPlugins/github.com/{org}/{repo}`
* **Linux**: `~/.config/Code/agentPlugins/github.com/{org}/{repo}`
* **Windows**: `%APPDATA%\Code\agentPlugins\github.com\{org}\{repo}`

## Related resources

* [Finding and installing plugins for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)
* [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
* [Use Agent Skills](/docs/copilot/customization/agent-skills.md)
* [Add and manage MCP servers](/docs/copilot/customization/mcp-servers.md)
* [Use hooks for lifecycle automation](/docs/copilot/customization/hooks.md)
* [Create custom agents](/docs/copilot/customization/custom-agents.md)
