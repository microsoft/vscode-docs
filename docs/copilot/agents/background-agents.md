---
ContentId: 9f1a2b3c-4e5f-6d7c-8a9b-1c2d3e4f5a6b
DateApproved: 02/04/2026
MetaDescription: Learn how to use background agents like Copilot CLI for autonomous coding tasks, terminal integration, and isolated development workflows in VS Code.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- background agent
- copilot cli
---

# Background agents in Visual Studio Code

> [!NOTE]
> The term "background agent" might also appear as "Copilot CLI" or "worktree" in the VS Code interface while an experiment is being run.

Background agents in Visual Studio Code are CLI-based agents, such as Copilot CLI, that run in the background on your local machine. They operate autonomously while you continue other work in the editor. Background agents use Git worktrees to work isolated from your main workspace and prevent conflicts with your active work.

This article covers the key features of background agents, and how to start and manage background sessions from Copilot CLI.

![Screenshot of background agent session as a chat editor in VS Code.](../images/background-agents/background-agent-session-jan.png)

> [!TIP]
> Third-party providers like OpenAI Codex also offer background agent capabilities. Learn more about [third-party agents](/docs/copilot/agents/third-party-agents.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## What are background agents?

Unlike local agents that operate in and have aware of VS Code's editor context, background agents run independently via command-line interfaces (CLIs) on your local machine. You can view and manage all your background agent sessions from the unified Chat view in VS Code. This view also lets you create new background agent sessions directly from VS Code or hand off local agent conversations to background agents.

Because background agents run in the background without user interaction, they are well-suited for tasks that have a well-defined scope and all necessary context. Examples include implementing a feature from a plan, creating multiple variants of a proof of concept, or implementing clearly defined fixes or features.

You can start a new background agent session directly in chat by choosing the background session type. Alternatively, you can hand off a local session to a background agent for continuation in the background.

To prevent interference with your active work in the editor, background agents use Git worktrees to run in an [isolated environment](#create-background-agent-session) where they make changes without affecting your main workspace. When you start a background agent session, VS Code automatically creates a separate folder for that session.

### Limitations of background agents

* Background agents can't directly access VS Code built-in tools and run-time context (like failed tests or text selections), unless you explicitly add that context to the prompt.
* Don't have access to extension-provided tools and are limited to the models available via the CLI tool.
* Can currently only access local MCP servers that don't require authentication.

### Copilot CLI

The **Copilot CLI** is the primary background agent in VS Code. You can use the Copilot CLI directly from the terminal or start and manage sessions from with VS Code.

VS Code automatically installs and configure the Copilot CLI for you. When you start a session directly in the CLI, that session also appears in the sessions list, where you can track its progress and interact with it further.

Learn more about [Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) in the GitHub documentation.

## View and manage background agent sessions

You can view and manage all your background agent sessions from the Chat view in VS Code. Filter the session list to show only background agent sessions by selecting the **Background Agents** from the filter options.

![Screenshot of background agent filter in VS Code Chat view.](../images/background-agents/background-agent-filter.png)

Select a background agent session from the list to open the session details in the Chat view. If you prefer to view the session in an editor tab (chat editor), right-click the session and select **Open as Editor**.

If you prefer to view a background session in the terminal instead of the chat conversation in VS Code, right-click the session in the Chat view and select **Resume Agent Session in Terminal**. You can interact with the Copilot CLI directly in VS Code.

![Screenshot showing the Copilot CLI session inside VS Code.](../images/background-agents/copilot-cli-in-terminal.png)

## Start a background agent session

Depending on your workflow, you can start background agent sessions in several ways. You can create a new session and provide the task details directly by using the CLI, or start a new session from the [Chat view](/docs/copilot/agents/overview.md#agent-sessions-list) in VS Code.

Another approach - especially for complex tasks - is to first interact with a local agent in chat in VS Code, and once the scope and details are clear, hand off the task to a background agent session. For example, you might use the [Plan agent](/docs/copilot/agents/planning.md) to outline a multi-step feature implementation, then delegate the actual coding to a background agent.

### Create a Copilot CLI background agent session

You can create a new Copilot CLI background agent session in VS Code in several ways:

* From the Chat view:

    1. Open the Chat view (`kb(workbench.action.chat.open)`)

    1. Select the **Delegate Session** dropdown > **Background**

* While you're in a local chat session:

    * Type `@cli <task description>` in the chat input and send the message

    * Enter a prompt, select the **Delegate Session** dropdown > **Background**

* Run the **Chat: New Background Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

A new background agent session opens where you can provide additional task details and track the progress of the Copilot CLI session.

You can attach images in the chat input to provide visual context for a background session.

> [!TIP]
> When you use the GitHub Copilot CLI in the terminal to start a session, the Chat view in VS Code automatically detects and displays this background session. You can further interact with this background session from within VS Code.

### Hand off an agent session to a background agent

For complex tasks, it can be helpful to first interact with a local agent in VS Code chat to clarify requirements, then hand off the task to a background agent for autonomous execution. When you hand off a local agent conversation to a background agent session, the full conversation history and context is passed to the background agent.

To continue a local agent session in a background agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Interact with a local agent until you're ready to hand off the task to a background agent

1. To hand off to a background agent, you have the following options:

    * Open the **Delegate Session** dropdown and then select **Background**

        ![Screenshot showing the "Delegate Sessions" dropdown in VS Code chat interface.](../images/background-agents/continue-in-chat-background-jan.png)

    * If you're using the [Plan agent](/docs/copilot/agents/planning.md), select the **Start Implementation** dropdown and the select **Continue in Background** to run the implementation in a background agent session

        ![Screenshot showing the "Start Implementation" button in VS Code chat interface.](../images/background-agents/plan-agent-start-implementation-background.png)

    * Type `@cli` in the chat input to hand off the task to a background agent

The background agent session starts automatically, carrying over the full conversation history and context. You can monitor the background agent's progress in the Chat view.

## Create background agent session

Background agent sessions automatically use [Git worktrees](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) to isolate changes from your main workspace. When you start a background agent session, VS Code creates a separate folder for the session. The background agent operates in this isolated folder, to prevent conflicts with your active work.

To start a background agent session with Git worktrees:

1. In the Chat view, select the **Delegate Session** dropdown and then select **Background** from the session type dropdown.

1. Enter a prompt to start the agent session. VS Code automatically creates a new Git worktree.

    All changes made by the background agent are applied to the worktree folder, isolating them from your main workspace.

    Background agents commit changes to the worktree at the end of each turn, so the session history stays aligned with the commit history.

    > [!TIP]
    > You can open the worktree for a background agent session by right-clicking it in the session list and selecting **Open Worktree in New Window**. You can also view the worktree in the Source Control view repository explorer (`scm.repositories.explorer`).
    >
    > ![Screenshot showing Git worktree in VS Code Source Control view.](../images/background-agents/git-worktree-source-control-v2.png)

1. Monitor the background agent's progress in the Chat view. The agent sessions list displays diff statistics that match the changes in the worktree.

1. After the background agent completes the task, review and apply the changes from the worktree to your main workspace.

    The working set at the bottom of the session shows the files changed during the background agent session and provides **Apply** and **View All Changes** actions.

    <!-- TODO: update screenshot to show the new Apply/View Changes UI (Keep/Undo buttons removed) -->
    ![Screenshot showing the working set with Apply and View Changes actions.](../images/background-agents/filechanges-v2.png)

1. When you apply changes, VS Code handles any conflicts with your working tree or staged files. If conflicts occur, a merge resolution experience helps you resolve them.

Learn more about [using Git worktrees in VS Code source control](/docs/sourcecontrol/branches-worktrees.md).

<!-- TODO: delete obsolete screenshot images/background-agents/isolated-run-mode.png (isolation mode picker removed) -->

## Multi-repository workspaces

When your workspace contains multiple Git repositories, VS Code displays a repository picker in the chat input when you start a background agent session. Use this picker to select which repository the worktree should be created in.

After the session starts, the repository picker becomes disabled for that session. The worktree appears under the selected repository in the **Worktrees** node in the Source Control Repositories view.

> [!TIP]
> To view all repositories in your workspace, enable the `setting(scm.repositories.explorer)` setting and open the Source Control view.

## Use custom agents with background agents (Experimental)

[Custom agents](/docs/copilot/customization/custom-agents.md) let you define custom personas and roles for agents in VS Code. For example, you might create a custom agent for performing code reviews. Custom agents can define specific instructions and behaviors.

When you create a background agent session, you can select a custom agent to handle the task. The background agent operates according to the custom agent's defined behavior.

To enable custom agents with background agents:

1. Enable custom agents for background agents with the `setting(github.copilot.chat.cli.customAgents.enabled)` setting

1. Create a custom agent in your workspace with the **Chat: New Custom Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

    > [!NOTE]
    > Currently, only custom agents defined in the workspace are available for background agent sessions. Learn more about [creating a custom agent](/docs/copilot/customization/custom-agents.md#create-a-custom-agent).

1. Create a new background agent session and select the custom agent from the Agents dropdown

    ![Screenshot showing custom agent selection in VS Code chat interface.](../images/background-agents/custom-agent-selection.png)

1. Enter a prompt and notice that the custom agent is used to handle the task

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and how to hand off tasks between agents
* [Third-party agents](/docs/copilot/agents/third-party-agents.md): Learn about OpenAI Codex and other third-party agent integrations
* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about cloud agents for tasks requiring GitHub integration
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create custom agent roles and personas
* [GitHub Copilot CLI documentation](https://cli.github.com/manual/gh_copilot)
