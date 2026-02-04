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

Subagents in Visual Studio Code provide context isolation and enable you to run tasks in a dedicated context window, separate from the main agent session. This allows you to delegate complex or multi-step tasks to autonomous subagents without affecting the context window of the main chat session and helps it stay focused on the primary task. VS Code can run multiple subagents in parallel to improve overall performance.

By default, subagents use the same agent and model as the main chat session. By running a custom agent as a subagent, you can apply specialized behavior, tools, and models for specific tasks. For example, use a research custom agent as a subagent to gather information and perform research tasks.

<!-- TODO: add a diagram of subagents -->

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

To invoke a subagent in chat, the `runSubagent` tool must be enabled. This tool allows the main agent to delegate tasks to a subagent that operates in an isolated context window.

Hint in your chat prompt that you want to use a subagent to perform a specific task. The main agent will start a subagent, pass the task to it, and receive only the final result.

To optimize the subagent's performance, clearly define the task and expected output in your prompt. This helps the subagent focus on the specific goal without passing unnecessary context to the main agent.

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

## Run a custom agent as a subagent (Experimental)

By default, a subagent inherits the agent from the main chat session and uses the same model and tools. To define specific behavior for a subagent, use a [custom agent](/docs/copilot/customization/custom-agents.md).

### Control subagent invocation

You can control how a custom agent can be invoked using two frontmatter properties:

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

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md) - Learn about the different types of agents in VS Code
* [Custom agents](/docs/copilot/customization/custom-agents.md) - Create your own AI agents
* [Chat sessions](/docs/copilot/chat/chat-sessions.md) - Manage chat sessions in VS Code
