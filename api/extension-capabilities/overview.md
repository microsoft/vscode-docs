---
# DO NOT TOUCH — Managed by doc writer
ContentId: d22675fc-6609-43f2-a66b-8f2a52597195
DateApproved: 3/30/2022

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Learn the details of what's possible with Visual Studio Code's rich extension (plug-in) API.
---

# Extensions Capabilities Overview

Visual Studio Code offers many ways for extensions to extend its capabilities. It can sometimes be hard to find the right [Contribution Points]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] and [VS Code API]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] to use. This topic splits extension capabilities into a few categories. Each category describes:

- Some functionalities your extension could use
- Links to more detailed topics for using these functionalities
- A few extension ideas

However, we also impose [restrictions]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] upon extensions to ensure the stability and performance of VS Code. For example, extensions cannot access the DOM of VS Code UI.

## Common Capabilities

[Common Capabilities]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] are core pieces of functionality that you can use in any extension.

Some of these capabilities include:

- Registering commands, configurations, keybindings, or context menu items.
- Storing workspace or global data.
- Displaying notification messages.
- Using Quick Pick to collect user input.
- Open the system file picker to let users select files or folders.
- Use the Progress API to indicate long-running operations.

## Theming

[Theming]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] controls the look of VS Code, both the colors of source code in the editor and the colors of the VS Code UI. If you've ever wanted to make it look like you're coding the Matrix by making VS Code different shades of green, or just wanted to create the ultimate, minimalist grayscale workspace, then themes are for you.

**Extension Ideas**

- Change colors of your source code.
- Change colors of the VS Code UI.
- Port an existing TextMate theme to VS Code.
- Add custom file icons.

## Declarative Language Features

[Declarative Language Features]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] adds basic text editing support for a programming language such as bracket matching, auto-indentation and syntax highlighting. This is done declaratively, without writing any code. For more advanced language features, like IntelliSense or debugging, see [Programmatic Language Features]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"].

**Extension Ideas**

- Bundle common JavaScript snippets into an extension.
- Tell VS Code about a new programming language.
- Add or replace the grammar for a programming language.
- Extend an existing grammar with grammar injections.
- Port an existing TextMate grammar to VS Code.

## Programmatic Language Features

[Programmatic Language Features]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] add rich programming language support such as Hovers, Go to Definition, diagnostic errors, IntelliSense and CodeLens. These language features are exposed through the [`vscode.languages.*`](/api/references/vscode-api#languages) API. An extension can either use these API directly, or write a Language Server and adapt it to VS Code using the VS Code [Language Server library]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"].

Although we provide a listing of [language features]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] and their intended usage, nothing prevents you from using these API creatively. For example, CodeLens and Hovers are a great way to present additional information inline, while diagnostic errors can be used to highlight spelling or code style errors.

**Extension Ideas**

- Add hovers that show sample usage of an API.
- Report spelling or linter errors in source code using diagnostics.
- Register a new code formatter for HTML.
- Provide rich, context-aware IntelliSense.
- Add folding, breadcrumbs and outline support for a language.

## Workbench Extensions

[Workbench Extensions]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] extend the VS Code Workbench UI. Add new right-click actions to the File Explorer, or even build a custom explorer using VS Code's [TreeView]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] API. And if your extension needs a fully customized user interface, use the [Webview API]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] to build your own document preview or UI using standard HTML, CSS, and JavaScript.

**Extension Ideas**

- Add custom context menu actions to the File Explorer.
- Create a new, interactive TreeView in the Side Bar.
- Define a new Activity Bar view.
- Show new information in the Status Bar.
- Render custom content using the `WebView` API.
- Contribute Source Control providers.

## Debugging

You can take advantage of VS Code's [Debugging]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] functionality by writing [Debugger Extensions]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] that connect VS Code's debugging UI to a specific debugger or runtime.

**Extension Ideas**

- Connect VS Code's debugging UI to a debugger or runtime by contributing a [Debug Adapter implementation]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"].
- Specify the languages supported by a debugger extension.
- Provide rich IntelliSense and hover information for the debug configuration attributes used by the debugger.
- Provide debug configuration snippets.

On the other hand, VS Code also offers a set of [Debug Extension API]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"], with which you can implement debug-related functionality on top of any VS Code debugger, in order to automate users' debugging experience.

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

## Extension Guidelines

To help make your extension fit seemlessly into the VS Code user interface, refer to the [Extension Guidelines]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"], where you'll learn the best practices for creating extension UI and conventions for following the preferred VS Code workflows.

## Restrictions

There are certain restrictions we impose upon extensions. Here are the restrictions and their purposes.

### No DOM Access

Extensions have no access to the DOM of VS Code UI. You **cannot** write an extension that applies custom CSS to VS Code or adds an HTML element to VS Code UI.

At VS Code, we're continually trying to optimize use of the underlying web technologies to deliver an always available, highly responsive editor and we will continue to tune our use of the DOM as these technologies and our product evolve. To ensure that extensions cannot interfere with the stability and performance of VS Code, and that we can continue to improve the DOM of VS Code without breaking existing extensions, we run extensions in an [Extension Host]["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"] process and prevent direct access to the DOM.


["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/references/contribution-points
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/references/vscode-api
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: #restrictions
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: ./common-capabilities
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: ./theming
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/language-extensions/overview#declarative-language-features
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: #programmatic-language-features
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/language-extensions/overview#programmatic-language-features
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: https://github.com/microsoft/vscode-languageserver-node
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/language-extensions/programmatic-language-features
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: ./extending-workbench
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/extension-guides/tree-view
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/extension-guides/webview
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /docs/editor/debugging
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/extension-guides/debugger-extension
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: https://microsoft.github.io/debug-adapter-protocol/implementors/adapters/
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/references/vscode-api#debug
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/ux-guidelines/overview
["<git-helps><Visual_Studio_Code_Marketplace></git-helps>"]: /api/advanced-topics/extension-host