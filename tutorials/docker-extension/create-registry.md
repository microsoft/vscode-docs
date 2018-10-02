---
Order: 2
Area: docker
TOCTitle: Container registries
PageTitle: Container registries
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 12/18/2017
---
# Using Container Registries

You need a container registry to push your app image to once the image is built. Once your image is available in a container registry, you will deploy directly from that registry.

## Using Azure Container Registry

[Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/) (ACR) is a private, secure, hosted registry for your images. ACR is used in this tutorial, however ACR uses all the same tools and processes as other registry options so the steps are consistent regardless.

Follow this guide to [Setup an Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal) and be sure to log into your registry from the Docker CLI.

## Using Docker Hub

Docker Hub is Docker's own hosted registry that provides a free way of sharing images. Sign up for a Docker ID on [Docker Hub](https://hub.docker.com/) then login to the Docker CLI using your Docker ID credentials.

## Prerequisite Check

Ensure that the registry endpoint that you just setup is visible under **Registries** in the **DOCKER** explorer.

![Registries](images/docker-extension/registries.png)

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/containerize-app">I've Created a Registry</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
