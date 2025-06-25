---
# DO NOT TOUCH — Managed by doc writer
ContentId: ac3f00c8-78a8-408c-8af6-3e997a482972
DateApproved: 06/12/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to creating an AI extension in Visual Studio Code
---

# Chat extensions

Visual Studio Code's Copilot Chat architecture enables extension authors to integrate with the chat experience in VS Code. A chat extension is a VS Code extension that uses the Chat extension API by contributing a *chat participant*. Chat participants are domain experts that can answer user queries within a specific domain.

Users can reference chat participants in [ask mode](/docs/copilot/chat/chat-ask-mode) by using the `@` symbol in the Chat view.

Alternatively, you can also contribute a [language model tool](/api/extension-guides/ai/tools) to the chat experience. A language model tool performs a specific task, and can be invoked automatically in [agent mode](/docs/copilot/chat/chat-agent-mode), or manually referenced in [ask mode](/docs/copilot/chat/chat-ask-mode) or [edit mode](/docs/copilot/chat/copilot-edits) by using `#`.

## Overview

The goal of a chat participant is to enable users to prompt the extension by using natural language and to provide domain-specific answers in response.

When a user explicitly mentions a `@participant` in their chat prompt, that prompt is forwarded to the extension that contributed that specific chat participant. The participant then uses a `ResponseStream` to respond to the request. To provide a smooth user experience, the Chat API is streaming-based. A chat response can contain rich content, such as Markdown, file trees, command buttons, and more. Get more info about the [supported response output types](#supported-chat-response-output-types).

Chat participants can use different approaches to process a user query:

- Use AI to interpret the request and generate a response, for example by using the [Language Model API](/api/extension-guides/ai/language-model).
- Forward the user request to a backend service, which processes the request and returns a response.
- Use procedural logic and local resources to generate a response.

To help the user take the conversation further, participants can provide *follow-ups* for each response. Follow-up questions are suggestions that are presented in the chat user interface and might give the user inspiration about the chat extension's capabilities.

Participants can also contribute *commands*, which are a shorthand notation for common user intents, and are indicated by the `/` symbol. The extension can then use the command to prompt the language model accordingly. For example, `/explain` is a command for the `@workspace` participant that corresponds with the intent that the language model should explain some code.

### Using the language model

Chat participants can use the language model in a wide range of ways. Some participants only make use of the language model to get answers to custom prompts, for example the [sample chat participant](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample). Other participants are more advanced and act like autonomous agents that invoke multiple tools with the help of the language model. An example of such an advanced participant is the built-in `@workspace` that knows about your workspace and can answer questions about it. Internally, `@workspace` is powered by multiple tools: GitHub's knowledge graph, combined with semantic search, local code indexes, and VS Code's language services.

## Extending GitHub Copilot via GitHub Apps

Alternatively, it is possible to extend GitHub Copilot by creating a GitHub App that contributes a chat participant in the Chat view. A GitHub App is backed by a service and works across all GitHub Copilot surfaces, such as github.com, Visual Studio, or VS Code. On the other hand, GitHub Apps do not have full access to the VS Code API. To learn more about extending GitHub Copilot through a GitHub App see the [GitHub documentation](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions).

## Links

- [Chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)
- [ChatParticipant API](/api/references/vscode-api#chat)

## Parts of the chat user experience

The following screenshot shows the different chat concepts in the Visual Studio Code chat experience for the sample extension.

![Chat concepts explanation](../images/ai/chat/chat.png)

1. Use the `@` syntax to invoke the `@cat` chat participant
1. Use the `/` syntax to call the `/teach` command
1. User-provided query, also known as the user prompt
1. Icon and participant `fullName` that indicate that Copilot is using the `@cat` chat participant
1. Markdown response, provided by `@cat`
1. Code fragment included in the markdown response
1. Button included in the `@cat` response, the button invokes a VS Code command
1. Suggested [follow-up questions](#register-follow-up-requests) provided by the chat participant
1. Chat input field with the placeholder text provided by the chat participant's `description` property

## Develop a chat extension

A chat extension is an extension that contributes a chat participant to the [Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) view.

The minimum functionality that is needed for implementing a chat extension is:

- Register the chat participant, to let users invoke it by using the `@` symbol in the VS Code Chat view.
- Define a request handler that interprets the user's question, and returns a response in the Chat view.

You can further expand the functionality of the chat extension with the following optional features:

- Register chat commands to provide users with a shorthand notation for common questions
- Define suggested follow-up questions to help the user continue a conversation

As a starting point for developing a chat extension, you can refer to our [chat extension sample](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample). This sample implements a simple cat tutor that can explain computer science topics using cat metaphors.

![Diagram showing how extension can contribute to chat](../images/ai/chat/diagram.png)

### Register the chat extension

The first step to create a chat extension is to register it in your `package.json` by providing a unique `id`, the `name`, and `description`.

```json
"contributes": {
        "chatParticipants": [
            {
                "id": "chat-sample.cat",
                "name": "cat",
                "fullName": "Cat",
                "description": "Meow! What can I teach you?",
                "isSticky": true
            }
        ]
}
```

Users can then reference the chat participant in the Chat view by using the `@` symbol and the `name` you provided. The `fullName` is shown in the title area of a response from your participant. The `description` is used as placeholder text in the chat input field.

The `isSticky` property controls whether the chat participant is persistent, which means that the participant name is automatically prepended in the chat input field after the user has started interacting with the participant.

We suggest using a lowercase `name` and using title case for the `fullName` to align with existing chat participants. Get more info about the [naming conventions for chat participants](#chat-participant-naming-conventions).

> [!NOTE]
> Some participant names are reserved, and in case you use a reserved name VS Code will display the fully qualified name of your participant (including the extension ID).

Up-front registration of participants and [commands](#register-commands) in `package.json` is required, so that VS Code can activate your extension at the right time, and not before it is needed.

After registration, all your extension has to do is create the participant by using `vscode.chat.createChatParticipant`. When creating the participant, you have to provide the ID, which you defined in `package.json`, and a [request handler](#implement-a-request-handler).

The following code snippet shows how to create the `@cat` chat participant (after you register it in your `package.json`):

```typescript
export function activate(context: vscode.ExtensionContext) {

    // Register the chat participant and its request handler
    const cat = vscode.chat.createChatParticipant('chat-sample.cat', handler);

    // Optionally, set some properties for @cat
    cat.iconPath = vscode.Uri.joinPath(context.extensionUri, 'cat.jpeg');

    // Add the chat request handler here
}
```

After registering and creating the chat participant, you now need to implement the request handler to process a user's request.

### Implement a request handler

The request handler is responsible for processing the user's chat requests in the VS Code Chat view. Each time a user enters a prompt in the chat input field, the chat request handler is invoked. These are the typical steps for implementing a chat request handler:

1. Define the request handler
1. Determine the intent of the user's request
1. Perform logic to answer the user's question
1. Return a response to the user

#### Define the request handler

You define the request handler (`vscode.ChatRequestHandler`) inside the extension's `activate` function.

The following code snippet shows how to define a request handler:

```typescript
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {

    // Chat request handler implementation goes here

};
```

#### Determine the request intent

To determine the intent of the user's request, you can reference the `vscode.ChatRequest` parameter to access the user's prompt, [commands](#register-commands), and chat location. Optionally, you can take advantage of the language model to determine the user's intent, rather than using traditional logic. As part of the `request` object you get a language model instance that the user picked in the chat model dropdown. Learn how you can use the [Language Model API](/api/extension-guides/ai/language-model) in your extension.

The following code snippet shows the basic structure of first using the command, and then the user prompt to determine the user intent:

```typescript
const handler: vscode.ChatRequestHandler = async (request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ICatChatResult> => {

    // Test for the `teach` command
    if (request.command == 'teach') {

        // Add logic here to handle the teaching scenario
        doTeaching(request.prompt, request.variables);

    } else {

        // Determine the user's intent
        const intent = determineUserIntent(request.prompt, request.variables, request.model);

        // Add logic here to handle other scenarios
    }
};
```

#### Process the request

Next, you need to implement the actual logic for processing the user request. Often, chat extensions use the `request.model` language model instance to process the request. In this case, you might adjust the language model prompt to match the user's intent. Alternately, you can implement the extension logic by invoking a backend service, by using traditional programming logic, or by using a combination of all these options. For example, you could invoke a web search to gather additional information, which you then provide as context to the language model.

While processing the current request, you might want to refer to previous chat messages. For example, if a previous response returned a C# code snippet, the user's current request might be "give the code in Python". Learn how you can [use the chat message history](#use-the-chat-message-history).

If you want to process a request differently based on the location of the chat input, you can use the `location` property of the `vscode.ChatRequest`. For example, if the user sends a request from the terminal inline chat, you might look up a shell command. Whereas, if the user uses the Chat view, you could return a more elaborate response.

#### Return the chat response

Once you've processed the request, you have to return a response to the user in the Chat view. Chat extensions can use streaming to respond to user queries. Responses can contain different content types: markdown, images, references, progress, buttons, and file trees. For example to generate this response:

![Response from the cat extension that includes code, markdown and a button](../images/ai/chat/stream.png)

An extension can use the response stream in the following way:

```typescript
stream.progress('Picking the right topic to teach...');
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

Get more info about the [supported chat response output types](#supported-chat-response-output-types).

In practice, extensions typically send a request to the language model. Once they get a response from the language model, they might further process it, and decide if they should stream anything back to the user. The VS Code Chat API is streaming-based, and is compatible with the streaming [Language Model API](/api/extension-guides/ai/language-model). This allows extensions to report progress and results continuously with the goal of having a smooth user experience. Learn how you can use the [Language Model API](/api/extension-guides/ai/language-model).

#### Use the chat message history

Participants have access to the message history of the current chat session. A participant can only access messages where it was mentioned. A `history` item is either a `ChatRequestTurn` or a `ChatResponseTurn`. For example, use the following code snippet to retrieve all the previous requests that the user sent to your participant in the current chat session:

```typescript
const previousMessages = context.history.filter(h => h instanceof vscode.ChatRequestTurn);
```

History will not be automatically included in the prompt, it is up to the participant to decide if it wants to add history as additional context when passing messages to the language model.

### Register commands

A chat participant can contribute commands, which are shortcuts to specific functionality provided by the extension. Users can reference commands in chat by using the `/` syntax, for example `/explain`.

One of the tasks when answering questions is to determine the user intent. For example, VS Code could infer that `Create a new workspace with Node.js Express Pug TypeScript` means that you want a new project, but `@workspace /new Node.js Express Pug TypeScript` is more explicit, concise, and saves typing time. If you type `/` in the chat input field, VS Code offers a list of registered commands with their description.

![List of commands in chat for @workspace](../images/ai/chat/commands.png)

Chat participants can contribute commands with their description by adding them in `package.json`:

```typescript
"contributes": {
    "chatParticipants": [
        {
            "id": "chat-sample.cat",
            "name": "cat",
            "fullName": "Cat",
            "description": "Meow! What can I teach you?",
            "isSticky": true,
            "commands": [
                {
                    "name": "teach",
                    "description": "Pick at random a computer science concept then explain it in purfect way of a cat"
                },
                {
                    "name": "play",
                    "description": "Do whatever you want, you are a cat after all"
                }
            ]
        }
    ]
}
```

Get more info about the [naming conventions for slash commands](#slash-command-naming-conventions).

### Register follow-up requests

After each chat request, VS Code invokes follow-up providers to get suggested follow-up questions to show to the user. The user can then select the follow-up question, and immediately send it to the chat extension. Follow-up questions can provide inspiration to the user to take the conversation further, or to discover more capabilities of the chat extension.

The following code snippet shows how to register follow-up requests in a chat extension:

```typescript
cat.followupProvider = {
    provideFollowups(result: ICatChatResult, context: vscode.ChatContext, token: vscode.CancellationToken) {
        if (result.metadata.command === 'teach') {
            return [{
                prompt: 'let us play',
                title: vscode.l10n.t('Play with the cat')
            } satisfies vscode.ChatFollowup];
        }
    }
};
```

> [!TIP]
> Follow-ups should be written as questions or directions, not just concise commands.

### Implement participant detection

To make it easier to use chat participants with natural language, you can implement participant detection. Participant detection is a way to automatically route the user's question to a suitable participant, without having to explicitly mention the participant in the prompt. For example, if the user asks "How do I add a login page to my project?", the question would be automatically routed to the `@workspace` participant because it can answer questions about the user's project.

VS Code uses the chat participant description and examples to determine which participant to route a chat prompt to. You can specify this information in the `disambiguation` property in the extension `package.json` file. The `disambiguation` property contains a list of detection categories, each with a description and examples.

| Property | Description | Examples |
|----------|-------------|----------|
| `category` | The detection category. If the participant serves different purposes, you can have a category for each.  | <ul><li>`cat`</li><li>`workspace_questions`</li><li>`web_questions`</li></ul> |
| `description` | A detailed description of the kinds of questions that are suitable for this participant. | <ul><li>`The user wants to learn a specific computer science topic in an informal way.`</li><li>`The user just wants to relax and see the cat play.`</li></ul> |
| `examples` | A list of representative example questions. | <ul><li>`Teach me C++ pointers using metaphors`</li><li>`Explain to me what is a linked list in a simple way`</li><li>`Can you show me a cat playing with a laser pointer?`</li></ul> |

You can define participant detection for the overall chat participant, for specific commands, or a combination of both.

The following code snippet shows how to implement participant detection at the participant level.

```json
"contributes": {
    "chatParticipants": [
        {
            "id": "chat-sample.cat",
            "fullName": "Cat",
            "name": "cat",
            "description": "Meow! What can I teach you?",

            "disambiguation": [
                {
                    "category": "cat",
                    "description": "The user wants to learn a specific computer science topic in an informal way.",
                    "examples": [
                        "Teach me C++ pointers using metaphors",
                        "Explain to me what is a linked list in a simple way",
                        "Can you explain to me what is a function in programming?"
                    ]
                }
            ]
        }
    ]
}
```

Similarly, you can also configure participant detection at the command level by adding a `disambiguation` property for one or more items in the `commands` property.

Apply the following guidelines to improve the accuracy of participant detection for your extension:

- **Be specific**: The description and examples should be as specific as possible to avoid conflicts with other participants. Avoid using generic terminology in the participant and command information.
- **Use examples**: The examples should be representative of the kinds of questions that are suitable for the participant. Use synonyms and variations to cover a wide range of user queries.
- **Use natural language**: The description and examples should be written in natural language, as if you were explaining the participant to a user.
- **Test the detection**: Test the participant detection with a variation of example questions and verify there's no conflict with built-in chat participants.

> [!NOTE]
> Built-in chat participants take precedence for participant detection. For example, a chat participant that operates on workspace files might conflict with the built-in `@workspace` participant.

## Supported chat response output types

To return a response to a chat request, you use the [`ChatResponseStream`](/api/references/vscode-api#ChatResponseStream) parameter on the [`ChatRequestHandler`](/api/references/vscode-api#ChatRequestHandler).

The following list provides the output types for a chat response in the Chat view. A chat response can combine multiple different output types.

- **Markdown**

    Render a fragment of Markdown text simple text or images. You can use any Markdown syntax that is part of the [CommonMark](https://commonmark.org/) specification. Use the [`ChatResponseStream.markdown`](/api/references/vscode-api#ChatResponseStream.markdown) method and provide the Markdown text.

    Example code snippet:

    ```typescript
    // Render Markdown text
    stream.markdown('# This is a title \n');
    stream.markdown('This is stylized text that uses _italics_ and **bold**. ');
    stream.markdown('This is a [link](https://code.visualstudio.com).\n\n');
    stream.markdown('![VS Code](https://code.visualstudio.com/assets/favicon.ico)');
    ```

- **Code block**

    Render a code block that supports IntelliSense, code formatting, and interactive controls to apply the code to the active editor. To show a code block, use the [`ChatResponseStream.markdown`](/api/references/vscode-api#ChatResponseStream.markdown) method and apply the Markdown syntax for code blocks (using backticks).

    Example code snippet:

    ```typescript
    // Render a code block that enables users to interact with
    stream.markdown('```bash\n');
    stream.markdown('```ls -l\n');
    stream.markdown('```');
    ```

- **Command link**

    Render a link inline in the chat response that users can select to invoke a VS Code command. To show a command link, use the [`ChatResponseStream.markdown`](/api/references/vscode-api#ChatResponseStream.markdown) method and use the Markdown syntax for links `[link text](command:commandId)`, where you provide the command ID in the URL. For example, the following link opens the Command Palette: `[Command Palette](command:workbench.action.showCommands)`.

    To protect against command injection when you load the Markdown text from a service, you have to use a [`vscode.MarkdownString`](/api/references/vscode-api#MarkdownString) object with the `isTrusted` property set to the list of trusted VS Code command IDs. This property is required to enable the command link to work. If the `isTrusted` property is not set or a command is not listed, the command link will not work.

    Example code snippet:

    ```typescript
    // Use command URIs to link to commands from Markdown
    let markdownCommandString: vscode.MarkdownString = new vscode.MarkdownString(`[Use cat names](command:${CAT_NAMES_COMMAND_ID})`);
    markdownCommandString.isTrusted = { enabledCommands: [ CAT_NAMES_COMMAND_ID ] };

    stream.markdown(markdownCommandString);
    ```

    If the command takes arguments, you need to first JSON encode the arguments and then encode the JSON string as a URI component. You then append the encoded arguments as a query string to the command link.

    ```typescript
    // Encode the command arguments
    const encodedArgs = encodeURIComponent(JSON.stringify(args));

    // Use command URIs with arguments to link to commands from Markdown
    let markdownCommandString: vscode.MarkdownString = new vscode.MarkdownString(`[Use cat names](command:${CAT_NAMES_COMMAND_ID}?${encodedArgs})`);
    markdownCommandString.isTrusted = { enabledCommands: [ CAT_NAMES_COMMAND_ID ] };

    stream.markdown(markdownCommandString);
    ```

- **Command button**

    Render a button that invokes a VS Code command. The command can be a built-in command or one that you define in your extension. Use the [`ChatResponseStream.button`](/api/references/vscode-api#ChatResponseStream.button) method and provide the button text and command ID.

    Example code snippet:

    ```typescript
    // Render a button to trigger a VS Code command
    stream.button({
        command: 'my.command',
        title: vscode.l10n.t('Run my command')
    });
    ```

- **File tree**

    Render a file tree control that lets users preview individual files. For example, to show a workspace preview when proposing to create a new workspace. Use the [`ChatResponseStream.filetree`](/api/references/vscode-api#ChatResponseStream.filetree) method and provide an array of file tree elements and the base location (folder) of the files.

    Example code snippet:

    ```typescript
    // Create a file tree instance
    var tree: vscode.ChatResponseFileTree[] = [
        { name: 'myworkspace', children: [
            { name: 'README' },
            { name: 'app.js' },
            { name: 'package.json' }
        ]}
    ];

    // Render the file tree control at a base location
    stream.filetree(tree, baseLocation);
    ```

- **Progress message**

    Render a progress message during a long-running operation to provide the user with intermediate feedback. For example, to report the completion of each step in a multi-step operation. Use the [`ChatResponseStream.progress`](/api/references/vscode-api#ChatResponseStream.progress) method and provide the message.

    Example code snippet:

    ```typescript
    // Render a progress message
    stream.progress('Connecting to the database.');
    ```

- **Reference**

    Add a reference for an external URL or editor location in the list references to indicate which information you use as context. Use the [`ChatResponseStream.reference`](/api/references/vscode-api#ChatResponseStream.reference) method and provide the reference location.

    Example code snippet:

    ```typescript
    const fileUri: vscode.Uri = vscode.Uri.file('/path/to/workspace/app.js');  // On Windows, the path should be in the format of 'c:\\path\\to\\workspace\\app.js'
    const fileRange: vscode.Range = new vscode.Range(0, 0, 3, 0);
    const externalUri: vscode.Uri = vscode.Uri.parse('https://code.visualstudio.com');

    // Add a reference to an entire file
    stream.reference(fileUri);

    // Add a reference to a specific selection within a file
    stream.reference(new vscode.Location(fileUri, fileRange));

    // Add a reference to an external URL
    stream.reference(externalUri);
    ```

- **Inline reference**

    Add an inline reference to a URI or editor location. Use the [`ChatResponseStream.anchor`](/api/references/vscode-api#ChatResponseStream.anchor) method and provide the anchor location and optional title. To reference a symbol (for example, a class or variable), you would use a location in an editor.

    Example code snippet:

    ```typescript
    const symbolLocation: vscode.Uri = vscode.Uri.parse('location-to-a-symbol');

    // Render an inline anchor to a symbol in the workspace
    stream.anchor(symbolLocation, 'MySymbol');
    ```

> **Important**: Images and links are only available when they originate from a domain that is in the trusted domain list. Get more info about [link protection in VS Code](/docs/editing/editingevolved#outgoing-link-protection).

## Implement tool calling

To respond to a user request, a chat extension can invoke language model tools. Learn more about [language model tools](/api/extension-guides/ai/tools) and the [tool-calling flow](/api/extension-guides/ai/tools#_tool-calling-flow).

You can implement tool calling in two ways:

- By using the [`@vscode/chat-extension-utils` library](https://www.npmjs.com/package/@vscode/chat-extension-utils) to simplify the process of calling tools in a chat extension.
- By implementing tool calling yourself, which gives you more control over the tool-calling process. For example, to perform additional validation or to handle tool responses in a specific way before sending them to the LLM.

### Implement tool calling with the chat extension library

You can use the [`@vscode/chat-extension-utils` library](https://www.npmjs.com/package/@vscode/chat-extension-utils) to simplify the process of calling tools in a chat extension.

Implement tool calling in the `vscode.ChatRequestHandler` function of your [chat participant](/api/extension-guides/ai/chat).

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

## Measuring success

We recommend that you measure the success of your participant by adding telemetry logging for `Unhelpful` user feedback events, and for the total number of requests that your participant handled. An initial participant success metric can then be defined as: `unhelpful_feedback_count / total_requests`.

```typescript
const logger = vscode.env.createTelemetryLogger({
     // telemetry logging implementation goes here
});

cat.onDidReceiveFeedback((feedback: vscode.ChatResultFeedback) => {
    // Log chat result feedback to be able to compute the success metric of the participant
    logger.logUsage('chatResultFeedback', {
        kind: feedback.kind
    });
});
```

Any other user interaction with your chat response should be measured as a positive metric (for example, the user selecting a button that was generated in a chat response). Measuring success with telemetry is crucial when working with AI, since it is a nondeterministic technology. Run experiments, measure and iteratively improve your participant to ensure a good user experience.

## Naming restrictions and conventions

### Chat participant naming conventions

| Property | Description | Naming guidelines |
|----------|-------------|-------------------|
| `id`  | Globally unique identifier for the chat participant | <ul><li>String value</li><li>Use the extension name as a prefix, followed by a unique ID for your extension</li><li>Example: `chat-sample.cat`, `code-visualizer.code-visualizer-participant`</li></ul>  |
| `name`  | Name of the chat participant, referenced by users through the `@` symbol | <ul><li>String value consisting of alphanumeric characters, underscores, and hyphens</li><li>It's recommended to only use lowercase to ensure consistency with existing chat participants</li><li>Ensure the purpose of the participant is obvious from its name by referencing your company name or its functionality</li><li>Some participant names are reserved. If you use a reserved name, the fully qualified name is shown, including the extension ID</li><li>Examples: `vscode`, `terminal`, `code-visualizer`</li></ul>   |
| `fullName` | (Optional) The full name of the participant, which is shown as the label for responses coming from the participant | <ul><li>String value</li><li>It's recommended to use [title case](https://en.wikipedia.org/wiki/Title_case)</li><li>Use your company name, brand name, or user-friendly name for your participant</li><li>Examples: `GitHub Copilot`, `VS Code`, `Math Tutor`</li></ul>   |
| `description` | (Optional) Short description of what the chat participant does, shown as placeholder text in the chat input field or in the list of participants | <ul><li>String value</li><li>It's recommended to use sentence case, without punctuation at the end</li><li>Keep the description short to avoid horizontal scrolling</li><li>Examples: `Ask questions about VS Code`, `Generate UML diagrams for your code`</li></ul>   |

When referring to your chat participant in any of the user-facing elements, such as properties, chat responses, or chat user interface, it's recommended to not use the term *participant*, as it's the name of the API. For example, the `@cat` extension could be called "Cat extension for GitHub Copilot".

### Slash command naming conventions

| Property | Description | Naming guidelines |
|----------|-------------|-------------------|
| `name`  | Name of the slash command, referenced by users through the `/` symbol | <ul><li>String value</li><li>It's recommended to use [lower camel case](https://en.wikipedia.org/wiki/Camel_case) to align with existing slash commands</li><li>Ensure the purpose of the command is obvious from its name</li><li>Examples: `fix`, `explain`, `runCommand`</li></ul>   |
| `description` | (Optional) Short description of what the slash command does, shown as placeholder text in the chat input field or in the list of participants and commands | <ul><li>String value</li><li>It's recommended to use sentence case, without punctuation at the end</li><li>Keep the description short to avoid horizontal scrolling</li><li>Examples: `Search for and execute a command in VS Code`, `Generate unit tests for the selected code`</li></ul>   |

## Guidelines

Chat participants should not be purely question-answering bots. When building a chat participant, be creative and use the existing VS Code API to create rich integrations in VS Code. Users also love rich and convenient interactions, such as buttons in your responses, menu items that bring users to your participant in chat. Think about real life scenarios where AI can help your users.

It doesn't make sense for every extension to contribute a chat participant. Having too many participants in chat might lead to a bad user experience. Chat participants are best when you want to control the full prompt, including instructions to the language model. You can reuse the carefully crafted Copilot system message and you can contribute context to other participants.

For example, language extensions (such as the C++ extension) can contribute in various other ways:

- Contribute tools that bring language service smarts to the user query. For example, the C++ extension could resolve the `#cpp` tool to the C++ state of the workspace. This gives the Copilot language model the right C++ context to improve the quality of Copilot answers for C++.
- Contribute smart actions that use the language model, optionally in combination with traditional language service knowledge, to deliver a great user experience. For example, C++ might already offer an "extract to method" smart action that uses the language model to generate a fitting default name for the new method.

Chat extensions should explicitly ask for user consent if they are about to do a costly operation or are about to edit or delete something that can't be undone. To have a great user experience, we discourage extensions from contributing multiple chat participants. Up to one chat participant per extension is a simple model that scales well in the UI.

## Publishing your extension

Once you have created your AI extension, you can publish your extension to the Visual Studio Marketplace:

- Before publishing to the VS Marketplace we recommend that you read the [Microsoft AI tools and practices guidelines](https://www.microsoft.com/en-us/ai/tools-practices). These guidelines provide best practices for the responsible development and use of AI technologies.
- By publishing to the VS Marketplace, your extension is adhering to the [GitHub Copilot extensibility acceptable development and use policy](https://docs.github.com/en/early-access/copilot/github-copilot-extensibility-platform-partnership-plugin-acceptable-development-and-use-policy).
- Upload to the Marketplace as described in [Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).
- If your extension already contributes functionality other than chat, we recommend that you do not introduce an extension dependency on GitHub Copilot in the [extension manifest](/api/references/extension-manifest). This ensures that extension users that do not use GitHub Copilot can use the non-chat functionality without having to install GitHub Copilot.

## Related content

- [Use the Language Model API](/api/extension-guides/ai/language-model)
- [Contribute a language model tool](/api/extension-guides/ai/tools)
