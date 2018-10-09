---
Order: 3
Area: nodejsdeploymentui
TOCTitle: Create the website
PageTitle: Create the website
MetaDescription:
MetaSocialImage:
DateApproved: 10/5/2017
ShortDescription:
---
# Create the Website

In this step, you will use the Azure Web Portal to create a website on Azure.

## Create the website

To create a website click on the `+ Add Resource` button in the left navigation panel.

Next select `Web App` from the menu.

![Select Web App](images/nodejs-deployment-ui/selectwebapp.png)

You will need to complete the mandatory fields.

### App name

Make sure to give it a **unique name** as it will be referenced as http://**unique-name**.azurewebsites.net. In this example, we'll call it `myExpressApp-dougmcdonald`.

### Subscription

Select your subscription from the dropdown menu.

### Resource group

This will default to the same name as your `App name`, to distinguish the resources we will change this to `myResourceGroup`.

### OS

Leave this as the default `Windows`.

### Publish

Leave this as the default `Code`.

### App service plan / location

An **App Service Plan** defines the physical resources that will be used to host our website. In this walkthrough, we will use a **Free** hosting plan which means our site will be hosted on a machine alongside other websites.

Click on `App service plan` and select `+ Create new`.

Enter an `App Service Plan` name of `myPlan` and select a location which is close to you e.g. `UK West`.

Click the pricing tier field so that we change to the free tier, this will open a new panel. Choose the `Dev / Test` option from the top navigation and select `F1` (the free tier) and click `Apply` to confirm.

![Select Free Tier](images/nodejs-deployment-ui/selectfreetier.png)

Your app service plan should look like the image below.

![App service plan](images/nodejs-deployment-ui/newappserviceplan.png)

Click on `OK` to accept the App service plan you have created. Your web app fields should look like this.

![Complete form fields](images/nodejs-deployment-ui/completedwebapp.png)

Finally, click on `Create` to create your web app.

## Run the website

Finally, let's ensure the site is up and running.

Load the following url in your web browser http://myexpressapp-dougmcdonald.azurewebsites.net/ replacing `myexpressapp-dougmcdonald` with the name of your web app.

You should see something like this:

![Empty Azure Website](images/nodejs-deployment-ui/websiterunning.png)

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment-ui/deploy-website">My site is running</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-ui', 'create-website')" href="javascript:void(0)">I ran into an issue</a>
