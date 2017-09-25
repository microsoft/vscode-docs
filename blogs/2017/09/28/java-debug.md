---
Order: 31
TOCTitle: Java Debugging
PageTitle: Using VS Code to Debug Java Applications
MetaDescription: Java Development with VS Code
Date: 2017-09-28
ShortDescription: Using VS Code to Debug Java Applications
Author: Xiaokai He
---

# Using VS Code to Debug Java Applications

September, 28 2017 - Xiaokai He

For Java developers on VS Code, the [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) has been a good place to get language support features such as IntelliSense and project support. At the same time, we've also heard feedbacks about lacking of debugging support. Today, we're enabling Java developers to debug Java applications with a new lightweight [Java Debugger for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=microsoft.vscode-java-debug) based on [Java Debug Server](https://github.com/Microsoft/java-debug).

[<img src="2017_09_28_java-debug-extensions.png">](https://marketplace.visualstudio.com/items?itemName=microsoft.vscode-java-debug)

## Getting started

To get started, you simply open the **Command Palette** (`kb(workbench.action.showCommands)`) inside VS Code and type "ext install" to run the **Extensions: Install Extension** command. When the extension list appears, type "java" to filter the list and install the Debugger extension. After reloading VS Code, you can open a Java file within a Java project (Maven/Gradle/Eclipse). Once the project is built successfully, switch to debug tab, add debug configuration and specify "mainClass" in launch.json. And then press F5 and start debugging.

![Debugging Java Application](2017_09_28_java-debug.gif)

## Supported Features
In this release, we support the following features:

- Launch/Attach
- Breakpoints
- Exceptions
- Pause & Continue
- Step In/Out/Over
- Variables
- Callstacks
- Threads
- Debug console

## Next Steps
 - Checkout more about [Java on VS Code](https://code.visualstudio.com/docs/languages/java)
 - A quick demo for [Developing Azure Functions in Java with VS Code]()

## Feedbacks

Please share your feedbacks and ask questions to help us improve. See you [here](https://github.com/Microsoft/vscode-java-debug/).
