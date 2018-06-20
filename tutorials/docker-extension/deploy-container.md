---
Order: 4
Area: docker
TOCTitle: Deploy the image
PageTitle: Deploy a Docker image to Azure App Service
MetaDescription: Deploy a Docker image to Azure App Services with Visual Studio Code
DateApproved: 06/19/2018
---
# Deploy the image to Azure App Service

With an image build and pushed to a registry, you can use the Docker extension to deploy that image to [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/).

1. In the **Docker** explorer, expand **Registries** > **Azure**, the expand your registry node and the image name until you see the image with the `:latest` tag.

    ![Locating an image in the Docker explorer](images/docker-extension/image-in-acr.png)

1. Right-click the image and select **Deploy Image to Azure App Service**.

    ![Selecting the Deploy menu command](images/docker-extension/deploy-menu.png)

1. Follow the prompts to select an Azure subscription, select or specify a resource group, specify a region, configure an App Service Plan (B1 is the least expensive), and specify a unique name for the App Service. The animation below illustrates the process.

    ![Create and Deploy](images/docker-extension/create.gif)

    A **Resource Group** is essentially a named collection the different resources that make up an app. By assigning all the app's resources to a single group, you can easily clean up those resources by deleting the resource group as a whole.

    An **App Service Plan** defines the physical resources (an underlying virtual machine) that hosts the running container. Fr this tutorial, B1 is the least expensive plan that supports Docker containers.

1. VS Code's Output panel shows deployment progress.
1. Once completed, browse the site at `http://<name>.azurewebsites.net`. You can Ctrl+click the URL in the Output panel, or in the **Azure: App Service** explorer, refresh, then locate the App Service, right-click, and select **Browse Website**.

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/tailing-logs">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'deploy-app')" href="javascript:void(0)">I ran into an issue</a>
