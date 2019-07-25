---
# DO NOT TOUCH — Managed by doc writer
ContentId: A010AEDF-EF37-406E-96F5-E129408FFDE1
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Visual Studio Code built-in commands reference.
---

# Built-in Commands

This document lists a subset of Visual Studio Code commands that you might use with `vscode.commands.executeCommand` API.

Read the [Commands Guide](/api/extension-guides/command) for how to use the commands API.

The following is a sample of how to open a new folder in VS Code:

```javascript
let uri = Uri.file('/some/path/to/folder');
let success = await commands.executeCommand('vscode.openFolder', uri);
```

## Commands

`vscode.executeWorkspaceSymbolProvider` - Execute all workspace symbol provider.

- _query_ - Search string
- _(returns)_ - A promise that resolves to an array of SymbolInformation and DocumentSymbol instances.

`vscode.executeDefinitionProvider` - Execute all definition provider.

- _uri_ - Uri of a text document
- _position_ - Position of a symbol
- _(returns)_ - A promise that resolves to an array of Location instances.

`vscode.executeDeclarationProvider` - Execute all declaration provider.

- _uri_ - Uri of a text document
- _position_ - Position of a symbol
- _(returns)_ - A promise that resolves to an array of Location-instances.

`vscode.executeTypeDefinitionProvider` - Execute all type definition providers.

- _uri_ - Uri of a text document
- _position_ - Position of a symbol
- _(returns)_ - A promise that resolves to an array of Location instances.

`vscode.executeImplementationProvider` - Execute all implementation providers.

- _uri_ - Uri of a text document
- _position_ - Position of a symbol
- _(returns)_ - A promise that resolves to an array of Location instances.

`vscode.executeHoverProvider` - Execute all hover provider.

- _uri_ - Uri of a text document
- _position_ - Position of a symbol
- _(returns)_ - A promise that resolves to an array of Hover instances.

`vscode.executeDocumentHighlights` - Execute document highlight provider.

- _uri_ - Uri of a text document
- _position_ - Position in a text document
- _(returns)_ - A promise that resolves to an array of DocumentHighlight instances.

`vscode.executeReferenceProvider` - Execute reference provider.

- _uri_ - Uri of a text document
- _position_ - Position in a text document
- _(returns)_ - A promise that resolves to an array of Location instances.

`vscode.executeDocumentRenameProvider` - Execute rename provider.

- _uri_ - Uri of a text document
- _position_ - Position in a text document
- _newName_ - The new symbol name
- _(returns)_ - A promise that resolves to a WorkspaceEdit.

`vscode.executeSignatureHelpProvider` - Execute signature help provider.

- _uri_ - Uri of a text document
- _position_ - Position in a text document
- _triggerCharacter_ - (optional) Trigger signature help when the user types the character, like `,` or `(`
- _(returns)_ - A promise that resolves to SignatureHelp.

`vscode.executeDocumentSymbolProvider` - Execute document symbol provider.

- _uri_ - Uri of a text document
- _(returns)_ - A promise that resolves to an array of SymbolInformation and DocumentSymbol instances.

`vscode.executeCompletionItemProvider` - Execute completion item provider.

- _uri_ - Uri of a text document
- _position_ - Position in a text document
- _triggerCharacter_ - (optional) Trigger completion when the user types the character, like `,` or `(`
- _itemResolveCount_ - (optional) Number of completions to resolve (too large numbers slow down completions)
- _(returns)_ - A promise that resolves to a CompletionList instance.

`vscode.executeCodeActionProvider` - Execute code action provider.

- _uri_ - Uri of a text document
- _range_ - Range in a text document
- _(returns)_ - A promise that resolves to an array of Command instances.

`vscode.executeCodeLensProvider` - Execute CodeLens provider.

- _uri_ - Uri of a text document
- _itemResolveCount_ - (optional) Number of lenses that should be resolved and returned. Will only return resolved lenses, will impact performance)
- _(returns)_ - A promise that resolves to an array of CodeLens instances.

`vscode.executeFormatDocumentProvider` - Execute document format provider.

- _uri_ - Uri of a text document
- _options_ - Formatting options
- _(returns)_ - A promise that resolves to an array of TextEdits.

`vscode.executeFormatRangeProvider` - Execute range format provider.

- _uri_ - Uri of a text document
- _range_ - Range in a text document
- _options_ - Formatting options
- _(returns)_ - A promise that resolves to an array of TextEdits.

`vscode.executeFormatOnTypeProvider` - Execute document format provider.

- _uri_ - Uri of a text document
- _position_ - Position in a text document
- _ch_ - Character that got typed
- _options_ - Formatting options
- _(returns)_ - A promise that resolves to an array of TextEdits.

`vscode.executeLinkProvider` - Execute document link provider.

- _uri_ - Uri of a text document
- _(returns)_ - A promise that resolves to an array of DocumentLink instances.

`vscode.executeDocumentColorProvider` - Execute document color provider.

- _uri_ - Uri of a text document
- _(returns)_ - A promise that resolves to an array of ColorInformation objects.

`vscode.executeColorPresentationProvider` - Execute color presentation provider.

- _color_ - The color to show and insert
- _context_ - Context object with uri and range
- _(returns)_ - A promise that resolves to an array of ColorPresentation objects.

`vscode.openFolder` - Open a folder or workspace in the current window or new window depending on the newWindow argument.

- _uri_ - (optional) Uri of the folder or workspace file to open. If not provided, a native dialog will ask the user for the folder
- _newWindow_ - (optional) Whether to open the folder/workspace in a new window or the same. Defaults to opening in the same window.

Note that opening in the same window will shutdown the current extension host process and start a new one on the given folder/workspace unless the newWindow parameter is set to true.

`vscode.diff` - Opens the provided resources in the diff editor to compare their contents.

- _left_ - Left-hand side resource of the diff editor
- _right_ - Right-hand side resource of the diff editor
- _title_ - (optional) Human readable title for the diff editor
- _options_ - (optional) Editor options, see vscode.TextDocumentShowOptions

`vscode.open` - Opens the provided resource in the editor.

- _resource_ - Resource to open
- _columnOrOptions_ - (optional) Either the column in which to open or editor options, see vscode.TextDocumentShowOptions

Can be a text or binary file, or a http(s) url. If you need more control over the options for opening a text file, use vscode.window.showTextDocument instead.

`vscode.removeFromRecentlyOpened` - Removes an entry with the given path from the recently opened list.

- _path_ - Path to remove from recently opened.

`vscode.setEditorLayout` - Sets the editor layout.

- _layout_ - The editor layout to set.

The layout is described as object with an initial (optional) orientation (0 = horizontal, 1 = vertical) and an array of editor groups within. Each editor group can have a size and another array of editor groups that will be laid out orthogonal to the orientation. If editor group sizes are provided, their sum must be 1 to be applied per row or column. Example for a 2x2 grid: `{ orientation: 0, groups: [{ groups: [{}, {}], size: 0.5 }, { groups: [{}, {}], size: 0.5 }] }`

`cursorMove` - Move cursor to a logical position in the view

- _Cursor move argument object_

  Property-value pairs that can be passed through this argument:

  - 'to': A mandatory logical position value providing where to move the cursor.
    ```
    'left', 'right', 'up', 'down'
    'wrappedLineStart', 'wrappedLineEnd', 'wrappedLineColumnCenter'
    'wrappedLineFirstNonWhitespaceCharacter', 'wrappedLineLastNonWhitespaceCharacter'
    'viewPortTop', 'viewPortCenter', 'viewPortBottom', 'viewPortIfOutside'
    ```
  - 'by': Unit to move. Default is computed based on 'to' value.
    ```
    'line', 'wrappedLine', 'character', 'halfLine'
    ```
  - 'value': Number of units to move. Default is '1'.
  - 'select': If 'true' makes the selection. Default is 'false'.

`editorScroll` - Scroll editor in the given direction

- _Editor scroll argument object_

  Property-value pairs that can be passed through this argument:

  - 'to': A mandatory direction value.
    ```
    'up', 'down'
    ```
  - 'by': Unit to move. Default is computed based on 'to' value.
    ```
    'line', 'wrappedLine', 'page', 'halfPage'
    ```
  - 'value': Number of units to move. Default is '1'.
  - 'revealCursor': If 'true' reveals the cursor if it is outside view port.

`revealLine` - Reveal the given line at the given logical position

- _Reveal line argument object_

  Property-value pairs that can be passed through this argument:

  - 'lineNumber': A mandatory line number value.
  - 'at': Logical position at which line has to be revealed .
    ```
    'top', 'center', 'bottom'
    ```

`editor.unfold` - Unfold the content in the editor

- _Unfold editor argument_

  Property-value pairs that can be passed through this argument:

  - 'levels': Number of levels to unfold. If not set, defaults to 1.
  - 'direction': If 'up', unfold given number of levels up otherwise unfolds down.
  - 'selectionLines': The start lines (0-based) of the editor selections to apply the unfold action to. If not set, the active selection(s) will be used.

`editor.fold` - Fold the content in the editor

- _Fold editor argument_

  Property-value pairs that can be passed through this argument:

  - 'levels': Number of levels to fold. Defaults to 1.
  - 'direction': If 'up', folds given number of levels up otherwise folds down.
  - 'selectionLines': The start lines (0-based) of the editor selections to apply the fold action to. If not set, the active selection(s) will be used.

`editor.action.showReferences` - Show references at a position in a file

- _uri_ - The text document in which to show references
- _position_ - The position at which to show
- _locations_ - An array of locations.

`moveActiveEditor` - Move the active editor by tabs or groups

- _Active editor move argument_

  Argument Properties:

  - 'to': String value providing where to move.
  - 'by': String value providing the unit for move (by tab or by group).
  - 'value': Number value providing how many positions or an absolute position to move.

## Simple commands

Simple commands that do not require parameters can be found in the Keyboard Shortcuts list in the default `keybindings.json` file. The unbound commands are listed in a comment block at the bottom of the file.

To review `keybindings.json`:

Windows, Linux: **File** > **Preferences** > **Keyboard Shortcuts** > `keybindings.json` link

macOS:
**Code** > **Preferences** > **Keyboard Shortcuts** > `keybindings.json` link
