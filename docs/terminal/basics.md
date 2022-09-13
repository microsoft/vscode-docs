---
Order: 1
Area: terminal
TOCTitle: Terminal Basics
ContentId: 7B4DC928-2414-4FC7-9C76-E4A13D6675FE
PageTitle: Integrated Terminal in Visual Studio Code
DateApproved: 9/1/2022
MetaDescription: Visual Studio Code has an integrated terminal to enable working in your shell of choice without leaving the editor.
---
# Terminal Basics

Visual Studio Code includes a fully-featured integrated terminal that conveniently starts at the root of your workspace. It provides integration with the editor to support features like [links](#links) and [error detection](/docs/editor/tasks.md).

To open the terminal:

* Use the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut with the backtick character.
* Use the **View** > **Terminal** menu command.
* From the **Command Palette** (`kb(workbench.action.showCommands)`), use the **View: Toggle Terminal** command.
* You can create a new terminal via the **Terminal** menu with **Terminal** > **New Terminal**.

![Terminal](images/basics/integrated-terminal.png)

> **Note:** Open an external terminal with the `kb(workbench.action.terminal.openNativeConsole)` keyboard shortcut if you prefer to work outside VS Code.

## Terminal shells

The integrated terminal can use various shells installed on your machine, with the defaults being:

* PowerShell on Windows
* bash on macOS and Linux

You can select other available shells to use in terminal instances or as the default such as Command Prompt on Windows, and zsh on macOS and Linux.

![Integrated terminal shell selection dropdown](images/basics/select-shell-dropdown.png)

You can learn more about configuring terminal shells in the [terminal profiles](/docs/terminal/profiles.md) article.

>**Note**: If you're having trouble launching your preferred shell in the integrated terminal, it may be due to your shell's configuration or a VS Code terminal setting. There's a [dedicated troubleshooting guide](/docs/supporting/troubleshoot-terminal-launch.md) to help you with these sorts of problems.

## Managing terminals

The terminal tabs UI is on the right side of the terminal view. Each terminal has an entry with its name, icon, color, and group decoration (if any).

![Terminal tabs](images/basics/tabs.png)

> **Tip:** Change the tabs location using the `terminal.integrated.tabs.location` setting.

Terminal instances can be added by selecting the **+** icon on the top-right of the **TERMINAL** panel, selecting a profile from the terminal dropdown, or by triggering the `kb(workbench.action.terminal.new)` command. This action creates another entry in the tab list associated with that terminal.

Remove terminal instances by hovering a tab and selecting the **Trash Can** button, selecting a tab item and pressing `kbstyle(Delete)`, using **Terminal: Kill the Active Terminal Instance** command, or via the right-click context menu.

Navigate between terminal groups using focus next `kb(workbench.action.terminal.focusNext)` and focus previous `kb(workbench.action.terminal.focusPrevious)`.

Icons may appear to the right of the terminal title on the tab label when a terminal's status changes. Some examples are a bell (macOS) and for tasks, displaying a check mark when there are no errors and an X otherwise. Hover the icon to read status information, which may contain actions.

### Grouping

Split the terminal by:

* On hover, selecting the inline split button.
* Right-clicking the context menu and selecting the **Split** menu option.
* `kbstyle(Alt)` click on a tab, the **+** button, or the single tab on the terminal panel.
* Triggering the `kb(workbench.action.terminal.split)` command.

Navigate between terminals in a group by focusing the previous pane, `kb(workbench.action.terminal.focusPreviousPane)`, and focusing the next pane, `kb(workbench.action.terminal.focusNextPane)`.

Dragging and dropping tabs in the list will rearrange them. Dragging a tab into the main terminal area allows joining a group.

Unsplit a split terminal by triggering the **Terminal: Unsplit Terminal** command through the Command Palette or in the right-click context menu.

### Customizing Tabs

Change the terminal's name, icon, and tab color via the right-click context menu or by triggering the following commands:

| Command                | Command ID                              |
| ---------------------- | --------------------------------------- |
| Terminal: Rename       | `workbench.action.terminal.rename`      |
| Terminal: Change Icon  | `workbench.action.terminal.changeIcon`  |
| Terminal: Change Color | `workbench.action.terminal.changeColor` |

>**Tip:** Go back to the old version by setting `terminal.integrated.tabs.enabled:false`

![Multiple Terminals](images/basics/terminal-multiple-instances.png)

## Working directory

By default, the terminal will open at the folder that is opened in the Explorer. The `terminal.integrated.cwd` setting allows specifying a custom path to open instead:

```json
{
    "terminal.integrated.cwd": "/home/user"
}
```

Split terminals on Windows will start in the directory that the parent terminal started with. On macOS and Linux, split terminals will inherit the current working directory of the parent terminal. This behavior can be changed using the `terminal.integrated.splitCwd` setting:

```json
{
    "terminal.integrated.splitCwd": "workspaceRoot"
}
```

There are also extensions available that give more options such as [Terminal Here](https://marketplace.visualstudio.com/items?itemName=Tyriar.vscode-terminal-here).

## Links

The terminal features link detection, showing an underline when files or URLs are hovered with the mouse that will go to the target when `kbstyle(Ctrl)`/`kbstyle(Cmd)` is held. If a file or URL cannot be detected, they are still surfaced as low confidence "workspace search" links, which only show an underline when hovered if the modifier is down. These low confidence links will search the workspace for the term, opening the match if one is found.

Depending on the type of link, activating it will do one of the following:

* Open the file in an editor.
* Focus the folder in the workspace.
* Open a new window with a folder outside the workspace.
* Search the workspace using a Quick Pick with all matches.

Extensions make use of links in the terminal, such as GitLens, to identify branches.

![A branch link is hovered in the terminal](images/basics/gitlens-link.png)

## Copy & Paste

The keybindings for copy and paste follow platform standards:

* Linux: `kbstyle(Ctrl+Shift+C)` and `kbstyle(Ctrl+Shift+V)`; selection paste is available with `kbstyle(Shift+Insert)`
* macOS: `kbstyle(Cmd+C)` and `kbstyle(Cmd+V)`
* Windows: `kbstyle(Ctrl+C)` and `kbstyle(Ctrl+V)`

## Using the mouse

### Right-click behavior

The right-click behavior differs based on the platform:

* Linux: Show the context menu.
* macOS: Select the word under the cursor and show the context menu.
* Windows: Copy and drop selection if there is a selection, otherwise paste.

This can be configured using the `terminal.integrated.rightClickBehavior` setting.

### Alt click

`kbstyle(Alt)` left click will reposition the cursor to underneath the mouse. This works by simulating arrow keystrokes, which may fail for some shells or programs. This feature can be disabled.

## Find

The integrated terminal has find functionality that can be triggered with `kb(workbench.action.terminal.focusFind)`.

If you want `kbstyle(Ctrl+F)` to go to the shell instead of launching the Find control on Linux and Windows, you will need to add the following to your `settings.json`, which will tell the terminal not to skip the shell for keybindings matching the `workbench.action.terminal.focusFind` command:

```json
{
  "terminal.integrated.commandsToSkipShell": [
    "-workbench.action.terminal.focusFind"
  ],
}
```

## Run selected text

To use the `runSelectedText` command, select text in an editor and run the command **Terminal: Run Selected Text in Active Terminal** via the **Command Palette** (`kb(workbench.action.showCommands)`):

![Run selected text](images/basics/terminal_run_selected.png)

The terminal will attempt to run the selected text.

![Run selected text result](images/basics/terminal_run_selected_result.png)

If no text is selected in the active editor, the line that the cursor is on is run in the terminal.

>**Tip:** Also run the active file using the command `workbench.action.terminal.runActiveFile`.

## Automating launching of terminals

The [Tasks](/docs/editor/tasks.md) feature can be used to automate the launching of terminals, for example, the following `.vscode/tasks.json` file will launch a Command Prompt and PowerShell terminal in a single terminal group when the window starts:

```jsonc
{
  "version": "2.0.0",
  "presentation": {
    "echo": false,
    "reveal": "always",
    "focus": false,
    "panel": "dedicated",
    "showReuseMessage": true
  },
  "tasks": [
    {
      "label": "Create terminals",
      "dependsOn": [
        "First",
        "Second"
      ],
      // Mark as the default build task so cmd/ctrl+shift+b will create them
      "group": {
        "kind": "build",
        "isDefault": true
      },
      // Try start the task on folder open
      "runOptions": {
        "runOn": "folderOpen"
      }
    },
    {
      // The name that shows up in terminal tab
      "label": "First",
      // The task will launch a shell
      "type": "shell",
      "command": "",
      // Set the shell type
      "options": {
        "shell": {
          "executable": "cmd.exe",
          "args": []
        }
      },
      // Mark as a background task to avoid the spinner animation on the terminal tab
      "isBackground": true,
      "problemMatcher": [],
      // Create the tasks in a terminal group
      "presentation": {
        "group": "my-group"
      }
    },
    {
      "label": "Second",
      "type": "shell",
      "command": "",
      "options": {
        "shell": {
          "executable": "pwsh.exe",
          "args": []
        }
      },
      "isBackground": true,
      "problemMatcher": [],
      "presentation": {
        "group": "my-group"
      }
    }
  ]
}
```

This file could be committed to the repository to share with other developers or created as a user task via the `workbench.action.tasks.openUserTasks` command.

## Next steps

The basics of the terminal have been covered in this document. Read on to find out more about:

* [Tasks](/docs/editor/tasks.md) - Tasks let you integrate with external tools and leverage the terminal heavily.
* [Mastering VS Code's Terminal](https://www.growingwiththeweb.com/2017/03/mastering-vscodes-terminal.html) - An external blog with plenty of power user tips for the terminal.
* Explore the rest of the terminal commands by browsing your keybindings.json file within VS Code.

## Common questions

### I'm having problems launching the terminal

There's a [dedicated troubleshooting guide](/docs/supporting/troubleshoot-terminal-launch.md) for these sorts of problems.

### Why is VS Code shortcut X not working when the terminal has focus?

Currently, the terminal consumes many key bindings, preventing Visual Studio Code from reacting to them. An example of this is `kbstyle(Ctrl+B)` to open the Side Bar on Linux and Windows. This is necessary as various terminal programs and/or shells may respond to these key bindings themselves. Use the `terminal.integrated.commandsToSkipShell` setting to prevent specific key bindings from being handled by the terminal.

### Why is nvm complaining about a prefix option when the integrated terminal is launched?

nvm (Node Version Manager) users often see this error for the first time inside VS Code's integrated terminal:

```bash
nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local"
Run `npm config delete prefix` or `nvm use --delete-prefix v8.9.1 --silent` to unset it
```

This is mostly a macOS problem and does not happen in external terminals. The typical reasons for this are the following:

* `npm` was globally installed using another instance of `node` that is somewhere in your path (such as `/usr/local/bin/npm`).
* To get the development tools on the `$PATH`, VS Code will launch a bash login shell on startup. This means that your `~/.bash_profile` has already run and when an integrated terminal launches, it will run **another** login shell, reordering the `$PATH` potentially in unexpected ways.

To resolve this issue, you need to track down where the old `npm` is installed and remove both it and its out-of-date node_modules. Find the `nvm` initialization script and run `which npm` before it runs, which should print the path when you launch a new terminal.

Once you have the path to npm, find the old node_modules by resolving the symlink by running a command something like this:

```bash
ls -la /usr/local/bin | grep "np[mx]"
```

This will give you the resolved path at the end:

```bash
... npm -> ../lib/node_modules/npm/bin/npm-cli.js
... npx -> ../lib/node_modules/npm/bin/npx-cli.js
```

From there, removing the files and relaunching VS Code should fix the issue:

```bash
rm /usr/local/bin/npm /usr/local/lib/node_modules/npm/bin/npm-cli.js
rm /usr/local/bin/npx /usr/local/lib/node_modules/npm/bin/npx-cli.js
```

### Can I use Powerline fonts in the integrated terminal?

Yes. Specify [Powerline](https://powerline.readthedocs.io) fonts with the `terminal.integrated.fontFamily` [setting](/docs/getstarted/settings.md).

```json
{
  "terminal.integrated.fontFamily": "Meslo LG M DZ for Powerline"
}
```

Note that you want to specify the font family, not an individual font like **Meslo LG M DZ Regular for Powerline** where **Regular** is the specific font name.

### Why does macOS make a ding sound when I resize terminal split panes?

The keybindings ⌃⌘← and ⌃⌘→ are the defaults for resizing individual split panes in the terminal. While they work, they also cause a system "invalid key" sound to play due to an issue in Chromium. The [recommended workaround](https://github.com/microsoft/vscode/issues/44070#issuecomment-799716362) is to tell macOS to no-op for these keybindings by running this in your terminal:

```bash
mkdir -p ~/Library/KeyBindings
cat > ~/Library/KeyBindings/DefaultKeyBinding.dict <<EOF
{
  "^@\UF701" = "noop";
  "^@\UF702" = "noop";
  "^@\UF703" = "noop";
}
EOF
```

### I'm having problems with the terminal rendering. What can I do?

By default, the integrated terminal will render using GPU acceleration on most machines. It does this using multiple `<canvas>` elements, which are better tuned than the DOM for rendering interactive text that changes often. The terminal features 3 renderers that fallback if they are detected to perform poorly in this order:

1. WebGL - This is the fastest renderer that truly unlocks the GPU's power to render the terminal quickly.
2. Canvas - This will be used if the WebGL context fails to load (for example, hardware/environment incapabilities). Its performance may vary depending on your environment, but in general, it's much faster than the DOM renderer.
3. DOM - This is the slowest by quite a bit but arguably the most reliable since it just uses the DOM. If the canvas renderer is detected to run slowly, the DOM renderer will be activated.

Unfortunately, some issues cannot be automatically detected. If you experience issues with the GPU acceleration, you can disable `terminal.integrated.gpuAcceleration` in your user or workspace [settings](/docs/getstarted/settings.md), which will use the DOM renderer. This can be driven by the following setting:

```json
{
    "terminal.integrated.gpuAcceleration": "off"
}
```

### I see `1~` or `[201~` when I paste something

This normally means that the program/shell running inside the terminal requested to turn on "bracketed paste mode" but something doesn't support it properly. To workaround this you could run `printf "\e[?2004l"` to disable it for that session of add the following to your `~/.inputrc` file:

```
bind 'set enable-bracketed-paste off'
```

### Ctrl+A, Ctrl+R output ^A, ^R on zsh

This can happen if zsh is in Vim mode instead of Emacs mode, due to setting `$EDITOR` or `$VISUAL` to `vi`/`vim` in your init scripts.

To workaround this you have two options:

* Ensure that you don't set `$EDITOR` to `vi(m)`. However, this isn't an option if you want your Git editor to work.
* Add `bindkey -e` to your init script to set Emacs explicitly.

### Why are the colors in the terminal not correct?

One of our accessibility features we enable by default is to ensure a minimum contrast ratio of at least 4.5 is met for the foreground text. This feature ensures that text is readable regardless of the shell and theme used which is not possible otherwise. To disable this feature you can set:

```json
"terminal.integrated.minimumContrastRatio": 1
```
