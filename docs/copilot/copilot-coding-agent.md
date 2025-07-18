---
ContentId: f8b9e2a4-7c1d-4f5e-9a8b-3d2e1f0c6789
DateApproved: 07/18/2025
MetaDescription: Learn how to use the GitHub Copilot Coding Agent to autonomously implement features and fix bugs by assigning GitHub issues to Copilot in VS Code.
MetaSocialImage: images/shared/github-copilot-social.png
---
# GitHub Copilot Coding Agent

GitHub Copilot Coding Agent is an autonomous AI developer that works independently in the background to complete development tasks. You can assign GitHub issues to Copilot or delegate tasks from Copilot Chat, and the agent will work autonomously to implement features, fix bugs, and make changes across your repository using its own isolated development environment.

> [!NOTE]
> Copilot Coding Agent is in public preview and subject to change. During the preview, use of the feature is subject to [GitHub Pre-release License Terms](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms).

## What is the Copilot Coding Agent?

The Copilot Coding Agent is a GitHub-hosted autonomous agent that:

* Works independently in an isolated GitHub Actions-powered development environment
* Can be assigned GitHub issues or delegated tasks from VS Code chat
* Creates branches and pull requests automatically
* Implements features across multiple files in your repository
* Runs tests, linters, and other automated checks
* Operates completely independently of your local development environment

This is different from the local [agent mode](/docs/copilot/chat/chat-agent-mode.md) in VS Code, which runs locally in your editor and requires your active participation during the coding session.

## Copilot Coding Agent vs local agent mode

VS Code offers two autonomous coding experiences. While Copilot Coding Agent works independently on GitHub, local agent mode runs within your editor for interactive development.

| Feature | Copilot Coding Agent | Local Agent Mode |
|---------|---------------------|------------------|
| **Where it runs** | GitHub cloud | Your VS Code editor |
| **Independence** | Fully autonomous | Requires your interaction |
| **Duration** | Hours without intervention | Active VS Code session |
| **Output** | Creates pull requests | Edits files directly |
| **Best for** | Well-defined tasks, background work | Interactive development, immediate feedback |

Learn more about [local agent mode](/docs/copilot/chat/chat-agent-mode.md).

## What Copilot Coding Agent can do

Copilot Coding Agent can handle a variety of development tasks:

* **Fix bugs** - Diagnose and resolve issues in your codebase
* **Implement incremental new features** - Add functionality that builds on existing code
* **Improve test coverage** - Write additional tests for your code
* **Update documentation** - Keep docs in sync with code changes
* **Address technical debt** - Refactor and improve code quality
* **Implement UI changes** - Create user interface components and styling

## How it works

The Copilot Coding Agent workflow:

1. **Assignment**: You assign a GitHub issue to `@copilot` or delegate a task from VS Code chat
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

> [!TIP]
> If you don't have Copilot access yet, you can sign up for the [Copilot Free plan](https://github.com/features/copilot/plans) to get a monthly limit of interactions.

## Getting started in VS Code

### Enable VS Code integration

To use Copilot Coding Agent from VS Code, you'll need the GitHub Pull Requests extension with a preview setting enabled:

1. Install the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

1. Add this setting to your VS Code configuration:

   ```json
   "githubPullRequests.codingAgent.uiIntegration": true
   ```

### Method 1: Assign issues to Copilot

1. Open the **GitHub Pull Requests** view in VS Code

1. Navigate to the **Issues** section

1. Find the issue you want to assign to Copilot

1. Right-click the issue and select **Assign to Copilot** or click the assign button and select `@copilot`

1. The agent will begin working on the issue in the background

### Method 2: Delegate from Copilot Chat

1. Open Copilot Chat (`kb(workbench.action.chat.open)`)

1. Have a conversation about the feature or change you want to implement

1. When ready, use a prompt like:
   ```
   Please implement this feature using the Copilot Coding Agent
   ```

1. The agent will create a pull request and begin implementing the discussed changes

## Tracking agent progress

### Monitor work in VS Code

The GitHub Pull Requests extension provides a dedicated **Copilot on My Behalf** section that shows:

* All active Copilot Coding Agent sessions
* Pull requests created by the agent
* Progress status for each task

### View detailed session logs

1. In the Pull Requests view, find your agent's work under **Copilot on My Behalf**

1. Select **View Session** to see a detailed log of everything the agent did:
   * Commands executed
   * Files modified
   * Tests run
   * Decision-making process

### Cancel a running session

If you need to stop the agent:

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

### Providing feedback

You can guide the agent's work through pull request comments:

1. **Request changes**: Leave specific feedback about what needs to be modified

   ```
   Please update the login form to include password strength validation
   ```

1. **Ask questions**: Get clarification about implementation decisions

   ```
   Why did you choose this authentication library over others?
   ```

1. **Request improvements**: Ask for additional features or refinements

   ```
   Can you add error handling for network timeouts?
   ```

The agent will respond to your feedback, make the requested changes, and update the pull request.

## Example tasks

Here are some examples of tasks you can assign to Copilot Coding Agent:

```
Add a shopping cart feature with add, remove, and checkout functionality
```

```
Fix the memory leak in the image processing pipeline and add proper error handling
```

```
Refactor the authentication system to use dependency injection and add unit tests
```

```
Add integration with payment processing including webhooks and error handling
```

```
Implement user authentication using JWT tokens with refresh token rotation and bcrypt for password hashing
```

## Security and permissions

### Built-in security protections

Copilot Coding Agent includes several security measures:

* **Repository access**: Only works in repositories where you have write permissions
* **Branch restrictions**: Can only create and push to branches beginning with `copilot/`
* **Sandbox environment**: Runs in an isolated development environment with controlled internet access
* **Review requirements**: Cannot approve or merge its own pull requests
* **User validation**: Only responds to feedback from users with write permissions

### Branch protection compatibility

* Works with most branch protection rules
* Pull requests require approval from a user with write permissions
* The person who assigned the task cannot approve the resulting pull request
* Draft PRs require approval before Actions workflows can run

> [!IMPORTANT]
> If you have "Require signed commits" enabled, you'll need to rewrite the commit history before merging, as Copilot does not sign its commits.

## Limitations

### What Copilot Coding Agent cannot do

* **Cross-repository changes**: Can only work within the repository where the issue is assigned
* **Multiple PRs per task**: Opens exactly one pull request per assigned task
* **Existing PR modifications**: Cannot work on pull requests it didn't create

For detailed information about limitations, compatibility, and usage costs, see the [GitHub Copilot Coding Agent documentation](https://docs.github.com/en/copilot/using-github-copilot/coding-agent).

## Best practices

### Writing effective prompts

Be specific about requirements and include technical preferences:

```
Add user management with admin and regular user roles, including profile editing and password reset functionality using JWT tokens with bcrypt password hashing
```

Provide context about existing code and specify testing requirements:

```
Add payment processing to the existing e-commerce app, integrating with the current Order model and including comprehensive unit tests
```

### Effective collaboration

* **Review promptly**: The agent can iterate quickly on feedback
* **Be specific with change requests**: Clear, detailed feedback leads to better results
* **Start small**: Try simpler tasks first to understand how the agent works with your codebase
* **Start small**: Try simpler tasks first to understand how the agent works with your codebase

## Extending with MCP servers

For advanced scenarios, you can extend Copilot Coding Agent with Model Context Protocol (MCP) servers to give it access to:

* External databases
* Cloud services
* APIs and third-party integrations
* Custom development tools

Learn more about [extending Copilot Coding Agent with MCP](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/extending-copilot-coding-agent-with-mcp).

## Settings

Configure Copilot Coding Agent integration in VS Code:

* `setting(githubPullRequests.codingAgent.uiIntegration)`: Enable VS Code integration with Copilot Coding Agent

## Getting help

### Hands-on practice

Try the [Expand your team with Copilot coding agent](https://github.com/skills/expand-your-team-with-copilot/) Skills exercise for practical experience.

### Troubleshooting

**Agent not starting:**
* Verify Copilot access on your GitHub account
* Ensure you have write permissions to the repository
* Check that Copilot Coding Agent is enabled for your organization

**Incomplete implementations:**
* Review the session logs for any errors encountered
* Check if tests failed during the agent's work
* Provide more detailed requirements in your issue description

## Next steps

* Enable Copilot Coding Agent by following the [GitHub setup guide](https://docs.github.com/en/copilot/using-github-copilot/coding-agent/enabling-copilot-coding-agent)
* Try the [local agent mode](/docs/copilot/chat/chat-agent-mode.md) for immediate, interactive coding assistance
* Learn about [Copilot Chat](/docs/copilot/chat/copilot-chat.md) for conversational AI help
* Explore [Smart Actions](/docs/copilot/copilot-smart-actions.md) for quick code improvements

## Related resources

* [GitHub Copilot Coding Agent documentation](https://docs.github.com/en/copilot/using-github-copilot/coding-agent)
* [Responsible use of Copilot Coding Agent](https://docs.github.com/en/copilot/responsible-use-of-github-copilot-features/responsible-use-of-copilot-coding-agent-on-githubcom)
* [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
* [Local agent mode comparison](/docs/copilot/chat/chat-agent-mode.md)
