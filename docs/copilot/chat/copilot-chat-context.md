---
ContentId: 5d8a707d-a239-4cc7-92ee-ccc763e8eb9c
DateApproved: 02/04/2026
MetaDescription: Learn how to manage context when using AI in VS Code, including workspace indexing, #-mentions for files and symbols, web content references, and custom instructions.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Manage context for AI

By providing the right context, you can get more relevant and accurate responses from the AI in VS Code. In this article, you learn how to manage context in chat, including how to use #-mentions to reference files, folders, and symbols, how to reference web content, or how you can use custom instructions to guide the AI's responses.

## Workspace indexing

VS Code uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

The following workspace indexing options are available:

* **Remote index**: if your code is hosted in a GitHub repository, you can build a remote index to search your codebase quickly, even for large codebases.
* **Local index**: use an advanced semantic index that is stored on your local machine to provide fast and accurate search results for your codebase.
* **Basic index**: if local indexing is not available, you can use simpler algorithms that are optimized to work locally for larger codebases.

Learn more about [workspace indexing](/docs/copilot/reference/workspace-context.md).

## Implicit context

VS Code automatically provides context to the chat prompt based on your current activity. The following information is implicitly included in the chat context:

* The currently selected text in the active editor.
* The file name or notebook name of the active editor.
* If you're using the **Ask** agent, the active file is automatically included as context.
* When using **Agent**, it decides autonomously if the active file needs to be added to the chat context based on your prompt.

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
* `"Where is the database connection string configured? #codebase"`
* `"Add a new API route for updating the address #codebase"`

If you use [agents](/docs/copilot/agents/local-agents.md), the agent will automatically use codebase search when it determines that additional context is needed to answer your question. You can still add `#codebase` if your question might be interpreted in different ways and you want to make sure the agent uses codebase search.

### Reference content from the web

You can reference content from the web in your chat prompts, for example to get the latest API reference or code examples.

* `#fetch <URL>`

    Use the `fetch` tool to retrieve content from a specific web page. To use this tool, type `#fetch` followed by the URL of the page you want to reference.

    The `fetch` tool caches the content of the web page for a limited time to improve performance. If the content of the page changes, you can force a refresh by restarting VS Code. If the page cannot be reached, the cache will expire after a short time (approximately five minutes).

    VS Code prompts for confirmation before accessing external URLs to protect your privacy and security. Learn more about [configuring URL auto-approval](/docs/copilot/agents/agent-tools.md#url-approval).

    Example prompts using the `fetch` tool:

    * `"What are the highlights of VS Code 1.100 #fetch https://code.visualstudio.com/updates/v1_100"`
    * `"Update the asp.net app to .net 9 #fetch https://learn.microsoft.com/en-us/aspnet/core/migration/80-90"`

* `#githubRepo <repo name>`

    Use the `githubRepo` tool to perform a code search within a GitHub repository. Type `#githubRepo` followed by the repository name.

    Example prompts using the `githubRepo` tool:

    * `"How does routing work in next.js #githubRepo vercel/next.js"`
    * `"Perform a code review to validate it's consistent with #githubRepo microsoft/typescript"`

### Reference tools

When using agents, the agent autonomously decides to use tools for performing specific tasks. If you want to explicitly reference a tool in your chat prompt, you can use #-mentions. Type `#` followed by the tool name and optional parameters:

* `"Summarize #fetch https://code.visualstudio.com/updates"`
* `"How does routing work? #githubRepo vercel/next.js"`
* `"what are my open issues #github-mcp"` (use tools from the GitHub MCP server)

If you reference a tool set or MCP server by its name, all tools from that set or server are made available to the agent for the current prompt.

Learn more about [adding and using tools in chat](/docs/copilot/agents/agent-tools.md).

## @-mentions

Chat participants are specialized assistants that enable you to ask domain-specific questions in chat. Imagine a chat participant as a domain expert to whom you hand off your chat request and it takes care of the rest.

Chat participants are different from [tools](#reference-tools) that are invoked as part of an agent flow to contribute and perform specific tasks.

You can invoke a chat participant by @-mentioning it: type `@` followed by the participant name. VS Code has several built-in chat participants like `@vscode`, `@terminal`, or `@workspace`. They are optimized to answer questions about their respective domains.

The following examples show how to use @-mentions in your chat prompts:

* `"@vscode how to enable word wrapping"`
* `"@terminal what are the top 5 largest files in the current directory"`

Type `@` in the chat input field to see a list of available chat participants.

Extensions can also contribute their own [chat participants](/api/extension-guides/ai/chat.md).

## Vision (Preview)

Chat supports vision capabilities, which means you can attach an image as context to your chat prompt and ask questions about it. For example, attach a screenshot of a block of code and ask to explain it, or attach a sketch of a UI and ask the agent to implement it.

> [!TIP]
> You can drag and drop an image from a web browser onto the Chat view to add it as context.

## Add browser elements (Experimental)

VS Code has a built-in [integrated browser](/docs/debugtest/integrated-browser.md) that you can use to preview and interact with web pages inside VS Code, for example to do quick testing and debugging of your web application.

You can add elements from the browser window as context to your chat prompt. This is useful when you want to get help with specific parts of a web page, such as HTML elements, CSS styles, or JavaScript code.

To add elements from the integrated browser to your chat prompt:

1. Start your web application.
1. Open the integrated browser by running the **Browser: Open Integrated Browser** command from the Command Palette.
1. Enter the URL of the web page you want to interact with.
1. Select the **Add Element to Chat** button. You can now hover over the elements of the web page and select them to add them as context to your chat prompt.

    <video src="images/copilot-chat/integrated-browser-select-element.mp4" title="Video showing how to select and add elements from the integrated browser to the chat prompt." autoplay loop controls muted></video>

You can configure which information is included in the context:

* Attach CSS: `setting(chat.sendElementsToChat.attachCSS)` setting
* Attach images: `setting(chat.sendElementsToChat.attachImages)` setting

## Monitor context window usage

The chat input box displays a context window control that shows how much of the model's context window is being used. This visual indicator helps you understand when chat summarization might occur or when you should start a new session.

![Screenshot of VS Code Chat view, showing the context window usage control in the chat input box.](./images/copilot-chat/chat-context-window-control.png)

The context window control provides the following information:

* **Visual fill indicator**: a shaded bar shows the proportion of the context window currently in use
* **Total usage and breakdown on hover**: hover over the control to see the exact token count as a fraction of the total available context (for example, 15K/128K) and a breakdown of usage by category

As you send more requests in a conversation, the control updates to reflect the increasing context usage. The total available context (denominator) changes based on the AI model you select, since different models have different context window sizes.

> [!TIP]
> When the context window fills up, VS Code automatically summarizes the conversation history to free up space. Start a [new chat session](/docs/copilot/chat/chat-sessions.md) if you want to reset the context entirely.

## Related resources

* [Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Prompt examples](/docs/copilot/chat/prompt-examples.md)
* [Prompt engineering guide](/docs/copilot/guides/prompt-engineering-guide.md)
* [Chat Debug view](/docs/copilot/chat/chat-debug-view.md)
