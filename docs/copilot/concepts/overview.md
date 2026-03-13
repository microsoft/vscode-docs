---
ContentId: a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d
DateApproved: 3/9/2026
MetaDescription: Overview of AI features in VS Code, from inline suggestions to autonomous agents, and how they connect.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- concepts
- overview
- agents
- chat
- inline suggestions
- smart actions
---

# AI features in VS Code

Visual Studio Code's built-in AI features are powered by GitHub Copilot and large language models (LLMs). These features span multiple surfaces, from inline suggestions as you type to autonomous agents that implement entire features. This article provides an overview of the AI features and how they connect. For a hands-on tutorial, see the [Quickstart](/docs/copilot/getting-started.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/copilot/getting-started.md)

</div>

## AI features at a glance

VS Code offers AI across a spectrum of interaction surfaces, each suited to different tasks:

* **[Agents](/docs/copilot/agents/overview.md)**: autonomous sessions that follow the full [agent loop](/docs/copilot/concepts/agents.md#agent-loop), reading files, executing coordinated changes across multiple files, running commands, and iterating until the task is complete. Agents handle multi-step tasks end-to-end, from implementing features to architecture-level refactoring and framework migrations.
* **[Chat](/docs/copilot/chat/copilot-chat.md)**: the primary interface for interacting with agents and having multi-turn conversations. Use chat to assign tasks, ask questions, explore ideas, or get explanations. Switch between Agent, Ask, Plan and custom agents depending on your goal.
* **[Inline chat](/docs/copilot/chat/inline-chat.md)**: a lightweight chat interface that opens directly in the editor for quick, focused edits.
* **[Inline suggestions](/docs/copilot/ai-powered-suggestions.md)**: code suggestions that appear as ghost text while you type. These use specialized completion models and don't involve an agent loop or tools. [Next edit suggestions (NES)](/docs/copilot/ai-powered-suggestions.md#next-edit-suggestions) go further by predicting *where* your next edit should happen.
* **[Smart actions](/docs/copilot/copilot-smart-actions.md)**: one-click AI actions integrated into your workflow, like generating commit messages or fixing diagnostics errors.

## Concepts

The following conceptual articles explain the architecture and building blocks that power these AI features:

* [Language models](/docs/copilot/concepts/language-models.md): the AI models that power all features, including how to choose and configure them.
* [Context](/docs/copilot/concepts/context.md): how VS Code assembles information for the model, from your files to conversation history.
* [Tools](/docs/copilot/concepts/tools.md): mechanisms that let agents act on your development environment and connect to external services.
* [Agents](/docs/copilot/concepts/agents.md): the agent loop, agent types, subagents, memory, and planning.
* [Customization](/docs/copilot/concepts/customization.md): how to tailor AI behavior with instructions, prompt files, custom agents, skills, hooks, and plugins.
* [Trust and safety](/docs/copilot/concepts/trust-and-safety.md): control mechanisms, AI limitations, and security considerations.

## Related resources

* [Quickstart: Get started with AI in VS Code](/docs/copilot/getting-started.md)
* [Best practices for using AI in VS Code](/docs/copilot/best-practices.md)
* [Using agents in VS Code](/docs/copilot/agents/overview.md)
