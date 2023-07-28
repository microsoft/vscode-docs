---
Order: 1
Area: csharp
TOCTitle: Get Started
ContentId: cdf9809e-0569-4aaf-937e-e247507d9609
PageTitle: Get started with C# and .NET in Visual Studio Code
DateApproved: 7/11/2023
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

Upon installation, C# Dev Kit launches an extension walkthrough. You can follow the steps of this walkthrough to learn more about the features of the C# extension. Reopen the walkthrough at any time by opening the Command Palette (`kb(workbench.action.showCommands)`) and selecting **Welcome: Open Walkthrough**. Here, select **Get Started with C# Dev Kit**.

![C# Dev Kit introductory walkthrough](images/get-started/open-walkthrough.gif)

>**Note**: You are required to sign in to a Visual Studio subscription to use C# Dev Kit. Check out the [Signing in to C# Dev Kit](/docs/csharp/signing-in.md) documentation to learn more.

### Installing the .NET Coding Pack for students

If you're a student, we recommend installing the **.NET Coding Pack** for an easier setup experience. The Coding Pack includes VS Code, the .NET SDK, and essential .NET extensions. The Coding Pack can be used as a clean installation, or to update or repair an existing development environment.

<a class="install-extension-btn" onclick="pushCodingPackEvent('dotnet', 'win')" href="https://aka.ms/dotnet-coding-pack-win">Install the .NET Coding Pack - Windows</a>

<a class="install-extension-btn" onclick="pushCodingPackEvent('dotnet', 'mac')" href="https://aka.ms/dotnet-coding-pack-mac">Install the .NET Coding Pack - macOS</a><br>

>**Note**: The .NET Coding Pack is only available for Windows and macOS. For other operating systems, you need to manually install the .NET SDK, VS Code, and .NET extensions.

## Open folder

By starting VS Code in a folder, that folder becomes your "workspace". VS Code stores [settings](/docs/getstarted/settings.md) that are specific to that workspace in `.vscode/settings.json`, which are separate from user settings that are stored globally.

Using a terminal, create an empty folder called "hello", navigate into it, and open VS Code (code) in that folder (.) by entering the following commands:

```bash
mkdir hello
cd hello
code .
```

Alternatively, you can run VS Code through the operating system UI, then use **File** > **Open Folder** to open the project folder.

## Create a Hello World app

First, ensure you are within the new folder (workspace) that you created. From here, you can create the project in two ways.

### Use the Command Palette

1. Bring up the Command Palette using `kb(workbench.action.showCommands)` and then type ".NET".
1. Find and select the **.NET: New Project** command.
1. After selecting the command, you'll need to choose the project template. Choose **Console app**.
1. To run your app, select **Run > Start Debugging** in the upper menu, or use the `kb(workbench.action.debug.start)` keyboard shortcut. To learn more about debugging your C# project, read the [debugging documentation](/docs/csharp/debugging.md).

![Use the Command Palette to create a new .NET project](images/get-started/open-new-project.gif)

### Use the terminal

1. Open a terminal/command prompt and navigate to the folder in which you'd like to create the app. Enter the following command in the command shell:

    ```csharp
    dotnet new console
    ```

1. When the project folder is first opened in VS Code:

    A "Required assets to build and debug are missing. Add them?" notification appears at the bottom right of the window.

    Select **Yes**.

1. Run the app by entering the following command in the command shell:

    ```csharp
    dotnet run
    ```

## Learn more

Explore all the features the C# extension has to offer by looking for **.NET** in the Command Palette. For more information on these features, refer to the other documentation pages.

For learning materials on C# and .NET, check out the following resources:

1. [Learn to program using C#](https://aka.ms/selfguidedcsharp)
1. [Learn to build with .NET in VS Code](https://learn.microsoft.com/training/paths/build-dotnet-applications-csharp/)
1. [Learn to build web applications](https://learn.microsoft.com/training/paths/build-web-apps-with-blazor/)

## Join the community

Find community resources and connect with user groups.

[.NET developer community](https://dotnet.microsoft.com/platform/community) - Meet with like-minded developers
