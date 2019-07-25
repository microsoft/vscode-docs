---
Order:
TOCTitle: Error Codes
ContentId: 343B5C4D-3473-4454-AD22-084F405D6905
PageTitle: Visual Studio Code workarounds for errors you might hit in the product.
DateApproved: 7/3/2019
MetaDescription: Several error conditions can easily be resolved by the user this page is designed to help un-block you.
---
# Common Error Cases

Some errors that occur when using Visual Studio Code can be worked around or resolved by you. This topic describes several common error conditions, listed by error code number, and what you can do to resolve them.

## 20002

**Error:** Cannot find '/usr/bin/gnome-terminal' for launching your Node.js program

On Linux, the VS Code Node.js debugger requires the [gnome-terminal](https://help.gnome.org/users/gnome-terminal/stable/) emulator for launching the Node.js program. If gnome-terminal is not installed, the VS Code debugger cannot launch your program for debugging.

There are two options for solving this problem:

* Install the gnome-terminal by running the command `sudo apt-get install gnome-terminal` (or the equivalent of your Linux distribution).
* Manually launch your program in debug mode by passing a `--inspect` or `--inspect-brk` option to Node.js and then attach the VS Code debugger to port 9229 on 'localhost'.

## 20003

**Error:** Attribute 'program' is not absolute; consider adding '${workspaceFolder}/' as a prefix to make it absolute.

This error occurs when you have a relative path in your [debug configuration](/docs/editor/debugging.md#launch-configurations) `launch.json` file (located in your workspace `.vscode` directory).

In the example below, the `program` attribute has a relative path to `app.js` at the root of the workspace (project folder).

```json
{
"version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "./app.js"
        }
    ]
}
```

The fix is to use an absolute path or better use the `${workspaceFolder}` variable which will resolve to the absolute path of the project folder.

```json
{
"version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/app.js"
        }
    ]
}
```

By using the `${workspaceFolder}` variable, you won't need to update the absolute path if the project is moved or shared with other developers.

In previous versions of VS Code, you were allowed to use relative paths in your launch configurations but this was problematic. VS Code now warns you about relative paths when you start a debugging session and recommends prefixing the relative path with `${workspaceFolder}/`. VS Code also checks other path attributes, such as `cwd` (current working directory), `outFiles` (location of other JavaScript files), and `runtimeExecutable`.

> **Tip:** See the VS Code [debugging](/docs/editor/debugging.md) documentation for more information about `launch.json`, [debugger configuration](/docs/editor/debugging.md#launch-configurations), and [variable substitution](/docs/editor/variables-reference.md).

## Didn't find a solution?

### GitHub issues

If the steps above don't help you, you may have hit a bug. You can check our [reported issues](https://github.com/microsoft/vscode/issues) to see if others have reported the same issue.

### Online search

You can also search the rest of our online [documentation](/docs) for answers in our main topics and **Common questions** sections. The online **Search** control is located in the upper right of the [code.visualstudio.com](/docs) website.

### Stack Overflow

There is also an active VS Code [Stack Overflow channel](https://go.microsoft.com/fwlink/?LinkID=536384) where you can browse answers or ask a question.
