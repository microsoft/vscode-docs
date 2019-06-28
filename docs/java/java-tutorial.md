---
Order: 1
Area: java
TOCTitle: Java Tutorial
ContentId: 12d8264b-643f-4745-a7ea-8433dedb1331
PageTitle: Writing Java with Visual Studio Code
DateApproved: 6/17/2019
MetaDescription: Java tutorial showing basic Java language support in the Visual Studio Code editor
---

# Writing Java with Visual Studio Code

This tutorial shows you how to write and run a simple Hello World program in Java with Visual Studio Code. It also covers a few advanced features, which you can explore by reading other documents in this section.

If you run into any issues when following this tutorial, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'getting-started')" href="javascript:void(0)">Report an issue</a>

## Install Visual Studio Code for Java

### Before you begin

Before going through this tutorial, you must have the Java SE Development Kit (JDK) on your local development environment. If you don't have them installed, you can do so now.

Download and install the Java SE Development Kit (JDK). Java support on Visual Studio Code works with all major Java versions up to 12, see a few JDK distributions you can choose from:

* [OpenJDK](https://adoptopenjdk.net/)
* [Azul Zulu Enterprise for Azure](https://www.azul.com/downloads/azure-only/zulu/)
* [Java SE Downloads by Oracle](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

>**Note**: After installing the JDK, you would need to configure your environment for Java development. The most common way is to [set](https://docs.oracle.com/cd/E19182-01/821-0917/inst_jdk_javahome_t/index.html) `JAVA_HOME` environment variable to the install location of the JDK while you can also use `java.home` setting in Visual Studio Code settings ([workspace or user settings](/docs/getstarted/settings)) to configure it just for the editor.

To help you get started quickly, we created a special [Installer of Visual Studio Code for Java developers](https://aka.ms/vscode-java-installer-win).

<a class="tutorial-install-extension-btn" href="https://aka.ms/vscode-java-installer-win">Download Visual Studio Code Java Pack Installer</a>

> **Note**: The installer is currently only available for Windows. For other OS, please install those components (JDK, VS Code and Java extensions) individually. We're working on the macOS version, please stay tuned.

The package can be used as a clean install or an update for an existing development environment to add Java or Visual Studio Code. Once [downloaded](https://aka.ms/vscode-java-installer-win) and opened, it automatically detects if you have the fundamental components in your local development environment, including the JDK, Visual Studio Code, and essential Java extensions. During install, it downloads the stable versions of those tools from trusted online sources, then installs and configures them on your system.

![Detect Environment](images/java-tutorial/detect-eng.png)

Alternatively, you can also add Java language support to VS Code by installing the popular Java extensions by yourself.

> **Note**: You can install Visual Studio Code from [https://code.visualstudio.com](https://code.visualstudio.com/).

There is the Microsoft [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which contains these popular extensions:

1. [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
2. [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
3. [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
4. [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
5. [Java Dependency Viewer](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Java Extension Pack</a>

[Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) also detects your environment to see whether a JDK is present. If not, it will provide you links to download reliable JDK at your choice.

![Acquire JDK](images/java-tutorial/jdk.acquisition.guide.gif)

You can also select which extensions you would like to install separately. For this tutorial, only [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) and [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug) are needed.

## Create the program

Create a folder for your Java program and open the folder with Visual Studio Code. Within Visual Studio Code, you can then create a new file `Hello.java`. When you open that file, the Java Language Server will automatically be activated as you can see a rocket icon on the right of the Status bar. When it finishes loading, you will see a thumbs up icon instead.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/create-file.mp4" type="video/mp4">
</video>

Visual Studio Code also supports more complex Java projects, see [Project Management](/docs/java/java-project.md).

>**Note**: The Java Language Server might not work properly if you open a standalone Java file in Visual Studio Code without opening its folder.

## Editing code

In Visual Studio Code, you can easily use code snippets to scaffold your class and method. VS Code also provides IntelliSense for code completion.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/edit-code.mp4" type="video/mp4">
</video>

You can also use various refactor methods within the editor. To learn more about Java code editing in Visual Studio Code, see [Java Editing](/docs/java/java-editing.md).

## Running and debugging your program

It is easy to run and debug Java in Visual Studio Code. You can either click `kb(workbench.action.debug.start)` or use the **Run|Debug** CodeLens options. Just set a breakpoint and you can see all your variables and threads in the Debug view.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/run-debug.mp4" type="video/mp4">
</video>

The debugger also supports advanced features such as Hot Code replacement and conditional breakpoints. For more information, see [Java Debugging](/docs/java/java-debugging.md).

## More features

Now you've seen how easy it is to write a simple Java program with Visual Studio Code. The editor has much more capability to offer for your Java workload.

* [Editing Java](/docs/java/java-editing.md) explains how to navigate and edit Java in more details.
* [Debugging](/docs/java/java-debugging.md) illustrates all the key features provided for Java debug.
* [Testing](/docs/java/java-testing.md) provides comprehensive supports for JUnit and TestNG framework.
* [Java Project Management](/docs/java/java-project.md) shows you how it provides you a project view and works with Maven.
* [Spring Boot Support](/docs/java/java-spring-boot.md) and [Tomcat and Jetty](/docs/java/java-tomcat-jetty.md) demonstrate great support for Spring Boot, Tomcat, and Jetty.https://code.visualstudio.com/docs/getstarted/settings

To learn how to work with Java Web App in VS Code, read [Java Web App](/docs/java/java-webapp.md).
