---
Order: 7
Area: staticsite
TOCTitle: "- Deploy using VSTS"
PageTitle: Deploy using VSTS
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved: 4/6/2018
---
# Deploy to Azure Storage using VSTS

In this section, you will use Visual Studio Team Services (VSTS) to host and publish your application to Azure Storage. This is split into the following steps:

1. Create a VSTS project.
2. Push your app to the project repository.
3. Create a CI (continuous integration) build/deploy pipeline.
4. Use CI to build and publish your site on Azure Storage.

## Prerequisites

**VSTS account** - If you don't have an account, you can [sign up here](https://www.visualstudio.com/team-services/).

**Git** - We will use Git to push our code to our VSTS project. Install Git from [git-scm.com](https://git-scm.com/downloads)

## Create a VSTS project

1. Login to your [VSTS profile](https://app.vsaex.visualstudio.com).

2. Select an account.

   ![Select account](images/static-website/vsts/1-select-account.png)

3. Click **New Project** under the **Projects** tab.

   ![New project](images/static-website/vsts/2-new-project.png)

4. Fill in your project details and click **Create**.

   ![New project details](images/static-website/vsts/3-new-project-details.png)

## Push app to VSTS project repository

1. Expand the **push an existing repository from command line** section and copy the push commands.

   ![Copy push commands](images/static-website/vsts/4-copy-push-commands.png)

2. Open a terminal at the root of the project we generated (or your own project). Now initialize a Git repository and make an initial commit.

   ```bash
   git init  # create a git repository
   git add -A  # recursively add all files in current directory
   git commit -m "initial commit"  # commit changes with supplied message
   ```

3. Paste the push commands to add the VSTS repository as a remote location and push your code to your VSTS repo.

   ```bash
   git remote add origin https://<your-VSTS-account>.visualstudio.com/DefaultCollection/_git/<project-name>
   git push -u origin --all
   ```

After running `git push`, you should be able to refresh your VSTS project page and see your code!

![Project imported](images/static-website/vsts/5-project-with-code.png)

## Create a build/deploy pipeline

1. Click **Build and Release > Builds** from the top menu bar on the project home page.

   ![Select build definitions](images/static-website/vsts/6.1-select-builds.png)

2. Click the **Import** button in the top right and upload [this build definition template](https://raw.githubusercontent.com/bowdenk7/React-VSTS-build-definition/master/storage-deploy.json).

   ![Import build](images/static-website/vsts/7-import-build-definition.png)

3. A few settings will be missing that you must fill in on your own:

   - In the **Process** section, select **Hosted Linux Preview** from the **Agent queue** drop down.
   - Click on the **Get sources** section and let it update to automatically resolve the errors.
   - Click on the **Azure CLI** section, select and authorize your Azure subscription, and then input the container we [created earlier](create-storage) in place of **<container-name>** and **<connection-string>** in the **Inline Script** box.

   You can find the connection string in Azure Portal under the **Access Keys** section after selecting your storage account.

> **Warning**: Make sure you keep single quotes around the `connection-string` argument.

When done, your AzureBlob File Copy settings should look like this:

![Build definition](images/static-website/vsts/8-build-definition.png)

## Use CI to build and publish

1. Click **Save & queue** in the top right, then click **Save & queue** again with the default options in the following pop-up.

   This will save this build definition and run it immediately with whatever is currently checked into your `master` branch.

2. A green success banner will pop-up at the top of your screen.

   Clicking the hyperlinked number will take you to the current build.

   ![Build queued](images/static-website/vsts/9-build-queued.png)

3. Your build will wait in a queue and then a build agent will execute the steps we just configured.

   This may take a few minutes. If there are multiple builds in the queue, you may need to wait for your turn.

4. If everything completes successfully, you will see a green success message along with the details of the build.

   At this point, your app should be deployed and publicly available in your blob storage.

5. Navigate to your app entry point in a browser.

   It should look something like this `https://<storage-account-name>.blob.core.windows.net/<container-name>/index.html`

If everything is working, you should see the following!

![Sign into Storage Explorer](images/static-website/azure-app.png)

----

<a class="tutorial-next-btn" href="/tutorials/static-website/code-change">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'deploy-VSTS')" href="javascript:void(0)">I ran into an issue</a>
