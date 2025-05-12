---
ContentId: 52ad40fe-f352-4e16-a075-7a9606c5df3b
DateApproved: 12/11/2024
MetaDescription: Find a popular generative AI model by publisher and source. Bring your own model that is hosted with a URL, or select an Ollama model.
---

# Models in AI Toolkit

AI Toolkit supports a broad range of generative AI models. Both Small Language Models (SLM) and Large Language Models (LLM) are supported.

In the model catalog, you can access models from various sources:

- GitHub-hosted models (Llama3, Phi-3, Mistral models)
- Publisher-hosted models (OpenAI ChatGPT models, Anthropic Claude, Google Gemini)
- Locally downloaded models, for example from HuggingFace
- Locally running Ollama models
- Connect to Bring-Your-Own-Models

## Find a model

To find a model in the model catalog:

1. Select the AI Toolkit view in the Activity Bar

1. Select **CATALOG** > **Models** to open the model catalog

    ![Select model in model catalog](./images/models/model_catalog.png)

    Select a model card in the model catalog to view more details of the selected model.

1. Use the filters to reduce the list of available models

    - **Hosted by**: AI Toolkit supports GitHub, ONNX, OpenAI, Anthropic, Google as model hosting sources.

    - **Publisher**: The publisher for AI models, such as Microsoft, Meta, Google, OpenAI, Anthropic, Mistral AI, and more.

    - **Tasks**: Currently, only `Text Generation` is supported.

    - **Model type**: Filter models that can run remotely or locally on CPU, GPU, or NPU. This filter depends on the local availability.

    - **Fine-tuning Support**: Show models that can be used to run fine-tuning.

To reference a self-hosted model or locally-running Ollama model:

1. Select **+ Add model** in the model catalog

1. Choose between Ollama or a custom model in the model Quick Pick

1. Provide details to add the model

## License and sign-in

Some models require a publisher or hosting-service license and account to sign-in. In that case, before you can run the model in the [model playground](/docs/intelligentapps/playground.md), you are prompted to provide this information.

## Select a model for testing

AI Toolkit enables you to test run a model in the playground for chat completions. You have different options, available through the actions on the model card in the model catalog.

- **Try in Playground**: load the selected model for testing in the playground without downloading it
- **Download**: download the model from a source like Hugging Face
- **Load in Playground**: load a downloaded model into the playground for chat

## Bring your own models

AI Toolkit's playground also supports remote models. If you have a self-hosted or deployed model that is accessible from the internet, you can add it to AI Toolkit and use it in the playground.

1. Hover over **MY MODELS** in the tree view, and select the `+` icon to add a remote model into AI Toolkit.
1. Fill in the requested information, such as model name, display name, model hosting URL, and optional auth string.

![Bring Your Own Models](./images/models/byom.png)

## Add Ollama models

Ollama enables many popular genAI models to run locally with CPU via GGUF quantization. If you have Ollama installed on your local machine with downloaded Ollama models, you can add them to AI Toolkit for use in the model playground.

### Prerequisites

- AI Toolkit v0.6.2 or newer.
- [Ollama](https://ollama.com/download) (Tested on Ollama v0.4.1)

### Add local Ollama into AI Toolkit

1. Hover over **MY MODELS** in the tree view and select the "+" icon to add a model

    Alternatively, select the **+ Add model** button in the model catalog or playground.

1. Select **Add an Ollama model**

    ![Select model type to add](./images/models/select-type.png)

1. Next, select **Select models from Ollama library**

    If you start the Ollama runtime at a different endpoint, choose **Provide custom Ollama endpoint** to specify an Ollama endpoint.

1. Select the models you want to add to AI Toolkit, and then select **OK**

    > [!NOTE]
    > AI Toolkit only shows models that are already downloaded in Ollama and not yet added to AI Toolkit. To download a model from Ollama, you can run `ollama pull <model-name>`. To see the list of models supported by Ollama, see the [Ollama library](https://ollama.com/library) or refer to the [Ollama documentation](https://github.com/ollama/ollama).

1. You should now see the selected Ollama model(s) in the list of models in the tree view.

    > [!NOTE]
    > Attachment is not support yet for Ollama models. Since we connect to Ollama using its [OpenAI compatible endpoint](https://github.com/ollama/ollama/blob/main/docs/openai.md) and it doesn't support attachments yet.
