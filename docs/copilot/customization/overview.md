---
ContentId: 16c73175-a606-4aab-8ae5-a5071d3b9e24
DateApproved: 3/9/2026
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

Visual Studio Code gives you several ways to teach the AI about your codebase, coding standards, and workflows. This article introduces the customization options and helps you get started.

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="true" title="Core concepts">
Learn about the different customization types and when to use each one.

* [Customization concepts](/docs/copilot/concepts/customization.md)

</div>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Tutorial">
Follow a hands-on walkthrough to customize AI for your project.

* [Customize AI for your project](/docs/copilot/guides/customize-copilot-guide.md)

</div>

To access customizations, select the **Configure Chat (gear icon)** in the Chat view.

## Customization scenarios

The following sections describe common customization scenarios and which options to use for each one.

### Define coding standards

Use [custom instructions](/docs/copilot/customization/custom-instructions.md) to share project-wide rules and conventions with the AI. Always-on instructions apply to every request, while file-based instructions target specific file types or folders. For example, enforce ESLint rules across all files and apply React patterns only in `.tsx` files.

### Automate tasks and workflows

Create [prompt files](/docs/copilot/customization/prompt-files.md) for repeatable tasks you run often, like scaffolding a component or preparing a pull request.

For more complex multi-step workflows that involve scripts and external tools, package them as [agent skills](/docs/copilot/customization/agent-skills.md).

### Specialize the AI

Create [custom agents](/docs/copilot/customization/custom-agents.md) that adopt specific personas, such as security reviewer, database admin, or planner. Each agent defines its own behavior, available tools, and language model preferences. Choose different [language models](/docs/copilot/customization/language-models.md) for different tasks, or bring your own API key to access additional models.

### Discover and install plugins

Install [agent plugins](/docs/copilot/customization/agent-plugins.md) (preview) to add pre-packaged bundles of customizations from plugin marketplaces. A single plugin can provide slash commands, skills, custom agents, hooks, and MCP servers.

### Connect external tools and data

Add [MCP servers](/docs/copilot/customization/mcp-servers.md) to give the AI access to databases, APIs, and other services through the [Model Context Protocol](https://modelcontextprotocol.io/). Use [hooks](/docs/copilot/customization/hooks.md) to run shell commands at key lifecycle points, such as running a formatter after every file edit or enforcing security policies.

## Get started

Implement AI customizations incrementally. Start with the basics and add more as needed. For a hands-on walkthrough, see the [Customize AI for your project](/docs/copilot/guides/customize-copilot-guide.md) guide.

1. **Initialize your project**: type `/init` in chat to generate a `.github/copilot-instructions.md` file with coding standards tailored to your codebase.

1. **Add targeted rules**: create file-based `*.instructions.md` files for specific parts of your codebase, such as language conventions or framework patterns.

1. **Automate repetitive tasks**: create prompt files for common workflows and add MCP servers to connect external services.

1. **Create specialized workflows**: build custom agents for specific roles. Package reusable capabilities as agent skills to share across tools.

1. **Generate customizations with AI**: type `/create-prompt`, `/create-instruction`, `/create-skill`, `/create-agent`, or `/create-hook` in chat to generate customization files with AI assistance.

## Parent repository discovery

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

## Chat Customizations editor

> [!NOTE]
> The Chat Customizations editor is currently in preview.

The Chat Customizations editor provides a centralized UI for discovering, creating, and managing all your customizations in one place. From the editor, you can browse customization categories (agents, skills, instructions, prompts, hooks, MCP servers), create new items with optional AI-guided generation, and edit existing customizations in an embedded code editor.

To open the Chat Customizations editor, run **Chat: Open Chat Customizations** from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot of the Chat Customizations editor, showing the sidebar with customization categories and the main view listing custom agents.](../images/customization/chat-customizations-editor.png)

## Troubleshoot customization issues

If your customizations aren't being applied or cause unexpected behavior, select **Configure Chat (gear icon)** > **Show Agent Debug Logs** in the Chat view to [troubleshoot agent issues](/docs/copilot/troubleshooting.md).

## Related resources

* [Customization concepts](/docs/copilot/concepts/customization.md)
* [Customize AI for your project guide](/docs/copilot/guides/customize-copilot-guide.md)
