---
Order: 8
Area: staticsite
TOCTitle: Make a code change
PageTitle: Make a code change
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 4/6/2018
---
# Making a code change

In this section, you will make a source code change and re-deploy the site so that you can see what your end-to-end deployment workflow will look like.

## Make a change

Open `App.js` and change **line 11** to the following:

```js
<h1 className="App-title">Welcome to Azure!!!</h1>
```

## Redeploy your app

Depending on which method you chose previously, redeploy your app to Azure Storage.

**Manually with Storage Explorer** - Run `npm run build` locally and then drag and drop the `dist` folder into the blob container in  Azure Storage Explorer.

**Azure CLI** - Run `npm run deploy` to kick off your Azure CLI script (that [we previously defined](/tutorials/static-website/deploy-cli.md#make-a-reusable-deploy-script)).

**VSTS build/deploy pipeline** - Commit your change and push to your Visual Studio Team Services (VSTS) repository.

## Test your app

Once your deployment is complete, revisit your storage endpoint (`https://<storage-account-name>.blob.core.windows.net/<container-name>/`) and you should see the following!

![Import build](images/static-website/updated-azure-app.png)

----

<a class="tutorial-next-btn" href="/docs">I'm done!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'code-change')" href="javascript:void(0)">I ran into an issue</a>
