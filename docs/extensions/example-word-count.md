---
Order: 3
Area: extensions
TOCTitle: Example-Word Count
ContentId: 4D9132DC-CDDB-4E07-B2DD-9A7E168BE384
PageTitle: Visual Studio Code Example - Word Count Extension
DateApproved: 7/7/2016
MetaDescription: The Word Count extension (plug-in) example takes you deeper into the Visual Studio Code extensibility model, showing how to interact with the editor and manage extension and VS Code resources.
---

# Example - Word Count

# 例子：单词计数

This document assumes you have read [Your First Extension](/docs/extensions/example-hello-world.md) which covers the basics of VS Code extensibility.

本文假定你已阅读 [你的第一个扩展](/docs/extensions/example-hello-world.md) 中涵盖的 VS Code 扩展性基础知识。

Word Count is an end to end tutorial to show you how to create an extension to aid in Markdown authoring.  Before we get into how all of this works, let's have a quick demo of the core features you will be building so you know what to expect.

Word Count 是一个手把手教程，向你展示了如何创建一个为 Markdown 写作提供帮助的扩展。在我们进入怎样完成此工作之前，让我们快速演示一下你将构建的核心功能，所以你知道将会发生什么。

Whenever a `Markdown` file is edited, a status bar message is added.  The message includes the current word count and updates as you type and move from file to file:

每当 `Markdown` 文件被编辑后，一条状态栏消息被添加。该消息包含当前单词计数并在在你输入后或从另一个文件移动到该文件时更新：

![Word Count on Status Bar](images/example-word-count/wordcountevent2.gif)

> **Tip:** The finished sample is available from [this GitHub repository](https://github.com/microsoft/vscode-wordcount) should you have any issues.

> **Tip:** 如何你有任何问题，可从 [该 GitHub 仓库](https://github.com/microsoft/vscode-wordcount) 获得完整的例子。


## Overview

## 概述

This example has three sections which will take you through a set of related concepts:

该例子有三个区域带你完成一组相关概念：

1. [Update the Status Bar](/docs/extensions/example-word-count.md#update-the-status-bar) - display custom text in the VS Code `Status Bar`
2. [Subscribing to Events](/docs/extensions/example-word-count.md#subscribing-to-events) - updating the `Status Bar` based on editor events
3. [Disposing Extension Resources](/docs/extensions/example-word-count.md#disposing-extension-resources) - release resources like event subscriptions or UI handles

1. [更新状态栏](/docs/extensions/example-word-count.md#update-the-status-bar) - 在 VS Code 的 `Status Bar` 中显示自定义文本
2. [订阅事件](/docs/extensions/example-word-count.md#subscribing-to-events) - 基于编辑器事件更新 `Status Bar`
3. [销毁扩展资源](/docs/extensions/example-word-count.md#disposing-extension-resources) - 释放资源，如事件订阅或 UI 处理器

First make sure you have the latest VS Code extension generator installed then run it:

首先确保你安装了最新版的 VS Code 生成器并运行它：

```bash
npm install -g yo generator-code
yo code
```

This will open up the extension generator - we will base this example on the TypeScript `New Extension` option. For now, simply fill in the fields the same way you see them completed in the image below (using 'WordCount' as the extension name and your own name as the publisher).

这将会打开扩展生成器：使用 **New Extension (TypeScript)** 选项建立该例子。现在，只需填写相应的字段，旧跟你在下面图片中看到的一样（扩展名为 'WordCount'，发布者改为你自己的名字）。

![Yo Code Word Count Example Output](images/example-word-count/yo1.png)

You can now open VS Code as described in the generator output:

现在可以在生成器输出完毕后打开 VS Code：

```bash
cd WordCount
code .
```

## Run the Extension

## 运行扩展

Before we go on, we can run the extension to make sure everything works as expected by pressing `kb(workbench.action.debug.start)`. As you saw in the previous "Hello World" walkthrough, VS Code opens another window (the **[Extension Development Host]** window) in which your extension will be loaded. You should find the "Hello World" command in the Command Palette (press `kb(workbench.action.showCommands)`) and when you select it, you will see an information box at the top of the window saying "Hello World".

在继续下一步之前，通过按下 `kb(workbench.action.debug.start)` 运行扩展确保一切工作正常。正如你在前面的 "Hello World" 演练中所见，扩展被加载到 VS Code 打开的另一个窗口（**[扩展主机]** 窗口）里。你能在命令面板（按下 `kb(workbench.action.showCommands)`）中找到 "Hello World" 命令，当你选择它时，你会看到一个信息框在窗口顶部说 "Hello World"。

Now that you have confirmed that the extension is running properly, you can keep the extension development window open if you like. To test out any changes that you make to your extension, you can either press `kb(workbench.action.debug.continue)` again in the development window or reload the extension development window by pressing `kbstyle(Ctrl+R)` (Mac: `kbstyle(Cmd+R)`).

现在你已确认扩展运行正常，可以保持扩展开发窗口，以便测试出任何对扩展的变更。按下 `kb(workbench.action.debug.continue)` 继续开发窗口，或通过按下 `kbstyle(Ctrl+R)` (Mac: `kbstyle(Cmd+R)`) 重启扩展开发窗口。

## Update the Status Bar

## 更新状态栏

Replace the contents of the generated `extension.ts` file with the code shown below. It declares and instantiates a `WordCounter` class which can count words and shows them in the VS Code Status Bar.  The "Hello Word" command will call `updateWordCount` when invoked.

用如下代码替换掉 `extension.ts` 文件的内容。它声明并实例化一个 `WordCounter` 类，其能在 VS Code 状态栏显示计算出来的单词数量。当 "Hello Word" 命令被呼叫时，将调用 `updateWordCount` 函数。

```javascript
// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error).
    // This line of code will only be executed once when your extension is activated.
    console.log('Congratulations, your extension "WordCount" is now active!');

    // create a new word counter
    let wordCounter = new WordCounter();

    var disposable = commands.registerCommand('extension.sayHello', () => {
        wordCounter.updateWordCount();
    });

    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(wordCounter);
    context.subscriptions.push(disposable);
}

class WordCounter {

    private _statusBarItem: StatusBarItem;

    public updateWordCount() {

        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

         let doc = editor.document;

        // Only update status if an MarkDown file
        if (doc.languageId === "markdown") {
            let wordCount = this._getWordCount(doc);

            // Update the status bar
            this._statusBarItem.text = wordCount !== 1 ? `${wordCount} Words` : '1 Word';
            this._statusBarItem.show();
        } else { 
            this._statusBarItem.hide();
        }
    }

    public _getWordCount(doc: TextDocument): number {

        let docContent = doc.getText();

        // Parse out unwanted whitespace so the split is accurate
        docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        let wordCount = 0;
        if (docContent != "") {
            wordCount = docContent.split(" ").length;
        }

        return wordCount;
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}
```

Now let's try our updates to the extension.

现在来试试我们更新的扩展。

We have the compilation of the TypeScript file set on a watch (in the extension's .vscode\tasks.json file) so there is no need to re-build.  Simply hit `kbstyle(Ctrl+R)` in the **[Extension Development Host]** window where your code is running and the extension will reload (you can also just `kb(workbench.action.debug.start)` from your primary development window).  We still need to activate the code in the same way as before with the "Hello World" command.  Assuming you are in a Markdown file, your Status Bar will display the word count.

我们有设置监视（在扩展的 .vscode\tasks.json 文件里）TypeScript 文件并编译，所以无需重新编译。只要在 **[扩展开发主机]** 窗口中按下 `kbstyle(Ctrl+R)`，你的扩展将重新加载并运行代码（你也可以从主开发窗口直接 `kb(workbench.action.debug.start)` ）。我们仍用与之前相同的 "Hello World" 激活代码。假设你打开的是一个 Markdown 文件，在状态栏上会显示单词统计。

![Working Word Count](images/example-word-count/wordcount2.png)

This is a good start but it would be cooler if the count updated as your file changed.

这是一个好的开始，但如果在文件修改后就更新单词统计会更酷。

## Subscribing to Events

## 订阅事件

Let's hook your helper class up to a set of events.

让我们 hook 助手类到一组事件上。

* `onDidChangeTextEditorSelection` - Event is raised as the cursor position changes
* `onDidChangeActiveTextEditor` - Event is raised as the active editor changes.


* `onDidChangeTextEditorSelection` - 光标位置改变后触发事件
* `onDidChangeActiveTextEditor` - 活跃编辑器变更后触发事件

To do this, we'll add a new class into the `extension.ts` file. It will set up subscriptions to those events and ask the `WordCounter` to update the word count. Also note how this class manages the subscription as Disposables and how it stops listing when being disposed itself.

为了实现这一点，添加一个新的类到 `extension.ts` 里。其设置订阅这些事件，并告诉 `WordCounter` 更新单词统计。另外要注意这个类是如何管理销毁订阅，以及它如何在开始销毁自身时停止列表。

Add the `WordCounterController` as shown below to the bottom of the `extension.ts` file.

在 `extension.ts` 里添加如下所示的 `WordCounterController` 函数。

```javascript
class WordCounterController {

    private _wordCounter: WordCounter;
    private _disposable: Disposable;

    constructor(wordCounter: WordCounter) {
        this._wordCounter = wordCounter;
        this._wordCounter.updateWordCount();

        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = [];
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

        // update the counter for the current file
        this._wordCounter.updateWordCount();

        // create a combined disposable from both event subscriptions
        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        this._wordCounter.updateWordCount();
    }
}
```

We no longer want the Word Count extension to be loaded when a command is invoked but instead be available for each *Markdown* file. 

我们不再希望每当命令被呼叫时，单词统计扩展就被加载。除非是在 **Markdown** 文件里。

First, replace the body of the `activate` function with this:

首先，替换 `activate` 函数体为下面代码：

```javascript
// Use the console to output diagnostic information (console.log) and errors (console.error).
// This line of code will only be executed once when your extension is activated.
console.log('Congratulations, your extension "WordCount" is now active!');

// create a new word counter
let wordCounter = new WordCounter();
let controller = new WordCounterController(wordCounter);

// Add to a list of disposables which are disposed when this extension is deactivated.
context.subscriptions.push(controller);
context.subscriptions.push(wordCounter);
```

Second, we must make sure the extension is activated upon the opening of a `Markdown` file.  To do this, we'll need to modify the `package.json` file.  Previously the extension was activated via the `extension.sayHello` command which we no longer need and so we can delete the entire `contributes` attribute from `package.json`:

其次，确保扩展只在打开 `Markdown` 文件时才激活。要做到这一点，需要修改 `package.json` 文件。之前扩展通过 `extension.sayHello` 命令激活，但我们不再需要这个，所以从 `package.json` 里删除 `contributes` 的全部属性：

```json
    "contributes": {
        "commands":
            [{
                "command": "extension.sayHello",
                "title": "Hello World"
            }
        ]
    },
```

Now change your extension so that it is activated upon the opening of a *Markdown* file by updating the `activationEvents` attribute to this:

现在通过更新 `activationEvents` 的属性，让扩展只在打开 `Markdown` 文件时才激活。

```json
    "activationEvents": [
        "onLanguage:markdown"
    ]
```

The  [`onLanguage:${language}`](/docs/extensionAPI/activation-events.md#activationeventsonlanguage) event takes the language id, in this case "markdown", and will be raised whenever a file of that language is opened.

[`onLanguage:${language}`](/docs/extensionAPI/activation-events.md#activationeventsonlanguage) 事件使用一个语言 ID，在本例中为 "markdown"，每当一个该语言的文件被打开时触发该事件。

Run the extension by either doing a window reload `kbstyle(Ctrl+R)` or with `kb(workbench.action.debug.start)` and then start editing a Markdown file.  You should now should have a live updating Word Count.

通过 `kbstyle(Ctrl+R)` 或 `kb(workbench.action.debug.start)` 其中一个使窗口重载来运行扩展，然后开始编辑 Markdown 文件。你现在应该能实时更新单词统计。


![Word Count Updating on Events](images/example-word-count/wordcountevent2.gif)

If you set a breakpoint on the `activate` function, you'll notice that it is only called once when the first Markdown file is opened.  The `WordCountController` constructor runs and subscribes to the editor events so that the `updateWordCount` function is called as Markdown files are opened and their text changes. 

通过在 `activate` 函数上设置一个断点，你会发现当第一个 Markdown 文件被打开时，它仅调用一次。`WordCountController` 构造器运行并订阅了编辑器事件，这样在 Markdown 文件被打开或其文本被修改时，`updateWordCount` 函数将被调用。

## Customizing the Status Bar

## 自定义状态栏

We've seen how you can display formatted text on the Status Bar.  VS Code allows you to customize your Status Bar additions even further with color, icons, tooltips and more.  Using IntelliSense, you can see the various `StatusBarItem` fields.  Another great resource for learning about the VS Code extensibility APIs is the `vscode.d.ts` typings file included in your generated Extension project.  Open `node_modules\vscode\vscode.d.ts` in the editor, you'll see the complete VS Code extensibility API with comments.

我们已经看到了如何在状态栏显示格式化文本。VS Code 允许使用使用颜色、图标、工具提示等来自定义状态栏附加。使用智能感知，能看到各种 `StatusBarItem` 字段。另一个学习有关 VS Code 扩展性 API 的更好资源，是包含在生成的扩展项目下 `vscode.d.ts` 定义文件里。

![vscode-d-ts file](images/example-word-count/vscode-d-ts.png)

Replace the StatusBarItem update code with:

更新代码替换掉 StatusBarItem：

```javascript
    // Update the status bar
    this._statusBarItem.text = wordCount !== 1 ? `$(pencil) ${wordCount} Words` : '$(pencil) 1 Word';
    this._statusBarItem.show();
```

to display a [GitHub Octicon](https://octicons.github.com) `pencil` icon to the left of the calculated word count.

在单词统计左边显示 [GitHub Octicon](https://octicons.github.com) 的 `pencil` 图标。

![Word Count with pencil icon](images/example-word-count/wordcount-pencil.png)

## Disposing Extension Resources

## 销毁扩展资源

Now we'll take a deeper look at how extensions should handle VS Code resources through [Disposables](/docs/extensions/patterns-and-principles.md#disposables).

现在我们深入了解扩展应该如何通过 [销毁](/docs/extensions/patterns-and-principles.md#disposables) 处理 VS Code 资源。

When an extension is activated, it is passed an `ExtensionContext` object which has a `subscriptions` collection of Disposables. Extensions can add their Disposable objects to this collection and VS Code will dispose of those objects when the extension is deactivated.

当扩展被激活时，其传递一个具有 `subscriptions` 销毁集合的 `ExtensionContext` 对象。扩展可以添加它的销毁对象到这个集合里，VS Code 将在扩展被释放时销毁那个对象。

Many VS Code APIs which create workspace or UI objects (e.g. `registerCommand`) return a Disposable and extensions can remove these elements from VS Code by calling their dispose method directly.

许多 VS Code API 在创建工作区或 UI 对象（例如，`registerCommand`）时会返回一个 Disposable，扩展可以通过直接调用它的销毁方法，从 VS Code 中移除这些元素。

Events are another example where `onDid*` event subscriber methods return a Disposable.  Extensions unsubscribe to an event by disposing the event's Disposable.  In our example, `WordCountController` handles the event subscription Disposables directly by keeping its own Disposable collection which it cleans up on deactivation.

事件的另一个例子是 `onDid*` 事件的订阅方法返回一个 Disposable。扩展通过销毁事件的 Disposable 退订一个事件。在我们的例子中，`WordCountController` 处理事件订阅的 Disposables 是直接通过保持其自身 Disposable 集合，在释放时清理它。

```javascript
    // subscribe to selection change and editor activation events
    let subscriptions: Disposable[] = [];
    window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
    window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

    // create a combined disposable from both event subscriptions
    this._disposable = Disposable.from(...subscriptions);
```

## Installing your Extension Locally

## 在本地安装你的扩展

So far, the extension you have written only runs in a special instance of VS Code, the Extension Development Host instance. To make your extension available to all VS Code instances, copy the extension folder contents to a new folder under [your `.vscode/extensions` folder](/docs/extensions/install-extension.md#your-extensions-folder).

到目前为止, 你编写的扩展只在 VS Code 特定的扩展开发实例上运行。为了使你的扩展能在所有 VS Code 实例上运行，你需要将它拷贝到 [你的 `.vscode/extensions` 文件夹](/docs/extensions/install-extension.md#your-extensions-folder) 下面。


## Publishing your Extension

## 发布你的扩展

Read about how to [Share an Extension](/docs/tools/vscecli.md).

阅读如何 [分享扩展](/docs/tools/vscecli.md).

## Next Steps

## 下一步

Read on to find out about:

阅读了解相关的内容：

* [Yo Code](/docs/tools/yocode.md) - learn about other options in Yo Code
* [Extension API](/docs/extensionAPI/overview.md) - Get an overview of the Extension API
* [Customization](/docs/customization/overview.md) - Themes, settings and keyboard bindings
* [Publishing Tool](/docs/tools/vscecli.md) - Learn how to publish an extension to the public Marketplace
* [Editor API](/docs/extensionAPI/vscode-api.md#window) - Learn more about Text Documents, Text Editors and editing text

* [Yo Code](/docs/tools/yocode.md) - 学习 Yo Code 的其他选项
* [扩展 API](/docs/extensionAPI/overview.md) - 获取扩展 API 的概述
* [定制](/docs/customization/overview.md) - 主题、设置及按键绑定
* [发布工具](/docs/tools/vscecli.md) - 学习如何发布一个扩展到公共市场中
* [编辑器 API](/docs/extensionAPI/vscode-api.md#window) - 学习文本文档、文本编辑器及编辑文本

## Common Questions

## 常见问题

Nothing yet

暂时没有


