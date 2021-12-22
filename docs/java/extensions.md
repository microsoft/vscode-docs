---
Order: 12
Area: java
TOCTitle: Extensions
ContentId: 6076911c-276b-41a3-8510-0022c03c0ef6
PageTitle: Java extensions for Visual Studio Code
DateApproved: 8/31/2021
MetaDescription: Popular Java extensions for Visual Studio Code
---
# Java extensions for Visual Studio Code

Thanks to the great Java community around Visual Studio Code, you can use a wide range of extensions to enhance your Java development experience

> **Tip:** To learn how to install and manage your extensions, refer to the [extension documentation](/docs/editor/extension-marketplace.md).

On this page, we will recommend a list of popular extensions that might help you for different scenarios.

## Recommended extensions

## Fundamental Java Development

If you are looking for core Java development experience on Visual Studio Code (including Java code auto-completion, running / debugging / testing Java application, Java project management, etc), we recommend the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack). This extension pack contains a list of popular Java extensions for fundamental Java development:

1. [Language Support for Java™ by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
2. [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
3. [Test Runner for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
4. [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)
5. [Project Manager for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-dependency)
6. [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Extension Pack for Java</a>

To get started with this extension pack, you can visit [Getting Started with Java](https://code.visualstudio.com/docs/java/java-tutorial) tutorial

## Spring Boot extensions

Spring Boot is an open source, microservice-based Java web framework that is very popular among Java developers. There are great extensions provided by Pivotal and Microsoft for Spring Boot development.

We recommend installing the [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-boot-dev-pack) which contains the following extensions:

1. [Spring Boot Tools](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
2. [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
3. [Spring Boot Dashboard](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-boot-dashboard)

<a class="tutorial-install-extension-btn" href="vscode:extension/Pivotal.vscode-boot-dev-pack">Install the Extension Pack for Java</a>

## Application Servers (Tomcat / Jetty / etc)

[Community Server Connectors](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-community-server-connector) is an excellent extension for application servers such as Tomcat, Jetty, etc.

To learn more about how to work with Java application server on Visual Studio Code, please refer to the [Application Server](https://code.visualstudio.com/docs/java/java-tomcat-jetty) page.

## Popular extensions from the community

Thanks to the great Java community around VS Code, there are many great community-created extensions as well. You can search for more Java extensions easily within the VS Code:

1. Go to the **Extensions** view (`kb(workbench.view.extensions)`).
2. Filter the extensions list by typing 'java'.

Here are a few useful extensions:

1. [Tomcat](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat)
2. [Jetty](https://marketplace.visualstudio.com/items?itemName=SummerSun.vscode-jetty)
3. [Server Connector](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-server-connector)
4. [Community Server Connectors](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-community-server-connector)
5. [Extension Pack for MicroProfile](https://marketplace.visualstudio.com/items?itemName=MicroProfile-Community.vscode-microprofile-pack)
6. [CheckStyle](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle)
7. [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
8. [Java Decompiler](https://marketplace.visualstudio.com/items?itemName=dgileadi.java-decompiler)
9. [Lombok Annotations Support](https://marketplace.visualstudio.com/items?itemName=GabrielBB.vscode-lombok)
10. [Java Properties](https://marketplace.visualstudio.com/items?itemName=ithildir.java-properties)
11. [Bazel](https://marketplace.visualstudio.com/items?itemName=BazelBuild.vscode-bazel)

We also appreciate contributions to any of our existing extensions and we hope you'll create new Java extensions if you don't find what you're looking for in the Marketplace. We're especially looking for help in areas such as support for Gradle and other Java application servers.

## Recommended extensions with great Java support

We'd also like to recommend a couple of other extensions we believe are great to make VS Code even better for Java developers.

1. [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) is a great tool to use when you need to collaborate with someone else on the same code base.
2. The [Remote Development](/docs/remote/remote-overview.md) extensions let you use VS Code to access a container, a remote machine, or the Windows Subsystem for Linux.

## Extension for container development

You can use [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension to build docker images and work with image registries.

[Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extension provides an Explorer view to manage clusters and the nodes inside. It also provides advanced syntax support for editing Kubernetes manifest files.

## Recommended extensions for cloud (Azure) development

### Team development

* The [Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team) extension makes it easy to connect to your Azure DevOps Servers, allowing you to easily monitor builds, pull requests, and work items for your TFVC or Git source repositories.

### Internet of Things

* The [Azure IoT Toolkit](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit) for VS Code makes it easy to develop and connect your [IoT applications to Azure](https://docs.microsoft.com//azure/index#pivot=services&panel=iot). With this extension, you can interact with Azure IoT Hub, manage devices connected to Azure IoT Hub, and develop with code snippets for Azure IoT Hub.

### General tools

* The [Azure Tools Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) provides a rich set of extensions that makes it easy to discover and interact with Azure services to power your applications.

* The [Azure Resource Manager Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools) provide a rich editing experience for Azure Resource Manager deployment templates and template language expressions. For example, IntelliSense for TLE function names, parameter references, signature help, Go to Definition, Peek Definition, and Peek References as well as Errors and Warnings, making it quick and easy to author Azure Resource Manager templates in VS Code.

Visit [Azure Extensions](/docs/azure/extensions.md) to find more Azure extensions.

## Search for other Java extensions

If the extensions above do not meet your requirement, you can also search for other Java related extensions within Visual Studio Code. Here are the steps:

1. Go to the **Extensions** view (`kb(workbench.view.extensions)`).
2. Filter the extensions list by typing "java".

![Java Extensions](images/extensions/extensions.png)
