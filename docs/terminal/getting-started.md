---
Order: 1
Area: terminal
TOCTitle: Getting Started Tutorial
ContentId: 7B4DC928-2414-4FC7-9C76-E4A13D6675FE
PageTitle: Getting started with the integrated terminal
DateApproved: 06/05/2024
MetaDescription: Learn how to get started running shell commands with the integrated terminal in Visual Studio Code.
---
# Getting started with the terminal

Visual Studio Code includes a fully-featured integrated terminal. The integated terminal can run commands like `mkdir`, `ls`, and `git`, just like a standalone terminal. It also provides integration with the editor to support features such as links to workspace files or error detection.

The integrated terminal can use various shells installed on your machine. A shell is a program that interprets and executes the commands by interacting with the operating system. Examples of shells include Bash, Z shell, and PowerShell.

This tutorial guides you through the basics of using the integrated terminal in Visual Studio Code.

## Run your first command in the terminal

While you're writing code, you might have to run shell commands to build, test, or deploy your application. The integrated terminal in VS Code enables you to run these commands without leaving the editor.

To get started with the terminal:

1. Start VS Code and open a folder or workspace.

1. Open the terminal by selecting **View** > **Terminal** from the menu bar, or by pressing `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut.

    Based on your operating system configuration, the terminal opens with a default shell like Bash, PowerShell, or Command Prompt.

    ![Open the terminal](./images/getting-started/open-terminal.png)

    Note that the shell starts at the root of the workspace folder.

1. Enter a basic command like `ls` (on macOS and Linux) or `dir` (on Windows) to list the files in the current directory.

    The terminal displays the output of the command, similar to a standalone terminal, except that you stay within the editor.

    ![Run a command in the terminal](./images/getting-started/terminal-output.png)

    > **Tip**: You can enlarge the terminal by dragging the terminal panel's border or by selecting the chevron up icon to maximize the panel.

## Interact with command outputs

The terminal in VS Code also provides features to interact with the command outputs, which can be helpful during development. Commands often output file paths or URLs that you might want to open or navigate to. For example, the compiler or linter might return an error message with a file path and line number.

Let's see how you can interact with the command outputs in the terminal:

1. Open the terminal where you previously ran the `ls` or `dir` command.

1. In terminal, hold the `kbstyle(Ctrl)`/`kbstyle(Cmd)` key, hover over a file name, and then select the link.

    Notice that when you hover over text in the output, it changes into a link. When you select a file name, VS Code opens the selected file in the editor.

    ![Navigate to files/URLs using links in terminal output](./images/getting-started/terminal-links.png)

    All text in the terminal output is clickable. If you select a hyperlink in the terminal, it opens the link in the default browser. For other text, VS Code opens a Quick Pick that enables you to search for that text across your workspace.

1. Run the following command to create a `Command.txt` file in the terminal that contains a list of commands.

    * PowerShell

        ```powershell
        Get-Command | Out-File -FilePath .\Command.txt
        ```

    * Bash

        ```bash
        ls -l /usr/bin > Command.txt
        ```

1. Use the following command to search for a command in the `Command.txt` file.

    * PowerShell

        ```powershell
        Get-ChildItem *.txt | Select-String "dir"
        ```

    * Bash

        ```bash
        grep -n "dir" *.txt
        ```

    Notice that the output contains the file name and the line number where the search result is found. The terminal identifies this as a link, and you can then select the link to open the file in the editor at that specific line in the file.

    ![Navigate to a specific line in a file](./images/getting-started/terminal-line-column.png)

Learn more about the different types of [links in the terminal](/docs/terminal/basics.md#links).

## Navigate to previous commands

As you work in the terminal, you might need to review a previous command and its output, or maybe you want to rerun a command. You can quickly navigate to the previous commands by using keyboard shortcuts.

To navigate to previous commands:

1. Open the terminal you used previously.

1. Press the `kb(workbench.action.terminal.scrollToPreviousCommand)` keyboard shortcut to scroll to the previous command in the terminal history.

    Notice that the terminal highlights and scrolls to the previous command.

    ![Navigate to the previous command](./images/getting-started/previous-command.png)

    If you keep pressing `kb(workbench.action.terminal.scrollToPreviousCommand)` multiple times, the terminal scrolls further through the command history. You can use the `kb(workbench.action.terminal.scrollToNextCommand)` keyboard shortcut to navigate in the other direction.

1. Depending on which shell you're using, you can see a circle icon in the gutter next to a previously run command.

1. Select the circle icon to view the available options for that command. Select **Rerun Command** to run the command again.

    ![Rerun a command](./images/getting-started/rerun-command.png)

Learn more about [navigating through the command history](/docs/terminal/shell-integration.md#command-navigation).

## Run commands in another shell

The integrated terminal supports having multiple terminals open at the same time. For example, you could dedicate one terminal to run Git commands and another terminal to run build scripts. You can also run commands in different shells based on your preference.

To add a new terminal in a different shell:

1. Open the terminal.

1. Select the down chevron icon in the terminal panel to open the terminal dropdown, and then select from one of the available shells.

    > **Note**: The available shells depend on the shells installed on your machine.

    ![Select a different shell](./images/getting-started/select-shell.png)

    A new terminal opens with the selected shell. You can enter commands in the new terminal like you did previously.

1. You can view the open terminals from the list in the terminal panel.

    ![View the list of terminals](./images/getting-started/terminal-list.png)

1. To switch to another terminal, select it from the list of terminals.

1. To close an open terminal, select the trashcan icon when hovering over the terminal list.

    ![Close a terminal](./images/getting-started/close-terminal.png)

> **Tip**: You can also select the `+` icon to create a new terminal for the default shell, use the `kb(workbench.action.terminal.new)` keyboard shortcut, or select **Terminal** > **New Terminal** from the menu bar.

Learn more about [managing terminals](/docs/terminal/basics.md#managing-terminals).

## Next steps

In this tutorial, you learned how to get started with the integrated terminal in VS Code. Here are some additional topics to explore:

* Learn the [fundamental concepts and features of the integrated terminal](/docs/terminal/basics.md)
* Explore how to [create and manage terminal profiles](/docs/terminal/profiles.md) to customize your terminal experience
* Discover various ways to [customize the appearance and behavior](/docs/terminal/customization.md) of the terminal
