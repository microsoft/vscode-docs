---
Area: staticsite
Order: 6
TOCTitle: "- Deploy using CLI"
PageTitle: Deploy using CLI
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 4/6/2018
---
# Deploy to Azure Storage using Azure CLI

In this section, you will use the Azure CLI to deploy your app to your Azure blob storage.

## Prerequsites

**Azure CLI** - [Go here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) to download and install.

If it is working, you should be able to run:

```bash
az -v
```

## Deploy with Azure CLI

1. To write to the storage account we just created, we need to use an access key. You should find the `storage-account` and `resource-group-name` from Azure portal. 
```bash
az storage account keys list -n <storage-account> -g <resource-group-name> --output table
```

2. We can use the `az storage blob upload-batch` command to upload all of our files from the output `build` folder to our destination blob container that we created in the last section.

```bash
az storage blob upload-batch -s build  -d <container-name> --account-name <storage-account> --account-key <account-key-from-step-1>
```

> **Note**: You can also create environment variables for your storage account name and account key so you don't have to add them as arguments for future commands. Those variables are `AZURE_STORAGE_ACCOUNT` and `AZURE_STORAGE_KEY` respectively.

3. If the upload is successful, you should see output similar to the following:

   ```bash
   uploading /Users/bossman/Documents/dev/react-test/build/favicon.ico
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/index.html
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/asset-manifest.json
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/manifest.json
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/service-worker.js
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/static/css/main.c17080f1.css
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/static/css/main.c17080f1.css.map
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/static/js/main.e74404f1.js
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/static/js/main.e74404f1.js.map
   Finished[#############################################################]  100.0000%
   uploading /Users/bossman/Documents/dev/react-test/build/static/media/logo.5d5d9eef.svg
   Finished[#############################################################]  100.0000%
   ```

4. Navigate to `https://<storage-account-name>.blob.core.windows.net/<container-name>/index.html` to see your deployed website!

## Make a reusable deploy script

1. Let's make it easy to re-run this deploy in the future.

   Copy the following into a file and name it `deploy.sh` (or `deploy.cmd` on Windows).

   ```
   #!/usr/bin/env bash
   export AZURE_STORAGE_ACCOUNT=<storage-account-name>
   export AZURE_STORAGE_KEY=<account-key-from-step-1>

   az storage blob upload-batch -s build -d <container-name>
   ```

2. Now open `package.json` and add the following to your `scripts` section:

   ```json
   "deploy": "./deploy.sh"
   ```

3. Finally, give the file execute permissions from the terminal and run it with `npm run deploy`:

   ```bash
   chmod +x ./build.sh

   npm run deploy
   ```

If everything is working properly, you should see the same output from step 4 above!

![App running in Azure](images/static-website/azure-app.png)

----

<a class="tutorial-next-btn" href="/tutorials/static-website/code-change">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'deploy-cli')" href="javascript:void(0)">I ran into an issue</a>
