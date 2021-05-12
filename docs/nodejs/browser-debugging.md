---
Order: 5
Area: nodejs
TOCTitle: Browser Debugging
ContentId: 3AC4DBB5-1469-47FD-9CC2-6C94684D4A9D
PageTitle: Debug Browser Apps using Visual Studio Code
DateApproved: 5/5/2021
MetaDescription: The Visual Studio Code editor includes browser debugging support. Set breakpoints, step-in, inspect variables and more.
MetaSocialImage: /assets/docs/editor/debugging/Debugging.png
---
# Browser debugging in VS Code

Visual Studio Code includes a built-in debugger for Edge and Chrome. There are a couple ways to get started with it.

- Use the [Open Link](#open-link-command) command to debug a URL,
- Clicking a link in the [JavaScript debug terminal](/docs/nodejs/nodejs-debugging#_avascript-debug-terminal),
- Use a [launch config](#launch-configuration) to launch a browser with your app.

We also have more detailed walkthroughs to get started with [React](/docs/nodesjs/reactjs-tutorial), [Angular](/docs/nodesjs/angular-tutorial), [Vue](/docs/nodesjs/vuejs-tutorial), and [Ember](/docs/nodesjs/emberjs-tutorial), as well as other debugging [recipes](/docs/nodesjs/debugging-recipes).

## Open Link Command

The simplest way to debug a webpage is through the **Debug: Open Link** command found in the command palette (`kbstyle(F1)`). When you run this command, you'll be prompted for a URL to open, and the debugger will be attached.

![](./images/browser-debugging/debug-open-link.gif)

If your default browser is Edge, VS Code will use it to open the page. Otherwise, it will try to find an installation of Chrome on your system instead.

## Launch Configuration

Launch configs are the traditional way to set up debugging in VS Code, and provide you the most configuration options for running complex applications.

In this section, we'll go into more detail about configurations and features for more advanced debugging scenarios. Instructions for Node.js debugging with [source maps](/docs/nodejs/nodejs-debugging.md#source-maps) and [stepping over external code](/docs/nodejs/nodejs-debugging.md#skipping-uninteresting-code) also apply to browser-based debugging.

>**Note**: If you are just getting started with VS Code, you can learn about general debugging features and creating `launch.json` configuration files in the [Debugging](/docs/editor/debugging.md) topic.

## Launching Browsers

In most cases, you'll want to start a new instance of the browser to debug your webpage or file. To do this, you can create a file named `.vscode/launch.json` that looks like this:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-msedge",
      "request": "launch",
      "name": "Launch my cool app",
      "url": "http://localhost:8000"
    }
  ]
}
```

When you hit `kbstyle(F5)` or the "Start" button in the Debug view, `http://localhost:8000` will be opened in debug mode. If you'd like to use Chrome instead of Edge, replace `pwa-msedge` with `pwa-chrome`.

You can also debug a single file without running a server, for example:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-msedge",
      "request": "launch",
      "name": "Launch hello.html",
      "file": "${workspaceFolder}/hello.html"
    }
  ]
}
```

## Attaching to Browsers

To attach to a running browser, it needs to be launched in a special debug mode. You can do this using the following command--replacing `edge.exe` with the path to your Edge or Chrome binary:

```
edge.exe --remote-debugging-port=9222 --user-data-dir=remote-debug-profile
```

Setting the `--remote-debugging-port` tells the browser to list on that port for a debug connection. Setting a separate `--user-data-dir` forces a new instance of the browser to be opened; if this flag wasn't given, then the command would just open a new window of any running browser and not enter debug mode.

Then, add a new section to the `vscode/launch.json` file so that it looks like this:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-msedge",
      "request": "attach",
      "name": "Attach to browser",
      "port": 9222
    }
  ]
}
```

Now, you can press `kbstyle(F5)` or the "Start" button in the Debug view to attach to the running browser. You can even add a `host` property to debug a browser running on a different machine.

## Launch configuration attributes

Debugging configurations are stored in a `launch.json` file located in your workspace's `.vscode` folder. An introduction into the creation and use of debugging configuration files is in the general [Debugging](/docs/editor/debugging.md#launch-configurations) article. You can either "launch" a browser with your application, or "attach" to an existing browser that you [started in debug mode](#attaching-to-browsers).

Below is a reference of common `launch.json` attributes specific to browser debugging. You can view the complete set of options in the [vscode-js-debug options](https://github.com/microsoft/vscode-js-debug/blob/main/OPTIONS.md) documentation.

* `webRoot` - The root directory for your code. Most often, and by default, the `webRoot` is your workspace folder. This option is used for sourcemap resolution.
* `outFiles` - array of glob patterns for locating generated JavaScript files. See section [Source maps](/docs/nodejs/nodejs-debugging.md#source-maps).
* `smartStep`- try to automatically step over code that doesn't map to source files. See section [Smart stepping](/docs/nodejs/nodejs-debugging.md#smart-stepping).
* `skipFiles` - automatically skip files covered by these glob patterns. See section [Skipping uninteresting code](/docs/nodejs/nodejs-debugging.md#skipping-uninteresting-code).
* `trace` - enable diagnostic output.

These attributes are only available for launch configurations of request type `launch`:

* `url` - the URL to automatically open when the browser is launched.
* `runtimeExecutable` - either an absolute path to the browser executable to use, _or_ the version of the browser to use. Valid versions include `stable` (default), `canary`, `beta`, and `dev`.
* `runtimeArgs` - optional arguments passed when launching the browser.

These attributes are only available for launch configurations of request type `attach`:

* `url` - if given, VS Code will attach to a tab with this URL. If not provided, it will attach to all browser tabs.
* `port` - debug port to use. See sections [Attaching to Node.js](/docs/nodejs/nodejs-debugging.md#attaching-to-browsers).
* `address` - TCP/IP address of the debug port. See sections [Attaching to Browsers](/docs/nodejs/nodejs-debugging.md#attaching-to-browsers).
