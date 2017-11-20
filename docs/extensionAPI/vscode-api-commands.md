---
Order: 7
Area: extensionapi
TOCTitle: Complex Commands
ContentId: A010AEDF-EF37-406E-96F5-E129408FFDE1
PageTitle: Visual Studio Code Complex Commands Reference
DateApproved: 11/8/2017
MetaDescription: Visual Studio Code extensions (plug-ins) complex commands Reference.
---
# Complex Commands

This document lists the set of Visual Studio Code complex commands. They are called complex commands because they require parameters and often return a value. You can use the commands in conjunction with the `executeCommand` API.

The following is a sample of how to preview a HTML document:

```javascript
let uri = Uri.parse('file:///some/path/to/file.html');
let success = await commands.executeCommand('vscode.previewHtml', uri);
```

## Commands

`vscode.executeWorkspaceSymbolProvider` - Execute all workspace symbol provider.

* _query_ Search string
* _(returns)_ A promise that resolves to an array of SymbolInformation-instances.


`vscode.executeDefinitionProvider` - Execute all definition provider.

* _uri_ Uri of a text document
* _position_ Position of a symbol
* _(returns)_ A promise that resolves to an array of Location-instances.


`vscode.executeImplementationProvider` - Execute all implementation providers.

* _uri_ Uri of a text document
* _position_ Position of a symbol
* _(returns)_ A promise that resolves to an array of Location-instance.


`vscode.executeHoverProvider` - Execute all hover provider.

* _uri_ Uri of a text document
* _position_ Position of a symbol
* _(returns)_ A promise that resolves to an array of Hover-instances.


`vscode.executeDocumentHighlights` - Execute document highlight provider.

* _uri_ Uri of a text document
* _position_ Position in a text document
* _(returns)_ A promise that resolves to an array of DocumentHighlight-instances.


`vscode.executeReferenceProvider` - Execute reference provider.

* _uri_ Uri of a text document
* _position_ Position in a text document
* _(returns)_ A promise that resolves to an array of Location-instances.


`vscode.executeDocumentRenameProvider` - Execute rename provider.

* _uri_ Uri of a text document
* _position_ Position in a text document
* _newName_ The new symbol name
* _(returns)_ A promise that resolves to a WorkspaceEdit.


`vscode.executeSignatureHelpProvider` - Execute signature help provider.

* _uri_ Uri of a text document
* _position_ Position in a text document
* _triggerCharacter_ (optional) Trigger signature help when the user types the character, like `,` or `(`
* _(returns)_ A promise that resolves to SignatureHelp.


`vscode.executeDocumentSymbolProvider` - Execute document symbol provider.

* _uri_ Uri of a text document
* _(returns)_ A promise that resolves to an array of SymbolInformation-instances.


`vscode.executeCompletionItemProvider` - Execute completion item provider.

* _uri_ Uri of a text document
* _position_ Position in a text document
* _triggerCharacter_ (optional) Trigger completion when the user types the character, like `,` or `(`
* _(returns)_ A promise that resolves to a CompletionList-instance.


`vscode.executeCodeActionProvider` - Execute code action provider.

* _uri_ Uri of a text document
* _range_ Range in a text document
* _(returns)_ A promise that resolves to an array of Command-instances.


`vscode.executeCodeLensProvider` - Execute CodeLens provider.

* _uri_ Uri of a text document
* _(returns)_ A promise that resolves to an array of CodeLens-instances.


`vscode.executeFormatDocumentProvider` - Execute document format provider.

* _uri_ Uri of a text document
* _options_ Formatting options
* _(returns)_ A promise that resolves to an array of TextEdits.


`vscode.executeFormatRangeProvider` - Execute range format provider.

* _uri_ Uri of a text document
* _range_ Range in a text document
* _options_ Formatting options
* _(returns)_ A promise that resolves to an array of TextEdits.


`vscode.executeFormatOnTypeProvider` - Execute document format provider.

* _uri_ Uri of a text document
* _position_ Position in a text document
* _ch_ Character that got typed
* _options_ Formatting options
* _(returns)_ A promise that resolves to an array of TextEdits.


`vscode.executeLinkProvider` - Execute document link provider.

* _uri_ Uri of a text document
* _(returns)_ A promise that resolves to an array of DocumentLink-instances.


`vscode.previewHtml` - Render the HTML of the resource in an editor view.

* _uri_ Uri of the resource to preview.
* _column_ (optional) Column in which to preview.
* _label_ (optional) An human readable string that is used as title for the preview.
* _options_ (optional) Options for controlling webview environment.

See [working with the HTML preview](/docs/extensionAPI/vscode-api-commands.md#working-with-the-html-preview) for more information about the HTML preview's integration with the editor and for best practices for extension authors.


`vscode.openFolder` - Open a folder in the current window or new window depending on the newWindow argument. Note that opening in the same window will shutdown the current extension host process and start a new one on the given folder unless the newWindow parameter is set to true.

* _uri_ (optional) Uri of the folder to open. If not provided, a native dialog will ask the user for the folder
* _newWindow_ (optional) Whether to open the folder in a new window or the same. Defaults to opening in the same window.


`vscode.diff` - Opens the provided resources in the diff editor to compare their contents.

* _left_ Left-hand side resource of the diff editor
* _right_ Right-hand side resource of the diff editor
* _title_ (optional) Human readable title for the diff editor
* _options_ (optional) Editor options, see vscode.TextDocumentShowOptions


`vscode.open` - Opens the provided resource in the editor. Can be a text or binary file, or a http(s) url. If you need more control over the options for opening a text file, use vscode.window.showTextDocument instead.

* _resource_ Resource to open
* _column_ (optional) Column in which to open


`cursorMove` - Move cursor to a logical position in the view

* _Cursor move argument object_

  Property-value pairs that can be passed through this argument:

  * 'to': A mandatory logical position value providing where to move the cursor.
    ```
    'left', 'right', 'up', 'down'
    'wrappedLineStart', 'wrappedLineEnd', 'wrappedLineColumnCenter'
    'wrappedLineFirstNonWhitespaceCharacter', 'wrappedLineLastNonWhitespaceCharacter'
    'viewPortTop', 'viewPortCenter', 'viewPortBottom', 'viewPortIfOutside'
    ```
  * 'by': Unit to move. Default is computed based on 'to' value.
    ```
    'line', 'wrappedLine', 'character', 'halfLine'
    ```
  * 'value': Number of units to move. Default is '1'.
  * 'select': If 'true' makes the selection. Default is 'false'.


`editorScroll` - Scroll editor in the given direction

* _Editor scroll argument object_

  Property-value pairs that can be passed through this argument:

  * 'to': A mandatory direction value.
    ```
    'up', 'down'
    ```
  * 'by': Unit to move. Default is computed based on 'to' value.
    ```
    'line', 'wrappedLine', 'page', 'halfPage'
    ```
  * 'value': Number of units to move. Default is '1'.
  * 'revealCursor': If 'true' reveals the cursor if it is outside view port.


`revealLine` - Reveal the given line at the given logical position

* _Reveal line argument object_

  Property-value pairs that can be passed through this argument:

  * 'lineNumber': A mandatory line number value.
  * 'at': Logical position at which line has to be revealed .
    ```
    'top', 'center', 'bottom'
    ```


`editor.unfold` - Unfold the content in the editor

* _Unfold editor argument_

  Property-value pairs that can be passed through this argument:

  * 'level': Number of levels to unfold. If not set, defaults to 1.
  * 'direction': If 'up', unfold given number of levels up otherwise unfolds down.
  * 'selectionLines': The start lines (0-based) of the editor selections to apply the unfold action to. If not set, the active selection(s) will be used.


`editor.fold` - Fold the content in the editor

* _Fold editor argument_

  Property-value pairs that can be passed through this argument:

  * 'levels': Number of levels to fold. Defaults to 1.
  * 'direction': If 'up', folds given number of levels up otherwise folds down.
  * 'selectionLines': The start lines (0-based) of the editor selections to apply the fold action to. If not set, the active selection(s) will be used.


`editor.action.showReferences` - Show references at a position in a file

* _uri_ The text document in which to show references
* _position_ The position at which to show
* _locations_ An array of locations.


`moveActiveEditor` - Move the active editor by tabs or groups

* _Active editor move argument_

  Argument Properties:

  * 'to': String value providing where to move.
  * 'by': String value providing the unit for move. By tab or by group.
  * 'value': Number value providing how many positions or an absolute position to move.

## Working With the HTML Preview

### Styling

The body element of the displayed HTML is dynamically annotated with one of the following CSS classes in order to communicate the kind of color theme VS Code is currently using: `vscode-light`, `vscode-dark`, or `vscode-high-contrast`.

### Links

Links contained in the document will be handled by VS Code whereby it supports `file`-resources and [virtual](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L3295) resources as well as triggering commands using the `command` scheme. Use the query part of a command-uri to pass along JSON encoded arguments. Note that URL encoding must be applied.

The snippet below defines a command link that calls the _previewHtml_ command and passes along an URI:

```javascript
  let href = encodeURI('command:vscode.previewHtml?' + JSON.stringify(someUri));
  let html = '<a href="' + href + '">Show Resource...</a>.';
```

### Security Tips

As an extension author, if you use an HTML preview, you are responsible for protecting users from potentially malicious content. The primary danger is that an attacker could craft a malicious workspace that uses your HTML preview to execute scripts or perform other insecure activities. In addition to normal web security best practices, here are a few specific tips and tricks to help protect users.

### Sanitizing Content

As a first line of defense, when constructing an HTML document for the preview, make sure to appropriately sanitize all input that comes from workspace settings or from files on a user's system. For HTML content, consider using a whitelist of safe tags and attributes. Libraries such as [sanitize-html](https://www.npmjs.com/package/sanitize-html) can help with this.

### Disabling Scripts

If your preview does not need to execute JavaScript, you can further enhance security by disabling script execution entirely. One way to accomplish this is by loading untrusted content inside of an `iframe`  with the `sandbox` attribute set. In this case, the content would be loaded using the `srcdoc` attribute:

```html
<iframe sandbox srcdoc="<!DOCTYPE html>..."></iframe>
```

If your preview still needs to load some local resources such as images, try using `sandbox="allow-same-origin"` instead:

```html
<iframe sandbox="allow-same-origin" srcdoc="<!DOCTYPE html>..."></iframe>
```

`sandbox="allow-same-origin"` disables script execution inside the `iframe` but allows loading resources from a user's system, such as stylesheets and images. In general, it is best to disable access to local resources unless your preview absolutely needs it.

### Using a Content Security Policy

If your preview's functionality depends on scripts, consider disabling scripts that come from untrusted user content using a [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). Content security policy allow fine grained control over which resources may be loaded.

For example, here's a content security policy that allows images from anywhere, allows stylesheets from a user's local system, and disables all scripts:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src *; style-src 'self'; script-src 'none';">
  <title>...</title>
</head>
<body>
  Content
</body>
</html>
```

To selectively enable scripts, the best approach for the HTML preview is to use a dynamically generated [nonce](https://developers.google.com/web/fundamentals/security/csp/) to whitelist certain trusted scripts:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src *; style-src 'self'; script-src 'nonce-123456';">
  <title>...</title>
</head>
<body>
  Content
  <script nonce="123456" src="file:///path/to/extension/my_trusted_script.js"></script>
</body>
</html>
```
