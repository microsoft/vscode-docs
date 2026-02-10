---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 02/04/2026
MetaDescription: Learn about different types of AI agents in VS Code, including local chat, background agents, and cloud agents for coding tasks.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- background agent
- cloud agent
- copilot coding agent
- copilot cli
---

# Using agents in Visual Studio Code

Agents automate complete coding tasks that go beyond simple code suggestions and chat interactions. In Visual Studio Code, you can create agent sessions that run locally or in the cloud, interactively or in the background. Hand off tasks between different agent types to use their unique strengths. The unified Chat view gives you a central place to manage and monitor all your agent sessions, regardless of where they run.

This article provides an overview of the various agent types, how to create and manage agent sessions, delegate tasks between agents, and track their progress.

![Screenshot of an agent session in VS Code showing code changes and chat interaction.](../images/agents-overview/chat-sessions-view-v3.png)

> [!IMPORTANT]
> Make sure agents are enabled in your VS Code settings (`setting(chat.agent.enabled)`). Your organization might also disable agents - contact your admin to enable this functionality.

## What are agents?

Agents perform complete coding tasks end-to-end. They understand your project, make changes across multiple files, run commands, and adapt based on the results.

For example, imagine you have a failing test. Instead of suggesting a fix, an agent can:

* Read the error message and identify the root cause across multiple files
* Update the relevant code
* Run the tests again to verify the fix works
* Commit the changes

You give an agent a high-level task, and it breaks the task down into steps, executes those steps with tools, and self-corrects when it hits errors.

You can run multiple agent sessions in parallel, each focused on a different task. When you create a new agent session, the previous session remains active, and you can switch between tasks via the [agent sessions list](#agent-sessions-list).

### Key concepts

The following concepts describe different aspects of working with agents in VS Code:

| Concept | Description | Example |
|---|---|---|
| **[Agent type](#types-of-agents)** | *Where* and *how* an agent runs: [local](/docs/copilot/agents/local-agents.md), [background](/docs/copilot/agents/background-agents.md), [cloud](/docs/copilot/agents/cloud-agents.md), or [third-party](/docs/copilot/agents/third-party-agents.md). | Start a cloud agent for tasks that require team collaboration. |
| **[Built-in agent](/docs/copilot/agents/local-agents.md#builtin-agents)** | A preconfigured agent in VS Code: **Agent**, **Plan**, and **Ask**. These agents are ready to use without any setup. | Select the Plan agent to create a structured plan for building a new feature. |
| **[Custom agent](/docs/copilot/customization/custom-agents.md)** | A reusable *configuration* (defined in an `.agent.md` file) that gives an agent a specific role, tools, and instructions. Custom agents work with any agent type. | Create a "Security Reviewer" custom agent with read-only tools that focuses on identifying vulnerabilities. |
| **[Subagent](/docs/copilot/agents/subagents.md)** | A child agent spawned within a session to handle a subtask in its own isolated context window. | An agent researching a topic spawns a subagent to gather information, then receives only the summary back. |
| **[Hand off](#hand-off-a-session-to-another-agent)** | Transferring a session from one agent type to another, carrying over the conversation history. | Start planning with a local agent, then hand off to a cloud agent to implement the plan as a pull request. |

## Types of agents

VS Code supports four main categories of agents, each designed for different use cases and levels of interaction:

![Diagram showing agent types by environment and interaction.](../images/agents-overview/agent-types-diagram-v3.png)

<!-- Diagram source: agent-types.excalidraw (credits: AnnaS) -->

### Which agent should I use?

Use the following table to find the right agent type for your task:

| I want to... | Use |
|---|---|
| Brainstorm, explore, or iterate on an idea interactively | [Local agent](/docs/copilot/agents/local-agents.md) |
| Get answers about my codebase | [Local agent](/docs/copilot/agents/local-agents.md) (Ask) |
| Create a structured implementation plan | [Local agent](/docs/copilot/agents/local-agents.md) (Plan) |
| Fix an issue that needs editor context (test failures, linting errors, debug output) | [Local agent](/docs/copilot/agents/local-agents.md) |
| Use specific VS Code extension tools or MCP servers | [Local agent](/docs/copilot/agents/local-agents.md) |
| Implement a well-defined task while I keep working | [Background agent](/docs/copilot/agents/background-agents.md) or [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Explore multiple variants or proof of concepts | [Background agent](/docs/copilot/agents/background-agents.md) or [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Create a PR for team review and collaboration | [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Assign a GitHub issue to an agent | [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Use a specific AI provider (Anthropic, OpenAI) | [Third-party agent](/docs/copilot/agents/third-party-agents.md) |

### Local agents

Local agents run directly within VS Code on your machine. You interact with local agents through chat to get immediate results to your prompts. Local agents have full access to your workspace, tools, and models. Use local agents for interactive tasks that require immediate feedback, such as brainstorming, planning, or exploratory work.

Local agent sessions use one of three built-in agents: **Agent** for complex coding tasks, **Plan** for creating structured implementation plans, and **Ask** for answering questions about your codebase. You can also [create custom agents](/docs/copilot/customization/custom-agents.md) for specialized workflows.

Learn more about [local agents in VS Code](/docs/copilot/agents/local-agents.md).

### Background agents

Background agents, like Copilot CLI, are CLI-based agents that run non-interactively in the background on your local machine. They use Git worktrees to work isolated from your main workspace, preventing conflicts with your active work. Use background agents for well-defined tasks that have all necessary context, such as implementing a plan.

Learn more about [background agents in VS Code](/docs/copilot/agents/background-agents.md).

### Cloud agents

Cloud agents, like Copilot coding agent, run on remote infrastructure and integrate with GitHub repositories and pull requests for team collaboration and code reviews. Use cloud agents for well-defined tasks where you want to collaborate with team members through pull requests, or for tasks that can run without immediate feedback.

Learn more about [cloud agents in VS Code](/docs/copilot/agents/cloud-agents.md).

### Third-party agents

VS Code supports agents from third-party AI providers, like Anthropic and OpenAI. By using third-party agents, you can use the unique capabilities of these providers with your existing GitHub Copilot subscription, while benefiting from VS Code's unified session management and rich editor experience. Depending on the provider, third-party agents can run locally or in the cloud.

Learn more about [third-party agents in VS Code](/docs/copilot/agents/third-party-agents.md).

## Agent sessions list

The Chat view provides a unified view to manage all your agent sessions, regardless of where they run. By default, it shows your recent sessions, and gives information about their status, type, and file changes. Expand the list to see and filter all your agent sessions.

The list of sessions is scoped to your workspace. If you don't have a workspace open, the list shows all sessions across your workspaces. The sessions are grouped by time periods, such as **Today** or **Last Week**.

The Chat view operates in two modes: compact and side-by-side. You can manually switch between compact and side-by-side mode by using the toggle control in the top-right corner of the Chat view.

* **Compact**:

    In compact view, the list of sessions is embedded in the Chat view. When you select a session from the list, the Chat view switches to that session. Use the back button to return to the sessions list.

    ![Screenshot of the Chat view in compact mode showing recent agent sessions.](../images/agents-overview/chat-view-compact2.png)

* **Side-by-side**

    In side-by-side view, the list of sessions is shown side-by-side with the Chat view. Select a session from the list to view its details in the Chat view.

    ![Screenshot of the Chat view in expanded mode showing full agent session history.](../images/agents-overview/chat-view-expanded.png)

    > [!TIP]
    > When you make the Chat view wider, it automatically switches to side-by-side mode. Right-click on the sessions list and select **Sessions Orientation** to change this behavior (`setting(chat.viewSessions.orientation)`). You can also use the toggle button.

Right-click a session in the list to see additional actions, such as different options to open the session details, archive the session, or agent-type specific actions like checking out a pull request (for cloud agent sessions).

To hide the session list from the Chat view, right-click in an empty chat and unselect **Show Sessions** (`setting(chat.viewSessions.enabled)`).

> [!NOTE]
> Extension developers can learn how to integrate with the Agents view by using the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

### Agent status indicator (Experimental)

The agent status indicator provides quick access to your agent sessions directly from the command center in the title bar. The indicator displays visual badges for unread messages and in-progress sessions, so you can stay informed about your AI agent activity without switching views.

![Screenshot showing the Agent Status Indicator in the command center with unread and in-progress badges.](../images/agents-overview/agent-status-indicator.png)

The indicator shows:

* **Unread sessions badge**: Shows the count of chat sessions with new messages. Select the badge to filter the sessions list to show only unread sessions.
* **In-progress sessions badge**: Shows the count of sessions with running agents. Select the badge to filter the sessions list to show only in-progress sessions.
* **Sparkle icon**: Provides quick access to chat and session management options.

You can configure the indicator's behavior by using the `setting(chat.agentsControl.clickBehavior)` setting to toggle chat visibility, cycle through chat states (show, maximize, hide), or focus the chat input.

When a filter is active, the sessions list automatically expands to show all matching sessions. Select the badge again to clear the filter and return to the default view.

> [!NOTE]
> The agent status indicator is an experimental feature. Enable it by using `setting(chat.agentsControl.enabled)`. The unread and in-progress indicators require `setting(chat.viewSessions.enabled)` to be enabled.

## Create an agent session

You can create a new agent session in VS Code in different ways:

* Create a new, empty agent session of a specific type.

* Hand off an existing session to another agent type via delegation.

* Assign a task directly to an agent, such as a TODO comment or GitHub issue.

### Create a new agent session

You can create a new agent session from the Chat view or by using the corresponding commands in the Command Palette. You can create multiple agent sessions in parallel, each focused on a different task. When you create a new agent session, the previous session stays active, so you can switch between tasks through the [agent sessions list](#agent-sessions-list).

1. Open the Chat view.

1. Select the **New Session** dropdown (`+`) and choose where to open the new session:

    ![Screenshot of creating a new agent session from the Chat view.](../images/agents-overview/create-new-agent-session.png)

1. Choose the agent type from the dropdown.

    ![Screenshot showing agent type dropdown in new chat session.](../images/agents-overview/agent-type-dropdown-jan.png)

At any time, you can move an agent session from the Chat view to a chat editor or new window through the actions in the overflow menu (...).

You can also start new agent sessions from the [VS Code welcome page](/docs/copilot/chat/chat-sessions.md#vs-code-welcome-page). Change its layout by setting the `setting(workbench.startupEditor)` setting to `agentSessionsWelcomePage` to quickly access recent sessions and start new tasks when you open VS Code.

Alternatively, use the following commands from the Command Palette (`kb(workbench.action.showCommands)`):

* **Chat: New Chat Editor/Window**: start a new local agent session in a chat editor
* **Chat: New Background Agent**: start a new background agent session by using Copilot CLI in a chat editor
* **Chat: New Cloud Agent**: start a new Copilot coding agent session in a chat editor
* **Chat: New Claude Agent**: start a new Claude Agent session (Preview)
* **Codex: New Codex Agent**: start a new OpenAI Codex background agent session in a chat editor

### Hand off a session to another agent

Each agent type has unique strengths and capabilities. Local agents let you interact with the AI in real-time, whereas background agents are great for handling well-defined tasks autonomously, and cloud agents are great for team collaboration via pull requests.

You can hand off (or delegate) an existing task from one agent to another agent. For example, you start with creating a plan with a local agent, then hand off to a background agent to create different variants as proof of concepts, and finally continue with a cloud agent to implement the final version in a pull request for team review.

To hand off an ongoing local agent session, select a different agent type from the session type dropdown in the chat input box.

VS Code creates a new agent session when you hand off, carrying over the full conversation history and context. You can then continue interacting with the new agent to complete the task. The original session is archived after handoff.

In a background agent session, you can delegate to a cloud agent by entering the `/delegate` command in the chat input box. Optionally, you can provide additional instructions to the cloud agent after the `/delegate` command.

### Assign a coding task to an agent

If you have the [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension installed, you can assign an agent to implement `TODO` comments in your code.

![Screenshot of assigning a TODO comment to Copilot coding agent.](../images/agents-overview/assign-todo-to-agent.png)

In GitHub.com, or by using the GitHub Pull Requests extension, you can assign GitHub issues to Copilot coding agent by assigning the issue to `copilot` or by mentioning it in an issue comment or pull request to ask for a code review.

## Review and apply file changes

When an agent session completes and makes code changes to your project, the session list shows the file change statistics for that session. To review the changes made by the agent, select the session from the list to open the session details.

The session details view shows the full conversation history with the agent, along with any file changes made during the session. Right-click a changed file to see a diff editor for that file, or select the **View All Changes** action to see a multi-file diff editor with all changes made during the session.

![Screenshot of the file changes diff editor in an agent session.](../images/agents-overview/agent-file-changes.png)

Depending on the agent type, you have options to apply the changes made by the agent onto your local workspace, or to check out the branch from the agent session (for cloud agents).

## Rename agent sessions

VS Code automatically names agent sessions based on the initial prompt or task description. However, you can rename an agent session at any time to give it a more meaningful name.

To rename a session, right-click the session in the sessions list and select **Rename**. Enter the new name for the session and press Enter to save it.

## Archive agent sessions

To keep the list of sessions organized, archive completed or inactive sessions. Archiving a session doesn't delete it but moves it out of the active sessions list. At any time, you can unarchive a session to restore it to the active sessions list.

To archive a session, hover over the session in the session list and select **Archive**. After you archive a session, it disappears from the list. Inversely, you can also unarchive a session in the same way.

![Screenshot of archiving an agent session in the sessions view.](../images/agents-overview/agent-sessions-archive.png)

To view your archived sessions, use the filter options in the sessions list and select the **Archived** filter.

## Delete agent sessions

To permanently delete an agent session, right-click the session in the sessions list and select **Delete**. Deleting a session removes it permanently and can't be undone. For [background agent sessions](/docs/copilot/agents/background-agents.md), deleting the session also removes any associated worktrees created for that session.

> [!IMPORTANT]
> Deleting a session is irreversible. If you just want to hide a session, consider [archiving](#archive-agent-sessions) it instead.

## Related resources

* [Agents tutorial](/docs/copilot/agents/agents-tutorial.md): Hands-on tutorial for working with different agent types.

* [Planning](/docs/copilot/agents/planning.md): Create detailed implementation plans before coding.

* [Tools](/docs/copilot/agents/agent-tools.md): Extend agents with built-in, MCP, and extension tools.

* [Subagents](/docs/copilot/agents/subagents.md): Delegate tasks to context-isolated subagents.

* [Chat](/docs/copilot/chat/copilot-chat.md): Learn about the chat interface and interaction features.

* [Local agents](/docs/copilot/agents/local-agents.md): Use interactive agents with full access to your workspace and tools.

* [Background agents](/docs/copilot/agents/background-agents.md): Explore CLI-based agents and autonomous workflows.

* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about GitHub Copilot Coding Agent and remote execution.

* [Third-party agents](/docs/copilot/agents/third-party-agents.md): Use Claude Agent and OpenAI Codex in VS Code.

* [Custom agents](/docs/copilot/customization/custom-agents.md): Create your own AI agents and extensions.
