---
ContentId: 7c4b8b5e-2d3f-4e8a-9b2c-1a5d6f8e9c0b
DateApproved: 3/4/2026
MetaDescription: Learn about different types of AI agents in VS Code, including local chat, background agents, and cloud agents for coding tasks.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- autonomous
- multi-file editing
- architecture
- refactoring
- deep context
- background agent
- cloud agent
- copilot coding agent
- copilot cli
- third-party agents
---

# Using agents in Visual Studio Code

Agents automate complete coding tasks end-to-end, from implementing features across multiple files to architecture-level refactoring and framework migrations. In Visual Studio Code, you can create agent sessions that run locally or in the cloud, interactively or in the background. The unified Chat view gives you a central place to manage and monitor all your agent sessions, regardless of where they run.

This article provides an overview of the various agent types, how to create and manage agent sessions, delegate tasks between agents, and track their progress. For more about how agents work, including the agent loop, context, and tools, see [How AI works in VS Code](/docs/copilot/core-concepts.md).

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="true" title="Learn about AI core concepts">
Get an overview of the core concepts and how AI agents work in VS Code.

* [Learn about AI core concepts](/docs/copilot/core-concepts.md)

</div>

![Screenshot of an agent session in VS Code showing code changes and chat interaction.](../images/agents-overview/chat-sessions-view-v3.png)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Create a basic game">
Use agents in VS Code to generate a tic-tac-toe game in your language of choice.

* [Open in VS Code](vscode://GitHub.Copilot-Chat/chat?agent=agent%26prompt=%23newWorkspace%20Create%20a%20basic%20tic-tac-toe%20game.%20Ask%20the%20user%20about%20their%20language%20of%20choice)

</div>

> [!IMPORTANT]
> Enable agents in your VS Code settings (`setting(chat.agent.enabled)`). Your organization might also disable agents - contact your admin to enable this functionality.

## Types of agents

VS Code supports three categories of [agents](/docs/copilot/core-concepts.md#agents), each designed for different use cases and levels of interaction:

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
| Build and test web apps with the integrated browser _(Experimental)_ | [Local agent](/docs/copilot/agents/local-agents.md). See the [browser agent testing guide](/docs/copilot/guides/browser-agent-testing-guide.md). |
| Use specific VS Code extension tools or MCP servers | [Local agent](/docs/copilot/agents/local-agents.md) |
| Implement a well-defined task while I keep working | [Background agent](/docs/copilot/agents/background-agents.md) or [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Explore multiple variants or proof of concepts | [Background agent](/docs/copilot/agents/background-agents.md) or [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Create a PR for team review and collaboration | [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Assign a GitHub issue to an agent | [Cloud agent](/docs/copilot/agents/cloud-agents.md) |
| Use a specific AI provider (Anthropic, OpenAI) | [Third-party agent](/docs/copilot/agents/third-party-agents.md) |

### Local agents

Local agents run directly within VS Code on your machine. You interact with local agents through chat to get immediate results to your prompts. Local agents have full access to your workspace, tools, and models. Use local agents for interactive tasks that require immediate feedback, such as brainstorming, planning, or exploratory work.

Learn more about [local agents in VS Code](/docs/copilot/agents/local-agents.md).

### Background agents

Background agents run non-interactively in the background on your local machine. They use Git worktrees to work isolated from your main workspace, preventing conflicts with your active work. Use background agents for well-defined tasks that have all necessary context, such as implementing a plan.

Learn more about [background agents in VS Code](/docs/copilot/agents/background-agents.md).

### Cloud agents

Cloud agents run on remote infrastructure and integrate with GitHub repositories and pull requests for team collaboration and code reviews. Use cloud agents for well-defined tasks where you want to collaborate with team members through pull requests, or for tasks that can run without immediate feedback.

Learn more about [cloud agents in VS Code](/docs/copilot/agents/cloud-agents.md).

### Third-party agents

VS Code supports agents from third-party AI providers, like Anthropic and OpenAI. By using third-party agents, you can use the unique capabilities of these providers with your existing GitHub Copilot subscription, while benefiting from VS Code's unified session management and rich editor experience. Depending on the provider, third-party agents can run locally or in the cloud.

Learn more about [third-party agents in VS Code](/docs/copilot/agents/third-party-agents.md).

## Key agent capabilities

| Capability | Description | Learn more |
|---|---|---|
| **Planning** | Use the Plan agent to create detailed implementation plans before starting to code. | [Planning](/docs/copilot/agents/planning.md) |
| **Memory** | Agents save and recall persistent notes across conversations, organized in user, repository, and session scopes. | [Memory](/docs/copilot/agents/memory.md) |
| **Tools** | Extend agents with built-in tools, MCP servers, and extension tools for specialized tasks. | [Tools](/docs/copilot/agents/agent-tools.md) |
| **Subagents** | Delegate subtasks to child agents that run in their own isolated context window. | [Subagents](/docs/copilot/agents/subagents.md) |
| **Custom agents** | Define reusable agent configurations with specific roles, tools, and instructions. | [Custom agents](/docs/copilot/customization/custom-agents.md) |
| **Hand off** | Transfer a session from one agent type to another, carrying over the conversation history. | [Hand off](#hand-off-a-session-to-another-agent) |

## Agent sessions view

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

You can create multiple agent sessions in parallel, each focused on a different task. When you create a new agent session, the previous session stays active, and you can switch between tasks through the [agent sessions view](#agent-sessions-view).

When you create a new agent session, it starts with an empty context window. Each agent session is independent, so context from one session doesn't carry over to another.

You can create a new agent session from the Chat view or by using the corresponding commands in the Command Palette.

1. Open the Chat view and select the **New Session** dropdown (`+`).

    ![Screenshot of creating a new agent session from the Chat view.](../images/agents-overview/create-new-agent-session-v2.png)

1. Choose the agent type from the dropdown. Optionally, select a language model from the model picker.

    ![Screenshot showing agent type dropdown in new chat session.](../images/agents-overview/agent-type-dropdown-jan.png)

1. Enter a prompt to assign a task to the agent. The agent starts working on the task.

    ```prompt
    Generate a diagram that gives a high-level overview of the architecture of this project.
    ```

> [!TIP]
> You can send follow-up prompts while the agent is still working. Choose to [queue the message, steer the current request, or stop and send immediately](/docs/copilot/chat/chat-sessions.md#send-messages-while-a-request-is-running).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## Hand off a session to another agent

You can hand off an existing task from one agent to another agent to take advantage of their unique strengths. For example, create a plan with a local agent, hand off to a background agent for proof of concepts, and then continue with a cloud agent to submit a pull request for team review.

To hand off a local agent session, select a different agent type from the session type dropdown in the chat input box. VS Code creates a new session, carrying over the full conversation history and context. The original session is archived after handoff.

![Screenshot showing the session type dropdown for handing off to another agent.](../images/agents-overview/hand-off-agent-session.png)

In a background agent session, delegate to a cloud agent by entering the `/delegate` command in the chat input box. You can provide additional instructions after the `/delegate` command.

### Assign a coding task to an agent

If you install the [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension, you can assign an agent to implement `TODO` comments in your code.

![Screenshot of assigning a TODO comment to Copilot coding agent.](../images/agents-overview/assign-todo-to-agent.png)

On GitHub.com, or by using the GitHub Pull Requests extension, you can assign GitHub issues to Copilot coding agent by assigning the issue to `copilot` or by mentioning it in an issue comment or pull request to ask for a code review.

## Review and apply file changes

When an agent session completes and makes code changes to your project, the session list shows the file change statistics for that session. To review the changes made by the agent, select the session from the list to open the session details.

![Screenshot of the file changes diff editor in an agent session.](../images/agents-overview/agent-file-changes-v2.png)

Depending on the agent type, you have options to apply the changes made by the agent onto your local workspace, or to check out the branch from the agent session (for cloud agents).

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

* [How AI works in VS Code](/docs/copilot/core-concepts.md): Understand the agent loop, context, and tools that power agents.

* [Agents tutorial](/docs/copilot/agents/agents-tutorial.md): Hands-on tutorial for working with different agent types.

* [Tools](/docs/copilot/agents/agent-tools.md): Extend agents with built-in, MCP, and extension tools.

* [Hooks](/docs/copilot/customization/hooks.md): Execute custom commands at lifecycle events for automation and policy enforcement.

* [Custom agents](/docs/copilot/customization/custom-agents.md): Create your own AI agents and extensions.
