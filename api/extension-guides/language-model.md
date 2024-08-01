---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9bdc3d4e-e6ba-43d3-bd09-2e127cb63ce7
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to adding AI-powered features to a VS Code extension by using language models and natural language understanding.
---

# Language Model API

The Language Model API enables you to [use the Language Model](/api/references/vscode-api#lm) and integrate AI-powered features and natural language processing in your Visual Studio Code extension.

You can use the Language Model API in different types of extensions. A typical use for this API is in [chat extensions](/api/extension-guides/chat), where you use a language model to interpret the user's request and help provide an answer. However, the use of the Language Model API is not limited to this scenario. You might use a language model in a [language](/api/language-extensions/overview) or [debugger](/api/extension-guides/debugger-extension) extension, or as part of a [command](/api/extension-guides/command) or [task](/api/extension-guides/task-provider) in a custom extension. For example, the Rust extension might use the Language Model to offer default names to improve its rename experience.

The process for using the Language Model API consists of the following steps:

1. Build the language model prompt
1. Send the language model request
1. Interpret the response

The following sections provide more details on how to implement these steps in your extension.

> **Note:** The Language Model API is finalized in VS Code Insiders and will be finalized in VS Code Stable release in July 2024. We suggest that you use the `engines` property in your `package.json` to specify that your extension requires VS Code versions greater than or equal to `1.90.0`. VS Code Stable will gracefully handle extensions that use the Language Model API before it is finalized.

## Links

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)
- [LanguageModels API](/api/references/vscode-api#lm)
- [@vscode/prompt-tsx npm package](https://www.npmjs.com/package/@vscode/prompt-tsx)

## Build the language model prompt

To interact with a language model, extensions should first craft their prompt, and then send a request to the language model. You can use prompts to provide instructions to the language model on the broad task that you're using the model for. Prompts can also define the context in which user messages are interpreted.

The Language Model API supports two types of messages when building the language model prompt:

- **User** - used for providing instructions and the user's request
- **Assistant** - used for adding the history of previous language model responses as context to the prompt

> **Note**: Currently, the Language Model API doesn't support the use of system messages.

You can use two approaches for building the language model prompt:

- `LanguageModelChatMessage` - create the prompt by providing one or more messages as strings. You might use this approach if you're just getting started with the Language Model API.
- [`@vscode/prompt-tsx`](https://www.npmjs.com/package/@vscode/prompt-tsx) - declare the prompt by using the TSX syntax.

You can use the `prompt-tsx` library if you want more control over how the language model prompt is composed. For example, the library can help with dynamically adapting the length of the prompt to each language model's context window size. Learn more about [`@vscode/prompt-tsx`](https://www.npmjs.com/package/@vscode/prompt-tsx) or explore the [chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample) to get started.

To learn more about the concepts of prompt engineering, we suggest reading OpenAI's excellent [Prompt engineering guidelines](https://platform.openai.com/docs/guides/prompt-engineering).

>**Tip:** take advantage of the rich VS Code extension API to get the most relevant context and include it in your prompt. For example, to include the contents of the active file in the editor.

### Use the `LanguageModelChatMessage` class

The Language Model API provides the `LanguageModelChatMessage` class to represent and create chat messages. You can use the `LanguageModelChatMessage.User` or `LanguageModelChatMessage.Assistant` methods to create user or assistant messages respectively.

In the following example, the first message provides context for the prompt:

- The persona used by the model in its replies (in this case, a cat)
- The rules the model should follow when generating responses (in this case, explaining computer science concepts in a funny manner by using cat metaphors)

The second message then provides the specific request or instruction coming from the user. It determines the specific task to be accomplished, given the context provided by the first message.

```typescript
const craftedPrompt = [
    new vscode.LanguageModelChatMessage.User('You are a cat! Think carefully and step by step like a cat would. Your job is to explain computer science concepts in the funny manner of a cat, using cat metaphors. Always start your response by stating what concept you are explaining. Always include code samples.'),
    new vscode.LanguageModelChatMessage.User('I want to understand recursion')
];
```

## Send the language model request

Once you've built the prompt for the language model, you first select the language model you want to use with the [`selectChatModels`](/api/references/vscode-api#lm.selectChatModels) method. This method returns an array of language models that match the specified criteria. Then, you send the request to the language model by using the [`sendRequest`](/api/references/vscode-api#LanguageModelChat) method.

To select the language model, you can specify the following properties: `vendor`, `id`, `family`, or `version`. Use these properties to either broadly match all models of a given vendor or family, or select one specific model by its ID. Learn more about these properties in the [API reference](/api/references/vscode-api#LanguageModelChat).

> **Note**: Currently, `gpt-4o`, `gpt-4` and `gpt-3.5-turbo` are supported for the language model family. We expect that the list of supported models will grow over time.

If there are no models that match the specified criteria, the `selectChatModels` method returns an empty array. Your extension must appropriately handle this case.

The following example shows how to select all `Copilot` models, regardless of the family or version:

```typescript
const models = await vscode.lm.selectChatModels({
  vendor: 'copilot'
});

// No models available
if (models.length === 0) {
  // TODO: handle the case when no models are available
}
```

> **Important**: Copilot's language models require consent from the user before an extension can use them. Consent is implemented as an authentication dialog. Because of that, `selectChatModels` should be called as part of a user-initiated action, such as a command.

After you select a model, you can send a request to the language model by invoking the [`sendRequest`](/api/references/vscode-api#LanguageModelChat) method on the model instance. You pass the [prompt](#build-the-language-model-prompt) you crafted earlier, along with any additional options, and a cancellation token.

When you make a request to the Language Model API, the request might fail. For example, because the model doesn't exist, or the user didn't give consent to use the Language Model API, or because quota limits are exceeded. Use `LanguageModelError` to distinguish between different types of errors.

The following code snippet shows how to make a language model request:

```typescript
try {
    const [model] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
    const request = model.sendRequest(craftedPrompt, {}, token);
} catch (err) {
    // Making the chat request might fail because
    // - model does not exist
    // - user consent not given
    // - quota limits were exceeded
    if (err instanceof vscode.LanguageModelError) {
        console.log(err.message, err.code, err.cause);
        if (err.cause instanceof Error && err.cause.message.includes('off_topic')) {
            stream.markdown(vscode.l10n.t('I\'m sorry, I can only explain computer science concepts.'));
        }
    } else {
        // add other error handling logic
        throw err;
    }
}
```

## Interpret the response

After you've sent the request, you have to process the response from the language model API. Depending on your usage scenario, you can pass the response directly on to the user, or you can interpret the response and perform extra logic.

The response ([`LanguageModelChatResponse`](/api/references/vscode-api#LanguageModelChatResponse)) from the Language Model API is streaming-based, which enables you to provide a smooth user experience. For example, by reporting results and progress continuously when you use the API in combination with the [Chat API](/api/extension-guides/chat).

Errors might occur while processing the streaming response, such as network connection issues. Make sure to add appropriate error handling in your code to handle these errors.

The following code snippet shows how an extension can register a command, which uses the language model to change all variable names in the active editor with funny cat names. Notice that the extension streams the code back to the editor for a smooth user experience.

```typescript
 vscode.commands.registerTextEditorCommand('cat.namesInEditor', async (textEditor: vscode.TextEditor) => {
    // Replace all variables in active editor with cat names and words

    const [model] = await vscode.lm.selectChatModels({ vendor: 'copilot', family: 'gpt-4o' });
    let chatResponse: vscode.LanguageModelChatResponse | undefined;

    const text = textEditor.document.getText();

    const messages = [
        vscode.LanguageModelChatMessage.User(`You are a cat! Think carefully and step by step like a cat would.
        Your job is to replace all variable names in the following code with funny cat variable names. Be creative. IMPORTANT respond just with code. Do not use markdown!`),
        vscode.LanguageModelChatMessage.User(text)
    ];

    try {
        chatResponse = await model.sendRequest(messages, {}, new vscode.CancellationTokenSource().token);
    } catch (err) {
        if (err instanceof vscode.LanguageModelError) {
            console.log(err.message, err.code, err.cause)
        } else {
            throw err;
        }
        return;
    }

    // Clear the editor content before inserting new content
    await textEditor.edit(edit => {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
        edit.delete(new vscode.Range(start, end));
    });

    try {
        // Stream the code into the editor as it is coming in from the Language Model
        for await (const fragment of chatResponse.text) {
            await textEditor.edit(edit => {
                const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
                const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
                edit.insert(position, fragment);
            });
        }
    } catch (err) {
        // async response stream may fail, e.g network interruption or server side error
        await textEditor.edit(edit => {
            const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
            const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
            edit.insert(position, (<Error>err).message);
        });
    }
});
```

## Considerations

### Model availability

We don't expect specific models to stay supported forever. When you reference a language model in your extension, make sure to take a "defensive" approach when sending requests to that language model. This means that you should gracefully handle cases where you don't have access to a particular model.

### Choosing the appropriate model

Extension authors can choose which model is the most appropriate for their extension. We recommend using `gpt-4o` for its performance and quality. In addition, `gpt-3.5-turbo`, and `gpt-4` are also available. To get a full list of available models, you can use this code snippet:
```typescript
const allModels = await vscode.lm.selectChatModels(MODEL_SELECTOR);
```
> **Note**: All models have a limit of `4K` tokens. The returned model object from the `selectChatModels` call has a `maxInputTokens` attribute that shows the token limit. These limits will be expanded as we learn more about how extensions are using the language models.

### Rate limiting

Extensions should responsibly use the language model and be aware of rate limiting. VS Code is transparent to the user regarding how extensions are using language models and how many requests each extension is sending and how that influences their respective quotas.

Extensions should not use the Language Model API for integration tests due to rate-limitations. Internally, VS Code uses a dedicated non-production language model for simulation testing, and we are currently thinking how to provide a scalable language model testing solution for extensions.

## Testing your extension

The responses that the Language Model API provides are nondeterministic, which means that you might get a different response for an identical request. This behavior can be challenging for testing your extension.

The part of the extension for building prompts and interpreting language model responses is deterministic, and can thus be unit tested without using an actual language model. However, interacting and getting responses from the language model itself, is nondeterministic and can’t be easily tested. Consider designing your extension code in a modular way to enable you to unit test the specific parts that can be tested.

## Publishing your extension

Once you have created your AI extension, you can publish your extension to the Visual Studio Marketplace:

- Before publishing to the VS Marketplace we recommend that you read the [Microsoft AI tools and practices guidelines](https://www.microsoft.com/en-us/ai/tools-practices). These guidelines provide best practices for the responsible development and use of AI technologies.
- By publishing to the VS Marketplace, your extension is adhering to the [GitHub Copilot extensibility acceptable development and use policy](https://docs.github.com/en/early-access/copilot/github-copilot-extensibility-platform-partnership-plugin-acceptable-development-and-use-policy).
- Update the attributes in the `package.json` to make it easy for users to find your extension. Add "AI" to the `categories` field in your `package.json`. If your extension contributes a Chat Participant, add "Chat" as well.
- If your extension already contributes functionality other than using the Language Model API, we recommend that you do not introduce an extension dependency on GitHub Copilot in the [extension manifest](/api/references/extension-manifest). This ensures that extension users that do not use GitHub Copilot can use the non language model functionality without having to install GitHub Copilot. Make sure to have appropriate error handling when accessing language models for this case.
- Upload to the Marketplace as described in [Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Related content

- [Build a VS Code chat extension](/api/extension-guides/chat)
- [Learn more about @vscode/prompt-tsx](https://www.npmjs.com/package/@vscode/prompt-tsx)
- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)
- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
