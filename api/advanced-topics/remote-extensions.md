---
ContentId: 5c708951-e566-42db-9d97-e9715d95cdd1
DateApproved: 3/22/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to adding Visual Studio Code Remote Development support to extensions
---
# Supporting Remote Development

While many developers edit, build, deploy, and debug on their local machines, there are an increasing number of situations where you may need to interact with a codebase or runtime on the other side of an OS boundary. **[VS Code Remote Development](/docs/remote/remote-overview)** extensions addresses these needs by allowing your local Visual Studio Code installation and any extension provided features to transparently interact with code and runtime environments sitting on other machines (whether virtual or physical).

When using the capability, VS Code selectively runs certain extensions on the remote machine to optimize your experience. Given **no source code needs to be on your local machine** to use the capability, the approach provides dramatic performance and fidelity benefits over using network shares or synchronizing files.

As an extension author, you may be wondering how to test your extensions to validate that they work as expected when running in a remote environment. While many extensions will work unmodified, some extensions will need to be changed to function as expected. This article briefly summarizes the VS Code Remote Development architecture, explains how to test your extensions, and provides recommendations if you encounter issues.

## Architecture and extension types

While transparent to the user, VS Code Remote Development extensions use a mix of local and remotely running extensions to provide its full-fidelity development experience. VS Code attempts to infer the correct location to run an extension, if not specified, based on the type of functionality it exposes.

Currently VS Code distinguishes the following two classes of extensions:

- **UI Extensions**: These extensions make contributions to the UI only, do not access files in a workspace, and consequently can run entirely on the local machine. Examples of UI extensions are themes, snippets, language grammars, and keymaps.

- **Workspace Extensions**: These extensions access files inside a workspace either for editing or to perform some other operation such as providing IntelliSense. A Workspace Extension could provide rich, multi-file language services, add a debugger, or perform an operation on multiple files in workspace (either itself or by firing a CLI command).

When you install an extension, VS Code will place it in the correct location based on its type - UI Extensions run in VS Code's **[local Extension Host](/api/advanced-topics/extension-host)** while Workspace Extensions run in a **Remote Extension Host** that sits in a small **VS Code Remote Server**. This server is automatically installed (or updated) once you open a folder in WSL, in a container, or on a remote SSH host. (VS Code also automatically manages starting and stopping the server, so users are often not aware of its presence.)

![Architecture diagram](images/remote-extensions/architecture.png)

The VS Code APIs are designed to automatically run on the correct side (local or remote) when used from either UI or Workspace extensions. However, if your extension makes use of local APIs not provided by VS Code you may see issues. As a result, we recommend that you use VS Code Remote Development to **test** your own extensions.

Specifically, we recommend testing your extension using a local **[dev container](/docs/remote/containers)** since they are cross-platform, easy to set up, and restrict port and file system access by default. Combined with a very thin OS footprint, dev containers provide the environment where your extension is most likely to hit a problem (if it has one at all). WSL, on the other hand, is typically the least restrictive, with SSH being somewhere in the middle. In most cases, only small adjustments are needed (if any) to resolve issues. See [common problems](#common-problems) for more information.

## Testing and debugging your extension

While you can test your extension in VS Code Remote Development by installing your extension from the Marketplace, if you encounter a problem, you'll want to be able to test a development version of your extension. This section outlines how this can be accomplished.

### Installing a development version of your extension

Currently, any time VS Code automatically installs an extension on a SSH host or inside a container or WSL, the Marketplace version is used (and not the version already installed on your local machine). While this makes sense in most situations, you may want to use an unpublished version of your extension for testing. To install an unpublished version of your extension, you can package the extension as a `VSIX` and manually install it into an VS Code window that is already connected to a running remote environment.

Follow these steps:

1. Use `vsce package` to package your extension as a VSIX.
2. Connect to a [development container](/docs/remote/containers), [SSH host](/docs/remote/ssh), or [WSL environment](/docs/remote/wsl).
3. Use the **Install from VSIX...** available in the Extensions view **More Actions** (`...`) menu to install the extension in this specific window (not a local one).
4. Reload when prompted.

> **Tip:** Once installed, you can use the **Developer: Show Running Extensions** command to see whether VS Code is running the extension locally or remotely.

### Debugging your extension in a remote environment

#### Using a development container

You can edit and debug your extension in a container by following these steps.

1. Add a `.devcontainer/devcontainer.json` or `.devcontainer.json` file with the [appropriate contents](/docs/remote/containers#creating-configuration-files-for-existing-projects) to your extension source code folder.

   For example:

    ```json
    {
        "name": "Extension Container",
        "image": "debian:9"
    }
    ```

2. Edit your `launch.json` to add a second argument to the `args` property that points to the path of a test project or your test data in your workspace folder or that will be in the container when it starts. (Note: You cannot use the workspace folder itself.) By default user's home folder (`$HOME`) is used. For example, if your test data is in a `data` folder in your workspace, you'd add `${workspaceFolder}/data` as follows:

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

3. Run **Remote-Containers: Reopen Folder in Container** and in a moment, your VS Code will set up the container and connect. You can now edit your source code as you would in the local case.

4. Finally, **F5 / use the the debug panel** to launch the extension and attach the debugger as you would locally. The window that appears will now contain your extension running inside this same container with the debugger attached to it.

#### Using SSH or WSL

You can edit and debug your extension on a remote **[SSH host](/docs/remote/ssh)** or in **[WSL](/docs/remote/wsl)** by following similar steps to the container case.

1. For SSH, you'll need to instead open a copy of the extension project on the remote host (for example by using the **Remote-SSH: New Window...** command, and then **File** > **Open** to select the cloned copy of the extension.) For WSL, open the local folder containing your extension project in WSL (for example by using **File > New WSL Window** and then **File** > **Open** to select the folder).

2. Once the folder is open on the SSH host / in WSL, you can edit your source code as you would in the local case.

3. Finally, **F5 / use the the debug panel** to launch the extension and attach the debugger as you would locally. The window that appears will now contain your extension running on the SSH Host / in WSL with the debugger attached to it.

## Common problems

VS Code's base APIs are designed to automatically run in the right location regardless of where your extension happens to be located. With this in mind, there are a few APIs that will help you avoid unexpected behavior.

### Incorrect execution location

If your extension is not functioning as expected, it may be running in the wrong location. You can use the command **Developer: Show Running Extensions** to verify where the extension is running. You can also find any installed Workspace extensions in the  `~/.vscode-remote` folder on your remote machine / VM / container.

If the location is incorrect, you can explicitly specify which location category the extension fits into using the `extensionKind` property in your extension's `package.json`.

```json
"extensionKind": "ui"
```

A value of `ui` will force the extension to run on the client. A value of `workspace` will force the extension to run inside the VS Code Remote Server.

You can **test** whether switching your extension to a UI extension will solve your problem with the `remote.extensionKind` option in `settings.json`. This allows you to test in-marketplace versions of extensions without having to modify their `package.json` file. The value of the setting is an array of extension IDs. For example, this will force the Docker extension on the UI side (instead of its Workspace default) and the Debugger for Chrome on the Workspace side (instead of its UI default):

````json
"remote.extensionKind": {
    "peterjausovec.vscode-docker": "ui",
    "msjsdiag.debugger-for-chrome": "workspace"
}
````

### Persisting extension data or state

In some cases, your extension may need to persist state information that does not belong in `settings.json` or a separate workspace configuration file (e.g. `.eslintrc`). To solve this problem, VS Code provides a set of helpful storage properties on the `vscode.ExtensionContext` object passed to your extension during activation. If your extension already takes advantage of these properties, it should continue to function regardless of where it runs.

However, if your extension relies on current VS Code pathing conventions (e.g. `~/.vscode`) or the presence certain OS folders (e.g. `~/.config/Code` on Linux) to persist data, you may run into problems. Fortunately, it should be simple to update your extension and avoid these challenges.

If you are persisting simple key-value pairs, you can store workspace specific or global state information using `vscode.ExtensionContext.workspaceState` or `vscode.ExtensionContext.globalState` respectively. If your data is more complicated than key-value pairs, the  `globalStoragePath` and `storagePath` properties provide "safe" paths that you can use to read/write global workspace specific information in a file.

It was added to version 1.30 of VS Code, so you can update your `engines.vscode` value in `package.json` to avoid having to do feature detection:

```json
"engines": {
    "vscode": "^1.31.0"
}
```

After this setting is in place, only versions of VS Code with support will get the updated version of the extension once you publish it. You can then use it as follows:

```TypeScript
export function activate(context: vscode.ExtensionContext) {
    const extensionGlobalStoragePath = context.globalStoragePath;

    // Verify the cross-extension global storage path exists, create it if not
    const storageBasePath = path.resolve(context.globalStoragePath, '..');
    if (!fs.existsSync(storageBasePath)) {
        fs.mkdirSync(storageBasePath);
    }
    // Create extension's global storage path
    if (!fs.existsSync(extensionGlobalStoragePath)) {
        fs.mkdirSync(extensionGlobalStoragePath);
    }
}
```

### Persisting secrets

If your Workspace Extension needs to persist passwords or other secrets, you may want to use your local operating system's secret store (Windows Cert Store, the macOS KeyChain, a libsecret based keyring on Linux) rather than the one on the remote machine. Further, on Linux you may be relying on `libsecret` and by extension `gnome-keyring` to store your secrets, and this does not typically work well on server distros or in a Docker container.

Visual Studio Code does not provide a secret persistence mechanism itself, but many extension authors have opted to use the [`keytar` node module](https://www.npmjs.com/package/keytar) for this purpose. For this reason, VS Code includes `keytar` and will **automatically and transparently** run it locally if referenced in an Workspace Extension. That way you can always take advantage of the local OS keychain / keyring / cert store and avoid the problems mentioned above. For example:

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

If you prefer not to use `keytar`, you can instead use a "Helper Extension" to run your secret persistance code. See [below](#access-local-or-remote-apis-using-a-helper-extension) for details.

### Using the clipboard

Historically, extension authors have relied on Node.js modules like "clipboardy" interact with the clipboard from an extension. Unfortunately, if you use these modules from a Workspace Extension, you will be interacting with the remote clipboard instead of the local one.

Fortunately, VS Code now has a clipboard API that solves this problem. It will always run locally regardless of the type of extension that calls it. It was added to version 1.30 of VS Code, so you can update your `engines.vscode` value in `package.json` to avoid having to do feature detection:

```json
"engines": {
    "vscode": "^1.30.0"
}
```

After this setting is in place, only versions of VS Code with support will get the updated version of the extension once you publish it. You can then use it as follows:

```typescript
import * as vscode from 'vscode';

// Read from clipboard
const text = await vscode.env.clipboard.readText();
// Write to clipboard
await vscode.env.clipboard.writeText('some text to put in clipboard');
```

Note that you can do feature detection instead of updating the engine version if you would prefer by checking to see if `(<any>vscode.env).clipboard` exists and falling back to your current logic if not. However, we generally recommend just updating the engine version instead.

### Opening something in a local browser or application

Spawning a process or using a module like `opn` to launch a browser or other application for particular URI can work well for local scenarios, but Workspace extensions run remotely which can cause the the application to launch on the wrong side. VS Code Remote Development **partially** shims the `opn` node module to allow existing extensions to function. You can call the module with a URI and VS Code will cause the default application for the URI to appear on the client side. However, this is not a complete implementation as options are not support and a `child_process` object is not returned.

Instead of relying on a 3rd party node module, we recommend extensions take advantage of the `vscode.env.openExternal` method to launch the default registered application on your local operating system for given URI. Even better `vscode.env.openExternal` **does automatic port forwarding!** You can use it to point to a local web server on a remote machine and serve up content even if that port is blocked externally.

It was added to version 1.31 of VS Code, so you can update your `engines.vscode` value in `package.json` to avoid having to do feature detection:

```json
"engines": {
    "vscode": "^1.31.0"
}
```

After this setting is in place, only versions of VS Code with support will get the updated version of the extension once you publish it. You can then use it as follows:

```typescript
import * as vscode from 'vscode';

// Example 1 - Open the VS Code homepage in the default browser.
vscode.env.openExternal(vscode.Uri.parse('https://code.visualstudio.com'));

// Example 2 - Open the default email application.
vscode.env.openExternal(vscode.Uri.parse('mailto:vscode@microsoft.com'));
```

Note that you can do feature detection instead of updating the engine version if you would prefer by checking to see if `(<any>vscode.env).openExternal` exists and falling back to your current logic if not. However, we generally recommend just updating the engine version instead.

If you need to do something more sophisticated like launch an arbitrary application, you can use a Helper Extension. See [below](#accessing-local-apis-using-a-helper-extension) for details.

### Communicating between extensions using commands

Some extensions return APIs as a part of their activation function that are intended for other extensions to use (via `vscode.extension.getExtension(extensionName).exports`). While these will work if all extensions involved are on the same side (either all UI extensions or all Workspace extensions), these will not work between UI and Workspace extensions.

Fortunately, VS Code automatically routes any executed commands to the correct extension regardless of its location. You can freely invoke any simple or complex command (including those provided by other extensions) without worrying about impacts. If you have a set of extensions that need to interact with one another, exposing functionality using a private command can help you avoid unexpected impacts. Private commands are prefixed with an underscore ("_"). For example:

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

You can also use the command interface in more sophisticated ways to bridge APIs between extensions or to invoke custom local APIs from Workspace. See [Accessing local APIs using a Helper Extension](#accessing-local-apis-using-a-helper-extension) for details.

## Using the WebView API

> **Note:** The `vscode.previewHtml` command has been deprecated in favor of a new WebView API. The previewHTML command is not supported remotely was removed in VS Code version 1.33.

Like the clipboard API, the [WebView API](/api/extension-guides/webview) will automatically run on the client if called from a Workspace extension.

However, any content local to your extension should be accessed using the `vscode-resource` scheme instead of "localhost" or the file scheme. The `vscode-resource` scheme will automatically route to the correct location while localhost and the file scheme will not. Be sure to add the `vscode-resource` scheme into any content security policy on your page. E.g.:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src vscode-resource:; style-src vscode-resource:;">
```

### Using content or services hosted in a web server started by the extension

While VS Code transparently deals with executing its own APIs on the correct side (local or remote), the WebView is effectively a mini-browser that can do things outside of VS Code's API set. When the WebView points at a web service or server outside of VS Code itself, VS Code simply does not know about it and therefore cannot transparently handle this kind of content. In the Container and SSH cases, it's import to note that local ports (like those of any web server your extension starts) is on will often be blocked.

Consider this illustration:

![WebView Problem](images/remote-extensions/webview-problem.png)

While we recommend using the [message passing](/api/extension-guides/webview.m#scripts-and-message-passing) pattern rather than using a local web server to serve up content or data, you can resolve this problem by **adding a port mapping** when you create the WebView. This is applied in both the local and remote cases, so you can use always use a static port in your web content even if your web server is on a dynamic port.

It was added to version 1.34 of VS Code, so you can update your `engines.vscode` value in `package.json` to avoid having to do feature detection:

```json
"engines": {
    "vscode": "^1.34.0"
}
```

After this setting is in place, only versions of VS Code with support will get the updated version of the extension once you publish it. You can then use it as follows:

```typescript
const STATIC_PORT = 3000;
const dynamicServerPort = getExpressServerPort();
const webviewPort = STATIC_PORT;

// Create WebView and pass portMapping in
const panel = vscode.window.createWebviewPanel(
    'remoteMappingExample',
    'Remote Mapping Example',
    vscode.ViewColumn.One, <any>{
        portMapping: [
            // Map localhost:3000 in the webview to the express server port on the remote host.
            { webviewPort: webviewPort, extensionHostPort: dynamicServerPort }
        ]
    });

// Reference the "webviewPort" variable in any full URIs you reference in your HTML.
panel.webview.html =  `<!DOCTYPE html>
    <body>
        <!-- This will resolve to the dynamic server port on the remote machine -->
        <img src="http://localhost:${webviewPort}/canvas.png">
    </body>
    </html>`;
```

With this change, the WebView traffic will instead use VS Code's existing communication channel to solve the problem.

![WebView Solution](images/remote-extensions/webview-solution.png)

The engine setting above will **ensure only versions of VS Code with this API get your extension update**. Previous versions of VS Code will **simply get the older version** of your extension.

However, if you need to be able to **release updates to multiple versions of VS Code**, you can change the code above slightly to handle this situation:

```TypeScript
const STATIC_PORT = 3000;
const dynamicServerPort = getExpressServerPort();
// Use STATIC_PORT in VS Code >= 1.34 (w/ portMapping support) and the dynamicServerPort
// in older versions where the portMapping property will simply be ignored.
const [ major, minor, ...rest ] = <number[]>vscode.version.split('.').map((ver) => parseInt(ver));
const webviewPort = ( major > 1 || (major === 1 && minor >= 34)) ? STATIC_PORT : dynamicServerPort;
```

However, we generally recommend just updating the engine version instead as this will require less testing.

See the [WebView API guide](/api/extension-guides/webview) for more details on its use.

## Accessing local APIs using a Helper Extension

While VS Code's APIs are designed to run in the correct location automatically, you may run into cases where you have code in a Workspace Extension that needs to relies on a local, non-VS Code provided API, command, module, or runtime. In others, you may have a UI Extension that makes use of many local APIs and has a few features that need to interact directly with remote workspace files.

To get this kind of "split" functionality working, you can create a "Helper" Extension that encapsulates the needed functionality and exposes a set of private VS Code commands. Your primary main Workspace or UI Extension can then execute these commands and VS Code will automatically handle routing them to wherever your Helper extension happens to be running.

### Helper Extension Examples

Often it is easiest to understand a concept by looking at examples. With that in mind, here are several you can jump to that show what is described below:

- [Basic Helper Extension](https://aka.ms/vscode-remote/samples/helper-extension)
- [Proxying an existing API - Basic](https://aka.ms/vscode-remote/samples/remote-api)
- [Proxying an existing API - API Class w/Events](https://aka.ms/vscode-remote/samples/remote-api-with-events)

### Basic Helper Extension

To illustrate how the Helper Extension pattern can cover a wide variety of scenarios, let's start with a basic example where we will surface an "echo" command in a UI Helper Extension that can be called by a Workspace Extension.

![Basic Helper Extension Architecture](images/remote-extensions/basic-helper.png)

The key to the definition of a helper extension to add `"api": "none"` to `package.json` so that both UI and Workspace extensions can add the helper as a dependency. This tells VS Code that it can safely ignore any synchronous APIs returned as a part of the extension's activation function as all cross-extension communication with it will be done through commands.

*package.json (Helper Extension)*

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

While the `package.json` above activates when an `_helper-extension.echo` command command is executed, the command is private and is therefore not added to the contributions list. Instead, it is justed registered in the extension code.

*extension.ts (Helper Extension)*

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

The related main Workspace Extension can now add the Helper Extension as a dependency execute the registered private echo command. Once both are published to the marketplace, installing the main Workspace Extension would cause the Helper Extension to be installed as well.

*package.json (Main Workspace Extension)*

```json
{
    "name": "main-extension",
    "extensionKind": "workspace",
    "extensionDependencies": [
       "helper-extension"
    ]
}
```

*extension.ts (Main Workspace Extension)*

```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    // Execute the echo command
    await vscode.commands.executeCommand('_helper-extension.echo', 'Hello!');
}
```

**[Click here to see a complete example.](https://aka.ms/vscode-remote/samples/helper-extension)**

### Proxying an existing API

In some cases, you may have an existing node module that is used in many places in your extension and updating each location to use a command is too time-consuming. If you are only using async functions on the module (or these functions return a promise), you can create a drop-in replacement **proxy API module** that executes an **API Bridge** command in a Helper Extension to call the actual API.

![ApiBridge Architecture](images/remote-extensions/api-bridge.png)

For example, imagine the [simple echo command above](#accessing-local-apis-using-a-helper-extension) was part of common node module.

*example-api.ts*

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

*extension.ts (Helper Extension)*

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

*remote-example-api.ts (Replacement Node Module - Main Extension)*

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

Finally, any we update any imports that reference `example-api` in the main Workspace Extension to `remote-example-api`. At this point, the main extension will function like it did before but the API's function calls will be executed on the UI side instead.

*extension.ts* (Main Workspace Extension)
```typescript
import * as vscode from 'vscode';
import * as exampleApi from 'remote-example-api'; // Change the import

export async function activate(context: vscode.ExtensionContext) {
        // Existing exampleApi calls all now work, but will execute on the UI side!
        await exampleApi.echo('Hello! I will ping you again in 10 seconds.');
        await exampleApi.setEchoTimer('Hello again!', 10000);
}
```

**[Click here to see a complete example.](https://aka.ms/vscode-remote/samples/remote-api)**

### Proxying APIs with Events

A more difficult situation arises if you need to remotely access an API that has an event. These bi-directional APIs often use objects instead of straight modules which further complicates things. To resolve these challenges, you can use a pattern that establishes an **API Bridge** command on in a Helper Extension and an **Event Bridge** in your main extension that handles the execution of event callbacks.

![ApiBridge/ApiEventBridge Architecture](images/remote-extensions/api-event-bridge.png)

Under this model, the Helper Extension's API Bridge associates a unique identifier with each instance of the API object that is created. The API Bridge exposes a command that allows the main extension to call functions for a given API instance using this identifier. For functions that register event callbacks, the API Bridge uses a stub callback function that executes a command on the Event Bridge.

*extension.ts (Helper Extension w/API Bridge)*

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

*remote-example-api.ts (Replacement Node Module w/Event Bridge - Main Extension)*

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

**[Click here to see a complete example.](https://aka.ms/vscode-remote/samples/remote-api-with-events)**

## Known issues

There are a few extension problems that could be resolved with some added functionality for Workspace Extensions. The following is a list of known issues under consideration:

| Problem | Description | GitHub issue |
|---------|-------------|--------------|
| **Blocked ports** | When working inside a Docker container or SSH server, ports are not automatically forwarded and there currently is no API to programmatically forward a port from an extension. WebViews can be adapted as [described above](#using-the-webview-api), but other scenarios currently require users to manually forward or expose ports. | [#531](https://github.com/Microsoft/vscode-remote/issues/531) |
| **Local access to remote workspace files** | In some cases you may need to download a file from a UI extension (or helper) that is contained in the remote workspace. We are investigating options for how extensions might be able to accomplish this task. | [#640](https://github.com/Microsoft/vscode-remote/issues/640) |

## Questions and feedback

> **Dogfooding Note:**  When reporting issues, please file them against the https://github.com/Microsoft/vscode-remote/issues repository.

- See [Tips and Tricks](/docs/remote/troubleshooting#ssh-tips) or the [FAQ](/docs/remote/faq).
- Search for answers on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode).
- [Up-vote a feature or request a new one](https://aka.ms/vscode-remote/feature-requests), search [existing issues](https://aka.ms/vscode-remote/issues), or [report a problem](https://aka.ms/vscode-remote/issues/new)
- Contribute a [development container definition](https://aka.ms/vscode-dev-containers) for others to use.
- Contribute to [our documentation](https://github.com/Microsoft/vscode-docs) or [VS Code itself](https://github.com/Microsoft/vscode).
- ...and more. See our [CONTRIBUTING](https://aka.ms/vscode-remote/contributing) guide for details.
