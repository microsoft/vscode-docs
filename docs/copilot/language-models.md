---
ContentId: 33e63aa1-1d8f-4d23-9733-1475f8c9f502
DateApproved: 04/03/2025
MetaDescription: Learn how to choose between different AI language models and how to use your own language model API key in Visual Studio Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# AI language models in VS Code

Copilot in Visual Studio Code offers different built-in language models that are optimized for different tasks. You can also bring your own language model API key to use models from other providers. This article describes how to change the language model for chat or code completions, and how to use your own API key.

## Choose the right model for your task

Some models are optimized for fast coding tasks, while others are better suited for slower planning and reasoning tasks.

| Model type | Models |
|-----------|--------|
| Fast coding | <ul><li>GPT-4o</li><li>Claude Sonnet 3.5</li><li>Claude Sonnet 3.7</li><li>Gemini 2.0 Flash</li></ul> |
| Reasoning/planning | <ul><li>Claude Sonnet 3.7 Thinking</li><li>o1</li><li>o3-mini</li></ul> |

For a detailed comparison of AI models, see [Choosing the right AI model for your task](https://docs.github.com/en/copilot/using-github-copilot/ai-models/choosing-the-right-ai-model-for-your-task) in the GitHub Copilot documentation.

Depending on which [chat mode](/docs/copilot/chat/copilot-chat.md#chat-mode) you are using, the list of available models might be different. In agent mode, the list of models is limited to those that have good support for tool calling.

The list of [models available in Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode) can change over time.

> [!NOTE]
> If you are a Copilot Business or Enterprise user, your administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

## Change the model for chat conversations

Use the language model picker in the chat input field to change the model that is used for chat conversations and code editing.

![Screenshot that shows the model picker in the Chat view.](images/language-models/model-dropdown-change-model.png)

You can further extend the list of available models by [using your own language model API key](#bring-your-own-language-model-key).

## Change the model for code completions

To change the language model that is used for generating code completions in the editor:

1. Select **Configure Code Completions...** from the Copilot menu in the VS Code title bar.

1. Select **Change Completions Model...**, and then select one of the models from the list.

## Bring your own language model key

If you already have an API key for a language model provider, you can use their models in chat in VS Code, in addition to the built-in models that Copilot provides. You can use models from the following providers: Anthropic, Azure, Google Gemini, Ollama, OpenAI, and OpenRouter.

> [!IMPORTANT]
> This feature is currently in preview and is only available for GitHub Copilot Free and GitHub Copilot Pro users.

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

## Related resources

* [Available language models in GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode)
