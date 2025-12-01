---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 11/26/2025
MetaDescription: Learn about different types of AI agents in VS Code, including local chat, background agents, and cloud agents for coding tasks.
MetaSocialImage: images/shared/github-copilot-social.png
---

# Using agents in Visual Studio Code

Visual Studio Code supports multiple types of AI-powered agents that can assist with coding tasks, from interactive conversations to autonomous multi-step workflows. Agents in VS Code can operate locally within the editor, run in the background, or remotely in the cloud. The Agents view provides a central interface to manage and track all your agent interactions, across these different environments.

This article provides an overview of the various agent types, how to create and manage agent sessions, delegate tasks between agents, and track their progress.

## What are agents?

Agents are more than simple inline suggestions or single-purpose tools. While basic AI features might suggest the next line of code or answer a quick question, agents are designed to understand your development context and autonomously take coordinated action across your codebase and development environment.

In VS Code, agents are AI-powered assistants that can perform coding tasks with varying levels of autonomy. Some respond to a simple prompt and make targeted edits, while others can plan multi-step changes, run terminal commands, and orchestrate tools to achieve complex objectives.

These autonomous agents can:

* Understand complex context across your codebase
* Break down high-level requirements into concrete coding tasks
* Execute tasks independently, such as making code edits, running tests, or terminal commands
* Invoke external tools and services to gather information or perform tasks
* Read signals from your environment, like stack traces, linting errors, or debug state
* React to feedback from your environment or tools and self-correct when encountering errors, such as test failures, merge conflicts, debug context, or terminal output

Agents can run in different environments, such as locally in VS Code or in the background on your machine, or they can run remotely in the cloud.

## Types of agents

VS Code supports four main categories of agents, each designed for different use cases and levels of interaction:

![Diagram showing agent types by environment and interaction.](./images/overview/agent-types-diagram.png)

<!--
```mermaid
---
config:
    quadrantChart:
        pointTextPadding: 10
        pointRadius: 3
        quadrantTextTopPadding: 15
    themeVariables:
        quadrant1Fill: "#1a3a5c"
        quadrant2Fill: "#2d5a87"
        quadrant3Fill: "#4a90c2"
        quadrant4Fill: "#7eb8e2"
        quadrant1TextFill: "#ffffff"
        quadrant2TextFill: "#ffffff"
        quadrant3TextFill: "#ffffff"
        quadrant4TextFill: "#1a3a5c"
        quadrantPointFill: "#ffffff"
        quadrantPointTextFill: "#ffffff"
---
quadrantChart
    title Agent types by environment and interaction
    x-axis Local --&gt; Remote
    y-axis Interactive --&gt; Background
    quadrant-1 Cloud Agent
    quadrant-2 Background Agent
    quadrant-3 Local Agent
    quadrant-4 "-"
    VS Code built-in agents: [0.30, 0.30]
    VS Code custom agents: [0.20, 0.20]
    Copilot CLI: [0.30, 0.80]
    "Third-party (OpenAI Codex)": [0.20, 0.70]
    Copilot coding agent: [0.75, 0.75]
```
-->

### Local agents

**Best for**: Interactive conversations, immediate assistance, and real-time collaboration

Local agents run directly within chat in VS Code and provide immediate, interactive assistance.

**Key characteristics**:

* Immediate response and interaction
* Full access to your workspace context
* Integrated with VS Code's editing experience

### Background agents

**Best for**: Coding tasks that run autonomously without user interaction in the local developer environment

Background agents are CLI-based (for example, Copilot CLI) and operate independently on complex tasks while you continue other work. Worktree isolation ensures they don't interfere with your main workspace.

**Key characteristics**:

* Work autonomously in the background
* Isolated execution environments with Git worktrees
* Can handle long-running, complex tasks
* Can't directly get signals from VS Code

### Cloud agents

**Best for**: Tasks that run autonomously without user interaction and require integration with GitHub workflows

Cloud agents use remote infrastructure for complex coding tasks, integrating directly with GitHub repositories and pull requests to manage changes and collaboration.

**Key characteristics**:

* Remote execution on GitHub infrastructure
* Isolated environments via branches and pull requests
* Integration with GitHub pull requests and issues
* Designed for team collaboration

### Third party agents

**Best for**: When you already use third party AI agents and want to integrate them into your VS Code workflow

Third party agents are background agents developed by external providers (for example, OpenAI Codex) that are integrated into the VS Code agent experience via the Agents view.

## Agents view

The **Agents view** provides a centralized interface for tracking and managing your active agent sessions, both local in VS Code and in other environments, such as Copilot coding agent, GitHub Copilot CLI, or OpenAI Codex. Enable the Agent Sessions view with the `setting(chat.agentSessionsViewLocation)` setting.

![Screenshot of the Agents view in VS Code showing multiple agent sessions.](./images/overview/agents-view.png)

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

## Create a new agent session

TODO

## Continue a local session in another agent type

Delegation allows you to transfer tasks between different agent types while preserving context and conversation history.

TODO: add examples and why this is useful

* **Local → Background**: For complex, time-consuming tasks that don't require immediate interaction
* **Local → Cloud**: For large-scale changes requiring remote infrastructure and PR integration

TODO: how to continue (use Continue action in Chat view, planning agent, "/delegate", "assign coding agent" from GH MCP server, "#copilotCodingAgent" tool,  )

## Open session details

Click on an agent session in the Agents view to open a chat editor that displays the full conversation history, file changes, and status updates.

You can interact with the agent directly in this chat editor, providing additional instructions or feedback as needed.

## Review file changes

Click the **File Changes** tab in the session details to see a summary of all modifications made by the agent.

Apply changes to our local workspace

Background agents running in worktree, compare changes and migrate to main workspace / open worktree in new window

Check out PRs created by cloud agents -> session details view or via GH PR and Issues view
    Copilot on My Behalf query

## Related resources

* [Cloud agents](/docs/copilot/agents/cloud-agents.md): Learn about GitHub Copilot Coding Agent and remote execution
* [Background agents](/docs/copilot/agents/background-agents.md): Explore CLI-based agents and autonomous workflows
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create your own AI agents and extensions
* [Chat in VS Code](/docs/copilot/chat/copilot-chat.md): Master local chat and inline editing capabilities
