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

1. Create a new folder `my-project` on your computer.

1. Open Visual Studio Code.

1. Select **File** > **Open Folder** (or press `kb(workbench.action.files.openFolder)`), and then select the folder you created.

    You should see the folder name at the top of the **Explorer** view. As you add files to the folder, they will appear in the **Explorer** view.

    TODO: Add screenshot

    > **Tip**: You can also open a folder in VS Code by using the commandline and passing the path as a parameter. For example, enter `code .` to open the current folder in VS Code.

When you open a folder in VS Code, this is called a *workspace*. A workspace enables VS Code to configure settings that only apply to a specific folder, store and restore the UI state associated with the folder, persist task or debug configurations, and more. Learn more about [workspaces](/docs/editor/workspaces.md) in the VS Code documentation.

## Step 2: Explore the user interface

Now that you have a folder open in VS Code, let's take a quick tour of the user interface.

### Activity Bar

The **Activity Bar** is on the side of the window and gives you quick access to different views, like the **Explorer**, **Search**, **Source Control**, or other views.

1. Select one of the views the Activity Bar to switch to that view.

    When you select a view, the **Primary Side Bar** then shows the view-specific information. For example, when you select the **Explorer** view, the Primary Side Bar shows the files in your workspace.

    TODO: Add screenshot highlighting the Primary Side bar

    > **Tip**: Show or hide views by right-clicking on the Activity Bar and selecting or deselecting the view you want to show or hide.

1. Select the current view again in the Activity Bar to close the Primary Side Bar.

    TODO: Add screenshot highlighting the Activity Bar

### Editor

The main area of the window is the **Editor**, where you write and edit your files.

1. Double-click in the main area to create an editor.

    Notice that a new tab appears in the Editor area. You can now start typing in the editor.

    TODO: Add screenshot highlighting the Editor

1. Double-click again next to the first tab to create another editor.

    You can open as many editors as you like and view them side by side vertically or horizontally. Learn more about [side by side editing](/docs/getstarted/userinterface.md#side-by-side-editing).

    TODO: add screenshot of multiple editors

### Panel

The **Panel** area, below the Editor, contains different views, such as output, debug information, and the integrated terminal.

1. Open the Panel by selecting **View** > **Appearance** > **Panel** from the menu (or press `kb(workbench.action.togglePanel)`).

    > **Tip**: You can move the Panel area, for example to the left or right for more vertical space.

    TODO: Add screenshot highlighting the Panel

1. Select the **Terminal** tab in the Panel to show the integrated terminal.

    Notice that the terminal has its working folder set to the folder you opened in VS Code.

    TODO: Add screenshot highlighting the Terminal

### Command Palette

Many of the commands in VS Code are available through the **Command Palette**.

1. Select **View** > **Command Palette** (or press `kb(workbench.action.showCommands)`) to open the Command Palette.

    TODO: add screenshot of the Command Palette

1. Type **Create new file** in the Command Palette, select the suggested command, and then select the file type to create a new file in your workspace.

    TODO: add screenshot of the Command Palette

    > **Tip**: You can also use the Command Palette to navigate to files, search for symbols in files, and more. Learn more about the [Command Palette](/docs/getstarted/userinterface.md#command-palette) in the VS Code documentation.

### Status Bar

At the bottom of the window, the **Status Bar** shows information about the files you edit, and the workspace you have open. For example, if the folder is a Git repository, the Git status and current branch are shown in the Status Bar.

1. Select the language mode in the Status Bar to change the language mode of the current file to JavaScript.

    TODO: Add screenshot highlighting the Status Bar

1. Select the indentation in the Status Bar to change the indentation of the current file to tabs.

    TODO: Add screenshot highlighting the Status Bar

## Step 3: Customize the user interface

- Change appearance with themes
- Use settings (font size/type?)
- More: keybindings, snippets, extensions

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
