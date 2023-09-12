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

## What is C# Dev Kit?

[C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) is an extension created to enhance your C# development experience in Visual Studio Code. It aims to bring a more expansive, productive, and reliable C# experience to VS Code. The Dev Kit does not replace the [existing C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) but adds on top of the great language service features it provides. Developers can choose to continue using the updated version of the existing C# extension or enhance their experience by adding the C# Dev Kit.

## What project types are currently supported?

With an initial focus on cloud native development, the first preview of C# Dev Kit brings support for creating web apps, console apps, class library projects, and test projects.  We'll expand on this set of supported applications over time based on feedback that we gather from you and the community. You can build [.NET Multi-platform App UI (MAUI)](https://dotnet.microsoft.com/apps/maui) apps using the [.NET MAUI extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui), which is built on top of C# Dev Kit.

## What extensions are included in C# Dev Kit?

Today the extensions included in the C# Dev Kit family are:

* [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
* [IntelliCode for C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscodeintellicode-csharp)
* [.NET MAUI](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-maui)
* [Unity](https://aka.ms/vscode-unity)

Use of these extensions are governed under the [EULA for the C# Dev Kit family of extensions](https://aka.ms/vs/csdevkit/license).

These extensions also have dependencies which carry their own licensing – for example, the C# Dev Kit extension depends on the [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp).

## Who can use C# Dev Kit?

C# Dev Kit is available via a Community License for those who qualify and is also included as another addition to existing [Visual Studio Subscriptions](https://visualstudio.microsoft.com/subscriptions). This means that C# Dev Kit is available to use today for developers with active Visual Studio subscriptions.

For personal, academic, and open-source projects, the C# Dev Kit can be used at no cost. For commercial purposes, teams of up to 5 can also use the C# Dev Kit at no cost. For 6+ developers, those users will need a Visual Studio Professional (or higher) subscription. The C# Dev Kit is also included in GitHub Codespaces and Microsoft Dev Box, so users of those products have access to the C# Dev Kit at no additional charge.

## Where do I submit feedback and suggestions?

Users can report an issue or a suggestion through VS Code's **Help > Report Issue**. Select whether it is a bug, feature request, or performance issue, file on **An extension**, and select **C# Dev Kit** from the list of extensions.

![Help > Report Issue image](images/faq/help-report-issue.png)

## Is C# Dev Kit open source? Why not?

No. C# Dev Kit is closed source but depends upon the C# for VS Code extension, which is open source, and both communicate with open-source components such as [Roslyn](https://github.com/dotnet/roslyn) and [Razor](https://github.com/dotnet/razor). One of our goals with C# Dev Kit is to provide an improved productivity experience for C# developers who use VS Code.  To achieve this, C# Dev Kit includes some proprietary, closed-source features that are shared with our other tools. To make these experiences available to VS Code users, we needed to introduce C# Dev Kit as a closed source extension.

## How can I contribute?

The C# extension, which is a part of the C# Dev Kit, is fully open source and is subject to [these license terms](https://devdiv.visualstudio.com/DevDiv/_git/vscode-csharp-next?path=/RuntimeLicenses/license.txt). The source code to this extension is available on [https://github.com/dotnet/vscode-csharp](https://github.com/dotnet/vscode-csharp) and licensed under the MIT license.

This project has adopted the code of conduct defined by the [Contributor Covenant](https://www.contributor-covenant.org) to clarify expected behavior in our community. For more information, see the [.NET Foundation Code of Conduct](https://dotnetfoundation.org/about/policies/code-of-conduct). By signing the [CLA](https://cla.dotnetfoundation.org/), the community is free to use your contribution to .NET Foundation projects.
