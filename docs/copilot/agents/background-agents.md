---
ContentId: 9f1a2b3c-4e5f-6d7c-8a9b-1c2d3e4f5a6b
DateApproved: 11/12/2025
MetaDescription: Learn how to use background agents like Copilot CLI for autonomous coding tasks, terminal integration, and isolated development workflows in VS Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Background agents in Visual Studio Code

Background agents in Visual Studio Code are CLI-based agents, such as Copilot CLI, that run in the background on your local machine. They operate autonomously while you continue other work in the editor. Background agents can use Git worktrees to work isolated from your main workspace and prevent conflicts with your active work.

This article covers the key features of background agents, and how to start and manage background sessions from Copilot CLI or OpenAI Codex.

![Screenshot of background agent session as a chat editor in VS Code.](../images/background-agents/background-agent-session.png)

## What are background agents?

Unlike local agents that operate in and have aware of VS Code's editor context, background agents run independently via command-line interfaces (CLIs) on your local machine. You can view and manage all your background agent sessions from the unified Chat view in VS Code. This view also lets you create new background agent sessions directly from VS Code or hand off local agent conversations to background agents.

Because background agents run in the background without user interaction, they are well-suited for tasks that have a well-defined scope and all necessary context. Examples include implementing a feature from a plan, creating multiple variants of a proof of concept, or implementing clearly defined fixes or features.

Background agents run independently in the background and can apply changes to your codebase. To prevent interference with your active work in the editor, background agents can use Git worktrees to run in an [isolated environment](#create-an-isolated-background-agent-session-experimental) where they can make changes without affecting your main workspace. When you start a background agent session with worktree isolation, VS Code automatically creates a separate folder for that session. You can choose to run a background agent in your main workspace, however this might lead to conflicts.

Because background agents run via CLI, they can't directly access VS Code built-in tools and run-time context (like failed tests or text selections). They also don't have access to MCP servers or extension-provided tools. They are limited to the models available via the CLI tool.

To assign a task to a background agent, you can create a new background session directly from the Chat view, use the agent's dedicated CLI, or hand off a local chat conversation from VS Code as a background agent session.

### Copilot CLI

The **Copilot CLI** is the primary background agent in VS Code. You can use the Copilot CLI directly from the terminal or start and manage sessions from with VS Code.

To get started, make sure to install and set up Copilot CLI:

```bash
npm install -g @github/copilot
```

Learn more about [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) in the GitHub documentation.

### OpenAI Codex

The **OpenAI Codex** background agent uses OpenAI's Codex to perform coding tasks autonomously. To use the OpenAI Codex agent, make sure to install the [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) extension from the Visual Studio Marketplace.

OpenAI Codex in VS Code enables you to use your Copilot Pro+ subscription to authenticate and access Codex without additional setup. Get more information about [GitHub Copilot billing and premium requests](https://docs.github.com/en/copilot/concepts/billing/copilot-requests) in the GitHub documentation.

## View and manage background agent sessions

You can view and manage all your background agent sessions from the Chat view in VS Code. Filter the session list to show only background agent sessions by selecting the **Background Agents** from the filter options.

![Screenshot of background agent filter in VS Code Chat view.](../images/background-agents/background-agent-filter.png)

Select a background agent session from the list to open the session details in the Chat view. If you prefer to view the session in an editor tab (chat editor), right-click the session and select **Open as Editor**.

If you prefer to view a background session in the terminal instead of the chat conversation in VS Code, right-click the session in the Chat view and select **Resume Agent Session in Terminal**. You can interact with the Copilot CLI directly in VS Code.

![Screenshot showing the Copilot CLI session inside VS Code.](../images/background-agents/copilot-cli-in-terminal.png)

## Start a background agent session

Depending on your workflow, you can start background agent sessions in several ways. You can create a new session and provide the task details directly by using the CLI, or start a new session from the [Chat view](/docs/copilot/agents/overview.md#manage-agent-sessions) in VS Code.

Another approach - especially for complex tasks - is to first interact with a local agent in chat in VS Code, and once the scope and details are clear, hand off the task to a background agent session. For example, you might use the [Plan agent](/docs/copilot/chat/chat-planning.md) to outline a multi-step feature implementation, then delegate the actual coding to a background agent.

### Create a Copilot CLI background agent session

You can create a new Copilot CLI background agent session in VS Code in several ways:

* From the Chat view:

    1. Open the Chat view (`kb(workbench.action.chat.open)`)

    1. Select the **New Chat** dropdown > **New Background Agent**

* While you're in a local chat session:

    * Type `@cli <task description>` in the chat input and send the message

    * Enter a prompt and then select **Continue In** > **Background Agent**

* Run the **Chat: New Background Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

A new background agent session opens where you can provide additional task details and track the progress of the Copilot CLI session.

> [!TIP]
> When you use the GitHub Copilot CLI in the terminal to start a session, the Chat view in VS Code automatically detects and displays this background session. You can further interact with this background session from within VS Code.

### Create an OpenAI Codex background agent session

To create a new OpenAI Codex background agent session from the Chat view:

* From the Chat view:

    1. Open the Chat view (`kb(workbench.action.chat.open)`)

    1. Select the **New Chat** dropdown > **New Codex Agent**

* Run the **Codex: New Codex Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

A new Codex background agent session opens where you can provide additional task details and track the progress of the Codex session.

### Hand off a local agent session to a background agent

For complex tasks, it can be helpful to first interact with a local agent in VS Code chat to clarify requirements, then hand off the task to a background agent for autonomous execution. When you hand off a local agent conversation to a background agent session, the full conversation history and context is passed to the background agent.

To continue a local agent session in a background agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Interact with a local agent until you're ready to hand off the task to a background agent

1. To hand off to a background agent, you have the following options:

    * Select **Continue In** and then select **Background Agent**

        ![Screenshot showing the "Continue in Chat" button in VS Code chat interface.](../images/background-agents/continue-in-chat-background.png)

    * If you're using the [Plan agent](/docs/copilot/chat/chat-planning.md), select the **Start Implementation** dropdown and the select **Continue in Background** to run the implementation in a background agent session

        ![Screenshot showing the "Start Implementation" button in VS Code chat interface.](../images/background-agents/plan-agent-start-implementation-background.png)

    * Type `@cli` in the chat input to hand off the task to a background agent

The background agent session starts automatically, carrying over the full conversation history and context. You can monitor the background agent's progress in the Chat view.

## Create an isolated background agent session (Experimental)

To isolate background agent changes from your main workspace, you can create a background agent session that uses a [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees). When you create a worktree, VS Code creates a separate folder for the session. The background agent operates in this isolated folder, to prevent conflicts with your active work.

To use Git worktrees in a background agent session:

1. Start a new Copilot CLI background agent session in VS Code.

1. In the chat input box, select **Worktree** for the isolation mode.

    ![Screenshot showing the "Worktree" isolation mode option in VS Code chat interface.](../images/background-agents/isolated-run-mode.png)

    When you select **Workspace**, the background agent applies changes directly to your main workspace.

1. Enter a prompt to start the agent session. VS Code automatically creates a new Git worktree.

    All changes made by the background agent are applied to the worktree folder, isolating them from your main workspace.

1. In Source Control view, in the **Repositories** view, you can view the Git worktree

    ![Screenshot showing Git worktree in VS Code Source Control view.](../images/background-agents/git-worktree-source-control.png)

    The Agents view also shows the worktree path for the background agent session.

1. Monitor the background agent's progress in the Agents view

1. After the background agent completes the task, you can review and merge the changes from the worktree back into your main workspace.

    > [!TIP]
    > Before merging the changes, you can directly apply them from the worktree to your main branch by using the **Apply Changes** button in the chat editor.

Learn more about [using Git worktrees in VS Code source control](/docs/sourcecontrol/branches-worktrees.md).

## Use custom agents with background agents (Experimental)

[Custom agents](/docs/copilot/customization/custom-agents.md) let you define custom personas and roles for agents in VS Code. For example, you might create a custom agent for performing code reviews. Custom agents can define specific instructions and behaviors.

When you create a background agent session, you can select a custom agent to handle the task. The background agent operates according to the custom agent's defined behavior.

To enable custom agents with background agents:

1. Enable custom agents for background agents with the `setting(github.copilot.chat.cli.customAgents.enabled)` setting

1. Create a custom agent in your workspace with the **Chat: New Custom Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

    > [!NOTE]
    > Currently, only custom agents defined in the workspace are available for background agent sessions. Only the `name`, `description`, and `tools` custom agent properties are supported. Learn more about [creating a custom agent](/docs/copilot/customization/custom-agents.md#create-a-custom-agent).

1. Create a new background agent session and select the custom agent from the Agents dropdown

    ![Screenshot showing custom agent selection in VS Code chat interface.](../images/background-agents/custom-agent-selection.png)

1. Enter a prompt and notice that the custom agent is used to handle the task

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and how to hand off tasks between agents
* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about cloud agents for tasks requiring GitHub integration
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create custom agent roles and personas
* [GitHub Copilot CLI documentation](https://cli.github.com/manual/gh_copilot)
