---
Order: 1
Area: docker
TOCTitle: Getting Started
PageTitle: Getting Started with Docker images
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 1/11/2018
---
# Deploy to Azure using Docker

This tutorial walks you through containerizing an existing Node.js application using [Docker](https://www.docker.com/), pushing the app image to a Docker registry, then deploying the image to [Azure Web App for Containers](https://azure.microsoft.com/en-us/services/app-service/containers/) directly from Visual Studio Code.

## Prerequisites

If you don't have an Azure account, [sign up today](https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-tutorial-node-git&mktingSource=vscode-tutorial-node-git) for a free 30-day account with $200 in Azure credits to try out any combination of services.

You need [Visual Studio Code](https://code.visualstudio.com/) installed along with [Node.js and npm](https://nodejs.org/en/download) and [Docker](https://www.docker.com/community-edition).

## Create a Container Registry

You need a registry to push your containerized app to once the image is built, once pushed, you will deploy directly from your registry. There are some options when setting up a registry.

### Using Azure Container Registry

[Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/) (ACR) is a private, secure, hosted registry for your images. ACR is used in this tutorial; however, ACR uses all the same tools and processes as other registry options so the steps are consistent regardless.

Follow this guide to [Setup an Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal) and be sure to log into your registry from the Docker CLI.

### Using Docker Hub

Docker Hub is Docker's own hosted registry that provides a free way of sharing images. Sign up for a Docker ID on [Docker Hub](https://hub.docker.com/) then login to the Docker CLI using your Docker ID credentials.

## Install the Docker and Azure App Service extensions

The Docker extension is used to simplify the management of local Docker images and commands as well as the deployment of a built app image to Azure.

> <a class="tutorial-install-extension-btn" href="vscode:extension/PeterJausovec.vscode-docker">Install the Docker extension</a>

The Azure App Service Tools extension is used to create, manage, and deploy Linux Web Apps on the Azure PaaS.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-azuretools.vscode-azureappservice">Install the Azure App Service Tools extension</a>

## Sign in

Once the extension is installed, log into your Azure account - in the **AZURE APP SERVICE** explorer, click **Sign in to Azure...** and follow the instructions.

![sign in to Azure](images/docker-extension/sign-in.png)

## Prerequisite Check

Before we continue, ensure that you have all the prerequisites installed and configured.

In VS Code, you should see your Azure email address in the Status Bar and your subscription in the **AZURE APP SERVICE** explorer.

If you're using an Azure registry, the endpoint will be visible within the extension's **DOCKER** explorer under **Registries** > **Azure**.

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/containerize-app">I've installed the Docker Extension</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
