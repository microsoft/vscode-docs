---
Order: 13
Area: java
TOCTitle: Extensions
ContentId: 6076911c-276b-41a3-8510-0022c03c0ef6
PageTitle: Java extensions for Visual Studio Code
DateApproved: 1/4/2022
MetaDescription: Popular Java extensions for Visual Studio Code
---
# Java extensions for Visual Studio Code

Thanks to the great Java community around Visual Studio Code, you can use a wide range of extensions to enhance your Java development experience.

> **Tip:** To learn how to install and manage your extensions, refer to the general [VS Code extension documentation](/docs/editor/extension-marketplace.md).

In this topic, we recommend a list of popular extensions helpful for different Java development scenarios.

## Fundamental Java development

If you are looking for core Java development experience on Visual Studio Code (including Java code auto-completion, running / debugging / testing Java applications, Java project management, etc.), we recommend the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack). This extension pack contains a list of popular Java extensions for fundamental Java development:

1. [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
2. [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
3. [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
4. [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
5. [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)
6. [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

<a class="install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

To get started with this extension pack, you can visit [Getting Started with Java](/docs/java/java-tutorial.md) tutorial.

You can also install the [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode) extension that detects quality and security issues in your code.

## Spring Boot extensions

Spring Boot is an open source, microservice-based Java web framework that is very popular among Java developers. There are great extensions provided by Pivotal and Microsoft for Spring Boot development.

We recommend installing the [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack) that contains the following extensions:

1. [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
2. [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
3. [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

<a class="install-extension-btn" href="vscode:extension/Pivotal.vscode-boot-dev-pack">Install the Spring Boot Extension Pack</a>

More Spring Boot related information can be found at the [Spring Boot](/docs/java/java-spring-boot.md) page.

## Gradle for Java

Visual Studio Code offers support Gradle support via the [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle) extension. To learn more how to use this extension, visit the [Gradle section](/docs/java/java-build.md#gradle) on Build Tools page.

## Application Servers (Tomcat / Jetty / etc.)

[Community Server Connectors](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-community-server-connector) is an excellent extension for application servers such as Tomcat and Jetty.

To learn more about how to work with Java application servers on Visual Studio Code, refer to the [Application Server](/docs/java/java-tomcat-jetty.md) page.

## MicroProfile / Quarkus

Support for Eclipse MicroProfile and Quarkus are provided via the following extensions:

* [Extension pack for MicroProfile](https://marketplace.visualstudio.com/items?itemName=MicroProfile-Community.vscode-microprofile-pack)
* [Quarkus](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-quarkus)

## Keymaps for other Java IDEs

There are some extensions from the community for developers who might be used to the keyboard shortcuts from other Java IDEs.

* [Eclipse Keymap](https://marketplace.visualstudio.com/items?itemName=alphabotsec.vscode-eclipse-keybindings)
* [IntelliJ IDEA Keybindings](https://marketplace.visualstudio.com/items?itemName=k--kato.intellij-idea-keybindings)

Keymap extensions apply keyboard shortcuts from other IDEs or editors on to VS Code so you don't have to retrain your fingers to new keyboard shortcuts.

## Remote development and container support

We'd also like to recommend a couple of other extensions that are useful for remote and container development scenarios.

* The [Remote Development](/docs/remote/remote-overview.md) extensions let you use VS Code to access a container, a remote machine, or the Windows Subsystem for Linux.
* You can use [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension to build docker images and work with image registries.
* [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extension provides an Explorer view to manage clusters and the nodes inside. It also provides advanced syntax support for editing Kubernetes manifest files.
* [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) is a great tool to use when you need to collaborate with someone else on the same code base.

## Azure on Visual Studio Code

The Azure extensions for Visual Studio Code provide seamless integration with Azure and the cloud. There are a few Azure extensions we'd like to recommend.

### Team development

* The [Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team) extension makes it easy to connect to your Azure DevOps Servers, allowing you to easily monitor builds, pull requests, and work items for your TFVC or Git source repositories.

### Internet of Things

* The [Azure IoT Toolkit](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit) for VS Code makes it easy to develop and connect your [IoT applications to Azure](https://learn.microsoft.com/azure/?product=iot). With this extension, you can interact with Azure IoT Hub, manage devices connected to Azure IoT Hub, and develop with code snippets for Azure IoT Hub.

### General tools

* The [Azure Tools Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) provides a rich set of extensions that makes it easy to discover and interact with Azure services to power your applications.
* The [Azure Resource Manager Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools) provide a rich editing experience for Azure Resource Manager deployment templates and template language expressions. For example, IntelliSense for TLE function names, parameter references, signature help, Go to Definition, Peek Definition, and Peek References as well as Errors and Warnings, making it quick and easy to author Azure Resource Manager templates in VS Code.

Visit [Azure Extensions](/docs/azure/extensions.md) to find more Azure extensions.

## Search for other Java extensions

If the extensions above do not meet your requirement, you can also search for other Java related extensions within Visual Studio Code. Here are the steps:

1. Go to the **Extensions** view (`kb(workbench.view.extensions)`).
2. Filter the extensions list by typing "java".

![Java Extensions](images/extensions/extensions.png)

We also appreciate contributions to any of our existing extensions and we hope you'll create new Java extensions if you don't find what you're looking for in the Marketplace.
