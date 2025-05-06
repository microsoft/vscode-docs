---
ContentId: 5d8a707d-a239-4cc7-92ee-ccc763e8eb9c
DateApproved: 04/03/2025
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Copilot chat context

This article describes how to add context to your Copilot chat prompt in Visual Studio Code to help Copilot give you the best and most relevant answers. Copilot supports different [types of context](#chat-context-types), including files, symbols, terminal command output, and more.

Copilot tries to determine the intent and scope of your question based on your natural language chat prompt. To help Copilot give you the best and most relevant answers, [add context to your chat prompt](#add-context-to-your-chat-prompt) or [let Copilot find the right files automatically](#let-copilot-find-the-right-files-automatically).

## Add context to your chat prompt

There are several ways to add context to your chat prompt:

* VS Code automatically adds the currently active editor as context. If you selected a code block in the editor, only that selection is added as context.

    You can disable adding the active editor for the current request by selecting the disable (_eye_) icon next to the context item. Use the `setting(chat.implicitContext.enabled)` setting to configure if the active editor should be added automatically for all requests.

    ![Screenshot of VS Code Copilot Chat view, showing the current editor selection as context.](./images/copilot-chat/copilot-chat-view-selection-context.png)

* Select the **Attach Context** (paperclip) icon (Copilot Chat) or **Add Files** button (Copilot Edits) and then select a type of context from the Quick Pick.

    ![Screenshot of VS Code Copilot Chat view, showing the Attach context button and context Quick Pick.](./images/copilot-chat/copilot-chat-view-attach-context.png)

    You can attach predefined context types, such as **Codebase**, or **Terminal Selection**, or choose files, folders, or symbols from the workspace.

    > [!TIP]
    > To quickly add multiple items from the attachment Quick Pick, use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the list, use the `kbstyle(Right)` key to add the item as context, and then repeat this for other items.

* Use the context menu **Copilot** > **Add File to Chat** on a file in the Explorer or Search view, or **Add Selection to Chat** for a text selection in the editor.

* Type the `#` character in your chat prompt to reference context by using chat variables.

    For example, use `#selection` to add the current editor selection to your chat prompt, or `#<file name>` to add a workspace file from the workspace.

    ![Screenshot of VS Code Copilot Chat view, showing the chat variable picker.](./images/copilot-chat/copilot-chat-view-chat-variables.png)

* Drag and drop editor tabs, or files or folders from the Explorer view, Search view, or editor breadcrumb onto the Chat view.

    <video src="images/copilot-chat/copilot-attach-dnd.mp4" title="Dragging files and editors into chat" autoplay loop controls muted></video>

> [!NOTE]
> If possible, the full contents of the file will be included when you attach a file. If that is too large to fit into the context window, an outline of the file will be included that includes functions and their descriptions without implementations. If the outline is also too large, then the file won't be part of the prompt.

## Let Copilot find the right files automatically

Instead of adding individual files manually, you can let Copilot find the right files from your codebase automatically. This can be useful when you don't know which files are relevant to your question.

To let Copilot find the right files automatically, add `#codebase` in your prompt or select **Codebase** from the list of context types.

Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results.

## Fetch content from the web

To let Copilot fetch content from a web page, for example to reference a documentation page, add the fetch tool to your prompt, followed by the URL of the page you want to fetch.

To add the fetch tool, select **Add Context** > **Tools...** > **Fetch Web Page**. Alternatively, type `#fetch` in the chat prompt.

![Screenshot of the Copilot Chat view, showing the fetch tool used to summarize the web page.](./images/copilot-chat/chat-fetch-web-page.png)

## Perform a code search in a GitHub repository

To let Copilot perform a code search and fetch content from a GitHub repository, for example to reference a documentation page, add the GitHub Repository tool to your prompt, followed by the path of the GitHub repository. For example, to perform a code search in the vscode repository `what is a global code snippet #githubRepo microsoft/vscode`.

To add the GitHub Repository tool, type `#githubRepo` in the chat prompt, followed by the repository repository name (for example, `microsoft/vscode-docs`).

![Screenshot of the Copilot Chat view, showing the GitHub Repository tool used to search for a code.](./images/copilot-chat/chat-fetch-github-repo.png)

## Add context for fixing problems

When you encounter issues in your code, or have failures when running tests, you can add specific context to your chat prompt to help Copilot provide the best answer.

* Drag and drop items from the **Problems** panel to attach the corresponding issue as context to your prompt.

    Alternatively, select the **Problem...** from the list of context types, and then select a specific problem from the Quick Pick.

    ![Screenshot of the Chat view with a problem attached to the chat input field, the result of doing drag and drop of that problem from the Problems panel.](./images/copilot-chat/copilot-chat-attach-problem.png)

* Select the **Test Failure** context type to add the test failure details as context to your prompt.

* Select **Terminal Last Command** from the list of context types or type `#terminalLastCommand` to attach the output of the last command run in the terminal.

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

## Chat context types

Copilot supports the following chat context types:

* Files - include specific files from your workspace in the prompt
* Folders - add a folder to include the files in that folder in the prompt
* Symbols - add a symbol from your workspace to the prompt
* Codebase - let Copilot find the right files automatically
* Editor or terminal selection - include a selection of text from the editor or terminal in the prompt
* Terminal command output - include the output of the last command run in the terminal
* Problems - include a specific code issue from the Problems panel to the prompt
* Test failures - include details from test failures in the prompt
* Search results - include the results from the Search view in the prompt
* Tools - include tools in the prompt, for example the `#fetch` tool or tools from extensions or MCP servers

## Related resources

* Use [Copilot Chat](/docs/copilot/chat/copilot-chat.md) to interact with Copilot.
* Use [Copilot Edits](/docs/copilot/chat/copilot-edits.md) to make edits across multiple files.
