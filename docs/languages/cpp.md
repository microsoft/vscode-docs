---
Order: 8
Area: languages
TOCTitle: C++
ContentId: D06C8C5C-2D3A-4B2E-B31F-12F1907E6402
PageTitle: C++ programming with Visual Studio Code
DateApproved: 2/25/2020
MetaDescription: Find out how to get the best out of Visual Studio Code and C++.
MetaSocialImage: images/cpp/languages_cpp.png
---
# C/C++ for Visual Studio Code (Preview)

C/C++ support for Visual Studio Code is provided by a [Microsoft C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) to enable cross-platform C and C++ development on Windows, Linux, and macOS.

![cpp extension](images/cpp/cpp-extension.png)

## Getting started

### C/C++ compiler and debugger

The C/C++ extension does not include a C++ compiler or debugger. You will need to install these tools or use those already installed on your computer.

Popular C++ compilers are:

- [GCC](https://gcc.gnu.org/) on Linux
- GCC via [Mingw-w64](http://www.mingw-w64.org/) on Windows
- [Microsoft C++ compiler](https://docs.microsoft.com/cpp/build/building-on-the-command-line?view=vs-2019) on Windows
- Clang for [XCode](https://developer.apple.com/xcode/) on macOS

Make sure your compiler executable is in your platform path so the extension can find it. You can check availability of your C++ tools by opening the Integrated Terminal (`kb(workbench.action.terminal.toggleTerminal)`) in VS Code and try running the executable (for example `g++ --help`).

### Install the Microsoft C/C++ extension

1. Open VS Code.
1. Click the Extensions view icon on the Sidebar (`kb(workbench.view.extensions)`).
1. Search for `c++`.
1. Click **Install**.

## Hello World tutorials

Get started with C++ and VS Code with Hello World tutorials for your environment:

- [GCC on Windows](/docs/cpp/config-mingw.md)
- [Microsoft C++ on Windows](/docs/cpp/config-msvc.md)
- [GCC on Linux](/docs/cpp/config-linux.md)
- [GCC on Windows Subsystem For Linux](/docs/cpp/config-wsl.md)
- [Clang/LLVM on macOS](/docs/cpp/config-clang-mac.md)

## Documentation

You can find more documentation on using the Microsoft C/C++ extension under the [C++ section](/docs/cpp), where you'll find topics on:

- [Debugging](/docs/cpp/cpp-debug.md)
- [Editing](/docs/cpp/cpp-ide.md)
- [Settings](/docs/cpp/customize-default-settings-cpp.md)
- [FAQ](/docs/cpp/faq-cpp.md)

## Remote Development

VS Code and the C++ extension support [Remote Development](/docs/remote/remote-overview.md) allowing you to work over SSH on a remote machine or VM, inside a Docker container, or in the [Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl) (WSL).

To install support for Remote Development:

1. Install the VS Code [Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).
1. If the remote source files are hosted in WSL, use the **Remote - WSL** extension.
1. If you are connecting to a remote machine with SSH, use the **Remote - SSH** extension.
1. If the remote source files are hosted in a container (for example, Docker), use the **Remote - Containers** extension.

## Feedback

If you run into any issues or have suggestions for the Microsoft C/C++ extension, please file [issues and suggestions on GitHub](https://github.com/microsoft/vscode-cpptools/issues). If you haven't already provided feedback, please take this [quick survey](https://www.research.net/r/VBVV6C6) to help shape this extension for your needs.
