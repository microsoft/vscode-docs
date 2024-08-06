---
Order: 2
Area: azure
TOCTitle: Extensions
PageTitle: Visual Studio Code Azure Extensions
ContentId: d2e93075-4cfe-48f4-b05e-f985c86d9713
MetaDescription: Visual Studio Code Azure Extensions
DateApproved: 02/1/2024
---
# Which extension should I use?

The following table describes the different extensions found in the Azure Toolkit for VS Code and provides common scenarios.

|Type of Developer|Description|VS Code extensions|When to use|
|----------------------|---------------------|-------------|-------------|
|Fullstack developer|Developers who work on both frontend and backend aspects of apps.|Static Web Apps, Azure Functions, Storage, App Service, Azure Container Apps|Azure Container Apps: Create or manage containerized apps that handle various parts of their stack.</br> Azure Functions: Create serverless functions to handle backend tasks and integrate with frontend apps.</br> App Service: Deploy complete web solutions, including dynamic backend services, APIs, and server-side logic.|
|Backend developer|Developers building microservices architectures and leveraging containers to encapsulate/manage individual microservices.|Azure Container Apps, App Service, Azure Functions|Azure Container Apps: Server-side logic, APIs, and microservices</br>Azure Functions: Server-side logic and APIs</br> Azure Container Apps: Deploying and managing containerized backend services</br> Azure Functions: Build scalable, event-driven backend services without managing infrastructure</br> App Service: Deploy RESTful APIs, microservices or other backend components|
|DevOps Engineer|Engineers responsible for setting up or maintaining CI/CD pipelines and managing cloud infrastructure.| Azure Container Apps, Static Web Apps, App Service, Azure Functionsgit sta|Azure Container Apps: Automate the deployment/scaling of containerized applications</br> Azure Functions: Automate the deployment of serverless functions and integrate them into a broader DevOps workflow</br> App Service: Integrate code repositories with automated deployment processes and monitor application performance and logs</br> Static Web Apps: Automate the deployment process and ensure seamless integration with GitHub Actions or Azure DevOps|