---
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
DateApproved: 5/28/2026
MetaDescription: Get started with agentic coding in Visual Studio Code. Build an app from a prompt with the Agents window and the Chat view, and learn the VS Code basics.
---
# Tutorial: Agentic coding in VS Code

In this tutorial, you learn how to build with AI agents in Visual Studio Code. Agents can plan a solution, create and edit multiple files, run commands, and fix their own errors, all from a single natural-language prompt. You describe what you want, and the agent does the work.

You start in the Agents window, a dedicated surface for an agent-first workflow. Then you switch to the Chat view, where an agent assists you while you work in the editor. Along the way, you pick up the VS Code basics you need, like opening a workspace, using the integrated browser, and committing your changes with source control.

You build a simple personal portfolio page with HTML, CSS, and JavaScript. The page is fully static, so you don't need to install any runtimes or build tools to follow along.

> [!TIP]
> If you prefer a video to learn about Visual Studio Code, you can watch the [Getting Started video](https://www.youtube.com/watch?v=f8_uF_IDV50) on our YouTube channel.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Explore agent types">
Follow a hands-on tutorial to explore different agent types like local, CLI, and cloud agents.

* [Start tutorial](/docs/agents/agents-tutorial.md)

</div>

<!-- <div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Watch the introduction video">
Learn about the key features of Visual Studio Code in our introduction video.

* [Watch video](https://www.youtube.com/watch?v=f8_uF_IDV50)

</div> -->

## Prerequisites

* [Download and install Visual Studio Code on your computer](https://code.visualstudio.com/download)
* [Set up GitHub Copilot in VS Code](/docs/setup/copilot.md)
* [Install Git](https://git-scm.com/) on your computer

> [!TIP]
> If you don't have a Copilot subscription yet, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly allowance of inline suggestions and AI credits.

## Create a project folder

Agents work in the context of a folder, also known as a *workspace*. You start by creating a folder for your project. You don't need to open the folder in VS Code yet. In the next step, you open it in the Agents window, which lets you work across multiple workspaces without opening a separate window for each one.

1. On your computer, create a new empty folder named `myportfolio`.

1. Put the folder under Git version control so you can track changes and choose how the agent applies its edits.

    Open a terminal in the `myportfolio` folder, and then run the following command:

    ```bash
    git init
    ```

    > [!TIP]
    > You can also initialize a repository later from the **Source Control** view in VS Code. You use source control near the end of this tutorial to commit your changes.

## Build with the Agents window

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Explore the Agent window">
Learn more about agent-first development with the Agents window in VS Code.

* [Start tutorial](/docs/agents/agents-window.md)

</div>

The Agents window is a dedicated window in VS Code, built for an agent-first workflow. It's optimized for orchestrating tasks across projects, so you can start agent sessions, watch them work, and switch between workspaces without opening a separate window for each one. This is different from the editor window and the Chat view, which are centered on coding within a single workspace.

In this part, you open your folder in the Agents window and build your portfolio page from a single prompt.

> [!NOTE]
> The Agents window is currently in preview. Get more info about the [Agents window](/docs/agents/agents-window.md).

### Open the Agents window

1. In VS Code, select the **Open in Agents** button in the title bar.

    You can also open the Agents window from the VS Code welcome page, or run the **Chat: Open Agents Window** command from the Command Palette (`kb(workbench.action.showCommands)`).

    <!-- TODO screenshot: Open in Agents button in the VS Code title bar. -->

1. If you're prompted to sign in, select a sign-in method and continue.

    The Agents window needs access to your GitHub Copilot subscription to run agent sessions. If you're already signed in to GitHub in VS Code, you're signed in here too.

<!-- ### Get to know the Agents window

The Agents window has a few main areas:

* **Sessions list**: in the sidebar, where you view and manage all your agent sessions across your projects.
* **Chat area**: in the center, where you type prompts and follow the agent's progress.
* **Changes panel**: on the right, where you review the files the agent creates or edits, and a file explorer of your workspace. -->

<!-- TODO screenshot: Agents window interface with the sessions list, chat area, and Changes panel. -->

### Start an agent session

1. Select **New** at the top of the sidebar to start a new session.

    <!-- TODO screenshot: New button at the top of the Agents window sidebar. -->

1. In the workspace dropdown, select your `myportfolio` folder.

    If you're prompted to trust the folder, select **Yes, I trust the authors**.

    > [!IMPORTANT]
    > Workspace Trust lets you decide whether code in your project folder can be executed. When you download code from the internet, you should first review it to make sure it's safe to run. Get more info about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

1. Select **Copilot CLI** as the agent for the session.

    Copilot CLI runs the agent on your local machine. VS Code installs and configures Copilot CLI for you, so there's nothing extra to set up.

    <!-- TODO screenshot: agent dropdown with Copilot CLI selected in the Agents window. -->

1. Notice that the isolation is initialized to **Folder** to let the agent apply changes directly to your workspace.

    If you have an existing Git repo, you can also choose the **Worktree** option, which keeps changes in a separate Git worktree until you're ready to merge them.

    <!-- TODO screenshot: Folder isolation selected when starting a Copilot CLI session. -->

1. Enter the following prompt in the chat input and press `kbstyle(Enter)`:

    ```prompt
    Create a personal portfolio page with HTML, CSS, and JavaScript in separate files. Include a header with my name and a short bio, a section for projects with cards, and a contact section. Use modern styling and add some sample content.
    ```

    The agent plans the work, creates the files, and self-corrects if something goes wrong. It might ask for approval before it runs a command. Review the request and approve it to continue.

    <!-- TODO screenshot: agent generating the portfolio page files in the Agents window. -->

### Preview your page

When you work in an agent-first workflow, your focus might be first on the outcome of the task rather than the code. You can preview the result of your agent's work in the integrated browser without leaving VS Code or setting up a separate development server.

1. Preview the page in the integrated browser.

    In the **Changes** panel, select the **Files** tab to see a file explorer of your workspace. Right-click the `index.html` file and select **Open in Integrated Browser**.

    The integrated browser opens your portfolio page inside VS Code, so you don't need an external browser or a separate development server. Get more info about the [integrated browser](/docs/debugtest/integrated-browser.md).

    <!-- TODO screenshot: portfolio page open in the integrated browser in the Agents window. -->

### Iterate on the design

To iterate on the design, it's often easier to point at an element on the page instead of describing it in words. The integrated browser has a built-in tool that lets you select an element on the page and add it to your prompt as context for the agent.

1. In the integrated browser toolbar, select the **Add Element to Chat** button to enter selection mode.

    <!-- TODO screenshot: Add Element to Chat button in the integrated browser toolbar. -->

1. Select an element on your page, for example the heading with your name or a button.

    The agent adds the selected element to your prompt as context, including its HTML and CSS.

1. Close the browser and enter a prompt that describes the change you want, and press `kbstyle(Enter)`. For example:

    ```prompt
    Make this heading larger and use a gradient color for the text.
    ```

    The agent updates the files to apply your change. Open the integrated browser to see the updated page.

### Review and commit the changes

Before you commit the agent's work, review what changed. The **Changes** panel lists every file the agent created or modified, so you can confirm the result matches your intent.

1. In the **Changes** panel, select the **Changes** tab to see the list of files the agent added or modified.

    <!-- TODO screenshot: Changes tab listing the modified files in the Agents window. -->

1. Select a file to open the diff view and review the agent's edits. You can move between the different files with the navigation controls.

    The diff view shows the changes side by side and highlights the added and removed lines. In this case, there are only new files added.

    <!-- TODO screenshot: file diff open from the Changes panel in the Agents window. -->

> [!TIP]
> When you select a block of text in the diff view, you can provide feedback to the agent about that specific part of the code.

1. Select **Commit Changes** in the **Changes** panel to save the agent's changes to your Git repository. The agent generates a commit message based on the changes.

    <!-- TODO screenshot: Commit button in the Agents window Changes panel. -->

## Write code with agents in the editor

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Explore agents in VS Code">
Learn more about using agents to support for coding workflow in VS Code.

* [Start tutorial](/docs/agents/chat-view.md)

</div>

For some changes, you might prefer a code-first approach, where your focus is on writing code and agents help you in the process. For example, you might want to add a theme switcher and fine-tune the styles as you go. For this approach, you switch to the editor and use the Chat view.

### Open the editor for your workspace

1. In the Agents window, select the **Open in Editor** button in the title bar to open the active workspace in the editor.

1. Notice that the left sidebar shows the **Explorer** view, which displays the files in your workspace. Select a file to open it in an **Editor** tab in the main area.

    You use the Explorer view to view and manage the files and folders in your workspace. You can open as many editors as you like and view them side by side.

    <!-- TODO screenshot: Explorer view showing the generated portfolio files. -->

1. The right sidebar shows the **Chat** view, which shows your session list and lets you start or continue a conversation.

    <!-- TODO screenshot: Chat view showing the session list and input field. -->

### Add a feature from the Chat view

1. Select **New Chat** (`+`) to start a new session.

1. Select **Local** from the **Agent Target** dropdown to run the agent in the context of the editor. It operates directly on your workspace files.

    The local agent runs in VS Code and has access to additional tools that integrate with the editor. For example, it can read linting and compiler errors from your files to fix problems, or launch the integrated browser directly to preview your page.

    <!-- TODO screenshot: Agent Target dropdown with Local selected in the Chat view. -->

1. Enter the following prompt in the chat input and press `kbstyle(Enter)`:

    ```prompt
    Add a theme switcher button that toggles between a light and dark color theme for the page.
    ```

    The agent applies the changes to your files.

1. Review the changes directly in the editor.

    Open a changed file to see the agent's edits as inline diffs. Use the overlay controls to **Keep** or **Undo** individual edits.

    <!-- TODO screenshot: inline diff with Keep and Undo controls in the editor. -->

1. Ask the agent to preview your page in the integrated browser to see the new feature in action. Enter the following prompt to preview the page:

    ```prompt
    Preview the page in the integrated browser.
    ```

> [!TIP]
> When you use a local agent, it can use the agent browser tools to interact with the integrated browser. This can be useful for tasks like previewing a page, but also to enable the agent to validate and iterate on its changes in the browser.

## Next steps

Congratulations! You built a portfolio page with agents, working in both the Agents window and the Chat view. To go deeper with agentic coding in Visual Studio Code, get more info about how to:

* [Explore different agent types and hand off tasks](/docs/agents/agents-tutorial.md)

* [Learn more about the Agents window](/docs/agents/agents-window.md)

* [Learn more about the Chat view](/docs/agents/chat-view.md)
