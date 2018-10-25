---
Order: 2
Area: get-started
TOCTitle: Extension Structure
PageTitle: Extension Structure
---

# Extension Structure

- Extension file structure
- TypeScript
- Activation Events


## TypeScript

We recommend using TypeScript when writing VS Code extensions, as TypeScript will give you a nice authoring experience that will make it easier for you to browse VS Code's API.

The TypeScript compilation is triggered before running your extension. This is done with the `preLaunchTask` attribute defined in the `.vscode/launch.json` file which declares a task to be executed before starting the debugging session. The task is defined inside the `.vscode/tasks.json` file.

## Extension file structure

```
.
├── .vscode                     // VS Code integration
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── .vscodeignore               // files ignored when publishing extension
├── README.md                   // README used marketplace listings
├── src
│   └── extension.ts            // the source of the extension entry point
├── package.json                // extension's manifest
├── tsconfig.json               // jsconfig.json, in case of JavaScript extension
```

Let's go through the purpose of all these files and explain what they do:

### The extension manifest: `package.json`

* Each VS Code extension must have a `package.json` file that describes it and its capabilities.
* VS Code reads this file during start-up and reacts to each `contributes` section immediately.
* Please read the [`package.json` extension manifest reference](/docs/extensionAPI/extension-manifest.md).
* More information on [`package.json` contribution points](/docs/extensionAPI/extension-points.md).

#### Example TypeScript extension manifest

```json
{
    "name": "myFirstExtension",
    "description": "",
    "version": "0.0.1",
    "publisher": "",
    "engines": {
        "vscode": "^1.5.0"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onCommand:extension.sayHello"
    ],
    "main": "./out/extension",
    "contributes": {
        "commands": [{
            "command": "extension.sayHello",
            "title": "Hello World"
        }]
    },
    "scripts": {
        "vscode:prepublish": "tsc -p ./",
        "compile": "tsc -watch -p ./",
        "postinstall": "node ./node_modules/vscode/bin/install",
        "test": "node ./node_modules/vscode/bin/test"
    },
    "devDependencies": {
       "typescript": "^2.0.3",
        "vscode": "^1.5.0",
        "mocha": "^2.3.3",
        "@types/node": "^6.0.40",
        "@types/mocha": "^2.2.32"
   }
}
```

> **Note:** A JavaScript extension doesn't require the `scripts` field as no compilation is needed.

This specific `package.json` describes an extension that:

* *contributes* an entry to the **Command Palette** (`kb(workbench.action.showCommands)`) with the label `"Hello world"` that will invoke a command `"extension.sayHello"`.
* requests to get loaded (*activationEvents*) when the command `"extension.sayHello"` is invoked.
* has its *main* JavaScript code in a file called `"./out/extension.js"`.

> **Note:** VS Code **does not** load the code of an extension eagerly at start-up. An extension must describe, through the [`activationEvents`](/docs/extensionAPI/activation-events.md) property under what conditions it should get activated (loaded).


### Miscellaneous files

* `.vscode/launch.json` defines launching VS Code in the Extension Development mode. It also points with `preLaunchTask` to a task defined in `.vscode/tasks.json` that runs the TypeScript compiler.
* `.vscode/settings.json` by default excludes the `out` folder.  You can modify which file types you want to hide.
* `.gitignore` - Tells Git version control which patterns to ignore.
* [`.vscodeignore`](/docs/extensions/publish-extension.md#advanced-usage) - Tells the packaging tool which files to ignore when publishing the extension.
* `README.md` - README file describing your extension for VS Code users.


## Extension activation

Now that the roles of the files included in the extension are clarified, here is how your extension gets activated:

* The extension development instance discovers the extension and reads its `package.json` file.
* Later when you press `kb(workbench.action.showCommands)`:
 * The registered commands are displayed in the Command Palette.
 * In this list there is now an entry `"Hello world"` that is defined in the `package.json`.
* When selecting the `"Hello world"` command:
 * The command `"extension.sayHello"` is invoked:
   * An activation event `"onCommand:extension.sayHello"` is created.
   * All extensions listing this activation event in their `activationEvents` are activated.
     * The file at `./out/extension.js` gets loaded in the JavaScript VM.
     * VS Code looks for an exported function `activate` and calls it.
     * The command `"extension.sayHello"` is registered and its implementation is now defined.
 * The command `"extension.sayHello"` implementation function is invoked.
 * The command implementation displays the "Hello World" message.



