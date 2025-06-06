---
ContentId: 130ecf6c-6f06-4ddd-8b1d-f85f023af77b
DateApproved: 05/08/2025
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use chat in VS Code

Use chat in Visual Studio Code to ask about your codebase or make edits across your project by using natural language. Chat can operate in different modes, optimized for your use case, from asking questions to making multi-file edits or starting an autonomous coding workflow.

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

## Access chat in VS Code

You can use natural language chat in different ways in VS Code, each optimized for a specific use case and task.

| Experience| Use case | User experience |
|-----------|----------|-----------------|
| **Chat view**<br/>`kb(workbench.action.chat.open)` | Have an ongoing, multi-turn chat conversation in a dedicated view on the side. Switch between different [chat modes](#choose-a-chat-mode) to ask questions, make code edits across files, or start an autonomous coding workflow. | ![Screenshot of the Chat view](images/copilot-chat/chat-view.png) |
| **Inline chat**<br/>`kb(inlineChat.start)` | Start a chat conversation directly from the editor (_editor inline chat_) or integrated terminal (_terminal inline chat_) to get suggestions in-place. | ![Screenshot of the Inline chat](images/copilot-chat/inline-chat.png) |
| **Quick Chat**<br/>`kb(workbench.action.quickchat.toggle)` | Ask a quick question and get back into what you were doing. | ![Screenshot of the Quick Chat](images/copilot-chat/quick-chat.png) |

Access each chat experience by using the corresponding keyboard shortcuts or via the Copilot menu in the VS Code title bar.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-chat-menu-command-center.png)

## Choose a chat mode

Chat modes are predefined configurations to customize chat in VS Code for specific tasks, such as asking questions, making code edits, or performing autonomous coding tasks. VS Code comes with three built-in chat modes: **Ask**, **Edit**, and **Agent**. You can also define your own chat modes for specific scenarios, such as planning a new feature, or researching implementation options.

To switch between chat modes, open the Chat view (`kb(workbench.action.chat.open)`), and then select the desired mode from the chat mode dropdown list.

![Screenshot showing the Chat view, highlighting the chat mode dropdown list.](images/chat-modes/chat-mode-dropdown.png)

Learn more about [chat modes in VS Code](/docs/copilot/chat/chat-modes.md).

## Change the language model

VS Code offers different built-in language models to choose from. Some models are optimized for fast coding tasks, while others are better suited for slower planning and reasoning tasks. Use the model picker in the chat input field to change the model that Copilot uses for generating a response.

![Screenshot of the chat model picker in the Chat view, showing a dropdown list of available models.](images/copilot-chat/chat-model-picker.png)

You can also add models from other model providers (preview) and use them in chat. Get more details about how to [use models from other providers](/docs/copilot/language-models.md#bring-your-own-language-model-key).

> [!NOTE]
> The list of available models might vary based on your Copilot subscription and might change over time. See the GitHub Copilot documentation for more information about the [available language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode).

## Submit a chat prompt

Use natural language to make chat requests in VS Code. Depending on the chat mode, you can ask questions about your codebase, get code suggestions, or make code edits across multiple files in your project and invoke specialized tools.

A chat response might contain a combination of rich content such as Markdown text, code blocks, buttons, file trees, and more.

![Copilot Chat view in the Secondary Side Bar and Explorer view in the Primary Side Bar.](images/copilot-chat/copilot-chat-view.png)

To get more relevant responses or reference specific files or artifacts in your workspace, such as test failures or terminal output, [add context](#add-chat-context) to your chat prompt by #-mentioning relevant context items.

## Add chat context

VS Code tries to determine the intent and scope of your chat request based on your natural language prompt. To help get more relevant responses, provide additional context in your chat prompt, such as files, test results, terminal output, and more.

Use the **Add Context** button in the Chat view or type #-mentions to add context to your chat prompt. For example, `#codebase` to refer to the entire codebase, or `#<file | folder | symbol>` to refer to a specific file, folder, or symbol in your workspace. Type `#` in the chat input field to view the list of context items.

![Screenshot of the Chat view with the context menu open](images/copilot-chat/chat-add-context.png)

You can also directly reference an agent mode tool in your prompt by typing `#` followed by the tool name. You can do this in all chat modes (ask, edit, and agent mode). For example, use the `#fetch` tool to add the content of a web page as context to your chat prompt, or use `#githubRepo` to perform a code search in a GitHub repository.

Get more details about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

## Prompt examples

<details>
<summary>Ask about general technology topics</summary>

* `"What is a linked list?"`
* `"top 10 popular web frameworks"`

</details>

<details>
<summary>Understand the codebase</summary>

* `"Explain how authentication works in #codebase"`
* `"Where is the database connecting string configured? #codebase"`
* `"How do I build this #codebase?"`
* `"Where is #getUser used? #usages"`

</details>

<details>
<summary>Add new features to your app</summary>

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
<summary>Reference content from the web</summary>

* `"How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage"`
* `"Build an API endpoint to fetch address info, use the template from #githubRepo contoso/api-templates"`

</details>

For more prompt examples, see the [Copilot Chat Cookbook](https://docs.github.com/en/copilot/example-prompts-for-github-copilot-chat) in the GitHub documentation.

> [!TIP]
> Type `/help` in the chat input field to get help about Copilot and how to interact with chat.

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
