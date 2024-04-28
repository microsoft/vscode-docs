---
Order: 82
TOCTitle: VS Code Extensions and WebAssemblies
PageTitle: VS Code Extensions and WebAssemblies
MetaDescription: Using WebAssemblies for extension development.
Date: 2024-04-30
Author: Dirk Bäumer
---
# Using WebAssemblies for extension development

VS Code has, through the [WebAssembly Execution Engine](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core) extension, support to execute WASM binaries. The major use case is to compile programs written in C/C++ or Rust to WebAssembly and then execute these programs one to one in VS Code. A great example is [Visual Studio Code for Education](https://vscodeedu.com/), which uses this support to execute the Python interpreter in VS Code for the Web. This [blog post](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) describes in detail how this works.

In January 2024 the Bytecode Alliance launch the [WASI 0.2 preview](https://bytecodealliance.org/articles/WASI-0.2). One of the core technologies of the WASI 0.2 preview is the [Component Model](https://github.com/WebAssembly/component-model/). The WebAssembly Component Model simplifies interactions between WebAssembly components themselves and their host environments by standardizing interfaces, data types, and module composition. This is achieved by describing a component via a WIT ([WASM Interface Type](https://component-model.bytecodealliance.org/design/wit.html)) file. So WIT files can be used to describe the interaction between a JavaScript/TypeScript extension (the host) and a WebAssembly component doing some computation coded in another language like Rust or C/C++.

This blog post describes how a developer can use the component model to integrate WebAssembly library code into their extension. The examples require that you have, besides VS Code and NodeJS, the latest versions of following tools installed: [rust compiler toolchain](https://www.rust-lang.org/), [wasm-tools](https://github.com/bytecodealliance/wasm-tools) and [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen)

# A Calculator in Rust

The first example demonstrates how a developer can integrate a library written in Rust that does simple calculation into a VS Code extension. As mentioned above components are described using a WIT file. The one, that describes a simple calculator, which can do additions, subtractions, multiplications and divisions for positive integers look like this:

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

The Rust tool [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen) will be used to generate a Rust binding for the calculator. The tool can be used in two flavors:

- as a procedural macro to generate the bindings in place in the implementation file. This is the standard use, but comes with the disadvantage, that you can't inspect the generated bindings code.

- as a [command line tool](https://github.com/bytecodealliance/wit-bindgen?tab=readme-ov-file#cli-installation). This generate a bindings file on disk. The code in the [VS Code extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model-resource) of the resources example below makes use of that approach.

 A corresponding Rust file that makes use of the `wit-bindgen` tool as a procedural macro looks like this:

```rust
// Use a procedural macro to generate bindings for the world we specified in
// `calculator.wit`
wit_bindgen::generate!({
	// the name of the world in the `*.wit` input file
	world: "calculator",
});
```

However, compiling the Rust file to a WebAssembly using `cargo build --target wasm32-unknown-unknown` reveals some compile errors, since we are missing the implementation of the exported calc function. Here is a simple implementation of the calc function:

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

Note the `export!(Calculator);` at the end of the file. It will export the calculator from the WebAssembly code, so that the extension can call the API.

The `wit2ts` tool can be used to generate a necessary TypeScript bindings to interact with the WebAssembly code from an VS Code extension. The tool is developed by the VS Code team. We decided to implement our own tooling to support the special needs the VS Code extension architecture has. The main reasons are:

- The VS Code API is only available in the extension host worker. Any additional worker spawned from that worker do not have access to it. This is for example different than NodeJS or the Browser, where each worker as access to almost all the API of the runtime.
- N extensions share the same extension host worker. So an extension shouldn't do any long running synchronous computation on that worker.

These architectural needs already existed when we implemented the [WASI Preview 1 for VS Code](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi). However, the implementation we use there was written by hand. Since the component model will, in our opinion, gain broader adoption, we decided to provide a tool to help components with their VS Code specific host implementations.

The command `wit2ts --outDir ./src ./wit` will generate a `calculator.ts` file in the folder named `src`. The file contains the TypeScript bindings for the WebAssembly code. A simple extension making use of the bindings looks like this:

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

Compiling and running the above code in VS Code for the Web will produce the following output in the `Calculator` channel:

<video src="calculator.mp4" title="Execute the Calculator command]." autoplay loop controls muted></video>

The full source code of the example can be found in [VS Code's extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model).

# Inside @vscode/wasm-component-model

Inspecting the source code that got generated by the `wit2ts` tools shows, that it depends on a npm module `@vscode/wasm-component-model`. This npm module is VS Code's implementation of the [component model's canonical ABI](https://github.com/WebAssembly/component-model/blob/main/design/mvp/CanonicalABI.md). VS Code's implementation is inspired by the Python code used in that document and whenever possible we tried to use the same naming.

In contrast to other tools like [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen) or [jco](https://github.com/bytecodealliance/jco), that generate bindings for Wit files, `wit2ts` generates a meta model, which then can be used to generate bindings at runtime for different use cases. This allows us to honor the architectural needs we have for extension development (see above) inside VS Code. Mainly, we are able to promisify the bindings and run WebAssembly code in workers. We especially leverage this mechanism to implement the [WASI 0.2 preview](https://bytecodealliance.org/articles/WASI-0.2) for VS Code.

You may also have noticed, that when generating the binding, you were accessing the function using names like `calculator._.imports.create` (observe the underscore). To avoid name collisions with names in the Wit file (e.g. there could be a type definition `imports`), API function are provided in a `_` namespace. The meta model itself is in a `$` namespace. So `calculator.$.exports.calc` represents the meta data for the exported calc function.

In the above example the `add` operation param that gets passed to the `calc` function is an object consisting of three fields (the op code, the left value and the right value). The component model's canonical ABI defines, that arguments are passed by value. It also defines, how the data is serialized, passed to a WASM functions and deserialized on the other side. This results in our example in two operation objects, one living on the JavaScript heap and one living in the linear WASM memory. This is illustrated in the figure below.

![How parameters are passed](params-memory.png)

Below is a table showing the available Wit types, how VS Code's component model implementation maps them onto JavaScript objects and which TypeScript types are used for them.

| Wit         | JavaScript | TypeScript |
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

It is important to note the the component model has no support for pointers. So you can't pass object graphs or recursive data structures around. It has in that sense the same limitations as [JSON](https://en.wikipedia.org/wiki/JSON)

@@Write a sentence about JCo and our relationship.

# Calling TypeScript from WebAssembly code

As mentioned above, Wit files describe the interaction between the host (VS Code extension) and the WebAssembly code, where the interaction is bi-directional. We can make use of that in our example to allow the WebAssembly code to log a trace about its activity. To achieve this we change the wit file as follows:

```wit
world calculator {

	/// ....

	/// A log function implemented on the host side.
	import log: func(msg: string);

	/// ...
}
```

On the Rust side we can now simply call the log function.

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

On the TypeScript side all a extension developer needs to do is to provide an implementation of the log function. VS Code's component model then helps with generating the necessary bindings, that need to be passed as imports to the WebAssembly instance.

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

Compared to the first example the `WebAssembly.instantiate` call now takes the result of `calculator._.imports.create(service, wasmContext)` as a second argument.  The call `imports.create` generates the low level WASM bindings from the service implementation. In the first example we passed an empty object literal since no imports we necessary. This time we execute the extension in VS Code desktop under the debugger. Due to the nice work [Connor Peet](https://github.com/connor4312) did, it is even possible to set breakpoints in the Rust code and step through it using VS Code's debugger.

<video src="calculator-log.mp4" title="Execute the Calculator command]." autoplay loop controls muted></video>

# Using Component Model Resources

The WebAssembly component model introduces the concept of resources. Resources define a standardized mechanisms for encapsulating and managing state. The state is thereby managed on one side of the call boundary and access and manipulated from the other side of the call boundary. Resources are heavily used in the [WASI preview 0.2](https://bytecodealliance.org/articles/WASI-0.2) APIs. An example are file descriptors. Their state is managed on the host side and accessed and manipulated from the WebAssembly side.

But resources work in the other direction as well. Their state can be managed in the WebAssembly side and accessed and manipulated from the host side. This direction is especially useful for VS Code to implement stateful services in WebAssembly and access them from the TypeScript side. In the next example we will define a resource that implements a calculator providing simple support for the [reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) use by [Hewlett-Packard](https://www.hp.com/) hand-held calculators.

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

Below is the simple implementation of the calculator resource in Rust:

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

On the VS Code side we bind the exports the same way as we did before. The only difference is that the bind will provide us with a proxy class to instantiate and manage a calculator resource on the WebAssembly side.

```typescript
// Bind the JavaScript Api
const api = calculator._.bindExports(instance.exports as calculator._.Exports, wasmContext);

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

Executing the corresponding command will print `Result: 60` to the output channel. As mentioned early the whole state of resources lives on one side of the call boundary and is accessed from the other side using handles. So no copying of data happens, besides the arguments passed to methods send to the resources.

![How resources are accessed](resource-memory.png)

The full source code of the example can again be found in [VS Code's extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model-resource).

# Using VS Code's API directly from Rust

Component model resource can be used to encapsulate and manage state across WebAssembly components and the host. One additional idea we explored is to use resources to proxy the VS Code API idiomatically into WebAssembly components. The benefit of such an approach is, that the whole extension can be written in a language that compiles to WebAssembly. Below the source code of an extension written in Rust:

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

This looks very similar to an extension written in TypeScript.

<video src="rust-extension.mp4" title="Extension written in Rust." autoplay loop controls muted></video>

Although the exploration looks very promising we decided to not push this further right now. Major reason is the missing async support in WASM. A lot of VS Code API is async and can therefore not easily be proxied into WebAssembly code. We could run the WebAssembly code in a separate worker and use the same mechanism we use for the [WASI Preview 1 support](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) to synchronize between the WebAssembly worker and the extension host worker. However, this approach would lead to unexpected behavior when doing sync API calls, since those calls would be executed async under the hood. Since the extension host worker yields between the two async executions there is no guarantee, that, between two sync calls, the underlying state wouldn't change (e.g. something like `setX(5); getX();` could return a value different than 5).

Furthermore, there is work under way to add full async support to WebAssemblies in the Preview 3 time frame. Luke Wagner gave an overview about the current state of the async support at [Day 2 of this years Plumber’s Summit](https://bytecodealliance.org/articles/plumbers-day-2). So we deiced to wait for this to arrive since it will allow us to tell a nicer and more complete story.

For those that are interested the corresponding Wit files, the Rust code and the TypeScript code can be found in the [rust-api](https://insiders.vscode.dev/github/microsoft/vscode-wasi/blob/dbaeumer/early-kingfisher-tan/rust-api/package.json#L1) folder of the vscode-wasm repository.

# What comes next