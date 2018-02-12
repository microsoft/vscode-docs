---
Order: 4
Area: functions
TOCTitle: Run your app locally
PageTitle: Run your app locally
MetaDescription: Node.js Deployment to Azure Functions with Visual Studio Code
DateApproved: 12/18/2017
---
# Run your App locally

Upon creating the Function application, the necessary VS Code launch configuration was added to your project. To run the project locally, press `F5`. This will launch and attach to the Azure Functions host - this is the same runtime that runs on Azure so you can be sure that your source code runs the same locally as it does when deployed.

Press `F5` to launch the debugger. Output from the Functions Core tools is displayed in the VS Code Integrate Terminal panel. Once the host has started up, the local URL for your Function is written out. `Super+Click` the URL to open it in your browser.

![Functions Launch](images/functions-extension/functions-vscode-f5.png)

The default HTTP template parses a `name` query parameter to customize the response, add `?name=<yourname>` to the URL in your browser to see the response output correctly.

> **TIP:** You can also set and hit breakpoints when running locally to test any changes.

![Hello Matt](images/functions-extension/functions-test-local-browser.png)

After verifying that the app runs locally, it's time to publish it to Azure Functions.

----

<a class="tutorial-next-btn" href="/tutorials/functions-extension/deploy-app">I created the Functions App</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azurefunctions', 'run-app')" href="javascript:void(0)">I ran into an issue</a>
