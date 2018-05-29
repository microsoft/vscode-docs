---
Order: 3
Area: java
TOCTitle: Java Web App
ContentId: 98ddf1d3-6a8e-4b0f-a44d-e57cfdf2348c
PageTitle: Deploy Java Web Apps to the cloud
DateApproved: 3/7/2017
MetaDescription: Java web app tutorial showing how to deploy a Java web app to Azure
---
# Deploy Java Web Apps to the cloud

In our [first tutorial](/docs/java/java-tutorial.md), we built a Java web application and ran it locally. In this tutorial, you will learn how to deploy and run it on [Azure](https://azure.microsoft.com) in the cloud.

## Prepare your Azure account

Before running this sample application on [Azure](https://azure.microsoft.com), you need to have an Azure subscription and the Azure command line tools.

If you don't have an Azure subscription, you can sign up for a [free Azure account](https://azure.microsoft.com/pricing/free-trial/):

<a class="tutorial-next-btn" href="https://azure.microsoft.com/pricing/free-trial/" target="_blank" style="background-color:#68217A">Create your free Azure account</a>

The [Azure Command-Line Interface (CLI)](https://docs.microsoft.com/cli/azure/overview):

<a class="tutorial-next-btn" href="https://docs.microsoft.com/cli/azure/install-azure-cli" target="_blank" style="background-color:#68217A">Install Azure CLI 2.0</a>

## Login with Azure CLI

To run the Azure CLI, we'll use the [Integrated Terminal](/docs/editor/integrated-terminal.md) in VS Code. To open the terminal, you can either:

* Use the `kb(workbench.action.terminal.toggleTerminal)` keyboard shortcut with the backtick character.
* Use the **View** | **Integrated Terminal** menu command.
* From the **Command Palette** (`kb(workbench.action.showCommands)`), use the **View:Toggle Integrated Terminal** command.

> **Note:** You can also open an external shell with the Explorer **Open in Command Prompt** command (**Open in Terminal** on macOS or Linux) if you prefer to work outside VS Code.

Sign into your Azure account by using the Azure CLI:

```bash
az login
```

Follow the instructions to complete the sign-in process.

## Update your project to use Azure CLI for authentication

Open the `pom.xml` file in your project folder (`complete`). Find and remove the snippet below in the azure-webapp-maven-plugin `configuration` section so that you will authenticate with Azure using the Azure CLI, which you did in the previous step.

![Remove Authentication](images/java-webapp/remove-auth.png)

>**Note**: This specific configuration will now use Azure Service Principal for authentication. More details could be found at [Configure Maven to use your Azure Service Principal](https://docs.microsoft.com/azure/app-service/app-service-web-deploy-spring-boot-app-with-maven-plugin#configure-maven-to-use-your-azure-service-principal)

## Build and deploy your web app to Azure

From the command prompt or terminal window you were using earlier, rebuild the JAR file using Maven if you made any changes to the `pom.xml` file. For example:

```bash
mvn clean package
```

> **Note:** You need to be in the `complete` directory when running commands in the terminal.

Deploy your web app to Azure by using Maven:

```bash
mvn azure-webapp:deploy
```

Maven will deploy your web app to Azure. If the web app does not already exist, it will be created.

When your web app has been deployed, you will see a success message on the command line:

![Deploy Success](images/java-webapp/deploy-success.png)

By pasting the URL into a web browser, you can see the sample web app running on Azure!

![Greeting cloud](images/java-webapp/greeting-cloud.png)

You will also be able to manage it using the [Azure portal](https://portal.azure.com/).

Your web app will be listed under **App Services**:

![App Service View](images/java-webapp/app-service-view.png)

The URL for your web app will be listed in the **Overview** for your web app:

![Overview](images/java-webapp/overview.png)

You have successfully deployed a Java web application to the cloud!

![Greeting cloud](images/java-webapp/greeting-cloud.png)

## Next steps

* To see how you can containerize and deploy a web application, check out the [Java Container Tutorial](/docs/java/java-container.md)
* To learn more about Java Debugging features, see the [Java Debugging Tutorial](/docs/java/java-debugging.md)
