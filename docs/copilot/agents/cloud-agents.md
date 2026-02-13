---
ContentId: 8d5c9f2a-1e4b-7c9f-3a8e-2b7d4f1c6e0a
DateApproved: 02/04/2026
MetaDescription: Use cloud agents and GitHub Copilot coding agent in VS Code to autonomously handle coding tasks with automatic pull request generation and team collaboration workflows.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- cloud agent
- copilot coding agent
---

# Cloud agents in Visual Studio Code

Cloud agents perform AI-powered coding tasks and run on remote infrastructure for scalable, isolated execution. Cloud agents run autonomously on remote infrastructure. For example, the GitHub Copilot coding agent run on GitHub's infrastructure and integrates with your GitHub repositories for team collaboration.

This article covers the key features of cloud agents, and how to start and manage cloud agent sessions for coding tasks that can range anywhere from simple to complex.

![Screenshot of cloud agent session as a chat editor in VS Code.](../images/cloud-agents/cloud-agent-session.png)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to experience local, background, and cloud agents in VS Code.

* [Start tutorial](/docs/copilot/agents/agents-tutorial.md)

</div>

## What are cloud agents?

Unlike local and background agents that run on your local machine, cloud agents like Copilot coding agent run on remote infrastructure. You can view and manage all your cloud agent sessions from the unified Chat view in VS Code. This view also lets you create new cloud agent sessions directly from VS Code or hand off local or background agent conversations to cloud agents.

VS Code supports different cloud agents, such as Copilot coding agent and [third-party agents](/docs/copilot/agents/third-party-agents.md) like Claude and Codex.

Because cloud agents run remotely without user interaction, they are well-suited for tasks that have a well-defined scope and all necessary context. Their integration with pull requests makes them very effective for team collaboration.

Due to their remote execution environment, cloud agents can't directly access VS Code built-in tools and run-time context (like failed tests or text selections). They are limited to the MCP servers and language models that are configured in the cloud agent service.

To assign a task to a cloud agent, you can either create a new cloud session directly from the Chat view or hand off a local or background agent conversation from VS Code to a cloud agent.

### GitHub Copilot coding agent

The **GitHub Copilot coding agent** is the primary cloud agent available in VS Code with your Copilot subscription.

Key capabilities include:

* Large-scale refactoring across your GitHub repository
* Complete feature implementation from high-level requirements
* Automatic pull request generation with detailed descriptions
* Code review integration and feedback addressing

### Third-party cloud agents

VS Code supports third-party cloud agents like Claude coding agent and Codex coding agent as options for cloud agent sessions.

Learn more about [third-party agents in VS Code](/docs/copilot/agents/third-party-agents.md).

## Start a cloud agent session

You can start a cloud agent session either directly by sending a chat prompt to a cloud agent or by handing off an ongoing local or background conversation to a cloud agent. Handing off an ongoing conversation is especially useful for complex tasks that require initial clarification or planning before autonomous execution.

If you prefer to work in the browser, you can also start cloud agent sessions directly from GitHub.com using the [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents).

### Create a new cloud agent session

To create a new cloud agent session:

1. In the Chat view, select **New Chat** from the session list dropdown and choose **Cloud** from the session type dropdown

    Alternatively, you can run the **Chat: New Cloud Agent** command from the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the cloud agent provider from the dropdown and optionally select a custom agent and model.

1. Enter your prompt and let the cloud agent work on the task

   For example, you might enter:

   ```text
   Refactor the authentication module to improve security and performance. Implement OAuth2 and JWT for token management, and optimize database queries for user sessions.
   ```

1. The cloud agent starts working on the task remotely. You can monitor the progress of the session in the Chat view and continue to interact with it.

> [!NOTE]
> If you have assigned an issue or pull request to the Copilot coding agent on GitHub.com, the session automatically appears in the session list in VS Code.

### Hand off an agent session to a cloud agent

For complex tasks, it can be helpful to first interact with a local agent in VS Code chat to clarify requirements, for example with the Plan agent, and then hand off the task to a cloud agent for autonomous execution. When you hand off a local agent conversation to a cloud agent session, the entire chat context is passed to the cloud agent.

To hand off a local agent session to a cloud agent session:

1. Open an ongoing local agent session in the Chat view.

1. Select the session type dropdown, and select **Cloud** to continue the session as a cloud agent.

    If you're using the [Plan agent](/docs/copilot/agents/planning.md), you can select **Continue in Cloud** from the **Start Implementation** dropdown to run the plan implementation in a cloud agent session

1. Alternatively, type `@cloud` in the chat input to hand off the task to a cloud agent

To hand off a background agent session to a cloud agent session, enter `/delegate` in the chat input of the background agent session. This command passes the full chat history and context to a new cloud agent session, which you can then monitor in the Chat view.

## View and manage cloud agent sessions

You can view and manage all your cloud agent sessions from the Chat view in VS Code. Filter the session list to show only cloud agent sessions by selecting the **Cloud Agents** from the filter options.

![Screenshot of cloud agent filter in VS Code Chat view.](../images/cloud-agents/cloud-agent-filter.png)

Select a cloud agent session from the list to open the session details in the Chat view. If you prefer to view the session in an editor tab (chat editor), right-click the session and select **Open as Editor**.

![Screenshot of cloud agent session as a chat editor in VS Code.](../images/cloud-agents/cloud-agent-session.png)

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and delegation
* [Background agents](/docs/copilot/agents/background-agents.md): Learn about CLI-based autonomous agents for isolated development
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create custom agent roles and personas
* [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents): Managing agents on GitHub.com
