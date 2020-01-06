---
ContentId: B1DF33C0-400C-413D-B60B-D1AA278F6DE3
PageTitle: Debug a .NET Core app running in a Docker container
DateApproved: 12/12/2019
MetaDescription: Debug a .NET Core app running in a Docker container, using Visual Studio Code.
---
# Debugging .NET Core within Docker containers

## Prerequisites

1. Install the [.NET Core SDK](https://www.microsoft.com/net/download) which includes support for attaching to the .NET Core debugger.

1. Install the [C# VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) which includes support for attaching to the .NET Core debugger in VS Code.

1. Mac users only: add `/usr/local/share/dotnet/sdk/NuGetFallbackFolder` as a shared folder in your Docker preferences.

![dockerSharedFolders](images/debug/mac-folders.png)

## Walkthrough

1. If needed, create a .NET Core project with `dotnet new`.
1. Open the project folder in VSCode.
1. Wait until a popup shows, asking if you want to add required assets for debugging. Click "Yes":
   ![csharpPrompt](images/csharp-prompt.png)
1. Open the command palette (<kbd>F1</kbd> by default) and enter `Docker: Add Docker Files to Workspace...`. If you have already dockerized your app, you can instead do `Docker: Initialize for Docker debugging`. Follow the prompts.
1. Switch to the debugging tab.
1. Select the "Docker .NET Core Launch" launch profile.
1. Optionally, set a breakpoint.
1. Start debugging! (<kbd>F5</kbd> by default)

For additional customization options, see the documentation on [Tasks](/docs/containers/reference.md) and [Debugging](/docs/containers/debug-common.md).
