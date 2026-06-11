---
ContentId: 52ad40fe-f352-4e16-a075-7a9606c5df3b
DateApproved: 03/12/2026
MetaDescription: Find a popular generative AI model by publisher and source. Bring your own model that is hosted with a URL, or select an Ollama model.
---
# Explore models in Foundry Toolkit

Foundry Toolkit provides comprehensive support for a wide variety of generative AI models.

Within the model catalog, you can explore and utilize models from multiple hosting sources:

- Models hosted on GitHub, such as Llama3, Phi-3, and Mistral, including pay-as-you-go options.
- Models provided directly by publishers, including OpenAI's ChatGPT, Anthropic's Claude, and Google's Gemini.
- Models hosted on Microsoft Foundry.
- Models downloaded locally from repositories like Foundry Local, Ollama, and ONNX.
- Custom self-hosted or externally deployed models accessible via Bring-Your-Own-Model (BYOM) integration.

Deploy models directly to Foundry from within the model catalog, streamlining your workflow.

> [!NOTE]
> Use Microsoft Foundry, Foundry Local, and GitHub models added to Foundry Toolkit with GitHub Copilot. For more information, check out [Changing the model for chat](/docs/agent-customization/language-models.md#change-the-model-for-chat).

![Foundry Toolkit model catalog displaying various generative AI models](./images/models/models.png)

## Find a model

To find a model in the model catalog:

1. Select the Foundry Toolkit view in the Activity Bar
1. Select **Developer Tools** > **Discover** > **Model Catalog** to open the model catalog
1. Use the filters to reduce the list of available models.

    - **Hosted by**: Foundry Toolkit supports Microsoft Foundry, Foundry Local, GitHub, ONNX, OpenAI, Ollama, Anthropic, Google, NVIDIA NIM, MiniMax, Kimi, GLM and Windows AI API as model hosting sources.
    - **Publisher**: The publisher for AI models, such as Microsoft, Meta, Google, OpenAI, Anthropic, Mistral AI, and more.
    - **Feature**: Supported features of the model, such as `Text Attachment`, `Image Attachment`, `Web Search`, `Structured Outputs`, and more.
    - **Model type**: Filter models that can run remotely or locally on CPU, GPU, or NPU. This filter depends on the local availability.
    - **Fine-tuning Support**: Show models that can be used to run fine-tuning.
1. Browse the models in different categories, such as:
    - **Popular Models** is a curated list of widely used models across various tasks and domains.
    - **Microsoft Foundry Hosted Models** provide easy access to popular models hosted on Microsoft Foundry.
    - **GitHub Models** provide easy access to popular models hosted on GitHub. It's best for fast prototyping and experimentation.
    - **Local Models** to select models hosted on Microsoft Foundry on Windows or Ollama, supporting CPU via GGUF quantization.
1. Alternatively, use the search box to find a specific model by name or description

## Add a model

Depending on your starting point, there are different flows for adding a model to work with in Foundry Toolkit.

### Add a model from the catalog

To add a model from the model catalog:

1. Locate the model you want to add in the model catalog
1. The flow for adding models is slightly different based on the providers:

    - **Microsoft Foundry**: Deploy a model in your Microsoft Foundry project. Refer to [Deploy a model to Microsoft Foundry](#deploy-a-model-to-microsoft-foundry) for detailed instructions.

    - **Custom Model** that is hosted remotely, requires an API key, and has an OpenAI chat completion compatible endpoint URL. Refer to the [Add a custom model](#add-a-custom-model) for detailed instructions.

    - **Foundry Local**: Foundry Local downloads and runs the model, which might take a few minutes depending on your internet speed. The model is available on a localhost page and added to Foundry Toolkit. Learn more in [What is Foundry Local?](https://learn.microsoft.com/azure/ai-foundry/foundry-local/what-is-foundry-local?view=foundry-classic&preserve-view=true).

    - **Ollama**: The model is downloaded from Ollama and added to Foundry Toolkit. Refer to the [Add Ollama models](#add-ollama-models) for detailed instructions.

    - **GitHub**: Foundry Toolkit asks for your GitHub credentials to access the model repository. Once authenticated, the model is added directly into Foundry Toolkit.
        > [!NOTE]
        > Foundry Toolkit now [supports GitHub pay-as-you-go models](/docs/intelligentapps/playground.md#github-pay-as-you-go-model-support), so you can keep working after passing free tier limits.

    - **ONNX**: To add an ONNX model, first convert it to the Foundry Toolkit model format using the [model conversion tool](/docs/intelligentapps/modelconversion.md). After conversion, add the model to Foundry Toolkit.

Once a model is added, the model appears under **MY RESOURCES/Models** in the tree view, and you can use it in the [**Playground**](/docs/intelligentapps/playground.md) or [**Agent Builder**](/docs/intelligentapps/agentbuilder.md).

## Deploy a model to Microsoft Foundry

Deploy a model to Microsoft Foundry directly from Foundry Toolkit. Run the model in the cloud and access it via an endpoint.

1. From the model catalog, select the model you want to deploy.
1. Select **Deploy to Microsoft Foundry**, either from the dropdown menu or directly from the **Deploy to Microsoft Foundry** button, as in the following screenshot:

    ![Screenshot of the Foundry Toolkit interface showing the model catalog with a model selected and the Deploy to Microsoft Foundry button highlighted.](./images/models/catalog-deploy-dropdown.png)

1. In the **model deployment** tab, enter the required information, such as the model name, description, and any other settings, as in the following screenshot:

    ![Screenshot of the Foundry Toolkit interface showing the model deployment tab with fields for model name, description, and additional settings.](./images/models/deploy-to-azure-dialog.png)

1. Select **Deploy to Microsoft Foundry** to start the deployment process.
1. Confirm the deployment by reviewing the details and selecting **Deploy** to proceed.
1. Once the deployment is complete, the model is available in the **MY RESOURCES** > **Your project name** > **Models** section of Foundry Toolkit, and you can use it in the playground or agent builder.

### Add a custom model

For self-hosted or deployed models accessible from the internet with an OpenAI compatible endpoint, add it to Foundry Toolkit for use in the playground.

1. There are two ways to add a custom model:

    - In the Model Catalog, choose the **+ Bring Your Own Model** button

      ![Screenshot of the Foundry Toolkit interface showing the model catalog with the Bring Your Own Model button highlighted.](./images/models/custom-2.png)

    - In the Model Catalog, scroll to the "Add Custom Models" section, and choose the **Add a Custom Model** button.

      ![Screenshot of the Foundry Toolkit interface showing the model catalog with the Add a custom model button highlighted.](./images/models/custom-3.png)

1. A dialog appears prompting you for the OpenAI compatible endpoint URL, model name, API key and other required information.

      ![Screenshot of the dialog requesting the URL of the custom remote model.](./images/models/custom-4.png)

### Add Ollama models

Ollama enables many popular genAI models to run locally with CPU via GGUF quantization. If Ollama is installed on your local machine with downloaded Ollama models, add them to Foundry Toolkit for use in the model playground.

Prerequisites for using Ollama models in the Microsoft Foundry Toolkit for Visual Studio Code extension is [Ollama](https://ollama.com/download) (Tested on Ollama v0.4.1).

To add local Ollama into the Foundry Toolkit

1. From one of the entrypoints mentioned previously, select **Add Ollama Model**.

    - **MY RESOURCES** > **Local Resources**, select the **+** button next to **Models**.

      ![Screenshot of the plus button next to models in local resources.](./images/models/my-resources-local-resources-models.png)

      This opens the add model selector. Choose "Add Ollama Model".

      ![Select model type to add](./images/models/select-type.png)

    - In the Model Catalog, scroll down to the "Local Models" section, and select the "Ollama" tab. Choose the **Add** button next to a model listed there, or select **Add your own model**.

      ![Screenshot of the plus button next to models in local resources.](./images/models/model-catalog-local-models-ollama.png)

1. Select **Continue** after reading the acknowledgement that Ollama is a third-party model provider.

    ![SCreenshot of Ollama acknowledgement.](./images/models/ollama-acknowledgement.png)

1. Next, select **Select models from Ollama library**. This displays the models you have installed in Ollama. Use the checkboxes to select the ones you want to use with Foundry Toolkit.

    ![Select model type to add](./images/models/ollama-model-selector.png)

    > [!NOTE]
    > Foundry Toolkit only shows models that are already downloaded in Ollama and not yet added to Foundry Toolkit. To download a model from Ollama, you can run `ollama pull <model-name>`. To see the list of models supported by Ollama, see the [Ollama library](https://ollama.com/library) or refer to the [Ollama documentation](https://github.com/ollama/ollama).

    Or, if you start the Ollama runtime at a different endpoint, choose **Provide custom Ollama endpoint** to specify an Ollama endpoint.

1. You should now see one or more selected Ollama models in the list of models in the tree view.

    > [!NOTE]
    > Attachment isn't supported yet for Ollama models. Foundry Toolkit connects to Ollama using the [OpenAI compatible endpoint](https://github.com/ollama/ollama/blob/main/docs/openai.md) and doesn't support attachments yet.

## Select a model for testing

You can test a model in the playground for chat completions.

Use the actions on the model card in the model catalog:

- **Try in Playground**: Load the selected model for testing in the [Playground](/docs/intelligentapps/playground.md).
- **Try in Agent Builder**: Load the selected model in the [Agent Builder](/docs/intelligentapps/agentbuilder.md) to build AI agents.

## Manage models

You can manage your models in the **MY RESOURCES/Models** section of the Foundry Toolkit sidebar:

- View the list of models added to Foundry Toolkit.
- Right-click on a model to access options such as:
  - **Load in Playground**: Load the model in the [Playground](/docs/intelligentapps/playground.md) for testing.
  - **Copy Model Name**: Copy the model name to the clipboard for use in other contexts, such as your code integration.
    - **Refresh**: Refresh the model configuration to ensure you have the latest settings.
    - **Edit**: Modify the model settings, such as the API key or endpoint.
    - **Delete**: Remove the model from Foundry Toolkit.
    - **About this Model**: View detailed information about the model, including its publisher, source, and supported features.

- Right-click on `ONNX` section title to access options such as:
  - **Start Server**: Start the ONNX server to run ONNX models locally.
  - **Stop Server**: Stop the ONNX server if it's running.
  - **Copy Endpoint**: Copy the ONNX server endpoint to the clipboard for use in other contexts, such as your code integration.

## License and sign-in

Some models require a publisher or hosting-service license and account to sign-in. In that case, before you can run the model in the [model playground](/docs/intelligentapps/playground.md), you're prompted to provide this information.

## What you learned

In this article, you learned how to:

- Explore and manage generative AI models in Foundry Toolkit.
- Find models from various sources, including Microsoft Foundry, Foundry Local, GitHub, ONNX, OpenAI, Anthropic, Google, Ollama, and custom endpoints.
- Add models to your toolkit and deploy them to Microsoft Foundry.
- Add custom models, including Ollama and OpenAI compatible models, and test them in the playground or agent builder.
- Use the model catalog to view available models and select the best fit for your AI application needs.
- Use filters and search to find models quickly.
- Browse models by category, such as Popular, GitHub, ONNX, and Ollama.
- Convert and add custom ONNX models using the model conversion tool.
- Manage models in MY RESOURCES/Models, including editing, deleting, refreshing, and viewing details.
- Start and stop the ONNX server and copy endpoints for local models.
- Handle license and sign-in requirements for some models before testing them.
