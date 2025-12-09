---
ContentId: 8d5c9f2a-1e4b-7c9f-3a8e-2b7d4f1c6e0a
DateApproved: 11/12/2025
MetaDescription: Use cloud agents and GitHub Copilot coding agent in VS Code to autonomously handle complex, large-scale coding tasks with automatic pull request generation and team collaboration workflows.
MetaSocialImage: ../images/shared/github-copilot-social.png
---

# Cloud agents in Visual Studio Code

Cloud agents in Visual Studio Code are remote-hosted AI assistants that handle complex, large-scale coding tasks. Unlike local agents that operate within VS Code's chat interface, cloud agents run on remote servers with seamless integration into collaborative workflows. Copilot coding agent is the primary cloud agent available in VS Code.

This article covers the key features of cloud agents, and how to start and manage cloud agent sessions for complex coding tasks.

## What are cloud agents?

Cloud agents are autonomous AI assistants that run on remote infrastructure rather than locally on your machine. When you delegate a task to a cloud agent, it operates independently while maintaining full integration with your GitHub repositories, pull requests, and team workflows.

Cloud agents excel at multi-file operations and repository-wide changes. The cloud agent uses branching and pull requests to manage changes, allowing for team review and collaboration.

The Agents view in VS Code provides visibility into all your cloud agent sessions. You can view the list of sessions, their status, and detailed progress information. You can also provide follow-up instructions or review generated pull requests directly from the view.

To assign a task to a cloud agent, you can create a new cloud session directly from the Agents view, or continue a local or background agent session from your local machine to a cloud agent for autonomous execution.

### GitHub Copilot coding agent

The **GitHub Copilot coding agent** is the primary cloud agent available in VS Code.

Key capabilities include:

* Large-scale refactoring across your GitHub repository
* Complete feature implementation from high-level requirements
* Automatic pull request generation with detailed descriptions
* Code review integration and feedback addressing

## Start a cloud agent session

Depending on your workflow, you can start cloud agent sessions in several ways. You can create a new session from the Agents view or submit a local chat prompt to a cloud agent.

Another approach - especially for complex tasks - is to first interact with a local agent in chat in VS Code, and once the scope and details are clear, continue the task in a cloud agent session. For example, you might use the [Plan agent](/docs/copilot/chat/chat-planning.md) to outline a multi-step feature implementation, then delegate the actual coding to a cloud agent.

If you prefer to work in the browser, you can also start cloud agent sessions directly from GitHub.com using the [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents).

> [!NOTE]
> You currently can't specify which language model a cloud agent uses.

### Create a cloud agent session from the Agents view

To create a new cloud agent session from the Agents view in VS Code:

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Select the **Agents** tab to switch to the Agents view

   In the Agents view, you can see all active agent sessions, including local chat agents, background agents, and cloud agents.

1. Select the **New Session** dropdown > **New Cloud Session**

A chat editor opens where you can provide the task details and start the cloud session.

### Submit a chat request to a cloud agent

You can delegate tasks to cloud agents directly from the Chat view (`kb(workbench.action.chat.open)`) by submitting a prompt with the `@cloud` prefix or using the **Continue Chat In** > **Cloud** option.

The cloud agent session starts automatically, carrying over the full chat history and context. You can monitor the cloud agent's progress in the Agents view.

### Continue a local agent session with a cloud agent

For complex tasks, it can be helpful to first interact with a local agent in VS Code chat to clarify requirements, then hand off the task to a cloud agent for autonomous execution. When you continue a local agent conversation as a cloud session, the entire chat context is passed to the cloud agent.

To continue a local agent session in a cloud agent session:

1. Open the Chat view (`kb(workbench.action.chat.open)`)

1. Interact with a local agent until you're ready to pass the task to a cloud agent

1. To continue in a cloud agent:

    * Select **Continue Chat in** and then select **Cloud**

    * If you're using the [Plan agent](/docs/copilot/chat/chat-planning.md), select the **Start Implementation** dropdown and the select **Continue in Cloud** to run the implementation in a cloud agent session

        ![Screenshot showing the "Start Implementation" button in VS Code chat interface.](../images/background-agents/plan-agent-start-implementation-background.png)

The cloud agent session starts automatically, carrying over the full chat history and context. You can monitor the cloud agent's progress in the Agents view.

### Continue a background agent session with a cloud agent

To continue a background agent session in a cloud agent session, enter `/delegate` in the chat input of the background agent session. This command passes the full chat history and context to a new cloud agent session, which you can then monitor in the Agents view.

## View cloud agent session details

To view the conversation history of a cloud agent session, select the session in the Agents view. A chat editor opens, displaying the full conversation history and any code changes made by the agent.

In the chat editor, you can provide additional instructions to the cloud agent or review the changes it made. When the cloud agent completes its task, it creates a pull request in the associated GitHub repository. Alternatively, you can request the agent to make further modifictations by reviewing the PR on GitHub.com or in VS Code via the [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension.

When you have installed the GitHub Pull Requests extension, you can view the pull requests created by Copilot coding agent from the Pull Requests view, under the category **Copilot On My Behalf**.

![Screenshot of the Pull Requests view in VS Code showing pull requests created by Copilot coding agent.](../images/cloud-agents/copilot-on-my-behalf-pull-requests.png)

## Related resources

* [Agents overview](/docs/copilot/agents/overview.md): Understand different agent types and delegation
* [Background agents](/docs/copilot/agents/background-agents.md): Learn about CLI-based autonomous agents for isolated development
* [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents): Managing agents on GitHub.com
