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

It can be convenient to have a terminal embedded directly in VS Code, initially scoped to the workspace you are working in. You don't have to switch windows or alter the state of an existing terminal for a quick task.

You can open the terminal using `kb(workbench.action.terminal.toggleTerminal)`, from the **View** | **Toggle Integrated Terminal** menu, or from the **View** > **Toggle Integrated Terminal** command in the **Command Palette**.

![Terminal](images/integrated-terminal/integrated-terminal.png)

## Configuration

The shell used defaults to `$SHELL` on Linux and OS X, and `%COMSPEC%` on Windows. These can be overridden manually by setting `terminal.integrated.shell.*` in [settings](/docs/customization/userandworkspace.md).

## Key Bindings

The **Toggle Integrated Terminal** command is bound to `kb(workbench.action.terminal.toggleTerminal)` to quickly toggle the integrated terminal panel in and out of view.

>**Note:** The **Toggle Integrated Terminal** key binding `kb(workbench.action.terminal.toggleTerminal)` had previously been bound to the **Cycle Between Open Editors** command. You can [customize](https://code.visualstudio.com/docs/customization/keybindings#_customizing-shortcuts) the key bindings and change the behavior back if desired.

## Managing Multiple Terminals

Multiple terminals are coming soon and you can start using them today with the [Insiders](/insiders) build.  The UI is under development but you can easily create and navigated between multiple terminals scoped to different locations.

Along with multiple terminals, new settings (e.g. shell argument list) and key bindings are also coming the next release.
