---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 8/5/2026
MetaDescription: Create, manage, evaluate, and troubleshoot agent customizations in {% data variables.product.prodname_vscode_shortname %} for user profiles, workspaces, and monorepos.
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

The Agent Customizations editor provides a central place to discover, create, and manage customizations. It organizes customization types into separate tabs and includes an editor with syntax highlighting and validation.

When you open the Customizations editor, the customizations are scoped to the selected [agent harness](/docs/agents/concepts/agent-harnesses.md). Select the harness from the dropdown in the chat input before you open the editor to ensure the customizations apply to the correct context.

![Screenshot showing the Agent Customizations panel in the {% data variables.copilot.agents_window %}, with the list of available customizations visible.](images/customization/agents-customizations.png)

Follow these steps to open the Agent Customizations editor:

{% tabs id="chat-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

In the left sidebar, select a customization type in the **Customizations** panel.

![Screenshot showing the Agent Customizations panel in the {% data variables.copilot.agents_window %}, with the list of available customizations visible.](images/customization/agents-window-customizations.png)

{% /tab %}
{% tab label="Chat view" %}

In the Chat view, select the **Configure Chat (gear icon)** or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot showing the Agent Customizations editor with customization categories in the sidebar and custom agents in the main view.](images/customization/chat-customizations-editor.png)

{% /tab %}
{% /tabs %}

## Create a customization

You can create customization files manually or use AI to generate them, after which you can further edit them.

### Create a customization with AI

You can create a customization file with AI assistance. To do this, open the Agent Customizations editor and
enter a prompt in the **Overview** tab that describes what you want to create. The agent asks for any missing details and generates the customization in the appropriate format.

For example, to create a code reviewer skill, you can enter the following prompt:

```text
Code reviewer skill that checks for code style, best practices, and potential bugs in Python and JavaScript files.
```

### Create a customization manually

You can manually create a customization file by using the **Chat: New \<customization-type\>** command from the Command Palette (`kb(workbench.action.showCommands)`). This creates the corresponding file in the appropriate location for the selected customization type. You can then edit the file in the inline editor or in a separate editor tab.

Alternatively, you can use the Agent Customizations editor to create a customization file. Follow these steps:

1. Open the Agent Customizations editor and select a customization type

1. Choose between creating a user or workspace customization from the **New** dropdown

1. Enter a name and choose a storage location when prompted

1. An inline editor opens where you can further edit the customization file. The editor provides syntax highlighting and validation for the customization type.

For MCP servers and agent plugins, browse the corresponding marketplace from the editor, install an item, and manage the installation from the same tab.

See the guide for each customization type for its file format and configuration options.

### Choose a customization scope

Store a customization at the narrowest scope that matches how you want to use and share it:

* **User**: use the customization across your workspaces. User customizations are specific to you and are not committed to the project.
* **Workspace**: share the customization with project contributors through source control.

Some customization types support other scopes, such as organization-level instructions. Not every customization type supports every scope. See the individual guide for its supported locations.

> [!NOTE]
> When [Agent Host](/docs/agents/concepts/agent-host.md) is enabled, the agent reads user-level customizations from harness-agnostic folders like `~/.copilot` (Copilot) and `~/.claude` (Claude), rather than from your {% data variables.product.prodname_vscode_shortname %} profile user data. See [instructions](/docs/agent-customization/custom-instructions.md#instructions-file-locations), [custom agents](/docs/agent-customization/custom-agents.md), and [prompt files](/docs/agent-customization/prompt-files.md#prompt-file-locations) for the recommended user-level locations.

## Evaluate and improve customization files (Preview)

As your collection of customization files grows, it can be hard to tell whether they actually guide the AI the way you intend. Vague wording, contradictory rules, or overly complex instructions can degrade results. The [Chat Customizations Evaluations](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-chat-customizations-evaluations) extension helps you catch these problems before you rely on a customization, by analyzing your files and suggesting concrete improvements.

> [!NOTE]
> The Chat Customizations Evaluations extension is currently in preview and is published separately from {% data variables.product.prodname_vscode_shortname %}. Install it from the [{% data variables.product.prodname_vs_marketplace %}](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-chat-customizations-evaluations).

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
> You can also start an analysis from chat with the `/analyze-prompt` slash command, which summarizes the diagnostics for the active customization file directly in the Chat view.

For skill files, the extension integrates with the [Waza](https://github.com/microsoft/waza) evaluation framework to measure how well a skill performs against a set of test cases. Run **Chat Customizations Evaluations: Download Waza Binary** to install Waza, **Chat Customizations Evaluations: Create Waza Eval Scaffold** to generate evaluation files for the active skill, and **Chat Customizations Evaluations: Run Waza Evaluation** to run the suite. For step-by-step guidance, run **Chat Customizations Evaluations: Open Analysis and Fix User Guide**.

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

## Troubleshoot customization issues

If your customizations aren't being applied or cause unexpected behavior, open the **Agent Debug Logs** panel to [troubleshoot agent issues](/docs/agents/agent-troubleshooting/troubleshooting.md). Run **Developer: Open Agent Debug Panel** from the Command Palette (`kb(workbench.action.showCommands)`), or in the Chat view select the ellipsis (**...**) menu and select **Show Agent Debug Logs**.

## Related resources

* [Customization concepts](/docs/agents/concepts/customization.md)
* [Customize AI for your project guide](/docs/agents/guides/customize-copilot-guide.md)
