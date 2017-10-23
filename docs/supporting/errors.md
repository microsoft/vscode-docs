---
Order:
TOCTitle: Error Codes
ContentId: 343B5C4D-3473-4454-AD22-084F405D6905
PageTitle: Visual Studio Code workarounds for errors you might hit in the product.
DateApproved: 10/5/2017
MetaDescription: Several error conditions can easily be resolved by the user this page is designed to help un-block you.
---
# Common Error Cases

Some errors that happen in Visual Studio Code can be worked around or resolved by you.  This topic describes several of the most common error conditions, and what you can do to resolve them.

If these steps don't help you, you probably hit a bug. You can check our [reported issues](https://github.com/microsoft/vscode/issues) list to see if others have had the same issue.

## 20002

>**Error:** Cannot find '/usr/bin/gnome-terminal' for launching your Node.js program

On Linux the VS Code Node.js debugger requires the **gnome-terminal** for launching the Node.js program.
If gnome-terminal is not installed, the VS Code debugger cannot launch your program for debugging.

There are two options for solving this problem:

* Install the gnome-terminal by running the command `sudo apt-get install gnome-terminal` (or the equivalent of your Linux distribution)
* Manually launch your program in debug mode by passing a `--inspect` or `--inspect-brk` option to Node.js and then attach the VS Code debugger to port 9229 on 'localhost'.

## 20003

>**Error:** Attribute 'program' is not absolute; consider adding '${workspaceFolder}/' as a prefix to make it absolute.

The workspace root is the folder where your code is located on disk e.g. `c:\src\helloworld`.  Before VS Code release 0.10.11, it was possible to use relative paths in launch configurations. VS Code would silently convert them to absolute paths.

There were two problems with this:

* VS Code would only fix paths for some well-known attributes like `program`, `cwd`, or `outFiles`. Relative paths passed as an argument or set as an environment variable would not be fixed and this behavior was not transparent.
* VS Code would only fix paths in the `launch.json` configuration file. It would not touch paths in `tasks.json` and this inconsistency was difficult to understand.

Starting with release 0.10.11, VS Code no longer modifies launch configuration paths.  If you are using relative paths in your launch configurations, you'll need to fix them by prefixing the relative path with `${workspaceFolder}/`.

> **Tip:** Documentation on `launch.json` and [debugger configuration](/docs/editor/debugging#_launch-configurations) provides several examples for the `program` attribute.