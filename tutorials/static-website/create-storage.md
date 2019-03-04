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

## Create a Storage Account

In this section, you'll create and configure an Azure Storage Account and Blob Container.

In the **AZURE STORAGE** explorer, right-click on your subscription and choose **Create Storage Account**.

![Create Storage Account](images/static-website/create-storage-account.png)

1. Type a globally unique name for your Storage Account and press `kbstyle(Enter)`. Valid characters for an app name are 'a-z' and '0-9'.

2. Create a new Resource Group and accept the default name.

3. Choose a location in a [region](https://azure.microsoft.com/en-us/regions/) near you or near other services you may need to access.

Right-click the Storage Account that was just created and click **Configure Static Website...**

![Create Storage Account](images/static-website/configure-static-website.png)

1. Enter **index.html** for the index document name.

2. Enter **index.html** for the 404 error document name.

  **Note:** Index.html is used for the error document because modern Single Page Applications (SPAs) such as React will handle errors in the client. For classic static websites, use the error document to customize your 404 page.


With Static Website hosting enabled, your configured index document will be served by default along with all of your static assets.

----

<a class="tutorial-next-btn" href="/tutorials/static-website/deploy-website">I created a storage container</a>
<a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'create-storage')" href="javascript:void(0)">I ran into an issue</a>
