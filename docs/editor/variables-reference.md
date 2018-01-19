---
Order:
Area: editor
TOCTitle: Variables reference
ContentId: ff9cd4ea-e3f0-4170-9451-2f2ea2b909ea
PageTitle: Variables Reference
DateApproved: 1/19/2018
MetaDescription: Variable substitution reference
---
# Variables Reference

Visual Studio Code supports variable substitution in [Debugging](/docs/editor/debugging.md) and [Task](/docs/editor/tasks.md) configuration files. Variable substitution is supported inside strings in `launch.json` and `tasks.json` files using `${variableName}` syntax.

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

**Note**: The `${workspaceRoot}` variable is deprecated in favor of the `${workspaceFolder}` variable.

## Environment variables

You can also reference environment variables through **${env:Name}** syntax (for example, ${env:PATH}). Be sure to match the environment variable name's casing, for example `${env:Path}` on Windows.

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

## Settings and command variables

You can reference VS Code settings and commands using the following syntax:

* **${config:Name}** - example: `${config:editor.fontSize}`
* **${command:CommandID}** - example: `${command:explorer.newFolder}`

## Common Questions

**Q: Is variable substitution supported in User and Workspace settings?**

**A:** No, the predefined variables are not supported in strings in `settings.json` files. Some [settings](/docs/getstarted/settings.md) like `window.title` have their own variables:

```json
  "window.title": "${dirty}${activeEditorShort}${separator}${rootName}${separator}${appName}"
```

Refer to the Settings editor (`kb()`) comments to learn about setting specific variables.

**Q: Why isn't ${workspaceRoot} documented?**

**A:** The variable `${workspaceRoot}` was deprecated in favor of `${workspaceFolder}` when [Multi-root Workspace](/docs/editor/multi-root-workspaces.md) support was added to VS Code.