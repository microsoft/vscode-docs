---
ContentId: a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d
DateApproved: 5/13/2026
MetaDescription: Understand how AI works in VS Code, from inline suggestions to autonomous agents, and how language models, context, and tools fit together.
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

# How AI works in VS Code

Visual Studio Code's built-in AI features are powered by GitHub Copilot and large language models (LLMs). This article explains the concepts behind those features, the building blocks that power them, and how they fit together. Use it to understand *how* AI works in VS Code, so you can make better decisions as you use it.

To learn what you can build with agents, see [Build with agents in VS Code](/docs/agents/overview.md). To start interacting, see [Use chat in VS Code](/docs/chat/chat-overview.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/copilot/getting-started.md)

</div>

## Where AI shows up in VS Code

AI assists you across a spectrum of interaction surfaces that trade off autonomy for control, from autonomous agents that complete whole tasks to suggestions as you type. The same underlying concepts apply across all of them.

* **[Agents](/docs/agents/overview.md)**: autonomous sessions that follow the [agent loop](/docs/agents/concepts/agents.md#agent-loop) to read files, make coordinated changes across your project, run commands, and iterate until a task is complete.
* **[Chat](/docs/chat/chat-overview.md)**: the conversational interface for interacting with agents, asking questions, and assigning tasks.
* **[Inline chat](/docs/chat/inline-chat.md)**: a lightweight chat interface in the editor for quick, focused edits.
* **[Inline suggestions](/docs/editing/ai-powered-suggestions.md)**: code suggestions that appear as ghost text while you type, using specialized completion models without an agent loop.
* **[Smart actions](/docs/editing/copilot-smart-actions.md)**: one-click AI actions in your workflow, like generating commit messages or fixing diagnostics.

## Core concepts

The following articles explain the architecture and building blocks that power these features:

* [Language models](/docs/agents/concepts/language-models.md): the AI models that power all features, including how to choose and configure them.
* [Context](/docs/agents/concepts/context.md): how VS Code assembles information for the model, from your files to conversation history.
* [Tools](/docs/agents/concepts/tools.md): mechanisms that let agents act on your development environment and connect to external services.
* [Agents](/docs/agents/concepts/agents.md): the agent loop, agent types, subagents, memory, and planning.
* [Customization](/docs/agents/concepts/customization.md): how to tailor AI behavior with instructions, prompt files, custom agents, skills, hooks, and plugins.
* [Trust and safety](/docs/agents/concepts/trust-and-safety.md): control mechanisms, AI limitations, and security considerations.

## How the concepts fit together

These building blocks combine each time you send a request. A **language model** does the reasoning. To respond usefully, it needs **context**: VS Code assembles the relevant files, conversation history, and other information and sends it to the model. To act on your environment instead of only answering, the model calls **tools** to read and edit files, run commands, or reach external services. An **agent** ties these together in the agent loop, calling tools and feeding the results back to the model until the task is complete. **Customization** shapes how the agent behaves, and **trust and safety** controls keep you in command of what it can do.

To put these concepts into practice, see [Configure your agent session](/docs/agents/overview.md).

## Related resources

* [Quickstart: Get started with AI in VS Code](/docs/copilot/getting-started.md)
* [Best practices for using AI in VS Code](/docs/agents/best-practices.md)
* [Configure your agent session](/docs/agents/overview.md)
