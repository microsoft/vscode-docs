---
---

# Common Capabilities

Common Capabilities are important building blocks for your extensions. Almost all extensions use some of these functionalities. Here is how you can take advantage of them.

## Command

Command is central to how VS Code works. You open Command Palette to exectue commands, bind custom keybindings to commands and right click to invoke commands in Context Menus. An extension could

- Register and execute commands with the [`vscode.commands`](/api/references/vscode-api#commands) API
- Make commands available in the Command Palette with the [`contributes.commands`](/api/references/contribution-points#contributes.commands) Contribution Point.

Learn more about commands at the [Extension Guides / Command](/api/extension-guides/command) topic.

## Configuration

Each extension can contribute extension-specific settings with [`contributes.configuration`](/api/references/contribution-points#contributes.configuration) and read it using [`workspace.getConfiguration`](/api/references/vscode-api#workspace.getConfiguration).

## Keybinding

Each extension can add custom keybindings. Read more in the [`contributes.keybindings`](/api/references/contribution-points#contributes.keybindings) and [Key Bindings](https://code.visualstudio.com/docs/getstarted/keybindings) topics.

## Context Menu

Your extension can register custom Context Menu items that will be displayed in different parts of VS Code UI on right click. Read more at the [`contributes.menus`](/api/references/contribution-points#contributes.menus) Contribution Point.

## Data Storage

If you need to store data for your extension, there are three options:

- [`ExtensionContext.workspaceState`](/api/references/vscode-api#ExtensionContext.workspaceState): A workspace storage where you can write key/value pairs to. VS Code manages the storage and will restore it when the same workspace is opened again.
- [`ExtensionContext.globalState`](/api/references/vscode-api#ExtensionContext.globalState): A global storage where you can write key/value pairs to. VS Code manages the storage and will restore it for each extension activation.
- [`ExtensionContext.storagePath`](/api/references/vscode-api#ExtensionContext.storagePath): A path pointing to a local directory where your extension has write/read access. This is a good option if you need to store large files.

The extension context is availble to the `activate` function in the [Extension Entry File](/api/get-started/extension-anatomy#extension-entry-file).

## Display Information Messages

Almost all extensions need to display information messages at some point. VS Code offers three API for displaying messages of different severity:

- [window.showInformationMessage](/api/references/vscode-api#window.showInformationMessage)
- [window.showWarningMessage](/api/references/vscode-api#window.showWarningMessage)
- [window.showErrorMessage](/api/references/vscode-api#window.showErrorMessage)

## Quick Pick

With the [`vscode.QuickPick`](/api/references/vscode-api#QuickPick) API, you can easily collect user input or let user select one option from multiple ones. The [QuickInput Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/quickinput-sample) illustrates the API.

## File Picker

Extensions can use the [`vscode.window.showOpenDialog`](/api/references/vscode-api#vscode.window.showOpenDialog) API to open the sytem file picker and get a list of picked files / folders.

## Progress API

You can use the [`vscode.Progress`](/api/references/vscode-api#Progress) API for reporting progress updates to the user.

Progress can be shown in different locations using the [`ProgressLocation`](/api/references/vscode-api#ProgressLocation) option:

- In the notifications area
- In the source control view
- General progress in the VS Code window

The [Progress Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/progress-sample) illustrates this API.
