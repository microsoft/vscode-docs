---
Order: 20
Area: languages
TOCTitle: .NET
ContentId: AFFD7BDB-925E-4D02-828D-4E14360C70DA
PageTitle: .NET and Visual Studio Code
DateApproved: 8/30/2022
MetaDescription: Get started writing and debugging .NET apps with Visual Studio Code.
---
# Using .NET in Visual Studio Code

[.NET](https://dotnet.microsoft.com) provides a fast and modular platform for creating many different types of applications that run on Windows, Linux, and macOS. Use Visual Studio Code with the C# and F# extensions to get a powerful editing experience with [C# IntelliSense](https://learn.microsoft.com/visualstudio/ide/visual-csharp-intellisense), F# IntelliSense (smart code completion), and debugging.

## Setting up VS Code for .NET development

### .NET Coding Pack

To help you set up quickly, you can install the **.NET Coding Pack**, which includes VS Code, the .NET Software Development Kit, and essential .NET extensions. The Coding Pack can be used as a clean installation, or to update or repair an existing development environment.

<a class="install-extension-btn" onclick="pushCodingPackEvent('dotnet', 'win')" href="https://aka.ms/dotnet-coding-pack-win">Install the .NET Coding Pack - Windows</a>

<a class="install-extension-btn" onclick="pushCodingPackEvent('dotnet', 'mac')" href="https://aka.ms/dotnet-coding-pack-mac">Install the .NET Coding Pack - macOS</a><br>

> **Note**: The .NET Coding Pack is only available for Windows and macOS. For other operating systems, you will need to manually install the .NET SDK, VS Code, and .NET extensions.

### Installing extensions

If you are an existing VS Code user, you can also add .NET support by installing the [.NET Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-pack), which includes these extensions:

* [C# for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [Ionide for F#](https://marketplace.visualstudio.com/items?itemName=Ionide.Ionide-fsharp)
* [Jupyter Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
* [Polyglot Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode)

<a class="install-extension-btn" href="vscode:extension/ms-dotnettools.vscode-dotnet-pack">Install the .NET Extension Pack</a>

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

* Continue exploring C# development: [Debug with VS Code and .NET](https://learn.microsoft.com/dotnet/core/tutorials/debugging-with-visual-studio-code)
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
* [Working with C#](/docs/languages/csharp.md) - Learn about the great C# support you'll have when working on your .NET application.
* [Tasks](/docs/editor/tasks.md) - Running tasks with Gulp, Grunt, and Jake.  Showing Errors and Warnings
* [.NET Docs](https://learn.microsoft.com/dotnet) - Visit the .NET docs for more information on this powerful cross-platform development solution.
* [Deploying Applications to Azure](/docs/azure/deployment.md) - Deploy your app to [Azure](https://azure.microsoft.com).
* [Get Started with F# in Visual Studio Code](https://learn.microsoft.com/dotnet/fsharp/get-started/get-started-vscode)
