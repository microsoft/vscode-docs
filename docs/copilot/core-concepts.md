---
ContentId: d8b3c7f1-2e4a-5b6d-9c0e-1f3a5b7d9e2c
DateApproved: 02/16/2026
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

# How GitHub Copilot works in VS Code

GitHub Copilot is an AI assistant powered by large language models. It integrates across VS Code through multiple surfaces, from inline suggestions as you type to autonomous agents that implement entire features. This article explains the core architecture, key concepts, and how all the Copilot features connect. For a hands-on tutorial, see the [Quickstart](/docs/copilot/getting-started.md). For practical tips, see [Best practices](/docs/copilot/copilot-tips-and-tricks.md).

## The AI interaction model

Every Copilot feature in VS Code, whether it's an inline suggestion, a chat response, or an agent building a feature, follows the same underlying pattern:

<!-- TODO: Diagram - The AI interaction cycle
     A circular flow diagram showing the six steps:
     You express intent → VS Code gathers context → Prompt sent to model → Model generates response → VS Code presents result → You review & iterate → (back to start)
     Highlight that agents loop through steps 2-6 autonomously.
-->

1. **You express intent.** You type code, write a prompt, or trigger an action.
1. **VS Code gathers context.** It collects relevant information: the file you're editing, your workspace structure, conversation history, custom instructions, and any context you explicitly reference.
1. **A prompt is sent to a language model.** VS Code assembles the gathered context into a prompt and sends it to the selected model.
1. **The model generates a response.** The model processes the prompt and produces output: code, text, a plan, or a tool call.
1. **VS Code presents the result.** The response appears as ghost text in the editor, a chat message, file edits, or terminal commands, depending on the feature.
1. **You review and iterate.** You accept, reject, or refine the result. For agents, this loop continues autonomously until the task is complete.

This interaction model is the foundation. The features differ in how much context they gather, how much autonomy they have, and how they present results.

### Language models

A large language model (LLM) is an AI system trained on large datasets of text and code. Given an input prompt, it predicts the most likely continuation, one token at a time. This is what powers all of Copilot's features: code completions, chat responses, and agent actions.

Key characteristics of LLMs:

* **Nondeterministic**: the same prompt can produce different results each time. This is by design and reflects how the model samples from probability distributions.
* **Context-dependent**: the quality of the response depends on the quality and relevance of the context provided in the prompt.
* **Knowledge boundaries**: models are trained on data up to a certain date and might produce outdated or incorrect information for topics beyond their training data. Copilot mitigates this with tools like web search and workspace indexing.

VS Code supports multiple language models with different strengths. Some excel at fast, simple completions. Others handle complex reasoning or large codebases better. You can switch models per conversation or let VS Code choose automatically.

Learn more about [choosing and configuring language models](/docs/copilot/customization/language-models.md).

### Context

Context is everything the model can see when generating a response. It includes the conversation history, file contents from your workspace, tool outputs, custom instructions, and any references you add explicitly. All of this fits into a finite **context window**, which is the maximum amount of information the model can process in a single request.

Context matters because the model can only reason about what it can see. A prompt with relevant files, clear instructions, and focused history produces better results than a vague prompt with no context.

VS Code gathers context automatically and gives you control over what to include:

* **Automatic context**: the file you're editing, your workspace index, git state, and conversation history.
* **Explicit context**: use `#file`, `#codebase`, `#web`, and other [#-mentions](/docs/copilot/chat/copilot-chat-context.md) to point the model at specific information.
* **Persistent context**: [custom instructions](/docs/copilot/customization/custom-instructions.md) and [prompt files](/docs/copilot/customization/prompt-files.md) shape every interaction without repeating yourself.

When a conversation grows long, the context window fills up. VS Code automatically summarizes older parts of the conversation to free space, but important details from early in the conversation might be lost. Start new sessions for new tasks, and put persistent rules in custom instructions rather than relying on conversation history.

Learn more about [managing context](/docs/copilot/chat/copilot-chat-context.md) and [how workspace indexing works](/docs/copilot/reference/workspace-context.md).

### Tools

Tools are what make Copilot agentic. Without tools, the model can only respond with text. With tools, Copilot can act on your codebase and environment: read and edit files, run terminal commands, search your workspace, browse the web, and interact with external services.

The built-in tools fall into several categories:

| Category | Capabilities |
|----------|-------------|
| File operations | Read files, edit code, create new files |
| Terminal | Run shell commands, start servers, run tests |
| Search | Find files by pattern, search content with regex, search the codebase semantically |
| Web | Search the web, fetch documentation |
| Code intelligence | See errors and warnings, find references, jump to definitions |

Copilot chooses which tools to use based on your prompt and what it learns along the way. When you ask "fix the failing tests," Copilot might run the test suite, read the error output, search for the relevant source files, edit the code, and run the tests again to verify, chaining multiple tool calls in sequence.

You can extend Copilot's built-in tools with [MCP servers](/docs/copilot/customization/mcp-servers.md) for external services, [agent skills](/docs/copilot/customization/agent-skills.md) for reusable capabilities, and [hooks](/docs/copilot/customization/hooks.md) for lifecycle automation. Learn more about [tools available to agents](/docs/copilot/agents/agent-tools.md).

## The Copilot feature spectrum

Copilot's features range from passive assistance to fully autonomous agents. Each feature uses the same underlying interaction model but differs in the level of autonomy, context scope, and how you interact with the result.

<!-- TODO: Diagram - The Copilot feature spectrum
     A horizontal spectrum or gradient showing features from least to most autonomous:
     Inline suggestions → Smart actions → Inline chat → Chat → Agents
     Below each, show increasing context scope (single file → workspace → tools + terminal + web)
     and increasing autonomy (passive → one-click → interactive → conversational → autonomous).
-->

| Feature | Autonomy | Context scope | Best for |
|---------|----------|---------------|----------|
| **Inline suggestions** | Passive: triggered as you type | Current file, open tabs | Line completions, boilerplate, repetitive patterns |
| **Smart actions** | One-click: you trigger, AI acts | Targeted (selection, file, diagnostics) | Commit messages, quick fixes, generating docs, renaming |
| **Inline chat** | Interactive: scoped to a selection | Current file, selection | Targeted edits, explanations, small refactors |
| **Chat** | Conversational: multi-turn dialog | Workspace, #-mentions, conversation history | Q&A, exploring code, brainstorming, planning |
| **Agents** | Autonomous: multi-step, tool-using | Full workspace, tools, terminal, web | Building features, fixing bugs end-to-end, refactoring |

Moving from left to right, each feature gives the AI more autonomy and broader context. Inline suggestions are fast and lightweight. Agents are powerful but take longer and require review. Choose the feature that matches the scope of your task.

For detailed guidance on picking the right tool, see [Best practices](/docs/copilot/copilot-tips-and-tricks.md).

## Agents and the agentic loop

Agents are Copilot's most powerful capability. When you give an agent a task, it works through a loop of three phases: **gather context**, **take action**, and **verify results**. This loop repeats until the task is complete.

<!-- TODO: Diagram - The agentic loop
     A circular loop diagram with three phases:
     Gather context (read files, search codebase) → Take action (edit files, run commands) → Verify results (run tests, check errors)
     An arrow loops back from Verify to Gather. Show "Your prompt" as the entry point and
     "Task complete" as the exit. Include a callout showing the user can interrupt/steer at any point.
-->

1. **Gather context.** The agent reads files, searches the codebase, and explores your project to understand what needs to change.
1. **Take action.** The agent edits files, runs terminal commands, installs dependencies, or calls external tools.
1. **Verify results.** The agent runs tests, checks for errors, and reviews its own changes. If something fails, it loops back to take corrective action.

The loop adapts to the task. A question about your codebase might only need context gathering. A bug fix cycles through all three phases. A large feature might involve dozens of iterations of editing and testing.

You're part of this loop too. You can interrupt an agent at any point to steer it in a different direction, provide additional context, or ask it to try a different approach. Agents work autonomously but stay responsive to your input.

### Types of agents

Agents run in different environments depending on when you need results and how much oversight you want:

* **Local agents** run interactively in VS Code. You see every step and can steer the agent in real time. Best for tasks where you want to stay hands-on.
* **Background agents** run autonomously on your machine. Hand off a task and continue other work while the agent completes it.
* **Cloud agents** run on GitHub's infrastructure. They create branches, implement changes, and open pull requests for your team to review.
* **Third-party agents** connect external AI providers like Anthropic and OpenAI. You can hand off sessions between agent types at any point.

Learn more about [agents and agent sessions](/docs/copilot/agents/overview.md).

## Context: the key to better results

Getting good results from AI depends on providing the right context. This section explains how context works at a conceptual level and why it matters.

### The context window

The context window is the total amount of information a model can process in a single request. It includes everything: the system prompt, custom instructions, conversation history, file contents, tool outputs, and your current message. Different models have different context window sizes.

When the context window fills up, VS Code automatically summarizes older parts of the conversation to make room. This means important details from early in a long conversation might be compressed or lost.

To work effectively with context window limits:

* **Start new sessions for new tasks.** Each session starts with a fresh context window. Don't reuse a single conversation for unrelated tasks.
* **Be selective with context.** Adding your entire codebase isn't always helpful. Reference specific files that are relevant to the task.
* **Use custom instructions for persistent rules.** Rules you add in [custom instructions](/docs/copilot/customization/custom-instructions.md) are included in every request, so you don't lose them when the conversation is summarized.

### How VS Code assembles context

When you send a message, VS Code builds a prompt from multiple sources:

<!-- TODO: Diagram - How VS Code assembles context
     A layered/stacked diagram showing the prompt assembly:
     System instructions (base layer) + Custom instructions + Conversation history +
     Implicit context (current file, selection, git state) + Explicit references (#file, #codebase, #web) +
     Tool outputs (during agent sessions) = Final prompt sent to the model.
     Show the context window as a container with a finite size boundary.
-->

* **System instructions**: built-in guidelines that define Copilot's behavior.
* **Custom instructions**: your project-specific rules from `.github/copilot-instructions.md` and other instruction files.
* **Conversation history**: the messages exchanged so far in the current session.
* **Implicit context**: the file you're editing, your current selection, visible errors, and git state.
* **Explicit references**: files, codebase search results, web content, and other sources you reference with `#`-mentions.
* **Tool outputs**: results from file reads, terminal commands, searches, and other tool calls during agent sessions.

This assembled prompt is what the model sees. Everything outside of it is invisible to the model. This is why referencing specific files with `#file` produces better results than asking about code the model hasn't seen.

Learn more about [adding context to chat](/docs/copilot/chat/copilot-chat-context.md) and [workspace indexing](/docs/copilot/reference/workspace-context.md).

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
