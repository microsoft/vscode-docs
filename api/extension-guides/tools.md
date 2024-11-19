---
# DO NOT TOUCH — Managed by doc writer
ContentId: aa6d312f-cbac-4633-8579-64d3cb4d17be
DateApproved: 10/29/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating a language model tool and how to implement tool calling in a chat extension
---

# LanguageModelTool API

In this extension guide, you'll learn how to create a language model tool and how to implement tool calling in a chat extension.

## What is tool calling in an LLM?

Tool calling enables you to extend the functionality of a large language model (LLM) by connecting it to external tools and systems to perform tasks that go beyond text processing.

A language model tool is a function that can be invoked as part of language model request. For example, you might have a function that retrieves information from a database, finds files,or performs some calculation. You can implement a language model tool in your extension, or use publicly available tools from other extensions.

The LLM never actually executes the tool itself, instead the LLM generates the parameters that can be used to call your tool, which your code can then choose how to handle by calling the indicated function. Your extension is always in full control of the tool calling process.

Read more about [function calling](https://platform.openai.com/docs/guides/function-calling) in the OpenAI documentation.

## Why use tool calling?

There are multiple scenarios where you might want to use tool calling in a chat extension. Some examples include:

- **Let the LLM dynamically ask for more context**. For example, you can use a tool to retrieve information from a database, or find relevant files.
- **Let the LLM take some action dynamically**. The LLM itself can't perform calculations or make calls to other systems. For example, use a tool to run a terminal command and return the output to the LLM.
- **Hook up some context/behavior that is contributed by another VS Code extension**. For example, you might have a tool that uses the Git extension to retrieve information about the current repository.

## Tool-calling flow

1. Retrieve the list of relevant tools
1. Send the request to the LLM, providing the list of tool definitions to consider
1. The LLM generates a response, which may include one or more requests to invoke a tool
1. Invoke the tool by using the parameter values provided in the LLM response
1. Provide the tool responses to the LLM
1. The LLM generates the final user response, which may incorporate tool responses

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

### Implement tool calling with prompt-tsx

For more advanced scenarios, you can also implement tool calling by using the `@vscode/prompt-tsx` library directly. This allows you to have more control over the tool-calling process.

View the full source code for implementing [tool calling by using prompt-tsx](https://github.com/microsoft/vscode-extension-samples/blob/main/chat-sample/src/toolParticipant.ts) in the VS Code Extension Samples repository.

## Create a language model tool

Two options:

- Register a tool with the VS Code API
- Use a "private" tool

Deciding between the two options:

- When to register a tool with the VS Code API, and when to do "private" tool calling?
    - Makes the most sense to register the tool with vscode when the tool makes sense to other extensions, and could be used without special handling for the particular tool. Point out that tools in the API are all public, so other extensions can use them.
    - If extensions want to make use of the progress message and confirmation, then it needs to be registered in the API.
    - If the tool has some special handling, or the extension doesn't want it to be public, then it can be a private tool.
    - I don't know whether "private" tool is the best phrasing, could also be "ad-hoc tool" or just "a tool that isn't registered in the API..."


## Register a tool

1. Define in package.json
1. (optional) Register tool with `vscode.lm.registerTool`
1. Implement tool
    - prepareInvocation()
    - invoke()
    - define input parameters

- Description of the chat samples

## Getting started

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)

## Related content

- Language Model API guide
- Chat API
- Prompt-tsx guide


https://github.com/microsoft/vscode-chat-extension-utils
