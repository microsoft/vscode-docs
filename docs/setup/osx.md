---
Order: 2
Area: setup
TOCTitle: OS X
ContentId: EEADB50A-F5E3-41E9-89DA-35F165196691
PageTitle: Running Visual Studio Code on OS X
DateApproved: 7/7/2016
MetaDescription: Get Visual Studio Code up and running on Mac OS X.
---

# Running VS Code on OS X

## Installation

1. [Download Visual Studio Code](https://go.microsoft.com/fwlink/?LinkID=534106) for Mac OS X.
2. Double-click on the downloaded archive to expand the contents.
3. Drag `Visual Studio Code.app` to the `Applications` folder, making it available in the `Launchpad`.
4. Add VS Code to your Dock by right-clicking on the icon and choosing `Options`, `Keep in Dock`.

>**Tip:** If you want to run VS Code from the terminal by simply typing 'code', VS Code has a command, **Shell Command: Install 'code' command in PATH**, to add 'code' to your `$PATH` variable list.
>
>After installation, launch VS Code. Now open the **Command Palette** (`kb(workbench.action.showCommands)`) and type `shell command` to find the **Shell Command: Install 'code' command in PATH** command.
>
>![OS X shell commands](images/osx/shell-command.png)
>
>After executing the command, restart the terminal for the new `$PATH` value to take effect. You'll be able to simply type 'code .' in any folder to start editing files in that folder.

## Updates

VS Code ships monthly [releases](/updates) and supports auto-update when a new release is available. If you're prompted by VS Code, accept the newest update and it will get installed (you won't need to do anything else to get the latest bits). If you'd rather control VS Code updates manually, see [How do I opt out of auto-updates](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates).

## Preferences Menu

You can configure VS Code through [settings](/docs/customization/userandworkspace.md), [color themes](/docs/customization/themes.md) and [custom keybindings](/docs/customization/keybindings.md) and you will see often see mention in our documentation of the **File** > **Preferences** menu group.  On a Mac, the **Preferences** menu group is under **Code**, not **File**.

## Next Steps

Once you have installed VS Code, these topics will help you learn more about VS Code:

* [Additional Components](/docs/setup/additional-components.md) - Learn how to install Git, Node.js, TypeScript and tools like Yeoman.
* [The Basics](/docs/editor/codebasics.md) - A quick orientation around VS Code.
* [User/Workspace Settings](/docs/customization/userandworkspace.md) - Learn how to configure VS Code to your preferences settings.

## Common Questions

### VS Code fails to start OmniSharp

On OS X, VS Code can no longer start OmniSharp after updating VS Code.

To fix this issue, run these commands to update mono:

```bash
brew update
brew reinstall mono
```

### Mono and El Capitan

Mono stopped working in Visual Studio Code after I installed OS X 10.11 El Capitan Public Beta. What do I do?

Run these commands:

```bash
brew update
brew reinstall mono
```

