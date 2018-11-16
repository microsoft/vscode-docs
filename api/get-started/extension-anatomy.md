---
---

# Extension Anatomy

In the last topic, we were able to get a basic extension running. How does it work under the hood?

**TODO: Pine**: Modify the section so it explains concepts together with the sample, as we removed the "Behind the scenes" section from first topic.

---

In the last topic, we came across four concepts: **Extension Host**, **Activation Events**, **Contribution Points** and **VS Code API**. In short, they work together in this way:

VS Code offers two ways to extend its functionality:

- **VS Code API**: A set of JavaScript API that you can programmatically invoke.
- **Contribution Points**: A set of static declarations that you can contribute through JSON configuration.

An extension can contain either of them. For example, a [Completion Provider Extension](https://github.com/Microsoft/vscode-extension-samples/tree/master/completions-sample) uses the [`vscode.languages.registerCompletionItemProvider`](/api/references/vscode-api#languages.registerCompletionItemProvider) API but makes no contribution, and a [Theme Extension](https://github.com/Microsoft/vscode-extension-samples/tree/master/theme-sample) only uses the [`contributes.colors`](/api/references/contribution-points#contributes.colors) Contribution Point without including any code. Of course, you can utilize both in the same extension.

The **Extension Host** executes all extension code in a Node.js runtime. Each extension includes an entry file that is loaded when VS Code launches, and VS Code executes the `activate` function of each extension when their **Activation Events** are triggered.

Let's take a closer look at the `Hello Code` sample, and see how these concepts applies to it.

## Extension File Structure

```
.
├── .vscode
│   ├── launch.json     // Config for launching and debugging the extension
│   └── tasks.json      // Config for build task that compiles TypeScript
├── .gitignore          // Ignore build output and node_modules
├── README.md           // Readable description of your extension
├── src
│   └── extension.ts    // Extension source code
├── package.json        // Extension manifest
├── tsconfig.json       // TypeScript configuration
```

You can read more about the config files:

- `launch.json`: https://code.visualstudio.com/Docs/editor/debugging
- `tasks.json`: https://code.visualstudio.com/Docs/editor/tasks
- `tsconfig.json`: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

However, let's focus on `package.json` and `extensions.ts`, which are essential to understanding the HelloCode extension.

### The Extension Manifest: `package.json`

Each VS Code extension must have a `package.json` as its [Extension Manifest](/api/references/extension-manifest). The `package.json` contains a mix of Node.js fields such as `scripts` and `dependencies` and VS Code specific fields such as `publisher`, `activationEvents` and `contributes`. You can find description of all VS Code specific fields in [Extension Manifest Reference](/api/references/extension-manifest). Here, we'll point out some important fields:

- `name` and `publisher`: VS Code uses `<publisher>.<name>` as a unique ID for the extension. For example, the HelloCode sample has the ID `vscode-samples.hellocode-sample`.
- `main`: The extension entry point.
- `activationEvents` and `contributes`: [Activation Events](/api/references/activation-events) and [Contribution Points](/api/references/contribution-points).
- `engines.vscode`: This specifies the minimum version of VS Code API that the extension depends on.
- The `postinstall` script: This would install the 1.25 version of VS Code API as specified in `engines.vscode`. Once the `vscode.d.ts` file is downloaded to `node_modules/vscode/vscode.d.ts`, you will get IntelliSense, jump to definition and error checking for all usage of VS Code API.

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
		"vscode": "^1.1.21",
		"@types/node": "^8.10.25"
	}
}
```

## Extension Entry File

```ts
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

## Looking back

Here are the four important concepts we learned in this topic. You can find more information for them in the `References` section.

- Extension Host: The Node.js runtime where your extension code is executed.
- [VS Code API](/api/references/vscode-api): The VS Code Extension API available in the Extension Host.
- [Contribution Points](/api/references/contribution-points): The static declarations your extension can make in the `package.json`.
- [Activation Events](/api/references/activation-events): The event on which your extension is activated.