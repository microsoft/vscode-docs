---
ContentId: 276ecd8f-2a76-467e-bf82-846d49c13ab5
DateApproved: 10/15/2025
MetaDescription: Learn how to create custom agents to tailor AI chat behavior in VS Code for your specific workflows and development scenarios.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Custom agents in VS Code

Custom agents enable you to configure the AI to adopt different personas tailored to specific development roles and tasks. For example, you might create agents for a security reviewer, planner, solution architect, or other specialized roles. Each persona can have its own behavior, available tools, and instructions.

You can also use handoffs to create guided workflows between agents, allowing you to transition seamlessly from one specialized agent to another with a single click. For example, you could move from planning agent directly into implementation agent, or hand off to a code reviewer with the relevant context.

This article describes how to create and manage custom agents in VS Code.

> [!NOTE]
> Custom agents are available as of VS Code release 1.101 and are currently in preview.

## What are custom agents?

The [built-in agents](/docs/copilot/chat/copilot-chat.md#switch-between-agents) provide general-purpose configurations for chat in VS Code. For a more tailored chat experience, you can create your own custom agents.

Custom agents consist of a set of instructions and tools that are applied when you switch to that agent. For example, a "Plan" agent could include instructions for generating an implementation plan and only use read-only tools. By creating a custom agent, you can quickly switch to that specific configuration without having to manually select relevant tools and instructions each time.

Custom agents are defined in a `.agent.md` Markdown file, and can be stored in your workspace for others to use, or in your user profile, where you can reuse them across different workspaces.

You can reference instructions files and tools (sets) in your custom agent file to reuse existing configurations.

## Why use custom agents?

Different tasks require different capabilities. A planning agent might only need read-only tools for research and analysis to prevent accidental code changes, while an implementation agent would need full editing capabilities. Custom agents let you specify exactly which tools are available for each task, ensuring the AI has the right capabilities for the job.

Custom agents also let you provide specialized instructions that define how the AI should operate. For instance, a planning agent could instruct the AI to collect project context and generate a detailed implementation plan, while a code review agent might focus on identifying security vulnerabilities and suggesting improvements. These specialized instructions ensure consistent, task-appropriate responses every time you switch to that agent.

## Handoffs

> [!NOTE]
> Handoffs are currently only available in [VS Code Insiders](https://code.visualstudio.com/insiders/).

Handoffs enable you to create guided sequential workflows that transition between agents with suggested next steps. After a chat response completes, handoff buttons appear that let users move to the next agent with relevant context and a pre-filled prompt.

Handoffs are useful for orchestrating multi-step workflows, that give developer's control for reviewing and approving each step before moving to the next one. For example:

* **Planning → Implementation**: Generate a plan in planning agent, then hand off to implementation agent to start coding.
* **Implementation → Review**: Complete implementation, then switch to a code review agent to check for quality and security issues.
* **Write Failing Tests → Write Passing Tests**: Generate failing tests that are easier to review than big implementations, then hand off to make those tests pass by implementing the required code changes.

To define handoffs in your agent file, add them to the frontmatter. Each handoff specifies the target agent, the button label, and an optional prompt to send:

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

When users see the handoff button and select it, they switch to the target agent with the prompt pre-filled. If `send: true`, the prompt automatically submits to start the next workflow step.

## Custom agent file structure

Custom agent files are Markdown files and use the `.agent.md` extension and have this structure:

### Header (optional)

The headers is formatted as YAML frontmatter with the following fields:

| Field | Description |
| --- | --- |
| `description` | A brief description of the custom agent, shown as placeholder text in the chat input field. |
| `tools`       | A list of tool or tool set names that are available for this custom agent. Can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. Learn more about [tools in chat](/docs/copilot/chat/chat-tools.md). |
| `model`       | The AI model to use when running the prompt. If not specified, the currently selected model in model picker is used. |
| `handoffs`    | An optional list of suggested next actions or prompts to transition between custom agents. Handoff buttons appear as interactive suggestions after a chat response completes. |
| `handoffs.label` | The display text shown on the handoff button. |
| `handoffs.agent` | The target agent identifier to switch to. |
| `handoffs.prompt` | The prompt text to send to the target agent. |
| `handoffs.send` | Optional boolean flag to auto-submit the prompt (default is `false`) |

### Body

The custom agent file body contains the custom agent implementation, formatted as Markdown. This is where you provide specific prompts, guidelines, or any other relevant information that you want the AI to follow when in this custom agent.

You can reference other files by using Markdown links, for example to reuse instructions files.

When you select the custom agent in the Chat view, the guidelines in the custom agent file body are prepended to the user chat prompt.

### Custom agent example

The following code snippet shows an example of a "Plan" custom agent file that generates an implementation plan and doesn't make any code edits. For more community-contributed examples, see the [Awesome Copilot repository](https://github.com/github/awesome-copilot/tree/main).

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
# Planning instructions
You are in planning mode. Your task is to generate an implementation plan for a new feature or for refactoring existing code.
Don't make any code edits, just generate a plan.

The plan consists of a Markdown document that describes the implementation plan, including the following sections:

* Overview: A brief description of the feature or refactoring task.
* Requirements: A list of requirements for the feature or refactoring task.
* Implementation Steps: A detailed list of steps to implement the feature or refactoring task.
* Testing: A list of tests that need to be implemented to verify the feature or refactoring task.
```

## Create a custom agent

You can create a custom agent file in your workspace or user profile.

1. Run the **Chat: New Custom Agent** command in the Command Palette (`kb(workbench.action.showCommands)`) and select **Create new custom agent**.

    Alternatively, select **Configure Chat** (gear icon) in the Chat view > **Custom Agents**, and then select **Create new custom agent**.

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

1. Choose the location where the custom agent file should be created.

    * **Workspace**: Workspace custom agent files are stored in the `.github/agents` folder of your workspace.

    * **User profile**: User custom agent files are stored in the [current profile folder](/docs/configure/profiles.md). You can sync your user custom agent files across multiple devices by using [Settings Sync](/docs/configure/settings-sync.md).

1. Enter a name for the custom agent. This name is used in the agent picker in the Chat view.

1. Provide the details for the custom agent in the newly created `.agent.md` file.

    * Provide the description and configure the list of available tools or tool sets in the Front Matter metadata.
    * Add instructions for the custom agent in the body of the file.

To edit and manage existing custom agents, in the Chat view, select **Configure Chat** (gear icon) > **Custom Agents**, and then select an existing custom agent from the list to modify it. Alternatively, you can use the **Chat: Configure Agents** command from the Command Palette (`kb(workbench.action.showCommands)`).

## Tool list priority

You can specify the list of available tools for both a custom agent and prompt file by using the `tools` metadata field. Prompt files can also reference a custom agent by using the `agent` metadata field.

The list available tools in chat is determined by the following priority order:

1. Tools specified in the prompt file (if any)
2. Tools from the referenced custom agent in the prompt file (if any)
3. Default tools for the selected agent (if any)

## Related resources

* [Customize AI with custom instructions](/docs/copilot/customization/custom-instructions.md)
* [Create reusable prompt files](/docs/copilot/customization/prompt-files.md)
* [Use tools in chat](/docs/copilot/chat/chat-tools.md)
