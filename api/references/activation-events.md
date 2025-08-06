---
# DO NOT TOUCH — Managed by doc writer
ContentId: C83BB647-A37E-45CE-BA4C-837B397C2ABE
DateApproved: 08/07/2025

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: To support lazy activation of Visual Studio Code extensions (plug-ins), your extension controls when it should be loaded through a set of Activation Events.
---

# Activation Events

**Activation Events** is a set of JSON declarations that you make in the `activationEvents` field of `package.json` [Extension Manifest](/api/references/extension-manifest). Your extension becomes activated when the **Activation Event** happens. Here is a list of all available **Activation Events**:

- [`onAuthenticationRequest`](/api/references/activation-events#onAuthenticationRequest)
- [`onChatParticipant`](/api/references/activation-events#onChatParticipant)
- [`onCommand`](/api/references/activation-events#onCommand)
- [`onCustomEditor`](/api/references/activation-events#onCustomEditor)
- [`onDebug`](/api/references/activation-events#onDebug)
  - [`onDebugAdapterProtocolTracker`](/api/references/activation-events#onDebugAdapterProtocolTracker)
  - [`onDebugDynamicConfigurations`](/api/references/activation-events#onDebugDynamicConfigurations)
  - [`onDebugInitialConfigurations`](/api/references/activation-events#onDebugInitialConfigurations)
  - [`onDebugResolve`](/api/references/activation-events#onDebugResolve)
- [`onEditSession`](/api/references/activation-events#onEditSession)
- [`onFileSystem`](/api/references/activation-events#onFileSystem)
- [`onIssueReporterOpened`](/api/references/activation-events#onIssueReporterOpened)
- [`onLanguage`](/api/references/activation-events#onLanguage)
- [`onLanguageModelTool`](/api/references/activation-events#onLanguageModelTool)
- [`onNotebook`](/api/references/activation-events#onNotebook)
- [`onOpenExternalUri`](/api/references/activation-events#onOpenExternalUri)
- [`onRenderer`](/api/references/activation-events#onRenderer)
- [`onSearch`](/api/references/activation-events#onSearch)
- [`onStartupFinished`](/api/references/activation-events#onStartupFinished)
- [`onTaskType`](/api/references/activation-events#onTaskType)
- [`onTerminal`](/api/references/activation-events.md#onTerminal)
    - [`onTerminalProfile`](/api/references/activation-events#onTerminalProfile)
    - [`onTerminalShellIntegration`](/api/references/activation-events.md#onTerminalShellIntegration)
- [`onUri`](/api/references/activation-events#onUri)
- [`onView`](/api/references/activation-events#onView)
- [`onWalkthrough`](/api/references/activation-events#onWalkthrough)
- [`onWebviewPanel`](/api/references/activation-events#onWebviewPanel)
- [`workspaceContains`](/api/references/activation-events#workspaceContains)
- [`*`](/api/references/activation-events#Start-up)

We also provide a reference of all fields in the [`package.json` extension manifest](/api/references/extension-manifest).

## onLanguage

This activation event is emitted and interested extensions will be activated whenever a file that resolves to a certain language gets opened.

```json
"activationEvents": [
    "onLanguage:python"
]
```

The `onLanguage` event takes a [language identifier](/docs/languages/identifiers) value.

Multiple languages can be declared with separate `onLanguage` entries in the `activationEvents` array.

```json
"activationEvents": [
    "onLanguage:json",
    "onLanguage:markdown",
    "onLanguage:typescript"
]
```

> **Note**: Beginning with VS Code 1.74.0, languages contributed by your extension do not require a corresponding `onLanguage` activation event declaration for your extension to be activated.

Additionally, if your extension needs to be activated before any language is used, you can use the generic `onLanguage` activation event to ensure this:

```json
"activationEvents": [
    "onLanguage"
]
```

> **Note**: It is best practice to activate only when a user needs your extension. If your extension works on a subset of languages, it is better for the user to list that subset than to activate on all languages.

## onCommand

This activation event is emitted and interested extensions will be activated whenever a command is being invoked:

```json
"activationEvents": [
    "onCommand:extension.sayHello"
]
```

> **Note**: Beginning with VS Code 1.74.0, commands contributed by your extension do not require a corresponding `onCommand` activation event declaration for your extension to be activated.

## onDebug

This activation event is emitted and interested extensions will be activated before a debug session is started:

```json
"activationEvents": [
    "onDebug"
]
```

These are four more fine-grained `onDebug` activation events:

### onDebugAdapterProtocolTracker

`onDebugAdapterProtocolTracker` is emitted whenever a debug session with the specific type is about to be launched and a debug protocol tracker might be needed.

### onDebugDynamicConfigurations

This activation event is emitted just before the `provideDebugConfigurations` method of the `DebugConfigurationProvider` is called to provide dynamic debug configurations when the user asks for them, such as through the UI via the "Select and Start Debugging" command.

The presence of this activation event is used as a signal that the extension contributes dynamic debug configurations.

### onDebugInitialConfigurations

This activation event is emitted just before the `provideDebugConfigurations` method of the `DebugConfigurationProvider` is called to provide initial debug configurations, such as whenever a `launch.json` needs to be created.

### onDebugResolve

`onDebugResolve:type` is fired just before the `resolveDebugConfiguration` method of the `DebugConfigurationProvider` for the specified type is called.

**Rule of thumb:** If activation of a debug extension is lightweight, use `onDebug`. If it is heavyweight, use `onDebugInitialConfigurations` and/or `onDebugResolve` depending on whether the `DebugConfigurationProvider` implements the corresponding methods `provideDebugConfigurations` and/or `resolveDebugConfiguration`. See [Using a DebugConfigurationProvider](/api/extension-guides/debugger-extension#using-a-debugconfigurationprovider) for more details on these methods.

## workspaceContains

`workspaceContains:path` is emitted and interested extensions will be activated whenever a folder is opened and the folder contains at least one file that matches a [glob pattern](/docs/editor/glob-patterns).

```json
"activationEvents": [
    "workspaceContains:**/.editorconfig"
]
```

## onFileSystem

`onFileSystem:scheme` is emitted and interested extensions will be activated whenever a file or folder from a specific _scheme_ is read. This is usually the `file`-scheme, but with custom file system providers more schemes come into place, e.g `ftp` or `ssh`.

```json
"activationEvents": [
    "onFileSystem:sftp"
]
```

## onView

This activation event is emitted and interested extensions will be activated whenever a view of the specified id is expanded in the VS Code sidebar. Built-in views do not emit an activation event.

The activation event below will fire whenever a view with the `nodeDependencies` id is visible:

```json
"activationEvents": [
    "onView:nodeDependencies"
]
```

> **Note**: Beginning with VS Code 1.74.0, views contributed by your extension do not require a corresponding `onView` activation event declaration for your extension to be activated.

## onUri

This activation event is emitted and interested extensions will be activated whenever a system-wide Uri for that extension is opened. The Uri scheme is fixed to either `vscode` or `vscode-insiders`. The Uri authority must be the extension's identifier. The rest of the Uri is arbitrary.

```json
"activationEvents": [
    "onUri"
]
```

If the `vscode.git` extension defines `onUri` as an activation event, it will be activated in any of the following Uris are open:

- `vscode://vscode.git/init`
- `vscode://vscode.git/clone?url=https%3A%2F%2Fgithub.com%2FMicrosoft%2Fvscode-vsce.git`
- `vscode-insiders://vscode.git/init` (for VS Code Insiders)

## onWebviewPanel

This activation event is emitted and interested extensions will be activated whenever VS Code needs to restore a [webview](/api/extension-guides/webview) with the matching `viewType`.

For example, the declaration of `onWebviewPanel` below:

```json
"activationEvents": [
    "onWebviewPanel:catCoding"
]
```

will cause the extension to be activated when VS Code needs to restore a webview with the viewType: `catCoding`. The viewType is set in the call to `window.createWebviewPanel` and you will need to have another activation event (for example, onCommand) to initially activate your extension and create the webview.

## onCustomEditor

This activation event is emitted and interested extensions will be activated whenever VS Code needs to create a [custom editor](/api/extension-guides/custom-editors) with the matching `viewType`.

For example, the declaration of `onCustomEditor` below:

```json
"activationEvents": [
    "onCustomEditor:catCustoms.pawDraw"
]
```

will cause the extension to be activated when VS Code needs to restore a custom editor with the viewType: `catCustoms.pawDraw`. The viewType is set in the [`customEditors` contribution point](/api/extension-guides/custom-editors#contribution-point) and bound to a provider with `registerCustomEditorProvider`.

> **Note**: Beginning with VS Code 1.74.0, custom editors contributed by your extension do not require a corresponding `onCustomEditor` activation event declaration for your extension to be activated.

## onAuthenticationRequest

This activation event is emitted and interested extensions will be activated whenever an extension requests an authentication session (via the `authentication.getSession()` API) with the matching `providerId`.

For example, the declaration of `onAuthenticationRequest` below:

```json
"activationEvents": [
    "onAuthenticationRequest:github"
]
```

will cause the extension to be activated when VS Code needs retrieve an `AuthenticationSession` of type `github`.

> **Note**: Beginning with VS Code 1.74.0, authentication providers contributed by your extension do not require a corresponding `onAuthenticationRequest` activation event declaration for your extension to be activated.

## onStartupFinished

This activation event is emitted and interested extensions will be activated **some time after** VS Code starts up. This is similar to the `*` activation event, but it will not slow down VS Code startup. Currently, this event is emitted after all the `*` activated extensions have finished activating.

```json
"activationEvents": [
    "onStartupFinished"
]
```

## onTaskType

`onTaskType:type` is emitted emitted whenever tasks of a certain type need to be listed or resolved.

```json
"activationEvents": [
    "onTaskType":"npm"
]
```

> **Note**: Beginning with VS Code 1.76.0, tasks contributed by your extension do not require a corresponding `onTaskType` activation event declaration for your extension to be activated.

## onEditSession

`onEditSession:scheme` is emitted when an edit session is accessed with the given scheme.

```json
"activationEvents": [
    "onEditSession:file"
]
```

## onSearch

`onSearch:scheme` is emitted when a search is started in the folder with the given scheme.

```json
"activationEvents": [
    "onSearch:file"
]
```

## onOpenExternalUri

An activation event emitted whenever an external URI, such as an http or https link, is being opened.

```json
"activationEvents": [
    "onOpenExternalUri"
]
```

## onNotebook

`onNotebook:type` is emitted when the specified notebook document type is opened.

```json
"activationEvents": [
    "onNotebook:jupyter-notebook",
    "onNotebook:interactive"
]
```

## onRenderer

`onRenderer:id` is emitted when a notebook output renderer is used.

```json
"activationEvents": [
    "onRenderer:ms-toolsai.jupyter-renderers"
]
```

## onTerminal

`onTerminal:shellType` is emitted when a specific terminal with the given shell type is opened.

```json
"activationEvents": [
  "onTerminal:bash"
]
```

## onTerminalProfile

`onTerminalProfile:id` is emitted when a specific terminal profile is launched.

```json
"activationEvents": [
    "onTerminalProfile:terminalTest.terminal-profile"
]
```

## onTerminalShellIntegration

`onTerminalShellIntegration:shellType` is emitted when a terminal with the given shell type has shell integration activated.

```json
"activationEvents": [
    "onTerminalShellIntegration:bash"
]
```

## onWalkthrough

`onWalkthrough:id` is emitted when a specified walkthrough is opened.

```json
"activationEvents": [
    "onWalkthrough:nodejsWelcome"
]
```

## onIssueReporterOpened

This activation event is emitted when the issue reporter is opened (for example, by using **Help: Report Issue**).

```json
"activationEvents": [
    "onIssueReporterOpened"
]
```

## onChatParticipant

An activation event emitted when the specified chat participant is invoked.

```json
"activationEvents": [
    "onChatParticipant:my-chat-participant"
]
```

## onLanguageModelTool

An activation event emitted when the specified language model tool is invoked.

```json
"activationEvents": [
    "onChatParticipant:my-language-model-tool"
]
```

## Start up

The `*` activation event is emitted and interested extensions will be activated whenever VS Code starts up.

> **Note:** To ensure a great user experience, please use this activation event in your extension only when no other activation events combination works in your use-case.

```json
"activationEvents": [
    "*"
]
```

> **Note:** An extension can listen to multiple activation events, and that is preferable to listening to `"*"`.

> **Note:** An extension **must** export an `activate()` function from its main module and it will be invoked **only once** by VS Code when any of the specified activation events is emitted. Also, an extension **should** export a `deactivate()` function from its main module to perform cleanup tasks on VS Code shutdown. Extension **must** return a Promise from `deactivate()` if the cleanup process is asynchronous. An extension may return `undefined` from `deactivate()` if the cleanup runs synchronously.
