---
Order: 4
TOCTitle: Deploy the Website
PageTitle: Deploy the Website
MetaDescription:
MetaSocialImage:
DateApproved: 10/5/2017
ShortDescription:
---
# Deploy the Website

In this step, you will deploy your Node.js website using Git and the Azure CLI. You will use the most basic deployment model where you push your local Git repository to the Website. Later in this walkthrough, you will set up a more robust Continuous Delivery pipeline.

## Initialize the Git Repository

Initialize a local Git repository and make an initial commit. Git will respect the `.gitignore` file created when you first created the application using the Express generator and not commit the `node_modules` folder.

```bash
$ git init
$ git add -A
$ git commit -m "Initial Commit"
```

## Set up a Remote

Configure the Website for deployment via Git. If you have not already set up deploy credentials in Azure, do this first, replacing `UserName` and `Password` below. Note that `UserName` must be uniqe across Azure!

```bash
$ az webapp deployment user set --user-name <UserName> --password <Password>
```

This command will return the Git endpoint to push to which includes the `UserName`.

```bash
$ az webapp deployment source config-local-git --name myExpressApp-chrisdias
{
  "url": "https://chrisdias@myexpressapp-chrisdias.scm.azurewebsites.net/myExpressApp-chrisdias.git"
}
```

With the endpoint in hand, set up a new Remote in Git named `azure`.

```bash
$ git remote add azure https://chrisdias@myexpressapp-chrisdias.scm.azurewebsites.net/myExpressApp-chrisdias.git
```

## Deploy to Azure

Finally, you can deploy the application to Azure!

```bash
$ git push azure master
Password for 'https://chrisdias@myexpressapp-chrisdias.scm.azurewebsites.net':
Counting objects: 17, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (14/14), done.
Writing objects: 100% (17/17), 3.03 KiB | 0 bytes/s, done.
Total 17 (delta 1), reused 0 (delta 0)
remote: Updating branch 'master'.
remote: Updating submodules.
remote: Preparing deployment for commit id '5cda1c46a5'.
remote: Generating deployment script.
remote: Generating deployment script for node.js Web Site
remote: Generated deployment script files
...
```

You'll be prompted for the password you provided above. You should then see a series of messages from the remote host (the Website) as the code is being deployed. If you specified the node runtime version to use in your `package.json` you will see that being set as well.

Browse to the site again and you should see your Express site hosted in Azure!

![Express Site Hosted in Azure](images/nodejs-deployment/expressinazure.png)

> Are you seeing the error `Object #<eventemitter> has no method 'hrtime'`? If so, you probably need to set the node runtime version on the site. The following command will tell the site to use node version `6.9.1`. If your site requires a different or later version of node, specify the **full** semantic version `major.minor.patch`.

```bash
$ az webapp config appsettings set --name myExpressApp-chrisdias --settings WEBSITE_NODE_DEFAULT_VERSION=6.9.1
```

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/tailing-logs">My site is on Azure</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment', 'deploy-website')" href="javascript:void(0)">I ran into an issue</a>