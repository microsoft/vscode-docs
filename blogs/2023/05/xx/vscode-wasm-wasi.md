---
Order: 80
TOCTitle: VS Code and WebAssembly
PageTitle: Visual Studio Code and GitHub Copilot AI
MetaDescription: Running WebAssemblies in VS Code for the Web.
Date: 2023-05-31
Author: Dirk Bäumer
---
# Using WebAssemblies to execute non JavaScript code in VS Code Web

[VS Code for the Web](https://vscode.dev/) is around for a while now and it was always our goal to provide more than simple code editing features in vscode.dev. The biggest challenges to support more phases of the edit / compile / debug cycle for languages other than JavaScript and TypeScript are:

- having language smarts support through language servers.
- being able to execute and debug the code.

Today the first item gets partly addressed by generic language supports like [AnyCode](https://marketplace.visualstudio.com/items?itemName=ms-vscode.anycode). In the future we will see [GitHub Copilt](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) being available in the Web which further reduces the need to get a specific language server running in the Web.

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

When starting the endeavor we looked at the tool chains available to create web assemblies from C/C++ and Rust code. The two prevalent tool chains for C/C++ are (a) [emscripten](https://emscripten.org/index.html) and (b) [WASI-SDK](https://github.com/WebAssembly/wasi-sdk). Although they both create WASM code they have quite different characteristics:

- *emscripten*: has a special focus on the Web platform and [Node.js](https://nodejs.org/en). Besides generating WASM code it also generates JavaScript code that acts as a host to execute the WASM code in either the browser to Node.js.
- *WASI-SDK*: compiles C/C++ code to WASM and assumes a host implementation that conforms to the [WASI](https://wasi.dev/) [specification](https://github.com/WebAssembly/WASI). WASI stands for WebAssembly System Interface. It defines several operating-system-like features, including files and file systems, sockets, clocks, and random numbers. [Wasmtime](https://github.com/bytecodealliance/wasmtime) is for example a runtime that provides a WASI host implementation and therefore supports executing WebAssembly code compiled to WASM-WASI on a standard operation system.

For VS Code we decided to support WASI. Although our primary focus is to execute WebAssembly code in the browser, we are actually not running it in a pure browser environnement. We want to run WebAssemblies in VS Code's extension host worker which besides the browser's worker API also provides the whole [VS Code Extension API](https://code.visualstudio.com/api). So instead of wiring a `read` call in C/C++ to a browser fetch we actually want to wire it to a VS Code's [file system](https://insiders.vscode.dev/github/microsoft/vscode/blob/main/src/vscode-dts/vscode.d.ts#L8378). Doing this in WASI was easier for us than in emscripten.

Our current implementation of VS Code's WASI host is based on the [WASI snapshot preview1](https://github.com/WebAssembly/WASI/blob/main/legacy/preview1/docs.md). So all implementation details described in this blog post refer to that version.

Rust, like C/C++, also supports `wasm32-wasi` and `emscripten` as compile targets. So basing our implementation on WASI allows using Rust as a programming language to compile to WASM as well.

## Run your own WASM program

Before digging deeper into technical details the blog post will outline how you can compile your own little C program to `wasm32-wasi` and execute inside VS Codes extension host. The example assumes that the reader is familiar with [VS Code's Extension API](https://code.visualstudio.com/api) and knows how to write an extension for [VS Code for the Web](https://code.visualstudio.com/api/extension-guides/web-extensions).

The C program we want to run is a simple Hello World program which looks like this:

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, World\n");
    return 0;
}
```

Assuming that you have the latest WASI-SDK installed and it is on your PATH the C program can be compile using the following command:

```sh
clang hello.c -o ./hello.wasm
```

This will generated a `hello.wasm` file next to the `hello.c` file.

VS Code is extended using extensions and we follow the same model when integrating WebAssemblies into VS Code. So we need to define an extension that loads and runs the WebAssembly. The extensions `package.json` manifest looks like this:

```json
```
