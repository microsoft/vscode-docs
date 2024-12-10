---
Order: 2
Area: intelligentapps
TOCTitle: Models
ContentId:
PageTitle: AI Models in AI Toolkit
DateApproved:
MetaDescription: Find a popular generative AI model by publisher and source. Bring your own model that is hosted with a URL, or select an Ollama model.
MetaSocialImage:
---

# Models in AI Toolkit

AI Toolkit supports a broad range of generative AI models. Both Small Language Models (SLM) and Large Language Models (LLM) are supported.

To use an AI model in AI Toolkit, from model catalog you can find GitHub hosted models (Llama3, Phi-3, Mistral models), publisher hosted models (OpenAI ChatGPT models, Anthropic Claude, Google Gemini), models you can download from HuggingFace, Ollama models running locally, or Bring-Your-Own-Models that you can connect to from AI Toolkit.

## Find a model

On AI Toolkit, select **Models** in the treeview to open the model catalog, as shown in step 1.
![Select model in model catalog](./images/models/model_catalog.png)

You can filter the models in the model catalog by using the following criteria:
- Hosted by:

    AI Toolkit supports GitHub, ONNX, OpenAI, Anthropic, Google as model hosting sources.
- Publisher:

    The publisher for AI models, such as Microsoft, Meta, Google, OpenAI, Anthropic, Mistral AI, and more.

- Tasks:

    Currently, only `Text Generation` is supported.

- Model type:

    Filter models that can run remotely or locally on CPU, GPU, or NPU. This filter depends on the local availability.

`Fine-tuning Support` switch filters models that can be used to run finetuning.

If your model is self hosted or runs as Ollama local model, you can add them from the "+ Add model" as ollama model or custom model.

Select on each model card in model catalog to find more details on the model.

## License and sign-in

Some of the models require publisher or hosting service license and account to sign-in. You will be prompted when you select a model from model catalog that requires license, to run it in playground.

## Select a model for testing

Once you find the model of interest, you can test run this model for chat completeions in the playground.

On each model card, there are several options:
- **Try in Playground** link that can load selected model in playground for test without model downloading.
- **Download** link that will download the model to local first from source like Hugging Face.
- **Load in Playground** will load the downloaded model into playground for chat.

## Bring your own models

AI Toolkit's playground also supports remote models.

If you have a self hosted or deployed model that is accessible from internet, you can add it to AI Toolkit and use it in the playground.

1. Hover over **MY MODELS** in the treeview, and select the `+` icon to add a remote model into AI Toolkit.
1. Fill in the requested information, such as model name, display name, model hosting URL, and optional auth string.

![Bring Your Own Models](./images/models/byom.png)

## Add Ollama models

Ollama enables many popular genAI models to run locally with CPU via GGUF quantization. If you have Ollama installed on your local machine with downloaded Ollama models, you can add them to AI Toolkit to use in playground.

### Prerequisites

- AI Toolkit v0.6.2 or newer.
- [Ollama](https://ollama.com/download) (Tested on Ollama v0.4.1)

### Steps to add local Ollama into AI Toolkit

1. Select the "+" icon while hovering over **MY MODELS** in the treeview, or select the **+ Add model** button in the model catalog or playground.

1. Select **Add an Ollama model**

    ![](./images/models/select-type.png)

1. Select **Select models from Ollama library**. Or if you start Ollama runtime at a different address, you can choose "Provide custom Ollama endpoint" to specify an Ollama endpoint.

    ![](./images/models/select-ollama.png)

1. Select the models you want to add to AI Toolkit.

    ![](./images/models/select-models.png)

    > Note that AI Toolkit will only show models that are already downloaded in Ollama and not already added to AI Toolkit. To download a model from Ollama, you can run `ollama pull <model-name>`. You can see the list of models supported by Ollama in [Ollama library](https://ollama.com/library) or refer to the [Ollama documentation](https://github.com/ollama/ollama).

1. You will see the added Ollama model on treeview's **MY MODELS** list. Use this Ollama model the same way as other models in playground.

    > Attachment is not support yet for Ollama models. Since we connect to Ollama using its [OpenAI compatible endpoint](https://github.com/ollama/ollama/blob/main/docs/openai.md) and it doesn't support attachments yet.