---
Order: 9
Area: cpp
TOCTitle: Configure IntelliSense for cross-compiling
ContentId: 381b7ce1-5766-49b0-ad26-f9eedae70e63
PageTitle: Configure IntelliSense for cross-compilation
DateApproved: 4/28/2020
MetaDescription: Configure VS Code c_cpp_properties.json to get IntelliSense when you are compiling for a different platform
---
# Configure IntelliSense for cross-compiling

When you use a compiler to target a different architecture than the one you are writing the code on, such as when your host machine is Windows but you are using an Arm compiler, you can configure the C/C++ Extension to provide proper IntelliSense.

For IntelliSense to work, the C++ extension needs to be configured for the following:

- The IntelliSense engine that emulates the target architecture/compiler so that data types reflect their correct sizes.
- System and compiler defines need to be retrieved from the target compiler, or manually specified.
- The path to library headers for the system and project need to be retrieved from the target compiler, or manually specified.

Sometimes this information can be obtained automatically and sometimes it is provided by an extension. In all cases, you can enter it manually if needed. If you have trouble, feel free to file an issue in the [VS Code documentation repository](https://github.com/Microsoft/vscode-docs/issues).

## Install target SDK

When you target an architecture that is different from the host development platform, the compiler and/or system libraries for the target architecture may need to be installed on the host development platform so that IntelliSense can reference them.

The Microsoft Visual C++ components are included when you install Visual Studio.
If you are using the MSVC compiler from a non-Windows platform, install the [Windows SDK](https://developer.microsoft.com/windows/downloads/windows-10-sdk).

## Edit c_cpp_properties.json

C/C++ extension configuration information is stored in the `c_cpp_properties.json` file. This file stores IntelliSense configuration settings per workspace and is located under `${workspaceFolder}/.vscode` where  the `tasks.json` and `launch.json` files are also saved.

To create and enter configuration information in this file, select **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`).

![Command Palette](images/cpp/command-palette.png)

This opens the **C/C++ Configurations** page. When you make changes here, VS Code writes them to the `c_cpp_properties.json` file in the `.vscode` folder.

![Intellisense configuration window](images/wsl/intellisense-configurations-wsl.png)

Values in `c_cpp_properties.json` take precedence over the `c_cpp_properties` set in the `settings.json` file.  If there are `c_cpp_properties` set in `settings.json` and the same properties are not set or does not exist in a `c_cpp_properties.json` file, then the extension will use the values in `settings.json`.

If you are curious, you can open the `.vscode/c_cpp_properties.json` file directly. It'll look something like this:

```json
{
    "configurations": [
        {
            "name": "Linux",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "compilerPath": "/usr/bin/gcc",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "IntelliSenseMode": "clang-x64"
        }
    ],
    "version": 4
}
```

You can also edit the file directly by opening it from the .vscode subdirectory in your working directory, or by selecting **C/C++: Edit Configurations (JSON)** from the Command Palette (`kb(workbench.action.showCommands)`).

## Set cross-compilation configuration settings

The following settings need to be configured for intellisense to work when you are cross-compiling:

**IntelliSense mode**

![IntelliSense mode setting](images/intellisense/intellisense-mode.png)

Set to the architecture-specific variant of the compiler you are using.

**Compiler path**
![Compiler path setting](images/intellisense/compiler-path.png)

Set to the full path of the compiler you are using to build your project.
For example, you might have this path to the Microsoft Visual C++ (MSVC) compiler: `C:/Program Files (x86)/Microsoft Visual Studio/2019/Enterprise/VC/Tools/MSVC/14.25.28610/bin/Hostx64/x64/cl.exe`

**Include path**

![Include path setting](images/intellisense/include-path.png)

You only need to modify the **Include path** if your program includes header files that are not in your workspace, or that are in the standard library path.

The C/C++ extension tries to populate the include path by querying the compiler specified by **Compiler path**. If it is unable to get the path for the target system libraries, enter the include path manually. You may need to enter it manually if you are targeting a specific version of the Android NDK if the folder structure under the NDK root folder changes per Android NDK version.

If you are targeting Windows, enter the paths to the Windows SDK and the MSVC libraries.

If the system include path can be retrieved from the compiler, it is sufficient to set `compilerPath` to the compiler that corresponds to the  `IntelliSenseMode`.

If you don't want the extension to query the `compilerPath` to determine system includes, set `"compilerPath": ""`.

## Reusing your C++ configuration

When you've configured VS Code for cross-compilation, the configuration applies to the current workspace. To reuse the configuration, just copy the c_cpp_properties.json file to a `.vscode` folder in a new project folder (workspace).

## Next steps

- Review [Customizing default settings](/docs/customize-default-settings-cpp).
- Explore the [c_cpp_properties schema](/docs/c-cpp-properties-schema-reference).
- Review the [Overview of the C++ extension](/docs/languages/cpp.md).