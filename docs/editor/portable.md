---
Order:
Area: editor
TOCTitle: Portable Mode
ContentId: A5C839C4-67E9-449C-94B8-4B310FCAAB1B
PageTitle: Portable Mode in Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Visual Studio Code supports a Portable Mode.
---
# Portable Mode

Visual Studio Code supports [Portable mode](https://en.wikipedia.org/wiki/Portable_application). This mode enables all data created and maintained by VS Code to live near itself, so it can be moved around across environments.

This mode also provides a way to set the installation folder location for VS Code extensions, useful for corporate environments that prevent extensions from being installed in the Windows AppData folder.

Portable mode is supported on the ZIP download for Windows, and the TAR.GZ download for Linux, as well as the regular Application download for macOS. See the [Download page](/download) to find the correct `.zip / .tar.gz` file for your platform.

> **Note:** Do not attempt to configure portable mode on an installation from the **Windows User or System installers**. Portable mode is only supported on the Windows ZIP (`.zip`) archive. Note as well that the Windows ZIP archive does not support auto update.

## Enable Portable mode

### Windows, Linux

After unzipping the VS Code download, create a `data` folder within VS Code's folder:

```
|- VSCode-win32-x64-1.84.2
|   |- Code.exe (or code executable)
|   |- data
|   |- bin
|   |  |- code
|   |  |- ...
|   |- ...
```

From then on, the `data` folder will be used to contain all VS Code data, including session state, preferences, extensions, etc.

>**Note**: The `data` folder will override the `--user-data-dir` and `--extensions-dir` [command line](/docs/editor/command-line.md#advanced-cli-options) options.

The `data` folder can be moved to other VS Code installations. This is useful for updating your portable VS Code version, in which case you can move the `data` folder to a newer extracted version of VS Code.

### macOS

On **macOS**, you need to place the data folder as a sibling of the application itself. Since the folder will be alongside the application, you need to name it specifically so that VS Code can find it. The default folder name is `code-portable-data`:

```
|- Visual Studio Code.app
|- code-portable-data
```

Portable Mode won't work if your application is in [quarantine](https://apple.stackexchange.com/a/104875), which happens by default if you just downloaded VS Code. Make sure you remove the quarantine attribute, if Portable Mode doesn't seem to work:

```bash
xattr -dr com.apple.quarantine Visual\ Studio\ Code.app
```

**Note:** On Insiders, the folder should be named `code-insiders-portable-data`.

## Update Portable VS Code

On **Windows** and **Linux**, you can update VS Code by copying the `data` folder over to a more recent version of VS Code.

On **macOS**, automatic updates should work as always, no extra work needed.

## Migrate to Portable mode

You can also migrate an existing installation to Portable mode.

### Windows, Linux

1. Download the [VS Code](/download) (or [VS Code Insiders](/insiders)) ZIP distribution for your platform.
2. Create the `data` folder as above.
3. Copy the user data directory `Code` to `data` and rename it to `user-data`:
    * **Windows** `%APPDATA%\Code`
    * **Linux** `$HOME/.config/Code`
4. Copy the extensions directory to `data`:
    * **Windows** `%USERPROFILE%\.vscode\extensions`
    * **Linux** `~/.vscode/extensions`

As an example, here's the desired outcome on **Windows**:

```
|- VSCode-win32-x64-1.84.2
|   |- Code.exe (or code executable)
|   |- data
|   |   |- user-data
|   |   |   |- ...
|   |   |- extensions
|   |   |   |- ...
|   |- ...
```

### macOS

1. Download [VS Code](/download) (or [VS Code Insiders](/insiders)) for macOS.
2. Create the `code-portable-data` folder as above.
3. Copy the user data directory `Code` to `code-portable-data` and rename it to `user-data`:
    * `$HOME/Library/Application Support/Code`
4. Copy the extensions directory to `code-portable-data`:
    * `~/.vscode/extensions`

## TMP directory

By default, the default `TMP` directory is still the system one even in Portable Mode, since no state is kept there. If you want to also have your TMP directory within your portable directory, you can create an empty `tmp` directory inside the `data` folder. As long as a `tmp` directory exists, it will be used for TMP data.
