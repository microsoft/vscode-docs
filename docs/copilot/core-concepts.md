---
ContentId: d8b3c7f1-2e4a-5b6d-9c0e-1f3a5b7d9e2c
DateApproved: 02/04/2026
MetaDescription: Learn how GitHub Copilot works in VS Code, from language models and context to agents and the agentic loop.
MetaSocialImage: images/shared/github-copilot-social.png
Keywords:
  - copilot
  - AI
  - concepts
  - language model
  - context window
  - agents
  - agentic loop
---

# How AI works in VS Code

GitHub Copilot is an AI assistant powered by large language models. It integrates across VS Code through multiple surfaces, from inline suggestions as you type to autonomous agents that implement entire features. This article explains the core architecture, key concepts, and how all the Copilot features connect. For a hands-on tutorial, see the [Quickstart](/docs/copilot/getting-started.md). For practical tips, see [Best practices](/docs/copilot/copilot-tips-and-tricks.md).

## Agent loop

When you give an AI coding assistant a task, it often follows an agentic loop. This pattern is common across modern AI assistants. In this article, an agent is the system that plans and takes actions, and the [language model](#language-models) generates responses that inform those actions.

The agent decides what to do next based on what it has learned so far: it might read a file to understand how a function works, edit code to fix a bug, then run the tests to check its work. Each tool result feeds back into the agent, informing the next step.

![Diagram showing the agentic loop: User prompt -> Agent reasoning -> Tool calls (read files, edit code, run tests) -> Agent updates based on tool results -> Final output for user review](images/core-concepts/agent-loop.png)

This process typically involves three kinds of actions:

1. **Read and search.** The agent reads files, searches the codebase, and looks up documentation to understand what needs to change.
1. **Edit and execute.** The agent modifies code, runs terminal commands, installs dependencies, or calls external services through tools.
1. **Test and validate.** The agent runs tests, checks for compiler errors, and reviews its own changes. If something is wrong, it continues iterating.

The agent chains these actions together as needed. A simple question might require only reading a few files. A bug fix might involve reading, editing, running tests, reading the failures, editing again, and re-running tests.

Because language model output is probabilistic, the same task can follow slightly different paths in this loop.

You can interrupt at any point to steer the agent in a different direction, provide additional context, or ask it to try a different approach. For more on reviewing changes and managing agent behavior, see [Stay in control](#stay-in-control).

Within each step, VS Code assembles the current context into a prompt and sends it to the language model. The response might be a direct answer, a code edit, or a request to use a tool. Tool results feed back into the next prompt, and this cycle continues until the agent produces a final result.

## Language models

VS Code uses large language models (LLMs) to power its AI features. You can choose from multiple models through your GitHub Copilot plan or bring your own models.

Each model has different strengths and weaknesses. Some are optimized for speed and work well for simple completions. Others have larger context windows or better reasoning capabilities, making them ideal for complex tasks. You can switch models at any time, based on your needs for a particular task.

Key characteristics of LLMs:

* **Nondeterministic**: the same prompt can produce different results each time. This is by design and reflects how the model samples from probability distributions.
* **Context-dependent**: the quality of the response depends on the quality and relevance of the context provided in the prompt.
* **Knowledge boundaries**: models are trained on data up to a certain date and might produce outdated or incorrect information for topics beyond their training data. Copilot mitigates this with tools like web search and workspace indexing.

Learn more about [choosing and configuring language models](/docs/copilot/customization/language-models.md).

## Context

Context is everything the model can see when generating a response. It includes the conversation history, file contents from your workspace, tool outputs, custom instructions, and any references you add explicitly.

Context matters because the model can only reason about what it can see. A prompt with relevant files, clear instructions, and focused history produces better results than a vague prompt with no context.

VS Code gathers context automatically and gives you control over what to include:

* **Automatic context**: the file you're editing, your workspace index, git state, and conversation history.
* **Explicit context**: use `#file`, `#codebase`, `#web`, and other [#-mentions](/docs/copilot/chat/copilot-chat-context.md) to point the model at specific information.
* **Persistent context**: [custom instructions](/docs/copilot/customization/custom-instructions.md) let you add project-specific context to chat requests without repeating yourself.

### Context window

The context window is the total amount of information a model can process in a single request. It includes everything: the system prompt, custom instructions, conversation history, file contents, tool outputs, and your current message. Different models have different context window sizes.

When the context window fills up, VS Code automatically summarizes older parts of the conversation to make room. This means important details from early in a long conversation might be compressed or lost.

To work effectively with context window limits:

* **Start new sessions for new tasks.** Each session starts with a fresh context window. Don't reuse a single conversation for unrelated tasks.
* **Be selective with context.** Adding your entire codebase isn't always helpful. Reference specific files that are relevant to the task.
* **Use custom instructions for persistent rules.** Rules you add in [custom instructions](/docs/copilot/customization/custom-instructions.md) are included in every request, so you don't lose them when the conversation is summarized.

### How VS Code assembles context

When you send a message, VS Code builds a language model prompt from multiple sources:

![Diagram showing the context window as a container with seven layers: system instructions, customizations, user message, conversation history, implicit context, explicit references, and tool outputs, with an arrow sending the assembled prompt to the language model.](images/core-concepts/context-assembly.png)

* **System instructions**: built-in guidelines that define the agent's behavior.
* **Customizations**: AI customizations you set up, including custom agents, skills, and custom instructions.
* **User message**: the current message you're sending to the agent.
* **Conversation history**: the messages exchanged so far in the current session.
* **Implicit context**: the file you're editing, your current selection, visible errors, and git state.
* **Explicit references**: files, editor context, web content, and other sources you reference with `#`-mentions.
* **Tool outputs**: results from file reads, terminal commands, codebase search results, and other tool calls during agent sessions.

This assembled prompt is what the model sees. Everything outside of it is invisible to the model. This is why referencing specific files with `#file` produces better results than asking about code the model hasn't seen.

Learn more about [adding context to chat](/docs/copilot/chat/copilot-chat-context.md) and [workspace indexing](/docs/copilot/reference/workspace-context.md).

## Tools

Tools enable the model to interact with your codebase and environment: read and edit files, run terminal commands, search your workspace, interact with VS Code to get debug information or linting errors, and interact with external services. They are the building blocks that make agents autonomous and capable of complex tasks.

The model chooses which tools to use based on your prompt and what it learns along the way. When you ask "fix the failing tests," it might run the test suite, read the error output, search for the relevant source files, edit the code, and run the tests again to verify, chaining multiple tool calls in sequence.

You can extend Copilot's built-in tools with [MCP servers](/docs/copilot/customization/mcp-servers.md) for external services, [agent skills](/docs/copilot/customization/agent-skills.md) for reusable capabilities, and [hooks](/docs/copilot/customization/hooks.md) for lifecycle automation. Learn more about [tools available to agents](/docs/copilot/agents/agent-tools.md).

## Agent types

Agents run in different environments depending on when you need results and how much oversight you want:

* **Local agents** run interactively in VS Code. You see every step and can steer the agent in real time. Best for tasks where you want to stay hands-on.
* **Background agents** run autonomously on your machine. Hand off a task and continue other work while the agent completes it.
* **Cloud agents** run on GitHub's infrastructure. They create branches, implement changes, and open pull requests for your team to review.
* **Third-party agents** connect external AI providers like Anthropic and OpenAI. You can hand off sessions between agent types at any point.

Learn more about [agents and agent sessions](/docs/copilot/agents/overview.md).

## Stay in control

AI-generated output requires review. Copilot includes multiple mechanisms to keep you in control of what changes reach your codebase.

* **Review edits before applying.** Agents show file changes in a diff view. You can review each change, accept or reject individual edits, and modify the code before saving. Learn more about [reviewing code edits](/docs/copilot/chat/review-code-edits.md).

* **Use checkpoints to rewind.** Agent sessions create checkpoints as work progresses. If the agent takes a wrong turn, rewind to a previous checkpoint and try a different approach. Learn more about [checkpoints](/docs/copilot/chat/chat-checkpoints.md).

* **Approve tool calls.** Copilot asks for your approval before running terminal commands or using tools with side effects. You control which tools can run automatically and which require confirmation.

* **Trust boundaries.** VS Code enforces security boundaries around file access, terminal sandboxing, and MCP server interactions. Learn more about [Copilot security](/docs/copilot/security.md).

Always review AI-generated code before committing. Verify that it handles edge cases, follows your project's conventions, and doesn't introduce security issues.

## AI limitations

AI is a powerful tool, but it has important limitations to understand.

**Nondeterminism.** The same prompt can produce different results each time. This means you might get a different code suggestion, explanation, or approach when you ask the same question twice. This is normal and reflects how models sample from probability distributions.

**Incorrect output.** Models can generate code that looks correct but contains bugs, uses deprecated APIs, or doesn't handle edge cases. Always test AI-generated code, especially for logic that affects security, data integrity, or critical flows.

**Knowledge boundaries.** Models are trained on data up to a certain date. They might not know about recent framework versions, newly released APIs, or changes to your project. Use `#web` to give Copilot access to current information, and reference specific files with `#file` to ground responses in your actual code.

**Context limits.** When a conversation grows long, the model loses access to earlier context. If responses start to degrade, start a new session and provide fresh context for the task at hand.

The most effective way to work with AI is to treat its output as a first draft: useful as a starting point, but always requiring your review and judgment.

## Related resources

* [Get started with GitHub Copilot in VS Code](/docs/copilot/getting-started.md)
* [Best practices for using AI in VS Code](/docs/copilot/copilot-tips-and-tricks.md)
* [Using agents in VS Code](/docs/copilot/agents/overview.md)
* [Copilot Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Customize AI for your workflow](/docs/copilot/customization/overview.md)
* [Manage context for AI](/docs/copilot/chat/copilot-chat-context.md)
