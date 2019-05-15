---
Order: 1
Area: functions
TOCTitle: Getting started
PageTitle: Azure Functions with Visual Studio Code
MetaDescription: Try Azure Functions for free with Visual Studio Code
DateApproved: 2/9/2018
---
# Deploy to Azure using Azure Functions

This tutorial walks you through creating and deploying a JavaScript Azure Functions application using the [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) extension. Create a new app, add functions and deploy in a matter of minutes from Visual Studio Code.

## Prerequisites

You need [Visual Studio Code](https://code.visualstudio.com/) installed along with [Node.js and npm](https://nodejs.org/en/download), the Node.js package manager.

To enable local debugging, you need to install the [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools#installing).

**On macOS**, install using [Homebrew](https://brew.sh/).

```bash
$ brew tap azure/functions
$ brew install azure-functions-core-tools
```

**On Windows**, install using [npm](https://npmjs.com).

```bash
$ npm install -g azure-functions-core-tools
```

**On Linux**, follow the instructions in the Azure Functions Core Tools [GitHub repository](https://github.com/Azure/azure-functions-core-tools#linux).

## Install the extension

The Azure Functions extension is used to create, manage, and deploy Functions Apps on Azure.

> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-azuretools.vscode-azurefunctions">Install the Azure Functions extension</a>

## Prerequisite check

Before we continue, ensure that you have all the prerequisites installed and configured.

In VS Code, you should see your Azure email address in the Status Bar and your subscription in the **AZURE FUNCTIONS** explorer.

Verify that you have the Azure Functions tools installed by opening a terminal (or PowerShell/Command Prompt) and running `func`.

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
