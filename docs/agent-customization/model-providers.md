---
ContentId: 8c5d9e2a-4f1b-4b7e-9a3c-6d2f8e1a4b90
DateApproved: 11/26/2026
MetaDescription: Add BYOK model providers, custom API endpoints, and on-device or local models in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: images/language-models/language-models-editor.png
Keywords:
- language models
- BYOK
- bring your own key
- custom endpoint
- local models
- on-device models
- ollama
- model providers
---
# Add model providers and local models

Connect your own language model providers or run models locally in {% data variables.product.prodname_vscode %}. Use this guide to add models with your own API key (BYOK), connect a custom API endpoint, install a model provider extension, or run {% data variables.product.prodname_copilot_short %}-managed on-device models.

To switch between available models, configure thinking effort, or use Auto, Copilot Fusion, and model routers, see [Choose and configure language models](/docs/agent-customization/language-models.md). For background on model access and hosting, see [Understand language models](/docs/agents/concepts/language-models.md#model-access-hosting-and-byok).

## Bring your own language model key

Bring Your Own Key (BYOK) lets you connect to any compatible model provider while still using the {% data variables.product.prodname_vscode_shortname %} chat experience and tools. You can use BYOK to access models from other providers, to run models locally, or to use models that are not yet available as built-in options in {% data variables.product.prodname_vscode_shortname %}.

You can also use these BYOK models to [override the models used for utility tasks in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/language-models.md#configure-models-for-other-features) such as title generation and intent detection.

Some features still require a GitHub account: semantic search, inline suggestions (code completions), and features that rely on embeddings. BYOK applies to the chat experience and utility tasks only.

How BYOK models work depends on the agent harness you use:

* **[{% data variables.product.prodname_copilot_short %} harness](/docs/agents/run/agent-harnesses.md#copilot):** Enable `setting(chat.agentHost.byokModels.enabled)` `feature(agent-host-byok-models)` to use supported BYOK models in the {% data variables.copilot.chat_view %} or [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md). For sign-in requirements, see [{% data variables.copilot.agents_window %} accounts and provider credentials](/docs/agents/run/agents-window-configuration.md#manage-ai-providers-and-accounts).

* **{% data variables.product.prodname_anthropic_claude_short %} or {% data variables.product.prodname_openai_codex_short %} harness:** Follow that [harness's setup requirements](/docs/agents/run/agent-harnesses.md#requirements-and-setup). Adding a model in the Language Models editor does not configure authentication for every harness.

* **[Local harness](/docs/agents/run/agent-harnesses.md#local) `feature(local-harness)`:**  BYOK models work without enabling `setting(chat.agentHost.byokModels.enabled)` and without {% data variables.product.prodname_github %} sign-in or a {% data variables.product.prodname_copilot_short %} plan, including offline scenarios with local models such as Ollama. Plan to [move from the Local to the Copilot harness](/docs/agents/run/move-to-copilot.md) before the Local harness is removed.

{% data variables.product.prodname_vscode_shortname %} provides different options to add BYOK language models:

* [Built-in providers](#add-a-model-from-a-built-in-provider): The provider you want is already listed (Azure, Anthropic, Gemini, OpenAI, and others).

* [VS Code extensions](#add-a-model-provider-extension): A marketplace extension provides the model, for example Foundry Toolkit for local models.

* [Custom endpoint](#add-a-custom-endpoint-model): You have a self-hosted, enterprise, or other endpoint that speaks Chat Completions, Responses, or Messages API.

> [!NOTE]
> If you are a {% data variables.copilot.copilot_business_short %} or Enterprise user, your administrator can disable the **Bring Your Own Language Model Key in {% data variables.product.prodname_vscode_shortname %}** policy in the [Copilot policy settings](https://github.com/settings/copilot/features) on GitHub.com. For more details, see the [GitHub Copilot documentation](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-your-own-api-keys).

### Add a model from a built-in provider

Pick from a set of common providers that are ready to use in {% data variables.product.prodname_vscode_shortname %}. Depending on the provider, you need an API key and other configuration details like the endpoint URL.

To configure a language model from a built-in provider:

1. Run the **Chat: Manage Language Models** command from the Command Palette to open the Language Models editor.

1. Select **Add Models**, and then select a model provider from the list.

    ![Screenshot that shows the model provider Quick Pick.](images/language-models/model-provider-quick-pick-v2.png)

1. Enter a group name for the models. This is the grouping label shown in the model picker and Language Models editor.

    You can change the group name later from the Language Models editor if needed.

1. Enter the provider-specific details, such as the API key or endpoint URL.

1. If the provider requires additional configuration, {% data variables.product.prodname_vscode_shortname %} opens a `chatLanguageModels.json` file where you can configure the provider and model details. See the [Model configuration reference](#model-configuration-reference) for details on the configuration properties.

    The following example shows an Azure OpenAI configuration that uses Entra ID authentication:

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

1. After configuring the model, you can select it from the model picker in chat.

    For a model to be available when using agents in chat, it must support tool calling. If the model doesn't support tool calling, it won't be shown in the model picker.

> [!IMPORTANT]
> The built-in Ollama provider is deprecated. For local Ollama models, install the official Ollama extension from the [Ollama publisher on the {% data variables.product.prodname_vs_marketplace %}](https://marketplace.visualstudio.com/publishers/Ollama) instead. The extension is maintained by the Ollama team, so it can support new Ollama models and capabilities faster than the built-in provider. If you use the built-in Ollama provider for BYOK local models, install the extension and remove the built-in provider configuration to keep using Ollama models without interruption.

### Add a model provider extension

You can install extensions from the {% data variables.product.prodname_vs_marketplace %} that add language model providers to {% data variables.product.prodname_vscode_shortname %}. These extensions can provide access to additional cloud-hosted or locally running models. For example, the Foundry Toolkit for {% data variables.product.prodname_vscode_shortname %} extension provides access to Foundry's local and cloud-hosted models.

To add a model provider extension:

1. Run the **Chat: Manage Language Models** command from the Command Palette to open the Language Models editor.

1. Select **Install Model Providers**.

    {% data variables.product.prodname_vscode_shortname %} opens the Extensions view, filtered to language model provider extensions. Alternatively, open the Extensions view and search for `@tag:language-models`.

1. Select **Install** to install the extension, for example, [Foundry Toolkit for {% data variables.product.prodname_vscode_shortname %}](https://aka.ms/AIToolkit).

1. Follow the extension's setup instructions to configure model access.

1. The extension's models appear in the model picker in chat and in the Language Models editor. If the models don't appear, reload {% data variables.product.prodname_vscode_shortname %}.

### Add a custom endpoint model

The Custom Endpoint provider lets you connect any compatible API endpoint to chat in {% data variables.product.prodname_vscode_shortname %}. It supports three API types, which you can select per provider or per model: Chat Completions, Responses, and the Anthropic Messages API. This makes it a good fit for self-hosted models, enterprise gateways, and providers that aren't available as a built-in provider.

To add a model with the Custom Endpoint provider:

1. Open the Language Models editor by selecting **Manage Language Models** (gear icon) from the language model picker or via the **Chat: Manage Language Models** command from the Command Palette.

1. Select **Add Models**, and then select **Custom Endpoint** from the list.

1. Enter a group name for the models. This is the grouping label shown in the model picker and Language Models editor.

    You can change the group name later from the Language Models editor if needed.

1. Enter a display name and API key for the endpoint.

1. Select the API type: **Chat Completions**, **Responses**, or **Messages**. Make sure the model supports this API type.

1. {% data variables.product.prodname_vscode_shortname %} opens a `chatLanguageModels.json` file where you can configure the model details. Update the model properties and save the file. See the [Custom Endpoint configuration reference](#custom-endpoint-configuration-reference) for details on the configuration properties.

    The following example shows a Messages API configuration for an Anthropic endpoint:

    ```json
    [
      {
        "name": "Anthropic",
        "vendor": "customendpoint",
        "apiKey": "${input:anthropicApiKey}",
        "apiType": "messages",
        "models": [
          {
            "id": "claude-sonnet-4-6",
            "name": "Claude Sonnet 4.6",
            "url": "https://api.anthropic.com/v1/messages",
            "toolCalling": true,
            "vision": true,
            "maxInputTokens": 200000,
            "maxOutputTokens": 64000
          }
        ]
      }
    ]
    ```

1. After configuring the model, select it from the model picker in chat. Restart {% data variables.product.prodname_vscode_shortname %} if the model does not appear immediately.

> [!NOTE]
> The Custom Endpoint provider replaces the deprecated OpenAI Compatible provider and supports additional API types. The `setting(github.copilot.chat.customOAIModels)` setting is deprecated.

## Update model provider details

To update the details of a model provider you configured previously:

1. Run the **Chat: Manage Language Models** command from the Command Palette to open the Language Models editor.

1. In the Language Models editor, select the gear icon next to the model provider you want to update.

   ![Screenshot that shows the model provider Quick Pick, with a gear icon next to the provider name.](images/language-models/reconfigure-model-provider.png)

1. Update the provider details, such as the API key or endpoint URL.

## Use on-device models

`feature(on-device-models)`

On-device models let you run a coding model provided by {% data variables.product.prodname_copilot_short %}, currently MAI Code 1.1 Flash, directly on your device in Copilot harness sessions. {% data variables.product.prodname_vscode_shortname %} uses [llama.cpp](https://github.com/ggml-org/llama.cpp) to serve the model on your device. On-device models bring that capability to {% data variables.product.prodname_copilot_short %} in {% data variables.product.prodname_vscode_shortname %}, without you having to find, download, and serve a model yourself.

You can use the local model alongside cloud models. [Auto-model selection](/docs/agent-customization/language-models.md#use-auto-model-selection) can route suitable requests to the local model, with fallback to a cloud model.

On-device models differ from [BYOK local models](#bring-your-own-language-model-key). {% data variables.product.prodname_copilot_short %} provides and manages on-device models, and they require GitHub sign-in. BYOK local models, such as Ollama, work without sign-in through a provider that you configure.

<video src="images/language-models/on-device-model.mp4" title="Video showing MAI Code 1.1 Flash downloaded from the On This Device tab in the model picker, loaded, and answering a chat prompt on the device." autoplay loop controls muted></video>

### On-device model requirements

* Sign in to GitHub with Copilot access. If you use {% data variables.copilot.copilot_business_short %} or Enterprise, your administrator must enable `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization).

* Use a [Copilot harness session](/docs/agents/run/agent-harnesses.md) that runs on your local machine in the {% data variables.copilot.chat_view %} or [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).

* Use an NVIDIA GPU with 96 GB or more of GPU memory (VRAM). Devices with unified memory, memory that the GPU shares with the system, count toward this requirement.

* Have about 55 GB of free disk space for MAI Code 1.1 Flash. The download is 52.8 GB, and setup requires 54.8 GB of free space. The details page in the model picker shows the exact size for your device.

* Install a llama.cpp build that supports the model. {% data variables.product.prodname_vscode_shortname %} does not install llama.cpp. Get a build from the [llama.cpp releases page](https://github.com/ggml-org/llama.cpp/releases). MAI Code 1.1 Flash requires llama.cpp b11658 or later. If the build is too old, the model picker shows a notification that a newer version is needed.

### Set up an on-device model

1. Install a llama.cpp build for your platform and GPU.

1. Set `setting(chat.copilot.localModel.llamaServerPath)` to the absolute path of the `llama-server` executable. This setting is machine-scoped. {% data variables.product.prodname_vscode_shortname %} only runs the `llama-server` executable at this path.

1. Enable `setting(chat.copilot.localModel.enabled)` `feature(on-device-models)`. When you change this setting, the local Copilot runtime restarts after active responses finish.

1. In a Copilot harness session, open the model picker and select the **On This Device** tab. Models that are not downloaded appear dimmed with a **Download** action.

    ![Screenshot showing the On This Device tab in the model picker with MAI Code 1.1 Flash and a Download action.](images/language-models/on-device-model-picker-2.png)

1. Select the model name to open its details, review the download size, source (Azure ML registry), and license, and then select **Download**.

    ![Screenshot showing the details page for MAI Code 1.1 Flash with the download size, source, license, and a Download button.](images/language-models/on-device-model-download-details-2.png)

1. Track progress in the notice above the chat input. You can keep using Copilot while the model downloads, and select **Pause** to pause the download.

    ![Screenshot showing a download progress notice for MAI Code 1.1 Flash above the chat input with a Pause button.](images/language-models/on-device-model-download-progress-2.png)

{% data variables.product.prodname_vscode_shortname %} stores models in `~/.copilot/azureml-models` and shares them with other Copilot apps, such as {% data variables.copilot.copilot_cli_short %}.

### Use an on-device model in chat

After the download finishes, {% data variables.product.prodname_vscode_shortname %} verifies the files and loads the model. Loading can take a few minutes, and the notice above the chat input shows the progress, with a **Cancel** action. When the model is ready, select **Switch to MAI Code 1.1 Flash** in the notice, or select the model from the **On This Device** tab.

![Screenshot showing a notice above the chat input that says MAI Code 1.1 Flash is ready on this device, with Not Now and Switch to MAI Code 1.1 Flash buttons.](images/language-models/on-device-model-ready-2.png)

When you select an on-device model, the model picker and the footer of each response show the model name followed by **On-device**. On-device responses don't use AI credits, and the response footer shows **0 credits**.

![Screenshot showing a chat response labeled MAI Code 1.1 Flash On-device with 0 credits, and the model picker showing the on-device model.](images/language-models/on-device-model-response-2.png)

To change how the model runs, hover over the model in the **On This Device** tab and select **Details**. On the details page, you can:

* Choose the **Effort Level**: **Low**, **Medium**, or **High**.
* Choose the **Context** size. The available sizes depend on the GPU memory of your device, and the page shows the estimated memory for the selected size. Changing the context size reloads the model after running responses finish.
* Stop or remove the model by using the icons at the top of the page.

![Screenshot showing the details page of an installed on-device model with Effort Level, Context, and Use in Auto options.](images/language-models/on-device-model-details-2.png)

### Use an on-device model with auto-model selection

[Auto-model selection](/docs/agent-customization/language-models.md#use-auto-model-selection) can route requests to the active on-device model, with cloud fallback. If the on-device model can't respond, model selection falls back to a cloud model before the first output. The change takes effect immediately.

To enable the local model for auto-model selection, enable **Use in Auto** on the model's details page, or enable `setting(chat.copilot.localModel.useInAuto)`.

Auto-model selection chooses the appropriate model for each request, so many requests continue to use cloud models. Responses that use the local model are labeled **On-device**. If a model is too slow for auto-model selection on your device, it shows **Too slow for Auto**. You can still select the model directly.

> [!CAUTION]
> Local models might not use the same safety filters as {% data variables.product.prodname_copilot %}-provided cloud models and might be more susceptible to malicious instructions, especially when [actions are automatically approved](/docs/agents/run/approvals.md).

### Manage on-device models

Use these commands from the Command Palette:

* **Chat: Set Up On-Device Model**
* **Chat: Make On-Device Model Active**
* **Chat: Start On-Device Model**
* **Chat: Stop On-Device Model**
* **Chat: Update On-Device Model**
* **Chat: Resume On-Device Model Download**
* **Chat: Cancel On-Device Model Download**
* **Chat: Retry On-Device Model Setup**
* **Chat: Remove On-Device Model**

Only one on-device model is loaded at a time. Loading another model unloads the active model. Removing a model asks for confirmation.

### Troubleshoot on-device models

If a model can't be set up or loaded, the **On This Device** tab shows a status, and the notice above the chat input offers actions such as **Get llama.cpp**, **Open Settings**, and **Retry**.

| Status | What to do |
|--------|------------|
| **Needs llama.cpp** | Install llama.cpp and set `setting(chat.copilot.localModel.llamaServerPath)` to its `llama-server` executable. |
| **llama.cpp is too old** or **Needs a newer llama.cpp** | Install a newer llama.cpp release, update the setting, and select **Retry**. |
| **GPU driver needed** | Install or update the NVIDIA GPU driver. |
| **Not enough GPU memory** | Choose a smaller context size, or use a device with more GPU memory. |
| **GPU memory busy** | Close other apps that use the GPU, and then select **Retry**. |
| **Running in another window** | The model is already running in another {% data variables.product.prodname_vscode_shortname %} window. Use it there or stop it first. |
| **Not enough disk space** | Free up disk space, and then resume the download. |
| **Download interrupted** | Check your network connection, and then resume the download. |
| **Blocked by policy** | Your organization's policy blocks the llama.cpp executable. Contact your administrator. |

## Model configuration reference

When you add a BYOK model, you can configure the model properties in the `chatLanguageModels.json` file. The configuration has two levels: provider-level and model-level.

Depending on the provider, some provider and model properties might be required while others are optional. For example, some providers only require an API key and endpoint URL and discover the available models automatically, while others require you to specify the details for each model.

The provider-level properties include:

| Property | Description |
|----------|-------------|
| `vendor` | The provider of the model, for example `azure`, `openai`, or `customendpoint`. |
| `name` | The display name (group name) of the provider shown in the UI. |
| `models` | _(Optional)_ An array of model configurations provided by this provider. |

Each model in the `models` array supports the following properties:

| Property | Description |
|----------|-------------|
| `id` | Model identifier sent to the API. For example, for Foundry this is the deployment name. |
| `name` | Display name shown in the model picker. |
| `url` | Full endpoint URL for the model. |
| `apiType` | _(Optional)_ Override the API type per model (`chat-completions`, `responses`, or `messages`). Defaults to the provider-level `apiType`. |
| `toolCalling` | Set to `true` if the model supports tool calling. |
| `vision` | Set to `true` if the model supports image inputs. |
| `maxInputTokens` | Maximum number of input tokens the model accepts. Together with `maxOutputTokens`, this defines the model's context window. |
| `maxOutputTokens` | Maximum number of output tokens the model generates. Together with `maxInputTokens`, this defines the model's context window. |
| `editTools` | _(Optional)_ An array of edit tools the model supports. If not configured, the editor tries multiple edit tools and picks the best one. Possible values: `find-replace`, `multi-find-replace`, `apply-patch`, `code-rewrite`. |
| `thinking` | _(Optional)_ Set to `true` if the model supports thinking capabilities. Defaults to `false`. |
| `streaming` | _(Optional)_ Set to `true` if the model supports streaming responses. Defaults to `true`. |
| `zeroDataRetentionEnabled` | _(Optional)_ Set to `true` if Zero Data Retention (ZDR) is enabled for this endpoint. When enabled, `previous_response_id` is not sent in requests via the Responses API. Defaults to `false`. |
| `supportsReasoningEffort` | _(Optional)_ An array of reasoning effort levels the model accepts (for example, `["low", "medium", "high"]`). When set, a **Thinking Effort** picker is shown in the model picker. Common levels are `minimal`, `low`, `medium`, `high`. |
| `reasoningEffortFormat` | _(Optional)_ Body shape used to forward reasoning effort to the model. `chat-completions` sends a top-level `reasoning_effort` string, `responses` sends a nested `reasoning.effort` object, and `messages` sends `output_config.effort`. When unset, the format follows the URL. |
| `requestHeaders` | _(Optional)_ An object of additional HTTP headers to include with requests to this model. Certain reserved headers (forbidden, forwarding, and internal headers) are not allowed and are ignored if present. |

> [!NOTE]
> The sum of `maxInputTokens` and `maxOutputTokens` must not exceed the model's context window. {% data variables.product.prodname_vscode_shortname %} uses the sum of these two values as the model's total context window, for example to show context usage in the {% data variables.copilot.chat_view %}. Typically, you set `maxInputTokens` to the model's context window size minus `maxOutputTokens`. Check your provider's model documentation for the context window size.

### Custom Endpoint configuration reference

In addition to the common properties above, the Custom Endpoint provider supports extra provider-level and model-level properties. When a property is set on both levels, the model-level value takes precedence.

Provider-level properties:

| Property | Description |
|----------|-------------|
| `vendor` | Must be `customendpoint` to use the Custom Endpoint provider. |
| `apiKey` | The API key used to authenticate requests. Store the key securely by using an input variable, for example `"apiKey": "${input:myApiKey}"`, instead of committing a raw key. |
| `apiType` | _(Optional)_ Default API type for all models in the provider: `chat-completions` (default), `responses`, or `messages`. Override it per model with the model-level `apiType`. |
| `url` | _(Optional)_ Base URL used to discover models automatically. When set, {% data variables.product.prodname_vscode_shortname %} queries the endpoint for the list of available models instead of using the `models` array. Omit it to configure models explicitly with the `models` array. |

Model-level properties:

| Property | Description |
|----------|-------------|
| `apiType` | _(Optional)_ Override the API type for this model (`chat-completions`, `responses`, or `messages`). Defaults to the provider-level `apiType`, or is inferred from the `url` when neither is set. |
| `contextWindow` | _(Optional)_ The model's full context window (input + output) in tokens, for example `1000000` for a 1M-token model. When set, you can omit `maxInputTokens` and {% data variables.product.prodname_vscode_shortname %} derives it as `contextWindow - maxOutputTokens`. |
| `modelOptions` | _(Optional)_ An object of request parameters sent with every request to the model, such as `temperature` and `top_p`. For example, `"modelOptions": { "temperature": 0.2 }`. |
| `requestHeaders` | _(Optional)_ An object of additional HTTP headers to include with requests to this model, for example to authenticate through a gateway or vanity domain. See [Custom authentication headers](#custom-authentication-headers). |
| `statefulResponses` | _(Optional)_ Whether the Responses API server retains prior responses. Defaults to `true`. Set to `false` for stateless servers to send full conversation history with each request. Applies only to the Responses API. See [Stateful Responses API endpoints](#stateful-responses-api-endpoints). |

#### Endpoint URL resolution

The `url` you provide for a model is resolved based on its API type:

* If the URL already contains an explicit API path (`/chat/completions`, `/responses`, or `/messages`), it is used as-is.
* Otherwise, {% data variables.product.prodname_vscode_shortname %} appends the path for the model's API type. If the URL doesn't already end in a version segment such as `/v1`, {% data variables.product.prodname_vscode_shortname %} inserts `/v1` first. For example, with the Responses API type, `https://my-host.example.com` resolves to `https://my-host.example.com/v1/responses`.

To avoid ambiguity, provide the full endpoint URL including the API path, as shown in the examples.

#### Stateful Responses API endpoints

Responses API models default to `statefulResponses: true`, sending only new history with `previous_response_id`. For stateless servers, set `statefulResponses` to `false` to omit that ID and send full history, including tool calls and results, avoiding missing-tool-call errors.

For a stateless server, add these properties to its model entry in `chatLanguageModels.json`:

```json
{
  "apiType": "responses",
  "statefulResponses": false
}
```

This option describes the server's capabilities and does not change its data retention policy. When `zeroDataRetentionEnabled` is `true`, `statefulResponses` is ignored and requests send full conversation history without `previous_response_id`.

#### Custom authentication headers

By default, the Custom Endpoint provider infers the authentication header from the API type and URL. For the Messages API, it sends `x-api-key`. For Azure OpenAI URLs, it sends `api-key`. Otherwise, it sends `Authorization: Bearer <apiKey>`.

You can override the authentication header with `requestHeaders`. When you supply a well-known auth header (such as `Authorization`, `api-key`, `x-api-key`, `x-goog-api-key`, or `apikey`), {% data variables.product.prodname_vscode_shortname %} does not also send the default inferred auth header, so the endpoint doesn't receive conflicting credentials.

To keep your API key in secret storage while still using it in a custom header, use the `${apiKey}` token in the header value. {% data variables.product.prodname_vscode_shortname %} replaces it with the configured `apiKey` at request time:

```json
[
  {
    "name": "Gateway",
    "vendor": "customendpoint",
    "apiKey": "${input:myApiKey}",
    "models": [
      {
        "id": "my-model",
        "name": "My Model",
        "url": "https://gateway.example.com/v1/chat/completions",
        "toolCalling": true,
        "vision": false,
        "maxInputTokens": 128000,
        "maxOutputTokens": 16000,
        "thinking": true,
        "supportsReasoningEffort": ["low", "medium", "high"],
        "reasoningEffortFormat": "chat-completions",
        "modelOptions": {
          "temperature": 0.2,
          "top_p": 0.9
        },
        "requestHeaders": {
          "Authorization": "Bearer ${apiKey}",
          "Ocp-Apim-Subscription-Key": "my-subscription-key"
        }
      }
    ]
  }
]
```

## Frequently asked questions

### How do I enable bring your own model key for {% data variables.copilot.copilot_business_short %} or {% data variables.copilot.copilot_enterprise_short %}?

If you are a {% data variables.copilot.copilot_business_short %} or Enterprise user, your organization administrator must enable the **Bring Your Own Language Model Key in {% data variables.product.prodname_vscode_shortname %}** policy in the [Copilot policy settings](https://github.com/settings/copilot/features) on GitHub.com. After the policy is enabled, you can use your own API keys to add models, just like individual plan users. For more details, see the [GitHub Copilot documentation](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-your-own-api-keys).

### Can I use locally hosted models with Copilot in {% data variables.product.prodname_vscode_shortname %}?

You have two options to use locally hosted models in chat:

* **BYOK local models**: Use [bring your own model key](#bring-your-own-language-model-key) (BYOK) with a model provider that supports connecting to a local model. You can use a built-in model provider that supports local models or install an extension from the [{% data variables.product.prodname_vs_marketplace %}](https://marketplace.visualstudio.com/search?term=tag%3Alanguage-models&target=VSCode&category=All%20categories&sortBy=Relevance), such as [Foundry Toolkit for {% data variables.product.prodname_vscode_shortname %}](https://aka.ms/AIToolkit). BYOK local models work without a GitHub account, a Copilot plan, or an internet connection.

* **On-device models (Experimental)**: Use a [Copilot-managed model](#use-on-device-models) that runs on supported NVIDIA hardware. On-device models require GitHub sign-in.

To get the full set of utility features with a BYOK local model, such as title generation and commit messages, configure `setting(chat.utilityModel)` and `setting(chat.utilitySmallModel)` to point to the local model.

Currently, you cannot connect to a local model for inline suggestions. {% data variables.product.prodname_vscode_shortname %} provides an extension API (`InlineCompletionItemProvider`) that enables extensions to contribute a custom completion provider. You can get started with our [Inline Completions sample](https://github.com/microsoft/vscode-extension-samples/blob/main/inline-completions).

> [!NOTE]
> Some features require a GitHub account and internet connectivity: semantic search, inline suggestions (code completions), and features that rely on embeddings. These features are not available through BYOK models.

### Can I use a local model without an internet connection?

Yes, you can use a BYOK local model completely offline. Add a local model provider such as Ollama by using the **Chat: Manage Language Models** command, select the model in chat, and start using it. To also enable utility features like title generation and commit messages, set `setting(chat.utilityModel)` and `setting(chat.utilitySmallModel)` to a local model. Features that depend on the {% data variables.product.prodname_copilot %} service, such as semantic search, inline suggestions, and embeddings, are not available offline.

### Can I use a local model without a Copilot plan?

Yes, you can use BYOK models, including local models, without a Copilot plan and without signing into a GitHub account. Add a model with the **Chat: Manage Language Models** command and select it in chat. Features that depend on the {% data variables.product.prodname_copilot %} service, such as semantic search, inline suggestions, and embeddings, require a Copilot plan.

## Related resources

* [Choose and configure language models](/docs/agent-customization/language-models.md)
* [Understand language models](/docs/agents/concepts/language-models.md)
* [Security considerations for AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
