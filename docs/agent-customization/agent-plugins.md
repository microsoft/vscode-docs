---
ContentId: f9b2c4e3-8a7d-4e1f-b5c3-2d9a6f8e4b71
DateApproved: 11/4/2026
MetaDescription: Find, install, and manage agent plugins from marketplaces in {% data variables.product.prodname_vscode_shortname %}.
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
- automations
---
# Agent plugins in {% data variables.product.prodname_vscode_shortname %}

Agent plugins package related customizations, such as skills, agents, and tool integrations, so you can install them together. For example, a testing plugin can include a test-running skill, review agent, and reporting integration that are intended to work together.

This article shows you how to discover and install a plugin, verify it with a document-review workflow, and manage the installation. To create or package a plugin, see the [agent plugin authoring reference](/docs/agents/reference/agent-plugin-reference.md).

If you only need a project rule or a single skill, start with an [individual customization](/docs/agents/concepts/customization.md#customization-building-blocks). Choose a bundle when its components support a workflow you want to adopt together.

> [!NOTE]
> Enable or disable support for agent plugins with the `setting(chat.plugins.enabled)` setting.

## What plugins provide

Plugins can provide the following customizations. The selected harness and plugin format determine which components are available.

| Capability | Purpose |
|------------|---------|
| [Skills](/docs/agent-customization/agent-skills.md) | Instructions, scripts, and resources for specialized workflows |
| [MCP servers](/docs/agent-customization/mcp-servers.md) | Tools for interacting with external systems |
| [Canvases](/docs/agents/run/canvases.md) `feature(canvases)` | Interactive visual surfaces shared by you and the agent in supported {% data variables.product.prodname_copilot_short %} sessions |
| [Custom agents](/docs/agent-customization/custom-agents.md) | Specialized roles and tool configurations |
| [Custom instructions](/docs/agent-customization/custom-instructions.md) | Reusable guidance supplied as plugin rules |
| [Hooks](/docs/agent-customization/hooks.md) | Commands that run at specific points in the agent's workflow |
| [Automation templates](/docs/agents/run/automations.md#start-from-a-template) | Starting prompts and schedules to review before creating an automation |
| Slash commands | Commands you can invoke with `/` in chat |

Installed plugin customizations appear alongside your locally defined ones. For example, skills from a plugin show up in **Configure Skills**, and MCP servers appear in the MCP server list. Installing an automation template does not start an automation; review and configure it before turning it on.

Check the plugin's supported clients and components before installing. See [Cross-tool compatibility](#cross-tool-compatibility) for how portable and client-specific components differ.

> [!CAUTION]
> Plugins can include hooks and MCP servers that run code on your machine. Review the plugin contents and publisher before installing, especially for plugins from community marketplaces.

## Discover and install plugins

Use the Agent Customizations editor to browse marketplaces and install plugins. You can also install a plugin directly from a Git repository or local folder. Available plugins and actions depend on the selected [agent harness](/docs/agents/concepts/agent-harnesses.md) and organization policy.

Choose your harness before installing and use the same harness to verify the result. The walkthrough below uses **Copilot**.

Plugin marketplaces let you reuse workflows published by the community or your organization. If you don't need a bundle, the [Customization Marketplace](/docs/agent-customization/overview.md#discover-and-install-existing-customizations-preview) also provides discovery for individual skills and MCP servers from supported sources.

### Install a plugin from a marketplace

1. Open the Agent Customizations editor by running **Chat: Open Customizations** from the Command Palette, selecting **Open Customizations** in the {% data variables.copilot.chat_view %} title bar, or selecting **Customizations** in the {% data variables.copilot.agents_window %} sidebar.

1. Browse available plugins from your [configured marketplaces](#configure-plugin-marketplaces).  Available sources depend on the selected harness and organization policy.

    * In the unified Customization Marketplace (Preview), select **Browse** and use the source menu to choose a plugin marketplace, or search across available sources.
    * If the unified **Browse** page isn't available, select **Plugins** and then **Browse Marketplace** to find available plugins.

1. Select a plugin to review its publisher, included customizations, and **Plugin README**, when provided.

1. Select **Install** to install a plugin.

    The first time you install a plugin from a new marketplace, {% data variables.product.prodname_vscode_shortname %} shows a trust prompt. Review the marketplace source before confirming. Trusting a marketplace doesn't replace reviewing each plugin's contents, setup requirements, or future updates.

### Install a plugin from source

You can install a plugin directly from a Git repository or local folder without adding a full marketplace first. For a repository URL, {% data variables.product.prodname_vscode_shortname %} clones and installs the plugin.

1. In the Agent Customizations editor, select **Plugins**, then select the add (`+`) button next to **User** or **Workspace**, depending on where you want to install the plugin.

1. Enter a Git repository URL (for example, `https://github.com/rwoll/markdown-review`) or a local folder path.


Alternatively, run **Chat: Install Plugin from Source** from the Command Palette.

### Try a document-review workflow

The community [Markdown Review plugin](https://github.com/rwoll/markdown-review) provides a skill that opens a Markdown file in a browser for comments and returns the feedback to the agent. Use it to check the full workflow, not just whether a plugin appears in the editor.

For this example, open a local project with the **Copilot** harness. Install Node.js with `npx` available and use a machine where you can open a local browser. Review the plugin's README and bundled `markdown-plan-review-feedback` skill before installing.

1. [Install the plugin from source](#install-a-plugin-from-source) using `https://github.com/rwoll/markdown-review`. Choose **User** for a personal trial.

1. Start a fresh {% data variables.product.prodname_copilot_short %} session in your project and enter:

    ```prompt
    Create plugin-review.md with a short documentation plan for this repository.
    Use the Markdown Review plugin to open it for my review, then summarize
    the feedback I submit. Do not change application code.
    ```

1. Inspect the skill and tool activity. Review any approval request before the publisher's CLI runs. The workflow launches a temporary local web server and opens the review UI in your browser.

1. Add a comment to the document in the browser, then submit your feedback.

1. Check that the agent receives your comment and accurately summarizes it. Confirm that the Markdown file exists and no application code changed.

The workflow succeeds when you can trace your browser comment back to the agent's response. If the browser doesn't open or feedback doesn't return, check the plugin's runtime requirements and command output before repeating the request.

After the trial, close the review tab and remove `plugin-review.md` if you don't need it. You can [uninstall the plugin](#uninstall-plugins) if you don't want to keep the workflow.

### Share and install plugins with deep links

Plugin providers can create shareable deep links to help users register a marketplace or install a specific named plugin directly in {% data variables.product.prodname_vscode_shortname %}.

> [!IMPORTANT]
> Agent plugins are distinct from {% data variables.product.prodname_vscode_shortname %} extensions. To install an extension from the {% data variables.product.prodname_vs_marketplace %}, use `vscode:extension/<publisher>.<extensionName>` as described in [URL handling](/docs/configure/command-line.md#url-handling).

#### Install a specific plugin

Use the `chat-plugin/install` route to add a marketplace (if not already registered) and install a specific named plugin:

```text
vscode://chat-plugin/install?source=<url-encoded-source>&plugin=<url-encoded-plugin-name>
```

Parameters:

* **`source`** (required): The remote marketplace source (for example, `owner/repo` or a Git repository URL).
* **`plugin`** (required): The exact plugin name declared in the plugin manifest (`plugin.json`). Do not include the `@marketplace` qualifier used by the CLI.

URL-encode parameter values (for example, `/` as `%2F`).

**Example:**

```text
vscode://chat-plugin/install?source=owner%2Frepo&plugin=plugin-name
```

When opened, {% data variables.product.prodname_vscode_shortname %} asks the user to confirm adding the marketplace and installing the plugin. If confirmed, {% data variables.product.prodname_vscode_shortname %} registers the marketplace, locates the plugin by name, installs it into the Copilot Agent Host session, and opens the Agent Customizations editor filtered to the plugin.

#### Add a plugin marketplace

To register a marketplace without installing any plugins, use the `chat-plugin/add-marketplace` route:

```text
vscode://chat-plugin/add-marketplace?ref=<url-encoded-source>
```

**Example:**

```text
vscode://chat-plugin/add-marketplace?ref=owner%2Frepo
```

When opened, {% data variables.product.prodname_vscode_shortname %} prompts the user to confirm adding the marketplace. Adding a marketplace alone makes its plugins discoverable, but does not install any plugins automatically.

#### Deep link requirements and security

* **Consent and security:** Plugins can execute code via hooks or MCP servers. Deep links always prompt for explicit user confirmation before registering a marketplace or installing a plugin, and cannot bypass trust dialogs, workspace trust, or enterprise policies.
* **Prerequisites:** Plugin deep links require `setting(chat.plugins.enabled)` to be enabled and Copilot Agent Host support to be available. If no suitable session exists, {% data variables.product.prodname_vscode_shortname %} prompts the user to create one.
* **Insiders and web redirect:** For {% data variables.product.prodname_vscode_shortname %} Insiders, use the `vscode-insiders://` scheme. To publish links on web pages or markdown badges, use the HTTPS redirect wrapper:

  ```text
  https://vscode.dev/redirect?url=vscode%3A%2F%2Fchat-plugin%2Finstall%3Fsource%3Downer%252Frepo%26plugin%3Dplugin-name
  ```

### Plugins installed by {% data variables.copilot.copilot_cli %}

{% data variables.product.prodname_vscode_shortname %} automatically discovers plugins that you install with the [{% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing) to enable you to use them also in {% data variables.product.prodname_vscode_shortname %}. Discovered plugins from `~/.copilot/installed-plugins/` appear on the **Plugins** page of the Agent Customizations editor.

The CLI stores plugins under `~/.copilot/installed-plugins/<marketplace>/<plugin>/`. Plugins installed directly from a Git URL (rather than from a marketplace) live under the `_direct` bucket, for example `~/.copilot/installed-plugins/_direct/github--moda-linter--copilot-plugin/`.

### View installed plugins

In the Agent Customizations editor, select **Plugins** to view the plugins available to the selected harness. From this page, you can inspect, enable, disable, or uninstall plugins.

<!-- TODO: Add a screenshot showing installed plugins and their management controls in the Agent Customizations editor. -->

Select an installed plugin to open its details. Review its **Plugin README** and included customizations. Under **Skills**, select a skill to open its instructions.

<!-- TODO: Add a screenshot showing an installed plugin's details, Plugin README, and bundled skills in the Agent Customizations editor. -->

### Verify a plugin after installation

Installing a plugin makes its supported components available; it doesn't guarantee that an agent uses them for every task.

1. In the Agent Customizations editor, select **Plugins** and confirm that the plugin is listed and enabled for the intended harness and workspace.

1. Review the publisher's setup instructions and complete any required configuration. For bundled MCP servers, check [server controls and connection requirements](/docs/agents/run/manage-mcp-servers.md#open-the-server-controls).

1. Start a fresh session with the intended harness and workspace. Confirm that the components you need are available. For example, [run one of the plugin's skills](/docs/agent-customization/agent-skills.md#use-skills-as-slash-commands) if it appears in the `/` menu.

1. Try a small task you expect the plugin to help with, then review the agent's actions and result against a concrete outcome. For example, the [document-review walkthrough](#try-a-document-review-workflow) checks that a submitted comment reaches the agent, not just that the skill runs.

If you only need a skill, consider [using or adapting an existing skill](/docs/agent-customization/agent-skills.md#use-an-existing-skill) instead of installing a plugin. To change and maintain a plugin, follow the [plugin authoring reference](/docs/agents/reference/agent-plugin-reference.md).

### Enable or disable plugins

Where offered by the selected harness, you can enable or disable a plugin globally or for a specific workspace. Enablement is separate from where the plugin is installed:

1. Select the intended session. In the Agent Customizations editor, select **Plugins** and open the plugin's details.
1. Use **Enable** or **Disable** to change its global state, or **Enable (Workspace)** or **Disable (Workspace)** for the current workspace. Use the button's dropdown menu to choose an available scope.

Global enablement isn't isolated to the active user profile. The enabled state is stored separately from the plugin configuration, so a workspace enablement choice doesn't change shared workspace settings. For remote sessions, check whether the plugin is host-owned or supplied by the connected client before changing it. See [customization context and change scope](/docs/agent-customization/overview.md#understand-what-a-change-affects).

Policy-managed plugins are identified as managed by policy, and their toggles are locked.

When a plugin is disabled, its skills, agents, hooks, MCP servers, slash commands, and automation templates are no longer available. For example, skills from a disabled plugin do not appear in **Chat: Configure Skills**, and automation templates do not appear in **Templates from Plugins**. Disabled plugins appear with a dimmed style in the Agent Customizations editor.

### Uninstall plugins

In the Agent Customizations editor, select **Plugins**, open the plugin's details, and select **Uninstall**.

You can't uninstall a plugin required by your organization, including through its bundled skills, prompts, or other customizations.

Plugins installed from an external source (such as npm, PyPI, or an external Git repository) are removed from disk. Plugins that are inlined in a marketplace repository remain on disk but are no longer active.

## Configure plugin marketplaces

A plugin marketplace is a Git repository containing a catalog of plugin definitions. Add community or organization marketplaces in the Agent Customizations editor, or configure their sources in Settings.

Adding a marketplace makes its plugins available to browse. It does not install or enable them.

### Manage marketplaces in the Customizations editor (Preview)

1. Open the Agent Customizations editor and select **Browse**.
1. Open the source menu and select **Configure Marketplaces**.
1. Select **Add Marketplace** and enter a GitHub repository, Git repository URL, or local repository URI. Only add marketplaces you trust.
1. Return to **Browse** and select the added marketplace from the source menu to browse its plugins.

To manage an existing marketplace, select it in **Configure Marketplaces**. Available actions depend on the selected harness and include **Browse**, **Refresh Marketplace**, **Open Folder**, and **Remove Marketplace**. Use **Back** to return to the marketplace list.

Organization-managed marketplaces can't be removed, and some harnesses also protect built-in marketplaces. If prompted to **Remove Marketplace and Plugins**, review which plugins will be uninstalled before confirming.

### Configure marketplaces in Settings

You can discover plugins from marketplaces such as [copilot-plugins](https://github.com/github/copilot-plugins) and [awesome-copilot](https://github.com/github/awesome-copilot/). To configure additional marketplaces in Settings, use `setting(chat.plugins.marketplaces)` (Experimental). See [marketplace source formats and revision selection](/docs/agents/reference/agent-plugin-reference.md#marketplace-source-formats) for syntax and examples.

> [!NOTE]
> Enterprise admins can centrally control which plugins and marketplaces are available to developers. For more information, see [Manage agent plugins and marketplaces](/docs/enterprise/manage-ai-settings.md#manage-agent-plugins-and-marketplaces).

## Use local plugins

To install a plugin from a local folder, use [Install a plugin from source](#install-a-plugin-from-source) in the Agent Customizations editor.

If you're developing a plugin or need to register an existing directory without installing it, follow [local plugin registration](/docs/agents/reference/agent-plugin-reference.md#local-plugin-registration) with the Experimental `setting(chat.pluginLocations)` setting.

## Use plugins in remote windows

You can use plugins stored on a remote machine when you work with Remote - SSH, WSL, Dev Containers, or Remote - Tunnels. The **Copilot** harness runs in the remote environment, where it loads the plugin's custom agents, skills, and hooks.

In the connected window, use the Agent Customizations editor's **Plugins** page to [view and manage installed plugins](#view-installed-plugins).

To register an existing plugin directory on the remote machine without installing a copy:

1. Run **Preferences: Open Remote Settings (JSON)** from the Command Palette in the remote window.

1. Add `setting(chat.pluginLocations)` (Experimental) with the plugin's path on the remote filesystem. For the configuration syntax, see [local plugin registration](/docs/agents/reference/agent-plugin-reference.md#local-plugin-registration).

1. Start a new chat with the **Copilot** harness and [verify the plugin's components](#verify-a-plugin-after-installation).

Hooks run on the remote machine or inside the container. Install their required runtimes and tools, such as Node.js, there rather than only on your local computer.

## Update plugins

In the Agent Customizations editor, select **Plugins**, then select **Check for and Apply Updates** (the refresh icon) next to an installed-plugin group. Alternatively, run **Chat: Update Plugins** from the Command Palette.

Updating pulls down changes from cloned marketplace repositories and checks for new versions of externally sourced plugins.

Plugins can also update automatically when `setting(extensions.autoUpdate)` is enabled. Plugins sourced from npm or PyPI never update automatically. Use the update action in the Agent Customizations editor and review the confirmation prompt before the install command runs.

Consider this update behavior when deciding whether to trust a plugin. Review changes to its bundled tools, hooks, and setup requirements when adopting an update. Disable a plugin you no longer trust rather than leaving its components available.

## Workspace plugin recommendations

Projects can recommend plugins for team members by configuring plugin settings in the workspace settings (`.claude/settings.json` or `.github/copilot/settings.json`).

In the Local harness, {% data variables.product.prodname_vscode_shortname %} shows a notification the first time a chat message is sent. To browse and install plugins from the project's marketplaces, open the Agent Customizations editor and select **Browse**, or select **Plugins** > **Browse Marketplace** if the unified Browse experience is unavailable.

In the {% data variables.product.prodname_copilot_short %} harness, `.github/copilot/settings.json` supplies repository plugin and marketplace defaults. You can turn off optional plugins in **Plugins** in the Agent Customizations editor without changing the shared defaults. Enterprise-managed settings take precedence over repository defaults and your choices.

For the configuration fields, naming rules, and a complete example, see [workspace plugin settings](/docs/agents/reference/agent-plugin-reference.md#workspace-plugin-settings). Review a recommended plugin before enabling it, just as you would a plugin you discover yourself.

## Manage plugins with slash commands

As an alternative to the Agent Customizations editor, enter `/plugin ` in a {% data variables.product.prodname_copilot_short %} harness session to view completions for plugin and marketplace operations. Use the interface where you installed the plugin, because its inventory is separate from the editor's. For the command catalog and limitations, see [plugin management commands](/docs/agents/reference/agent-plugin-reference.md#plugin-management-commands).

## Cross-tool compatibility

[Agent Plugins](https://agent-plugins.org/) is an open standard for packaging skills and MCP servers across compatible clients, including {% data variables.product.prodname_copilot %} in {% data variables.product.prodname_vscode_shortname %}, {% data variables.copilot.copilot_cli %}, and the {% data variables.copilot.github_copilot_app %}. Other components, such as custom agents, slash commands, rules, hooks, and automation templates, can be client-specific.

{% data variables.product.prodname_vscode_shortname %} also supports existing Copilot, Claude, and legacy OpenPlugin formats. Support for a package format doesn't guarantee that every component works in every harness or client. Check the plugin's requirements. For file layouts and client-specific namespaces, see the [plugin authoring compatibility reference](/docs/agents/reference/agent-plugin-reference.md#cross-tool-compatibility).

## Troubleshooting

### Plugin does not appear after installation

* Confirm that agent plugins are enabled: check that `setting(chat.plugins.enabled)` is set to `true`.
* Verify the plugin's `name` field follows the naming rules for its format. Agent Plugins 1.0 names use lowercase letters, numbers, hyphens, and periods. Legacy Copilot plugin names use lowercase letters, numbers, and hyphens. Slashes and colons aren't supported.
* Check that `plugin.json` is in a [recognized location](/docs/agents/reference/agent-plugin-reference.md#plugin-formats).

### Skills from a plugin do not load

* Open the `SKILL.md` file and check the `name` field in the YAML frontmatter. The name must be plain kebab-case without namespace prefixes (for example, `test-runner`, not `myorg/test-runner`). Invalid names cause the skill to be silently skipped.
* Make sure the skill directory name matches the `name` field in the `SKILL.md` frontmatter.

### Plugin version does not update

* In the Agent Customizations editor, select **Plugins**, then select **Check for and Apply Updates** (the refresh icon).
* If you maintain the plugin, review its [versioning and update requirements](/docs/agents/reference/agent-plugin-reference.md#test-and-distribute-a-plugin).

### Plugin installation fails after retry

Retry the installation. {% data variables.product.prodname_vscode_shortname %} validates marketplace repository caches and replaces incomplete or invalid caches automatically.

If installation still fails, review the error for an invalid repository, revision, or plugin path. If the source is valid and retry continues to fail, run **Help: Report Issue**. Don't delete or modify the internal plugin cache manually.

## Author a plugin

Use the [agent plugin authoring reference](/docs/agents/reference/agent-plugin-reference.md) to create a package or inspect its configuration:

* **Package structure:** [Manifest fields](/docs/agents/reference/agent-plugin-reference.md#plugin-manifest-pluginjson), [supported formats](/docs/agents/reference/agent-plugin-reference.md#plugin-formats), and [plugin environment variables](/docs/agents/reference/agent-plugin-reference.md#plugin-environment-variables).

* **Automation templates:** [Package prompts and schedules](/docs/agents/reference/agent-plugin-reference.md#automations-in-plugins).

* **MCP servers:** [Server configuration, paths, and interaction with other servers](/docs/agents/reference/agent-plugin-reference.md#mcp-servers-in-plugins).

* **Hooks:** [Hook configuration, paths, and events](/docs/agents/reference/agent-plugin-reference.md#hooks-in-plugins).

## Related resources

* [Finding and installing plugins for {% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)
* [{% data variables.copilot.copilot_cli %} plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
