---
Order: 6
Area: editor
TOCTitle: Debugging
ContentId: 4E9A74AA-D778-4D1C-B369-83763B3C340F
PageTitle: Debugging in Visual Studio Code
DateApproved: 12/14/2016
MetaDescription: One of the great things in Visual Studio Code is debugging support.  Set breakpoints, step-in, inspect variables and more.
MetaSocialImage: debugging_Debugging.png
---

# Debugging

One of the key features of Visual Studio Code is its great debugging support. VS Code's built-in debugger helps accelerate your edit, compile and debug loop.

![Debugging diagram](images/debugging/debugging_hero.png)

## Debugger Extensions

VS Code has built-in debugging support for the [Node.js](https://nodejs.org/) runtime and can debug JavaScript, TypeScript, and any other language that gets transpiled to JavaScript.

For debugging other languages and runtimes (including [PHP](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug), [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby), [Go](https://marketplace.visualstudio.com/items?itemName=lukehoban.Go), [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp), [Python](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python) and many others), please look for `Debuggers` [extensions](/docs/editor/extension-gallery.md) in our VS Code [Marketplace](https://marketplace.visualstudio.com/vscode/Debuggers).

Below are several popular extension which include debugging support:

<div class="marketplace-extensions-debuggers"></div>

> Tip: The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you.

## Start Debugging

The following documentation is based on the built-in [Node.js](https://nodejs.org/) debugger, but most of the concepts and features are applicable to other debuggers as well.

It is helpful to first create a sample Node.js application before reading about debugging. You can follow the [Node.js walkthrough](/docs/runtimes/nodejs.md) to install Node.js and create a simple "Hello World" JavaScript application (`app.js`). Once you have a simple application all set up, this page will take you through VS Code debugging features.

## Debug View

To bring up the Debug view, click on the Debugging icon in the View Bar on the side of VS Code.

![Debug icon](images/debugging/debugicon.png)

The Debug view displays all information related to debugging and has a top bar with debugging commands and configuration settings.

## Launch Configurations

To debug your app in VS Code, you'll first need to set up your launch configuration file - `launch.json`. Click on the Configure gear icon on the Debug view top bar, choose your debug environment and VS Code will generate a `launch.json` file under your workspace's `.vscode` folder.

Here is the one generated for Node.js debugging:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceRoot}/app.js",
            "cwd": "${workspaceRoot}"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach to Process",
            "port": 5858
        }
    ]
}
```

Please note that the attributes available in these launch configurations vary from debugger to debugger. You can use IntelliSense to find out which attributes exist for a specific debugger. In addition, hover help is available for all attributes. If you see green squigglies in your launch configuration, hover over them to learn what the problem is and try to fix them before launching a debug session.

In VS Code, we support launching your app in debug mode or attaching to an already running app. Depending on the request (`attach` or `launch`) different attributes are required and our `launch.json` validation and suggestions should help with that.

Review the generated values and make sure that they make sense for your project and debugging environment. You can add additional configurations to the `launch.json` (use hover and IntelliSense to help).

Select the configuration named `Launch` using the **Configuration dropdown** in the Debug view. Once you have your launch configuration set, start your debug session with `kb(workbench.action.debug.start)`.

## Debug actions

Once a debug session starts, the **Debug actions pane** will appear on the top of the editor.

![Debug Actions](images/debugging/actions.png)

* Continue / Pause `kb(workbench.action.debug.continue)`
* Step Over `kb(workbench.action.debug.stepOver)`
* Step Into `kb(workbench.action.debug.stepInto)`
* Step Out `kb(workbench.action.debug.stepOut)`
* Restart `kb(workbench.action.debug.restart)`
* Stop `kb(workbench.action.debug.stop)`

## Launch.json attributes

There are many `launch.json` attributes to help support different debuggers and debugging scenarios. As mentioned above, you can use IntelliSense (`kb(editor.action.triggerSuggest)`) to see the list of available attributes.

![launch json suggestions](images/debugging/launch-json-suggestions.png)

Some attributes are common to most debuggers:

* `type` - type of configuration which maps to the registered debug extension (`node`, `php`, `go`)
* `request`- debug request, either to launch or attach
* `name`- friendly name which appears in the Debug launch configuration dropdown
* `program` - executable or file to run when launching the debugger
* `cwd` - current working directory for finding dependencies and other files
* `port` - port when attaching to a running process
* `stopOnEntry` - break immediately when the program launches
* `internalConsoleOptions` - control visibility of the Debug Console panel during a debugging session

To launch a task before the start of each debug session, set the `preLaunchTask` to the name of one of the tasks specified in [tasks.json](/docs/editor/tasks.md) (located under the workspace's `.vscode` folder).

## Variable substitution

VS Code supports variable substitution inside strings in `launch.json` and has the following predefined variables:

- **${workspaceRoot}** the path of the folder opened in VS Code
- **${workspaceRootFolderName}** the name of the folder opened in VS Code without any slashes (/)
- **${file}** the current opened file
- **${relativeFile}** the current opened file relative to `workspaceRoot`
- **${fileBasename}** the current opened file's basename
- **${fileBasenameNoExtension}** the current opened file's basename without the extension
- **${fileDirname}** the current opened file's dirname
- **${fileExtname}** the current opened file's extension
- **${cwd}** the task runner's current working directory on startup


You can also reference environment variables through **${env.Name}** (e.g. ${env.PATH}). Be sure to match the environment variable name's casing, for example `${env.Path}` on Windows.


```json
{
    "type": "node",
    "request": "launch",
    "type": "node",
    "name": "Launch Program",
    "program": "${workspaceRoot}/app.js",
    "cwd": "${workspaceRoot}",
    "args": [ "${env.USERNAME}" ]
}
```

You can also reference VS Code settings using **${config.NAME}** (for example: `${config.editor.fontSize}`).

## Run mode

In addition to debugging a program, VS Code supports running the program. The **Run** action is triggered with `kb(workbench.action.debug.run)` and uses the currently selected launch configuration. Many of the launch configuration attributes are supported in 'Run' mode. VS Code maintains a debug session while the program is running and pressing the **Stop** button terminates the program.

Please note: The **Run** action is always available, but a debugger extension has to 'opt-in' in order to support 'Run'. If a debugger extension has not been updated, 'Run' will fall back to 'Debug' (the built-in Node.js Debug and [Mono Debug](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug) already support 'Run').

## Breakpoints

Breakpoints can be toggled by clicking on the **editor margin**. Finer breakpoint control (enable/disable/reapply) can be done in the Debug view's **BREAKPOINTS** section.

* Breakpoints in the editor margin are normally shown as red filled circles.
* Disabled breakpoints have a filled gray circle.
* When a debugging sessions starts, breakpoints that cannot be registered with the debugger change to a gray hollow circle.

![Debug Breakpoints](images/debugging/breakpoints.png)

The `Reapply All Breakpoints` command sets all breakpoints again to their original location. This is helpful if your debug environment is "lazy" and "misplaces" breakpoints in source code that has not yet been executed. (For details see below under __Node Debugging: Breakpoint Validation__)

## Conditional breakpoints

A powerful VS Code debugging feature is the ability to set conditions either based on expressions or hit counts. When you create a new breakpoint, you have the option to **Add Breakpoint** or a **Add Conditional Breakpoint**. If you add a conditional breakpoint, you have a dropdown to choose either an **Expression** or **Hit Count** condition.

>**Note:** Not every debugger extension supports conditional breakpoints in which case you won't see the **Add Conditional Breakpoint** action.

### Expression condition

The breakpoint will be hit whenever the expression evaluates to `true`.

### Hit count condition

The 'hit count condition' controls how many times a breakpoint needs to be hit before it will 'break' execution.

![HitCount](images/1_7/hitCount.gif)

Whether a 'hit count condition' is respected and how the exact syntax of the expression looks like depends on the debugger extension used. In this milestone, only the built-in Node.js debugger supports hit counts (but we hope other debugger extensions will follow soon).

The hit count syntax supported by the Node.js debugger is either an integer or one of the operators `<`, `<=`, `=`, `>`, `>=`, `%` followed by an integer.

Some examples:

- `>10` break always after 10 hits
- `<3` break on the first two hits only
- `10` same as `>=10`
- `%2` break on every other hit

## Function breakpoints

Instead of placing breakpoints directly in source code, a debugger can support creating breakpoints by specifying a function name. This is useful in situations where source is not available but a function name is known.

A 'function breakpoint' is created by pressing the **+** button in the **BREAKPOINTS** section header:

![function breakpoint](images/debugging/function-breakpoint.gif)

**Please note**: Function breakpoints support is limited because:

- Not every debug extension supports function breakpoints (the Node.js debugger in VS Code does).
- Function breakpoints only work for global, non-native functions.
- Function breakpoints can only be created if the function has been defined (seen by the debugger).

## Data inspection

Variables can be inspected in the **VARIABLES** section of the Debug view or by hovering over their source in the editor. Variables and expression evaluation is relative to the selected stack frame in the **CALL STACK** section.

![Debug Variables](images/debugging/variables.png)

Variables and expressions can also be evaluated and watched in the Debug view **WATCH** section.

![Debug Watch](images/debugging/watch.png)

## Debug Console

Expressions can be evaluated in the **Debug Console**. To open the Debug Console, use the **Open Console** action at the top of the Debug pane or using the **Command Palette** (`kb(workbench.action.showCommands)`).

![Debug Console](images/debugging/debugconsole.png)

## Node Debugging

The following sections are specific to the Node.js debugger.

### Node Console

By default, Node.js debug sessions launch the target in the internal VS Code Debug Console. Since the Debug Console does not support programs that need to read input from the console, you can enable either an external, native console or use the VS Code Integrated Terminal by setting the attribute `console` to `externalTerminal` or `integratedTerminal` respectively in your launch configuration.

### Breakpoint Validation

For performance reasons, Node.js parses the functions inside JavaScript files lazily on first access. As a consequence, breakpoints don't work in source code areas that haven't been seen (parsed) by Node.js.

Since this behavior is not ideal for debugging, VS Code passes the `--nolazy` option to Node.js automatically. This prevents the delayed parsing and ensures that breakpoints can be validated before running the code (so they no longer "jump").

Since the `--nolazy` option might increase the start-up time of the debug target significantly, you can easily opt out by passing a `--lazy` as a `runtimeArgs` attribute.

When doing so you will find that some of your breakpoints don't "stick" to the line requested but instead "jump" for the next possible line in already-parsed code. To avoid confusion, VS Code always shows breakpoints at the location where Node.js thinks the breakpoint is. In the **BREAKPOINTS** section, these breakpoints are shown with an arrow between requested and actual line number:

![Breakpoints View](images/debugging/breakpointsvalidation.png)

This breakpoint validation occurs when a session starts and the breakpoints are registered with Node.js, or when a session is already running and a new breakpoint is set. In this case, the breakpoint may "jump" to a different location. After Node.js has parsed all the code (e.g. by running through it), breakpoints can be easily re-applied to the requested locations with the **Reapply** button in the **BREAKPOINTS** section header. This should make the breakpoints "jump back" to the requested location.

![Breakpoint Actions](images/debugging/breakpointstoolbar.png)

### JavaScript Source Maps

The Node.js debugger of VS Code supports JavaScript Source Maps which help debugging of transpiled languages, e.g. TypeScript or minified/uglified JavaScript. With source maps, it is possible to single step through or set breakpoints in the original source. If no source map exists for the original source or if the source map is broken and cannot successfully map between the source and the generated JavaScript, the breakpoints are shown as gray hollow circles.

The source map feature is enabled by setting the `sourceMaps` attribute to `true` in the launch configuration. With that you can now specify a source file (e.g. app.ts) with the `program` attribute. If the generated (transpiled) JavaScript files do not live next to their source but in a separate directory, you can help the VS Code debugger locate them by setting the `outFiles` attribute. Whenever you set a breakpoint in the original source, VS Code tries to find the generated source by searching the files specified by glob patterns in `outFiles`. Once it finds the generated source, it looks for its associated source map.

Since source maps are not automatically created, you must configure the TypeScript compiler to create them:

```
tsc --sourceMap --outDir bin app.ts
```

This is the corresponding launch configuration for a TypeScript program:

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Launch TypeScript",
			"type": "node",
			"request": "launch",
			"program": "app.ts",
			"sourceMaps": true,
			"outFiles": ["${workspaceRoot}/bin/**/*.js"]
		}
	]
}
```

Source maps can be generated with two kinds of inlining:

* **Inlined source maps**: the generated JavaScript file contains the source map as a data URI at the end (instead of referencing the source map through a file URI).
* **Inlined source**: the source map contains the original source (instead of referencing the source through a path).

VS Code supports both the **inlined source maps** and the **inlined source**.

### Attaching VS Code to Node.js

If you want to attach the VS Code debugger to a Node.js program, launch Node.js as follows:

```
node --debug program.js
or
node --debug-brk program.js
```

With the `--debug-brk` option, Node.js stops on the first line of the program.

The corresponding launch configuration looks like this:

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Attach to Node",
			"type": "node",
			"request": "attach",
			"port": 5858,
			"restart": false
		}
	]
}
```

The `restart` attribute controls whether the Node.js debugger automatically restarts after the debug session has ended. This feature is useful if you use [nodemon](http://nodemon.io) to restart Node.js on file changes. Setting the launch configuration attribute `restart` to `true` makes node-debug automatically try to re-attach to Node.js after Node.js has terminated.

On the command line, start your Node.js program `server.js` with **nodemon**:

```bash
nodemon --debug server.js
```

In VS Code, set the `restart` attribute to `true` in the 'attach' launch configuration.

>**Tip:** Pressing the **Stop** button stops the debug session and disconnects from Node.js, but **nodemon** (and Node.js) will continue to run. To stop **nodemon**, you will have to kill it from the command line.

>**Tip:** In case of syntax errors, **nodemon** will not be able to start Node.js successfully until the error has been fixed. In this case, VS Code will continue trying to attach to Node.js but eventually give up (after 10 seconds). To avoid this, you can increase the timeout by adding a `timeout` attribute with a larger value (in milliseconds).

### Remote Debugging Node.js

The Node.js debugger supports remote debugging for recent versions of Node.js (>= 4.x). Specify a remote host via the `address` attribute.

By default, VS Code will stream the debugged source from the remote Node.js folder to the local VS Code and show it in a read-only editor. You can step through this code, but cannot modify it. If you want VS Code to open the editable source from your workspace instead, you can setup a mapping between the remote and local locations. The `attach` launch configuration supports a `localRoot` and a `remoteRoot` attribute that can be used to map paths between a local VS Code project and a (remote) Node.js folder. This works even locally on the same system or across different operating systems. Whenever a code path needs to be converted from the remote Node.js folder to a local VS Code path, the `remoteRoot` path is stripped off the path and replaced by `localRoot`. For the reverse conversion, the `localRoot` path is replaced by the `remoteRoot`.

### Just My Code (`skipFiles`)

This feature allows you to avoid code that you don't want to step through. It can be enabled with the `skipFiles` setting in your launch configuration. `skipFiles` is an array of glob patterns for script paths to skip.

For example using:

```typescript
  "skipFiles": [
    "node_modules/**/*.js",
    "lib/**/*.js"
  ]
```

all code in the 'node_modules' and 'lib' folders will be skipped. The exact rules are as follows:

* If you step into a skipped file, you won't stop there - you will stop on the next executed line that is not in a skipped file.
* If you have set the option to break on thrown exceptions, then you won't break on exceptions thrown from skipped files.
* If you set a breakpoint in a skipped file, you will stop at that breakpoint, and you will be able to step through it until you step out of it, at which point normal skipping behavior will resume.

This feature is available in the `node` and `node2` debuggers.

>**Note:** The old debugger (`node`) supports negative glob patterns, but they must **follow** a positive pattern: positive patterns add to the set of skipped files, while negative patterns subtract from that set. In the following example all but a 'math' module is skipped:

```typescript
"skipFiles": [
    "node_modules/**/*.js",
    "!node_modules/math/**/*.js"
]
```

>**Note:** The old debugger (`node`) has to emulate the _Just My Code_ feature because the _V8 Debugger Protocol_ does not support it natively. This might result in slow stepping performance.

### Smart step

With the `smartStep` attribute set to `true` in a launch configuration, VS Code will automatically skip 'uninteresting code' when stepping through code in the debugger. 'Uninteresting code' is code that is generated by a transpiling process but is not covered by a source map so it does not map back to the original source. This code gets in your way when stepping through source code in the debugger because it makes the debugger switch between the original source code and generated code that you are not really interested in. `smartStep` will automatically step through code not covered by a source map until it reaches a location that is covered by a source map again.

This is especially useful for cases like async/await downcompilation in TypeScript, where the compiler injects helper code that is not covered by a source map.

### Experimental Node Debugger (node2)

VS Code includes an experimental Node debug extension called `node2` that uses the [V8 Inspector Protocol](https://chromedevtools.github.io/debugger-protocol-viewer/v8/), which Node.js now exposes via the `--inspect` flag, only in Node.js versions 6.3+. This is the same protocol exposed by [Chrome and other targets](https://developer.chrome.com/devtools/docs/debugger-protocol). This extension runs on the [vscode-chrome-debug-core](https://github.com/Microsoft/vscode-chrome-debug-core) library which also powers the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension, and several others.

>**Note**: Node v6.9 or above is recommended with `node2`, especially on Windows. The new protocol was less stable in earlier versions of Node.

Here are a few reasons to try `node2` over `node`:

* It can be more stable when debugging near very large JavaScript objects. The older debug protocol can hang when sending large values over the wire.
* If you are using an ES6 Proxy in your app, a Node v7+ runtime might crash when being debugged by the old debugger. This does not happen with `node2`. This issue is tracked in [Microsoft/vscode#12749](https://github.com/Microsoft/vscode/issues/12749).
* `node2` can handle some trickier source map setups. If you have trouble setting breakpoints in sourcemapped files, trying `node2` is worth a shot.

>**Note**: See more tips in the `node2` extension [README](https://marketplace.visualstudio.com/items?itemName=ms-vscode.node-debug2).

## Command variables

As we saw above, VS Code supports variable substitution in `launch.json` configurations. An advanced type of variable is one that is bound to a VS Code _command_. When a debug session is started, all command variables that occur in the underlying launch configuration are first collected and then executed. Before the launch configuration is passed to the debug adapter, all variables are substituted with the command results.

A command is implemented and registered in an extension and its return value is used as the variable's value. The implementation of a command can range from a simple expression with no UI, to some sophisticated functionality based on the UI features available in the extension API.

An example of this functionality can be found in `node-debug`. Here a variable `${command.PickProcess}` is bound to a process picker command.

For example the 'Attach to Process' launch configuration below uses the variable to let the user pick a Node.js process when running the launch configuration.

```json
{
    "name": "Attach to Process",
    "type": "node",
    "request": "attach",
    "processId": "${command.PickProcess}",
    "port": 5858
}
```

## Next Steps

In case you didn't already read the Node.js section, take a look at:

* [Node.js](/docs/runtimes/nodejs.md) - End to end Node scenario with a sample application

To see a tutorial on the basics of Node.js debugging, check out:

* [Intro Video - Debugging](/docs/introvideos/debugging.md) - Introductory video showcasing the basics of debugging.

To learn about VS Code's task running support, go to:

* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt and Jake.  Showing Errors and Warnings

To write your own debugger extension, visit:

* [Debuggers](/docs/extensions/example-debuggers.md) - Steps to create a VS Code debug extension starting from a mock sample


## Common Questions

**Q: What are the supported debugging scenarios?**

**A:** Debugging of Node.js based applications is supported on Linux, Mac, and Windows out of the box with VS Code. Many other scenarios are supported by [VS Code extensions](https://marketplace.visualstudio.com/vscode/Debuggers?sortBy=Downloads) available on the Marketplace.

**Q: I do not see any launch configurations in the debug view drop down, what is wrong?**

**A:** The most common problem is that you did not set up `launch.json` yet or there is a syntax error in the `launch.json` file.

**Q: What Node.js version is required for Node.js debugging?**

**A:** The latest LTS version of [Node.js](https://nodejs.org/) is recommended.
