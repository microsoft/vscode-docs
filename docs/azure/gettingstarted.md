---
title: Getting Started with Azure Tools for Visual Studio Code
description: Learn to install, configure, and use Azure Tools for Visual Studio Code to manage cloud resources and deploy applications.
lastUpdated: 2024-10-31
---

# Getting Started with Azure Tools for Visual Studio Code

This guide walks you through setting up Azure Tools for VS Code so you can manage cloud resources, deploy web apps, and debug directly from your editor. The [Azure Tools extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) enables developers to access Azure's cloud services within Visual Studio Code.

![Azure Tools Explorer View](./images/extensions/explorer.png)

## 🚀 Quick Start

### Prerequisites
- [Visual Studio Code](https://code.visualstudio.com/) installed
- An active [Azure account](https://azure.microsoft.com/free/)
- Basic familiarity with VS Code interface

### Step 1: Install Azure Tools
1. Open VS Code
2. Go to Extensions view (`Ctrl+Shift+X`)
3. Search for "Azure Tools"
4. Install the **Azure Tools extension pack** from Microsoft

### Step 2: Sign in to Azure
1. Click the Azure icon in the Activity Bar (sidebar)
2. Click "Sign in to Azure..."
3. Follow the authentication process in your browser
4. Return to VS Code - you should see your Azure resources

### Step 3: Explore Azure Resources
- View all your Azure resources in the Azure Resources panel
- Create new resources using the `+` button
- Manage existing resources with right-click context menus

## 🔧 Core Features

### Azure Resources View
Select the Azure icon in the Activity Bar to access:
- **Subscriptions**: Manage your Azure subscriptions
- **Resource Groups**: Organize related resources
- **Services**: Access Azure services like App Service, Storage, Databases

![Azure Icon](./images/extensions/azure-icon.png)

### Command Palette Integration
Press `Ctrl+Shift+P` and type "Azure" to access all Azure commands:
- `Azure: Open Cloud Shell`
- `Azure: Create Resource`
- `Azure: Sign In`
- `Azure: Sign Out`

![Command Palette](./images/extensions/command-palette.png)

## 💻 Development Workflow

### Open Your Project
1. Use **File > Open Folder** to open your project
2. Ensure your code is in a proper workspace structure
3. The Azure Tools will automatically detect supported project types

### Create Azure Resources
1. Right-click in the Azure Resources view
2. Select "Create Resource"
3. Choose from available Azure services
4. Follow the guided creation process

### Deploy Applications
1. Right-click your application folder
2. Select "Deploy to Web App"
3. Choose target Azure Web App
4. Monitor deployment progress in Output panel

## 🐛 Troubleshooting

### Common Issues & Solutions

**"Can't sign in to Azure"**
- Check internet connection
- Verify Azure account is active
- Try signing out and back in
- Clear browser cache for authentication

**"Azure resources not loading"**
- Check subscription status in Azure portal
- Verify proper permissions
- Reload VS Code window (`Ctrl+Shift+P` > "Developer: Reload Window")

**"Extensions not working"**
- Check all Azure extensions are enabled
- View extension status in Extensions panel
- Check Output panel for error messages

### Accessing Logs
- **Output Panel**: `Ctrl+Shift+U` to view extension logs
- **Activity Log**: View recent operations and their status
- **Developer Tools**: `Help > Toggle Developer Tools` for detailed debugging

## 🛠️ Advanced Configuration

### Keyboard Shortcuts
Customize your workflow with these shortcuts:
- `Ctrl+Shift+P`: Open Command Palette
- `Ctrl+Shift+U`: Show Output panel
- `Ctrl+Shift+Y`: Open Azure Cloud Shell

### Settings Customization
Access Settings (`Ctrl+,`) and search "azure" to configure:
- Default subscription
- Resource grouping preferences
- Deployment settings

## 📚 Next Steps

- [**Deployment Guide**](./deployment.md) - Learn to deploy apps to Azure
- [**Containers**](./containers.md) - Work with Azure Container Instances
- [**Kubernetes**](./kubernetes.md) - Manage AKS clusters
- [**Debugging**](./remote-debugging.md) - Remote debug Azure applications

## 💡 Pro Tips

- Use **Multi-root workspaces** for complex projects with multiple services
- **Pin frequently used resources** for quick access
- **Use Cloud Shell** for quick Azure CLI operations
- **Monitor deployment logs** in real-time during publishing

## 🤝 Contributing

Contributions to improve this guide are welcome!  
Please open a pull request or issue in the [vscode-docs repository](https://github.com/microsoft/vscode-docs).

---

**Happy coding with Azure Tools!** 🎉

*© 2024 Microsoft Corporation. All rights reserved.*