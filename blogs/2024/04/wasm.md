---
Order: 82
TOCTitle: VS Code Extensions and WebAssemblies
PageTitle: VS Code Extensions and WebAssemblies
MetaDescription: Using WebAssemblies for extension development.
Date: 2024-04-30
Author: Dirk Bäumer
---
# Using WebAssemblies for extension development

Through the [WebAssembly Execution Engine](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core) extension VS Code has support to execute WASM binaries. The major use case is to compile programs written in C/C++ or Rust to WebAssembly and then execute these programs one to one in VS Code. A great example is [Visual Studio Code for Education](https://vscodeedu.com/), which uses this support to execute the Python interpreter in VS Code for the Web. This [blog post](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) describes in detail how this works.

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

The Rust tool [`wit-bindgen`](https://github.com/bytecodealliance/wit-bindgen) will be used to generate a Rust binding for the calculator. The tool can be used in two flavors

- as a procedural macro to generate the bindings in place in the implementation file. This is the standard use, but comes with the disadvantage, that you can't inspect the generated bindings code.

- as a [command line tool](https://github.com/bytecodealliance/wit-bindgen?tab=readme-ov-file#cli-installation). This generate a bindings file on disk. The blog post will demonstrate that approach in a later example as well.

 A corresponding Rust file that makes use of the `wit-bindgen` tool as a procedural macro looks like this:

```rust
// Use a procedural macro to generate bindings for the world we specified in
// `calculator.wit`
wit_bindgen::generate!({
	// the name of the world in the `*.wit` input file
	world: "calculator",
});
```

Compiling the Rust file to a WebAssembly using `cargo build --target wasm32-unknown-unknown` however reveals some compile errors since we are missing the implementation of the exported calc function. Here is simple implementation of the calc function:

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
Note the `export!(Calculator);` at the end of the file. It will export the calculator from the WebAssembly code so that the extension can call the API.

The `wit2ts` tool can be used to generate a necessary TypeScript bindings to interact with the WebAssembly code from an VS Code extension. The tool is developed by the VS Code team. We decided to implement our own tooling to support the special needs the VS Code extension architecture has. The main reasons are:

- The VS Code API is only available in the extension host worker. Any additional worker spawn from that worker do not have access to it. This is for example different than NodeJS or the Browser where each worker as access to almost all the API of the runtime.
- N extensions share the same extension host worker. So an extension shouldn't do any long running synchronous computation on that worker.

These architectural needs already existed when we implemented the [WASI Preview 1 for VS Code](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi). However the implementation we use there was written by hand. Since the component model will, in our opinion, gain broader adoption, we decided to provide a tool to help components with their host implementation.

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
		channel.appendLine(`Add ${api.calc(Types.Operation.Add({ left: 1, right: 2}))}`);
		channel.appendLine(`Sub ${api.calc(Types.Operation.Sub({ left: 10, right: 8 }))}`);
		channel.appendLine(`Mul ${api.calc(Types.Operation.Mul({ left: 3, right: 7 }))}`);
		channel.appendLine(`Div ${api.calc(Types.Operation.Div({ left: 10, right: 2 }))}`);
	}));
}
```

Compiling and running the above code in VS Code will produce the following output in the `Calculator` channel:

<video src="calculator.mp4" title="Execute the Calculator command]." autoplay loop controls muted></video>

The full source code of the example can be found in [VS Code's extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model).

# Inside @vscode/wasm-component-model

Inspecting the source code that got generated by the `wit2ts` tools shows, that it depends on a npm module `@vscode/wasm-component-model`. This npm module is VS Code's implementation of the [component model's canonical ABI](https://github.com/WebAssembly/component-model/blob/main/design/mvp/CanonicalABI.md). VS Code's implementation is inspired by the Python code used in that document and whenever possible we tried to use the same naming.

In contrast to other tools like [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen) or [jco](https://github.com/bytecodealliance/jco), that generate bindings for Wit files, `wit2ts` generates a meta model, which then can be used to generate bindings at runtime for different use cases. This allows us to honor the architectural needs we have for extension development (see above) inside VS Code. Mainly we are able to promisify the bindings and run WebAssembly code in workers. We especially leverage this mechanism to implement the [WASI 0.2 preview](https://bytecodealliance.org/articles/WASI-0.2) for VS Code.

You may also have noticed that when generating the binding you were accessing the function using names like `calculator._.imports.create` (observe the underscore). To avoid name collisions with names in the Wit file (e.g. there could be a type definition `imports`), API function are provided in a `_` namespace. The meta model itself is in a `$` namespace. So `calculator.$.exports.calc` represents the meta data for the exported calc function.

@@Write a sentence about JCo and our relationship.

# Calling TypeScript from WebAssembly code

As mentioned above Wit files describe the interaction between the host (VS Code extension) and the WebAssembly code, where the interaction is bi-directional. We can make use of that in our example from above to allow the WebAssembly code to log a trace about its activity. To achieve this we change the wit file as follows:

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

On the TypeScript side all a extension developer needs to do is to provide an implementation of the log function. VS Code's component model then helps with generating the necessary bindings that need to be passed as imports to the WebAssembly instance.

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

	// Instantiate the module and create the necessary imports from the service implementation
	const instance = await WebAssembly.instantiate(module, calculator._.imports.create(service, wasmContext));

	// ...
}
```

Compared to the first example the `WebAssembly.instantiate` call now takes `calculator._.createImports(service, wasmContext)` as a second argument.  The call `createImports` generates the low level WASM bindings from the service implementation. In the first example we passed an empty object literal since no imports we necessary. Running the example will create a second output channel named `Calculator - Log` with the following content:

![The log output of the calculator](calculator-log.png)

# Using Component Model Resources

The WebAssembly component model introduces the concept of resources. Resources define a standardized mechanisms for encapsulating and managing state. The state is thereby managed on one side of the call boundary and access and manipulated from the other side of the call boundary. Resources are heavily used in the [WASI preview 0.2](https://bytecodealliance.org/articles/WASI-0.2) APIs. An example are file descriptors. Their state is managed on the host side and accessed and manipulated from the WebAssembly side.

But resources work in the other direction as well. Their state can be managed in the WebAssembly side and accessed and manipulated from the host side. This direction is especially useful for VS Code to implement stateful services in WebAssembly and access them from the TypeScript side. So instead of having a calc function, to which we pass all arguments, we define a calculator engine, which we construct with the arguments and then call execute on. The wit file for such a resource looks like this:

```wit
interface types {

	enum operation {
		add,
		sub,
		mul,
		div
	}

	resource engine {
		constructor(left: u32, right: u32, operation: operation);
		execute: func() -> u32;
	}
}

world calculator {
	export types;
}
```

Below is the implementation of the engine in Rust

```rust
struct CalcEngine {
	left: u32,
	right: u32,
	operation: Operation,
}

impl GuestEngine for CalcEngine {

	fn new(left: u32, right: u32, operation: Operation) -> Self {
		Self { left, right, operation }
	}

	fn execute(&self) -> u32 {
		match self.operation {
			Operation::Add => self.left + self.right,
			Operation::Sub => self.left - self.right,
			Operation::Mul => self.left * self.right,
			Operation::Div => self.left / self.right,
		}
	}
}
```

On the VS Code side we bind the exports the same way as we did before. The only difference is that the bind will provide us with a proxy class to instantiate and manage a calculator engine on the WebAssembly side.

```typescript
// Bind the JavaScript Api
const api = calculator._.bindExports(instance.exports as calculator._.Exports, wasmContext);

context.subscriptions.push(vscode.commands.registerCommand('vscode-samples.wasm-component-model.run', () => {
	channel.show();
	channel.appendLine('Running calculator example');

	const add = new api.types.Engine(1, 2, Types.Operation.add);
	channel.appendLine(`Add ${add.execute()}`);

	const sub = new api.types.Engine(10, 8, Types.Operation.sub);
	channel.appendLine(`Sub ${sub.execute()}`);

	// ...
}
```

The full source code of the example can again be found in [VS Code's extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model).

# Language Servers and WebAssembly

When we started to work on [WebAssembly support for VS Code for the Web](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) one of our envisioned use case was to be able to execute language servers using WebAssembly. With the latest changes we did to [VSCode's LSP libraries](https://github.com/Microsoft/vscode-languageserver-node) and the introduction of a new module to bridge between WebAssembly and LSP, implementing a WebAssembly language server is now as easy as implementing it as a operation system process. In addition WebAssembly language servers run on the [WebAssembly Core Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core), which has full support for WASI preview 1. So language server can access the files in the workspace using the normal fs API of their programming language, even if the files are remote (e.g. in a GitHub repository).

Since most language server libraries support custom messages, it is also very easy to add features to a language server, that are not already present in the [Language Server Protocol Specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/). Below is a code snippet of a Rust language server based on the `lsp_server` crate that adds a custom request to count the files in a provided workspace folder:

```rust
#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CountFilesParams {
    pub folder: String,
}

pub enum CountFilesRequest {}
impl Request for CountFilesRequest {
    type Params = CountFilesParams;
    type Result = u32;
    const METHOD: &'static str = "wasm-language-server/countFilesInDirectory";
}

//...

for msg in &connection.receiver {
    match msg {
		//....
		match cast::<CountFilesRequest>(req) {
    		Ok((id, params)) => {
        		let result = count_files_in_directory(params.folder.as_str());
        		let json = serde_json::to_value(&result).unwrap();
        		let resp = Response { id, result: Some(json), error: None };
        		connection.sender.send(Message::Response(resp))?;
        		continue;
    		}
    		Err(err @ ExtractError::JsonError { .. }) => panic!("{err:?}"),
    		Err(ExtractError::MethodMismatch(req)) => req,
		}
	}
	//...
}

fn count_files_in_directory(path: &str) -> usize {
    let result = WalkDir::new(path)
        .into_iter()
        .filter_map(Result::ok)
        .filter(|entry| entry.file_type().is_file())
        .count();
    return result;
}
```

The new `@vscode/wasm-wasi-lsp` npm module can be used to easily create a WebAssembly language server inside the extension's TypeScript code. Instantiating the WebAssembly code as a worker with WASI support is done using the [WebAssembly Core Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core), which is described in detail in our [Run WebAssemblies in VS Code for the Web](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) blog post.

```typescript
import { createStdioOptions, startServer } from '@vscode/wasm-wasi-lsp';

export async function activate(context: ExtensionContext) {
	const wasm: Wasm = await Wasm.load();

	// ...

	// The server options to run the WebAssembly language server.
	const serverOptions: ServerOptions = async () => {
		const options: ProcessOptions = {
			stdio: createStdioOptions(),
			mountPoints: [
				{ kind: 'workspaceFolder' },
			]
		};

		// Load the WebAssembly code
		const filename = Uri.joinPath(context.extensionUri, 'server', 'target', 'wasm32-wasi-preview1-threads', 'release', 'server.wasm');
		const bits = await workspace.fs.readFile(filename);
		const module = await WebAssembly.compile(bits);

		// Create the wasm worker that runs the LSP server
		const process = await wasm.createProcess('lsp-server', module, { initial: 160, maximum: 160, shared: true }, options);

		// Hook stderr to the output channel
		const decoder = new TextDecoder('utf-8');
		process.stderr!.onData((data) => {
			channel.append(decoder.decode(data));
		});

		return startServer(process);
	};


	let client = new LanguageClient('lspClient', 'LSP Client', serverOptions, clientOptions);
	await client.start();

	// ....
}
```

Sending the custom message to calculate the number of files insider a workspace folder is straight forward as well:

```typescript
type CountFileParams = { folder: string };
const CountFilesRequest = new RequestType<CountFileParams, number, void>('wasm-language-server/countFilesInFolder');

// We assume we do have a folder.
const folder = workspace.workspaceFolders![0].uri;
// We need to convert the folder URI to a URI that maps to the mounted WASI file system. This is something
// @vscode/wasm-wasi-lsp does for us.
const result = await client.sendRequest(CountFilesRequest, { folder: client.code2ProtocolConverter.asUri(folder!) });
```

@@ May be another screen shot.

As with the other examples the full source code can be found in [VS Code's extension sample repository](https://github.com/microsoft/vscode-extension-samples/tree/main/wasm-component-model).


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

This looks very similar to an extension written in TypeScript. Due to the nice work [Connor Peet](https://github.com/connor4312) did, it is even possible to step through the Rust code using VS Code's debugger:

<video src="rust-extension.mp4" title="Extension written in Rust." autoplay loop controls muted></video>

Although the exploration looks very promising we decided to not push this further right now. Major reason is the missing async support in WASM. A lot of VS Code API is async and can therefore not easily be proxied into WebAssembly code. We could run the WebAssembly code in a separate worker and use the same mechanism we use for the [WASI Preview 1 support](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) to synchronize between the WebAssembly worker and the extension host worker. However, this approach would lead to unexpected behavior when doing sync API calls since those calls would be executed async under the hood. Since the extension host worker yields between the two async executions there is no guarantee, that between two sync calls the underlying state wouldn't change (e.g. something like `setX(5); getX();` could return a value different than 5).

Furthermore there is work under way to add full async support to WebAssemblies in the Preview 3 time frame. Luke Wagner gave an overview about the current state of the async support at [Day 2 of this years Plumber’s Summit](https://bytecodealliance.org/articles/plumbers-day-2). So we deiced to wait for this to arrive since it will allow us to tell a nicer and more complete story.

For those that are interested the corresponding Wit files, the Rust code and the TypeScript code can be found in the [rust-api](https://insiders.vscode.dev/github/microsoft/vscode-wasi/blob/dbaeumer/early-kingfisher-tan/rust-api/package.json#L1) folder of the vscode-wasm repository.

# What comes next