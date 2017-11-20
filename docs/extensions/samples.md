---
Order: 8
Area: extensions
TOCTitle: Additional Examples
ContentId: B32601A8-27ED-4D97-BA83-F1C8C945C635
PageTitle: Visual Studio Code Extension Examples
DateApproved: 11/8/2017
MetaDescription: Learn from existing Visual Studio Code extension examples.
---
# VS Code Extension Examples

## Extension Basics

We have two walkthroughs that cover many of the core concepts - start with these:

* **[Your First Extension](/docs/extensions/example-hello-world.md)** - Explains the core extensibility concepts with a walkthrough.
* **[Word Count Extension](/docs/extensions/example-word-count.md)** - Another walkthrough building on the last.

## Sample Extensions

Sample|Description|Type|In Marketplace
------|-----------|----|---------
**[Word Count](https://github.com/Microsoft/vscode-wordcount)**|Adds a word count to the status bar for Markdown files that updates on editing events.  We have a [walkthrough on how this was created](/docs/extensions/example-word-count.md).|[Extension](/docs/extensions/example-hello-world.md)|Y
**[MDTools](https://github.com/Microsoft/vscode-MDTools)**|Work with selections and update based on common text processing e.g. ToUpper, HTMLEncode, ...|[Extension](/docs/extensions/example-hello-world.md)|Y
**[Decorator](https://github.com/Microsoft/vscode-extension-samples/tree/master/decorator-sample)**|Shows how to decorate editor text with a border, colors, and a custom cursor as well as add an overview ruler highlight.|[Extension](/docs/extensions/example-hello-world.md)|N
**[Preview Html](https://github.com/Microsoft/vscode-extension-samples/tree/master/previewhtml-sample)**|Shows how to create virtual documents together with the `vscode.previewHtml` [command](/docs/extensionAPI/vscode-api-commands.md#commands).|[Extension](/docs/extensions/example-hello-world.md)|Y
**[Document Content Provider](https://github.com/Microsoft/vscode-extension-samples/tree/master/contentprovider-sample)**|Shows how to use API commands and how to create _virtual_ documents using the `TextDocumentContentProvider`-API.|[Extension](/docs/extensions/example-hello-world.md)|Y
**[TSLint](https://github.com/Microsoft/vscode-tslint)**|Lint your TypeScript files based on TSLint|[Language Server](/docs/extensions/example-language-server.md)|Y
**[Mock Debugger](https://github.com/Microsoft/vscode-mock-debug)**|Helps you build and test a debugger.|[Debuggers](/docs/extensions/example-debuggers.md)|Y
**[Go Language Support](https://github.com/microsoft/vscode-go)**|Rich language support for [Go Lang](https://golang.org/) - IntelliSense, Debug, Peek, Rename, Syntax, ...|[Extension](/docs/extensionAPI/vscode-api.md#languages)|Y
**[Tree Data Provider](https://github.com/Microsoft/vscode-extension-samples/tree/master/tree-view-sample)**|Shows how to use `TreeDataProvider` API and contribute a custom view to VS Code|[Extension](/docs/extensionAPI/vscode-api.md#TreeDataProvider)|N

## Tools to Help you build an Extension

Tool|Purpose
----|-------
**[Extension Generator](/docs/extensions/yocode.md)**|To help you getting started implementing an extension, we have a [Yeoman](http://yeoman.io/) generator.  This creates all the initial settings you need for the development environment to work well and includes the API Typing files and any relevant modules.  You can find the generator source code [here](https://github.com/Microsoft/vscode-generator-code).
**[Debugging Extensions](/docs/extensions/debugging-extensions.md)**|We have worked hard to provide an easy way to develop, debug and locally test your extensions.
**[Publishing Tool](/docs/extensions/publish-extension.md)**|Once you have a working extension, it's time to share it in the [extension Marketplace](/docs/editor/extension-gallery.md). We have a simple command line tool for this. You can find the source code [here](https://github.com/Microsoft/vsce).

## Tutorial samples

Tutorial|Description
--------|-----------
**[Node.js](https://github.com/Microsoft/vscode-samples)**|Final output of the Node.js Express [tutorial](/docs/nodejs/nodejs-tutorial.md).

## Next Steps

* [Extension Marketplace](/docs/editor/extension-gallery.md) - Learn more about VS Code's public extension Marketplace.
