---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 8/19/2026
MetaDescription: Understand agentic coding in {% data variables.product.prodname_vscode %}, including agents, models, tools, context, sessions, execution environments, customization, and controls.
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
- "{% data variables.copilot.copilot_cloud_agent_short %}"
- copilot cli
- third-party agents
- MCP
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

# Build with agents in {% data variables.product.prodname_vscode_shortname %}

Agentic coding uses AI agents to complete software development tasks with varying levels of autonomy. Give an agent a high-level goal, and it can gather context, plan the work, edit files, run commands, and iterate on the result. You guide the agent, review its actions, and decide which changes to keep.

This article introduces the agentic coding capabilities in {% data variables.product.prodname_vscode %} and the key components that work together. Follow the links to explore each concept in depth, or get hands-on with the [agents quickstart](/docs/agents/quickstart.md) or [agents tutorial](/docs/agents/agents-tutorial.md).

<!-- <video src="images/agents-overview/agents-intro.mp4" title="Video showing an agent session building a complete feature in {% data variables.product.prodname_vscode_shortname %}." controls muted></video> -->

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Choose a short quickstart or a guided tutorial to complete your first coding task with an agent.

* [Start the agents quickstart](/docs/agents/quickstart.md)
* [Follow the agents tutorial](/docs/agents/agents-tutorial.md)

</div>

## What you can do with agents

Agents combine language-model reasoning with tools that act on your development environment. This makes them useful for tasks that involve multiple steps or files, such as:

* Planning and implementing features across multiple files.
* Exploring, refactoring, or migrating a codebase.
* Diagnosing errors, running tests, and applying fixes.
* Running and validating web apps with [browser tools](/docs/agents/run/browser-tools.md).
* Working on independent tasks in parallel or in the background.

Agents are the most autonomous of several AI experiences in {% data variables.product.prodname_vscode_shortname %}. For lighter-weight help, you can also use [chat](/docs/chat/chat-overview.md), [inline chat](/docs/chat/inline-chat.md), [inline suggestions](/docs/editing/ai-powered-suggestions.md), and [smart actions](/docs/editing/copilot-smart-actions.md).

## How agentic coding works

Agentic coding relies on three concepts:

* **Agent loop**: the [agent](/docs/agents/concepts/agents.md#agent-loop) uses a [language model](/docs/agents/concepts/language-models.md) to reason over [context](/docs/agents/concepts/context.md) and call [tools](/docs/agents/concepts/tools.md). It repeats this loop until it completes the task, needs your input, or you stop it.
* **Session**: a [session](/docs/agents/concepts/sessions.md) holds the conversation, workspace, changes, and execution state for a task so that you can pause, resume, and hand off the work.
* **Harness and execution environment**: the [agent harness](/docs/agents/concepts/agent-harnesses.md) coordinates the agent loop. The execution environment determines where tools run and where the agent changes code.

You can further shape the agent with [customizations](/docs/agents/concepts/customization.md).

## Ways to work with agents

Agent sessions are available through several interfaces in {% data variables.product.prodname_vscode_shortname %}, the terminal, and the browser. Each interface presents the session in the environment where you are working.

{% tabs id="agent-surface" %}
{% tab label="{% data variables.copilot.agents_window %}" %}

The [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) (Preview) is a dedicated, agent-first interface for assigning high-level tasks and managing multiple sessions across workspaces.

![Screenshot showing how to start a new agent session by selecting New at the top of the sidebar in the {% data variables.copilot.agents_window %}.](images/agents-overview/agents-window-hero.png)

{% /tab %}
{% tab label="{% data variables.copilot.chat_view %}" %}

The [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) is a code-first interface for working with an agent alongside the editors in your current workspace.

![Screenshot showing the {% data variables.copilot.chat_view %} with the sessions list, conversation, and chat input.](images/agents-overview/chat-view-expanded.png)

{% /tab %}
{% tab label="Browser" %}

From [GitHub](https://github.com/copilot), assign issues to cloud agents, track progress, and review the resulting pull requests. Use [vscode.dev/agents](https://vscode.dev/agents) to connect to agents on your development machine from a browser.

![Screenshot showing the GitHub website with the Copilot tab open, displaying a list of issues assigned to Copilot.](images/agents-overview/hero-vscode-dev-agents-dark.png)

{% /tab %}
{% tab label="{% data variables.copilot.copilot_cli_short %}" %}

Use [{% data variables.copilot.copilot_cli %}](/docs/agents/run/agent-harnesses.md#use-copilot-cli-from-the-terminal) to work with an agent from the integrated terminal or an external terminal.

![Screenshot showing the {% data variables.copilot.copilot_cli_short %} running in the {% data variables.product.prodname_vscode_shortname %} integrated terminal.](images/agents-overview/hero-copilot-cli-dark.png)

{% /tab %}
{% tab label="GitHub Copilot App" %}

Use the [{% data variables.copilot.github_copilot_app %}](https://github.com/features/copilot) to manage AI coding tasks in a dedicated desktop experience outside {% data variables.product.prodname_vscode_shortname %}.

![Screenshot showing the {% data variables.copilot.github_copilot_app %} with the sessions list, conversation, and chat input.](images/agents-overview/hero-copilot-app-dark.png)

{% /tab %}
{% /tabs %}

### Access and continue sessions across interfaces and devices

Agent sessions aren't tied to a single interface. You can switch between the {% data variables.copilot.agents_window %} and the {% data variables.copilot.chat_view %}, or connect from a browser on another device through a dev tunnel.

You can also use the {% data variables.copilot.agents_window %} to start or manage sessions on another machine over SSH or a dev tunnel. Learn more about [remote agent sessions](/docs/agents/run/remote-agent-sessions.md).

{% data variables.product.prodname_vscode_shortname %} can also discover supported sessions created by other interfaces and harnesses, including {% data variables.copilot.copilot_cli_short %}, Claude Code, and Codex. Learn more about [managing and handing off sessions](/docs/agents/concepts/sessions.md).

## Where and how agents run

The agent harness determines which provider-specific capabilities and tools are available. {% data variables.product.prodname_vscode_shortname %} supports the built-in Local harness and provider-specific harnesses such as Copilot, Claude, and Codex. You can also choose from supported language models or [bring your own model](/docs/agent-customization/language-models.md), including a model that runs locally.

The execution environment determines where the agent runs tools and changes code:

* **Your machine**: work directly in a folder or use a Git worktree to isolate changes.
* **Cloud infrastructure**: work on a GitHub repository in the background and return the result as a pull request.
* **A remote machine**: run the agent next to code and tools on a remote host.

Choose a harness and execution environment when you start a session. You can [hand off the session](/docs/agents/run/agent-harnesses.md#hand-off-a-session) when another target is a better fit for the next part of the task. Learn more about [agent harnesses and execution environments](/docs/agents/concepts/agent-harnesses.md).

## Stay in control

Agents can read and edit files, run terminal commands, and call external services. Set a permission level to control which tool calls require your approval. Use agent sandboxing when you need operating system-level file system and network restrictions. Review generated code and validate the result before you keep the changes. Learn more about [trust and safety controls](/docs/agents/concepts/trust-and-safety.md).

Organizations can centrally control which AI features, models, and tools are available. Administrators can restrict agent capabilities and enforce requirements for their teams. Learn more about [enterprise AI policies](/docs/enterprise/ai-settings.md).

## Get started

AI features are built into {% data variables.product.prodname_vscode_shortname %}. Sign in with your GitHub account to use your {% data variables.product.prodname_copilot %} subscription or bring your own models, and then choose a learning path:

* [Complete the agents quickstart](/docs/agents/quickstart.md) to build and validate a small app with an agent.

* [Follow the agents tutorial](/docs/agents/agents-tutorial.md) for a longer, guided introduction to the {% data variables.copilot.agents_window %}, the {% data variables.copilot.chat_view %}, source control, and browser tools.

> [!NOTE]
> Make sure agents are enabled with `setting(chat.agent.enabled)`. If your organization has disabled agents, contact your GitHub organization administrator.

## Related resources

* [Learn how agents work](/docs/agents/concepts/agents.md).
* [Review best practices for using AI](/docs/agents/best-practices.md).
