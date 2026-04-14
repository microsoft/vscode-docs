---
ContentId: 33e63aa1-1d8f-4d23-9733-1475f8c9f502
DateApproved: 4/15/2026
MetaDescription: Learn how to choose between different AI language models and how to use your own language model API key in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- language models
- BYOK
- bring your own key
- copilot
- ai
- local models
- customize
---
# AI language models in VS Code

Visual Studio Code offers different built-in language models that are optimized for different tasks. You can also bring your own language model API key to use models from other providers.

For background on how language models work and their key characteristics, see [Language models concepts](/docs/copilot/concepts/language-models.md).

This article describes how to change the language model for chat or inline suggestions and how to use your own API key.

## Choose the right model for your task

By default, chat uses a base model to provide fast, capable responses for a wide range of tasks, such as coding, summarization, knowledge-based questions, reasoning, and more.

However, you are not limited to using only this model. You can choose from a [selection of language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat#ai-models-for-copilot-chat-1), each with its own particular strengths. As a general guideline, use a fast model (like GPT-5 Mini) for quick edits and simple questions, and a reasoning model (like Claude Opus) for complex refactoring, architectural decisions, or multi-step tasks. For a detailed comparison, see [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task) in the GitHub Copilot documentation.

Depending on the [agent](/docs/copilot/customization/custom-agents.md) you are using, the list of available models might be different. For example, in agent mode, the list of models is limited to those that have good support for tool calling.

> [!NOTE]
> If you are a Copilot Business or Enterprise user, your administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

## Change the model for chat conversations

Use the language model picker in the chat input field to change the model that is used for chat conversations and code editing.

![Screenshot that shows the model picker in the Chat view.](../images/language-models/model-dropdown-change-model.png)

> [!TIP]
> Install the AI Toolkit extension to add more language models to enhance GitHub Copilot capabilities.
>
> For more information, see [Change the chat model](https://docs.github.com/en/copilot/how-tos/use-ai-models/change-the-chat-model#adding-more-models).

You can further extend the list of available models by [using your own language model API key](#bring-your-own-language-model-key).

If you have a paid Copilot plan, the model picker shows the premium request multiplier for premium models. Learn more about [premium requests](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests#premium-requests) in the GitHub Copilot documentation.

## Configure thinking effort

Some models support configurable thinking effort. Thinking effort controls how much reasoning the model applies to each request. Use a higher effort level for complex tasks like architectural decisions or multi-step debugging, and a lower level for straightforward code generation or simple questions. For background on how thinking and reasoning work, see [Thinking and reasoning](/docs/copilot/concepts/language-models.md#thinking-and-reasoning).

VS Code sets recommended default effort levels based on evaluations and online performance data, and has adaptive reasoning enabled. Adaptive reasoning lets the model dynamically determine when and how much to think based on the complexity of each request. For most use cases, the defaults work well and you don't need to change them.

You can configure the thinking effort directly from the model picker:

1. Open the model picker in the chat input field and select a reasoning model.

1. Select the **>** arrow that appears next to the model name to open the **Thinking Effort** submenu.

    > [!NOTE]
    > Non-reasoning models, such as GPT-4.1 and GPT-4o, do not show the thinking effort submenu.

1. Select an effort level.

    ![Screenshot showing the Thinking Effort submenu in the model picker, with different effort levels such as None, Low, Medium, and High.](../images/language-models/thinking-effort-submenu.png)

The model picker label updates to show the selected effort level, for example "Claude Sonnet 4.6 · High". The effort level persists across conversations for the same model.

> [!NOTE]
> The `setting(github.copilot.chat.anthropic.thinking.effort)` and `setting(github.copilot.chat.responsesApiReasoningEffort)` settings are deprecated. You should configure thinking effort directly via the language model picker.

## Auto model selection

> [!NOTE]
> Auto model selection is available as of VS Code release 1.104.

With auto model selection, VS Code automatically selects a model to ensure that you get the optimal performance and reduce rate limits due to excessive usage of particular language models. It detects degraded model performance and uses the best model at that point in time. We continue to improve this feature to pick the most suitable model for your needs.

To use auto model selection, select **Auto** from the model picker in chat.

Currently, auto chooses between Claude Sonnet 4, GPT-5, GPT-5 mini and other models. If your organization has [opted out of certain models](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models), auto will not select those models. If none of these models are available or you run out of premium requests, auto will fall back to a model at 0x multiplier.

### Multiplier discounts

When using auto model selection, VS Code uses a variable [model multiplier](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#model-multipliers), based on the selected model. If you are a paid user, auto will apply a request discount.

At any time, you can see which model and model multiplier are used by hovering over the chat response.

![Screenshot of a chat response, showing the selected model on hover.](../images/language-models/chat-response-selected-model.png)

## Manage language models

You can use the language models editor to view all available models, choose which models are shown in the model picker, and add more models by adding from built-in providers or from extension-provided model providers.

To open the Language Models editor, open the model picker in the Chat view and select **Manage Models** or run the **Chat: Manage Language Models** command from the Command Palette. The Language Models editor opens by default in a [modal overlay](/docs/getstarted/userinterface.md#modal-editors) on top of the editor area.

![Screenshot that shows the Language Models editor.](../images/language-models/language-models-editor.png)

The editor lists all models available to you, showing key information such as the model capabilities, context size, billing details, and visibility status. By default, models are grouped by provider, but you can also group them by visibility.

You can search and filter models by using the following options:

* Text search with the search box
* Provider: `@provider:"OpenAI"`
* Capability: `@capability:tools`, `@capability:vision`, `@capability:agent`
* Visibility: `@visible:true/false`

### Customize the model picker

You can customize which models are shown in the model picker by changing the visibility status of models in the Language Models editor. You can show or hide models from any provider.

Hover over a model in the list and select the eye icon to show or hide the model in the model picker.

![Screenshot that shows the Language Models editor with the eye icon to show or hide models in the model picker.](../images/language-models/language-models-hide.png)

## Bring your own language model key

> [!IMPORTANT]
> Bring your own model key is not currently available to Copilot Business or Copilot Enterprise users. It is intended for individual experimentation with the newest models. Support for Business and Enterprise plans is planned for later this year.

GitHub Copilot in VS Code comes with a variety of built-in language models that are optimized for different tasks. If you want to use a model that is not available as a built-in model, you can bring your own language model API key (BYOK) to use models from other providers.

Using your own language model API key in VS Code has several benefits:

* **Model choice**: access hundreds of models from different providers, beyond the built-in models.
* **Experimentation**: experiment with new models or features that are not yet available in the built-in models.
* **Local compute**: use your own compute for one of the models already supported in GitHub Copilot or to run models not yet available.
* **Greater control**: by using your own key, you can bypass the standard rate limits and restrictions imposed on the built-in models.

VS Code provides different options to add more models:

* Use one of the [built-in model providers](#add-a-model-from-a-built-in-provider)

* Install a [language model provider extension](https://marketplace.visualstudio.com/search?term=tag%3Alanguage-models&target=VSCode&category=All%20categories&sortBy=Relevance) from the Visual Studio Marketplace, for example, [AI Toolkit for VS Code with Foundry Local](https://aka.ms/AIToolkit)

### Considerations when using bring your own model key

* Only applies to the chat experience and doesn't affect inline suggestions or other AI-powered features in VS Code.
* Capabilities are model-dependent and might differ from the built-in models, for example, support for tool calling, vision, or thinking.
* The Copilot service API is still used for some tasks, such as sending embeddings, repository indexing, query refinement, intent detection, and side queries.
* There is no guarantee that responsible AI filtering is applied to the model's output when using BYOK.

### Add a model from a built in provider

VS Code supports several built-in model providers that you can use to add more models to the model picker in chat.

To configure a language model from a built-in provider:

1. Select **Manage Models** from the language model picker in the Chat view or run the **Chat: Manage Language Models** command from the Command Palette.

1. In the Language Models editor, select **Add Models**, and then select a model provider from the list.

    ![Screenshot that shows the model provider Quick Pick.](../images/language-models/model-provider-quick-pick.png)

1. Enter the provider-specific details, such as the API key or endpoint URL.

1. Depending on the provider, enter the model details or select a model from the list.

    The following screenshot shows the model picker for Ollama running locally, with the Phi-4 model deployed.

    ![Screenshot that shows the model picker of Ollama running locally, allowing you to select a model from the list of available models.](../images/language-models/ollama-installed-models-quick-pick.png)

1. You can now select the model from the model picker in chat.

    For a model to be available when using [agents](/docs/copilot/agents/overview.md), it must support tool calling. If the model doesn't support tool calling, it won't be shown in the model picker.

> [!NOTE]
> Configuring a custom OpenAI-compatible model is currently only available in [VS Code Insiders](https://code.visualstudio.com/insiders/) as of release 1.104. You can also manually add your OpenAI-compatible model configuration in the `setting(github.copilot.chat.customOAIModels)` setting.

## Update model provider details

To update the details of a model provider you have configured previously:

1. Select **Manage Models** from the language model picker in the Chat view or run the **Chat: Manage Language Models** command from the Command Palette.

1. In the Language Models editor, select the gear icon for the model provider you want to update.

   ![Screenshot that shows the model provider Quick Pick, with a gear icon next to the provider name.](../images/language-models/reconfigure-model-provider.png)

1. Update the provider details, such as the API key or endpoint URL.

## Change the model for inline chat

You can configure a default language model for editor inline chat. This enables you to use a different model for inline chat than for chat conversations.

To configure the default model for inline chat, use the `setting(inlineChat.defaultModel)` setting. The setting lists all available models from the model picker.

If you change the model during an inline chat session, the selection persists for the remainder of the session. After you reload VS Code, the model resets to the value specified in the `setting(inlineChat.defaultModel)` setting.

## Change the model for inline suggestions

To change the language model that is used for generating inline suggestions in the editor:

1. Select **Configure Inline Suggestions...** from the Chat menu in the VS Code title bar.

1. Select **Change Completions Model...**, and then select one of the models from the list.

> [!NOTE]
> The models that are available for inline suggestions might evolve over time as we add support for more models.

## Frequently asked questions

### Why is bring your own model key not available for Copilot Business or Copilot Enterprise?

Bringing your own model key is mainly intended for individual experimentation with the newest models, and is not yet available for Business or Enterprise plans. Support for these plans is planned for later this year. Copilot Business and Enterprise users can still use the built-in, managed models.

### Can I use locally hosted models with Copilot in VS Code?

You can use locally hosted models in chat by using [bring your own model key](#bring-your-own-language-model-key) (BYOK) and using a model provider that supports connecting to a local model. You have different options to connect to a local model:

* Use a built-in model provider that supports local models
* Install an extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Alanguage-models&target=VSCode&category=All%20categories&sortBy=Relevance), for example, [AI Toolkit for VS Code with Foundry Local](https://aka.ms/AIToolkit)

Currently, you cannot connect to a local model for inline suggestions. VS Code provides an extension API [`InlineCompletionItemProvider`](/api/references/vscode-api.md#InlineCompletionItemProvider) that enables extensions to contribute a custom completion provider. You can get started with our [Inline Completions sample](https://github.com/microsoft/vscode-extension-samples/blob/main/inline-completions).

> [!NOTE]
> Currently, using a locally hosted models still requires the Copilot service for some tasks. Therefore, your GitHub account needs to have access to a Copilot plan (for example, Copilot Free) and you need to be online. This requirement might change in a future release.

### Can I use a local model without an internet connection?

Currently, using a local model requires access to the Copilot service and therefore requires you to be online. This requirement might change in a future release.

### Can I use a local model without a Copilot plan?

No, currently you need to have access to a Copilot plan (for example, Copilot Free) to use a local model. This requirement might change in a future release.

## Related resources

* [Available language models in GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode)
* [Security considerations for AI in VS Code](/docs/copilot/security.md)
