---
Order: 86
TOCTitle: VS Code Extensions and WebAssembly - Part Two
PageTitle: VS Code Extensions and WebAssembly - Part Two
MetaDescription: Using WebAssembly for Extension Development.
Date: 2024-04-30
Author: Dirk Bäumer
---

# Using WebAssembly for Extension Development - Part Two

Last month's blog post about using [WebAssembly for Extension Development]() demoed how the component model can be used to easily integrate WebAssembly code into your extension. This blog post will focus on two additional use cases: (a) how to run the WebAssembly code in a worker to not block the extension host's main thread and (b) how to write a language server using a language that compiles to WebAssembly.

The examples require that you have the latest versions of the following tools installed, alongside VS Code and NodeJS: [rust compiler toolchain](https://www.rust-lang.org/), [wasm-tools](https://github.com/bytecodealliance/wasm-tools), and [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen).

## A Language Server in Rust

When we started to work on [WebAssembly support for VS Code for the Web](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) one of our envisioned use case was to be able to execute language servers using WebAssembly. With the latest changes we did to [VSCode's LSP libraries](https://github.com/Microsoft/vscode-languageserver-node) and the introduction of a new module to bridge between WebAssembly and LSP, implementing a WebAssembly language server is now as easy as implementing it as a operation system process. In addition WebAssembly language servers run on the [WebAssembly Core Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core), which has full support for WASI preview 1. So language server can access the files in the workspace using the normal fs API of their programming language, even if the files are stored remote (e.g. in a GitHub repository).

Below is a code snippet of a Rust language server based on the [example server](https://insiders.vscode.dev/github.com/rust-lang/rust-analyzer/blob/master/lib/lsp-server/examples/goto_def.rs#L1) of the `lsp_server` crate. It doesn't do any language analysis. It simply returns a predefined result for a `GotoDefinition` request:

```rust
match cast::<GotoDefinition>(req) {
    Ok((id, params)) => {
        eprintln!("Received gotoDefinition request #{id}");
        let loc = Location::new(
            params.text_document_position_params.text_document.uri,
            lsp_types::Range::new(lsp_types::Position::new(0, 0), lsp_types::Position::new(0, 0))
        );
        let mut vec = Vec::new();
        vec.push(loc);
        let result = Some(GotoDefinitionResponse::Array(vec));
        let result = serde_json::to_value(&result).unwrap();
        let resp = Response { id, result: Some(result), error: None };
        connection.sender.send(Message::Response(resp))?;
        continue;
    }
    Err(err @ ExtractError::JsonError { .. }) => panic!("{err:?}"),
    Err(ExtractError::MethodMismatch(req)) => req,
};
```

The full source code of the language server can be found in [VS Code's example repository](https://insiders.vscode.dev/github/microsoft/vscode-extension-samples/blob/main/wasm-language-server/server/src/main.rs#L1).

The new `@vscode/wasm-wasi-lsp` npm module can be used to easily create a WebAssembly language server inside the extension's TypeScript code. Instantiating the WebAssembly code as a worker with WASI support is done using the [WebAssembly Core Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core), which is described in detail in our [Run WebAssemblies in VS Code for the Web](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) blog post.

The TypeScript code of the extension is straight forward as well. It registers the server for plain text files.

```typescript
import { createStdioOptions, startServer } from '@vscode/wasm-wasi-lsp';

export async function activate(context: ExtensionContext) {
	const wasm: Wasm = await Wasm.load();

	const channel = window.createOutputChannel('LSP WASM Server');
	// The server options to run the WebAssembly language server.
	const serverOptions: ServerOptions = async () => {
		const options: ProcessOptions = {
			stdio: createStdioOptions(),
			mountPoints: [
				{ kind: 'workspaceFolder' },
			]
		};

		// Load the WebAssembly code
		const filename = Uri.joinPath(context.extensionUri, 'server', 'target', 'wasm32-wasip1-threads', 'release', 'server.wasm');
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

	const clientOptions: LanguageClientOptions = {
		documentSelector: [ { language: 'plaintext' } ],
		outputChannel: channel
	};

	let client = new LanguageClient('lspClient', 'LSP Client', serverOptions, clientOptions);
	await client.start();
}
```

Running the code will add a `Goto Definition` entry into the context menu of plain text files. Executing the action will send a corresponding request the the LSP server.

![Running the got definition action](goto-definition.png)

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
		const filename = Uri.joinPath(context.extensionUri, 'server', 'target', 'wasm32-wasip1-threads', 'release', 'server.wasm');
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





## What Comes Next

We are currently preparing a follow-up blog post that will cover more areas where WebAssembly code can be utilized for extension development. The major topics will include:

- Writing [language servers](https://microsoft.github.io/language-server-protocol/) in WebAssembly.
- Using the generated meta model to transparently offload long-running WebAssembly code into a separate worker.

With a VS Code idiomatic implementation of the component model in place, we continue our efforts to implement the WASI 0.2 preview for VS Code.

Thanks,

Dirk and the VS Code team

Happy Coding!