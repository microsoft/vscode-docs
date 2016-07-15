---
Order: 11
Area: editor
TOCTitle: Integrated Terminal
ContentId: 7B4DC928-2414-4FC7-9C76-E4A13D6675FE
PageTitle: Integrated Terminal in Visual Studio Code
DateApproved: 7/7/2016
MetaDescription: Visual Studio Code has an integrated terminal so you can work in the shell of your choice without leaving the editor.  
---

# Integrated Terminal

In Visual Studio Code, you can open an integrated terminal, initially starting at the root of your workspace. This can be very convenient as you don't have to switch windows or alter the state of an existing terminal to perform a quick command line task.

To open the terminal:

* Use the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut.
* Use the **View** | **Toggle Integrated Terminal** menu command.
* From the **Command Palette** (`kb(workbench.action.showCommands)`), use the **View:Toggle Integrated Terminal** command.

![Terminal](images/integrated-terminal/integrated-terminal.png)

> **Note:** You can still open an external shell with the Explorer **Open in Command Prompt** command (**Open in Terminal** on OS X or Linux) if you prefer to work outside VS Code.

## Configuration

The shell used defaults to `$SHELL` on Linux and OS X, and `%COMSPEC%` on Windows. These can be overridden manually by setting `terminal.integrated.shell.*` in [settings](/docs/customization/userandworkspace.md). Arguments can be passed to the terminal shell on Linux and OS X using the `terminal.integrated.shellArgs.*` settings.

### Windows

Correctly configuring your shell on Windows is a matter of locating the right executable. VS Code defaults to the `%COMSPEC%` environment variable on Windows which typically points to the 32-bit version of `cmd.exe`. 

Below are a list of common shell executables and their default locations:

```json
// 64-bit cmd it available, otherwise 32-bit
"terminal.integrated.shell.windows":"C:\\Windows\\sysnative\\cmd.exe"
// 64-bit PowerShell if available, otherwise 32-bit
"terminal.integrated.shell.windows":"C:\\Windows\\sysnative\\WindowsPowerShell\\v1.0\\powershell.exe"
// Git Bash
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"
// Bash on Ubuntu (on Windows)
"terminal.integrated.shell.windows": "C:\\Windows\\sysnative\\bash.exe"
```

### Linux & OS X

Typically `$SHELL` is your primary shell on Unix-like systems so you probably won't want to change the shell. You can pass arguments to the shell when it is launched. 

For example, to enable running bash as a login shell (which runs `.bash_profile`), pass in the `-l` argument (with double quotes):

```json
// Linux
"terminal.integrated.shellArgs.linux": ["-l"]
// OS X
"terminal.integrated.shellArgs.osx": ["-l"]
```

## Key Bindings

The **Toggle Integrated Terminal** command is bound to `kb(workbench.action.terminal.toggleTerminal)` to quickly toggle the integrated terminal panel in and out of view.

Other terminal commands are available and can be bound to your preferred keyboard shortcuts.

They are:

* `workbench.action.terminal.focus`: Focus the terminal. This is like toggle but focuses the terminal instead of hiding it, if it is visible.
* `workbench.action.terminal.focusNext`: Focuses the next terminal instance.
* `workbench.action.terminal.focusPrevious`: Focuses the previous terminal instance.
* `workbench.action.terminal.kill`: Remove the current terminal instance.
* `workbench.action.terminal.runSelectedText`: Run the selected text in the terminal instance.

### Copy & Paste

#### OS X

Copy and paste on OS X can be done using the standard keys, `kbstyle(Cmd+C)` and `kbstyle(Cmd+V)` respectively.

#### Linux & Windows

Copy and paste on Linux & Windows can be done using `kbstyle(Ctrl+Ins)` and `kbstyle(Shift+Ins)` respectively. 

> Pre-release: This is changing in the upcoming version to `kbstyle(Ctrl+Shift+C)` and `kbstyle(Ctrl+Shift+V)`. This change is available now in the [Insiders build](https://code.visualstudio.com/insiders).

## Managing Multiple Terminals

You can create multiple terminals (`+` button) open to different locations and easily navigate between them.

![Multiple Terminals](images/integrated-terminal/terminal-multiple-instances.png)

If you use multiple terminals extensively, you can add key bindings for the `focusNext`, `focusPrevious` and `kill` commands outlined in the [Key Bindings section](/docs/editor/integrated-terminal.md#key-bindings) to allow navigation between them using only the keyboard.

## Common Questions

### Why is VS Code shortcut X not working when the terminal has focus?

Currently the terminal consumes many key bindings, preventing Visual Studio Code from reacting to them. Some examples are `kbstyle(F1)` to open the **Command Palette** and `kbstyle(Ctrl+P)` for **Quick Open** on Linux and Windows. This is necessary as various terminal programs and/or shells may respond to these key bindings themselves. There are plans to explore a blacklist that would prevent certain key bindings from being handled by the terminal (see [#7269](https://github.com/Microsoft/vscode/issues/7269)).