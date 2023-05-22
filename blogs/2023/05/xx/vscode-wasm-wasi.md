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

- we should be able to run the code we compile to WebAssembly inside VS Code without modifying it.
- the executed code should have access to the files in the opened workspace.
- standard input and output should be nicely integrated into VS Code's terminal.

To make things concrete we decided to try to get [Python](https://www.python.org/) code executed in a browser. Luckily the Python team already started working on compiling [CPython to WASM](https://github.com/tiran/cpython-wasm-test/releases) and we happily piggybacked on their effort. The outcome of the exploration can be seen in the screen cast below:

![Execute a Python file in VS Code for the Web](./run-python-file.gif)

Doesn't really look different to executing Python code in VS Code desktop. So why is this cool?

- the Python code (`app.py` and `hello.py`) is actually hosted in a [GitHub repository](https://github.com/dbaeumer/wasm-wasi-sample) and directly read from GitHub.
- the sample code is multi file. `app.py` depends on `hello.py`.
- the output shows up in VS Code's terminal.
- you can run a Python REPL and fully interact with it.

## How does it work - the bird's eye view

As said earlier we are using the Python WebAssembly executable provided by the Python team. But how does the web assembly talk to the files in the workspace and gets access to VS Code's terminal?

When starting the endeavor we looked at the tool chains available to create web assemblies from C/C++ and Rust code. The two prevalent tool chains for C/C++ are (a) [emscripten](https://emscripten.org/index.html) and (b) [WASI-SDK](https://github.com/WebAssembly/wasi-sdk). Although they both create WASM code they have quite different characteristics:

- *emscripten*: has a special focus on the Web platform and [Node.js](https://nodejs.org/en). Besides generating WASM code it also generates JavaScript code that acts as a host to execute the WASM code in either the browser or Node.js environment.
- *WASI-SDK*: compiles C/C++ code to WASM and assumes a host implementation that conforms to the [WASI](https://wasi.dev/) [specification](https://github.com/WebAssembly/WASI). WASI stands for WebAssembly System Interface. It defines several operating-system-like features, including files and file systems, sockets, clocks, and random numbers. [Wasmtime](https://github.com/bytecodealliance/wasmtime) is for example a runtime that provides a WASI host implementation and therefore supports executing WebAssembly code compiled to WASM-WASI on a standard operation system.

For VS Code we decided to support WASI. Although our primary focus is to execute WebAssembly code in the browser, we are actually not running it in a pure browser environnement. We want to run WebAssemblies in VS Code's extension host worker which besides the browser's worker API also provides the whole [VS Code Extension API](https://code.visualstudio.com/api). So instead of wiring a `read` call in C/C++ program to the browser's fetch API we actually want to wire it to VS Code's [file system](https://insiders.vscode.dev/github/microsoft/vscode/blob/main/src/vscode-dts/vscode.d.ts#L8378) API. Doing this in WASI was easier for us than in emscripten.

Our current implementation of VS Code's WASI host is based on the [WASI snapshot preview1](https://github.com/WebAssembly/WASI/blob/main/legacy/preview1/docs.md). So all implementation details described in this blog post refer to that version.

Rust, like C/C++, also supports `wasm32-wasi` and `emscripten` as compile targets. So basing our implementation on WASI also allows using Rust as a programming language to generate a WebAssembly and execute it in VS Code for the Web.

## How can I try it?

Before digging deeper into technical details the blog post will outline how you can compile your own little C program to `wasm32-wasi` and execute it inside VS Code's extension host. The example assumes that the reader is familiar with [VS Code's Extension API](https://code.visualstudio.com/api) and knows how to write an extension for [VS Code for the Web](https://code.visualstudio.com/api/extension-guides/web-extensions).

The C program we want to run is a simple Hello World program that looks like this:

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

New feature are added to VS Code via extensions and we follow the same model when integrating WebAssemblies into VS Code. So we need to define an extension that loads and runs the WebAssembly code. The important parts of the extension's `package.json` manifest are as follows:

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

The [`ms-vscode.wasm-wasi-core`](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core) extension provides the WebAssembly execution engine that wires the WASI host up the the VS Code API. The node module `@vscode/wasm-wasi` provides a facade to ease calling the API exported by the execution engine extension.

Below is the actual TypeScript code to run the WebAssembly:

```typescript
import { Wasm } from '@vscode/wasm-wasi';
import { commands, ExtensionContext, Uri, window, workspace } from 'vscode';

export async function activate(context: ExtensionContext) {

	// Load the WASM API
	const wasm: Wasm = await Wasm.api();

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
		} catch (error) {
			// Show an error message if something goes wrong.
			await window.showErrorMessage(error.message);
		}
	});
}
```

The screen cast below shows the extension running in VS Code for the Web.

![Run Hello World](./helloWorld.gif)

## VS Code's WASI Implementation

As said earlier WASI is a specification and basing our WebAssembly support on it requires that VS Code implements that specification. This sounds somewhat easy but there is a big differences between WASI and VS Code's API: WebAssembly code execution is sync (e.g. once a WebAssembly execution started the JavaScript worker is blocked until the execution finished) whereas most of VS Code's API (especially around file access) is async. This characteristic causes two problems for the execution of WebAssembly code inside VS Code extension host worker:

- we need to avoid that the extension host is blocked when executing WebAssemblies since this would block other extensions from being executed.
- as said most of the VS Code API is async. So we need a mechanism to map the sync behavior of WebAssemblies / WASI onto the async VS Code API.

The first problem is easy to solve: we simply run the WebAssembly code in a separate worker thread. The second one is harder since mapping sync code onto async code needs suspending the sync executing thread and resuming it when the asynchronously computed result is available. The [JavaScript-Promise Integration Proposal for WebAssembly](https://github.com/WebAssembly/js-promise-integration) will solve this problem on the WASM layer and there is an experimental implementation of the proposal in [V8](https://v8.dev/blog/jspi). However when we started the effort that implementation was not available yet and even today it is still limited to V8. So we choose a different implementation which uses [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) and [`Atomics`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics) to map the sync WASI API onto VS Code's async API. The approach works as follows:

- the WASM worker thread creates a `SharedArrayBuffer` with the necessary information about the code that should be called on the VS Code side.
- it post that memory to VS Code's extension host worker and then waits for the extension host worker to write the result back into the `SharedArrayBuffer` by using [`Atomics.wait`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait)
- the extension host worker takes the message, calls the appropriate VS Code API, writes results back into the `SharedArrayBuffer` and then notifies the WASM worker thread to wake up using [`Atomics.store`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/store) and [`Atomics.notify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/notify).
- the WASM worker then reads any result data out of the `SharedArrayBuffer` and returns it to the WASI callback.

The only difficulty with this approach is that `SharedArrayBuffer` and `Atomics` require that the site is [cross-origin isolated](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) which, due to the fact that CORS is very viral, can be an endeavour by itself. This is why it is currently only enabled by default on https://insiders.vscode.dev/ and must be enabled using the query parameter `?vscode-coi=` on https://vscode.dev/

Below a diagram showing the interaction between the WASM worker and the extension host worker in more detail for the little C program from above that we compiled to WebAssembly. The code in the orange box is WebAssembly code and all the code in green boxes runs in JavaScript. The yellow box represents the `SharedArrayBuffer`

![Interaction between the WASM worker and the extension host](./diagram.png)

## A Web Shell

Now that we were able to compile C/C++ and Rust code to WebAssembly and execute it in VS Code we explored whether we can run a shell in VS Code for the Web as well.

We looked into compiling one of the *nix shells to WebAssembly. However shells rely on OS features (spawning processes, ...) not available in WASI right now. So we took a slightly different approach: we implemented a basic shell in TypeScript and tried to compile only the *nix core utils like ls, cat, date, ... to WebAssembly. Since Rust has very good support for WASM and WASI we gave the [uutils/coreutils](https://github.com/uutils/coreutils), a cross-platform re-implementation of the GNU coreutils in Rust, a try. And voila we had a first minimal web shell.

![A web shell](./webshell.gif)

A shell is very limited if you can't execute custom WebAssemblies or commands. To extend the web shell extensions can contribute additional mount points to the file system as well as commands that are invoked when they are typed into the web shell. The indirection via commands supports to decouple the concrete WebAssembly execution from what is type in the terminal. Using this support in the Python extension form above allows two execute Python code from the shell (e.g. `python app.py`) or listing the default python 3.11 library which is usually mounted under `/usr/local/lib/python3.11`

![Python integration into web shell](./python-webshell.gif)

## What comes next

The WASM execution engine extension and the Web Shell extension are both experimental and in preview mode and shouldn't be used right now to implement production ready extensions using WebAssemblies. We made them publicly available to get early feedback on the technology. If you have any please open issues in the corresponding [GitHub repository](https://github.com/microsoft/vscode-wasm/issues).

We do already know that we will extend the exploration into the following directions:
- the WASI team is working on a preview2 of the specification which we want to support that version as well. Version 2 will change the way how a WASI host is implemented. However, we are confident that we can keep the API, which we expose in the WASM execution engine extension, mostly stable.
- lots of language servers for VS Code are implemented in languages different than JavaScript or TypeScript. We would like to explore the possibility to compile these language server to `wasm-wasi` and run them in VS Code for the Web as well.

Thanks,

Dirk and the VS Code team

Happy Coding!