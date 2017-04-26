---
Order: 4
TOCTitle: Create the Website
PageTitle: Create the Website
MetaDescription:
MetaSocialImage:
DateApproved: 4/26/2017
ShortDescription:
---
# Create the Website

In this step, you will use the Azure CLI to create a website on Azure.

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
$ az appservice web create --name myExpressApp-chrisdias --plan myPlan
```

## Run the Website

Finally, let's ensure the site is up and running.

```bash
$ az appservice web browse --name myExpressApp-chrisdias
```

You should see something like this:

![Empty Azure Website](nodejs-deployment_emptyazuresite.png)

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/deploy-website">My site is running</a>