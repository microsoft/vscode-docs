---
Order: 5
Area: staticsite
TOCTitle: Make a code change
PageTitle: Make a code change
MetaDescription: Website deployment to Azure Storage with Visual Studio Code
DateApproved: 6/27/2018
---
# Making a code change

In this section, you will make a source code change and redeploy the site so that you can see what your end-to-end deployment workflow will look like.

## Make a change

Open `App.js` and change **line 11** to the following:

```js
<h1 className="App-title">Welcome to Azure!</h1>
```

## Redeploy your app

Run `npm run build` locally then right-click your updated `build` directory and choose **Deploy to Static Website**. Choose your Storage Account and confirm that you want to deploy your changes.

> **Tip**: Your compiled application code will have a different filename on each build to prevent caching. Because of this, the extension will automatically delete the old files before deploying changes.

## Test your changes

Once your deployment is complete, revisit your storage endpoint (`https://<storage-account-name>.z4.web.core.windows.net/`) and you should see the following:

![Import build](images/static-website/updated-azure-app.png)

----

<a class="tutorial-next-btn" href="/docs">I'm done!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'code-change')" href="javascript:void(0)">I ran into an issue</a>
