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

VS Code comes with three built-in chat modes: **Ask**, **Edit**, and **Agent**. Each mode is optimized for specific tasks and workflows.

### Ask mode

Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts. Use ask mode when you want to understand how something works, explore ideas, or get help with coding tasks. For larger changes across multiple files or more complex coding tasks, consider using [edit mode](#edit-mode) or [agent mode](#agent-mode).

In ask mode, responses can contain code blocks that you apply individually to your codebase. This works well for smaller edits within a single file. To apply a code block to your codebase, hover over the code block and select the **Apply in Editor** button.

Open ask mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask)

### Edit mode

Edit mode is optimized for making code edits across multiple files in your project. Edit mode is useful for coding tasks when you have a good understanding of the changes that you want to make and which files you want to edit.

VS Code directly applies the code changes in the editor, where you can review them. Use the editor overlay controls to navigate between edits with the `kbstyle(Up)` and `kbstyle(Down)` controls and either keep or undo changes.

Open edit mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit)

### Agent mode

Agent mode is optimized for complex coding tasks based on high-level requirements that might require running terminal commands and tools. The AI operates autonomously, determining the relevant context and files to edit, planning the work needed, and iterating to resolve issues as they arise.

VS Code directly applies code changes in the editor and the editor overlay controls enable you to navigate between the suggested edits and review them. Agent mode might invoke multiple [tools](/docs/copilot/chat/chat-tools.md) to accomplish different tasks.

You can [customize chat with extra tools](/docs/copilot/chat/chat-tools.md) by adding MCP servers or installing extensions that contribute tools.

Open agent mode: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent)

## Switch between chat modes

You can switch between chat modes at any time during a chat session.

1. Open the Chat view (`kb(workbench.action.chat.open)`).

1. Select the desired mode from the chat mode dropdown list.

    ![Screenshot showing the Chat view with the chat mode dropdown expanded, displaying different chat mode options.](../images/customization/chat-mode-dropdown.png)

## Choose the right chat mode

Consider these factors when choosing between chat modes:

| Factor | Ask mode | Edit mode | Agent mode |
|--------|----------|-----------|------------|
| **Task clarity** | Understanding code, exploring concepts | Well-defined changes with known files | High-level requirements, complex tasks |
| **Scope** | Single file or questions | Multiple specific files | Autonomous file discovery |
| **Change application** | Manual application of code blocks | Direct edits you review | Autonomous edits with iteration |
| **Tools and commands** | No | No | Yes |
| **Duration** | Fast | Moderate | Can take longer due to planning and iteration |
| **Request quota** | Low | Moderate | Can be higher for complex tasks |

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

## Related resources

* [Create custom chat modes](/docs/copilot/customization/custom-chat-modes.md)
* [Use tools in chat](/docs/copilot/chat/chat-tools.md)
* [Add context to your chat prompt](/docs/copilot/chat/copilot-chat-context.md)
* [Learn about security considerations of using AI in VS Code](/docs/copilot/security.md)
