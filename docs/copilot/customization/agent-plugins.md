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

Once installed, plugin-provided customizations appear alongside your locally defined ones. For example, skills from a plugin show up in the **Configure Skills** menu, and MCP servers from a plugin appear in the MCP server list.

## Discover and install plugins

VS Code provides a dedicated view in the Extensions sidebar to browse and manage agent plugins.

### Browse available plugins

1. Open the Extensions view (`kb(workbench.view.extensions)`) and enter `@agentPlugins` in the search field.

    Alternatively, select the **More Actions** (three dots) icon in the Extensions sidebar and choose **Views** > **Agent Plugins**.

1. Browse the list of available plugins from your configured marketplaces.

    ![Screenshot of browsing agent plugins in the Extensions sidebar.](../images/agent-plugins/extensions-view.png)

1. Select **Install** to install a plugin in your user profile.

### View installed plugins

The **Agent Plugins - Installed** view in the Extensions sidebar shows the plugins you have installed. From this view, you can enable, disable, or uninstall plugins.

![Screenshot of the Agent Plugins - Installed view in the Extensions sidebar.](../images/agent-plugins/installed-plugins.png)

You can also manage installed plugins from the Chat view by selecting the **gear icon** > **Plugins**.

## Configure plugin marketplaces

By default, VS Code discovers plugins from the [copilot-plugins](https://github.com/github/copilot-plugins) and [awesome-copilot](https://github.com/github/awesome-copilot/). You can add additional marketplaces with the `setting(chat.plugins.marketplaces)` setting.

Marketplaces are Git repositories that contain plugin definitions. You can reference them in several formats:

* **Shorthand**: `owner/repo` for public GitHub repositories. For example, `anthropics/claude-code`.
* **HTTPS git remote**: a full URL ending in `.git`. For example, `https://github.com/anthropics/claude-code.git`.
* **SCP-style git remote**: SSH-style references. For example, `git@github.com:anthropics/claude-code.git`.
* **file URI**: a `file:///` path to a marketplace repository already cloned on disk.

Private repositories are also supported. If a public lookup fails, VS Code falls back to cloning the repository directly.

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

## Related resources

* [Finding and installing plugins for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)
* [Use Agent Skills](/docs/copilot/customization/agent-skills.md)
* [Add and manage MCP servers](/docs/copilot/customization/mcp-servers.md)
* [Use hooks for lifecycle automation](/docs/copilot/customization/hooks.md)
* [Create custom agents](/docs/copilot/customization/custom-agents.md)
