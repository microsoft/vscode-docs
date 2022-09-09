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

terminal.integrated.unicodeVersion

## Process environment

TODO: Brief description of what the shell environment is

### Environment inheritance

terminal.integrated.inheritEnv

### Interaction with `$LANG`

terminal.integrated.detectLocale

### Extension environment contributions

terminal.integrated.environmentChangesRelaunch

## Windows and ConPTY

terminal.integrated.windowsEnableConpty

## Remote development

### Reducing remote input latency

terminal.integrated.localEchoLatencyThreshold
terminal.integrated.localEchoEnabled
terminal.integrated.localEchoExcludePrograms
terminal.integrated.localEchoStyle

### Local terminals in remote windows

workbench.action.terminal.newLocal