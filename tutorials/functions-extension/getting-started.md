---
Order: 1
Area: functions
TOCTitle: Getting started
PageTitle: Node.js Deployment with Visual Studio Code
MetaDescription: Node.js Deployment to Azure Functions with Visual Studio Code
DateApproved: 2/9/2018
---
# Deploy to Azure using Azure Functions

This tutorial walks you through creating and deploying a JavaScript Azure Functions application using the [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) extension. Create a new app, add functions and deploy in a matter of minutes from Visual Studio Code.

## Prerequisites

If you don't have an Azure account, [sign up today](https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-tutorial-functions-extension&mktingSource=vscode-tutorial-functions-extension) for a free 30-day account with $200 in Azure credits to try out any combination of services.

You need [Visual Studio Code](https://code.visualstudio.com/) installed along with [Node.js and npm](https://nodejs.org/en/download), the Node.js package manager.

To enable local debugging, you need to install the [.NET Core 2.0 SDK](https://www.microsoft.com/net/core) along with the Azure Functions Core tools from npm.

```bash
$ npm install -g azure-functions-core-tools@core
```

## Install the extension

The Azure Functions extension is used to create, manage, and deploy Functions Apps on Azure.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-azuretools.vscode-azurefunctions">Install the Azure Functions extension</a>

## Sign in

Once the extension is installed, log into your Azure account - in the **AZURE FUNCTIONS** explorer, click **Sign in to Azure...** and follow the instructions.

![sign in to Azure](images/functions-extension/sign-in.png)

## Prerequisite check

Before we continue, ensure that you have all the prerequisites installed and configured.

In VS Code, you should see your Azure email address in the Status Bar and your subscription in the **AZURE FUNCTIONS** explorer.

Verify that you have the Azure Functions tools installed by opening a terminal and running `$ func`.

```bash
$ func
                  %%%%%%
                 %%%%%%
            @   %%%%%%    @
          @@   %%%%%%      @@
       @@@    %%%%%%%%%%%    @@@
     @@      %%%%%%%%%%        @@
       @@         %%%%       @@
         @@      %%%       @@
           @@    %%      @@
                %%
                %

Azure Functions Core Tools (2.0.1-beta.22)
Function Runtime Version: 2.0.11415.0
```

----

<a class="tutorial-next-btn" href="/tutorials/functions-extension/create-app">I've installed the Azure Extension</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azurefunctions', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
