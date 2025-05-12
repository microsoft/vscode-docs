---
Order: 5
Area: azure
TOCTitle: VS Code for the Web
PageTitle: Develop and Deploy to Azure in VS Code for the Web
ContentId:
MetaDescription: VS Code for the Web
DateApproved: 05/12/2025
---
# Overview

VS Code for the Web is a zero-install and browser-based version of Visual Studio Code. The /azure environment—accessible via <https://insiders.vscode.dev/azure—is> a dedicated space for Azure development, allowing you to run, debug, and deploy applications to Azure in seconds.

Powered by [Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview), this vsenvironment offers up to **4 hours of compute time**, eliminating the need to manually configure dev environments or install dependencies. /azure comes preloaded with the latest libraries, extensions, and tools to get you coding instantly.

[Announcing VS Code for the Web](https://www.youtube.com/watch?v=qmJigVn8gcg&themeRefresh=1)

## Getting Started

The /azure environment includes everything you need to start developing and deploying Azure applications:

**Pre-installed Extensions**
[Azure Developer CLI](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.azure-dev) - This extension makes it easier to run, create Azure Resources, and deploy Azure applications with the Azure Developer CLI.

**Supported Programming Languages**

All major runtimes are pre-installed:
*Python - 3.12.9
*Java - openjdk 17.0.14 2025-01-21 LTS
    *OpenJDK Runtime Environment Microsoft-10800290 (build 17.0.14+7-LTS)
    *OpenJDK 64-Bit Server VM Microsoft-10800290 (build 17.0.14+7-LTS, mixed mode, sharing)
*Node.js - v20.14.0
*C# - 9.0.0

**GitHub Repos**
Seamlessly commit your changes directly to your GitHub repository using the [GitHub Repository Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub).  GitHub Repositories allows you to remotely browse and edit a repository from within the editor, without needing to pull code onto your local machine. You can learn more about the extension and how it works in our [GitHub Repositories guide](https://code.visualstudio.com/docs/sourcecontrol/github#_github-repositories-extension).

**Continue Working in VS Code Desktop**
After the Azure Cloudshell container time is up, you may want to continue your work in VS Code Desktop. Use the Continue Working on button, located in the status bar of VS Code for the Web, to commit your code to a chosen repository in GitHub, and move over to your local environment.

Within this experience, you have two options for local continuation:
***Using Docker**: Launch a pre-configured development container.
***Using VS Code Locally**: Clone the repo and configure your environment using a README.

**Azure Entry Points**
The /azure experience integrates with Azure AI Foundry to bring code closer to developers. Buttons like **“Open in VS Code for the Web”** are available directly within environments like the **Chat Playground** and **Agent Playground**.

To get started:
1.Choose a model.
2.Build and test your agent.
3.Click View Code, select your programming language and SDK.
4.Launch directly into VS Code for the Web with one click.

## 🔧 Limitations

Helps manage expectations. Clarify what doesn’t work in the web environment compared to the desktop version.
You could include:
*No terminal access beyond Cloud Shell
*Limited support for some native extensions or language features
*No offline support
*Limited Docker support directly in-browser

## 💡 Tips and Best Practices

Give developers a head start with pro tips.
*Use GitHub authentication for syncing extensions/settings.
*Use the "Continue Working Locally" option for advanced debugging.
*Bookmark /azure for quick dev sessions.

## 🧪 Sample Use Cases or Scenarios

Show how the /azure environment can be used in real dev workflows.

Examples:
*Spinning up a quick Azure Function app
*Building and testing an AI agent using the Azure AI Toolkit
*Rapid prototyping with VS Code extensions and Python

## 🛠️ Troubleshooting

Devs love a self-service way out of issues.

Include things like:
*Can't authenticate to GitHub?
*Extensions not loading?
*Code not persisting?

Point to logs or GitHub discussions when applicable.

## 🚀 Next Steps / Related Resources

Keep them learning and exploring.

*Azure Developer CLI documentation
*[GitHub Copilot](https://github.com/features/copilot)
*[Azure AI Studio](https://ai.azure.com/)
*[VS Code Dev Containers](https://containers.dev/)