---
Order: 14
Area: editor
TOCTitle: Portable Mode
ContentId: A5C839C4-67E9-449C-94B8-4B310FCAAB1B
PageTitle: Portable Mode in Visual Studio Code
DateApproved: never
MetaDescription: Visual Studio Code supports a Portable Mode.
---

# Portable Mode

Visual Studio Code supports [Portable Mode](https://en.wikipedia.org/wiki/Portable_application). This mode enables all data created and maintained by VS Code to live near itself, so it can be placed in a USB drive to code on the go.

Portable Mode is supported on the ZIP download for Windows and Linux, as well as the regular App download for macOS.

## Enable Portable Mode

Enabling Portable Mode is as simple as creating a folder in which all the portable data will be placed. By default, the folder name is `code-portable-data` and it should be placed next to VS Code itself.

On **Windows** and **Linux**, after unzipping the VS Code download, you'll end up with a folder name similar to `VSCode-win32-x64-1.25.0-insider`, in which `Code.exe` or the `code` executable is inside. Simply create a sibling `code-portable-data` empty folder:

```
|- VSCode-win32-x64-1.25.0-insider
|   |- Code.exe (or code executable)
|   |- ...
|- code-portable-data
```

From then on, that folder will be used to contain all Code data, including session state, preferences, extensions, etc.

On **macOS**, you need to place that folder as a sibling of the app itself:

```
|- Visual Studio Code.app
|- code-portable-data
```

## TMP Directory

By default, the default TMP directory is still the system-wide one even Portable Mode, since no state is kept there. If you wish to also have your TMP directory within your portable directory, simply create an empty `tmp` directory inside `code-portable-data`. As long as a `tmp` directory exists, it will be used for TMP data.

## VS Code Insiders

VS Code Insiders requires the folder to be named differently: `code-insiders-portable-data`.

## Next Steps

- ???