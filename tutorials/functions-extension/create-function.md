---
Order: 3
Area: functions
TOCTitle: Create a Function
PageTitle: Create a Function
MetaDescription: Node.js Deployment to Azure Functions with Visual Studio Code
DateApproved: 12/18/2017
---
# Add a Function to your App

Next, create a Function that handles HTTP requests.

From the **AZURE FUNCTIONS** explorer, click the **Create Function** icon.

![Create Function](images/functions-extension/create-function.png)

Select the directory you currently have open - it's the default option so press `Enter`. When prompted, choose HTTP trigger, use the default name of `HttpTriggerJS`, and choose **Anonymous** authentication.

![Choose Template](images/functions-extension/create-function-choose-template.png)

![Choose Authentication](images/functions-extension/create-function-anonymous-auth.png)

Upon completion, a new directory is created within your Function app named `HttpTriggerJS` that includes `index.js`and `functions.json` files. The `index.js` file contains the source code that responds to the HTTP request and `functions.json` contains the [binding configuration](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings) for the HTTP trigger.

![Completed Project](images/functions-extension/functions-vscode-intro.png)

Next, run your app locally to verify everything is working.

---

<a class="tutorial-next-btn" href="/tutorials/functions-extension/run-app">I created the Functions App</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azurefunctions', 'create-function')" href="javascript:void(0)">I ran into an issue</a>

