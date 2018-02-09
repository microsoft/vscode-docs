---
Order: 1
Area: extensions
TOCTitle: Overview
ContentId: AD26EFB1-FFC6-4284-BAB8-F3BCB8294728
PageTitle: Building extensions for VS Code
DateApproved: 2/7/2018
MetaDescription: Visual Studio Code has a rich extensibility model for interacting with and adding to the tool.  Learn how to create your own extensions (plug-ins) for Visual Studio Code.
---
# Extending Visual Studio Code

If you are interested in extending VS Code, you are in the right place. Here we present an outline of the VS Code extensibility documentation and how to quickly build your first VS Code extension.  If you're curious about our design approach to extensibility for VS Code, you can read about it [here](/docs/extensionAPI/patterns-and-principles.md).

If you just want to use existing extensions, see the [Extension Marketplace](/docs/editor/extension-gallery.md) topic where we show you how to find and install extensions from the VS Code [Marketplace](https://marketplace.visualstudio.com/VSCode).

All VS Code extensions share a common model of contribution (registration), activation (loading) and access to the VS Code extensibility API. There are however two special flavors of VS Code extensions, language servers and debuggers, which have their own additional protocols and are covered in their own sections of the documentation.

1. [Extensions](/docs/extensions/overview.md#extensions) - the base building block
2. [Language Servers](/docs/extensions/overview.md#language-servers) - for high cost IO or CPU intensive tasks
3. [Debuggers](/docs/extensions/overview.md#debug-adapter) - wire up an external debugger through a Debug Adapter

![VS Code extensibility architecture](images/overview/extensibility-architecture.png)

## Extensions

All extensions when activated run in our shared extension host process.  This separate process for extensions ensures that VS Code remains responsive through-out.

Extensions include support for:

* **Activation** - load an extension when a specific file type is detected, when a specific file exists, or when a command is selected via the Command Palette or a key combination
* **Editor** - work with the editor's content - read and manipulate text, leverage selection(s)
* **Workspace** - access open editors, the status bar, information messages and more
* **Eventing** - connect to the editor life-cycle events such as: open, close, change, and more
* **Evolved editing** - create providers for rich language support including IntelliSense, Peek, Hover, Diagnostics and much, much more

We have two end-to-end tutorials to get you going on extension basics:

1. **[Hello World](/docs/extensions/example-hello-world.md)** - generate a basic extension, understand an extension's folder structure, the extension manifest, learn how activation works, run and debug your extension and install it locally.
2. **[Word Count](/docs/extensions/example-word-count.md)** - activate based on a specific file type, update the status bar, respond to changes in the text editor, and dispose your extension when moving off the file.

Also helpful is [Extensibility Principles and Patterns](/docs/extensionAPI/patterns-and-principles.md) which describes the shared programming patterns used throughout the extensibility API.

## Language Servers

Language servers let you create a dedicated process for your extension.  This is a useful design choice for your extension when your extension runs high cost CPU or IO intensive tasks which could slow other extensions.  This is common for tasks that work across all files in a workspace e.g. linters or static analysis suites.

Find out more about [language servers](/docs/extensions/example-language-server.md).

## Debug Adapter

VS Code implements a generic debugger UI and relies on debugger extensions and so called "debug adapters" to connect the debug UI to a real debugger or runtime. A debug adapter is a dedicated process that communicates with VS Code through the _VS Code Debug Protocol_ and can be implemented in any language.

Find out more about creating [debugger extensions](/docs/extensions/example-debuggers.md).

---

The easiest way to see VS Code extensions in action is via the [Extension Marketplace](/docs/editor/extension-gallery.md).  You can browse for useful extensions, install them to try them out and get an idea how you might extend VS Code for your own development scenarios.

## Language Extension Guidelines

The [Language Extension Guidelines](/docs/extensionAPI/language-support.md) topic can help you to decide what language features you'd like to support with your extension. It shows the various language features available in VS Code (for example, code suggestions and actions, formatting, renaming) and how to implement them through either the language server protocol or by using the extensibility API directly from your extension.

## Themes, Snippets, and Colorizers

You can have a great editing experience for your programming language with simple things such as syntax highlighting, useful snippets, and a well designed color theme. TextMate customization files provide this support and VS Code lets you easily package and reuse these so you can directly use `.tmTheme`, `.tmSnippets`, and `.tmLanguage` files in your extension. Our [Themes, Snippets, and Colorizers](/docs/extensions/themes-snippets-colorizers.md) topic shows you how to include TextMate files as well as providing guidance on how you can create your own themes, snippets and language colorizers.

## Writing an Extension

There is a Yeoman [extension generator](/docs/extensions/yocode.md) which makes it very easy to create simple extension projects. These are great for starting out  and you can also find existing extension [examples](/docs/extensions/samples.md).

Extensions can be written in either TypeScript or JavaScript.  VS Code offers a first class extension development experience where you can [develop, build, run, test and debug](/docs/extensions/debugging-extensions.md) all from within VS Code itself.

## Testing Extensions

We also have great support for [writing and running tests](/docs/extensions/testing-extensions.md) for your extension.  You can easily create integration tests which call the VS Code APIs and test your code in a running VS Code instance.

## Extension Ideas

Lots of great community ideas for VS Code features are better implemented as extensions rather than as part of the core product. This way users can easily pick and choose the functionality they want, by installing the right set of extensions. The VS Code team tracks possible extensions as GitHub issues labeled `*extension-candidate` in the [vscode repository](https://github.com/Microsoft/vscode). If you're looking for a great extension to build, have a look at the `*extension-candidate` [issues](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3A*extension-candidate).

## Next Steps

* [Your First Extension](/docs/extensions/example-hello-world.md) - Try creating a simple Hello World extension.
* [Extension API](/docs/extensionAPI/overview.md) - Learn about the VS Code extensibility APIs.
* [Extension Examples](/docs/extensions/samples.md) - A list of extension samples you can review and build.
