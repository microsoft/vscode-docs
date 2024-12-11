---
Order: 90
TOCTitle: GitHub Copilot for Azure
PageTitle: Introducing GitHub Copilot for Azure
MetaDescription: Introducing GitHub Copilot for Azure, a chat participant to ask about Azure and help you manage and troubleshoot your Azure resources.
Date: 2024-11-15
Author: Chris Harris
---

# Introducing GitHub Copilot for Azure (preview)

November 15, 2024 by Chris Harris, Product Manager

I'm thrilled to introduce the preview of **GitHub Copilot for Azure** - a new tool that integrates effortlessly with GitHub Copilot Chat in VS Code. Imagine it as your personal guide for navigating the Azure cloud. No more toggling between your IDE and the Azure portal to manage infrastructure or look up commands and arguments. Now, you can concentrate on your core task - coding. Whether you're setting up services or deploying applications, simply prompt `@azure` in the Chat view and manage everything directly within your editor.

You can get started right now by installing [GitHub Copilot for Azure](https://aka.ms/GetGitHubCopilotForAzure) from the Visual Studio Marketplace!

GitHub Copilot for Azure can help with different tasks throughout the lifecycle of building and running your application.

**Update**. If you preview learning by video, check out this great overview from Reynald Adolphe!

[![Video about GitHub Copilot for Azure](https://img.youtube.com/vi/sj9E7WUHbmU/maxresdefault.jpg)](https://youtu.be/sj9E7WUHbmU)

## Learning about Azure

![GIF demonstrating learning about Azure](learn_10-11-2024.gif)

GitHub Copilot for Azure brings in relevant, up-to-date documentation without leaving your editor, instead of searching through multiple sources. Ask questions about Azure OpenAI models, Azure AI Search, or even pricing details for services like Azure SQL. This feature is incredibly useful for developers new to Azure, helping them quickly grasp complex concepts, and it also saves time for seasoned developers who need quick reminders or details on the latest services and features.

**Suggested prompts for learning**

- `@azure Give me a detailed description of Azure AI Search`
- `@azure Which azure services can run my container?`

## Deploying

![GIF showing how to search for and deploy an azd template](deploy-init_10-11-2024.gif)

GitHub Copilot for Azure streamlines the process of deploying your applications by guiding you through tasks such as resource setup and automated deployments. Whether you're developing a RAG (Retrieval-Augmented Generation) app with Python, setting up a CI/CD pipeline, or using the Azure Developer CLI (azd) to deploy your project, it can recommend app templates, appropriate commands, and configurations. There's no need to search for sample applications, look up CLI commands, or figure out YAML syntax. This is particularly useful when you need to quickly launch or dismantle services, saving you time and allowing you to focus on writing excellent code instead of managing infrastructure.


**Suggested prompts for deploying**

- `@azure Can you help me build an RAG chat app with GPT-4o?`
- `@azure List the regions where GPT-4o is available`

## Troubleshooting

![GIF demonstrating how to diagnose an app issue](diagnose-logs_10-11-2024.gif)

When issues arise, GitHub Copilot for Azure makes diagnosing and troubleshooting easier by providing quick insights into your application's performance and resource problems. Whether you're trying to understand why your Kubernetes cluster is slow or identifying the cause of those frustrating 500 errors on your website, `@azure` is there to help. It performs diagnostics, searches logs, and highlights potential issues.

Moreover, it doesn't just help identify problems - it actively assists in resolving them too. Once you've identified the cause of your resource or app issues, it can suggest solutions such as optimizing configurations, scaling resources, or fixing code that's causing those 500 errors. For instance, if your Kubernetes cluster is running slowly, it might recommend adjustments to your deployment settings or resource limits. If you're facing quota exhaustion or performance bottlenecks, it can provide tips on efficient scaling. Essentially, it becomes your go-to tool for both diagnosing and fixing issues.

**Suggested prompts for troubleshooting**


- `@azure Why is my [ReallyImportantWebsite] webapp running slow?`
- `@azure Are there any errors in the logs of my [SuperCoolDemo] Container App?`

## Operating

![GIF demonstrating searching for Azure resources](view-resources_10-11-2024.gif)

![GIF demonstrating how to get cost information](cost-breakdown_10-30-2024.gif)

After troubleshooting, GitHub Copilot for Azure also helps you manage resource operations effectively. Ensuring your resources are utilized properly is essential, and this tool simplifies the process. For instance, you can easily inquire about the number of Azure OpenAI deployments you have or request a list of your storage accounts in a specific data center region and have them sorted by size. Additionally, you can ask for the cost of a specific set of resources.

This immediate access to resource data helps you optimize your setup by identifying over-provisioned resources, rebalancing workloads, or fine-tuning configurations - all without leaving your coding environment. It streamlines the process of managing resources and keeping everything running smoothly, making sure you're not only fixing problems but also preventing new ones from cropping up.

**Suggested prompts for operating**

- `@azure how many web app plans using the free tier do I have deployed grouped by region sorted by highest to lowest?`
- `@azure How do I list all the pods in my AKS cluster?`
- `@azure Breakdown the cost of my [VeryImportantResourceGroup] resource group for October?`

## Slash commands give you more control

GitHub Copilot for Azure tries to identify the intent of your natural language prompt. By using slash commands, you can express your intent more explicitly. And these slash commands are also a useful shorthand notation for common commands.

- `/help` to see what kinds of things it can do
- `/learn` to learn about Azure
- `/resources` for info on your Azure resources
- `/diagnose` to figure out what's wrong with your applications
- `/changeTenant` to choose the Azure tenant you want to use

## Get started now!

GitHub Copilot for Azure is currently in preview, and can be installed from the Visual Studio Marketplace: [Get GitHub Copilot for Azure](https://aka.ms/GetGitHubCopilotForAzure)

## Share your thoughts

We'd love to hear your feedback, whether it's positive or negative! Use the "Thumbs Up" and "Thumbs Down" buttons to share your thoughts, and feel free to open issues in our [GitHub repo](https://aka.ms/GitHubCopilotForAzureRepo). Your input is invaluable to us as we strive to improve and support you on your Azure journey.

