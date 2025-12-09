---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 11/12/2025
MetaDescription: Learn about different types of AI agents in VS Code, including local chat, background agents, and cloud agents for coding tasks.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Using agents in Visual Studio Code

Agents are what makes AI-powered autonomous coding possible and enable multi-step tasks that go beyond simple code suggestions and chat interactions. Visual Studio Code lets you create agent sessions that run locally or in the cloud, interactively or in the background. At any time, you can hand off tasks between different agent types to leverage their unique strengths. With the unified Chat view in VS Code, you have a central place to manage and monitor all your agent sessions, regardless of where they run.

This article provides an overview of the various agent types, how to create and manage agent sessions, delegate tasks between agents, and track their progress.

![Screenshot of an agent session in VS Code showing code changes and chat interaction.](../images/agents-overview/chat-sessions-view.png)

## What are agents?

<!--
TODO: make it clearer that agents can work autonomously, do more than make code changes, can use tools to perform various tasks like calling APIs, or pulling in data.
TODO: maybe add a diagram to show an agent flow?
-->

Agents are more than simple inline suggestions or single-purpose tools. While basic AI features might suggest the next line of code or answer a quick question, agents are designed to understand your development context and autonomously take coordinated action across your codebase and development environment.

In VS Code, agents are AI-powered assistants that can perform coding tasks with varying levels of autonomy. Some respond to a simple prompt and make targeted edits, while others can plan multi-step changes, run terminal commands, and orchestrate tools to achieve more complex objectives.

These autonomous agents have the following capabilities:

* **Codebase understanding**: Analyze your codebase and curate relevant context for the task
* **Developer context**: Get context from your development environment, like stack traces, linting errors, or debug state
* **Task decomposition**: Break down high-level requirements into concrete coding tasks
* **Autonomous execution**: Execute tasks independently, such as making code edits, running tests, or terminal commands
* **Tool integration**: Invoke external tools and services to gather information or perform tasks
* **Self-correction**: Respond to feedback from tools and self-correct when encountering errors, such as test failures, merge conflicts, debug context, or terminal output
* **Multi-environment**: Run in different environments, such as locally in VS Code, in the background on your machine, or remotely in the cloud

<!--
TODO: explain how agents differ from custom agents, subagents
 -->

## Types of agents

VS Code supports four main categories of agents, each designed for different use cases and levels of interaction:

![Diagram showing agent types by environment and interaction.](../images/agents-overview/agent-types-diagram.png)

<!--
```mermaid
---
config:
    quadrantChart:
        pointTextPadding: 10
        pointRadius: 0
        quadrantTextTopPadding: 10
        pointLabelFontSize: 12
        chartWidth: 500
        chartHeight: 500
    themeVariables:
        quadrant1TextFill: '#4f4e4eff'
        quadrant2TextFill: '#4f4e4eff'
        quadrant3TextFill: '#4f4e4eff'
        quadrant4TextFill: '#4f4e4eff'
        quadrantPointTextFill: '#4f4e4eff'
---
quadrantChart
    title Agent Types
    x-axis Local --&gt; Remote
    y-axis Interactive --&gt; Non-Interactive
    quadrant-1 Cloud Agent
    quadrant-2 Background Agent
    quadrant-3 Local Agent
    quadrant-4 "Remote Development"
    VS Code built-in agents: [0.30, 0.30]
    VS Code custom agents: [0.20, 0.20]
    Copilot CLI: [0.30, 0.80]
    "Third-party (OpenAI Codex)": [0.20, 0.70]
    Copilot coding agent: [0.75, 0.75]
    GitHub Codespaces: [0.70, 0.20]
    VS Code Dev Containers: [0.80, 0.30]
```
-->

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

### Background agents

Background agents like Copilot CLI are CLI-based agents that run non-interactively in the background on your local machine. Background agents can work in isolated mode by using Git worktrees to prevent that code changes interfere with your current workspace. You can opt to run background agents in your current workspace, but this might result in conflicts if you are actively working on the same files. Background agents can't use MCP or extension-provided tools and are limited to the models provided by the CLI. To customize the behavior of the background agent, you can reuse workspace [custom agents](/docs/copilot/customization/custom-agents.md) to have it assume a specific role or persona.

**Best for**:

* Non-interactive tasks that have a well-defined scope and have all necessary context, such as implementing a plan
* Tasks that don't require collaboration with other team members
* Tasks that don't require access to VS Code built-in tools, MCP tools, or run-time context, such as failed tests or text selections

**Key characteristics**:

* Runs non-interactively and autonomously in the background on your local machine
* Can work isolated from your main workspace with Git worktrees
* Can't directly access VS Code built-in tools and run-time context, unless it's added explicitly
* Don't have access to MCP servers
* Limited to models available via the CLI tool

Learn more about [using background agents in VS Code](/docs/copilot/agents/background-agents.md).

### Cloud agents

Cloud agents run on remote infrastructure to perform AI-powered coding tasks. Cloud agents like Copilot coding agent integrate with GitHub repositories and pull requests to enable team collaboration and code reviews. Cloud agents operate isolated from your local workspace via branches and pull requests to prevent interference. Cloud agents can't access VS Code built-in tools and run-time context, but can access MCP servers configured in the remote environment. You can reuse your workspace [custom agents](/docs/copilot/customization/custom-agents.md) to have the cloud agent assume a specific role or persona for a task.

**Best for**: Tasks that run autonomously without user interaction and require integration with GitHub workflows

* Non-interactive tasks that have a well-defined scope and have all necessary context, such as implementing a plan
* Tasks that require collaboration with other team members
* Tasks that don't require access to VS Code built-in tools, MCP tools, or run-time context, such as failed tests or text selections

**Key characteristics**:

* Runs non-interactively on remote infrastructure
* Work isolated from your main workspace via branches and pull requests
* Can support team collaboration via pull requests
* Don't have access to VS Code built-in tools and run-time context
* Have access to MCP servers configured in the remote environment
* Limited to models available in the cloud agent service

Learn more about [using cloud agents in VS Code](/docs/copilot/agents/cloud-agents.md).

### Third party agents

Third party agents are background agents developed by other providers, such as OpenAI Codex, and that are integrated into the VS Code agent experience. You can manage agent sessions from these providers in the same way as local, background, and cloud agents.

**Best for**: When you already use third party AI agents and want to integrate them into your VS Code workflow

## Manage agent sessions

The Chat view in VS Code provides a unified interface for managing your agent sessions, regardless of where they run. You can see the list of all your agent sessions, their status, and key details like file changes, and their type (local, background, cloud, or Codex). The status indicators help you quickly identify active, completed, failed sessions, or sessions that require your input.

The Chat view operates in two modes:

* **Compact**:

    In compact view, when you open a new chat session, you can see your three most recent sessions in a compact list. You can select **Show All Sessions** to open the full history of agent sessions. When viewing all sessions, use the search and filter options to find specific sessions.

    ![Screenshot of the Chat view in compact mode showing recent agent sessions.](../images/agents-overview/chat-view-compact.png)

    When you select a session from the list, the Chat view switches to that session. A link enables you to return to the previous view.

* **Expanded**

    In expanded view, the Chat view shows the full list of agent sessions directly side-by-side with the Chat view. Use the search and filter options to find specific sessions. To switch between compact and expanded mode, use the toggle control in the top-right corner of the Chat view.

    ![Screenshot of the Chat view in expanded mode showing full agent session history.](../images/agents-overview/chat-view-expanded.png)

    When you select a session from the list, the Chat view shows the details of that session, while the session list remains visible.

    > [!TIP]
    > Make the Chat view wider to automatically switch to expanded mode.

Right-click a session in the list to see additional actions, such as different options to open the session details, archive the session, or agent-type specific actions like checking out a pull request (for cloud agent sessions).

> [!NOTE]
> Extension developers can learn how to integrate with the Agents view with the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

### Filter agent sessions

When all sessions are shown in the sessions list, you can use search and filtering to find specific agent sessions. By default, all sessions are shown, except for [archived sessions](#archive-agent-sessions). You filter sessions by agent type, status, read state, and archived state.

![Screenshot of the agent sessions view filter dropdown.](../images/agents-overview/agent-sessions-filter.png)

Select **Reset** to reset the filters to the default value.

### Archive agent sessions

To keep the list of sessions organized, you can archive completed or inactive sessions. Archived sessions are hidden by default, but you can still access them by applying the **Archived** filter.

To archive a session, hover over the session in the session list and select **Archive**. After you archive a session, it disappears from the list. Inversely, you can also unarchive a session in the same way.

![Screenshot of archiving an agent session in the sessions view.](../images/agents-overview/agent-sessions-archive.png)

## Create an agent session

There are different ways to create a new agent session in VS Code:

* Create a new, empty agent session of a specific type

* Hand off an existing session to another agent type via delegation

* Assign a task directly to an agent, such as a TODO comment or GitHub issue

### Create a new agent session

You can create a new agent session from the Chat view or by using the corresponding commands in the Command Palette.

1. Open the Chat view

1. Select the **New Session** dropdown and then select which type of agent session to create

    ![Screenshot of creating a new agent session from the Chat view.](../images/agents-overview/create-new-agent-session.png)

    * **New Chat**: start a new local agent session in the Chat view
    * **New Chat Editor**: start a new local agent session as an editor tab
    * **New Chat Window**: start a new local agent session in a separate VS Code window
    * **New Background/Cloud/Codex Agent**: start a new background, cloud, or Codex agent session in the Chat view

At any time, you can move an agent session from the Chat view to a chat editor or new window via the actions in the overflow menu (...).

Alternatively, use the following commands from the Command Palette (`kb(workbench.action.showCommands)`):

* **Chat: New Chat Editor/Window**: start a new local agent session in a chat editor
* **Chat: New Background Agent**: start a new background agent session using Copilot CLI in a chat editor
* **Chat: New Cloud Agent**: start a new Copilot coding agent session in a chat editor
* **Codex: New Codex Agent**: start a new OpenAI Codex agent session in a chat editor

### Hand off a session to another agent

Each agent type has unique strengths and capabilities. Local agents let you interact with the AI in real-time, whereas background agents are great for handling well-defined tasks autonomously, and Cloud agents are great for team collaboration via pull requests.

VS Code enables you to hand off (or delegate) an existing task from one agent to another agent, depending on the specifics of the task at hand. For example, you start with creating a plan with a local agent, then hand off to a background agent to create different variants as proof of concepts, and finally continue with a cloud agent to implement the final version in a pull request for team review.

When you delegate a session, VS Code creates a new agent session of the selected type, carrying over the full conversation history and context. You can then continue interacting with the new agent to complete the task. The original session is archived after handoff.

You can hand off a local agent session from chat in VS Code by using the **Continue In** control, or by typing `@cli`, `@cloud`, or `@codex` in your prompt to pass the task to another agent type.

![Screenshot of the chat input box showing the Continue In button.](../images/agents-overview/delegate-local-session.png)

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

## Related resources

* [Local agents](/docs/copilot/chat/copilot-chat.md): Master local agent sessions and chat features
* [Background agents](/docs/copilot/agents/background-agents.md): Explore CLI-based agents and autonomous workflows
* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about GitHub Copilot Coding Agent and remote execution
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create your own AI agents and extensions
