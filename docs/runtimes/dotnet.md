---
Order: 2
Area: runtimes
TOCTitle: .NET Core
ContentId: AFFD7BDB-925E-4D02-828D-4E14360C70DA
PageTitle: .NET Core and Visual Studio Code
DateApproved: 10/10/2016
MetaDescription: Visual Studio Code has great support for writing and debugging .NET Core applications.
MetaTags:
- .NET Core
- ASP.NET Core
- C#
---

# .NET Core and Visual Studio Code

.NET Core gives you a blazing fast and modular platform for creating server applications that run on Windows, Linux and Mac. Use Visual Studio Code with the C# extension to get a powerful editing experience with full support for C# IntelliSense (smart code completion) and debugging.

## Getting Started

1. Install [.NET Core](https://microsoft.com/net/core).
2. Install the [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) from the VS Code Marketplace.

## Hello World

If you'd like to get started with a simple "Hello World" program on .NET Core, follow the steps below:

1. Initialize a C# project:

  * Open the command prompt (or terminal).
  * Navigate to the folder where you'd like to create the C# project.
  * Type `dotnet new`.
  * This creates a `Program.cs` file in your folder with a simple "Hello World" program already written.

2. Resolve the build assets by typing `dotnet restore`.

  * Running `restore` pulls down the required packages declared in the `project.json` file.
  * You'll see a new `project.lock.json` file in your project folder.
  * This file contains information about your project's dependencies to make subsequent restores quicker.

3. Run the "Hello World" program by typing `dotnet run`.

You can also watch a short [Video Tutorial](https://channel9.msdn.com/Blogs/dotnet/Get-started-with-VS-Code-using-CSharp-and-NET-Core) for further setup help.

## Next Steps

* [Editing Evolved](/docs/editor/editingevolved.md) - Lint, IntelliSense, Lightbulbs, Peek and Go to Definition and more
* [Working with C#](/docs/languages/csharp.md) - Learn about the great C# support you'll have when working on your .NET Core application.
* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt and Jake.  Showing Errors and Warnings
