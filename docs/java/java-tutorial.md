---
Order: 1
Area: java
TOCTitle: Getting Started
ContentId: 12d8264b-643f-4745-a7ea-8433dedb1331
PageTitle: Getting Started with Java in Visual Studio Code
DateApproved: 1/4/2022
MetaDescription: Java tutorial showing basic Java language support in the Visual Studio Code editor
---

# Getting Started with Java in VS Code

This tutorial shows you how to write and run Hello World program in Java with Visual Studio Code. It also covers a few advanced features, which you can explore by reading other documents in this section.

For an overview of the features available for Java in VS Code, see [Java Language Overview](/docs/languages/java.md).

If you run into any issues when following this tutorial, you can contact us by entering an [issue](https://github.com/microsoft/vscode-java-pack/issues).

## Setting up VS Code for Java development

### Coding Pack for Java

To help you set up quickly, you can install the **Coding Pack for Java**, which includes VS Code, the Java Development Kit (JDK), and essential Java extensions. The Coding Pack can be used as a clean installation, or to update or repair an existing development environment.

<a class="install-extension-btn" onclick="pushCodingPackEvent('java', 'win')" href="https://aka.ms/vscode-java-installer-win">Install the Coding Pack for Java - Windows</a>

<a class="install-extension-btn" onclick="pushCodingPackEvent('java', 'mac')" href="https://aka.ms/vscode-java-installer-mac">Install the Coding Pack for Java - macOS</a><br>

> **Note**: The Coding Pack for Java is only available for Windows and macOS. For other operating systems, you will need to manually install a JDK, VS Code, and Java extensions.

### Installing extensions

If you are an existing VS Code user, you can also add Java support by installing the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which includes these extensions:

* [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
* [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
* [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
* [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)
* [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

The [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) provides a Quick Start guide and tips for code editing and debugging. It also has a FAQ that answers some frequently asked questions. Use the command **Java: Tips for Beginners** from the Command Palette (`kb(workbench.action.showCommands)`) to launch the guide.

![Java Getting Started](images/java-tutorial/getting-started.png)

You can also install extensions separately. The **Extensions Guide** is provided to help you. You can launch the guide with the **Java: Extensions Guide** command.

For this tutorial, the only required extensions are:

* [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)

## Installing and setting up a Java Development Kit (JDK)

To use Java within Visual Studio Code, you need to install a Java Development Kit (JDK) on your local environment. JDK is a software development environment used for developing Java applications.

### Supported Java versions

The [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) supports Java version 1.5 or above.

> **Note**: To configure JDKs for your projects, see [Configure Runtime for Projects](/docs/java/java-project.md#configure-runtime-for-projects). To enable Java preview features, see [How can I use VS Code with new Java versions](/docs/java/java-faq.md#how-can-i-use-visual-studio-code-with-new-java-versions).

### Installing a Java Development Kit (JDK)

If you have never installed a JDK before and need to install one, we recommend you to choose from one of these sources:

* [Amazon Corretto](https://aws.amazon.com/corretto)
* [Azul Zulu](https://www.azul.com/downloads/?package=jdk)
* [Eclipse Adoptium's Temurin](https://adoptium.net/)
* [IBM Semeru Runtimes](https://developer.ibm.com/languages/java/semeru-runtimes)
* [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk)
* [Oracle Java SE](https://www.oracle.com/java/technologies/javase-downloads.html)
* [Red Hat build of OpenJDK](https://developers.redhat.com/products/openjdk/download)
* [SapMachine](https://sapmachine.io)

## Creating a source code file

Create a folder for your Java program and open the folder with VS Code. Then in VS Code, create a new file and save it with the name `Hello.java`. When you open that file, the Java Language Server automatically starts loading, and you should see a language status item with a loading icon on the right side of the Status Bar showing the language status is busy. After it finishes loading, you can hover on the language status item and find the loading process has been finished successfully. You can also choose to pin the status item in the status bar.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/JavaHelloWorld.Standalone.mp4" type="video/mp4">
</video>

>**Note**: If you open a Java file in VS Code without opening its folder, the Java Language Server might not work properly.

VS Code will also try to figure out the correct package for the new type and fill the new file from a template. See [Create new file](/docs/java/java-editing.md#create-new-file).

You can also create a Java project using the **Java: Create Java Project** command. Bring up the **Command Palette**  (`kb(workbench.action.showCommands)`) and then type `java` to search for this command. After selecting the command, you will be prompted for the location and name of the project. You can also choose your build tool from this command.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/JavaHelloWorld.Project.mp4" type="video/mp4">
</video>

Visual Studio Code also supports more complex Java projects — see [Project Management](/docs/java/java-project.md).

## Editing source code

You can use code snippets to scaffold your classes and methods. VS Code also provides IntelliSense for code completion, and various refactor methods.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/edit-code.mp4" type="video/mp4">
</video>

To learn more about editing Java, see [Java Editing](/docs/java/java-editing.md).

## Running and debugging your program

To run and debug Java code, set a breakpoint, then either press `kb(workbench.action.debug.start)` on your keyboard or use the **Run** > **Start Debugging** menu item. You can also use the **Run|Debug** CodeLens option in the editor. After the code compiles, you can see all your variables and threads in the **Run and Debug** view.

<video autoplay loop muted playsinline controls>
  <source src="/docs/java/java-tutorial/run-debug.mp4" type="video/mp4">
</video>

The debugger also supports advanced features such as [Hot Code Replace](/docs/java/java-debugging.md#hot-code-replace) and conditional breakpoints.

For more information, see [Java Debugging](/docs/java/java-debugging.md).

## More features

The editor also has many more capabilities to assist with your Java workload.

* [Editing Java](/docs/java/java-editing.md) explains how to navigate and edit Java in more details
* [Debugging](/docs/java/java-debugging.md) illustrates all the key features of the Java Debugger
* [Testing](/docs/java/java-testing.md) provides comprehensive support for JUnit and TestNG framework
* [Java Project Management](/docs/java/java-project.md) shows you how to use a project view and work with Maven
* [Spring Boot](/docs/java/java-spring-boot.md) and [Tomcat and Jetty](/docs/java/java-tomcat-jetty.md) demonstrate great framework support
* [Java Web Apps](/docs/java/java-webapp.md) shows how to work with Java Web App in VS Code
