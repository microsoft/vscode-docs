---
Order: 12
Area: python
TOCTitle: Deploy containers
ContentId: e3f4006c-ab3f-4444-909b-fb045afcdf09
PageTitle: Deploy containers to Azure App Service from Visual Studio Code
DateApproved: 08/12/2019
MetaDescription: How to deploy Docker containers for Python web apps and to Azure App Service using VS Code
MetaSocialImage: images/tutorial/social.png
---
# Deploy containers to Azure App Service

This tutorial walks you through the process of using Visual Studio Code to deploy a container image from a container registry to [Azure App Service](https://azure.microsoft.com/services/app-service/containers/), all within Visual Studio Code.

If you have any problems, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

- An [Azure account](https://azure.microsoft.com/free/?utm_source=campaign&utm_campaign=vscode-tutorial-docker-extension&mktingSource=vscode-tutorial-docker-extension)
- [Visual Studio Code](https://code.visualstudio.com/)
- A suitable container that's been uploaded to a container registry. For details on creating a container with a Python web app, see [Create a container](tutorial-create-containers.md).
- The [Azure App Service extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice), which helps you create, manage, and deploy Web Apps to Azure App Service on Linux. For details, explore the [App Service extension tutorial](/tutorials/app-service-extension/getting-started.md) or visit the [vscode-azureappservice GitHub repository](https://github.com/Microsoft/vscode-azureappservice).
- The [Docker extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker), which helps you manage local Docker images, provides Docker commands, and simplifies deployment of app images to Azure. You can find an overview of the extension on the [vscode-docker GitHub repository](https://github.com/Microsoft/vscode-docker)

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-azuretools.vscode-azureappservice">Install the Azure App Service extension</a>

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-azuretools.vscode-docker">Install the Docker extension</a>

## Sign in to Azure

Once the Azure App Service extension is installed, sign into your Azure account by navigating to the **Azure: App Service** explorer, select **Sign in to Azure**, and follow the prompts.

![Sign in to Azure through VS Code](images/deploy-azure/azure-sign-in.png)

After signing in, verify that you see the email account of your Azure around in the Status Bar and your subscription(s) in the **Azure: App Service** explorer:

![VS Code status bar showing Azure account](images/deploy-azure/azure-account-status-bar.png)

![VS Code Azure App Service explorer showing subscriptions](images/deploy-azure/azure-subscription-view.png)

> **Note**: If you see the error **"Cannot find subscription with name [subscription ID]"**, this may be because you are behind a proxy and unable to reach the Azure API. Configure `HTTP_PROXY` and `HTTPS_PROXY` environment variables with your proxy information in your terminal:
>
> ```sh
> # macOS/Linux
> export HTTPS_PROXY=https://username:password@proxy:8080
> export HTTP_PROXY=http://username:password@proxy:8080
>
> #Windows
> set HTTPS_PROXY=https://username:password@proxy:8080
> set HTTP_PROXY=http://username:password@proxy:8080
> ```

## Deploy the image to Azure

With a container image in a registry, you can use the Docker extension in VS Code to easily set up an Azure App Service running the container.

1. In the **Docker** explorer, expand **Registries**, expand the node for your registry (such as **Azure**), then expand the node for your image name until you see the image with the `:latest` tag.

    ![Locating an image in the Docker explorer](images/deploy-containers/deploy-find-image.png)

1. Right-click the image and select **Deploy Image to Azure App Service**.

    ![Selecting the Deploy menu command](images/deploy-containers/deploy-menu.png)

1. Follow the prompts to select an Azure subscription, select or specify a resource group, specify a region, configure an App Service Plan (B1 is the least expensive), and specify a name for the site. The animation below illustrates the process.

    ![Create and Deploy](images/deploy-containers/deploy-to-app-service.gif)

    A **Resource Group** is a named collection the different resources that make up an app. By assigning all the app's resources to a single group, you can easily manage those resources as a single unit. (For more information, see the [Azure Resource Manager overview](https://docs.microsoft.com/azure/azure-resource-manager/resource-group-overview) in the Azure documentation.)

    An **App Service Plan** defines the physical resources (an underlying virtual machine) that hosts the running container. For this tutorial, B1 is the least expensive plan that supports Docker containers. (For more information, see [App Service plan overview](https://docs.microsoft.com/azure/app-service/azure-web-sites-web-hosting-plans-in-depth-overview) in the Azure documentation.)

    The name of the App Service must be unique across all of Azure, so you typically use a company or personal name. For production sites, you typically configure the App Service with a separately registered domain name.

1. Creating the app service takes a few minutes, and you see progress in VS Code's Output panel.

1. Once completed, you **must** also add a setting named `WEBSITES_PORT` (notice the plural "WEBSITES") to the App Service to specify the port on which the container is listening. (If you're using an image from the [Create a container](tutorial-create-container.md) tutorial, the port is 5000 for Flask and 8000 for Django). To set `WEBSITES_PORT`, switch to the **Azure: App Service** explorer, expand the node for your new App Service (refresh if necessary), then right-click **Application Settings** and select **Add New Setting**. At the prompts, enter `WEBSITES_PORT` as the key and the port number for the value.

    ![Context menu command on an App Service for Add New Setting](images/deploy-containers/add-app-service-setting.png)

1. The App Service restarts automatically when you change settings. You can also right-click the App Service and select **Restart** at any time.

1. After the service has restarted, browse the site at `http://<name>.azurewebsites.net`. You can use `kbstyle(Ctrl+click)` (`kbstyle(Cmd+click)` on macOS) on the URL in the Output panel, or right-click the App Service in the **Azure: App Service** explorer and select **Browse Website**.

## Make changes and redeploy

Because you inevitably make changes to your app, you end up rebuilding and redeploying your container many times. Fortunately, the process is simple:

1. Make changes to your app and test locally. (This step and the two that follow are explained on [Create a container](tutorial-create-containers.md).)

1. Rebuild the Docker image. If you change only app code, the build should take only a few seconds.

1. Push your image to the registry. If again you change nothing but app code, only that small layer needs to be pushed and the process typically completes in a few seconds.

1. In the **Azure: App Service** explorer, right-click the appropriate App Service and select **Restart**. Restarting an app service automatically pulls the latest container image from the registry.

1. After about 15-20 seconds, visit the App Service URL again to check the updates.

## Viewing logs

From within VS Code, you can view (or "tail") logs from the running site on Azure App Service, which captures any output to the console as from `print` statements and routes them to the VS Code **Output** panel.

1. Find the app in the **Azure: App Service** explorer, right-click the app, and choose **Start Streaming Logs**.

1. Answer **Yes** when prompted to enable logging and restart the app. Once the app is restarted, the VS Code Output panel opens with a connection to the log stream.

1. After a few seconds, you see a message indicating that you are connected to the log-streaming service.

    ```bash
    Connecting to log stream...
    2018-09-27T20:14:26  Welcome, you are now connected to log-streaming service.

    2018-09-27 20:14:59.269 INFO  - Starting container for site

    2018-09-27 20:14:59.270 INFO  - docker run -d -p 24138:8000 --name vsdocs-django-sample-container_0 -e WEBSITES_PORT=8000 -e WEBSITE_SITE_NAME=vsdocs-django-sample-container -e WEBSITE_AUTH_ENABLED=False -e WEBSITE_ROLE_INSTANCE_ID=0 -e WEBSITE_INSTANCE_ID=02c705ae24eaf5f298e553a9c2724b9fe4485707c2d1c36137cd02931091e561 -e HTTP_LOGGING_ENABLED=1 vsdocsregistry.azurecr.io/python-sample-vscode-django-tutorial:latest

    2018-09-27 20:15:06.216 INFO  - Container vsdocs-django-sample-container_0 for site vsdocs-django-sample-container initialized successfully.
    ```

1. Navigate within the app to see additional output for various HTTP requests.

## Clean up resources

The various Azure resources you created in this tutorial can incur ongoing costs. To clean them up, it's best to visit the [Azure portal](https://portal.azure.com), select **Resource groups** from the left-side navigation pane, select the resource group that was created in the process of this tutorial, and then use the **Delete resource group** command.

## Next steps

You can learn more about the Docker and App Service extensions by visiting their respective repositories on GitHub: [vscode-docker](https://github.com/Microsoft/vscode-docker) and [vscode-azureappservice](https://github.com/Microsoft/vscode-azureappservice). Issues and contributions are also welcome.

To learn more about Azure services that you can use from Python, including data storage along with AI and Machine Learning services, visit [Azure Python Developer Center](https://docs.microsoft.com/python/azure/?view=azure-python).

There are also other Azure extensions for VS Code that you may find helpful. Just search on "Azure" in the Extensions explorer:

![Azure extensions for VS Code](images/deploy-containers/azure-extensions.png)

Some popular extensions are:

- [Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure CLI Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli)
- [Azure Resource Manager (ARM) Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools)

And again, if you encountered any problems in the course of this tutorial, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).
