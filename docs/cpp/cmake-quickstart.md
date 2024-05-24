# Create a CMake hello world project with CMake Quick Start

If you have an existing CMake project that already has a CMakeLists.txt file in the root directory, you can skip to [Create a CmakePresets.json file](#Create-a-CMakePresets.json-file) to configure your existing project.

Otherwise, create a folder for a new project. From the Terminal window, create an empty folder called HelloWorld, navigate into it, and open VS Code in that folder by entering the following commands:

```bash
mkdir helloworld
cd helloworld
code .
```
The code . command opens VS Code in the current working folder, which becomes your "workspace".

## Create a CMakeLists.txt file

The CMake Tools extension can create the files for a basic CMake project for you. Open the Command Palette (`kb(workbench.action.showCommands)`) and run the **CMake: Quick Start** command:

![Create CMake quickstart](images/cpp/cmake-quickstart-command-palette.png)

Enter a project name, and select and **C++** as the project language. This will be written to `CMakeLists.txt` and a few initial source files.

**Note:** If you had other source code files in this folder you wanted to add as targets to the CmakeLists.txt, an option to add these would now be given. But for this tutorial, we will stick with just the hello world file.

Select **CTest** as an additional option to add support for testing. You can also select **CPack** for CPack support.

![Additional Options](images/cpp/cmake-quickstart-options.png)

Next, select **Executable** as the project type to create a basic source file (`main.cpp`) that includes a basic `main()` function.

![Choose project type](images/cpp/cmake-choose-type.png)

**Note:** If you had wanted to create a basic source and header file, you would have selected **Library** instead. But for this tutorial, **Executable** will do. If you are prompted to configure IntelliSense for the folder, select **Allow**.

This sucessfully creates `CMakeLists.txt` (which tells the CMake tools how to build your project).

![Project contents](images/cpp/cmake-quickstart-cmakelists.png)

## Create a CMakePresets.json file

Next, let's continue with CMake Quick Start to create a CmakePresets.json file.

1. Select **Add a New Preset** and **Create from Compilers**.

  The extension automatically scans for kits on your computer and creates a list of compilers found on your system.

Select the compiler you want to use. For example, depending on the compilers you have installed, you might see something like this:

  ![Add a new preset](images/cpp/cmake-quickstart-selectkit.png)

1. Enter a name for this new preset. This will be written to `CMakePresets.json`.

After completing these steps, you should now have a complete hello world CMake project that contains the following files: `main.cpp`, `CMakeLists.txt`, and `CMakePresets.json`.

![Add a new preset](images/cpp/cmake-quickstart-projcontents.png)