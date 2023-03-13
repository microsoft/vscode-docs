---
Order: 12
Area: cpp
TOCTitle: Settings
ContentId: 4E34F6AF-BFC6-4BBB-8464-2E50C85AE826
PageTitle: Customize default settings in Visual Studio Code C++ projects
DateApproved: 3/06/2023
MetaDescription: How to customize semantic colorization of C++ code in Visual Studio Code.
---
# Customizing default settings

You can override the default values for properties set in `c_cpp_properties.json`.

## Visual Studio Code settings

The following `C_Cpp.default.*` settings map to each of the properties in a configuration block of `c_cpp_properties.json`. Namely:

```json
C_Cpp.default.includePath                          : string[]
C_Cpp.default.defines                              : string[]
C_Cpp.default.compileCommands                      : string
C_Cpp.default.macFrameworkPath                     : string[]
C_Cpp.default.forcedInclude                        : string[]
C_Cpp.default.intelliSenseMode                     : string
C_Cpp.default.compilerPath                         : string
C_Cpp.default.compilerArgs                         : string[]
C_Cpp.default.configurationProvider                : string
C_Cpp.default.customConfigurationVariables         : object | null
C_Cpp.default.cStandard                            : c89 | c99 | c11 | c17
C_Cpp.default.cppStandard                          : c++98 | c++03 | c++11 | c++14 | c++17 | c++20 | c++23
C_Cpp.default.enableConfigurationSquiggles         : boolean
C_Cpp.default.mergeConfigurations                  : boolean
C_Cpp.default.systemIncludePath                    : string[]
C_Cpp.default.windowsSdkVersion                    : string
C_Cpp.default.browse.path                          : string[]
C_Cpp.default.browse.defines                       : string[]
C_Cpp.default.browse.dotConfig                     : string
C_Cpp.default.browse.databaseFilename              : string
C_Cpp.default.browse.limitSymbolsToIncludedHeaders : boolean
```

These settings have all of the benefits of VS Code settings, meaning that they can have default, "User", "Workspace", and "Folder" values.  So you can set a global value for `C_Cpp.default.cppStandard` in your "User" settings and have it apply to all of the folders you open. If any one folder needs a different value, you can override the value by adding a "Folder" or "Workspace" value.

This property of VS Code settings allows you to configure each of your workspaces independently - making the `c_cpp_properties.json` file optional.

## Updated `c_cpp_properties.json` syntax

A special variable has been added to the accepted syntax of `c_cpp_properties.json` that will instruct the extension to insert  the value from the VS Code settings mentioned above. If you set the value of any setting in `c_cpp_properties.json` to "${default}" it will instruct the extension to read the VS Code default setting for that property and insert it. For example:

```json
"configurations": [
    {
        "name": "Win32",
        "includePath": [
            "additional/paths",
            "${default}"
        ],
        "defines": [
            "${default}"
        ],
        "macFrameworkPath": [
            "${default}",
            "additional/paths"
        ],
        "forcedInclude": [
            "${default}",
            "additional/paths"
        ],
        "compileCommands": "${default}",
        "browse": {
            "limitSymbolsToIncludedHeaders": true,
            "databaseFilename": "${default}",
            "path": [
                "${default}",
                "additional/paths"
            ]
        },
        "intelliSenseMode": "${default}",
        "cStandard": "${default}",
        "cppStandard": "${default}",
        "compilerPath": "${default}"
    }
],
```

Note that for the properties that accept string[], the syntax proposed above allows you to augment the VS Code setting with additional values, thus allowing you to have common paths listed in the VS Code settings and configuration-specific settings in `c_cpp_properties.json`.

If a property is missing from `c_cpp_properties.json`, the extension will use the value in the VS Code setting. If a developer assigns values to all of the settings that apply for a given folder, then `c_cpp_properties.json` could be removed from the .vscode folder as it will no longer be needed.

For in-depth information about the c_cpp_properties.json settings file, See [c_cpp_properties.json reference](/docs/cpp/c-cpp-properties-schema-reference.md).

### System includes

A new setting will be added that allows you specify the system include path separate from the folder's include path. If this setting has a value, then the system include path the extension gets from the compiler specified in the `compilerPath` setting will not be added to the path array that the extension uses for IntelliSense. We may want to provide a VS Code command to populate this value from the compiler's default for users who are interested in using it in case they want to make some modifications to the defaults.

```json
C_Cpp.default.systemIncludePath : string[]
```

### System include path/defines resolution strategies

The extension determines the system includePath and defines to send to the IntelliSense engine in the following manner:

1. If `compileCommands` has a valid value and the file open in the editor is in the database, use the compile command in the database entry to determine the include path and defines.
   - The system include path and defines are determined using the following logic (in order):
      1. If `systemIncludePath` has a value, use it (continue to the next step to search for system defines).
      2. If `compilerPath` is valid, query it.
      3. Interpret the first argument in the command as the compiler and attempt to query it.
      4. If `compilerPath` is "", use an empty array for system include path and defines.
      5. If `compilerPath` is undefined, look for a compiler on the system and query it.

2. If `compileCommands` is invalid or the current file is not listed in the database, use the `includePath` and `defines` properties in the configuration for IntelliSense.
   - The system include path and defines are determined using the following logic (in order):
      1. If `systemIncludePath` has a value, use it (continue to the next step to search for system defines).
      2. If `compilerPath` is valid, query it.
      3. If `compilerPath` is "", use an empty array for system include path and defines (they are assumed to be in the `includePath` and `defines` for the current config already).
      4. If `compilerPath` is undefined, look for a compiler on the system and query it.

System includes should not be added to the `includePath` or `browse.path` variables. If the extension detects any system include paths in the `includePath` property it will silently remove them so that it can ensure system include paths are added last and in the correct order (this is especially important for GCC/Clang).

### Enhanced semantic colorization

When IntelliSense is enabled, the Visual Studio Code C/C++ extension supports semantic colorization. See [Enhanced colorization](/docs/cpp/colorization-cpp.md) for more details about setting colors for classes, functions, variables and so on.

### Extension logging

If you are experiencing a problem with the extension that we can't diagnose based on information in your issue report, we might ask you to enable logging and send us your logs. See [C/C++ extension logging](/docs/cpp/enable-logging-cpp.md) for information about how to collect logs.
