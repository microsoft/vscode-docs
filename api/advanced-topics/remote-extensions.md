---
ContentId: 5c708951-e566-42db-9d97-e9715d95cdd1
DateApproved: 3/22/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to adding Visual Studio Code Remote Development support to extensions
---
# Supporting Remote Development

[Visual Studio Code Remote Development](/docs/remote/remote-overview) allows you to transparently interact with source code and runtime environments sitting on other machines (whether virtual or physical). This means you can use the same VS Code extensions you love even while working in remote workspaces.

This article summarizes what extension authors need to know about VS Code Remote Development. This includes the [VS Code Remote Development extension architecture](#architecture-and-extension-types), how to [test your extension](#testing-and-debugging-your-extension) in remote workspaces, and recommendations on [what to do if your extension does not work properly when being run remotely](#common-problems). While many extensions will work in remote workspaces without any modifications, you may need to make changes so that your extension works properly in all environments, although these changes are often fairly minor.

## Architecture and extension types

In order to make remote development as transparent as possible to users, VS Code distinguishes two classes of extensions:

- **UI Extensions**: These extensions make contributions to the VS Code user interface and are always run on the user's local machine. UI extensions cannot directly access files in the workspace, or run scripts/tools installed in that workspace or on the machine. Example UI extensions include: themes, snippets, language grammars, and keymaps.

- **Workspace Extensions**: These extensions are run on the same machine as where the workspace is located. When in a local workspace, workspace extensions are run on the local machine. When in a remote workspace, workspace extensions are run on the remote machine. Workspace extensions can access files in the workspace to provide rich, multi-file language services, debugger support, or perform complex operations on multiple files in workspace (either themselves or by invoking scripts/tools).

When a user installs an extension, VS Code automatically installs it to the correct location based on its type: UI Extensions are run by VS Code's [local Extension Host](/api/advanced-topics/extension-host), while Workspace Extensions are run by a **Remote Extension Host** that sits in a small **VS Code Server**. This server is automatically installed (or updated) when you open a folder in Windows Subsystem for Linux (WSL), in a container, or on a remote SSH host. (VS Code also automatically manages starting and stopping the server, so users are often not aware of its presence.)

![Architecture diagram](images/remote-extensions/architecture.png)

VS Code APIs are designed to automatically run on the correct machine (either local or remote) when called from both UI or Workspace extensions. However, if your extension uses APIs not provided by VS Code — such using Node APIs or running shell scripts — it may not work properly when run remotely. We recommend that you test that all features of your extension work properly in both local and remote workspaces.

## Testing and debugging your extension

This section explains how to test and debug a development version of your extension in remote workspaces. Specifically, we will look at how to test an extension using a local [dev container](/docs/remote/containers). Dev containers are cross-platform, easy to set up, and restrict port and file system access. Combined with a very thin OS footprint, dev containers provide the environment where your extension is most likely to hit a problem (if it has one at all). WSL, on the other hand, is typically the least restrictive, with SSH being somewhere in the middle. In most cases, only small adjustments are needed to resolve issues. See [common problems](#common-problems) for more information.

### Installing a development version of your extension

Currently, anytime VS Code automatically installs an extension on an SSH host or inside a container or WSL, the Marketplace version is used (and not the version already installed on your local machine). While this makes sense in most situations, you may want to use an unpublished version of your extension for testing. To install an unpublished version of your extension, you can package the extension as a `VSIX` and manually install it into a VS Code window that is already connected to a running remote environment.

Follow these steps:

1. Use `vsce package` to package your extension as a VSIX.
2. Connect to a [development container](/docs/remote/containers), [SSH host](/docs/remote/ssh), or [WSL environment](/docs/remote/wsl).
3. Use the **Install from VSIX...** command available in the Extensions view **More Actions** (`...`) menu to install the extension in this specific window (not a local one).
4. Reload when prompted.

> **Tip:** Once installed, you can use the **Developer: Show Running Extensions** command to see whether VS Code is running the extension locally or remotely.

### Debugging your extension in a remote environment

#### Using a development container

You can edit and debug your extension in a container by following these steps.

1. Add a `.devcontainer/devcontainer.json` or `.devcontainer.json` file with the [appropriate contents](/docs/remote/containers#creating-a-devcontainerjson-file-for-existing-projects) to your extension source code folder. Use the command `Remote-Containers: Create Configuration File...` to add a container configuration for your extension. From the list select the 'Node.js 8' definition. 

2. Edit your `launch.json` to add a second argument to the `args` property that points to the path of a test project or your test data in your workspace folder or that will be in the container when it starts. (Note: You cannot use the workspace folder itself.) By default, the user's home folder (`$HOME`) is used. For example, if your test data is in a `data` folder in your workspace, you would add `${workspaceFolder}/data` as follows:

    ```json
    {
        "name": "Launch Extension",
        "type": "extensionHost",
        "request": "launch",
        "runtimeExecutable": "${execPath}",
        "args": [
            "--extensionDevelopmentPath=${workspaceRoot}",
            "${workspaceFolder}/data"
        ],
        "stopOnEntry": false,
        "sourceMaps": true,
        "outFiles": ["${workspaceRoot}/dist/**/*.js"],
        "preLaunchTask": "npm"
    }
    ```

3. Run **Remote-Containers: Reopen Folder in Container** and in a moment, VS Code will set up the container and connect. You can now edit your source code as you would in the local case.

4. Finally, **F5** or use the **Debug view** to launch the extension and attach the debugger as you would locally. The window that appears will now contain your extension running inside this same container with the debugger attached to it.

#### Using SSH or WSL

You can edit and debug your extension on a remote [SSH host](/docs/remote/ssh) or in [WSL](/docs/remote/wsl) by following similar steps to the container case.

1. For SSH, you'll need to instead open a copy of the extension project on the remote host (for example by using the **Remote-SSH: Connect to Host...** command, and then **File** > **Open** to select the cloned copy of the extension.) For WSL, open the local folder containing your extension project in WSL (for example by using **File** > **New WSL Window** and then **File** > **Open** to select the folder).

2. Once the folder is open on the SSH host / in WSL, you can edit your source code as you would in the local case.

3. Finally, **F5** or use the **Debug view** to launch the extension and attach the debugger as you would locally. The window that appears will now contain your extension running on the SSH Host / in WSL with the debugger attached to it.

## Common problems

VS Code's APIs are designed to automatically run in the right location regardless of where your extension happens to be located. With this in mind, there are a few APIs that will help you avoid unexpected behaviors.

### Incorrect execution location

If your extension is not functioning as expected, it may be running in the wrong location. Most commonly, this shows up as an extension running remotely when you expect it to only be run locally. You can use the **Developer: Show Running Extensions** command to see where an extension is running.

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

However, if your extension relies on current VS Code pathing conventions (for example `~/.vscode`) or the presence certain OS folders (for example `~/.config/Code` on Linux) to persist data, you may run into problems. Fortunately, it should be simple to update your extension and avoid these challenges.

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

If you prefer not to use `keytar`, you can instead use a "Helper Extension" to run your secret persistence code. See [below](#access-local-or-remote-apis-using-a-helper-extension) for details.

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
    context.subscriptions.push(vscode.commands.registerCommand('myAmazingExtension.command', async () => {
        // Read from clipboard
        const text = await vscode.env.clipboard.readText();

        // Write to clipboard
        await vscode.env.clipboard.writeText(`It looks like you're copying "${text}". Would you like help?`);
    }));
}
```

### Opening something in a local browser or application

Spawning a process or using a module like `opn` to launch a browser or other application for particular URI can work well for local scenarios, but Workspace extensions run remotely, which can cause the application to launch on the wrong side. VS Code Remote Development **partially** shims the `opn` node module to allow existing extensions to function. You can call the module with a URI and VS Code will cause the default application for the URI to appear on the client side. However, this is not a complete implementation, as options are not support and a `child_process` object is not returned.

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

// Example 1 - Open the VS Code homepage in the default browser.
vscode.env.openExternal(vscode.Uri.parse('https://code.visualstudio.com'));

// Example 2 - Open the default email application.
vscode.env.openExternal(vscode.Uri.parse('mailto:vscode@microsoft.com'));
```

If you need to do something more sophisticated like launch an arbitrary application, you can use a Helper Extension. See [below](#accessing-local-apis-using-a-helper-extension) for details.

### Communicating between extensions using commands

Some extensions return APIs as a part of their activation function that are intended for other extensions to use (via `vscode.extension.getExtension(extensionName).exports`). While these will work if all extensions involved are on the same side (either all UI extensions or all Workspace extensions), these will not work between UI and Workspace extensions.

Fortunately, VS Code automatically routes any executed commands to the correct extension regardless of its location. You can freely invoke any simple or complex command (including those provided by other extensions) without worrying about impacts. However, note that any parameters you pass in will be "stringified" in transit, so methods and functions will not appear on the other side and you cannot have any cyclic dependencies. If you have a set of extensions that need to interact with one another, exposing functionality using a private command can help you avoid unexpected impacts. Private commands are prefixed with an underscore ("_").

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

You can also use the command interface in more sophisticated ways to bridge APIs between extensions or to invoke custom local APIs from a workspace. See [Accessing local APIs using a Helper Extension](#accessing-local-apis-using-a-helper-extension) for details.

## Using the Webview API

Like the clipboard API, the [Webview API](/api/extension-guides/webview) is always run on user's local machine, even when used from a Workspace extension. This means that many webview-based extensions should just work, even when used in remote workspaces. However there are some considerations to be aware to make sure that your webview extension works properly when run remotely.

### Accessing localhost

By default, `localhost` inside a webview resolves to the user's local machine. This means that for a remotely running workspace extension, the webviews it creates would not be able to access local servers spawned by the extension. Even if you use the IP of the machine, the ports you are connecting to will typically be blocked by default in a cloud VM or a container. Here's an illustration of the problem:

![Webview problem](images/remote-extensions/webview-problem.png)

You can work around this by using the webview [message passing](/api/extension-guides/webview.m#scripts-and-message-passing) API instead of accessing localhost directly. Alternatively, you can **add a port mapping** to your webview so that certain ports are transparently forwarded to the remote machine where the extension is running.

Port mapping maps a localhost port used inside your webview to an arbitrary port on the machine where your extension is running. If your workspace extension is running remotely and defines a port mapping, traffic will be automatically and securely forwarded from the local machine to the remote machine. If your extension is running locally, a port mapping simply remaps one localhost port to another. Webview port mapping works for both UI and workspace extensions, and in both local and remote workspaces.

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

Now the webview's traffic to `localhost:3000` will be transparently routed to the remote machine using VS Code's existing, secure communication channel:

![Webview Solution](images/remote-extensions/webview-solution.png)

## Accessing local APIs using a Helper Extension

Some extensions are not cleanly classifiable as a purely Workspace Extension or as a purely UI extension. For example, a Workspace Extension may rely on local, non-VS Code provided APIs, commands, modules, or runtimes. Or a UI Extension may have some features that interact directly with remote workspace files. For cases such as these, you can split your extension into a workspace component and UI component using a "Helper" extension.

A "Helper" extension encapsulates the external functionality that your main extension needs and exposes this as a private API using VS Code commands. Your main Workspace or UI Extension can then communicate with the Helper extension using these commands, with VS Code automatically routing the commands to wherever the Helper extension happens to be running.

Here are a few examples of how "Helper" extensions can be used and how to implement them:

- [Basic Helper Extension](https://aka.ms/vscode-remote/samples/helper-extension)
- [Proxying an existing API - Basic](https://aka.ms/vscode-remote/samples/remote-api)
- [Proxying an existing API - API Class w/Events](https://aka.ms/vscode-remote/samples/remote-api-with-events)

### Basic Helper Extension

Let's start with a basic "Helper" Extension. Here we will surface an "echo" command defined by a UI Helper Extension so that it can be invoked by our main Workspace Extension.

![Basic Helper Extension Architecture](images/remote-extensions/basic-helper.png)

The key to defining a helper extension is setting `"api": "none"` in its `package.json`, which lets both UI and Workspace extensions add the helper as an extension dependency.

package.json (Helper Extension):

```json
{
    "name": "helper-extension",
    "extensionKind": "ui",
    "api":"none",
    "activationEvents": [
        "onCommand:_helper-extension.echo"
    ]
}
```

Setting `"api": "none"` tells VS Code that it can safely ignore any synchronous APIs returned as a part of the extension's activation function, since all cross-extension communication with it will be done using commands.

While the Helper Extension's `package.json` above activates when the `_helper-extension.echo` command is executed, the command is private and has not been added to the extension's contributions. Instead, we will register the command in our extension's `activate` function so that it can be used by our Workspace Extension:

extension.ts (Helper Extension):

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    // Register the private echo command
    const echoCommand = vscode.commands.registerCommand('_helper-extension.echo',
        (value: string) => {
            vscode.window.showInformationMessage(`Main extension said, "${msg}"`);
        }
    );
    context.subscriptions.push(echoCommand);
}
```

Now our main Workspace Extension can add the Helper Extension as a dependency. Once both extensions are published to the marketplace, installing the main Workspace Extension will install the Helper Extension as well.

package.json (Main Workspace Extension):

```json
{
    "name": "main-extension",
    "extensionKind": "workspace",
    "extensionDependencies": [
       "helper-extension"
    ]
}
```

To communicate with the Helper Extension, our workspace extension invokes the private `_helper-extension.echo` command:

extension.ts (Main Workspace Extension):

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    // Invoke the echo command on the helper extension
    await vscode.commands.executeCommand('_helper-extension.echo', 'Hello!');
}
```

You can find the complete example [here](https://aka.ms/vscode-remote/samples/helper-extension).

### Proxying an existing API

In some cases, you may have an existing node module that is used in many places in your extension and updating each location to use a command is too time-consuming. If you are only using async functions on the module (or these functions return a promise), you can create a drop-in replacement **proxy API module** that executes an **API Bridge** command in a Helper Extension to call the actual API.

![ApiBridge Architecture](images/remote-extensions/api-bridge.png)

For example, imagine the [simple echo command above](#accessing-local-apis-using-a-helper-extension) was part of common node module.

example-api.ts:

```typescript
import * as vscode from 'vscode';

export async function echo(msg: string): Promise<void> {
    await vscode.window.showInformationMessage(`Main extension said, "${msg}"`);
}

export async function setEchoTimer(msg: string, delay: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            await echo(msg);
            resolve();
        }, delay);
    });
}

```

To allow this API to be called remotely, the [Helper Extension](#accessing-local-apis-using-a-helper-extension) can be modified to introduce a private **API Bridge** command designed call any method on the API surface.

extension.ts (Helper Extension):

```typescript
import * as vscode from 'vscode';
import * as exampleApi from './example-api';

export async function activate(context: vscode.ExtensionContext) {
    // First arg is API function name, all of the function's expected arguments then follow it.
    const callCommand = vscode.commands.registerCommand('_remote-api.apiBridge', (...args: any[]) => {
            const fnName = args[0];
            const fnArgs = Array.prototype.slice.call(args, 1);
            // Call the remoteApi function by name
            return (<any>exampleApi)[fnName](...fnArgs);
        }
    );
    context.subscriptions.push(callCommand);
}
```

Next, we will create a drop-in replacement proxy node module that mirrors the API's function signatures but calls the API Bridge instead.

remote-example-api.ts (Replacement Node Module - Main Extension):

```typescript
import * as vscode from 'vscode';

// Use identical signature to echo in the original example-api module
export async function echo(message: string): Promise<void> {
    return await vscode.commands.executeCommand('_remote-api.apiBridge','echo', value);
}

// This time for a different function with more arguments
export async function setEchoTimer(message: string, delay: Number): Promise<void> {
    return await vscode.commands.executeCommand('_remote-api.apiBridge','setEchoTimer', message, delay);
 }
```

Finally, we update any imports that reference `example-api` in the main Workspace Extension to `remote-example-api`. At this point, the main extension will function like it did before but the API's function calls will be executed on the UI side instead.

extension.ts (Main Workspace Extension):

```typescript
import * as vscode from 'vscode';
import * as exampleApi from 'remote-example-api'; // Change the import

export async function activate(context: vscode.ExtensionContext) {
        // Existing exampleApi calls all now work, but will execute on the UI side!
        await exampleApi.echo('Hello! I will ping you again in 10 seconds.');
        await exampleApi.setEchoTimer('Hello again!', 10000);
}
```

You can find the complete example [here](https://aka.ms/vscode-remote/samples/remote-api).

### Proxying APIs with Events

A more difficult situation arises if you need to remotely access an API that has an event. These bi-directional APIs often use objects instead of straight modules, which further complicates things. To resolve these challenges, you can use a pattern that establishes an **API Bridge** command in a Helper Extension and an **Event Bridge** in your main extension that handles the execution of event callbacks.

![ApiBridge/ApiEventBridge Architecture](images/remote-extensions/api-event-bridge.png)

Under this model, the Helper Extension's API Bridge associates a unique identifier with each instance of the API object that is created. The API Bridge exposes a command that allows the main extension to call functions for a given API instance using this identifier. For functions that register event callbacks, the API Bridge uses a stub callback function that executes a command on the Event Bridge.

extension.ts (Helper Extension w/API Bridge):

```typescript
const apiObjs: any = {};

export async function activate(context: vscode.ExtensionContext) {
    const apiBridge = vscode.commands.registerCommand('_example-api.apiBridge', (...args: any[]) => {

        // First arg is instance ID, second is the function name
        const instanceId = args[0];
        const fnName = args[1];

        // Get the instance or if the ID is new, create one.
        apiObjs[instanceId] = apiObjs[instanceId] || new ExampleApi();

        // If the function is one that registers an event, use a replacement callback
        if (fnName === 'registerEventHandler') {
            const eventName = args[2];
            const callbackId = args[3];
            // Trigger the callback via the Event Bridge
            return apiObjs[instanceId].registerEventHandler(eventName, (eventName: string, value?: string) => {
                return vscode.commands.executeCommand(`_example-api.eventBridge`, callbackId, eventName, value);
            });
        }

        // Otherwise call the appropriate function
        return apiObjs[instanceId][fnName](...Array.prototype.slice.call(args,2));
    });
    context.subscriptions.push(apiBridge);
}
```

The main extension then uses a **proxy class** (similar to one in the [the proxy module above](#proxying-an-existing-api) that mirrors the API class's function signatures, but instead executes commands on the API Bridge. The main extension then also exposes an Event Bridge command that fires callback functions registered using the proxy class. The proxy class's event registration functions associate the passed in callback function with an identifier. This identifier is then passed to the API Bridge to register the remote callback. When an event fires, the API Bridge executes the Event Bridge command and passes in this identifier so the appropriate callback can be invoked.

remote-example-api.ts (Replacement Node Module w/Event Bridge - Main Extension):

```typescript
const eventHandlers: any = {};

// Register the Event Bridge
vscode.commands.registerCommand(`_example-api.eventBridge`,
    (callbackId: string, eventName: string, value?: string): void => {
        eventHandlers[callbackId](eventName, value);
    });

export class RemoteExampleApi {

    private instanceId = uuid();

    // Generate a callbackId and register it with the API Bridge
    public async registerEventHandler(eventName: string, callback: (eventName: string, value?: string) => void): Promise<void> {
        const callbackId = uuid();
        eventHandlers[callbackId] = callback;
        return vscode.commands.executeCommand('_example-api.apiBridge', moduleId, this.instanceId, 'registerEventHandler', eventName, callbackId);
    }

    // etc...
}
```

This pattern can be abstracted so it can easily be reused with multiple classes and extensions, but a full example is too lengthy for documentation, so check out the complete example for more details.

You can find the complete example [here](https://aka.ms/vscode-remote/samples/remote-api-with-events).

## Known issues

There are a few extension problems that could be resolved with some added functionality for Workspace Extensions. The following table is a list of known issues under consideration:

| Problem | Description | GitHub issue |
|---------|-------------|--------------|
| **Blocked ports** | When working inside a Docker container or SSH server, ports are not automatically forwarded and there currently is no API to programmatically forward a port from an extension. Webviews can be adapted as [described above](#using-the-webview-api), but other scenarios currently require users to manually forward or expose ports. | [#531](https://github.com/Microsoft/vscode-remote/issues/531) |
| **Local access to remote workspace files** | In some cases, you may need to download a file from a UI extension (or helper) that is contained in the remote workspace. We are investigating options for how extensions might be able to accomplish this task. | [#640](https://github.com/Microsoft/vscode-remote/issues/640) |

## Questions and feedback

> **Dogfooding Note:**  When reporting issues, please file them against the [vscode-remote](https://github.com/Microsoft/vscode-remote/issues) repository.

- See [Tips and Tricks](/docs/remote/troubleshooting#ssh-tips) or the [FAQ](/docs/remote/faq).
- Search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- [Up-vote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new)
- Contribute a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
