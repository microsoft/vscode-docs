---
Order: 14
Area: cpp
TOCTitle: FAQ
ContentId: 652c9cec-b8fa-4597-a894-f2ea9a095c31
PageTitle: C/C++ extension FAQ
DateApproved: 07/25/2019
MetaDescription: Frequently asked questions about the C/C++ extension in Visual Studio Code.
---
# Frequently asked questions

- [Why are my files corrupted on format?](#why-are-my-files-corrupted-on-format)
- [How do I get IntelliSense to work correctly?](#how-do-i-get-intellisense-to-work-correctly)
- [Why do I see red squiggles under Standard Library types?](#why-do-i-see-red-squiggles-under-standard-library-types)
- [How do I get the new IntelliSense to work with MinGW on Windows?](#how-do-i-get-the-new-intellisense-to-work-with-mingw-on-windows)
- [How do I get the new IntelliSense to work with the Windows Subsystem for Linux?](#how-do-i-get-the-new-intellisense-to-work-with-the-windows-subsystem-for-linux)
- [What is the difference between `includePath` and `browse.path` in **c_cpp_properties.json**?](#what-is-the-difference-between-includepath-and-browsepath-in-c_cpp_propertiesjson)
- [How do I re-create the IntelliSense database?](#how-do-i-re-create-the-intellisense-database)

## Why are my files corrupted on format?

Files can be corrupted due to the fact that you either have a multi-root workspace where one folder is a child of the other, or you are using symlinks to open your file. Reduce the folders in the workspace to one and remove the symlink. This should fix your problem.

## How do I get IntelliSense to work correctly?

Without any configuration, the extension will attempt to locate headers by searching your workspace folder and by emulating a compiler it finds on your computer. (e.g. cl.exe/WSL/MinGW for Windows, gcc/clang for macOS/Linux). If this automatic configuration is insufficient, you can modify the defaults by running the `C/C++: Edit Configurations (UI)` command. In that view, you can change the compiler you wish to emulate, the paths to include files you wish to use, preprocessor definitions, and more.

Or, if you install a build system extension that interfaces with our extension, you can allow that extension to provide the configurations for you. For example, the CMake Tools extension can configure projects that use the CMake build system. Use the `C/C++: Change Configuration Provider...` command to enable any such extension to provide the configurations for IntelliSense.

A third option for projects without build system extension support is to use a [`compile_commands.json`](https://clang.llvm.org/docs/JSONCompilationDatabase.html) file if your build system supports generating this file. In the "Advanced" section of the Configuration UI, you can supply the path to your `compile_commands.json` and the extension will use the compilation information listed in that file to configure IntelliSense.

**Note:** If the extension is unable to resolve any of the `#include` directives in your source code, it will not show linting information for the body of the source file. If you check the Problems window in VS Code, the extension will provide more information about which files it was unable to locate. If you want to show the linting information anyway, you can change the value of the `C_Cpp.errorSquiggles` setting.

## Why do I see red squiggles under Standard Library types?

The most common reason for this is missing include paths and defines. The easiest way to fix this on each platform is as follows:

**Linux/Mac**: Set `intelliSenseMode": "clang-x64` or `intelliSenseMode": "gcc-x64` and `compilerPath` in **c_cpp_properties.json** to the path to your compiler.

**Windows**: If you are using the Microsoft C++ compiler, set `intelliSenseMode": "msvc-x64`, but don't add the `compilerPath` property to **c_cpp_properties.json**. If you are using Clang for Windows, set `intelliSenseMode": "msvc-x64`, and `compilerPath` in **c_cpp_properties.json** to the path to your compiler.

## How do I get the new IntelliSense to work with MinGW on Windows?

See [Get Started with C++ and Mingw-w64 in Visual Studio Code](config-mingw.md).

## How do I get the new IntelliSense to work with the Windows Subsystem for Linux?

See [Get Started with C++ and Windows Subsystem for Linux in Visual Studio Code](config-wsl.md).

### includePath

This array of path strings is used by the "Default" IntelliSense engine. This new engine provides semantic-aware IntelliSense features and will be the eventual replacement for the Tag Parser that has been powering the extension since it was first released. It currently provides tooltips and error squiggles in the editor. The remaining features (for example, code completion, signature help, go to definition, ...) are implemented using the Tag Parser's database, so it is still important to ensure that the browse.path setting is properly set.

The paths that you specify for this setting are the same paths that you would send to your compiler via the `-I` switch. When your source files are parsed, the IntelliSense engine will prepend these paths to the files specified by your #include directives while attempting to resolve them. These paths are **not** searched recursively.

### browse.path

This array of path strings is used by the "Tag Parser" (a.k.a. "browse engine"). This engine will _recursively_ enumerate all files under the paths specified and track them as potential includes while tag parsing your project folder. To disable recursive enumeration of a path, you can append a `/*` to the path string.

When you open a workspace for the first time, the extension adds `${workspaceRoot}` to both arrays. If this is undesirable, you can open your **c_cpp_properties.json** file and remove it.

## How do I re-create the IntelliSense database?

Starting in version 0.12.3 of the extension, we added a command that will reset your IntelliSense database. Open the command palette and choose the "C/Cpp: Reset IntelliSense Database" command.
