---
Order: 1
Area: languageextensions
TOCTitle: Overview
PageTitle: Language Extension Overview
---

# Language Extension Overview

VS Code provides smart editing features for many different programming languages through Language Extensions. In its core, VS Code offers a set of Contribution Points and API methods but contains no support for any programming languages. It is the bundled [html](https://github.com/Microsoft/vscode/tree/master/extensions/html) extension that allows VS Code to show syntax highlighting for html files. When you type `console.` and `log` shows up, it's the [`typescript-language-features`](https://github.com/Microsoft/vscode/tree/master/extensions/typescript-language-features) extension at work.

Smart editing features can be roughly put into two categories:

## Static Language Features

This cateogry includes very basic language editing support. All features in this area are statically defined in configuration files. Examples include [html](https://github.com/Microsoft/vscode/tree/master/extensions/html), [css](https://github.com/Microsoft/vscode/tree/master/extensions/css) and [typescript-basic](https://github.com/Microsoft/vscode/tree/master/extensions/typescript-basics) extensions bundled with VS Code, which offer a subset of the following Basic Language Features:

- Syntax Highlighting
- Snippet Completion
- Bracket Matching
- Bracket Autuclosing
- Bracket Autosurronding
- Comment
- Folding (legacy)

We have three guides for writing Language Extensions that provide basic language features.

### Syntax Highlight Guide

VS Code uses TextMate grammar for syntax highlighting. This guide will walk you through converting an existing Textmate grammar into a VS Code extension.

### Snippet Completion Guide

Extension authors could provide handy snippets for any languages. Come to learn how we can add an idiomatic framework usage as a snippet, or create a snippet for using the latest ECMAScript syntax.

### Language Configuration Guide

VS Code allows extensions to define a "language configuration" for any programming language. This file controls basic editing features such as comment toggling, bracket matching/surrounding and region folding (legacy).

## Dynamic Language Features

This category includes advanced language features such as auto completion, error checking and jump to definition. These features are often powered by a Language Server, a program that analyzes your project to provide the dynamic features.
 One example is the [`typescript-language-features`](https://github.com/Microsoft/vscode/tree/master/extensions/typescript-language-features) extension bundled in VS Code. It utlizes TSServer from [TypeScript](https://github.com/Microsoft/TypeScript) to offer advanced language features such as:

- Auto completion
- Error checking
- Hover information
- Jump to definition
- Formatting
- Refactor

For a complete list of advanced language features, see [Language Features](/api/language-extensions/language-features).


This page should should contain a brief overview of the following concepts:

- Syntax Highlight Support
- Snippet Support
- Language Configurations (Comments, brackets, autoclosing, surronding, static/legacy folding)
- Smart Editing Features
- LSP and how it relates to Smart Editing Features