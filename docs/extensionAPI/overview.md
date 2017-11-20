---
Order: 1
Area: extensionapi
TOCTitle: Overview
ContentId: C99AC3B3-47BC-41E3-8C7B-6F24364C20D1
PageTitle: Visual Studio Code Extensibility Reference
DateApproved: 11/8/2017
MetaDescription: Learn the details of Visual Studio Code's rich extensibility (plug-in) model.  This documentation describes the various extension points, activation rules and specific feature APIs (e.g. working with documents and editors).
---

# Extensibility Reference

This section of our documentation goes into detail on the various features of VS Code extensibility.  It's worth reviewing the introduction on the [extensions](/docs/extensions/overview.md) as well as going through the ['Hello World'](/docs/extensions/example-hello-world.md) example before digging in too deeply here.

The easiest way to see VS Code extensions in action is via the [Extension Marketplace](/docs/editor/extension-gallery.md).  Once you have built your first extension, it can be [published](/docs/extensions/publish-extension.md) for others to install.

## The Extensibility Reference Documents

This section of our documentation covers the following topics...

Topic|Description
-----|-----------
**[package.json Extension Manifest](/docs/extensionAPI/extension-manifest.md)**|Every Visual Studio Code extension needs a manifest file `package.json` at the root of the extension folder. This document provides an overview of the structure of that file and the mandatory fields.
**[Contribution Points](/docs/extensionAPI/extension-points.md)**|Building on the base `package.json`, there are a number of additional extension points you can contribute to e.g. commands, themes, debuggers,...
**[Activation Events](/docs/extensionAPI/activation-events.md)**|VS Code lazily activates extensions. This document outlines the activation options supported in `package.json` e.g. when a specific file type is loaded, when a command is fired, etc
**[API vscode namespace](/docs/extensionAPI/vscode-api.md)**|Review the full vscode namespace API reference.
**[API complex commands](/docs/extensionAPI/vscode-api-commands.md)**|See the VS Code complex command API reference.
**[Debugging API](/docs/extensionAPI/api-debugging.md)**|Learn the details about integrating debuggers into VS Code.
**[API samples](https://github.com/Microsoft/vscode-extension-samples)**|Sample code illustrating the VS Code extension API.
**[Markdown extensions API](/docs/extensionAPI/api-markdown.md)**|Sample code illustrating the VS Code extension API.

## Language Extension Guidelines

If you are implementing programming language support, we have a [Language Extension Guidelines](/docs/extensionAPI/language-support.md) topic which shows the various language features available in VS Code (for example, code suggestions and actions, formatting, renaming) and provides guidance on how to implement them.
