---
Order: 8
Area: languages
TOCTitle: C++
ContentId: D06C8C5C-2D3A-4B2E-B31F-12F1907E6402
PageTitle: C++ programming with Visual Studio Code
DateApproved: 06/24/2019
MetaDescription: Find out how to get the best out of Visual Studio Code and C++.
MetaSocialImage: images/cpp/languages_cpp.png
---
# C/C++ for Visual Studio Code (Preview)

C/C++ support for Visual Studio Code is provided by a [Microsoft C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) to enable cross-platform C and C++ development on Windows, Linux, and macOS. The extension is still in preview and our focus is code editing, navigation, and debugging support for C and C++ code everywhere that VS Code runs. The extension also supports [Remote Development](../remote/remote-overview) in the [Visual Studio Code Insiders build](https://code.visualstudio.com/insiders/).

![cpp hero](images/cpp/cpp-hero.png)

If you just want a lightweight tool to edit your C++ files, Visual Studio Code is a great choice. But if you want the best possible experience for editing, testing and debugging your existing Visual C++ projects or debugging on Windows, we recommend Visual Studio. [Visual Studio Community](https://visualstudio.microsoft.com/vs/community) is a free edition. It includes:

- support for CMake or any other build system
- support for Clang and GCC as well as the Microsoft C++ compiler
- support for CTest, Google Test and Boost.Test as well as the Microsoft Native Test Framework
- C++ code analysis tools including C++ Core Guidelines checkers
- the state-of-the-art Visual Studio debugger
- and much more.

If you run into any issues or have suggestions for the Microsoft C/C++ extension, please file [issues and suggestions on GitHub](https://github.com/Microsoft/vscode-cpptools/issues). If you haven't already provided feedback, please take this [quick survey](https://www.research.net/r/VBVV6C6) to help shape this extension for your needs.

## Getting Started

**To install the Microsoft C/C++ extension:**

1. Open VS Code.
1. Click the Extensions View icon on the Sidebar.
1. Search for `c++`.
1. Click **Install**, then click **Reload**.

![cpp extension](images/cpp/cpp-extension.png)

To install support for [Remote Development](../remote/remote-overview.md):

1. Install the [Visual Studio Code Insiders build](https://code.visualstudio.com/insiders/). You can install this side by side with the stable build.
1. Install the [Visual Studio Code Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).
1. If the remote source files are hosted in WSL, download the **Remote - WSL** extension.
1. If you are connecting to a remote machine with SSH, download the **Remote - SSH** extension.
1. If the remote source files are hosted in a container (i.e. Docker), download the **Remote - Containers** extension.

**Note**: The C/C++ extension does not include a C++ compiler or debugger. You will need to install these tools or use those already installed on your computer. Popular C++ compilers are [GCC](https://gcc.gnu.org/) on Linux or in a [Mingw-w64](http://www.mingw-w64.org/) environment on Windows, Clang for [XCode](https://developer.apple.com/xcode/) on macOS, and the [Microsoft C++ compiler](https://docs.microsoft.com/cpp/build/building-on-the-command-line?view=vs-2019) on Windows. Make sure your compiler executable is in your platform path so the extension can find it. The extension also supports the [Windows Subsystem for Linux](https://github.com/Microsoft/vscode-cpptools/blob/master/Documentation/LanguageServer/Windows%20Subsystem%20for%20Linux.md).

For instructions on configuring VS Code for specific environments, see:

- [Get Started with C++ and WSL](/docs/cpp/config-wsl.md)
- [Get Started with C++ and Mingw-w64](/docs/cpp/config-mingw.md)
- [Get Started with C++ and Clang/LLVM on macOS](/docs/cpp/config-clang-mac.md)
- [Get Started with C++ MSVC](/docs/cpp/config-msvc.md)
