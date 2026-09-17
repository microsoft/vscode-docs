---
# DO NOT TOUCH — Managed by doc writer
ContentId: 1664249a-ba7a-4a53-b3f0-9d757cff7d27
DateApproved: 9/16/2026

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Extend Visual Studio Code Markdown features with preview styles, scripts, markdown-it plugins, and interactive code block editors.
---

# Markdown Extension

Markdown extensions allow you to extend and enhance Visual Studio Code's built-in Markdown support. You can change the look of the Markdown preview, add support for new Markdown syntax, and contribute interactive editors for fenced code blocks.

## Changing the look of the Markdown preview with CSS

Extensions can contribute CSS to change the look or layout of the Markdown preview. Stylesheets are registered using the `markdown.previewStyles` [Contribution Point](/api/references/contribution-points) in the extension's `package.json`:

```json
"contributes": {
    "markdown.previewStyles": [
        "./style.css"
    ]
}
```

`"markdown.previewStyles"` is a list of files relative to the extension's root folder.

Contributed styles are added after the built-in Markdown preview styles but before a user's `"markdown.styles"`.

The [Markdown Preview GitHub Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles) extension is a good example that demonstrates using a stylesheet to make the Markdown preview look like GitHub's rendered Markdown. You can review the extension's source code on [GitHub](https://github.com/mjbvz/vscode-github-markdown-preview-style).

## Adding support for new syntax with markdown-it plugins

The VS Code Markdown preview supports the [CommonMark specification](https://spec.commonmark.org). Extensions can add support for additional Markdown syntax by contributing a [markdown-it plugin.](https://github.com/markdown-it/markdown-it#syntax-extensions)

To contribute a markdown-it plugin, first add a `"markdown.markdownItPlugins"` contribution in your extension's `package.json`:

```json
"contributes": {
    "markdown.markdownItPlugins": true
}
```

Then, in the extension's main `activation` function, return an object with a function named `extendMarkdownIt`. This function takes the current markdown-it instance and must return a new markdown-it instance:

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      return md.use(require('markdown-it-emoji'));
    }
  };
}
```

To contribute multiple markdown-it plugins, return multiple `use` statements chained together:

```ts
return md.use(require('markdown-it-emoji')).use(require('markdown-it-hashtag'));
```

Extensions that contribute markdown-it plugins are activated lazily, when a Markdown preview is shown for the first time.

The [markdown-emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji) extension demonstrates using a markdown-it plugin to add emoji support to the markdown preview. You can review the Emoji extension's source code on [GitHub](https://github.com/mjbvz/vscode-markdown-emoji).

You may also want to review:

- [Guidelines](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md) for markdown-it plugin developers
- [Existing markdown-it plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin)

## Adding advanced functionality with scripts

For advanced functionality, extensions may contribute scripts that are executed inside of the Markdown preview.

```json
"contributes": {
    "markdown.previewScripts": [
        "./main.js"
    ]
}
```

Contributed scripts are loaded asynchronously and reloaded on every content change.

The [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) extension demonstrates using scripts to add [Mermaid](https://mermaid.js.org) diagrams and flowchart support to the markdown preview. You can review the Mermaid extension's source code on [GitHub](https://github.com/mjbvz/vscode-markdown-mermaid).

## Add code block editors (Experimental)

Extensions can replace fenced code blocks with interactive, iframe-based editors in the Markdown editor. For example, an extension can provide a form editor for JSON, a diagram editor, or a task progress view. The code block remains the canonical document content and stays synchronized with the contributed editor.

> [!NOTE]
> Markdown code block editors are experimental and apply to the Markdown editor, not the standard Markdown preview. The contribution point and extension export API might change.

Code block editors only load in a [trusted workspace](/docs/editing/workspaces/workspace-trust.md). In Restricted Mode, the Markdown editor does not load contributed code block editors or their resources.

### Register a static code block editor

Use the `markdown.codeBlockEditorProviders` contribution point to select fenced code blocks and provide an HTML entry point:

```json
{
  "contributes": {
    "markdown.codeBlockEditorProviders": [
      {
        "id": "taskProgress",
        "selector": {
          "language": "task-progress"
        },
        "source": {
          "kind": "static",
          "entrypoint": "./editor/index.html"
        },
        "runtimeKey": "task-progress-v1",
        "contentType": "text",
        "initialHeight": 80
      }
    ]
  }
}
```

This contribution replaces fenced code blocks whose info string is exactly `task-progress`:

````markdown
```task-progress
- [x] Create the extension
- [ ] Publish the extension
```
````

The provider supports these properties:

| Property | Required | Description |
| --- | --- | --- |
| `id` | Yes | Identifies the provider within the extension. The value must not be empty. |
| `selector` | Yes | Selects an exact info string with `language`, or all info strings that start with a value by using `languagePrefix`. Specify one selector type. Values must not be empty. |
| `source` | Yes | Uses an extension-relative HTML `entrypoint` for a `static` provider, or an extension export API for an `exportApi` provider. |
| `runtimeKey` | No | Identifies compatible iframe runtimes that can be reused. The value must contain 1 to 256 characters. |
| `contentType` | No | Represents code block content as `text` or `json`. The default is `text`. |
| `initialHeight` | No | Reserves a positive height in pixels until the editor reports its measured height. |
| `sandbox` | No | Sets the maximum optional iframe permissions the provider can request. Supported properties are `forms`, `downloads`, `pointerLock`, and `clipboardWrite`. Each permission defaults to `false`. |

The `entrypoint` path is relative to the extension root. Relative scripts, stylesheets, and other assets in the HTML resolve from the entry point's directory.

### Connect the iframe editor

Install and bundle the experimental `@vscode/web-editors` package into the iframe application. The package synchronizes content, read-only state, and sizing between the code block and the iframe.

The HTML entry point can load a bundled JavaScript module:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task progress editor</title>
</head>
<body>
  <textarea id="editor"></textarea>
  <script type="module" src="./dist/main.js"></script>
</body>
</html>
```

Connect the iframe to its parent window, apply user edits to the root content value, and respond to updates from the host:

```ts
import { WebEditorClient } from '@vscode/web-editors';

const editor = document.querySelector<HTMLTextAreaElement>('#editor');
if (!editor) {
  throw new Error('Task progress editor element not found');
}

const client = await WebEditorClient.connect({
  connection: 'windowParent',
  contentType: 'text'
});

const updateContent = (content: unknown) => {
  if (typeof content === 'string' && editor.value !== content) {
    editor.value = content;
  }
};

updateContent(client.getContent());
editor.readOnly = client.getReadOnly();

client.onDidChangeContent(event => updateContent(event.content));
client.onDidChangeReadOnly(event => {
  editor.readOnly = event.readOnly;
});

editor.addEventListener('input', () => {
  client.applyEdits([{
    kind: 'replace',
    path: [],
    newValue: editor.value
  }]);
});

const resizeObserver = new ResizeObserver(() => {
  client.reportSize(document.documentElement.scrollHeight);
});
resizeObserver.observe(document.documentElement);

window.addEventListener('beforeunload', () => {
  resizeObserver.disconnect();
  client.dispose();
}, { once: true });
```

### Resolve editors from the extension host

Use an `exportApi` source when the extension host needs to choose the HTML dynamically or communicate with an iframe runtime. Register the source with API version 2:

```json
{
  "contributes": {
    "markdown.codeBlockEditorProviders": [
      {
        "id": "taskProgress",
        "selector": {
          "languagePrefix": "task-progress"
        },
        "source": {
          "kind": "exportApi",
          "apiVersion": 2
        },
        "runtimeKey": "task-progress-v1",
        "contentType": "text",
        "initialHeight": 80
      }
    ]
  }
}
```

Return the `markdownCodeBlockEditors.apiV2` API from the extension's `activate` function. The provider ID returned by `getProvider` must match the contribution's `id`.

```ts
import * as vscode from 'vscode';

interface ResolveRequest {
  readonly providerId: string;
  readonly language: string;
  readonly documentUri: vscode.Uri;
}

interface HostTransport {
  readonly runtimeKey: string;
  readonly onDidReceiveMessage: vscode.Event<unknown>;
  readonly onDidDispose: vscode.Event<void>;
  sendMessage(message: unknown): void;
}

const providerId = 'taskProgress';

export function activate(context: vscode.ExtensionContext) {
  const provider = {
    resolve(_request: ResolveRequest, _token: vscode.CancellationToken) {
      return {
        content: {
          uri: vscode.Uri.joinPath(context.extensionUri, 'editor', 'index.html')
        },
        runtimeKey: 'task-progress-v1',
        contentType: 'text' as const,
        initialHeight: 80
      };
    },

    createHostTransport(
      transport: HostTransport,
      token: vscode.CancellationToken
    ) {
      if (token.isCancellationRequested) {
        return;
      }

      return transport.onDidReceiveMessage(message => {
        if (isReadyMessage(message)) {
          transport.sendMessage({ type: 'hostReady' });
        }
      });
    }
  };

  return {
    markdownCodeBlockEditors: {
      apiV2: {
        getProvider(id: string) {
          return id === providerId ? provider : undefined;
        }
      }
    }
  };
}

function isReadyMessage(message: unknown): message is { type: 'ready' } {
  return typeof message === 'object'
    && message !== null
    && 'type' in message
    && message.type === 'ready';
}
```

The `resolve` method receives the provider ID, full fenced code block info string, and Markdown document URI. It can return HTML directly with `content.html` and an optional `content.baseUri`, or return an HTML file with `content.uri`. Returned resources must be within the extension or workspace.

The resolved editor can also override `runtimeKey`, `contentType`, `initialHeight`, and `sandbox`. A returned `runtimeKey` must also contain 1 to 256 characters. A returned sandbox permission is granted only when the contribution also permits it.

API version 2 providers can implement `createHostTransport` for bidirectional notifications between the extension host and an iframe runtime. In the iframe, use the optional `WebEditorClient.hostTransport`:

```ts
const transport = client.hostTransport;
if (transport) {
  transport.onMessage(message => {
    console.log('Message from the extension host', message);
  });
  transport.sendMessage({ type: 'ready' });
}
```

The host buffers messages while `createHostTransport` initializes. Return a `vscode.Disposable` to clean up listeners and resources when the iframe runtime is disposed. Use `transport.onDidDispose` when the extension must react immediately to runtime disposal.

### Reuse iframe runtimes

The Markdown editor virtualizes and pools physical iframes. Editors with the same `runtimeKey` can reuse an iframe runtime as code blocks enter and leave the viewport. Use the same key only when the editors have compatible HTML, scripts, and runtime behavior.

For a static provider, the default runtime key combines the provider ID and extension version. For an exported provider, the resolved `runtimeKey` takes precedence over the contribution value. If neither is present, the Markdown editor derives a key from the provider, extension version, and language.

Runtime reuse preserves the iframe application and host transport, but the web editor protocol updates the code block content and read-only state for each logical editor. Do not store code block-specific state outside the synchronized content unless you reset that state when the content changes.
