---
Order: 2
Area: functions
TOCTitle: Create the application
PageTitle: Create the application
MetaDescription: Node.js Deployment to Azure Functions with Visual Studio Code
DateApproved: 2/9/2018
---
# Create your local Function App

First, create a local Azure Functions application. An Azure Functions app can contain many Functions with various triggers - this tutorial focuses on HTTP triggers, which allow you to handle to incoming HTTP traffic.

In VS Code, expand the **AZURE FUNCTIONS** explorer and click the **Create Project** icon.

![Create Local App](images/functions-extension/create-function-app-project.png)

Choose an empty directory for the app then select JavaScript for the language of your Functions App.

![Select Language](images/functions-extension/create-function-app-project-language.png)

VS Code will reload and your new local Functions app will be loaded into your workspace.

Next, add an HTTP trigger Function to your app.

----

<a class="tutorial-next-btn" href="/tutorials/functions-extension/create-function">I created the Functions App</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azurefunctions', 'create-app')" href="javascript:void(0)">I ran into an issue</a>
