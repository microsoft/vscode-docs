---
Order: 2
Area: docker
TOCTitle: Create a registry
PageTitle: Create a container registry
MetaDescription: Create a container registry for deploying Docker containers to Azure App Services with Visual Studio Code
DateApproved: 06/19/2018
---
# Create an Azure container registry

Once your Docker image is built, you need to push your image to a container registry from which you then deploy to Azure App Service.

Thus tutorial uses the Azure Container Registry (ACR), a private, secure, hosted registry for your images.

You can also use [Docker Hub](https://hub.docker.com/), Docker's own hosted registry that provides a free way to share images. Sign up for a Docker ID on the hub, then login to the Docker CLI using your Docker ID credentials. The steps that follow in this tutorial can be used with Docker Hub and other registry options.

To create an Azure Container Registry, follow the first part of [Quickstart: Create a container registry using the Azure portal](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal) through the "Log in to ACR" section. You don't need to complete the sections "Push image to ACR" and later because you do those steps within VS Code.

## Prerequisite Check

Make sure that the registry endpoint you created is visible under **Registries** in the **Docker** explorer.

![Registries](images/docker-extension/registries.png)

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/containerize-app">I've Created a Registry</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
