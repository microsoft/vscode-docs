---
Order: 8
Area: containers
TOCTitle: Deploy to Azure
ContentId: 044913F5-F99D-4228-A916-0443260AB7FB
PageTitle: Deploy a containerized app to Azure App Service
DateApproved: 01/29/2020
MetaDescription: Using Visual Studio Code, build a container image for your application, push the image to a container registry, and deploy to Azure App Service.
---
# Deploy to Azure App Service

In this guide you will learn how to:

- Create a container image for your application.
- Push the image to a container registry.
- Deploy the image to Azure App Service.
- Deploy the image to Azure Container Instances (ACI).

## Prerequisites

- An Azure subscription.
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) and [Azure App Service](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) extensions must be installed.
- A [**web** application](https://docs.microsoft.com/azure/app-service/containers/tutorial-custom-docker-image) that produces a docker image. You could also follow [Create a sample ASP .NET Core application](/docs/containers/quickstart-aspnet-core.md) to create such application.
- You need a [Docker Hub](https://hub.docker.com/) account or an instance of [Azure Container Registry (ACR)](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal).

## Create the application image

If you already have an image, skip this step and proceed to [Push the image to a container registry](#push-the-image-to-a-container-registry) step.

1. Open the application folder in VS Code.

2. Open Command Palette (`kb(workbench.action.showCommands)`) and use **Docker Images: Build Image...** command to build the image.

    ![Build container image](images/app-service/command-build-image.png)

    You can find the image name in the output of the Build Image command, the same can be found in the Images pane of the Docker Explorer.

    ![Build image output](images/app-service/terminal-output-build-image.png)

## Push the image to a container registry

Before deploying the image to an App Service, the image must be uploaded to a container registry. The image can be uploaded to either [Azure Container Registry (ACR)](https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal) or [Docker Hub](https://hub.docker.com/).

1. Open the Docker Explorer and select **Connect Registry...** icon under **Registries** group and follow the prompt. Choose the provider (Azure or Docker Hub) and provide the credential to connect to the registry.

    ![Connect to Registry](images/app-service/explorer-connect-registry.png)

2. Now the registry will be visible under Registries.

   ![Registries](images/app-service/explorer-registries.png)

3. Optionally, tag the image. In order to upload an image to a registry, the image needs to be tagged with registry name so that the docker push will upload it to the right registry.
    - The image built in previous section will appear in the Docker Explorer under Images section. Right-click and choose **Tag...**.

        ![Tag image](images/app-service/explorer-tag-image.png)
    - Specify the new name `<your registry or username>/<image name>:<tag>` and complete the
    tag action. For example, new image name for ACR would be 'mainacr.azurecr.io/webapp6:latest' and for Docker Hub it would be 'myusername/webapp6:latest'.

4. The image will show up in the Docker Explorer under the registry that the image tag points to. Select this image and choose **Push**. If the image has not yet been tagged, you will be prompted to choose a registry to push to, and the image will be tagged based on the selection.

    ![Push image](images/app-service/explorer-push-image.png)

5. Once the push command is completed. Refresh the registry node where the image is pushed to and the uploaded image will show up.

    ![Refresh registry](images/app-service/explorer-refresh-registry.png)

## Deploy the image to Azure App Service

In the previous section, the image is pushed to a remote container registry. Now deploy this image to Azure App Service.

1. In Docker Explorer, navigate to your image under Registries, right-click on the tag, and select **Deploy Image To Azure App Service...**.

    ![Deploy to Azure App Service](images/app-service/explorer-deploy-to-app-service.png)

2. When prompted, provide the values for the App Service.
    - New web app name: The name must be unique across Azure.
    - Resource group: Select an existing resource group or create a new one.
    - App Service plan: Select an existing App Service Plan or create a new one. (An App Service Plan defines the physical resources that host the website. You can use a basic or free plan tier for this tutorial.).

3. When deployment is complete, Visual Studio Code shows a notification with the website URL.

    ![Deployment complete notification](images/app-service/notification-appservice-deployment.png)

4. You can also see the results in the Output panel of Visual Studio Code, in the Docker section.

    ![Deployment complete output](images/app-service/output-appservice-deployment.png)

5. To browse the deployed website, you can use `kbstyle(Ctrl+click)` to open the URL in the Output panel. The new App Service also appears in the Azure view in Visual Studio Code under the App Service section, where you can right-click the website and select Browse Website.

    ![Web Application](images/app-service/webapp-homepage.png)

## Deploy to ACI

In the previous section, the image was deployed to Azure App Service. Another option is to deploy the image to [Azure Container Instances (ACI)](https://azure.microsoft.com/services/container-instances/). First, deploy the container to a container registry, such as Docker Hub or ACR, as described earlier in this article. Then, find the container in the **Registries** section of the Docker Explorer. Use the **Refresh** button if you don't see it there. Right-click the entry for the image you want, and choose **Deploy image to Azure Container Instances**.

![Deploy to ACI menu item](images/app-service/deploy-aci-menu.png)

Choose an existing context, or use **Create new ACI Context**, and then choose the resource group. The container is started in ACI.

The context you created is displayed in the **Contexts** pane in the Docker Explorer and selected as the active context. Whichever context is the active one affects the images shown in the **Containers** pane.

![ACI in contexts pane](images/app-service/deploy-aci-contexts.png)

 When the image finishes the start-up process and becomes available, an entry for the image appears in the **Containers** pane. You can then manage the container instance by right-clicking on the entry. For example, to monitor the logs, choose **View Logs**.

![Manage images in the Containers pane](images/app-service/deploy-aci-containers-pane.png)

If it's a web app, you can use **Open in Browser** to navigate to the app's homepage. When you're done with the instance, right-click the instance name, and choose **Remove**. Because billing in ACI is by the second and only when the container is running, as soon as you remove it, you are no longer accruing charges.

## Next steps

Read on to learn more about

- [Azure Extensions](/docs/azure/extensions.md) - The VS Code Marketplace has hundreds of extensions for Azure and the cloud.
- [Deploying to Azure](/docs/azure/deployment.md) - Learn step-by-step how to deploy your application to Azure.
- [Working with MongoDB](/docs/azure/mongodb.md) - Create, manage, and query MongoDB databases from within VS Code.
