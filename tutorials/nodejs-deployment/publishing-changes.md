---
Order: 7
TOCTitle: Publish Changes
PageTitle: Publish Changes
MetaDescription: 
MetaSocialImage: 
Date: 
ShortDescription: 
Author: 
---

# Publish Changes to your Application

In this step you will make changes to your application, commit them to the local Git repository, and then redeploy your site by pushing to Azure.

## Edit Your Application

Open the `myExpressApp` folder in Visual Studio Code (or your favorite text editor).

![Open VS Code](nodejs-deployment_openvscode.png)

Open `views/index.pug` and change line `5` to say somethign fun such as `VS Code Rocks!!` and then save the file (Ctrl+S).

![Edit pug file](nodejs-deployment_editpugfile.png)

> Pro Tip: Turn on "AutoSave" from the `File | AutoSave` menu!

## Commit Changes

Open the Source Code Control viewlet (Shift+Ctrl+G), enter a commit message, and press `Cmd+Enter` to commit the change. 

![Commit Changes](nodejs-deployment_commitchanges.png)

## Publish Changes to Website

Click on the Source Code Control overflow menu (`...`) and choose `Publish`.  

![Publish Menu](nodejs-deployment_publishmenu.png)

You will be prompted for a Remote to publish to, choose `Azure`.

![Choose Azure](nodejs-deployment_chooseazure.png)

Your changes will then be deployed to the Website. Refresh your application and you should see the changes.

![Published Changes](nodejs-deployment_vscoderocks.png)

---- 

<a class="tutorial-next-btn" href="/docs">I'm Done!</a>