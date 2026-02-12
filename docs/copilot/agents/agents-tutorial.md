---
ContentId: 8f2c9a1b-3d4e-5f6a-7b8c-9d0e1f2a3b4c
DateApproved: 02/04/2026
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

In this step, you use a local agent to create the initial todo app structure. Local agents are ideal for interactive tasks where you want immediate feedback and results, such as scaffolding a new project or iterating on a new feature.

1. Create a new project folder and ensure it's under Git version control.

    ```bash
    mkdir todo-app
    cd todo-app
    git init
    ```

1. Open the project folder in VS Code.

1. Open the Chat view (`kb(workbench.action.chat.open)`) and select **Agent** from the Agents dropdown.

    Optionally, choose a specific language model if you have a preference.

    > [!IMPORTANT]
    > If you don't see the agent option, make sure agents are enabled in your VS Code settings (`setting(chat.agent.enabled)`). Your organization might also have disabled agents - contact your admin to enable this functionality.

1. Enter the following prompt in the chat input field to scaffold the todo app and select **Send**.

    ```prompt
    Create a simple todo app with HTML, CSS, and JavaScript. Include an input field to add todos, a list to display them, and a delete button for each item.
    ```

    <video src="../images/agents-tutorial/local-agent-todo-app-scaffold-v2.mp4" alt="Video showing a local agent scaffolding a todo app in VS Code." muted autoplay loop></video>

1. Review as the agent generates the different files for the app. Use **Keep** or **Undo** to accept or reject changes as needed.

1. You can preview the changes in the integrated browser.

    * Enable the integrated browser for `localhost` URLs by configuring `setting(workbench.browser.openLocalhostLinks)`

    * Open the `index.html` file and select the **Preview** button.

1. Send additional prompts to enhance the app further. Notice that the preview updates live as you make changes.

    For example, you can ask:

    ```prompt
    Mark todos as completed with a strikethrough effect.
    ```

You now have a working todo app that you can extend with additional features. By using a local agent, you can interactively generate and refine your code in real-time.

## Step 2: Use a background agent to implement a feature plan

In this step, you use the plan agent to create an implementation plan for a theme toggle and then hand off the implementation to a background agent. Background agents are ideal for delegating tasks that don't require immediate interaction. They use Git worktrees to isolate file changes from your main workspace and prevent conflicts.

1. First, commit your current changes in the Source Control view to have a clean state.

1. In the Chat view, select **New Chat (+)** > **New Chat** to start a new local agent session. Notice that your previous chat session is preserved in the sessions list.

1. Select **Plan** from the Agents dropdown to switch to the plan agent and enter the following prompt:

    ```prompt-plan
    Create a plan to add a dark/light theme toggle to the app. The toggle should switch between themes and persist the user's preference.
    ```

1. The plan agent might ask clarifying questions to refine the plan. Respond as needed.

1. When you're ready, select **Start Implementation** > **Continue in Background** to hand off the plan to a background agent.

    ![Screenshot showing the Start Implementation button in the Chat view.](../images/agents-tutorial/start-implementation-button-v2.png)

1. The background agent creates a Git worktree where it starts implementing the feature. You can track the background agent in the **Sessions** view. Select the session to see details about its progress.

    <video src="../images/agents-tutorial/background-agent-theme-switcher-v2.mp4" alt="Video showing a background agent implementing a theme switcher feature in VS Code." muted autoplay loop></video>

    > [!TIP]
    > While the background agent works, you can continue editing your main workspace without conflicts.

1. Once the background agent finishes, select any of the changed files to review its changes, or select **View All Changes** to open a multi-file diff editor with all the changes.

    > [!TIP]
    > You can send follow-up prompts to the background agent to make adjustments or improvements to the feature.

1. In the Chat view, select **Apply** to apply the changes to your main workspace.

You've successfully used a background agent to perform a task autonomously in the background. You can start multiple background agents for different tasks without interrupting your main workflow.

## Step 3: Use a cloud agent to collaborate on a feature

In this step, you use a cloud agent (Copilot coding agent) to redesign the app layout and use pull requests and collaboration features in GitHub. Copilot coding agent runs on remote infrastructure and are ideal for tasks that don't require immediate feedback, don't need to run locally, or involve collaboration through GitHub.

1. First, publish the project to a GitHub repository and add it as a remote to use Copilot coding agent on your project.

    1. Run the **Publish to GitHub** command from the Command Palette (`kb(workbench.action.showCommands)`) and follow the prompts to create a new repository.

    1. Run the **Git: Add Remote** command from the Command Palette and follow the prompts to add your GitHub repository as a remote.

1. In the Chat view, select **New Chat (+)** > **New Chat**.

1. Select **Cloud** from the session type dropdown to switch to a cloud agent and enter the following prompt:

    ```text
    Redesign the todo app layout to improve user experience. Update colors, spacing, typography, and add animations to give it a modern look.
    ```

1. The cloud agent starts a new session to work on your request. It creates a branch and pull request in your GitHub repository.

    <video src="../images/agents-tutorial/cloud-agent-redesign-todo-app-v2.mp4" alt="Video showing a cloud agent redesigning a todo app in VS Code." muted autoplay loop></video>

1. You can track the cloud agent in the **Sessions** view in the Chat view or select the link to view the pull request details.

    > [!TIP]
    > If you have the GitHub Pull Requests extension installed, you can also track the pull request progress in the **Copilot on my Behalf** view in the GitHub Pull Requests view.

1. Once completed, the cloud agent assigns the pull request to you for review.

    ![Screenshot showing the cloud agent session details, with the file change details.](../images/agents-tutorial/cloud-agent-pull-request.png)

1. Right-click the cloud agent session in the **Sessions** view to view additional options or select the session and choose **Checkout** or **Apply**.

You've successfully used a cloud agent to collaborate on a feature using GitHub. Cloud agents enable you to use remote resources and collaborate on changes through GitHub issues and pull requests.

## Next steps

You've successfully used different types of agents to build, enhance, and redesign a todo app. Continue exploring agents:

* Learn about [agent types and when to use them](/docs/copilot/agents/overview.md)
* Explore [creating custom agents](/docs/copilot/customization/custom-agents.md)
