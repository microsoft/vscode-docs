---
# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use the Notebook API to create rich notebook experiences within Visual Studio Code.
---

# Notebook API

The notebook API allows extensions to open files as notebooks, execute notebook code cells, and render notebook outputs in a variety of rich and interactive formats. You may know of popular notebook interfaces like Jupyter Notebook or Google Colab, the notebook API allows for similar experiences inside Visual Studio Code.


## Parts of a Notebook

A notebook consists of a sequence of cells and their outputs. The cells of a notebook can be either *markdown cells* or *code cells*, and are rendered within the core of VS Code. The outputs can be of a variety of formats. Some output formats, such as plain text, JSON, images,and HTML are rendered by VS Code core. Others, such as application-specific data or interactive applets, are rendered by extensions.

Cells in a notebook are read and written to disk by a `NotebookContentProvider`, which handles reading data from disk and converting it into a description of cells, as well as saving modifications to the notebook back to disk. The *code cells* of a notebook can be exectuted by a `NotebookKernel`, which provides for taking a cell and from it producing output in a variety of formats ranging from plain text to formatted documents or interactive applets. Application-specific output formats and interactive applet outputs are rendered by an `NotebookOutputRenderer`.

Visually:
![Overview of 3 componenets of notebooks: NotebookContentProvider, NotebookKernel, and NotebookOutputRenderer, and how they interact. Described textually above and in following sections.](images/notebook/architecture-overview.png)

### Content Provider
[`NotebookContentProvider` API Reference](/api/references/vscode-api#NotebookContentProvider)

A `NotebookContentProvider` is responsible for taking a serialized description of a notebook and generating a list of markdown and code cells. It additionally handles saving modifications made in the notebook back to the original resource.

Samples:
 - [`.ipynb` Content Provider](https://github.com/microsoft/notebook-extension-samples/tree/master/notebook-provider): Work with notebooks in the [Jupyter Notebook format](https://nbformat.readthedocs.io/en/latest/format_description.html).
 - [Markdown Content Provider](https://github.com/microsoft/vscode-markdown-notebook): Open and edit markdown files as a notebook.

#### Example
In this example we build a simplified notebook provider extension for viewing files in the [Jupyter Notebook format](https://nbformat.readthedocs.io/en/latest/format_description.html) with a `.notebook` extension.

A content provider is declared in `package.json` under the `contributes.notebookProvider` section as follows:
```json
{
	...
	"activationEvents": ["onNotebookEditor:notebook-renderer-demo"],
	"contributes": {
		...
		"notebookProvider": [
			{
				"viewType": "notebook-renderer-demo",
				"displayName": "My Notebook",
				"selector": [
					{
						"filenamePattern": "*.notebook"
					}
				]
			}
		]
	}
}
```

The content provider is then registered in the extension's activation event:
```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.notebook.registerNotebookContentProvider(
			"notebook-renderer-demo", new SampleProvider()
		)
	);
}

class SampleProvider implements vscode.NotebookContentProvider {
	async openNotebook(uri: vscode.Uri): Promise<vscode.NotebookData> {
		const content = JSON.parse((await vscode.workspace.fs.readFile(uri)).toString());
		return {
			languages: [],
			metadata: content.metadata,
			cells: content.cells.map((cell: any) => {
				if (cell.cell_type === 'markdown') {
					return {
						cellKind: vscode.CellKind.Markdown,
						source: cell.source,
						language: 'markdown',
						outputs: [],
						metadata: {}
					};
				} else if (cell.cell_type === 'code') {
					return {
						cellKind: vscode.CellKind.Code,
						source: cell.source,
						language: content.metadata?.language_info?.name || 'python',
						outputs: [/* not implemented */],
						metadata: {}
					};
				} else {
					console.error('Unexpected cell:', cell);
				}
			})
		};
	}

	// The following are dummy implementations not relevant to this example.
	onDidChangeNotebook = new vscode.EventEmitter<vscode.NotebookDocumentEditEvent>().event;
	async resolveNotebook(): Promise<void> { }
	async saveNotebook(): Promise<void> { }
	async saveNotebookAs(): Promise<void> { }
	async backupNotebook(): Promise<vscode.NotebookDocumentBackup> { return { id: '', delete: () => { } }; }
}
```

Now try running your extension and opening a Jupyter Notebook formatted file saved with the `.notebook` extension:
![Notebook showing contents of a Jupyter Notebook formatted file](images/notebook/ipynb-simple-provider.png)

You should be able to open Jupyter-formatted notebooks and view their cells as both plaintext and rendered markdown, as well as edit the cells. However, edits will not be persisted to disk, and you won't be able to run any cells. Saving requires implementing the `saveNotebook`-family commands above, and to run a cell we'll need to implement a `NotebookKernel`.

### Kernel
[`NotebookKernel` API Reference](/api/references/vscode-api#NotebookKernel)

A `NotebookKernel` is responsible for taking a *code cell* and from it producing some output or set of outputs.

A kernel can either be directly associated with associated with a content provider by setting the `NotebookContentProvider#kernel` property, or registered globally by envoking the `vscode.registerNotebookKernel` function with ...TODO: Figure out how this function is supposed to be called :)...

Samples:
- [GitHub Issues Notebook](https://github.com/microsoft/vscode-github-issue-notebooks/blob/master/src/notebookProvider.ts): Kernel to execute queries for GitHib Issues
- [HTTP Request Notebook](): Kernel to issue HTTP requests (TODO: Publish my extension? Where?)

#### Best Practices

While a kernel need only return an output, it can be desirable to set metadata on cells as it executes them to enable features like the run duration counter, execution order badge, and run status icon. For instance, a kernel's `executeCell` function might look like this:
```ts
async function executeCell(document: vscode.NotebookDocument, cell: vscode.NotebookCell, token: vscode.CancellationToken) {
	try {
		cell.metadata.runState = vscode.NotebookCellRunState.Running;
		const start = +new Date();
		cell.metadata.runStartTime = start;
		cell.metadata.executionOrder = ++this.runIndex;
		const result = await doExecuteCell(document, cell, token);
		cell.outputs = [result];
		cell.metadata.runState = vscode.NotebookCellRunState.Success;
		cell.metadata.lastRunDuration = +new Date() - start;
	} catch (e) {
		cell.outputs = [{ outputKind: vscode.CellOutputKind.Error, ename: e.name, evalue: e.message, traceback: [e.stack] }];
		cell.metadata.runState = vscode.NotebookCellRunState.Error;
		cell.metadata.lastRunDuration = undefined;
	}
};
```

#### Output Types

Outputs must be in one of three formats: Text Output, Error Output, or Rich Output. A kernel may provide multiple outputs for a single execution of a cell, in which case they will be displayed as a list.

##### Text Output
Text outputs are the most simple output format, and work much like many REPL's you may be familar with. They consist only of a `text` field, which is rendered as plain text in the cell's output element:
```ts
{
	outputKind: vscode.CellOutputKind.Text,
	text: '...'
}
```
![Cell with simple text output](images/notebook/text-output.png)

##### Error Output
Error outputs are helpful for displaying runtime errors in a consistant and understandable manner. They contain `ename` and `evalue` fields for displaying the error type and message, respectively, as well as `traceback` field which takes a list of strings which get displayed like a callstack:
```ts
{
	outputKind: vscode.CellOutputKind.Error,
	ename: 'Error Name',
	evalue: 'Error Value',
	traceback: ['stack frame 1', 'stack frame 2', 'stack frame 3', 'stack frame 4']
}
```
![Cell with error output showing error name and message, as well as a stack trace](images/notebook/error-output.png)

##### Rich Output
Rich outputs are the most advanced form of displaying cell outputs. They allow for providing many different representations of the output data, keyed by mimetype. For example, if a cell output was to represent a GitHub Issue the kernel might produce a rich output with several properties on its `data` field:
- A `text/html` field containing a formatted view of the issue
- An `application/json` field constiang a machine readable view
- An `application/github-issue` field that a `NotebookOutputRenderer` could use to create a fully interactive view of the issue

In this case, the `text/html` and `application/json` views will be rendered by VS Code natively, but the `application/github-issue` view will display an error if no `NotebookOutputRenderer` was registered to that mimetype.
```ts
{
	outputKind: vscode.CellOutputKind.Rich,
	data: {
		'text/html': '<b>Hello</b> World',
		'application/json': { hello: 'world' },
		'application/hello-world': 'my-hello-world-data-interchange-format',
	}
}
```
![Cell with rich output showing switching betweeen formatted html, a json editor, and an error message showing no renderer is available (application/hello-world)](images/notebook/rich-output.gif)

By default VS Code can render the mimetypes:
- application/json
- application/javascript
- text/html
- image/svg+xml
- text/markdown
- image/png
- image/jpeg
- text/plain
- text/x-javascript

To render an alternative mimetype, a `NotebookOutputRenderer` must be registered for that mimetype.

### Output Renderer
[`NotebookOutputRenderer` API Reference](/api/references/vscode-api#NotebookOutputRenderer)

An output renderer is responsible for taking output data of a specific mimetype and providing a rendered view of that data. The complexity of the rendered view can range from simple static HTML to dynamic fully interactive applets.

Renderers are declared for a set of mimetypes by contributing to the `constributes.notebookOutputRenderer` property of an extension's `package.json`:

```json
{
	...
	"activationEvents": ["...."],
	"contributes": {
		...
		"notebookOutputRenderer": [
			{
				"viewType": "notebook-renderer-demo",
				"displayName": "My Notebook Renderer",
				"mimeTypes": [
					"application/hello-world"
				]
			}
		]
	}
}
```

The renderer is then registered in the extension's activation event:
```ts
import * as vscode from 'vscode';

class SampleRenderer implements vscode.NotebookOutputRenderer {
	...
}

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.notebook.registerNotebookOutputRenderer(
			rendererType,
			{ mimeTypes: ['application/hello-world'] },
			new SampleRenderer(),
		)
	);
}
```

#### Static Renderers
A static renderer simply takes output of a particular mimetype and produces and HTML rendered view of that data. This is similar to having the kernel simply return a `text/html` output, but it allows for multiple different rendered views of the same output.

```ts
class SampleRenderer implements vscode.NotebookOutputRenderer {
	render(
		document: vscode.NotebookDocument,
		{ output, mimeType }: vscode.NotebookRenderRequest,
	): string {
		const name = output.data[mimeType];
		return `Hello <b>${name}</b>! You're viewing data in ${mimeType} format.`;
	}
}
```

![Cell output switching between multiple different rendered views](images/notebook/static-renderer.gif)

#### Dynamic Renerers
