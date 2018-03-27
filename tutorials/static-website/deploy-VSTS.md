---
Order: 3
Area: staticsite
TOCTitle: Deploy the website
PageTitle: Deploy the website
MetaDescription: Website Deployment to Azure Storage with Visual Studio Code
DateApproved:
---
# Deploy to Azure Storage using VSTS

In this section, you will use VSTS to host and publish your project to Azure Storage. This is split into the following steps:

1. Create a VSTS project
2. Push your app to the project repository
3. Create a CI (continuous integration) build/deploy pipeline
4. Use CI to build and publish your site on Azure Storage

## Pre-reqs
**VSTS account** - If you don't have one, you can [sign up here](https://www.visualstudio.com/team-services/).

**git** - We will use git to push our code to our VSTS project.
Get it from [git-scm.com](https://git-scm.com/downloads)

## Create a VSTS project

1. Login to your [VSTS profile](http://app.vsaex.visualstudio.com)

2. Select an account

3. Create a new project

## Push app to VSTS project repository

1. Expand the **push an existing repository from command line** section and copy the push commands

2. Open a terminal at the root of the project we generated (or your own project), initialize a git repository, and make an initial commit.

```bash
$ git init  # create a git repository
$ git add -A  # recursively add all files in current directory
$ git commit -m "initial commit"  # commit changes with supplied message
```

3. Paste the push commands to add the VSTS repo as a remote location and push your code to your VSTS repo.

```
$ git remote add origin https://<your-VSTS-account>.visualstudio.com/DefaultCollection/_git/<project-name>
$ git push -u origin --all
```

After running `git push` you should be able to refresh your VSTS project page and see your code!

## Create a build/deploy pipeline

1. Click **Build and Release > Builds** from the top menu bar on the project home page

2. Click the **Import** button in the top right and upload [this build definition template](https://raw.githubusercontent.com/bowdenk7/React-VSTS-build-definition/master/storage-deploy.json).

3. A few settings will be missing that you must fill in on your own:
- In the **Process** section, select **Hosted** from the **Agent queue** drop down
- Click on the **Get sources** section and let it update to automatically resolve the errors
- Click on the **AzureBlob File Copy** section, select and authorize your Azure subscription, and select the **Storage Account** and **Container Name** we [created earlier](//TODO link back to earlier doc).

When done, your AzureBlob File Copy settings should look like this:

## Use CI to build and publish

1. Click **Save & queue** in the top right, then click **Save & queue** again with the default options in the following popup.
This will save this build definition and run it immediately with whatever is currently checked into your `master` branch.

2. A green success banner will popup at the top of your screen.
Clicking the hyperlinked number will take you to the current build.

3. Your build will wait in a queue and then a build agent will execute the steps we just configured.
This will take a few minutes.
**TODO - mention something about agents and waiting for you turn...**

4. If everything completes successfully, you will see a green success message along with the details of the build.
At this point your app should be deployed and publicly available in your blob storage.

5. Navigate to your app entry point in a browser.
It should look something like this `https://<storage-account-name>.blob.core.windows.net/<container-name>/index.html`

6. If you are following along with the create-react-app code, nothing will render yet, but that's ok!
As long as you don't have a 404, everything is working as expected.
All that remains is a simple code fix and a re-deploy!
----

<a class="tutorial-next-btn" href="/tutorials/static-website/tailing-logs">My blank page is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-staticwebsite', 'deploy-VSTS')" href="javascript:void(0)">I ran into an issue</a>
