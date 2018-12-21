---
# DO NOT TOUCH — Managed by doc writer
ContentId: C83BB647-A37E-45CE-BA4C-837B397C2ABE
DateApproved: 12/6/2018

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: To support lazy activation of Visual Studio Code extensions (plug-ins), your extension controls when it should be loaded through a set of Activation Events.
---

# Activation Events

**Activation Events** is a set of JSON declarations that you make in the `activationEvents` field of `package.json` [Extension Manifest](/api/references/extension-manifest). Your extension becomes activated when the **Activation Event** happens. Here is a list of all available **Activation Events**:

* [`onLanguage:${language}`](/api/references/activation-events#activationeventsonlanguage)
* [`onCommand:${command}`](/api/references/activation-events#activationeventsoncommand)
* [`onDebug`](/api/references/activation-events#activationeventsondebug)
* [`workspaceContains:${toplevelfilename}`](/api/references/activation-events#activationeventsworkspacecontains)
* [`onFileSystem:${scheme}`](/api/references/activation-events#activationeventsonfilesystem)
* [`onView:${viewId}`](/api/references/activation-events#activationeventsonview)
* [`onUri`](/api/references/activation-events#activationeventsonuri)
* [`onWebviewPanel:${viewType}`](/api/references/activation-events#activationeventsonwebviewpanel)
* [`*`](/api/references/activation-events#activationevents)

We also provide an reference of all fields in the [`package.json` extension manifest](/api/references/extension-manifest).

## activationEvents.onLanguage

This activation event is emitted and interested extensions will be activated whenever a file that resolves to a certain language gets opened.

```json
...
"activationEvents": [
    "onLanguage:python"
]
...
```

The `onLanguage` event takes a [language identifier](/docs/languages/identifiers) value.

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

**Rule of thumb:** If activation of a debug extension is lightweight, use `onDebug`. If it is heavyweight, use `onDebugInitialConfigurations` and/or `onDebugResolve` depending on whether the `DebugConfigurationProvider` implements the corresponding methods `provideDebugConfigurations` and/or `resolveDebugConfiguration`. See [Debug Type specific Hooks](/docs/extensionAPI/api-debugging.md#debug-type-specific-hooks) for more details on these methods.

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

## activationEvents.onWebviewPanel

This activation event is emitted and interested extensions will be activated whenever VS Code needs to restore a webview with the matching `viewType`.

For example, the declaration of onWebviewPanel below:

```json
"activationEvents": [
    ...,
    "onWebviewPanel:catCoding"
]
```

will cause the extension to be activated when VS Code needs to restore a webview with the viewType: `catCoding`. The viewType is set in the call to `window.createWebviewPanel` and you will need to have another activation event (for example, onCommand) to initially activate your extension and create the webview.

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

## Next steps

To learn more about VS Code extensibility model, try these topic:

* [Extension Manifest File](/docs/extensionAPI/extension-manifest) - VS Code package.json extension manifest file reference
* [Contribution Points](/docs/extensionAPI/extension-points) - VS Code contribution points reference
