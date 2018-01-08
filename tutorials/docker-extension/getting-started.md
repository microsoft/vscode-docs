---
Order: 1
Area: docker
TOCTitle: Getting Started
PageTitle: Getting Started
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 12/18/2017
---

# Deploy a Node.js application to Azure from Visual Studio Code

This tutorial walks you through containerizing an exisitng Node.js application
using Docker, pushing the app image to a Docker registry, then deploying the
image to Azure Web App for Container within a matter of minutes directly from
VS Code.

## Prerequisites

If you don't have an Azure account, [sign up today](https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-tutorial-node-git&mktingSource=vscode-tutorial-node-git)
for a free 30-day account with $200 in Azure credits to try out any combination
of services.

You need [Visual Studio Code](https://code.visualstudio.com/) installed along
with [Node.js and npm](https://nodejs.org/en/download) and [Docker](https://www.docker.com/community-edition).

## Create a Container Registry

You need a registry to push your containerized app to once the image is built,
once pushed, you will deploy directly from your registry. There are some options
when setting up a registry.

### Using Azure Container Registry

Azure Container Registry or ACR is a private, hosted registry that provides more
security for you images. ACR is used in this tutorial; however, ACR uses all the
same tools and processes as other registry options so the steps are consistent
regardless.

Follow this guide to [Setup an Azure Container Registry](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal)
and be sure to log into your registry from the Docker CLI.

### Using Docker Hub

Docker Hub is Docker's own hosted registry that provides a free way of sharing
images. Sign up for a Docker ID on [Docker Hub](https://hub.docker.com/) then
login to the Docker CLI using your Docker ID credentials.

## Install the Docker and Azure App Service VS Code Extensions

The Docker extension is used to simplify the management of local Docker images
and commands as well as the deployment of a built app image to Azure.

> [Install the Docker extension](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)

The Azure App Service extension is used to create, manage, and deploy Linux Web
Apps on the Azure PaaS.

> [Install the Azure App Service extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)

### Sign in

Once the extension is installed, log into your Azure account - in the Azure App
Service extension explorer, click "Sign in to Azure..." and follow the
instructions.

## Prerequisite Check

Before we continue, ensure that you have all the prerequisites installed and
configured.

In VS Code, you should see your Azure email address in the Status Bar and your
subscription in the App Service extension explorer.

If you're using an Azure registry, the endpoint will be visible within the
Docker extension's explorer under Registries > Azure.

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/create-app">I've installed the Docker Extension</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
