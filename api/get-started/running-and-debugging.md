---
Order: 3
Area: get-started
TOCTitle: Running and Debugging
PageTitle: Running and Debugging
---

## Running and debugging your extension

You can easily run your extension under the debugger by pressing `F5`. This opens a new VS Code window with your extension loaded. Output from your extension shows up in the `Debug Console`. You can set break points, step through your code, and inspect variables either in the `Debug` view or the `Debug Console`.

![Debugging extensions](images/developing-extensions/debug.png)


## Debugging your extension

Set a breakpoint, for example inside the registered command, and run the `"Hello world"` command in the Extension Development VS Code instance.

![Debugging the extension](images/example-hello-world/hitbp.png)

> **Note:** For TypeScript extensions, even though VS Code loads and executes `out/extension.js`, you are actually able to debug the original TypeScript code due to the generated source map `out/extension.js.map` and VS Code's debugger support for source maps.

> **Tip:** The Debug Console will show all the messages you log to the console.

To learn more about the extension [development environment](/docs/extensions/developing-extensions.md).

## Launching your extension

Your extension is launched in a new window with the title `Extension Development Host`. This window runs VS Code or more
precisely the `Extension Host` with your extension under development.

You can accomplish the same from the command line using the `extensionDevelopmentPath` option. This option tells VS Code in what
other locations it should look for extensions, for example:

>`code --extensionDevelopmentPath=_my_extension_folder`.

Once the Extension Host is launched, VS Code attaches the debugger to it and starts the debug session.

This is what happens when pressing `F5`:

 1. `.vscode/launch.json` instructs to first run a task named `npm`.
 2. `.vscode/tasks.json` defines the task `npm` as a shell command to `npm run compile`.
 3. `package.json` defines the script `compile` as `tsc -watch -p ./`
 4. This eventually invokes the TypeScript compiler included in node_modules, which generates `out/extension.js` and `out/extension.js.map`.
 5. Once the TypeScript compilation task is finished, the `code --extensionDevelopmentPath=${workspaceFolder}` process is spawned.
 6. The second instance of VS Code is launched in a special **Extension Host** mode and it searches for an extension at `${workspaceFolder}`.


## Modifying your extension

Since the TypeScript compiler is run in watch mode, the TypeScript files are automatically compiled as you make changes. You can observe
the compilation progress on the left side of the VS Code Status Bar. On the Status Bar you can also see the error and warning counts of a
compilation. When the compilation is complete with no errors, you must reload the **Extension Development Host** so that it picks up
your changes. You have two options to do this:

* Click on the Debug view **Restart** action to relaunch the **Extension Development Host** window.
* Press `kbstyle(Ctrl+R)` (macOS: `kbstyle(Cmd+R)`) in the Extension Development Host window.