---
Order: 12
Area: editor
TOCTitle: Terminal Shell Integration
ContentId: a6a1652b-c0d8-4054-a2da-feb915eef2cc
PageTitle: Terminal Shell Integration in Visual Studio Code
DateApproved: 6/9/2022
MetaDescription: Visual Studio Code's embedded terminal can integrate with some shells to enhance the capabilities of the terminal.
---

# Terminal Shell Integration

Visual Studio Code has the ability to integrate with common shells, allowing the terminal to understand more about what's actually happening inside the shell. This additional information enables some [compelling features](#_features) such as command/directory detection, command decorations and command navigation.

Supported shells:

- Linux/macOS: bash, pwsh, zsh
- Windows: pwsh

## Installation

### Automatic script injection

The standard way to activate shell integration is to set the `terminal.integrated.shellIntegration.enabled` setting to `true`. When enabled, the shell integration script is injected into the shell session via shell arguments and/or environment variables. 

This standard, easy way will not work for some advanced use cases like in sub-shells, through ssh (when not using the [Remote - SSH extension](https://code.visualstudio.com/docs/remote/ssh)) or for some complex shell setups. The recommended way to enable shell integration for those is [manual installation](#_manual-installation).

### Manual installation

To manually install shell integration, the VS Code shell integration script needs to run during your shell's initialization. Where and how to do this depends on the shell and OS you're using.

When using manual install it's recommended to set `terminal.integrated.shellIntegration.enabled` to `false`, though not mandatory.

> ℹ️ The method for calling the script will be simplified in the future (see [vscode#153921](https://github.com/microsoft/vscode/issues/153921))

#### Windows

The script below contains `<InstallDir>` which must be replaced by VS Code's installation directory. This defaults to:

- User install: `$env:HOMEPATH\AppData\Local\Programs\Microsoft VS Code\`
- System install: `C:\Program Files\Microsoft VS Code`

**pwsh**

  Add the following to your [PowerShell profile](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2), replacing `<InstallDir>` with VS Code's installation directory. Run `code $Profile` in pwsh to open the file in VS Code.
  ```pwsh
  if ($env:TERM_PROGRAM -eq "vscode") {
    . "<InstallDir>\resources\app\out\vs\workbench\contrib\terminal\browser\media\shellIntegration.ps1"
  }
  ```

#### Linux and macOS

The script below contains `<InstallDir>` which must be replaced by VS Code's installation directory. This defaults to:

- Linux: Find by running `echo "$(readlink -f "$(which code)")../resources"`
- macOS: `/Applications/Visual\ Studio\ Code.app/Contents/Resources`

**bash**

  Add the following to your `~/.bashrc` file, replacing `<InstallDir>` with VS Code's installation directory. Run `code ~/.bashrc` in bash to open the file in VS Code.
  ```sh
  if [ "$TERM_PROGRAM" == "vscode" ]; then
    . <InstallDir>/app/out/vs/workbench/contrib/terminal/browser/media/shellIntegration-bash.sh
  fi
  ```
**pwsh**

  Add the following to your [PowerShell profile](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2), replacing `<InstallDir>` with VS Code's installation directory. Run `code $Profile` in pwsh to open the file in VS Code.
  ```pwsh
  if ($env:TERM_PROGRAM -eq "vscode") {
    . "<InstallDir>/app/out/vs/workbench/contrib/terminal/browser/media/shellIntegration.ps1"
  }
  ```
**zsh**

  Add the following to your `~/.zshrc` file. Run `code ~/.zshrc` in bash to open the file in VS Code.
  ```sh
  if [[ "$TERM_PROGRAM" == "vscode" ]]; then
    . <vscode resources install path>/app/out/vs/workbench/contrib/terminal/browser/media/shellIntegration-rc.zsh
  fi
  ```

## Features

### Command decorations and the overview ruler

One of the things shell integration enables is the ability to get the exit codes of the commands run within the terminal. Using this information, decorations are added to the left of the line to indicate whether the command succeeded of failed. These decorations also show up in the relatively new overview ruler in the scroll bar, just like in the editor.

![Blue circles appear next to successful commands, red circles with crosses appear next to failed commands. The color of the circles appears in the scroll bar](images/terminal-shell-integration/decorations.png)

The decorations can be interacted with to give some contextual actions like re-running the command:

![Clicking a successful command decoration shows a context menu containing items: Copy Output, Copy Output as HTML, Rerun Command and How does this work?]((images/terminal-shell-integration/decoration-menu.png)

The command decorations can be configured with the following settings:

- `terminal.integrated.shellIntegration.decorationIcon`
- `terminal.integrated.shellIntegration.decorationIconSuccess`
- `terminal.integrated.shellIntegration.decorationIconError`

### Command navigation

The commands detected by shell integration feed into the command navigation feature (`ctrl/cmd+up`, `ctrl/cmd+down`) to give it more reliable command positions. This feature allows for quick navigation between commands and selection of their output.

### Run recent command

The `Terminal: Run Recent Command` command surfaces history from various sources in a quick pick, providing similar functionality to a shell's reverse search (ctrl+r). The sources are the current session's history, previous session history for this shell type and the common shell history file.

![The "run recent command" command shows a quick pick with previously run commands  that can be filtered similar to the go to file command](images/terminal-shell-integration/recent-command.png)

`Alt` can be held to write the text to the terminal without running it. The amount of history stored in the previous session section is determined by the `terminal.integrated.shellIntegration.history` setting.

There is currently no keybinding assigned by default but it can be hooked up to `ctrl+space` for example with the following keybinding:

```json
{
    "key": "ctrl+space",
    "command": "workbench.action.terminal.runRecentCommand",
    "when": "terminalFocus"
},
```

### Go to recent directory

Similar to the run recent command feature, the `Terminal: Go to Recent Directory` command keeps track of directories that have been visited and allows quick filtering and `cd`ing to them.

`Alt` can be held to write the text to the terminal without running it.

### Current working directory detection

Shell integration tells us what the current working directory is. This information was impossible on Windows previously without a bunch of hacks and required polling on macOS and Linux which isn't good for performance.

The current working directory is used to resolve links against, showing the directory a recent command ran within as well as the `"terminal.integrated.splitCwd": "inherited"` feature.

## Supported escape sequences

VS Code supports several custom escape sequences:

### VS Code custom sequences `OSC 633 ; ... ST`

VS Code's custom escape sequences are currently designed to only be triggered from within the shell integration script. We may document these in the future which would make it easier for shells to create their own VS Code shell integration scripts.

### Final Term shell integration `OSC 133 ; <...> ST`

VS Code supports Final Term's shell integration sequences which allows non-VS Code shell integration scripts to work in VS Code. This results in a somewhat degraded experience though as it doesn't support as many features as `OSC 633`. Here are the specific sequences that are supported:

- `OSC 133 ; A ST` - Mark prompt start
- `OSC 133 ; B ST` - Mark prompt end
- `OSC 133 ; C ST` - Mark pre-execution
- `OSC 133 ; D [; <exitcode>] ST` - Mark execution finished with an optional exit code

### SetMark `OSC 1337 ; SetMark ST`

This sequence adds a mark to the left of the line it was triggered on and also adds an annotation to the scroll bar:

![When the sequence is written to the terminal a small grey circle will appear to the left of the command, with a matching annotation in the scroll bar](images/terminal-shell-integration/setmark.png)

These marks integrate with command navigation to make them easy to navigate to via ctrl/cmd+up and ctrl/cmd+down by default.

## Common questions

### When does automatic injection not work?

There are several cases where automatic injection doesn't work, here are some common cases:

- `$PROMPT_COMMAND` is in an unsupported format, changing it to point to a single function is an easy way to workaround this. For example:
  ```sh
  prompt() {
    printf "\033]0;%s@%s:%s\007" "${USER}" "${HOSTNAME%%.*}" "${PWD/#$HOME/\~}"
  }
  PROMPT_COMMAND=prompt
  ```
- `$HISTCONTROL` contains the `erasedups` option, this changes functionality of the `history` command that shell integration depends upon.
- Some shell plugins may disable VS Code's shell integration explicitly by unsetting `$VSCODE_SHELL_INTEGRATION` when they initialize.