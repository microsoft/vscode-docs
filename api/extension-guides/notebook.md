---
# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use the Notebook API to create rich Notebook experiences within Visual Studio Code.
---

# Notebook API

The Notebook API allows Visual Studio Code extensions to open files as notebooks, execute notebook code cells, and render notebook outputs in a variety of rich and interactive formats. You may know of popular notebook interfaces like Jupyter Notebook or Google Colab, the Notebook API allows for similar experiences inside Visual Studio Code.

> **Note**: The Notebook API is still proposed and under development, which means it is only available on VS Code [Insiders](/insiders) and requires adding `vscode.proposed.d.ts` to your extension project. You can learn more in [Using Proposed APIs](/api/advanced-topics/using-proposed-api).

## Parts of a Notebook

A notebook consists of a sequence of cells and their outputs. The cells of a notebook can be either **Markdown cells** or **code cells**, and are rendered within the core of VS Code. The outputs can be of a variety of formats. Some output formats, such as plain text, JSON, images, and HTML are rendered by VS Code core. Others, such as application-specific data or interactive applets, are rendered by extensions.

Cells in a notebook are read and written to the file system by a `NotebookContentProvider`, which handles reading data from the file system and converting it into a description of cells, as well as persisting modifications to the notebook back to the file system. The **code cells** of a notebook can be executed by a `NotebookKernel`, which takes the contents of a cell and from it produces output in a variety of formats ranging from plain text to formatted documents or interactive applets. Application-specific output formats and interactive applet outputs are rendered by a `NotebookOutputRenderer`.

Visually:

![Overview of 3 components of notebooks: NotebookContentProvider, NotebookKernel, and NotebookOutputRenderer, and how they interact. Described textually above and in following sections.](images/notebook/architecture-overview.png)

## Content Provider

[NotebookContentProvider API Reference](https://github.com/microsoft/vscode/blob/43184b2beda9edb613caadc2bab29ec50bad863f/src/vs/vscode.proposed.d.ts#L1792-L1805)

A `NotebookContentProvider` is responsible for taking a serialized description of a notebook and generating a list of Markdown and code cells. It additionally handles saving modifications made in the notebook back to the original resource.

Samples:

* [.ipynb Content Provider](https://github.com/microsoft/notebook-extension-samples/tree/master/notebook-provider): Work with notebooks in the [Jupyter Notebook format](https://nbformat.readthedocs.io/en/latest/format_description.html).
* [Markdown Content Provider](https://github.com/microsoft/vscode-markdown-notebook): Open and edit Markdown files as a notebook.

### Example

In this example, we build a simplified notebook provider extension for viewing files in the [Jupyter Notebook format](https://nbformat.readthedocs.io/en/latest/format_description.html) with a `.notebook` extension.

A content provider is declared in `package.json` under the `contributes.notebookProvider` section as follows:

```json
{
    ...
    "activationEvents": ["onNotebookEditor:notebook-renderer-demo"],
    "contributes": {
        ...
        "notebookProvider": [
            {
                "viewType": "ny-notebook-provider",
                "displayName": "My Notebook Provider",
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
            "ny-notebook-provider", new SampleProvider()
        )
    );
}

class SampleProvider implements vscode.NotebookContentProvider {
    async openNotebook(uri: vscode.Uri): Promise<vscode.NotebookData> {
        const content = JSON.parse((await vscode.workspace.fs.readFile(uri)).toString());
        return {
            languages: [],
            metadata: { custom: content.metadata },
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

You should be able to open Jupyter-formatted notebooks and view their cells as both plain text and rendered Markdown, as well as edit the cells. However, edits will not be persisted to disk, and you won't be able to run any cells. Saving requires implementing the `saveNotebook`-family commands above, and to run a cell, you will need to implement a `NotebookKernel`.

**Note**: The default ordering of output mimetypes is defined by the notebook content provider via the `NotebookData#metadata.displayOrder` property, which can be set in a content provider's `openNotebook` method.

## Kernel

[NotebookKernel API Reference](https://github.com/microsoft/vscode/blob/43184b2beda9edb613caadc2bab29ec50bad863f/src/vs/vscode.proposed.d.ts#L1807-L1812)

A `NotebookKernel` is responsible for taking a **code cell** and producing some output or set of outputs.

A kernel can either be directly associated with a content provider by setting the `NotebookContentProvider#kernel` property, or registered globally by invoking the `vscode.registerNotebookKernel` function with an identifier for the kernel, a list of file patterns it should be available in, and a `vscode.NotebookKernel` object:

```ts
vscode.notebook.registerNotebookKernel(
    "http-kernel",
    ["*.http"],
    {
        label: "Http Kernel",
        executeCell(document: NotebookDocument, cell: NotebookCell, token: CancellationToken): Promise<void> { ... }
        executeAllCells(document: NotebookDocument, token: CancellationToken): Promise<void> { ... }
    }
)
```

If a kernel has been directly registered to a `NotebookContentProvider` via the `NotebookContentProvider#kernel` property, it will be selected by default when opening notebooks provided by that content provider. Otherwise, a kernel will be selected from those that are registered for a particular file pattern, and the user can switch between kernels using the **Notebook: Select Notebook Kernel** command.

Samples:

* [GitHub Issues Notebook](https://github.com/microsoft/vscode-github-issue-notebooks/blob/master/src/notebookProvider.ts): Kernel to execute queries for GitHub Issues

<!-- - [HTTP Request Notebook](): Kernel to issue HTTP requests (TODO: PR against https://github.com/Huachao/vscode-restclient to add notebooks) -->

### Best practices

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

## Output types

Outputs must be in one of three formats: Text Output, Error Output, or Rich Output. A kernel may provide multiple outputs for a single execution of a cell, in which case they will be displayed as a list.

Simple formats like Text Output, Error Output, or "simple" variants of Rich Output (HTML, Markdown, JSON, etc.) are rendered by VS Code core, whereas application specific Rich Output types are rendered by a [NotebookOutputRenderer](#output-renderer). An extension may optionally choose to render "simple" Rich Outputs itself, for instance to add LaTeX support to Markdown outputs.

![Diagram of the different output types described above](images/notebook/kernel.png)

### Text Output

Text outputs are the most simple output format, and work much like many REPLs you may be familiar with. They consist only of a `text` field, which is rendered as plain text in the cell's output element:

```ts
{
    outputKind: vscode.CellOutputKind.Text,
    text: '...'
}
```

![Cell with simple text output](images/notebook/text-output.png)

### Error Output

Error outputs are helpful for displaying runtime errors in a consistent and understandable manner. They contain `ename` and `evalue` fields for displaying the error type and message, respectively, as well as `traceback` field, which takes a list of strings that get displayed like a callstack. Strings in the traceback stack support ANSI escape sequences for colorization:

```ts
{
    outputKind: vscode.CellOutputKind.Error,
    ename: 'Error Name',
    evalue: 'Error Value',
    traceback: ['\x1b[35mstack frame 1\x1b[0m', 'stack frame 2', 'stack frame 3', 'stack frame 4']
}
```

![Cell with error output showing error name and message, as well as a stack trace with magenta text](images/notebook/error-output.png)

### Rich Output

Rich outputs are the most advanced form of displaying cell outputs. They allow for providing many different representations of the output data, keyed by mimetype. For example, if a cell output was to represent a GitHub Issue, the kernel might produce a rich output with several properties on its `data` field:

* A `text/html` field containing a formatted view of the issue.
* An `application/json` field containing a machine readable view.
* An `application/github-issue` field that a `NotebookOutputRenderer` could use to create a fully interactive view of the issue.

In this case, the `text/html` and `application/json` views will be rendered by VS Code natively, but the `application/github-issue` view will display an error if no `NotebookOutputRenderer` was registered to that mimetype.

```ts
{
    outputKind: vscode.CellOutputKind.Rich,
    data: {
        'text/html': '<b>Hello</b> World',
        'application/json': { hello: 'world' },
        'application/custom': 'my-custom-data-interchange-format',
    }
}
```

![Cell with rich output showing switching between formatted HTML, a JSON editor, and an error message showing no renderer is available (application/hello-world)](images/notebook/rich-output.gif)

By default, VS Code can render the following mimetypes:

* application/json
* application/javascript
* text/html
* image/svg+xml
* text/markdown
* image/png
* image/jpeg
* text/plain
* text/x-javascript

To render an alternative mimetype, a `NotebookOutputRenderer` must be registered for that mimetype.

## Output Renderer

[NotebookOutputRenderer API Reference](https://github.com/microsoft/vscode/blob/43184b2beda9edb613caadc2bab29ec50bad863f/src/vs/vscode.proposed.d.ts#L1610-L1633)

An output renderer is responsible for taking output data of a specific mimetype and providing a rendered view of that data. The complexity of the rendered view can range from simple static HTML to dynamic fully interactive applets. In this section, we'll explore various techniques for rendering an output representing a GitHub Issue, ranging from a purely static HTML rendering of the issue to a fully interactive GitHub Issue applet that communicates with both the GitHub and VS Code APIs.

### Static Renderers

A static renderer simply takes output of a particular mimetype and produces an HTML view of that data. This is similar to having the kernel itself return a `text/html` output, but it decouples data rendering from data generation, which allows for many possible representations of the same output, potentially even contributed by a variety of different extensions.

Renderers are declared for a set of mimetypes by contributing to the `contributes.notebookOutputRenderer` property of an extension's `package.json`. This renderer will work with input in the `ms-vscode.github-issue-notebook/github-issue` format, which we will assume some installed kernel is able to provide:

```json
{
    "activationEvents": ["...."],
    "contributes": {
        ...
        "notebookOutputRenderer": [
            {
                "viewType": "github-issue-static-renderer",
                "displayName": "Static Issue Renderer",
                "mimeTypes": [
                    "ms-vscode.github-issue-notebook/github-issue"
                ]
            }
        ]
    }
}
```

The renderer is then registered in the extension's activation event:

```ts
import * as vscode from 'vscode';

// Type of data with `ms-vscode.github-issue-notebook/github-issue` mimetype
type Issue = {
    author: {
        name: string
        profileImageUrl: string }
    body: string
    repo: string
    title: string
    number: number }

class StaticRenderer implements vscode.NotebookOutputRenderer {
    render(_document: vscode.NotebookDocument, { output, mimeType }: vscode.NotebookRenderRequest): string {
        const issue = output.data[mimeType] as Issue
        return `
        <h2>
            ${issue.title}
            (<a href='https://github.com/${issue.repo}/issues/${issue.number}'>
                #${issue.number}
            </a>)
        </h2>
        <img src="${issue.author.profileImageUrl}" style="float: left; width: 32px; border-radius: 50%; margin-right: 20px;"/>
        <i>@${issue.author.name}</i> Opened:
        <div style="margin-top: 10px">${issue.body}</div>
        `
    }
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.notebook.registerNotebookOutputRenderer(
            "github-issue-static-renderer",
            { mimeTypes: ['ms-vscode.github-issue-notebook/github-issue'] },
            new StaticRenderer(),
        )
    );
}
```

Running this renderer on an output cell with a `ms-vscode.github-issue-notebook/github-issue` data field gives us the following static HTML view:

![Cell output showing rendered HTML view of issue](images/notebook/static-renderer-sample.png)

### JavaScript in Static Renderers

Imagine we want to add the ability to view an issue's comments after clicking a button in the rendered output. Assuming a kernel can provide issue data with comments under the `ms-vscode.github-issue-notebook/github-issue-with-comments` mimetype, we might try to implement this as follows:

```ts
import * as vscode from 'vscode'

// Type of data with `ms-vscode.github-issue-notebook/github-issue-with-comments` mimetype
type IssueWithComments = {
    issue: {
        author: {
            name: string
            profileImageUrl: string }
        body: string
        repo: string
        title: string
        number: number }
    comments: { body: string }[]
}

class ScriptedStaticRenderer implements vscode.NotebookOutputRenderer {
    render(_document: vscode.NotebookDocument, { output, mimeType }: vscode.NotebookRenderRequest): string {
        const { issue, comments } = output.data[mimeType] as IssueWithComments
        const serializedComments = JSON.stringify(JSON.stringify(comments))
        return `
        <script>
            function showComments() {
                const commentContainer = document.querySelector('#comments')
                commentContainer.innerHTML = ""
                const comments = JSON.parse(${serializedComments})
                comments.forEach(comment =>
                    commentContainer.appendChild(document.createTextNode(comment.body))
                )
                document.querySelector('#showComments').remove()
            }
        </script>
        <h2>
            ${issue.title}
            (<a href='https://github.com/${issue.repo}/issues/${issue.number}'>
                #${issue.number}
            </a>)
        </h2>
        <img src="${issue.author.profileImageUrl}" style="float: left; width: 32px; border-radius: 50%; margin-right: 20px;"/>
        <i>@${issue.author.name}</i> Opened:
        <div style="margin-top: 10px">${issue.body}</div>
        `
    }
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.notebook.registerNotebookOutputRenderer(
            "github-issue-scripted-static-renderer",
            { mimeTypes: ['ms-vscode.github-issue-notebook/github-issue-with-comments'] },
            new ScriptedStaticRenderer(),
        )
    );
}
```

This immediately raises some flags. For one, we're loading full comment data for all issues, even before we've clicked the button. Additionally, we require kernel support for a whole different mimetype even though we just want to show a bit more data. And while this renderer does work as expected for a single output cell, further problems surface when multiple output cells are rendered in the same notebook:

![Multiple cells with comment buttons. Selecting any of the cells comment buttons affects only the topmost cell](images/notebook/dynamic-renderer-issues.gif)

The multi-cell issues arise from the fact that all rendered outputs of a notebook share a single context, which you can think of like a single shared `iframe`. In our case, each time a cell is created it actually overwrites the `showComments` function for the entire context, and DOM accessors like `document.querySelector` operate on the entire set of outputs, rather than only the output cell they are invoked in. This means that when we called `document.querySelector('#showComments').remove()`, rather than removing the button from only the current cell, it will query the entire document for the first instance of that `id` and remove it, giving the problem we saw above.

The architecture is diagramed below:

![Visualization of static renderer, showing multiple rich outputs being mapped by a NotebookOutputRenderer to HTML, then piped to a shared "notebook output context".](images/notebook/static-renderer.png)

While this architecture allows for advanced notebooks where output cells can communicate between each other, it also makes cases such as ours slightly more complicated. While we could fiddle with the script a bit to get the correct behavior in multi-output cases, we can solve the above problem, as well as the earlier inconveniences of requiring preloaded comment data and a dedicated mimetype and kernel, by using a Dynamic Renderer.

### Dynamic Renderers

Dynamic renderers build upon the concept of generating HTML for a particular output by adding the ability to preload scripts into the output context in order to establish a notebook runtime. The runtime can then communicate between the extension host context and the output context through message passing, facilitating the creation of fully interactive "applet" outputs. A visualization of data flow in a dynamic renderer can be seen below:

![Visualization of dynamic renderer, showing multiple rich outputs being mapped by an NotebookOutputRenderer to HTML or JSON, then piped to a shared "notebook output context", which contains a preloaded script and can communicate with the extension host context as described in this section](images/notebook/dynamic-renderer.png)

Now that we can set up a runtime inside the output context, the extension host side of the renderer code can be simplified dramatically. Whereas before we statically constructed HTML strings to directly render in the output context, we now will pass the kernel's data through to the output context as a JSON blob. Additionally, we can now go back to using the simpler `ms-vscode.github-issue-notebook/github-issue` mimetype, as we will dynamically fetch comment data on an as-needed basis:

```ts
import * as vscode from 'vscode'

class DynamicRenderer implements vscode.NotebookOutputRenderer {
    render(_document: vscode.NotebookDocument, { output, mimeType }: vscode.NotebookRenderRequest): string {
        return `
            <script data-renderer="github-issue-dynamic-renderer" data-mime-type="${mimeType}" type="application/json">
                ${JSON.stringify(output.data[mimeType])}
            </script>
        `
    }
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.notebook.registerNotebookOutputRenderer(
            "github-issue-dynamic-renderer",
            { mimeTypes: ['ms-vscode.github-issue-notebook/github-issue'] },
            new DynamicRenderer(),
        )
    );
}
```

We next create the runtime script, which will live inside the output context and listen for the creation of new outputs. To facilitate communication between the two contexts, scripts running in the output context have access to a global [acquireNotebookRendererApi()](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/vscode-notebook-renderer/index.d.ts) function, which provides an interface for interacting with the extension host context from within the output context.

Our script for rendering outputs inside the extension host context is as follows:

`client.js`:

```ts
const notebookApi = acquireNotebookRendererApi('github-issue-dynamic-renderer')

// Output renderer
notebookApi.onDidCreateOutput(({ element }) => {
    const tag = element.querySelector('script')!
    const issue = JSON.parse(tag.innerHTML)
    const outputContainer = element.appendChild(document.createElement('div'))

    outputContainer.innerHTML = `
    <h2>${issue.title} (<a href='https://github.com/${issue.repo}/issues/${issue.number}'>#${issue.number}</a>)</h2>
    <img src="${issue.author.profileImageUrl}" style="float: left; width: 32px; border-radius: 50%; margin-right: 20px;"/>
    <i>@${issue.author.name}</i> Opened:
    <div style="margin-top: 10px">${issue.body}</div>`

    const button = outputContainer.appendChild(document.createElement('button'))
    button.innerText = 'Load Comments'
    const commentsContainer = outputContainer.appendChild(document.createElement('div'))

    button.onclick = async () => {
        button.remove()
        const comments = (await postMessageAndWaitForResponse(issue.repo, issue.number, 'load-comments')) as {
            body: string
        }[]
        comments.forEach((comment) => commentsContainer.appendChild(document.createTextNode(comment.body)))
    }
})

// Messaging utilities
let seq = 0
const inflightRequests: Record<number, (response: any) => void> = {}
const postMessageAndWaitForResponse = (repo: string, number: string, message: string) => {
    seq++
    notebookApi.postMessage({ seq, message, repo, number })
    return new Promise((resolve) => (inflightRequests[seq] = resolve))
}
notebookApi.onDidReceiveMessage(({ message, seq }) => inflightRequests[seq](message))

```

**Note**: Typings for the renderer context can be acquired by installing `@types/vscode-notebook-renderer`. These typings inject `acquireNotebookRendererApi` as a global variable, so we keep them separate from the rest of `@types/vscode`.

Finally, we link this script to our dynamic output renderer by adding it to the `NotebookOutputRenderer#preloads` array, and register a listener to resolve comment data by implementing `NotebookOutputRenderer#resolveNotebook`, which is called whenever a new editor is created for a notebook and provides a [communication object](https://github.com/microsoft/vscode/blob/43184b2beda9edb613caadc2bab29ec50bad863f/src/vs/vscode.proposed.d.ts#L1764-L1790) that is able to communicate bidirectionally between the extension host and the editor's output context:

```ts
class DynamicRenderer implements vscode.NotebookOutputRenderer {
    preloads: vscode.Uri[] = []

    constructor(context: vscode.ExtensionContext) {
        this.preloads.push(vscode.Uri.file(path.join(context.extensionPath, 'src/client.js')))
    }

    resolveNotebook(document: vscode.NotebookDocument, communication: vscode.NotebookCommunication) {
        communication.onDidReceiveMessage(async ({ seq, repo: _repo, number, message }) => {
            vscode.window.showInformationMessage('Fetching comments for issue #' + number)
            const commentData = await // call GitHub APIs
            await communication.postMessage({ seq, message: commentData })
        })
    }

    // `render` method as above
}
```

**Note**: `resolveNotebook` is called whenever a new editor is created for a notebook. A single notebook will have multiple editors, webviews, and `communication` channels if the user splits the notebook's editor. These duplicated notebook items can be differentiated through the `communication.editorId` field.

Here's the end result. Multiple outputs are correctly handled, and comments are not loaded until they are requested:

![Multiple cell outputs shown. Selecting each cell's `load comments` button correctly loads its comments](images/notebook/dynamic-renderer.gif)

Samples:

* [Notebook Renderer Starter](https://github.com/microsoft/vscode-notebook-renderer-starter): Starter code for dynamic renderers with support for debugging in the output context, webpack, hot reloading, and CSS modules.
* [nteract Renderer](https://github.com/microsoft/notebook-extension-samples/tree/master/notebook-renderer): Example code for rendering [nteract](https://nteract.io/) outputs

## Supporting debugging

For some kernels, such as those that implement a programming language, it can be desirable to allow debugging a cell's execution. To add debugging support, a notebook kernel can implement a [debug adapter](https://microsoft.github.io/debug-adapter-protocol/), either by directly implementing the protocol, or providing an interface between an existing notebook debugger and the protocol.

Samples:

* [vscode-nodebook](https://github.com/microsoft/vscode-nodebook): Node.js notebook debugger, which directly implements the debug adapter protocol
* [vscode-simple-jupyter-notebook](https://github.com/microsoft/vscode-simple-jupyter-notebook): Jupyter notebook with debugging support provided by the existing Xeus debugger
