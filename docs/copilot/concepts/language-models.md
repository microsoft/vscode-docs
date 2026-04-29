---
ContentId: b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e
DateApproved: 4/29/2026
MetaDescription: Understand how large language models power AI features in VS Code, including model characteristics, context windows, and model selection.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- language model
- LLM
- context window
- nondeterministic
- model selection
- BYOK
---

# Language models

Visual Studio Code uses large language models (LLMs) to power its AI features. You can choose from multiple models through your GitHub Copilot plan or bring your own models. This article explains how language models work, their characteristics, and how to think about model selection.

## How language models work

A language model processes text input (a "prompt") and generates text output. In VS Code, the prompt is assembled from multiple sources: your message, conversation history, file contents, tool outputs, and custom instructions. The model generates responses that can include explanations, code edits, or requests to call [tools](/docs/copilot/concepts/tools.md).

Language models don't execute code or access files directly. Instead, they generate text that the [agent loop](/docs/copilot/concepts/agents.md#agent-loop) interprets as actions. When a model requests a tool call, VS Code executes the tool and feeds the result back to the model for the next iteration.

## Key characteristics

* **Nondeterministic**: the same prompt can produce different results each time. This is by design and reflects how the model samples from probability distributions.
* **Context-dependent**: the quality of the response depends on the quality and relevance of the context provided in the prompt.
* **Knowledge boundaries**: models are trained on data up to a certain date and might produce outdated or incorrect information for topics beyond their training data. VS Code mitigates this with tools and workspace indexing.

## Context window

The context window is the total amount of information a model can process in a single request. It includes everything: the system prompt, custom instructions, conversation history, file contents, tool outputs, and your current message. Different models have different context window sizes.

When the context window fills up, VS Code automatically summarizes older parts of the conversation to make room. This means important details from early in a long conversation might be compressed or lost. You can also type `/compact` in the chat input to manually trigger compaction at any time. Optionally, add custom instructions after the command to guide the summary, for example `/compact focus on the API design decisions`.

Learn more about [how VS Code assembles context](/docs/copilot/concepts/context.md) and [context compaction](/docs/copilot/chat/copilot-chat-context.md#context-compaction).

## Thinking and reasoning

Some language models can perform extended reasoning, also called "thinking", before producing a response. Instead of generating an answer immediately, a reasoning model first works through the problem internally, considering multiple approaches, evaluating trade-offs, and building a step-by-step chain of thought. This internal reasoning happens in dedicated thinking tokens that are separate from the final output.

Reasoning models are especially effective for complex tasks like multi-step debugging, architectural planning, code refactoring, and mathematical or scientific analysis. For simpler tasks like generating boilerplate or answering basic questions, the extra reasoning adds latency without significant benefit.

### Thinking effort

Thinking effort controls how much reasoning a model applies to each request. Higher effort levels produce more thorough internal reasoning, which improves quality for complex problems. Lower effort levels reduce latency and token usage by limiting or skipping the thinking step.

The available effort levels and their default values vary by model and provider. Some models also support *adaptive thinking*, where the model dynamically decides whether and how much to reason based on the complexity of each request, rather than always using a fixed thinking budget.

VS Code sets default effort levels based on evaluations and online performance data, and has adaptive reasoning enabled where supported. For most use cases, the defaults work well without changes.

### Thinking tokens

Thinking tokens count toward the model's context window, even though they are not visible in the response. The actual thinking output is typically returned in summarized form or can be omitted entirely for lower latency. Keep in mind that higher thinking effort levels can produce more thinking tokens, which can increase latency.

Learn how to [configure the thinking effort level](/docs/copilot/customization/language-models.md#configure-thinking-effort) in VS Code.

## Choose the right model

Each model has different strengths. Some are optimized for speed and work well for simple completions. Others have larger context windows or better reasoning capabilities, making them ideal for complex tasks. You can switch models at any time, based on your needs for a particular task.

VS Code also supports **auto model selection**, which automatically selects a model to ensure optimal performance and reduce rate limits. Auto selects from available models and applies a request discount for paid users.

Learn more about [choosing and configuring language models](/docs/copilot/customization/language-models.md).

## Related resources

* [Context](/docs/copilot/concepts/context.md)
* [AI language models in VS Code](/docs/copilot/customization/language-models.md)
