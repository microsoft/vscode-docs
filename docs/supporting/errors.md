---
Order:
TOCTitle:
PageTitle: Visual Studio Code workarounds for errors you might hit in the product.
MetaDescription: Several error conditions can easily be resolved by the user this page is designed to help un-block you.
---

# Common Error Cases

Some errors that happen in Visual Studio Code can be worked around or resolved by you.  This topic describes several of the most common error conditions, and what you can do to resolve them.

If these steps don't help you, you probably hit a bug. You can check our [reported issues](http://code.visualstudio.com/Issues) list to see if others have had the same issue.

## 20001
>**Error:** Cannot start OmniSharp because Mono version >=3.10.0 is required

Currently, debugging support of VS Code on Linux or OS X requires Mono version 3.12 or later.
If you intend to build ASP.NET 5 applications with VS Code, we recommend to first follow the steps
**Installing ASP.NET 5 and DNX** in [ASP.NET 5 Applications](/docs/runtimes/ASPnet5), since this will install a version of Mono
that also supports debugging.

If you just want to try debugging support of VS Code, you can either download the latest Mono version
for Linux or OS X at <http://www.mono-project.com/download/>, or you can use your package manager:

* On OS X: `brew install mono`
* On Linux: `sudo apt-get install mono-complete`

## 20002
>**Error:** Cannot find '/usr/bin/gnome-terminal' for launching your Node.js program

On Linux the VS Code Node.js debugger requires the **gnome-terminal** for launching the Node.js program.
If gnome-terminal is not installed, the VS Code debugger cannot launch your program for debugging.

There are two options for solving this problem:

* Install the gnome-terminal by running the command `sudo apt-get install gnome-terminal` (or the equivalent of your Linux distribution)
* Manually launch your program in debug mode by passing a `--debug` or `--debug-brk` option to Node.js and then attach the VS Code debugger to port 5858 on 'localhost'.
