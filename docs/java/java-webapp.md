---
Area: java
TOCTitle: Java Web App
ContentId: 98ddf1d3-6a8e-4b0f-a44d-e57cfdf2348c
PageTitle: Build and Deploy Java Web Apps to the cloud with Visual Studio Code
DateApproved: 3/2/2023
MetaDescription: Java web app tutorial showing how to build and deploy a Java web app to Azure with Visual Studio Code
---

# Java Web Apps with Visual Studio Code

This tutorial shows you how to create a Java web application with Visual Studio Code. You'll learn how to deploy a Java web application to a Linux Tomcat server in Azure App Service.

## Scenario

A simple Hello World web app.

![Greeting from Java](images/java-webapp/greeting.png)

## Before you begin

Before running and deploying this sample, you must have the Java SE Development Kit (JDK) and Apache Maven build tools on your local development environment. If you don't have, please install them.

Download and install the [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack), which has JDK 11 included.

>**Note**: The `JAVA_HOME` environment variable must be set to the install location of the JDK to complete this tutorial.

Download Apache Maven version 3 or greater:

<a class="install-extension-btn" href="https://maven.apache.org/download.cgi" target="_blank" style="background-color:#68217A">Download Apache Maven</a>

Install Apache Maven for your local development environment:

<a class="install-extension-btn" href="https://maven.apache.org/install" target="_blank" style="background-color:#68217A">Install Apache Maven</a>

## Create a Maven Web App project

`maven-archetype-webapp` is an archetype which generates a Maven Web App project. To learn more, you can visit [this documentation](https://maven.apache.org/archetypes/maven-archetype-webapp/).

1. In an empty folder, run the following command to generate a new project from a Maven archetype.

```cmd
   mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeVersion=1.4
```
1. Maven asks you for values needed to finish generating the project on deployment. Provide the following values when prompted:

    | Prompt | Value | Description |
    | ------ | ----- | ----------- |
    | **groupId** | `com.webappproject` | A value that uniquely identifies your project across all projects, following the [package naming rules](https://docs.oracle.com/javase/specs/jls/se6/html/packages.html#7.7) for Java. |
    | **artifactId** | `webapp-project` | A value that is the name of the jar, without a version number. |
    | **version** | `1.0-SNAPSHOT` | Choose the default value. |
    | **package** | `com.webappproject` | A value that is the Java package for the generated function code. Use the default. |

1. Type `Y` or press Enter to confirm.

    Maven creates the project files in a new folder with a name of _artifactId_, which in this example is `webapp-project`.

1. Navigate into the project folder:

    ```console
    cd webapp-project
    ```

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

4. Select the Java web server stack, for example `Apache Tomcat 10.0`.

5. Select a pricing tier, for example `Free(F1)`.

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

## Clean up resources

1. To delete your web app, navigate to the **RESOURCES** Explorer and locate the **App Services** item.

2. Right-click the web app you'd like to delete and click **Delete**.

![Delete the Web App Resources](images/java-webapp/delete-webapp.png)

3. To delete your app service plan or resource group, visit the [Azure portal](https://portal.azure.com) and manually delete the resources under your subscription.

## Next steps

- To containerize and deploy a web application, check out the [Docker in VS Code](/docs/containers/overview.md).
- To learn more about Java Debugging features, see the [Java Debugging Tutorial](/docs/java/java-debugging.md).
