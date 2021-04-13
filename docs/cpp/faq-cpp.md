---
Order: 12
Area: cpp
TOCTitle: FAQ
ContentId: 652c9cec-b8fa-4597-a894-f2ea9a095c31
PageTitle: C/C++ extension FAQ
DateApproved: 05/22/2020
MetaDescription: Frequently asked questions about the C/C++ extension in Visual Studio Code.
---
# Frequently asked questions

- [Why are my files corrupted on format?](#why-are-my-files-corrupted-on-format)
- [How do I get IntelliSense to work correctly?](#how-do-i-get-intellisense-to-work-correctly)
- [Why do I see red squiggles under Standard Library types?](#why-do-i-see-red-squiggles-under-standard-library-types)
- [How do I get the new IntelliSense to work with MinGW on Windows?](#how-do-i-get-the-new-intellisense-to-work-with-mingw-on-windows)
- [How do I get the new IntelliSense to work with the Windows Subsystem for Linux?](#how-do-i-get-the-new-intellisense-to-work-with-the-windows-subsystem-for-linux)
- [What is the difference between includePath and browse.path in c_cpp_properties.json?](#what-is-the-difference-between-includepath-and-browsepath)
- [How do I recreate the IntelliSense database?](#how-do-i-recreate-the-intellisense-database)
- [What is the ipch folder?](#what-is-the-ipch-folder)
- [How do I disable the IntelliSense cache (ipch)?](#how-do-i-disable-the-intellisense-cache-ipch)
- [How do I set up debugging?](#how-do-i-set-up-debugging)
- [How do I enable debug symbols?](#how-do-i-enable-debug-symbols)
- [Why is debugging not working?](#why-is-debugging-not-working)
- [What do I do if I suspect a C/C++ extension problem](#what-do-i-do-if-i-suspect-a-cc-extension-problem)

## Why are my files corrupted on format?

Files can be corrupted due to the fact that you either have a multi-root workspace where one folder is a child of the other, or you are using symlinks to open your file. Reduce the folders in the workspace to one and remove the symlink. This should fix your problem.

## How do I get IntelliSense to work correctly?

Without any configuration, the extension will attempt to locate headers by searching your workspace folder and by emulating a compiler it finds on your computer. (for example cl.exe/WSL/MinGW for Windows, gcc/clang for macOS/Linux). If this automatic configuration is insufficient, you can modify the defaults by running the **C/C++: Edit Configurations (UI)** command. In that view, you can change the compiler you wish to emulate, the paths to include files you wish to use, preprocessor definitions, and more.

Or, if you install a build system extension that interfaces with our extension, you can allow that extension to provide the configurations for you. For example, the CMake Tools extension can configure projects that use the CMake build system. Use the **C/C++: Change Configuration Provider...** command to enable any such extension to provide the configurations for IntelliSense.

A third option for projects without build system extension support is to use a [compile_commands.json](https://clang.llvm.org/docs/JSONCompilationDatabase.html) file if your build system supports generating this file. In the "Advanced" section of the Configuration UI, you can supply the path to your `compile_commands.json` and the extension will use the compilation information listed in that file to configure IntelliSense.

**Note:** If the extension is unable to resolve any of the `#include` directives in your source code, it will not show linting information for the body of the source file. If you check the **Problems** window in VS Code, the extension will provide more information about which files it was unable to locate. If you want to show the linting information anyway, you can change the value of the `C_Cpp.errorSquiggles` setting.

## Why do I see red squiggles under Standard Library types?

The most common reason for this is missing include paths and defines. The easiest way to fix this on each platform is as follows:

**Linux/Mac**: Set `intelliSenseMode": "clang-x64` or `intelliSenseMode": "gcc-x64` and `compilerPath` in **c_cpp_properties.json** to the path to your compiler.

**Windows**: If you are using the Microsoft C++ compiler, set `intelliSenseMode": "msvc-x64`, but don't add the `compilerPath` property to **c_cpp_properties.json**. If you are using Clang for Windows, set `intelliSenseMode": "msvc-x64`, and `compilerPath` in **c_cpp_properties.json** to the path to your compiler.

## How do I get the new IntelliSense to work with MinGW on Windows?

See [Get Started with C++ and Mingw-w64 in Visual Studio Code](/docs/cpp/config-mingw.md).

## How do I get the new IntelliSense to work with the Windows Subsystem for Linux?

See [Get Started with C++ and Windows Subsystem for Linux in Visual Studio Code](/docs/cpp/config-wsl.md).

## What is the difference between includePath and browse.path?

These two settings are available in `c_cpp_properties.json` and can be confusing.

### includePath

This array of path strings is used by the "Default" IntelliSense engine. This new engine provides semantic-aware IntelliSense features and will be the eventual replacement for the Tag Parser that has been powering the extension since it was first released. It currently provides tooltips and error squiggles in the editor. The remaining features (for example, code completion, signature help, Go to Definition, ...) are implemented using the Tag Parser's database, so it is still important to ensure that the browse.path setting is properly set.

The paths that you specify for this setting are the same paths that you would send to your compiler via the `-I` switch. When your source files are parsed, the IntelliSense engine will prepend these paths to the files specified by your #include directives while attempting to resolve them. These paths are **not** searched recursively.

### browse.path

This array of path strings is used by the "Tag Parser" ("browse engine"). This engine will **recursively** enumerate all files under the paths specified and track them as potential includes while tag parsing your project folder. To disable recursive enumeration of a path, you can append a `/*` to the path string.

When you open a workspace for the first time, the extension adds `${workspaceFolder}` to both arrays. If this is undesirable, you can open your **c_cpp_properties.json** file and remove it.

## How do I recreate the IntelliSense database?

Starting in version 0.12.3 of the extension, there is a command to reset your IntelliSense database. Open the Command Palette (`kb(workbench.action.showCommands)`) and choose the **C/C++: Reset IntelliSense Database** command.

## What is the ipch folder?

The language server caches information about included header files to improve the performance of IntelliSense. When you edit C/C++ files in your workspace folder, the language server will store cache files in the `ipch` folder. By default, the `ipch` folder is stored under the user directory. Specifically, it is stored under `%LocalAppData%/Microsoft/vscode-cpptools` on Windows, and for Linux and macOS it is under `~/.vscode-cpptools`. By using the user directory as the default path, it will create one cache location per user for the extension. As the cache size limit is applied to a cache location, having one cache location per user will limit the disk space usage of the cache to that one folder for everyone using the default setting value.

VS Code per-workspace storage folders were not used because the location provided by VS Code is not well known and we didn't want to write GB's of files where users may not see them or know where to find them.

With this in mind, we knew that we would not be able to meet the needs of every different development environment, so we provided settings to allow you to customize the way that works best for your situation.

### `"C_Cpp.intelliSenseCachePath": <string>`

This setting allows you to set workspace or global overrides for the cache path. For example, if you want to share a single cache location for all workspace folders, open the VS Code settings, and add a User setting for **IntelliSense Cache Path**.

### `"C_Cpp.intelliSenseCacheSize": <number>`

This setting allows you to set a limit on the amount of caching the extension does. This is an approximation, but the extension will make a best effort to keep the cache size as close to the limit you set as possible. If you are sharing the cache location across workspaces as explained above, you can still increase/decrease the limit, but you should make sure that you add a User setting for **IntelliSense Cache Size**.

## How do I disable the IntelliSense cache (ipch)?

If you do not want to use the IntelliSense caching feature that improves the performance of IntelliSense, you can disable the feature by setting the **IntelliSense Cache Size** setting to 0 (or `"C_Cpp.intelliSenseCacheSize": 0"` in the JSON settings editor).

## How do I set up debugging?

The debugger needs to be configured to know which executable and debugger to use:

From the main menu, select **Run** > **Add Configuration...**.

The file `launch.json` will now be open for editing with a new configuration. The default settings will *probably* work except that you need to specify the `program` setting.

See [Debug configuration](/docs/cpp/launch-json-reference.md) for more in-depth documentation on how to configure the debugger.

## How do I enable debug symbols?

Enabling debug symbols is dependent on the type of compiler you are using. Below are some of the compilers and the compiler options necessary to enable debug symbols.

When in doubt, please check your compiler's documentation for the options necessary to include debug symbols in the output. This may be some variant of `-g` or `--debug`.

### Clang (C++)

* If you invoke the compiler manually, add the `--debug` option.
* If you're using a script, make sure the `CXXFLAGS` environment variable is set. For example, `export CXXFLAGS="${CXXFLAGS} --debug"`.
* If you're using CMake, make sure the `CMAKE_CXX_FLAGS` is set. For example, `export CMAKE_CXX_FLAGS=${CXXFLAGS}`.

### Clang (C)

See Clang C++ but use `CFLAGS` instead of `CXXFLAGS`.

### gcc or g++

If you invoke the compiler manually, add the `-g` option.

### cl.exe

Symbols are located in the `*.pdb` file.

## Why is debugging not working?

### My breakpoints aren't being hit

When you start debugging, if your breakpoints aren't bound (solid red circle) or they are not being hit, you may need to enable [debug symbols](#how-do-i-enable-debug-symbols) during compilation.

### Debugging starts but all the lines in my stack trace are grey

If your debugger is showing a grey stack trace, won't stop at a breakpoint, or the symbols in the call stack are grey, then your executable was compiled without [debug symbols](#how-do-i-enable-debug-symbols).

## What do I do if I suspect a C/C++ extension problem

If you are experiencing a problem with the extension that we can't diagnose based on information in your issue report, we might ask you to enable logging and send us your logs. See [C/C++ extension logging](/docs/cpp/enable-logging-cpp.md) for how to get C/C++ extension logs.

If you have any other questions or run into any issues, please file an issue on [GitHub](https://github.com/microsoft/vscode-cpptools/issues).
