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

![Sign into Storage Explorer](images/static-website/storage/1-portal-select-storage.png)

3. Click either **+ Add** or **Create Storage Accounts** to create a new account.

![Create new storage account](images/static-website/storage/2-portal-new-storage.png)

4. Fill in a **Name** for your storage account and the **Resource group**.
Note the storage account name must be globally unique, so just add some random numbers to the end if the name you want is taken.
Everything else can be left at the default value.
When you're ready click **Create** and wait for the account to get created.

![Add name and resource group](images/static-website/storage/3-portal-config-storage.png)

5. When account creation is complete, you will get a notification (the bell icon in the top menu bar).
Click **Go to resource**.

6. Click **Blobs** in the Services section

![Navigate to blobs](images/static-website/storage/4-portal-select-blobs.png)

7. Click the **"+ Container"**, name your container, and set the access level to **Blob**.

![Create container](images/static-website/storage/6-portal-create-container.png)

If everything was creating successfully, you should see your container and storage account information in the Blob service blade.
Keep this window open, you'll need this information later.

![Confirm container](images/static-website/storage/7-portal-confirm-container.png)

## Setting relative paths

By default `create-react-app` assumes that your app will live in the server's root directory, however our app will be in a container which adds an extra folder level to every path.

`https://mystorageaccount12312.blob.core.windows.net/**my-container**`

Luckily there is an easy fix for this.
We simply add the following to our `package.json` with your own values in place of `storage-account-name` and `container-name`:

```json
"homepage": "https://<storage-account-name>.blob.core.windows.net/<container-name>/"
```

This setting will make sure that all urls generated during `npm build` contain the correct relative path that we need to serve the app.
You can read more about relative paths in `create-react-app` on their [GitHub README](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths).

----

<a class="tutorial-next-btn" href="/tutorials/static-website/choose-deployment">I created a storage container</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'create-storage')" href="javascript:void(0)">I ran into an issue</a>
