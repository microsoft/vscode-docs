---
ContentId: 33e63aa1-1d8f-4d23-9733-1475f8c9f502
DateApproved: 11/12/2025
MetaDescription: Learn how to choose between different AI language models and how to use your own language model API key in Visual Studio Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# AI language models in VS Code

Visual Studio Code offers different built-in language models that are optimized for different tasks. You can also bring your own language model API key to use models from other providers. This article describes how to change the language model for chat or inline suggestions, and how to use your own API key.

## Choose the right model for your task

By default, chat uses a base model to provide fast, capable responses for a wide range of tasks, such as coding, summarization, knowledge-based questions, reasoning, and more.

However, you are not limited to using only this model. You can choose from a [selection of language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat#ai-models-for-copilot-chat-1), each with its own particular strengths. For a detailed comparison of AI models, see [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task) in the GitHub Copilot documentation.

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

## Customize the model picker

You can customize which models are shown in the model picker in the Chat view by using the language model editor. You can show or hide both built-in models and models that you have added using [bring your own language model key](#bring-your-own-language-model-key).

1. Open the model picker and select **Manage Models** or run the **Chat: Manage Language Models** command from the Command Palette.

1. In the provider list, select **Copilot**.

1. Select the models you want to show in the model picker.

    After updating the selection, the model picker only shows the models that you have selected.

<!--
1. Open the model picker and select **Manage Models** or run the **Chat: Manage Language Models** command from the Command Palette.

    In the language model editor, you can see the list and details of available models from the model providers that you have configured.

1. Hover over a model in the list and select the eye icon to show or hide the model in the model picker.

    ![Screenshot that shows the lanugage model editor with the eye icon to show or hide models in the model picker.](../images/language-models/language-models-hide.png)
-->

## Bring your own language model key

> [!IMPORTANT]
> This feature is not currently available to Copilot Business or Copilot Enterprise users.

GitHub Copilot in VS Code comes with a variety of built-in language models that are optimized for different tasks. If you want to use a model that is not available as a built-in model, you can bring your own language model API key (BYOK) to use models from other providers.

Using your own language model API key in VS Code has several benefits:

* **Model choice**: access hundreds of models from different providers, beyond the built-in models.
* **Experimentation**: experiment with new models or features that are not yet available in the built-in models.
* **Local compute**: use your own compute for one of the models already supported in GitHub Copilot or to run models not yet available.
* **Greater control**: by using your own key, you can bypass the standard rate limits and restrictions imposed on the built-in models.

VS Code provides different options to add more models:

* Use one of the [built-in model providers](#add-a-model-from-a-built-in-provider)

* Configure a [custom OpenAI-compatible model](#add-an-openai-compatible-model)

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

1. Hover over a model provider in the list, and select the gear icon to configure the provider details.

<!--
1. Select **Add Models**, and then select a model provider from the list.

    ![Screenshot that shows the model provider Quick Pick.](../images/language-models/model-provider-quick-pick.png)

-->

1. Enter the provider-specific details, such as the API key or endpoint URL.

1. Depending on the provider, enter the model details or select a model from the list.

    The following screenshot shows the model picker for Ollama running locally, with the Phi-4 model deployed.

    ![Screenshot that shows the model picker of Ollama running locally, allowing you to select a model from the list of available models.](../images/language-models/ollama-installed-models-quick-pick.png)

1. You can now select the model from the model picker in chat.

    For a model to be available when using [agents](/docs/copilot/chat/copilot-chat.md#built-in-agents), it must support tool calling. If the model doesn't support tool calling, it won't be shown in the model picker.

### Add an OpenAI-compatible model

> [!NOTE]
> Configuring a custom OpenAI-compatible model is currently only available in [VS Code Insiders](https://code.visualstudio.com/insiders/) as of release 1.104.

The custom OpenAI provider enables you to use any OpenAI-compatible API endpoint and configure the models for use in chat.

To configure a custom OpenAI endpoint and model:

1. Select **Manage Models** from the language model picker in the Chat view or run the **Chat: Manage Language Models** command from the Command Palette.

1. Select **Add Models**, and then select **OpenAI Compatible** from the list.

1. Follow the prompts to add the details for your model:

    * Unique identifier for the model
    * Display name for the model in the language model picker
    * Full API endpoint URL
    * Select the model capabilities, such as tool calling, vision, thinking, and whether the endpoint requires an API key.
    * Maximum input and output token limits.

Alternatively, you can manually add your custom model configuration in the `setting(github.copilot.chat.customOAIModels)` setting.

## Update model provider details

To update the details of a model provider you have configured previously:

To update the provider details, such as the API key or endpoint URL:

1. Select **Manage Models** from the language model picker in the Chat view or run the **Chat: Manage Language Models** command from the Command Palette.

1. Hover over a model provider in the list, and select the gear icon to edit the provider details.

1. Update the provider details, such as the API key or endpoint URL.

<!--
1. Select **Manage Models** from the language model picker in the Chat view or run the **Chat: Manage Language Models** command from the Command Palette.

1. Select the gear icon for the model provider you want to update.

   ![Screenshot that shows the model provider Quick Pick, with a gear icon next to the provider name.](../images/language-models/reconfigure-model-provider.png)

1. Update the provider details, such as the API key or endpoint URL.
-->

## Change the model for inline suggestions

To change the language model that is used for generating inline suggestions in the editor:

1. Select **Configure Inline Suggestions...** from the Chat menu in the VS Code title bar.

1. Select **Change Completions Model...**, and then select one of the models from the list.

> [!NOTE]
> The models that are available for inline suggestions might evolve over time as we add support for more models.

## Frequently asked questions

### Why is bring your own model key not available for Copilot Business or Copilot Enterprise?

Bringing your own model key is not available for Copilot Business or Copilot Enterprise because it's mainly meant to allow users to experiment with the newest models the moment they are announced, and not yet available as a built-in model in Copilot.

Bringing your own model key will come to Copilot Business and Enterprise plans later this year, as we better understand the requirements that organizations have for using this functionality at scale. Copilot Business and Enterprise users can still use the built-in, managed models.

### Can I use locally hosted models with Copilot in VS Code?

You can use locally hosted models in chat by using [bring your own model key](#bring-your-own-language-model-key) (BYOK) and using a model provider that supports connecting to a local model. You have different options to connect to a local model:

* Use a built-in model provider that supports local models
* Install an extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Alanguage-models&target=VSCode&category=All%20categories&sortBy=Relevance), for example, [AI Toolkit for VS Code with Foundry Local](https://aka.ms/AIToolkit)
* Configure a [custom OpenAI-compatible model](#use-an-openai-compatible-model)

Currently, you cannot connect to a local model for inline suggestions. VS Code provides an extension API [`InlineCompletionItemProvider`](/api/references/vscode-api.md#InlineCompletionItemProvider) that enables extensions to contribute a custom completion provider. You can get started with our [Inline Completions sample](https://github.com/microsoft/vscode-extension-samples/blob/main/inline-completions).

> [!NOTE]
> Currently, using a locally hosted models still requires the Copilot service for some tasks. Therefore, your GitHub account needs to have access to a Copilot plan (for example, Copilot Free) and you need to be online. This requirement might change in a future release.

### Can I use a local model without an internet connection?

Currently, using a local model requires access to the Copilot service and therefore requires you to be online. This requirement might change in a future release.

### Can I use a local model without a Copilot plan?

No, currently you need to have access to a Copilot plan (for example, Copilot Free) to use a local model. This requirement might change in a future release.

## Related resources

* [Available language models in GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode)
