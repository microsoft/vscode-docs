---
Order: 1
Area: extension-capabilities
TOCTitle: Overview
PageTitle: Extension Capabilities
---

# Extensions and You

Extensions let you extend VS Code. This includes everything from how the editor looks, to what commands and keyboard shortcuts are available, to what programming languages are supported. Even much of VS Code's built-in functionality—such as node debugging support and the markdown preview—is built on the same extension APIs that you have access to. And once you create something amazing, you can easily share it with other developers on the VS Code marketplace. Check out the [marketplace]() now to get a sense of just how powerful extensions can be.

This page provides a overview of VS Code's extension API. It breaks the API down into a few, high-level extension classes, with links to much more detailed documentation on each. Keep in mind that these classes are not ridged; a single extension can mix and match contributions from any of them.


## Theming

Themes control the look of VS Code. A single theme can change both the colors of code in the editor and the colors of the VS Code user interface. If you've ever wanted to make it look like you're coding the matrix by making everything shades of green, or just wanted to create the ultimate, minimalist greyscale workspace, then themes are for you

[Theming overview](TODO_link)

**Example Extension Points**

- Change code colors with a theme.
- Change UI colors with a workbench theme.
- Port an existing TextMate theme to VS Code.
- Add custom file icons.

## Language Basics

Language basics let you extend an existing programming language or implement basic support for a new language declaratively, without writing any code. For more advanced features, like IntelliSense or debugging, see [language features](#language-features)

This doesn't mean language basics extension points aren't powerful. Snippets for example provide a rich and highly customizable syntax that supports advanced features like transformations and capitalizations, and a good  can completely change the coding experience.

[Theming overview](TODO_link)

**Example Extension Points**

- Provide snippets for an existing language.
- Tell VS Code about a new programming language.
- Add or replace the grammar for a programming language.
- Extend an existing grammar with grammar injections.
- Port an existing TextMate grammar to VS Code.

## Language Features

The language feature extension points add rich support for a programming language; hovers, go to definition, error reporting, IntelliSense, code lenses—all that good stuff, and more.

Extensions that contribute language features typically build on the [language basics](#language-basics) or extend one of VS Code's existing programming languages. They are written in TypeScript or JavaScript and run in a node environment. Many of these features can also be implemented by language servers, and advanced approach that effectively makes your extension portable across editors.

Keep in mind, these extension points be used for far more than just implementing a programming language.

**Example Extension Points**


- Report spelling errors in code using diagnostics.
- Add hovers that show previews of image urls.
- Add full support for a new programming language using the VS Code API or a language server.



The whole section of "Extension Capabilities" serves one purpose: **Tell people what they can do with extensions**. Topics here should be pointers to various resources instead of specific code guides.

It should make some overall distinction between what is and isn't "language features", and direct people to "Language Extensions" section for extension authors interested in writing language extensions.