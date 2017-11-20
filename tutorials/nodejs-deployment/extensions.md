---
Order: 7
TOCTitle: Extensions
PageTitle: Extensions
MetaDescription:
MetaSocialImage:
DateApproved: 10/5/2017
ShortDescription:
---
# Azure Extensions

In this step, you will learn how to install additional extensions that help you build applications that run on Azure.

## The Marketplace

VS Code has a rich ecosystem of extensions found in the [Extension Marketplace](https://marketplace.visualstudio.com/vscode). There you can find 1000s of extensions to enhance your VS Code development experience ranging from new Themes, Icons, and Keymaps all the way to support for new languages, including debugging.

Here you will also find a rich collection of extensions that make it easy to build and host applications on Azure.

<div class="marketplace-extensions-azure-curated"></div>

> **Tip:** Click on an extension tile above to read the description and reviews in the Marketplace.

## Browsing Extensions

You can browse and install extensions from within VS Code. Bring up the **Extensions** view by using the **View: Extensions** command (`kb(workbench.view.extensions)`).

Enter `Azure` in the search box and press `kbstyle(Enter)` to query the Marketplace. You'll see a number of Azure related extensions.

![Search for Extensions](images/nodejs-deployment/searchforextension.png)

## Install the MS SQL Extension

Scroll to find the **mssql** extension and click on it to review the README. Click the **Install** button to download and install the extension. You'll be prompted to restart VS Code to load the extension.

![SQL Extension](images/nodejs-deployment/sqlextension.png)

Open the **Command Palette** (`kb(workbench.action.showCommands)`) and type in `sql` to search for the newly added commands which will let you connect to a SQL Server, run queries, and more!

![SQL Commands](images/nodejs-deployment/sqlcommands.png)

## Learn More at [docs.microsoft.com](https://docs.microsoft.com)

The [Azure for Node.js](https://docs.microsoft.com/en-us/nodejs/azure/?view=azure-node-2.0.0) developer center has a number of great articles on how to build and deploy Node.js based functions and applications to Azure.

## Congratulations!

Congratulations, you've successfully completed this walkthrough!

----

<a class="tutorial-next-btn" href="/docs">I'm Done!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment', 'extensions')" href="javascript:void(0)">I ran into an issue</a>