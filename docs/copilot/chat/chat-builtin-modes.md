---
ContentId: 8a9f2e1c-3d4b-4f5e-9a8c-7b6d5e4f3c2d
DateApproved: 10/09/2025
MetaDescription: Discover Ask, Edit, and Agent chat modes in VS Code. Learn how to use each mode for asking questions, making code edits, or starting autonomous coding workflows.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Chat modes in VS Code

Chat modes are predefined configurations or personas to customize chat in Visual Studio Code for specific tasks, such as planning, asking questions, or performing autonomous coding tasks. VS Code comes with three built-in chat modes: ask, edit, and agent mode. For more specialized workflows, you can also create your own [custom chat modes](/docs/copilot/customization/custom-chat-modes.md).

This article describes the different built-in chat modes and how to choose the right chat mode for your task.

## Built-in chat modes

VS Code comes with three built-in chat modes: ask, edit, and agent mode. Each mode is optimized for specific tasks and workflows.

<details>
<summary>Ask mode</summary>

Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts. Use ask mode when you want to understand how something works, explore ideas, or get help with coding tasks. For larger changes across multiple files or more complex coding tasks, consider using edit mode or agent mode.

In ask mode, responses can contain code blocks that you apply individually to your codebase. This works well for smaller edits within a single file. To apply a code block to your codebase, hover over the code block and select the **Apply in Editor** button.

Open ask mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask)

### Get started with ask mode

1. Select the **Ask** mode from the chat mode dropdown list in the Chat view.

1. Type your question in the chat input field. For example, you might ask:

    * "How do I optimize this function for performance?"
    * "Provide 3 ways to implement a search feature in React."
    * "Where is the db connection configured in this project? #codebase"

1. Optionally, [add context to your prompt](/docs/copilot/chat/copilot-chat-context.md) to get more accurate responses.

1. Select the **Send** button or press `kb(workbench.action.chat.submit)` to submit your prompt.

</details>

<details>
<summary>Edit mode</summary>

Edit mode is optimized for making code edits across multiple files in your project. Edit mode is useful for coding tasks when you have a good understanding of the changes that you want to make and which files you want to edit.

VS Code directly applies the code changes in the editor, where you can review them. Use the editor overlay controls to navigate between edits with the `kbstyle(Up)` and `kbstyle(Down)` controls and either keep or undo changes.

Open edit mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit)

### Get started with edit mode

1. Select the **Edit** mode from the chat mode dropdown list in the Chat view.

1. Type your request in the chat input field. For example, you might ask:

    * "Refactor the authentication logic to use OAuth2."
    * "Add unit tests for the user service."

1. [Add context to your prompt](/docs/copilot/chat/copilot-chat-context.md) to guide the AI to make edits in the right files.

1. Select the **Send** button or press `kb(workbench.action.chat.submit)` to submit your prompt.

1. As the AI makes edits to your files, review and either keep or undo each change using the editor overlay controls.

</details>

<details>
<summary>Agent mode</summary>

Agent mode is optimized for complex coding tasks based on high-level requirements that might require running terminal commands and tools. The AI operates autonomously, determining the relevant context and files to edit, planning the work needed, and iterating to resolve issues as they arise.

VS Code directly applies code changes in the editor and the editor overlay controls enable you to navigate between the suggested edits and review them. Agent mode might invoke multiple [tools](/docs/copilot/chat/chat-tools.md) to accomplish different tasks.

You can [customize chat with extra tools](/docs/copilot/chat/chat-tools.md) by adding MCP servers or installing extensions that contribute tools.

Open agent mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent)

### Get started with agent mode

1. Select the **Agent** mode from the chat mode dropdown list in the Chat view.

1. Type your high-level request in the chat input field. For example, you might ask:

    * "Implement a user authentication system with OAuth2 and JWT."
    * "Set up a CI/CD pipeline for this project."

1. Give agent mode more capabilities by [enabling tools](/docs/copilot/chat/chat-tools.md). Select **Configure Tools** and select from the list of built-in tools, MCP tools, or extension-contributed tools.

1. Select the **Send** button or press `kb(workbench.action.chat.submit)` to submit your prompt.

1. As the AI works through your request, it might make code changes, invoke tools, or run terminal commands. Review and confirm these actions, or ask follow-up questions to refine the results.

</details>

## Switch between chat modes

You can switch between chat modes at any time during a chat session.

1. Open the Chat view (`kb(workbench.action.chat.open)`).

1. Select the desired mode from the chat mode dropdown list.

    ![Screenshot showing the Chat view with the chat mode dropdown expanded, displaying different chat mode options.](../images/customization/chat-mode-dropdown.png)

## Choose the right chat mode

Consider these factors when choosing between chat modes:

| Chat mode | Best for |
|-----------|----------|
| **Ask mode** | Understanding code, exploring concepts, smaller edits within a single file. |
| **Edit mode** | Making well-defined code edits across multiple specific files. Use edit mode for coding tasks when you have a good understanding of the changes that you want to make, and which files you want to edit. |
| **Agent mode** | Autonomously implementing complex tasks based on high-level requirements. Use agent mode for coding tasks when you have a less well-defined task that might also require running terminal commands and tools. |

### Agent mode vs. Copilot coding agent

VS Code offers two autonomous coding experiences:

| Feature | Agent mode | Copilot coding agent |
|---------|------------------|---------------------|
| **Where it runs** | Your VS Code editor | GitHub cloud |
| **Independence** | Involves user interaction and iteration | Fully autonomous |
| **Output** | Edits files directly | Creates pull requests |
| **Best for** | Interactive development, immediate feedback | Well-defined tasks, background work |

Learn more about the [Copilot coding agent](/docs/copilot/copilot-coding-agent.md).

## Custom chat modes

You can create your own custom chat modes for specialized workflows like planning features, conducting code reviews, or researching implementation options. Custom chat modes consist of a set of instructions and tools that are applied when you switch to that mode.

For example, a "Plan" chat mode could include instructions for generating an implementation plan and only use read-only tools. By creating a custom chat mode, you can quickly switch to that specific configuration without having to manually select relevant tools and instructions each time.

Learn more about [creating custom chat modes](/docs/copilot/customization/custom-chat-modes.md).

## Customize chat for your project

The AI uses [workspace context](/docs/copilot/reference/workspace-context.md) to provide relevant responses and make code edits that match your project's coding style. You can further customize chat for your project by:

* Creating [custom instructions](/docs/copilot/customization/custom-instructions.md) files with guidelines specific to your project. For example, you might create instructions for coding style, security practices, or project architecture.
* Creating [custom prompts](/docs/copilot/customization/prompt-files.md) for common development tasks in your project. For example, you might create prompts for setting up new components, performing a code review, or writing tests.
* Creating [custom chat modes](/docs/copilot/customization/custom-chat-modes.md) for different roles or tasks in your project. For example, you might create modes for a security reviewer, planner, solution architect, or other specialized roles.

## Related resources

* [Create custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
* [Use tools in chat](/docs/copilot/chat/chat-tools.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Security considerations of using AI in VS Code](/docs/copilot/security.md)
