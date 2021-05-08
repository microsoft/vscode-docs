---
Order: 1
Area: java
TOCTitle: Getting Started
ContentId: 12d8264b-643f-4745-a7ea-8433dedb1331
PageTitle: Getting Started with Java in Visual Studio Code
DateApproved: 4/14/2021
MetaDescription: Java tutorial showing basic Java language support in the Visual Studio Code editor
---

# Getting Started with Java in VS Code

This tutorial shows you how to write and run Hello World program in Java with Visual Studio Code. It also covers a few advanced features, which you can explore by reading other documents in this section.

For an overview of the features available for Java in VS Code, see [Java Language Overview](/docs/languages/java.md)

If you run into any issues when following this tutorial, you can contact us by clicking the **Report an issue** button below.

<a class="tutorial-feedback-btn" onclick="reportIssue('java-tutorial', 'getting-started')" href="javascript:void(0)">Report an issue</a>

## Setting up VS Code for Java development

### Coding Pack for Java

To help you set up quickly, you can install the **Coding Pack for Java**, which includes VS Code, the Java Development Kit (JDK), and essential Java extensions. The Coding Pack can be used as a clean installation, or to update or repair an existing development environment.

<a class="tutorial-install-extension-btn" onclick="pushCodingPackEvent('java', 'win')" href="https://aka.ms/vscode-java-installer-win">Install the Coding Pack for Java - Windows</a>

<a class="tutorial-install-extension-btn" onclick="pushCodingPackEvent('java', 'mac')" href="https://aka.ms/vscode-java-installer-mac">Install the Coding Pack for Java - macOS</a><br>

> **Note**: The Coding Pack for Java is only available for Windows and macOS. For other operating systems, you will need to manually install a JDK, VS Code, and Java extensions.

### Installing extensions

If you are an existing VS Code user, you can also add Java support by installing [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which includes these extensions:

* [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
* [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
* [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
* [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Java Extension Pack</a>

The [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) provides a Quick Start guide and tips for code editing and debugging. It also has a FAQ that answers some frequently asked questions. Use the command **Java: Getting Started** from the Command Palette (`kb(workbench.action.showCommands)`) to launch the guide.

![Java Getting Started](images/java-tutorial/getting-started.png)

You can also install extensions separately. The **Extension Guide** is provided to help you. You can launch the guide with the **Java: Extension Guide** command.

For this tutorial, the only required extensions are:

* [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
* [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)

## Settings for the JDK

### Supported Java versions

The supported version for running the VS Code for Java extension and the supported version for your projects are two separate runtimes. To run VS Code for Java, Java SE 11 or above version is required; for projects, VS Code for Java supports projects with version 1.5 or above. For more details, refer to [Configure JDK](/docs/java/java-project.md#configure-jdk).

### Using Java runtime configuration wizard

To help you configure correctly, we provide a runtime configuration wizard. You can launch the wizard by opening the **Command Palette** (`kb(workbench.action.showCommands)`) and typing the command **Java: Configure Java Runtime**, which will display the configuration user interface below.

![JDK Configuration](images/java-tutorial/jdk-config-wizard-overview.png)

> **Note**: To configure multiple JDKs, see [Configure JDK](/docs/java/java-project.md#configure-jdk). To enable Java preview features, see [How can I use VS Code with new Java versions](/docs/java/java-faq.md#how-can-i-use-visual-studio-code-with-new-java-versions)

### Using VS Code settings

Alternatively, you can configure JDK settings using the VS Code Settings editor. A common way to do this is [setting the value of the JAVA_HOME system environment variable](https://docs.oracle.com/cd/E19182-01/821-0917/inst_jdk_javahome_t/index.html) to the install location of the JDK, for example, `C:\Program Files\Java\jdk-13.0.2`. Or if you want to configure only VS Code to use the JDK, use the `java.home` setting in VS Code's [User or Workspace settings](/docs/getstarted/settings.md).

### Installing a Java Development Kit (JDK)

When you need install a JDK, we recommend you to consider installing from one of these sources:

* [Oracle Java SE](https://www.oracle.com/java/technologies/javase-downloads.html)
* [AdoptOpenJDK](https://adoptopenjdk.net/)
* [Azul Zulu for Azure - Enterprise Edition](https://www.azul.com/downloads/azure-only/zulu/)

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
