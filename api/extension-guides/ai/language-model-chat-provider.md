---
# DO NOT TOUCH — Managed by doc writer
ContentId: 7f90ee4f-cac1-4b99-aee6-c99e088789d0
DateApproved: 09/11/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn how to implement a LanguageModelChatProvider to contribute custom language models to VS Code's chat experience for extensions.
---

# Language Model Chat Provider API

The Language Model Chat Provider API enables you to contribute your own language models to chat in Visual Studio Code.

> [!IMPORTANT]
> Models provided through this API are currently only available to users on [individual GitHub Copilot plans](https://docs.github.com/en/copilot/concepts/billing/individual-plans).

## Overview

The `LanguageModelChatProvider` interface follows a one-provider-to-many-models relationship, enabling providers to offer multiple models. Each provider is responsible for:

- Discovering and preparing available language models
- Handling chat requests for its models
- Providing token counting functionality

## Language model information

Each language model must provide metadata through the `LanguageModelChatInformation` interface. The `provideLanguageModelChatInformation` method returns an array of these objects to inform VS Code about the available models.

```typescript
interface LanguageModelChatInformation {
    readonly id: string;                    // Unique identifier for the model - unique within the provider
    readonly name: string;                  // Human-readable name of the language model - shown in the model picker
    readonly family: string;                // Model family name
    readonly version: string;               // Version string
    readonly maxInputTokens: number;        // Maximum number of tokens the model can accept as input
    readonly maxOutputTokens: number;       // Maximum number of tokens the model is capable of producing
    readonly tooltip?: string;              // Optional tooltip text when hovering the model in the UI
    readonly detail?: string;               // Human-readable text that is rendered alongside the model
    readonly capabilities: {
        readonly imageInput?: boolean;      // Supports image inputs
        readonly toolCalling?: boolean | number; // Supports tool calling
    };
}
```

## Register the provider

1. The first step is to register the provider in your `package.json`, in the `contributes.languageModelChatProviders` section. Provide a unique `vendor` ID and a `displayName`.

    ```json
    {
        "contributes": {
            "languageModelChatProviders": [
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
        vscode.lm.registerLanguageModelChatProvider('my-provider', new SampleChatModelProvider());
    }
    ```

1. Optionally, provide a `contributes.languageModelChatProviders.managementCommand` in your `package.json` to allow users to manage the language model provider.

    The value of the `managementCommand` property must be a command defined in the `contributes.commands` section of your `package.json`. In your extension, register the command (`vscode.commands.registerCommand`) and implement the logic for managing the provider such as configuring API keys or other settings.

    ```json
    {
        "contributes": {
            "languageModelChatProviders": [
                {
                    "vendor": "my-provider",
                    "displayName": "My Provider",
                    "managementCommand": "my-provider.manage"
                }
            ],
            "commands": [
                {
                    "command": "my-provider.manage",
                    "title": "Manage My Provider"
                }
            ]
        }
    }
    ```

## Implement the provider

A language provider must implement the `LanguageModelChatProvider` interface, which has three main methods:

- `provideLanguageModelChatInformation`: returns the list of available models
- `provideLanguageModelChatResponse`: handles chat requests and streams responses
- `provideTokenCount`: implements token counting functionality

### Prepare language model information

The `provideLanguageModelChatInformation` method is called by VS Code to discover the available models and returns a list of `LanguageModelChatInformation` objects.

Use the `options.silent` parameter to control whether to prompt the user for credentials or extra configuration:

```typescript
async provideLanguageModelChatInformation(
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

    // Map your models to LanguageModelChatInformation format
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
        }
    }));
}
```

### Handle chat requests

The `provideLanguageModelChatResponse` method handles actual chat requests. The provider receives an array of messages in the `LanguageModelChatRequestMessage` format and you can optionally convert them to the format required by your language model API (see [Message format and conversion](#message-format-and-conversion)).

Use the `progress` parameter to stream response chunks. The response can include text parts, tool calls, and tool results (see [Response parts](#response-parts)).

```typescript
async provideLanguageModelChatResponse(
    model: LanguageModelChatInformation,
    messages: readonly LanguageModelChatRequestMessage[],
    options: ProvideLanguageModelChatResponseOptions,
    progress: Progress<LanguageModelResponsePart>,
    token: CancellationToken
): Promise<void> {

    // TODO: Implement message conversion, processing, and response streaming

    // Optionally, differentiate behavior based on model ID
    if (model.id === "my-model-a") {
        progress.report(new LanguageModelTextPart("This is my A response."));
    } else {
        progress.report(new LanguageModelTextPart("Unknown model."));
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

    // Example estimation for strings
    return Math.ceil(text.toString().length / 4);
}
```

## Message format and conversion

Your provider receives messages in the `LanguageModelChatRequestMessage` format, which you'll typically need to convert to your service's API format. The message content can be a mix of text parts, tool calls, and tool results.

```typescript
interface LanguageModelChatRequestMessage {
    readonly role: LanguageModelChatMessageRole;
    readonly content: ReadonlyArray<LanguageModelInputPart | unknown>;
    readonly name: string | undefined;
}
```

Optionally, convert these messages appropriately for your language model API:

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

Your provider can report different types of response parts through the progress callback via the `LanguageModelResponsePart` type, which can be one of:

- `LanguageModelTextPart` - Text content
- `LanguageModelToolCallPart` - Tool/function calls
- `LanguageModelToolResultPart` - Tool result content

## Getting started

You can get started with a [basic example project](https://github.com/microsoft/vscode-extension-samples/blob/main/chat-model-provider-sample).

## Related content

- [VS Code API Reference](/api/references/vscode-api)
- [Language Model API Guide](/api/extension-guides/ai/language-model)
- [Chat API Extension](/api/extension-guides/ai/chat)
