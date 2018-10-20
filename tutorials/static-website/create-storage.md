---
Order: 3
Area: staticsite
TOCTitle: Create storage account
PageTitle: Create an Azure Storage account
MetaDescription: Website deployment to Azure Storage with Visual Studio Code
DateApproved: 6/27/2018
---
# Create an Azure Storage account

Now that you have a static website, let's deploy it to the cloud using Azure Storage. Azure Storage is simple file store/CDN with a built-in web server which makes it great for hosting static sites extremely fast.

## Create your account

In this section, we will setup our Azure Storage account and blob container.

1. Login to [Azure Portal](https://portal.azure.com)

2. Select **Storage accounts** from the left side menu bar.

   > **Note**: If you don't see **Storage accounts**, select **All services** from the top of the menu, find it in the full list, and star it to dock it in your menu bar.

   ![Sign into Storage Explorer](/tutorials/images/static-website/storage/1-portal-select-storage.png)

3. Click either **+ Add** or **Create Storage Accounts** to create a new account.

   ![Create new storage account](/tutorials/images/static-website/storage/2-portal-new-storage.png)

4. Fill in a **Name** for your storage account and the **Resource group**.

   Note the storage account name must be globally unique, so just add some random numbers to the end if the name you want is taken.

5. Select **StorageV2 (general purpose v2)** for **Account kind**

   Static website hosting is only available for accounts using GPv2.

   ![Add name and Resource Group](/tutorials/images/static-website/storage/3-portal-config-storage.png)

6. When you're ready, click **Create** and wait for the account to be created.

## Create your storage

1. When account creation is complete, you will get a notification (the bell icon in the top menu bar).

   Click **Go to resource**.

2. Select **Static Website (preview)** from the left side menu bar and enable static site hosting.

  > **Note**: Be sure to include the name of your index document.

   ![Confirm container](/tutorials/images/static-website/storage/8-portal-config-static-site.png)

## Your site URL

Within the **Static Website (preview)** configuration options, copy the URL for your website. This will be the primary endpoint for your app.

`https://<storage-account-name>.z4.web.core.windows.net/`

With Static Website hosting enabled, your configured index document will be served by default along with all of your static assets.

----

<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-website">I created a storage container</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'create-storage')" href="javascript:void(0)">I ran into an issue</a>
