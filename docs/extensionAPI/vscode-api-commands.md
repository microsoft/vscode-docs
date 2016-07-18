---
Order: 6
Area: extensionapi
TOCTitle: API complex commands
ContentId: A010AEDF-EF37-406E-96F5-E129408FFDE1
PageTitle: Visual Studio Code Commands API Reference
DateApproved: 7/7/2016
MetaDescription: Visual Studio Code extensions (plug-ins) complex commands API Reference.  
---

# Complex Commands API

This document lists a set of complex commands that we consider stable. They are called complex commands because they require parameters and often return a value. You can use the commands in conjunction with the `executeCommand` API.

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


`vscode.previewHtml` - Render the html of the resource in an editor view.

Links contained in the document will be handled by VS Code whereby it supports `file`-resources and [virtual](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts#L3295)-resources as well as triggering commands using the `command`-scheme. Use the query part of a command-uri to pass along JSON-encoded arguments - note that URL-encoding must be applied.

The snippet below defines a command-link that calls the _previewHtml_ command and passes along an uri:

```javascript
let href = encodeURI('command:vscode.previewHtml?' + JSON.stringify(someUri));
let html = '<a href="' + href + '">Show Resource...</a>.';
```
				
* _uri_ Uri of the resource to preview.
* _column_ (optional) Column in which to preview.
* _label_ (optional) An human readable string that is used as title for the preview.



`vscode.openFolder` - Open a folder in the current window or new window depending on the newWindow argument. Note that opening in the same window will shutdown the current extension host process and start a new one on the given folder unless the newWindow parameter is set to true.

* _uri_ (optional) Uri of the folder to open. If not provided, a native dialog will ask the user for the folder
* _newWindow_ (optional) Wether to open the folder in a new window or the same. Defaults to opening in the same window.



`vscode.startDebug` - Start a debugging session.

* _configuration_ (optional) Name of the debug configuration from 'launch.json' to use. Or a configuration json object to use.



`vscode.diff` - Opens the provided resources in the diff editor to compare their contents.

* _left_ Left-hand side resource of the diff editor
* _right_ Right-hand side resource of the diff editor
* _title_ (optional) Human readable title for the diff editor



`vscode.open` - Opens the provided resource in the editor. Can be a text or binary file.

* _resource_ Resource to open
* _column_ (optional) Column in which to open



`editor.action.showReferences` - Show references at a position in a file

* _uri_ The text document in which to show references
* _position_ The position at which to show
* _locations_ An array of locations.
