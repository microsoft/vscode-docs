---
Order: 9
Area: languages
TOCTitle: C++
ContentId: D06C8C5C-2D3A-4B2E-B31F-12F1907E6402
PageTitle: C++ programming with Visual Studio Code
DateApproved: 12/13/2020
MetaDescription: Find out how to get the best out of Visual Studio Code and C++.
MetaSocialImage: images/cpp/languages_cpp.png
---
# C/C++ for Visual Studio Code

C/C++ support for Visual Studio Code is provided by a [Microsoft C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) to enable cross-platform C and C++ development on Windows, Linux, and macOS.

![cpp extension](images/cpp/cpp-extension.png)

## Install the extension

1. Open VS Code.
1. Select the Extensions view icon on the Activity bar or use the keyboard shortcut (`kb(workbench.view.extensions)`).
1. Search for `'C++'`.
1. Select **Install**.

![Search for c++ in the Extensions view](images/cpp/search-cpp-extension.png)

After you install the extension, when you open or create a `*.cpp` file, you will have syntax highlighting (colorization), smart completions and hovers (IntelliSense), and error checking.

![C++ language features](images/cpp/msg-intellisense.png)

## Install a compiler

C++ is a compiled language meaning your program's source code must be translated (compiled) before it can be run on your computer. VS Code is first and foremost an editor, and relies on command-line tools to do much of the development workflow. The C/C++ extension does not include a C++ compiler or debugger. You will need to install these tools or use those already installed on your computer.

There may already be a C++ compiler and debugger provided by your academic or work development environment. Check with your instructors or colleagues for guidance on installing the recommended C++ toolset (compiler, debugger, project system, linter).

Some platforms, such as Linux or macOS, have a C++ compiler already installed. Most Linux distributions have the [GNU Compiler Collection](https://wikipedia.org/wiki/GNU_Compiler_Collection) (GCC) installed and macOS users can get the [Clang](https://wikipedia.org/wiki/Clang) tools with [XCode](https://developer.apple.com/xcode/).

### Check if you have a compiler installed

Make sure your compiler executable is in your platform path (`%PATH` on Windows, `$PATH` on Linux and macOS) so that the C/C++ extension can find it. You can check availability of your C++ tools by opening the Integrated Terminal (`kb(workbench.action.terminal.toggleTerminal)`) in VS Code and trying to directly run the compiler.

Checking for the GCC compiler `g++`:

```bash
g++ --version
```

Checking for the Clang compiler `clang`:

```bash
clang --version
```

> **Note**: If you would prefer a full Integrated Development Environment (IDE), with built-in compilation, debugging, and project templates (File > New Project), there are many options available, such as the [Visual Studio Community](https://visualstudio.microsoft.com/vs/community) edition.

If you don't have a compiler installed, in the example below, we describe how to install the Minimalist GNU for Windows (MinGW) C++ tools (compiler and debugger). MinGW is a popular, free toolset for Windows. If you are running VS Code on another platform, you can read the [C++ tutorials](#tutorials), which cover C++ configurations for Linux and macOS.

## Example: Install MinGW-x64

We will install Mingw-w64 via the SourceForge website. You can use this [Mingw-w64 link](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe/download) to download the Windows Mingw-w64 installer.

1. Run the installer, which should be named `mingw-w64-install.exe` in your Download folder.

   ![MinGW installation dialog welcome page](images/cpp/welcome-mingw-w64.png)

2. For **Architecture** select **x86_64** and then select **Next**.

   ![Choose x86_64 on the MinGW settings page](images/cpp/choose-x86-64.png)

3. On the **Installation Folder** page, use the default location for the **Destination folder**. Copy the location as you will need it later.
4. Select **Next** to start the installation.

### Add the MinGW compiler to your path

Add the path to your Mingw-w64 `bin` folder to the Windows `PATH` environment variable by using the following steps:

   1. In the Windows search bar, type 'settings' to open your Windows Settings.
   1. Search for **Edit environment variables for your account**.
   1. Choose the `Path` variable and then select **Edit**.
   1. Select **New** and add the Mingw-w64 destination folder path, with `\mingw64\bin` appended, to the system path. The exact path depends on which version of Mingw-w64 you have installed and where you installed it. If you used the settings above to install Mingw-w64, then add this to the path: `C:\Program Files\mingw-w64\x86_64-8.1.0-posix-seh-rt_v6-rev0\mingw64\bin`.
   1. Select **OK** to save the updated PATH. You will need to reopen any console windows for the new PATH location to be available.

### Check your MinGW installation

To check that your Mingw-w64 tools are correctly installed and available, open a **new** Command Prompt and type:

```bash
g++ --version
gdb --version
```

If you don't see the expected output or `g++` or `gdb` is not a recognized command, check your installation (Windows **Control Panel** > **Programs** > **Programs and Features**) and make sure your PATH entry matches the Mingw-w64 binary location where the compiler tools are located.

## Hello World

To make sure the compiler is installed and configured correctly, we'll create the simplest Hello World C++ program.

Create a folder called "HelloWorld" and open VS Code in that folder (`code .` opens VS Code in the current folder):

```bash
mkdir HelloWorld
cd HelloWorld
code .
```

Now create a new file called `helloworld.cpp` with the **New File** button in the File Explorer or **File** > **New File** command.

![File Explorer New File button](images/cpp/new-file.png)

![helloworld.cpp file](images/cpp/hello-world-cpp.png)

### Add Hello World source code

Now paste in this source code:

```cpp
#include <iostream>

using namespace std;

int main()
{
    cout << "Hello World" << endl;
}
```

Now press `kb(workbench.action.files.save)` to save the file. You can also enable [Auto Save](/docs/editor/codebasics.md#saveauto-save) to automatically save your file changes, by checking **Auto Save** in the main **File** menu.

### Build Hello World

Now that we have a simple C++ program, let's build it. Select the **Terminal** > **Run Build Task** command (`kb(workbench.action.tasks.build)`) from the main menu.

![Run Build Task menu option](images/cpp/run-build-task.png)

This will display a dropdown with various compiler task options. If you are using a GCC toolset like MinGW, you would choose **C/C++: g++.exe build active file**.

![Select g++.exe task](images/cpp/select-gpp-task.png)

This will compile `helloworld.cpp` and create an executable file called `helloworld.exe`, which will appear in the File Explorer.

![helloworld.exe in the File Explorer](images/cpp/hello-world-exe.png)

### Run Hello World

From a command prompt or a new VS Code Integrated Terminal, you can now run your program by typing ".\helloworld".

![Run hello world in the VS Code Integrated Terminal](images/cpp/run-hello-world.png)

If everything is set up correctly, you should see the output "Hello World".

This has been a very simple example to help you get started with C++ development in VS Code. The next step is to try one of the tutorials listed below on your platform (Windows, Linux, or macOS) with your preferred toolset (GCC, Clang, Microsoft C++) and learn more about the Microsoft C/C++ extension's language features such as IntelliSense, code navigation, build configuration, and debugging.

## Tutorials

Get started with C++ and VS Code with tutorials for your environment:

- [GCC on Windows via MinGW](/docs/cpp/config-mingw.md)
- [Microsoft C++ on Windows](/docs/cpp/config-msvc.md)
- [GCC on Linux](/docs/cpp/config-linux.md)
- [GCC on Windows Subsystem For Linux](/docs/cpp/config-wsl.md)
- [Clang/LLVM on macOS](/docs/cpp/config-clang-mac.md)
- [CMake Tools on Linux](/docs/cpp/cmake-linux.md)

## Documentation

You can find more documentation on using the Microsoft C/C++ extension under the [C++ section](/docs/cpp) of the VS Code website, where you'll find topics on:

- [Debugging](/docs/cpp/cpp-debug.md)
- [Editing](/docs/cpp/cpp-ide.md)
- [Settings](/docs/cpp/customize-default-settings-cpp.md)
- [FAQ](/docs/cpp/faq-cpp.md)

![C++ TOC on code.visualstudio.com](images/cpp/cpp-toc.png)

## Remote Development

VS Code and the C++ extension support [Remote Development](/docs/remote/remote-overview.md) allowing you to work over SSH on a remote machine or VM, inside a Docker container, or in the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl) (WSL).

To install support for Remote Development:

1. Install the VS Code [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).
1. If the remote source files are hosted in WSL, use the **Remote - WSL** extension.
1. If you are connecting to a remote machine with SSH, use the **Remote - SSH** extension.
1. If the remote source files are hosted in a container (for example, Docker), use the **Remote - Containers** extension.

## Feedback

If you run into any issues or have suggestions for the Microsoft C/C++ extension, please file [issues and suggestions on GitHub](https://github.com/microsoft/vscode-cpptools/issues). If you haven't already provided feedback, please take this [quick survey](https://www.research.net/r/VBVV6C6) to help shape this extension for your needs.
