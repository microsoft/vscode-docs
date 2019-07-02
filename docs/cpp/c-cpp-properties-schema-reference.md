---
Order: 11
Area: cpp
TOCTitle: c_cpp_properties.json reference
ContentId: EC1BA944-09B5-41EA-AAED-779A02C90C98
PageTitle: c_cpp_properties.json reference
DateApproved: 06/25/2019
MetaDescription: Schema reference for C++ project settings in Visual Studio Code.
---
# c_cpp_properties.json Reference Guide

See also: [Customizing Default Settings](customize-default-settings.md)

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

### env

An array of user-defined variables that will be available for substitution in the configurations via the standard environment variable syntax: `${<var>}` or `${env:<var>}`. Strings and arrays of strings are accepted.

### configurations

An array of configuration objects that provide the IntelliSense engine with information about your project and your preferences. By default, the extension creates a configuration for you based on your operating system. You may also add additional configurations.

### version

We recommend you don't edit this field. It tracks the current version of the `c_cpp_properties.json` file so that the extension knows what properties and settings should be present and how to upgrade this file to the latest version.

## Configuration properties

### name

A friendly name for the configuration. "Linux", "Mac", and "Win32" are special names that instruct the extension to load that configuration by default on the associated operating system unless additional configurations have been created. The status bar in VS Code will show you which configuration is active. You can also click on the label in the status bar to change the active configuration.

### intelliSenseMode

If `C_Cpp.intelliSenseEngine` is set to "Default" in your settings file, this property determines which mode the IntelliSense engine will run in. `msvc-x64` maps to Visual Studio mode with 64-bit pointer sizes. `clang-x64` maps to CLang mode with 64-bit pointer sizes. `gcc-x64` maps to GCC mode with 64-bit pointer sizes. Windows uses `msvc-x64` by default, macOS uses `clang-x64` by default, and Linux uses `gcc-x64` by default.

### includePath

If `C_Cpp.intelliSenseEngine` is set to "Default" in your settings file, this list of paths will be used by IntelliSense to search for headers included by your source files. This is basically the same as the list of paths you pass to your compiler with the `-I` switch. If a path ends with `/**`, the IntelliSense engine will do a recursive search for includes starting from that directory. If on Windows with Visual Studio installed, or if a compiler is specified in the `compilerPath` setting, it is not necessary to list the system include paths in this list.

### macFrameworkPath

If `C_Cpp.intelliSenseEngine` is set to "Default" in your settings file, this list of paths will be used by IntelliSense to search for framework headers included by your source files. This is basically the same as the list of paths you pass to your compiler with the `-F` switch; the IntelliSense engine will not do a recursive search in these paths for includes.

### defines

If `C_Cpp.intelliSenseEngine` is set to "Default" in your settings file, this list of preprocessor symbols will be used by IntelliSense during the compilation of your source files. This list is basically the same as the list of symbols you pass to your compiler with the `-D` switch. If on Windows with Visual Studio installed, or if a compiler is specified in the `compilerPath` setting, it is not necessary to list the system include paths in this list.

### forcedInclude (optional)

A list of files that should be included before any other characters in the source file are processed. Files are included in the order listed.

### compilerPath (optional)

The absolute path to the compiler you use to build your project. The extension will query the compiler to determine the system include paths and default defines to use for IntelliSense.

Args can be added to modify the includes/defines used, for example `-nostdinc++`, `-m32`, `-fno-ms-extensions`, etc., but paths with spaces must be surrounded by double quotes (") if args are used.

To disable automatic querying of system include paths and defines, set this value to the empty string (""). This is generally not recommended, but there are some cases where automatic querying of system includes and defines is undesirable.

### cStandard

The C standard revision to use for IntelliSense in your project.

### cppStandard

The C++ standard revision to use for IntelliSense in your project.

### compileCommands (optional)

If `C_Cpp.intelliSenseEngine` is set to "Default" in your settings file, the includes and defines discovered in this file will be used instead of the values set for `includePath` and `defines`. If the compile commands database does not contain an entry for the translation unit that corresponds to the file you opened in the editor, then a warning message will appear and the extension will use the `includePath` and `defines` settings instead.

For more information about the file format, see the [Clang documentation](https://clang.llvm.org/docs/JSONCompilationDatabase.html). Some build systems, such as CMake, [simplify generating this file](https://cmake.org/cmake/help/v3.5/variable/CMAKE_EXPORT_COMPILE_COMMANDS.html).

### browse

The set of properties used when `C_Cpp.intelliSenseEngine` is set to `Tag Parser" (also referred to as "fuzzy" IntelliSense, or the "browse" engine). These properties are also used by the Go To Definition/Declaration features, or when the "Default" IntelliSense engine is unable to resolve the #includes in your source files.

### Browse properties

### path

This list of paths will be used by the Tag Parser to search for headers included by your source files. If omitted, `includePath` will be used as the `path`. The Tag Parser will automatically search all subfolders in these paths unless the path ends with a `/*` or `\*`. For example, `/usr/include` directs the Tag Parser to search the `include` folder and its subfolders for headers while `/usr/include/*` directs the Tag Parser not to look in any subfolders of `/usr/include`.

### limitSymbolsToIncludedHeaders

When true, the Tag Parser will only parse code files that have been directly or indirectly included by a source file in `${workspaceFolder}`. When false, the Tag Parser will parse all code files found in the paths specified in the **path** list.

### databaseFilename

When set, this instructs the extension to save the Tag Parser's symbol database somewhere other than the workspace's default storage location. If a relative path is specified, it will be made relative to the workspace's default storage location, not the workspace folder itself. The `${workspaceFolder}` variable can be used to specify a path relative to the workspace folder (for example, `${workspaceFolder}/.vscode/browse.vc.db`).
