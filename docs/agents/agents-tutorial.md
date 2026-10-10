---
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
DateApproved: 10/7/2026
MetaDescription: Build an app with AI agents in {% data variables.product.prodname_vscode_shortname %} and learn editor, browser, and source control workflows.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Tutorial: Agentic coding in {% data variables.product.prodname_vscode_shortname %}

In this tutorial, you build a personal portfolio page with AI agents in {% data variables.product.prodname_vscode %}. You describe what you want in natural language, and an agent creates and edits files. You then review and test the result. The app uses HTML, CSS, and JavaScript, so you don't need to install any runtimes or build tools.

You start in the **{% data variables.copilot.agents_window %}** to create the app, then continue the same session in the **{% data variables.copilot.chat_view %}** to refine it alongside your code. Along the way, you learn to open a project folder, preview your app in the integrated browser, and review and commit changes with Git.

{% action-card title="Learn {% data variables.product.prodname_vscode_shortname %} editor features" display="inline" %}
Get familiar with the {% data variables.product.prodname_vscode_shortname %} user interface, editing features, and key productivity tools.

* [Start the {% data variables.product.prodname_vscode_shortname %} editing tutorial](/docs/editing/getting-started/editor-tutorial.md)

{% /action-card %}

## Prerequisites

* [Download and install {% data variables.product.prodname_vscode %}](/download).

* [Enable AI features in {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md#enable-ai-features)

    If you use GitHub Copilot, learn more about [AI credits and model costs](/docs/agents/concepts/language-models.md#ai-credits-and-model-costs) and [what happens when you reach a limit](/docs/agents/agent-troubleshooting/faq.md#i-reached-my-inline-suggestions-or-ai-credits-limit).

* [Install Git](https://git-scm.com/)

## 1. Create a project folder

Agents work in the context of a folder, also referred to as a *workspace* in {% data variables.product.prodname_vscode_shortname %}. You start by creating a folder for your project. Start by creating an empty folder for the tutorial app and enabling Git version control to track your changes.

1. On your computer, create a new folder named `myportfolio`.

    ```bash
    mkdir myportfolio
    ```

1. Put the folder under Git version control to track changes. Open a terminal and run the following commands:

    ```bash
    cd myportfolio
    git init
    ```

## 2. Build features with the {% data variables.copilot.agents_window %}

{% action-card title="Explore the {% data variables.copilot.agents_window %}" display="sidebar" %}
Use the {% data variables.copilot.agents_window %} to run and monitor agent sessions across your projects from a single place in {% data variables.product.prodname_vscode_shortname %}.

* [Learn about the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md)

{% /action-card %}

The {% data variables.copilot.agents_window %} is a dedicated window in {% data variables.product.prodname_vscode_shortname %} that is optimized for working with agents across all your projects without needing to open a separate {% data variables.product.prodname_vscode_shortname %} window for each one.

In this part, you open your folder in the {% data variables.copilot.agents_window %} and task an agent to build your portfolio page.

### Open the {% data variables.copilot.agents_window %}

1. In {% data variables.product.prodname_vscode_shortname %}, select the **Open in Agents** button in the {% data variables.product.prodname_vscode_shortname %} title bar.

    You can also open the {% data variables.copilot.agents_window %} from the {% data variables.product.prodname_vscode_shortname %} welcome page, or run the **Chat: Open {% data variables.copilot.agents_window %}** command from the Command Palette (`kb(workbench.action.showCommands)`).

    ![Screenshot of the Open in Agents button in the {% data variables.product.prodname_vscode_shortname %} title bar.](images/getting-started/open-in-agents-button.png)

1. If you're prompted to sign in, use the GitHub account that has access to {% data variables.product.prodname_copilot %}. This tutorial uses the **Copilot** agent harness. To use your own provider credentials for supported workflows, review the [agent harness authentication options](/docs/agents/run/agent-harnesses.md#configure-a-harness-or-cloud-target).

### Start an agent session

1. Select **New** at the top of the left sidebar to start a new agent session.

    ![Screenshot of starting a new agent session in the redesigned new-session input.](images/agents-quickstart/agent-session-new.png)

    The sidebar shows your list of active agent sessions, grouped by workspace. You can use the sessions list to switch between sessions and their workspace context.

    > [!TIP]
    > If you want to ask a general question, you can also start a chat session that is not tied to a specific workspace.

1. Because the {% data variables.copilot.agents_window %} can operate across different projects, select the `myportfolio` folder you created earlier from the dropdown. This folder becomes the primary execution workspace for the session.

    If {% data variables.product.prodname_vscode_shortname %} asks whether you trust the folder, select **Trust**.

    > [!IMPORTANT]
    > When you download code from the internet, review the code before trusting it to make sure it's safe to run. Get more info about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

1. Configure the following settings for the session. Keep the default values for any other options.

    | Control | Value | Short description |
    |---------|-------|-------------------|
    | **Session Target** | **Copilot** | Uses the {% data variables.product.prodname_copilot_short %} agent harness to run the session on your machine. |
    | **Agent** | **Agent** | Uses tools to plan, edit files, run commands, and validate the result. |
    | **Language model** | **Auto** | Automatically selects a model based on task complexity and availability. |
    | **Permissions** | **Manual permissions** | Requests your approval for running tools or accessing resources. The agent can make file edits in your project folder. |

    ![Screenshot showing the Copilot Session Target, Agent, and Manual permissions in the redesigned new-session input.](images/getting-started/agent-session-select-harness-role.png)

1. Enter the following prompt in the chat input and press `kbstyle(Enter)`:

    ```prompt
    Create a personal portfolio page with HTML, CSS, and JavaScript in separate files. Include a header with my name and a short bio, a section for projects with cards, and a contact section. Use modern styling and add some sample content.
    ```

1. The agent analyzes your request, plans the work, and then starts creating and editing files. If it encounters errors, it self-corrects or asks for clarification and approval.

    ![Screenshot of the agent generating the portfolio page files in the {% data variables.copilot.agents_window %}.](images/getting-started/agent-generating-files.png)

    The **Copilot** agent harness applies and saves edits directly to your project folder. Review the resulting diffs before you commit the changes.

    > [!TIP]
    > If the agent heads in the wrong direction, [steer or stop the request](/docs/chat/chat-overview.md#send-messages-while-a-request-is-running). Stopping doesn't undo completed actions. To undo workspace file changes from a request, [restore a checkpoint](/docs/agents/run/review-code-edits.md#restore-a-checkpoint).

### Preview and iterate on the design

The {% data variables.copilot.agents_window %} is great for workflows where you hand off tasks to the agent and then validate the outcome, rather than the specific code changes. With the integrated browser, you can preview the agent's work without having to leave {% data variables.product.prodname_vscode_shortname %}.

To preview the generated portfolio in the integrated browser:

1. Select the **Files** tab in the left sidebar, right-click the `index.html` file and select **Open in Integrated Browser**.

    The **Files** tab shows all files in the workspace, similar to the **Explorer** view in the editor.

    ![Screenshot of the Files tab in the {% data variables.copilot.agents_window %}, showing the portfolio files and the Open in Integrated Browser option.](images/getting-started/open-in-integrated-browser.png)

1. The integrated browser opens in a new tab in the {% data variables.copilot.agents_window %}, and you can interact with the page as you would in a normal browser.

    ![Screenshot of the portfolio page open in the integrated browser in the {% data variables.copilot.agents_window %}.](images/getting-started/portfolio-integrated-browser.png)

1. Let's make a design change to the page. In the integrated browser, select the **Add Element to Chat** button to enter selection mode.

    ![Screenshot of the integrated browser toolbar, highlighting the Add Element to Chat button.](images/getting-started/add-element-to-chat-button.png)

1. Hover over the page and select an element you want to change, for example select the main title.

    The agent adds the selected element to your prompt as context, including its HTML, CSS, and a screenshot.

1. In the chat input, enter a prompt that describes the change you want, and press `kbstyle(Enter)`. For example:

    ```prompt
    Use a gradient color for the text and use cursive.
    ```

1. The agent applies the change to the element you selected. Refresh the page in the integrated browser to see the updates.

### Review and commit the changes

Before you commit the agent's work, review the code changes that the agent applied. The **Changes** panel shows diffs for every file the agent created or modified during its session. To review and commit the file changes:

1. Select the **Changes** panel to see the diffs of the files the agent added or modified. Each item also shows change stats and an add/delete/update indicator.

    ![Screenshot of the Changes panel in the {% data variables.copilot.agents_window %}, showing the list of files changed by the agent.](images/getting-started/changes-panel.png)

    For keyboard and screen reader access to the diffs, use the [Accessible Diff Viewer](/docs/configure/accessibility/accessibility.md#diff-editor-accessibility).

1. Open the diff from the `index.html` file and select a block of text to open the inline feedback flow. Enter your feedback and then select **Submit**.

    ![Screenshot of the inline feedback flow in the diff view, showing a block of text selected for feedback.](images/getting-started/inline-feedback.png)

    Notice that your feedback is added to the chat conversation, and the agent processes it and applies the change to the file. You can continue to provide feedback on other changes in the diff view.

1. From the changes dropdown, select **Uncommitted Changes** to see the changes that have not yet been committed to your Git repository.

    Use the changes dropdown to switch between branch changes, uncommitted changes, all changes from the session, and changes made during the last agent turn.

    ![Screenshot of the Uncommitted Changes view in the Changes panel, showing the list of files with uncommitted changes.](images/getting-started/uncommitted-changes.png)

1. Now select **Commit Changes** in the **Changes** panel to save the agent's changes to your Git repository.

    {% data variables.product.prodname_vscode_shortname %} automatically creates a commit message based on the agent's prompt and the changes it made.

    After committing the changes, the branch changes and uncommitted changes are now empty because there are no pending changes. The change stats are also cleared from the session entry in the session list.

## 3. Continue working with agents in the editor

{% action-card title="Explore the {% data variables.copilot.chat_view %}" display="sidebar" %}
You can use the {% data variables.copilot.chat_view %} alongside your editor to let agents assist you with coding tasks in your active workspace.

* [Learn about the {% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md)

{% /action-card %}

For some changes, you might prefer a code-first approach, where your focus is on writing code and Copilot assists you in the process. For example, you might want to add a theme switcher and fine-tune the styles as you go. For this approach, continue the same Copilot session in the {% data variables.copilot.chat_view %}.

### Open the editor for your workspace

1. In the {% data variables.copilot.agents_window %}, select the **Open in Editor** button in the title bar to open the active workspace in the editor.

    ![Screenshot of the Open in Editor button in the {% data variables.copilot.agents_window %} title bar.](images/getting-started/open-in-editor-button.png)

    This opens a new {% data variables.product.prodname_vscode_shortname %} window with your workspace. The {% data variables.copilot.chat_view %} is still open in the right sidebar, so you can interact with agents while you work in the editor.

1. Notice that the left sidebar shows the **Explorer** view, which displays the files in your workspace. Select a file to open it in an editor tab in the main area.

    ![Screenshot of the editor showing the Explorer view with the portfolio files and the {% data variables.copilot.chat_view %} with the active agent session.](images/getting-started/explorer-and-chat-view.png)

    The {% data variables.copilot.chat_view %} in the right sidebar shows the ongoing agent session you created previously in the {% data variables.copilot.agents_window %}.

### Continue the session from the {% data variables.copilot.chat_view %}

The {% data variables.copilot.chat_view %} is located in the Secondary Side Bar, alongside your editor tabs. The same Copilot session remains active when you move between the {% data variables.copilot.agents_window %} and the editor.

1. Enter the following prompt in the chat input and press `kbstyle(Enter)`:

    ```prompt
    Add an accessible theme switcher button that toggles between light and dark color themes. Persist the selected theme across page reloads, update the button label to describe the theme it applies, and keep the layout responsive on narrow screens.
    ```

    {% data variables.product.prodname_copilot_short %} applies and saves the changes directly to your project files.

1. Open the **Source Control** view to review the files that Copilot changed. Select a file to inspect its diff.

    You can also select a changed file in the {% data variables.copilot.chat_view %} to open its diff.

1. Select the `index.html` file and select the **Open in Integrated Browser** (globe) button in the title bar.

1. In the integrated browser, validate the changes:

    * Select the theme switcher and verify that the page colors and button label change.
    * Resize the browser to a narrow width and verify that the content remains readable and the project cards adapt to the available space.
    * Use `kbstyle(Tab)` to focus the theme switcher, and then use `kbstyle(Enter)` or `kbstyle(Space)` to toggle the theme.

1. If a check fails, describe what you observed to Copilot in the {% data variables.copilot.chat_view %}. For example:

    ```prompt
    The selected theme resets after I refresh the page. Persist the theme selection and verify that it is restored when the page loads.
    ```

1. Review the final changes in the **Source Control** view and commit them to your Git repository.

Congratulations! You built a portfolio page with Copilot by using both an agent-first and code-first approach. You continued the same session across the {% data variables.copilot.agents_window %} and the {% data variables.copilot.chat_view %}, and used the integrated browser to preview and validate the result.

## Next steps

{% action-card title="Use agents in your own project" display="sidebar" %}
Apply the same prompt, review, and validation workflow to a bounded task in an existing project.

* [Apply the workflow to your project](/docs/agents/best-practices.md#apply-the-workflow-to-your-project)

{% /action-card %}

To go deeper with agentic coding in {% data variables.product.prodname_vscode %}, get more info about how to:

* [Explore an unfamiliar codebase without changing files](/docs/agents/guides/explore-a-codebase.md)

* [Review the recommended security baseline](/docs/agents/run/security.md#recommended-security-baseline)

* [Learn how agents work in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/concepts/agents.md)

* [Find a guide for your next task](/docs/agents/guides/overview.md#work-on-a-project)
