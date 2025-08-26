---
# DO NOT TOUCH — Managed by doc writer
ContentId: 7f90ee4f-cac1-4b99-aee6-c99e088789d0
DateApproved: 08/07/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to implement a LanguageModelChatProvider to contribute custom language models to VS Code's chat experience for extensions.
---

# Language Model Chat Provider API

The Language Model Chat Provider API enables you to contribute your own language models to chat in Visual Studio Code.

> **Important**: The Language Model Chat Provider API is currently a proposed API. You need to add `"chatProvider"` to the `enabledApiProposals` array in your extension's `package.json` to use this API.

## Overview

The `LanguageModelChatProvider` interface follows a one-provider-to-many-models relationship, enabling providers to offer multiple models. Each provider is responsible for:

- Discovering and preparing available language models
- Handling chat requests for its models
- Providing token counting functionality

## Language model information

Each language model must provide metadata through the `LanguageModelChatInformation` interface. The `prepareLanguageModelChatInformation` method returns an array of these objects to inform VS Code about the available models.

```typescript
interface LanguageModelChatInformation {
    readonly id: string;                    // Unique identifier for the model
    readonly name: string;                  // Human-readable name
    readonly family: string;                // Model family (e.g., "gpt-4", "claude")
    readonly version: string;               // Version string
    readonly maxInputTokens: number;        // Maximum input token limit
    readonly maxOutputTokens: number;       // Maximum output token limit
    readonly tooltip?: string;              // Optional tooltip text
    readonly detail?: string;               // Additional detail text
    readonly isDefault?: boolean;           // Whether this is a default model
    readonly isUserSelectable?: boolean;    // Whether shown in model picker
    readonly requiresAuthorization?: true | { label: string };
    readonly capabilities?: {
        readonly imageInput?: boolean;      // Supports image inputs
        readonly toolCalling?: boolean | number; // Supports tool calling
    };
}
```

## Register the provider

1. The first step is to register the provider in your `package.json`, in the `contributes.languageModels` section. Provide a unique `vendor` ID and a `displayName`.

    ```json
    {
        "contributes": {
            "languageModels": [
                {
                    "vendor": "my-provider",
                    "displayName": "My Provider"
                }
            ]
        }
    }
    ```

1. Next, in your extension activation function, register your language model provider using the `lm.registerLanguageModelChatProvider` method.

    Provide the provider ID that you used in the `package.json` and an instance of your provider class:

    ```typescript
    import * as vscode from 'vscode';
    import { SampleChatModelProvider } from './provider';

    export function activate(_: vscode.ExtensionContext) {
        vscode.lm.registerChatModelProvider('my-provider', new SampleChatModelProvider());
    }
    ```

## Implement the provider

A language provider must implement the `LanguageModelChatProvider` interface, which has three main methods:

- `prepareLanguageModelChatInformation`: returns the list of available models
- `provideLanguageModelChatResponse`: handles chat requests and streams responses
- `provideTokenCount`: implements token counting functionality

### Prepare language model information

The `prepareLanguageModelChatInformation` method is called by VS Code to discover the available models and returns a list of `LanguageModelChatInformation` objects. The `displayName` is shown in the model picker in chat.

Use the `options.silent` parameter to control whether to prompt the user for credentials or extra configuration:

```typescript
async prepareLanguageModelChatInformation(
    options: { silent: boolean },
    token: CancellationToken
): Promise<LanguageModelChatInformation[]> {
    if (options.silent) {
        return []; // Don't prompt user in silent mode
    } else {
        await this.promptForApiKey(); // Prompt user for credentials
    }

    // Fetch available models from your service
    const models = await this.fetchAvailableModels();

    return models.map(model => ({
        id: model.id,
        name: model.displayName,
        family: model.family,
        version: '1.0.0',
        maxInputTokens: model.contextWindow - model.maxOutput,
        maxOutputTokens: model.maxOutput,
        capabilities: {
            imageInput: model.supportsImages,
            toolCalling: model.supportsTools
        },
        requiresAuthorization: true
    }));
}
```

### Handle chat requests

The `provideLanguageModelChatResponse` method handles actual chat requests. Use the `progress` parameter to stream response chunks:

```typescript
async provideLanguageModelChatResponse(
    model: LanguageModelChatInformation,
    messages: readonly LanguageModelChatRequestMessage[],
    options: LanguageModelChatRequestHandleOptions,
    progress: Progress<LanguageModelResponsePart>,
    token: CancellationToken
): Promise<void> {

    // TODO: Implement message processing, tool calls, and streaming response

    // Optionally, differentiate behavior based on model ID
    if (model.id === "my-model-a") {
        progress.report({index: 0, part: new LanguageModelTextPart("This is my A response.") });
    } else {
        progress.report({ index: 0, part: new LanguageModelTextPart("Unknown model.") });
    }
}
```

### Provide token count

The `provideTokenCount` method is responsible for estimating the number of tokens in a given text input:

```typescript
async provideTokenCount(
    model: LanguageModelChatInformation,
    text: string | LanguageModelChatRequestMessage,
    token: CancellationToken
): Promise<number> {
    // TODO: Implement token counting for your models

    // Simple estimation for strings
    return Math.ceil(text.toString().length / 4);
}
```

## Message format and conversion

Your provider receives messages in the `LanguageModelChatRequestMessage` format, which you'll typically need to convert to your service's API format:

```typescript
interface LanguageModelChatRequestMessage {
    readonly role: LanguageModelChatMessageRole;
    readonly content: ReadonlyArray<LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelToolCallPart | unknown>;
    readonly name: string | undefined;
}
```

Convert these messages appropriately for your language model API:

```typescript
private convertMessages(messages: readonly LanguageModelChatRequestMessage[]) {
    return messages.map(msg => ({
        role: msg.role === vscode.LanguageModelChatMessageRole.User ? 'user' : 'assistant',
        content: msg.content
            .filter(part => part instanceof vscode.LanguageModelTextPart)
            .map(part => (part as vscode.LanguageModelTextPart).value)
            .join('')
    }));
}
```

## Response parts

Your provider can report different types of response parts through the progress callback:

- `LanguageModelTextPart` - Text content
- `LanguageModelToolCallPart` - Tool/function calls
- `LanguageModelDataPart` - Arbitrary data (with proposed API)
- `LanguageModelThinkingPart` - Internal reasoning (with proposed API)

## Related content

- [VS Code API Reference](/api/references/vscode-api)
- [Language Model API Guide](/api/extension-guides/ai/language-model)
- [Chat API Extension](/api/extension-guides/ai/chat)
