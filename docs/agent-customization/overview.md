---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 6/10/2026
MetaDescription: Get started customizing AI in VS Code with custom instructions, prompt files, custom agents, MCP servers, and more to align AI responses with your coding practices.
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
# Customize AI in Visual Studio Code

Visual Studio Code gives you several ways to teach the AI about your codebase, coding standards, and workflows. This article introduces the customization options and helps you get started. You can manage customizations from both the [Chat view](/docs/agents/chat-view.md) and the [Agents window](/docs/agents/agents-window.md).

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="true" title="Core concepts">
Learn about the different customization types and when to use each one.

* [Customization concepts](/docs/agents/concepts/customization.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Tutorial">
Follow a hands-on walkthrough to customize AI for your project.

* [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md)

</div>

## Choose a customization type

VS Code offers several customization types, each suited to a different goal. They range from lightweight always-on instructions to packaged bundles of capabilities. Pick a type based on what you want to teach the agent, and combine multiple types as your needs grow. Select a tab to learn what each type does and see a few examples.

{% tabs id="customization-types" %}
{% tab label="Instructions" %}

[Instructions](/docs/agent-customization/custom-instructions.md) describe your coding standards, conventions, and project structure so the agent writes code the way your team does. Apply them to every request, or scope them to specific files with glob patterns.

* Enforce your ESLint rules and require JSDoc comments across the codebase.

* Describe the project structure so the agent knows where to find and place files.

* Apply React component conventions only to `.tsx` files.

{% /tab %}
{% tab label="Skills" %}

[Agent skills](/docs/agent-customization/agent-skills.md) package multi-step workflows, scripts, and resources that the agent loads when a task matches the skill. Use them for repeatable procedures that go beyond a single prompt.

* Run a test, lint, and deploy pipeline as one workflow.

* Generate release notes with bundled helper scripts.

* Follow a documented procedure for adding a new API endpoint.

{% /tab %}
{% tab label="Agents" %}

[Custom agents](/docs/agent-customization/custom-agents.md) define a specialized persona with its own instructions, tool access, and model. Use them to focus the agent on a specific role and limit what it can do.

* Create a security reviewer with read-only tool access.

* Set up a database admin persona for schema and query work.

* Build a documentation writer with a restricted toolset.

{% /tab %}
{% tab label="Models" %}

[Language models](/docs/agent-customization/language-models.md) let you choose which model handles your requests. Switch models per task, or bring your own model and API key.

* Route simple edits to a faster, lower-cost model.

* Use a more capable model for complex refactoring.

* Bring your own model with your own API key.

{% /tab %}
{% tab label="MCP" %}

[MCP servers](/docs/agent-customization/mcp-servers.md) connect the agent to external tools, services, and data through the Model Context Protocol. The agent calls a server when the task matches one of its tools.

* Query a PostgreSQL database for live data.

* Fetch and update GitHub issues and pull requests.

* Automate a browser with Playwright.

{% /tab %}
{% tab label="Hooks" %}

[Hooks](/docs/agent-customization/hooks.md) run deterministic actions at specific points in the agent loop, regardless of what the model decides to do. Use them to enforce policies and guardrails.

* Run a formatter after every file edit.

* Block edits to protected files or folders.

* Log every command the agent runs.

{% /tab %}
{% tab label="Plugins" %}

[Agent plugins](/docs/agent-customization/agent-plugins.md) (preview) bundle the other customization types into a single installable package. Install one to add a ready-made set of capabilities.

* Install a community testing plugin.

* Share a standard toolset across your team.

* Distribute a domain-specific set of instructions and skills.

{% /tab %}
{% tab label="Prompts" %}

[Prompt files](/docs/agent-customization/prompt-files.md) save reusable prompts that you invoke as slash commands in chat. Use them to standardize tasks you run often.

* Scaffold a React component from a single command.

* Generate a standard pull request description.

* Run a consistent security review prompt.

{% /tab %}
{% /tabs %}

To compare the options and decide which one fits your goal, see [Customization concepts](/docs/agents/concepts/customization.md). The rest of this article focuses on how to set up and manage customizations.

## Get started

The most effective approach is to adopt customizations incrementally. Start with project-wide instructions, then add more specific customizations as you identify recurring needs. For a hands-on walkthrough, see the [Customize AI for your project](/docs/agents/guides/customize-copilot-guide.md) guide.

1. **Set up project instructions**: type `/init` in chat to generate a `.github/copilot-instructions.md` file with coding standards tailored to your codebase.

1. **Add targeted instructions**: create `*.instructions.md` files that apply to specific languages, frameworks, or folders in your codebase.

1. **Automate repetitive tasks**: create prompt files for common workflows, such as generating tests or scaffolding components.

1. **Specialize the AI for specific roles**: create custom agents, and package reusable capabilities as agent skills to share across projects and tools.

1. **Connect external tools and data**: add MCP servers and hooks to extend the AI with external services and custom actions.

> [!TIP]
> You can generate customization files with AI. Type `/create-instruction`, `/create-prompt`, `/create-skill`, `/create-agent`, or `/create-hook` in chat to scaffold a new customization with AI assistance.

## Manage customizations in the editor

> [!NOTE]
> The Agent Customizations editor is currently in preview.

The Agent Customizations editor provides a centralized UI for creating and managing all your agent customizations in one place. The editor organizes the different customization types into separate tabs and provides an embedded code editor for editing customization files with syntax highlighting and validation.

You can create new customizations from scratch by editing the corresponding Markdown, or use AI to generate initial content based on your specific project.

To add MCP servers and agent plugins, you can browse the corresponding marketplace directly from the editor, install new items, and manage existing ones.

You can open the Agent Customizations editor from either chat surface:

{% tabs id="chat-surface" %}
{% tab label="Agents window" %}

In the Agents window, select a customization type in the **Customizations** panel below the sessions list.

![Screenshot showing the Agent Customizations panel in the Agents window, with the list of available customizations visible.](images/customization/agents-window-customizations.png)

{% /tab %}
{% tab label="Chat view" %}

In the Chat view, select the **Configure Chat (gear icon)** or run **Chat: Open Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot of the Agent Customizations editor, showing the sidebar with customization categories and the main view listing custom agents.](images/customization/chat-customizations-editor.png)

{% /tab %}
{% /tabs %}

You can configure customization for different [agent types](/docs/agents/overview.md#configure-your-agent-session): local agents, Copilot CLI, and the Claude agent. Select the agent type from the dropdown at the top of the editor to view and manage customizations for that agent type.

## Use customizations in a monorepo

In monorepo setups, you might open a subfolder of a repository in VS Code rather than the repo root. By default, Visual Studio Code only discovers customization files within your open workspace folder(s). Enable the `setting(chat.useCustomizationsInParentRepositories)` setting to also discover customizations from the parent repository.

When this setting is enabled, VS Code walks up the folder hierarchy from each workspace folder until it finds a `.git` folder. If found, it collects customizations from all folders between the workspace folder and the repository root (inclusive). This applies to all customization types: always-on instructions (`copilot-instructions.md`, `AGENTS.md`, `CLAUDE.md`), file-based instructions, prompt files, custom agents, agent skills, and hooks.

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

If you open only `packages/frontend/` in VS Code and enable the setting, VS Code discovers the customization files at the repo root, such as `copilot-instructions.md`, `style.instructions.md`, `review.prompt.md`, and `reviewer.agent.md`.

Conditions for parent repository discovery:

* The workspace folder does not contain a `.git` folder (it is not itself a repository root).
* A parent folder contains a `.git` folder.
* The parent repository folder is [trusted](/docs/editing/workspaces/workspace-trust.md). VS Code prompts you to trust the parent folder when the workspace is opened.

> [!NOTE]
> The `setting(chat.useCustomizationsInParentRepositories)` setting is disabled by default.

## Troubleshoot customization issues

If your customizations aren't being applied or cause unexpected behavior, open the **Agent Debug Logs** panel to [troubleshoot agent issues](/docs/agents/agent-troubleshooting/troubleshooting.md). Run **Developer: Open Agent Debug Panel** from the Command Palette (`kb(workbench.action.showCommands)`), or in the Chat view select the ellipsis (**...**) menu and select **Show Agent Debug Logs**.

## Related resources

* [Customization concepts](/docs/agents/concepts/customization.md)
* [Customize AI for your project guide](/docs/agents/guides/customize-copilot-guide.md)
