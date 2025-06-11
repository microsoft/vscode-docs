---
ContentId: e919aee8-fd2e-401b-9d83-0ff6f98b23ba
DateApproved: 14/06/2025
MetaDescription: Chat with selected generative AI model in playground. Change system prompt and parameters. Add attachment for Multi-Modal models. Keep chat history.
---
# Model playground in AI Toolkit
The AI Toolkit playground provides an interactive environment to experiment with generative AI models. You can test various prompts, adjust model parameters, compare responses from different models and explore multi-modal capabilities by attaching different types of input files.

![AI Toolkit playground interface showing a chat interaction with a generative AI model.](./images/playground/playground.png)

## Test a model in the playground

To access the playground:

- In AI Toolkit view, select **Tools** > **Playground**
- Select **Try in Playground** from a model card in the model catalog
- Double click a model from **MY Models** to open it in the playground

To test a model in the playground, follow these steps:

1. In **Model Preferences**, select a model from the dropdown list
1. Optionally, add **Systems Prompt** to guide the model response
1. Optionally, configure the model parameters, available for the selected model:
1. Enter a chat prompt in the chat input box

## Model preferences
![Model Preferences panel displaying adjustable parameters for generative AI models](./images/playground/parameters.png)

The **Model Preferences** panel allows you to select a model for playground interaction, set system prompts to guide the model's behavior and configure the model parameters for the selected model.

### Select a model
The dropdown list in the **Model Preferences** panel shows the models you have added to AI Toolkit. You can select **Browse Models** to open the model catalog and add more models.

### System prompt
A system prompt is a predefined instruction that guides the model's behavior and response style. You can add, edit, or delete the system prompt in the input text area to influence how the model generates responses.

### Configure inference parameters
The available parameters depend on the model type and publisher. Common parameters include:
- **Temperature**: Controls the randomness of the model's output. Lower values make the output more deterministic. Higher values introduce more variability.
- **Top P**: Controls the diversity of the output by limiting the cumulative probability of the selected tokens. A lower value results in more focused responses. A higher value allows for more diverse outputs.
- **Max Response Length (Tokens)**: Sets the maximum number of tokens in the model's response. This limits the length of the generated text.
- **Frequency Penalty**: Reduces the likelihood of the model repeating the same tokens in the response. Higher values discourage repetition.
- **Presence Penalty**: Encourages the model to introduce new topics or concepts in the response. Higher values promote diversity in the generated text.

## Chat prompt

![Chat prompt input box in AI Toolkit playground showing an attachment icon for adding files.](./images/playground/chat_prompt.png)

The chat prompt is the input text you provide to the model. You can enter a question, statement, or any text that you want the model to respond to. The model will generate a response based on the provided prompt and the configured system prompts and parameters.

Available features in the chat prompt input box:
- **Send**: Submit the chat prompt to the model for processing.
- **Clear**: Clear the chat prompt input box.
- **File Attachment**: Attach files to the chat prompt for multi-modal models.
- **Image Attachment**: Attach images to the chat prompt for multi-modal models.
- **Web Search**: Perform a web search to find information related to the chat prompt.
- **Mode Switch**: Switch between different modes for using AI features.

### Switch between modes
You can switch between different modes in the chat prompt input box:
- **Use native supported AI features from a model**: This mode allows you to use the native capabilities of the selected model, such as web search or file attachment.
- **Use all AI features**: This mode allows you to use AI feature implemented by AI Toolkit, such as file attachment regardless of the model's native capabilities.

If a capability is not supported by the selected model or by AI Toolkit, a warning appears above the chat prompt input box. The warning recommends that you switch to a different model that supports the feature.

![Screenshot showing warning message displayed above the chat prompt input box stating Capability not supported.](./images/playground/capability_warning.png)
