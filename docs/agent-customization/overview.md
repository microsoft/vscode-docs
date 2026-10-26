---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 10/28/2026
MetaDescription: Install, adapt, and create agent customizations in {% data variables.product.prodname_vscode_shortname %} for your coding workflows.
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

Agent customizations adapt agents to your coding standards, workflows, and development systems. You can install an agent plugin, use or adapt an existing skill, or create customizations for your project. This guide helps you choose a starting point, manage customizations in {% data variables.product.prodname_vscode %}, and verify that they work with your agent harness. To compare customization types, see [Agent customization concepts](/docs/agents/concepts/customization.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Core concepts">
Learn about the different customization types and when to use each one.

* [Customization concepts](/docs/agents/concepts/customization.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Tutorial">
Follow a hands-on walkthrough to customize AI for your project.

* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)

</div>

## Choose how to customize

Start with a recurring task or an observed problem. You don't need to create every customization yourself, or add one when the agent already meets your needs.

### Install or reuse

Use an existing customization when it provides the workflow or capability you need:

* **[Install an agent plugin](/docs/agent-customization/agent-plugins.md#discover-and-install-plugins)**: Add related skills, agents, and tool integrations together.
* **[Use an existing skill](/docs/agent-customization/agent-skills.md#use-an-existing-skill)**: Reuse its instructions, scripts, and resources for your task.
* **Connect an external system**: [Use a {% data variables.product.prodname_copilot_short %} connector (Preview)](/docs/agent-customization/copilot-connectors.md) without server setup, or [add an MCP server](/docs/agent-customization/mcp-servers.md#connect-a-server) using a URL or launch command.

For supported marketplace sources, you can also [browse customizations in the editor](#discover-marketplace-customizations-preview) (Preview). Review the publisher, included files, and setup requirements before installing or running a customization.

### Create or adapt

Adapt existing instructions or a skill when they nearly match your needs. Create a new customization when you need project-specific guidance or a workflow that isn't already available.

Follow [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md) to add a customization and compare the agent's results before and after the change. To create an individual customization with AI or manually, use the [creation steps below](#create-a-customization).

You can combine these approaches: install a plugin, then add project instructions for your codebase.

## Check harness compatibility

Select the [agent harness](/docs/agents/run/agent-harnesses.md#select-a-harness) you intend to use before installing, copying, or creating a customization. The harness determines which formats, locations, and capabilities are supported. Changing the language model doesn't change those requirements.

| Customization | Check before using it |
|---------------|--------------------------|
| [Instructions](/docs/agent-customization/custom-instructions.md) and [skills](/docs/agent-customization/agent-skills.md) | Use a format and file location that the selected harness reads. Check its activation rules and supported user, workspace, or organization scope. |
| [Custom agents](/docs/agent-customization/custom-agents.md), [hooks](/docs/agent-customization/hooks.md), and [MCP servers](/docs/agent-customization/mcp-servers.md) | Follow the configuration for your harness. Tool names, supported fields, lifecycle events, and connection locations can differ. |
| [Prompt files](/docs/agent-customization/prompt-files.md) and [tool sets](/docs/agent-customization/tool-sets.md) | Use a **Local** harness session in the {% data variables.copilot.chat_view %}. For reusable workflows in other skills-compatible harnesses, create a skill instead of a prompt file. |
| [Plugins](/docs/agent-customization/agent-plugins.md) | Check that the selected harness supports the plugin and its bundled customization types. |

The {% data variables.copilot.chat_view %} and {% data variables.copilot.agents_window %} both run agents, but the available harnesses differ. Local sessions are editor-only. Select the intended harness before opening the Customizations editor so you see its supported types and destinations.

## Agent Customizations editor

The Agent Customizations editor provides a central place to discover, create, and manage customizations. It organizes customization types into separate sections. Depending on the customization type and source, it provides a configuration form, an inline file editor with syntax highlighting and validation, or a read-only details view.

When you open the Customizations editor, the customizations are scoped to the selected [agent harness](/docs/agents/concepts/agent-harnesses.md). Select the harness from the dropdown in the chat input before you open the editor to ensure the customizations apply to the correct context.

![Screenshot showing the Agent Customizations editor with Copilot CLI custom agents and customization categories.](images/customization/agents-customizations.png)

Follow these steps to open the Agent Customizations editor:

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

In the left sidebar, select **Customizations** to open the Agent Customizations editor. Then select the customization type in the editor.

![Screenshot showing the Customizations sidebar action and the Agent Customizations editor.](images/customization/agents-window-customizations.png)

The experimental **Extensions** section also lets you [choose which installed extensions run in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window-configuration.md#manage-extensions-experimental).

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

In the {% data variables.copilot.chat_view %}, select **Open Customizations** in the title bar, or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot showing the Agent Customizations editor with customization categories in the sidebar and custom agents in the main view.](images/customization/chat-customizations-editor.png)

{% /tab %}
{% /tabs %}

### Discover marketplace customizations (Preview)

The Customization Marketplace provides a unified **Browse** page for finding skills, MCP servers, plugins, and other agent customizations from configured sources. It is enabled by default with `setting(chat.customizations.marketplace.enabled)`. The **Browse** page appears when a marketplace source is available. Available sources and installation actions depend on the selected harness and organization policy.

If **Browse** isn't available, check that the setting is enabled and your organization permits **Editor preview features**. Disabling that policy forces the unified **Browse** experience and {% data variables.product.prodname_copilot_short %} connectors off. See [organization and enterprise settings](/docs/enterprise/manage-ai-settings.md#use-github-organization-and-enterprise-settings).

The GitHub Feed source is enabled by default for harnesses that provide marketplace search. Local sessions don't provide this source, and organization policy can restrict access. Use the `setting(chat.customizations.marketplace.sources.publicFeed.enabled)` setting to show or hide this source.

To find and install a customization:

1. Open the Agent Customizations editor and select **Browse**.
1. Use the source menu to browse all sources or select a specific available source, such as **GitHub Feed** or an individual plugin marketplace.
1. Search by name or use a type filter, such as `@type:skill` or `@type:mcp`.
1. Select an item and review its publisher, source, installation details, and any setup requirements.
1. Select **Install** and choose a destination when prompted. For {% data variables.product.prodname_copilot_short %} connectors (Preview), select **Connect** and complete authorization instead.

Some items are available for discovery but don't support automatic installation. Follow the publisher's setup instructions when they are provided.

To [add or manage plugin marketplaces](/docs/agent-customization/agent-plugins.md#configure-plugin-marketplaces), select **Configure Marketplaces** from the source menu.

<!-- TODO: Add a screenshot showing Browse with source or publisher images visible and the source menu open, including GitHub Feed and an individual plugin marketplace in a supported harness. -->

Marketplace items show a source or publisher image in **Browse** and, when available, on the installed item and its details page. Use this information together with the item details to verify the source before installation.

{% data variables.product.prodname_vscode_shortname %} associates marketplace state with the exact installed target, not only its display name. A local customization and a Marketplace-installed customization with the same name remain separate:

* **Installed** indicates that the recorded target is available.
* **Missing files** indicates that files from a Marketplace-installed skill are no longer present. Select **Repair** to restore only the missing files. Repair preserves files that you edited or added.
* Deleting a Marketplace-installed customization removes its exact installation. It doesn't remove an unrelated local customization with the same name.

## Choose a customization scope

Store a customization at the narrowest scope that matches how you want to use and share it:

* **User**: use the customization across your workspaces. User customizations are specific to you and are not committed to the project.
* **Workspace**: share the customization with project contributors through source control.
* **Organization**: centrally manage supported customization types and share them across repositories. Organization customizations are configured through GitHub rather than created in the Agent Customizations editor.

Scope determines where a customization is available and who can share it. Not every customization type supports every scope. The selected agent harness also determines which customization types and locations it supports. See the guide for each customization type for its supported locations.

> [!NOTE]
> Store user-level customizations in a folder that the selected harness supports on the machine where the agent runs. For example, {% data variables.product.prodname_copilot_short %} reads customizations from `~/.copilot`, and {% data variables.product.prodname_anthropic_claude %} reads them from `~/.claude`. These folders are separate from your {% data variables.product.prodname_vscode_shortname %} profile user data and aren't shared automatically between machines. See [instructions](/docs/agent-customization/custom-instructions.md#instructions-file-locations), [custom agents](/docs/agent-customization/custom-agents.md), and [prompt files](/docs/agent-customization/prompt-files.md#prompt-file-locations) for supported user-level locations.

## Create a customization

You can create customization files with AI or create them manually. Creating a file doesn't mean the selected harness can load or run it. Specify the target harness and user or workspace scope, save the file in a supported location, and verify it in a session that uses that harness.

### Create a customization with AI

1. Open the Agent Customizations editor.
1. In the **Overview** section, enter a prompt that describes what you want to create.
1. Answer any questions the agent asks about missing details.
1. Review the generated customization, correct any inaccurate information, and save the file.

You can also describe the customization directly in chat with the intended harness.

For example, to create a code reviewer skill, you can enter the following prompt:

```prompt
Create a workspace code reviewer skill for Python and JavaScript files. Check the code against the conventions in this repository, identify correctness and maintainability issues, and report findings with file locations and suggested fixes.
```

### Create a customization manually

1. Open the Agent Customizations editor and select a customization type.
1. From the **New** dropdown, choose a user or workspace customization.
1. Enter a name and choose a storage location when prompted.
1. Edit the customization in the inline editor, which provides syntax highlighting and validation.
1. Review and save the customization.

You can also run the **Chat: New \<customization-type\>** command from the Command Palette (`kb(workbench.action.showCommands)`). The command creates the corresponding file in a supported location for that customization type.

To add an MCP server manually, select **MCP Servers**, select **Add Server** (**+**) in the **User** or **Workspace** group, and follow the guided flow. For detailed steps, see [Add MCP servers](/docs/agent-customization/mcp-servers.md#connect-a-server). To update an existing connection, see [Edit an MCP server configuration](/docs/agents/run/manage-mcp-servers.md#edit-an-mcp-server-configuration).

See the guides for [custom instructions](/docs/agent-customization/custom-instructions.md), [agent skills](/docs/agent-customization/agent-skills.md), [prompt files](/docs/agent-customization/prompt-files.md), [custom agents](/docs/agent-customization/custom-agents.md), [MCP servers](/docs/agent-customization/mcp-servers.md), [hooks](/docs/agent-customization/hooks.md), and [agent plugins](/docs/agent-customization/agent-plugins.md) for their file formats and configuration options.

## Manage existing customizations

Use the Agent Customizations editor to find and update customizations for the selected harness:

1. Open the Agent Customizations editor and select the customization type.
1. Use the search box to find the customization.
1. Select the customization to open its details.
1. If the customization is editable, update its form or file and save your changes. For a read-only customization, use the available action to open the source file.

The available actions depend on the customization type and its source. Use the inline actions or context menu to access supported operations, such as revealing an editable file in your operating system or deleting it. Manage plugin-provided customizations from the **Plugins** section.

`feature(user-customization-migration)`

> [!IMPORTANT]
> If the Agent Customizations editor shows **Migrations**, Copilot cannot use one or more customizations in their current location or format. Select **Migrations** to review the required work, and follow [Migrate Copilot customizations in VS Code](/docs/agent-customization/migrate-customizations.md) for detailed steps.

### Manage canvas extensions

`feature(canvases)`

A canvas is an interactive visual surface that an extension provides to the Copilot harness. Before you manage or open canvases, review the [canvas prerequisites and limitations](/docs/agents/run/agent-harnesses.md#use-canvases-with-the-copilot-harness).

To find and manage installed canvas extensions:

1. Select an active local {% data variables.product.prodname_copilot_short %} session in the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}.

1. Open the Agent Customizations editor and select **Canvases**.

1. Expand the user, workspace, plugin, or other source group, then expand an extension to see its canvases.

1. Open a canvas marked **Ready to Open** by double-clicking it, selecting it and pressing `Enter`, or selecting **More Actions** > **Open Canvas**.

1. To inspect an extension's origin, use **More Actions** to open its source folder. For an extension owned by a plugin, select **Show Plugin** to view the plugin details.

If **Canvases are only available inside a session** appears, select an active local {% data variables.product.prodname_copilot_short %} session, then reopen the Agent Customizations editor.

Canvases marked **Requires Input** can't be opened directly from the list. Ask the agent to open the canvas and describe the information or configuration it should use.

<!-- TODO: Add a screenshot showing the Canvases source groups and extension switches. -->

Use the switch on a user or plugin extension to enable or disable the extension, not an individual canvas. Workspace extensions cannot be enabled or disabled from this editor. When you disable an extension, its last-known canvas entries might remain visible so that you can identify the extension and enable it again. You can't open canvases from a disabled extension.

## Verify a customization

Test a newly installed, copied, or edited customization in a fresh chat with the intended harness and workspace. Use a representative task and confirm that the harness discovers the customization before assessing its behavior. This separates the saved customization from instructions in the conversation that created or adapted it.

Check that the agent follows the expected instructions, workflow, tool configuration, or lifecycle action. For instructions and skills, use the response's **References** section, where available, to check which customizations were included.

If the result doesn't match your intent, make the customization more specific, resolve conflicting guidance, and repeat the task. For a complete project workflow, including how to review and share generated instructions, see [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md).

## Troubleshoot customization issues

If a customization isn't applied or causes unexpected behavior, check the following:

* The intended agent harness is selected.
* The customization is stored in a location that the harness supports.
* Any activation conditions match the current file or task.
* The customization file has no validation errors.

For hooks, also verify the script's event inputs and outputs. Hooks in user folders, settings, repositories, custom agents, and plugins can require [manual migration to the shared Copilot runtime](/docs/agent-customization/migrate-customizations.md#migrate-hooks), even when the file is discovered.

If the issue continues, open the **Agent Debug Logs** view to [troubleshoot agent issues](/docs/agents/agent-troubleshooting/troubleshooting.md). Run **Developer: Open Agent Debug Logs** from the Command Palette (`kb(workbench.action.showCommands)`), or in the {% data variables.copilot.chat_view %} select the ellipsis (**...**) menu and select **Show Agent Debug Logs**.

## Use customizations in a monorepo

In monorepo setups, you might open a subfolder of a repository in {% data variables.product.prodname_vscode_shortname %} rather than the repo root. By default, {% data variables.product.prodname_vscode_shortname %} only discovers customization files within your open workspace folder(s). Enable the `setting(chat.useCustomizationsInParentRepositories)` setting to also discover customizations from the parent repository.

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

## Evaluate and improve customization files (Preview)

As your collection of customization files grows, it can be hard to tell whether they actually guide the AI the way you intend. Vague wording, contradictory rules, or overly complex instructions can degrade results. The [Chat Customizations Evaluations](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-chat-customizations-evaluations) extension helps you catch these problems before you rely on a customization, by analyzing your files and suggesting concrete improvements.

> [!NOTE]
> The Chat Customizations Evaluations extension is published separately from {% data variables.product.prodname_vscode_shortname %}. Install it from the [{% data variables.product.prodname_vs_marketplace %}](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-chat-customizations-evaluations).

The extension works with skill files (`SKILL.md`), custom agent files (`*.agent.md`), instructions files (`*.instructions.md`), and prompt files (`*.prompt.md`).

Open a customization file and run the **Chat Customizations Evaluations: Analyze** command from the Command Palette (`kb(workbench.action.showCommands)`).
The extension uses GitHub Copilot to detect issues such as:

* Logical, behavioral, and format contradictions
* Ambiguous wording, with suggested rewrites
* Conflicting persona traits and tone drift
* Excessive cognitive load from deeply nested conditions
* Gaps in intent handling and missing error paths
* Conflicts between a file and other customization files it links to

Diagnostics appear in the **Problems** panel (`kb(workbench.actions.view.problems)`) with line and column locations. After the analysis completes, select **Implement Suggestions** to apply the suggested improvements.

> [!TIP]
> You can also start an analysis from chat with the `/analyze-prompt` slash command, which summarizes the diagnostics for the active customization file directly in the {% data variables.copilot.chat_view %}.

For skill files, the extension integrates with the [Waza](https://github.com/microsoft/waza) evaluation framework to measure how well a skill performs against a set of test cases. Run **Chat Customizations Evaluations: Download Waza Binary** to install Waza, **Chat Customizations Evaluations: Create Waza Eval Scaffold** to generate evaluation files for the active skill, and **Chat Customizations Evaluations: Run Waza Evaluation** to run the suite. For step-by-step guidance, run **Chat Customizations Evaluations: Open Analysis and Fix User Guide**.

## Related resources

* [Customization concepts](/docs/agents/concepts/customization.md)
* [Customize AI for your project guide](/docs/agents/guides/customize-copilot-guide.md)
