---
Order: 1
Area: staticsite
TOCTitle: Getting started
PageTitle: Website deployment with Azure Storage
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 6/27/2018
---
# Deploy a static website to Azure

This tutorial walks you through deploying a static website, such as an Angular or React [SPA](https://en.wikipedia.org/wiki/Single-page_application) or simple HTML/CSS/JavaScript site, to Azure using [Azure Storage](https://docs.microsoft.com/en-us/azure/storage).

> **Note**: If you have your own server code, such as a Node.js/Express server, see the [App Service tutorial](/tutorials/app-service-extension/getting-started.md) instead.

## Overview

When you are building a static website, your production website is a collection of HTML, CSS, JavaScript and other static files (images, fonts, etc.). You can host and serve these files using either App Service or Azure Storage, but we will use Azure Storage because it's a little simpler and a lot cheaper.

In this tutorial, we will deploy your static site to Azure Storage by doing the following:

1. Get the required accounts and dependencies.
1. Create or prepare an application for deployment.
1. Create and configure Azure Storage for hosting.
1. Deploy to Azure Storage using VS Code!

## Prerequisites

**Azure Account** - If you don't have an Azure account, [sign up today](https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-tutorial-static-website&mktingSource=vscode-tutorial-static-website) for a free account with $200 in Azure credits to try out any combination of services.

**Node.js** - Download [Node.js and npm](https://nodejs.org/en/download), we recommend the LTS (long term support) version.

> **Note**: If you already have application code, you don't need to install Node.js as this tutorial only uses it to generate a sample project.

## Install the extension

The [Azure Storage](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage) extension is used to deploy your website to Azure.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-azuretools.vscode-azurestorage">Install the Azure Storage extension</a>

## Sign in

Once the extension is installed, log into your Azure account - in the Activity Bar, click on the Azure logo to show the **AZURE STORAGE** explorer. Click **Sign in to Azure...** and follow the instructions.

![sign in to Azure](images/static-website/sign-in.png)

## Prerequisite check

Before we continue, ensure that you have all the prerequisites installed and configured.

- Log in to [Azure Portal](https://portal.azure.com) to make sure your Azure Account is working.
- From a terminal, execute:

```bash
node -v
v8.11.3

npm -v
6.3.0
```

to ensure that both Node.js and npm are installed.

----

<a class="tutorial-next-btn" href="/tutorials/static-website/create-app">I've installed the prerequisites</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
