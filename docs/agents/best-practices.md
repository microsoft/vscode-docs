---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 11/11/2026
MetaDescription: Use AI effectively in {% data variables.product.prodname_vscode_shortname %} by choosing the right workflow, writing focused prompts, and reviewing results.
---
# Best practices for using AI in {% data variables.product.prodname_vscode_shortname %}

This article covers good practices for using AI in {% data variables.product.prodname_vscode %}. Start with a bounded task, provide relevant context, and verify the result. The first sections cover that workflow. [Go further with configuration and optimization](#go-further-when-you-need-to) when you have a recurring need.

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

1. In the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md), select **Copilot** from the **Session Target** UI control, select the **Agent** role, and keep **Manual permissions** for an interactive first task.

    Keep the other session defaults for your first task. When you need a different setup, change one option at a time so that you can identify its effect.

1. Review each approval request. When the agent finishes, inspect every changed file and run the relevant tests yourself.

1. Commit only the intended changes. If the result is wrong, [choose a recovery action](/docs/agents/guides/get-agent-back-on-track.md#choose-a-recovery-action), such as providing focused feedback or restoring a checkpoint.

Stopping a request doesn't undo completed actions. Checkpoints restore affected workspace files and chat history, but they don't reverse completed terminal commands, deployments, or changes to external services. Use Git and the external service's recovery controls for those effects.

For step-by-step guides in an existing project, [explore a codebase](/docs/agents/guides/explore-a-codebase.md), [add a feature](/docs/agents/guides/add-a-feature.md), or [refactor without changing behavior](/docs/agents/guides/refactor-safely.md).

## Write effective prompts

The quality of AI responses depends on the clarity and specificity of your prompt. Writing requests with a clear goal, constraints, and relevant context is often called *prompt engineering*. These techniques help you get better results.

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

Adapt the [prompt examples](/docs/agents/guides/prompt-examples.md) for your task, including the multi-turn examples for refining a result. For a video introduction, watch [Core principles of prompt engineering with {% data variables.product.prodname_copilot %}](https://www.youtube.com/watch?v=hh1nOX14TyY).

## Provide the right context

The AI responds more accurately when it has relevant context. Use these techniques to point the AI at the right information:

* The AI automatically performs code search to gather relevant context. When your prompt is ambiguous, you can guide the AI by referencing specific files, folders, or symbols in your prompt with `#<file>`, `#<folder>`, or `#<symbol>`.

* To pull information from web pages or GitHub repositories, use `#fetch` to provide the AI with up-to-date information beyond your codebase or use tools from MCP servers like GitHub MCP.

* Reference {% data variables.product.prodname_vscode_shortname %} environment context such as source control changes, terminal output, or test failures to help the AI understand the current state of your project and provide more relevant responses.

* Add images or screenshots to let the AI analyze visual content.

* Use the [integrated browser](/docs/debugtest/integrated-browser.md) to preview your app and manually add page elements, screenshots, or console logs as context.

* Give agents [browser tools](/docs/agents/run/browser-tools.md) to exercise user flows, inspect the result, fix problems, and verify their changes autonomously.

* [Start a new chat for an unrelated task](/docs/agents/run/sessions/manage-sessions.md#start-a-new-or-related-conversation) instead of carrying irrelevant conversation history into the next request.

For more information, see [adding context to chat prompts](/docs/chat/copilot-chat-context.md) and [configuring tools](/docs/agents/run/tools.md).

## Plan first, then implement

For complex changes that span multiple files, separate planning from implementation. This approach prevents the AI from solving the wrong problem and avoids spending [AI credits](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) on code that needs to be thrown away.

1. **Explore.** Use **Ask** to read the relevant code and understand how it works before making changes.
1. **Plan.** Use the [Plan agent](/docs/agents/run/planning.md) to create a structured implementation plan. Review and refine the plan before executing.
1. **Implement.** Select **Agent** and implement the approved plan. Include tests or expected outputs so the agent can verify its work.
1. **Review.** [Inspect the diff and validation results](/docs/agents/run/review-code-edits.md) before committing. If the result doesn't match the plan, request a focused revision.

## Review and verify AI output

AI-generated code can contain bugs, security issues, or subtle logic errors. Always treat AI output as a starting point that needs review.

* **Review before integrating.** Read through generated code before you commit or merge the changes. Pay attention to edge cases, error handling, and assumptions the AI might have made.

* **Run tests after AI changes.** Include test cases in your prompt so the AI can verify its own work. If the AI doesn't run tests automatically, run them yourself before moving on.

* **Use checkpoints to rewind file edits and chat.** If the agent goes off track, use [checkpoints](/docs/agents/run/review-code-edits.md#edit-requests-and-restore-checkpoints) to restore affected workspace files and chat history. Checkpoints don't reverse completed commands or changes to external services.

* **Check for security issues.** Review AI-generated code for common vulnerabilities such as injection flaws, hardcoded secrets, or missing input validation. Avoid pasting credentials or sensitive data into prompts.

For more information, see [GitHub Copilot security](/docs/agents/run/security.md) and the [GitHub Copilot Trust Center](https://copilot.github.trust.page/faq).

## Go further when you need to

You don't need the following techniques to complete a first task. Use them when a specific problem or recurring workflow calls for more control.

### Choose the right model

Start with **Copilot Fusion** or **Auto** when available. If results, speed, or cost don't meet your needs, compare models on the same representative task rather than changing several options at once.

* Use the [model picker](/docs/agent-customization/language-models.md) to browse available models and their requirements.
* Use [**Compare Models**](/docs/agents/run/compare-models.md) in the {% data variables.copilot.agents_window %} to run the same prompt with multiple models and compare their results side by side.
* For reasoning models, adjust [thinking effort](/docs/agent-customization/language-models.md#configure-thinking-effort-and-context-size) when the task needs more analysis.
* Compare the result and verification evidence alongside [AI credit usage](/docs/agents/guides/optimize-usage.md), not only response speed.

### Choose the right agent harness

Keep the {% data variables.product.prodname_copilot_short %} harness for the workflow above. When you need another provider's tools or account, [compare harness requirements](/docs/agents/run/agent-harnesses.md#requirements-and-setup) before switching. Organization policies can restrict the available choices.

Changing the model doesn't change the harness. Where tools run is another decision: use [remote sessions](/docs/agents/run/remote-agent-sessions.md) for a host you manage, or [cloud sessions](/docs/agents/run/cloud-sandbox-sessions.md) `feature(cloud-sessions)` for managed execution without keeping your own machine online.

### Optimize your project for AI

Add customizations when the agent repeatedly misses a convention or workflow that it can't infer from your code. Run **Chat: Open Customizations** to open the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) for your selected session.

{% data variables.product.prodname_vscode_shortname %} supports several mechanisms to configure AI behavior for your project. Run **Chat: Open Customizations** to open the [Agent Customizations editor](/docs/agent-customization/overview.md#agent-customizations-editor) and create customizations for your selected harness.

| Mechanism | Best for | Get started |
|-----------|----------|-------------|
| [Custom instructions](/docs/agent-customization/custom-instructions.md) | Project-wide coding standards and architectural context | Type `/init` to generate always-on instructions for your project |
| [Custom agents](/docs/agent-customization/custom-agents.md) | Specialized workflows or personas (TDD, security audit) | Select **Agents**, then **New Agent** next to **Workspace** in the Agent Customizations editor |
| [Skills](/docs/agent-customization/agent-skills.md) | Domain-specific capabilities (testing, deployment) | Select **Skills**, then **New Skill** next to **Workspace** in the Agent Customizations editor |
| [Tools and MCP servers](/docs/agents/run/tools.md) | Connecting to external systems (databases, APIs, CLIs) | Configure in `mcp.json` |

Verify one customization on a representative task before adding more. Follow the [project customization guide](/docs/agents/guides/customize-copilot-guide.md) for a before-and-after comparison.

### Manage context and sessions

Choose an approach based on the problem you're solving:

* **A long conversation is losing focus:** [Compact the conversation](/docs/agents/run/sessions/manage-sessions.md#compact-conversation-context), specifying what to retain, or start a fresh chat with a concise summary.
* **You want to compare approaches:** [Fork the conversation](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session) to retain its history. A fork doesn't isolate file changes.
* **Independent tasks need to run in parallel:** Use [separate worktrees](/docs/agents/guides/delegate-two-tasks.md) when their changes must stay separate. Review each result before integrating it.
* **One task needs a focused investigation:** Ask a [subagent](/docs/agents/run/subagents.md#subagents-by-harness) to investigate a bounded question and report back.

### Optimize AI credit usage

If usage is higher than expected, first check task scope, relevant context, and repeated failed attempts. Planning before implementation and correcting the agent early can avoid work you would otherwise discard.

Use the [AI credit usage guide](/docs/agents/guides/optimize-usage.md) to compare cost with result quality. If session metrics indicate low cache reuse, use the [Cache Explorer](/docs/agents/agent-troubleshooting/cache-explorer.md) to investigate it rather than treating cache tuning as a prerequisite for coding.

### Work with large codebases

Start with a bounded behavior or component instead of asking the agent to understand the entire repository. [Workspace context](/docs/agents/reference/workspace-context.md) explains how search and indexing help locate relevant code.

For monorepos or projects with multiple services, use [multi-root workspaces](/docs/editing/workspaces/multi-root-workspaces.md) to scope the workspace, and record non-obvious module boundaries in [project instructions](/docs/agent-customization/custom-instructions.md). [Exclude generated and noisy files from search](/docs/agents/reference/workspace-context.md#improve-agent-search-with-exclusion-settings) to keep searches focused.

## Next steps

* [Find a guide for your next project task](/docs/agents/guides/overview.md#work-on-a-project).
* [Choose a recovery action when an agent gets off track](/docs/agents/guides/get-agent-back-on-track.md#choose-a-recovery-action).
