---
Order: 1
Area: nodejsdeploymentui
TOCTitle: Getting started
PageTitle: Node.js deployment with Visual Studio Code
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 10/5/2017
---
# Deploy to Azure using the Azure CLI

In this walkthrough, you will deploy a Node.js application to the Azure cloud using the [Azure Web Portal](https://azure.microsoft.com/en-gb/features/azure-portal/).

## Prerequisites

If you don't have an Azure account, [sign up today](https://azure.microsoft.com/en-us/free/?utm_source=campaign&utm_campaign=vscode-tutorial-node-git&mktingSource=vscode-tutorial-node-git) for a free 30 day account with $200 in Azure credits to try out any combination of services.

You'll need [Node.js and npm](https://nodejs.org/en/download/) and [Git](https://git-scm.com/downloads) installed locally.

You will use the Azure Web Portal to do the following:

* Create an Azure Website.
* Set up a deployment pipeline between a local/remote Git repository and the Website.

## Prerequisite Check

Before we continue, ensure that you have all of the prerequisites properly installed. Type each command and ensure it displays the version you have installed. If your Node.js version is less than 6, please [upgrade](https://nodejs.org/en/download/) to the most current LTS ("Long Term Stable") release.

```bash
$ node -v
6.10.2
```

Now check that you have `git` installed. If not, [install](https://git-scm.com/downloads) it and test again.

```bash
$ git --version
git version 2.6.4
```

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/express">I've created an Azure account</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-ui', 'getting-started')" href="javascript:void(0)">I ran into an issue</a>
