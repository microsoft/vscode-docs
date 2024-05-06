---
Order: 2
Area: csharp
TOCTitle: Get Started
ContentId: cdf9809e-0569-4aaf-937e-e247507d9609
PageTitle: Get started with C# and .NET in Visual Studio Code
DateApproved: 5/3/2024
MetaDescription: Getting Started with C# and .NET Development in Visual Studio Code
---

# Getting Started with C# in VS Code

This getting started guide introduces you to C# and .NET for Visual Studio Code through the following tasks:

1. Installing and setting up your VS Code environment for C#.
1. Writing and running a simple "Hello World" application using C#.
1. Introduce you to other learning resources for C# in VS Code.

Keep in mind, that this guide won't teach you C#. Instead, it teaches you how to get set up for C# development in VS Code. If you're looking for resources to learn C#, check out our C# curriculum.

<a class="install-extension-btn" href="https://aka.ms/selfguidedcsharp">Learn C# Curriculum</a>

## Necessary tools

- [Visual Studio Code](https://code.visualstudio.com)
- [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension
- For .NET Development, the [.NET SDK](https://dotnet.microsoft.com/download)

## Install

### Installing VS Code and extensions

1. If you haven't already done so, [install VS Code](https://code.visualstudio.com).
1. Next, install [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) from the Visual Studio Marketplace. For additional details on installing extensions, read [Extension Marketplace](/docs/editor/extension-marketplace.md). The C# extension is called **C# Dev Kit** and it's published by Microsoft.

>**Note**: C# Dev Kit supports cloud native development. To do cross-platform mobile and desktop development, you can use C# Dev Kit with the [.NET MAUI extension](https://aka.ms/mauidevkit-marketplace). Learn [how to get set up](https://aka.ms/mauidevkit-docs) with .NET MAUI in VS Code.

Upon installation, C# Dev Kit launches an extension walkthrough. You can follow the steps of this walkthrough to learn more about the features of the C# extension. You can also use this walkthrough to install the latest .NET SDK. Reopen the walkthrough at any time by opening the Command Palette (`kb(workbench.action.showCommands)`) and selecting **Welcome: Open Walkthrough**. Here, select **Get Started with C# Dev Kit**.

![C# Dev Kit introductory walkthrough](images/get-started/open-walkthrough.gif)

>**Note**: You are required to sign in to a Visual Studio subscription to use C# Dev Kit. Check out the [Signing in to C# Dev Kit](/docs/csharp/signing-in.md) documentation to learn more.

In the walkthrough, select **Set up your environment** and select **Install .NET SDK**. This will open a window next to the walkthrough with a button to install the latest version of the .NET SDK. Select the **Install** button, which will trigger a download and an install of the .NET SDK. Follow the on-screen instructions to complete this process.

![Install .NET SDK](images/get-started/InstallSDK.png)

## Create a Hello World app

To get started, go to the **Explorer** view and select **Create .NET Project**. Alternatively, you can bring up the Command Palette using `kb(workbench.action.showCommands)` and then type ".NET" and find and select the **.NET: New Project** command.

1. After selecting the command, you'll need to choose the project template. Choose **Console app**.
1. To run your app, select **Run > Run without Debugging** in the upper menu, or use the `kb(workbench.action.run.start)` keyboard shortcut. To learn more about debugging your C# project, read the [debugging documentation](/docs/csharp/debugging.md).

![Use the Command Palette to create a new .NET project](images/get-started/open-new-project.gif)

## Learn more

Explore all the features the C# extension has to offer by looking for **.NET** in the Command Palette. For more information on these features, refer to the other documentation pages.

For learning materials on C# and .NET, check out the following resources:

1. [Learn to program using C#](https://aka.ms/selfguidedcsharp)
1. [Learn to build with .NET in VS Code](https://learn.microsoft.com/training/paths/build-dotnet-applications-csharp/)
1. [Learn to build web applications](https://learn.microsoft.com/training/paths/build-web-apps-with-blazor/)

## Join the community

Find community resources and connect with user groups.

[.NET developer community](https://dotnet.microsoft.com/platform/community) - Meet with like-minded developers
