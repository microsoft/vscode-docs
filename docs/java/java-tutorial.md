---
Order: 1
Area: java
TOCTitle: Getting Started
ContentId: 12d8264b-643f-4745-a7ea-8433dedb1331
PageTitle: Getting Started with Java in Visual Studio Code
DateApproved: 9/14/2020
MetaDescription: Java tutorial showing basic Java language support in the Visual Studio Code editor
---

# Getting Started with Java in VS Code

This tutorial shows you how to write and run Hello World program in Java with Visual Studio Code. It also covers a few advanced features, which you can explore by reading other documents in this section.

For an overview of the features available for Java in VS Code, see [Java Language Overview](/docs/languages/java.md)

If you run into any issues when following this tutorial, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'getting-started')" href="javascript:void(0)">Report an issue</a>

If you need to install VS Code, [download it here](https://code.visualstudio.com/download).

## Supported Java versions

Supported versions for running VS Code for Java and supported versions for your projects are two seperate concepts. To run VS Code for Java, Java SE 11 or above version is required; for projects, VS Code for Java supports projects with version 1.5 or above. For more details, refer to [Configure JDK](/docs/java/java-project.md#configure-jdk).

## Setting up Visual Studio Code for Java Development

To help you set up quickly, here are the recommendations based on your experience with VS Code:

* **New to VS Code:** Use the [Installer of Visual Studio Code for Java developers](/docs/java/java-tutorial.md#installer-of-visual-studio-code-for-java-developers).
* **Existing VS Code user wanting to add Java support:** Install the [Java Extension Pack](/docs/java/java-tutorial.md#installing-extensions).

### Installer of Visual Studio Code for Java developers

There are special installers of Visual Studio Code for Java developers, which include all the necessary dependencies and extensions for Java development in Visual Studio Code:

* **Windows:** [Installer of Visual Studio Code for Java developers](https://aka.ms/vscode-java-installer-win)
* **macOS:** [Installer of Visual Studio Code for Java developers](https://aka.ms/vscode-java-installer-mac)

> **Note**: The installers are only available for Windows and macOS. For other operating systems, you will need to manually install a JDK, VS Code, and Java extensions.

The package can be used as a clean install, or you can also use it to update an existing development environment to add Java or VS Code. After you've downloaded and opened it, the installer automatically tries to detect a JDK, VS Code, and essential Java extensions. During install, it downloads the stable versions of those tools from trusted online sources then installs and configures them.

![Detect Environment](images/java-tutorial/detect-eng.png)

Alternatively, you can follow instructions below to install JDK or extensions seperately per your preference.

### Installing a Java Development Kit (JDK)

Your development environment must have a Java SE Development Kit (JDK) installed. If it doesn't, you can download and install a JDK from one of these sources:

* [Oracle Java SE](https://www.oracle.com/java/technologies/javase-downloads.html)
* [AdoptOpenJDK](https://adoptopenjdk.net/)
* [Azul Zulu for Azure - Enterprise Edition](https://www.azul.com/downloads/azure-only/zulu/)

### Configuring your development environment to use a JDK

Your development environment needs to know where the JDK is located. A common way to do this is [setting the value of the `JAVA_HOME` system environment variable](https://docs.oracle.com/cd/E19182-01/821-0917/inst_jdk_javahome_t/index.html) to the install location of the JDK, for example, `C:\Program Files\Java\jdk-13.0.2`. Or if you want to configure only VS Code to use the JDK, use the `java.home` setting in [VS Code's User or Workspace settings](/docs/getstarted/settings.md).

### Installing extensions

You can add Java support to VS Code by installing the popular Microsoft [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which includes these extensions:

* [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
* [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
* [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
* [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)

If JDK is not installed, the [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) provides links to download.

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Java Extension Pack</a>

You can also select which extensions you would like to install separately. The **Extension Guide** is provided to help you choose. You can launch the guide with the **Java: Extension Guide** command.

For this tutorial, the only required extensions are:

* [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)

## Settings for the JDK

To access various settings for using the JDK, bring up the **Command Palette** (`kb(workbench.action.showCommands)`) and use the command **Java: Configure Java Runtime**.

![JDK Configuration](images/java-tutorial/jdk-configuration.png)

The [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), also provides a Quick Start guide and tips for code editing and debugging. It also has a FAQ that answers some frequently asked questions. Use the command **Java: Getting Started** from the Command Palette (`kb(workbench.action.showCommands)`).

![Java Getting Started](images/java-tutorial/getting-started.png)

> **Note**: To configure multiple JDKs, see [Configure JDK](/docs/java/java-project.md#configure-jdk). To enable Java preview features, see [How can I use VS Code with new Java versions](/docs/java/java-faq.md#how-can-i-use-visual-studio-code-with-new-java-versions)

## Creating a source code file

Create a folder for your Java program and open the folder with VS Code. Then in VS Code, create a new file and save it with the name `Hello.java`. When you open that file, the Java Language Server automatically starts loading, and you should see a loading icon on the right side of the Status Bar. After it finishes loading, you will see a thumbs-up icon.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/JavaHelloWorld.Standalone.mp4" type="video/mp4">
</video>

>**Note**: If you open a Java file in VS Code without opening its folder, the Java Language Server might not work properly.

VS Code will also try to figure out the correct package for the new type and fill the new file from a template. See [Create new file](/docs/java/java-editing.md#create-new-file).

You can also create a Java project using the **Java: Create Java Project** command. Bring up the **Command Palette**  (`kb(workbench.action.showCommands)`) and then type `java` to search for this command. After selecting the command, you will be prompted for the location and name of the project. You can also choose your build tool from this command.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/JavaHelloWorld.Project.mp4" type="video/mp4">
</video>

Visual Studio Code also supports more complex Java projects, see [Project Management](/docs/java/java-project.md).

## Editing source code

You can use code snippets to scaffold your classes and methods. VS Code also provides IntelliSense for code completion, and various refactor methods.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/edit-code.mp4" type="video/mp4">
</video>

To learn more about editing Java, see [Java Editing](/docs/java/java-editing.md).

## Running and debugging your program

To run and debug Java code, set a breakpoint, then either press `kb(workbench.action.debug.start)` on your keyboard or use the **Run** > **Start Debugging** menu item. You can also use the **Run|Debug** CodeLens options in the editor. After the code compiles, you can see all your variables and threads in the Run view.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/run-debug.mp4" type="video/mp4">
</video>

The debugger also supports advanced features such as Hot Code replacement and conditional breakpoints.

For more information, see [Java Debugging](/docs/java/java-debugging.md).

## More features

The editor also has much more capability for your Java workload.

* [Editing Java](/docs/java/java-editing.md) explains how to navigate and edit Java in more details
* [Debugging](/docs/java/java-debugging.md) illustrates all the key features of the Java Debugger
* [Testing](/docs/java/java-testing.md) provides comprehensive support for JUnit and TestNG framework
* [Java Project Management](/docs/java/java-project.md) shows you how to use a project view and work with Maven
* [Spring Boot](/docs/java/java-spring-boot.md) and [Tomcat and Jetty](/docs/java/java-tomcat-jetty.md) demonstrate great framework support
* [Java Web Apps](/docs/java/java-webapp.md) shows how to work with Java Web App in VS Code
