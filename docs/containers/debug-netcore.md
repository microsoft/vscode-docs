Area: containers
ContentId: B1DF33C0-400C-413D-B60B-D1AA278F6DE3
PageTitle: Debug a .NET app running in a Docker container
DateApproved: 12/21/2022
MetaDescription: Debug a .NET app running in a Docker container, using Visual Studio Code.
---
# Debug .NET within a container

## Prerequisites

1. Install the [.NET SDK](https://www.microsoft.com/net/download), which includes support for attaching to the .NET debugger. If you install .NET SDK 7 or later, you have the option of debugging without a Dockerfile.

1. Install the Visual Studio Code [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp), which includes support for attaching to the .NET debugger with VS Code.

1. macOS users only: Add `/usr/local/share/dotnet/sdk/NuGetFallbackFolder` as a shared folder in your Docker preferences.

    ![dockerSharedFolders](images/debug/mac-folders.png)

## Walkthrough

- If needed, create a .NET project with `dotnet new`.
- Open the project folder in VS Code.
- Optionally, set a breakpoint.

## .NET SDK vs. Dockerfile Build

If you want a simple container debug experience without a Dockerfile or if you are more familiar with `MSBuild`, go with **.NET SDK**. If you're more comfortable working with `Dockerfiles`, choose **Dockerfile**.

### .NET SDK Container Build (Debug without `Dockerfile`)

1. Press `kb(workbench.action.debug.start)` or choose **Start Debugging** from the **Run** menu. (Make sure you don't have any existing launch profiles in `launch.json`)
2. You're going to be prompted with a list of debuggers, choose Select **Docker: Debug in Container**
3. You will be prompted with options to either build with a `Dockerfile` (**User a Dockerfile**) or build using the .NET SDK (**Use .NET SDK**)
4. Select **Use .NET SDK**
5. If you have multiple project files in your workspace, choose the project file associated with the project you want to debug
6. Your .NET app will run in a Docker container, and the web app will open in your browser.

> Note: **Supported .NET SDK Versions:** This feature is available for .NET SDK version 7.0.300 and above by default. For versions between 7.0.100 and 7.0.300, enable it with `dotnet add package Microsoft.NET.Build.Containers` You can read more about .NET SDK Container build on [Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/docker/publish-as-container).


### Debug with `Dockerfile`

1. Wait until a notification appears asking if you want to add required assets for debugging. Select **Yes**:

   ![csharpPrompt](images/debug/csharp-prompt.png)

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and enter **Docker: Add Docker Files to Workspace...**. If you have already dockerized your app, you can instead do **Docker: Initialize for Docker debugging**. Follow the prompts.
1. Switch to the **Run and Debug** view (`kb(workbench.view.debug)`).
1. Select the **Docker .NET Core Launch** launch configuration.
1. Optionally, set a breakpoint.
1. Start debugging! (`kb(workbench.action.debug.start)`)

## Running and debugging with SSL support

To enable SSL (using the HTTPS protocol), you will need to make a few changes to your configuration.

1. In the Dockerfile, add an `EXPOSE` line to the base section to define a separate port for HTTPS / SSL. Keep a separate `EXPOSE` line with a different port for HTTP requests.

   ```docker
   FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
   WORKDIR /app
   EXPOSE 5000
   EXPOSE 5001
   ```

1. In the `.vscode/tasks.json` file, add `configureSsl: true` to the `netCore` section. Also, add an environment variable `ASPNETCORE_URLS` in the `dockerRun` section of the `docker-run: debug` task, with the same port numbers you defined in the Dockerfile:

   ```json
   dockerRun: {
       "env": {
          "ASPNETCORE_URLS": "https://+:5001;http://+:5000"
      }
    }
    netCore: {
        "appProject": "${workspacefolder}/MyProject.csproj",
        "enableDebugging": true,
        "configureSsl": true
    }
   ```

For additional customization options, see the documentation on [Tasks](/docs/containers/reference.md) and [Debug containerized apps](/docs/containers/debug-common.md).

## Saving Project File Preference for [.NET SDK Container Build](https://learn.microsoft.com/en-us/dotnet/core/docker/publish-as-container)

If you have a workspace folder containing multiple .NET project files and you only intend to debug one for the foreseeable future (i.e. you never want to be prompted a list of project files when you `kb(workbench.action.debug.start)`). You can save your launch profile by doing the following:

1. Follow the steps in [.NET SDK Container Build](#net-sdk-container-build-debug-without-dockerfile) and keep the debug session live
1. Click on the `gear` icon in your debugger view.

   ![dockerSharedFolders](images/debug/debugger-scaffolding.png)

1. Select **Docker: Debug in Container**
1. Choose the project file associated with the project you want to debug
1. Your project preference is saved & you no longer need to choose a project file on `kb(workbench.action.debug.start)`