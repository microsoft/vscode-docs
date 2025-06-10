---
ContentId: 52ad40fe-f352-4e16-a075-7a9606c5df3b
DateApproved: 06/14/2025
MetaDescription: Find a popular generative AI model by publisher and source. Bring your own model that is hosted with a URL, or select an Ollama model.
---
# Explore models in AI Toolkit

AI Toolkit provides comprehensive support for a wide variety of generative AI models, including both Small Language Models (SLMs) and Large Language Models (LLMs).

Within the model catalog, you can explore and utilize models from multiple hosting sources:

- Models hosted on GitHub, such as Llama3, Phi-3, and Mistral.
- Models provided directly by publishers, including OpenAI's ChatGPT, Anthropic's Claude, and Google's Gemini.
- Models downloaded locally from repositories like Ollama and ONNX.
- Custom self-hosted or externally deployed models accessible via Bring-Your-Own-Model (BYOM) integration.

![AI Toolkit model catalog displaying various generative AI models](./images/models/models.png)

## Find a model

To find a model in the model catalog:

1. Select the AI Toolkit view in the Activity Bar
1. Select **MODELS** > **Catalog** to open the model catalog
1. Use the filters to reduce the list of available models

    - **Hosted by**: AI Toolkit supports GitHub, ONNX, OpenAI, Anthropic, Google as model hosting sources.

    - **Publisher**: The publisher for AI models, such as Microsoft, Meta, Google, OpenAI, Anthropic, Mistral AI, and more.

    - **Feature**: Supported features of the model, such as `Text Attachment`, `Image Attachment`, `Web Search`, `Structured Outputs`, and more.

    - **Model type**: Filter models that can run remotely or locally on CPU, GPU, or NPU. This filter depends on the local availability.

    - **Fine-tuning Support**: Show models that can be used to run fine-tuning.
1. Browse the models in different categories, such as:
    - **Popular Models** is a curated list of widely used models across various tasks and domains.
    - **GitHub Models** provide easy access to popular models hosted on GitHub. It's best for fast prototyping and experimentation.
    - **ONNX Models** are optimized for local execution and can run on CPU, GPU, or NPU.
    - **Ollama Models** are popular models that can run locally with Ollama, supporting CPU via GGUF quantization.
1. Alternatively, use the search box to find a specific model by name or description

## Add a model from the catalog
To add a model from the model catalog:
1. Locate the model you want to add in the model catalog
1. Select the **Add** button on the model card
1. The flow for adding models will be slightly different based on the providers:

    - **GitHub**: AI Toolkit will ask for your GitHub credentials to access the model repository. Once authenticated, the model will be added directly into AI Toolkit.
    - **ONNX**: The model is downloaded from ONNX and added to AI Toolkit.
    - **Ollama**: The model is downloaded from Ollama and added to AI Toolkit.

    > [!TIP]
    > You can edit the API key later by right clicking the model and selecting **Edit** and view the excrypted value in `${HOME}/.aikt/models/my-models/yml` file.

    ![AI Toolkit interface showing a model card with options Try in Playground, Download, and Load in Playground.](./images/models/model_operation.png)

    - **OpenAI**, **Anthropic**, and **Google**: AI Toolkit will prompt you to enter the API Key.
    - **Custom models**: Refer to the [Add a custom model](#add-a-custom-model) section for detailed instructions.

Once added, the model will appear under **MY MODELS** in the tree view, and you can use it in the [**Playground**](/docs/intelligentapps/playground.md) or [**Agent Builder**](/docs/intelligentapps/agent-builder.md).

## Add a custom model
You can also add your own models that are hosted externally or run locally. There are several options available:
- Add Ollama models from the Ollama library or custom Ollama endpoints.
- Add custom models that has an OpenAI compatible endpoint, such as a self-hosted model or a model running on a cloud service.
- Add custom ONNX models, such as those from Hugging Face, using AI Toolkit's [model conversion tool](/docs/intelligentapps/modelconversion.md).

There are several entrypoints to add models to AI Toolkit:
- From **MY MODELS** in the tree view, hover over it and select the `+` icon.
![AI Toolkit interface showing the Model Catalog toolbar with the + Add model button highlighted, indicating where users can click to add a new custom model.](./images/models/custom_1.png)

- From the **Model Catalog**, select the **+ Add model** button from the tool bar.
![AI Toolkit interface showing the Model Catalog toolbar with the + Add model button highlighted. The toolbar is located at the top of the catalog view, and the + Add model button is emphasized to indicate where users can click to add a new custom model.](./images/models/custom_2.png)

- From the **Add Custom Models** section in the model catalog, select **+ Add Your Own Model**.
![AI Toolkit interface showing the Custom Models section in the model catalog. The + Add model button is highlighted, indicating where users can click to add a new custom model.](./images/models/custom_3.png)

### Add Ollama models

Ollama enables many popular genAI models to run locally with CPU via GGUF quantization. If you have Ollama installed on your local machine with downloaded Ollama models, you can add them to AI Toolkit for use in the model playground.

Prerequisites for using Ollama models in AI Toolkit:

- AI Toolkit v0.6.2 or newer.
- [Ollama](https://ollama.com/download) (Tested on Ollama v0.4.1)

To add local Ollama into AI Toolkit

1. From one of the entrypoints mentioned above, select **Add Ollama Model**.

    ![Select model type to add](./images/models/select-type.png)

1. Next, select **Select models from Ollama library**

    If you start the Ollama runtime at a different endpoint, choose **Provide custom Ollama endpoint** to specify an Ollama endpoint.

1. Select the models you want to add to AI Toolkit, and then select **OK**

    > [!NOTE]
    > AI Toolkit only shows models that are already downloaded in Ollama and not yet added to AI Toolkit. To download a model from Ollama, you can run `ollama pull <model-name>`. To see the list of models supported by Ollama, see the [Ollama library](https://ollama.com/library) or refer to the [Ollama documentation](https://github.com/ollama/ollama).

1. You should now see the selected Ollama model(s) in the list of models in the tree view.

    > [!NOTE]
    > Attachment is not support yet for Ollama models. Since we connect to Ollama using its [OpenAI compatible endpoint](https://github.com/ollama/ollama/blob/main/docs/openai.md) and it doesn't support attachments yet.

### Add a custom model with OpenAI compatible endpoint

If you have a self-hosted or deployed model that is accessible from the internet with an OpenAI compatible endpoint, you can add it to AI Toolkit and use it in the playground.

1. From one of the entrypoints mentioned above, select **Add Custom Model**.
1. Fill in the OpenAI compatible endpoint URL and the required information.

To reference a self-hosted model or locally-running Ollama model:

1. Select **+ Add model** in the model catalog

1. Choose between Ollama or a custom model in the model Quick Pick

1. Provide details to add the model

### Add a custom ONNX model

Follow the documentation on converting ONNX models to AI Toolkit's model format using the [model conversion tool](/docs/intelligentapps/modelconversion.md). Once converted, you can add the model to AI Toolkit.

## Select a model for testing

AI Toolkit enables you to test run a model in the playground for chat completions.

You have different options, available through the actions on the model card in the model catalog:

- **Try in Playground**: load the selected model for testing in the playground.
- **Try in Agent Builder**: load a downloaded model into the playground for chat

## License and sign-in

Some models require a publisher or hosting-service license and account to sign-in. In that case, before you can run the model in the [model playground](/docs/intelligentapps/playground.md), you are prompted to provide this information.

