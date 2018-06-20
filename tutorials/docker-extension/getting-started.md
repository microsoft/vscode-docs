---
Order: 1
Area: docker
TOCTitle: Getting started
PageTitle: Getting started with Docker images
MetaDescription: Prerequisites for deploying Docker containers to Azure App Services with Visual Studio Code
DateApproved: 06/19/2018
---
# Deploy to Azure using Docker

This tutorial walks you through containerizing an existing Node.js or Python application using [Docker](https://www.docker.com/), pushing the app image to a Docker registry, then deploying the image to [Azure Web App for Containers](https://azure.microsoft.com/en-us/services/app-service/containers/) directly from Visual Studio Code.

## Prerequisites

If you don't have an Azure account, [sign up now](https://azure.microsoft.com/free/?utm_source=campaign&utm_campaign=vscode-tutorial-docker-extension&mktingSource=vscode-tutorial-docker-extension) for a free 30-day account with $200 in Azure credits to try out any combination of services.

You need [Visual Studio Code](https://code.visualstudio.com/) installed along with the following:

    - [Docker Community Edition](https://www.docker.com/community-edition).
    - [Node.js and npm](https://nodejs.org/en/download) or [Python and the Python extension](../python/python-tutorial.md).

## Install the Docker and Azure App Service extensions

The Docker extension helps you manage local Docker images, provides Docker commands, and simplifies deployment of app images to Azure.

> <a class="tutorial-install-extension-btn" href="vscode:extension/PeterJausovec.vscode-docker">Install the Docker extension</a>

The Azure App Service extension helps you create, manage, and deploy Linux Web Apps on Azure.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-azuretools.vscode-azureappservice">Install the Azure App Service extension</a>

## Sign in

Once the extension is installed, log into your Azure account by navigating to the **Azure: App Service** explorer, select **Sign in to Azure**, and follow the prompts.

![sign in to Azure](images/app-service-extension/sign-in.png)

## Prerequisite check

Before continuing, make sure you've installed and configured all the prerequisites. To verify Docker, run the following command, which should show output such as `Docker version 18.03.1-ce, build 9ee9f40`.

```bash
docker --version
```

In VS Code, you should see your Azure email address in the Status Bar and your subscription(s) in the **Azure: App Service** explorer.

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/create-registry">I've installed the Docker Extension</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
