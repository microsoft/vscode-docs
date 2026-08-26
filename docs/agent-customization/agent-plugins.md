---
ContentId: f9b2c4e3-8a7d-4e1f-b5c3-2d9a6f8e4b71
DateApproved: 8/26/2026
MetaDescription: Learn how to discover, install, and manage agent plugins in {% data variables.product.prodname_vscode_shortname %}, including plugins that follow the open Agent Plugins standard.
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
# Agent plugins in {% data variables.product.prodname_vscode_shortname %}

Agent plugins are prepackaged bundles of agent customizations that you can discover and install from plugin marketplaces in {% data variables.product.prodname_vscode %}. Plugins work alongside your locally defined customizations. When you install a plugin, its supported customizations appear in chat.

Agent Plugins is an [open standard](https://agent-plugins.org/) for packaging [agent skills](/docs/agent-customization/agent-skills.md) and [MCP servers](/docs/agent-customization/mcp-servers.md) that works across multiple AI agents, including GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}, {% data variables.copilot.copilot_cli %}, and the {% data variables.copilot.github_copilot_app %}.
{% data variables.product.prodname_vscode_shortname %} also supports client-specific plugin capabilities, including slash commands, [custom agents](/docs/agent-customization/custom-agents.md), rules, and [hooks](/docs/agent-customization/hooks.md). In an Agent Plugins package, these come from the `com.github.copilot` namespace. The existing Copilot and Claude plugin formats keep their own layouts.

For how plugins fit into the broader set of customization options, see [Customization concepts](/docs/agents/concepts/customization.md).

> [!NOTE]
> Enable or disable support for agent plugins with the `setting(chat.plugins.enabled)` setting.

## What plugins provide

Agent Plugins 1.0 defines skills and MCP servers as portable component types. Other capabilities are client-specific and use the standard's reverse-domain [client extension namespaces](https://agent-plugins.org/plugin-authors/client-extensions). {% data variables.product.prodname_vscode_shortname %} reads Copilot-specific components from the `com.github.copilot` namespace and ignores namespaces owned by other clients.

| Capability | Description | Client-specific | Standard |
|------------|-------------|:--------------:|:--------:|
| [MCP servers](/docs/agent-customization/mcp-servers.md) | External tool integrations | | ✓ |
| [Skills](/docs/agent-customization/agent-skills.md) | Instructions, scripts, and resources that load on-demand | | ✓ |
| [Agents](/docs/agent-customization/custom-agents.md) | Specialized personas and tool configurations | ✓ | |
| [Hooks](/docs/agent-customization/hooks.md) | Shell commands that execute at agent lifecycle points | ✓ | |
| Slash commands | Commands you can invoke with `/` in chat | ✓ | |

For example, a testing plugin might include a `test-runner` skill with scripts, a `test-reviewer` agent with read-only tools, and an MCP server for a test reporting dashboard. In the Agent Plugins format, the directory structure looks like this:

```text
my-testing-plugin/
  plugin.json              # Plugin metadata and configuration
  skills/
    test-runner/
      SKILL.md             # Testing skill instructions
      run-tests.sh         # Supporting script
  mcp.json                 # MCP server definitions
  scripts/
    validate-tests.sh      # Hook script
  com.github.copilot/
    agents/
      test-reviewer.agent.md  # Code review agent
    hooks/
      hooks.json           # Hook configuration
```

Plugins in the Copilot and Claude formats provide the same capabilities from different locations. See [Plugin formats](#plugin-formats).

Once installed, plugin-provided customizations appear alongside your locally defined ones. For example, skills from a plugin show up in the **Configure Skills** menu, and MCP servers from a plugin appear in the MCP server list.

> [!CAUTION]
> Plugins can include hooks and MCP servers that run code on your machine. Review the plugin contents and publisher before installing, especially for plugins from community marketplaces.

## Plugin manifest (plugin.json)

An Agent Plugins 1.0 package has a `plugin.json` file at its root that declares the standard's schema:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-dev-tools",
  "description": "React development utilities",
  "version": "1.2.0"
}
```

| Field | Type | Required | Description |
|-------|------|:--------:|-------------|
| `$schema` | string | Yes | Canonical Agent Plugins schema identifier. |
| `name` | string | Yes | Plugin name and package identifier. |
| `version` | string | No | Plugin version. Semantic Versioning is recommended. |
| `description` | string | No | Brief description of the plugin. |
| `author` | object | No | Author information with optional `name`, `email`, and `url` fields. |
| `homepage` | string | No | Documentation or homepage. |
| `repository` | string | No | Source repository. |
| `license` | string | No | License identifier. An SPDX identifier is recommended. |
| `keywords` | string[] | No | Search and discovery terms. |
| `extensions` | object | No | Client-specific data keyed by reverse-domain namespace. |

Skills are discovered from the `skills/` folder, and MCP server configuration is discovered from the `mcp.json` file. You don't list these component paths in the manifest. Custom agents, hooks, commands, and MCP server definitions are not portable top-level manifest fields.

Copilot-specific components live in the `com.github.copilot` directory at the plugin root, and Copilot-specific manifest data goes under the matching key in `extensions`:

```text
my-plugin/
  plugin.json              # $schema declares Agent Plugins 1.0
  skills/                  # Portable: agent skills
  mcp.json                 # Portable: MCP server configuration
  com.github.copilot/      # Copilot-specific components
    agents/
    commands/
    rules/
    hooks/
      hooks.json
```

Other clients ignore the `com.github.copilot` namespace, so a package stays portable while keeping its Copilot capabilities.

For the full field constraints and validation rules, see the [Agent Plugins manifest documentation](https://agent-plugins.org/plugin-authors/manifest).

> [!NOTE]
> Existing Copilot-format plugins that don't declare the Agent Plugins schema remain supported. For their manifest fields, see the [{% data variables.copilot.copilot_cli %} plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference#pluginjson).

## Plugin formats

{% data variables.product.prodname_vscode_shortname %} auto-detects the plugin format by checking the root manifest and format-specific manifest paths. A root `plugin.json` that declares the canonical Agent Plugins `$schema` uses Agent Plugins semantics. The Copilot format is used as the default when no other format marker is found.

| Plugin format | Plugin manifest |
|---------------|-----------------|
| Agent Plugins 1.0 | `plugin.json` with `$schema` set to `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` |
| Copilot | `plugin.json` |
| Claude | `.claude-plugin/plugin.json` |
| Legacy OpenPlugin | `.plugin/plugin.json` |

### Plugin environment variables

Some plugin formats provide a root token that you can use in hook commands and MCP server configurations to reference files within the plugin directory. {% data variables.product.prodname_vscode_shortname %} expands the token at runtime and also sets it as an environment variable in the hook or server process.

| Plugin format | Plugin root |
|---------------|------------------|
| Agent Plugins 1.0 | `${PLUGIN_ROOT}` |
| Claude | `${CLAUDE_PLUGIN_ROOT}` |
| Copilot | `${PLUGIN_ROOT}` or `${CLAUDE_PLUGIN_ROOT}` |
| Legacy OpenPlugin | `${PLUGIN_ROOT}` |

Agent Plugins 1.0 also defines `${PLUGIN_ROOT}` for packaged files and `${PLUGIN_DATA}` for writable state that persists across plugin updates. {% data variables.product.prodname_vscode_shortname %} preserves these placeholders for the plugin runtime to expand. For details about where placeholders are supported, see the [Agent Plugins specification](https://github.com/agentplugins/agent-plugins-spec/blob/main/spec/1.0.0.md#9-environment-variables-and-placeholder-expansion).

## MCP servers in plugins

Plugins can bundle [MCP servers](/docs/agent-customization/mcp-servers.md) to provide agents with additional tools and data sources. Plugin MCP servers start automatically when the plugin is enabled and stop when the plugin is disabled.

### MCP configuration file

{% tabs id="mcp-configuration" %}
{% tab label="Agent Plugins 1.0" %}

Place MCP server definitions in the `mcp.json` file at the plugin root and follow the [portable MCP configuration format](https://agent-plugins.org/plugin-authors/mcp-servers).

```text
my-plugin/
  plugin.json             # Plugin metadata and configuration
  skills/
  mcp.json              # MCP server definitions
  servers/
    db-server             # Server executable
  config.json             # Server configuration
```

{% /tab %}

{% tab label="Copilot and Claude" %}

Place MCP server definitions in the `.mcp.json` file at the plugin root. {% data variables.product.prodname_vscode_shortname %} discovers this file automatically when it loads the plugin.

```text
my-plugin/
  plugin.json             # Plugin metadata and configuration
  skills/
  .mcp.json              # MCP server definitions
  servers/
    db-server             # Server executable
  config.json             # Server configuration
```

In the `.mcp.json` file, MCP servers are defined in a top-level `mcpServers` object. Each server entry specifies a command, arguments, and optional environment variables:

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

### Reference plugin paths in server configuration

For Claude-format plugins, use the `${CLAUDE_PLUGIN_ROOT}` token in MCP server fields to reference executables and files within the plugin directory. {% data variables.product.prodname_vscode_shortname %} expands this token in the following fields:

* `command`: the executable path
* `args`: command-line arguments
* `cwd`: working directory
* `env`: environment variable values
* `envFile`: path to an environment file
* `url`: for HTTP-based MCP servers
* `headers`: HTTP header values

{% data variables.product.prodname_vscode_shortname %} also injects a `CLAUDE_PLUGIN_ROOT` environment variable into the server process, so server code can access the plugin path at runtime.

{% /tab %}

{% /tabs %}

### How plugin MCP servers interact with other servers

Plugin MCP servers appear alongside workspace and user-level MCP servers. You can manage them through the same tools:

* Select **Configure Tools** in the {% data variables.copilot.chat_view %} to see tools from all MCP servers, including plugin servers.

* Run **MCP: List Servers** from the Command Palette to view plugin servers alongside other servers.

Plugin MCP servers are implicitly trusted when you install the plugin. Unlike workspace MCP servers, they do not show a separate trust prompt at startup.

Disabling a plugin stops its MCP servers. Tools provided by the stopped servers are no longer available in chat.

## Hooks in plugins

Plugins can include [hooks](/docs/agent-customization/hooks.md) that run shell commands at agent lifecycle points. Plugin hooks work alongside your workspace and user-level hooks. When a plugin is enabled, its hooks fire in addition to any other hooks configured for the same event.

> [!NOTE]
> Hooks are client-specific and are not a portable Agent Plugins 1.0 component type. In an Agent Plugins package, they come from the `com.github.copilot` namespace.

### Hook file location

The hook file location depends on the plugin format:

| Plugin format | Hook file path |
|---------------|----------------|
| Agent Plugins 1.0 | `com.github.copilot/hooks/hooks.json` |
| Claude | `hooks/hooks.json` |
| Copilot | `hooks.json` (at the plugin root) |

{% data variables.product.prodname_vscode_shortname %} auto-detects the plugin format and discovers the hook file automatically.

```text
my-plugin/
  plugin.json
  com.github.copilot/
    hooks/
      hooks.json         # Hook configuration (Agent Plugins format)
  scripts/
    format.sh            # Hook script referenced by hooks.json
```

### Hook configuration format

Plugin hooks use the same base format as [workspace hooks](/docs/agent-customization/hooks.md#hook-configuration-format). {% data variables.product.prodname_vscode_shortname %} parses Claude Code hook configuration, including matcher syntax. Currently, {% data variables.product.prodname_vscode_shortname %} ignores matcher values, so hooks run on every matching event.

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

{% data variables.product.prodname_vscode_shortname %} parses the `matcher` field for compatibility with Claude Code, but currently ignores matcher values. If you need to filter hook behavior in {% data variables.product.prodname_vscode_shortname %}, check the event input inside the hook script.

### Reference plugin paths in hook commands

For Claude-format plugins, use the `${CLAUDE_PLUGIN_ROOT}` token in hook commands to reference scripts and files within the plugin directory. {% data variables.product.prodname_vscode_shortname %} expands this token to the plugin's absolute path at runtime and also sets a `CLAUDE_PLUGIN_ROOT` environment variable for the hook process. Inside your script, access this as `$CLAUDE_PLUGIN_ROOT` (or `%CLAUDE_PLUGIN_ROOT%` on Windows).

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

Plugin hooks support the same lifecycle events as workspace hooks: `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PreCompact`, `SubagentStart`, `SubagentStop`, and `Stop`. See [Hook lifecycle events](/docs/agent-customization/hooks.md#hook-lifecycle-events) for details on each event.

### How plugin hooks interact with other hooks

Plugin hooks run alongside workspace-level and user-level hooks. When multiple hooks target the same event, all of them execute. For `PreToolUse` hooks, the most restrictive permission decision across all hooks wins: `deny` overrides `ask`, which overrides `allow`.

Disabling a plugin also disables its hooks. You can enable or disable plugins globally or for a specific workspace from the Extensions view.

## Discover and install plugins

You can browse and install plugins from marketplaces or directly from a Git repository.

### Install a plugin from a marketplace

{% tabs id="plugin-marketplace" %}
{% tab label="Extensions view" %}

1. Open the Extensions view (`kb(workbench.view.extensions)`) and enter `@agentPlugins` in the search field.

    Alternatively, select the **More Actions** (three dots) icon in the Extensions sidebar and choose **Views** > **Agent Plugins**.

1. Browse the list of available plugins from your [configured marketplaces](#configure-plugin-marketplaces).

    ![Screenshot of browsing agent plugins in the Extensions sidebar.](images/agent-plugins/extensions-view.png)

1. Select **Install** to install a plugin.

    The first time you install a plugin from a new marketplace, {% data variables.product.prodname_vscode_shortname %} shows a trust prompt. Review the marketplace source before confirming.

{% /tab %}

{% tab label="Agent Customizations" %}

1. Open the Agent Customizations editor by running **Chat: Open Customizations** from the Command Palette, selecting the gear icon in the {% data variables.copilot.chat_view %}, or selecting **Plugins** in the {% data variables.copilot.agents_window %}.

1. Select the **Plugins** tab and select **Browse Marketplace** to browse available plugins from your [configured marketplaces](#configure-plugin-marketplaces).

1. Select **Install** to install a plugin.

  The first time you install a plugin from a new marketplace, {% data variables.product.prodname_vscode_shortname %} shows a trust prompt. Review the marketplace source before confirming.

{% /tab %}
{% /tabs %}

### Install a plugin from source

You can install a plugin directly from a Git repository URL without adding a full marketplace first.

* Run **Chat: Install Plugin From Source** from the Command Palette.

* Alternatively, select **Install Plugin from Source** on the **Plugins** page of the Agent Customizations editor.

Enter a Git repository URL (for example, `https://github.com/rwoll/markdown-review`) and {% data variables.product.prodname_vscode_shortname %} clones and installs the plugin.

### Plugins installed by {% data variables.copilot.copilot_cli %}

{% data variables.product.prodname_vscode_shortname %} automatically discovers plugins that you install with the [{% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing) to enable you to use them also in {% data variables.product.prodname_vscode_shortname %}. Plugins from `~/.copilot/installed-plugins/` appear in the **Agent Plugins - Installed** view alongside plugins you installed from a marketplace or from source.

The CLI stores plugins under `~/.copilot/installed-plugins/<marketplace>/<plugin>/`. Plugins installed directly from a Git URL (rather than from a marketplace) live under the `_direct` bucket, for example `~/.copilot/installed-plugins/_direct/github--moda-linter--copilot-plugin/`.

### View installed plugins

The **Agent Plugins - Installed** view in the Extensions view shows the plugins you have installed. From this view, you can enable, disable, or uninstall plugins.

![Screenshot of the Agent Plugins - Installed view in the Extensions view.](images/agent-plugins/installed-plugins.png)

You can also manage installed plugins from the {% data variables.copilot.chat_view %} by selecting the **gear icon** > **Plugins**.

### Enable or disable plugins

You can enable or disable a plugin globally or for a specific workspace:

* Use the context menu on a plugin in the **Agent Plugins - Installed** section of the Extensions view.

* Use the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) to toggle a plugin's enabled state.

The enable/disable state is stored separately from the plugin configuration, so it does not affect shared workspace settings.

When a plugin is disabled, its skills, agents, hooks, MCP servers, and slash commands are no longer available. For example, skills from a disabled plugin do not appear in **Chat: Configure Skills**. Disabled plugins appear with a dimmed style in the Agent Customizations editor and Extensions view.

### Uninstall plugins

To remove a plugin, right-click it in the **Agent Plugins - Installed** view and select **Uninstall**. Plugins installed from an external source (such as npm, PyPI, or an external Git repository) are removed from disk. Plugins that are inlined in a marketplace repository remain on disk but are no longer active.

## Configure plugin marketplaces

By default, {% data variables.product.prodname_vscode_shortname %} discovers plugins from the [copilot-plugins](https://github.com/github/copilot-plugins) and [awesome-copilot](https://github.com/github/awesome-copilot/). You can add additional marketplaces with the `setting(chat.plugins.marketplaces)` setting.

Marketplaces are Git repositories that contain plugin definitions. You can reference them in several formats:

* **Shorthand**: `owner/repo` for public GitHub repositories. For example, `anthropics/claude-code`.
* **HTTPS git remote**: a full URL ending in `.git`. For example, `https://github.com/anthropics/claude-code.git`.
* **SCP-style git remote**: SSH-style references. For example, `git@github.com:anthropics/claude-code.git`.
* **file URI**: a `file:///` path to a marketplace repository already cloned on disk.

Private repositories are also supported. If a public lookup fails, {% data variables.product.prodname_vscode_shortname %} falls back to cloning the repository directly.

Marketplace plugins can also reference external package sources such as npm or PyPI packages. For the full marketplace plugin schema, see the [Claude Code plugin marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces).

```json
// settings.json
"chat.plugins.marketplaces": [
    "anthropics/claude-code"
]
```

> [!NOTE]
> Enterprise admins can centrally control which plugins and marketplaces are available to developers. For more information, see [Manage agent plugins and marketplaces](/docs/enterprise/ai-settings.md#manage-agent-plugins-and-marketplaces).

## Use local plugins

If you manually clone or download a plugin, you can register it with the `setting(chat.pluginLocations)` setting. This setting maps local plugin directory paths to an enabled or disabled state. Set the value to `true` to enable the plugin, or `false` to keep it registered but disabled.

```json
// settings.json
"chat.pluginLocations": {
    "/path/to/my-plugin": true,
    "/path/to/another-plugin": false
}
```

## Update plugins

{% data variables.product.prodname_vscode_shortname %} checks for plugin updates when you run **Extensions: Check for Extension Updates** from the Command Palette, or automatically every 24 hours when `setting(extensions.autoUpdate)` is enabled.

Updating pulls down changes from cloned marketplace repositories and checks for new versions of externally sourced plugins.

Plugins sourced from npm or PyPI never update automatically. Instead, they show an **Update** button in the Extensions view. Selecting the button prompts you to confirm before running the install command. If an update is found during a background check, no action is taken until you explicitly select **Update**.

## Workspace plugin recommendations

Projects can recommend plugins for team members by configuring plugin settings in the workspace settings (`.claude/settings.json` or `.github/copilot/settings.json`).

{% data variables.product.prodname_vscode_shortname %} shows a notification the first time a chat message is sent. You can view the recommended plugins by opening the Extensions view and filtering by `@agentPlugins @recommended`.

Specify the following fields in the settings file to configure workspace plugin recommendations:

* **`extraKnownMarketplaces`**: registers additional marketplaces for the project. These marketplaces appear when you search `@agentPlugins` in the Extensions view.

* **`enabledPlugins`**: lists plugins that should be enabled by default.

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

Agent Plugins 1.0 is an open standard designed for cross-tool compatibility. A conformant plugin uses a root `plugin.json`, puts skills in `skills/`, and puts MCP server configuration in `mcp.json`. Compatible clients can discover the portable component types they support from the same package.

Agent Plugins can also include client-specific manifest data and files under a stable reverse-domain namespace. Clients ignore namespaces they don't implement, so client-specific capabilities don't prevent other clients from loading the portable components. {% data variables.product.prodname_vscode_shortname %} reads custom agents, slash commands, rules, and hooks from the `com.github.copilot` namespace, which {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %} also read.

For example:

```text
my-plugin/
  plugin.json
  skills/
  mcp.json
  com.github.copilot/      # Read by {% data variables.product.prodname_vscode_shortname %} and other Copilot clients
  com.example.client/      # Ignored by {% data variables.product.prodname_vscode_shortname %}
```

{% data variables.product.prodname_vscode_shortname %} continues to support existing Copilot, Claude, and legacy OpenPlugin formats. Plugins that don't declare the Agent Plugins schema continue to use their existing format-specific discovery rules.

For details about the portable format, see the [Agent Plugins specification](https://github.com/agentplugins/agent-plugins-spec/blob/main/spec/1.0.0.md). For other formats, see the [{% data variables.copilot.copilot_cli %} plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) and the [Claude Code plugin marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces).

## Troubleshooting

### Plugin does not appear after installation

* Confirm that agent plugins are enabled: check that `setting(chat.plugins.enabled)` is set to `true`.
* Verify the plugin's `name` field follows the naming rules for its format. Agent Plugins 1.0 names use lowercase letters, numbers, hyphens, and periods. Legacy Copilot plugin names use lowercase letters, numbers, and hyphens. Slashes and colons aren't supported.
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

* [Finding and installing plugins for {% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)
* [{% data variables.copilot.copilot_cli %} plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
