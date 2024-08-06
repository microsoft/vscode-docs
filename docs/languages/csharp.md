---
Order: 19
Area: languages
TOCTitle: C#
ContentId: 40C8AAC1-C00D-4E91-8877-737A598346B6
PageTitle: C# programming with Visual Studio Code
DateApproved: 6/6/2023
MetaDescription: Find out how to get the best out of Visual Studio Code and C#.
MetaSocialImage: images/csharp/languages-csharp-social.png
---
# Working with C&#35;

The C# support in Visual Studio Code is optimized for cross-platform .NET development (see [working with .NET and VS Code](/docs/languages/dotnet.md) for another relevant article). Our focus with VS Code is to be a great editor for cross-platform C# development by providing a rich C# editing experience, AI-powered development, solution management, and integrated testing experiences

![C# language within VS Code](images/csharp/csharp-hero.png)

VS Code supports debugging of C# applications running on either .NET or Mono.

For detailed instructions on:

* .NET debugging - see the [C# Dev Kit debugging documentation](/docs/csharp/debugging.md).
* Mono debugging - see the [Mono Debug extension's README](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug).

## Installing C&#35; support

C# language support is provided with the [C# Dev Kit extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit). You can install it from within VS Code by searching for 'C# Dev Kit' in the **Extensions** view (`kb(workbench.view.extensions)`) or if you already have a project with C# files, VS Code will prompt you to install the extension as soon as you open a C# file.

For more information about the C# Dev Kit extension, see the [C# documentation](/docs/csharp/get-started.md).

## C&#35; Dev Kit

Visual Studio Code uses the power of [Roslyn](https://github.com/dotnet/roslyn) and [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) to offer an enhanced C# experience. We offer support for:

* .NET projects
* MSBuild projects
* C# scripts (CSX)

Supported .NET project types include:

* ASP.NET Core App
* ASP.NET Core Web API
* ASP.NET Core MVC Web App
* Blazor Web App
* Blazor Server App
* Blazor WebAssembly App
* Console App

And more.

To find a full list of supported project types within VS Code, open the **Command Palette** and search for **.NET: New Project..**. This will display a full list of supported project types.

![Supported Projects](images/csharp/newproject.png)

When you open a Workspace that contains .NET solution files or project files, the Solution Explorer will automatically appear. If you have a single solution file (.sln file) in the workspace, the Solution Explorer will detect that file and automatically load it after the workspace is loaded. For more information on managing your C# projects in VS Code, look at the documentation on [Project Management](/docs/csharp/project-management.md).

## Editing Evolved

There is a lot to discover with C# and the editor, such as format on type, IntelliSense, the rename-refactoring, etc.

![Right-click Menu](images/csharp/editingevolved.png)

For more information on the C# Dev Kit editing features, go to the [Navigate and Edit documentation](/docs/csharp/navigate-edit.md). For a full description of VS Code editing features, go to the [Basic Editing](/docs/editor/codebasics.md) and [Code Navigation](/docs/editor/editingevolved.md) documentation.

Here are a few highlights...

## IntelliSense

IntelliSense just works: hit `kb(editor.action.triggerSuggest)` at any time to get context specific suggestions.

![IntelliSense](images/csharp/intellisense.png)

## Enhance completions with AI

[GitHub Copilot](https://copilot.github.com/) is an AI-powered code completion tool that helps you write code faster and smarter. You can use the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) in VS Code to generate code, or to learn from the code it generates.

[![GitHub Copilot extension in the VS Code Marketplace](images/csharp/copilot-extension.png)](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

You can learn more about how to get started with Copilot in the [Copilot documentation](/docs/editor/github-copilot.md).

## Snippets for C&#35;

For information on snippets in C# Dev Kit, go to the [Navigate and Edit documentation](/docs/csharp/navigate-edit.md). There are also several built-in snippets included in VS Code that will come up as you type or you can press `kb(editor.action.triggerSuggest)` (Trigger Suggest) and we will give you a context specific list of suggestions.

![Snippets](images/csharp/snippet.png)

>**Tip:** You can add in your own User Defined Snippets for C#. Take a look at [User Defined Snippets](/docs/editor/userdefinedsnippets.md) to find out how.

## Search for Symbols

There are also features outside the editor. One is the ability to search for symbols from wherever you are. Hit `kb(workbench.action.showAllSymbols)`, start typing, and see a list of matching C# symbols. Select one and you'll be taken straight to its code location.

![Symbols](images/csharp/symbols.png)

## CodeLens

Another cool feature is the ability to see the number of references to a method directly above the method. Click on the reference info to see the references in the Peek view. This reference information updates as you type.

>**Note:** Methods defined in `object`, such as `equals` and `hashCode` do not get reference information due to performance reasons.

![CodeLens](images/csharp/codelens.png)

>**Tip:** You can turn off references information displayed in CodeLens with the `editor.codeLens` [setting](/docs/getstarted/settings.md).

## Find References/Peek Definition

You can click on the references of an object to find the locations of its use in place without losing context. This same experience works in reverse where you can Peek the definition of an object and see it inline without leaving your location. For information on Peek Definition in C# Dev Kit, go to the [Navigate and Edit documentation](/docs/csharp/navigate-edit.md).

![Peek](images/csharp/peek.png)

## Quick Fixes / Suggestions

There are some basic quick fixes supported in VS Code. You will see a lightbulb and clicking on it, or pressing `kb(editor.action.quickFix)` provides you with a simple list of fixes/suggestions.

![Quick fix](images/csharp/lightbulb.png)

## Testing

The extension supports the following test frameworks:

* [XUnit](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test)
* [NUnit](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-nunit)
* [MSTest](https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-mstest)

The C# Dev Kit extension provides the following features:

* Run/Debug tests cases
* View test report
* View tests in Testing Explorer

For more information, go to our [Testing documentation for C# Dev Kit](/docs/csharp/testing.md).

## Next steps

Read on to find out about:

* [C# Dev Kit documentation](/docs/csharp/get-started.md)
* [.NET Development](/docs/languages/dotnet.md) - get up and running with cross-platform .NET
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Tasks](/docs/editor/tasks.md) - Use tasks to build your project and more.
* [Debugging](/docs/editor/debugging.md) - Find out how to use the debugger with your project.
* [Unity development](/docs/other/unity.md) - Learn about using VS Code with your Unity projects.
