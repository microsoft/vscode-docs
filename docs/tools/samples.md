---
Order: 3
Area: tools
TOCTitle: Samples
ContentId: B32601A8-27ED-4D97-BA83-F1C8C945C635
PageTitle: Visual Studio Code Extension Samples
DateApproved: 4/14/2016
MetaDescription: Learn from existing extension samples.
---


# VS Code Extension Samples

This is a list to make it easy to see where all the samples are...

We have two walkthroughs that cover many of the core concepts - start with these:

* **[Your First Extension](/docs/extensions/example-hello-world.md)** - explains the core extensibility concepts with a walkthrough
* **[Word Count Extension](/docs/extensions/example-word-count.md)** - another walkthrough building on the last

## Sample Extensions

Sample|Description|Type|In Marketplace
------|-----------|----|---------
**[Word Count](https://github.com/Microsoft/vscode-wordcount)**|Adds a word count to the status bar for Markdown files that updates on editing events.  We have a [walkthrough on how this was created](/docs/extensions/example-word-count.md).|[Extension](/docs/extensions/example-hello-world.md)|Y
**[MDTools](https://github.com/Microsoft/vscode-MDTools)**|Work with selections and update based on common text processing e.g. ToUpper, HTMLEncode, ...|[Extension](/docs/extensions/example-hello-world.md)|Y
**[Decorator](https://github.com/Microsoft/vscode-extension-samples/tree/master/decorator-sample)**|Shows how to decorate editor text with a border, colors, and a custom cursor as well as add an overview ruler highlight.|[Extension](/docs/extensions/example-hello-world.md)|N
**[TextDocumentProvider](https://github.com/Microsoft/vscode-extension-samples/tree/master/textdocumentprovider-sample)**|Shows how to create virtual documents and preview them.|[Extension](/docs/extensions/example-hello-world.md)|N
**[TSLint](https://github.com/Microsoft/vscode-tslint)**|Lint your TypeScript files based on TSLint|[Language Server](/docs/extensions/example-language-server.md)|Y
**[Spelling and Grammar Checker](https://github.com/Microsoft/vscode-spell-check)**|Configurable Markdown spelling and grammar checker.  Calls an external web service for checking and supports activation, add to dictionary, error mapping.  Watches for config file changes in real time.|[Extension](/docs/extensions/example-hello-world.md)|Y
**[Mock Debugger](https://github.com/Microsoft/vscode-mock-debug)**|Helps you build and test a debugger.|[Debuggers](/docs/extensions/example-debuggers.md)|Y
**[Go Language Support](https://github.com/microsoft/vscode-go)**|Rich language support for [Go Lang](https://golang.org/) - IntelliSense, Debug, Peek, Rename, Syntax, ...|[Extension](/docs/extensionAPI/vscode-api.md#languages)|Y



## Tools to Help you build an Extension

Tool|Purpose
----|-------
**[Extension Generator](/docs/tools/yocode.md)**|To help you getting started implementing an extension, we have a [Yeoman](http://yeoman.io/) generator.  This creates all the initial settings you need for the development environment to work well and includes the API Typing files and any relevant modules.  You can find the generator source [here](https://github.com/Microsoft/vscode-generator-code).
**[Debugging Extensions](/docs/extensions/debugging-extensions.md)**|We have worked hard to provide an easy way to develop, debug and locally test your extensions.
**[Publishing Tool](/docs/tools/vscecli.md)**|Once you have a working extension, it's time to [share it](/docs/tools/vscecli.md) in the [extension Marketplace](/docs/editor/extension-gallery.md). We have a simple command line tool for this. You can find the source code [here](https://github.com/Microsoft/vsce).

## Runtime samples

* [Node.js](https://github.com/Microsoft/vscode-samples)

## Next Steps

* [Extension Marketplace](/docs/editor/extension-gallery.md) - Learn more about VS Code's public extension Marketplace.

## Common Questions

Nothing yet
