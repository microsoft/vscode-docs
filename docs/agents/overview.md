---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 9/16/2026
MetaDescription: Explore AI in {% data variables.product.prodname_vscode %}, from code suggestions to agents that plan, edit, and test changes.
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

Use AI in {% data variables.product.prodname_vscode %} to understand unfamiliar code, fix bugs, and build features. Get suggestions while you type, ask questions in a conversation, or give an AI agent a task that spans files and tools. You can work alongside the agent in your editor or delegate a task and review the result.

Choose from multiple AI models and agent providers, bring your own model API key, and extend agents with tools and plugins. {% data variables.product.prodname_vscode_shortname %} brings these options into the same editor, so you can adapt your AI workflow to your task and your team's requirements. You don't need to configure every option before trying your first task.

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="false" title="Try your first agent task">
Build and validate a small app in the {% data variables.copilot.chat_view %}, then review the result.

* [Start the agents quickstart](/docs/agents/quickstart.md)

</div>

The quickstart uses {% data variables.product.prodname_copilot %}. See the [{% data variables.product.prodname_copilot_short %} setup guide](/docs/setup/copilot.md) for account, usage, and data-handling requirements, or compare [other agent providers and sign-in options](/docs/agents/run/agent-harnesses.md#configure-a-harness-or-cloud-target).

## What you can do with AI

Choose a workflow based on the task, from help with a single line to a coordinated change across your project.

| Your goal | How AI helps |
|-----------|--------------|
| Implement a feature, fix a bug, or refactor across files | [Work with an agent](#how-you-work-with-an-agent) to find relevant code, make changes, and run tests. |
| Understand a codebase or explore an approach | [Ask questions in chat](/docs/chat/chat-overview.md) to get explanations grounded in your code and discuss alternatives. |
| Research a complex change before editing | [Plan with an agent](/docs/agents/run/planning.md) and review the proposed approach before implementation. |
| Make a focused edit without leaving your code | Use [inline chat](/docs/chat/inline-chat.md) to describe the change in the editor. |
| Get code suggestions while you type | Use [inline suggestions](/docs/editing/ai-powered-suggestions.md) for completions and suggested next edits. |
| Complete a common development task | Use [smart actions](/docs/editing/copilot-smart-actions.md) for tasks such as generating a commit message or explaining selected code. |

You use chat both to ask questions and to direct agents. You can ask **Agent** to propose an approach before editing, or select **Plan**, where available, for a dedicated planning workflow.

## How you work with an agent

An agent uses a language model to reason about your request and [tools](/docs/agents/concepts/tools.md) to act on your development environment. It gathers [context](/docs/agents/concepts/context.md), such as code, error messages, and test results, rather than relying only on the words in your prompt.

For example, ask an agent to fix a failing test while preserving the intended behavior:

1. The agent finds the test and reads the related code to understand the failure.
1. It edits the implementation or tests based on the task and your constraints.
1. It runs the tests, inspects the results, and revises its changes if needed.
1. You review the diff and validation results, verify the behavior yourself, and decide which changes to keep.

This repeated reasoning, action, and validation is the **agent loop**. You can provide more context, redirect the work, or stop the agent along the way. Learn more about [how agents work](/docs/agents/concepts/agents.md).

The conversation and work for a task belong to a **session**. Sessions keep related context and changes together so you can return to a task or manage independent tasks separately. Learn about [sessions and handoff](/docs/agents/concepts/sessions.md).

## Ways to work with agents

Start with the interface that fits how you want to work. You can continue supported sessions between the {% data variables.copilot.chat_view %} and the {% data variables.copilot.agents_window %}, rather than choosing one interface for every task.

### Work alongside your code

Use the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) when you're working in an open project. Keep the conversation beside your editor, inspect changes as they happen, and use the debugger, terminal, and tests as part of the same workflow. This is the starting point for the agents quickstart.

![Screenshot showing the {% data variables.copilot.chat_view %} with the sessions list, conversation, and chat input.](images/agents-overview/chat-view-expanded.png)

### Delegate and manage tasks

Use the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) (Preview) when your focus is assigning tasks and reviewing their results. Manage multiple sessions across projects, follow their progress, and open the editor when you want to work directly with the code.

![Screenshot showing how to start a new agent session by selecting New at the top of the sidebar in the {% data variables.copilot.agents_window %}.](images/agents-overview/agents-window-hero.png)

### Other ways to access agents

For terminal-based work, explore [{% data variables.copilot.copilot_cli %}](/docs/agents/run/agent-harnesses.md#use-copilot-cli-from-the-terminal). For work away from your current editor, explore [cloud agents that return pull requests](/docs/agents/run/agent-harnesses.md#start-a-cloud-session) or [remote sessions and browser access](/docs/agents/run/remote-agent-sessions.md). The [{% data variables.copilot.github_copilot_app %}](https://github.com/features/copilot) provides a dedicated desktop experience outside {% data variables.product.prodname_vscode_shortname %}.

## Choose your models, agents, and tools

Start with the quickstart's recommended setup, then adjust individual choices to fit your task and project:

* **Models**: choose a [language model](/docs/agents/concepts/language-models.md) based on the reasoning capabilities, speed, and cost your task requires.
* **Agent harnesses**: use a supported [agent harness](/docs/agents/run/agent-harnesses.md), such as {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_anthropic_claude %}, or {% data variables.product.prodname_openai_codex %}, for its tools and workflows. The harness connects a model to tools and manages the session, so changing harnesses is different from switching models.
* **Model access**: use models from your {% data variables.product.prodname_copilot %} plan, [bring your own API key (BYOK)](/docs/agent-customization/language-models.md#bring-your-own-language-model-key), or connect a supported local model. These options let you use an existing model provider account or keep model processing local.
* **Tools and customization**: share your coding standards and test commands through [project instructions](/docs/agents/guides/customize-copilot-guide.md). Connect external systems through [Model Context Protocol (MCP) servers](/docs/agent-customization/mcp-servers.md), package recurring tasks as [agent skills](/docs/agent-customization/agent-skills.md), or install [plugins](/docs/agent-customization/agent-plugins.md) that bundle tools and workflows. Compare the options in [agent customization concepts](/docs/agents/concepts/customization.md).

Available models, tools, and customizations depend on the selected harness, your account, and your organization's policies.

Where tools run and where the model is hosted are separate choices. An agent can edit files on your machine while sending model requests to a hosted provider.

## Stay in control

AI can produce incorrect code or misunderstand your intent. You remain responsible for deciding which changes reach your codebase.

* **Review before integrating.** Agents can save edits directly to the session folder or worktree. [Review the diff and validate the result](/docs/agents/run/review-code-edits.md) before you commit or merge changes.
* **Control actions and redirect work.** Use [permissions and approvals](/docs/agents/run/approvals.md) to decide which actions require confirmation. You can [steer or stop a request](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running), but stopping doesn't undo completed actions or changes to external services.
* **Understand isolation.** A Git worktree keeps code changes separate, but isn't a security boundary. For file system and network restrictions on agent-run terminal commands, review the [platform-specific sandboxing options](/docs/agents/run/agent-sandboxing.md).

Before using agents on an existing project, review the [recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline). Your organization might also restrict available agents, models, and tools through [enterprise AI policies](/docs/enterprise/ai-settings.md).

## Next steps

* [Complete your first task with an agent](/docs/agents/quickstart.md): build and validate a small app with a recommended starting configuration.
* [Follow the agents tutorial](/docs/agents/agents-tutorial.md): build a portfolio page and learn the agent, editor, browser, and source control workflows.
* [Apply the workflow to your own project](/docs/agents/best-practices.md#apply-the-workflow-to-your-project): choose a bounded task in an existing codebase and review the result.
