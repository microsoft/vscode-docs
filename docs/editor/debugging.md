---
Order: 7
Area: editor
TOCTitle: Debugging
ContentId: 4E9A74AA-D778-4D1C-B369-83763B3C340F
PageTitle: Debugging in Visual Studio Code
DateApproved: 10/4/2018
MetaDescription: One of the great things in Visual Studio Code is debugging support.  Set breakpoints, step-in, inspect variables and more.
MetaSocialImage: images/debugging/Debugging.png
---
# Debugging

One of the key features of Visual Studio Code is its great debugging support. VS Code's built-in debugger helps accelerate your edit, compile and debug loop.

![Debugging diagram](images/debugging/debugging_hero.png)

## Debugger extensions

VS Code has built-in debugging support for the [Node.js](https://nodejs.org/) runtime and can debug JavaScript, TypeScript, and any other language that gets transpiled to JavaScript.

For debugging other languages and runtimes (including [PHP](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug), [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby), [Go](https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go), [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), [C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools), [Powershell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) and [many others](https://marketplace.visualstudio.com/search?term=debug&target=VSCode&category=Debuggers&sortBy=Relevance)), look for `Debuggers` [extensions](/docs/editor/extension-gallery.md) in our VS Code [Marketplace](https://marketplace.visualstudio.com/vscode/Debuggers) or click on **Install Additional Debuggers...** in the top level Debug menu.

Below are several popular extensions which include debugging support:

<div class="marketplace-extensions-debuggers"></div>

> Tip: The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you.

## Start debugging

The following documentation is based on the built-in [Node.js](https://nodejs.org/) debugger, but most of the concepts and features are applicable to other debuggers as well.

It is helpful to first create a sample Node.js application before reading about debugging. You can follow the [Node.js walkthrough](/docs/nodejs/nodejs-tutorial.md) to install Node.js and create a simple "Hello World" JavaScript application (`app.js`). Once you have a simple application all set up, this page will take you through VS Code debugging features.

## Debug view

To bring up the Debug view, click on the Debug icon in the **Activity Bar** on the side of VS Code. You can also use the keyboard shortcut `kb(workbench.view.debug)`.

![Debug icon](images/debugging/debugicon.png)

The Debug view displays all information related to debugging and has a top bar with debugging commands and configuration settings.

## Debug menu

The top level **Debug** menu has the most common debug commands:

![Debug menu](images/debugging/debug-menu.png)

## Launch configurations

To debug a simple app in VS Code, press `kb(workbench.action.debug.start)` and VS Code will try to debug your currently active file.

However, for most debugging scenarios, creating a launch configuration file is beneficial because it allows you to configure and save debugging setup details. VS Code keeps debugging configuration information in a `launch.json` file located in a `.vscode` folder in your workspace (project root folder) or in your [user settings](/docs/editor/debugging.md#global-launch-configuration) or [workspace settings](/docs/editor/multi-root-workspaces.md#workspace-launch-configurations).

To create a `launch.json` file, open your project folder in VS Code (**File** > **Open Folder**) and then click on the Configure gear icon on the Debug view top bar.

![launch configuration](images/debugging/launch-configuration.png)

VS Code will try to automatically detect your debug environment but if this fails, you will have to choose your debug environment manually:

![debug environment selector](images/debugging/debug-environments.png)

Here is the launch configuration generated for Node.js debugging:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${file}"
        }
    ]
}
```

If you go back to the File Explorer view (`kb(workbench.view.explorer)`), you'll see that VS Code has created a `.vscode` folder and added the `launch.json` file to your workspace.

![launch.json in Explorer](images/debugging/launch-json-in-explorer.png)

>**Note**: You can debug a simple application even if you don't have a folder open in VS Code but it is not possible to manage launch configurations and set up advanced debugging. The VS Code Status Bar is purple if you do not have a folder open.

Note that the attributes available in launch configurations vary from debugger to debugger. You can use IntelliSense suggestions (`kb(editor.action.triggerSuggest)`) to find out which attributes exist for a specific debugger. In addition, hover help is available for all attributes.

Do not assume that an attribute that is available for one debugger automatically works for other debuggers too. If you see green squiggles in your launch configuration, hover over them to learn what the problem is and try to fix them before launching a debug session.

![launch.json IntelliSense](images/debugging/launch-json-intellisense.png)

Review all automatically generated values and make sure that they make sense for your project and debugging environment.

### Launch versus attach configurations

In VS Code, there are two core concepts for debugging: **Launch** and **Attach**, which handle two different workflows and segments of developers. Depending on your workflow, it can be confusing to know what type of configuration is appropriate for your project.

If you come from a browser Developer Tools background, you aren't used to the concept of "launching from your tool" since your browser instance is already open. When you open DevTools, you are simply **attaching** DevTools to your open browser tab. On the other hand, if you come from a server or desktop background, it's quite normal to have your editor **launch** your process for you, and your editor automatically attaches its debugger to the newly launched process.

The best way to explain the difference between **launch** and **attach** is think of a **launch** configuration as a recipe for how to start your app in debug mode **before** VS Code attaches to it, while an **attach** configuration is a recipe for how to connect VS Code's debugger to an app or process that's **already** running.

VS Code debuggers typically support launching a program in debug mode or attaching to an already running program in debug mode. Depending on the request (`attach` or `launch`) different attributes are required and VS Code's `launch.json` validation and suggestions should help with that.

### Add a new configuration

To add a new configuration to an existing `launch.json`, use one of the following techniques:

* Use IntelliSense if your cursor is located inside the configurations array.
* Press the **Add Configuration** button to invoke snippet IntelliSense at the start of the array.
* Choose **Add Configuration...** option in the Debug dropdown.

![launch json suggestions](images/debugging/add-config.gif)

VS Code also supports compound launch configurations for starting multiple configurations at the same time, for more details please read this [section](#compound-launch-configurations).

In order to start a debug session first select the configuration named **Launch Program** using the **Configuration dropdown** in the Debug view. Once you have your launch configuration set, start your debug session with `kb(workbench.action.debug.start)`.

Alternatively you can run your configuration through the **Command Palette** (`kb(workbench.action.showCommands)`), by filtering on **Debug: Select and Start Debugging** or typing `'debug '`, and selecting the configuration you want to debug.

As soon as a debugging session starts, the **DEBUG CONSOLE** panel is displayed and shows debugging output and the Status Bar turns orange:

![debug session](images/debugging/debug-session.png)

In addition, the _debug status_ appears in the Status Bar showing the active debug configuration. By clicking on the debug status, a user can change the active launch configuration and then start debugging without the need to open the Debug view.

![Debug status](images/debugging/debug-status.png)

## Debug actions

Once a debug session starts, the **Debug toolbar** will appear on the top of the editor.

![Debug Actions](images/debugging/toolbar.png)

* Continue / Pause `kb(workbench.action.debug.continue)`
* Step Over `kb(workbench.action.debug.stepOver)`
* Step Into `kb(workbench.action.debug.stepInto)`
* Step Out `kb(workbench.action.debug.stepOut)`
* Restart `kb(workbench.action.debug.restart)`
* Stop `kb(workbench.action.debug.stop)`

>**Tip**: Use the setting `debug.toolBarLocation` to control the location of the debug toolbar. It can either be the default `floating`, `docked` to the debug viewlet or `hidden`. A `floating` debug toolbar can be dragged horizontally and also down to the editor area.

### Run mode

In addition to _debugging_ a program, VS Code supports _running_ the program. The **Debug: Start Without Debugging** action is triggered with `kb(workbench.action.debug.run)` and uses the currently selected launch configuration. Many of the launch configuration attributes are supported in 'Run' mode. VS Code maintains a debug session while the program is running and pressing the **Stop** button terminates the program.

>**Tip**: The **Run** action is always available, but not all debugger extensions support 'Run'. In this case 'Run' will be the same as 'Debug'.

## Breakpoints

Breakpoints can be toggled by clicking on the **editor margin**. Finer breakpoint control (enable/disable/reapply) can be done in the Debug view's **BREAKPOINTS** section.

* Breakpoints in the editor margin are normally shown as red filled circles.
* Disabled breakpoints have a filled gray circle.
* When a debugging session starts, breakpoints that cannot be registered with the debugger change to a gray hollow circle. The same might happen if the source is edited while a debug session without live-edit support is running.

The **Reapply All Breakpoints** command sets all breakpoints again to their original location. This is helpful if your debug environment is "lazy" and "misplaces" breakpoints in source code that has not yet been executed.

![Breakpoints](images/debugging/breakpoints.png)

## Logpoints

A Logpoint is a variant of a breakpoint that does not "break" into the debugger but instead logs a message to the console. Logpoints are especially useful for injecting logging while debugging production servers that cannot be paused or stopped.

A Logpoint is represented by a "diamond" shaped icon. Log messages are plain text but can include expressions to be evaluated within curly braces ('{}').

![Logpoints](images/debugging/log-points.gif)

Just like regular breakpoints, Logpoints can be enabled or disabled and can also be controlled by a condition and/or hit count.

**Note**: Logpoints are currently only supported by VS Code's built-in Node.js debugger, but can be implemented by other debug extensions. The [Python extension](/docs/python/python-tutorial.md), for example, supports Logpoints.

## Data inspection

Variables can be inspected in the **VARIABLES** section of the Debug view or by hovering over their source in the editor. Variables and expression evaluation is relative to the selected stack frame in the **CALL STACK** section.

![Debug Variables](images/debugging/variables.png)

Variable values can be modified with the **Set Value** action from the variable's context menu.

Variables and expressions can also be evaluated and watched in the Debug view's **WATCH** section.

![Debug Watch](images/debugging/watch.png)

## Launch.json attributes

There are many `launch.json` attributes to help support different debuggers and debugging scenarios. As mentioned above, you can use IntelliSense (`kb(editor.action.triggerSuggest)`) to see the list of available attributes once you have specified a value for the `type` attribute.

![launch json suggestions](images/debugging/launch-json-suggestions.png)

The following attributes are mandatory for every launch configuration:

* `type` - the type of debugger to use for this launch configuration. Every installed debug extension introduces a type, for example, `node` for the built-in node debugger, or `php` and `go` for the PHP and Go extensions.
* `request` - the request type of this launch configuration. Currently supported are `launch` and `attach`.
* `name` - friendly name which appears in the Debug launch configuration dropdown.

Here are some optional attributes available to all launch configurations:

* `preLaunchTask` - to launch a task before the start of a debug session, set this attribute to the name of a task specified in [tasks.json](/docs/editor/tasks.md) (located under the workspace's `.vscode` folder).
* `postDebugTask` - to launch a task at the very end of a debug session, set this attribute to the name of a task specified in [tasks.json](/docs/editor/tasks.md) (located under the workspace's `.vscode` folder).
* `internalConsoleOptions` - control visibility of the Debug Console panel during a debugging session
* `debugServer` - **for debug extension authors only**: connect to the specified port instead of launching the debug adapter

Many debuggers support some of the following attributes:

* `program` - executable or file to run when launching the debugger
* `args` - arguments passed to the program to debug
* `env` - environment variables (the value `null` can be used to "undefine" a variable)
* `cwd` - current working directory for finding dependencies and other files
* `port` - port when attaching to a running process
* `stopOnEntry` - break immediately when the program launches
* `console` - what kind of console to use, for example, `internalConsole`, `integratedTerminal`, `externalTerminal`.

## Variable substitution

To avoid having to use absolute paths in debug configurations, VS Code makes commonly used paths and other values available as variables and supports variable substitution inside strings in `launch.json`. Examples are `${workspaceFolder}` for the root path of a workspace folder, `${file}` for the file open in the active editor, and `${env:Name}` for an environment variable 'Name'. You can see a full list of predefined variables in the [Variables Reference](/docs/editor/variables-reference.md) or by invoking IntelliSense inside the `launch.json` string attributes.

```json
{
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
    "program": "${workspaceFolder}/app.js",
    "cwd": "${workspaceFolder}",
    "args": [ "${env:USERNAME}" ]
}
```

## Platform specific properties

`Launch.json` supports defining values (for example, arguments to be passed to the program) specific to an operating system. To do so, put a platform specific literal into the `launch.json` file and specify the corresponding properties inside that literal.

Below is an example that passes `"args"` to the program differently on Windows than on Linux and macOS:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/node_modules/gulp/bin/gulpfile.js",
            "args": ["myFolder/path/app.js"],
            "windows": {
                "args": ["myFolder\\path\\app.js"]
            }
        }
    ]
}
```

Valid operating properties are `"windows"` for Windows, `"linux"` for Linux and `"osx"` for macOS. Properties defined in an operating system specific scope override properties defined in the global scope.

In the example below debugging the program always _stops on entry_ except for macOS:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/node_modules/gulp/bin/gulpfile.js",
            "stopOnEntry": true,
            "osx": {
                "stopOnEntry": false
            }
        }
    ]
}
```

## Global launch configuration

VS Code supports adding a `"launch"` object inside your User [settings](/docs/getstarted/settings.md). This `"launch"` configuration will then be shared across your workspaces. For example:

```json
"launch": {
    "version": "0.2.0",
    "configurations": [{
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${file}"
    }]
}
```

>**Tip**: If a workspace contains a `"launch.json"`, the global launch configuration is ignored.

## Advanced breakpoint topics

### Conditional breakpoints

A powerful VS Code debugging feature is the ability to set conditions based on expressions, hit counts, or a combination of both.

- **Expression condition**: The breakpoint will be hit whenever the expression evaluates to `true`.
- **Hit count**: The 'hit count' controls how many times a breakpoint needs to be hit before it will 'break' execution. Whether a 'hit count' is respected and how the exact syntax of the expression looks like depends on the debugger extension used.

You can add a condition and/or hit count either when creating the breakpoint with the **Add Conditional Breakpoint** action or with the **Edit Breakpoint...** action for existing breakpoints. In both cases an inline text box with a drop down menu opens where the expressions can be entered:

![HitCount](images/debugging/hitCount.gif)

If a debugger does not support conditional breakpoints the **Add Conditional Breakpoint** action will be missing.

### Inline breakpoints

Inline breakpoints will only be hit when the execution reaches the column associated with the inline breakpoint. This is particularly useful when debugging minified code which contains multiple statements on a single line.

An inline breakpoint can be set using `kb(editor.debug.action.toggleInlineBreakpoint)` or through the context menu during a debug session and inline breakpoints are shown inline in the editor.

Inline breakpoints can also have conditions. Editing multiple breakpoints on a line is possible through the context menu in the editor left margin.

### Function breakpoints

Instead of placing breakpoints directly in source code, a debugger can support creating breakpoints by specifying a function name. This is useful in situations where source is not available but a function name is known.

A 'function breakpoint' is created by pressing the **+** button in the **BREAKPOINTS** section header and entering the function name. Function breakpoints are shown with a red triangle in the **BREAKPOINTS** section.

## Debug Console REPL

Expressions can be evaluated with the **Debug Console** REPL ([Read-Eval-Print Loop](https://en.wikipedia.org/wiki/Read–eval–print_loop)) feature. To open the Debug Console, use the **Debug Console** action at the top of the Debug pane or use the **View: Debug Console** command (`kb(workbench.debug.action.toggleRepl)`). Expressions are evaluated after you press `kbstyle(Enter)` and the Debug Console REPL shows suggestions while typing. If you need to enter multiple lines, use `kbstyle(Shift+Enter)` between the lines and then send all lines for evaluation with `kbstyle(Enter)`.

![Debug Console](images/debugging/debugconsole.png)

**Note**: You must be in a running debug session to use the Debug Console REPL.

## Multi-target debugging

For debugging complex scenarios involving more than one process (for example, a client and a server), VS Code supports multi-target debugging.

Using multi-target debugging is simple: after you've started a first debug session, you can just launch another session. As soon as a second session is up and running, the VS Code UI switches to _multi-target mode_:

- The individual sessions now show up as top level elements in the **CALL STACK** view.<BR>![Callstack View](images/debugging/debug-callstack.png)
- The debug toolbar shows the currently _active session_ (and all other sessions are available in a dropdown menu).<BR>![Debug Actions Widget](images/debugging/debug-actions-widget.png)
- Debug actions (for example, all actions in the debug toolbar) are performed on the active session. The active session can be changed either by using the drop down menu in the debug toolbar or by selecting a different element in the **CALL STACK** view.

### Compound launch configurations

An alternative way to start multiple debug session is by using a so-called _compound_ launch configuration. A compound launch configuration lists the names of two or more launch configurations that should be launched in parallel. Compound launch configurations show up in the launch configuration drop down menu.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Server",
            "program": "${workspaceFolder}/server.js",
            "cwd": "${workspaceFolder}"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Client",
            "program": "${workspaceFolder}/client.js",
            "cwd": "${workspaceFolder}"
        }
    ],
    "compounds": [
        {
            "name": "Server/Client",
            "configurations": ["Server", "Client"]
        }
    ]
}
```

## Remote debugging

VS Code does not support 'remote debugging' by itself. Remote debugging is a feature of the debug extension you are using and you should consult the extension's page in the [Marketplace](https://marketplace.visualstudio.com/search?target=VSCode&category=Debuggers&sortBy=Downloads) for support and details.

There is however one exception, VS Code ships with a Node.js debugger which supports remote debugging. See the [Node.js Debugging](/docs/nodejs/nodejs-debugging.md#remote-debugging) topic to learn how to configure remote debugging.

## Next Steps

To learn about VS Code's Node.js debugging support, take a look at:

* [Node.js](/docs/nodejs/nodejs-debugging.md) - Node.js debugging is included in VS Code.

To see tutorials on the basics of Node.js debugging, check out these videos:

* [Intro Video - Debugging](/docs/introvideos/debugging.md) - Introductory video showcasing the basics of debugging.
* [Getting started with Node.js debugging](https://www.youtube.com/watch?v=2oFKNL7vYV8) - Learn how to attach to a running Node.js process.

To learn about VS Code's task running support, go to:

* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt and Jake.  Showing Errors and Warnings

To write your own debugger extension, visit:

* [Debuggers](/docs/extensions/example-debuggers.md) - Steps to create a VS Code debug extension starting from a mock sample

## Common Questions

### What are the supported debugging scenarios?

Debugging of Node.js based applications is supported on Linux, macOS, and Windows out of the box with VS Code. Many other scenarios are supported by [VS Code extensions](https://marketplace.visualstudio.com/vscode/Debuggers?sortBy=Downloads) available on the Marketplace.

### I do not see any launch configurations in the debug view drop down, what is wrong?

The most common problem is that you did not set up `launch.json` yet or there is a syntax error in the `launch.json` file. Or you might need to open a folder, since no folder debugging does not support launch configurations.
