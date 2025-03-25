---
Order: 9
Area: cpp
TOCTitle: CMake Quick Start
ContentId: 55b5d15c-a020-4808-941f-e0255751a5f7
PageTitle: Create a CMake project with the CMake Quick Start
DateApproved: 5/29/2024
MetaDescription: Create a Hello World project by using the CMake Quick Start in the CMake Tools Visual Studio Code extension
---
# Create a CMake hello world project with CMake Quick Start

In this article, you'll learn how to create a CMake hello world project from scratch using the CMake Tools extension in VS Code.

If you have an existing CMake project that already has a `CMakeLists.txt` file in the root directory but no CMake presets, you can skip to [Create a `CMakePresets.json` file](#Create-a-CMakePresets.json-file) to configure your project with CMake presets.

Otherwise, create a folder for a new project. From the Terminal window, create an empty folder called `HelloWorld`, navigate into it, and open VS Code in that folder by entering the following commands:

```bash
mkdir helloworld
cd helloworld
code .
```
The `code .` command opens VS Code in the current working folder, which becomes your "workspace".

## Create a CMakeLists.txt file

The CMake Tools extension can create the files for a basic CMake project for you. 

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and run the **CMake: Quick Start** command:

    ![Create CMake quickstart](images/cpp/cmake-quickstart-command-palette.png)

1. Enter a project name, and select and **C++** as the project language.

    This information will be written to `CMakeLists.txt` and a few initial source files.

    > **Note:** If you had other source code files in this folder that you wanted to add as targets to the `CmakeLists.txt`, an option to add these would now be given. But for this tutorial, we will stick with just the hello world file.

1. Select **CTest** as an additional option to add support for testing. You can also select **CPack** for CPack support.

    ![Additional Options](images/cpp/cmake-quickstart-options.png)

1. Next, select **Executable** as the project type to create a basic source file (`main.cpp`) that includes a basic `main()` function.

    ![Choose project type](images/cpp/cmake-choose-type.png)

    > **Note:** If you had wanted to create a basic source and header file, you would have selected **Library** instead. But for this tutorial, **Executable** will do. If you are prompted to configure IntelliSense for the folder, select **Allow**.

This successfully creates the `CMakeLists.txt` file, which tells the CMake tools how to build your project.

![Project contents](images/cpp/cmake-quickstart-cmakelists.png)

## Create a CMakePresets.json file

Next, continue with the CMake Quick Start to create a `CMakePresets.json` file.

1. Select **Add a New Preset** and **Create from Compilers**.

    The extension automatically scans for kits on your computer and creates a list of compilers found on your system.

1. Select the compiler you want to use.

    For example, depending on the compilers you have installed, you might see something like this:

    ![Add a new preset](images/cpp/cmake-quickstart-selectkit.png)

1. Enter a name for this new preset.

    The name for the preset will be written to `CMakePresets.json`.

After completing these steps, you should now have a complete hello world CMake project that contains the following files: `main.cpp`, `CMakeLists.txt`, and `CMakePresets.json`.

![Add a new preset](images/cpp/cmake-quickstart-projcontents.png)
