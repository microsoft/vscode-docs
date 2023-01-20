---
Order: 13
Area: cpp
TOCTitle: Configure IntelliSense for cross-compiling
ContentId: 381b7ce1-5766-49b0-ad26-f9eedae70e63
PageTitle: Configure IntelliSense for C++ cross-compilation
DateApproved: 1/17/2023
MetaDescription: Configure Visual Studio Code c_cpp_properties.json to get IntelliSense when you are compiling for a different platform
---
# IntelliSense for cross-compiling

This article is about configuring the C/C++ extension to provide proper IntelliSense (e.g. code completions) in Visual Studio Code when you compile for a different architecture than your development host machine. For example, when your host machine is x64 but you are compiling for Arm.

The C/C++ extension isn't a compiler -- it provides rich language features such as syntax highlighting and IntelliSense. For the extension to provide correct IntelliSense suggestions and to reflect the right sizes of data types, you need to configure the C++ extension to emulate the target architecture.

These configuration settings are stored in your project's `c_cpp_properties.json` file. To edit this file, in VS Code, select **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`):

![Command Palette](images/cpp/command-palette.png)

## Example IntelliSense configuration

 The following shows configuring the C/C++ extension for a Linux x64 host machine that targets Linux Arm. It configures the following IntelliSense settings:

- **Compiler path**: the extension queries your compiler at this location to retrieve system libraries and compiler defines.
- **IntelliSense mode**: emulates the target architecture and compiler so that the extension can provide correct IntelliSense and reflect the right sizes of data types such as `pointer`, `size_t`, `long`, and so on.

At a minimum, setting **compiler path** and **IntelliSense mode** provides enough information for the extension to emulate your project's target architecture, although setting **IntelliSense mode** may not be needed if the extension is able to choose it correctly based on the defines returned from querying the **compiler path**.

### Compiler path

Set to the full path of the compiler you are using to build your project.

For example:

![Compiler path setting](images/intellisense/compiler-path.png)

### IntelliSense mode

Set to the architecture-specific variant of the compiler you are using.

For example:

![IntelliSense mode setting](images/intellisense/intellisense-mode.png)

### Include path

You only need to modify the **Include path** if your program includes header files that aren't in your workspace or that are not in the standard library path.

The C/C++ extension populates the include path by querying the compiler specified by **Compiler path**. If the extension can't find the path for the target system libraries, you can enter the include path manually:

![Include path setting](images/intellisense/include-path.png)

Given the settings above, your `c_cpp_configuration.json` file will look something like the following. You can open it by selecting **C/C++: Edit Configurations (JSON)** from the Command Palette:

```json
{
    "configurations": [
        {
            "name": "myConfigurationName",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "compilerPath": "/usr/bin/arm-none-eabi-g++",
            "cStandard": "c11",
            "cppStandard": "c++14",
            "IntelliSenseMode": "gcc-arm"
        }
    ],
    "version": 4
}
```

## Next steps

- For more information about IntelliSense configuration, see [Customizing default settings](/docs/cpp/customize-default-settings-cpp.md).
- If you have trouble configuring the settings, please start a discussion at [GitHub discussions](https://github.com/microsoft/vscode-cpptools/discussions), or if you find an issue that needs to be fixed, file an issue at [GitHub issues](https://github.com/microsoft/vscode-cpptools/issues).
- Explore the [c_cpp_properties schema](/docs/cpp/c-cpp-properties-schema-reference.md).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md).
