---
Order: 3
Area: staticsite
TOCTitle: Create storage account
PageTitle: Create storage account
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved:
---
# Create Azure Storage account

Now that you have a static website, let's deploy it to the web using Azure Storage.
Azure Storage is simple file store/CDN with a built in web server which makes it great for hosting static sites extremely fast.

In this section, we will setup our Azure Storage account and blob container.

1. Login to [Azure Portal](http://portal.azure.com)

2. Select **Storage accounts** from the left side menu bar.

> Note! If you don't see **Storage accounts**, select **All services** from the top of the menu, find it in the full list, and star it to dock it in your menu bar.

3. Fill in a **Name** for your storage account and the **Resource group**.
Note the storage account name must be globally unique, so just add some random numbers to the end if the name you want is taken.
Everything else can be left at the default value.
When you're ready click **Create** and wait for the account to get created.

4. When account creation is complete, you will get a notification (the bell icon in the top menu bar).
Click **Go to resource**.

5. Click **Blobs** in the Services section

6. Click the **"+ Container"**, name your container, and set the access level to **Blob**.

If everything was creating successfully, you should see your container and storage account information in the Blob service blade.
Keep this window open, you'll need this information later.

----

<a class="tutorial-next-btn" href="/tutorials/static-website/choose-deployment">I created a storage container</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'create-storage')" href="javascript:void(0)">I ran into an issue</a>
