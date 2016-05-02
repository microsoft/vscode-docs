---
Order: 1
Area: extensions
TOCTitle: Overview
ContentId: AD26EFB1-FFC6-4284-BAB8-F3BCB8294728
PageTitle: Extending Visual Studio Code
DateApproved: 4/14/2016
MetaDescription: Visual Studio Code has a rich extensibility model for interacting with and adding to the tool.  Learn how to create your own extensions (plug-ins) for Visual Studio Code.
---

# Extending Visual Studio Code

If you are interested in extending VS Code, you are in the right place. Here we present an outline of the VS Code extensibility documentation and how to quickly build your first VS Code extension.  If you're curious about our design approach to extensibility for VS Code, you can read about it [here](/docs/extensions/our-approach.md).

If you just want to use existing extensions, see the [Extension Marketplace](/docs/editor/extension-gallery.md) topic where we show you how to find and install extensions from the VS Code [Marketplace](https://marketplace.visualstudio.com/VSCode).

>**Tip:** Don't forget there are several ways to [customize](/docs/customization/overview.md) VS Code without writing an extension.  This includes adding [Themes](/docs/customization/themes.md), [basic Language Support](/docs/customization/colorizer.md), and [Snippets](/docs/customization/userdefinedsnippets.md) without writing a single line of code.

All VS Code extensions share a common model of contribution (registration), activation (loading) and access to the VS Code extensibility API.  There are however two special flavors of VS Code extensions, language servers and debuggers, which have their own additional protocols and are covered in their own sections of the documentation.

1. [Extensions](/docs/extensions/overview.md#extensions) - the base building block
2. [Language Servers](/docs/extensions/overview.md#language-servers) - for high cost IO or CPU intensive tasks
3. [Debuggers](/docs/extensions/overview.md#debuggers) - wire up an external debugger


## Extensions

All extensions when activated run in our shared extension host process.  This separate process for extensions ensures that VS Code remains responsive through-out.  

Extensions include support for:

* **Activation** - load an extension when a specific file type is detected, when a specific file exists, or when a command is selected via the Command Palette or a key combination
* **Editor** - work with the editor's content - read and manipulate text, leverage selection(s)
* **Workspace** - access working files, the status bar, information messages and more
* **Eventing** - connect to the editor life-cycle events such as: open, close, change, and more
* **Evolved editing** - create providers for rich language support including IntelliSense, Peek, Hover, Diagnostics and much, much more

We have two end-to-end walkthroughs to get you going on extension basics:

1. **[Hello World](/docs/extensions/example-hello-world.md)** - generate a basic extension, understand an extension's folder structure, the extension manifest, learn how activation works, run and debug your extension and install it locally. 
2. **[Word Count](/docs/extensions/example-word-count.md)** - activate based on a specific file type, update the status bar, respond to changes in the text editor, and dispose your extension when moving off the file. 

## Language Servers

Language servers let you create a dedicated process for your extension.  This is a useful design choice for your extension when your extension runs high cost CPU or IO intensive tasks which could slow other extensions.  This is common for tasks that work across all files in a workspace e.g. linters or static analysis suites.

Find out more about [language servers](/docs/extensions/example-language-server.md).

## Debuggers

Connecting a debugger written for any language to VS Code is possible through the creation of a debug service.

Find out more about integrating [debuggers](/docs/extensions/example-debuggers.md).

The easiest way to see VS Code extensions in action is via the [Extension Marketplace](/docs/editor/extension-gallery.md).  You can browse for useful extensions, install them to try them out and get an idea how you might extend VS Code for your own development scenarios.

## Writing an Extension

Extensions can be written in either TypeScript or JavaScript.  VS Code offers a first class extension development experience where you can [develop, build, run, test and debug](/docs/extensions/debugging-extensions.md) all from within VS Code itself.

## Install and Share

Once you have a working extension, you can [install it or share it with others](/docs/extensions/install-extension.md).   We support local installation, private sharing, or publishing to the public [Extension Marketplace](/docs/editor/extension-gallery.md).

## Testing Extensions

We also have great support for [writing and running tests](/docs/extensions/testing-extensions.md) for your extension.  You can easily create integration tests which call the VS Code APIs and test your code in a running VS Code instance.

## Next Steps

* [Your First Extension](/docs/extensions/example-hello-world.md) - Try creating a simple Hello World extension
* [Extension API](/docs/extensionAPI/overview.md) - Learn about the VS Code extensibility APIs
* [Samples](/docs/tools/samples.md) - A list of extension samples you can review and build

## Common Questions

Nothing yet

