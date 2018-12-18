---
# DO NOT TOUCH — Managed by doc writer
ContentId: d22675fc-6609-43f2-a66b-8f2a52597195
DateApproved: 12/6/2018

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn the details of what's possible with Visual Studio Code's rich extension (plug-in) API.
---

# Extensions Capabilities Overview

Visual Studio Code offers many ways for extensions to extend its capabilities and add features. It can sometimes be hard to find the right [Contribution Points](/api/references/contribution-points) and [VS Code API](/api/references/vscode-api) to use. This topic splits extension capabilities into a few categories. Each category describes:

- Some functionalities your extension could use
- Links to more detailed topics for using these functionalities
- A few extension ideas

## Common Capabilities

[Common Capabilities](./common-capabilities) are core pieces of functionality that you can use in any extension.

Some of these capabilities include:

- Registering commands, configurations, keybindings, or context menu items.
- Storing workspace or global data.
- Displaying notification messages.
- Using Quick Pick to collect user input.
- Open the system file picker to let users select files or folders.
- Use the Progress API to indicate long-running operations.

## Theming

[Theming](./theming) controls the look of VS Code, both the colors of source code in the editor and the colors of the VS Code user interface. If you've ever wanted to make it look like you're coding the Matrix by making VS Code different shades of green, or just wanted to create the ultimate, minimalist grayscale workspace, then themes are for you.

**Extension Ideas**

- Change color of your source code.
- Change colors of the VS Code User Interface.
- Port an existing TextMate theme to VS Code.
- Add custom file icons.

## Declarative Language Features

[Declarative Language Features](/api/language-extensions/overview#declarative-language-features) extend existing programming languages or implement basic support for a new language. This is done declaratively, without writing any code. The support mostly consist of text editing features, such as bracket matching and syntax highlighting. For more advanced features, like IntelliSense or debugging, see [Programmatic Language Features](/api/language-extensions/overview#programmatic-language-features).

Snippets, for example, provide a rich and highly customizable syntax with support for advanced features like transformations and capitalization, while a good language grammar can completely change the coding experience.

**Extension Ideas**

- Provide snippets for an existing language.
- Tell VS Code about a new programming language.
- Add or replace the grammar for a programming language.
- Extend an existing grammar with grammar injections.
- Port an existing TextMate grammar to VS Code.

## Programmatic Language Features

[Programmatic Language Features](/api/language-extensions/overview#programmatic-language-features) add rich programming language support. Hovers, Go to Definition, diagnostic errors, IntelliSense, and CodeLens are some examples of the various language features that extensions can provide. These language features are exposed through the [`vscode.languages.*`](/api/references/vscode-api#languages) API. An extension can either use these API in JavaScript directly, or write a Language Server and adapt it to VS Code using the VS Code [Language Server library](https://github.com/Microsoft/vscode-languageserver-node).

Although we provide a listing of [language features](/api/language-extensions/programmatic-language-features) and their intended usage, nothing prevents you from using these API for other purposes. For example, For example, CodeLens and hovers are a great way to present additional information inline, while diagnostics can be used to highlight spelling or code style errors.

**Extension Ideas**

- Add hovers that show sample usage of an API.
- Report spelling or linter errors in source code using diagnostics.
- Hook up VS Code to a new code formatter.
- Provide rich, context-aware IntelliSense.
- Add full support for a new programming language using the VS Code API or a language server.
- Add custom outline views.

## Workbench Extensions

[Workbench Extensions](./extending-workbench) extend VS Code's user interface. Add new right-click actions to the File Explorer, or even build a custom explorer using VS Code's high-level `TreeView` API. And, if your extension needs a fully customized user interface, use the Webview API to build your own document preview or UI using standard HTML, CSS, and JavaScript.

**Extension Ideas**

- Add custom context menu actions to the File Explorer.
- Create a new, interactive TreeView in the Side Bar.
- Define a new Activity Bar view.
- Show new information in the Status Bar.
- Render custom content using the `WebView` API.
- Contribute Source Control providers.

## Debugging

You can take advantage of VS Code's [Debugging](/docs/editor/debugging) functionality by writing [Debugger Extensions](/api/extension-guides/debug-extension) that connect VS Code's debugging user interface to a specific debugger or runtime.

**Extension Ideas**

- Connect VS Code's debugging UI to a debugger or runtime by contributing a [Debug Adapter implementation](https://microsoft.github.io/debug-adapter-protocol/implementors/adapters/).
- Specify the languages supported by a debugger extension.
- Provide rich IntelliSense and hover information for the debug configuration attributes used by the debugger.
- Provide debug configuration snippets.

On the other hand, VS Code also offers a set of Debug Extension API, with which you can implement debug-related functionality on top of any VS Code debugger, in order to automate a user's debugging experience.

**Extension Ideas**

- Start debug sessions based on dynamically created debug configurations.
- Track the lifecycle of debug sessions.
- Create and manage breakpoints programmatically.

<!-- Add below content back after writing ./extending-core-functionalities.md  -->
<!-- ## Core Extensions

[Core Extensions](extending-core-functionalities) are for very advanced users. These let you build a custom back end for many of VS Code's low-level functionality. For example, the `FileSystem` API can be used to support working with files over FTP or other protocols. Core extensions typically work transparently from a user's point of view.

**Extension Ideas**

- Add support for working with remote files over FTP or SFTP.
- Register new source control provider, such as Mercurial.
- Implement a custom file search provider. -->
