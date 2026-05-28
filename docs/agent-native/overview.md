---
ContentId: 0aefcb70-7884-487f-953e-46c3e07f7cbe
DateApproved: 5/28/2026
MetaDescription: Get started with AI agents in VS Code. Run any agent with any model, plan and build features, and customize agents for your workflow.
MetaSocialImage: images/shared/github-copilot-social.png
Keywords:
- GitHub Copilot
- AI
- agents
- autonomous
- agentic
- multi-file editing
- architecture
- refactoring
- semantic search
- codebase understanding
- enterprise
- inline suggestions
- chat
- MCP
- team
- overview
- getting started
---
# Build with agents in VS Code

Visual Studio Code comes with AI agents built in. Describe what you want to build, and an agent plans the approach, writes the code, and verifies the result across your entire project. Agents handle tasks end-to-end: build features across multiple files, debug and fix failing tests, refactor between frameworks, [test web apps with the integrated browser](/docs/agents/guides/browser-agent-testing-guide.md), or [ship a pull request](/docs/agents/agent-types/cloud-agents.md) for team review.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/copilot/getting-started.md)

</div>

## Choose how you work

VS Code gives you two surfaces for working with agents. Pick the one that fits your current task and switch freely between them. Both share the same agent sessions, settings, and keybindings, so switching costs nothing.

<div class="card-grid">
    <a class="card" href="/docs/agents/overview">
        <i class="codicon codicon-code" aria-hidden="true"></i>
        <div>
            <p><strong>Code-first</strong></p>
            <p>Use the Chat view alongside your editor to let agents help you with coding tasks for a specific project. Review the code at every step of the way.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/agents-window">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Agent-first</strong></p>
            <p>Use the Agents window when you want to work in a task-focused way and orchestrate agents across projects with chat as the primary interface. Review outcomes instead of code.</p>
        </div>
    </a>
</div>

<video src="images/overview/agents-intro.mp4" title="Video showing an agent session building a complete feature in VS Code." controls muted></video>

## Run any agent with any model

Agents run where the work needs to happen. Run them locally for interactive work, in the background for autonomous tasks, in the cloud for team collaboration through pull requests, or through third-party providers like Anthropic and OpenAI. Hand off a task from one agent type to another at any point, and the relevant context carries over.

![Screenshot showing the sessions type picker in the Chat view with options for local, background, cloud, and third-party agents.](../agents/images/agents-overview/sessions-type-picker.png)

Pick from dozens of models across OpenAI, Anthropic, Google, and more, or bring your own API key to use any model from any provider. Switch models at any time without changing your workflow. Learn more about [agent types](/docs/agents/overview.md) and [language models](/docs/agent-customization/language-models.md).

## Plan before you build

Use the built-in Plan agent to break a task into a structured implementation plan before writing any code. The Plan agent analyzes your codebase, asks clarifying questions, and produces a step-by-step plan. When the plan looks right, hand it off to an implementation agent to execute it.

<video src="images/overview/plan-intro.mp4" title="Video showing the plan agent creating a structured implementation plan for adding authentication to the app." controls muted></video>

Learn more about [planning with agents](/docs/agents/planning.md).

## Make agents work your way

Agents work best when they understand your project's conventions and have the right tools. VS Code gives you several ways to tailor agents so they produce code that fits your codebase and team practices from the start.

<div class="card-grid">
    <a class="card" href="/docs/agent-customization/custom-instructions">
        <i class="codicon codicon-note" aria-hidden="true"></i>
        <div>
            <p><strong>Custom instructions</strong></p>
            <p>Define coding standards and conventions so agents generate code that matches your style.</p>
        </div>
    </a>
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
    <a class="card" href="/docs/agent-customization/mcp-servers">
        <i class="codicon codicon-server" aria-hidden="true"></i>
        <div>
            <p><strong>MCP servers</strong></p>
            <p>Connect external tools and services so agents can access databases, APIs, and more.</p>
        </div>
    </a>
</div>

Learn more about [customizing agents](/docs/agent-customization/overview.md).

## Trust and control

Agents can read and edit files, run terminal commands, and call external services. VS Code keeps you in control: approve or deny tool calls before they run, set a permission level that matches the autonomy you are comfortable with, and enable agent sandboxing to restrict file system and network access at the OS level. Learn more about [trust and safety](/docs/agents/concepts/trust-and-safety.md) and [AI security](/docs/agents/security.md).

Organizations can centrally manage which AI features, models, and tools are available across their teams. Admins define policies that control agent capabilities, restrict MCP servers or extensions, and enforce compliance requirements, so developers get a consistent, governed experience out of the box. Learn more about [enterprise AI policies](/docs/enterprise/ai-settings.md).

> [!IMPORTANT]
> Your organization might have disabled agents in VS Code. Contact your admin to enable this functionality.

## Next steps

<div class="card-grid">
    <a class="card" href="/docs/agents/agents-tutorial">
        <i class="codicon codicon-mortar-board" aria-hidden="true"></i>
        <p>Agents tutorial</p>
    </a>
    <a class="card" href="/docs/agents/concepts/agents">
        <i class="codicon codicon-lightbulb" aria-hidden="true"></i>
        <p>Agent concepts</p>
    </a>
    <a class="card" href="/docs/agent-customization/overview">
        <i class="codicon codicon-settings-gear" aria-hidden="true"></i>
        <p>Customize agents</p>
    </a>
    <a class="card" href="/docs/agents/agents-window">
        <i class="codicon codicon-window" aria-hidden="true"></i>
        <p>Agents window</p>
    </a>
    <a class="card" href="/docs/agents/best-practices">
        <i class="codicon codicon-checklist" aria-hidden="true"></i>
        <p>Best practices</p>
    </a>
</div>
