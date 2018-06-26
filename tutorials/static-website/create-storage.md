---
Order: 3
Area: staticsite
TOCTitle: Create storage account
PageTitle: Create storage account
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 4/6/2018
---
# Create Azure Storage account

Now that you have a static website, let's deploy it to the cloud using Azure Storage. Azure Storage is simple file store/CDN with a built-in web server which makes it great for hosting static sites extremely fast.

In this section, we will setup our Azure Storage account and blob container.

1. Login to [Azure Portal](https://portal.azure.com)

2. Select **Storage accounts** from the left side menu bar.

   > **Note**: If you don't see **Storage accounts**, select **All services** from the top of the menu, find it in the full list, and star it to dock it in your menu bar.

   ![Sign into Storage Explorer](images/static-website/storage/1-portal-select-storage.png)

3. Click either **+ Add** or **Create Storage Accounts** to create a new account.

   ![Create new storage account](images/static-website/storage/2-portal-new-storage.png)

4. Fill in a **Name** for your storage account and the **Resource group**.

   Note the storage account name must be globally unique, so just add some random numbers to the end if the name you want is taken. Everything else can be left at the default value.

   When you're ready click **Create** and wait for the account to get created.

   ![Add name and Resource Group](images/static-website/storage/3-portal-config-storage.png)

5. When account creation is complete, you will get a notification (the bell icon in the top menu bar).

   Click **Go to resource**.

6. Select **Static Website (preview)** from the left side menu bar and enable static site hosting.

  > **Note**: Be sure to include the name of your index document.

   ![Confirm container](images/static-website/storage/8-portal-config-static-site.png)


## Your site URL

Within the **Static Website (preview)** configuration options, copy the URL for your website. This will be the primay endpoint for your app.

`https://<storage-account-name>.z4.web.core.windows.net/`

With Static Website hosting enabled, your configured index document will be served by default along with all of your static assets.

----

<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-website">I created a storage container</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'create-storage')" href="javascript:void(0)">I ran into an issue</a>
