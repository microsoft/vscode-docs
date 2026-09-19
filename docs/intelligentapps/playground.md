---
ContentId: e919aee8-fd2e-401b-9d83-0ff6f98b23ba
DateApproved: 10/03/2025
MetaDescription: Chat with selected generative AI model in playground. Change system prompt and parameters. Add attachment for Multi-Modal models. Keep chat history.
---
# Model playground in Foundry Toolkit
The Foundry Toolkit playground provides an interactive environment to experiment with generative AI models. You can test prompts, adjust model parameters, compare responses from different models, and use model-specific capabilities such as attachments, image input, web search, and local resource usage when the selected model supports them.

![Foundry Toolkit playground interface showing a chat interaction with a generative AI model.](./images/playground/model-playground.png)

## Test a model in the playground

To access the playground:

- In Foundry Toolkit view, select **Developer Tools** > **Build** > **Model Playground**
- Select **Try in Playground** from a model card in the model catalog
- Select a model from the list of deployed Models to open it in the playground

![Screenshot of model list](./images/playground/foundry-model-support.png)

To test a model in the playground, follow these steps:

1. In **Model Preferences**, select a model from the dropdown list.
2. Optionally, add a **System prompt** to guide the model response.
3. Optionally, configure the inference parameters available for the selected model.
4. Enter a chat prompt in the chat input box

### Local model execution in the Playground

Foundry Toolkit supports running local models in the playground. You can select a configured local model from the model dropdown list in the **Model Preferences** panel. Local model support depends on your platform, installed runtimes, and the model provider.

![Screenshot of local model support](./images/playground/local-model-support.png)

## Model preferences

![Model Preferences panel displaying adjustable parameters for generative AI models](./images/playground/parameters.png)

The **Model Preferences** panel allows you to select a model for playground interaction, set a system prompt to guide the model's behavior, and configure inference parameters for the selected model. The available settings depend on the model and provider.

### Select a model
The dropdown list in the **Model Preferences** panel shows the models you have added to Foundry Toolkit. You can select **Browse Models** to open the model catalog and add more models.

### System prompt

A system prompt is an instruction that guides the model's behavior and response style. You can add, edit, or delete the system prompt in the input text area to influence how the model generates responses.

### Configure inference parameters
The available parameters depend on the model type and publisher. Common parameters include:
- Temperature: Controls the randomness of the model's output. Lower values make the output more deterministic. Higher values introduce more variability.
- Top P: Controls the diversity of the output by limiting the cumulative probability of the selected tokens. A lower value results in more focused responses. A higher value allows for more diverse outputs.
- Max Response Length (Tokens): Sets the maximum number of tokens in the model's response. This limits the length of the generated text.
- Frequency Penalty: Reduces the likelihood of the model repeating the same tokens in the response. Higher values discourage repetition.
- Presence Penalty: Encourages the model to introduce new topics or concepts in the response. Higher values promote diversity in the generated text.

### Show resource usage

For supported local models, there's an additional option **Show resource usage (preview)**. When enabled, resource usage is shown with each response.

![Screenshot showing 'Show resource usage' in Model Preferences panel](./images/playground/parameters-show-resource-usage.png)


## Chat prompt

![Chat prompt input box in Foundry Toolkit playground showing an attachment icon for adding files.](./images/playground/chat-prompt.png)

The chat prompt is the input text you provide to the model. You can enter a question, statement, or any text that you want the model to respond to. The model generates a response based on the provided prompt and the configured system prompts and parameters.

Available features in the chat prompt input box depend on the selected model and provider:
- **Send**: Submit the chat prompt to the model for processing.
- **Clear**: Clear the chat prompt input box.
- **File Attachment**: Attach files to the chat prompt for models that support file input.
- **Image Attachment**: Attach images to the chat prompt for models that support image input.
- **Web Search**: Perform a web search for models that support web search. Some models require **Use Responses API** for web search.
- **Mode Switch**: Switch between different modes for using AI features.

### Switch between modes
You can switch between different modes in the chat prompt input box:
- **Use [model] Native Supported AI Features**: Use the native capabilities of the selected model, such as web search or attachments when the model supports them.
- **Use All AI Features**: Use capabilities implemented by Foundry Toolkit when available for the selected model and provider.
- **Use Responses API**: Use the Responses API for supported models and features that require it, such as web search for some OpenAI models.

If a capability is not supported by the selected model or by Foundry Toolkit, a warning appears above the chat prompt input box. The warning recommends that you switch to a different model that supports the feature.

![Screenshot showing warning message displayed above the chat prompt input box stating Capability not supported.](./images/playground/capability-warning.png)

## Model responses
![Foundry Toolkit playground response area showing a generated Python code snippet for encoding text in base64, with options to copy or regenerate the response.](./images/playground/response-area.png)

Model responses are displayed above the chat prompt input box. Before you enter a chat prompt, the playground shows a welcome screen with three starter prompts for you to get started with the playground.

Available features in the model response area:
- **Copy Response**: Copy the model's response text to the clipboard.
- **Regenerate Response**: Regenerate the model's response based on the same prompt or regenerate response with another model.
- **Copy Code**: Copy the generated code in the response to the clipboard or insert it into a new file.
- **Rendering**: Playground supports rendering of code snippets, images, markdown, LaTex and other content in the model's response.
- **Token Count**: Displays token usage when the selected model returns token count information.

### Resource usage

When **Show resource usage (preview)** is enabled for a supported local model, a summary of usage is shown with each response. You can also switch to [Profiling](/docs/intelligentapps/profiling) details by selecting **Usage details**.

![Screenshot showing resource usage for one response](./images/playground/response-resource-usage.png)

## Tool bar

The tool bar in the playground provides quick access to various actions and features:
![Tool bar in Foundry Toolkit playground showing buttons for clearing chat history, saving chat, and switching modes.](./images/playground/tool-bar.png)

- **New Playground**: Create a new playground session.
- **History**: View, rename, delete, and switch to a chat history.
- **Automatic Naming**: Names of chat sessions are automatically generated based on the user prompt.
- **Compare**: Compare responses from different models side by side.
- **Open Code in VS Code**: View generated code for the selected model and prompt in VS Code.

### Compare model responses
![Screenshot showing side by side comparison of responses from different models in the Foundry Toolkit playground.](./images/playground/compare.png)

The **Compare** feature allows you to compare responses from configured models side by side. This is useful for evaluating the performance of different models on the same prompt. Available models and features depend on each model's provider and capabilities.

To compare model responses:
1. Select the **Compare** button in the tool bar.
2. Choose another configured model from the dropdown list.
3. Enter the same chat prompt in one of the input boxes. Your prompt is copied to the other input boxes.
4. Select **Send** to submit the prompt to all selected models.
5. The responses from each model appear side by side for easy comparison.

For each model you are comparing, you can:
- Copy the response text to the clipboard.
- Configure the model parameters for the selected model.
- Continue the chat with the selected model.

## What you learned

In this article, you learned how to:

- Use the Foundry Toolkit playground to interact with generative AI models.
- Test models in the playground, configure system prompts and parameters, and use supported multimodal capabilities.
- Use the Compare feature to evaluate the performance of different models on the same prompt and view responses side by side.
- Use the chat prompt input box to send prompts, attach files or images, perform web searches, and switch between modes when those features are supported by the selected model and provider.
- View model responses, copy or regenerate responses, and render code snippets, images, markdown, and LaTeX.
- Track token count when the selected model returns token usage.
- Use the Model Preferences panel to select models, set system prompts, and adjust inference parameters.
- Use the tool bar to create new playground sessions, view and manage chat history, automatically name sessions, compare models, and open generated code in VS Code.
- Manage chat history, including viewing, renaming, deleting, and switching between sessions.
