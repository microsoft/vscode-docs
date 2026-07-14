---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 7/15/2026
MetaDescription: Build with AI agents in Visual Studio Code. Learn what agents can do, configure agent sessions, and customize agents for your project.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- GitHub Copilot
- AI
- agents
- autonomous
- agentic
- multi-file editing
- architecture
- refactoring
- background agent
- cloud agent
- copilot coding agent
- copilot cli
- third-party agents
- MCP
- enterprise
- overview
- getting started
---

# Build with agents in VS Code

Visual Studio Code comes with AI agents built in. Describe a task in natural language and an agent plans the approach, edits files across your project, runs commands, and self-corrects until the work is done. Agents stay in the flow of how you already work, so you can focus on intent and review instead of typing every line.

<video src="images/agents-overview/agents-intro.mp4" title="Video showing an agent session building a complete feature in VS Code." controls muted></video>

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/getstarted/getting-started.md)

</div>

> [!NOTE]
> Make sure agents are enabled in VS Code settings (`setting(chat.agent.enabled)`). If your organization has disabled agents, contact your GitHub organization admin.

## What you can do with agents

Agents handle real coding tasks end-to-end. A few common ones:

* **Plan before you code**: use the [Plan agent](/docs/agents/planning.md) to produce a step-by-step implementation plan you can review and refine before any file changes.
* **Build new features**: describe what functionality you want and let the agent scaffold UI, wire up state, and update tests.
* **Prototype and explore variants**: spin up quick proofs of concept or generate multiple design variants of the same feature in parallel, then keep the one that works best.
* **Refactor at scale**: rename, restructure, or migrate code across the workspace, with the agent tracking what still needs to change.
* **Build and test web apps**: drive a running web app from chat to [verify behavior end-to-end in the integrated browser](/docs/agents/guides/browser-agent-testing-guide.md).
* **Debug and fix failing tests**: point an agent at a stack trace or a red test and have it find the root cause and apply a fix.

## Get started

AI features are built into VS Code. To enable them, sign in with your GitHub account:

1. Select **Sign In** from the VS Code title bar or hover over the Copilot icon in the Status Bar and select **Enable AI features**. If you don't have a subscription, you are signed up for the free plan with monthly limits on suggestions and chat.

1. Select **Open in Agents** from the VS Code title bar.

1. Select a workspace folder and select the Copilot CLI agent to start a session.

1. Enter a prompt describing what you want to do, such as "Add a dark mode toggle to the header and make sure it works on mobile".

> [!TIP]
> You can also bring your own API key to use models from any provider without a Copilot subscription. Learn more about [language models](/docs/agent-customization/language-models.md).

## Choose how you work with agents

VS Code gives you two main surfaces for working with agents: the **Agents window** and the **Chat view**. Pick the one that fits your current task and switch freely between them. Both share the same agent sessions, letting you start a session in one and continue it in the other without losing context.

The choice comes down to your approach and your scope. The Agents window is **agent-first** and works across **all your workspaces** from a single window, so it's ideal when you assign high-level tasks and orchestrate multiple agents in parallel across projects. The Chat view is **code-first** and is **scoped to the workspace** you have open, so it's ideal when you give the agent coding tasks and stay close to the code it produces.

{% tabs id="agent-surface" %}
{% tab label="Agents window" %}

The [Agents window](/docs/agents/agents-window.md) (Preview) is a dedicated window focused on chat as the primary interface. It works across all your workspaces from one window, so you can assign high-level tasks, evaluate the outcomes, and run and track multiple agents in parallel. The Agents window is optimized for **agent-first workflows**.

![Screenshot showing how to start a new agent session by selecting New at the top of the sidebar in the Agents window.](images/agents-overview/agents-window-hero.png)

{% /tab %}
{% tab label="Chat view" %}

The [Chat view](/docs/agents/chat-view.md) is a chat panel in the sidebar, next to your workspace editor tabs. It's scoped to the workspace you have open in VS Code, so you can give the agent coding tasks, review the code it produces, and keep an agent focused on the code you're actively working on. The Chat view is optimized for **code-first workflows**.

![Screenshot showing the Chat view with the sessions list, conversation, and chat input.](images/agents-overview/chat-view-expanded.png)

{% /tab %}
{% /tabs %}

## Configure your agent session

Each agent session has a few settings that control how it runs. Choose them when you start a session and adjust them at any time as your task evolves.

![Screenshot of the session input area with configuration options for agent type, agent, language model, and permission level.](images/agents-overview/chat-session-configuration.png)

| Choice | Description |
|---|---|
| **Agent type** | Where the agent runs and how you interact with it: interactively in VS Code with [local agents](/docs/agents/agent-types/local-agents.md), in the background on your machine with [Copilot CLI](/docs/agents/agent-types/copilot-cli.md), remotely on GitHub's infrastructure with [cloud agents](/docs/agents/agent-types/cloud-agents.md), or through a [third-party provider](/docs/agents/agent-types/third-party-agents.md) like Anthropic or OpenAI.<br>You can hand off an in-progress session to a different agent type, for example to pass a local Plan session to [Copilot CLI](/docs/agents/agent-types/copilot-cli.md#hand-off-a-local-session-to-copilot-cli) or a [cloud](/docs/agents/agent-types/cloud-agents.md#hand-off-an-agent-session-to-a-cloud-agent) agent. |
| [Agent](/docs/agents/agent-types/local-agents.md#built-in-agents) | The persona that shapes how the agent approaches a task and which tools it can use. Pick a built-in agent (Agent, Plan, Ask) or use a [custom agent](/docs/agent-customization/custom-agents.md) for a specialized role like a security expert or documentation writer. |
| [Language model](/docs/agent-customization/language-models.md) | The model that powers the agent's reasoning. Pick a fast model for quick edits and questions, or a stronger reasoning model for complex, multi-step or research work. |
| [Permission level](/docs/agents/approvals.md#permission-levels) | How much autonomy the agent has to run tools and terminal commands, from approving every action to letting it work on its own. |

## Tailor agents to your codebase

Agents work best when they understand your project's conventions and have the right tools. VS Code gives you several ways to tailor agents so they produce code that fits your codebase and team practices from the start:

* **Set coding standards**: define project-wide rules and conventions with [custom instructions](/docs/agent-customization/custom-instructions.md) so agents generate code in your style.

* **Automate repeatable tasks**: package multi-step workflows, scripts, and template files as [agent skills](/docs/agent-customization/agent-skills.md), or capture a single reusable prompt in a [prompt file](/docs/agent-customization/prompt-files.md).

* **Specialize the agent**: create [custom agents](/docs/agent-customization/custom-agents.md) for personas or roles like code reviewer, security expert, or tester.

* **Connect external tools and data**: add [MCP servers](/docs/agent-customization/mcp-servers.md) to reach databases and APIs, and use [hooks](/docs/agent-customization/hooks.md) to run scripts at key points in an agent session.

To decide which option fits your goal, see [Customization concepts](/docs/agents/concepts/customization.md). For setup steps and examples, see [Customize agent behavior in VS Code](/docs/agent-customization/overview.md). You can also install [plugins](/docs/agent-customization/agent-plugins.md) to add pre-packaged bundles of these customizations from the Marketplace.

## Trust and control

Agents can read and edit files, run terminal commands, and call external services. VS Code keeps you in control: approve or deny tool calls before they run, set a permission level that matches the autonomy you are comfortable with, and enable agent sandboxing to restrict file system and network access at the OS level. Learn more about [trust and safety](/docs/agents/concepts/trust-and-safety.md) and [AI security](/docs/agents/security.md).

Organizations can centrally manage which AI features, models, and tools are available across their teams. Admins define policies that control agent capabilities, restrict MCP servers or extensions, and enforce compliance requirements, so developers get a consistent, governed experience out of the box. Learn more about [enterprise AI policies](/docs/enterprise/ai-settings.md).

## Next steps

<div class="card-grid">
    <a class="card" href="/docs/agents/agents-tutorial">
        <i class="codicon codicon-mortar-board" aria-hidden="true"></i>
        <p>Follow the agents tutorial</p>
    </a>
    <a class="card" href="/docs/agents/best-practices">
        <i class="codicon codicon-checklist" aria-hidden="true"></i>
        <p>Learn agent best practices</p>
    </a>
    <a class="card" href="/docs/agents/concepts/overview">
        <i class="codicon codicon-lightbulb" aria-hidden="true"></i>
        <p>Explore agent concepts</p>
    </a>
</div>
