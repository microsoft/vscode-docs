---
ContentId: d8b3c7f1-2e4a-5b6d-9c0e-1f3a5b7d9e2c
DateApproved: 3/4/2026
MetaDescription: Learn how GitHub Copilot works in VS Code, from language models and context to agents and the agentic loop.
MetaSocialImage: images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- concepts
- language model
- context window
- agents
- agentic loop
- autonomous
- multi-file editing
- deep context
- architecture
- semantic search
---

# How AI works in VS Code

Visual Studio Code's built-in AI features are powered by GitHub Copilot and large language models (LLMs). These features span multiple surfaces, from inline suggestions as you type to autonomous agents that implement entire features. This article explains the core architecture, key concepts, and how all the AI features connect. For a hands-on tutorial, see the [Quickstart](/docs/copilot/getting-started.md). For practical tips, see [Best practices](/docs/copilot/best-practices.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## AI features at a glance

VS Code offers AI across a spectrum of interaction surfaces, each suited to different tasks:

* **[Agents](#agents)**: autonomous sessions that follow the full [agent loop](#agent-loop), reading files, executing coordinated changes across multiple files, running commands, and iterating until the task is complete. Agents handle multi-step tasks end-to-end, from implementing features to architecture-level refactoring and framework migrations.
* **[Chat](/docs/copilot/chat/copilot-chat.md)**: a conversational interface where you ask questions, explore ideas, or get explanations. In Ask mode, the model uses read-only tools to answer questions without modifying your code.
* **[Inline chat](/docs/copilot/chat/inline-chat.md)**: a lightweight chat interface that opens directly in the editor for quick, focused edits.
* **[Inline suggestions](/docs/copilot/ai-powered-suggestions.md)**: code suggestions that appear as ghost text while you type. These use specialized completion models and don't involve an agent loop or tools. [Next Edit Suggestions (NES)](/docs/copilot/ai-powered-suggestions.md#next-edit-suggestions) go further by predicting *where* your next edit should happen.
* **[Smart actions](/docs/copilot/copilot-smart-actions.md)**: one-click AI actions integrated into your workflow, like generating commit messages or fixing diagnostics errors.

## Language models

VS Code uses large language models (LLMs) to power its AI features. You can choose from multiple models through your GitHub Copilot plan or bring your own models.

Each model has different strengths and weaknesses. Some are optimized for speed and work well for simple completions. Others have larger context windows or better reasoning capabilities, making them ideal for complex tasks. You can switch models at any time, based on your needs for a particular task. Learn more about [choosing and configuring language models](/docs/copilot/customization/language-models.md).

## Context

Context is everything the model can see when generating a response. It includes the conversation history, file contents from your workspace, tool outputs, custom instructions, and any references you add explicitly.

Context matters because the model can only reason about what it can see. A prompt with relevant files, clear instructions, and focused history produces better results than a vague prompt with no context.

VS Code gathers context automatically and gives you control over what to include:

* **Automatic context**: the file you're editing, your workspace index, git state, and conversation history.
* **Explicit context**: use `#file`, `#codebase`, `#web`, and other [#-mentions](/docs/copilot/chat/copilot-chat-context.md) to point the model at specific information.
* **Persistent context**: [custom instructions](/docs/copilot/customization/custom-instructions.md) let you add project-specific context to chat requests without repeating yourself.

### Context window

The context window is the total amount of information a model can process in a single request. It includes everything: the system prompt, custom instructions, conversation history, file contents, tool outputs, and your current message. Different models have different context window sizes.

When the context window fills up, VS Code automatically summarizes older parts of the conversation to make room. This means important details from early in a long conversation might be compressed or lost. You can also type `/compact` in the chat input to manually trigger compaction at any time, without waiting for the context window to fill up. Optionally, add custom instructions after the command to guide the summary, for example `/compact focus on the API design decisions`.

To work effectively with context window limits:

* **Start new sessions for new tasks.** A [session](/docs/copilot/chat/chat-sessions.md) is an independent conversation with its own context window and history. Each session starts fresh, so don't reuse a single conversation for unrelated tasks.
* **Be selective with context.** Adding your entire codebase isn't always helpful. Reference specific files that are relevant to the task.
* **Use custom instructions for persistent rules.** Rules you add in [custom instructions](/docs/copilot/customization/custom-instructions.md) are included in every request, so you don't lose them when the conversation is summarized.

### How VS Code assembles context

When you send a message, VS Code builds a language model prompt from multiple sources:

![Diagram showing the context window as a container with seven layers: system instructions, customizations, user message, conversation history, implicit context, explicit references, and tool outputs, with an arrow sending the assembled prompt to the language model.](images/core-concepts/context-assembly.png)

* **System instructions**: built-in behavior guidelines.
* **Customizations**: custom agents, skills, and custom instructions.
* **User message**: your current prompt.
* **Conversation history**: previous messages in the session.
* **Implicit context**: active file, selection, visible errors, and git state.
* **Explicit references**: files, web content, and other `#`-mentions.
* **Tool outputs**: results from file reads, terminal commands, and other tool calls.

Everything outside this assembled prompt is invisible to the model. This is why referencing specific files with `#file` produces better results than asking about code the model hasn't seen. Learn more about [adding context to chat](/docs/copilot/chat/copilot-chat-context.md) and [workspace indexing](/docs/copilot/reference/workspace-context.md).

## Tools

Tools are the mechanism that lets the model act on your development environment. VS Code includes built-in tools for reading and writing files, running terminal commands, searching your codebase, and navigating the editor.

Beyond built-in tools, you can extend what the agent can do:

* **[MCP servers](/docs/copilot/customization/mcp-servers.md)**: connect to external services through the Model Context Protocol (MCP), an open standard for giving AI models access to external tools and data sources.
* **[Agent skills](/docs/copilot/customization/agent-skills.md)**: teach the agent domain-specific tasks, like generating API documentation or scaffolding components.
* **[Hooks](/docs/copilot/customization/hooks.md)**: run commands automatically at specific points in the agent loop, like formatting code after every edit.

Learn more about [tools available to agents](/docs/copilot/agents/agent-tools.md).

## Agents

Agents perform complete coding tasks end-to-end. They analyze your project across files, execute coordinated changes, run commands, and adapt based on the results. Whether you're implementing a new feature, performing an architecture-level refactoring, or migrating between frameworks, agents handle the full multi-step workflow autonomously.

For example, imagine you have a failing test. Instead of suggesting a fix, an agent can:

* Read the error message and identify the root cause across multiple files
* Update the relevant code
* Run the tests again to verify the fix works
* Commit the changes

You give an agent a high-level task, and it breaks the task down into steps, executes those steps with [tools](#tools), and self-corrects when it hits errors, following the [agent loop](#agent-loop).

### Agent types

Agents run in different environments depending on when you need results and how much oversight you want:

![Diagram showing the different agent types: Local agents (interactive in VS Code), Background agents (autonomous on your machine), Cloud agents (run on GitHub's infrastructure), and Third-party agents (connect external AI providers).](images/agents-overview/agent-types-diagram-v3.png)

* **[Local agents](/docs/copilot/agents/local-agents.md)** run interactively in VS Code. You see every step and can steer the agent in real time. Local agent sessions use one of three built-in agents: **Agent** for complex coding tasks, **Plan** for creating structured implementation plans, and **Ask** for answering questions about your codebase.
* **[Background agents](/docs/copilot/agents/background-agents.md)** run autonomously on your machine. They use Git worktrees to work isolated from your main workspace, preventing conflicts with your active work. Hand off a task and continue other work while the agent completes it.
* **[Cloud agents](/docs/copilot/agents/cloud-agents.md)** run on GitHub's infrastructure. They create branches, implement changes, and open pull requests for your team to review.
* **[Third-party agents](/docs/copilot/agents/third-party-agents.md)** connect external AI providers like Anthropic and OpenAI. Depending on the provider, third-party agents can run locally or in the cloud.

You can hand off sessions between agent types at any point, and you can run multiple agent sessions in parallel, each focused on a different task. Learn more about [working with agents and agent sessions](/docs/copilot/agents/overview.md).

## Agent loop

When you give an agent a task, it follows an agentic loop. At each step, the agent evaluates its progress and picks the next action. It might open a file to understand an API, make an edit, then run a command to verify the change worked. The output of each action becomes input for the next decision.

![Diagram showing the agentic loop: User prompt -> Agent reasoning -> Tool calls (read files, edit code, run tests) -> Agent updates based on tool results -> Final output for user review](images/core-concepts/agent-loop.png)

The agent loop typically involves three high-level stages:

1. **Understand.** The agent reads files, searches the codebase, and looks up documentation to understand what needs to change.
1. **Act.** The agent modifies code, runs terminal commands, installs dependencies, or calls external services through tools.
1. **Validate.** The agent runs tests, checks for compiler errors, and reviews its own changes. If something is wrong, it continues iterating.

At each step, the agent uses the [language model](#language-models) to reason and issues [tool](#tools) calls to take action. The agent chains these steps until the task is complete, whether that takes a few file reads or many rounds of editing, testing, and fixing.

You stay in control throughout the process. Send a new message to redirect the agent, add context, or suggest a different approach. For more on reviewing changes and managing agent behavior, see [Stay in control](#stay-in-control).

### Customize the agent loop

The agent loop is not one-size-fits-all. You can personalize it with [custom agents](/docs/copilot/customization/custom-agents.md), [agent skills](/docs/copilot/customization/agent-skills.md), [custom instructions](/docs/copilot/customization/custom-instructions.md), and [hooks](/docs/copilot/customization/hooks.md) to optimize the workflow for your project or team. Learn more about [AI customization options](/docs/copilot/customization/overview.md).

## Stay in control

AI-generated output requires review. VS Code includes multiple mechanisms to keep you in control of what changes reach your codebase.

* **Review edits before applying.** Agents show file changes in a diff view. You can review each change, accept or reject individual edits, and modify the code before saving. Learn more about [reviewing code edits](/docs/copilot/chat/review-code-edits.md).

* **Use checkpoints to revert.** Agent sessions create checkpoints as work progresses. If the agent takes a wrong turn, return to a previous checkpoint and try a different approach. Learn more about [checkpoints](/docs/copilot/chat/chat-checkpoints.md).

* **Approve tool calls.** VS Code asks for your approval before running terminal commands or using tools with side effects. You control which tools can run automatically and which require confirmation.

* **Trust boundaries.** VS Code enforces security boundaries around file access, URL access, terminal sandboxing, and MCP server interactions. Learn more about [AI security](/docs/copilot/security.md).

Always review AI-generated code before committing. Verify that it handles edge cases, follows your project's conventions, and doesn't introduce security issues.

## AI limitations

AI is a powerful tool, but it has important limitations to understand.

**Nondeterminism.** The same prompt can produce different results each time. This means you might get a different code suggestion, explanation, or approach when you ask the same question twice. This is normal and reflects how models sample from probability distributions.

**Incorrect output.** Models can generate code that looks correct but contains bugs, uses deprecated APIs, or doesn't handle edge cases. Always test AI-generated code, especially for logic that affects security, data integrity, or critical flows.

**Knowledge boundaries.** Models are trained on data up to a certain date. They might not know about recent framework versions, newly released APIs, or changes to your project. Use `#web` to give Copilot access to current information, and reference specific files with `#file` to ground responses in your actual code.

**Context limits.** When a conversation grows long, the model loses access to earlier context. If responses start to degrade, start a new session and provide fresh context for the task at hand.

**Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to redirect the agent's behavior. This is why VS Code includes [tool approval gates and trust boundaries](#stay-in-control). Learn more about [AI security](/docs/copilot/security.md).

The most effective way to work with AI is to treat its output as a first draft: useful as a starting point, but always requiring your review and judgment.

## Related resources

* [Get started with AI in VS Code](/docs/copilot/getting-started.md)
* [Best practices for using AI in VS Code](/docs/copilot/best-practices.md)
* [Using agents in VS Code](/docs/copilot/agents/overview.md)
