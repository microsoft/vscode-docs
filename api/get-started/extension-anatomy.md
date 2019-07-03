---
# DO NOT TOUCH — Managed by doc writer
ContentId: 8027f6fb-6c9e-4106-8ef1-f9b0ba1b7085
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Explain the structure of a Visual Studio Code extension (plug-in)
---

# Extension Anatomy

In the last topic, you were able to get a basic extension running. How does it work under the hood?

The `Hello World` extension does 3 things:

- Registers the [`onCommand`](/api/references/activation-events#onCommand) [**Activation Event**](/api/references/activation-events): `onCommand:extension.helloWorld`, so the extension becomes activated when user runs the `Hello World` command.
- Uses the [`contributes.commands`](/api/references/contribution-points#contributes.commands) [**Contribution Point**](/api/references/contribution-points) to make the command `Hello World` available in the Command Palette, and bind it to a command ID `extension.helloWorld`.
- Uses the [`commands.registerCommand`](/api/references/vscode-api#commands.registerCommand) [**VS Code API**](/api/references/vscode-api) to bind a function to the registered command ID `extension.helloWorld`.

Understanding these three concepts is crucial to writing extensions in VS Code:

- [**Activation Events**](/api/references/activation-events): events upon which your extension becomes active.
- [**Contribution Points**](/api/references/contribution-points): static declarations that you make in the `package.json` [Extension Manifest](#extension-manifest) to extend VS Code.
- [**VS Code API**](/api/references/vscode-api): a set of JavaScript API that you can invoke in your extension code.

In general, your extension would use a combination of Contribution Points and VS Code API to extend VS Code's functionality. The [Extension Capabilities Overview](/api/extension-capabilities/overview) topic helps you find the right Contribution Point and VS Code API for your extension.

Let's take a closer look of `Hello World` sample's source code and see how these concepts apply to it.

## Extension File Structure

```
.
├── .vscode
│   ├── launch.json     // Config for launching and debugging the extension
│   └── tasks.json      // Config for build task that compiles TypeScript
├── .gitignore          // Ignore build output and node_modules
├── README.md           // Readable description of your extension's functionality
├── src
│   └── extension.ts    // Extension source code
├── package.json        // Extension manifest
├── tsconfig.json       // TypeScript configuration
```

You can read more about the configuration files:

- `launch.json` used to configure VS Code [Debugging](/docs/editor/debugging)
- `tasks.json` for defining VS Code [Tasks](/docs/editor/tasks)
- `tsconfig.json` consult the TypeScript [Handbook](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

However, let's focus on `package.json` and `extensions.ts`, which are essential to understanding the `Hello World` extension.

### Extension Manifest

Each VS Code extension must have a `package.json` as its [Extension Manifest](/api/references/extension-manifest). The `package.json` contains a mix of Node.js fields such as `scripts` and `dependencies` and VS Code specific fields such as `publisher`, `activationEvents` and `contributes`. You can find description of all VS Code specific fields in [Extension Manifest Reference](/api/references/extension-manifest). Here are some most important fields:

- `name` and `publisher`: VS Code uses `<publisher>.<name>` as a unique ID for the extension. For example, the Hello World sample has the ID `vscode-samples.helloworld-sample`. VS Code uses the ID to uniquely identify your extension
- `main`: The extension entry point.
- `activationEvents` and `contributes`: [Activation Events](/api/references/activation-events) and [Contribution Points](/api/references/contribution-points).
- `engines.vscode`: This specifies the minimum version of VS Code API that the extension depends on.
- The `postinstall` script: This would install the 1.34.0 version of VS Code API as specified in `engines.vscode`. Once the `vscode.d.ts` file is downloaded to `node_modules/vscode/vscode.d.ts`, you will get IntelliSense, jump to definition and error checking for all usage of VS Code API.

```json
{
  "name": "helloworld-sample",
  "displayName": "helloworld-sample",
  "description": "HelloWorld example for VS Code",
  "version": "0.0.1",
  "publisher": "vscode-samples",
  "repository": "https://github.com/Microsoft/vscode-extension-samples/helloworld-sample",
  "engines": {
    "vscode": "^1.34.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:extension.helloWorld"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "extension.helloWorld",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "postinstall": "node ./node_modules/vscode/bin/install",
  },
  "devDependencies": {
    "@types/node": "^8.10.25",
    "@types/vscode": "^1.34.0",
    "tslint": "^5.16.0",
    "typescript": "^3.4.5"
  }
}
```

## Extension Entry File

The extension entry file exports two functions, `activate` and `deactivate`. `activate` is executed when your registered **Activation Event** happens. `deactivate` gives you a chance to clean up before your extension becomes deactivated.

The [`vscode`](https://www.npmjs.com/package/vscode) module contains a script located at `node ./node_modules/vscode/bin/install`. The script pulls the VS Code API definition file depending on the `engines.vscode` field in `package.json`. After running the script, you would get IntelliSense, jump to definition and other TypeScript language features in your code.

```ts
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "helloworld-sample" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
```
