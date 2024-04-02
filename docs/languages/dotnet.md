---
Order: 20
Area: languages
TOCTitle: .NET
ContentId: AFFD7BDB-925E-4D02-828D-4E14360C70DA
PageTitle: .NET and Visual Studio Code
DateApproved: 6/6/2023
MetaDescription: Get started writing and debugging .NET apps with Visual Studio Code.
---
# Using .NET in Visual Studio Code

[.NET](https://dotnet.microsoft.com) provides a fast and modular platform for creating many different types of applications that run on Windows, Linux, and macOS. Use Visual Studio Code with the C# and F# extensions to get a powerful editing experience with [C# IntelliSense](https://learn.microsoft.com/visualstudio/ide/visual-csharp-intellisense), F# IntelliSense (smart code completion), and debugging.

## Setting up VS Code for .NET development

If you are an existing VS Code user, you can add .NET support by installing the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension. C# Dev Kit brings a productive and reliable C# experience into VS Code, facilitating C# or multi-language development in VS Code. This extension pack consists of a set of VS Code extensions that work together to provide a rich C# editing experience, AI-powered development, solution management, and integrated testing experiences. As shown in the graphic below, C# Dev Kit consists of:

* The [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp), which provides the base language services support and continues to be worked on and maintained independent of this effort.
* [C# Dev Kit extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit), which builds on the same base foundation as Visual Studio and provides solution management, templates, test discovery/debugging.
* The IntelliCode for C# Dev Kit extension(optional), which provides the AI-powered development experience to the editor.

![C# Dev Kit extension](images/csharp/csharp-devkit.png)

If your projects require F# support, you can also download the [.NET Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-pack), which includes these extensions:

* [C# Dev Kit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [Ionide for F#](https://marketplace.visualstudio.com/items?itemName=Ionide.Ionide-fsharp)
* [Jupyter Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
* [Polyglot Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode)

You can also install extensions separately.

## Installing the .NET Software Development Kit

If you download the extensions separately, ensure that you also have the .NET SDK on your local environment. The .NET SDK is a software development environment used for developing .NET applications.

<a class="install-extension-btn" href="https://aka.ms/vscDocs/dotnet/download">Install the .NET SDK</a>

## Create a C# "Hello World" app

1. Initialize a C# project:

   * Open a terminal/command prompt and navigate to the folder in which you'd like to create the app.
   * Enter the following command in the command shell:

   ```bat
     dotnet new console
   ```

2. When the project folder is first opened in VS Code:

   * A "Required assets to build and debug are missing. Add them?" notification appears at the bottom right of the window.
   * Select **Yes**.

3. Run the app by entering the following command in the command shell:

   ```bat
   dotnet run
   ```

## Create an F# "Hello World" app

1. Initialize an F# project:

   * Open a terminal/command prompt and navigate to the folder in which you'd like to create the app.
   * Enter the following command in the command shell:

   ```bat
   dotnet new console -lang "F#"
   ```

2. Once it completes, open the project in Visual Studio Code:

   ```bat
   code .
   ```

3. Run the app by entering the following command in the command shell:

   ```bat
    dotnet run
   ```

## Next steps

* [C# Dev Kit documentation](/docs/csharp/get-started.md)
* Continue exploring C# development: [Debug with VS Code and .NET](https://learn.microsoft.com/dotnet/core/tutorials/debugging-with-visual-studio-code)
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Working with C#](/docs/languages/csharp.md) - Learn about the great C# support you'll have when working on your .NET application.
* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt, and Jake.  Showing Errors and Warnings
* [.NET Docs](https://learn.microsoft.com/dotnet) - Visit the .NET docs for more information on this powerful cross-platform development solution.
* [Deploying Applications to Azure](/docs/azure/deployment.md) - Deploy your app to [Azure](https://azure.microsoft.com).
* [Get Started with F# in Visual Studio Code](https://learn.microsoft.com/dotnet/fsharp/get-started/get-started-vscode)
