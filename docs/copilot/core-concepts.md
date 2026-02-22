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

GitHub Copilot is an AI assistant powered by large language models. It integrates across VS Code through multiple surfaces, from inline suggestions as you type to autonomous agents that implement entire features. This article explains the core architecture, key concepts, and how all the AI features connect. For a hands-on tutorial, see the [Quickstart](/docs/copilot/getting-started.md). For practical tips, see [Best practices](/docs/copilot/best-practices.md).

## Agent loop

When you give an AI coding assistant a task, it often follows an agentic loop. This pattern is common across modern AI assistants. In this article, an agent is the system that plans and takes actions, and the [language model](#language-models) generates responses that inform those actions.

At each step, the agent evaluates its progress and picks the next action. It might open a file to understand an API, make an edit, then run a command to verify the change worked. The output of each action becomes input for the next decision.

![Diagram showing the agentic loop: User prompt -> Agent reasoning -> Tool calls (read files, edit code, run tests) -> Agent updates based on tool results -> Final output for user review](images/core-concepts/agent-loop.png)

This process typically involves three kinds of actions:

1. **Read and search.** The agent reads files, searches the codebase, and looks up documentation to understand what needs to change.
1. **Edit and execute.** The agent modifies code, runs terminal commands, installs dependencies, or calls external services through tools.
1. **Test and validate.** The agent runs tests, checks for compiler errors, and reviews its own changes. If something is wrong, it continues iterating.

The agent chains these actions together as needed. Answering a question about your codebase might involve only a few file reads. Implementing a new feature typically loops through editing, running tests, diagnosing failures, and editing again until the tests pass.

You stay in control throughout the process. Send a new message to redirect the agent, add context, or suggest a different approach. For more on reviewing changes and managing agent behavior, see [Stay in control](#stay-in-control).

Behind the scenes, [VS Code assembles the current context](#how-vs-code-assembles-context) into a prompt and sends it to the language model. The model responds with text, a code edit, or a tool request. When a tool runs, its output is added to the context for the next iteration, and this cycle repeats until the task is complete.

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

Tools give the language model the ability to act on your development environment: reading and writing files, running terminal commands, navigating the editor, searching the web, and calling external APIs. Each tool call returns a result that the model uses to decide its next step, which is what turns a text generator into an agent.

The model selects tools based on what your task requires. For example, when you ask to add input validation to a form, the agent might search your project structure, read the relevant component, apply the edit, check for type errors, and then run the associated tests. Each result feeds into the next decision.

VS Code includes a variety of built-in tools for working with your codebase and your development environment. You can extend its functionality further with [MCP servers](/docs/copilot/customization/mcp-servers.md) for external services, [agent skills](/docs/copilot/customization/agent-skills.md) for reusable capabilities, and [hooks](/docs/copilot/customization/hooks.md) for lifecycle automation. Learn more about [tools available to agents](/docs/copilot/agents/agent-tools.md).

## Agent types

Agents run in different environments depending on when you need results and how much oversight you want:

* **Local agents** run interactively in VS Code. You see every step and can steer the agent in real time. Best for tasks where you want to stay hands-on.
* **Background agents** run autonomously on your machine. Hand off a task and continue other work while the agent completes it.
* **Cloud agents** run on GitHub's infrastructure. They create branches, implement changes, and open pull requests for your team to review.
* **Third-party agents** connect external AI providers like Anthropic and OpenAI. You can hand off sessions between agent types at any point.

![Diagram showing the different agent types: Local agents (interactive in VS Code), Background agents (autonomous on your machine), Cloud agents (run on GitHub's infrastructure), and Third-party agents (connect external AI providers).](images/agents-overview/agent-types-diagram-v3.png)

Learn more about [agents and agent sessions](/docs/copilot/agents/overview.md).

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

The most effective way to work with AI is to treat its output as a first draft: useful as a starting point, but always requiring your review and judgment.

## Related resources

* [Get started with AI in VS Code](/docs/copilot/getting-started.md)
* [Best practices for using AI in VS Code](/docs/copilot/best-practices.md)
* [Using agents in VS Code](/docs/copilot/agents/overview.md)
