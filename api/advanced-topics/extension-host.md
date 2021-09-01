---
# DO NOT TOUCH — Managed by doc writer
ContentId: 106AA11C-DB26-493A-9E3C-16F513B2AEC8
DateApproved: 8/5/2021

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: The Visual Studio Code Extension Host is responsible for managing extensions and ensuring the stability and performance of Visual Studio Code.
---

# Extension Host

The **Extension Host** is responsible for running extensions.

Depending on the configuration of VS Code, there are multiple extension hosts running, with different runtimes, at different locations.

 * local – a Node.js extension host running locally, on the same machine as the user interface
 * web – a web extension host running in the browser or locally, on the same machine as the user interface
 * remote – a Node.js extension host running remotely in a container or a remote location


The following table shows which extension hosts are available in the various configurations of VS Code

| Configuration | local extension host  | web extension host | remote extension host |
--- | --- | --- | ---
| VS Code on the desktop | x | x |  |
| VS Code with remote (container, ssh, codespace) | x | x | x |
| VS Code for the web (github.dev) |  | x |   |
| Codespaces in the Browser  |  | x | x |


### Extension Host runtimes:

 * Node.js: Extensions are running in a Node.js runtime. Used by the local and remote extension hosts. Extensions need a `main` entry file to run in it.
 * Browser: Extensions are running in [Browser WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) runtime. Used by the web extension host. Extensions need a `browser` entry file to run in it. See the [Web extensions guide](/api/extension-guides/web-extensions.md) for more details.




### Preferred extension location

In which extension host an extension is loaded is chosen based on the available extension hosts and the capabilities of the extension.

If an extension can run on Node.js and in the browser, a node extension host will selected if available. One exception is explained later.

Extensions can influence the location with `extensionKind` property:

- `"extensionKind": ["workspace"]` — Indicates the extension requires access to workspace contents and therefore will run where the workspace is located. That can be on the local machine or or on the remote machine or codespace. Most extensions fall into this category.
- `"extensionKind": ["ui", "workspace"]` — Indicates the extension **prefers** to run as a UI extension, but does not have any hard requirements on local assets, devices, or capabilities. When using VS Code, the extension will run in VS Code's local extension host if it exists locally and means the user does not have to install the extension on the remote. Otherwise, the extension will run in VS Code's workspace extension host if it exists there. When using the Codespaces browser-based editor, it will run in the remote extension host always (as no local extension host is available).
- `"extensionKind": ["workspace", "ui"]` — Indicates the extension **prefers** to run as a workspace extension, but does not have any hard requirements on accessing workspace contents. When using VS Code, the extension will run in VS Code's workspace extension host if it exists in remote workspace, otherwise will run in VS Code's local extension host if it exists locally. When using the Codespaces browser-based editor, it will run in the remote extension host always (as no local extension host is available).
- `"extensionKind": ["ui"]` — Indicates the extension **must** run close to the UI because it requires access to local assets, devices, or capabilities or because low latency is required. In a Codespaces in the Browser where no local extension host is available, such an extension can not load, unless it is also a web extension. It will the be loaded in the web extension host.

**Note:** Prior releases (<  1.40) allowed an extension to specify single location as a string and it is deprecated in favor of multiple location support (array).

If an extension is web-only, it will always run on the web extension host, regardless of the `extensionKind` setting.

## Stability and Performance

VS Code aims to deliver a stable and performant editor to users, and misbehaving extensions should not impact the user experience. The Extension Host in VS Code prevents extensions from:

- Impacting startup performance
- Slowing down UI operations
- Modifying the UI

Additionally, VS Code lets extensions declare their [Activation Events](/api/references/activation-events) and loads them lazily. For example, the Markdown extension should only be loaded when a user opens a Markdown file. This makes sure that extensions do not consume unnecessary CPU and memory.
