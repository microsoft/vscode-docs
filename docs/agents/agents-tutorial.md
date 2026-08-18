---
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
DateApproved: 8/12/2026
MetaDescription: Get started with agentic coding in {% data variables.product.prodname_vscode %}. Build an app from a prompt with the {% data variables.copilot.agents_window %} and the {% data variables.copilot.chat_view %}, and learn the {% data variables.product.prodname_vscode_shortname %} basics.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Tutorial: Agentic coding in {% data variables.product.prodname_vscode_shortname %}

In this tutorial, you learn how to build with AI agents in {% data variables.product.prodname_vscode %}. Agents can plan a solution, create and edit multiple files, run commands, and fix their own errors, all from a single natural-language prompt. You describe what you want, and the agent does the work.

You start in the **{% data variables.copilot.agents_window %}**, a dedicated surface for an agent-first workflow. Then you switch to the **{% data variables.copilot.chat_view %}**, where an agent assists you while you work in the editor. Along the way, you pick up the {% data variables.product.prodname_vscode_shortname %} basics you need, like opening a workspace, using the integrated browser, and committing your changes with source control.

You build a simple personal portfolio page with HTML, CSS, and JavaScript. The page is fully static, so you don't need to install any runtimes or build tools to follow along.

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="false" title="Learn {% data variables.product.prodname_vscode_shortname %} editor features">
Get familiar with the {% data variables.product.prodname_vscode_shortname %} user interface, editing features, and key productivity tools.

* [Start the {% data variables.product.prodname_vscode_shortname %} editing tutorial](/docs/editing/getting-started.md)

</div>

## Prerequisites

* [Download and install {% data variables.product.prodname_vscode %}](/download)

* [Enable AI features in {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/overview.md#enable-ai-features)

* [Install Git](https://git-scm.com/)

> [!TIP]
> If you don't have a Copilot subscription yet, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly allowance of inline suggestions and AI credits.

## Create a project folder

Agents work in the context of a folder, also known as a *workspace*. You start by creating a folder for your project. You don't need to open the folder in {% data variables.product.prodname_vscode_shortname %} yet. In the next step, you open it in the {% data variables.copilot.agents_window %}, which lets you work across multiple workspaces without opening a separate window for each one.

1. On your computer, create a new folder named `myportfolio`.

1. Put the folder under Git version control to track changes. Open a terminal and run the following commands:

    ```bash
    cd myportfolio
    git init
    ```

    > [!TIP]
    > You can also initialize a repository from the **Source Control** view in {% data variables.product.prodname_vscode_shortname %}.

## Build features with the {% data variables.copilot.agents_window %}

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Explore the {% data variables.copilot.agents_window %}">
Use the {% data variables.copilot.agents_window %} to run and monitor agent sessions across your projects from a single place in {% data variables.product.prodname_vscode_shortname %}.

* [Learn about the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md)

</div>

The {% data variables.copilot.agents_window %} (preview) is a dedicated window in {% data variables.product.prodname_vscode_shortname %} that is optimized for working with agents across all your projects without needing to open a separate {% data variables.product.prodname_vscode_shortname %} window for each one.

In this part, you open your folder in the {% data variables.copilot.agents_window %} and task an agent to build your portfolio page.

### Open the {% data variables.copilot.agents_window %}

1. In {% data variables.product.prodname_vscode_shortname %}, select the **Open in Agents** button in the {% data variables.product.prodname_vscode_shortname %} title bar.

    You can also open the {% data variables.copilot.agents_window %} from the {% data variables.product.prodname_vscode_shortname %} welcome page, or run the **Chat: Open Agents Window** command from the Command Palette (`kb(workbench.action.showCommands)`).

    ![Screenshot of the Open in Agents button in the {% data variables.product.prodname_vscode_shortname %} title bar.](images/getting-started/open-in-agents-button.png)

1. If you're prompted to sign in, select a sign-in method and continue.

    The {% data variables.copilot.agents_window %} needs access to your GitHub Copilot subscription to run agent sessions. If you're already signed in to GitHub in {% data variables.product.prodname_vscode_shortname %}, you're signed in here too.

### Start an agent session

1. Select **New** at the top of the left sidebar to start a new session.

    ![Screenshot of the New button in the {% data variables.copilot.agents_window %} sidebar.](images/getting-started/agents-new-session.png)

    The sidebar shows your list of active agent sessions, grouped by workspace. You can use the sessions list to switch between sessions. In the bottom left, you can configure customizations to modify the agent's behavior to match your coding practices.

1. In the workspace dropdown, make sure the `myportfolio` folder on your machine is selected.

    ![Screenshot of the workspace dropdown and session configuration in the {% data variables.copilot.agents_window %}.](images/getting-started/workspace-dropdown.png)

    If you're prompted to trust the folder, select **Yes, I trust the authors**.

    > [!IMPORTANT]
    > Workspace Trust lets you decide whether code in your project folder can be executed. When you download code from the internet, you should first review it to make sure it's safe to run. Get more info about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

1. Select the **Copilot** agent harness to run your agent session locally on your machine using the {% data variables.copilot.copilot_sdk %}.

    {% data variables.product.prodname_vscode_shortname %} supports multiple agent harnesses, such as Claude and Codex. The agent harness is what connects the language model to the development environment.

1. Review the other session configuration options:

    * **Agent**: the generic agent role for performing the task. For specialized tasks, you can create a custom agent, such as a code review or testing agent.
    * **Language model**: depending on your setup, you can choose from multiple language models and configure additional settings.
    * **Default Approvals**: the permission level that uses the default approval rules for tools, terminal commands, and more. {% data variables.product.prodname_vscode_shortname %} prompts you when an action requires approval.

1. Enter the following prompt in the chat input and press `kbstyle(Enter)`:

    ```prompt
    Create a personal portfolio page with HTML, CSS, and JavaScript in separate files. Include a header with my name and a short bio, a section for projects with cards, and a contact section. Use modern styling and add some sample content.
    ```

1. The agent analyzes your request, plans the work, and then starts creating and editing files. If it encounters errors, it self-corrects or asks for clarification and approval.

    ![Screenshot of the agent generating the portfolio page files in the {% data variables.copilot.agents_window %}.](images/getting-started/agent-generating-files.png)

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

Before you commit the agent's work, you might want to review the code changes that the agent applied. The **Changes** panel shows diffs for every file the agent created or modified during its session. To review and commit the file changes:

1. Select the **Changes** panel to see the diffs of the files the agent added or modified. Each item also shows change stats and an add/delete/update indicator.

    ![Screenshot of the Changes panel in the {% data variables.copilot.agents_window %}, showing the list of files changed by the agent.](images/getting-started/changes-panel.png)


1. Open the diff from the `index.html` file and select a block of text to open the inline feedback flow. Enter your feedback and then select **Submit**.

    ![Screenshot of the inline feedback flow in the diff view, showing a block of text selected for feedback.](images/getting-started/inline-feedback.png)

    Notice that your feedback is added to the chat conversation, and the agent processes it and applies the change to the file. You can continue to provide feedback on other changes in the diff view.

1. From the changes dropdown, select **Uncommitted Changes** to see the changes that have not yet been committed to your Git repository.

    Use the changes dropdown to switch between branch changes, uncommitted changes, all changes from the session, and changes made during the last agent turn.

    ![Screenshot of the Uncommitted Changes view in the Changes panel, showing the list of files with uncommitted changes.](images/getting-started/uncommitted-changes.png)

1. Now select **Commit Changes** in the **Changes** panel to save the agent's changes to your Git repository.

    {% data variables.product.prodname_vscode_shortname %} automatically creates a commit message based on the agent's prompt and the changes it made.

    After committing the changes, the branch changes and uncommitted changes are now empty because there are no pending changes. The change stats are also cleared from the session entry in the session list.

## Continue working with agents in the editor

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Explore the {% data variables.copilot.chat_view %}">
You can use the {% data variables.copilot.chat_view %} alongside your editor to let agents assist you with coding tasks in your active workspace.

* [Learn about the {% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md)

</div>

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

    {% data variables.copilot.github_copilot_app_short %} applies and saves the changes directly to your project files.

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

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Tailor the agent experience">
Configure custom agents, skills, and instructions to tailor the agent experience to your coding standards and workflows.

* [Start customization tutorial](/docs/agents/guides/customize-copilot-guide.md)

</div>

To go deeper with agentic coding in {% data variables.product.prodname_vscode %}, get more info about how to:

* [Learn more about agents in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/concepts/agents.md)

* [Learn more about the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md)

* [Learn more about the {% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md)
