---
Order: 1
Area: azure
TOCTitle: Extensions
PageTitle: Visual Studio Code Azure Extensions
ContentId: d2e93075-4cfe-48f4-b05e-f985c86d9713
MetaDescription: Visual Studio Code Azure Extensions
DateApproved: 02/1/2024
---
# Azure Extensions

You can use Azure directly from Visual Studio Code through a range of extensions. The [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension pack contains various extensions designed to deploy your application to Azure within minutes.

![app service](images/extensions/azure-tools.png)

## Which extension should I use?

The table below describes the various extensions available in the Azure Tools extension pack for VS Code and highlights common use cases.

|Type of Developer|Description|When to use|
|----------------------|---------------------|-------------|
|Fullstack developer|Developers who work on both frontend and backend aspects of apps.|**Azure Container Apps:** Create or manage containerized apps that handle various parts of their stack.</br> **Azure Functions:** Create serverless functions to handle backend tasks and integrate with frontend apps.</br> **Azure App Service:** Deploy complete web solutions, including dynamic backend services, APIs, and server-side logic.|
|Backend developer|Developers building microservices architectures and leveraging containers to encapsulate/manage individual microservices.|**Azure Container Apps:** Server-side logic, APIs, and microservices</br> **Azure Functions:** Server-side logic and APIs</br> **Azure Container Apps:** Deploying and managing containerized backend services</br> **Azure Functions:** Build scalable, event-driven backend services without managing infrastructure</br> **Azure App Service:** Deploy RESTful APIs, microservices or other backend components|
|DevOps Engineer|Engineers responsible for setting up or maintaining CI/CD pipelines and managing cloud infrastructure.|**Azure Container Apps:** Automate the deployment/scaling of containerized applications</br> **Azure Functions:** Automate the deployment of serverless functions and integrate them into a broader DevOps workflow</br> **Azure App Service:** Integrate code repositories with automated deployment processes and monitor application performance and logs</br> **Azure Static Web Apps:** Automate the deployment process and ensure seamless integration with GitHub Actions or Azure DevOps|
|Frontend developer|Developers who specialize in building user interfaces using frameworks and libraries like React, Angular, Vue.js, or plain HTML/CSS/JavaScript.|**Azure Static Web Apps**, **Azure App Service**, **Azure Storage**, **Azure Functions:** A streamline workflow to develop, preview, and deploy static websites and single-page apps|
|Enterprise Developer|Developers working on large-scale apps, services for businesses, and building Software as a Service (SaaS) apps.|**Azure Container Apps**, **Azure Functions**, **Azure App Service:** Deployment, scaling, and monitoring capabilities for mission-critical apps</br> Using containers to create scalable, multi-tenant services and automate various backend processes|
|API developer|Creates and manages APIs for various clients and apps|**Azure Functions** or **Azure Container Apps:** Develop and deploy serverless APIs</br> **Azure Storage:** API data storage needs (blobs, queues, tables, and files, upload and download data)|
|Data engineer|Processes and analyzes data streams|**Azure Container Apps:** Deploy data processing and machine learning models in containers, Scalable and reproducible environments for their data-driven apps</br> **Azure Functions:** Trigger data processing workflows, handle ETL tasks, and respond to data changes in real-time|

## Visual Studio Code Marketplace

There are many VS Code extensions on the [Marketplace](https://marketplace.visualstudio.com/search?term=azure&target=VSCode&category=All%20categories&sortBy=Relevance) that make it easy to build and host applications on Azure.

<div class="marketplace-extensions-azure-curated"></div>

> **Tip:** Click on an extension tile above to read the description and reviews in the Marketplace.

## Searching for extensions

You can also search for Azure or cloud extensions in the VS Code Extensions view (`kb(workbench.view.extensions)`) and type 'azure'.

![popular Azure extensions](images/extensions/popular-azure-extensions.png)

## Next steps

* [Azure Tools FAQ](/docs/azure/gettingstarted.md) - Learn how to get started quickly.
