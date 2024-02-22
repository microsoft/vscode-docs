---
# DO NOT TOUCH — Managed by doc writer
ContentId: ac3f00c8-78a8-408c-8af6-3e997a482972
DateApproved: 02/1/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating an AI extension in Visual Studio Code
---

# Chat extensions

Visual Studio Code's Copilot Chat architecture allows extension authors to integrate with the Copilot Chat experience. The unit of extensibility for Copilot Chat is an agent.

Agents are domain experts that can answer the user query however they want - by fully using AI in the query processing or in a traditional way by forwarding it to a backend service. Agents can also provide the language model access to domain specific tools. With the help of the LLM, the agent might select a tool and define how to invoke it. VS Code ships with some built-in agents, for example `@workspace`. The `@workspace` agent knows about your workspace and can answer questions about it. Internally, the agent is powered by different tools: GitHub's knowledge graph combined with semantic search, local code indexes, and VS Code's language services.

When a user explicitly mentions an `@agent` in their prompt, that prompt is forwarded to the extension that contributed that specific agent. Agents can respond using Markdown for simple text and image responses, or they can respond with a file tree or with buttons for a more interactive experience. For example, a file tree can be used as a preview when an agent is proposing to create a new workspace for the user. Agents can provide follow-ups for each response, imagine them as proposals on how to take the conversation further. To provide a smooth user experience, the whole API is streaming based. As already mentioned, agents can bring in sub commands - shortcuts to specific functionality. For example, the `@docker` agent might contribute a `/generate` sub command, resulting in the following example user prompt "`@docker /generate` a DOCKERFILE for workspace". The current syntax being explicit and concise can be a convenient time saver.

> **Note:**: The Chat and Language Model API are in a [proposed state](https://code.visualstudio.com/api/advanced-topics/using-proposed-api) and we are actively working on adding more functionality. Share your feedback in [this GitHub issue](https://github.com/microsoft/vscode/issues/199908) or create new issues.

## Links

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-agent-sample)
- [Language Model API](/api/extension-guides/language-model)

### VS Code API Usage

- TODO: add links to the APIs

## Parts of the chat user experience

<!-- TODO: reduce image size -->

![Chat concepts explanation](images/chat/chat.png)

This screenshot shows the following chat concepts with a sample extension linked above:

1. Use the `@` syntax to invoke the `@cat` chat extension
1. Use the `/` syntax to call the `/teach` command for the extension
1. User-provided query, also known as the user prompt
1. Icon that indicates that Copilot is using the `@cat` chat extension
1. Markdown response, provided by the chat extension
1. Code fragment included in the markdown response
1. Button included in the chat extension response
1. Suggested [follow-up questions](#register-follow-up-requests) provided by the chat extension
1. Chat input field with the placeholder text provided by the chat extension's `description` property

## Develop a chat extension

A chat extension is structured like a regular extension. The minimum functionality that is needed for implementing a chat extension is:

- Register the chat extension, to let users invoke it by using the `@` symbol in the VS Code Chat view.
- Define a request handler that interprets the user's question, and returns a response in the Chat view.

You can further expand the functionality of the chat extension with the following optional features:

- Register chat commands to provide users with a shorthand notation for common questions
- Define suggested follow-up questions to help the user continue a conversation
- Define chat variables to capture and share domain-specific context in chat conversations

As a starting point for developing a chat extension, you can refer to our [chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-agent-sample). This sample implements a simple cat tutor that can explain computer science topics using cat metaphors.

<!-- TODO: update diagram to distinguish between optional and required -->
![Diagram showing how extension can contribute to chat](images/chat/diagram.png)

### Register the chat extension

The first step to create a chat extension is to register it by using `vscode.chat.createChatParticipant`. When you register the extension, you have to provide a name and a [request handler](#implement-a-request-handler). Users can then reference the chat extension in the Chat view by using the `@` symbol and the name you provided.

The following code snippet shows how to register the `@cat` chat extension:

```typescript
export function activate(context: vscode.ExtensionContext) {

    // Register the chat extension and its request handler
    const cat = vscode.chat.createChatParticipant('cat', handler);

    // Optionally, set some properties for the chat extension
    cat.iconPath = vscode.Uri.joinPath(context.extensionUri, 'cat.jpeg');
    cat.description = vscode.l10n.t('Meow! What can I help you with?');
    cat.fullName = vscode.l10n.t('Cat');

    // Add the chat request handler here
}
```

After registering the chat extension, you now need to implement the request handler to process a user's request.

### Implement a request handler

The request handler is responsible for processing the user's chat requests in the VS Code Chat view.

The following code snippet shows how to define a request handler:

```typescript
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {

    // Chat request handler implementation goes here

};
```

These are the typical steps for implementing a chat request handler:

1. Determine the user's intent
1. Perform logic to answer the user's question
1. Return a response to the user

To determine the user's intent, you can reference the `vscode.ChatRequest` parameter to access the prompt, [commands](#register-commands), and [chat variables](#variables) that the user entered in the Chat view. Optionally, you can take advantage of the language model to determine the user's intent, rather than using traditional logic. Learn how you can use the [Language Model API](/api/extension-guides/language-model) in your extension.

The following code snippet shows the basic structure of first using the command, and then the user prompt to determine the user intent:

```typescript
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {

    // Test for the `teach` command
    if (request.command == 'teach') {

        // Add logic here to handle the teaching scenario
        doTeaching(request.prompt, request.variables);

    } else {

        // Determine the user's intent
        const intent = determineUserIntent(request.prompt, request.variables);

        // Add logic here to handle other scenarios
    }
};
```

Next, you need to implement the actual logic for processing the user request. Often, chat extensions will use the [Language Model API](/api/extension-guides/language-model) to process the request. In this case, you might adjust the language model prompt to match the user's intent. Alternately, you can implement the extension logic by invoking a backend service, by using traditional programming logic, or by using a combination of all these options. For example, you could invoke a web search to gather additional information, which you then provide as context to the language model.

Once you've processed the request, you have to return a response to the user in the Chat view. Chat extensions can use streaming to respond to user queries. Responses can contain different content types: markdown, images, references, buttons, and file trees. For example to generate this response:

![Response from the cat extension that includes code, markdown and a button](images/chat/stream.png)

An extension can use the response stream in the following way:

```typescript
stream.markdown(`\`\`\`typescript
const myStack = new Stack();
myStack.push(1); // pushing a number on the stack (or let's say, adding a fish to the stack)
myStack.push(2); // adding another fish (number 2)
console.log(myStack.pop()); // eating the top fish, will output: 2
\`\`\`
So remember, Code Kitten, in a stack, the last fish in is the first fish out - which we tech cats call LIFO (Last In, First Out).`);

stream.button({
    command: 'cat.meow',
    title: vscode.l10n.t('Meow!'),
    arguments: []
});
```

In practice, extensions will typically send a request to the language model. Once they get a response from the language model, they might further process it, and decide if they should stream anything back to the user. The VS Code Chat API is streaming-based, and is compatible with the streaming Language Model APIs. This allows extensions to report progress and results continuously with the goal of having a smooth user experience. Learn how you can use the [Language Model API](/api/extension-guides/language-model).

### Register commands

Chat extensions can contribute commands, which are shortcuts to specific functionality provided by the extension. Users can reference commands in chat by using the `/` syntax, for example `/explain`.

One of the tasks when answering questions is to determine the user intent. For example, VS Code can infer that "Create a new workspace with Node.js Express Pug TypeScript" means that you want a new project, but "`@workspace /new` Node.js Express Pug TypeScript" is more explicit, concise, and saves typing time. If you press `/`, VS Code offers a list of registered commands with their description.

![List of commands in chat for @workspace](images/chat/commands.png)

Chat participants can contribute commands with their description by using the `commandProvider`:

```typescript
cat.commandProvider = {
    provideCommands(token) {
        return [
            { name: 'teach', description: 'Pick at random a computer science concept then explain it in purfect way of a cat' },
            { name: 'play', description: 'Do whatever you want, you are a cat after all' }
        ];
    }
};
```

### Register follow-up requests

After each chat request, VS Code invokes follow-up providers to get suggested follow-up questions to show to the user. The user can select the follow-up question to send it to the chat. Follow-up questions are options for the user on how to take the conversation further.

The following code snippet shows how to register follow-up requests in a chat extension:

```typescript
cat.followupProvider = {
    provideFollowups(result: ICatChatResult, token: vscode.CancellationToken) {
        if (result.metadata.command === 'teach') {
            return [{
                prompt: 'let us play',
                title: vscode.l10n.t('Play with the cat')
            } satisfies vscode.ChatFollowup];
        }
    }
};
```

> **Tip:** Follow-ups should be written as questions or directions, not just concise commands.

## Variables

Orthogonal to chat participants, extensions can contribute `#variables`. Variables start with the `#` syntax and are resolved by an extension that contributes that variable, or by VS Code, if the variable is built in (e.g `#file`, `#selection`...). Users explicitly include variables in their prompts. By pressing `#`, VS Code offers a list of registered variables with their description:

![List of variables in chat](images/chat/variables.png)

For example, a C++ extension might contribute a variable `#cpp_context` that would get resolved based on the state of the language service - what C++ version is being used and what C++ programming approach is preferred.

Variables are resolved independent of the active chat participant, and thus they can be used as a mechanism to share context between participants. For example, `@workspace` already maintains an index of the current workspace. `@workspace` contributes a variable `#codebase`, this allows users to apply the codebase context in their prompts.

Variable resolvers can offer multiple length levels for the variable value. VS Code uses the one based on how many tokens are left in an LLM prompt.

```typescript
vscode.chat.registerVariable('cat_context', 'Describes the state of mind and version of the cat', {
    resolve: (name, context, token) => {
        if (name == 'cat_context') {
            const mood = Math.random() > 0.5 ? 'happy' : 'grumpy';
            return [
                {
                    level: vscode.ChatVariableLevel.Short,
                    value: 'version 1.3 ' + mood
                },
                {
                    level: vscode.ChatVariableLevel.Medium,
                    value: 'I am a playful cat, version 1.3, and I am ' + mood
                },
                {
                    level: vscode.ChatVariableLevel.Full,
                    value: 'I am a playful cat, version 1.3, this version prefer to explain everything using mouse and tail metaphors. I am ' + mood
                }
            ]
        }
    }
});
```

## Guidelines

Chat participants should not be just question answering bots. When building one, be creative and use the existing VS Code API to create rich integrations in VS Code. Users love convenient interactions - contribute rich buttons in your responses, menu items that bring users to your participant in chat, and think about real life scenarios where AI can help your users.

It does not make sense for every extension to contribute a chat participant - users could end up with too many participants in their chat, which leads to a bad experience. For example, language extensions (for example, C++) can contribute in various other ways:

- Contribute variables that bring language service smarts to the user query. For example, the C++ extension could resolve the `#cpp_context` variable to the C++ state of the workspace. This gives the Copilot Language Model the right C++ context to improve the quality of Copilot answers for C++.
- Contribute smart actions that request access to the language model, and use it in combination with traditional language service knowledge to deliver a great user experience. For example, C++ might already offer "extract to method" smart action, and with LM access this method could generate a fitting default name of the new method.

Chat extensions should explicitly ask for user consent if they are about to do a costly operation or about to edit or delete something that can not be undone. To have a great user experience, we discourage one extension contributing multiple chat participants. Up to one chat participant per extension is a simple model that scales well in the UI.

## Testing your extension

The responses that the Language Model API provides are nondeterministic, which means that you might get a different response for an identical request. This behavior can be challenging for testing your extension.

The part of the extension for building prompts and interpreting language model responses is deterministic, and can thus be unit tested without language model access. However, interacting and getting responses from the language model itself, is nondeterministic and can not be easily tested. Consider designing your extension code in a modular way to enable you to unit test the specific parts that can be tested.

Extensions should not request Language Model access for integration tests due to rate-limitations. Internally, VS Code uses a dedicated non-production Language Model for simulation testing, and we are currently thinking how to provide a scalable Language Model testing solution for extensions that are facing a similar challenge.

## Publishing your extension

Once you have created your AI extension and once we finalize the Chat and Language Model API (expected early April 2024), you can publish your extension to the Visual Studio Marketplace:

- By publishing to the VS Marketplace your extension is adhering to the [GitHub Copilot extensibility acceptable development and use policy](TODO@isidorn add link).
- Update the attributes in the `package.json` to make it easy for users to find your extension. Set the Category to "Chat" in your `package.json`.
- Upload to the Marketplace as described in [Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## Related content

- [Use the Language Model API](/api/extension-guides/language-model) in your extension
