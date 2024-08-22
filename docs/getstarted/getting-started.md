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

In this tutorial, you learn about the key features of Visual Studio Code to help you get started with coding quickly.

<iframe src="https://www.youtube.com/embed/B-s71n0dHUk?autoplay=true" width="640" height="320" allowFullScreen="true" frameBorder="0" title="Getting Started with Visual Studio Code"></iframe>

## Prerequisites

- [Download Visual Studio Code](https://code.visualstudio.com/download)
- [Set up Visual Studio Code on your computer](/docs/setup/setup-overview.md)
- [Install Node.js](https://nodejs.org/)

## Step 1: Open a folder in VS Code

You can use VS Code for individual files or you can open a folder to work on a project with multiple files.

When you open a folder in VS Code, this is called a *workspace*. A workspace enables VS Code to configure settings that only apply to a specific folder, store and restore the UI state associated with the folder, persist task or debug configurations, and more. Learn more about [workspaces](/docs/editor/workspaces.md).

1. Create a new folder `my-project` on your computer.

1. Open Visual Studio Code.

1. Select **File** > **Open Folder** (or press `kb(workbench.action.files.openFolder)`), and then select the folder you created.

    You should see the folder name at the top of the **Explorer** view. As you add files to the folder, they will appear in the **Explorer** view.

    TODO: Add screenshot

    > **Tip**: You can also open a folder in VS Code by using the command line and passing the path as a parameter. For example, enter `code .` to open the current folder in VS Code.

## Step 2: Explore the user interface

Now that you have a folder open in VS Code, let's take a quick tour of the user interface.

1. Use the **Activity Bar** on the side of the window to quickly access different views, such as the **Explorer**, **Search**, or **Source Control** view.

    When you select a view, the **Primary Side Bar** shows the view-specific information. For example, when you select the **Run and Debug** view, you can access the functionality for running and debugging your workspace.

    TODO: Add screenshot highlighting the Primary Side bar

    > **Tip**: Select the current view in the Activity Bar again to toggle the Primary Side Bar open and closed.

1. Select the Explorer view in the Activity Bar.

1. Select the **New File...** button to create a new file in your workspace. Enter the name `index.html` and press `kbstyle(Enter)`.

    You can also right-click in the empty area of the Explorer view and select **New File** to create a new file.

    TODO: Add screenshot highlighting the New File button

    After the file is created, an **Editor** opens in the main area of the window, where you can start typing and editing the file.

    TODO: Add screenshot highlighting the Editor

    You can open as many editors as you like and view them side by side vertically or horizontally. Learn more about [side by side editing](/docs/getstarted/userinterface.md#side-by-side-editing).

1. Open the Panel by selecting **View** > **Appearance** > **Panel** from the menu (or press `kb(workbench.action.togglePanel)`).

    The **Panel** area, below the Editor, contains different views, such as output, debug information, and the integrated terminal.

    TODO: Add screenshot highlighting the Panel (show terminal with WSL)

    > **Tip**: You can move the Panel area with the **View** > **Appearance** > **Panel Position** menu, for example to the left or right for more vertical space.

1. At the bottom, the **Status Bar** shows information about the file you edit, and the workspace you have open.

    Notice that the Status Bar shows the language mode, indentation, and the line ending of the current editor. If the folder you opened is a Git repository, the Git status and current branch are shown in the Status Bar.

    TODO: Add screenshot highlighting the Status Bar

    > **Tip**: You can interact with the fields in the Status Bar, for example to change the language mode or indentation, or to create a new branch in the Git repository.

1. Select **View** > **Command Palette** (or press `kb(workbench.action.showCommands)`) to open the **Command Palette**.

    Many of the commands in VS Code are available through the Command Palette. For example, enter *Create new file* in the Command Palette to create a file in your workspace.

    TODO: add screenshot of the Command Palette

    > **Tip**: Notice that the the Command Palette shows the default keyboard shortcut for commands that have one. You can use the keyboard shortcut to run the command directly.

    You can also use the Command Palette to navigate to files, search for symbols in files, and more. Learn more about the [Command Palette](/docs/getstarted/userinterface.md#command-palette) in the VS Code documentation.

## Step 3: Customize the user interface

VS Code enables you to change the layout, colors, keyboard shortcuts, and nearly every other aspect of the editor through various settings.

Now that you've explored the user interface, let's start by using color themes to customize the colors in VS Code. A Color Theme affects both the VS Code user interface elements and the editor highlighting colors.

To select a different Color Theme:

1. Select the **File** > **Preferences** > **Theme** > **Color Theme** menu item, or enter **Color Theme** command in the Command Palette (`kb(workbench.action.selectTheme)`) to display the Color Theme picker.

    TODO: add gif of changing color themes

1. Use the Up and Down keys to navigate through the list and preview the colors of the theme.

    As you move through the list, the active theme is previewed in VS Code.

    > **Tip**: You can also select Color Themes from the VS Code Marketplace directly from the Color Theme picker by selecting **Browse Additional Color Themes....**

Beyond changing the color theme of the user interface, you can customize almost every part of VS Code by using settings. Maybe you prefer a different font for the editor, change word wrapping, or enable [floating editor windows](/docs/editor/custom-layout.md#floating-editor-windows).

Let's use the Settings Editor to modify the tab size in the editor:

1. Select **File** > **Preferences** > **Settings** (or press `kb(workbench.action.openSettings)`) to open the Settings Editor.

    TODO: add screenshot of the Settings Editor

1. Modify the value of the **Editor: Tab Size** setting, and notice how the tab size in the editor changes.

    > **Tip**: To change a setting only for the current workspace, select the **Workspace** tab in the Settings Editor and change the setting there.

There are many more ways to customize your VS Code experience, such as [changing default keyboard shortcuts](/docs/getstarted/keybindings.md), adding [code snippets](/docs/editor/userdefinedsnippets.md), or by adding extensions.

## Step 4: Write some code

- Add a file
- Write some code - intro to IntelliSense, Code Actions, etc.
- Enable Auto Save

Include a reference to using Copilot

## Step 5: Install a language extension

- What is an extension
- Install an extension

## Step 6: Run and debug your code

- Make sure Node is
- Run code from integrated terminal
- Set breakpoint
- Use F5 to run and debug

Include a reference to remote tools

## Next steps

Congratulations! You've completed the tutorial. Here are some next steps to help you continue learning about Visual Studio Code:

- Check out the [VS Code tips and tricks](/docs/getstarted/tips-and-tricks.md)
- [VS Code Editor basics](/docs/editor/codebasics.md)
- [Using source control](/docs/sourcecontrol/overview.md)
- [Using the integrated terminal](/docs/terminal/getting-started.md)
- [Running tests](/docs/editor/testing.md)

- Watch more [VS Code intro videos](/docs/getstarted/introvideos.md)
