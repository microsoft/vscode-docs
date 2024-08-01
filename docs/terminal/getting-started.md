---
Order: 1
Area: terminal
TOCTitle: Getting Started Tutorial
ContentId: 7B4DC928-2414-4FC7-9C76-E4A13D6675FE
PageTitle: Getting started with the integrated terminal
DateApproved: 08/01/2024
MetaDescription: Learn how to get started running shell commands with the integrated terminal in Visual Studio Code.
---
# Getting started with the terminal

Visual Studio Code includes a fully featured integrated terminal. You can use it to run commands like `echo`, `ls`, and `git`, just like a standalone terminal. The terminal in VS Code also provides integration with the editor to support features such as links to workspace files and error detection.

The terminal can use various shells installed on your machine. A shell is a program that interprets and executes the commands by interacting with the operating system. Examples of shells include Bash, Zsh, and PowerShell.

This tutorial guides you through the basics of using the terminal in Visual Studio Code.

## Run your first command in the terminal

While you're writing code, you might have to run shell commands to build, test, or deploy your application. The terminal in VS Code enables you to run these commands without leaving the editor.

To get started with the terminal:

1. Start VS Code and open a folder or workspace.

1. Open the terminal by selecting **View** > **Terminal** from the menu bar, or by pressing the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut.

    Based on your operating system configuration, the terminal opens with a default shell like Bash, PowerShell, or Zsh. The shell's working directory starts at the root of the workspace folder.

    ![Open the terminal](./images/getting-started/open-terminal.png)

1. Enter a basic command like `ls` to list the files in the current directory.

    The terminal displays the output of the command, similar to a standalone terminal, except that you stay within the editor.

    ![Run a command in the terminal](./images/getting-started/terminal-output.png)

    > **Tip**: You can enlarge the terminal by dragging the terminal panel's border or by selecting the `^` icon to maximize the panel.

## Interact with command output

The terminal in VS Code also provides features to interact with command output. Commands often output file paths or URLs that you might want to open or navigate to. For example, a compiler or linter might return an error message with a file path and line number. Instead of searching for that file, you can select the link in the terminal output to open the file directly in the editor.

Let's see how you can interact with the command outputs in the terminal:

1. Open the terminal where you previously ran the `ls` command.

1. In the terminal, hold the `kbstyle(Ctrl)`/`kbstyle(Cmd)` key, hover over a file name, and then select the link.

    Notice that when you hover over text in the output, it changes into a link. When you select a file name, VS Code opens the selected file in the editor.

    ![Navigate to files/URLs using links in terminal output](./images/getting-started/terminal-links.png)

    All text in the terminal output is clickable. If you select a hyperlink in the terminal, it opens the link in the default browser. For other text, VS Code tries to search the workspace for files that contain the text.

1. Run the following command to create a `Command.txt` file that contains a list of available shell commands.

    * PowerShell

        ```powershell
        Get-Command | Out-File -FilePath .\Command.txt
        ```

    * Bash / Zsh

        ```bash
        ls -l /usr/bin > Command.txt
        ```

1. Enter the following command to search for a command in the `Command.txt` file.

    * PowerShell

        ```powershell
        Get-ChildItem *.txt | Select-String "dir"
        ```

    * Bash / Zsh

        ```bash
        grep -n "dir" *.txt
        ```

    Notice that the command output contains the file name and the line number where the search result is found. The terminal identifies this text as a link.

1. Select one of the links to open the file in the editor at that specific line in the file.

    ![Navigate to a specific line in a file](./images/getting-started/terminal-line-column.png)

Learn more about the different types of [links in the terminal](/docs/terminal/basics.md#links).

## Navigate to previous commands

As you work in the terminal, you might need to review a previous command and its output, or maybe you want to rerun a command. You can quickly navigate to the previous commands by using keyboard shortcuts.

To navigate to previous commands:

1. Open the terminal you used previously.

1. Press the `kb(workbench.action.terminal.scrollToPreviousCommand)` keyboard shortcut to scroll to the previous command in the terminal history.

    Notice that the terminal scrolls to the previous command and highlights it.

    ![Navigate to the previous command](./images/getting-started/previous-command.png)

    If you press `kb(workbench.action.terminal.scrollToPreviousCommand)` multiple times, the terminal scrolls further through the command history. You can use the `kb(workbench.action.terminal.scrollToNextCommand)` keyboard shortcut to navigate in the other direction.

1. You might see a circle icon in the gutter next to a previously run command. Select the circle icon, and then select **Rerun Command** to run the command again.

    ![Rerun a command](./images/getting-started/rerun-command.png)

Learn more about [navigating through the command history](/docs/terminal/shell-integration.md#command-navigation).

## Run commands in another shell

The terminal supports having multiple terminals open at the same time. For example, you could dedicate one terminal to run Git commands and another terminal to run build scripts. You can also run commands in different shells based on your preference.

To add a new terminal in a different shell:

1. Select the `˅` icon in the terminal panel to open the terminal dropdown, and then select from one of the available shells.

    > **Note**: The available shells depend on the shells installed on your machine.

    ![Select a different shell](./images/getting-started/select-shell.png)

    A new terminal opens with the selected shell, where you can enter commands like you did previously.

    > **Tip**: You can also select the `+` icon to create a new terminal for the default shell, use the `kb(workbench.action.terminal.new)` keyboard shortcut, or select **Terminal** > **New Terminal** from the menu bar.

1. You can view the open terminals from the list in the terminal panel.

    ![View the list of terminals](./images/getting-started/terminal-list.png)

    To switch to another terminal, select it from the list of terminals.

    > **Tip**: You can rename a terminal in the list by right-clicking on it and selecting **Rename**.

1. Drag a terminal from the terminal list into the editor area.

    The terminal is moved to an editor tab, where you can arrange it like other editor tabs. For example, you can drag the terminal tab out of the VS Code window to make it a floating window. Learn more about [custom layouts](/docs/editor/custom-layout.md#editor).

    ![Move a terminal to the editor area](./images/getting-started/move-terminal.png)

1. Select the trashcan icon when hovering over the terminal list to close an open terminal.

    ![Close a terminal](./images/getting-started/close-terminal.png)

Learn more about [managing terminals](/docs/terminal/basics.md#managing-terminals).

## Next steps

In this tutorial, you learned how to get started with the terminal in VS Code. Here are some more topics to explore:

* Learn the [fundamental concepts and features of the terminal](/docs/terminal/basics.md)
* Explore how to [create and manage terminal profiles](/docs/terminal/profiles.md)
* Discover various ways to [customize the appearance and behavior](/docs/terminal/appearance.md) of the terminal
