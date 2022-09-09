---
Order: 4
Area: terminal
TOCTitle: Advanced
ContentId: D458AFDC-C001-43FD-A4BB-9474767B2C04
PageTitle: Advanced Terminal Usage in Visual Studio Code
DateApproved: 9/1/2022
MetaDescription: Visual Studio Code's integrated terminal has several advanced features.
---
# Terminal Advanced

## Persistent sessions

The terminal supports two different types of persistent sessions:

- Process reconnection: When reloading a window (eg. after installing an extension), _reconnect_ to the previous process and restore its content.
- Process revive: When restarting VS Code, a terminal's content is restored and the process is _relaunched_ using its original environment.

Both of these can be disabled by setting `terminal.integrated.enablePersistentSessions` to `false`, and the amount of scrollback restored is determined by `terminal.integrated.persistentSessionScrollback`. Process revive can be configured independently with `terminal.integrated.persistentSessionReviveProcess`.

### Moving terminals between windows

It's possible to drag terminal tabs across different windows to move them under that window. This can also be done manually through the command palette and the `Terminal: Detach Session` and `Terminal: Attach to Session` commands.

## Keybinding and the shell

An issue when embedding a terminal within another application is the question of where to send each keybinding; to the shell hosted in the terminal or to the application? VS Code answers this by having some sane defaults that use a hardcoded list of commands that should always "skip the shell" and be handled by VS Codes keybinding system. This list is fully configurable to fine tune what commands should and shouldn't work:

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

Look at the setting details to see the complete list of default commands.

>**Tip:** `terminal.integrated.sendKeybindingsToShell` can be configured to override `terminal.integrated.commandsToSkipShell` and dispatch most keybindings to the shell.

### Chords

Chord keybindings are those that are made up of two keybindings, for example Ctrl+K followed by Ctrl+C to change the line to a comment. Chords always skip the shell by default  but can be disabled with `terminal.integrated.allowChords`.

On macOS `kbstyle(Cmd+K)` is a common keybindings in terminals to clear the screen so VS Code also respects that, which means `kbstyle(Cmd+K)` chords will not work. `kbstyle(Cmd+K)` chords can be enabled by [removing the clear keybinding](https://code.visualstudio.com/docs/getstarted/keybindings#_removing-a-specific-key-binding-rule):

```json
{
    "key": "cmd+k",
    "command": "-workbench.action.terminal.clear"
}
```

Additionally, this will be overridden automatically if any extensions contribute `kbstyle(Cmd+K)` keybindings due to how keybinding priority works. The `kbstyle(Cmd+K)` to clear keybinding can be brought back in this case by re-defining it in user keybindings which have a higher priority than extension keybindings:

```json
{
    "key": "cmd+k",
    "command": "workbench.action.terminal.clear",
    "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
}
```

### Mnemonics

Using mnemonics to access VS Code's menu (eg. alt+f for File menu) is disabled by default as these key events are often important hotkeys in shells. Set `terminal.integrated.allowMnemonics` to enable mnemonics, note that this will disallow any alt key events to go to the shell. This setting does nothing on macOS.

### Custom sequence keybindings

The `workbench.action.terminal.sendSequence` command can be used to send a specific sequence of text to the terminal, this includes escape sequences that are interpreted specially by the shell. This enables things like sending arrow keys, enter, cursor moves, etc. For example, the below sequence jumps over the word to the left of the cursor (`kbstyle(Ctrl+Left)`) and presses backspace:

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

Note that the command only works with the `\u0000` format for using characters via their character code (not `\x00`). Read more about these hex codes and the sequences terminals work with on the following resources:

* [XTerm Control Sequences](https://invisible-island.net/xterm/ctlseqs/ctlseqs.html)
* [List of C0 and C1 control codes](https://github.com/xtermjs/xterm.js/blob/0e45909c7e79c83452493d2cd46d99c0a0bb585f/src/common/data/EscapeSequences.ts)

## Confirmation dialogs

terminal.integrated.confirmOnExit
terminal.integrated.confirmOnKill
terminal.integrated.showExitAlert

## Auto replies

The terminal is capable of providing an input response to the shell automatically if an exact sequence of output is received. This could be used for all sorts of things but the most common use case is to automatically reply to the quirk when hitting `kbstyle(Ctrl+C)` in batch scripts that asks whether the user wants to terminate the batch job. To automatically dismiss this message, add this setting:

```json
{
  "terminal.integrated.autoReplies": {
    "Terminate batch job (Y/N)": "Y\r"
  }
}
```

Notice the `\r` here which means `kbstyle(Enter)`, much like [custom sequence keybindings](#_custom-sequence-keybindings) this supports sending escape sequences to the shell.

No auto replies are configured by default as this deals with shell input which is sensitive.

## Unicode and emoji support

The terminal has both unicode and emoji support, since these are being used in a terminal environment there are some caveats to that support:

- Some unicode symbols have ambiguous width that may have changed between unicode versions. Currently we support unicode version 6 and 11 widths which can be configured with the `terminal.integrated.unicodeVersion` setting, this version should match the unicode version used by the shell/operating system, otherwise there could be rendering issues. Note that the unicode version of the shell/OS may not match the font's actual width.
- Some emoji that are made up of multiple combined characters may not render correctly, for example skin tone modifiers.
- Emoji support on Windows is limited on Windows.

## Process environment

The shell's process environment
TODO: Brief description of what the shell environment is

### Environment inheritance

terminal.integrated.inheritEnv

### Interaction with `$LANG`

There is some special interaction with the `$LANG` environment variable which determines how characters are presented in the terminal. This feature is configured with the `terminal.integrated.detectLocale` setting:

| Value            | Behavior
|------------------|---
| `on`             | Always set `$LANG` to the most commonly desired value. The chosen value is based on the operating system locale (falling back to `en-US`) with UTF-8 encoding.
| `auto` (default) | Set `$LANG` like when `on` is set, only when it looks like `$LANG` is not properly configured (is not set to a utf or euc encoding).
| `off`            | Do not modify `$LANG`.

### Extension environment contributions

Extensions are able to [contribute to terminal environments](https://code.visualstudio.com/api/references/vscode-api#ExtensionContext.environmentVariableCollection), allowing them to provide some integration with the terminal. The built-in git extension is an example of this which injects the `GIT_ASKPASS` environment variable to allow VS Code to handle authentication to the git remote.

If an extension changes the terminal environment, any existing terminals will be relaunched if it is safe to do so, otherwise a warning will show in the terminal status. More information about the change can be viewed in the hover which also includes a relaunch button.

![A warning icon appears next to the terminal tab when a relaunch is required, information on the changes can be viewed by hovering it](images/advanced/envvarcollection-warning.png)

## Windows and ConPTY

VS Code's terminal is built on the [xterm.js](https://github.com/xtermjs/xterm.js) project to implement a Unix-style terminal which serializes all data into a string and pipes it through a "pseudoterminal". Historically, this was not how things on Windows worked which used the [Console API](https://docs.microsoft.com/en-us/windows/console/console-functions) to implement its console called conhost.

An open source project called [winpty](https://github.com/rprichard/winpty) was created to try to fix this issue by providing an emulation/translation layer between a Unix-style terminal and a Windows console. VS Code's terminal was originally implemented using only winpty which was great for its time but in 2018, Windows 10 received [the ConPTY API](https://devblogs.microsoft.com/commandline/windows-command-line-introducing-the-windows-pseudo-console-conpty/) which took the idea pioneered by winpty and baked it into Windows, providing a more reliable and supported system to leverage Unix-style terminals and apps on Windows.

VS Code defaults to ConPTY on Windows 10+ (from build number 18309) and falls back to winpty as a legacy option for older versions of Windows. ConPTY can be explicitly disabled via the `terminal.integrated.windowsEnableConpty` settings but this should normally be avoided.

Since Conpty is an emulation layer it does come with some quirks, the most common of which is that ConPTY considers itself the owner of the viewport and because of that will reprint the screen sometimes. This reprinting can cause some unexpected behavior such as old content showing back up after running the `Terminal: Clear` command.

## Remote development

### Reducing remote input latency

terminal.integrated.localEchoLatencyThreshold
terminal.integrated.localEchoEnabled
terminal.integrated.localEchoExcludePrograms
terminal.integrated.localEchoStyle

### Local terminals in remote windows

workbench.action.terminal.newLocal