---
# DO NOT TOUCH — Managed by doc writer
ContentId: aa6d312f-cbac-4633-8579-64d3cb4d17be
DateApproved: 03/05/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating a language model tool and how to implement tool calling in a chat extension
---

# LanguageModelTool API

Language model tools enable you to extend the functionality of a large language model (LLM). VS Code surfaces tools contributed by extensions in Copilot [agent mode](/docs/copilot/chat/chat-agent-mode.md). By contributing a tool in a VS Code extension, you can combine the power of agentic coding with deep VS Code integration via its extension APIs.

In this extension guide, you'll learn how to create a language model tool and how to implement tool calling in a chat extension.

## What is tool calling in an LLM?

A language model tool is a function that can be invoked as part of a language model request. For example, you might have a function that retrieves information from a database, performs some calculation, or calls some online API. When you contribute a tool in a VS Code extension, agent mode can then invoke the tool based on the context of the conversation.

The LLM never actually executes the tool itself, instead the LLM generates the parameters that are used to call your tool. It's important to clearly describe the tool's purpose, functionality, and input parameters so that the tool can be invoked in the right context.

Read more about [function calling](https://platform.openai.com/docs/guides/function-calling) in the OpenAI documentation.

## Why implement a language model tool in your extension?

By implementing a language model tool in your extension, you can:

- **Extend agent mode** with specialized tools that are automatically invoked as part of responding to a user prompt. For example, enable database scaffolding and querying as part of a chat conversation.
- **Deeply integrate with VS Code** by using the broad set of extension APIs. For example, use the [debug APIs](/api/extension-guides/debugger-extension.md) to augment a user's debugging experience.

## Create a language model tool

You can create a tool that performs a specific task, such as retrieving information from a database, finding files, or performing calculations.

Implementing a language model tool consists of two main parts:

1. Define the tool's configuration in the `package.json` file of your extension.
1. Implement the tool in your extension code.

### Static configuration in `package.json`

The static configuration of the tool is defined in the `package.json` file of your extension. This includes the tool name, description, input schema, and other metadata.

1. Add an entry for your tool in the `contributes.languageModelTools` section of your extension's `package.json` file.

1. Give the tool a unique name:

    | Property | Description |
    | -------- | ----------- |
    | `name` | The unique name of the tool, used to reference the tool in the extension implementation code. Format the name in the format `{verb}_{noun}`. See [naming guidelines](#guidelines). |
    | `displayName` | The user-friendly name of the tool, used for displaying in the UI. |

1. If the tool can be used in [agent mode](/docs/copilot/chat/chat-agent-mode.md) or referenced in a chat prompt, add the following properties:

    Users can enable or disable the tool in the Chat view, similar to how this is done for [Model Context Protocol (MCP) tools](/docs/copilot/chat/mcp-servers.md).

    | Property | Description |
    | -------- | ----------- |
    | `canBeReferencedInPrompt` | Set to `true` if the tool can be used in [agent mode](/docs/copilot/chat/chat-agent-mode.md) or referenced in chat. |
    | `toolReferenceName` | The name for users to reference the tool in a chat prompt via `#`. |
    | `icon` | The icon to display for the tool in the UI. |
    | `userDescription` | User-friendly description of the tool, used for displaying in the UI. |

1. Add a detailed description in `modelDescription`:

    - What exactly does the tool do?
    - What kind of information does it return?
    - When should and shouldn't it be used?
    - Describe important limitations or constraints of the tool.

1. If the tool takes input parameters, add an `inputSchema` property that describes the tool's input parameters.

    This JSON schema describes an object with the properties that the tool takes as input, and whether they are required. File paths should be absolute paths.

    Describe what each parameter does and how it relates to the tool's functionality.

1. Control when the tool is available by using a `when` clause.

    The `languageModelTools` contribution point lets you restrict when a tool is available for agent mode or can be referenced in a prompt by using a [when clause](/api/references/when-clause-contexts). For example, a tool that gets the debug call stack information, should only be available when the user is debugging.

    ```json
    "contributes": {
        "languageModelTools": [
            {
                "name": "chat-tools-sample_tabCount",
                ...
                "when": "debugState == 'running'"
            }
        ]
    }
    ```

**Example tool definition**:

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
            "modelDescription": "The number of active tabs in a tab group in VS Code.",
            "userDescription": "Count the number of active tabs in a tab group.",
            "canBeReferencedInPrompt": true,
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

### Tool implementation

1. On activation of the extension, register the tool with `vscode.lm.registerTool`.

    Provide the name of the tool as you specified it in the `name` property in `package.json`.

    If you want the tool to be private to your extension, skip the tool registration step.

    ```ts
    export function registerChatTools(context: vscode.ExtensionContext) {
        context.subscriptions.push(vscode.lm.registerTool('chat-tools-sample_tabCount', new TabCountTool()));
    }
    ```

1. Create a class that implements the `vscode.LanguageModelTool<>` interface.

1. Add tool confirmation messages in the `prepareInvocation` method.

    If the tool has potentially dangerous or destructive side effects, the tool should ask for the user's confirmation before proceeding. Give enough context to the user to understand what the tool is doing. The message can be a `MarkdownString` containing a code block.

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

    If `prepareInvocation` returned `undefined`, the tool does not require user confirmation.

1. Define an interface that describes the tool input parameters.

    The interface is used in the `invoke` method. The input parameters are validated against the JSON schema defined in `inutSchema` in `package.json`.

    The following example shows the interface for the tab count tool.

    ```ts
    export interface ITabCountParameters {
        tabGroup?: number;
    }
    ```

1. Implement the `invoke` method, which is called when the tool is invoked.

    The `invoke` method receives the tool input parameters in the `options` parameter. The parameters are validated against the JSON schema defined in `inputSchema` in `package.json`.

    When an error occurs, throw an error with a message that makes sense to the LLM. Optionally, provide instructions on what the LLM should do next, such as retrying with different parameters, or performing a different action.

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

## Tool-calling flow

When a user sends a chat prompt, the following steps occur:

1. Copilot determines the list of available tools based on the user's configuration.

    The list of tools consists of built-in tools, tools registered by extensions, and tools from [MCP servers](/docs/copilot/chat/mcp-servers.md). You can contribute to agent mode via extensions or MCP servers (shown in green in the diagram).

1. Copilot sends the request to the LLM, providing it with the prompt, chat context, and the list of tool definitions to consider.

    The LLM generates a response, which might include one or more requests to invoke a tool.

1. If needed, Copilot invokes the suggested tool(s) with the parameter values provided by the LLM.

    A tool response might result in additional requests for tool invocations.

1. In case of errors or follow-up tool requests, Copilot iterates over the tool-calling flow until all tool requests are resolved.

1. Copilot returns the final response to the user, which might include responses from multiple tools.

The following diagram shows the Copilot tool-calling flow.

![Diagram that shows the Copilot tool-calling flow](images/tools/copilot-tool-calling-flow.png)

## Implement tool calling with the chat extension library

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

## Implement tool calling yourself

For more advanced scenarios, you can also implement tool calling yourself. Optionally, you can use the `@vscode/prompt-tsx` library for crafting the LLM prompts. By implementing tool calling yourself, you have more control over the tool-calling process. For example, to perform additional validation or to handle tool responses in a specific way before sending them to the LLM.

View the full source code for implementing [tool calling by using prompt-tsx](https://github.com/microsoft/vscode-extension-samples/blob/main/chat-sample/src/toolParticipant.ts) in the VS Code Extension Samples repository.

## Getting started

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)

## Guidelines

- **Naming**: write clear and descriptive names for tools and parameters.

    - **Tool name**: should be unique, and clearly describe their intent. Structure the tool name in the format `{verb}_{noun}`. For example, `get_weather`, `get_azure_deployment`, or `get_terminal_output`.

    - **Parameter name**: should describe the parameter's purpose. Structure the parameter name in the format `{noun}`. For example, `destination_location`, `ticker`, or `file_name`.

- **Descriptions**: write detailed descriptions for tools and parameters.

    - Describe what the tool does and when it should and shouldn't be used. For example, "This tool retrieves the weather for a given location."
    - Describe what each parameter does and how it relates to the tool's functionality. For example, "The `destination_location` parameter specifies the location for which to retrieve the weather. It should be a valid location name or coordinates."
    - Describe important limitations or constraints of the tool. For example, "This tool only retrieves weather data for locations in the United States. It might not work for other regions."

- **User confirmation**: provide a confirmation message for the tool invocation. If the tool has potentially dangerous or destructive side effects, ask for the user's confirmation before proceeding. Give enough context to the user to understand what the tool is doing.

- **Error handling**: when an error occurs, throw an error with a message that makes sense to the LLM. Optionally, provide instructions on what the LLM should do next, such as retrying with different parameters, or performing a different action.

Get more best practices for creating tools in the [OpenAI documentation](https://platform.openai.com/docs/guides/function-calling?api-mode=chat#best-practices-for-defining-functions) and [Anthropic documentation](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview).

## Related content

- [Get started with the Language Model API](/api/extension-guides/language-model)
- [Use Prompt-tsx](/api/extension-guides/prompt-tsx)
- [Add MCP servers to chat](/docs/copilot/chat/mcp-servers.md)
