---
# DO NOT TOUCH — Managed by doc writer
ContentId: ac3f00c8-78a8-408c-8af6-3e997a482972
DateApproved: 02/1/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating an AI extension in Visual Studio Code
---

# Chat extensions

Visual Studio Code's Copilot Chat architecture allows extension authors to easily integrate with the Copilot Chat experience. And the unit of extensibility for Copilot Chat is an agent.

Agents are domain experts that can answer the user query however they want - by fully using AI in the query processing or in a traditional way by forwarding it to a backend service. Agents can also provide the language model access to domain specific tools. With the help of the LLM, the agent may select a tool and define how to invoke it. VS Code ships with some built-in agents, for example `@workspace`. The `@workspace` agent knows about your workspace and can answer questions about it. Internally, the agent is powered by different tools: GitHub's knowledge graph combined with semantic search, local code indexes, and VS Code's language services.

When a user explicitly mentions an `@agent` in their prompt, that prompt is forwarded to the extension that contributed that specific agent. Agents can respond using Markdown for simple text and image responses, or they can respond with a file tree or with buttons for a more interactive experience. For example, a file tree can be used as a preview when an agent is proposing to create a new workspace for the user. Agents can provide follow-ups for each response, imagine them as proposals on how to take the conversation further. To provide a smooth user experience, the whole API is streaming based. As already mentioned, agents can bring in sub commands - shortcuts to specific functionality. For example, the `@docker` agent might contribute a `/generate` sub command, resulting in the following example user prompt "`@docker /generate` a DOCKERFILE for workspace". The current syntax being explicit and concise can be a convenient time saver.

> **Note:**: The Chat and Language Model API is in a [proposed state](https://code.visualstudio.com/api/advanced-topics/using-proposed-api) and we are actively working on adding more functionality. Share your feedback in [this GitHub issue](https://github.com/microsoft/vscode/issues/199908) or create new issues.

## Links

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-agent-sample)

### VS Code API Usage

- TODO: add links to the APIs

## Parts of the chat user experience

<!-- TODO: reduce image size -->

![Chat concepts explanation](images/chat/chat.png)

This screenshot shows the following chat concepts with a sample extension:

1. `@cat` explicitly being called by the user via the `@` syntax
1. Command explicitly called via the `/` syntax
1. User query
1. Copilot using the contributed `@cat` participant
1. Markdown response that is fully controlled by the contributed `@cat` participant
1. Code part of the markdown response
1. Button response
1. [Follow-ups](#register-follow-up-requests)
1. Chat input for the user to continue. `description` of `@cat` is used as a placeholder

## Develop a chat extension

A chat extension is structured like a regular extension. At a minimum, you need to register the chat extension, to enable users to invoke it by using the `@` symbol in the VS Code Chat view. Next, you have to define a request handler that interprets the user's question, and returns a response in the Chat view.

When you implement the request handler, you might also [use the language model](#use-the-language-model) to help you provide an answer to the user's request. Alternately, you can invoke a backend service, use traditional programming logic, or use a combination of all these options. For example, you could invoke a web search to gather additional context, which you then provide to the language model.

Optionally, you can also register commands, propose follow-up questions, and define chat variables in the chat extension.

As a starting point for developing a chat extension, you can refer to our [chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-agent-sample). This sample implements a simple cat tutor that can explain computer science topics using cat metaphors.

<!-- TODO: update diagram to distinguish between optional and required -->
![Diagram showing how extension can contribute to chat](images/chat/diagram.png)

### Register the chat extension

The first step to create a chat extension is to register it by using `vscode.chat.createChatParticipant`. The user invokes the chat extension in the VS Code Chat view by using the `@` symbol and the name you provided when registering the extension.

To register a chat participant in your chat extension:

```typescript
export function activate(context: vscode.ExtensionContext) {

    // Register the chat extension and its request handler
    const cat = vscode.chat.createChatParticipant('cat', handler);

    // Optionally, set some properties for the chat extension
    agent.iconPath = vscode.Uri.joinPath(context.extensionUri, 'cat.jpeg');
    agent.description = vscode.l10n.t('Meow! What can I help you with?');
    agent.fullName = vscode.l10n.t('Cat');

    // TODO: implement the request handler
}
```

### Implement a request handler

In the previous step, you registered the chat extension and referenced a request handler. The request handler is responsible for processing the user's chat requests they enter in the VS Code Chat view. A typical flow for a request handler is the following:

1. Determine the user's intent
1. Perform logic to handle the request
1. Return a response to the user

TODO: add more detail about intent and how you can also use commands (add cross-reference)
TODO: add more detail about handling requests and using static logic, backend services, or LM

TODO: add more details implementing the handler and about `vscode.ChatRequestHandler` and `vscode.ChatRequest`

The following code snippet shows an example of a chat request handler that uses the language model to answer the user's question:

```typescript
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {
    const access = await vscode.lm.requestLanguageModelAccess(LANGUAGE_MODEL_ID);
    const messages = [
        new vscode.LanguageModelSystemMessage('You are a cat! Reply in the voice of a cat, using cat analogies when appropriate.'),
        new vscode.LanguageModelUserMessage(request.prompt)
    ];
    const chatRequest = access.makeChatRequest(messages, {}, token);
    for await (const fragment of chatRequest.stream) {
        stream.markdown(fragment);
    }

    return { metadata: { command: '' } };
};
```

TODO: intro about rich responses

Using a response stream extensions can respond to user queries with different content types: markdown, images, references, buttons and file trees. For example to generate this response:

![Response from the cat extension that includes code, markdown and a button](images/chat/stream.png)

An extension can use the response stream in the following way:

```typescript
stream.markdown('```typescript \n')
stream.markdown('const myStack = new Stack(); \n');
stream.markdown('myStack.push(1); // pushing a number on the stack (or let`s say, adding a fish to the stack) \n');
stream.markdown('myStack.push(2); // adding another fish (number 2) \n');
stream.markdown('console.log(myStack.pop()); // eating the top fish, will output: 2 \n')
stream.markdown('``` \n')
stream.markdown('So remember, Code Kitten, in a stack, the last fish in is the first fish out - which we tech cats call LIFO (Last In, First Out).');

stream.button({
    command: 'cat.meow',
    title: vscode.l10n.t('Meow!'),
    arguments: []
});
```

In practice, extensions will typically send a request to the language model. Once they get a response from the language model, they might further process it, and decide if they should stream anything back to the user. The VS Code Chat API is streaming-based, and is compatible with the streaming Language Model APIs. This allows extensions to report progress and results continuously with the goal of having a smooth user experience.

TODO: add intro about follow-up requests and cross-reference

### Register commands

Chat participants can contribute `/commands`, which are shortcuts to specific functionality provided by the extension. One of the tasks when answering questions is to determine the intent, understanding what you want to do. VS Code can infer that "Create a new workspace with Node.js Express Pug TypeScript" means that you want a new project, but "`@workspace /new` Node.js Express Pug TypeScript" is explicit, concise, and saves typing time. By pressing `/` VS Code will offer a list of registered commands with their description.

![List of commands in chat for @workspace](images/chat/commands.png)

Chat participants can contribute commands with their description using the `commandProvider`:

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

After each request, followup providers are invoked to get suggested followup questions to show the user. The user can click the followup to send it to the chat. Followups are options for the user on how to take the conversation further.

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

Orthogonal to chat participants, extensions can contribute `#variables`. Variables start with the `#` syntax and are resolved by an extension that contributes that variable or by VS Code if the variable of built-in (e.g `#file`, `#selection`...). Users explicitly include variables in their prompts, by pressing `#` VS Code will offer a list of registered variables with their description:

![List of variables in chat](images/chat/variables.png)

For example, a C++ extension might contribute a variable `#cpp_context` that would get resolved based on the state of the language service - what C++ version is being used and what C++ programming approach is preferred.

Chat participants should not talk directly to each other, instead extensions can define an API that another chat participant extension depends on. Also, variables are resolved independent of the active chat participant, and thus they can be used as a mechanism to share context between participants. For example, `@workspace` already maintains an index of the current workspace. `@workspace` could contribute a variable `#codebase`, that would allow other extensions to leverage the codebase context in their prompts.

Variable resolvers can offer multiple length levels for the variable value and VS Code will use the one depending on how many tokens are left in an LLM prompt.

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

## Use the language model

 Language Model is a complementary API that allows [access to the Language Model](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.languageModels.d.ts). Using this API, if an extension contributes a chat participant it can use the Language Model to process and answer the user query. VS Code passes the exact user prompt to contributed participant, and with this API, participants can conveniently transition those language prompts into specific backend API calls. Usage of this API is not tied to the chat experience, and extensions can get language model access to empower their traditional features. For example, the Rust extension might decide to improve it's rename experience and use the Language Model to offer default names.

Extensions can get access to the Copilot Language Model using the following method:
```typescript
const access = await vscode.chat.requestLanguageModelAccess('copilot-gpt-4');
```

Currently `copilot-gpt-3.5` and `copilot-gpt-4` are supported, and we expect the list of supported models to grow over time. We do not expect specific models to stay supported forever, and thus code that requests model access should be written "defensively" - it should gracefully handle cases if the access to a particular model is not granted. Choosing the right model is up to the extension, and we recommend using less powerful models first (e.g `copilot-gpt-3.5`) since they are much faster which allows a smooth user interaction. Using more powerful but slower models (e.g. `copilot-gpt-4`) is suggested for complex tasks only after the faster models prove insufficient.

After getting model access, extensions can craft their prompt and send a request to the language model. Extensions can use two types of messages:
* `LanguageModelSystemMessage`: provides instructions to the language model on the broad task that you're using the model for. It defines the context in which user messages are interpreted. In the example below, the system message is used to specify the persona used by the model in its replies and what rules the model should follow.
* `LanguageModelUserMessage`: a message that is coming from the user query.

```typescript
const craftedPrompt = [
    new vscode.LanguageModelSystemMessage('You are a cat! Think carefully and step by step like a cat would. Your job is to explain computer science concepts in the funny manner of a cat, using cat metaphors. Always start your response by stating what concept you are explaining. Always include code samples.'),
    new vscode.LanguageModelUserMessage('I want to understand recursion')
];
const chatRequest = access.makeChatRequest(craftedPrompt, {}, token);
```

 Language model response is streaming based, and as the response is coming back we suggest for extensions to report progress back to the user for a smooth experience.

Extensions should responsibly use the model and be aware of rate limiting. VS Code will be transparent to the user regarding how extensions are using language models and how many requests each extension is sending and how that influences their respective quotas.

### Prompt engineering

We suggest to read OpenAI's excellent [prompt engineering guidelines](https://platform.openai.com/docs/guides/prompt-engineering).

>**Tip:** use the rich VS Code extension API to get the most relevant context to include in a prompt (e.g. the active file).

## Guidelines

Chat participants should not be just question answering bots. When building one, be creative and use the existing VS Code API to create rich integrations in VS Code. Users love convenient interactions - contribute rich buttons in your responses, menu items that bring users to your participant in chat, and think about real life scenarios where AI can help your users.

It does not make sense for every extension to contribute a chat participant - users could end up with too many participants in their chat which leads to a bad experience. For example, language extensions (e.g. C++) can contribute in various other ways:
* Contribute variables that bring language service smarts to the user query. For example, #cpp_context variable could be resolved by the C++ extension to the C++ state of the workspace. This gives the Copilot Language Model the right C++ context to improve the quality of Copilot answers for C++.
* Contribute smart actions that request access to the language model, and use it in combination with traditional language service knowledge to deliver a great user experience. For example, C++ might already offer "extract to method" smart action, and with LM access this method could generate a fitting default name of the new method.

Chat extensions should explicitly ask for user consent if they are about to do a costly operation or about to edit or delete something that can not be undone. To have a great user experience we discourage one extension contributing multiple chat participants - up to one chat participant per extension is a simple model that will scale well in the UI.

## Testing your extension

The part of the extension that is building prompts and interpreting Language Model responses is deterministic, and can thus be unit tested without language model access. However, interacting and getting responses from the Language Model itself is nondeterministic and can not be easily tested. Extensions should not request Language Model access for integration tests due to rate-limitations. Internally, VS Code uses a dedicated non-production Language Model for simulation testing, and we are currently thinking how to provide a scalable Language Model testing solution for extensions that are facing a similar challange.

## Publishing your extension

Once you have created your AI extension and once we finalize the Chat and Language Model API (expected early April 2024) you can publish your extension to the VS Marketplace:
* By publishing to the VS Marketplace your extension is adhering to the [GitHub Copilot extensibility acceptable development and use policy](TODO@isidorn add link).
* Update the attributes in the `package.json` to make it easy for users to find your extension set the Category to "Chat" in your `package.json`.
* Upload to the Marketplace as described in [Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).


