---
Order: 4
Area: intelligentapps
TOCTitle: Playground
ContentId:
PageTitle: AI Model Playground
DateApproved:
MetaDescription: Chat with selected generative AI model in playground. Change system prompt and parameters. Add attachment for Multi-Modal models. Keep chat history.
MetaSocialImage:
---

# Playground overview

Playground is where developer to interact with AI models of choice, try different prompts with different model parameter settings. For the most recent multi-modal models that supports attachment of different format, developer can also interact through playground.

In AI Toolkit, click the playground or from Model Catalog to load or try in playground, the playground view will display as screenshot:

![alt text](./images/playground/playground.png)

User must select a model from the choice to start with. Optionally user can insert context instructions or change model parameters. User prompts or questions are entered from the chat box at the bottom of playground, with options to send, clear chat history, or add attachement for the prompt.

# Add attachment for Multi-modal models

If the model doesn't support attachment yet, the icon will be disabled. Otherwise click the pin icon, follow the instruction to attach one or more local files and use them together in prompt.

![alt text](./images/playground/attachment.png)


# Remote inference in Playground

Users can chat with remotely hosted language model in playground.

## Prerequisites

- AI Toolkit v0.4.0 or newer.
- OpenAI compatible chat completion endpoint.

## How to add a remote model

1. Click the "+" icon when hovering on "MODELS" tree view or enter `AI Toolkit: Add model for remote inference` in command palette.

    ![](./images/playground/0-entrypoint-treeview.png)

    ![](./images/playground/1-entrypoint-command.png)

2. Enter the model name and press Enter. For the endpoint you choose, if the [`model` parameter](https://platform.openai.com/docs/api-reference/chat/create#chat-create-model) is required, you need to set the name according to the requirements (For example, you may set it to `gpt-4o`, `gpt-3.5-turbo`, etc. for OpenAI service). Otherwise, it is just an arbitary name for display purpose in AI Toolkit (For example, `model` is ignored for Azure OpenAI).

    ![](./images/playground/2-model-name.png)

3. Enter OpenAI compatible chat completion endpoint URL.

    ![](./images/playground/3-endpoint.png)

4. If your endpoint requires authentication, you can set an authentication header for API key. Otherwise, your can just press Enter to skip this step.

    ![](./images/playground/4-auth-header.png)

5. After it is successfully added, the new model will appear in tree view, tagged with `Remote`. It will also appear in model drop down in playground. You can select the model in playground and try inference just like other local models.

    ![](./images/playground/5-inference.png)

    > Note: AI Toolkit will send the chat history, context instructions and parameters to the endpoint, but it depends on the actual endpoint and model whether they are supported.

## FAQ

### How can I find my endpoint and authentication header?

Here are some examples about how to find your endpoint and authentication headers in common OpenAI service providers. For other providers, you can check out their documentation about the chat completion endpoint and authentication header.

#### Example 1: Azure OpenAI

1. Go to the `Deployments` blade in Azure OpenAI Studio and select a deployment, for example, `gpt-4o`. If you don't have a deployment yet, you can checkout [the documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) about how to create a deployment.

    ![](./images/playground/6-aoai-deployments.png)

    ![](./images/playground/7-aoai-model.png)

2. As in the last screenshot, you can retrieve your chat completion endpoint in the `Target URI` property in the `Endpoint` section.

3. You can retrieve your API key from the `Key` property in the `Endpoint` section. After you copy the API key, **fill it in the format of `api-key: <YOUR_API_KEY>` for authentication header** in AI Toolkit. See [Azure OpenAI service documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#request-header-2) to learn more about the authentication header.

#### Example 2: OpenAI

1. For now, the chat completion endpoint is fixed as `https://api.openai.com/v1/chat/completions`. See [OpenAI documentation](https://platform.openai.com/docs/api-reference/chat/create) to learn more about it.

2. Go to [OpenAI documentation](https://platform.openai.com/docs/api-reference/authentication) and click `API Keys` or `Project API Keys` to create or retrieve your API key. After you copy the API key, **fill it in the format of `Authorization: Bearer <YOUR_API_KEY>` for authentication header** in AI Toolkit. See the OpenAI documentation for more information.

    ![](./images/playground/8-openai-key.png)

### How to edit endpoint URL or authentication header?

If you enter the wrong endpoint or authenticatin header, you may encounter errors when inferencing. Click `Edit settings.json` to open Visual Studio Code settings. You may also type the command `Open User Settings (JSON)` in Visual Studio Code command palette to open it and go to the `windowsaistudio.remoteInfereneEndpoints` section.

![](./images/playground/9-edit.png)

Here, you can edit or remove existing endpoint URLs or authentication headers. After you save the settings, the models list in tree view or playground will automatically refresh.

![](./images/playground/10-edit-settings.png)

### How can I join the waitlist for OpenAI o1-mini or OpenAI o1-preview?

The OpenAI o1 series models are specifically designed to tackle reasoning and problem-solving tasks with increased focus and capability. These models spend more time processing and understanding the user's request, making them exceptionally strong in areas like science, coding, math and similar fields. For example, o1 can be used by healthcare researchers to annotate cell sequencing data, by physicists to generate complicated mathematical formulas needed for quantum optics, and by developers in all fields to build and execute multi-step workflows.

IMPORTANT: o1-preview model is available for limited access. To try the model in the playground, registration is required, and access will be granted based on Microsoft’s eligibility criteria.

You can visit the [GitHub model market](https://aka.ms/github-model-marketplace) to find OpenAI o1-mini or OpenAI o1-preview and join the waitlist.