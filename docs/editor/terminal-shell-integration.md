---
Order: 12
Area: editor
TOCTitle: Terminal Shell Integration
ContentId: a6a1652b-c0d8-4054-a2da-feb915eef2cc
PageTitle: Terminal Shell Integration in Visual Studio Code
DateApproved: 6/9/2022
MetaDescription: Visual Studio Code's integrated terminal has the ability to integration with various shells, enhancing the capabilities of the terminal.
---

# Terminal Shell Integration

Visual Studio Code has the ability to integrate with common shells, allowing the terminal to understand more about what's actually happening inside the shell. This additional information enables some [compelling features](#_features) such as command/directory detection, command decorations and command navigation.

Supported shells:

- Linux/macOS: bash, pwsh, zsh
- Windows: pwsh

## Installation

### Automatic script injection

The standard way to activate shell integration is to simply set the `terminal.integrated.shellIntegration.enabled` setting to true. Enabling this setting will automatically "inject" the shell integration script into the shell session via shell arguments and/or environment variables when the setting is enabled. This is designed to be an easy way to get started with shell integration but it doesn't work in some more advanced use cases like in sub-shells, through ssh (when not using the [Remote - SSH extension](https://code.visualstudio.com/docs/remote/ssh)) or for some complex shell setups. For those the ability to [manually install the feature](#_manual-installation) is available.

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

###

## Common questions

###