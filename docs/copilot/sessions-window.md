---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 3/25/2026
MetaDescription: Use the Sessions Window in VS Code for a prompt-first coding experience where sessions and chat are the primary interface.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Sessions Window

The Sessions Window is a dedicated Visual Studio Code interface where sessions and chat take center stage. You focus on describing tasks, monitoring progress, and managing your AI setup, while agents handle the implementation. Work on a single task at a time, or run multiple sessions in parallel across CLI and cloud agents to tackle several tasks at once. The Sessions Window gives you a central place to coordinate all of that activity.

It runs as a separate, lightweight instance that shares your sessions with the main VS Code window. You can move back and forth between the Sessions Window and VS Code without losing history or context.

<!-- TODO: screenshot of the Sessions Window after launch -->
![Screenshot of the Sessions Window after launch.](images/sessions-window/sessions-window.png)

## Code-first vs. prompt-first

There are two ways to work with AI in VS Code:

* **Code-first**: you write code in the editor and use AI as a coding assistant to help you implement features, fix bugs, and refactor code. Your primary interface is the editor for writing and editing code, running and debugging. You use AI to enhance your existing coding workflow.

* **Prompt-first**: you describe what you want in terms of requirements and hand off the task to an AI agent, which plans, implements, and verifies the result. Your primary interface is chat and the sessions list for managing your work, while the editor is a secondary interface for reviewing and tweaking the AI's implementation when necessary. You use AI to shift how you work and focus more on defining the problem and reviewing solutions.

The Sessions Window is built for the prompt-first approach. It launches VS Code with sessions and chat as the central interface instead of the File Explorer and editor tabs.

## Prerequisites

* Visual Studio Code Insiders installed. [Download VS Code Insiders](/insiders).
* Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md) to sign in and activate your subscription.

## Open the Sessions Window

You can open the Sessions Window from within VS Code or from the command line:

* Launch the **Sessions - Insiders** app from your Start menu or Applications folder.

* **From VS Code**: run **Chat: Open Sessions Window** from the Command Palette (`kb(workbench.action.showCommands)`).

* **From the command line**: run `code --sessions`.

The Sessions Window launches as a separate instance, independent from your main VS Code window. It picks up your existing agent sessions, so you can switch between the Sessions Window and VS Code at any time.

After first launch, sign in to GitHub if you haven't already. The Sessions Window requires GitHub authentication to access your Copilot subscription and sessions.

## Interface overview

The Sessions Window has three main areas:

1. **Sessions list**: in the sidebar, where you can view and manage all your sessions across workspaces.

1. **Customizations panel**: on the left, where you can start new sessions, monitor and manage existing sessions, and customize your AI setup.

1. **Chat area**: in the center, where you interact with your AI agent through chat during a session.

## Start an agent session

1. Select **New Session** at the top of the sidebar.

1. Use the workspace dropdown to select a local folder or GitHub repository for the session. This determines the context the agent has access to when working on your task.

    Based on whether you select a local folder or GitHub repository, the session uses either Copilot CLI or Copilot Cloud agent.

1. Optionally, select a custom agent and language model for the session. You can change these at any time during the session.

1. Type a prompt that describes what you want to accomplish, and press `kbstyle(Enter)`.

    The agent breaks your task into steps, writes code, runs commands, and self-corrects when something goes wrong. Continue the conversation to refine the results or change direction.

> [!TIP]
> Use the `+` button in the chat input to add extra context to the session, such as files, images, and more.

<!-- TODO: screenshot or video of a session in progress -->

## Monitor and resume sessions

You can run multiple sessions in parallel, within a specific repository or across different workspaces. The Sessions Window gives you a central place to monitor and manage all of them.

You can group sessions by project or by timeframe to keep track of related work. Each session card surfaces the most important information at a glance.

Use search to find sessions by name, or use the filter options to narrow by session type or status. Pin important sessions to keep them at the top of the list for quick access.

<!-- TODO: screenshot of the sessions list -->

For advanced session management, such as archiving, forking, checkpoints, and exporting, see [Manage chat sessions](/docs/copilot/chat/chat-sessions.md).

## Customize agents for your project and workflow

The Sessions Window sidebar includes a **Customizations** panel that gives you direct access to all AI customization options. Each item shows a count badge when configurations exist in your workspace.

| Customization | What it does |
|---|---|
| **Agents** | Define custom agent personas with specific tools and instructions. [Learn more](/docs/copilot/customization/custom-agents.md). |
| **Skills** | Add portable instruction folders that agents load when relevant. [Learn more](/docs/copilot/customization/agent-skills.md). |
| **Instructions** | Set guidelines that shape how the AI generates code. [Learn more](/docs/copilot/customization/custom-instructions.md). |
| **Prompts** | Create reusable prompt files for common tasks. [Learn more](/docs/copilot/customization/prompt-files.md). |
| **Hooks** | Run shell commands at lifecycle points during agent sessions. [Learn more](/docs/copilot/customization/hooks.md). |
| **MCP Servers** | Connect AI to external tools and services via the MCP standard. [Learn more](/docs/copilot/customization/mcp-servers.md). |
| **Plugins** | Install prepackaged bundles of customizations. [Learn more](/docs/copilot/customization/agent-plugins.md). |

Select any item to view its configurations. Create new items or edit existing ones with the built-in inline editor. Browse the marketplace to discover and install MCP servers and plugins. Enable or disable individual configurations without removing them.

<!-- TODO: screenshot of the Customizations panel -->

## Limitations

* Only supports sessions with Copilot CLI and Copilot Cloud agents. To use local or third-party CLI agents, manage your sessions from the main VS Code window.

* Only supports workspaces that are backed by a Git repository.

* By default, Copilot CLI sessions are started with Git worktree isolation. Enable the `setting(github.copilot.chat.cli.isolationOption.enabled)` setting to enable choosing between workspace and worktree isolation on session creation.

## Frequently asked questions


## Next steps

* [Manage chat sessions](/docs/copilot/chat/chat-sessions.md) - checkpoints, forking, archiving, and exporting sessions.
* [Using agents](/docs/copilot/agents/overview.md) - agent types, delegation, and autonomy levels.
* [Customize AI](/docs/copilot/customization/overview.md) - full customization reference.
* [Best practices](/docs/copilot/best-practices.md) - tips for effective prompting.
