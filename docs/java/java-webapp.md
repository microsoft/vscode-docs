---
Area: java
TOCTitle: Java Web App
ContentId: 98ddf1d3-6a8e-4b0f-a44d-e57cfdf2348c
PageTitle: Build and Deploy Java Web Apps to the cloud with Visual Studio Code
DateApproved: 3/2/2023
MetaDescription: Java web app tutorial showing how to build and deploy a Java web app to Azure with Visual Studio Code
---

# Java Web Apps with Visual Studio Code

This tutorial shows you how to create a Java web application with Visual Studio Code. You'll learn how to run, debug, and edit the Java web app locally and eventually on the cloud.

## Scenario

A simple Spring Boot Getting Started web app

![Greeting from Java](images/java-webapp/greeting-from-spring.png)

## Before you begin

Before running and deploying this sample, you must have the Java SE Development Kit (JDK) and Apache Maven build tools on your local development environment. If you don't have, please install them.

Download and install the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which has JDK 11 included.

>**Note**: The `JAVA_HOME` environment variable must be set to the install location of the JDK to complete this tutorial.

Download Apache Maven version 3 or greater:

<a class="install-extension-btn" href="https://maven.apache.org/download.cgi" target="_blank" style="background-color:#68217A">Download Apache Maven</a>

Install Apache Maven for your local development environment:

<a class="install-extension-btn" href="https://maven.apache.org/install" target="_blank" style="background-color:#68217A">Install Apache Maven</a>

## Download and test the Spring Boot app

Clone the [Spring Boot Getting Started](https://github.com/spring-guides/gs-spring-boot) sample project to your local machine. You can clone a Git repository with the **Git: Clone** command in the **Command Palette** (`kb(workbench.action.showCommands)`). Paste `https://github.com/spring-guides/gs-spring-boot.git` as the URL of the remote repository and then decide the parent directory under which to put the local repository. After that, open the `complete` folder within the cloned repository in VS Code by navigating to the folder and typing `code .`.

>**Note**: You can install Visual Studio Code from [https://code.visualstudio.com](https://code.visualstudio.com/) and Git from [https://git-scm.com](https://git-scm.com/).

![Clone Spring Repository](images/java-webapp/clone-repository.gif)

From within VS Code, open any of the Java files within the `complete` folder (for example `src\main\java\hello\Application.java`). If you don't have the Java language extensions installed for VS Code, you will be prompted to install the Microsoft [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack). Follow the instructions and reload VS Code after the installation.

![Install Java Extensions](images/java-webapp/install-extensions.gif)

Once you have the Extension Pack for Java installed, it will automatically build the project for you (this may take several minutes). You can run the application within VS Code by pressing `kb(workbench.action.debug.start)` and selecting the **Java** environment. The Java Debug extension will generate a debugging configuration file `launch.json` for you under a `.vscode` folder in your project. You can see build progress in the VS Code Status Bar and when everything is finished, the final active debug configuration is displayed.

![debug configuration in the Status Bar](images/java-webapp/debugging-status-bar.png)

You can learn more about how VS Code launches your application in Debugging [Launch Configurations](/docs/editor/debugging.md#launch-configurations). Press `kb(workbench.action.debug.start)` again to launch the debugger.

![Run Spring Boot](images/java-webapp/run-spring-boot.gif)

Test the web app by browsing to [http://localhost:8080](http://localhost:8080) using a web browser. You should see the following message displayed: "Greetings from Spring Boot!".

![Greeting from Spring](images/java-webapp/greeting-from-spring.png)

## Make a change

Let's now edit `HelloController.java` to change "Greetings from Spring Boot!" to something else like "Hello World". VS Code provides a great editing experience for Java, check out [Navigating and edit Java](/docs/java/java-editing.md) to learn about VS Code's editing and code navigation features.

Click the **Restart** button on the top of the editor to relaunch the app and see result by reloading the browser.

![Restart Application](images/java-webapp/restart-application.png)

## Debug the application

Set a breakpoint (`kb(editor.debug.action.toggleBreakpoint)`) in the application source code, and reload your browser to hit the breakpoint.

![Debug Application](images/java-webapp/debugging.png)

If you would like to learn more about debugging Java with VS Code, you can read [Java Debugging](/docs/java/java-debugging.md).

Congratulations, you have your first Spring Boot web app running locally! Read on to learn how to host it in the cloud.

## Deploy Web Apps to the cloud

We just built a Java web application and ran it locally. Now you will learn how to deploy from Visual Studio Code and run it on [Azure](https://azure.microsoft.com) in the cloud.

If you don't have an Azure subscription, you can sign up for a [free Azure account](https://azure.microsoft.com/pricing/free-trial/).

<a class="install-extension-btn" href="https://azure.microsoft.com/pricing/free-trial/" target="_blank" style="background-color:#68217A">Create your free Azure account</a>

### Install the Azure App Service extension

The [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extension is used to create, manage, and deploy to Azure App Service with key features including:

- Create new Azure Web App/Deployment Slot
- Deploy to Azure Web App/Deployment Slot
- Start, stop, and restart the Azure Web App/Deployment Slot
- View a Web App's log files
- Swap Deployment Slots

To install the Azure App Service extension, open the Extensions view (`kb(workbench.view.extensions)`) and search for `azure app service` to filter the results. Select the Microsoft [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extension. For a more command-line Maven-centric experience, you can also check out the [Maven plugin for Azure App Service Linux tutorial](https://learn.microsoft.com/azure/app-service/quickstart-java?pivots=platform-linux-development-environment-maven).

### Sign in to your Azure subscription

To sign in to Azure, run **Azure: Sign In** from the **Command Palette** (`kb(workbench.action.showCommands)`). Or you can sign in to your Azure Account by clicking **Sign in to Azure...** in **RESOURCES** Explorer.

![Azure sign in code](images/java-webapp/login.png)

### Create a new Web App on Azure

Once the extension is installed, you can take the following steps to create a new Web App on Azure.

1. Click **Create** button on the **RESOURCES** Explorer view and select **Create App Service Web App...**.

2. Enter a unique name for the new Web App.

3. Select the runtime task of the Web App, for example `Java 17`.

4. Select the Java web server stack, for example `Java SE`.

5. Select a pricing tier.

![Create a Web App](images/java-webapp/create-webapp.png)

### Build and deploy to a Web App

The deploy process leverages the [Azure Resources](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureresourcegroups) extension (installed along with the Azure App Service extension as a dependency) and you need to sign in with your Azure subscription. If you do not have an Azure subscription, [sign up today](https://azure.microsoft.com//free/?b=16.48) for a free 30 day account and get $200 in Azure Credits to try out any combination of Azure services.

Once you have signed in, you can open the command prompt or terminal window and build the project using Maven commands. This will generate a new `war` or `jar` artifact in the `target` directory.

```bash
mvn clean package
```

After building the project, open the `target` directory in VS Code Explorer. Right-click on the artifact and choose **Deploy to Web App**, and follow the prompts to choose the Web App for your deployment.

![Deploy to Web App](images/java-webapp/deploy-webapp.png)

Open the **Output** window in VS Code to view the deployment logs. Once the deployment is completed, it will print out the URL for your Web App. Click the link to open it in a browser, you can see the web app running on Azure!

![Greeting from Spring Boot](images/java-webapp/greeting.png)

> **Note:** For more advanced features of App Service, you can check out the [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extension.

## Connect with data services

[Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/introduction) is a globally distributed database service that allows developers to work with data using a variety of standard APIs, such as SQL, MongoDB, Cassandra, Graph, and Table.

The [Spring Boot Starter](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-cosmos-db) makes it easy to store data in and retrieve data from your Azure Cosmos DB for NoSQL database.

### Create an Azure Cosmos DB entity on Azure

1. Go to [Azure portal](https://portal.azure.com/) and click the '+' to **Create a resource**.
2. Click **Databases**, and then click **Azure Cosmos DB** to create your database.
3. Select **SQL (Document DB) API** and type in other information for your database.
4. Navigate to the database you have created, click **Keys**, and copy your **URI** and **PRIMARY KEY** for your database.

### Config your project

1. You can start from the [Spring Data Azure Cosmos DB Sample Project](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/spring/azure-spring-boot-samples/azure-spring-boot-sample-cosmos).

2. Navigate to `src/main/resources` and open `application.properties`. Replace below properties in `application.properties` with information of your database.

    ```bash
    azure.documentdb.uri=your-documentdb-uri
    azure.documentdb.key=your-documentdb-key
    azure.documentdb.database=your-documentdb-databasename
    ```

### Run and debug the application

You can press `kb(workbench.action.debug.start)` to run your application. To check the result, open the [Azure portal](https://portal.azure.com/) and access your Azure Cosmos DB instance. Select **Data Explorer**, and next choose **Documents**. Data is shown if it's successfully written into Azure Cosmos DB. You can also browse your data entries in Azure Cosmos DB with the [Azure Databases](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) extension.

After setting a breakpoint (`kb(editor.debug.action.toggleBreakpoint)`) in your source code, refresh your browser to hit the breakpoint. Details about debugging can be found in [Java Debugging](/docs/java/java-debugging.md)

Alternatively, you can also use Maven to package and run your project as steps below:

1. Navigate to the directory `azure-spring-boot` and run the command.

   ```bash
   mvn install
   ```

2. Navigate to the directory `azure-documentdb-spring-boot-sample` and run the command.

   ```bash
   mvn package
   java -jar target/azure-documentdb-spring-boot-sample-0.0.1-SNAPSHOT.jar
   ```

## Next steps

- To containerize and deploy a web application, check out the [Docker in VS Code](/docs/containers/overview.md).
- To learn more about Java Debugging features, see the [Java Debugging Tutorial](/docs/java/java-debugging.md).
