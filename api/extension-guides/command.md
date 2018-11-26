---
---

# Commands

Commands trigger actions in VS Code. If you have ever [configured a keybinding](/docs/getstarted/keybindings), then you've worked with commands. Commands are also used by extensions to expose functionality to users, bind to actions in VS Code's user interface, and implement internal logic.

## Using Commands
VS Code includes a large set of [built-in commands](/api/references/commands) that you can use to interact with the editor, control the user interface, or perform background operations. Many extensions also expose commands for their core functionality that you can leverage.

### Programmatically executing a command
The [`vscode.commands.executeCommand`](/api/references/vscode-api#commands.executeCommand) API programmatically executes a command. This lets you leverage VS Code's built-in functionality, and build on extensions such as VS Code's built-in git and markdown extensions.

The `editor.action.addCommentLine` command for example comments the currently selected lines in the active text editor:

```ts
import * as vscode from 'vscode';

function commentLine() {
    vscode.commands.executeCommand('editor.action.addCommentLine');
}
```

Some commands take arguments that control their behavior. Commands may also return a result. The api-like `vscode.executeDefinitionProvider` command for example queries a document for definitions at a given position. It takes a document URI and a position as arguments, and returns a promise with a list of definitions:

```ts
import * as vscode from 'vscode';

async function printDefinitionsForActiveEditor() {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        activeEditor.document.uri,
        activeEditor.selection.active
    );

    for (const definition of definitions) {
        console.log(definition);
    }
}
```

To find available commands:

- [Browse the keyboard shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings)
- [Look through VS Code's built-in advanced commands api](/api/references/commands)

### Command Uris

Commands uris are links that execute a given command. They can be used as clickable links in hover text, completion item details, or inside of webviews.

A command uri uses the `command` scheme followed by the command name. The command uri for the `editor.action.addCommentLine` command for example is `command:editor.action.addCommentLine`. Here's a hover provider that shows a link the comments the current line in the active text editor:

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    vscode.languages.registerHoverProvider('javascript', new class implements vscode.HoverProvider {
        provideHover(_document: vscode.TextDocument, _position: vscode.Position, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
            const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
            const contents = new vscode.MarkdownString(`[Add comment](${commentCommandUri})`)

            // To enable command uris in markdown content, you must set the `isTrusted` flag.
            // When creating trusted markdown string, make sure to properly sanitize all the
            // input content so that only expected command URIs can be executed
            contents.isTrusted = true;

            return new vscode.Hover(contents);
        }
    });
}
```

The list of arguments to the command is passed as a json array that has been properly uri encoded: The example below uses the `git.stage` command to create a hover like that stages the current file:

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    vscode.languages.registerHoverProvider('javascript', new class implements vscode.HoverProvider {
        provideHover(document: vscode.TextDocument, _position: vscode.Position, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
            const args = [{ resourceUri: document.uri }];
            const commentCommandUri = vscode.Uri.parse(`command:git.stage?${encodeURIComponent(JSON.stringify(args))}`);
            const contents = new vscode.MarkdownString(`[Stage file](${commentCommandUri})`)
            contents.isTrusted = true;
            return new vscode.Hover(contents);
        }
    });
}
```

## Creating new commands

### Registering a command

[`vscode.commands.registerCommand`](/api/references/vscode-api#commands.registerCommand) binds a command id to a handler function in your extension:

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const command = 'myExtension.sayHello';

    const commandHandler = (name?: string = 'world') => {
        console.log(`Hello ${name}!!!`);
    };

    context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));
}
```

The handler function will be invoked whenever the `myExtension.sayHello` command is executed, be it pragmatically with `executeCommand`, from the VS Code UI, or through a keybinding.

### Creating a user facing command

`vscode.commands.registerCommand` only binds a command id to a handler function. To expose this command in the command palette and let user's know about it, you also need a corresponding command `contribution` in your extension's `package.json`:

```json
{
    "contributes": {
        "commands": [
            {
                "command": "myExtension.sayHello",
                "title": "Say Hello"
            }
        ]
    }
}
```

The `commands` contribution tells VS Code that your extension provides a given command, and also lets you control how the command is displayed in the UI. Now our command will show up in the command palette:

![The contributed command in the command palette](images/commands/palette.png)

We still need to call `registerCommand` to actually tie the command id to the handler. This means that if the user select the `myExtension.sayHello` command from the command palette but our extension has not been activated yet, nothing will happen. To prevent this, extensions must register a `onCommand` `activiationEvent` for all user facing commands:

```json
{
    "activationEvents": [
        "onCommand:myExtension.sayHello"
    ]
}
```

Now when a user first invokes the `myExtension.sayHello` command from the command palette or through a keybinding, the extension will be activated and `registerCommand` will bind `myExtension.sayHello` to the proper handler.

You do not need an `onCommand` activation events for internal commands but you must define them for any commands that:

- Can be invoked using the command palette.
- Can be invoked using a keybinding.
- Can be invoked through the VS Code UI, such as though an the editor title bar.
- Is intended as API for other extensions to consume.

### Controlling when a command shows up in the command palette

By default, all user facing commands contributed through the `commands` section of the `package.json` show up in the command palette. However many commands are only relevant in certain circumstances, such as when there is an active text editor of a given language or when the user has a certain configuration option set.

The [`menus.commandPalette`](/api/references/contribution-points#contributes.menus) contribution point lets you restrict when a command should show in the command palette. It takes the id of the target command and a [when clause](/docs/getstarted/keybindings.md#when-clause-contexts) the controls when the command is shown:

```json
{
    "contributes": {
        "menus": {
            "commandPalette": [
                {
                    "command": "myExtension.sayHello",
                    "when": "editorLangId == markdown"
                }
            ]
        }
    }
}
```

Now the `myExtension.sayHello` command will only show up in the command palette when the user is in a markdown file.

