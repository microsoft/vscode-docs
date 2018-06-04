---
Order: 4
Area: docker
TOCTitle: Deploy the image
PageTitle: Deploy the image
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 1/11/2018
---
# Deploy the image to Azure App Service

Now that you have your app image built and pushed to a registry, you can deploy to [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/) directly from the Docker extension explorer.

## Deploy the image

Find the image under the **Registries** node in the **DOCKER** explorer, right click the `:latest` tag and choose **Deploy Image to Azure App Service**.

![Deploy From the Explorer](images/docker-extension/deploy-menu.png)

From here follow the prompts. Set up a Resource Group in `West US` and App Service Plan. For this tutorial, use 'myResourceGroup' and 'myPlan' for the Resource Group and plan names then give your app a **unique** name.

Once created, your app is accessible via http://**unique-name**.azurewebsites.net. In this example, I called it `myExpressApp4321`.

![Create and Deploy](images/docker-extension/create.gif)

A **Resource Group** is essentially a named collection of all our application's resources in Azure. For example, a Resource Group can contain a reference to a website, a database, and an Azure Function.

An **App Service Plan** defines the physical resources that will be used to host our website. In this walkthrough, we will use a **Basic** hosting plan on **Linux** infrastructure, which means the site will be hosted on a Linux machine alongside other websites. You can scale up and be the only site running on a machine later in the Azure Portal.

## Browse the website

The Output panel will open during deployment to indicate the status of the operation. Once completed, find the app that you just created in the **AZURE APP SERVICE** explorer, right-click, and choose **Browse Website** to open the site in your browser.

----

<a class="tutorial-next-btn" href="/tutorials/docker-extension/tailing-logs">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('docker-extension', 'deploy-app')" href="javascript:void(0)">I ran into an issue</a>
