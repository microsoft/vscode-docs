---
ContentId: e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b
DateApproved: 4/22/2026
MetaDescription: Learn about agents in VS Code, including the agent loop, agent types, subagents, memory, and planning.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agent loop
- agentic loop
- autonomous
- subagents
- memory
- planning
- local agents
- cloud agents
---

# Agents

An agent is an AI system that autonomously plans and executes coding tasks. You give the agent a high-level goal, and it breaks the goal down into steps, executes those steps with [tools](/docs/copilot/concepts/tools.md), and self-corrects when it hits errors. This article explains the core architecture of agents: the agent loop, agent types, subagents, memory, and planning.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start agents tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## Agent loop

When you give an agent a task, it follows an agentic loop. This pattern is common across modern AI assistants. Within VS Code, an agent is the system that plans and takes actions, and the [language model](/docs/copilot/concepts/language-models.md) generates responses that inform those actions.

At each step, the agent evaluates its progress and picks the next action. It might open a file to understand an API, make an edit, then run a command to verify the change worked. The output of each action becomes input for the next decision.

![Diagram showing the agentic loop: User prompt -> Agent reasoning -> Tool calls (read files, edit code, run tests) -> Agent updates based on tool results -> Final output for user review](../images/concepts/agent-loop.png)

The agent loop typically involves three high-level stages:

1. **Understand.** The agent reads files, searches the codebase, and looks up documentation to understand what needs to change.
1. **Act.** The agent modifies code, runs terminal commands, installs dependencies, or calls external services through [tools](/docs/copilot/concepts/tools.md).
1. **Validate.** The agent runs tests, checks for compiler errors, and reviews its own changes. If something is wrong, it continues iterating.

The agent uses the language model to reason about the best course of action. However, without the ability to interact with the environment, the model is limited to providing generic responses. With tools, the agent issues tool calls at each step to gather information and take actions like reading files, making code changes, running terminal commands, and reaching out to external services.

The agent chains these actions together as needed until it accomplishes the task. Answering a question about your codebase might involve only a few file reads. Implementing a new feature typically loops through editing, running tests, diagnosing failures, and editing again until the tests pass.

Behind the scenes, [VS Code assembles the current context](/docs/copilot/concepts/context.md#how-vs-code-assembles-context) into a prompt and sends it to the language model. The model responds with text, a code edit, or a tool request. When a tool runs, its output is added to the context for the next iteration, and this cycle repeats until the task is complete.

You stay in control throughout the process. Send a new message to redirect the agent, add context, or suggest a different approach. For more on reviewing changes and managing agent behavior, see [Trust and safety](/docs/copilot/concepts/trust-and-safety.md).

### Customize the agent loop

The agent loop is not one-size-fits-all and might differ for each project. There are different options to personalize the agent's behavior:

* A [**custom agent**](/docs/copilot/customization/custom-agents.md) lets you define different personas, each with their own instructions, available tools, language model, and optionally hand off to another agent.
* With [**agent skills**](/docs/copilot/customization/agent-skills.md), you can teach the agent new capabilities for a specific domain or task.
* [**Hooks**](/docs/copilot/customization/hooks.md) run custom commands at specific lifecycle points in the agent loop.

Learn more about [customization concepts](/docs/copilot/concepts/customization.md).

## Agent types

Agents run in different environments depending on when you need results and how much oversight you want. The two key dimensions are *where* the agent runs (your machine or the cloud) and *how* you interact with it (interactively or autonomously in the background).

![Diagram showing the different agent types: Local agents (interactive in VS Code), Background agents (autonomous on your machine), Cloud agents (run on GitHub's infrastructure), and Third-party agents (connect external AI providers).](../images/agents-overview/agent-types-diagram-v3.png)

Learn more about [using agents in VS Code](/docs/copilot/agents/overview.md), including a decision table to help you choose the right agent type for your task.

## Subagents

When working on complex tasks, the main agent can delegate subtasks to subagents. A subagent is an independent AI agent that performs focused work, such as researching a topic or analyzing code, and reports the results back to the main agent.

The primary benefit of subagents is context optimization. Without subagents, every file read, search result, and intermediate step during research accumulates in the main agent's [context window](/docs/copilot/concepts/language-models.md#context-window), potentially crowding out important information. Subagents perform their work in a separate context window and return only a summary, keeping the main conversation focused on the task at hand.

Key characteristics of subagents:

* **Context isolation**: each subagent runs in its own context window. It doesn't inherit the main agent's conversation history or instructions. It receives only the task prompt.
* **Synchronous execution**: the main agent waits for subagent results before continuing, because subagent findings typically inform the next step.
* **Parallel execution**: VS Code can spawn multiple subagents in parallel for tasks like analyzing security, performance, and accessibility simultaneously.
* **Focused results**: only the final result is returned to the main agent, keeping the main context focused and reducing token usage.

For example, the built-in [Plan agent](#planning) uses subagents to perform research and analysis before creating an implementation plan. Each subagent works autonomously and returns only its findings.

Learn more about [using subagents](/docs/copilot/agents/subagents.md).

## Memory

Agents use memory to retain context across conversations. Rather than starting from scratch each session, agents recall your preferences, apply lessons from previous tasks, and build up knowledge about your codebase over time.

VS Code supports two complementary memory systems:

* **Memory tool**: a built-in tool that stores notes locally on your machine, organized in three scopes:
    * **User memory** (`/memories/`): persists across all workspaces and conversations. The first 200 lines are automatically loaded into every session.
    * **Repository memory** (`/memories/repo/`): scoped to the current workspace, persists across conversations.
    * **Session memory** (`/memories/session/`): scoped to the current conversation, cleared when it ends.
* **Copilot Memory**: a GitHub-hosted memory system that captures repository-specific insights across Copilot surfaces (coding agent, code review, CLI). Shared across GitHub Copilot beyond VS Code.

Learn more about [memory in VS Code agents](/docs/copilot/agents/memory.md).

## Planning

For complex tasks, jumping straight into code generation can lead to incomplete implementations or wrong architectural decisions. The built-in Plan agent collaborates with you to research the task and create a detailed implementation plan before any code changes are made. This ensures requirements are understood, edge cases are identified, and you agree on the approach before the agent starts writing code.

The plan agent uses a 4-phase iterative workflow:

1. **Discovery**: research the task using read-only tools and codebase analysis.
1. **Alignment**: ask clarifying questions to resolve ambiguities.
1. **Design**: draft a structured implementation plan.
1. **Refinement**: iterate on the plan based on your feedback.

The Plan agent does not make code changes until the plan is reviewed and approved. Once approved, you can hand off the plan to the default agent or save it for further refinement.

Learn more about [planning with agents](/docs/copilot/agents/planning.md).

## Related resources

* [Using agents in VS Code](/docs/copilot/agents/overview.md)
* [Tools](/docs/copilot/concepts/tools.md)
* [Context](/docs/copilot/concepts/context.md)
* [Trust and safety](/docs/copilot/concepts/trust-and-safety.md)
