---
Order: 15
Area: languages
TOCTitle: C#
ContentId: 40C8AAC1-C00D-4E91-8877-737A598346B6
PageTitle: C# programming with Visual Studio Code
DateApproved: 7/16/2018
MetaDescription: Find out how to get the best out of Visual Studio Code and C#.
MetaSocialImage: images/csharp/languages_csharp.png
---
# Working with C&#35;

The C# support in Visual Studio Code is optimized for cross-platform .NET Core development (see [working with .NET Core and VS Code](/docs/languages/dotnet.md) for another relevant article). Our focus with VS Code is to be a great editor for cross-platform C# development.

![C# language within VS Code](images/csharp/c_sharp_hero.png)

VS Code supports debugging of C# applications running on either .NET Core or Mono.

For detailed instructions on:

* .NET Core debugging - see the [Microsoft C# extension's GitHub page](https://github.com/OmniSharp/omnisharp-vscode/blob/master/debugger.md).
* Mono debugging - see the [Mono Debug extension's README](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug).

>**Note:** [VS Code has limited support for debugging applications running on the Desktop .NET Framework.](https://github.com/OmniSharp/omnisharp-vscode/wiki/Desktop-.NET-Framework)

Due to this focus, many standard C# project types are not recognized by VS Code. An example of a non-supported project type is an ASP.NET MVC Application (though [ASP.NET Core](https://asp.net) is supported). In these cases, if you want to have a lightweight tool to edit a file - VS Code has you covered. If you want the best possible experience for those projects and development on Windows in general, we recommend you use [Visual Studio Community](https://visualstudio.microsoft.com/vs/community).

## Installing C&#35; support

C# language support is an optional [install from the Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp). You can install it from within VS Code by searching for 'C#' in the **Extensions** view (`kb(workbench.view.extensions)`) or if you already have a project with C# files, VS Code will prompt you to install the extension as soon as you open a C# file.

[Video Tutorial on Getting Started with C# in VS Code with .NET Core](https://channel9.msdn.com/Blogs/dotnet/Get-started-VSCode-Csharp-NET-Core-Windows)

## Roslyn and OmniSharp

Visual Studio Code uses the power of [Roslyn](https://github.com/dotnet/roslyn) and [OmniSharp](https://www.omnisharp.net) to offer an enhanced C# experience. We offer support for:

* .NET Core projects
* MSBuild projects
* C# scripts (CSX)

On startup the best matching projects are loaded automatically but you can also choose your projects manually. The status bar will show what projects have been loaded and also allows you to select a different set of projects. To do so, click on the status bar projects item and select *Change projects…*. In the image below a single project has been picked up:

![Select Project](images/csharp/selectproject.png)

The available options include:

* Selecting a ```project.json``` file will open a .NET Core project and VS Code will load that project plus the referenced projects.
* Selecting a ```*.sln``` file opens a MSBuild-project. It will load the referenced ```*.csproj``` projects and sibling or descendant ```project.json``` files but no other project files that are referenced from the solution file.
* Selecting a ```folder``` will make VS Code scan for ```*.sln```, ```project.json``` and ```*.csx``` files (C# scripts) and VS Code will attempt to load them all.

Once the project is loaded the enhanced experiences light up...

## Editing Evolved

There is a lot to discover with C# and the editor, such as format on type, IntelliSense, the rename-refactoring, etc.

![Right Click Menu](images/csharp/editingevolved.png)

For a full description of our editing features, go to the [Basic Editing](/docs/editor/codebasics.md) and [Code Navigation](/docs/editor/editingevolved.md) documentation.

Here are a few highlights...

## IntelliSense

IntelliSense just works: hit `kb(editor.action.triggerSuggest)` at any time to get context specific suggestions.

![IntelliSense](images/csharp/intellisense.png)

## Snippets for C&#35;

We have several built-in snippets included in VS Code that will come up as you type or you can press `kb(editor.action.triggerSuggest)` (Trigger Suggest) and we will give you a context specific list of suggestions.

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

You can click on the references of an object to find the locations of its use in place without losing context. This same experience works in reverse where you can Peek the definition of an object and see it inline without leaving your location.

![Peek](images/csharp/peek.png)

## Quick Fixes / Suggestions

There are some basic quick fixes supported in VS Code. You will see a lightbulb and clicking on it, or pressing `kb(editor.action.quickFix)` provides you with a simple list of fixes/suggestions.

![Quick fix](images/csharp/lightbulb.png)

## Next steps

Read on to find out about:

* [.NET Core Development](/docs/languages/dotnet.md) - get up and running with cross-platform .NET
* [Basic Editing](/docs/editor/codebasics.md) - Learn about the powerful VS Code editor.
* [Tasks](/docs/editor/tasks.md) - Use tasks to build your project and more.
* [Debugging](/docs/editor/debugging.md) - Find out how to use the debugger with your project.
* [Unity development](/docs/other/unity.md) - Learn about using VS Code with your Unity projects.

## Common questions

### My Project won't load

VS Code only supports a limited set of project types (primarily .NET Core). For full .NET project support, we suggest you use [Visual Studio Community](https://visualstudio.microsoft.com/vs/community).

### IntelliSense is not working

This is typically as a result of the current project type not being supported. You can see an indication in the OmniSharp flame in the bottom left hand side of the status bar.

### How do I build/run my project?

VS Code supports tasks for build and natively understand the output of MSBuild, CSC, XBuild. Find out more in the [Tasks](/docs/editor/tasks.md) documentation.

### I'm missing required assets to build and debug C# in VS Code. My debugger says "No Configuration"

The Visual Studio Code C# extension can generate the assets you need to build and debug. If you missed the prompt when you first opened a new C# project, you can still perform this operation through the Command Palette (**View > Command Palette**) by typing '.NET', and running **.NET: Generate Assets for Build and Debug**. This command will generate the necessary `launch.json` and `tasks.json` configuration files (under the `.vscode` folder).
