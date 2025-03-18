---
Order: 3
Area: other
TOCTitle: Unity
ContentId: 75CD2FA6-2F91-428A-A88D-880611AE75A0
PageTitle: Visual Studio Code and Unity
DateApproved: 8/4/2023
MetaDescription: Visual Studio Code as the editor for Unity
---
# Unity Development with VS Code

Visual Studio Code makes it easy to write and debug your C# scripts for Unity.

[![Unity Overview](images/unity/unity-overview.png)](/assets/docs/other/unity/unity-overview.png)

This guide will help you make Unity and Visual Studio Code work together. If you're looking for resources to learn C#, check out our C# curriculum.

<a class="install-extension-btn" href="https://aka.ms/selfguidedcsharp">Learn C# Curriculum</a>

If you're looking for resources to learn Unity, check out the learning section of the Unity website.

<a class="install-extension-btn" href="https://unity.com/learn">Learn Unity</a>

Read on to find out how to configure Unity and your project to get the best possible experience.

## Install

1. You will need at least [Unity](https://www.unity.com) 2021 installed.

1. If you haven't already done so, [install Visual Studio Code](https://code.visualstudio.com).

1. Next, install the [Unity for Visual Studio Code](https://aka.ms/vscode-unity) extension from the Visual Studio Marketplace. For additional details on installing extensions, read [Extension Marketplace](/docs/editor/extensions/extension-marketplace.md). The Unity extension is published by Microsoft.

Installing the Unity extension installs all its dependencies required to write [C#](/docs/languages/csharp.md) with Visual Studio Code, including the [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit).

## Set up Unity

### Update the Visual Studio Package

The Unity extension for Visual Studio Code depends on the `Visual Studio Editor` Unity Package. In Unity, open up **Windows**, **Packages**. Make sure the `Visual Studio Editor` package is upgraded to `2.0.20` or above.

![Unity Package Manager](images/unity/unity-packagemanager.png)

> **Note**: The `Visual Studio Code Editor` package published by Unity is a legacy package from Unity that is not maintained anymore.

## Set VS Code as Unity's external editor

Open up **Unity Preferences**, **External Tools**, then select Visual Studio Code as **External Script Editor**.

![Unity Preferences](images/unity/unity-externaltools.png)

## Editing Evolved

You are now ready to start editing with Visual Studio Code. Double-clicking on a C# script in Unity will open Visual Studio Code. Here is a list of some of the things you can expect:

* Syntax Highlighting
* Bracket matching
* IntelliSense
* Snippets
* CodeLens
* Peek
* Go-to Definition
* Code Actions/Lightbulbs
* Go to symbol
* Hover

Two topics that will help you are [Basic Editing](/docs/editor/editing/codebasics.md) and [C#](/docs/languages/csharp.md). In the image below, you can see VS Code showing hover context, peeking references, and more.

![editing evolved example](images/unity/peekreferences.png)

## Debugging

By default, your Unity project is setup with a debugger configuration to attach the Unity debugger to the Unity Editor instance opened on the project. Press `kb(workbench.action.debug.start)` to start a debugging session.

If you want to debug a Unity standalone player, the easiest way is to use the **Attach Unity Debugger** command.

Alternatively, you can modify the `.vscode/launch.json` file in your project and add a new debugger configuration for an IP endpoint you control:

```json
    {
        "name": "Attach to Xbox",
        "type": "vstuc",
        "request": "attach",
        "endPoint": "127.0.0.1:56321"
    }
```

## Next steps

Read on to learn more about:

* [Basic Editing](/docs/editor/editing/codebasics.md) - Learn about the powerful Visual Studio Code editor.
* [Code Navigation](/docs/editor/editing/editingevolved.md) - Move quickly through your source code.
* [C#](/docs/languages/csharp.md) - Learn about the C# support in Visual Studio Code.
