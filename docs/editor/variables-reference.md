---
Order:
Area: editor
TOCTitle: Variables reference
ContentId: ff9cd4ea-e3f0-4170-9451-2f2ea2b909ea
PageTitle: Visual Studio Code Variables Reference
DateApproved: 7/3/2019
MetaDescription: Visual Studio Code variable substitution reference
---
# Variables Reference

Visual Studio Code supports variable substitution in [Debugging](/docs/editor/debugging.md) and [Task](/docs/editor/tasks.md) configuration files. Variable substitution is supported inside key and value strings in `launch.json` and `tasks.json` files using **${variableName}** syntax.

## Predefined variables

The following predefined variables are supported:

- **${workspaceFolder}** - the path of the folder opened in VS Code
- **${workspaceFolderBasename}** - the name of the folder opened in VS Code without any slashes (/)
- **${file}** - the current opened file
- **${relativeFile}** - the current opened file relative to `workspaceFolder`
- **${fileBasename}** - the current opened file's basename
- **${fileBasenameNoExtension}** - the current opened file's basename with no file extension
- **${fileDirname}** - the current opened file's dirname
- **${fileExtname}** - the current opened file's extension
- **${cwd}** - the task runner's current working directory on startup
- **${lineNumber}** - the current selected line number in the active file
- **${selectedText}** - the current selected text in the active file
- **${execPath}** - the path to the running VS Code executable

### Predefined variables examples

Supposing that you have the following requirements:

1. A file located at `/home/your-username/your-project/folder/file.ext` opened in your editor;
2. The directory `/home/your-username/your-project` opened as your root workspace.

So you will have the following values for each variable:

- **${workspaceFolder}** - `/home/your-username/your-project`
- **${workspaceFolderBasename}** - `your-project`
- **${file}** - `/home/your-username/your-project/folder/file.ext`
- **${relativeFile}** - `folder/file.ext`
- **${fileBasename}** - `file.ext`
- **${fileBasenameNoExtension}** - `file`
- **${fileDirname}** - `/home/your-username/your-project/folder`
- **${fileExtname}** - `.ext`
- **${lineNumber}** - line number of the cursor
- **${selectedText}** - text selected in your code editor
- **${execPath}** - location of Code.exe

>**Tip**: Use IntelliSense inside string values for `tasks.json` and `launch.json` to get a full list of predefined variables.

### Variables scoped per workspace folder

By appending the root folder's name to a variable (separated by a colon), it is possible to reach into sibling root folders of a workspace. Without the root folder name, the variable is scoped to the same folder where it is used.

For example, in a multi root workspace with folders `Server` and `Client`, a `${workspaceFolder:Client}` refers to the path of the `Client` root.

## Environment variables

You can also reference environment variables through the **${env:Name}** syntax (for example, `${env:PATH}`).

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

**Note**: Be sure to match the environment variable name's casing, for example `${env:Path}` on Windows.

## Configuration variables

You can reference VS Code settings (aka "configurations") through **${config:Name}** syntax (for example, `${config:editor.fontSize}`).

## Command variables

If the predefined variables from above are not sufficient, you can use any VS Code command as a variable through the **${command:commandID}** syntax.

When a command variable is interpolated, the command is run and the variable is substituted by the command's (string) result. The implementation of a command can range from a simple calculation with no UI, to some sophisticated functionality based on the UI features available via VS Code's extension API.

An example for this functionality can be found in VS Code's Node.js debugger extension which provides an interactive command `extension.pickNodeProcess` for selecting a single process from the list of all running Node.js processes. The command returns the process ID of the selected process. This makes it possible to use the `extension.pickNodeProcess` command in an **Attach by Process ID** launch configuration in the following way:

```json
{
    "configurations": [
        {
            "type": "node",
            "request": "attach",
            "name": "Attach by Process ID",
            "processId": "${command:extension.pickNodeProcess}"
        }
    ]
}
```

## Input variables

Command variables are already powerful but they lack a mechanism to configure the command being run to a specific use case. For example, it is not possible to pass a **prompt message** or a **default value** to a generic "user input prompt".

This limitation is solved with **input variables** which have the syntax: `${input:variableID}`. The `variableID` refers to entries in the `inputs` section of `launch.json` and `tasks.json`, where additional configuration attributes are specified.

The following example shows the overall structure of a `task.json` that makes use of input variables:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "task name",
            "command": "${input:variableID}",
            // ...
        }
    ],
    "inputs": [
        {
            "id": "variableID",
            "type": "type of input variable",
            // type specific configuration attributes
        }
    ]
}
```

Currently VS Code supports three types of input variables:

- **promptString**: Shows an input box to get a string from the user.
- **pickString**: Shows a Quick Pick dropdown to let the user select from several options.
- **command**: Runs an arbitrary command.

Each type requires additional configuration attributes:

`promptString`:

- **description**: Shown in the quick input provides context for the input.
- **default**: Default value that will be used if the user doesn't enter something else.

`pickString`:

- **description**: Shown in the quick pick provides context for the input.
- **options**:  An array of options for the user to pick from.
- **default**: Default value that will be used if the user doesn't enter something else. It must be one of the option values.

`Command`:

- **command**: Command being run on variable interpolation.
- **args**: Optional option bag passed to the command's implementation.


Below is an example of a `tasks.json` that illustrates the use of `inputs` using Angular CLI:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "ng g",
            "type": "shell",
            "command": "ng",
            "args": [
                "g",
                "${input:componentType}",
                "${input:componentName}"
            ],
        }
    ],
    "inputs": [
        {
            "type": "pickString",
            "id": "componentType",
            "description": "What type of component do you want to create?",
            "options": ["component", "directive", "pipe", "service", "class", "guard", "interface", "enum", "enum"],
            "default": "component"
        },
        {
            "type": "promptString",
            "id": "componentName",
            "description": "Name your component.",
            "default": "my-new-component"
        }
    ]
}
```

Running the example:

![Inputs Example](images/tasks/run-input-example.gif)

The following example shows how to use a user input variable of type `command` in a debug configuration that lets the user pick a test case from a list of all test cases found in a specific folder. It is assumed that some extension provides an `extension.mochaSupport.testPicker` command that locates all test cases in a configurable location and shows a picker UI to pick one of them.

```json
{
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Run specific test",
            "program": "${workspaceFolder}/${input:pickTest}"
        }
    ],
    "inputs": [
        {
            "id": "pickTest",
            "type": "command",
            "command": "extension.mochaSupport.testPicker",
            "args": {
                "testFolder": "/out/tests",
            }
        }
    ]
}
```

## Common questions

### Is variable substitution supported in User and Workspace settings?

No, the predefined variables are not supported in strings in `settings.json` files. Some [settings](/docs/getstarted/settings.md) like `window.title` have their own variables:

```json
  "window.title": "${dirty}${activeEditorShort}${separator}${rootName}${separator}${appName}"
```

Refer to the comments in the Settings editor (`kb(workbench.action.openSettings)`) to learn about setting specific variables.

### Why isn't ${workspaceRoot} documented?

The variable `${workspaceRoot}` was deprecated in favor of `${workspaceFolder}` to better align with [Multi-root Workspace](/docs/editor/multi-root-workspaces.md) support.

### How can I know a variable's actual value?

One easy way to check a variable's runtime value is to create a VS Code [task](/docs/editor/tasks.md) to output the variable value to the console. For example, to see the resolved value for `${workspaceFolder}`, you can create and run (**Terminal** > **Run Task**) the following simple 'echo' task in `tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "echo",
            "type": "shell",
            "command": "echo ${workspaceFolder}"
        }
    ]
}
