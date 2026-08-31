---
ContentId: 4670C281-5761-46E6-8C46-10D523946FFB
DateApproved: 8/26/2026
MetaDescription: Install {% data variables.product.prodname_vscode %} on Windows, choose User or System setup, and configure Windows developer tools.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Installing {% data variables.product.prodname_vscode %} on Windows

{% data variables.product.prodname_vscode %} is available for Windows through a user installer, a system installer, and a ZIP archive. The User setup is the recommended installation for most people because it does not require administrator permissions and supports smoother background updates.

## Install {% data variables.product.prodname_vscode_shortname %} on Windows

### Choose User setup or System setup

{% data variables.product.prodname_vscode_shortname %} provides both Windows user-level and system-level setups.

| Setup type | Use when | Notes |
|------------|----------|-------|
| [User setup](https://go.microsoft.com/fwlink/?LinkID=534107) | Install {% data variables.product.prodname_vscode_shortname %} for your Windows account. | This setup does not require administrator permissions. It installs under `%LOCALAPPDATA%\Programs\Microsoft {% data variables.product.prodname_vscode_shortname %}` and provides the smoothest update experience. Updates are disabled when {% data variables.product.prodname_vscode_shortname %} runs as Administrator from a User setup installation. |
| [System setup](https://go.microsoft.com/fwlink/?linkid=852157) | Install {% data variables.product.prodname_vscode_shortname %} for all users on the machine. | This setup requires administrator permissions and installs under `Program Files`. In-product updates also require elevation. |

See the [Download {% data variables.product.prodname_vscode %}](/download) page for the full list of installation options.

### Install with the Windows installer

1. Download the [{% data variables.product.prodname_vscode %} User setup](https://go.microsoft.com/fwlink/?LinkID=534107) for Windows.

1. Run the installer, `VSCodeUserSetup-{version}.exe`.

    By default, the User setup installs {% data variables.product.prodname_vscode_shortname %} under `C:\Users\{Username}\AppData\Local\Programs\Microsoft {% data variables.product.prodname_vscode_shortname %}`.

> [!TIP]
> Setup adds {% data variables.product.prodname_vscode %} to your `%PATH%` environment variable. Restart your console after installation, then run `code .` in a folder to open that folder in {% data variables.product.prodname_vscode_shortname %}.

### Install with the System setup

1. Download the [{% data variables.product.prodname_vscode %} System setup](https://go.microsoft.com/fwlink/?linkid=852157) for Windows.

1. Run the installer with administrator permissions.

The System setup makes {% data variables.product.prodname_vscode_shortname %} available to all users on the machine.

### Install from a ZIP archive

1. Download the [{% data variables.product.prodname_vscode %} ZIP archive](/download) for Windows.

1. Extract the ZIP archive and run {% data variables.product.prodname_vscode_shortname %} from the extracted folder.

> [!NOTE]
> When {% data variables.product.prodname_vscode_shortname %} is installed from a ZIP archive, update it manually for each [release](/updates).

## Updates

{% data variables.product.prodname_vscode_shortname %} ships weekly [releases](/updates) and supports auto-update when a new release is available. When {% data variables.product.prodname_vscode_shortname %} prompts you for an update, accept the prompt to install the new version.

> [!NOTE]
> [Disable auto-update](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-auto-updates) if you prefer to update {% data variables.product.prodname_vscode_shortname %} on your own schedule.

## Develop on Windows

Windows works well as a cross-platform development environment. This section covers the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/install) (WSL) and Windows Terminal.

> [!NOTE]
> Keep Windows up to date. Check **Settings** > **Windows Update** for available updates.

### Windows Subsystem for Linux

With WSL, install and run Linux distributions on Windows to develop and test source code on Linux while working locally on your Windows machine.

When paired with the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl), {% data variables.product.prodname_vscode_shortname %} provides editing and debugging support while running in the context of WSL.

See the [Developing in WSL](/docs/remote/wsl.md) documentation to learn more, or try the [Working in WSL](/docs/remote/wsl-tutorial.md) introductory tutorial.

### Windows Terminal

[Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701), available from the Microsoft Store, is a terminal application for command-line tools and shells like Command Prompt, PowerShell, and WSL. Its main features include multiple tabs, panes, Unicode and UTF-8 character support, a GPU-accelerated text rendering engine, custom themes, styles, and configurations.

## After installation

After you install {% data variables.product.prodname_vscode_shortname %}, finish setup for your development workflow:

* [Install additional components](/docs/setup/additional-components.md), including Git, Node.js, TypeScript, language runtimes, and command-line tools.
* [Install extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode) to add themes, formatters, debuggers, and language support.
* [Set up GitHub Copilot](/docs/setup/copilot.md) to use AI features in {% data variables.product.prodname_vscode_shortname %}.
* [Start the {% data variables.product.prodname_vscode_shortname %} tutorial](/docs/editing/getting-started/editor-tutorial.md) for a hands-on tour of the user interface and key features.

## Common questions

<details>
<summary>What command-line arguments are supported by Windows Setup?</summary>

{% data variables.product.prodname_vscode_shortname %} uses [Inno Setup](https://www.jrsoftware.org/isinfo.php) to create its Windows setup package. All [Inno Setup command-line switches](https://www.jrsoftware.org/ishelp/index.php?topic=setupcmdline) are available.

To prevent Setup from launching {% data variables.product.prodname_vscode_shortname %} after completion, use `/mergetasks=!runcode`.

</details>

<details>
<summary>I'm having trouble with the installer</summary>

Use the [ZIP archive](/download) instead of the installer. To use this installation method, unzip {% data variables.product.prodname_vscode_shortname %} in your `AppData\Local\Programs` folder.

</details>

<details>
<summary>Unable to run as admin when AppLocker is enabled</summary>

With the introduction of process sandboxing, running as administrator is currently unsupported when AppLocker is configured due to a runtime sandbox limitation. Read the [{% data variables.product.prodname_vscode_shortname %} sandbox blog post](https://code.visualstudio.com/blogs/2022/11/28/vscode-sandbox) for more information.

If your work requires {% data variables.product.prodname_vscode_shortname %} to run from an elevated terminal:

1. In {% data variables.product.prodname_vscode_shortname %}, run the **Preferences: Configure Runtime Arguments** command in the Command Palette (`kb(workbench.action.showCommands)`).

    This command opens an `argv.json` file to configure runtime arguments for {% data variables.product.prodname_vscode_shortname %}. The file might already contain default arguments.

1. Add `"disable-chromium-sandbox": true` to the `argv.json` file.

1. Restart {% data variables.product.prodname_vscode_shortname %}. {% data variables.product.prodname_vscode_shortname %} can then run from an elevated terminal.

Subscribe to [issue #122951](https://github.com/microsoft/vscode/issues/122951) to receive updates.

</details>

<details>
<summary>Working with UNC paths</summary>

As of version `1.78.1`, {% data variables.product.prodname_vscode_shortname %} on Windows only opens UNC paths that are either approved by the user on startup or whose host name is configured through the `setting(security.allowedUNCHosts)` setting. UNC paths begin with a leading `\\`.

If your workflow relies on UNC paths in {% data variables.product.prodname_vscode_shortname %}, use one of these options:

* Configure the host with the `setting(security.allowedUNCHosts)` setting. For example, add `server-a` when opening a path such as `\\server-a\path`.
* [Map the UNC path as a network drive](https://support.microsoft.com/en-us/windows/map-a-network-drive-in-windows-29ce55d1-34e3-a7e2-4801-131475f9557d), and use the drive letter instead of the UNC path.
* Define a global environment variable named `NODE_UNC_HOST_ALLOWLIST` with a backslash-separated list of permitted host names. For example, `server-a\server-b` permits the hosts `server-a` and `server-b`.

> [!NOTE]
> If a remote extension connects to a remote workspace, such as with SSH, configure `setting(security.allowedUNCHosts)` on the remote machine, not on the local machine.

This change improves security when using {% data variables.product.prodname_vscode_shortname %} with UNC paths. See the associated [security advisory](https://github.com/microsoft/vscode/security/advisories/GHSA-mmfh-4pv3-39hr) for more information.

</details>
