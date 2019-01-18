---
Order:
Area: editor
TOCTitle: Variables reference
ContentId: ff9cd4ea-e3f0-4170-9451-2f2ea2b909ea
PageTitle: Visual Studio Code Variables Reference
DateApproved: 12/12/2018
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

## Environment variables

You can also reference environment variables through **${env:Name}** syntax (for example, `${env:PATH}`).

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

## Settings, command variables, and input variables

You can reference VS Code settings and commands using the following syntax:

* **${config:Name}** - example: `${config:editor.fontSize}`
* **${command:CommandID}** - example: `${command:explorer.newFolder}`

If simple variable substitution isn't enough, you can also get input from the user of your task or launch by adding an `inputs` section to your `tasks.json` or `launch.json` file. An input has the properties:

- **id**: The identifier for your input. Used to refer to an input in the format of `${input:id}` in the `tasks` section of `tasks.json`.
- **description**: Shown in the quick input or quick pick and can be used to provide context for the input.
- **type**: Distinguishes what kind of user input will be collected.
  - *promptString*: Shows a quick input to get a string from the user.
  - *pickString*: Shows a quick pick let the user select from several options.
- **options**: Only applicable to `"type": "pickString"`. This an array of options for the user to pick from.
- **default**: The default value that will be used if the user doesn't enter something else. For `"type": "pickString"`this must be one of the options.

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
            "id": "componentType",
            "description": "What type of component do you want to create?",
            "default": "component",
            "type": "pickString",
            "options": ["component", "directive", "pipe", "service", "class", "guard", "interface", "enum", "enum"]
        },
        {
            "id": "componentName",
            "description": "Name your component.",
            "default": "my-new-component",
            "type": "promptString"
        }
    ]
}
```

Running the example:

![Inputs Example](images/tasks/run-input-example.gif)

## Variables scoped per workspace folder

By appending the root folder's name to a variable (separated by a colon), it is possible to reach into sibling root folders of a workspace. Without the root folder name, the variable is scoped to the same folder where it is used.

For example, in a multi root workspace with folders `Server` and `Client`, a `${workspaceFolder:Client}` refers to the path of the `Client` root.

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
