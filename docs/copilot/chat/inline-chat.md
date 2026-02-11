---
ContentId: e6b33fcb-8240-49dd-b6ca-5412d6fa669a
DateApproved: 02/04/2026
MetaDescription: Use Inline Chat in Visual Studio Code to make edits directly in the editor or get command suggestions in the terminal.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Inline chat

With inline chat in Visual Studio Code, you can ask for generating code or making edits directly in the editor or get help with shell commands within the integrated terminal. Inline chat allows you to stay in the flow of your work without having to switch to a separate Chat view.

Use inline chat when you want to make quick, targeted edits within the visible code context. For multi-step tasks, multi-file changes, or broader codebase exploration, use the [Chat view](/docs/copilot/chat/copilot-chat.md) instead.

## Use editor inline chat

When you use editor inline chat, your prompt is scoped to the code in the active editor. Inline chat might use the content from other files in your workspace as context for your prompt.

To use editor inline chat:

1. Open a file in the editor.

1. Open editor inline chat by using the `kb(inlinechat.start)` keyboard shortcut or by selecting **Open Inline Chat** from the Chat menu in the title bar.

1. Type your prompt in the chat input field and press `kbstyle(Enter)`.

    > [!TIP]
    > Select a block of code in the editor to scope the prompt to that code.

1. VS Code shows a diff with the code suggestion inline in the editor. Accept or reject the changes.

    ![Screenshot showing editor inline chat suggesting a non-recursive factorial implementation.](images/copilot-chat/inline-chat-no-recursion.png)

1. Optionally, ask a follow-up question to get other suggestions or refine the results.

> [!TIP]
> Attach context to your inline chat prompt to include relevant files, code symbols, or other context. Learn more about [adding context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md).

### Show a visual hint on text selection (Experimental)

When you select text in the editor, VS Code can display a visual hint to help you start inline chat for the selected code. Use the `setting(inlineChat.affordance)` setting to control how this hint appears:

* `off`: no hint is shown when you select text
* `gutter`: the hint appears in the line number area next to your selection
* `editor`: the hint appears at the cursor position within your selection, integrated with the lightbulb for code actions

![Screenshot showing the inline chat hint in the gutter when text is selected in the editor.](images/copilot-chat/inline-chat-hint-gutter.png)

The hint displays an inline chat input box and actions for adding the selection to chat, explaining the code, and starting a code review of the selection.

> [!NOTE]
> This feature is experimental and works with the `setting(inlineChat.renderMode)` setting set to `hover`.

## Use terminal inline chat

You can bring up terminal inline chat in the [integrated terminal](/docs/terminal/basics.md) to get help with shell commands or ask terminal-related questions.

To use terminal inline chat:

1. Open the terminal in VS Code by selecting the **View** > **Terminal** menu item or using the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut.

1. Start terminal inline chat by using the `kb(workbench.action.terminal.chat.start)` keyboard shortcut or running the **Terminal Inline Chat** command in the Command Palette.

1. Type your prompt in the chat input field and press `kbstyle(Enter)`.

    ![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

1. Review the response and select the **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal

    Alternatively, select **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal and modify it before running.

## Change the model for inline chat

You can change the language model that is used for editor inline chat. By default, inline chat uses the same model as the Chat view, but you can configure a specific default model for inline chat.

To configure the default model for inline chat, use the `setting(inlineChat.defaultModel)` setting. The setting lists all available models from the model picker.

If you change the model during an inline chat session, the selection persists for the remainder of the session. After you reload VS Code, the model resets to the value specified in the `setting(inlineChat.defaultModel)` setting.

Learn more about [choosing the right model for your task](/docs/copilot/customization/language-models.md#choose-the-right-model-for-your-task).

## Use Quick Chat

Quick Chat provides a lightweight chat panel that opens at the top of the editor. Use it for quick questions and short interactions without opening the full Chat view or leaving your current workflow.

To open Quick Chat, press `kb(workbench.action.quickchat.toggle)` or select **Quick Chat** from the **Chat** menu in the title bar.

Type your prompt and press `kbstyle(Enter)` to get a response. Quick Chat supports the same `#`-mentions and `@`-mentions as the Chat view for adding context. Select the **Open in Chat View** button to continue the conversation in the full Chat view.

## Related resources

* [Chat overview](/docs/copilot/chat/copilot-chat.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Review AI-generated code edits](/docs/copilot/chat/review-code-edits.md)
* [AI language models in VS Code](/docs/copilot/customization/language-models.md)
