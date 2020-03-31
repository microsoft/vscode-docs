---
# DO NOT TOUCH — Managed by doc writer
ContentId: TODO
DateApproved: TODO

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use the Custom Editor API to create customizable editors within Visual Studio Code.
---

# Custom Editor API

Custom editors allow extensions to create fully customizable read/write editors that are used in place of VS Code's standard text editor for specific types of resources. This has some very interesting use cases, including:

- Previewing assets, such as shaders or 3D models, directly in VS Code.
- Creating WYSIWYG editors for languages such as Markdown or XAML.
- Offering alternative visual renderings for data files such as CSV or JSON or XML.
- Building fully customizable editing experiences for binary or text files.

This document provides an overview of the custom editor API and the basics of implementing a custom editor. We'll take a look at the two types of custom editors and how they differ, as well as which one is right for you use case. Then for each of these custom editor types, we'll cover the basics of building a well behaved custom editor.

Although custom editors are a very powerful new extension point, implementing a basic custom editor is not terribly difficult! Still, if you are working on your first VS Code extension, you may want to consider holding off on diving into custom editors until you are more familiar with the basics of the VS Code api. Custom editors build on a lot of VS Code concepts—such as [webviews](https://code.visualstudio.com/api/extension-guides/webview), documents, and edits—and it may be a bit overwhelming if you are learning all of these new ideas at the same time.

But if you're feeling ready and already have bunch of cool custom editor extension ideas in mind, then let's get started! Be sure to download the [custom editor extension sample](https://github.com/Microsoft/vscode-extension-samples/blob/master/custom-editors/README.md) so you can see how the custom editor API comes together.

## Links

- [Custom Editor Sample](https://github.com/Microsoft/vscode-extension-samples/blob/master/custom-editors/README.md)

### VS Code API Usage

- [`window.registerCustomEditor`](/api/references/vscode-api#window.registerCustomEditor)
- [`CustomTextEditor`](/api/references/vscode-api#CustomTextEditor)
- [`CustomEditor`](/api/references/vscode-api#CustomEditor)


## Custom Editor API basics

TODO

There are two parts to custom editors: the view that users interact with and the document model that VS Code and your extension use to implement the editor.

The view side of custom editors uses [webviews](https://code.visualstudio.com/api/extension-guides/webview). If  The user interface for a custom editor is built using standard html, css, and JavaScript.

TODO

### `CustomEditor` vs `CustomTextEditor`

There are two classes of custom editor: `CustomTextEditor` and `CustomEditor`. The main difference between these two types of custom editor is what they use the their document model..

A `CustomTextEditor` uses VS Code's standard [`TextDocument`](TODO) as its data model. You can use a `CustomTextEditor` for any text based file types. `CustomTextEditor` are considerably easier to implement because VS Code already know about how to work with text files and can therefore implement operations such as save and backing up files for hot exit.

With a `CustomEditor` on the other hand, your extension brings its own document model. This means that you can use a `CustomEditor` for binary formats such as images, but it also means that your extension is responsible for a lot more, including implementing save and backing. You can skip over much of this complexity if your custom editor is readonly, such custom editors for previews.

### Contribution Point

TODO

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
      ]
    }
  ]
}
```


## Custom Text Editor

Custom text editors let you create custom editors for text files. This can be anything from plain unstructured text to [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) to JSON or XML.

Implementing a Custom Text Editor is considerably easier than implementing one of the [Custom Editors](#custom-editor) detailed later, but just because custom text editors are easier to work with does not mean they any less powerful. In fact, we strongly recommend that all custom editors for text based files use a custom text editor.

The custom editor extension samples include a simple example custom text editor for cat scratch files (ending in `.cscratch` file extension). Let's take a look at some of the important bits of implementing a custom text editor.

### Custom Text Editor lifecycle

**Opening a custom text editor**
Using the [custom editor extension sample](TODO), here's what happens when the user first opens a `.cscratch` file:

1. VS Code fires an `onCustomEditor:catCustoms.catScratch` activation event.

    This activates our extension if it has not already been activated. We must also make sure the extension registers a `CustomTextEditorProvider` for `catCustoms.catScratch` during activation.

1. VS Code then invokes `resolveCustomTextEditor` on our `CustomTextEditorProvider`.

    This method takes the `TextDocument` for the resource that is being opened and a `WebviewPanel`. The extension must fill in the initial html contents for this webview panel.

Once `resolveCustomEditor` returns, our custom editor is displayed to the user.

This same flow happens every time a custom editor is opened, even when you split a custom editor. Every instance of a custom editor has its own `WebviewPanel`, although multiple custom text editor will share the same `TextDocument` if they are for the same resource. You can think of the `TextDocument` as being the model while the webview panels are views of that model.

**Closing custom text editors**

When a user closes a custom text editor, VS Code fires the `WebviewPanel.onDidDispose` event on the `WebviewPanel`. At this point your extension should clean up any resources associated with that editor (event subscriptions, file watchers, etc.)

When the last custom editor for a given resource is closed, the `TextDocument` for that resource will also be disposed provided there are no other editors using it and no other extensions are holding onto it. You can check the `TextDocument.isClosed` property to see if the `TextDocument` has been closed. Once a `TextDocument` is closed, opening the same resource using a custom editor will cause a new `TextDocument` to be opened.


### Synchronizing changes with the TextDocument

Since custom text editors use a `TextDocument` as their document model, they are responsible for updating the `TextDocument` whenever an edit occurs in a custom editor as well as updating themselves whenever the `TextDocument` changes.

**From webview to `TextDocument`**

Edits in custom text editors can take all different forms—clicking a button, changing some text, dragging some items around. Whenever a user edits the file itself inside the custom text editor, the extension must update the `TextDocument`. Here's how the cat scratch extension implements this:

1. Use clicks the "Add scratch" button in the webview. This [posts a message](TODO) from the webview back to the extension.

1. The extension receives the message. It then updates its internal model of the document (which in the cat scratch example just consists of adding a new entry to the JSON).

1. The extension creates a `WorkspaceEdit` that writes the updated JSON to the document. This edit is applied using `vscode.workspace.applyEdit`.

Try to keep your workspace edit to the minimal change required to update the document. Also keep in mind that if you are working with a languages such a json, your extension should try to observe the user's existing formatting conventions (spaces vs tabs, indent size, etc.).

**From `TextDocument` to webviews**

When a `TextDocument` changes, your extension also needs to make sure its webviews reflect the documents new state. TextDocuments can be changed by user actions such as undo, redo, or revert file; by other extensions using a `WorkspaceEdit`; or by a user who opens the file in VS Code's default text editor. Here's how the cat scratch extension implements this:

1. In the extension, we subscribe to the `vscode.workspace.onDidChangeTextDocument` event. This event if fired for every change a the `TextDocument` (including changes that our custom editor makes!)

1. When a change comes in for a document that we have an editor for, we post a message to the webview with it's new document state. This webview then updates itself to render the updated document.

It's important to remember that edits in custom editors themselves also cause `onDidChangeTextDocument` to fire. Make sure your extension does not get into an update loop where the user makes an edit in the webview, which fires onDidChangeTextDocument, which causes the webview to update, which causes the webview to trigger another update on your extension, which fires `onDidChangeTextDocument`, and so on.

Also remember that if you are working with a structured language such as JSON or XML, the document may not always be in a valid state. Your extension must either be able gracefully handle errors or display an error message to users so that they understand what is wrong and how to fix it.

Finally, if updating your webviews is expensive, consider [debouncing](https://davidwalsh.name/javascript-debounce-function) the updates your webview.


## Custom Editor

If you are building an editor for a text based file format, strongly consider using a `CustomTextEditor` instead. A `CustomTextEditor` is far simpler to implement and even supports features that a `CustomEditor` cannot, such as live synchronization between your custom editor and VS Code's normal text editor.

### CustomDocument

Again, the main difference between `CustomTextEditor` and `CustomEditor` is the model side of things. Both use webviews to implement the editor itself for example, but `CustomTextEditor` uses VS Code's standard `TextDocument` type as it's document model. This `TextDocument` is created and controlled by VS Code.

A `CustomEditor` on the other hand requires your extension to implement its own document model using the `CustomDocument` class. This leaves your extension free to create whatever sort of document representation it needs to implement your custom editors, but it also means that your extension must also implement basic document operations such as saving and backup for hot exit.

A `CustomDocument` is the document model for a single resource (file) in the workspace. `CustomDocument` is a base class that shares some common properties with `TextDocument`, such as `uri` and `isUntitled`. Extensions typically then subclass `CustomDocument` so that they can store information specific to their document types. The `CustomDocument` for an image editor might store a bitmap for example, while a memory dump preview may store the parsed version of that dump. The key bit is that `CustomDocument` is entirely for your extension to use. VS Code does not care—even know—what information extensions store on custom documents. A `CustomDocument` is created by your extension and lives entirely within your extension.

Also remember that, just like with `TextDocument`, there is one `CustomDocument` for each resource. Users can open multiple editors for a single resource—such as by splitting the current custom editor—but all those editors will be backed by the same `CustomDocument`.

### Custom Editor lifecycle

**Opening Custom Editors**
When the user opens a file that matches the `customEditor` contribution point, VS Code fires an `onCustomEditor` [activation event](TODO) and then invokes the provider registered for the provided view type. A `CustomEditorProvider` has two roles: providing the document for the custom editor and then providing the editor itself. Here's a ordered list of what happens for a theoretical `catCustoms.pawDraw` editor:

1. VS Code fires an `onCustomEditor:catCustoms.pawDraw` activation event.

    This activates our extension if it has not already been activated. We must also make sure our extension registers a `CustomEditorProvider` for `catCustoms.pawDraw` during activation.

1. VS Code calls `openCustomDocument` on the `CustomEditorProvider` registered for `catCustoms.pawDraw` editors.

    Here our extension is given a resource uri and must return a new `CustomDocument` for that resource. This is the point at which our extension should create its internal model for that resource. This may involve reading and parsing the initial resource state from disk or initializing our new `CustomDocument`.

    Our extension can define this model by subclassing `CustomDocument`. `openCustomDocument` must return an instance of `CustomDocument`. Remember that this initialization stage is entirely up to extensions; VS Code does not care about any additional information extensions store on a `CustomDocument`.

1. VS Code calls `resolveCustomEditor` with the `CustomDocument` from step 2 and a new `WebviewPanel`.

    Here our extension must fill in the initial html for the custom editor. If we need, we can also hold onto a reference to the `WebviewPanel` so that we can reference it later, for example inside commands.

Once `resolveCustomEditor` returns, our custom editor is displayed to the user.

If the user opens the same resource in another editor group using our custom editor—for example by splitting the first editor—the extension's job is simplified. In this case, VS Code just calls `resolveCustomEditor` with the same `CustomDocument` we created when the first editor was opened.

**Closing Custom Editors**

Say we have two instance of our custom editors open for the same resource. When the user closes these editors, VS Code signals our extension so that it can clean up any resources associated with the editor.

When the first editor instance is closed, VS Code fires the `WebviewPanel.onDidDispose` event on the `WebviewPanel` from the closed editor. At this point, our extension must clean up any resources associated with that specific editor instance.

When the second editor is closed, VS Code again fires `WebviewPanel.onDidDispose`. However now we've also closed all the editors associated with the `CustomDocument`. When there are no more editors for a `CustomDocument`, VS Code disposes of it internally and fires the `CustomDocument.onDidDispose` method on it. At this point, out extension must clean up any resources associated with the document as well.

If the user then reopens the same resource using our custom editor, we will go back through the whole `openCustomDocument`, `resolveCustomEditor` flow with a new `CustomDocument`.

### Readonly Custom editors and `CustomEditorEditingDelegate`

Before diving into your amazing new custom editor, it's worth noting that many of the following sections only apply to custom editors that support editing. And while it may sound paradoxical, many custom editors don't require editing capabilities at all. Consider a image preview for example, or a visual rendering of a memory dump. Both can be implemented using custom editors but neither needs to be editable.

The custom editor api—as well as this documentation for that matter—may seem daunting, almost all of the complexity of building a `CustomEditor` comes from implementing the editing side of things. If you are creating a readonly editor though, you can skip over all of that complexity! The Custom Editor API is even nicely isolates all the editing parts of a custom editor to a single optional interface. This makes building a readonly `CustomEditor` only a hair more complicated than building a `CustomTextEditor`.

### Edits

Edits are how a `CustomEditorEditingDelegate` understand changes that users make to a resource using a custom editor. An edit can be anything from a text change, to an operation such as an image rotation, to reordering a list. A `CustomDocument` tracks a stack of edits that have been applied to it. Your extension uses a `CustomEditorEditingDelegate` to push new edits on this stack, as well as to respond to user operations such as `undo` that change the edit stack.

There are two sides to edits in custom editors: the VS Code side which is all about edit from and end user's point of view (change, undo, redo), and the extension side which is about how your extension represents changes to a document internally and how your extension applies a set of edits to a document to render it or save it to disk. As with much of the custom editor API, although the edit api is quite simple, it leaves a lot up to your extension.

**Making edits**

To start with, whenever the user makes a change using your custom editor your extension needs to tell VS Code that an edit has occurred by firing the `onDidEdit` event for your `CustomEditorEditingDelegate`. This pushes and edit onto the edit stack of a `CustomDocument`

The `onDidEvent` event takes an object with three fields:

- `label` — Optional text that that describes what type of edit was made (for example: "Crop", "Insert", ...)
- `document` — The `CustomDocument` the edit was for.
- `edit` — The edit itself.

The `edit` object is controlled entirely by your extension. Your extension must store whatever information it needs on the edit so that it can implement operations like save, as well as updating the custom editor webview when an edit is undone or redone. You'll also notice that classes such as `CustomDocument` and `CustomEditorEditingDelegate` take an `EditType` template argument. This lets you properly type the edits that are used throughout your `CustomEditorProvider`.

Extensions can also change the `edit` object after firing `onDidEdit`. To implement batch editing for example, you can fire `onDidEdit` with the initial edit object. If the user keeps quickly editing—such as continuing to type in a text field—instead of firing `onDidEdit` which would create another undo stop, your extension can simply update the first edit. After a certain point, you can then fire `onDidEdit` to create a new undo stop for users.

When an edit occurs and your extension fires `onDidEdit`, VS Code will mark any editors for the `CustomDocument` as being dirty. It also enables undo and [backup](TODO) for the editor.

When implementing editing, remember that there may be multiple visible editors for a single resource. When an edit happens in one of those editors, in addition to firing `onDidEdit` on the `CustomDocument`, your extension must also update all of its other editors for the resource. All custom editors for a given resource must always display the resource in the same state, although each editor may render this state in a different way. For example, multiple instances of an image custom editor must always show the same pixel data but may allow each editor instance to have its own zoom level and UI state.

**Undo and redo**

Users can manipulate the edit stack by undoing and redoing edits, as well as reverting a document to its saved state. Your `CustomEditorEditingDelegate` is notified for each of these operations and must update all its corresponding custom editors so that they reflect the updated edit stack.

`CustomEditorEditingDelegate.undoEdits` is fired when the user triggers an undo on your custom editor. The method takes the edited document and a list of edits, sorted from most recent to oldest.

`CustomEditorEditingDelegate.applyEdits` is fired when the user triggers an redo on your custom editor. The method takes the edited document and a list of edits, sorted from oldest to most recent.

`CustomEditorEditingDelegate.revert` is fired when the user triggers the `File: Revert file` action on your custom editor (this is distinct from a git revert which changes the file on disk). The method takes the edited document and a delta of edits to the document's last saved state.

The `CustomDocument` class also exposes the full edit stack to help you track the document's state and update your custom editors. `CustomDocument.appliedEdits` is a readonly list of edits to the document's current state in the editor. `CustomDocument.savedEdits` is a readonly list of edits to the document's last saved state.

### Saving

When a user saves a custom editor, your extension is responsible for writing the saved resource in its current state to disk. How your custom editor goes about this depends largely on how your extension's `CustomDocument` implementation and how it represents edits internally.

You should use the [workspace FS api](TODO) to write the resource to disk. The FS APIs take a `UInt8Array` of data and can write out both binary and text based files. For binary file data, simply put the binary data into the `UInt8Array`. For text file data, use `Buffer` to convert a string into a `UInt8Array`:

```ts
const writeData = Buffer.from("", 'utf8');
vscode.workspace.fs.writeFile(fileUri, writeData);
```

Some possible approaches to generating the file data include :

- Replay the edits since the last save to generate a new file.
- Always track the resources current state.
- Ask a `WebviewPanel` for the custom editor for file data to save.

Remember that custom editors can be saved even when they are not visible. We recommend that your implementation of `save` does not depend on a `WebviewPanel`. If this is not possible, you can use the `WebviewPanelOptions.retainContextWhenHidden` setting so that the webview stays alive even when it is hidden. Keep in mind however that `retainContextWhenHidden` has significant memory overhead.

### Backup

TODO


## Next steps

If you'd like to learn more about VS Code extensibility, try these topics:

- [Extension API](/api) - Learn about the full VS Code Extension API.
- [Extension Capabilities](/api/extension-capabilities/overview) - Take a look at other ways to extend VS Code.
