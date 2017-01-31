# Go with Visual Studio Code

Using the Go extension for Visual Studio Code, you get many of the language 
features like Intellisense, Code navigation, Symbol search, bracket matching, 
snippets and a whole lot of other features that will help you in Golang development.

You can install the Go extension from the [marketplace](https://marketplace.visualstudio.com/items?itemName=lukehoban.Go).

## Intellisense

### Auto complete
As you type your Go code, you can see auto complete kick in and provide you with suggested
completion items. This works for even members from packages that are not imported yet. 

By setting `go.autocompleteUnimportedPackages` to `true` in your settings, you can also
get all the importable packages in the suggestions. 

> Tip: Use `kb(editor.action.triggerSuggest)` to trigger the suggestions manually.

### Hover Info
Hovering on any variable, function, struct will give you information on that item like
its documentation, signature etc. 

![Information on hover](images/go/hover.png)

By default, the extension uses `godef` and `godoc` to get this information. 
You can choose to use `gogetdoc` instead by changing the setting `go.docsTool` in your User or Workspace Settings.

### Signature help
When you open the `(` while calling a function, a pop up provides signature help for the function.
As you keep typing the parameters, the hint(underline) moves to the next param.

![Signature Help](images/go/signaturehelp.png)

>Tip: Use `kb(editor.action.triggerParameterHints)` to manually trigger the signature help when the
cursor is inside the `()` in the function call.

By default, the extension uses `godef` and `godoc` to get this information. 
You can choose to use `gogetdoc` instead by changing the setting `go.docsTool` in your User or Workspace Settings.

## Code navigation

Below code navigation features which are self-explainatory are available in the context menu in the editor.

- Go To Defintion `kb(editor.action.goToDeclaration)`
- Peek Definition `kb(editor.action.previewDeclaration)`
- Find All References `kb(editor.action.referenceSearch.trigger)`

You can navigate via symbol search using the below commands from the command palette

- File Outline `kb(workbench.action.gotoSymbol)`
- Workspace Symbol search`kb(workbench.action.showAllSymbols)`

You can also navigate back and forth between a Go file and its test implementation using the `Go: Toggle Test File` command 

## Build, Lint and Vet

On save, the Go extension can kick `go build`, `go vet` and your choice of linting tool (`golint` or `gometalinter`) on the package to which your currently saved file belongs to. You can control these features via the below settings
- go.buildOnSave
- go.buildFlags
- go.vetOnSave
- go.vetFlags
- go.lintOnSave
- go.lintFlags
- go.lintTool

The errors and warnings from running any/all of the above will be shown red/green squiggly lines in the editor. These also show up in the Problems pane.

## Formatting

You can format your Go file using `kb(editor.action.formatDocument)` or by running the command `Format Document` in the command palette. 

Another way is to use the "Format Document" option in the context menu in the editor.

By default, formatting is run when you save your Go file. You can disable this by setting `go.formatOnSave` to `false`.

You can choose among 3 formatting tools: `gofmt`, `goreturns` and `goimports` by changing the setting `go.formatTool`.

## Test

There are many test related command that you can explore by typing `Go: test` in the command pallete. 

![Test Commands](images/go/testcommands.png)

The first 3 above can be used to generate test skeletons for the functions in the current package, file or at cursor using `gotests`.

The last few can be used to run tests in the current package, file or at cursor using `go test`.

There is also a command for getting test coverage.

## And more ..

### Import packages

Run the command `Go: Add Import` to get a list of packages that can be imported to your Go file.
Choose any, and it will get added in the import block of your Go file.

### Rename Symbols

You can rename symbols using `kb(editor.action.rename)` or by running the command `Rename Symbol` in the context menu in the editor.





