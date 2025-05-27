---
ContentId: 5d8a707d-a239-4cc7-92ee-ccc763e8eb9c
DateApproved: 05/08/2025
MetaDescription: "Learn how to manage context when using AI in VS Code, including workspace indexing, #-mentions for files and symbols, web content references, and custom instructions."
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Manage context for AI

## #-mentions

In chat, you can explicitly refer to context by typing `#` followed by the context item you want to mention. This enables the AI to provide more relevant responses based on the specific context you are referring to.

Type the `#` symbol in the chat input field to see a list of available context items.

![Screenshot of VS Code Chat view, showing the chat variable picker.](./images/copilot-chat/copilot-chat-view-chat-variables.png)

To reference a specific workspace file, folder, or code symbol, type `#` followed by the file name, folder name, or symbol name. Learn more about [referencing files and folders in chat](#add-files-as-context).

Alternatively, choose from the list of available predefined context items like `#changes` to get the diffs of changed files, or `#codebase` to perform a codebase search for your workspace.

Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results.

<details>
<summary>Supported context items</summary>

VS Code supports the following context items:

| Context item | Description |
| ------------- | ----------- |
| #changes | Get the diffs of changed files in source control. |
| #codebase | Perform a codebase search across the current workspace. |
| #extensions | Search across VS Code extensions. |
| #fetch | Get the contents of a web page. |
| #githubRepo | Perform a web search within a GitHub repo. |
| #problems | Get the list of problems for the current workspace. |
| #searchResults | Get the results from the Search view. |
| #terminalLastCommand | Get the last run terminal command and its status. |
| #terminalSelection | Get the terminal text selection. |
| #testFailure | Get the list of test failures. |
| #usages | Get symbol references across the workspace. |
| #vscodeAPI | Perform a search across the VS Code extension API. |

</details>

### Prompt examples

The following examples show how to use #-mentions in your chat prompts:

<details>
<summary>Reference your pending source control changes</summary>
* `"Summarize the #changes"`
* `"Generate release notes based on the #changes"`
</details>

<details>
<summary>Understand the codebase</summary>
* `"Explain how authentication works in #codebase"`
* `"Where is the database connecting string configured? #codebase"`
* `"How do I build this #codebase?"`
* `"Where is #getUser used? #usages"`
</details>

<details>
<summary>Generate code that is consistent with your codebase</summary>
* `"Create an about page and include it in the nav bar #codebase"`
* `"Add a new API route for updating the address info #codebase"`
* `"Add a login button and style it based on #styles.css"`
</details>

<details>
<summary>Fix issues in the workspace</summary>
* `"Fix the issues in #problems"`
* `"Fix the failing tests #testFailure"`
</details>

<details>
<summary>Get information about extensions</summary>
* `"What are the top #extensions for this workspace?"`
</details>

<details>
<summary>Reference content from the web</summary>
* `"How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage"`
* `"Build an API endpoint to fetch address info, use the template from #githubRepo contoso/api-templates"`
</details>

## Add files as context

To let the AI automatically find relevant files and symbols in your workspace, you can use `#codebase`. To provide specific files, folders, or symbols as context, add them to the chat using the following methods:

![Screenshot of the Chat view, showing a prompt that references a file from the workspace.](./images/copilot-chat/chat-reference-file.png)

* #-mention the file, folder, or symbol in your chat message by typing `#` followed by the name of the file, folder, or symbol.
    To reference a symbol, make sure to open the file containing the symbol in the editor first.

* Drag and drop files or folders from the Explorer view or editor tabs onto the Chat view to add them as context.

* Use the **Add Context** button in the Chat view and select **Files & Folders** or **Symbols**.

> [!NOTE]
> If possible, the full contents of the file will be included when you attach a file. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

## Perform a codebase search

Instead of adding individual files manually, you can let VS Code find the right files from your codebase automatically. This can be useful when you don't know which files are relevant to your question.

Add `#codebase` in your prompt or select **Add Context** > **Tools** > **codebase** to enable code search for your workspace.

The following prompt examples show how to use codebase search:

* `"Explain how authentication works in #codebase"`
* `"Where is the database connecting string configured? #codebase"`
* `"Add a new API route for updating the address #codebase"`

Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results.

## Reference web content

You can reference content from the web in your chat prompts, for example to get the latest API reference or code examples.

* `#fetch`: use this tool to retrieve content from a specific web page, such as a version-specific documentation page of a framework. To use this tool, type `#fetch` followed by the URL of the page you want to reference.

    * `"What are the highlights of VS Code 1.100 #fetch https://code.visualstudio.com/updates/v1_100"`
    * `"Update the asp.net app to .net 9 #fetch https://learn.microsoft.com/en-us/aspnet/core/migration/80-90"`

* `#githubRepo`: use this tool to perform a code search within a GitHub repository, for example to reference code patterns or examples from another project. Type `#githubRepo` followed by the repository name (for example, `microsoft/vscode-docs`).

    * `"How does routing work in next.js #githubRepo vercel/next.js"`
    * `"Perform a code review to validate it's consistent with #githubRepo microsoft/typescript"`
    * `"Add unit tests for my app. Use the same test setup and structure as #githubRepo rust-lang/rust"`

## Reference tools

Chat in VS Code has several [built-in tools](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools) and you can further extend it with tools from [MCP servers](/docs/copilot/chat/mcp-servers.md) or extensions. For example, the `#fetch` tool is a built-in tool that allows you to fetch content from a web page.

To reference a tool directly in your chat prompt, type `#` followed by the tool name and optional tool parameters. The following prompt examples show how to use tools:

* Use the [GitHub MCP server](https://github.com/github/github-mcp-server) tool (configured as `github-mcp` in your `mcp.json`):

    * `"what are my open issues #github-mcp"`
    * `"Implement a fix for issue #123 in contoso/tailwindtraders #github-mcp"`
    * `"What is PR 8407 in microsoft/vscode-docs about? #github-mcp"`

* Use the `#postgres` MCP server to query a PostgreSQL database:

    * `"Generate an API endpoint and data access layer for getting weather data from #postgres"`
    * `"What is the max length of the company name from #postgres"`

## @-mentions

When you use [ask mode](/docs/copilot/chat/chat-ask-mode.md) in chat, you can use the `@` symbol to pass the chat prompt to a chat participant. A chat participant is a domain expert that has context and knowledge about a specific topic. For example, the built-in `@vscode` participant is an expert on VS Code and the extension API, or `@terminal` can help with shell commands.

To use a chat participant, start your prompt with `@` followed by the participant name, and then continue with your question.

The following examples show how to use @-mentions in your chat prompts:

* `"@vscode how to enable word wrapping"`
* `"@terminal what are the top 5 largest files in the current directory"`

Type `@` in the chat input field to see a list of available chat participants.

Extensions can also contribute their own [chat participants](/api/extension-guides/chat.md).

## Add elements from the VS Code simple browser (Experimental)

VS Code has a built-in simple browser that you can use to view and interact with a locally-hosted web application, for example to do quick testing and debugging of your web application.

You can add elements from the Simple Browser window as context to your chat prompt. To do this:

1. Make sure to enable selecting elements from the Simple Browser with the `setting(chat.sendElementsToChat.enabled)` setting.
1. Run your web application locally.
1. Open the Simple Browser view by running the **Simple Browser: Show** command from the Command Palette.
1. Select the **Start** button to start selecting elements from the current page.
1. Hover over the elements of the web page and click to add them to the chat prompt.

    <video src="images/copilot-chat/simple-browser-select-element.mp4" title="Adding elements from the Simple Browser to the chat prompt" autoplay loop controls muted></video>

    Notice that the selected element is added as context to the current chat prompt.

You can configure which information is included in the context:

* Attach CSS - enable with the `setting(chat.sendElementsToChat.attachCSS)` setting.
* Attach images - enable with the `setting(chat.sendElementsToChat.attachImages)` setting.

## Chat history

Chat in VS Code is designed to be a multi-turn conversation. Within a chat session, VS Code uses the history of the conversation as context to your current prompt. This means that you can ask follow-up questions or clarify your previous question without having to repeat the context.

To start over with a new chat session and discard the current context, select the **New Chat** (`+`) button (`kb(workbench.action.chat.newChat)`) in the Chat view. This can be useful if you want to move to a different topic and avoid the previous context and history.

Learn more about [chat history and context management](/docs/copilot/chat/copilot-chat.md#chat-history).

## Custom instructions

With instruction files, you can provide the AI with common guidelines and rules for generating responses that match your coding style and preferences. Instruction files are Markdown files that you can create in your workspace or in your current profile.

By using instruction files, you can avoid having to repeatedly add common instructions in your chat prompts, and instead have the AI automatically apply these instructions to your chat interactions.

Learn more about [using instruction files](/docs/copilot/copilot-customization.md).

## Workspace indexing

VS Code uses an index to quickly and accurately search your codebase for relevant code snippets. This index can either be maintained by GitHub or stored locally on your machine.

The following workspace indexing options are available:

* **Remote index**: if your code is hosted in a GitHub repository, you can build a remote index search your codebase quickly, even for large codebases.
* **Local index**: use an advanced semantic index that is stored on your local machine to provide fast and accurate search results for your codebase.
* **Basic index**: if local indexing is not available, you can use simpler algorithms that are optimized to work locally for larger codebases.

Learn more about [workspace indexing](/docs/copilot/reference/workspace-context.md#managing-the-workspace-index).

## Related resources

* Learn about [tools in agent mode](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools).
* Customize AI with [instruction files](/docs/copilot/copilot-customization.md).
* Learn about [workspace indexing](/docs/copilot/reference/workspace-context.md#managing-the-workspace-index).
* Get started with [chat in VS Code](/docs/copilot/chat/copilot-chat.md).
