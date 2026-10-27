---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 10/28/2026
MetaDescription: Choose AI workflows, models, and agents in {% data variables.product.prodname_vscode_shortname %}, from inline suggestions to remote sessions.
Keywords:
- GitHub Copilot
- AI
- agents
- autonomous
- agentic
- multi-file editing
- architecture
- refactoring
- cloud sessions
- copilot cli
- third-party agents
- language models
- MCP
- plugins
- enterprise
- overview
- getting started
- free
- copilot free
- bring your own key
- BYOK
- local models
- agent harness
- continuity
- GitHub Environments
---

# Build with AI in {% data variables.product.prodname_vscode_shortname %}

Use as much or as little AI as your task needs in {% data variables.product.prodname_vscode %}. Get suggestions as you type, collaborate with an agent beside your code, or coordinate tasks across projects in the {% data variables.copilot.agents_window %}. Combine these approaches as your work changes.

You can choose models from multiple providers and work with the {% data variables.product.prodname_copilot_short %}, Claude, or Codex agent harness, using a supported account or your own API key. Customizations and plugins help you tailor agents to your work.

Continuity lets you pick up agent work across supported interfaces without starting over. Connect to sessions on your own machine through GitHub Environments, or use a cloud session without keeping a local host online.

## Try your first agent task

{% action-card title="Build your first app with an agent" %}
Build and validate a small app, then review the result. The quickstart uses the {% data variables.product.prodname_copilot %} harness with recommended defaults, so you don't need to configure every option first.

* [Start the agents quickstart](/docs/agents/quickstart.md)

{% /action-card %}

* **Already use agents:** Follow the [experienced-agent fast track](/docs/agents/guides/overview.md#experienced-agent-fast-track) in your own repository.
* **New to {% data variables.product.prodname_vscode_shortname %}:** First [install the editor and open a workspace](/docs/getstarted/overview.md).

<video src="images/agents-overview/build-with-ai-overview.mp4" title="Video overview of building with AI in VS Code, showing inline suggestions, collaboration alongside code, and task orchestration in the Agents window." autoplay loop controls muted></video>

<a name="what-you-can-do-with-ai"></a>
<a name="ways-to-work-with-agents"></a>

## Choose how you work

Switch between different experiences depending on your task, and [continue agent sessions across interfaces](#continue-across-interfaces-and-machines) to pick up where you left off.

<div class="card-grid">
    <a class="card" href="/docs/editing/ai-powered-suggestions">
        <i class="codicon codicon-edit" aria-hidden="true"></i>
        <div>
            <p><strong>Write code with assistance</strong></p>
            <p>Get inline suggestions as you type, including suggestions for your next edit.</p>
        </div>
    </a>
    <a id="work-alongside-your-code" class="card" href="/docs/agents/run/chat-view">
        <i class="codicon codicon-comment-discussion" aria-hidden="true"></i>
        <div>
            <p><strong>Collaborate alongside your code</strong></p>
            <p>Work with an agent in the {% data variables.copilot.chat_view %}, focused on the current workspace alongside your editor, terminal, tests, and debugger.</p>
        </div>
    </a>
    <a id="delegate-and-manage-tasks" class="card" href="/docs/agents/run/agents-window">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Delegate and coordinate work</strong></p>
            <p>Assign tasks and manage agent sessions across projects in the {% data variables.copilot.agents_window %}.</p>
        </div>
    </a>
</div>

An [agent](/docs/agents/concepts/agents.md) uses a model and tools to find relevant code, make changes, and run checks. Both the {% data variables.copilot.chat_view %} and the {% data variables.copilot.agents_window %} run agents. You set the goal, guide the work, and review the results.

For routine work, save a prompt as an [automation](/docs/agents/run/automations.md). Run it locally on a schedule, or use cloud automations `feature(cloud-automations)` for scheduled or event-triggered repository work that continues while your computer is off. Review a manual run before enabling recurring work.

For a focused edit, use [inline chat](/docs/chat/inline-chat.md) without leaving your code. To compare features for a specific task, use the [AI features cheat sheet](/docs/agents/reference/ai-features-cheat-sheet.md#choose-a-feature).

## Choose your models, agents, and tools

For a first agent task, [use the quickstart](/docs/agents/quickstart.md) without configuring every option. You can adapt the choices below as your needs change.

| Choice | Options |
|--------|---------|
| **Models** | Choose [models from multiple providers](/docs/agent-customization/language-models.md) through {% data variables.product.prodname_copilot %}, or use your own [API key (BYOK)](/docs/agent-customization/language-models.md#bring-your-own-language-model-key) or a supported local model. |
| **Agent harnesses** | Choose between {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_anthropic_claude_short %}, or {% data variables.product.prodname_openai_codex_short %} based on its [tools and workflows](/docs/agents/run/agent-harnesses.md#compare-agent-harnesses). |
| **Access and billing** | Use your existing {% data variables.product.prodname_copilot %} plan, a supported provider account, or an API key. Check [requirements for your harness](/docs/agents/run/agent-harnesses.md#requirements-and-setup). |
| **Customization** | Tailor agents with [plugins](/docs/agent-customization/agent-plugins.md), [project instructions](/docs/agents/guides/customize-copilot-guide.md), and [skills](/docs/agent-customization/agent-skills.md). Connect external tools through [Model Context Protocol (MCP) servers](/docs/agent-customization/mcp-servers.md). |

## Continue across interfaces and machines

Continuity means picking up agent work across supported interfaces and machines without starting over. Choose where you interact with an agent while its workspace and execution stay on the host. Session support and requirements differ by harness and destination.

| Where you want to work | Start here |
|------------------------|------------|
| **Across {% data variables.product.prodname_copilot_short %} apps and devices** | Use [GitHub Environments (Preview)](/docs/agents/run/remote-agent-sessions.md#github-environments-preview) to register your development machine and continue its agent sessions from {% data variables.product.prodname_vscode_shortname %}, the {% data variables.copilot.github_copilot_app %}, {% data variables.copilot.copilot_cli_short %}, GitHub.com, or GitHub Mobile. Available actions vary by client. |
| **On managed cloud compute** | Use [cloud sessions (Experimental)](/docs/agents/run/cloud-sandbox-sessions.md) for interactive agent work without keeping your own machine online. Reopen the existing cloud session to continue the conversation. Execution stays in the cloud environment, whose availability and lifetime are managed by the service. |
| **Editor or {% data variables.copilot.agents_window %}** | Use the {% data variables.product.prodname_copilot %}, {% data variables.product.prodname_anthropic_claude_short %}, or {% data variables.product.prodname_openai_codex_short %} agent harness in {% data variables.product.prodname_vscode_shortname %} and [continue your session across interfaces](/docs/agents/run/sessions/manage-sessions.md#continue-between-the-chat-view-and-agents-window). |
| **{% data variables.product.prodname_vscode_shortname %} on another machine** | Use {% data variables.product.prodname_vscode_shortname %}-specific remote connections through [SSH](/docs/agents/run/remote-agent-sessions.md#connect-via-ssh) or a [dev tunnel](/docs/agents/run/remote-agent-sessions.md#connect-via-dev-tunnel). Dev tunnels also support the [browser-based {% data variables.copilot.agents_window %}](/docs/agents/run/remote-agent-sessions.md#use-the-agents-window-in-the-browser). |

For sessions that run on your own machine, keep the host running and reachable. Cloud sessions use managed compute instead. Start a cloud session for work in the cloud, then reopen that session to continue.

Use your own private repository to [start a cloud agent task in {% data variables.product.prodname_vscode_shortname %} and continue it in {% data variables.copilot.copilot_cli_short %}](/docs/agents/cloud-continuity-tutorial.md) (Experimental).

Where tools run and where the model is hosted are separate choices. An agent can edit files on your machine while sending model requests to a hosted provider.

## Stay in control

AI can produce incorrect code or misunderstand your intent. You remain responsible for deciding which changes reach your codebase.

* **Review before integrating.** Agents can save edits directly to the session folder or worktree. [Review the diff and validate the result](/docs/agents/run/review-code-edits.md) before you commit or merge changes.
* **Control actions and redirect work.** Use [permissions and approvals](/docs/agents/run/approvals.md) to decide which actions require confirmation. You can [steer or stop a request](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running), but stopping doesn't undo completed actions or changes to external services.
* **Understand isolation.** A Git worktree keeps code changes separate, but isn't a security boundary. For file system and network restrictions on agent-run terminal commands, review the [platform-specific sandboxing options](/docs/agents/run/agent-sandboxing.md).

Before using agents on an existing project, review the [recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline). On a managed device, your organization might restrict available agents, models, and tools through [enterprise AI policies](/docs/enterprise/manage-ai-settings.md). If agents don't appear in chat, review the [availability troubleshooting steps](/docs/agents/agent-troubleshooting/faq.md#agents-are-not-available-in-chat).

For keyboard, screen reader, and low-vision workflows, learn how to use the [Accessible View and other accessibility features](/docs/configure/accessibility/accessibility.md#accessible-view).

## Next steps

* [Apply agent best practices to your project](/docs/agents/best-practices.md).
* [Compare quality, reliability, and AI credit usage](/docs/agents/guides/optimize-usage.md).
