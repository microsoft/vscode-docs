---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 9/18/2026
MetaDescription: Create, manage, migrate, and troubleshoot agent customizations in {% data variables.product.prodname_vscode_shortname %} across profiles and workspaces.
MetaSocialImage: ../images/shared/github-copilot-social.png
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
# Create and manage agent customizations

Agent customizations adapt agents to your coding standards, workflows, and development systems. This article explains how to create, manage, evaluate, and troubleshoot customizations in {% data variables.product.prodname_vscode %}. To compare the customization types and understand how they work together, see [Agent customization concepts](/docs/agents/concepts/customization.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Core concepts">
Learn about the different customization types and when to use each one.

* [Customization concepts](/docs/agents/concepts/customization.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Tutorial">
Follow a hands-on walkthrough to customize AI for your project.

* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)

</div>

## Agent Customizations editor

The Agent Customizations editor provides a central place to discover, create, and manage customizations. It organizes customization types into separate sections and includes an editor with syntax highlighting and validation.

When you open the Customizations editor, the customizations are scoped to the selected [agent harness](/docs/agents/concepts/agent-harnesses.md). Select the harness from the dropdown in the chat input before you open the editor to ensure the customizations apply to the correct context.

![Screenshot showing the Agent Customizations editor with Copilot CLI custom agents and customization categories.](images/customization/agents-customizations.png)

Follow these steps to open the Agent Customizations editor:

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

In the left sidebar, select a customization type in the **Customizations** panel.

![Screenshot showing the Agent Customizations panel in the {% data variables.copilot.agents_window %}, with the list of available customizations visible.](images/customization/agents-window-customizations.png)

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

In the {% data variables.copilot.chat_view %}, select the **Configure Chat (gear icon)** or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot showing the Agent Customizations editor with customization categories in the sidebar and custom agents in the main view.](images/customization/chat-customizations-editor.png)

{% /tab %}
{% /tabs %}

## Choose a customization scope

Store a customization at the narrowest scope that matches how you want to use and share it:

* **User**: use the customization across your workspaces. User customizations are specific to you and are not committed to the project.
* **Workspace**: share the customization with project contributors through source control.
* **Organization**: centrally manage supported customization types and share them across repositories. Organization customizations are configured through GitHub rather than created in the Agent Customizations editor.

Scope determines where a customization is available and who can share it. Not every customization type supports every scope. The selected agent harness also determines which customization types and locations it supports. See the guide for each customization type for its supported locations.

> [!NOTE]
> For sessions that run on [Agent Host](/docs/agents/concepts/agent-host.md), the agent reads user-level customizations from supported folders like `~/.copilot` (Copilot) and `~/.claude` (Claude), rather than from your {% data variables.product.prodname_vscode_shortname %} profile user data. See [instructions](/docs/agent-customization/custom-instructions.md#instructions-file-locations), [custom agents](/docs/agent-customization/custom-agents.md), and [prompt files](/docs/agent-customization/prompt-files.md#prompt-file-locations) for the recommended user-level locations.

## Create a customization

You can create customization files with AI or create them manually. Review and test every customization before you rely on it for development tasks.

### Create a customization with AI

1. Open the Agent Customizations editor.
1. In the **Overview** section, enter a prompt that describes what you want to create.
1. Answer any questions the agent asks about missing details.
1. Review the generated customization, correct any inaccurate information, and save the file.

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

For MCP servers and agent plugins, browse the corresponding marketplace from the editor, install an item, and manage the installation from the same section.

See the guides for [custom instructions](/docs/agent-customization/custom-instructions.md), [agent skills](/docs/agent-customization/agent-skills.md), [prompt files](/docs/agent-customization/prompt-files.md), [custom agents](/docs/agent-customization/custom-agents.md), [MCP servers](/docs/agent-customization/mcp-servers.md), [hooks](/docs/agent-customization/hooks.md), and [agent plugins](/docs/agent-customization/agent-plugins.md) for their file formats and configuration options.

## Manage existing customizations

Use the Agent Customizations editor to find and update customizations for the selected harness:

1. Open the Agent Customizations editor and select the customization type.
1. Use the search box to find the customization.
1. Select the customization to open its details or edit its file.
1. Review and save your changes.

The available actions depend on the customization type and its source. Use the inline actions or context menu to access supported operations, such as revealing an editable file in your operating system or deleting it. Manage plugin-provided customizations from the **Plugins** section.

## Verify a customization

Test a new or updated customization with a representative task. Check that the agent follows the expected instructions, workflow, tool configuration, or lifecycle action. For instructions and skills, expand the **References** section in the chat response to confirm that the expected customization was included.

If the result doesn't match your intent, make the customization more specific, resolve conflicting guidance, and repeat the task. For a complete project workflow, including how to review and share generated instructions, see [Configure AI for your codebase](/docs/agents/guides/customize-copilot-guide.md).

## Troubleshoot customization issues

If a customization isn't applied or causes unexpected behavior, check the following:

* The intended agent harness is selected.
* The customization is stored in a location that the harness supports.
* Any activation conditions match the current file or task.
* The customization file has no validation errors.

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

## Migrate customizations

`feature(user-customization-migration)`

> [!NOTE]
> Customization migration is available only in {% data variables.product.prodname_vscode_shortname %} Insiders.

[Agent Host](/docs/agents/concepts/agent-host.md) sessions load customizations from supported folders and don't use some {% data variables.product.prodname_vscode_shortname %}-specific formats and locations. The Agent Customizations editor provides separate migrations for each type of incompatibility.

| Migration | Use it for | Setting and default |
|-----------|------------|---------------------|
| **Migrate Prompt Files** | Convert workspace and user prompt files to agent skills. | `setting(chat.customizations.promptMigration.enabled)`: `true` |
| **Migrate User Data Customizations** | Move custom agents and instructions from {% data variables.product.prodname_vscode_shortname %} profile user data. | `setting(chat.customizations.userDataMigration.enabled)`: `false` |
| **Migrate Location Settings** | Move custom agents, instructions, and skills from locations configured for the Local agent. | `setting(chat.customizations.locationsMigration.enabled)`: `false` |

A migration card appears only when you select an Agent Host, the corresponding setting is enabled, and {% data variables.product.prodname_vscode_shortname %} finds customizations to migrate.

### Migrate prompt files to skills

> [!IMPORTANT]
> Prompt files are deprecated for Agent Host sessions and aren't loaded by Agent Host. They continue to work with the Local agent for now, but the Local agent will be removed in a future release. Convert prompt files to [agent skills](/docs/agent-customization/agent-skills.md) to keep them available.

Prompt file migration is enabled by default. It converts both workspace and user prompt files to skills.

To migrate prompt files:

1. In the {% data variables.copilot.chat_view %}, select the Agent Host that should use the skills.

1. Select **Configure Chat** (gear icon) to open the Agent Customizations editor.

1. On the **Overview** tab, find **Migrate Prompt Files** and select **Convert to Skills...**.

1. Select the prompt files to convert. You can open a file to review it before migration.

1. Select **Convert to Skills**.

1. In the confirmation dialog, choose whether to delete the original prompt files, and then select **Convert to Skills**.

Review any migrated skills that used prompt file frontmatter properties that aren't supported by skills. If you keep the original prompt files, the prompts and migrated skills don't stay synchronized.

### Migrate user customizations

Agents that run through Agent Host don't read custom agents and instructions stored in your {% data variables.product.prodname_vscode_shortname %} profile user data. The migration flow copies these customizations to the user folders for the selected Agent Host without changing their names, types, or contents.

The migrated files don't roam across devices through [Settings Sync](/docs/configure/settings-sync.md). If you keep the original files in your profile user data, the original and migrated copies don't stay synchronized.

To migrate user customizations:

1. Enable the `setting(chat.customizations.userDataMigration.enabled)` setting.

1. In the {% data variables.copilot.chat_view %}, select the Agent Host that should use the customizations.

1. Select **Configure Chat** (gear icon) to open the Agent Customizations editor.

1. On the **Overview** tab, find **Migrate User Data Customizations** and select **Migrate...**.

1. Select the agents and instructions to migrate. You can open a file to review it before migration.

1. Select **Migrate**.

1. In the confirmation dialog, choose whether to delete the original files from your profile user data, and then select **Migrate**.

### Migrate customizations from configured locations

The `setting(chat.agentFilesLocations)`, `setting(chat.modeFilesLocations)`, `setting(chat.instructionsFilesLocations)`, and `setting(chat.agentSkillsLocations)` settings configure additional locations for the Local agent. These settings are deprecated because Agent Host sessions don't use them.

To migrate customizations from these locations:

1. Enable the `setting(chat.customizations.locationsMigration.enabled)` setting.

1. In the {% data variables.copilot.chat_view %}, select the Agent Host that should use the customizations.

1. Select **Configure Chat** (gear icon) to open the Agent Customizations editor.

1. On the **Overview** tab, find **Migrate Location Settings** and select **Migrate...**.

1. Select the custom agents, instructions, and skills to migrate. You can open a file to review it before migration.

1. Choose whether to clear the unused location settings after migration. This option is selected by default.

1. Select **Migrate**.

1. In the confirmation dialog, choose whether to delete the original files, and then select **Migrate**.

Clearing a location setting and deleting its original files are separate choices. If you keep the original files, the original and migrated copies don't stay synchronized.

Prompt files in locations configured with `setting(chat.promptFilesLocations)` aren't included in this migration. Use [prompt file migration](#migrate-prompt-files-to-skills) to convert them to skills.

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
