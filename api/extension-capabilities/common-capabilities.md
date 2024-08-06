---
# DO NOT TOUCH — Managed by doc writer
ContentId: 9c48dfbf-e49d-4f33-aadc-5ebf06d5dde0
DateApproved: 08/01/2024

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Common capabilities that Visual Studio Code extensions (plug-ins) can take advantage of
---

# Common Capabilities

Common Capabilities are important building blocks for your extensions. Almost all extensions use some of these functionalities. Here is how you can take advantage of them.

## Command

Command is central to how VS Code works. You open the Command Palette to execute commands, bind custom keybindings to commands, and right-click to invoke commands in Context Menus.

An extension could:

- Register and execute commands with the [`vscode.commands`](/api/references/vscode-api#commands) API.
- Make commands available in the Command Palette with the [`contributes.commands`](/api/references/contribution-points#contributes.commands) Contribution Point.

Learn more about commands at the [Extension Guides / Command](/api/extension-guides/command) topic.

## Configuration

An extension can contribute extension-specific settings with the [`contributes.configuration`](/api/references/contribution-points#contributes.configuration) Contribution Point and read them using the [`workspace.getConfiguration`](/api/references/vscode-api#workspace.getConfiguration) API.

## Keybinding

An extension can add custom keybindings. Read more in the [`contributes.keybindings`](/api/references/contribution-points#contributes.keybindings) and [Key Bindings](/docs/getstarted/keybindings) topics.

## Context Menu

An extension can register custom Context Menu items that will be displayed in different parts of the VS Code UI on right-click. Read more at the [`contributes.menus`](/api/references/contribution-points#contributes.menus) Contribution Point.

## Data Storage

There are four options for storing data:

- [`ExtensionContext.workspaceState`](/api/references/vscode-api#ExtensionContext.workspaceState): A workspace storage where you can write key/value pairs. VS Code manages the storage and will restore it when the same workspace is opened again.
- [`ExtensionContext.globalState`](/api/references/vscode-api#ExtensionContext.globalState): A global storage where you can write key/value pairs. VS Code manages the storage and will restore it for each extension activation. You can selectively synchronize key/value pairs in global storage by setting the keys for sync using `setKeysForSync` method on `globalState`.
- [`ExtensionContext.storageUri`](/api/references/vscode-api#ExtensionContext.storageUri): A workspace specific storage URI pointing to a local directory where your extension has read/write access. This is a good option if you need to store large files that are accessible only from the current workspace.
- [`ExtensionContext.globalStorageUri`](/api/references/vscode-api#ExtensionContext.globalStorageUri): A global storage URI pointing to a local directory where your extension has read/write access. This is a good option if you need to store large files that are accessible from all workspaces.

The extension context is available to the `activate` function in the [Extension Entry File](/api/get-started/extension-anatomy#extension-entry-file).

### setKeysForSync example

If your extension needs to preserve some user state across different machines then provide the state to [Setting Sync](/docs/editor/settings-sync) using `vscode.ExtensionContext.globalState.setKeysForSync`.

You can use the following pattern:

```TypeScript
// on activate
const versionKey = 'shown.version';
context.globalState.setKeysForSync([versionKey]);

// later on show page
const currentVersion = context.extension.packageJSON.version;
const lastVersionShown = context.globalState.get(versionKey);
if (isHigher(currentVersion, lastVersionShown)) {
    context.globalState.update(versionKey, currentVersion);
}
```

Sharing state across machines can help avoid the problem of users seeing multiple instances of a welcome or update page, by sharing dismissed or viewed flags.

## Display Notifications

Almost all extensions need to present information to the user at some point. VS Code offers three APIs for displaying notification messages of different severity:

- [`window.showInformationMessage`](/api/references/vscode-api#window.showInformationMessage)
- [`window.showWarningMessage`](/api/references/vscode-api#window.showWarningMessage)
- [`window.showErrorMessage`](/api/references/vscode-api#window.showErrorMessage)

## Quick Pick

With the [`vscode.QuickPick`](/api/references/vscode-api#QuickPick) API, you can easily collect user input or let the user make a selection from multiple options. The [QuickInput sample](https://github.com/microsoft/vscode-extension-samples/tree/main/quickinput-sample) illustrates the API.

## File Picker

Extensions can use the [`window.showOpenDialog`](/api/references/vscode-api#window.showOpenDialog) API to open the system file picker and select files or folders.

## Output Channel

The Output Panel displays a collection of [`OutputChannel`](/api/references/vscode-api#OutputChannel), which are great for logging purpose. You can easily take advantage of it with the [`window.createOutputChannel`](/api/references/vscode-api#window.createOutputChannel) API.

## Progress API

You can use the [`vscode.Progress`](/api/references/vscode-api#Progress) API for reporting progress updates to the user.

Progress can be shown in different locations using the [`ProgressLocation`](/api/references/vscode-api#ProgressLocation) option:

- In the Notifications area
- In the Source Control view
- General progress in the VS Code window

The [Progress sample](https://github.com/microsoft/vscode-extension-samples/tree/main/progress-sample) illustrates this API.
