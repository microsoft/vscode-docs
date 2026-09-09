---
ContentId: e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b
DateApproved: 9/9/2026
MetaDescription: Understand how agents in {% data variables.product.prodname_vscode_shortname %} use models, context, and tools to complete coding tasks.
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
- "{% data variables.copilot.copilot_cloud_agent_short %}s"
- remote agent sessions
- agent host protocol
---

# Understand AI agents

An agent is an AI system that uses a language model and [tools](/docs/agents/concepts/tools.md) to complete a goal on your behalf. A language model generates responses based on the information in a prompt. An agent goes further by gathering context, taking actions in your development environment, evaluating the results, and repeating these steps as needed.

You choose the goal, control which actions require approval, and review the resulting changes. This article explains how the agent loop works and introduces the sessions, planning, subagents, memory, and customizations that support agentic work.

For an overview of what you can do with agents in {% data variables.product.prodname_vscode_shortname %} and where to work with them, see [Build with agents in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/overview.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Complete a short quickstart to create and validate an app with an agent in {% data variables.product.prodname_vscode_shortname %}.

* [Start the agents quickstart](/docs/agents/quickstart.md)

</div>

## How the concepts fit together

The core concepts work together each time you send a request:

1. **Request:** You describe a goal and provide any requirements or constraints.
1. **Context and reasoning:** {% data variables.product.prodname_vscode_shortname %} assembles relevant [context](/docs/agents/concepts/context.md), such as files and conversation history. A [language model](/docs/agents/concepts/language-models.md) reasons over that information and determines the next action.
1. **Tool action:** The agent uses [tools](/docs/agents/concepts/tools.md) to gather more information or act on your environment, such as reading a file, editing code, or running a command.
1. **Validation:** The result of the tool call returns to the model as context. The agent evaluates its progress and decides whether to take another action.
1. **Review:** When the task is complete, you review the response, code changes, and validation results.

The repeated reasoning, action, and validation steps form the **agent loop**. A [session](/docs/agents/concepts/sessions.md) keeps the conversation and task state together. An [agent harness](/docs/agents/concepts/agent-harnesses.md) coordinates the loop, while the execution environment determines where tools run and code changes are made.

## Agent loop

The agent loop enables an agent to work through a task instead of producing a single response. At each step, the agent evaluates its progress and chooses the next action. The output of that action informs the next decision.

![Screenshot showing a diagram of the agentic loop from the user prompt through reasoning, tool calls, updates, and final review.](../images/concepts/agent-loop.png)

For example, when you ask an agent to add validation to a form, the loop typically includes these stages:

1. **Understand:** The agent finds the form, reads related code and tests, and identifies the project's existing validation patterns.
1. **Act:** The agent updates the form and adds or modifies tests.
1. **Validate:** The agent runs the relevant tests and checks for errors. If validation fails, it diagnoses the result, makes another change, and validates again.

Simple questions might require only a few file reads. Larger implementation tasks might repeat the loop many times as the agent edits code, runs tests, and fixes problems.

## Stay in control

An agent can take actions, but you remain responsible for directing the task and deciding which changes to keep. During a session, you can:

* Choose which tools are available and which tool calls require approval.
* Review an approval request before an action runs.
* Send another message to add context or redirect the work.
* Stop the agent if it is taking the wrong approach.
* Review changed files and validation results before you keep the changes.

Learn more about [trust and safety controls](/docs/agents/concepts/trust-and-safety.md).

## Sessions

A session is the unit of work with an agent. It contains one conversation and the context, workspace, changes, and execution state associated with that task.

Sessions are independent, can run in parallel, and are shared across the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). A session can run on your machine or a remote host, and you can hand it off to another agent. Learn more about [sessions and handoff](/docs/agents/concepts/sessions.md).

## Agent harnesses and execution environments

An agent harness is the runtime that coordinates the agent loop. It manages the session, connects the language model to tools, and provides provider-specific capabilities. {% data variables.product.prodname_vscode_shortname %} supports harnesses such as Copilot, Claude, and Codex.

The execution environment is where the harness runs tools and changes code. Depending on the harness and task, this can be your machine, cloud infrastructure, or a remote machine. Learn more about [agent harnesses and execution environments](/docs/agents/concepts/agent-harnesses.md).

## Capabilities that extend agent work

Agents can use additional capabilities for complex tasks and recurring workflows. These capabilities are not required for every request.

### Planning

Every agent decides which action to take next as part of the agent loop. For a complex task, use the built-in Plan agent to research the codebase, clarify requirements, and propose an implementation plan before code changes begin.

The Plan agent uses read-only tools while preparing the plan. After you review and approve the approach, you can hand off the plan to an implementation agent. Learn more about [planning with agents](/docs/agents/run/planning.md).

### Subagents

For complex tasks, the main agent can delegate focused work to subagents. A subagent performs a specific task, such as researching a topic or analyzing part of a codebase, and reports the result to the main agent.

Subagents are useful when independent research would add large amounts of intermediate information to the main agent's [context window](/docs/agents/concepts/language-models.md#context-window). Each subagent works in a separate context window and returns a focused result.

Key characteristics of subagents:

* **Context isolation**: each subagent runs in its own context window and doesn't inherit the main agent's conversation history. It receives the task prompt, applicable instruction files, and the current agent configuration.
* **Parallel execution**: {% data variables.product.prodname_vscode_shortname %} can spawn multiple subagents in parallel for tasks like analyzing security, performance, and accessibility simultaneously.
* **Focused results**: only the final result is returned to the main agent, keeping the main context focused and reducing token usage.

For example, the [Plan agent](#planning) can use subagents to research independent parts of a task before creating a plan.

Learn more about [using subagents](/docs/agents/run/subagents.md).

### Memory

When the memory tool is available, an agent can store notes for use later in the same session or in future sessions. These notes can record preferences, lessons from previous tasks, or information about your codebase. Memory is separate from the conversation context that a session accumulates automatically.

The memory tool stores notes locally on your machine in three scopes:

* **User memory** (`/memories/`): persists across all workspaces and conversations. The first 200 lines are automatically loaded into every session.
* **Repository memory** (`/memories/repo/`): scoped to the current workspace and persists across conversations.
* **Session memory** (`/memories/session/`): scoped to the current conversation and cleared when it ends.

Learn more about [memory in {% data variables.product.prodname_vscode_shortname %} agents](/docs/agents/run/memory.md).

### Customization

You can customize the agent loop for a project or workflow:

* A [**custom agent**](/docs/agent-customization/custom-agents.md) defines instructions, available tools, a language model, and optional handoffs for a specific workflow.
* [**Agent skills**](/docs/agent-customization/agent-skills.md) give an agent instructions and resources for a specialized task.
* [**Hooks**](/docs/agent-customization/hooks.md) run commands at specific points in the agent lifecycle.

Learn more about [customization concepts](/docs/agents/concepts/customization.md).

## Related resources

* [Tools](/docs/agents/concepts/tools.md)
* [Agent harnesses and execution environments](/docs/agents/concepts/agent-harnesses.md)
* [Trust and safety](/docs/agents/concepts/trust-and-safety.md)
