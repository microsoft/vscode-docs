---
ContentId: c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f
DateApproved: 9/2/2026
MetaDescription: Understand how AI agents in {% data variables.product.prodname_vscode_shortname %} use and manage context to produce relevant responses.
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

# Understand context in AI agents

Context is the information available to an AI agent and its language model while they work on your request. It can include conversation history, files from your workspace, tool outputs, custom instructions, and references you add to your prompt.

The language model reasons over this information to decide what to say or do next. The agent can use [tools](/docs/agents/concepts/tools.md) to gather more context, take actions, and evaluate the results. This article explains how {% data variables.product.prodname_vscode_shortname %} assembles and discovers context, and how to work within context window limits.

## Why context matters

A prompt with relevant files, clear instructions, and focused history produces better results than a vague prompt with no context. The language model can only reason over information included in its current context.

You don't need to identify every relevant file before you start. During the [agent loop](/docs/agents/concepts/agents.md#agent-loop), the agent can search your workspace, read files, run commands, and add the results to the context for its next step. Explicit references are useful when you already know which information the agent should consider.

Conversation history is scoped to its session and isn't automatically available in a different session. Information carries across sessions only through persistent sources, such as [custom instructions](/docs/agent-customization/custom-instructions.md) or [agent memory](/docs/agents/concepts/agents.md#memory).

## How {% data variables.product.prodname_vscode_shortname %} assembles context

Each time the agent sends a request to the language model, {% data variables.product.prodname_vscode_shortname %} assembles a prompt from multiple sources:

![Diagram showing the context window as a container with seven layers: system instructions, customizations, user message, conversation history, implicit context, explicit references, and tool outputs, with an arrow sending the assembled prompt to the language model.](../images/concepts/context-assembly.png)

* **System instructions**: built-in guidelines that define the agent's behavior.
* **Customizations**: AI customizations you set up, including custom agents, skills, and custom instructions.
* **User message**: the current request or follow-up message you send to the agent.
* **Conversation history**: the messages exchanged so far in the current session.
* **Implicit context**: the file you're editing, your current selection, visible errors, and git state.
* **Explicit references**: files, editor context, web content, and other sources you reference with `#`-mentions.
* **Tool outputs**: results from file reads, terminal commands, codebase search results, and other tool calls during agent sessions.

The context changes as the agent works. For example, the output of a code search can lead the agent to read a file, and that file can then inform the next model request. Information that isn't included in a request is unavailable to the model, but the agent can use tools to discover and add more information.

## Workspace indexing

{% data variables.product.prodname_vscode_shortname %} uses a semantic index to find code by meaning rather than only by exact keywords. The index helps the agent locate relevant snippets quickly, especially in a large codebase. It doesn't add your entire workspace to every model request.

{% data variables.product.prodname_vscode_shortname %} builds and maintains the index automatically. If a semantic index isn't available yet, the agent can still find context by using text search, file search, and language intelligence.

Learn more about [workspace indexing](/docs/agents/reference/workspace-context.md).

## Implicit context

{% data variables.product.prodname_vscode_shortname %} uses your current activity to provide context to the prompt or suggest context you might add:

* The currently selected text in the active editor.
* The file name or notebook name of the active editor.
* When you use the **Ask** agent, the contents of the active file.
* When you use **Agent**, the active file as a suggested attachment that you can add to the context.

Implicit context reduces how much information you need to specify. If a particular source is important to the task, add it explicitly instead of relying on the agent to infer that it is relevant.

## Explicit context

Add explicit context when you want to ensure that the agent considers a specific file, folder, symbol, image, web page, or other source. Type `#` in the chat input to choose a context item, or select **Add Context** (`+` icon) in the chat input field.

Explicit context guides the agent toward relevant information but still counts toward the context window. Add only the sources that help the agent complete the current task. Learn more about [adding context to chat](/docs/chat/copilot-chat-context.md).

> [!TIP]
> Providing focused context up front might reduce the searches and file reads the agent needs, which can lower AI credit use. Avoid adding unrelated or large sources because they also consume context window tokens. Learn more about [optimizing AI credit usage](/docs/agents/guides/optimize-usage.md).

## Context window and compaction

The context window is the maximum amount of information a language model can process in one request. The user message, conversation history, instructions, referenced files, and tool outputs all use space in this window.

When a conversation approaches the limit, {% data variables.product.prodname_vscode_shortname %} automatically compacts older parts of the conversation into a summary. Compaction makes room for new information, but details from earlier messages might be summarized or omitted. You can also enter `/compact` in the chat input to compact the conversation manually.

Start a new session when you switch to an unrelated task. If an instruction should apply across requests or sessions, store it in [custom instructions](/docs/agent-customization/custom-instructions.md) instead of relying on conversation history. Learn more about [managing conversation context](/docs/agents/run/sessions/manage-sessions.md#compact-conversation-context).

## Working effectively with context

* **Describe the goal and constraints.** Explain the outcome you want and any requirements the agent should follow.
* **Let the agent discover context.** The agent can search your workspace and read related files as it works. You don't need to attach the entire codebase.
* **Reference important sources.** Explicitly add files, symbols, errors, or documentation that the agent must consider.
* **Keep each session focused.** Use a separate session for an unrelated task so that its history doesn't compete for context.

### How context improves a response

Consider asking an agent to explain how authentication works in your project.

Without relevant workspace context:

```prompt
How does authentication work?
```

The model has no way to know which project you mean and gives a generic answer about authentication patterns.

After attaching `src/auth.ts` to the request as context:

```prompt
Explain the authentication flow and identify where tokens are validated.
```

The referenced file gives the agent a starting point. The agent can then search for related code and explain the implementation with specific functions and configuration values.

## Related resources

* [Language models](/docs/agents/concepts/language-models.md)
* [Prompt examples](/docs/agents/guides/prompt-examples.md)
* [Context engineering guide](/docs/agents/guides/context-engineering-guide.md)
