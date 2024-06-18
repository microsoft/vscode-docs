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

    The terminal also support directly navigating to a specific line and column in a file. The following example shows the output of the `grep` command that returns the file name and the line number, separated by a colon. You can select the link to navigate to that line in the file.

    ![Navigate to a specific line in a file](./images/getting-started/terminal-line-column.png)

Learn more about the different types of [links in the terminal](/docs/terminal/basics.md#links).

## Navigate to previous commands

- Use a keybinding to navigate to a previous command in the terminal history

## Run commands in another shell

- Add a new terminal with a different shell
- Run a command in the new terminal
- View the list of terminals
- Close the terminal

## Arrange the terminal window

- Move the terminal into an editor window, optionally make it floating

## Next steps

- Terminal basics
- Terminal profiles
- Terminal customization
