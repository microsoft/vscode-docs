---
Order: 11
Area: editor
TOCTitle: Integrated Terminal
ContentId: 7B4DC928-2414-4FC7-9C76-E4A13D6675FE
PageTitle: Integrated Terminal in Visual Studio Code
DateApproved: 6/6/2016
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

The shell used defaults to `$SHELL` on Linux and OS X, and `%COMSPEC%` on Windows. These can be overridden manually by setting `terminal.integrated.shell.*` in [settings](/docs/customization/userandworkspace.md).

For example, if you wanted to use PowerShell on Windows:

```json
    "terminal.integrated.shell.windows":"C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\powershell.exe"
```

## Key Bindings

The **Toggle Integrated Terminal** command is bound to `kb(workbench.action.terminal.toggleTerminal)` to quickly toggle the integrated terminal panel in and out of view.

## Prerelease: Managing Multiple Terminals

Multiple terminals are coming soon and you can start using them today with the [Insiders](/insiders) build.  The UI is under development but you can easily create and navigate between multiple terminals open to different locations.

Along with multiple terminals, new settings (e.g. shell argument lists) and key bindings are also coming in the next release.
