---
Order: 10
Area: languages
TOCTitle: Java
ContentId: 080fd21f-92b7-4491-9ab2-6eb9a3bb0793
PageTitle: Java in Visual Studio Code
DateApproved: 1/4/2022
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, snippets, linting) for Java.
---
# Java in Visual Studio Code

Support for Java in Visual Studio Code is provided through a wide range of [extensions](/docs/java/extensions.md). Combined with the power of core VS Code, these extensions give you a lightweight and performant code editor that also supports many of the most common Java development techniques.

This article will give you an overview of different capabilities of Visual Studio Code for Java developers. For a quick walkthrough of editing, running, and debugging a Java program with Visual Studio Code, use the **Java Getting Started Tutorial** button below.

<a class="next-topic-btn" href="/docs/java/java-tutorial">Java Getting Started Tutorial</a>

## Overview

VS Code provides essential language features such as code completion, refactoring, linting, formatting, and code snippets along with convenient debugging and unit test support. VS Code also integrates with tooling and frameworks such as Maven, Tomcat, Jetty, and Spring Boot. Leveraging the power of Visual Studio Code, Java developers get an excellent tool for both quick code editing and also the full debugging and testing cycle. It's a great choice for your Java work if you're looking for a tool which:

* Is fast, lightweight, free, and open source.
* Supports many other languages, not just Java.
* Helps start your Java journey without installing and learning a complex IDE.
* Provides great microservices support including popular frameworks, container tooling, and cloud integration.
* Offers team-based collaboration features such as [Visual Studio Live Share](https://visualstudio.microsoft.com/services/live-share).
* Improves your productivity through IntelliSense and other code-aware editing features.

## Install Visual Studio Code for Java

To help you set up quickly, we recommend you use the **Coding Pack for Java**, which is the bundle of VS Code, the Java Development Kit (JDK), and a collection of suggested extensions by Microsoft. The Coding Pack can also be used to fix an existing development environment.

<a class="install-extension-btn" onclick="pushCodingPackEvent('java', 'win')" href="https://aka.ms/vscode-java-installer-win">Install the Coding Pack for Java - Windows</a>

<a class="install-extension-btn" onclick="pushCodingPackEvent('java', 'mac')" href="https://aka.ms/vscode-java-installer-mac">Install the Coding Pack for Java - macOS</a><br>

> **Note**: The Coding Pack for Java is only available for Windows and macOS. For other operating systems, you will need to manually install a JDK, VS Code, and Java extensions.

If you have already installed VS Code and want to add Java support to it, we recommend using the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), a collection of extensions suggested by Microsoft:

1. [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
2. [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
3. [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
4. [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
5. [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)
6. [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

Alternatively, you can add Java language support to VS Code by installing the popular Java extensions by yourself.

> [Download VS Code](/download) - If you haven't downloaded VS Code yet, quickly install for your platform (Windows, macOS, Linux).

There are also other popular Java extensions you can pick for your own needs, including:

1. [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack)
2. [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle)
3. [Community Server Connectors](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-community-server-connector) (for Apache Felix, Karaf, Tomcat, Jetty, etc.)
4. [Server Connector](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-server-connector) (Red Hat Servers, for example Wildfly)
5. [Extension Pack for MicroProfile](https://marketplace.visualstudio.com/items?itemName=MicroProfile-Community.vscode-microprofile-pack)
6. [CheckStyle](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle)
7. [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

Thanks to the great Java community around VS Code, the list doesn't end there. You can search for more Java extensions easily within VS Code:

1. Go to the **Extensions** view (`kb(workbench.view.extensions)`).
2. Filter the extensions list by typing "java".

This document describes some of the key features included in those Java extensions.

>**Note**: To help get you started with Java development, you can use the [Java General profile template](/docs/editor/profiles.md#java-general-profile-template) to install useful extensions. You can learn more about profiles and how they let you quickly reconfigure your editor for different programming languages and workflows at [Profiles in VS Code](/docs/editor/profiles.md).

## Getting started

**NOTE:** If you are using VS Code on Windows and want to take advantage of the Windows Subsystem for Linux, see [Developing in WSL](/docs/remote/wsl).

### Install a Java Development Kit (JDK)

A Java Development Kit (JDK) is a software development environment used for developing Java applications. In order to run Java within Visual Studio Code, you need to install a JDK. The [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) supports Java version 1.5 or above.

We recommend you to consider installing the JDK from one of these sources:

* [Amazon Corretto](https://aws.amazon.com/corretto)
* [Azul Zulu](https://www.azul.com/downloads/?package=jdk)
* [Eclipse Adoptium's Temurin](https://adoptium.net/)
* [IBM Semeru Runtimes](https://developer.ibm.com/languages/java/semeru-runtimes)
* [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk)
* [Oracle Java SE](https://www.oracle.com/java/technologies/javase-downloads.html)
* [Red Hat build of OpenJDK](https://developers.redhat.com/products/openjdk/download)
* [SapMachine](https://sapmachine.io)

> **Note**: If you have multiple JDKs installed and need to use a specific JDK version for your projects, see [Configure Runtime for Projects](/docs/java/java-project.md#configure-runtime-for-projects). To enable Java preview features, see [How can I use VS Code with new Java versions](/docs/java/java-faq.md#how-can-i-use-visual-studio-code-with-new-java-versions).

For developers new to Java or new to VS Code, we do provide some tips in our extensions. Once you've installed the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), you can see the tips using the **Java: Tips for Beginners** command from the Command Palette in VS Code.

Open the Command Palette (`kb(workbench.action.showCommands)`) and type "java tips" to select the command.

![Java Getting Started](images/java/beginner-tips.png)

## Working with Java source files

You can use VS Code to read, write, run, and debug Java source file(s) without creating a project. VS Code for Java supports two modes, lightweight and standard. Lightweight mode is ideal for scenarios that only deal with source file(s). If you want to work with a full-scale project, standard mode will be required. You can easily switch from lightweight mode to standard mode, when needed. To learn more, see [Lightweight Mode](/docs/java/java-project.md#lightweight-mode).

## Working with Java projects

There are three things you must understand to work with Java in VS Code:

1. How does VS Code handle Workspaces?
2. How does VS Code handle Java?
3. How does VS Code handle Workspaces that contain Java?

### VS Code Workspaces

In Visual Studio Code, a "Workspace" means a collection of one or more filesystem folders (and their children) and all of the VS Code configurations that take effect when that "Workspace" is open in VS Code.  There are two kinds of "Workspaces" in VS Code, "folder workspaces" and "multi-root workspaces".

A "folder workspace" is presented by VS Code when you open a filesystem folder (directory) in VS Code.

A "multi-root workspace" can refer to multiple folders (directories) from disparate parts of the file system and VS Code displays the contents of the folder(s) of the workspace together in the [File Explorer](/docs/getstarted/userinterface.md#basic-layout). To learn more, see [Multi-root Workspaces](/docs/editor/multi-root-workspaces.md).

### Java projects in VS Code

In contrast to IDEs such as IntelliJ IDEA, NetBeans, or Eclipse, the concept of a "Java project" is provided entirely by extensions, and is not a core concept in the base VS Code. When working with "Java projects" in VS Code, you must have the necessary extensions installed to work with those project files.

For example, Maven, Eclipse, and Gradle Java projects are supported through [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java), by utilizing [M2Eclipse](https://www.eclipse.org/m2e/), which provides Maven support, and [Buildship](https://github.com/eclipse/buildship), which provides Gradle support through the [Eclipse JDT Language Server](https://github.com/eclipse/eclipse.jdt.ls).

With [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven), you can generate projects from [Maven Archetypes](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html), browse through all the Maven projects within your workspace, and execute Maven goals easily from an embedded explorer. Projects can also be created and managed with the [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency) extension.

<video autoplay loop muted playsinline controls title="Using the Java Projects view from the Project Manager for Java extension">
  <source src="/docs/languages/java/package-viewer.mp4" type="video/mp4">
</video>

Visual Studio Code also supports working with standalone Java files outside of a Java project, described in the [Getting Started with Java](/docs/java/java-tutorial.md) tutorial.

### VS Code Workspaces that contain Java projects

Assuming the necessary Java extensions are installed, opening a VS Code workspace that contains Java artifacts will cause those extensions to understand those artifacts and present options for working with them.

More details about Java project support can be found in [Java Project Management in Visual Studio Code](/docs/java/java-project.md) and [Java Build Tools](/docs/java/java-build.md).

## Editing

### Code Navigation

Java in Visual Studio Code also supports source code navigation features such as search for symbol, Peek Definition, and Go to Definition. The [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-spring-boot) extension provides enhanced navigation and code completion support for [Spring Boot](https://projects.spring.io/spring-boot/) projects.

One of the key advantages of VS Code is speed. When you open your Java source file or folder, within a few seconds, with the help of [Lightweight Mode](/docs/java/java-project.md#lightweight-mode), you will be able to navigate your code base with the Outline view, as well as commands such as **Go to Definition** and **Go to Reference**. This is especially useful when you open a project for the first time.

### Code Completion

[IntelliSense](/docs/editor/intellisense.md) is a general term for language features, including intelligent code completion (in-context method and variable suggestions) across all your files and for both built-in and third-party modules. VS Code supports code completion and IntelliSense for Java through [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java). It also provides AI-assisted IntelliSense called [IntelliCode](https://visualstudio.microsoft.com/services/intellicode/) by putting what you're most likely to use at the top of your completion list.

<video autoplay loop muted playsinline controls title="Java inline code completions and hovers">
  <source src="/docs/languages/java/intellisense.mp4" type="video/mp4">
</video>

### Enhance completions with AI

[GitHub Copilot](https://copilot.github.com/) is an AI-powered code completion tool that helps you write code faster and smarter. You can use the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) in VS Code to generate code, or to learn from the code it generates.

[![GitHub Copilot extension in the VS Code Marketplace](images/java/copilot-extension.png)](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

You can learn more about how to get started with Copilot in the [Copilot documentation](/docs/editor/github-copilot.md).

## Code snippets

Visual Studio Code supports a wide range of popular Java code snippets to make you more productive, such as class/interface, syserr, sysout, if/else, try/catch, static main method. Using information from Java language server, it also provides a preview of the code snippet during the selection.

For example, typing "**sout**" or "**sysout**" will produce a code snippet for `System.out.println()`.<br>
Similarly, typing "**main**" or "**psvm**" will generate a code snippet for `public static void main(String[] args) {}`.

We support a wide range of code snippet shortcuts and postfix completion features. To see the complete list, see [Code Snippets](/docs/java/java-editing.md#code-snippets). VS Code also supports a range of [Refactoring](/docs/java/java-refactoring.md) and [Linting](/docs/java/java-linting.md) features.

![Code Snippet](images/java/code-snippet.png)

## Debugging

[Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) is a lightweight Java Debugger based on [Java Debug Server](https://github.com/microsoft/java-debug). It works with [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) to allow users to debug Java code within Visual Studio Code.

Starting a debugging session is easy: click the **Run|Debug** button available at the CodeLens of your `main()` function, or press `kb(workbench.action.debug.start)`. The debugger will automatically generate the proper configuration for you.

<video autoplay loop muted playsinline controls title="Setting a breakpoint, launching the debugging, and using Hot Code Replace">
  <source src="/docs/languages/java/resolve-main.mp4" type="video/mp4">
</video>

Although it's lightweight, the Java debugger supports advanced features such as expression evaluation, conditional breakpoints, and [Hot Code Replace](/docs/java/java-debugging.md#hot-code-replace). For more debugging-related information, visit [Java Debugging](/docs/java/java-debugging.md).

## Testing

With the support from the [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test) extension, you can easily run, debug, and manage your JUnit and TestNG test cases.

<video autoplay loop muted playsinline controls title="Running tests and investigating a failed test">
  <source src="/docs/languages/java/testng.mp4" type="video/mp4">
</video>

For more about testing, read [Testing Java](/docs/java/java-testing.md).

## Spring Boot, Tomcat, and Jetty

To further improve your Java productivity in VS Code, there are extensions for most popular frameworks and tools, such as [Spring Boot](https://projects.spring.io/spring-boot/), [Tomcat](https://tomcat.apache.org/), and [Jetty](https://www.eclipse.org/jetty/), created by the community.

See [Application Servers](/docs/java/java-tomcat-jetty.md) to learn more about support for Tomcat and Jetty, as well as other application servers with VS Code.

[Spring Boot](https://projects.spring.io/spring-boot/) support is provided by [VMware](https://marketplace.visualstudio.com/search?term=publisher%3A%22VMware%22&target=VSCode&category=All%20categories&sortBy=Relevance). There are also the [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr) and [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard) extensions provided by Microsoft, to further improve your experience with Spring Boot in Visual Studio Code.

See [Spring Boot with VS Code](/docs/java/java-spring-boot.md) to learn more about Spring Boot support in VS Code, and also [Deploy to Azure Web Apps](/docs/java/java-webapp.md) or [Deploy to Azure Spring Apps](/docs/java/java-spring-apps.md) to learn more about deploying Spring apps to Azure from VS Code.

## Next steps

Learn more about Java in VS Code:

* [Getting Started with Java](/docs/java/java-tutorial.md)
* [Code Editing and Navigation](/docs/java/java-editing.md)
* [Java Debugging](/docs/java/java-debugging.md)
* [Java Testing](/docs/java/java-testing.md)
* [Java Project Management](/docs/java/java-project.md)
* [Spring Boot with VS Code](/docs/java/java-spring-boot.md)
* [Application Servers](/docs/java/java-tomcat-jetty.md)
* [Azure with VS Code](/docs/java/java-on-azure.md)

Read on to find out more about Visual Studio Code:

* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Tasks](/docs/editor/tasks.md) - use tasks to build your project and more
* [Debugging](/docs/editor/debugging.md) - find out how to use the debugger with your project
