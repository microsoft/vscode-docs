---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9bdc3d4e-e6ba-43d3-bd09-2e127cb63ce7
DateApproved: 02/1/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to adding AI-powered features to a VS Code extension by using language models and natural language understanding.
---

# Language Model API

The Language Model API enables you to [access the Language Model](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.languageModels.d.ts) and integrate AI-powered features and natural language processing in your Visual Studio Code extension.

You can use the Language Model API in different types of extensions. A typical use for this API is in [chat extensions](/api/extension-guides/chat), where you use a language model to interpret the user's request and help provide an answer. However, the use of the Language Model API is not limited to this scenario. You might use a language model in a [language](/api/language-extensions/overview) or [debugger](/api/extension-guides/debugger-extension) extension, or as part of a [command](/api/extension-guides/command) or [task](/api/extension-guides/task-provider) in a custom extension. For example, the Rust extension might use the Language Model to offer default names to improve its rename experience.

The process for using the Language Model API consists of the following steps:

1. Request access to a specific language model
1. Build the language model prompt
1. Send the language model request
1. Interpret the response

> **Note**: The Language Model API is in a [proposed state](https://code.visualstudio.com/api/advanced-topics/using-proposed-api) and we are actively working on adding more functionality. Share your feedback in [this GitHub issue](https://github.com/microsoft/vscode/issues/199908) or create new issues.

## Links

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)

### VS Code API Usage

- [LanguageModels](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.languageModels.d.ts)

## Request language model access

Extensions can get access to the Copilot Language Model using the `vscode.chat.requestLanguageModelAccess` method. You have to provide the name of the specific language model as an input parameter. Currently, only `copilot-gpt-3.5-turbo` and `copilot-gpt-4` are supported. It's expected that the list of supported models will grow over time.

The following code snippet shows how to request access to the `copilot-gpt-3.5-turbo` language model:

```typescript
const access = await vscode.chat.requestLanguageModelAccess('copilot-gpt-3.5-turbo');
```

## Prompt crafting

After they receive model access, extensions can craft their prompt and send a request to the language model. Extensions can use two types of prompts:

- `LanguageModelSystemMessage`: provides instructions to the language model on the broad task that you're using the model for. It defines the context in which user messages are interpreted. In the following example, the system message is used to specify the persona used by the model in its replies and what rules the model should follow.
- `LanguageModelUserMessage`: the specific request or instruction coming from the user, or determined by the specific task to be accomplished. For example, to provide alternative names for renaming a symbol.

```typescript
const craftedPrompt = [
    new vscode.LanguageModelSystemMessage('You are a cat! Think carefully and step by step like a cat would. Your job is to explain computer science concepts in the funny manner of a cat, using cat metaphors. Always start your response by stating what concept you are explaining. Always include code samples.'),
    new vscode.LanguageModelUserMessage('I want to understand recursion')
];
const chatRequest = access.makeChatRequest(craftedPrompt, {}, token);
```

For prompt engineering, we suggest reading OpenAI's excellent [guidelines](https://platform.openai.com/docs/guides/prompt-engineering).

>**Tip:** use the rich VS Code extension API to get the most relevant context to include in a prompt (e.g. the active file).

## Send the language model request

Once you've built the prompt for the language model, you can send the request by using `makeChatRequest`.

```typescript
const chatRequest = access.makeChatRequest(craftedPrompt, {}, token);
```

## Interpret the response

The following code snippet shows how an extension can register a command, that uses the language model access to change all variable names in the active editor with funny cat names. The response from the Language Model API is streaming-based, so the extension streams the code back to the editor for a smooth user experience:

```typescript
 vscode.commands.registerTextEditorCommand('cat.namesInEditor', async (textEditor: vscode.TextEditor) => {
    // Replace all variables in active editor with cat names and words
    const text = textEditor.document.getText();
    const access = await vscode.lm.requestLanguageModelAccess('copilot-gpt-3.5-turbo');
    const messages = [
        new vscode.LanguageModelSystemMessage(`You are a cat! Your job is to replace all variable names in the following code with funny cat variable names. Be creative. IMPORTANT respond just with code. Do not use markdown!`),
        new vscode.LanguageModelUserMessage(text)
    ];
    const chatRequest = access.makeChatRequest(messages, {}, new vscode.CancellationTokenSource().token);

    // Clear the editor content before inserting new content
    await textEditor.edit(edit => {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
        edit.delete(new vscode.Range(start, end));
    });

    // Stream the code into the editor as it is coming in from the Language Model
    for await (const fragment of chatRequest.stream) {
        await textEditor.edit(edit => {
            const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
            const position = new vscode.Position(lastLine.lineNumber, lastLine.text.length);
            edit.insert(position, fragment);
        });
    }
});
```

## Considerations

### Model availability

We don't expect specific models to stay supported forever. When you reference a language model in your extension, make sure to take a "defensive" approach when requesting access. This means that you should gracefully handle cases where access to a particular model is not granted.

### Choosing the appropriate model

Extension authors can choose which model is the most appropriate for their extension. We recommend starting with less powerful models first (e.g `copilot-gpt-3.5-turbo`), because they are faster and might allow for a smooth user experience. You might use more powerful, but slower models (for example, `copilot-gpt-4`) for complex tasks, and only after the faster models prove to be inadequate.

>**Note:** both `copilot-gpt-3.5-turbo` and `copilot-gpt-4` models have the limit of `4K` tokens. These limits will be expanded as we learn more how extensions are using the language models.

### Rate limiting

Extensions should responsibly use the language model and be aware of rate limiting. VS Code is transparent to the user regarding how extensions are using language models and how many requests each extension is sending and how that influences their respective quotas.

Extensions should not request Language Model API access for integration tests due to rate-limitations. Internally, VS Code uses a dedicated non-production language model for simulation testing, and we are currently thinking how to provide a scalable language model testing solution for extensions.

## Testing your extension

The responses that the Language Model API provides are nondeterministic, which means that you might get a different response for an identical request. This behavior can be challenging for testing your extension.

The part of the extension for building prompts and interpreting language model responses is deterministic, and can thus be unit tested without language model access. However, interacting and getting responses from the language model itself, is nondeterministic and can not be easily tested. Consider designing your extension code in a modular way to enable you to unit test the specific parts that can be tested.

Extensions should not request Language Model access for integration tests due to rate-limitations. Internally, VS Code uses a dedicated non-production Language Model for simulation testing, and we are currently thinking how to provide a scalable Language Model testing solution for extensions that are facing a similar challenge.

## Publishing your extension

Once we finalize the Language Model API (expected early April 2024), you can publish your extension to the Visual Studio Marketplace:

- By publishing to the VS Marketplace your extension is adhering to the [GitHub Copilot extensibility acceptable development and use policy](TODO@isidorn add link).
- Upload to the Marketplace as described in [Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Related content

- [Build a chat extension](/api/extension-guides/chat)
