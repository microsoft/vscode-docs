---
ContentId: f9b2c4e3-8a7d-4e1f-b5c3-2d9a6f8e4b71
DateApproved: 3/9/2026
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
    post-test.json         # Hook to run after tests
```

Once installed, plugin-provided customizations appear alongside your locally defined ones. For example, skills from a plugin show up in the **Configure Skills** menu, and MCP servers from a plugin appear in the MCP server list.

> [!CAUTION]
> Plugins can include hooks and MCP servers that run code on your machine. Review the plugin contents and publisher before installing, especially for plugins from community marketplaces.

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

You can enable or disable a plugin globally or for a specific workspace. Use the context menu on a plugin in the Extensions view, or select the enable/disable button in the plugin editor.

When a plugin is disabled, its skills, agents, hooks, MCP servers, and slash commands are no longer available. For example, skills from a disabled plugin do not appear in **Chat: Configure Skills**.

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

If you manually clone or download a plugin, you can register it with the `setting(chat.plugins.paths)` setting. This setting maps local plugin directory paths to an enabled or disabled state.

```json
// settings.json
"chat.plugins.paths": {
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

## Related resources

* [Finding and installing plugins for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)
* [Use Agent Skills](/docs/copilot/customization/agent-skills.md)
* [Add and manage MCP servers](/docs/copilot/customization/mcp-servers.md)
* [Use hooks for lifecycle automation](/docs/copilot/customization/hooks.md)
* [Create custom agents](/docs/copilot/customization/custom-agents.md)
