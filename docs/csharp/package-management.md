---
Order: 8
Area: csharp
TOCTitle: Package Management
ContentId: 6e7d5ecf-d7aa-44b5-abc0-2257a2075906
PageTitle: C# package management with NuGet in Visual Studio Code
DateApproved: 6/6/2023
MetaDescription: C# package management with NuGet in Visual Studio Code
---

# NuGet in Visual Studio Code

NuGet is the package manager for .NET. It defines how packages for .NET are created, hosted, and consumed, and provides the tools for each of those roles. Importantly, NuGet also manages the dependency tree on behalf of a project, so you only need to focus on the packages that you're directly using in a project. For more information, go to the [NuGet documentation](https://learn.microsoft.com/nuget/what-is-nuget).

## Dependency management

### Automatic NuGet restore

For a .NET project, a package restore happens automatically when you create a project from a template, build, load, or make changes to an SDK-style project.

![Automatic NuGet package restore](images/package-management/automatic-nuget-package-restore.png)

For projects that use `<PackageReference>`, you can see the package references in the **Solution Explorer** section of Visual Studio Code.

![Package references in the Solution Explorer](images/package-management/package-references-solution-explorer.png)

Packages that don't install properly when a restore happens or you run a build will show error icons in **Solution Explorer**.

**Note**: At this time, you cannot right-click on projects to manage your NuGet packages and there is not a NuGet Package Manager user interface in Visual Studio Code. For more information on managing packages, see [Install and manage NuGet packages with the dotnet CLI](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-dotnet-cli).

### Project-to-project references

Project-to-project references may be added via the Solution Explorer UI. You can invoke the "Add Project Reference" command by right clicking on a project node in the Solution Explorer and selecting the command in the context menu.

![Project to project reference context menu](https://github.com/microsoft/vscode-docs/assets/28914569/470fa162-b608-4b8d-a56a-2654dde60b3b)

Having selected the command to add project reference, you may choose a project to add as a reference from a list of projects in the current solution.

**Note**: Shared projects and the selected project itself may not be chosen as a reference (self-reference is not supported)

![Project reference selction](https://github.com/microsoft/vscode-docs/assets/28914569/5cdec0f2-53ae-4fb3-a09e-e891dcd3fc71)

Once a project reference is selected, the csproj file and the Solution Explorer dependencies node will be updated to reflect this change. 
