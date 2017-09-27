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

For Java developers on VS Code, the [Language Support for Java(TM) by Red Hat] has been a good place to get language features such as IntelliSense and project support. At the same time, we've also heard feedbacks about lacking of debugging. Today, we're excited to announce our ongoing collaboration with Red Hat and enabling Java developers to debug Java applications with a new lightweight [Java Debugger for Visual Studio Code] based on [Java Debug Server].

[<img src="2017_09_28_java-debug-extensions.png">](https://marketplace.visualstudio.com/items?itemName=microsoft.vscode-java-debug)

> Both [Java Debugger for Visual Studio Code] and [Java Debug Server] will be open sourced shortly after the initial release.

To help Java developers to get started with VS Code quickly, we also created a [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) which includes both the [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) and [Java Debugger for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=microsoft.vscode-java-debug) so you won't need to search for them individually. This is the just our start to create a modern workflow for Java, more features and extensions will be added to the extension pack in the future.

[<img src="2017_09_28_java-extensions-pack.png">](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)

## Getting started

To get started:

1. In VS Code, open the Extensions view (`kb(workbench.view.extensions)`).
2. Type "java" to filter the list.
3. Find and install the [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) or standalone [Java Debugger for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=microsoft.vscode-java-debug) extension if you already have [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) installed.

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Java Extension Pack</a>

After reloading VS Code, open a folder that contains a Java project and follow below steps:

1. Prepare the project. Open a `.java` file, and then the Java extensions would be activated. Maven, Gradle and Eclipse projects are supported. Build is automatically handled by the extensions, no need to be triggered manually.
2. Start debugging. Switch to debug tab, open `launch.json` to add a debug configuration for Java.
3. Fill in in the `mainClass` for `Launch` setting or `hostName` and `port` for `Attach`.
4. Set your breakpoint and hit `F5` to start debugging.

![Debugging Java Application](2017_09_28_java-debug.gif)

## Supported Features

In this release, we support the following features:

- Launch/Attach. You can either launch the Java project within VS Code or attach to any running JVM process in debug mode, locally or remotely.
- Breakpoints. Conditional breakpoints by Expressions and Hit are supported and can easily be set using the inline breakpoint settings window, which allows you to conveniently add conditional breakpoints to your code directly in the source viewer without requiring a modal window. Break on exceptions are also supported.
- Control flow. Including Pause, Continue (with `F5`), Step over `F10`, Step into `F11`, Step out `Shift+F11`
- Data inspection. When you're stopped at a breakpoint, the debugger has access to the variable names and values that are currently stored in memory. Inspect/Watch/Set Variables are supported.
- Diagnostics. Call stack view shows the call stack of your program and allows you to navigate through the call path of each captured allocation. Multi-threaded debugging is supported by parallel stacks.
- Debug console (stdout/err)

![Debugging Features](2017_09_28_debug-features.png)

## Next Steps

- Checkout more about [Java on VS Code](/docs/languages/java.md)

## Feedbacks

Please share your feedbacks and ask questions to help us improve. See you [here](https://gitter.im/Microsoft/vscode-java-debug).

[Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
[Java Debugger for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
[Java Debug Server](https://github.com/Microsoft/java-debug)
[Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
[Java on VS Code](https://code.visualstudio.com/docs/languages/java)