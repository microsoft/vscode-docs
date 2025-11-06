---
ContentId: a6a1652b-c0d8-4054-a2da-feb915eef2cc
DateApproved: 10/09/2025
MetaDescription: Visual Studio Code's embedded terminal can integrate with some shells to enhance the capabilities of the terminal.
---
# Terminal Shell Integration

Visual Studio Code has the ability to integrate with common shells, allowing the terminal to understand more about what's actually happening inside the shell. This additional information enables some useful features such as [working directory detection](#current-working-directory-detection) and command detection, [decorations](#command-decorations-and-the-overview-ruler), and [navigation](#command-navigation).

Supported shells:

- Linux/macOS: bash, fish, pwsh, zsh
- Windows: Git Bash, pwsh

## Installation

### Automatic script injection

By default, the shell integration script should automatically activate on supported shells launched from VS Code. This is done by injecting arguments and/or environment variables when the shell session launches. This automatic injection can be disabled by setting `setting(terminal.integrated.shellIntegration.enabled)` to `false`.

This standard, easy way will not work for some advanced use cases like in sub-shells, through a regular `ssh` session (when not using the [Remote - SSH extension](/docs/remote/ssh.md)) or for some complex shell setups. The recommended way to enable shell integration for those is [manual installation](#manual-installation).

>**Note**: Automatic injection may not work on old versions of the shell, for example older versions of fish do not support the `$XDG_DATA_DIRS` environment variable which is how injection works. You may still be able to manually install to get it working.

### Manual installation

To manually install shell integration, the VS Code shell integration script needs to run during your shell's initialization. Where and how to do this depends on the shell and OS you're using. When using manual install it's recommended to set `setting(terminal.integrated.shellIntegration.enabled)` to `false`, though not mandatory.

> **Tip:** When using the [Insiders build](https://code.visualstudio.com/insiders), replace `code` with `code-insiders` below.

**bash**

Add the following to your `~/.bashrc` file. Run `code ~/.bashrc` in bash to open the file in VS Code.

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path bash)"
```

**fish**

Add the following to your `config.fish`. Run `code $__fish_config_dir/config.fish` in fish to open the file in VS Code.

```sh
string match -q "$TERM_PROGRAM" "vscode"
and . (code --locate-shell-integration-path fish)
```

**pwsh**

Add the following to your [PowerShell profile](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2). Run `code $Profile` in pwsh to open the file in VS Code.

```powershell
if ($env:TERM_PROGRAM -eq "vscode") { . "$(code --locate-shell-integration-path pwsh)" }
```

**zsh**

Add the following to your `~/.zshrc` file. Run `code ~/.zshrc` in zsh to open the file in VS Code.

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path zsh)"
```

**Git Bash**

Add the following to your `~/.bashrc` file. Run `code ~/.bashrc` in Git Bash to open the file in VS Code.

```sh
[[ "$TERM_PROGRAM" == "vscode" ]] && . "$(code --locate-shell-integration-path bash)"
```

#### Portability versus performance

The above shell integration installation is cross-platform and compatible with any installation type if `code` is in the `$PATH`. However, this recommended approach starts Node.js to fetch the script path, leading to a slight delay in shell startup. To mitigate this delay, inline the script above by resolving the path ahead of time and adding it directly into your init script.

```sh
# Output the executable's path first:
code --locate-shell-integration-path bash

# Add the result of the above to the source statement:
[[ "$TERM_PROGRAM" == "vscode" ]] && . "/path/to/shell/integration/script.sh"
```

## Shell integration quality

When using shell integration, it has a "quality" associated with it that declares the capabilities of it. These qualities are determined by how the shell integration script behaves.

- **None**: No shell integration is active.
- **Rich**: Shell integration is active and command detection is working in an ideal way.
- **Basic**: Shell integration is active, but command detection might not support all functionality. For example, the command run location is detected, but not its exit status.

To view the shell integration quality, hover the terminal tab. Optionally, select **Show Details** on the hover to view more detailed information.

## IntelliSense

IntelliSense in the terminal enables you to receive suggestions for files, folders, commands, command arguments and options. This feature can be enabled or disabled with the `setting(terminal.integrated.suggest.enabled)` setting.

![Screenshot of the terminal showing a user has typed git checkout and receives suggestions for the branch name.](images/shell-integration/terminal-suggest.png)

As you type, a list of suggestions will appear. To manually trigger the suggestions, use the `kb(workbench.action.terminal.requestCompletions)` keyboard shortcut.

By default, `kbstyle(Tab)` inserts the suggestion. Once you navigate the list, `kbstyle(Enter)` inserts the suggestion. You can configure this behavior with the `setting(terminal.integrated.suggest.selectionMode)` setting.

There are various settings to configure how terminal IntelliSense behaves:

- `setting(terminal.integrated.suggest.quickSuggestions)`: show automatically depending on the content of the command line, as opposed to manually via `kbstyle(Ctrl+Space)`.
- `setting(terminal.integrated.suggest.suggestOnTriggerCharacters)`: show automatically after a "trigger character" such as `-` or `/`.
- `setting(terminal.integrated.suggest.runOnEnter)`: optionally run the command when `kbstyle(Enter)` is used (not `kbstyle(Tab)`).
- `setting(terminal.integrated.suggest.windowsExecutableExtensions)`: the list of extensions that are treated as executables on Windows.
- `setting(terminal.integrated.suggest.providers)`: provides the ability to disable specific providers, for example extensions may contribute completions you don't want.
- `setting(terminal.integrated.suggest.showStatusBar)`: show the status bar at the bottom of the IntelliSense popup.
- `setting(terminal.integrated.suggest.cdPath)`: enable `$CDPATH` integration.
- `setting(terminal.integrated.suggest.inlineSuggestion)`: integrate with shell "ghost text" and how to present it.
- `setting(terminal.integrated.suggest.upArrowNavigatesHistory)`: send up arrow to the shell instead of browsing completions, this is particularly useful on zsh where you can filter and then press up to do a history search with that prefix.
- `setting(terminal.integrated.suggest.selectionMode)`: how the Intellisense popup is focused which determines what `kbstyle(Enter)` and `kbstyle(Tab)` do.
- `setting(terminal.integrated.suggest.insertTrailingSpace)`: insert a trailing space and re-trigger completions after accepting.

### Global completion caching

To improve performance, VS Code aggressively caches globals for a particular shell. When you make changes to shell startup logic that adds commands, manually refresh the cache with the **Terminal: Clear Suggest Cached Globals** command (`terminal.integrated.suggest.clearCachedGlobals`) if they weren't picked up automatically.

## Command decorations and the overview ruler

One of the things that shell integration enables is the ability to get the exit codes of the commands run within the terminal. Using this information, decorations are added to the left of the line to indicate whether the command succeeded or failed. These decorations also show up in the relatively new overview ruler in the scroll bar, just like in the editor.

![Blue circles appear next to successful commands, red circles with crosses appear next to failed commands. The color of the circles appears in the scroll bar](images/shell-integration/decorations.png)

The decorations can be interacted with to give some contextual actions like re-running the command:

![Clicking a successful command decoration shows a context menu containing items: Copy Output, Copy Output as HTML, Rerun Command and How does this work?](images/shell-integration/decoration-menu.png)

The command and overview ruler decorations can be configured with the `setting(terminal.integrated.shellIntegration.decorationsEnabled)` setting.

## Command navigation

The commands detected by shell integration feed into the command navigation feature (`kbStyle(Ctrl/Cmd+Up)`, `kbStyle(Ctrl/Cmd+Down)`) to give it more reliable command positions. This feature allows for quick navigation between commands and selection of their output. To select from the current position to the command, you can also hold down `kbStyle(Shift)`, pressing `kbStyle(Shift+Ctrl/Cmd+Up)` and `kbStyle(Shift+Ctrl/Cmd+Down)`.

## Command guide

The command guide is a bar that shows up beside a command and its output when hovered. This helps more quickly identify the command and also is a way to verify that shell integration is working properly.

![Screenshot of the terminal, highlighting the command guide vertical bar on the left-hand side to indicate the boundary of a command.](images/shell-integration/terminal-command-guide.png)

You can customize the color of the command guide by using Color Themes. To toggle the command guide, configure the `setting(terminal.integrated.shellIntegration.showCommandGuide)` setting.

## Sticky scroll

The sticky scroll feature will "stick" the command that is partially showing at the top of the terminal, making it much easier to see what command that output belongs to. Clicking on the sticky scroll component will scroll to the command's location in the terminal buffer.

![Sticky scroll will show the command at the top of the terminal viewport](images/shell-integration/sticky-scroll.png)

This can be enabled with the `setting(terminal.integrated.stickyScroll.enabled)` setting.

## Quick fixes

VS Code scans the output of a command and presents a Quick Fix with actions that have a high likelihood of being what the user will want to do next.

![Running 'git push --set-upstream' will present a lightbulb that opens a dropdown with an option to open a new PR on github.com](images/shell-integration/quick-fix.png)

Here are some of the built-in Quick Fixes:

- When it's detected that a port is already being listened to, suggest to kill the process and re-run the previous command.
- When `git push` fails due to an upstream not being set, suggest to push with the upstream set.
- When a `git` subcommand fails with a similar command error, suggest to use the similar command(s).
- When `git push` results in a suggestion to create a GitHub PR, suggest to open the link.
- When a `General` or `cmd-not-found` PowerShell feedback provider triggers, suggest each suggestion.

The Quick Fix feature also supports [accessibility signals](/docs/configure/accessibility/accessibility.md#accessibility-signals) for additional feedback when a Quick Fix is available.

## Run recent command

The **Terminal: Run Recent Command** command surfaces history from various sources in a Quick Pick, providing similar functionality to a shell's reverse search (`kbstyle(Ctrl+R)`). The sources are the current session's history, previous session history for this shell type and the common shell history file.

![The "run recent command" command shows a quick pick with previously run commands that can be filtered similar to the go to file command](images/shell-integration/recent-command.png)

Some other functionality of the command:

- By default the search mode is "contiguous search", meaning the search term must exactly match. The button on the right of the search input allows switching to fuzzy search.
- In the current session section, there is a clipboard icon in the right of the Quick Pick that will open the command output in an editor.
- The pin action in the right of the Quick Pick can pin the command to the top of the list.
- `kbstyle(Alt)` can be held to write the text to the terminal without running it.
- The amount of history stored in the previous session section is determined by the `setting(terminal.integrated.shellIntegration.history)` setting.

The default keyboard shortcut for this command is `kbstyle(Ctrl+Alt+R)`. However, when accessibility mode is on these are reversed; `kbstyle(Ctrl+R)` runs a recent command and `kbstyle(Ctrl+Alt+R)` sends Ctrl+R to the shell.

The keyboard shortcuts can be flipped when accessibility mode is off with the following keyboard shortcuts:

```jsonc
{
    "key": "ctrl+r",
    "command": "workbench.action.terminal.runRecentCommand",
    "when": "terminalFocus"
},
{
  "key": "ctrl+alt+r",
  "command": "workbench.action.terminal.sendSequence",
  "args": { "text": "\u0012"/*^R*/ },
  "when": "terminalFocus"
}
```

## Go to recent directory

Similar to the run recent command feature, the **Terminal: Go to Recent Directory** command keeps track of directories that have been visited and allows quick filtering and navigating (`cd`) to them. `kbstyle(Alt)` can be held to write the text to the terminal without running it.

The default keyboard shortcut for this command is `kb(workbench.action.terminal.goToRecentDirectory)` as it behaves similar to the **Go to Line/Column** command in the editor. Ctrl+G can be send to the shell with `kbstyle(Ctrl+Alt+G)`.

## Current working directory detection

Shell integration tells VS Code what the current working directory of the shell is. This information is not possible to get on Windows without trying to detect the prompt through regex and requires polling on macOS and Linux, which isn't good for performance.

One of the biggest features this enables is enhanced resolving of links in the terminal. Take a link `package.json` for example, when the link is activated while shell integration is disabled this will open a search quick pick with `package.json` as the filter if there are multiple `package.json` files in the workspace. When shell integration is enabled however, it will open the `package.json` file in the current folder directly because the current location is known. This allows the output of `ls` for example to reliably open the correct file.

The current working directory is also used to show the directory in the terminal tab, in the run recent command quick pick and for the `"terminal.integrated.splitCwd": "inherited"` feature.

## Extended PowerShell keyboard shortcuts

Windows' console API allows for more keyboard shortcuts than Linux/macOS terminals, since VS Code's terminal emulates the latter even on Windows there are some PowerShell keyboard shortcuts that aren't possible using the standard means due to lack of VT encoding such as `kbstyle(Ctrl+Space)`. Shell integration allows VS Code to attach a custom keyboard shortcuts to send a special sequence to PowerShell that then gets handled in the shell integration script and forwarded to the proper key handler.

The following keyboard shortcuts should work in PowerShell when shell integration is enabled:

- `kbstyle(Ctrl+Space)`: Defaults to `MenuComplete` on Windows only
- `kbstyle(Alt+Space)`: Defaults to `SetMark` on all platforms
- `kbstyle(Shift+Enter)`: Defaults to `AddLine` on all platforms
- `kbstyle(Shift+End)`: Defaults to `SelectLine` on all platforms
- `kbstyle(Shift+Home)`: Defaults to `SelectBackwardsLine` on all platforms

## Enhanced accessibility

The information that shell integration provides to VS Code is used to improve [accessibility in the terminal](/docs/configure/accessibility/accessibility.md#terminal-accessibility). Some examples of enhancements are:

- Navigation through detected commands in the accessible buffer (`kb(workbench.action.terminal.focusAccessibleBuffer)`)
- An [audio cue](/docs/configure/accessibility/accessibility.md#accessibility-signals) plays when a command fails.
- Underlying text box synchronizing such that using the arrow and backspace keys behave more correctly.

## Supported escape sequences

VS Code supports several custom escape sequences:

### VS Code custom sequences 'OSC 633 ; ... ST'

VS Code has a set of custom escape sequences designed to enable the shell integration feature when run in VS Code's terminal. These are used by the built-in scripts but can also be used by any application capable of sending sequences to the terminal, for example the [Julia extension](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) uses these to support shell integration in the Julia REPL.

These sequences should be ignored by other terminals, but unless other terminals end up adopting the sequences more widely, it's recommended to check that `$TERM_PROGRAM` is `vscode` before writing them.

- `OSC 633 ; A ST`: Mark prompt start.
- `OSC 633 ; B ST`: Mark prompt end.
- `OSC 633 ; C ST`: Mark pre-execution.
- `OSC 633 ; D [; <exitcode>] ST`: Mark execution finished with an optional exit code.
- `OSC 633 ; E ; <commandline> [; <nonce] ST`: Explicitly set the command line with an optional nonce.

  The E sequence allows the terminal to reliably get the exact command line interpreted by the shell. When this is not specified, the terminal may fallback to using the A, B and C sequences to get the command, or disable the detection all together if it's unreliable.

  The optional nonce can be used to verify the sequence came from the shell integration script to prevent command spoofing. When the nonce is verified successfully, some protections before using the commands will be removed for an improved user experience.

  The command line can escape ASCII characters using the `\xAB` format, where AB are the hexadecimal representation of the character code (case insensitive), and escape the `\` character using `\\`. It's required to escape semi-colon (`0x3b`) and characters 0x20 and below and this is particularly important for new line and semi-colon.

  Some examples:

  ```text
  "\"  -> "\\"
  "\n" -> "\x0a"
  ";"  -> "\x3b"
  ```

- `OSC 633 ; P ; <Property>=<Value> ST`: Set a property on the terminal, only known properties will be handled.

  Known properties:

  - `Cwd`: Reports the current working directory to the terminal.
  - `IsWindows`: Indicates whether the terminal is using a Windows backend like winpty or conpty. This may be used to enable additional heuristics as the positioning of the shell integration sequences are not guaranteed to be correct. Valid values are `True` and `False`.
  - `HasRichCommandDetection`: Indicates whether the terminal has rich command detection capabilities. This property is set to `True` when the shell integration script acts ideally as VS Code expects it, specifically sequences should come in the expected positions in the order `A, B, E, C, D`.


### Final Term shell integration

VS Code supports Final Term's shell integration sequences, which allow non-VS Code shell integration scripts to work in VS Code. This results in a somewhat degraded experience as it doesn't support as many features as `OSC 633`. Here are the specific sequences that are supported:

- `OSC 133 ; A ST`: Mark prompt start.
- `OSC 133 ; B ST`: Mark prompt end.
- `OSC 133 ; C ST`: Mark pre-execution.
- `OSC 133 ; D [; <exitcode>] ST`: Mark execution finished with an optional exit code.

### iTerm2 shell integration

The following sequences that iTerm2 pioneered are supported:

- `OSC 1337 ; CurrentDir=<Cwd> S`: Sets the current working directory of the terminal, similar to `OSC 633 ; P ; Cwd=<Cwd> ST`.
- `OSC 1337 ; SetMark ST`: Adds a mark to the left of the line it was triggered on and also adds an annotation to the scroll bar:

    ![When the sequence is written to the terminal a small grey circle will appear to the left of the command, with a matching annotation in the scroll bar](images/shell-integration/setmark.png)

    These marks integrate with command navigation to make them easy to navigate to via `kb(workbench.action.terminal.scrollToPreviousCommand)` and `kb(workbench.action.terminal.scrollToNextCommand)`.

## Common questions

### When does automatic injection not work?

There are several cases where automatic injection doesn't work, here are some common cases:

- `$PROMPT_COMMAND` is in an unsupported format, changing it to point to a single function is an easy way to work around this. For example:

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

### Why does the command decoration jump around on Windows?

Windows uses an emulated pseudoterminal (pty) backend called ConPTY. It works a little differently to a regular pty because it needs to maintain compatibility with the Windows Console API. One of the impacts of this is the pty handles rendering specially in such a way that the shell integration sequences that identify the commands in the terminal buffer may be misplaced. When the command jumps around it's typically after a command has run, and VS Code's heuristics have kicked in to improve the position of the command decorations.
