---
ContentId: b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e
DateApproved: 11/4/2026
MetaDescription: Understand language models, tokens, context limits, and model choices for AI tasks in {% data variables.product.prodname_vscode_shortname %}.
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

# Understand language models

{% data variables.product.prodname_vscode %} uses large language models (LLMs) to power its AI features. A model interprets the information provided to it and generates a response, such as an explanation, code, or a request to use a tool.

This article explains what models can and can't do, how tokens and context limits affect your work, and how to balance quality, speed, and cost when choosing a model. For setup steps, see [choose and configure language models](/docs/agent-customization/language-models.md).

## How language models work

A language model generates a response based on patterns learned during training and the information in its current input, or **prompt**. In {% data variables.product.prodname_vscode_shortname %}, the full prompt includes more than the message you type: it can contain conversation history, file contents, tool outputs, and custom instructions. Some models also accept images and other input formats.

Language models don't execute code or access files directly. Instead, they generate text that the [agent loop](/docs/agents/concepts/agents.md#agent-loop) interprets as actions. When a model requests a tool call, {% data variables.product.prodname_vscode_shortname %} executes the tool and feeds the result back to the model for the next iteration.

Some key characteristics of language models include:

* **Nondeterministic**: the same prompt can produce different results. A successful response once doesn't guarantee the same result on another attempt.
* **Context-dependent**: the quality of the response depends on the quality and relevance of the [context](/docs/agents/concepts/context.md) provided in the prompt.
* **Limited training knowledge**: training doesn't automatically include your current codebase or the latest API changes. Tools can retrieve current information for the model to use.
* **Fallible**: a model can produce a confident but incorrect answer, sometimes called a hallucination, even about familiar topics or code it has read. Tool results help ground an answer in evidence, but don't guarantee correctness.

Review explanations against their sources and validate generated code. A convincing response or a detailed reasoning summary is not a substitute for checking the result.

## Tokens

Models process text in units called **tokens**. A token can represent a word, part of a word, punctuation, or another piece of text. Token counts are not the same as word or character counts and vary by model.

Input tokens represent information sent to the model. Output tokens represent what it generates. Tokens help measure both the model's [context limits](#context-window) and the [cost of requests](#ai-credits-and-model-costs).

One user request can trigger many model requests as the agent reads files, calls tools, and checks results. Each step can process additional tokens.

## Context window

The context window is the amount of information a model can process in a single request, measured in tokens. Instructions, conversation history, file contents, tool outputs, and your message consume that budget, and room is also needed for the response. The available input and output limits depend on the model.

A larger window can accommodate more information, but doesn't automatically include your whole repository or guarantee that the model uses every detail correctly. Focused, relevant context still matters.

As a conversation approaches its limit, supported harnesses compact older content into a summary to make room. Details can be compressed or omitted, so a long conversation is not a perfect record of everything the model can still use.

Learn more about [how {% data variables.product.prodname_vscode_shortname %} assembles context](/docs/agents/concepts/context.md) and [context compaction](/docs/agents/run/sessions/manage-sessions.md#compact-conversation-context).

## Thinking and reasoning

Some models use additional computation, often called **thinking** or **reasoning**, before producing a response. This can help with tasks that require comparing approaches or working through several dependent steps.

Reasoning can be useful for multi-step debugging, architectural planning, and complex refactoring. For a small edit or straightforward question, extra reasoning might add time and cost without improving the result. It does not remove the need for review.

### Thinking effort

Thinking effort controls how much reasoning a supported model can apply to a request. Higher effort can help with complex problems, but is not a guarantee of higher quality. Lower effort can reduce latency and token usage.

The available effort levels and their default values vary by model and provider. Some models also support *adaptive thinking*, where the model dynamically decides whether and how much to reason based on the complexity of each request, rather than always using a fixed thinking budget.

{% data variables.product.prodname_vscode_shortname %} sets default effort levels based on evaluations and online performance data, and has adaptive reasoning enabled where supported. For most use cases, the defaults work well without changes.

### Thinking tokens

Models that use thinking tokens spend part of their generation on reasoning rather than the final answer. A visible thinking summary isn't necessarily the full reasoning output. How these tokens affect context limits and billing varies by model and provider.

Learn how to [configure the thinking effort level](/docs/agent-customization/language-models.md#configure-thinking-effort-and-context-size) in {% data variables.product.prodname_vscode_shortname %}.

## Choose the right model

Each model has different strengths. Some are optimized for speed and work well for quick edits and simple questions. Others have larger context windows or better reasoning capabilities, making them ideal for complex tasks. As a general guideline:

* **Fast models** are best for quick code edits, boilerplate generation, and straightforward questions.
* **Reasoning models** excel at complex refactoring, architectural decisions, multi-step debugging, and tasks that require analyzing trade-offs.
* **Large context models** can accommodate more source material or conversation history. The agent still needs to find and include the relevant information.

You can switch models at any time, based on your needs for a particular task. For a detailed comparison, see [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task) in the GitHub Copilot documentation.

### Auto model selection

Auto model selection in {% data variables.product.prodname_copilot %} selects a model for each request based on task complexity and model availability. Use Auto when you want the service to make that choice rather than selecting a model yourself.

In [{% data variables.product.prodname_copilot_short %} harness sessions](/docs/agents/run/agent-harnesses.md#copilot), the same routing entry can appear as **Copilot Fusion** instead of **Auto**, depending on your settings and the tiers offered to your account. Fusion adds [multi-model orchestration](#copilot-fusion) alongside single-model routing.

Auto selects from multiple models and respects your organization's [model access settings](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models). Auto won't select models excluded by administrator policies or models restricted by data-residency policies.

For more details, see [About Copilot auto model selection](https://docs.github.com/en/copilot/concepts/auto-model-selection) in the GitHub documentation.

### Copilot Fusion

Copilot Fusion is a model orchestration system, not an individual language model. It chooses models and a workflow for your task, so you don't need to coordinate each step yourself. Unlike Auto, which selects one model per request, Fusion can use one model or coordinate multiple models. For example, one model can draft a solution, another can critique it, and the original model can revise it. You receive a single final response.

Consider Fusion for substantial, well-scoped coding tasks where additional review can be worth the extra time and [AI credits](#ai-credits-and-model-costs). Availability depends on your account and organization policies.

Learn how to [use Copilot Fusion](/docs/agent-customization/language-models.md#use-copilot-fusion). For details about orchestration, see [GitHub Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) in the GitHub documentation.

### AI credits and model costs

{% data variables.product.prodname_copilot %} plans use [AI credits](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) to measure usage. Consumption depends on the model's rates and the tokens processed, not only the number of messages you send. Check your plan for its allowance and usage limits.

Copilot Fusion can use multiple model passes for a task, such as drafting, critique, and revision. Each pass contributes to AI credit consumption, so an orchestrated workflow can take longer and use more credits than a single-model request.

Long context, reasoning, and repeated tool-and-model steps can increase usage. Prompt caching can reduce the cost of processing input reused from an earlier request. A lower-cost model isn't always cheaper for the whole task if it needs more retries or corrective work. For practical guidance, see [optimize AI credit usage](/docs/agents/guides/optimize-usage.md).

## Model access and hosting

Model access determines which account or credentials provide a model and how usage is billed. Model hosting determines where it processes requests. Neither is the same as where the agent edits your code.

You can use models through a {% data variables.product.prodname_copilot %} plan, another account supported by your harness, or your own API key. Supported local models process requests on your machine instead of a hosted provider. Availability, capabilities, and organization restrictions vary by access option and harness.

For example, selecting a Claude-family model through {% data variables.product.prodname_copilot_short %} does not switch to the Claude harness. Learn about [harness and model access](/docs/agents/concepts/agent-harnesses.md#model-access) and [configure model access](/docs/agent-customization/language-models.md#choose-how-to-access-models).

For {% data variables.product.prodname_copilot_short %}-provided models that run on supported hardware, see [on-device models](/docs/agent-customization/language-models.md#use-on-device-models) `feature(on-device-models)`. Don't assume that local model execution makes the entire workflow offline: other tools and services can still use the network. See [where information goes](/docs/agents/concepts/trust-and-safety.md#where-information-goes).

## Bring your own language model key

Bring your own key (BYOK) connects a supported model provider through your own credentials. Use it when you need a model or endpoint outside your existing plan, including a compatible local model provider.

The provider's billing, usage limits, and data-handling terms apply. Tool calling, image input, reasoning, and output filtering depend on the model and integration. BYOK doesn't replace model access for every AI feature, such as inline suggestions.

For supported providers, harness compatibility, sign-in requirements, and setup, see [bring your own language model key](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

## Related resources

* [Context](/docs/agents/concepts/context.md)
* [AI language models in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/language-models.md)
