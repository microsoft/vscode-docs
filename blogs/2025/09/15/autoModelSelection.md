---
Order: 106
TOCTitle: "Introducing auto model selection (preview)"
PageTitle: "Introducing auto model selection (preview)"
MetaDescription: Faster responses, a lower chance of rate limiting, and 10% off premium requests for paid users - auto picks the best available model for each request based on current capacity and performance. With auto you can’t choose a specific model; auto manages that for you.
MetaSocialImage: autoDropdown.png
Date: 2025-09-15
Author: Isidor Nikolic
---

# Introducing auto model selection (preview)

September 15th, 2025 by [Isidor Nikolic](https://github.com/isidorn), [@isidorn]( https://x.com/isidorn)

Faster responses, a lower chance of rate limiting, and 10% off premium requests for paid users - auto picks the best available model for each request based on current capacity and performance. With auto you can’t choose a specific model; auto manages that for you. Auto model selection in Chat is being rolled out in preview to all GitHub Copilot users, starting with the individual plans.

<video src="auto-model-selection.mp4" title="Auto model selection" autoplay muted controls></video>

## How auto model selection works

Auto selects the best model to ensure that you get the optimal performance and reduce the likelihood of rate limits. Auto will choose between Claude Sonnet 4, GPT-5, GPT-5 mini and other models, unless your organization has [disabled access to these models](https://docs.github.com/en/copilot/how-tos/use-ai-models/configure-access-to-ai-models). Once auto picks a model, it will not change it until the end of the chat session. Though this will change in the following iterations as we introduce picking models based on task complexity. For paid users, we currently plan to primarily rely on Claude Sonnet 4 as the model powering auto.

![Screenshot that shows the model picker in the Chat view, showing the auto option.](autoDropdown.png)

When using auto model selection, VS Code uses a variable [model multiplier](https://docs.github.com/en/copilot/concepts/billing/copilot-requests#model-multipliers), based on the automatically selected model. If you are a paid user, auto will apply a 10% request discount. For example, if auto selects Sonnet 4 it will be counted as 0.9x of a premium request, and if auto selects GPT-5-mini it will be counted as 0x (since it is included for paid users). You can see which model and model multiplier are used by hovering over the chat response.

If you are a paid user and run out of premium requests, auto will always choose a 0x model (e.g. GPT-5-mini) so you can continue using auto.

## What’s next?

With VS Code’s sharp usage growth, auto helps us manage capacity so we can handle the millions of agentic requests coming in each day. That’s our immediate goal - but it’s not the long-term vision for auto. We aim to make auto the best model selection for most users. To make that a reality, we plan to:

* Allow auto to dynamically switch between small and large models based on the task - this flexibility ensures that you get the right balance of performance and efficiency while saving on requests
* Add more language models to auto
* Allow free users to get the latest models through auto
* Improve visual affordance of auto in the model dropdown to make the discount and models used more transparent

Using [VS Code Insiders](https://code.visualstudio.com/insiders/) and providing feedback in [our open source repository]( https://github.com/microsoft/vscode/issues) is the best way to help us improve auto. You can find the documentation about auto [here]( https://code.visualstudio.com/docs/copilot/customization/language-models#_auto-model-selection).

Happy coding!