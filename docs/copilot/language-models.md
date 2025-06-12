---
ContentId: 33e63aa1-1d8f-4d23-9733-1475f8c9f502
DateApproved: 06/12/2025
MetaDescription: Learn how to choose between different AI language models and how to use your own language model API key in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# AI language models in VS Code

Copilot in Visual Studio Code offers different built-in language models that are optimized for different tasks. You can also bring your own language model API key to use models from other providers. This article describes how to change the language model for chat or code completions, and how to use your own API key.

## Choose the right model for your task

By default, Copilot Chat uses a base model to provide fast, capable responses for a wide range of tasks, such as coding, summarization, knowledge-based questions, reasoning, and more.

However, you are not limited to using this model. You can choose from a selection of other models, each with its own particular strengths. You may have a favorite model that you like to use, or you might prefer to use a particular model for inquiring about a specific subject.

| Model type | Models |
|-----------|--------|
| Fast coding | <ul><li>GPT-4o</li><li>Claude Sonnet 3.5</li><li>Claude Sonnet 3.7</li><li>Gemini 2.0 Flash</li></ul> |
| Reasoning/planning | <ul><li>Claude Sonnet 3.7 Thinking</li><li>o1</li><li>o3-mini</li></ul> |

For a detailed comparison of AI models, see [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task) in the GitHub Copilot documentation.

Depending on which [chat mode](/docs/copilot/chat/copilot-chat.md#chat-mode) you are using, the list of available models might be different. In agent mode, the list of models is limited to those that have good support for tool calling.

The list of [models available in Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode) can change over time.

> [!NOTE]
> If you are a Copilot Business or Enterprise user, your administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

## Why use your own language model API key?

Developers can now leverage models directly from Anthropic, Azure, Google, OpenAI, OpenRouter, or Ollama directly by providing a valid API key. Learn how to [use your own API in VS Code](#bring-your-own-language-model-key).

Using your own language model API key in VS Code has several advantages:

- **Model choice**: access hundreds of models from different providers, beyond the built-in models.
- **Experimentation**: experiment with new models or features that are not yet available in the built-in models.
- **Local compute**: use your own compute for one of the models already supported in GitHub Copilot or to run models not yet available.
- **Greater control**: by using your own key, you can bypass the standard rate limits and restrictions imposed on the built-in models.

> [!IMPORTANT]
> This feature is currently in preview and is not currently available to Copilot Business or Copilot Enterprise users.

## Change the model for chat conversations

Use the language model picker in the chat input field to change the model that is used for chat conversations and code editing.

![Screenshot that shows the model picker in the Chat view.](images/language-models/model-dropdown-change-model.png)

You can further extend the list of available models by [using your own language model API key](#bring-your-own-language-model-key).

If you have a paid Copilot plan, the model picker shows the premium request multiplier for premium models. Learn more about [premium requests](https://docs.github.com/en/copilot/managing-copilot/monitoring-usage-and-entitlements/about-premium-requests#premium-requests) in the GitHub Copilot documentation.

## Change the model for code completions

To change the language model that is used for generating code completions in the editor:

1. Select **Configure Code Completions...** from the Copilot menu in the VS Code title bar.

1. Select **Change Completions Model...**, and then select one of the models from the list.

## Bring your own language model key

If you already have an API key for a language model provider, you can use their models in chat in VS Code, in addition to the built-in models that Copilot provides. You can use models from the following providers: Anthropic, Azure, Google Gemini, Ollama, OpenAI, and OpenRouter.

> [!IMPORTANT]
> This feature is currently in preview and is not currently available to Copilot Business or Copilot Enterprise users.

To manage the available models for chat:

1. Select **Manage Models** from the language model picker in the Chat view.

    Alternatively, run the **GitHub Copilot: Manage Models** command from the Command Palette.

    ![Screenshot that shows the model picker in the Chat view, which has an item for managing the list of models.](images/language-models/model-dropdown-change-model.png)

1. Select a model provider from the list.

    ![Screenshot that shows the model provider Quick Pick.](images/language-models/model-provider-quick-pick.png)

1. Enter the provider-specific details, such as the API key or endpoint URL.

1. Enter the model details or select a model from the list, if available for the provider.

    The following screenshot shows the model picker for Ollama running locally, with the Phi-4 model deployed.

    ![Screenshot that shows the model picker of Ollama running locally, allowing you to select a model from the list of available models.](images/language-models/ollama-installed-models-quick-pick.png)

1. You can now select the model from the model picker in the Chat view and use it for chat conversations.

### Update the provider details

To update the provider details, such as the API key or endpoint URL:

1. Select **Manage Models** from the language model picker in the Chat view.

   Alternatively, run the **GitHub Copilot: Manage Models** command from the Command Palette.

1. Hover over a model provider in the list, and select the gear icon to edit the provider details.

   ![Screenshot that shows the model provider Quick Pick, with a gear icon next to the provider name.](images/language-models/reconfigure-model-provider.png)

1. Update the provider details, such as the API key or endpoint URL.

### Considerations

There are a number of considerations when using your own language model API key in VS Code:

- Bringing your own model only applies to the chat experience and doesn't impact code completions or other AI-powered features in VS Code, such as commit-message generation.
- The capabilities of each model might differ from the built-in models and could affect the chat experience. For example, some models might not support vision or tool calling.
- The Copilot API is still used for some tasks, such as sending embeddings, repository indexing, query refinement, intent detection, and side queries.
- When using your own model, there is no guarantee that responsible AI filtering is applied to the model's output.

## Frequently asked questions

### Why is bring your own model key not available for Copilot Business or Copilot Enterprise?

Bringing your own model key is not available for Copilot Business or Copilot Enterprise because it's mainly meant to allow users to experiment with the newest models the moment they are announced, and not yet available as a built-in model in Copilot.

Bringing your own model key will come to Copilot Business and Enterprise plans later this year, as we better understand the requirements that organizations have for using this functionality at scale. Copilot Business and Enterprise users can still use the built-in, managed models.

## Related resources

- [Available language models in GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode)
