---
Order: 4
Area: staticsite
TOCTitle: "Deploy the Website"
PageTitle: Deploy the Website
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 4/6/2018
---
# Deploy using Azure Storage Extension for VS Code

In the **AZURE STORAGE** explorer, expand your subscription and find the Azure Storage account that you just created and expand the **Blob Containers** node. Notice the `$web` container, this was created when you enabled static website hosting and this is where your application code will be dpeloyed.

1. Open your application code in VS Code, right-click on your **build** directory, and choose **Deploy to Static Website**.

    ![Deploy to Static Website](images/static-website/deploy-build.png)

1. Choose your Subscription and the Storage Account that you just created. When completed, you can click into the portal to copy your website URL (primary endpoint).

    ![Deployment Complete](images/static-website/deployment-complete.png)

Visit the URL to see your app running on Azure.

![App running in Azure](images/static-website/azure-app.png)

----

<a class="tutorial-next-btn" href="/tutorials/static-website/code-change">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'deploy-explorer')" href="javascript:void(0)">I ran into an issue</a>
