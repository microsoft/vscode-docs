---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9bdc3d4e-e6ba-43d3-bd09-2e127cb63ce7
DateApproved: 04/04/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to adding AI-powered features to a VS Code extension by using language models and natural language understanding.
---

# Language Model API

The Language Model API enables you to [use the Language Model](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.languageModels.d.ts) and integrate AI-powered features and natural language processing in your Visual Studio Code extension.

You can use the Language Model API in different types of extensions. A typical use for this API is in [chat extensions](/api/extension-guides/chat), where you use a language model to interpret the user's request and help provide an answer. However, the use of the Language Model API is not limited to this scenario. You might use a language model in a [language](/api/language-extensions/overview) or [debugger](/api/extension-guides/debugger-extension) extension, or as part of a [command](/api/extension-guides/command) or [task](/api/extension-guides/task-provider) in a custom extension. For example, the Rust extension might use the Language Model to offer default names to improve its rename experience.

The process for using the Language Model API consists of the following steps:

1. Build the language model prompt
1. Send the language model request
1. Interpret the response

> **Note**: The Language Model API is in a [proposed state](https://code.visualstudio.com/api/advanced-topics/using-proposed-api) and we are actively working on adding more functionality. Share your feedback in [this GitHub issue](https://github.com/microsoft/vscode/issues/199908) or create new issues.

## Links

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)
- [LanguageModels API](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.languageModels.d.ts)
- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)

## Prompt crafting

To interact with a language model, extensions should first craft their prompt and then send a request to the language model. Extensions can use two types of prompts:

- `LanguageModelChatSystemMessage`: provides instructions to the language model on the broad task that you're using the model for. It defines the context in which user messages are interpreted. In the following example, the system message is used to specify the persona used by the model in its replies and what rules the model should follow.
- `LanguageModelChatUserMessage`: the specific request or instruction coming from the user, or determined by the specific task to be accomplished. For example, to provide alternative names for renaming a symbol.

```typescript
const craftedPrompt = [
    new vscode.LanguageModelChatSystemMessage('You are a cat! Think carefully and step by step like a cat would. Your job is to explain computer science concepts in the funny manner of a cat, using cat metaphors. Always start your response by stating what concept you are explaining. Always include code samples.'),
    new vscode.LanguageModelChatUserMessage('I want to understand recursion')
];
```

For prompt engineering, we suggest reading OpenAI's excellent [guidelines](https://platform.openai.com/docs/guides/prompt-engineering).

>**Tip:** use the rich VS Code extension API to get the most relevant context to include in a prompt (e.g. the active file).

## Send the language model request

Once you've built the prompt for the language model, you can send the request by using `sendChatRequest`. You have to provide the name of the specific language model as an input parameter. Currently, only `copilot-gpt-3.5-turbo` and `copilot-gpt-4` are supported. It's expected that the list of supported models will grow over time.

When you make a request to the Language Model API, the request might fail. For example, because the model doesn't exist, or the user didn't give consent to use the Language Model API, or because quota limits are exceeded. Use `LanguageModelError` to distinguish between different types of errors.

The following code snippet shows how to make a language model request:

```typescript
try {
    const chatRequest = vscode.lm.sendChatRequest('copilot-gpt-3.5-turbo', craftedPrompt, {}, token);
} catch (err) {
    // Making the chat request might fail because
    // - model does not exist
    // - user consent not given
    // - quota limits were exceeded
    if (err instanceof vscode.LanguageModelError) {
        console.log(err.message, err.code, err.cause)
    } else {
        // add other error handling logic
    }
}
```

## Interpret the response

After you've sent the request, you have to process the response from the language model API. Depending on your usage scenario, you can pass the response directly on to the user, or you can interpret the response and perform additional logic.

The response from the Language Model API is streaming-based, which enables you to provide a smooth user experience. For example, by reporting results and progress continuously when you use the API in combination with the [Chat API](/api/extension-guides/chat).

Errors might occur while processing the streaming response, such as network connection issues. Make sure to add appropriate error handling in your code to handle these errors.

The following code snippet shows how an extension can register a command, which uses the language model to change all variable names in the active editor with funny cat names. Notice that the extension streams the code back to the editor for a smooth user experience.

```typescript
 vscode.commands.registerTextEditorCommand('cat.namesInEditor', async (textEditor: vscode.TextEditor) => {
    // Replace all variables in active editor with cat names and words
    const text = textEditor.document.getText();
    const messages = [
        new vscode.LanguageModelChatSystemMessage(`You are a cat! Think carefully and step by step like a cat would.
        Your job is to replace all variable names in the following code with funny cat variable names. Be creative. IMPORTANT respond just with code. Do not use markdown!`),
        new vscode.LanguageModelChatUserMessage(text)
    ];

    try {
        const chatRequest = await vscode.lm.sendChatRequest('copilot-gpt-3.5-turbo', messages, {}, new vscode.CancellationTokenSource().token);
    } catch (err) {
        if (err instanceof vscode.LanguageModelError) {
            console.log(err.message, err.code, err.cause)
        }
        return
    }

    // Clear the editor content before inserting new content
    await textEditor.edit(edit => {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
        edit.delete(new vscode.Range(start, end));
    });

    try {
        // Stream the code into the editor as it is coming in from the Language Model
        for await (const fragment of chatRequest.stream) {
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

Extension authors can choose which model is the most appropriate for their extension. We recommend starting with less powerful models first (e.g `copilot-gpt-3.5-turbo`), because they are faster and might allow for a smooth user experience. You might use more powerful, but slower models (for example, `copilot-gpt-4`) for complex tasks, and only after the faster models prove to be inadequate.

>**Note:** both `copilot-gpt-3.5-turbo` and `copilot-gpt-4` models have the limit of `4K` tokens. These limits will be expanded as we learn more how extensions are using the language models.

### Rate limiting

Extensions should responsibly use the language model and be aware of rate limiting. VS Code is transparent to the user regarding how extensions are using language models and how many requests each extension is sending and how that influences their respective quotas.

Extensions should not use the Language Model API for integration tests due to rate-limitations. Internally, VS Code uses a dedicated non-production language model for simulation testing, and we are currently thinking how to provide a scalable language model testing solution for extensions.

## Testing your extension

The responses that the Language Model API provides are nondeterministic, which means that you might get a different response for an identical request. This behavior can be challenging for testing your extension.

The part of the extension for building prompts and interpreting language model responses is deterministic, and can thus be unit tested without using an actual language model. However, interacting and getting responses from the language model itself, is nondeterministic and can’t be easily tested. Consider designing your extension code in a modular way to enable you to unit test the specific parts that can be tested.

## Publishing your extension

Once we finalize the Language Model API (expected in the next couple of months), you can publish your extension to the Visual Studio Marketplace:

- By publishing to the VS Marketplace your extension is adhering to the GitHub Copilot extensibility acceptable development and use policy
- Update the attributes in the `package.json` to make it easy for users to find your extension. Add "AI" to the `categories` field in your `package.json`. If your extension contributes a Chat Participant, add "Chat" as well.
- Upload to the Marketplace as described in [Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Related content

- [Build a chat extension](/api/extension-guides/chat)
