---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 5/28/2026
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

1. Hover over the Copilot icon in the **Status Bar** and select **Use AI Features** to use your GitHub Copilot subscription. If you don't have a subscription, you are signed up for the free plan with monthly limits on suggestions and chat.

1. Select **Open in Agents** from the VS Code title bar.

1. Select a workspace folder and select the Copilot CLI agent to start a session.

1. Enter a prompt describing what you want to do, such as "Add a dark mode toggle to the header and make sure it works on mobile".

> [!TIP]
> You can also bring your own API key to use models from any provider without a Copilot subscription. Learn more about [language models](/docs/agent-customization/language-models.md).

## Choose how you work with agents

VS Code gives you two main surfaces for working with agents: the Agents window and the Chat view. Pick the one that fits your current task and switch freely between them. Both share the same agent sessions.

<div class="card-grid">
    <a class="card" href="/docs/agents/agents-window">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Agents window (agent-first, Preview)</strong></p>
            <p>A dedicated window for orchestrating agents across multiple projects. Chat is your primary interface where you assign high-level tasks to agents.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/chat-view">
        <i class="codicon codicon-code" aria-hidden="true"></i>
        <div>
            <p><strong>Chat view (code-first)</strong></p>
            <p>A chat panel sits in the sidebar alongside your workspace editor tabs. Agents assist you with coding tasks, while you have full access to VS Code's rich coding experience.</p>
        </div>
    </a>
</div>

## Configure your agent session

Each agent session is configured along a few dimensions. Adjust them per task and change your mind at any time.

| Choice | Description |
|---|---|
| [Agent type](/docs/agents/agent-types/local-agents.md) | Where and how the agent runs: interactively in VS Code (local), in the background on your machine (Copilot CLI), remotely on GitHub's infrastructure (cloud), or through a third-party provider like Anthropic or OpenAI. |
| [Agent](/docs/agents/agent-types/local-agents.md) | The persona that determines how the agent approaches the task and which tools it can use. Pick one of the built-in agents (Agent, Plan, Ask) or create a [custom agent](/docs/agent-customization/custom-agents.md) for specialized roles like code reviewer or documentation writer. |
| [Language model](/docs/agent-customization/language-models.md) | The model that powers the agent's reasoning. Use a fast model for quick edits and questions, or a stronger reasoning model for complex, multi-step work. You can also bring your own API key to use models from other providers. |
| [Permission level](/docs/agents/agent-tools.md#permission-levels) | How much autonomy the agent has to invoke tools and run terminal commands, from approving every action (Default Approvals) to letting the agent work fully on its own (Autopilot). |

You can also hand off an in-progress session to a different agent type to take advantage of their strengths, for example moving from a local Plan session to a [Copilot CLI](/docs/agents/agent-types/copilot-cli.md#hand-off-a-local-session-to-copilot-cli) or [cloud](/docs/agents/agent-types/cloud-agents.md#hand-off-an-agent-session-to-a-cloud-agent) session for autonomous execution.

![Screenshot showing an agent session in VS Code with code changes and chat interaction.](images/agents-overview/chat-sessions-view.png)

## Tailor agents to your codebase

Agents work best when they understand your project's conventions and have the right tools. VS Code gives you several ways to tailor agents so they produce code that fits your codebase and team practices from the start. Learn more about [customizing agents](/docs/agent-customization/overview.md).

<div class="card-grid">
    <a class="card" href="/docs/agent-customization/custom-agents">
        <i class="codicon codicon-person" aria-hidden="true"></i>
        <div>
            <p><strong>Custom agents</strong></p>
            <p>Create agents with a specific role, such as a code reviewer or documentation writer.</p>
        </div>
    </a>
    <a class="card" href="/docs/agent-customization/agent-skills">
        <i class="codicon codicon-symbol-event" aria-hidden="true"></i>
        <div>
            <p><strong>Agent skills</strong></p>
            <p>Teach agents specialized capabilities that work across VS Code, CLI, and cloud agents.</p>
        </div>
    </a>
    <a class="card" href="/docs/agent-customization/custom-instructions">
        <i class="codicon codicon-note" aria-hidden="true"></i>
        <div>
            <p><strong>Custom instructions</strong></p>
            <p>Define coding standards and conventions so agents generate code that matches your style.</p>
        </div>
    </a>
    <a class="card" href="/docs/agent-customization/prompt-files">
        <i class="codicon codicon-comment-discussion" aria-hidden="true"></i>
        <div>
            <p><strong>Prompt files</strong></p>
            <p>Save and reuse common prompts for repeatable tasks.</p>
        </div>
    </a>
    <a class="card" href="/docs/agent-customization/hooks">
        <i class="codicon codicon-zap" aria-hidden="true"></i>
        <div>
            <p><strong>Hooks</strong></p>
            <p>Run custom scripts at key points in an agent session to validate, log, or transform actions.</p>
        </div>
    </a>
    <a class="card" href="/docs/agent-customization/mcp-servers">
        <i class="codicon codicon-server" aria-hidden="true"></i>
        <div>
            <p><strong>MCP servers</strong></p>
            <p>Connect external tools and services so agents can access databases, APIs, and more.</p>
        </div>
    </a>
    <a class="card" href="/docs/agent-customization/agent-plugins">
        <i class="codicon codicon-extensions" aria-hidden="true"></i>
        <div>
            <p><strong>Plugins</strong></p>
            <p>Install pre-packaged bundles of agent customizations from the Marketplace.</p>
        </div>
    </a>
</div>

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
