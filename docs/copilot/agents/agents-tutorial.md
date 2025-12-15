---
ContentId: 8f2c9a1b-3d4e-5f6a-7b8c-9d0e1f2a3b4c
DateApproved: 12/10/2025
MetaDescription: Get started with different types of agents in VS Code to run tasks locally, in the background, or in the cloud. Hand off work across agents to use what works best for your workflow.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- ai
- agents
- background agent
- cloud agent
- copilot coding agent
- copilot cli
- tutorial
---

# Tutorial: Work with agents in VS Code

This tutorial walks you through using different types of agents in Visual Studio Code. You build a todo app from scratch, add a theme toggle, and redesign the layout by delegating work across local, plan, background, and cloud agents.

> [!TIP]
> If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of inline suggestions and chat interactions.

## Prerequisites

To complete this tutorial, you need:

* [Visual Studio Code installed on your computer](/download)
* [A GitHub account](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) (for cloud agent workflow)
* [A GitHub Copilot subscription](/docs/copilot/setup.md)

## Step 1: Use a local agent to scaffold an app

In this step, you'll use a local agent to create the initial todo app structure. Local agents are ideal for interactive tasks where you want immediate feedback and results, such as scaffolding a new project or iterating on a new feature.

1. Create a new project folder and open it in VS Code.

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Agent** from the Agents dropdown.

    Optionally, choose a specific language model if you have a preference.

1. Enter the following prompt in the chat input field to scaffold the todo app and select **Send**.

    ```prompt
    Create a simple todo app with HTML, CSS, and JavaScript. Include an input field to add todos, a list to display them, and a delete button for each item.
    ```

    <video src="../images/agents-tutorial/local-agent-todo-app-scaffold.mp4" alt="Video showing a local agent scaffolding a todo app in VS Code." muted autoplay loop></video>

1. Review as the agent generates the different files for the app. Use **Keep** or **Undo** to accept or reject changes as needed.

1. To preview the edits live as you develop, install the [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) extension if you don't have it already.

1. Open the generated HTML file and select **Show Preview** to preview and interact with the app directly in VS Code.

    TODO: add video of this step: show preview, interact with app, make changes in chat, see live update, add element to chat

1. Send additional prompts to enhance the app further. Notice that the preview updates live as you make changes.

    For example, you can ask:

    ```prompt
    Add a feature to mark todos as completed with a strikethrough effect.
    ```

You now have a working todo app that you can extend with additional features. By using a local agent, you can interactively generate and refine your code in real-time.

## Step 2: Use a background agent to implement a feature plan

In this step, you'll use the plan agent to design a theme toggle and then hand off the implementation to a background agent. Background agents are ideal for delegating tasks that don't require immediate interaction. They use Git worktrees to isolate file changes from your main workspace and prevent conflicts.

1. In the Chat view, type the following prompt in the chat input field:

    ```prompt
    Create a plan to add a dark/light theme toggle to the app. The toggle should switch between themes and persist the user's preference.
    ```

1. Select **Plan** from the Agents dropdown and send the prompt. The plan agent breaks down the work needed and creates an implementation plan for the feature.

1. Optionally, provide follow-up prompts to refine the plan.

1. When you're ready, select **Start Implementation** > **Continue in Background** to hand off the plan to a background agent.

1. The background agent creates a Git worktree and starts implementing the changes autonomously. You can track the background agent in the **Sessions** view in the Chat view, where you can see all ongoing agent sessions and their status.

    > [!TIP]
    > While the background agent works, you can continue editing your main workspace without conflicts.

1. Review the changes by the background agent from the chat conversation. Alternatively, right-click the worktree in the **Repositories** view in the Source Control view and open it in a new window to test and review the changes before applying them.

1. Select **Apply** to apply the changes into your main workspace.

You've successfully used a background agent to perform a task autonomously in the background. You can starts multiple background agents for different tasks without interrupting your main workflow.

## Step 3: Use a cloud agent to collaborate on a feature

In this step, you'll use a cloud agent (Copilot coding agent) to redesign the app layout and use pull requests and collaboration features in GitHub. Copilot coding agent runs on remote infrastructure and are ideal for tasks that don't require immediate feedback, don't need to run locally, or involve collaboration through GitHub.

1. First, publish the project to a GitHub repository and add it as a remote to use Copilot coding agent on your project.

    1. Run the **Publish to GitHub** command from the Command Palette (`kb(workbench.action.showCommands)`) and follow the prompts to create a new repository.

    1. Run the **Git: Add Remote** command from the Command Palette and follow the prompts to add your GitHub repository as a remote.

1. In the Chat view, select **New Chat (+)** > **New Cloud Agent** and enter the following prompt:

    ```prompt
    Redesign the todo app layout to improve user experience. Update colors, spacing, typography, and add animations to give it a modern look.
    ```

1. The cloud agent starts a new session to work on your request. It creates a branch and pull request in your GitHub repository.

1. You can track the cloud agent in the **Sessions** view in the Chat view, where you can see all ongoing agent sessions and their status.

    > [!TIP]
    > If you have the GitHub Pull Requests extension installed, you can also track the pull request progress in the **Copilot on my Behalf** view in the GitHub Pull Requests view.

1. Once completed, the cloud agent assigns the pull request to you for review.

1. Right-click the cloud agent session in the **Sessions** view to view additional options, such as checking out the pull request locally or viewing it in GitHub.

1. You can now use the standard GitHub code review workflow with your team to review, comment, and merge the pull request.

You've successfully used a cloud agent to collaborate on a feature using GitHub. Cloud agents enable you to leverage remote resources and collaborate seamlessly through GitHub.

## Next steps

You've successfully used different types of agents to build, enhance, and redesign a todo app. Continue exploring agents:

* Learn about [agent types and when to use them](/docs/copilot/agents/overview.md)
* Explore [creating custom agents](/docs/copilot/customization/custom-agents.md)
* Read about [prompt engineering for better results](/docs/copilot/guides/prompt-engineering-guide.md)
