# Changes in 0.10

This document summarizes the breaking changes from 0.9.0 to 0.10.0 and the API additions. It will be deleted once we release 0.10.0 to the entire user base.

For the latest API, refer to [vscode.d.ts](https://github.com/Microsoft/vscode-extension-vscode/blob/master/vscode.d.ts) .

There are three sections in this document:

1. [Breaking Changes](#breaking-changes) - there are a few things to adopt to activate an extension
2. [API Updates](#api-updates) - IntelliSense will help find many of the updates we did here is a full list
3. [Notable Additions](#notable-additions) - we didn't just break stuff we also added some cool new stuff :)

>**Tip:** We also added some cool new features to VS Code itself - so don;t forget to check out the [0.10.0 end user release notes](https://github.com/Microsoft/vscode-extensionbuilders/blob/master/release-notes/latest.md).

# Breaking Changes

## package.json

### Engines
* You must define a valid engine in your `package.json` otherwise VS Code will not load the extension.  `0.10.x` is the right value to use and we have additional guidance for the [extension manifest reference](/docs/extensionAPI/extension-manifest.md).

```json
	"engines": {
		"vscode": "0.10.x"
	},
```

### Commands
* The `command`-activation event has been renamed to `onCommand`, like so `onCommand:mySuperCommand`. For example:
```json
	"activationEvents": [
		"onCommand:extension.sayHello"
	],
```

### Language Support
* In the 0.9.0 release, you could contribute snippets and a syntax by just adding them to the `snippets` or `syntax` folder. This is no longer supported and you must define snippets and syntaxes in the package.json. For example:
```json
	"contributes": {
		"grammars": [
			{
				"language": "go",
				"path": "./syntaxes/go.json",
				"scopeName": "source.go"
			}
		],
		"snippets": [
			{
				"language": "go",
				"path": "./snippets/go.json"
			}
		],
```

> **Tip:** Here is a sample repo: [LaTeX](https://github.com/Microsoft/vscode-LaTeX).

### Debugger
* The `debugAdapter` extension point has been renamed to `debuggers`.
* The `debuggers` extension point has additional properties (for an example refer to this [commit](https://github.com/Microsoft/vscode-go/commit/3a6be5f8e0b78ba4fce76b6b786802c7ffdb87e6)):
    * `label` the label shown to the user for the debug configuration
    * `initialConfiguration` the initial configuration generated into the launch.json 
    * `configurationAttributes` the schema for the configuration attributes.
    
### Language Workers
* The `languageWorkers` extension point has been removed, see the breaking API changes below.

### Misc
* You no longer need to declare an `outputChannel` in the package.json and you can delete the contribution.

## API Updates

### General
* Instead of using getter/setting methods, the API now uses properties. For example, `TextEditor.getDocument` will now be  `TextEditor.document`
* The activate function of an extension no longer takes an array of `Disposables` but instead is passed an `ExtensionContext`. The extension context provides the `Disposable` array and other information about the extension.
* The static method `Disposable.of()` is removed. Use `Disposable.from()` instead. 

### Text Editor
* Line and character offsets are now 0-based. In 0.9.1, they were 1 based!!
* `document.getLineMaxColumn(line)` is gone, you can now use `document.lineAt(line).range.end.character`

### Window
* `vscode.window.runInWindow` has been removed from the API. The functionality is now exposed from the [run-in-terminal](https://www.npmjs.com/package/run-in-terminal) node module.
* `vscode.window.getOutputChannel` is now `vscode.window.createOutputChannel`. `OutputChannel.reveal` has been renamed to `OutputChannel.show`.
* The `show[Information|Warning|Error]Message` methods no longer allow you to provide a command, but instead accept a message item that is rendered as a button. When clicked, the message is hidden and the selected message items are returned: `export function showInformationMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T>;`

### Workspace
* `workspace#getTextDocument` has been replaced by `workspace#openTextDocument` which also supports loading files that have not been opened yet
* `workspace#getTextDocuments` has been replaced by the property `workspace#textDocuments`.
* The API to access the configuration/settings has been changed and simplified, see the `WorkspaceConfiguration` inteface.

### Languages
* The language service provider API has been fully revised with the goal to support multiple providers for a language and to improve the naming. For an example of a converted language service provider see [vscode-go](https://github.com/Microsoft/vscode-go/tree/master/src): 
* A language service provider can no longer replace the contributions from another provider. The 'trick' of defining an 'extensionDependency` followed by overwriting the contributions from this provider is no longer supported and is no longer needed.
* The language status API, like `languages#addInformationLanguageStatus` et al. has been removed in favor of the new Status Bar API.
* The `IHTMLContentElement` interface formally used by Hovers has been replaced by a `MarkedString` which supports bold, italic, end embedded code blocks.


### Language Workers/Linters
* The language worker/linter API has been fully revised with the goal of making linter extensions more aligned with other language extensions and to support a smooth upgrade path from a linter to a full language service. 
* A linter now has both an extension and a server part. There are APIs for the extension and the server and these APIs are provided by corresponding node modules. For an example of a linter implemented using the new API refer to [vscode-eslint](https://github.com/Microsoft/vscode-eslint) or [vscode-jshint](https://github.com/Microsoft/vscode-jshint) and mimic their implementation. 
* To build the vscode-eslint extension, you have to:
    * change to the eslint-server folder
    * `npm install` - this fetches the node API module for the server
    * `npm run compile` - this compiles the server and copies the compiled code to the eslint extension folder
    * change to the eslint folder
    * `npm install` - this fetches the node API module for the extension
    * run the extension as usual

# Notable Additions
## Package.json
* There is a new _wild card_ activation event, that results in activating an extension on startup (use sparingly):
```json
activationEvents: [
	"*"
]
```

### Text Editor
* Support for text editor `Decorations` has been added. See the `createTextEditorDecorationType` function which configures a `Decoration` through `TextEditorDecorationOptions`. The [decorator sample extension](https://github.com/Microsoft/vscode-extension-samples/tree/master/decorator-sample) illustrates the API. 
* TextDocument provides methods to map from a position to an offset and vice versa `TextDocument#offsetAt`, `TextDocument#positionAt`.
* There is a new `TextLine` object.

### Workspace
* Support for Status Bar contributions has been added (see the `StatusBarItem` interface).

>**Tip:** The [wordcount example](https://github.com/Microsoft/vscode-wordcount) has been updated to reflect this.

* You can now listen to configuration changes `onDidChangeConfiguration`.
* In addition to taking an array of items, `showQuickPick` now supports passing in a Promise that resolves to an array of items.

### Languages
* You can add diagnostics for a file resource through a `DiagnosticCollection`.

## API
For the latest API refer to [vscode.d.ts](https://github.com/Microsoft/vscode-extension-vscode/blob/master/vscode.d.ts) for details and use the IntelliSense provided by VS Code to discover the new API methods and types.
