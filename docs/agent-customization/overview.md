---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 11/11/2026
MetaDescription: Find, create, and manage agent customizations for a session's harness, workspace, and environment in {% data variables.product.prodname_vscode_shortname %}.
Keywords:
- ai
- copilot
- customization
- chat
- instructions
- rules
- slash commands
- prompt files
- custom agents
- agent skills
- mcp
---
# Customize agents for your workflow

Agent customizations adapt agents to your coding standards, workflows, and development systems. Start by looking for an existing skill, plugin, or integration in a customization marketplace before creating your own. This guide helps you find, install, and verify customizations in {% data variables.product.prodname_vscode %}, or create project-specific guidance.

To understand how customization types differ and work together, see [Agent customization concepts](/docs/agents/concepts/customization.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Core concepts">
Learn about the different customization types and when to use each one.

* [Customization concepts](/docs/agents/concepts/customization.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Tutorial">
Follow a hands-on walkthrough to customize AI for your project.

* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)

</div>

## Choose how to customize

Start with a recurring task or an observed problem, such as the agent using the wrong test command. Choose a representative task and define the result you expect. If the agent already meets your needs, don't add a customization. Put one-time requirements in the current request instead.

| If you want to | Start with |
|----------------|------------|
| Adopt an existing workflow or packaged setup | [Browse customization marketplaces](#discover-and-install-existing-customizations-preview) for skills, plugins, and integrations |
| Stop repeating project commands and conventions | [Create or refine project instructions](/docs/agent-customization/custom-instructions.md#get-started-with-project-instructions) |
| Reuse a multi-step process specific to your team | [Create or adapt an agent skill](/docs/agent-customization/agent-skills.md#create-a-skill) |
| Give a recurring role focused guidance and tools | [Create a custom agent](/docs/agent-customization/custom-agents.md) |
| Connect an external service | [Use a {% data variables.product.prodname_copilot_short %} connector](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)` or [add an MCP server](/docs/agent-customization/mcp-servers.md#connect-a-server) |
| Run an action at specific events of the agent's workflow | [Configure a hook](/docs/agent-customization/hooks.md) |

To understand what each type contributes, see [customization building blocks](/docs/agents/concepts/customization.md#customization-building-blocks).

## Agent Customizations editor

The Agent Customizations editor brings discovery, authoring, and management into one place:

* **Discover** reusable skills, plugins, and integrations through the Customization Marketplace (Preview).
* **Inspect** customizations by type and source to see what is available.
* **Create and edit** instructions, skills, custom agents, and supported configurations using inline editors and forms.
* **Manage availability** with the enablement and tool-selection controls supported by the selected harness.

Available actions depend on the customization type, source, and harness. Some entries are read-only.

The editor shows customizations for the **selected session**, not a combined list for all sessions. Switching sessions can change what appears because the harness, workspace, or execution environment differs. You can see the active harness in the editor's title bar.

The editor can also list disabled items. A listed customization isn't necessarily used in every request: [verify it](#verify-a-customization) with a representative task.

![Screenshot showing the Customizations sidebar action and the Agent Customizations editor.](images/customization/agents-window-customizations.png)

To open the Agent Customizations editor:

1. Select a session and harness for which you want to configure customizations.

1. Open the Agent Customizations editor:

    * **{% data variables.copilot.agents_window %}**: select **Customizations** in the left sidebar.

    * **{% data variables.copilot.chat_view %}**: select **Open Customizations** in the title bar, or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Use the tabs in the editor to navigate between different customization types, such as skills, custom agents, hooks, and MCP servers.

    The experimental **Extensions** section also lets you [choose which installed extensions run in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window-configuration.md#manage-extensions-experimental).

For remote hosts and Dev Containers, see [Manage customizations for remote sessions](#manage-customizations-for-remote-sessions).

> [!IMPORTANT]
> If the Agent Customizations editor shows **Migrations** `feature(user-customization-migration)`, Copilot cannot use one or more customizations in their current location or format. Select **Migrations** to review the required work, and follow [Migrate Copilot customizations in VS Code](/docs/agent-customization/migrate-customizations.md) for detailed steps.

### Reuse customizations across harnesses

For new customizations, select the intended session before creating them in the editor. The editor offers locations and configuration fields for that harness.

When reusing existing customizations, check more than the file's presence:

* **Location**: personal customizations can live in different directories for each harness.
* **Format**: skills use a shared format, but custom-agent fields and hook configuration can differ.
* **Behavior**: referenced tools, scripts, and commands must work in the target session's environment.

After adapting a customization, [verify it](#verify-a-customization) in a session using the target harness.

## Discover and install existing customizations (Preview)

Use the customization marketplace to find a workflow or integration you can reuse instead of building it from scratch. The unified **Browse** page in the Agent Customizations editor brings together available sources, including plugin marketplaces, GitHub Feed, and {% data variables.product.prodname_copilot_short %} connectors `feature(copilot-connectors)`.

The list of available sources and installation actions depends on the selected harness and organization policy.

You can install an individual skill or a plugin that bundles related customizations, such as skills, custom agents, hooks, and MCP servers. For a service integration, find an MCP server or connect a supported service without server setup.

To find and install a customization:

1. Open the Agent Customizations editor and select **Browse**.

1. Use the source menu to browse all sources or select a specific available source, such as **GitHub Feed** or an individual plugin marketplace.

1. Search by name or use a type filter, such as `@type:skill` or `@type:mcp`.

1. Select an item and review its publisher, source, installation details, and any setup requirements.

1. Select **Install** and [choose a scope](#choose-a-customization-scope) when prompted for a destination. For {% data variables.product.prodname_copilot_short %} connectors `feature(copilot-connectors)`, select **Connect** and complete authorization instead.

If your team shares plugins through another marketplace, select **Configure Marketplaces** from the source menu to [add or manage plugin marketplaces](/docs/agent-customization/agent-plugins.md#configure-plugin-marketplaces). Adding a marketplace makes its plugins available to browse. It doesn't install them.

After installation, complete any publisher setup and [verify the customization](#verify-a-customization) with a representative task. For type-specific guidance, see [install a skill](/docs/agent-customization/agent-skills.md#install-a-skill-from-the-customization-marketplace-preview), [install a plugin](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace), or [find an MCP server](/docs/agent-customization/mcp-servers.md#find-another-server).

### Marketplace availability

The **Browse** page appears when a marketplace source is available. Marketplace discovery is enabled by default with `setting(chat.customizations.marketplace.enabled)`.

If **Browse** isn't available, check that the setting is enabled and your organization permits **Editor preview features**. Disabling that policy forces the unified **Browse** experience and {% data variables.product.prodname_copilot_short %} connectors off. See [organization and enterprise settings](/docs/enterprise/manage-ai-settings.md#use-github-organization-and-enterprise-settings).

The experimental GitHub Feed source is enabled by default for harnesses that provide marketplace search. Local sessions don't provide this source, and organization policy can restrict access. Use the `setting(chat.customizations.marketplace.sources.publicFeed.enabled)` setting to show or hide this source. For plugin discovery without the unified **Browse** page, follow the [plugin installation guide](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace).

## Create a customization

For file-based customizations, use the editor to create a file at [user or workspace scope](#choose-a-customization-scope):

1. Select the intended session and confirm its harness, workspace, and execution environment. Open the Agent Customizations editor and select a customization type.

1. Select the `+` button next to **User** or **Workspace** for your chosen scope.

1. Enter a name and choose a storage location when prompted.

1. Edit the customization in the inline editor, which provides syntax highlighting and validation.

1. Review and save the customization.

You can also run the **Chat: New \<customization-type\>** command from the Command Palette (`kb(workbench.action.showCommands)`). The command creates the corresponding file in a supported location for that customization type.

To add an MCP server manually, select **MCP Servers**, select **Add Server** (**+**) in the **User** or **Workspace** group, and follow the guided flow. For detailed steps, see [Add MCP servers](/docs/agent-customization/mcp-servers.md#connect-a-server). To update an existing connection, see [Edit an MCP server configuration](/docs/agents/run/manage-mcp-servers.md#edit-an-mcp-server-configuration).

Creating or saving a file doesn't establish that the agent uses it. Verify the customization before relying on it or sharing it with your team.

### Choose a customization scope

When installing or creating a customization, choose a supported destination:

* **User**: use it across your workspaces without committing it to the project.

* **Workspace**: store it with the project so contributors can share it through source control.

The available destinations depend on the customization type and harness. Follow the individual customization guide for supported locations. For centrally managed configuration and company-shared packages, see [personal and shared customizations](/docs/agents/concepts/customization.md#personal-and-shared-customizations).

## Verify a customization

Repeat your representative task in a fresh chat with the intended harness, workspace, and execution host. For remote sessions, connect from the client you intend to use so its contributions are included. Don't repeat the customization's rules in the test prompt. Check these three stages separately:

1. **Discovery**: open the Agent Customizations editor and confirm that the customization is listed without validation errors.

1. **Inclusion or invocation**: check whether the request uses the customization. For instructions and skills, inspect the response's **References** section, where available, or [Agent Debug Logs](/docs/agents/agent-troubleshooting/chat-debug-view.md#instructions-or-a-prompt-file-are-not-applied). For tools and hooks, inspect the corresponding tool activity or execution logs.

1. **Effectiveness**: review the changes, commands, and results against the outcome you defined. Inclusion doesn't guarantee that the agent follows the guidance.

For example, if project instructions specify the correct test command, ask the agent to make a small code change without restating that command. Confirm that it runs the expected tests and reports their results.

If a stage fails, [troubleshoot that stage](#troubleshoot-customization-issues) before adding more guidance. Once the customization meets your goal, review it before sharing it.

## Manage existing customizations

Use the Agent Customizations editor to find and update customizations for the selected session's context. Select the intended session and check its harness, workspace, and host before editing:

1. Open the Agent Customizations editor and select the customization type.

1. Use the search box to find the customization.

1. Select the customization to open its details.

1. If the customization is editable, update its form or file and save your changes. For a read-only customization, use the available action to open the source file.

The available actions depend on the customization type and its source. Use the inline actions or context menu to access supported operations, such as revealing an editable file in your operating system or deleting it. Check [what the change affects](#understand-what-a-change-affects) before editing a shared file or changing enablement. Manage plugin-provided customizations from the **Plugins** section.

### Understand what a change affects

Changes made from one session's editor aren't necessarily limited to that session:

| Action | What changes |
|--------|--------------|
| Edit a workspace instruction or skill | The project file changes. Other sessions that read that file can use the updated content. Sharing the file through source control also shares the change with contributors. |
| Disable an MCP server for one session | The server is unavailable to that session without deleting its configuration or changing the shared server definition. |
| Change a client-tool selection | The selection persists for that harness across windows and profiles, rather than only for the current request. For remote sessions, selections are stored separately for each remote host and harness. |

Available global, workspace, or session enablement actions depend on the customization type and harness. Check the action's scope before applying it. A global action isn't confined to the selected session, even when the customization is stored in the workspace.

For detailed controls, see [plugin enablement](/docs/agent-customization/agent-plugins.md#enable-or-disable-plugins), [MCP server enablement](/docs/agents/run/manage-mcp-servers.md#enable-or-disable-mcp-servers), and [tool availability](/docs/agents/run/tools.md#manage-available-tools).

## Troubleshoot customization issues

Use the verification result to choose your next action:

| Symptom | What to check |
|---------|---------------|
| Different customizations appear when I switch sessions | The editor follows the selected session, not all open sessions. Compare the sessions' harnesses, workspaces, and execution hosts. Switching sessions doesn't remove customizations from the previous one. |
| The customization isn't listed | Confirm the selected session, harness, workspace, and host. Check the file name and supported location. For remote sessions, check whether the customization comes from the remote host or connected client. |
| A marketplace-installed skill shows **Missing files** | [Repair the installation](#repair-marketplace-installations) to restore missing files without replacing your edits. |
| The customization has validation errors | Correct the reported file or configuration errors. |
| It's discovered but isn't included or invoked | Check that it is enabled in the relevant scope, then check activation conditions against the current file or task. Invoke an on-demand customization explicitly when supported. |
| It's included but doesn't improve the result | Resolve conflicting guidance, make vague rules more specific, and repeat the task in a fresh chat. |

For hooks, also verify the script's event inputs and outputs. Hooks in user folders, settings, repositories, custom agents, and plugins can require [manual migration to the shared Copilot runtime](/docs/agent-customization/migrate-customizations.md#migrate-hooks), even when the file is discovered.

If the issue continues, follow [customization diagnostics and agent troubleshooting](/docs/agents/agent-troubleshooting/troubleshooting.md#check-customization-diagnostics).

### Repair marketplace installations

If a Marketplace-installed skill shows **Missing files**, select **Repair** to restore only the missing files. Repair preserves files that you edited or added. **Installed** indicates that the recorded target is available.

A Marketplace-installed customization and a local customization with the same name remain separate. Deleting the Marketplace installation doesn't remove the unrelated local customization.

## Advanced scenarios

### Manage customizations for remote sessions

Select the remote session before opening the editor. Its harness and remote workspace determine the relevant customizations, rather than the project open on your local machine.

The inventory can include customizations from these sources:

| Source | What it provides |
|--------|------------------|
| **Remote workspace** | Supported project customizations in the remote session's workspace or worktree. |
| **Remote host** | User-level configuration and installed customizations on the machine or in the Dev Container that runs the agent. |
| **Connected client** | Eligible user instructions, skills, custom agents, and contributions from plugins, extensions, and the {% data variables.copilot.agents_window %}. The client can also supply tools and supported MCP configurations. |

Client contributions depend on harness compatibility, discovery, and your enablement and sync choices. Connecting from another machine preserves the existing session's host-owned customizations, but can change the client contributions. [Client tools](/docs/agents/run/tools.md#manage-tool-availability-for-the-copilot-harness) require the client to remain connected.

For Dev Container sessions, configure host-owned customizations in the container's user home or workspace. The outer machine's user configuration isn't automatically inherited.

Not every client customization is forwarded:

* Standalone hook files aren't forwarded. Configure them in a supported location on the execution host, or use a [compatible plugin](/docs/agent-customization/hooks.md#reuse-hooks-from-a-plugin).
* Native {% data variables.product.prodname_copilot_short %} user MCP configuration isn't forwarded to another host. See [MCP configuration sources](/docs/agents/reference/mcp-configuration.md#configuration-file).

Where **Local** and **Remote** groups appear, they distinguish client-supplied customizations from host-owned customizations. These labels identify the source, not whether the customization applies to the remote session.

Some client-supplied entries are read-only reflections of their source configuration. Manage them at the source rather than trying to edit a remote copy. For host-owned customizations, use the actions and writable locations offered by the remote harness. A global change on the remote host can affect other sessions on that host, not just the selected session.

To connect to a host or resume its work, see [Run and manage remote agent sessions](/docs/agents/run/remote-agent-sessions.md).

### Open customization pages with deep links

You can also use `chat-customizations/open` URLs to navigate directly to a specific section in the Agent Customizations editor:

```text
vscode://chat-customizations/open?page=<page>&search=<query>
```

Parameters:

* **`page`** (required): The customization section to open. Supported values include:
  * `discover`: Opens the Customization Marketplace (**Browse** page). Requires `setting(chat.customizations.marketplace.enabled)`.
  * `agents`: Opens the Custom Agents section.
  * `skills`: Opens the Agent Skills section.
  * `instructions`: Opens the Custom Instructions section.
  * `hooks`: Opens the Hooks section.
  * `mcp-servers`: Opens the MCP Servers section (also accepts `mcp-server`).
  * `plugins`: Opens the Agent Plugins section.
  * `tools`: Opens the Tools section.
  * `migrations`: Opens the Migrations review view.
* **`search`** (optional): A search query to pre-populate in the section's search field. URL-encode query values.

These links navigate within the selected session's customization context. They do not select a different session, install customizations, or bypass consent, workspace trust, or enterprise policies.

**Examples:**

* Open the plugins section:

  ```text
  vscode://chat-customizations/open?page=plugins
  ```

* Open skills filtered to "python":

  ```text
  vscode://chat-customizations/open?page=skills&search=python
  ```

* Open the Discover marketplace:

  ```text
  vscode://chat-customizations/open?page=discover
  ```

> [!NOTE]
> For {% data variables.product.prodname_vscode_shortname %} Insiders, use the `vscode-insiders://` scheme instead of `vscode://`. To share links on web pages or markdown badges, use the HTTPS redirect wrapper: `https://vscode.dev/redirect?url=<url-encoded-vscode-URL>`. For more information on URL handlers, see [URL handling](/docs/configure/command-line.md#url-handling).

### Manage canvas extensions

`feature(canvases)`

The **Canvases** section lists canvas extensions available to the active local {% data variables.product.prodname_copilot_short %} session and groups them by source. For prerequisites, opening canvases, and managing extension enablement, see [Use canvases with agents](/docs/agents/run/canvases.md).

### Use customizations in a monorepo

In monorepo setups, you might open a subfolder of a repository rather than the repo root. For Local harness discovery `feature(local-harness)`, enable `setting(chat.useCustomizationsInParentRepositories)` to also discover customizations from the parent repository. Other harnesses use their own discovery rules. See [nested project instructions](/docs/agents/reference/custom-instructions-reference.md#nested-project-instructions).

When this setting is enabled, {% data variables.product.prodname_vscode_shortname %} walks up the folder hierarchy from each workspace folder until it finds a `.git` folder. If found, it collects customizations from all folders between the workspace folder and the repository root (inclusive). This applies to all customization types: always-on instructions (`copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md`), file-based instructions, prompt files, custom agents, agent skills, and hooks.

For example, consider the following monorepo structure:

```text
my-monorepo/              # repo root (has .git folder)
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   │   └── style.instructions.md
│   ├── prompts/
│   │   └── review.prompt.md
│   └── agents/
│       └── reviewer.agent.md
├── packages/
│   └── frontend/          # opened as workspace folder
│       └── src/
```

If you open only `packages/frontend/` in {% data variables.product.prodname_vscode_shortname %} and enable the setting, {% data variables.product.prodname_vscode_shortname %} discovers the customization files at the repo root, such as `copilot-instructions.md`, `style.instructions.md`, `review.prompt.md`, and `reviewer.agent.md`.

Conditions for parent repository discovery:

* The workspace folder does not contain a `.git` folder (it is not itself a repository root).
* A parent folder contains a `.git` folder.
* The parent repository folder is [trusted](/docs/editing/workspaces/workspace-trust.md). {% data variables.product.prodname_vscode_shortname %} prompts you to trust the parent folder when the workspace is opened.

> [!NOTE]
> The `setting(chat.useCustomizationsInParentRepositories)` setting is disabled by default.

### Evaluate and improve customization files (Preview)

For larger customization collections, the separately published [Chat Customizations Evaluations extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-chat-customizations-evaluations) analyzes skills, custom agents, instructions, and prompt files for ambiguity, contradictions, and overly complex rules.

After installing the extension, open a customization file and run **Chat Customizations Evaluations: Analyze** from the Command Palette (`kb(workbench.action.showCommands)`). Review the diagnostics in the **Problems** panel (`kb(workbench.actions.view.problems)`) before selecting **Implement Suggestions**.

For analysis guidance and skill evaluations with [Waza](https://github.com/microsoft/waza), run **Chat Customizations Evaluations: Open Analysis and Fix User Guide**. File analysis complements, but doesn't replace, testing the customization on a representative task.

## Related resources

* [Customization concepts](/docs/agents/concepts/customization.md)
* [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md)
