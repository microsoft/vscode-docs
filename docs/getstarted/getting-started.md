---
Order: 
Area: getstarted
TOCTitle: Tutorial
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
PageTitle: Getting started with Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: This tutorial gives you an overview of the key features of Visual Studio Code to help you get started quickly.
---
# Tutorial: Get started with Visual Studio Code

In this tutorial, you learn about the key features of Visual Studio Code to help you get started with coding quickly. You learn about the different components of the user interface and how to customize it to your liking. You then write some code and use the built-in code editing features, such as IntelliSense and Code Actions, and you learn about running and debugging your code. By installing a language extension, you add support for a different programming language.

<iframe src="https://www.youtube-nocookie.com/embed/B-s71n0dHUk?autoplay=true" width="640" height="320" allowFullScreen="true" frameBorder="0" title="Getting Started with Visual Studio Code"></iframe>

## Prerequisites

- [Download and install Visual Studio Code on your computer](https://code.visualstudio.com/download)
- [Install Node.js](https://nodejs.org/) for running and debugging the sample JavaScript program in this tutorial

## Step 1: Open a folder in VS Code

VS Code is a great lightweight editor where you can work with individual files seamlessly, for example for quick edits or to view a file. Alternatively, by opening a folder, also known as a *workspace*, you unlock more features, such as folder-specific configuration settings, restoring the UI state for that folder, debug configurations, and more. Get more info about [workspaces](/docs/editor/workspaces.md).

Let's start by creating a folder and opening it in VS Code. You'll use this folder throughout the tutorial.

1. Create a new folder `vscode101` on your computer.

1. Open Visual Studio Code.

    When you first open VS Code, you should see the **Welcome** page with different actions to get started.

1. On the Welcome page, select **Open Folder...**, and then select the folder you created.

    The VS Code window reloads and you should see the folder name at the top of the **Explorer** view. You'll use the Explorer view to view and manage the files and folders in your workspace.

    ![Screenshot that shows VS Code after opening a folder, highlighting the Explorer view.](images/getting-started/open-folder.png)

    Alternatively, you can select **Open Folder...** from the **File** menu or press `kb(workbench.action.files.openFolder)` to open a folder.

> **Tip**: If you use the command line to work with VS Code, pass the folder name as a parameter to directly launch VS Code for that folder. For example, enter `code .` to open the current folder in VS Code.

## Step 2: Explore the user interface

Now that you have a folder open in VS Code, let's take a quick tour of the user interface.

### Switch between views with the Activity Bar

The **Activity Bar** is located on the side of the window and gives you quick access to different views, such as the **Explorer**, **Search**, **Source Control**, and **Run and Debug** views.

1. Use the Activity Bar to explore the different views.

    As you hover over the Activity Bar, you can see the name of each view and the keyboard shortcut to open each view. You'll find that many of the features in VS Code have keyboard shortcuts already assigned to them, and you can also customize these shortcuts to your liking.

    ![Screenshot that highlights the Activity Bar.](images/getting-started/activity-bar.png)

1. Notice the **Primary Side Bar** that opens when you select a view in the Activity Bar.

    The Primary Side Bar shows view-specific information. For example, the Source Control view shows the changes in your Git repository, and the Run and Debug view enables you to configure and start debugging sessions.

    ![Screenshot that shows the Activity Bar and the Run and Debug view in the Primary Side Bar.](images/getting-started/activity-bar-and-side-bar.png)

> **Tip**: Select the current view in the Activity Bar again to toggle the Primary Side Bar open and closed.

### View and edit files with the Editor

The **Editor** is located in the main area of the window and is where you view and edit files in your workspace.

1. Select the Explorer view in the Activity Bar, and then select the **New File...** button to create a new file in your workspace.

    ![Screenshot that shows the New File button in the Explorer view.](images/getting-started/explorer-new-file.png)

1. Enter the name `index.html` and press `kbstyle(Enter)`.

    A file is added to your workspace and an Editor opens in the main area of the window, where you can start typing and editing the file.

    ![Screenshot that shows the Editor in the main area of the window.](images/getting-started/new-file-editor.png)

1. Add more files to your workspace and notice that each file opens in a new Editor tab.

    You can open as many editors as you like and view them side by side vertically or horizontally. Learn more about [side by side editing](/docs/getstarted/userinterface.md#side-by-side-editing).

    ![Screenshot that shows multiple Editor tabs.](images/getting-started/multiple-editors.png)

### Access the terminal from the Panel area

The **Panel** area is located below the Editor and contains different views, such as the output and debug information, and also gives you access to the integrated terminal.

1. Open the Panel area by selecting **View** > **Appearance** > **Panel** from the menu (or press `kb(workbench.action.togglePanel)`).

    Notice the different view in the Panel area. As you use different features in VS Code, such as debugging your code, you'll use the information and functionality in these views.

    ![Screenshot that shows the Panel area with the Terminal view.](images/getting-started/vscode-panel.png)

    > **Tip**: You can move the Panel area with the **View** > **Appearance** > **Panel Position** menu, for example to the left or right for more vertical space.

1. Open the integrated terminal by selecting **Terminal** in the Panel area > **New Terminal**, and try running some shell commands.

    The terminal enables you to run shell commands directly in VS Code, without switching to another terminal application. For example, you can use the terminal to install dependencies for your project, or run a development server. Notice that the terminal working directory is the root of your workspace.

    ![Screenshot that shows the integrated terminal in the Panel area.](images/getting-started/vscode-terminal.png)

    You can choose between different shells, such as PowerShell, Command Prompt, or Bash, depending on your operating system configuration.

### Access commands with the Command Palette

Many of the commands in VS Code are available through the Command Palette. For example, enter *Create new file* in the Command Palette to create a file in your workspace, or enter *Git* to view the list of Git actions you can trigger.

1. Select **View** > **Command Palette** or press `kb(workbench.action.showCommands)` to open the **Command Palette**.

    ![Screenshot that shows the Command Palette, listing the entries for 'Create new file'.](images/getting-started/command-palette.png)

    > **Tip**: Notice that the Command Palette shows the default keyboard shortcut for commands that have one. You can use the keyboard shortcut to run the command directly.

1. Press `kb(workbench.action.quickOpen)` to use the Command Palette to navigate to a file in your workspace. Start typing to filter the list.

    The **Quick Open** feature enables you to quickly open a file in your workspace, or search for symbols in files. Get more info the [Command Palette](/docs/getstarted/userinterface.md#command-palette) in the VS Code documentation.

    ![Screenshot that shows the Quick Open feature in the Command Palette.](images/getting-started/quick-open.png)

### View status information with the Status Bar

The **Status Bar** is located at the bottom of the window and shows information about the file you are editing, and the workspace you have open. For example, if the folder you opened is a Git repository, the Status Bar shows the Git status and current branch.

1. Open a file by selecting it in the Explorer view.

    The Status Bar shows the language mode, indentation, and the line ending of the current editor.

    ![Screenshot that shows the Status Bar at the bottom of the window.](images/getting-started/status-bar.png)

1. Select the indentation field (shown as `Spaces: 4` in the screenshot) in the Status Bar to modify the indentation of the current file. For example, to use tabs instead of spaces.

    If you've opened a Git repository, you can select the branch name in the Status Bar to create a new branch.

## Step 3: Customize the user interface

Each developer has their own preferences for how their coding environment should look. VS Code enables you to change the layout, colors, keyboard shortcuts, and nearly every other aspect of the editor through various settings.

Let's start by using **Color Themes** to customize the colors in VS Code. A Color Theme affects both the VS Code user interface elements and the editor highlighting colors.

To select a different Color Theme:

1. Select the **Manage** button (gear icon) in the Activity Bar, and then select **Themes** > **Color Theme** to display the Color Theme picker.

    ![Screenshot that shows the Manage menu to change the color theme, highlighting the Manage button in the Activity Bar.](images/getting-started/change-color-theme.png)

    Alternatively, you can enter **Color Theme** in the Command Palette or press `kb(workbench.action.selectTheme)`.

1. Use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate through the list and preview the colors of the theme.

    VS Code comes with a list of built-in themes that you can choose from. As you move through the list, the active theme is previewed in VS Code.

    ![Screen capture that shows how to switch between different color themes by using the Command Palette.](images/themes/themes_hero.gif)

    > **Tip**: You can also select Color Themes from the VS Code Marketplace directly by selecting **Browse Additional Color Themes...** from the Color Theme picker.

Beyond changing the color theme of the user interface, you can customize almost every part of VS Code by using settings. Maybe you prefer a different font for the editor, change word wrapping, or enable [floating editor windows](/docs/editor/custom-layout.md#floating-editor-windows).

Let's use the **Settings Editor** to modify the font size in the editor:

1. Select **File** > **Preferences** > **Settings** (or press `kb(workbench.action.openSettings)`) to open the Settings Editor.

    ![Screenshot that shows the Settings Editor.](images/getting-started/settings-editor.png)

1. Modify the value of the **Editor: Font Size** setting to *36*.

    When you switch to the `index.html` editor tab, notice how font size change is immediately applied in the editor.

    By default, when you change a setting, it applies to all your VS Code workspaces (**User Settings**). Switch to the **Workspace** tab to change a setting that only applies to the current workspace.

    > **Tip**: Use the search box in the Settings Editor to quickly find a setting.

There are many more ways to customize your VS Code experience, such as [changing default keyboard shortcuts](/docs/getstarted/keybindings.md), adding [code snippets](/docs/editor/userdefinedsnippets.md), or by adding extensions from the [Visual Studio Marketplace](#step-5-install-a-language-extension).

## Step 4: Write some code

VS Code is first and foremost a code editor, so let's start by writing some code! VS Code has built-in support for JavaScript, TypeScript, HTML, CSS, and more. In this tutorial, you create a sample JavaScript file and use some of the code editing features that VS Code offers.

VS Code supports many programming languages and in the next step, you'll install a language extension to add support for a different language.

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

1. Put the cursor on the `Hello,` string, select the lightbulb icon, and then select **Convert to template string**.

    The lightbulb indicates that there are **Code Actions** available, which are suggestions that help you apply quick fixes to your code. You can also use the `kb(editor.action.triggerSuggest)` keyboard shortcut to open the lightbulb menu.

    In this case, the Code Action converts `""Hello, " + name` into a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) `` `Hello, ${name}` ``, which is a special JavaScript construct to embed expressions in strings.

    ![Screenshot that shows the lightbulb Code Action to convert a string concatenation to a template string.](images/getting-started/code-action-template-string.png)

    You can further experiment with IntelliSense in the different files in your workspace. For example, in the `index.html` file, start typing `<` to see suggestions for HTML tags.

    > **Tip**: Toggle the **File** > **Auto Save** menu item to automatically save files whenever you make changes.

## Step 5: Install a language extension

The features that VS Code includes out-of-the-box are just the start. VS Code has a rich ecosystem of extensions that let you add languages, debuggers, and tools to your installation to support your specific development workflow. There are thousands of extensions available in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode).

Let's install a language extension to add support for Python, or any other programming language you are interested in.

1. Select the **Extensions** view in the Activity Bar.

    The Extensions view enables you to browse and install extensions from within VS Code.

    ![Screenshot that shows the Extensions view, highlighting the Extensions icon in the Activity Bar.](images/getting-started/extensions-view.png)

1. Enter *Python* in the Extension view search box to browse for Python-related extensions, select the **Python** extension published by Microsoft, and select the **Install** button.

    ![Screenshot that shows the Extensions view with a search for Python extensions.](images/getting-started/extensions-search-python.png)

1. Now, create a new Python file `hello.py` in your workspace and start typing the following Python code:

    ```python
    def say_hello(name):
        print("Hello, " + name)

    say_hello("VS Code")
    ```

    Notice that you now get suggestions and IntelliSense for Python code.

    ![Screen capture that shows IntelliSense in action for a Python file.](images/getting-started/python-intellisense.gif)

Learn more about code [editing features](/docs/editor/codebasics.md), [IntelliSense](/docs/editor/intellisense.md), [code navigation](/docs/editor/editingevolved.md), and [refactoring](/docs/editor/refactoring.md) in VS Code.

## Step 6: Run and debug your code

One of the key features in VS Code is its great support for running and debugging code. VS Code has built-in support for running and debugging Node.js applications, and there are extensions available for many other programming languages, such as Python, Java, C#, and more.

> **Note**: Make sure you have the necessary runtime and VS Code extensions installed on your computer. For example, to debug a Python program, you need to have Python installed on your computer.

In this tutorial, you debug the `app.js` file to explore the built-in Node.js debugger. Most debugging concepts and features are applicable to other debuggers as well.

Let's debug the `app.js` program by using the built-in Node.js debugger.

1. In the `app.js` file, put the cursor on the `console.log` line and press `kbstyle(F9)` to set a breakpoint.

    A red dot appears in the left margin of the editor, indicating that a breakpoint is set. With a breakpoint, you can pause the execution of your program at a specific line of code.

    ![Screenshot that shows a breakpoint in the editor.](images/getting-started/javascript-set-breakpoint.png)

1. Make sure to select the `app.js` file, and then press `kbstyle(F5)` to start a debugging session.

    Notice that the program starts and that the execution stops at the breakpoint you set. VS Code uses the built-in Node.js debugger to debug the program.

    ![Screenshot that shows the program stopped at a breakpoint in the editor, highlighting the Variables view to inspect variables.](images/getting-started/vscode-debugging.png)

    > **Tip**: Inspect the value of the `name` variable by hovering over it in the editor while the execution is paused. You can view the value of variables at any time in the **Variables** view in the **Run and Debug** view.

1. Press the **Continue** button in the Debug toolbar or press `kbstyle(F5)` to continue the execution.

    ![Screenshot that shows the Debug toolbar with the Continue button highlighted.](images/getting-started/debug-toolbar-play.png)

There are many more debugging features in VS Code, such as watch variables, conditional breakpoints, and launch configurations. Dive into the details of [debugging in VS Code](/docs/editor/debugging.md).

## Optional: Explore AI features with GitHub Copilot

You can further enhance your coding with artificial intelligence (AI) and [GitHub Copilot](/docs/copilot/overview.md). For example, get suggestions for lines of code or entire functions, perform code refactorings, generate code-related artifacts like tests, or produce code documentation, all from within the editor.

[![GitHub Copilot extension in the VS Code Marketplace](images/getting-started/copilot-extension.png)](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

## Next steps

Congratulations! You've completed the tutorial and explored some of the key features of Visual Studio Code. Now that you've learned the basics of Visual Studio Code, get more info about how to:

- [Work with Git repositories and source control](/docs/sourcecontrol/overview.md)

- [Discover and run unit tests for your code](/docs/editor/testing.md)

- [Use the integrated terminal](/docs/terminal/getting-started.md)

- [Enhance your coding with AI and GitHub Copilot](https://docs.github.com/en/copilot/overview)
