---
ContentId: a6b7c8d9-e0f1-2a3b-4c5d-6e7f8a9b0c1d
DateApproved: 10/28/2026
MetaDescription: Run hooks at specific points in an agent's workflow in {% data variables.product.prodname_vscode_shortname %} to automate tasks and validate changes.
MetaSocialImage: ../images/shared/agent-first-development-social.png
---

# Introduction to hooks

[![Watch Hooks: The Underestimated Feature on YouTube (opens in new tab).](images/5-hooks/youtube-ZsyiRa91XZg.jpg)](https://www.youtube.com/watch?v=ZsyiRa91XZg)

It seems like nobody talks enough about hooks.

But they might be one of the most powerful features in VS Code right now.

This guide breaks down what hooks are, how they work, and how to use them to automate your workflow.

## Prerequisites

Before you start: you'll need VS Code Insiders installed and the GitHub Copilot and GitHub Copilot Chat extensions set up and signed in.

- [Download VS Code](https://code.visualstudio.com/)
- [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/agent-native/overview#_step-1-set-up-copilot)

## What are hooks?

[Hooks](/docs/agent-customization/hooks.md) run custom shell commands at specific points in the agent's workflow, such as before or after a tool runs.

Instead of manually running tasks, hooks let you define actions that happen automatically in response to events. This makes them ideal for automation, validation, and enforcing consistency across your workflow.

At a high level, hooks are commonly used to:

- automate repetitive tasks
- enforce security or coding standards
- validate changes before or after execution
- integrate with external tools

## When hooks run

VS Code supports eight hook events that fire at specific points during an agent session:

| Hook Event         | When It Fires                                  | Common Use Cases                                                |
| ------------------ | ---------------------------------------------- | --------------------------------------------------------------- |
| `SessionStart`     | User submits the first prompt of a new session | Initialize resources, log session start, validate project state |
| `UserPromptSubmit` | User submits a prompt                          | Audit user requests, inject system context                      |
| `PreToolUse`       | Before agent invokes any tool                  | Block dangerous operations, require approval, modify tool input |
| `PostToolUse`      | After tool completes successfully              | Run formatters, log results, trigger follow-up actions          |
| `PreCompact`       | Before conversation context is compacted       | Export important context, save state before truncation          |
| `SubagentStart`    | Subagent is spawned                            | Track nested agent usage, initialize subagent resources         |
| `SubagentStop`     | Subagent completes                             | Aggregate results, cleanup subagent resources                   |
| `Stop`             | Agent session ends                             | Generate reports, cleanup resources, send notifications         |

Hooks respond to configured events in the agent's workflow, such as starting a session, submitting a prompt, or completing a tool call.

Choose the event that matches when you want the action to run.

## Example: auto-formatting with Prettier

One of the most practical examples of hooks is automatically formatting code.

In this case, a hook is configured to run Prettier after every file edit. Instead of manually formatting files, the system ensures that everything stays consistent automatically.

The key idea is simple: once the action is defined, it runs every time without needing to ask.

## Creating a hook

To create a hook, you can use the Agent Customizations view and generate one directly.

For example, you might create a hook that:

- runs Prettier automatically
- triggers after a tool completes (post tool use)
- executes via a shell script

Copilot can generate the hook for you based on your description, including the necessary configuration and commands.

## Example: hook in action

![Screenshot of a hook configuration that runs Prettier automatically after a tool completes](../images/customizations/ep-5-1-prettier-hook.png)

After creating the hook, you might need to reload your environment to activate it. Once it's active, it runs automatically when its configured event occurs.

![Screenshot of a README file before the Prettier hook formats it](../images/customizations/ep-5-2-before-hook.png)

When you make a change, like updating text in a README file, the hook is triggered in the background.

![Screenshot of the README file after the Prettier hook automatically formats it](../images/customizations/ep-5-3-after-hook.png)

The result is immediate: the file is updated and formatted without any additional input. The hook quietly handles the work for you.

## Why hooks matter

Hooks take automation to another level.

Unlike prompts, instructions, or even skills, hooks don’t require you to explicitly trigger them. They run automatically when the right conditions are met.

This changes how you work:

- tasks happen in the background
- consistency is enforced automatically
- workflows become seamless

Hooks represent a shift from:

**manual execution → event-driven automation**

Instead of asking the AI to do something, you define when it should happen and let the system take care of it.

## What’s next

Hooks help automate workflows without requiring input.

If you want to understand how hooks, agents, skills, and instructions all fit together, the next step is comparing them as a complete system.

## Learn more

- [Customize AI in Visual Studio Code](https://code.visualstudio.com/docs/agent-customization/overview)
- [Use hooks in VS Code](https://code.visualstudio.com/docs/agent-customization/hooks)
- [Use custom instructions in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions)
- [Use agent skills in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills)
- [Use custom agents in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents)
- [Use prompt files in VS Code](https://code.visualstudio.com/docs/agent-customization/prompt-files)
- [Community contributed customization features](https://github.com/github/awesome-copilot)
