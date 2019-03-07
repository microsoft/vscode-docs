---
Order: 2
Area: functions
TOCTitle: Create the application
PageTitle: Create the application
MetaDescription: Try Azure Functions for free with Visual Studio Code
DateApproved: 2/9/2018
---
# Create your local Function App

First, create a local Azure Functions application. An Azure Functions app can contain many Functions with various triggers - this tutorial focuses on HTTP triggers, which allow you to handle to incoming HTTP traffic.

In the Activity Bar, click on the Azure logo to show the **AZURE Functions** explorer and click the **Create Project** icon.

![Create Local App](images/functions-extension/create-function-app-project.png)

Choose an empty directory for the app then select JavaScript for the language of your Functions App.

![Select Language](images/functions-extension/create-function-app-project-language.png)

When prompted, choose **Open in current window** and VS Code will reload with your new Functions app in the workspace.

Next, add an HTTP trigger Function to your app.

----

<a class="tutorial-next-btn" href="/tutorials/functions-extension/create-function">I created the Functions App</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azurefunctions', 'create-app')" href="javascript:void(0)">I ran into an issue</a>
