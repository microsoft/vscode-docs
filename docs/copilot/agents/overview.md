---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 11/26/2025
MetaDescription: Learn about different types of AI agents in VS Code, including local chat, background agents, and cloud agents for coding tasks.
MetaSocialImage: images/shared/github-copilot-social.png
---

# Using agents in Visual Studio Code

Visual Studio Code supports multiple types of AI-powered agents that can assist with coding tasks, from interactive conversations to autonomous multi-step workflows. Agents in VS Code can operate locally within the editor, run in the background, or remotely in the cloud. The Agents view provides a central interface to manage and track all your agent interactions, across these different environments.

This article provides an overview of the various agent types, how to create and manage agent sessions, delegate tasks between agents, and track their progress.

> [!NOTE]
> The Agents view is currently in preview.

## What are agents?

Agents are more than simple inline suggestions or single-purpose tools. While basic AI features might suggest the next line of code or answer a quick question, agents are designed to understand your development context and autonomously take coordinated action across your codebase and development environment.

In VS Code, agents are AI-powered assistants that can perform coding tasks with varying levels of autonomy. Some respond to a simple prompt and make targeted edits, while others can plan multi-step changes, run terminal commands, and orchestrate tools to achieve complex objectives.

These autonomous agents have the following capabilities:

* **Codebase understanding**: Analyze your codebase and curate relevant context for the task
* **Developer context**: Get context from your development environment, like stack traces, linting errors, or debug state
* **Task decomposition**: Break down high-level requirements into concrete coding tasks
* **Autonomous execution**: Execute tasks independently, such as making code edits, running tests, or terminal commands
* **Tool integration**: Invoke external tools and services to gather information or perform tasks
* **Self-correction**: Respond to feedback from tools and self-correct when encountering errors, such as test failures, merge conflicts, debug context, or terminal output
* **Multi-environment**: Run in different environments, such as locally in VS Code, in the background on your machine, or remotely in the cloud

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

**Best for**: Interactive conversations, immediate assistance, and real-time collaboration

Local agents run directly within chat in VS Code and provide immediate, interactive assistance. You can create [custom agents](/docs/copilot/customization/custom-agents.md) to customize the behavior and capabilities of local agents to suit your workflow.

**Key characteristics**:

* Immediate response and interaction
* Full access to your workspace context
* Integrated with VS Code's editing experience

Learn more about [using chat in VS Code](/docs/copilot/chat/copilot-chat.md).

### Background agents

**Best for**: Coding tasks that run autonomously without user interaction in the local developer environment

Background agents are CLI-based (for example, Copilot CLI) and operate independently on complex tasks while you continue other work. Worktree isolation ensures they don't interfere with your main workspace.

**Key characteristics**:

* Work autonomously in the background
* Isolated execution environments with Git worktrees
* Can handle long-running, complex tasks
* Can't directly access VS Code built-in tools, for example, to get linting errors or debug state

Learn more about [using background agents in VS Code](/docs/copilot/agents/background-agents.md).

### Cloud agents

**Best for**: Tasks that run autonomously without user interaction and require integration with GitHub workflows

Cloud agents use remote infrastructure for complex coding tasks and scalable, isolated execution. They can integrate with GitHub repositories and pull requests to manage changes and collaboration (Copilot coding agent).

**Key characteristics**:

* Run on remote infrastructure, allowing for scalable execution of large tasks
* Isolated environments via branches and pull requests, protecting against unintended changes to your local environment
* Integration with GitHub pull requests and issues
* Designed for team collaboration

Learn more about [using cloud agents in VS Code](/docs/copilot/agents/cloud-agents.md).

### Third party agents

**Best for**: When you already use third party AI agents and want to integrate them into your VS Code workflow

Third party agents are background agents developed by external providers (for example, OpenAI Codex) that are integrated into the VS Code agent experience via the Agents view.

## Agents view

The **Agents view** provides a centralized interface for tracking and managing your agent sessions, both local in VS Code and in other environments, such as Copilot coding agent, GitHub Copilot CLI, or OpenAI Codex.

![Screenshot of the Agents view in VS Code showing multiple agent sessions.](../images/agents-overview/agents-view.png)

To open the **Agents** view, run the **Agents: Focus on Agents View** command from the Command Palette (`kb(workbench.action.showCommands)`).

You can open the Agents view in a separate view in the Primary Side Bar, or alongside the Chat view in the Secondary Side Bar. Configure the location via the `setting(chat.agentSessionsViewLocation)` setting:

* `single-view`: show Agents view alongside Chat view in Secondary Side Bar
* `view`: show Agents view in Primary Side Bar
* `disabled`: hide the Agents view

For each session, the Agents view displays the following information:

* **Description**: short summary of the task
* **Agent type**: type of agent session: Local, Background, Cloud, or Codex
* **Status**: run state of the session
* **Timing**: start time of the session
* **File change statistics**: files modified and lines added/removed

> [!NOTE]
> Extension developers can learn how to integrate with the Agents view with the proposed API [`chatSessionsProvider`](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.chatSessionsProvider.d.ts). The API is currently in a proposed state and subject to change.

### Filter agent sessions

By default, the Agents view shows all sessions, except archived sessions. Use the **Filter Agent Sessions** dropdown to filter sessions by:

* Type: Local, Background, Cloud, or Codex
* Status: Completed, In Progress, Failed, or Archived

![Screenshot of the Agents view filter dropdown.](../images/agents-overview/agents-view-filter.png)

Select **Reset** to reset the filters to the default value.

### Archive agent sessions

To keep the Agents view organized, you can archive completed or inactive sessions. Archived sessions are hidden from the default view but can be accessed by applying the **Archived** filter.

To archive a session:

1. Hover over the session in the Agents view

1. Select the **Archive** button for the session

To unarchive a session:

1. Apply the **Archived** filter in the Agents view

1. Hover over the archived session

1. Select the **Unarchive** button for the session

## Create a new agent session

You can create a new, empty agent session from the Agents view. To create a new agent session:

1. Open the Agents view

1. Select **New Session** to create a new local agent session in VS Code

1. Select the **New Session** dropdown and then select which type of agent session to create

Alternatively, use the following commands from the Command Palette (`kb(workbench.action.showCommands)`):

* **Chat: New Chat Editor/Window**: create a new local agent session in VS Code
* **Chat: New Background Agent**: create a new background agent session using Copilot CLI
* **Chat: New Cloud Agent**: create a new cloud agent session using GitHub
* **Chat: New OpenAI Codex**: create a new third-party Codex agent session

## Continue a local session in another agent type

Delegation allows you to transfer tasks between different agent types while preserving context and conversation history. This can be useful to leverage the strengths of different agents for various parts of a coding task.

For example, you might start with a local agent to brainstorm and plan a feature, then continue the session with a cloud agent to implement the feature in a pull request.

You can delegate a local agent session from chat in VS Code by using the **Continue In** button in the chat input box, or use the `@cli`, `@cloud`, or `@codex` commands to pass a task to another agent type.

![Screenshot of the chat input box showing the Continue In button.](../images/agents-overview/delegate-local-session.png)

In a background agent session, you can delegate to a cloud agent by using the `/delegate` command in the chat input box.

When you delegate a session, VS Code creates a new agent session of the selected type, carrying over the full conversation history and context. You can then continue interacting with the new agent to complete the task.

## Open session details

Select an agent session in the Agents view to open a chat editor that displays the full conversation history, file changes, and status updates.

![Screenshot of an agent session details view in VS Code.](../images/agents-overview/agent-session-details.png)

You can continue iterating with the agent via the chat interface in the session details view. For example, you can ask the agent to make further modifications, explain changes, run tests, and more.

## Review file changes

When an agent makes code modifications, you can review the changes directly from within the session details view. The view shows the list of changed files, along with diff statistics.

![Screenshot of the file changes diff editor in an agent session.](../images/agents-overview/agent-file-changes.png)

Select a changed file to view a diff editor that highlights the specific lines added, removed, or modified by the agent.

You can perform the following actions in the agent session details view:

* **Open Changes**: view a multi-file diff editor with all changes made during the session

* **Apply Changes**: apply all modifications made by the agent to your local workspace

* **Checkout Changes**: create a new branch with the agent's changes and switch to that branch

## Related resources

* [Local agents](/docs/copilot/chat/copilot-chat.md): Master local agent sessions and chat features
* [Background agents](/docs/copilot/agents/background-agents.md): Explore CLI-based agents and autonomous workflows
* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about GitHub Copilot Coding Agent and remote execution
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create your own AI agents and extensions
