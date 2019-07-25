---
Order:
Area: editor
TOCTitle: Portable Mode
ContentId: A5C839C4-67E9-449C-94B8-4B310FCAAB1B
PageTitle: Portable Mode in Visual Studio Code
DateApproved: 7/3/2019
MetaDescription: Visual Studio Code supports a Portable Mode.
---
# Portable Mode

Visual Studio Code supports [Portable mode](https://en.wikipedia.org/wiki/Portable_application). This mode enables all data created and maintained by VS Code to live near itself, so it can be moved around across environments.

This mode also provides a way to set the installation folder location for VS Code extensions, useful for corporate environments that prevent extensions from being installed in the Windows AppData folder.

Portable mode is supported on the ZIP download for Windows and Linux, as well as the regular Application download for macOS.

> **Note:** Do not attempt to configure portable mode on a **Windows installation**. Portable mode is only supported on the Windows ZIP archive. Note as well that the Windows ZIP archive does not support auto update.

## Enable Portable mode

### Windows, Linux

After unzipping the VS Code download, simply create a `data` folder within Code's folder:

```
|- VSCode-win32-x64-1.25.0-insider
|   |- Code.exe (or code executable)
|   |- data
|   |- ...
```

From then on, that folder will be used to contain all Code data, including session state, preferences, extensions, etc.

The `data` folder can be moved to other VS Code installations. This is useful for updating your portable Code version: simply move the `data` folder to a newer extracted version of VS Code.

### macOS

On **macOS**, you need to place the data folder as a sibling of the application itself. Since the folder will be alongside the application, you need to name it specifically so that Code can find it. The default folder name is `code-portable-data`:


```
|- Visual Studio Code.app
|- code-portable-data
```

Portable Mode won't work if your application is in [quarantine](https://apple.stackexchange.com/a/104875), which happens by default if you just downloaded Code. Make sure you remove the quarantine attribute, if Portable Mode doesn't seem to work:

```bash
xattr -dr com.apple.quarantine Visual\ Studio\ Code.app
```

**Note:** On Insiders, the folder should be named `code-insiders-portable-data`.

## Update Portable VS Code

On **Windows** and **Linux**, you can update VS Code by copying the `data` folder over to a more recent version of VS Code.

On **macOS**, automatic updates should work as always, no extra work needed.

## Migrate to Portable mode

You can also migrate an existing installation to Portable mode:

1. Download the VS Code ZIP distribution for your platform.
2. Create the `data` or `code-portable-data` folder as above.
3. Copy the user data directory to `data` and rename it to `user-data`:
    * **Windows** `%APPDATA%\Code`
    * **macOS** `$HOME/Library/Application Support/Code`
    * **Linux** `$HOME/.config/Code`
4. Copy the extensions directory to `data`:
    * **Windows** `%USERPROFILE%\.vscode\extensions`
    * **macOS** `~/.vscode/extensions`
    * **Linux** `~/.vscode/extensions`

Here's the desired outcome on **Windows**:

```
|- VSCode-win32-x64-1.25.0-insider
|   |- Code.exe (or code executable)
|   |- data
|   |   |- user-data
|   |   |   |- ...
|   |   |- extensions
|   |   |   |- ...
|   |- ...
```

## TMP directory

By default, the default `TMP` directory is still the system one even in Portable Mode, since no state is kept there. If you wish to also have your TMP directory within your portable directory, simply create an empty `tmp` directory inside the `data` folder. As long as a `tmp` directory exists, it will be used for TMP data.
