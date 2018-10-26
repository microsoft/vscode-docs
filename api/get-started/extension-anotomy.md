---
Order: 2
Area: get-started
TOCTitle: Extension Anatomy
PageTitle: Extension Anatomy
---

# Extension Anatomy

In the last topic, we came across four concepts: Extension Host, Activation Events, Contribution Points and vscode API. In short, they work together in this way:

VS Code offers two ways to extend its functionality:
- vscode API: A set of JavaScript API that you can programmatically call.
- Contribution Points: A set of static declaration that you can contribute through JSON.

An extension can contain either of them. For example, a [Completion Provider Extension](https://github.com/Microsoft/vscode-extension-samples/tree/master/completions-sample) uses the [`vscode.languages.registerCompletionItemProvider`](/api/references/vscode-api#languages.registerCompletionItemProvider) API but makes no contribution, and a [Theme Extension](https://github.com/Microsoft/vscode-extension-samples/tree/ext-docs/theme-sample) only uses the [`contributes.colors`](/api/references/contribution-points#contributes.colors) Contribution Point without including any code.

The Extension Host executes all extension code in a Node.js runtime. Each extension includes an entry file that is loaded when VS Code launches, and VS Code executes the `activate` function of each extension when their Activation Point is hit.

Let's take a closer look at the HelloCode sample, and see how these concepts applies to the sample.

## Extension file structure

```
.
├── .vscode
│   ├── launch.json             // Config for launching and debugging the extension
│   └── tasks.json              // Config for build task that compiles TypeScript
├── .gitignore                  // Ignore build output and node_modules
├── README.md                  // Readable description of your extension
├── src
│   └── extension.ts            // Extension source code
├── package.json                // Extension manifest
├── tsconfig.json               // TypeScript configuration
```

You can read more about the config files:

- `launch.json`: https://code.visualstudio.com/Docs/editor/debugging
- `tasks.json`: https://code.visualstudio.com/Docs/editor/tasks
- `tsconfig.json`: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

However, let's focus on `package.json` and `extensions.ts`, which are essential to building VS Code extensions.

### The extension manifest: `package.json`

* Each VS Code extension must have a `package.json` file that describes it and its capabilities.
* VS Code reads this file during start-up and reacts to each `contributes` section immediately.
* Please read the [`package.json` extension manifest reference](/docs/extensionAPI/extension-manifest.md).
* More information on [`package.json` contribution points](/docs/extensionAPI/extension-points.md).

```json
{
	"name": "hellocode-sample",
	"description": "HelloWorld example for VS Code",
	"version": "0.0.1",
	"publisher": "vscode-samples",
	"engines": {
		"vscode": "^1.25.0"
	},
	"activationEvents": [
		"onCommand:extension.helloCode"
	],
	"main": "./out/extension.js",
	"contributes": {
		"commands": [
			{
				"command": "extension.helloCode",
				"title": "Hello Code"
			}
		]
	},
	"scripts": {
		"compile": "tsc -p ./",
		"watch": "tsc -watch -p ./",
		"postinstall": "node ./node_modules/vscode/bin/install"
	},
	"devDependencies": {
		"typescript": "^2.6.1",
		"vscode": "^1.1.21"
		"@types/node": "^8.10.25"
	}
}

```

This specific `package.json` describes an extension that:

* *contributes* an entry to the **Command Palette** (`kb(workbench.action.showCommands)`) with the label `"Hello Code"` that will invoke a command `"extension.helloCode"`.
* requests to get loaded (*activationEvents*) when the command `"extension.helloCode"` is invoked.
* has its *main* JavaScript code in a file called `"./out/extension.js"`.

One thing to note is the `engines.vscode` field and the `postinstall` scripts. After you install local dependencies, the `install` script provided by `vscode` NPM module downloads a `vscode.d.ts` file that describes VS Code API. With this `d.ts` file, you would get IntelliSense, jump to definition, error checking and many other language features when developing an extension.

> **Note:** VS Code **does not** load the code of an extension eagerly at start-up. An extension must describe, through the [`activationEvents`](/docs/extensionAPI/activation-events.md) property under what conditions it should get activated (loaded).

## Extension Entry File

```
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hellocode-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloCode', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Code!');
	});

    // The command registration will be disposed when the extension is deactivated
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
```