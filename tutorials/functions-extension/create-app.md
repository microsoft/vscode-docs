---
Order: 2
Area: functions
TOCTitle: Create the application
PageTitle: Create the application
MetaDescription: Node.js Deployment to Azure Functions with Visual Studio Code
DateApproved: 12/18/2017
---
# Create your local Function App

First, create a local Azure Functions app. An Azure Functions app can contain many Functions with various triggers - this tutorial focuses on HTTP triggers, which allow you to handle to incoming HTTP traffic.

In VS Code, expand the **AZURE FUNCTIONS** explorer and click the create project icon.

![Create Local App](images/functions-extension/create-function-app-project.png)

Choose an empty directory for the app then select JavaScript for the language of your Functions App.

![Select Language](images/functions-extension/create-function-app-project-language.png)

VS Code will reload and your new local Functions app will be loaded into your workspace.

## Create a new Function

Next, create a Function that handles HTTP requests.

From the **AZURE FUNCTIONS** explorer, click the **Create Function** icon.

![Create Function](images/functions-extension/create-function.png)

Select the directory you currently have open - it's the default option so simply hit enter. When prompted, choose HTTP trigger, use the default name of `HttpTriggerJS`, and choose anonymous authentication, .

![Choose Template](images/functions-extension/create-function-choose-template.png)

![Choose Authentication](images/functions-extension/create-function-anonymous-auth.png)

Upon completion, a new directory is created within your Function app named `HttpTriggerJS` that includes an `index.js` file. This file contains the code that responds to the HTTP request.

![Completed Project](images/functions-extension/functions-vscode-intro.png)

## Run the application

Upon creating the Function App, the necessary VS Code launch configuration was added to your project. To run the project locally, simply hit `F5`. This will launch and attach to the Azure Functions host - this is the same runtime that runs on Azure so you can be sure that your code runs the same locally as it does when deployed.

Hit `F5` to launch the debugger. Output from the Functions Core tools is displayed in the VS Code terminal window. Once the host has started up, the local URL for your Function is written out. `Super+Click` the URL to open it in your browser.

![Functions Launch](images/functions-extension/functions-vscode-f5.png)

The default HTTP template parses a `name` query parameter to customize the response, add `?name=<yourname>` to the URL in your browser to see the response output correctly.

![Hello Matt](images/functions-extension/functions-test-local-browser.png)

After verifying that the app runs locally, it's time to publish it to Azure Functions.

----

<a class="tutorial-next-btn" href="/tutorials/functions-extension/deploy-app">I created the Functions App</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azurefunctions', 'create-app')" href="javascript:void(0)">I ran into an issue</a>
