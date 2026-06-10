---
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
DateApproved: 6/3/2026
MetaDescription: Get started with agentic coding in Visual Studio Code. Build an app from a prompt with the Agents window and the Chat view, and learn the VS Code basics.
ExperimentFlag: docsGettingStartedV2
---
# Tutorial: Agentic coding in VS Code

> [!NOTE]
> You're viewing the **full-page** variant of this tutorial. This entire article is swapped in at the server for visitors assigned to the `fullpage` arm of the `docsGettingStartedV2` experiment. The canonical page is never rendered for these visitors.

In this tutorial, you learn how to build with AI agents in Visual Studio Code. Agents can plan a solution, create and edit multiple files, run commands, and fix their own errors, all from a single natural-language prompt. You describe what you want, and the agent does the work.

This full-page variant takes a more direct, task-first path: you jump straight into building with an agent and pick up the VS Code basics as you go.

You build a simple personal portfolio page with HTML, CSS, and JavaScript. The page is fully static, so you don't need to install any runtimes or build tools to follow along.

## Prerequisites

* [Download and install Visual Studio Code](/download)

* [Enable AI features in VS Code](/docs/getstarted/overview.md#enable-ai-features)

* [Install Git](https://git-scm.com/)

> [!TIP]
> If you don't have a Copilot subscription yet, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly allowance of inline suggestions and AI credits.

## Build your first feature with an agent

1. On your computer, create a new folder named `myportfolio`.

1. Open the folder in VS Code, then open the Chat view with `kb(workbench.action.chat.open)`.

1. Make sure **Agent** mode is selected in the chat input.

1. Enter the following prompt and press `kbstyle(Enter)`:

    ```prompt
    Create a personal portfolio page with HTML, CSS, and JavaScript in separate files. Include a header with my name and a short bio, a section for projects with cards, and a contact section. Use modern styling and add some sample content.
    ```

1. Review the agent's plan, approve any actions it asks about, and let it create and edit the files.

## Preview and iterate

1. Right-click the generated `index.html` file and select **Open in Integrated Browser** to preview the page without leaving VS Code.

1. Ask the agent for changes in natural language, for example:

    ```prompt
    Change the color theme to dark mode and make the project cards responsive.
    ```

## Commit your work

1. Open the **Source Control** view with `kb(workbench.view.scm)`.

1. Stage your changes, enter a commit message, and select **Commit**.

## Next steps

* [Explore the Agents window](/docs/agents/agents-window.md)

* [Learn VS Code editing features](/docs/editing/getting-started.md)
