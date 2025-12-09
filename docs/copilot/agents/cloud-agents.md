---
ContentId: 8d5c9f2a-1e4b-7c9f-3a8e-2b7d4f1c6e0a
DateApproved: 11/12/2025
MetaDescription: Use cloud agents and GitHub Copilot coding agent in VS Code to autonomously handle coding tasks with automatic pull request generation and team collaboration workflows.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Cloud agents in Visual Studio Code

Cloud agents perform AI-powered coding tasks and run on remote infrastructure for scalable, isolated execution. Cloud agents like Copilot coding agent integrate with GitHub repositories and pull requests to enable team collaboration and code reviews. Cloud agents operate isolated from your local workspace via branches and pull requests to prevent interference.

This article covers the key features of cloud agents, and how to start and manage cloud agent sessions for coding tasks that can range anywhere from simple to complex.

![Screenshot of cloud agent session as a chat editor in VS Code.](../images/cloud-agents/cloud-agent-session.png)

## What are cloud agents?

Unlike local and background agents that run on your local machine, cloud agents like Copilot coding agent run on remote infrastructure. You can view and manage all your cloud agent sessions from the unified Chat view in VS Code. This view also lets you create new cloud agent sessions directly from VS Code or hand off local or background agent conversations to cloud agents.

Because cloud agents run remotely without user interaction, they are well-suited for tasks that have a well-defined scope and all necessary context. Their integration with pull requests makes them very effective for team collaboration.

Due to their remote execution environment, cloud agents can't directly access VS Code built-in tools and run-time context (like failed tests or text selections). They are limited to the MCP servers and language models that are configured in the cloud agent service.

To assign a task to a cloud agent, you can either create a new cloud session directly from the Chat view or hand off a local and background agent conversation from VS Code to a cloud agent.

### GitHub Copilot coding agent

The **GitHub Copilot coding agent** is the primary cloud agent available in VS Code.

Key capabilities include:

* Large-scale refactoring across your GitHub repository
* Complete feature implementation from high-level requirements
* Automatic pull request generation with detailed descriptions
* Code review integration and feedback addressing

## View and manage cloud agent sessions

You can view and manage all your cloud agent sessions from the Chat view in VS Code. Filter the session list to show only cloud agent sessions by selecting the **Cloud Agents** from the filter options.

![Screenshot of cloud agent filter in VS Code Chat view.](../images/cloud-agents/cloud-agent-filter.png)

Select a cloud agent session from the list to open the session details in the Chat view. If you prefer to view the session in an editor tab (chat editor), right-click the session and select **Open as Editor**.

![Screenshot of cloud agent session as a chat editor in VS Code.](../images/cloud-agents/cloud-agent-session.png)

## Start a cloud agent session

Depending on your workflow, you can start cloud agent sessions in several ways. You can create a new session from the Chat view or submit a local chat prompt to a cloud agent.

Another approach - especially for more complex tasks - is to first interact with a local agent in chat in VS Code, and once the scope and details are clear, hand off the task to a cloud agent session. For example, you might use the [Plan agent](/docs/copilot/chat/chat-planning.md) to outline a multi-step feature implementation, then hand off the actual coding to a cloud agent.

If you prefer to work in the browser, you can also start cloud agent sessions directly from GitHub.com using the [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents).

> [!NOTE]
> You currently can't specify which language model a cloud agent uses.

### Create a cloud agent session from the Chat view

You can create a new cloud agent session in VS Code in several ways:

* From the Chat view:

    1. Open the Chat view (`kb(workbench.action.chat.open)`)

    1. Select the **New Chat** dropdown > **New Cloud Agent**

* While you're in a local chat session:

    * Type `@cloud <task description>` in the chat input and send the message

    * Enter a prompt and then select **Continue In** > **Cloud**

* Run the **Chat: New Cloud Agent** command from the Command Palette (`kb(workbench.action.showCommands)`)

A new cloud agent session opens where you can provide additional task details and track the progress of the cloud agent session.

### Hand off an agent session to a cloud agent

For complex tasks, it can be helpful to first interact with a local agent in VS Code chat to clarify requirements, then hand off the task to a cloud agent for autonomous execution. When you hand off a local agent conversation to a cloud agent session, the entire chat context is passed to the cloud agent.

To hand off a local agent session to a cloud agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Interact with a local agent until you're ready to hand off the task to a cloud agent

1. To hand off to a cloud agent:

    * Select **Continue In** and then select **Cloud**

    * If you're using the [Plan agent](/docs/copilot/chat/chat-planning.md), select the **Start Implementation** dropdown and then select **Continue in Cloud** to run the implementation in a cloud agent session

    * Type `@cloud` in the chat input to hand off the task to a cloud agent

The cloud agent session starts automatically, carrying over the full chat history and context. You can monitor the cloud agent's progress in the Chat view.

To hand off a background agent session to a cloud agent session, enter `/delegate` in the chat input of the background agent session. This command passes the full chat history and context to a new cloud agent session, which you can then monitor in the Chat view.

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and delegation
* [Background agents](/docs/copilot/agents/background-agents.md): Learn about CLI-based autonomous agents for isolated development
* [Custom agents](/docs/copilot/customization/custom-agents.md): Create custom agent roles and personas
* [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents): Managing agents on GitHub.com
