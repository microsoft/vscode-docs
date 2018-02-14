---
Order: 3
Area: appservicetools
TOCTitle: Deploy the website
PageTitle: Deploy the website
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 12/18/2017
---
# Deploy the Website

In this step, you deploy your Node.js website using VS Code and the Azure App Service extension. This tutorial uses the most basic deployment model where your app is zipped and deployed to an Azure Web App on Linux.

## Deploy using Azure App Service

In the **AZURE APP SERVICE** explorer, click the blue up arrow icon to deploy your app to Azure.

![Deploy to Web App](images/app-service-extension/deploy.png)

> **Tip:** You can also deploy from the **Command Palette** (`kb(workbench.action.showCommands)`) by typing `deploy to web app` and running the **Azure App Service: Deploy to Web App** command.

From here follow the prompts. Choose the directory that you currently have open, `myExpressApp`, select your active Azure subscription, and then choose **Create New Web App**.

![Create New Web App](images/app-service-extension/create-app.png)

Next, give your app a **unique** name and set up a resource group and App Service Plan. For this tutorial, use the default names for the resource group and plan to keep things simple and launch the app in `West US`.

Once created, your app is accessible via http://**unique-name**.azurewebsites.net. In this example, I called it `practical-mustache`.

![Create and Deploy](images/app-service-extension/create.gif)

A **Resource Group** is essentially a named collection of all our application's resources in Azure. For example, a Resource Group can contain a reference to a website, a database, and an Azure Function.

An **App Service Plan** defines the physical resources that will be used to host our website. In this walkthrough, we will use a **Basic** hosting plan on **Linux** infrastructure, which means the site will be hosted on a Linux machine alongside other websites. You can scale up and be the only site running on a machine later in the Azure Portal.

Once created, you're prompted to deploy the app, choose yes.

![Deploy the App](images/app-service-extension/deploy-prompt.png)

## Browse the website

The output window will open during deployment to indicate the status of the operation. Once completed, find the app that you just created in the **AZURE APP SERVICE** explorer, right-click, and choose **Browse Website** to open the site in your browser.

> **Tip:** Be sure that your application is listening on the port provided by the PORT environment variable: `process.env.PORT`.

## Troubleshooting

Are you seeing the error **"You do not have permission to view this directory or page."**? If so, the application probably failed to start correctly. Head to the next step and view the log output to find and fix the error. If you aren't able to fix it, you can contact us by clicking the **I ran into an issue** button below. We're happy to help!

## Updating the website

You can deploy changes to this app by using the same process and choosing the existing app rather than creating a new one.

----

<a class="tutorial-next-btn" href="/tutorials/app-service-extension/tailing-logs">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azureappservice', 'deploy-app')" href="javascript:void(0)">I ran into an issue</a>
