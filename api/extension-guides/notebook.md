---
# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use the Notebook API to create rich Notebook experiences within Visual Studio Code.
---

# Notebook API

The Notebook API allows Visual Studio Code extensions to open files as notebooks, execute notebook code cells, and render notebook outputs in a variety of rich and interactive formats. You may know of popular notebook interfaces like Jupyter Notebook or Google Colab – the Notebook API allows for similar experiences inside Visual Studio Code.

## Parts of a Notebook

A notebook consists of a sequence of cells and their outputs. The cells of a notebook can be either **Markdown cells** or **code cells**, and are rendered within the core of VS Code. The outputs can be of a variety of formats. Some output formats, such as plain text, JSON, images, and HTML are rendered by VS Code core. Others, such as application-specific data or interactive applets, are rendered by extensions.

Cells in a notebook are read and written to the file system by a `NotebookSerializer`, which handles reading data from the file system and converting it into a description of cells, as well as persisting modifications to the notebook back to the file system. The **code cells** of a notebook can be executed by a `NotebookController`, which takes the contents of a cell and from it produces zero or more outputs in a variety of formats ranging from plain text to formatted documents or interactive applets. Application-specific output formats and interactive applet outputs are rendered by a `NotebookRenderer`.

Visually:

![Overview of 3 components of notebooks: NotebookSerializer, NotebookController, and NotebookRenderer, and how they interact. Described textually above and in following sections.](images/notebook/architecture-overview.png)

## Serializer

[NotebookContentProvider API Reference](https://github.com/microsoft/vscode/blob/e1a8566a298dcced016d8e16db95c33c270274b4/src/vs/vscode.d.ts#L11865-L11884)

A `NotebookSerializer` is responsible for taking a serialized bytes of a notebook and deserializing those bytes into `NotebookData`, which contains list of Markdown and code cells. It is responsible for the opposite conversion as well: taking `NotebookData` and converting the data into serialized bytes to be saved.

Samples:

* [JSON Notebook Serializer](https://github.com/microsoft/notebook-extension-samples/tree/main/notebook-serializer): Simple example notebook that takes JSON input and outputs prettified JSON in a custom `NotebookRenderer`.
* [Markdown Serializer](https://github.com/microsoft/vscode-markdown-notebook): Open and edit Markdown files as a notebook.

### Example

In this example, we build a simplified notebook provider extension for viewing files in the [Jupyter Notebook format](https://nbformat.readthedocs.io/en/latest/format_description.html) with a `.notebook` extension.

A notebook serializer is declared in `package.json` under the `contributes.notebooks` section as follows:

```json
{
    ...
    "activationEvents": ["onNotebook:my-notebook-provider"],
    "contributes": {
        ...
        "notebooks": [
            {
                "id": "my-notebook",
                "type": "my-notebook",
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

The notebook serializer is then registered in the extension's activation event:

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.workspace.registerNotebookSerializer(
            "my-notebook", new SampleSerializer()
        )
    );
}

interface RawNotebookCell {
    language: string;
    value: string;
    kind: vscode.NotebookCellKind;
}

class SampleSerializer implements vscode.NotebookSerializer {
    async deserializeNotebook(content: Uint8Array, _token: vscode.CancellationToken): Promise<vscode.NotebookData> {
        var contents = new TextDecoder().decode(content);

        let raw: RawNotebookCell[];
        try {
            raw = <RawNotebookCell[]>JSON.parse(contents);
        } catch {
            raw = [];
        }

        const cells = raw.map(item => new vscode.NotebookCellData(
            item.kind,
            item.value,
            item.language
        ));

        return new vscode.NotebookData(cells);
    }

    async serializeNotebook(data: vscode.NotebookData, _token: vscode.CancellationToken): Promise<Uint8Array> {
        let contents: RawNotebookCell[] = [];

        for (const cell of data.cells) {
            contents.push({
                kind: cell.kind,
                language: cell.languageId,
                value: cell.value
            });
        }

        return new TextEncoder().encode(stringify(contents));
    }
}
```

Now try running your extension and opening a Jupyter Notebook formatted file saved with the `.notebook` extension:

![Notebook showing contents of a Jupyter Notebook formatted file](images/notebook/ipynb-simple-provider.png)

You should be able to open Jupyter-formatted notebooks and view their cells as both plain text and rendered Markdown, as well as edit the cells. However, outputs will not be persisted to disk; to save outputs you would need to also serialize and deserialize the outputs of cells from `NotebookData`.

To run a cell, you will need to implement a `NotebookController`.

## Controller

[NotebookController API Reference](https://github.com/microsoft/vscode/blob/e1a8566a298dcced016d8e16db95c33c270274b4/src/vs/vscode.d.ts#L11941)

A `NotebookController` is responsible for taking a **code cell** and executing the code to produce some or no outputs.

A controller is directly associated with a notebook serializer and a type of notebook by setting the `NotebookController#notebookType` property on creation of the controller. Then the controller is registered globally by pushing the controller onto the extension subscriptions on activate of the extension.

```ts
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(new Controller());
}

class Controller {
    readonly controllerId = 'my-notebook-controller-id'
    readonly notebookType = 'my-notebook';
    readonly label = 'My Notebook';
    readonly supportedLanguages = ['python'];

    private readonly _controller: vscode.NotebookController;
    private _executionOrder = 0;

    constructor() {
        this._controller = vscode.notebooks.createNotebookController(this.controllerId, this.notebookType, this.label);

        this._controller.supportedLanguages = this.supportedLanguages;
        this._controller.supportsExecutionOrder = true;
        this._controller.executeHandler = this._execute.bind(this);
    }

    private _execute(cells: vscode.NotebookCell[], _notebook: vscode.NotebookDocument, _controller: vscode.NotebookController): void {
        for (let cell of cells) {
            this._doExecution(cell);
        }
    }

    private async _doExecution(cell: vscode.NotebookCell): Promise<void> {
        const execution = this._controller.createNotebookCellExecution(cell);
        execution.executionOrder = ++this._executionOrder;
        execution.start(Date.now()); // Keep track of elapsed time to execute cell.

        /* Do some execution here; not implemented */

        execution.replaceOutput([new vscode.NotebookCellOutput([vscode.NotebookCellOutputItem.text('Dummy output text!')])])
        execution.end(true, Date.now());
    }
}
```

Samples:

* [GitHub Issues Notebook](https://github.com/microsoft/vscode-github-issue-notebooks/blob/main/src/extension/notebookProvider.ts): Controller to execute queries for GitHub Issues
* [REST Book](https://github.com/tanhakabir/rest-book/blob/main/src/extension/notebookKernel.ts): Controller to run REST queries.

## Output types

Outputs must be in one of three formats: Text Output, Error Output, or Rich Output. A kernel may provide multiple outputs for a single execution of a cell, in which case they will be displayed as a list.

Simple formats like Text Output, Error Output, or "simple" variants of Rich Output (HTML, Markdown, JSON, etc.) are rendered by VS Code core, whereas application specific Rich Output types are rendered by a [NotebookRenderer](#notebook-renderer). An extension may optionally choose to render "simple" Rich Outputs itself, for instance to add LaTeX support to Markdown outputs.

![Diagram of the different output types described above](images/notebook/kernel.png)

### Text Output

Text outputs are the most simple output format, and work much like many REPLs you may be familiar with. They consist only of a `text` field, which is rendered as plain text in the cell's output element:

```ts
vscode.NotebookCellOutputItem.text('This is the output...')
```

![Cell with simple text output](images/notebook/text-output.png)

### Error Output

Error outputs are helpful for displaying runtime errors in a consistent and understandable manner. They support standard `Error` objects.

```ts
try {
    /* Some code */
} catch (error) {
    vscode.NotebookCellOutputItem.error(error)
}
```

![Cell with error output showing error name and message, as well as a stack trace with magenta text](images/notebook/error-output.png)

### Rich Output

Rich outputs are the most advanced form of displaying cell outputs. They allow for providing many different representations of the output data, keyed by mimetype. For example, if a cell output was to represent a GitHub Issue, the kernel might produce a rich output with several properties on its `data` field:

* A `text/html` field containing a formatted view of the issue.
* An `application/json` field containing a machine readable view.
* An `application/github-issue` field that a `NotebookRenderer` could use to create a fully interactive view of the issue.

In this case, the `text/html` and `application/json` views will be rendered by VS Code natively, but the `application/github-issue` view will display an error if no `NotebookRenderer` was registered to that mimetype.

```ts
execution.replaceOutput([new vscode.NotebookCellOutput([
                            vscode.NotebookCellOutputItem.text('<b>Hello</b> World', 'text/html'),
                            vscode.NotebookCellOutputItem.json({ hello: 'world' }),
                            vscode.NotebookCellOutputItem.json({ custom-data-for-custom-renderer: 'data' }, 'application/custom'),
                        ])]);
```

![Cell with rich output showing switching between formatted HTML, a JSON editor, and an error message showing no renderer is available (application/hello-world)](images/notebook/rich-output.gif)

By default, VS Code can render the following mimetypes:

* application/javascript
* text/html
* image/svg+xml
* text/markdown
* image/png
* image/jpeg
* text/plain

VS Code will render these mimetypes as code in a built-in editor:

* application/json
* text/x-javascript
* text/x-html
* text/x-rust
* ... text/x-LANGUAGE_ID for any other built-in or installed languages.

This notebook is using the built-in editor to display some Rust code:
![Notebook displaying Rust code in a built in Monaco editor](images/notebook/rust-output.png)

To render an alternative mimetype, a `NotebookRenderer` must be registered for that mimetype.

## Notebook Renderer

An notebook renderer is responsible for taking output data of a specific mimetype and providing a rendered view of that data. A renderer shared by output cells can maintain global state between these cells. The complexity of the rendered view can range from simple static HTML to dynamic fully interactive applets. In this section, we'll explore various techniques for rendering an output representing a GitHub Issue.

You can get started quickly using boilerplate from our Yeoman generators. To do so, first install Yeoman and the VS Code Generators using:

```
npm install -g yo generator-code
```

Then, run `yo code` and choose `New Notebook Renderer (TypeScript)`.

### A Simple, Non-Interactive Renderer

Renderers are declared for a set of mimetypes by contributing to the `contributes.notebookRenderer` property of an extension's `package.json`. This renderer will work with input in the `ms-vscode.github-issue-notebook/github-issue` format, which we will assume some installed controller is able to provide:

```json
{
  "activationEvents": ["...."],
  "contributes": {
    ...
    "notebookRenderer": [
      {
        "id": "github-issue-renderer",
        "displayName": "GitHub Issue Renderer",
        "entrypoint": "./out/renderer.js",
        "mimeTypes": [
          "ms-vscode.github-issue-notebook/github-issue"
        ]
      }
    ]
  }
}
```

Output renderers are always rendered in a single `iframe`, separate from the rest of VS Code's UI, to ensure they don't accidentally interfere or cause slowdowns in VS Code. The contribution refers to an "entrypoint" script, which is loaded into the notebook's `iframe` right before any output needs to be rendered. Your entrypoint needs to be a single file, which you can write yourself, or use a bundler like Webpack, Rollup, or Parcel to create.

When it's loaded, your entrypoint script export `ActivationFunction` from `vscode-notebook-renderer` to render your UI once VS Code is ready to render your renderer. For example, this will put all your GitHub issue data as JSON into the cell output:

```js
import type { ActivationFunction } from 'vscode-notebook-renderer';

export const activate: ActivationFunction = (context) => ({
    renderOutputItem(data, element) {
        element.innerText = JSON.stringify(data.json())
    }
})
```

You can [refer to the complete API definition here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/vscode-notebook-renderer/index.d.ts). If you're using TypeScript, you can install `@types/vscode-notebook-renderer` and then add `vscode-notebook-renderer` to the `types` array in your `tsconfig.json` to make these types available in your code.

To create richer content, you could manually create DOM elements, or use a framework like Preact and render it into the output element, for example:

```jsx
import type { ActivationFunction } from 'vscode-notebook-renderer';
import { h, render } from 'preact';

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

export const activate: ActivationFunction = (context) => ({
    renderOutputItem(data, element) {
        render(<GithubIssues issues={data.json()} />, element);
    }
});
```

Running this renderer on an output cell with a `ms-vscode.github-issue-notebook/github-issue` data field gives us the following static HTML view:

![Cell output showing rendered HTML view of issue](images/notebook/static-renderer-sample.png)

If you have elements outside of the container or other asynchronous processes, you can use `disposeOutputItem` to tear them down. This event will fire when output is cleared, a cell is deleted, and before new output is rendered for an existing cell. For example:

```js
const intervals = new Map();

export const activate: ActivationFunction = (context) => ({
    renderOutputItem(data, element) {
        render(<GithubIssues issues={data.json()} />, element);

        intervals.set(data.mime, setInterval(() => {
            if(element.querySelector('h2')) {
                element.querySelector('h2')!.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            }
        }, 1000));
    },
    disposeOutputItem(id) {
        clearInterval(intervals.get(id));
        intervals.delete(id);
    }
});
```

It's important to bear in mind that all outputs for a notebook are rendered in different elements in the same iframe. If you use functions like `document.querySelector`, make sure to scope it to the specific output you're interested in to avoid conflicting with other outputs. In this example, we use `element.querySelector` to avoid that issue.

> **Note**: The following parts of Notebook API is still proposed and under development, which means some Notebook functionality, like the following, is only available on VS Code [Insiders](/insiders) and requires adding `vscode.proposed.d.ts` to your extension project. You can learn more in [Using Proposed APIs](/api/advanced-topics/using-proposed-api).

### Interactive Notebooks

Imagine we want to add the ability to view an issue's comments after clicking a button in the rendered output. Assuming a controller can provide issue data with comments under the `ms-vscode.github-issue-notebook/github-issue-with-comments` mimetype, we might try to retrieve all the comments up front and implement it as follows:

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

This immediately raises some flags. For one, we're loading full comment data for all issues, even before we've clicked the button. Additionally, we require controller support for a whole different mimetype even though we just want to show a bit more data.

Instead, the controller can provide additional functionality to the renderer by registering a `NotebookRendererMessaging` object to communicate back and forth with the renderer.

```ts
class Controller {
    ...
    readonly rendererId = 'github-issue-renderer'
    private readonly _renderMessaging: vscode.NotebookRendererMessaging;

    constructor() {
        ...
        this._renderMessaging = vscode.notebooks.createRendererMessaging(rendererId);
        this._renderMessaging.onDidReceiveMessage(this._handleMessage.bind(this));
    }

    private async _handleMessage(event: vscode.NotebookRendererMessage<any>) {
        /* Handle message from renderer */
    }
}
```

Then to declare messaging hard dependency for the renderer, add the flag for `requiresMessaging` to be `always` in the `package.json`. If messaging is not a hard dependency, then set the flag to be `optional`.

```json
{
  "activationEvents": ["...."],
  "contributes": {
    ...
    "notebookRenderer": [
      {
        "id": "github-issue-renderer",
        "displayName": "GitHub Issue Renderer",
        "entrypoint": "./out/renderer.js",
        "requiresMessaging": "always",
        "mimeTypes": [...]
      }
    ]
  }
}
```

This now allows messaging from the renderer to the notebook controller. The `context` from the `ActivationFunction` will have access to a non-null messaging functions `postMessage` and `onDidReceiveMessage`.

For example:

```jsx
export const activate: ActivationFunction = (context) => ({
    renderOutputItem(data, element) {
        let loadComments;
        if(context.postMessage && context.onDidReceiveMessage) {
            loadComments = (issueId: string, callback: (comments: GithubComment[]) => void) => {
                context.postMessage!({ command: 'comments', issueId })
            }

            context.onDidReceiveMessage(event => {
                if (event.data.type === 'comments' && event.data.issueId === issueId) {
                  callback(event.data.comments);
                }
            })
        }

        render(<GithubIssues issues={data.json()} loadComments={loadComments}/>, element);
    }
});

const Issue: FunctionComponent<{ issue: GithubIssue, loadComments?: (issueId: string, callback: any) => void }> = ({ issue, loadComments }) => {
  const [comments, setComments] = useState([]);
  const canLoadComments = loadComments !== undefined;

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

Finally, we want to set up communication to the renderer with the `_handleMessage` method. This is called with the `NotebookRendererMessaging` object from the controller.

```ts
class Controller {
    // ...

    private async _handleMessage(event: vscode.NotebookRendererMessage<any>) {
        if (message.command === 'comments') {
            _getCommentsForIssue(message.issueId).then(comments => this._renderMessaging.postMessage({
                type: 'comments',
                issueId: message.issueId,
                comments,
            }));
        }
    }

    private async _getCommentsForIssue(id: string) {
        /* Not implemented */
    }
}
```

Here's a higher level view of the communication between controllers and renderers:

![Diagram showing how controllers interact with renderers through the NotebookRendererMessaging object](images/notebook/kernel-communication.png)

## Supporting debugging

For some controllers, such as those that implement a programming language, it can be desirable to allow debugging a cell's execution. To add debugging support, a notebook kernel can implement a [debug adapter](https://code.visualstudio.com/api/extension-guides/debugger-extension), either by directly implementing the [debug adapter protocol](https://microsoft.github.io/debug-adapter-protocol/) (DAP), or by delegating and transforming the protocol to an existing notebook debugger (see 'vscode-simple-jupyter-notebook'). A much simpler approach is to use an existing unmodified debug extension and transform the DAP for notebook needs on the fly (see 'vscode-nodebook').

Samples:

* [vscode-nodebook](https://github.com/microsoft/vscode-nodebook): Node.js notebook with debugging support provided by VS Code's built-in JavaScript debugger and some simple protocol transformations
* [vscode-simple-jupyter-notebook](https://github.com/microsoft/vscode-simple-jupyter-notebook): Jupyter notebook with debugging support provided by the existing Xeus debugger
