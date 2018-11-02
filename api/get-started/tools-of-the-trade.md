---
Order: 3
Area: get-started
TOCTitle: Tools of the Trade
PageTitle: Tools of the Trade
---

# Tools of the Trade

Developing extension is no easy task, and we are here to help. This section points you to many tools and resources to take adavantage of. Make good use of them!

## Debugger and Debug Console

The debugger and debug console allow you stop the program and inspect variables effectively. Here we have an extension that would show a message `Hello Visual Studio Code!`, each time with an increasing exclamation mark. Let's find out how many exclamation marks the message would show by using the Debugger and the Debug Console.

![debug](./images/tools-of-the-trade/debug.gif)

You can learn more about debugging Node apps in VS Code at the [Node.js Debugging Topic](/docs/nodejs/nodejs-debugging).

## Samples and Guides

We have a great collection of Sample Extensions that you can clone and adapt from. Some of them even include detailed guide that explains the source code. You can find all Samples & Guides in the [Guide Listing](/api/extension-guides/overview) or the [vscode-extension-samples](https://github.com/Microsoft/vscode-extension-samples) repository.

## Yeoman Generator

We offer a [yeoman generator](https://github.com/Microsoft/vscode-generator-code) that helps you set up the VS Code extension development environment. The generated code shares the same setup as most of the sample extensions.

```bash
npm install -g yo generator-code
yo code
# Choose from one of the 7 templates
# - New Extension (TypeScript)
# - New Extension (JavaScript)
# - New Color Theme
# - New Language Support
# - New Code Snippets
# - New Keymap
# - New Extension Pack
```

## vsce

[`vsce`](https://github.com/Microsoft/vscode-vsce), short for "Visual Studio Code Extension", is a VS Code extension manager that helps you package, publish and manage extensions.

If you would like to install extensions you have written, you can use `vsce` to package the extension into VSIX files and install from it.

```bash
npm install -g vsce
vsce package # Run this at the root folder of hellocode-sample
# hellocode-sample-0.0.1.vsix file created
code --install-extension hellocode-sample-0.0.1.vsix
# Alternatively, run the command `Extensions: Install from VSIX...`
```

https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix

## Questions & Issues

If you have questions for extension development, try asking on:

- [Stack Overflow](https://stackoverflow.com/questions/tagged/visual-studio-code): There are 11k questions tagged `visual-studio-code`, and over half of them already have answers. Search for your issue, ask questions or help your fellow developers by answering VS Code extension development questions!
- [Gitter Channel](https://gitter.im/Microsoft/vscode) and [VS Code Dev Slack](https://join.slack.com/t/vscode-dev-community/shared_invite/enQtMjIxOTgxNDE3NzM0LWU5M2ZiZDU1YjBlMzdlZjA2YjBjYzRhYTM5NTgzMTAxMjdiNWU0ZmQzYWI3MWU5N2Q1YjBiYmQ4MzY0NDE1MzY): Public chatroom full of helpful folks. Some VS Code team members chime in conversations.

If you have questions that you cannot find answer for, or issues with VS Code's Extension API, feel welcome to open a new issue in our issue tracker: https://github.com/Microsoft/vscode/issues.
