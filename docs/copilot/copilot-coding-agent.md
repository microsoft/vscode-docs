---
ContentId: f8b9e2a4-7c1d-4f5e-9a8b-3d2e1f0c6789
DateApproved: 07/09/2025
MetaDescription: Learn how to interact with the GitHub Copilot coding agent in VS Code to autonomously implement features and fix bugs in the background.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot coding agent

[GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent) is a GitHub-hosted, autonomous AI developer that works independently in the background to complete development tasks. To invoke the coding agent, assign a GitHub issue to Copilot or delegate a task from chat, and the agent will work autonomously to implement features, fix bugs, and make changes across your repository using its own isolated development environment.

This is different from the local [agent mode](/docs/copilot/chat/chat-agent-mode.md) in VS Code, which runs locally in your editor and requires your active participation during the coding session.

![GIF showing how to assign an issue to Copilot coding agent from within VS Code.](images/copilot-coding-agent/assign-to-copilot-gif.gif)

> [!NOTE]
> Copilot coding agent is in preview and subject to change. During the preview, use of the feature is subject to [GitHub Pre-release License Terms](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms).


## How it works

The Copilot coding agent workflow:

1. **Assignment**: You [assign a GitHub issue to `@copilot`](#method-1-assign-issues-to-copilot) or [delegate a task from VS Code chat](#method-2-delegate-from-copilot-chat)
1. **Analysis**: The agent analyzes the task and your repository structure
1. **Development**: Copilot works in its own isolated GitHub Actions environment where it can:
   * Explore your codebase
   * Make changes across multiple files
   * Run builds and tests
   * Execute linters and other automated checks
1. **Pull request**: The agent creates a pull request with the implementation
1. **Review**: You review the changes and can request modifications through PR comments
1. **Iteration**: The agent responds to feedback and updates the implementation

## Prerequisites

Before you can use Copilot coding agent, you need:

* **GitHub Copilot subscription**: Available with Copilot Pro, Pro+, Business, or Enterprise plans
* **Write access**: You must have write permissions to the repository
* **Enable the agent**: Copilot coding agent [must be enabled](https://docs.github.com/copilot/concepts/coding-agent/enable-coding-agent) for your account or organization
* **VS Code setup**: Install the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

**Optional**: Enable the experimental setting `setting(githubPullRequests.codingAgent.uiIntegration)` to show a **Delegate to coding agent** button in Copilot Chat for easier task delegation.

> [!TIP]
> If you don't have Copilot access yet, you can sign up for the [Copilot Free plan](https://github.com/features/copilot/plans) to get a monthly limit of interactions.

## Assign work to Copilot coding agent in VS Code

### Method 1: Assign issues to Copilot

You can trigger Copilot coding agent by assigning a GitHub issue to Copilot, similar to how you assign an issue to a team member. Copilot coding agent automatically analyzes the issue and starts working on it.

1. In the **GitHub Pull Requests** view, navigate to the **Issues** section

1. Find the issue you want to assign to Copilot

1. Right-click the issue and select **Assign to Copilot** or select **Assign** and then select `@copilot`

1. The agent will begin working on the issue in the background

> [!TIP]
> You can also assign issues to `@copilot` directly on GitHub.com. The coding agent will work the same way, creating a pull request that you can then review in VS Code or on GitHub.
1. Open the Chat view in VS Code (`kb(workbench.action.chat.open)`)
   ![Screenshot showing the GitHub Pull Requests view, highlighting the assign to Copilot action, and the PR query for work assigned to Copilot.](images/copilot-coding-agent/github-pull-request-coding-agent.png)

### Method 2: Delegate from chat

You can also hand off work to Copilot coding agent directly from your chat conversation. Instead of having agent mode implement changes immediately in your editor, you can delegate the task to the coding agent to work on it autonomously in the background.

1. Open the Chat view in VS Code (`kb(workbench.action.chat.open)`)

1. Have a conversation about the feature or change you want to implement

1. When ready, delegate to the agent by using one of these methods:

   **Use the delegate button (Experimental)**

   Enable the experimental setting `setting(githubPullRequests.codingAgent.uiIntegration)` to show a **Delegate to coding agent** button in the Chat view for repositories that have the agent enabled. Select this button to hand off your current chat context to the coding agent.

   <video src="images/copilot-coding-agent/delegate-to-coding-agent.mp4" title="Video showing how to delegate to coding agent from VS Code chat." controls poster="images/copilot-coding-agent/delegate-to-coding-agent-poster.png"></video>

   **Use the #copilotCodingAgent tool**

   You can also reference the `#copilotCodingAgent` tool directly in your prompt to ask Copilot to continue a local change in the background. This tool automatically pushes pending changes to a remote branch and initiates a coding agent session:

   ![Screenshot showing handing off a session to Copilot coding agent](images/copilot-coding-agent/coding-agent-start.png)

1. The agent will create a pull request and begin implementing the discussed changes

## Track agent progress

### Monitor work in VS Code

The GitHub Pull Requests extension provides a dedicated **Copilot on My Behalf** section that shows:

* All active Copilot coding agent sessions
* Pull requests created by the agent
* Progress status for each task
* Numeric badges indicating new changes or updates

![Screenshot showing status of multiple coding agent pull requests](images/copilot-coding-agent/coding-agent-status.png)

> [!TIP]
> You can also monitor work that you assigned to `@copilot` through GitHub.com - all active sessions and pull requests will appear in this section regardless of where you initiated them.

### View detailed session logs

1. In the Pull Requests view, find your agent's work under **Copilot on My Behalf**

1. Select **View Session** to see a detailed log of everything the agent did:
   * Commands executed
   * Files modified
   * Tests run
   * Decision-making process

   ![Screenshot showing the session log of a coding agent session.](images/copilot-coding-agent/coding-agent-session-log.png)

> [!TIP]
> When working with pull requests created by the coding agent, the `#activePullRequest` tool is automatically attached to chat. This gives chat context about your PR, including what files were changed, who's assigned, and the state (draft or ready for review). Attaching this context helps as you may want to learn more about and iterate on the PR in chat.

### Cancel a running session

If you need to stop the agent, you can stay in VS Code and use the **Cancel coding agent** button on the PR overview page.

You can also cancel a session from GitHub.com:
1. Go to your GitHub repository on GitHub.com
1. Navigate to the **Actions** tab
1. Find the running Copilot Coding Agent workflow
1. Select **Cancel workflow**

## Review and iterate

### Work completion

The Copilot coding agent will:

* Create a pull request with all changes
* Assign the PR to you for review
* Request you as a reviewer
* Include a detailed description explaining the implementation
* Add screenshots when applicable (for UI changes)

![Screenshot showing a pull request from Copilot coding agent displayed in VS Code with an included screenshot of the implemented feature.](images/copilot-coding-agent/draft-with-screenshot.png)

### Provide feedback

You can guide the agent's work through pull request comments. Make sure to tag `@copilot` in your comments so the agent will respond:

1. **Request changes**: Leave specific feedback about what needs to be modified

   ```
   @copilot Please update the login form to include password strength validation
   ```

1. **Request improvements**: Ask for additional features or refinements

   ```
   @copilot Can you add error handling for network timeouts?
   ```

The agent will respond to your feedback, make the requested changes, and update the pull request.

## Frequently asked questions

### What's the difference between Copilot coding agent and agent mode?

VS Code offers two autonomous coding experiences. While agent mode provides interactive development directly within the editor, the Copilot coding agent works independently on GitHub to implement features in the background.

| Feature | Copilot coding agent | Agent mode |
|---------|---------------------|------------------|
| **Where it runs** | GitHub cloud | Your VS Code editor |
| **Independence** | Fully autonomous | Involves user interaction and iteration |
| **Output** | Creates pull requests | Edits files directly |
| **Best for** | Well-defined tasks, background work | Interactive development, immediate feedback |

Learn more about agent mode in its [documentation](/docs/copilot/chat/chat-agent-mode.md).

### Why isn't the agent starting?

* Verify Copilot access on your GitHub account
* Ensure you have write permissions to the repository
* Check that Copilot coding agent is enabled for your organization

### Why are implementations incomplete?

* Review the session logs for any errors encountered
* Check if tests failed during the agent's work
* Provide more detailed requirements in your issue description

### What security protections does Copilot coding agent have?

Copilot coding agent includes built-in security protections and operates within GitHub's security framework. For detailed information about security measures, permissions, and branch protection compatibility, see the [GitHub Copilot coding agent security documentation](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent#built-in-security-protections).

### Can I extend Copilot coding agent with external tools?

For advanced scenarios, you can extend Copilot coding agent with Model Context Protocol (MCP) servers to give it access to:

* External databases
* Cloud services
* APIs and third-party integrations
* Custom development tools

Learn more about [extending Copilot coding agent with MCP](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/extending-copilot-coding-agent-with-mcp).

### What are the current limitations?

* **Cross-repository changes**: Can only work within the repository where the issue is assigned
* **Multiple PRs per task**: Opens exactly one pull request per assigned task
* **Existing PR modifications**: Cannot work on pull requests it didn't create

For detailed information about limitations, compatibility, and usage costs, see the [GitHub Copilot Coding Agent documentation](https://docs.github.com/en/copilot/using-github-copilot/coding-agent).

## Getting help

## Next steps

* Enable Copilot coding agent by following the [GitHub setup guide](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/enabling-copilot-coding-agent)
* Try [agent mode in VS Code](/docs/copilot/chat/chat-agent-mode.md) for immediate, interactive coding assistance
* Learn about [using chat in VS Code](/docs/copilot/chat/copilot-chat.md) for conversational AI help

## Related resources

* [GitHub Copilot coding agent documentation](https://docs.github.com/en/copilot/using-github-copilot/coding-agent)
* [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
