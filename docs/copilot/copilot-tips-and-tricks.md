---
ContentId: 58ea6755-9bfa-42c2-a4c8-ff0510f9c031
DateApproved: 02/06/2025
MetaDescription: Best practices for getting the most out of GitHub Copilot in VS Code, from writing prompts to configuring your project for AI.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Best practices for using AI in VS Code

This article covers proven practices for getting the most out of using AI in Visual Studio Code. Each section provides actionable guidance with links to deeper documentation.

## Set up your project for AI

Custom instructions tell the AI about your team's coding standards, preferred patterns, and project-specific context. This approach reduces repetitive prompting and improves the consistency of generated code.

To get started:

1. Enter `/init` in the chat input to generate a `copilot-instructions.md` or `AGENTS.md` file tailored to your project structure.

1. Edit the generated file to add or refine instructions.

1. For language-specific or framework-specific rules, create additional `.instructions.md` files with `applyTo` glob patterns by using the **Chat: New Instructions File** command.

**Write effective instructions:**

* Keep instructions concise. If the instructions file is too long, the AI ignores rules. Include reasoning behind non-obvious rules so the AI can apply them in new contexts.
* Show preferred and avoided patterns with short code examples.
* Skip rules that your linter or formatter already enforces.
* Prune regularly. If the AI already follows a rule without the instruction, remove it.

For more information, see [custom instructions](/docs/copilot/customization/custom-instructions.md) and the full [customization overview](/docs/copilot/customization/overview.md).

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

* **Iterate with follow-up prompts.** Refine responses by adding constraints or corrections in follow-up messages rather than rewriting the entire prompt.

* **Avoid vague prompts.** A prompt like "make this better" gives the AI no direction. Instead, specify what "better" means: "reduce the time complexity" or "add input validation for null values."

For more information, see [prompt engineering](/docs/copilot/guides/prompt-engineering-guide.md) and find practical [prompt examples](https://docs.github.com/en/copilot/copilot-chat-cookbook) in the GitHub Copilot documentation.

## Provide the right context

The AI responds more accurately when it has relevant context. Use these techniques to point the AI at the right information:

* Use `#codebase` to explicitly instruct the AI to search your workspace for relevant code.
* Reference specific files, folders, or symbols in your prompt with `#<file>`, `#<folder>`, or `#<symbol>`. Or, use drag and drop.
* Use `#fetch` to pull content from a web page, or `#githubRepo` to search a GitHub repository.
* Add problems, test failures, or terminal output for scenario-specific context.
* Add images or screenshots to let the AI analyze visual content.
* Use the [integrated browser](/docs/debugtest/integrated-browser.md) to preview your app and select page elements to use as context.
* Add relevant tools by using **Configure Tools** in chat.

For more information, see [adding context to chat prompts](/docs/copilot/chat/copilot-chat-context.md) and [configuring tools](/docs/copilot/agents/agent-tools.md).

## Choose the right model

* VS Code supports multiple AI models. Choose the model that fits your task by using the model picker in the chat input field.
* Use BYOK for more control over model selection and hosting options.

For more information, see [selecting AI models](/docs/copilot/customization/language-models.md) and [available models for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat).

## Plan first, then implement

For complex changes that span multiple files, separate planning from implementation. This approach prevents the AI from solving the wrong problem.

1. **Explore.** Use ask mode or a subagent to read the relevant code and understand how it works before making changes.
1. **Plan.** Use the [Plan agent](/docs/copilot/agents/planning.md) to create a structured implementation plan. Review and refine the plan before executing.
1. **Implement.** Switch to agent mode and implement from the plan. Include tests or expected outputs so the agent can verify its own work.
1. **Review.** Use [checkpoints](/docs/copilot/chat/chat-checkpoints.md) to review progress and rewind if the agent goes off track.

For more information, see the [context engineering workflow](/docs/copilot/guides/context-engineering-guide.md).

## Manage context and sessions

AI responses might degrade as the conversation fills with irrelevant context. Manage your sessions proactively.

* **Start new sessions for unrelated tasks.** Don't keep piling unrelated questions into one conversation. Context pollution reduces response quality.
* **Remove irrelevant history.** Delete past questions and responses that are no longer relevant, or start a fresh session.
* **Use subagents for investigation.** Delegate research and exploration to [subagents](/docs/copilot/agents/subagents.md) so the findings don't clutter your main context.
* **Use workspace indexing.** For GitHub repositories, enable the [remote index](/docs/copilot/reference/workspace-context.md) for fast, accurate code search across your entire codebase. For non-GitHub repos, a local index is created automatically.
* **Course-correct early.** If the AI is heading in the wrong direction, [steer it with a follow-up message](/docs/copilot/chat/chat-sessions.md#send-messages-while-a-request-is-running) to redirect the current request, queue a corrective prompt for after the current response completes, or stop and send a new prompt immediately.

For more information, see [session management](/docs/copilot/chat/chat-sessions.md) and [workspace indexing](/docs/copilot/reference/workspace-context.md).

## Customize with reusable primitives

Commit reusable customization files to your repository so your entire team benefits from consistent AI behavior.

* Save task-specific prompts with context and instructions in [prompt files](/docs/copilot/customization/prompt-files.md) (`.prompt.md`). Trigger them like slash commands by typing `/` followed by the prompt name (for example, `/security-review`).
* Define specialized AI personas with scoped tool access by creating [custom agents](/docs/copilot/customization/custom-agents.md) (`.agent.md`). Use them for constrained workflows like code review, security audit, or planning.
* Chain agents into manual workflows with handoffs or automate them with [Agent Skills](/docs/copilot/customization/agent-skills.md) for end-to-end automation of complex processes.
* Use [subagents](/docs/copilot/agents/subagents.md) for isolated research that doesn't pollute main context.
* Teach the AI domain-specific procedures (testing, deployment, debugging) with [Agent Skills](/docs/copilot/customization/agent-skills.md) (`SKILL.md`). Include scripts, examples, and reference docs alongside your instructions.
* Write specific `description` in the Agent Skill YAML frontmatter that states both what the skill does and when to use it. The AI uses this field to decide whether to load the skill.

Browse community skills in the [awesome-copilot](https://github.com/github/awesome-copilot) repository.

## Related resources

* [Prompt engineering guide](/docs/copilot/guides/prompt-engineering-guide.md)
* [Context engineering guide](/docs/copilot/guides/context-engineering-guide.md)
* [Customization overview](/docs/copilot/customization/overview.md)
* [Cheat sheet](/docs/copilot/reference/copilot-vscode-features.md)
* [Best Practices for using GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) in the GitHub Copilot documentation
