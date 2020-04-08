---
# DO NOT TOUCH — Managed by doc writer
ContentId: TODO
DateApproved: TODO

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use the Custom Editor API to create customizable editors within Visual Studio Code.
---

# Custom Editor API

Custom editors allow extensions to create fully customizable read/write editors that are used in place of VS Code's standard text editor for specific types of text resources. They have a wide variety of use cases, such as:

- Previewing assets, such as shaders or 3D models, directly in VS Code.
- Creating WYSIWYG editors for languages such as Markdown or XAML.
- Offering alternative visual renderings for data files such as CSV or JSON or XML.
- Building fully customizable editing experiences text files.

This document provides an overview of the custom editor API and the basics of implementing a custom editor. Although custom editors are a very powerful new extension point, implementing a basic custom editor is not actually that difficult! Still, if you are working on your first VS Code extension, you may want to consider holding off on diving into custom editors until you are more familiar with the basics of the VS Code api. Custom editors build on a lot of VS Code concepts—such as [webviews](/api/extension-guides/webview) and text documents—so it may be a bit overwhelming if you are learning all of these new ideas at the same time.

But if you're feeling ready and already thinking about all the cool custom editors you are going to build, then let's get started! Be sure to download the [custom editor extension sample][sample] so you can follow along with the documentation and see how the custom editor API comes together.

## Links

- [Custom Editor Sample][sample]

### VS Code API Usage

- [`window.registerCustomEditor`](/api/references/vscode-api#window.registerCustomEditor)
- [`CustomTextEditor`](/api/references/vscode-api#CustomTextEditor)

## Custom Editor API basics

A custom editor is an alternative view that is shown in place of VS Code's standard text editor for specific resources. There are two parts to a custom editor: the view that users interact with and the document model that your extension use to interact with the underlying resource.

The view side of a custom editor is implemented using a [webview](/api/extension-guides/webview). This lets you build the user interface of your custom editor using standard html, css, and JavaScript. Webviews cannot access the VS Code API directly but they can talk with extensions by passing messages back and forth. Check out our [webview documentation](/api/extension-guides/webview) for more information webviews and best practices for working with them.

The other part of a custom editor is the document model. This model is how your extension understands the resource (file) it is working with. A `CustomTextEditor` uses VS Code's standard [`TextDocument`](/api/references/vscode-api#TextDocument) as its document model and all changes to the file are expressed using VS Code's standard text editing APIs.

Custom editors have a single document model per resource but there may be multiple editor instances (views) of this document. For example, imagine that you open a file that has a `CustomTextEditor` and then run the `View: Split editor` command. In this case, there is still just a single `TextDocument` since there is still just a single copy of the resource in the workspace,= but there are now two webviews for that resource.

### Contribution Point

The `customEditors` [contribution point](/api/references/contribution-points) is how your extension tells VS Code about the custom editors that it provides. For example, VS Code needs to know what types of files your custom editor works with as well as how to identify your custom editor in any UI.

Here's a basic `customEditor` contribution for the [custom editor extension sample][sample]:

```json
"contributes": {
  "customEditors": [
    {
      "viewType": "catEdit.catScratch",
      "displayName": "Cat Scratch",
      "selector": [
        {
          "filenamePattern": "*.cscratch"
        }
      ],
      "priority": "default"
    }
  ]
}
```

`customEditors` is an array, so your extension can contribute multiple custom editors. Let's break down the custom editor entry itself:

- `viewType` — Unique identifier for your custom editor.

    This is how VS Code ties a custom editor contribution in the `package.json` to you custom editor implementation in code. This must be unique across all extensions, so instead of a generic `viewType` such as `"preview"` make sure to use one that is unique to your extension, i.e. `"viewType": "myAmazingExtension.svgPreview"`

- `displayName` — Name that identifies the custom editor in VS Code's UI.

    The display name is shown to user's in VS Code UI such as `View: Reopen with`.

- `selector` — Specifies which files a custom editor is active for.

    The `selector` is an array of one or more glob patterns. These glob patterns are matched against file names to determine if the custom editor can be used for them. A `filenamePattern` such as `*.png` will enable the custom editor for all png file.

    You can also create more specific that match on file or directory names, `**/translations/*.json`.

- `priority` — (optional) Specifies when the custom editor is used.

    `priority` controls when a custom editor is used when a resource is open. Possible values are:

    - `"default"` — Try to use the custom editor for every file that matches the custom editor's `selector`. If there are multiple custom editors for a given file, the user will have to select which custom editor they want to use
    - `"option"` — Do not use the custom editor by default but allow users to switch to it or configure it as their default.


### Custom editor activation

When a user opens one of your custom editors, VS Code fires an `onCustomEditor:VIEW_TYPE` activation event. During activation, your extension must call `registerCustomEditor` to register a custom editor with the expected `viewType`.

It's important to note that `onCustomEditor` is only called when VS Code needs to create an instance of your custom editor. If VS Code is merely showing a user some information about an available custom editor—such as using the `View: Reopen with` command—your extension will not be activated.

## Custom Text Editor

Custom text editors let you create custom editors for text files. This can be anything from plain unstructured text to [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) to JSON or XML. Custom text editors use VS Code's standard [`TextDocument`](/api/references/vscode-api#TextDocument) as their document model.

The [custom editor extension sample][sample] includes a simple example custom text editor for cat scratch files (which are just json files that end with a `.cscratch` file extension). Let's take a look at some of the important bits of implementing a custom text editor.

### Custom Text Editor lifecycle

VS Code handles lifecycle of both the view component a custom text editors (the webviews) and the model component (`TextDocunent`). VS Code calls out to your extension when it needs to create a new custom editor instance and cleans up the editor instances and document model when the user closes their tabs.

To understand how this all works in practice, let's work through what happens from an extension's point of view when a user opens a custom text editor and when a user closes a custom text editor.

**Opening a custom text editor**
Using the [custom editor extension sample][sample], here's what happens when the user first opens a `.cscratch` file:

1. VS Code fires an `onCustomEditor:catCustoms.catScratch` activation event.

    This activates our extension if it has not already been activated. During activation, our extension must ensure the extension registers a `CustomTextEditorProvider` for `catCustoms.catScratch` by calling `registerCustomEditor`.

1. VS Code then invokes `resolveCustomTextEditor` on the registered `CustomTextEditorProvider` for `catCustoms.catScratch`.

    This method takes the `TextDocument` for the resource that is being opened and a `WebviewPanel`. The extension must fill in the initial html contents for this webview panel.

Once `resolveCustomEditor` returns, our custom editor is displayed to the user. What is drawn inside the webview is entirely up to our extension.

This same flow happens every time a custom editor is opened, even when you split a custom editor. Every instance of a custom editor has its own `WebviewPanel`, although multiple custom text editor will share the same `TextDocument` if they are for the same resource. Remember: think of the `TextDocument` as being the model for the resource while the webview panels are views of that model.

**Closing custom text editors**

When a user closes a custom text editor, VS Code fires the `WebviewPanel.onDidDispose` event on the `WebviewPanel`. At this point your extension should clean up any resources associated with that editor (event subscriptions, file watchers, etc.)

When the last custom editor for a given resource is closed, the `TextDocument` for that resource will also be disposed provided there are no other editors using it and no other extensions are holding onto it. You can check the `TextDocument.isClosed` property to see if the `TextDocument` has been closed. Once a `TextDocument` is closed, opening the same resource using a custom editor will cause a new `TextDocument` to be opened.


### Synchronizing changes with the TextDocument

Since custom text editors use a `TextDocument` as their document model, they are responsible for updating the `TextDocument` whenever an edit occurs in a custom editor as well as updating themselves whenever the `TextDocument` changes.

**From webview to `TextDocument`**

Edits in custom text editors can take many different forms—clicking a button, changing some text, dragging some items around. Whenever a user edits the file itself inside the custom text editor, the extension must update the `TextDocument`. Here's how the cat scratch extension implements this:

1. User clicks the "Add scratch" button in the webview. This [posts a message](/api/extension-guides/webview#scripts-and-message-passing) from the webview back to the extension.

1. The extension receives the message. It then updates its internal model of the document (which in the cat scratch example just consists of adding a new entry to the JSON).

1. The extension creates a `WorkspaceEdit` that writes the updated JSON to the document. This edit is applied using `vscode.workspace.applyEdit`.

Try to keep your workspace edit to the minimal change required to update the document. Also keep in mind that if you are working with a languages such a json, your extension should try to observe the user's existing formatting conventions (spaces vs tabs, indent size, etc.).

**From `TextDocument` to webviews**

When a `TextDocument` changes, your extension also needs to make sure its webviews reflect the documents new state. TextDocuments can be changed by user actions such as undo, redo, or revert file; by other extensions using a `WorkspaceEdit`; or by a user who opens the file in VS Code's default text editor. Here's how the cat scratch extension implements this:

1. In the extension, we subscribe to the `vscode.workspace.onDidChangeTextDocument` event. This event if fired for every change a the `TextDocument` (including changes that our custom editor makes!)

1. When a change comes in for a document that we have an editor for, we post a message to the webview with it's new document state. This webview then updates itself to render the updated document.

It's important to remember that any file edits that a custom editor triggers will cause `onDidChangeTextDocument` to fire. Make sure your extension does not get into an update loop where the user makes an edit in the webview, which fires onDidChangeTextDocument, which causes the webview to update, which causes the webview to trigger another update on your extension, which fires `onDidChangeTextDocument`, and so on.

Also remember that if you are working with a structured language such as JSON or XML, the document may not always be in a valid state. Your extension must either be able gracefully handle errors or display an error message to users so that they understand what is wrong and how to fix it.

Finally, if updating your webviews is expensive, consider [debouncing](https://davidwalsh.name/javascript-debounce-function) the updates your webview.

## Next steps

If you'd like to learn more about VS Code extensibility, try these topics:

- [Extension API](/api) - Learn about the full VS Code Extension API.
- [Extension Capabilities](/api/extension-capabilities/overview) - Take a look at other ways to extend VS Code.


[sample]: https://github.com/Microsoft/vscode-extension-samples/blob/master/custom-editors/README.md