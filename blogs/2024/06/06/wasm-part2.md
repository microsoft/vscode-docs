---
Order: 86
TOCTitle: VS Code Extensions and WebAssembly - Part Two
PageTitle: VS Code Extensions and WebAssembly - Part Two
MetaDescription: Using WebAssembly for Extension Development.
Date: 2024-04-30
Author: Dirk Bäumer
---

# Using WebAssembly for Extension Development - Part Two

Last month's blog post about using [WebAssembly for Extension Development]() demonstrated how the component model can be used to easily integrate WebAssembly code into your extension. This blog post will focus on two additional use cases: (a) how to run the WebAssembly code in a worker to avoid blocking the extension host's main thread, and (b) how to write a language server using a language that compiles to WebAssembly.

The examples require that you have the latest versions of the following tools installed, in addition to VS Code and NodeJS: the [Rust compiler toolchain](https://www.rust-lang.org/), [wasm-tools](https://github.com/bytecodealliance/wasm-tools), and [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen).


## Executing WebAssembly code in a Worker

All the examples provided in the previous blog post executed the WebAssembly code inside VS Code's extension host main thread. This is fine as long as the execution time is short. However, long-running operations should be executed in a worker to ensure that the extension host main thread remains available for other extensions.

Doing so is quite easy since VS Code's component model implementation provides a meta model that allows us to generate all the necessary glue code automatically.

## A Language Server in Rust

When we started working on [WebAssembly support for VS Code for the Web](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi), one of our envisioned use cases was to execute language servers using WebAssembly. With the latest changes to [VS Code's LSP libraries](https://github.com/Microsoft/vscode-languageserver-node) and the introduction of a new module to bridge between WebAssembly and LSP, implementing a WebAssembly language server is now as straightforward as implementing it as an operating system process. Additionally, WebAssembly language servers run on the [WebAssembly Core Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core), which fully supports WASI Preview 1. This means that language servers can access the files in the workspace using the normal filesystem API of their programming language, even if the files are stored remotely (e.g., in a GitHub repository).

Below is a code snippet of a Rust language server based on the [example server](https://insiders.vscode.dev/github.com/rust-lang/rust-analyzer/blob/master/lib/lsp-server/examples/goto_def.rs#L1) from the `lsp_server` crate. It doesn't perform any language analysis; it simply returns a predefined result for a `GotoDefinition` request:

```rust
match cast::<GotoDefinition>(req) {
    Ok((id, params)) => {
        let uri = params.text_document_position_params.text_document.uri;
        eprintln!("Received gotoDefinition request #{} {}", id, uri.to_string());
        let loc = Location::new(
            uri,
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

The new `@vscode/wasm-wasi-lsp` npm module can be used to easily create a WebAssembly language server within the extension's TypeScript code. Instantiating the WebAssembly code as a worker with WASI support is done using the [WebAssembly Core Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wasm-wasi-core), which is described in detail in our [Run WebAssemblies in VS Code for the Web](https://code.visualstudio.com/blogs/2023/06/05/vscode-wasm-wasi) blog post.

The TypeScript code of the extension is straightforward as well. It registers the server for plain text files.

```typescript
import { createStdioOptions, createUriConverters, startServer } from '@vscode/wasm-wasi-lsp';

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
		outputChannel: channel,
		uriConverters: createUriConverters(),
	};

	let client = new LanguageClient('lspClient', 'LSP Client', serverOptions, clientOptions);
	await client.start();
}
```

Running the code will add a `Goto Definition` entry to the context menu of plain text files. Executing this action will send a corresponding request to the LSP server.

![Running the goto definition action](goto-definition.png)

It is important to note that the `@vscode/wasm-wasi-lsp` npm module automatically transforms document URIs from their workspace value to the one recognized in the WASI Preview 1 host. In the above example, the text document's URI inside VS Code is usually something like `@@`, and this value gets transformed into `file:///workspace/test.txt`, which is recognized inside the WASI host. This transformation also happens automatically when the language server sends a URI back to VS Code.

Most language server libraries support custom messages, making it easy to add features to a language server that are not already present in the [Language Server Protocol Specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/). Below is a code snippet that adds a custom message handler to the Rust language server mentioned above, which counts the files in a given workspace folder:

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
    WalkDir::new(path)
        .into_iter()
        .filter_map(Result::ok)
        .filter(|entry| entry.file_type().is_file())
        .count()
}
```

The TypeScript code to send this custom request to the LSP server looks like this:

```typescript
const folder = workspace.workspaceFolders![0].uri;
const result = await client.sendRequest(CountFilesRequest, { folder: client.code2ProtocolConverter.asUri(folder) });
window.showInformationMessage(`The workspace contains ${result} files.`);
```

Running this on the `vscode-languageserver` repository shows the following notification:

![Running count all files](count-files.png)

## What Comes Next

As already mentioned in the previous blog post we will continue our efforts to implement the WASI 0.2 preview for VS Code. We also plan to look into broadening the examples to other languages that compile to WASM.

Thanks,

Dirk and the VS Code team

Happy Coding!