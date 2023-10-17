---
Order: 13
Area: cpp
TOCTitle: Configure IntelliSense
ContentId: bf494c65-12b4-4506-ab6c-1fad76d7ccf1
PageTitle: Configure C/C++ IntelliSense
DateApproved: 8/23/2023
MetaDescription: Configure Visual Studio Code IntelliSense in the C/C++ Extension

---
# Configure C/C++ IntelliSense

This article is about configuring the C++ extension to provide C++ specific [IntelliSense](/docs/editor/intellisense.md) suggestions in VS Code. IntelliSense is a helpful tool built into VS Code that provides various code editing features that help you code faster and more efficiently. For example, code completion, parameter info, syntax highlighting, code actions (light bulbs), and member lists are all generated using IntelliSense.

There are three types of sources that can be used for configuration:

- A C/C++ compiler
- `compile_commands.json` file
- Another extension (for example, the [Makefile Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.makefile-tools) or [CMake extension](/docs/cpp/CMake-linux.md)).

## When is IntelliSense automatically configured?

The C++ Extension, in most occasions, configures IntelliSense automatically for you. For example, if you have previously selected a compiler for IntelliSense, that compiler will be set as your default compiler. Your default compiler is chosen to configure IntelliSense. Otherwise, if you have not previously selected a compiler, common compiler paths are queried by the C++ Extension. If a compiler is found in a world writeable location, that compiler is configured for IntelliSense. This applies to many common compilers in their default locations such as clang, GCC, MinGW, cygwin, cygwin64, and MSVC. If a compiler is not in a world writeable location, a notification is displayed asking to configure this compiler. When you approve a compiler for IntelliSense, double check that the compiler path stated is as expected.

If another extension is able to provide the configuration for IntelliSense, this configuration is set as your configuration provider in the C++ Extension. Configuration providers are automatically selected to configure IntelliSense. If the extension's configuration can not be configured, the C++ Extension will fall back to the base configuration provided in your `c_cpp_properties.json` file. This includes your default compiler or any compilers found when querying through the process mentioned above.

## How to check whether IntelliSense is configured

There are multiple options to determine your IntelliSense status:

### Option 1: Check for a status bar indicator

 If you don't have IntelliSense configured, the C/C++ Extension shows an indicator in the status bar with a warning sign stating "Configure IntelliSense".

![configure-intelliSense-indicator-status-bar](images/intellisense/configure-intellisense-indicator.png)

To configure, select the status bar indicator, which navigates you to the [configuration quickpickpick](/docs/cpp/configure-intellisense.md#_Option-1.-Select-a-configuration-option-through-the-configuration-Quick-Pick). The status bar indicator also is shown if you have provided a configuration for IntelliSense, but the C/C++ Extension is reverting to the base configuration provided in your `c_cpp_properties.json` file. In this case, open the `c_cpp_properties.json` file (Select **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`)).

### Option 2: Check the language status bar

To invoke the language status bar, open a C++ file. Note that the status bar shows the text "{} C++". Hover over the "{}" symbol to open the language status bar flyout. The top item in the flyout indicates the IntelliSense status. Here are the different statuses and their meanings:

- "IntelliSense: Ready" = IntelliSense has been configured for the C/C++ Extension and automatically activates if you interact with the editor, for example, by writing code.
- "IntelliSense: Updating" = IntelliSense is actively working to determine any code completions, syntax highlighting, etc. based on changes you're making to your code
- "IntelliSense: Not configured" = IntelliSense isn't configured, and will not provide you with code completion features. To configure, navigate you to the [configuration quickpickpick](/docs/cpp/configure-intellisense.md#_Option-1.-Select-a-configuration-option-through-the-configuration-Quick-Pick) as explained below.

![language-status-bar](images/intellisense/language-status-bar.png)

### Option 3: Check the `c_cpp_properties.json` file

All configuration settings are stored in your project's `c_cpp_properties.json` file. Navigate to this file by selecting **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`) in VS Code. Check the "IntelliSense mode" to understand your configuration. To learn more about the `c_cpp_properties.json` file, see the [c_cpp_properties.json schema reference](/docs/cpp/c-cpp-properties-schema-reference.md).

![Command Palette](images/cpp/command-palette.png)

## How to configure IntelliSense

Before you configure, understand that IntelliSense configuration is always stored in the `c_cpp_properties.json` file, which is automatically created in your workspace. All three of the following options are different ways of editing the `c_cpp_properties.json` file:

### Option 1. Select a configuration option through the configuration Quick Pick

Open the quick pick by entering **Select IntelliSense Configuration** in the Command Palette (`kb(workbench.action.showCommands)`), which shows you a dropdown with all of the configuration options found by the C/C++ Extension on your machine.

![Compiler Quick Pick](images/intellisense/compiler-quick-pick.png)

Select one of the options available. If you select a compiler, this compiler will also be set as your default compiler. You can return to the Configuration Quick Pick at any point to change which option chosen to configure IntelliSense.

If no options are available in the quick pick, there are multiple options to help you install a compiler, which you can use for IntelliSense. On a Windows machine, select the “Help me install a compiler” option, which redirects you to the step-by-step walkthrough of how to install a C/C++ compiler. On a Mac or Linux machine, select "Install a compiler" and navigate through the prompts to have a compiler either the Clang or GCC compiler installed on your machine.

### Option 2. Edit your IntelliSense configurations UI

Open your IntelliSense configuration by selecting **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`). This is an easy to navigate interface of the `c_cpp_properties.json` file.

For configuring a `compile_commands.json` file, enter the full path of the `compile_commands.json` file into the Compile commands field. For example, if your `compile_commands.json` file is in the root of your workspace, use `${workspaceFolder}/compile_commands.json`.

For configuring another extension, set the Configuration Provider field to the ID of the extension that provides IntelliSense configuration information. For example, use the VS Code extension ID `ms-vscode.cmake-tools` to provide configuration information from the [CMake Tools extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools).

For configuring a compiler, set the "Compiler path" field to the full path of the compiler you're using to build your project. For example, when using the default install path for GCC on Linux, the compiler path is `/usr/bin/gcc`. Set the "IntelliSense mode" to the architecture-specific variant of the compiler you're using. If you're using a compiler that isn't supported by the C/C++ Extension, you can set the "IntelliSense mode" to `gcc-x64` or `clang-x64` to get IntelliSense for your project. You can also set the "Include path" to the path of any header files that aren't in your workspace or standard library path.

### Option 3. Edit the `c_cpp_properties.json` file directly

You can edit the `c_cpp_properties.json` file directly to customize your configuration. Use the **C/C++ Edit Configurations (JSON)** command from the Command Palette (`kb(workbench.action.showCommands)`), then the `c_cpp_properties.json` file is found in the `.vscode` folder of your workspace.

To select `compile_commands.json` as a configuration, add or update the  `compileCommands` variable. For configuring another extension, use the `configurationProvider` variable. To add a compiler, use the `compilerPath` variable. This variable is the full path of the compiler you're using to build your project. For example, when using the default install path for GCC on Linux, the compiler path is `/usr/bin/gcc`.

Make sure you have defined the following settings if you are writing to your `c_cpp_properties.json` file:

- IntelliSense mode: The IntelliSense mode to use that maps to a platform and architecture variant of MSVC, gcc, or Clang.
- Include path: You only need to modify the **Include path** if your program includes header files that aren't in your workspace or that aren't in the standard library path.The C/C++ extension populates the include path by querying the compiler specified by **Compiler path**. If the extension can't find the path for the target system libraries, you can enter the include path manually.

For more information about the `c_cpp_properties.json` file, see the [c_cpp_properties.json schema reference](/docs/cpp/c-cpp-properties-schema-reference.md).

Here's a sample `c_cpp_configuration.json` file on a Windows machine using the default install path for minGW:

```json
{
    "configurations": [
        {
            "name": "Win32",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "windowsSdkVersion": "10.0.22621.0",
            "cStandard": "c23",
            "cppStandard": "c++23",
            "intelliSenseMode": "${default}",
            "compilerPath": "C:/msys64/mingw64/bin/gcc.exe"
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
