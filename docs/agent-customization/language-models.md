---
ContentId: 33e63aa1-1d8f-4d23-9733-1475f8c9f502
DateApproved: 11/25/2026
MetaDescription: Choose and configure language models for chat, inline editing, and utility tasks in {% data variables.product.prodname_vscode_shortname %}.
Keywords:
- language models
- BYOK
- bring your own key
- copilot
- ai
- local models
- customize
---
# AI language models in {% data variables.product.prodname_vscode_shortname %}

{% data variables.product.prodname_vscode %} gives you access to multiple built-in language models, each optimized for different tasks. You can switch models for chat, inline suggestions, and utility tasks, and you can add more models by bringing your own API key.

For background on how language models work, their characteristics, and how to choose the right model, see [Language models concepts](/docs/agents/concepts/language-models.md).

## Choose how to access models

Start with the account, credentials, or model you already have:

* **{% data variables.product.prodname_copilot %} access**: [Set up {% data variables.product.prodname_copilot_short %}](/docs/setup/copilot.md), then [choose a model](#change-the-model-for-chat) from the providers available through your plan.
* **A provider account or harness-specific credentials**: Follow the [{% data variables.product.prodname_anthropic_claude %}](/docs/agents/run/agent-harnesses.md#claude) or [{% data variables.product.prodname_openai_codex %}](/docs/agents/run/agent-harnesses.md#codex) requirements for that harness. Supported accounts and authentication methods depend on the integration.
* **An API key or custom endpoint**: [Add a model provider](/docs/agent-customization/model-providers.md#bring-your-own-language-model-key) in the Language Models editor. This configures model access, not a different harness.
* **A locally running model**: Add a [model provider extension](/docs/agent-customization/model-providers.md#add-a-model-provider-extension), such as Ollama, or check the requirements for [{% data variables.product.prodname_copilot_short %}-managed on-device models](/docs/agent-customization/model-providers.md#use-on-device-models).

The model provides reasoning, the harness coordinates tools and workflow, and the access provider determines authentication and billing. These choices are related, but aren't interchangeable. Compare [harness-specific access options](/docs/agents/run/agent-harnesses.md#requirements-and-setup) before reusing an account or key.

## Options for choosing a model

{% data variables.product.prodname_vscode_shortname %} offers four ways to choose models for chat and agent tasks:

| Option | How it works | When to use it |
|--------|--------------|----------------|
| **[Copilot Fusion](#use-copilot-fusion)** | Chooses one model or orchestrates multiple models (for example, drafting, reviewing, and revising) for a task. | Substantial, well-scoped coding tasks where multi-step review is worth extra time and AI credits. |
| **[Auto](#use-auto-model-selection)** | Automatically selects a single model per request based on task complexity and availability. | Everyday work when you want good defaults without hand-picking models. |
| **[Model routers](#use-model-routers)** `feature(model-routers)` | Routes requests automatically using rules and preferred models that you define. | Recurring workflows where you already know which models you prefer for different task types. |
| **[Individual model](#change-the-model-for-chat)** | Uses a specific model you pick from the model picker, with optional [thinking effort and context size](#configure-thinking-effort-and-context-size). | Tasks that need a specific capability (fast edits, deep reasoning, vision, or a large context window) or direct control. |

For help deciding between these options and evaluating results on your own code, see [Compare and choose models for your coding tasks](/docs/agents/guides/choose-a-model.md). To run the same prompt across multiple models in parallel, use [Compare model results](/docs/agents/run/compare-models.md) in the {% data variables.copilot.agents_window %}.

## Change the model for chat

Different models have different strengths. Use a fast model for quick edits and simple questions, and a reasoning model for complex refactoring, architectural decisions, or multi-step tasks. Depending on the [harness](/docs/agents/concepts/agent-harnesses.md) you are using, the list of available models might differ.

Use the language model picker in the chat input field to change the model for chat conversations and code editing.

![Screenshot that shows the model picker in the {% data variables.copilot.chat_view %}.](images/language-models/model-dropdown-change-model.png)

You can extend the list of available models by [adding a model provider or local model](/docs/agent-customization/model-providers.md).

> [!NOTE]
> If you are a {% data variables.copilot.copilot_business_short %} or {% data variables.copilot.copilot_enterprise_short %} user, your administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

### Organization-managed model defaults

Your organization can set the starting model for new conversations in both the editor and the {% data variables.copilot.agents_window %}. The model picker marks the organization's choice as **Org default**, and the Settings editor shows an indicator for `setting(chat.defaultModel)` with a **Managed by organization** explanation.

The managed default takes precedence over your saved model preference for new conversations, but you can still select another available model for the current conversation. Existing conversations keep their model. Your saved preference is preserved and applies to new conversations again when the managed default is removed.

For administrator configuration, see [Set managed model defaults](/docs/enterprise/manage-ai-settings.md#set-managed-model-defaults).

<!-- TODO: Add a screenshot showing Org default in the model picker and the managed indicator for chat.defaultModel in Settings. -->

## Configure thinking effort and context size

Some models support configurable thinking effort, context size, and other parameters.These control how much reasoning the model applies to each request, and how much context the model can consider at once. For background on thinking and reasoning, see [Thinking and reasoning](/docs/agents/concepts/language-models.md#thinking-and-reasoning).

By default, {% data variables.product.prodname_vscode_shortname %} sets recommended effort levels and has adaptive reasoning enabled, where the model dynamically determines how much to think based on the complexity of each request. For most use cases, the default configuration works well.

> [!TIP]
> Higher thinking effort produces more thinking tokens, which increases [AI credit](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) consumption. Only increase thinking effort for genuinely complex tasks. Learn more about [optimizing AI credit usage](/docs/agents/guides/optimize-usage.md).

To configure model parameters:

1. Open the model picker in the chat input field and select a reasoning model.

1. Select the **>** arrow that appears next to the model name to open the model configuration submenu.

    > [!NOTE]
    > Non-reasoning models, such as GPT-4.1 and GPT-4o, do not show the thinking effort option in the model configuration submenu.

1. Select an effort level.

    ![Screenshot showing the model configuration submenu, with different effort levels and context size options.](images/language-models/thinking-effort-submenu.png)

The model configuration is remembered per session, so revisiting an earlier session keeps the same effort level and context size it was using. New conversations start from the effort level and context size you last set for that model.

> [!NOTE]
> The `setting(github.copilot.chat.anthropic.thinking.effort)` and `setting(github.copilot.chat.responsesApiReasoningEffort)` settings are deprecated. Configure thinking effort directly from the language model picker.

## Use auto model selection

With auto model selection, {% data variables.product.prodname_vscode_shortname %} evaluates task complexity and real-time model availability to route each request to the optimal model. For background on how auto model selection works, see [Auto model selection](/docs/agents/concepts/language-models.md#auto-model-selection).

To use auto model selection, select **Auto** from the model picker in chat.

In [{% data variables.product.prodname_copilot_short %} harness sessions](/docs/agents/run/agent-harnesses.md#copilot), **Copilot Fusion** replaces **Auto** when dynamic Auto tiers are enabled and the service offers a Fusion tier your account can run. If the picker shows **Copilot Fusion**, follow the [Fusion instructions](#use-copilot-fusion) instead.

Use **Optimize for**, when available, to choose a tier that matches your priorities. The offered tiers depend on the service and can include:

* **Efficiency** favors lower AI credit consumption.
* **Balance** balances capability and credit consumption.
* **Intelligence** favors more capable models for complex tasks.

Your organization can set a starting tier for new chats. The managed tier appears as **Default** in the **Optimize for** menu, but you can still choose a different tier. An explicit choice is preserved when the managed default changes or is removed.

You can see which model is used for generating a response by hovering over the chat response.

![Screenshot of a chat response, showing the selected model on hover.](images/language-models/chat-response-selected-model.png)

## Use Copilot Fusion

Copilot Fusion chooses models and a workflow to complete your task, so you don't need to select a model for each step. For background on how Fusion differs from Auto and when to use it, see [Copilot Fusion concepts](/docs/agents/concepts/language-models.md#copilot-fusion).

For details about orchestration, effort levels, availability, and AI credit usage, see [GitHub Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) in the GitHub documentation.

To use Copilot Fusion:

1. Verify that `setting(chat.copilot.dynamicAutoTiers.enabled)` is enabled in the Settings editor. Changing it restarts the {% data variables.product.prodname_copilot_short %} runtime after active requests finish.

1. Start a new chat with the [Copilot harness](/docs/agents/run/agent-harnesses.md#copilot).

1. In the model picker, select **Copilot Fusion**, then choose an available tier: **Standard**, **High**, or **Max**.

Enabling the setting doesn't grant access to Fusion tiers. If the service doesn't offer a Fusion tier that your account can run, the picker continues to show **Auto** instead.

## Use model routers

`feature(model-routers)`

Unlike Auto or Fusion, which choose models for you, a model router uses your own model choices and routing criteria. Define routes for recurring work, such as a faster model for small edits and a reasoning model for multi-file changes.

> [!NOTE]
> Model routers are available in {% data variables.product.prodname_vscode_shortname %} Insiders for [Copilot harness sessions](/docs/agents/run/agent-harnesses.md#copilot) and are off by default.

### Create and select a router

1. Enable `setting(chat.copilot.modelRouter.enabled)` in the Settings editor.

1. Open a local folder in the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) and start a **Copilot** chat.

1. In the model picker, select **Routers** > **Create a Router**, or **New Router** if you already have one.

1. The action adds `/model-router` to your draft. Describe your routing preferences and send the request:

    ```prompt
    /model-router Use a reasoning model for debugging and multi-file changes, and a faster model for small edits. Choose models available to my account.
    ```

1. Review the router and any file or tool approvals. The skill validates it with `check_model_router`. Reopen **Routers** and select your router.

Send a task. The routing line identifies the route, model, and effort. The response footer identifies the answering model.

Open a router's **Details** to inspect its routes, model configurations, and switching mode. Select its file name to edit it. New and changed files are detected without reloading.

### Write a router file

Alternatively, create `<name>.model-router.yaml` in `~/.agents/model-routers/` on macOS or Linux, or `%USERPROFILE%\.agents\model-routers\` on Windows. Use lowercase letters, digits, and single hyphens for `<name>`, such as `daily-driver`.

Routers in `~/.copilot/model-routers/` are also supported. For duplicate names, `~/.agents/` takes precedence.

Adapt this example's models to your account, manually or with `/model-router`:

```yaml
version: 1
display-name: Daily Driver
description: Reasoning for multi-file work, faster responses for small edits.
routes:
  - name: build
    model: opus
    effort: high
    when: Debugging, implementing features, or changing behavior across files.
    guidance: Inspect the relevant code before editing. Run the relevant tests after changes.
  - name: quick
    model: haiku
    effort: low
    when: Small, well-defined edits, such as renaming a local variable or updating a comment.
```

* **Models:** Use a family for its newest available released model, an exact ID for a particular version, or a preference list such as `[opus, haiku]`.
* **Criteria:** Describe the work in `when`, with optional `examples` to distinguish requests. Put your preferred fallback first: an unclear first request uses the first available route.
* **Effort:** Set a supported `effort` level, or let the router choose when routing a request. Top-level `effort: off` keeps model defaults and ignores route effort.
* **Context:** Set `context-size: long` for a larger supported window. Once a chat uses long context, subsequent models retain it where supported.

After manual edits, ask `/model-router` to check for unavailable models, unsupported effort levels, and invalid YAML.

### Control switching and route guidance

By default, the first message after you select a router determines its route for the rest of the chat. To switch routes as the work changes, add at the top level:

```yaml
switching: auto
```

Short continuation replies generally keep the current route. Evaluate edited routing criteria in a new chat.

A route's `guidance` instructs the main agent, including steps, [skills](/docs/agent-customization/agent-skills.md), or [custom agents](/docs/agent-customization/custom-agents.md) to use. Switching routes replaces that guidance. Running background subagents delay guidance changes until a routed turn after they finish.

Top-level `guidance` influences routing decisions, not the agent's work. Put instructions such as running tests in route guidance. Guidance doesn't enforce workflows or permissions.

Switching models resets the prompt cache and can increase [AI credit usage](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs). Guidance changes, higher effort, and larger context windows can also add cost.

### Check unexpected routing

For unexpected choices, ask `/model-router` to review overlapping criteria and add representative examples. Models must be available to your account and permitted by organization policies.

| Condition | Behavior |
|---|---|
| All models in a route are unavailable | The route is skipped. |
| Router file is invalid, missing, or has no available models | The chat keeps its current model and shows a notice. |
| Routing is unavailable for the first request | The first available route is used, with a notice. |
| Routing fails for a later request | The current route is kept. |

A fallback isn't necessarily the best match for your task.

## Manage language models

You can use the language models editor to view all available models, choose which models are shown in the model picker, and add more models by adding from built-in providers or from extension-provided model providers.

To open the Language Models editor, open the model picker in the {% data variables.copilot.chat_view %} and select **Manage Language Models** (gear icon) or run the **Chat: Manage Language Models** command from the Command Palette. The Language Models editor opens by default in a [modal overlay](/docs/editing/getting-started/userinterface.md#modal-editors) on top of the editor area.

![Screenshot that shows the Language Models editor.](images/language-models/language-models-editor.png)

The editor lists all models available to you, showing key information such as the model capabilities, context size, billing details, and visibility status. By default, models are grouped by provider, but you can also group them by visibility.

You can search and filter models by using the following options:

* Text search with the search box
* Provider: `@provider:"OpenAI"`
* Capability: `@capability:tools`, `@capability:vision`, `@capability:agent`
* Visibility: `@visible:true/false`

### Customize the model picker

You can customize which models are shown in the model picker by changing the visibility status of models in the Language Models editor. You can show or hide models from any provider.

Hover over a model in the list and select the eye icon to show or hide the model in the model picker.

![Screenshot that shows the Language Models editor with the eye icon to show or hide models in the model picker.](images/language-models/language-models-hide.png)

### Pin favorite models

Pin models to keep them in a fixed position at the top of the model picker. Pinned models appear in a dedicated **Pinned** section and don't shift around as you use other models.

To pin or unpin a model:

1. Open the model picker in the chat input field.

1. Hover over a model and select the pin icon to add it to the **Pinned** section.

1. To unpin a model, hover over it in the **Pinned** section and select the unpin icon.

<a name="bring-your-own-language-model-key"></a>
<a name="add-a-model-from-a-built-in-provider"></a>
<a name="add-a-model-provider-extension"></a>
<a name="add-a-custom-endpoint-model"></a>
<a name="use-on-device-models"></a>
<a name="use-on-device-models-experimental"></a>

## Add your own providers and local models

To connect models outside your {% data variables.product.prodname_copilot %} plan or run models on your machine, see [Add model providers and local models](/docs/agent-customization/model-providers.md):

* [Bring your own language model key (BYOK)](/docs/agent-customization/model-providers.md#bring-your-own-language-model-key) for built-in providers, marketplace extensions, and custom API endpoints.
* [Use on-device models](/docs/agent-customization/model-providers.md#use-on-device-models) `feature(on-device-models)` for {% data variables.product.prodname_copilot_short %}-managed models running locally with llama.cpp.

## Configure models for other features

In addition to the main chat model, you can configure which model is used for inline chat, inline suggestions, Voice Mode, and background utility tasks.

### Change the model for inline chat

You can configure a default language model for editor inline chat. This enables you to use a different model for inline chat than for chat conversations.

To configure the default model for inline chat, use the `setting(inlineChat.defaultModel)` setting. The setting lists all available models from the model picker.

If you change the model during an inline chat session, the selection persists for the remainder of the session. After you reload {% data variables.product.prodname_vscode_shortname %}, the model resets to the value specified in the `setting(inlineChat.defaultModel)` setting.

### Change the model for inline suggestions

To change the language model that is used for generating inline suggestions in the editor:

1. Select **Configure Inline Suggestions...** from the Chat menu in the {% data variables.product.prodname_vscode_shortname %} title bar.

1. Select **Change Completions Model...**, and then select one of the models from the list.

> [!NOTE]
> The list of available models might vary and change over time. When no alternative models are available, the option to change the model is not available.
>
> If you are a {% data variables.copilot.copilot_business_short %} or Enterprise user, your Administrator needs to enable certain models for your organization by opting in to `Editor Preview Features` in the [Copilot policy settings](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization#enabling-copilot-features-in-your-organization) on GitHub.com.

### Change the model for Voice Mode

To use an OpenAI Live model for spoken agent conversations, [configure Voice Mode with your own OpenAI key](/docs/configure/accessibility/voice.md#use-your-own-openai-key). `feature(voice-mode)` The voice model handles the spoken conversation separately from the model selected for coding tasks in chat.

### Change the model for utility tasks

In addition to the main chat model, {% data variables.product.prodname_vscode_shortname %} uses lightweight models in the background for utility tasks such as generating titles, creating commit messages and pull request descriptions, and detecting intent. The model you select for a chat or agent session does not control these utility tasks. By default, these tasks use built-in utility models provided by {% data variables.product.prodname_copilot %}. You can override which model is used for these tasks with any available model, including [BYOK](/docs/agent-customization/model-providers.md#bring-your-own-language-model-key) and extension-provided models.

There are two settings for utility models, depending on the type of task:

* `setting(chat.utilityModel)`: Override the model used for general utility flows, such as generating titles and summaries, settings search, and Git review.
* `setting(chat.utilitySmallModel)`: Override the model used for fast, lightweight utility flows, such as commit messages, pull request titles and descriptions, rename suggestions, branch name generation, prompt categorization, and intent detection. A fast and inexpensive model is recommended for this setting.

Both settings default to **Default**, which uses the built-in utility model from GitHub Copilot.

If you use BYOK models without signing into a GitHub account, the built-in utility models are not available. {% data variables.product.prodname_vscode_shortname %} shows a notification in the {% data variables.copilot.chat_view %} that prompts you to configure utility models. Set `setting(chat.utilityModel)` and `setting(chat.utilitySmallModel)` to a BYOK model to enable utility features like title generation, commit message creation, and pull request description creation.

#### Configure the default utility model for BYOK models

When you select a [BYOK](/docs/agent-customization/model-providers.md#bring-your-own-language-model-key) model as the main agent model, use the `setting(chat.byokUtilityModelDefault)` setting to control which model built-in utility flows use by default. This setting accepts the following values:

* **None**: Do not use a default utility model.
* **Main Agent Model**: Use the selected BYOK main agent model for utility flows.
* **GitHub Copilot**: Use the default GitHub Copilot utility models.

> [!NOTE]
> By default, utility flows use GitHub Copilot utility models when a Copilot token is available. If no Copilot token is available, configure `setting(chat.utilityModel)` and `setting(chat.utilitySmallModel)`, or select **Main Agent Model**, to enable utility features.

This setting has no effect when the main agent model is provided by GitHub Copilot. A specific model configured in `setting(chat.utilityModel)` or `setting(chat.utilitySmallModel)` takes precedence over this default.

## Related resources

* [Understand language models](/docs/agents/concepts/language-models.md)
* [Add model providers and local models](/docs/agent-customization/model-providers.md)
* [Compare and choose models for your coding tasks](/docs/agents/guides/choose-a-model.md)
