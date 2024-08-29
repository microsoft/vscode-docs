---
Order: 1
Area: getstarted
TOCTitle: Tutorial
ContentId: 72ad9b70-5227-4032-81d7-6aec00a1e8f8
PageTitle: Getting started with Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: This tutorial gives you an overview of the key features of Visual Studio Code to help you get started quickly.
---
# Tutorial: Get started with Visual Studio Code

In this tutorial, you learn about the key features of Visual Studio Code to help you get started with coding quickly. You learn about the different components of the user interface and how to customize it to your liking. You then write some code and use the built-in code editing features, such as IntelliSense and Code Actions, and you learn about running and debugging your code. By installing a language extension, you add support for a different programming language.

<iframe src="https://www.youtube.com/embed/B-s71n0dHUk?autoplay=true" width="640" height="320" allowFullScreen="true" frameBorder="0" title="Getting Started with Visual Studio Code"></iframe>

## Prerequisites

- [Download Visual Studio Code](https://code.visualstudio.com/download)
- [Set up Visual Studio Code on your computer](/docs/setup/setup-overview.md)
- [Install Node.js](https://nodejs.org/)

## Step 1: Open a folder in VS Code

You can use VS Code for individual files or you can open a folder to work on a project with multiple files.

When you open a folder in VS Code, this is called a *workspace*. A workspace enables VS Code to configure settings that only apply to a specific folder, store and restore the UI state associated with the folder, persist task or debug configurations, and more. Learn more about [workspaces](/docs/editor/workspaces.md).

Let's start by creating a folder and opening it in VS Code.

1. Create a new folder `vscode101` on your computer.

1. Open Visual Studio Code.

    When you first open VS Code, you should see the **Welcome** page with different actions to get started. You can also explore some of the VS Code product walkthroughs.

1. On the Welcome page, select **Open Folder...**, and then select the folder you created.

    The VS Code window reloads and you should see the folder name at the top of the **Explorer** view. Use the Explorer view to view and manage the files and folders in your workspace.

    ![Screenshot that shows VS Code after opening a folder, highlighting the Explorer view.](images/getting-started/open-folder.png)

    Alternatively, you can select **Open Folder...** from the **File** menu or press `kb(workbench.action.files.openFolder)` to open a folder.

> **Tip**: When you use the command line, pass the folder name as a parameter to directly launch VS Code for that folder. For example, enter `code .` to open the current folder in VS Code.

## Step 2: Explore the user interface

Now that you have a folder open in VS Code, let's take a quick tour of the user interface.

1. Use the **Activity Bar** on the side of the window to quickly access different views, such as the **Explorer**, **Search**, or **Source Control** views.

    When you select a view, the **Primary Side Bar** shows view-specific information. For example, when you select the **Run and Debug** view, you can access the functionality for running and debugging your code.

    ![Screenshot that shows the Activity Bar and the Run and Debug view in the Primary Side Bar.](images/getting-started/activity-bar-and-side-bar.png)

    > **Tip**: Select the current view in the Activity Bar again to toggle the Primary Side Bar open and closed.

1. Select the Explorer view in the Activity Bar.

1. Select the **New File...** button to create a new file in your workspace. Enter the name `index.html` and press `kbstyle(Enter)`.

    ![Screenshot that shows the New File button in the Explorer view.](images/getting-started/explorer-new-file.png)

    After the file is created, an **Editor** opens in the main area of the window, where you can start typing and editing the file.

    ![Screenshot that shows the Editor in the main area of the window.](images/getting-started/new-file-editor.png)

    You can open as many editors as you like and view them side by side vertically or horizontally. Learn more about [side by side editing](/docs/getstarted/userinterface.md#side-by-side-editing).

1. Open the **Panel** by selecting **View** > **Appearance** > **Panel** from the menu (or press `kb(workbench.action.togglePanel)`).

    The Panel area, below the Editor, contains different views, such as output, debug information, and the integrated terminal.

    ![Screenshot that shows the Panel area with the Terminal view.](images/getting-started/vscode-panel.png)

    > **Tip**: You can move the Panel area with the **View** > **Appearance** > **Panel Position** menu, for example to the left or right for more vertical space.

1. At the bottom, the **Status Bar** shows information about the file you are editing, and the workspace you have open.

    Notice that the Status Bar shows the language mode, indentation, and the line ending of the current editor. If the folder you opened is a Git repository, the Git status and current branch are shown in the Status Bar.

    ![Screenshot that shows the Status Bar at the bottom of the window.](images/getting-started/status-bar.png)

    > **Tip**: You can interact with the fields in the Status Bar, for example to change the language mode or indentation, or to create a new branch in the Git repository.

1. Select **View** > **Command Palette** (or press `kb(workbench.action.showCommands)`) to open the **Command Palette**.

    Many of the commands in VS Code are available through the Command Palette. For example, enter *Create new file* in the Command Palette to create a file in your workspace, or enter *Git* to view the list of Git actions you can trigger.

    ![Screenshot that shows the Command Palette, listing the entries for 'Create new file'.](images/getting-started/command-palette.png)

    > **Tip**: Notice that the Command Palette shows the default keyboard shortcut for commands that have one. You can use the keyboard shortcut to run the command directly.

    You can also use the Command Palette to navigate to files (press `kb(workbench.action.quickOpen)` for Quick Open), search for symbols in files, and more. Learn more about the [Command Palette](/docs/getstarted/userinterface.md#command-palette) in the VS Code documentation.

## Step 3: Customize the user interface

VS Code enables you to change the layout, colors, keyboard shortcuts, and nearly every other aspect of the editor through various settings.

Let's start by using **Color Themes** to customize the colors in VS Code. A Color Theme affects both the VS Code user interface elements and the editor highlighting colors.

To select a different Color Theme:

1. Select the **File** > **Preferences** > **Theme** > **Color Theme** menu item, or enter **Color Theme** command in the Command Palette (`kb(workbench.action.selectTheme)`) to display the Color Theme picker.

1. Use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate through the list and preview the colors of the theme.

    As you move through the list, the active theme is previewed in VS Code.

    ![Screen capture that shows how to switch between different color themes by using the Command Palette.](images/themes/themes_hero.gif)

    > **Tip**: You can also select Color Themes from the VS Code Marketplace directly from the Color Theme picker by selecting **Browse Additional Color Themes...**.

Beyond changing the color theme of the user interface, you can customize almost every part of VS Code by using settings. Maybe you prefer a different font for the editor, change word wrapping, or enable [floating editor windows](/docs/editor/custom-layout.md#floating-editor-windows).

Let's use the **Settings Editor** to modify the tab size in the editor:

1. Select **File** > **Preferences** > **Settings** (or press `kb(workbench.action.openSettings)`) to open the Settings Editor.

    ![Screenshot that shows the Settings Editor.](images/getting-started/settings-editor.png)

1. Modify the value of the **Editor: Tab Size** setting, and notice how the change is applied directly to your editor.

    By default, when you change a setting, it applies to all your VS Code workspaces (**User Settings**). Switch to the **Workspace** tab to change a setting that only applies to the current workspace.

    > **Tip**: Use the search box in the Settings Editor to quickly find a setting.

There are many more ways to customize your VS Code experience, such as [changing default keyboard shortcuts](/docs/getstarted/keybindings.md), adding [code snippets](/docs/editor/userdefinedsnippets.md), or by adding extensions.

## Step 4: Write some code

VS Code is first and foremost a code editor, so let's start by writing some code! VS Code has built-in support for JavaScript, TypeScript, HTML, CSS, and more.

In this tutorial, you create a sample JavaScript file and use some of the basic code editing features that VS Code offers. In the next step, you install a language extension to add support for a different language.

1. In the Explorer view, select the **New File...** button and create a new file `app.js`.

    You should now have two files in the Explorer view, `index.html` and `app.js`. As you select either one of the files, the corresponding editor opens.

1. Select the `app.js` file in the Explorer view and start typing the following JavaScript code:

    ```javascript
    function sayHello(name) {
        console.log('Hello, ' + name);
    }

    sayHello('VS Code');
    ```

    As you type, you should see suggestions popping up that help you complete your code. This is called *IntelliSense*. You can use the `kbstyle(Up)` and `kbstyle(Down)` keys to navigate the suggestions, and `kbstyle(Tab)` to insert the selected suggestion.

    ![Screen capture that shows IntelliSense in action for a JavaScript file.](images/getting-started/javascript-intellisense.gif)

    Notice also the formatting of the code, to help you distinguish between different parts of the code. This is called *syntax highlighting*.

    > **Tip**: Toggle the **File** > **Auto Save** menu item to automatically save files whenever you make changes.

1. Put the cursor on the `Hello,` string, select the lightbulb icon, and then select **Convert to template string** to use a Code Action to simplify the string concatenation.

    **Code Actions** are suggestions that help you apply quick fixes to your code. You can also use the `kb(editor.action.triggerSuggest)` keyboard shortcut to open the lightbulb menu.

    ![Screenshot that shows the lightbulb Code Action to convert a string concatenation to a template string.](images/getting-started/code-action-template-string.png)

    You can further experiment with IntelliSense in the different files in your workspace. For example, in the `index.html` file, start typing `<` to see suggestions for HTML tags.

1. Let's add a new Python file `hello.py` to your workspace.

    When you start typing in the editor, notice that there are no suggestions and IntelliSense for Python. This is because VS Code does not have built-in support for Python. You can add support for Python by installing a language extension.

    In the next step, you install a language extension to add support for different languages to VS Code.

> **Tip**: Enhance your coding with artificial intelligence (AI), such as suggestions for lines of code or entire functions, fast documentation creation, and help creating code-related artifacts like tests. Use [GitHub Copilot](/docs/copilot/overview.md) in VS Code to generate code, or to learn from the code it generates.

## Step 5: Install a language extension

The features that VS Code includes out-of-the-box are just the start. VS Code extensions let you add languages, debuggers, and tools to your installation to support your development workflow. There are thousands of extensions available in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode).

Let's install a language extension to add support for Python, or any other programming language you are interested in.

1. Select the **Extensions** view in the Activity Bar.

    The Extensions view enables you to browse and install extensions from within VS Code. When you open the Extensions view, you see the list of installed extensions, and a list of popular and recommended extensions.

    ![Screenshot that shows the Extensions view, highlighting the Extensions icon in the Activity Bar.](images/getting-started/extensions-view.png)

1. Enter *Python* in the Extension view search box to browse for Python-related extensions.

    The list of extensions shows for each extension its name, short description, publisher, install count, and rating.

1. Select the **Python** extension published by Microsoft and select the **Install** button.

    ![Screenshot that shows the Extensions view with a search for Python extensions.](images/getting-started/extensions-search-python.png)

    After the extension is installed, the **Install** button changes into a gear icon.

1. In the `hello.py` editor, start typing the following Python code and notice that IntelliSense is now available:

    ```python
    def say_hello(name):
        print("Hello, " + name)

    say_hello("VS Code")
    ```

    ![Screen capture that shows IntelliSense in action for a Python file.](images/getting-started/python-intellisense.gif)

Learn more about code [editing features](/docs/editor/codebasics.md), [IntelliSense](/docs/editor/intellisense.md), [code navigation](/docs/editor/editingevolved.md), and [refactoring](/docs/editor/refactoring.md) in VS Code.

Some language extensions also contribute debugging functionality. In the next step, you learn about running and debugging in VS Code.

## Step 6: Run and debug your code

One of the key features in VS Code is its great support for running and debugging code. VS Code has built-in support for running and debugging Node.js applications, and there are extensions available for many other programming languages, such as Python, Java, C#, and more.

In this tutorial, you debug the `app.js` file to explore the built-in Node.js debugger. Most debugging concepts and features are applicable to other debuggers as well.

> **Note**: VS Code has built-in debugging capabilities, but you need to have the necessary runtime and VS Code extension installed on your computer to use them. For example, to debug a Python program, you need to have Python installed on your computer.

Let's first validate our program runs from the command line.

1. Make sure you have Node.js installed on your computer. You can download it from [https://nodejs.org/](https://nodejs.org/).

1. Let's first validate our program runs from the command line. Open the terminal by pressing `kb(workbench.action.terminal.toggleTerminal)` and enter the following command:

    ```bash
    node app.js
    ```

    You should see the output `Hello, VS Code` in the terminal.

    The terminal enables you to run shell commands directly in VS Code, without switching to another terminal application. You can switch between different shells, such as PowerShell, Command Prompt, or Bash, depending on your operating system configuration.

Now let's debug the `app.js` program by using the built-in Node.js debugger.

1. In the `app.js` file, put the cursor on the `console.log` line and press `kbstyle(F9)` to set a breakpoint.

    A red dot appears in the left margin of the editor, indicating that a breakpoint is set. You can also click in the left margin of the editor to set or remove a breakpoint. With a breakpoint, you can pause the execution of your program at a specific line of code.

    ![Screenshot that shows a breakpoint in the editor.](images/getting-started/javascript-set-breakpoint.png)

1. Press `kbstyle(F5)` to start a debugging session, and then select the **Node.js** debugger from the list.

    Notice that the program starts and that the execution stops at the breakpoint you set.

    ![Screenshot that shows the program stopped at a breakpoint in the editor, highlighting the Variables view to inspect variables.](images/getting-started/vscode-debugging.png)

    > **Tip**: Inspect the value of the `name` variable by hovering over it in the editor while the execution is paused. You can view the value of variables at any time in the **Variables** view in the **Run and Debug** view.

1. Press the **Continue** button in the Debug toolbar or press `kbstyle(F5)` to continue the execution.

    ![Screenshot that shows the Debug toolbar with the Continue button highlighted.](images/getting-started/debug-toolbar.png)

There are many more debugging features in VS Code, such as watch variables, conditional breakpoints, launch configurations, etcetera. Dive into the details of [debugging in VS Code](/docs/editor/debugging.md).

## Next steps

Congratulations! You've completed the tutorial and explored some of the key features of Visual Studio Code.

Now that you've learned the basics of Visual Studio Code, you can:

- Work with [Git repositories and source control](/docs/sourcecontrol/overview.md)

- [Discover and run unit tests for your code](/docs/editor/testing.md)

- [Use the integrated terminal](/docs/terminal/getting-started.md)

- [Enhance your coding with AI and GitHub Copilot](https://docs.github.com/en/copilot/overview)
