---
Order: 6
TOCTitle: Publish Changes
PageTitle: Publish Changes
MetaDescription:
MetaSocialImage:
DateApproved: 10/5/2017
ShortDescription:
---
# Publish Changes to your Application

In this step, you will make changes to your application, commit them to the local Git repository, and then redeploy your site by pushing to Azure.

## Edit Your Application

Open the `myExpressApp` folder in Visual Studio Code.

![Open VS Code](images/nodejs-deployment/openvscode.png)

Open `views/index.pug` and change line 5 to say something fun such as 'VS Code Rocks!!' and then save the file (`kb(workbench.action.files.save)`).

![Edit pug file](images/nodejs-deployment/editpugfile.png)

> Pro Tip: Turn on "AutoSave" from the **File** > **AutoSave** menu!

## Commit Changes

Open the **Source Control** view (`kb(workbench.view.scm)`), enter a commit message, and press `kbstyle(Ctrl+Enter)` to commit the change (`kbstyle(Cmd+Enter)` on macOS).

![Commit Changes](images/nodejs-deployment/commitchanges.png)

## Publish Changes to Website

Click on the **Source Control** overflow menu (**...**) and choose **Publish**.

![Publish Menu](images/nodejs-deployment/publishmenu.png)

You will be prompted for a Remote to publish to, choose `Azure`.

![Choose Azure](images/nodejs-deployment/chooseazure.png)

Your changes will then be deployed to the Website. Refresh your application and you should see the changes.

![Published Changes](images/nodejs-deployment/vscoderocks.png)

----

<a class="tutorial-next-btn" href="/tutorials/nodejs-deployment/extensions">I can see my changes!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment', 'publishing-changes')" href="javascript:void(0)">I ran into an issue</a>