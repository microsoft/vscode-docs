---
Order: 82
TOCTitle: VS Code and WebAssemblies
PageTitle: VS Code and WebAssemblies
MetaDescription: Running WebAssemblies in VS Code for the Web.
Date: 2023-06-05
Author: Dirk Bäumer
---
# Run WebAssemblies in VS Code for the Web

June 5, 2023 by Dirk Bäumer

VS Code for the Web ([https://vscode.dev](https://vscode.dev)) has been available for some time now and it has always been our goal to support the full edit / compile / debug cycle in the browser. This is relatively easy for languages like JavaScript and TypeScript since browsers ship with a JavaScript execution engine. It is harder for other languages since we must be able to execute (and therefore debug) the code. For example, to run Python source code in a browser, there needs to be an execution engine that can run the [Python](https://www.python.org/) interpreter. These language runtimes are usually written in C/C++.

[WebAssembly](https://webassembly.org/) is a binary instruction format for a virtual machine. WebAssembly virtual machines ship in modern browsers today and there are tool chains to compile C/C++ to WebAssembly code. To find out what is possible with WebAssemblies today, we decided to take a Python interpreter written C/C++, compile it to WebAssembly, and run it in VS Code for the Web. Luckily, the Python team already started working on compiling [CPython to WASM](https://github.com/brettcannon/cpython-wasi-build/releases) and we happily piggybacked on their effort. The outcome of the exploration can be seen in the short video below:

![Execute a Python file in VS Code for the Web](run-python-file.gif)

It doesn't really look different than executing Python code in VS Code desktop. So, why is this cool?

* The Python source code (`app.py` and `hello.py`) is hosted in a [GitHub repository](https://github.com/dbaeumer/wasm-wasi-sample) and directly read from GitHub. The Python interpreter has full access to the files in the workspace, but not to any other files.
* The sample code is multi file. `app.py` depends on `hello.py`.
* The output shows up nicely in VS Code's terminal.
* You can run a Python REPL and fully interact with it.
* And of course, it **runs** on the web.

Additionally, the Python interpreter compiled to WebAssembly (WASM) code requires no modification to run in VS Code for the Web. The bits are one for one the same created by the CPython team.

## How does it work?

WebAssembly virtual machines don't come with an SDK (like, for example, [Java](https://www.java.com) or [.NET](https://dotnet.microsoft.com)). So out of the box, WebAssembly code can't print to a console or read the content of a file. What the WebAssembly specification defines is how WebAssembly code can call functions in the host running the virtual machine. In the case of VS Code for the Web, the host is the browser. The virtual machine can therefore call JavaScript functions that are executed in the browser.

The Python team provides WebAssembly binaries of their interpreter in two flavors: one compiled with [emscripten](https://emscripten.org/index.html) and the other compiled with the [WASI SDK](https://github.com/WebAssembly/wasi-sdk). Although they both create WebAssembly code, they have different characteristics regarding the JavaScript functions they provide as a host implementation:

* **emscripten** - has a special focus on the Web platform and [Node.js](https://nodejs.org). In addition to generating WASM code, it also generates JavaScript code that acts as a host to execute the WASM code in either the browser or Node.js environment. For example, the JavaScript code provides a function to print the content of a C `printf` statement to the browser's console.
* **WASI SDK** - compiles C/C++ code to WASM and assumes a host implementation that conforms to the [WASI specification](https://github.com/WebAssembly/WASI). WASI stands for [WebAssembly System Interface](https://wasi.dev). It defines several operating system-like features, including files and file systems, sockets, clocks, and random numbers. Compiling C/C++ code with the WASI SDK will only generate WebAssembly code but will not generate any JavaScript functions. The JavaScript functions necessary to print the content of a C `printf` statement must be provided by the host. [Wasmtime](https://github.com/bytecodealliance/wasmtime) is, for example, a runtime that provides a WASI host implementation that wires WASI to operating system calls.

For VS Code, we decided to support WASI. Although our primary focus is to execute WASM code in the browser, we are not actually running it in a pure browser environment. We must run WebAssemblies in VS Code's extension host worker since this is the standard way that VS Code is extended. The extension host worker provides, beside the browser's worker API, the entire [VS Code extension API](https://code.visualstudio.com/api). So instead of wiring a `printf` call in a C/C++ program to the browser's console, we actually want to wire it to VS Code's [Terminal](https://insiders.vscode.dev/github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.d.ts#L6704) API. Doing this in WASI was easier for us than in emscripten.

Our current implementation of VS Code's WASI host is based on the [WASI snapshot preview1](https://github.com/WebAssembly/WASI/blob/main/legacy/preview1/docs.md) and all implementation details described in this blog post refer to that version.

## How can I run my own WebAssembly code?

After we had Python running in VS Code for the Web, we quickly realized that the approach we took allows us to execute any code that can be compiled to WASI. This section therefore demonstrates how to compile a small C program to WASI using the WASI SDK and execute it inside VS Code's extension host. The example assumes that the reader is familiar with [VS Code's extension API](https://code.visualstudio.com/api) and knows how to write an extension for [VS Code for the Web](https://code.visualstudio.com/api/extension-guides/web-extensions).

The C program we run is a simple "Hello World" program that looks like this:

```c
#include <stdio.h>

int main(void)
{
    printf("Hello, World\n");
    return 0;
}
```

Assuming you have the latest WASI SDK installed and it is on your `PATH`, the C program can be compiled using the following command:

```sh
clang hello.c -o ./hello.wasm
```

This generates a `hello.wasm` file next to the `hello.c` file.

New features are added to VS Code via extensions, and we follow the same model when integrating WebAssemblies into VS Code. We need to define an extension that loads and runs the WASM code. The important parts of the extension's `package.json` manifest are as follows:

```json
{
    "name": "...",
    ...,
    "extensionDependencies": [
        "ms-vscode.wasm-wasi-core"
    ],
    "contributes": {
        "commands": [
            {
                "command": "wasm-c-example.run",
                "category": "WASM Example",
                "title": "Run C Hello World"
            }
        ]
    },
    "devDependencies": {
        "@types/vscode": "1.77.0",
    },
    "dependencies": {
        "@vscode/wasm-wasi": "0.11.0-next.0"
    }
}
```

The [ms-vscode.wasm-wasi-core](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core) extension supplies the WebAssembly execution engine that wires the WASI API up to the VS Code API. The node module `@vscode/wasm-wasi` provides a facade to load and run WebAssembly code in VS Code.

Below is the actual TypeScript code to load and run WebAssembly code:

```typescript
import { Wasm } from '@vscode/wasm-wasi';
import { commands, ExtensionContext, Uri, window, workspace } from 'vscode';

export async function activate(context: ExtensionContext) {

    // Load the WASM API
    const wasm: Wasm = await Wasm.load();

    // Register a command that runs the C example
    commands.registerCommand('wasm-wasi-c-example.run', async () => {
        // Create a pseudoterminal to provide stdio to the WASM process.
        const pty = wasm.createPseudoterminal();
        const terminal = window.createTerminal({ name: 'Run C Example', pty, isTransient: true });
        terminal.show(true);

        try {
            // Load the WASM module. It is stored alongside the extension's JS code.
            // So we can use VS Code's file system API to load it. Makes it
            // independent of whether the code runs in the desktop or the web.
            const bits = await workspace.fs.readFile(Uri.joinPath(context.extensionUri, 'hello.wasm'));
            const module = await WebAssembly.compile(bits);
            // Create a WASM process.
            const process = await wasm.createProcess('hello', module, { stdio: pty.stdio });
            // Run the process and wait for its result.
            const result = await process.run();
            if (result !== 0) {
                await window.showErrorMessage(`Process hello ended with error: ${result}`);
            }
        } catch (error) {
            // Show an error message if something goes wrong.
            await window.showErrorMessage(error.message);
        }
    });
}
```

The video below shows the extension running in VS Code for the Web.

![Run Hello World](helloWorld.gif)

We used C/C++ code as a source for the WebAssembly and because WASI is a standard, there are other toolchains that support WASI. Examples are: [Rust](https://www.rust-lang.org), [.NET](https://github.com/dotnet/dotnet-wasi-sdk), or [Swift](https://swiftwasm.org).

## VS Code's WASI implementation

WASI and the VS Code API share concepts like a file system or stdio (for example, a terminal). This enabled us to implement the WASI specification on top of the VS Code API. However, the different execution behavior was a challenge: WebAssembly code execution is synchronous (for example, once a WebAssembly execution started, the JavaScript worker is blocked until the execution finished), whereas most of the API of VS Code and the browser is asynchronous. For instance, reading from a file in WASI is synchronous while the corresponding VS Code API is asynchronous. This characteristic causes two problems for the execution of WebAssembly code inside VS Code extension host worker:

* We need to prevent the extension host from being blocked while executing WebAssembly code since this would block other extensions from being executed.
* A mechanism is needed to implement the synchronous WASI API on top of the asynchronous VS Code and browser API.

The first case is easy to solve: we run the WebAssembly code in a separate worker thread. The second case is harder to solve since mapping sync code onto async code needs suspending the synchronous executing thread and resuming it when the asynchronously computed result is available. The [JavaScript-Promise Integration Proposal for WebAssembly](https://github.com/WebAssembly/js-promise-integration) solves this problem on the WASM layer and there is an experimental implementation of the proposal in [V8](https://v8.dev/blog/jspi). However, when we started the effort, the V8 implementation was not available yet. So we chose a different implementation, which uses [SharedArrayBuffer](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) and [Atomics](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Atomics) to map the sync WASI API onto VS Code's async API.

The approach works as follows:

* The WASM worker thread creates a `SharedArrayBuffer` with the necessary information about the code that should be called on the VS Code side.
* It posts the shared memory to VS Code's extension host worker and then waits for the extension host worker to finish its work using [Atomics.wait](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait).
* The extension host worker takes the message, calls the appropriate VS Code API, writes results back into the `SharedArrayBuffer` and then notifies the WASM worker thread to wake up using [Atomics.store](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Atomics/store) and [Atomics.notify](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Atomics/notify).
* The WASM worker then reads any result data out of the `SharedArrayBuffer` and returns it to the WASI callback.

The only difficulty with this approach is that `SharedArrayBuffer` and `Atomics` require the site to be [cross-origin isolated](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements), which, because CORS is very viral, can be an endeavor by itself. This is why it is currently only enabled by default on the Insiders version [insiders.vscode.dev](https://insiders.vscode.dev) and must be enabled using the query parameter `?vscode-coi=on` on [vscode.dev](https://vscode.dev).

Below is a diagram showing the interaction between the WASM worker and the extension host worker in more detail for the C program above that we compiled to WebAssembly. The code in the orange box is WebAssembly code and all the code in green boxes runs in JavaScript. The yellow box represents the `SharedArrayBuffer`.

![Interaction between the WASM worker and the extension host](diagram.png)

## A web shell

Now that we were able to compile C/C++ and Rust code to WebAssembly and execute it in VS Code, we explored whether we could run a shell in VS Code for the Web as well.

We investigated compiling one of the Unix shells to WebAssembly. However, some shells rely on operating system features (spawning processes, ...), which are not available in WASI right now. This led us to take a slightly different approach: we implemented a basic shell in TypeScript and tried to compile only the Unix core utils like `ls`, `cat`, `date`, ... to WebAssembly. Since Rust has very good support for WASM and WASI, we gave the [uutils/coreutils](https://github.com/uutils/coreutils), a cross-platform reimplementation of the GNU coreutils in Rust, a try. Et voilà, we had a first minimal web shell.

![A web shell](webshell.gif)

A shell is very limited if you can't execute custom WebAssemblies or commands. To extend the web shell, other extensions can contribute additional mount points to the file system as well as commands that are invoked when they are typed into the web shell. The indirection via commands decouples the concrete WebAssembly execution from what is typed in the terminal. Using this support in the Python extension from the beginning allows you to execute Python code directly from within the shell by entering `python app.py` into the prompt or listing the default python 3.11 library, which is usually mounted under `/usr/local/lib/python3.11`.

![Python integration into web shell](python-webshell.gif)

## What comes next?

The WASM execution engine extension and the Web Shell extension are both experimental as a preview and shouldn't be used to implement production ready extensions using WebAssemblies. They have been made publicly available to get early feedback on the technology. If you have any questions or feedback, please open issues in the corresponding [vscode-wasm](https://github.com/microsoft/vscode-wasm/issues) GitHub repository. This repository also contains the source code for the [Python example](https://insiders.vscode.dev/github/microsoft/vscode-wasi/blob/main/testbeds/python/extension.ts#L1) as well as for the [WASM execution engine](https://insiders.vscode.dev/github/microsoft/vscode-wasi/blob/main/wasm-wasi-core/package.json#L1) and the [Web Shell](https://insiders.vscode.dev/github/microsoft/vscode-wasi/blob/main/webshell/package.json#L1).

What we do know is that we will further explore the following topics:

* The WASI team is working on a preview2 and preview3 of the specification, which we plan to support as well. The new versions will change the way a WASI host is implemented. However, we are confident that we can keep our API, which is exposed in the WASM execution engine extension, mostly stable.
* There is also the [WASIX](https://wasix.org/) effort that extends WASI with additional [operating system-like features](https://wasix.org/docs/api-reference) such as process or futex. We will continue to watch this work.
* Many language servers for VS Code are implemented in languages different than JavaScript or TypeScript. We plan to explore the possibility of compiling these language servers to `wasm32-wasi` and running them in VS Code for the Web as well.
* Improving debugging for Python on the Web. We have started to work on this, so stay tuned.
* Add support so that extension B can run WebAssembly code contributed by extension A. This will, for example, allow arbitrary extensions to execute Python code by reusing the extension that contributed the Python WebAssembly.
* Ensuring that other language runtimes that are compiled for `wasm32-wasi` run on top of VS Code's WebAssembly execution engine. [VMware Labs](https://github.com/vmware-labs/webassembly-language-runtimes) provides Ruby and PHP `wasm32-wasi` binaries and both do run in VS Code.

Thanks,

Dirk and the VS Code team

Happy Coding!
