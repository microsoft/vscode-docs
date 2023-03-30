---
# DO NOT TOUCH — Managed by doc writer
ContentId: A010AEDF-EF37-406E-96F5-E129408FFDE1
DateApproved: 3/30/2023

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Visual Studio Code built-in commands reference.
---

# Built-in Commands

This document lists a subset of Visual Studio Code commands that you might use with `vscode.commands.executeCommand` API.

Read the [Commands guide](/api/extension-guides/command) for how to use the commands API.

The following is a sample of how to open a new folder in VS Code:

```javascript
let uri = Uri.file('/some/path/to/folder');
let success = await commands.executeCommand('vscode.openFolder', uri);
```

>**Note**: You can review the full set of VS Code commands via the Keyboard Shortcuts editor **File** > **Preferences** > **Keyboard Shortcuts** (on macOS **Code** > **Preferences** > **Keyboard Shortcuts**). The Keyboard Shortcuts editor lists all commands built into VS Code or contributed by extensions, along with their keybindings and visibility when clauses.

## Commands

`vscode.executeDocumentHighlights` - Execute document highlight provider.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of DocumentHighlight-instances.

`vscode.executeDocumentSymbolProvider` - Execute document symbol provider.

* _uri_ - Uri of a text document
* _(returns)_ - A promise that resolves to an array of SymbolInformation and DocumentSymbol instances.

`vscode.executeFormatDocumentProvider` - Execute document format provider.

* _uri_ - Uri of a text document
* _options_ - Formatting options
* _(returns)_ - A promise that resolves to an array of TextEdits.

`vscode.executeFormatRangeProvider` - Execute range format provider.

* _uri_ - Uri of a text document
* _range_ - A range in a text document
* _options_ - Formatting options
* _(returns)_ - A promise that resolves to an array of TextEdits.

`vscode.executeFormatOnTypeProvider` - Execute format on type provider.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _ch_ - Trigger character
* _options_ - Formatting options
* _(returns)_ - A promise that resolves to an array of TextEdits.

`vscode.executeDefinitionProvider` - Execute all definition providers.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of Location or LocationLink instances.

`vscode.executeTypeDefinitionProvider` - Execute all type definition providers.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of Location or LocationLink instances.

`vscode.executeDeclarationProvider` - Execute all declaration providers.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of Location or LocationLink instances.

`vscode.executeImplementationProvider` - Execute all implementation providers.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of Location or LocationLink instances.

`vscode.executeReferenceProvider` - Execute all reference providers.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of Location-instances.

`vscode.executeHoverProvider` - Execute all hover providers.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of Hover-instances.

`vscode.executeSelectionRangeProvider` - Execute selection range provider.

* _uri_ - Uri of a text document
* _position_ - Position in a text document
* _(returns)_ - A promise that resolves to an array of ranges.

`vscode.executeWorkspaceSymbolProvider` - Execute all workspace symbol providers.

* _query_ - Search string
* _(returns)_ - A promise that resolves to an array of SymbolInformation-instances.

`vscode.prepareCallHierarchy` - Prepare call hierarchy at a position inside a document

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of CallHierarchyItem-instances

`vscode.provideIncomingCalls` - Compute incoming calls for an item

* _item_ - A call hierarchy item
* _(returns)_ - A promise that resolves to an array of CallHierarchyIncomingCall-instances

`vscode.provideOutgoingCalls` - Compute outgoing calls for an item

* _item_ - A call hierarchy item
* _(returns)_ - A promise that resolves to an array of CallHierarchyOutgoingCall-instances

`vscode.prepareRename` - Execute the prepareRename of rename provider

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_  A promise that resolves to a range and placeholder text.

`vscode.executeDocumentRenameProvider` - Execute rename provider.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _newName_ - The new symbol name
* _(returns)_ - A promise that resolves to a WorkspaceEdit.

`vscode.executeLinkProvider` - Execute document link provider.

* _uri_ - Uri of a text document
* _linkResolveCount_ - (optional) Number of links that should be resolved, only when links are unresolved.
* _(returns)_ - A promise that resolves to an array of DocumentLink-instances.

`vscode.provideDocumentSemanticTokensLegend` - Provide semantic tokens legend for a document

* _uri_ - Uri of a text document
* _(returns)_ - A promise that resolves to SemanticTokensLegend.

`vscode.provideDocumentSemanticTokens` - Provide semantic tokens for a document

* _uri_ - Uri of a text document
* _(returns)_ - A promise that resolves to SemanticTokens.

`vscode.provideDocumentRangeSemanticTokensLegend` - Provide semantic tokens legend for a document range

* _uri_ - Uri of a text document
* _(returns)_ - A promise that resolves to SemanticTokensLegend.

`vscode.provideDocumentRangeSemanticTokens` - Provide semantic tokens for a document range

* _uri_ - Uri of a text document
* _range_ - A range in a text document
* _(returns)_ - A promise that resolves to SemanticTokens.

`vscode.executeCompletionItemProvider` - Execute completion item provider.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _triggerCharacter_ - (optional) Trigger completion when the user types the character, like `,` or `(`
* _itemResolveCount_ - (optional) Number of completions to resolve (too large numbers slow down completions)
* _(returns)_ - A promise that resolves to a CompletionList-instance.

`vscode.executeSignatureHelpProvider` - Execute signature help provider.

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _triggerCharacter_ - (optional) Trigger signature help when the user types the character, like `,` or `(`
* _(returns)_ - A promise that resolves to SignatureHelp.

`vscode.executeCodeLensProvider` - Execute code lens provider.

* _uri_ - Uri of a text document
* _itemResolveCount_ - (optional) Number of lenses that should be resolved and returned. Will only return resolved lenses, will impact performance)
* _(returns)_ - A promise that resolves to an array of CodeLens-instances.

`vscode.executeCodeActionProvider` - Execute code action provider.

* _uri_ - Uri of a text document
* _rangeOrSelection_ - Range in a text document. Some refactoring provider requires Selection object.
* _kind_ - (optional) Code action kind to return code actions for
* _itemResolveCount_ - (optional) Number of code actions to resolve (too large numbers slow down code actions)
* _(returns)_ - A promise that resolves to an array of Command-instances.

`vscode.executeDocumentColorProvider` - Execute document color provider.

* _uri_ - Uri of a text document
* _(returns)_ - A promise that resolves to an array of ColorInformation objects.

`vscode.executeColorPresentationProvider` - Execute color presentation provider.

* _color_ - The color to show and insert
* _context_ - Context object with uri and range
* _(returns)_ - A promise that resolves to an array of ColorPresentation objects.

`vscode.executeInlayHintProvider` - Execute inlay hints provider

* _uri_ - Uri of a text document
* _range_ - A range in a text document
* _(returns)_ - A promise that resolves to an array of Inlay objects

`vscode.resolveNotebookContentProviders` - Resolve Notebook Content Providers

* _(returns)_ - A promise that resolves to an array of NotebookContentProvider static info objects.

`vscode.executeInlineValueProvider` - Execute inline value provider

* _uri_ - Uri of a text document
* _range_ - A range in a text document
* _(returns)_ - A promise that resolves to an array of InlineValue objects

`vscode.open` - Opens the provided resource in the editor. Can be a text or binary file, or an http(s) URL. If you need more control over the options for opening a text file, use vscode.window.showTextDocument instead.

* _uri_ - Uri of a text document
* _columnOrOptions_ - (optional) Either the column in which to open or editor options, see vscode.TextDocumentShowOptions
* _label_ - (optional)
* _(returns)_ - no result

`vscode.openWith` - Opens the provided resource with a specific editor.

* _resource_ - Resource to open
* _viewId_ - Custom editor view id or 'default' to use VS Code's default editor
* _columnOrOptions_ - (optional) Either the column in which to open or editor options, see vscode.TextDocumentShowOptions
* _(returns)_ - no result

`vscode.diff` - Opens the provided resources in the diff editor to compare their contents.

* _left_ - Left-hand side resource of the diff editor
* _right_ - Right-hand side resource of the diff editor
* _title_ - (optional) Human readable title for the diff editor
* _columnOrOptions_ - (optional) Either the column in which to open or editor options, see vscode.TextDocumentShowOptions
* _(returns)_ - no result

`vscode.prepareTypeHierarchy` - Prepare type hierarchy at a position inside a document

* _uri_ - Uri of a text document
* _position_ - A position in a text document
* _(returns)_ - A promise that resolves to an array of TypeHierarchyItem-instances

`vscode.provideSupertypes` - Compute supertypes for an item

* _item_ - A type hierarchy item
* _(returns)_ - A promise that resolves to an array of TypeHierarchyItem-instances

`vscode.provideSubtypes` - Compute subtypes for an item

* _item_ - A type hierarchy item
* _(returns)_ - A promise that resolves to an array of TypeHierarchyItem-instances

`vscode.revealTestInExplorer` - Reveals a test instance in the explorer

* _testItem_ - A VS Code TestItem.

`vscode.removeFromRecentlyOpened` - Removes an entry with the given path from the recently opened list

* _path_ - Path to remove from recently opened.

`vscode.openIssueReporter` - Opens the issue reporter with the provided extension id as the selected source

* _extensionId_ - extensionId to report an issue on

`cursorMove` - Move cursor to a logical position in the view

* _Cursor move argument object_ - Property-value pairs that can be passed through this argument:
  * 'to': A mandatory logical position value providing where to move the cursor.
    ```
    'left', 'right', 'up', 'down', 'prevBlankLine', 'nextBlankLine',
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

* _Editor scroll argument object_ - Property-value pairs that can be passed through this argument:
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

* _Reveal line argument object_ - Property-value pairs that can be passed through this argument:
  * 'lineNumber': A mandatory line number value.
  * 'at': Logical position at which line has to be revealed.
    ```
    'top', 'center', 'bottom'
    ```

`editor.unfold` - Unfold the content in the editor

* _Unfold editor argument_ - Property-value pairs that can be passed through this argument:
  * 'levels': Number of levels to unfold. If not set, defaults to 1.
  * 'direction': If 'up', unfold given number of levels up otherwise unfolds down.
  * 'selectionLines': The start lines (0-based) of the editor selections to apply the unfold action to. If not
  set, the active selection(s) will be used.

`editor.fold` - Fold the content in the editor

* _Fold editor argument_ - Property-value pairs that can be passed through this argument:
  * 'levels': Number of levels to fold.
  * 'direction': If 'up', folds given number of levels up otherwise folds down.
  * 'selectionLines': The start lines (0-based) of the editor selections to apply the fold action to. If not set, the active selection(s) will be used.
  If no levels or direction is set, folds the region at the locations or if already collapsed, the first uncollapsed parent instead.

`editor.action.goToLocations` - Go to locations from a position in a file

* _uri_ - The text document in which to start
* _position_ - The position at which to start
* _locations_ - An array of locations.
* _multiple_ - Define what to do when having multiple results, either `peek`, `gotoAndPeek`, or `goto
* _noResultsMessage_ - Human readable message that shows when locations is empty.

`editor.action.peekLocations` - Peek locations from a position in a file

* _uri_ - The text document in which to start
* _position_ - The position at which to start
* _locations_ - An array of locations.
* _multiple_ - Define what to do when having multiple results, either `peek`, `gotoAndPeek`, or `goto

`workbench.action.quickOpen` - Quick access

* _prefix_ - String value indicating the value to fill into the quick access input field when opening

`moveActiveEditor` - Move the active editor by tabs or groups

* _Active editor move argument_ - Argument Properties:
  * 'to': String value providing where to move.
  * 'by': String value providing the unit for move (by tab or by group).
  * 'value': Number value providing how many positions or an absolute position to move.

`vscode.setEditorLayout` - Sets the editor layout.

* _layout_ - The editor layout to set.

The layout is described as object with an initial (optional) orientation (0 = horizontal, 1 = vertical) and an array of editor groups within. Each editor group can have a size and another array of editor groups that will be laid out orthogonal to the orientation. If editor group sizes are provided, their sum must be 1 to be applied per row or column. Example for a 2x2 grid: `{ orientation: 0, groups: [{ groups: [{}, {}], size: 0.5 }, { groups: [{}, {}], size: 0.5 }] }`

`notebook.cell.execute` - Execute Cell

* _range_ - The cell range
* _uri_ - The document uri

`notebook.cell.cancelExecution` - Stop Cell Execution

* _range_ - The cell range
* _uri_ - The document uri

`notebook.execute` - Execute Notebook

* _uri_ - The document uri

`notebook.cancelExecution` - Cancel Notebook Execution

* _uri_ - The document uri

`notebook.fold` - Fold Cell

* _index_ - The cell index

`notebook.unfold` - Unfold Cell

* _index_ - The cell index

`notebook.selectKernel` - Notebook Kernel Args

* _kernelInfo_ - The kernel info

`search.action.openNewEditor` - Open a new search editor. Arguments passed can include variables like ${relativeFileDirname}.

* _Open new Search Editor args_ -

`search.action.openEditor` - Open a new search editor. Arguments passed can include variables like ${relativeFileDirname}.

* _Open new Search Editor args_ -

`search.action.openNewEditorToSide` - Open a new search editor. Arguments passed can include variables like ${relativeFileDirname}.

* _Open new Search Editor args_ -

`vscode.openFolder` - Open a folder or workspace in the current window or new window depending on the newWindow argument. Note that opening in the same window will shutdown the current extension host process and start a new one on the given folder/workspace unless the newWindow parameter is set to true.

* _uri_ - (optional) Uri of the folder or workspace file to open. If not provided, a native dialog will ask the user for the folder
* _options_ - (optional) Options. Object with the following properties: `forceNewWindow `: Whether to open the folder/workspace in a new window or the same. Defaults to opening in the same window. `noRecentEntry`: Whether the opened URI will appear in the 'Open Recent' list. Defaults to true.  Note, for backward compatibility, options can also be of type boolean, representing the `forceNewWindow` setting.

`workbench.extensions.installExtension` - Install the given extension

* _Extension id or VSIX resource uri_ -

`workbench.extensions.uninstallExtension` - Uninstall the given extension

* _Id of the extension to uninstall_ -

`workbench.extensions.search` - Search for a specific extension

* _Query to use in search_ -

`workbench.action.files.newUntitledFile` - New Untitled File

* _viewType_ - The editor view type

`workbench.action.findInFiles` - Open the search viewlet

* _A set of options for the search viewlet_ -

## Simple commands

Simple commands that do not require parameters can be found in the Keyboard Shortcuts list in the default `keybindings.json` file. The unbound commands are listed in a comment block at the bottom of the file.

To review `keybindings.json`:

Windows, Linux: **File** > **Preferences** > **Keyboard Shortcuts** > `keybindings.json` link

macOS:
**Code** > **Preferences** > **Keyboard Shortcuts** > `keybindings.json` link
