## Deploying your Application to the Cloud

Let's finish up this walkthrough by deploying our application to the cloud. While it is possible to deploy directly to a web site, it is not a best practice. Instead, we will set up continuous deployment from a GitHub repository to an Azure App Service website (Azure's Platform as a Service offering). With this setup, you can use version control to roll back changes, configure different branches to deploy to different development "slots" (e.g. development or production) and more.

If this sounds complicated, don't worry, it isn't :).

> If you don't have an Azure subscription, [sign up today](https://azure.microsoft.com/en-us/free/) for a free 30 day account with $200 in Azure Credits to try out any combination of Azure services.

The first thing we'll need to do is get our source code into a GitHub repository. Browse to your GitHub account and [create a new public repository](https://github.com/new).

![Create a new GitHub repository](images/nodejs/newgithubrepo.png)

---

We are going to follow the instructions provided by GitHub to create a new repository on the command line, but with a few changes. 
It is a good practice to include a `.gitignore` file in your repository that excludes the `node_modules` folder. We'll do this instead of creating a `README.md` file and we'll add and commit all of the files in the workspace (except `node_modules` of course): 

```bash
echo "node_modules" >> .gitignore
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/**YourGitHubAccount**/myExpressApp.git
git push -u origin master
```

Next, we will create an Azure Website to host our app. Once we have that, we'll configure the site to pull and deploy from the Git repository every time we push changes. To create the site, we'll use the new, cross platform Azure CLI.

> [Install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

The following CLI commands will create our site and set up continuous deployment. Make sure you name your site properly per the comments.

```bash
# Follow the login instructions
az login

# Create an Azure Resource Group which is essentially a container for all of your application resources.
az group create -l westus -n myExpressAppGroup

# Create an Azure App Service Plan which is essentially the machine on which your application will be hosted.
# In this walkthrough, we will use a FREE plan which will host your app on a machine with other websites.
az appservice plan create -n myExpressAppPlan -g myExpressAppGroup -l westus --sku FREE

# Now create the website and give it a unique name as it will be referenced as http://**myUniqueName-ExpressApp**.azurewebsites.net
az appservice web create -n myUniqueName-ExpressApp -g myExpressAppGroup -p myExpressAppPlan

# Let's test that our site is up and running. It will be a temporary site as we have not deployed any code here yet.
az appservice web browse -n myUniqueName-ExpressApp -g myExpressAppGroup

# Configure the site for continuous deployment through our GitHub repository.
az appservice web source-control config --repo-url https://github.com/yourgithubaccount/myExpressApp -n myUniqueName-ExpressApp -g myExpressAppGroup
```

Refresh the site and you should see your Express application hosted in the cloud on Azure! 

![Express app running in Azure](images/nodejs/expressinazure.png)

---

To test continuous deployment, make a change to the `index.jade` file found in the `views` folder and make a local commit.

![Commit a change](images/nodejs/commitchange.png)

Use the overflow menu to **Sync** the change with the GitHub repository. 

![Sync the change](images/nodejs/syncchange.png)

Finally, the site will recognize a change has been pushed and the content will automatically be redeployed. 

![VS Code Rocks](images/nodejs/vscoderocks.png)