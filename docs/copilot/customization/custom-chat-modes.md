---
ContentId: 276ecd8f-2a76-467e-bf82-846d49c13ab5
DateApproved: 10/15/2025
MetaDescription: Learn how to create custom chat modes to tailor AI chat behavior in VS Code for your specific workflows and development scenarios.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Custom chat modes in VS Code

Custom chat modes enable you to configure the AI to adopt different personas tailored to specific development roles and tasks. For example, you might create modes for a security reviewer, planner, solution architect, or other specialized roles. Each persona can have its own behavior, available tools, and instructions.

You can also use handoffs to create guided workflows between chat modes, allowing you to transition seamlessly from one specialized mode to another with a single click. For example, you could move from planning mode directly into implementation mode, or hand off to a code reviewer with the relevant context.

This article describes how to create and manage custom chat modes in VS Code.

> [!NOTE]
> Custom chat modes are available as of VS Code release 1.101 and are currently in preview.

## What are custom chat modes?

The [built-in chat modes](/docs/copilot/chat/copilot-chat.md#switch-between-chat-modes) provide general-purpose configurations for chat in VS Code. For a more tailored chat experience, you can create your own chat modes.

Custom chat modes consist of a set of instructions and tools that are applied when you switch to that mode. For example, a "Plan" chat mode could include instructions for generating an implementation plan and only use read-only tools. By creating a custom chat mode, you can quickly switch to that specific configuration without having to manually select relevant tools and instructions each time.

Custom chat modes are defined in a `.chatmode.md` Markdown file, and can be stored in your workspace for others to use, or in your user profile, where you can reuse them across different workspaces.

You can reference instructions files and tools (sets) in your custom chat mode file to reuse existing configurations.

## Why use custom chat modes

Different tasks require different capabilities. A planning mode might only need read-only tools for research and analysis to prevent accidental code changes, while an implementation mode would need full editing capabilities. Custom chat modes let you specify exactly which tools are available for each task, ensuring the AI has the right capabilities for the job.

Custom chat modes also let you provide specialized instructions that define how the AI should operate. For instance, a planning mode could instruct the AI to collect project context and generate a detailed implementation plan, while a code review mode might focus on identifying security vulnerabilities and suggesting improvements. These specialized instructions ensure consistent, task-appropriate responses every time you switch to that mode.

## Handoffs

Handoffs enable you to create guided workflows that transition between chat modes with suggested next steps. After a chat response completes, handoff buttons appear that let users move to the next mode with relevant context and a pre-filled prompt.

Handoffs are useful for orchestrating multi-step development workflows. For example:

* **Planning → Implementation**: Generate a plan in planning mode, then hand off to implementation mode to start coding.
* **Implementation → Review**: Complete implementation, then switch to a code review mode to check for quality and security issues.
* **Research → Development**: Gather requirements and context, then hand off to a developer mode with the collected information.

To define handoffs in your chat mode file, add them to the file header. Each handoff specifies the target mode, the button label, and an optional prompt to send:

```markdown
---
description: Generate an implementation plan
tools: ['search', 'fetch']
handoffs:
  - label: Start Implementation
    agent: implementation
    prompt: Now implement the plan outlined above.
    send: false
---
```

When users see the handoff button and select it, they switch to the target mode with the prompt pre-filled. If `send: true`, the prompt automatically submits to start the next workflow step.

## Chat mode file structure

Chat mode files are Markdown files and use the `.chatmode.md` extension and have this structure:

### Header (optional)

The headers is formatted as YAML frontmatter with the following fields:

| Field | Description |
| --- | --- |
| `description` | A brief description of the chat mode, shown as placeholder text in the chat input field. |
| `tools`       | A list of tool or tool set names that are available for this chat mode. Can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. Learn more about [tools in chat](/docs/copilot/chat/chat-tools.md). |
| `model`       | The AI model to use when running the prompt. If not specified, the currently selected model in model picker is used. |
| `handoffs`    | An optional list of suggested next actions or prompts to transition between chat modes or agents. Handoff buttons appear as interactive suggestions after a chat response completes. |
| `handoffs.label` | The display text shown on the handoff button. |
| `handoffs.agent` | The target chat mode or agent identifier to switch to. |
| `handoffs.prompt` | The prompt text to send to the target agent or mode. |
| `handoffs.send` | Optional boolean flag to auto-submit the prompt (default is `false`) |

### Body

The chat mode file body contains the chat mode implementation, formatted as Markdown. This is where you provide specific prompts, guidelines, or any other relevant information that you want the AI to follow when in this chat mode.

You can reference other files by using Markdown links, for example to reuse instructions files.

When you select the chat mode in the Chat view, the guidelines in the chat mode file body are prepended to the user chat prompt.

### Chat mode example

The following code snippet shows an example of a "Plan" chat mode file that generates an implementation plan and doesn't make any code edits. For more community-contributed examples, see the [Awesome Copilot repository](https://github.com/github/awesome-copilot/tree/main).

```markdown
---
description: Generate an implementation plan for new features or refactoring existing code.
tools: ['fetch', 'githubRepo', 'search', 'usages']
model: Claude Sonnet 4
handoffs:
  - label: Implement Plan
    agent: agent
    prompt: Implement the plan outlined above.
    send: false
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

## Create a chat mode

You can create a chat mode file in your workspace or user profile.

1. In the Chat view, select **Configure Chat** > **Modes**, and then select **Create new custom chat mode file**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

    Alternatively, use the **Chat: New Mode File** command in the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the chat mode file should be created.

    * **Workspace**: By default, workspace chat mode files are stored in the `.github/chatmodes` folder of your workspace. Add more prompt folders for your workspace with the `setting(chat.modeFilesLocations)` setting.

    * **User profile**: User chat mode files are stored in the [current profile folder](/docs/configure/profiles.md). You can sync your user chat mode files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

1. Enter a name for the chat mode. This name is used in the chat mode dropdown list in the Chat view.

1. Provide the details for the chat mode in the newly created `.chatmode.md` file.

    * Provide the description and configure the list of available tools or tool sets in the Front Matter metadata.
    * Add instructions for the chat mode in the body of the file.

To edit and manage existing chat modes, in the Chat view, select **Configure Chat** > **Modes**, and then select select an existing chat mode from the list to modify it. Alternatively, you can use the **Chat: Configure Chat Modes** command from the Command Palette (`kb(workbench.action.showCommands)`).

## Tool list priority

You can specify the list of available tools for both a chat mode and prompt file by using the `tools` metadata field. Prompt files can also reference a chat mode by using the `mode` metadata field.

The list available tools in chat is determined by the following priority order:

1. Tools specified in the prompt file (if any)
2. Tools from the referenced chat mode in the prompt file (if any)
3. Default tools for the selected chat mode

## Related resources

* [Customize AI with custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
* [Use tools in chat](/docs/copilot/chat/chat-tools.md)
