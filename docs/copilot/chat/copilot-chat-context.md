---
ContentId: 5d8a707d-a239-4cc7-92ee-ccc763e8eb9c
DateApproved: 10/09/2025
MetaDescription: "Learn how to manage context when using AI in VS Code, including workspace indexing, #-mentions for files and symbols, web content references, and custom instructions."
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Manage context for AI

By providing the right context, you can get more relevant and accurate responses from the AI in VS Code. In this article, you learn how to manage context in chat, including how to use #-mentions to reference files, folders, and symbols, how to reference web content, or how you can use custom instructions to guide the AI's responses.

## Workspace indexing

VS Code uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

The following workspace indexing options are available:

* **Remote index**: if your code is hosted in a GitHub repository, you can build a remote index search your codebase quickly, even for large codebases.
* **Local index**: use an advanced semantic index that is stored on your local machine to provide fast and accurate search results for your codebase.
* **Basic index**: if local indexing is not available, you can use simpler algorithms that are optimized to work locally for larger codebases.

Learn more about [workspace indexing](/docs/copilot/reference/workspace-context.md).

## Implicit context

VS Code automatically provides context to the chat prompt based on your current activity. The following information is implicitly included in the chat context:

* The currently selected text in the active editor.
* The file name or notebook name of the active editor.
* If you're using ask mode or edit mode, the active file is automatically included as context.
* In agent mode, the agent decides autonomously if the active file needs to be added to the chat context based on your prompt.

![Screenshot of the Chat view, showing the active file as a suggested context item in the chat input box.](./images/copilot-chat/chat-context-current-file.png)

## #-mentions

You can explicitly add context to your prompt by typing `#` followed by the context item you want to mention. VS Code supports different types of context items: files, folders, code symbols, tools, terminal output, source control changes, and more.

Type the `#` symbol in the chat input field to see a list of available context items, or select **Add Context** in the Chat view to open the context picker.

![Screenshot of VS Code Chat view, showing the chat variable picker.](./images/copilot-chat/copilot-chat-view-chat-variables.png)

View the full list of [supported context items](/docs/copilot/reference/copilot-vscode-features.md#chat-tools).

### Add files as context

To provide specific files, folders, or symbols as context, add them to the chat using the following methods:

* #-mention the file, folder, or symbol in your chat message by typing `#` followed by the name of the file, folder, or symbol.
    To reference a symbol, make sure to open the file containing the symbol in the editor first.

* Drag and drop files or folders from the Explorer view, Search view, or editor tabs onto the Chat view to add them as context.

* Select **Add Context** in the Chat view and select **Files & Folders** or **Symbols** from the Quick Pick.

> [!NOTE]
> If possible, the full contents of the file will be included when you attach a file. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

### Perform a codebase search

Instead of adding individual files manually, you can let VS Code find the right files from your codebase automatically. This can be useful when you don't know which files are relevant to your question.

Add `#codebase` in your prompt or select **Add Context** > **Tools** > **codebase** to enable code search for your workspace.

The following prompt examples show how to use codebase search:

* `"Explain how authentication works in #codebase"`
* `"Where is the database connecting string configured? #codebase"`
* `"Add a new API route for updating the address #codebase"`

If you use [agent mode](/docs/copilot/chat/copilot-chat.md#built-in-chat-modes), the agent will automatically use codebase search when it determines that additional context is needed to answer your question. You can still add `#codebase` if your question might be interpreted in different ways and you want to make sure the agent uses codebase search.

### Reference content from the web

You can reference content from the web in your chat prompts, for example to get the latest API reference or code examples.

* `#fetch <URL>`

    Use the `fetch` tool to retrieve content from a specific web page. To use this tool, type `#fetch` followed by the URL of the page you want to reference.

    * `"What are the highlights of VS Code 1.100 #fetch https://code.visualstudio.com/updates/v1_100"`
    * `"Update the asp.net app to .net 9 #fetch https://learn.microsoft.com/en-us/aspnet/core/migration/80-90"`

* `#githubRepo <repo name>`

    Use the `githubRepo` tool to perform a code search within a GitHub repository. Type `#githubRepo` followed by the repository name.

    * `"How does routing work in next.js #githubRepo vercel/next.js"`
    * `"Perform a code review to validate it's consistent with #githubRepo microsoft/typescript"`

### Reference tools

In agent mode, the agent autonomously decides to use tools for performing specific tasks. If you want to explicitly reference a tool in your chat prompt, you can use #-mentions. Type `#` followed by the tool name and optional parameters:

* `"Summarize #fetch https://code.visualstudio.com/updates"`
* `"How does routing work? #githubRepo vercel/next.js"`
* `"what are my open issues #github-mcp"` (use tools from the GitHub MCP server)

If you reference a tool set or MCP server by its name, all tools from that set or server are made available to the agent for the current prompt.

Learn more about [adding and using tools in chat](/docs/copilot/chat/chat-tools.md).

## @-mentions

Chat participants are specialized assistants that enable you to ask domain-specific questions in chat. Imagine a chat participant as a domain expert to whom you hand off your chat request and it takes care of the rest.

Chat participants are different from [tools](#reference-tools) that are invoked as part of an agent flow to contribute and perform specific tasks.

You can invoke a chat participant by @-mentioning it: type `@` followed by the participant name. VS Code has several built-in chat participants like `@vscode`, `@terminal`, or `@workspace`. They are optimized to answer questions about their respective domains.

The following examples show how to use @-mentions in your chat prompts:

* `"@vscode how to enable word wrapping"`
* `"@terminal what are the top 5 largest files in the current directory"`

Type `@` in the chat input field to see a list of available chat participants.

Extensions can also contribute their own [chat participants](/api/extension-guides/ai/chat.md).

## Vision

Chat supports vision capabilities, which means you can attach an image as context to your chat prompt and ask questions about it. For example, attach a screenshot of a block of code and ask to explain it, or attach a sketch of a UI and ask agent mode to implement it.

> [!TIP]
> You can drag and drop an image from a web browser onto the Chat view to add it as context.

## Add browser elements (Experimental)

VS Code has a built-in browser that you can use to preview and interact with web pages inside VS Code, for example to do quick testing and debugging of your web application.

You can add elements from the Simple Browser window as context to your chat prompt. This is useful when you want to get help with specific parts of a web page, such as HTML elements, CSS styles, or JavaScript code.

To add elements from the Simple Browser to your chat prompt:

1. Enable selection from the Simple Browser with the `setting(chat.sendElementsToChat.enabled)` setting.
1. Start your web application.
1. Open the Simple Browser view by running the **Simple Browser: Show** command from the Command Palette.
1. Select the **Start** button to start selecting elements from the current page.
1. Hover over the elements of the web page and click to add them to the chat prompt.

    <video src="images/copilot-chat/simple-browser-select-element.mp4" title="Adding elements from the Simple Browser to the chat prompt" autoplay loop controls muted></video>

    Notice that the selected element is added as context to the current chat prompt.

You can configure which information is included in the context:

* Attach CSS - enable with the `setting(chat.sendElementsToChat.attachCSS)` setting.
* Attach images - enable with the `setting(chat.sendElementsToChat.attachImages)` setting.

> [!TIP]
> This functionality is also available in the [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) extension (pre-release).
