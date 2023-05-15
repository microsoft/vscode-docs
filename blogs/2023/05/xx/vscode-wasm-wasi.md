---
Order: 80
TOCTitle: VS Code and WebAssembly
PageTitle: Visual Studio Code and GitHub Copilot AI
MetaDescription: Running WebAssemblies in VS Code for the Web.
Date: 2023-05-31
Author: Dirk Bäumer
---
# Using WebAssemblies to execute non JavaScript code in VS Code Web

[VS Code for the Web](https://vscode.dev/) is around for a while now and it was always our goal to provide more than simple code editing featues in vscode.dev. The biggest challenges to support more phases of the edit / compile / debug cycle for langauges other than JavaScript and TypeScript are:

- having language smarts support through language servers.
- being able to execute and debug the code.

Today the first item gets partly adressed by generic language supports like [AnyCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.anycode). In the future we will see [GitHub Copilt](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) being available in the Web which further reduces the need to get a specific language server running in the Web.

The [WebAssembly](https://webassembly.org/) technology can be used to execute code other than JavaScript in a web browser. So we decided to explore how far we can get with WebAssemblies today. Our goals where as follows:

- we should be able to run the code without modifications
- the executed code should have access to the files in the VS Code workspace
- standard input and output should be nicely integrated into VS Code's terminal.

To make things concrete we decided to try to get [Python](https://www.python.org/) code executed in a browser. Luckily the Python team already started working on compiling [CPython to WASM](https://github.com/tiran/cpython-wasm-test/releases) and we happily piggybacked on their effort. The outcome of the exploration can be seen in the screen cast below:

![Execute a Python file in VS Code for the Web](./run-python-file.gif)

So, doesn't look really different to executing Python code in VS Code desktop. So why is this cool?

- the Python code (`app.py` and `hello.py`) is actually hosted in a [GitHub repository](https://github.com/dbaeumer/wasm-wasi-sample) and directly read from GitHub.
- the sample code is multi file. `app.py` depends on `hello.py`.
- the output shows up in VS Code's terminal.
- you can run a Python REPL and fully interact with it.

## How does it work

As said earlier we are using the Python WebAssembly executable provided by the Python team. But how does the web assembly talk to the files in the workspace and gets access to VS Code's terminal?