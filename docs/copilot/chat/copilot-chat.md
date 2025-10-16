---
ContentId: 130ecf6c-6f06-4ddd-8b1d-f85f023af77b
DateApproved: 10/09/2025
MetaDescription: Interact with GitHub Copilot through AI-powered chat conversations in VS Code to generate code, increase your code understanding, and even configure your editor.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use chat in VS Code

Use chat in Visual Studio Code to ask about your codebase or make edits across your project by using natural language. Chat can operate in different modes, optimized for your use case, from asking questions to making multi-file edits or starting an autonomous coding workflow.

## Why use chat in VS Code?

Chat enables you to have an ongoing chat conversation with the AI. You can ask follow-up questions and iterate on your requests. Some examples of what you can do with chat in VS Code:

* Scaffold a new app - "Create a new React app with TypeScript and Tailwind CSS"
* Add features - "Add a login page and style it based on #styles.css"
* Understand your code - "Explain how this authentication middleware works"
* Debug issues - "Why am I getting a null reference in this loop?"
* Optimize performance - "Help me improve the efficiency of this database query"
* Generate tests - "Create unit tests for the `calculateTotal` function"

## Prerequisites

* VS Code installed on your machine. Download it from the [Visual Studio Code website](https://code.visualstudio.com/).

* Access to GitHub Copilot. Follow these steps to [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md).

    > [!TIP]
    > If you don't have a Copilot subscription, you can sign up to use Copilot for free directly from within VS Code and get a monthly limit of completions and chat interactions.

## Access chat in VS Code

You can use natural language chat in different ways in VS Code, each optimized for a specific use case and task.

| Experience| Use case | User experience |
|-----------|----------|-----------------|
| **Chat view**<br/>`kb(workbench.action.chat.open)` | Have an ongoing, multi-turn chat conversation in a dedicated view on the side. Switch between different [chat modes](#choose-a-chat-mode) to ask questions, make code edits across files, or start an autonomous coding workflow. | ![Screenshot of the Chat view](images/copilot-chat/chat-view.png) |
| **Inline chat**<br/>`kb(inlineChat.start)` | Start a chat conversation directly from the editor (_editor inline chat_) or integrated terminal (_terminal inline chat_) to get suggestions in-place. | ![Screenshot of the Inline chat](images/copilot-chat/inline-chat.png) |
| **Quick Chat**<br/>`kb(workbench.action.quickchat.toggle)` | Ask a quick question and get back into what you were doing. | ![Screenshot of the Quick Chat](images/copilot-chat/quick-chat.png) |

Access each chat experience by using the corresponding keyboard shortcuts or via the Chat menu in the VS Code title bar.

![Screenshot of the Copilot Chat menu in the VS Code Command Center](images/copilot-chat/copilot-chat-menu-command-center.png)

## Choose a chat mode

Chat modes are predefined configurations or personas to customize chat in VS Code for specific tasks, such as planning, asking questions, or performing autonomous coding tasks.

To switch between chat modes, open the Chat view (`kb(workbench.action.chat.open)`), and then select the desired mode from the chat mode dropdown list.

![Screenshot showing the Chat view, highlighting the chat mode dropdown list.](../images/customization/chat-mode-dropdown.png)

VS Code comes with three built-in chat modes: **Ask**, **Edit**, and **Agent**. You can define your own chat modes for specific scenarios, such as planning a new feature, or researching implementation options. Learn more about [chat modes in VS Code](/docs/copilot/chat/chat-builtin-modes.md).

## Change the language model

VS Code offers different built-in language models to choose from. Some models are optimized for fast coding tasks, while others are better suited for slower planning and reasoning tasks. Use the model picker in the chat input field to change the model that Copilot uses for generating a response.

![Screenshot of the chat model picker in the Chat view, showing a dropdown list of available models.](images/copilot-chat/chat-model-picker.png)

You can also add models from other model providers and use them in chat. Get more details about how to [use models from other providers](/docs/copilot/customization/language-models.md#bring-your-own-language-model-key).

> [!NOTE]
> The list of available models might vary based on your Copilot subscription and might change over time. See the GitHub Copilot documentation for more information about the [available language models](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat?tool=vscode).

## Submit a chat prompt

Type a natural language prompt in the chat input field to make chat requests in VS Code. Depending on the chat mode you selected, your prompt will be handled accordingly. For example, in ask mode, the response

A chat response might contain a combination of rich content such as Markdown text, code blocks, buttons, file trees, and more.

![Screenshot of the Chat view in the Secondary Side Bar showing the response to 'explain recursion'.](images/copilot-chat/copilot-chat-view.png)

To get more relevant responses or reference specific files or artifacts in your workspace, such as test failures or terminal output, [add context](#add-chat-context) to your chat prompt by #-mentioning relevant context items.

> [!TIP]
> Enable rendering of mathematical equations in chat responses with the `setting(chat.math.enabled)` setting (preview).

## Add chat context

VS Code tries to determine the intent and scope of the chat request based on your natural language prompt. To help get more relevant responses, provide additional context in your chat prompt, such as files, test results, terminal output, and more.

Use the **Add Context** button in the Chat view or type #-mentions to add context to your chat prompt. For example, type `#codebase` to perform a full codebase search, or `#<file | folder | symbol>` to refer to a specific file, folder, or symbol in your workspace. Type `#` in the chat input field to view the list of context items.

![Screenshot of the Chat view with the context menu open.](images/copilot-chat/chat-add-context.png)

You can also directly reference tools in your prompt by typing `#` followed by the tool name. Tools extend chat with specialized functionality like fetching web content, searching GitHub repositories, or running commands. For example:

* `summarize #fetch code.visualstudio.com/updates`: retrieve the contents of a web page
* `what is terminal suggest #githubRepo microsoft/code`: perform a code search in a GitHub repository

Learn more about [using tools in chat](/docs/copilot/chat/chat-tools.md) and [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

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

## Vision

Chat supports vision capabilities, which means you can attach an image as context to your chat prompt and ask questions about it. For example, attach a screenshot of a block of code and ask to explain it, or attach a sketch of a UI and ask agent mode to implement it.

> [!TIP]
> You can drag and drop an image from a web browser onto the Chat view to add it as context.

## Chat history

As you iterate and send multiple chat prompts in a chat session, VS Code uses the history of chat prompts and responses as context for your current chat prompt. This means that you can ask follow-up questions or clarify your previous question without having to repeat the context. For example, you can ask "How does _this_ differ from ...", "Now add a test case", "explain in more detail", and more.

At any time, you can create a new chat session by using the **New Chat** (`+`) button (`kb(workbench.action.chat.newChat)`) in the Chat view. This can be useful if you want to move to a different topic and avoid the previous context and history.

To view the history of chat sessions, select the **Show Chats...** button in the Chat view or by using the **Chat: Show Chats...** command in the Command Palette. Select a history entry to open that chat session in the Chat view and continue the conversation.

![Screenshot of the Chat view with the Show Chats... button highlighted](images/copilot-chat/copilot-chat-view-show-chats.png)

You can export all prompts and responses for a chat session in a JSON file with the **Chat: Export Chat...** command in the Command Palette. To copy a specific chat prompt or response to the clipboard in Markdown format, right-click the message and select **Copy**. To copy the entire chat session, right-click the Chat view and select **Copy All**.

Learn more about [managing chat sessions](/docs/copilot/chat/chat-sessions.md).

## Edit and revert chat requests

You can edit previous chat requests to refine your prompts and use checkpoints to restore your workspace to earlier states. This is particularly useful when iterating on requests or when you need to undo changes made by chat interactions.

Learn more about [editing and reverting chat requests](/docs/copilot/chat/chat-checkpoints.md).

## Open chat in an editor tab or separate window

You can open a chat session as a separate editor tab, or even as a separate, floating window. This functionality enables you to have multiple chat sessions open at the same time.

In the Chat view, select the `...` icon in the top-right corner, and then select **Open Chat in Editor** or **Open Chat in New Window**. The following screenshot shows the Chat view running in a floating window:

![Screenshot of the Chat view, highlighting the three-dot menu that contains the Open in Editor and Open in New Window options. The desktop shows a floating window with a chat session.](images/copilot-chat/chat-open-in-new-window.png)

By default, the chat session opens in compact mode, which hides the title bar and other UI elements. Select the compact mode icon in the floating window title bar to toggle between compact and normal mode.

Optionally, enable the **Always on Top** mode to always keep the Chat view on top of other windows.

Learn more about [managing chat sessions](/docs/copilot/chat/chat-sessions.md) and [floating windows](/docs/configure/custom-layout.md#floating-windows) in VS Code.

## Use voice interactions

With the voice control capabilities in VS Code, provided by the [VS Code Speech](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) extension, you can initiate a chat conversation by using your voice:

* Use your voice to dictate your chat prompt
* Use the "Hey Code" voice command to start a voice session with Copilot Chat
* Accelerate voice input for chat by using the "hold to speak" mode

Learn more about how to [use voice interactions in VS Code](/docs/configure/accessibility/voice.md).

## Chat Debug view

The [Chat Debug view](/docs/copilot/chat/chat-debug-view.md) is a dedicated view where you can inspect the details of AI requests and responses, including system prompts, user prompts, context, and tool invocations. This is useful for understanding how chat processes your requests and for debugging unexpected behavior.

Learn more about [using the Chat Debug view](/docs/copilot/chat/chat-debug-view.md).

## Start chat from the command line

You can start a chat session directly from the command line by using the `chat` subcommand in the VS Code CLI. This enables you to open a chat session in your current working directory with a prompt you provide.

For example, the following command opens chat for the current directory and asks "Find and fix all untyped variables":

```bash
code chat Find and fix all untyped variables
```

The `chat` subcommand has the following command-line options:

* `-m`, `--mode <mode>`: The chat mode to use for the chat session. Available options: `ask`, `edit`, `agent`, or the identifier of a custom mode. Defaults to `agent`.
* `-a`, `--add-file <path>`: Add files as context to the chat session.
* `--maximize`: Maximize the chat session view.
* `-r`, `--reuse-window`: Use the last active window for the chat session.
* `-n`, `--new-window`: Open an empty window for the chat session.

The `chat` subcommand also supports piping input from `stdin` by passing `-` at the end of the command. For example:

```bash
python app.py | code chat why does it fail -
```

## Privacy and transparency

To enable more workspace search features for private repositories, we require additional permissions. If we detect that we don't have these permissions already, we will ask for them at startup. Once granted, we'll securely store the session for the future.

![Modal window asking for additional authentication for a private repository.](images/copilot-chat/authentication.png)

Learn more about security, privacy, and transparency in the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/).

## Frequently asked questions

### How do I prevent the Chat view from opening automatically?

By default, the Chat view opens in the Secondary Side Bar. When you close the Chat view for a workspace, VS Code remembers this setting and does not open the Chat view automatically the next time you open that workspace.

You can change the default visibility directly from the Chat view:

1. Open the Chat view (`kb(workbench.action.chat.open)`).
1. Select the `...` icon in the top-right corner of the Chat view.
1. Select **Show View by Default** to enable or disable the automatic opening of the Chat view.

You can also control the default visibility of the Secondary Side Bar with the `setting(workbench.secondarySideBar.defaultVisibility)` setting. Set it to `hidden` to prevent the Chat view from opening automatically.

### How do I choose between the different chat modes?

The different chat modes are optimized for different use cases:

* Use _editor inline chat_ to ask questions or make edits directly in the active editor. This is useful for making code changes or asking questions that are scoped to the active file.

* Use _ask mode_ to ask questions about your codebase or technology concepts. The response might include code suggestions, which you can apply manually and individually to your codebase. Changes are not automatically applied to your codebase.

* Use _edit mode_ to directly apply edits across multiple files in your codebase based on your chat prompt. You provide the relevant context and files for your prompt.

* Use _agent mode_ to start an autonomous coding workflow, whereby the AI autonomously determines the relevant context and files, determines which tasks need to be performed to complete the request. It then iterates independently to achieve the desired outcome, fixing issues as they come up. Agent mode can automatically invoke [tools](/docs/copilot/chat/chat-tools.md) to perform specialized tasks, such as running terminal commands, validating test cases, or accessing APIs.

## Additional resources

You can read more about [GitHub Copilot](https://github.com/features/copilot) and how to use it in VS Code in the [GitHub Copilot documentation](https://docs.github.com/copilot/getting-started-with-github-copilot?tool=vscode).

Or check out the [VS Code Copilot Series](https://www.youtube.com/playlist?list=PLj6YeMhvp2S5_hvBl2SE-7YCHYlLQ0bPt) on YouTube, where you can find more introductory content and programming-specific videos for using Copilot with [Python](https://www.youtube.com/watch?v=DSHfHT5qnGc), [C#](https://www.youtube.com/watch?v=VsUQlSyQn1E), [Java](https://www.youtube.com/watch?v=zhCB95cE0HY), [PowerShell](https://www.youtube.com/watch?v=EwtRzAFiXEM), [C++](https://www.youtube.com/watch?v=ZfT2CXY5-Dc), and more.

## Next steps

* [Use ask mode to ask questions about your code](/docs/copilot/chat/chat-ask-mode.md)
* [Use agent mode to start an autonomous coding session](/docs/copilot/chat/chat-agent-mode.md)
* [Use edit mode to make code edits across multiple files](/docs/copilot/chat/copilot-edits.md)
* [Learn about security considerations of using AI in VS Code](/docs/copilot/security.md)
