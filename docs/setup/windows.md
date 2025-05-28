---
ContentId: 4670C281-5761-46E6-8C46-10D523946FFB
DateApproved: 05/08/2025
MetaDescription: Get Visual Studio Code up and running on Windows
---
# Visual Studio Code on Windows

## Installation

1. [Download and install Visual Studio Code](#install-vs-code-on-windows)

    > [!NOTE]
    > VS Code ships monthly releases and supports [auto-update](#updates) when a new release is available.

1. [Install additional components](/docs/setup/additional-components.md)

    Install Git, Node.js, TypeScript, language runtimes, and more.

1. [Install VS Code extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode)

    Customize VS Code with themes, formatters, language extensions and debuggers for your favorite languages, and more.

1. [Set up AI-assisted coding with GitHub Copilot](/docs/copilot/setup-simplified.md)

    > [!TIP]
    > If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

1. [Get started with the VS Code tutorial](/docs/getstarted/getting-started.md)

    Discover the user interface and key features of VS Code.

## Install VS Code on Windows

### Use the Windows installer

1. Download the [Visual Studio Code installer](https://go.microsoft.com/fwlink/?LinkID=534107) for Windows

1. Once it is downloaded, run the installer (VSCodeUserSetup-{version}.exe)

    By default, VS Code is installed under `C:\Users\{Username}\AppData\Local\Programs\Microsoft VS Code`.

> [!TIP]
> Setup adds Visual Studio Code to your `%PATH%` environment variable, to let you type 'code .' in the console to open VS Code on that folder. You need to restart your console after the installation for the change to the `%PATH%` environmental variable to take effect.

### Use the ZIP file

1. Download the [Visual Studio Code Zip archive](/docs/?dv=winzip)

1. Extract the Zip archive, and run VS Code from there

## User setup versus system setup

VS Code provides both Windows **user** and **system** level setups.

| Setup Type | Description |
|------------|-------------|
| [User setup](https://go.microsoft.com/fwlink/?LinkID=534107) | Does not require administrator privileges to run, as the location is under your user Local AppData (`LOCALAPPDATA`) folder. Since it requires no elevation, the user setup is able to provide a smoother background update experience.<br/>This is the preferred way to install VS Code on Windows. <br/> **Note:** When running VS Code as Administrator in a user setup installation, updates are disabled. |
| [System setup](https://go.microsoft.com/fwlink/?linkid=852157) | Requires elevation to administrator privileges to run and places the installation under the system's `Program Files`. The in-product update flow also requires elevation, making it less streamlined than the user setup. On the other hand, installing VS Code using the system setup means that it is available to all users in the system. |

See the [Download Visual Studio Code](/download) page for a complete list of available installation options.

## Updates

VS Code ships monthly [releases](/updates) and supports auto-update when a new release is available. If you're prompted by VS Code, accept the newest update and it will be installed (you won't need to do anything else to get the latest bits).

> [!NOTE]
> You can [disable auto-update](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) if you prefer to update VS Code on your own schedule.

## Windows as a developer machine

Windows is a popular operating system and it can also be a great cross-platform development environment. This section describes cross-platform features such as the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install) (WSL) and the Windows Terminal.

> [!NOTE]
> Make sure you are on a recent Windows build. Check **Settings** > **Windows Update** to see if you are up-to-date.

### Windows Subsystem for Linux

With WSL, you can install and run Linux distributions on Windows to develop and test your source code on Linux, while still working locally on your Windows machine.

When coupled with the [WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension, you get full VS Code editing and debugging support while running in the context of WSL.

See the [Developing in WSL](/docs/remote/wsl.md) documentation to learn more, or try the [Working in WSL](/docs/remote/wsl-tutorial.md) introductory tutorial.

### Windows Terminal

The [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701), available from the Microsoft Store, is a terminal application for users of command-line tools and shells like Command Prompt, PowerShell, and WSL. Its main features include multiple tabs, panes, Unicode and UTF-8 character support, a GPU accelerated text rendering engine, and custom themes, styles, and configurations.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [VS Code tutorial](/docs/getstarted/getting-started.md) - A quick hands-on tour of the key features of VS Code.
* [Tips and Tricks](/docs/getstarted/tips-and-tricks.md) - A collection of productivity tips for working with VS Code.
* [AI-assisted coding](/docs/copilot/overview.md) - Learn about using GitHub Copilot in VS Code to help you write code faster.

## Common questions

### What command-line arguments are supported by the Windows Setup?

VS Code uses [Inno Setup](https://www.jrsoftware.org/isinfo.php) to create its setup package
for Windows. Thus, all the [Inno Setup command-line switches](https://www.jrsoftware.org/ishelp/index.php?topic=setupcmdline) are available for use.

Additionally, you can prevent the Setup from launching VS Code after completion with `/mergetasks=!runcode`.

### I'm having trouble with the installer

Try using the [zip file](/docs/?dv=winzip) instead of the installer.  To use this, unzip VS Code in your `AppData\Local\Programs` folder.

> [!NOTE]
> When VS Code is installed via a Zip file, you will need to manually update it for each [release](/updates).

### Unable to run as admin when AppLocker is enabled

With the introduction of process sandboxing (discussed in this [blog post](https://code.visualstudio.com/blogs/2022/11/28/vscode-sandbox)) running as administrator is currently unsupported when AppLocker is configured due to a limitation of the runtime sandbox.

If your work requires that you run VS Code from an elevated terminal:

1. In VS Code, run the **Preferences: Configure Runtime Arguments** command in the Command Palette (`kb(workbench.action.showCommands)`)

    This command opens an `argv.json` file to configure runtime arguments for VS Code. You might see some default arguments there already.

1. Add `"disable-chromium-sandbox": true` to the `argv.json` file.

1. Restart VS Code. You should now be able to run VS Code in an elevated terminal.

Subscribe to [issue #122951](https://github.com/microsoft/vscode/issues/122951) to receive updates.

### Working with UNC paths

As of version `1.78.1`, VS Code on Windows only allows access to UNC paths (these begin with a leading `\\`) that were either approved by the user on startup or where the host name is configured to be allowed via the `setting(security.allowedUNCHosts)` setting.

If you rely on using UNC paths in VS Code, you can either:

* Configure the host to be allowed via the `setting(security.allowedUNCHosts)` setting. For example, add `server-a` when you open a path such as `\\server-a\path`.

* [Map the UNC path as a network drive](https://support.microsoft.com/en-us/windows/map-a-network-drive-in-windows-29ce55d1-34e3-a7e2-4801-131475f9557d), and use the drive letter instead of the UNC path.

* Define a global environment variable `NODE_UNC_HOST_ALLOWLIST` with the backslash-separated list of host names to allow. For example, `server-a\server-b` to allow the hosts `server-a` and `server-b`.

> [!NOTE]
> If you are using any of the remote extensions to connect to a workspace remotely (such as SSH), the `setting(security.allowedUNCHosts)` has to be configured on the remote machine and not the local machine.

This change was done to improve the security when using VS Code with UNC paths. Please refer to the associated [security advisory](https://github.com/microsoft/vscode/security/advisories/GHSA-mmfh-4pv3-39hr) for more information.
