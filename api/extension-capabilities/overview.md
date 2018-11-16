---
---

# Extensions Capabilities Overview

VS Code has a vast Extension API, and this topic breaks it down to smaller categories. Each category:

- Explains one aspect of VS Code API
- Shows you what extension could achive with that API, and
- Points you to more detailed guides for using that API

## Common Capabilities

[Common capabilities](common-capabilities) are core pieces of functionality that you can use alongside any of the other extension points. Some of these capabilities include:

- Registering commands, configurations, keybindings or Context Menu items
- Storing data
- Displaying information messages
- Using Quick Pick to get user input
- Open system file picker to let user select files / folders
- Use Progress API to indicate long-running operations

Learn more at the [Common Capabilities](common-capabilities) topic.

**Example Extension Points**

- Register new commands, configurations, keybindings,  with a keyboard shortcut.
- Collect user input using Quick Picks.
- Adding settings for your extension.

## Theming

[Themes](theming) control the look of VS Code, both the colors of code in the editor and the colors of the VS Code user interface itself. If you've ever wanted to make it look like you're coding the matrix by making VS Code all different shades of green, or just wanted to create the ultimate, minimalist greyscale workspace, then themes are for you.

**Example Extension Points**

- Change colors of your code.
- Change colors of the VS Code User Interface.
- Port an existing TextMate theme to VS Code.
- Add custom file icons.

## Declarative Language Features

[Declarative Language Features](/api/language-extensions/overview#Static-Language-Features) extend existing programming languages or implement basic support for a new languages. This is done declaratively, without writing any code. These extension points focus on text editing-type features, such as bracket matching and syntax highlighting. For more advanced features, like IntelliSense or debugging, see [Programmatic Language Features](#Programmatic-Language-Features).

Snippets for example provide a rich and highly customizable syntax with support for advanced features like transformations and capitalization, while a good language grammar can completely change the coding experience.

**Example Extension Points**

- Provide snippets for an existing language.
- Tell VS Code about a new programming language.
- Add or replace the grammar for a programming language.
- Extend an existing grammar with grammar injections.
- Port an existing TextMate grammar to VS Code.

## Programmatic Language Features

[Programmatic Language Features](/api/language-extensions/overview#Programmatic-Language-Features) add rich programming language support. Hovers, go to definition, error reporting, IntelliSense, and code lenses are just some examples of the various language features that extensions can provide.

Language features typically extend one of VS Code's existing programming languages or are built on the Static Language Features. They are written in TypeScript or JavaScript and run in a node environment. Most language features can also be implemented by [language servers](/docs/extensions/example-language-server), an advanced approach that effectively makes your extension portable across editors.

All of the language features extension points can be used for more than just implementing support for a programming language. Code lenses and hovers for example are a great way present additional information inline, while diagnostics can be used to highlight spelling or code style errors.

**Example Extension Points**

- Add decorations to text in the editor.
- Add hovers that show previews of image urls.
- Report spelling or linter errors in code using diagnostics.
- Hook up VS Code to a new code formatter.
- Provide rich, context-aware IntelliSense.
- Add full support for a new programming language using the VS Code API or a language server.
- Add custom outline views.

## Workbench Extensions

[Workbench extension points](extending-workbench) extend VS Code's user interface. Add new right click actions to the file explorer, or even build a custom file explorer like views using VS Code's high-level `TreeView` API. And, if your extension needs a fully customized user interface, use the Webview API to build your own document preview or interface using standard html, css, and JavaScript.

**Example Extension Points**

- Add custom context menu actions to the file explorer.
- Create a new, interactive TreeView in the side bar.
- Define a new activity bar section.
- Show new information in the status bar.
- Render custom content using the `WebView` API.
- Contribute Source Control providers.

## Debugger

TODO: Andre

## Core Extensions

[Core extension points](extending-core-functionalities) are for very advanced users. These let you build a custom backend for many of VS Code's low-level functionality. For example, the `FileSystem` API can be used to support working with files over FTP or other protocols. Core extensions typically work transparently from a user's point of view.

**Example Extension Points**

- Add support for working with remote files over FTP or SFTP.
- Register new source control provider, such as Mercurial.
- Implement a custom file search provider.
