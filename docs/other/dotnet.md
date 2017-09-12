---
Order: 2
Area: other
TOCTitle: .NET Core
ContentId: AFFD7BDB-925E-4D02-828D-4E14360C70DA
PageTitle: .NET Core and Visual Studio Code
DateApproved: 5/23/2017
MetaDescription: Visual Studio Code has great support for writing and debugging .NET Core applications.
MetaTags:
- .NET Core
- ASP.NET Core
- C#
---

# Using .NET Core in Visual Studio Code

[.NET Core](https://docs.microsoft.com/en-us/dotnet/articles/welcome) gives you a blazing fast and modular platform for creating server applications that run on Windows, Linux and Mac. Use Visual Studio Code with the C# extension to get a powerful editing experience with full support for C# IntelliSense (smart code completion) and debugging.

## Getting Started

1. Install [.NET Core](https://microsoft.com/net/core).
2. Install the [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) from the VS Code Marketplace.

## Hello World

If you'd like to get started with a simple "Hello World" program on .NET Core, follow the steps below:

1. Initialize a C# project:

  * Open the command prompt (or terminal).
  * Navigate to the folder where you'd like to create the C# project.
  * Type `dotnet new console`.
  * This creates a `Program.cs` file in your folder with a simple "Hello World" program already written.

2. Resolve the build assets by typing `dotnet restore`.

> Tip: .NET Core Tools are now MSBuild-based. This means a `.csproj` project file will be created instead of a `project.json`. [Read more](https://blogs.msdn.microsoft.com/dotnet/2016/11/16/announcing-net-core-tools-msbuild-alpha/).

  * Running `restore` pulls down the required packages declared in the `project.json` file.
  * You'll see a new `project.lock.json` file in your project folder.
  * This file contains information about your project's dependencies to make subsequent restores quicker.
  
3. When the project folder is first opened in VS Code, a notification will appear at the top of the window asking if you'd like to add the required assets to build and debug your project. Select **Yes**.

4. Run the "Hello World" program by typing `dotnet run` in the command prompt (or terminal).

Watch a video tutorial for further setup help on [Windows](https://channel9.msdn.com/Blogs/dotnet/Get-started-VSCode-Csharp-NET-Core-Windows), [macOS](https://channel9.msdn.com/Blogs/dotnet/Get-started-VSCode-NET-Core-Mac), or [Linux](https://channel9.msdn.com/Blogs/dotnet/Get-started-with-VS-Code-Csharp-dotnet-Core-Ubuntu).

> Tip: Continue exploring C# development: [Debug with VS Code and .NET Core](https://docs.microsoft.com/en-us/dotnet/articles/csharp/getting-started/with-visual-studio-code#debug)

## Next Steps

* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Working with C#](/docs/languages/csharp.md) - Learn about the great C# support you'll have when working on your .NET Core application.
* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt and Jake.  Showing Errors and Warnings
* [.NET Core Docs](https://docs.microsoft.com/en-us/dotnet/articles/core/) - Visit the .NET Core docs for more information on this powerful cross-platform development solution.
