---
Order: 4
Area: staticsite
TOCTitle: Choose deployment method
PageTitle: Choose deployment method
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved:
---

# Choose your deployment method
There are several ways to actually deploy your code from your computer to the blob storage container we just created.
There is no "best" way, and each method has pros and cons, however they all fundamentally are just copying the files from your disk and uploading them.
If you already know what you're looking for, ship this section and choose from the methods below. Or keep reading for an explanation of each and some of the pros and cons.
> Note! You can freely switch your deployment method whenever you want with no side effects!

## Deploy manually using Storage Explorer
Storage explorer is a utility that makes it easy to view and upload files to your blob containers.
If this is the first time you are using Azure Storage or are generally unfamiliar with deploying website in general, this is a good place to start.
It is conceptually easy to understand what is happening, however, it is a manual process and each deploy will require you to upload a folder of code.
<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-explorer">Deploy manually using Storage Explorer</a>

## Deploy using Azure CLI
Azure CLI is a command line utility that provides commands that allows you to do your entire deployment from a terminal.
If you are already familiar with Azure or generally prefer working from the command line, this is the method for you.
Azure CLI makes it easy to write scripts to automate your deployment process, however, if you are unfamiliar with Azure, it might be difficult to follow what is going on.
<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-cli">Deploy using Azure CLI</a>

## Deploy using VSTS
Visual Studio Team Services (VSTS) can do a lot of things from source control to agile planning and management, but we will be using it specifically for continuous integration and deployment.
If you are already using VSTS or are seeking an automated deployment solution (that doesn't require a command line or scripting), VSTS is probably the best approach for you.
The only real downside is that it requires a VSTS account, but once you have that setup, you can get going fast via an intuitive web UI.
<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-VSTS">Deploy using VSTS</a>
----
If you're still not sure which is the best option for you, click the button below, tell us a little more about what you're trying to accomplish, and we'll do our best to help you out!
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'choose-deployment')" href="javascript:void(0)">I still don't know what to pick</a>
