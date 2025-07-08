---
ContentId: 276ecd8f-2a76-467e-bf82-846d49c13ab5
DateApproved: 07/09/2025
MetaDescription: Learn how to use chat modes in VS Code to use chat for different tasks, such as asking questions, making code edits, and autonomous coding tasks. Define custom chat modes to chat for your usage scenario or project.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Chat modes in VS Code

Chat modes are predefined configurations that enable you to tailor the AI chat behavior in Visual Studio Code for specific tasks, such as asking questions, making code edits, or performing autonomous coding tasks. Switch between chat modes at any time in the Chat view, depending on the task you want to accomplish.

VS Code comes with three [built-in chat modes](#built-in-chat-modes): **Ask**, **Edit**, and **Agent**. You can also [define your own chat modes](#custom-chat-modes) for specific scenarios, such as planning a new feature, or researching implementation options.

## Prerequisites

* Install the latest version of [Visual Studio Code](/download)
* Access to [Copilot](/docs/copilot/setup.md). [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

## Switch between chat modes

To switch between chat modes, open the Chat view (`kb(workbench.action.chat.open)`), and then select the desired mode from the chat mode dropdown list.

![Screenshot showing the Chat view, highlighting the chat mode dropdown list.](images/chat-modes/chat-mode-dropdown.png)

## Built-in chat modes

Chat in VS Code can operate in different modes, each optimized for a specific use case. You can change between the different chat modes at any time in the Chat view.

| Chat mode | Description |
|-----------|-------------|
| [Ask mode](/docs/copilot/chat/chat-ask-mode.md) | Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts.<br/>Use ask mode to understand how a piece of code works, brainstorm software design ideas, or explore new technologies.<br/>Open ask mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask). |
| [Edit mode](/docs/copilot/chat/copilot-edits.md) | Edit mode is optimized for making code edits across multiple files in your project. VS Code directly applies the code changes in the editor, where you can review them in-place. <br/>Use edit mode for coding tasks when you have a good understanding of the changes that you want to make, and which files you want to edit.<br/>Open edit mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit). |
| [Agent mode](/docs/copilot/chat/chat-agent-mode.md) | Agent mode is optimized for making autonomous edits across multiple files in your project. <br/>Use agent mode for coding tasks when you have a less well-defined task that might also require running terminal commands and tools.<br/>Open agent mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent). |

## Custom chat modes

> [!NOTE]
> Custom chat modes are available as of VS Code release 1.101 and are currently in preview.

The built-in chat modes provide general-purpose configurations for chat in VS Code. For a more tailored chat experience, you can create your own chat modes.

Custom chat modes consist of a set of instructions and tools that are applied when you switch to that mode. For example, a "Plan" chat mode could include instructions for generating an implementation plan and only use read-only tools. By creating a custom chat mode, you can quickly switch to that specific configuration without having to manually select relevant tools and instructions each time.

Custom chat modes are defined in a `.chatmode.md` Markdown file, and can be stored in your workspace for others to use, or in your user profile, where you can reuse them across different workspaces.

You can reference instructions files and tools (sets) in your custom chat mode file.

### Chat mode file structure

A chat mode file is a Markdown file with the `.chatmode.md` suffix. It has the following two main sections:

* Front Matter metadata header

    * `description`: A brief description of the chat mode. This description is displayed as placeholder text in the chat input field and when you hover the mode in the chat mode dropdown list.
    * `tools`: A list of tool or tool set names that are available for this chat mode. This can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. Use the **Configure Tools** action to select the tools from the list of available tools in your workspace.
    * `model`: The AI model to use when running the prompt. If not specified, the currently selected model in model picker is used.

* Body with chat mode instructions

    This is where you provide specific prompts, guidelines, or any other relevant information that you want the AI to follow when in this chat mode. You can also reference instructions files by using Markdown links. The chat mode instructions will complement whatever is specified in the chat prompt.

### Chat mode file example

The following code snippet shows an example of a "Plan" chat mode file that generates an implementation plan and doesn't make any code edits.

```markdown
---
description: Generate an implementation plan for new features or refactoring existing code.
tools: ['codebase', 'fetch', 'findTestFiles', 'githubRepo', 'search', 'usages']
model: Claude Sonnet 4
---
# Planning mode instructions
You are in planning mode. Your task is to generate an implementation plan for a new feature or for refactoring existing code.
Don't make any code edits, just generate a plan.

The plan consists of a Markdown document that describes the implementation plan, including the following sections:

* Overview: A brief description of the feature or refactoring task.
* Requirements: A list of requirements for the feature or refactoring task.
* Implementation Steps: A detailed list of steps to implement the feature or refactoring task.
* Testing: A list of tests that need to be implemented to verify the feature or refactoring task.
```

### Create a chat mode

You can create a chat mode file in your workspace or user profile.

1. Run the **Chat: New Mode File** command in the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose between creating a new chat mode file in your workspace or user profile.

1. Enter a name for the chat mode. This name is used in the chat mode dropdown list in the Chat view.

1. Provide the details for the chat mode in the newly created `.chatmode.md` file.

    * Provide the description and configure the list of available tools or tool sets in the Front Matter metadata.
    * Add instructions for the chat mode in the body of the file.

By default, VS Code looks for workspace chat mode files in the `.github/chatmodes` folder. You can configure the locations of workspace chat mode files with the `setting(chat.modeFilesLocations)` setting.

### Manage existing chat modes

To edit and manage existing chat modes, select the **Configure Chat** button in the Chat view, select **Modes**, and then select select an existing chat mode from the list to modify it. Alternatively, you can use the **Chat: Configure Chat Modes** command from the Command Palette (`kb(workbench.action.showCommands)`).

![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

Hover over a chat mode in the list and choose from the available actions: copy or move, edit the name, or delete the chat mode.

## Related resources

* [Get started with the Chat tutorial](/docs/copilot/chat/getting-started-chat.md)
* [Get an overview of chat in VS Code](/docs/copilot/chat/copilot-chat.md)
* [Customize AI with instructions and prompts](/docs/copilot/copilot-customization.md)
* [Configure tools in chat](/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)
