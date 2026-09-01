---
ContentId: 435486d3-ad55-4a31-a087-d108f75ba669
DateApproved: 9/2/2026
MetaDescription: Uninstall {% data variables.product.prodname_vscode %} and clean up.
---
# Uninstall {% data variables.product.prodname_vscode %}

The steps for uninstalling {% data variables.product.prodname_vscode %} will depend on your platform (Windows, macOS, or Linux) and the install option that you used. For example on Windows, you can use the System or User Windows Installers or download a `.zip` file and extract the contents anywhere on your machine.

In general, you would uninstall {% data variables.product.prodname_vscode_shortname %} as you would any other desktop application and follow your platform's recommended flow for uninstalling software. Specific platform guidance is provided below as well as how to [completely clean up](#clean-uninstall) any remaining {% data variables.product.prodname_vscode_shortname %} configuration files.

## Windows

### Windows Installer

If you installed {% data variables.product.prodname_vscode_shortname %} via the Windows Installer, either the User or System version, use the installer to remove {% data variables.product.prodname_vscode_shortname %}.

* Start menu
  * Search for **Add or Remove Programs** and find {% data variables.product.prodname_vscode %} in the **Apps** > **Apps & features** list.
  * Select **Uninstall** from the actions dropdown on the right side (three vertical dots).
  * Follow the prompts to uninstall {% data variables.product.prodname_vscode_shortname %}.
* Control Panel
  * Under **Programs**, select the **Uninstall a program** link.
  * Find the {% data variables.product.prodname_vscode %} entry, right-click, and select the **Uninstall** command.
  * Follow the prompts to uninstall {% data variables.product.prodname_vscode_shortname %}.

### .zip file installation

If you installed {% data variables.product.prodname_vscode_shortname %} on Windows by downloading and extracting one of the `.zip` files found on the [{% data variables.product.prodname_vscode %} website](https://code.visualstudio.com/#alt-downloads), you can uninstall by deleting the folder where you extracted the `.zip` contents.

## macOS

To uninstall {% data variables.product.prodname_vscode_shortname %} on macOS, open **Finder** and go to **Applications**. Right-click on the {% data variables.product.prodname_vscode %} application and select **Move to Trash**.

## Linux

To uninstall {% data variables.product.prodname_vscode_shortname %} on Linux, you should use your package manager's uninstall or remove option. The exact command line will differ depending on which package manager you used (for example, `apt-get`, `rpn`, `dnf`, `yum`, etc.).

The names for the {% data variables.product.prodname_vscode_shortname %} packages are:

* `code` - {% data variables.product.prodname_vscode_shortname %} Stable release
* `code-insiders` - {% data variables.product.prodname_vscode_shortname %} [Insiders](/insiders) release

For example, if you installed {% data variables.product.prodname_vscode_shortname %} via the Debian package (`.deb`) and `apt-get` package manager, you would run:

```bash
sudo apt-get remove code
```

where `code` is the name of the {% data variables.product.prodname_vscode_shortname %} Debian package.

## Clean uninstall

If you want to remove all user data after uninstalling {% data variables.product.prodname_vscode_shortname %}, you can delete the user data folders `Code`, `.vscode-shared`, and `.vscode`. This will return you to the state before you installed {% data variables.product.prodname_vscode_shortname %}. This can also be used to reset all settings if you don't want to uninstall {% data variables.product.prodname_vscode_shortname %}.

The folder locations will vary depending on your platform:

* **Windows** - Delete `%APPDATA%\Code`, `%USERPROFILE%.vscode-shared`, and `%USERPROFILE%\.vscode`.
* **macOS** - Delete `$HOME/Library/Application Support/Code`, `~/.vscode-shared`, and `~/.vscode`.
* **Linux** - Delete `$HOME/.config/Code`, `~/.vscode-shared`, and `~/.vscode`.

## Next steps

* [Setup overview](/docs/getstarted/overview.md) - General information about {% data variables.product.prodname_vscode_shortname %} setup and updates.
* [Windows setup](/docs/setup/windows.md) - Details and common questions about installing {% data variables.product.prodname_vscode_shortname %} on Windows.
* [macOS setup](/docs/setup/mac.md) - {% data variables.product.prodname_vscode_shortname %} is available for both Intel and Apple silicon macOS machines.
* [Linux setup](/docs/setup/linux.md) - Learn about the different {% data variables.product.prodname_vscode_shortname %} packages available for Linux.
