---
Order: 3
TOCTitle: Create the Website
PageTitle: Create the Website
MetaDescription:
MetaSocialImage:
DateApproved: 10/5/2017
ShortDescription:
---
# Create the Website

In this step, you will use the Azure CLI to create a website on Azure.

> Tip! The [Azure CLI extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli) for VS Code provides syntax colorization, IntelliSense (completions) and snippets when writing Azure CLI scripts
>
> <a class="tutorial-install-extension-btn" href="vscode:extension/ms-vscode.azurecli">Install the Azure CLI extension</a>

## Create a Resource Group

A "Resource Group" is essentially a named collection of all our application's resources in Azure. For example, a Resource Group can contain a reference to a website, a database, and an Azure function.

```bash
$ az group create --name myResourceGroup --location westus
```

Here we created a Resource Group called `myResourceGroup` and we are telling Azure to store the Resource Group metadata (the list of resources in the group) in the `westus` data center.

Next, let's tell the Azure CLI to use this newly created Resource Group as the default group in any subsequent commands so we don't have to type it in each time. While we're at it, we'll tell the CLI that we want everything stored in the `westus` data center too.

```bash
$ az configure --defaults group=myResourceGroup location=westus
```

## Create an App Service Plan

An "App Service Plan" defines the physical resources that will be used to host our Website. In this walkthrough, we will use a **Free** hosting plan (`--sku F1`) which means our site will be hosted on a machine alongside other websites. You can scale up and be the only site running on a machine by specifying a different value for `--sku`.

```bash
$ az appservice plan create --name myPlan --sku F1
```

## Create the Website

Now create the website. Make sure to give it a **unique name** as it will be referenced as http://**unique-name**.azurewebsites.net. In this example, we'll call it `myExpressApp-chrisdias`.

```bash
$ az webapp create --name myExpressApp-chrisdias --plan myPlan --runtime "node|6.9"
```


Notice the `--runtime "node|6.9"` parameter at the end of the command. This tells Azure to use node version 6.9.x when running this application. You can also state the desired node version in your `package.json`. During deployment Azure will recognize this and attempt to use that version instead.

For example, the following `package.json` entry will tell Azure this application requires at least node 7.0.0 to run.

``` json
  "engines": {
    "node": ">7.0.0"
    },
```

## Run the Website

Finally, let's ensure the site is up and running.

```bash
$ az webapp browse --name myExpressApp-chrisdias
```

You should see something like this:

![Empty Azure Website](images/nodejs-deployment/emptyazuresite.png)

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/deploy-website">My site is running</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment', 'create-website')" href="javascript:void(0)">I ran into an issue</a>