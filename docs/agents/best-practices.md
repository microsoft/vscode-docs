---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 9/16/2026
MetaDescription: Use AI effectively in {% data variables.product.prodname_vscode_shortname %} by choosing the right workflow, writing focused prompts, and reviewing results.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Best practices for using AI in {% data variables.product.prodname_vscode_shortname %}

This article covers good practices for using AI in {% data variables.product.prodname_vscode %}. Start with a bounded task, provide relevant context, and verify the result. Configure custom instructions, agents, or tools later when you have a recurring need.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="How AI works in {% data variables.product.prodname_vscode_shortname %}">
Learn about the agent loop, context window, tools, and other core concepts.

* [Read about core concepts](/docs/agents/concepts/agents.md)

</div>

## Pick the right tool for the task

AI in {% data variables.product.prodname_vscode_shortname %} offers several interaction modes. Choosing the right one for the task at hand saves time and produces better results.

| Tool | Best for | Example |
|------|----------|---------|
| [Inline suggestions](/docs/editing/ai-powered-suggestions.md) | Staying in the flow while writing code | Inline suggestions, variable names, boilerplate |
| [Inline chat](/docs/chat/inline-chat.md) | Targeted, in-place edits without switching context | Refactoring a function, adding error handling |
| [Agents](/docs/agents/overview.md) | Multi-file changes that require autonomous planning and tool use | Implementing a feature end-to-end |
| [Plan](/docs/agents/run/planning.md) | Structured planning before implementation | Designing an architecture or migration strategy |
| [Smart actions](/docs/editing/copilot-smart-actions.md) | Built-in, specialized one-step tasks | Generating commit messages, fixing errors, renaming symbols |

## Apply the workflow to your project

When you're ready to use an agent in your own project, start with one bounded task in a project you know:

1. Open a trusted project. Commit or stash unrelated work so that you can distinguish the agent's edits from your own changes.

1. Choose a small task and define an observable result. If the approach is unclear, ask questions in chat or use the [Plan role](/docs/agents/run/planning.md) before implementation.

1. Provide the relevant files, errors, constraints, and existing test commands. For example:

    ```prompt
    Add empty-state text to the results view. Limit changes to the existing
    view and its tests. Follow the current component patterns, run the
    existing tests for this area, and summarize the behavior you verified.
    ```

1. Use the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md), the **Copilot** session target, the **Agent** role, and **Manual permissions** for an interactive first task.

1. Review each approval request. When the agent finishes, inspect every changed file and run the relevant tests yourself.

1. Commit only the intended changes. If the result is wrong, provide focused feedback or [restore a checkpoint](/docs/agents/run/review-code-edits.md#restore-a-checkpoint).

Checkpoints restore affected workspace files and chat history, but they don't reverse completed terminal commands, deployments, or changes to external services. Use Git and the external service's recovery controls for those effects.

## Write effective prompts

The quality of AI responses depends on the clarity and specificity of your prompt. These techniques help you get better results.

* **Be specific about inputs, outputs, and constraints.** State the programming language, frameworks, and libraries you want to use. Describe expected behavior or include example input and output.

    ```prompt
    Write a TypeScript function that validates email addresses.
    Return true for valid addresses, false otherwise. Don't use regex.
    Example: validateEmail("user@example.com") returns true
    Example: validateEmail("invalid") returns false
    ```

* **Break down complex tasks.** Instead of asking for an entire feature at once, decompose it into smaller, well-scoped steps. This approach produces more reliable results and makes it easier to catch problems early.

* **Include expected output for verification.** Provide test cases, expected results, or acceptance criteria so the AI can verify its own work. This step is one of the highest-leverage things you can do.

    ```prompt
    Implement a rate limiter using the token bucket algorithm.
    Write unit tests that verify: 10 requests/second allowed,
    11th request rejected, bucket refills after 1 second.
    Run the tests after implementing.
    ```

* **Avoid vague prompts.** A prompt like "make this better" gives the AI no direction. Instead, specify what "better" means: "reduce the time complexity" or "add input validation for null values."

* **Iterate with follow-up prompts.** Refine responses by adding constraints or corrections in follow-up messages rather than rewriting the entire prompt.

* **Course-correct early.** If the AI is heading in the wrong direction, [steer it](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running) with a follow-up message to redirect the current request, queue a follow-up request, or stop and send a new prompt.

    For help deciding whether to steer, restore changes, or start fresh, see [Get an agent back on track](/docs/agents/guides/get-agent-back-on-track.md).

* **Tell the AI to ask clarifying questions.** If a task is ambiguous, instruct the AI to ask you questions before proceeding. This leads to more accurate results than guessing at requirements.

* **Parallel tasks.** If you have multiple independent tasks, ask the AI to run them in parallel to save time. For example, "Perform isolated research about X and Y in parallel and summarize the findings."

For more information, find practical [prompt examples](https://docs.github.com/en/copilot/copilot-chat-cookbook) in the GitHub Copilot documentation.

## Provide the right context

The AI responds more accurately when it has relevant context. Use these techniques to point the AI at the right information:

* The AI automatically performs code search to gather relevant context. When your prompt is ambiguous, you can guide the AI by referencing specific files, folders, or symbols in your prompt with `#<file>`, `#<folder>`, or `#<symbol>`.

* To pull information from web pages or GitHub repositories, use `#fetch` to provide the AI with up-to-date information beyond your codebase or use tools from MCP servers like GitHub MCP.

* Reference {% data variables.product.prodname_vscode_shortname %} environment context such as source control changes, terminal output, or test failures to help the AI understand the current state of your project and provide more relevant responses.

* Add images or screenshots to let the AI analyze visual content.

* Use the [integrated browser](/docs/debugtest/integrated-browser.md) to preview your app and manually add page elements, screenshots, or console logs as context.

* Give agents [browser tools](/docs/agents/run/browser-tools.md) to exercise user flows, inspect the result, fix problems, and verify their changes autonomously.

For more information, see [adding context to chat prompts](/docs/chat/copilot-chat-context.md) and [configuring tools](/docs/agents/run/tools.md).

## Choose the right model

Each AI model has different strengths. Some are better at reasoning, others excel at code generation or faster responses. Choosing the right model for your task improves results.

* **Match model to task complexity.** Use fast models for simple completions and boilerplate. Switch to reasoning-optimized models for planning, debugging, or architectural decisions.

* **Use latest models.** Newer models often have improved capabilities. {% data variables.product.prodname_vscode_shortname %} continuously adds support for new models and model versions. Check the [available models](/docs/agent-customization/language-models.md) and use the latest models.

* **Pin models in prompt files and agents.** Specify preferred models in your prompt file or custom agent definitions to ensure the right model is used consistently for specific tasks.

* **Experiment and compare.** If you're not satisfied with a response, try a different model. Different models can produce significantly different results for the same prompt.

* **Adjust thinking effort for reasoning models.** Use the [thinking effort control](/docs/agent-customization/language-models.md#configure-thinking-effort) in the model picker to increase effort for complex tasks or reduce it for simpler ones.

* **Use BYOK for additional control.** Bring your own API key for more model choices and hosting options.

* **Consider credit consumption.** More capable models consume more [AI credits](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) per token. Auto model selection balances quality and cost automatically. For more tips, see [optimize AI credit usage](/docs/agents/guides/optimize-usage.md).

For more information, see [selecting AI models](/docs/agent-customization/language-models.md) and [available models for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Plan first, then implement

For complex changes that span multiple files, separate planning from implementation. This approach prevents the AI from solving the wrong problem and avoids spending [AI credits](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) on code that needs to be thrown away.

1. **Explore.** Use chat for questions or use a subagent to read the relevant code and understand how it works before making changes.
1. **Plan.** Use the [Plan agent](/docs/agents/run/planning.md) to create a structured implementation plan. Review and refine the plan before executing.
1. **Implement.** Switch to agent mode and implement from the plan. Include tests or expected outputs so the agent can verify its own work. Run independent Copilot, Claude, or Codex sessions in parallel, or hand off to a [cloud agent](/docs/agents/run/agent-harnesses.md#start-a-cloud-session) for remote execution.
1. **Review.** Use [checkpoints](/docs/agents/run/review-code-edits.md#edit-requests-and-restore-checkpoints) to review progress, rewind if the agent goes off track, or [request a Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review) on the resulting pull request.

For more information, see the [context engineering workflow](/docs/agents/guides/context-engineering-guide.md).

## Review and verify AI output

AI-generated code can contain bugs, security issues, or subtle logic errors. Always treat AI output as a starting point that needs review.

* **Review before integrating.** Read through generated code before you commit or merge the changes. Pay attention to edge cases, error handling, and assumptions the AI might have made.

* **Run tests after AI changes.** Include test cases in your prompt so the AI can verify its own work. If the AI doesn't run tests automatically, run them yourself before moving on.

* **Use checkpoints to rewind file edits and chat.** If the agent goes off track, use [checkpoints](/docs/agents/run/review-code-edits.md#edit-requests-and-restore-checkpoints) to restore affected workspace files and chat history. Checkpoints don't reverse completed commands or changes to external services.

* **Check for security issues.** Review AI-generated code for common vulnerabilities such as injection flaws, hardcoded secrets, or missing input validation. Avoid pasting credentials or sensitive data into prompts.

For more information, see [GitHub Copilot security](/docs/agents/run/security.md) and the [GitHub Copilot Trust Center](https://copilot.github.trust.page/faq).

## Choose the right agent harness

When working with agents, choose the harness that matches your task and workflow. Each harness offers different provider capabilities, tools, and execution environments.

* **Use Copilot for day-to-day coding.** Copilot runs tools on your machine with access to your workspace and run-time context. It is a good default for most coding tasks. Tool execution location is separate from where the selected language model runs.

* **Use Claude or Codex for provider-specific capabilities.** These harnesses also run tools on your machine and provide their own SDK capabilities through the same {% data variables.product.prodname_vscode_shortname %} session experience.

* **Use the Cloud target for team collaboration.** [Cloud sessions](/docs/agents/run/agent-harnesses.md#start-a-cloud-session) run remotely and create pull requests, making them well suited to tasks that benefit from team review or when you want to assign a GitHub issue directly to an agent.

* **Run parallel sessions for independent tasks.** Start multiple Copilot, Claude, Codex, or cloud sessions to work on unrelated tasks simultaneously. Monitor them from the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list).

* **Hand off when another target better fits the next step.** Change the session target to [hand off](/docs/agents/run/agent-harnesses.md#hand-off-a-session) while preserving the conversation history and context.

For more information, see [choosing an agent harness](/docs/agents/run/agent-harnesses.md) and the [agentic coding tutorial](/docs/agents/agents-tutorial.md).

## Optimize your project for AI

Project customization is optional. Add it when you have conventions, project context, or workflows that the AI can't reliably infer from your code. Concise customization can also help [optimize AI credit usage](/docs/agents/guides/optimize-usage.md) by reducing repeated context gathering, corrections, and retries.

{% data variables.product.prodname_vscode_shortname %} supports several mechanisms to configure AI behavior for your project. Enter `/init` in chat to generate a starter configuration.

| Mechanism | Best for | Get started |
|-----------|----------|-------------|
| [Custom instructions](/docs/agent-customization/custom-instructions.md) | Project-wide coding standards and architectural context | Type `/init` to generate always-on instructions for your project |
| [Custom agents](/docs/agent-customization/custom-agents.md) | Specialized workflows or personas (TDD, security audit) | Type `/create-agent <description>` to generate a custom agent |
| [Skills](/docs/agent-customization/agent-skills.md) | Domain-specific capabilities (testing, deployment) | Type `/create-skill <description>` to generate a skill |
| [Tools and MCP servers](/docs/agents/run/tools.md) | Connecting to external systems (databases, APIs, CLIs) | Configure in `mcp.json` |

Tips for effective project configuration:

* **Keep instruction files concise.** They load on every chat interaction. Focus on information the AI can't infer from code, such as non-default conventions, architectural decisions, or environment setup.
* **Scope instructions with `applyTo` patterns.** Enter `/instructions` to create language-specific or folder-specific instruction files instead of putting everything in one file.
* **Limit enabled tools.** Fewer active tools means faster, more relevant responses. Enable tools only when the task needs them.
* **Exclude generated and noisy files from search.** Configure `setting(search.exclude)` and `setting(files.exclude)` so agent text search and grep stay focused on source code. See [improve agent search with exclusion settings](/docs/agents/reference/workspace-context.md#improve-agent-search-with-exclusion-settings).

For full setup details, see [Customize agent behavior in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/overview.md).

## Manage context and sessions

AI responses might degrade as the conversation fills with irrelevant context. Manage your sessions proactively.

* **Start new sessions for unrelated tasks.** Don't keep piling unrelated questions into one conversation. Context pollution reduces response quality and wastes tokens on irrelevant history.

* **Remove irrelevant history.** Delete past questions and responses that are no longer relevant, or start a fresh session.

* **Compact context.** Use [/compact](/docs/agents/run/sessions/manage-sessions.md#compact-conversation-context) and provide instructions to selectively compact the context and retain only the most relevant information. Compacting reduces the tokens sent with each subsequent request, which helps [manage AI credit usage](/docs/agents/guides/optimize-usage.md).

* **Verify cache performance.** Keep the early parts of your prompt stable across turns to reuse the prompt cache and reduce cost and latency. Use the [Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) to check cache hit rates and find where the cache breaks.

* **Use subagents for investigation.** Hint the AI to perform research and exploration in isolation by using [subagents](/docs/agents/run/subagents.md) so the findings don't clutter your main context.

* **Choose the right session type.** Use local sessions for quick tasks on your current code that need your immediate attention, background tasks for tasks that can run locally and isolated from your main context, or cloud sessions that can benefit from team-collaboration.

* **Scale with parallel sessions.** Run multiple sessions in parallel for independent tasks to save time and keep contexts separate. You can have multiple sessions running at once, across local, background, and cloud environments, and switch between them via the [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list) in {% data variables.product.prodname_vscode_shortname %}.

* **Fork instead of re-prompting.** Use [`/fork`](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session) to explore alternatives without losing context, instead of starting over and re-establishing context from scratch.

For more information, see [session management](/docs/agents/run/sessions/manage-sessions.md), [workspace indexing](/docs/agents/reference/workspace-context.md), and [optimize AI credit usage](/docs/agents/guides/optimize-usage.md).

## Optimize AI credit usage

Many of the practices in this article also help you control cost. More capable models, large contexts, and throwaway work all consume [AI credits](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs). A few levers have the biggest impact:

* **Match the model to the task.** Use faster, cheaper models for simple work and reserve premium models for planning, debugging, and architectural decisions. Auto model selection balances quality and cost for you.

* **Keep context lean.** Send only relevant context, [compact](/docs/agents/run/sessions/manage-sessions.md#compact-conversation-context) long conversations, and start fresh sessions for unrelated tasks to avoid paying for irrelevant history on every request.

* **Plan before you implement.** Separating planning from implementation avoids spending credits on code you throw away.

For a complete set of techniques, see [optimize AI credit usage](/docs/agents/guides/optimize-usage.md).

## Work with large codebases

Copilot is designed to work effectively with large, complex, and multi-root workspaces. Use these practices to get the best results at scale.

* **Use workspace indexing.** {% data variables.product.prodname_vscode_shortname %} automatically indexes your project using semantic search, language intelligence, and GitHub's code search for deep cross-file reasoning. This works for both small projects and large enterprise codebases. For large repositories, use [remote indexing](/docs/agents/reference/workspace-context.md#semantic-index-sources) for fast, comprehensive results across your repository and related repositories on GitHub.

* **Scope work with multi-root workspaces.** For monorepos or projects with multiple services, use [multi-root workspaces](/docs/editing/workspaces/multi-root-workspaces.md) to give the AI clear boundaries and focused context.

* **Provide project-level instructions.** Use [custom instructions](/docs/agent-customization/custom-instructions.md) to describe your project's architecture, module boundaries, and conventions that the AI can't infer from code alone. This gives the AI the context it needs for architecture-level changes.

* **Run parallel sessions for independent changes.** Break large tasks into independent subtasks and run them in [parallel sessions](/docs/agents/run/sessions/manage-sessions.md#sessions-list), each focused on a different area of the codebase.

* **Use the Plan agent for cross-cutting changes.** For changes that span many files or modules, start with the [Plan agent](/docs/agents/run/planning.md) to create a structured implementation plan before executing.

For more information, see [workspace context](/docs/agents/reference/workspace-context.md) and [agents](/docs/agents/overview.md).

## Related resources

* [Context engineering guide](/docs/agents/guides/context-engineering-guide.md)
* [Optimize AI credit usage](/docs/agents/guides/optimize-usage.md)
* [Customize agent behavior in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/overview.md)
* [Cheat sheet](/docs/agents/reference/ai-features-cheat-sheet.md)
* [GitHub Copilot security](/docs/agents/run/security.md)
* [Best Practices for using GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) in the GitHub Copilot documentation
