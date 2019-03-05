---
Order: 2
Area: other
TOCTitle: .NET Core
ContentId: AFFD7BDB-925E-4D02-828D-4E14360C70DA
PageTitle: .NET Core and Visual Studio Code
DateApproved: 10/8/2018
MetaDescription: Get started writing and debugging .NET Core apps with Visual Studio Code.
MetaTags:
- .NET Core
- ASP.NET Core
- C#
---
# Using .NET Core in Visual Studio Code

[.NET Core](https://docs.microsoft.com/dotnet/articles/welcome) provides a fast and modular platform for creating server apps that run on Windows, Linux, and macOS. Use Visual Studio Code with the C# extension to get a powerful editing experience with [C# IntelliSense](https://docs.microsoft.com/visualstudio/ide/visual-csharp-intellisense) (smart code completion) and debugging.

## Prerequisites

Install the following:

- [.NET Core](https://dotnet.microsoft.com/download).
- The [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) from the VS Code Marketplace.

## Create a "Hello World" app

1. Initialize a C# project:

   * Open a terminal and navigate to the folder in which you'd like to create the app.
   * Enter the following command in the command shell:

   ```console
     dotnet new console
   ```

2. When the project folder is first opened in VS Code:

   * A "Would you like to add the required assets to build and debug your project?" notification appears at the top of the window.
   * Select **Yes**.

3. Run the app by entering the following command in the command shell:

   ```console
    dotnet run
   ```

Watch a video tutorial for further setup help on [Windows](https://channel9.msdn.com/Blogs/dotnet/Get-started-VSCode-Csharp-NET-Core-Windows), [macOS](https://channel9.msdn.com/Blogs/dotnet/Get-started-VSCode-NET-Core-Mac), or [Linux](https://channel9.msdn.com/Blogs/dotnet/Get-started-with-VS-Code-Csharp-dotnet-Core-Ubuntu).

## Next steps

* Continue exploring C# development: [Debug with VS Code and .NET Core](https://docs.microsoft.com/dotnet/articles/csharp/getting-started/with-visual-studio-code#debug)
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Working with C#](/docs/languages/csharp.md) - Learn about the great C# support you'll have when working on your .NET Core application.
* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt, and Jake.  Showing Errors and Warnings
* [.NET Core Docs](https://docs.microsoft.com/dotnet/core/) - Visit the .NET Core docs for more information on this powerful cross-platform development solution.
* [Deploying Applications to Azure](/docs/azure/deployment.md) - Deploy your app to [Azure](https://azure.microsoft.com).
