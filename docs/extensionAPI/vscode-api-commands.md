---
Order: 6
Area: extensionapi
TOCTitle: API complex commands
ContentId: A010AEDF-EF37-406E-96F5-E129408FFDE1
PageTitle: Visual Studio Code Commands API Reference
DateApproved: 4/14/2016
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
* _(returns)_ A promise that resolves to SignatureHelp.


`vscode.executeDocumentSymbolProvider` - Execute document symbol provider.

* _uri_ Uri of a text document
* _(returns)_ A promise that resolves to an array of SymbolInformation-instances.


`vscode.executeCompletionItemProvider` - Execute completion item provider.

* _uri_ Uri of a text document
* _position_ Position in a text document
* _(returns)_ A promise that resolves to a CompletionList-instance.


`vscode.executeCodeActionProvider` - Execute code action provider.

* _uri_ Uri of a text document
* _range_ Range in a text document
* _(returns)_ A promise that resolves to an array of CompletionItem-instances.


`vscode.executeCodeLensProvider` - Execute completion item provider.

* _uri_ Uri of a text document
* _(returns)_ A promise that resolves to an array of Commands.


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


`vscode.previewHtml` - Preview an html document.

* _uri_ Uri of the document to preview.
* _column_ (optional) Column in which to preview.



`editor.action.showReferences` - Show references at a position in a file

* _uri_ The text document in which to show references
* _position_ The position at which to show
* _locations_ An array of locations.
