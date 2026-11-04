---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 10/28/2026
MetaDescription: Find and reuse agent customizations from marketplaces in {% data variables.product.prodname_vscode_shortname %}, or create project guidance.
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

Agent customizations adapt agents to your coding standards, workflows, and development systems. Start by looking for an existing skill, plugin, or integration in a customization marketplace before creating your own. This guide helps you find, install, and verify customizations in {% data variables.product.prodname_vscode %}, or create project-specific guidance. To understand how customization types differ and work together, see [Agent customization concepts](/docs/agents/concepts/customization.md).

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

Reuse or adapt an existing customization before creating one from scratch. You can combine approaches, such as installing a plugin and adding project instructions. For saved prompts and a comparison of all the options, see [customization types and activation](/docs/agents/concepts/customization.md#customization-options-at-a-glance).

For a complete project walkthrough, follow [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md).

## Check harness compatibility

An agent harness coordinates the model, tools, and customizations for a session. It determines which customization formats and locations are supported. Choosing a different language model doesn't change those requirements.

Before installing, copying, or creating a customization:

1. [Select the intended harness](/docs/agents/run/agent-harnesses.md#select-a-harness) from the **Session Target** control in a new chat.

1. Open the Agent Customizations editor for that harness, as described below.

1. Follow the guide for your customization type for the harness-specific file location, fields, and activation rules.

> [!NOTE]
> [Prompt files](/docs/agent-customization/prompt-files.md) and [tool sets](/docs/agent-customization/tool-sets.md) require a **Local** harness session in the {% data variables.copilot.chat_view %}. Local sessions aren't available in the {% data variables.copilot.agents_window %}. For reusable workflows in other skills-compatible harnesses, use a skill instead of a prompt file.

### Choose a customization scope

Store a customization at the narrowest scope that matches how you want to use and share it:

* **User**: use the customization across your workspaces without committing it to the project.

* **Workspace**: share project guidance and workflows with contributors through source control.

* **Organization**: centrally manage supported customization types across repositories. Configure these through GitHub rather than the Agent Customizations editor.

Not every customization type supports every scope. User files must be stored in a location supported by the harness on the machine where the agent runs, and aren't shared automatically between machines. Follow the individual customization guide for supported locations.

## Agent Customizations editor

The Agent Customizations editor provides a central place to discover, create, and manage customizations for the selected harness. It organizes customization types into separate sections, with configuration forms, inline file editors, or read-only details depending on the type and source.

Follow these steps to open the Agent Customizations editor:

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

In the left sidebar, select **Customizations** to open the Agent Customizations editor. Then select the customization type in the editor.

![Screenshot showing the Customizations sidebar action and the Agent Customizations editor.](images/customization/agents-window-customizations.png)

The experimental **Extensions** section also lets you [choose which installed extensions run in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window-configuration.md#manage-extensions-experimental).

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

In the {% data variables.copilot.chat_view %}, select **Open Customizations** in the title bar, or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot showing the Agent Customizations editor with customization categories in the sidebar and custom agents in the main view.](images/customization/chat-customizations-editor-2.png)

{% /tab %}
{% /tabs %}

## Discover and install existing customizations (Preview)

Use the Customization Marketplace to find a workflow or integration you can reuse instead of building it from scratch. The unified **Browse** page brings together available sources, including plugin marketplaces, GitHub Feed, and {% data variables.product.prodname_copilot_short %} connectors `feature(copilot-connectors)`. Available sources and installation actions depend on the selected harness and organization policy.

You can install an individual skill or a plugin that bundles related customizations, such as skills, custom agents, hooks, and MCP servers. For a service integration, find an MCP server or connect a supported service without server setup.

To find and install a customization:

1. Open the Agent Customizations editor and select **Browse**.
1. Use the source menu to browse all sources or select a specific available source, such as **GitHub Feed** or an individual plugin marketplace.
1. Search by name or use a type filter, such as `@type:skill` or `@type:mcp`.
1. Select an item and review its publisher, source, installation details, and any setup requirements.
1. Select **Install** and choose a destination when prompted. For {% data variables.product.prodname_copilot_short %} connectors `feature(copilot-connectors)`, select **Connect** and complete authorization instead.

Some items are available for discovery but don't support automatic installation. Follow the publisher's setup instructions when they are provided.

If your team shares plugins through another marketplace, select **Configure Marketplaces** from the source menu to [add or manage plugin marketplaces](/docs/agent-customization/agent-plugins.md#configure-plugin-marketplaces). Adding a marketplace makes its plugins available to browse. It doesn't install them.

After installation, complete any publisher setup and [verify the customization](#verify-a-customization) with a representative task. For type-specific guidance, see [install a skill](/docs/agent-customization/agent-skills.md#install-a-skill-from-the-customization-marketplace-preview), [install a plugin](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace), or [find an MCP server](/docs/agent-customization/mcp-servers.md#find-another-server).

<!-- TODO: Add a screenshot showing Browse with source or publisher images visible and the source menu open, including GitHub Feed and an individual plugin marketplace in a supported harness. -->

### Marketplace availability

The **Browse** page appears when a marketplace source is available. Marketplace discovery is enabled by default with `setting(chat.customizations.marketplace.enabled)`.

If **Browse** isn't available, check that the setting is enabled and your organization permits **Editor preview features**. Disabling that policy forces the unified **Browse** experience and {% data variables.product.prodname_copilot_short %} connectors off. See [organization and enterprise settings](/docs/enterprise/manage-ai-settings.md#use-github-organization-and-enterprise-settings).

The experimental GitHub Feed source is enabled by default for harnesses that provide marketplace search. Local sessions don't provide this source, and organization policy can restrict access. Use the `setting(chat.customizations.marketplace.sources.publicFeed.enabled)` setting to show or hide this source. For plugin discovery without the unified **Browse** page, follow the [plugin installation guide](/docs/agent-customization/agent-plugins.md#install-a-plugin-from-a-marketplace).

## Create a customization

For file-based customizations, use the editor to create a file in the chosen scope:

1. Open the Agent Customizations editor and select a customization type.
1. Select the `+` button next to **Workspace** to share the customization with your project, or next to **User** to use it across your workspaces.
1. Enter a name and choose a storage location when prompted.
1. Edit the customization in the inline editor, which provides syntax highlighting and validation.
1. Review and save the customization.

You can also run the **Chat: New \<customization-type\>** command from the Command Palette (`kb(workbench.action.showCommands)`). The command creates the corresponding file in a supported location for that customization type.

To add an MCP server manually, select **MCP Servers**, select **Add Server** (**+**) in the **User** or **Workspace** group, and follow the guided flow. For detailed steps, see [Add MCP servers](/docs/agent-customization/mcp-servers.md#connect-a-server). To update an existing connection, see [Edit an MCP server configuration](/docs/agents/run/manage-mcp-servers.md#edit-an-mcp-server-configuration).

Creating or saving a file doesn't establish that the agent uses it. Verify the customization before relying on it or sharing it with your team.

## Verify a customization

Repeat your representative task in a fresh chat with the intended harness and workspace. Don't repeat the customization's rules in the test prompt. Check these three stages separately:

1. **Discovery**: open the Agent Customizations editor and confirm that the customization is listed without validation errors.
1. **Inclusion or invocation**: check whether the request uses the customization. For instructions and skills, inspect the response's **References** section, where available, or [Agent Debug Logs](/docs/agents/agent-troubleshooting/chat-debug-view.md#instructions-or-a-prompt-file-are-not-applied). For tools and hooks, inspect the corresponding tool activity or execution logs.
1. **Effectiveness**: review the changes, commands, and results against the outcome you defined. Inclusion doesn't guarantee that the agent follows the guidance.

For example, if project instructions specify the correct test command, ask the agent to make a small code change without restating that command. Confirm that it runs the expected tests and reports their results.

If a stage fails, [troubleshoot that stage](#troubleshoot-customization-issues) before adding more guidance. Once the customization meets your goal, review it before sharing it. For a complete before-and-after workflow, see [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md).

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

## Troubleshoot customization issues

Use the verification result to choose your next action:

| Symptom | What to check |
|---------|---------------|
| The customization isn't listed | Confirm the harness, file name, and supported location. Ensure the session uses the folder containing your changes. |
| The customization has validation errors | Correct the reported file or configuration errors. |
| It's discovered but isn't included or invoked | Check activation conditions against the current file or task. Invoke an on-demand customization explicitly when supported. |
| It's included but doesn't improve the result | Resolve conflicting guidance, make vague rules more specific, and repeat the task in a fresh chat. |

For hooks, also verify the script's event inputs and outputs. Hooks in user folders, settings, repositories, custom agents, and plugins can require [manual migration to the shared Copilot runtime](/docs/agent-customization/migrate-customizations.md#migrate-hooks), even when the file is discovered.

If the issue continues, follow [customization diagnostics and agent troubleshooting](/docs/agents/agent-troubleshooting/troubleshooting.md#check-customization-diagnostics).

## Advanced scenarios

### Repair marketplace installations

If a Marketplace-installed skill shows **Missing files**, select **Repair** to restore only the missing files. Repair preserves files that you edited or added. **Installed** indicates that the recorded target is available.

A Marketplace-installed customization and a local customization with the same name remain separate. Deleting the Marketplace installation doesn't remove the unrelated local customization.

### Manage canvas extensions

`feature(canvases)`

The **Canvases** section lists canvas extensions available to the active local {% data variables.product.prodname_copilot_short %} session and groups them by source. For prerequisites, opening canvases, and managing extension enablement, see [Use canvases with agents](/docs/agents/run/canvases.md).

### Use customizations in a monorepo

In monorepo setups, you might open a subfolder of a repository rather than the repo root. For Local harness discovery, enable `setting(chat.useCustomizationsInParentRepositories)` to also discover customizations from the parent repository. Other harnesses use their own discovery rules. See [nested project instructions](/docs/agents/reference/custom-instructions-reference.md#nested-project-instructions).

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
