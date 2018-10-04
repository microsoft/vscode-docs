---
Order:
Area: editor
TOCTitle: Variables reference
ContentId: ff9cd4ea-e3f0-4170-9451-2f2ea2b909ea
PageTitle: Visual Studio Code Variables Reference
DateApproved: 10/4/2018
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
- **${lineNumber}** - `5`
- **${selectedText}** - `Text selected in your code editor`

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

## Settings and command variables

You can reference VS Code settings and commands using the following syntax:

* **${config:Name}** - example: `${config:editor.fontSize}`
* **${command:CommandID}** - example: `${command:explorer.newFolder}`

## Variables scoped per workspace folder

By appending the root folder's name to a variable (separated by a colon), it is possible to reach into sibling root folders of a workspace. Without the root folder name, the variable is scoped to the same folder where it is used.

For example, in a multi root workspace with folders `Server` and `Client`, a `${workspaceFolder:Client}` refers to the path of the `Client` root.

## Common Questions

### Is variable substitution supported in User and Workspace settings?

No, the predefined variables are not supported in strings in `settings.json` files. Some [settings](/docs/getstarted/settings.md) like `window.title` have their own variables:

```json
  "window.title": "${dirty}${activeEditorShort}${separator}${rootName}${separator}${appName}"
```

Refer to the comments in the Settings editor (`kb(workbench.action.openSettings)`) to learn about setting specific variables.

### Why isn't ${workspaceRoot} documented?

The variable `${workspaceRoot}` was deprecated in favor of `${workspaceFolder}` to better align with [Multi-root Workspace](/docs/editor/multi-root-workspaces.md) support.
