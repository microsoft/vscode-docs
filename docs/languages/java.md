---
Order: 9
Area: languages
TOCTitle: Java
ContentId: 080fd21f-92b7-4491-9ab2-6eb9a3bb0793
PageTitle: Java in Visual Studio Code
DateApproved: 3/7/2018
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, snippets, linting) for Java.
---
# Java in Visual Studio Code

The Java support in Visual Studio Code is provided through [extensions](/docs/editor/extension-gallery.md) and optimized for lightweight Java projects with a simple, modern workflow. Popular extensions in the [Marketplace](https://marketplace.visualstudio.com) provide essential language features such as project support, code completion, linting, debugging, testing, code formatting, snippets, as well as tooling integration including Maven and Tomcat.

> [Download VS Code](/download) - If you haven't downloaded VS Code yet, quickly install for your platform (Windows, macOS, Linux).

## Install Java Extensions

VS Code is a fast editor and ships with great editing features. Add Java language support to VS Code by installing the popular Java extensions. To help set up Java on VS Code, there is a [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) which contains popular extensions we picked for most Java developers:

1. [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
2. [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
3. [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
4. [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Java Extension Pack</a>

There are also other popular Java extensions you can pick for your own needs, including:

1. [Spring Boot Support](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
2. [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
3. [Tomcat](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat)
4. [CheckStyle](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle)

Thanks to the great Java community around VS Code, the list doesn't end there. You can search for more Java extensions easily within VS Code:

1. Go to the **Extensions** view (`kb(workbench.view.extensions)`).
2. Filter the extensions list by typing "java".

This document describes some of the key features included in those Java extensions.

## Java Project Support

Maven, Eclipse and Gradle Java project are supported through [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java), by utilizing [M2Eclipse](https://www.eclipse.org/m2e/) which provides Maven support and [Buildship](https://github.com/eclipse/buildship) which provides Gradle support through the [Eclipse JDT Language Server](https://github.com/eclipse/eclipse.jdt.ls).

With [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven), you can generate projects from [Maven Archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html), browse through all the Maven projects within your workspace, and execute Maven goals easily from an embedded explorer.

![Maven Explorer](images/java/maven-explorer.png)

## Editing and Navigating Code

![Java Code Editing](images/java/vscode-java.0.0.1.gif)

### Linting

A [linter](https://en.wikipedia.org/wiki/Lint_%28software%29) is a tool that provides warnings for suspicious looking code. [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) provides this feature to report parsing and compilation errors as you type, so you can fix them inside VS Code.

### Intellisense

VS Code also supports code completion and Intellisense for Java through [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java). [Intellisense](/docs/editor/intellisense.md) is a general term for a number of features, including intelligent code completion (in-context method and variable suggestions) across all your files and for built-in and third-party modules.

### Search for symbols

You can search for symbols in the current file or workspace to navigate your code more quickly.

To search for a symbol in the current file, use __Quick Open__ (`kb(workbench.action.quickOpen)`) then enter the '@' command, then enter the name of the symbol you're looking for. A list of potential matches will appear and be filtered as you type. Choose from the list of matches to navigate to its location.

To search for a symbol in the current workspace, start by pressing `kb(workbench.action.showAllSymbols)`, then enter the name of the symbol. A list of potential matches will appear as before. If you choose a match that was found in a file that's not already open, the file will be opened before navigating to the match's location. Alternatively, you can also use  __Quick Open__ (`kb(workbench.action.quickOpen)`) then enter the '#' command to search the current workspace. `kb(workbench.action.showAllSymbols)` is just the shortcut for the '#' commands, respectively, so everything works the same.

### Peek Definition

You can take a quick look at how a symbol was defined by using the Peek Definition feature. This feature displays a few lines of code near the definition inside a peek window so you can take a look without navigating away from your current location.

To peek at a symbol's definition, place your cursor on the symbol anywhere it's used in your source code and then press `kb(editor.action.previewDeclaration)`. Alternatively, you can choose __Peek Definition__ from the context menu (right-click, then choose __Peek Definition__).

### Go to Definition

You can also quickly navigate to where a symbol is defined by using the Go to Definition feature.

To go to a symbol's definition, place your cursor on the symbol anywhere it is used in your source code and then press `kb(editor.action.goToDeclaration)`. Alternatively, you can choose __Go to Definition__ from the context menu (right-click, then choose __Go to Definition__). When there's only one definition of the symbol, you'll navigate directly to its location, otherwise the competing definitions are displayed in a peek window as described in the previous section and you have to choose the definition that you want to go to.

Other code editing features include:

- Code formatting
- Code snippets
- Code outline
- Code lens (references)
- Javadoc hovers
- Rename
- Highlights

## Debugging

[Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) is a lightweight Java Debugger based on [Java Debug Server](https://github.com/Microsoft/java-debug). It works with [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) to allow users debugging Java code using Visual Studio Code (VS Code).

The Java Debugger supports following features:

- **Launch/Attach** - You can either launch the Java project within VS Code or attach to any running JVM process in debug mode, locally or remotely.
- **Breakpoints** - Conditional breakpoints by Hit Count and expression evaluation are supported and can easily be set using the inline breakpoint settings window. This allows you to conveniently add conditional breakpoints to your code, directly in the source viewer, without requiring a modal window. Break on exceptions is also supported.
- **Control flow** - Including **Pause**, **Continue** `F5`, **Step over** `F10`, **Step into** `F11`, **Step out** `Shift+F11`
- **Data inspection** - When you're stopped at a breakpoint, the debugger has access to the variable names and values that are currently stored in memory. Inspect/Watch/Set Variables are supported.
- **Diagnostics** - The **CALL STACK** panel shows the call stack of your program and allows you to navigate through the call path of each captured allocation. Multi-threaded debugging is supported by parallel stacks.
- **Debug Console** - The Debug Console lets you see information from both stdout and stderr.
- **Hot Code Replacement** - A very useful feature to facilitate experimental development and iterative trial-and-error coding.

![Debugging Features](images/java/debug-features.png)

The debugger is able to detect your launch class in most cases, all you need to do is start debugging by pressing `F5`. If you'd like to define the debugging configuration yourself, just follow the steps below:

1. Switch to the **Debug** view (`kb(workbench.view.debug)`).
2. Open `launch.json` to add a debug configuration for Java.
3. Fill in the `mainClass` for `Launch` setting or `hostName` and `port` for `Attach`.
4. Click **Start** button or press `F5` to start debugging.

![Debugging Java Application](images/java/java-debug.gif)

For more debugging related information, please visit [Java Debugging](/docs/java/java-debugging.md).

## Testing

With the support from the [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) extension, you can easily run, debug and manage your Java test cases.

![Testing Java Application](images/java/java-test-explorer.png)

Your test cases are identified automatically.

![Testing Java Application](images/java/java-test.gif)

Currently the Test Runner supports JUnit4. We're working on JUnit5 and TestNG and will be supporting them soon.

## Spring Boot and Tomcat

To further improve your Java productivity in VS Code, there are extensions for most popular frameworks and tools such as [Spring Boot](https://projects.spring.io/spring-boot/) and [Tomcat](https://tomcat.apache.org/) created by the community.

The [Tomcat](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat) extension includes an explorer to easily navigate and manage your Tomcat servers. You can create, start, debug, stop and rename your Tomcat server all with the extension.

![Tomcat](images/java/tomcat.gif)

See [Java Tutorial with VS Code](/docs/java/java-tutorial.md) to learn more about Tomcat and basic Java support with VS Code.

[Spring Boot](https://projects.spring.io/spring-boot/) support is provided by an extension from [Pivotal](https://marketplace.visualstudio.com/search?term=publisher%3A%22Pivotal%22&target=VSCode&category=All%20categories&sortBy=Relevance), who also provide extensions for popular platforms such as Cloudfoundry, Concourse and BOSH. There's also a [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) extension so you can create a Spring Boot app from scratch.

See [Spring Boot with VS Code](/docs/java/java-spring-boot.md) to learn more about Spring Boot support with VS Code.

## Next Steps

Learn more about Java in VS Code

* [Java Tutorial with VS Code](/docs/java/java-tutorial.md)
* [Spring Boot with VS Code](/docs/java/java-spring-boot.md)
* [Java Debugging and Testing](/docs/java/java-debugging.md)

Read on to find out about:

* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Tasks](/docs/editor/tasks.md) - use tasks to build your project and more
* [Debugging](/docs/editor/debugging.md) - find out how to use the debugger with your project
