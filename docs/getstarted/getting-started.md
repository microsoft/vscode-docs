---
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
DateApproved: 03/05/2025
MetaDescription: This tutorial gives you an overview of the key features of Visual Studio Code to help you get started quickly.
---
# Tutorial: Get started with Visual Studio Code

In this tutorial, you learn about the key features of Visual Studio Code to help you get started with coding quickly. You learn about the different components of the user interface and how to customize it to your liking. You then write some code and use the built-in code editing features, such as IntelliSense and Code Actions, and you learn about running and debugging your code. By installing a language extension, you add support for a different programming language.

> [!TIP]
> If you prefer to follow along with a video, you can watch the [Getting Started video](https://www.youtube.com/watch?v=B-s71n0dHUk), which covers the same steps as this tutorial.

## Prerequisites

- [Download and install Visual Studio Code on your computer](https://code.visualstudio.com/download)

## Open a folder in VS Code

You can use VS Code to work on individual files to make quick edits, or you can open a folder, also known as a *workspace*.

Let's start by creating a folder and opening it in VS Code. You'll use this folder throughout the tutorial.

1. Open Visual Studio Code.

    When you first open VS Code, you should see the **Welcome** page with different actions to get started.

1. Select **File** > **Open Folder...** from the menu to open a folder.

    ![Screenshot that shows VS Code after opening a folder, highlighting the Explorer view.](images/getting-started/open-folder.png)

1. Select **New Folder**, create a new folder named `vscode101`, and then select **Select Folder** (**Open** on macOS).

    The folder you create is the root of your workspace.

1. On the Workspace Trust dialog, select **Yes, I trust the authors** to enable all features in the workspace.

    ![Screenshot that shows the Workspace Trust dialog.](images/getting-started/workspace-trust.png)

    Because you created the folder on your computer, you can trust the code in the folder.

    > [!IMPORTANT]
    > Workspace Trust lets you decide whether code in your project folder can be executed by VS Code. When you download code from the internet, you should first review it to make sure it's safe to run. Get more info about [Workspace Trust](/docs/editor/workspaces/workspace-trust.md).

1. You should now see the **Explorer** view on the left, showing the name of the folder.

    You'll use the Explorer view to view and manage the files and folders in your workspace.

> [!TIP]
> When you open a folder in VS Code, VS Code can restore the UI state for that folder, such as the open files, the active view, and the layout of the editor. You can also configure settings that only apply to that folder, or define debug configurations. Get more info about [workspaces](/docs/editor/workspaces/workspaces.md).

## Explore the user interface

Now that you have a folder open in VS Code, let's take a quick tour of the user interface.

### Switch between views with the Activity Bar

1. Use the Activity Bar to switch between different views.

    ![Screenshot that highlights the Activity Bar.](images/getting-started/activity-bar.png)

    > [!TIP]
    > Hover over the Activity Bar to see the name of each view and the corresponding keyboard shortcut. You can toggle a view open and closed by selecting the view again or pressing the keyboard shortcut.

1. When you select a view in the Activity Bar, the **Primary Side Bar** opens to show view-specific information.

    For example, the Run and Debug view enables you to configure and start debugging sessions.

    ![Screenshot that shows the Activity Bar and the Run and Debug view in the Primary Side Bar.](images/getting-started/activity-bar-and-side-bar.png)

### View and edit files with the Editor

1. Select the Explorer view in the Activity Bar, and select the **New File...** button to create a new file in your workspace.

    ![Screenshot that shows the New File button in the Explorer view.](images/getting-started/explorer-new-file.png)

1. Enter the name `index.html` and press `kbstyle(Enter)`.

    A file is added to your workspace and an Editor opens in the main area of the window.

    ![Screenshot that shows the Editor in the main area of the window.](images/getting-started/new-file-editor.png)

1. Start typing some HTML code in the `index.html` file.

    As you type, you should see suggestions popping up that help you complete your code (*IntelliSense*). You can use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the suggestions, and `kbstyle(Tab)` to insert the selected suggestion.

1. Add more files to your workspace and notice that each file opens a new Editor tab.

    You can open as many editors as you like and view them side by side vertically or horizontally. Learn more about [side by side editing](/docs/getstarted/userinterface.md#side-by-side-editing).

    ![Screenshot that shows multiple Editor tabs.](images/getting-started/multiple-editors.png)

### Access the terminal from the Panel area

1. VS Code has an integrated terminal. Open it by pressing `kb(workbench.action.terminal.toggleTerminal)`.

    You can choose between different shells, such as PowerShell, Command Prompt, or Bash, depending on your operating system configuration.

    ![Screenshot that shows the Panel area with the Terminal view.](images/getting-started/vscode-panel.png)

1. In the terminal, enter the following command to create a new file in your workspace.

    ```bash
    echo "Hello, VS Code" > greetings.txt
    ```

    The default working folder is the root of your workspace. Notice that the Explorer view automatically picks up and shows the new file.

    ![Screenshot that shows the Explorer view with the new file.](images/getting-started/terminal-new-file.png)

1. You can open multiple terminals simultaneously. Select the **Launch Profile** dropdown to view the available shells and choose one.

    ![Screenshot that shows the Launch Profile dropdown with the available shells.](images/getting-started/terminal-launch-profile.png)

### Access commands with the Command Palette

1. Open the **Command Palette** by pressing `kb(workbench.action.showCommands)`. You can also use the **View** > **Command Palette...** menu item.

    Many of the commands in VS Code are available through the Command Palette. When you install extensions, they can also add commands to the Command Palette.

    ![Screenshot that shows the Command Palette.](images/getting-started/command-palette.png)

    > [!TIP]
    > Notice that the Command Palette shows the default keyboard shortcut for commands that have one. You can use the keyboard shortcut to run the command directly.

1. The Command Palette supports different modes of operation:

    1. After the `>` symbol, start typing to filter the command list. For example, type `move terminal` to find commands to move the terminal to a new window.

        ![Screenshot that shows the Command Palette, listing the entries for moving the terminal.](images/getting-started/command-palette-move-terminal.png)

    1. Remove the `>` character and start typing to search for files in your workspace. You can use the `kb(workbench.action.quickOpen)` keyboard shortcut to open the Command Palette and start searching for files directly.

        ![Screenshot that shows the Quick Open feature in the Command Palette.](images/getting-started/quick-open.png)

> [!TIP]
> VS Code uses fuzzy matching to find files or commands. For example, typing `odks` returns the `Open Default Keyboard Shortcuts` command.

## Configure VS Code settings

You can customize almost every part of VS Code by configuring settings. You can use the **Settings Editor** to modify the settings in VS Code or directly modify the `settings.json` file.

1. Press `kb(workbench.action.openSettings)` to open the Settings Editor (or select the **File** > **Preferences** > **Settings** menu item).

    ![Screenshot that shows the Settings Editor.](images/getting-started/settings-editor.png)

    > [!TIP]
    > Use the search box to filter the list of settings that are shown.

1. By default, VS Code doesn't automatically save modified files. Select a value from the Auto Save dropdown to change this behavior.

    ![Screenshot that shows the Auto Save dropdown in the Settings Editor.](images/getting-started/settings-editor-auto-save.png)

    VS Code automatically applies changes to settings. When you modify a file in your workspace, it should now be automatically saved.

1. To revert a setting to its default value, select the gear icon next to the setting and select **Reset Setting**.

    ![Screenshot that shows the gear icon next to a setting in the Settings Editor.](images/getting-started/settings-editor-reset-setting.png)

    > [!TIP]
    > You can quickly find all modified settings by typing `@modified` in the search box or selecting the **Modified** filter.

1. You can use the tabs in the Settings Editor to switch between **User** settings and **Workspace** settings.

    User settings apply across all your workspaces. Workspace settings only apply to the current workspace. Workspace settings override user settings. Get more information about [settings in VS Code](/docs/editor/settings.md).

## Write some code

VS Code has built-in support for JavaScript, TypeScript, HTML, CSS, and more. In this tutorial, you create a sample JavaScript file and use some of the code editing features that VS Code offers.

VS Code supports many programming languages and in a next step, you'll [install a language extension](#step-6-install-a-language-extension) to add support for a different language, namely Python.

1. In the Explorer view, create a new file `app.js`, and start typing the following JavaScript code:

    ```javascript
    function sayHello(name) {
        console.log('Hello, ' + name);
    }

    sayHello('VS Code');
    ```

    As you type, you should see suggestions popping up that help you complete your code (*IntelliSense*). You can use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the suggestions, and `kbstyle(Tab)` to insert the selected suggestion.

    Notice also the formatting of the code (*syntax highlighting*), to help you distinguish between different parts of the code.

    ![Screen capture that shows IntelliSense in action for a JavaScript file.](images/getting-started/javascript-intellisense.gif)

1. When you put the cursor on the string `Hello,`, you should see a lightbulb icon appear to indicate there's a Code Action.

    You can also use the `kb(editor.action.triggerSuggest)` keyboard shortcut to open the lightbulb menu.

1. Select the lightbulb icon, and then select **Convert to template string**.

    ![Screenshot that shows the lightbulb Code Action to convert a string concatenation to a template string.](images/getting-started/code-action-template-string.png)

    Code Actions are suggestions to apply quick fixes to your code. In this case, the Code Action converts `""Hello, " + name` into a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) `` `Hello, ${name}` ``, which is a special JavaScript construct to embed expressions in strings.

Learn more about code [editing features](/docs/editor/editing/codebasics.md), [IntelliSense](/docs/editor/editing/intellisense.md), [code navigation](/docs/editor/editing/editingevolved.md), and [refactoring](/docs/editor/editing/refactoring.md) in VS Code.

## Use source control

Visual Studio Code has integrated source control management (SCM) and includes [Git](https://git-scm.com/) support out-of-the-box.

Let's use the built-in Git support to commit the changes you've made previously.

1. Select the **Source Control** view in the Activity Bar to open the Source Control view.

    ![Screenshot that shows the Source Control view, highlighting the button in the Activity Bar.](images/getting-started/source-control-view.png)

1. Make sure you have [Git](https://git-scm.com/) installed on your computer. If you don't have Git installed, you'll see a button in the Source Control view to install it on your machine.

1. Select **Initialize Repository** to create a new Git repository for your workspace.

    ![Screenshot that shows the Source Control view, highlighting the Initialize Repository button.](images/getting-started/source-control-initialize.png)

    After you initialize a repository, the Source Control view shows the changes you've made in your workspace.

1. You can stage individual changes by hovering over a file and selecting `+` next to a file.

    ![Screenshot that shows the Source Control view with changes in the workspace.](images/getting-started/source-control-changes.png)

    > [!TIP]
    > To stage all changes, hover over **Changes** and select the **Stage All Changes** button.

1. Enter a commit message, for example `Add hello function`, and then select the **Commit** to commit the changes to your Git repository.

    ![Screenshot that shows the Source Control view with a commit message.](images/getting-started/source-control-commit.png)

    > [!TIP]
    > Select **Graph** in the Source Control view to show a visual representation of the commit history of your Git repository.

There's a lot more to discover about source control in VS Code. Get more info about [source control in VS Code](/docs/sourcecontrol/overview.md).

## Install a language extension

VS Code has a rich ecosystem of extensions that let you add languages, debuggers, and tools to your installation to support your specific development workflow. There are thousands of extensions available in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode).

Let's install a language extension to add support for Python, or any other programming language you are interested in.

1. Select the **Extensions** view in the Activity Bar.

    The Extensions view enables you to browse and install extensions from within VS Code.

    ![Screenshot that shows the Extensions view, highlighting the Extensions icon in the Activity Bar.](images/getting-started/extensions-view.png)

1. Enter *Python* in the Extension view search box to browse for Python-related extensions. Select the **Python** extension published by Microsoft, and then select the **Install** button.

    ![Screenshot that shows the Extensions view with a search for Python extensions.](images/getting-started/extensions-search-python.png)

1. Now, create a new Python file `hello.py` in your workspace, and start typing the following Python code:

    ```python
    def say_hello(name):
        print("Hello, " + name)

    say_hello("VS Code")
    ```

    Notice that you now also get suggestions and IntelliSense for the Python code.

    ![Screen capture that shows IntelliSense in action for a Python file.](images/getting-started/python-intellisense.gif)

## Run and debug your code

VS Code has built-in support for running and debugging Node.js applications. In this tutorial, you use the Python extension you installed in the previous step to debug a Python program.

Let's debug the `hello.py` program that you created in the previous step.

1. Make sure that [Python 3](https://www.python.org/downloads/) is installed on your computer.

    If there's no Python interpreter installed on your computer, you'll see a notification in the lower right corner of the window. Select **Select Interpreter** to open the **Command Palette** and select the Python interpreter you want to use or install one.

1. In the `hello.py` file, place the cursor on the `print` line and press `kbstyle(F9)` to set a breakpoint.

    A red dot appears in the left margin of the editor, indicating that a breakpoint is set. With a breakpoint, you can pause the execution of your program at a specific line of code.

    ![Screenshot that shows a breakpoint in the editor.](images/getting-started/python-set-breakpoint.png)

1. Press `kbstyle(F5)` to start a debugging session.

    1. Select the Python debugger:

        ![Screenshot that shows the Quick Pick menu to select the Python debug configuration.](images/getting-started/python-select-debugger.png)

    1. Choose to run the current Python file:

        ![Screenshot that shows the Quick Pick menu to select the Python debug configuration.](images/getting-started/python-debug-configuration.png)

1. Notice that the program starts and that the execution stops at the breakpoint you set.

    ![Screenshot that shows the program stopped at a breakpoint in the editor, highlighting the Variables view to inspect variables.](images/getting-started/vscode-debugging.png)

    > [!TIP]
    > Inspect the value of the `name` variable by hovering over it in the editor while the execution is paused. You can view the value of variables at any time in the **Variables** view in the **Run and Debug** view.

1. Press the **Continue** button in the Debug toolbar or press `kbstyle(F5)` to continue the execution.

    ![Screenshot that shows the Debug toolbar with the Continue button highlighted.](images/getting-started/debug-toolbar-play.png)

There are many more debugging features in VS Code, such as watch variables, conditional breakpoints, and launch configurations. Dive into the details of [debugging in VS Code](/docs/editor/debugging.md).

## Enhance your coding with AI and GitHub Copilot

GitHub Copilot is an AI-powered assistant that helps you write code faster, and can help you with a wide range of tasks, such as code completion, code refactoring, and fixing errors.

Let's get started by getting code suggestions from Copilot.

1. Make sure you have set up Copilot in VS Code. Follow the steps in our [Copilot Setup](/docs/copilot/setup.md) guide.

    > [!TIP]
    > If you don't have a Copilot subscription yet, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

1. In the `hello.py` file, place the cursor at the end of the file and type this function header.

    ```python
    def say_day_of_week(date)
    ```

    GitHub Copilot will automatically suggest the rest of the function. Accept the code suggestion by pressing `kbstyle(Tab)`.

1. Next, let's invoke our new function.

    ```python
    say_day_of_week(date.today())
    ```

    Notice that there's a squiggle on the `date` keyword, indicating that there's an error.

1. Put the cursor, on the `date` keyword, select the _lightbulb_ icon, and then select **Fix with Copilot**.

    ![Screenshot that shows the lightbulb Code Action to fix an error with Copilot.](images/getting-started/code-action-fix-with-copilot.png)

    GitHub Copilot will suggest a fix for the error. Select **Accept** if you're happy with the suggestion.

    > [!TIP]
    > You can also use the `kb(editor.action.quickFix)` keyboard shortcut to manually trigger a quick fix.

There's a lot more you can do with Copilot in VS Code. Discover more about GitHub Copilot in VS Code with our [Copilot Quickstart](/docs/copilot/getting-started.md).

## Next steps

Congratulations! You've completed the tutorial and explored some of the key features of Visual Studio Code. Now that you've learned the basics of Visual Studio Code, get more info about how to:

- [Discover and run unit tests for your code](/docs/editor/testing.md)

- [Use the integrated terminal](/docs/terminal/getting-started.md)

- [Set up a remote development environment](/docs/remote/remote-overview.md)
