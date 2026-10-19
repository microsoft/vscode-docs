---
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
DateApproved: 10/21/2026
MetaDescription: Create, edit, preview, and debug a recipe app in {% data variables.product.prodname_vscode %}, then explore extensions, settings, and Git.
---
# Tutorial: Get started with {% data variables.product.prodname_vscode %}

In this tutorial, you create a small recipe app while learning the key features of {% data variables.product.prodname_vscode %}. You work with files and the user interface, preview and debug the app, customize settings, explore optional extensions, and save your work with Git. The tutorial uses plain HTML, CSS, and JavaScript, with no additional extensions, build tools, runtime, AI account, or coding assistant required.

> [!TIP]
> If you prefer a video introduction to {% data variables.product.prodname_vscode %}, watch the [Getting Started video](https://www.youtube.com/watch?v=f8_uF_IDV50) on our YouTube channel.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Watch the introduction video">
Learn about the key features of {% data variables.product.prodname_vscode %} in our introduction video.

* [Watch video](https://www.youtube.com/watch?v=f8_uF_IDV50)

</div>

## Prerequisites

* [Download and install {% data variables.product.prodname_vscode %} on your computer](https://code.visualstudio.com/download).
* For the source control exercise, complete the [Git prerequisites](/docs/sourcecontrol/quickstart.md#prerequisites). These prerequisites include installing Git and configuring your Git author name and email address. You can complete the earlier sections without Git.

## Open a folder in {% data variables.product.prodname_vscode_shortname %}

You can use {% data variables.product.prodname_vscode_shortname %} to work on individual files for quick edits, or you can open a folder as a *workspace*. Start with a new folder so that the tutorial files and Git history are separate from your other projects.

1. Create an empty folder named `vscode101` outside any existing Git repository.

1. Open {% data variables.product.prodname_vscode %}, and then select **File** > **Open Folder...**.

1. Select the `vscode101` folder, and then select **Select Folder** (**Open** on macOS).

    {% data variables.product.prodname_vscode_shortname %} now considers the folder a workspace.

1. On the Workspace Trust dialog, select **Yes, I trust the authors**.

    ![Screenshot showing the Workspace Trust dialog.](../images/getting-started/workspace-trust.png)

    > [!IMPORTANT]
    > Workspace Trust lets you decide whether code in your project folder can run in {% data variables.product.prodname_vscode_shortname %}. When you download code from the internet, review it before you trust the folder. Learn more about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

1. Confirm that the **Explorer** view shows the `vscode101` folder.

    You use the Explorer view to view and manage the files and folders in your workspace.

    ![Screenshot showing the Explorer view with the vscode101 folder open.](../images/getting-started/vscode-folder-opened.png)

> [!TIP]
> When you open a folder, {% data variables.product.prodname_vscode_shortname %} can restore its open files, active view, and editor layout. You can also configure settings and debug configurations for only that folder. Learn more about [workspaces](/docs/editing/workspaces/workspaces.md).

## Explore the user interface

Take a quick tour of the user interface before you create the app.

### Switch between views with the Activity Bar

1. Use the Activity Bar to switch between views.

    ![Screenshot showing the Activity Bar.](../images/getting-started/activity-bar.png)

    > [!TIP]
    > Hover over an Activity Bar item to see its name and keyboard shortcut. Select the item again to close the view.

1. Notice that the **Primary Side Bar** changes to show information for the selected view.

    For example, the Run and Debug view contains controls for configuring and starting a debugging session.

    ![Screenshot showing the Activity Bar and the Run and Debug view in the Primary Side Bar.](../images/getting-started/activity-bar-and-side-bar.png)

### View and edit files with the Editor

1. Select the Explorer view in the Activity Bar, and then select **New File...**.

    ![Screenshot showing the New File button in the Explorer view.](../images/getting-started/explorer-new-file.png)

1. Enter `index.html`, and then press `kbstyle(Enter)`.

    The new file opens in an Editor in the main area of the window.

    ![Screenshot showing a new file open in the Editor.](../images/getting-started/new-file-editor.png)

1. Type `<h1>My recipes</h1>`.

    As you type, IntelliSense suggests ways to complete your code. Use `kbstyle(Up)` and `kbstyle(Down)` to navigate the suggestions, and use `kbstyle(Tab)` to insert a selected suggestion.

1. Save the file with `kb(workbench.action.files.save)`.

1. Select **New File...** again to create `style.css`, and then create `app.js`.

    Each file opens in a new Editor tab. You can open multiple editors and view them side by side. Learn more about [side-by-side editing](/docs/editing/getting-started/userinterface.md#side-by-side-editing).

    ![Screenshot showing multiple Editor tabs.](../images/getting-started/multiple-editors.png)

### Access the terminal from the Panel

1. Open the integrated terminal with `kb(workbench.action.terminal.toggleTerminal)`. You can also select **View** > **Terminal**.

    You can choose from the shells installed on your computer, such as PowerShell, Command Prompt, or Bash.

    ![Screenshot showing the Terminal in the Panel.](../images/getting-started/vscode-panel.png)

1. Enter the following command to create a file in the workspace.

    ```bash
    echo "Hello, VS Code" > greetings.txt
    ```

    The terminal starts in the root of your workspace by default. Notice that the Explorer view automatically shows the new file.

    ![Screenshot showing the new file in the Explorer view.](../images/getting-started/terminal-new-file.png)

1. Select the **Launch Profile** dropdown to view the available shells and open another terminal.

    ![Screenshot showing the Launch Profile dropdown and available shells.](../images/getting-started/terminal-launch-profile.png)

### Access commands with the Command Palette

1. Open the Command Palette with `kb(workbench.action.showCommands)`. You can also select **View** > **Command Palette**.

    The Command Palette provides access to many {% data variables.product.prodname_vscode_shortname %} commands. Extensions can add more commands.

    ![Screenshot showing the Command Palette.](../images/getting-started/command-palette.png)

1. Try these Command Palette modes:

    * **Command mode (`>`)**: after the `>` symbol, type `move terminal` to find commands that move the terminal to a new window.

        ![Screenshot showing commands for moving the terminal in the Command Palette.](../images/getting-started/command-palette-move-terminal.png)

    * **Quick Open mode**: remove the `>` symbol, and then type a file name to search your workspace. Open Quick Open directly with `kb(workbench.action.quickOpen)`.

        ![Screenshot showing Quick Open in the Command Palette.](../images/getting-started/quick-open.png)

    * **Symbol search mode (`#`)**: replace the `>` symbol with `#` to search for symbols such as variables and functions.

> [!TIP]
> The Command Palette uses fuzzy matching. For example, typing `odks` finds the `Open Default Keyboard Shortcuts` command.

## Create a recipe app

Replace the contents of the three files with the following fixed sample. Keeping the file names and code consistent makes it easier to follow the preview and debugging exercises.

1. Open `index.html`, replace its contents with the following HTML, and save the file with `kb(workbench.action.files.save)`.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recipe list</title>
      <link rel="stylesheet" href="style.css">
      <script src="app.js" defer></script>
    </head>
    <body>
      <main>
        <h1>My recipes</h1>
        <form id="recipe-form">
          <label for="recipe-name">Recipe name</label>
          <input id="recipe-name" name="recipe-name" required>

          <label for="recipe-description">Description</label>
          <textarea id="recipe-description" name="recipe-description" required></textarea>

          <button type="submit">Add recipe</button>
        </form>
        <ul id="recipe-list" aria-live="polite"></ul>
      </main>
    </body>
    </html>
    ```

1. Open `style.css`, add the following CSS, and save the file.

    ```css
    :root {
      color-scheme: light dark;
      font-family: system-ui, sans-serif;
    }

    body {
      margin: 0;
      padding: 2rem;
    }

    main {
      max-width: 40rem;
      margin: 0 auto;
    }

    form {
      display: grid;
      gap: 0.75rem;
    }

    input,
    textarea,
    button {
      font: inherit;
      padding: 0.6rem;
    }

    li {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin-block: 1rem;
    }
    ```

1. Open `app.js`, add the following JavaScript, and save the file.

    ```javascript
    const form = document.querySelector('#recipe-form');
    const nameInput = document.querySelector('#recipe-name');
    const descriptionInput = document.querySelector('#recipe-description');
    const recipeList = document.querySelector('#recipe-list');

    function addRecipe(event) {
      event.preventDefault();

      const name = nameInput.value.trim();
      const description = descriptionInput.value.trim();

      if (!name || !description) {
        const emptyInput = !name ? nameInput : descriptionInput;
        emptyInput.setCustomValidity('Enter at least one non-space character.');
        emptyInput.reportValidity();
        emptyInput.addEventListener('input', () => emptyInput.setCustomValidity(''), { once: true });
        return;
      }

      const item = document.createElement('li');
      const recipeText = document.createElement('span');
      recipeText.textContent = `${name}: ${description}`;

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('aria-label', `Delete ${name}`);
      deleteButton.addEventListener('click', () => item.remove());

      item.append(recipeText, deleteButton);
      recipeList.append(item);
      form.reset();
      nameInput.focus();
    }

    form.addEventListener('submit', addRecipe);
    ```

You now have a complete app in plain local files. The `textContent` property displays recipe input as text instead of interpreting it as HTML.

## Preview the app in the integrated browser

The built-in [integrated browser](/docs/debugtest/integrated-browser.md) opens local HTML files directly in {% data variables.product.prodname_vscode_shortname %}. You don't need an extension, development server, or external browser to preview this app.

1. In the Explorer view, right-click `index.html`, and then select **Open in Integrated Browser**.

    The app opens in an integrated browser tab.

    ![Screenshot of the completed recipe app in the integrated browser](../images/getting-started/recipe-app-screenshot.png)

1. Check the app manually:

    * Add a recipe with a name and description, and confirm that it appears in the list.
    * Select **Delete**, and confirm that the recipe disappears.
    * Try to submit an empty field, and confirm that the browser asks you to complete it.
    * Enter only spaces in a field, and confirm that the browser asks for a non-space character.
    * Enter `<b>Soup</b>` as a recipe name, and confirm that the app displays the characters as text rather than formatting them as HTML.

1. In `index.html`, change `My recipes` to `Favorite recipes`, and then save the file.

    Check that the browser shows the new heading. If it hasn't reloaded automatically, select **Reload** in the browser toolbar. This small edit demonstrates the edit, save, and review cycle you use throughout {% data variables.product.prodname_vscode_shortname %}.

## Explore extensions (optional)

Extensions add languages, debuggers, and other tools to {% data variables.product.prodname_vscode_shortname %}. You don't need to install any extensions for this sample, but you can explore tools for other projects:

1. Select the **Extensions** view in the Activity Bar.

1. Search for a language or tool, and then select an extension to read its features and requirements.

Learn more about [finding and managing extensions](/docs/configure/extensions/extensions.md).

## Configure {% data variables.product.prodname_vscode_shortname %} settings

You can customize {% data variables.product.prodname_vscode_shortname %} in the Settings editor or by editing the `settings.json` file.

1. Open the Settings editor with `kb(workbench.action.openSettings)`. You can also select **File** > **Preferences** > **Settings**.

    ![Screenshot showing the Settings editor.](../images/getting-started/settings-editor.png)

1. Use the search box to find **Auto Save**, and then choose a value from the dropdown.

    ![Screenshot showing the Auto Save dropdown in the Settings editor.](../images/getting-started/settings-editor-auto-save.png)

    {% data variables.product.prodname_vscode_shortname %} applies setting changes immediately. When you next modify a workspace file, the selected Auto Save behavior applies.

1. Select the gear icon next to the setting, and then select **Reset Setting** to restore its default value.

    ![Screenshot showing the reset action for a setting.](../images/getting-started/settings-editor-reset-setting.png)

    > [!TIP]
    > Enter `@modified` in the search box or select the **Modified** filter to find changed settings.

1. Use the **User** and **Workspace** tabs to switch between setting scopes.

    User settings apply to all your workspaces. Workspace settings apply only to the current workspace and override User settings. Learn more about [settings in {% data variables.product.prodname_vscode_shortname %}](/docs/configure/settings.md).

## Save your work with source control

{% data variables.product.prodname_vscode %} includes built-in support for Git source control. Before you continue, make sure you completed the [Git installation and author setup prerequisites](/docs/sourcecontrol/quickstart.md#prerequisites). Git uses the configured name and email address to identify the author of the commit.

1. Select the **Source Control** view in the Activity Bar.

    ![Screenshot showing the Source Control view and its Activity Bar item.](../images/getting-started/source-control-view.png)

1. Select **Initialize Repository** to create a Git repository in the `vscode101` workspace.

    ![Screenshot showing the Initialize Repository button in the Source Control view.](../images/getting-started/source-control-initialize.png)

    Because you created `vscode101` outside an existing repository, this repository contains only the tutorial files.

1. Review the files in **Changes**. Hover over each file and select `+` to stage it.

    ![Screenshot showing changed files in the Source Control view.](../images/getting-started/source-control-changes.png)

    > [!TIP]
    > To stage all files, hover over **Changes** and select **Stage All Changes**.

1. Enter `Add recipe list app` as the commit message, and then select **Commit**.

    ![Screenshot showing a commit message in the Source Control view.](../images/getting-started/source-control-commit.png)

    > [!TIP]
    > Select **Graph** in the Source Control view to view your repository's commit history.

Learn more about [source control in {% data variables.product.prodname_vscode_shortname %}](/docs/sourcecontrol/overview.md).

## Debug the app in the integrated browser

Attach the debugger to the integrated browser tab you used to preview the app. The Run and Debug view doesn't create this configuration automatically, so first add a launch configuration to your workspace.

1. In the Explorer view, create a folder named `.vscode`. Inside that folder, create a file named `launch.json`.

1. Add the following configuration to `.vscode/launch.json`, and then save the file.

    ```json
    {
      "version": "0.2.0",
      "configurations": [
        {
          "type": "editor-browser",
          "request": "attach",
          "name": "Debug recipe app"
        }
      ]
    }
    ```

1. Return to the integrated browser tab that contains your recipe app. If you closed it, right-click `index.html` in the Explorer view and select **Open in Integrated Browser** to reopen it.

1. Open `app.js`. In the `addRecipe` function, place the cursor on the following line, and then press `kbstyle(F9)` to set a breakpoint.

    ```javascript
    if (!name || !description) {
    ```

    A red dot appears in the editor margin.

1. Start debugging with `kb(workbench.action.debug.start)`.

    If a picker appears, select **Debug recipe app**, and then select the integrated browser tab that contains your recipe app.

1. In the integrated browser, enter a recipe name and description, and then select **Add recipe**.

    Execution pauses at the breakpoint in `addRecipe`.

    ![Screenshot of the debugger paused at the addRecipe breakpoint](../images/getting-started/debugger-paused-addRecipe.png)

1. Hover over `name` and `description` in `app.js` to inspect their values. You can also inspect them in the **Variables** section of the Run and Debug view.

1. Press `kbstyle(F10)` to step over the current line. Use the Debug toolbar to step through more statements, and then select **Continue**.

1. Confirm in the integrated browser that the new recipe appears. Select **Stop** on the Debug toolbar to end the debugging session.

Learn more about [debugging in {% data variables.product.prodname_vscode_shortname %}](/docs/debugtest/debugging.md).

## Explore AI-assisted development (optional)

AI isn't required for this tutorial. If you choose to use AI later, both the {% data variables.copilot.chat_view %} and the {% data variables.copilot.agents_window %} can run agents. Use the {% data variables.copilot.chat_view %} to collaborate with an agent in your current workspace, or use the {% data variables.copilot.agents_window %} to orchestrate agent sessions across multiple projects.

* [Follow the agents quickstart for a focused workspace task](/docs/agents/quickstart.md).
* [Learn agent workflows across both interfaces](/docs/agents/agents-tutorial.md).

## Next steps

You created, edited, previewed, versioned, and debugged a local web app. Continue learning manual editor workflows:

* [Learn editing basics and keyboard shortcuts](/docs/editing/codebasics.md).
* [Explore source control workflows](/docs/sourcecontrol/overview.md).
* [Learn more about running and debugging code](/docs/debugtest/debugging.md).
