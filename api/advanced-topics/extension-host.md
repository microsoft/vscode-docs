---
# DO NOT TOUCH — Managed by doc writer
ContentId: 106AA11C-DB26-493A-9E3C-16F513B2AEC8
DateApproved: 8/5/2021

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: The Visual Studio Code Extension Host is responsible for managing extensions and ensuring the stability and performance of Visual Studio Code.
---

# Extension Host

The **Extension Host** is responsible for running extensions.

When running VS Code for Windows, Mac and Linux there's normally a single extension host running on the local machine. It runs along the user interface and the location of the workspace.

With [remote development](/api/advanced-topics/remote-extensions), multiple extension hosts are run:
 * A the remote site, in the VS Code Server, running extensions in the remote environment along with the remote workspace.
 * On the local machine along with the user interface.

We call the extension host that runs with the workspace the 'workspace extension host', running 'workspace extensions', and the extension host that runs with the UI the 'UI extension host', running 'UI extensions'.

When VS Code [runs in the browser](/api/extension-guides/web-extensions.md), a 'web extension host' host runs in the browser, running 'web extensions'.

- **UI Extensions**: These extensions contribute to the VS Code user interface and are always run on the user's local machine. UI Extensions cannot directly access files in the remote workspace, or run scripts/tools installed in that workspace or on the machine. Example UI Extensions include: themes, snippets, language grammars, and keymaps.

- **Workspace Extensions**: These extensions are run on the same machine as where the workspace is located. When in a local workspace, Workspace Extensions run on the local machine. When in a remote workspace or when using Codespaces, Workspace Extensions run on the remote machine / environment. Workspace Extensions can access files in the workspace to provide rich, multi-file language services, debugger support, or perform complex operations on multiple files in the workspace (either directly or by invoking scripts/tools). While Workspace Extensions do not focus on modifying the UI, they can contribute explorers, views, and other UI elements as well.

- **Web Extensions**: These extensions run in a extension host in the browser. They are restricted by the browser sandbox and therefore have [limitations](/api/extension-guides/web-extensions.md#web-extension-main-file) compared to normal extensions.


When VS Code starts, it decides, based on the workspace location and the installed extensions, which extension hosts are needed.

For each installed extension, VS Code automatically activates it at the location based on its kind. If an extension can run as either kind, VS Code will attempt to choose the optimal one for the situation.

The **Developer: Show Running Extensions** command shows a list of activated extension and the location where it is run.


## Extension Kinds

Whether an extension can run as `ui`, `workspace` and `web` extension is defined in the [package.json manifest](https://code.visualstudio.com/api/references/extension-manifest) by the `extensionKind` property, the main entry file (`main` and/or `browser`) as well the contributions in `contributes` property.


`extensionKind` is an array and defines the supported locations as well as the preference order in the case that there are multiple compatible extension hosts running.

```
{
  "extensionKind": ["ui", "workspace"]
}
```

If `extensionKind` is not defined, it is computed by VS Code by looking it at the manifests main entry file(s) and the extensions contributions.


Following combination of locations are supported:

- `"extensionKind": ["workspace"]` — Indicates the extension requires access to workspace contents and therefore will run where the workspace is located. That can be on the local machine or or on the remote machine or codespace. Most extensions fall into this category.
- `"extensionKind": ["ui", "workspace"]` — Indicates the extension **prefers** to run as a UI extension, but does not have any hard requirements on local assets, devices, or capabilities. When using VS Code, the extension will run in VS Code's local extension host if it exists locally and means the user does not have to install the extension on the remote. Otherwise, the extension will run in VS Code's workspace extension host if it exists there. When using the Codespaces browser-based editor, it will run in the remote extension host always (as no local extension host is available). The old  `"ui"`  value (as a string) maps to this type for backwards compatibility, but is considered deprecated.
- `"extensionKind": ["workspace", "ui"]` — Indicates the extension **prefers** to run as a workspace extension, but does not have any hard requirements on accessing workspace contents. When using VS Code, the extension will run in VS Code's workspace extension host if it exists in remote workspace, otherwise will run in VS Code's local extension host if it exists locally. When using the Codespaces browser-based editor, it will run in the remote extension host always (as no local extension host is available).
- `"extensionKind": ["ui"]` — Indicates the extension **must** run as a UI extension because it requires access to local assets, devices, or capabilities. Therefore, it can only run in VS Code's local extension host and will not work in the Codespaces browser-based editor (as there is no local extension host available). **Note** Do not use this `extensionKind` if you want the extension to be used without having to install it on the remote, to support this case, use `"extensionKind": ["ui", "workspace"]`.

- `web` is always optional. It is automatically added to the end of the list based on the [Web Extension Enablement](/api/extension-guides/web-extensions.md#web-extension-enablement) rules. The manual addition of `web` is only necessary to override the enablement rules. In that case always list `ui` first e.g. `[“ui”, “web”]` instead of `[“web”, “ui”`]. That is because VS Code for desktop can skip launching the web worker extension host and avoid spending CPU cycles maintaining the web worker extension host.

**Note:** Prior releases (<  1.40) allowed an extension to specify single location as a string and it is deprecated in favor of multiple location support (array).


## Stability and Performance

VS Code aims to deliver a stable and performant editor to users, and misbehaving extensions should not impact the user experience. The Extension Host in VS Code prevents extensions from:

- Impacting startup performance
- Slowing down UI operations
- Modifying the UI

Additionally, VS Code lets extensions declare their [Activation Events](/api/references/activation-events) and loads them lazily. For example, the Markdown extension should only be loaded when a user opens a Markdown file. This makes sure that extensions do not consume unnecessary CPU and memory.
