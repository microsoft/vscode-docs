---
Order: 5
Area: staticsite
TOCTitle: Make a code change
PageTitle: Make a code change
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved:
---
# Making a code change

In this section, you will make a code change and re-deploy the site so you can see what your end-to-end deployment workflow will look like.

If you have been following this guide using `create-react-app`, this section will show you how to the routing issue that makes the app not render correctly.

## Setting relative paths

By default `create-react-app` assumes that your app will live in the server's root directory, however if you look at our URL, you'll notice that we have our container name prepended to every route.

Luckily there is an easy fix for this.
We simply add the following to our `package.json` with your own values in place of `storage-account-name` and `container-name`:

```json
"homepage": "https://<storage-account-name>.blob.core.windows.net/<container-name>/"
```

This setting will make sure that all urls generated during `npm build` contain the correct relative path that we need to serve the app.
You can read more about relative paths in `create-react-app` on their [GitHub README](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths).

## Redeploy your app

Depending on which method you chose previously, redeploy your app to Azure Storage.

Manually with Storage Explorer - Run `npm run build` locally

Azure CLI - //TODO - something using [this](https://docs.microsoft.com/en-us/cli/azure/storage/blob?view=azure-cli-latest#az-storage-blob-upload-batch)
```bash
az storage blob upload-batch
```

VSTS build/deploy pipeline - Simply commit your code and push to your VSTS repository.

## Test your app

Once your deploy is complete, revisit your storage endpoint (`https://<storage-account-name>.blob.core.windows.net/<container-name>/`) and you should see the following!



----

<a class="tutorial-next-btn" href="/tutorials/static-website/choose-deployment">I created the React application</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'code-change')" href="javascript:void(0)">I ran into an issue</a>
