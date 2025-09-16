---
Order: 106
TOCTitle: "Introducing auto model selection (preview)"
PageTitle: "Introducing auto model selection (preview)"
MetaDescription: Use auto model selection in VS Code to get faster responses, reduced rate limiting, and a 10% discount on premium requests for paid users.
MetaSocialImage: autoDropdown.png
Date: 2025-09-15
Author: Isidor Nikolic
---

# Introducing auto model selection (preview)

September 15th, 2025 by [Isidor Nikolic](https://github.com/isidorn), [@isidorn]( https://x.com/isidorn)

Faster responses, a lower chance of rate limiting, and 10% off premium requests for paid users - auto picks the best available model for each request based on current capacity and performance. With auto you can’t choose a specific model, auto handles that for you. Auto model selection in Chat is being rolled out in preview to all GitHub Copilot users in VS Code, starting with the individual plans.

<video src="auto-model-selection.mp4" title="Video demonstrating auto model selection in VS Code." autoplay muted controls></video>

## How auto model selection works

Auto selects the best model to ensure that you get the optimal performance and reduce the likelihood of rate limits. Auto will choose between Claude Sonnet 4, GPT-5, GPT-5 mini and other models, unless your organization has [disabled access to these models](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models). Once auto picks a model, it uses that same model for the entire chat session. As we introduce picking models based on task complexity, this behavior will change over the next iterations.

For paid users, we currently plan to primarily rely on Claude Sonnet 4 as the model powering auto.

![Screenshot that shows the model picker in the Chat view, showing the auto option.](autoDropdown.png)

When using auto model selection, VS Code uses a variable [model multiplier](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#model-multipliers) based on the automatically selected model. If you are a paid user, auto applies a 10% request discount. For example, if auto selects Sonnet 4, it will be counted as 0.9x of a premium request; if auto selects GPT-5-mini, this counts as 0x because the model is included for paid users. You can see which model and model multiplier are used by hovering over the chat response.

If you are a paid user and run out of premium requests, auto will always choose a 0x model (for example, GPT-5 mini), so you can continue using auto without interruption.

## What’s next

With VS Code's rapid usage growth, auto helps us manage capacity, so we can handle the millions of agentic requests coming in each day. That's our immediate goal, however this is not our long-term vision for auto. We aim to make auto the best model selection for most users and to achieve this, here's what we plan next:

* Dynamically switch between small and large models based on the task - this flexibility ensures that you get the right balance of performance and efficiency, while saving on requests
* Add more language models to auto
* Let users on a free plan take advantage of the latest models through auto
* Improve the model dropdown to make it more obvious which models and discounts are used

Using [VS Code Insiders](https://code.visualstudio.com/insiders/) and providing feedback in [our open source repository](https://github.com/microsoft/vscode/issues) is the best way to help us improve auto. For the latest information, check out the [auto model selection documentation](https://code.visualstudio.com/docs/copilot/customization/language-models#_auto-model-selection-preview).

Happy coding!