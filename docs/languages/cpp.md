---
Order: 9
Area: languages
TOCTitle: C++
ContentId: D06C8C5C-2D3A-4B2E-B31F-12F1907E6402
PageTitle: C++ programming with Visual Studio Code
DateApproved: 7/24/2023
MetaDescription: Find out how to get the best out of Visual Studio Code and C++.
MetaSocialImage: images/cpp/languages-cpp-social.png
---
# C/C++ for Visual Studio Code

C/C++ support for Visual Studio Code is provided by a [Microsoft C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) to enable cross-platform C and C++ development on Windows, Linux, and macOS. When you create a `*.cpp` file, the extension adds features such as syntax highlighting (colorization), smart completions and hovers (IntelliSense), and error checking.

![C++ language features](images/cpp/msg-intellisense.png)

## Install the extension

1. Open VS Code.
1. Select the Extensions view icon on the Activity bar or use the keyboard shortcut (`kb(workbench.view.extensions)`).
1. Search for `'C++'`.
1. Select **Install**.

![C/C++ extension](images/cpp/cpp-extension.png)

## Set up your C++ Environment

C++ is a compiled language meaning your program's source code must be translated (compiled) before it can be run on your computer. The C/C++ extension doesn't include a C++ compiler or debugger, since VS Code as an editor relies on command-line tools for the development workflow. You need to install these tools or use the tools already installed on your computer.

### Check if you have a compiler installed

> **Note**: There may already be a C++ compiler and debugger provided by your academic or work development environment. Check with your instructors or colleagues for guidance on installing the recommended C++ toolset (compiler, debugger, project system, linter).

Common compilers that already come preinstalled on some platforms are the [GNU Compiler Collection](https://wikipedia.org/wiki/GNU_Compiler_Collection) (GCC) on Linux and the [Clang](https://wikipedia.org/wiki/Clang) tools with [Xcode](https://developer.apple.com/xcode/) on macOS.

To check if you already have them installed:

1. Open a new VS Code terminal window using (`kb(workbench.action.terminal.new)`)
2. Use the following command to check for the GCC compiler `g++`:

    ```bash
    g++ --version
    ```

    Or this command for the Clang compiler `clang`:

    ```bash
    clang --version
    ```

The output should show you the compiler version and details. If neither are found, make sure your compiler executable is in your platform path (`%PATH` on Windows, `$PATH` on Linux and macOS) so that the C/C++ extension can find it. Otherwise, use the instructions in the section below to install a compiler.

### Install a compiler

If you don't have a compiler installed, you can follow one of our installation tutorials:

**Windows**:

<a class="next-topic-btn" href="/docs/cpp/config-msvc#_prerequisites">Go to the MSVC tutorial</a>

<a class="next-topic-btn" href="/docs/cpp/config-mingw#_prerequisites">Go to the MinGW tutorial</a>

**Linux**:

<a class="next-topic-btn" href="/docs/cpp/config-linux#_prerequisites">Go to the GCC tutorial</a>

**macOS**:

<a class="next-topic-btn" href="/docs/cpp/config-clang-mac#_prerequisites">Go to the Clang tutorial</a>

> **Note**: If you would prefer a full Integrated Development Environment (IDE), with built-in compilation, debugging, and project templates (File > New Project), there are many options available, such as the [Visual Studio Community](https://visualstudio.microsoft.com/vs/community) edition.

## Example: Install MinGW-x64 on Windows

To understand the process, let's install Mingw-w64 via [MSYS2](https://www.msys2.org/). Mingw-w64 is a popular, free toolset on Windows. It provides up-to-date native builds of GCC, Mingw-w64, and other helpful C++ tools and libraries.

1. Download using [**this direct link to the MinGW installer**](https://github.com/msys2/msys2-installer/releases/download/2023-05-26/msys2-x86_64-20230526.exe).

1. Run the installer and follow the steps of the installation wizard. Note, MSYS2 requires 64 bit Windows 8.1 or newer.

1. In the wizard, choose your desired Installation Folder. Record this directory for later. In most cases, the recommended directory is acceptable. The same applies when you get to setting the start menu shortcuts step. When complete, ensure the **Run MSYS2 now** box is checked and select **Finish**. A MSYS2 terminal window  will then automatically open.

1. In this terminal, install the MinGW-w64 toolchain by running the following command:

    ```sh
    pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
    ```

1. Accept the default number of packages in the `toolchain` group by pressing `kbstyle(Enter)`.

    ![MYSS2 Installer](images/cpp/cpp-install-msys2-toolchain.png)

1. Enter `Y` when prompted whether to proceed with the installation.

1. Add the path of your MinGW-w64 `bin` folder to the Windows `PATH` environment variable by using the following steps:
   1. In the Windows search bar, type **Settings** to open your Windows Settings.
   1. Search for **Edit environment variables for your account**.
   1. In your **User variables**, select the `Path` variable and then select **Edit**.
   1. Select **New** and add the MinGW-w64 destination folder you recorded during the installation process to the list. If you selected the default installation steps, the path is: `C:\msys64\ucrt64\bin`.
   1. Select **OK**, and then select **OK** again in the **Environment Variables** window to update the `PATH` environment variable.
      You have to reopen any console windows for the updated `PATH` environment variable to be available.
1. Check that your MinGW-w64 tools are correctly installed and available, open a **new** Command Prompt and type:

```bash
gcc --version
g++ --version
gdb --version
```

You should see output that states which versions of GCC, g++ and GDB you have installed. If this is not the case, make sure your PATH entry matches the Mingw-w64 binary location where the compiler tools are located or reference the [troubleshooting section](/docs/cpp/config-mingw.md#_check-your-mingw-installation).

## Create a Hello World App

To make sure the compiler is installed and configured correctly, lets create a Hello World C++ program.

### Create a C++ file

1. On Windows, launch a Windows command prompt (Enter **Windows command prompt** in the Windows search bar). On macOS and Linux, you can enter these commands in the terminal.
1. Run the following commands. They are creating an empty folder called `projects` where you can place all your VS Code projects. The next commands create and navigate you to a subfolder called `helloworld`. From there, you are opening `helloworld` directly in VS Code using the `code` command.

```bat
mkdir projects
cd projects
mkdir helloworld
cd helloworld
code .
```

The "code ." command opens VS Code in the current working folder, which becomes your "workspace". Accept the [Workspace Trust](/docs/editor/workspace-trust.md) dialog by selecting **Yes, I trust the authors** since this is a folder you created.

Now create a new file called `helloworld.cpp` with the **New File** button in the File Explorer or **File** > **New File** command.

![File Explorer New File button](images/cpp/new-file.png)

### Add Hello World source code

Paste in the following source code:

```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World" << std::endl;
}
```

Now press `kb(workbench.action.files.save)` to save the file. You can also enable [AutoSave](/docs/editor/codebasics.md#save-auto-save) to automatically save your file changes, by checking **Auto Save** in the main **File** menu.

## Run helloworld.cpp

1. Make sure you have `helloworld.cpp` open so it is the active file in your editor.
2. Press the play button in the top right corner of the editor.

   ![Screenshot of helloworld.cpp and play button](images/cpp/run-play-button.png)

3. Choose **C/C++: g++.exe build and debug active file** from the list of detected compilers on your system.

   ![C++ debug configuration dropdown](images/cpp/select-gcc-compiler.png)

You are only prompted to choose a compiler the first time you run `helloworld.cpp`. This compiler becomes "default" compiler set in your `tasks.json` file.

4. After the build succeeds, you should see "Hello World" appear in the integrated **Terminal**.

    ![screenshot of program output](images/cpp/helloworld-terminal-output.png)

Congratulations! You've just run your first C++ program in VS Code! The next step is to learn more about the Microsoft C/C++ extension's language features such as IntelliSense, code navigation, build configuration, and debugging using one of the Tutorials in the next section.

## Tutorials

Get started with C++ and VS Code with tutorials for your environment:

- [GCC on Windows via MinGW](/docs/cpp/config-mingw.md)
- [Microsoft C++ on Windows](/docs/cpp/config-msvc.md)
- [GCC on Linux](/docs/cpp/config-linux.md)
- [GCC on Windows Subsystem For Linux](/docs/cpp/config-wsl.md)
- [Clang/LLVM on macOS](/docs/cpp/config-clang-mac.md)
- [CMake Tools on Linux](/docs/cpp/cmake-linux.md)

## Documentation

You can find more documentation on using the Microsoft C/C++ extension under the [C++ section](/docs/cpp) of the VS Code website, where you can find articles on:

- [Debugging](/docs/cpp/cpp-debug.md)
- [Editing](/docs/cpp/cpp-ide.md)
- [Settings](/docs/cpp/customize-default-settings-cpp.md)
- [FAQ](/docs/cpp/faq-cpp.md)

![C++ TOC on code.visualstudio.com](images/cpp/cpp-toc.png)

## Remote Development

VS Code and the C++ extension support [Remote Development](/docs/remote/remote-overview.md) allowing you to work over SSH on a remote machine or VM, inside a Docker container, or in the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl) (WSL).

To install support for Remote Development:

1. Install the VS Code [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).
1. If the remote source files are hosted in WSL, use the **WSL** extension.
1. If you are connecting to a remote machine with SSH, use the **Remote - SSH** extension.
1. If the remote source files are hosted in a container (for example, Docker), use the **Dev Containers** extension.

## Enhance completions with AI

[GitHub Copilot](https://copilot.github.com/) is an AI-powered code completion tool that helps you write code faster and smarter. You can use the [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) in VS Code to generate code, or to learn from the code it generates.

[![GitHub Copilot extension in the VS Code Marketplace](images/cpp/copilot-extension.png)](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

You can learn more about how to get started with Copilot in the [Copilot documentation](/docs/editor/github-copilot.md).

## Feedback

If you run into any issues or have suggestions for the Microsoft C/C++ extension, please file [issues and suggestions on GitHub](https://github.com/microsoft/vscode-cpptools/issues). If you haven't already provided feedback, you can take this [quick survey](https://www.research.net/r/VBVV6C6).
