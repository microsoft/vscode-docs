---
Order:
Area: extensions
TOCTitle: Example-Content Provider
ContentId: 231a12fc-18a1-4e9b-b25c-0de4c43ef0ce
PageTitle: Visual Studio Code Example - Content Provider Extension
DateApproved: 3/9/2018
MetaDescription: Content Provider example shows how to display HTML document within VS Code
---
# Example - Content Provider

This tutorial teaches you how to display an HTML document in Visual Studio Code. We'll create a Content Provider ([TextDocumentContentProvider](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextDocumentContentProvider)) which is used to displays an HTML document.

![Displaying HTML](images/example-content-provider/quickpeek.gif)

> **Tip:** You can find similar source code on the VS Code [official samples repository](https://github.com/Microsoft/vscode-extension-samples/tree/master/contentprovider-sample). The source code for this tutorial is [here](https://github.com/l7ssha/example-content-provider).

## Overview

>**Tip**: If you are just getting started with VS Code extensibility, you may want to go through the [Hello World](/docs/extensions/example-hello-world.md) tutorial first.

This example has two sections:

1. [Create a Content Provider](#create-a-content-provider)
2. [Interact with the Content Provider](#interact-with-the-content-provider)

## Generate the extension template

To start, make sure you have the latest VS Code extension generator installed and then run it:

```bash
npm install -g yo generator-code
yo code
```

This will run the extension generator and we will base this example on the TypeScript **New Extension** template. For now, fill in the fields the same way you see them completed in the image below (using 'ContentProvider' as the extension name and your own name as the publisher).

![Yo Code Example Output](images/example-content-provider/yo1.png)

Now open VS Code:

```bash
cd ContentProvider
code .
```

## Run the extension

Before going on, run the extension to make sure everything works as expected by pressing `kb(workbench.action.debug.start)`. As you saw in the previous "Hello World" walkthrough, VS Code opens another window (the **[Extension Development Host]** window) in which your extension will be loaded. You should find the **Hello World** command in the **Command Palette** (press `kb(workbench.action.showCommands)`) and when you select it, you will see a notification at bottom right saying "Hello World".

## Create a Content Provider

For now, you can delete all the source code from `export function activate(..)` as it will be replaced it later. At the end of file, create new class (called 'ExampleContentProvider' below) to implement `vscode.TextDocumentContentProvider`. Put your cursor over the class name (it will have red squiggles), click the **Show Fixes** light bulb and VS Code will automatically implement the interface for you.

In this example, we load a plain HTML document (`resources/index.html`) into a variable and return this variable.

```typescript
export class ExampleContentProvider implements vscode.TextDocumentContentProvider {
    // Event emitter which invokes document updates
    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();

    // Get the global path to the resources folder
    // by combining the actual directory with the relative path.
    private resources = path.join(__dirname, '../resources');
    private html: string = "";  // HTML document buffer

    constructor() {
        // Load HTML text to string
        fs.readFile(path.join(this.resources, "index.html"), (_: NodeJS.ErrnoException, data: Buffer) => {
            this.html = data.toString();
        });
    }

    get onDidChange(): vscode.Event<vscode.Uri> {
        return this._onDidChange.event;
    }

    // You can invoke this method to update the provider
    public update(uri: vscode.Uri) {
        this._onDidChange.fire(uri);
    }

    // Main method which returns string to display in the window.
    // In this example, return the file contents loaded into a variable in the constructor.
    provideTextDocumentContent(_: vscode.Uri): vscode.ProviderResult<string> {
        return this.html;
    }
}
```

For the source code above, you also need to add imports for `fs` and `path` to the top of the `extensions.ts` file:

```typescript
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
```

You can use many templates engines to create dynamic contents.

Some examples of using template engines:

* [DisMPD Extension - Mustache](https://github.com/l7ssha/DisMPD/blob/master/src/DismpdProvider.ts)
* [Spell Checker by Jason-Rev - Pug](https://github.com/Jason-Rev/vscode-spell-checker/tree/master/client/src/infoViewer)

If you want to update the content of the provider, you can create a new method to do this or expose certain properties and watch for changes.

You can customize your document using CSS. Just embed your CSS styles in the HTML document. Background, font, font colors (and many more) are provided by the VS Code theme so you don't have to specify them, but you can override these if you want.

> **Tip:** If you want to have CSS in separate file, you have to use the full path. Relative paths don't work.

## Interact with the Content Provider

Now that we've created a content provider, let's add some code to access to it.

First specify a URL to our page. You can replace the string `example` with your desired name. This `uri` is used only in the extension logic and not displayed to the user. Next instantiate a new object of our content provider.

We'll also register a command which will invoke our provider. In this command, we invoke the `vscode.previewHtml` command which takes the content at `uri` (`uri` is handled by our provider) and displays it in a new window. We also listen for errors and display an error message if one occurs.

```typescript
export function activate(context: vscode.ExtensionContext) {
    // Our window uri. `example` is your desired name.
    let uri = vscode.Uri.parse('example://authority/example');

    // Instantiate our provider object
    let provider = new ExampleContentProvider();

    // Register provider. First argument should be same as in our uri
    let registration = vscode.workspace.registerTextDocumentContentProvider('example', provider);

    // Register the command to show the window.
    // The command handler gets the string which returned by the content provider
    // and displays it in an HTML preview window.
    let openProvider = vscode.commands.registerCommand('exampleprovider.open', () => {
        // Discard event if command is successful.
        // Return an error message if unsuccessful.
        return vscode.commands.executeCommand('vscode.previewHtml', uri, vscode.ViewColumn.Two, 'Example Content Provider').then(_ => {}, _ => {
            vscode.window.showErrorMessage('Error opening content.');
        });
    });

    // Push registrations
    context.subscriptions.push(registration, openProvider);
}
```

Next modify the extension's `package.json` file with your command name `exampleprovider.open`.

Update the `"activationEvents"`:

```json5
"activationEvents": [
    "onCommand:exampleprovider.open"
],
```

as well as the `"contributes"` section:

```json5
"contributes": {
    "commands": [
        {
            "command": "exampleprovider.open",
            "title": "Open Content Provider"
        }
    ]
},
```

Press `kb(workbench.action.debug.start)` to rebuild and test your updated extension. If you have created an `index.html` file in a `resources` subfolder, you'll see the content displayed when you run the **Open Content Provider** command.

## Next Steps

Read on to find out about:

* [Extension Generator](/docs/extensions/yocode.md) - Learn about other options in the Yo Code extension generator.
* [Extension API](/docs/extensionAPI/overview.md) - Get an overview of the Extension API.
* [Publishing Tool](/docs/extensions/publish-extension.md) - Learn how to publish an extension to the public Marketplace.
* [Editor API](/docs/extensionAPI/vscode-api.md#window) - Learn more about Text Documents, Text Editors and editing text.
* [Additional Extension Examples](/docs/extensions/samples.md) - Take a look at our list of example extension projects.
