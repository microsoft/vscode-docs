---
Order: 3
Area: azure
TOCTitle: Remote Debugging for Node.js
PageTitle: Azure Remote Debugging for Node.js with Visual Studio Code
ContentId: 09cb23b6-b1e9-4a29-a934-cbc16fe109c7
MetaDescription: Azure Remote Debugging for Node.js with Visual Studio Code
DateApproved: 11/1/2022
---
# Azure Remote Debugging for Node.js

Connect the Visual Studio Code debugger to your Node.js applications running on **Azure App Service** on **Linux**. The debugger works the same as when it's connected to a local Node.js process - including the use of Breakpoints and Logpoints.

## Install the extension

Remote debugging support for VS Code is provided by the [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extension for apps deployed to Azure.

![Select App Service extension](images/remote-debugging/install-app-service.png)

To install the Azure App Service extension:

1. Open the Extensions view by pressing `kb(workbench.view.extensions)`
1. Search for 'azure app service' to filter the results.
1. Select the Microsoft **Azure App Service** extension and select **Install**.

## Connect to Azure

After you install the Azure App Service extension, notice that there's an **Azure** view added to the Activity Bar. Select the Azure view to open the Azure App Service Explorer.

![App Service explorer](images/remote-debugging/app-service-explorer.png)

Select **Sign in to Azure** in the App Service Explorer or **Azure: Sign In** from the **Command Palette** (`kb(workbench.action.showCommands)`) to sign in to your Azure Account. If you don't have an account, select **Create an Azure Account...** to create an Azure free account to try out any combination of Azure services.

> **Tip:** If you don't have an app deployed to Azure App Service yet, start by following this tutorial to [deploy a Node.js + MongoDB web app to Azure](https://learn.microsoft.com/azure/app-service/tutorial-nodejs-mongodb-app).

## Start a remote debugging session

To start a remote debugging session for your application, right-click your app in the App Service Explorer and select **Start Remote Debugging**.

![Start remote debugging](images/remote-debugging/start-remote-debugging.png)

This process requires that the app be restarted with the debugger enabled. You are prompted to confirm the restart.

Once restarted, VS Code connects to the app's debugging port via an SSH tunnel. It might take some time to establish the connection. Once connected, VS Code switches to debugging mode and works in the same way as when you're debugging an app locally.

![Remote breakpoint](images/remote-debugging/remote-breakpoint.png)

When you're ready to end your remote debugging session, disconnect from the debugger as you would normally, and confirm that you want to restart the app.

## Next steps

* [Logpoints](/docs/editor/debugging.md#logpoints) - Use Logpoints to log to the console without "breaking" in the debugger.
* [Azure Extensions](/docs/azure/extensions.md) - The VS Code Marketplace has hundreds of extensions for Azure and the cloud.
* [Deploying to Azure](/docs/azure/deployment.md) - Learn step-by-step how to deploy your application to Azure.
