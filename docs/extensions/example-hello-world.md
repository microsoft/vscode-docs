---
Order: 2
Area: extensions
TOCTitle: Example-Hello World
ContentId: DC915D6C-13D4-4022-9101-57C4A4118B07
PageTitle: Your First Visual Studio Code Extension - Hello World
DateApproved: 7/7/2016
MetaDescription: Create your first Visual Studio extension (plug-in) with a simple Hello Word example.  This walkthrough will take you through the basics of VS Code extensibility.
---

# Example - Hello World

# 例子：Hello World

## Your First Extension

## 你的第一个扩展

This document will take you through creating your first VS Code extension ("Hello World") and will explain the basic VS Code extensibility concepts.  

本文档将带你创建第一个 VS Code 扩展（"Hello World"），并会讲解 VS Code 扩展性的基本概念。

In this walkthrough, you'll add a new command to VS Code which will display a simple "Hello World" message.  Later in the walkthrough, you'll interact with the VS Code editor and query for the user's currently selected text.

在此次演练中，你将添加一个新的 VS Code 命令用来显示一条简单的 "Hello World" 消息。然后，与 VS Code 中用户当前所选文本进行交互。

## Prerequisites

## 先决条件

You need [node.js](https://nodejs.org/en/) installed and available in your `$PATH`.

你需要安装 [node.js](https://nodejs.org/en/) 并添加到 `$PATH` 中。

## Generate a New Extension

## 创建新的扩展

The simplest way to add your own functionality to VS Code is through adding a command. A command registers a callback function which can be invoked from the Command Palette or with a key binding.

添加自定义功能到 VS Code 最简单方式莫过于添加一个命令，一个命令注册一个可以用命令面板或按键绑定呼叫的回调函数。

We have written a Yeoman generator to help get you started. Install Yeoman and the [Yeoman VS Code Extension generator](/docs/tools/yocode.md) and scaffold a new extension:

我们写了一个 Yeoman 生成器帮助你入门。安装 Yeoman 和 [Yeoman VS Code 扩展生成器](/docs/tools/yocode.md) 搭建新的扩展：

```sh
npm install -g yo generator-code
yo code
```

For the hello world extension, you can either create a **TypeScript** extension or a **JavaScript** one. For this example, we pick a **TypeScript** extension.

对于 hello world 扩展，你可以选择创建 **TypeScript** 或 **JavaScript** 扩展。本例中采用 **TypeScript** 扩展。

![The command generator](images/example-hello-world/generator.png)

## Running your Extension

## 运行你的扩展

* Launch VS Code, choose `File` > `Open Folder` and pick the folder that you generated.
* Press `kb(workbench.action.debug.start)` or click on the `Debug` icon and click `Start`.
* A new instance of VS Code will start in a special mode (`Extension Development Host`) and **this new instance is now aware of your extension**.
* Press `kb(workbench.action.showCommands)` and run the command named `Hello World`.
* Congratulations! You've just created and executed your first VS Code command!


* 启动 VS Code，点击 `文件` > `打开…` 并找到你生成的文件夹。
* 按下 `kb(workbench.action.debug.start)` 或点击 `调试` 和 `启动` 图标。
* VS Code 将在特定模式（`扩展开发主机`）启动一个新的实例，**该新实例现在知道你的扩展**。
* 按下 `kb(workbench.action.showCommands)` 并运行名为 `Hello World` 的命令。
* 共享！你刚刚创建并运行了你的第一 VS Code 命令！

![Running VS Code with an extension](images/example-hello-world/running.png)

## The Structure of an Extension

## 扩展结构

After running, the generated extension should have the following structure:

在运行之后，生成的扩展应具有以下结构：

```
.
├── .gitignore
├── .vscode                     // VS Code integration
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── .vscodeignore
├── README.md
├── src                         // sources
│   └── extension.ts			// extension.js, in case of JavaScript extension
├── test                        // tests folder
│   ├── extension.test.ts	   // extension.test.js, in case of JavaScript extension
│   └── index.ts	            // index.js, in case of JavaScript extension
├── node_modules
│   ├── vscode                  // language services
│   └── typescript              // compiler for typescript (TypeScript only)
├── out                         // compilation output (TypeScript only)
│   ├── src
│   |   ├── extension.js
│   |   └── extension.js.map
│   └── test
│       ├── extension.test.js
│       ├── extension.test.js.map
│       ├── index.js
│       └── index.js.map
├── package.json                // extension's manifest
├── tsconfig.json               // jsconfig.json, in case of JavaScript extension
├── typings                     // type definition files
│   ├── node.d.ts               // link to Node.js APIs
│   └── vscode-typings.d.ts     // link to VS Code APIs
└── vsc-extension-quickstart.md // extension development quick start
```

Let's go through the purpose of all these files and explain what they do:

让我们通过这些文件的目的来解释它们要做什么：

### The extension manifest: `package.json`

### 扩展清单：`package.json`

* Please read the [`package.json` extension manifest reference](/docs/extensionAPI/extension-manifest.md)
* More information on [`package.json` contribution points](/docs/extensionAPI/extension-points.md)
* Each VS Code extension must have a `package.json` file that describes it and its capabilities.
* VS Code reads this file during start-up and reacts to each `contributes` section immediately.


* 请阅读 [`package.json` 扩展清单参考](/docs/extensionAPI/extension-manifest.md)
* 更多关于 [`package.json` 贡献点](/docs/extensionAPI/extension-points.md) 的信息
* 每个 VS Code 扩展必须包含一个描述其自身及其能力的 `package.json` 文件
* VS Code 在启动时读取该文件，并立刻反应到每个 `contributes` 区。

#### Example TypeScript extension manifest

#### TypeScript 扩展清单的例子

```json
{
	"name": "myFirstExtension",
	"description": "",
	"version": "0.0.1",
	"publisher": "",
	"engines": {
		"vscode": "^0.10.1"
	},
	"categories": [
		"Other"
	],
	"activationEvents": [
		"onCommand:extension.sayHello"
	],
	"main": "./out/src/extension",
	"contributes": {
		"commands": [{
			"command": "extension.sayHello",
			"title": "Hello World"
		}]
	},
	"scripts": {
		"vscode:prepublish": "node ./node_modules/vscode/bin/compile",
		"compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
	},
	"devDependencies": {
		"typescript": "^1.7.5",
		"vscode": "^0.11.x"
	}
}
```

> **Note:** A JavaScript extension doesn't require the `scripts` field as no compilation is needed.

> **Note:** JavaScript 扩展不必请求 `scripts` 字段，即无需编译。

* This specific package.json describes an extension that:
 * *contributes* an entry to the Command Palette (`kb(workbench.action.showCommands)`) with the label `"Hello world"` that will invoke a command `"extension.sayHello"`.
 * requests to get loaded (*activationEvents*) when the command `"extension.sayHello"` is invoked.
 * has its *main* JavaScript code in a file called `"./out/src/extension.js"`.


* 这种特殊的 package.json 描述一个扩展：
 * *contributes* 添加到命令面板（`kb(workbench.action.showCommands)`）的条目，标签为 `"Hello world"`，其将呼叫 `"extension.sayHello"` 命令。
 * 请求在命令 `"extension.sayHello"` 被呼叫时加载（*activationEvents*）。
 * 调用其在 `"./out/src/extension.js"` 中的 **main** JavaScript 代码。

> **Note:** VS Code **does not** load the code of an extension eagerly at start-up. An extension must describe, through the [`activationEvents`](/docs/extensionAPI/activation-events.md) property under what conditions it should get activated (loaded).

> **Note:** VS Code **并不** 在启动时急着加载一个扩展的代码。扩展必须通过 [`activationEvents`](/docs/extensionAPI/activation-events.md) 属性描述在什么情况下应该被激活（加载）。

### Generated Code

### 生成代码

The generated extension's code is in `extension.ts` (or `extension.js` in case of a JavaScript extension):

生成的扩展在 `extension.ts` (在 JavaScript 扩展里为 `extension.js`) 中的代码：

```javascript
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-first-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});
	
	context.subscriptions.push(disposable);
}
```

* Each extension should export from its main file a function named `activate()`, which VS Code will invoke **only once** when any of the `activationEvents` described in the `package.json` file occur.
* If an extension makes use of OS resources (e.g. spawns processes), the extension can export from its main file a function named `deactivate()` where it can do clean-up work and VS Code will invoke that function on shutdown.
* This specific extension imports the `vscode` API and then registers a command, associating a function to be called when the command `"extension.sayHello"` gets invoked. The command's implementation displays a "Hello world" message in VS Code.


* 每个扩展必须从它的 main 文件导出 `activate()` 函数，当任何在 `package.json` 中 `activationEvents` 所描述的事件发生时，VS Code 将呼叫 **一次** 该函数。
* 如果扩展使用了系统资源（例如：产生进程），扩展可以从 main 文件中导出 `deactivate()` 函数做清理工作，VS Code 将在关闭时激活该函数。
* 该指定扩展导出的 `vscode` API 注册了一个命令，当命令 `"extension.sayHello"` 被呼叫时调用其关联的函数。该命令的实现在 VS Code 里显示 "Hello world" 信息。

> **Note:** The `contributes` section of the `package.json` adds an entry to the Command Palette.  The code in extension.ts/.js defines the implementation of `"extension.sayHello"`.

> **Note:** `package.json` 的 `contributes` 区添加了一个条目到命令面板。在 extension.ts/.js 中代码定义了 `"extension.sayHello"` 的实现。

> **Note:** For TypeScript extensions, the generated file `out/src/extension.js` will be loaded at runtime and executed by VS Code.

> **Note:** 对于 TypeScript 扩展，生成文件 `out/src/extension.js` 将在 VS Code 运行时加载并执行。

### Miscellaneous files

### 杂项文件

* `.vscode/launch.json` defines launching VS Code in the Extension Development mode. It also points with `preLaunchTask` to a task defined in `.vscode/tasks.json` that runs the TypeScript compiler.
* `.vscode/settings.json` by default excludes the `out` folder.  You can modify which file types you want to hide.
* `.gitignore` - Tells Git version control which patterns to ignore.
* [`.vscodeignore`](/docs/tools/vscecli.md#advanced-usage) - Tells the packaging tool which files to ignore when publishing the extension.
* `README.md` - README file describing your extension for VS Code users.
* `vsc-extension-quickstart.md` - A Quick Start guide for you.
* `test/extension.test.ts` - you can put your extension unit tests in here and run your tests against the VS Code API (see [Testing Your Extension](/docs/extensions/testing-extensions.md))


* `.vscode/launch.json` 定义在扩展开发模式如何启动 VS Code。它还能指定 `preLaunchTask` 为一个在 `.vscode/tasks.json` 里定义的任务，如运行 TypeScript 编译器。
* `.vscode/settings.json` 默认排除 `out` 文件夹。你可以修改为你想隐藏的文件类型。
* `.gitignore` - 告诉 Git 版本控制忽略哪些匹配文件。
* [`.vscodeignore`](/docs/tools/vscecli.md#advanced-usage) - 告诉打包工具在发布扩展时忽略哪些文件。
* `README.md` - README 文件为 VS Code 用户描述你的扩展。
* `vsc-extension-quickstart.md` - 为你提供的一份快速入门指南。
* `test/extension.test.ts` - 你可以把扩展的单元测试放在这里，并运行针对 VS Code API 的测试(查看 [测试你的扩展](/docs/extensions/testing-extensions.md))

## Extension Activation

## 扩展激活

Now that the roles of the files included in the extension are clarified, here is how your extension gets activated:

现在扩展文件中包含的规则已经明确，它说明你的扩展如何被激活：

* The extension development instance discovers the extension and reads its `package.json` file.
* Later when you press `kb(workbench.action.showCommands)`:
 * The registered commands are displayed in the Command Palette.
 * In this list there is now an entry `"Hello world"` that is defined in the `package.json`.
* When selecting the `"Hello world"` command:
 * The command `"extension.sayHello"` is invoked:
   * An activation event `"onCommand:extension.sayHello"` is created.
   * All extensions listing this activation event in their `activationEvents` are activated.
     * The file at `./out/src/extension.js` gets loaded in the JavaScript VM.
     * VS Code looks for an exported function `activate` and calls it.
     * The command `"extension.sayHello"` is registered and its implementation is now defined.
 * The command `"extension.sayHello"` implementation function is invoked.
 * The command implementation displays the "Hello World" message.


* 扩展开发实例发现扩展并读取其 `package.json` 文件。
* 接着当你按下 `kb(workbench.action.showCommands)`：
* 已注册命令被显示在命令面板中。
* 在该列表中现在有一个 `"Hello world"` 条目，其被定义在 `package.json` 中。
* 当选择 `"Hello world"` 命令：
* 命令 `"extension.sayHello"` 被激活：
  * 一个激活事件 `"onCommand:extension.sayHello"` 被创建。
  * 所有在其 `activationEvents` 中列出该激活事件的扩展被激活。
    * `./out/src/extension.js` 文件在 JavaScript VM 中被加载。
    * VS Code 找到导出的 `activate` 函数并调用它。
    * 命令 `"extension.sayHello"` 被注册并且其实现也被定义。
* 命令 `"extension.sayHello"` 的实现函数被呼叫。
* 该命令的实现显示 "Hello World" 消息。

## Debugging your Extension

## 调试你的扩展

Simply set a breakpoint, for example inside the registered command and run the `"Hello world"` command in the Extension Development VS Code instance.

简单地设置一个断点，比如，在注册命令里面，并在 VS Code 的扩展开发实例上运行 `"Hello world"` 命令。

![Debugging the extension](images/example-hello-world/hitbp.png)

> **Note:** For TypeScript extensions, even though VS Code loads and executes `out/src/extension.js`, you are actually able to debug the original TypeScript code due to the generated source map `out/src/extension.js.map` and VS Code's debugger support for source maps.

> **Note:** 对于 TypeScript 扩展, 尽管 VS Code 加载并执行 `out/src/extension.js`，但实际上你可以调试原始的 TypeScript 代码，这是由于生成的 source map `out/src/extension.js.map`，而 VS Code's 调试器恰好支持 source maps。

> **Tip:** The Debug Console will show all the messages you log to the console.

> **Tip:** 调试控制台将显示所有你记录到控制台的消息。

To learn more about the extension [development environment](/docs/extensions/debugging-extensions.md).

学习更多关于扩展 [开发环境](/docs/extensions/debugging-extensions.md)。

## A Simple Change

## 简单地修改

In `extension.ts` (or `extension.js`, in a JavaScript extension), try replacing the `extension.sayHello` command implementation to show the number of characters selected in the editor:

打开 `extension.ts`（在JavaScript 扩展里为 `extension.js`），试试替换掉其 `extension.sayHello` 命令的实现，修改为显示编辑器中选择字符的数量：

```javascript
var editor = vscode.window.activeTextEditor;
if (!editor) {
	return; // No open text editor
}

var selection = editor.selection;
var text = editor.document.getText(selection);

// Display a message box to the user
vscode.window.showInformationMessage('Selected characters: ' + text.length);
```

> **Tip:** Once you make changes to the extension source code, you need to restart the Extension Development instance of VS Code. You can do that by using `kbstyle(Ctrl+R)` (Mac: `kbstyle(Cmd+R)`) in the second instance or by clicking the Restart button at the top of your primary VS Code instance.

> **Tip:** 一旦你修改了扩展源码，你需要重启 VS Code 的扩展开发实例。通过在第二个例子里使用 `kbstyle(Ctrl+R)` (Mac: `kbstyle(Cmd+R)`) 重启，或者通过点击 VS Code 主实例顶部重启按钮。

![Running the modified extension](images/example-hello-world/selection-length.png)

## Installing your Extension Locally

## 在本地安装你的扩展

So far, the extension you have written only runs in a special instance of VS Code, the Extension Development instance. To get your extension running in all instances of VS Code, you need to copy it to a new folder under your local extensions folder:

到目前为止, 你编写的扩展只在 VS Code 特定的扩展开发实例上运行。为了使你的扩展能在所有 VS Code 实例上运行，你需要将它拷贝到你得本地扩展文件夹中。

* Windows: `%USERPROFILE%\.vscode\extensions`
* Mac/Linux: `$HOME/.vscode/extensions`

## Publishing your Extension

## 发布你的扩展

Read about how to [Share an Extension](/docs/tools/vscecli.md).

阅读如何 [分享扩展](/docs/tools/vscecli.md).

## Next Steps

## 下一步

In this walkthrough, we've seen a very simple extension. For a more detailed example, see the [Word Count Example](/docs/extensions/example-word-count.md) which shows how to target a specific language (Markdown) and listen to the editor's document changed events.

在此次演练中，我们看到了一个非常简单的扩展。一个更加详细的例子在 [Word Count Example](/docs/extensions/example-word-count.md) 中，其展示了如何在特定语言目标下监听编辑器文档变更事件。

If you'd like to read more generally about the extension APIs, try these topics:

如果你想阅读更多关于扩展 APIs 的通用内容，试试下面主题：

* [Extension API Overview](/docs/extensionAPI/overview.md) - Learn about the full VS Code extensibility model.
* [API Patterns and Principles](/docs/extensions/patterns-and-principles.md) - VS Code extensibility is based on several guiding patterns and principles.
* [Contribution Points](/docs/extensionAPI/extension-points.md) - Details about the various VS Code contribution points.
* [Activation Events](/docs/extensionAPI/activation-events.md) - VS Code activation events reference

* [扩展 API](/docs/extensionAPI/overview.md) - Learn about the full VS Code extensibility model.
* [API 模式与原则](/docs/extensions/patterns-and-principles.md) - VS Code 扩展性基于几个指导模式与原则。
* [贡献点](/docs/extensionAPI/extension-points.md) - 关于各种 VS Code 贡献点的详细信息。
* [激活事件](/docs/extensionAPI/activation-events.md) - VS Code 激活事件参考

## Common Questions

## 常见问题

Nothing yet

暂时没有


