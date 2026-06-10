---
Order: 131
TOCTitle: Bring Your Own Key
PageTitle: "Use your own language model key or local model in VS Code"
MetaDescription: Learn how to use bring your own key (BYOK) in VS Code to add models from providers like Azure, Anthropic, Gemini, OpenAI, Huggingface, OpenRouter, or use a local model with Ollama, Foundry Local, and more.
MetaSocialImage: language-models-editor.png
Date: 2026-06-09
Author: Kayla Cinnamon
---

# Use your own language model key in VS Code

June 9, 2026 by [Kayla Cinnamon](https://github.com/cinnamon-msft)

Model choice is moving fast, and we want to support flexibility. Sometimes you want the built-in models available through GitHub Copilot. Sometimes you want to try a new model from a provider your team already uses. Sometimes you want to experiment locally. VS Code allows you to do all of these workflows with bring your own language model key (BYOK) and bring your own local model.

With BYOK in VS Code, you can add models from providers like Azure, Anthropic, Huggingface, Gemini, OpenAI, OpenRouter, or you can run a model locally with Ollama, Foundry Local, and more, then use them directly from the Chat model picker.

![The VS Code Chat model picker showing available language models.](model-dropdown-change-model-v2.png)

## What is BYOK?

BYOK lets you use a language model from a supported provider by adding your own API key or endpoint configuration in VS Code. Once configured, those models appear in the same Chat model picker you already use for Copilot. Support is built in for several providers and VS Code is extensible, so any model provider can enable support through an extension.

This gives you more choice for chat and agent workflows. For example, you can:

- Try models that are not built into VS Code.
- Use a provider your organization already has billing or governance set up for.
- Connect to local models through providers such as Ollama or Foundry Local.
- Pick different models for different tasks, such as quick Q&A, planning, or multi-step agent work.

The goal is to allow you to choose the right model and keep working.

## What BYOK works with

BYOK models are available for VS Code chat experiences, including agent workflows when the selected model supports the required capabilities.

There are a few important details to keep in mind:

- BYOK models work without signing into a GitHub account and **without** a Copilot plan. You can add and use models entirely with your own API keys, including fully **offline scenarios with local models**.
- BYOK applies to chat and utility tasks, not standard code completions.
- Some AI features, such as semantic search, inline suggestions, and features that rely on embeddings, still require a GitHub account or Copilot support.
- Usage for provider-backed BYOK models is billed directly by that provider and does not count against GitHub Copilot request quotas.
- For Copilot Business and Enterprise, organization administrators can control BYOK availability through Copilot policy settings.

In other words, BYOK expands model choice in VS Code Chat, but it does not replace every Copilot-powered feature in the editor.

## Configuring BYOK in the Language Models editor

The easiest way to get started is through the **Language Models** editor.

You can open it from the Chat model picker by selecting the **Manage Language Models** gear icon, or you can run **Chat: Manage Language Models** from the Command Palette.

![The Language Models editor in VS Code.](language-models-editor.png)

The Language Models editor shows the models available to you, grouped by provider. It also shows useful details like model capabilities, context size, billing information, and whether a model is visible in the picker.

This is also where you can keep the model picker focused. If you are testing several providers, you can hide models you do not use often and keep your day-to-day models easy to find.

## Adding models from a built-in provider

If the provider you want is built into VS Code, setup is a few clicks.

1. Open **Chat: Manage Language Models**.
2. Select **Add Models**.
3. Choose a provider.
4. Enter a group name for the models. This is the label shown in the model picker and Language Models editor.
5. Enter the provider details, such as an API key, endpoint, deployment name, or other required configuration.
6. Select the model from the Chat model picker.

![The model provider picker in VS Code.](model-provider-quick-pick-v2.png)

Depending on the provider, VS Code might open a `chatLanguageModels.json` file so you can finish configuring model details.

For example, an Azure OpenAI configuration can include a deployment name, endpoint URL, and capability information:

```json
[
  {
    "name": "Azure",
    "vendor": "azure",
    "models": [
      {
        "id": "<my-deployment-name>",
        "name": "GPT-5.5",
        "url": "https://<my-endpoint>.openai.azure.com",
        "toolCalling": true,
        "vision": true,
        "maxInputTokens": 200000,
        "maxOutputTokens": 64000
      }
    ]
  }
]
```

The exact fields depend on the provider and model. The important part is that after the provider is configured, the model becomes available from the same picker you use for the rest of Chat. For more information, check out the docs: https://code.visualstudio.com/docs/agent-customization/language-models#_add-a-model-from-a-built-in-provider.

## Adding models from extensions

VS Code also supports language model provider extensions. These extensions can contribute models directly into the Language Models editor and Chat model picker.

To find provider extensions:

1. Open the Extensions view.
2. Search for `@tag:language-models`.
3. Install the provider extension you want to use.
4. Follow the extension's setup instructions.
5. Select the model from the Chat model picker.

![Extensions with language models](language-models-extensions.png)

This extensibility is a big part of the BYOK story. Instead of every provider needing to be hard-coded into VS Code, extensions can bring new model providers into the editor as the ecosystem evolves.

## Adding a custom endpoint (VS Code Insiders)

If you have a self-hosted, enterprise, or compatible API endpoint, you can add it with the **Custom Endpoint** provider. This feature is currently available in [VS Code Insiders](https://code.visualstudio.com/insiders/) only.

Custom Endpoint supports API types such as Chat Completions, Responses, and Messages. This is useful when your model is not available from a built-in provider but exposes an API that VS Code can call.

The flow is similar to adding a built-in provider:

1. Open **Chat: Manage Language Models**.
2. Select **Add Models**.
3. Choose **Custom Endpoint**.
4. Enter the group name, display name, API key, and API type.
5. Update the generated `chatLanguageModels.json` configuration with your model details.
6. Save the file and select the model in Chat.

If a model does not appear immediately, try reloading VS Code.

## Managing and reconfiguring models

After you add a provider, you can return to the Language Models editor to update it. Select the gear icon next to a provider to change details such as the API key, endpoint, or model configuration.

![Reconfiguring a model provider in the Language Models editor.](reconfigure-model-provider.png)

You can also decide which models appear in the picker. I like this because it lets me experiment without turning the picker into a wall of model names. Keep the models you use every day visible, and hide the ones you only need occasionally.

## Choosing the right model

One of the best parts of BYOK is that you do not have to use one model for everything.

For everyday work, you might choose:

- A fast model for quick questions, summaries, and small edits.
- A reasoning model for planning, debugging, or complex refactors.
- A local model when you want to experiment offline.
- A provider-specific model when your team already has workflows around that provider.

## Try it out

BYOK gives you more flexibility in VS Code without adding more tools to your workflow. You can keep using the built-in Copilot models, add models from providers you already use, experiment with local models, and choose the right model for each task from one place.

To learn more, check out the VS Code docs on [AI language models](https://code.visualstudio.com/docs/agent-customization/language-models), the VS Code blog post on [Expanding Model Choice in VS Code with Bring Your Own Key](https://code.visualstudio.com/blogs/2025/10/22/bring-your-own-key), and the GitHub changelog entry for [BYOK availability in VS Code](https://github.blog/changelog/2026-04-22-bring-your-own-language-model-key-in-vs-code-now-available/).

We are continuing to improve model choice in VS Code, and your feedback helps shape what comes next. Try BYOK with your workflow and let us know what you think in the [VS Code repository](https://github.com/microsoft/vscode).

Happy coding! 💙
