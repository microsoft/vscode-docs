---
ContentId: e6b33fcb-8240-49dd-b6ca-5412d6fa669a
DateApproved: 11/12/2025
MetaDescription: Use Inline Chat in Visual Studio Code to make edits directly in the editor or get command suggestions in the terminal.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Inline chat

With inline chat in Visual Studio Code, you can ask for generating code or making edits directly in the editor or get help with shell commands within the integrated terminal. Inline chat allows you to stay in the flow of your work without having to switch to a separate Chat view.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [GitHub Copilot](/docs/copilot/setup.md)

## Use editor inline chat

When you use editor inline chat, your prompt is scoped to the code in the active editor. Inline chat might use the content from other files in your workspace as context for your prompt.

To use editor inline chat:

1. Open a file in the editor.

1. Open editor inline chat by using the `kb(inlinechat.start)` keyboard shortcut or by selecting **Open Inline Chat** from the Chat menu in the title bar.

1. Type your prompt in the chat input field and press `kbstyle(Enter)`.

    > [!TIP]
    > Select a block of code in the editor to scope the prompt to that code.

1. VS Code shows a diff with the code suggestion inline in the editor. Accept or reject the changes.

    ![Screenshot of editor inline chat asking to not use recursion for a factorial function.](images/copilot-chat/inline-chat-no-recursion.png)

1. Optionally, ask a follow-up question to get other suggestions or refine the results.

> [!TIP]
> Attach context to your inline chat prompt to include relevant files, code symbols, or other context. Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

## Use terminal inline chat

You can bring up terminal inline chat in the [integrated terminal](/docs/terminal/basics.md) to get help with shell commands or ask terminal-related questions.

To use terminal inline chat:

1. Open the terminal in VS Code by selecting the **View** > **Terminal** menu item or using the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut.

1. Start terminal inline chat by using the `kb(workbench.action.terminal.chat.start)` keyboard shortcut or running the **Terminal Inline Chat** command in the Command Palette.

1. Type your prompt in the chat input field and press `kbstyle(Enter)`.

    ![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

1. Review the response and select the **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal

    Alternatively, select **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal and modify it before running.

## Related resources

* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
