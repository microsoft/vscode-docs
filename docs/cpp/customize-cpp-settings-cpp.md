---
Order: 14
Area: cpp
TOCTitle: Settings Reference
ContentId: 4E34F6AF-BFC6-4BBB-8464-2E50C85AE826
PageTitle: Customize settings in Visual Studio Code C++ projects via the c_cpp_properties.json file
DateApproved: 4/24/2025
MetaDescription: How to customize the c_cpp_properties.json file for the C++ extension.
---
# C++ extension settings reference

The C++ Extension settings are highly configurable. This article explains the schema for the `c_cpp_properties.json` file. For general information about settings in VS Code, refer to [User and workspace settings](/docs/configure/settings.md), as well as the [Variables reference](/docs/reference/variables-reference.md) and [Default VS Code Settings](/docs/reference/default-settings.md).

Looking to get started with configuring your C++ project? Begin with [configure Intellisense](/docs/cpp/configure-intellisense.md).
## Example of Variables

Note, this json is an example configuration for `c_cpp_properties.json`. You only need to include relevant variables in your json file, all missing field will be filled in with default values by the C++ extension.

```json
{
    "env": {
        "myIncludePath": [
            "${workspaceFolder}/include",
            "${workspaceFolder}/src"
        ],
        "myDefines": [
            "DEBUG",
            "MY_FEATURE=1"
        ]
    },
    "configurations": [
      {
        "name": "Mac",
        "compilerPath": "/usr/bin/clang++",
        "intelliSenseMode": "macos-clang-x64",
        "includePath": [ "${myIncludePath}"],
        "defines": [ "${myDefines}"],
        "cStandard": "c11",
        "cppStandard": "c++17",
        "macFrameworkPath": [ "/System/Library/Frameworks","/Library/Frameworks"],
        "browse": {
          "path": [ "${myIncludePath}","${workspaceFolder}"]
        }
      }
    ],
    "version": 4,
    "enableConfigurationSquiggles": true
}
```

## Top-level properties

- `env`
  An array of user-defined variables that are available for substitution in the configurations via the standard environment variable syntax: `${<var>}` or `${env:<var>}`. Strings and arrays of strings are accepted.

- `configurations`
  An array of configuration objects that provide the IntelliSense engine with information about your project and your preferences. By default, the extension creates a configuration for you based on your operating system. You can also add more configurations.

- `version`
  We recommend you don't edit this field. It tracks the current version of the `c_cpp_properties.json` file so that the extension knows what properties and settings should be present and how to upgrade this file to the latest version.

- `enableConfigurationSquiggles`
  Set to `true` to report errors detected in `c_cpp_properties.json` file to the C/C++ Extension.

## Configuration properties

- `name`
  A friendly name that identifies a configuration. `Linux`, `Mac`, and `Win32` are special identifiers for configurations that are autoselected on those platforms. The status bar in VS Code shows you which configuration is active. You can also select the label in the status bar to change the active configuration.

- `compilerPath`
  The full path to the compiler you use to build your project, for example `/usr/bin/gcc`, to enable more accurate IntelliSense. The extension queries the compiler to determine the system include paths and default defines to use for IntelliSense.

  Putting `"compilerPath": ""` (empty string) skips querying a compiler. This is useful if a specified compiler doesn't support the arguments that are used for the query, as the extension defaults to any compiler it can find (like Visual C). Leaving out the `compilerPath` property does not skip the query.

- `compilerArgs`
  Compiler arguments to modify the includes paths or defines used, for example `-nostdinc++`, `-m32`, etc. Arguments that take additional space-delimited arguments should be entered as separate arguments in the array, for example, for `--sysroot <arg>` use `\"--sysroot\", \"<arg>\"`.

- `intelliSenseMode`
  The IntelliSense mode to use that maps to an architecture-specific variant of MSVC, gcc, or Clang. If not set or if set to `${default}`, the extension chooses the default for that platform.

  Platform defaults:
  - Windows: `windows-msvc-x64`
  - Linux: `linux-gcc-x64`
  - macOS: `macos-clang-x64`

  IntelliSense modes that only specify `<compiler>-<architecture>` variants (for example, `gcc-x64`) are legacy modes and are automatically converted to the `<platform>-<compiler>-<architecture>` variants based on the host platform.

- `includePath`
  An include path is a folder that contains header files (such as `#include "myHeaderFile.h"`) that are included in a source file. Specify a list of paths for the IntelliSense engine to use while searching for included header files. Searching on these paths is not recursive. Specify `/**` at the end of the path to indicate recursive search. For example, `${workspaceFolder}/**` searches through all subdirectories while `${workspaceFolder}` will not. If on Windows with Visual Studio installed, or if a compiler is specified in the `compilerPath` setting, it is not necessary to list the system include paths in this list.

- `defines`
  A list of preprocessor definitions for the IntelliSense engine to use while parsing files. Optionally, use `=` to set a value, for example `VERSION=1`.

- `cStandard`
  The version of the C language standard to use for IntelliSense. For example, `c17`, `gnu23`, or `${default}`. Note: GNU standards are only used to query the set compiler to get GNU defines, and IntelliSense emulates the equivalent C standard version.

- `cppStandard`
  The version of the C++ language standard to use for IntelliSense. For example, `c++20`, `gnu++23`, or `${default}`. Note: GNU standards are only used to query the set compiler to get GNU defines, and IntelliSense emulates the equivalent C++ standard version.

- `configurationProvider`
  The ID of a VS Code extension that can provide IntelliSense configuration information for source files. For example, use the VS Code extension ID `ms-vscode.cmake-tools` to provide configuration information from the CMake Tools extension. If you specified a configurationProvider, the configuration it provides takes precedence over your other settings in `c_cpp_properties.json`.

  A `configurationProvider` candidate extension must implement [vscode-cpptools-api](https://github.com/microsoft/vscode-cpptools-api).

- `windowsSdkVersion`
  The versions of the Windows SDK include path to use on Windows, for example `10.0.17134.0`.

- `macFrameworkPath`
  A list of paths for the IntelliSense engine to use while searching for included headers from Mac frameworks. Only supported on configurations for macOS.

- `forcedInclude`
  A list of files that should be included before any other characters in the source file are processed. Files are included in the order listed.

- `compileCommands`
  The full path to the `compile_commands.json` file for the workspace. If there is a matching entry in `compile_commands.json` for a file open in the editor, that command line is to configure IntelliSense for that file, instead of the other fields of `c_cpp_properties.json`.
  For more information about the file format, see the [Clang documentation](https://clang.llvm.org/docs/JSONCompilationDatabase.html). Some build systems, such as CMake, [simplify generating this file](https://cmake.org/cmake/help/v3.5/variable/CMAKE_EXPORT_COMPILE_COMMANDS.html).

- `dotConfig`
  A path to a .config file created by the Kconfig system. The Kconfig system generates a file with all the defines needed to build a project. Examples of projects that use the Kconfig system are the Linux Kernel and NuttX RTOS.

- `mergeConfigurations`
  Set to `true` to merge include paths, defines, and forced includes with those from a configuration provider.

- `customConfigurationVariables`
  Custom variables that can be queried through the command `${cpptools:activeConfigCustomVariable}` to use for the input variables in `launch.json` or `tasks.json`.

- `browse`
  The set of properties used when `"C_Cpp.intelliSenseEngine"` is set to `"Tag Parser"` (also referred to as "fuzzy" IntelliSense, or the "browse" engine). These properties are also used by the **Go to Definition/Declaration** features, or when the "default" IntelliSense engine is unable to resolve the `#includes` in your source files.

### Browse properties

- `path`
  A list of paths for the Tag Parser to search for headers included by your source files. If omitted, `includePath` is used as the `path`. Searching on these paths is recursive by default. Specify `*` to indicate nonrecursive search. For example: `${workspaceFolder}` searches through all subdirectories while `${workspaceFolder}/*` will not.

- `limitSymbolsToIncludedHeaders`
  When true, the Tag Parser only parses code files that are directly or indirectly included by a source file in `${workspaceFolder}`. When false, the Tag Parser parses all code files found in the paths specified in the `browse.path` list.

- `databaseFilename`
  The path to the generated symbol database. This property instructs the extension to save the Tag Parser's symbol database somewhere other than the workspace's default storage location. If a relative path is specified, it is made relative to the workspace's default storage location, not the workspace folder itself. The `${workspaceFolder}` variable can be used to specify a path relative to the workspace folder (for example `${workspaceFolder}/.vscode/browse.vc.db`)

### Recursive include path properties

  - `reduce`
  By default, `always` reduces the number of recursive include paths provided to the IntelliSense process to only paths currently referenced by #include statements. This requires first parsing files to determine which headers are included. However, this parsing can add extra overhead. Set to `never` to always provide all recursive include paths to the IntelliSense process. Reducing the number of recursive include paths might improve IntelliSense performance when a large number of recursive include paths are involved. Not reducing the number of recursive include paths can improve IntelliSense performance by avoiding the need to parse files to determine which include paths to provide.

  - `priority`
  The priority of recursive include paths. If set to `beforeSystemIncludes`, the recursive include paths are searched before system include paths. If set to `afterSystemIncludes`, the recursive include paths will be searched after system include paths. `beforeSystemIncludes` would more closely reflect the search order of a compiler leading to more predictability, while `afterSystemIncludes` might result in improved performance.

  - `order`
  Whether subdirectories of recursive includes are searched `breadthFirst` or `depthFirst`.

## Supported variables

You can allow `tasks.json` or `launch.json` to query the current active configuration from `c_cpp_properties.json`. To do this, use the variable `${command:cpptools.activeConfigName}` as an argument in a `tasks.json` or `launch.json` script.

### Default VS Code Settings

All default VS Code settings, such as C_Cpp.default.includePath, are supported in c_cpp_properties.json. The only exception is

```json
C_Cpp.default.systemIncludePath : string[]
```

This setting allows you to specify the system include path separately from the include path. However, the selected system include path the C++ extension receives from the compiler is not passed to the IntelliSense process. This is only used in rare scenarios since it overwrites the standard compiler behavior, for example, if your compiler is not supported. Instead, use the setting `compilerArgs` and using the "-isystem" flag to specify system headers, which is a better solution in most scenarios.
