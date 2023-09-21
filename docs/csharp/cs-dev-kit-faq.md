---
Order: 11
Area: csharp
TOCTitle: FAQ
ContentId: edd2c270-152c-419d-b5d9-06f2f95979cd
PageTitle: C# Dev Kit extension FAQ
DateApproved: 7/11/2023
MetaDescription: C# Dev Kit extension Frequently Asked Questions (FAQ)
---

# C# Dev Kit FAQ

Use this FAQ (Frequently Asked Questions) topic to learn more about the C# Dev Kit extension and troubleshoot issues you may be experiencing.

## General

### What is C# Dev Kit?

[C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) is an extension created to enhance your C# development experience in Visual Studio Code. It aims to bring a more expansive, productive, and reliable C# experience to VS Code. The Dev Kit does not replace the [existing C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) but adds on top of the great language service features it provides. Developers can choose to continue using the updated version of the existing C# extension or enhance their experience by adding the C# Dev Kit.

### What project types are currently supported?

With an initial focus on cloud native development, the first preview of C# Dev Kit brings support for creating web apps, console apps, class library projects, and test projects.  We'll expand on this set of supported applications over time based on feedback that we gather from you and the community. You can build [.NET Multi-platform App UI (MAUI)](https://dotnet.microsoft.com/apps/maui) apps using the [.NET MAUI extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui), which is built on top of C# Dev Kit.

### What extensions are included in C# Dev Kit?

Today the extensions included in the C# Dev Kit family are:

* [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [IntelliCode for C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscodeintellicode-csharp)
* [.NET MAUI](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui)
* [Unity](https://aka.ms/vscode-unity)

Use of these extensions are governed under the [EULA for the C# Dev Kit family of extensions](https://aka.ms/vs/csdevkit/license).

These extensions also have dependencies which carry their own licensing – for example, the C# Dev Kit extension depends on the [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp).

### Who can use C# Dev Kit?

C# Dev Kit is available via a Community License for those who qualify and is also included as another addition to existing [Visual Studio Subscriptions](https://visualstudio.microsoft.com/subscriptions). This means that C# Dev Kit is available to use today for developers with active Visual Studio subscriptions.

For personal, academic, and open-source projects, the C# Dev Kit can be used at no cost. For commercial purposes, teams of up to 5 can also use the C# Dev Kit at no cost. For 6+ developers, those users will need a Visual Studio Professional (or higher) subscription. The C# Dev Kit is also included in GitHub Codespaces and Microsoft Dev Box, so users of those products have access to the C# Dev Kit at no additional charge.

### Where do I submit feedback and suggestions?

Users can report an issue or a suggestion through VS Code's **Help > Report Issue**. Select whether it is a bug, feature request, or performance issue, file on **An extension**, and select **C# Dev Kit** from the list of extensions.

![Help > Report Issue image](images/faq/help-report-issue.png)

### Is C# Dev Kit open source? Why not?

No. C# Dev Kit is closed source but depends upon the C# for VS Code extension, which is open source, and both communicate with open-source components such as [Roslyn](https://github.com/dotnet/roslyn) and [Razor](https://github.com/dotnet/razor). One of our goals with C# Dev Kit is to provide an improved productivity experience for C# developers who use VS Code.  To achieve this, C# Dev Kit includes some proprietary, closed-source features that are shared with our other tools. To make these experiences available to VS Code users, we needed to introduce C# Dev Kit as a closed source extension.

### How can I contribute?

The C# extension, which is a part of the C# Dev Kit, is fully open source and is subject to [these license terms](https://devdiv.visualstudio.com/DevDiv/_git/vscode-csharp-next?path=/RuntimeLicenses/license.txt). The source code to this extension is available on [https://github.com/dotnet/vscode-csharp](https://github.com/dotnet/vscode-csharp) and licensed under the MIT license.

This project has adopted the code of conduct defined by the [Contributor Covenant](https://www.contributor-covenant.org) to clarify expected behavior in our community. For more information, see the [.NET Foundation Code of Conduct](https://dotnetfoundation.org/about/policies/code-of-conduct). By signing the [CLA](https://cla.dotnetfoundation.org/), the community is free to use your contribution to .NET Foundation projects.

## .NET SDK

### Install Script Timeouts. What should I do?

Please note that, depending on your network speed, installing the .NET Core runtime might take some time. By default, the installation terminates unsuccessfully if it takes longer than 4.5 minutes to finish. If you believe this is too little (or too much) time to allow for the download, you can change the timeout value by setting dotnetAcquisitionExtension.installTimeoutValue to a custom value.

[Learn more about configuring Visual Studio Code settings](https://code.visualstudio.com/docs/getstarted/settings) and see below for an example of a custom timeout in a settings.json file. In this example the custom timeout value is 180 seconds, or 3 minutes.

![Custom Timeout Value](images/faq/dotnet-sdk-timeout.png)

### How do I manually install .NET?

If .NET installation is failing or you want to reuse an existing installation of .NET, you can use the dotnetAcquisitionExtension.existingDotnetPath setting. .NET can be manually installed from the [.NET website](https://dotnet.microsoft.com/download). To direct this extension to that installation, update your settings with the extension ID and the path as illustrated below.

![Setting the .NET Acquisition Extension Path ](images/faq/dotnet-sdk-path.png)

## Project System

### The Solution Explorer tells me my project is not supported in C# Dev Kit. What should I do?

This is usually because the project targets .NET Framework rather than .NET Core/.NET. C# Dev Kit does not support .NET Framework projects.

![Project Not Supported in Solution Explorer](images/faq/solution-explorer-not-supported-framework.png)

You can either [update your project](https://learn.microsoft.com/en-us/dotnet/core/porting/) to an SDK-style project to use all available C# Dev Kit features. Or you can use the new Prefer CSharp Extension workspace setting located in the Settings UI.
This setting delegates solution and project load to the C# extension. The C# extension will then perform its typical tasks, such as loading IntelliSense, while C# Dev Kit will halt and not attempt to load the solution or any associated projects.

### I clicked on the “Create .NET Project” button or used the .NET: Create .NET Project command option, and nothing happened

This usually occurs when there is an extension version mismatch. C# Dev Kit requires version 2.0 or greater of the C# extension. If you are on v1 of the C# extension, C# Dev Kit, and the C# Dev Kit related commands will not work properly. To fix this, upgrade the C# extension to the latest version.

### The Project System says it ran into a problem. What should I do?

When an internal Project System error occurs, you’ll generally see a notification like this pop up in a corner of VS Code:

![Failed to Restore Solution](images/faq/failed-to-restore-solution.png)

Click the “Open log” button to open a view showing a stack trace of where the problem occurred. Select and copy all the text in the log. Report the issue through VS Code and make sure to include the copied text from the log.

### When I open my solution, I get a toast message, “Failed to restore solution”

Click on Show error. This will open the Output pane for NuGet. Read through the error to determine why the package restore was unable to complete. If you are unable to resolve the problem, report the issue through VS Code.

### The Solution Explorer tells me that “A compatible .NET SDK was not found”. What should I do?

The most likely cause of this error is a global.json file that specifies a different SDK than what is installed on the system.

![A compatible .NET SDK was not found](images/faq/compatible-dotnet-sdk-not-found.png)

Open the Output window and switch to the “Projects” pane to look for more information.

To fix the issue, either update the global.json to specify an installed SDK or install the specified SDK from https://aka.ms/dotnet/download.

Next, close and re-open the workspace.

It is also possible that the SDK is not installed in a location known to C# Dev Kit. This can happen, for example, if the SDK was installed by a package manager rather than through the MS-provided installers. To fix this, uninstall the SDK via the package manager, and then install it via https://aka.ms/dotnet/download.

## Test Explorer

### Why don’t my tests appear in the Test Explorer pane?

Make sure your solution includes a test project. Only test projects that are part of the opened solution will be included. To see if the test project is part of the solution, open the Solution Explorer panel on the file pane and see if the project appears in the tree. Right click on the solution node to add existing test projects, or to create a new test project in the solution.

C# Dev Kit also requires that it has built your project successfully before tests will appear in the Test Explorer pane. Also, if a “Clean” is done on your project/solution, the test dlls will be removed from the test explorer pane.

Once you have validated that your test project is part of the solution, “Build” your solution by right clicking on the solution in the Solution Explorer and select “Build” or Ctrl-Shift-B. Once the build has been completed, your tests will appear in the Test Explorer Pane.

### My tests appear in the test window, but I cannot debug them

Make sure that your tests are targeting NET Core. C# Dev Kit does not support .NET Framework projects, although .NET Framework projects may load and appear to work. The debugger in VSCode does not support .NET Framework.

### I just added new tests to my test project, and they are not appearing in the Test Explorer pane?

C# Dev Kit requires that it has built your project successfully before tests will appear in the Test Explorer pane.

“Build” your solution by right clicking on the solution in the Solution Explorer and select “Build” or Ctrl-Shift-B. Once the build has been completed, your tests will appear in the Test Explorer Pane.

## Debugger

### When I F5, nothing happens. What should I do?

Make sure you have a C# project open or that the active document is a .cs or .razor file. If the debugger still fails to load, make sure that both the C# Dev Kit and the C# Extension have been activated.

### When I F5, it asks me to “Select a Debugger”. How do I know which one to pick?

If you're trying to debug .NET Console Applications, Blazor Server Apps, Blazor WebAssembly, or Web Applications, make sure to select the 'C#' option. The other options may be part of other extensions such as 'Node' for JavaScript debugging or 'Python' for Python debugging, and are not part of C# Dev Kit.

### Why is debugging not working?

If you're trying to debug a library or a test project, it's likely that you'll need to take some extra steps to ensure that your code is properly debugged. To debug a library, you can create a console or web application that interacts with the library. For a test project, you can use the test explorer to debug your code effectively.

### While debugging my breakpoints aren't binding

The process you’re debugging is not built in Debug, make sure to build as debugging before debugging the process.

## C# Editor

### How do I get IntelliSense to work correctly?

Make sure that you have a project or solution open. If you have multiple solutions, we will automatically open one or prompt you to open one. Next, search for "Trace" in the Settings search bar, and set the Dotnet > Server to Trace from the drop-down. This will provide more output information to help the developer team diagnose the issue.

![Set Dotnet Server to Trace](images/faq/dotnet-server-trace.png)

Once you've made this change, reload the window by typing Ctrl + Shift + P to open the Command Palette, then typing "Reload Window" and pressing Enter. After reloading the window, check the project log in the Output Window by typing Ctrl+Shift+U and selecting "Projects" from the drop-down. This will show any errors related to your project not being fully loaded. Copy all the text in the Output Window and report the issue through VS Code, making sure to include the copied text.

### C# extension fails to launch the server. What should I do?

As a workaround, you can point the .NET runtime acquisition extension to an existing .NET 7 install:

![Setting .NET Runtime to an Existing .NET 7 Install](images/faq/dotnet-runtime-path.png)

### I have too many diagnostics or I don’t have enough diagnostics

The C# Extension allows you to configure various background code analysis settings. To access the Settings, go to File > Preferences > Settings or use the shortcut (Ctrl+,). In the search bar, type "analysis" to narrow down the settings related to code analysis. Under "Run background code analysis for:", you can choose the analysis scope from a drop-down menu. The default setting is to analyze open files, but you can customize it to full solution, none, or open documents.

![Configure Background Code Analysis](images/faq/background-code-analysis.png)

You can also use an EditorConfig file to configure diagnostics and code analysis. To learn more about EditorConfig, check out the [documentation](https://learn.microsoft.com/dotnet/fundamentals/code-analysis/code-style-rule-options).

If you're not seeing enough diagnostics or none at all, it's possible that your project isn't fully loaded. To check if this is the case, refer to the troubleshooting guide for "IntelliSense is not working". It provides instructions on how to verify if your project is fully loaded.

## Razor Editor

### Most or all Blazor components show up with warnings. Why?

Before Blazor components can be discovered, C# Dev Kit needs to load your project successfully. Additionally, the Razor language server requires a "project.razor.vscode.json" file to be generated in order to understand the state of your projects. If this file isn't generated, or is generated without any components, the Razor experience may be affected.

To improve performance, we sometimes defer generating or loading this file until you open your first .razor or .cshtml file. To ensure that there are no errors in the Solution Explorer for the project you're trying to use, please check it carefully.

If your project has loaded correctly, verify that a "project.razor.vscode.json" file exists in the "obj\Debug\<tfm>" folder on your file system. In that file, make sure that there isn't an empty array of "TagHelpers".

To force the file to re-generate, close any open .razor or .cshtml files, reload the VS Code window, and once the project has loaded correctly, open any .razor or .cshtml file to trigger the regeneration process.

### Target framework errors are mentioned in Razor files. Why?

The Razor language server generally does not have a concept of a “solution”, but instead loads projects based on the presence of a “project.razor.vscode.json” file in the projects “obj\Debug\<tfm>” folder. Sometimes, old files from target frameworks that are no longer in use can cause confusion, making the Razor server think a project is multi-targeted or that some components are still referenced when they're not.

To resolve this issue, clear out old folders from within the "obj" folder or clear all of them. Then, reload the VS Code window and open a .razor file. This should ensure that new json files are generated, and the old ones are removed.

## IntelliCode

### I am not getting Whole Line Completions. Why not?

Whole line completions are disabled when Copilot is enabled to allow you take advantage of the more advanced AI completion capabilities. You can verify that Copilot is enabled by verifying the Copilot logo is present in the lower right corner of VS Code.
