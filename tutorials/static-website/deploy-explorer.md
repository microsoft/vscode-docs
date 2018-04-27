---
Order: 5
Area: staticsite
TOCTitle: "- Deploy manually"
PageTitle: Deploy manually
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 4/6/2018
---
# Deploy using Azure Storage Explorer

## Prerequisites

**Azure Storage Explorer** - [Go here](https://azure.microsoft.com/en-us/features/storage-explorer/) to download and install.

## Deploy with Storage Explorer

1. Launch Storage Explorer and click **Sign In** in the **Connect to Azure Storage** dialog.

   ![Add account to explorer](images/static-website/explorer/1-add-account.png)

2. In the left menu bar, select your subscription, storage account, and blob container.

   Then select all the files inside the `build` folder (using `Shift + Click` to multi-select) and drag and drop them into Storage Explorer. This will upload all files selected to your blob container.

   ![Select container](images/static-website/explorer/2-select-container.png)

3. Select `index.html` inside Storage Explorer and click **Copy URL** in the top menu bar.

   Now paste that URL into a browser to see your deployed site!

   ![Copy URL](images/static-website/explorer/3-copy-url.png)

If everything worked properly, you should see the following:

![App running in Azure](images/static-website/azure-app.png)

----

<a class="tutorial-next-btn" href="/tutorials/static-website/code-change">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'deploy-explorer')" href="javascript:void(0)">I ran into an issue</a>
