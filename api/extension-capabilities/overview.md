---
---

# Extensions Capabilities Overview

VS Code offers many ways for extension to extend its capabilities, and sometimes it can be hard to find the right [Contribution Points](/api/references/contribution-points) and [VS Code API](/api/references/vscode-api) to use. This topic splits extension capabilities into a few categories. Each category:

- Lists some functionalities your extension could achieve
- Points you to a more detailed topic for utilizing these capabilities

## Common Capabilities

[Common capabilities](common-capabilities) are core pieces of functionality that you can use alongside any of the other extension points. Some of these capabilities include:

- Registering commands, configurations, keybindings or context menu items
- Storing data
- Displaying information messages
- Using Quick Pick to collect user input
- Open system file picker to let user select files / folders
- Use Progress API to indicate long-running operations

## Theming

[Themes](theming) control the look of VS Code, both the colors of code in the editor and the colors of the VS Code user interface. If you've ever wanted to make it look like you're coding the matrix by making VS Code all different shades of green, or just wanted to create the ultimate, minimalist greyscale workspace, then themes are for you.

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

## Debug Extension API

The Debug Extension API serves two orthogonal purposes:
- Support to contribute new debuggers as "Debugger Extensions".
- Surface debug functionality to extensions.

### Debugger Extensions

Debugger Extension add rich debugging support for specific languages or runtimes. VS Code's built-in Node.js debugger extension is just one showcase of the various debugger features that extensions can provide:

- Source-, function-, conditional-, inline breakpoints, and logpoints.
- Multi-process and multi-thread support.
- Navigating through complex data structures in views and hovers.
- Variable values are shown in hovers or inlined in the source.
- Creating and managing watch expressions.
- Debug console for interactive evaluation with autocomplete (REPL).

A debugger extension does not have to implement any debugger UI as this is already generically provided by VS Code. And it does not have to implement a real debugger either, because most languages already come with their own debugger.

Consequently a typical debugger extension only needs to talk to some existing debugger backend and retrieve some display data and massage it so that it can be used by VS Code's generic debugger UI. To make this adapter functionality independent from VS Code and reusable for other development tools, we've defined a JSON-based [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/) (similar to the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/)) that specifies the "shape" of the display data flowing between the UI and a so-called "debug adapter". The debug adapter implements the Debug Adapter Protocol as a separate program (and therefore can be implemented in any implementation language).

An introduction for how debug adapters work can be found [here](https://microsoft.github.io/debug-adapter-protocol/overview#How_it_works).
Developing a debug adapter in the context of a debugger extension is explained in detail [here](https://code.visualstudio.com/docs/extensions/example-debuggers).

A VS Code debugger extension contributes the debug adapter as a standalone executable via the `debuggers` extension point. VS Code launches the debug adapter whenever a debug session of that type is started.

In addition to the debug adapter executable, the `debuggers` extension point declares the following information:

- List of languages supported by the debugger. VS Code enables the UI to set breakpoints for those languages.
- JSON schema for the debug configuration attributes introduced by the debugger. VS Code uses this schema to verify the configuration in the launch.json editor and provides Intellisense.
- Default debug configurations for the initial launch.json created by VS Code.
- Debug configuration snippets that a user can add to a launch.json file.
- Declaration of variables that can be used in debug configurations.

In addition to the purely declarative contributions from above, the debug extension API provides this code-based functionality:

- Dynamically generated default debug configurations for the initial launch.json created by VS Code.
- Determine the debug adapter to use dynamically.
- Verify or modify debug configuration before they are passed to the debug adapter.
- Communicate with the debug adapter.
- Send informative messages to the debug console.

### Debug Extension API

The debug extension API is typically used by extensions that implement debug-related functionality on top of VS Code's debuggers. So it is not used for **implementing** a debugger extension.

Today this API encompasses the following functionality:
- Starting debug sessions based on in-memory debug configuration.
- Tracking the life-cycle of debug sessions.
- Accessing and managing breakpoints.
- Tracking the communication between a debug adapter and VS Code.

## Core Extensions

[Core extension points](extending-core-functionalities) are for very advanced users. These let you build a custom backend for many of VS Code's low-level functionality. For example, the `FileSystem` API can be used to support working with files over FTP or other protocols. Core extensions typically work transparently from a user's point of view.

**Example Extension Points**

- Add support for working with remote files over FTP or SFTP.
- Register new source control provider, such as Mercurial.
- Implement a custom file search provider.
