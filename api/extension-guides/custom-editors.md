---
# DO NOT TOUCH — Managed by doc writer
ContentId: 6eb86aa4-0f4c-4168-b34a-6ec6b204e960
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Use the Custom Editor API to create customizable editors within Visual Studio Code.
---

# Custom Editor API

Custom editors allow extensions to create fully customizable read/write editors that are used in place of VS Code's standard text editor for specific types of resources. They have a wide variety of use cases, such as:

- Previewing assets, such as shaders or 3D models, directly in VS Code.
- Creating WYSIWYG editors for languages such as Markdown or XAML.
- Offering alternative visual renderings for data files such as CSV or JSON or XML.
- Building fully customizable editing experiences for binary or text files.

This document provides an overview of the custom editor API and the basics of implementing a custom editor. We'll take a look at the two types of custom editors and how they differ, as well as which one is right for your use case. Then for each of these custom editor types, we'll cover the basics of building a well behaved custom editor.

Although custom editors are a powerful new extension point, implementing a basic custom editor is not actually that difficult! Still, if you are working on your first VS Code extension, you may want to consider holding off on diving into custom editors until you are more familiar with the basics of the VS Code API. Custom editors build on a lot of VS Code concepts—such as [webviews](/api/extension-guides/webview) and text documents—so it may be a bit overwhelming if you are learning all of these new ideas at the same time.

But if you're feeling ready and are thinking about all the cool custom editors you are going to build, then let's get started! Be sure to download the [custom editor extension sample][sample] so you can follow along with the documentation and see how the custom editor API comes together.

## Links

- [Custom Editor sample][sample]

### VS Code API Usage

- [`window.registerCustomEditorProvider`](/api/references/vscode-api#window.registerCustomEditorProvider)
- [`CustomTextEditorProvider`](/api/references/vscode-api#CustomTextEditorProvider)

## Custom Editor API basics

A custom editor is an alternative view that is shown in place of VS Code's standard text editor for specific resources. There are two parts to a custom editor: the view that users interact with and the document model that your extension uses to interact with the underlying resource.

The view side of a custom editor is implemented using a [webview](/api/extension-guides/webview). This lets you build the user interface of your custom editor using standard HTML, CSS, and JavaScript. Webviews cannot access the VS Code API directly but they can talk with extensions by passing messages back and forth. Check out our [webview documentation](/api/extension-guides/webview) for more information on webviews and best practices for working with them.

The other part of a custom editor is the document model. This model is how your extension understands the resource (file) it is working with. A `CustomTextEditorProvider` uses VS Code's standard [TextDocument](/api/references/vscode-api#TextDocument) as its document model and all changes to the file are expressed using VS Code's standard text editing APIs. `CustomReadonlyEditorProvider` and `CustomEditorProvider` on the other hand let you provide your own document model, which lets them be used for non-text file formats.

Custom editors have a single document model per resource but there may be multiple editor instances (views) of this document. For example, imagine that you open a file that has a `CustomTextEditorProvider` and then run the **View: Split editor** command. In this case, there is still just a single `TextDocument` since there is still just a single copy of the resource in the workspace,  but there are now two webviews for that resource.

### `CustomEditor` vs `CustomTextEditor`

There are two classes of custom editors: custom text editors and custom editors. The main difference between these is how they define their document model.

A `CustomTextEditorProvider` uses VS Code's standard [`TextDocument`](https://code.visualstudio.com/api/references/vscode-api#TextDocument) as its data model. You can use a `CustomTextEditor` for any text based file types. `CustomTextEditor` are considerably easier to implement because VS Code already knows how to work with text files and can therefore implement operations such as save and backing up files for hot exit.

With a `CustomEditorProvider` on the other hand, your extension brings its own document model. This means that you can use a `CustomEditor` for binary formats such as images, but it also means that your extension is responsible for a lot more, including implementing save and backing. You can skip over much of this complexity if your custom editor is readonly, such as custom editors for previews.

When trying to decide which type of custom editor to use, the decision is usually simple: if you are working with a text based file format use `CustomTextEditorProvider`, for binary file formats use `CustomEditorProvider`.

### Contribution point

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

- `viewType` - Unique identifier for your custom editor.

    This is how VS Code ties a custom editor contribution in the `package.json` to your custom editor implementation in code. This must be unique across all extensions, so instead of a generic `viewType` such as `"preview"` make sure to use one that is unique to your extension, for example `"viewType": "myAmazingExtension.svgPreview"`

- `displayName` - Name that identifies the custom editor in VS Code's UI.

    The display name is shown to the user in VS Code UI such as the **View: Reopen with** dropdown.

- `selector` - Specifies which files a custom editor is active for.

    The `selector` is an array of one or more glob patterns. These glob patterns are matched against file names to determine if the custom editor can be used for them. A `filenamePattern` such as `*.png` will enable the custom editor for all PNG files.

    You can also create more specific patterns that match on file or directory names, for example `**/translations/*.json`.

- `priority` - (optional) Specifies when the custom editor is used.

    `priority` controls when a custom editor is used when a resource is open. Possible values are:

    - `"default"` - Try to use the custom editor for every file that matches the custom editor's `selector`. If there are multiple custom editors for a given file, the user will have to select which custom editor they want to use.
    - `"option"` - Do not use the custom editor by default but allow users to switch to it or configure it as their default.

### Custom editor activation

When a user opens one of your custom editors, VS Code fires an `onCustomEditor:VIEW_TYPE` activation event. During activation, your extension must call `registerCustomEditorProvider` to register a custom editor with the expected `viewType`.

It's important to note that `onCustomEditor` is only called when VS Code needs to create an instance of your custom editor. If VS Code is merely showing the user some information about an available custom editor—such as with the **View: Reopen with** command—your extension will not be activated.

## Custom Text Editor

Custom text editors let you create custom editors for text files. This can be anything from plain unstructured text to [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) to JSON or XML. Custom text editors use VS Code's standard [TextDocument](/api/references/vscode-api#TextDocument) as their document model.

The [custom editor extension sample][sample] includes a simple example custom text editor for cat scratch files (which are just JSON files that end with a `.cscratch` file extension). Let's take a look at some of the important bits of implementing a custom text editor.

### Custom Text Editor lifecycle

VS Code handles the lifecycle of both the view component of custom text editors (the webviews) and the model component (`TextDocument`). VS Code calls out to your extension when it needs to create a new custom editor instance and cleans up the editor instances and document model when the user closes their tabs.

To understand how this all works in practice, let's work through what happens from an extension's point of view when a user opens a custom text editor and then when a user closes a custom text editor.

**Opening a custom text editor**

Using the [custom editor extension sample][sample], here's what happens when the user first opens a `.cscratch` file:

1. VS Code fires an `onCustomEditor:catCustoms.catScratch` activation event.

    This activates our extension if it has not already been activated. During activation, our extension must ensure the extension registers a `CustomTextEditorProvider` for `catCustoms.catScratch` by calling `registerCustomEditorProvider`.

1. VS Code then invokes `resolveCustomTextEditor` on the registered `CustomTextEditorProvider` for `catCustoms.catScratch`.

    This method takes the `TextDocument` for the resource that is being opened and a `WebviewPanel`. The extension must fill in the initial HTML contents for this webview panel.

Once `resolveCustomTextEditor` returns, our custom editor is displayed to the user. What is drawn inside the webview is entirely up to our extension.

This same flow happens every time a custom editor is opened, even when you split a custom editor. Every instance of a custom editor has its own `WebviewPanel`, although multiple custom text editors will share the same `TextDocument` if they are for the same resource. Remember: think of the `TextDocument` as being the model for the resource while the webview panels are views of that model.

**Closing custom text editors**

When a user closes a custom text editor, VS Code fires the `WebviewPanel.onDidDispose` event on the `WebviewPanel`. At this point, your extension should clean up any resources associated with that editor (event subscriptions, file watchers, etc.)

When the last custom editor for a given resource is closed, the `TextDocument` for that resource will also be disposed provided there are no other editors using it and no other extensions are holding onto it. You can check the `TextDocument.isClosed` property to see if the `TextDocument` has been closed. Once a `TextDocument` is closed, opening the same resource using a custom editor will cause a new `TextDocument` to be opened.

### Synchronizing changes with the TextDocument

Since custom text editors use a `TextDocument` as their document model, they are responsible for updating the `TextDocument` whenever an edit occurs in a custom editor as well as updating themselves whenever the `TextDocument` changes.

**From webview to `TextDocument`**

Edits in custom text editors can take many different forms—clicking a button, changing some text, dragging some items around. Whenever a user edits the file itself inside the custom text editor, the extension must update the `TextDocument`. Here's how the cat scratch extension implements this:

1. User clicks the **Add scratch** button in the webview. This [posts a message](/api/extension-guides/webview#scripts-and-message-passing) from the webview back to the extension.

1. The extension receives the message. It then updates its internal model of the document (which in the cat scratch example just consists of adding a new entry to the JSON).

1. The extension creates a `WorkspaceEdit` that writes the updated JSON to the document. This edit is applied using `vscode.workspace.applyEdit`.

Try to keep your workspace edit to the minimal change required to update the document. Also keep in mind that if you are working with a language such as JSON, your extension should try to observe the user's existing formatting conventions (spaces vs tabs, indent size, etc.).

**From `TextDocument` to webviews**

When a `TextDocument` changes, your extension also needs to make sure its webviews reflect the documents new state. TextDocuments can be changed by user actions such as undo, redo, or revert file; by other extensions using a `WorkspaceEdit`; or by a user who opens the file in VS Code's default text editor. Here's how the cat scratch extension implements this:

1. In the extension, we subscribe to the `vscode.workspace.onDidChangeTextDocument` event. This event is fired for every change to the `TextDocument` (including changes that our custom editor makes!)

1. When a change comes in for a document that we have an editor for, we post a message to the webview with its new document state. This webview then updates itself to render the updated document.

It's important to remember that any file edits that a custom editor triggers will cause `onDidChangeTextDocument` to fire. Make sure your extension does not get into an update loop where the user makes an edit in the webview, which fires onDidChangeTextDocument, which causes the webview to update, which causes the webview to trigger another update on your extension, which fires `onDidChangeTextDocument`, and so on.

Also remember that if you are working with a structured language such as JSON or XML, the document may not always be in a valid state. Your extension must either be able gracefully handle errors or display an error message to the user so that they understand what is wrong and how to fix it.

Finally, if updating your webviews is expensive, consider [debouncing](https://davidwalsh.name/javascript-debounce-function) the updates to your webview.

## Custom Editor

`CustomEditorProvider` and `CustomReadonlyEditorProvider` let you create custom editors for binary file formats. This API gives your full control over the file is displayed to users, how edits are made to it, and lets your extension hook into `save` and other file operations. Again, if you are building an editor for a text based file format, strongly consider using a [`CustomTextEditor`](#custom-text-editor) instead as they are far simpler to implement.

The [custom editor extension sample][sample] includes a simple example custom binary editor for paw draw files (which are just jpeg files that end with a `.pawdraw` file extension). Let's take a look at what goes into building a custom editor for binary files.

### CustomDocument

With custom editors, your extension is responsible for implementing its own document model with the `CustomDocument` interface. This leaves your extension free to store whatever data it needs on a `CustomDocument` in order to your custom editor, but it also means that your extension must implement basic document operations such as saving and backing up file data for hot exit.

There is one `CustomDocument` per opened file. Users can open multiple editors for a single resource—such as by splitting the current custom editor—but all those editors will be backed by the same `CustomDocument`.

### Custom Editor lifecycle

**supportsMultipleEditorsPerDocument**

By default, VS Code only allows there to be one editor for each custom document. This limitation makes it easier to correctly implement a custom editor as you do not have to worry about synchronizing multiple custom editor instances with each other.

If your extension can support it however, we recommend setting `supportsMultipleEditorsPerDocument: true` when registering your custom editor so that multiple editor instances can be opened for the same document. This will make your custom editors behave more like VS Code's normal text editors.

**Opening Custom Editors**
When the user opens a file that matches the `customEditor` contribution point, VS Code fires an `onCustomEditor` [activation event](/api/references/activation-events) and then invokes the provider registered for the provided view type. A `CustomEditorProvider` has two roles: providing the document for the custom editor and then providing the editor itself. Here's a ordered list of what happens for the `catCustoms.pawDraw` editor from the [custom editor extension sample][sample]:

1. VS Code fires an `onCustomEditor:catCustoms.pawDraw` activation event.

    This activates our extension if it has not already been activated. We must also make sure our extension registers a `CustomReadonlyEditorProvider` or `CustomEditorProvider` for `catCustoms.pawDraw` during activation.

1. VS Code calls `openCustomDocument` on our `CustomReadonlyEditorProvider` or `CustomEditorProvider` registered for `catCustoms.pawDraw` editors.

    Here our extension is given a resource uri and must return a new `CustomDocument` for that resource. This is the point at which our extension should create its document internal model for that resource. This may involve reading and parsing the initial resource state from disk or initializing our new `CustomDocument`.

    Our extension can define this model by creating a new class that implements `CustomDocument`. Remember that this initialization stage is entirely up to extensions; VS Code does not care about any additional information extensions store on a `CustomDocument`.

1. VS Code calls `resolveCustomEditor` with the `CustomDocument` from step 2 and a new `WebviewPanel`.

    Here our extension must fill in the initial html for the custom editor. If we need, we can also hold onto a reference to the `WebviewPanel` so that we can reference it later, for example inside commands.

Once `resolveCustomEditor` returns, our custom editor is displayed to the user.

If the user opens the same resource in another editor group using our custom editor—for example by splitting the first editor—the extension's job is simplified. In this case, VS Code just calls `resolveCustomEditor` with the same `CustomDocument` we created when the first editor was opened.

**Closing Custom Editors**

Say we have two instance of our custom editors open for the same resource. When the user closes these editors, VS Code signals our extension so that it can clean up any resources associated with the editor.

When the first editor instance is closed, VS Code fires the `WebviewPanel.onDidDispose` event on the `WebviewPanel` from the closed editor. At this point, our extension must clean up any resources associated with that specific editor instance.

When the second editor is closed, VS Code again fires `WebviewPanel.onDidDispose`. However now we've also closed all the editors associated with the `CustomDocument`. When there are no more editors for a `CustomDocument`, VS Code calls the `CustomDocument.dispose` on it. Our extension's implementation of `dispose` must clean up any resources associated with the document.

If the user then reopens the same resource using our custom editor, we will go back through the whole `openCustomDocument`, `resolveCustomEditor` flow with a new `CustomDocument`.

### Readonly Custom editors

Many of the following sections only apply to custom editors that support editing and, while it may sound paradoxical, many custom editors don't require editing capabilities at all. Consider a image preview for example. Or a visual rendering of a memory dump. Both can be implemented using custom editors but neither need to be editable. That's where `CustomReadonlyEditorProvider` comes in.

A `CustomReadonlyEditorProvider` lets you create custom editors that do not support editing. They can still be interactive but don't support operations such as undo and save. It is also much simpler to implement a readonly custom editor compared to a fully editable one.

### Editable Custom Editor Basics

Editable custom editors let you hook in to standard VS Code operations such as undo and redo, save, and hot exit. This makes editable custom editors very powerful, but also means that properly implementing is much more complex than implementing an editable custom text editor or a readonly custom editor.

Editable custom editors are implemented by `CustomEditorProvider`. This interface extends `CustomReadonlyEditorProvider`, so you'll have to implement basic operations such as `openCustomDocument` and `resolveCustomEditor`, along with a set of editing specific operations. Let's take a look at the editing specific parts of `CustomEditorProvider`.

**Edits**

Changes to a editable custom document are expressed through edits. An edit can be anything from a text change, to an image rotation, to reordering a list. VS Code leaves the specifics of what an edit does entirely up to your extension, but VS Code does need to know when an edit takes places. Editing is how VS Code marks documents as dirty, which in turn enables auto save and back ups.

Whenever a user makes an edit in any of the webviews for your custom editor, your extension must fire a `onDidChangeCustomDocument` event from its `CustomEditorProvider`. The `onDidChangeCustomDocument` event can fired two event types depending on your custom editor implementation: `CustomDocumentContentChangeEvent` and `CustomDocumentEditEvent`.

**CustomDocumentContentChangeEvent**

A `CustomDocumentContentChangeEvent` is a bare-bones edit. It's only function is to tell VS Code that a document has been edited.

When an extension fires a `CustomDocumentContentChangeEvent` from `onDidChangeCustomDocument`, VS Code will mark the associated document as being dirty. At this point, the only way for the document to become non-dirty is for the user to either save or revert it. Custom editors that use `CustomDocumentContentChangeEvent` do not support undo/redo.

**CustomDocumentEditEvent**

A `CustomDocumentEditEvent` is a more complex edit that allows for undo/redo. You should always try to implement your custom editor using `CustomDocumentEditEvent` and only fallback to using `CustomDocumentContentChangeEvent` if implementing undo/redo is not possible.

A `CustomDocumentEditEvent` has the following fields:

- `document` — The `CustomDocument` the edit was for.
- `label` — Optional text that that describes what type of edit was made (for example: "Crop", "Insert", ...)
- `undo` — Function invoked by VS Code when the edit needs to be undone.
- `redo` — Function invoked by VS Code when the edits needs to be redone.

When an extension fires a `CustomDocumentEditEvent` from `onDidChangeCustomDocument`, VS Code marks the associated document as being dirty. To make the document no longer dirty, a user can then either save or revert the document, or undo/redo back to the document's last saved state.

The `undo` and `redo` methods on an editor are called by VS Code when that specific edits needs to be undone or reapplied. VS Code maintains an internal stack of edits, so if your extension fires `onDidChangeCustomDocument` with three edits, let's call them `a`, `b`, `c`:

```ts
onDidChangeCustomDocument(a);
onDidChangeCustomDocument(b);
onDidChangeCustomDocument(c);
```

The following sequence of user actions results in these calls:

```
undo — c.undo()
undo — b.undo()
redo — b.redo()
redo — c.redo()
redo — no op, no more edits
```

To implement undo/redo, your extension must update it's associated custom document's internal state, as well as updating all associated webviews for the document so that they reflect the document's new state. Keep in mind that there may be multiple webviews for a single resource. These must always show the same document data. Multiple instances of an image editor for example must always show the same pixel data but may allow each editor instance to have its own zoom level and UI state.

### Saving

When a user saves a custom editor, your extension is responsible for writing the saved resource in its current state to disk. How your custom editor does this depends largely on your extension's `CustomDocument` type and how your extension tracks edits internally.

The first step to saving is getting the data stream to write to disk. Common approaches to this include:

- Track the resource's state so that it can be quickly serialized.

    A basic image editor for example may maintain a buffer of pixel data.

- Replay edit since the last save to generate the new file.

    A more efficient image editor for example might track the edits since the last save, such as `crop`, `rotate`, `scale`. On save, it would then apply these edits to file's last saved state to generate the new file.

- Ask a `WebviewPanel` for the custom editor for file data to save.

    Keep in mind though that custom editors can be saved even when they are not visible. For this reason, it is recommended that that your extension's implementation of `save` does not depend on a `WebviewPanel`. If this is not possible, you can use the `WebviewPanelOptions.retainContextWhenHidden` setting so that the webview stays alive even when it is hidden. `retainContextWhenHidden` does have significant memory overhead so be conservative about using it.

After getting the data for the resource, you generally should use the [workspace FS api](https://code.visualstudio.com/api/references/vscode-api#FileSystem) to write it to disk. The FS APIs take a `UInt8Array` of data and can write out both binary and text based files. For binary file data, simply put the binary data into the `UInt8Array`. For text file data, use `Buffer` to convert a string into a `UInt8Array`:

```ts
const writeData = Buffer.from("my text data", 'utf8');
vscode.workspace.fs.writeFile(fileUri, writeData);
```

## Next steps

If you'd like to learn more about VS Code extensibility, try these topics:

- [Extension API](/api) - Learn about the full VS Code Extension API.
- [Extension Capabilities](/api/extension-capabilities/overview) - Take a look at other ways to extend VS Code.

[sample]: https://github.com/microsoft/vscode-extension-samples/tree/main/custom-editor-sample
