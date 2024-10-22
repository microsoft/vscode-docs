---
Order: 9
Area: csharp
TOCTitle: Package Management
ContentId: 6e7d5ecf-d7aa-44b5-abc0-2257a2075906
PageTitle: C# package management with NuGet in Visual Studio Code
DateApproved: 6/6/2023
MetaDescription: C# package management with NuGet in Visual Studio Code
---

# NuGet in Visual Studio Code

NuGet is the package manager for .NET. It defines how packages for .NET are created, hosted, and consumed, and provides the tools for each of those functions. NuGet also manages the dependency tree on behalf of a project, so you only need to focus on the packages that you're directly using in a project. In Visual Studio Code, you can manage your NuGet packages either directly from the C# Dev Kit Solution explorer, or by using the Command Palette. To learn more about NuGet, go to the [NuGet documentation](https://learn.microsoft.com/nuget/what-is-nuget).

* [NuGet Commands in C# Dev Kit](#nuget-commands-in-c-dev-kit)
* [Dependency Management](#dependency-management)

## NuGet commands in C# Dev Kit

In C# Dev Kit, you can perform NuGet package operations in either of two ways: by using the Command Palette (`kb(workbench.action.showCommands)`) or by right-clicking in the C# Dev Kit Solution explorer. The following sections describe how to use each NuGet command through both of the two methods.

### Add a package

1. To add a NuGet package to your project, use the command **NuGet: Add NuGet Package** in the Command Palette (`kb(workbench.action.showCommands)`).

    ![Screenshot showing command 'NuGet: Add NuGet Package' in the command palette ](images/package-management/nuget-command-addpackage.png)

2. If you have more than one project in your solution, you are asked to select which project you want to add the package to.

    ![Screenshot showing quickpick menu with dropdown options "Project" and "Project2"](images/package-management/nuget-command-addackage-projectselection.png)

3. Next, enter a search term to search for NuGet packages by name.

    ![Screenshot showing command palette search bar with placeholder text that reads "Enter a search term to search for a NuGet package."](images/package-management/nuget-command-addpackage-search1.png)

    The Quick Pick shows a list of example NuGet packages to choose from.

    ![Screenshot showing quickpicks dropdown menu with placeholder text that reads: "Select a NuGet package". The quickpick options show a list of example NuGet packages to choose from.](images/package-management/nuget-command-addpackage-search2.png)

4. Next, select the version you want to apply.

    ![Screenshot showing quickpicks dropdown menu with placeholder text that reads: "Select a NuGet package version". The quickpick options show a list of example NuGet package versions to choose from.](images/package-management/nuget-command-addpackage-versionselection.png)

5. After you select a package and version number, C# Dev Kit adds it to your project and updates your project file and references.

### Update a package

1. To update a NuGet package in your project, use the command **NuGet: Update NuGet Package** in the Command Palette (`kb(workbench.action.showCommands)`).

2. If you have more than one project in your solution, you are asked to select which project contains the package that you would like to update.

3. Next, choose which package to update from the list of packages that are currently installed in your project and that have an update available. If no packages in your solution have an update available, you see a message notifying you of this.

4. Finally, you can select which version you would like to update the package to from a dropdown list of available versions.

    ![Screenshot showing quickpicks dropdown menu with placeholder text that reads: "Select a NuGet package version". The quickpick options show a list of example NuGet packages to choose from. There are indicators on the list to show which version is currently installed in the users project ("current"), and which is the latest available version ("latest")](images/package-management/nuget-command-update-versionselector.png)

5. C# Dev Kit then performs the necessary changes and updates your project file and references.

### Remove a package

1. To remove a NuGet package from your project, use the command **NuGet: Remove NuGet Package** in the Command Palette (`kb(workbench.action.showCommands)`).

2. If you have more than one project in your solution, you are asked to select which project that you would like to remove a package from.

3. Next, choose which package you want to remove from the list of packages that are currently installed in your project.

4. C# Dev Kit then performs the necessary changes and updates your project file and references.

## Dependency management

### Automatic NuGet restore

For a .NET project, a package restore happens automatically when you create a project from a template, build, load, or make changes to an SDK-style project. You can view in the progress and logs in the Ouput panel.

![Automatic NuGet package restore](images/package-management/automatic-nuget-package-restore.png)

For projects that use `<PackageReference>`, you can see the package references in the **Solution Explorer** section of Visual Studio Code.

![Package references in the Solution Explorer](images/package-management/package-references-solution-explorer.png)

Packages that don't install properly when a restore happens or you run a build will show error icons in **Solution Explorer**.

**Note**: At this time, you cannot right-click on projects to manage your NuGet packages and there is not a NuGet Package Manager user interface in Visual Studio Code. For more information on managing packages, see [Install and manage NuGet packages with the dotnet CLI](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-dotnet-cli).
