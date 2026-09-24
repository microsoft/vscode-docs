---
ContentId: 52ad40fe-f352-4e16-a075-7a9606c5df3b
DateApproved: 03/12/2026
MetaDescription: Find a popular generative AI model by publisher and source. Bring your own model that is hosted with a URL, or select an Ollama model.
---
# Explore and manage AI models in Foundry Toolkit

Foundry Toolkit provides comprehensive support for exploring, deploying, and testing a wide variety of generative AI models.

With Foundry Toolkit, you can:

- Explore remote and local models from Microsoft Foundry, third-party providers, and local runtimes.
- Deploy models to Microsoft Foundry, connect to provider-hosted or custom endpoints, or download supported local models.
- Test text and image models in the [**Playground**](/docs/intelligentapps/playground.md).

Within the model catalog, you can explore and utilize models from multiple hosting sources:

- Models hosted on Microsoft Foundry.
- Models provided directly by publishers, including OpenAI's ChatGPT, Anthropic's Claude, Google's Gemini, and NVIDIA NIM models.
- Local models from Microsoft Foundry on Windows, Foundry Local, Ollama, and ONNX.
- Custom self-hosted or externally deployed models accessible through Bring Your Own Model (BYOM).

Deploy models directly to Foundry from within the model catalog, streamlining your workflow.

> [!NOTE]
> Region availability, quota, pricing, authentication, deployment eligibility, and safety limits are service-specific. Use Microsoft Learn and Microsoft Foundry documentation as the source of truth for those requirements. For more information, see [Azure AI Foundry model region availability](https://learn.microsoft.com/azure/ai-foundry/concepts/models-featured#region-availability) and [Azure AI Foundry quota](https://learn.microsoft.com/azure/ai-foundry/how-to/quota).

## Supported model sources

| Source | Use it to | Notes |
| ------ | --------- | ----- |
| Microsoft Foundry | Browse catalog models, deploy models to a selected Foundry project, and use deployed project models. | Availability depends on your project, region, quota, and service eligibility. |
| Microsoft Foundry on Windows / Foundry Local | Download and run supported local models. | Foundry Toolkit shows **Microsoft Foundry on Windows** on Windows and **Foundry Local** on macOS. |
| Ollama | Add local Ollama models or connect to a custom Ollama endpoint. | Install Ollama and download the model in Ollama before adding it to Foundry Toolkit. |
| ONNX / ONNX (Converted) | Use local ONNX models in Foundry Toolkit. | Convert models to the Foundry Toolkit model format before adding them. |
| OpenAI, Anthropic, Google, and NVIDIA NIM | Use supported publisher-hosted models. | Authentication, pricing, and feature availability depend on the provider. |
| Custom / BYOM | Add a self-hosted or externally deployed OpenAI-compatible endpoint. | Provide the endpoint URL, model name, and authentication details. |

![Foundry Toolkit model catalog displaying various generative AI models](./images/models/models.png)

## Find a model

To find a model in the model catalog:

1. Select the Foundry Toolkit view in the Activity Bar
1. Select **Developer Tools** > **Discover** > **Model Catalog** to open the model catalog
1. Use the filters to reduce the list of available models.

    - **Hosted by**: Foundry Toolkit supports Microsoft Foundry, Microsoft Foundry on Windows, Foundry Local, ONNX, OpenAI, Ollama, Anthropic, Google, NVIDIA NIM, Custom, and other model hosting sources.
    - **Publisher**: The publisher for AI models, such as Microsoft, Meta, Google, OpenAI, Anthropic, Mistral AI, and more.
    - **Feature**: Supported features of the model, such as `Text Attachment`, `Image Attachment`, `Web Search`, `Structured Outputs`, and more.
    - **Model type**: Filter models that can run remotely or locally on CPU, GPU, or NPU. This filter depends on the local availability.
    - **Fine-tuning Support**: Show models that can be used to run fine-tuning.
1. Browse the models in different categories, such as:
    - **Popular Models** is a curated list of widely used models across various tasks and domains.
    - **Microsoft Foundry Hosted Models** provide easy access to popular models hosted on Microsoft Foundry.
    - **Local Models** lets you select local models from Microsoft Foundry on Windows, Foundry Local, Ollama, or ONNX, depending on your platform and installed runtimes.
    - **Add Custom Models** lets you add self-hosted or externally deployed OpenAI-compatible endpoints.
1. Alternatively, use the search box to find a specific model by name or description

## Deploy a model to Microsoft Foundry

Deploy a model to Microsoft Foundry directly from Foundry Toolkit. Run the model in the cloud and access it via an endpoint.

1. From the model catalog, select the model you want to deploy.
1. Select **Deploy to Microsoft Foundry**, either from the dropdown menu or directly from the **Deploy to Microsoft Foundry** button, as in the following screenshot:

    ![Screenshot of the Foundry Toolkit interface showing the model catalog with a model selected and the Deploy to Microsoft Foundry button highlighted.](./images/models/catalog-deploy-dropdown.png)

1. In the **model deployment** tab, enter the required information, such as the model name, description, and any other settings, as in the following screenshot:

    ![Screenshot of the Foundry Toolkit interface showing the model deployment tab with fields for model name, description, and additional settings.](./images/models/deploy-to-azure-dialog.png)

1. Select **Deploy to Microsoft Foundry** to start the deployment process.
1. Confirm the deployment by reviewing the details and selecting **Deploy** to proceed.
1. Once the deployment is complete, the model is available in **My Resources** > **Your project name** > **Models**, and you can use it in the playground or agent builder.

## Add or connect a model

Depending on your starting point and model source, there are different flows for adding or connecting a model to work with in Foundry Toolkit.

1. Locate the model you want to add in the model catalog.
1. Choose the action for the model source:

    - **Microsoft Foundry**: Deploy a model in your Microsoft Foundry project. For detailed instructions, see [Deploy a model to Microsoft Foundry](#deploy-a-model-to-microsoft-foundry).
    - **Custom Model**: Connect to a remotely hosted model that uses an OpenAI compatible endpoint. For detailed instructions, see [Connect a custom model](#connect-a-custom-model).
    - **Microsoft Foundry on Windows / Foundry Local**: Download and run the model locally, which might take a few minutes depending on your internet speed. Learn more in [What is Foundry Local?](https://learn.microsoft.com/azure/ai-foundry/foundry-local/what-is-foundry-local?view=foundry-classic&preserve-view=true).
    - **Ollama**: Download the model from Ollama and add it to Foundry Toolkit. For detailed instructions, see [Add Ollama models](#add-ollama-models).
    - **ONNX**: Convert the ONNX model to the Foundry Toolkit model format using the [model conversion tool](/docs/intelligentapps/modelconversion.md), and then add it to Foundry Toolkit.

Once a model is added, you can use it in the [**Playground**](/docs/intelligentapps/playground.md) or [**Agent Builder**](/docs/intelligentapps/agentbuilder.md). Microsoft Foundry models appear under **My Resources** > **Your project name** > **Models**. Local models appear under **My Resources** > **Local Resources** > **Models**.

### Connect a custom model

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

To use Ollama models in Foundry Toolkit, install [Ollama](https://ollama.com/download) and download the models you want to add.

To add local Ollama models to Foundry Toolkit:

1. From one of the entrypoints mentioned previously, select **Add Ollama Model**.

    - In **My Resources** > **Local Resources**, select the **+** button next to **Models**.

      ![Screenshot of the plus button next to models in local resources.](./images/models/my-resources-local-resources-models.png)

      This opens the add model selector. Choose "Add Ollama Model".

      ![Select model type to add](./images/models/select-type.png)

    - In the Model Catalog, scroll down to the "Local Models" section, and select the "Ollama" tab. Choose the **Add** button next to a model listed there, or select **Add your own model**.

      ![Screenshot of the plus button next to models in local resources.](./images/models/model-catalog-local-models-ollama.png)

1. Select **Continue** after reading the acknowledgement that Ollama is a third-party model provider.

    ![Screenshot of Ollama acknowledgement.](./images/models/ollama-acknowledgement.png)

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

You can manage your models from the **My Resources** web view in Foundry Toolkit:

- For Microsoft Foundry models, go to **My Resources**. Foundry models are grouped by project in the web view.
- For local models, go to **My Resources** > **Local Resources** > **Models**.
- Right-click a model to access options such as:
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

Some models require a publisher or hosting-service license and account sign-in. In that case, before you can run the model in the [model playground](/docs/intelligentapps/playground.md), you're prompted to provide this information.

## What you learned

In this article, you learned how to:

- Explore and manage generative AI models in Foundry Toolkit.
- Find models from various sources, including Microsoft Foundry, Microsoft Foundry on Windows, Foundry Local, ONNX, OpenAI, Anthropic, Google, NVIDIA NIM, Ollama, and custom endpoints.
- Add models to your toolkit and deploy them to Microsoft Foundry.
- Add custom models, including Ollama and OpenAI compatible models, and test them in the playground or agent builder.
- Use the model catalog to view available models and select the best fit for your AI application needs.
- Use filters and search to find models quickly.
- Browse models by category, such as Popular, Microsoft Foundry, Local, Custom, and More.
- Convert and add custom ONNX models using the model conversion tool.
- Manage models from **My Resources**, including editing, deleting, refreshing, and viewing details.
- Start and stop the ONNX server and copy endpoints for local models.
- Handle license and sign-in requirements for some models before testing them.
