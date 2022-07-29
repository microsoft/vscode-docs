---
Order: 2
Area: terminal
TOCTitle: Shell Integration
ContentId: a6a1652b-c0d8-4054-a2da-feb915eef2cc
PageTitle: Terminal Shell Integration in Visual Studio Code
DateApproved: 7/7/2022
MetaDescription: Visual Studio Code's embedded terminal can integrate with some shells to enhance the capabilities of the terminal.
---

# Terminal Shell Integration

Visual Studio Code has the ability to integrate with common shells, allowing the terminal to understand more about what's actually happening inside the shell. This additional information enables some [compelling features](#_features) such as working directory detection and command detection, decorations and navigation.

Supported shells:

- Linux/macOS: bash, pwsh, zsh
- Windows: pwsh

## Installation

### Automatic script injection

By default, the shell integration script should automatically activate on supported shells launched from VS Code. This is done by injecting arguments and/or environment variables when the shell session launches. This automatic injection can be disabled by setting `terminal.integrated.shellIntegration.enabled` to `false`.

This standard, easy way will not work for some advanced use cases like in sub-shells, through a regular `ssh` session (when not using the [Remote - SSH extension](/docs/remote/ssh.md)) or for some complex shell setups. The recommended way to enable shell integration for those is [manual installation](#manual-installation).

### Manual installation

To manually install shell integration, the VS Code shell integration script needs to run during your shell's initialization. Where and how to do this depends on the shell and OS you're using. When using manual install it's recommended to set `terminal.integrated.shellIntegration.enabled` to `false`, though not mandatory.

> **Tip:** When using the [Insiders build](https://code.visualstudio.com/insiders), replace `code` with `code-insiders` below.

#### bash

Add the following to your `~/.bashrc` file. Run `code ~/.bashrc` in bash to open the file in VS Code.

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path bash)"
```

#### pwsh

Add the following to your [PowerShell profile](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2). Run `code $Profile` in pwsh to open the file in VS Code.

```pwsh
if ($env:TERM_PROGRAM -eq "vscode") { . "$(code --locate-shell-integration-path pwsh)" }
```

#### zsh

Add the following to your `~/.zshrc` file. Run `code ~/.zshrc` in bash to open the file in VS Code.

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path zsh)"
```

#### Portability versus performance

The recommended approach above to install shell integration relies on executing our CLI to find the path to the shell integration script, this is great at it works cross-platform and also with all install types provided `code` in on the `$PATH`. This currently launches Node.js in order to fetch the path though which can add a small delay to shell startup. To reduce this, you can inline the script above by resolving the path ahead of time and adding it directly into your init script.

```sh
# Output the executable's path first:
code --locate-shell-integration-path bash

# Add the result of the above to the source statement:
[[ "$TERM_PROGRAM" == "vscode" ]] && . "/path/to/shell/integration/script.sh"
```

## Features

### Command decorations and the overview ruler

One of the things shell integration enables is the ability to get the exit codes of the commands run within the terminal. Using this information, decorations are added to the left of the line to indicate whether the command succeeded or failed. These decorations also show up in the relatively new overview ruler in the scroll bar, just like in the editor.

![Blue circles appear next to successful commands, red circles with crosses appear next to failed commands. The color of the circles appears in the scroll bar](images/shell-integration/decorations.png)

The decorations can be interacted with to give some contextual actions like re-running the command:

![Clicking a successful command decoration shows a context menu containing items: Copy Output, Copy Output as HTML, Rerun Command and How does this work?](images/shell-integration/decoration-menu.png)

The command decorations can be configured with the following settings:

- `terminal.integrated.shellIntegration.decorationsEnabled`
- `terminal.integrated.shellIntegration.decorationIcon`
- `terminal.integrated.shellIntegration.decorationIconSuccess`
- `terminal.integrated.shellIntegration.decorationIconError`

### Command navigation

The commands detected by shell integration feed into the command navigation feature (`kbStyle(Ctrl/Cmd+Up)`, `kbStyle(Ctrl/Cmd+Down)`) to give it more reliable command positions. This feature allows for quick navigation between commands and selection of their output. Hold `kbStyle(Shift)` as well to select from the current position to the command.

### Run recent command

The **Terminal: Run Recent Command** command surfaces history from various sources in a Quick Pick, providing similar functionality to a shell's reverse search (`kbstyle(Ctrl+R)`). The sources are the current session's history, previous session history for this shell type and the common shell history file.

![The "run recent command" command shows a quick pick with previously run commands that can be filtered similar to the go to file command](images/shell-integration/recent-command.png)

Some other functionality of the command:

- By default the search mode is "contiguous search", meaning the search term must exactly match. The button on the right of the search input allows switching to fuzzy search.
- In the current session section, there is a clipboard icon in the right of the Quick Pick that will open the command output in an editor.
- `kbstyle(Alt)` can be held to write the text to the terminal without running it.
- The amount of history stored in the previous session section is determined by the `terminal.integrated.shellIntegration.history` setting.

There is currently no keybinding assigned by default but you can add your own keyboard shortcut. For example, the below replaces `kbstyle(Ctrl+R)` with `runRecentCommand`, with `kbstyle(Ctrl+Alt+R)` available to fallback to the shell's regular behavior:

```jsonc
{
    "key": "ctrl+r",
    "command": "workbench.action.terminal.runRecentCommand",
    "when": "terminalFocus"
},
// Allow ctrl+r again to go to the next command in the quick pick
{
  "key": "ctrl+r",
  "command": "workbench.action.quickOpenNavigateNextInViewPicker",
  "when": "inQuickOpen && inTerminalRunCommandPicker"
},
// Fallback to the shell's native ctrl+r
{
  "key": "ctrl+alt+r",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": "\u0012"/*^R*/ },
  "when": "terminalFocus"
}
```

### Go to recent directory

Similar to the run recent command feature, the **Terminal: Go to Recent Directory** command keeps track of directories that have been visited and allows quick filtering and navigating (`cd`) to them.

`kbstyle(Alt)` can be held to write the text to the terminal without running it.

### Current working directory detection

Shell integration tells VS Code what the current working directory of the shell is. This information is not possible to get on Windows without trying to detect the prompt through regex and required polling on macOS and Linux which isn't good for performance.

One of the biggest features this enables is enhanced resolving of links in the terminal. Take a link `package.json` for example, when the link is activated while shell integration is disabled this will open a search quick pick with `package.json` as the filter if there are multiple `package.json` files in the workspace. When shell integration is enabled however, it will open the `package.json` file in the current folder directly because the current location is known. This allows the output of `ls` for example to reliabily open the correct file.

The current working directory is also used to show the directory in the terminal tab, in the run recent command quick pick and for the `"terminal.integrated.splitCwd": "inherited"` feature.

### Extended PowerShell keybindings

Windows' console API allows for more keybindings than Linux/macOS terminals, since VS Code's terminal emulates the latter even on Windows there are some PowerShell keybindings that aren't possible using the standard means due to lack of VT encoding such as `kbstyle(Ctrl+Space)`. Shell integration allows VS Code to attach a custom keybindings to send a special sequence to PowerShell which then gets handled in the shell integration script and forwarded to the proper key handler.The following keybindings should work in PowerShell when shell integration is enabled:

- `kbstyle(Ctrl+Space)`: Defaults to `MenuComplete` on Windows only
- `kbstyle(Alt+Space)`: Defaults to `SetMark` on all platforms
- `kbstyle(Shift+Enter)`: Defaults to `AddLine` on all platforms
- `kbstyle(Shift+End)`: Defaults to `SelectLine` on all platforms
- `kbstyle(Shift+Home)`: Defaults to `SelectBackwardsLine` on all platforms

## Supported escape sequences

VS Code supports several custom escape sequences:

### VS Code custom sequences 'OSC 633 ; ... ST'

VS Code's custom escape sequences are currently designed to only be triggered from within the shell integration script. We may document these in the future which would make it easier for shells to create their own VS Code shell integration scripts.

### Final Term shell integration

VS Code supports Final Term's shell integration sequences which allows non-VS Code shell integration scripts to work in VS Code. This results in a somewhat degraded experience though as it doesn't support as many features as `OSC 633`. Here are the specific sequences that are supported:

- `OSC 133 ; A ST` - Mark prompt start
- `OSC 133 ; B ST` - Mark prompt end
- `OSC 133 ; C ST` - Mark pre-execution
- `OSC 133 ; D [; <exitcode>] ST` - Mark execution finished with an optional exit code

### SetMark 'OSC 1337 ; SetMark ST'

This sequence adds a mark to the left of the line it was triggered on and also adds an annotation to the scroll bar:

![When the sequence is written to the terminal a small grey circle will appear to the left of the command, with a matching annotation in the scroll bar](images/shell-integration/setmark.png)

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

- Some shell plugins may disable VS Code's shell integration explicitly by unsetting `$VSCODE_SHELL_INTEGRATION` when they initialize.

### Why are command decorations showing when the feature is disabled?

The likely cause of this is that your system has shell integration for another terminal installed that [VS Code understands](#final-term-shell-integration). If you don't want any decorations, you can hide them with the following setting:

```json
"terminal.integrated.shellIntegration.decorationsEnabled": never
```

Alternatively, you could remove the shell integration script from your shell rc/startup script but you will lose access to command-aware features like [command navigation](#command-navigation).
