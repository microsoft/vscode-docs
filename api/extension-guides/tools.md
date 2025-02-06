---
# DO NOT TOUCH — Managed by doc writer
ContentId: aa6d312f-cbac-4633-8579-64d3cb4d17be
DateApproved: 02/06/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating a language model tool and how to implement tool calling in a chat extension
---

# LanguageModelTool API

In this extension guide, you'll learn how to create a language model tool and how to implement tool calling in a chat extension.

## What is tool calling in an LLM?

Tool calling enables you to extend the functionality of a large language model (LLM) by connecting it to external tools and systems to perform tasks that go beyond text processing.

A language model tool is a function that can be invoked as part of language model request. For example, you might have a function that retrieves information from a database, finds files, or performs some calculation. You can implement a language model tool in your extension, or use publicly available tools from other extensions.

The LLM never actually executes the tool itself, instead the LLM generates the parameters that can be used to call your tool, which your code can then choose how to handle by calling the indicated function. Your extension is always in full control of the tool calling process.

Read more about [function calling](https://platform.openai.com/docs/guides/function-calling) in the OpenAI documentation.

## Why use tool calling?

There are multiple scenarios where you might want to use tool calling in a chat extension. Some examples include:

- **Let the LLM dynamically ask for more context**. For example, you can use a tool to retrieve information from a database, or find relevant files.
- **Let the LLM take some action dynamically**. The LLM itself can't perform calculations or make calls to other systems. For example, use a tool to run a terminal command and return the output to the LLM.
- **Hook up some context/behavior that is contributed by another VS Code extension**. For example, you might have a tool that uses the Git extension to retrieve information about the current repository.

## Tool-calling flow

The tool-calling flow in a chat extension is as follows:

1. Retrieve the list of relevant tools
1. Send the request to the LLM, providing the list of tool definitions to consider
1. The LLM generates a response, which may include one or more requests to invoke a tool
1. Invoke the tool by using the parameter values provided in the LLM response
1. Send another request to the LLM, including the tool results
1. The LLM generates the final user response, which may incorporate tool responses

    If the LLM response includes more requests for tool invocations, repeat steps 4-6 until there are no more tool requests.

### Implement tool calling with the chat extension library

You can use the [`@vscode/chat-extension-utils` library](https://www.npmjs.com/package/@vscode/chat-extension-utils) to simplify the process of calling tools in a chat extension.

Implement tool calling in the `vscode.ChatRequestHandler` function of your [chat participant](/api/extension-guides/chat).

1. Determine the relevant tools for the current chat context. You can access all available tools by using `vscode.lm.tools`.

    The following code snippet shows how to filter the tools to only those that have a specific tag.

    ```ts
    const tools = request.command === 'all' ?
        vscode.lm.tools :
        vscode.lm.tools.filter(tool => tool.tags.includes('chat-tools-sample'));
    ```

1. Send the request and tool definitions to the LLM by using `sendChatParticipantRequest`.

    ```ts
    const libResult = chatUtils.sendChatParticipantRequest(
        request,
        chatContext,
        {
            prompt: 'You are a cat! Answer as a cat.',
            responseStreamOptions: {
                stream,
                references: true,
                responseText: true
            },
            tools
        },
        token);
    ```

    The `ChatHandlerOptions` object has the following properties:

    - `prompt`: (optional) Instructions for the chat participant prompt.
    - `model`: (optional) The model to use for the request. If not specified, the model from the chat context is used.
    - `tools`: (optional) The list of tools to consider for the request.
    - `requestJustification`: (optional) A string that describes why the request is being made.
    - `responseStreamOptions`: (optional) Enable `sendChatParticipantRequest` to stream the response back to VS Code. Optionally, you can also enable references and/or response text.

1. Return the result from the LLM. This might contain error details or tool-calling metadata.

    ```ts
    return await libResult.result;
    ```

The full source code of this [tool-calling sample](https://github.com/microsoft/vscode-extension-samples/blob/main/chat-sample/src/chatUtilsSample.ts) is available in the VS Code Extension Samples repository.

### Implement tool calling yourself

For more advanced scenarios, you can also implement tool calling yourself. Optionally, you can use the `@vscode/prompt-tsx` library for crafting the LLM prompts. By implementing tool calling yourself, you have more control over the tool-calling process. For example, to perform additional validation or to handle tool responses in a specific way before sending them to the LLM.

View the full source code for implementing [tool calling by using prompt-tsx](https://github.com/microsoft/vscode-extension-samples/blob/main/chat-sample/src/toolParticipant.ts) in the VS Code Extension Samples repository.

## Create a language model tool

When calling tools, you can call publicly available language model tools contributed by other extensions, or you can create your own tools. When you create a tool, you can choose whether to register it with the VS Code API, or just use it within your extension as a *private* tool.

When you publish a tool with the VS Code API, that tool is available to all extensions.

### Deciding between registering a tool and using it as a private tool

Register a tool with the VS Code API if:

- The tool makes sense to other extensions, and could be used without special handling for the particular tool
- The extension needs to provide a progress message and confirmation

Use a private tool if:

- The tool can't be made public, for example because it's specific to your company or retrieves non-public data
- The tool requires some special handling and is specific to your extension

### Implement a language model tool

To implement a language model tool:

1. Define the tool in the `contributes` property in the `package.json`

    The following example shows how to define a tool that counts the number of active tabs in a tab group.

    ```json
    "contributes": {
        "languageModelTools": [
            {
                "name": "chat-tools-sample_tabCount",
                "tags": [
                    "editors",
                    "chat-tools-sample"
                ],
                "toolReferenceName": "tabCount",
                "displayName": "Tab Count",
                "modelDescription": "The number of active tabs in a tab group",
                "icon": "$(files)",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "tabGroup": {
                            "type": "number",
                            "description": "The index of the tab group to check. This is optional- if not specified, the active tab group will be checked.",
                            "default": 0
                        }
                    }
                }
            }
        ]
    }
    ```

    A language model tool has the following properties:

    - `name`: The unique name of the tool. This is used to reference the tool in the extension implementation code.
    - `tags`: An array of tags that describe the tool. This is used to filter the list of tools that are relevant for a specific request.
    - `toolReferenceName`: If enabled, the name for users to reference the tool in a chat prompt via `#`.
    - `displayName`: The user-friendly name of the tool, used for displaying in the UI.
    - `modelDescription`: Description of the tool, which can be used by the language model to select it.
    - `icon`: The icon to display for the tool in the UI.
    - `inputSchema`: The JSON schema that describes the input parameters for the tool. This is used by the language model to provide parameter values for the tool invocation.

1. (optional) Register tool with `vscode.lm.registerTool`

    If you want to publish the tool for use by other extensions, you must register the tool with the `vscode.lm.registerTool` API. Provide the name of the tool as you specified it in the `package.json` file.

    ```ts
    export function registerChatTools(context: vscode.ExtensionContext) {
        context.subscriptions.push(vscode.lm.registerTool('chat-tools-sample_tabCount', new TabCountTool()));
    }
    ```

1. Implement the language model tool by implementing the `vscode.LanguageModelTool<>` interface.

    - Implement `prepareInvocation` to provide a confirmation message for the tool invocation.

        The following example shows how to provide a confirmation message for the tab count tool.

        ```ts
        async prepareInvocation(
            options: vscode.LanguageModelToolInvocationPrepareOptions<ITabCountParameters>,
            _token: vscode.CancellationToken
        ) {
            const confirmationMessages = {
                title: 'Count the number of open tabs',
                message: new vscode.MarkdownString(
                    `Count the number of open tabs?` +
                    (options.input.tabGroup !== undefined
                        ? ` in tab group ${options.input.tabGroup}`
                        : '')
                ),
            };

            return {
                invocationMessage: 'Counting the number of tabs',
                confirmationMessages,
            };
        }
        ```

    - Define an interface that describes the tool input parameters. This interface is used in the `invoke` method.

        The following example shows the interface for the tab count tool.

        ```ts
        export interface ITabCountParameters {
            tabGroup?: number;
        }
        ```

    - Implement `invoke`, which is called when the tool is invoked. It receives the tool input parameters in the `options` parameter.

        The following example shows the implementation of the tab count tool. The result of the tool is an instance of type `vscode.LanguageModelToolResult`.

        ```ts
        async invoke(
            options: vscode.LanguageModelToolInvocationOptions<ITabCountParameters>,
            _token: vscode.CancellationToken
        ) {
            const params = options.input;
            if (typeof params.tabGroup === 'number') {
                const group = vscode.window.tabGroups.all[Math.max(params.tabGroup - 1, 0)];
                const nth =
                    params.tabGroup === 1
                        ? '1st'
                        : params.tabGroup === 2
                            ? '2nd'
                            : params.tabGroup === 3
                                ? '3rd'
                                : `${params.tabGroup}th`;
                return new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(`There are ${group.tabs.length} tabs open in the ${nth} tab group.`)]);
            } else {
                const group = vscode.window.tabGroups.activeTabGroup;
                return new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(`There are ${group.tabs.length} tabs open.`)]);
            }
        }
        ```

View the full source code for implementing a [language model tool](https://github.com/microsoft/vscode-extension-samples/blob/main/chat-sample/src/tools.ts) in the VS Code Extension Samples repository.

## Getting started

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)

## Related content

- [Get started with the Language Model API](/api/extension-guides/language-model)
- [Build a chat extension](/api/extension-guides/chat)
- [Use Prompt-tsx](/api/extension-guides/prompt-tsx)
- [@vscode/vscode-chat-extension-utils library](https://github.com/microsoft/vscode-chat-extension-utils)
