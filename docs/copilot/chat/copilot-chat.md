---
ContentId: 130ecf6c-6f06-4ddd-8b1d-f85f023af77b
DateApproved: 05/08/2025
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use chat in VS Code

Use chat in Visual Studio Code to ask about your codebase or make edits across your project by using natural language. Chat can operate in different modes, optimized for your use case, from asking questions to making multi-file edits or starting an agentic coding workflow.

You might want to use chat in VS Code when you need to:

* Understand code - "Explain how this authentication middleware works"
* Debug issues - "Why am I getting a null reference in this loop?"
* Get code suggestions - "Show me how to implement a binary search tree in Python"
* Optimize performance - "Help me improve the efficiency of this database query"
* Learn best practices - "What's the recommended way to handle errors in async functions?"
* Get VS Code tips - "How do I customize keyboard shortcuts?"

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Chat mode

Chat in VS Code can operate in different modes, each optimized for a specific use case. You can change between the different chat modes at any time in the Chat view.

| Mode | Description |
|------|-------------|
| [**Ask**](/docs/copilot/chat/chat-ask-mode.md) | Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts.<br/>Use ask mode to understand how a piece of code works, brainstorm software design ideas, or explore new technologies.<br/>Open in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask). |
| [**Edit**](/docs/copilot/chat/copilot-edits.md) | Edit mode is optimized for making code edits across multiple files in your project. VS Code directly applies the code changes in the editor, where you can review them in-place. Use edit mode for coding tasks when you have a good understanding of the changes that you want to make, and which files you want to edit.<br/>Open in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit). |
| [**Agent**](/docs/copilot/chat/chat-agent-mode.md) | Agent mode is optimized for making autonomous edits across multiple files in your project. Use agent mode for coding tasks when you have a less well-defined task that might also require running terminal commands and tools.<br/>Open in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent). |

Switch between the different chat modes by using the **Mode** dropdown in the Chat view.

![Screenshot showing the Copilot Chat view, highlighting the mode dropdown.](images/copilot-chat/chat-mode-dropdown.png)

## Access chat in VS Code

You can access chat in VS Code in several ways:

* **Chat view** (`kb(workbench.action.chat.open)`): have an ongoing, multi-turn chat conversation in a dedicated view. Switch between different [chat modes](#chat-mode) at any time. By default, the Chat view is located in the [Secondary Side Bar](/docs/configure/custom-layout.md#secondary-side-bar) in VS Code.

* **Inline chat** (`kb(inlineChat.start)`): start a chat conversation directly from the editor (_editor inline chat_) or integrated terminal (_terminal inline chat_) to get suggestions in-place.

* **Quick Chat** (`kb(workbench.action.quickchat.toggle)`): ask a quick question and get back into what you were doing.

Quickly access chat by using the corresponding keyboard shortcuts or via the Copilot menu in the VS Code title bar.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-chat-menu-command-center.png)

## Submit a chat prompt

You can use natural language to make chat requests. You can ask questions about your codebase, get code suggestions, or brainstorm ideas.

Open the Chat view (`kb(workbench.action.chat.open)`) and enter your prompt in the chat input field. Notice that the response might rich content such as Markdown text, code blocks, buttons, file trees, and more.

![Copilot Chat view in the Secondary Side Bar and Explorer view in the Primary Side Bar.](images/copilot-chat/copilot-chat-view.png)

Here are some example prompts you can experiment with:

* Ask questions about coding and technology concepts (_"What is a linked list?"_, _"top 10 popular web frameworks"_)
* Brainstorm ideas on how to best solve a coding problem (_"How to add auth to my project?"_)
* Explain a block of code (_"@workspace /explain"_, _"What does this code do?"_)
* Propose code fixes (_"@workspace /fix"_, _"This method gives a FileNotFoundException"_)
* Generate unit test cases or code documentation (_"@workspace /tests"_, _"@workspace /doc"_)
* Ask about VS Code settings (_@vscode how do I disable the minimap?_)

For more prompt examples, see the [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat) in the GitHub documentation.

> [!TIP]
> Type `/help` in the chat input field to get help about GitHub Copilot and how to interact with Copilot Chat.

## Change the language model

Copilot offers different built-in language models to choose from. Some models are optimized for fast coding tasks, while others are better suited for slower planning and reasoning tasks. Use the model picker in the chat input field to change the model that Copilot uses for generating a response.

![Screenshot of the Copilot Chat model picker](images/copilot-chat/chat-model-picker.png)

You can also add models from other model providers (preview) and use them in chat. Get more details about how to [use models from other providers](/docs/copilot/language-models.md#bring-your-own-language-model-key).

> [!NOTE]
> The list of available models might vary based on your Copilot subscription and might change over time. See the GitHub Copilot documentation for more information about the [available language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode).

## Add chat context

VS Code tries to determine the intent and scope of your chat request based on your natural language prompt. To help get more relevant responses, provide additional context in your chat prompt, such as files, test results, terminal output, and more.

Use the **Add Context** button in the Chat view or type #-mentions to add context to your chat prompt. For example, `#codebase` to refer to the entire codebase, or `#<file | folder | symbol>` to refer to a specific file, folder, or symbol in your workspace. Type `#` in the chat input field to view the list of context items. Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

![Screenshot of the Chat view with the context menu open](images/copilot-chat/chat-add-context.png)

You can also directly reference an agent mode tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode). For example, use the `#fetch` tool to add the content of a web page as context to your chat prompt, or use `#githubRepo` to perform a code search in a GitHub repository.

Get more details about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

## Vision (Preview)

Chat supports vision capabilities, which means you can attach an image as context to your chat prompt and ask questions about it. For example, attach a screenshot of a block of code and ask to explain it, or attach a sketch of a UI and ask agent mode to implement it.

> [!TIP]
> You can drag and drop an image from a web browser onto the Chat view to add it as context.

## Chat history

As you iterate and send multiple chat prompts in a chat session, VS Code uses the history of chat prompts and responses as context for your current chat prompt. This means that you can ask follow-up questions or clarify your previous question without having to repeat the context. For example, you can ask "How does *this*
differ from ...", "Now add a test case", "explain in more detail", and more.

At any time, you can create a new chat session by using the **New Chat** (`+`) button (`kb(workbench.action.chat.newChat)`) in the Chat view. This can be useful if you want to move to a different topic and avoid the previous context and history.

To view the history of chat sessions, select the **Show Chats...** button in the Chat view or by using the **Chat: Show Chats...** command in the Command Palette. Select a history entry to open that chat session in the Chat view and continue the conversation.

![Screenshot of the Chat view with the Show Chats... button highlighted](images/copilot-chat/copilot-chat-view-show-chats.png)

You can export all prompts and responses for a chat session in a JSON file with the **Chat: Export Chat...** command in the Command Palette.

### Revert chat requests

You can revert (undo) chat requests in the active chat session. When you revert a chat request, you also remove the corresponding response from the conversation history.

Reverting a request is useful if you want to remove a specific prompt and response from the conversation history of that session. For example, if you notice that the language model is not providing relevant responses or is taking an unwanted direction.

You have two options to revert a chat request:

* Undo the last chat request: use the **Undo Last Request** button in the Chat view toolbar.

    ![Screenshot of the Chat view with the Undo Last Request button highlighted.](images/copilot-chat/chat-undo-last-request.png)

* Undo a specific chat request: hover over a chat request in the Chat view and select the **Undo Request (Delete)** (`x`) button next to the request (or press `kb(workbench.action.chat.undoEdits)`). When you undo a request, it also undoes all subsequent requests and responses in the chat session.

    ![Screenshot of the Chat view with multiple prompts, highlighting the 'x' control to delete a chat prompt and its response.](images/copilot-chat/copilot-chat-delete-prompt.png)

## Open chat in an editor tab or separate window

You can open a chat session as a separate editor tab, or even as a separate, floating window. This functionality enables you to have multiple chat sessions open at the same time.

In the Chat view, select the `...` icon in the top-right corner, and then select **Open Chat in Editor** or **Open Chat in New Window**.

![Screenshot of the Chat view, highlighting the three-dot menu that contains the Open in Editor and Open in New Window options.](images/copilot-chat/chat-three-dot-menu.png)

The following screenshot shows the Chat view running in a floating window:

![Screenshot of the Chat view, highlighting the three-dot menu that contains the Open in Editor and Open in New Window options. The desktop shows a floating window with a chat session.](images/copilot-chat/chat-open-in-new-window.png)

By default, the chat session opens in compact mode, which hides the title bar and other UI elements. Select the compact mode icon in the floating window title bar to toggle between compact and normal mode.

Optionally, enable the **Always on Top** mode to always keep the Chat view on top of other windows.

Learn more about [floating windows](/docs/configure/custom-layout.md#floating-windows) in VS Code.

## Use voice interactions

With the voice control capabilities in VS Code, provided by the [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension, you can initiate a chat conversation by using your voice:

* Use your voice to dictate your chat prompt
* Use the "Hey Code" voice command to start a voice session with Copilot Chat
* Accelerate voice input for chat by using the "hold to speak" mode

Learn more about how to [use voice interactions in VS Code](/docs/configure/accessibility/voice.md).

## Privacy and transparency

To enable more workspace search features for private repositories, we require additional permissions. If we detect that we don't have these permissions already, we will ask for them at startup. Once granted, we'll securely store the session for the future.

![Modal window asking for additional authentication for a private repository.](images/copilot-chat/authentication.png)

Learn more about security, privacy, and transparency in the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/).

## Frequently asked questions

### How do I choose between the different chat modes?

The different chat modes are optimized for different use cases:

* Use _editor inline chat_ to ask questions or make edits directly in the active editor. This is useful for making code changes or asking questions that are scoped to the active file.

* Use _ask mode_ to ask questions about your codebase or technology concepts. The response might include code suggestions, which you can apply manually and individually to your codebase. Changes are not automatically applied to your codebase.

* Use _edit mode_ to directly apply edits across multiple files in your codebase based on your chat prompt. You provide the relevant context and files for your prompt.

* Use _agent mode_ to start an agentic coding workflow, whereby Copilot autonomously determines the relevant context and files, determines which tasks need to be performed to complete the request. It then iterates independently to achieve the desired outcome, fixing issues as they come up. Agent mode can invoke tools to perform specialized tasks, such as running terminal commands, validating test cases, or accessing APIs.

## Additional resources

You can read more about [GitHub Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.

## Next steps

* Get started with the introductory [Copilot Chat tutorial](/docs/copilot/chat/getting-started-chat.md).
* [Use ask mode to ask questions about your code](/docs/copilot/chat/chat-ask-mode.md)
* [Use agent mode to start an autonomous coding session](/docs/copilot/chat/chat-agent-mode.md)
* [Use edit mode to make code edits across multiple files](/docs/copilot/chat/copilot-edits.md)
