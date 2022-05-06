---
Order: 19
Area: languages
TOCTitle: .NET
ContentId: AFFD7BDB-925E-4D02-828D-4E14360C70DA
PageTitle: .NET and Visual Studio Code
DateApproved: 3/6/2019
MetaDescription: Get started writing and debugging .NET apps with Visual Studio Code.
---
# Using .NET in Visual Studio Code

[.NET](https://dotnet.microsoft.com) provides a fast and modular platform for creating many different types of applications that run on Windows, Linux, and macOS. Use Visual Studio Code with the C# and F# extensions to get a powerful editing experience with [C# IntelliSense](https://docs.microsoft.com/visualstudio/ide/visual-csharp-intellisense), F# IntelliSense (smart code completion), and debugging.

## Prerequisites

Install the following:

* [.NET SDK](https://dotnet.microsoft.com/download). The SDK also includes the Runtime.
* The [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) from the VS Code Marketplace.
* The [F# extension (Ionide)](https://marketplace.visualstudio.com/items?itemName=Ionide.Ionide-fsharp) from the VS Code Marketplace.

## Create a C# "Hello World" app

1. Initialize a C# project:

   * Open a terminal/command prompt and navigate to the folder in which you'd like to create the app.
   * Enter the following command in the command shell:

   ```cmd
     dotnet new console
   ```

2. When the project folder is first opened in VS Code:

   * A "Required assets to build and debug are missing. Add them?" notification appears at the bottom right of the window.
   * Select **Yes**.

3. Run the app by entering the following command in the command shell:

   ```cmd
   dotnet run
   ```

## Create an F# "Hello World" app

1. Initialize an F# project:

   * Open a terminal/command prompt and navigate to the folder in which you'd like to create the app.
   * Enter the following command in the command shell:

   ```cmd
   dotnet new console -lang "F#"
   ```

2. Once it completes, open the project in Visual Studio Code:

   ```cmd
   code .
   ```

3. Run the app by entering the following command in the command shell:

   ```cmd
    dotnet run
   ```

## Next steps

* Continue exploring C# development: [Debug with VS Code and .NET](https://docs.microsoft.com/dotnet/articles/csharp/getting-started/with-visual-studio-code#debug)
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Working with C#](/docs/languages/csharp.md) - Learn about the great C# support you'll have when working on your .NET application.
* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt, and Jake.  Showing Errors and Warnings
* [.NET Docs](https://docs.microsoft.com/dotnet) - Visit the .NET docs for more information on this powerful cross-platform development solution.
* [Deploying Applications to Azure](/docs/azure/deployment.md) - Deploy your app to [Azure](https://azure.microsoft.com).
* [Get Started with F# in Visual Studio Code](https://docs.microsoft.com/dotnet/fsharp/get-started/get-started-vscode)
