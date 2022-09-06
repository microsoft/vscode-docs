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

## Process reconnection

terminal.integrated.enablePersistentSessions
terminal.integrated.persistentSessionReviveProcess
terminal.integrated.persistentSessionScrollback

## Keybinding and the shell

TODO: Explain the conflicts that can occur when hosting a terminal inside another application
➡️ Why is VS Code shortcut X not working when the terminal has focus?

terminal.integrated.sendKeybindingsToShell
terminal.integrated.commandsToSkipShell

### Chords

Chord keybindings are those that are made up of two keybindings, for example Ctrl+K followed by Ctrl+C to change the line to a comment. TODO: ...
⚡ 👐 ⚙️ Chord keybindings in the terminal
terminal.integrated.allowChords

Special case of chords:
➡️ Why is Cmd+k/Ctrl+k not clearing the terminal?
Merge into keybindings section

### Mnemonics

Using mnemonics to access VS Code's menu (eg. alt+f for File menu) is disabled by default as these key events are often important hotkeys in shells. Set `terminal.integrated.allowMnemonics` to enable mnemonics, note that this will disallow any alt key events to go to the shell. This setting does nothing on macOS.

### Custom sequence keybindings

⚡ ⚙️ Send text via a keybinding
workbench.action.terminal.sendSequence
➡️ ⚙️ How do I configure zsh on macOS to jump words with Ctrl+Left/Right arrow?
Include example in keybindings section

## Confirmation dialogs

terminal.integrated.confirmOnExit
terminal.integrated.confirmOnKill
terminal.integrated.showExitAlert

## Auto replies

terminal.integrated.autoReplies

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