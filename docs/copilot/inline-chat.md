
# Inline chat

To make edits directly in the editor, use Inline Chat to submit a prompt. Copilot provides code suggestions in-place with your code in the editor. If you have a block of code selected in the editor, Copilot scopes your question to that selection.

![Copilot Inline Chat asking to not use recursion for a factorial function.](images/copilot-chat/inline-chat-no-recursion.png)

To bring up Editor Inline Chat:

* In any file, use the `kb(inlinechat.start)` keyboard shortcut.
* Alternatively, open a file and then select **Editor Inline Chat** from the Copilot menu in the title bar.

After receiving a code suggestion, you can accept (`kb(inlineChat.acceptChanges)`) or discard (`kb(inlineChat.close)`) the changes. If you're not happy with the suggestion, enter a new prompt and Copilot provides a new suggestion.

You're not limited to asking for code changes. Use Inline Chat to ask more exploratory questions that emerge as you work with your codebase. For example, use prompts such as `Explain this piece of code`, or `How do I add functionality to do X?`.
> [!TIP]
> Attach context to your Inline Chat prompt to include relevant files, code symbols, or other context. Learn more about [adding context to your chat prompt](/docs/copilot/copilot-chat-context.md).

## Terminal Inline Chat

Similar to [Inline Chat in the editor](#inline-chat), you can bring up Copilot Inline Chat in the terminal to help you answer questions related to the terminal and shell commands.

The terminal Inline Chat uses the `@terminal` [chat participant](#chat-participants), which has context about the integrated terminal's shell and its contents. For example, you can ask questions such as "how to install npm packages", or "list the top 5 largest files in the src directory".

To start Inline Chat in the terminal, press the `kb(inlinechat.start)` keyboard shortcut while you're in the terminal.

![Screenshot showing that you can ask complex questions like "list the top 5 largest files in the src dir"](images/copilot-chat/terminal-chat-2.png)

Once a command is suggested, use **Run** (`kb(workbench.action.terminal.chat.runCommand)`) to run the command in the terminal, or **Insert** (`kb(workbench.action.terminal.chat.insertCommand)`) to insert the command into the terminal.

