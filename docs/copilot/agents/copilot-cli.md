---
ContentId: 9f1a2b3c-4e5f-6d7c-8a9b-1c2d3e4f5a6b
DateApproved: 3/9/2026
MetaDescription: Learn how to use Copilot CLI within VS Code for autonomous coding tasks, terminal integration, and isolated development workflows in VS Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- background
- copilot cli
- autonomous
- worktree
- parallel
---

# Copilot CLI sessions in Visual Studio Code

Visual Studio Code supports running agent sessions in the background by using GitHub Copilot CLI. You can start, monitor, and manage your Copilot CLI sessions from the unified Chat view in VS Code, while the agents run autonomously on your local machine while you continue other work in the editor. Run multiple Copilot CLI sessions in parallel to tackle independent tasks simultaneously.

To start a Copilot CLI session, you can either [create a new session](#create-a-copilot-cli-session) or [hand off a local agent session](#hand-off-a-local-session-to-copilot-cli) to Copilot CLI, passing on existing context.

This article covers the key features of Copilot CLI agents, and how to start and manage background sessions from Copilot CLI.

![Screenshot of Copilot CLI session as a chat editor in VS Code.](../images/background-agents/copilot-cli-session.png)

> [!TIP]
> Third-party providers like OpenAI Codex also offer background capabilities. Learn more about [third-party agents](/docs/copilot/agents/third-party-agents.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## What are Copilot CLI sessions?

Copilot CLI sessions run independently in the background on your local machine and use the Copilot CLI agent harness. VS Code integrates with these agents by using the Copilot SDK to start, stop, and monitor progress of your background sessions. VS Code automatically installs and configures the Copilot CLI for you.

Copilot SDK sessions run outside of VS Code and continue to run in the background when you close your VS Code window. This behavior is unlike local agents that use the VS Code agent harness inside the editor and stop running when VS Code stops.

You can interact with Copilot CLI sessions from the unified Chat view. When a background session requires your input or needs permissions to perform an action, you can do so from within chat. The agent status indicator also provides hints when a session needs input.

Because Copilot CLI sessions run in the background, they are well-suited for tasks that have a well-defined scope, have all necessary context, and don't require frequent user interaction. Examples include implementing a feature from a plan, creating multiple variants of a proof of concept, or implementing clearly defined fixes or features.

Copilot CLI supports slash commands in chat, including [reusable prompts](/docs/copilot/customization/prompt-files.md), [agent skills](/docs/copilot/customization/agent-skills.md), [hooks](/docs/copilot/customization/hooks.md), and `/compact` to manage long conversations. Type `/` in the chat input of a Copilot CLI session to see available commands.

### Isolation modes

Copilot CLI supports two types of isolation modes to manage how changes from the agent are applied to your codebase: **Worktree** and **Workspace** isolation. You can choose the isolation mode when you create a new Copilot CLI session.

To isolate changes from the Copilot CLI agent and prevent interference with your active work, use **Worktree** isolation. In this mode, VS Code creates a [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) in a separate folder for the Copilot CLI session. All changes made by the agent are applied to the worktree, keeping them separate from your main workspace until you're ready to review and apply them.

If you want the changes from the Copilot CLI session to be applied directly to your current workspace, you can choose **Workspace** isolation. In this mode, the agent operates directly in your current workspace, and changes are applied in place.

> [!NOTE]
> To use Git worktrees and worktree isolation, your workspace needs to be a Git repository.

### Limitations of Copilot CLI sessions

* Copilot CLI sessions can't access all VS Code built-in tools. You can explicitly [add context](/docs/copilot/chat/copilot-chat-context.md) in the chat input.

* Don't have access to extension-provided tools and are limited to the models available via the CLI tool.

* Can currently only access local MCP servers that don't require authentication.

## Create a Copilot CLI session

To create a new Copilot CLI session in VS Code:

1. Create a new session using either of these options

    * Open the Chat view (`kb(workbench.action.chat.open)`) and select **Copilot CLI** from the Session Target dropdown

    * Select the **New Chat** icon at the top, and select **New Copilot CLI Session**

    * Run the **Chat: New Copilot CLI** command from the Command Palette (`kb(workbench.action.showCommands)`)

1. Choose between workspace or worktree [isolation mode](#isolation-modes)

    If you use worktree isolation, the agent automatically commits changes to the worktree at the end of each turn, so the session history stays aligned with the commit history.

    > [!TIP]
    > You can open the worktree of a session by right-clicking it in the session list and selecting **Open Worktree in New Window**. You can also view the worktree in the Source Control view repository explorer (`scm.repositories.explorer`).

1. Submit your prompt to start the agent. Optionally, add extra context or choose a specific language model and custom agent.

1. Track the session status in the Chat view.

> [!TIP]
> You can create multiple Copilot CLI sessions to work on different tasks in parallel.

## Hand off a local session to Copilot CLI

For complex tasks, it can be helpful to first interact with a local agent in VS Code to clarify requirements, and then hand off the task to Copilot CLI for autonomous execution in the background. This can be useful when using the [Plan agent](/docs/copilot/agents/planning.md) to create a plan and then hand off the implementation of that plan to Copilot CLI.

When you hand off a local agent conversation to a Copilot CLI session, the full conversation history and context is passed to the background session.

To hand off a local agent session to Copilot CLI:

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Interact with a local agent until you're ready to hand off the task

1. To hand off to Copilot CLI, you have the following options:

    * Open the **Session Target** dropdown and then select **Copilot CLI**

        ![Screenshot showing the Session Target dropdown in VS Code chat interface.](../images/background-agents/continue-in-cli.png)

    * If you're using the [Plan agent](/docs/copilot/agents/planning.md), select the **Start Implementation** dropdown and the select **Continue in Copilot CLI** to run the implementation in a Copilot CLI session

        ![Screenshot showing the "Start Implementation" button in VS Code chat interface.](../images/background-agents/plan-agent-start-implementation-cli.png)

The Copilot CLI session starts automatically, carrying over the full conversation history and context.

## Use Copilot CLI from the terminal

In addition to starting Copilot CLI sessions from the Chat view, you can use Copilot CLI directly from the VS Code terminal.

![Screenshot showing the Copilot CLI session inside VS Code.](../images/background-agents/copilot-cli-in-terminal.png)

### Open a Copilot CLI terminal

VS Code registers a **GitHub Copilot CLI** terminal profile that you can use to open a dedicated Copilot CLI terminal. You can open a Copilot CLI terminal in several ways:

* Select the dropdown next to the **+** button in the Terminal panel and select **GitHub Copilot CLI**

* Run the **Chat: New Copilot CLI Session** command from the Command Palette to open a Copilot CLI terminal in the panel, or run **Chat: New CLI Session to the Side** to open it in an editor tab beside your current editor

* Run the **Terminal: Create New Terminal (With Profile)** command from the Command Palette (`kb(workbench.action.showCommands)`) and select **GitHub Copilot CLI**

* Type `copilot` in any VS Code integrated terminal to start the Copilot CLI directly

The Copilot CLI terminal supports the following shells:

* **bash** and **zsh** on macOS and Linux
* **PowerShell** and **Command Prompt** on Windows

### Start and resume sessions from the terminal

When you start a new session from the Copilot CLI terminal, VS Code automatically detects the session and displays it in the Chat view sessions list. You can then track progress, send follow-up prompts, or review changes from either the terminal or the Chat view.

To resume an existing Copilot CLI session in the terminal, right-click the session in the sessions list and select **Resume in Terminal**.

VS Code automatically handles authentication for the Copilot CLI terminal, so you don't need to sign in separately.

## Multi-repository workspaces

If your workspace contains multiple Git repositories, VS Code displays a repository picker in the chat input when you start a Copilot CLI session. Use this picker to select which repository the worktree should be created in.

After the session starts, the repository picker becomes disabled for that session. The worktree appears under the selected repository in the **Worktrees** node in the Source Control Repositories view.

> [!TIP]
> To view all repositories in your workspace, enable the `setting(scm.repositories.explorer)` setting and open the Source Control view.

## Use custom agents with Copilot CLI (Experimental)

[Custom agents](/docs/copilot/customization/custom-agents.md) let you define custom personas and roles for agents in VS Code. For example, you might create a custom agent for performing code reviews. Custom agents can define specific instructions and behaviors.

When you create a Copilot CLI session, you can select a custom agent to handle the task. The custom agent operates according to the defined behavior.

To use custom agents with Copilot CLI:

1. Enable custom agents for Copilot CLI with the `setting(github.copilot.chat.cli.customAgents.enabled)` setting

1. Create a custom agent in your workspace with the **Chat: New Custom Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

1. Create a new Copilot CLI session and select the custom agent from the Agents dropdown

    ![Screenshot showing custom agent selection in VS Code chat interface.](../images/background-agents/custom-agent-selection-v2.png)

1. Enter a prompt and notice that the custom agent is used to handle the task

> [!NOTE]
> Currently, only custom agents defined in the workspace are available for Copilot CLI sessions. Learn more about [creating a custom agent](/docs/copilot/customization/custom-agents.md#create-a-custom-agent).

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and how to hand off tasks between agents
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create custom agent roles and personas
* [GitHub Copilot CLI documentation](https://cli.github.com/manual/gh_copilot)
