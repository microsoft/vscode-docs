---
Order: 5
Area: nodejs
TOCTitle: Browser Debugging
ContentId: d0e271da-0372-4ab9-a2ab-b7add855bd5a
PageTitle: Debug Browser Apps using Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: The Visual Studio Code editor includes browser debugging support. Set breakpoints, step-in, inspect variables and more.
MetaSocialImage: ../editor/images/debugging/debugging-social.png
---
# Browser debugging in VS Code

Visual Studio Code includes a built-in debugger for Edge and Chrome. There are a couple ways to get started with it.

* Use the [Open Link](#open-link-command) command to debug a URL.
* Clicking a link in the [JavaScript debug terminal](/docs/nodejs/nodejs-debugging.md#javascript-debug-terminal).
* Use a [launch config](#launch-configuration) to launch a browser with your app.

We also have more detailed walkthroughs to get started with [React](/docs/nodejs/reactjs-tutorial), [Angular](/docs/nodejs/angular-tutorial), and [Vue](/docs/nodejs/vuejs-tutorial), as well as other debugging [recipes](/docs/nodejs/debugging-recipes).

## Open Link command

The simplest way to debug a webpage is through the **Debug: Open Link** command found in the Command Palette (`kb(workbench.action.showCommands)`). When you run this command, you'll be prompted for a URL to open, and the debugger will be attached.

![Using the Open Link command to attach to a URL](images/browser-debugging/debug-open-link.gif)

If your default browser is Edge, VS Code will use it to open the page. Otherwise, it will try to find an installation of Chrome on your system instead.

## Launch configuration

Launch configs are the traditional way to set up debugging in VS Code, and provide you the most flexibility for running complex applications.

In this section, we'll go into more detail about configurations and features for more advanced debugging scenarios. Instructions for Node.js [stepping over external code](/docs/nodejs/nodejs-debugging.md#skipping-uninteresting-code) also apply to browser-based debugging.

>**Note**: If you are just getting started with VS Code, you can learn about general debugging features and creating `launch.json` configuration files in the [Debugging](/docs/editor/debugging.md) topic.

### Launching browsers

In most cases, you'll want to start a new instance of the browser to debug your webpage or file. To do this, you can create a file named `.vscode/launch.json` that looks like this:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "msedge",
      "request": "launch",
      "name": "Launch my cool app",
      "url": "http://localhost:8000"
    }
  ]
}
```

When you hit `kb(workbench.action.debug.start)` or the **Start** button in the **Run and Debug** view, `http://localhost:8000` will be opened in debug mode. If you'd like to use Chrome instead of Edge, replace `msedge` with `chrome`.

You can also debug a single file without running a server, for example:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "msedge",
      "request": "launch",
      "name": "Launch hello.html",
      "file": "${workspaceFolder}/hello.html"
    }
  ]
}
```

### Attaching to browsers

To attach to a running browser, it needs to be launched in a special debug mode. You can do this using the following command, replacing `edge.exe` with the path to your Edge or Chrome binary:

```bash
edge.exe --remote-debugging-port=9222 --user-data-dir=remote-debug-profile
```

Setting the `--remote-debugging-port` tells the browser to listen on that port for a debug connection. Setting a separate `--user-data-dir` forces a new instance of the browser to be opened; if this flag isn't given, then the command will open a new window of any running browser and not enter debug mode.

Next, add a new section to the `vscode/launch.json` file as below:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "msedge",
      "request": "attach",
      "name": "Attach to browser",
      "port": 9222
    }
  ]
}
```

Now, you can press `kb(workbench.action.debug.start)` or the **Start** button in the **Run and Debug** view to attach to the running browser. You can even add a `host` property to debug a browser running on a different machine.

### Launch configuration attributes

Debugging configurations are stored in a `launch.json` file located in your workspace's `.vscode` folder. An introduction into the creation and use of debugging configuration files is in the general [Debugging](/docs/editor/debugging.md#launch-configurations) article. You can either "launch" a browser with your application, or "attach" to an existing browser that you [started in debug mode](#attaching-to-browsers).

Below is a reference of common `launch.json` attributes specific to browser debugging. You can view the complete set of options in the [vscode-js-debug options](https://github.com/microsoft/vscode-js-debug/blob/main/OPTIONS.md) documentation.

* `webRoot` - The root directory for your source code. Most often, and by default, the `webRoot` is your workspace folder. This option is used for sourcemap resolution.
* `outFiles` - An array of [glob patterns](/docs/editor/glob-patterns.md) for locating generated JavaScript files. See the section on [Source maps](#source-maps).
* `smartStep`- Try to automatically step over source code that doesn't map to source files. See the section on [Smart stepping](/docs/nodejs/nodejs-debugging.md#smart-stepping).
* `skipFiles` - Automatically skip files covered by these [glob patterns](/docs/editor/glob-patterns.md). See the section on [Skipping uninteresting code](/docs/nodejs/nodejs-debugging.md#skipping-uninteresting-code).
* `trace` - Enable diagnostic output.

These attributes are only available for launch configurations of request type `launch`:

* `url` - The URL to automatically open when the browser is launched.
* `runtimeExecutable` - Either an absolute path to the browser executable to use, or the version of the browser to use. Valid versions include `stable` (default), `canary`, `beta`, and `dev`.
* `runtimeArgs` - Optional arguments passed when launching the browser.

These attributes are only available for launch configurations of request type `attach`:

* `url` - If given, VS Code will attach to a tab with this URL. If not provided, it will attach to all browser tabs.
* `port` - Debug port to use. See the section on [Attaching to Node.js](/docs/nodejs/nodejs-debugging.md#attaching-to-nodejs).
* `address` - TCP/IP address of the debug port. See the section on [Attaching to Browsers](#attaching-to-browsers).

## WebAssembly Debugging

WebAssembly debugging in browsers is identical to Node.js, [read more about WebAssembly Debugging here](/docs/nodejs/nodejs-debugging.md#debugging-webassembly).

## Source Maps

The JavaScript debugger in VS Code supports source maps that allow debugging transformed code. For example, TypeScript code is compiled to JavaScript, and many web applications bundle all their JavaScript files together. The source map helps the debugger figure out how to map between your original code, and the code running in the browser.

Most modern tools used for building web applications will work out of the box. If not, our section on [sourcemaps in Node.js](/docs/nodejs/nodejs-debugging.md#source-maps) contains guidance that applies to browser debugging as well.

### Loading Source Maps

Each JavaScript file may reference a source map, by a URL or relative path. When dealing with web applications, you'll want to make sure that the URL is something the debugger running in VS Code can access. If it can't, you'll see errors in the **Debug Console** explaining which source maps failed to load, and why.

If it can't access it directly, VS Code will try to use the browser's network stack to request the source map. This provides an opportunity for any authentication state or network settings in the browser to be applied to the request. For example, if your source maps are in a location guarded by cookie authentication, VS Code can load them if and only if the browser session has the necessary cookies.

## Next steps

* [Debugging](/docs/editor/debugging.md) - Read about general VS Code debugging features.
* [Debugging Recipes](/docs/nodejs/debugging-recipes.md) - Set up debugging for your favorite platform.
