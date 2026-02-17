---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 02/04/2026
MetaDescription: Best practices for getting the most out of GitHub Copilot in VS Code, from writing prompts to configuring your project for AI.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Best practices for using AI in VS Code

This article covers proven practices for getting the most out of using AI in Visual Studio Code. Each section provides actionable guidance with links to deeper documentation.

## Optimize your project for AI

By configuring your project and codebase with AI in mind, you can improve the accuracy of AI responses and ensure the AI follows your team's coding standards and practices.

VS Code supports several mechanisms to configure AI behavior for your project. Enter `/init` in chat to generate a starter configuration.

| Mechanism | Best for | Get started |
|-----------|----------|-------------|
| [Custom instructions](/docs/copilot/customization/custom-instructions.md) | Project-wide coding standards and architectural context | Enter `/init` to generate a base file |
| [Prompt files](/docs/copilot/customization/custom-instructions.md#prompt-files) | Reusable prompts for recurring tasks (reviews, scaffolding) | Enter `/prompts` to manage |
| [Custom agents](/docs/copilot/customization/custom-agents.md) | Specialized workflows or personas (TDD, security audit) | Enter `/agents` to manage |
| [Agent skills](/docs/copilot/customization/agent-skills.md) | Domain-specific capabilities (testing, deployment) | Enter `/skills` to manage |
| [Tools and MCP servers](/docs/copilot/agents/agent-tools.md) | Connecting to external systems (databases, APIs, CLIs) | Configure in `mcp.json` |

Tips for effective project configuration:

* **Keep instruction files concise.** They load on every chat interaction. Focus on information the AI can't infer from code, such as non-default conventions, architectural decisions, or environment setup.
* **Scope instructions with `applyTo` patterns.** Enter `/instructions` to create language-specific or folder-specific instruction files instead of putting everything in one file.
* **Limit enabled tools.** Fewer active tools means faster, more relevant responses. Enable tools only when the task needs them.

For full setup details, see the [customization overview](/docs/copilot/customization/overview.md).

## Pick the right tool for the task

AI in VS Code offers several interaction modes. Choosing the right one for the task at hand saves time and produces better results.

| Tool | Best for | Example |
|------|----------|---------|
| [Inline suggestions](/docs/copilot/ai-powered-suggestions.md) | Staying in the flow while writing code | Code completions, variable names, boilerplate |
| [Ask (chat)](/docs/copilot/chat/copilot-chat.md) | Questions, brainstorming, exploring ideas | "How does authentication work in this project?" |
| [Inline chat](/docs/copilot/chat/inline-chat.md) | Targeted, in-place edits without switching context | Refactoring a function, adding error handling |
| [Agents](/docs/copilot/agents/overview.md) | Multi-file changes that require autonomous planning and tool use | Implementing a feature end-to-end |
| [Plan](/docs/copilot/agents/planning.md) | Structured planning before implementation | Designing an architecture or migration strategy |
| [Smart actions](/docs/copilot/copilot-smart-actions.md) | Built-in, specialized one-step tasks | Generating commit messages, fixing errors, renaming symbols |

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

* **Course-correct early.** If the AI is heading in the wrong direction, [steer it](/docs/copilot/chat/chat-sessions.md#send-messages-while-a-request-is-running) with a follow-up message to redirect the current request, queue a follow-up request, or stop and send a new prompt.

* **Tell the AI to ask clarifying questions.** If a task is ambiguous, instruct the AI to ask you questions before proceeding. This leads to more accurate results than guessing at requirements.

* **Parallel tasks.** If you have multiple independent tasks, ask the AI to run them in parallel to save time. For example, "Perform isolated research about X and Y in parallel and summarize the findings."

For more information, see [prompt engineering](/docs/copilot/guides/prompt-engineering-guide.md) and find practical [prompt examples](https://docs.github.com/en/copilot/copilot-chat-cookbook) in the GitHub Copilot documentation.

## Provide the right context

The AI responds more accurately when it has relevant context. Use these techniques to point the AI at the right information:

* The AI automatically performs code search to gather relevant context. When your prompt is ambiguous, you can guide the AI by referencing specific files, folders, or symbols in your prompt with `#<file>`, `#<folder>`, or `#<symbol>`.

* To pull information from web pages or GitHub repositories, use `#fetch` or `#githubRepo` to provide the AI with up-to-date information beyond your codebase.

* Reference VS Code environment context such as source control changes, terminal output, or test failures to help the AI understand the current state of your project and provide more relevant responses.

* Add images or screenshots to let the AI analyze visual content.

* Use the [integrated browser](/docs/debugtest/integrated-browser.md) to preview your app and select page elements to use as context.

For more information, see [adding context to chat prompts](/docs/copilot/chat/copilot-chat-context.md) and [configuring tools](/docs/copilot/agents/agent-tools.md).

## Choose the right model

Each AI model has different strengths. Some are better at reasoning, others excel at code generation or faster responses. Choosing the right model for your task improves results.

* **Match model to task complexity.** Use fast models for simple completions and boilerplate. Switch to reasoning-optimized models for planning, debugging, or architectural decisions.

* **Pin models in prompt files and agents.** Specify preferred models in your prompt file or custom agent definitions to ensure the right model is used consistently for specific tasks.

* **Experiment and compare.** If you're not satisfied with a response, try a different model. Different models can produce significantly different results for the same prompt.

* **Use BYOK for additional control.** Bring your own API key for more model choices and hosting options.

For more information, see [selecting AI models](/docs/copilot/customization/language-models.md) and [available models for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Plan first, then implement

For complex changes that span multiple files, separate planning from implementation. This approach prevents the AI from solving the wrong problem.

1. **Explore.** Use ask mode or a subagent to read the relevant code and understand how it works before making changes.
1. **Plan.** Use the [Plan agent](/docs/copilot/agents/planning.md) to create a structured implementation plan. Review and refine the plan before executing.
1. **Implement.** Switch to agent mode and implement from the plan. Include tests or expected outputs so the agent can verify its own work.
1. **Review.** Use [checkpoints](/docs/copilot/chat/chat-checkpoints.md) to review progress and rewind if the agent goes off track.

For more information, see the [context engineering workflow](/docs/copilot/guides/context-engineering-guide.md).

## Review and verify AI output

AI-generated code can contain bugs, security issues, or subtle logic errors. Always treat AI output as a starting point that needs review.

* **Review before accepting.** Read through generated code before accepting changes. Pay attention to edge cases, error handling, and assumptions the AI might have made.

* **Run tests after AI changes.** Include test cases in your prompt so the AI can verify its own work. If the AI doesn't run tests automatically, run them yourself before moving on.

* **Use checkpoints to rewind.** If the agent goes off track, use [checkpoints](/docs/copilot/chat/chat-checkpoints.md) to roll back to a known good state instead of trying to fix cascading errors.

* **Check for security issues.** Review AI-generated code for common vulnerabilities such as injection flaws, hardcoded secrets, or missing input validation. Avoid pasting credentials or sensitive data into prompts.

For more information, see [GitHub Copilot security](/docs/copilot/security.md) and the [GitHub Copilot Trust Center](https://copilot.github.trust.page/faq).

## Manage context and sessions

AI responses might degrade as the conversation fills with irrelevant context. Manage your sessions proactively.

* **Start new sessions for unrelated tasks.** Don't keep piling unrelated questions into one conversation. Context pollution reduces response quality.

* **Remove irrelevant history.** Delete past questions and responses that are no longer relevant, or start a fresh session.

* **Use subagents for investigation.** Hint the AI to perform research and exploration in isolation by using [subagents](/docs/copilot/agents/subagents.md) so the findings don't clutter your main context.

* **Choose the right session type.** Use local sessions for quick tasks on your current code that need your immediate attention, background tasks for tasks that can run locally and isolated from your main context, or cloud sessions that can benefit from team-collaboration.

* **Scale with parallel sessions.** Run multiple sessions in parallel for independent tasks to save time and keep contexts separate. You can have multiple sessions running at once, across local, background, and cloud environments, and switch between them via the [Agent Sessions view](/docs/copilot/agents/overview.md#agent-sessions-list) in VS Code.

For more information, see [session management](/docs/copilot/chat/chat-sessions.md) and [workspace indexing](/docs/copilot/reference/workspace-context.md).

## Related resources

* [Prompt engineering guide](/docs/copilot/guides/prompt-engineering-guide.md)
* [Context engineering guide](/docs/copilot/guides/context-engineering-guide.md)
* [Customization overview](/docs/copilot/customization/overview.md)
* [Cheat sheet](/docs/copilot/reference/copilot-vscode-features.md)
* [GitHub Copilot security](/docs/copilot/security.md)
* [Best Practices for using GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) in the GitHub Copilot documentation
