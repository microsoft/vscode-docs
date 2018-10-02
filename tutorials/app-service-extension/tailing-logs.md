---
Order: 4
Area: appservicetools
TOCTitle: Viewing logs
PageTitle: Viewing the application logs
MetaDescription: Node.js Deployment to Azure App Services with Visual Studio Code
DateApproved: 12/18/2017
---
# Viewing Logs

In this step, you learn how to view (or "tail") the logs from the running website. Any calls to `console.log` in the site are displayed in the output window in Visual Studio Code.

Find the app in the **AZURE APP SERVICE** explorer, right-click the app, and choose **View Streaming Logs**.

When prompted, choose to enable logging and restart the application. Once the app is restarted, the VS Code output window opens with a connection to the log stream.

![View Streaming Logs](images/app-service-extension/view-logs.png)

![Enable Logging and Restart](images/app-service-extension/enable-restart.png)

After a few seconds, you will see a message indicating that you are connected to the log-streaming service.

```bash
Connecting to log-streaming service...
2017-12-21 17:33:51.428 INFO  - Container practical-mustache_2 for site practical-mustache initialized successfully.
2017-12-21 17:33:56.500 INFO  - Container logs
```

Refresh the page a few times in the browser to see log output.

```bash
2017-12-21 17:35:17.774 INFO  - Container logs
2017-12-21T17:35:14.955412230Z GET / 304 141.798 ms - -
2017-12-21T17:35:15.248930479Z GET /stylesheets/style.css 304 3.180 ms - -
2017-12-21T17:35:15.378623115Z GET /favicon.ico 404 53.839 ms - 995
```

## Congratulations!

Congratulations, you've successfully completed this walkthrough!

## Other Azure extensions

Next, check out the other Azure extensions.

* [Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb)
* [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
* [Docker Tools](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker)
* [Azure CLI Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli)
* [Azure Resource Manager (ARM) Tools](https://marketplace.visualstudio.com/items?itemName=msazurermtools.azurerm-vscode-tools)

Or get them all by installing the
[Node Pack for Azure](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension pack.

## Learn more at docs.microsoft.com

The [Azure for Node.js](https://docs.microsoft.com/en-us/nodejs/azure/?view=azure-node-2.0.0) developer center on [docs.microsoft.com](https://docs.microsoft.com) has a number of great articles on how to build and deploy Node.js based functions and applications to Azure.

----

<a class="tutorial-next-btn" href="/docs">I'm Done!</a> <a class="tutorial-feedback-btn" onclick="reportIssue('node-deployment-azureappservice', 'tailing-logs')" href="javascript:void(0)">I ran into an issue</a>