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
    "activationEvents": ["onNotebook:my-notebook-provider"],
    "contributes": {
        ...
        "notebookProvider": [
            {
                "viewType": "my-notebook-provider",
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
            "my-notebook-provider", new SampleProvider()
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

* [GitHub Issues Notebook](https://github.com/microsoft/vscode-github-issue-notebooks/blob/master/src/extension/notebookProvider.ts): Kernel to execute queries for GitHub Issues

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

An output renderer is responsible for taking output data of a specific mimetype and providing a rendered view of that data. All the output cells share the same output renderer allowing for global state across cell outputs. The complexity of the rendered view can range from simple static HTML to dynamic fully interactive applets. In this section, we'll explore various techniques for rendering an output representing a GitHub Issue.

### A Simple, Non-Interactive Renderer

Renderers are declared for a set of mimetypes by contributing to the `contributes.notebookOutputRenderer` property of an extension's `package.json`. This renderer will work with input in the `ms-vscode.github-issue-notebook/github-issue` format, which we will assume some installed kernel is able to provide:

```json
{
  "activationEvents": ["...."],
  "contributes": {
    ...
    "notebookOutputRenderer": [
      {
        "id": "github-issue-static-renderer",
        "displayName": "Static Issue Renderer",
        "entrypoint": "./out/renderer.js",
        "mimeTypes": [
          "ms-vscode.github-issue-notebook/github-issue"
        ]
      }
    ]
  }
}
```

Output renderers are always rendered in a single `iframe`, separate from the rest of VS Code's UI, to ensure they don't accidentally interfere or cause slowdowns in VS Code. The contribution refers to an "entrypoint" script, which is a loaded into the notebook's `iframe` right before any output needs to be renderer. Your entrypoint needs to be a single file, which you can write yourself, or use a bundler like Webpack, Rollup, or Parcel to create.

When it's loaded, your entrypoint script should immediately call `acquireNotebookRendererApi()` with your renderer ID, and start listening to notebook output events. For example, this will put all your GitHub issue data as JSON into the cell output:

```js
const notebookApi = acquireNotebookRendererApi("github-issue-static-renderer");

notebookApi.onDidCreateOutput((evt) => {
  const output = evt.output.data[evt.mimeType];
  evt.element.innerText = JSON.stringify(output);
});
```

You can [refer to the complete API definition here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/vscode-notebook-renderer/index.d.ts). If you're using TypeScript, you can install `@types/vscode-notebook-renderer` and then add `vscode-notebook-renderer` to the `types` array in your `tsconfig.json` to make these types available in your code. These typings inject `acquireNotebookRendererApi` as a global variable, so we keep them separate from the rest of `@types/vscode`.

To create richer content, you could manually create DOM elements, or use a framework like Preact and render it into the output element, for example:

```jsx
import { h, render } from 'preact';

const notebookApi = acquireNotebookRendererApi("github-issue-static-renderer");

const Issue: FunctionComponent<{ issue: GithubIssue }> = ({ issue }) => (
  <div key={issue.number}>
    <h2>
      {issue.title}
      (<a href={`https://github.com/${issue.repo}/issues/${issue.number}`}>#{issue.number}</a>)
    </h2>
    <img src={issue.user.avatar_url} style={{ float: 'left', width: 32, borderRadius: '50%', marginRight: 20 }} />
    <i>@{issue.user.login}</i> Opened: <div style="margin-top: 10px">{issue.body}</div>
  </div>
);

const GithubIssues: FunctionComponent<{ issues: GithubIssue[]; }> = ({ issues }) => (
  <div>{issues.map(issue => <Issue key={issue.number} issue={issue} />)}</div>
);

notebookApi.onDidCreateOutput((evt) => {
  const output = evt.output.data[evt.mimeType];
  render(<GithubIssues issues={output} />, evt.element);
});
```

Running this renderer on an output cell with a `ms-vscode.github-issue-notebook/github-issue` data field gives us the following static HTML view:

![Cell output showing rendered HTML view of issue](images/notebook/static-renderer-sample.png)

If you have elements outside of the container or other asynchronous processes, you can use `onWillDestroyOutput` to tear them down. This event will fire when output is cleared, a cell is deleted, and before new output is rendered for an existing cell. For example:

```js
const intervals = new Map();

notebookApi.onDidCreateOutput((evt) => {
  const output = evt.output.data[evt.mimeType];
  render(<GithubIssues issues={output} />, evt.element);

  // create an interval that changes the color of the title <h2> every second:
  intervals.set(evt.outputId, setInterval(() => {
    evt.element.querySelector('h2').style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }, 1000));
});

notebookApi.onWillDestroyOutput(scope => {
  if (scope === undefined) {
    // If scope is undefined, all outputs will be destroyed:
    for (const interval of intervals.values()) {
      clearInterval(interval);
    }
    intervals.clear();
  } else {
    // Otherwise we're destroying a single output:
    clearInterval(intervals.get(scope.outputId));
    intervals.delete(scope.outputId);
  }
});
```

It's important to bear in mind that all outputs for a notebook are rendered in different elements in the same iframe. If you use functions like `document.querySelector`, make sure to scope it to the specific output you're interested in to avoid conflicting with other outputs. In this example, we use `evt.element.querySelector` to avoid that issue.

### Interactive Notebooks

Imagine we want to add the ability to view an issue's comments after clicking a button in the rendered output. Assuming a kernel can provide issue data with comments under the `ms-vscode.github-issue-notebook/github-issue-with-comments` mimetype, we might try to retrieve all the comments up front and implement it as follows:

```jsx
const Issue: FunctionComponent<{ issue: GithubIssueWithComments }> = ({ issue }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div key={issue.number}>
      <h2>
        {issue.title}
        (<a href={`https://github.com/${issue.repo}/issues/${issue.number}`}>#{issue.number}</a>)
      </h2>
      <img src={issue.user.avatar_url} style={{ float: 'left', width: 32, borderRadius: '50%', marginRight: 20 }} />
      <i>@{issue.user.login}</i> Opened: <div style="margin-top: 10px">{issue.body}</div>
      <button onClick={() => setShowComments(true)}>Show Comments</button>
      {showComments && issue.comments.map(comment => <div>{comment.text}</div>)}
    </div>
  );
};
```

This immediately raises some flags. For one, we're loading full comment data for all issues, even before we've clicked the button. Additionally, we require kernel support for a whole different mimetype even though we just want to show a bit more data.

Instead, the kernel can provide additional functionality to the renderer by including a preload which VS Code will load in the iframe as well. This script has access to the `acquireVsCodeApi()` with its postMessage interface, which you can wrap and expose as a global in the iframe.

![Kernel communication diagram](images/notebook/kernel-communication.png)

For example, you might modify your kernel `preloads` to reference a new file where you create a connection back to the Extension Host, and expose a global for the renderer to use:

```js
globalThis.githubIssueCommentProvider = {
  loadComments(issueId: string, callback: (comments: GithubComment[]) => void) {
    vscodeApi.postMessage({ command: 'comments', issueId });
    const listener = event => {
      if (event.data.type === 'comments' && event.data.issueId === issueId) {
        callback(event.data.comments);
        window.removeEventListener('message', listener);
      }
    };

    window.addEventListener('message', listener);
  }
};
```

And then you can consume that in the renderer. You want to make sure that you check whether the global exposed by the kernel's preload is available, since other developers might create github issue output in other notebooks and kernels that don't implement the `githubIssueCommentProvider`. In this case, we'll only show the "Load Comments" button if the global is available:

```jsx
const canLoadComments = globalThis.githubIssueCommentProvider !== undefined;

const Issue: FunctionComponent<{ issue: GithubIssue }> = ({ issue }) => {
  const [comments, setComments] = useState([]);
  const loadComments = () =>
    globalThis.githubIssueCommentProvider.loadComments(issue.id, setComments);

  return (
    <div key={issue.number}>
      <h2>
        {issue.title}
        (<a href={`https://github.com/${issue.repo}/issues/${issue.number}`}>#{issue.number}</a>)
      </h2>
      <img src={issue.user.avatar_url} style={{ float: 'left', width: 32, borderRadius: '50%', marginRight: 20 }} />
      <i>@{issue.user.login}</i> Opened: <div style="margin-top: 10px">{issue.body}</div>
      {canLoadComments && <button onClick={loadComments}>Load Comments</button>}
      {comments.map(comment => <div>{comment.text}</div>)}
    </div>
  );
};
```

Finally, we want to set up communication to the webview. `NotebookKernelProvider.resolveKernel` method is called when a kernel is chosen for a document, and its arguments include a reference to the webview. To implement this method, you can set up a listener for `onDidReceiveMessage`:

```ts
export class MyKernelProvider extends vscode.NotebookKernelProvider {
  // ...

  public resolveKernel(kernel, document, webview) {
    webview.onDidReceiveMessage(message => {
      if (message.command === 'comments') {
        kernel.getCommentsForIssue(message.issueId).then(comments => webview.postMessage({
          type: 'comments',
          issueId: message.issueId,
          comments,
        }));
      }
    });
  }
```

## Supporting debugging

For some kernels, such as those that implement a programming language, it can be desirable to allow debugging a cell's execution. To add debugging support, a notebook kernel can implement a [debug adapter](https://code.visualstudio.com/api/extension-guides/debugger-extension), either by directly implementing the [debug adapter protocol](https://microsoft.github.io/debug-adapter-protocol/) (DAP), or by delegating and transforming the protocol to an existing notebook debugger (see 'vscode-simple-jupyter-notebook'). A much simpler approach is to use an existing unmodified debug extension and transform the DAP for notebook needs on the fly (see 'vscode-nodebook').

Samples:

* [vscode-nodebook](https://github.com/microsoft/vscode-nodebook): Node.js notebook with debugging support provided by VS Code's built-in JavaScript debugger and some simple protocol transformations
* [vscode-simple-jupyter-notebook](https://github.com/microsoft/vscode-simple-jupyter-notebook): Jupyter notebook with debugging support provided by the existing Xeus debugger
