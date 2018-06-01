---
Order: 4
Area: staticsite
TOCTitle: Choose deployment method
PageTitle: Choose deployment method
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 4/6/2018
---
# Choose your deployment method

There are several ways to deploy your code from your computer to the blob storage container we just created. There is no "best" way and each method has pros and cons. Fundamentally, each method is just copying the files from your disk and uploading them to the server. If you already know which approach you want to use, you can skip this section and choose from the methods below.

> **Note**: You can freely switch your deployment method whenever you want with no side effects!

## Deploy manually using Storage Explorer

Storage Explorer is a utility that makes it easy to view and upload files to your blob containers. If this is the first time you are using Azure Storage or are generally unfamiliar with deploying websites, this is a good place to start.

Using Storage Explorer is conceptually easy to understand, however, it is a manual process and each deploy will require you to upload your folder of files.

<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-explorer">Deploy manually using Storage Explorer</a>

## Deploy using Azure CLI

The Azure CLI is a command line utility that allows you to do your entire deployment from a terminal. If you are already familiar with Azure or generally prefer working from the command line, this is the method for you.

The Azure CLI also makes it easy to write scripts to automate your deployment process but if you are unfamiliar with Azure, it might be difficult to follow what is going on.

<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-cli">Deploy using Azure CLI</a>

## Deploy using VSTS

Visual Studio Team Services (VSTS) has many capabilities, from source control to agile planning and management, but here we will be using it specifically for continuous integration and deployment. If you are already using VSTS or are seeking an automated deployment solution (that doesn't require a command line or scripting), VSTS is probably the best approach for you.

The only real disadvantage to using VSTS is that it requires a VSTS account, but once you have that set up, you can get going fast via an intuitive web UI.

<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-VSTS">Deploy using VSTS</a>

----
If you're still not sure which is the best option for you, click the button below, tell us a little more about what you're trying to accomplish, and we'll do our best to help you out!

<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'choose-deployment')" href="javascript:void(0)">I still don't know what to pick</a>
