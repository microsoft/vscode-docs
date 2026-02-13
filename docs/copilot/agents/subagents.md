---
ContentId: 8b3c9f5e-4d2a-6f9b-3e1c-7a8d5f2e9b0c
DateApproved: 02/04/2026
MetaDescription: Learn how to use context-isolated subagents in VS Code to delegate complex tasks to autonomous agents within your chat session.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- subagents
- agents
- context isolation
- copilot
- ai
- context window
- parallel
---

# Subagents in Visual Studio Code

When working on complex tasks, you can delegate subtasks to subagents. A subagent is an independent AI agent that performs focused work, such as researching a topic, analyzing code, or reviewing changes, and reports the results back to the main agent. Because each subagent runs in its own context window, it doesn't add noise to your main conversation. VS Code can also run multiple subagents in parallel to speed up multi-part tasks.

For example, the built-in [Plan agent](/docs/copilot/agents/planning.md) uses subagents to perform research and analysis before creating an implementation plan. Each subagent works autonomously and returns only its findings. The Plan agent synthesizes these findings into a final plan.

By default, subagents use the same model and tools as the main chat session but start with a clean context window. Subagents don't inherit the main agent's instructions or conversation history. They receive only the task prompt you provide. By running a [custom agent](/docs/copilot/customization/custom-agents.md) as a subagent, you can apply specialized behavior, tools, and models for specific tasks.

## How subagent execution works

The following diagram shows how subagents work. The main agent receives your task, delegates subtasks to one or more subagents that each run in their own context window, and then combines the results.

![Diagram that shows the subagent execution flow where the main agent delegates subtasks to subagents running in isolated context windows and receives result summaries back.](../images/subagents/subagent-execution-flow.png)

Subagents are **synchronous**: the main agent waits for subagent results before continuing. This blocking behavior is intentional: subagent findings typically inform the next step of the task. Without the subagent results, the main agent lacks the information it needs to proceed effectively.

However, VS Code can spawn **multiple subagents in parallel**. When you request parallel analysis (for example, "analyze security, performance, and accessibility simultaneously"), VS Code runs those subagents concurrently and waits for all results before the main agent continues.

> [!NOTE]
> Subagents are different from starting a new agent session. A new session creates an entirely separate conversation with no connection to your current task. Subagents maintain the relationship: they do focused work and report back to the main agent, which stays in control of the overall task.

### What the user sees

When a subagent runs, it appears in the chat as a collapsible tool call. By default, the subagent is collapsed and shows:

* The name of the custom agent (if you specify one)
* The currently running tool (for example, "Reading file..." or "Searching codebase...")

Select the subagent tool call to expand it and view the full details, including all tool calls the subagent made, the prompt passed to the subagent, and the returned result.

This visibility gives you control over how much detail you see without cluttering your main conversation with intermediate steps.

## Why use subagents?

Subagents help you manage complex AI-assisted workflows more effectively:

* **Keep main agent context focused**: The main agent's context window accumulates information from every prompt and response. By offloading research, analysis, or implementation tasks to subagents, you prevent context bloat and help the main agent stay focused on orchestrating the overall task.

* **Improve performance with parallel execution**: VS Code can run multiple subagents simultaneously. For example, when implementing a feature, you can research authentication patterns, analyze existing code structure, and review documentation in parallel rather than sequentially.

* **Isolate experimental or exploratory work**: Subagents are ideal for tasks where you want to explore options without committing to a direction. If a subagent's research leads to a dead end, only the final summary affects your main context - not all the intermediate exploration.

* **Apply specialized behavior for specific tasks**: By combining subagents with [custom agents](/docs/copilot/customization/custom-agents.md), you can apply specialized tools, instructions, and models for specific subtasks. For example, use a security-focused custom agent to review code for vulnerabilities, while a documentation agent generates user guides.

* **Reduce token usage and costs**: Because subagents have their own context windows, they don't add their full conversation history to the main agent's context. Only the final result is returned, which can significantly reduce overall token consumption for complex tasks.

## Usage scenarios

The following scenarios illustrate when subagents can improve your AI-assisted development workflow.

<details>
<summary>Research before implementation</summary>

When building a new feature, use a subagent to research best practices, evaluate libraries, or analyze existing patterns in your codebase before the main agent starts implementing:

```prompt
Use a subagent to research OAuth 2.0 implementation patterns for Node.js applications.
Compare passport.js vs auth0 vs custom implementation. Return a recommendation with pros and cons.
```

The main agent receives only the final recommendation, keeping its context clean for the actual implementation work.

</details>

<details>
<summary>Parallel code analysis</summary>

When refactoring or reviewing code, run multiple subagents in parallel to analyze different aspects:

```prompt
Analyze this codebase for refactoring opportunities. Use subagents to:
1. Find duplicate code patterns
2. Identify unused exports and dead code
3. Review error handling consistency
4. Check for security vulnerabilities

Compile the findings into a prioritized action plan.
```

</details>

<details>
<summary>Explore multiple solutions</summary>

When you're uncertain about the best approach, use subagents to explore different options without polluting your main context:

```prompt
I need to implement caching for this API. Run three subagents in parallel to:
1. Design a Redis-based caching solution
2. Design an in-memory caching solution with LRU eviction
3. Design a hybrid approach with tiered caching

Compare the results and recommend the best approach for our use case.
```

</details>

<details>
<summary>Code review with specialized focus</summary>

Use custom agents as subagents to apply different review perspectives:

```prompt
Review the changes in this PR using subagents:
- Run the security-reviewer agent to check for vulnerabilities
- Run the performance-reviewer agent to identify bottlenecks
- Run the accessibility-reviewer agent to verify a11y compliance

Consolidate findings into a single review summary.
```

</details>

## Invoke a subagent

### Agent-initiated vs. user-invoked

Subagents are typically **agent-initiated**, not directly invoked by users in chat. To allow the main agent to invoke subagents, make sure the `runSubagent` tool is enabled.

The main agent decides when context isolation helps. You don't need to manually type "run a subagent" for every task. The pattern works like this:

1. You (or your custom agent's instructions) describe a complex task.
1. The main agent recognizes the part of the task that benefits from isolated context.
1. The agent starts a subagent, passing only the relevant subtask.
1. The subagent works autonomously and returns a summary.
1. The main agent incorporates the result and continues.

You can hint that you want subagent delegation by phrasing your prompt to suggest isolated research or parallel analysis. The main agent will start a subagent, pass the task to it, and receive only the final result.

> [!TIP]
> For consistent subagent behavior, define when to use subagents in your custom agent's instructions rather than prompting for them manually each time.

To optimize subagent performance, clearly define the task and expected output. This helps the subagent focus on the specific goal without passing unnecessary context back to the main agent.

See the [usage scenarios](#usage-scenarios) section for examples of how to structure prompts that invoke subagents.

### Invoke a subagent in a prompt file

To invoke a subagent inside a prompt file, ensure that the `runSubagent` or `agent` tool is included in the `tools` frontmatter property:

```markdown
---
name: document-feature
tools: ['agent', 'read', 'search', 'edit']
---
Run a subagent to research the new feature implementation details and return only information relevant for user documentation.
Then update the docs/ folder with the new documentation.
```

In the prompt instructions, you can then hint the agent to use subagents by suggesting isolated research or parallel analysis for specific subtasks.

## Run a custom agent as a subagent (Experimental)

By default, a subagent inherits the agent from the main chat session and uses the same model and tools. To define specific behavior for a subagent, use a [custom agent](/docs/copilot/customization/custom-agents.md). Custom agents can specify their own model, tools, and instructions. When used as a subagent, these settings override the defaults inherited from the main session.

### Control subagent invocation

You can control how a custom agent can be invoked by using two frontmatter properties:

* `user-invokable`: controls whether the agent appears in the agents dropdown in chat (default is `true`). Set to `false` to create agents that are only accessible as subagents.
* `disable-model-invocation`: prevents the agent from being invoked as a subagent by other agents (default is `false`). Set to `true` when agents should only be triggered explicitly by users.

For example, to create an agent that can only be used as a subagent (not visible in the dropdown):

```markdown
---
name: internal-helper
user-invokable: false
---

This agent can only be invoked as a subagent.
```

> [!NOTE]
> The `infer` property is deprecated. Use `user-invokable` and `disable-model-invocation` instead for more granular control.

To run a custom agent as a subagent, prompt the AI to use a custom or built-in agent for the subagent. For example:

* `Run the Research agent as a subagent to research the best auth methods for this project.`
* `Use the Plan agent in a subagent to create an implementation plan for myfeature. Then save the plan in plans/myfeature.plan.md`

### Restrict which subagents can be used (Experimental)

By default, all custom agents that don't have `disable-model-invocation: true` are available to be used as subagents. If two or more agents have similar names or descriptions, the AI might select an unintended agent.

You can restrict which custom agents can be used as subagents by specifying the `agents` property in the main agent's frontmatter, and providing a list of allowed custom agents.

The `agents` property accepts:

* A list of agent names (for example, `['Edit', 'Search']`) to allow only specific agents
* `*` to allow all available agents (default behavior)
* An empty array `[]` to prevent any subagent use

> [!NOTE]
> Explicitly listing an agent in the `agents` array overrides `disable-model-invocation: true`. This means you can create agents that are protected from general subagent use but still accessible to specific coordinator agents that explicitly allow them.

For example, a test-driven development (TDD) agent should only use the `Red`, `Green`, and `Refactor` agents as subagents. If not restricted, the TDD agent might select a more generic coding agent for implementing the tests instead of the specialized TDD agents.

```markdown
---
name: TDD
tools: ['agent']
agents: ['Red', 'Green', 'Refactor']
---
Implement the following feature using test-driven development. Use subagents to guide the following steps:
1. Use the Red agent to write failing tests
2. Use the Green agent to implement code to pass the tests
3. Use the Refactor agent to improve the code quality
```

## Orchestration patterns

Subagents enable **orchestration patterns** where a coordinator agent delegates work to specialized worker agents. This approach helps you build sophisticated workflows while keeping each agent focused on what it does best.

### Coordinator and worker pattern

A coordinator agent manages the overall task and delegates subtasks to specialized subagents. Each worker agent can have a tailored set of tools. For example, planning and review agents need only read-only access, while the implementer needs edit capabilities.

```markdown
---
name: Feature Builder
tools: ['agent', 'edit', 'search', 'read']
agents: ['Planner', 'Plan Architect', 'Implementer', 'Reviewer']
---
You are a feature development coordinator. For each feature request:

1. Use the Planner agent to break down the feature into tasks.
2. Use the Plan Architect agent to validate the plan against codebase patterns.
3. If the architect identifies reusable patterns or libraries, send feedback to the Planner to update the plan.
4. Use the Implementer agent to write the code for each task.
5. Use the Reviewer agent to check the implementation.
6. If the reviewer identifies issues, use the Implementer agent again to apply fixes.

Iterate between planning and architecture, and between review and implementation, until each phase converges.
```

The worker agents each define their own tool access and can pick a faster or more cost-effective model since they have a narrower focus:

```markdown
---
name: Planner
user-invokable: false
tools: ['read', 'search']
---
Break down feature requests into implementation tasks. Incorporate feedback from the Plan Architect.
```

```markdown
---
name: Plan Architect
user-invokable: false
tools: ['read', 'search']
---
Validate plans against the codebase. Identify existing patterns, utilities, and libraries that should be reused. Flag any plan steps that duplicate existing functionality.
```

```markdown
---
name: Implementer
user-invokable: false
model: ['Claude Haiku 4.5 (copilot)', 'Gemini 3 Flash (Preview) (copilot)']
---
Write code to complete assigned tasks.
```

This pattern keeps the coordinator's context focused on the high-level workflow while each worker agent has a clean context and appropriate permissions for its specific job.

### Multi-perspective code review

Code review benefits from multiple perspectives. A single pass often misses problems that become obvious when you look through a different lens. Use subagents to run each review perspective in parallel, then synthesize the findings.

```markdown
---
name: Thorough Reviewer
tools: ['agent', 'read', 'search']
---
You review code through multiple perspectives simultaneously. Run each perspective as a parallel subagent so findings are independent and unbiased.

When asked to review code, run these subagents in parallel:
- Correctness reviewer: logic errors, edge cases, type issues.
- Code quality reviewer: readability, naming, duplication.
- Security reviewer: input validation, injection risks, data exposure.
- Architecture reviewer: codebase patterns, design consistency, structural alignment.

After all subagents complete, synthesize findings into a prioritized summary. Note which issues are critical versus nice-to-have. Acknowledge what the code does well.
```

This pattern works because each subagent approaches the code fresh, without being anchored by what other perspectives found. In this example, the orchestrator shapes each subagent's focus area through its prompt. This is a lightweight approach that requires no additional agent files.

> [!TIP]
> For more control, each review perspective can be its own custom agent with specialized tool access. For example, a security reviewer might use a security-focused MCP server, while a code-quality reviewer might have access to linting CLI tools. This approach lets each perspective use the best tools for its specific focus.

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md) - Learn about the different types of agents in VS Code
* [Custom agents](/docs/copilot/customization/custom-agents.md) - Create your own AI agents
* [Chat sessions](/docs/copilot/chat/chat-sessions.md) - Manage chat sessions in VS Code
