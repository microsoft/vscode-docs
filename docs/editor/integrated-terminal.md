---
Order: 10
Area: editor
TOCTitle: Integrated Terminal
ContentId: 7B4DC928-2414-4FC7-9C76-E4A13D6675FE
PageTitle: Integrated Terminal in Visual Studio Code
DateApproved: 6/10/2021
MetaDescription: Visual Studio Code has an integrated terminal to enable working in your shell of choice without leaving the editor.
---
# Integrated Terminal

Visual Studio Code includes a fully featured integrated terminal that conveniently starts at the root of your workspace. It provides integration with the editor to support features like [links](#links) and [error detection](/docs/editor/tasks.md).

To open the terminal:

* Use the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut with the backtick character.
* Use the **View** > **Terminal** menu command.
* From the **Command Palette** (`kb(workbench.action.showCommands)`), use the **View: Toggle Integrated Terminal** command.

![Terminal](images/integrated-terminal/integrated-terminal.png)

> **Note:** Open an external terminal with the `kb(workbench.action.terminal.openNativeConsole)` keyboard shortcut if you prefer to work outside VS Code.

## Managing terminals

The terminal tabs view is on the right side of the terminal view. Each terminal has an entry with its name, icon, color, and group decoration (if any).

![Terminal tabs](images/integrated-terminal/tabs.png)

> **Tip:** Change the tabs location using the `integrated.terminal.tabs.location` setting.

Terminal instances can be added by clicking the **+** icon on the top-right of the **TERMINAL** panel, selecting a profile from the terminal dropdown, or by triggering the `kb(workbench.action.terminal.new)` command. This action creates another entry in the tab list associated with that terminal.

Remove terminal instances by hovering a tab and selecting the **Trash Can** button, selecting a tab item and pressing `kbstyle(Delete)`, by using **Terminal: Kill Active the Active Terminal Instance** command, or via the right-click context menu.

Navigate between terminal groups using focus next `kb(workbench.action.terminal.focusNext)` and focus previous `kb(workbench.action.terminal.focusPrevious)`.

Icons may appear to the right of the terminal title on the tab label when a terminal's status changes. Some examples are on bell (macOS) and for tasks, displaying a check mark when there are no errors and an X otherwise. Hover the icon to read status information, which may contain actions.

### Grouping

Split the terminal by:

* On hover, selecting the inline split button.
* Right-clicking the context menu and selecting the **Split** menu option.
* `kbstyle(Alt)` click on a tab, the **+** button, or the single tab on the terminal panel.
* Triggering the `kb(workbench.action.terminal.split)` command.

Navigate between terminals in a group by focusing the previous pane, `kb(workbench.action.terminal.focusPreviousPane)`, and focusing the next pane, `kb(workbench.action.terminal.focusNextPane)`.

Tabs support drag and drop to allow rearranging, dragging an entry in a terminal group into the empty will remove it from the group (for example, unsplit), dragging a tab into the main terminal area allows joining a group.

Unsplit a split terminal by triggering the **Terminal: Unsplit Terminal** command.

### Customizing Tabs

Change the terminal's name, icon, and tab color via the right-click context menu or by triggering the following commands:

Command|Command ID
---|---|
Terminal: Rename | `workbench.action.terminal.rename` |
Terminal: Change Icon | `workbench.action.terminal.changeIcon` |
Terminal: Change Color | `workbench.action.terminal.changeColor` |

>**Tip:** Go back to the old version by setting `terminal.integrated.tabs.enabled:false`

![Multiple Terminals](images/integrated-terminal/terminal-multiple-instances.png)

## Terminal profiles

Terminal profiles are platform-specific shell configurations comprised of an executable path, arguments, and other customizations.

Configure your default integrated terminal by running the **Terminal: Select Default Profile** command, which is also accessible via the terminal dropdown.

![Integrated terminal dropdown](images/integrated-terminal/terminal-dropdown.png)

The terminal's shell defaults to `$SHELL` on Linux and macOS and PowerShell on Windows. VS Code will automatically detect most standard shells that can then be configured as the default.

### Configuring profiles

To create a new profile, run the **Terminal: Select Default Profile** command and activate the configure button on the right side of the shell to base it on. This will add a new entry to your settings that can be tweaked manually in your `settings.json` file.

Profiles can be created using either a `path` or a `source`, as well as a set of optional arguments. A `source` is available only on Windows and can be used to let VS Code detect the install of either `PowerShell` or `Git Bash`. Alternatively a `path` pointing directly to the shell executable can be used. Here are some example profile configurations:

```json
"terminal.integrated.profiles.windows": {
  "PowerShell -NoProfile": {
    "source": "PowerShell",
    "args": ["-NoProfile"]
  }
},
"terminal.integrated.profiles.linux": {
  "zsh (login)": {
    "path": "zsh",
    "args": ["-l"]
  }
}
```

Other arguments supported in profiles include:

* `overrideName`: A boolean indicating whether or not to replace the dynamic terminal title that detects what program is running with the static profile name.
* `env`: A map defining environment variables and their values, set the variable to `null` to delete it from the environment. This can be configured for all profiles using the `terminal.integrated.env.<platform>` setting.
* `icon`: An icon ID to use for the profile.
* `color`: A theme color ID to style the icon.

>**Tip:** Path, args, and env all support [resolving variables](https://code.visualstudio.com/docs/editor/variables-reference)

The **default profile** can be defined manually with the `terminal.integrated.defaultProfile.*` settings. This should be set to the name of an existing profile:

```json
"terminal.integrated.profiles.windows": {
  "my-pwsh": {
    "source": "PowerShell",
    "args": ["-NoProfile"]
  }
},
"terminal.integrated.defaultProfile.windows": "my-pwsh"
```

>**Tip:** The integrated terminal shell is running with the permissions of VS Code. If you need to run a shell command with elevated (administrator) or different permissions, use platform utilities such as `runas.exe` within a terminal.

The *default profile* can be defined manually with the `terminal.integrated.defaultProfile.*` settings. This should be set to the *name* of an existing profile:

```json
"terminal.integrated.profiles.windows": {
  "PowerShell -NoProfile": {
    "source": "PowerShell",
    "args": ["-NoProfile"]
  }
},
"terminal.integrated.defaultProfile.windows": "PowerShell -NoProfile"
```

### Removing built-in profiles

To remove entries from the terminal dropdown, set the name of the profile to `null`. For example, to remove the `Git Bash` profile on Windows, use this setting:

```json
"terminal.integrated.profiles.windows": {
  "Git Bash": null
}
```

### Configuring the task/debug profile

By default, the task/debug features will use the default profile. To override that, use the `terminal.integrated.automationShell.<platform>` setting:

```jsonc
{
    "terminal.integrated.defaultProfile.osx": "fish",
    // Use a fully POSIX-compatible shell and avoid running a complex ~/.fishrc
    // for tasks and debug
    "terminal.integrated.automationShell.osx": "/bin/sh"
}
```

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

## Terminal process reconnection

Local and remote terminal processes are restored on window reload, such as when an extension install requires a reload. The terminal will be reconnected and the UI state of the terminals will be restored, including the active tab and split terminal relative dimensions.

## Links

The terminal features link detection, showing an underline when files or URLs are hovered with the mouse that will go to the target when `kbstyle(Ctrl)`/`kbstyle(Cmd)` is held. If a file or URL cannot be detected, they are still surfaced as "low confidence" links, which only show an underline when is held. These low confidence links will search the workspace for the term, opening the match if one is found.

Clicking a file link will either open that document in an editor or produce a Quick Pick with all matches.

Extensions make use of links in the terminal, such as GitLens, to identify branches.

![A branch link is hovered in the terminal](images/integrated-terminal/gitlens-link.png)

## Local echo

On some remote connections, there's a delay between typing and seeing the characters on the terminal, as a result of the round trip the data has to make from VS code to the process. Local echo attempts to predict modifications and cursor movements made locally in the terminal in order to decrease this lag.

When enabled, dimmed characters appear as you type. The dimmed style can be changed using the setting `terminal.integrated.localEchoStyle`.

To disable the feature, set `terminal.integrated.localEchoLatencyThreshold` to `-1`. To enable it all of the time, set it to `0`.

## Terminal appearance

Customize the terminal's appearance using the following [settings](https://code.visualstudio.com/docs/getstarted/settings):

* Font: family, size, and weight
* Spacing: line height and letter spacing
* Cursor: style, width, and blinking

## Copy & Paste

The keybindings for copy and paste follow platform standards:

* Linux: `kbstyle(Ctrl+Shift+C)` and `kbstyle(Ctrl+Shift+V)`, selection paste is available with `kbstyle(Shift+Insert)`
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

`kbstyle(Alt)` left click will reposition the cursor to underneath the mouse. This works by simulating arrow key strokes, which may fail for some shells or programs. This feature can be disabled.

## Keybindings and the shell

While focus is in the integrated terminal, many key bindings will not work as the keystrokes are passed to and consumed by the terminal itself. There is a hardcoded list of commands, which skip being processed by the shell and instead get sent to the VS Code keybinding system. Customize this list with the `terminal.integrated.commandsToSkipShell` setting. Commands can be added to this list by adding the command name to the list, and removed by adding the command name to the list prefixed with a `-`.

```js
{
  "terminal.integrated.commandsToSkipShell": [
    // Ensure the toggle sidebar visibility keybinding skips the shell
    "workbench.action.toggleSidebarVisibility",
    // Send quick open's keybinding to the shell
    "-workbench.action.quickOpen",
  ]
}
```

Look at the setting details to see the complete list of default commands.
>**Tip:** To override `terminal.integrated.commandsToSkipShell` and send keybindings to the shell instead of the workbench, set `terminal.integrated.sendKeybindingsToShell`.

### Chord keybindings in the terminal

By default, when a chord keybinding is the highest priority keybinding, it will always skip the terminal shell (bypassing `terminal.integrated.commandsToSkipShell`) and be evaluated by VS Code instead of the terminal. This is typically the desired behavior unless you're on Windows/Linux and want your shell to use ctrl+k (for bash this cuts the line after the cursor). This can be disabled with the following setting:

```json
{
  "terminal.integrated.allowChords": false
}
```

### Send text via a keybinding

The `workbench.action.terminal.sendSequence` command can be used to send a specific sequence of text to the terminal, including escape sequences. This enables things like sending arrow keys, enter, cursor moves, etc. For example, the below sequence jumps over the word to the left of the cursor (`kbstyle(Ctrl+Left)`) and presses backspace:

```json
{
  "key": "ctrl+u",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": "\u001b[1;5D\u007f" }
}
```

This feature supports [variable substitution](/docs/editor/variables-reference.md).

Note that the command only works with the `\u0000` format for using characters via their character code (not `\x00`). Read more about these hex code and the sequences terminals work with on the following resources:

* [XTerm Control Sequences](https://invisible-island.net/xterm/ctlseqs/ctlseqs.html)
* [List of C0 and C1 control codes](https://github.com/xtermjs/xterm.js/blob/0e45909c7e79c83452493d2cd46d99c0a0bb585f/src/common/data/EscapeSequences.ts)

## Find

The integrated terminal has find functionality that can be triggered with `kb(workbench.action.terminal.focusFind)`.

If you want `kbstyle(Ctrl+F)` to go to the shell instead of launching the Find control on Linux and Windows, you will need to remove the keybinding like so:

```js
// Windows/Linux
{ "key": "ctrl+f", "command": "-workbench.action.terminal.focusFind",
                      "when": "terminalFocus" },
// macOS
{ "key": "cmd+f",  "command": "-workbench.action.terminal.focusFind",
                      "when": "terminalFocus" },
```

## Run selected text

To use the `runSelectedText` command, select text in an editor and run the command **Terminal: Run Selected Text in Active Terminal** via the **Command Palette** (`kb(workbench.action.showCommands)`):

![Run selected text](images/integrated-terminal/terminal_run_selected.png)

The terminal will attempt to run the selected text.

![Run selected text result](images/integrated-terminal/terminal_run_selected_result.png)

If no text is selected in the active editor, the line that the cursor is on is run in the terminal.

>**Tip:** Also run the active file using the command `workbench.action.terminal.runActiveFile`.

## Next steps

The basics of the terminal have been covered in this document, read on to find out more about:

* [Tasks](/docs/editor/tasks.md) - Tasks let you integrate with external tools and leverage the terminal heavily.
* [Mastering VS Code's Terminal](https://www.growingwiththeweb.com/2017/03/mastering-vscodes-terminal.html) - An external blog with plenty of power user tips for the terminal.
* Explore the rest of the terminal commands by browsing your keybindings.json file within VS Code.

## Common questions

### I'm having problems launching the terminal

There's a [dedicated troubleshooting guide](/docs/supporting/troubleshoot-terminal-launch.md) for these sorts of problems.

### Can I use the integrated terminal with the Windows Subsystem for Linux?

Yes. Select the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/install-win10) (WSL) bash shell as your terminal default. If you have WSL enabled (through Windows Features), select **WSL Bash** from the terminal **Select Default Shell** dropdown. See [Developing in WSL](/docs/remote/wsl.md) for details on working in WSL and the [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension.

### Why is VS Code shortcut X not working when the terminal has focus?

Currently the terminal consumes many key bindings, preventing Visual Studio Code from reacting to them. An example of this is `kbstyle(Ctrl+B)` to open the Side Bar on Linux and Windows. This is necessary as various terminal programs and/or shells may respond to these key bindings themselves. Use the `terminal.integrated.commandsToSkipShell` setting to prevent specific key bindings from being handled by the terminal.

### Can I use Cmder's shell with the terminal on Windows?

Yes, to use the [Cmder](https://cmder.net/) shell in VS Code, you need to add the following settings to your `settings.json` file:

```json
"terminal.integrated.profiles.windows": {
  "cmder": {
    "path": "C:\\WINDOWS\\System32\\cmd.exe",
    "args": ["/K", "C:\\cmder\\vendor\\bin\\vscode_init.cmd"]
  }
},
"terminal.integrated.defaultProfile.windows": "cmder"
```

You may refer to [Cmder's wiki](https://github.com/cmderdev/cmder/wiki/Seamless-VS-Code-Integration) for more information.

### Why is Cmd+k/Ctrl+k not clearing the terminal?

Normally `kbstyle(Cmd+k)`/`kbstyle(Ctrl+k)` clears the terminal on macOS/Windows, but this can stop working when chord keybindings are added either by the user or extensions. The `kbstyle(Cmd+k)`/`kbstyle(Ctrl+k)` keybindings rely on the VS Code keybinding priority system that defines which keybinding is active at any given time (user > extension > default). In order to fix this, you need to redefine your user keybinding that will have priority, preferably at the bottom of your user `keybindings.json` file:

macOS:

```json
{ "key": "cmd+k",                 "command": "workbench.action.terminal.clear",
                                     "when": "terminalFocus" },
```

Windows:

```json
{ "key": "ctrl+k",                "command": "workbench.action.terminal.clear",
                                     "when": "terminalFocus" },
```

### Why is nvm complaining about a prefix option when the integrated terminal is launched?

nvm (Node Version Manager) users often see this error for the first time inside VS Code's integrated terminal:

```bash
nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local"
Run `npm config delete prefix` or `nvm use --delete-prefix v8.9.1 --silent` to unset it
```

This is mostly a macOS problem and does not happen in external terminals. The typical reasons for this are the following:

* `npm` was globally installed using another instance of `node` that is somewhere in your path (such as `/usr/local/bin/npm`).
* In order to get the development tools on the `$PATH`, VS Code will launch a bash login shell on start up. This means that your `~/.bash_profile` has already run and when an integrated terminal launches, it will run **another** login shell, reordering the `$PATH` potentially in unexpected ways.

To resolve this issue, you need to track down where the old `npm` is installed and remove both it and its out of date node_modules. Find the `nvm` initialization script and running `which npm` before it runs, which should print the path when you launch a new terminal.

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
"terminal.integrated.fontFamily": "Meslo LG M DZ for Powerline"
```

Note that you want to specify the font family, not an individual font like **Meslo LG M DZ Regular for Powerline** where **Regular** is the specific font name.

### How do I configure zsh on macOS to jump words with Ctrl+Left/Right arrow?

By default, `kbstyle(Ctrl+Left/Right)` arrow will jump words in bash. Configure the same for zsh by adding these keybindings:

```json
[
  {
    "key": "ctrl+left",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "\u001bb" }
  },
  {
    "key": "ctrl+right",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "\u001bf" }
  }
]
```

### Why does macOS make a ding sound when I resize terminal split panes?

The keybindings ⌃⌘← and ⌃⌘→ are the defaults for resizing individual split panes in the terminal, while they work they also cause a system "invalid key" sound to play due to an issue in Chromium. The [recommended workaround](https://github.com/microsoft/vscode/issues/44070#issuecomment-799716362) is to tell macOS to no-op for these keybindings by running this in your terminal:

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

### Why is my terminal showing a multi-colored triangle or a completely black rectangle?

The terminal can have problems rendering in some environments, for example you might see a big multi-colored triangle instead of text. This is typically caused by driver/VM graphics issues and the same also happens in Chromium. Work around these issues by launching `code` with the `--disable-gpu` flag or by using the setting `"terminal.integrated.gpuAcceleration": "off"` to avoid using the canvas in the terminal.

### Why are there duplicate paths in the terminal's `$PATH` environment variable and/or why are they reversed?

This can happen on macOS because of how the terminal launches using VS Code's environment. When VS Code launches for the first time, in order to source your "development environment", it launches your configured shell as a **login shell**, which runs your `~/.profile`/`~/.bash_profile`/`~/.zprofile` scripts. Now when the terminal launches, it also runs as a login shell, which will put the standard paths to the front (for example, `/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`) and reinitialize your shell environment.

To get a better understanding, you can simulate what is happening by launching an inner login shell within your operating system's built-in terminal:

```sh
# Add /test to the beginning of $PATH
export PATH=/test:$PATH
# Echo $PATH, /test should be at the beginning
echo $PATH
# Run bash as a login shell
bash -l
# Echo $PATH, the values should be jumbled
echo $PATH
```

Unfortunately, unlike in Linux, standalone macOS terminals all run as login shells by default, since macOS does not run a login shell when the user logs into the system. This encourages "bad behavior", like initializing aliases in your profile script when they should live in your `rc` script as that runs on non-login shells.

There are two direct fixes for this. The first is to set `"terminal.integrated.inheritEnv": false`, which will strip most environment variables from the terminal's environment, except for some important ones (like `HOME`, `SHELL`, `TMPDIR`, etc.).

The other fix is to no longer run a login shell in the terminal by creating a terminal profile and set its `args` to `[]`. If you go with this fix, you will want to make sure any aliases in your profile scripts are moved over to your `~/.bashrc`/`~/.zshrc` file since aliases only apply to the shell they're set in.

### I'm having problems with the terminal rendering, what can I do?

By default, the integrated terminal will render using GPU acceleration on most machines. It does this using multiple `<canvas>` elements, which are better tuned than the DOM for rendering interactive text that change often. The terminal actually features 3 renderers which fallback if they are detected to perform poorly in this order:

1. WebGL - This is the fastest renderer that truly unlocks the GPU's power to render the terminal quickly.
2. Canvas - This will be used if the WebGL context fails to load (for example, hardware/environment incapabilities), its performance may vary depending on your environment but in general it's much faster than the DOM renderer.
3. DOM - This is the slowest by quite a bit but arguably the most reliable since it just uses the DOM. If the canvas renderer is detected to run slowly the DOM renderer will be activated.

Unfortunately some issues cannot be automatically detected, if you experience issues with the GPU acceleration you can disable it `terminal.integrated.gpuAcceleration` in your user or workspace [settings](/docs/getstarted/settings.md), which will use the DOM renderer. This can be driven by the follow setting:

```js
{
    "terminal.integrated.gpuAcceleration": "off"
}
```
