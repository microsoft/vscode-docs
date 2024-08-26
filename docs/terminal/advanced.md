---
Order: 6
Area: terminal
TOCTitle: Advanced
ContentId: D458AFDC-C001-43FD-A4BB-9474767B2C04
PageTitle: Advanced Terminal Usage in Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Visual Studio Code's integrated terminal has several advanced features.
---
# Terminal Advanced

Visual Studio Code's integrated terminal has many advanced features and settings, such as Unicode and emoji support, custom keybindings, and automatic replies. This topic explains these advanced features in detail. If you are new to VS Code or the integrated terminal, you may want to review the [Terminal Basics](/docs/terminal/basics.md) topic first.

## Persistent sessions

The terminal supports two different types of persistent sessions:

* Process reconnection: When reloading a window (for example, after installing an extension), **reconnect** to the previous process and restore its content.
* Process revive: When restarting VS Code, a terminal's content is restored and the process is **relaunched** using its original environment.

Both of these persistent sessions can be disabled by setting `terminal.integrated.enablePersistentSessions` to `false`, and the amount of scrollback restored is controlled by the`terminal.integrated.persistentSessionScrollback` setting. Process revive can be configured independently with `terminal.integrated.persistentSessionReviveProcess`.

### Moving terminals between windows

Terminal tabs can be dragged and dropped between VS Code windows. This can also be done manually through the Command Palette and the **Terminal: Detach Session** and **Terminal: Attach to Session** commands.

### Configure how the terminal behaves on start up

When opening a window, if the terminal view is visible it will either reconnect to the terminal using persistent sessions, or create a new shell. This behavior can be fine tuned with the `terminal.integrated.hideOnStartup` setting.

* `never` (default): Never hide the terminal view on startup.
* `whenEmpty`: Only hide the terminal when there are no persistent sessions restored.
* `always`: Always hide the terminal, even when there are persistent sessions restored.

## Keybinding and the shell

As an embedded application, the integrated terminal should intercept some, but not all, keybindings dispatched within VS Code.

The configurable `terminal.integrated.commandsToSkipShell` setting determines which command's keybindings should always "skip the shell" and instead be handled by VS Code's keybinding system. By default, it contains a hard-coded list of commands that are integral to the VS Code experience but you can add or remove specific commands:

```jsonc
{
  "terminal.integrated.commandsToSkipShell": [
    // Ensure the toggle sidebar visibility keybinding skips the shell
    "workbench.action.toggleSidebarVisibility",
    // Send quick open's keybinding to the shell
    "-workbench.action.quickOpen",
  ]
}
```

Look at the `terminal.integrated.commandsToSkipShell` setting details to see the complete list of default commands.

>**Tip:** `terminal.integrated.sendKeybindingsToShell` can be configured to override `terminal.integrated.commandsToSkipShell` and dispatch most keybindings to the shell. Note that this will disable keybindings like `kbstyle(Ctrl+F)` to open [find](/docs/terminal/basics#find) though.

### Chords

Chord keybindings are made up of two keybindings, for example `kbstyle(Ctrl+K)` followed by `kbstyle(Ctrl+C)` to change the line to a comment. Chords always skip the shell by default but can be disabled with `terminal.integrated.allowChords`.

### macOS clear screen

On macOS, `kbstyle(Cmd+K)` is a common keybindings in terminals to clear the screen so VS Code also respects that, which means `kbstyle(Cmd+K)` chords will not work. `kbstyle(Cmd+K)` chords can be enabled by [removing the clear keybinding](/docs/getstarted/keybindings.md#removing-a-specific-key-binding-rule):

```json
{
    "key": "cmd+k",
    "command": "-workbench.action.terminal.clear"
}
```

Additionally, this keyboard shortcut will be overridden automatically if any extensions contribute `kbstyle(Cmd+K)` keybindings due to how keybinding priority works. To re-enable the `kbstyle(Cmd+K)` clear keybinding in this case, you can redefine it in user keybindings, which have a higher priority than extension keybindings:

```json
{
    "key": "cmd+k",
    "command": "workbench.action.terminal.clear",
    "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
}
```

### Mnemonics

Using mnemonics to access VS Code's menu (for example, `kbstyle(Alt+F)` for File menu) is disabled by default in the terminal as these key events are often important hotkeys in shells. Set `terminal.integrated.allowMnemonics` to enable mnemonics, but note that this will disallow any `kbstyle(Alt)` key events to go to the shell. This setting does nothing on macOS.

### Custom sequence keybindings

The `workbench.action.terminal.sendSequence` command can be used to send a specific sequence of text to the terminal, including escape sequences that are interpreted specially by the shell. The command enables you to send Arrow keys, `kbstyle(Enter)`, cursor moves, etc.

For example, the sequence below jumps over the word to the left of the cursor (`kbstyle(Ctrl+Left)`) and then presses `kbstyle(Backspace)`:

```jsonc
{
  "key": "ctrl+u",
  "command": "workbench.action.terminal.sendSequence",
  "args": {
    "text": "\u001b[1;5D\u007f"
  }
}
```

This feature supports [variable substitution](/docs/editor/variables-reference.md).

The `sendSequence` command only works with the `\u0000` format for using characters via their character code (not `\x00`). Read more about these hex codes and terminal sequences in the following resources:

* [XTerm Control Sequences](https://invisible-island.net/xterm/ctlseqs/ctlseqs.html)
* [List of C0 and C1 control codes](https://github.com/xtermjs/xterm.js/blob/0e45909c7e79c83452493d2cd46d99c0a0bb585f/src/common/data/EscapeSequences.ts)

## Confirmation dialogs

In order to avoid unnecessary output and user prompts, the terminal does not show warning dialogs when processes exit. If warnings are desirable, they can be configured with the following settings:

* `terminal.integrated.confirmOnExit` - Controls whether to confirm when the window closes if there are active debug sessions.
* `terminal.integrated.confirmOnKill` - Controls whether to confirm killing terminals when they have child processes.
* `terminal.integrated.showExitAlert` - Controls whether to show the alert "The terminal process terminated with exit code" when exit code is non-zero.

## Auto replies

The terminal can automatically provide a configurable input response to the shell if an exact sequence of output is received. The most common use case is to automatically reply to a prompt when hitting `kbstyle(Ctrl+C)` in batch scripts that ask whether the user wants to terminate the batch job. To automatically dismiss this message, add this setting:

```json
{
  "terminal.integrated.autoReplies": {
    "Terminate batch job (Y/N)": "Y\r"
  }
}
```

Notice that the `\r` character used here means `kbstyle(Enter)`, and much like [custom sequence keybindings](#custom-sequence-keybindings), this feature supports sending escape sequences to the shell.

No auto replies are configured by default as providing shell input should be an explicit action or configuration by the user.

## Change tab stop width

The `terminal.integrated.tabStopWidth` setting allows configuring the tab stop width when a program running in the terminal outputs `\t`. This should typically not be needed as programs will often move the cursor instead of using the `kbstyle(Tab)` character, but may be useful in some situations.

## Unicode and emoji support

The terminal has both Unicode and emoji support. When these characters are used in the terminal, there are some caveats to that support:

* Some Unicode symbols have ambiguous width that may change between Unicode versions. Currently we support Unicode version 6 and 11 widths, which can be configured with the `terminal.integrated.unicodeVersion` setting. The version specified should match the Unicode version used by the shell/operating system, otherwise there could be rendering issues. Note that the Unicode version of the shell/OS may not match the font's actual width.
* Some emojis comprised of multiple characters may not render correctly, for example, skin tone modifiers.
* Emoji support is limited on Windows.

## Image support

Images in the terminal work provided they use either the Sixel or iTerm inline image protocols. This feature is disabled by default and can be enabled with the `terminal.integrated.enableImages` setting.

Current limitations:

* Serialization does not work, so reloading a terminal will not retain any images ([jerch/xterm-addon-image#47](https://github.com/jerch/xterm-addon-image/issues/47)).
* Copying the selection as HTML does not include the selected image ([jerch/xterm-addon-image#50](https://github.com/jerch/xterm-addon-image/issues/50)).
* Animated gifs don't work ([jerch/xterm-addon-image#51](https://github.com/jerch/xterm-addon-image/issues/51)).
* Images that are shorter than a cell will not work properly, this is a [design flaw with the sequences and also occurs in XTerm](https://github.com/microsoft/vscode/issues/183840#issuecomment-1569345048).

## Process environment

The process environment of the application running within the terminal is influenced by various settings and extensions and can cause the output in the VS Code terminal to look different than in other terminals.

### Environment inheritance

When VS Code is opened, it launches a login shell environment in order to source a shell environment. This is done because developer tools are often added to the `$PATH` in a shell launch script like `~/.bash_profile`. By default, the terminal inherits this environment, depending on your [profile shell arguments](/docs/terminal/profiles.md#configuring-profiles), and means that multiple profile scripts may have run, which could cause unexpected behavior.

This environment inheritance can be disabled on macOS and Linux via the `terminal.integrated.inheritEnv` setting.

### Interaction with `$LANG`

There is some special interaction with the `$LANG` environment variable, which determines how characters are presented in the terminal. This feature is configured with the `terminal.integrated.detectLocale` setting:

| Value            | Behavior
|------------------|---
| `on`             | Always set `$LANG` to the most commonly desired value. The chosen value is based on the operating system locale (falling back to `en-US`) with UTF-8 encoding.
| `auto` (default) | Set `$LANG` similar to the `on` behavior if `$LANG` is not properly configured (is not set to a UTF or EUC encoding).
| `off`            | Do not modify `$LANG`.

### Extension environment contributions

Extensions are able to [contribute to terminal environments](https://code.visualstudio.com/api/references/vscode-api#ExtensionContext.environmentVariableCollection), allowing them to provide some integration with the terminal. For example, the built-in Git extension injects the `GIT_ASKPASS` environment variable to allow VS Code to handle authentication to a Git remote.

If an extension changes the terminal environment, any existing terminals will be relaunched if it is safe to do so, otherwise a warning will show in the terminal status. More information about the change can be viewed in the hover, which also includes a relaunch button.

![A warning icon appears next to the terminal tab when a relaunch is required, information on the changes can be viewed by hovering it](images/advanced/envvarcollection-warning.png)

## Windows and ConPTY

VS Code's terminal is built on the [xterm.js](https://github.com/xtermjs/xterm.js) project to implement a Unix-style terminal that serializes all data into a string and pipes it through a "pseudoterminal". Historically, this was not how the terminal worked on Windows, which used the [Console API](https://learn.microsoft.com/windows/console/console-functions) to implement its console called 'conhost'.

An open source project called [winpty](https://github.com/rprichard/winpty) was created to try to fix this issue by providing an emulation/translation layer between a Unix-style terminal and a Windows console. VS Code's terminal was originally implemented using only winpty. This was great at the time, but in 2018, Windows 10 received [the ConPTY API](https://devblogs.microsoft.com/commandline/windows-command-line-introducing-the-windows-pseudo-console-conpty/), which took the idea pioneered by winpty and baked it into Windows, providing a more reliable and supported system to leverage Unix-style terminals and apps on Windows.

VS Code defaults to ConPTY on Windows 10+ (from build number 18309) and falls back to winpty as a legacy option for older versions of Windows. ConPTY can be explicitly disabled via the `terminal.integrated.windowsEnableConpty` settings but this should normally be avoided.

Since ConPTY is an emulation layer, it does come with some quirks. The most common is that ConPTY considers itself the owner of the viewport and because of that will sometimes reprint the screen. This reprinting can cause unexpected behavior such as old content displaying after running the **Terminal: Clear** command.

## Remote development

This section outlines topics specific to when VS Code is connected to a remote machine using a VS Code [Remote Development](https://code.visualstudio.com/docs/remote/remote-overview) extension.

### Reducing remote input latency

Local echo is a feature that helps mitigate the effect of input latency on remote windows. It writes the keystrokes in the terminal in a dimmed color before the result is confirmed by the remote. By default, the feature start running when latency is detected to be above 30 ms and the timing can be configured with `terminal.integrated.localEchoLatencyThreshold`. The color of the unconfirmed characters is defined by `terminal.integrated.localEchoStyle`.

Local echo disables itself dynamically depending on the active program in the terminal. This is controlled by `terminal.integrated.localEchoExcludePrograms`, which defaults to `['vim', 'vi', 'nano', 'tmux']`. It's recommended that you disable the feature for any application or shell that is highly dynamic and/or does a lot of reprinting of the screen when typing.

To disable the feature completely, use:

```json
{
  "terminal.integrated.localEchoEnabled": false
}
```

### Local terminals in remote windows

The default **local** terminal profile can be launched in remote windows with the **Terminal: Create New Integrated Terminal (Local)** command via the Command Palette. Currently non-default profiles cannot be launched from remote windows.
