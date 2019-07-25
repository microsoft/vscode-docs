---
Order: 9
Area: cpp
TOCTitle: c_cpp_properties.json
ContentId: EC1BA944-09B5-41EA-AAED-779A02C90C98
PageTitle: c_cpp_properties.json reference
DateApproved: 07/25/2019
MetaDescription: Schema reference for C++ project settings in Visual Studio Code.
---
# c_cpp_properties.json reference

> See also: [Customizing Default Settings](/docs/cpp/customize-default-settings-cpp.md)

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
  A friendly name that identifies a configuration. `Linux`, `Mac`, and `Win32` are special identifiers for configurations that will be auto-selected on those platforms. The status bar in VS Code will show you which configuration is active. You can also click on the label in the status bar to change the active configuration.

- `compilerPath` (optional)
  The full path to the compiler you use to build your project, e.g. `/usr/bin/gcc`, to enable more accurate IntelliSense. Arguments can be added to modify the includes/defines used, e.g. `-nostdinc++`, `-m32`, etc., but paths with spaces must be surrounded by double quotes `"` if arguments are used. The extension will query the compiler to determine the system include paths and default defines to use for IntelliSense.

- `intelliSenseMode`
  The IntelliSense mode used by the IntelliSense engine. `msvc-x64` maps to Visual Studio mode with 64-bit pointer sizes. `clang-x64` maps to CLang mode with 64-bit pointer sizes. `gcc-x64` maps to GCC mode with 64-bit pointer sizes. If not set or if the `${default}` mode is used, the extension will choose the default for that platform. Windows defaults to `msvc-x64`, Linux defaults to `gcc-x64`, and macOS defaults to `clang-x64`.

- `includePath`
  An include path is a folder that contains header files (such as `#include "myHeaderFile.h"`) that are included in a source file. Specify a list paths for the IntelliSense engine to use while searching for included header files. If a path ends with `/**` the IntelliSense engine will do a recursive search for hearder files starting from that directory. If on Windows with Visual Studio installed, or if a compiler is specified in the `compilerPath` setting, it is not necessary to list the system include paths in this list.

- `defines`
  A list of preprocessor definitions for the IntelliSense engine to use while parsing files. Optionally, use `=` to set a value, e.g. `VERSION=1`.

- `cStandard`
  The version of the C language standard to use for IntelliSense.

- `cppStandard`
  The version of the C++ language standard to use for IntelliSense.

- `configurationProvider`
  The ID of a VS Code extension that can provide IntelliSense configuration information for source files. For example, use the VS Code extension ID `vector-of-bool.cmake-tools` to provide configuration information from the CMake Tools extension.

- `windowsSdkVersion`
  The version of the Windows SDK include path to use on Windows, e.g. `10.0.17134.0`.

- `macFrameworkPath`
  A list of paths for the Intellisense engine to use while searching for included headers from Mac frameworks. Only supported on configurations for macOS.

- `forcedInclude` (optional)
  A list of files that should be included before any other characters in the source file are processed. Files are included in the order listed.

- `compileCommands` (optional)
  The full path to the `compile_commands.json` file for the workspace. The include paths and defines discovered in this file will be used instead of the values set for `includePath` and `defines` settings. If the compile commands database does not contain an entry for the translation unit that corresponds to the file you opened in the editor, then a warning message will appear and the extension will use the `includePath` and `defines` settings instead.

  For more information about the file format, see the [Clang documentation](https://clang.llvm.org/docs/JSONCompilationDatabase.html). Some build systems, such as CMake, [simplify generating this file](https://cmake.org/cmake/help/v3.5/variable/CMAKE_EXPORT_COMPILE_COMMANDS.html).

- `browse`
  The set of properties used when `"C_Cpp.intelliSenseEngine"` is set to `"Tag Parser"` (also referred to as "fuzzy" IntelliSense, or the "browse" engine). These properties are also used by the Go To Definition/Declaration features, or when the "Default" IntelliSense engine is unable to resolve the #includes in your source files.

### Browse properties

- `path`
  A list of paths for the Tag Parser to search for headers included by your source files. If omitted, `includePath` will be used as the `path`. Searching on these paths is recursive by default. Specify `*` to indicate non-recursive search. For example: `/usr/include` will search through all subdirectories while `/usr/include/*` will not.

- `limitSymbolsToIncludedHeaders`
  When true, the Tag Parser will only parse code files that have been directly or indirectly included by a source file in `${workspaceFolder}`. When false, the Tag Parser will parse all code files found in the paths specified in the `browse.path` list.

- `databaseFilename`
  The path to the generated symbol database. This instructs the extension to save the Tag Parser's symbol database somewhere other than the workspace's default storage location. If a relative path is specified, it will be made relative to the workspace's default storage location, not the workspace folder itself. The `${workspaceFolder}` variable can be used to specify a path relative to the workspace folder (e.g. `${workspaceFolder}/.vscode/browse.vc.db`)
