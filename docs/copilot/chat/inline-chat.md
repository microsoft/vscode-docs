---
ContentId: e6b33fcb-8240-49dd-b6ca-5412d6fa669a
DateApproved: 03/05/2025
MetaDescription: Use Inline Chat in Visual Studio Code to make edits directly in the editor or get command suggestions in the terminal.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Inline chat

With Copilot inline chat in Visual Studio Code, you can ask questions and get suggestions directly in the editor or get help with shell commands within the integrated terminal. Inline chat allows you to stay in the flow of your work without having to switch to a separate Chat view.

## Use editor inline chat

When you use editor inline chat, your prompt is scoped to the code in the active editor. Inline chat might use the content from other files in your workspace as context for your prompt.

To use editor inline chat:

1. Open a file in the editor.

1. Open editor inline chat by using the `kb(inlinechat.start)` keyboard shortcut or selecting **Editor Inline Chat** from the Copilot menu in the title bar.

    Notice how Copilot shows a chat input field at your cursor position in the editor.

1. Enter your prompt in the chat input field.

    Select a block of code in the editor to scope the prompt to that code.

    Experiment with some of these example prompts to get started:

    * `Refactor this code to use async/await`
    * `Explain this code`
    * `Add error handling`

1. Notice that Copilot shows code suggestions inline in the editor. Accept or reject the changes.

    ![Copilot Inline Chat asking to not use recursion for a factorial function.](images/copilot-chat/inline-chat-no-recursion.png)

1. Optionally, ask a follow-up question to get other or suggestions or refine the results.

> [!TIP]
> Attach context to your Inline Chat prompt to include relevant files, code symbols, or other context. Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

## Use terminal inline chat

You can bring up terminal inline chat in the [integrated terminal](/docs/terminal/basics.md) to get help with shell commands or ask terminal-related questions.

To use terminal inline chat:

1. Open the terminal in VS Code by selecting the **View** > **Terminal** menu item or using the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut.

1. Open terminal inline chat by using the `kb(workbench.action.terminal.chat.start)` keyboard shortcut or running the **Terminal Inline Chat** command in the Command Palette.

    Copilot shows a chat input field at the current position in the terminal.

1. Enter your prompt in the chat input field.

    Experiment with some of these example prompts to get started:

    * `How do I install npm packages?`
    * `List the top 5 largest files in the src directory`
    * `undo the last git commit`

    ![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

1. Review the response and select the **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal

    Optionally, select **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal and modify it before running.

## Related resources

* [Get a quick overview of the Copilot features in VS Code](/docs/copilot/reference/copilot-vscode-features.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Start a multi-file coding session](/docs/copilot/chat/copilot-edits.md)
* [Start an agentic coding workflow](/docs/copilot/chat/chat-agent-mode.md)
