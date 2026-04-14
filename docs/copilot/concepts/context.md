---
ContentId: c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f
DateApproved: 4/15/2026
MetaDescription: Learn how VS Code assembles context for AI prompts, including workspace indexing, implicit context, explicit references, and context window management.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- context
- context window
- workspace indexing
- prompt
- mentions
- implicit context
---

# Context

Context is everything the model can see when generating a response. It includes the conversation history, file contents from your workspace, tool outputs, custom instructions, and any references you add explicitly. The model can only reason about what it can see, so providing relevant context is one of the most effective ways to improve AI responses.

This article explains how VS Code assembles context, what types of context are available, and how to work effectively with context window limits.

## Why context matters

A prompt with relevant files, clear instructions, and focused history produces better results than a vague prompt with no context. The model has no memory of previous sessions and no access to files it hasn't been given. Everything it knows about your task comes from the context assembled for the current request.

## How VS Code assembles context

When you send a message, VS Code builds a language model prompt from multiple sources:

![Diagram showing the context window as a container with seven layers: system instructions, customizations, user message, conversation history, implicit context, explicit references, and tool outputs, with an arrow sending the assembled prompt to the language model.](../images/concepts/context-assembly.png)

* **System instructions**: built-in guidelines that define the agent's behavior.
* **Customizations**: AI customizations you set up, including custom agents, skills, and custom instructions.
* **User message**: the current message you're sending to the agent.
* **Conversation history**: the messages exchanged so far in the current session.
* **Implicit context**: the file you're editing, your current selection, visible errors, and git state.
* **Explicit references**: files, editor context, web content, and other sources you reference with `#`-mentions.
* **Tool outputs**: results from file reads, terminal commands, codebase search results, and other tool calls during agent sessions.

This assembled prompt is what the model sees. Everything outside of it is invisible to the model. This is why referencing specific files with `#file` produces better results than asking about code the model hasn't seen.

## Workspace indexing

VS Code uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

* **Remote index**: if your code is hosted in a GitHub repository, you can build a remote index to search your codebase quickly, even for large codebases.
* **Local index**: use an advanced semantic index stored on your local machine for fast and accurate search results.
* **Basic index**: if local indexing is not available, simpler algorithms work locally for larger codebases.

Learn more about [workspace indexing](/docs/copilot/reference/workspace-context.md).

## Implicit context

VS Code automatically provides context to the prompt based on your current activity:

* The currently selected text in the active editor.
* The file name or notebook name of the active editor.
* If you're using the **Ask** agent, the active file is automatically included as context.
* When using **Agent**, it decides autonomously if the active file needs to be added based on your prompt.

## Working effectively with context

* **Start new sessions for new tasks.** A [session](/docs/copilot/chat/chat-sessions.md) is an independent conversation with its own context window and history. Each session starts fresh, so don't reuse a single conversation for unrelated tasks.
* **Be selective with context.** Adding your entire codebase isn't always helpful. Reference specific files that are relevant to the task.
* **Use custom instructions for persistent rules.** Rules you add in [custom instructions](/docs/copilot/customization/custom-instructions.md) are included in every request, so you don't lose them when the conversation is summarized.

### Examples

The following examples show how adding context improves results:

**Vague prompt (no context)**:

```prompt
How does authentication work?
```

The model has no way to know which project you mean and gives a generic answer about authentication patterns.

**Prompt with explicit context**:

```prompt
How does authentication work for this project?
```

The model reads your actual authentication files and explains how *your* implementation works, referencing specific functions and configuration values.

**Prompt with web context**:

```prompt
Migrate the auth module to the latest passport.js API #fetch https://www.passportjs.org/concepts/authentication/
```

The model uses the current documentation from the web to guide the migration, avoiding outdated API patterns from its training data.

Learn more about [adding context to chat](/docs/copilot/chat/copilot-chat-context.md).

## Related resources

* [Language models](/docs/copilot/concepts/language-models.md)
* [Manage context for AI](/docs/copilot/chat/copilot-chat-context.md)
* [Context engineering guide](/docs/copilot/guides/context-engineering-guide.md)
* [Workspace indexing](/docs/copilot/reference/workspace-context.md)
