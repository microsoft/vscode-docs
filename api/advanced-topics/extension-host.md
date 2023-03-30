---
# DO NOT TOUCH — Managed by doc writer
ContentId: 106AA11C-DB26-493A-9E3C-16F513B2AEC8
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: The Visual Studio Code Extension Host is responsible for managing extensions and ensuring the stability and performance of Visual Studio Code.
---

# Extension Host

The **Extension Host** is responsible for running extensions.

## Extension Host configurations

Depending on the configuration of VS Code, there are multiple extension hosts running, with different runtimes, at different locations.

* local – A Node.js extension host running locally, on the same machine as the user interface.
* web – A web extension host running in the browser or locally, on the same machine as the user interface.
* remote – A Node.js extension host running remotely in a container or a remote location.

The following table shows which extension hosts are available in the various configurations of VS Code:

| Configuration | local extension host  | web extension host | remote extension host |
--- | --- | --- | ---
| VS Code on the desktop | ✔️ | ✔️ |  |
| [VS Code with remote](/docs/remote/remote-overview) (Container, SSH, WSL, GitHub Codespace, Tunnel) | ✔️ | ✔️ | ✔️ |
| VS Code for the Web (vscode.dev, github.dev) |  | ✔️ |   |
| VS Code for the Web with Codespaces |  | ✔️ | ✔️ |

### Extension Host runtimes

* Node.js - Extensions are running in a Node.js runtime. Used by the local and remote extension hosts. Extensions need a `main` entry file to run in it.
* Browser - Extensions are running in [Browser WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) runtime. Used by the web extension host. Extensions need a `browser` entry file to run in it. See the [Web extensions guide](/api/extension-guides/web-extensions) for more details.

### Preferred extension location

The extension host where an extension is loaded depends on:

* The available extension hosts given by the configuration of VS Code.
* The capabilities of the extension: Can it run in Node.js, and/or the web, or if not indicated, what contributions does it provide?
* Where is the extension installed: On the local machine, on the remote machine, or both.
* The location the extension prefers: the `extensionKind` property.

`extensionKind` is a property in the [extension manifest](/api/references/extension-manifest). It allows extensions to specify a preferred running location. That can be the machine that has the workspace (`workspace`) or the user interface (`ui`). If an extension can run on both, it can specify an order of preference.

* `"extensionKind": ["workspace"]` — Indicates the extension requires access to workspace contents and therefore needs to run where the workspace is located. That can be on the local machine or on the remote machine or Codespace. Most extensions fall into this category.
* `"extensionKind": ["ui", "workspace"]` — Indicates the extension **prefers** to run as a UI extension, but does not have any hard requirements on local assets, devices, or capabilities. When using VS Code, the extension will run in VS Code's local extension host if it exists locally and means the user does not have to install the extension on the remote. Otherwise, the extension will run in VS Code's workspace extension host if it exists there. When using VS Code for the Web with Codespaces, it will run in the remote extension host always (as no local extension host is available).
* `"extensionKind": ["workspace", "ui"]` — Indicates the extension **prefers** to run as a workspace extension, but does not have any hard requirements on accessing workspace contents. When using VS Code, the extension will run in VS Code's workspace extension host if it exists in remote workspace, otherwise will run in VS Code's local extension host if it exists locally. When using VS Code for the Web with Codespaces it will run in the remote extension host always (as no local extension host is available).
* `"extensionKind": ["ui"]` — Indicates the extension **must** run close to the UI because it requires access to local assets, devices, or capabilities or because low latency is required. In the case of VS Code for the Web with Codespaces, where no local extension host is available, such an extension can not load, unless it is also a [web extension](/api/extension-guides/web-extensions). It will then be loaded in the web extension host with a limitation that it cannot instantiate a web worker.

**Note:** Prior VS Code releases (<1.40) allowed an extension to specify a single location as a string but this is deprecated in favor of multiple locations as a array.

If an extension can run on Node.js and in the browser, a Node.js extension host will be selected if available. There's one exception, when the configuration is VS Code for the Web with Codespaces and the `extensionKind` is set to `ui`, then the web extension host is preferred over the remote extension host.

If an extension is web-only, it will always run on the web extension host, regardless of the `extensionKind` setting. We recommend to not define `extensionKind` in that case.

## Stability and Performance

VS Code aims to deliver a stable and high performance editor to users, and misbehaving extensions should not impact the user experience. The Extension Host in VS Code prevents extensions from:

* Impacting startup performance
* Slowing down UI operations
* Modifying the UI

Additionally, VS Code lets extensions declare their [Activation Events](/api/references/activation-events) and loads them lazily. For example, the Markdown extension should only be loaded when a user opens a Markdown file. This makes sure that extensions do not consume unnecessary CPU and memory.
