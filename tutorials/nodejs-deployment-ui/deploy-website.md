---
Order: 4
Area: nodejsdeploymentui
TOCTitle: Deploy the website
PageTitle: Deploy the website
MetaDescription:
MetaSocialImage:
DateApproved: 10/5/2017
ShortDescription:
---
# Deploy the Website

In this step, you will deploy your Node.js website using Git and the Azure web portal. You will use the most basic deployment model where you push your local Git repository to the Website. Later in this walkthrough, you will set up a more robust Continuous Delivery pipeline.

## Initialize the Git Repository

Initialize a local Git repository and make an initial commit. Git will respect the `.gitignore` file created when you first created the application using the Express generator and not commit the `node_modules` folder.

```bash
$ git init
$ git add -A
$ git commit -m "Initial Commit"
```

## Set up a Remote

Configure the Website for deployment via Git.

Select your web app from the Azure portal and choose `Deployment Options` from the menu.

This will load a new pane, click the `Choose Source` option and then choose `Local Git Repository`

![Select Web App](images/nodejs-deployment-ui/localgitrepo.png)

This creates an endpoint which we can add as a git remote.

## Setting the credentials

Next we must set our credentials to authenticate from our local git repository to the Azure web app.

Select `Deployment credentials` and enter a `username` and `password` to use for the deployment and click `Save`.

With the endpoint in hand, set up a new Remote in Git named `azure`. The section of the URL between the `://` and `@` is the username you set in deployment credentials.

```bash
$ git remote add azure https://dougajmcdonald@myexpressapp-dougmcdonald.scm.azurewebsites.net/myExpressApp-dougmcdonald.git
```

## Deploy to Azure

Finally, you can deploy the application to Azure!

```bash
$ git push azure master
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 287 bytes | 287.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0)
remote: Updating branch 'master'.
remote: Updating submodules.
remote: Preparing deployment for commit id 'daae462889'.
remote: Generating deployment script.
remote: Running deployment command...
...
```

You'll be prompted for the password you provided above. You should then see a series of messages from the remote host (the Website) as the code is being deployed. If you specified the node runtime version to use in your `package.json` you will see that being set as well.

Browse to the site again and you should see your Express site hosted in Azure!

![Express Site Hosted in Azure](images/nodejs-deployment/expressinazure.png)

> If you see an error deploying it's likely you didn't set the Node.JS version in the `package.json` you can set this manually via the web portal by selecting `Application Settings` option in the Azure web portal and adding a setting with the key `WEBSITE_NODE_DEFAULT_VERSION` and a value of the Node version, in our example `6.9.1`.

![Setting the Node version](images/nodejs-deployment/setnodeversion.png)

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/publishing-changes">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-ui', 'deploy-website')" href="javascript:void(0)">I ran into an issue</a>