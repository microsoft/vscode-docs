---
ContentId: e919aee8-fd2e-401b-9d83-0ff6f98b23ba
DateApproved: 10/03/2025
MetaDescription: Test prompts with text and image models in Foundry Toolkit, compare chat responses, generate images, and reuse model client code.
MetaSocialImage: images/playground/model-playground.png
---
# Model playground in Foundry Toolkit

Use the Foundry Toolkit playgrounds to test chat prompts or generate images before you integrate a model into an application. Configure model-specific parameters, compare chat responses, create image assets, and generate a client code sample.

The playground sends inference requests to a selected model. It does not create an agent resource or deploy your application code. To test an agent that runs your own logic and calls tools, use [Agent Inspector](/docs/intelligentapps/agent-inspector.md).

## Choose a playground task

The selected model determines which playground opens. A chat model that accepts images for analysis is not necessarily a model that generates images.

| Goal | Model to select | Playground |
| --- | --- | --- |
| Test chat prompts, analyze supported image input, or compare responses. | A chat-capable model with the required input capabilities. | **Model Playground**, with conversations and chat comparison. |
| Generate an image or edit from a reference image. | A supported Foundry image-generation deployment. | **Image Playground**, with generation settings and an image gallery. |

Selecting an image-generation model switches to **Image Playground** automatically. Selecting a text-generation model switches back to the chat view.

The following example shows the chat playground with a configured model.

![Screenshot showing the Foundry Toolkit chat playground with a connected Foundry model, model preferences, and prompt input.](./images/playground/model-playground.png)

## Prerequisites

Before you start:

* Install the current public Foundry Toolkit extension in {% data variables.product.prodname_vscode %}. See [Install Foundry Toolkit](/docs/intelligentapps/overview.md#install-and-setup).
* Have a local model or remote model connection available in Foundry Toolkit. You can use an existing connection, including a Foundry model provided by an administrator. For connection and deployment options, see [Set up models in Foundry Toolkit](/docs/intelligentapps/models.md).
* For remote models, confirm that you have access to the provider endpoint or your model deployment. Authentication, availability, quota, and charges depend on the provider. For Microsoft Foundry, see [Foundry Models](https://learn.microsoft.com/azure/foundry/concepts/foundry-models-overview) and [quotas and limits](https://learn.microsoft.com/azure/foundry/foundry-models/quotas-limits).

## Test a model

For chat models, use the following procedure. For image output, follow [Generate images with Image Playground](#generate-images-with-image-playground).

1. Open the playground by using one of these methods:
   * In the **Foundry Toolkit** view, select **Developer Tools** > **Build** > **Model Playground**.
   * Under **My Resources** > **Models**, select a deployed model to open it in the playground.
   * From the model catalog, select **Try in Playground** on a model card.
2. In **Basic information**, select the model that you want to test from the **Model** list.
3. Optionally, enter a system prompt and adjust the inference parameters shown for that model.
4. Enter a prompt in the chat input.
5. Select **Send**.
6. Review the response, capability warnings, and available usage information.

Each remote request might consume quota or incur provider charges.

## Generate images with Image Playground

Use Image Playground to prototype image assets from a description or explore reference-based edits. Start with a supported image-generation model deployed in your Foundry project. Follow [Deploy a model to Microsoft Foundry](/docs/intelligentapps/models.md#deploy-a-model-to-microsoft-foundry) if you need to prepare a deployment.

> [!IMPORTANT]
> Image requests send the prompt and any reference image to the configured Foundry deployment and can incur model usage charges. Use non-sensitive test inputs and check the service's data-handling requirements.

1. Open the image-model deployment in the playground, or select it from **Model**. The view switches to **Image Playground**.
2. In **Inference parameters**, configure the image size, quality, output format, and background options available for the selected model. Output compression applies only to JPEG or WebP output.
3. Enter a description in the prompt input. For example:

   ```text
   A simple illustration of a blue mug on a white background, with soft shadows and no text.
   ```

4. If the model supports editing, select **Attach an image to use as reference for generation** and choose one supported image file. Reference-image generation sends an editing request. Toolkit does not provide a mask editor or automatically use earlier gallery images as context.
5. Select **Send** and wait for the generated image to appear in the gallery. The card can show a revised prompt when the model returns one.
6. Select the image to open its preview, or select **Download image** to save a copy in a location you choose.

For a long prompt, use **View more** on the image card to inspect its full text.

Image formats, dimensions, access requirements, and editing support depend on the model. See [Azure OpenAI image generation models](https://learn.microsoft.com/azure/foundry/openai/how-to/dall-e) for current service limits and lifecycle information. Service capabilities such as multiple reference images or mask-based editing are not automatically available in Toolkit.

Successful images and their prompt, model, and parameter metadata are cached in `.aitk\image-playground` under the extension host user's home directory. Toolkit restores the gallery from this local cache when you reopen the view. Use **Download image** for copies you want to keep rather than treating the cache as a backup.

In Image Playground, **New Playground** clears the gallery records. It does not delete cached image files or copies you downloaded. This gallery is separate from chat history, cloud agent versions, and publishing. Stopping a generation request cancels client waiting, but does not guarantee that the provider stops work or avoids usage charges.

For application integration, follow [Image model code samples](#image-model-code-samples). Code templates are not an export of a gallery result.

The following example shows generated images in the gallery alongside the selected model and its generation parameters.

![Screenshot showing Image Playground with generated image cards, prompt details, download controls, and model-specific generation parameters.](./images/playground/image-playground.png)

## Configure the model

For chat models, use **Basic information** to change the model and system prompt, and **Inference parameters** to adjust the controls available for that model. Image-generation settings are described in [Generate images with Image Playground](#generate-images-with-image-playground).

### System prompt

When the selected model supports a system prompt, enter instructions that define its role, response style, constraints, or other context. These instructions apply to requests in the current playground.

### Inference parameters

Foundry Toolkit shows only the parameters described by the selected model's schema. Depending on the model, these parameters can include:

* **Max Completion Tokens** or another token-limit field.
* **Temperature** and **Top P**.
* **Frequency Penalty** and **Presence Penalty**.
* Reasoning or thinking controls.

Use a token limit to bound the response length, sampling controls to explore variation, and supported penalties to reduce repetition. Change one parameter at a time so you can compare its effect on the same prompt.

Parameter names, ranges, defaults, and behavior vary by model and provider. A field shown in the playground is not a guarantee that every deployment honors it in the same way.

The following example shows the model selector, system prompt, and inference parameters for a connected Foundry model.

![Screenshot showing Basic information and Inference parameters for a connected model in the Foundry Toolkit playground.](./images/playground/parameters-current.png)

### API routing

For chat requests, the playground selects an API supported by the model and provider. Supported Foundry chat models use the Responses API by default. Other providers can use different APIs, and the playground might retry with a compatible API after a runtime error. Image Playground uses image-generation or image-editing endpoints instead.

The chat input-mode controls affect how supported model and Toolkit capabilities appear. They do not select the request API or switch to Image Playground:

* **Use [model] Native Supported AI Features** shows capabilities provided natively by the selected model.
* **Use All AI Features** includes supported Foundry Toolkit assistance and capability warnings.

**Use All AI Features** does not add vision, web search, reasoning, or file support to a model that does not provide those capabilities.

The input-mode menu lists native model capabilities separately from Toolkit assistance.

![Screenshot showing the Playground input-mode menu with Use All AI Features and the selected model's native AI features.](./images/playground/input-modes-current.png)

## Use supported input and model features

Controls in the chat input depend on the selected model, provider, and API. The playground warns you when a requested capability is not supported.

| Feature | Playground behavior | Important limitation |
| --- | --- | --- |
| Documents | Adds supported file content as extracted text or as native file input. | File types and parsing depend on the selected model and provider. Do not assume page-image interpretation or OCR. |
| Images | Sends an image as native model input when vision is supported. | An attachment control does not mean that the model can understand images. |
| Other media | Sends supported files through providers that accept native file input. | Audio and video support is model-specific. |
| **Web** | Adds web search when the selected model, provider, and API support it. | OpenAI-compatible endpoints do not all provide the same search behavior. |
| **Thinking** | Requests model reasoning when the selected model and API expose that control. | Availability and returned reasoning content vary by model. |

> [!WARNING]
> Prompts and attachment content are sent to the selected provider. Some provider workflows upload an attachment when you add it, before you select **Send**. Do not attach sensitive data unless the provider's data-handling terms meet your requirements.

## Review responses and usage

For chat responses, you can copy the response, regenerate it, and copy or insert code blocks. Token counts appear only when the model returns token usage. Image output uses the gallery actions described in [Generate images with Image Playground](#generate-images-with-image-playground).

Generated Markdown can reference remote images. Use **Load Remote Images** when you want the playground to retrieve them. Loading a remote image contacts its host, so review the source before you load it.

### Review local resource usage (Preview)

For supported local chat models on Windows, **Show resource usage (preview)** reports local process metrics for these providers:

* ONNX.
* ONNX Converted.
* Foundry Local.
* Windows OS models, including Phi Silica.

When available, the response shows CPU, GPU, NPU, and memory metrics. These metrics are not billing data. They do not cover remote endpoints, Ollama, or every local runtime.

Select **Usage details** to continue in [Model Profiling](/docs/intelligentapps/profiling.md). Platform prerequisites and permissions can affect which metrics are available.

## Compare model responses

Use **Compare** in the chat playground for side-by-side, qualitative review of models before you choose one for an application. Image Playground does not use this chat comparison workflow.

1. Select **Compare** in the playground.
2. Select a configured model for each comparison pane.
3. Configure the system prompt and parameters for each model.
4. Enter a prompt in any pane. The playground mirrors the prompt to the other panes.
5. Select **Send** to submit the prompt to every pane.
6. Review the responses and capability differences.

System prompts and parameters remain specific to each model. Changing a selected model resets all conversations in the comparison view.

Comparison is not a formal benchmark. For repeatable datasets, metrics, and graders, use [Model Evaluation](/docs/intelligentapps/evaluation.md). Each remote model request might incur separate charges.

The following example shows two configured models ready for comparison, before a prompt is sent.

![Screenshot showing the Playground comparison setup for two Foundry models, with separate model selectors and prompt inputs before any requests are sent.](./images/playground/compare-setup-current.png)

## Reopen chat history

Foundry Toolkit saves completed chat turns locally as YAML files in `.aitk\chats` under the extension host user's home directory. If you use a remote extension host, the files are stored under that host user's home directory.

Select **History** to reopen, rename, or delete a saved chat. Select **New Playground** to start another chat.

History contains successfully completed turns. It does not preserve an unsent draft or guarantee recovery of a stopped, failed, or incomplete request. The files are local history, not Foundry portal history, cloud versions, or published agents.

## Use a model in application code

Use **View Code** to open a model client sample in an unsaved editor document. Chat and image models have different code-sample workflows.

### Chat model code samples

After you validate a chat model and prompt:

1. Select **View Code**.
2. Select an available SDK and programming language. For Microsoft Foundry models, also choose an authentication method when prompted.
3. Review the generated sample in the unsaved editor document.
4. Replace `INSERT_INPUT_HERE` with application input.
5. Use **File** > **Save As** to add the sample to a project.
6. Review the credentials, dependencies, endpoint, and error handling before you run or commit the code.

The chat sample does not export the current conversation. Authentication options depend on the provider. For Microsoft Foundry, see [Configure Microsoft Entra ID authentication](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/configure-entra-id).

### Image model code samples

For a supported Foundry image model:

1. Select **View Code** in Image Playground.
2. Choose **OpenAI SDK** and an available programming language.
3. Review the deployment-based template, which uses Microsoft Entra authentication. Add your image prompt, generation parameters, and any reference-image handling to the code yourself.
4. Use **File** > **Save As** to save the sample, and review its authentication, dependencies, and output handling before running it.

The image template fills in the deployment endpoint and name. It does not reproduce the current prompt, parameter values, selected reference image, or gallery result. Template availability depends on the model and language.

Neither code-sample workflow creates a complete project, agent resource, or hosted-agent deployment. To add instructions and tools without writing orchestration code, continue with [Agent Builder](/docs/intelligentapps/agentbuilder.md). To deploy application code as a managed service, see [Build and deploy hosted agents](/docs/intelligentapps/hosted-agents.md).

## Troubleshoot the playground

* **A chat capability is unavailable:** Check the model's capability warning and try a model that supports the input. Changing to **Use All AI Features** does not add unsupported model capabilities.
* **Image generation fails:** Confirm that you selected a configured image-generation deployment, not a chat model with image input. Check the model's supported parameter values, image formats, and reference-image limits.
* **A remote request fails:** Verify the deployment endpoint, credentials, region availability, and quota. Review [Foundry model endpoints](https://learn.microsoft.com/azure/foundry/foundry-models/concepts/endpoints).
* **Local resource usage is missing:** Confirm that you are on Windows and use a supported local provider. Then review the [Model Profiling prerequisites](/docs/intelligentapps/profiling.md).
* **A chat is missing from History:** Check `.aitk\chats` on the extension host and confirm that the request completed successfully.

## Related resources

* [Trace model and agent requests](/docs/intelligentapps/tracing.md).
* [Agent development lifecycle](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/development-lifecycle).
