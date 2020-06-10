---
Order: JTW
Area: cpp
TOCTitle: Get started with CMake Tools on Linux
ContentId: 86543311-5452-4b1f-a44c-03cc3df04c3f
PageTitle: Get started with CMake Tools on Linux 
DateApproved: 06/11/2020
MetaDescription: Get started with the CMake Tools Visual Studio Code extension on Linux 
---
# Get started with CMake Tools on Linux

In this tutorial, use the CMake Tools extension for Visual Studio Code to configure, build, and debug a simple CMake project on Linux.  

If you have any trouble, please file an issue for this tutorial in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Prerequisites

To successfully complete this tutorial, you need the following:

1. Install [Visual Studio Code](/download).
1. Install the [C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools). You can install the C/C++ extension by searching for 'c++' in the Extensions view (`kb(workbench.view.extensions)`).

    ![C/C++ extension](images/cpp/cpp-extension.png)

1. Install the [CMake Tools extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools). You can install the C/C++ extension by searching for 'cmake tools' in the Extensions view (`kb(workbench.view.extensions)`).

    ![CMake tools extension](images/cpp/cmake-extension.png)

1. Have a compiler, debugger, and CMake installed on your machine.

### Ensure that CMake is installed

The VS Code extension uses CMake installed on your system. For best results, you want a version greater than 3.15.

To check if CMake is already installed on your system, open a Terminal window and enter the following command:

```bash
cmake --version
```

To install, or get the latest version of CMake on your system, see the instructions for your platform on the [Kitware APT Repository](https://apt.kitware.com/).

### Ensure that a compiler and debugger are installed

Although you'll use VS Code to edit your source code, you'll compile and debug the source code using the compiler and debugger installed on your system.

For example, for this tutorial which uses Ubuntu, we'll use the GCC compiler and GDB to debug. You'll also need CMake. These tools are not installed by default on Ubuntu, so you need to install them. Fortunately, that's easy.

### Check if GCC is installed

 To check if GCC is already installed on your system, open a Terminal window and enter the following command:

```bash
gcc -v
```

If GCC isn't installed, run the following command from the terminal window to update the Ubuntu package lists. An out-of-date Linux distribution can sometimes interfere with attempts to install new packages.

```bash
sudo apt-get update
```

Next install the GNU compiler tools and the GDB debugger with this command:

```bash
sudo apt-get install build-essential gdb
```

## Create a CMake quickstart

Now you'll create a CMake project to that you can try out the compile/debug cycle using CMake.

From the terminal window, create an empty folder called `cmakeQuickStart`, navigate into it, and open VS Code in that folder by entering the following commands:

```cmd
mkdir cmakeQuickStart
cd cmakeQuickStart
code .
```

The `code .` command opens VS Code in the current working folder, which becomes your "workspace".

### Create a CMake hello world project

The first thing you will do is create a CMake quickstart project. Open the Command Palette (`kb(workbench.action.showCommands)`) and run the **CMake: Quick Start** command:

![Create CMake quickstart](images/cpp/cmake-quickstart-command-palette.png)

Enter a project name. This will be written to `CMakeLists.txt` and a few initial source files.

Next, select **Executable** as the project type to create a basic source file (`main.cpp`) that includes a basic `main()` function. **Note:** If you had wanted to create a basic source and header file, you would have selected **Library** instead. But for this tutorial, **Executable** will do.

If you are prompted to allow intellisense for the folder, select **Allow**.

![Choose project type](images/cpp/cmake-choose-type.png)

This creates a hello world CMake project containing `main.cpp`, `CMakeLists.txt` (which tells the CMake tools how to build your project), and a folder named **build** for your build files:

![Project contents](images/cpp/cmake-project-contents.png)

Next, select a kit. A kit contains  project-agnostic, configuration-agnostic build instructions for your code--such as the name of the compiler you're using.

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and run **CMake: Select a Kit**. If you don't see any compilers listed, select **Scan for kits**. This will create a list of compilers that could be found on your system.

1. Open the Command Palette again (`kb(workbench.action.showCommands)`) and run **CMake: Select a Kit**.  Select the compiler you want to use. For example, depending on the compilers you have installed, you might see something like:

    ![Select the kit](images/cpp/cmake-selectkit.png)

## Configure Hello World

There are two things you must do to configure your CMake project: select a kit (which we just did) and select a variant.  

### Select a kit

The kit you selected previously is shown in the status bar. For example:

![Selected kit in status bar](images/cpp/cmake-kit-statusbar.png)

To change the kit, you can click on the kit in the status bar, or run the **CMake: Select a kit** again from the Command Palette. If you don't see the compiler you're looking for, you can edit the `CMakeKits.json` file directly to add it yourself.

### Select a variant

A variant contains instructions for how to build your project. By default, the CMake Tools extension provides four variants, each corresponding to a default build type: Debug, Release, MinRelSize, and RelWithDebInfo.

To select a variant, open the Command Palette (`kb(workbench.action.showCommands)`) run the **CMake: Select Variant** command.

![Select variant](images/cpp/cmake-select-variant.png)

Select "Debug" to include debug information with your build.  

![Select debug variant type](images/cpp/cmake-variant-type.png)

The selected variant will appear in the status bar next to the active kit.  

### CMake: Configure

Now that you've selected a kit and a variant, open the Command Palette (`kb(workbench.action.showCommands)`) run the **CMake: Configure** command to configure your project. This generates build files and writes them to the project's build folder.

## Build hello world

After configuring your project, you're ready to build. Open the Command Palette (`kb(workbench.action.showCommands)`) and run the **CMake: Build**, or simply select the "Build" button from the status bar.  

![Build](images/cpp/cmake-build.png)

You can select which targets you'd like to build by selecting **CMake: Set Build Target** from the Command Palette. By default, CMake Tools builds all targets.

The selected target will appear in the status bar next to the **Build** button.

## Debug hello world

To run and debug your project, open the Command Palette (`kb(workbench.action.showCommands)`) and run **CMake: Debug**.

To change the target to launch, open the Command Palette (`kb(workbench.action.showCommands)`) and select the **CMake: Set Debug Target** command.

## Next steps

- Explore the [VS Code User Guide](/docs/editor/codebasics.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md)