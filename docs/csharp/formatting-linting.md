---
Order: 6
Area: csharp
TOCTitle: Formatting and Linting
ContentId: 34c5ba31-5844-4eca-8fef-dabb6e917314
PageTitle: Formatting and linting C# code in Visual Studio Code
DateApproved: 6/6/2023
MetaDescription: Formatting and linting C# source code in Visual Studio Code
---

# Formatting and Linting

You can format your C# source code using the [C# Dev Kit extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit), a lightweight extension to enhance your C# development experience in Visual Studio Code.

Navigate to **File** > **Preferences** > **Settings** (`kb(workbench.action.openSettings)`) to customize how your `.cs` files are formatted.  The Settings editor gives you a list of different formatting options (particularly under **Commonly Used** and **Text Editor**) that you can adjust across your specific workspace or your entire user profile.

![Commonly Used menu](images/formatting-linting/commonly-used-menu.png)

## How to support EditorConfig with C# Dev Kit

**EditorConfig (.editorconfig) files** are supported with the [EditorConfig for VS Code extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), letting you customize formatting options in your C# project.  These files are also used to override the user/workspace settings with the settings you specify in them.

![Editorconfig file example](images/formatting-linting/editorconfig-example.png)
