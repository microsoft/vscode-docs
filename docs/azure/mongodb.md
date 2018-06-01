---
Order:
Area: azure
TOCTitle: MongoDB
PageTitle: Working with MongoDB in Visual Studio Code
ContentId: d1187f99-354f-4798-9c19-e432e4ae8572
MetaDescription: Working with MongoDB in Visual Studio Code
DateApproved: 5/3/2018
---
# Working with MongoDB

Visual Studio Code has great support for working with [MongoDB](https://www.mongodb.com/what-is-mongodb) databases. Through the [Azure CosmosDB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) extension, you can create, manage and query MongoDB databases.

## Install the Cosmos DB extension

MongoDB support for VS Code is provided by the [Azure Cosmos DB](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb) extension. To install the Cosmos DB extension, open the Extensions view by pressing `kb(workbench.view.extensions)` and search for 'cosmos' to filter the results. Select the Microsoft **Azure Cosmos DB** extension.

![Select Cosmos DB extension](images/mongodb/install-cosmosdb-extension.png)

## Azure view

Once you've installed the Cosmos DB extension and reloaded VS Code, you'll notice there is a new **Azure** Activity Bar view. Click on the Azure view and you'll see the Cosmos DB Explorer.

![cosmos db explorer](images/mongodb/cosmosdb-explorer.png)

### Connect to MongoDB

To connect to a MongoDB database, expand the **Attached Database Accounts** and click **Attach Database Account..**, and choose the **MongoDB** from the Database Account API dropdown.

![attach database account dropdown](images/mongodb/attach-database-account.png)

Enter a connection string to the database, the default is your local MongoDB server at `mongodb://127.0.0.1:27017`. You can enter any connection string, to local or remote MongoDB servers.

Once attached, you can work with the MongoDB server, managing Databases, Collections and Documents.

![attached MongoDB database](images/mongodb/attached-mongodb-database.png)

You can **Open Collection** to see the raw JSON Collection or click on individual Documents to see just their JSON.

![open mongodb document](images/mongodb/open-document.png)

## Commands

There are MongoDB specific commands available in the VS Code **Command Palette** (`kb(workbench.action.showCommands )`) as well as through Explorer context menus.

![mongodb commands](images/mongodb/mongodb-commands.png)

## Using Scrapbooks

One of the most powerful features of the VS Code MongoDB integration is **Mongo Scrapbooks**.

## MongoDB on Azure Cosmos DB

Includes the Azure Account extension, **Sign in to Azure...**, **Create a Free Azure Account...***

To learn more about MongoDB databases on Azure, see [Introduction  to Azure Cosmos DB: MongoDB API](https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-introduction).

## Next Steps

* [Azure Extensions](/docs/azure/extensions.md) - The VS Code Marketplace has hundreds of extensions for Azure and the cloud.
* [Deploying to Azure](/docs/azure/deployment.md) - Learn step-by-step how to deploy your application to Azure.
* [Working with Docker](/docs/azure/docker.md) - Put your application in a Docker container for easy reuse and deployment.