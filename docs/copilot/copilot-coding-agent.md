---
ContentId: f8b9e2a4-7c1d-4f5e-9a8b-3d2e1f0c6789
DateApproved: 07/18/2025
MetaDescription: Learn how to use the GitHub Copilot Coding Agent to autonomously implement features and fix bugs by assigning GitHub issues to Copilot in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot Coding Agent

[GitHub Copilot Coding Agent](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent) is an autonomous AI developer that works independently in the background to complete development tasks. You can assign GitHub issues to Copilot or delegate tasks from Copilot Chat, and the agent will work autonomously to implement features, fix bugs, and make changes across your repository using its own isolated development environment.

![GIF showing how to assign an issue to Copilot Coding Agent from within VS Code.](../../blogs/2025/07/17/assign-to-copilot-gif.gif)

> [!NOTE]
> Copilot Coding Agent is in public preview and subject to change. During the preview, use of the feature is subject to [GitHub Pre-release License Terms](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms).


## What Copilot Coding Agent can do

Copilot Coding Agent is a GitHub-hosted autonomous agent that works independently in an isolated environment to complete development tasks, such as:

* **Fix bugs and implement features** across multiple files
* **Improve test coverage** and run automated checks
* **Refactor code and address technical debt**
* **Create pull requests** and work independently of your local environment

This is different from the local [agent mode](/docs/copilot/chat/chat-agent-mode.md) in VS Code, which runs locally in your editor and requires your active participation during the coding session.

## How it works

The Copilot Coding Agent workflow:

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

Before you can use Copilot Coding Agent, you need:

* **GitHub Copilot subscription**: Available with Copilot Pro, Pro+, Business, or Enterprise plans
* **Write access**: You must have write permissions to the repository
* **Enable the agent**: Copilot Coding Agent must be enabled for your account or organization
* **VS Code setup**: Install the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

**Optional**: Enable the experimental setting `setting(githubPullRequests.codingAgent.uiIntegration)` to show a **Delegate to coding agent** button in Copilot Chat for easier task delegation.

> [!TIP]
> If you don't have Copilot access yet, you can sign up for the [Copilot Free plan](https://github.com/features/copilot/plans) to get a monthly limit of interactions.

## Getting started in VS Code

### Method 1: Assign issues to Copilot

1. In the **GitHub Pull Requests** view, navigate to the **Issues** section

1. Find the issue you want to assign to Copilot

1. Right-click the issue and select **Assign to Copilot** or click the assign button and select `@copilot`

1. The agent will begin working on the issue in the background

   ![Screenshot showing the GitHub Pull Requests view, highlighting the assign to Copilot action, and the PR query for work assigned to Copilot.](../../release-notes/images/1_101/github-pull-request-coding-agent.png)

### Method 2: Delegate from Copilot Chat

1. Open Copilot Chat (`kb(workbench.action.chat.open)`)

1. Have a conversation about the feature or change you want to implement

1. When ready, delegate to the agent using one of these methods:

   **Use the delegate button (Experimental)**

   Enable the experimental setting `setting(githubPullRequests.codingAgent.uiIntegration)` to show a **Delegate to coding agent** button in the Chat view for repositories that have the agent enabled. Select this button to hand off your current chat context to the Coding Agent.

   <video src="../../blogs/2025/07/17/delegate-to-coding-agent.mp4" title="Video showing how to delegate to Coding Agent from VS Code chat." controls poster="../../blogs/2025/07/17/delegate-to-coding-agent-poster.png"></video>

   **Use the #copilotCodingAgent tool**

   You can also reference the tool directly in your prompt to ask Copilot to continue a local change in the background. This tool automatically pushes pending changes to a remote branch and initiates a coding agent session:

   ![Screenshot showing handing off a session to Copilot coding agent](../../release-notes/images/1_102/coding-agent-start.png)

1. The agent will create a pull request and begin implementing the discussed changes

## Tracking agent progress

### Monitor work in VS Code

The GitHub Pull Requests extension provides a dedicated **Copilot on My Behalf** section that shows:

* All active Copilot Coding Agent sessions
* Pull requests created by the agent
* Progress status for each task
* Numeric badges indicating new changes or updates

![Screenshot showing status of multiple coding agent pull requests](../../release-notes/images/1_102/coding-agent-status.png)

### View detailed session logs

1. In the Pull Requests view, find your agent's work under **Copilot on My Behalf**

1. Select **View Session** to see a detailed log of everything the agent did:
   * Commands executed
   * Files modified
   * Tests run
   * Decision-making process

   ![Screenshot showing the session log of a coding agent session.](../../release-notes/images/1_102/coding-agent-session-log.png)

> [!TIP]
> When working with pull requests created by the Coding Agent, the `#activePullRequest` tool is automatically attached to chat, allowing you to maintain context and continue working on the pull request with access to the coding agent session information.

### Cancel a running session

If you need to stop the agent, you can stay in VS Code and use the **Cancel Coding Agent** button on the PR overview page.

You can also cancel a session from GitHub.com:
1. Go to your GitHub repository on GitHub.com
1. Navigate to the **Actions** tab
1. Find the running Copilot Coding Agent workflow
1. Select **Cancel workflow**

## Reviewing and iterating

### When the agent completes work

The Copilot Coding Agent will:

* Create a pull request with all changes
* Assign the PR to you for review
* Request you as a reviewer
* Include a detailed description explaining the implementation
* Add screenshots when applicable (for UI changes)

![Screenshot showing a pull request from Copilot Coding Agent displayed in VS Code with an included screenshot of the implemented feature.](../../blogs/2025/07/17/draft-with-screenshot.png)

### Providing feedback

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

### What's the difference between Copilot Coding Agent and local agent mode?

VS Code offers two autonomous coding experiences:

| Feature | Copilot Coding Agent | Local Agent Mode |
|---------|---------------------|------------------|
| **Where it runs** | GitHub cloud | Your VS Code editor |
| **Independence** | Fully autonomous | Involves user interaction and iteration |
| **Output** | Creates pull requests | Edits files directly |
| **Best for** | Well-defined tasks, background work | Interactive development, immediate feedback |

Learn more about [local agent mode](/docs/copilot/chat/chat-agent-mode.md).

### Why isn't the agent starting?

* Verify Copilot access on your GitHub account
* Ensure you have write permissions to the repository
* Check that Copilot Coding Agent is enabled for your organization

### Why are implementations incomplete?

* Review the session logs for any errors encountered
* Check if tests failed during the agent's work
* Provide more detailed requirements in your issue description

### What security protections does Copilot Coding Agent have?

Copilot Coding Agent includes built-in security protections and operates within GitHub's security framework. For detailed information about security measures, permissions, and branch protection compatibility, see the [GitHub Copilot Coding Agent security documentation](https://docs.github.com/en/copilot/concepts/about-copilot-coding-agent#built-in-security-protections).

### Can I extend Copilot Coding Agent with external tools?

For advanced scenarios, you can extend Copilot Coding Agent with Model Context Protocol (MCP) servers to give it access to:

* External databases
* Cloud services
* APIs and third-party integrations
* Custom development tools

Learn more about [extending Copilot Coding Agent with MCP](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/extending-copilot-coding-agent-with-mcp).

### What are the current limitations?

* **Cross-repository changes**: Can only work within the repository where the issue is assigned
* **Multiple PRs per task**: Opens exactly one pull request per assigned task
* **Existing PR modifications**: Cannot work on pull requests it didn't create

For detailed information about limitations, compatibility, and usage costs, see the [GitHub Copilot Coding Agent documentation](https://docs.github.com/en/copilot/using-github-copilot/coding-agent).

## Getting help

### Hands-on practice

Try the [Expand your team with Copilot coding agent](https://github.com/skills/expand-your-team-with-copilot/) Skills exercise for practical experience.

## Next steps

* Enable Copilot Coding Agent by following the [GitHub setup guide](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/enabling-copilot-coding-agent)
* Try [local agent mode](/docs/copilot/chat/chat-agent-mode.md) in VS Code for immediate, interactive coding assistance
* Learn about [Copilot Chat](/docs/copilot/chat/copilot-chat.md) for conversational AI help

## Related resources

* [GitHub Copilot Coding Agent documentation](https://docs.github.com/en/copilot/using-github-copilot/coding-agent)
* [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
