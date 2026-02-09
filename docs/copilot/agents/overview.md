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

Agents are what makes AI-powered autonomous coding possible and enable multi-step tasks that go beyond simple code suggestions and chat interactions. Visual Studio Code lets you create agent sessions that run locally or in the cloud, interactively or in the background. At any time, you can hand off tasks between different agent types to take advantage of their unique strengths. With the unified Chat view in VS Code, you have a central place to manage and monitor all your agent sessions, regardless of where they run.

This article provides an overview of the various agent types, how to create and manage agent sessions, delegate tasks between agents, and track their progress.

![Screenshot of an agent session in VS Code showing code changes and chat interaction.](../images/agents-overview/chat-sessions-view2.png)

> [!IMPORTANT]
> Make sure agents are enabled in your VS Code settings (`setting(chat.agent.enabled)`). Your organization might also have disabled agents - contact your admin to enable this functionality.

## What are agents?

Agents handle complete coding tasks end-to-end, saving you time by doing more than suggesting code or answering questions. They understand your project, make changes across multiple files, run commands, and adapt based on the results they get.

For example, imagine you have a failing test. Instead of suggesting a fix, an agent can read the error message, identify the root cause across multiple files, update the relevant code, run the tests again to verify the fix works, and even commit the changes.

Give an agent a high-level task, and it breaks the task down into steps, executes those steps using various tools, and self-corrects when it hits errors or failed tests.

You can run multiple agent sessions in parallel, each focused on a different task. When you create a new agent session, the previous session remains active, and you can switch between tasks via the [agent sessions list](#agent-sessions-list).

### Key concepts

The following concepts describe different aspects of working with agents in VS Code:

| Concept | What it is | Example |
|---|---|---|
| **Agent type** | *Where* and *how* an agent runs: [local](#local-agents), [background](#background-agents), [cloud](#cloud-agents), or [third-party](#third-party-agents). | Start a cloud agent for tasks that require team collaboration. |
| **Built-in agent** | A pre-configured agent in VS Code: **Agent**, **Plan**, and **Ask**. These are ready to use without any setup. | Select the Plan agent to create a structured plan for building a new feature. |
| **[Custom agent](/docs/copilot/customization/custom-agents.md)** | A reusable *configuration* (defined in an `.agent.md` file) that gives an agent a specific role, tools, and instructions. Custom agents work with any agent type. | Create a "Security Reviewer" custom agent with read-only tools that focuses on identifying vulnerabilities. |
| **[Subagent](/docs/copilot/agents/subagents.md)** | A child agent spawned within a session to handle a subtask in its own isolated context window. | An agent researching a topic spawns a subagent to gather information, then receives only the summary back. |
| **[Hand off](#hand-off-a-session-to-another-agent)** | Transferring a session from one agent type to another, carrying over the conversation history. | Start planning with a local agent, then hand off to a cloud agent to implement the plan as a pull request. |

## Types of agents

VS Code supports four main categories of agents, each designed for different use cases and levels of interaction:

![Diagram showing agent types by environment and interaction.](../images/agents-overview/agent-types-diagram-v3.png)

<!-- Diagram source: agent-types.excalidraw (credits: AnnaS) -->

### Which agent should I use?

Use the following table to help you decide which agent type best fits your use case:

| Criteria | Local | Background | Cloud |
|---|---|---|---|
| **Where it runs** | Your machine | Your machine (CLI) | Remote infrastructure |
| **Interactive vs unattended** | Interactive | Unattended (async) | Unattended (async) |
| **Team collaboration** | No | No | Yes (PRs/issues) |
| **Isolation** | No (direct workspace) | Yes (worktrees) | Yes (remote) |
| **Task type** | Exploratory/ambiguous | Well-defined | Well-defined |

### Local agents

Local agents run directly within VS Code on your machine. You engage with local agents interactively via chat to get immediate results to your prompts. Local agents operate on your workspace and have access to the full range of tools and models available in VS Code. You can let the agent assume a specific role or persona for a task, such as a code reviewer, tester, or documentation writer by [creating custom agents](/docs/copilot/customization/custom-agents.md).

Local agents operate in the chat interface in VS Code. When you close a chat session, the local agent remains active and can be tracked in the sessions view.

**Best for**:

* Interactive conversations that require immediate feedback, such as brainstorming, planning, or tasks that are not yet fully defined
* Tasks that don't require collaboration from other team members
* Tasks that require context from your developer environment, such as linting errors, stack traces, unit test results
* Tasks that require access to specific tools from VS Code extensions or MCP servers or need to use specific models like BYOK models

**Key characteristics**:

* Runs within VS Code on your local machine and works on your current workspace
* Interactive chat-based interface for real-time feedback and iteration
* Full access to your workspace, files, and context
* Can access all agent tools configured in VS Code, such as built-in tools, MCP tools, and extension-provided tools
* Can use all models available to you in VS Code, including BYOK models and models from other providers

Learn more about [using chat in VS Code](/docs/copilot/chat/copilot-chat.md).

#### Built-in agents

Local agent sessions use one of three built-in agents, each optimized for different types of tasks. You can switch between agents at any time during a chat session by selecting a different agent from the agent picker in the Chat view. For more specialized workflows, you can create your own [custom agents](/docs/copilot/customization/custom-agents.md).

<details>
<summary>Agent</summary>

Agent is optimized for complex coding tasks based on high-level requirements that might require running terminal commands and tools. The AI operates autonomously, determining the relevant context and files to edit, planning the work needed, and iterating to resolve issues as they arise.

VS Code directly applies code changes in the editor and the editor overlay controls enable you to navigate between the suggested edits and review them. The agent might invoke multiple [tools](/docs/copilot/agents/agent-tools.md) to accomplish different tasks.

You can [customize chat with extra tools](/docs/copilot/agents/agent-tools.md) by adding MCP servers or installing extensions that contribute tools.

Open chat with Agent: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent)

> [!IMPORTANT]
> If you don't see the agent option, make sure agents are enabled in your VS Code settings (`setting(chat.agent.enabled)`). Your organization might also have disabled agents - contact your admin to enable this functionality.

##### Get started with agents

> [!TIP]
> For a hands-on tutorial that demonstrates working with different agent types including background and cloud agents, see the [agents tutorial](/docs/copilot/agents/agents-tutorial.md).

To start a local agent session:

1. Select **Agent** from the agent picker in the Chat view.

1. Type a high-level prompt in the chat input field. For example, you might ask:

    ```prompt-agent
    Implement a user authentication system with OAuth2 and JWT.
    ```

    or

    ```prompt-agent
    Set up a CI/CD pipeline for this project.
    ```

1. Use the tools picker to [enable tools](/docs/copilot/agents/agent-tools.md) and give the agent more capabilities.

1. Select **Send** or press `kb(workbench.action.chat.submit)` to submit your prompt.

1. Review and confirm code changes and tool invocations as the agent works through your request.

    > [!TIP]
    > VS Code helps you protect against inadvertent edits to sensitive files, such as workspace configuration settings or environment settings. Learn more about [editing sensitive files](/docs/copilot/chat/review-code-edits.md#edit-sensitive-files).

</details>

<details>
<summary>Plan</summary>

The plan agent is optimized for creating a structured implementation plan for a coding task. Use the plan agent when you want to break down a complex feature or change into smaller, manageable steps before implementation.

The plan agent generates a detailed plan outlining the steps needed and asks clarifying questions to ensure a comprehensive understanding of the task. You can then hand off the plan to an implementation agent or use it as a guide.

Open chat with Plan: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=plan) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=plan)

Learn more about [planning with agents](/docs/copilot/agents/planning.md).

</details>

<details>
<summary>Ask</summary>

Ask is optimized for answering questions about your codebase, coding, and general technology concepts. Use Ask when you want to understand how something works, explore ideas, or get help with coding tasks.

Ask uses agentic capabilities to research your codebase and gather relevant context. Responses can contain code blocks that you apply individually to your codebase. To apply a code block, hover over the code block and select the **Apply in Editor** button.

Open chat with Ask: [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) | [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask)

##### Get started with Ask

1. Type your prompt in the chat input field. For example, you might ask:

    ```prompt-ask
    Provide 3 ways to implement a search feature in React.
    ```

    or

    ```prompt-ask
    Where is the db connection configured in this project? #codebase
    ```

1. Select **Ask** from the agent picker in the Chat view.

1. Optionally, [add context to your prompt](/docs/copilot/chat/copilot-chat-context.md) to get more accurate responses.

1. Select **Send** or press `kb(workbench.action.chat.submit)` to submit your prompt.

</details>

### Background agents

Background agents like Copilot CLI are CLI-based agents that run non-interactively in the background on your local machine. Background agents can work in isolated mode by using Git worktrees to prevent that code changes interfere with your current workspace. You can opt to run background agents in your current workspace, but this might result in conflicts if you are actively working on the same files. Background agents can't use MCP or extension-provided tools and are limited to the models provided by the CLI. To customize the behavior of the background agent, you can reuse workspace [custom agents](/docs/copilot/customization/custom-agents.md) to have it assume a specific role or persona.

**Best for**:

* Non-interactive tasks that have a well-defined scope and have all necessary context, such as implementing a plan
* Tasks that don't require collaboration with other team members
* Tasks that don't require access to VS Code built-in tools or run-time context, such as failed tests or text selections (unless manually added to the prompt)

**Key characteristics**:

* Runs non-interactively and autonomously in the background on your local machine
* Can work isolated from your main workspace with Git worktrees
* Can't directly access VS Code built-in tools and run-time context, unless it's added explicitly
* Can access local MCP servers that don't require authentication
* Limited to models available via the CLI tool

Learn more about [using background agents in VS Code](/docs/copilot/agents/background-agents.md).

### Cloud agents

Cloud agents run on remote infrastructure to perform AI-powered coding tasks. Cloud agents like Copilot coding agent integrate with GitHub repositories and pull requests to enable team collaboration and code reviews. You can also select partner agents like Claude or Codex as alternatives to the default Copilot, and choose which AI model the cloud agent uses.

Cloud agents operate isolated from your local workspace and can't access VS Code built-in tools and run-time context, but can access MCP servers configured in the remote environment. Depending on the cloud agent provider, you can reuse your workspace [custom agents](/docs/copilot/customization/custom-agents.md).

**Best for**:

* Non-interactive tasks that have a well-defined scope and have all necessary context, such as implementing a plan
* Tasks that are not time-sensitive and can run without immediate feedback
* Tasks that don't require access to VS Code built-in tools, or run-time context, such as failed tests or text selections, unless explicitly added to the prompt
* Tasks that require collaboration with other team members (Copilot coding agent)

**Key characteristics**:

* Runs non-interactively on remote infrastructure
* Work isolated from your main workspace
* Can support team collaboration via pull requests
* Don't have access to VS Code built-in tools and run-time context
* Have access to MCP servers configured in the remote environment
* Supports partner agents

Learn more about [using cloud agents in VS Code](/docs/copilot/agents/cloud-agents.md).

### Third party agents

VS Code supports agents from third-party AI providers, like Anthropic and OpenAI. Third-party agents enable you to use the unique capabilities of other AI providers, while still benefiting from the unified agent sessions management in VS Code and the rich editor experience for coding, debugging, testing, and more. In addition, you can use these providers with your existing GitHub Copilot subscription.

Depending on the provider, third-party agents can run either locally in VS Code or in the cloud, powered by GitHub. The following third-party agents are currently available in VS Code:

* **Claude Agent** (Preview): powered by Anthropic's Claude Agent SDK, with specialized slash commands and memory files - can operate locally or in the cloud
* **OpenAI Codex**: powered by OpenAI's Codex SDK - can operate locally or in the cloud (Preview)

**Best for**: When you want to use the specific capabilities of third-party AI providers with your Copilot subscription, and use VS Code for agent session management

**Key characteristics**:

* Use the provider's specific capabilities to perform coding tasks
* Use your existing Copilot subscription for authentication
* Use VS Code for agent session management and rich editor experience
* Can run locally or in the cloud, depending on the provider
* Can support team collaboration via pull requests (for cloud agents)

Learn more about [using third-party agents in VS Code](/docs/copilot/agents/third-party-agents.md).

## Agent sessions list

The Chat view provides a unified view to manage all your agent sessions, regardless of where they run. By default, it shows your recent sessions, and gives information about their status, type, and file changes. Expand the list to see and filter all your agent sessions.

The list of sessions is scoped to your workspace. If you don't have a workspace open, the list shows all sessions across your workspaces. The sessions are grouped by time periods, such as Today, or Last Week.

The Chat view operates in two modes: compact and side-by-side. You can manually switch between compact and side-by-side mode with the toggle control in the top-right corner of the Chat view.

* **Compact**:

    In compact view, the list of sessions is embedded in the Chat view. When you select a session from the list, the Chat view switches to that session. Use the back button to return to the sessions list.

    ![Screenshot of the Chat view in compact mode showing recent agent sessions.](../images/agents-overview/chat-view-compact.png)

    Select **Show More** to expand the list to see all your agent sessions and to access the filtering options.

* **Side-by-side**

    In side-by-side view, the list of sessions is shown side-by-side with the Chat view. Select a session from the list to view its details in the Chat view.

    ![Screenshot of the Chat view in expanded mode showing full agent session history.](../images/agents-overview/chat-view-expanded.png)

    > [!TIP]
    > When you make the Chat view wider, it automatically switches to side-by-side mode. Right-click on the sessions list and select **Sessions Orientation** to change this behavior (`setting(chat.viewSessions.orientation)`). You can also use the toggle button.

Right-click a session in the list to see additional actions, such as different options to open the session details, archive the session, or agent-type specific actions like checking out a pull request (for cloud agent sessions).

To hide the session list from the Chat view, right-click in an empty chat and unselect **Show Sessions** (`setting(chat.viewSessions.enabled)`).

> [!NOTE]
> Extension developers can learn how to integrate with the Agents view with the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

### Agent status indicator (Experimental)

The agent status indicator provides quick access to your agent sessions directly from the command center in the title bar. The indicator displays visual badges for unread messages and in-progress sessions, helping you stay informed about your AI agent activity without switching views.

![Screenshot showing the Agent Status Indicator in the command center with unread and in-progress badges.](../images/agents-overview/agent-status-indicator.png)

The indicator shows:

* **Unread sessions badge**: Displays the count of chat sessions with new messages. Select the badge to filter the sessions list to show only unread sessions.
* **In-progress sessions badge**: Displays the count of sessions with running agents. Select the badge to filter the sessions list to show only in-progress sessions.
* **Sparkle icon**: Provides quick access to chat and session management options.

You can configure the indicator's behavior with the `setting(chat.agentsControl.clickBehavior)` setting to toggle chat visibility, cycle through chat states (show, maximize, hide), or focus the chat input.

When a filter is active, the sessions list automatically expands to show all matching sessions. Select the badge again to clear the filter and return to the default view.

> [!NOTE]
> The agent status indicator is an experimental feature. Enable it with `setting(chat.agentsControl.enabled)`. The unread and in-progress indicators require `setting(chat.viewSessions.enabled)` to be enabled.

## Create an agent session

There are different ways to create a new agent session in VS Code:

* Create a new, empty agent session of a specific type

* Hand off an existing session to another agent type via delegation

* Assign a task directly to an agent, such as a TODO comment or GitHub issue

### Create a new agent session

You can create a new agent session from the Chat view or by using the corresponding commands in the Command Palette. You can create multiple agent sessions in parallel, each focused on a different task. When you create a new agent session, the previous session remains active, allowing you to switch between tasks via the [agent sessions list](#agent-sessions-list).

1. Open the Chat view

1. Select the **New Session** dropdown (`+`) and choose where to open the new session:

    ![Screenshot of creating a new agent session from the Chat view.](../images/agents-overview/create-new-agent-session.png)

1. Choose the agent type from the dropdown.

    ![Screenshot showing agent type dropdown in new chat session.](../images/agents-overview/agent-type-dropdown-jan.png)

At any time, you can move an agent session from the Chat view to a chat editor or new window via the actions in the overflow menu (...).

You can also start new agent sessions from the [VS Code welcome page](/docs/copilot/chat/chat-sessions.md#vs-code-welcome-page). Change its layout with the `setting(workbench.startupEditor)` setting set to `agentSessionsWelcomePage` to quickly access recent sessions and start new tasks when you open VS Code.

Alternatively, use the following commands from the Command Palette (`kb(workbench.action.showCommands)`):

* **Chat: New Chat Editor/Window**: start a new local agent session in a chat editor
* **Chat: New Background Agent**: start a new background agent session using Copilot CLI in a chat editor
* **Chat: New Cloud Agent**: start a new Copilot coding agent session in a chat editor
* **Chat: New Claude Agent**: start a new Claude Agent session (Preview)
* **Codex: New Codex Agent**: start a new OpenAI Codex background agent session in a chat editor

### Hand off a session to another agent

Each agent type has unique strengths and capabilities. Local agents let you interact with the AI in real-time, whereas background agents are great for handling well-defined tasks autonomously, and Cloud agents are great for team collaboration via pull requests.

You can hand off (or delegate) an existing task from one agent to another agent. For example, you start with creating a plan with a local agent, then hand off to a background agent to create different variants as proof of concepts, and finally continue with a cloud agent to implement the final version in a pull request for team review.

To hand off an ongoing local agent session, select a different agent type from the session type dropdown in the chat input box.

VS Code creates a new agent session when you hand off, carrying over the full conversation history and context. You can then continue interacting with the new agent to complete the task. The original session is archived after handoff.

In a background agent session, you can delegate to a cloud agent by entering the `/delegate` command in the chat input box. Optionally, you can provide additional instructions to the cloud agent after the `/delegate` command.

### Assign a coding task to an agent

If you have the [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension installed, you can assign an agent to implement `TODO` comments in your code.

![Screenshot of assigning a TODO comment to Copilot coding agent.](../images/agents-overview/assign-todo-to-agent.png)

In GitHub.com, or by using the GitHub Pull Requests extension, you can assign GitHub issues to Copilot coding agent by assigning the issue to `copilot` or by mentioning it in an issue comment or pull request to ask for a code review.

## Review and apply file changes

When an agent session completes and has made code changes to your project, the session list shows the file change statistics for that session. To review the changes made by the agent, select the session from the list to open the session details.

The session details view shows the full conversation history with the agent, along with any file changes made during the session. Right-click a changed file to see a diff editor for that file, or select the **View All Changes** action to see a multi-file diff editor with all changes made during the session.

![Screenshot of the file changes diff editor in an agent session.](../images/agents-overview/agent-file-changes.png)

Depending on the agent type, you have additional options to apply the changes made by the agent onto your local workspace, or to check out the branch from the agent session (for cloud agents).

## Rename agent sessions

VS Code automatically names agent sessions based on the initial prompt or task description. However, you can rename an agent session at any time to give it a more meaningful name.

To rename a session, right-click the session in the sessions list and select **Rename**. Enter the new name for the session and press Enter to save it.

## Archive agent sessions

To keep the list of sessions organized, you can archive completed or inactive sessions. Archiving a session does not delete it but moves it out of the active sessions list. At any time, you can unarchive a session to restore it to the active sessions list.

To archive a session, hover over the session in the session list and select **Archive**. After you archive a session, it disappears from the list. Inversely, you can also unarchive a session in the same way.

![Screenshot of archiving an agent session in the sessions view.](../images/agents-overview/agent-sessions-archive.png)

To view your archived sessions, use the filter options in the sessions list and select the **Archived** filter.

## Delete agent sessions

To permanently delete an agent session, right-click the session in the sessions list and select **Delete**. Deleting a session removes it permanently and cannot be undone. For [background agent sessions](/docs/copilot/agents/background-agents.md), deleting the session also removes any associated worktrees created for that session.

> [!IMPORTANT]
> Deleting a session is irreversible. If you just want to hide a session, consider [archiving](#archive-agent-sessions) it instead.

## Related resources

* [Agents tutorial](/docs/copilot/agents/agents-tutorial.md): Hands-on tutorial for working with different agent types

* [Planning](/docs/copilot/agents/planning.md): Create detailed implementation plans before coding

* [Tools](/docs/copilot/agents/agent-tools.md): Extend agents with built-in, MCP, and extension tools

* [Subagents](/docs/copilot/agents/subagents.md): Delegate tasks to context-isolated subagents

* [Chat](/docs/copilot/chat/copilot-chat.md): Learn about the chat interface and interaction features

* [Background agents](/docs/copilot/agents/background-agents.md): Explore CLI-based agents and autonomous workflows

* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about GitHub Copilot Coding Agent and remote execution

* [Third-party agents](/docs/copilot/agents/third-party-agents.md): Use Claude Agent and OpenAI Codex in VS Code

* [Custom agents](/docs/copilot/customization/custom-agents.md): Create your own AI agents and extensions
