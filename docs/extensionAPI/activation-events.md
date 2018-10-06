---
Order: 6
Area: extensionapi
TOCTitle: Activation Events
ContentId: C83BB647-A37E-45CE-BA4C-837B397C2ABE
PageTitle: Visual Studio Code Activation Events - package.json
DateApproved: 10/4/2018
MetaDescription: To support lazy activation of Visual Studio Code extensions (plug-ins), your extension controls when it should be loaded through a set of activation events in the package.json extension manifest file.
---
# Activation Events - package.json

Extensions are activated lazily in VS Code.  As a result, you need to provide VS Code with context as to when your extension should be activated.  We support the following activation events:

* [`onLanguage:${language}`](/docs/extensionAPI/activation-events.md#activationeventsonlanguage)
* [`onCommand:${command}`](/docs/extensionAPI/activation-events.md#activationeventsoncommand)
* [`onDebug`](/docs/extensionAPI/activation-events.md#activationeventsondebug)
* [`workspaceContains:${toplevelfilename}`](/docs/extensionAPI/activation-events.md#activationeventsworkspacecontains)
* [`onFileSystem:${scheme}`](/docs/extensionAPI/activation-events.md#activationeventsonfilesystem)
* [`onView:${viewId}`](/docs/extensionAPI/activation-events.md#activationeventsonview)
* [`onUri`](/docs/extensionAPI/activation-events.md#activationeventsonuri)
* [`*`](/docs/extensionAPI/activation-events.md#activationevents)

We also provide an overview of the [`package.json` extension manifest](/docs/extensionAPI/extension-manifest.md) and the minimum required fields.

## activationEvents.onLanguage

This activation event is emitted and interested extensions will be activated whenever a file that resolves to a certain language gets opened.

```json
...
"activationEvents": [
    "onLanguage:python"
]
...
```

The `onLanguage` event takes a [language identifier](/docs/languages/identifiers.md) value.

Multiple languages can be declared with separate `onLanguage` entries in the `activationEvents` array.

```json
"activationEvents": [
    "onLanguage:json",
    "onLanguage:markdown",
    "onLanguage:typescript"
]
...
```

## activationEvents.onCommand

This activation event is emitted and interested extensions will be activated whenever a command is being invoked:

```json
...
"activationEvents": [
    "onCommand:extension.sayHello"
]
...
```

## activationEvents.onDebug

This activation event is emitted and interested extensions will be activated before a debug session is started:

```json
...
"activationEvents": [
    "onDebug"
]
...
```

### onDebugInitialConfigurations and onDebugResolve

There are two more fine-grained `onDebug` activation events:

* `onDebugInitialConfigurations` is fired just before the `provideDebugConfigurations` method of the `DebugConfigurationProvider` is called.
* `onDebugResolve:type` is fired just before the `resolveDebugConfiguration` method of the `DebugConfigurationProvider` for the specified type is called.

**Rule of thumb:** If activation of a debug extensions is lightweight, use `onDebug`. If it is heavyweight, use `onDebugInitialConfigurations` and/or `onDebugResolve` depending on whether the `DebugConfigurationProvider` implements the corresponding methods `provideDebugConfigurations` and/or `resolveDebugConfiguration`. See [Debug Type specific Hooks](/docs/extensionAPI/api-debugging.md#debug-type-specific-hooks) for more details on these methods.

## activationEvents.workspaceContains

This activation event is emitted and interested extensions will be activated whenever a folder is opened and the folder contains at least one file that matches a glob pattern.

```json
...
"activationEvents": [
    "workspaceContains:**/.editorconfig"
]
...
```

## activationEvents.onFileSystem

This activation event is emitted and interested extensions will be activated whenever a file or folder from a specific *scheme* is read. This is usually the `file`-scheme, but with custom file system providers more schemes come into place, e.g `ftp` or `ssh`.

```json
...
"activationEvents": [
    "onFileSystem:sftp"
]
...
```

## activationEvents.onView

This activation event is emitted and interested extensions will be activated whenever a view of the specified id is expanded:

```json
...
"activationEvents": [
    "onView:nodeDependencies"
]
...
```

## activationEvents.onUri

This activation event is emitted and interested extensions will be activated whenever a system-wide Uri for that extension is opened. The Uri scheme is fixed to either `vscode` or `vscode-insiders`. The Uri authority must be the extension's identifier. The rest of the Uri is arbitrary.

```json
...
"activationEvents": [
    "onUri"
]
...
```

If the `vscode.git` extension defines `onUri` as an activation event, it will be activated in any of the following Uris are open:

- `vscode://vscode.git/init`
- `vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2FMicrosoft%2Fvscode-vsce.git`
- `vscode-insiders://vscode.git/init` (for VS Code Insiders)

## activationEvents.*

This activation event is emitted and interested extensions will be activated whenever VS Code starts up. To ensure a great end user experience, please use this activation event in your extension only when no other activation events combination works in your use-case.

```json
...
"activationEvents": [
    "*"
]
...
```

> **Note:** An extension can listen to multiple activation events, and that is preferable to listening to `"*"`.

> **Note:** An extension **must** export an `activate()` function from its main module and it will be invoked **only once** by VS Code when any of the specified activation events is emitted. Also, an extension **should** export a `deactivate()` function from its main module to perform cleanup tasks on VS Code shutdown. Extension **must** return a Promise from `deactivate()` if the cleanup process is asynchronous. An extension may return `undefined` from `deactivate()` if the cleanup runs synchronously.

## Next Steps

To learn more about VS Code extensibility model, try these topic:

* [Extension Manifest File](/docs/extensionAPI/extension-manifest.md) - VS Code package.json extension manifest file reference
* [Contribution Points](/docs/extensionAPI/extension-points.md) - VS Code contribution points reference
