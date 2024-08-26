---
Order: 9
Area: setup
TOCTitle: Uninstall
ContentId: 435486d3-ad55-4a31-a087-d108f75ba669
PageTitle: Uninstall Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Uninstall Visual Studio Code and clean up.
---
# Uninstall Visual Studio Code

The steps for uninstalling Visual Studio Code will depend on your platform (Windows, macOS, or Linux) and the install option that you used. For example on Windows, you can use the System or User Windows Installers or download a `.zip` file and extract the contents anywhere on your machine.

In general, you would uninstall VS Code as you would any other desktop application and follow your platform's recommended flow for uninstalling software. Specific platform guidance is provided below as well as how to [completely clean up](#clean-uninstall) any remaining VS Code configuration files.

## Windows

### Windows Installer

If you installed VS Code via the Windows Installer, either the User or System version, use the installer to remove VS Code.

* Start menu
  * Search for **Add or Remove Programs** and find Visual Studio Code in the **Apps** > **Apps & features** list.
  * Select **Uninstall** from the actions dropdown on the right side (three vertical dots).
  * Follow the prompts to uninstall VS Code.
* Control Panel
  * Under **Programs**, select the **Uninstall a program** link.
  * Find the Visual Studio Code entry, right-click, and select the **Uninstall** command.
  * Follow the prompts to uninstall VS Code.

### .zip file installation

If you installed VS Code on Windows by downloading and extracting one of the `.zip` files found on the [Visual Studio Code website](https://code.visualstudio.com/#alt-downloads), you can uninstall by deleting the folder where you extracted the `.zip` contents.

## macOS

To uninstall VS Code on macOS, open **Finder** and go to **Applications**. Right-click on the Visual Studio Code application and select **Move to Trash**.

## Linux

To uninstall VS Code on Linux, you should use your package manager's uninstall or remove option. The exact command line will differ depending on which package manager you used (for example, `apt-get`, `rpn`, `dnf`, `yum`, etc.).

The names for the VS Code packages are:

* `code` - VS Code Stable release
* `code-insiders` - VS Code [Insiders](/insiders) release

For example, if you installed VS Code via the Debian package (`.deb`) and `apt-get` package manager, you would run:

```bash
sudo apt-get remove code
```

where `code` is the name of the VS Code Debian package.

## Clean uninstall

If you want to remove all user data after uninstalling VS Code, you can delete the user data folders `Code` and `.vscode`. This will return you to the state before you installed VS Code. This can also be used to reset all settings if you don't want to uninstall VS Code.

The folder locations will vary depending on your platform:

* **Windows** - Delete `%APPDATA%\Code` and `%USERPROFILE%\.vscode`.
* **macOS** - Delete `$HOME/Library/Application Support/Code` and `~/.vscode`.
* **Linux** - Delete `$HOME/.config/Code` and `~/.vscode`.

## Next steps

* [Setup overview](/docs/setup/setup-overview.md) - General information about VS Code setup and updates.
* [Windows setup](/docs/setup/windows.md) - Details and common questions about installing VS Code on Windows.
* [macOS setup](/docs/setup/mac.md) - VS Code is available for both Intel and Apple silicon macOS machines.
* [Linux setup](/docs/setup/linux.md) - Learn about the different VS Code packages available for Linux.
