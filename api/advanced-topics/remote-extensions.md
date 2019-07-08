---
ContentId: 5c708951-e566-42db-9d97-e9715d95cdd1
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to adding Visual Studio Code Remote Development support to extensions
---
# Supporting Remote Development

**[Visual Studio Code Remote Development](/docs/remote/remote-overview)** allows you to transparently interact with source code and runtime environments sitting on other machines (whether virtual or physical). This means you can use the same VS Code extensions you love even while working in remote workspaces.

This article summarizes what extension authors need to know about VS Code Remote Development. This includes the [VS Code Remote Development extension architecture](#architecture-and-extension-types), how to [test your extension](#testing-and-debugging-your-extension) in remote workspaces, and recommendations on [what to do if your extension does not work properly when being run remotely](#common-problems). While many extensions will work in remote workspaces without any modifications, you may need to make changes so that your extension works properly in all environments, although these changes are often fairly minor.

## Architecture and extension types

In order to make remote development as transparent as possible to users, VS Code distinguishes two classes of extensions:

- **UI Extensions**: These extensions make contributions to the VS Code user interface and are always run on the user's local machine. UI Extensions cannot directly access files in the workspace, or run scripts/tools installed in that workspace or on the machine. Example UI Extensions include: themes, snippets, language grammars, and keymaps.

- **Workspace Extensions**: These extensions are run on the same machine as where the workspace is located. When in a local workspace, Workspace Extensions are run on the local machine. When in a remote workspace, Workspace Extensions are run on the remote machine. Workspace Extensions can access files in the workspace to provide rich, multi-file language services, debugger support, or perform complex operations on multiple files in workspace (either themselves or by invoking scripts/tools). While Workspace extensions do not focus on UI customization, they can contribute explorers, views, and other UI elements as well.

When a user installs an extension, VS Code automatically installs it to the correct location based on its type: UI Extensions are run by VS Code's [local Extension Host](/api/advanced-topics/extension-host), while Workspace Extensions are run by a **Remote Extension Host** that sits in a small **VS Code Server**. This server is automatically installed (or updated) when you open a folder in Windows Subsystem for Linux (WSL), in a container, or on a remote SSH host. (VS Code also automatically manages starting and stopping the server, so users are often not aware of its presence.)

![Architecture diagram](images/remote-extensions/architecture.png)

VS Code APIs are designed to automatically run on the correct machine (either local or remote) when called from both UI or Workspace Extensions. However, if your extension uses APIs not provided by VS Code — such using Node APIs or running shell scripts — it may not work properly when run remotely. We recommend that you test that all features of your extension work properly in both local and remote workspaces.

## Testing and debugging your extension

This section explains how to test and debug a development version of your extension in remote workspaces. Specifically, we will look at how to test an extension using a local [dev container](/docs/remote/containers). Dev containers are cross-platform, easy to set up, and restrict port and file system access. Combined with a very thin OS footprint, dev containers provide the environment where your extension is most likely to hit a problem (if it has one at all). WSL, on the other hand, is typically the least restrictive, with SSH being somewhere in the middle. In most cases, only small adjustments are needed to resolve issues. See [common problems](#common-problems) for more information.

### Installing a development version of your extension

Currently, any time VS Code automatically installs an extension on an SSH host or inside a container or WSL, the Marketplace version is used (and not the version already installed on your local machine). While this makes sense in most situations, you may want to use an unpublished version of your extension for testing. To install an unpublished version of your extension, you can package the extension as a `VSIX` and manually install it into a VS Code window that is already connected to a running remote environment.

Follow these steps:

1. If this is a published extension, you may want to add `"extensions.autoUpdate": false` to `settings.json` to prevent it from auto-updating to the latest Marketplace version.
2. Next, use `vsce package` to package your extension as a VSIX.
3. Connect to a [development container](/docs/remote/containers), [SSH host](/docs/remote/ssh), or [WSL environment](/docs/remote/wsl).
4. Use the **Install from VSIX...** command available in the Extensions view **More Actions** (`...`) menu to install the extension in this specific window (not a local one).
5. Reload when prompted.

> **Tip:** Once installed, you can use the **Developer: Show Running Extensions** command to see whether VS Code is running the extension locally or remotely.

### Debugging your extension in a remote environment

Normally when you build an extension, you edit, launch, and debug it all on your local machine. Debugging your extension in a remote environment follows this same pattern. You will just edit, launch, and debug your extension all on a remote machine, container, or in WSL instead of your local machine.

#### Using a development container

You can edit and debug your extension in a container by following these steps.

1. Add the Node.js dev container definition to your extension folder by pressing `kbstyle(F1)`, selecting the **Remote-Containers: Create Configuration File...** command, and picking **Node.js 8 & TypeScript** (or just Node.js 8 if you are not using TypeScript). This will define the container you will use edit, debug, and test the extension.

2. After this command runs, you can modify the contents of the `.devcontainer` folder to include additional build or runtime requirements. See the in-depth [Containers](/docs/remote/containers#_indepth-setting-up-a-folder-to-run-in-a-container) documentation for details.

3. **[Optional]** Edit your `launch.json` to add a second argument to the `args` property that points to the path of a test project / test data in your workspace folder or another path inside the container. For example, if your test data is in a `data` folder in your workspace, you would add `${workspaceFolder}/data` as follows:

    > **Note:** You **cannot** use `${workspaceFolder}` alone for this second argument.

    ```json
    {
        "name": "Launch Extension",
        "type": "extensionHost",
        "request": "launch",
        "runtimeExecutable": "${execPath}",
        "args": [
            "--extensionDevelopmentPath=${workspaceFolder}",
            "${workspaceFolder}/data"
        ],
        "stopOnEntry": false,
        "sourceMaps": true,
        "outFiles": ["${workspaceFolder}/dist/**/*.js"],
        "preLaunchTask": "npm"
    }
    ```

4. Run **Remote-Containers: Reopen Folder in Container** and in a moment, VS Code will set up the container and connect. You will now be able to develop your source code from inside the container just as you would in the local case.

5. Finally, press `kbstyle(F5)` or use the **Debug view** to launch the extension inside this same container and attach the debugger. You will be able to interact with it just as you would in the local case, but from inside the development container you defined in step 1 instead.

#### Using SSH or WSL

You can edit and debug your extension on a remote [SSH host](/docs/remote/ssh) or in [WSL](/docs/remote/wsl) by following similar steps to the container case.

1. For SSH, you'll need to instead open a copy of the extension project on the remote host (for example, by using the **Remote-SSH: Connect to Host...** command, and then **File** > **Open** to select the cloned copy of the extension.) For WSL, open the local folder containing your extension project in WSL (for example by using **File** > **New WSL Window** and then **File** > **Open** to select the folder).

2. Once the folder is open on the SSH host / in WSL, you can edit your source code as you would in the local case.

3. Finally, press `kbstyle(F5)` or use the **Debug view** to launch the extension and attach the debugger as you would locally. The window that appears now contains your extension running on the SSH Host / in WSL with the debugger attached to it.

## Common problems

VS Code's APIs are designed to automatically run in the right location regardless of where your extension happens to be located. With this in mind, there are a few APIs that will help you avoid unexpected behaviors.

### Incorrect execution location

If your extension is not functioning as expected, it may be running in the wrong location. Most commonly, this shows up as an extension running remotely when you expect it to only be run locally. You can use the **Developer: Show Running Extensions** command from the command palette (`kbstyle(F1)`) to see where an extension is running.

If the **Developer: Show Running Extensions** command shows that a UI extension is incorrectly being treated as a workspace extension or vice versa, try setting the `extensionKind` property in your extension's [`package.json`](/api/get-started/extension-anatomy#extension-manifest):

```json
"extensionKind": "ui"
```

- `"extensionKind": "ui"` — Forces the extension to be a UI extension that is always run on the user's local machine.
- `"extensionKind": "workspace"` — Forces the extension to be a workspace extension that will be run remotely by the VS Code Server for remote workspaces.

You can also quickly **test** the effect of changing an extension's kind with the `remote.extensionKind` [setting](/docs/getstarted/settings). This setting is a map of extension IDs to extension kinds. For example, if you wish to force the [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) extension to be a UI extension (instead of its Workspace default) and the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) to be a workspace extension (instead of its UI default), you would set:

```json
"remote.extensionKind": {
    "ms-azuretools.vscode-cosmosdb": "ui",
    "msjsdiag.debugger-for-chrome": "workspace"
}
```

Using `remote.extensionKind` allows you to quickly test published versions of extensions without having to modify their `package.json` and rebuild them.

### Persisting extension data or state

In some cases, your extension may need to persist state information that does not belong in `settings.json` or a separate workspace configuration file (for example `.eslintrc`). To solve this problem, VS Code provides a set of helpful storage properties on the `vscode.ExtensionContext` object passed to your extension during activation. If your extension already takes advantage of these properties, it should continue to function regardless of where it runs.

However, if your extension relies on current VS Code pathing conventions (for example `~/.vscode`) or the presence of certain OS folders (for example `~/.config/Code` on Linux) to persist data, you may run into problems. Fortunately, it should be simple to update your extension and avoid these challenges.

If you are persisting simple key-value pairs, you can store workspace specific or global state information using `vscode.ExtensionContext.workspaceState` or `vscode.ExtensionContext.globalState` respectively. If your data is more complicated than key-value pairs, the  `globalStoragePath` and `storagePath` properties provide "safe" paths that you can use to read/write global workspace-specific information in a file.

These APIs were added in VS Code 1.31. To use them, start by updating your `engines.vscode` value in `package.json`:

```json
"engines": {
    "vscode": "^1.31.0"
}
```

Now when you publish your extension, only users on VS Code 1.31 or newer will get the updated version.

To use the APIs:

```TypeScript
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('myAmazingExtension.persistWorkspaceData', () => {

        // Create the extension's workspace storage folder if it doesn't already exist
        if (!fs.existsSync(context.storagePath)) {
            fs.mkdirSync(context.storagePath);
        }

        // Write a file to the workspace storage folder
        fs.writeFileSync(
            path.join(context.storagePath, 'workspace-data.json'),
            JSON.stringify({ now: Date.now() }));
    }));

    context.subscriptions.push(
        vscode.commands.registerCommand('myAmazingExtension.persistGlobalData', () => {

        // Create the extension's global (cross-workspace) folder if it doesn't already exist
        if (!fs.existsSync(context.globalStoragePath)) {
            fs.mkdirSync(context.globalStoragePath);
        }

        // Write a file to the global storage folder for the extension
        fs.writeFileSync(
            path.join(context.globalStoragePath, 'global-data.json'),
            JSON.stringify({ now: Date.now() }));
    }));
}
```

### Persisting secrets

If your Workspace Extension needs to persist passwords or other secrets, you may want to use your local operating system's secret store (Windows Cert Store, the macOS KeyChain, a `libsecret`-based keyring on Linux) rather than the one on the remote machine. Further, on Linux you may be relying on `libsecret` and by extension `gnome-keyring` to store your secrets, and this does not typically work well on server distros or in a container.

Visual Studio Code does not provide a secret persistence mechanism itself, but many extension authors have opted to use the [`keytar` node module](https://www.npmjs.com/package/keytar) for this purpose. For this reason, VS Code includes `keytar` and will **automatically and transparently** run it locally if referenced in a Workspace Extension. That way you can always take advantage of the local OS keychain / keyring / cert store and avoid the problems mentioned above.

For example:

```typescript
import * as vscode from 'vscode';

function getCoreNodeModule(moduleName) {
    try {
        return require(`${vscode.env.appRoot}/node_modules.asar/${moduleName}`);
    }
    catch (err) { }
    try {
        return require(`${vscode.env.appRoot}/node_modules/${moduleName}`);
    }
    catch (err) { }
    return undefined;
}

// Use it
const keytar = getCoreNodeModule('keytar');
await keytar.setPassword('my-service-name','my-account','iamal337d00d');
const password = await keytar.getPassword('my-service-name','my-account');
```

### Using the clipboard

Historically, extension authors have used Node.js modules such as `clipboardy` to interact with the clipboard. Unfortunately, if you use these modules in a Workspace Extension, they will use the remote clipboard instead of the user's local one.

The VS Code clipboard API solves this problem. It is always run locally, regardless of the type of extension that calls it. This API was added in VS Code 1.30, so to use it, update the `engines.vscode` value in `package.json` and make sure you have the [correct VS Code API typings](/api/get-started/extension-anatomy#extension-manifest) installed:

```json
"engines": {
    "vscode": "^1.30.0"
}
```

Now when you publish your extension, only users on VS Code 1.30 or newer will get the updated version.

To use the VS Code clipboard API in an extension:

```typescript
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('myAmazingExtension.clipboardIt', async () => {
        // Read from clipboard
        const text = await vscode.env.clipboard.readText();

        // Write to clipboard
        await vscode.env.clipboard.writeText(`It looks like you're copying "${text}". Would you like help?`);
    }));
}
```

### Opening something in a local browser or application

Spawning a process or using a module like `opn` to launch a browser or other application for particular URI can work well for local scenarios, but Workspace Extensions run remotely, which can cause the application to launch on the wrong side. VS Code Remote Development **partially** shims the `opn` node module to allow existing extensions to function. You can call the module with a URI and VS Code will cause the default application for the URI to appear on the client side. However, this is not a complete implementation, as options are not support and a `child_process` object is not returned.

Instead of relying on a third-party node module, we recommend extensions take advantage of the `vscode.env.openExternal` method to launch the default registered application on your local operating system for given URI. Even better, `vscode.env.openExternal` **does automatic port forwarding!** You can use it to point to a local web server on a remote machine and serve up content even if that port is blocked externally.

This API was added in VS Code 1.31. To get started, update your `engines.vscode` value in `package.json`:

```json
"engines": {
    "vscode": "^1.31.0"
}
```

Now when you publish your extension, only users on VS Code 1.31 or newer will get the updated version.

To use the `vscode.env.openExternal` API:

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('myAmazingExtension.openExternal', () => {

        // Example 1 - Open the VS Code homepage in the default browser.
        vscode.env.openExternal(vscode.Uri.parse('https://code.visualstudio.com'));

        // Example 2 - Open the default email application.
        vscode.env.openExternal(vscode.Uri.parse('mailto:vscode@microsoft.com'));
    }));
}
```

### Communicating between extensions using commands

Some extensions return APIs as a part of their activation that are intended for other extensions to use (via `vscode.extension.getExtension(extensionName).exports`). While these will work if all extensions involved are on the same side (either all UI Extensions or all Workspace Extensions), these will not work between UI and Workspace Extensions.

Fortunately, VS Code automatically routes any executed commands to the correct extension regardless of its location. You can freely invoke any command (including those provided by other extensions) without worrying about impacts.

If you have a set of extensions that need to interact with one another, exposing functionality using a private command can help you avoid unexpected impacts. However, note that any objects you pass in as parameters will be "stringified" (`JSON.stringify`) before being transmitted, so the object cannot have cyclic references and will end up as a "plain old javascript object" on the other side.

For example:

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    // Register the private echo command
    const echoCommand = vscode.commands.registerCommand('_private.command.called.echo',
        (value: string) => {
            return value;
        }
    );
    context.subscriptions.push(echoCommand);
}
```

See the [command API guide](/api/extension-guides/command) for details on working with commands.

## Using the Webview API

Like the clipboard API, the [Webview API](/api/extension-guides/webview) is always run on the user's local machine, even when used from a Workspace extension. This means that many webview-based extensions should just work, even when used in remote workspaces. However there are some considerations to be aware of to make sure that your webview extension works properly when run remotely.

### Accessing localhost

By default, `localhost` inside a webview resolves to the user's local machine. This means that for a remotely running workspace extension, the webviews it creates would not be able to access local servers spawned by the extension. Even if you use the IP of the machine, the ports you are connecting to will typically be blocked by default in a cloud VM or a container. Here's an illustration of the problem:

![Webview problem](images/remote-extensions/webview-problem.png)

You can work around this by using the webview [message passing](/api/extension-guides/webview#scripts-and-message-passing) API instead of accessing localhost directly. Alternatively, you can **add a port mapping** to your webview so that certain ports are transparently forwarded to the remote machine where the extension is running.

Port mapping maps a localhost port used inside your webview to an arbitrary port on the machine where your extension is running. If your workspace extension is running remotely and defines a port mapping, traffic will be automatically and securely forwarded from the local machine to the remote machine. If your extension is running locally, a port mapping simply remaps one localhost port to another. Webview port mapping works for both UI and Workspace Extensions, and in both local and remote workspaces.

The port mapping API was added in VS Code 1.34. To use it, start by updating the `engines.vscode` value in your extension's `package.json`:

```json
"engines": {
    "vscode": "^1.34.0"
}
```

Now when you publish your extension, only users on VS Code 1.34 or newer will get the updated version.

To use a port mapping, just pass in a `portMapping` object when you create your webview:

```typescript
const STATIC_PORT = 3000;
const dynamicServerPort = getExpressServerPort();
const webviewPort = STATIC_PORT;

// Create webview and pass portMapping in
const panel = vscode.window.createWebviewPanel(
    'remoteMappingExample',
    'Remote Mapping Example',
    vscode.ViewColumn.One, {
        portMapping: [
            // This maps localhost:3000 in the webview to the express server port on the remote host.
            { webviewPort: webviewPort, extensionHostPort: dynamicServerPort }
        ]
    });

// Reference the "webviewPort" variable in any full URIs you reference in your HTML.
panel.webview.html = `<!DOCTYPE html>
    <body>
        <!-- This will resolve to the dynamic server port on the remote machine -->
        <img src="http://localhost:${webviewPort}/canvas.png">
    </body>
    </html>`;
```

Now the webview's traffic to `localhost:3000` will be transparently routed to the remote machine using VS Code's existing secure communication channel:

![Webview Solution](images/remote-extensions/webview-solution.png)

## Using native Node.js modules

Native modules bundled with (or dynamically acquired for) a VS Code extension must be recompiled [using Electron's `electron-rebuild`](https://electronjs.org/docs/tutorial/using-native-node-modules). However, VS Code Server runs a standard (non-Electron) version of Node.js, which can cause binaries to fail when used remotely.

To solve this problem:

1. Include (or dynamically acquire) both sets of binaries (Electron and standard Node.js) for the "modules" version in Node.js that VS Code ships.
2. Check to see if `context.executionContext === vscode.ExtensionExecutionContext.Remote` in your activation function to set up the correct binaries based on whether the extension is running remotely or locally.
3. You may also want to add support for non-x86_64 targets and Alpine Linux at the same time by [following similar logic](#supporting-non-x8664-hosts-or-alpine-linux-containers)

You can find the "modules" version VS Code uses by going to **Help > Developer Tools** and typing `process.versions.modules` in the console. However, to make sure native modules work seamlessly in different Node.js environments, you may want to compile the native modules against all possible Node.js "modules" versions and platforms you want support (Electron Node.js, official Node.js Windows/Darwin/Linux, all versions). The [node-tree-sitter](https://github.com/tree-sitter/node-tree-sitter/releases/tag/v0.14.0) module is a good example of a module that does this well.

## Supporting non-x86_64 hosts or Alpine Linux containers

If your extension is purely written in JavaScript/TypeScript, you may not need to do anything to add support for other processor architectures or the `musl` based Alpine Linux to your extension.

However, if your extension works on Debian 9+, Ubuntu 16.04+, or RHEL / CentOS 7+ remote SSH hosts, containers, or WSL, but fails on supported non-x86_64 hosts (e.g. ARMv7l) or Alpine Linux containers, the extension may include x86_64 `glibc` specific native code or runtimes that will fail on these architectures/operating systems.

For example, your extension may only include x86_64 compiled versions of native modules or runtimes. For Alpine Linux, the included native code or runtimes may not work due to [fundamental differences](https://wiki.musl-libc.org/functional-differences-from-glibc.html) between how `libc` is implemented in Alpine Linux (`musl`) and other distributions (`glibc`).

To resolve this problem:

1. If you are dynamically acquiring compiled code, you can add support by detecting non-x86_64 targets using `process.arch` and downloading versions compiled for the right architecture. If you are including binaries for all supported architectures inside your extension instead, you can use this logic to use the correct one.

2. For Alpine Linux, you can detect the operating system using  `await fs.exists('/etc/alpine-release')` and once again download or use the correct binaries for a `musl` based operating system.

3. If you'd prefer not to support these platforms, you can use the same logic to provide a good error message instead.

It is important to note that some 3rd party npm modules include native code that can cause this problem. So, in some cases you may need to work with the npm module author to add additional compilation targets.

## Avoid using Electron modules

While it can be convenient to rely on built-in Electron or VS Code modules not exposed by the extension API, it's important to note that VS Code Server runs a standard (non-Electron) version of Node.js. These modules will be missing when running remotely. There are a few exceptions, [like `keytar`](#persisting-secrets), where there is specific code in place to make them work.

You should use base Node.js modules or modules in your extension VSIX to avoid these problems. If you absolutely have to use an Electron module, be sure to have a fallback if the module is missing.

The example below will use the Electron `original-fs` node module if found, and fall back to the base Node.js `fs` module if not.

```typescript
function requireWithFallback(electronModule: string, nodeModule: string) {
    try {
        return require(electronModule);
    }
    catch (err) { }
    return require(nodeModule);
}

const fs = requireWithFallback('original-fs', 'fs');
```

Try to avoid these situations whenever possible.

## Known issues

There are a few extension problems that could be resolved with some added functionality for Workspace Extensions. The following table is a list of known issues under consideration:

| Problem | Description |
|---------|-------------|
| **Blocked ports** | When working inside a Docker container or SSH server, ports are not automatically forwarded and there currently is no API to programmatically forward a port from an extension. Webviews can be adapted as [described above](#using-the-webview-api), but other scenarios currently require users to manually forward or expose ports. |
| **Cannot access / transfer remote workspace files to local machine** | Extensions that open workspace files in external applications may encounter errors because the external application cannot directly access the remote files. We are investigating options for how extensions might be able to transfer files from the remote workspace to solve this problem. |
| **Cannot access attached devices from Workspace extension** | Extensions that access locally attached devices will be unable to connect to them when running remotely. We are investigating the best approach to solve this problem. |

## Questions and feedback

- See [Tips and Tricks](/docs/remote/troubleshooting) or the [FAQ](/docs/remote/faq).
- Search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode-remote).
- [Upvote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new)
- Contribute a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
