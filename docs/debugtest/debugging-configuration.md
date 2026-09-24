---
ContentId: f8ea7d84-9b4e-4f42-874e-25aa6c7fa244
DateApproved: 9/22/2026
MetaDescription: Create and customize launch.json configurations in {% data variables.product.prodname_vscode %} for launching, attaching, and multi-target debugging.
MetaSocialImage: images/debugging/debugging-social.png
---
# Configure debugging in {% data variables.product.prodname_vscode %}

Create a debug configuration when your application needs more setup than running the active file. A configuration can specify the application entry point, arguments, environment variables, startup tasks, or a process to attach to.

This article shows how to create, run, customize, and troubleshoot reusable debug configurations. For an introduction to breakpoints, stepping, and data inspection, see [Debug code in {% data variables.product.prodname_vscode %}](/docs/debugtest/debugging.md).

## Launch configurations

{% data variables.product.prodname_vscode_shortname %} stores debug configurations in a `launch.json` file. For a project-specific configuration, place the file in the `.vscode` folder at the root of your workspace.

You can also define configurations in:

* The `setting(launch)` user setting, which makes configurations available across workspaces.
* [Workspace folder settings](/docs/editing/workspaces/multi-root-workspaces.md#workspace-launch-configurations) in a multi-root workspace.

The following `launch.json` example starts a Node.js application:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/app.js"
        }
    ]
}
```

Each object in the `configurations` array appears in the configuration dropdown in the **Run and Debug** view. You can add multiple configurations for different entry points, environments, or debugging modes.

> [!NOTE]
> You can debug a supported active file without opening a folder. To create and manage a workspace `launch.json` file, open a folder or workspace.

## Create a debug configuration file

To create a `launch.json` file:

1. Open the **Run and Debug** view (`kb(workbench.view.debug)`) from the Activity Bar.

1. Select **create a launch.json file**.

1. Select the debugger for your application.

    {% data variables.product.prodname_vscode_shortname %} creates a starter configuration based on the selected debugger and opens `.vscode/launch.json`.

1. Update the generated configuration for your application.

<!-- TODO: Capture an updated screenshot showing the create a launch.json file action and debugger picker in the current Run and Debug view. -->

### Generate a launch configuration with AI

Copilot can inspect your project and suggest a launch configuration:

1. Open the {% data variables.copilot.chat_view %} with `kb(workbench.action.chat.open)`.

1. Describe the application and how you normally start it. For example:

    ```prompt
    Create a debug configuration for this Express app. Start it with npm run dev.
    ```

    Agents search the workspace for relevant context when needed. Add `#codebase` to the prompt when you want to explicitly request semantic search across the workspace.

1. Review the suggested properties, apply the configuration to `launch.json`, and start debugging.

> [!IMPORTANT]
> Verify generated commands, arguments, and environment variables before running the configuration.

### Add a configuration to launch.json

To add another configuration to an existing `launch.json`, use one of these methods:

* Select **Add Configuration** in the editor, and then select a debugger snippet.
* Place the cursor inside the `configurations` array and use IntelliSense (`kb(editor.action.triggerSuggest)`).
* Select the **Run** > **Add Configuration** menu item.

## Start a debugging session with a launch configuration

To start a saved configuration:

1. Open the **Run and Debug** view.

1. Select a configuration from the configuration dropdown.

1. Start debugging with `kb(workbench.action.debug.start)`, or select **Start Debugging**.

You can also run **Debug: Select and Start Debugging** from the Command Palette (`kb(workbench.action.showCommands)`) and then select a configuration.

<!-- TODO: Capture an updated screenshot showing the configuration dropdown with multiple launch and attach configurations. -->

## Launch versus attach configurations

The `request` property determines how the debugger connects to your application.

| Request | Behavior | Use when |
|---------|----------|----------|
| `launch` | Starts the application and attaches the debugger to the new process. | You want {% data variables.product.prodname_vscode_shortname %} to manage application startup. |
| `attach` | Connects the debugger to an application or process that is already running in debug mode. | Another tool starts the application, or you need to connect to a long-running or remote process. |

Debugger extensions define the properties required for each request type. Use IntelliSense in `launch.json` or consult the debugger extension documentation for supported options.

## Customize a launch configuration

### Launch.json attributes

Every launch configuration has these properties:

* `type`: the debugger to use. For example, the built-in Node.js debugger uses `node`. Debugger extensions contribute other values.
* `request`: the connection mode. Most debuggers support `launch`, `attach`, or both.
* `name`: the label shown in the configuration dropdown.

These properties are available for all launch configurations:

* `presentation`: control the `order`, `group`, and `hidden` state in the configuration dropdown and quick pick. You can also set `presentation` inside a [platform-specific section](#platform-specific-properties).
* `preLaunchTask`: run a task before the debug session starts. Set the value to a task label from `.vscode/tasks.json`, or use `${defaultBuildTask}`.
* `postDebugTask`: run a task after the debug session ends.
* `internalConsoleOptions`: control when the Debug Console opens.
* `serverReadyAction`: perform an action when the application reports that a server is ready. For details, see [Automatically open a URI when debugging a server program](#automatically-open-a-uri-when-debugging-a-server-program).

Debugger-specific properties often include:

* `program`: the executable or file to run.
* `args`: arguments passed to the application.
* `env` or `envFile`: environment variables for the application.
* `cwd`: the working directory.
* `port`: the port to use when attaching.
* `stopOnEntry`: pause when the application starts.
* `console`: the console to use, such as `internalConsole`, `integratedTerminal`, or `externalTerminal`.

The supported properties and values vary by debugger. After setting `type`, use IntelliSense (`kb(editor.action.triggerSuggest)`) to see the schema for that debugger. Hover over red squiggles to view validation errors.

## Variable substitution

Use variables in `launch.json` to avoid hard-coded paths and values. For example:

* `${workspaceFolder}`: the path of the workspace folder.
* `${file}`: the file in the active editor.
* `${env:Name}`: the value of the `Name` environment variable.

The following configuration passes a workspace-relative path as one argument:

```json
{
    "type": "node",
    "request": "launch",
    "name": "Launch Program",
    "program": "${workspaceFolder}/app.js",
    "cwd": "${workspaceFolder}",
    "args": [
        "--input",
        "${workspaceFolder}/data folder/input.txt"
    ]
}
```

Each element in an array such as `args` remains one argument after variable substitution, even when the resolved value contains spaces. Do not add escaped quotes around a variable only to handle spaces.

For the full list of variables, see the [Variables reference](/docs/reference/variables-reference.md).

## Platform-specific properties

Use `windows`, `linux`, or `osx` sections to override properties for a specific operating system:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/app.js",
            "args": ["scripts/start.js"],
            "windows": {
                "args": ["scripts\\start.js"]
            }
        }
    ]
}
```

Properties in an operating system section override properties at the configuration level. The `type` property cannot be platform-specific because it determines which debugger runs the configuration, including in remote debugging scenarios.

You can also put `presentation` in an operating system section to control where the configuration appears on each platform.

## Global launch configuration

To reuse a launch configuration across workspaces, add it to the `setting(launch)` user setting:

```json
"launch": {
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Active File",
            "program": "${file}"
        }
    ]
}
```

Use a workspace `launch.json` file when a configuration depends on project files, tasks, or shared environment details. Workspace configurations can be versioned with the project and used by other contributors.

## Advanced debugging scenarios

### Compound launch configurations

A compound starts two or more launch configurations together. Use one for applications with multiple processes, such as a client and a server.

Add a `compounds` array alongside the `configurations` array in `launch.json`:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Server",
            "program": "${workspaceFolder}/server.js"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Client",
            "program": "${workspaceFolder}/client.js"
        }
    ],
    "compounds": [
        {
            "name": "Server and Client",
            "configurations": ["Server", "Client"],
            "preLaunchTask": "${defaultBuildTask}",
            "stopAll": true
        }
    ]
}
```

The compound appears in the configuration dropdown. When you start it, {% data variables.product.prodname_vscode_shortname %} runs the optional `preLaunchTask` and starts the listed configurations in parallel. If `stopAll` is `true`, manually stopping one session stops all sessions in the compound.

### Automatically open a URI when debugging a server program

Use `serverReadyAction` to open or debug a URI after a server reports that it is ready. The action matches program output with a regular expression and uses a capture group to construct the URI:

```json
{
    "type": "node",
    "request": "launch",
    "name": "Launch Server",
    "program": "${workspaceFolder}/app.js",
    "serverReadyAction": {
        "pattern": "listening on port ([0-9]+)",
        "uriFormat": "http://localhost:%s",
        "action": "openExternally"
    }
}
```

In this example:

* `pattern` matches output such as `listening on port 3000` and captures the port number.
* `uriFormat` replaces the first `%s` with the captured value.
* `action` opens the resulting URI in the system's default application.

The default pattern matches common messages that contain an HTTP or HTTPS URI or port number. The default `uriFormat` is `http://localhost:%s`.

#### Trigger debugging via Microsoft Edge or Chrome

Set `action` to `debugWithEdge` or `debugWithChrome` to start a browser debugging session. You can also set `webRoot`, which defaults to `${workspaceFolder}`.

#### Triggering an arbitrary launch config

Set `action` to `startDebugging` to start another launch configuration after the pattern matches. Use `name` to reference a configuration in the same file or workspace folder. For configurations that require more control, use the `config` property to define the configuration inline.

<video src="images/debugging/server-ready.mp4" title="Video showing a server-ready action opening an application after the debug target starts." autoplay loop controls muted></video>

### Redirect input/output to/from the debug target

Input and output behavior depends on the debugger and runtime. There is no redirection syntax that works for every debug configuration.

Use one of these approaches:

* Set the debugger-specific `console` property to `integratedTerminal` or `externalTerminal` when the application needs interactive standard input.
* Start the application manually in a terminal with the required shell redirection and debug options. Then run an `attach` configuration to connect the debugger to that process.

Passing shell operators such as `<` or `>` in `args` usually passes them as literal application arguments. It redirects input or output only when the debugger explicitly runs the target through a shell.

## Troubleshoot launch configurations

### No configurations appear

Check that:

* A folder or workspace is open.
* `.vscode/launch.json` contains a valid `configurations` array.
* The debugger extension for the configuration's `type` is installed and active.
* The configuration does not set `presentation.hidden` to `true`.

### A configuration has red squiggles

Hover over the highlighted property to view the validation message. Confirm that the property is supported for the selected `type` and `request`. Properties from one debugger do not automatically work with another debugger.

### A configuration does not start the expected application

Verify the `program`, `cwd`, `args`, environment variables, and any `preLaunchTask`. For an attach configuration, confirm that the target process is already running in debug mode and that connection details such as the port match.

## Next steps

* [Debug code in {% data variables.product.prodname_vscode %}](/docs/debugtest/debugging.md) - Work with breakpoints, step controls, variables, and the Debug Console.
* [Integrate tasks with debugging](/docs/debugtest/tasks.md) - Configure build or preparation tasks for a debug workflow.
* [Variables reference](/docs/reference/variables-reference.md) - Review variables available in `launch.json` and `tasks.json`.
