---
Order: 17
Area: languages
TOCTitle: Go
ContentId: 6f06908a-6694-4fad-ac1e-fc6d9c5747ca
PageTitle: Go with Visual Studio Code
DateApproved: 6/21/2022
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, snippets, linting) for Go.
---
# Go in Visual Studio Code

Using the Go extension for Visual Studio Code, you get features like IntelliSense, code navigation, symbol search, testing, debugging, and many more that will help you in [Go](https://golang.org/) development.

![Go extension banner](images/go/go-extension.png)

You can install the Go extension from the VS Code [Marketplace](https://marketplace.visualstudio.com/items?itemName=golang.go).

Watch ["Getting started with VS Code Go"](https://youtu.be/1MXIGYrMk80) for an explanation of how to build your first Go application using VS Code Go.

This article describes only a subset of the features the Go extension provides. See the extension's [documentation](https://github.com/golang/vscode-go/wiki/features) for the full, up-to-date list of supported features.

## IntelliSense

![IntelliSense](images/go/completion-signature-help.gif)

IntelliSense features are provided by the Go language server, [gopls](https://golang.org/s/gopls), maintained by the Go team. You can configure the behavior of `gopls` using the [`gopls` settings](https://github.com/golang/vscode-go/wiki/settings#settings-for-gopls).

### Semantic syntax highlighting

For better syntax highlighting than the default TextMate-based syntax highlighting, we recommend enabling [semantic highlighting](/api/language-extensions/semantic-highlight-guide.md) by turning on Gopls' `ui.semanticTokens` setting.

```json
"gopls": { "ui.semanticTokens": true }
```

### Auto completions

As you type in a Go file, you can see IntelliSense providing you with suggested completions. This even works for members in current, imported, and not yet imported packages. Just type any package name followed by `.`, and you will get suggestions for the corresponding package members.

>**Tip**: Use `kb(editor.action.triggerSuggest)` to trigger the suggestions manually.

### Hover information

Hovering on any variable, function, or struct will give you information on that item such as documentation, signature, etc.

### Signature help

When you open the `(` while calling a function, a pop-up provides signature help for the function. As you keep typing the parameters, the hint (underline) moves to the next parameter.

>**Tip**: Use `kb(editor.action.triggerParameterHints)` to manually trigger the signature help when the cursor is inside the `()` in the function call.

## Code navigation

Code Navigation features are available in the context menu in the editor.

* **Go to Definition** `kb(editor.action.revealDefinition)` - Go to the source code of the type definition.
* **Go to Type Definition** - Go to the type that defines a symbol.
* **Peek Definition** `kb(editor.action.peekDefinition)` - Bring up a Peek window with the type definition.
* **Go to References** `kb(editor.action.goToReferences)` - Show all references for the type.
* **Show Call Hierarchy** `kb(editor.showCallHierarchy)` - Show all calls from or to a function.
* **Go to Implementations** `kb(editor.action.goToImplementation)` - Bring up a Peek window with the list of all implementations of an interface (if triggered with an interface type symbol), or interfaces a type implements (if triggered with a concrete type symbol).
* **Find All Implementations** - Show all implementation of an interface (if triggered with an interface type symbol), or interfaces a type implements (if triggered with a concrete type symbol).

You can navigate via symbol search using the **Go to Symbol** commands from the Command Palette (`kb(workbench.action.showCommands)`).

* **Go to Symbol in File** - `kb(workbench.action.gotoSymbol)`
* **Go to Symbol in Workspace** - `kb(workbench.action.showAllSymbols)`

You can also navigate back and forth between a Go file and its test implementation using the **Go: Toggle Test File** command.

## Build and diagnose

The Go language server (`gopls`) detects build and vet errors found on the workspace. The errors and warnings from running any/all of the above will be shown red/green squiggly lines in the editor. These diagnostics also show up in the **Problems** panel  (**View** > **Problems**).

You can add additional lint checks using the `go.lintOnSave` setting and configuring your choice of linting tool (`staticcheck`, `golangci-lint`, or `revive`) using the `go.lintTool` setting.

## Formatting

You can format your Go file using `kb(editor.action.formatDocument)` or by running the **Format Document** command from the Command Palette or the context menu in the editor.

By default, formatting is run when you save your Go file. You can disable this behavior by setting `editor.formatOnSave` to `false` for the `[go]` language identifier. You can change this using your JSON setting files.

```json
"[go]": {
        "editor.formatOnSave": false
}
```

When you have multiple formatters activated for Go files, you can select the Go extension as the default formatter.

```json
"[go]": {
    "editor.defaultFormatter": "golang.go"
}
```

Formatting is provided by `gopls`. If you want `gofumpt`-style formatting, you can configure `gopls` to use `gofumpt`.

```json
"gopls": {
    "formatting.gofumpt": true
}
```

## Test

The VS Code [Test UI](/api/extension-guides/testing.md) and editor [CodeLens](https://code.visualstudio.com/blogs/2017/02/12/code-lens-roundup) elements allow users to easily run tests, benchmarks, profiles for a given function, file, package, or workspace.

Alternatively, the same functionality is available through a set of commands:

* [**Go: Test Function At Cursor**](https://github.com/golang/vscode-go/wiki/commands#go-test-function-at-cursor)
* [**Go: Test File**](https://github.com/golang/vscode-go/wiki/commands#go-test-file)
* [**Go: Test Package**](https://github.com/golang/vscode-go/wiki/commands#go-test-package)
* [**Go: Test All Packages in Workspace**](https://github.com/golang/vscode-go/wiki/commands#go-test-all-packages-in-workspace)

There are many test-related commands that you can explore by typing "Go: test" in the Command Palette.

![Test Commands](images/go/testcommands.png)

The first three above can be used to generate test skeletons for the functions in the current package, file, or at the cursor using `gotests`. The last few can be used to run tests in the current package, file, or at the cursor using `go test`. There is also a command for getting test coverage.

You can configure the extension to run tests and compute test coverage using:

* `go.testOnSave`
* `go.coverOnSave`
* `go.testFlags`

## Import packages

The extension organizes imports, and removes unused imports by default. For different behavior, you can override per-language default settings following [these instructions](https://github.com/golang/vscode-go/wiki/advanced#formatting-code-and-organizing-imports).

Run the command **Go: Add Import** to get a list of packages that can be imported to your Go file. Choose one and it will get added in the import block of your Go file.

## Refactoring

Select the area for refactoring (for example variable, function body, etc.). Click on the Code Action light bulb icon that appears in the selected area, or select **Refactoring...** or **Rename Symbol** (`kb(editor.action.rename)`) from the VS Code context menu.

## Debugging

The Go extension lets you debug Go code by utilizing the [Delve](https://github.com/go-delve/delve) debugger.

Read [Debug Go programs in VS Code](https://github.com/golang/vscode-go/wiki/debugging) for setup steps, supported features, configurations, information on remote debugging and a troubleshooting guide. For general debugging features such as inspecting variables, setting breakpoints, and other activities that aren't language-dependent, review [VS Code debugging](/docs/editor/debugging.md).

Some features unique to Go are:

* Local & remote debugging
* Data inspection using [Delve's expression syntax](https://github.com/go-delve/delve/blob/master/Documentation/cli/expr.md)
* Dynamic configuration change and inspection options with [`dlv` command](https://github.com/golang/vscode-go/wiki/debugging#dlv-command-from-debug-console) from DEBUG CONSOLE
* Ability to hide/show system goroutines (use `hideSystemGoroutines` configuration)
* Disassembly view support (right-click your source code and select **Open Disassembly View**)
* Experimental function call, core inspection, Mozilla `rr` support

## Next steps

This has been a brief overview showing the Go extension features within VS Code. For more information, see the details provided in the Go extension [README](https://github.com/golang/vscode-go/blob/master/README.md).

To stay up to date on the latest features/bug fixes for the Go extension, see the [CHANGELOG](https://github.com/golang/vscode-go/blob/master/CHANGELOG.md).

If you have any issues or feature requests, feel free to log them in the Go extension [vscode-go repo](https://github.com/golang/vscode-go/issues).

If you'd like to learn more about VS Code, try these topics:

* [Basic Editing](/docs/editor/codebasics.md) - A quick introduction to the basics of the VS Code editor.
* [Install an Extension](/docs/editor/extension-marketplace.md) - Learn about other extensions are available in the [Marketplace](https://marketplace.visualstudio.com/vscode).
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
