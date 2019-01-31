---
Order: 4
Area: functions
TOCTitle: Run and test your app locally
PageTitle: Run and test your app locally
MetaDescription: Try Azure Functions for free with Visual Studio Code
DateApproved: 2/9/2018
---
# Run and test your App locally

Upon creating the Function application, the necessary VS Code launch configuration was added to your project. To run the project locally, press `F5`. This will launch and attach to the Azure Functions host - this is the same runtime that runs on Azure so you can be sure that your source code runs the same locally as it does when deployed.

Press `F5` to launch the debugger. Output from the Functions Core tools is displayed in the VS Code Integrate Terminal panel. Once the host has started up, the local URL for your Function is written out. `Ctrl+Click` (`Cmd+Click` on macOS) the URL to open it in your browser.

![Functions Launch](images/functions-extension/functions-vscode-f5.png)

The default HTTP template parses a `name` query parameter to customize the response, add `?name=<yourname>` to the URL in your browser to see the response output correctly.

![Hello Matt](images/functions-extension/functions-test-local-browser.png)

Now that your Function is running locally, make some changes and set a breakpoint to see how Functions works. Learn more about the bindings that are available on [docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings#supported-bindings) and keep in mind that all available bindings will run within the Azure Functions extension. This includes triggers from other services such as Azure Storage as seen below.

![Functions Debugging](images/functions-extension/function-debugging.png)

Next, set up your Azure account and publish the Function App from the extension.

----

<a class="tutorial-next-btn" href="/tutorials/functions-extension/deploy-app">I ran the Function App</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azurefunctions', 'run-app')" href="javascript:void(0)">I ran into an issue</a>
