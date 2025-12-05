---
ContentId: 9f1a2b3c-4e5f-6d7c-8a9b-1c2d3e4f5a6b
DateApproved: 11/26/2025
MetaDescription: Learn how to use background agents like Copilot CLI for autonomous coding tasks, terminal integration, and isolated development workflows in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---

# Background agents in Visual Studio Code

Background agents in Visual Studio Code are CLI-based and operate independently on complex tasks while you continue other work in the editor. They are ideal for time-intensive operations that don't require constant interaction or for experimental feature development. Background agents can use Git worktrees to isolate their changes from your main workspace and prevent conflicts.

This article covers the key features of background agents, and how to start and manage background sessions from Copilot CLI or OpenAI Codex.

## What are background agents?

Background agents are autonomous AI assistants that run in the terminal, unlike local agents that operate within VS Code's chat interface. When you close VS Code, background agents continue working on your tasks in the background.

Background agents run independently in the background and can apply changes to your codebase, which could conflict with your active work. To prevent this, background agents can use Git worktrees to create isolated development environments.

The Agents view in VS Code provides visibility into all your background agent sessions. You can view the list of sessions, their status, and detailed progress information. You can also provide follow-up instructions or cancel sessions directly from the view.

To assign a task to a background agent, you can create a new background session directly from the Agents view, use the agent's dedicated CLI, or continue a local chat conversation from VS Code as a background agent session.

### Copilot CLI

The **Copilot CLI** is the primary background agent in VS Code, providing a command-line interface for autonomous coding tasks.

To get started, make sure to install and set up Copilot CLI:

```bash
npm install -g @github/copilot
```

Learn more about [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) in the GitHub documentation.

### OpenAI Codex

The **OpenAI Codex** background agent uses OpenAI's Codex to perform coding tasks autonomously. To use the OpenAI Codex agent, make sure to install the [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) extension from the Visual Studio Marketplace.

OpenAI Codex in VS Code enables you to use your Copilot Pro+ subscription to authenticate and access Codex without additional setup. Get more information about [GitHub Copilot billing and premium requests](https://docs.github.com/en/copilot/concepts/billing/copilot-requests) in the GitHub documentation.

## Start a background agent session

Depending on your workflow, you can start background agent sessions in several ways. You can create a new session and provide the task details directly by using the CLI, or start a new session from the [Agents view](/docs/copilot/agents/overview.md) in VS Code.

Another approach - especially for complex tasks - is to first interact with a local agent in chat in VS Code, and once the scope and details are clear, continue the task in a background agent session. For example, you might use the [Plan agent](/docs/copilot/chat/chat-planning.md) to outline a multi-step feature implementation, then delegate the actual coding to a background agent.

### Create a Copilot CLI background agent session

You can create a new Copilot CLI background agent session in VS Code in several ways:

* From the [Agents view](/docs/copilot/agents/overview.md):

    1. Open the Chat view (`kb(workbench.action.chat.open)`)

    1. Select the **Agents** tab to switch to the Agents view

        In the Agents view, you can see all active agent sessions, including local chat agents, background agents, and cloud agents.

    1. Select the **New Session** dropdown > **New Background Session**

* From the [Chat view](/docs/copilot/chat/copilot-chat.md):

    * Open the Chat view (`kb(workbench.action.chat.open)`) and type `@cli <task description>` in the chat input and send the message

    * Open the Chat view (`kb(workbench.action.chat.open)`), enter your prompt, then select **Continue In** > **Background Agent**

* Run the **Chat: New Background Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

A chat editor opens where you can provide the task details and start the background session with Copilot CLI.

> [!TIP]
> When you use the GitHub Copilot CLI in the terminal to start a session, the Agents view in VS Code automatically detects and displays this background session. You can further interact with this background session from within VS Code.

### Create an OpenAI Codex background agent session

To create a new OpenAI Codex background agent session from the [Agents view](/docs/copilot/agents/overview.md):

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Select the **Agents** tab to switch to the Agents view

1. Select the **New Session** dropdown > **New Background Session**

    A chat editor opens where you can provide the task details and start the background session with Codex.

### Continue a local agent session with a background agent

For complex tasks, it can be helpful to first interact with a local agent in VS Code chat to clarify requirements, then hand off the task to a background agent for autonomous execution. When you continue a local agent conversation as a background session, the entire chat context is passed to the background agent.

To continue a local agent session in a background agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Interact with a local agent until you're ready to pass the task to a background agent

1. To continue in a background agent, you have the following options:

    * Select **Continue Chat In** and then select **Background**

        ![Screenshot showing the "Continue in Chat" button in VS Code chat interface.](../images/background-agents/continue-in-chat-background.png)

    * If you're using the [Plan agent](/docs/copilot/chat/chat-planning.md), select the **Start Implementation** dropdown and the select **Continue in Background** to run the implementation in a background agent session

        ![Screenshot showing the "Start Implementation" button in VS Code chat interface.](../images/background-agents/plan-agent-start-implementation-background.png)

    * Type `@cli /delegate` in the chat input and send the message

The background agent session starts automatically, carrying over the full chat history and context. You can monitor the background agent's progress in the Agents view.

## Use custom agents with background agents (Experimental)

[Custom agents](/docs/copilot/customization/custom-agents.md) let you define custom personas for agents in VS Code. For example, you might create a custom agent for performing code reviews. Custom agents can define specific instructions, behaviors, and which tools to use.

When you create a background agent session, you can select a custom agent to handle the task. The background agent operates according to the custom agent's defined behavior and has access to the tools specified by the custom agent.

To enable custom agents with background agents:

1. Enable custom agents for background agents with the `setting(github.copilot.chat.cli.customAgents.enabled)` setting

1. Create a custom agent in your workspace with the **Chat: New Custom Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

    Learn more about [creating a custom agent](/docs/copilot/customization/custom-agents.md#create-a-custom-agent) in VS Code.

1. Create a new background agent session

1. Select the custom agent from the Agents dropdown

    ![Screenshot showing custom agent selection in VS Code chat interface.](../images/background-agents/custom-agent-selection.png)

1. Enter a prompt and notice that the custom agent is used to handle the task

> [!NOTE]
> Background agents currently only support the `name`, `description`, and `tools` custom agent properties.

## Create an isolated background agent session (Experimental)

To isolate background agent changes from your main workspace, you can create a background agent session that uses a [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees). When you create a worktree, VS Code creates a separate folder for the session. The background agent operates in this isolated folder, to prevent conflicts with your active work.

To create a Copilot CLI background agent session with a worktree:

1. Enable isolated background agents with the `setting(github.copilot.chat.cli.isolation.enabled)` setting

1. Create a new Copilot CLI background agent session in VS Code.

1. In the chat editor, select **Worktree** for the isolation mode.

    ![Screenshot showing the "Worktree" isolation mode option in VS Code chat interface.](../images/background-agents/isolated-run-mode.png)

    To run a background agent on the current workspace without isolation, select **Workspace**.

1. Enter your prompt to create a new Git worktree and start the background agent session

1. In Source Control view, in the **Repositories** view, you can view the Git worktree

    ![Screenshot showing Git worktree in VS Code Source Control view.](../images/background-agents/git-worktree-source-control.png)

    The Agents view also shows the worktree path for the background agent session.

1. Monitor the background agent's progress in the Agents view

1. After the background agent completes the task, you can review and merge the changes from the worktree back into your main workspace.

    > [!TIP]
    > Before merging the changes, you can directly apply them from the worktree to your main branch by using the **Apply Changes** button in the chat editor.

Learn more about [using Git worktrees in VS Code source control](/docs/sourcecontrol/branches-worktrees.md).

## View background agent session details

To view the conversation history of a background agent session, select the session in the Agents view. The chat editor opens, displaying the full conversation history and any code changes made by the agent. To open the agent session in a new VS Code window, right-click the session and select **Open in New Window**.

![Screenshot showing background agent session details in VS Code chat editor.](../images/background-agents/background-agent-session-details.png)

In the chat editor, you can provide additional instructions to the background agent or review the changes it made.

If you prefer to view the Copilot CLI session instead of the chat conversation in VS Code, right-click the session in the Agents view and select **Resume Agent Session in Terminal**. You can interact with the Copilot CLI directly in VS Code.

![Screenshot showing the Copilot CLI session inside VS Code.](../images/background-agents/copilot-cli-in-terminal.png)

## Next steps

* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about cloud agents for tasks requiring GitHub integration
* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and delegation
* [Terminal basics](/docs/terminal/basics.md): Master VS Code terminal features
* [Source control](/docs/sourcecontrol/overview.md): Advanced Git workflows with agents

## Related resources

* [GitHub Copilot CLI documentation](https://cli.github.com/manual/gh_copilot)
* [VS Code Terminal](/docs/terminal/basics.md)
* [Git Worktrees](https://git-scm.com/docs/git-worktree)
* [Workspace Configuration](/docs/configure/settings.md)
