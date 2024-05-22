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

NuGet is the package manager for .NET. It defines how packages for .NET are created, hosted, and consumed, and provides the tools for each of those roles. You can manage your NuGet packages directly from the C# Dev Kit Solution explorer and commands in the Command Palette. NuGet also manages the dependency tree on behalf of a project, so you only need to focus on the packages that you're directly using in a project. For more information, go to the [NuGet documentation](https://learn.microsoft.com/nuget/what-is-nuget).

* [NuGet Commands in C# Dev Kit](#nuget-commands-in-c-dev-kit)
* [Dependency Management](#dependency-management)

## NuGet Commands in C# Dev Kit

In C# Dev Kit, you can perform NuGet package operations in either of two ways: commands in the Command Palette or through right-click actions in the C# Dev Kit Solution explorer. The below documentation details how to use each NuGet command through both of the two methods.

### Add a package

To add a NuGet package to your project, use the command **NuGet: Add NuGet Package**.

![alt text](images/package-management/nuget-command-addpackage.png)

If you have more than one project in your solution, you will be asked to select which project you want to add the package to.

![alt text](images/package-management/nuget-command-addackage-projectselection.png)

Then you can search for packages by name.

![alt text](images/package-management/nuget-command-addpackage-search1.png)

![alt text](images/package-management\nuget-command-addpackage-search2.png)

Next, select the version you want to apply.

![alt text](images/package-management/nuget-command-addpackage-versionselection.png)

Once you select a package and version number, C# Dev Kit will add it to your project and update your project file and references.

### Update a package

To update a NuGet package in your project, use the command **NuGet: Update NuGet Package**. If you have more than one project in your solution, you will be asked to select which project contains the package that you would like to update. Next, you will see a list of the packages that are currently installed in your project which have an update available. Choose which one you want to update. If no packages in your solution have an update available, you will see a message notifying you of this.

Finally, you will be able to select which version you would like to update the package to from a dropdown list of all available versions.

![alt text](images/package-management/nuget-command-update-versionselector.png)

C# Dev Kit will then perform the necessary changes and update your project file and references.

### Remove a package

To remove a NuGet package from your project, use the command “NuGet: Remove NuGet Package.” If you have more than one project in your solution, you will be asked to select which project that you would like to remove a package from.
NExt, you will see a list of the packages that are currently installed in your project and let you choose which one you want to remove. C# Dev Kit will then perform the necessary changes and update your project file and references.

## Dependency management

### Automatic NuGet restore

For a .NET project, a package restore happens automatically when you create a project from a template, build, load, or make changes to an SDK-style project.

![Automatic NuGet package restore](images/package-management/automatic-nuget-package-restore.png)

For projects that use `<PackageReference>`, you can see the package references in the **Solution Explorer** section of Visual Studio Code.

![Package references in the Solution Explorer](images/package-management/package-references-solution-explorer.png)

Packages that don't install properly when a restore happens or you run a build will show error icons in **Solution Explorer**.

**Note**: At this time, you cannot right-click on projects to manage your NuGet packages and there is not a NuGet Package Manager user interface in Visual Studio Code. For more information on managing packages, see [Install and manage NuGet packages with the dotnet CLI](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-dotnet-cli).
