---
Order: 82
TOCTitle: VS Code Extensions and WebAssembly
PageTitle: VS Code Extensions and WebAssembly
MetaDescription: Using WebAssembly for Extension Development.
Date: 2024-04-30
Author: Dirk Bäumer
---
# Using WebAssembly for Extension Development

Visual Studio Code supports the execution of WASM binaries, through the [WebAssembly Execution Engine](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core) extension. The major use case is to compile programs written in C/C++ or Rust to WebAssembly, and then run these programs one to one in VS Code. A great example is [Visual Studio Code for Education](https://vscodeedu.com/), which uses this support to run the Python interpreter in VS Code for the Web. This [blog post](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) describes in detail how this works.

In January 2024, the Bytecode Alliance launched the [WASI 0.2 preview](https://bytecodealliance.org/articles/WASI-0.2). One of the core technologies of the WASI 0.2 preview is the [Component Model](https://github.com/WebAssembly/component-model/). The WebAssembly Component Model simplifies interactions between WebAssembly components themselves and their host environments, by standardizing interfaces, data types, and module composition. This standardization is achieved by describing a component via a WIT ([WASM Interface Type](https://component-model.bytecodealliance.org/design/wit.html)) file. WIT files can be used to describe the interaction between a JavaScript/TypeScript extension (the host) and a WebAssembly component that is doing some computation coded in another language, such as Rust or C/C++.

This blog post describes how a developer can use the component model to integrate a WebAssembly library into their extension. The examples require that you have, besides VS Code and NodeJS, the latest versions of following tools installed: [rust compiler toolchain](https://www.rust-lang.org/), [wasm-tools](https://github.com/bytecodealliance/wasm-tools), and [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen).

## A Calculator in Rust

In the first example, we demonstrate how a developer can integrate a library that is written in Rust into a VS Code extension. As mentioned previously, components are described using a WIT file. In our example, the library performs simple operations, such as add, subtract, multiply, and divide. The corresponding WIT file looks as follows:

```wit
package vscode:example;

interface types {
	record operands {
		left: u32,
		right: u32
	}

	variant operation {
		add(operands),
		sub(operands),
		mul(operands),
		div(operands)
	}
}
world calculator {
	use types.{ operation };

	export calc: func(o: operation) -> u32;
}
```

The Rust tool [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen) is used to generate a Rust binding for the calculator. You can use the tool in two ways:

- As a procedural macro to generate the bindings in-place within the implementation file. This is the standard usage, but comes with the disadvantage of not being able to inspect the generated bindings code.

- As a [command line tool](https://github.com/bytecodealliance/wit-bindgen?tab=readme-ov-file#cli-installation) that generates a bindings file on disk. The code in the [VS Code extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model-resource) of the resources example below makes use of that approach.

The corresponding Rust file that uses the `wit-bindgen` tool as a procedural macro, looks like this:

```rust
// Use a procedural macro to generate bindings for the world we specified in
// `calculator.wit`
wit_bindgen::generate!({
	// the name of the world in the `*.wit` input file
	world: "calculator",
});
```

However, when you compile the Rust file to a WebAssembly with `cargo build --target wasm32-unknown-unknown` produces compile errors, because the implementation of the exported `calc` function is missing. Here is a simple implementation of the `calc` function:

```rust
// Use a procedural macro to generate bindings for the world we specified in
// `calculator.wit`
wit_bindgen::generate!({
	// the name of the world in the `*.wit` input file
	world: "calculator",
});

struct Calculator;

impl Guest for Calculator {

    fn calc(op: Operation) -> u32 {
		let result = match op {
			Operation::Add(operands) => operands.left + operands.right,
			Operation::Sub(operands) => operands.left - operands.right,
			Operation::Mul(operands) => operands.left * operands.right,
			Operation::Div(operands) => operands.left / operands.right,
		};
		return result;
	}
}

// Export the Calculator to the extension code.
export!(Calculator);
```

The `export!(Calculator);` statement at the end of the file exports the `Calculator` from the WebAssembly code to enable the extension to call the API.

The `wit2ts` tool is used to generate the necessary TypeScript bindings for interacting with the WebAssembly code from within a VS Code extension. This tool was developed by the VS Code team. We implemented our own tooling to support the specific requirements of the VS Code extension architecture. The main reasons are:

- The VS Code API is only available within the extension host worker. Any additional worker spawned from the extension host worker doesn't have access to the VS Code API. This is different from, for example, NodeJS or the Browser, where each worker has access to almost all the APIs of the runtime.
- Multiple extensions share the same extension host worker. An extension should not do any long-running synchronous computation on that worker.

These architectural requirements already existed when we implemented the [WASI Preview 1 for VS Code](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi). However, the implementation we used at the time was written by hand. We think that the component model will gain broader adoption, so we created a tool to help components with their VS Code specific host implementations.

The command `wit2ts --outDir ./src ./wit` generates a `calculator.ts` file in the `src` folder, which contains the TypeScript bindings for the WebAssembly code. A simple extension that uses the bindings looks like this:

```typescript
import * as vscode from 'vscode';
import { WasmContext, Memory } from '@vscode/wasm-component-model';

// Import the code generated by wit2ts
import { calculator, Types } from './calculator';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	// The channel for printing the result.
	const channel = vscode.window.createOutputChannel('Calculator');
	context.subscriptions.push(channel);

	// Load the Wasm module
	const filename = vscode.Uri.joinPath(context.extensionUri, 'target', 'wasm32-unknown-unknown', 'debug', 'calculator.wasm');
	const bits = await vscode.workspace.fs.readFile(filename);
	const module = await WebAssembly.compile(bits);

	// The context for the WASM module
	const wasmContext: WasmContext.Default = new WasmContext.Default();

	// Instantiate the module
	const instance = await WebAssembly.instantiate(module, {});
	// Bind the WASM memory to the context
	wasmContext.initialize(new Memory.Default(instance.exports));

	// Bind the TypeScript Api
	const api = calculator._.exports.bind(instance.exports as calculator._.Exports, wasmContext);

	context.subscriptions.push(vscode.commands.registerCommand('vscode-samples.wasm-component-model.run', () => {
		channel.show();
		channel.appendLine('Running calculator example');
		const add = Types.Operation.Add({ left: 1, right: 2});
		channel.appendLine(`Add ${api.calc(add)}`);
		const sub = Types.Operation.Sub({ left: 10, right: 8 });
		channel.appendLine(`Sub ${api.calc(sub)}`);
		const mul = Types.Operation.Mul({ left: 3, right: 7 });
		channel.appendLine(`Mul ${api.calc(mul)}`);
		const div = Types.Operation.Div({ left: 10, right: 2 });
		channel.appendLine(`Div ${api.calc(div)}`);
	}));
}
```

When you compile and run the above code in VS Code for the Web, this produces the following output in the `Calculator` channel:

<video src="calculator.mp4" title="Video that shows how to run the Calculator command in VS Code for the Web.]." autoplay loop controls muted></video>

You can find the full source code for this example in the [VS Code extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model).

## Inside @vscode/wasm-component-model

Inspecting the source code generated by the `wit2ts` tool shows that the code depends on the `@vscode/wasm-component-model` npm module. This npm module is the VS Code implementation of the [component model's canonical ABI](https://github.com/WebAssembly/component-model/blob/main/design/mvp/CanonicalABI.md) and is inspired by the corresponding Python code. Whenever possible we use the same naming conventions.

In contrast to other tools like [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen) or [jco](https://github.com/bytecodealliance/jco) that generate bindings for WIT files, `wit2ts` generates a meta model, which can then be used to generate bindings at runtime for different use cases. This allows us to honor the architectural needs for extension development inside VS Code. By doing this, we are able to *promisify* the bindings and run WebAssembly code in workers. We use this mechanism to implement the [WASI 0.2 preview](https://bytecodealliance.org/articles/WASI-0.2) for VS Code.

You might have noticed that, when generating the binding, you're referencing the function by using names like `calculator._.imports.create` (observe the underscore). To avoid name collisions with names in the WIT file (for example, there could be a type definition `imports`), API functions are provided in a `_` namespace. The meta model itself is in a `$` namespace. So, `calculator.$.exports.calc` represents the meta data for the exported `calc` function.

In the above example, the `add` operation parameter that gets passed into the `calc` function, is an object consisting of three fields: the op code, the left value, and the right value. The component model's canonical ABI defines that arguments are passed by value. It also specifies how the data is serialized, passed to WASM functions, and deserialized on the other side. In our example, this results in two operation objects: an object on the JavaScript heap, and another one in the linear WASM memory. This is illustrated in the following diagram.

![Diagram that shows how parameters are passed.](params-memory.png)

The following table lists the available WIT types, their mapping onto JavaScript objects in the VS Code component model implementation, and which TypeScript types are used.

| WIT         | JavaScript | TypeScript |
|-------------|------------|------------|
| u8 | number | type u8 = number; |
| u16 | number | type u16 = number; |
| u32 | number | type u32 = number; |
| u64 | bigint | type u64 = bigint; |
| s8 | number | type s8 = number; |
| s16 | number | type s16 = number; |
| s32 | number | type s32 = number; |
| s64 | bigint | type s64 = bigint; |
| float32 | number | type float32 = number; |
| float64 | number | type float64 = number; |
| bool | boolean |  boolean |
| string | string | string |
| char | string[0] | string |
| record | object literal | type declaration |
| list\<T\> | [] | Array\<T\>|
| tuple\<T1, T2\> | [] | [T1, T2] |
| enum | string values | string enum |
| flags | number | bigint | type flags = number | bigint |
| variant | object literal | discriminated union |
| option\<T\> | variable | ? and (T \| undefined) |
| result\<ok, err\> | Exception or object literal | Exception or result type|

It is important to note that the component model has no support for pointers. You cannot pass object graphs or recursive data structures around. In that sense, it has the same limitations as [JSON](https://en.wikipedia.org/wiki/JSON).

The [jco project](https://github.com/bytecodealliance/jco) also has support for generating JavaScript/TypeScript bindings for WebAssembly components via the `type` command. As mentioned previously, we implemented our own tooling due to the specific requirements for VS Code. However, we have bi-weekly meetings with the jco team to reach alignment across the tools wherever possible. The minimum requirement is that both tools should use the same JavaScript and TypeScript representations for WIT data types. We also look into whether we can share code between both tools.

## Calling TypeScript from WebAssembly code

WIT files describe the interaction between the host (VS Code extension) and the WebAssembly code, where the interaction is bi-directional. We can make use of this in our example, enabling WebAssembly code to log a trace about its activity. To achieve this, we change the WIT file as follows:

```wit
world calculator {

	/// ....

	/// A log function implemented on the host side.
	import log: func(msg: string);

	/// ...
}
```

On the Rust side, we can now call the log function:

```rust
fn calc(op: Operation) -> u32 {
	log(&format!("Starting calculation: {:?}", op));
	let result = match op {
		// ...
	};
	log(&format!("Finished calculation: {:?}", op));
	return result;
}
```

On the TypeScript side, the only thing an extension developer needs to do, is to provide an implementation of the log function. The VS Code component model then helps with generating the necessary bindings that need to be passed as imports to the WebAssembly instance.

```typescript
export async function activate(context: vscode.ExtensionContext): Promise<void> {
	// ...

	// The channel for printing the log.
	const log = vscode.window.createOutputChannel('Calculator - Log', { log: true });
	context.subscriptions.push(log);

	// The implementation of the log function that is called from WASM
	const service: calculator.Imports = {
		log: (msg: string) => {
			log.info(msg);
		}
	};

	// Create the bindings to import the log function into the WASM module
	const imports = calculator._.imports.create(service, wasmContext);
	// Instantiate the module
	const instance = await WebAssembly.instantiate(module, imports);

	// ...
}
```

Compared to the first example, the `WebAssembly.instantiate` call now takes the result of `calculator._.imports.create(service, wasmContext)` as a second argument. The call `imports.create` generates the low level WASM bindings from the service implementation. In the first example, we passed an empty object literal, since no imports were necessary. This time, we execute the extension in VS Code desktop under the debugger. Thanks to the nice work of [Connor Peet](https://github.com/connor4312), it is possible to set breakpoints in the Rust code, and step through it using the VS Code debugger.

<video src="calculator-log.mp4" title="Video that shows how to run and debug the Calculator command in VS Code." autoplay loop controls muted></video>

## Using Component Model Resources

The WebAssembly component model introduces the concept of resources. Resources define a standardized mechanism for encapsulating and managing state. The state is managed on one side of the call boundary (for example, in TypeScript code) and accessed and manipulated on the other side of the call boundary (for instance, in WebAssembly code). Resources are heavily used in the [WASI preview 0.2](https://bytecodealliance.org/articles/WASI-0.2) APIs. File descriptors are an example of resources. Their state is managed by the extension host, and accessed and manipulated by the WebAssembly code.

Resources can also work in the other direction, where their state is managed by the WebAssembly code and accessed and manipulated by the extension code. This approach is especially useful for VS Code to implement stateful services in WebAssembly, and then access them from the TypeScript side. In the following example, we define a resource that implements a calculator that has simple support for the [reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation), used by [Hewlett-Packard](https://www.hp.com/) hand-held calculators.

```wit
// wit/calculator.wit
package vscode:example;

interface types {

	enum operation {
		add,
		sub,
		mul,
		div
	}

	resource engine {
		constructor();
		push-operand: func(operand: u32);
		push-operation: func(operation: operation);
		execute: func() -> u32;
	}
}
world calculator {
	export types;
}
```

Below is a simple implementation of the calculator resource in Rust:

```rust
impl EngineImpl {
	fn new() -> Self {
		EngineImpl {
			left: None,
			right: None,
		}
	}

	fn push_operand(&mut self, operand: u32) {
		if self.left == None {
			self.left = Some(operand);
		} else {
			self.right = Some(operand);
		}
	}

	fn push_operation(&mut self, operation: Operation) {
		match operation {
			Operation::Add => {
				let result = self.left.unwrap() + self.right.unwrap();
				self.left = Some(result);
			},
			Operation::Sub => {
				let result = self.left.unwrap() - self.right.unwrap();
				self.left = Some(result);
			},
			Operation::Mul => {
				let result = self.left.unwrap() * self.right.unwrap();
				self.left = Some(result);
			},
			Operation::Div => {
				let result = self.left.unwrap() / self.right.unwrap();
				self.left = Some(result);
			},
		}
	}

	fn execute(&mut self) -> u32 {
		return self.left.unwrap();
	}
}
```

In TypeScript code, we bind the exports in the same way as we did before. The only difference is that the bind provides us with a proxy class to instantiate and manage a `calculator` resource in the WebAssembly code.

```typescript
// Bind the JavaScript Api
const api = calculator._.exports.bind(instance.exports as calculator._.Exports, wasmContext);

context.subscriptions.push(vscode.commands.registerCommand('vscode-samples.wasm-component-model.run', () => {
	channel.show();
	channel.appendLine('Running calculator example');

	// Create a new calculator engine
	const calculator = new api.types.Engine();

	// Push some operands and operations
	calculator.pushOperand(10);
	calculator.pushOperand(20);
	calculator.pushOperation(Types.Operation.add);
	calculator.pushOperand(2);
	calculator.pushOperation(Types.Operation.mul);

	// Calculate the result
	const result = calculator.execute();
	channel.appendLine(`Result: ${result}`);
}));
```

When you run the corresponding command, this prints `Result: 60` to the output channel. As mentioned earlier, the state of resources lives on one side of the call boundary and is accessed from the other side by using handles. No copying of data happens, except for the arguments that are passed to methods sent to the resources.

![Diagram that shows how resources are accessed.](resource-memory.png)

The full source code for the example can again be found in the [VS Code extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model-resource).

## Using VS Code APIs directly from Rust

Component model resources can be used to encapsulate and manage state across WebAssembly components and the host. We also explored the idea of using resources to proxy the VS Code API idiomatically into WebAssembly components. The benefit of such an approach is that the whole extension can be written in a language that compiles to WebAssembly. Below the source code of an extension that is written in Rust:

```rust
use std::rc::Rc;

#[export_name = "activate"]
pub fn activate() -> vscode::Disposables {
	let mut disposables: vscode::Disposables = vscode::Disposables::new();

	// Create an output channel.
	let channel: Rc<vscode::OutputChannel> = Rc::new(vscode::window::create_output_channel("Rust Extension", Some("plaintext")));

	// Register a command handler
	let channel_clone = channel.clone();
	disposables.push(vscode::commands::register_command("testbed-component-model-vscode.run", move || {
		channel_clone.append_line("Open documents");

		// Print the URI of all open documents
		for document in vscode::workspace::text_documents() {
			channel.append_line(&format!("Document: {}", document.uri()));
		}
	}));
	return disposables;
}

#[export_name = "deactivate"]
pub fn deactivate() {
}
```

Notice that this code looks similar to an extension that is written in TypeScript.

Although this exploration looks promising, we decided not to proceed with it for now. The major reason is the lack of async support in WASM. Many VS Code APIs are async, and therefore can’t be easily proxied into WebAssembly code. We could run the WebAssembly code in a separate worker and use the same mechanism we use for the [WASI Preview 1 support](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) to synchronize between the WebAssembly worker and the extension host worker. However, this approach would lead to unexpected behavior while doing sync API calls, since those calls would be executed asynchronously under the hood. As a result, the observable state could change between the two sync calls (for example, something like `setX(5); getX();` could return a value different from 5).

Furthermore, there is work under way to add full async support to WASI in the Preview 3 time frame. Luke Wagner gave an overview about the current state of the async support at [Day 2 of this years Plumber’s Summit](https://bytecodealliance.org/articles/plumbers-day-2). We have decided to wait for this support to arrive, because it will enable a more complete and cleaner implementation.

If you're interested in the corresponding WIT files, the Rust code and the TypeScript code can be found in the [rust-api](https://insiders.vscode.dev/github/microsoft/vscode-wasi/blob/dbaeumer/early-kingfisher-tan/rust-api/package.json#L1) folder of the vscode-wasm repository.

## What comes next

We have already started working on a follow-up blog post that covers more areas of where WebAssembly code can be used for extension development. The major topics will be:

- How to write [language servers](https://microsoft.github.io/language-server-protocol/) in WebAssembly.
- How to use the generated meta model to transparently offload long-running WebAssembly code into a separate worker.

Now that we have a VS Code idiomatic implementation of the component model, we continue our efforts to implement the WASI preview 2 for VS Code.

Thanks,

Dirk and the VS Code team

Happy Coding!