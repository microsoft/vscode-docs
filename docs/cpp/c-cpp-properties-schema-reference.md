---
Order:
Area: cpp
TOCTitle: c_cpp_properties.json
ContentId: EC1BA944-09B5-41EA-AAED-779A02C90C98
PageTitle: c_cpp_properties.json reference
DateApproved: 06/26/2020
MetaDescription: Schema reference for C++ project settings in Visual Studio Code.
---
# c_cpp_properties.json reference

This article explains the scheme for the c_cpp_properties.json settings file.

For more information about changing these settings, see [Customizing Default Settings](/docs/cpp/customize-default-settings-cpp.md) and [Configure IntelliSense for cross-compiling](/docs/cpp/configure-intellisense-crosscompilation.md).

## Example

```json
{
    "env" : {
        "myDefaultIncludePath": [
            "${workspaceFolder}",
            "${workspaceFolder}/include"
        ],
        "myCompilerPath": "/usr/local/bin/gcc-7"
    },
    "configurations": [
        {
            "name": "Mac",
            "intelliSenseMode": "clang-x64",
            "includePath": [ "${myDefaultIncludePath}", "/another/path" ],
            "macFrameworkPath": [ "/System/Library/Frameworks" ],
            "defines": [ "FOO", "BAR=100" ],
            "forcedInclude": [ "${workspaceFolder}/include/config.h" ],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "compileCommands": "/path/to/compile_commands.json",
            "browse": {
                "path": [ "${workspaceFolder}" ],
                "limitSymbolsToIncludedHeaders": true,
                "databaseFilename": ""
            }
        }
    ],
    "version": 4
}
```

## Top-level properties

- `env`
  An array of user-defined variables that will be available for substitution in the configurations via the standard environment variable syntax: `${<var>}` or `${env:<var>}`. Strings and arrays of strings are accepted.

- `configurations`
  An array of configuration objects that provide the IntelliSense engine with information about your project and your preferences. By default, the extension creates a configuration for you based on your operating system. You may also add additional configurations.

- `version`
  We recommend you don't edit this field. It tracks the current version of the `c_cpp_properties.json` file so that the extension knows what properties and settings should be present and how to upgrade this file to the latest version.

## Configuration properties

- `name`
  A friendly name that identifies a configuration. `Linux`, `Mac`, and `Win32` are special identifiers for configurations that will be autoselected on those platforms. The status bar in VS Code will show you which configuration is active. You can also click on the label in the status bar to change the active configuration.

- `compilerPath` (optional)
  The full path to the compiler you use to build your project, for example `/usr/bin/gcc`, to enable more accurate IntelliSense. The extension will query the compiler to determine the system include paths and default defines to use for IntelliSense.

  Putting `"compilerPath": ""` (empty string) will skip querying a compiler. This is useful if a specified compiler doesn't support the arguments that are used for the query, as the extension will default back to any compiler it can find (like Visual C). Leaving out the `compilerPath` property does not skip the query.

- `compilerArgs` (optional)
  Compiler arguments to modify the includes or defines used, for example `-nostdinc++`, `-m32`, etc.

- `intelliSenseMode`
  The IntelliSense mode to use that maps to an architecture-specific variant of MSVC, gcc, or Clang. If not set or if set to `${default}`, the extension will choose the default for that platform.

  Platform defaults:
  - Windows: `msvc-x64`
  - Linux: `gcc-x64`
  - macOS: `clang-x64`

- `includePath`
  An include path is a folder that contains header files (such as `#include "myHeaderFile.h"`) that are included in a source file. Specify a list of paths for the IntelliSense engine to use while searching for included header files. Searching on these paths is not recursive. Specify `**` to indicate recursive search. For example, `${workspaceFolder}/**` will search through all subdirectories while `${workspaceFolder}` will not. If on Windows with Visual Studio installed, or if a compiler is specified in the `compilerPath` setting, it is not necessary to list the system include paths in this list.

- `defines`
  A list of preprocessor definitions for the IntelliSense engine to use while parsing files. Optionally, use `=` to set a value, for example `VERSION=1`.

- `cStandard`
  The version of the C language standard to use for IntelliSense.

- `cppStandard`
  The version of the C++ language standard to use for IntelliSense.

- `configurationProvider`
  The ID of a VS Code extension that can provide IntelliSense configuration information for source files. For example, use the VS Code extension ID `ms-vscode.cmake-tools` to provide configuration information from the CMake Tools extension.

- `windowsSdkVersion`
  The versions of the Windows SDK include path to use on Windows, for example `10.0.17134.0`.

- `macFrameworkPath`
  A list of paths for the IntelliSense engine to use while searching for included headers from Mac frameworks. Only supported on configurations for macOS.

- `forcedInclude` (optional)
  A list of files that should be included before any other characters in the source file are processed. Files are included in the order listed.

- `compileCommands` (optional)
  The full path to the `compile_commands.json` file for the workspace. The include paths and defines discovered in this file will be used instead of the values set for `includePath` and `defines` settings. If the compile commands database does not contain an entry for the translation unit that corresponds to the file you opened in the editor, then a warning message will appear and the extension will use the `includePath` and `defines` settings instead.

  For more information about the file format, see the [Clang documentation](https://clang.llvm.org/docs/JSONCompilationDatabase.html). Some build systems, such as CMake, [simplify generating this file](https://cmake.org/cmake/help/v3.5/variable/CMAKE_EXPORT_COMPILE_COMMANDS.html).

- `browse`
  The set of properties used when `"C_Cpp.intelliSenseEngine"` is set to `"Tag Parser"` (also referred to as "fuzzy" IntelliSense, or the "browse" engine). These properties are also used by the Go To Definition/Declaration features, or when the "Default" IntelliSense engine is unable to resolve the #includes in your source files.

### Browse properties

- `path`
  A list of paths for the Tag Parser to search for headers included by your source files. If omitted, `includePath` will be used as the `path`. Searching on these paths is recursive by default. Specify `*` to indicate non-recursive search. For example: `${workspaceFolder}` will search through all subdirectories while `${workspaceFolder}/*` will not.

- `limitSymbolsToIncludedHeaders`
  When true, the Tag Parser will only parse code files that have been directly or indirectly included by a source file in `${workspaceFolder}`. When false, the Tag Parser will parse all code files found in the paths specified in the `browse.path` list.

- `databaseFilename`
  The path to the generated symbol database. This property instructs the extension to save the Tag Parser's symbol database somewhere other than the workspace's default storage location. If a relative path is specified, it will be made relative to the workspace's default storage location, not the workspace folder itself. The `${workspaceFolder}` variable can be used to specify a path relative to the workspace folder (for example `${workspaceFolder}/.vscode/browse.vc.db`)

## Supported variables

You can allow `tasks.json` or `launch.json` to query the current active configuration from `c_cpp_properties.json`. To do this, use the variable `${command:cpptools.activeConfigName}` as an argument in a `tasks.json` or `launch.json` script.
