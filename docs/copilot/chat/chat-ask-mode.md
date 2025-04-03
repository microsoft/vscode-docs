---
ContentId: 9c7d2fe3-ed18-4370-9d59-dfd34a039091
DateApproved: 04/03/2025
MetaDescription: Use ask mode for chat in VS Code to ask questions about your codebase, coding, and general technology concepts by using natural language.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use ask mode in VS Code

Chat in Visual Studio Code lets you use natural language to interact with large language models (LLMs) to get help with your code. _Ask mode_ for chat  is optimized for asking questions about your codebase, coding, and general technology concepts by using natural language. Ask mode is particularly useful for getting a better understanding of your codebase, brainstorming ideas, and getting help with coding tasks.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Use ask mode

1. Open the Chat view by selecting **Open Chat** from the Copilot menu in the VS Code title bar, or use the `kb(workbench.action.chat.open)` keyboard shortcut.

1. Select **Ask** from the chat mode dropdown in the Chat view.

    ![Screenshot showing the Copilot Chat view, highlighting the Ask button.](images/copilot-chat/chat-mode-dropdown.png)

1. Type your question in the chat input field and select **Send** (`kb(workbench.action.edits.submit)`) to submit it.

    Experiment with some of these example questions to get started:

    * `What is the factory design pattern?`
    * `How do I use the fetch API in JavaScript?`
    * `How do I create a new React component?`

    You can ask questions specific to your codebase by [adding context to your prompt](#add-chat-context) by adding workspace files, or using `#codebase` to reference the entire codebase.

1. Notice that, based on your question, the response might include different types of rich content, such code blocks, terminal commands, links, or references to your code.

    Learn how you can [apply code blocks](#apply-a-code-block-from-chat) to your codebase, or run terminal commands directly in the integrated terminal.

## Add chat context

You can add context to your chat prompt to get more relevant responses, or to ask questions that are specific to your codebase. For example, instead of asking how to implement authentication in a web app, you can ask `how to implement authentication in this #codebase`.

Select the **Add Context** button in the chat input field to add context to your prompt, or type `#` to reference a [chat variable](#special-keywords).

![Screenshot of the Copilot Chat view with the context menu open](images/copilot-chat/chat-add-context.png)

You can also drag and drop files onto the Chat view to add them as context. Get more details about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

> [!TIP]
> Let Copilot find the right files automatically by adding `#codebase` in your prompt. Make sure to enable the `setting(github.copilot.chat.codesearch.enabled)` _(preview)_ setting to get the best results.

## Apply a code block from chat

When your chat response contains code blocks, you can apply them individually to the corresponding file in your workspace. Copilot performs a smart apply and inserts the changes in the right location within the file.

To apply a code block to your codebase, hover over the code block and select the **Apply in Editor** button. Copilot tries to apply the proposed changes to your existing code.

![Screenshot of a Copilot Chat code block response, highlighting the actions to apply changes.](images/copilot-chat/copilot-chat-view-code-block-actions.png)

Alternatively, you can also copy the code or insert it at the current cursor position. Hover over the code block and select the corresponding action.

Depending on the language extension, code blocks in chat responses might support IntelliSense, similar to the experience in the editor.

If a code block contains a shell command, you can run it directly in the integrated terminal with the **Insert into Terminal** (`kb(workbench.action.chat.runInTerminal)`) action.

![Copilot Chat code block to list files with Insert into Terminal option visible](images/copilot-chat/run-in-terminal.png)

> [!TIP]
> Navigate between code blocks with the **Chat: Next Code Block** (`kb(workbench.action.chat.nextCodeBlock)`) and **Chat Previous Code Block** (`kb(workbench.action.chat.previousCodeBlock)`) commands.

## Quick chat

To ask a quick question without starting a full chat session, you can open Quick Chat. Select **Quick Chat** from the Copilot menu in the title bar, or use the `kb(workbench.action.openQuickChat)` keyboard shortcut.

You can ask a question in Quick Chat, and if you want to keep the conversation going, promote it to a full chat session with the **Open in Chat View** button.

![Screenshot showing the Quick Chat view, containing the answer to the question "what is recursion".](images/copilot-chat/quick-chat-dropdown.png)

## Special keywords

In your prompt, you can use special keywords to get more relevant responses:

* _Chat participants_ can enhance your chat experience by providing domain-specific knowledge, for example how to interact with a database or a specific API. Type `@` in the chat input field to view and select from the list of available participants. There are several built-in chat participants like `@workspace`, `@vscode`, `@terminal`, and `@github`. Extensions can also contribute chat participants. Go to the [Marketplace](https://marketplace.visualstudio.com/search?term=tag%3Achat-participant&target=VSCode&category=All%20categories&sortBy=Relevance) or use the integrated Extensions view (`kb(workbench.view.extensions)`) and search by tag `chat-participant` (`tag:chat-participant`).

* _Slash commands_ provide a shortcut to commonly used instructions, such as `/fix` to propose a fix for a problem, or `/explain` to explain how the selected code works. Type `/` in the chat input field to view a list of available slash commands.

* _Chat variables_ let you reference specific context in your prompt text. For example, use `#file` to reference a workspace file, or `#codebase` to let Copilot find the relevant files to add as context. Type `#` in the chat input field to view a list of available variables.

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Start a multi-file coding session](/docs/copilot/chat/copilot-edits.md)
* [Start an agentic coding workflow](/docs/copilot/chat/chat-agent-mode.md)
