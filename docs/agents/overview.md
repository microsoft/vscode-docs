---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 10/21/2026
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
- "{% data variables.copilot.copilot_cloud_agent_short %}"
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
---

# Build with AI in {% data variables.product.prodname_vscode_shortname %}

Use as much or as little AI as your task needs in {% data variables.product.prodname_vscode %}. Get suggestions as you type, collaborate with an agent beside your code, or coordinate tasks across projects in the {% data variables.copilot.agents_window %}. Combine these approaches as your work changes.

You can choose models from multiple providers and work with the {% data variables.product.prodname_copilot_short %}, Claude, or Codex agent harness, using a supported account or your own API key. Customizations and plugins help you tailor agents to your work.

When you switch interfaces, you can continue sessions without starting over. For projects on another machine, you can connect to agents running there while keeping your files and development tools remote.

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
            <p>Ask questions and work with an agent beside your editor, terminal, tests, and debugger.</p>
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

<a name="how-you-work-with-an-agent"></a>

An [agent](/docs/agents/concepts/agents.md) uses a model and tools to find relevant code, make changes, and run checks. You set the goal, guide the work, and review the results.

For a focused edit, use [inline chat](/docs/chat/inline-chat.md) without leaving your code. To compare features for a specific task, use the [AI features cheat sheet](/docs/agents/reference/ai-features-cheat-sheet.md#choose-a-feature).

## Choose your models, agents, and tools

For a first agent task, [use the quickstart's recommended setup](/docs/agents/quickstart.md) without configuring every option. You can adapt the choices below as your needs change.

| Choice | Options |
|--------|---------|
| **Models** | Choose [models from multiple providers](/docs/agent-customization/language-models.md) through {% data variables.product.prodname_copilot %}, or use your own [API key (BYOK)](/docs/agent-customization/language-models.md#bring-your-own-language-model-key) or a supported local model. |
| **Agent harnesses** | Choose {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_anthropic_claude %}, or {% data variables.product.prodname_openai_codex %} based on its [tools and workflows](/docs/agents/run/agent-harnesses.md#compare-agent-harnesses). |
| **Access and billing** | Use your existing {% data variables.product.prodname_copilot %} plan, a supported provider account, or an API key. Check [requirements for your harness](/docs/agents/run/agent-harnesses.md#requirements-and-setup). |
| **Customization** | Tailor agents with [plugins](/docs/agent-customization/agent-plugins.md), [project instructions](/docs/agents/guides/customize-copilot-guide.md), and [skills](/docs/agent-customization/agent-skills.md). Connect external tools through [Model Context Protocol (MCP) servers](/docs/agent-customization/mcp-servers.md). |

Choosing an {% data variables.product.prodname_anthropic_claude %} model in a {% data variables.product.prodname_copilot_short %} session does not change the harness.

Available options depend on your harness, account, and organization's policies. Some integrations are Preview or Experimental; check the linked setup requirements. BYOK and local models don't provide {% data variables.product.prodname_copilot %} service features such as inline suggestions, semantic search, and embeddings.

<a name="other-ways-to-access-agents"></a>

## Continue across interfaces and machines

Choose where you interact with an agent and where it runs. Session support and requirements differ by harness and destination.

| Where you want to work | Start here |
|------------------------|------------|
| **Editor or {% data variables.copilot.agents_window %}** | Switch between coordinating work and editing code while [continuing a supported session](/docs/agents/run/sessions/manage-sessions.md#continue-between-the-chat-view-and-agents-window). |
| **{% data variables.copilot.copilot_cli %} or {% data variables.copilot.github_copilot_app %}** | Discover and continue [supported local sessions](/docs/agents/run/sessions/manage-sessions.md#view-sessions-from-other-applications) in {% data variables.product.prodname_vscode_shortname %}, or [resume a session in the terminal](/docs/agents/run/sessions/manage-sessions.md#use-copilot-cli-from-the-terminal) where available. |
| **GitHub.com** | Monitor and steer a running {% data variables.product.prodname_copilot_short %} session with [remote control](/docs/agents/run/remote-agent-sessions.md#remote-control-copilot-sessions). Requires {% data variables.product.prodname_github %} sign-in and a workspace linked to a {% data variables.product.prodname_github %} repository. |
| **Another machine** | Connect to an agent through [SSH](/docs/agents/run/remote-agent-sessions.md#connect-via-ssh) or a [dev tunnel](/docs/agents/run/remote-agent-sessions.md#connect-via-dev-tunnel). Files and development tools stay on the remote machine. |

Keep the session's host running and reachable for remote access. Connecting to a running session is different from [delegating a task to a cloud agent](/docs/agents/run/agent-harnesses.md#start-a-cloud-session), which works on provider-managed infrastructure and returns a pull request.

Where tools run and where the model is hosted are separate choices. An agent can edit files on your machine while sending model requests to a hosted provider.

## Try your first agent task

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="false" title="Try your first agent task">
Build and validate a small app, then review the result.

* [Start the agents quickstart](/docs/agents/quickstart.md)

</div>

New to agents? The quickstart uses the [{% data variables.product.prodname_copilot %} harness](/docs/agents/run/agent-harnesses.md#copilot) with recommended defaults, so you don't need to configure every option first. Follow the [{% data variables.product.prodname_copilot_short %} setup guide](/docs/setup/copilot.md) for account, usage, and data-handling requirements.

If you're new to {% data variables.product.prodname_vscode_shortname %}, first [install the editor and open a workspace](/docs/getstarted/overview.md). If you already use agents, follow the [experienced-agent fast track](/docs/agents/guides/overview.md#experienced-agent-fast-track) in your own repository.

For a path from your first request through planning, steering, review, and recovery, see [Run agents in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/overview.md).

## Stay in control

AI can produce incorrect code or misunderstand your intent. You remain responsible for deciding which changes reach your codebase.

* **Review before integrating.** Agents can save edits directly to the session folder or worktree. [Review the diff and validate the result](/docs/agents/run/review-code-edits.md) before you commit or merge changes.
* **Control actions and redirect work.** Use [permissions and approvals](/docs/agents/run/approvals.md) to decide which actions require confirmation. You can [steer or stop a request](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running), but stopping doesn't undo completed actions or changes to external services.
* **Understand isolation.** A Git worktree keeps code changes separate, but isn't a security boundary. For file system and network restrictions on agent-run terminal commands, review the [platform-specific sandboxing options](/docs/agents/run/agent-sandboxing.md).

Before using agents on an existing project, review the [recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline). On a managed device, your organization might restrict available agents, models, and tools through [enterprise AI policies](/docs/enterprise/manage-ai-settings.md). If agents don't appear in chat, review the [availability troubleshooting steps](/docs/agents/agent-troubleshooting/faq.md#agents-are-not-available-in-chat).

For keyboard, screen reader, and low-vision workflows, learn how to use the [Accessible View and other accessibility features](/docs/configure/accessibility/accessibility.md#accessible-view).

## Next steps

* [Find a tutorial or guide for your next task](/docs/agents/guides/overview.md).
* [Apply agent best practices to your project](/docs/agents/best-practices.md).
* [Compare quality, reliability, and AI credit usage](/docs/agents/guides/optimize-usage.md).
