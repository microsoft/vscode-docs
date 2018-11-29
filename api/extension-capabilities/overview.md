---
---

# Extensions Capabilities Overview

Visual Studio Code offers many ways for extensions to extend its capabilities and add features. It can sometimes can be hard to find the right [Contribution Points](/api/references/contribution-points) and [VS Code API](/api/references/vscode-api) to use. This topic splits extension capabilities into a few categories. Each category:

- Lists some functionalities your extension could achieve
- Points you to a more detailed topic for utilizing these capabilities

## Common Capabilities

[Common capabilities](common-capabilities) are core pieces of functionality that you can use alongside any of the other extension points. Some of these capabilities include:

- Registering commands, configurations, keybindings, or context menu items
- Storing workspace or global data
- Displaying notification messages
- Using Quick Pick to collect user input
- Open the system file picker to let user select files or folders
- Use the Progress API to indicate long-running operations

## Theming

[Theming](theming) control the look of VS Code, both the colors of source code in the editor and the colors of the VS Code user interface. If you've ever wanted to make it look like you're coding the Matrix by making VS Code different shades of green, or just wanted to create the ultimate, minimalist greyscale workspace, then themes are for you.

**Example Extension Points**

- Change colors of your code.
- Change colors of the VS Code User Interface.
- Port an existing TextMate theme to VS Code.
- Add custom file icons.

## Declarative Language Support

[Declarative language support](/api/language-extensions/overview#declarative-language-support) extend existing programming languages or implement basic support for a new languages. This is done declaratively, without writing any code. These extension points focus on text editing-type features, such as bracket matching and syntax highlighting. For more advanced features, like IntelliSense or debugging, see [Programmatic Language Features](/api/language-extensions/overview#programmatic-language-features).

Snippets for example provide a rich and highly customizable syntax with support for advanced features like transformations and capitalization, while a good language grammar can completely change the coding experience.

**Example Extension Points**

- Provide snippets for an existing language.
- Tell VS Code about a new programming language.
- Add or replace the grammar for a programming language.
- Extend an existing grammar with grammar injections.
- Port an existing TextMate grammar to VS Code.

## Programmatic Language Features

[Programmatic language features](/api/language-extensions/overview#programmatic-language-features) add rich programming language support. Hovers, go to definition, error reporting, IntelliSense, and code lenses are just some examples of the various language features that extensions can provide.

Language features typically extend one of VS Code's existing programming languages or are built on the Static Language Features. They are written in TypeScript or JavaScript and run in a Node.js environment. Most language features can also be implemented by [language servers](/docs/extensions/example-language-server), an advanced approach that effectively makes your extension portable across editors.

All of the language features extension points can be used for more than just implementing support for a programming language. For example, CodeLens and hovers are a great way to present additional information inline, while diagnostics can be used to highlight spelling or code style errors.

**Example Extension Points**

- Add decorations to text in the editor.
- Add hovers that show previews of image URLs.
- Report spelling or linter errors in source code using diagnostics.
- Hook up VS Code to a new code formatter.
- Provide rich, context-aware IntelliSense.
- Add full support for a new programming language using the VS Code API or a language server.
- Add custom outline views.

## Workbench Extensions

[Workbench extension points](extending-workbench) extend VS Code's user interface. Add new right click actions to the File Explorer, or even build a custom explorer using VS Code's high-level `TreeView` API. And, if your extension needs a fully customized user interface, use the Webview API to build your own document preview or interface using standard HTML, CSS, and JavaScript.

**Example Extension Points**

- Add custom context menu actions to the File Explorer.
- Create a new, interactive TreeView in the Side Bar.
- Define a new Activity Bar view.
- Show new information in the Status Bar.
- Render custom content using the `WebView` API.
- Contribute Source Control providers.

## Debugging

VS Code has great [Debugging](/docs/editor/debugging) functionality, and you can take advantage of it by writing [Debugger Extensions](/api/extension-capabilities/debugging#debugger-extensions) that connects VS Code's debugging interface to any runtime. Meanwhile, VS Code also offers a set of [Debug Extension API](/api/extension-capabilities/debugging#debug-extension-api), with which you can programmatically manage debugging sessions and breakpoints to automate user's debugging experience.

**Example Extension Points**

- Connect to a runtime such as .NET Core with [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
- Connect [Debug Console](/docs/editor/debugging#_debug-console-repl) to a REPL
- Add breakpoints to all JavaScript files under a specific directory

## Core Extensions

[Core extension points](extending-core-functionalities) are for very advanced users. These let you build a custom back end for many of VS Code's low-level functionality. For example, the `FileSystem` API can be used to support working with files over FTP or other protocols. Core extensions typically work transparently from a user's point of view.

**Example Extension Points**

- Add support for working with remote files over FTP or SFTP.
- Register new source control provider, such as Mercurial.
- Implement a custom file search provider.
