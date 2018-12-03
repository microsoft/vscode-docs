---
Order: 8
Area: java
TOCTitle: Extensions
ContentId: 6076911c-276b-41a3-8510-0022c03c0ef6
PageTitle: Java Extensions for Visual Studio Code
DateApproved: 5/30/2018
MetaDescription: Popular Java Extensions for Visual Studio Code
---
# Java Extensions for Visual Studio Code

Visual Studio Code provides many features as a Java language editor. You can also install VS Code extensions to add more features for Java development.

> **Tip:** To see how to install and manage your extensions, refer to the [extension documentation](/docs/editor/extension-gallery.md).

## Recommended extensions

To help set up Java on VS Code, there is the Microsoft [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) which contains these popular extensions:

1. [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
2. [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)
3. [Java Test Runner](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-test)
4. [Maven for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-maven)

<a class="tutorial-install-extension-btn" href="vscode:extension/vscjava.vscode-java-pack">Install the Java Extension Pack</a>

There are many other popular Java extensions you can pick from, including:

1. [Spring Boot Support](https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot)
2. [Spring Initializr Java Support](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-spring-initializr)
3. [Tomcat](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat)
4. [Jetty](https://marketplace.visualstudio.com/items?itemName=SummerSun.vscode-jetty)
5. [CheckStyle](https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-checkstyle)

Thanks to the great Java community around VS Code, the list doesn't end there. You can search for more Java extensions easily within the VS Code:

1. Go to the **Extensions** view (`kb(workbench.view.extensions)`).
2. Filter the extensions list by typing 'java'.

## Recommended extensions for cloud (Azure) development

Along with Java language support, if you are deploying your applications to the cloud, especially Azure, there is an [Azure Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-azureextensionpack) which contains extensions for popular Azure Services.

Here's a list of Azure extensions supporting Java:

### App Services (Websites)

* The [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extension lets you quickly browse, create, manage, and deploy Azure App Service websites.

### Functions (serverless computing)

* The [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) extension lets you quickly browse, create, manage, deploy, and even debug Azure functions locally.

### Micro-Services

* The [Docker](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) extension makes it easy to develop and deploy containerized micro-service based applications using Docker containers. Use [Azure DevOps](https://docs.microsoft.com/azure/devops) to create a CI/CD pipeline to build your containerized applications, deploy them to the [Azure Container Registry](https://docs.microsoft.com//azure/container-registry/), run websites directly in [Azure App Services](https://docs.microsoft.com//azure/app-service/), and run multi-container systems at scale using the [Azure Container Service](https://docs.microsoft.com//azure/container-service/).

* The [Kubernetes Tools](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extension lets you quickly develop Kubernetes manifests and HELM charts, then deploy containerized micro-service based applications to local or Azure Kubernetes cluster and live debug your applications running in containers of a Kubernetes cluster. It also makes it easy to browse and manage your Kubernetes cluster in VS Code. Furthermore it provides seamless integration with Draft to streamline Kubernetes development.

### Storage

* The [Azure Data Lake Tools](https://marketplace.visualstudio.com/items?itemName=usqlextpublisher.usql-vscode-ext) make it easy to develop U-SQL projects against [Azure Data Lake](https://docs.microsoft.com//azure/data-lake-store/)! This extension provides a cross-platform, light-weight, keyboard-focused authoring experience for U-SQL while maintaining a full set of development functions.

### Databases

* The [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) extension lets you create, manage, and query Cosmos DB accounts, including support for Mongo, Graphs, Tables, and DocumentDB databases.

* The [Microsoft SQL](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql) extension provides support for developing [Microsoft SQL Server](https://www.microsoft.com//sql-server/sql-server-2016), [Azure SQL Database](https://docs.microsoft.com//azure/sql-database/) and [SQL Data Warehouse](https://docs.microsoft.com//azure/sql-data-warehouse/) with a rich set of functionalities. For example, create and manage connection profiles and most recently used connections. Write T-SQL script with IntelliSense, snippets, syntax colorizations, error validations and GO batch separator. Execute scripts, view the results in a document, and save results to json or csv file format and view in the editor.

### Team development

* The [Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vsts.team) extension makes it easy to connect to your Azure DevOps servers, allowing you to easily monitory builds, pull requests, and work items for your TFVC or Git source repositories.

### Internet of Things

* The [Azure IoT Toolkit](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit) for VS Code makes it easy to develop and connect your [IoT applications to Azure](https://docs.microsoft.com//azure/index#pivot=services&panel=iot). With this extension, you can interact with Azure IoT Hub, manage devices connected to Azure IoT Hub, and develop with code snippets for Azure IoT Hub.

### General tools

* The [Azure Tools for VS Code](https://marketplace.visualstudio.com/items?itemName=bradygaster.azuretoolsforvscode) adds commands to the **Command Palette** (`kb(workbench.action.showCommands)`) that make it easy to create and access Azure resources directly from VS Code. For example, you can create App Service Web Apps and Functions, Storage accounts, and browse to any number of resources in the Azure Portal.

* The [Azure Resource Manager (ARM) Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools) provide a rich editing experience for Azure Resource Manager deployment templates and template language expressions. For example, IntelliSense for TLE function names, parameter references, signature help, Go to Definition, Peek Definition, and Find All References (Shift+F12) as well as Errors and Warnings, making it quick and easy to author ARM templates in VS Code.

* The [Azure CLI Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli) provide an enhanced editing experience when authoring Azure CLI 2.0 commands, with full completions (IntelliSense), the ability to invoke one or more commands in the terminal, and the ability to easily view and format results as a separate JSON document.

* The [Azure Application Insights](https://marketplace.visualstudio.com/items?itemName=VisualStudioOnlineApplicationInsights.application-insights) extension brings information from your production services right into the editor (via CodeLens), helping you to find and fix issues even faster.
